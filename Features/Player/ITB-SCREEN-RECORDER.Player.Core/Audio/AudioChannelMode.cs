namespace ITB_SCREEN_RECORDER.Player.Core.Audio;

/// <summary>
/// Channel routing modes for discrete 2-channel forensic station audio (Ch0 = Loopback, Ch1 = Mic).
/// </summary>
public enum AudioChannelMode
{
    /// <summary>
    /// Mixes both loopback and microphone equally into output.
    /// </summary>
    Both,

    /// <summary>
    /// Isolates Channel 0 (System/Intercom loopback), muting the local operator microphone.
    /// </summary>
    SystemOnly,

    /// <summary>
    /// Isolates Channel 1 (Operator microphone), muting incoming intercom / OS sounds.
    /// </summary>
    MicrophoneOnly,

    /// <summary>
    /// Routes Channel 0 hard-left and Channel 1 hard-right for forensic binaural discrimination.
    /// </summary>
    StereoSplit
}
