using System;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Runtime.Versioning;
using System.Text;
using System.Threading;
using ITBRecorderAgent.Providers.Video.Keyboard.Common;

namespace ITBRecorderAgent.Providers.Video.Keyboard.Windows
{
    [SupportedOSPlatform("windows")]
    public class WindowsKeystrokeOverlay : IKeystrokeOverlayProvider
    {
        #region Win32 Imports
        private const int WH_KEYBOARD_LL = 13;
        private const int WM_KEYDOWN = 0x0100;
        private const int WM_SYSKEYDOWN = 0x0104;

        private const int VK_SHIFT = 0x10;
        private const int VK_CONTROL = 0x11;
        private const int VK_MENU = 0x12; // Alt
        private const int VK_LWIN = 0x5B;
        private const int VK_RWIN = 0x5C;

        private delegate IntPtr LowLevelKeyboardProc(int nCode, IntPtr wParam, IntPtr lParam);

        [DllImport("user32.dll", SetLastError = true)]
        private static extern IntPtr SetWindowsHookEx(int idHook, LowLevelKeyboardProc lpfn, IntPtr hMod, uint dwThreadId);

        [DllImport("user32.dll", SetLastError = true)]
        private static extern bool UnhookWindowsHookEx(IntPtr hhk);

        [DllImport("user32.dll")]
        private static extern IntPtr CallNextHookEx(IntPtr hhk, int nCode, IntPtr wParam, IntPtr lParam);

        [DllImport("user32.dll")]
        private static extern short GetKeyState(int nVirtKey);

        [DllImport("user32.dll")]
        private static extern sbyte GetMessage(out MSG lpMsg, IntPtr hWnd, uint wMsgFilterMin, uint wMsgFilterMax);

        [DllImport("user32.dll")]
        private static extern bool TranslateMessage(ref MSG lpMsg);

        [DllImport("user32.dll")]
        private static extern IntPtr DispatchMessage(ref MSG lpMsg);

        [DllImport("user32.dll")]
        private static extern bool PostThreadMessage(uint idThread, uint msg, IntPtr wParam, IntPtr lParam);

        [DllImport("kernel32.dll")]
        private static extern uint GetCurrentThreadId();

        [StructLayout(LayoutKind.Sequential)]
        private struct MSG { public IntPtr hwnd; public uint message; public IntPtr wParam; public IntPtr lParam; public uint time; public int pt_x; public int pt_y; }
        #endregion

        private LowLevelKeyboardProc? _proc;
        private IntPtr _hookId = IntPtr.Zero;
        private Thread? _hookThread;
        private uint _hookThreadId;
        private volatile bool _isInitialized;

        public void Initialize()
        {
            if (_isInitialized) return;
            _isInitialized = true;

            _hookThread = new Thread(() =>
            {
                _hookThreadId = GetCurrentThreadId();
                _proc = HookCallback;
                _hookId = SetWindowsHookEx(WH_KEYBOARD_LL, _proc, IntPtr.Zero, 0);

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
                Name = "ITB_WinKeyboardHook"
            };

            _hookThread.SetApartmentState(ApartmentState.STA);
            _hookThread.Start();
        }

        private IntPtr HookCallback(int nCode, IntPtr wParam, IntPtr lParam)
        {
            if (nCode >= 0)
            {
                int msg = wParam.ToInt32();
                if (msg == WM_KEYDOWN || msg == WM_SYSKEYDOWN)
                {
                    int vkCode = Marshal.ReadInt32(lParam);

                    bool ctrl = (GetKeyState(VK_CONTROL) & 0x8000) != 0;
                    bool alt = (GetKeyState(VK_MENU) & 0x8000) != 0;
                    bool shift = (GetKeyState(VK_SHIFT) & 0x8000) != 0;
                    bool win = (GetKeyState(VK_LWIN) & 0x8000) != 0 || (GetKeyState(VK_RWIN) & 0x8000) != 0;

                    // מציגים קיצורים בעלי Modifiers או מקשי מערכת בלבד (למניעת חשיפת סיסמאות/הקלדה רגילה)
                    if (ctrl || alt || win || IsSpecialKey(vkCode))
                    {
                        string formatted = FormatShortcut(vkCode, ctrl, alt, shift, win);
                        if (!string.IsNullOrEmpty(formatted))
                        {
                            KeystrokeHudRasterizer.SetShortcut(formatted);
                        }
                    }
                }
            }
            return CallNextHookEx(_hookId, nCode, wParam, lParam);
        }

        private static bool IsSpecialKey(int vk)
        {
            if (vk >= 0x70 && vk <= 0x7B) return true; // F1 - F12
            if (vk is 0x1B or 0x09 or 0x0D or 0x08 or 0x2E or 0x2D or 0x24 or 0x23 or 0x21 or 0x22) return true;
            return false;
        }

        private static string FormatShortcut(int vk, bool ctrl, bool alt, bool shift, bool win)
        {
            if (vk is VK_CONTROL or 0xA2 or 0xA3 or VK_MENU or 0xA4 or 0xA5 or VK_SHIFT or 0xA0 or 0xA1 or VK_LWIN or VK_RWIN)
                return string.Empty;

            var sb = new StringBuilder(32);
            if (ctrl) sb.Append("CTRL + ");
            if (alt) sb.Append("ALT + ");
            if (win) sb.Append("WIN + ");
            if (shift) sb.Append("SHIFT + ");

            sb.Append(GetKeyName(vk));
            return sb.ToString();
        }

        private static string GetKeyName(int vk)
        {
            return vk switch
            {
                >= 0x70 and <= 0x7B => $"F{vk - 0x70 + 1}",
                0x1B => "ESC",
                0x0D => "ENTER",
                0x09 => "TAB",
                0x08 => "BACKSPACE",
                0x2E => "DELETE",
                0x20 => "SPACE",
                0x24 => "HOME",
                0x23 => "END",
                0x21 => "PGUP",
                0x22 => "PGDN",
                0x25 => "LEFT",
                0x26 => "UP",
                0x27 => "RIGHT",
                0x28 => "DOWN",
                >= 0x30 and <= 0x39 => ((char)vk).ToString(),
                >= 0x41 and <= 0x5A => ((char)vk).ToString(),
                _ => $"KEY_{vk}"
            };
        }

        public void DrawKeystrokesToFrame(byte[] frameBuffer, int width, int height)
        {
            Initialize();
            KeystrokeHudRasterizer.RenderHud(frameBuffer, width, height);
        }

        public void Dispose()
        {
            if (_hookThreadId != 0)
            {
                PostThreadMessage(_hookThreadId, 0x0012 /* WM_QUIT */, IntPtr.Zero, IntPtr.Zero);
            }
        }
    }
}