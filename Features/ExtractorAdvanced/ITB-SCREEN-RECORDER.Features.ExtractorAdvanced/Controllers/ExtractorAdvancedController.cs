// ==========================================
// File: Features/ExtractorAdvanced/Controllers/ExtractorAdvancedController.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Controllers
{
    [ApiController]
    [Route("api/v1/extractor-advanced")]
    public class ExtractorAdvancedController : ControllerBase
    {
        private readonly AdvancedExtractorService _advancedExtractorService;
        private readonly ILogger<ExtractorAdvancedController> _logger;
        private static readonly string BookmarksFilePath = Path.Combine(AppContext.BaseDirectory, "extractor_bookmarks.json");

        public ExtractorAdvancedController(
            AdvancedExtractorService advancedExtractorService,
            ILogger<ExtractorAdvancedController> logger)
        {
            _advancedExtractorService = advancedExtractorService;
            _logger = logger;
        }

        [HttpGet("stations")]
        public async Task<IActionResult> GetStations([FromQuery] long? startEpoch, [FromQuery] long? endEpoch)
        {
            await Task.CompletedTask;
            _logger.LogInformation("[API:Stations] Scanning storage for stations active between Epoch {Start} and {End}", startEpoch, endEpoch);

            try
            {
                // TODO: חיבור אמיתי ל-StorageScannerService מול תקיית האחסון
                var activeHosts = new List<string>
                {
                    "PC-01 (Main Operator)",
                    "PC-02 (Secondary Radar)",
                    "PC-03 (East Watchtower)",
                    "CCTV-Gate-North"
                };

                var stations = activeHosts.Select(host => new
                {
                    id = host.ToLower().Replace(" ", "-").Replace("(", "").Replace(")", ""),
                    hostname = host
                }).ToList();

                return Ok(stations);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[API:Stations] Failed to scan storage.");
                return StatusCode(500, "Error scanning storage directories.");
            }
        }

        // ==========================================
        // Bookmarks Endpoints
        // ==========================================
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
                bookmarks.Insert(0, newBookmark); // חדש ביותר למעלה

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

        [HttpGet("timeline/{stationId}")]
        public IActionResult GetStationTimeline(string stationId, [FromQuery] long startTimestamp, [FromQuery] long endTimestamp)
        {
            var segments = new List<TimelineSegment>
            {
                new TimelineSegment(Guid.NewGuid(), 0, 15000, SegmentType.Recorded, $"/media/{stationId}/part1.mp4"),
                new TimelineSegment(Guid.NewGuid(), 15000, 18500, SegmentType.Gap),
                new TimelineSegment(Guid.NewGuid(), 18500, 45000, SegmentType.Recorded, $"/media/{stationId}/part2.mp4")
            };

            return Ok(new { StationId = stationId, TotalDurationMs = 45000, Segments = segments });
        }

        [HttpGet("spritesheet")]
        public async Task<IActionResult> GetSpritesheet(
            [FromQuery] string hostname,
            [FromQuery] DateTime startUtc,
            [FromQuery] DateTime endUtc,
            [FromQuery] int frameCount = 10,
            [FromQuery] int tileWidth = 160,
            [FromQuery] int tileHeight = 90,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(hostname)) return BadRequest("Hostname is required.");
            if (startUtc >= endUtc) return BadRequest("Start time must be before end time.");

            try
            {
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

        public class SmartCutRequestDto
        {
            public string StationId { get; set; } = string.Empty;
            public long InEpochMs { get; set; }
            public long OutEpochMs { get; set; }
        }

        [HttpPost("export-cut")]
        public async Task<IActionResult> ExportCut([FromBody] SmartCutRequestDto request, CancellationToken ct)
        {
            if (request.OutEpochMs <= request.InEpochMs) return BadRequest("Out-point must be strictly greater than In-point.");

            var outputPath = await _advancedExtractorService.CutSegmentAsync(request.StationId, request.InEpochMs, request.OutEpochMs, ct);
            return Ok(new { success = true, filePath = outputPath });
        }
    }
}