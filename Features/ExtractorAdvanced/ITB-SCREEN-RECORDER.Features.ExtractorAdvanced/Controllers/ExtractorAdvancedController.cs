// ==========================================
// File: Features/ExtractorAdvanced/Controllers/ExtractorAdvancedController.cs
// ==========================================
using Microsoft.AspNetCore.Mvc;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Controllers;

[ApiController]
[Route("api/v1/extractor-advanced")]
public class ExtractorAdvancedController : ControllerBase
{
    [HttpGet("timeline/{stationId}")]
    public IActionResult GetStationTimeline(string stationId, [FromQuery] long startTimestamp, [FromQuery] long endTimestamp)
    {
        // TODO: בעתיד הקוד יקרא ל-Service שינתח את קובצי הווידאו האמיתיים מהדיסק.
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
}