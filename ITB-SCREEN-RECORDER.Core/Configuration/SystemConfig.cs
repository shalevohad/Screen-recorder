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
        [Range(15, 60, ErrorMessage = "DefaultTargetFps must be between 15 and 60.")]
        public int DefaultTargetFps { get; set; } = 30;
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

        /// <summary>
        /// אזור הזמן שכפוי על תהליך MediaMTX (קובע את שמות הקבצים וה-creation_time ב-Header)
        /// ברירת מחדל: UTC.
        /// </summary>
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

        /// <summary>
        /// פורמט הקלטת המדיה ב-MediaMTX (fmp4 או mpegts). ברירת מחדל: fmp4.
        /// </summary>
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