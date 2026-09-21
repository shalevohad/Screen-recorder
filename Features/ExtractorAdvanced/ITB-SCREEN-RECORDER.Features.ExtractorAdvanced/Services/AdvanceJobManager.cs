// ==========================================
// File: Features/ExtractorAdvanced/Services/AdvanceJobManager.cs
// ==========================================
using System;
using System.Collections.Generic;
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
// שימוש מפורש במרחב השמות המקומי למניעת כפילות אמביגואידית
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
        private readonly ILogger<AdvanceJobManager> _advLogger;

        public AdvanceJobManager(
            IExtractorService extractorService,
            AdvancedExtractorService advancedExtractorService,
            IOptions<ExtractorOptions> options,
            ILogger<ExportJobManager> baseLogger,
            ILogger<AdvanceJobManager> advLogger)
            : base(extractorService, options, baseLogger)
        {
            _advancedExtractorService = advancedExtractorService;
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

            var job = new AdvancedModels.AdvanceJobInfo
            {
                StationIds = request.StationIds,
                InEpochMs = request.InEpochMs,
                OutEpochMs = request.OutEpochMs,
                CutMode = "SynchronizedMultiTrack",
                FileName = fileName,
                NetworkFolderPath = _exportDirectory
            };

            _jobs[job.JobId] = job;
            PersistJobsToDisk();

            _ = Task.Run(() => ProcessSynchronizedExportAsync(job, startUtc, endUtc));
            return job;
        }

        private async Task ProcessSynchronizedExportAsync(AdvancedModels.AdvanceJobInfo job, DateTime startUtc, DateTime endUtc)
        {
            job.Status = "Processing";
            job.StatusMessage = $"Synchronizing {job.StationIds.Count} camera timelines...";
            // שימוש בשדה הקיים במחלקת הבסיס ExportJobInfo
            job.CreatedAtUtc = DateTime.UtcNow;

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
                double totalDurationMs = (endUtc - startUtc).TotalMilliseconds;
                var generatedTrackPaths = new List<string>();

                for (int i = 0; i < job.StationIds.Count; i++)
                {
                    string stationId = job.StationIds[i];
                    job.StatusMessage = $"Rendering synchronized track: {stationId} ({i + 1}/{job.StationIds.Count})...";
                    job.ProgressPercent = (int)(((double)i / job.StationIds.Count) * 80);

                    string stationMp4Path = await _advancedExtractorService.CutSynchronizedStationTrackAsync(
                        stationId, startUtc, endUtc, tempStagingDir, CancellationToken.None);

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

                job.StatusMessage = "Bundling synchronized investigation archive...";
                job.ProgressPercent = 85;

                await using (var tarStream = new FileStream(finalTarPath, FileMode.Create, FileAccess.Write, FileShare.None))
                await using (var tarWriter = new TarWriter(tarStream, TarEntryFormat.Pax, leaveOpen: false))
                {
                    foreach (var trackFile in generatedTrackPaths)
                    {
                        if (File.Exists(trackFile))
                        {
                            await tarWriter.WriteEntryAsync(trackFile, $"recordings/{Path.GetFileName(trackFile)}");
                        }
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
                job.FileSizeBytes = fi.Exists ? fi.Length : 0;
                job.ProgressPercent = 100;
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