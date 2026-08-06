namespace ITBRecorderAgent.Core
{
    public class AppConfig
    {
        public string FFmpegPath { get; set; } = "ffmpeg.exe";
        public string RtmpServerBaseUrl { get; set; } = "rtmp://128.200.3.10:19350/live/";
        public string DashboardApiUrl { get; set; } = "";
        public int ReconnectDelaySeconds { get; set; } = 5;
        public int TargetFps { get; set; } = 30;
        public string VideoBitrate { get; set; } = "5M";
        public bool EnableFileLogging { get; set; } = true;
        public string LogFilePath { get; set; } = string.Empty;
    }
}