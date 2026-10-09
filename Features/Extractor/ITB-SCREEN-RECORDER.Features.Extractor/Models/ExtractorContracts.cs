// ==========================================
// File: Features/Extractor/Models/ExtractorContracts.cs
// ==========================================
using System;
using System.Collections.Generic;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Models
{
    public class ExtractionRequestDto
    {
        public DateTime StartTimeUtc { get; set; }
        public DateTime EndTimeUtc { get; set; }
        public List<string> Hostnames { get; set; } = new();
        public bool ExportRawChunks { get; set; } = false;

        // 💡 אופן הצגת המקשים בייצוא ה-TAR
        public KeystrokeExportMode KeystrokeMode { get; set; } = KeystrokeExportMode.Caption;
    }

    public class ExtractionPreviewResponseDto
    {
        public int TotalHostCount { get; set; }
        public int TotalChunkCount { get; set; }
        public long EstimatedTotalSizeBytes { get; set; }
        public TimeSpan TotalDuration { get; set; }
        public List<StationCoverageDto> Stations { get; set; } = new();
    }

    public class StationCoverageDto
    {
        public string Hostname { get; set; } = string.Empty;
        public int ChunkCount { get; set; }
        public long TotalSizeBytes { get; set; }
        public bool HasTimeGaps { get; set; }
        public List<TimeGapDto> Gaps { get; set; } = new();
    }

    public class TimeGapDto
    {
        public DateTime ExpectedUtc { get; set; }
        public DateTime ActualNextStartUtc { get; set; }
        public TimeSpan GapDuration => ActualNextStartUtc - ExpectedUtc;
    }

    public class RecordingChunkMetadata
    {
        public string FullPath { get; set; } = string.Empty;
        public string Hostname { get; set; } = string.Empty;
        public DateTime StartUtc { get; set; }
        public DateTime EndUtc { get; set; }
        public TimeSpan Duration => EndUtc - StartUtc;
        public long FileSizeBytes { get; set; }

        // נתוני מדיה הנשלפים ישירות מהאינדקס ב-DB (מונעים שימוש ב-FFprobe)
        public int Width { get; set; } = 1920;
        public int Height { get; set; } = 1080;
        public double Fps { get; set; } = 30.0;
        public bool HasAudio { get; set; } = true;
    }

    public class SessionManifest
    {
        public string SessionId { get; set; } = Guid.NewGuid().ToString("N");
        public DateTime ExportedAtUtc { get; set; } = DateTime.UtcNow;
        public DateTime RangeStartUtc { get; set; }
        public DateTime RangeEndUtc { get; set; }
        public List<SessionTrackInfo> Tracks { get; set; } = new();
    }

    public class SessionTrackInfo
    {
        public string Hostname { get; set; } = string.Empty;
        public string VideoFileName { get; set; } = string.Empty;
        public double StartOffsetMs { get; set; }
        public double DurationMs { get; set; }
        public bool HasAudio { get; set; }
    }
}