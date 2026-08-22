using System;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Net;
using System.Net.Sockets;
using ITB_SCREEN_RECORDER.Core.Common;

namespace ITB_SCREEN_RECORDER.Core.Diagnostics
{
    // מודל נתונים פשוט עבור ה-Service
    public class HardwareMetrics
    {
        public double CpuUsagePercentage { get; set; }
        public double GpuUsagePercentage { get; set; }
    }

    public static class HardwareProbe
    {
        private static string? _resolvedEncoder;

        // המנוע החכם שכתבת למדידת ביצועים
        private static HardwareTelemetry? _telemetryEngine;

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

        // =========================================================
        // פונקציות טלמטריה ורשת 
        // =========================================================

        public static string GetLocalIpAddress()
        {
            try
            {
                using Socket socket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, 0);
                socket.Connect("8.8.8.8", 65530);
                if (socket.LocalEndPoint is IPEndPoint endPoint)
                {
                    return endPoint.Address.ToString();
                }
            }
            catch (Exception ex)
            {
                Logger.Warn($"[HardwareProbe] Failed to retrieve local IP address: {ex.Message}");
            }

            return "127.0.0.1";
        }

        public static HardwareMetrics GetTelemetry()
        {
            // אתחול עצל (Lazy Initialization) של מנוע הטלמטריה שלך בפעם הראשונה
            if (_telemetryEngine == null)
            {
                _telemetryEngine = new HardwareTelemetry();
            }

            // קריאה לפונקציות החכמות שלך והחזרתן כאובייקט נתונים נקי ל-Service
            return new HardwareMetrics
            {
                CpuUsagePercentage = _telemetryEngine.GetCpuUsagePercentage(),
                GpuUsagePercentage = _telemetryEngine.GetGpuUsagePercentage()
            };
        }
    }
}