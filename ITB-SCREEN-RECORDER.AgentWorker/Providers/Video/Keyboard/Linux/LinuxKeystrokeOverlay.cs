using System;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using ITB_SCREEN_RECORDER.Core.Common;
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
        private volatile bool _isFeatureEnabled = true;
        private bool _warnedUnavailable = false;

        private static bool _ctrlDown;
        private static bool _altDown;
        private static bool _shiftDown;
        private static bool _superDown;

        public void Initialize()
        {
            if (_isInitialized || !_isFeatureEnabled) return;

            try
            {
                string? displayName = Environment.GetEnvironmentVariable("DISPLAY") ?? ":0.0";
                IntPtr testDpy = XOpenDisplay(displayName);
                if (testDpy == IntPtr.Zero)
                {
                    DisableFeature("No active graphical session ($DISPLAY is invalid).");
                    return;
                }
                XCloseDisplay(testDpy);

                _thread = new Thread(ListenLoop)
                {
                    IsBackground = true,
                    Name = "ITB_LinuxKeyboardHook"
                };
                _thread.Start();
                _isInitialized = true;
            }
            catch (DllNotFoundException ex)
            {
                DisableFeature($"Missing library: '{ex.Message}'. Please install packages: 'sudo apt install libx11-6 libxtst6'.");
            }
            catch (Exception ex)
            {
                DisableFeature($"Initialization failed: {ex.Message}");
            }
        }

        private void DisableFeature(string reason)
        {
            _isFeatureEnabled = false;
            _isInitialized = true;

            if (!_warnedUnavailable)
            {
                _warnedUnavailable = true;
                Logger.Warn($"[OVERLAY:KEYSTROKE] Linux keystroke overlay gracefully disabled: {reason} Screen recording continues uninterrupted.");
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
                                        byte eventType = Marshal.ReadByte(dataPtr, 0);
                                        byte keycode = Marshal.ReadByte(dataPtr, 1);
                                        ulong keysym = XKeycodeToKeysym(dpy, keycode, 0);

                                        HandleKeyEvent(eventType, keysym);
                                    }
                                }
                            }
                            catch { }
                        };

                        XRecordEnableContext(dpy, context, callback, IntPtr.Zero);
                        XRecordFreeContext(dpy, context);
                    }
                }
            }
            catch (DllNotFoundException ex)
            {
                DisableFeature($"Required library missing during execution: '{ex.Message}'. Install with: 'sudo apt install libxtst6'.");
            }
            catch (Exception ex)
            {
                DisableFeature($"Listener error: {ex.Message}");
            }
            finally
            {
                if (dpy != IntPtr.Zero)
                {
                    try { XCloseDisplay(dpy); } catch { }
                }
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
                >= 0xFFBE and <= 0xFFC9 => true,
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
            if (!_isFeatureEnabled) return;

            try
            {
                Initialize();
                if (!_isFeatureEnabled) return;
                KeystrokeHudRasterizer.RenderHud(frameBuffer, width, height);
            }
            catch (Exception ex)
            {
                DisableFeature(ex.Message);
            }
        }

        public void Dispose()
        {
            _isFeatureEnabled = false;
        }
    }
}