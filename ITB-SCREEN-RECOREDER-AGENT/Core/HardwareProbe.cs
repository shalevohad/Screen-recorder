using System;
using System.Diagnostics;
using System.Threading.Tasks;

namespace ITBRecorderAgent.Core
{
    public static class HardwareProbe
    {
        private static string? _resolvedEncoder;

        public static async Task<string> ResolveEncoderAsync(string ffmpegPath, string configuredEncoder)
        {
            if (!string.IsNullOrWhiteSpace(configuredEncoder) && !configuredEncoder.Equals("auto", StringComparison.OrdinalIgnoreCase))
            {
                return configuredEncoder;
            }

            if (_resolvedEncoder != null)
                return _resolvedEncoder;

            Logger.Info("[PROBE] Testing NVIDIA NVENC hardware acceleration...");

            bool nvencSupported = await TestNvencSupportAsync(ffmpegPath);
            _resolvedEncoder = nvencSupported ? "h264_nvenc" : "libx264";

            Logger.Info($"[PROBE] Video Encoder selected: {_resolvedEncoder}");
            return _resolvedEncoder;
        }

        private static async Task<bool> TestNvencSupportAsync(string ffmpegPath)
        {
            try
            {
                var psi = new ProcessStartInfo
                {
                    FileName = ffmpegPath,
                    Arguments = "-hide_banner -loglevel error -f lavfi -i nullsrc=s=64x64:d=0.1 -c:v h264_nvenc -f null -",
                    RedirectStandardError = true,
                    RedirectStandardOutput = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };

                using var proc = new Process { StartInfo = psi };
                proc.Start();

                var completed = await Task.Run(() => proc.WaitForExit(2000));
                return completed && proc.ExitCode == 0;
            }
            catch (Exception ex)
            {
                Logger.Warn($"[PROBE] Probe failed ({ex.Message}). Defaulting to CPU software encoding (libx264).");
                return false;
            }
        }
    }
}