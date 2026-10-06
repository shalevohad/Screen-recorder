using System;
using ITB_SCREEN_RECORDER.Core.Common;
using ITBRecorderAgent.Providers.Video.Mouse;
using ITBRecorderAgent.Providers.Video.Mouse.Linux;
using ITBRecorderAgent.Providers.Video.Mouse.Windows;

namespace ITBRecorderAgent.Providers.Video
{
    public static class MouseCursorOverlay
    {
        private static readonly IMouseOverlayProvider? _provider;
        private static bool _renderFailureLogged = false;

        static MouseCursorOverlay()
        {
            try
            {
                if (OperatingSystem.IsWindows())
                {
                    _provider = new WindowsMouseOverlay();
                }
                else if (OperatingSystem.IsLinux())
                {
                    _provider = new LinuxMouseOverlay();
                }
                else
                {
                    Logger.Warn("[OVERLAY:MOUSE] Operating system is not supported for mouse visual overlays. Recording continues without overlay.");
                    return;
                }

                _provider.Initialize();
            }
            catch (DllNotFoundException ex)
            {
                Logger.Warn($"[OVERLAY:MOUSE] Missing native OS dependency ({ex.Message}). Mouse overlay disabled. On Linux, ensure packages are installed: 'sudo apt install libx11-6 libxfixes3 libxtst6'. Screen recording continues normally.");
                _provider = null;
            }
            catch (Exception ex)
            {
                Logger.Warn($"[OVERLAY:MOUSE] Failed to initialize mouse overlay: {ex.Message}. Feature disabled. Recording continues normally.");
                _provider = null;
            }
        }

        public static void DrawMouseToFrame(byte[] frameBuffer, int width, int height)
        {
            if (_provider == null) return;

            try
            {
                _provider.DrawMouseToFrame(frameBuffer, width, height);
            }
            catch (DllNotFoundException ex)
            {
                if (!_renderFailureLogged)
                {
                    _renderFailureLogged = true;
                    Logger.Warn($"[OVERLAY:MOUSE] Dynamic library missing at runtime: {ex.Message}. Mouse overlay aborted.");
                }
            }
            catch (Exception ex)
            {
                if (!_renderFailureLogged)
                {
                    _renderFailureLogged = true;
                    Logger.Warn($"[OVERLAY:MOUSE] Render error: {ex.Message}. Mouse overlay aborted.");
                }
            }
        }
    }
}