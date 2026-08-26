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

        private TimeSpan _serverUtcOffset = TimeSpan.Zero;

        // 💡 Seamless ABR State Machine
        private readonly int _baselineFps;
        private volatile int _internalCaptureFps; // שולט בעומס המעבד מבלי לגעת ב-FFmpeg
        private int _currentQosTier = 3;

        public WorkerEngine(AppConfig config)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));

            _baselineFps = _config.TargetFps;
            _internalCaptureFps = _baselineFps;
        }

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

        // 💡 שינוי שכבות האיכות משנה רק את קצב הדגימה הפנימי (חוסך מעבד ורשת), ולא מאתחל שום דבר!
        // 💡 שינוי שכבות האיכות משנה רק את קצב הדגימה הפנימי, ללא אתחול של FFmpeg!
        private void SetQosTier(int tier)
        {
            if (tier >= 3)
            {
                _internalCaptureFps = _baselineFps;
            }
            else if (tier == 2)
            {
                // יורד ל-75% מהמקור, אך לעולם לא פחות מ-10
                _internalCaptureFps = Math.Max(10, (int)(_baselineFps * 0.75));
            }
            else if (tier == 1)
            {
                // יורד ל-50% מהמקור, אך לעולם לא פחות מ-10
                _internalCaptureFps = Math.Max(10, (int)(_baselineFps * 0.5));
            }
            else
            {
                // מצב הישרדות קיצוני - רצפת הברזל שהגדרת
                _internalCaptureFps = 10;
            }
        }

        public async Task RunAsync(CancellationToken ct)
        {
            DebugHelper.ApplyConsoleVisibility();
            bool showTelemetry = DebugHelper.IsDebugModeEnabled();

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

                    Logger.Info($"[WorkerEngine] Starting initialization... Outer Stream: {_baselineFps}FPS. Internal Capture: {_internalCaptureFps}FPS.");

                    IScreenCaptureProvider? screenCapture = null;
                    IAudioCaptureProvider? audioCapture = null;
                    FfmpegProcessManager? ffmpegManager = null;

                    bool isSessionActive = false;
                    bool isCaptureActive = false;
                    long totalAudioBytes = 0;
                    long audioStartTicks = 0;
                    long lastRealAudioTicks = 0;

                    byte[]? sharedLatestVideoFrame = null;

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

                        if (showTelemetry)
                        {
                            SafeWriteText(fpsHighPath, "FPS: Init...");
                            SafeWriteText(fpsLowPath, "");
                        }

                        // FFmpeg עולה רק פעם אחת ונשאר קבוע!
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

                        isSessionActive = true;
                        isCaptureActive = true;

                        // 💡 חוט הלכידה מווסת עצמו דינמית כדי להוריד עומס במקרי חנק
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
                                        }
                                    }
                                }
                                Thread.Sleep(50);
                            }
                        });

                        byte[] renderBuffer = new byte[screenCapture.Width * screenCapture.Height * 4];

                        // 💡 התזמון החיצוני לעולם לא משתנה - שומר על הזרם יציב מול השרת!
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

                        while (!localToken.IsCancellationRequested && _isStreamingRequested)
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
                                        actualFramesToPush = 1; // 💡 סובלנות Jitter רגילה
                                    }
                                    else if (framesToPush > 3)
                                    {
                                        // 🚨 שבירת הסחרור הקטלני (Anti-Death Spiral) 🚨
                                        // צינור ה-IPC רווי ולא יכול לבלוע מאות מגה-בייטים במכה.
                                        // שומטים את החוב ומרצים את שעון התזמון קדימה.
                                        actualFramesToPush = 1;
                                        framesProcessed += (framesToPush - 1);

                                        if (showTelemetry)
                                        {
                                            // רושמים את הנפילה לטובת מנגנון ה-ABR, מבלי לדחוף לצינור בפועל
                                            duplicatedFramesCount += (framesToPush - 1);
                                        }
                                    }

                                    for (int i = 0; i < actualFramesToPush; i++)
                                    {
                                        if (!ffmpegManager.WriteVideoFrame(renderBuffer)) break;
                                        framesProcessed++;

                                        if (showTelemetry)
                                        {
                                            actualFpsCount++;
                                            if (i > 0) duplicatedFramesCount++;
                                        }
                                    }
                                }
                            }

                            if (showTelemetry && Stopwatch.GetElapsedTime(fpsStopwatchTicks).TotalMilliseconds >= 1000)
                            {
                                int totalPushed = actualFpsCount;
                                int dropped = duplicatedFramesCount;
                                int realFps = totalPushed - dropped;

                                actualFpsCount = 0;
                                duplicatedFramesCount = 0;
                                fpsStopwatchTicks = Stopwatch.GetTimestamp();

                                Task.Run(() =>
                                {
                                    if (dropped <= 3)
                                    {
                                        SafeWriteText(fpsHighPath, $"FPS: {realFps}/{_internalCaptureFps} | T{_currentQosTier}");
                                        SafeWriteText(fpsLowPath, "");
                                    }
                                    else
                                    {
                                        SafeWriteText(fpsHighPath, "");
                                        SafeWriteText(fpsLowPath, $"FPS: {realFps}/{_internalCaptureFps} | CHOKE: {dropped} | T{_currentQosTier}");
                                    }
                                });

                                // 💡 Seamless Auto-Heal (אפס ניתוקים!)
                                if (dropped >= (_baselineFps / 2)) // מצב חנק (Choke)
                                {
                                    consecutiveStableSeconds = 0;
                                    consecutiveChokeSeconds++;

                                    if (consecutiveChokeSeconds >= 15)
                                    {
                                        if (_currentQosTier > 0)
                                        {
                                            _currentQosTier--;
                                            SetQosTier(_currentQosTier);
                                            Logger.Warn($"[AUTO-HEAL] Severe choke detected. Downgrading INTERNAL capture to {_internalCaptureFps}FPS (Tier {_currentQosTier}). Stream is untouched.");
                                            consecutiveChokeSeconds = 0;
                                        }
                                        else
                                        {
                                            consecutiveChokeSeconds = 0;
                                        }
                                    }
                                }
                                else if (dropped <= 3) // 💡 מצב יציב (סובלני לגיהוקים קלים של עד 3 פריימים!)
                                {
                                    consecutiveChokeSeconds = 0;
                                    consecutiveStableSeconds++;

                                    if (consecutiveStableSeconds >= 20) // 💡 קיצור זמן המבחן ל-20 שניות של יציבות סבירה
                                    {
                                        if (_currentQosTier < 3)
                                        {
                                            _currentQosTier++;
                                            SetQosTier(_currentQosTier);
                                            Logger.Info($"[AUTO-HEAL] Stream stable for 20s. Upgrading INTERNAL capture to {_internalCaptureFps}FPS (Tier {_currentQosTier}).");
                                            consecutiveStableSeconds = 0; // מתחילים לספור מחדש לקראת הטיפוס ל-Tier הבא
                                        }
                                        else
                                        {
                                            consecutiveStableSeconds = 0;
                                        }
                                    }
                                }
                                else
                                {
                                    // שטח אפור (4 עד 9 דרופים). המערכת לא חנוקה לגמרי, אבל לא מספיק יציבה כדי לטפס.
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
                        Logger.Error($"[WorkerEngine] Error during streaming session: {ex.Message}");
                    }
                    finally
                    {
                        Logger.Info("[WorkerEngine] Stopping and tearing down resources...");
                        try
                        {
                            isSessionActive = false;
                            isCaptureActive = false;

                            audioCapture?.Stop();
                            if (audioCapture is IDisposable audioDisp) audioDisp.Dispose();
                            if (screenCapture is IDisposable screenDisp) screenDisp.Dispose();
                            ffmpegManager?.Dispose();
                        }
                        catch (Exception ex) { Logger.Error($"[WorkerEngine] Error teardown: {ex.Message}"); }
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
                                        Logger.Info("[WorkerEngine] Received STOP command.");
                                        _isStreamingRequested = false;
                                    }
                                    else if (cmd.Equals("Start", StringComparison.OrdinalIgnoreCase) || cmd.Equals("ResumeAfterUnlock", StringComparison.OrdinalIgnoreCase))
                                    {
                                        if (parts.Length > 1 && long.TryParse(parts[1], out long ticks))
                                        {
                                            _serverUtcOffset = TimeSpan.FromTicks(ticks);
                                        }

                                        Logger.Info("[WorkerEngine] Received START command.");
                                        _isStreamingRequested = true;
                                        if (_streamPermissionSignal.CurrentCount == 0) _streamPermissionSignal.Release();
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
                            CurrentFps = _baselineFps,
                            IsStreaming = _isStreamingRequested
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