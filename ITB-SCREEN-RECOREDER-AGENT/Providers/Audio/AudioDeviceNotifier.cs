using NAudio.CoreAudioApi;
using NAudio.CoreAudioApi.Interfaces;
using System;
using System.Runtime.Versioning;

namespace ITBRecorderAgent.Providers.Audio
{
    [SupportedOSPlatform("windows")]
    public class AudioDeviceNotifier : IMMNotificationClient
    {
        public event Action? DeviceChanged;

        public void OnDefaultDeviceChanged(DataFlow flow, Role role, string defaultDeviceId)
        {
            if (role == Role.Multimedia || role == Role.Console)
            {
                DeviceChanged?.Invoke();
            }
        }

        public void OnDeviceStateChanged(string deviceId, DeviceState newState)
        {
            DeviceChanged?.Invoke();
        }

        public void OnDeviceAdded(string pwstrDeviceId) { }
        public void OnDeviceRemoved(string deviceId) { }
        public void OnPropertyValueChanged(string pwstrDeviceId, PropertyKey key) { }
    }
}