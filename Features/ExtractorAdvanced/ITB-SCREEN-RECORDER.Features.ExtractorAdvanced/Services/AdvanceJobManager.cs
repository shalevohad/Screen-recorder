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

            string fileName = $"INVESTIGATION_{stationSummary}_{startUtc:yyyyMMdd_HHmm}_to_{endUtc:HHmm}.tar";

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
                StatusMessage = "Analyzing camera chunks & estimating size...",
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
            job.StatusMessage = $"Preparing synchronized export for {job.StationIds.Count} stations...";
            job.CreatedAtUtc = DateTime.UtcNow;

            // 💡 תיקון סינטקס המחרוזת האינטרפולטיבית
            string tempStagingDir = Path.Combine(Path.GetTempPath(), $"staging_{job.JobId}");
            Directory.CreateDirectory(tempStagingDir);

            string finalTarPath = Path.Combine(_exportDirectory, job.FileName);

            var sessionManifest = new AdvancedModels.SessionManifest
            {
                SessionId = job.JobId,
                RangeStartUtc = startUtc,
                RangeEndUtc = endUtc
            };

            try
            {
                double targetDurationSeconds = Math.Max(1.0, (endUtc - startUtc).TotalSeconds);
                double totalDurationMs = targetDurationSeconds * 1000.0;
                var generatedTrackPaths = new List<string>();

                double slicePerStation = 80.0 / job.StationIds.Count;
                var stopwatch = Stopwatch.StartNew();
                DateTime lastPersistUtc = DateTime.UtcNow;

                long precalculatedBytes = 0;
                foreach (var sId in job.StationIds)
                {
                    try
                    {
                        var chunks = await _storageScanner.GetChunksForStationAsync(sId, startUtc, endUtc);
                        foreach (var c in chunks)
                        {
                            if (!string.IsNullOrEmpty(c.FullPath) && File.Exists(c.FullPath))
                            {
                                precalculatedBytes += new FileInfo(c.FullPath).Length;
                            }
                            else
                            {
                                precalculatedBytes += 10 * 1024 * 1024;
                            }
                        }
                    }
                    catch { }
                }
                if (precalculatedBytes > 0) job.FileSizeBytes = precalculatedBytes;

                for (int i = 0; i < job.StationIds.Count; i++)
                {
                    string stationId = job.StationIds[i];
                    double baseStationProgress = i * slicePerStation;

                    var trackProgress = new Progress<(double SecondsProcessed, double Fps, double SpeedMultiplier)>(p =>
                    {
                        double fraction = Math.Clamp(p.SecondsProcessed / targetDurationSeconds, 0.0, 1.0);
                        double totalProgress = baseStationProgress + (fraction * slicePerStation);

                        job.ProgressPercent = (int)Math.Clamp(Math.Round(totalProgress, 0), 0, 84);

                        double remainingStationSeconds = Math.Max(0, targetDurationSeconds - p.SecondsProcessed);
                        double totalRemainingSec = (remainingStationSeconds / Math.Max(0.1, p.SpeedMultiplier))
                                                 + ((job.StationIds.Count - 1 - i) * (targetDurationSeconds / Math.Max(0.1, p.SpeedMultiplier)))
                                                 + 3.0;

                        job.EstimatedSecondsRemaining = Math.Round(totalRemainingSec, 0);

                        double elapsedSeconds = stopwatch.Elapsed.TotalSeconds;
                        if (elapsedSeconds > 0.8)
                        {
                            long currentSize = 0;
                            try
                            {
                                if (Directory.Exists(tempStagingDir))
                                {
                                    currentSize = Directory.GetFiles(tempStagingDir).Sum(f => new FileInfo(f).Length);
                                }
                            }
                            catch { }

                            if (currentSize > 0) job.FileSizeBytes = currentSize;
                            job.SpeedMBps = Math.Round((job.FileSizeBytes / (1024.0 * 1024.0)) / elapsedSeconds, 1);
                        }

                        job.StatusMessage = $"Rendering Track {i + 1} of {job.StationIds.Count}: {stationId} ({p.SpeedMultiplier:0.0}x)";

                        if ((DateTime.UtcNow - lastPersistUtc).TotalSeconds >= 1.0)
                        {
                            lastPersistUtc = DateTime.UtcNow;
                            PersistJobsToDisk();
                        }
                    });

                    string stationMp4Path = await _advancedExtractorService.CutSynchronizedStationTrackAsync(
                        stationId, startUtc, endUtc, tempStagingDir, trackProgress, CancellationToken.None);

                    generatedTrackPaths.Add(stationMp4Path);

                    sessionManifest.Tracks.Add(new AdvancedModels.SessionTrackInfo
                    {
                        Hostname = stationId,
                        VideoFileName = Path.GetFileName(stationMp4Path),
                        StartOffsetMs = 0,
                        DurationMs = totalDurationMs,
                        HasAudio = true
                    });
                }

                job.StatusMessage = "Bundling synchronized investigation archive (Tar)...";
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

                    byte[] manifestBytes = JsonSerializer.SerializeToUtf8Bytes(sessionManifest, new JsonSerializerOptions { WriteIndented = true });
                    await using var manifestMs = new MemoryStream(manifestBytes);
                    var manifestEntry = new PaxTarEntry(TarEntryType.RegularFile, "session.json")
                    {
                        DataStream = manifestMs
                    };
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

                _advLogger.LogInformation("[AdvanceJobManager] Synchronized bundle ready: {Path} ({Size} bytes)", finalTarPath, job.FileSizeBytes);
            }
            catch (Exception ex)
            {
                job.Status = "Failed";
                job.ErrorMessage = ex.Message;
                job.StatusMessage = "Synchronized export failed";
                job.EstimatedSecondsRemaining = 0;
                _advLogger.LogError(ex, "[AdvanceJobManager] Investigation packaging failed for job {JobId}", job.JobId);
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