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
        // NVIDIA NVML API (P/Invoke) Direct Interop
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
            public uint Gpu;    // אחוזי עומס על הליבה הגרפית
            public uint Memory; // אחוזי עומס על בקר הזיכרון
        }

        [DllImport(NvmlDll, CallingConvention = CallingConvention.Cdecl)]
        private static extern int nvmlDeviceGetUtilizationRates(IntPtr device, out NvmlUtilization utilization);
        // ========================================================

        private readonly AppConfig _config;
        private readonly string _rtmpTarget;
        private FfmpegProcessManager? _ffmpegManager;
        private DxgiScreenCapture? _screenCapture;
        private WasapiDualMixer? _audioCapture;
        private TelemetryReporter? _telemetry;

        private PerformanceCounter? _cpuCounter;
        private IntPtr _nvmlDeviceHandle = IntPtr.Zero;
        private bool _isNvmlInitialized = false;

        private TimeSpan _serverUtcOffset = TimeSpan.Zero;
        private bool _shouldStreamActive = false;
        private bool _isInOfflineMode = false;
        private readonly object _stateLock = new object();

        public bool IsFfmpegActive => _ffmpegManager != null && _ffmpegManager.IsRunning;
        public bool IsCaptureInitialized => _screenCapture != null;
        public bool HasSpeakers => _audioCapture?.HasActiveLoopback ?? false;
        public bool HasMicrophone => _audioCapture?.HasActiveMicrophone ?? false;

        public AgentEngine(AppConfig config)
        {
            _config = config;
            string rawMachineName = Environment.MachineName;
            string safeMachineName = Uri.EscapeDataString(rawMachineName.Replace(" ", "_"));
            _rtmpTarget = $"{_config.RtmpServerBaseUrl.TrimEnd('/')}/{safeMachineName}";

            // 1. אתחול מוניטור CPU
            try
            {
                _cpuCounter = new PerformanceCounter("Processor", "% Processor Time", "_Total");
                _cpuCounter.NextValue();
                Logger.Info("[DIAGNOSTICS] CPU Performance counter initialized successfully.");
            }
            catch (Exception ex)
            {
                Logger.Warn($"[DIAGNOSTICS] CPU counter failed to initialize: {ex.Message}");
            }

            // 2. חיווט ישיר ומבצעי מול NVIDIA NVML API
            try
            {
                int initResult = nvmlInit_v2();
                if (initResult == 0) // 0 == NVML_SUCCESS
                {
                    _isNvmlInitialized = true;
                    // תפיסת כרטיס המסך הראשון במערכת (Index 0)
                    int handleResult = nvmlDeviceGetHandleByIndex_v2(0, out _nvmlDeviceHandle);
                    if (handleResult == 0)
                    {
                        Logger.Info("[DIAGNOSTICS] NVIDIA NVML Connected. Direct GPU hardware monitoring active.");
                    }
                    else
                    {
                        Logger.Warn($"[DIAGNOSTICS] NVML initialized but failed to get device handle. Code: {handleResult}");
                    }
                }
                else
                {
                    Logger.Warn($"[DIAGNOSTICS] NVIDIA NVML library found but failed to initialize. Code: {initResult}");
                }
            }
            catch (Exception ex)
            {
                Logger.Warn($"[DIAGNOSTICS] NVIDIA NVML Native API mapping bypassed (Driver missing/Non-Nvidia hardware): {ex.Message}");
            }
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            _telemetry = new TelemetryReporter(_config.DashboardApiUrl);
            _ = _telemetry.StartReportingAsync(GetCurrentTelemetryReport, HandleServerCommand, cancellationToken);

            Logger.Info("Agent Engine State Machine Ready. Waiting for Server activation command...");
            int targetFrameTimeMs = 1000 / _config.TargetFps;

            while (!cancellationToken.IsCancellationRequested)
            {
                bool dynamicStreamingState;
                lock (_stateLock)
                {
                    dynamicStreamingState = _shouldStreamActive;
                }

                // 💡 בדיקת מדיניות הפעלה: הקלטה באופליין תופעל רק אם הוגדר AutoStart מראש או שהייתה הקלטה פעילה מהשרת
                bool shouldBeActive = dynamicStreamingState || (_config.AutoStartRecordingOnLaunch && !_telemetry.IsOnline);

                if (!_telemetry.IsOnline && !_isInOfflineMode && shouldBeActive)
                {
                    _isInOfflineMode = true;
                    Logger.Warn("Command Channel Disconnected while active. Forcing Safe Local Offline Buffer Recording...");
                    TeardownMediaPipelines();
                }
                else if (_telemetry.IsOnline && _isInOfflineMode)
                {
                    _isInOfflineMode = false;
                    Logger.Info("Command Channel Restored. Closing offline buffer.");
                    TeardownMediaPipelines();
                }

                // אם השרת לא אישר הקלטה ואין הגדרת AutoStart - ה-Agent נשאר במצב Idle חסכוני במשאבים
                if (!dynamicStreamingState && !_isInOfflineMode)
                {
                    await Task.Delay(1000, cancellationToken).ConfigureAwait(false);
                    continue;
                }

                // --- [שלב 1: אתחול מנוע לכידת המסך (DXGI)] ---
                if (_screenCapture == null)
                {
                    try
                    {
                        _screenCapture = new DxgiScreenCapture();
                        _screenCapture.Initialize();
                    }
                    catch (Exception ex)
                    {
                        Logger.Error($"Failed to initialize DXGI Screen Capture: {ex.Message}");
                        await Task.Delay(1000, cancellationToken).ConfigureAwait(false);
                        continue;
                    }
                }

                // --- [שלב 2: הזנקת תהליך FFmpeg והתרת ה-Deadlock] ---
                if (_ffmpegManager == null || !_ffmpegManager.IsRunning)
                {
                    DateTime calibratedTime = DateTime.UtcNow + _serverUtcOffset;
                    string destination = _isInOfflineMode ? GetLocalBufferPath(calibratedTime) : _rtmpTarget;

                    _ffmpegManager = new FfmpegProcessManager(_config);

                    int sampleRate = 48000;
                    int channels = 2;
                    string fmt = "f32le";

                    bool started = await _ffmpegManager.StartAsync(
                        destination,
                        calibratedTime,
                        _screenCapture.Width,
                        _screenCapture.Height,
                        sampleRate,
                        channels,
                        fmt,
                        cancellationToken).ConfigureAwait(false);

                    if (!started)
                    {
                        Logger.Error("Failed to launch FFmpeg process.");
                        TeardownMediaPipelines();
                        await Task.Delay(2000, cancellationToken).ConfigureAwait(false);
                        continue;
                    }

                    // הזרקת פריים וידאו ראשוני משחררת את FFmpeg מלהיתקע ב-pipe:0
                    byte[] initialFrame = new byte[_screenCapture.Width * _screenCapture.Height * 4];
                    _ffmpegManager.WriteVideoFrame(initialFrame);

                    // השלמת ה-Handshake של ערוץ השמע דרך ה-TCP Loopback המקומי
                    bool audioConnected = await _ffmpegManager.CompleteAudioHandshakeAsync(cancellationToken).ConfigureAwait(false);
                    if (!audioConnected)
                    {
                        Logger.Error("FFmpeg audio handshake failed. Resetting pipeline...");
                        TeardownMediaPipelines();
                        await Task.Delay(2000, cancellationToken).ConfigureAwait(false);
                        continue;
                    }
                }

                // --- [שלב 3: הפעלת מיקסר האודיו (WASAPI)] ---
                if (_audioCapture == null)
                {
                    try
                    {
                        _audioCapture = new WasapiDualMixer();
                        _audioCapture.Initialize();
                        _audioCapture.AudioDataAvailable += (s, data) =>
                        {
                            _ffmpegManager?.WriteAudioData(data);
                        };
                        _audioCapture.Start();
                    }
                    catch (Exception ex)
                    {
                        Logger.Error($"Failed to initialize Audio Mixer: {ex.Message}");
                    }
                }

                // --- [שלב 4: לכידת פריים, הזרקת סמן העכבר ושליחה ל-FFmpeg] ---
                long swStart = Stopwatch.GetTimestamp();

                if (_screenCapture.TryCaptureFrame(out byte[]? frameData) && frameData is not null)
                {
                    // הזרקת סמן העכבר המדויק לתוך מערך הפיקסלים הגולמי של הפריים
                    MouseCursorOverlay.DrawMouseToFrame(frameData, _screenCapture.Width, _screenCapture.Height);

                    if (!_ffmpegManager.WriteVideoFrame(frameData))
                    {
                        Logger.Error("Media pipe broken. Resetting pipeline for next command cycle.");
                        TeardownMediaPipelines();
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
            float cpuVal = 0;
            float gpuVal = 0;

            // 1. דגימת CPU
            try { cpuVal = _cpuCounter?.NextValue() ?? 0; } catch { }

            // 2. דגימת GPU ישירות מתוך הדרייבר של NVIDIA בזמן אמת
            if (_isNvmlInitialized && _nvmlDeviceHandle != IntPtr.Zero)
            {
                try
                {
                    int res = nvmlDeviceGetUtilizationRates(_nvmlDeviceHandle, out NvmlUtilization utilization);
                    if (res == 0)
                    {
                        gpuVal = utilization.Gpu;
                    }
                }
                catch { }
            }

            return new AgentTelemetryReport
            {
                Hostname = Environment.MachineName,
                IpAddress = "127.0.0.1",
                IsProcessRunning = IsFfmpegActive,
                IsScreenCapturing = IsCaptureInitialized,
                HasActiveSpeakers = HasSpeakers,
                HasActiveMicrophone = HasMicrophone,
                Status = IsFfmpegActive ? AgentStatus.Streaming : AgentStatus.Standby,
                ClientTimestamp = DateTime.UtcNow,
                CpuUsagePercentage = (float)Math.Round(cpuVal, 2),
                GpuUsagePercentage = (float)Math.Round(gpuVal, 2)
            };
        }

        private void HandleServerCommand(AgentHeartbeatResponse response)
        {
            lock (_stateLock)
            {
                _serverUtcOffset = response.ServerTime - DateTime.UtcNow;

                if (response.ShouldStream != _shouldStreamActive)
                {
                    _shouldStreamActive = response.ShouldStream;
                    Logger.Info($"[C2 COMMAND] Streaming desired state shifted to: {_shouldStreamActive}");

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
                ? @"C:\ProgramData\ITB-SCREEN-RECORDER\Buffer"
                : _config.LocalBufferPath;

            Directory.CreateDirectory(bufferDir);
            return Path.Combine(bufferDir, $"{Environment.MachineName}_{time:yyyyMMdd_HHmmss}.flv");
        }

        private void TeardownMediaPipelines()
        {
            lock (_stateLock)
            {
                if (_audioCapture != null)
                {
                    _audioCapture.Stop();
                    _audioCapture.Dispose();
                    _audioCapture = null;
                }

                _ffmpegManager?.Dispose();
                _ffmpegManager = null;

                _screenCapture?.Dispose();
                _screenCapture = null;
            }
            Logger.Info("Media pipelines dismantled cleanly.");
        }

        public void Dispose()
        {
            _telemetry?.Dispose();
            TeardownMediaPipelines();

            _cpuCounter?.Dispose();

            // סגירה נקייה של ספריית NVIDIA NVML
            if (_isNvmlInitialized)
            {
                try { nvmlShutdown(); } catch { }
            }

            Logger.Info("Agent Core resources disposed cleanly.");
        }
    }
}