using System;

namespace ITBRecorderAgent.Providers.Video
{
    public static class ScreenCaptureFactory
    {
        public static IScreenCaptureProvider Create()
        {
            #if WINDOWS
            if (OperatingSystem.IsWindows())
            {
                return new ResilientScreenCapture();
            }
            #endif

            if (OperatingSystem.IsLinux())
            {
                return new LinuxX11ScreenCapture();
            }

            throw new PlatformNotSupportedException("Unsupported Operating System for screen capture.");
        }

        public static IScreenCaptureProvider CreateForDisplay(int x, int y, int width, int height, string displayId)
        {
            #if WINDOWS
            if (OperatingSystem.IsWindows())
            {
                return new ResilientScreenCapture();
            }
            #endif

            if (OperatingSystem.IsLinux())
            {
                return new LinuxX11ScreenCapture(x, y, width, height, displayId);
            }

            throw new PlatformNotSupportedException("Unsupported Operating System for screen capture.");
        }
    }
}