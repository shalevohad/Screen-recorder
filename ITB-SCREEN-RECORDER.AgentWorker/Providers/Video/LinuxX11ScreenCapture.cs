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

        [DllImport(X11Lib)] private static extern IntPtr XOpenDisplay(string? display);
        [DllImport(X11Lib)] private static extern int XCloseDisplay(IntPtr display);
        [DllImport(X11Lib)] private static extern IntPtr XDefaultRootWindow(IntPtr display);
        [DllImport(X11Lib)] private static extern int XGetWindowAttributes(IntPtr display, IntPtr window, out XWindowAttributes windowAttributes);
        [DllImport(X11Lib)] private static extern IntPtr XGetImage(IntPtr display, IntPtr drawable, int x, int y, uint width, uint height, ulong plane_mask, int format);
        [DllImport(X11Lib)] private static extern int XDestroyImage(IntPtr ximage);

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

        private const int ZPixmap = 2;
        private IntPtr _display = IntPtr.Zero;
        private IntPtr _rootWindow = IntPtr.Zero;
        private readonly int _x;
        private readonly int _y;
        public string DisplayId { get; }

        public LinuxX11ScreenCapture(int x = 0, int y = 0, int width = 0, int height = 0, string displayId = "mon-0")
        {
            _x = x;
            _y = y;
            Width = width;
            Height = height;
            DisplayId = displayId;
        }

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
                if (Width <= 0 || Height <= 0)
                {
                    XGetWindowAttributes(_display, _rootWindow, out var attr);
                    Width = attr.width;
                    Height = attr.height;
                }
                IsInitialized = true;

                Logger.Info($"[VIDEO] Linux X11 Capture initialized for '{DisplayId}' ({_x},{_y} {Width}x{Height})");
            }
            catch (Exception ex)
            {
                Logger.Error($"[VIDEO] Linux X11 initialization failed: {ex.Message}");
                Dispose();
                throw;
            }
        }

        /// <summary>
        /// Captures a screen frame from the X11 root window using XGetImage.
        /// </summary>
        /// <param name="frameData">Outputs newly allocated raw BGRA byte buffer, or null on failure.</param>
        /// <returns>True if frame was successfully acquired; otherwise, false.</returns>
        public bool TryCaptureFrame(out byte[]? frameData)
        {
            frameData = null;
            if (!IsInitialized || _display == IntPtr.Zero)
                return false;

            IntPtr imgPtr = IntPtr.Zero;
            try
            {
                imgPtr = XGetImage(_display, _rootWindow, _x, _y, (uint)Width, (uint)Height, ~0UL, ZPixmap);
                if (imgPtr == IntPtr.Zero) return false;

                var img = Marshal.PtrToStructure<XImage>(imgPtr);
                int totalBytes = Width * Height * 4;
                frameData = new byte[totalBytes];

                // Copy clean desktop frame only. Mouse cursor rendering and click effects are managed by MouseOverlayProvider.
                Marshal.Copy(img.data, frameData, 0, totalBytes);

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