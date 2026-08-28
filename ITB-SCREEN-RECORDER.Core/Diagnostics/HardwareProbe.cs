using System;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Net;
using System.Net.Sockets;
using ITB_SCREEN_RECORDER.Core.Common;

namespace ITB_SCREEN_RECORDER.Core.Diagnostics
{
    public class HardwareMetricsSnapshot
    {
        public double HostCpuUsagePct { get; set; }
        public double ProcessCpuUsagePct { get; set; }
        public double Gpu3dUsagePct { get; set; }
        public double GpuNvencUsagePct { get; set; }
        public double ProcessRamMb { get; set; }
    }

    public static class HardwareProbe
    {
        private static string? _resolvedEncoder;
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
                    Arguments = $"-hide_banner -loglevel error -f lavfi -i nullsrc=s=1920x1080:d=0.1 -c:v {encoderName} -f null -",
                    RedirectStandardError = true,
                    RedirectStandardOutput = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };

                using var proc = new Process { StartInfo = psi };
                proc.Start();

                string errorOutput = await proc.StandardError.ReadToEndAsync().ConfigureAwait(false);
                var completed = await Task.Run(() => proc.WaitForExit(2000)).ConfigureAwait(false);

                if (!completed)
                {
                    proc.Kill();
                    Logger.Warn($"[PROBE] FFmpeg probe for {encoderName} timed out and was terminated.");
                    return false;
                }

                if (proc.ExitCode != 0)
                {
                    Logger.Warn($"[PROBE] {encoderName} is not supported. FFmpeg ExitCode: {proc.ExitCode}. Error Details: {errorOutput.Trim()}");
                    return false;
                }

                return true;
            }
            catch (Exception ex)
            {
                Logger.Error($"[PROBE] Probe execution for {encoderName} failed to start. Exception: {ex.Message}");
                return false;
            }
        }

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

        public static HardwareMetricsSnapshot GetTelemetrySnapshot()
        {
            if (_telemetryEngine == null)
            {
                _telemetryEngine = new HardwareTelemetry();
            }

            var gpuState = _telemetryEngine.GetGpuUsage();
            var sysState = _telemetryEngine.GetSystemUsage();

            return new HardwareMetricsSnapshot
            {
                Gpu3dUsagePct = Math.Round(gpuState.Gpu3D, 2),
                GpuNvencUsagePct = Math.Round(gpuState.GpuNvenc, 2),
                HostCpuUsagePct = Math.Round(sysState.HostCpu, 2),
                ProcessCpuUsagePct = Math.Round(sysState.ProcessCpu, 2),
                ProcessRamMb = Math.Round(sysState.ProcessRamMb, 2)
            };
        }
    }
}