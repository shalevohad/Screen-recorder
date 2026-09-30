// ==========================================
// File: Features/ExtractorAdvanced/Services/ExtractorGarbageCollectorService.cs
// ==========================================
using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services
{
    /// <summary>
    /// שירות רקע לניקוי קבצי זבל בדיסק וסגירת תהליכי FFmpeg/FFprobe תקועים ויתומים
    /// </summary>
    public class ExtractorGarbageCollectorService : BackgroundService
    {
        private readonly ILogger<ExtractorGarbageCollectorService> _logger;

        private static readonly TimeSpan RunInterval = TimeSpan.FromMinutes(10);
        private static readonly TimeSpan TempFilesMaxAge = TimeSpan.FromMinutes(15);
        private static readonly TimeSpan SpritesCacheMaxAge = TimeSpan.FromHours(8);
        private static readonly TimeSpan MaxProcessLifetime = TimeSpan.FromMinutes(5); // תהליך FFmpeg שלא סיים תוך 5 דק' נחשב תקוע

        public ExtractorGarbageCollectorService(ILogger<ExtractorGarbageCollectorService> logger)
        {
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("[Extractor GC] Service initialized. Running every {Interval} minutes.", RunInterval.TotalMinutes);

            // הפעלה ראשונית עם עליית השרת
            RunFullMaintenanceCycle();

            using var timer = new PeriodicTimer(RunInterval);

            while (!stoppingToken.IsCancellationRequested && await timer.WaitForNextTickAsync(stoppingToken))
            {
                try
                {
                    RunFullMaintenanceCycle();
                }
                catch (OperationCanceledException)
                {
                    break;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "[Extractor GC] Unexpected failure during maintenance cycle.");
                }
            }

            _logger.LogInformation("[Extractor GC] Service stopped.");
        }

        private void RunFullMaintenanceCycle()
        {
            CleanupOrphanProcesses();
            CleanupDiskArtifacts();
        }

        /// <summary>
        /// 💡 סגירת תהליכי FFmpeg ו-FFprobe זומבים/תקועים שחונקים את המעבד
        /// </summary>
        private void CleanupOrphanProcesses()
        {
            string[] targetProcessNames = { "ffmpeg", "ffprobe" };
            DateTime processThreshold = DateTime.Now - MaxProcessLifetime;
            int killedCount = 0;

            foreach (var procName in targetProcessNames)
            {
                Process[] processes;
                try
                {
                    processes = Process.GetProcessesByName(procName);
                }
                catch
                {
                    continue;
                }

                foreach (var proc in processes)
                {
                    try
                    {
                        if (proc.HasExited) continue;

                        if (proc.StartTime < processThreshold)
                        {
                            _logger.LogWarning("[Extractor GC] Killing stale process {Name} (PID: {Pid}, Running since: {StartTime:HH:mm:ss})",
                                procName, proc.Id, proc.StartTime);

                            proc.Kill(entireProcessTree: true);
                            killedCount++;
                        }
                    }
                    catch (Exception)
                    {
                        // התהליך אולי נסגר מעצמו בשבריר שניה זו
                    }
                    finally
                    {
                        proc.Dispose();
                    }
                }
            }

            if (killedCount > 0)
            {
                _logger.LogInformation("[Extractor GC] Terminated {Count} orphaned FFmpeg/FFprobe processes.", killedCount);
            }
        }

        /// <summary>
        /// ניקוי קבצי מניפסט, גשרים, פריימים וקאש ישנים מהדיסק
        /// </summary>
        private void CleanupDiskArtifacts()
        {
            int deletedCount = 0;
            long freedBytes = 0;
            DateTime thresholdTemp = DateTime.UtcNow - TempFilesMaxAge;
            DateTime thresholdCache = DateTime.UtcNow - SpritesCacheMaxAge;

            string tempPath = Path.GetTempPath();

            // 💡 הוספת תחיליות מלאות כולל bridge_ ו-concat_ שמיוצרות ב-AdvancedExtractorService
            string[] tempPrefixes = { "spritesheet_", "sync_", "frame_", "stream_", "manifest_", "bridge_", "concat_" };

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
                            catch (IOException) { }
                            catch (UnauthorizedAccessException) { }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "[Extractor GC] Failed scanning general temp directory.");
            }

            // ניקוי קאש תמונות Spritesheet ישנות
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

                    // מחיקת תיקיות תחנה שהתרוקנו
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