// ==========================================
// File: ITB-SCREEN-RECORDER.AgentWorker/Providers/Keyboard/IKeyboardCaptureProvider.cs
// ==========================================
using System;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;

namespace ITB_SCREEN_RECORDER.AgentWorker.Providers.Keyboard
{
    public interface IKeyboardCaptureProvider : IDisposable
    {
        /// <summary>
        /// אירוע המוצת בכל לחיצת מקש מסוננת ומכוילת מול שעון השרת
        /// </summary>
        event Action<KeystrokeEventDto>? KeystrokeCaptured;

        /// <summary>
        /// מתחיל את האזנת המקלדת ברקע
        /// </summary>
        void Start();

        /// <summary>
        /// עוצר את האזנת המקלדת ומשחרר משאבים
        /// </summary>
        void Stop();
    }
}