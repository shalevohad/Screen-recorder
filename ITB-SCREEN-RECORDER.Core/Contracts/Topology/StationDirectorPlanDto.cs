using System;
using System.Collections.Generic;

namespace ITB_SCREEN_RECORDER.Core.Contracts.Topology
{
    public enum DirectorTriggerReason
    {
        Default = 0,
        MouseClick = 1,
        Keystroke = 2,
        CursorActivity = 3,
        ManualOverride = 4
    }

    public enum ActivityEventType
    {
        MouseMove = 0,
        MouseClick = 1,
        Keystroke = 2
    }

    public class ActivityEventDto
    {
        public long TimestampEpochMs { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public ActivityEventType Type { get; set; }
        public string? Button { get; set; } // "Left", "Right", "Middle"
        public string? KeyName { get; set; }
    }

    public class StationDirectorSegmentDto
    {
        public long StartEpochMs { get; set; }
        public long EndEpochMs { get; set; }
        public string TargetDisplayId { get; set; } = "mon-0"; // "mon-0", "mon-1", etc.
        public bool IsManualOverride { get; set; }
        public DirectorTriggerReason TriggerReason { get; set; } = DirectorTriggerReason.Default;
        public double TransitionDurationSec { get; set; } = 0.3; // Default 300ms Dip-to-Black
    }

    public class StationDirectorPlanDto
    {
        public string StationId { get; set; } = string.Empty;
        public long TimelineStartEpochMs { get; set; }
        public long TimelineEndEpochMs { get; set; }
        public List<StationDirectorSegmentDto> Segments { get; set; } = new();
        public StationDisplayTopologyDto? Topology { get; set; }
    }
}
