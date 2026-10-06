using System;
using ITBRecorderAgent.Providers.Video.Keyboard.Linux;
using ITBRecorderAgent.Providers.Video.Keyboard.Windows;

namespace ITBRecorderAgent.Providers.Video.Keyboard
{
    public static class KeystrokeOverlay
    {
        private static readonly IKeystrokeOverlayProvider _provider;

        static KeystrokeOverlay()
        {
            if (OperatingSystem.IsWindows())
            {
                _provider = new WindowsKeystrokeOverlay();
            }
            else if (OperatingSystem.IsLinux())
            {
                _provider = new LinuxKeystrokeOverlay();
            }
            else
            {
                throw new PlatformNotSupportedException("Unsupported Operating System for Keystroke Overlay.");
            }

            _provider.Initialize();
        }

        public static void DrawKeystrokesToFrame(byte[] frameBuffer, int width, int height)
        {
            _provider.DrawKeystrokesToFrame(frameBuffer, width, height);
        }
    }
}