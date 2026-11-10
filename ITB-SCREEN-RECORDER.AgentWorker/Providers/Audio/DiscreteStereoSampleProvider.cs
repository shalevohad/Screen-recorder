// ==========================================
// File: ITB-SCREEN-RECORDER.AgentWorker/Providers/Audio/DiscreteStereoSampleProvider.cs
// ==========================================
#if WINDOWS
using System;
using NAudio.Wave;

namespace ITBRecorderAgent.Providers.Audio
{
    /// <summary>
    /// Multiplexes two distinct mono sample providers into a single interleaved 2-channel stereo stream:
    /// Channel 0 (Left): Loopback (System audio, incoming communications, VoIP)
    /// Channel 1 (Right): Microphone (Operator local voice capture)
    /// </summary>
    public class DiscreteStereoSampleProvider : ISampleProvider
    {
        private readonly ISampleProvider _loopbackSource;
        private readonly ISampleProvider _micSource;
        private readonly float[] _monoBufferLoopback;
        private readonly float[] _monoBufferMic;
        private readonly object _lock = new();

        public WaveFormat WaveFormat { get; }

        public DiscreteStereoSampleProvider(ISampleProvider loopbackSource, ISampleProvider micSource)
        {
            _loopbackSource = loopbackSource ?? throw new ArgumentNullException(nameof(loopbackSource));
            _micSource = micSource ?? throw new ArgumentNullException(nameof(micSource));

            int sampleRate = loopbackSource.WaveFormat.SampleRate;
            WaveFormat = WaveFormat.CreateIeeeFloatWaveFormat(sampleRate, 2);

            // Buffer sized for 1 second of mono audio at the given sample rate
            _monoBufferLoopback = new float[sampleRate];
            _monoBufferMic = new float[sampleRate];
        }

        public int Read(float[] buffer, int offset, int count)
        {
            int framesRequested = count / 2;
            if (framesRequested <= 0) return 0;

            lock (_lock)
            {
                float[] loopBuf = framesRequested <= _monoBufferLoopback.Length ? _monoBufferLoopback : new float[framesRequested];
                float[] micBuf = framesRequested <= _monoBufferMic.Length ? _monoBufferMic : new float[framesRequested];

                int loopRead = _loopbackSource.Read(loopBuf, 0, framesRequested);
                if (loopRead < framesRequested)
                {
                    Array.Clear(loopBuf, loopRead, framesRequested - loopRead);
                }

                int micRead = _micSource.Read(micBuf, 0, framesRequested);
                if (micRead < framesRequested)
                {
                    Array.Clear(micBuf, micRead, framesRequested - micRead);
                }

                int outIdx = offset;
                for (int i = 0; i < framesRequested; i++)
                {
                    buffer[outIdx++] = loopBuf[i];     // Channel 0 (Left): Loopback (System Audio)
                    buffer[outIdx++] = micBuf[i];      // Channel 1 (Right): Microphone (Local Voice)
                }

                return framesRequested * 2;
            }
        }
    }
}
#endif
