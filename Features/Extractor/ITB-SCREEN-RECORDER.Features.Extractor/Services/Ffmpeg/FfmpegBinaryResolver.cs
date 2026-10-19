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

        // 💡 בדיקה חד-פעמית ברמת התהליך (Static Process-Wide Cache): לעולם לא נבדק שוב לאחר העלייה הראשונה
        private static FfmpegHardwareCapabilities? _cachedCapabilities;
        private static readonly object _probeLock = new();

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
            return GetOptimalVideoEncoderArgs(bitrateKbps, zeroLatency: false);
        }

        public string GetOptimalVideoEncoderArgs(bool zeroLatency)
        {
            return GetOptimalVideoEncoderArgs(bitrateKbps: null, zeroLatency: zeroLatency);
        }

        public string GetOptimalVideoEncoderArgs(int? bitrateKbps, bool zeroLatency)
        {
            var caps = GetCapabilities();
            string baseArgs = zeroLatency ? caps.ZeroLatencyEncoderArgs : caps.EncoderArgs;

            if (bitrateKbps.HasValue && bitrateKbps.Value > 0)
            {
                return $"{baseArgs} -maxrate {bitrateKbps.Value}k -bufsize {bitrateKbps.Value}k";
            }
            return baseArgs;
        }

        /// <summary>
        /// דוגם את כרטיסי המסך הזמינים באמצעות ריצת מבחן זעירה (100ms) של פריים סינתטי פעם אחת בלבד
        /// </summary>
        protected virtual FfmpegHardwareCapabilities ProbeHardwareCapabilities()
        {
            string ffmpegPath = ResolveFfmpeg();
            Logger.LogInformation("[FFmpeg Resolver] Probing hardware encoder capabilities once with binary: {Path}", ffmpegPath);

            // 1. בדיקת NVIDIA NVENC (CUDA)
            if (TestSyntheticEncoder(ffmpegPath, "-hwaccel cuda", "h264_nvenc"))
            {
                Logger.LogInformation("[FFmpeg Resolver] >>> NVIDIA GPU acceleration verified: h264_nvenc engaged.");
                return new FfmpegHardwareCapabilities
                {
                    HardwareType = "NVIDIA NVENC",
                    VideoEncoder = "h264_nvenc",
                    EncoderArgs = "-c:v h264_nvenc -preset p4 -tune ll -rc vbr -cq 21 -b:v 0 -maxrate 6000k -bufsize 6000k",
                    ZeroLatencyEncoderArgs = "-c:v h264_nvenc -preset p2 -tune zerolatency -zerolatency 1 -rc vbr -cq 21 -b:v 0 -maxrate 6000k -bufsize 6000k -pix_fmt yuv420p",
                    HwaccelDecodeArgs = "-hwaccel cuda",
                    IsGpuAccelerated = true
                };
            }

            // 2. בדיקת Intel QuickSync (QSV)
            if (TestSyntheticEncoder(ffmpegPath, "-hwaccel qsv", "h264_qsv"))
            {
                Logger.LogInformation("[FFmpeg Resolver] >>> Intel QSV hardware acceleration verified: h264_qsv engaged.");
                return new FfmpegHardwareCapabilities
                {
                    HardwareType = "Intel QSV",
                    VideoEncoder = "h264_qsv",
                    EncoderArgs = "-c:v h264_qsv -preset veryfast -global_quality 21 -b:v 0 -maxrate 6000k -bufsize 6000k",
                    ZeroLatencyEncoderArgs = "-c:v h264_qsv -preset veryfast -global_quality 21 -b:v 0 -maxrate 6000k -bufsize 6000k -pix_fmt yuv420p",
                    HwaccelDecodeArgs = "-hwaccel qsv",
                    IsGpuAccelerated = true
                };
            }

            // 3. Fallback: מעבד (CPU x264)
            Logger.LogInformation("[FFmpeg Resolver] >>> No functional GPU encoder verified. Operating in standard CPU mode (libx264).");
            return new FfmpegHardwareCapabilities
            {
                HardwareType = "CPU",
                VideoEncoder = "libx264",
                EncoderArgs = "-c:v libx264 -preset veryfast -crf 21 -maxrate 6000k -bufsize 6000k",
                ZeroLatencyEncoderArgs = "-c:v libx264 -preset veryfast -tune zerolatency -crf 21 -maxrate 6000k -bufsize 6000k -threads 2 -pix_fmt yuv420p",
                HwaccelDecodeArgs = "-hwaccel auto",
                IsGpuAccelerated = false
            };
        }

        private bool TestSyntheticEncoder(string ffmpegPath, string hwaccel, string encoder)
        {
            try
            {
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