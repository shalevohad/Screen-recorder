using System;
using System.Diagnostics;
using System.IO;
using System.IO.Pipes;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using System.Runtime.InteropServices;
using ITB_SCREEN_RECORDER.Core.Ipc;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Diagnostics;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;

using ITBRecorderAgent.Providers.Video;
using ITBRecorderAgent.Providers.Audio;
using ITBRecorderAgent.Engine;

namespace ITB_SCREEN_RECORDER.AgentWorker
{
    public class WorkerEngine
    {
        private static class WindowsNative
        {
            [DllImport("winmm.dll", EntryPoint = "timeBeginPeriod")]
            public static extern uint TimeBeginPeriod(uint ms);

            [DllImport("winmm.dll", EntryPoint = "timeEndPeriod")]
            public static extern uint TimeEndPeriod(uint ms);
        }

        private readonly SemaphoreSlim _streamPermissionSignal = new SemaphoreSlim(0, 1);
        private readonly AppConfig _config;
        private volatile bool _isStreamingRequested = false;
        private volatile bool _requiresImmediateRestart = false;

        private string _injectedRtmpDestination = string.Empty;
        private TimeSpan _serverUtcOffset = TimeSpan.Zero;
        private volatile bool _isOfflineModeActive = false;
        private readonly NetworkTelemetry _networkTelemetry = new NetworkTelemetry();

        private volatile int _baselineFps;
        private volatile string _currentVideoBitrate;
        private volatile int _internalCaptureFps;
        private volatile int _currentQosTier = 3;

        private volatile int _lastRealFps = 0;
        private volatile int _lastDroppedFrames = 0;

        public WorkerEngine(AppConfig config)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));
            _baselineFps = _config.TargetFps > 0 ? _config.TargetFps : 30;
            _currentVideoBitrate = string.IsNullOrWhiteSpace(_config.VideoBitrate) ? "5000k" : _config.VideoBitrate;
            _internalCaptureFps = _baselineFps;
        }

        private void SetQosTier(int tier)
        {
            _currentQosTier = tier;
            if (tier >= 3) _internalCaptureFps = _baselineFps;
            else if (tier == 2) _internalCaptureFps = Math.Max(10, (int)(_baselineFps * 0.75));
            else if (tier == 1) _internalCaptureFps = Math.Max(10, (int)(_baselineFps * 0.5));
            else _internalCaptureFps = 10;
        }

        public async Task RunAsync(CancellationToken ct)
        {
            DebugHelper.ApplyConsoleVisibility();

            using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(ct);
            CancellationToken localToken = linkedCts.Token;

            _ = Task.Run(() => MaintainIpcCommunicationAsync(linkedCts), localToken);

            try
            {
                if (OperatingSystem.IsWindows())
                {
#if WINDOWS
                    WindowsNative.TimeBeginPeriod(1);
#endif
                }

                while (!localToken.IsCancellationRequested)
                {
                    if (!_isStreamingRequested)
                    {
                        Logger.Info("[WorkerEngine] Worker in Standby, waiting for Supervisor stream command...");
                        await _streamPermissionSignal.WaitAsync(localToken);
                    }

                    if (localToken.IsCancellationRequested) break;

                    _requiresImmediateRestart = false;

                    Logger.Info($"[WorkerEngine] Initializing capture pipeline... Baseline FPS: {_baselineFps}, Bitrate: {_currentVideoBitrate}, Internal Capture: {_internalCaptureFps}");

                    string targetDestination = _injectedRtmpDestination;
                    if (string.IsNullOrWhiteSpace(targetDestination))
                    {
                        string safeName = Uri.EscapeDataString(Environment.MachineName.Replace(" ", "_"));
                        targetDestination = $"{_config.RtmpServerBaseUrl.TrimEnd('/')}/{safeName}";
                    }

                    if (Uri.TryCreate(targetDestination, UriKind.Absolute, out Uri? rtmpUri))
                    {
                        _networkTelemetry.ResolveRoutingInterface(rtmpUri.Host);
                    }

                    IScreenCaptureProvider? screenCapture = null;
                    IAudioCaptureProvider? audioCapture = null;
                    FfmpegProcessManager? ffmpegManager = null;

                    bool isSessionActive = false;
                    bool isCaptureActive = false;
                    long totalAudioBytes = 0;
                    long audioStartTicks = 0;
                    long lastRealAudioTicks = 0;

                    byte[]? sharedLatestVideoFrame = null;

                    try
                    {
                        screenCapture = ScreenCaptureFactory.Create();
                        screenCapture.Initialize();

                        audioCapture = AudioCaptureFactory.Create();
                        audioCapture.Initialize();

                        ffmpegManager = new FfmpegProcessManager(_config);

                        audioCapture.AudioDataAvailable += (s, data) =>
                        {
                            if (ffmpegManager != null && ffmpegManager.IsRunning && isSessionActive)
                            {
                                ffmpegManager.WriteAudioData(data);
                                Interlocked.Add(ref totalAudioBytes, data.Length);
                                Interlocked.Exchange(ref lastRealAudioTicks, Stopwatch.GetTimestamp());
                                _networkTelemetry.TrackMediaBytes(data.Length);
                            }
                        };
                        audioCapture.Start();

                        await Task.Delay(100, localToken);

                        DateTime calibratedTime = DateTime.UtcNow + _serverUtcOffset;
                        string destinationTarget;

                        if (_isOfflineModeActive)
                        {
                            string bufferDir = _config.LocalBufferPath;
                            if (string.IsNullOrWhiteSpace(bufferDir))
                            {
                                bufferDir = OperatingSystem.IsWindows()
                                    ? @"C:\ProgramData\ITB-SCREEN-RECORDER\Buffer"
                                    : "/var/lib/itb-screen-recorder/buffer";
                            }
                            Directory.CreateDirectory(bufferDir);

                            string safeMachineName = Uri.EscapeDataString(Environment.MachineName.Replace(" ", "_"));
                            destinationTarget = Path.Combine(bufferDir, $"{safeMachineName}_{calibratedTime:yyyyMMdd_HHmmss}.flv");
                            Logger.Warn($"[WorkerEngine] Operating in Isolated Buffer Mode -> {destinationTarget}");
                        }
                        else
                        {
                            destinationTarget = targetDestination;
                            Logger.Info($"[WorkerEngine] Live RTMP Streaming -> {destinationTarget}");
                        }

                        bool started = await ffmpegManager.StartAsync(
                            destinationTarget,
                            calibratedTime,
                            screenCapture.Width,
                            screenCapture.Height,
                            48000,
                            2,
                            "f32le",
                            _baselineFps,
                            _currentVideoBitrate,
                            localToken).ConfigureAwait(false);

                        if (!started)
                        {
                            _isStreamingRequested = false;
                            continue;
                        }

                        var audioHandshakeTask = ffmpegManager.CompleteAudioHandshakeAsync(localToken);

                        byte[] initialFrame = new byte[screenCapture.Width * screenCapture.Height * 4];
                        _ = Task.Run(() => ffmpegManager.WriteVideoFrame(initialFrame));

                        if (!await audioHandshakeTask.ConfigureAwait(false))
                        {
                            _isStreamingRequested = false;
                            continue;
                        }

                        isSessionActive = true;
                        isCaptureActive = true;

                        var captureWorkerTask = Task.Run(() =>
                        {
                            long lastCaptureTicks = Stopwatch.GetTimestamp();
                            while (isCaptureActive && !localToken.IsCancellationRequested)
                            {
                                int currentLimit = _internalCaptureFps;
                                double targetMs = 1000.0 / currentLimit;
                                double elapsed = Stopwatch.GetElapsedTime(lastCaptureTicks).TotalMilliseconds;

                                if (elapsed >= targetMs)
                                {
                                    if (screenCapture.TryCaptureFrame(out byte[]? newFrame) && newFrame != null)
                                    {
                                        Interlocked.Exchange(ref sharedLatestVideoFrame, newFrame);
                                    }
                                    lastCaptureTicks = Stopwatch.GetTimestamp();
                                }
                                else
                                {
                                    Thread.Sleep(1);
                                }
                            }
                        });

                        var audioPacerTask = Task.Run(() =>
                        {
                            while (isSessionActive && !localToken.IsCancellationRequested)
                            {
                                if (audioStartTicks > 0)
                                {
                                    double elapsedSec = Stopwatch.GetElapsedTime(audioStartTicks).TotalSeconds;
                                    long expectedBytes = (long)(elapsedSec * 384000);
                                    expectedBytes -= (expectedBytes % 8);

                                    long currentBytes = Interlocked.Read(ref totalAudioBytes);
                                    long timeSinceLastAudioMs = (long)Stopwatch.GetElapsedTime(Interlocked.Read(ref lastRealAudioTicks)).TotalMilliseconds;

                                    if (expectedBytes > currentBytes && timeSinceLastAudioMs > 150)
                                    {
                                        long missingBytes = expectedBytes - currentBytes;
                                        if (missingBytes > 0 && missingBytes <= 384000)
                                        {
                                            byte[] silence = new byte[missingBytes];
                                            ffmpegManager.WriteAudioData(silence);
                                            Interlocked.Add(ref totalAudioBytes, missingBytes);
                                            _networkTelemetry.TrackMediaBytes(missingBytes);
                                        }
                                    }
                                }
                                Thread.Sleep(50);
                            }
                        });

                        byte[] renderBuffer = new byte[screenCapture.Width * screenCapture.Height * 4];
                        double targetFrameTimeMs = 1000.0 / _baselineFps;

                        audioStartTicks = Stopwatch.GetTimestamp();
                        lastRealAudioTicks = audioStartTicks;

                        long sessionStartTicks = Stopwatch.GetTimestamp();
                        long framesProcessed = 0;

                        int actualFpsCount = 0;
                        int duplicatedFramesCount = 0;
                        int consecutiveChokeSeconds = 0;
                        int consecutiveStableSeconds = 0;

                        long fpsStopwatchTicks = sessionStartTicks;

                        while (!localToken.IsCancellationRequested && _isStreamingRequested && !_requiresImmediateRestart)
                        {
                            double currentRealMs = Stopwatch.GetElapsedTime(sessionStartTicks).TotalMilliseconds;
                            long expectedFrames = (long)(currentRealMs / targetFrameTimeMs) + 1;
                            int framesToPush = (int)(expectedFrames - framesProcessed);

                            if (framesToPush > 0)
                            {
                                byte[]? frameToEncode = Volatile.Read(ref sharedLatestVideoFrame);

                                if (frameToEncode != null)
                                {
                                    Buffer.BlockCopy(frameToEncode, 0, renderBuffer, 0, frameToEncode.Length);
#if WINDOWS
                                    if (OperatingSystem.IsWindows())
                                    {
                                        MouseCursorOverlay.DrawMouseToFrame(renderBuffer, screenCapture.Width, screenCapture.Height);
                                    }
#endif

                                    int actualFramesToPush = framesToPush;

                                    if (framesToPush > 1 && framesToPush <= 3)
                                    {
                                        actualFramesToPush = 1;
                                    }
                                    else if (framesToPush > 3)
                                    {
                                        actualFramesToPush = 1;
                                        framesProcessed += (framesToPush - 1);
                                        duplicatedFramesCount += (framesToPush - 1);
                                    }

                                    for (int i = 0; i < actualFramesToPush; i++)
                                    {
                                        if (!ffmpegManager.WriteVideoFrame(renderBuffer))
                                        {
                                            if (!_isOfflineModeActive)
                                            {
                                                Logger.Warn("[WorkerEngine] Output pipeline closed. Switching to isolated buffer mode.");
                                                _isOfflineModeActive = true;
                                                _requiresImmediateRestart = true;
                                            }
                                            break;
                                        }

                                        _networkTelemetry.TrackMediaBytes(renderBuffer.Length);

                                        framesProcessed++;
                                        actualFpsCount++;
                                        if (i > 0) duplicatedFramesCount++;
                                    }
                                }
                            }

                            if (_requiresImmediateRestart) break;

                            if (Stopwatch.GetElapsedTime(fpsStopwatchTicks).TotalMilliseconds >= 1000)
                            {
                                int totalPushed = actualFpsCount;
                                int dropped = duplicatedFramesCount;
                                int realFps = totalPushed - dropped;

                                actualFpsCount = 0;
                                duplicatedFramesCount = 0;
                                fpsStopwatchTicks = Stopwatch.GetTimestamp();

                                _lastRealFps = realFps;
                                _lastDroppedFrames = dropped;

                                if (dropped >= (_baselineFps / 2))
                                {
                                    consecutiveStableSeconds = 0;
                                    consecutiveChokeSeconds++;

                                    if (consecutiveChokeSeconds >= 15)
                                    {
                                        if (_currentQosTier > 0)
                                        {
                                            SetQosTier(_currentQosTier - 1);
                                            Logger.Warn($"[AUTO-HEAL] Downscaling capture rate to {_internalCaptureFps}FPS (Tier {_currentQosTier}).");
                                            consecutiveChokeSeconds = 0;
                                        }
                                        else
                                        {
                                            consecutiveChokeSeconds = 0;
                                        }
                                    }
                                }
                                else if (dropped <= 3)
                                {
                                    consecutiveChokeSeconds = 0;
                                    consecutiveStableSeconds++;

                                    if (consecutiveStableSeconds >= 20)
                                    {
                                        if (_currentQosTier < 3)
                                        {
                                            SetQosTier(_currentQosTier + 1);
                                            Logger.Info($"[AUTO-HEAL] Pipeline recovered. Upscaling capture rate to {_internalCaptureFps}FPS (Tier {_currentQosTier}).");
                                            consecutiveStableSeconds = 0;
                                        }
                                        else
                                        {
                                            consecutiveStableSeconds = 0;
                                        }
                                    }
                                }
                                else
                                {
                                    consecutiveChokeSeconds = 0;
                                    consecutiveStableSeconds = 0;
                                }
                            }

                            double nextFrameTargetMs = framesProcessed * targetFrameTimeMs;
                            while (true)
                            {
                                double currentMs = Stopwatch.GetElapsedTime(sessionStartTicks).TotalMilliseconds;
                                double msUntilNext = nextFrameTargetMs - currentMs;

                                if (msUntilNext <= 0) break;
                                if (msUntilNext > 2) Thread.Sleep(1);
                                else Thread.SpinWait(500);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        Logger.Error($"[WorkerEngine] Streaming execution error: {ex.Message}");
                    }
                    finally
                    {
                        Logger.Info("[WorkerEngine] Tearing down pipeline resources...");
                        try
                        {
                            isSessionActive = false;
                            isCaptureActive = false;

                            audioCapture?.Stop();
                            if (audioCapture is IDisposable audioDisp) audioDisp.Dispose();
                            if (screenCapture is IDisposable screenDisp) screenDisp.Dispose();
                            ffmpegManager?.Dispose();
                        }
                        catch (Exception ex) { Logger.Error($"[WorkerEngine] Teardown exception: {ex.Message}"); }
                    }
                }
            }
            finally
            {
                if (OperatingSystem.IsWindows())
                {
#if WINDOWS
                    WindowsNative.TimeEndPeriod(1);
#endif
                }
            }
        }

        private async Task MaintainIpcCommunicationAsync(CancellationTokenSource cts)
        {
            while (!cts.Token.IsCancellationRequested)
            {
                try
                {
                    using var client = new NamedPipeClientStream(".", "ITB_Agent_IPC", PipeDirection.InOut, PipeOptions.Asynchronous);
                    await client.ConnectAsync(3000, cts.Token);

                    using var reader = new StreamReader(client);
                    using var writer = new StreamWriter(client) { AutoFlush = true };

                    var listenerTask = Task.Run(async () =>
                    {
                        try
                        {
                            while (!cts.Token.IsCancellationRequested && client.IsConnected)
                            {
                                string? line = await reader.ReadLineAsync(cts.Token);
                                if (!string.IsNullOrWhiteSpace(line))
                                {
                                    string[] parts = line.Trim().Split('|');
                                    string cmd = parts[0];

                                    if (cmd.Equals("Stop", StringComparison.OrdinalIgnoreCase) || cmd.Equals("GracefulShutdown", StringComparison.OrdinalIgnoreCase))
                                    {
                                        Logger.Info("[WorkerEngine] Received STOP command from Supervisor.");
                                        _isStreamingRequested = false;
                                    }
                                    else if (cmd.Equals("SetCaptureFps", StringComparison.OrdinalIgnoreCase))
                                    {
                                        // שינוי קצב לכידה ללא ריסטארט של FFmpeg
                                        if (parts.Length > 1 && int.TryParse(parts[1], out int captureFps) && captureFps >= 10 && captureFps <= 120)
                                        {
                                            _internalCaptureFps = Math.Min(captureFps, _baselineFps);
                                            Logger.Info($"[WorkerEngine] Updated internal capture rate on the fly to {_internalCaptureFps} FPS (Stream stays {_baselineFps} FPS).");
                                        }
                                    }
                                    else if (cmd.Equals("Start", StringComparison.OrdinalIgnoreCase) || cmd.Equals("Restart", StringComparison.OrdinalIgnoreCase))
                                    {
                                        if (parts.Length > 1 && !string.IsNullOrWhiteSpace(parts[1]))
                                        {
                                            _injectedRtmpDestination = parts[1];
                                        }

                                        if (parts.Length > 2 && long.TryParse(parts[2], out long ticks))
                                        {
                                            _serverUtcOffset = TimeSpan.FromTicks(ticks);
                                        }

                                        if (parts.Length > 3 && int.TryParse(parts[3], out int dynamicFps) && dynamicFps >= 10 && dynamicFps <= 120)
                                        {
                                            _baselineFps = dynamicFps;
                                            _internalCaptureFps = dynamicFps;
                                        }

                                        if (parts.Length > 4 && !string.IsNullOrWhiteSpace(parts[4]))
                                        {
                                            _currentVideoBitrate = parts[4].Trim();
                                        }

                                        Logger.Info($"[WorkerEngine] Received START/RESTART command. Destination: {_injectedRtmpDestination}, FPS: {_baselineFps}, Bitrate: {_currentVideoBitrate}");
                                        _isStreamingRequested = true;
                                        if (cmd.Equals("Restart", StringComparison.OrdinalIgnoreCase))
                                        {
                                            _requiresImmediateRestart = true;
                                        }

                                        if (_streamPermissionSignal.CurrentCount == 0) _streamPermissionSignal.Release();
                                    }
                                    else if (cmd.Equals("ServerDisconnected", StringComparison.OrdinalIgnoreCase))
                                    {
                                        if (!_isOfflineModeActive && _isStreamingRequested)
                                        {
                                            Logger.Warn("[WorkerEngine] Server link down. Switching to Isolated Buffer Mode.");
                                            _isOfflineModeActive = true;
                                            _requiresImmediateRestart = true;
                                        }
                                    }
                                    else if (cmd.Equals("ServerConnected", StringComparison.OrdinalIgnoreCase))
                                    {
                                        if (_isOfflineModeActive && _isStreamingRequested)
                                        {
                                            Logger.Info("[WorkerEngine] Server link restored. Reconnecting Live Stream.");
                                            _isOfflineModeActive = false;
                                            _requiresImmediateRestart = true;
                                        }
                                    }
                                }
                            }
                        }
                        catch { }
                    }, cts.Token);

                    while (!cts.Token.IsCancellationRequested && client.IsConnected)
                    {
                        var hwSnap = HardwareProbe.GetTelemetrySnapshot();
                        var netSnap = _networkTelemetry.GetMetricsSnapshot();

                        var msg = new
                        {
                            SessionState = InternalSessionState.ActiveInteractive,
                            CurrentFps = _baselineFps,
                            IsStreaming = _isStreamingRequested,
                            IsOfflineMode = _isOfflineModeActive,

                            Telemetry = _isStreamingRequested ? new
                            {
                                ActualFps = _lastRealFps,
                                DroppedFrames = _lastDroppedFrames,
                                InternalCaptureFps = _internalCaptureFps,
                                QosTier = _currentQosTier,

                                HostCpuPct = hwSnap.HostCpuUsagePct,
                                ProcessCpuPct = hwSnap.ProcessCpuUsagePct,
                                ProcessRamMb = hwSnap.ProcessRamMb,
                                Gpu3dPct = hwSnap.Gpu3dUsagePct,
                                GpuNvencPct = hwSnap.GpuNvencUsagePct,

                                MediaTxMbps = netSnap.AppMediaTxMbps,
                                NicLinkSpeedMbps = netSnap.NicLinkSpeedMbps,
                                NicTotalTxMbps = netSnap.NicTotalTxMbps,
                                NicTotalRxMbps = netSnap.NicTotalRxMbps,
                                AppLineUtilizationPct = netSnap.AppLineUtilizationPct
                            } : null
                        };

                        await writer.WriteLineAsync(JsonSerializer.Serialize(msg));
                        await Task.Delay(1000, cts.Token);
                    }
                }
                catch
                {
                    if (!cts.Token.IsCancellationRequested) await Task.Delay(2000, cts.Token);
                }
            }
        }
    }
}