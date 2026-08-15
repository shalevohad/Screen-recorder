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

        public static void DrawMouseToFrame(byte[] frameBuffer, int width, int height)
        {
            var pci = new CURSORINFO { cbSize = Marshal.SizeOf(typeof(CURSORINFO)) };
            if (!GetCursorInfo(out pci) || pci.flags != CURSOR_SHOWING)
                return;

            if (!GetIconInfo(pci.hCursor, out var iconInfo))
                return;

            try
            {
                int cursorX = pci.ptScreenPos.x - iconInfo.xHotspot;
                int cursorY = pci.ptScreenPos.y - iconInfo.yHotspot;

                if (cursorX < 0 || cursorY < 0 || cursorX >= width || cursorY >= height)
                    return;

                var handle = GCHandle.Alloc(frameBuffer, GCHandleType.Pinned);
                try
                {
                    using var bmp = new Bitmap(width, height, width * 4, System.Drawing.Imaging.PixelFormat.Format32bppPArgb, handle.AddrOfPinnedObject());
                    using var g = Graphics.FromImage(bmp);
                    IntPtr hdc = g.GetHdc();
                    try
                    {
                        DrawIconEx(hdc, cursorX, cursorY, pci.hCursor, 0, 0, 0, IntPtr.Zero, DI_NORMAL);
                    }
                    finally
                    {
                        g.ReleaseHdc(hdc);
                    }
                }
                finally
                {
                    handle.Free();
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