#if WINDOWS
using System;
using System.Runtime.InteropServices;
using ITB_SCREEN_RECORDER.Core.Common;

namespace ITBRecorderAgent.Providers.Video
{
    public static class WindowsDpiHelper
    {
        private const int DPI_AWARENESS_CONTEXT_PER_MONITOR_AWARE_V2 = -4;

        [DllImport("user32.dll", SetLastError = true)]
        private static extern bool SetProcessDpiAwarenessContext(IntPtr dpiContext);

        [DllImport("shcore.dll")]
        private static extern int SetProcessDpiAwareness(int awareness);

        [DllImport("user32.dll")]
        private static extern bool SetProcessDPIAware();

        public static void EnablePerMonitorDpiAwareness()
        {
            if (!OperatingSystem.IsWindows()) return;

            try
            {
                if (SetProcessDpiAwarenessContext((IntPtr)DPI_AWARENESS_CONTEXT_PER_MONITOR_AWARE_V2))
                {
                    Logger.Info("[DPI] PerMonitorV2 DPI awareness successfully applied.");
                    return;
                }
            }
            catch { }

            try
            {
                if (SetProcessDpiAwareness(2) == 0) // PROCESS_PER_MONITOR_DPI_AWARE
                {
                    Logger.Info("[DPI] PerMonitor DPI awareness successfully applied via shcore.");
                    return;
                }
            }
            catch { }

            try
            {
                SetProcessDPIAware();
                Logger.Info("[DPI] System DPI awareness applied as fallback.");
            }
            catch { }
        }
    }
}
#endif
