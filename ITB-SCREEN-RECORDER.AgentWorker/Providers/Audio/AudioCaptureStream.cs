#if WINDOWS

using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Configuration;
using NAudio.CoreAudioApi;
using NAudio.Wave;
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using System.Runtime.Versioning;

namespace ITBRecorderAgent.Providers.Audio
{
    [SupportedOSPlatform("windows")]
    public class AudioCaptureStream : IDisposable
    {
        private WasapiCapture? _capture;
        private CancellationTokenSource? _silenceCts;
        private bool _isSilenceMode;

        private const int SilenceSampleRate = 48000;
        private const int SilenceChannels = 2;

        public BufferedWaveProvider? Buffer { get; private set; }
        public bool IsRealDeviceActive { get; private set; }

        public WaveFormat? WaveFormat => _isSilenceMode
            ? WaveFormat.CreateIeeeFloatWaveFormat(SilenceSampleRate, SilenceChannels)
            : _capture?.WaveFormat;

        public bool Start(MMDevice? device, bool isLoopback)
        {
            if (device == null || device.State != DeviceState.Active)
            {
                IsRealDeviceActive = false;
                Logger.Warn($"Audio device not found or inactive. Falling back to Silence Mode (Loopback={isLoopback}).");
                return StartSilenceGenerator();
            }

            try
            {
                _capture = isLoopback ? new WasapiLoopbackCapture(device) : new WasapiCapture(device);

                Buffer = new BufferedWaveProvider(_capture.WaveFormat)
                {
                    DiscardOnBufferOverflow = true,
                    ReadFully = true
                };

                _capture.DataAvailable += (s, e) =>
                {
                    try
                    {
                        Buffer?.AddSamples(e.Buffer, 0, e.BytesRecorded);
                    }
                    catch (Exception) { }
                };

                _isSilenceMode = false;
                IsRealDeviceActive = true;
                _capture.StartRecording();

                Logger.Info($"Successfully hooked {(isLoopback ? "System Loopback" : "Microphone")} audio hardware channel.");
                return true;
            }
            catch (Exception ex)
            {
                Logger.Error($"Failed to initialize real audio endpoint ({ex.Message}). Bypassing to silence buffer injection.");
                return StartSilenceGenerator();
            }
        }

        private bool StartSilenceGenerator()
        {
            _isSilenceMode = true;
            IsRealDeviceActive = false;
            var format = WaveFormat.CreateIeeeFloatWaveFormat(SilenceSampleRate, SilenceChannels);

            Buffer = new BufferedWaveProvider(format)
            {
                DiscardOnBufferOverflow = true,
                ReadFully = true
            };

            _silenceCts = new CancellationTokenSource();
            var token = _silenceCts.Token;

            Task.Run(async () =>
            {
                int bytesPer20ms = (SilenceSampleRate * SilenceChannels * 4 * 20) / 1000;
                byte[] silenceChunk = new byte[bytesPer20ms];

                while (!token.IsCancellationRequested)
                {
                    try
                    {
                        Buffer?.AddSamples(silenceChunk, 0, bytesPer20ms);
                    }
                    catch { }
                    await Task.Delay(20, token).ConfigureAwait(false);
                }
            }, token);

            return true;
        }

        private void StopRealCapture()
        {
            try
            {
                _capture?.StopRecording();
                _capture?.Dispose();
                _capture = null;
            }
            catch { }
        }

        public void Stop()
        {
            _silenceCts?.Cancel();
            _silenceCts?.Dispose();
            _silenceCts = null;

            StopRealCapture();
            Buffer = null;
            IsRealDeviceActive = false;
        }

        public void Dispose()
        {
            Stop();
        }
    }
}

#endif