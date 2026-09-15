// ==========================================
// File: Features/ExtractorAdvanced/Models/TimelineSegment.cs
// ==========================================
namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;

public enum SegmentType
{
    Recorded,
    Gap,
    BlackFrame
}

public record TimelineSegment(
    Guid Id,
    long StartTimeMs,
    long EndTimeMs,
    SegmentType Type,
    string FilePath = ""
)
{
    public long DurationMs => EndTimeMs - StartTimeMs;
}