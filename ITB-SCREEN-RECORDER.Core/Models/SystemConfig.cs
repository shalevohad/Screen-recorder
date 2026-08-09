using System.ComponentModel.DataAnnotations;

namespace ITB_SCREEN_RECORDER.Core.Models
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
    }

    public class StorageSettings
    {
        [Required(ErrorMessage = "NetAppUncPath is required in appsettings.json")]
        public string NetAppUncPath { get; set; } = string.Empty;

        [Range(1, 60)]
        public int ChunkIntervalMinutes { get; set; }

        [Range(1, 365)]
        public int RetentionDays { get; set; }
    }

    public class SecuritySettings
    {
        [Required]
        public string AllowedAdAdminGroup { get; set; } = string.Empty;

        public string JwtSecretKey { get; set; } = string.Empty;

        [Range(1, 24)]
        public int TokenExpirationHours { get; set; }
    }
}