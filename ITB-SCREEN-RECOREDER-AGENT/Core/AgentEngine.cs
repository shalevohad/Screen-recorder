using System;
using System.Diagnostics;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using ITBRecorderAgent;
using ITBRecorderAgent.Engine;
using ITBRecorderAgent.Providers.Audio;
using ITBRecorderAgent.Providers.Video;
using ITB_SCREEN_RECORDER.Core.Models;

namespace ITBRecorderAgent.Core
{
    public class AgentEngine : IDisposable
    {
        private readonly AppConfig _config;
        private readonly string _rtmpTarget;
        private FfmpegProcessManager? _ffmpegManager;
        private IScreenCaptureProvider? _screenCapture;
        private IAudioCaptureProvider? _audioCapture;
        private TelemetryReporter? _telemetry;
        private readonly HardwareTelemetry _hardwareTelemetry;

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

            string rawMachineName = Environment.MachineName;
            string safeMachineName = Uri.EscapeDataString(rawMachineName.Replace(" ", "_"));
            _rtmpTarget = $"{_config.RtmpServerBaseUrl.TrimEnd('/')}/{safeMachineName}";

            _shouldStreamActive = _config.AutoStartRecordingOnLaunch;
            _hardwareTelemetry = new HardwareTelemetry();

            Logger.Info($"[ENGINE] Initialized. AutoStartRecording: {_shouldStreamActive}");
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            _telemetry = new TelemetryReporter(_config.DashboardApiUrl);
            _ = Task.Run(() => _telemetry.StartReportingAsync(GetCurrentTelemetryReport, HandleServerCommand, cancellationToken), cancellationToken);

            int targetFrameTimeMs = 1000 / _config.TargetFps;

            while (!cancellationToken.IsCancellationRequested)
            {
                bool currentStreamState;
                lock (_stateLock)
                {
                    currentStreamState = _shouldStreamActive;
                }

                bool requiresActivePipeline = currentStreamState || (_config.AutoStartRecordingOnLaunch && !_telemetry.IsOnline);

                if (!_telemetry.IsOnline && !_isInOfflineMode && requiresActivePipeline)
                {
                    _isInOfflineMode = true;
                    Logger.Warn("Offline mode activated. Recording to local buffer...");
                    TeardownMediaPipelines();
                    await Task.Delay(1000, cancellationToken).ConfigureAwait(false);
                }
                else if (_telemetry.IsOnline && _isInOfflineMode)
                {
                    _isInOfflineMode = false;
                    Logger.Info("Online restored. Closing offline buffer...");
                    TeardownMediaPipelines();
                    await Task.Delay(1000, cancellationToken).ConfigureAwait(false);
                }

                if (!requiresActivePipeline)
                {
                    await Task.Delay(1000, cancellationToken).ConfigureAwait(false);
                    continue;
                }

                if (_screenCapture == null)
                {
                    try
                    {
                        _screenCapture = ScreenCaptureFactory.Create();
                        _screenCapture.Initialize();
                    }
                    catch (Exception ex)
                    {
                        Logger.Error($"Screen capture initialization failed: {ex.Message}");
                        await Task.Delay(1000, cancellationToken).ConfigureAwait(false);
                        continue;
                    }
                }

                if (_ffmpegManager == null || !_ffmpegManager.IsRunning)
                {
                    DateTime calibratedTime = DateTime.UtcNow + _serverUtcOffset;
                    string destination = _isInOfflineMode ? GetLocalBufferPath(calibratedTime) : _rtmpTarget;

                    _ffmpegManager = new FfmpegProcessManager(_config);

                    bool started = await _ffmpegManager.StartAsync(
                        destination,
                        calibratedTime,
                        _screenCapture.Width,
                        _screenCapture.Height,
                        48000,
                        2,
                        "f32le",
                        cancellationToken).ConfigureAwait(false);

                    if (!started)
                    {
                        TeardownMediaPipelines();
                        await Task.Delay(2000, cancellationToken).ConfigureAwait(false);
                        continue;
                    }

                    byte[] initialFrame = new byte[_screenCapture.Width * _screenCapture.Height * 4];
                    _ffmpegManager.WriteVideoFrame(initialFrame);

                    bool audioConnected = await _ffmpegManager.CompleteAudioHandshakeAsync(cancellationToken).ConfigureAwait(false);
                    if (!audioConnected)
                    {
                        TeardownMediaPipelines();
                        await Task.Delay(2000, cancellationToken).ConfigureAwait(false);
                        continue;
                    }
                }

                if (_audioCapture == null)
                {
                    try
                    {
                        _audioCapture = AudioCaptureFactory.Create();
                        _audioCapture.Initialize();
                        _audioCapture.AudioDataAvailable += (s, data) =>
                        {
                            _ffmpegManager?.WriteAudioData(data);
                        };
                        _audioCapture.Start();
                    }
                    catch (Exception ex)
                    {
                        Logger.Error($"Audio provider initialization failed: {ex.Message}");
                    }
                }

                long swStart = Stopwatch.GetTimestamp();

                if (_screenCapture.TryCaptureFrame(out byte[]? frameData) && frameData is not null)
                {
                    if (OperatingSystem.IsWindows())
                    {
                        MouseCursorOverlay.DrawMouseToFrame(frameData, _screenCapture.Width, _screenCapture.Height);
                    }

                    if (!_ffmpegManager.WriteVideoFrame(frameData))
                    {
                        Logger.Error("Media pipe broken. Resetting pipeline.");
                        TeardownMediaPipelines();
                        continue;
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
            var currentStatus = AgentStatus.Standby;

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
                CpuUsagePercentage = _hardwareTelemetry.GetCpuUsagePercentage(),
                GpuUsagePercentage = _hardwareTelemetry.GetGpuUsagePercentage(),
                IsStreaming = currentStreamState
            };
        }

        private string GetLocalIpAddress()
        {
            try
            {
                using var socket = new System.Net.Sockets.Socket(System.Net.Sockets.AddressFamily.InterNetwork, System.Net.Sockets.SocketType.Dgram, 0);
                socket.Connect("8.8.8.8", 65530);
                return (socket.LocalEndPoint as System.Net.IPEndPoint)?.Address.ToString() ?? "127.0.0.1";
            }
            catch
            {
                return "127.0.0.1";
            }
        }

        private void HandleServerCommand(AgentHeartbeatResponse response)
        {
            if (response == null) return;

            lock (_stateLock)
            {
                _serverUtcOffset = response.ServerUtcTime - DateTime.UtcNow;
                bool requestedStreamingState = _shouldStreamActive;

                if (response.Command == ServerCommand.StartStream)
                {
                    requestedStreamingState = true;
                }
                else if (response.Command == ServerCommand.StopStream)
                {
                    requestedStreamingState = false;
                }
                else if (response.Command == ServerCommand.Standby)
                {
                    requestedStreamingState = response.ShouldStream;
                }

                if (requestedStreamingState != _shouldStreamActive)
                {
                    _shouldStreamActive = requestedStreamingState;
                    Logger.Info($"[C2 COMMAND] Server set streaming state to: {_shouldStreamActive}");

                    if (!_shouldStreamActive)
                    {
                        Task.Run(() => TeardownMediaPipelines());
                    }
                }
            }
        }

        private string GetLocalBufferPath(DateTime time)
        {
            Directory.CreateDirectory(_config.LocalBufferPath);
            return Path.Combine(_config.LocalBufferPath, $"{Environment.MachineName}_{time:yyyyMMdd_HHmmss}.flv");
        }

        private void TeardownMediaPipelines()
        {
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

                Logger.Info("Pipelines dismantled cleanly.");
            }
            catch (Exception ex)
            {
                Logger.Error($"Error during pipeline teardown: {ex.Message}");
            }
        }

        public void Dispose()
        {
            TeardownMediaPipelines();
            _hardwareTelemetry.Dispose();
            Logger.Info("Agent Core resources disposed.");
        }
    }
}