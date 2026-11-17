using System;

namespace ITBRecorderAgent.Providers.Video
{
    public interface IScreenCaptureProvider : IDisposable
    {
        int Width { get; }
        int Height { get; }
        bool IsInitialized { get; }

        void Initialize();
        bool TryCaptureFrame(out byte[]? frameData);
    }
}