using System;

namespace ITBRecorderAgent.Providers.Audio
{
    public interface IAudioCaptureProvider : IDisposable
    {
        event EventHandler<byte[]>? AudioDataAvailable;

        bool HasActiveLoopback { get; }
        bool HasActiveMicrophone { get; }
        bool IsRunning { get; }

        void Initialize();
        void Start();
        void Stop();
    }
}