// ==========================================
// File: Server/Models/StorageTelemetryDto.cs
// ==========================================
using System;

namespace ITB_SCREEN_RECORDER.Server.Models
{
    public class StorageTelemetryDto
    {
        public string StoragePath { get; set; } = string.Empty;
        public string PrimaryPath { get; set; } = string.Empty;
        public string StorageLabel { get; set; } = "STORAGE POOL";

        public bool IsConfigured { get; set; }
        public bool IsAccessible { get; set; }

        // Indicates whether the storage subsystem is actively operating on the local fallback path instead of primary UNC storage
        public bool IsFallbackActive { get; set; }

        public long TotalSizeBytes { get; set; }
        public long FreeSizeBytes { get; set; }
        public long UsedSizeBytes { get; set; }

        public double UsedPercent { get; set; }
        public double FreePercent { get; set; }
        public double CurrentIops { get; set; }

        public DateTime SampledAtUtc { get; set; } = DateTime.UtcNow;
    }
}