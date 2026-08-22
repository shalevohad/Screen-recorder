#if WINDOWS
using System;
using System.Drawing;
using System.Runtime.InteropServices;
using System.Runtime.Versioning;

namespace ITBRecorderAgent.Providers.Video
{
    [SupportedOSPlatform("windows")]
    public static class MouseCursorOverlay
    {
        [StructLayout(LayoutKind.Sequential)]
        private struct POINT { public int x; public int y; }

        [StructLayout(LayoutKind.Sequential)]
        private struct CURSORINFO
        {
            public int cbSize;
            public int flags;
            public IntPtr hCursor;
            public POINT ptScreenPos;
        }

        [StructLayout(LayoutKind.Sequential)]
        private struct ICONINFO
        {
            public bool fIcon;
            public int xHotspot;
            public int yHotspot;
            public IntPtr hbmMask;
            public IntPtr hbmColor;
        }

        private const int CURSOR_SHOWING = 0x00000001;
        private const int DI_NORMAL = 0x0003;

        [DllImport("user32.dll")]
        private static extern bool GetCursorInfo(out CURSORINFO pci);

        [DllImport("user32.dll")]
        private static extern bool GetIconInfo(IntPtr hIcon, out ICONINFO piconinfo);

        [DllImport("user32.dll")]
        private static extern bool DrawIconEx(IntPtr hdc, int xLeft, int yTop, IntPtr hIcon, int cxWidth, int cyHeight, int istepIfAniCur, IntPtr hbrFlickerFreeDraw, int diFlags);

        [DllImport("gdi32.dll")]
        private static extern bool DeleteObject(IntPtr hObject);

        private static Bitmap? _cursorBmp;
        private static readonly int[] _cursorPixels = new int[64 * 64];

        public static void DrawMouseToFrame(byte[] frameBuffer, int width, int height)
        {
            var pci = new CURSORINFO { cbSize = Marshal.SizeOf(typeof(CURSORINFO)) };
            if (!GetCursorInfo(out pci) || pci.flags != CURSOR_SHOWING) return;
            if (!GetIconInfo(pci.hCursor, out var iconInfo)) return;

            try
            {
                int cursorX = pci.ptScreenPos.x - iconInfo.xHotspot;
                int cursorY = pci.ptScreenPos.y - iconInfo.yHotspot;

                if (cursorX < -64 || cursorY < -64 || cursorX >= width || cursorY >= height) return;

                // אובייקטי GDI נשמרים פעם אחת בלבד בזיכרון, ללא הקצאות חדשות!
                if (_cursorBmp == null)
                {
                    _cursorBmp = new Bitmap(64, 64, System.Drawing.Imaging.PixelFormat.Format32bppPArgb);
                }

                using (var g = Graphics.FromImage(_cursorBmp))
                {
                    g.Clear(Color.Transparent);
                    IntPtr hdc = g.GetHdc();
                    DrawIconEx(hdc, 0, 0, pci.hCursor, 0, 0, 0, IntPtr.Zero, DI_NORMAL);
                    g.ReleaseHdc(hdc);
                }

                var rect = new Rectangle(0, 0, 64, 64);
                var bmpData = _cursorBmp.LockBits(rect, System.Drawing.Imaging.ImageLockMode.ReadOnly, System.Drawing.Imaging.PixelFormat.Format32bppPArgb);
                Marshal.Copy(bmpData.Scan0, _cursorPixels, 0, _cursorPixels.Length);
                _cursorBmp.UnlockBits(bmpData);

                // Alpha Blending ידני סופר-מהיר היישר לתוך מערך הווידאו
                int targetX, targetY, bufferIdx, pixelIdx, pixel;
                byte alpha;

                for (int y = 0; y < 64; y++)
                {
                    targetY = cursorY + y;
                    if (targetY < 0 || targetY >= height) continue;

                    for (int x = 0; x < 64; x++)
                    {
                        targetX = cursorX + x;
                        if (targetX < 0 || targetX >= width) continue;

                        pixelIdx = y * 64 + x;
                        pixel = _cursorPixels[pixelIdx];
                        alpha = (byte)((pixel >> 24) & 0xFF);

                        if (alpha == 0) continue;

                        bufferIdx = (targetY * width + targetX) * 4;

                        if (alpha == 255)
                        {
                            frameBuffer[bufferIdx] = (byte)(pixel & 0xFF);
                            frameBuffer[bufferIdx + 1] = (byte)((pixel >> 8) & 0xFF);
                            frameBuffer[bufferIdx + 2] = (byte)((pixel >> 16) & 0xFF);
                        }
                        else
                        {
                            float a = alpha / 255.0f;
                            float invA = 1.0f - a;
                            frameBuffer[bufferIdx] = (byte)(((pixel & 0xFF) * a) + (frameBuffer[bufferIdx] * invA));
                            frameBuffer[bufferIdx + 1] = (byte)((((pixel >> 8) & 0xFF) * a) + (frameBuffer[bufferIdx + 1] * invA));
                            frameBuffer[bufferIdx + 2] = (byte)((((pixel >> 16) & 0xFF) * a) + (frameBuffer[bufferIdx + 2] * invA));
                        }
                    }
                }
            }
            finally
            {
                if (iconInfo.hbmMask != IntPtr.Zero) DeleteObject(iconInfo.hbmMask);
                if (iconInfo.hbmColor != IntPtr.Zero) DeleteObject(iconInfo.hbmColor);
            }
        }
    }
}
#endif