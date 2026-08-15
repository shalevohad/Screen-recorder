using System;
using System.Runtime.Versioning;
using NAudio.CoreAudioApi;
using NAudio.Wave;
using ITBRecorderAgent;

namespace ITBRecorderAgent.Providers.Audio
{
    [SupportedOSPlatform("windows")]
    public class WasapiDualMixer : IAudioCaptureProvider
    {
        public event EventHandler<byte[]>? AudioDataAvailable;

        public bool HasActiveLoopback => _loopbackCapture != null && _loopbackCapture.CaptureState == CaptureState.Capturing;
        public bool HasActiveMicrophone => _micCapture != null && _micCapture.CaptureState == CaptureState.Capturing;
        public bool IsRunning { get; private set; }

        private WasapiLoopbackCapture? _loopbackCapture;
        private WasapiCapture? _micCapture;
        private AudioDeviceNotifier? _notifier;
        private MMDeviceEnumerator? _deviceEnumerator;

        private readonly object _lock = new object();

        public void Initialize()
        {
            try
            {
                _deviceEnumerator = new MMDeviceEnumerator();
                _notifier = new AudioDeviceNotifier();
                _deviceEnumerator.RegisterEndpointNotificationCallback(_notifier);

                // 💡 תיקון השגיאה: שימוש בשם האירוע והחתימה הנכונים
                _notifier.DeviceChanged += OnAudioDeviceChanged;

                SetupCaptures();
            }
            catch (Exception ex)
            {
                Logger.Error($"[AUDIO] WASAPI Initialization error: {ex.Message}");
            }
        }

        private void SetupCaptures()
        {
            lock (_lock)
            {
                try
                {
                    _loopbackCapture = new WasapiLoopbackCapture();
                    _loopbackCapture.DataAvailable += (s, e) =>
                    {
                        if (e.BytesRecorded > 0)
                        {
                            byte[] data = e.Buffer.AsSpan(0, e.BytesRecorded).ToArray();
                            AudioDataAvailable?.Invoke(this, data);
                        }
                    };
                }
                catch (Exception ex)
                {
                    Logger.Warn($"[AUDIO] Playback device not found: {ex.Message}");
                    _loopbackCapture = null;
                }

                try
                {
                    var micDevice = _deviceEnumerator?.GetDefaultAudioEndpoint(DataFlow.Capture, Role.Communications);
                    if (micDevice != null)
                    {
                        _micCapture = new WasapiCapture(micDevice);
                        _micCapture.DataAvailable += (s, e) =>
                        {
                            if (e.BytesRecorded > 0 && _loopbackCapture == null)
                            {
                                byte[] data = e.Buffer.AsSpan(0, e.BytesRecorded).ToArray();
                                AudioDataAvailable?.Invoke(this, data);
                            }
                        };
                    }
                }
                catch (Exception ex)
                {
                    Logger.Warn($"[AUDIO] Microphone not found: {ex.Message}");
                    _micCapture = null;
                }
            }
        }

        public void Start()
        {
            lock (_lock)
            {
                if (IsRunning) return;
                _loopbackCapture?.StartRecording();
                _micCapture?.StartRecording();
                IsRunning = true;
                Logger.Info("[AUDIO] WASAPI capture started.");
            }
        }

        public void Stop()
        {
            lock (_lock)
            {
                if (!IsRunning) return;
                _loopbackCapture?.StopRecording();
                _micCapture?.StopRecording();
                IsRunning = false;
                Logger.Info("[AUDIO] WASAPI capture stopped.");
            }
        }

        // 💡 שינוי מ-EventHandler ל-Action תואם ל-AudioDeviceNotifier
        private void OnAudioDeviceChanged()
        {
            Logger.Warn("[AUDIO] Audio endpoint change detected. Reinitializing WASAPI...");
            lock (_lock)
            {
                bool wasRunning = IsRunning;
                Stop();
                _loopbackCapture?.Dispose();
                _micCapture?.Dispose();
                SetupCaptures();
                if (wasRunning) Start();
            }
        }

        public void Dispose()
        {
            Stop();
            _loopbackCapture?.Dispose();
            _micCapture?.Dispose();

            if (_deviceEnumerator != null && _notifier != null)
            {
                try { _deviceEnumerator.UnregisterEndpointNotificationCallback(_notifier); } catch { }
            }

            _deviceEnumerator?.Dispose();
            _deviceEnumerator = null;
        }
    }
}