namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;

using System;

public class BookmarkInfo
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string StationId { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime StartUtc { get; set; }
    public DateTime EndUtc { get; set; }
    public string? Tags { get; set; }
    public string? CreatedBy { get; set; }
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

    public bool OverlapsWith(string stationId, DateTime rangeStart, DateTime rangeEnd)
    {
        return string.Equals(StationId, stationId, StringComparison.OrdinalIgnoreCase) &&
               StartUtc < rangeEnd &&
               EndUtc > rangeStart;
    }
}