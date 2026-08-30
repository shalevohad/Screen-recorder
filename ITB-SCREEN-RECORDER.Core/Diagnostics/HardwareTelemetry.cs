using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using ITB_SCREEN_RECORDER.Core.Common;

namespace ITB_SCREEN_RECORDER.Core.Diagnostics
{
    internal static class NativeMethods
    {
        [StructLayout(LayoutKind.Sequential)]
        public struct MEMORYSTATUSEX
        {
            public uint dwLength;
            public uint dwMemoryLoad;
            public ulong ullTotalPhys;
            public ulong ullAvailPhys;
            public ulong ullTotalPageFile;
            public ulong ullAvailPageFile;
            public ulong ullTotalVirtual;
            public ulong ullAvailVirtual;
            public ulong ullAvailExtendedVirtual;

            public MEMORYSTATUSEX()
            {
                dwLength = (uint)Marshal.SizeOf(typeof(MEMORYSTATUSEX));
            }
        }

        [StructLayout(LayoutKind.Sequential)]
        public struct FILETIME
        {
            public uint dwLowDateTime;
            public uint dwHighDateTime;
            public ulong ToInt64() => ((ulong)dwHighDateTime << 32) + dwLowDateTime;
        }

        [DllImport("kernel32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        [return: MarshalAs(UnmanagedType.Bool)]
        public static extern bool GlobalMemoryStatusEx(ref MEMORYSTATUSEX lpBuffer);

        [DllImport("kernel32.dll", SetLastError = true)]
        [return: MarshalAs(UnmanagedType.Bool)]
        public static extern bool GetSystemTimes(out FILETIME lpIdleTime, out FILETIME lpKernelTime, out FILETIME lpUserTime);
    }

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

        // משתנים למעקב CPU מארח (Windows)
        private ulong _prevSysIdle = 0;
        private ulong _prevSysKernel = 0;
        private ulong _prevSysUser = 0;

        // משתנים למעקב CPU מארח (Linux)
        private ulong _prevIdleTime = 0;
        private ulong _prevTotalTime = 0;

        private DateTime _lastCpuSampleTime;
        private TimeSpan _lastTotalProcessorTime;
        private readonly Process _currentProcess;

        // 💡 Performance Counters לאיסוף עומס GPU כללי (תומך ב-Intel / AMD / Nvidia ב-Windows)
        private PerformanceCounter? _gpuEngineCounter;
        private bool _isPerfCounterInitialized = false;

        public HardwareTelemetry()
        {
            _currentProcess = Process.GetCurrentProcess();
            _lastCpuSampleTime = DateTime.UtcNow;
            _lastTotalProcessorTime = _currentProcess.TotalProcessorTime;

            InitializeNvml();
            InitializeGenericGpuCounter();
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
                        Logger.Info("[TELEMETRY] NVIDIA NVML loaded successfully.");
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.Warn($"[TELEMETRY] NVML not available (Non-NVIDIA system or missing driver): {ex.Message}");
            }
        }

        private void InitializeGenericGpuCounter()
        {
            if (!OperatingSystem.IsWindows()) return;

            try
            {
#pragma warning disable CA1416
                // בדיקה האם קיימת קטגוריית מונה GPU Generic במערכת
                if (PerformanceCounterCategory.Exists("GPU Engine"))
                {
                    var category = new PerformanceCounterCategory("GPU Engine");
                    var instanceNames = category.GetInstanceNames();
                    // חיפוש מנוע רינדור פעיל כלשהו (3D)
                    var targetInstance = instanceNames.FirstOrDefault(n => n.Contains("engtype_3D") || n.Contains("engtype_Render"));

                    if (!string.IsNullOrEmpty(targetInstance))
                    {
                        _gpuEngineCounter = new PerformanceCounter("GPU Engine", "Utilization Percentage", targetInstance, true);
                        _isPerfCounterInitialized = true;
                        Logger.Info("[TELEMETRY] Generic GPU Performance Counter initialized successfully.");
                    }
                }
#pragma warning restore CA1416
            }
            catch (Exception ex)
            {
                Logger.Warn($"[TELEMETRY] Failed to initialize generic GPU counter: {ex.Message}");
            }
        }

        public (float Gpu3D, float GpuNvenc) GetGpuUsage()
        {
            float gpu3D = 0f;
            float nvenc = 0f;

            // 1. נסה לקרוא קודם דרך NVIDIA NVML אם קיים
            if (_isNvmlInitialized && _nvmlDeviceHandle != IntPtr.Zero)
            {
                try
                {
                    if (_getUtilization != null && _getUtilization(_nvmlDeviceHandle, out NvmlUtilization util) == 0)
                        gpu3D = util.Gpu;

                    if (_getEncoderUtilization != null && _getEncoderUtilization(_nvmlDeviceHandle, out uint encUtil, out _) == 0)
                        nvenc = encUtil;

                    return (gpu3D, nvenc);
                }
                catch { }
            }

            // 2. אם אין NVIDIA, נסה לקרוא דרך ה-Generic Performance Counter (מתאים ל-Intel / AMD)
            if (_isPerfCounterInitialized && _gpuEngineCounter != null)
            {
                try
                {
#pragma warning disable CA1416
                    gpu3D = _gpuEngineCounter.NextValue();
#pragma warning restore CA1416
                }
                catch { }
            }

            return (Math.Clamp((float)Math.Round(gpu3D, 2), 0f, 100f), nvenc);
        }

        public (float HostCpu, float ProcessCpu, float ProcessRamMb, float HostRamPct, float HostTotalRamMb) GetSystemUsage()
        {
            DateTime now = DateTime.UtcNow;
            double elapsedSeconds = (now - _lastCpuSampleTime).TotalSeconds;

            float hostCpu = 0f;
            if (OperatingSystem.IsWindows())
            {
                hostCpu = ReadWindowsCpuUsage();
            }
            else if (OperatingSystem.IsLinux())
            {
                hostCpu = ReadLinuxCpuUsage();
            }

            float processCpu = 0f;
            float processRamMb = 0f;
            float hostRamPct = 0f;
            float hostTotalRamMb = 0f;

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

                if (OperatingSystem.IsWindows())
                {
#pragma warning disable CA1416
                    var memStatus = new NativeMethods.MEMORYSTATUSEX();
                    if (NativeMethods.GlobalMemoryStatusEx(ref memStatus))
                    {
                        hostTotalRamMb = (float)Math.Round(memStatus.ullTotalPhys / (1024.0 * 1024.0), 2);
                        hostRamPct = memStatus.dwMemoryLoad;
                    }
#pragma warning restore CA1416
                }
                else if (OperatingSystem.IsLinux())
                {
                    if (File.Exists("/proc/meminfo"))
                    {
                        var lines = File.ReadLines("/proc/meminfo").Take(3).ToList();
                        ulong memTotalKb = 0, memAvailableKb = 0;

                        foreach (var line in lines)
                        {
                            if (line.StartsWith("MemTotal:")) memTotalKb = ulong.Parse(new string(line.Where(char.IsDigit).ToArray()));
                            if (line.StartsWith("MemAvailable:")) memAvailableKb = ulong.Parse(new string(line.Where(char.IsDigit).ToArray()));
                        }

                        if (memTotalKb > 0)
                        {
                            hostTotalRamMb = (float)Math.Round(memTotalKb / 1024.0, 2);
                            hostRamPct = (float)Math.Round((1.0 - ((double)memAvailableKb / memTotalKb)) * 100.0, 2);
                        }
                    }
                }
            }
            catch { }

            return (hostCpu, processCpu, processRamMb, hostRamPct, hostTotalRamMb);
        }

        private float ReadWindowsCpuUsage()
        {
            try
            {
#pragma warning disable CA1416
                if (NativeMethods.GetSystemTimes(out var idleTime, out var kernelTime, out var userTime))
                {
                    ulong idle = idleTime.ToInt64();
                    ulong kernel = kernelTime.ToInt64();
                    ulong user = userTime.ToInt64();

                    ulong sysIdleDiff = idle - _prevSysIdle;
                    ulong sysKernelDiff = kernel - _prevSysKernel;
                    ulong sysUserDiff = user - _prevSysUser;

                    _prevSysIdle = idle;
                    _prevSysKernel = kernel;
                    _prevSysUser = user;

                    ulong sysTotal = sysKernelDiff + sysUserDiff;
                    if (sysTotal == 0) return 0f;

                    ulong sysCpuTotal = sysTotal - sysIdleDiff;
                    float cpuUsage = (float)((double)sysCpuTotal / sysTotal * 100.0);
                    return Math.Clamp((float)Math.Round(cpuUsage, 2), 0f, 100f);
                }
#pragma warning restore CA1416
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

            _gpuEngineCounter?.Dispose();
            _currentProcess?.Dispose();
        }
    }
}