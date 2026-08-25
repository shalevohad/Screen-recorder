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

        private TimeSpan _serverUtcOffset = TimeSpan.Zero;

        public WorkerEngine(AppConfig config)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));
        }

        // 💡 התיקון האולטימטיבי למניעת קריסות Memory-Mapping בווינדוס!
        // כותבים את הטקסט ישירות על גבי הישן, מרפדים ברווחים למחיקת שאריות, ולעולם לא מאפסים את הקובץ ל-0 בתים.
        private static void SafeWriteText(string path, string text)
        {
            try
            {
                string paddedText = text.PadRight(32, ' ');
                using (var fs = new FileStream(path, FileMode.OpenOrCreate, FileAccess.Write, FileShare.ReadWrite))
                {
                    fs.Position = 0;
                    byte[] data = System.Text.Encoding.UTF8.GetBytes(paddedText);
                    fs.Write(data, 0, data.Length);
                }
            }
            catch { }
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
                    WindowsNative.TimeBeginPeriod(1);
                }

                while (!localToken.IsCancellationRequested)
                {
                    Logger.Info("[WorkerEngine] Worker is in Standby mode, waiting for streaming permission...");
                    await _streamPermissionSignal.WaitAsync(localToken);

                    if (localToken.IsCancellationRequested) break;

                    ApplyDynamicPolicy();
                    Logger.Info("[WorkerEngine] Starting initialization of capture engines...");

                    IScreenCaptureProvider? screenCapture = null;
                    IAudioCaptureProvider? audioCapture = null;
                    FfmpegProcessManager? ffmpegManager = null;
                    byte[]? lastVideoFrame = null;

                    bool isSessionActive = false;
                    long totalAudioBytes = 0;
                    long audioStartTicks = 0;
                    long lastRealAudioTicks = 0;

                    string fpsHighPath = Path.Combine(AppContext.BaseDirectory, "itb_fps_high.txt");
                    string fpsLowPath = Path.Combine(AppContext.BaseDirectory, "itb_fps_low.txt");

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
                            }
                        };
                        audioCapture.Start();

                        await Task.Delay(100, localToken);

                        string safeMachineName = Uri.EscapeDataString(Environment.MachineName.Replace(" ", "_"));
                        string rtmpTarget = $"{_config.RtmpServerBaseUrl.TrimEnd('/')}/{safeMachineName}";

                        DateTime calibratedTime = DateTime.UtcNow + _serverUtcOffset;

                        // אתחול בטוח של קובצי הטלמטריה
                        SafeWriteText(fpsHighPath, "FPS: Init...");
                        SafeWriteText(fpsLowPath, "");

                        bool started = await ffmpegManager.StartAsync(rtmpTarget, calibratedTime, screenCapture.Width, screenCapture.Height, 48000, 2, "f32le", localToken).ConfigureAwait(false);
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

                        Logger.Info("[WorkerEngine] Capture and streaming are active.");
                        byte[] renderBuffer = new byte[screenCapture.Width * screenCapture.Height * 4];
                        double targetFrameTimeMs = 1000.0 / _config.TargetFps;

                        audioStartTicks = Stopwatch.GetTimestamp();
                        lastRealAudioTicks = audioStartTicks;
                        isSessionActive = true;

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
                                        }
                                    }
                                }
                                Thread.Sleep(50);
                            }
                        });

                        var keepAliveSw = Stopwatch.StartNew();
                        const int KEEP_ALIVE_MS = 1000;

                        long sessionStartTicks = 0;
                        long framesProcessed = 0;
                        bool isFirstFrameCaptured = false;

                        int actualFpsCount = 0;
                        long fpsStopwatchTicks = Stopwatch.GetTimestamp();

                        while (!localToken.IsCancellationRequested && _isStreamingRequested && !_requiresImmediateRestart)
                        {
                            if (!isFirstFrameCaptured)
                            {
                                if (screenCapture.TryCaptureFrame(out byte[]? firstFrame) && firstFrame != null)
                                {
                                    lastVideoFrame = firstFrame;
                                    isFirstFrameCaptured = true;
                                    sessionStartTicks = Stopwatch.GetTimestamp();
                                    fpsStopwatchTicks = sessionStartTicks;
                                }
                                else
                                {
                                    Thread.Sleep(10);
                                    continue;
                                }
                            }

                            double currentRealMs = Stopwatch.GetElapsedTime(sessionStartTicks).TotalMilliseconds;
                            long expectedFrames = (long)(currentRealMs / targetFrameTimeMs) + 1;
                            int framesToPush = (int)(expectedFrames - framesProcessed);

                            if (framesToPush > 0)
                            {
                                if (framesToPush > 1)
                                {
                                    long dropped = framesToPush - 1;
                                    framesProcessed += dropped;
                                    framesToPush = 1;
                                }

                                if (screenCapture.TryCaptureFrame(out byte[]? newFrame) && newFrame != null)
                                {
                                    lastVideoFrame = newFrame;
                                    keepAliveSw.Restart();
                                }
                                else if (lastVideoFrame != null && keepAliveSw.ElapsedMilliseconds >= KEEP_ALIVE_MS)
                                {
                                    keepAliveSw.Restart();
                                }

                                if (lastVideoFrame != null)
                                {
                                    Buffer.BlockCopy(lastVideoFrame, 0, renderBuffer, 0, lastVideoFrame.Length);
#if WINDOWS
                                    if (OperatingSystem.IsWindows())
                                    {
                                        MouseCursorOverlay.DrawMouseToFrame(renderBuffer, screenCapture.Width, screenCapture.Height);
                                    }
#endif
                                    if (!ffmpegManager.WriteVideoFrame(renderBuffer)) break;
                                    framesProcessed++;
                                    actualFpsCount++;
                                }
                            }

                            if (Stopwatch.GetElapsedTime(fpsStopwatchTicks).TotalMilliseconds >= 1000)
                            {
                                int currentFps = actualFpsCount;
                                actualFpsCount = 0;
                                fpsStopwatchTicks = Stopwatch.GetTimestamp();

                                Task.Run(() =>
                                {
                                    if (currentFps >= _config.TargetFps - 5)
                                    {
                                        SafeWriteText(fpsHighPath, $"FPS: {currentFps}");
                                        SafeWriteText(fpsLowPath, "");
                                    }
                                    else
                                    {
                                        SafeWriteText(fpsHighPath, "");
                                        SafeWriteText(fpsLowPath, $"FPS: {currentFps} (LOW)");
                                    }
                                });
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
                        Logger.Error($"[WorkerEngine] Error during streaming session: {ex.Message}");
                    }
                    finally
                    {
                        Logger.Info("[WorkerEngine] Stopping and tearing down resources...");
                        try
                        {
                            isSessionActive = false;
                            audioCapture?.Stop();
                            if (audioCapture is IDisposable audioDisp) audioDisp.Dispose();
                            if (screenCapture is IDisposable screenDisp) screenDisp.Dispose();
                            ffmpegManager?.Dispose();
                        }
                        catch (Exception ex) { Logger.Error($"[WorkerEngine] Error teardown: {ex.Message}"); }
                    }

                    if (_requiresImmediateRestart)
                    {
                        _requiresImmediateRestart = false;
                        _isStreamingRequested = true;
                        if (_streamPermissionSignal.CurrentCount == 0)
                        {
                            _streamPermissionSignal.Release();
                        }
                    }
                }
            }
            finally
            {
                if (OperatingSystem.IsWindows())
                {
                    WindowsNative.TimeEndPeriod(1);
                }
            }
        }

        private void ApplyDynamicPolicy()
        {
            try
            {
                string policyPath = Path.Combine(AppContext.BaseDirectory, "agent-policy.json");
                if (File.Exists(policyPath))
                {
                    string json = File.ReadAllText(policyPath);
                    var policy = JsonSerializer.Deserialize<AgentStreamPolicy>(json);

                    if (policy != null)
                    {
                        if (policy.TargetFps > 0) _config.TargetFps = policy.TargetFps;
                        if (!string.IsNullOrWhiteSpace(policy.VideoBitrate)) _config.VideoBitrate = policy.VideoBitrate;
                        if (!string.IsNullOrWhiteSpace(policy.RtmpServerBaseUrl)) _config.RtmpServerBaseUrl = policy.RtmpServerBaseUrl;

                        Logger.Info($"[WorkerEngine] Dynamic policy applied: {policy.TargetFps} FPS, {policy.VideoBitrate} Bitrate.");
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.Warn($"[WorkerEngine] Failed to read dynamic policy. Error: {ex.Message}");
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
                                        Logger.Info("[WorkerEngine] Received STOP command.");
                                        _isStreamingRequested = false;
                                    }
                                    else if (cmd.Equals("Start", StringComparison.OrdinalIgnoreCase) || cmd.Equals("ResumeAfterUnlock", StringComparison.OrdinalIgnoreCase))
                                    {
                                        if (parts.Length > 1 && long.TryParse(parts[1], out long ticks))
                                        {
                                            _serverUtcOffset = TimeSpan.FromTicks(ticks);
                                        }

                                        ApplyDynamicPolicy();

                                        Logger.Info("[WorkerEngine] Received START command.");
                                        _isStreamingRequested = true;
                                        if (_streamPermissionSignal.CurrentCount == 0) _streamPermissionSignal.Release();
                                    }
                                    else if (cmd.Equals("Restart", StringComparison.OrdinalIgnoreCase))
                                    {
                                        if (parts.Length > 1 && long.TryParse(parts[1], out long ticks))
                                        {
                                            _serverUtcOffset = TimeSpan.FromTicks(ticks);
                                        }

                                        Logger.Info("[WorkerEngine] Received RESTART command for on-the-fly policy update. Reloading config...");

                                        ApplyDynamicPolicy();
                                        _requiresImmediateRestart = true;
                                    }
                                }
                            }
                        }
                        catch { }
                    }, cts.Token);

                    while (!cts.Token.IsCancellationRequested && client.IsConnected)
                    {
                        var msg = new WorkerIpcStatusMessage
                        {
                            SessionState = InternalSessionState.ActiveInteractive,
                            CurrentFps = _config.TargetFps,
                            IsStreaming = _isStreamingRequested || _requiresImmediateRestart
                        };

                        await writer.WriteLineAsync(JsonSerializer.Serialize(msg));
                        await Task.Delay(2000, cts.Token);
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