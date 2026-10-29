// Windows-only WASAPI loopback and microphone dual mixer implementation
#if WINDOWS

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.Versioning;
using System.Threading;
using System.Threading.Tasks;
using NAudio.CoreAudioApi;
using NAudio.Wave;
using NAudio.Wave.SampleProviders;
using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Configuration;

namespace ITBRecorderAgent.Providers.Audio
{
    /// <summary>
    /// Dual audio capture provider that captures and hardware-mixes speaker loopback and microphone audio via WASAPI.
    /// Multi-device resilient: automatically hooks all active playback endpoints and the default microphone.
    /// </summary>
    [SupportedOSPlatform("windows")]
    public class WasapiDualMixer : IAudioCaptureProvider
    {
        private MMDeviceEnumerator? _deviceEnumerator;
        private AudioDeviceNotifier? _deviceNotifier;

        private readonly List<AudioCaptureStream> _loopbackStreams = new();
        private AudioCaptureStream? _micStream;
        private MixingSampleProvider? _mixer;

        private CancellationTokenSource? _renderCts;
        private readonly object _lockObj = new();
        private bool _isDisposed;

        public int SampleRate => 48000;
        public int Channels => 2;
        public string FFmpegFormat => "f32le";

        public bool HasActiveLoopback => _loopbackStreams.Exists(s => s.IsRealDeviceActive);
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

                _mixer = new MixingSampleProvider(WaveFormat.CreateIeeeFloatWaveFormat(SampleRate, Channels));

                var renderDevices = new List<MMDevice>();
                MMDevice? defaultCapture = null;

                if (_deviceEnumerator != null)
                {
                    try
                    {
                        var endpoints = _deviceEnumerator.EnumerateAudioEndPoints(DataFlow.Render, DeviceState.Active);
                        foreach (var ep in endpoints)
                        {
                            renderDevices.Add(ep);
                        }
                    }
                    catch (Exception ex)
                    {
                        Logger.Warn($"[AUDIO] Failed enumerating active render endpoints: {ex.Message}");
                    }

                    // Fallback to default render endpoints if enumeration was empty
                    if (renderDevices.Count == 0)
                    {
                        try
                        {
                            var defConsole = _deviceEnumerator.GetDefaultAudioEndpoint(DataFlow.Render, Role.Console);
                            if (defConsole != null) renderDevices.Add(defConsole);
                        }
                        catch { }

                        try
                        {
                            var defMulti = _deviceEnumerator.GetDefaultAudioEndpoint(DataFlow.Render, Role.Multimedia);
                            if (defMulti != null && !renderDevices.Exists(d => d.ID == defMulti.ID))
                            {
                                renderDevices.Add(defMulti);
                            }
                        }
                        catch { }
                    }

                    try { defaultCapture = _deviceEnumerator.GetDefaultAudioEndpoint(DataFlow.Capture, Role.Console); } catch { }
                    if (defaultCapture == null)
                    {
                        try { defaultCapture = _deviceEnumerator.GetDefaultAudioEndpoint(DataFlow.Capture, Role.Multimedia); } catch { }
                    }
                }

                // If no render devices at all, create one silence stream
                if (renderDevices.Count == 0)
                {
                    var fallbackStream = new AudioCaptureStream();
                    fallbackStream.Start(null, isLoopback: true);
                    _loopbackStreams.Add(fallbackStream);
                    var sp = EnsureTargetFormat(fallbackStream.Buffer!);
                    _mixer.AddMixerInput(sp);
                    Logger.Warn("[AUDIO] No active render devices found on system. Initialized synthetic silence loopback.");
                }
                else
                {
                    foreach (var dev in renderDevices)
                    {
                        try
                        {
                            var stream = new AudioCaptureStream();
                            stream.Start(dev, isLoopback: true);
                            _loopbackStreams.Add(stream);
                            if (stream.Buffer != null)
                            {
                                var sp = EnsureTargetFormat(stream.Buffer);
                                _mixer.AddMixerInput(sp);
                                Logger.Info($"[AUDIO] Hooked WASAPI loopback on render device '{dev.FriendlyName}'.");
                            }
                        }
                        catch (Exception ex)
                        {
                            Logger.Warn($"[AUDIO] Could not hook loopback on '{dev.FriendlyName}': {ex.Message}");
                        }
                    }
                }

                // Hook microphone stream
                _micStream = new AudioCaptureStream();
                _micStream.Start(defaultCapture, isLoopback: false);
                if (_micStream.Buffer != null)
                {
                    var micSp = EnsureTargetFormat(_micStream.Buffer);
                    _mixer.AddMixerInput(micSp);
                }

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

            Task.Run(() =>
            {
                int bufferSize = SampleRate * Channels * 4 * 20 / 1000; // 20ms chunks (7680 bytes)
                float[] sampleBuffer = new float[bufferSize / 4];
                byte[] byteBuffer = new byte[bufferSize];

                Logger.Info("[AUDIO] Shared-Memory Audio Mixing Engine Pipeline started (Anti-Starvation Active, High-Precision Pacing).");

                long startTicks = Stopwatch.GetTimestamp();
                long chunksSent = 0;
                double ticksPer20ms = (double)Stopwatch.Frequency * 0.020;

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

                        // Anti-starvation mechanism: inject zero buffer (silence) if Windows returns incomplete or empty audio samples
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

                    chunksSent++;
                    long targetTicks = startTicks + (long)(chunksSent * ticksPer20ms);
                    long currentTicks = Stopwatch.GetTimestamp();
                    long remainingTicks = targetTicks - currentTicks;

                    if (remainingTicks > 0)
                    {
                        int sleepMs = (int)(remainingTicks * 1000 / Stopwatch.Frequency);
                        if (sleepMs > 1)
                        {
                            Thread.Sleep(sleepMs - 1);
                        }
                        while (Stopwatch.GetTimestamp() < targetTicks && !token.IsCancellationRequested)
                        {
                            Thread.SpinWait(20);
                        }
                    }
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
            foreach (var stream in _loopbackStreams)
            {
                try { stream.Dispose(); } catch { }
            }
            _loopbackStreams.Clear();

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

#endif
