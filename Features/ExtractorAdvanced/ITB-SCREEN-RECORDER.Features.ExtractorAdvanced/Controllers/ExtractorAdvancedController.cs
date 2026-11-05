// ==========================================
// File: Features/ExtractorAdvanced/Controllers/ExtractorAdvancedController.cs
// ==========================================
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Core.Contracts.Topology;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Controllers
{
    [ApiController]
    [Route("api/v1/extractor-advanced")]
    public class ExtractorAdvancedController : ControllerBase
    {
        private readonly AdvancedExtractorService _advancedExtractorService;
        private readonly IStorageScannerService _storageScanner;
        private readonly IAdvanceJobManager _jobManager;
        private readonly IKeystrokeRepository _keystrokeRepository;
        private readonly IStationRoleProvider? _stationRoleProvider;
        private readonly ILogger<ExtractorAdvancedController> _logger;
        private readonly IOptionsMonitor<SystemConfig>? _systemConfig;

        public ExtractorAdvancedController(
            AdvancedExtractorService advancedExtractorService,
            IStorageScannerService storageScanner,
            IAdvanceJobManager jobManager,
            IKeystrokeRepository keystrokeRepository,
            ILogger<ExtractorAdvancedController> logger,
            IStationRoleProvider? stationRoleProvider = null,
            IOptionsMonitor<SystemConfig>? systemConfig = null)
        {
            _advancedExtractorService = advancedExtractorService;
            _storageScanner = storageScanner;
            _jobManager = jobManager;
            _keystrokeRepository = keystrokeRepository;
            _logger = logger;
            _stationRoleProvider = stationRoleProvider;
            _systemConfig = systemConfig;
        }

        [HttpGet("keystrokes")]
        public async Task<IActionResult> GetKeystrokes(
            [FromQuery] string stationId,
            [FromQuery] double startEpoch,
            [FromQuery] double endEpoch,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(stationId)) return BadRequest("stationId is required.");
            stationId = stationId.Trim();

            if (stationId.StartsWith("live/", StringComparison.OrdinalIgnoreCase))
            {
                stationId = stationId.Substring(5);
            }

            long lStart = (long)Math.Round(startEpoch);
            long lEnd = (long)Math.Round(endEpoch);

            const long SecondsThreshold = 100_000_000_000L;
            if (lStart > 0 && lStart < SecondsThreshold) lStart *= 1000;
            if (lEnd > 0 && lEnd < SecondsThreshold) lEnd *= 1000;

            // Resolve station role alias if stationId was passed as a role alias instead of physical hostname
            if (_stationRoleProvider != null)
            {
                var aliases = await _stationRoleProvider.GetStationRoleAliasesForTimeRangeAsync(lStart, lEnd);
                var match = aliases.FirstOrDefault(kvp => kvp.Value.Equals(stationId, StringComparison.OrdinalIgnoreCase));
                if (!string.IsNullOrEmpty(match.Key))
                {
                    stationId = match.Key;
                }
            }

            if (lEnd <= lStart) return BadRequest("Invalid epoch window.");

            try
            {
                var events = await _keystrokeRepository.GetKeystrokesForWindowAsync(stationId, lStart, lEnd);
                return Ok(events);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:Keystrokes] Error retrieving keystrokes.");
                return StatusCode(500, "Error retrieving keystrokes.");
            }
        }

        [HttpGet("director-plan")]
        public async Task<IActionResult> GetDirectorPlan(
            [FromQuery] string stationId,
            [FromQuery] double startEpoch,
            [FromQuery] double endEpoch,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(stationId)) return BadRequest("stationId is required.");
            stationId = stationId.Trim();

            long lStart = (long)Math.Round(startEpoch);
            long lEnd = (long)Math.Round(endEpoch);
            const long SecondsThreshold = 100_000_000_000L;
            if (lStart > 0 && lStart < SecondsThreshold) lStart *= 1000;
            if (lEnd > 0 && lEnd < SecondsThreshold) lEnd *= 1000;

            if (lEnd <= lStart) return BadRequest("Invalid epoch window.");

            try
            {
                DateTime startUtc = DateTimeOffset.FromUnixTimeMilliseconds(lStart).UtcDateTime;
                DateTime endUtc = DateTimeOffset.FromUnixTimeMilliseconds(lEnd).UtcDateTime;
                var chunks = await _storageScanner.GetChunksForStationAsync(stationId, startUtc, endUtc);
                var distinctDisplays = chunks
                    .GroupBy(c => string.IsNullOrEmpty(c.DisplayId) ? "mon-0" : c.DisplayId.ToLowerInvariant())
                    .OrderBy(g => g.Key)
                    .Select((g, idx) =>
                    {
                        var dSample = g.LastOrDefault();
                        int dWidth = dSample?.Width > 0 ? dSample.Width : 1920;
                        int dHeight = dSample?.Height > 0 ? dSample.Height : 1080;
                        return new DisplayMetadataDto
                        {
                            DisplayId = g.Key,
                            DisplayNumber = idx + 1,
                            DisplayName = $"Screen {idx + 1}",
                            IsPrimary = idx == 0 || g.Key == "mon-0",
                            X = idx * dWidth,
                            Y = 0,
                            Width = dWidth,
                            Height = dHeight
                        };
                    })
                    .ToList();

                if (distinctDisplays.Count == 0)
                {
                    distinctDisplays.Add(new DisplayMetadataDto
                    {
                        DisplayId = "mon-0",
                        DisplayNumber = 1,
                        DisplayName = "Screen 1",
                        IsPrimary = true,
                        X = 0,
                        Y = 0,
                        Width = 1920,
                        Height = 1080
                    });
                }

                var plan = await ComputeStationDirectorPlanAsync(stationId, lStart, lEnd, chunks, distinctDisplays);
                return Ok(plan);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:DirectorPlan] Error analyzing director plan for station {StationId}", stationId);
                return StatusCode(500, "Error analyzing director plan.");
            }
        }

        private async Task<StationDirectorPlanDto> ComputeStationDirectorPlanAsync(
            string stationId,
            long startEpochMs,
            long endEpochMs,
            IReadOnlyList<RecordingChunkMetadata> chunks,
            List<DisplayMetadataDto> displays)
        {
            var activityEvents = new List<ActivityEventDto>();
            long minDwellMs = (_systemConfig?.CurrentValue?.AutoDirector?.MinDwellSeconds ?? 10) * 1000L;
            if (minDwellMs <= 0) minDwellMs = 10000;

            if (displays.Count > 1)
            {
                var keystrokes = await _keystrokeRepository.GetKeystrokesForWindowAsync(stationId, startEpochMs, endEpochMs);
                var chunksByDisp = chunks
                    .GroupBy(c => (string.IsNullOrEmpty(c.DisplayId) ? "mon-0" : c.DisplayId).ToLowerInvariant())
                    .ToDictionary(g => g.Key, g => g.OrderBy(c => c.StartUtc).ToList());

                foreach (var k in keystrokes)
                {
                    string? assignedDisp = k.DisplayId;

                    // Correlate with chunk encoding bitrate if coordinate telemetry is not populated
                    if (string.IsNullOrEmpty(assignedDisp) && k.X == 0 && k.Y == 0)
                    {
                        var kUtc = DateTimeOffset.FromUnixTimeMilliseconds(k.EpochMs).UtcDateTime;
                        double bestBitrate = 0;
                        string? bestDisp = null;

                        foreach (var kvp in chunksByDisp)
                        {
                            var ch = kvp.Value.FirstOrDefault(c => c.StartUtc <= kUtc && kUtc <= c.EndUtc);
                            if (ch != null && ch.Duration.TotalMilliseconds > 0)
                            {
                                double br = (ch.FileSizeBytes * 8.0) / (ch.Duration.TotalMilliseconds / 1000.0);
                                if (br > bestBitrate)
                                {
                                    bestBitrate = br;
                                    bestDisp = kvp.Key;
                                }
                            }
                        }

                        if (bestDisp != null)
                        {
                            assignedDisp = bestDisp;
                        }
                    }

                    activityEvents.Add(new ActivityEventDto
                    {
                        TimestampEpochMs = k.EpochMs,
                        Type = k.KeyCombination.StartsWith("[Click:", StringComparison.OrdinalIgnoreCase) || k.KeyCombination.EndsWith("Click]", StringComparison.OrdinalIgnoreCase)
                            ? ActivityEventType.MouseClick
                            : ActivityEventType.Keystroke,
                        KeyName = k.KeyCombination,
                        X = k.X,
                        Y = k.Y,
                        DisplayId = assignedDisp
                    });
                }

                // If no keystroke events, infer activity transitions from chunk bitrate differences across displays
                if (activityEvents.Count == 0 && chunksByDisp.Count > 1)
                {
                    var primaryKey = displays.FirstOrDefault(d => d.IsPrimary)?.DisplayId ?? "mon-0";
                    var allChunks = chunks.OrderBy(c => c.StartUtc).ToList();
                    var timeSlices = new SortedSet<long>();
                    foreach (var ch in allChunks)
                    {
                        timeSlices.Add(new DateTimeOffset(ch.StartUtc).ToUnixTimeMilliseconds());
                        timeSlices.Add(new DateTimeOffset(ch.EndUtc).ToUnixTimeMilliseconds());
                    }

                    var timeList = timeSlices.Where(t => t >= startEpochMs && t <= endEpochMs).ToList();
                    string lastActiveDisp = primaryKey;

                    for (int i = 0; i < timeList.Count - 1; i++)
                    {
                        long t0 = timeList[i];
                        long t1 = timeList[i + 1];
                        if (t1 - t0 < minDwellMs) continue;

                        DateTime sliceMidUtc = DateTimeOffset.FromUnixTimeMilliseconds((t0 + t1) / 2).UtcDateTime;
                        string? dominantDisp = null;
                        double maxBr = 0;

                        foreach (var kvp in chunksByDisp)
                        {
                            var ch = kvp.Value.FirstOrDefault(c => c.StartUtc <= sliceMidUtc && sliceMidUtc <= c.EndUtc);
                            if (ch != null && ch.Duration.TotalMilliseconds > 0)
                            {
                                double br = (ch.FileSizeBytes * 8.0) / (ch.Duration.TotalMilliseconds / 1000.0);
                                if (br > maxBr)
                                {
                                    maxBr = br;
                                    dominantDisp = kvp.Key;
                                }
                            }
                        }

                        if (!string.IsNullOrEmpty(dominantDisp) && !string.Equals(dominantDisp, lastActiveDisp, StringComparison.OrdinalIgnoreCase))
                        {
                            activityEvents.Add(new ActivityEventDto
                            {
                                TimestampEpochMs = t0 + 1000,
                                Type = ActivityEventType.MouseClick,
                                DisplayId = dominantDisp
                            });
                            lastActiveDisp = dominantDisp;
                        }
                    }
                }
            }

            var topology = new StationDisplayTopologyDto
            {
                Hostname = stationId,
                Displays = displays
            };

            var analyzer = new ITB_SCREEN_RECORDER.Features.Extractor.Services.Engine.ActivityFocusAnalyzer();
            var sortedStationChunks = chunks.OrderBy(c => c.StartUtc).ToList();
            var stationGaps = new List<(long StartEpochMs, long EndEpochMs)>();
            if (sortedStationChunks.Count > 0)
            {
                long firstChunkStart = new DateTimeOffset(sortedStationChunks[0].StartUtc).ToUnixTimeMilliseconds();
                if (firstChunkStart > startEpochMs)
                {
                    stationGaps.Add((startEpochMs, firstChunkStart));
                }

                for (int i = 0; i < sortedStationChunks.Count - 1; i++)
                {
                    long cEnd = new DateTimeOffset(sortedStationChunks[i].EndUtc).ToUnixTimeMilliseconds();
                    long nextStart = new DateTimeOffset(sortedStationChunks[i + 1].StartUtc).ToUnixTimeMilliseconds();
                    if (nextStart - cEnd > 1000)
                    {
                        stationGaps.Add((cEnd, nextStart));
                    }
                }

                long lastChunkEnd = new DateTimeOffset(sortedStationChunks[^1].EndUtc).ToUnixTimeMilliseconds();
                if (lastChunkEnd < endEpochMs)
                {
                    stationGaps.Add((lastChunkEnd, endEpochMs));
                }
            }
            else
            {
                stationGaps.Add((startEpochMs, endEpochMs));
            }

            return analyzer.AnalyzeFocus(stationId, startEpochMs, endEpochMs, topology, activityEvents, minDwellMs: minDwellMs, knownGaps: stationGaps);
        }

        [HttpGet("stations")]
        public async Task<IActionResult> GetStations(
            [FromQuery] double? startEpoch,
            [FromQuery] double? endEpoch,
            [FromQuery] string? timeMode = "LOCAL",
            CancellationToken ct = default)
        {
            try
            {
                long? lStart = startEpoch.HasValue ? (long)Math.Round(startEpoch.Value) : (long?)null;
                long? lEnd = endEpoch.HasValue ? (long)Math.Round(endEpoch.Value) : (long?)null;

                DateTime startUtc = lStart.HasValue && lStart.Value > 0
                    ? DateTimeOffset.FromUnixTimeMilliseconds(lStart.Value).UtcDateTime
                    : DateTime.UtcNow.AddDays(-7);

                DateTime endUtc = lEnd.HasValue && lEnd.Value > 0
                    ? DateTimeOffset.FromUnixTimeMilliseconds(lEnd.Value).UtcDateTime
                    : DateTime.UtcNow;

                var availableHosts = await _storageScanner.GetAvailableHostsAsync(startUtc, endUtc);

                long scopeStartMs = lStart ?? new DateTimeOffset(startUtc).ToUnixTimeMilliseconds();
                long scopeEndMs = lEnd ?? new DateTimeOffset(endUtc).ToUnixTimeMilliseconds();

                var aliases = _stationRoleProvider != null
                    ? await _stationRoleProvider.GetStationRoleAliasesForTimeRangeAsync(scopeStartMs, scopeEndMs)
                    : new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

                var allRoleHistory = _stationRoleProvider != null
                    ? await _stationRoleProvider.GetStationRoleHistoryAsync(scopeStartMs, scopeEndMs)
                    : new List<ITB_SCREEN_RECORDER.Core.Contracts.Network.StationRoleIntervalDto>();

                var stationDtos = new ConcurrentBag<object>();

                await Parallel.ForEachAsync(availableHosts, new ParallelOptions { MaxDegreeOfParallelism = 8, CancellationToken = ct }, async (host, token) =>
                {
                    var chunks = await _storageScanner.GetChunksForStationAsync(host, startUtc, endUtc);
                    if (chunks.Count == 0)
                    {
                        // Station has zero recordings in the requested time interval
                        return;
                    }

                    var sample = chunks.LastOrDefault();
                    if (sample == null)
                    {
                        return;
                    }

                    int width = sample?.Width ?? 1920;
                    int height = sample?.Height ?? 1080;
                    double fps = sample?.Fps ?? 30.0;
                    bool hasAudio = sample?.HasAudio ?? true;

                    string resLabel = FormatResolution(width, height);
                    string fpsLabel = $"{Math.Round(fps)}fps";

                    aliases.TryGetValue(host, out string? roleAlias);
                    string effectiveDisplayName = !string.IsNullOrWhiteSpace(roleAlias) ? roleAlias : host;

                    var distinctDisplays = chunks
                        .GroupBy(c => string.IsNullOrEmpty(c.DisplayId) ? "mon-0" : c.DisplayId.ToLowerInvariant())
                        .OrderBy(g => g.Key)
                        .Select((g, idx) =>
                        {
                            var dSample = g.LastOrDefault();
                            int dWidth = dSample?.Width ?? width;
                            int dHeight = dSample?.Height ?? height;
                            double dFps = dSample?.Fps ?? fps;
                            bool dHasAudio = dSample?.HasAudio ?? false;
                            bool isPrimary = g.Key == "mon-0" || (dSample?.IsPrimary ?? false);
                            return new
                            {
                                displayId = g.Key,
                                displayIndex = idx,
                                displayNumber = idx + 1,
                                displayName = $"Screen {idx + 1}",
                                isPrimary = isPrimary,
                                hasAudio = dHasAudio,
                                x = idx * dWidth,
                                y = 0,
                                width = dWidth,
                                height = dHeight,
                                fps = dFps,
                                bounds = new { x = idx * dWidth, y = 0, width = dWidth, height = dHeight }
                            };
                        })
                        .ToList();

                    if (distinctDisplays.Count == 0)
                    {
                        distinctDisplays.Add(new
                        {
                            displayId = "mon-0",
                            displayIndex = 0,
                            displayNumber = 1,
                            displayName = "Screen 1",
                            isPrimary = true,
                            hasAudio = hasAudio,
                            x = 0,
                            y = 0,
                            width = width,
                            height = height,
                            fps = fps,
                            bounds = new { x = 0, y = 0, width = width, height = height }
                        });
                    }

                    var displayTopology = new
                    {
                        hostname = host,
                        audioCarrierDisplayId = distinctDisplays.FirstOrDefault(d => d.hasAudio)?.displayId ?? "mon-0",
                        displays = distinctDisplays,
                        virtualDesktopBounds = new
                        {
                            x = 0,
                            y = 0,
                            width = distinctDisplays.Sum(d => d.width),
                            height = distinctDisplays.Max(d => d.height)
                        }
                    };

                    stationDtos.Add(new
                    {
                        id = host,
                        hostname = host,
                        roleAlias = roleAlias,
                        roleHistory = allRoleHistory.Where(h => string.Equals(h.StationId, host, StringComparison.OrdinalIgnoreCase)).ToList(),
                        displayName = effectiveDisplayName,
                        isOnline = true,
                        recordingsCount = chunks.Count,
                        segments = Array.Empty<object>(),
                        displays = distinctDisplays,
                        displayTopology = displayTopology,
                        directorPlan = distinctDisplays.Count > 1
                            ? ComputeStationDirectorPlanAsync(
                                host,
                                lStart ?? 0,
                                lEnd ?? (lStart.HasValue ? lStart.Value + 3600000 : 3600000),
                                chunks,
                                distinctDisplays.Select(d => new DisplayMetadataDto
                                {
                                    DisplayId = d.displayId,
                                    IsPrimary = d.isPrimary,
                                    X = d.x,
                                    Y = d.y,
                                    Width = d.width,
                                    Height = d.height
                                }).ToList()).GetAwaiter().GetResult()
                            : null,
                        hasAudio = hasAudio,
                        audioCodec = "AAC",
                        audioChannels = 2,
                        audioLabel = hasAudio ? "AAC" : "NONE",
                        width = width,
                        height = height,
                        fps = fps,
                        isVfr = false,
                        resolution = resLabel,
                        feedSpec = $"{resLabel} • {fpsLabel}"
                    });
                });

                return Ok(stationDtos.OrderBy(s => ((dynamic)s).displayName).ToList());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:Stations] Failed scanning database for stations.");
                return StatusCode(500, "Error scanning database.");
            }
        }

        private static string FormatResolution(int width, int height)
        {
            if (height >= 2100 || width >= 3800) return "4K";
            if (height >= 1400 || width >= 2500) return "1440p";
            if (height >= 1050 || width >= 1900) return "1080p";
            if (height >= 700 || width >= 1260) return "720p";
            if (width > 0 && height > 0) return $"{width}x{height}";
            return "1080p";
        }

        [HttpGet("timeline-segments")]
        [HttpGet("/api/v1/extractor/timeline-segments")]
        public async Task<IActionResult> GetTimelineSegments(
            [FromQuery] string stations,
            [FromQuery] double startEpoch,
            [FromQuery] double endEpoch,
            CancellationToken ct = default)
        {
            long lStart = (long)Math.Round(startEpoch);
            long lEnd = (long)Math.Round(endEpoch);

            if (string.IsNullOrWhiteSpace(stations) || lStart <= 0 || lEnd <= lStart)
            {
                return BadRequest("Invalid stations or epoch parameters.");
            }

            try
            {
                DateTime startUtc = DateTimeOffset.FromUnixTimeMilliseconds(lStart).UtcDateTime;
                DateTime endUtc = DateTimeOffset.FromUnixTimeMilliseconds(lEnd).UtcDateTime;

                var stationList = stations.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
                var segmentsMap = new ConcurrentDictionary<string, List<object>>();

                await Parallel.ForEachAsync(stationList, new ParallelOptions { MaxDegreeOfParallelism = 12, CancellationToken = ct }, async (stationId, token) =>
                {
                    var chunks = await _storageScanner.GetChunksForStationAsync(stationId, startUtc, endUtc);

                    var segList = chunks
                        .OrderBy(c => c.StartUtc)
                        .Select(c =>
                        {
                            long sMs = new DateTimeOffset(c.StartUtc).ToUnixTimeMilliseconds();
                            long eMs = new DateTimeOffset(c.EndUtc).ToUnixTimeMilliseconds();
                            return (object)new
                            {
                                startEpoch = sMs,
                                endEpoch = eMs,
                                startEpochMs = sMs,
                                endEpochMs = eMs
                            };
                        }).ToList();

                    segmentsMap[stationId] = segList;
                });

                return Ok(segmentsMap);
            }
            catch (OperationCanceledException)
            {
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:TimelineSegments] Error fetching segments.");
                return StatusCode(500, "Failed to retrieve timeline segments.");
            }
        }

        [HttpPost("estimate")]
        public async Task<IActionResult> EstimateCutJob([FromBody] AdvanceCutRequestDto request)
        {
            try
            {
                var estimation = await _jobManager.EstimateCutJobAsync(request);
                return Ok(estimation);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:Estimate] Error estimating timeline cut");
                return StatusCode(500, new { message = "Failed to calculate cut estimation." });
            }
        }

        /// <summary>
        /// Forensic Inspection & Capability Discovery Endpoint for External Systems and Orchestrators.
        /// Discovers all available workstations, role-to-hostname mappings, display topologies,
        /// and media stream presence (recordings, audio, keystroke subtitles) within a given temporal window.
        /// </summary>
        [HttpGet("inspect")]
        [HttpPost("inspect")]
        [HttpGet("/api/v1/extractor/inspect")]
        [HttpPost("/api/v1/extractor/inspect")]
        public async Task<IActionResult> InspectTimelineScope(
            [FromQuery] double? startEpoch = null,
            [FromQuery] double? endEpoch = null,
            [FromQuery] string? startTime = null,
            [FromQuery] string? endTime = null,
            [FromQuery] string? stations = null,
            [FromBody] ForensicInspectionRequestDto? requestBody = null,
            CancellationToken ct = default)
        {
            try
            {
                double? rawStart = requestBody?.StartEpoch ?? startEpoch;
                double? rawEnd = requestBody?.EndEpoch ?? endEpoch;
                string? strStart = requestBody?.StartTime ?? startTime;
                string? strEnd = requestBody?.EndTime ?? endTime;

                long lStart = 0;
                long lEnd = 0;

                const long SecondsThreshold = 100_000_000_000L;

                if (rawStart.HasValue && rawStart.Value > 0)
                {
                    lStart = (long)Math.Round(rawStart.Value);
                    if (lStart < SecondsThreshold) lStart *= 1000;
                }
                else if (!string.IsNullOrWhiteSpace(strStart) && DateTimeOffset.TryParse(strStart, out var sDto))
                {
                    lStart = sDto.ToUnixTimeMilliseconds();
                }

                if (rawEnd.HasValue && rawEnd.Value > 0)
                {
                    lEnd = (long)Math.Round(rawEnd.Value);
                    if (lEnd < SecondsThreshold) lEnd *= 1000;
                }
                else if (!string.IsNullOrWhiteSpace(strEnd) && DateTimeOffset.TryParse(strEnd, out var eDto))
                {
                    lEnd = eDto.ToUnixTimeMilliseconds();
                }

                DateTime startUtc = lStart > 0
                    ? DateTimeOffset.FromUnixTimeMilliseconds(lStart).UtcDateTime
                    : DateTime.UtcNow.AddDays(-7);

                DateTime endUtc = lEnd > 0
                    ? DateTimeOffset.FromUnixTimeMilliseconds(lEnd).UtcDateTime
                    : DateTime.UtcNow;

                if (lStart <= 0) lStart = new DateTimeOffset(startUtc).ToUnixTimeMilliseconds();
                if (lEnd <= 0) lEnd = new DateTimeOffset(endUtc).ToUnixTimeMilliseconds();

                if (endUtc <= startUtc)
                {
                    return BadRequest(new { message = "End time must be strictly greater than start time." });
                }

                var availableHosts = await _storageScanner.GetAvailableHostsAsync(startUtc, endUtc);

                var aliases = _stationRoleProvider != null
                    ? await _stationRoleProvider.GetStationRoleAliasesForTimeRangeAsync(lStart, lEnd)
                    : new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

                var allRoleHistory = _stationRoleProvider != null
                    ? await _stationRoleProvider.GetStationRoleHistoryAsync(lStart, lEnd)
                    : new List<ITB_SCREEN_RECORDER.Core.Contracts.Network.StationRoleIntervalDto>();

                var roleToStation = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
                var stationToRole = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

                foreach (var kvp in aliases)
                {
                    stationToRole[kvp.Key] = kvp.Value;
                    roleToStation[kvp.Value] = kvp.Key;
                }

                var requestedFilter = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
                if (requestBody?.StationIds != null && requestBody.StationIds.Count > 0)
                {
                    foreach (var s in requestBody.StationIds)
                    {
                        if (roleToStation.TryGetValue(s, out var host)) requestedFilter.Add(host);
                        else requestedFilter.Add(s);
                    }
                }
                else if (!string.IsNullOrWhiteSpace(stations))
                {
                    var split = stations.Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
                    foreach (var s in split)
                    {
                        if (roleToStation.TryGetValue(s, out var host)) requestedFilter.Add(host);
                        else requestedFilter.Add(s);
                    }
                }

                var targetHosts = requestedFilter.Count > 0
                    ? availableHosts.Where(h => requestedFilter.Contains(h)).ToList()
                    : availableHosts.ToList();

                foreach (var req in requestedFilter)
                {
                    if (!targetHosts.Contains(req, StringComparer.OrdinalIgnoreCase))
                    {
                        targetHosts.Add(req);
                    }
                }

                var stationInspectionList = new ConcurrentBag<StationInspectionDto>();

                await Parallel.ForEachAsync(targetHosts, new ParallelOptions { MaxDegreeOfParallelism = 8, CancellationToken = ct }, async (host, token) =>
                {
                    var chunks = await _storageScanner.GetChunksForStationAsync(host, startUtc, endUtc);
                    if (chunks.Count == 0)
                    {
                        // No recordings in the requested interval
                        return;
                    }
                    var sample = chunks.LastOrDefault();
                    if (sample == null)
                    {
                        return;
                    }

                    int width = sample?.Width ?? 1920;
                    int height = sample?.Height ?? 1080;
                    double fps = sample?.Fps ?? 30.0;
                    bool hasAudio = chunks.Any(c => c.HasAudio) || (sample?.HasAudio ?? false);
                    bool hasRecordings = chunks.Count > 0;

                    aliases.TryGetValue(host, out string? roleAlias);
                    string effectiveDisplayName = !string.IsNullOrWhiteSpace(roleAlias) ? roleAlias : host;

                    var keystrokes = await _keystrokeRepository.GetKeystrokesForWindowAsync(host, lStart, lEnd);
                    bool hasKeystrokes = keystrokes != null && keystrokes.Count > 0;
                    int keystrokeCount = keystrokes?.Count ?? 0;

                    var distinctDisplays = chunks
                        .GroupBy(c => string.IsNullOrEmpty(c.DisplayId) ? "mon-0" : c.DisplayId.ToLowerInvariant())
                        .OrderBy(g => g.Key)
                        .Select((g, idx) =>
                        {
                            var dSample = g.LastOrDefault();
                            int dWidth = dSample?.Width ?? width;
                            int dHeight = dSample?.Height ?? height;
                            double dFps = dSample?.Fps ?? fps;
                            bool dHasAudio = g.Any(c => c.HasAudio);
                            bool isPrimary = g.Key == "mon-0" || (dSample?.IsPrimary ?? false);
                            return new StationDisplayInspectionDto
                            {
                                DisplayId = g.Key,
                                DisplayNumber = idx + 1,
                                DisplayName = $"Screen {idx + 1}",
                                IsPrimary = isPrimary,
                                HasAudio = dHasAudio,
                                X = idx * dWidth,
                                Y = 0,
                                Width = dWidth,
                                Height = dHeight,
                                Fps = dFps,
                                Resolution = FormatResolution(dWidth, dHeight)
                            };
                        })
                        .ToList();

                    if (distinctDisplays.Count == 0)
                    {
                        distinctDisplays.Add(new StationDisplayInspectionDto
                        {
                            DisplayId = "mon-0",
                            DisplayNumber = 1,
                            DisplayName = "Screen 1",
                            IsPrimary = true,
                            HasAudio = hasAudio,
                            X = 0,
                            Y = 0,
                            Width = width,
                            Height = height,
                            Fps = fps,
                            Resolution = FormatResolution(width, height)
                        });
                    }

                    var segments = chunks
                        .OrderBy(c => c.StartUtc)
                        .Select(c => new TimelineSegmentInspectionDto
                        {
                            DisplayId = string.IsNullOrEmpty(c.DisplayId) ? "mon-0" : c.DisplayId,
                            StartEpochMs = new DateTimeOffset(c.StartUtc).ToUnixTimeMilliseconds(),
                            EndEpochMs = new DateTimeOffset(c.EndUtc).ToUnixTimeMilliseconds(),
                            StartUtc = c.StartUtc,
                            EndUtc = c.EndUtc,
                            DurationSeconds = c.Duration.TotalSeconds,
                            HasAudio = c.HasAudio
                        })
                        .ToList();

                    stationInspectionList.Add(new StationInspectionDto
                    {
                        StationId = host,
                        Hostname = host,
                        RoleAlias = roleAlias,
                        RoleHistory = allRoleHistory.Where(h => string.Equals(h.StationId, host, StringComparison.OrdinalIgnoreCase)).ToList(),
                        DisplayName = effectiveDisplayName,
                        IsOnline = true,
                        HasRecordings = hasRecordings,
                        HasAudio = hasAudio,
                        HasKeystrokes = hasKeystrokes,
                        KeystrokeCount = keystrokeCount,
                        RecordingsCount = chunks.Count,
                        Displays = distinctDisplays,
                        RecordingSegments = segments
                    });
                });

                var stationsOrdered = stationInspectionList.OrderBy(s => s.DisplayName).ToList();

                var result = new ForensicInspectionResultDto
                {
                    TimeRange = new ForensicTimeRangeDto
                    {
                        StartEpochMs = lStart,
                        EndEpochMs = lEnd,
                        StartUtc = startUtc,
                        EndUtc = endUtc,
                        DurationSeconds = (endUtc - startUtc).TotalSeconds
                    },
                    Stations = stationsOrdered,
                    RoleToStationMap = roleToStation,
                    StationToRoleMap = stationToRole,
                    RoleHistory = allRoleHistory,
                    TotalStationsFound = stationsOrdered.Count,
                    ActiveRecordingStationsCount = stationsOrdered.Count(s => s.HasRecordings),
                    StationsWithAudioCount = stationsOrdered.Count(s => s.HasAudio),
                    StationsWithKeystrokesCount = stationsOrdered.Count(s => s.HasKeystrokes)
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:Inspect] Error executing timeline scope inspection");
                return StatusCode(500, new { message = "Error inspecting timeline scope", error = ex.Message });
            }
        }

        /// <summary>
        /// External & Internal Master Video Export Endpoint.
        /// Supports standard compositions (Split, PiP, Grid, Auto-Director) or Custom Canvas Layouts
        /// with absolute positioning, depth z-ordering, custom dimensions, and audio routing.
        /// </summary>
        [HttpPost("cut")]
        [HttpPost("export")]
        [HttpPost("/api/v1/extractor/cut")]
        [HttpPost("/api/v1/extractor/export")]
        [Consumes("application/json", "application/xml", "text/xml")]
        public IActionResult EnqueueAdvanceCutJob([FromBody] AdvanceCutRequestDto request)
        {
            try
            {
                var job = _jobManager.EnqueueAdvanceCutJob(request);
                return Accepted(new
                {
                    jobId = job.JobId,
                    fileName = job.FileName,
                    status = job.Status,
                    statusUrl = $"/api/v1/extractor/jobs/{job.JobId}",
                    downloadUrl = $"/api/v1/extractor/jobs/{job.JobId}/download"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:Cut] Error enqueuing advance cut job");
                return StatusCode(500, new { message = "Failed to start extraction job.", error = ex.Message });
            }
        }

        /// <summary>
        /// Query the current progress, status, ETA, and download URL of an export job.
        /// </summary>
        [HttpGet("jobs/{jobId}/status")]
        [HttpGet("/api/v1/extractor/jobs/{jobId}/status")]
        public IActionResult GetJobStatus(string jobId)
        {
            var job = _jobManager.GetJob(jobId);
            if (job == null) return NotFound(new { message = $"Job {jobId} not found." });

            var advJob = job as AdvanceJobInfo;
            double estimatedSec = advJob != null ? advJob.EstimatedSecondsRemaining : job.EtaSeconds;

            return Ok(new
            {
                jobId = job.JobId,
                fileName = job.FileName,
                status = job.Status,
                statusMessage = job.StatusMessage,
                progressPercent = job.ProgressPercent,
                speedMBps = job.SpeedMBps,
                fileSizeBytes = job.FileSizeBytes,
                estimatedSecondsRemaining = estimatedSec,
                createdAtUtc = job.CreatedAtUtc,
                completedAtUtc = job.CompletedAtUtc,
                errorMessage = job.ErrorMessage,
                createdBy = job.CreatedBy,
                notes = job.Notes,
                downloadUrl = job.Status == "Completed" ? $"/api/v1/extractor/jobs/{job.JobId}/download" : null
            });
        }

        [HttpGet("stream-metadata")]
        public async Task<IActionResult> GetStreamMetadata(
            [FromQuery] string hostname,
            [FromQuery] double epochMs,
            CancellationToken ct = default)
        {
            long lEpoch = (long)Math.Round(epochMs);
            if (string.IsNullOrWhiteSpace(hostname) || lEpoch <= 0) return BadRequest("Hostname and valid epochMs are required.");

            try
            {
                var metadata = await _advancedExtractorService.GetStreamMetadataAsync(hostname, lEpoch, ct);
                return Ok(metadata);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:StreamMetadata] Failed retrieving metadata for {Host}", hostname);
                return StatusCode(500, "Error retrieving stream metadata.");
            }
        }

        [HttpGet("frame")]
        public async Task<IActionResult> GetStationFrame(
            [FromQuery] string hostname,
            [FromQuery] double epochMs,
            [FromQuery] string? displayId = null,
            CancellationToken ct = default)
        {
            long lEpoch = (long)Math.Round(epochMs);
            if (string.IsNullOrWhiteSpace(hostname) || lEpoch <= 0) return BadRequest("Hostname and valid epochMs are required.");

            try
            {
                var imageStream = await _advancedExtractorService.ExtractFrameAsync(hostname, lEpoch, displayId, ct);
                if (imageStream == null || imageStream == Stream.Null || imageStream.Length == 0)
                {
                    return NoContent();
                }

                Response.Headers.Append("Cache-Control", "public, max-age=86400, stale-while-revalidate=3600");
                return File(imageStream, "image/jpeg");
            }
            catch (OperationCanceledException)
            {
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:Frame] Failed extracting frame for {Host} at {Epoch}", hostname, lEpoch);
                return StatusCode(500, "Error extracting frame.");
            }
        }

        /// <summary>
        /// Instant zero-latency video streaming endpoint (Single-Chunk Direct Stream).
        /// Eliminates Concat Demuxer processing loops, consumes near-zero CPU at 1x speed, and starts streaming within 10ms.
        /// </summary>
        /// <param name="hostname">Station hostname.</param>
        /// <param name="startEpoch">Timeline start Unix epoch in milliseconds.</param>
        /// <param name="endEpoch">Timeline end Unix epoch in milliseconds.</param>
        /// <param name="seekEpoch">Optional seek position in Unix epoch milliseconds.</param>
        /// <param name="speed">Playback speed factor (e.g. 1.0, 2.0, 4.0).</param>
        /// <param name="ct">Cancellation token.</param>
        [HttpGet("stream")]
        public async Task StreamContinuousStationVideo(
            [FromQuery] string hostname,
            [FromQuery] double startEpoch,
            [FromQuery] double endEpoch,
            [FromQuery] double? seekEpoch = null,
            [FromQuery] double speed = 1.0,
            [FromQuery] string? displayId = null,
            CancellationToken ct = default)
        {
            long lStart = (long)Math.Round(startEpoch);
            long lEnd = (long)Math.Round(endEpoch);
            long? lSeek = seekEpoch.HasValue ? (long)Math.Round(seekEpoch.Value) : (long?)null;

            if (string.IsNullOrWhiteSpace(hostname) || lStart <= 0 || lEnd <= lStart)
            {
                Response.StatusCode = 400;
                return;
            }

            double safeSpeed = speed > 0 ? speed : 1.0;
            long effectiveStartEpoch = lSeek.HasValue && lSeek.Value >= lStart && lSeek.Value < lEnd
                ? lSeek.Value
                : lStart;

            DateTime rangeStartUtc = DateTimeOffset.FromUnixTimeMilliseconds(effectiveStartEpoch).UtcDateTime;
            DateTime rangeEndUtc = DateTimeOffset.FromUnixTimeMilliseconds(lEnd).UtcDateTime;

            // Retrieve relevant chunks from the requested seek point using fast DB indexing
            var chunks = await _storageScanner.GetChunksForStationAsync(hostname, rangeStartUtc.AddSeconds(-2), rangeEndUtc);

            if (!string.IsNullOrWhiteSpace(displayId))
            {
                var matching = chunks.Where(c => string.Equals(c.DisplayId, displayId, StringComparison.OrdinalIgnoreCase)).ToList();
                if (matching.Count > 0)
                {
                    chunks = matching;
                }
            }

            if (chunks == null || chunks.Count == 0)
            {
                Response.StatusCode = 204;
                return;
            }

            // Locate the exact chunk containing the current seek position
            var targetChunk = chunks.FirstOrDefault(c => rangeStartUtc >= c.StartUtc && rangeStartUtc <= c.EndUtc)
                              ?? chunks.FirstOrDefault(c => c.StartUtc >= rangeStartUtc)
                              ?? chunks.LastOrDefault();

            if (targetChunk == null || string.IsNullOrWhiteSpace(targetChunk.FullPath) || !System.IO.File.Exists(targetChunk.FullPath))
            {
                Response.StatusCode = 204;
                return;
            }

            double seekOffsetSec = Math.Max(0, (rangeStartUtc - targetChunk.StartUtc).TotalSeconds);
            double chunkDurationSec = Math.Max(1.0, (targetChunk.EndUtc - rangeStartUtc).TotalSeconds);

            string normalizedPath = targetChunk.FullPath.Replace('\\', '/');
            string ffmpegPath = _advancedExtractorService.ResolveFfmpegBinary();

            Response.ContentType = "video/mp4";
            Response.Headers.Append("X-Content-Type-Options", "nosniff");
            Response.Headers.Append("Cache-Control", "no-cache, no-store, must-revalidate");

            string codecArgs;
            if (Math.Abs(safeSpeed - 1.0) < 0.05)
            {
                // 1x Playback speed: direct stream copy with 0% CPU overhead and instant start
                codecArgs = "-c copy -avoid_negative_ts make_zero -movflags frag_keyframe+empty_moov+default_base_moof -f mp4 pipe:1";
            }
            else
            {
                string optimalEncoder = _advancedExtractorService.GetOptimalVideoEncoderArgs(zeroLatency: true);
                double ptsScale = 1.0 / safeSpeed;
                string ptsScaleStr = ptsScale.ToString("0.000", CultureInfo.InvariantCulture);
                int step = (int)Math.Round(safeSpeed);
                string vfFilter = step > 1 ? $"framestep={step},setpts={ptsScaleStr}*PTS" : $"setpts={ptsScaleStr}*PTS";

                codecArgs = $"-vf \"{vfFilter}\" -an {optimalEncoder} -avoid_negative_ts make_zero -movflags frag_keyframe+empty_moov+default_base_moof -f mp4 pipe:1";
            }

            // Minimal probe buffers and fast seeking for zero-latency playback startup
            string arguments = $"-nostdin -loglevel error -noautorotate -fflags +nobuffer+fastseek -probesize 65536 -analyzeduration 100000 " +
                               $"-ss {seekOffsetSec.ToString("0.000", CultureInfo.InvariantCulture)} " +
                               $"-i \"{normalizedPath}\" -t {chunkDurationSec.ToString("0.000", CultureInfo.InvariantCulture)} " +
                               $"-flush_packets 1 {codecArgs}";

            var startInfo = new ProcessStartInfo
            {
                FileName = ffmpegPath,
                Arguments = arguments,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var process = new Process { StartInfo = startInfo };
            using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(ct);

            try
            {
                process.Start();
                var stderrTask = process.StandardError.ReadToEndAsync(ct);

                byte[] buffer = new byte[32768];
                int bytesRead;
                var stdout = process.StandardOutput.BaseStream;

                while ((bytesRead = await stdout.ReadAsync(buffer, 0, buffer.Length, linkedCts.Token)) > 0)
                {
                    await Response.Body.WriteAsync(buffer.AsMemory(0, bytesRead), ct);
                    await Response.Body.FlushAsync(ct);
                }

                if (process.HasExited && process.ExitCode != 0)
                {
                    string err = await stderrTask;
                    _logger.LogWarning("[Stream:FFmpeg] Process exited with code {Code}: {Err}", process.ExitCode, err);
                }
            }
            catch (OperationCanceledException)
            {
                // Client stopped playback or scrubbed to another timestamp
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "[Stream:Error] Stream error for host {Host}", hostname);
            }
            finally
            {
                try
                {
                    if (!process.HasExited) process.Kill(true);
                }
                catch { }
            }
        }

        [HttpGet("spritesheet")]
        public async Task<IActionResult> GetSpritesheet(
            [FromQuery] string hostname,
            [FromQuery] double startEpoch,
            [FromQuery] double endEpoch,
            [FromQuery] int frameCount = 6,
            [FromQuery] int tileWidth = 100,
            [FromQuery] int tileHeight = 50,
            [FromQuery] string? displayId = null,
            CancellationToken ct = default)
        {
            long lStart = (long)Math.Round(startEpoch);
            long lEnd = (long)Math.Round(endEpoch);

            if (string.IsNullOrWhiteSpace(hostname)) return BadRequest("Hostname is required.");
            if (lStart >= lEnd) return BadRequest("Start time must be before end time.");

            try
            {
                var startUtc = DateTimeOffset.FromUnixTimeMilliseconds(lStart).UtcDateTime;
                var endUtc = DateTimeOffset.FromUnixTimeMilliseconds(lEnd).UtcDateTime;

                var imageStream = await _advancedExtractorService.GenerateSpritesheetAsync(
                    hostname, startUtc, endUtc, frameCount, tileWidth, tileHeight, ct, displayId);

                if (imageStream == null || imageStream == Stream.Null || imageStream.Length == 0)
                {
                    return NoContent();
                }

                Response.Headers.Append("Cache-Control", "public, max-age=86400, stale-while-revalidate=3600");
                return File(imageStream, "image/jpeg");
            }
            catch (OperationCanceledException)
            {
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to generate spritesheet for host {Host}", hostname);
                return StatusCode(500, "Error generating filmstrip.");
            }
        }

        [HttpGet("audio-waveform")]
        public async Task<IActionResult> GetAudioWaveform(
            [FromQuery] string stationId,
            [FromQuery] double startEpoch,
            [FromQuery] double endEpoch,
            [FromQuery] int points = 200,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(stationId)) return BadRequest("stationId is required.");
            stationId = stationId.Trim();
            if (stationId.StartsWith("live/", StringComparison.OrdinalIgnoreCase))
            {
                stationId = stationId.Substring(5);
            }

            long lStart = (long)Math.Round(startEpoch);
            long lEnd = (long)Math.Round(endEpoch);
            const long SecondsThreshold = 100_000_000_000L;
            if (lStart > 0 && lStart < SecondsThreshold) lStart *= 1000;
            if (lEnd > 0 && lEnd < SecondsThreshold) lEnd *= 1000;

            if (lEnd <= lStart) return BadRequest("Start time must be before end time.");

            try
            {
                DateTime startUtc = DateTimeOffset.FromUnixTimeMilliseconds(lStart).UtcDateTime;
                DateTime endUtc = DateTimeOffset.FromUnixTimeMilliseconds(lEnd).UtcDateTime;

                var peaks = await _advancedExtractorService.GenerateAudioWaveformAsync(
                    stationId, startUtc, endUtc, Math.Clamp(points, 20, 1000), ct);

                Response.Headers.Append("Cache-Control", "public, max-age=3600, stale-while-revalidate=600");
                return Ok(peaks);
            }
            catch (OperationCanceledException)
            {
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to generate audio waveform for station {StationId}", stationId);
                return StatusCode(500, "Error generating audio waveform.");
            }
        }
    }
}
