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
            if (await TestEncoderSupportAsync(ffmpegPath, "h264_nvenc").ConfigureAwait(false))
            {
                _resolvedEncoder = "h264_nvenc";
                Logger.Info($"[PROBE] Video Encoder selected: {_resolvedEncoder}");
                return _resolvedEncoder;
            }

            // NVENC requires a discrete NVIDIA GPU. Most laptops/desktops instead have an
            // Intel integrated GPU with Quick Sync (QSV) hardware encoding - falling straight
            // to CPU software encoding (libx264) without checking QSV leaves real-time 1080p30
            // encoding fully on the CPU, which is a common cause of stutter under load.
            Logger.Info("[PROBE] NVENC unavailable. Testing Intel Quick Sync (QSV) hardware acceleration...");
            if (await TestEncoderSupportAsync(ffmpegPath, "h264_qsv").ConfigureAwait(false))
            {
                _resolvedEncoder = "h264_qsv";
                Logger.Info($"[PROBE] Video Encoder selected: {_resolvedEncoder}");
                return _resolvedEncoder;
            }

            _resolvedEncoder = "libx264";
            Logger.Info($"[PROBE] No hardware encoder available. Video Encoder selected: {_resolvedEncoder}");
            return _resolvedEncoder;
        }

        private static async Task<bool> TestEncoderSupportAsync(string ffmpegPath, string encoderName)
        {
            try
            {
                var psi = new ProcessStartInfo
                {
                    FileName = ffmpegPath,
                    Arguments = $"-hide_banner -loglevel error -f lavfi -i nullsrc=s=64x64:d=0.1 -c:v {encoderName} -f null -",
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
                Logger.Warn($"[PROBE] Probe for {encoderName} failed ({ex.Message}).");
                return false;
            }
        }
    }
}