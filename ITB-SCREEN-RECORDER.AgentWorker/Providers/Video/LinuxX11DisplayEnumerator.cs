using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using ITB_SCREEN_RECORDER.Core.Common;
using ITB_SCREEN_RECORDER.Core.Contracts.Topology;
using ITBRecorderAgent.Providers.Video;

namespace ITB_SCREEN_RECORDER.AgentWorker.Providers.Video
{
    public static class LinuxX11DisplayEnumerator
    {
        private const string X11Lib = "libX11.so.6";
        private const string XineramaLib = "libXinerama.so.1";

        [DllImport(X11Lib)] private static extern IntPtr XOpenDisplay(string? display);
        [DllImport(X11Lib)] private static extern int XCloseDisplay(IntPtr display);
        [DllImport(X11Lib)] private static extern IntPtr XDefaultRootWindow(IntPtr display);
        [DllImport(X11Lib)] private static extern int XGetWindowAttributes(IntPtr display, IntPtr window, out XWindowAttributes windowAttributes);
        [DllImport(X11Lib)] private static extern int XFree(IntPtr data);

        [DllImport(XineramaLib, EntryPoint = "XineramaIsActive")]
        private static extern int XineramaIsActive(IntPtr display);

        [DllImport(XineramaLib, EntryPoint = "XineramaQueryScreens")]
        private static extern IntPtr XineramaQueryScreens(IntPtr display, out int number);

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
        private struct XineramaScreenInfo
        {
            public int screen_number;
            public short x_org;
            public short y_org;
            public short width;
            public short height;
        }

        public static List<DxgiDisplayDescriptor> EnumerateDisplays()
        {
            var results = new List<DxgiDisplayDescriptor>();

            if (!OperatingSystem.IsLinux())
            {
                return results;
            }

            IntPtr display = IntPtr.Zero;
            try
            {
                string? displayName = Environment.GetEnvironmentVariable("DISPLAY") ?? ":0.0";
                display = XOpenDisplay(displayName);

                if (display == IntPtr.Zero)
                {
                    Logger.Warn($"[LINUX:X11] Cannot open X11 display '{displayName}' for enumeration.");
                    return results;
                }

                // 1. Try Xinerama query for multi-head layouts (XRandR/TwinView)
                try
                {
                    if (XineramaIsActive(display) != 0)
                    {
                        IntPtr screensPtr = XineramaQueryScreens(display, out int screenCount);
                        if (screensPtr != IntPtr.Zero && screenCount > 0)
                        {
                            int structSize = Marshal.SizeOf<XineramaScreenInfo>();
                            for (int i = 0; i < screenCount; i++)
                            {
                                IntPtr currentPtr = IntPtr.Add(screensPtr, i * structSize);
                                var info = Marshal.PtrToStructure<XineramaScreenInfo>(currentPtr);

                                bool isPrimary = (info.x_org == 0 && info.y_org == 0);
                                string displayId = $"mon-{i}";

                                results.Add(new DxgiDisplayDescriptor(
                                    AdapterIndex: 0,
                                    OutputIndex: (uint)i,
                                    DisplayId: displayId,
                                    DeviceName: $"{displayName} [Screen {info.screen_number}]",
                                    AdapterName: "Linux X11 DRM Graphics",
                                    AdapterLuid: $"0x{i:X8}",
                                    X: info.x_org,
                                    Y: info.y_org,
                                    Width: info.width,
                                    Height: info.height,
                                    IsPrimary: isPrimary
                                ));
                            }

                            XFree(screensPtr);
                            Logger.Info($"[LINUX:X11] Enumerated {results.Count} physical monitor(s) via Xinerama/XRandR.");
                            return results;
                        }
                    }
                }
                catch (Exception ex)
                {
                    Logger.Debug($"[LINUX:X11] Xinerama query bypassed: {ex.Message}");
                }

                // 2. Fallback to full root window dimensions
                IntPtr rootWindow = XDefaultRootWindow(display);
                if (XGetWindowAttributes(display, rootWindow, out var attr) != 0)
                {
                    results.Add(new DxgiDisplayDescriptor(
                        AdapterIndex: 0,
                        OutputIndex: 0,
                        DisplayId: "mon-0",
                        DeviceName: displayName,
                        AdapterName: "Linux X11 DRM Graphics",
                        AdapterLuid: "0x0",
                        X: 0,
                        Y: 0,
                        Width: attr.width > 0 ? attr.width : 1920,
                        Height: attr.height > 0 ? attr.height : 1080,
                        IsPrimary: true
                    ));
                    Logger.Info($"[LINUX:X11] Enumerated root display: {attr.width}x{attr.height}");
                }
            }
            catch (Exception ex)
            {
                Logger.Warn($"[LINUX:X11] Display enumeration failure: {ex.Message}");
            }
            finally
            {
                if (display != IntPtr.Zero)
                {
                    XCloseDisplay(display);
                }
            }

            return results;
        }

        public static StationDisplayTopologyDto BuildTopologyDto(string hostname)
        {
            var descriptors = EnumerateDisplays();
            var displays = new List<DisplayMetadataDto>();

            int minX = 0, minY = 0, maxX = 1920, maxY = 1080;
            if (descriptors.Count > 0)
            {
                minX = descriptors.Min(d => d.X);
                minY = descriptors.Min(d => d.Y);
                maxX = descriptors.Max(d => d.X + d.Width);
                maxY = descriptors.Max(d => d.Y + d.Height);

                displays = descriptors.Select(d => new DisplayMetadataDto
                {
                    DisplayId = d.DisplayId,
                    DisplayName = d.DeviceName,
                    AdapterName = d.AdapterName,
                    AdapterLuid = d.AdapterLuid,
                    IsPrimary = d.IsPrimary,
                    X = d.X,
                    Y = d.Y,
                    Width = d.Width,
                    Height = d.Height,
                    ScaleFactor = 1.0,
                    RefreshRateHz = 60,
                    TargetFps = 30
                }).ToList();
            }

            return new StationDisplayTopologyDto
            {
                Hostname = hostname,
                Displays = displays,
                VirtualDesktopBounds = new DesktopBoundsDto
                {
                    X = minX,
                    Y = minY,
                    Width = Math.Max(1, maxX - minX),
                    Height = Math.Max(1, maxY - minY)
                },
                TimestampEpochMs = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
            };
        }
    }
}
