using System;

namespace ITBRecorderAgent.Providers.Audio
{
    public static class AudioCaptureFactory
    {
        public static IAudioCaptureProvider Create()
        {
            if (OperatingSystem.IsWindows())
            {
                return new WasapiDualMixer();
            }

            if (OperatingSystem.IsLinux())
            {
                return new LinuxPulseAudioMixer();
            }

            Logger.Warn("[AUDIO] Unsupported OS for native audio capture. Using Silent Audio Provider.");
            return new SilentAudioProvider();
        }
    }
}