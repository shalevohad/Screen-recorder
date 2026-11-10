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
        /// Composition scope: "intra-station" (monitors of a station) or "inter-station" (between stations) or "canvas".
        /// </summary>
        public string CompositionScope { get; set; } = "intra-station";

        /// <summary>
        /// Whether Auto-Director switching is enabled (if false, stays locked to selected layout).
        /// </summary>
        public bool IsAutoDirectorEnabled { get; set; } = true;

        /// <summary>
        /// Director segments defining display switching schedule across timeline.
        /// </summary>
        public List<DirectorCutSegmentDto>? DirectorSegments { get; set; }

        /// <summary>
        /// Dynamic audio routing segments across the timeline defining which station provides audio for each interval.
        /// </summary>
        public List<AudioRoutingSegmentDto>? AudioRoutingSegments { get; set; }
    }

    public class AudioRoutingSegmentDto
    {
        [System.Text.Json.Serialization.JsonPropertyName("startEpochMs")]
        public long StartEpochMs { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("endEpochMs")]
        public long EndEpochMs { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("sourceStationId")]
        public string SourceStationId { get; set; } = string.Empty;

        [System.Text.Json.Serialization.JsonPropertyName("gain")]
        public double Gain { get; set; } = 1.0;
    }

    /// <summary>
    /// Represents a discrete segment in the Auto-Director switching plan.
    /// </summary>
    public class DirectorCutSegmentDto
    {
        public long StartEpochMs { get; set; }
        public long EndEpochMs { get; set; }
        public string TargetDisplayId { get; set; } = "mon-0";
        public int TargetDisplayNumber { get; set; } = 1;
        public string TargetDisplayName { get; set; } = "Screen 1";
        public bool IsManualOverride { get; set; } = false;
    }
}