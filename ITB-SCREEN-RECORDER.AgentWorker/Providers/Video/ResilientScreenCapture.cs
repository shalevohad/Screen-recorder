#if WINDOWS
using System;
using System.Runtime.Versioning;
using ITB_SCREEN_RECORDER.Core.Common;

namespace ITBRecorderAgent.Providers.Video
{
    [SupportedOSPlatform("windows")]
    public class ResilientScreenCapture : IScreenCaptureProvider
    {
        private readonly DxgiScreenCapture _dxgi;
        private readonly GdiScreenCapture _gdi;
        private IScreenCaptureProvider? _activeProvider;
        private int _consecutiveDxgiErrors = 0;
        private const int MaxDxgiConsecutiveErrors = 60; // Approximately 2 seconds of consecutive lost frames at 30fps

        public ResilientScreenCapture(
            uint adapterIndex = 0,
            uint outputIndex = 0,
            string displayId = "mon-0",
            int x = 0,
            int y = 0,
            int width = 0,
            int height = 0)
        {
            _dxgi = new DxgiScreenCapture(adapterIndex, outputIndex, displayId);
            _gdi = new GdiScreenCapture(x, y, width, height);
        }

        public int Width => _activeProvider?.Width ?? 0;
        public int Height => _activeProvider?.Height ?? 0;
        public bool IsInitialized => _activeProvider?.IsInitialized ?? false;

        /// <summary>
        /// Initializes screen capture by attempting hardware-accelerated DXGI Desktop Duplication first,
        /// falling back to resilient GDI capture if DXGI initialization fails.
        /// </summary>
        public void Initialize()
        {
            try
            {
                Logger.Info("[VIDEO] Attempting hardware-accelerated DXGI Desktop Duplication initialization...");
                _dxgi.Initialize();
                _activeProvider = _dxgi;
                _consecutiveDxgiErrors = 0;
                Logger.Info($"[VIDEO] DXGI Desktop Duplication active ({_dxgi.Width}x{_dxgi.Height}).");
                return;
            }
            catch (Exception ex)
            {
                Logger.Warn($"[VIDEO] DXGI Desktop Duplication failed ({ex.Message}). Falling back to resilient GDI capture pipeline.");
            }

            // Fallback to GDI capture pipeline
            try
            {
                _gdi.Initialize();
                _activeProvider = _gdi;
                Logger.Info($"[VIDEO] Resilient GDI capture pipeline active ({_gdi.Width}x{_gdi.Height}).");
            }
            catch (Exception ex)
            {
                Logger.Error($"[VIDEO] Both DXGI and GDI capture pipelines failed: {ex.Message}");
                throw;
            }
        }

        public bool TryCaptureFrame(out byte[]? frameData)
        {
            frameData = null;

            if (_activeProvider == null || !_activeProvider.IsInitialized)
            {
                return false;
            }

            if (ReferenceEquals(_activeProvider, _dxgi))
            {
                bool success = _dxgi.TryCaptureFrame(out frameData);
                if (success && frameData != null)
                {
                    _consecutiveDxgiErrors = 0;
                    return true;
                }

                _consecutiveDxgiErrors++;
                if (_consecutiveDxgiErrors >= MaxDxgiConsecutiveErrors)
                {
                    Logger.Warn("[VIDEO] DXGI capture failed consecutively. Seamlessly failing over to GDI capture pipeline...");
                    try
                    {
                        _gdi.Initialize();
                        _activeProvider = _gdi;
                        return _gdi.TryCaptureFrame(out frameData);
                    }
                    catch (Exception ex)
                    {
                        Logger.Error($"[VIDEO] Failed to switch to GDI fallback: {ex.Message}");
                    }
                }

                return false;
            }

            // GDI Active
            return _gdi.TryCaptureFrame(out frameData);
        }

        public void Dispose()
        {
            _activeProvider = null;
            _dxgi.Dispose();
            _gdi.Dispose();
        }
    }
}
#endif
