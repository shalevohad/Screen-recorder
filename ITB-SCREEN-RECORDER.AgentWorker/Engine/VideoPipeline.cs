using ITB_SCREEN_RECORDER.Core.Common;
using ITBRecorderAgent.Providers.Video;
using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace ITBRecorderAgent.Engine
{
    public class VideoPipeline
    {
        private readonly Channel<byte[]> _channel;
        private readonly byte[][] _pool;
        private int _poolIndex = 0;

        public int RealFps { get; private set; }
        public int DroppedFrames { get; private set; }
        public int CurrentQosTier { get; private set; } = 3;
        public int InternalCaptureFps { get; private set; }

        public VideoPipeline(int width, int height, int baselineFps)
        {
            InternalCaptureFps = baselineFps;
            _channel = Channel.CreateBounded<byte[]>(new BoundedChannelOptions(3)
            {
                FullMode = BoundedChannelFullMode.DropOldest,
                SingleWriter = true,
                SingleReader = true
            });

            int frameSize = width * height * 4;
            _pool = new byte[3][] { new byte[frameSize], new byte[frameSize], new byte[frameSize] };

            Logger.Info($"[WORKER:VIDEO-PIPE] Initialized pipeline. FrameSize: {frameSize / 1024 / 1024.0:F2}MB, Resolution: {width}x{height}, BaselineFps: {baselineFps}");
        }

        public Task StartWriterAsync(FfmpegProcessManager ffmpeg, Action onPipeBroken, Action<long> onBytesSent, CancellationToken ct)
        {
            return Task.Run(async () =>
            {
                Logger.Info("[WORKER:VIDEO-PIPE] Stdin writer loop started.");
                var reader = _channel.Reader;
                try
                {
                    while (await reader.WaitToReadAsync(ct).ConfigureAwait(false))
                    {
                        while (reader.TryRead(out var frame))
                        {
                            var sw = Stopwatch.StartNew();
                            bool writeOk = ffmpeg.WriteVideoFrame(frame);
                            sw.Stop();

                            if (!writeOk)
                            {
                                Logger.Error("[WORKER:VIDEO-PIPE] CRITICAL: FFmpeg stdin pipe closed or broken by native process. Requesting fallback to buffer.");
                                onPipeBroken();
                                return;
                            }

                            if (sw.ElapsedMilliseconds > 25)
                            {
                                Logger.Warn($"[WORKER:VIDEO-PIPE] Slow pipe write detected: {sw.ElapsedMilliseconds}ms for single frame. FFmpeg input buffer may be backing up.");
                            }

                            onBytesSent(frame.Length);
                        }
                    }
                }
                catch (OperationCanceledException)
                {
                    Logger.Info("[WORKER:VIDEO-PIPE] Pipe writer gracefully cancelled.");
                }
                catch (Exception ex)
                {
                    Logger.Error($"[WORKER:VIDEO-PIPE] Unhandled exception in writer loop: {ex}");
                    onPipeBroken();
                }
            }, ct);
        }

        public void RunPacerLoop(
            Func<byte[]?> getLatestFrame,
            int width,
            int height,
            int baselineFps,
            long sessionStartTicks,
            Func<bool> isStreamingActive,
            CancellationToken ct)
        {
            Logger.Info($"[WORKER:VIDEO-PIPE] Frame pacer loop engaged at {baselineFps} FPS target.");
            double targetFrameTimeMs = 1000.0 / baselineFps;
            long framesProcessed = 1;
            int pushedThisSec = 0;
            int droppedThisSec = 0;
            long secTicks = sessionStartTicks;

            while (!ct.IsCancellationRequested && isStreamingActive())
            {
                double realMs = Stopwatch.GetElapsedTime(sessionStartTicks).TotalMilliseconds;
                long expectedFrames = (long)(realMs / targetFrameTimeMs) + 1;
                int framesToPush = (int)(expectedFrames - framesProcessed);

                if (framesToPush > 0)
                {
                    byte[]? raw = getLatestFrame();
                    if (raw != null)
                    {
                        byte[] buffer = _pool[_poolIndex % 3];
                        _poolIndex++;

                        Buffer.BlockCopy(raw, 0, buffer, 0, raw.Length);

                        if (OperatingSystem.IsWindows())
                        {
                            MouseCursorOverlay.DrawMouseToFrame(buffer, width, height);
                        }

                        if (_channel.Writer.TryWrite(buffer))
                        {
                            framesProcessed++;
                            pushedThisSec++;
                        }
                        else
                        {
                            framesProcessed++;
                            droppedThisSec++;
                            Logger.Warn("[WORKER:VIDEO-PIPE] Channel saturation: bounded queue full. Frame dropped at ingress.");
                        }

                        if (framesToPush > 2)
                        {
                            int skip = framesToPush - 1;
                            framesProcessed += skip;
                            droppedThisSec += skip;
                            Logger.Warn($"[WORKER:VIDEO-PIPE] Severe pacing lag: system skipped {skip} frames behind clock ({realMs:F1}ms elapsed, expected frame #{expectedFrames}).");
                        }
                    }
                    else
                    {
                        Logger.Warn("[WORKER:VIDEO-PIPE] Pacer tick arrived but no captured frame is available in buffer.");
                    }
                }

                if (Stopwatch.GetElapsedTime(secTicks).TotalMilliseconds >= 1000)
                {
                    RealFps = pushedThisSec;
                    DroppedFrames = droppedThisSec;
                    pushedThisSec = 0;
                    droppedThisSec = 0;
                    secTicks = Stopwatch.GetTimestamp();

                    AdjustQos(baselineFps);
                }

                double nextTargetMs = framesProcessed * targetFrameTimeMs;
                while (true)
                {
                    double curMs = Stopwatch.GetElapsedTime(sessionStartTicks).TotalMilliseconds;
                    double diff = nextTargetMs - curMs;
                    if (diff <= 0) break;
                    if (diff > 2) Thread.Sleep(1);
                    else Thread.SpinWait(200);
                }
            }
            Logger.Info("[WORKER:VIDEO-PIPE] Frame pacer loop exited.");
        }

        private void AdjustQos(int baselineFps)
        {
            if (DroppedFrames >= (baselineFps / 2))
            {
                if (CurrentQosTier > 0)
                {
                    CurrentQosTier--;
                    InternalCaptureFps = Math.Max(10, (int)(baselineFps * (CurrentQosTier * 0.25 + 0.25)));
                    Logger.Warn($"[WORKER:VIDEO-PIPE] [AUTO-HEAL] High drop rate ({DroppedFrames} drops/sec). Downscaling capture rate to {InternalCaptureFps} FPS (Tier {CurrentQosTier}).");
                }
            }
            else if (DroppedFrames <= 1 && CurrentQosTier < 3)
            {
                CurrentQosTier++;
                InternalCaptureFps = Math.Max(10, (int)(baselineFps * (CurrentQosTier * 0.25 + 0.25)));
                Logger.Info($"[WORKER:VIDEO-PIPE] [AUTO-HEAL] Pipeline stabilized. Upscaling capture rate to {InternalCaptureFps} FPS (Tier {CurrentQosTier}).");
            }
        }

        public void SetCaptureFps(int fps, int baselineFps)
        {
            int clamped = Math.Min(fps, baselineFps);
            Logger.Info($"[WORKER:VIDEO-PIPE] Dynamic capture FPS update requested: {clamped} FPS (Baseline: {baselineFps}).");
            InternalCaptureFps = clamped;
        }

        public void Complete()
        {
            Logger.Info("[WORKER:VIDEO-PIPE] Completing channel writer.");
            _channel.Writer.TryComplete();
        }
    }
}