// ==========================================
// File: Features/Extractor/Services/ExtractorGarbageCollectorService.cs
// ==========================================
using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    /// <summary>
    /// Background service that cleans orphaned temporary spool files on disk and terminates runaway or orphaned FFmpeg/FFprobe processes.
    /// </summary>
    public class ExtractorGarbageCollectorService : BackgroundService
    {
        private readonly ILogger<ExtractorGarbageCollectorService> _logger;

        private static readonly TimeSpan RunInterval = TimeSpan.FromMinutes(10);
        private static readonly TimeSpan TempFilesMaxAge = TimeSpan.FromMinutes(15);
        private static readonly TimeSpan SpritesCacheMaxAge = TimeSpan.FromHours(8);
        private static readonly TimeSpan MaxProcessLifetime = TimeSpan.FromMinutes(5);

        public ExtractorGarbageCollectorService(ILogger<ExtractorGarbageCollectorService> logger)
        {
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("[Extractor GC] Service initialized. Running every {Interval} minutes.", RunInterval.TotalMinutes);

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

        private static readonly System.Collections.Concurrent.ConcurrentDictionary<int, DateTime> _trackedExtractorPids = new();

        /// <summary>
        /// Registers a spawned Extractor FFmpeg/FFprobe process ID so that garbage collection only terminates Extractor-owned tasks.
        /// </summary>
        public static void TrackProcess(int processId)
        {
            _trackedExtractorPids[processId] = DateTime.UtcNow;
        }

        public static void UntrackProcess(int processId)
        {
            _trackedExtractorPids.TryRemove(processId, out _);
        }

        private void CleanupOrphanProcesses()
        {
            DateTime processThreshold = DateTime.UtcNow - MaxProcessLifetime;
            int killedCount = 0;

            // Only clean up Extractor-spawned processes that have been explicitly tracked and timed out.
            // NEVER blindly terminate system-wide FFmpeg processes (which breaks continuous live recording and streaming).
            foreach (var kvp in _trackedExtractorPids.ToArray())
            {
                int pid = kvp.Key;
                DateTime startedAt = kvp.Value;

                if (startedAt < processThreshold)
                {
                    try
                    {
                        var proc = Process.GetProcessById(pid);
                        if (!proc.HasExited)
                        {
                            _logger.LogWarning("[Extractor GC] Killing stale Extractor job process (PID: {Pid}, Running since: {StartTime:HH:mm:ss})",
                                pid, startedAt);
                            proc.Kill(entireProcessTree: true);
                            killedCount++;
                        }
                    }
                    catch (ArgumentException)
                    {
                        // Process already exited
                    }
                    catch (Exception ex)
                    {
                        _logger.LogDebug("[Extractor GC] Could not kill tracked process {Pid}: {Msg}", pid, ex.Message);
                    }
                    finally
                    {
                        _trackedExtractorPids.TryRemove(pid, out _);
                    }
                }
            }

            if (killedCount > 0)
            {
                _logger.LogInformation("[Extractor GC] Terminated {Count} orphaned Extractor FFmpeg/FFprobe processes.", killedCount);
            }
        }

        private void CleanupDiskArtifacts()
        {
            int deletedCount = 0;
            long freedBytes = 0;
            DateTime thresholdTemp = DateTime.UtcNow - TempFilesMaxAge;
            DateTime thresholdCache = DateTime.UtcNow - SpritesCacheMaxAge;

            string tempPath = Path.GetTempPath();

            // Covers temp prefixes for both extractor engines: itb_spool_, cut_, bridge_, concat_, manifest_
            string[] tempPrefixes = { "spritesheet_", "sync_", "frame_", "stream_", "manifest_", "bridge_", "concat_", "itb_spool_", "cut_" };

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