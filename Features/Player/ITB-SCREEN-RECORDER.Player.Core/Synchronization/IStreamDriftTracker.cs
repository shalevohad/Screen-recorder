using System;
using System.Collections.Generic;

namespace ITB_SCREEN_RECORDER.Player.Core.Synchronization;

public enum DriftCorrectionAction
{
    None,
    MicroRateAdjustment,
    HardSeek
}

public sealed record TrackDriftReport(
    string TrackId,
    TimeSpan MasterTime,
    TimeSpan TrackPts,
    TimeSpan DriftDelta,
    DriftCorrectionAction RecommendedAction
);

public interface IStreamDriftTracker
{
    double DriftToleranceMs { get; set; }
    void ReportTrackTime(string trackId, TimeSpan trackPts);
    void RemoveTrack(string trackId);
    bool IsTrackInSync(string trackId);
    TimeSpan? GetTrackDrift(string trackId);
    IReadOnlyDictionary<string, TimeSpan> GetAllDrifts();

    event Action<TrackDriftReport>? DriftDetected;
}
