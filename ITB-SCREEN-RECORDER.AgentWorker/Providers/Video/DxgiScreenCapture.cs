// 💡 השורה הזו בתחילת הקובץ אומרת ללינוקס: "תתעלם מכל מה שיש פה!"
#if WINDOWS
using System;
using System.Runtime.InteropServices;
using System.Runtime.Versioning;
using Vortice.Direct3D;
using Vortice.Direct3D11;
using Vortice.DXGI;
using ITBRecorderAgent;
using ITB_SCREEN_RECORDER.Core.Common;

namespace ITBRecorderAgent.Providers.Video
{
    [SupportedOSPlatform("windows")]
    public class DxgiScreenCapture : IScreenCaptureProvider
    {
        public int Width { get; private set; }
        public int Height { get; private set; }
        public bool IsInitialized { get; private set; }

        private ID3D11Device? _device;
        private ID3D11DeviceContext? _context;
        private IDXGIOutputDuplication? _deskDupl;
        private ID3D11Texture2D? _stagingTexture;

        // Throttles reinitialize attempts once IsInitialized has gone false (e.g. screen
        // lock/UAC secure desktop/RDP disconnect) so TryCaptureFrame keeps retrying instead
        // of giving up permanently after a single failed reinit attempt.
        private DateTime _lastReinitAttemptUtc = DateTime.MinValue;
        private static readonly TimeSpan ReinitRetryInterval = TimeSpan.FromSeconds(2);

        public void Initialize()
        {
            try
            {
                D3D11.D3D11CreateDevice(
                    null,
                    DriverType.Hardware,
                    DeviceCreationFlags.BgraSupport,
                    new[] { FeatureLevel.Level_11_1, FeatureLevel.Level_11_0 },
                    out _device,
                    out _context);

                using var dxgiDevice = _device!.QueryInterface<IDXGIDevice>();
                using var adapter = dxgiDevice.GetAdapter();

                // 💡 תיקון: ב-Vortice משתמשים ב-EnumOutputs במקום GetOutput
                adapter.EnumOutputs(0, out IDXGIOutput output);
                using var output1 = output.QueryInterface<IDXGIOutput1>();

                var desc = output.Description;
                Width = desc.DesktopCoordinates.Right - desc.DesktopCoordinates.Left;
                Height = desc.DesktopCoordinates.Bottom - desc.DesktopCoordinates.Top;

                _deskDupl = output1.DuplicateOutput(_device);

                var textureDesc = new Texture2DDescription
                {
                    Width = (uint)Width,     // 💡 תיקון המרה ל-uint
                    Height = (uint)Height,   // 💡 תיקון המרה ל-uint
                    MipLevels = 1,
                    ArraySize = 1,
                    Format = Vortice.DXGI.Format.B8G8R8A8_UNorm,
                    SampleDescription = new SampleDescription(1, 0),
                    Usage = ResourceUsage.Staging,
                    BindFlags = BindFlags.None,
                    CPUAccessFlags = CpuAccessFlags.Read, // 💡 שינוי ל-CPUAccessFlags
                    MiscFlags = ResourceOptionFlags.None  // 💡 שינוי ל-MiscFlags
                };

                _stagingTexture = _device.CreateTexture2D(textureDesc);
                IsInitialized = true;
                Logger.Info($"[VIDEO] DXGI Desktop Duplication initialized: {Width}x{Height}");
            }
            catch (Exception ex)
            {
                Logger.Error($"[VIDEO] DXGI initialization failed: {ex.Message}");
                Dispose();
                throw;
            }
        }

        public bool TryCaptureFrame(out byte[]? frameData)
        {
            frameData = null;

            if (!IsInitialized || _deskDupl == null || _stagingTexture == null || _context == null)
            {
                // Keep retrying periodically instead of staying permanently dead after one
                // failed reinit - the desktop becomes accessible again once the screen
                // unlocks, the UAC secure desktop closes, or the RDP session reconnects.
                if (DateTime.UtcNow - _lastReinitAttemptUtc >= ReinitRetryInterval)
                {
                    _lastReinitAttemptUtc = DateTime.UtcNow;
                    try
                    {
                        Initialize();
                    }
                    catch
                    {
                        // Still inaccessible; Initialize() already logged and disposed. Try again next interval.
                    }
                }

                if (!IsInitialized || _deskDupl == null || _stagingTexture == null || _context == null)
                    return false;
            }

            try
            {
                var result = _deskDupl.AcquireNextFrame(40, out _, out var desktopResource);

                if (result.Failure)
                {
                    // 💡 תיקון התנגשות ה-ResultCode
                    if (result.Code == Vortice.DXGI.ResultCode.AccessLost.Code)
                    {
                        Logger.Warn("[VIDEO] DXGI Access Lost. Reinitializing...");
                        Reinitialize();
                    }
                    return false;
                }

                using (desktopResource)
                using (var desktopTexture = desktopResource.QueryInterface<ID3D11Texture2D>())
                {
                    _context.CopyResource(_stagingTexture, desktopTexture);
                }

                _deskDupl.ReleaseFrame();

                var mapped = _context.Map(_stagingTexture, 0, MapMode.Read, Vortice.Direct3D11.MapFlags.None);
                try
                {
                    frameData = new byte[Width * Height * 4];
                    int rowPitch = Width * 4;

                    for (int y = 0; y < Height; y++)
                    {
                        // 💡 קיבוע המרה ל-int בשורת ה-IntPtr.Add למניעת שגיאת ה-long
                        IntPtr srcRow = IntPtr.Add(mapped.DataPointer, (int)(y * mapped.RowPitch));
                        Marshal.Copy(srcRow, frameData, y * rowPitch, rowPitch);
                    }

                    return true;
                }
                finally
                {
                    _context.Unmap(_stagingTexture, 0);
                }
            }
            catch
            {
                return false;
            }
        }

        private void Reinitialize()
        {
            _lastReinitAttemptUtc = DateTime.UtcNow;
            Dispose();
            Initialize();
        }

        public void Dispose()
        {
            IsInitialized = false;
            _stagingTexture?.Dispose();
            _stagingTexture = null;
            _deskDupl?.Dispose();
            _deskDupl = null;
            _context?.Dispose();
            _context = null;
            _device?.Dispose();
            _device = null;
        }
    }
}

#endif // סגירת הבלוק בסוף הקובץ