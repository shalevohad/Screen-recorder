// ==========================================
// File: Features/ExtractorAdvanced/Controllers/ExtractorAdvancedController.cs
// ==========================================
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

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
        private readonly ILogger<ExtractorAdvancedController> _logger;

        public ExtractorAdvancedController(
            AdvancedExtractorService advancedExtractorService,
            IStorageScannerService storageScanner,
            IAdvanceJobManager jobManager,
            IKeystrokeRepository keystrokeRepository,
            ILogger<ExtractorAdvancedController> logger)
        {
            _advancedExtractorService = advancedExtractorService;
            _storageScanner = storageScanner;
            _jobManager = jobManager;
            _keystrokeRepository = keystrokeRepository;
            _logger = logger;
        }

        // 💡 שליפת אירועי המקלדת עבור ה-Timeline Ruler דרך IKeystrokeRepository מ-Core
        [HttpGet("keystrokes")]
        public async Task<IActionResult> GetKeystrokes(
            [FromQuery] string stationId,
            [FromQuery] double startEpoch,
            [FromQuery] double endEpoch,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(stationId))
            {
                return BadRequest("stationId is required.");
            }

            stationId = stationId.Trim();

            long lStart = (long)Math.Round(startEpoch);
            long lEnd = (long)Math.Round(endEpoch);

            // 💡 Auto-Detection: אם חותמת הזמן הועברה בשניות (10 ספרות), נמיר אוטומטית למילישניות
            const long SecondsThreshold = 100_000_000_000L;
            if (lStart > 0 && lStart < SecondsThreshold) lStart *= 1000;
            if (lEnd > 0 && lEnd < SecondsThreshold) lEnd *= 1000;

            if (lEnd <= lStart)
            {
                return BadRequest("Invalid epoch window: endEpoch must be strictly greater than startEpoch.");
            }

            // 💡 הגנת זיכרון: הגבלת חלון השאילתה המקסימלי (למשל: עד 48 שעות לבקשה בודדת)
            const long MaxWindowMs = 48L * 60 * 60 * 1000;
            if (lEnd - lStart > MaxWindowMs)
            {
                return BadRequest("Requested time window exceeds maximum allowed limit (48 hours).");
            }

            try
            {
                var events = await _keystrokeRepository.GetKeystrokesForWindowAsync(stationId, lStart, lEnd);
                return Ok(events);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:Keystrokes] Failed fetching keystrokes for station {Station} ({Start}..{End})", stationId, lStart, lEnd);
                return StatusCode(500, "Error retrieving keystrokes.");
            }
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
                var stationDtos = new List<object>();

                foreach (var host in availableHosts)
                {
                    ct.ThrowIfCancellationRequested();

                    var chunks = await _storageScanner.GetChunksForStationAsync(host, startUtc, endUtc);
                    var sample = chunks.LastOrDefault();

                    int width = sample?.Width ?? 1920;
                    int height = sample?.Height ?? 1080;
                    double fps = sample?.Fps ?? 30.0;
                    bool hasAudio = sample?.HasAudio ?? true;

                    string resLabel = FormatResolution(width, height);
                    string fpsLabel = $"{Math.Round(fps)}fps";
                    string feedSpec = $"{resLabel} • {fpsLabel}";

                    stationDtos.Add(new
                    {
                        id = host,
                        hostname = host,
                        displayName = host,
                        isOnline = true,
                        recordingsCount = chunks.Count,
                        segments = Array.Empty<object>(),
                        hasAudio = hasAudio,
                        audioCodec = "AAC",
                        audioChannels = 2,
                        audioLabel = hasAudio ? "AAC" : "NONE",
                        width = width,
                        height = height,
                        fps = fps,
                        isVfr = false,
                        resolution = resLabel,
                        feedSpec = feedSpec
                    });
                }

                return Ok(stationDtos.OrderBy(s => ((dynamic)s).hostname).ToList());
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
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:Estimate] Error estimating timeline cut");
                return StatusCode(500, new { message = "Failed to calculate cut estimation." });
            }
        }

        [HttpPost("cut")]
        public IActionResult EnqueueAdvanceCutJob([FromBody] AdvanceCutRequestDto request)
        {
            try
            {
                var job = _jobManager.EnqueueAdvanceCutJob(request);
                return Accepted(new { jobId = job.JobId, fileName = job.FileName, status = job.Status });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:Cut] Error enqueuing advance cut job");
                return StatusCode(500, new { message = "Failed to start extraction job." });
            }
        }

        [HttpGet("stream-metadata")]
        public async Task<IActionResult> GetStreamMetadata(
            [FromQuery] string hostname,
            [FromQuery] double epochMs,
            CancellationToken ct = default)
        {
            long lEpoch = (long)Math.Round(epochMs);
            if (string.IsNullOrWhiteSpace(hostname) || lEpoch <= 0)
            {
                return BadRequest("Hostname and valid epochMs are required.");
            }

            try
            {
                var metadata = await _advancedExtractorService.GetStreamMetadataAsync(hostname, lEpoch, ct);
                return Ok(metadata);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:StreamMetadata] Failed retrieving metadata for {Host} at {Epoch}", hostname, lEpoch);
                return StatusCode(500, "Error retrieving stream metadata.");
            }
        }

        [HttpGet("frame")]
        public async Task<IActionResult> GetStationFrame(
            [FromQuery] string hostname,
            [FromQuery] double epochMs,
            CancellationToken ct = default)
        {
            long lEpoch = (long)Math.Round(epochMs);
            if (string.IsNullOrWhiteSpace(hostname) || lEpoch <= 0)
            {
                return BadRequest("Hostname and valid epochMs are required.");
            }

            try
            {
                var imageStream = await _advancedExtractorService.ExtractFrameAsync(hostname, lEpoch, ct);
                if (imageStream == null || imageStream == Stream.Null || imageStream.Length == 0)
                {
                    return NoContent();
                }

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

        [HttpGet("stream")]
        public async Task StreamContinuousStationVideo(
            [FromQuery] string hostname,
            [FromQuery] double startEpoch,
            [FromQuery] double endEpoch,
            [FromQuery] double? seekEpoch = null,
            [FromQuery] double speed = 1.0,
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

            var chunks = await _storageScanner.GetChunksForStationAsync(hostname, rangeStartUtc, rangeEndUtc);

            if (chunks == null || chunks.Count == 0)
            {
                Response.StatusCode = 204;
                return;
            }

            string manifestContent = await _storageScanner.BuildConcatManifestAsync(chunks, rangeStartUtc, rangeEndUtc);

            string tempManifestPath = Path.Combine(Path.GetTempPath(), $"stream_{hostname}_{Guid.NewGuid():N}.txt");
            await System.IO.File.WriteAllTextAsync(tempManifestPath, manifestContent, new System.Text.UTF8Encoding(false), ct);

            Response.ContentType = "video/mp4";
            Response.Headers.Append("X-Content-Type-Options", "nosniff");

            string ffmpegPath = _advancedExtractorService.ResolveFfmpegBinary();
            string arguments;

            if (Math.Abs(safeSpeed - 1.0) < 0.05)
            {
                arguments = $"-nostdin -loglevel error -fflags +genpts -f concat -safe 0 -i \"{tempManifestPath.Replace('\\', '/')}\" " +
                            $"-c copy -avoid_negative_ts make_zero -movflags frag_keyframe+empty_moov+default_base_moof -f mp4 pipe:1";
            }
            else
            {
                int step = (int)Math.Round(safeSpeed);
                double ptsScale = 1.0 / safeSpeed;
                string ptsScaleStr = ptsScale.ToString("0.000", System.Globalization.CultureInfo.InvariantCulture);

                string vfFilter = step > 1
                    ? $"framestep={step},setpts={ptsScaleStr}*PTS"
                    : $"setpts={ptsScaleStr}*PTS";

                arguments = $"-nostdin -loglevel error -fflags +genpts -flush_packets 1 -f concat -safe 0 -i \"{tempManifestPath.Replace('\\', '/')}\" " +
                            $"-vf \"{vfFilter}\" -an -c:v libx264 -preset ultrafast -tune zerolatency -pix_fmt yuv420p " +
                            $"-avoid_negative_ts make_zero -movflags frag_keyframe+empty_moov+default_base_moof -f mp4 pipe:1";
            }

            var startInfo = new ProcessStartInfo
            {
                FileName = ffmpegPath,
                Arguments = arguments,
                RedirectStandardOutput = true,
                RedirectStandardError = false,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var process = new Process { StartInfo = startInfo };
            try
            {
                process.Start();
                await process.StandardOutput.BaseStream.CopyToAsync(Response.Body, 81920, ct);
                await Response.Body.FlushAsync(ct);
            }
            catch (OperationCanceledException)
            {
                _logger.LogInformation("[Stream:Stop] Client closed stream for {Host}", hostname);
            }
            finally
            {
                try { if (!process.HasExited) process.Kill(true); } catch { }
                if (System.IO.File.Exists(tempManifestPath))
                {
                    try { System.IO.File.Delete(tempManifestPath); } catch { }
                }
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
                    hostname, startUtc, endUtc, frameCount, tileWidth, tileHeight, ct);

                if (imageStream == null || imageStream == Stream.Null || imageStream.Length == 0)
                {
                    return NoContent();
                }

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
    }
}