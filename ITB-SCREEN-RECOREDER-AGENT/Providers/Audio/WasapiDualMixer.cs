// 💡 השורה הזו בתחילת הקובץ אומרת ללינוקס: "תתעלם מכל מה שיש פה!"
#if WINDOWS

using System;
using System.Runtime.Versioning;
using System.Threading;
using System.Threading.Tasks;
using NAudio.CoreAudioApi;
using NAudio.Wave;
using NAudio.Wave.SampleProviders;
using ITBRecorderAgent.Core;

namespace ITBRecorderAgent.Providers.Audio
{
    // 💡 ההצהרה הארכיטקטונית המודרנית שמחליפה את ה-#if 
    [SupportedOSPlatform("windows")]
    public class WasapiDualMixer : IAudioCaptureProvider
    {
        private MMDeviceEnumerator? _deviceEnumerator;
        private AudioDeviceNotifier? _deviceNotifier;

        private AudioCaptureStream? _loopbackStream;
        private AudioCaptureStream? _micStream;
        private MixingSampleProvider? _mixer;

        private CancellationTokenSource? _renderCts;
        private readonly object _lockObj = new();
        private bool _isDisposed;

        public int SampleRate => 48000;
        public int Channels => 2;
        public string FFmpegFormat => "f32le";

        public bool HasActiveLoopback => _loopbackStream?.IsRealDeviceActive ?? false;
        public bool HasActiveMicrophone => _micStream?.IsRealDeviceActive ?? false;
        public bool IsRunning { get; private set; }

        public event EventHandler<byte[]>? AudioDataAvailable;

        public void Initialize()
        {
            try
            {
                _deviceEnumerator = new MMDeviceEnumerator();
                _deviceNotifier = new AudioDeviceNotifier();

                _deviceNotifier.DeviceChanged += OnAudioDeviceChanged;
                _deviceEnumerator.RegisterEndpointNotificationCallback(_deviceNotifier);

                Logger.Info("WASAPI Audio Component and Session Watchers mapped.");
            }
            catch (Exception ex)
            {
                Logger.Error($"CRITICAL: Failed to attach system audio enumerator session: {ex.Message}");
            }
        }

        private void StartCaptureStreams()
        {
            lock (_lockObj)
            {
                if (_isDisposed) return;

                StopCaptureStreamsOnly();

                _loopbackStream = new AudioCaptureStream();
                _micStream = new AudioCaptureStream();

                MMDevice? defaultRender = null;
                MMDevice? defaultCapture = null;

                if (_deviceEnumerator != null)
                {
                    try { defaultRender = _deviceEnumerator.GetDefaultAudioEndpoint(DataFlow.Render, Role.Multimedia); } catch { }
                    try { defaultCapture = _deviceEnumerator.GetDefaultAudioEndpoint(DataFlow.Capture, Role.Multimedia); } catch { }
                }

                _loopbackStream.Start(defaultRender, isLoopback: true);
                _micStream.Start(defaultCapture, isLoopback: false);

                var loopbackSampleProvider = EnsureTargetFormat(_loopbackStream.Buffer);
                var micSampleProvider = EnsureTargetFormat(_micStream.Buffer);

                _mixer = new MixingSampleProvider(WaveFormat.CreateIeeeFloatWaveFormat(SampleRate, Channels));
                _mixer.AddMixerInput(loopbackSampleProvider);
                _mixer.AddMixerInput(micSampleProvider);

                StartRenderLoop();
                IsRunning = true;
            }
        }

        private ISampleProvider EnsureTargetFormat(IWaveProvider waveProvider)
        {
            ISampleProvider sampleProvider = waveProvider.ToSampleProvider();

            if (sampleProvider.WaveFormat.Channels == 1 && Channels == 2)
            {
                sampleProvider = new MonoToStereoSampleProvider(sampleProvider);
            }
            else if (sampleProvider.WaveFormat.Channels > 2)
            {
                var multiplexer = new MultiplexingSampleProvider(new[] { sampleProvider }, 2);
                multiplexer.ConnectInputToOutput(0, 0);
                multiplexer.ConnectInputToOutput(1, 1);
                sampleProvider = multiplexer;
            }

            if (sampleProvider.WaveFormat.SampleRate != SampleRate)
            {
                sampleProvider = new WdlResamplingSampleProvider(sampleProvider, SampleRate);
            }

            return sampleProvider;
        }

        private void StartRenderLoop()
        {
            _renderCts?.Cancel();
            _renderCts?.Dispose();
            _renderCts = new CancellationTokenSource();

            var token = _renderCts.Token;

            Task.Run(async () =>
            {
                int bufferSize = SampleRate * Channels * 4 * 20 / 1000; // 20ms chunks
                float[] sampleBuffer = new float[bufferSize / 4];
                byte[] byteBuffer = new byte[bufferSize];

                Logger.Info("[AUDIO] Shared-Memory Audio Mixing Engine Pipeline started (Anti-Starvation Active).");

                while (!token.IsCancellationRequested)
                {
                    if (_mixer != null)
                    {
                        int samplesRead = 0;
                        try
                        {
                            samplesRead = _mixer.Read(sampleBuffer, 0, sampleBuffer.Length);
                        }
                        catch { }

                        // מנגנון ה-Anti-Starvation: הזרקת באפר אפסים (שקט) במקרה ש-Windows לא מחזירה פריימים
                        if (samplesRead < sampleBuffer.Length)
                        {
                            Array.Clear(sampleBuffer, samplesRead, sampleBuffer.Length - samplesRead);
                            samplesRead = sampleBuffer.Length;
                        }

                        if (samplesRead > 0)
                        {
                            System.Buffer.BlockCopy(sampleBuffer, 0, byteBuffer, 0, samplesRead * 4);
                            AudioDataAvailable?.Invoke(this, byteBuffer);
                        }
                    }
                    await Task.Delay(20, token).ConfigureAwait(false);
                }
            }, token);
        }

        private void OnAudioDeviceChanged()
        {
            if (_isDisposed) return;
            Logger.Warn("Audio device change detected. Re-aligning streams...");
            Task.Run(() =>
            {
                Thread.Sleep(1000);
                StartCaptureStreams();
            });
        }

        private void StopCaptureStreamsOnly()
        {
            _loopbackStream?.Dispose();
            _loopbackStream = null;
            _micStream?.Dispose();
            _micStream = null;
            _mixer = null;
            IsRunning = false;
        }

        public void Stop() => StopCaptureStreamsOnly();
        public void Start() => StartCaptureStreams();

        public void Dispose()
        {
            lock (_lockObj)
            {
                if (_isDisposed) return;
                _isDisposed = true;

                _renderCts?.Cancel();
                _renderCts?.Dispose();

                if (_deviceEnumerator != null && _deviceNotifier != null)
                {
                    try { _deviceEnumerator.UnregisterEndpointNotificationCallback(_deviceNotifier); } catch { }
                }

                StopCaptureStreamsOnly();
                _deviceEnumerator?.Dispose();
            }
        }
    }
}

#endif // סגירת הבלוק בסוף הקובץ