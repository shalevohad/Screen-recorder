using System;
using System.Runtime.InteropServices;
using System.Threading;
using ITB_SCREEN_RECORDER.Core.Common;
using ITBRecorderAgent.Providers.Video.Mouse.Common;

namespace ITBRecorderAgent.Providers.Video.Mouse.Linux
{
    public class LinuxMouseOverlay : IMouseOverlayProvider
    {
        #region X11 & XFixes & Xtst Interop
        private const string X11Lib = "libX11.so.6";
        private const string XFixesLib = "libXfixes.so.3";
        private const string XtstLib = "libXtst.so.6";

        [DllImport(X11Lib)] private static extern IntPtr XOpenDisplay(string? display);
        [DllImport(X11Lib)] private static extern int XCloseDisplay(IntPtr display);
        [DllImport(X11Lib)] private static extern IntPtr XDefaultRootWindow(IntPtr display);
        [DllImport(X11Lib)] private static extern bool XQueryPointer(IntPtr display, IntPtr window, out IntPtr root, out IntPtr child, out int root_x, out int root_y, out int win_x, out int win_y, out int mask);
        [DllImport(X11Lib)] private static extern void XFree(IntPtr data);

        [DllImport(XFixesLib)] private static extern IntPtr XFixesGetCursorImage(IntPtr display);

        [StructLayout(LayoutKind.Sequential)]
        private struct XFixesCursorImage
        {
            public short x, y;
            public ushort width, height, xhot, yhot;
            public UIntPtr cursor_serial;
            public IntPtr pixels;
            public UIntPtr atom;
            public IntPtr name;
        }

        [DllImport(XtstLib)] private static extern IntPtr XRecordAllocRange();
        [DllImport(XtstLib)] private static extern IntPtr XRecordCreateContext(IntPtr dpy, int datum_flags, ref ulong clients, int nclients, ref IntPtr ranges, int nranges);
        private delegate void XRecordInterceptProc(IntPtr closure, IntPtr recorded_data);
        [DllImport(XtstLib)] private static extern int XRecordEnableContext(IntPtr dpy, IntPtr context, XRecordInterceptProc proc, IntPtr closure);
        [DllImport(XtstLib)] private static extern int XRecordFreeContext(IntPtr dpy, IntPtr context);
        #endregion

        private Thread? _listenerThread;
        private volatile bool _isInitialized;
        private volatile bool _isFeatureEnabled = true;
        private bool _warnedUnavailable = false;

        private IntPtr _renderDisplay = IntPtr.Zero;
        private readonly object _renderLock = new();

        public void Initialize()
        {
            if (_isInitialized || !_isFeatureEnabled) return;

            lock (_renderLock)
            {
                if (_isInitialized || !_isFeatureEnabled) return;

                try
                {
                    string? displayName = Environment.GetEnvironmentVariable("DISPLAY") ?? ":0.0";
                    _renderDisplay = XOpenDisplay(displayName);

                    if (_renderDisplay == IntPtr.Zero)
                    {
                        DisableFeature("Cannot connect to X11 Display. No active graphical session found ($DISPLAY is unset or invalid).");
                        return;
                    }

                    _listenerThread = new Thread(ListenLoop)
                    {
                        IsBackground = true,
                        Name = "ITB_LinuxMouseListener"
                    };
                    _listenerThread.Start();
                    _isInitialized = true;
                }
                catch (DllNotFoundException ex)
                {
                    DisableFeature($"Native dependency missing: '{ex.Message}'. Please install packages: 'sudo apt install libx11-6 libxfixes3 libxtst6'.");
                }
                catch (Exception ex)
                {
                    DisableFeature($"Initialization error: {ex.Message}");
                }
            }
        }

        private void DisableFeature(string reason)
        {
            _isFeatureEnabled = false;
            _isInitialized = true;

            if (!_warnedUnavailable)
            {
                _warnedUnavailable = true;
                Logger.Warn($"[OVERLAY:MOUSE] Linux mouse interaction overlay gracefully disabled: {reason} Screen recording continues uninterrupted.");
            }

            if (_renderDisplay != IntPtr.Zero)
            {
                try { XCloseDisplay(_renderDisplay); } catch { }
                _renderDisplay = IntPtr.Zero;
            }
        }

        private void ListenLoop()
        {
            if (!_isFeatureEnabled) return;

            IntPtr dpy = IntPtr.Zero;
            try
            {
                string? displayName = Environment.GetEnvironmentVariable("DISPLAY") ?? ":0.0";
                dpy = XOpenDisplay(displayName);
                if (dpy == IntPtr.Zero) return;

                IntPtr rootWin = XDefaultRootWindow(dpy);
                bool recordStarted = false;

                try
                {
                    IntPtr range = XRecordAllocRange();
                    if (range != IntPtr.Zero)
                    {
                        Marshal.WriteByte(range, 14, 4); // ButtonPress
                        Marshal.WriteByte(range, 15, 5); // ButtonRelease

                        ulong allClients = 1;
                        IntPtr context = XRecordCreateContext(dpy, 0, ref allClients, 1, ref range, 1);
                        XFree(range);

                        if (context != IntPtr.Zero)
                        {
                            XRecordInterceptProc callback = (closure, recorded_data) =>
                            {
                                try
                                {
                                    int category = Marshal.ReadInt32(recorded_data, 16);
                                    if (category == 0)
                                    {
                                        IntPtr dataPtr = Marshal.ReadIntPtr(recorded_data, 24);
                                        if (dataPtr != IntPtr.Zero)
                                        {
                                            byte type = Marshal.ReadByte(dataPtr, 0);
                                            byte detail = Marshal.ReadByte(dataPtr, 1);

                                            if (type == 4) // ButtonPress
                                            {
                                                XQueryPointer(dpy, rootWin, out _, out _, out int px, out int py, out _, out _, out _);
                                                if (detail == 1) MouseVisualRasterizer.EnqueueEvent(px, py, MouseInteractionType.LeftClick);
                                                else if (detail == 3) MouseVisualRasterizer.EnqueueEvent(px, py, MouseInteractionType.RightClick);
                                                else if (detail == 4) MouseVisualRasterizer.EnqueueEvent(px, py, MouseInteractionType.ScrollUp);
                                                else if (detail == 5) MouseVisualRasterizer.EnqueueEvent(px, py, MouseInteractionType.ScrollDown);
                                            }
                                        }
                                    }
                                }
                                catch { }
                            };

                            recordStarted = true;
                            XRecordEnableContext(dpy, context, callback, IntPtr.Zero);
                            XRecordFreeContext(dpy, context);
                        }
                    }
                }
                catch (DllNotFoundException)
                {
                    // libXtst חסר - מודיעים וממשיכים ל-Polling דרך libX11 בלבד
                    Logger.Info("[OVERLAY:MOUSE] libXtst.so.6 not found. Falling back to XQueryPointer polling for mouse click detection.");
                    recordStarted = false;
                }

                if (!recordStarted && _isFeatureEnabled)
                {
                    int lastMask = 0;
                    while (_isFeatureEnabled)
                    {
                        if (XQueryPointer(dpy, rootWin, out _, out _, out int px, out int py, out _, out _, out int mask))
                        {
                            bool leftDown = (mask & (1 << 8)) != 0;
                            bool prevLeft = (lastMask & (1 << 8)) != 0;
                            if (leftDown && !prevLeft) MouseVisualRasterizer.EnqueueEvent(px, py, MouseInteractionType.LeftClick);

                            bool rightDown = (mask & (1 << 10)) != 0;
                            bool prevRight = (lastMask & (1 << 10)) != 0;
                            if (rightDown && !prevRight) MouseVisualRasterizer.EnqueueEvent(px, py, MouseInteractionType.RightClick);

                            lastMask = mask;
                        }
                        Thread.Sleep(10);
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.Warn($"[OVERLAY:MOUSE] Linux background hook thread stopped: {ex.Message}");
            }
            finally
            {
                if (dpy != IntPtr.Zero)
                {
                    try { XCloseDisplay(dpy); } catch { }
                }
            }
        }

        public void DrawMouseToFrame(byte[] frameBuffer, int width, int height)
        {
            if (!_isFeatureEnabled) return;

            try
            {
                Initialize();
                if (!_isFeatureEnabled) return;

                MouseVisualRasterizer.RenderRingsAndScroll(frameBuffer, width, height);
                bool isCursorBright = DrawX11CursorSafe(frameBuffer, width, height);
                MouseVisualRasterizer.RenderClickBadges(frameBuffer, width, height, isCursorBright);
            }
            catch (DllNotFoundException ex)
            {
                DisableFeature($"Missing library '{ex.Message}' during render cycle. Install with: 'sudo apt install libxfixes3'.");
            }
            catch (Exception ex)
            {
                DisableFeature($"Render failure: {ex.Message}");
            }
        }

        private bool DrawX11CursorSafe(byte[] frameBuffer, int width, int height)
        {
            if (_renderDisplay == IntPtr.Zero || !_isFeatureEnabled) return true;

            IntPtr curPtr = IntPtr.Zero;
            bool isBright = true;

            lock (_renderLock)
            {
                try
                {
                    curPtr = XFixesGetCursorImage(_renderDisplay);
                    if (curPtr == IntPtr.Zero) return true;

                    var cur = Marshal.PtrToStructure<XFixesCursorImage>(curPtr);
                    int curW = cur.width;
                    int curH = cur.height;
                    if (curW <= 0 || curH <= 0 || cur.pixels == IntPtr.Zero) return true;

                    int pixelCount = curW * curH;
                    uint[] cursorPixels = new uint[pixelCount];

                    if (IntPtr.Size == 8)
                    {
                        long[] raw64 = new long[pixelCount];
                        Marshal.Copy(cur.pixels, raw64, 0, pixelCount);
                        for (int i = 0; i < pixelCount; i++)
                        {
                            cursorPixels[i] = (uint)(raw64[i] & 0xFFFFFFFF);
                        }
                    }
                    else
                    {
                        int[] raw32 = new int[pixelCount];
                        Marshal.Copy(cur.pixels, raw32, 0, pixelCount);
                        for (int i = 0; i < pixelCount; i++)
                        {
                            cursorPixels[i] = (uint)raw32[i];
                        }
                    }

                    uint maxAlpha = 0;
                    for (int i = 0; i < pixelCount; i++)
                    {
                        uint a = (cursorPixels[i] >> 24) & 0xFF;
                        if (a > maxAlpha) maxAlpha = a;
                    }

                    if (maxAlpha == 0)
                    {
                        for (int i = 0; i < pixelCount; i++)
                        {
                            if ((cursorPixels[i] & 0x00FFFFFF) != 0)
                                cursorPixels[i] |= 0xFF000000;
                        }
                    }

                    long totalLuma = 0;
                    int nonTransparentCount = 0;

                    for (int i = 0; i < pixelCount; i++)
                    {
                        uint p = cursorPixels[i];
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

                    bool isIBeam = (curW <= 16 && curH >= 12);
                    float scale = MouseVisualRasterizer.IsClickActive() ? 1.35f : 1.0f;
                    int drawW = (int)(curW * scale);
                    int drawH = (int)(curH * scale);
                    int startX = cur.x - (int)(cur.xhot * scale);
                    int startY = cur.y - (int)(cur.yhot * scale);

                    if (isIBeam)
                    {
                        byte haloColor = isBright ? (byte)15 : (byte)245;
                        byte haloAlpha = 220;

                        for (int dy = -1; dy <= drawH; dy++)
                        {
                            int targetY = startY + dy;
                            if (targetY < 0 || targetY >= height) continue;
                            int rowOffset = targetY * width * 4;

                            for (int dx = -1; dx <= drawW; dx++)
                            {
                                int targetX = startX + dx;
                                if (targetX < 0 || targetX >= width) continue;

                                int srcX = Math.Clamp((int)(dx / scale), 0, curW - 1);
                                int srcY = Math.Clamp((int)(dy / scale), 0, curH - 1);

                                uint p = cursorPixels[srcY * curW + srcX];
                                if (((p >> 24) & 0xFF) > 40)
                                {
                                    for (int oy = -1; oy <= 1; oy++)
                                    {
                                        int hy = targetY + oy;
                                        if (hy < 0 || hy >= height) continue;
                                        int hRow = hy * width * 4;

                                        for (int ox = -1; ox <= 1; ox++)
                                        {
                                            int hx = targetX + ox;
                                            if (hx < 0 || hx >= width) continue;

                                            int bIdx = hRow + hx * 4;
                                            float a = haloAlpha / 255.0f;
                                            float invA = 1.0f - a;
                                            frameBuffer[bIdx] = (byte)(haloColor * a + frameBuffer[bIdx] * invA);
                                            frameBuffer[bIdx + 1] = (byte)(haloColor * a + frameBuffer[bIdx + 1] * invA);
                                            frameBuffer[bIdx + 2] = (byte)(haloColor * a + frameBuffer[bIdx + 2] * invA);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    for (int dy = 0; dy < drawH; dy++)
                    {
                        int targetY = startY + dy;
                        if (targetY < 0 || targetY >= height) continue;

                        int srcY = Math.Min(curH - 1, (int)(dy / scale));
                        int rowOffset = targetY * width * 4;

                        for (int dx = 0; dx < drawW; dx++)
                        {
                            int targetX = startX + dx;
                            if (targetX < 0 || targetX >= width) continue;

                            int srcX = Math.Min(curW - 1, (int)(dx / scale));
                            uint pixel = cursorPixels[srcY * curW + srcX];
                            byte alpha = (byte)((pixel >> 24) & 0xFF);
                            if (alpha == 0) continue;

                            byte srcB = (byte)(pixel & 0xFF);
                            byte srcG = (byte)((pixel >> 8) & 0xFF);
                            byte srcR = (byte)((pixel >> 16) & 0xFF);

                            int bufferIdx = rowOffset + targetX * 4;

                            if (alpha == 255)
                            {
                                frameBuffer[bufferIdx] = srcB;
                                frameBuffer[bufferIdx + 1] = srcG;
                                frameBuffer[bufferIdx + 2] = srcR;
                            }
                            else
                            {
                                float a = alpha / 255.0f;
                                float invA = 1.0f - a;
                                frameBuffer[bufferIdx] = (byte)(srcB * a + frameBuffer[bufferIdx] * invA);
                                frameBuffer[bufferIdx + 1] = (byte)(srcG * a + frameBuffer[bufferIdx + 1] * invA);
                                frameBuffer[bufferIdx + 2] = (byte)(srcR * a + frameBuffer[bufferIdx + 2] * invA);
                            }
                        }
                    }
                }
                catch (DllNotFoundException) { throw; }
                catch (Exception) { }
                finally
                {
                    if (curPtr != IntPtr.Zero)
                    {
                        try { XFree(curPtr); } catch { }
                    }
                }
            }

            return isBright;
        }

        public void Dispose()
        {
            _isFeatureEnabled = false;
            lock (_renderLock)
            {
                if (_renderDisplay != IntPtr.Zero)
                {
                    try { XCloseDisplay(_renderDisplay); } catch { }
                    _renderDisplay = IntPtr.Zero;
                }
            }
        }
    }
}