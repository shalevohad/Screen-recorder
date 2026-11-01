using System;

namespace ITB_SCREEN_RECORDER.Player.Core.Audio;

/// <summary>
/// Per-station audio mixer settings including volume, pan, solo, mute, channel routing, and echo suppression.
/// </summary>
public sealed class StationAudioSettings
{
    public string StationId { get; set; } = string.Empty;
    public string Hostname { get; set; } = string.Empty;
    public double Volume { get; set; } = 1.0; // 0.0 to 1.0
    public double Pan { get; set; } = 0.0;    // -1.0 (Hard Left) to +1.0 (Hard Right)
    public bool IsMuted { get; set; } = false;
    public bool IsSolo { get; set; } = false;
    public AudioChannelMode ChannelMode { get; set; } = AudioChannelMode.Both;
    public bool EnableEchoNeutralization { get; set; } = true;

    // Real-time telemetry indicators (0.0 to 1.0 linear amplitude)
    public float LoopbackPeakLevel { get; set; } = 0.0f;
    public float MicrophonePeakLevel { get; set; } = 0.0f;
    public bool IsMicActive { get; set; } = false;
    public bool IsDucked { get; set; } = false;
    public float DuckingGain { get; set; } = 1.0f; // 1.0 = 0dB, ~0.158 = -16dB
}
