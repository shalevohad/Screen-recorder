using System;
using System.Runtime.InteropServices;

#if WINDOWS
using Microsoft.Win32;
#endif

namespace ITB_SCREEN_RECORDER.Core.Diagnostics
{
    public static class DebugHelper
    {
        private static bool? _manualDebugOverride;

        /// <summary>
        /// Explicitly overrides the debug mode state in-memory.
        /// </summary>
        /// <param name="enabled">True to enable verbose debug mode; false to disable.</param>
        public static void SetDebugMode(bool enabled)
        {
            _manualDebugOverride = enabled;
        }

        /// <summary>
        /// Determines whether debug mode is active by checking manual override, environment variables,
        /// command-line arguments, and Windows Registry keys.
        /// </summary>
        /// <returns>True if debug mode is active; false otherwise.</returns>
        public static bool IsDebugModeEnabled()
        {
            if (_manualDebugOverride.HasValue) return _manualDebugOverride.Value;

            // 1. Environment variable probe (cross-platform Windows & Linux)
            var envDebug = Environment.GetEnvironmentVariable("ITB_DEBUG_MODE");
            if (envDebug == "1" || string.Equals(envDebug, "true", StringComparison.OrdinalIgnoreCase))
            {
                return true;
            }

            // 2. Command-line flags probe (--debug or -d)
            try
            {
                var args = Environment.GetCommandLineArgs();
                for (int i = 0; i < args.Length; i++)
                {
                    if (string.Equals(args[i], "--debug", StringComparison.OrdinalIgnoreCase) ||
                        string.Equals(args[i], "-d", StringComparison.OrdinalIgnoreCase))
                    {
                        return true;
                    }
                }
            }
            catch { }

            // 3. Windows Registry probe (HKLM followed by HKCU across 64-bit and 32-bit views)
            if (OperatingSystem.IsWindows())
            {
#if WINDOWS
#pragma warning disable CA1416
                foreach (var hive in new[] { RegistryHive.LocalMachine, RegistryHive.CurrentUser })
                {
                    foreach (var view in new[] { RegistryView.Registry64, RegistryView.Registry32 })
                    {
                        try
                        {
                            using var baseKey = RegistryKey.OpenBaseKey(hive, view);
                            using var key = baseKey.OpenSubKey(@"SOFTWARE\ITB\ScreenRecorder");
                            if (key != null)
                            {
                                var val = key.GetValue("DebugMode");
                                if (val != null && int.TryParse(val.ToString(), out int debugVal))
                                {
                                    if (debugVal == 1) return true;
                                }
                            }
                        }
                        catch
                        {
                            // Ignore access exceptions and proceed to alternate hive/view
                        }
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