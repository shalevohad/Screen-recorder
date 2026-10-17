using System;
using ITB_SCREEN_RECORDER.Server.Services;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Server.Storage;

public class RecordingChunkSchedulerEdgeCaseTests
{
    [Fact]
    public void YearBoundary_CrossesIntoNextYearPrecisely()
    {
        var nowUtc = new DateTime(2026, 12, 31, 23, 56, 45, DateTimeKind.Utc);
        var boundary = RecordingChunkScheduler.ComputeNextBoundaryUtc(nowUtc, 5);

        Assert.Equal(new DateTime(2027, 1, 1, 0, 0, 0, DateTimeKind.Utc), boundary);
    }

    [Fact]
    public void LeapYear_February28ToFebruary29_HandlesLeapDay()
    {
        var nowUtc = new DateTime(2024, 2, 28, 23, 58, 0, DateTimeKind.Utc);
        var boundary = RecordingChunkScheduler.ComputeNextBoundaryUtc(nowUtc, 5);

        Assert.Equal(new DateTime(2024, 2, 29, 0, 0, 0, DateTimeKind.Utc), boundary);
    }

    [Fact]
    public void LeapYear_February29ToMarch1_HandlesMonthTransition()
    {
        var nowUtc = new DateTime(2024, 2, 29, 23, 57, 30, DateTimeKind.Utc);
        var boundary = RecordingChunkScheduler.ComputeNextBoundaryUtc(nowUtc, 5);

        Assert.Equal(new DateTime(2024, 3, 1, 0, 0, 0, DateTimeKind.Utc), boundary);
    }

    [Fact]
    public void SubsecondPrecision_MillisecondsDoNotDriftBoundary()
    {
        // 14:04:59.999 -> should land on 14:05:00.000 without fractional offsets
        var nowUtc = new DateTime(2026, 6, 15, 14, 4, 59, 999, DateTimeKind.Utc);
        var boundary = RecordingChunkScheduler.ComputeNextBoundaryUtc(nowUtc, 5);

        Assert.Equal(new DateTime(2026, 6, 15, 14, 5, 0, 0, DateTimeKind.Utc), boundary);
        Assert.Equal(0, boundary.Millisecond);
    }

    [Fact]
    public void HourlyInterval_60Minutes_TransitionsExactHours()
    {
        var nowUtc = new DateTime(2026, 10, 16, 14, 25, 0, DateTimeKind.Utc);
        var boundary = RecordingChunkScheduler.ComputeNextBoundaryUtc(nowUtc, 60);

        Assert.Equal(new DateTime(2026, 10, 16, 15, 0, 0, DateTimeKind.Utc), boundary);
    }

    [Fact]
    public void SingleMinuteInterval_EveryMinuteAligns()
    {
        var nowUtc = new DateTime(2026, 10, 16, 8, 30, 45, DateTimeKind.Utc);
        var boundary = RecordingChunkScheduler.ComputeNextBoundaryUtc(nowUtc, 1);

        Assert.Equal(new DateTime(2026, 10, 16, 8, 31, 0, DateTimeKind.Utc), boundary);
    }

    [Fact]
    public void NonDivisorInterval_SevenMinutes_ComputesDeterministicBoundary()
    {
        // interval = 7: 00:00, 00:07, 00:14 ...
        // at 00:08: bucket start is 7, next boundary is 14
        var nowUtc = new DateTime(2026, 10, 16, 0, 8, 0, DateTimeKind.Utc);
        var boundary = RecordingChunkScheduler.ComputeNextBoundaryUtc(nowUtc, 7);

        Assert.Equal(new DateTime(2026, 10, 16, 0, 14, 0, DateTimeKind.Utc), boundary);
    }
}
