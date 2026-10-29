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
        private const uint WINSTA_ALL = 0x037F;

        [ThreadStatic]
        private static IntPtr t_activeDesktopHandle;

        private static bool _windowStationAttached = false;
        private static readonly object _winstaLock = new object();

        [DllImport("user32.dll", SetLastError = true)]
        private static extern IntPtr OpenWindowStation(string lpszWinSta, bool fInherit, uint dwDesiredAccess);

        [DllImport("user32.dll", SetLastError = true)]
        private static extern bool SetProcessWindowStation(IntPtr hWinSta);

        [DllImport("user32.dll", SetLastError = true)]
        private static extern IntPtr OpenInputDesktop(uint dwFlags, bool fInherit, uint dwDesiredAccess);

        [DllImport("user32.dll", SetLastError = true)]
        private static extern bool SetThreadDesktop(IntPtr hDesktop);

        [DllImport("user32.dll", SetLastError = true)]
        private static extern bool CloseDesktop(IntPtr hDesktop);

        [DllImport("user32.dll", SetLastError = true)]
        private static extern IntPtr OpenDesktop(string lpszDesktop, uint dwFlags, bool fInherit, uint dwDesiredAccess);

        public static void EnsureProcessWindowStation()
        {
            if (!OperatingSystem.IsWindows() || _windowStationAttached) return;

            lock (_winstaLock)
            {
                if (_windowStationAttached) return;

                try
                {
                    IntPtr hWinsta = OpenWindowStation("winsta0", false, GENERIC_ALL);
                    if (hWinsta == IntPtr.Zero)
                    {
                        hWinsta = OpenWindowStation("winsta0", false, WINSTA_ALL);
                    }

                    if (hWinsta != IntPtr.Zero)
                    {
                        bool ok = SetProcessWindowStation(hWinsta);
                        if (ok)
                        {
                            _windowStationAttached = true;
                            Logger.Info("[DESKTOP] Process successfully attached to interactive window station winsta0.");
                        }
                        else
                        {
                            Logger.Warn($"[DESKTOP] SetProcessWindowStation failed with Win32 error: {Marshal.GetLastWin32Error()}");
                        }
                    }
                    else
                    {
                        Logger.Warn($"[DESKTOP] OpenWindowStation(winsta0) failed with Win32 error: {Marshal.GetLastWin32Error()}");
                    }
                }
                catch (Exception ex)
                {
                    Logger.Warn($"[DESKTOP] Failed to set process window station: {ex.Message}");
                }
            }
        }

        /// <summary>
        /// Attempts to attach the calling thread to the currently active Windows input desktop,
        /// handling transitions between the default user desktop, lock screen, and UAC prompt.
        /// </summary>
        /// <returns>True if successfully attached to the active desktop; otherwise, false.</returns>
        public static bool TryAttachToInputDesktop()
        {
            if (!OperatingSystem.IsWindows()) return false;

            EnsureProcessWindowStation();

            try
            {
                // Attempt to open the active input desktop (supports lock screen / UAC prompts if permissions allow)
                IntPtr hDesk = OpenInputDesktop(0, false, DESKTOP_ALL);
                if (hDesk == IntPtr.Zero)
                {
                    hDesk = OpenInputDesktop(0, false, GENERIC_ALL);
                }

                if (hDesk == IntPtr.Zero)
                {
                    // Fallback to the standard user desktop ("Default")
                    hDesk = OpenDesktop("Default", 0, false, DESKTOP_ALL);
                }

                if (hDesk != IntPtr.Zero)
                {
                    bool setSuccess = SetThreadDesktop(hDesk);
                    if (setSuccess)
                    {
                        if (t_activeDesktopHandle != IntPtr.Zero && t_activeDesktopHandle != hDesk)
                        {
                            try { CloseDesktop(t_activeDesktopHandle); } catch { }
                        }
                        t_activeDesktopHandle = hDesk;
                        return true;
                    }
                    else
                    {
                        int err = Marshal.GetLastWin32Error();
                        CloseDesktop(hDesk);
                        Logger.Warn($"[DESKTOP] SetThreadDesktop failed with Win32 error: {err}");
                    }
                }
                else
                {
                    int err = Marshal.GetLastWin32Error();
                    Logger.Warn($"[DESKTOP] OpenInputDesktop and OpenDesktop failed with Win32 error: {err}");
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
