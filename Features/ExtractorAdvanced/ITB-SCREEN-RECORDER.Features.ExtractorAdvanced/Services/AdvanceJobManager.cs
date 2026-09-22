// ==========================================
// File: Features/ExtractorAdvanced/Services/AdvanceJobManager.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Formats.Tar;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;
using AdvancedModels = ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services
{
    public interface IAdvanceJobManager : IExportJobManager
    {
        AdvancedModels.AdvanceJobInfo EnqueueAdvanceCutJob(AdvancedModels.AdvanceCutRequestDto request);
        Task<object> EstimateCutJobAsync(AdvancedModels.AdvanceCutRequestDto request);
    }

    public class AdvanceJobManager : ExportJobManager, IAdvanceJobManager
    {
        private readonly AdvancedExtractorService _advancedExtractorService;
        private readonly IStorageScannerService _storageScanner;
        private readonly ILogger<AdvanceJobManager> _advLogger;

        public AdvanceJobManager(
            IExtractorService extractorService,
            AdvancedExtractorService advancedExtractorService,
            IStorageScannerService storageScanner,
            IOptions<ExtractorOptions> options,
            ILogger<ExportJobManager> baseLogger,
            ILogger<AdvanceJobManager> advLogger)
            : base(extractorService, options, baseLogger)
        {
            _advancedExtractorService = advancedExtractorService;
            _storageScanner = storageScanner;
            _advLogger = advLogger;
        }

        public async Task<object> EstimateCutJobAsync(AdvancedModels.AdvanceCutRequestDto request)
        {
            DateTime startUtc = DateTimeOffset.FromUnixTimeMilliseconds(request.InEpochMs).UtcDateTime;
            DateTime endUtc = DateTimeOffset.FromUnixTimeMilliseconds(request.OutEpochMs).UtcDateTime;

            var allStationChunks = new Dictionary<string, List<RecordingChunkMetadata>>();
            long totalRawBytes = 0;

            foreach (var sId in request.StationIds)
            {
                var chunks = await _storageScanner.GetChunksForStationAsync(sId, startUtc, endUtc);
                allStationChunks[sId] = chunks;
                foreach (var c in chunks)
                {
                    if (!string.IsNullOrEmpty(c.FullPath) && File.Exists(c.FullPath))
                    {
                        totalRawBytes += new FileInfo(c.FullPath).Length;
                    }
                }
            }

            var plan = _advancedExtractorService.BuildSynchronizationPlan(request.StationIds, startUtc, endUtc, allStationChunks);
            double originalSeconds = Math.Max(1.0, (endUtc - startUtc).TotalSeconds);
            double activeFraction = Math.Clamp(plan.TotalActiveSeconds / originalSeconds, 0.05, 1.0);

            long estimatedBytes = (long)(totalRawBytes * activeFraction);
            if (estimatedBytes < 5 * 1024 * 1024)
            {
                estimatedBytes = (long)(request.StationIds.Count * (plan.TotalActiveSeconds / 60.0) * 15.0 * 1024.0 * 1024.0);
            }

            return new
            {
                estimatedFileSizeBytes = Math.Max(5 * 1024 * 1024, estimatedBytes),
                activeDurationSeconds = Math.Round(plan.TotalActiveSeconds, 1),
                skippedDurationSeconds = Math.Round(plan.RemovedGlobalGaps.Sum(g => g.SkippedDurationSeconds), 1),
                removedGlobalGapsCount = plan.RemovedGlobalGaps.Count,
                // 💡 החזרת הפערים המשותפים שייחתכו
                removedGlobalGaps = plan.RemovedGlobalGaps.Select(g => new
                {
                    gapIndex = g.GapIndex,
                    startEpochMs = new DateTimeOffset(g.StartUtc).ToUnixTimeMilliseconds(),
                    endEpochMs = new DateTimeOffset(g.EndUtc).ToUnixTimeMilliseconds(),
                    durationSeconds = g.SkippedDurationSeconds
                }),
                // 💡 החזרת המקטעים הפעילים האמיתיים שנמצאו בדיסק (30 שניות במקום 10 דקות!)
                activeSegments = plan.ActiveSegments.Select(s => new
                {
                    startEpochMs = new DateTimeOffset(s.StartUtc).ToUnixTimeMilliseconds(),
                    endEpochMs = new DateTimeOffset(s.EndUtc).ToUnixTimeMilliseconds(),
                    durationSeconds = s.DurationSeconds
                }),
                // 💡 הצ'אנקים האמיתיים פר תחנה
                stationChunks = allStationChunks.ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value.Select(c => new
                    {
                        startEpochMs = new DateTimeOffset(c.StartUtc).ToUnixTimeMilliseconds(),
                        endEpochMs = new DateTimeOffset(c.EndUtc).ToUnixTimeMilliseconds()
                    })
                )
            };
        }

        public AdvancedModels.AdvanceJobInfo EnqueueAdvanceCutJob(AdvancedModels.AdvanceCutRequestDto request)
        {
            if (request.StationIds == null || request.StationIds.Count == 0)
                throw new ArgumentException("At least one station must be selected for timeline export.");

            if (request.OutEpochMs <= request.InEpochMs)
                throw new ArgumentException("Out-point must be strictly greater than In-point.");

            DateTime startUtc = DateTimeOffset.FromUnixTimeMilliseconds(request.InEpochMs).UtcDateTime;
            DateTime endUtc = DateTimeOffset.FromUnixTimeMilliseconds(request.OutEpochMs).UtcDateTime;

            string stationSummary = string.Join("_", request.StationIds.Take(2));
            if (request.StationIds.Count > 2)
            {
                stationSummary += $"_and_{request.StationIds.Count - 2}_more";
            }

            string fileName = $"RECORDINGS_EXPORT_{stationSummary}_{startUtc:yyyyMMdd_HHmm}_to_{endUtc:HHmm}.tar";
            double durationMinutes = (endUtc - startUtc).TotalMinutes;
            long estimatedSize = (long)(request.StationIds.Count * durationMinutes * 15.0 * 1024.0 * 1024.0);
            if (estimatedSize < 5 * 1024 * 1024) estimatedSize = 15 * 1024 * 1024;

            var job = new AdvancedModels.AdvanceJobInfo
            {
                StationIds = request.StationIds,
                InEpochMs = request.InEpochMs,
                OutEpochMs = request.OutEpochMs,
                CutMode = "SynchronizedMultiTrack",
                FileName = fileName,
                NetworkFolderPath = _exportDirectory,
                Status = "Queued",
                StatusMessage = "Analyzing gaps & calculating synchronization...",
                ProgressPercent = 0,
                SpeedMBps = 0,
                FileSizeBytes = estimatedSize,
                EstimatedSecondsRemaining = Math.Max(10, (int)(durationMinutes * request.StationIds.Count * 2)),
                CreatedAtUtc = DateTime.UtcNow
            };

            _jobs[job.JobId] = job;
            PersistJobsToDisk();

            _ = Task.Run(() => ProcessSynchronizedExportAsync(job, startUtc, endUtc));
            return job;
        }

        private async Task ProcessSynchronizedExportAsync(AdvancedModels.AdvanceJobInfo job, DateTime startUtc, DateTime endUtc)
        {
            job.Status = "Processing";
            job.StatusMessage = $"Synchronizing {job.StationIds.Count} stations...";
            job.CreatedAtUtc = DateTime.UtcNow;

            string tempStagingDir = Path.Combine(Path.GetTempPath(), $"staging_{job.JobId}");
            Directory.CreateDirectory(tempStagingDir);

            string finalTarPath = Path.Combine(_exportDirectory, job.FileName);

            try
            {
                var allStationChunks = new Dictionary<string, List<RecordingChunkMetadata>>();
                long rawBytes = 0;
                foreach (var sId in job.StationIds)
                {
                    var chunks = await _storageScanner.GetChunksForStationAsync(sId, startUtc, endUtc);
                    allStationChunks[sId] = chunks;
                    foreach (var c in chunks)
                    {
                        if (!string.IsNullOrEmpty(c.FullPath) && File.Exists(c.FullPath))
                        {
                            rawBytes += new FileInfo(c.FullPath).Length;
                        }
                    }
                }

                var plan = _advancedExtractorService.BuildSynchronizationPlan(job.StationIds, startUtc, endUtc, allStationChunks);
                double originalDurationSec = Math.Max(1.0, (endUtc - startUtc).TotalSeconds);
                double exportedDurationSec = Math.Max(1.0, plan.TotalActiveSeconds);

                if (rawBytes > 0)
                {
                    job.FileSizeBytes = Math.Max(5 * 1024 * 1024, (long)(rawBytes * (exportedDurationSec / originalDurationSec)));
                }

                var generatedTrackPaths = new List<string>();
                var sessionTracks = new List<object>();

                bool isMultiStation = job.StationIds.Count > 1;
                double slicePerStation = 80.0 / job.StationIds.Count;
                var stopwatch = Stopwatch.StartNew();
                DateTime lastPersistUtc = DateTime.UtcNow;

                for (int i = 0; i < job.StationIds.Count; i++)
                {
                    string stationId = job.StationIds[i];
                    double baseStationProgress = i * slicePerStation;

                    var trackProgress = new Progress<(double SecondsProcessed, double Fps, double SpeedMultiplier)>(p =>
                    {
                        double fraction = Math.Clamp(p.SecondsProcessed / exportedDurationSec, 0.0, 1.0);
                        double totalProgress = baseStationProgress + (fraction * slicePerStation);
                        job.ProgressPercent = (int)Math.Clamp(Math.Round(totalProgress, 0), 0, 84);

                        double remainingStationSec = Math.Max(0, exportedDurationSec - p.SecondsProcessed);
                        double totalRemSec = (remainingStationSec / Math.Max(0.1, p.SpeedMultiplier))
                                           + ((job.StationIds.Count - 1 - i) * (exportedDurationSec / Math.Max(0.1, p.SpeedMultiplier)))
                                           + 3.0;

                        job.EstimatedSecondsRemaining = Math.Round(totalRemSec, 0);

                        long currentBuiltBytes = 0;
                        try
                        {
                            if (Directory.Exists(tempStagingDir))
                            {
                                currentBuiltBytes = Directory.GetFiles(tempStagingDir).Sum(f => new FileInfo(f).Length);
                            }
                        }
                        catch { }

                        double elapsed = stopwatch.Elapsed.TotalSeconds;
                        if (elapsed > 0.8 && currentBuiltBytes > 0)
                        {
                            job.SpeedMBps = Math.Round((currentBuiltBytes / (1024.0 * 1024.0)) / elapsed, 1);
                        }

                        double builtMb = currentBuiltBytes / (1024.0 * 1024.0);
                        job.StatusMessage = $"Rendering Track {i + 1} of {job.StationIds.Count}: {stationId} • Built: {builtMb:0.1} MB";

                        if ((DateTime.UtcNow - lastPersistUtc).TotalSeconds >= 1.0)
                        {
                            lastPersistUtc = DateTime.UtcNow;
                            PersistJobsToDisk();
                        }
                    });

                    // 💡 רינדור הקובץ מקבל כעת חזרה גם את האם קיים ערוץ אודיו
                    var trackResult = await _advancedExtractorService.CutSynchronizedTrackAsync(
                        stationId, plan, allStationChunks[stationId], tempStagingDir, isMultiStation, trackProgress, CancellationToken.None);

                    generatedTrackPaths.Add(trackResult.OutputFilePath);

                    sessionTracks.Add(new
                    {
                        hostname = stationId,
                        videoFileName = Path.GetFileName(trackResult.OutputFilePath),
                        startOffsetMs = 0,
                        durationMs = exportedDurationSec * 1000.0,
                        hasAudio = trackResult.HasAudio
                    });
                }

                job.StatusMessage = "Bundling synchronized archive (Tar)...";
                job.ProgressPercent = 85;
                job.EstimatedSecondsRemaining = 2;
                PersistJobsToDisk();

                await using (var tarStream = new FileStream(finalTarPath, FileMode.Create, FileAccess.Write, FileShare.None))
                await using (var tarWriter = new TarWriter(tarStream, TarEntryFormat.Pax, leaveOpen: false))
                {
                    for (int k = 0; k < generatedTrackPaths.Count; k++)
                    {
                        var trackFile = generatedTrackPaths[k];
                        if (File.Exists(trackFile))
                        {
                            await tarWriter.WriteEntryAsync(trackFile, $"recordings/{Path.GetFileName(trackFile)}");
                        }
                        job.ProgressPercent = (int)Math.Round(85.0 + (((k + 1.0) / generatedTrackPaths.Count) * 12.0), 0);
                    }

                    var sessionManifestObj = new
                    {
                        sessionId = job.JobId,
                        rangeStartUtc = startUtc,
                        rangeEndUtc = endUtc,
                        originalDurationSeconds = originalDurationSec,
                        exportedDurationSeconds = exportedDurationSec,
                        removedGlobalGaps = plan.RemovedGlobalGaps.Select(g => new
                        {
                            gapIndex = g.GapIndex,
                            startUtc = g.StartUtc,
                            endUtc = g.EndUtc,
                            skippedDurationSeconds = g.SkippedDurationSeconds,
                            timelineOffsetSeconds = g.TimelineOffsetSeconds
                        }),
                        stationGaps = plan.StationGaps.Select(g => new
                        {
                            stationId = g.StationId,
                            startUtc = g.StartUtc,
                            endUtc = g.EndUtc,
                            durationSeconds = g.DurationSeconds,
                            bridgeType = "NoSignal"
                        }),
                        tracks = sessionTracks
                    };

                    byte[] manifestBytes = JsonSerializer.SerializeToUtf8Bytes(sessionManifestObj, new JsonSerializerOptions { WriteIndented = true });
                    await using var manifestMs = new MemoryStream(manifestBytes);
                    var manifestEntry = new PaxTarEntry(TarEntryType.RegularFile, "session.json") { DataStream = manifestMs };
                    await tarWriter.WriteEntryAsync(manifestEntry);
                }

                var fi = new FileInfo(finalTarPath);
                job.OutputFilePath = finalTarPath;
                job.FileSizeBytes = fi.Exists ? fi.Length : job.FileSizeBytes;
                job.ProgressPercent = 100;
                job.EstimatedSecondsRemaining = 0;
                job.Status = "Completed";
                job.StatusMessage = "Ready for download";
                job.CompletedAtUtc = DateTime.UtcNow;

                _advLogger.LogInformation("[AdvanceJobManager] Archive ready: {Path} ({Size} bytes)", finalTarPath, job.FileSizeBytes);
            }
            catch (Exception ex)
            {
                job.Status = "Failed";
                job.ErrorMessage = ex.Message;
                job.StatusMessage = "Export failed";
                job.EstimatedSecondsRemaining = 0;
                _advLogger.LogError(ex, "[AdvanceJobManager] Export failed for job {JobId}", job.JobId);
            }
            finally
            {
                PersistJobsToDisk();
                if (Directory.Exists(tempStagingDir))
                {
                    try { Directory.Delete(tempStagingDir, true); } catch { }
                }
            }
        }
    }
}