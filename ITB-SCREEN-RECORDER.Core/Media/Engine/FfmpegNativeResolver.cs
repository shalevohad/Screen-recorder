// ==========================================
// File: ITB-SCREEN-RECORDER.Core/Media/Engine/FfmpegNativeResolver.cs
// ==========================================
using System;
using System.IO;
using FFmpeg.AutoGen;
using ITB_SCREEN_RECORDER.Core.Common;

namespace ITB_SCREEN_RECORDER.Core.Media.Engine
{
    /// <summary>
    /// Central discovery and initialization authority for native FFmpeg shared libraries (libavcodec, libavformat, etc.).
    /// Shared across Core, AgentWorker, Extractor, and ExtractorAdvanced.
    /// </summary>
    public static class FfmpegNativeResolver
    {
        private static bool _isInitialized = false;
        private static readonly object _initLock = new();

        /// <summary>
        /// Gets whether native FFmpeg libraries were successfully located and initialized.
        /// </summary>
        public static bool IsAvailable { get; private set; } = false;

        /// <summary>
        /// Gets the resolved native libraries folder path.
        /// </summary>
        public static string ResolvedNativePath { get; private set; } = string.Empty;

        /// <summary>
        /// Ensures native FFmpeg libraries are registered with FFmpeg.AutoGen and network subsystems are initialized.
        /// </summary>
        public static bool EnsureInitialized()
        {
            if (_isInitialized) return IsAvailable;

            lock (_initLock)
            {
                if (_isInitialized) return IsAvailable;

                try
                {
                    string baseDir = AppContext.BaseDirectory;
                    string rid = OperatingSystem.IsWindows() ? "win-x64" : "linux-x64";
                    string toolsSubdir = OperatingSystem.IsWindows() ? "Win" : "Linux";

                    string[] probeDirectories =
                    {
                        baseDir,
                        Path.Combine(baseDir, "runtimes", rid, "native"),
                        Path.Combine(baseDir, "..", "..", "..", "..", "Tools", toolsSubdir),
                        Path.Combine(baseDir, "Tools", toolsSubdir),
                        Path.Combine(baseDir, "bin", rid)
                    };

                    foreach (var dir in probeDirectories)
                    {
                        if (Directory.Exists(dir))
                        {
                            ffmpeg.RootPath = Path.GetFullPath(dir);
                            ResolvedNativePath = ffmpeg.RootPath;
                            Logger.Info($"[FFMPEG-RESOLVER] Set FFmpeg native root path: {ResolvedNativePath}");
                            break;
                        }
                    }

                    unsafe
                    {
                        ffmpeg.avformat_network_init();
                    }

                    IsAvailable = true;
                    Logger.Info("[FFMPEG-RESOLVER] Native FFmpeg network subsystem successfully initialized.");
                }
                catch (Exception ex)
                {
                    IsAvailable = false;
                    Logger.Warn($"[FFMPEG-RESOLVER] Native FFmpeg initialization note: {ex.Message}");
                }
                finally
                {
                    _isInitialized = true;
                }

                return IsAvailable;
            }
        }
    }
}
