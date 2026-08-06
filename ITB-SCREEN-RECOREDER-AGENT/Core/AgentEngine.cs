using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using ITBRecorderAgent.Engine;
using ITBRecorderAgent.Providers.Audio;
using ITBRecorderAgent.Providers.Video;

namespace ITBRecorderAgent.Core
{
    public class AgentEngine : IDisposable
    {
        private readonly AppConfig _config;
        private readonly string _rtmpTarget;
        private FfmpegProcessManager? _ffmpegManager;
        private DxgiScreenCapture? _screenCapture;
        private WasapiDualMixer? _audioCapture;
        private TelemetryReporter? _telemetry;

        public AgentEngine(AppConfig config)
        {
            _config = config;
            string rawMachineName = Environment.MachineName;
            string safeMachineName = Uri.EscapeDataString(rawMachineName.Replace(" ", "_"));
            _rtmpTarget = $"{_config.RtmpServerBaseUrl.TrimEnd('/')}/{safeMachineName}";
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            // אתחול החיישנים המקומיים
            _screenCapture = new DxgiScreenCapture();
            _screenCapture.Initialize();

            _audioCapture = new WasapiDualMixer();
            _audioCapture.Initialize();

            _audioCapture.AudioDataAvailable += (s, data) =>
            {
                _ffmpegManager?.WriteAudioData(data);
            };

            // הפעלת שירות הטלמטריה (רכיב זה חייב לרוץ ברקע ולשדר כל 5 שניות)
            _telemetry = new TelemetryReporter(_config.DashboardApiUrl);
            _ = _telemetry.StartReportingAsync(() => new AgentTelemetry
            {
                IsFfmpegRunning = _ffmpegManager?.IsRunning ?? false,
                IsScreenCapturing = _screenCapture != null,
                HasActiveSpeakers = _audioCapture.HasActiveLoopback,
                HasActiveMicrophone = _audioCapture.HasActiveMicrophone
            }, cancellationToken);

            Logger.Info($"Agent Core started. Awaiting Middleware verification at {_config.DashboardApiUrl}...");

            int targetFrameTimeMs = 1000 / _config.TargetFps;

            while (!cancellationToken.IsCancellationRequested)
            {
                // ========================================================
                // 1. THE GATEKEEPER: בדיקת חיות של ה-Middleware
                // ========================================================
                if (!_telemetry.IsOnline)
                {
                    // אם ה-AV פועל אבל ה-Middleware נפל - נבצע Kill לשידור
                    if (_ffmpegManager != null)
                    {
                        Logger.Warn("Middleware connection lost. Halting AV stream strictly.");
                        _audioCapture.Stop();
                        _ffmpegManager.Dispose();
                        _ffmpegManager = null;
                    }

                    // המתנה קלה ב-Idle עד שלולאת הטלמטריה תצליח להתחבר מחדש
                    await Task.Delay(1000, cancellationToken);
                    continue; // מדלג לסיבוב הבא - לא מאפשר ל-FFmpeg לעלות
                }

                // ========================================================
                // 2. WATCHDOG: בדיקת שרת MediaMTX ותהליך FFmpeg מקומי
                // ========================================================
                if (_ffmpegManager == null || !_ffmpegManager.IsRunning)
                {
                    Logger.Warn($"Pipeline inactive. Attempting connection to MediaMTX in {_config.ReconnectDelaySeconds} seconds...");

                    _audioCapture.Stop();
                    _ffmpegManager?.Dispose();

                    try
                    {
                        await Task.Delay(_config.ReconnectDelaySeconds * 1000, cancellationToken);

                        _ffmpegManager = new FfmpegProcessManager(_config, _rtmpTarget);

                        bool isStarted = await _ffmpegManager.StartAsync(
                            _screenCapture.Width, _screenCapture.Height,
                            _audioCapture.SampleRate, _audioCapture.Channels, _audioCapture.FFmpegFormat,
                            cancellationToken);

                        if (!isStarted)
                        {
                            Logger.Error("Could not initialize FFmpeg / connect to MediaMTX. Retrying next cycle.");
                            _ffmpegManager.Dispose();
                            _ffmpegManager = null;
                            continue;
                        }

                        _audioCapture.Start();
                        Logger.Info("AV Pipeline successfully established and streaming.");
                    }
                    catch (TaskCanceledException)
                    {
                        break;
                    }

                    continue;
                }

                // ========================================================
                // 3. CAPTURE & DISPATCH: הזרמת וידאו (אם הכל ירוק)
                // ========================================================
                long swStart = Stopwatch.GetTimestamp();

                if (_screenCapture.TryCaptureFrame(out byte[]? frameData) && frameData is not null)
                {
                    if (!_ffmpegManager.WriteVideoFrame(frameData))
                    {
                        Logger.Error("Video pipe broken (MediaMTX likely dropped). Forcing reconnect cycle.");
                        _ffmpegManager.Dispose();
                        _ffmpegManager = null;
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

        public void Dispose()
        {
            _telemetry?.Dispose();
            _audioCapture?.Dispose();
            _ffmpegManager?.Dispose();
            _screenCapture?.Dispose();
            Logger.Info("Agent Core resources disposed cleanly.");
        }
    }
}