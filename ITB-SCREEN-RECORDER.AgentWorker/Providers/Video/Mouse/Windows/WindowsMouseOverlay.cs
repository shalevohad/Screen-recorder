using System;
using System.Diagnostics;
using System.Drawing;
using System.Runtime.InteropServices;
using System.Runtime.Versioning;
using System.Threading;
using ITB_SCREEN_RECORDER.Core.Common;
using ITBRecorderAgent.Providers.Video;
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
        private const int WM_MBUTTONDOWN = 0x0207;
        private const int WM_MOUSEWHEEL = 0x020A;
        private static readonly IntPtr IDC_ARROW = new IntPtr(32512);

        private delegate IntPtr LowLevelMouseProc(int nCode, IntPtr wParam, IntPtr lParam);

        [DllImport("kernel32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        private static extern IntPtr GetModuleHandle(string? lpModuleName);

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

        [DllImport("user32.dll", SetLastError = true)]
        private static extern bool GetCursorInfo(out CURSORINFO pci);

        [DllImport("user32.dll")]
        private static extern bool GetCursorPos(out POINT lpPoint);

        [DllImport("user32.dll", SetLastError = true)]
        private static extern IntPtr LoadCursor(IntPtr hInstance, IntPtr lpCursorName);

        [DllImport("user32.dll", SetLastError = true)]
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
        // 128x128 buffer supporting all High-DPI cursor resolutions
        private static readonly int[] _cursorPixels = new int[128 * 128];
        private readonly object _renderLock = new();

        public void Initialize()
        {
            if (_isInitialized) return;
            _isInitialized = true;

            _hookThread = new Thread(() =>
            {
                DesktopSecurityManager.TryAttachToInputDesktop();
                _hookThreadId = GetCurrentThreadId();
                _hookProc = HookCallback;

                IntPtr hMod = IntPtr.Zero;
                try
                {
                    using var curProcess = Process.GetCurrentProcess();
                    using var curModule = curProcess.MainModule;
                    hMod = GetModuleHandle(curModule?.ModuleName);
                }
                catch { }

                _hookId = SetWindowsHookEx(WH_MOUSE_LL, _hookProc, hMod, 0);
                if (_hookId == IntPtr.Zero)
                {
                    int err = Marshal.GetLastWin32Error();
                    Logger.Warn($"[MOUSE] SetWindowsHookEx with module handle failed ({err}). Retrying with IntPtr.Zero...");
                    _hookId = SetWindowsHookEx(WH_MOUSE_LL, _hookProc, IntPtr.Zero, 0);
                    if (_hookId == IntPtr.Zero)
                    {
                        Logger.Error($"[MOUSE] SetWindowsHookEx fallback also failed: {Marshal.GetLastWin32Error()}");
                    }
                    else
                    {
                        Logger.Info("[MOUSE] Low-level mouse hook successfully registered with IntPtr.Zero fallback.");
                    }
                }
                else
                {
                    Logger.Info("[MOUSE] Low-level mouse hook successfully registered.");
                }

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
                if (msg == WM_LBUTTONDOWN || msg == WM_RBUTTONDOWN || msg == WM_MBUTTONDOWN || msg == WM_MOUSEWHEEL)
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
                    else if (msg == WM_MBUTTONDOWN)
                    {
                        MouseVisualRasterizer.EnqueueEvent(hs.pt.x, hs.pt.y, MouseInteractionType.MiddleClick);
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

        /// <summary>
        /// Renders mouse overlay visuals onto the captured video frame buffer.
        /// Executes ripple rings, scroll arrows, pulsing system cursor, and action badges.
        /// </summary>
        /// <param name="frameBuffer">Raw BGRA frame buffer to draw onto.</param>
        /// <param name="width">Width of the video frame in pixels.</param>
        /// <param name="height">Height of the video frame in pixels.</param>
        /// <param name="screenOffsetX">Horizontal pixel offset of the captured monitor in virtual desktop space.</param>
        /// <param name="screenOffsetY">Vertical pixel offset of the captured monitor in virtual desktop space.</param>
        public void DrawMouseToFrame(byte[] frameBuffer, int width, int height, int screenOffsetX = 0, int screenOffsetY = 0)
        {
            Initialize();

            lock (_renderLock)
            {
                // 1. Render expanding ripple rings and scroll arrows (isolated to this monitor)
                MouseVisualRasterizer.RenderRingsAndScroll(frameBuffer, width, height, screenOffsetX, screenOffsetY);

                // 2. Render cursor graphic (including I-Beam and monochrome cursors with zero loss)
                bool isCursorBright = DrawSystemCursorWithPulse(frameBuffer, width, height, screenOffsetX, screenOffsetY);

                // 3. Render adaptive L / R / M click badges (isolated to this monitor)
                MouseVisualRasterizer.RenderClickBadges(frameBuffer, width, height, screenOffsetX, screenOffsetY, isCursorBright);
            }
        }

        private static int _debugLogCounter = 0;

        /// <summary>
        /// Extracts and draws the active Windows system cursor at its current screen position onto the frame buffer,
        /// applying click-pulse scaling, brightness analysis, and contrast-preserving inversion.
        /// </summary>
        /// <param name="frameBuffer">Raw BGRA frame buffer to draw onto.</param>
        /// <param name="width">Width of the frame.</param>
        /// <param name="height">Height of the frame.</param>
        /// <param name="screenOffsetX">Horizontal pixel offset of the captured monitor.</param>
        /// <param name="screenOffsetY">Vertical pixel offset of the captured monitor.</param>
        /// <returns>True if the cursor body is predominantly bright (used for badge contrast); otherwise, false.</returns>
        private bool DrawSystemCursorWithPulse(byte[] frameBuffer, int width, int height, int screenOffsetX, int screenOffsetY)
        {
            var pci = new CURSORINFO { cbSize = Marshal.SizeOf(typeof(CURSORINFO)) };
            bool gotCursor = GetCursorInfo(out pci);

            if (!gotCursor)
            {
                DesktopSecurityManager.TryAttachToInputDesktop();
                gotCursor = GetCursorInfo(out pci);
            }

            int cursorPosX = pci.ptScreenPos.x;
            int cursorPosY = pci.ptScreenPos.y;
            IntPtr hCursor = pci.hCursor;

            // If CURSORINFO failed or returned (0,0), extract position accurately using GetCursorPos
            if (!gotCursor || (cursorPosX == 0 && cursorPosY == 0))
            {
                if (GetCursorPos(out var pt))
                {
                    cursorPosX = pt.x;
                    cursorPosY = pt.y;
                }
            }

            // Convert global virtual desktop coordinates to monitor-local coordinates
            int localCursorX = cursorPosX - screenOffsetX;
            int localCursorY = cursorPosY - screenOffsetY;

            // Fast boundary check: If the cursor is nowhere near this display's surface, skip immediately
            if (localCursorX < -128 || localCursorX >= width + 128 || localCursorY < -128 || localCursorY >= height + 128)
            {
                return true;
            }

            if (hCursor == IntPtr.Zero)
            {
                hCursor = LoadCursor(IntPtr.Zero, IDC_ARROW);
            }

            if (!GetIconInfo(hCursor, out var iconInfo))
            {
                hCursor = LoadCursor(IntPtr.Zero, IDC_ARROW);
                if (hCursor == IntPtr.Zero || !GetIconInfo(hCursor, out iconInfo))
                {
                    return true;
                }
            }

            bool isBright = true;

            try
            {
                int hotspotX = iconInfo.xHotspot;
                int hotspotY = iconInfo.yHotspot;
                int cursorW = 32;
                int cursorH = 32;

                Array.Clear(_cursorPixels, 0, _cursorPixels.Length);

                // --- Handling Case 1: Monochromatic cursors (I-Beam, Crosshair, Sizing Arrows) ---
                if (iconInfo.hbmColor == IntPtr.Zero)
                {
                    GetObject(iconInfo.hbmMask, Marshal.SizeOf<BITMAP>(), out BITMAP bmMask);
                    cursorW = Math.Min(128, bmMask.bmWidth);
                    cursorH = Math.Min(128, bmMask.bmHeight / 2); // Upper half = AND mask, Lower half = XOR mask
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
                                _cursorPixels[idx] = 0; // Transparent
                            }
                            else if (!andBit && !xorBit)
                            {
                                _cursorPixels[idx] = unchecked((int)0xFF000000); // Opaque Black
                            }
                            else if (!andBit && xorBit)
                            {
                                _cursorPixels[idx] = unchecked((int)0xFFFFFFFF); // Opaque White
                            }
                            else
                            {
                                // Inverting XOR Pixel (Classic I-Beam line):
                                // Encodes sentinel value 0xFE in alpha channel for contrast-enforced color inversion
                                _cursorPixels[idx] = unchecked((int)0xFEFFFFFF);
                            }
                        }
                    }
                }
                // --- Handling Case 2: Color cursors (32bpp Alpha or 24bpp full color) ---
                else
                {
                    GetObject(iconInfo.hbmColor, Marshal.SizeOf<BITMAP>(), out BITMAP bmColor);
                    cursorW = Math.Clamp(bmColor.bmWidth, 16, 128);
                    cursorH = Math.Clamp(bmColor.bmHeight, 16, 128);

                    _cursorBmp ??= new Bitmap(128, 128, System.Drawing.Imaging.PixelFormat.Format32bppPArgb);

                    using (var g = Graphics.FromImage(_cursorBmp))
                    {
                        g.Clear(Color.Transparent);
                        IntPtr hdc = g.GetHdc();
                        DrawIconEx(hdc, 0, 0, hCursor, cursorW, cursorH, 0, IntPtr.Zero, DI_NORMAL);
                        g.ReleaseHdc(hdc);
                    }

                    var rect = new Rectangle(0, 0, 128, 128);
                    var bmpData = _cursorBmp.LockBits(rect, System.Drawing.Imaging.ImageLockMode.ReadOnly, System.Drawing.Imaging.PixelFormat.Format32bppPArgb);

                    int[] tempBits = new int[128 * 128];
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

                    byte[]? maskBytes = null;
                    int maskStride = 0;
                    if (!hasAlpha && iconInfo.hbmMask != IntPtr.Zero)
                    {
                        GetObject(iconInfo.hbmMask, Marshal.SizeOf<BITMAP>(), out BITMAP bmMask);
                        maskStride = bmMask.bmWidthBytes;
                        maskBytes = new byte[bmMask.bmHeight * maskStride];
                        GetBitmapBits(iconInfo.hbmMask, maskBytes.Length, maskBytes);
                    }

                    // Copy to 128x128 buffer
                    for (int y = 0; y < cursorH; y++)
                    {
                        int maskRow = y * maskStride;
                        for (int x = 0; x < cursorW; x++)
                        {
                            int px = tempBits[y * 128 + x];
                            if (!hasAlpha)
                            {
                                bool isTransparent = false;
                                if (maskBytes != null)
                                {
                                    int byteIdx = x / 8;
                                    byte bit = (byte)(0x80 >> (x % 8));
                                    isTransparent = byteIdx < maskStride && (maskBytes[maskRow + byteIdx] & bit) != 0;
                                }
                                else
                                {
                                    isTransparent = (px & 0x00FFFFFF) == 0;
                                }

                                if (!isTransparent)
                                {
                                    px |= unchecked((int)0xFF000000);
                                }
                                else
                                {
                                    px = 0;
                                }
                            }
                            _cursorPixels[y * 128 + x] = px;
                        }
                    }
                }

                // --- Calculate cursor brightness (Luma) ---
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

                // --- Draw cursor onto video frame including Pulse Scale ---
                float scale = MouseVisualRasterizer.GetCurrentCursorScale();
                int drawW = (int)(cursorW * scale);
                int drawH = (int)(cursorH * scale);
                int startX = localCursorX - (int)(hotspotX * scale);
                int startY = localCursorY - (int)(hotspotY * scale);

                if (++_debugLogCounter % 60 == 1)
                {
                    Logger.Info($"[MOUSE:PULSE] got={gotCursor}, pos=({cursorPosX},{cursorPosY}), local=({localCursorX},{localCursorY}), offset=({screenOffsetX},{screenOffsetY}), flags={pci.flags}, hCur={hCursor}, hotspot=({iconInfo.xHotspot},{iconInfo.yHotspot}), size=({cursorW}x{cursorH}), scale={scale:F2}, isBright={isBright}");
                }

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

                        // Dedicated mechanism for I-Beam cursor: color inversion with contrast enforcement
                        if (alpha == 254)
                        {
                            byte origB = frameBuffer[bufferIdx];
                            byte origG = frameBuffer[bufferIdx + 1];
                            byte origR = frameBuffer[bufferIdx + 2];

                            int bgLuma = (int)(0.299 * origR + 0.587 * origG + 0.114 * origB);

                            // If background is mid-gray (where direct mathematical inversion is hard to see), force pure black or pure white
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

                        // Standard drawing with Alpha Blending
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