// ==========================================
// File: ITB-SCREEN-RECORDER.AgentWorker/Providers/Keyboard/KeyboardCaptureFactory.cs
// ==========================================
using System;

namespace ITB_SCREEN_RECORDER.AgentWorker.Providers.Keyboard
{
    public static class KeyboardCaptureFactory
    {
        public static IKeyboardCaptureProvider Create(Func<long> getSyncedEpochMs)
        {
#if WINDOWS
            if (OperatingSystem.IsWindows())
            {
                return new WindowsKeyboardCaptureProvider(getSyncedEpochMs);
            }
            return new NullKeyboardCaptureProvider();
#else
            if (OperatingSystem.IsLinux())
            {
                return new LinuxKeyboardCaptureProvider(getSyncedEpochMs);
            }
            return new NullKeyboardCaptureProvider();
#endif
        }
    }

    /// <summary>
    /// Fallback שקט לפלטפורמות לא נתמכות או ריצה ללא ממשק גרפי
    /// </summary>
    internal sealed class NullKeyboardCaptureProvider : IKeyboardCaptureProvider
    {
        public event Action<ITB_SCREEN_RECORDER.Core.Contracts.Keystroke.KeystrokeEventDto>? KeystrokeCaptured
        {
            add { }
            remove { }
        }

        public void Start() { }
        public void Stop() { }
        public void Dispose() { }
    }
}