using System;
using System.IO;

namespace ITB_SCREEN_RECORDER.Core.Configuration
{
    public class AppConfig
    {
        // 1. שדה קונפיגורציה פשוט ונקי לחלוטין
        public string FFmpegPath { get; set; } = string.Empty;

        public string RtmpServerBaseUrl { get; set; } = "AUTO";
        public string DashboardApiUrl { get; set; } = "AUTO";
        public int ReconnectDelaySeconds { get; set; } = 5;
        public int TargetFps { get; set; } = 30;
        public string VideoBitrate { get; set; } = "5M";
        public string VideoEncoder { get; set; } = "auto";

        public int DiscoveryPort { get; set; } = 5098;
        public string DiscoveryMulticastAddress { get; set; } = "239.210.1.5";
        public string DiscoveryBroadcastAddress { get; set; } = "255.255.255.255";
        public System.Collections.Generic.List<string> DiscoveryDnsHostnames { get; set; } = new() { "itb-server", "screenrecorder" };
        public int DiscoveryTimeoutMs { get; set; } = 2500;
        public string DiscoveryTargetEnvironment { get; set; } = "Production";
        public int DiscoveryFallbackHttpPort { get; set; } = 5090;
        public int DiscoveryFallbackRtmpPort { get; set; } = 19350;

        public string LocalBufferPath { get; set; } = OperatingSystem.IsWindows()
            ? @"C:\ProgramData\ITB-SCREEN-RECORDER\Buffer"
            : "/var/lib/itb-screen-recorder/buffer";

        public bool AutoStartRecordingOnLaunch { get; set; } = true;
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

            // 4. בתוך תיקיית Tools המקומית (למשל Tools\Win\ffmpeg.exe או Tools\Linux\ffmpeg)
            string toolsSubFolder = OperatingSystem.IsWindows() ? "Win" : "Linux";
            string localToolsPath = Path.Combine(baseDir, "Tools", toolsSubFolder, binaryName);
            if (File.Exists(localToolsPath)) return localToolsPath;

            string localToolsDirect = Path.Combine(baseDir, "Tools", binaryName);
            if (File.Exists(localToolsDirect)) return localToolsDirect;

            // 5. בתיקיית Tools בדרג האב (למשל בהרצה מתוך bin\Debug\net8.0\win-x64)
            string parentToolsPath = Path.GetFullPath(Path.Combine(baseDir, "..", "Tools", toolsSubFolder, binaryName));
            if (File.Exists(parentToolsPath)) return parentToolsPath;

            string devServerToolsPath = Path.GetFullPath(Path.Combine(baseDir, "..", "..", "..", "Tools", toolsSubFolder, binaryName));
            if (File.Exists(devServerToolsPath)) return devServerToolsPath;

            // 6. בתיקיית Tools המרכזית בפתרון (גיבוי לפיתוח)
            string devToolsPath = Path.GetFullPath(Path.Combine(baseDir, "..", "..", "..", "..", "Tools", toolsSubFolder, binaryName));
            if (File.Exists(devToolsPath)) return devToolsPath;

            // 7. חיפוש ב-PATH של מערכת ההפעלה
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
                $"CRITICAL: FFmpeg executable is missing. Probed '{directPath}', '{ridPath}', '{localToolsPath}', and '{devToolsPath}'. Expected: {binaryName}");
        }

        public static bool TryGetResolvedFFmpegPath(out string resolvedPath, string? explicitPath = null)
        {
            if (!string.IsNullOrWhiteSpace(explicitPath) && File.Exists(explicitPath))
            {
                resolvedPath = explicitPath;
                return true;
            }

            try
            {
                resolvedPath = GetResolvedFFmpegPath();
                return true;
            }
            catch
            {
                resolvedPath = OperatingSystem.IsWindows() ? "ffmpeg.exe" : "ffmpeg";
                return false;
            }
        }
    }
}