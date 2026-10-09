// ==========================================
// File: ITB-SCREEN-RECORDER.AgentWorker/Providers/Keyboard/LinuxKeyboardCaptureProvider.cs
// ==========================================
using System;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;

namespace ITB_SCREEN_RECORDER.AgentWorker.Providers.Keyboard
{
    public sealed class LinuxKeyboardCaptureProvider : IKeyboardCaptureProvider
    {
        private const ushort EV_KEY = 0x01;
        private const int KEY_STATE_DOWN = 1;

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

                    if (ev.Type == EV_KEY && ev.Value == KEY_STATE_DOWN)
                    {
                        string keyName = MapLinuxKeyCode(ev.Code);
                        if (!string.IsNullOrEmpty(keyName))
                        {
                            long epochMs = _getSyncedEpochMs();
                            KeystrokeCaptured?.Invoke(new KeystrokeEventDto
                            {
                                EpochMs = epochMs,
                                KeyCombination = keyName,
                                TimestampUtc = DateTimeOffset.FromUnixTimeMilliseconds(epochMs).UtcDateTime
                            });
                        }
                    }
                }
            }
            catch
            {
                // המשך שקט במקרה של חוסר הרשאות לקריאת /dev/input
            }
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

        private static string MapLinuxKeyCode(ushort code)
        {
            return code switch
            {
                1 => "Esc",
                14 => "Backspace",
                15 => "Tab",
                28 => "Enter",
                57 => "Space",
                103 => "Up",
                105 => "Left",
                106 => "Right",
                108 => "Down",
                111 => "Delete",
                >= 2 and <= 10 => (code - 1).ToString(),
                11 => "0",
                >= 16 and <= 25 => ((char)('Q' + (code - 16))).ToString(),
                >= 30 and <= 38 => ((char)('A' + (code - 30))).ToString(),
                >= 44 and <= 50 => ((char)('Z' + (code - 44))).ToString(),
                >= 59 and <= 68 => $"F{code - 58}",
                _ => $"Key({code})"
            };
        }

        public void Dispose()
        {
            Stop();
        }
    }
}