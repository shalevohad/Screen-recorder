using System;
using ITB_SCREEN_RECORDER.Core.Common;
using ITBRecorderAgent.Providers.Video.Keyboard.Linux;
using ITBRecorderAgent.Providers.Video.Keyboard.Windows;

namespace ITBRecorderAgent.Providers.Video.Keyboard
{
    public static class KeystrokeOverlay
    {
        private static readonly IKeystrokeOverlayProvider? _provider;
        private static bool _renderFailureLogged = false;

        static KeystrokeOverlay()
        {
            try
            {
                if (OperatingSystem.IsWindows())
                {
                    _provider = new WindowsKeystrokeOverlay();
                }
                else if (OperatingSystem.IsLinux())
                {
                    _provider = new LinuxKeystrokeOverlay();
                }
                else
                {
                    Logger.Warn("[OVERLAY:KEYSTROKE] Operating system is not supported for keystroke overlay. Recording continues without overlay.");
                    return;
                }

                _provider.Initialize();
            }
            catch (DllNotFoundException ex)
            {
                Logger.Warn($"[OVERLAY:KEYSTROKE] Missing native OS dependency ({ex.Message}). Keystroke overlay disabled. On Linux, ensure packages are installed: 'sudo apt install libx11-6 libxtst6'. Screen recording continues normally.");
                _provider = null;
            }
            catch (Exception ex)
            {
                Logger.Warn($"[OVERLAY:KEYSTROKE] Failed to initialize keystroke overlay: {ex.Message}. Feature disabled. Recording continues normally.");
                _provider = null;
            }
        }

        public static void DrawKeystrokesToFrame(byte[] frameBuffer, int width, int height)
        {
            if (_provider == null) return;

            try
            {
                _provider.DrawKeystrokesToFrame(frameBuffer, width, height);
            }
            catch (DllNotFoundException ex)
            {
                if (!_renderFailureLogged)
                {
                    _renderFailureLogged = true;
                    Logger.Warn($"[OVERLAY:KEYSTROKE] Dynamic library missing at runtime: {ex.Message}. Keystroke overlay aborted.");
                }
            }
            catch (Exception ex)
            {
                if (!_renderFailureLogged)
                {
                    _renderFailureLogged = true;
                    Logger.Warn($"[OVERLAY:KEYSTROKE] Render error: {ex.Message}. Keystroke overlay aborted.");
                }
            }
        }
    }
}