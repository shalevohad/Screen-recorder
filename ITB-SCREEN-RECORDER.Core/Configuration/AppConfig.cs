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
        public static string GetResolvedFFmpegPath()
        {
            string binaryName = OperatingSystem.IsWindows() ? "ffmpeg.exe" : "ffmpeg";
            string ridSubFolder = OperatingSystem.IsWindows() ? "win-x64" : "linux-x64";
            string baseDir = AppContext.BaseDirectory;

            // 1. ישירות בשורש תיקיית הריצה
            string directPath = Path.Combine(baseDir, binaryName);
            if (File.Exists(directPath)) return directPath;

            // 2. בתוך תת-תיקיית ה-RID (win-x64 / linux-x64)
            string ridPath = Path.Combine(baseDir, ridSubFolder, binaryName);
            if (File.Exists(ridPath)) return ridPath;

            // 3. בתיקיית האב (אם התהליך רץ מתוך win-x64 והקובץ בשורש)
            string parentPath = Path.GetFullPath(Path.Combine(baseDir, "..", binaryName));
            if (File.Exists(parentPath)) return parentPath;

            // 4. בתיקיית Tools המרכזית בפתרון (גיבוי לפיתוח)
            string toolsSubFolder = OperatingSystem.IsWindows() ? "Win" : "Linux";
            string devToolsPath = Path.GetFullPath(Path.Combine(baseDir, "..", "..", "..", "..", "Tools", toolsSubFolder, binaryName));
            if (File.Exists(devToolsPath)) return devToolsPath;

            // 5. חיפוש ב-PATH של מערכת ההפעלה
            string? pathEnv = Environment.GetEnvironmentVariable("PATH");
            if (!string.IsNullOrEmpty(pathEnv))
            {
                char separator = OperatingSystem.IsWindows() ? ';' : ':';
                foreach (string entry in pathEnv.Split(separator, StringSplitOptions.RemoveEmptyEntries))
                {
                    string candidate = Path.Combine(entry.Trim(), binaryName);
                    if (File.Exists(candidate)) return candidate;
                }
            }

            throw new FileNotFoundException(
                $"CRITICAL: FFmpeg executable is missing. Probed '{directPath}', '{ridPath}', and '{devToolsPath}'. Expected: {binaryName}");
        }
    }
}