// ==========================================
// File: ITB-SCREEN-RECORDER.AgentWorker/Providers/Keyboard/WindowsKeyboardCaptureProvider.cs
// ==========================================
#if WINDOWS
using System;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;

namespace ITB_SCREEN_RECORDER.AgentWorker.Providers.Keyboard
{
    public sealed class WindowsKeyboardCaptureProvider : IKeyboardCaptureProvider
    {
        private const int WH_KEYBOARD_LL = 13;
        private const int WM_KEYDOWN = 0x0100;
        private const int WM_SYSKEYDOWN = 0x0104;

        private const int VK_SHIFT = 0x10;
        private const int VK_CONTROL = 0x11;
        private const int VK_MENU = 0x12; // Alt
        private const int VK_LWIN = 0x5B;
        private const int VK_RWIN = 0x5C;

        private delegate IntPtr LowLevelKeyboardProc(int nCode, IntPtr wParam, IntPtr lParam);

        [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        private static extern IntPtr SetWindowsHookEx(int idHook, LowLevelKeyboardProc lpfn, IntPtr hMod, uint dwThreadId);

        [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        [return: MarshalAs(UnmanagedType.Bool)]
        private static extern bool UnhookWindowsHookEx(IntPtr hhk);

        [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        private static extern IntPtr CallNextHookEx(IntPtr hhk, int nCode, IntPtr wParam, IntPtr lParam);

        [DllImport("kernel32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        private static extern IntPtr GetModuleHandle(string lpModuleName);

        [DllImport("user32.dll")]
        private static extern short GetAsyncKeyState(int vKey);

        [DllImport("user32.dll")]
        private static extern int GetMessage(out MSG lpMsg, IntPtr hWnd, uint wMsgFilterMin, uint wMsgFilterMax);

        [DllImport("user32.dll")]
        private static extern bool TranslateMessage([In] ref MSG lpMsg);

        [DllImport("user32.dll")]
        private static extern IntPtr DispatchMessage([In] ref MSG lpMsg);

        [DllImport("user32.dll")]
        private static extern bool PostThreadMessage(uint idThread, uint msg, IntPtr wParam, IntPtr lParam);

        [StructLayout(LayoutKind.Sequential)]
        private struct MSG
        {
            public IntPtr hwnd;
            public uint message;
            public IntPtr wParam;
            public IntPtr lParam;
            public uint time;
            public int pt_x;
            public int pt_y;
        }

        private readonly LowLevelKeyboardProc _proc;
        private IntPtr _hookId = IntPtr.Zero;
        private Thread? _hookThread;
        private uint _hookThreadId;
        private readonly Func<long> _getSyncedEpochMs;

        public event Action<KeystrokeEventDto>? KeystrokeCaptured;

        public WindowsKeyboardCaptureProvider(Func<long> getSyncedEpochMs)
        {
            _getSyncedEpochMs = getSyncedEpochMs ?? (() => DateTimeOffset.UtcNow.ToUnixTimeMilliseconds());
            _proc = HookCallback;
        }

        public void Start()
        {
            if (!OperatingSystem.IsWindows() || _hookThread != null) return;

            using var readyEvent = new ManualResetEventSlim(false);

            _hookThread = new Thread(() =>
            {
                [DllImport("kernel32.dll")]
                static extern uint GetCurrentThreadId();

                _hookThreadId = GetCurrentThreadId();

                using var curProcess = Process.GetCurrentProcess();
                using var curModule = curProcess.MainModule;
                IntPtr hMod = GetModuleHandle(curModule?.ModuleName ?? "");

                _hookId = SetWindowsHookEx(WH_KEYBOARD_LL, _proc, hMod, 0);
                readyEvent.Set();

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
                Name = "WindowsKeyboardHookThread"
            };

            _hookThread.SetApartmentState(ApartmentState.STA);
            _hookThread.Start();
            readyEvent.Wait(2000);
        }

        public void Stop()
        {
            if (_hookThreadId != 0)
            {
                PostThreadMessage(_hookThreadId, 0x0012 /* WM_QUIT */, IntPtr.Zero, IntPtr.Zero);
                _hookThread?.Join(1000);
                _hookThread = null;
                _hookThreadId = 0;
            }
        }

        private IntPtr HookCallback(int nCode, IntPtr wParam, IntPtr lParam)
        {
            if (nCode >= 0 && (wParam == (IntPtr)WM_KEYDOWN || wParam == (IntPtr)WM_SYSKEYDOWN))
            {
                int vkCode = Marshal.ReadInt32(lParam);

                // סינון מקיף לכל מקשי ה-Modifiers (כלליים, שמאל וימין) למניעת רעשי Key(162) וכד'
                bool isModifierKey = vkCode switch
                {
                    0x10 or 0xA0 or 0xA1 => true, // Shift, LShift, RShift
                    0x11 or 0xA2 or 0xA3 => true, // Ctrl, LControl (162), RControl (163)
                    0x12 or 0xA4 or 0xA5 => true, // Alt, LAlt (164), RAlt (165)
                    0x5B or 0x5C => true, // LWin, RWin
                    0x14 => true, // CapsLock
                    _ => false
                };

                if (!isModifierKey)
                {
                    string keyCombo = FormatKeyStroke(vkCode);
                    if (!string.IsNullOrEmpty(keyCombo))
                    {
                        long epochMs = _getSyncedEpochMs();
                        KeystrokeCaptured?.Invoke(new KeystrokeEventDto
                        {
                            EpochMs = epochMs,
                            KeyCombination = keyCombo,
                            TimestampUtc = DateTimeOffset.FromUnixTimeMilliseconds(epochMs).UtcDateTime
                        });
                    }
                }
            }

            return CallNextHookEx(_hookId, nCode, wParam, lParam);
        }

        private static string FormatKeyStroke(int vkCode)
        {
            string keyText = vkCode switch
            {
                0x08 => "Backspace",
                0x09 => "Tab",
                0x0D => "Enter",
                0x1B => "Esc",
                0x20 => "Space",
                0x21 => "PageUp",
                0x22 => "PageDown",
                0x23 => "End",
                0x24 => "Home",
                0x25 => "Left",
                0x26 => "Up",
                0x27 => "Right",
                0x28 => "Down",
                0x2C => "PrintScreen",
                0x2D => "Insert",
                0x2E => "Delete",
                0x13 => "Pause",
                0x14 => "CapsLock",
                0x90 => "NumLock",
                0x91 => "ScrollLock",
                >= 0x30 and <= 0x39 => ((char)vkCode).ToString(),
                >= 0x41 and <= 0x5A => ((char)vkCode).ToString(),
                >= 0x60 and <= 0x69 => $"Num {vkCode - 0x60}",
                0x6A => "Num *",
                0x6B => "Num +",
                0x6D => "Num -",
                0x6E => "Num .",
                0x6F => "Num /",
                >= 0x70 and <= 0x87 => $"F{vkCode - 0x6F}",
                0x10 or 0xA0 => "Shift",
                0xA1 => "RShift",
                0x11 or 0xA2 => "Ctrl",
                0xA3 => "RCtrl",
                0x12 or 0xA4 => "Alt",
                0xA5 => "RAlt",
                0x5B or 0x5C => "Win",
                0xBA => ";",
                0xBB => "=",
                0xBC => ",",
                0xBD => "-",
                0xBE => ".",
                0xBF => "/",
                0xC0 => "`",
                0xDB => "[",
                0xDC => "\\",
                0xDD => "]",
                0xDE => "'",
                0xE2 => "\\",
                _ => $"Key({vkCode})"
            };

            bool isCtrl = (GetAsyncKeyState(VK_CONTROL) & 0x8000) != 0;
            bool isAlt = (GetAsyncKeyState(VK_MENU) & 0x8000) != 0;
            bool isShift = (GetAsyncKeyState(VK_SHIFT) & 0x8000) != 0;
            bool isWin = ((GetAsyncKeyState(VK_LWIN) & 0x8000) != 0) || ((GetAsyncKeyState(VK_RWIN) & 0x8000) != 0);

            var sb = new StringBuilder();
            if (isCtrl && keyText != "Ctrl" && keyText != "RCtrl") sb.Append("Ctrl+");
            if (isAlt && keyText != "Alt" && keyText != "RAlt") sb.Append("Alt+");
            if (isShift && keyText != "Shift" && keyText != "RShift") sb.Append("Shift+");
            if (isWin && keyText != "Win" && keyText != "RWin") sb.Append("Win+");

            sb.Append(keyText);
            return sb.ToString();
        }

        public void Dispose()
        {
            Stop();
        }
    }
}
#endif