// ==========================================
// File: Features/ExtractorAdvanced/Services/ExtractorGarbageCollectorService.cs
// ==========================================
using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services
{
    /// <summary>
    /// שירות רקע לניקוי אוטומטי (GC) של קבצי Temp, מניפסטים וקאש תמונות של ה-Extractor
    /// </summary>
    public class ExtractorGarbageCollectorService : BackgroundService
    {
        private readonly ILogger<ExtractorGarbageCollectorService> _logger;

        // הגדרות תזמון וזמני שימור
        private static readonly TimeSpan RunInterval = TimeSpan.FromMinutes(15);
        private static readonly TimeSpan TempFilesMaxAge = TimeSpan.FromMinutes(20);
        private static readonly TimeSpan SpritesCacheMaxAge = TimeSpan.FromHours(8);

        public ExtractorGarbageCollectorService(ILogger<ExtractorGarbageCollectorService> logger)
        {
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("[Extractor GC] Service initialized. Running every {Interval} minutes.", RunInterval.TotalMinutes);

            // הפעלה ראשונית מיד עם עליית השרת לניקוי שאריות מקריסות קודמות
            RunCleanupCycle();

            using var timer = new PeriodicTimer(RunInterval);

            while (!stoppingToken.IsCancellationRequested && await timer.WaitForNextTickAsync(stoppingToken))
            {
                try
                {
                    RunCleanupCycle();
                }
                catch (OperationCanceledException)
                {
                    break;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "[Extractor GC] Unexpected failure during cleanup cycle.");
                }
            }

            _logger.LogInformation("[Extractor GC] Service stopped.");
        }

        private void RunCleanupCycle()
        {
            int deletedCount = 0;
            long freedBytes = 0;
            DateTime thresholdTemp = DateTime.UtcNow - TempFilesMaxAge;
            DateTime thresholdCache = DateTime.UtcNow - SpritesCacheMaxAge;

            string tempPath = Path.GetTempPath();

            // 1. ניקוי קבצים זמניים יתומים (מניפסטים, פריימים, סטרים) מתיקיית ה-Temp הכללית
            string[] tempPrefixes = { "spritesheet_", "sync_", "frame_", "stream_", "manifest_" };

            try
            {
                var tempDir = new DirectoryInfo(tempPath);
                if (tempDir.Exists)
                {
                    foreach (var file in tempDir.EnumerateFiles())
                    {
                        bool isTarget = false;
                        for (int i = 0; i < tempPrefixes.Length; i++)
                        {
                            if (file.Name.StartsWith(tempPrefixes[i], StringComparison.OrdinalIgnoreCase))
                            {
                                isTarget = true;
                                break;
                            }
                        }

                        if (isTarget && file.LastWriteTimeUtc < thresholdTemp)
                        {
                            try
                            {
                                long size = file.Length;
                                file.Delete();
                                deletedCount++;
                                freedBytes += size;
                            }
                            catch (IOException) { /* קובץ עדיין בשימוש/נעול ע"י FFmpeg */ }
                            catch (UnauthorizedAccessException) { }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "[Extractor GC] Failed scanning general temp directory.");
            }

            // 2. ניקוי קבצי קאש של Spritesheets ישנים
            string cacheDir = Path.Combine(tempPath, "itb_sprites_cache");
            if (Directory.Exists(cacheDir))
            {
                try
                {
                    var cacheDirInfo = new DirectoryInfo(cacheDir);
                    foreach (var file in cacheDirInfo.EnumerateFiles("*.*", SearchOption.AllDirectories))
                    {
                        if (file.LastWriteTimeUtc < thresholdCache)
                        {
                            try
                            {
                                long size = file.Length;
                                file.Delete();
                                deletedCount++;
                                freedBytes += size;
                            }
                            catch (IOException) { }
                            catch (UnauthorizedAccessException) { }
                        }
                    }

                    // מחיקת תיקיות תחנה ריקות
                    foreach (var dir in cacheDirInfo.EnumerateDirectories())
                    {
                        if (!dir.EnumerateFileSystemInfos().Any())
                        {
                            try { dir.Delete(); } catch { }
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "[Extractor GC] Failed scanning spritesheet cache folder.");
                }
            }

            if (deletedCount > 0)
            {
                double mbFreed = freedBytes / (1024.0 * 1024.0);
                _logger.LogInformation("[Extractor GC] Cleanup cycle finished. Deleted {Count} stale files ({Mb:F2} MB reclaimed).", deletedCount, mbFreed);
            }
        }
    }
}