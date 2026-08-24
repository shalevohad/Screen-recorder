using System;
using System.IO;

namespace ITB_SCREEN_RECORDER.Core.Configuration
{
    public class AppConfig
    {
        private string _ffmpegPath = string.Empty;

        public string FFmpegPath
        {
            get
            {
                if (string.IsNullOrEmpty(_ffmpegPath))
                {
                    _ffmpegPath = ResolveFFmpegPath();
                }
                return _ffmpegPath;
            }
            set { _ffmpegPath = value; }
        }

        public string RtmpServerBaseUrl { get; set; } = "rtmp://128.200.3.10:19350/live/";
        public string DashboardApiUrl { get; set; } = "http://128.200.3.10:5090/api/v1/agent/telemetry";
        public int ReconnectDelaySeconds { get; set; } = 5;
        public int TargetFps { get; set; } = 30;
        public string VideoBitrate { get; set; } = "2M";
        public string VideoEncoder { get; set; } = "auto";

        // עדכון נתיבים ללינוקס: שימוש בתיקיות מערכת סטנדרטיות לשירותים במקום UserProfile
        public string LocalBufferPath { get; set; } = OperatingSystem.IsWindows()
            ? @"C:\ProgramData\ITB-SCREEN-RECORDER\Buffer"
            : "/var/lib/itb-screen-recorder/buffer";

        public bool AutoStartRecordingOnLaunch { get; set; } = false;
        public bool EnableFileLogging { get; set; } = true;

        // עדכון נתיב הלוגים ללינוקס ל-/var/log המקובל ב-RedHat
        public string LogFilePath { get; set; } = OperatingSystem.IsWindows()
            ? @"C:\ProgramData\ITB-SCREEN-RECORDER\Logs\Agent.log"
            : "/var/log/itb-screen-recorder/Agent.log";

        private string ResolveFFmpegPath()
        {
            // 1. קבלת הערך מהקונפיגורציה או fallback לברירת מחדל
            string configuredPath = string.IsNullOrWhiteSpace(_ffmpegPath) ? "ffmpeg" : _ffmpegPath;

            // 2. מסלול א' - המשתמש הזין נתיב מוחלט (Absolute Path) משלו
            if (Path.IsPathRooted(configuredPath))
            {
                // הוספת .exe אוטומטית ל-Windows אם המשתמש שכח
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

            // 3. מסלול ב' - לא הוזן נתיב מוחלט, חיפוש בתיקיית השורש של האפליקציה (Air-Gapped)
            string fileName = Path.GetFileName(configuredPath); // הגנה מפני Path Traversal

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