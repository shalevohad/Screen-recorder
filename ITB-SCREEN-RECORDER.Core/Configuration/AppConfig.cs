using System;
using System.IO;

namespace ITB_SCREEN_RECORDER.Core.Configuration
{
    /// <summary>
    /// Configuration model for the Agent Service and Agent Worker processes,
    /// defining encoder targets, RTMP endpoints, network discovery, and binary paths.
    /// </summary>
    public class AppConfig
    {
        /// <summary>
        /// Explicit path to the FFmpeg executable. If empty, the engine resolves it automatically.
        /// </summary>
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

        /// <summary>
        /// Resolves the absolute path to the FFmpeg binary across local execution directories,
        /// runtime-identifier (RID) folders, tools directories, and system PATH.
        /// </summary>
        /// <returns>Absolute path to the resolved FFmpeg executable.</returns>
        /// <exception cref="FileNotFoundException">Thrown when FFmpeg binary cannot be located in any probe path.</exception>
        public static string GetResolvedFFmpegPath()
        {
            string binaryName = OperatingSystem.IsWindows() ? "ffmpeg.exe" : "ffmpeg";
            string ridSubFolder = OperatingSystem.IsWindows() ? "win-x64" : "linux-x64";
            string baseDir = AppContext.BaseDirectory;

            // 1. Directly in execution root directory
            string directPath = Path.Combine(baseDir, binaryName);
            if (File.Exists(directPath)) return directPath;

            // 2. Inside RID subfolder (win-x64 / linux-x64)
            string ridPath = Path.Combine(baseDir, ridSubFolder, binaryName);
            if (File.Exists(ridPath)) return ridPath;

            // 3. In parent directory (if running from a nested binary path)
            string parentPath = Path.GetFullPath(Path.Combine(baseDir, "..", binaryName));
            if (File.Exists(parentPath)) return parentPath;

            // 4. In local Tools directory (e.g. Tools\Win\ffmpeg.exe or Tools\Linux\ffmpeg)
            string toolsSubFolder = OperatingSystem.IsWindows() ? "Win" : "Linux";
            string localToolsPath = Path.Combine(baseDir, "Tools", toolsSubFolder, binaryName);
            if (File.Exists(localToolsPath)) return localToolsPath;

            string localToolsDirect = Path.Combine(baseDir, "Tools", binaryName);
            if (File.Exists(localToolsDirect)) return localToolsDirect;

            // 5. In parent Tools directory (when executing from bin\Debug\net8.0\win-x64)
            string parentToolsPath = Path.GetFullPath(Path.Combine(baseDir, "..", "Tools", toolsSubFolder, binaryName));
            if (File.Exists(parentToolsPath)) return parentToolsPath;

            string devServerToolsPath = Path.GetFullPath(Path.Combine(baseDir, "..", "..", "..", "Tools", toolsSubFolder, binaryName));
            if (File.Exists(devServerToolsPath)) return devServerToolsPath;

            // 6. In root solution Tools directory (development fallback)
            string devToolsPath = Path.GetFullPath(Path.Combine(baseDir, "..", "..", "..", "..", "Tools", toolsSubFolder, binaryName));
            if (File.Exists(devToolsPath)) return devToolsPath;

            // 7. Search in operating system PATH environment variable
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

        /// <summary>
        /// Attempts to resolve the FFmpeg binary path without throwing an exception.
        /// </summary>
        /// <param name="resolvedPath">Outputs the resolved path or default binary name.</param>
        /// <param name="explicitPath">Optional user-specified override path.</param>
        /// <returns>True if a valid executable exists at the resolved path; false otherwise.</returns>
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