using System;
using System.Diagnostics;
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

        [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
        private delegate int NvmlDeviceGetEncoderUtilizationDelegate(IntPtr device, out uint utilization, out uint samplingPeriodUs);

        private IntPtr _nvmlLibHandle = IntPtr.Zero;
        private IntPtr _nvmlDeviceHandle = IntPtr.Zero;
        private bool _isNvmlInitialized = false;

        private NvmlShutdownDelegate? _nvmlShutdown;
        private NvmlDeviceGetUtilizationRatesDelegate? _getUtilization;
        private NvmlDeviceGetEncoderUtilizationDelegate? _getEncoderUtilization;

        private ulong _prevIdleTime = 0;
        private ulong _prevTotalTime = 0;
        private DateTime _lastCpuSampleTime;
        private TimeSpan _lastTotalProcessorTime;
        private readonly Process _currentProcess;

        public HardwareTelemetry()
        {
            _currentProcess = Process.GetCurrentProcess();
            _lastCpuSampleTime = DateTime.UtcNow;
            _lastTotalProcessorTime = _currentProcess.TotalProcessorTime;

            InitializeNvml();
        }

        private void InitializeNvml()
        {
            try
            {
                string libName = OperatingSystem.IsWindows() ? "nvml.dll" : "libnvidia-ml.so.1";

                if (NativeLibrary.TryLoad(libName, out _nvmlLibHandle))
                {
                    var initFunc = Marshal.GetDelegateForFunctionPointer<NvmlInitDelegate>(NativeLibrary.GetExport(_nvmlLibHandle, "nvmlInit_v2"));
                    var getHandleFunc = Marshal.GetDelegateForFunctionPointer<NvmlDeviceGetHandleByIndexDelegate>(NativeLibrary.GetExport(_nvmlLibHandle, "nvmlDeviceGetHandleByIndex_v2"));

                    _nvmlShutdown = Marshal.GetDelegateForFunctionPointer<NvmlShutdownDelegate>(NativeLibrary.GetExport(_nvmlLibHandle, "nvmlShutdown"));
                    _getUtilization = Marshal.GetDelegateForFunctionPointer<NvmlDeviceGetUtilizationRatesDelegate>(NativeLibrary.GetExport(_nvmlLibHandle, "nvmlDeviceGetUtilizationRates"));

                    if (NativeLibrary.TryGetExport(_nvmlLibHandle, "nvmlDeviceGetEncoderUtilization", out IntPtr encPtr))
                    {
                        _getEncoderUtilization = Marshal.GetDelegateForFunctionPointer<NvmlDeviceGetEncoderUtilizationDelegate>(encPtr);
                    }

                    if (initFunc() == 0 && getHandleFunc(0, out _nvmlDeviceHandle) == 0)
                    {
                        _isNvmlInitialized = true;
                        Logger.Info("[TELEMETRY] NVIDIA NVML loaded (3D Core + NVENC support).");
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.Warn($"[TELEMETRY] NVML not available: {ex.Message}");
            }
        }

        public (float Gpu3D, float GpuNvenc) GetGpuUsage()
        {
            if (!_isNvmlInitialized || _nvmlDeviceHandle == IntPtr.Zero) return (0f, 0f);

            float gpu3D = 0f;
            float nvenc = 0f;

            try
            {
                if (_getUtilization != null && _getUtilization(_nvmlDeviceHandle, out NvmlUtilization util) == 0)
                    gpu3D = util.Gpu;

                if (_getEncoderUtilization != null && _getEncoderUtilization(_nvmlDeviceHandle, out uint encUtil, out _) == 0)
                    nvenc = encUtil;
            }
            catch { }

            return (gpu3D, nvenc);
        }

        public (float HostCpu, float ProcessCpu, float ProcessRamMb) GetSystemUsage()
        {
            DateTime now = DateTime.UtcNow;
            double elapsedSeconds = (now - _lastCpuSampleTime).TotalSeconds;

            float hostCpu = OperatingSystem.IsLinux() ? ReadLinuxCpuUsage() : 0f;
            float processCpu = 0f;
            float processRamMb = 0f;

            try
            {
                if (elapsedSeconds > 0)
                {
                    TimeSpan currentTotalCpu = _currentProcess.TotalProcessorTime;
                    double cpuUsedMs = (currentTotalCpu - _lastTotalProcessorTime).TotalMilliseconds;
                    double totalPassedMs = elapsedSeconds * 1000.0 * Environment.ProcessorCount;

                    processCpu = (float)Math.Round((cpuUsedMs / totalPassedMs) * 100.0, 2);
                    _lastTotalProcessorTime = currentTotalCpu;
                }

                _lastCpuSampleTime = now;
                _currentProcess.Refresh();
                processRamMb = (float)Math.Round(_currentProcess.WorkingSet64 / (1024.0 * 1024.0), 2);
            }
            catch { }

            return (hostCpu, processCpu, processRamMb);
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
            _currentProcess?.Dispose();
        }
    }
}