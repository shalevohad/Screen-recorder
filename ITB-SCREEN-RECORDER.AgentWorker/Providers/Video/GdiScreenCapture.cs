#if WINDOWS
using System;
using System.Runtime.InteropServices;
using System.Runtime.Versioning;
using ITB_SCREEN_RECORDER.Core.Common;

namespace ITBRecorderAgent.Providers.Video
{
    [SupportedOSPlatform("windows")]
    public class GdiScreenCapture : IScreenCaptureProvider
    {
        public int Width { get; private set; }
        public int Height { get; private set; }
        public bool IsInitialized { get; private set; }

        private const int SM_CXSCREEN = 0;
        private const int SM_CYSCREEN = 1;
        private const uint SRCCOPY = 0x00CC0020;
        private const uint CAPTUREBLT = 0x40000000;
        private const int DIB_RGB_COLORS = 0;

        [DllImport("user32.dll")]
        private static extern int GetSystemMetrics(int smIndex);

        [DllImport("user32.dll")]
        private static extern IntPtr GetDC(IntPtr hWnd);

        [DllImport("user32.dll")]
        private static extern int ReleaseDC(IntPtr hWnd, IntPtr hDC);

        [DllImport("gdi32.dll")]
        private static extern IntPtr CreateCompatibleDC(IntPtr hdc);

        [DllImport("gdi32.dll")]
        private static extern bool DeleteDC(IntPtr hdc);

        [DllImport("gdi32.dll")]
        private static extern IntPtr CreateDIBSection(IntPtr hdc, [In] ref BITMAPINFO pbmi, uint pila, out IntPtr ppvBits, IntPtr hSection, uint dwOffset);

        [DllImport("gdi32.dll")]
        private static extern IntPtr SelectObject(IntPtr hdc, IntPtr hgdiobj);

        [DllImport("gdi32.dll")]
        private static extern bool DeleteObject(IntPtr hObject);

        [DllImport("gdi32.dll")]
        private static extern bool BitBlt(IntPtr hdcDest, int nXDest, int nYDest, int nWidth, int nHeight, IntPtr hdcSrc, int nXSrc, int nYSrc, uint dwRop);

        [StructLayout(LayoutKind.Sequential)]
        private struct BITMAPINFOHEADER
        {
            public int biSize;
            public int biWidth;
            public int biHeight;
            public short biPlanes;
            public short biBitCount;
            public int biCompression;
            public int biSizeImage;
            public int biXPelsPerMeter;
            public int biYPelsPerMeter;
            public int biClrUsed;
            public int biClrImportant;
        }

        [StructLayout(LayoutKind.Sequential)]
        private struct BITMAPINFO
        {
            public BITMAPINFOHEADER bmiHeader;
            public int bmiColors;
        }

        private IntPtr _desktopDc = IntPtr.Zero;
        private IntPtr _memDc = IntPtr.Zero;
        private IntPtr _hBitmap = IntPtr.Zero;
        private IntPtr _oldBitmap = IntPtr.Zero;
        private IntPtr _ppvBits = IntPtr.Zero;
        private byte[]? _frameBuffer;

        public void Initialize()
        {
            try
            {
                DesktopSecurityManager.TryAttachToInputDesktop();

                Width = GetSystemMetrics(SM_CXSCREEN);
                Height = GetSystemMetrics(SM_CYSCREEN);

                if (Width <= 0 || Height <= 0)
                {
                    throw new InvalidOperationException($"Invalid display resolution reported by GDI: {Width}x{Height}");
                }

                _desktopDc = GetDC(IntPtr.Zero);
                if (_desktopDc == IntPtr.Zero)
                {
                    throw new InvalidOperationException("Failed to acquire desktop device context (GetDC).");
                }

                _memDc = CreateCompatibleDC(_desktopDc);
                if (_memDc == IntPtr.Zero)
                {
                    throw new InvalidOperationException("Failed to create memory device context (CreateCompatibleDC).");
                }

                var bmi = new BITMAPINFO();
                bmi.bmiHeader.biSize = Marshal.SizeOf<BITMAPINFOHEADER>();
                bmi.bmiHeader.biWidth = Width;
                bmi.bmiHeader.biHeight = -Height; // Top-down DIB: first pixel row is top of the screen
                bmi.bmiHeader.biPlanes = 1;
                bmi.bmiHeader.biBitCount = 32;     // BGRA32 matching DXGI format
                bmi.bmiHeader.biCompression = 0;   // BI_RGB

                _hBitmap = CreateDIBSection(_memDc, ref bmi, DIB_RGB_COLORS, out _ppvBits, IntPtr.Zero, 0);
                if (_hBitmap == IntPtr.Zero || _ppvBits == IntPtr.Zero)
                {
                    throw new InvalidOperationException("Failed to allocate DIB section for GDI capture.");
                }

                _oldBitmap = SelectObject(_memDc, _hBitmap);
                _frameBuffer = new byte[Width * Height * 4];

                IsInitialized = true;
                Logger.Info($"[VIDEO] Resilient GDI Screen Capture initialized successfully: {Width}x{Height}");
            }
            catch (Exception ex)
            {
                Logger.Error($"[VIDEO] GDI initialization failed: {ex.Message}");
                Dispose();
                throw;
            }
        }

        /// <summary>
        /// Captures the current desktop frame via Win32 BitBlt from the desktop device context into a DIB section.
        /// </summary>
        /// <param name="frameData">Outputs reference to the preallocated raw BGRA byte buffer, or null on failure.</param>
        /// <returns>True if the frame was captured successfully; otherwise, false.</returns>
        public bool TryCaptureFrame(out byte[]? frameData)
        {
            frameData = null;
            if (!IsInitialized || _memDc == IntPtr.Zero || _desktopDc == IntPtr.Zero || _ppvBits == IntPtr.Zero || _frameBuffer == null)
            {
                return false;
            }

            try
            {
                bool bltSuccess = BitBlt(_memDc, 0, 0, Width, Height, _desktopDc, 0, 0, SRCCOPY | CAPTUREBLT);
                if (!bltSuccess)
                {
                    // If desktop switched (e.g. UAC / Lock Screen) or error occurred, re-attach thread to input desktop and retry
                    DesktopSecurityManager.TryAttachToInputDesktop();
                    bltSuccess = BitBlt(_memDc, 0, 0, Width, Height, _desktopDc, 0, 0, SRCCOPY | CAPTUREBLT);
                    if (!bltSuccess) return false;
                }

                Marshal.Copy(_ppvBits, _frameBuffer, 0, _frameBuffer.Length);
                frameData = _frameBuffer;
                return true;
            }
            catch
            {
                return false;
            }
        }

        public void Dispose()
        {
            IsInitialized = false;

            if (_memDc != IntPtr.Zero && _oldBitmap != IntPtr.Zero)
            {
                SelectObject(_memDc, _oldBitmap);
                _oldBitmap = IntPtr.Zero;
            }

            if (_hBitmap != IntPtr.Zero)
            {
                DeleteObject(_hBitmap);
                _hBitmap = IntPtr.Zero;
            }

            if (_memDc != IntPtr.Zero)
            {
                DeleteDC(_memDc);
                _memDc = IntPtr.Zero;
            }

            if (_desktopDc != IntPtr.Zero)
            {
                ReleaseDC(IntPtr.Zero, _desktopDc);
                _desktopDc = IntPtr.Zero;
            }

            _ppvBits = IntPtr.Zero;
            _frameBuffer = null;
        }
    }
}
#endif
