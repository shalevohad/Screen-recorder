using System;

namespace ITBRecorderAgent.Providers.Video
{
    public static class ScreenCaptureFactory
    {
        public static IScreenCaptureProvider Create()
        {
            if (OperatingSystem.IsWindows())
            {
                return new DxgiScreenCapture();
            }

            if (OperatingSystem.IsLinux())
            {
                return new LinuxX11ScreenCapture();
            }

            throw new PlatformNotSupportedException("Unsupported Operating System for screen capture.");
        }
    }
}