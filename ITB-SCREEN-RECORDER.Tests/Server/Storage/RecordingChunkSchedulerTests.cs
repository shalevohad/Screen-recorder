using System;
using ITB_SCREEN_RECORDER.Server.Services;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Server.Storage;

public class RecordingChunkSchedulerTests
{
    [Fact]
    public void ComputeNextBoundaryUtc_Rule1_5MinuteInterval_AlignsToWallClock()
    {
        // Case: Station starts at 15:12:35 UTC -> next boundary must be 15:15:00 UTC
        var nowUtc = new DateTime(2026, 10, 16, 15, 12, 35, DateTimeKind.Utc);
        var boundary = RecordingChunkScheduler.ComputeNextBoundaryUtc(nowUtc, 5);

        Assert.Equal(new DateTime(2026, 10, 16, 15, 15, 0, DateTimeKind.Utc), boundary);
    }

    [Fact]
    public void ComputeNextBoundaryUtc_ExactBoundaryTick_AdvancesToNextMultiple()
    {
        // Case: Boundary tick arrives exactly at 15:15:00 -> next must be 15:20:00
        var nowUtc = new DateTime(2026, 10, 16, 15, 15, 0, DateTimeKind.Utc);
        var boundary = RecordingChunkScheduler.ComputeNextBoundaryUtc(nowUtc, 5);

        Assert.Equal(new DateTime(2026, 10, 16, 15, 20, 0, DateTimeKind.Utc), boundary);
    }

    [Fact]
    public void ComputeNextBoundaryUtc_OneSecondBeforeBoundary_LandsOnExpectedBoundary()
    {
        // Case: 15:19:59 -> next boundary is 15:20:00
        var nowUtc = new DateTime(2026, 10, 16, 15, 19, 59, DateTimeKind.Utc);
        var boundary = RecordingChunkScheduler.ComputeNextBoundaryUtc(nowUtc, 5);

        Assert.Equal(new DateTime(2026, 10, 16, 15, 20, 0, DateTimeKind.Utc), boundary);
    }

    [Fact]
    public void ComputeNextBoundaryUtc_NearMidnight_WrapsToNextDayCorrectly()
    {
        // Case: 23:58:10 -> next boundary is midnight 00:00:00 next day
        var nowUtc = new DateTime(2026, 10, 16, 23, 58, 10, DateTimeKind.Utc);
        var boundary = RecordingChunkScheduler.ComputeNextBoundaryUtc(nowUtc, 5);

        Assert.Equal(new DateTime(2026, 10, 17, 0, 0, 0, DateTimeKind.Utc), boundary);
    }

    [Theory]
    [InlineData(10, 4, 15, 10, 15)] // 10:04 -> 10:15 (15 min interval)
    [InlineData(10, 15, 15, 10, 30)] // 10:15 -> 10:30 (15 min interval)
    [InlineData(10, 46, 15, 11, 0)]  // 10:46 -> 11:00 (15 min interval)
    [InlineData(14, 25, 30, 14, 30)] // 14:25 -> 14:30 (30 min interval)
    [InlineData(14, 30, 30, 15, 0)]  // 14:30 -> 15:00 (30 min interval)
    [InlineData(8, 0, 1, 8, 1)]      // 08:00 -> 08:01 (1 min interval)
    public void ComputeNextBoundaryUtc_VariousIntervals_AlignsCorrectly(
        int nowHour, int nowMin, int interval, int expHour, int expMin)
    {
        var nowUtc = new DateTime(2026, 10, 16, nowHour, nowMin, 0, DateTimeKind.Utc);
        var boundary = RecordingChunkScheduler.ComputeNextBoundaryUtc(nowUtc, interval);

        var expected = new DateTime(2026, 10, 16, expHour, expMin, 0, DateTimeKind.Utc);
        Assert.Equal(expected, boundary);
    }
}
