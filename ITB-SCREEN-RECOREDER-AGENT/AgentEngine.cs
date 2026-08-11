using System;
using System.Diagnostics;
using System.IO;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;
using ITBRecorderAgent.Engine;
using ITBRecorderAgent.Providers.Audio;
using ITBRecorderAgent.Providers.Video;
using ITB_SCREEN_RECORDER.Core.Models; // שימוש במודל המשותף

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
        private bool _shouldStreamActive;
        private bool _isInOfflineMode = false;
        private readonly object _stateLock = new object();

        public bool IsFfmpegActive => _ffmpegManager != null && _ffmpegManager.IsRunning;
        public bool IsCaptureInitialized => _screenCapture != null;
        public bool HasSpeakers => _audioCapture?.HasActiveLoopback ?? false;
        public bool HasMicrophone => _audioCapture?.HasActiveMicrophone ?? false;

        public AgentEngine(AppConfig config)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));

            // בניית נתיב ה-RTMP בטוח
            string rawMachineName = Environment.MachineName;
            string safeMachineName = Uri.EscapeDataString(rawMachineName.Replace(" ", "_"));
            _rtmpTarget = $"{_config.RtmpServerBaseUrl.TrimEnd('/')}/{safeMachineName}";

            // קביעת מצב הפעלה ראשוני
            _shouldStreamActive = _config.AutoStartRecordingOnLaunch;
            if (_shouldStreamActive)
            {
                Logger.Info("AutoStartRecordingOnLaunch is TRUE. Media pipelines will initialize automatically on start.");
            }
            else
            {
                Logger.Info("AutoStartRecordingOnLaunch is FALSE. Waiting for central server commands.");
            }

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

            // 2. אתחול NVML
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
                Logger.Warn($"[DIAGNOSTICS] NVIDIA NVML Native API mapping bypassed: {ex.Message}");
            }
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            // הפעלת שירות הטלמטריה
            _telemetry = new TelemetryReporter(_config.DashboardApiUrl);
            _ = Task.Run(() => _telemetry.StartReportingAsync(GetCurrentTelemetryReport, HandleServerCommand, cancellationToken), cancellationToken);

            Logger.Info("Agent Engine State Machine Ready.");
            int targetFrameTimeMs = 1000 / _config.TargetFps;

            while (!cancellationToken.IsCancellationRequested)
            {
                bool currentStreamState;
                lock (_stateLock)
                {
                    currentStreamState = _shouldStreamActive;
                }

                // ניהול מצב אופליין - מעבר לחוצץ מקומי במידה והרשת נופלת ויש דרישה לשידור
                bool requiresActivePipeline = currentStreamState || (_config.AutoStartRecordingOnLaunch && !_telemetry.IsOnline);

                if (!_telemetry.IsOnline && !_isInOfflineMode && requiresActivePipeline)
                {
                    _isInOfflineMode = true;
                    Logger.Warn("Command Channel Disconnected while active. Forcing Safe Local Offline Buffer Recording...");
                    TeardownMediaPipelines(); // שחרור הצינורות הישנים (שמכוונים ל-RTMP)
                    await Task.Delay(1000, cancellationToken).ConfigureAwait(false); // זמן התאוששות
                }
                else if (_telemetry.IsOnline && _isInOfflineMode)
                {
                    _isInOfflineMode = false;
                    Logger.Info("Command Channel Restored. Closing offline buffer.");
                    TeardownMediaPipelines(); // שחרור צינורות ההקלטה המקומית
                    await Task.Delay(1000, cancellationToken).ConfigureAwait(false);
                }

                // מצב המתנה: אין דרישה לשידור (גם לא אופליין), אז פשוט ממתינים לפקודה הבאה
                if (!requiresActivePipeline)
                {
                    await Task.Delay(1000, cancellationToken).ConfigureAwait(false);
                    continue;
                }

                // ==========================================
                // בניית הצינורות מחדש (אם נדרש)
                // ==========================================

                // 1. אתחול DXGI ללכידת מסך
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

                // 2. אתחול FFmpeg
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

                    // הזרקת פריים ראשון לאתחול צינור הווידאו
                    byte[] initialFrame = new byte[_screenCapture.Width * _screenCapture.Height * 4];
                    _ffmpegManager.WriteVideoFrame(initialFrame);

                    // המתנה לקליטת אודיו
                    bool audioConnected = await _ffmpegManager.CompleteAudioHandshakeAsync(cancellationToken).ConfigureAwait(false);
                    if (!audioConnected)
                    {
                        Logger.Error("FFmpeg audio handshake failed. Resetting pipeline...");
                        TeardownMediaPipelines();
                        await Task.Delay(2000, cancellationToken).ConfigureAwait(false);
                        continue;
                    }
                }

                // 3. אתחול WASAPI לאודיו
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

                // ==========================================
                // לכידת פריימים רציפה ושליחה
                // ==========================================
                long swStart = Stopwatch.GetTimestamp();

                if (_screenCapture.TryCaptureFrame(out byte[]? frameData) && frameData is not null)
                {
                    MouseCursorOverlay.DrawMouseToFrame(frameData, _screenCapture.Width, _screenCapture.Height);

                    if (!_ffmpegManager.WriteVideoFrame(frameData))
                    {
                        Logger.Error("Media pipe broken during frame write. Resetting pipeline.");
                        TeardownMediaPipelines();
                        continue; // מדלג ללולאה הבאה כדי לפרק ולהרכיב מחדש
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

        // ========================================================
        // מתודות עזר, טלמטריה וסנכרון
        // ========================================================

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
            try { return _cpuCounter?.NextValue() ?? 0f; }
            catch { return 0f; }
        }

        private float GetGpuUsageSafe()
        {
            if (!_isNvmlInitialized || _nvmlDeviceHandle == IntPtr.Zero) return 0f;
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

                // השרת הוא הסמכות הבלעדית! 
                // אם השרת שינה את המצב הרצוי (למשל מנהל מערכת כיבה את השידור בדשבורד)
                if (response.ShouldStream != _shouldStreamActive)
                {
                    _shouldStreamActive = response.ShouldStream;
                    Logger.Info($"[C2 COMMAND] Server enforced new streaming state: {_shouldStreamActive}");

                    // אם השרת הורה להפסיק שידור -> מפרקים את צינורות המדיה באופן מידי ובטוח
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
            // שים לב: הוצאנו את ה-lock (_stateLock) מכאן לחלוטין כדי למנוע Deadlocks.
            // אובייקטי ה-Capture שלנו מנהלים Thread-Safety עצמאית לפי התכנון.
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
            _cpuCounter?.Dispose();

            if (_isNvmlInitialized)
            {
                try { nvmlShutdown(); } catch { }
            }

            Logger.Info("Agent Core resources disposed cleanly.");
        }
    }
}