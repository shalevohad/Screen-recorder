using System;
using ITBRecorderAgent.Providers.Video.Mouse;
using ITBRecorderAgent.Providers.Video.Mouse.Linux;
using ITBRecorderAgent.Providers.Video.Mouse.Windows;

namespace ITBRecorderAgent.Providers.Video
{
    public static class MouseCursorOverlay
    {
        private static readonly IMouseOverlayProvider _provider;

        static MouseCursorOverlay()
        {
            if (OperatingSystem.IsWindows())
            {
                _provider = new WindowsMouseOverlay();
            }
            else if (OperatingSystem.IsLinux())
            {
                _provider = new LinuxMouseOverlay();
            }
            else
            {
                throw new PlatformNotSupportedException("Unsupported Operating System for Mouse Visual Overlay.");
            }

            _provider.Initialize();
        }

        public static void DrawMouseToFrame(byte[] frameBuffer, int width, int height)
        {
            _provider.DrawMouseToFrame(frameBuffer, width, height);
        }
    }
}