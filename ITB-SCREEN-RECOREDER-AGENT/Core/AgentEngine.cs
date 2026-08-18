using System;
using System.Diagnostics;
using System.IO;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;
using ITBRecorderAgent.Engine;
using ITBRecorderAgent.Providers.Audio;
using ITBRecorderAgent.Providers.Video;
using ITB_SCREEN_RECORDER.Core.Models;

namespace ITBRecorderAgent.Core
{
    public class AgentEngine : IDisposable
    {
        // ========================================================
        // NVIDIA NVML API (P/Invoke) Direct Interop (Windows Only Guarded)
        // ========================================================
        private const string NvmlDll = "nvml.dll";

        [DllImport(NvmlDll, CallingConvention = CallingConvention.Cdecl)]
        private static extern int nvmlInit_v2();

        [DllImport(NvmlDll, CallingConvention = CallingConvention.Cdecl)]
        private static extern int nvmlShutdown();

        [DllImport(NvmlDll, CallingConvention = CallingConvention.Cdecl)]
        private static extern int nvmlDeviceGetHandleByIndex_v2(uint index, out IntPtr device);

        [StructLayout(LayoutKind.Sequential)]
        private struct NvmlUtilization
        {
            public uint Gpu;
            public uint Memory;
        }

        [DllImport(NvmlDll, CallingConvention = CallingConvention.Cdecl)]
        private static extern int nvmlDeviceGetUtilizationRates(IntPtr device, out NvmlUtilization utilization);
        // ========================================================

        private readonly AppConfig _config;
        private readonly string _rtmpTarget;
        private FfmpegProcessManager? _ffmpegManager;

        private IScreenCaptureProvider? _screenCapture;
        private IAudioCaptureProvider? _audioCapture;

        private TelemetryReporter? _telemetry;
        private PerformanceCounter? _cpuCounter;
        private IntPtr _nvmlDeviceHandle = IntPtr.Zero;
        private bool _isNvmlInitialized = false;

        private TimeSpan _serverUtcOffset = TimeSpan.Zero;
        private bool _shouldStreamActive;
        private bool _isInOfflineMode = false;
        private readonly object _stateLock = new object();
        private byte[]? _lastVideoFrame; // חוצץ זיכרון פריים למניעת הרעבה (Frame Padding)

        public bool IsFfmpegActive => _ffmpegManager != null && _ffmpegManager.IsRunning;
        public bool IsCaptureInitialized => _screenCapture != null;
        public bool HasSpeakers => _audioCapture?.HasActiveLoopback ?? false;
        public bool HasMicrophone => _audioCapture?.HasActiveMicrophone ?? false;

        public AgentEngine(AppConfig config)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));

            string rawMachineName = Environment.MachineName;
            string safeMachineName = Uri.EscapeDataString(rawMachineName.Replace(" ", "_"));
            _rtmpTarget = $"{_config.RtmpServerBaseUrl.TrimEnd('/')}/{safeMachineName}";

            _shouldStreamActive = _config.AutoStartRecordingOnLaunch;

            if (OperatingSystem.IsWindows())
            {
                try
                {
                    _cpuCounter = new PerformanceCounter("Processor", "% Processor Time", "_Total");
                    _cpuCounter.NextValue();
                }
                catch { }

                try
                {
                    if (nvmlInit_v2() == 0)
                    {
                        _isNvmlInitialized = true;
                        nvmlDeviceGetHandleByIndex_v2(0, out _nvmlDeviceHandle);
                    }
                }
                catch { }
            }
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            _telemetry = new TelemetryReporter(_config.DashboardApiUrl);
            _ = Task.Run(() => _telemetry.StartReportingAsync(GetCurrentTelemetryReport, HandleServerCommand, cancellationToken), cancellationToken);

            Logger.Info("Agent Engine State Machine Ready (Cross-Platform TCP).");
            int targetFrameTimeMs = 1000 / _config.TargetFps;

            while (!cancellationToken.IsCancellationRequested)
            {
                bool currentStreamState;
                lock (_stateLock)
                {
                    currentStreamState = _shouldStreamActive;
                }

                bool requiresActivePipeline = currentStreamState || (_config.AutoStartRecordingOnLaunch && !_telemetry.IsOnline);

                if (!_telemetry.IsOnline && !_isInOfflineMode && requiresActivePipeline)
                {
                    _isInOfflineMode = true;
                    Logger.Warn("Command Channel Disconnected. Forcing Local Offline Buffer...");
                    TeardownMediaPipelines();
                    await Task.Delay(1000, cancellationToken).ConfigureAwait(false);
                }
                else if (_telemetry.IsOnline && _isInOfflineMode)
                {
                    _isInOfflineMode = false;
                    Logger.Info("Command Channel Restored. Closing offline buffer.");
                    TeardownMediaPipelines();
                    await Task.Delay(1000, cancellationToken).ConfigureAwait(false);
                }

                if (!requiresActivePipeline)
                {
                    await Task.Delay(1000, cancellationToken).ConfigureAwait(false);
                    continue;
                }

                // 1. אתחול מודול לכידת מסך
                if (_screenCapture == null)
                {
                    try
                    {
                        _screenCapture = ScreenCaptureFactory.Create();
                        _screenCapture.Initialize();
                    }
                    catch (Exception ex)
                    {
                        Logger.Error($"Failed to initialize Screen Capture: {ex.Message}");
                        await Task.Delay(1000, cancellationToken).ConfigureAwait(false);
                        continue;
                    }
                }

                // 2. [שינוי סדר קריטי] אתחול והפעלת ה-Audio Provider *לפני* הזרקת ה-FFmpeg
                if (_audioCapture == null)
                {
                    try
                    {
                        _audioCapture = AudioCaptureFactory.Create();
                        _audioCapture.Initialize();
                        _audioCapture.AudioDataAvailable += (s, data) =>
                        {
                            _ffmpegManager?.WriteAudioData(data);
                        };
                        _audioCapture.Start();

                        // השהייה קלה לייצוב זרם הסאונד הגולמי בזיכרון
                        await Task.Delay(100, cancellationToken).ConfigureAwait(false);
                    }
                    catch (Exception ex)
                    {
                        Logger.Error($"Failed to initialize Audio Mixer: {ex.Message}");
                    }
                }

                // 3. אתחול מנהל ה-FFmpeg וביצוע לחיצת יד של ה-TCP
                if (_ffmpegManager == null || !_ffmpegManager.IsRunning)
                {
                    DateTime calibratedTime = DateTime.UtcNow + _serverUtcOffset;
                    string destination = _isInOfflineMode ? GetLocalBufferPath(calibratedTime) : _rtmpTarget;

                    _ffmpegManager = new FfmpegProcessManager(_config);
                    _lastVideoFrame = null;

                    bool started = await _ffmpegManager.StartAsync(
                        destination,
                        calibratedTime,
                        _screenCapture.Width,
                        _screenCapture.Height,
                        48000,
                        2,
                        "f32le",
                        cancellationToken).ConfigureAwait(false);

                    if (!started)
                    {
                        TeardownMediaPipelines();
                        await Task.Delay(2000, cancellationToken).ConfigureAwait(false);
                        continue;
                    }

                    // הזרקת פריים ראשוני לפתיחת ה-Pipeline של וידאו Stdin
                    byte[] initialFrame = new byte[_screenCapture.Width * _screenCapture.Height * 4];
                    _ffmpegManager.WriteVideoFrame(initialFrame);

                    // השלמת חיבור ה-TCP - עכשיו יעבור מיד עקב קיום סאונד מוכן
                    bool audioConnected = await _ffmpegManager.CompleteAudioHandshakeAsync(cancellationToken).ConfigureAwait(false);
                    if (!audioConnected)
                    {
                        TeardownMediaPipelines();
                        await Task.Delay(2000, cancellationToken).ConfigureAwait(false);
                        continue;
                    }
                }

                // ==========================================
                // לכידת מסך רציפה (Frame Padding Active)
                // ==========================================
                long swStart = Stopwatch.GetTimestamp();
                byte[]? currentFrame = null;

                if (_screenCapture.TryCaptureFrame(out byte[]? frameData) && frameData is not null)
                {
                    _lastVideoFrame = frameData;
                    currentFrame = frameData;
                }
                else if (_lastVideoFrame != null)
                {
                    currentFrame = _lastVideoFrame;
                }

                if (currentFrame != null)
                {
                    byte[] frameToWrite = new byte[currentFrame.Length];
                    Buffer.BlockCopy(currentFrame, 0, frameToWrite, 0, currentFrame.Length);

                    #if WINDOWS
                    if (OperatingSystem.IsWindows())
                    {
                        MouseCursorOverlay.DrawMouseToFrame(frameToWrite, _screenCapture.Width, _screenCapture.Height);
                    }
                    #endif

                    if (!_ffmpegManager.WriteVideoFrame(frameToWrite))
                    {
                        Logger.Error("Media pipe broken during frame write. Resetting pipeline.");
                        TeardownMediaPipelines();
                        continue;
                    }
                }

                long elapsedMs = (long)Stopwatch.GetElapsedTime(swStart).TotalMilliseconds;
                int delay = targetFrameTimeMs - (int)elapsedMs;

                if (delay > 0)
                {
                    await Task.Delay(delay, cancellationToken).ConfigureAwait(false);
                }
            }
        }

        private AgentTelemetryReport GetCurrentTelemetryReport()
        {
            AgentStatus currentStatus = AgentStatus.Standby;

            bool currentStreamState;
            lock (_stateLock)
            {
                currentStreamState = _shouldStreamActive;
            }

            if (_isInOfflineMode) currentStatus = AgentStatus.Error;
            else if (currentStreamState) currentStatus = AgentStatus.Streaming;

            return new AgentTelemetryReport
            {
                Hostname = Environment.MachineName,
                IpAddress = GetLocalIpAddress(),
                Status = currentStatus,
                ClientTimestamp = DateTime.UtcNow,
                Timestamp = DateTime.UtcNow,

                IsProcessRunning = true,
                IsScreenCapturing = IsFfmpegActive,

                HasActiveSpeakers = HasSpeakers,
                HasActiveMicrophone = HasMicrophone,

                CpuUsagePercentage = GetCpuUsageSafe(),
                GpuUsagePercentage = GetGpuUsageSafe(),

                IsStreaming = currentStreamState
            };
        }

        private float GetCpuUsageSafe()
        {
            if (!OperatingSystem.IsWindows()) return 0f;
            try { return _cpuCounter?.NextValue() ?? 0f; }
            catch { return 0f; }
        }

        private float GetGpuUsageSafe()
        {
            if (!OperatingSystem.IsWindows() || !_isNvmlInitialized || _nvmlDeviceHandle == IntPtr.Zero) return 0f;
            try
            {
                int res = nvmlDeviceGetUtilizationRates(_nvmlDeviceHandle, out NvmlUtilization utilization);
                return res == 0 ? utilization.Gpu : 0f;
            }
            catch { return 0f; }
        }

        private string GetLocalIpAddress()
        {
            try
            {
                using var socket = new System.Net.Sockets.Socket(System.Net.Sockets.AddressFamily.InterNetwork, System.Net.Sockets.SocketType.Dgram, 0);
                socket.Connect("8.8.8.8", 65530);
                var endPoint = socket.LocalEndPoint as System.Net.IPEndPoint;
                return endPoint?.Address.ToString() ?? "127.0.0.1";
            }
            catch { return "127.0.0.1"; }
        }

        private void HandleServerCommand(AgentHeartbeatResponse response)
        {
            if (response == null) return;

            lock (_stateLock)
            {
                _serverUtcOffset = response.ServerTime - DateTime.UtcNow;

                if (response.ShouldStream != _shouldStreamActive)
                {
                    _shouldStreamActive = response.ShouldStream;
                    Logger.Info($"[C2 COMMAND] Server enforced new streaming state: {_shouldStreamActive}");

                    if (!_shouldStreamActive)
                    {
                        Task.Run(() => TeardownMediaPipelines());
                    }
                }
            }
        }

        private string GetLocalBufferPath(DateTime time)
        {
            string bufferDir = string.IsNullOrWhiteSpace(_config.LocalBufferPath)
                ? (OperatingSystem.IsWindows() ? @"C:\ProgramData\ITB-SCREEN-RECORDER\Buffer" : "/tmp/itb_buffer/")
                : _config.LocalBufferPath;

            Directory.CreateDirectory(bufferDir);
            return Path.Combine(bufferDir, $"{Environment.MachineName}_{time:yyyyMMdd_HHmmss}.flv");
        }

        private void TeardownMediaPipelines()
        {
            try
            {
                if (_audioCapture != null)
                {
                    _audioCapture.Stop();
                    _audioCapture.Dispose();
                    _audioCapture = null;
                }

                if (_ffmpegManager != null)
                {
                    _ffmpegManager.Dispose();
                    _ffmpegManager = null;
                }

                if (_screenCapture != null)
                {
                    _screenCapture.Dispose();
                    _screenCapture = null;
                }

                _lastVideoFrame = null;
                Logger.Info("Media pipelines dismantled cleanly.");
            }
            catch (Exception ex)
            {
                Logger.Error($"Error during TeardownMediaPipelines: {ex.Message}");
            }
        }

        public void Dispose()
        {
            TeardownMediaPipelines();

            if (OperatingSystem.IsWindows())
            {
                _cpuCounter?.Dispose();
                if (_isNvmlInitialized)
                {
                    try { nvmlShutdown(); } catch { }
                }
            }

            Logger.Info("Agent Core resources disposed cleanly.");
        }
    }
}