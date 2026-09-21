// ==========================================
// File: Features/Extractor/Models/ExportJobInfo.cs
// ==========================================
using System;
using System.Text.Json.Serialization;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Models
{
    public class ExportJobInfo
    {
        public string JobId { get; set; } = Guid.NewGuid().ToString("N");
        public virtual string FileName { get; set; } = string.Empty;
        public virtual string Status { get; set; } = "Queued";
        public virtual int ProgressPercent { get; set; }
        public virtual string StatusMessage { get; set; } = "Queued...";
        public virtual double SpeedMBps { get; set; }
        public virtual int EtaSeconds { get; set; }
        public virtual long FileSizeBytes { get; set; }
        public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
        public virtual DateTime? CompletedAtUtc { get; set; }
        public virtual string? ErrorMessage { get; set; }
        public virtual string? OutputFilePath { get; set; }
        public virtual string NetworkFolderPath { get; set; } = string.Empty;

        public virtual int DownloadCount { get; set; } = 0;
        public virtual bool IsBookmarked { get; set; } = false;

        [JsonIgnore]
        public ExtractionRequestDto? Request { get; set; }

        public virtual bool IsCompleted => Status == "Completed";
        public virtual bool IsFailed => Status == "Failed";
    }
}