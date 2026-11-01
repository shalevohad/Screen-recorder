using System;

namespace ITB_SCREEN_RECORDER.Player.Core.Synchronization;

/// <summary>
/// Central presentation clock controlling playback state, speed, seeking, and frame-stepping.
/// </summary>
public interface IMasterPlaybackClock : IDisposable
{
    PlaybackState State { get; }
    TimeSpan CurrentTime { get; }
    TimeSpan Duration { get; }
    double PlaybackRate { get; set; }
    DateTime CurrentUtc { get; }
    IGapSkipNavigator? GapNavigator { get; }

    void Play();
    void Pause();
    void Stop();
    void Seek(TimeSpan targetTime);
    void StepFrame(int frameCount = 1, double fps = 30.0);
    void SetDuration(TimeSpan duration);

    event Action<TimeSpan>? TimeUpdated;
    event Action<PlaybackState>? StateChanged;
    event Action<double>? PlaybackRateChanged;
}
