// ==========================================
// File: Features/ExtractorAdvanced/Controllers/ExtractorAdvancedController.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Controllers
{
    [ApiController]
    [Route("api/v1/extractor-advanced")]
    public class ExtractorAdvancedController : ControllerBase
    {
        private readonly AdvancedExtractorService _advancedExtractorService;
        private readonly IStorageScannerService _storageScanner;
        private readonly ILogger<ExtractorAdvancedController> _logger;

        public ExtractorAdvancedController(
            AdvancedExtractorService advancedExtractorService,
            IStorageScannerService storageScanner,
            ILogger<ExtractorAdvancedController> logger)
        {
            _advancedExtractorService = advancedExtractorService;
            _storageScanner = storageScanner;
            _logger = logger;
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
                    : DateTime.UtcNow.AddHours(-4);

                DateTime endUtc = lEnd.HasValue && lEnd.Value > 0
                    ? DateTimeOffset.FromUnixTimeMilliseconds(lEnd.Value).UtcDateTime
                    : DateTime.UtcNow;

                var availableHosts = await _storageScanner.GetAvailableHostsAsync(startUtc, endUtc);
                var stations = new List<object>();

                foreach (var host in availableHosts)
                {
                    var chunks = await _storageScanner.GetChunksForStationAsync(host, startUtc, endUtc);
                    var realSegments = chunks
                        .Where(c => !string.IsNullOrEmpty(c.FullPath) && System.IO.File.Exists(c.FullPath))
                        .OrderBy(c => c.StartUtc)
                        .Select(c => new
                        {
                            startEpoch = new DateTimeOffset(c.StartUtc).ToUnixTimeMilliseconds(),
                            endEpoch = new DateTimeOffset(c.EndUtc).ToUnixTimeMilliseconds(),
                            startEpochMs = new DateTimeOffset(c.StartUtc).ToUnixTimeMilliseconds(),
                            endEpochMs = new DateTimeOffset(c.EndUtc).ToUnixTimeMilliseconds()
                        }).ToList();

                    stations.Add(new
                    {
                        id = host,
                        hostname = host,
                        displayName = host,
                        isOnline = true,
                        recordingsCount = realSegments.Count,
                        segments = realSegments
                    });
                }

                return Ok(stations);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:Stations] Failed scanning storage for stations.");
                return StatusCode(500, "Error scanning storage directories.");
            }
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
                var segmentsMap = new Dictionary<string, List<object>>();

                foreach (var stationId in stationList)
                {
                    var chunks = await _storageScanner.GetChunksForStationAsync(stationId, startUtc, endUtc);
                    await _advancedExtractorService.AdjustChunksToAccuratePtsAsync(chunks, ct);

                    var segList = new List<object>();
                    foreach (var chunk in chunks.Where(c => !string.IsNullOrEmpty(c.FullPath) && System.IO.File.Exists(c.FullPath)).OrderBy(c => c.StartUtc))
                    {
                        long sMs = new DateTimeOffset(chunk.StartUtc).ToUnixTimeMilliseconds();
                        long eMs = new DateTimeOffset(chunk.EndUtc).ToUnixTimeMilliseconds();

                        segList.Add(new
                        {
                            startEpoch = sMs,
                            endEpoch = eMs,
                            startEpochMs = sMs,
                            endEpochMs = eMs
                        });
                    }

                    segmentsMap[stationId] = segList;
                }

                return Ok(segmentsMap);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:TimelineSegments] Error fetching segments.");
                return StatusCode(500, "Failed to retrieve timeline segments.");
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

            long effectiveStartEpoch = lSeek.HasValue && lSeek.Value >= lStart && lSeek.Value < lEnd
                ? lSeek.Value
                : lStart;

            DateTime rangeStartUtc = DateTimeOffset.FromUnixTimeMilliseconds(effectiveStartEpoch).UtcDateTime;
            DateTime rangeEndUtc = DateTimeOffset.FromUnixTimeMilliseconds(lEnd).UtcDateTime;

            var chunks = await _storageScanner.GetChunksForStationAsync(hostname, rangeStartUtc, rangeEndUtc);
            await _advancedExtractorService.AdjustChunksToAccuratePtsAsync(chunks, ct);

            string manifestContent = await _storageScanner.BuildConcatManifestAsync(chunks, rangeStartUtc, rangeEndUtc);

            string tempManifestPath = Path.Combine(Path.GetTempPath(), $"stream_{hostname}_{Guid.NewGuid():N}.txt");
            await System.IO.File.WriteAllTextAsync(tempManifestPath, manifestContent, new System.Text.UTF8Encoding(false), ct);

            Response.ContentType = "video/mp4";
            Response.Headers.Append("X-Content-Type-Options", "nosniff");

            string ffmpegPath = _advancedExtractorService.ResolveFfmpegBinary();
            string arguments = $"-f concat -safe 0 -i \"{tempManifestPath.Replace('\\', '/')}\" " +
                               $"-c copy -movflags frag_keyframe+empty_moov+default_base_moof -f mp4 pipe:1";

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
                _logger.LogInformation("Client closed stream for {Host}", hostname);
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
            [FromQuery] int frameCount = 4,
            [FromQuery] int tileWidth = 120,
            [FromQuery] int tileHeight = 52,
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
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to generate spritesheet for host {Host}", hostname);
                return StatusCode(500, "Error generating filmstrip.");
            }
        }
    }
}