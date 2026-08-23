using System.ComponentModel.DataAnnotations;

namespace ITB_SCREEN_RECORDER.Server.Models
{
    // Editable subset of SystemConfig exposed through the Settings UI.
    // MediaMtx and Security are intentionally excluded (infra/secrets, not user-facing settings).
    public class SystemConfigDto
    {
        [Range(1, 365, ErrorMessage = "RecordingRetentionDays must be between 1 and 365")]
        public int RecordingRetentionDays { get; set; }

        [Range(10, 100000)]
        public int MaxStorageQuotaGb { get; set; }

        [Range(500, 60000)]
        public int DashboardRefreshRateMs { get; set; }

        [Required]
        [RegularExpression(@"^[1-5][Mm]$", ErrorMessage = "DefaultVideoBitrate must be between '1M' and '5M' (e.g., '5M').")]
        public string DefaultVideoBitrate { get; set; } = "5M";

        [Required]
        [Range(15, 60, ErrorMessage = "DefaultTargetFps must be between 15 and 60.")]
        public int DefaultTargetFps { get; set; } = 30;

        [Required]
        public StorageSettingsDto Storage { get; set; } = null!;
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
