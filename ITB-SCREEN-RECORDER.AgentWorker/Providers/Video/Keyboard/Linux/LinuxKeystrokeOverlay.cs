using System;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using ITBRecorderAgent.Providers.Video.Keyboard.Common;

namespace ITBRecorderAgent.Providers.Video.Keyboard.Linux
{
    public class LinuxKeystrokeOverlay : IKeystrokeOverlayProvider
    {
        #region X11 & Xtst Imports
        private const string X11Lib = "libX11.so.6";
        private const string XtstLib = "libXtst.so.6";

        [DllImport(X11Lib)] private static extern IntPtr XOpenDisplay(string? display);
        [DllImport(X11Lib)] private static extern int XCloseDisplay(IntPtr display);
        [DllImport(X11Lib)] private static extern ulong XKeycodeToKeysym(IntPtr dpy, byte keycode, int index);
        [DllImport(X11Lib)] private static extern void XFree(IntPtr data);

        [DllImport(XtstLib)] private static extern IntPtr XRecordAllocRange();
        [DllImport(XtstLib)] private static extern IntPtr XRecordCreateContext(IntPtr dpy, int datum_flags, ref ulong clients, int nclients, ref IntPtr ranges, int nranges);
        private delegate void XRecordInterceptProc(IntPtr closure, IntPtr recorded_data);
        [DllImport(XtstLib)] private static extern int XRecordEnableContext(IntPtr dpy, IntPtr context, XRecordInterceptProc proc, IntPtr closure);
        [DllImport(XtstLib)] private static extern int XRecordFreeContext(IntPtr dpy, IntPtr context);
        #endregion

        private Thread? _thread;
        private volatile bool _isInitialized;
        private XRecordInterceptProc? _callback;

        private static bool _ctrlDown;
        private static bool _altDown;
        private static bool _shiftDown;
        private static bool _superDown;

        public void Initialize()
        {
            if (_isInitialized) return;
            _isInitialized = true;

            _thread = new Thread(ListenLoop)
            {
                IsBackground = true,
                Name = "ITB_LinuxKeyboardHook"
            };
            _thread.Start();
        }

        private void ListenLoop()
        {
            string? displayName = Environment.GetEnvironmentVariable("DISPLAY") ?? ":0.0";
            IntPtr dpy = XOpenDisplay(displayName);
            if (dpy == IntPtr.Zero) return;

            try
            {
                IntPtr range = XRecordAllocRange();
                if (range != IntPtr.Zero)
                {
                    Marshal.WriteByte(range, 14, 2); // KeyPress
                    Marshal.WriteByte(range, 15, 3); // KeyRelease

                    ulong allClients = 1;
                    IntPtr context = XRecordCreateContext(dpy, 0, ref allClients, 1, ref range, 1);
                    XFree(range);

                    if (context != IntPtr.Zero)
                    {
                        _callback = (closure, recorded_data) =>
                        {
                            try
                            {
                                int category = Marshal.ReadInt32(recorded_data, 16);
                                if (category == 0)
                                {
                                    IntPtr dataPtr = Marshal.ReadIntPtr(recorded_data, 24);
                                    if (dataPtr != IntPtr.Zero)
                                    {
                                        byte eventType = Marshal.ReadByte(dataPtr, 0);
                                        byte keycode = Marshal.ReadByte(dataPtr, 1);
                                        ulong keysym = XKeycodeToKeysym(dpy, keycode, 0);

                                        HandleKeyEvent(eventType, keysym);
                                    }
                                }
                            }
                            catch { }
                        };

                        XRecordEnableContext(dpy, context, _callback, IntPtr.Zero);
                        XRecordFreeContext(dpy, context);
                    }
                }
            }
            catch { }
            finally
            {
                XCloseDisplay(dpy);
            }
        }

        private static void HandleKeyEvent(byte eventType, ulong keysym)
        {
            bool isPress = (eventType == 2);

            switch (keysym)
            {
                case 0xFFE3: case 0xFFE4: _ctrlDown = isPress; return;
                case 0xFFE9: case 0xFFEA: _altDown = isPress; return;
                case 0xFFE1: case 0xFFE2: _shiftDown = isPress; return;
                case 0xFFEB: case 0xFFEC: _superDown = isPress; return;
            }

            if (!isPress) return;

            bool hasModifier = _ctrlDown || _altDown || _superDown;
            bool isSpecial = IsLinuxSpecialKey(keysym);

            if (hasModifier || isSpecial)
            {
                string keyName = GetLinuxKeyName(keysym);
                if (!string.IsNullOrEmpty(keyName))
                {
                    var sb = new StringBuilder(32);
                    if (_ctrlDown) sb.Append("CTRL + ");
                    if (_altDown) sb.Append("ALT + ");
                    if (_superDown) sb.Append("SUPER + ");
                    if (_shiftDown) sb.Append("SHIFT + ");
                    sb.Append(keyName);

                    KeystrokeHudRasterizer.SetShortcut(sb.ToString());
                }
            }
        }

        private static bool IsLinuxSpecialKey(ulong keysym)
        {
            return keysym switch
            {
                >= 0xFFBE and <= 0xFFC9 => true, // F1 - F12
                0xFF1B or 0xFF0D or 0xFF09 or 0xFF08 or 0xFFFF => true,
                0xFF50 or 0xFF57 or 0xFF55 or 0xFF56 => true,
                0xFF51 or 0xFF52 or 0xFF53 or 0xFF54 => true,
                _ => false
            };
        }

        private static string GetLinuxKeyName(ulong keysym)
        {
            return keysym switch
            {
                >= 0xFFBE and <= 0xFFC9 => $"F{keysym - 0xFFBE + 1}",
                0xFF1B => "ESC",
                0xFF0D => "ENTER",
                0xFF09 => "TAB",
                0xFF08 => "BACKSPACE",
                0xFFFF => "DELETE",
                0x0020 => "SPACE",
                0xFF50 => "HOME",
                0xFF57 => "END",
                0xFF55 => "PGUP",
                0xFF56 => "PGDN",
                0xFF51 => "LEFT",
                0xFF52 => "UP",
                0xFF53 => "RIGHT",
                0xFF54 => "DOWN",
                >= 0x0061 and <= 0x007A => ((char)(keysym - 0x20)).ToString(),
                >= 0x0041 and <= 0x005A => ((char)keysym).ToString(),
                >= 0x0030 and <= 0x0039 => ((char)keysym).ToString(),
                _ => string.Empty
            };
        }

        public void DrawKeystrokesToFrame(byte[] frameBuffer, int width, int height)
        {
            Initialize();
            KeystrokeHudRasterizer.RenderHud(frameBuffer, width, height);
        }

        public void Dispose()
        {
            _isInitialized = false;
        }
    }
}