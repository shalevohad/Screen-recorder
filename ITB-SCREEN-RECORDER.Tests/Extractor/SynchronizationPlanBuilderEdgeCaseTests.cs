using System;
using System.Collections.Generic;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Extractor;

public class SynchronizationPlanBuilderEdgeCaseTests
{
    private readonly SynchronizationPlanBuilder _builder = new();

    [Fact]
    public void ChunksStrictlyOutsideWindow_AreExcluded()
    {
        var startUtc = new DateTime(2026, 10, 16, 10, 0, 0, DateTimeKind.Utc);
        var endUtc = new DateTime(2026, 10, 16, 11, 0, 0, DateTimeKind.Utc);
        var stationIds = new List<string> { "st1" };

        var chunks = new Dictionary<string, List<RecordingChunkMetadata>>
        {
            ["st1"] = new List<RecordingChunkMetadata>
            {
                // Earlier chunk: 08:00 - 09:00
                new()
                {
                    Hostname = "st1",
                    StartUtc = new DateTime(2026, 10, 16, 8, 0, 0, DateTimeKind.Utc),
                    EndUtc = new DateTime(2026, 10, 16, 9, 0, 0, DateTimeKind.Utc)
                },
                // Later chunk: 12:00 - 13:00
                new()
                {
                    Hostname = "st1",
                    StartUtc = new DateTime(2026, 10, 16, 12, 0, 0, DateTimeKind.Utc),
                    EndUtc = new DateTime(2026, 10, 16, 13, 0, 0, DateTimeKind.Utc)
                }
            }
        };

        var plan = _builder.BuildSynchronizationPlan(stationIds, startUtc, endUtc, chunks);

        Assert.Empty(plan.ActiveSegments);
        Assert.Equal(0, plan.TotalActiveSeconds);
    }

    [Fact]
    public void MicroGapsUnderOneSecond_AreToleratedAndMerged()
    {
        var startUtc = new DateTime(2026, 10, 16, 10, 0, 0, DateTimeKind.Utc);
        var endUtc = new DateTime(2026, 10, 16, 10, 10, 0, DateTimeKind.Utc);
        var stationIds = new List<string> { "st1" };

        // 10:00:00 to 10:05:00.000, then 10:05:00.500 to 10:10:00.000 (500ms gap)
        var chunks = new Dictionary<string, List<RecordingChunkMetadata>>
        {
            ["st1"] = new List<RecordingChunkMetadata>
            {
                new()
                {
                    Hostname = "st1",
                    StartUtc = startUtc,
                    EndUtc = new DateTime(2026, 10, 16, 10, 5, 0, 0, DateTimeKind.Utc)
                },
                new()
                {
                    Hostname = "st1",
                    StartUtc = new DateTime(2026, 10, 16, 10, 5, 0, 500, DateTimeKind.Utc),
                    EndUtc = endUtc
                }
            }
        };

        var plan = _builder.BuildSynchronizationPlan(stationIds, startUtc, endUtc, chunks);

        // Gap <= 1.0s should be merged into a single active segment without introducing a removed gap
        Assert.Single(plan.ActiveSegments);
        Assert.Empty(plan.RemovedGlobalGaps);
    }

    [Fact]
    public void GapsAtHeadAndTail_RecordedAsRemovedGlobalGaps()
    {
        var startUtc = new DateTime(2026, 10, 16, 10, 0, 0, DateTimeKind.Utc);
        var endUtc = new DateTime(2026, 10, 16, 10, 30, 0, DateTimeKind.Utc);
        var stationIds = new List<string> { "st1" };

        // Recording only covers 10:05 to 10:25 (5min head gap, 5min tail gap)
        var chunks = new Dictionary<string, List<RecordingChunkMetadata>>
        {
            ["st1"] = new List<RecordingChunkMetadata>
            {
                new()
                {
                    Hostname = "st1",
                    StartUtc = new DateTime(2026, 10, 16, 10, 5, 0, DateTimeKind.Utc),
                    EndUtc = new DateTime(2026, 10, 16, 10, 25, 0, DateTimeKind.Utc)
                }
            }
        };

        var plan = _builder.BuildSynchronizationPlan(stationIds, startUtc, endUtc, chunks);

        Assert.Single(plan.ActiveSegments);
        Assert.Equal(2, plan.RemovedGlobalGaps.Count);

        // Head gap
        Assert.Equal(startUtc, plan.RemovedGlobalGaps[0].StartUtc);
        Assert.Equal(new DateTime(2026, 10, 16, 10, 5, 0, DateTimeKind.Utc), plan.RemovedGlobalGaps[0].EndUtc);
        Assert.Equal(300.0, plan.RemovedGlobalGaps[0].SkippedDurationSeconds);

        // Tail gap
        Assert.Equal(new DateTime(2026, 10, 16, 10, 25, 0, DateTimeKind.Utc), plan.RemovedGlobalGaps[1].StartUtc);
        Assert.Equal(endUtc, plan.RemovedGlobalGaps[1].EndUtc);
        Assert.Equal(300.0, plan.RemovedGlobalGaps[1].SkippedDurationSeconds);
    }

    [Fact]
    public void InvertedChunkTimestamps_EndBeforeStart_FilteredOutSafely()
    {
        var startUtc = new DateTime(2026, 10, 16, 10, 0, 0, DateTimeKind.Utc);
        var endUtc = new DateTime(2026, 10, 16, 11, 0, 0, DateTimeKind.Utc);
        var stationIds = new List<string> { "st-corrupt" };

        var chunks = new Dictionary<string, List<RecordingChunkMetadata>>
        {
            ["st-corrupt"] = new List<RecordingChunkMetadata>
            {
                new()
                {
                    Hostname = "st-corrupt",
                    StartUtc = new DateTime(2026, 10, 16, 10, 30, 0, DateTimeKind.Utc),
                    EndUtc = new DateTime(2026, 10, 16, 10, 15, 0, DateTimeKind.Utc) // Invalid: end before start!
                }
            }
        };

        var plan = _builder.BuildSynchronizationPlan(stationIds, startUtc, endUtc, chunks);

        Assert.Empty(plan.ActiveSegments);
    }
}
