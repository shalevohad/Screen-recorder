using System;
using System.Drawing;
using System.Runtime.InteropServices;
using System.Runtime.Versioning;
using System.Threading;
using ITBRecorderAgent.Providers.Video.Mouse.Common;

namespace ITBRecorderAgent.Providers.Video.Mouse.Windows
{
    [SupportedOSPlatform("windows")]
    public class WindowsMouseOverlay : IMouseOverlayProvider
    {
        #region Win32 API
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

        [StructLayout(LayoutKind.Sequential)]
        private struct BITMAP
        {
            public int bmType;
            public int bmWidth;
            public int bmHeight;
            public int bmWidthBytes;
            public ushort bmPlanes;
            public ushort bmBitsPixel;
            public IntPtr bmBits;
        }

        [StructLayout(LayoutKind.Sequential)]
        private struct MSLLHOOKSTRUCT
        {
            public POINT pt;
            public uint mouseData;
            public uint flags;
            public uint time;
            public IntPtr dwExtraInfo;
        }

        [StructLayout(LayoutKind.Sequential)]
        private struct MSG
        {
            public IntPtr hwnd;
            public uint message;
            public IntPtr wParam;
            public IntPtr lParam;
            public uint time;
            public POINT pt;
        }

        private const int CURSOR_SHOWING = 0x00000001;
        private const int DI_NORMAL = 0x0003;
        private const int WH_MOUSE_LL = 14;
        private const int WM_LBUTTONDOWN = 0x0201;
        private const int WM_RBUTTONDOWN = 0x0204;
        private const int WM_MOUSEWHEEL = 0x020A;

        private delegate IntPtr LowLevelMouseProc(int nCode, IntPtr wParam, IntPtr lParam);

        [DllImport("user32.dll", SetLastError = true)]
        private static extern IntPtr SetWindowsHookEx(int idHook, LowLevelMouseProc lpfn, IntPtr hMod, uint dwThreadId);

        [DllImport("user32.dll", SetLastError = true)]
        private static extern bool UnhookWindowsHookEx(IntPtr hhk);

        [DllImport("user32.dll")]
        private static extern IntPtr CallNextHookEx(IntPtr hhk, int nCode, IntPtr wParam, IntPtr lParam);

        [DllImport("user32.dll")]
        private static extern sbyte GetMessage(out MSG lpMsg, IntPtr hWnd, uint wMsgFilterMin, uint wMsgFilterMax);

        [DllImport("user32.dll")]
        private static extern bool TranslateMessage(ref MSG lpMsg);

        [DllImport("user32.dll")]
        private static extern IntPtr DispatchMessage(ref MSG lpMsg);

        [DllImport("user32.dll")]
        private static extern bool PostThreadMessage(uint idThread, uint msg, IntPtr wParam, IntPtr lParam);

        [DllImport("user32.dll")]
        private static extern bool GetCursorInfo(out CURSORINFO pci);

        [DllImport("user32.dll")]
        private static extern bool GetIconInfo(IntPtr hIcon, out ICONINFO piconinfo);

        [DllImport("user32.dll")]
        private static extern bool DrawIconEx(IntPtr hdc, int xLeft, int yTop, IntPtr hIcon, int cxWidth, int cyHeight, int istepIfAniCur, IntPtr hbrFlickerFreeDraw, int diFlags);

        [DllImport("gdi32.dll")]
        private static extern int GetObject(IntPtr hgdiobj, int cbBuffer, out BITMAP lpvObject);

        [DllImport("gdi32.dll")]
        private static extern int GetBitmapBits(IntPtr hbmp, int cbBuffer, byte[] lpvBits);

        [DllImport("gdi32.dll")]
        private static extern bool DeleteObject(IntPtr hObject);

        [DllImport("kernel32.dll")]
        private static extern uint GetCurrentThreadId();
        #endregion

        private LowLevelMouseProc? _hookProc;
        private IntPtr _hookId = IntPtr.Zero;
        private Thread? _hookThread;
        private uint _hookThreadId;
        private volatile bool _isInitialized;

        private Bitmap? _cursorBmp;
        // באפר 128x128 תומך בכל רזולוציות הסמנים ב-High DPI
        private static readonly int[] _cursorPixels = new int[128 * 128];

        public void Initialize()
        {
            if (_isInitialized) return;
            _isInitialized = true;

            _hookThread = new Thread(() =>
            {
                _hookThreadId = GetCurrentThreadId();
                _hookProc = HookCallback;
                _hookId = SetWindowsHookEx(WH_MOUSE_LL, _hookProc, IntPtr.Zero, 0);

                while (GetMessage(out MSG msg, IntPtr.Zero, 0, 0) > 0)
                {
                    TranslateMessage(ref msg);
                    DispatchMessage(ref msg);
                }

                if (_hookId != IntPtr.Zero)
                {
                    UnhookWindowsHookEx(_hookId);
                    _hookId = IntPtr.Zero;
                }
            })
            {
                IsBackground = true,
                Name = "ITB_WinMouseHook"
            };

            _hookThread.SetApartmentState(ApartmentState.STA);
            _hookThread.Start();
        }

        private IntPtr HookCallback(int nCode, IntPtr wParam, IntPtr lParam)
        {
            if (nCode >= 0)
            {
                int msg = wParam.ToInt32();
                if (msg == WM_LBUTTONDOWN || msg == WM_RBUTTONDOWN || msg == WM_MOUSEWHEEL)
                {
                    var hs = Marshal.PtrToStructure<MSLLHOOKSTRUCT>(lParam);
                    if (msg == WM_LBUTTONDOWN)
                    {
                        MouseVisualRasterizer.EnqueueEvent(hs.pt.x, hs.pt.y, MouseInteractionType.LeftClick);
                    }
                    else if (msg == WM_RBUTTONDOWN)
                    {
                        MouseVisualRasterizer.EnqueueEvent(hs.pt.x, hs.pt.y, MouseInteractionType.RightClick);
                    }
                    else if (msg == WM_MOUSEWHEEL)
                    {
                        short delta = (short)((hs.mouseData >> 16) & 0xFFFF);
                        if (delta > 0)
                            MouseVisualRasterizer.EnqueueEvent(hs.pt.x, hs.pt.y, MouseInteractionType.ScrollUp);
                        else if (delta < 0)
                            MouseVisualRasterizer.EnqueueEvent(hs.pt.x, hs.pt.y, MouseInteractionType.ScrollDown);
                    }
                }
            }
            return CallNextHookEx(_hookId, nCode, wParam, lParam);
        }

        public void DrawMouseToFrame(byte[] frameBuffer, int width, int height)
        {
            Initialize();

            // 1. רינדור טבעות הרחבה וחיצי גלגול
            MouseVisualRasterizer.RenderRingsAndScroll(frameBuffer, width, height);

            // 2. רינדור הסמן (כולל I-Beam וסמנים מונוכרומטיים באפס אובדן)
            bool isCursorBright = DrawSystemCursorWithPulse(frameBuffer, width, height);

            // 3. רינדור תגית L / R מותאמת
            MouseVisualRasterizer.RenderClickBadges(frameBuffer, width, height, isCursorBright);
        }

        private bool DrawSystemCursorWithPulse(byte[] frameBuffer, int width, int height)
        {
            var pci = new CURSORINFO { cbSize = Marshal.SizeOf(typeof(CURSORINFO)) };
            if (!GetCursorInfo(out pci) || pci.flags != CURSOR_SHOWING) return true;
            if (!GetIconInfo(pci.hCursor, out var iconInfo)) return true;

            bool isBright = true;

            try
            {
                int hotspotX = iconInfo.xHotspot;
                int hotspotY = iconInfo.yHotspot;
                int cursorW = 32;
                int cursorH = 32;

                Array.Clear(_cursorPixels, 0, _cursorPixels.Length);

                // --- טיפול קריטי 1: סמנים מונוכרומטיים (I-Beam, Crosshair, Sizing Arrows) ---
                if (iconInfo.hbmColor == IntPtr.Zero)
                {
                    GetObject(iconInfo.hbmMask, Marshal.SizeOf<BITMAP>(), out BITMAP bmMask);
                    cursorW = Math.Min(128, bmMask.bmWidth);
                    cursorH = Math.Min(128, bmMask.bmHeight / 2); // מחצית עליונה = AND, תחתונה = XOR
                    int stride = bmMask.bmWidthBytes;

                    byte[] maskBytes = new byte[bmMask.bmHeight * stride];
                    GetBitmapBits(iconInfo.hbmMask, maskBytes.Length, maskBytes);

                    for (int y = 0; y < cursorH; y++)
                    {
                        int andRow = y * stride;
                        int xorRow = (y + cursorH) * stride;

                        for (int x = 0; x < cursorW; x++)
                        {
                            int byteIdx = x / 8;
                            byte bit = (byte)(0x80 >> (x % 8));

                            bool andBit = (maskBytes[andRow + byteIdx] & bit) != 0;
                            bool xorBit = (maskBytes[xorRow + byteIdx] & bit) != 0;

                            int idx = y * 128 + x;

                            if (andBit && !xorBit)
                            {
                                _cursorPixels[idx] = 0; // שקוף
                            }
                            else if (!andBit && !xorBit)
                            {
                                _cursorPixels[idx] = unchecked((int)0xFF000000); // שחור אטום
                            }
                            else if (!andBit && xorBit)
                            {
                                _cursorPixels[idx] = unchecked((int)0xFFFFFFFF); // לבן אטום
                            }
                            else
                            {
                                // Inverting XOR Pixel (קו ה-I-Beam הקלאסי)
                                // מקודד ערך מיוחד 0xFE בערוץ האלפא עבור היפוך קונטרסט
                                _cursorPixels[idx] = unchecked((int)0xFEFFFFFF);
                            }
                        }
                    }
                }
                // --- טיפול 2: סמני צבע (32bpp Alpha או 24bpp צבע מלא) ---
                else
                {
                    cursorW = 64;
                    cursorH = 64;
                    _cursorBmp ??= new Bitmap(64, 64, System.Drawing.Imaging.PixelFormat.Format32bppPArgb);

                    using (var g = Graphics.FromImage(_cursorBmp))
                    {
                        g.Clear(Color.Transparent);
                        IntPtr hdc = g.GetHdc();
                        DrawIconEx(hdc, 0, 0, pci.hCursor, 0, 0, 0, IntPtr.Zero, DI_NORMAL);
                        g.ReleaseHdc(hdc);
                    }

                    var rect = new Rectangle(0, 0, 64, 64);
                    var bmpData = _cursorBmp.LockBits(rect, System.Drawing.Imaging.ImageLockMode.ReadOnly, System.Drawing.Imaging.PixelFormat.Format32bppPArgb);

                    int[] tempBits = new int[64 * 64];
                    Marshal.Copy(bmpData.Scan0, tempBits, 0, tempBits.Length);
                    _cursorBmp.UnlockBits(bmpData);

                    bool hasAlpha = false;
                    for (int i = 0; i < tempBits.Length; i++)
                    {
                        if (((tempBits[i] >> 24) & 0xFF) > 0)
                        {
                            hasAlpha = true;
                            break;
                        }
                    }

                    // העתקה לבאפר 128
                    for (int y = 0; y < 64; y++)
                    {
                        for (int x = 0; x < 64; x++)
                        {
                            int px = tempBits[y * 64 + x];
                            if (!hasAlpha && (px & 0x00FFFFFF) != 0)
                            {
                                px |= unchecked((int)0xFF000000); // תיקון Alpha לסמני 24bpp
                            }
                            _cursorPixels[y * 128 + x] = px;
                        }
                    }
                }

                // --- חישוב בהירות סמן (Luma) ---
                long totalLuma = 0;
                int nonTransparentCount = 0;

                for (int y = 0; y < cursorH; y++)
                {
                    for (int x = 0; x < cursorW; x++)
                    {
                        int p = _cursorPixels[y * 128 + x];
                        byte a = (byte)((p >> 24) & 0xFF);
                        if (a >= 250)
                        {
                            byte b = (byte)(p & 0xFF);
                            byte gCol = (byte)((p >> 8) & 0xFF);
                            byte r = (byte)((p >> 16) & 0xFF);
                            totalLuma += (long)(0.299 * r + 0.587 * gCol + 0.114 * b);
                            nonTransparentCount++;
                        }
                    }
                }

                if (nonTransparentCount > 0)
                {
                    isBright = (totalLuma / nonTransparentCount) > 120;
                }

                // --- ציור הסמן על הפריים כולל Pulse Scale ---
                float scale = MouseVisualRasterizer.IsClickActive() ? 1.35f : 1.0f;
                int drawW = (int)(cursorW * scale);
                int drawH = (int)(cursorH * scale);
                int startX = pci.ptScreenPos.x - (int)(hotspotX * scale);
                int startY = pci.ptScreenPos.y - (int)(hotspotY * scale);

                for (int dy = 0; dy < drawH; dy++)
                {
                    int targetY = startY + dy;
                    if (targetY < 0 || targetY >= height) continue;

                    int srcY = Math.Min(cursorH - 1, (int)(dy / scale));

                    for (int dx = 0; dx < drawW; dx++)
                    {
                        int targetX = startX + dx;
                        if (targetX < 0 || targetX >= width) continue;

                        int srcX = Math.Min(cursorW - 1, (int)(dx / scale));
                        int pixel = _cursorPixels[srcY * 128 + srcX];
                        byte alpha = (byte)((pixel >> 24) & 0xFF);
                        if (alpha == 0) continue;

                        int bufferIdx = (targetY * width + targetX) * 4;

                        // 💡 מנגנון ייעודי עבור סמן I-Beam: היפוך צבע עם אכיפת קונטרסט
                        if (alpha == 254)
                        {
                            byte origB = frameBuffer[bufferIdx];
                            byte origG = frameBuffer[bufferIdx + 1];
                            byte origR = frameBuffer[bufferIdx + 2];

                            int bgLuma = (int)(0.299 * origR + 0.587 * origG + 0.114 * origB);

                            // אם הרקע אפור בינוני (שבו היפוך מתמטי נבלע), כופים שחור או לבן מלא
                            if (Math.Abs(bgLuma - 128) < 35)
                            {
                                byte forced = bgLuma > 128 ? (byte)0 : (byte)255;
                                frameBuffer[bufferIdx] = forced;
                                frameBuffer[bufferIdx + 1] = forced;
                                frameBuffer[bufferIdx + 2] = forced;
                            }
                            else
                            {
                                frameBuffer[bufferIdx] = (byte)(255 - origB);
                                frameBuffer[bufferIdx + 1] = (byte)(255 - origG);
                                frameBuffer[bufferIdx + 2] = (byte)(255 - origR);
                            }
                            continue;
                        }

                        // ציור רגיל עם Alpha Blending
                        byte b = (byte)(pixel & 0xFF);
                        byte gCol = (byte)((pixel >> 8) & 0xFF);
                        byte r = (byte)((pixel >> 16) & 0xFF);

                        if (alpha == 255)
                        {
                            frameBuffer[bufferIdx] = b;
                            frameBuffer[bufferIdx + 1] = gCol;
                            frameBuffer[bufferIdx + 2] = r;
                        }
                        else
                        {
                            float a = alpha / 255.0f;
                            float invA = 1.0f - a;
                            frameBuffer[bufferIdx] = (byte)((b * a) + (frameBuffer[bufferIdx] * invA));
                            frameBuffer[bufferIdx + 1] = (byte)((gCol * a) + (frameBuffer[bufferIdx + 1] * invA));
                            frameBuffer[bufferIdx + 2] = (byte)((r * a) + (frameBuffer[bufferIdx + 2] * invA));
                        }
                    }
                }

                return isBright;
            }
            finally
            {
                if (iconInfo.hbmMask != IntPtr.Zero) DeleteObject(iconInfo.hbmMask);
                if (iconInfo.hbmColor != IntPtr.Zero) DeleteObject(iconInfo.hbmColor);
            }
        }

        public void Dispose()
        {
            if (_hookThreadId != 0)
            {
                PostThreadMessage(_hookThreadId, 0x0012 /* WM_QUIT */, IntPtr.Zero, IntPtr.Zero);
            }
            _cursorBmp?.Dispose();
            _cursorBmp = null;
        }
    }
}