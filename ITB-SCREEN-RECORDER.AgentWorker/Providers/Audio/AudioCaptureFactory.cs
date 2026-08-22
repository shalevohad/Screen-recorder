using System;
using ITB_SCREEN_RECORDER.Core.Common;

namespace ITBRecorderAgent.Providers.Audio
{
    public static class AudioCaptureFactory
    {
        public static IAudioCaptureProvider Create()
        {
            #if WINDOWS
            if (OperatingSystem.IsWindows())
            {
                return new WasapiDualMixer();
            }
            #endif

            if (OperatingSystem.IsLinux())
            {
                return new LinuxPulseAudioMixer();
            }

            Logger.Warn("[AUDIO] Unsupported OS for native audio capture. Using Silent Audio Provider.");
            return new SilentAudioProvider();
        }
    }
}