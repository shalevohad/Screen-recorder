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
    /// Dual discrete audio capture provider that captures loopback (system audio) and microphone audio via WASAPI
    /// and multiplexes them into discrete stereo channels:
    /// - Channel 0 (Left): Loopback (System audio, incoming communications, VoIP)
    /// - Channel 1 (Right): Microphone (Local operator voice capture)
    /// Multi-device resilient: automatically hooks all active playback endpoints and the default microphone.
    /// </summary>
    [SupportedOSPlatform("windows")]
    public class WasapiDualMixer : IAudioCaptureProvider
    {
        private MMDeviceEnumerator? _deviceEnumerator;
        private AudioDeviceNotifier? _deviceNotifier;

        private readonly List<AudioCaptureStream> _loopbackStreams = new();
        private AudioCaptureStream? _micStream;
        private MixingSampleProvider? _loopbackMixer;
        private MixingSampleProvider? _micMixer;
        private DiscreteStereoSampleProvider? _discreteMixer;

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

                _loopbackMixer = new MixingSampleProvider(WaveFormat.CreateIeeeFloatWaveFormat(SampleRate, 1));
                _micMixer = new MixingSampleProvider(WaveFormat.CreateIeeeFloatWaveFormat(SampleRate, 1));
                _discreteMixer = new DiscreteStereoSampleProvider(_loopbackMixer, _micMixer);

                var renderDevices = new List<MMDevice>();
                MMDevice? defaultCapture = null;

                if (_deviceEnumerator != null)
                {
                    try
                    {
                        var devCol = _deviceEnumerator.EnumerateAudioEndPoints(DataFlow.Render, DeviceState.Active);
                        foreach (var d in devCol)
                        {
                            renderDevices.Add(d);
                        }
                    }
                    catch { }

                    if (renderDevices.Count == 0)
                    {
                        try
                        {
                            var defRender = _deviceEnumerator.GetDefaultAudioEndpoint(DataFlow.Render, Role.Multimedia);
                            if (defRender != null) renderDevices.Add(defRender);
                        }
                        catch { }

                        try
                        {
                            var defConsole = _deviceEnumerator.GetDefaultAudioEndpoint(DataFlow.Render, Role.Console);
                            if (defConsole != null && !renderDevices.Exists(d => d.ID == defConsole.ID))
                            {
                                renderDevices.Add(defConsole);
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

                // If no render devices at all, create one silence stream for Channel 0
                if (renderDevices.Count == 0)
                {
                    var fallbackStream = new AudioCaptureStream();
                    fallbackStream.Start(null, isLoopback: true);
                    _loopbackStreams.Add(fallbackStream);
                    if (fallbackStream.Buffer != null)
                    {
                        var sp = EnsureMonoTargetFormat(fallbackStream.Buffer);
                        _loopbackMixer.AddMixerInput(sp);
                    }
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
                                var sp = EnsureMonoTargetFormat(stream.Buffer);
                                _loopbackMixer.AddMixerInput(sp);
                                Logger.Info($"[AUDIO] Hooked WASAPI loopback on render device '{dev.FriendlyName}' (Discrete Ch 0: System).");
                            }
                        }
                        catch (Exception ex)
                        {
                            Logger.Warn($"[AUDIO] Could not hook loopback on '{dev.FriendlyName}': {ex.Message}");
                        }
                    }
                }

                // Hook microphone stream for Channel 1
                _micStream = new AudioCaptureStream();
                _micStream.Start(defaultCapture, isLoopback: false);
                if (_micStream.Buffer != null)
                {
                    var micSp = EnsureMonoTargetFormat(_micStream.Buffer);
                    _micMixer.AddMixerInput(micSp);
                    Logger.Info($"[AUDIO] Hooked WASAPI microphone capture on '{defaultCapture?.FriendlyName ?? "Default Capture"}' (Discrete Ch 1: Mic).");
                }

                StartRenderLoop();
                IsRunning = true;
            }
        }

        private ISampleProvider EnsureMonoTargetFormat(IWaveProvider waveProvider)
        {
            ISampleProvider sampleProvider = waveProvider.ToSampleProvider();

            if (sampleProvider.WaveFormat.Channels == 2)
            {
                sampleProvider = new StereoToMonoSampleProvider(sampleProvider)
                {
                    LeftVolume = 0.5f,
                    RightVolume = 0.5f
                };
            }
            else if (sampleProvider.WaveFormat.Channels > 2)
            {
                var multiplexer = new MultiplexingSampleProvider(new[] { sampleProvider }, 1);
                multiplexer.ConnectInputToOutput(0, 0);
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

                Logger.Info("[AUDIO] Discrete-Channel Audio Mixing Engine Pipeline started (Ch0=Loopback, Ch1=Mic, Anti-Starvation Active, High-Precision Pacing).");

                long startTicks = Stopwatch.GetTimestamp();
                long chunksSent = 0;
                double ticksPer20ms = (double)Stopwatch.Frequency * 0.020;

                while (!token.IsCancellationRequested)
                {
                    if (_discreteMixer != null)
                    {
                        int samplesRead = 0;
                        try
                        {
                            samplesRead = _discreteMixer.Read(sampleBuffer, 0, sampleBuffer.Length);
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

            Task.Run(async () =>
            {
                await Task.Delay(1000);
                if (_isDisposed) return;
                lock (_lockObj)
                {
                    StartCaptureStreams();
                }
            });
        }

        private void StopCaptureStreamsOnly()
        {
            _renderCts?.Cancel();
            _renderCts?.Dispose();
            _renderCts = null;

            foreach (var stream in _loopbackStreams)
            {
                try { stream.Dispose(); } catch { }
            }
            _loopbackStreams.Clear();

            _micStream?.Dispose();
            _micStream = null;
            _loopbackMixer = null;
            _micMixer = null;
            _discreteMixer = null;
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
