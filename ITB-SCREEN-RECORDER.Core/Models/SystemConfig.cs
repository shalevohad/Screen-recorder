namespace ITB_SCREEN_RECORDER.Core.Models
{
    /// <summary>
    /// מודל התצורה הדינמית הטעון מקובץ appsettings.json.
    /// </summary>
    public class SystemConfig
    {
        public MediaMtxSettings MediaMtx { get; set; } = new();
        public StorageSettings Storage { get; set; } = new();
        public SecuritySettings Security { get; set; } = new();
    }

    public class MediaMtxSettings
    {
        public string ExecutablePath { get; set; } = @"C:\ITB-SCREEN-RECORDER\Binaries\mediamtx.exe";
        public int RtmpPort { get; set; } = 19350;
        public int ApiPort { get; set; } = 9997;
        public int HlsPort { get; set; } = 8888;
    }

    public class StorageSettings
    {
        public string NetAppUncPath { get; set; } = @"\\NetAppStorage\CaptureRecordings";
        public int ChunkIntervalMinutes { get; set; } = 15; // חיתוך לפי שעון קיר
        public int RetentionDays { get; set; } = 30;
    }

    public class SecuritySettings
    {
        public string AllowedAdAdminGroup { get; set; } = "C2_Admins";
        public string JwtSecretKey { get; set; } = string.Empty;
        public int TokenExpirationHours { get; set; } = 8;
    }
}