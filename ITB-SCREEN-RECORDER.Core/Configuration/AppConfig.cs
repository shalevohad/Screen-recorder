using System;
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

        private string ResolveFFmpegPath()
        {
            // If the config value is a full path and exists, use it
            if (!string.IsNullOrEmpty(_ffmpegPath) && Path.IsPathRooted(_ffmpegPath) && File.Exists(_ffmpegPath))
            {
                return _ffmpegPath;
            }

            // If the config value is just a filename (not rooted), try to find it in common locations
            if (!string.IsNullOrEmpty(_ffmpegPath) && !Path.IsPathRooted(_ffmpegPath))
            {
                // Try to find in PATH environment variable
                string? ffmpegFromPath = FindFFmpegInPath(_ffmpegPath);
                if (ffmpegFromPath != null)
                    return ffmpegFromPath;

                // Try common installation paths
                string? ffmpegFromCommon = FindFFmpegInCommonPaths(_ffmpegPath);
                if (ffmpegFromCommon != null)
                    return ffmpegFromCommon;
            }

            // Fallback: use default resolution logic
            return ResolveDefaultFFmpegPath();
        }

        private string? FindFFmpegInPath(string ffmpegName)
        {
            string pathVariable = Environment.GetEnvironmentVariable("PATH") ?? string.Empty;
            string[] paths = pathVariable.Split(Path.PathSeparator);

            foreach (var directory in paths)
            {
                if (string.IsNullOrWhiteSpace(directory))
                    continue;

                string fullPath = Path.Combine(directory, ffmpegName);
                if (File.Exists(fullPath))
                    return fullPath;
            }

            return null;
        }

        private string? FindFFmpegInCommonPaths(string ffmpegName)
        {
            string[] commonPaths = OperatingSystem.IsWindows()
                ? new[]
                {
                    @"C:\Program Files\FFMPEG",
                    @"C:\Program Files (x86)\FFMPEG",
                    @"C:\ffmpeg",
                    Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), "FFMPEG"),
                    Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "FFMPEG")
                }
                : new[]
                {
                    "/usr/bin",
                    "/usr/local/bin",
                    "/opt/ffmpeg/bin",
                    Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile), ".local", "bin")
                };

            foreach (var directory in commonPaths)
            {
                if (string.IsNullOrWhiteSpace(directory) || !Directory.Exists(directory))
                    continue;

                string fullPath = Path.Combine(directory, ffmpegName);
                if (File.Exists(fullPath))
                    return fullPath;
            }

            return null;
        }

        private string ResolveDefaultFFmpegPath()
        {
            if (OperatingSystem.IsWindows())
            {
                // Try Windows default paths
                string[] windowsPaths = new[]
                {
                    @"C:\Program Files\FFMPEG\ffmpeg.exe",
                    @"C:\Program Files (x86)\FFMPEG\ffmpeg.exe",
                    @"C:\ffmpeg\ffmpeg.exe"
                };

                foreach (var path in windowsPaths)
                {
                    if (File.Exists(path))
                        return path;
                }

                // If nothing found, try to find in PATH
                string? pathResult = FindFFmpegInPath("ffmpeg.exe");
                if (pathResult != null)
                    return pathResult;

                // Fallback to just the executable name (will use PATH at runtime)
                return "ffmpeg.exe";
            }
            else
            {
                // On Linux, try standard locations
                string[] linuxPaths = new[]
                {
                    "/usr/bin/ffmpeg",
                    "/usr/local/bin/ffmpeg",
                    "/opt/ffmpeg/bin/ffmpeg"
                };

                foreach (var path in linuxPaths)
                {
                    if (File.Exists(path))
                        return path;
                }

                // If nothing found, try to find in PATH
                string? pathResult = FindFFmpegInPath("ffmpeg");
                if (pathResult != null)
                    return pathResult;

                // Fallback to just the executable name (will use PATH at runtime)
                return "ffmpeg";
            }
        }
    }
}