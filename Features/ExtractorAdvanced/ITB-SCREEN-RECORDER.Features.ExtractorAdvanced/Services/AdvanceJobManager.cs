// ==========================================
// File: Features/ExtractorAdvanced/Services/AdvanceJobManager.cs
// ==========================================
using System;
using System.Globalization;
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
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Features.Extractor.Data.Repositories;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Core.Contracts.Topology;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Data.Repositories;
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
        private readonly IAdvanceJobRepository _advanceRepository;
        private readonly IFfmpegBinaryResolver _binaryResolver;
        private readonly ILogger<AdvanceJobManager> _advLogger;

        private readonly ITB_SCREEN_RECORDER.Core.Contracts.Network.IStationRoleProvider? _stationRoleProvider;
        private readonly IOptionsMonitor<SystemConfig>? _systemConfig;

        public AdvanceJobManager(
            IExtractorService extractorService,
            AdvancedExtractorService advancedExtractorService,
            IStorageScannerService storageScanner,
            IExportJobRepository exportJobRepository,
            IAdvanceJobRepository advanceRepository,
            IFfmpegBinaryResolver binaryResolver,
            IOptions<ExtractorOptions> options,
            ILogger<ExportJobManager> baseLogger,
            ILogger<AdvanceJobManager> advLogger,
            ITB_SCREEN_RECORDER.Core.Contracts.Network.IStationRoleProvider? stationRoleProvider = null,
            IOptionsMonitor<SystemConfig>? systemConfig = null)
            : base(extractorService, exportJobRepository, options, baseLogger)
        {
            _advancedExtractorService = advancedExtractorService;
            _storageScanner = storageScanner;
            _advanceRepository = advanceRepository;
            _binaryResolver = binaryResolver;
            _advLogger = advLogger;
            _stationRoleProvider = stationRoleProvider;
            _systemConfig = systemConfig;

            _ = LoadAndRecoverAdvanceJobsAsync();
        }

        private async Task LoadAndRecoverAdvanceJobsAsync()
        {
            try
            {
                var dbJobs = await _advanceRepository.GetAllJobsAsync();
                foreach (var job in dbJobs)
                {
                    if (job.Status == "Processing" || job.Status == "Queued")
                    {
                        job.Status = "Failed";
                        job.ErrorMessage = "Task terminated unexpectedly due to server restart.";
                        job.CompletedAtUtc = DateTime.UtcNow;
                        await _advanceRepository.UpsertJobAsync(job);
                    }

                    _jobs[job.JobId] = job;
                }
                _advLogger.LogInformation("[AdvanceJobManager] Restored {Count} jobs from advance_extractor.db", dbJobs.Count);
            }
            catch (Exception ex)
            {
                _advLogger.LogError(ex, "[AdvanceJobManager] Failed to restore jobs from advance_extractor.db");
            }
        }

        public static (int Width, int Height, int BitrateKbps) ParseQualityResolution(
            string? qualityOrResolution,
            double aspect = 16.0 / 9.0,
            int fallbackRefW = 1920,
            int fallbackRefH = 1080)
        {
            if (string.IsNullOrWhiteSpace(qualityOrResolution))
            {
                if (Math.Abs(aspect - (16.0 / 9.0)) <= 0.05)
                    return (1920, 1080, 6000);

                int defH = 1080;
                int defW = (int)Math.Round(defH * aspect);
                defW -= (defW % 2);
                int br = (int)Math.Clamp((((long)defW * defH) * 6000L) / (1920L * 1080L), 2000L, 50000L);
                return (defW, defH, br);
            }

            string normalized = qualityOrResolution.Trim().ToUpperInvariant();

            if (normalized == "NATIVE" || normalized == "1:1" || normalized == "ORIGINAL")
            {
                int nw = fallbackRefW > 0 ? fallbackRefW : 1920;
                int nh = fallbackRefH > 0 ? fallbackRefH : 1080;
                nw -= (nw % 2);
                nh -= (nh % 2);
                long px = (long)nw * nh;
                int br = (int)Math.Clamp((px * 6000L) / (1920L * 1080L), 2000L, 50000L);
                return (nw, nh, br);
            }

            // Standard 16:9 fixed numbers for backward compatibility with established tests
            if (Math.Abs(aspect - (16.0 / 9.0)) <= 0.05)
            {
                var standardMatch = normalized switch
                {
                    "HD" or "720P" or "720" or "1280X720" => (1280, 720, 2500),
                    "FHD" or "1080P" or "1080" or "1920X1080" or "FULLHD" => (1920, 1080, 6000),
                    "2K" or "1440P" or "1440" or "2560X1440" or "QHD" => (2560, 1440, 12000),
                    "4K" or "2160P" or "2160" or "3840X2160" or "UHD" => (3840, 2160, 24000),
                    _ => (0, 0, 0)
                };
                if (standardMatch.Item1 > 0) return standardMatch;
            }

            // Check if exact dimensions provided like 3840X1080 or 7680X2160
            if (normalized.Contains('X'))
            {
                var parts = normalized.Split('X', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
                if (parts.Length == 2 && int.TryParse(parts[0], out int customW) && int.TryParse(parts[1], out int customH) && customW > 100 && customH > 100)
                {
                    customW -= (customW % 2);
                    customH -= (customH % 2);
                    long px = (long)customW * customH;
                    int br = (int)Math.Clamp((px * 6000L) / (1920L * 1080L), 2000L, 50000L);
                    return (customW, customH, br);
                }
            }

            // Custom Aspect Ratio scaling (e.g. 32:9 dual screen, 21:9 ultrawide, 16:10, 4:3)
            int targetH = normalized switch
            {
                "HD" or "720P" or "720" => 720,
                "FHD" or "1080P" or "1080" or "FULLHD" => 1080,
                "2K" or "1440P" or "1440" or "QHD" => 1440,
                "4K" or "2160P" or "2160" or "UHD" => 2160,
                _ => 1080
            };

            int targetW = (int)Math.Round(targetH * aspect);
            targetW -= (targetW % 2);
            targetH -= (targetH % 2);

            long totalPixels = (long)targetW * targetH;
            int bitrateKbps = (int)Math.Clamp((totalPixels * 6000L) / (1920L * 1080L), 2000L, 50000L);

            return (targetW, targetH, bitrateKbps);
        }

        public static string NormalizeQualityName(string? qualityOrResolution)
        {
            if (string.IsNullOrWhiteSpace(qualityOrResolution)) return "FHD";
            string normalized = qualityOrResolution.Trim().ToUpperInvariant();
            if (normalized == "NATIVE" || normalized == "1:1" || normalized == "ORIGINAL" || normalized.Contains('X'))
                return normalized;

            return normalized switch
            {
                "HD" or "720P" or "720" or "1280X720" => "HD",
                "FHD" or "1080P" or "1080" or "1920X1080" or "FULLHD" => "FHD",
                "2K" or "1440P" or "1440" or "2560X1440" or "QHD" => "2K",
                "4K" or "2160P" or "2160" or "3840X2160" or "UHD" => "4K",
                _ => "FHD"
            };
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
                        totalRawBytes += c.FileSizeBytes > 0 ? c.FileSizeBytes : new FileInfo(c.FullPath).Length;
                    }
                }
            }

            var plan = _advancedExtractorService.BuildSynchronizationPlan(request.StationIds, startUtc, endUtc, allStationChunks);
            plan.KeystrokeMode = request.KeystrokeMode;

            int estRefW = request.CanvasLayout?.Width ?? request.CanvasLayoutTimeline?.Keyframes?.FirstOrDefault()?.Layout?.Width ?? 1920;
            int estRefH = request.CanvasLayout?.Height ?? request.CanvasLayoutTimeline?.Keyframes?.FirstOrDefault()?.Layout?.Height ?? 1080;
            double estAspect = (estRefW > 0 && estRefH > 0) ? ((double)estRefW / estRefH) : (16.0 / 9.0);

            string qualityName = NormalizeQualityName(request.Resolution ?? request.VideoQuality ?? request.CanvasLayout?.Resolution ?? request.CanvasLayoutTimeline?.Resolution);
            var (targetW, targetH, targetBitrateKbps) = ParseQualityResolution(qualityName, estAspect, estRefW, estRefH);

            double originalSeconds = Math.Max(1.0, (endUtc - startUtc).TotalSeconds);
            double activeFraction = Math.Clamp(plan.TotalActiveSeconds / originalSeconds, 0.05, 1.0);

            // Calculate estimated file size for single master canvas MP4 based on target resolution/bitrate
            long estimatedBytes = (long)(((targetBitrateKbps + 128) * 1000.0 / 8.0) * plan.TotalActiveSeconds);
            if (estimatedBytes < 5 * 1024 * 1024) estimatedBytes = 5 * 1024 * 1024;

            return new
            {
                estimatedFileSizeBytes = estimatedBytes,
                resolution = qualityName,
                videoQuality = qualityName,
                width = targetW,
                height = targetH,
                targetBitrateKbps = targetBitrateKbps,
                activeDurationSeconds = Math.Round(plan.TotalActiveSeconds, 1),
                skippedDurationSeconds = Math.Round(plan.RemovedGlobalGaps.Sum(g => g.SkippedDurationSeconds), 1),
                removedGlobalGapsCount = plan.RemovedGlobalGaps.Count,
                removedGlobalGaps = plan.RemovedGlobalGaps.Select(g => new
                {
                    gapIndex = g.GapIndex,
                    startEpochMs = new DateTimeOffset(g.StartUtc).ToUnixTimeMilliseconds(),
                    endEpochMs = new DateTimeOffset(g.EndUtc).ToUnixTimeMilliseconds(),
                    durationSeconds = g.SkippedDurationSeconds
                }),
                activeSegments = plan.ActiveSegments.Select(s => new
                {
                    startEpochMs = new DateTimeOffset(s.StartUtc).ToUnixTimeMilliseconds(),
                    endEpochMs = new DateTimeOffset(s.EndUtc).ToUnixTimeMilliseconds(),
                    durationSeconds = s.DurationSeconds
                }),
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
            // Parse ISO time strings if epoch ms not supplied directly
            if (request.InEpochMs <= 0 && !string.IsNullOrWhiteSpace(request.StartTime))
            {
                if (DateTimeOffset.TryParse(request.StartTime, out var sDto))
                    request.InEpochMs = sDto.ToUnixTimeMilliseconds();
            }
            if (request.OutEpochMs <= 0 && !string.IsNullOrWhiteSpace(request.EndTime))
            {
                if (DateTimeOffset.TryParse(request.EndTime, out var eDto))
                    request.OutEpochMs = eDto.ToUnixTimeMilliseconds();
            }

            // If stationIds omitted but canvasLayout placements specified, derive stationIds from placements
            if ((request.StationIds == null || request.StationIds.Count == 0) && request.CanvasLayout?.Placements?.Count > 0)
            {
                request.StationIds = request.CanvasLayout.Placements
                    .Select(p => p.StationId)
                    .Where(s => !string.IsNullOrWhiteSpace(s))
                    .Distinct(StringComparer.OrdinalIgnoreCase)
                    .ToList();
            }

            // Resolve role aliases to physical hostnames across all parameters for the specified time range
            if (_stationRoleProvider != null)
            {
                try
                {
                    var aliases = _stationRoleProvider.GetStationRoleAliasesForTimeRangeAsync(request.InEpochMs, request.OutEpochMs).GetAwaiter().GetResult();
                    var resolvedIds = new List<string>();
                    foreach (var s in request.StationIds ?? new List<string>())
                    {
                        var match = aliases.FirstOrDefault(kvp => kvp.Value.Equals(s, StringComparison.OrdinalIgnoreCase));
                        string resolved = !string.IsNullOrEmpty(match.Key) ? match.Key : s;
                        if (!resolvedIds.Contains(resolved, StringComparer.OrdinalIgnoreCase))
                            resolvedIds.Add(resolved);
                    }
                    request.StationIds = resolvedIds;

                    if (request.CanvasLayout?.Placements != null)
                    {
                        foreach (var p in request.CanvasLayout.Placements)
                        {
                            var match = aliases.FirstOrDefault(kvp => kvp.Value.Equals(p.StationId, StringComparison.OrdinalIgnoreCase));
                            if (!string.IsNullOrEmpty(match.Key))
                            {
                                if (string.IsNullOrWhiteSpace(p.Label)) p.Label = p.StationId;
                                p.StationId = match.Key;
                            }
                            else if (string.IsNullOrWhiteSpace(p.Label))
                            {
                                if (aliases.TryGetValue(p.StationId, out var roleName))
                                {
                                    p.Label = roleName;
                                }
                            }
                        }
                    }

                    if (!string.IsNullOrEmpty(request.AudioSourceStation))
                    {
                        var match = aliases.FirstOrDefault(kvp => kvp.Value.Equals(request.AudioSourceStation, StringComparison.OrdinalIgnoreCase));
                        if (!string.IsNullOrEmpty(match.Key)) request.AudioSourceStation = match.Key;
                    }
                }
                catch { }
            }

            if (request.CanvasLayoutTimeline != null && request.CanvasLayoutTimeline.Keyframes.Count > 0)
            {
                if (request.StationIds == null)
                {
                    request.StationIds = new List<string>();
                }

                var timelineStations = request.CanvasLayoutTimeline.Keyframes
                    .SelectMany(k => k.Layout.Placements.Select(p => p.StationId))
                    .Where(s => !string.IsNullOrWhiteSpace(s))
                    .Distinct(StringComparer.OrdinalIgnoreCase)
                    .ToList();

                foreach (var st in timelineStations)
                {
                    if (!request.StationIds.Contains(st, StringComparer.OrdinalIgnoreCase))
                        request.StationIds.Add(st);
                }

                // Resolve temporal role aliases for each keyframe timestamp
                if (_stationRoleProvider != null)
                {
                    foreach (var kf in request.CanvasLayoutTimeline.Keyframes)
                    {
                        long kfEpoch = kf.TimestampEpochMs > 0 ? kf.TimestampEpochMs : request.InEpochMs;
                        try
                        {
                            var roleMap = _stationRoleProvider.GetStationRoleAliasesForTimeRangeAsync(kfEpoch, kfEpoch + 1000).GetAwaiter().GetResult();
                            var aliasToHost = roleMap.ToDictionary(kvp => kvp.Value, kvp => kvp.Key, StringComparer.OrdinalIgnoreCase);

                            foreach (var p in kf.Layout.Placements)
                            {
                                if (aliasToHost.TryGetValue(p.StationId, out var resolvedHost))
                                {
                                    if (string.IsNullOrWhiteSpace(p.Label)) p.Label = p.StationId;
                                    p.StationId = resolvedHost;
                                }
                                else if (string.IsNullOrWhiteSpace(p.Label) && roleMap.TryGetValue(p.StationId, out var roleName))
                                {
                                    p.Label = roleName;
                                }
                            }
                        }
                        catch { }
                    }
                }
            }

            if (request.StationIds == null || request.StationIds.Count == 0)
                throw new ArgumentException("At least one station must be selected for timeline export.");

            if (request.OutEpochMs <= request.InEpochMs)
                throw new ArgumentException("Out-point must be strictly greater than In-point.");

            DateTime startUtc = DateTimeOffset.FromUnixTimeMilliseconds(request.InEpochMs).UtcDateTime;
            DateTime endUtc = DateTimeOffset.FromUnixTimeMilliseconds(request.OutEpochMs).UtcDateTime;

            DateTime exportTimeUtc = DateTime.UtcNow;
            string fileName = !string.IsNullOrWhiteSpace(request.FileName)
                ? (request.FileName.EndsWith(".mp4", StringComparison.OrdinalIgnoreCase) ? request.FileName : $"{request.FileName}.mp4")
                : $"{exportTimeUtc:yyyy-MM-dd_HH-mm-ss}.mp4";

            if (File.Exists(Path.Combine(_exportDirectory, fileName)))
            {
                fileName = $"{exportTimeUtc:yyyy-MM-dd_HH-mm-ss-fff}.mp4";
            }
            int estRefW = request.CanvasLayout?.Width ?? request.CanvasLayoutTimeline?.Keyframes?.FirstOrDefault()?.Layout?.Width ?? 1920;
            int estRefH = request.CanvasLayout?.Height ?? request.CanvasLayoutTimeline?.Keyframes?.FirstOrDefault()?.Layout?.Height ?? 1080;
            double estAspect = (estRefW > 0 && estRefH > 0) ? ((double)estRefW / estRefH) : (16.0 / 9.0);

            string qualityName = NormalizeQualityName(request.Resolution ?? request.VideoQuality ?? request.CanvasLayout?.Resolution ?? request.CanvasLayoutTimeline?.Resolution);
            var (targetW, targetH, targetBitrateKbps) = ParseQualityResolution(qualityName, estAspect, estRefW, estRefH);

            double durationSeconds = Math.Max(1.0, (endUtc - startUtc).TotalSeconds);
            double durationMinutes = durationSeconds / 60.0;
            long estimatedSize = (long)(((targetBitrateKbps + 128) * 1000.0 / 8.0) * durationSeconds);
            if (estimatedSize < 5 * 1024 * 1024) estimatedSize = 5 * 1024 * 1024;

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
                Resolution = qualityName,
                VideoQuality = qualityName,
                EstimatedSecondsRemaining = Math.Max(10, (int)(durationMinutes * request.StationIds.Count * 2)),
                CreatedAtUtc = DateTime.UtcNow,
                // Enforce keystroke burn-in or none
                KeystrokeMode = request.KeystrokeMode == ITB_SCREEN_RECORDER.Core.Contracts.Keystroke.KeystrokeExportMode.None 
                    ? ITB_SCREEN_RECORDER.Core.Contracts.Keystroke.KeystrokeExportMode.None 
                    : ITB_SCREEN_RECORDER.Core.Contracts.Keystroke.KeystrokeExportMode.BurnIn,
                CompositionScope = request.CompositionScope ?? "intra-station",
                LayoutMode = request.LayoutMode ?? "director",
                TargetDisplayId = request.TargetDisplayId,
                IsPipSwapped = request.IsPipSwapped,
                IsAutoDirectorEnabled = request.IsAutoDirectorEnabled,
                DirectorSegments = request.DirectorSegments,
                AudioRoutingSegments = request.AudioRoutingSegments,
                AudioSourceStation = request.AudioSourceStation,
                CanvasLayout = request.CanvasLayout,
                CanvasLayoutTimeline = request.CanvasLayoutTimeline,
                UtcClockPosition = request.UtcClockPosition ?? "top-right",
                CreatedBy = !string.IsNullOrWhiteSpace(request.CreatedBy) ? request.CreatedBy : "Guest Operator",
                Notes = !string.IsNullOrWhiteSpace(request.Notes) ? request.Notes.Trim() : null
            };

            _jobs[job.JobId] = job;
            _ = _advanceRepository.UpsertJobAsync(job);

            _ = Task.Run(() => ProcessSynchronizedExportAsync(job, startUtc, endUtc));
            return job;
        }

        public override bool DismissJob(string jobId)
        {
            bool removed = base.DismissJob(jobId);
            _ = _advanceRepository.DeleteJobAsync(jobId);
            return removed;
        }

        public override bool ToggleBookmark(string jobId)
        {
            bool toggled = base.ToggleBookmark(jobId);
            if (_jobs.TryGetValue(jobId, out var job) && job is AdvancedModels.AdvanceJobInfo advJob)
            {
                _ = _advanceRepository.UpsertJobAsync(advJob);
            }
            return toggled;
        }

        private AdvancedModels.CustomCanvasLayoutDto GenerateDefaultGridLayout(
            List<string> stationIds,
            Dictionary<string, List<RecordingChunkMetadata>> allStationChunks,
            IReadOnlyDictionary<string, string>? roleMap = null,
            int targetWidth = 1920,
            int targetHeight = 1080)
        {
            var layout = new AdvancedModels.CustomCanvasLayoutDto
            {
                Resolution = targetWidth >= 3840 ? "4K" : targetWidth >= 2560 ? "2K" : targetWidth <= 1280 ? "HD" : "FHD",
                Width = targetWidth,
                Height = targetHeight,
                BackgroundColor = "#070A10",
                Fps = 30.0,
                Placements = new List<AdvancedModels.CanvasPlacementDto>()
            };

            int count = stationIds.Count;
            if (count == 0) return layout;

            string[] borderColors = { "#06B6D4", "#10B981", "#F59E0B", "#F43F5E", "#8B5CF6", "#EC4899" };

            string GetLabel(string sId)
            {
                if (roleMap != null && roleMap.TryGetValue(sId, out var role) && !string.IsNullOrWhiteSpace(role))
                    return role;
                return sId;
            }

            if (count == 1)
            {
                string sId = stationIds[0];
                layout.Placements.Add(new AdvancedModels.CanvasPlacementDto
                {
                    StationId = sId,
                    DisplayId = "director",
                    X = 0,
                    Y = 0,
                    Width = targetWidth,
                    Height = targetHeight,
                    ZIndex = 0,
                    BorderWidth = 0,
                    BorderColor = borderColors[0],
                    Label = GetLabel(sId)
                });
            }
            else if (count == 2)
            {
                int halfW = targetWidth / 2;
                for (int i = 0; i < 2; i++)
                {
                    string sId = stationIds[i];
                    layout.Placements.Add(new AdvancedModels.CanvasPlacementDto
                    {
                        StationId = sId,
                        DisplayId = "director",
                        X = i * halfW,
                        Y = 0,
                        Width = halfW,
                        Height = targetHeight,
                        ZIndex = i,
                        BorderWidth = 2,
                        BorderColor = borderColors[i % borderColors.Length],
                        Label = GetLabel(sId)
                    });
                }
            }
            else if (count <= 4)
            {
                int halfW = targetWidth / 2;
                int halfH = targetHeight / 2;
                for (int i = 0; i < count; i++)
                {
                    string sId = stationIds[i];
                    int col = i % 2;
                    int row = i / 2;
                    int x = col * halfW;
                    int y = row * halfH;
                    if (count == 3 && i == 2)
                    {
                        x = halfW / 2;
                    }

                    layout.Placements.Add(new AdvancedModels.CanvasPlacementDto
                    {
                        StationId = sId,
                        DisplayId = "director",
                        X = x,
                        Y = y,
                        Width = halfW,
                        Height = halfH,
                        ZIndex = i,
                        BorderWidth = 2,
                        BorderColor = borderColors[i % borderColors.Length],
                        Label = GetLabel(sId)
                    });
                }
            }
            else if (count <= 6)
            {
                int thirdW = targetWidth / 3;
                int halfH = targetHeight / 2;
                for (int i = 0; i < count; i++)
                {
                    string sId = stationIds[i];
                    int col = i % 3;
                    int row = i / 3;
                    layout.Placements.Add(new AdvancedModels.CanvasPlacementDto
                    {
                        StationId = sId,
                        DisplayId = "director",
                        X = col * thirdW,
                        Y = row * halfH,
                        Width = thirdW,
                        Height = halfH,
                        ZIndex = i,
                        BorderWidth = 2,
                        BorderColor = borderColors[i % borderColors.Length],
                        Label = GetLabel(sId)
                    });
                }
            }
            else
            {
                int thirdW = targetWidth / 3;
                int thirdH = targetHeight / 3;
                for (int i = 0; i < Math.Min(count, 9); i++)
                {
                    string sId = stationIds[i];
                    int col = i % 3;
                    int row = i / 3;
                    layout.Placements.Add(new AdvancedModels.CanvasPlacementDto
                    {
                        StationId = sId,
                        DisplayId = "director",
                        X = col * thirdW,
                        Y = row * thirdH,
                        Width = thirdW,
                        Height = thirdH,
                        ZIndex = i,
                        BorderWidth = 2,
                        BorderColor = borderColors[i % borderColors.Length],
                        Label = GetLabel(sId)
                    });
                }
            }

            return layout;
        }

        private async Task ProcessSynchronizedExportAsync(AdvancedModels.AdvanceJobInfo job, DateTime startUtc, DateTime endUtc)
        {
            job.Status = "Processing";
            job.StatusMessage = $"Scanning timeline & chunks ({job.StationIds.Count} stations)...";
            job.ProgressPercent = 1;
            _ = _advanceRepository.UpsertJobAsync(job);

            string tempStagingDir = Path.Combine(Path.GetTempPath(), $"staging_{job.JobId}");
            Directory.CreateDirectory(tempStagingDir);



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
                            rawBytes += c.FileSizeBytes > 0 ? c.FileSizeBytes : new FileInfo(c.FullPath).Length;
                        }
                    }
                }

                job.StatusMessage = "Calculating gap alignment & synchronization plan...";
                job.ProgressPercent = 3;
                _ = _advanceRepository.UpsertJobAsync(job);

                var plan = _advancedExtractorService.BuildSynchronizationPlan(job.StationIds, startUtc, endUtc, allStationChunks);

                plan.KeystrokeMode = job.KeystrokeMode;
                plan.CompositionScope = job.CompositionScope ?? "intra-station";
                plan.LayoutMode = job.LayoutMode ?? "director";
                plan.TargetDisplayId = job.TargetDisplayId;
                plan.IsPipSwapped = job.IsPipSwapped;
                plan.IsAutoDirectorEnabled = job.IsAutoDirectorEnabled;
                plan.DirectorSegments = job.DirectorSegments;
                plan.AudioRoutingSegments = job.AudioRoutingSegments;

                double originalDurationSec = Math.Max(1.0, (endUtc - startUtc).TotalSeconds);
                double exportedDurationSec = Math.Max(1.0, plan.TotalActiveSeconds);

                var (qualityW, qualityH, qualityBitrate) = ParseQualityResolution(job.Resolution ?? job.VideoQuality);
                if (exportedDurationSec > 0)
                {
                    job.FileSizeBytes = Math.Max(5 * 1024 * 1024, (long)(((qualityBitrate + 128) * 1000.0 / 8.0) * exportedDurationSec));
                }

                var generatedTrackPaths = new List<string>();
                var sessionTracks = new List<object>();

                bool isAllDisplaysMode = string.Equals(job.LayoutMode, "all-displays", StringComparison.OrdinalIgnoreCase);

                // If no custom canvas layout or keyframe timeline is provided, synthesize the default Grid Canvas Layout
                if ((job.CanvasLayoutTimeline == null || job.CanvasLayoutTimeline.Keyframes.Count == 0) &&
                    (job.CanvasLayout == null || job.CanvasLayout.Placements.Count == 0))
                {
                    var roleMap = await _stationRoleProvider.GetStationRoleAliasesForTimeRangeAsync(job.InEpochMs, job.OutEpochMs);
                    var defaultGrid = GenerateDefaultGridLayout(job.StationIds, allStationChunks, roleMap, qualityW, qualityH);
                    job.CanvasLayout = defaultGrid;
                    job.CanvasLayoutTimeline = new AdvancedModels.CanvasLayoutTimelineDto
                    {
                        Resolution = job.Resolution,
                        Keyframes = new List<AdvancedModels.CanvasLayoutKeyframeDto>
                        {
                            new AdvancedModels.CanvasLayoutKeyframeDto
                            {
                                TimestampEpochMs = job.InEpochMs,
                                TransitionDurationSec = 0.5,
                                TransitionType = "smooth",
                                Layout = defaultGrid
                            }
                        }
                    };
                }

                // Prepare discrete render items (handling single composite or all individual monitors per station)
                var renderTasks = new List<(string StationId, string DisplayId, bool IsPrimary, int Width, int Height, int X, int Y, List<RecordingChunkMetadata> Chunks, SynchronizationPlan Plan)>();

                var allPlacements = new List<AdvancedModels.CanvasPlacementDto>();
                if (job.CanvasLayoutTimeline != null && job.CanvasLayoutTimeline.Keyframes.Count > 0)
                {
                    allPlacements = job.CanvasLayoutTimeline.Keyframes.SelectMany(k => k.Layout.Placements).ToList();
                }
                else if (job.CanvasLayout != null && job.CanvasLayout.Placements.Count > 0)
                {
                    allPlacements = job.CanvasLayout.Placements;
                }

                // Enforce Auto-Director when a station has <= 1 display in the layout and multiple recorded displays
                var distinctStationIds = allPlacements.Select(p => p.StationId).Distinct(StringComparer.OrdinalIgnoreCase).ToList();
                foreach (var sId in distinctStationIds)
                {
                    allStationChunks.TryGetValue(sId, out var sChunks);
                    sChunks ??= new List<RecordingChunkMetadata>();
                    var availableDisps = sChunks.Select(c => string.IsNullOrEmpty(c.DisplayId) ? "mon-0" : c.DisplayId.ToLowerInvariant()).Distinct().ToList();

                    int screenCountForStation = allPlacements
                        .Where(x => string.Equals(x.StationId, sId, StringComparison.OrdinalIgnoreCase))
                        .Select(x => !string.IsNullOrEmpty(x.DisplayId) ? x.DisplayId.ToLowerInvariant() : "mon-0")
                        .Distinct()
                        .Count();

                    if (screenCountForStation <= 1 && availableDisps.Count > 1)
                    {
                        foreach (var p in allPlacements.Where(x => string.Equals(x.StationId, sId, StringComparison.OrdinalIgnoreCase)))
                        {
                            p.DisplayId = "director";
                        }
                        if (job.CanvasLayout != null)
                        {
                            foreach (var p in job.CanvasLayout.Placements.Where(x => string.Equals(x.StationId, sId, StringComparison.OrdinalIgnoreCase)))
                            {
                                p.DisplayId = "director";
                            }
                        }
                        if (job.CanvasLayoutTimeline != null)
                        {
                            foreach (var kf in job.CanvasLayoutTimeline.Keyframes)
                            {
                                foreach (var p in kf.Layout.Placements.Where(x => string.Equals(x.StationId, sId, StringComparison.OrdinalIgnoreCase)))
                                {
                                    p.DisplayId = "director";
                                }
                            }
                        }
                    }
                }

                if (allPlacements.Count > 0)
                {
                    var distinctPlacements = allPlacements
                        .GroupBy(p => $"{p.StationId}|{(!string.IsNullOrEmpty(p.DisplayId) ? p.DisplayId : "mon-0")}".ToLowerInvariant())
                        .Select(g => g.First())
                        .ToList();

                    foreach (var p in distinctPlacements)
                    {
                        string sId = p.StationId;
                        allStationChunks.TryGetValue(sId, out var sChunks);
                        sChunks ??= new List<RecordingChunkMetadata>();

                        var availableDisps = sChunks.Select(c => string.IsNullOrEmpty(c.DisplayId) ? "mon-0" : c.DisplayId.ToLowerInvariant()).Distinct().OrderBy(d => d).ToList();
                        bool isDirector = string.Equals(p.DisplayId, "director", StringComparison.OrdinalIgnoreCase);
                        string targetDisp = isDirector ? "director" : ResolveTargetDisplayKey(p.DisplayId, availableDisps);

                        var dispChunks = isDirector
                            ? sChunks
                            : sChunks.Where(c => string.Equals(c.DisplayId, targetDisp, StringComparison.OrdinalIgnoreCase)).ToList();

                        if (dispChunks.Count == 0) dispChunks = sChunks;

                        var repChunk = dispChunks.FirstOrDefault() ?? sChunks.FirstOrDefault();
                        int w = repChunk?.Width > 0 ? repChunk.Width : 1920;
                        int h = repChunk?.Height > 0 ? repChunk.Height : 1080;
                        bool isPrimary = string.Equals(targetDisp, "mon-0", StringComparison.OrdinalIgnoreCase) || isDirector;

                        var dirSegments = plan.DirectorSegments;
                        if (isDirector && (dirSegments == null || dirSegments.Count == 0) && availableDisps.Count > 1)
                        {
                            var analyzer = new ITB_SCREEN_RECORDER.Features.Extractor.Services.Engine.ActivityFocusAnalyzer();
                            long sMs = new DateTimeOffset(startUtc).ToUnixTimeMilliseconds();
                            long eMs = new DateTimeOffset(endUtc).ToUnixTimeMilliseconds();
                            var topo = new StationDisplayTopologyDto
                            {
                                Hostname = sId,
                                Displays = availableDisps.Select((d, idx) => new DisplayMetadataDto
                                {
                                    DisplayId = d,
                                    IsPrimary = d == "mon-0",
                                    X = idx * 1920,
                                    Y = 0,
                                    Width = 1920,
                                    Height = 1080
                                }).ToList()
                            };
                            long dirMinDwellMs = (_systemConfig?.CurrentValue?.AutoDirector?.MinDwellSeconds ?? 10) * 1000L;
                            if (dirMinDwellMs <= 0) dirMinDwellMs = 10000;
                            var computedPlan = analyzer.AnalyzeFocus(sId, sMs, eMs, topo, Array.Empty<ActivityEventDto>(), minDwellMs: dirMinDwellMs, knownGaps: plan.RemovedGlobalGaps?.Select(g => (new DateTimeOffset(g.StartUtc).ToUnixTimeMilliseconds(), new DateTimeOffset(g.EndUtc).ToUnixTimeMilliseconds())).ToList());
                            dirSegments = computedPlan.Segments.Select(s => new DirectorCutSegmentDto
                            {
                                StartEpochMs = s.StartEpochMs,
                                EndEpochMs = s.EndEpochMs,
                                TargetDisplayId = s.TargetDisplayId,
                                TargetDisplayNumber = s.TargetDisplayNumber,
                                TargetDisplayName = s.TargetDisplayName,
                                IsManualOverride = s.IsManualOverride
                            }).ToList();
                        }

                        var feedPlan = new SynchronizationPlan
                        {
                            ActiveSegments = plan.ActiveSegments,
                            KeystrokeMode = plan.KeystrokeMode,
                            LayoutMode = isDirector ? "director" : "custom",
                            TargetDisplayId = targetDisp,
                            DirectorSegments = isDirector ? dirSegments : null,
                            RemovedGlobalGaps = plan.RemovedGlobalGaps,
                            StationGaps = plan.StationGaps
                        };

                        renderTasks.Add((sId, targetDisp, isPrimary, w, h, 0, 0, dispChunks, feedPlan));
                    }
                }
                else
                {
                    for (int sIdx = 0; sIdx < job.StationIds.Count; sIdx++)
                {
                    string sId = job.StationIds[sIdx];
                    var sChunks = allStationChunks.TryGetValue(sId, out var chunksList) ? chunksList : new List<RecordingChunkMetadata>();

                    if (isAllDisplaysMode)
                    {
                        var displayGroups = sChunks
                            .GroupBy(c => string.IsNullOrEmpty(c.DisplayId) ? "mon-0" : c.DisplayId.ToLowerInvariant())
                            .OrderBy(g => g.Key)
                            .ToList();

                        if (displayGroups.Count == 0)
                        {
                            var fallbackPlan = new SynchronizationPlan
                            {
                                ActiveSegments = plan.ActiveSegments,
                                KeystrokeMode = plan.KeystrokeMode,
                                LayoutMode = "mon-0",
                                TargetDisplayId = "mon-0",
                                RemovedGlobalGaps = plan.RemovedGlobalGaps,
                                StationGaps = plan.StationGaps
                            };
                            renderTasks.Add((sId, "mon-0", true, 1920, 1080, 0, 0, sChunks, fallbackPlan));
                        }
                        else
                        {
                            int dispIndex = 0;
                            int currentX = 0;
                            foreach (var group in displayGroups)
                            {
                                string dispKey = group.Key;
                                var repChunk = group.FirstOrDefault();
                                int w = repChunk?.Width > 0 ? repChunk.Width : 1920;
                                int h = repChunk?.Height > 0 ? repChunk.Height : 1080;
                                bool isPrimary = repChunk?.IsPrimary ?? (dispIndex == 0);
                                int x = currentX;
                                int y = 0;
                                currentX += w;

                                var dispPlan = new SynchronizationPlan
                                {
                                    ActiveSegments = plan.ActiveSegments,
                                    KeystrokeMode = plan.KeystrokeMode,
                                    LayoutMode = dispKey,
                                    TargetDisplayId = dispKey,
                                    RemovedGlobalGaps = plan.RemovedGlobalGaps,
                                    StationGaps = plan.StationGaps
                                };

                                renderTasks.Add((sId, dispKey, isPrimary, w, h, x, y, sChunks, dispPlan));
                                dispIndex++;
                            }

                            // Also include the Auto-Director Cut track alongside all discrete monitors
                            var rep0 = displayGroups.First().FirstOrDefault();
                            int dirW = rep0?.Width > 0 ? rep0.Width : 1920;
                            int dirH = rep0?.Height > 0 ? rep0.Height : 1080;
                            var dirSegments = plan.DirectorSegments;
                            if ((dirSegments == null || dirSegments.Count == 0) && displayGroups.Count > 1)
                            {
                                var analyzer = new ITB_SCREEN_RECORDER.Features.Extractor.Services.Engine.ActivityFocusAnalyzer();
                                long sMs = new DateTimeOffset(startUtc).ToUnixTimeMilliseconds();
                                long eMs = new DateTimeOffset(endUtc).ToUnixTimeMilliseconds();
                                var topo = new StationDisplayTopologyDto
                                {
                                    Hostname = sId,
                                    Displays = displayGroups.Select((g, idx) => new DisplayMetadataDto
                                    {
                                        DisplayId = g.Key,
                                        IsPrimary = g.Key == "mon-0",
                                        X = idx * 1920,
                                        Y = 0,
                                        Width = 1920,
                                        Height = 1080
                                    }).ToList()
                                };
                                long dirMinDwellMs = (_systemConfig?.CurrentValue?.AutoDirector?.MinDwellSeconds ?? 10) * 1000L;
                            if (dirMinDwellMs <= 0) dirMinDwellMs = 10000;
                            var computedPlan = analyzer.AnalyzeFocus(sId, sMs, eMs, topo, Array.Empty<ActivityEventDto>(), minDwellMs: dirMinDwellMs);
                                dirSegments = computedPlan.Segments.Select(s => new DirectorCutSegmentDto
                                {
                                    StartEpochMs = s.StartEpochMs,
                                    EndEpochMs = s.EndEpochMs,
                                    TargetDisplayId = s.TargetDisplayId,
                                    TargetDisplayNumber = s.TargetDisplayNumber,
                                    TargetDisplayName = s.TargetDisplayName,
                                    IsManualOverride = s.IsManualOverride
                                }).ToList();
                            }

                            var directorPlan = new SynchronizationPlan
                            {
                                ActiveSegments = plan.ActiveSegments,
                                KeystrokeMode = plan.KeystrokeMode,
                                LayoutMode = "director",
                                TargetDisplayId = "director",
                                DirectorSegments = dirSegments,
                                RemovedGlobalGaps = plan.RemovedGlobalGaps,
                                StationGaps = plan.StationGaps
                            };
                            renderTasks.Add((sId, "director", false, dirW, dirH, 0, 0, sChunks, directorPlan));
                        }
                    }
                    else
                    {
                        var repChunk = sChunks.FirstOrDefault();
                        int w = repChunk?.Width > 0 ? repChunk.Width : 1920;
                        int h = repChunk?.Height > 0 ? repChunk.Height : 1080;
                        bool isPrimary = true;
                        var availableDisps = sChunks.Select(c => string.IsNullOrEmpty(c.DisplayId) ? "mon-0" : c.DisplayId.ToLowerInvariant()).Distinct().OrderBy(d => d).ToList();
                        string dispKey = ResolveTargetDisplayKey(job.TargetDisplayId, availableDisps);

                        renderTasks.Add((sId, dispKey, isPrimary, w, h, 0, 0, sChunks, plan));
                    }
                }
                }

                bool isMultiStation = renderTasks.Count > 1;
                double slicePerTrack = 78.0 / Math.Max(1, renderTasks.Count);
                var stopwatch = Stopwatch.StartNew();
                DateTime lastPersistUtc = DateTime.UtcNow;

                job.StatusMessage = $"Starting synchronized render ({renderTasks.Count} track(s))...";
                job.ProgressPercent = 5;
                _ = _advanceRepository.UpsertJobAsync(job);

                for (int i = 0; i < renderTasks.Count; i++)
                {
                    var task = renderTasks[i];
                    string stationSubId = isAllDisplaysMode ? $"{task.StationId}/{task.DisplayId}" : task.StationId;
                    double baseTrackProgress = 5.0 + (i * slicePerTrack);

                    var trackProgress = new Progress<(double SecondsProcessed, double Fps, double SpeedMultiplier)>(p =>
                    {
                        double fraction = Math.Clamp(p.SecondsProcessed / exportedDurationSec, 0.0, 1.0);
                        double totalProgress = baseTrackProgress + (fraction * slicePerTrack);
                        job.ProgressPercent = (int)Math.Clamp(Math.Round(totalProgress, 0), 5, 84);

                        double remainingStationSec = Math.Max(0, exportedDurationSec - p.SecondsProcessed);
                        double totalRemSec = (remainingStationSec / Math.Max(0.1, p.SpeedMultiplier))
                                           + ((renderTasks.Count - 1 - i) * (exportedDurationSec / Math.Max(0.1, p.SpeedMultiplier)))
                                           + 3.0;

                        job.EstimatedSecondsRemaining = Math.Round(totalRemSec, 0);
                        job.EtaSeconds = (int)job.EstimatedSecondsRemaining;

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
                        string speedTxt = p.SpeedMultiplier > 0.1 ? $"{p.SpeedMultiplier:0.1}x" : $"{job.SpeedMBps:0.1} MB/s";
                        job.StatusMessage = $"Rendering Track {i + 1} of {renderTasks.Count}: {task.StationId} ({task.DisplayId}) ({p.Fps:0} fps, {speedTxt}) • Built: {builtMb:0.1} MB";

                        if ((DateTime.UtcNow - lastPersistUtc).TotalSeconds >= 1.0)
                        {
                            lastPersistUtc = DateTime.UtcNow;
                            _ = _advanceRepository.UpsertJobAsync(job);
                        }
                    });

                    var trackResult = await _advancedExtractorService.CutSynchronizedTrackAsync(
                        stationSubId, task.Plan, task.Chunks, tempStagingDir, isMultiStation, trackProgress, CancellationToken.None);

                    generatedTrackPaths.Add(trackResult.OutputFilePath);

                    sessionTracks.Add(new
                    {
                        hostname = task.StationId,
                        displayId = task.DisplayId,
                        isPrimary = task.IsPrimary,
                        isDirectorCut = string.Equals(task.DisplayId, "director", StringComparison.OrdinalIgnoreCase),
                        width = task.Width,
                        height = task.Height,
                        x = task.X,
                        y = task.Y,
                        videoFileName = Path.GetFileName(trackResult.OutputFilePath),
                        startOffsetMs = 0,
                        durationMs = exportedDurationSec * 1000.0,
                        hasAudio = trackResult.HasAudio,
                        audioChannels = 2,
                        audioChannelMapping = "0:Loopback,1:Microphone"
                    });
                }

                string finalMp4Path = Path.Combine(_exportDirectory, job.FileName);

                job.StatusMessage = "Composing master MP4 video & routing audio...";
                job.ProgressPercent = 88;
                job.EstimatedSecondsRemaining = 2;
                _ = _advanceRepository.UpsertJobAsync(job);

                var trackDescriptors = new List<(string StationId, string DisplayId, string FilePath, bool HasAudio)>();
                for (int k = 0; k < renderTasks.Count; k++)
                {
                    if (k < generatedTrackPaths.Count && File.Exists(generatedTrackPaths[k]))
                    {
                        string tPath = generatedTrackPaths[k];
                        bool hasAudio = ProbeFileHasAudio(tPath);
                        trackDescriptors.Add((renderTasks[k].StationId, renderTasks[k].DisplayId, tPath, hasAudio));
                    }
                }

                await ComposeMasterMp4Async(finalMp4Path, trackDescriptors, job, exportedDurationSec, startUtc, CancellationToken.None);

                var fi = new FileInfo(finalMp4Path);
                job.OutputFilePath = finalMp4Path;
                job.FileSizeBytes = fi.Exists ? fi.Length : job.FileSizeBytes;
                job.ProgressPercent = 100;
                job.EstimatedSecondsRemaining = 0;
                job.Status = "Completed";
                job.StatusMessage = "Master MP4 ready for download";
                job.CompletedAtUtc = DateTime.UtcNow;

                _ = _advanceRepository.UpsertJobAsync(job);
                _advLogger.LogInformation("[AdvanceJobManager] Master MP4 ready: {Path} ({Size} bytes)", finalMp4Path, job.FileSizeBytes);
            }
            catch (Exception ex)
            {
                job.Status = "Failed";
                job.ErrorMessage = ex.Message;
                job.StatusMessage = "Export failed";
                job.EstimatedSecondsRemaining = 0;
                _ = _advanceRepository.UpsertJobAsync(job);
                _advLogger.LogError(ex, "[AdvanceJobManager] Export failed for job {JobId}", job.JobId);
            }
            finally
            {
                _ = _advanceRepository.UpsertJobAsync(job);

                if (Directory.Exists(tempStagingDir))
                {
                    try { Directory.Delete(tempStagingDir, true); } catch { }
                }
            }
        }

        private async Task ComposeMasterMp4Async(
            string finalMp4Path,
            List<(string StationId, string DisplayId, string FilePath, bool HasAudio)> tracks,
            AdvancedModels.AdvanceJobInfo job,
            double exportedDurationSec,
            DateTime startUtc,
            CancellationToken ct)
        {
            if (tracks.Count == 0)
            {
                throw new InvalidOperationException("No tracks were rendered for composition.");
            }

            if ((job.CanvasLayout != null && job.CanvasLayout.Placements.Count > 0) ||
                (job.CanvasLayoutTimeline != null && job.CanvasLayoutTimeline.Keyframes.Count > 0))
            {
                await ComposeCustomCanvasMasterMp4Async(finalMp4Path, tracks, job, exportedDurationSec, startUtc, ct);
                return;
            }

            if (tracks.Count == 1)
            {
                if (File.Exists(finalMp4Path)) File.Delete(finalMp4Path);
                File.Move(tracks[0].FilePath, finalMp4Path);
                return;
            }

            string ffmpegPath = _binaryResolver.ResolveFfmpeg();
            var inputArgsBuilder = new System.Text.StringBuilder();
            for (int i = 0; i < tracks.Count; i++)
            {
                inputArgsBuilder.Append($"-i \"{tracks[i].FilePath.Replace('\\', '/')}\" ");
            }

            int targetFps = 30;
            string mode = (job.LayoutMode ?? "director").Trim().ToLowerInvariant();
            string filterComplex;
            string durationStr = exportedDurationSec.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture);
            long cutStartEpochMs = new DateTimeOffset(startUtc).ToUnixTimeMilliseconds();

            if (mode == "split" && tracks.Count >= 2)
            {
                string leftIn = !job.IsPipSwapped ? "[0:v]" : "[1:v]";
                string rightIn = !job.IsPipSwapped ? "[1:v]" : "[0:v]";
                filterComplex = $"{leftIn}fps=fps={targetFps}:round=near,scale=960:1080:force_original_aspect_ratio=decrease:flags=lanczos+accurate_rnd,pad=960:1080:(ow-iw)/2:(oh-ih)/2:black[left]; " +
                                $"{rightIn}fps=fps={targetFps}:round=near,scale=960:1080:force_original_aspect_ratio=decrease:flags=lanczos+accurate_rnd,pad=960:1080:(ow-iw)/2:(oh-ih)/2:black[right]; " +
                                $"[left][right]hstack=inputs=2,drawbox=x=959:y=0:w=2:h=1080:color=0x1E293B@0.8:t=fill[vbase];";
            }
            else if (mode == "pip" && tracks.Count >= 2)
            {
                string mainIn = !job.IsPipSwapped ? "[0:v]" : "[1:v]";
                string insetIn = !job.IsPipSwapped ? "[1:v]" : "[0:v]";
                filterComplex = $"{mainIn}fps=fps={targetFps}:round=near,scale=1920:1080:force_original_aspect_ratio=decrease:flags=lanczos+accurate_rnd,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:black[main]; " +
                                $"{insetIn}fps=fps={targetFps}:round=near,scale=576:324:force_original_aspect_ratio=decrease:flags=lanczos+accurate_rnd,pad=576:324:(ow-iw)/2:(oh-ih)/2:black,drawbox=x=0:y=0:w=iw:h=ih:color=0x06B6D4@0.9:t=2[inset]; " +
                                $"[main][inset]overlay=W-w-24:H-h-24:eof_action=pass:repeatlast=1[vbase];";
            }
            else if (mode == "canvas" || mode == "grid")
            {
                if (tracks.Count == 2)
                {
                    string d0 = !job.IsPipSwapped ? "[0:v]" : "[1:v]";
                    string d1 = !job.IsPipSwapped ? "[1:v]" : "[0:v]";
                    filterComplex = $"{d0}scale=936:526:force_original_aspect_ratio=decrease,pad=936:526:(ow-iw)/2:(oh-ih)/2:black,drawbox=x=0:y=0:w=iw:h=ih:color=0x06B6D4@0.85:t=2[c0]; " +
                                    $"{d1}scale=936:526:force_original_aspect_ratio=decrease,pad=936:526:(ow-iw)/2:(oh-ih)/2:black,drawbox=x=0:y=0:w=iw:h=ih:color=0x10B981@0.85:t=2[c1]; " +
                                    $"color=c=0x070A10:s=1920x1080:d={durationStr}[bg]; " +
                                    $"[bg][c0]overlay=16:277[tmp]; [tmp][c1]overlay=968:277[vbase];";
                }
                else
                {
                    var sb = new System.Text.StringBuilder();
                    string[] borderColors = { "0x06B6D4", "0x10B981", "0xF59E0B", "0x8B5CF6" };
                    int maxItems = Math.Min(tracks.Count, 4);
                    for (int i = 0; i < maxItems; i++)
                    {
                        string bc = borderColors[i % borderColors.Length];
                        sb.Append($"[{i}:v]scale=936:516:force_original_aspect_ratio=decrease,pad=936:516:(ow-iw)/2:(oh-ih)/2:black,drawbox=x=0:y=0:w=iw:h=ih:color={bc}@0.85:t=2[c{i}]; ");
                    }
                    sb.Append($"color=c=0x070A10:s=1920x1080:d={durationStr}[bg]; ");
                    if (maxItems == 3)
                    {
                        sb.Append("[bg][c0]overlay=16:16[t1]; [t1][c1]overlay=968:16[t2]; [t2][c2]overlay=492:548[vbase];");
                    }
                    else
                    {
                        sb.Append("[bg][c0]overlay=16:16[t1]; [t1][c1]overlay=968:16[t2]; [t2][c2]overlay=16:548[t3]; [t3][c3]overlay=968:548[vbase];");
                    }
                    filterComplex = sb.ToString();
                }
            }
            else
            {
                var dirSegments = job.DirectorSegments;
                if (dirSegments != null && dirSegments.Count > 0)
                {
                    var segFilterOps = new List<string>();
                    var concatInputLabels = new List<string>();

                    for (int i = 0; i < dirSegments.Count; i++)
                    {
                        var seg = dirSegments[i];
                        double segStartSec = Math.Max(0, (seg.StartEpochMs - cutStartEpochMs) / 1000.0);
                        double segEndSec = Math.Min(exportedDurationSec, (seg.EndEpochMs - cutStartEpochMs) / 1000.0);
                        double segDur = segEndSec - segStartSec;
                        if (segDur <= 0.05) continue;

                        int inIdx = 0;
                        for (int tIdx = 0; tIdx < tracks.Count; tIdx++)
                        {
                            if (string.Equals(tracks[tIdx].StationId, seg.TargetDisplayId, StringComparison.OrdinalIgnoreCase) ||
                                MatchesDisplay(seg.TargetDisplayId, tracks[tIdx].DisplayId, tIdx))
                            {
                                inIdx = tIdx;
                                break;
                            }
                        }

                        string segOutLabel = $"[v_seg_{i}]";
                        string startStr = segStartSec.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture);
                        string endStr = segEndSec.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture);
                        string durStr = segDur.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture);

                        var segFilters = new List<string>
                        {
                            $"trim=start={startStr}:end={endStr}",
                            "setpts=PTS-STARTPTS",
                            "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:black"
                        };

                        if (i > 0 && dirSegments.Count > 1)
                        {
                            segFilters.Add("fade=type=in:start_time=0:duration=0.15");
                        }
                        if (i < dirSegments.Count - 1 && dirSegments.Count > 1)
                        {
                            double outStart = Math.Max(0, segDur - 0.15);
                            segFilters.Add($"fade=type=out:start_time={outStart.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture)}:duration=0.15");
                        }

                        // Auto-Director Screen Orientation HUD & Physical Minimap Overlay
                        string? dirFontClause = ResolveSystemFontClause();
                        if (!string.IsNullOrEmpty(dirFontClause) && (tracks.Count > 1 || dirSegments.Count > 1))
                        {
                            int displayNum = inIdx + 1;
                            string displayAlias = (inIdx == 0) ? "MAIN" : "SECONDARY";
                            int totalDisplays = Math.Max(2, tracks.Count);

                            segFilters.Add("drawbox=x=24:y=24:w=280:h=46:color=0x0F172A@0.88:t=fill");
                            segFilters.Add("drawbox=x=24:y=24:w=280:h=46:color=0x06B6D4@0.85:t=2");
                            segFilters.Add($"drawtext={dirFontClause}text='⚡ AUTO-DIRECTOR':fontcolor=0x22D3EE:fontsize=10:x=34:y=30");
                            segFilters.Add($"drawtext={dirFontClause}text='VIEWING\\: SCREEN {displayNum} ({displayAlias})':fontcolor=white:fontsize=13:x=34:y=46");

                            for (int m = 0; m < totalDisplays; m++)
                            {
                                int boxX = 24 + 280 - 12 - (totalDisplays * 32) + (m * 32);
                                string mColor = (m == inIdx) ? "0x06B6D4" : "0x334155";
                                segFilters.Add($"drawbox=x={boxX}:y=36:w=26:h=18:color={mColor}:t=fill");
                                segFilters.Add($"drawtext={dirFontClause}text='{m + 1}':fontcolor=white:fontsize=10:x={boxX + 9}:y=40");
                            }

                            if (i > 0)
                            {
                                segFilters.Add($"drawtext={dirFontClause}text='▶ SWITCHED TO SCREEN {displayNum} ({displayAlias})':enable='between(t,0,2.5)':fontcolor=0x10B981:fontsize=15:box=1:boxcolor=0x0F172A@0.92:boxborderw=6:x=(w-tw)/2:y=28");
                            }
                        }

                        segFilterOps.Add($"[{inIdx}:v]{string.Join(",", segFilters)}{segOutLabel}");
                        concatInputLabels.Add(segOutLabel);
                    }

                    if (concatInputLabels.Count > 1)
                    {
                        filterComplex = $"{string.Join("; ", segFilterOps)}; {string.Join("", concatInputLabels)}concat=n={concatInputLabels.Count}:v=1:a=0[vbase];";
                    }
                    else if (concatInputLabels.Count == 1)
                    {
                        filterComplex = $"{segFilterOps[0]}; {concatInputLabels[0]}null[vbase];";
                    }
                    else
                    {
                        filterComplex = "[0:v]null[vbase];";
                    }
                }
                else
                {
                    filterComplex = "[0:v]null[vbase];";
                }
            }

            // Audio Routing Filtergraph
            string audioMapOption = "";
            bool anyTrackHasAudio = tracks.Any(t => t.HasAudio);

            if (job.AudioRoutingSegments != null && job.AudioRoutingSegments.Count > 0 && anyTrackHasAudio)
            {
                var audioSegFilterOps = new List<string>();
                var audioConcatLabels = new List<string>();

                for (int i = 0; i < job.AudioRoutingSegments.Count; i++)
                {
                    var aSeg = job.AudioRoutingSegments[i];
                    double aStartSec = Math.Max(0, (aSeg.StartEpochMs - cutStartEpochMs) / 1000.0);
                    double aEndSec = Math.Min(exportedDurationSec, (aSeg.EndEpochMs - cutStartEpochMs) / 1000.0);
                    double aDur = aEndSec - aStartSec;
                    if (aDur <= 0.05) continue;

                    int inIdx = -1;
                    for (int tIdx = 0; tIdx < tracks.Count; tIdx++)
                    {
                        if (string.Equals(tracks[tIdx].StationId, aSeg.SourceStationId, StringComparison.OrdinalIgnoreCase) && tracks[tIdx].HasAudio)
                        {
                            inIdx = tIdx;
                            break;
                        }
                    }
                    if (inIdx < 0)
                    {
                        for (int tIdx = 0; tIdx < tracks.Count; tIdx++)
                        {
                            if (string.Equals(tracks[tIdx].StationId, aSeg.SourceStationId, StringComparison.OrdinalIgnoreCase))
                            {
                                inIdx = tIdx;
                                break;
                            }
                        }
                    }
                    if (inIdx < 0) inIdx = 0;

                    string aLabel = $"[a_seg_{i}]";
                    string startA = aStartSec.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture);
                    string endA = aEndSec.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture);

                    if (tracks[inIdx].HasAudio)
                    {
                        double gain = aSeg.Gain > 0 ? aSeg.Gain : 1.0;
                        string gainFilter = Math.Abs(gain - 1.0) > 0.01 
                            ? $",volume={gain.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture)}" 
                            : "";
                        audioSegFilterOps.Add($"[{inIdx}:a]atrim=start={startA}:end={endA},asetpts=PTS-STARTPTS{gainFilter}{aLabel}");
                    }
                    else
                    {
                        string durA = aDur.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture);
                        audioSegFilterOps.Add($"anullsrc=r=48000:cl=stereo:d={durA}{aLabel}");
                    }
                    audioConcatLabels.Add(aLabel);
                }

                if (audioConcatLabels.Count > 1)
                {
                    filterComplex += $" {string.Join("; ", audioSegFilterOps)}; {string.Join("", audioConcatLabels)}concat=n={audioConcatLabels.Count}:v=0:a=1[outa];";
                    audioMapOption = "-map \"[outa]\" -c:a aac -b:a 192k";
                }
                else if (audioConcatLabels.Count == 1)
                {
                    filterComplex += $" {audioSegFilterOps[0]};";
                    audioMapOption = $"-map \"{audioConcatLabels[0]}\" -c:a aac -b:a 192k";
                }
                else
                {
                    int firstAudioIdx = tracks.FindIndex(t => t.HasAudio);
                    audioMapOption = firstAudioIdx >= 0 ? $"-map {firstAudioIdx}:a? -c:a aac -b:a 192k" : "";
                }
            }
            else
            {
                int firstAudioIdx = tracks.FindIndex(t => t.HasAudio);
                if (firstAudioIdx >= 0)
                {
                    audioMapOption = $"-map {firstAudioIdx}:a? -c:a aac -b:a 192k";
                }
            }

            long startEpochSec = cutStartEpochMs / 1000;
            string clockPos = (job.UtcClockPosition ?? "top-right").Trim().ToLowerInvariant();
            var (clockX, clockY) = ResolveClockCoordinates(job.UtcClockPosition);

            string? masterFontClause = ResolveSystemFontClause();
            if (!string.IsNullOrEmpty(masterFontClause))
            {
                filterComplex += $" [vbase]drawtext={masterFontClause}text='%{{pts\\:gmtime\\:{startEpochSec}\\:%Y-%m-%d  %H\\\\\\:%M\\\\\\:%S UTC}}':fontcolor=0x22D3EE:fontsize=15:box=1:boxcolor=0x070A10@0.85:boxborderw=6:x={clockX}:y={clockY}[v_clock]; [v_clock]fps=fps={targetFps}:round=near,format=yuv420p[outv]";
            }
            else
            {
                filterComplex += $" [vbase]fps=fps={targetFps}:round=near,format=yuv420p[outv]";
            }

            var (_, _, masterBitrateKbps) = ParseQualityResolution(job.Resolution ?? job.VideoQuality);
            string encArgs = _binaryResolver.GetOptimalVideoEncoderArgs(bitrateKbps: masterBitrateKbps);
            string creationUtcIso = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");

            string arguments = $"-nostdin -v error " +
                               $"{inputArgsBuilder} " +
                               $"-filter_complex \"{filterComplex}\" " +
                               $"-map \"[outv]\" {audioMapOption} " +
                               $"{encArgs} " +
                               $"-fps_mode cfr -r {targetFps} " +
                               $"-metadata creation_time=\"{creationUtcIso}\" " +
                               $"-movflags +faststart " +
                               $"-y \"{finalMp4Path.Replace('\\', '/')}\"";

            _advLogger.LogInformation("[AdvanceJobManager] Running master MP4 composition: {Args}", arguments);

            var startInfo = new ProcessStartInfo
            {
                FileName = ffmpegPath,
                Arguments = arguments,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var process = new Process { StartInfo = startInfo };
            process.Start();
            ExtractorGarbageCollectorService.TrackProcess(process.Id);

            var stderrTask = process.StandardError.ReadToEndAsync(ct);
            await process.WaitForExitAsync(ct);

            if (process.ExitCode != 0)
            {
                string stderr = await stderrTask;
                throw new InvalidOperationException($"FFmpeg master composition failed with exit code {process.ExitCode}: {stderr}");
            }
        }

        private async Task ComposeCustomCanvasMasterMp4Async(
            string finalMp4Path,
            List<(string StationId, string DisplayId, string FilePath, bool HasAudio)> tracks,
            AdvancedModels.AdvanceJobInfo job,
            double exportedDurationSec,
            DateTime startUtc,
            CancellationToken ct)
        {
            string ffmpegPath = _binaryResolver.ResolveFfmpeg();
            var inputArgsBuilder = new System.Text.StringBuilder();
            for (int i = 0; i < tracks.Count; i++)
            {
                inputArgsBuilder.Append($"-i \"{tracks[i].FilePath.Replace('\\', '/')}\" ");
            }

            double canvasFps = 30.0;
            if (job.CanvasLayout != null && job.CanvasLayout.Fps >= 20.0)
            {
                canvasFps = job.CanvasLayout.Fps;
            }
            else if (job.CanvasLayoutTimeline != null && job.CanvasLayoutTimeline.Keyframes.Count > 0)
            {
                var maxKfFps = job.CanvasLayoutTimeline.Keyframes.Max(k => k.Layout?.Fps ?? 0);
                if (maxKfFps >= 20.0) canvasFps = maxKfFps;
            }
            int targetFps = (int)Math.Round(canvasFps);
            if (targetFps < 24) targetFps = 30;

            var (targetWidth, targetHeight, targetBitrateKbps) = ParseQualityResolution(job.Resolution ?? job.VideoQuality);
            var filterBuilder = new System.Text.StringBuilder();
            string? fontClause = ResolveSystemFontClause();
            bool isTimeline = job.CanvasLayoutTimeline != null && job.CanvasLayoutTimeline.Keyframes.Count > 1;

            if (isTimeline)
            {
                // Multi-Keyframe Canvas Timeline Synthesis
                var sortedKeyframes = job.CanvasLayoutTimeline!.Keyframes.OrderBy(k => k.TimestampEpochMs).ToList();
                long cutStartEpochMs = new DateTimeOffset(startUtc).ToUnixTimeMilliseconds();

                var intervals = new List<(double StartSec, double EndSec, AdvancedModels.CustomCanvasLayoutDto Layout, string TransType, double TransDur)>();

                for (int k = 0; k < sortedKeyframes.Count; k++)
                {
                    var currentKf = sortedKeyframes[k];
                    double kfStartSec = (k == 0) ? 0.0 : Math.Max(0, (currentKf.TimestampEpochMs - cutStartEpochMs) / 1000.0);
                    double kfEndSec = (k < sortedKeyframes.Count - 1)
                        ? Math.Max(0, (sortedKeyframes[k + 1].TimestampEpochMs - cutStartEpochMs) / 1000.0)
                        : exportedDurationSec;

                    kfStartSec = Math.Min(kfStartSec, exportedDurationSec);
                    kfEndSec = Math.Min(kfEndSec, exportedDurationSec);

                    if (kfEndSec - kfStartSec > 0.04)
                    {
                        intervals.Add((kfStartSec, kfEndSec, currentKf.Layout, currentKf.TransitionType ?? "smooth", Math.Max(0.1, currentKf.TransitionDurationSec)));
                    }
                }

                if (intervals.Count == 0 && sortedKeyframes.Count > 0)
                {
                    intervals.Add((0.0, exportedDurationSec, sortedKeyframes[0].Layout, "cut", 0.0));
                }

                for (int intIdx = 0; intIdx < intervals.Count; intIdx++)
                {
                    var (intStartSec, intEndSec, intLayout, transType, transDur) = intervals[intIdx];
                    double intDur = intEndSec - intStartSec;
                    string intDurStr = intDur.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture);
                    int refW = intLayout.Width > 0 ? intLayout.Width : 1920;
                    int refH = intLayout.Height > 0 ? intLayout.Height : 1080;
                    double layoutAspect = (double)refW / refH;
                    var (cW, cH, computedBitrate) = ParseQualityResolution(job.Resolution ?? job.VideoQuality, layoutAspect, refW, refH);
                    targetBitrateKbps = computedBitrate;
                    cW -= (cW % 2);
                    cH -= (cH % 2);
                    double scaleX = (double)cW / refW;
                    double scaleY = (double)cH / refH;
                    string intBgHex = NormalizeHexColor(intLayout.BackgroundColor, "0x070A10");

                    string bgIntLabel = $"[bg_int_{intIdx}]";
                    filterBuilder.Append($"color=c={intBgHex}:s={cW}x{cH}:d={intDurStr}:r={targetFps}{bgIntLabel}; ");

                    var iSortedPlacements = intLayout.Placements.OrderBy(p => p.ZIndex).ToList();
                    var iPlacementLabels = new List<string>();

                    for (int pIdx = 0; pIdx < iSortedPlacements.Count; pIdx++)
                    {
                        var p = iSortedPlacements[pIdx];
                        int inIdx = -1;
                        for (int tIdx = 0; tIdx < tracks.Count; tIdx++)
                        {
                            if (string.Equals(tracks[tIdx].StationId, p.StationId, StringComparison.OrdinalIgnoreCase) &&
                                string.Equals(tracks[tIdx].DisplayId, p.DisplayId, StringComparison.OrdinalIgnoreCase))
                            {
                                inIdx = tIdx;
                                break;
                            }
                        }
                        if (inIdx < 0)
                        {
                            for (int tIdx = 0; tIdx < tracks.Count; tIdx++)
                            {
                                if (string.Equals(tracks[tIdx].StationId, p.StationId, StringComparison.OrdinalIgnoreCase) &&
                                    (string.Equals(tracks[tIdx].DisplayId, "director", StringComparison.OrdinalIgnoreCase) ||
                                     string.Equals(tracks[tIdx].DisplayId, "mon-0", StringComparison.OrdinalIgnoreCase)))
                                {
                                    inIdx = tIdx;
                                    break;
                                }
                            }
                        }
                        if (inIdx < 0)
                        {
                            for (int tIdx = 0; tIdx < tracks.Count; tIdx++)
                            {
                                if (string.Equals(tracks[tIdx].StationId, p.StationId, StringComparison.OrdinalIgnoreCase))
                                {
                                    inIdx = tIdx;
                                    break;
                                }
                            }
                        }
                        if (inIdx < 0) inIdx = 0;

                        int targetW = p.Width <= 1.0 && p.Width > 0 ? (int)Math.Round(p.Width * cW) : (int)Math.Round(p.Width * scaleX);
                        int targetH = p.Height <= 1.0 && p.Height > 0 ? (int)Math.Round(p.Height * cH) : (int)Math.Round(p.Height * scaleY);
                        if (targetW <= 0) targetW = cW;
                        if (targetH <= 0) targetH = cH;
                        targetW -= (targetW % 2);
                        targetH -= (targetH % 2);

                        string pLabel = $"[p_{intIdx}_{pIdx}]";
                        string startStr = intStartSec.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture);
                        string endStr = intEndSec.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture);

                        var ops = new List<string>
                        {
                            $"trim=start={startStr}:end={endStr}",
                            "setpts=PTS-STARTPTS",
                            $"fps=fps={targetFps}:round=near",
                            $"scale={targetW}:{targetH}:force_original_aspect_ratio=decrease:flags=lanczos+accurate_rnd",
                            $"pad={targetW}:{targetH}:(ow-iw)/2:(oh-ih)/2:black"
                        };

                        if (Math.Abs(p.Rotation) > 0.01)
                        {
                            double rad = (p.Rotation * Math.PI) / 180.0;
                            string radStr = rad.ToString("0.0000", System.Globalization.CultureInfo.InvariantCulture);
                            ops.Add($"rotate={radStr}:ow='rotw({radStr})':oh='roth({radStr})':c=none");
                        }

                        if (p.BorderWidth > 0)
                        {
                            string bColor = NormalizeHexColor(p.BorderColor, "0x06B6D4");
                            int scaledBorder = Math.Max(1, (int)Math.Round(p.BorderWidth * scaleX));
                            ops.Add($"drawbox=x=0:y=0:w=iw:h=ih:color={bColor}@0.85:t={scaledBorder}");
                        }

                        if (!string.IsNullOrWhiteSpace(p.Label) && !string.IsNullOrEmpty(fontClause))
                        {
                            string safeLabel = p.Label.Replace("\\", "\\\\").Replace(":", "\\:").Replace("'", "\\'");
                            int scaledFontSize = Math.Max(10, (int)Math.Round(13 * scaleX));
                            ops.Add($"drawtext={fontClause}text='{safeLabel}':x=8:y=8:fontsize={scaledFontSize}:fontcolor=white:box=1:boxcolor=0x070A10@0.85");
                        }

                        filterBuilder.Append($"[{inIdx}:v]{string.Join(",", ops)}{pLabel}; ");
                        iPlacementLabels.Add(pLabel);
                    }

                    string curSurface = bgIntLabel;
                    for (int pIdx = 0; pIdx < iSortedPlacements.Count; pIdx++)
                    {
                        var p = iSortedPlacements[pIdx];
                        string pLabel = iPlacementLabels[pIdx];
                        string nxtSurface = (pIdx == iSortedPlacements.Count - 1) ? $"[raw_int_{intIdx}]" : $"[t_{intIdx}_{pIdx}]";

                        int targetX = p.X < 1.0 && p.X >= 0 && p.Width <= 1.0 ? (int)Math.Round(p.X * cW) : (int)Math.Round(p.X * scaleX);
                        int targetY = p.Y < 1.0 && p.Y >= 0 && p.Height <= 1.0 ? (int)Math.Round(p.Y * cH) : (int)Math.Round(p.Y * scaleY);
                        targetX -= (targetX % 2);
                        targetY -= (targetY % 2);

                        filterBuilder.Append($"{curSurface}{pLabel}overlay={targetX}:{targetY}:eof_action=pass:repeatlast=1{nxtSurface}; ");
                        curSurface = nxtSurface;
                    }

                    // Transitions: fade in from black / smooth reveal
                    string outIntLabel = $"[v_int_{intIdx}]";
                    var transFilters = new List<string>();

                    if (intIdx > 0)
                    {
                        double effTransDur = Math.Min(transDur, intDur / 2.0);
                        string effDurStr = effTransDur.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture);
                        if (string.Equals(transType, "smooth", StringComparison.OrdinalIgnoreCase) ||
                            string.Equals(transType, "fade", StringComparison.OrdinalIgnoreCase) ||
                            string.Equals(transType, "dip", StringComparison.OrdinalIgnoreCase))
                        {
                            transFilters.Add($"fade=type=in:start_time=0:duration={effDurStr}");
                        }
                    }

                    if (intIdx < intervals.Count - 1)
                    {
                        var nextKf = intervals[intIdx + 1];
                        if (string.Equals(nextKf.TransType, "dip", StringComparison.OrdinalIgnoreCase))
                        {
                            double effNextDur = Math.Min(nextKf.TransDur, intDur / 2.0);
                            double outStart = Math.Max(0, intDur - effNextDur);
                            transFilters.Add($"fade=type=out:start_time={outStart.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture)}:duration={effNextDur.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture)}");
                        }
                    }

                    if (transFilters.Count > 0)
                    {
                        filterBuilder.Append($"[raw_int_{intIdx}]{string.Join(",", transFilters)}{outIntLabel}; ");
                    }
                    else
                    {
                        filterBuilder.Append($"[raw_int_{intIdx}]null{outIntLabel}; ");
                    }
                }

                var concatLabels = Enumerable.Range(0, intervals.Count).Select(i => $"[v_int_{i}]").ToList();
                if (concatLabels.Count > 1)
                {
                    filterBuilder.Append($"{string.Join("", concatLabels)}concat=n={concatLabels.Count}:v=1:a=0[vbase]; ");
                }
                else
                {
                    filterBuilder.Append($"{concatLabels[0]}null[vbase]; ");
                }
            }
            else
            {
                // Single Static Canvas Layout
                var layout = (job.CanvasLayoutTimeline != null && job.CanvasLayoutTimeline.Keyframes.Count == 1)
                    ? job.CanvasLayoutTimeline.Keyframes[0].Layout
                    : (job.CanvasLayout ?? new AdvancedModels.CustomCanvasLayoutDto());

                int refW = layout.Width > 0 ? layout.Width : 1920;
                int refH = layout.Height > 0 ? layout.Height : 1080;
                double layoutAspect = (double)refW / refH;
                var (canvasW, canvasH, computedBitrate) = ParseQualityResolution(job.Resolution ?? job.VideoQuality, layoutAspect, refW, refH);
                targetBitrateKbps = computedBitrate;
                canvasW -= (canvasW % 2);
                canvasH -= (canvasH % 2);
                double scaleX = (double)canvasW / refW;
                double scaleY = (double)canvasH / refH;

                string bgHex = NormalizeHexColor(layout.BackgroundColor, "0x070A10");
                string durationStr = exportedDurationSec.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture);

                // 1. Order placements by ZIndex ascending (layer 0 first, layer 1 on top, etc.)
                var sortedPlacements = layout.Placements.OrderBy(p => p.ZIndex).ToList();
                var placementLabels = new List<string>();

                for (int pIdx = 0; pIdx < sortedPlacements.Count; pIdx++)
                {
                    var p = sortedPlacements[pIdx];

                    // Find matching track index
                    int inIdx = -1;
                    for (int tIdx = 0; tIdx < tracks.Count; tIdx++)
                    {
                        if (string.Equals(tracks[tIdx].StationId, p.StationId, StringComparison.OrdinalIgnoreCase) &&
                            string.Equals(tracks[tIdx].DisplayId, p.DisplayId, StringComparison.OrdinalIgnoreCase))
                        {
                            inIdx = tIdx;
                            break;
                        }
                    }
                    if (inIdx < 0)
                    {
                        for (int tIdx = 0; tIdx < tracks.Count; tIdx++)
                        {
                            if (string.Equals(tracks[tIdx].StationId, p.StationId, StringComparison.OrdinalIgnoreCase) &&
                                (string.Equals(tracks[tIdx].DisplayId, "director", StringComparison.OrdinalIgnoreCase) ||
                                 string.Equals(tracks[tIdx].DisplayId, "mon-0", StringComparison.OrdinalIgnoreCase)))
                            {
                                inIdx = tIdx;
                                break;
                            }
                        }
                    }
                    if (inIdx < 0)
                    {
                        for (int tIdx = 0; tIdx < tracks.Count; tIdx++)
                        {
                            if (string.Equals(tracks[tIdx].StationId, p.StationId, StringComparison.OrdinalIgnoreCase))
                            {
                                inIdx = tIdx;
                                break;
                            }
                        }
                    }
                    if (inIdx < 0) inIdx = 0;

                    // Calculate geometry
                    int targetW = p.Width <= 1.0 && p.Width > 0 ? (int)Math.Round(p.Width * canvasW) : (int)Math.Round(p.Width * scaleX);
                    int targetH = p.Height <= 1.0 && p.Height > 0 ? (int)Math.Round(p.Height * canvasH) : (int)Math.Round(p.Height * scaleY);
                    if (targetW <= 0) targetW = canvasW;
                    if (targetH <= 0) targetH = canvasH;
                    targetW -= (targetW % 2);
                    targetH -= (targetH % 2);

                    string pLabel = $"[p_{pIdx}]";
                    var ops = new List<string>
                    {
                        $"fps=fps={targetFps}:round=near",
                        $"scale={targetW}:{targetH}:force_original_aspect_ratio=decrease:flags=lanczos+accurate_rnd",
                        $"pad={targetW}:{targetH}:(ow-iw)/2:(oh-ih)/2:black"
                    };

                    if (Math.Abs(p.Rotation) > 0.01)
                    {
                        double rad = (p.Rotation * Math.PI) / 180.0;
                        string radStr = rad.ToString("0.0000", System.Globalization.CultureInfo.InvariantCulture);
                        ops.Add($"rotate={radStr}:ow='rotw({radStr})':oh='roth({radStr})':c=none");
                    }

                    if (p.BorderWidth > 0)
                    {
                        string bColor = NormalizeHexColor(p.BorderColor, "0x06B6D4");
                        int scaledBorder = Math.Max(1, (int)Math.Round(p.BorderWidth * scaleX));
                        ops.Add($"drawbox=x=0:y=0:w=iw:h=ih:color={bColor}@0.85:t={scaledBorder}");
                    }

                    if (!string.IsNullOrWhiteSpace(p.Label) && !string.IsNullOrEmpty(fontClause))
                    {
                        string safeLabel = p.Label.Replace("\\", "\\\\").Replace(":", "\\:").Replace("'", "\\'");
                        int scaledFontSize = Math.Max(10, (int)Math.Round(13 * scaleX));
                        ops.Add($"drawtext={fontClause}text='{safeLabel}':x=8:y=8:fontsize={scaledFontSize}:fontcolor=white:box=1:boxcolor=0x070A10@0.85");
                    }

                    filterBuilder.Append($"[{inIdx}:v]{string.Join(",", ops)}{pLabel}; ");
                    placementLabels.Add(pLabel);
                }

                // 2. Base Canvas Background
                filterBuilder.Append($"color=c={bgHex}:s={canvasW}x{canvasH}:d={durationStr}:r={targetFps}[bg]; ");

                // 3. Daisy-chain overlays
                string currentSurface = "[bg]";
                for (int pIdx = 0; pIdx < sortedPlacements.Count; pIdx++)
                {
                    var p = sortedPlacements[pIdx];
                    string pLabel = placementLabels[pIdx];
                    string nextSurface = (pIdx == sortedPlacements.Count - 1) ? "[vbase]" : $"[t_{pIdx}]";

                    int targetX = p.X < 1.0 && p.X >= 0 && p.Width <= 1.0 ? (int)Math.Round(p.X * canvasW) : (int)Math.Round(p.X * scaleX);
                    int targetY = p.Y < 1.0 && p.Y >= 0 && p.Height <= 1.0 ? (int)Math.Round(p.Y * canvasH) : (int)Math.Round(p.Y * scaleY);
                    targetX -= (targetX % 2);
                    targetY -= (targetY % 2);

                    string enableClause = "";
                    if (p.StartOffsetMs.HasValue || p.EndOffsetMs.HasValue)
                    {
                        double startSec = Math.Max(0, (p.StartOffsetMs ?? 0) / 1000.0);
                        double endSec = Math.Min(exportedDurationSec, (p.EndOffsetMs ?? (exportedDurationSec * 1000)) / 1000.0);
                        enableClause = $":enable='between(t,{startSec.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture)},{endSec.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture)})'";
                    }

                    filterBuilder.Append($"{currentSurface}{pLabel}overlay={targetX}:{targetY}:eof_action=pass:repeatlast=1{enableClause}{nextSurface}; ");
                    currentSurface = nextSurface;
                }
            }

            // 4. Audio Routing
            string audioMapOption = "";
            bool anyTrackHasAudio = tracks.Any(t => t.HasAudio);

            if (!string.IsNullOrEmpty(job.AudioSourceStation))
            {
                if (string.Equals(job.AudioSourceStation, "mute", StringComparison.OrdinalIgnoreCase) ||
                    string.Equals(job.AudioSourceStation, "none", StringComparison.OrdinalIgnoreCase))
                {
                    audioMapOption = "";
                }
                else
                {
                    int audioIdx = tracks.FindIndex(t => string.Equals(t.StationId, job.AudioSourceStation, StringComparison.OrdinalIgnoreCase) && t.HasAudio);
                    if (audioIdx < 0)
                    {
                        audioIdx = tracks.FindIndex(t => string.Equals(t.StationId, job.AudioSourceStation, StringComparison.OrdinalIgnoreCase));
                    }

                    if (audioIdx >= 0 && tracks[audioIdx].HasAudio)
                    {
                        audioMapOption = $"-map {audioIdx}:a? -c:a aac -b:a 192k";
                    }
                    else if (anyTrackHasAudio)
                    {
                        int fallbackIdx = tracks.FindIndex(t => t.HasAudio);
                        if (fallbackIdx >= 0)
                        {
                            audioMapOption = $"-map {fallbackIdx}:a? -c:a aac -b:a 192k";
                        }
                    }
                }
            }
            else if (job.AudioRoutingSegments != null && job.AudioRoutingSegments.Count > 0 && anyTrackHasAudio)
            {
                long cutStartEpochMs = new DateTimeOffset(startUtc).ToUnixTimeMilliseconds();
                var audioSegFilterOps = new List<string>();
                var audioConcatLabels = new List<string>();

                for (int i = 0; i < job.AudioRoutingSegments.Count; i++)
                {
                    var aSeg = job.AudioRoutingSegments[i];
                    double aStartSec = Math.Max(0, (aSeg.StartEpochMs - cutStartEpochMs) / 1000.0);
                    double aEndSec = Math.Min(exportedDurationSec, (aSeg.EndEpochMs - cutStartEpochMs) / 1000.0);
                    double aDur = aEndSec - aStartSec;
                    if (aDur <= 0.05) continue;

                    int inIdx = -1;
                    for (int tIdx = 0; tIdx < tracks.Count; tIdx++)
                    {
                        if (string.Equals(tracks[tIdx].StationId, aSeg.SourceStationId, StringComparison.OrdinalIgnoreCase) && tracks[tIdx].HasAudio)
                        {
                            inIdx = tIdx;
                            break;
                        }
                    }
                    if (inIdx < 0)
                    {
                        for (int tIdx = 0; tIdx < tracks.Count; tIdx++)
                        {
                            if (string.Equals(tracks[tIdx].StationId, aSeg.SourceStationId, StringComparison.OrdinalIgnoreCase))
                            {
                                inIdx = tIdx;
                                break;
                            }
                        }
                    }
                    if (inIdx < 0) inIdx = 0;

                    string aLabel = $"[a_seg_{i}]";
                    string startA = aStartSec.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture);
                    string endA = aEndSec.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture);

                    if (tracks[inIdx].HasAudio)
                    {
                        double gain = aSeg.Gain > 0 ? aSeg.Gain : 1.0;
                        string gainFilter = Math.Abs(gain - 1.0) > 0.01 
                            ? $",volume={gain.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture)}" 
                            : "";
                        audioSegFilterOps.Add($"[{inIdx}:a]atrim=start={startA}:end={endA},asetpts=PTS-STARTPTS{gainFilter}{aLabel}");
                    }
                    else
                    {
                        string durA = aDur.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture);
                        audioSegFilterOps.Add($"anullsrc=r=48000:cl=stereo:d={durA}{aLabel}");
                    }
                    audioConcatLabels.Add(aLabel);
                }

                if (audioConcatLabels.Count > 1)
                {
                    filterBuilder.Append($" {string.Join("; ", audioSegFilterOps)}; {string.Join("", audioConcatLabels)}concat=n={audioConcatLabels.Count}:v=0:a=1[outa];");
                    audioMapOption = "-map \"[outa]\" -c:a aac -b:a 192k";
                }
                else if (audioConcatLabels.Count == 1)
                {
                    filterBuilder.Append($" {audioSegFilterOps[0]};");
                    audioMapOption = $"-map \"{audioConcatLabels[0]}\" -c:a aac -b:a 192k";
                }
                else
                {
                    int firstAudio = tracks.FindIndex(t => t.HasAudio);
                    audioMapOption = firstAudio >= 0 ? $"-map {firstAudio}:a? -c:a aac -b:a 192k" : "";
                }
            }
            else
            {
                int firstAudio = tracks.FindIndex(t => t.HasAudio);
                if (firstAudio >= 0)
                {
                    audioMapOption = $"-map {firstAudio}:a? -c:a aac -b:a 192k";
                }
            }

            long canvasStartEpochMs = new DateTimeOffset(startUtc).ToUnixTimeMilliseconds();
            long canvasStartEpochSec = canvasStartEpochMs / 1000;
            string canvasClockPos = (job.UtcClockPosition ?? "top-right").Trim().ToLowerInvariant();
            var (canvasClockX, canvasClockY) = ResolveClockCoordinates(job.UtcClockPosition);

            if (!string.IsNullOrEmpty(fontClause))
            {
                filterBuilder.Append($" [vbase]drawtext={fontClause}text='%{{pts\\:gmtime\\:{canvasStartEpochSec}\\:%Y-%m-%d  %H\\\\\\:%M\\\\\\:%S UTC}}':fontcolor=0x22D3EE:fontsize=15:box=1:boxcolor=0x070A10@0.85:boxborderw=6:x={canvasClockX}:y={canvasClockY}[v_clock]; [v_clock]fps=fps={targetFps}:round=near,format=yuv420p[outv]");
            }
            else
            {
                filterBuilder.Append($" [vbase]fps=fps={targetFps}:round=near,format=yuv420p[outv]");
            }

            string encArgs = _binaryResolver.GetOptimalVideoEncoderArgs(bitrateKbps: targetBitrateKbps);
            string creationUtcIso = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");

            string arguments = $"-nostdin -v error " +
                               $"{inputArgsBuilder} " +
                               $"-filter_complex \"{filterBuilder}\" " +
                               $"-map \"[outv]\" {audioMapOption} " +
                               $"{encArgs} " +
                               $"-fps_mode cfr -r {targetFps} " +
                               $"-metadata creation_time=\"{creationUtcIso}\" " +
                               $"-movflags +faststart " +
                               $"-y \"{finalMp4Path.Replace('\\', '/')}\"";

            _advLogger.LogInformation("[AdvanceJobManager] Running custom canvas MP4 composition: {Args}", arguments);

            var startInfo = new ProcessStartInfo
            {
                FileName = ffmpegPath,
                Arguments = arguments,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var process = new Process { StartInfo = startInfo };
            process.Start();
            ExtractorGarbageCollectorService.TrackProcess(process.Id);

            var stderrTask = process.StandardError.ReadToEndAsync(ct);
            await process.WaitForExitAsync(ct);

            if (process.ExitCode != 0)
            {
                string stderr = await stderrTask;
                throw new InvalidOperationException($"FFmpeg custom canvas composition failed with exit code {process.ExitCode}: {stderr}");
            }
        }

        private bool ProbeFileHasAudio(string filePath)
        {
            try
            {
                if (!File.Exists(filePath)) return false;
                string ffprobePath = _binaryResolver.ResolveFfprobe();
                var psi = new ProcessStartInfo
                {
                    FileName = ffprobePath,
                    Arguments = $"-v error -select_streams a -show_entries stream=codec_type -of csv=p=0 \"{filePath.Replace('\\', '/')}\"",
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };
                using var proc = Process.Start(psi);
                if (proc == null) return false;
                string output = proc.StandardOutput.ReadToEnd();
                proc.WaitForExit(4000);
                return output.Contains("audio", StringComparison.OrdinalIgnoreCase);
            }
            catch (Exception ex)
            {
                _advLogger.LogWarning(ex, "[AdvanceJobManager] Failed to probe audio for {Path}, assuming false", filePath);
                return false;
            }
        }

        private static string NormalizeHexColor(string? hex, string defaultHex)
        {
            if (string.IsNullOrWhiteSpace(hex)) return defaultHex;
            hex = hex.Trim();
            if (hex.StartsWith("#")) hex = "0x" + hex.Substring(1);
            if (!hex.StartsWith("0x", StringComparison.OrdinalIgnoreCase)) hex = "0x" + hex;
            return hex;
        }

        public static (string clockX, string clockY) ResolveClockCoordinates(string? rawPosition)
        {
            string clockPos = (rawPosition ?? "top-right").Trim().ToLowerInvariant();
            if (clockPos.StartsWith("custom:") || clockPos.Contains(','))
            {
                string coords = clockPos.Replace("custom:", "").Trim();
                var parts = coords.Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries);
                if (parts.Length >= 2 &&
                    double.TryParse(parts[0].Replace("%", "").Trim(), NumberStyles.Any, CultureInfo.InvariantCulture, out double xPct) &&
                    double.TryParse(parts[1].Replace("%", "").Trim(), NumberStyles.Any, CultureInfo.InvariantCulture, out double yPct))
                {
                    xPct = Math.Clamp(xPct, 0.0, 100.0);
                    yPct = Math.Clamp(yPct, 0.0, 100.0);
                    double xRatio = Math.Round(xPct / 100.0, 4);
                    double yRatio = Math.Round(yPct / 100.0, 4);
                    string clockX = $"16+(w-tw-32)*{xRatio.ToString("0.0000", CultureInfo.InvariantCulture)}";
                    string clockY = $"16+(h-th-32)*{yRatio.ToString("0.0000", CultureInfo.InvariantCulture)}";
                    return (clockX, clockY);
                }
            }

            return clockPos switch
            {
                "top-left" => ("24", "24"),
                "bottom-left" => ("24", "h-th-24"),
                "bottom-right" => ("w-tw-24", "h-th-24"),
                "top-right" => ("w-tw-24", "24"),
                _ => ("w-tw-24", "24")
            };
        }

        public static string? ResolveSystemFontClause()
        {
            try
            {
                if (OperatingSystem.IsWindows())
                {
                    string fontsDir = Environment.GetFolderPath(Environment.SpecialFolder.Fonts);
                    string[] winCandidates = {
                        Path.Combine(fontsDir, "arial.ttf"),
                        Path.Combine(fontsDir, "segoeui.ttf"),
                        Path.Combine(fontsDir, "tahoma.ttf"),
                        Path.Combine(fontsDir, "consola.ttf"),
                        "C:/Windows/Fonts/arial.ttf"
                    };
                    foreach (var font in winCandidates)
                    {
                        if (File.Exists(font))
                        {
                            string normalized = font.Replace("\\", "/").Replace(":", "\\:");
                            return $"fontfile='{normalized}':";
                        }
                    }
                }
                else if (OperatingSystem.IsLinux())
                {
                    string[] linuxCandidates = {
                        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
                        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
                        "/usr/share/fonts/dejavu/DejaVuSans.ttf",
                        "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
                        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
                        "/usr/share/fonts/truetype/freefont/FreeSans.ttf"
                    };
                    foreach (var font in linuxCandidates)
                    {
                        if (File.Exists(font))
                        {
                            return $"fontfile='{font}':";
                        }
                    }
                }
            }
            catch { }

            return null;
        }

        public static string ResolveTargetDisplayKey(string? targetDisplayId, IEnumerable<string> availableDisplays)
        {
            var list = availableDisplays.ToList();
            if (list.Count == 0) return "mon-0";
            if (string.IsNullOrWhiteSpace(targetDisplayId)) return list[0];

            string target = targetDisplayId.Trim();
            var exact = list.FirstOrDefault(d => string.Equals(d, target, StringComparison.OrdinalIgnoreCase));
            if (exact != null) return exact;

            if (int.TryParse(target, out int num1) && num1 >= 1 && num1 <= list.Count)
                return list[num1 - 1];

            var m = System.Text.RegularExpressions.Regex.Match(target, @"(?:Screen|Display)\s*(\d+)", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            if (m.Success && int.TryParse(m.Groups[1].Value, out int sNum) && sNum >= 1 && sNum <= list.Count)
                return list[sNum - 1];

            var mMon = System.Text.RegularExpressions.Regex.Match(target, @"mon-(\d+)", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            if (mMon.Success && int.TryParse(mMon.Groups[1].Value, out int monIdx))
            {
                var monMatch = list.FirstOrDefault(d => string.Equals(d, $"mon-{monIdx}", StringComparison.OrdinalIgnoreCase));
                if (monMatch != null) return monMatch;
                if (monIdx >= 1 && monIdx <= list.Count)
                    return list[monIdx - 1];
            }

            return list[0];
        }

        public static bool MatchesDisplay(string? target, string trackDisplayId, int displayIndex)
        {
            if (string.IsNullOrWhiteSpace(target)) return displayIndex == 0;
            string normTarget = target.Trim();
            if (string.Equals(normTarget, trackDisplayId, StringComparison.OrdinalIgnoreCase))
                return true;

            if (int.TryParse(normTarget, out int oneBased) && oneBased - 1 == displayIndex)
                return true;

            var match = System.Text.RegularExpressions.Regex.Match(normTarget, @"(?:Screen|Display|mon-?)\s*(\d+)", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            if (match.Success && int.TryParse(match.Groups[1].Value, out int extractedNum))
            {
                if (normTarget.StartsWith("Screen", StringComparison.OrdinalIgnoreCase) || normTarget.StartsWith("Display", StringComparison.OrdinalIgnoreCase))
                {
                    return extractedNum - 1 == displayIndex;
                }
                if (normTarget.StartsWith("mon", StringComparison.OrdinalIgnoreCase))
                {
                    if (extractedNum == displayIndex) return true;
                    if (extractedNum - 1 == displayIndex) return true;
                }
            }

            return false;
        }
    }
}
