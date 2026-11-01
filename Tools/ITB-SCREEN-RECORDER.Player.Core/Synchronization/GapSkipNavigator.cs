using System;
using System.Collections.Generic;
using System.Linq;
using ITB_SCREEN_RECORDER.Player.Core.Ingestion;

namespace ITB_SCREEN_RECORDER.Player.Core.Synchronization;

/// <summary>
/// Implements gap navigation and UTC &lt;-&gt; timeline offset mapping based on PlayerPackageManifest.
/// </summary>
public sealed class GapSkipNavigator : IGapSkipNavigator
{
    private readonly DateTime _rangeStartUtc;
    private readonly DateTime _rangeEndUtc;
    private readonly List<PlayerGlobalGap> _globalGaps;
    private readonly Dictionary<string, List<PlayerStationGap>> _stationGapsByStation;

    public IReadOnlyList<PlayerGlobalGap> GlobalGaps => _globalGaps;

    public GapSkipNavigator(PlayerPackageManifest manifest)
    {
        ArgumentNullException.ThrowIfNull(manifest);

        _rangeStartUtc = manifest.RangeStartUtc;
        _rangeEndUtc = manifest.RangeEndUtc;
        _globalGaps = manifest.RemovedGlobalGaps != null
            ? manifest.RemovedGlobalGaps.OrderBy(g => g.TimelineOffsetSeconds).ToList()
            : new List<PlayerGlobalGap>();

        _stationGapsByStation = new Dictionary<string, List<PlayerStationGap>>(StringComparer.OrdinalIgnoreCase);
        if (manifest.StationGaps != null)
        {
            foreach (var gap in manifest.StationGaps)
            {
                if (string.IsNullOrWhiteSpace(gap.StationId)) continue;
                if (!_stationGapsByStation.TryGetValue(gap.StationId, out var list))
                {
                    list = new List<PlayerStationGap>();
                    _stationGapsByStation[gap.StationId] = list;
                }
                list.Add(gap);
            }
        }
    }

    public DateTime TimelineOffsetToUtc(TimeSpan timelineOffset)
    {
        double offsetSeconds = timelineOffset.TotalSeconds;
        if (offsetSeconds < 0) offsetSeconds = 0;

        double accumulatedGapSkip = 0.0;
        foreach (var gap in _globalGaps)
        {
            if (offsetSeconds >= gap.TimelineOffsetSeconds)
            {
                accumulatedGapSkip += gap.SkippedDurationSeconds;
            }
            else
            {
                break;
            }
        }

        return _rangeStartUtc.AddSeconds(offsetSeconds + accumulatedGapSkip);
    }

    public TimeSpan UtcToTimelineOffset(DateTime utcTime, out bool fellInRemovedGap)
    {
        fellInRemovedGap = false;
        if (utcTime <= _rangeStartUtc)
        {
            return TimeSpan.Zero;
        }

        double totalElapsedUtc = (utcTime - _rangeStartUtc).TotalSeconds;
        double accumulatedGapSkip = 0.0;

        foreach (var gap in _globalGaps)
        {
            if (utcTime >= gap.StartUtc && utcTime <= gap.EndUtc)
            {
                fellInRemovedGap = true;
                return TimeSpan.FromSeconds(gap.TimelineOffsetSeconds);
            }

            if (utcTime > gap.EndUtc)
            {
                accumulatedGapSkip += gap.SkippedDurationSeconds;
            }
        }

        double timelineSec = totalElapsedUtc - accumulatedGapSkip;
        if (timelineSec < 0) timelineSec = 0;
        return TimeSpan.FromSeconds(timelineSec);
    }

    public bool IsStationInGap(string stationId, TimeSpan timelineOffset, out PlayerStationGap? gap)
    {
        gap = null;
        if (string.IsNullOrWhiteSpace(stationId) || !_stationGapsByStation.TryGetValue(stationId, out var stationGaps))
        {
            return false;
        }

        DateTime currentUtc = TimelineOffsetToUtc(timelineOffset);
        foreach (var g in stationGaps)
        {
            if (currentUtc >= g.StartUtc && currentUtc <= g.EndUtc)
            {
                gap = g;
                return true;
            }
        }

        return false;
    }

    public IReadOnlyList<PlayerStationGap> GetStationGaps(string stationId)
    {
        if (!string.IsNullOrWhiteSpace(stationId) && _stationGapsByStation.TryGetValue(stationId, out var list))
        {
            return list;
        }
        return Array.Empty<PlayerStationGap>();
    }
}
