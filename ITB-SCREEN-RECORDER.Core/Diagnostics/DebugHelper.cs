using System;
using System.Runtime.InteropServices;

#if WINDOWS
using Microsoft.Win32;
#endif

namespace ITB_SCREEN_RECORDER.Core.Diagnostics
{
    public static class DebugHelper
    {
        // קריאת דגלון ה-Debug מה-Registry ב-Windows או ממשתנה סביבה ב-Linux
        public static bool IsDebugModeEnabled()
        {
            if (OperatingSystem.IsLinux())
            {
                var envDebug = Environment.GetEnvironmentVariable("ITB_DEBUG_MODE");
                return envDebug == "1" || string.Equals(envDebug, "true", StringComparison.OrdinalIgnoreCase);
            }

            if (OperatingSystem.IsWindows())
            {
#if WINDOWS
#pragma warning disable CA1416
                try
                {
                    // חיפוש המפתח בנתיב המעודכן של ההתקנה
                    using var key = Registry.LocalMachine.OpenSubKey(@"SOFTWARE\ITB\ScreenRecorder");
                    if (key != null)
                    {
                        var val = key.GetValue("DebugMode");
                        if (val != null && int.TryParse(val.ToString(), out int debugVal))
                        {
                            return debugVal == 1; // 1 = Debug On, 0 = Debug Off
                        }
                    }
                }
                catch
                {
                    // התעלמות משגיאות הרשאה - ברירת המחדל תהיה מוסתר/שקט
                }
#pragma warning restore CA1416
#endif
            }

            return false;
        }

        // פונקציה להצגה/הסתרה של חלון ה-CMD (רלוונטי רק ל-Windows)
        public static void ApplyConsoleVisibility()
        {
            if (OperatingSystem.IsWindows())
            {
#if WINDOWS
                var handle = GetConsoleWindow();
                if (handle != IntPtr.Zero)
                {
                    if (IsDebugModeEnabled())
                    {
                        ShowWindow(handle, 5); // SW_SHOW
                    }
                    else
                    {
                        ShowWindow(handle, 0); // SW_HIDE
                    }
                }
#endif
            }
        }

#if WINDOWS
        [DllImport("kernel32.dll")]
        private static extern IntPtr GetConsoleWindow();

        [DllImport("user32.dll")]
        private static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
#endif
    }
}