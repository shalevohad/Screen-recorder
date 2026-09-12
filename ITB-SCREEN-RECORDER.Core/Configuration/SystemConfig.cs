using System.ComponentModel.DataAnnotations;

namespace ITB_SCREEN_RECORDER.Core.Configuration
{
    public class SystemConfig
    {
        public const string SectionName = "SystemConfig";

        [Range(1, 365, ErrorMessage = "RecordingRetentionDays must be between 1 and 365")]
        public int RecordingRetentionDays { get; set; }

        [Range(10, 100000)]
        public int MaxStorageQuotaGb { get; set; }

        [Range(500, 60000)]
        public int DashboardRefreshRateMs { get; set; }

        public string DisplayTimezone { get; set; } = "UTC";

        public string DisplayLocale { get; set; } = "en-US";

        // 💡 הגדרות תצוגת הדשבורד (זמני Snapshot ומכסת סטרים חי)
        public DashboardSettings Dashboard { get; set; } = new DashboardSettings();

        [Required]
        public MediaMtxSettings MediaMtx { get; set; } = null!;

        [Required]
        public StorageSettings Storage { get; set; } = null!;

        [Required]
        public SecuritySettings Security { get; set; } = null!;

        [Required]
        [RegularExpression(ConfigValidationRules.BitrateRegex, ErrorMessage = ConfigValidationRules.BitrateErrorMessage)]
        public string DefaultVideoBitrate { get; set; } = "2500K";

        [Required]
        [Range(10, 60, ErrorMessage = "DefaultTargetFps must be between 10 and 60.")]
        public int DefaultTargetFps { get; set; } = 20;
    }

    public class DashboardSettings
    {
        public int SnapshotMinDelayMs { get; set; } = 1500;
        public int SnapshotMaxDelayMs { get; set; } = 4500;
        public int SnapshotBufferMarginPx { get; set; } = 250;
        public int MaxConcurrentLiveStreams { get; set; } = 9;
    }

    public class MediaMtxSettings
    {
        [Required(ErrorMessage = "MediaMtx ExecutablePath is required in appsettings.json")]
        public string ExecutablePath { get; set; } = string.Empty;

        [Range(1024, 65535)]
        public int RtmpPort { get; set; }

        [Range(1024, 65535)]
        public int ApiPort { get; set; }

        [Range(1024, 65535)]
        public int HlsPort { get; set; }

        public string Timezone { get; set; } = "UTC";
    }

    public class StorageSettings
    {
        [Required(ErrorMessage = "NetAppUncPath is required in appsettings.json")]
        public string NetAppUncPath { get; set; } = string.Empty;

        [Required(ErrorMessage = "LocalFallbackPath is required in appsettings.json")]
        public string LocalFallbackPath { get; set; } = string.Empty;

        [Range(1, 60)]
        public int ChunkIntervalMinutes { get; set; }

        [Range(1, 365)]
        public int RetentionDays { get; set; }

        [Required(ErrorMessage = "ChunkEventLogPath is required in appsettings.json")]
        public string ChunkEventLogPath { get; set; } = string.Empty;

        public string RecordFormat { get; set; } = "fmp4";
    }

    public class SecuritySettings
    {
        [Required]
        public string AllowedAdAdminGroup { get; set; } = string.Empty;

        public string JwtSecretKey { get; set; } = string.Empty;

        [Range(1, 24)]
        public int TokenExpirationHours { get; set; }
    }

    public class StationOverride
    {
        public string? VideoBitrate { get; set; }
        public int? TargetFps { get; set; }
    }
}