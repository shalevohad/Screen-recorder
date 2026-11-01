using System;
using System.Collections.Generic;
using ITB_SCREEN_RECORDER.Player.Core.Ingestion;
using ITB_SCREEN_RECORDER.Player.Core.Synchronization;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Player;

public class MasterPlaybackClockTests
{
    [Fact]
    public void InitialState_IsStopped_AndZeroPosition()
    {
        using var clock = new MasterPlaybackClock(TimeSpan.FromMinutes(10), enableTimer: false);

        Assert.Equal(PlaybackState.Stopped, clock.State);
        Assert.Equal(TimeSpan.Zero, clock.CurrentTime);
        Assert.Equal(TimeSpan.FromMinutes(10), clock.Duration);
        Assert.Equal(1.0, clock.PlaybackRate);
    }

    [Fact]
    public void PlayAndPause_UpdatesState_AndFiresEvents()
    {
        using var clock = new MasterPlaybackClock(TimeSpan.FromSeconds(60), enableTimer: false);
        PlaybackState? lastState = null;
        clock.StateChanged += s => lastState = s;

        clock.Play();
        Assert.Equal(PlaybackState.Playing, clock.State);
        Assert.Equal(PlaybackState.Playing, lastState);

        clock.Pause();
        Assert.Equal(PlaybackState.Paused, clock.State);
        Assert.Equal(PlaybackState.Paused, lastState);

        clock.Stop();
        Assert.Equal(PlaybackState.Stopped, clock.State);
        Assert.Equal(PlaybackState.Stopped, lastState);
        Assert.Equal(TimeSpan.Zero, clock.CurrentTime);
    }

    [Fact]
    public void AdvanceTimeManually_RespectsPlaybackRate_AndClampsToDuration()
    {
        using var clock = new MasterPlaybackClock(TimeSpan.FromSeconds(10), enableTimer: false);
        clock.Play();

        // Rate = 1.0, advance 2 sec
        clock.AdvanceTimeManually(TimeSpan.FromSeconds(2));
        Assert.Equal(TimeSpan.FromSeconds(2), clock.CurrentTime);

        // Change rate to 2.0x, advance 1 sec real time -> 2 sec timeline
        clock.PlaybackRate = 2.0;
        clock.AdvanceTimeManually(TimeSpan.FromSeconds(1));
        Assert.Equal(TimeSpan.FromSeconds(4), clock.CurrentTime);

        // Advance past duration -> clamps to 10s and automatically pauses
        clock.AdvanceTimeManually(TimeSpan.FromSeconds(5)); // 5 * 2 = 10s -> total 14s > 10s
        Assert.Equal(TimeSpan.FromSeconds(10), clock.CurrentTime);
        Assert.Equal(PlaybackState.Paused, clock.State);
    }

    [Fact]
    public void StepFrame_StepsForwardAndBackward_AndPausesIfPlaying()
    {
        using var clock = new MasterPlaybackClock(TimeSpan.FromSeconds(60), enableTimer: false);
        clock.Seek(TimeSpan.FromSeconds(10));
        clock.Play();

        // 30 fps -> 1 frame is ~33.33ms
        clock.StepFrame(1, 30.0);
        Assert.Equal(PlaybackState.Paused, clock.State);
        Assert.True(clock.CurrentTime.TotalMilliseconds > 10030 && clock.CurrentTime.TotalMilliseconds < 10035);

        // Step backward 2 frames
        clock.StepFrame(-2, 30.0);
        Assert.True(clock.CurrentTime.TotalMilliseconds > 9960 && clock.CurrentTime.TotalMilliseconds < 9975);
    }

    [Fact]
    public void GapSkipNavigator_AccuratelyConvertsUtcAndTimelineOffsets()
    {
        var startUtc = new DateTime(2026, 11, 1, 10, 0, 0, DateTimeKind.Utc);
        var endUtc = new DateTime(2026, 11, 1, 10, 10, 0, DateTimeKind.Utc);

        var manifest = new PlayerPackageManifest
        {
            RangeStartUtc = startUtc,
            RangeEndUtc = endUtc,
            RemovedGlobalGaps = new List<PlayerGlobalGap>
            {
                new()
                {
                    GapIndex = 0,
                    StartUtc = startUtc.AddMinutes(2),      // 10:02:00
                    EndUtc = startUtc.AddMinutes(5),        // 10:05:00
                    SkippedDurationSeconds = 180.0,         // 3 minutes skipped
                    TimelineOffsetSeconds = 120.0          // at 2 minutes into export
                }
            },
            StationGaps = new List<PlayerStationGap>
            {
                new()
                {
                    StationId = "WS-01",
                    StartUtc = startUtc.AddMinutes(1),
                    EndUtc = startUtc.AddMinutes(1).AddSeconds(30),
                    DurationSeconds = 30.0,
                    BridgeType = "NoSignal"
                }
            }
        };

        var nav = new GapSkipNavigator(manifest);

        // 1. Before gap: timeline offset 60s -> UTC 10:01:00
        var utcBefore = nav.TimelineOffsetToUtc(TimeSpan.FromSeconds(60));
        Assert.Equal(startUtc.AddMinutes(1), utcBefore);

        // 2. After gap: timeline offset 150s (2m30s into export)
        // Wall clock UTC: 10:00:00 + 150s + 180s gap = 10:05:30
        var utcAfter = nav.TimelineOffsetToUtc(TimeSpan.FromSeconds(150));
        Assert.Equal(startUtc.AddSeconds(150 + 180), utcAfter);

        // 3. Reverse: Utc to timeline offset
        var offset1 = nav.UtcToTimelineOffset(startUtc.AddMinutes(1), out bool fellInGap1);
        Assert.False(fellInGap1);
        Assert.Equal(TimeSpan.FromMinutes(1), offset1);

        // UTC inside gap (10:03:00) -> snaps to 120s (2 min) and marks fellInGap=true
        var offsetInGap = nav.UtcToTimelineOffset(startUtc.AddMinutes(3), out bool fellInGap2);
        Assert.True(fellInGap2);
        Assert.Equal(TimeSpan.FromSeconds(120), offsetInGap);

        // 4. Station gap check
        // WS-01 has gap at 10:01:00 to 10:01:30 (timeline offset 60s to 90s)
        Assert.True(nav.IsStationInGap("WS-01", TimeSpan.FromSeconds(70), out var gap));
        Assert.NotNull(gap);
        Assert.Equal("WS-01", gap.StationId);

        // Station WS-02 does not have gaps
        Assert.False(nav.IsStationInGap("WS-02", TimeSpan.FromSeconds(70), out _));
    }

    [Fact]
    public void StreamDriftTracker_DetectsToleranceAndTriggersCorrectionActions()
    {
        using var clock = new MasterPlaybackClock(TimeSpan.FromMinutes(5), enableTimer: false);
        clock.Seek(TimeSpan.FromSeconds(30));

        var tracker = new StreamDriftTracker(clock, driftToleranceMs: 50.0)
        {
            HardSeekThresholdMs = 400.0
        };

        TrackDriftReport? lastReport = null;
        tracker.DriftDetected += r => lastReport = r;

        // 1. Track in sync: Master=30.0s, Track=30.02s (drift +20ms <= 50ms)
        tracker.ReportTrackTime("track-0", TimeSpan.FromSeconds(30.02));
        Assert.True(tracker.IsTrackInSync("track-0"));
        Assert.Null(lastReport);

        // 2. Micro drift: Master=30.0s, Track=30.15s (drift +150ms > 50ms, < 400ms)
        tracker.ReportTrackTime("track-0", TimeSpan.FromSeconds(30.15));
        Assert.False(tracker.IsTrackInSync("track-0"));
        Assert.NotNull(lastReport);
        Assert.Equal("track-0", lastReport.TrackId);
        Assert.Equal(DriftCorrectionAction.MicroRateAdjustment, lastReport.RecommendedAction);

        // 3. Severe drift: Master=30.0s, Track=31.0s (drift +1000ms > 400ms)
        tracker.ReportTrackTime("track-1", TimeSpan.FromSeconds(31.0));
        Assert.NotNull(lastReport);
        Assert.Equal("track-1", lastReport.TrackId);
        Assert.Equal(DriftCorrectionAction.HardSeek, lastReport.RecommendedAction);
    }
}
