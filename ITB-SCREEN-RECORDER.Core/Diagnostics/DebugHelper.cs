using System;
using System.Runtime.InteropServices;
using Microsoft.Win32;

namespace ITB_SCREEN_RECORDER.Core.Diagnostics
{
    public static class DebugHelper
    {
        [DllImport("kernel32.dll")]
        private static extern IntPtr GetConsoleWindow();

        [DllImport("user32.dll")]
        private static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

        private const int SW_HIDE = 0;
        private const int SW_SHOW = 5;

        // קריאת דגלון ה-Debug מה-Registry
        public static bool IsDebugModeEnabled()
        {
            if (!OperatingSystem.IsWindows()) return false;

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

            return false;
        }

        // פונקציה להצגה/הסתרה של חלון ה-CMD
        public static void ApplyConsoleVisibility()
        {
            if (!OperatingSystem.IsWindows()) return;

            var handle = GetConsoleWindow();
            if (handle != IntPtr.Zero)
            {
                if (IsDebugModeEnabled())
                {
                    ShowWindow(handle, SW_SHOW);
                }
                else
                {
                    ShowWindow(handle, SW_HIDE);
                }
            }
        }
    }
}