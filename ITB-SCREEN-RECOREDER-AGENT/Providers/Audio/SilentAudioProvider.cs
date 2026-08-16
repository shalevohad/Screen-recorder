using System;
using System.Threading;
using System.Threading.Tasks;

namespace ITBRecorderAgent.Providers.Audio
{
    public class SilentAudioProvider : IAudioCaptureProvider
    {
        public event EventHandler<byte[]>? AudioDataAvailable;
        public bool HasActiveLoopback => false;
        public bool HasActiveMicrophone => false;
        public bool IsRunning { get; private set; }

        private CancellationTokenSource? _cts;
        private Task? _worker;

        public void Initialize() { }

        public void Start()
        {
            if (IsRunning) return;

            _cts = new CancellationTokenSource();
            IsRunning = true;
            _worker = Task.Run(() => GenerateSilence(_cts.Token));
            Logger.Info("[AUDIO] SilentAudioProvider running.");
        }

        private void GenerateSilence(CancellationToken token)
        {
            int bufferSize = 48000 * 2 * 4 / 50;
            byte[] silence = new byte[bufferSize];

            while (!token.IsCancellationRequested)
            {
                AudioDataAvailable?.Invoke(this, silence);
                Thread.Sleep(20);
            }
        }

        public void Stop()
        {
            _cts?.Cancel();
            IsRunning = false;
        }

        public void Dispose() => Stop();
    }
}