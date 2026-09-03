using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
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
        public double HostRamUsagePct { get; set; }
        public double HostTotalRamMb { get; set; }
    }

    public static class HardwareProbe
    {
        private static string? _resolvedEncoder;
        private static HardwareTelemetry? _telemetryEngine;

#if WINDOWS
        // Windows GPU Cache
        private static readonly Dictionary<string, PerformanceCounter> _windowsGpuCounters = new();
        private static DateTime _lastWindowsGpuRefresh = DateTime.MinValue;
#endif

        // Linux GPU Cache
        private static double _cachedLinux3d = 0;
        private static double _cachedLinuxNvenc = 0;
        private static DateTime _lastLinuxGpuRefresh = DateTime.MinValue;

        private static readonly object _gpuLock = new object();

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

            Logger.Info("[PROBE] NVENC unavailable. Testing AMD AMF (Radeon) hardware acceleration...");
            if (await TestEncoderSupportAsync(ffmpegPath, "h264_amf").ConfigureAwait(false))
            {
                _resolvedEncoder = "h264_amf";
                Logger.Info($"[PROBE] Video Encoder selected: {_resolvedEncoder}");
                return _resolvedEncoder;
            }

            Logger.Info("[PROBE] AMD AMF unavailable. Testing Intel Quick Sync (QSV) hardware acceleration...");
            if (await TestEncoderSupportAsync(ffmpegPath, "h264_qsv").ConfigureAwait(false))
            {
                _resolvedEncoder = "h264_qsv";
                Logger.Info($"[PROBE] Video Encoder selected: {_resolvedEncoder}");
                return _resolvedEncoder;
            }

            _resolvedEncoder = "libx264";
            Logger.Info($"[PROBE] No hardware encoder available. Video Encoder selected (CPU Fallback): {_resolvedEncoder}");
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

            var sysState = _telemetryEngine.GetSystemUsage();

            // נתב את דגימת ה-GPU בהתאם למערכת ההפעלה
            UpdateGpuMetrics(out double host3d, out double appNvenc);

            return new HardwareMetricsSnapshot
            {
                Gpu3dUsagePct = Math.Round(host3d, 2),
                GpuNvencUsagePct = Math.Round(appNvenc, 2),
                HostCpuUsagePct = Math.Round(sysState.HostCpu, 2),
                ProcessCpuUsagePct = Math.Round(sysState.ProcessCpu, 2),
                ProcessRamMb = Math.Round(sysState.ProcessRamMb, 2),
                HostRamUsagePct = Math.Round(sysState.HostRamPct, 2),
                HostTotalRamMb = Math.Round(sysState.HostTotalRamMb, 2)
            };
        }

        private static void UpdateGpuMetrics(out double host3d, out double appNvenc)
        {
            host3d = 0;
            appNvenc = 0;

            if (OperatingSystem.IsWindows())
            {
#if WINDOWS
                UpdateWindowsGpuMetrics(out host3d, out appNvenc);
#endif
            }
            else if (OperatingSystem.IsLinux())
            {
                UpdateLinuxGpuMetrics(out host3d, out appNvenc);
            }
        }

#if WINDOWS
        private static void UpdateWindowsGpuMetrics(out double host3d, out double appNvenc)
        {
            host3d = 0;
            appNvenc = 0;

#pragma warning disable CA1416
            lock (_gpuLock)
            {
                try
                {
                    if ((DateTime.UtcNow - _lastWindowsGpuRefresh).TotalSeconds > 10)
                    {
                        RefreshWindowsGpuCountersUnsafe();
                        _lastWindowsGpuRefresh = DateTime.UtcNow;
                    }

                    int currentPid = Process.GetCurrentProcess().Id;
                    double total3d = 0;
                    double appEncode = 0;

                    foreach (var kvp in _windowsGpuCounters)
                    {
                        try
                        {
                            double val = kvp.Value.NextValue();

                            if (kvp.Key.EndsWith("engtype_3D", StringComparison.OrdinalIgnoreCase))
                            {
                                total3d += val;
                            }
                            else if (kvp.Key.Contains($"pid_{currentPid}_") &&
                                     kvp.Key.EndsWith("engtype_VideoEncode", StringComparison.OrdinalIgnoreCase))
                            {
                                appEncode += val;
                            }
                        }
                        catch { }
                    }

                    host3d = Math.Round(Math.Min(100.0, total3d), 1);
                    appNvenc = Math.Round(Math.Min(100.0, appEncode), 1);
                }
                catch { }
            }
#pragma warning restore CA1416
        }

        private static void RefreshWindowsGpuCountersUnsafe()
        {
#pragma warning disable CA1416
            try
            {
                var category = new PerformanceCounterCategory("GPU Engine");
                var instances = category.GetInstanceNames();
                var validInstances = new HashSet<string>(instances);

                var keysToRemove = _windowsGpuCounters.Keys.Where(k => !validInstances.Contains(k)).ToList();
                foreach (var key in keysToRemove)
                {
                    _windowsGpuCounters[key].Dispose();
                    _windowsGpuCounters.Remove(key);
                }

                foreach (var instance in instances)
                {
                    if (!_windowsGpuCounters.ContainsKey(instance))
                    {
                        if (instance.EndsWith("engtype_3D", StringComparison.OrdinalIgnoreCase) ||
                            instance.EndsWith("engtype_VideoEncode", StringComparison.OrdinalIgnoreCase))
                        {
                            var counter = new PerformanceCounter("GPU Engine", "Utilization Percentage", instance, true);
                            counter.NextValue();
                            _windowsGpuCounters[instance] = counter;
                        }
                    }
                }
            }
            catch { }
#pragma warning restore CA1416
        }

#endif

        private static void UpdateLinuxGpuMetrics(out double host3d, out double appNvenc)
        {
            lock (_gpuLock)
            {
                // שימוש במטמון של 2 שניות ב-Linux למניעת זלילת מעבד עקב יצירת תהליכים (Process.Start)
                if ((DateTime.UtcNow - _lastLinuxGpuRefresh).TotalSeconds < 2)
                {
                    host3d = _cachedLinux3d;
                    appNvenc = _cachedLinuxNvenc;
                    return;
                }

                try
                {
                    // נסיון שליפה ראשון: כרטיסי NVIDIA (דרך nvidia-smi)
                    var psi = new ProcessStartInfo
                    {
                        FileName = "nvidia-smi",
                        Arguments = "--query-gpu=utilization.gpu,utilization.encoder --format=csv,noheader,nounits",
                        RedirectStandardOutput = true,
                        UseShellExecute = false,
                        CreateNoWindow = true
                    };

                    using var proc = Process.Start(psi);
                    if (proc != null)
                    {
                        string output = proc.StandardOutput.ReadToEnd();
                        proc.WaitForExit(500);

                        if (proc.ExitCode == 0)
                        {
                            var parts = output.Split(new[] { ',', '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries);
                            if (parts.Length >= 2)
                            {
                                if (double.TryParse(parts[0].Trim(), out double n3d)) _cachedLinux3d = Math.Round(n3d, 1);
                                if (double.TryParse(parts[1].Trim(), out double nEnc)) _cachedLinuxNvenc = Math.Round(nEnc, 1);

                                host3d = _cachedLinux3d;
                                appNvenc = _cachedLinuxNvenc;
                                _lastLinuxGpuRefresh = DateTime.UtcNow;
                                return;
                            }
                        }
                    }
                }
                catch { }

                try
                {
                    // נסיון שליפה שני (Fallback): כרטיסי AMD Radeon ו-Intel (דרך SysFs)
                    if (System.IO.File.Exists("/sys/class/drm/card0/device/gpu_busy_percent"))
                    {
                        string busy = System.IO.File.ReadAllText("/sys/class/drm/card0/device/gpu_busy_percent");
                        if (double.TryParse(busy.Trim(), out double amdBusy))
                        {
                            _cachedLinux3d = Math.Round(amdBusy, 1);
                            _cachedLinuxNvenc = 0; // קבצי ה-SysFs לא חושפים עומס מקודד בנפרד בקלות

                            host3d = _cachedLinux3d;
                            appNvenc = _cachedLinuxNvenc;
                            _lastLinuxGpuRefresh = DateTime.UtcNow;
                            return;
                        }
                    }
                }
                catch { }

                // כישלון כללי - החזרת תוצאה ריקה כדי לא להקריס את השרת
                _lastLinuxGpuRefresh = DateTime.UtcNow;
                host3d = _cachedLinux3d;
                appNvenc = _cachedLinuxNvenc;
            }
        }
    }
}