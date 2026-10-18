#if WINDOWS
using System;
using System.Runtime.InteropServices;
using ITB_SCREEN_RECORDER.Core.Common;

namespace ITBRecorderAgent.Providers.Video
{
    public static class DesktopSecurityManager
    {
        private const uint DESKTOP_ALL = 0x01FF;
        private const uint GENERIC_ALL = 0x10000000;

        [DllImport("user32.dll", SetLastError = true)]
        private static extern IntPtr OpenInputDesktop(uint dwFlags, bool fInherit, uint dwDesiredAccess);

        [DllImport("user32.dll", SetLastError = true)]
        private static extern bool SetThreadDesktop(IntPtr hDesktop);

        [DllImport("user32.dll", SetLastError = true)]
        private static extern bool CloseDesktop(IntPtr hDesktop);

        [DllImport("user32.dll", SetLastError = true)]
        private static extern IntPtr OpenDesktop(string lpszDesktop, uint dwFlags, bool fInherit, uint dwDesiredAccess);

        public static bool TryAttachToInputDesktop()
        {
            if (!OperatingSystem.IsWindows()) return false;

            try
            {
                // נסיון פתיחת ה-Input Desktop הנוכחי (תומך גם ב-Lock Screen / UAC אם יש הרשאה מתאימה)
                IntPtr hDesk = OpenInputDesktop(0, false, DESKTOP_ALL);
                if (hDesk == IntPtr.Zero)
                {
                    hDesk = OpenInputDesktop(0, false, GENERIC_ALL);
                }

                if (hDesk == IntPtr.Zero)
                {
                    // Fallback לשולחן העבודה הראשי של המשתמש
                    hDesk = OpenDesktop("Default", 0, false, DESKTOP_ALL);
                }

                if (hDesk != IntPtr.Zero)
                {
                    bool setSuccess = SetThreadDesktop(hDesk);
                    CloseDesktop(hDesk);
                    return setSuccess;
                }
            }
            catch (Exception ex)
            {
                Logger.Warn($"[DESKTOP] Failed to attach to input desktop: {ex.Message}");
            }

            return false;
        }
    }
}
#endif
