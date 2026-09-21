// ==========================================
// File: Features/ExtractorAdvanced/Controllers/ExtractorAdvancedController.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
        private readonly IAdvanceJobManager _advanceJobManager;
        private readonly ILogger<ExtractorAdvancedController> _logger;
        private static readonly string BookmarksFilePath = Path.Combine(AppContext.BaseDirectory, "extractor_bookmarks.json");

        public ExtractorAdvancedController(
            AdvancedExtractorService advancedExtractorService,
            IStorageScannerService storageScanner,
            IAdvanceJobManager advanceJobManager,
            ILogger<ExtractorAdvancedController> logger)
        {
            _advancedExtractorService = advancedExtractorService;
            _storageScanner = storageScanner;
            _advanceJobManager = advanceJobManager;
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

                _logger.LogInformation("[API:Stations] Scanning storage for stations between {StartUtc} and {EndUtc} UTC", startUtc, endUtc);

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
                // העברת ה-epochMs ישירות ללא שגיאת התאמת טיפוסים
                var imageStream = await _advancedExtractorService.ExtractFrameAsync(hostname, epochMs, ct);

                if (imageStream == null || imageStream.Length == 0)
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
            string manifestContent = await _storageScanner.BuildConcatManifestAsync(chunks, rangeStartUtc, rangeEndUtc);

            string tempManifestPath = Path.Combine(Path.GetTempPath(), $"stream_{hostname}_{Guid.NewGuid():N}.txt");
            await System.IO.File.WriteAllTextAsync(tempManifestPath, manifestContent, new System.Text.UTF8Encoding(false), ct);

            Response.ContentType = "video/mp4";
            Response.Headers.Append("X-Content-Type-Options", "nosniff");

            string ffmpegPath = OperatingSystem.IsWindows() ? "ffmpeg.exe" : "ffmpeg";
            string arguments = $"-f concat -safe 0 -i \"{tempManifestPath.Replace('\\', '/')}\" " +
                               $"-c copy -movflags frag_keyframe+empty_moov+default_base_moof -f mp4 pipe:1";

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
            [FromQuery] int frameCount = 10,
            [FromQuery] int tileWidth = 160,
            [FromQuery] int tileHeight = 90,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(hostname)) return BadRequest("Hostname is required.");
            if (startEpoch >= endEpoch) return BadRequest("Start time must be before end time.");

            try
            {
                var startUtc = DateTimeOffset.FromUnixTimeMilliseconds(startEpoch).UtcDateTime;
                var endUtc = DateTimeOffset.FromUnixTimeMilliseconds(endEpoch).UtcDateTime;

                var imageStream = await _advancedExtractorService.GenerateSpritesheetAsync(hostname, startUtc, endUtc, frameCount, tileWidth, tileHeight, ct);
                if (imageStream == null || imageStream.Length == 0) return NoContent();
                return File(imageStream, "image/jpeg");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to generate spritesheet for host {Host}", hostname);
                return StatusCode(500, "Error generating filmstrip.");
            }
        }

        [HttpPost("jobs")]
        public IActionResult StartAdvanceExportJob([FromBody] AdvanceCutRequestDto request)
        {
            if (request.StationIds == null || request.StationIds.Count == 0 || request.OutEpochMs <= request.InEpochMs)
            {
                return BadRequest(new { error = "Invalid station selection or In/Out time parameters." });
            }

            var job = _advanceJobManager.EnqueueAdvanceCutJob(request);
            return Accepted(new
            {
                jobId = job.JobId,
                fileName = job.FileName,
                status = job.Status,
                message = "Background synchronized export queued"
            });
        }

        [HttpGet("bookmarks")]
        public IActionResult GetBookmarks()
        {
            try
            {
                if (!System.IO.File.Exists(BookmarksFilePath))
                    return Ok(new List<InvestigationBookmarkDto>());

                var json = System.IO.File.ReadAllText(BookmarksFilePath);
                var bookmarks = JsonSerializer.Deserialize<List<InvestigationBookmarkDto>>(json) ?? new();
                return Ok(bookmarks);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:Bookmarks] Failed to load bookmarks.");
                return StatusCode(500, "Failed to load bookmarks.");
            }
        }

        [HttpPost("bookmarks")]
        public IActionResult SaveBookmark([FromBody] InvestigationBookmarkDto newBookmark)
        {
            try
            {
                var bookmarks = new List<InvestigationBookmarkDto>();
                if (System.IO.File.Exists(BookmarksFilePath))
                {
                    var existingJson = System.IO.File.ReadAllText(BookmarksFilePath);
                    bookmarks = JsonSerializer.Deserialize<List<InvestigationBookmarkDto>>(existingJson) ?? new();
                }

                newBookmark.Id = Guid.NewGuid().ToString();
                newBookmark.CreatedAt = DateTime.UtcNow;
                bookmarks.Insert(0, newBookmark);

                System.IO.File.WriteAllText(BookmarksFilePath, JsonSerializer.Serialize(bookmarks, new JsonSerializerOptions { WriteIndented = true }));
                _logger.LogInformation("[API:Bookmarks] Bookmark saved successfully: {Title}", newBookmark.Title);

                return Ok(new { success = true, bookmark = newBookmark });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:Bookmarks] Failed to save bookmark.");
                return StatusCode(500, "Failed to save bookmark.");
            }
        }

        public class InvestigationBookmarkDto
        {
            public string Id { get; set; } = string.Empty;
            public string Title { get; set; } = string.Empty;
            public string StartTime { get; set; } = string.Empty;
            public string EndTime { get; set; } = string.Empty;
            public long PlayheadMs { get; set; }
            public long InPointMs { get; set; }
            public long OutPointMs { get; set; }
            public List<string> StationIds { get; set; } = new();
            public DateTime CreatedAt { get; set; }
        }
    }
}