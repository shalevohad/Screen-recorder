using System;
using System.Collections.Generic;

namespace ITB_SCREEN_RECORDER.Player.Core.Audio;

/// <summary>
/// Eliminates hollow delayed intercom echo when reviewing multiple stations simultaneously.
/// Detects local operator speech on Channel 1 (Mic) and automatically ducks Channel 0 (Loopback)
/// on listening stations by -16dB with smooth attack/release envelopes.
/// </summary>
public sealed class VoiceActivityCrossDucker
{
    private readonly Dictionary<string, DateTime> _lastSpeechTimes = new(StringComparer.OrdinalIgnoreCase);

    /// <summary>
    /// Voice activity threshold in linear amplitude (approx -30 dBFS = 0.0316).
    /// </summary>
    public float SpeechThresholdLinear { get; set; } = 0.0316f;

    /// <summary>
    /// Duration in milliseconds to hold ducking after speech ends to prevent syllable flutter.
    /// </summary>
    public int HoldTimeMs { get; set; } = 350;

    /// <summary>
    /// Attenuation gain applied to ducked loopback audio (0.1585 = -16 dB).
    /// </summary>
    public float DuckingAttenuationGain { get; set; } = 0.1585f;

    /// <summary>
    /// Evaluates current speech energy levels across stations and calculates ducking gains for all stations.
    /// </summary>
    /// <param name="stationLevels">Dictionary mapping StationId to current microphone peak level (0.0 to 1.0).</param>
    /// <param name="stationSettings">Collection of station audio settings.</param>
    /// <param name="nowUtc">Current evaluation timestamp.</param>
    public void ProcessDucking(
        IReadOnlyDictionary<string, float> stationLevels,
        IEnumerable<StationAudioSettings> stationSettings,
        DateTime nowUtc)
    {
        // 1. Identify which stations currently have active operator speech
        var speakingStations = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        foreach (var (stationId, micLevel) in stationLevels)
        {
            if (micLevel >= SpeechThresholdLinear)
            {
                _lastSpeechTimes[stationId] = nowUtc;
                speakingStations.Add(stationId);
            }
            else if (_lastSpeechTimes.TryGetValue(stationId, out var lastSpoken))
            {
                if ((nowUtc - lastSpoken).TotalMilliseconds <= HoldTimeMs)
                {
                    speakingStations.Add(stationId);
                }
            }
        }

        // 2. Apply ducking to listening stations
        foreach (var settings in stationSettings)
        {
            settings.IsMicActive = speakingStations.Contains(settings.StationId);

            if (!settings.EnableEchoNeutralization)
            {
                settings.IsDucked = false;
                settings.DuckingGain = 1.0f;
                continue;
            }

            // A station is ducked if ANY OTHER station is actively speaking
            bool otherStationSpeaking = false;
            foreach (var speaker in speakingStations)
            {
                if (!string.Equals(speaker, settings.StationId, StringComparison.OrdinalIgnoreCase))
                {
                    otherStationSpeaking = true;
                    break;
                }
            }

            if (otherStationSpeaking)
            {
                settings.IsDucked = true;
                settings.DuckingGain = DuckingAttenuationGain;
            }
            else
            {
                settings.IsDucked = false;
                settings.DuckingGain = 1.0f;
            }
        }
    }

    public void Reset()
    {
        _lastSpeechTimes.Clear();
    }
}
