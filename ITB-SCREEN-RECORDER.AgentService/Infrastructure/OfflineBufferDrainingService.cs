// ==========================================
// File: AgentService/Infrastructure/OfflineBufferDrainingService.cs
// ==========================================
using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Security.Pki;

namespace ITB_SCREEN_RECORDER.AgentService
{
    public class OfflineBufferDrainingService : BackgroundService
    {
        private readonly ILogger<OfflineBufferDrainingService> _logger;
        private readonly string _bufferPath;
        private readonly HttpClient _httpClient;
        private readonly string _uploadUrl;

        public static BufferCommand CurrentCommand { get; set; } = BufferCommand.WAIT;
        public static string? ActiveServerBaseUrl { get; set; }

        public OfflineBufferDrainingService(ILogger<OfflineBufferDrainingService> logger, AppConfig config)
        {
            _logger = logger;
            var handler = new HttpClientHandler();
            AgentCertificateValidator.ConfigureHandler(handler);
            _httpClient = new HttpClient(handler)
            {
                Timeout = TimeSpan.FromMinutes(10)
            };

            _bufferPath = string.IsNullOrWhiteSpace(config.LocalBufferPath)
                ? (OperatingSystem.IsWindows() ? @"C:\ProgramData\ITB-SCREEN-RECORDER\Buffer" : "/var/lib/itb-screen-recorder/buffer")
                : config.LocalBufferPath;

            // 💡 חילוץ מדויק של שרת הבסיס מתוך AppConfig בלבד (מוצפן HTTPS)
            _uploadUrl = ResolveUploadEndpoint(config.DashboardApiUrl);

            Logger.AlwaysInfo($"[DRAINER] Initialized. Buffer Path: '{_bufferPath}', Target Upload Endpoint: '{_uploadUrl}'");
        }

        public string GetEffectiveUploadEndpoint()
        {
            if (!string.IsNullOrWhiteSpace(ActiveServerBaseUrl) && !string.Equals(ActiveServerBaseUrl, "AUTO", StringComparison.OrdinalIgnoreCase))
            {
                string host = ActiveServerBaseUrl.TrimEnd('/');
                return host.StartsWith("https://", StringComparison.OrdinalIgnoreCase)
                    ? $"{host}/api/v1/agent/upload-buffer"
                    : host.StartsWith("http://", StringComparison.OrdinalIgnoreCase)
                        ? $"https://{host.Substring("http://".Length)}/api/v1/agent/upload-buffer"
                        : $"https://{host}/api/v1/agent/upload-buffer";
            }
            return _uploadUrl;
        }

        private static string ResolveUploadEndpoint(string? dashboardApiUrl)
        {
            string fallback = "https://127.0.0.1:5090/api/v1/agent/upload-buffer";
            if (string.IsNullOrWhiteSpace(dashboardApiUrl) || string.Equals(dashboardApiUrl.Trim(), "AUTO", StringComparison.OrdinalIgnoreCase))
            {
                return fallback;
            }

            string url = dashboardApiUrl.Trim();
            if (url.StartsWith("http://", StringComparison.OrdinalIgnoreCase))
            {
                url = "https://" + url.Substring("http://".Length);
            }
            else if (!url.StartsWith("https://", StringComparison.OrdinalIgnoreCase))
            {
                url = $"https://{url}";
            }

            if (Uri.TryCreate(url, UriKind.Absolute, out Uri? parsedUri))
            {
                string baseAuthority = parsedUri.GetLeftPart(UriPartial.Authority);
                return $"{baseAuthority.TrimEnd('/')}/api/v1/agent/upload-buffer";
            }

            return fallback;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("OfflineBufferDrainingService started. Loop active.");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    if (CurrentCommand == BufferCommand.UPLOAD_GRANTED)
                    {
                        await ProcessUploadQueueAsync(stoppingToken);
                    }
                    else if (CurrentCommand == BufferCommand.DISCARD_ALL)
                    {
                        DiscardAllFiles();
                    }
                }
                catch (Exception ex)
                {
                    Logger.Error($"[DRAINER] Loop Error: {ex.Message}");
                    _logger.LogError(ex, "Buffer Drainer Error: {Msg}", ex.Message);
                }

                await Task.Delay(5000, stoppingToken);
            }
        }

        private async Task ProcessUploadQueueAsync(CancellationToken ct)
        {
            if (!Directory.Exists(_bufferPath)) return;

            var nowUtc = DateTime.UtcNow;
            var files = new DirectoryInfo(_bufferPath).GetFiles()
                .Where(f => (f.Extension.Equals(".mp4", StringComparison.OrdinalIgnoreCase) ||
                             f.Extension.Equals(".flv", StringComparison.OrdinalIgnoreCase)) &&
                            (nowUtc - f.LastWriteTimeUtc).TotalSeconds > 15)
                .OrderBy(f => f.CreationTimeUtc)
                .ToList();

            foreach (var file in files)
            {
                if (ct.IsCancellationRequested || CurrentCommand != BufferCommand.UPLOAD_GRANTED) break;

                if (file.Length < 64)
                {
                    Logger.Warn($"[DRAINER] Removing corrupt/empty buffer file '{file.Name}' ({file.Length} bytes).");
                    try
                    {
                        file.Delete();
                        string sidecarPath = Path.ChangeExtension(file.FullName, ".keys.jsonl");
                        if (File.Exists(sidecarPath)) File.Delete(sidecarPath);
                    }
                    catch { }
                    continue;
                }

                Logger.AlwaysInfo($"[DRAINER] Starting upload for {file.Name} ({file.Length / 1024 / 1024}MB)...");
                var (success, shouldDiscard) = await UploadFileAsync(file.FullName, ct);

                if (success || shouldDiscard)
                {
                    try
                    {
                        file.Delete();

                        string sidecarPath = Path.ChangeExtension(file.FullName, ".keys.jsonl");
                        if (File.Exists(sidecarPath))
                        {
                            try
                            {
                                File.Delete(sidecarPath);
                                Logger.AlwaysInfo($"[DRAINER] Sidecar {Path.GetFileName(sidecarPath)} deleted locally.");
                            }
                            catch { }
                        }

                        if (success)
                        {
                            Logger.AlwaysInfo($"[DRAINER] Upload Verified (200 OK). Video {file.Name} deleted locally.");
                        }
                        else
                        {
                            Logger.Warn($"[DRAINER] Permanently discarded invalid/rejected video {file.Name} locally.");
                        }
                    }
                    catch (Exception ex)
                    {
                        Logger.Warn($"[DRAINER] Uploaded/discarded successfully but failed local deletion: {ex.Message}");
                    }
                }
                else
                {
                    Logger.Warn($"[DRAINER] Upload failed for {file.Name}. Will retry on next tick.");
                }
            }
        }

        private async Task<(bool Success, bool ShouldDiscard)> UploadFileAsync(string filePath, CancellationToken ct)
        {
            FileStream? sidecarStream = null;
            try
            {
                using var content = new MultipartFormDataContent();
                using var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read);
                var streamContent = new StreamContent(fileStream);

                content.Add(streamContent, "file", Path.GetFileName(filePath));
                content.Add(new StringContent(Environment.MachineName), "hostname");

                // 💡 בדיקה מפורשת של ה-Sidecar והדפסת לוג ברור
                string sidecarPath = Path.ChangeExtension(filePath, ".keys.jsonl");
                if (File.Exists(sidecarPath))
                {
                    sidecarStream = new FileStream(sidecarPath, FileMode.Open, FileAccess.Read, FileShare.Read);
                    var sidecarContent = new StreamContent(sidecarStream);
                    content.Add(sidecarContent, "keysFile", Path.GetFileName(sidecarPath));
                    Logger.AlwaysInfo($"[DRAINER] Sidecar detected: {Path.GetFileName(sidecarPath)} ({sidecarStream.Length} bytes). Attaching to payload.");
                }
                else
                {
                    Logger.AlwaysInfo($"[DRAINER] No sidecar file found for {Path.GetFileName(filePath)} (no keystrokes recorded).");
                }

                string targetUrl = GetEffectiveUploadEndpoint();
                var response = await _httpClient.PostAsync(targetUrl, content, ct);
                if (response.IsSuccessStatusCode)
                {
                    return (true, false);
                }

                if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
                {
                    Logger.Warn($"[DRAINER] Server rejected file '{Path.GetFileName(filePath)}' as invalid/corrupt (400 BadRequest). It will be discarded.");
                    return (false, true);
                }

                Logger.Warn($"[DRAINER] Server returned {response.StatusCode} for {Path.GetFileName(filePath)}.");
                return (false, false);
            }
            catch (Exception ex)
            {
                Logger.Warn($"[DRAINER] Upload exception for {Path.GetFileName(filePath)}: {ex.Message}");
                return (false, false);
            }
            finally
            {
                sidecarStream?.Dispose();
            }
        }

        private void DiscardAllFiles()
        {
            if (!Directory.Exists(_bufferPath)) return;
            var files = new DirectoryInfo(_bufferPath).GetFiles()
                .Where(f => f.Extension.Equals(".mp4", StringComparison.OrdinalIgnoreCase) ||
                            f.Extension.Equals(".flv", StringComparison.OrdinalIgnoreCase) ||
                            f.Extension.Equals(".jsonl", StringComparison.OrdinalIgnoreCase));

            foreach (var file in files)
            {
                try
                {
                    file.Delete();
                    Logger.AlwaysInfo($"[DRAINER] Discarded local buffer file: {file.Name}");
                }
                catch { }
            }
        }

        public static (int Count, long SizeMb) GetBufferStats(string bufferPath)
        {
            try
            {
                if (!Directory.Exists(bufferPath)) return (0, 0);

                var files = new DirectoryInfo(bufferPath).GetFiles()
                    .Where(f => f.Extension.Equals(".mp4", StringComparison.OrdinalIgnoreCase) ||
                                f.Extension.Equals(".flv", StringComparison.OrdinalIgnoreCase))
                    .ToArray();

                long bytes = files.Sum(f => f.Length);
                return (files.Length, bytes / (1024 * 1024));
            }
            catch
            {
                return (0, 0);
            }
        }
    }
}