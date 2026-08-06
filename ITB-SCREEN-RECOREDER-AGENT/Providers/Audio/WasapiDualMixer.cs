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
            }
            catch (Exception ex)
            {
                Logger.Warn($"CoreAudioApi not available: {ex.Message}. Agent will run in pure Silence Mode.");
            }

            StartCaptureStreams();
            StartMixingLoop();

            Logger.Info($"WASAPI Dual Mixer initialized ({SampleRate}Hz Stereo Float).");
        }

        private void StartCaptureStreams()
        {
            lock (_lockObj)
            {
                StopCaptureStreamsOnly();

                _loopbackStream = new AudioCaptureStream();
                MMDevice? renderDevice = null;
                try { renderDevice = _deviceEnumerator?.GetDefaultAudioEndpoint(DataFlow.Render, Role.Multimedia); } catch { }

                if (_loopbackStream.Start(renderDevice, isLoopback: true) && renderDevice != null)
                {
                    Logger.Info($"Loopback captured: {renderDevice.FriendlyName}");
                }

                _micStream = new AudioCaptureStream();
                MMDevice? captureDevice = null;
                try { captureDevice = _deviceEnumerator?.GetDefaultAudioEndpoint(DataFlow.Capture, Role.Multimedia); } catch { }

                if (_micStream.Start(captureDevice, isLoopback: false) && captureDevice != null)
                {
                    Logger.Info($"Microphone captured: {captureDevice.FriendlyName}");
                }

                BuildMixerGraph();
            }
        }

        private void BuildMixerGraph()
        {
            var sampleProviders = new System.Collections.Generic.List<ISampleProvider>();

            if (_loopbackStream?.Buffer != null)
                sampleProviders.Add(NormalizeToTargetFormat(_loopbackStream.Buffer));

            if (_micStream?.Buffer != null)
                sampleProviders.Add(NormalizeToTargetFormat(_micStream.Buffer));

            _mixer = sampleProviders.Count > 0 ? new MixingSampleProvider(sampleProviders) : null;
        }

        private ISampleProvider NormalizeToTargetFormat(BufferedWaveProvider buffer)
        {
            ISampleProvider provider = buffer.ToSampleProvider();
            if (provider.WaveFormat.SampleRate != SampleRate)
                provider = new WdlResamplingSampleProvider(provider, SampleRate);
            if (provider.WaveFormat.Channels == 1 && Channels == 2)
                provider = provider.ToStereo();
            return provider;
        }

        private void StartMixingLoop()
        {
            _renderCts = new CancellationTokenSource();
            var token = _renderCts.Token;

            Task.Run(async () =>
            {
                int samplesPerBuffer = (SampleRate * Channels * 20) / 1000;
                float[] sampleBuffer = new float[samplesPerBuffer];
                byte[] byteBuffer = new byte[samplesPerBuffer * sizeof(float)];

                while (!token.IsCancellationRequested)
                {
                    lock (_lockObj)
                    {
                        if (_mixer != null)
                        {
                            int readSamples = _mixer.Read(sampleBuffer, 0, samplesPerBuffer);
                            if (readSamples > 0)
                            {
                                Buffer.BlockCopy(sampleBuffer, 0, byteBuffer, 0, readSamples * sizeof(float));
                                AudioDataAvailable?.Invoke(this, byteBuffer);
                            }
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