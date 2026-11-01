using System;
using System.Collections.Generic;
using ITB_SCREEN_RECORDER.Player.Core.Ingestion;

namespace ITB_SCREEN_RECORDER.Player.Core.Synchronization;

/// <summary>
/// Manages mapping between wall-clock UTC time and exported timeline time,
/// and detects global / station-specific gaps for seamless navigation and UI indicators.
/// </summary>
public interface IGapSkipNavigator
{
    /// <summary>
    /// Converts an offset in the exported continuous timeline to wall-clock UTC time.
    /// </summary>
    DateTime TimelineOffsetToUtc(TimeSpan timelineOffset);

    /// <summary>
    /// Converts a wall-clock UTC time to the corresponding exported timeline offset.
    /// If the UTC time falls inside a removed global gap, it snaps to the nearest boundary.
    /// </summary>
    TimeSpan UtcToTimelineOffset(DateTime utcTime, out bool fellInRemovedGap);

    /// <summary>
    /// Checks whether a specific station is experiencing an internal synthetic "No Signal" gap at the given timeline offset.
    /// </summary>
    bool IsStationInGap(string stationId, TimeSpan timelineOffset, out PlayerStationGap? gap);

    /// <summary>
    /// Gets all station gaps occurring within a time range for rendering timeline markers.
    /// </summary>
    IReadOnlyList<PlayerStationGap> GetStationGaps(string stationId);

    /// <summary>
    /// Gets all global gaps for timeline visual marking.
    /// </summary>
    IReadOnlyList<PlayerGlobalGap> GlobalGaps { get; }
}
