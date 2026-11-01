using System;
using System.Diagnostics;
using System.Threading;

namespace ITB_SCREEN_RECORDER.Player.Core.Synchronization;

/// <summary>
/// High-resolution Master Playback Clock using Stopwatch timestamps for jitter-free multi-stream synchronization.
/// </summary>
public sealed class MasterPlaybackClock : IMasterPlaybackClock
{
    private readonly object _sync = new();
    private readonly IGapSkipNavigator? _gapNavigator;
    private readonly DateTime _baseUtc;
    private readonly Timer? _timer;

    private PlaybackState _state = PlaybackState.Stopped;
    private TimeSpan _currentTime = TimeSpan.Zero;
    private TimeSpan _duration = TimeSpan.Zero;
    private double _playbackRate = 1.0;
    private long _lastStopwatchTimestamp;
    private bool _disposed;

    public PlaybackState State
    {
        get { lock (_sync) return _state; }
    }

    public TimeSpan CurrentTime
    {
        get { lock (_sync) return _currentTime; }
    }

    public TimeSpan Duration
    {
        get { lock (_sync) return _duration; }
    }

    public double PlaybackRate
    {
        get { lock (_sync) return _playbackRate; }
        set
        {
            if (value <= 0.0) throw new ArgumentOutOfRangeException(nameof(value), "Playback rate must be positive.");
            lock (_sync)
            {
                if (Math.Abs(_playbackRate - value) > 0.001)
                {
                    _playbackRate = value;
                    _lastStopwatchTimestamp = Stopwatch.GetTimestamp();
                }
            }
            PlaybackRateChanged?.Invoke(value);
        }
    }

    public DateTime CurrentUtc
    {
        get
        {
            lock (_sync)
            {
                if (_gapNavigator != null)
                {
                    return _gapNavigator.TimelineOffsetToUtc(_currentTime);
                }
                return _baseUtc.Add(_currentTime);
            }
        }
    }

    public IGapSkipNavigator? GapNavigator => _gapNavigator;

    public event Action<TimeSpan>? TimeUpdated;
    public event Action<PlaybackState>? StateChanged;
    public event Action<double>? PlaybackRateChanged;

    public MasterPlaybackClock(
        TimeSpan initialDuration = default,
        IGapSkipNavigator? gapNavigator = null,
        DateTime? baseUtc = null,
        bool enableTimer = true)
    {
        _duration = initialDuration;
        _gapNavigator = gapNavigator;
        _baseUtc = baseUtc ?? DateTime.UtcNow;

        if (enableTimer)
        {
            // 20ms timer interval (~50 Hz) for smooth presentation clock updates
            _timer = new Timer(OnTimerTick, null, 20, 20);
        }
    }

    public void Play()
    {
        lock (_sync)
        {
            if (_state == PlaybackState.Playing) return;

            // If at the very end of stream, restart from beginning
            if (_duration > TimeSpan.Zero && _currentTime >= _duration)
            {
                _currentTime = TimeSpan.Zero;
            }

            _lastStopwatchTimestamp = Stopwatch.GetTimestamp();
            _state = PlaybackState.Playing;
        }

        StateChanged?.Invoke(PlaybackState.Playing);
    }

    public void Pause()
    {
        lock (_sync)
        {
            if (_state != PlaybackState.Playing) return;
            _state = PlaybackState.Paused;
        }

        StateChanged?.Invoke(PlaybackState.Paused);
    }

    public void Stop()
    {
        lock (_sync)
        {
            _state = PlaybackState.Stopped;
            _currentTime = TimeSpan.Zero;
        }

        StateChanged?.Invoke(PlaybackState.Stopped);
        TimeUpdated?.Invoke(TimeSpan.Zero);
    }

    public void Seek(TimeSpan targetTime)
    {
        TimeSpan clamped;
        lock (_sync)
        {
            if (targetTime < TimeSpan.Zero) clamped = TimeSpan.Zero;
            else if (_duration > TimeSpan.Zero && targetTime > _duration) clamped = _duration;
            else clamped = targetTime;

            _currentTime = clamped;
            _lastStopwatchTimestamp = Stopwatch.GetTimestamp();
        }

        TimeUpdated?.Invoke(clamped);
    }

    public void StepFrame(int frameCount = 1, double fps = 30.0)
    {
        if (fps <= 0.0) fps = 30.0;
        double frameDurationSeconds = 1.0 / fps;
        TimeSpan delta = TimeSpan.FromSeconds(frameCount * frameDurationSeconds);

        lock (_sync)
        {
            if (_state == PlaybackState.Playing)
            {
                _state = PlaybackState.Paused;
                StateChanged?.Invoke(PlaybackState.Paused);
            }

            Seek(_currentTime + delta);
        }
    }

    public void SetDuration(TimeSpan duration)
    {
        lock (_sync)
        {
            _duration = duration < TimeSpan.Zero ? TimeSpan.Zero : duration;
            if (_currentTime > _duration && _duration > TimeSpan.Zero)
            {
                _currentTime = _duration;
            }
        }
    }

    /// <summary>
    /// Explicitly advances clock by delta for deterministic unit testing.
    /// </summary>
    public void AdvanceTimeManually(TimeSpan delta)
    {
        TimeSpan newTime;
        bool shouldPause = false;

        lock (_sync)
        {
            if (_state != PlaybackState.Playing) return;

            double advancedSec = delta.TotalSeconds * _playbackRate;
            TimeSpan potential = _currentTime + TimeSpan.FromSeconds(advancedSec);

            if (_duration > TimeSpan.Zero && potential >= _duration)
            {
                _currentTime = _duration;
                _state = PlaybackState.Paused;
                shouldPause = true;
            }
            else if (potential < TimeSpan.Zero)
            {
                _currentTime = TimeSpan.Zero;
            }
            else
            {
                _currentTime = potential;
            }

            newTime = _currentTime;
        }

        TimeUpdated?.Invoke(newTime);
        if (shouldPause)
        {
            StateChanged?.Invoke(PlaybackState.Paused);
        }
    }

    private void OnTimerTick(object? state)
    {
        if (_disposed) return;

        TimeSpan newTime;
        bool shouldPause = false;

        lock (_sync)
        {
            if (_state != PlaybackState.Playing) return;

            long now = Stopwatch.GetTimestamp();
            long elapsed = now - _lastStopwatchTimestamp;
            _lastStopwatchTimestamp = now;

            double elapsedSec = (double)elapsed / Stopwatch.Frequency;
            double advancedSec = elapsedSec * _playbackRate;

            TimeSpan potential = _currentTime + TimeSpan.FromSeconds(advancedSec);
            if (_duration > TimeSpan.Zero && potential >= _duration)
            {
                _currentTime = _duration;
                _state = PlaybackState.Paused;
                shouldPause = true;
            }
            else
            {
                _currentTime = potential;
            }

            newTime = _currentTime;
        }

        TimeUpdated?.Invoke(newTime);
        if (shouldPause)
        {
            StateChanged?.Invoke(PlaybackState.Paused);
        }
    }

    public void Dispose()
    {
        if (_disposed) return;
        _disposed = true;
        _timer?.Dispose();
    }
}
