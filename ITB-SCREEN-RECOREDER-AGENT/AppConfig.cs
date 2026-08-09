namespace ITBRecorderAgent.Core
{
    public class AppConfig
    {
        public string FFmpegPath { get; set; } = "ffmpeg.exe";
        public string RtmpServerBaseUrl { get; set; } = "rtmp://128.200.3.10:19350/live/";
        public string DashboardApiUrl { get; set; } = "http://128.200.3.10:8080/api/agent/telemetry";
        public int ReconnectDelaySeconds { get; set; } = 5;
        public int TargetFps { get; set; } = 30;
        public string VideoBitrate { get; set; } = "5M";
        public string VideoEncoder { get; set; } = "h264_nvenc";

        // 💡 הגדרת נתיב השמירה המקומי לאגירת אופליין
        public string LocalBufferPath { get; set; } = @"C:\ProgramData\ITB-SCREEN-RECORDER\Buffer";

        public bool EnableFileLogging { get; set; } = true;
        public string LogFilePath { get; set; } = string.Empty;
    }
}