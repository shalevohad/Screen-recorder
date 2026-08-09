using System;
using System.Threading;
using System.Threading.Tasks;
using NAudio.CoreAudioApi;
using NAudio.Wave;
using NAudio.Wave.SampleProviders;
using ITBRecorderAgent.Core;

namespace ITBRecorderAgent.Providers.Audio
{
    public class WasapiDualMixer : IDisposable
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

        // חשיפת סטטוס חומרה אמיתי למנוע הטלמטריה
        public bool HasActiveLoopback => _loopbackStream?.IsRealDeviceActive ?? false;
        public bool HasActiveMicrophone => _micStream?.IsRealDeviceActive ?? false;

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

                // 💡 נרמול אקטיבי של ערוצי השמע לפורמט היעד (48kHz Stereo Float) למניעת Mismatch
                var loopbackSampleProvider = EnsureTargetFormat(_loopbackStream.Buffer);
                var micSampleProvider = EnsureTargetFormat(_micStream.Buffer);

                _mixer = new MixingSampleProvider(WaveFormat.CreateIeeeFloatWaveFormat(SampleRate, Channels));
                _mixer.AddMixerInput(loopbackSampleProvider);
                _mixer.AddMixerInput(micSampleProvider);

                StartRenderLoop();
            }
        }

        /// <summary>
        /// מנרמל וממיר כל קלט שמע (IWaveProvider) לפורמט אחיד של 48kHz ו-2 ערוצים (Stereo IEEE Float)
        /// </summary>
        private ISampleProvider EnsureTargetFormat(IWaveProvider waveProvider)
        {
            ISampleProvider sampleProvider = waveProvider.ToSampleProvider();

            // 1. נרמול ערוצים (Mono -> Stereo או Downmix מ-Surround ל-Stereo)
            if (sampleProvider.WaveFormat.Channels == 1 && Channels == 2)
            {
                sampleProvider = new MonoToStereoSampleProvider(sampleProvider);
            }
            else if (sampleProvider.WaveFormat.Channels > 2)
            {
                var multiplexer = new MultiplexingSampleProvider(new[] { sampleProvider }, 2);
                multiplexer.ConnectInputToOutput(0, 0); // Left
                multiplexer.ConnectInputToOutput(1, 1); // Right
                sampleProvider = multiplexer;
            }

            // 2. נרמול תדר דגימה (למשל 44.1kHz / 96kHz -> 48kHz)
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

                Logger.Info("[AUDIO] Shared-Memory Audio Mixing Engine Pipeline started.");

                while (!token.IsCancellationRequested)
                {
                    if (_mixer != null)
                    {
                        int samplesRead = _mixer.Read(sampleBuffer, 0, sampleBuffer.Length);
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