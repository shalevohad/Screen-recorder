using System;
using System.Runtime.InteropServices;
using ITB_SCREEN_RECORDER.Core.Common;

namespace ITBRecorderAgent.Providers.Video
{
    public class LinuxX11ScreenCapture : IScreenCaptureProvider
    {
        public int Width { get; private set; }
        public int Height { get; private set; }
        public bool IsInitialized { get; private set; }

        private const string X11Lib = "libX11.so.6";
        private const string XFixesLib = "libXfixes.so.3";

        [DllImport(X11Lib)]
        private static extern IntPtr XOpenDisplay(string? display);

        [DllImport(X11Lib)]
        private static extern int XCloseDisplay(IntPtr display);

        [DllImport(X11Lib)]
        private static extern IntPtr XDefaultRootWindow(IntPtr display);

        [DllImport(X11Lib)]
        private static extern int XGetWindowAttributes(IntPtr display, IntPtr window, out XWindowAttributes windowAttributes);

        [DllImport(X11Lib)]
        private static extern IntPtr XGetImage(IntPtr display, IntPtr drawable, int x, int y, uint width, uint height, ulong plane_mask, int format);

        [DllImport(X11Lib)]
        private static extern int XDestroyImage(IntPtr ximage);

        [DllImport(X11Lib)]
        private static extern void XFree(IntPtr data);

        [DllImport(XFixesLib)]
        private static extern IntPtr XFixesGetCursorImage(IntPtr display);

        [StructLayout(LayoutKind.Sequential)]
        private struct XWindowAttributes
        {
            public int x, y, width, height, border_width, depth;
            public IntPtr visual, root;
            public int @class, bit_gravity, win_gravity, backing_store;
            public ulong backing_planes, backing_pixel;
            public int save_under;
            public IntPtr colormap;
            public int map_installed, map_state;
            public long all_event_masks, your_event_mask, do_not_propagate_mask;
            public int override_redirect;
            public IntPtr screen;
        }

        [StructLayout(LayoutKind.Sequential)]
        private struct XImage
        {
            public int width, height, xoffset, format;
            public IntPtr data;
            public int byte_order, bitmap_unit, bitmap_bit_order, bitmap_pad, depth, bytes_per_line, bits_per_pixel;
            public ulong red_mask, green_mask, blue_mask;
        }

        [StructLayout(LayoutKind.Sequential)]
        private struct XFixesCursorImage
        {
            public short x, y;
            public ushort width, height, xhot, yhot;
            public ulong cursor_serial;
            public IntPtr pixels;
            public IntPtr atom, name;
        }

        private const int ZPixmap = 2;
        private IntPtr _display = IntPtr.Zero;
        private IntPtr _rootWindow = IntPtr.Zero;

        public void Initialize()
        {
            try
            {
                string? displayName = Environment.GetEnvironmentVariable("DISPLAY") ?? ":0.0";
                _display = XOpenDisplay(displayName);

                if (_display == IntPtr.Zero)
                {
                    throw new InvalidOperationException($"Cannot open X11 Display '{displayName}'.");
                }

                _rootWindow = XDefaultRootWindow(_display);
                XGetWindowAttributes(_display, _rootWindow, out var attr);

                Width = attr.width;
                Height = attr.height;
                IsInitialized = true;

                Logger.Info($"[VIDEO] Linux X11 Capture initialized: {Width}x{Height}");
            }
            catch (Exception ex)
            {
                Logger.Error($"[VIDEO] Linux X11 initialization failed: {ex.Message}");
                Dispose();
                throw;
            }
        }

        public bool TryCaptureFrame(out byte[]? frameData)
        {
            frameData = null;
            if (!IsInitialized || _display == IntPtr.Zero)
                return false;

            IntPtr imgPtr = IntPtr.Zero;
            try
            {
                imgPtr = XGetImage(_display, _rootWindow, 0, 0, (uint)Width, (uint)Height, ~0UL, ZPixmap);
                if (imgPtr == IntPtr.Zero) return false;

                var img = Marshal.PtrToStructure<XImage>(imgPtr);
                int totalBytes = Width * Height * 4;
                frameData = new byte[totalBytes];

                Marshal.Copy(img.data, frameData, 0, totalBytes);
                OverlayX11Cursor(frameData);

                return true;
            }
            catch
            {
                return false;
            }
            finally
            {
                if (imgPtr != IntPtr.Zero) XDestroyImage(imgPtr);
            }
        }

        private void OverlayX11Cursor(byte[] frameBuffer)
        {
            IntPtr curPtr = IntPtr.Zero;
            try
            {
                curPtr = XFixesGetCursorImage(_display);
                if (curPtr == IntPtr.Zero) return;

                var cur = Marshal.PtrToStructure<XFixesCursorImage>(curPtr);
                int startX = cur.x - cur.xhot;
                int startY = cur.y - cur.yhot;

                int[] cursorPixels = new int[cur.width * cur.height];
                Marshal.Copy(cur.pixels, cursorPixels, 0, cursorPixels.Length);

                for (int cy = 0; cy < cur.height; cy++)
                {
                    int targetY = startY + cy;
                    if (targetY < 0 || targetY >= Height) continue;

                    for (int cx = 0; cx < cur.width; cx++)
                    {
                        int targetX = startX + cx;
                        if (targetX < 0 || targetX >= Width) continue;

                        uint pixel = (uint)cursorPixels[cy * cur.width + cx];
                        byte alpha = (byte)((pixel >> 24) & 0xFF);
                        if (alpha == 0) continue;

                        int bufferIdx = (targetY * Width + targetX) * 4;

                        byte srcB = (byte)(pixel & 0xFF);
                        byte srcG = (byte)((pixel >> 8) & 0xFF);
                        byte srcR = (byte)((pixel >> 16) & 0xFF);

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

        public void Dispose()
        {
            IsInitialized = false;
            if (_display != IntPtr.Zero)
            {
                XCloseDisplay(_display);
                _display = IntPtr.Zero;
            }
        }
    }
}