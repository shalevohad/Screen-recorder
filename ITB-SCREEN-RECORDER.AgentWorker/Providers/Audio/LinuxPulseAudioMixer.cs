using System;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Common;

namespace ITBRecorderAgent.Providers.Audio
{
    public class LinuxPulseAudioMixer : IAudioCaptureProvider
    {
        public event EventHandler<byte[]>? AudioDataAvailable;

        public bool HasActiveLoopback { get; private set; }
        public bool HasActiveMicrophone { get; private set; }
        public bool IsRunning { get; private set; }

        private CancellationTokenSource? _cts;
        private Task? _captureTask;

        private const string PulseLib = "libpulse-simple.so.0";

        [StructLayout(LayoutKind.Sequential)]
        private struct PaSampleSpec
        {
            public int Format;
            public uint Rate;
            public byte Channels;
        }

        [DllImport(PulseLib, SetLastError = true)]
        private static extern IntPtr pa_simple_new(
            string? server, string name, int dir, string? dev, string streamName,
            ref PaSampleSpec ss, IntPtr map, IntPtr attr, out int error);

        [DllImport(PulseLib)]
        private static extern int pa_simple_read(IntPtr s, byte[] data, UIntPtr bytes, out int error);

        [DllImport(PulseLib)]
        private static extern void pa_simple_free(IntPtr s);

        private IntPtr _paHandle = IntPtr.Zero;

        public void Initialize()
        {
            Logger.Info("[AUDIO] Initializing Linux PulseAudio capture provider...");
        }

        public void Start()
        {
            if (IsRunning) return;

            _cts = new CancellationTokenSource();
            IsRunning = true;
            _captureTask = Task.Run(() => CaptureLoop(_cts.Token));
            Logger.Info("[AUDIO] Linux PulseAudio capture started.");
        }

        private void CaptureLoop(CancellationToken token)
        {
            var spec = new PaSampleSpec
            {
                Format = 5, // PA_SAMPLE_FLOAT32LE
                Rate = 48000,
                Channels = 2
            };

            _paHandle = pa_simple_new(null, "ITBRecorderAgent", 2, null, "ScreenAudio", ref spec, IntPtr.Zero, IntPtr.Zero, out int err);

            if (_paHandle == IntPtr.Zero)
            {
                Logger.Warn($"[AUDIO] Failed to connect to PulseAudio (Code: {err}). Falling back to silence stream.");
                HasActiveLoopback = false;
                RunSilenceLoop(token);
                return;
            }

            HasActiveLoopback = true;
            HasActiveMicrophone = true;

            int bufferSize = 48000 * 2 * 4 / 50; // 20ms
            byte[] buffer = new byte[bufferSize];

            while (!token.IsCancellationRequested)
            {
                int readRes = pa_simple_read(_paHandle, buffer, (UIntPtr)bufferSize, out _);
                if (readRes >= 0)
                {
                    AudioDataAvailable?.Invoke(this, buffer);
                }
                else
                {
                    Thread.Sleep(20);
                }
            }

            if (_paHandle != IntPtr.Zero)
            {
                pa_simple_free(_paHandle);
                _paHandle = IntPtr.Zero;
            }
        }

        private void RunSilenceLoop(CancellationToken token)
        {
            int bufferSize = 48000 * 2 * 4 / 50;
            byte[] silenceBuffer = new byte[bufferSize];

            while (!token.IsCancellationRequested)
            {
                AudioDataAvailable?.Invoke(this, silenceBuffer);
                Thread.Sleep(20);
            }
        }

        public void Stop()
        {
            if (!IsRunning) return;

            _cts?.Cancel();
            _captureTask?.Wait(1000);
            IsRunning = false;
            Logger.Info("[AUDIO] Linux PulseAudio capture stopped.");
        }

        public void Dispose()
        {
            Stop();
            _cts?.Dispose();
        }
    }
}