using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Core.Diagnostics;
using ITB_SCREEN_RECORDER.Core.Ipc;
using ITBRecorderAgent.Engine;
using ITBRecorderAgent.Providers.Audio;
using ITBRecorderAgent.Providers.Video;
using System;
using System.Diagnostics;
using System.IO;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.AgentWorker
{
    public class WorkerEngine
    {
        private static class WindowsNative
        {
            [DllImport("winmm.dll", EntryPoint = "timeBeginPeriod")] public static extern uint TimeBeginPeriod(uint ms);
            [DllImport("winmm.dll", EntryPoint = "timeEndPeriod")] public static extern uint TimeEndPeriod(uint ms);
        }

        private readonly SemaphoreSlim _permission = new SemaphoreSlim(0, 1);
        private readonly AppConfig _config;
        private readonly NetworkTelemetry _netTelemetry = new NetworkTelemetry();
        private readonly WorkerIpcClient _ipc = new WorkerIpcClient();

        private volatile bool _isStreaming = false;
        private volatile bool _requiresRestart = false;
        private volatile bool _isOffline = false;
        private string _targetRtmp = string.Empty;
        private TimeSpan _serverUtcOffset = TimeSpan.Zero;
        private int _baselineFps;
        private string _videoBitrate;

        // חותמת זמן קבועה של תחילת ההקלטה
        private DateTime? _sessionStartTimeUtc = null;

        private VideoPipeline? _videoPipe;
        private AudioPacer? _audioPacer;
        private IAudioCaptureProvider? _audioCapture;

        public WorkerEngine(AppConfig config)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));
            _baselineFps = config.TargetFps > 0 ? config.TargetFps : 30;
            _videoBitrate = string.IsNullOrWhiteSpace(config.VideoBitrate) ? "5000k" : config.VideoBitrate;

            Logger.Info($"[WORKER:LIFECYCLE] Engine created. TargetFPS: {_baselineFps}, VideoBitrate: {_videoBitrate}");
            WireIpcEvents();
        }

        private void WireIpcEvents()
        {
            _ipc.StartRequested += (dest, offset, fps, bitrate) =>
            {
                Logger.Info($"[WORKER:IPC] START_COMMAND received -> Dest: '{dest}', ServerOffsetTicks: {offset.Ticks}, Fps: {fps}, Bitrate: {bitrate}");
                if (!string.IsNullOrWhiteSpace(dest)) _targetRtmp = dest;
                _serverUtcOffset = offset;
                _baselineFps = fps > 0 ? fps : _baselineFps;
                _videoBitrate = !string.IsNullOrWhiteSpace(bitrate) ? bitrate : _videoBitrate;

                if (!_isStreaming)
                {
                    _sessionStartTimeUtc = DateTime.UtcNow;
                }

                _isStreaming = true;
                if (_permission.CurrentCount == 0) _permission.Release();
            };

            _ipc.StopRequested += () =>
            {
                Logger.Info("[WORKER:IPC] STOP_COMMAND received from supervisor. Pausing transmission.");
                _isStreaming = false;
                _sessionStartTimeUtc = null;
            };

            // תיקון: קליטה והחלה מיידית של שינויי FPS ו-Bitrate על-חם
            _ipc.RestartRequested += (dest, offset, fps, bitrate) =>
            {
                Logger.Info($"[WORKER:IPC] RESTART_COMMAND received -> Dest: '{dest}', Fps: {fps}, Bitrate: {bitrate}");
                if (!string.IsNullOrWhiteSpace(dest)) _targetRtmp = dest;
                _serverUtcOffset = offset;
                _baselineFps = fps > 0 ? fps : _baselineFps;
                _videoBitrate = !string.IsNullOrWhiteSpace(bitrate) ? bitrate : _videoBitrate;

                _isStreaming = true;
                _requiresRestart = true;
                if (_permission.CurrentCount == 0) _permission.Release();
            };

            _ipc.CaptureFpsRequested += fps => _videoPipe?.SetCaptureFps(fps, _baselineFps);

            _ipc.ServerDisconnected += () =>
            {
                if (!_isOffline && _isStreaming)
                {
                    Logger.Warn("[WORKER:LIFECYCLE] Server connection dropped. Switching to ISOLATED_OFFLINE_BUFFER mode.");
                    _isOffline = true;
                    _requiresRestart = true;
                }
            };

            _ipc.ServerConnected += () =>
            {
                if (_isOffline && _isStreaming)
                {
                    Logger.Info("[WORKER:LIFECYCLE] Server connection restored. Restoring LIVE_RTMP transmission.");
                    _isOffline = false;
                    _requiresRestart = true;
                }
            };
        }

        public async Task RunAsync(CancellationToken ct)
        {
            DebugHelper.ApplyConsoleVisibility();

            if (OperatingSystem.IsWindows())
            {
                try
                {
                    Process.GetCurrentProcess().PriorityClass = ProcessPriorityClass.High;
                    Thread.CurrentThread.Priority = ThreadPriority.Highest;
                    WindowsNative.TimeBeginPeriod(1);
                    Logger.Info("[WORKER:LIFECYCLE] Process/Thread priority set to High. WinMM 1ms timer period applied.");
                }
                catch (Exception ex)
                {
                    Logger.Warn($"[WORKER:LIFECYCLE] Failed to set real-time priority: {ex.Message}");
                }
            }

            using var guard = SessionGuardFactory.Create(() =>
            {
                if (_isStreaming)
                {
                    Logger.Info("[WORKER:SESSION] Triggering session restoration restart.");
                    _requiresRestart = true;
                }
            });

            _ = _ipc.RunAsync(BuildTelemetrySnapshot, ct);

            try
            {
                while (!ct.IsCancellationRequested)
                {
                    if (!_isStreaming)
                    {
                        Logger.Info("[WORKER:LIFECYCLE] In Standby. Awaiting stream start permission...");
                        await _permission.WaitAsync(ct).ConfigureAwait(false);
                    }

                    if (ct.IsCancellationRequested) break;

                    _requiresRestart = false;
                    await RunStreamingSessionAsync(guard, ct).ConfigureAwait(false);
                }
            }
            finally
            {
                if (OperatingSystem.IsWindows())
                {
                    try { WindowsNative.TimeEndPeriod(1); } catch { }
                }
                Logger.Info("[WORKER:LIFECYCLE] Engine shutdown sequence completed.");
            }
        }

        private async Task RunStreamingSessionAsync(ISessionGuard guard, CancellationToken ct)
        {
            Logger.Info("[WORKER:LIFECYCLE] Initializing hardware capture providers...");
            using var screen = ScreenCaptureFactory.Create();
            screen.Initialize();
            Logger.Info($"[WORKER:LIFECYCLE] Screen capture provider ready ({screen.Width}x{screen.Height}).");

            using var audio = AudioCaptureFactory.Create();
            audio.Initialize();
            audio.Start();
            _audioCapture = audio;
            Logger.Info("[WORKER:LIFECYCLE] Audio capture provider initialized and started.");

            using var ffmpeg = new FfmpegProcessManager(_config);
            _videoPipe = new VideoPipeline(screen.Width, screen.Height, _baselineFps);
            _audioPacer = new AudioPacer();

            bool sessionActive = true;

            // אתחול פריים בסיס ריק למניעת הזנות Null לצינור הווידאו
            byte[]? latestFrame = new byte[screen.Width * screen.Height * 4];

            audio.AudioDataAvailable += (s, data) =>
            {
                if (ffmpeg.IsRunning && sessionActive)
                {
                    ffmpeg.WriteAudioData(data);
                    _audioPacer.RecordIncomingBytes(data.Length);
                    _netTelemetry.TrackMediaBytes(data.Length);
                }
            };

            string destination = ResolveDestination();
            Logger.Info($"[WORKER:LIFECYCLE] Launching FFmpeg native process -> Destination: {destination}");

            bool started = await ffmpeg.StartAsync(destination, DateTime.UtcNow + _serverUtcOffset,
                screen.Width, screen.Height, 48000, 2, "f32le", _baselineFps, _videoBitrate, ct).ConfigureAwait(false);

            if (!started)
            {
                Logger.Error("[WORKER:LIFECYCLE] FFmpeg failed to launch. Aborting session.");
                _isStreaming = false;
                _sessionStartTimeUtc = null;
                return;
            }

            var handshakeTask = ffmpeg.CompleteAudioHandshakeAsync(ct);
            _ = Task.Run(() => ffmpeg.WriteVideoFrame(new byte[screen.Width * screen.Height * 4]), ct);

            if (!await handshakeTask.ConfigureAwait(false))
            {
                Logger.Error("[WORKER:LIFECYCLE] TCP loopback audio handshake timed out. Halting session.");
                _isStreaming = false;
                _sessionStartTimeUtc = null;
                return;
            }

            long startTicks = Stopwatch.GetTimestamp();
            _audioPacer.Start(startTicks);
            Logger.Info("[WORKER:LIFECYCLE] Media pipeline active. Streaming fully engaged.");

            // 1. Thread כתיבה לצינור
            var writerTask = _videoPipe.StartWriterAsync(
                ffmpeg,
                () =>
                {
                    Logger.Warn("[WORKER:LIFECYCLE] FFmpeg broken pipe event received. Flagging for session restart.");
                    _isOffline = true;
                    _requiresRestart = true;
                },
                bytes => _netTelemetry.TrackMediaBytes(bytes),
                ct);

            // 2. Thread לכידת מסך - תיקון מלא לכשל ה-Timeout של DXGI!
            var captureTask = Task.Run(async () =>
            {
                Logger.Info("[WORKER:LIFECYCLE] Screen capture sampling thread started.");
                long lastTicks = Stopwatch.GetTimestamp();
                int consecutiveHardErrors = 0;

                while (sessionActive && !ct.IsCancellationRequested)
                {
                    if (Stopwatch.GetElapsedTime(lastTicks).TotalMilliseconds >= (1000.0 / _videoPipe.InternalCaptureFps))
                    {
                        try
                        {
                            if (screen.TryCaptureFrame(out byte[]? f) && f != null)
                            {
                                Interlocked.Exchange(ref latestFrame, f);
                                consecutiveHardErrors = 0;
                            }
                            // במקרה של Timeout (המסך לא השתנה), משמרים את הפריים הקודם ללא השבתת ה-Thread!
                        }
                        catch (Exception ex)
                        {
                            consecutiveHardErrors++;
                            Logger.Warn($"[WORKER:LIFECYCLE] Capture device error ({consecutiveHardErrors}/30): {ex.Message}");

                            if (consecutiveHardErrors >= 30)
                            {
                                Logger.Warn("[WORKER:LIFECYCLE] 30 consecutive fatal capture failures. Requesting SessionGuard restoration...");
                                await guard.MonitorUntilRestoredAsync(ct).ConfigureAwait(false);
                                consecutiveHardErrors = 0;
                            }
                        }

                        lastTicks = Stopwatch.GetTimestamp();
                    }
                    else
                    {
                        Thread.Sleep(1);
                    }
                }
            }, ct);

            // 3. Thread הזרקת שמע
            var audioTask = _audioPacer.RunPacerLoopAsync(
                ffmpeg,
                bytes => _netTelemetry.TrackMediaBytes(bytes),
                () => sessionActive,
                ct);

            // 4. לולאת תזמון ראשית
            _videoPipe.RunPacerLoop(
                () => Volatile.Read(ref latestFrame),
                screen.Width, screen.Height,
                _baselineFps,
                startTicks,
                () => _isStreaming && !_requiresRestart,
                ct);

            Logger.Info("[WORKER:LIFECYCLE] Stopping session components and flushing buffers...");
            sessionActive = false;
            _videoPipe.Complete();
            audio.Stop();
            Logger.Info("[WORKER:LIFECYCLE] Session resources successfully released.");
        }

        private string ResolveDestination()
        {
            if (!_isOffline)
            {
                return string.IsNullOrWhiteSpace(_targetRtmp)
                    ? $"{_config.RtmpServerBaseUrl.TrimEnd('/')}/{Uri.EscapeDataString(Environment.MachineName.Replace(" ", "_"))}"
                    : _targetRtmp;
            }

            string buf = string.IsNullOrWhiteSpace(_config.LocalBufferPath)
                ? (OperatingSystem.IsWindows() ? @"C:\ProgramData\ITB-SCREEN-RECORDER\Buffer" : "/var/lib/itb-screen-recorder/buffer")
                : _config.LocalBufferPath;

            Directory.CreateDirectory(buf);
            return Path.Combine(buf, $"{Uri.EscapeDataString(Environment.MachineName)}_{DateTime.UtcNow:yyyy-MM-dd_HH-mm-ss-ffffff}Z.mp4");
        }

        private object BuildTelemetrySnapshot()
        {
            var hw = HardwareProbe.GetTelemetrySnapshot();
            var net = _netTelemetry.GetMetricsSnapshot();
            bool flowing = _audioPacer?.IsAudioFlowing() ?? false;

            return new
            {
                SessionState = InternalSessionState.ActiveInteractive,
                CurrentFps = _baselineFps,
                IsStreaming = _isStreaming,
                IsRecording = _isStreaming,
                RecordingStartedAtUtc = _isStreaming ? _sessionStartTimeUtc : null,
                IsOfflineMode = _isOffline,
                HasAudio = flowing,
                Telemetry = _isStreaming ? new
                {
                    ActualFps = _videoPipe?.RealFps ?? 0,
                    DroppedFrames = _videoPipe?.DroppedFrames ?? 0,
                    InternalCaptureFps = _videoPipe?.InternalCaptureFps ?? _baselineFps,
                    QosTier = _videoPipe?.CurrentQosTier ?? 3,
                    HostCpuPct = hw.HostCpuUsagePct,
                    ProcessCpuPct = hw.ProcessCpuUsagePct,
                    ProcessRamMb = hw.ProcessRamMb,
                    Gpu3dPct = hw.Gpu3dUsagePct,
                    GpuNvencPct = hw.GpuNvencUsagePct,
                    MediaTxMbps = net.AppMediaTxMbps,
                    NicLinkSpeedMbps = net.NicLinkSpeedMbps,
                    NicTotalTxMbps = net.NicTotalTxMbps,
                    NicTotalRxMbps = net.NicTotalRxMbps,
                    AppLineUtilizationPct = net.AppLineUtilizationPct
                } : null
            };
        }
    }
}