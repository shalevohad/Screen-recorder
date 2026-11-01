using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;

namespace ITB_SCREEN_RECORDER.Player.Core.Audio;

/// <summary>
/// High-fidelity audio mixer supporting multi-station simultaneous playback,
/// discrete 2-channel routing, spatial panning, solo/mute governance, and auto-ducking echo neutralization.
/// </summary>
public sealed class PlayerAudioMixer : IPlayerAudioMixer
{
    private readonly object _sync = new();
    private readonly Dictionary<string, StationAudioSettings> _stations = new(StringComparer.OrdinalIgnoreCase);
    private readonly VoiceActivityCrossDucker _crossDucker = new();
    private readonly ConcurrentDictionary<string, float> _latestMicPeaks = new(StringComparer.OrdinalIgnoreCase);

    private double _masterVolume = 1.0;
    private bool _isMasterMuted = false;

    public IReadOnlyList<StationAudioSettings> Stations
    {
        get
        {
            lock (_sync)
            {
                return _stations.Values.ToList();
            }
        }
    }

    public double MasterVolume
    {
        get => _masterVolume;
        set => _masterVolume = Math.Clamp(value, 0.0, 1.0);
    }

    public bool IsMasterMuted
    {
        get => _isMasterMuted;
        set => _isMasterMuted = value;
    }

    public event Action<string, StationAudioSettings>? SettingsChanged;

    public void RegisterStation(string stationId, string hostname)
    {
        if (string.IsNullOrWhiteSpace(stationId)) return;

        StationAudioSettings settings;
        lock (_sync)
        {
            if (!_stations.TryGetValue(stationId, out settings!))
            {
                settings = new StationAudioSettings
                {
                    StationId = stationId,
                    Hostname = hostname
                };
                _stations[stationId] = settings;
            }
        }

        SettingsChanged?.Invoke(stationId, settings);
    }

    public void UnregisterStation(string stationId)
    {
        if (string.IsNullOrWhiteSpace(stationId)) return;
        lock (_sync)
        {
            _stations.Remove(stationId);
        }
        _latestMicPeaks.TryRemove(stationId, out _);
    }

    public StationAudioSettings? GetSettings(string stationId)
    {
        if (string.IsNullOrWhiteSpace(stationId)) return null;
        lock (_sync)
        {
            return _stations.TryGetValue(stationId, out var s) ? s : null;
        }
    }

    public void SetVolume(string stationId, double volume)
    {
        StationAudioSettings? s = null;
        lock (_sync)
        {
            if (_stations.TryGetValue(stationId, out s))
            {
                s.Volume = Math.Clamp(volume, 0.0, 1.0);
            }
        }
        if (s != null) SettingsChanged?.Invoke(stationId, s);
    }

    public void SetPan(string stationId, double pan)
    {
        StationAudioSettings? s = null;
        lock (_sync)
        {
            if (_stations.TryGetValue(stationId, out s))
            {
                s.Pan = Math.Clamp(pan, -1.0, 1.0);
            }
        }
        if (s != null) SettingsChanged?.Invoke(stationId, s);
    }

    public void SetMute(string stationId, bool isMuted)
    {
        StationAudioSettings? s = null;
        lock (_sync)
        {
            if (_stations.TryGetValue(stationId, out s))
            {
                s.IsMuted = isMuted;
            }
        }
        if (s != null) SettingsChanged?.Invoke(stationId, s);
    }

    public void SetSolo(string stationId, bool isSolo)
    {
        StationAudioSettings? s = null;
        lock (_sync)
        {
            if (_stations.TryGetValue(stationId, out s))
            {
                s.IsSolo = isSolo;
            }
        }
        if (s != null) SettingsChanged?.Invoke(stationId, s);
    }

    public void SetChannelMode(string stationId, AudioChannelMode mode)
    {
        StationAudioSettings? s = null;
        lock (_sync)
        {
            if (_stations.TryGetValue(stationId, out s))
            {
                s.ChannelMode = mode;
            }
        }
        if (s != null) SettingsChanged?.Invoke(stationId, s);
    }

    public void SetEchoNeutralization(string stationId, bool enabled)
    {
        StationAudioSettings? s = null;
        lock (_sync)
        {
            if (_stations.TryGetValue(stationId, out s))
            {
                s.EnableEchoNeutralization = enabled;
            }
        }
        if (s != null) SettingsChanged?.Invoke(stationId, s);
    }

    public void UpdateSpeechEnergyAndDucking(DateTime nowUtc)
    {
        lock (_sync)
        {
            _crossDucker.ProcessDucking(_latestMicPeaks, _stations.Values, nowUtc);
        }
    }

    public void ProcessAudioFrame(
        string stationId,
        ReadOnlySpan<float> ch0Loopback,
        ReadOnlySpan<float> ch1Microphone,
        Span<float> outputLeft,
        Span<float> outputRight)
    {
        StationAudioSettings? s;
        bool anySolo;

        lock (_sync)
        {
            if (!_stations.TryGetValue(stationId, out s))
            {
                return;
            }
            anySolo = _stations.Values.Any(st => st.IsSolo);
        }

        // Measure input peaks for telemetry & VAD
        float ch0Peak = CalculatePeak(ch0Loopback);
        float ch1Peak = CalculatePeak(ch1Microphone);
        s.LoopbackPeakLevel = ch0Peak;
        s.MicrophonePeakLevel = ch1Peak;
        _latestMicPeaks[stationId] = ch1Peak;

        // Determine if station is audible
        if (_isMasterMuted || s.IsMuted || (anySolo && !s.IsSolo))
        {
            return;
        }

        // Calculate gains
        float stationMasterGain = (float)(s.Volume * _masterVolume);
        if (stationMasterGain <= 0.0001f) return;

        float ch0DuckedGain = s.IsDucked ? s.DuckingGain : 1.0f;

        CalculatePanning(s.Pan, out float panLeft, out float panRight);

        float ch0L, ch0R, ch1L, ch1R;

        switch (s.ChannelMode)
        {
            case AudioChannelMode.Both:
                ch0L = stationMasterGain * ch0DuckedGain * panLeft;
                ch0R = stationMasterGain * ch0DuckedGain * panRight;
                ch1L = stationMasterGain * panLeft;
                ch1R = stationMasterGain * panRight;
                break;

            case AudioChannelMode.SystemOnly:
                ch0L = stationMasterGain * ch0DuckedGain * panLeft;
                ch0R = stationMasterGain * ch0DuckedGain * panRight;
                ch1L = 0f;
                ch1R = 0f;
                break;

            case AudioChannelMode.MicrophoneOnly:
                ch0L = 0f;
                ch0R = 0f;
                ch1L = stationMasterGain * panLeft;
                ch1R = stationMasterGain * panRight;
                break;

            case AudioChannelMode.StereoSplit:
                // Hard Ch0 Left, Hard Ch1 Right
                ch0L = stationMasterGain * ch0DuckedGain;
                ch0R = 0f;
                ch1L = 0f;
                ch1R = stationMasterGain;
                break;

            default:
                ch0L = stationMasterGain * ch0DuckedGain * panLeft;
                ch0R = stationMasterGain * ch0DuckedGain * panRight;
                ch1L = stationMasterGain * panLeft;
                ch1R = stationMasterGain * panRight;
                break;
        }

        int sampleCount = Math.Min(ch0Loopback.Length, Math.Min(ch1Microphone.Length, Math.Min(outputLeft.Length, outputRight.Length)));

        for (int i = 0; i < sampleCount; i++)
        {
            float s0 = ch0Loopback[i];
            float s1 = ch1Microphone[i];

            outputLeft[i] += (s0 * ch0L) + (s1 * ch1L);
            outputRight[i] += (s0 * ch0R) + (s1 * ch1R);
        }
    }

    private static float CalculatePeak(ReadOnlySpan<float> samples)
    {
        float peak = 0f;
        for (int i = 0; i < samples.Length; i++)
        {
            float abs = Math.Abs(samples[i]);
            if (abs > peak) peak = abs;
        }
        return peak;
    }

    private static void CalculatePanning(double pan, out float left, out float right)
    {
        if (pan <= 0.0)
        {
            left = 1.0f;
            right = (float)(1.0 + pan);
        }
        else
        {
            left = (float)(1.0 - pan);
            right = 1.0f;
        }
    }
}
