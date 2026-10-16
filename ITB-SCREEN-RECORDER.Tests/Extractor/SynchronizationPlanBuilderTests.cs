using System;
using System.Collections.Generic;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Extractor;

public class SynchronizationPlanBuilderTests
{
    private readonly SynchronizationPlanBuilder _builder = new();

    [Fact]
    public void BuildSynchronizationPlan_EmptyChunks_ReturnsEmptyPlan()
    {
        var startUtc = new DateTime(2026, 10, 16, 10, 0, 0, DateTimeKind.Utc);
        var endUtc = new DateTime(2026, 10, 16, 11, 0, 0, DateTimeKind.Utc);
        var stationIds = new List<string> { "station-1" };
        var chunks = new Dictionary<string, List<RecordingChunkMetadata>>();

        var plan = _builder.BuildSynchronizationPlan(stationIds, startUtc, endUtc, chunks);

        Assert.NotNull(plan);
        Assert.Empty(plan.ActiveSegments);
        Assert.Empty(plan.RemovedGlobalGaps);
        Assert.Equal(0, plan.TotalActiveSeconds);
    }

    [Fact]
    public void BuildSynchronizationPlan_ContiguousChunks_MergesIntoSingleActiveSegment()
    {
        var startUtc = new DateTime(2026, 10, 16, 10, 0, 0, DateTimeKind.Utc);
        var endUtc = new DateTime(2026, 10, 16, 10, 15, 0, DateTimeKind.Utc);
        var stationIds = new List<string> { "station-1" };

        var chunks = new Dictionary<string, List<RecordingChunkMetadata>>
        {
            ["station-1"] = new List<RecordingChunkMetadata>
            {
                new()
                {
                    Hostname = "station-1",
                    StartUtc = new DateTime(2026, 10, 16, 10, 0, 0, DateTimeKind.Utc),
                    EndUtc = new DateTime(2026, 10, 16, 10, 5, 0, DateTimeKind.Utc)
                },
                new()
                {
                    Hostname = "station-1",
                    StartUtc = new DateTime(2026, 10, 16, 10, 5, 0, DateTimeKind.Utc),
                    EndUtc = new DateTime(2026, 10, 16, 10, 10, 0, DateTimeKind.Utc)
                },
                new()
                {
                    Hostname = "station-1",
                    StartUtc = new DateTime(2026, 10, 16, 10, 10, 0, DateTimeKind.Utc),
                    EndUtc = new DateTime(2026, 10, 16, 10, 15, 0, DateTimeKind.Utc)
                }
            }
        };

        var plan = _builder.BuildSynchronizationPlan(stationIds, startUtc, endUtc, chunks);

        Assert.Single(plan.ActiveSegments);
        Assert.Equal(startUtc, plan.ActiveSegments[0].StartUtc);
        Assert.Equal(endUtc, plan.ActiveSegments[0].EndUtc);
        Assert.Equal(900.0, plan.TotalActiveSeconds); // 15 mins = 900 seconds
        Assert.Empty(plan.RemovedGlobalGaps);
    }

    [Fact]
    public void BuildSynchronizationPlan_WithGlobalGap_DetectsAndLogsGap()
    {
        var startUtc = new DateTime(2026, 10, 16, 10, 0, 0, DateTimeKind.Utc);
        var endUtc = new DateTime(2026, 10, 16, 10, 30, 0, DateTimeKind.Utc);
        var stationIds = new List<string> { "station-1" };

        // 10:00 - 10:10 (Segment 1), then 10:10-10:20 (Gap 10m), then 10:20 - 10:30 (Segment 2)
        var chunks = new Dictionary<string, List<RecordingChunkMetadata>>
        {
            ["station-1"] = new List<RecordingChunkMetadata>
            {
                new()
                {
                    Hostname = "station-1",
                    StartUtc = new DateTime(2026, 10, 16, 10, 0, 0, DateTimeKind.Utc),
                    EndUtc = new DateTime(2026, 10, 16, 10, 10, 0, DateTimeKind.Utc)
                },
                new()
                {
                    Hostname = "station-1",
                    StartUtc = new DateTime(2026, 10, 16, 10, 20, 0, DateTimeKind.Utc),
                    EndUtc = new DateTime(2026, 10, 16, 10, 30, 0, DateTimeKind.Utc)
                }
            }
        };

        var plan = _builder.BuildSynchronizationPlan(stationIds, startUtc, endUtc, chunks);

        Assert.Equal(2, plan.ActiveSegments.Count);
        Assert.Equal(1200.0, plan.TotalActiveSeconds); // 20 minutes active = 1200 seconds
        Assert.Single(plan.RemovedGlobalGaps);

        var gap = plan.RemovedGlobalGaps[0];
        Assert.Equal(new DateTime(2026, 10, 16, 10, 10, 0, DateTimeKind.Utc), gap.StartUtc);
        Assert.Equal(new DateTime(2026, 10, 16, 10, 20, 0, DateTimeKind.Utc), gap.EndUtc);
        Assert.Equal(600.0, gap.SkippedDurationSeconds); // 10 minutes = 600s
    }

    [Fact]
    public void BuildSynchronizationPlan_MultipleStations_UnifiesActiveSegments()
    {
        var startUtc = new DateTime(2026, 10, 16, 12, 0, 0, DateTimeKind.Utc);
        var endUtc = new DateTime(2026, 10, 16, 12, 30, 0, DateTimeKind.Utc);
        var stationIds = new List<string> { "station-A", "station-B" };

        // Station A records 12:00 - 12:15. Station B records 12:10 - 12:30.
        // Combined coverage is 12:00 - 12:30 (fully contiguous!)
        var chunks = new Dictionary<string, List<RecordingChunkMetadata>>
        {
            ["station-A"] = new List<RecordingChunkMetadata>
            {
                new()
                {
                    Hostname = "station-A",
                    StartUtc = new DateTime(2026, 10, 16, 12, 0, 0, DateTimeKind.Utc),
                    EndUtc = new DateTime(2026, 10, 16, 12, 15, 0, DateTimeKind.Utc)
                }
            },
            ["station-B"] = new List<RecordingChunkMetadata>
            {
                new()
                {
                    Hostname = "station-B",
                    StartUtc = new DateTime(2026, 10, 16, 12, 10, 0, DateTimeKind.Utc),
                    EndUtc = new DateTime(2026, 10, 16, 12, 30, 0, DateTimeKind.Utc)
                }
            }
        };

        var plan = _builder.BuildSynchronizationPlan(stationIds, startUtc, endUtc, chunks);

        Assert.Single(plan.ActiveSegments);
        Assert.Equal(startUtc, plan.ActiveSegments[0].StartUtc);
        Assert.Equal(endUtc, plan.ActiveSegments[0].EndUtc);
        Assert.Equal(1800.0, plan.TotalActiveSeconds);
        Assert.Empty(plan.RemovedGlobalGaps);
    }
}
