using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Common;

namespace ITBRecorderAgent.Engine
{
    public class AudioPacer
    {
        private const int BytesPerSec = 48000 * 2 * 4; // 384,000 B/s (f32le, stereo, 48kHz)
        private readonly byte[] _silenceBuffer = new byte[19200]; // 50ms
        private long _totalAudioBytes = 0;
        private long _lastRealAudioTicks = 0;
        private long _sessionStartTicks = 0;
        private bool _firstAudioLogged = false;

        public void Start(long startTicks)
        {
            _sessionStartTicks = startTicks;
            _lastRealAudioTicks = startTicks;
            _firstAudioLogged = false;
            Interlocked.Exchange(ref _totalAudioBytes, 0);
            Logger.Info("[WORKER:AUDIO-PACER] Audio pacer clock initialized.");
        }

        public void RecordIncomingBytes(int byteCount)
        {
            if (!_firstAudioLogged)
            {
                _firstAudioLogged = true;
                Logger.Info($"[WORKER:AUDIO-PACER] First hardware audio packet received ({byteCount} bytes). Pipeline is actively receiving sound.");
            }

            Interlocked.Add(ref _totalAudioBytes, byteCount);
            Interlocked.Exchange(ref _lastRealAudioTicks, Stopwatch.GetTimestamp());
        }

        public bool IsAudioFlowing()
        {
            long lastTicks = Interlocked.Read(ref _lastRealAudioTicks);
            return lastTicks > 0 && Stopwatch.GetElapsedTime(lastTicks).TotalMilliseconds < 1500;
        }

        public Task RunPacerLoopAsync(FfmpegProcessManager ffmpeg, Action<long> onBytesPushed, Func<bool> isSessionActive, CancellationToken ct)
        {
            return Task.Run(() =>
            {
                Logger.Info("[WORKER:AUDIO-PACER] Audio watchdog/pacer loop started.");
                while (isSessionActive() && !ct.IsCancellationRequested)
                {
                    if (_sessionStartTicks > 0)
                    {
                        double elapsedSec = Stopwatch.GetElapsedTime(_sessionStartTicks).TotalSeconds;
                        long expectedBytes = (long)(elapsedSec * BytesPerSec);
                        expectedBytes -= (expectedBytes % 8);

                        long currentBytes = Interlocked.Read(ref _totalAudioBytes);
                        long gapMs = (long)Stopwatch.GetElapsedTime(Interlocked.Read(ref _lastRealAudioTicks)).TotalMilliseconds;

                        if (gapMs >= 150 && expectedBytes > currentBytes)
                        {
                            long missingBytes = expectedBytes - currentBytes;
                            int bytesToSend = (int)Math.Min(missingBytes, _silenceBuffer.Length);
                            bytesToSend -= (bytesToSend % 8);

                            if (bytesToSend > 0 && ffmpeg.IsRunning)
                            {
                                ffmpeg.WriteAudioData(_silenceBuffer, 0, bytesToSend);
                                Interlocked.Add(ref _totalAudioBytes, bytesToSend);
                                onBytesPushed(bytesToSend);

                                Logger.Warn($"[WORKER:AUDIO-PACER] Injected {bytesToSend} bytes of synthetic silence. WASAPI silent gap: {gapMs}ms, Net deficit: {missingBytes} bytes.");
                            }
                        }
                    }
                    Thread.Sleep(20);
                }
                Logger.Info("[WORKER:AUDIO-PACER] Audio watchdog/pacer loop stopped.");
            }, ct);
        }
    }
}