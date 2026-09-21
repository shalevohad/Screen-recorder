// ==========================================
// File: Features/ExtractorAdvanced/Models/AdvanceJobInfo.cs
// ==========================================
using System;
using System.Collections.Generic;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models
{
    public class AdvanceJobInfo : ExportJobInfo
    {
        public List<string> StationIds { get; set; } = new();
        public long InEpochMs { get; set; }
        public long OutEpochMs { get; set; }
        public string CutMode { get; set; } = "SynchronizedMultiTrack";
    }

    public class AdvanceCutRequestDto
    {
        public List<string> StationIds { get; set; } = new();
        public long InEpochMs { get; set; }
        public long OutEpochMs { get; set; }
    }

    public class SessionManifest
    {
        public string SessionId { get; set; } = string.Empty;
        public DateTime RangeStartUtc { get; set; }
        public DateTime RangeEndUtc { get; set; }
        public List<SessionTrackInfo> Tracks { get; set; } = new();
    }

    public class SessionTrackInfo
    {
        public string Hostname { get; set; } = string.Empty;
        public string VideoFileName { get; set; } = string.Empty;
        public double StartOffsetMs { get; set; } = 0;
        public double DurationMs { get; set; }
        public bool HasAudio { get; set; } = true;
    }
}