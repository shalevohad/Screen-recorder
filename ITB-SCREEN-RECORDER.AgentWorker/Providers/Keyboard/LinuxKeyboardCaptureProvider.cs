// ==========================================
// File: ITB-SCREEN-RECORDER.AgentWorker/Providers/Keyboard/LinuxKeyboardCaptureProvider.cs
// ==========================================
using System;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;

namespace ITB_SCREEN_RECORDER.AgentWorker.Providers.Keyboard
{
    public sealed class LinuxKeyboardCaptureProvider : IKeyboardCaptureProvider
    {
        private const ushort EV_KEY = 0x01;
        private const int KEY_STATE_UP = 0;
        private const int KEY_STATE_DOWN = 1;
        private const int KEY_STATE_REPEAT = 2;

        [StructLayout(LayoutKind.Sequential)]
        private struct InputEvent
        {
            public IntPtr TimeSec;
            public IntPtr TimeUsec;
            public ushort Type;
            public ushort Code;
            public int Value;
        }

        private readonly Func<long> _getSyncedEpochMs;
        private CancellationTokenSource? _cts;
        private Task? _readTask;

        private volatile bool _isCtrl;
        private volatile bool _isAlt;
        private volatile bool _isShift;
        private volatile bool _isWin;

        public event Action<KeystrokeEventDto>? KeystrokeCaptured;

        public LinuxKeyboardCaptureProvider(Func<long> getSyncedEpochMs)
        {
            _getSyncedEpochMs = getSyncedEpochMs ?? (() => DateTimeOffset.UtcNow.ToUnixTimeMilliseconds());
        }

        public void Start()
        {
            if (!OperatingSystem.IsLinux() || _readTask != null) return;

            _cts = new CancellationTokenSource();
            _readTask = Task.Run(() => ReadEvdevLoop(_cts.Token), _cts.Token);
        }

        public void Stop()
        {
            _cts?.Cancel();
            try { _readTask?.Wait(1000); } catch { }
            _cts?.Dispose();
            _cts = null;
            _readTask = null;
        }

        private void ReadEvdevLoop(CancellationToken ct)
        {
            string? devicePath = ResolveKeyboardDevice();
            if (string.IsNullOrEmpty(devicePath) || !File.Exists(devicePath)) return;

            try
            {
                using var stream = new FileStream(devicePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                byte[] buffer = new byte[Marshal.SizeOf<InputEvent>()];

                while (!ct.IsCancellationRequested)
                {
                    int bytesRead = stream.Read(buffer, 0, buffer.Length);
                    if (bytesRead < buffer.Length) continue;

                    var handle = GCHandle.Alloc(buffer, GCHandleType.Pinned);
                    var ev = Marshal.PtrToStructure<InputEvent>(handle.AddrOfPinnedObject());
                    handle.Free();

                    if (ev.Type != EV_KEY) continue;

                    bool isDownOrRepeat = ev.Value == KEY_STATE_DOWN || ev.Value == KEY_STATE_REPEAT;
                    bool isUp = ev.Value == KEY_STATE_UP;

                    // Continuously track modifier key states (left and right) on Linux
                    switch (ev.Code)
                    {
                        case 29 or 97: // KEY_LEFTCTRL, KEY_RIGHTCTRL
                            _isCtrl = !isUp;
                            continue;
                        case 56 or 100: // KEY_LEFTALT, KEY_RIGHTALT
                            _isAlt = !isUp;
                            continue;
                        case 42 or 54: // KEY_LEFTSHIFT, KEY_RIGHTSHIFT
                            _isShift = !isUp;
                            continue;
                        case 125 or 126: // KEY_LEFTMETA, KEY_RIGHTMETA (Super / Win)
                            _isWin = !isUp;
                            continue;
                        case 58: // KEY_CAPSLOCK
                            continue;
                    }

                    if (isDownOrRepeat)
                    {
                        string? formattedCombo = FormatLinuxKeyStroke(ev.Code);
                        if (!string.IsNullOrEmpty(formattedCombo))
                        {
                            long epochMs = _getSyncedEpochMs();
                            KeystrokeCaptured?.Invoke(new KeystrokeEventDto
                            {
                                EpochMs = epochMs,
                                KeyCombination = formattedCombo,
                                TimestampUtc = DateTimeOffset.FromUnixTimeMilliseconds(epochMs).UtcDateTime
                            });
                        }
                    }
                }
            }
            catch
            {
                // Silently swallow errors when lacking permissions to read /dev/input (non-root execution)
            }
        }

        /// <summary>
        /// Translates a Linux evdev key code into a formatted key combination string or redacts it for privacy.
        /// </summary>
        /// <param name="code">The raw Linux input event key code.</param>
        /// <returns>Formatted key string (e.g., "Ctrl+C"), "*" for redacted alphanumeric keys, or null if ignored.</returns>
        private string? FormatLinuxKeyStroke(ushort code)
        {
            bool isControlModifier = _isCtrl || _isAlt || _isWin;

            // Privacy protection (identical to Windows implementation):
            // When user types freeform text or passwords without control modifiers (Ctrl/Alt/Win),
            // the key is masked to '*' to prevent harvesting sensitive credentials or text.
            if (!isControlModifier)
            {
                bool isPrintable = code switch
                {
                    57 => true, // Space
                    >= 2 and <= 11 => true, // 1-9, 0
                    >= 16 and <= 25 => true, // Q..P
                    >= 30 and <= 38 => true, // A..L
                    >= 44 and <= 50 => true, // Z..M
                    >= 71 and <= 83 => true, // Numpad digits & ops
                    12 or 13 or 26 or 27 or 39 or 40 or 41 or 43 or 51 or 52 or 53 => true, // Punctuation: -, =, [, ], ;, ', `, \, ,, ., /
                    _ => false
                };

                if (isPrintable)
                {
                    return "*";
                }
            }

            string keyText = code switch
            {
                1 => "Esc",
                14 => "Backspace",
                15 => "Tab",
                28 or 96 => "Enter",
                57 => "Space",
                102 => "Home",
                103 => "Up",
                104 => "PageUp",
                105 => "Left",
                106 => "Right",
                107 => "End",
                108 => "Down",
                109 => "PageDown",
                110 => "Insert",
                111 => "Delete",
                99 => "PrintScreen",
                119 => "Pause",
                >= 2 and <= 10 => (code - 1).ToString(),
                11 => "0",
                >= 16 and <= 25 => ((char)('Q' + (code - 16))).ToString(),
                >= 30 and <= 38 => ((char)('A' + (code - 30))).ToString(),
                >= 44 and <= 50 => ((char)('Z' + (code - 44))).ToString(),
                >= 59 and <= 68 => $"F{code - 58}",
                87 => "F11",
                88 => "F12",
                12 => "-",
                13 => "=",
                26 => "[",
                27 => "]",
                39 => ";",
                40 => "'",
                41 => "`",
                43 => "\\",
                51 => ",",
                52 => ".",
                53 => "/",
                55 => "Num *",
                74 => "Num -",
                78 => "Num +",
                98 => "Num /",
                >= 79 and <= 81 => $"Num {code - 78}", // Num 1..3
                >= 75 and <= 77 => $"Num {code - 71}", // Num 4..6
                >= 71 and <= 73 => $"Num {code - 64}", // Num 7..9
                82 => "Num 0",
                83 => "Num .",
                _ => $"Key({code})"
            };

            var sb = new StringBuilder();
            if (_isCtrl && keyText != "Ctrl") sb.Append("Ctrl+");
            if (_isAlt && keyText != "Alt") sb.Append("Alt+");
            if (_isShift && keyText != "Shift" && isControlModifier) sb.Append("Shift+");
            if (_isWin && keyText != "Win") sb.Append("Win+");

            sb.Append(keyText);
            return sb.ToString();
        }

        private static string? ResolveKeyboardDevice()
        {
            try
            {
                const string byPath = "/dev/input/by-path";
                if (Directory.Exists(byPath))
                {
                    var kbd = Directory.GetFiles(byPath).FirstOrDefault(f => f.Contains("kbd", StringComparison.OrdinalIgnoreCase));
                    if (!string.IsNullOrEmpty(kbd)) return kbd;
                }
            }
            catch { }
            return null;
        }

        public void Dispose()
        {
            Stop();
        }
    }
}