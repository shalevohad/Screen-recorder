// ==========================================
// File: Features/Extractor/Models/SynchronizationPlanModels.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Linq;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Models
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

        /// <summary>
        /// Keystroke presentation export mode for forensic rendering (None / Caption / BurnIn).
        /// </summary>
        public KeystrokeExportMode KeystrokeMode { get; set; } = KeystrokeExportMode.BurnIn;

        /// <summary>
        /// Multi-display layout mode: "director" (Auto-Director / cut switching), "split" (Side-by-Side), "pip" (Picture-in-Picture), or specific display ID ("mon-0", "mon-1").
        /// </summary>
        public string LayoutMode { get; set; } = "director";

        /// <summary>
        /// Specific target display if solo export is selected (e.g. "mon-0", "mon-1").
        /// </summary>
        public string? TargetDisplayId { get; set; }

        /// <summary>
        /// Whether Picture-in-Picture main and inset displays are swapped.
        /// </summary>
        public bool IsPipSwapped { get; set; } = false;

        /// <summary>
        /// Director segments defining display switching schedule across timeline.
        /// </summary>
        public List<DirectorCutSegmentDto>? DirectorSegments { get; set; }
    }

    /// <summary>
    /// Represents a discrete segment in the Auto-Director switching plan.
    /// </summary>
    public class DirectorCutSegmentDto
    {
        public long StartEpochMs { get; set; }
        public long EndEpochMs { get; set; }
        public string TargetDisplayId { get; set; } = "mon-0";
        public bool IsManualOverride { get; set; } = false;
    }
}