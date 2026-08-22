using System;
using System.Diagnostics;
using System.IO;
using System.IO.Pipes;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
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
        private readonly SemaphoreSlim _streamPermissionSignal = new SemaphoreSlim(0, 1);
        private readonly AppConfig _config;
        private volatile bool _isStreamingRequested = false;
        private volatile bool _requiresImmediateRestart = false;

        public WorkerEngine(AppConfig config)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));
        }

        public async Task RunAsync(CancellationToken ct)
        {
            DebugHelper.ApplyConsoleVisibility();
            using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(ct);
            CancellationToken localToken = linkedCts.Token;

            _ = Task.Run(() => MaintainIpcCommunicationAsync(linkedCts), localToken);

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

                try
                {
                    screenCapture = ScreenCaptureFactory.Create();
                    screenCapture.Initialize();

                    audioCapture = AudioCaptureFactory.Create();
                    audioCapture.Initialize();

                    ffmpegManager = new FfmpegProcessManager(_config);
                    audioCapture.AudioDataAvailable += (s, data) =>
                    {
                        if (ffmpegManager != null && ffmpegManager.IsRunning) ffmpegManager.WriteAudioData(data);
                    };
                    audioCapture.Start();

                    await Task.Delay(100, localToken);

                    string safeMachineName = Uri.EscapeDataString(Environment.MachineName.Replace(" ", "_"));
                    string rtmpTarget = $"{_config.RtmpServerBaseUrl.TrimEnd('/')}/{safeMachineName}";

                    bool started = await ffmpegManager.StartAsync(rtmpTarget, DateTime.UtcNow, screenCapture.Width, screenCapture.Height, 48000, 2, "f32le", localToken).ConfigureAwait(false);
                    if (!started)
                    {
                        _isStreamingRequested = false;
                        continue;
                    }

                    byte[] initialFrame = new byte[screenCapture.Width * screenCapture.Height * 4];
                    ffmpegManager.WriteVideoFrame(initialFrame);

                    if (!await ffmpegManager.CompleteAudioHandshakeAsync(localToken).ConfigureAwait(false))
                    {
                        _isStreamingRequested = false;
                        continue;
                    }

                    Logger.Info("[WorkerEngine] Capture and streaming are active.");
                    int targetFrameTimeMs = 1000 / _config.TargetFps;

                    while (!localToken.IsCancellationRequested && _isStreamingRequested && !_requiresImmediateRestart)
                    {
                        long swStart = Stopwatch.GetTimestamp();
                        byte[]? currentFrame = null;

                        if (screenCapture.TryCaptureFrame(out byte[]? frameData) && frameData != null)
                        {
                            lastVideoFrame = frameData;
                            currentFrame = frameData;
                        }
                        else if (lastVideoFrame != null)
                        {
                            currentFrame = lastVideoFrame;
                        }

                        if (currentFrame != null)
                        {
                            byte[] frameToWrite = new byte[currentFrame.Length];
                            Buffer.BlockCopy(currentFrame, 0, frameToWrite, 0, currentFrame.Length);
#if WINDOWS
                            if (OperatingSystem.IsWindows()) MouseCursorOverlay.DrawMouseToFrame(frameToWrite, screenCapture.Width, screenCapture.Height);
#endif
                            if (!ffmpegManager.WriteVideoFrame(frameToWrite)) break;
                        }

                        long elapsedMs = (long)Stopwatch.GetElapsedTime(swStart).TotalMilliseconds;
                        int delay = targetFrameTimeMs - (int)elapsedMs;
                        if (delay > 0) await Task.Delay(delay, localToken).ConfigureAwait(false);
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
                                    string cmd = line.Trim();

                                    if (cmd.Equals("Stop", StringComparison.OrdinalIgnoreCase) || cmd.Equals("GracefulShutdown", StringComparison.OrdinalIgnoreCase))
                                    {
                                        Logger.Info("[WorkerEngine] Received STOP command.");
                                        _isStreamingRequested = false;
                                    }
                                    else if (cmd.Equals("Start", StringComparison.OrdinalIgnoreCase) || cmd.Equals("ResumeAfterUnlock", StringComparison.OrdinalIgnoreCase))
                                    {
                                        Logger.Info("[WorkerEngine] Received START command.");
                                        _isStreamingRequested = true;
                                        if (_streamPermissionSignal.CurrentCount == 0) _streamPermissionSignal.Release();
                                    }
                                    else if (cmd.Equals("Restart", StringComparison.OrdinalIgnoreCase))
                                    {
                                        Logger.Info("[WorkerEngine] Received RESTART command for on-the-fly policy update.");
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