// ==========================================
// File: Features/ExtractorAdvanced/Controllers/ExtractorAdvancedController.cs
// ==========================================
using System;
using System.Collections.Generic;
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

        public ExtractorAdvancedController(
            AdvancedExtractorService advancedExtractorService,
            ILogger<ExtractorAdvancedController> logger)
        {
            _advancedExtractorService = advancedExtractorService;
            _logger = logger;
        }

        [HttpGet("timeline/{stationId}")]
        public IActionResult GetStationTimeline(string stationId, [FromQuery] long startTimestamp, [FromQuery] long endTimestamp)
        {
            // TODO: בעתיד הקוד יקרא ל-GetPreviewAsync מה-Service וינתח את קובצי הווידאו האמיתיים מהדיסק.
            // כרגע אנחנו מחזירים Mock Data כדי שנוכל לבנות את ה-UI של ציר הזמן.

            var segments = new List<TimelineSegment>
            {
                new TimelineSegment(Guid.NewGuid(), 0, 15000, SegmentType.Recorded, $"/media/{stationId}/part1.mp4"),
                new TimelineSegment(Guid.NewGuid(), 15000, 18500, SegmentType.Gap), // פער של 3.5 שניות
                new TimelineSegment(Guid.NewGuid(), 18500, 45000, SegmentType.Recorded, $"/media/{stationId}/part2.mp4")
            }; 

            return Ok(new
            {
                StationId = stationId,
                
                TotalDurationMs = 45000,
                
                Segments = segments
            }); 
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
            if (string.IsNullOrWhiteSpace(hostname))
                return BadRequest("Hostname is required.");

            if (startUtc >= endUtc)
                return BadRequest("Start time must be before end time.");

            if (frameCount <= 0 || frameCount > 100)
                return BadRequest("Frame count must be between 1 and 100 to prevent server overload.");

            try
            {
                var imageStream = await _advancedExtractorService.GenerateSpritesheetAsync(
                    hostname,
                    startUtc,
                    endUtc,
                    frameCount,
                    tileWidth,
                    tileHeight,
                    ct);

                if (imageStream == null || imageStream.Length == 0)
                {
                    return NoContent();
                }

                return File(imageStream, "image/jpeg");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to generate spritesheet for host {Host}", hostname);
                return StatusCode(500, "An error occurred while generating the timeline filmstrip.");
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
            if (request.OutEpochMs <= request.InEpochMs)
            {
                return BadRequest("Out-point must be strictly greater than In-point.");
            }

            var outputPath = await _advancedExtractorService.CutSegmentAsync(
                request.StationId,
                request.InEpochMs,
                request.OutEpochMs,
                ct
            );

            return Ok(new { success = true, filePath = outputPath });
        }
    }
}