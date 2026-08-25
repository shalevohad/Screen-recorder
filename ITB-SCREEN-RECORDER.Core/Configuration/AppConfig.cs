using System;
using System.IO;

namespace ITB_SCREEN_RECORDER.Core.Configuration
{
    public class AppConfig
    {
        // 1. שדה קונפיגורציה פשוט ונקי לחלוטין
        public string FFmpegPath { get; set; } = string.Empty;

        public string RtmpServerBaseUrl { get; set; } = "rtmp://128.200.3.10:19350/live/";
        public string DashboardApiUrl { get; set; } = "http://128.200.3.10:5090/api/v1/agent/telemetry";
        public int ReconnectDelaySeconds { get; set; } = 5;
        public int TargetFps { get; set; } = 30;
        public string VideoBitrate { get; set; } = "5M";
        public string VideoEncoder { get; set; } = "auto";

        public string LocalBufferPath { get; set; } = OperatingSystem.IsWindows()
            ? @"C:\ProgramData\ITB-SCREEN-RECORDER\Buffer"
            : "/var/lib/itb-screen-recorder/buffer";

        public bool AutoStartRecordingOnLaunch { get; set; } = false;
        public bool EnableFileLogging { get; set; } = true;

        public string LogFilePath { get; set; } = OperatingSystem.IsWindows()
            ? @"C:\ProgramData\ITB-SCREEN-RECORDER\Logs\Agent.log"
            : "/var/log/itb-screen-recorder/Agent.log";

        public int LogRetentionDays { get; set; } = 30;

        // 2. פונקציה מפורשת שה-Worker קורא לה כדי לוודא ש-FFmpeg קיים
        public string GetResolvedFFmpegPath()
        {
            string configuredPath = string.IsNullOrWhiteSpace(FFmpegPath) ? "ffmpeg" : FFmpegPath;

            if (Path.IsPathRooted(configuredPath))
            {
                if (OperatingSystem.IsWindows() && !configuredPath.EndsWith(".exe", StringComparison.OrdinalIgnoreCase))
                {
                    configuredPath += ".exe";
                }

                if (File.Exists(configuredPath))
                {
                    return configuredPath;
                }

                throw new FileNotFoundException($"CRITICAL: Custom FFmpeg executable not found at specified path: {configuredPath}");
            }

            string fileName = Path.GetFileName(configuredPath);

            if (OperatingSystem.IsWindows() && !fileName.EndsWith(".exe", StringComparison.OrdinalIgnoreCase))
            {
                fileName += ".exe";
            }

            string absolutePath = Path.Combine(AppContext.BaseDirectory, fileName);

            if (File.Exists(absolutePath))
            {
                return absolutePath;
            }

            throw new FileNotFoundException($"CRITICAL: FFmpeg executable is missing from the application root directory. Expected at: {absolutePath}");
        }
    }
}