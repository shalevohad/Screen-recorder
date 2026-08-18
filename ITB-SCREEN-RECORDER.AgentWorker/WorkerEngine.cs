using System;
using System.Diagnostics;
using System.IO.Pipes;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Ipc;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Common;

using ITBRecorderAgent.Providers.Video;
using ITBRecorderAgent.Providers.Audio;
using ITBRecorderAgent.Engine;

namespace ITB_SCREEN_RECORDER.AgentWorker
{
    public class WorkerEngine
    {
        private readonly AppConfig _config;
        private readonly IScreenCaptureProvider _screenCapture;
        private readonly IAudioCaptureProvider _audioCapture;
        private readonly FfmpegProcessManager _ffmpegManager;

        private byte[]? _lastVideoFrame;
        private readonly string _rtmpTarget;

        public WorkerEngine(AppConfig config)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));

            string safeMachineName = Uri.EscapeDataString(Environment.MachineName.Replace(" ", "_"));
            _rtmpTarget = $"{_config.RtmpServerBaseUrl.TrimEnd('/')}/{safeMachineName}";

            _screenCapture = ScreenCaptureFactory.Create();
            _audioCapture = AudioCaptureFactory.Create();
            _ffmpegManager = new FfmpegProcessManager(_config);
        }

        public async Task RunAsync(CancellationToken ct)
        {
            Logger.Info("[WorkerEngine] Starting initialization of capture engines...");

            _screenCapture.Initialize();

            _audioCapture.Initialize();
            _audioCapture.AudioDataAvailable += (s, data) =>
            {
                if (_ffmpegManager != null && _ffmpegManager.IsRunning)
                {
                    _ffmpegManager.WriteAudioData(data);
                }
            };
            _audioCapture.Start();

            await Task.Delay(100, ct);

            bool started = await _ffmpegManager.StartAsync(
                _rtmpTarget,
                DateTime.UtcNow,
                _screenCapture.Width,
                _screenCapture.Height,
                48000,
                2,
                "f32le",
                ct).ConfigureAwait(false);

            if (!started)
            {
                Logger.Error("[WorkerEngine] Failed to start the FFmpeg pipeline.");
                return;
            }

            byte[] initialFrame = new byte[_screenCapture.Width * _screenCapture.Height * 4];
            _ffmpegManager.WriteVideoFrame(initialFrame);

            bool audioConnected = await _ffmpegManager.CompleteAudioHandshakeAsync(ct).ConfigureAwait(false);
            if (!audioConnected)
            {
                Logger.Error("[WorkerEngine] Failed to connect the audio channel to FFmpeg.");
                return;
            }

            Logger.Info("[WorkerEngine] Capture and streaming are active. Starting synchronization loop (Pacing).");

            _ = Task.Run(() => MaintainIpcHeartbeatAsync(ct), ct);

            int targetFrameTimeMs = 1000 / _config.TargetFps;
            long totalFrames = 0;

            while (!ct.IsCancellationRequested)
            {
                long swStart = Stopwatch.GetTimestamp();
                byte[]? currentFrame = null;

                if (_screenCapture.TryCaptureFrame(out byte[]? frameData) && frameData != null)
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
                        Logger.Error("[WorkerEngine] Video streaming to FFmpeg failed on the current frame.");
                        break;
                    }
                    totalFrames++;
                }

                long elapsedMs = (long)Stopwatch.GetElapsedTime(swStart).TotalMilliseconds;
                int delay = targetFrameTimeMs - (int)elapsedMs;

                if (delay > 0)
                {
                    await Task.Delay(delay, ct).ConfigureAwait(false);
                }
            }

            Teardown();
        }

        private async Task MaintainIpcHeartbeatAsync(CancellationToken ct)
        {
            while (!ct.IsCancellationRequested)
            {
                try
                {
                    using var client = new NamedPipeClientStream(".", "ITB_Agent_IPC", PipeDirection.Out);
                    await client.ConnectAsync(3000, ct);

                    using var writer = new StreamWriter(client) { AutoFlush = true };

                    while (!ct.IsCancellationRequested && client.IsConnected)
                    {
                        var msg = new WorkerIpcStatusMessage
                        {
                            SessionState = InternalSessionState.ActiveInteractive,
                            CurrentFps = _config.TargetFps,
                            IsStreaming = true
                        };

                        await writer.WriteLineAsync(JsonSerializer.Serialize(msg));
                        await Task.Delay(2000, ct);
                    }
                }
                catch
                {
                    await Task.Delay(2000, ct);
                }
            }
        }

        private void Teardown()
        {
            Logger.Info("[WorkerEngine] Stopping and tearing down resources...");
            try
            {
                _audioCapture?.Stop();
                if (_audioCapture is IDisposable audioDisp) audioDisp.Dispose();

                if (_screenCapture is IDisposable screenDisp) screenDisp.Dispose();

                _ffmpegManager?.Dispose();
                _lastVideoFrame = null;
            }
            catch (Exception ex)
            {
                Logger.Error($"[WorkerEngine] Error during resource teardown: {ex.Message}");
            }
        }
    }
}