using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Core.Network.Discovery;
using ITB_SCREEN_RECORDER.Player.Core.Ipc;

namespace ITB_SCREEN_RECORDER.Player.Core.Orchestration;

/// <summary>
/// Orchestrates automated multicast discovery of ITB recording servers,
/// remote multicam slicing jobs via Extractor API, and synchronized package retrieval.
/// Emits encrypted status telemetry and errors through PlayerSecureIpcService.
/// </summary>
public sealed class ServerReplayOrchestrator
{
    private readonly PlayerSecureIpcService? _ipcService;
    private readonly HttpClient _httpClient;

    public ServerReplayOrchestrator(PlayerSecureIpcService? ipcService = null, HttpClient? httpClient = null)
    {
        _ipcService = ipcService;
        _httpClient = httpClient ?? new HttpClient { Timeout = TimeSpan.FromSeconds(60) };
    }

    /// <summary>
    /// Executes the complete replay preparation workflow:
    /// 1. Multicast Discovery (if server URL not provided)
    /// 2. Remote Extractor Slicing Job
    /// 3. Package Download & Storage
    /// Returns the local path of the synchronized TAR/ITBP package ready for playback.
    /// </summary>
    public async Task<string> PrepareReplayPackageAsync(ReplayLaunchParams parameters, CancellationToken ct = default)
    {
        if (parameters == null) throw new ArgumentNullException(nameof(parameters));

        // 1. Direct local file bypass
        if (!string.IsNullOrWhiteSpace(parameters.PackagePath) && File.Exists(parameters.PackagePath))
        {
            await PublishStateAsync("READY", "Local package loaded directly.", progress: 100, ct: ct).ConfigureAwait(false);
            return parameters.PackagePath;
        }

        // Validate basic time bounds
        if (parameters.StartTimeUtc >= parameters.EndTimeUtc)
        {
            var err = PlayerIpcEvent.Error(
                PlayerErrorCodes.ErrGeneralException,
                $"Invalid time bounds: StartUtc ({parameters.StartTimeUtc:u}) must precede EndUtc ({parameters.EndTimeUtc:u}).");
            await PublishEventAsync(err, ct).ConfigureAwait(false);
            throw new ArgumentException(err.Message);
        }

        if (parameters.Stations == null || parameters.Stations.Count == 0)
        {
            var err = PlayerIpcEvent.Error(
                PlayerErrorCodes.ErrGeneralException,
                "Replay request requires at least one workstation hostname.");
            await PublishEventAsync(err, ct).ConfigureAwait(false);
            throw new ArgumentException(err.Message);
        }

        // 2. Discover Server (Multicast Probe)
        string serverBaseUrl = parameters.ServerApiUrl?.TrimEnd('/') ?? string.Empty;
        if (string.IsNullOrEmpty(serverBaseUrl))
        {
            serverBaseUrl = await DiscoverServerAsync(parameters.MulticastAddress, parameters.MulticastPort, ct).ConfigureAwait(false);
        }

        // 3. Initiate Extractor Slicing Job on Server
        string downloadedPackagePath = await SliceAndDownloadPackageAsync(serverBaseUrl, parameters, ct).ConfigureAwait(false);

        await PublishStateAsync("READY", "Synchronized package prepared successfully.", progress: 100, ct: ct).ConfigureAwait(false);
        return downloadedPackagePath;
    }

    private async Task<string> DiscoverServerAsync(string multicastAddress, int port, CancellationToken ct)
    {
        await PublishStateAsync("DISCOVERING_SERVER", $"Broadcasting UDP discovery probe on {multicastAddress}:{port}...", ct: ct).ConfigureAwait(false);

        var discoveryClient = new ServerDiscoveryClient(
            discoveryPort: port > 0 ? port : ServerDiscoveryConstants.DefaultDiscoveryPort,
            multicastAddress: !string.IsNullOrWhiteSpace(multicastAddress) ? multicastAddress : ServerDiscoveryConstants.DefaultMulticastAddress);

        var servers = await discoveryClient.DiscoverServersAsync(timeoutMs: 3500, ct: ct).ConfigureAwait(false);

        var bestServer = servers?.FirstOrDefault(s => !string.IsNullOrEmpty(s.ApiBaseUrl));
        if (bestServer == null)
        {
            var err = PlayerIpcEvent.Error(
                PlayerErrorCodes.ErrDiscoveryTimeout,
                $"No ITB recording server responded on multicast group {multicastAddress}:{port} within 3500ms.",
                isFatal: true);
            await PublishEventAsync(err, ct).ConfigureAwait(false);
            throw new TimeoutException(err.Message);
        }

        string resolvedUrl = bestServer.ApiBaseUrl.TrimEnd('/');
        await PublishStateAsync("SERVER_DISCOVERED", $"Found recording server '{bestServer.ServerName}' at {resolvedUrl}", ct: ct).ConfigureAwait(false);
        return resolvedUrl;
    }

    private async Task<string> SliceAndDownloadPackageAsync(string serverBaseUrl, ReplayLaunchParams parameters, CancellationToken ct)
    {
        await PublishStateAsync("EXTRACTING_MEDIA", "Creating remote extraction job on server...", progress: 0, ct: ct).ConfigureAwait(false);

        // Map keystroke export mode: 0=None, 1=Caption, 2=BurnIn
        int keystrokeModeInt = string.Equals(parameters.KeystrokeMode, "BurnIn", StringComparison.OrdinalIgnoreCase) ? 2 : 1;

        var jobRequest = new
        {
            startTimeUtc = parameters.StartTimeUtc,
            endTimeUtc = parameters.EndTimeUtc,
            hostnames = parameters.Stations,
            keystrokeMode = keystrokeModeInt,
            layoutMode = parameters.LayoutMode ?? "director",
            exportRawChunks = false
        };

        HttpResponseMessage createResp;
        try
        {
            createResp = await _httpClient.PostAsJsonAsync($"{serverBaseUrl}/api/v1/extractor/jobs", jobRequest, ct).ConfigureAwait(false);
        }
        catch (Exception ex)
        {
            var err = PlayerIpcEvent.Error(
                PlayerErrorCodes.ErrServerUnreachable,
                $"Failed to connect to ITB server at {serverBaseUrl}: {ex.Message}",
                isFatal: true);
            await PublishEventAsync(err, ct).ConfigureAwait(false);
            throw;
        }

        if (!createResp.IsSuccessStatusCode)
        {
            string errBody = await createResp.Content.ReadAsStringAsync(ct).ConfigureAwait(false);
            var err = PlayerIpcEvent.Error(
                PlayerErrorCodes.ErrExtractionFailed,
                $"Server rejected extraction request (HTTP {(int)createResp.StatusCode}): {errBody}",
                isFatal: true);
            await PublishEventAsync(err, ct).ConfigureAwait(false);
            throw new InvalidOperationException(err.Message);
        }

        using var jobDoc = JsonDocument.Parse(await createResp.Content.ReadAsStringAsync(ct).ConfigureAwait(false));
        string jobId = jobDoc.RootElement.GetProperty("id").GetString() ?? Guid.NewGuid().ToString("N");

        // Poll job status until completion
        bool isDone = false;
        while (!isDone && !ct.IsCancellationRequested)
        {
            await Task.Delay(1000, ct).ConfigureAwait(false);

            var pollResp = await _httpClient.GetAsync($"{serverBaseUrl}/api/v1/extractor/jobs", ct).ConfigureAwait(false);
            if (!pollResp.IsSuccessStatusCode) continue;

            using var pollDoc = JsonDocument.Parse(await pollResp.Content.ReadAsStringAsync(ct).ConfigureAwait(false));
            foreach (var elem in pollDoc.RootElement.EnumerateArray())
            {
                if (elem.TryGetProperty("id", out var idProp) && idProp.GetString() == jobId)
                {
                    int percent = elem.TryGetProperty("percentComplete", out var p) ? p.GetInt32() : 0;
                    bool isFailed = elem.TryGetProperty("isFailed", out var f) && f.GetBoolean();
                    bool completed = elem.TryGetProperty("isCompleted", out var c) && c.GetBoolean();
                    string? statusMessage = elem.TryGetProperty("statusMessage", out var m) ? m.GetString() : null;

                    if (isFailed)
                    {
                        var err = PlayerIpcEvent.Error(
                            PlayerErrorCodes.ErrExtractionFailed,
                            $"Remote extraction job failed on server: {statusMessage ?? "Unknown server error."}",
                            isFatal: true);
                        await PublishEventAsync(err, ct).ConfigureAwait(false);
                        throw new InvalidOperationException(err.Message);
                    }

                    await PublishStateAsync("EXTRACTING_MEDIA", statusMessage ?? $"Slicing media on server ({percent}%)...", progress: percent, ct: ct).ConfigureAwait(false);

                    if (completed)
                    {
                        isDone = true;
                    }
                    break;
                }
            }
        }

        // Download the final TAR package
        await PublishStateAsync("DOWNLOADING_PACKAGE", "Downloading synchronized package from server...", progress: 0, ct: ct).ConfigureAwait(false);

        string tempDir = Path.Combine(Path.GetTempPath(), "ITB-Player", "Replays");
        Directory.CreateDirectory(tempDir);
        string outputFilePath = Path.Combine(tempDir, $"Replay_{DateTime.UtcNow:yyyyMMdd_HHmmss}_{Guid.NewGuid():N}.tar");

        string downloadUrl = $"{serverBaseUrl}/api/v1/extractor/jobs/{jobId}/download";
        using var downloadResp = await _httpClient.GetAsync(downloadUrl, HttpCompletionOption.ResponseHeadersRead, ct).ConfigureAwait(false);

        if (!downloadResp.IsSuccessStatusCode)
        {
            var err = PlayerIpcEvent.Error(
                PlayerErrorCodes.ErrDownloadFailed,
                $"Failed to download extraction archive (HTTP {(int)downloadResp.StatusCode}).",
                isFatal: true);
            await PublishEventAsync(err, ct).ConfigureAwait(false);
            throw new InvalidOperationException(err.Message);
        }

        long? totalBytes = downloadResp.Content.Headers.ContentLength;
        using var remoteStream = await downloadResp.Content.ReadAsStreamAsync(ct).ConfigureAwait(false);
        using var localStream = new FileStream(outputFilePath, FileMode.Create, FileAccess.Write, FileShare.None, 81920, useAsync: true);

        byte[] buffer = new byte[81920];
        long totalRead = 0;
        int bytesRead;

        while ((bytesRead = await remoteStream.ReadAsync(buffer.AsMemory(0, buffer.Length), ct).ConfigureAwait(false)) > 0)
        {
            await localStream.WriteAsync(buffer.AsMemory(0, bytesRead), ct).ConfigureAwait(false);
            totalRead += bytesRead;

            if (totalBytes.HasValue && totalBytes.Value > 0)
            {
                int downloadPercent = (int)((totalRead * 100) / totalBytes.Value);
                await PublishStateAsync("DOWNLOADING_PACKAGE", $"Downloading package ({downloadPercent}%)...", progress: downloadPercent, ct: ct).ConfigureAwait(false);
            }
        }

        return outputFilePath;
    }

    private Task PublishStateAsync(string state, string message, int? progress = null, CancellationToken ct = default)
    {
        if (_ipcService == null) return Task.CompletedTask;
        return _ipcService.PublishEventAsync(PlayerIpcEvent.StateChanged(state, message, progress), ct);
    }

    private Task PublishEventAsync(PlayerIpcEvent ev, CancellationToken ct = default)
    {
        if (_ipcService == null) return Task.CompletedTask;
        return _ipcService.PublishEventAsync(ev, ct);
    }
}
