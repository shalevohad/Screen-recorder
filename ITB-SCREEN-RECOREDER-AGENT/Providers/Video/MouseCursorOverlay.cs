using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
using Vortice.DCommon;

namespace ITBRecorderAgent.Providers.Video
{
    public static class MouseCursorOverlay
    {
        [StructLayout(LayoutKind.Sequential)]
        private struct CURSORINFO
        {
            public int cbSize;
            public int flags;
            public IntPtr hCursor;
            public Point ptScreenPos;
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

        [DllImport("user32.dll")]
        private static extern bool GetCursorInfo(out CURSORINFO pci);

        [DllImport("user32.dll")]
        private static extern bool GetIconInfo(IntPtr hIcon, out ICONINFO piconinfo);

        [DllImport("user32.dll")]
        private static extern bool DrawIcon(IntPtr hDC, int x, int y, IntPtr hIcon);

        [DllImport("gdi32.dll")]
        private static extern bool DeleteObject(IntPtr hObject);

        private const int CURSOR_SHOWING = 0x00000001;

        /// <summary>
        /// שותל את סמן העכבר במדויק על גבי מערך הפיקסלים (BGRA) בצורה שלא מעמיסה על הזיכרון
        /// </summary>
        public static void DrawMouseToFrame(byte[] frameBuffer, int width, int height)
        {
            CURSORINFO pci = new CURSORINFO { cbSize = Marshal.SizeOf(typeof(CURSORINFO)) };

            if (GetCursorInfo(out pci) && pci.flags == CURSOR_SHOWING)
            {
                if (GetIconInfo(pci.hCursor, out ICONINFO iconInfo))
                {
                    // חישוב המיקום המדויק על המסך תוך קיזוז הנקודה החמה (Hotspot) של האייקון
                    int targetX = pci.ptScreenPos.X - iconInfo.xHotspot;
                    int targetY = pci.ptScreenPos.Y - iconInfo.yHotspot;

                    // נעילת מערך הבתים בזיכרון הבלתי-מנוהל (Unmanaged) כדי לצייר עליו ישירות ללא העתקות
                    GCHandle handle = GCHandle.Alloc(frameBuffer, GCHandleType.Pinned);
                    try
                    {
                        using (Bitmap bmp = new Bitmap(width, height, width * 4, System.Drawing.Imaging.PixelFormat.Format32bppArgb, handle.AddrOfPinnedObject()))
                        using (Graphics g = Graphics.FromImage(bmp))
                        {
                            IntPtr hdc = g.GetHdc();
                            DrawIcon(hdc, targetX, targetY, pci.hCursor);
                            g.ReleaseHdc(hdc);
                        }
                    }
                    finally
                    {
                        handle.Free(); // שחרור נעילה

                        // ניקוי משאבי GDI כדי למנוע דליפות זיכרון קריטיות (Memory Leaks)
                        if (iconInfo.hbmColor != IntPtr.Zero) DeleteObject(iconInfo.hbmColor);
                        if (iconInfo.hbmMask != IntPtr.Zero) DeleteObject(iconInfo.hbmMask);
                    }
                }
            }
        }
    }
}