using System;
using System.Collections.Generic;

namespace ITB_SCREEN_RECORDER.Player.Core.Audio;

public interface IForensicAudioMixer
{
    IReadOnlyList<StationAudioSettings> Stations { get; }
    double MasterVolume { get; set; }
    bool IsMasterMuted { get; set; }

    void RegisterStation(string stationId, string hostname);
    void UnregisterStation(string stationId);
    StationAudioSettings? GetSettings(string stationId);

    void SetVolume(string stationId, double volume);
    void SetPan(string stationId, double pan);
    void SetMute(string stationId, bool isMuted);
    void SetSolo(string stationId, bool isSolo);
    void SetChannelMode(string stationId, AudioChannelMode mode);
    void SetEchoNeutralization(string stationId, bool enabled);

    void ProcessAudioFrame(
        string stationId,
        ReadOnlySpan<float> ch0Loopback,
        ReadOnlySpan<float> ch1Microphone,
        Span<float> outputLeft,
        Span<float> outputRight);

    void UpdateSpeechEnergyAndDucking(DateTime nowUtc);

    event Action<string, StationAudioSettings>? SettingsChanged;
}
