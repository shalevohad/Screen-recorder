using System;
using System.Runtime.InteropServices;
using System.Threading;
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
            public ulong cursor_serial;
            public IntPtr pixels;
            public IntPtr atom, name;
        }

        [DllImport(XtstLib)] private static extern IntPtr XRecordAllocRange();
        [DllImport(XtstLib)] private static extern IntPtr XRecordCreateContext(IntPtr dpy, int datum_flags, ref ulong clients, int nclients, ref IntPtr ranges, int nranges);
        private delegate void XRecordInterceptProc(IntPtr closure, IntPtr recorded_data);
        [DllImport(XtstLib)] private static extern int XRecordEnableContext(IntPtr dpy, IntPtr context, XRecordInterceptProc proc, IntPtr closure);
        [DllImport(XtstLib)] private static extern int XRecordFreeContext(IntPtr dpy, IntPtr context);
        #endregion

        private Thread? _listenerThread;
        private volatile bool _isInitialized;
        private XRecordInterceptProc? _xRecordCallback;

        // Display ייעודי עבור ת'רד הציור למניעת התנגשויות X11 Multi-threading
        private IntPtr _renderDisplay = IntPtr.Zero;
        private readonly object _renderLock = new();

        public void Initialize()
        {
            if (_isInitialized) return;
            _isInitialized = true;

            string? displayName = Environment.GetEnvironmentVariable("DISPLAY") ?? ":0.0";
            _renderDisplay = XOpenDisplay(displayName);

            _listenerThread = new Thread(ListenLoop)
            {
                IsBackground = true,
                Name = "ITB_LinuxMouseListener"
            };
            _listenerThread.Start();
        }

        private void ListenLoop()
        {
            string? displayName = Environment.GetEnvironmentVariable("DISPLAY") ?? ":0.0";
            IntPtr dpy = XOpenDisplay(displayName);
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
                        _xRecordCallback = (closure, recorded_data) =>
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
                        XRecordEnableContext(dpy, context, _xRecordCallback, IntPtr.Zero);
                        XRecordFreeContext(dpy, context);
                    }
                }
            }
            catch
            {
                recordStarted = false;
            }

            // Fallback מבוסס Polling אם libXtst אינו זמין
            if (!recordStarted)
            {
                int lastMask = 0;
                while (_isInitialized)
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

            XCloseDisplay(dpy);
        }

        public void DrawMouseToFrame(byte[] frameBuffer, int width, int height)
        {
            Initialize();

            // 1. שכבת רקע: טבעות מתפשטות וחיצי גלילה ממורכזים
            MouseVisualRasterizer.RenderRingsAndScroll(frameBuffer, width, height);

            // 2. שכבת סמן: ציור סמן X11 עם Pulse Scale של 1.35x בלחיצה וחישוב בהירות
            bool isCursorBright = DrawX11CursorWithPulse(frameBuffer, width, height);

            // 3. שכבה עליונה: תגית L / R מותאמת ניגודיות למניעת בליעה
            MouseVisualRasterizer.RenderClickBadges(frameBuffer, width, height, isCursorBright);
        }

        private bool DrawX11CursorWithPulse(byte[] frameBuffer, int width, int height)
        {
            if (_renderDisplay == IntPtr.Zero) return true;

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
                    if (curW <= 0 || curH <= 0) return true;

                    int pixelCount = curW * curH;
                    int[] cursorPixels = new int[pixelCount];
                    Marshal.Copy(cur.pixels, cursorPixels, 0, pixelCount);

                    // --- דגימת בהירות הסמן ב-Linux (Luminance Sensing) ---
                    long totalLuma = 0;
                    int nonTransparentCount = 0;

                    for (int i = 0; i < pixelCount; i++)
                    {
                        uint p = (uint)cursorPixels[i];
                        byte a = (byte)((p >> 24) & 0xFF);
                        if (a > 50)
                        {
                            byte b = (byte)(p & 0xFF);
                            byte g = (byte)((p >> 8) & 0xFF);
                            byte r = (byte)((p >> 16) & 0xFF);
                            totalLuma += (long)(0.299 * r + 0.587 * g + 0.114 * b);
                            nonTransparentCount++;
                        }
                    }

                    if (nonTransparentCount > 0)
                    {
                        isBright = (totalLuma / nonTransparentCount) > 120;
                    }

                    // --- קביעת יחס הגדלה (1.35x Scale בעת קליק) ---
                    float scale = MouseVisualRasterizer.IsClickActive() ? 1.35f : 1.0f;

                    int startX = cur.x - (int)(cur.xhot * scale);
                    int startY = cur.y - (int)(cur.yhot * scale);

                    int drawW = (int)(curW * scale);
                    int drawH = (int)(curH * scale);

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
                            uint pixel = (uint)cursorPixels[srcY * curW + srcX];
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
                catch { }
                finally
                {
                    if (curPtr != IntPtr.Zero) XFree(curPtr);
                }
            }

            return isBright;
        }

        public void Dispose()
        {
            _isInitialized = false;
            lock (_renderLock)
            {
                if (_renderDisplay != IntPtr.Zero)
                {
                    XCloseDisplay(_renderDisplay);
                    _renderDisplay = IntPtr.Zero;
                }
            }
        }
    }
}