using System;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace ITB_SCREEN_RECORDER.Player.Core.Synchronization;

/// <summary>
/// Monitors multi-camera presentation drift against the MasterPlaybackClock and triggers corrective recalibrations.
/// </summary>
public sealed class StreamDriftTracker : IStreamDriftTracker
{
    private readonly IMasterPlaybackClock _masterClock;
    private readonly ConcurrentDictionary<string, TimeSpan> _latestTrackPositions = new(StringComparer.OrdinalIgnoreCase);
    private readonly ConcurrentDictionary<string, TimeSpan> _currentDrifts = new(StringComparer.OrdinalIgnoreCase);

    public double DriftToleranceMs { get; set; } = 50.0; // 50ms default tolerance
    public double HardSeekThresholdMs { get; set; } = 350.0; // Over 350ms triggers hard seek

    public event Action<TrackDriftReport>? DriftDetected;

    public StreamDriftTracker(IMasterPlaybackClock masterClock, double driftToleranceMs = 50.0)
    {
        _masterClock = masterClock ?? throw new ArgumentNullException(nameof(masterClock));
        DriftToleranceMs = driftToleranceMs;
    }

    public void ReportTrackTime(string trackId, TimeSpan trackPts)
    {
        if (string.IsNullOrWhiteSpace(trackId)) return;

        _latestTrackPositions[trackId] = trackPts;
        TimeSpan masterTime = _masterClock.CurrentTime;
        TimeSpan drift = trackPts - masterTime;
        _currentDrifts[trackId] = drift;

        double absDriftMs = Math.Abs(drift.TotalMilliseconds);
        if (absDriftMs > DriftToleranceMs)
        {
            var action = absDriftMs >= HardSeekThresholdMs
                ? DriftCorrectionAction.HardSeek
                : DriftCorrectionAction.MicroRateAdjustment;

            var report = new TrackDriftReport(trackId, masterTime, trackPts, drift, action);
            DriftDetected?.Invoke(report);
        }
    }

    public void RemoveTrack(string trackId)
    {
        if (string.IsNullOrWhiteSpace(trackId)) return;
        _latestTrackPositions.TryRemove(trackId, out _);
        _currentDrifts.TryRemove(trackId, out _);
    }

    public bool IsTrackInSync(string trackId)
    {
        if (string.IsNullOrWhiteSpace(trackId)) return false;
        if (_currentDrifts.TryGetValue(trackId, out var drift))
        {
            return Math.Abs(drift.TotalMilliseconds) <= DriftToleranceMs;
        }
        return false;
    }

    public TimeSpan? GetTrackDrift(string trackId)
    {
        if (string.IsNullOrWhiteSpace(trackId)) return null;
        if (_currentDrifts.TryGetValue(trackId, out var drift))
        {
            return drift;
        }
        return null;
    }

    public IReadOnlyDictionary<string, TimeSpan> GetAllDrifts()
    {
        return new Dictionary<string, TimeSpan>(_currentDrifts);
    }
}
