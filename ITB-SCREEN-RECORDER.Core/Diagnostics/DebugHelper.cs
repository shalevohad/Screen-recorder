using System;
using System.Runtime.InteropServices;

#if WINDOWS
using Microsoft.Win32;
#endif

namespace ITB_SCREEN_RECORDER.Core.Diagnostics
{
    public static class DebugHelper
    {
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
                foreach (var view in new[] { RegistryView.Registry64, RegistryView.Registry32 })
                {
                    try
                    {
                        using var baseKey = RegistryKey.OpenBaseKey(RegistryHive.LocalMachine, view);
                        using var key = baseKey.OpenSubKey(@"SOFTWARE\ITB\ScreenRecorder");
                        if (key != null)
                        {
                            var val = key.GetValue("DebugMode");
                            if (val != null && int.TryParse(val.ToString(), out int debugVal))
                            {
                                return debugVal == 1;
                            }
                        }
                    }
                    catch
                    {
                        // התעלמות והמשך ניסיון בנתיב המקביל
                    }
                }
#pragma warning restore CA1416
#endif
            }

            return false;
        }

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