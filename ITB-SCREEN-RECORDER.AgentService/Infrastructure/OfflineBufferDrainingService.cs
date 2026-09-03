using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Core.Configuration; // 💡 תוספת עבור AppConfig

namespace ITB_SCREEN_RECORDER.AgentService.Infrastructure
{
    public class OfflineBufferDrainingService : BackgroundService
    {
        private readonly ILogger<OfflineBufferDrainingService> _logger;
        private readonly string _bufferPath; // 💡 משתנה דינמי
        private readonly HttpClient _httpClient;
        private readonly string _uploadUrl = "http://127.0.0.1:5090/api/sync/buffer";

        public static BufferCommand CurrentCommand { get; set; } = BufferCommand.WAIT;

        // 💡 הזרקת AppConfig לבנאי
        public OfflineBufferDrainingService(ILogger<OfflineBufferDrainingService> logger, AppConfig config)
        {
            _logger = logger;
            _httpClient = new HttpClient
            {
                Timeout = TimeSpan.FromMinutes(10)
            };

            // 💡 שליפת הנתיב מהקונפיגורציה או שימוש בברירת מחדל
            _bufferPath = string.IsNullOrWhiteSpace(config.LocalBufferPath)
                ? @"C:\ProgramData\ITB-SCREEN-RECORDER\Buffer"
                : config.LocalBufferPath;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("OfflineBufferDrainingService started. Buffer path: {Path}", _bufferPath);

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
                    _logger.LogError("Buffer Drainer Error: {Msg}", ex.Message);
                }

                await Task.Delay(5000, stoppingToken);
            }
        }

        private async Task ProcessUploadQueueAsync(CancellationToken ct)
        {
            if (!Directory.Exists(_bufferPath)) return;

            var files = new DirectoryInfo(_bufferPath).GetFiles("*.flv")
                .Where(f => (DateTime.Now - f.LastWriteTime).TotalMinutes > 1)
                .OrderBy(f => f.CreationTime)
                .ToList();

            foreach (var file in files)
            {
                if (ct.IsCancellationRequested || CurrentCommand != BufferCommand.UPLOAD_GRANTED) break;

                _logger.LogInformation("[DRAINER] Starting upload for {FileName} ({Size}MB)", file.Name, file.Length / 1024 / 1024);
                bool success = await UploadFileAsync(file.FullName, ct);

                if (success)
                {
                    try
                    {
                        file.Delete();
                        _logger.LogInformation("[DRAINER] Upload Verified (200 OK). File {FileName} deleted locally.", file.Name);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning("[DRAINER] Uploaded but failed to delete locally: {Msg}", ex.Message);
                    }
                }
            }
        }

        private async Task<bool> UploadFileAsync(string filePath, CancellationToken ct)
        {
            try
            {
                using var content = new MultipartFormDataContent();
                using var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read);
                var streamContent = new StreamContent(fileStream);

                content.Add(streamContent, "file", Path.GetFileName(filePath));
                content.Add(new StringContent(Environment.MachineName), "hostname");

                var response = await _httpClient.PostAsync(_uploadUrl, content, ct);
                return response.IsSuccessStatusCode;
            }
            catch (Exception ex)
            {
                _logger.LogWarning("[DRAINER] Upload exception: {Msg}", ex.Message);
                return false;
            }
        }

        private void DiscardAllFiles()
        {
            if (!Directory.Exists(_bufferPath)) return;
            var files = new DirectoryInfo(_bufferPath).GetFiles("*.flv");
            foreach (var file in files)
            {
                try
                {
                    file.Delete();
                    _logger.LogInformation("Discarded local buffer file: {FileName}", file.Name);
                }
                catch { }
            }
        }

        // 💡 הפונקציה הסטטית כעת דורשת שיעבירו לה את הנתיב מבחוץ
        public static (int Count, long SizeMb) GetBufferStats(string bufferPath)
        {
            try
            {
                if (!Directory.Exists(bufferPath)) return (0, 0);

                var files = new DirectoryInfo(bufferPath).GetFiles("*.flv");
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