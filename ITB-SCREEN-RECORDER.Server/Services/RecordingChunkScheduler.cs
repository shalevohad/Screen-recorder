namespace ITB_SCREEN_RECORDER.Server.Services;

using System;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

/// <summary>
/// Wakes up at every UTC wall-clock multiple of Storage.ChunkIntervalMinutes and forces
/// MediaMTX to cut a new recording segment for every currently-streaming station, so chunk
/// boundaries land exactly on the clock (e.g. 17:00, 17:15, 17:30) regardless of when each
/// station started streaming. Also re-applies the recording path if the storage root
/// (NetApp vs local fallback) changed since it was last applied.
/// </summary>
public class RecordingChunkScheduler : BackgroundService
{
    private const string RecordFormat = "fmp4";

    private readonly IOptionsMonitor<SystemConfig> _configMonitor;
    private readonly StoragePathResolver _storageResolver;
    private readonly MediaMtxApiClient _apiClient;
    private readonly EventLogger _eventLogger;
    private readonly ILogger<RecordingChunkScheduler> _logger;

    private string? _lastAppliedRoot;

    public RecordingChunkScheduler(
        IOptionsMonitor<SystemConfig> configMonitor,
        StoragePathResolver storageResolver,
        MediaMtxApiClient apiClient,
        EventLogger eventLogger,
        ILogger<RecordingChunkScheduler> logger)
    {
        _configMonitor = configMonitor;
        _storageResolver = storageResolver;
        _apiClient = apiClient;
        _eventLogger = eventLogger;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("[CHUNK SCHEDULER] Recording chunk scheduler starting...");

        while (!stoppingToken.IsCancellationRequested)
        {
            int intervalMinutes = Math.Max(1, _configMonitor.CurrentValue.Storage.ChunkIntervalMinutes);
            DateTime nextBoundaryUtc = ComputeNextBoundaryUtc(DateTime.UtcNow, intervalMinutes);
            TimeSpan delay = nextBoundaryUtc - DateTime.UtcNow;

            try
            {
                if (delay > TimeSpan.Zero)
                {
                    await Task.Delay(delay, stoppingToken).ConfigureAwait(false);
                }
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                break;
            }

            if (stoppingToken.IsCancellationRequested) break;

            try
            {
                await OnBoundaryReachedAsync(stoppingToken).ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[CHUNK SCHEDULER] Unhandled error while rotating recordings at a chunk boundary.");
            }
        }
    }

    private async Task OnBoundaryReachedAsync(CancellationToken stoppingToken)
    {
        SystemConfig config = _configMonitor.CurrentValue;

        string root = await _storageResolver.ResolveActiveRootAsync(config.Storage, _logger).ConfigureAwait(false);
        if (root != _lastAppliedRoot)
        {
            string recordPath = BuildRecordPath(root);
            bool applied = await _apiClient.PatchPathDefaultsAsync(
                config.MediaMtx.ApiPort,
                recordPath,
                RecordFormat,
                $"{config.Storage.ChunkIntervalMinutes}m",
                $"{config.Storage.RetentionDays}d",
                stoppingToken).ConfigureAwait(false);

            if (applied)
            {
                _lastAppliedRoot = root;
                _logger.LogInformation("[CHUNK SCHEDULER] Applied recording root '{Root}' to MediaMTX.", root);
            }
        }

        var activePaths = await _apiClient.GetActivePathNamesAsync(config.MediaMtx.ApiPort, stoppingToken).ConfigureAwait(false);
        foreach (string path in activePaths)
        {
            bool rotated = await _apiClient.RotatePathRecordingAsync(config.MediaMtx.ApiPort, path, stoppingToken).ConfigureAwait(false);
            await _eventLogger.LogChunkCutAsync(config.Storage.ChunkEventLogPath, path, root, rotated, stoppingToken).ConfigureAwait(false);
        }

        if (activePaths.Count > 0)
        {
            _logger.LogInformation("[CHUNK SCHEDULER] Rotated {Count} active recording(s) at UTC chunk boundary.", activePaths.Count);
        }
    }

    private static string BuildRecordPath(string root)
    {
        string normalizedRoot = root.TrimEnd('\\', '/');
        return $"{normalizedRoot}/%path/%Y-%m-%d_%H-%M-%S-%f";
    }

    internal static DateTime ComputeNextBoundaryUtc(DateTime nowUtc, int intervalMinutes)
    {
        int minutesSinceMidnight = nowUtc.Hour * 60 + nowUtc.Minute;
        int currentBucketStart = minutesSinceMidnight - (minutesSinceMidnight % intervalMinutes);
        return nowUtc.Date.AddMinutes(currentBucketStart + intervalMinutes);
    }
}
