// ==========================================
// File: ITB-SCREEN-RECORDER.AgentWorker/Providers/Keyboard/IKeyboardCaptureProvider.cs
// ==========================================
using System;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;

namespace ITB_SCREEN_RECORDER.AgentWorker.Providers.Keyboard
{
    /// <summary>
    /// Contract for platform-specific low-level keyboard event hooks and telemetry providers.
    /// </summary>
    public interface IKeyboardCaptureProvider : IDisposable
    {
        /// <summary>
        /// Event fired upon each filtered and time-calibrated keystroke event.
        /// </summary>
        event Action<KeystrokeEventDto>? KeystrokeCaptured;

        /// <summary>
        /// Starts the background low-level keyboard capture hook.
        /// </summary>
        void Start();

        /// <summary>
        /// Stops the keyboard hook and releases unmanaged hook resources.
        /// </summary>
        void Stop();
    }
}