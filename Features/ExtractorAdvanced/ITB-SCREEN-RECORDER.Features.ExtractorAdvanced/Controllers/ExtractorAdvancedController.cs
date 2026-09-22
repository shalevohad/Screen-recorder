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
            [FromQuery] long? startEpoch,
            [FromQuery] long? endEpoch,
            [FromQuery] string? timeMode = "LOCAL")
        {
            try
            {
                DateTime startUtc = startEpoch.HasValue && startEpoch.Value > 0
                    ? DateTimeOffset.FromUnixTimeMilliseconds(startEpoch.Value).UtcDateTime
                    : DateTime.UtcNow.AddHours(-4);

                DateTime endUtc = endEpoch.HasValue && endEpoch.Value > 0
                    ? DateTimeOffset.FromUnixTimeMilliseconds(endEpoch.Value).UtcDateTime
                    : DateTime.UtcNow;

                var availableHosts = await _storageScanner.GetAvailableHostsAsync(startUtc, endUtc);
                var stations = availableHosts.Select(host => new
                {
                    id = host,
                    hostname = host,
                    displayName = host,
                    isOnline = true,
                    recordingsCount = 0
                }).ToList();

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
            [FromQuery] long startEpoch,
            [FromQuery] long endEpoch,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(stations) || startEpoch <= 0 || endEpoch <= startEpoch)
            {
                return BadRequest("Invalid stations or epoch parameters.");
            }

            try
            {
                DateTime startUtc = DateTimeOffset.FromUnixTimeMilliseconds(startEpoch).UtcDateTime;
                DateTime endUtc = DateTimeOffset.FromUnixTimeMilliseconds(endEpoch).UtcDateTime;

                var stationList = stations.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
                var segmentsMap = new Dictionary<string, List<object>>();

                foreach (var stationId in stationList)
                {
                    var chunks = await _storageScanner.GetChunksForStationAsync(stationId, startUtc, endUtc);
                    await _advancedExtractorService.AdjustChunksToAccuratePtsAsync(chunks, ct);

                    var segList = new List<object>();
                    foreach (var chunk in chunks.OrderBy(c => c.StartUtc))
                    {
                        segList.Add(new
                        {
                            startEpoch = new DateTimeOffset(chunk.StartUtc).ToUnixTimeMilliseconds(),
                            endEpoch = new DateTimeOffset(chunk.EndUtc).ToUnixTimeMilliseconds()
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
            [FromQuery] long epochMs,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(hostname) || epochMs <= 0)
            {
                return BadRequest("Hostname and valid epochMs are required.");
            }

            try
            {
                var metadata = await _advancedExtractorService.GetStreamMetadataAsync(hostname, epochMs, ct);
                return Ok(metadata);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:StreamMetadata] Failed retrieving metadata for {Host} at {Epoch}", hostname, epochMs);
                return StatusCode(500, "Error retrieving stream metadata.");
            }
        }

        [HttpGet("frame")]
        public async Task<IActionResult> GetStationFrame(
            [FromQuery] string hostname,
            [FromQuery] long epochMs,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(hostname) || epochMs <= 0)
            {
                return BadRequest("Hostname and valid epochMs are required.");
            }

            try
            {
                var imageStream = await _advancedExtractorService.ExtractFrameAsync(hostname, epochMs, ct);
                if (imageStream == null || imageStream == Stream.Null || imageStream.Length == 0)
                {
                    return NoContent();
                }

                return File(imageStream, "image/jpeg");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:Frame] Failed extracting frame for {Host} at {Epoch}", hostname, epochMs);
                return StatusCode(500, "Error extracting frame.");
            }
        }

        [HttpGet("stream")]
        public async Task StreamContinuousStationVideo(
            [FromQuery] string hostname,
            [FromQuery] long startEpoch,
            [FromQuery] long endEpoch,
            [FromQuery] long? seekEpoch = null,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(hostname) || startEpoch <= 0 || endEpoch <= startEpoch)
            {
                Response.StatusCode = 400;
                return;
            }

            long effectiveStartEpoch = seekEpoch.HasValue && seekEpoch.Value >= startEpoch && seekEpoch.Value < endEpoch
                ? seekEpoch.Value
                : startEpoch;

            DateTime rangeStartUtc = DateTimeOffset.FromUnixTimeMilliseconds(effectiveStartEpoch).UtcDateTime;
            DateTime rangeEndUtc = DateTimeOffset.FromUnixTimeMilliseconds(endEpoch).UtcDateTime;

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
            [FromQuery] long startEpoch,
            [FromQuery] long endEpoch,
            [FromQuery] int frameCount = 4,
            [FromQuery] int tileWidth = 120,
            [FromQuery] int tileHeight = 52,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(hostname)) return BadRequest("Hostname is required.");
            if (startEpoch >= endEpoch) return BadRequest("Start time must be before end time.");

            try
            {
                var startUtc = DateTimeOffset.FromUnixTimeMilliseconds(startEpoch).UtcDateTime;
                var endUtc = DateTimeOffset.FromUnixTimeMilliseconds(endEpoch).UtcDateTime;

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