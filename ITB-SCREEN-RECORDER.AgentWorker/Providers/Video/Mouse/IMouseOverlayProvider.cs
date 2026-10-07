using System;

namespace ITBRecorderAgent.Providers.Video.Mouse
{
    public interface IMouseOverlayProvider : IDisposable
    {
        void Initialize();
        void DrawMouseToFrame(byte[] frameBuffer, int width, int height);
    }
}