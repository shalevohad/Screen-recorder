using System;

namespace ITBRecorderAgent.Providers.Video.Keyboard
{
    public interface IKeystrokeOverlayProvider : IDisposable
    {
        void Initialize();
        void DrawKeystrokesToFrame(byte[] frameBuffer, int width, int height);
    }
}