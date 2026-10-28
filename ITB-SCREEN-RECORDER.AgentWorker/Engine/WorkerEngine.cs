// ==========================================
// File: ITB-SCREEN-RECORDER.AgentWorker/WorkerEngine.cs
// ==========================================
using ITB_SCREEN_RECORDER.AgentWorker.Engine;
using ITB_SCREEN_RECORDER.AgentWorker.Providers.Keyboard;
using ITB_SCREEN_RECORDER.AgentWorker.Providers.Video;
using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Core.Diagnostics;
using ITB_SCREEN_RECORDER.Core.Ipc;
using ITB_SCREEN_RECORDER.Core.Security;
using ITBRecorderAgent.Engine;
using ITBRecorderAgent.Providers.Audio;
using ITBRecorderAgent.Providers.Video;
using System;
using System.Collections.Concurrent;
using System.Diagnostics;
using System.IO;
using System.Runtime.InteropServices;
using System.Text.Json;
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

            [Flags]
            public enum EXECUTION_STATE : uint
            {
                ES_SYSTEM_REQUIRED = 0x00000001,
                ES_DISPLAY_REQUIRED = 0x00000002,
                ES_USER_PRESENT = 0x00000004,
                ES_AWAYMODE_REQUIRED = 0x00000040,
                ES_CONTINUOUS = 0x80000000
            }

            [DllImport("kernel32.dll", CharSet = CharSet.Auto, SetLastError = true)]
            public static extern EXECUTION_STATE SetThreadExecutionState(EXECUTION_STATE esFlags);
        }

        private readonly SemaphoreSlim _permission = new SemaphoreSlim(0, 1);
        private readonly AppConfig _config;
        private readonly NetworkTelemetry _netTelemetry = new NetworkTelemetry();
        private readonly WorkerIpcClient _ipc = new WorkerIpcClient();

        private volatile bool _isStreaming = false;
        private volatile bool _isRecording = false;
        private volatile bool _requiresRestart = false;
        private volatile bool _isOffline = false;
        private string _targetRtmp = string.Empty;
        private TimeSpan _serverUtcOffset = TimeSpan.Zero;
        private int _baselineFps;
        private string _videoBitrate;

        private DateTime? _sessionStartTimeUtc = null;
        private int _consecutivePipeBreaks = 0;

        private readonly MultiDisplayPipelineManager _displayManager;
        private AudioPacer? _audioPacer;
        private IAudioCaptureProvider? _audioCapture;

        // Cross-platform keyboard capture provider and factory abstraction
        private readonly IKeyboardCaptureProvider _keyboardCapture;
        private readonly ConcurrentQueue<KeystrokeEventDto> _onlineKeystrokes = new();
        private string? _currentOfflineKeysPath = null;
        private readonly object _offlineWriteLock = new();
        private string? _activeKeyId;
        private byte[]? _activeKeyBytes;

        public WorkerEngine(AppConfig config)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));
            _baselineFps = config.TargetFps > 0 ? config.TargetFps : 30;
            _videoBitrate = string.IsNullOrWhiteSpace(config.VideoBitrate) ? "5000k" : config.VideoBitrate;
            _isRecording = config.AutoStartRecordingOnLaunch;
            _displayManager = new MultiDisplayPipelineManager(config);

            Logger.Info($"[WORKER:LIFECYCLE] Engine created. TargetFPS: {_baselineFps}, VideoBitrate: {_videoBitrate}");

            // Instantiate platform-specific provider via factory (Windows / Linux)
            _keyboardCapture = KeyboardCaptureFactory.Create(() =>
                DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() + (long)_serverUtcOffset.TotalMilliseconds);

            _keyboardCapture.KeystrokeCaptured += OnKeystrokeCaptured;
            _keyboardCapture.Start();

            WireIpcEvents();

            if (_config.AutoStartRecordingOnLaunch)
            {
                Logger.Info("[WORKER:LIFECYCLE] AutoStartRecordingOnLaunch enabled. Auto-starting capture pipeline.");
                _isStreaming = true;
                _sessionStartTimeUtc = DateTime.UtcNow;
                if (_permission.CurrentCount == 0) _permission.Release();
            }
        }

        private void OnKeystrokeCaptured(KeystrokeEventDto k)
        {
            // Keystroke telemetry recording is strictly permitted only while the station is actively streaming/recording
            if (!_isStreaming) return;

            // In-worker end-to-end payload encryption prior to disk storage or network dispatch
            if (!string.IsNullOrEmpty(_activeKeyId) && _activeKeyBytes != null && !string.IsNullOrEmpty(k.KeyCombination))
            {
                try
                {
                    k.KeyCombination = PayloadEncryptionManager.Encrypt(k.KeyCombination, _activeKeyId, _activeKeyBytes);
                }
                catch (Exception ex)
                {
                    Logger.Warn($"[WORKER:CRYPTO] Failed to encrypt keystroke: {ex.Message}");
                }
            }

            if (_isOffline && _isRecording && !string.IsNullOrEmpty(_currentOfflineKeysPath))
            {
                lock (_offlineWriteLock)
                {
                    try
                    {
                        // Store full serialized keystroke event DTO matching server ingestion schema
                        string line = JsonSerializer.Serialize(k) + Environment.NewLine;
                        File.AppendAllText(_currentOfflineKeysPath, line);
                    }
                    catch { }
                }
            }
            else
            {
                // Dispatch immediately over IPC Fast Path for sub-millisecond audio/video sync
                _ipc.SendKeystrokeImmediate(k);
            }
        }

        private void WireIpcEvents()
        {
            _ipc.EncryptionKeyConfigured += (keyId, material) =>
            {
                try
                {
                    _activeKeyId = keyId;
                    _activeKeyBytes = Convert.FromBase64String(material);
                    Logger.Info($"[WORKER:CRYPTO] Loaded active keystroke encryption key: {keyId}");
                }
                catch (Exception ex)
                {
                    Logger.Warn($"[WORKER:CRYPTO] Failed to configure encryption key: {ex.Message}");
                }
            };

            _ipc.StartRequested += (dest, offset, fps, bitrate) =>
            {
                Logger.Info($"[WORKER:IPC] START_COMMAND received -> Dest: '{dest}', ServerOffsetTicks: {offset.Ticks}, Fps: {fps}, Bitrate: {bitrate}");
                if (!string.IsNullOrWhiteSpace(dest)) _targetRtmp = dest;
                _serverUtcOffset = offset;
                _baselineFps = fps > 0 ? fps : _baselineFps;
                _videoBitrate = !string.IsNullOrWhiteSpace(bitrate) ? bitrate : _videoBitrate;

                _isOffline = false;
                _consecutivePipeBreaks = 0;
                if (!_isStreaming)
                {
                    _sessionStartTimeUtc = DateTime.UtcNow + _serverUtcOffset;
                }

                _isStreaming = true;
                if (_permission.CurrentCount == 0) _permission.Release();
            };

            _ipc.StopRequested += () =>
            {
                Logger.Info("[WORKER:IPC] STOP_COMMAND received from supervisor. Pausing transmission.");
                _isStreaming = false;
                _sessionStartTimeUtc = null;
                while (_onlineKeystrokes.TryDequeue(out _)) { }
            };

            _ipc.RestartRequested += (dest, offset, fps, bitrate) =>
            {
                Logger.Info($"[WORKER:IPC] RESTART_COMMAND received -> Dest: '{dest}', Fps: {fps}, Bitrate: {bitrate}");
                if (!string.IsNullOrWhiteSpace(dest)) _targetRtmp = dest;
                _serverUtcOffset = offset;
                _baselineFps = fps > 0 ? fps : _baselineFps;
                _videoBitrate = !string.IsNullOrWhiteSpace(bitrate) ? bitrate : _videoBitrate;

                _isOffline = false;
                _consecutivePipeBreaks = 0;
                if (!_isStreaming)
                {
                    _sessionStartTimeUtc = DateTime.UtcNow + _serverUtcOffset;
                }

                _isStreaming = true;
                _requiresRestart = true;
                if (_permission.CurrentCount == 0) _permission.Release();
            };

            _ipc.ClockSyncRequested += offset =>
            {
                _serverUtcOffset = offset;
                Logger.Info($"[WORKER:CLOCK] Synchronized clock offset with master server: {offset.TotalMilliseconds:F1}ms");
            };

            _ipc.CaptureFpsRequested += fps =>
            {
                foreach (var p in _displayManager.ActivePipelines)
                {
                    p.VideoPipe.SetCaptureFps(fps, _baselineFps);
                }
            };

            _ipc.RecordingStateChanged += shouldRecord =>
            {
                bool prev = _isRecording;
                _isRecording = shouldRecord;
                Logger.Info($"[WORKER:RECORDING] Recording state updated to {shouldRecord} (Stream live status: {_isStreaming})");
                if (!shouldRecord && _isOffline)
                {
                    Logger.Info("[WORKER:RECORDING] Recording stopped while in offline buffer mode. Flushing and switching off offline buffer.");
                    _isOffline = false;
                    _requiresRestart = true;
                }
            };

            _ipc.ServerDisconnected += () =>
            {
                if (_isRecording)
                {
                    if (!_isOffline && _isStreaming)
                    {
                        Logger.Warn("[WORKER:LIFECYCLE] Server connection dropped while RECORDING. Switching to ISOLATED_OFFLINE_BUFFER mode.");
                        _isOffline = true;
                        _requiresRestart = true;
                    }
                }
                else
                {
                    Logger.Info("[WORKER:LIFECYCLE] Server connection dropped while in MONITOR-ONLY (not recording) mode. Offline buffer suppressed.");
                    _isOffline = false;
                }
            };

            _ipc.ServerConnected += () =>
            {
                _consecutivePipeBreaks = 0;
                if (_isOffline)
                {
                    Logger.Info("[WORKER:LIFECYCLE] Server connection confirmed. Restoring LIVE_RTMP transmission.");
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

            using var guard = SessionGuardFactory.Create(
                () =>
                {
                    Logger.Info("[WORKER:SESSION] Desktop session / power transition detected.");
                    if (_isStreaming)
                    {
                        Logger.Info("[WORKER:SESSION] Triggering session restoration restart.");
                        _requiresRestart = true;
                    }
                    else if (_config.AutoStartRecordingOnLaunch)
                    {
                        Logger.Info("[WORKER:SESSION] Resuming continuous recording after session restoration.");
                        _isStreaming = true;
                        _sessionStartTimeUtc = DateTime.UtcNow + _serverUtcOffset;
                        _requiresRestart = true;
                        if (_permission.CurrentCount == 0) _permission.Release();
                    }
                },
                () =>
                {
                    if (_isStreaming)
                    {
                        Logger.Info("[WORKER:SESSION] Display topology changed. Dynamically synchronizing pipelines...");
                        _ = Task.Run(async () =>
                        {
                            try
                            {
                                await _displayManager.SynchronizePipelinesAsync(
                                    ResolveDestination(),
                                    _serverUtcOffset,
                                    _baselineFps,
                                    _videoBitrate,
                                    _audioCapture,
                                    _audioPacer,
                                    bytes => _netTelemetry.TrackMediaBytes(bytes),
                                    () =>
                                    {
                                        Logger.Warn("[WORKER:LIFECYCLE] Pipe broken event received on dynamic sync.");
                                        _requiresRestart = true;
                                    },
                                    ct).ConfigureAwait(false);
                            }
                            catch (Exception ex)
                            {
                                Logger.Warn($"[WORKER:TOPOLOGY] Dynamic pipeline sync error: {ex.Message}");
                            }
                        });
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

                    try
                    {
                        _requiresRestart = false;
                        await RunStreamingSessionAsync(guard, ct).ConfigureAwait(false);
                    }
                    catch (OperationCanceledException) when (ct.IsCancellationRequested)
                    {
                        break;
                    }
                    catch (Exception ex)
                    {
                        Logger.Error($"[WORKER:STREAM] Streaming session faulted: {ex.Message}\n{ex.StackTrace}");
                        _sessionStartTimeUtc = null;
                        _requiresRestart = true;
                        await Task.Delay(2000, ct).ConfigureAwait(false);
                    }
                }
            }
            finally
            {
                PreventSystemSleep(false);
                _keyboardCapture.Dispose();
                _displayManager.Dispose();
                if (OperatingSystem.IsWindows())
                {
                    try { WindowsNative.TimeEndPeriod(1); } catch { }
                }
                Logger.Info("[WORKER:LIFECYCLE] Engine shutdown sequence completed.");
            }
        }

        private async Task RunStreamingSessionAsync(ISessionGuard guard, CancellationToken ct)
        {
            Logger.Info("[WORKER:LIFECYCLE] Initializing multi-display hardware capture pipelines...");
#if WINDOWS
            DesktopSecurityManager.TryAttachToInputDesktop();
#endif
            using var audio = AudioCaptureFactory.Create();
            audio.Initialize();
            audio.Start();
            _audioCapture = audio;
            _audioPacer = new AudioPacer();
            Logger.Info("[WORKER:LIFECYCLE] Audio capture provider initialized and started.");

            bool sessionActive = true;
            string destination = ResolveDestination();

            await _displayManager.SynchronizePipelinesAsync(
                destination,
                _serverUtcOffset,
                _baselineFps,
                _videoBitrate,
                audio,
                _audioPacer,
                bytes => _netTelemetry.TrackMediaBytes(bytes),
                () =>
                {
                    Logger.Warn("[WORKER:LIFECYCLE] Pipe broken event received. Flagging for session restart.");
                    _consecutivePipeBreaks++;
                    if (_consecutivePipeBreaks >= 3)
                    {
                        if (_isRecording)
                        {
                            Logger.Warn("[WORKER:LIFECYCLE] Consecutive pipe breaks threshold reached while RECORDING. Temporarily switching to isolated offline buffer.");
                            _isOffline = true;
                        }
                        else
                        {
                            Logger.Info("[WORKER:LIFECYCLE] Consecutive pipe breaks threshold reached while NOT recording. Offline buffer suppressed.");
                            _isOffline = false;
                        }
                    }
                    _requiresRestart = true;
                },
                ct).ConfigureAwait(false);

            var primary = _displayManager.ActivePipelines.FirstOrDefault(p => p.IsPrimary)
                       ?? _displayManager.ActivePipelines.FirstOrDefault();

            if (primary == null)
            {
                Logger.Warn("[WORKER:LIFECYCLE] No display pipeline was successfully engaged (desktop may be locked, asleep, or in transition). Retrying in 2 seconds...");
                _requiresRestart = true;
                await Task.Delay(2000, ct).ConfigureAwait(false);
                return;
            }

            _consecutivePipeBreaks = 0;

            audio.AudioDataAvailable += (s, data) =>
            {
                var carrier = _displayManager.AudioCarrierPipeline;
                if (carrier != null && carrier.Ffmpeg.IsRunning && sessionActive)
                {
                    carrier.Ffmpeg.WriteAudioData(data);
                    _audioPacer.RecordIncomingBytes(data.Length);
                    _netTelemetry.TrackMediaBytes(data.Length);
                }
            };

            long startTicks = Stopwatch.GetTimestamp();
            _audioPacer.Start(startTicks);

            var audioTask = _audioPacer.RunPacerLoopAsync(
                () => _displayManager.AudioCarrierPipeline?.Ffmpeg,
                bytes => _netTelemetry.TrackMediaBytes(bytes),
                () => sessionActive,
                ct);

            Logger.Info($"[WORKER:LIFECYCLE] Media pipelines active ({_displayManager.ActivePipelines.Count} displays). Streaming fully engaged.");
            PreventSystemSleep(true);

            long lastKeepAliveTicks = Stopwatch.GetTimestamp();
            while (sessionActive && _isStreaming && !_requiresRestart && !ct.IsCancellationRequested)
            {
                await Task.Delay(250, ct).ConfigureAwait(false);
                if (OperatingSystem.IsWindows() && Stopwatch.GetElapsedTime(lastKeepAliveTicks).TotalSeconds >= 60)
                {
                    lastKeepAliveTicks = Stopwatch.GetTimestamp();
                    PreventSystemSleep(true);
                }
            }

            Logger.Info("[WORKER:LIFECYCLE] Stopping session components and flushing buffers...");
            sessionActive = false;
            PreventSystemSleep(false);
            audio.Stop();
            _displayManager.Dispose();
            Logger.Info("[WORKER:LIFECYCLE] Session resources successfully released.");
        }

        private void PreventSystemSleep(bool prevent)
        {
            if (OperatingSystem.IsWindows())
            {
                try
                {
                    if (prevent)
                    {
                        var state = WindowsNative.SetThreadExecutionState(
                            WindowsNative.EXECUTION_STATE.ES_CONTINUOUS |
                            WindowsNative.EXECUTION_STATE.ES_SYSTEM_REQUIRED |
                            WindowsNative.EXECUTION_STATE.ES_DISPLAY_REQUIRED);
                    }
                    else
                    {
                        WindowsNative.SetThreadExecutionState(WindowsNative.EXECUTION_STATE.ES_CONTINUOUS);
                    }
                }
                catch (Exception ex)
                {
                    Logger.Warn($"[WORKER:POWER] Failed to update thread execution state: {ex.Message}");
                }
            }
        }

        private string ResolveDestination()
        {
            if (!_isOffline || !_isRecording)
            {
                _currentOfflineKeysPath = null;
                return string.IsNullOrWhiteSpace(_targetRtmp)
                    ? $"{_config.RtmpServerBaseUrl.TrimEnd('/')}/{Uri.EscapeDataString(Environment.MachineName.Replace(" ", "_"))}"
                    : _targetRtmp;
            }

            string buf = string.IsNullOrWhiteSpace(_config.LocalBufferPath)
                ? (OperatingSystem.IsWindows() ? @"C:\ProgramData\ITB-SCREEN-RECORDER\Buffer" : "/var/lib/itb-screen-recorder/buffer")
                : _config.LocalBufferPath;

            Directory.CreateDirectory(buf);

            long syncedEpochMs = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() + (long)_serverUtcOffset.TotalMilliseconds;
            string videoPath = Path.Combine(buf, $"{Uri.EscapeDataString(Environment.MachineName)}_{syncedEpochMs}.mp4");

            // Configure local offline sidecar keystroke storage alongside buffered MP4 video segment
            _currentOfflineKeysPath = Path.ChangeExtension(videoPath, ".keys.jsonl");

            return videoPath;
        }

        private object BuildTelemetrySnapshot()
        {
            var hw = HardwareProbe.GetTelemetrySnapshot();
            var net = _netTelemetry.GetMetricsSnapshot();
            bool flowing = _audioPacer?.IsAudioFlowing() ?? false;

            var keysToSend = new System.Collections.Generic.List<KeystrokeEventDto>();
            if (_isStreaming)
            {
                while (_onlineKeystrokes.TryDequeue(out var k) && keysToSend.Count < 200)
                {
                    keysToSend.Add(k);
                }
            }
            else
            {
                while (_onlineKeystrokes.TryDequeue(out _)) { }
            }

            var primary = _displayManager.ActivePipelines.FirstOrDefault(p => p.IsPrimary)
                       ?? _displayManager.ActivePipelines.FirstOrDefault();

            return new
            {
                SessionState = InternalSessionState.ActiveInteractive,
                CurrentFps = _baselineFps,
                IsStreaming = _isStreaming,
                IsRecording = _isRecording,
                RecordingStartedAtUtc = _isRecording ? _sessionStartTimeUtc : null,
                IsOfflineMode = _isOffline,
                HasAudio = flowing,
                HasActiveSpeakers = _audioCapture?.HasActiveLoopback ?? false,
                HasActiveMicrophone = _audioCapture?.HasActiveMicrophone ?? false,
                IsAudioStreaming = _isStreaming && flowing,
                Keystrokes = keysToSend.Count > 0 ? keysToSend : null,
                DisplayTopology = _displayManager.CurrentTopology,
                Telemetry = _isStreaming ? new
                {
                    ActualFps = primary?.VideoPipe?.RealFps ?? 0,
                    DroppedFrames = primary?.VideoPipe?.DroppedFrames ?? 0,
                    InternalCaptureFps = primary?.VideoPipe?.InternalCaptureFps ?? _baselineFps,
                    QosTier = primary?.VideoPipe?.CurrentQosTier ?? 3,
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