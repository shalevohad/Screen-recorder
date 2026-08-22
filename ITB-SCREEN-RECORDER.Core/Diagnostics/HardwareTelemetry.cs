using System;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using ITB_SCREEN_RECORDER.Core.Common;

namespace ITB_SCREEN_RECORDER.Core.Diagnostics
{
    public class HardwareTelemetry : IDisposable
    {
        [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
        private delegate int NvmlInitDelegate();

        [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
        private delegate int NvmlShutdownDelegate();

        [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
        private delegate int NvmlDeviceGetHandleByIndexDelegate(uint index, out IntPtr device);

        [StructLayout(LayoutKind.Sequential)]
        public struct NvmlUtilization
        {
            public uint Gpu;
            public uint Memory;
        }

        [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
        private delegate int NvmlDeviceGetUtilizationRatesDelegate(IntPtr device, out NvmlUtilization utilization);

        private IntPtr _nvmlLibHandle = IntPtr.Zero;
        private IntPtr _nvmlDeviceHandle = IntPtr.Zero;
        private bool _isNvmlInitialized = false;

        private NvmlShutdownDelegate? _nvmlShutdown;
        private NvmlDeviceGetUtilizationRatesDelegate? _getUtilization;

        private ulong _prevIdleTime = 0;
        private ulong _prevTotalTime = 0;

        public HardwareTelemetry()
        {
            InitializeNvml();
        }

        private void InitializeNvml()
        {
            try
            {
                string libName = OperatingSystem.IsWindows() ? "nvml.dll" : "libnvidia-ml.so.1";

                if (NativeLibrary.TryLoad(libName, out _nvmlLibHandle))
                {
                    var initFunc = Marshal.GetDelegateForFunctionPointer<NvmlInitDelegate>(
                        NativeLibrary.GetExport(_nvmlLibHandle, "nvmlInit_v2"));

                    var getHandleFunc = Marshal.GetDelegateForFunctionPointer<NvmlDeviceGetHandleByIndexDelegate>(
                        NativeLibrary.GetExport(_nvmlLibHandle, "nvmlDeviceGetHandleByIndex_v2"));

                    _nvmlShutdown = Marshal.GetDelegateForFunctionPointer<NvmlShutdownDelegate>(
                        NativeLibrary.GetExport(_nvmlLibHandle, "nvmlShutdown"));

                    _getUtilization = Marshal.GetDelegateForFunctionPointer<NvmlDeviceGetUtilizationRatesDelegate>(
                        NativeLibrary.GetExport(_nvmlLibHandle, "nvmlDeviceGetUtilizationRates"));

                    if (initFunc() == 0 && getHandleFunc(0, out _nvmlDeviceHandle) == 0)
                    {
                        _isNvmlInitialized = true;
                        Logger.Info("[TELEMETRY] NVIDIA NVML loaded and active.");
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.Warn($"[TELEMETRY] NVML not available: {ex.Message}");
            }
        }

        public float GetCpuUsagePercentage()
        {
            if (OperatingSystem.IsLinux())
            {
                return ReadLinuxCpuUsage();
            }

            return 0f;
        }

        public float GetGpuUsagePercentage()
        {
            if (!_isNvmlInitialized || _nvmlDeviceHandle == IntPtr.Zero || _getUtilization == null)
                return 0f;

            try
            {
                if (_getUtilization(_nvmlDeviceHandle, out NvmlUtilization util) == 0)
                {
                    return util.Gpu;
                }
            }
            catch { }

            return 0f;
        }

        private float ReadLinuxCpuUsage()
        {
            try
            {
                if (!File.Exists("/proc/stat")) return 0f;
                string firstLine = File.ReadLines("/proc/stat").FirstOrDefault() ?? string.Empty;
                var parts = firstLine.Split(' ', StringSplitOptions.RemoveEmptyEntries);

                if (parts.Length < 5) return 0f;

                ulong user = ulong.Parse(parts[1]);
                ulong nice = ulong.Parse(parts[2]);
                ulong system = ulong.Parse(parts[3]);
                ulong idle = ulong.Parse(parts[4]);
                ulong iowait = parts.Length > 5 ? ulong.Parse(parts[5]) : 0;
                ulong irq = parts.Length > 6 ? ulong.Parse(parts[6]) : 0;
                ulong softirq = parts.Length > 7 ? ulong.Parse(parts[7]) : 0;

                ulong totalIdle = idle + iowait;
                ulong totalNonIdle = user + nice + system + irq + softirq;
                ulong total = totalIdle + totalNonIdle;

                ulong totalDiff = total - _prevTotalTime;
                ulong idleDiff = totalIdle - _prevIdleTime;

                _prevTotalTime = total;
                _prevIdleTime = totalIdle;

                if (totalDiff == 0) return 0f;
                return (float)(totalDiff - idleDiff) / totalDiff * 100f;
            }
            catch { return 0f; }
        }

        public void Dispose()
        {
            if (_isNvmlInitialized && _nvmlShutdown != null)
            {
                try { _nvmlShutdown(); } catch { }
            }

            if (_nvmlLibHandle != IntPtr.Zero)
            {
                NativeLibrary.Free(_nvmlLibHandle);
            }
        }
    }
}