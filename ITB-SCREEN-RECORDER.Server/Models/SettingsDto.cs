using ITB_SCREEN_RECORDER.Core.Configuration;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ITB_SCREEN_RECORDER.Server.Models
{
    public class SystemConfigDto
    {
        [Range(1, 365, ErrorMessage = "RecordingRetentionDays must be between 1 and 365")]
        public int RecordingRetentionDays { get; set; }

        [Range(10, 100000)]
        public int MaxStorageQuotaGb { get; set; }

        [Range(500, 60000)]
        public int DashboardRefreshRateMs { get; set; }

        [Required]
        [RegularExpression(ConfigValidationRules.BitrateRegex, ErrorMessage = ConfigValidationRules.BitrateErrorMessage)]
        public string DefaultVideoBitrate { get; set; } = "2500k";

        [Required]
        [Range(10, 60, ErrorMessage = "DefaultTargetFps must be between 10 and 60.")]
        public int DefaultTargetFps { get; set; } = 20;

        public string DisplayTimezone { get; set; } = "Asia/Jerusalem";

        public string DisplayLocale { get; set; } = "en-US";

        [Required]
        public StorageSettingsDto Storage { get; set; } = null!;

        // 💡 הוספת הגדרות ה-Dashboard הכוללות את הטאבים ל-DTO
        public DashboardSettingsDto Dashboard { get; set; } = new DashboardSettingsDto();
    }

    public class DashboardSettingsDto
    {
        public int SnapshotMinDelayMs { get; set; } = 1500;
        public int SnapshotMaxDelayMs { get; set; } = 4500;
        public int SnapshotBufferMarginPx { get; set; } = 250;
        public int MaxConcurrentLiveStreams { get; set; } = 9;

        // 💡 רשימת הטאבים שלנו
        public List<FleetTabDto> FleetTabs { get; set; } = new List<FleetTabDto>();
    }

    public class FleetTabDto
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public List<string> AssignedHostnames { get; set; } = new List<string>();
        public List<string> AssignedOus { get; set; } = new List<string>();
        public int? DefaultBitrate { get; set; }
        public int? DefaultFps { get; set; }
    }

    public class StorageSettingsDto
    {
        [Required(ErrorMessage = "NetAppUncPath is required")]
        public string NetAppUncPath { get; set; } = string.Empty;

        [Required(ErrorMessage = "LocalFallbackPath is required")]
        public string LocalFallbackPath { get; set; } = string.Empty;

        [Range(1, 60)]
        public int ChunkIntervalMinutes { get; set; }

        [Range(1, 365)]
        public int RetentionDays { get; set; }

        [Required(ErrorMessage = "ChunkEventLogPath is required")]
        public string ChunkEventLogPath { get; set; } = string.Empty;
    }
}