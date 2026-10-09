// ==========================================
// File: Features/ExtractorAdvanced/Models/SynchronizationPlanModels.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Linq;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models
{
    public class TimeInterval
    {
        public DateTime StartUtc { get; set; }
        public DateTime EndUtc { get; set; }
        public double DurationSeconds => Math.Max(0, (EndUtc - StartUtc).TotalSeconds);
    }

    public class GlobalGapRecord
    {
        public int GapIndex { get; set; }
        public DateTime StartUtc { get; set; }
        public DateTime EndUtc { get; set; }
        public double SkippedDurationSeconds { get; set; }
        public double TimelineOffsetSeconds { get; set; }
    }

    public class StationGapRecord
    {
        public string StationId { get; set; } = string.Empty;
        public DateTime StartUtc { get; set; }
        public DateTime EndUtc { get; set; }
        public double DurationSeconds { get; set; }
    }

    public class SynchronizationPlan
    {
        public List<TimeInterval> ActiveSegments { get; set; } = new();
        public List<GlobalGapRecord> RemovedGlobalGaps { get; set; } = new();
        public List<StationGapRecord> StationGaps { get; set; } = new();
        public double TotalActiveSeconds => ActiveSegments.Sum(s => s.DurationSeconds);

        // 💡 אופן הצגת המקשים בחיתוך הסופי (None / Caption / BurnIn)
        public KeystrokeExportMode KeystrokeMode { get; set; } = KeystrokeExportMode.Caption;
    }
}