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
        private readonly int[] _cursorPixels = new int[64 * 64];

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

            // 1. שכבת רקע: טבעות מתפשטות וחיצי גלגול
            MouseVisualRasterizer.RenderRingsAndScroll(frameBuffer, width, height);

            // 2. שכבת סמן: ציור סמן המערכת (כולל הגדלה בזמן קליק ודגימת בהירות)
            bool isCursorBright = DrawSystemCursorWithPulse(frameBuffer, width, height);

            // 3. שכבה עליונה: תגית L / R מותאמת לבהירות הסמן (לעולם אינה נבלעת)
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
                Marshal.Copy(bmpData.Scan0, _cursorPixels, 0, _cursorPixels.Length);
                _cursorBmp.UnlockBits(bmpData);

                // --- דגימת בהירות הסמן (Luminance Detection) ---
                long totalLuma = 0;
                int nonTransparentCount = 0;

                for (int i = 0; i < _cursorPixels.Length; i++)
                {
                    int p = _cursorPixels[i];
                    byte a = (byte)((p >> 24) & 0xFF);
                    if (a > 50)
                    {
                        byte b = (byte)(p & 0xFF);
                        byte gCol = (byte)((p >> 8) & 0xFF);
                        byte r = (byte)((p >> 16) & 0xFF);
                        totalLuma += (long)(0.299 * r + 0.587 * gCol + 0.114 * b);
                        nonTransparentCount++;
                    }
                }

                if (nonTransparentCount > 0)
                {
                    isBright = (totalLuma / nonTransparentCount) > 120;
                }

                // --- בדיקה האם יש קליק פעיל להפעלת הגדלת הסמן (1.35x Scale) ---
                float scale = MouseVisualRasterizer.IsClickActive() ? 1.35f : 1.0f;

                int cursorBaseX = pci.ptScreenPos.x;
                int cursorBaseY = pci.ptScreenPos.y;

                if (scale > 1.01f)
                {
                    // הגדלה סביב ה-Hotspot כך שהשפיץ נשאר מדויק
                    int drawW = (int)(64 * scale);
                    int drawH = (int)(64 * scale);
                    int startX = cursorBaseX - (int)(hotspotX * scale);
                    int startY = cursorBaseY - (int)(hotspotY * scale);

                    for (int y = 0; y < drawH; y++)
                    {
                        int targetY = startY + y;
                        if (targetY < 0 || targetY >= height) continue;

                        int srcY = Math.Min(63, (int)(y / scale));

                        for (int x = 0; x < drawW; x++)
                        {
                            int targetX = startX + x;
                            if (targetX < 0 || targetX >= width) continue;

                            int srcX = Math.Min(63, (int)(x / scale));
                            int pixel = _cursorPixels[srcY * 64 + srcX];
                            byte alpha = (byte)((pixel >> 24) & 0xFF);
                            if (alpha == 0) continue;

                            BlendPixel(frameBuffer, width, targetX, targetY, pixel, alpha);
                        }
                    }
                }
                else
                {
                    // העתקה ישירה 1:1 (בזמן ריחוף רגיל)
                    int startX = cursorBaseX - hotspotX;
                    int startY = cursorBaseY - hotspotY;

                    for (int y = 0; y < 64; y++)
                    {
                        int targetY = startY + y;
                        if (targetY < 0 || targetY >= height) continue;

                        for (int x = 0; x < 64; x++)
                        {
                            int targetX = startX + x;
                            if (targetX < 0 || targetX >= width) continue;

                            int pixel = _cursorPixels[y * 64 + x];
                            byte alpha = (byte)((pixel >> 24) & 0xFF);
                            if (alpha == 0) continue;

                            BlendPixel(frameBuffer, width, targetX, targetY, pixel, alpha);
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

        private static void BlendPixel(byte[] frameBuffer, int width, int targetX, int targetY, int pixel, byte alpha)
        {
            int bufferIdx = (targetY * width + targetX) * 4;
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