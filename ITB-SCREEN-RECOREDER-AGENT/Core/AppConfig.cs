using System;
using System.IO;

namespace ITBRecorderAgent.Core
{
    public class AppConfig
    {
        public string FFmpegPath { get; set; } = OperatingSystem.IsWindows()
            ? @"C:\Program Files\FFMPEG\ffmpeg.exe"
            : "ffmpeg";

        public string RtmpServerBaseUrl { get; set; } = "rtmp://128.200.3.10:19350/live/";
        public string DashboardApiUrl { get; set; } = "http://128.200.3.10:8080/api/v1/agent/telemetry";
        public int ReconnectDelaySeconds { get; set; } = 5;
        public int TargetFps { get; set; } = 30;
        public string VideoBitrate { get; set; } = "5M";
        public string VideoEncoder { get; set; } = "auto";

        public string LocalBufferPath { get; set; } = OperatingSystem.IsWindows()
            ? @"C:\ProgramData\ITB-SCREEN-RECORDER\Buffer"
            : Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile), ".itb", "buffer");

        public bool AutoStartRecordingOnLaunch { get; set; } = false;
        public bool EnableFileLogging { get; set; } = true;

        public string LogFilePath { get; set; } = OperatingSystem.IsWindows()
            ? @"C:\ProgramData\ITB-SCREEN-RECORDER\Logs\Agent.log"
            : Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile), ".itb", "logs", "Agent.log");
    }
}