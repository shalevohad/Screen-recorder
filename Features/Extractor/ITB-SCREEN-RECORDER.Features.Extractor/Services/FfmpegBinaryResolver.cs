// ==========================================
// File: Features/Extractor/Services/FfmpegBinaryResolver.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public class FfmpegBinaryResolver : IFfmpegBinaryResolver
    {
        protected readonly ExtractorOptions Options;
        protected readonly ILogger<FfmpegBinaryResolver> Logger;

        private FfmpegHardwareCapabilities? _cachedCapabilities;
        private readonly object _probeLock = new();

        public FfmpegBinaryResolver(IOptions<ExtractorOptions> options, ILogger<FfmpegBinaryResolver> logger)
        {
            Options = options.Value;
            Logger = logger;
        }

        public virtual string ResolveFfmpeg() => ResolveBinary("ffmpeg");
        public virtual string ResolveFfprobe() => ResolveBinary("ffprobe");

        public virtual string ResolveBinary(string baseName)
        {
            string binaryName = OperatingSystem.IsWindows() ? $"{baseName}.exe" : baseName;

            // 1. נתיב ייעודי שהוגדר בקונפיגורציה
            if (baseName.Equals("ffmpeg", StringComparison.OrdinalIgnoreCase) &&
                !string.IsNullOrWhiteSpace(Options.FfmpegPath) &&
                File.Exists(Options.FfmpegPath))
            {
                EnsureLinuxExecutablePermissions(Options.FfmpegPath);
                return Options.FfmpegPath;
            }

            // 2. חיפוש לצד ה-Assembly הפעיל
            string? assemblyDir = Path.GetDirectoryName(GetType().Assembly.Location);
            if (!string.IsNullOrWhiteSpace(assemblyDir))
            {
                string pluginBin = Path.Combine(assemblyDir, binaryName);
                if (File.Exists(pluginBin))
                {
                    EnsureLinuxExecutablePermissions(pluginBin);
                    return pluginBin;
                }
            }

            // 3. סריקת תיקיות מועמדות
            foreach (var candidateDir in GetCandidateDirectories())
            {
                string fullPath = Path.Combine(candidateDir, binaryName);
                if (File.Exists(fullPath))
                {
                    EnsureLinuxExecutablePermissions(fullPath);
                    return fullPath;
                }
            }

            // 4. נתיבי לינוקס סטנדרטיים
            if (OperatingSystem.IsLinux())
            {
                string[] standardPaths = { $"/usr/bin/{binaryName}", $"/usr/local/bin/{binaryName}" };
                foreach (var path in standardPaths)
                {
                    if (File.Exists(path)) return path;
                }
            }

            return binaryName;
        }

        public FfmpegHardwareCapabilities GetCapabilities()
        {
            if (_cachedCapabilities != null) return _cachedCapabilities;

            lock (_probeLock)
            {
                if (_cachedCapabilities != null) return _cachedCapabilities;
                _cachedCapabilities = ProbeHardwareCapabilities();
                return _cachedCapabilities;
            }
        }

        public string GetOptimalVideoEncoderArgs(int? bitrateKbps = null)
        {
            var caps = GetCapabilities();
            if (bitrateKbps.HasValue && bitrateKbps.Value > 0)
            {
                return $"{caps.EncoderArgs} -b:v {bitrateKbps.Value}k";
            }
            return caps.EncoderArgs;
        }

        /// <summary>
        /// דוגם את כרטיסי המסך הזמינים באמצעות ריצת מבחן זעירה (100ms) של פריים סינתטי
        /// </summary>
        protected virtual FfmpegHardwareCapabilities ProbeHardwareCapabilities()
        {
            string ffmpegPath = ResolveFfmpeg();
            Logger.LogInformation("[FFmpeg Resolver] Probing hardware encoder capabilities with binary: {Path}", ffmpegPath);

            // 1. בדיקת NVIDIA NVENC (CUDA)
            if (TestSyntheticEncoder(ffmpegPath, "-hwaccel cuda", "h264_nvenc"))
            {
                Logger.LogInformation("[FFmpeg Resolver] >>> NVIDIA GPU acceleration verified: h264_nvenc will be utilized for all transcoding pipelines.");
                return new FfmpegHardwareCapabilities
                {
                    HardwareType = "NVIDIA NVENC",
                    VideoEncoder = "h264_nvenc",
                    EncoderArgs = "-c:v h264_nvenc -preset p4 -tune ll -rc vbr -cq 20",
                    IsGpuAccelerated = true
                };
            }

            // 2. בדיקת Intel QuickSync (QSV)
            if (TestSyntheticEncoder(ffmpegPath, "-hwaccel qsv", "h264_qsv"))
            {
                Logger.LogInformation("[FFmpeg Resolver] >>> Intel QSV hardware acceleration verified: h264_qsv will be utilized.");
                return new FfmpegHardwareCapabilities
                {
                    HardwareType = "Intel QSV",
                    VideoEncoder = "h264_qsv",
                    EncoderArgs = "-c:v h264_qsv -preset veryfast -global_quality 20",
                    IsGpuAccelerated = true
                };
            }

            // 3. Fallback: מעבד (CPU x264)
            Logger.LogInformation("[FFmpeg Resolver] >>> No functional GPU encoder verified. Operating in standard CPU mode (libx264).");
            return new FfmpegHardwareCapabilities
            {
                HardwareType = "CPU",
                VideoEncoder = "libx264",
                EncoderArgs = "-c:v libx264 -preset veryfast -crf 20",
                IsGpuAccelerated = false
            };
        }

        private bool TestSyntheticEncoder(string ffmpegPath, string hwaccel, string encoder)
        {
            try
            {
                // ריצה של 100ms בזיכרון (-f null -) שמוודאת שהדרייבר אינו קורס בעת הקצאת Session
                string args = $"{hwaccel} -f lavfi -i color=c=black:s=64x64:d=0.1 -c:v {encoder} -f null -";
                var psi = new ProcessStartInfo
                {
                    FileName = ffmpegPath,
                    Arguments = args,
                    RedirectStandardError = true,
                    RedirectStandardOutput = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };

                using var process = new Process { StartInfo = psi };
                process.Start();

                if (!process.WaitForExit(2500))
                {
                    process.Kill(entireProcessTree: true);
                    return false;
                }

                return process.ExitCode == 0;
            }
            catch
            {
                return false;
            }
        }

        protected virtual IEnumerable<string> GetCandidateDirectories()
        {
            var baseDir = AppContext.BaseDirectory;
            yield return Path.Combine(baseDir, "Features", "Extractor");
            yield return Path.Combine(baseDir, "Features", "Extractor", "Bin");
            yield return Path.Combine(baseDir, "Features", "Extractor", "Tools", "Win");
            yield return baseDir;
        }

        protected virtual void EnsureLinuxExecutablePermissions(string filePath)
        {
            if (!OperatingSystem.IsLinux() || !File.Exists(filePath)) return;

            try
            {
                File.SetUnixFileMode(filePath,
                    UnixFileMode.UserRead | UnixFileMode.UserWrite | UnixFileMode.UserExecute |
                    UnixFileMode.GroupRead | UnixFileMode.GroupExecute |
                    UnixFileMode.OtherRead | UnixFileMode.OtherExecute);
            }
            catch (Exception ex)
            {
                Logger.LogWarning(ex, "Failed to set Unix execution permissions on: {Path}", filePath);
            }
        }
    }
}