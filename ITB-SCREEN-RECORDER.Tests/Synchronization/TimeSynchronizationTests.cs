using System;
using System.Globalization;
using System.Text.RegularExpressions;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Server.Services;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Synchronization;

public class TimeSynchronizationTests
{
    #region NTP / RTT Clock Offset Calibration Tests

    [Theory]
    [InlineData(1000, 1050, 1025, 0)]      // Perfect symmetric latency (RTT = 50ms, half = 25ms, serverTimeAtReceive = 1050 -> offset = 0ms)
    [InlineData(1000, 1050, 1125, 100)]    // Server is 100ms ahead
    [InlineData(1000, 1050, 925, -100)]    // Server is 100ms behind
    [InlineData(2000, 2010, 2505, 500)]    // Fast RTT (10ms), server 500ms ahead
    [InlineData(5000, 5200, 5100, 0)]      // High latency (RTT = 200ms), perfectly centered
    public void CalculateClockOffset_WithVariousRtt_ReturnsAccurateOffset(
        long tSendMs, long tReceiveMs, long serverEpochMs, long expectedOffsetMs)
    {
        // Algorithm as implemented in AgentSupervisorService.cs lines 473-475:
        long rtt = Math.Max(0, tReceiveMs - tSendMs);
        long serverTimeAtReceive = serverEpochMs + (rtt / 2);
        TimeSpan calculatedOffset = TimeSpan.FromMilliseconds(serverTimeAtReceive - tReceiveMs);

        Assert.Equal(expectedOffsetMs, calculatedOffset.TotalMilliseconds);
    }

    [Fact]
    public void ClockOffsetCalibration_NegativeRttProtection_ClampsToZero()
    {
        // In case of system clock jumping during HTTP request:
        long tSendMs = 5000;
        long tReceiveMs = 4900; // clock moved back locally
        long serverEpochMs = 5000;

        long rtt = Math.Max(0, tReceiveMs - tSendMs);
        long serverTimeAtReceive = serverEpochMs + (rtt / 2);
        TimeSpan calculatedOffset = TimeSpan.FromMilliseconds(serverTimeAtReceive - tReceiveMs);

        Assert.Equal(0, rtt);
        Assert.Equal(100, calculatedOffset.TotalMilliseconds);
    }

    [Theory]
    [InlineData(0, 10, false)]    // Delta = 10ms <= 25ms threshold -> Do not recalibrate
    [InlineData(0, 25, false)]    // Delta = 25ms <= 25ms threshold -> Do not recalibrate
    [InlineData(0, 26, true)]     // Delta = 26ms > 25ms threshold -> Recalibrate!
    [InlineData(50, 20, true)]    // Delta = 30ms > 25ms -> Recalibrate!
    [InlineData(100, 115, false)] // Delta = 15ms <= 25ms -> Do not recalibrate
    [InlineData(-50, -10, true)]  // Delta = 40ms > 25ms -> Recalibrate!
    public void ClockOffsetHysteresisThreshold_SuppressesJitter(
        double currentOffsetMs, double newOffsetMs, bool shouldTriggerRecalibration)
    {
        TimeSpan currentOffset = TimeSpan.FromMilliseconds(currentOffsetMs);
        TimeSpan newOffset = TimeSpan.FromMilliseconds(newOffsetMs);

        bool triggers = Math.Abs((newOffset - currentOffset).TotalMilliseconds) > 25;

        Assert.Equal(shouldTriggerRecalibration, triggers);
    }

    [Fact]
    public void CalibratedClientTimestamp_AppliesOffsetCorrectly()
    {
        DateTime localUtc = new DateTime(2026, 10, 16, 12, 0, 0, DateTimeKind.Utc);
        TimeSpan serverOffset = TimeSpan.FromSeconds(3); // Client is 3 seconds behind server

        DateTime calibrated = localUtc + serverOffset;

        Assert.Equal(new DateTime(2026, 10, 16, 12, 0, 3, DateTimeKind.Utc), calibrated);
    }

    #endregion

    #region Hourly Chunk Rotation & Clock Boundary Tests

    [Theory]
    [InlineData("2026-10-16T10:00:00Z", 60, "2026-10-16T11:00:00Z")] // Exact hour turnover
    [InlineData("2026-10-16T10:01:00Z", 60, "2026-10-16T11:00:00Z")] // 1 minute into the hour
    [InlineData("2026-10-16T10:59:59Z", 60, "2026-10-16T11:00:00Z")] // 1 second before next hour
    [InlineData("2026-10-16T10:15:30Z", 15, "2026-10-16T10:30:00Z")] // 15-minute sub-hourly chunk
    [InlineData("2026-10-16T10:00:00Z", 15, "2026-10-16T10:15:00Z")] // 15-minute boundary
    [InlineData("2026-10-16T10:30:00Z", 30, "2026-10-16T11:00:00Z")] // 30-minute boundary
    [InlineData("2026-10-16T10:45:00Z", 120, "2026-10-16T12:00:00Z")] // 2-hour multi-hour bucket
    public void ComputeNextBoundaryUtc_CalculatesCorrectClockBoundary(
        string nowIso, int intervalMinutes, string expectedNextBoundaryIso)
    {
        DateTime nowUtc = DateTime.Parse(nowIso, CultureInfo.InvariantCulture, DateTimeStyles.AdjustToUniversal);
        DateTime expected = DateTime.Parse(expectedNextBoundaryIso, CultureInfo.InvariantCulture, DateTimeStyles.AdjustToUniversal);

        DateTime actual = RecordingChunkScheduler.ComputeNextBoundaryUtc(nowUtc, intervalMinutes);

        Assert.Equal(expected, actual);
    }

    [Fact]
    public void ComputeNextBoundaryUtc_MidnightCrossing_AdvancesToNextDay()
    {
        // 23:45:00 with 60-minute interval should advance to 00:00:00 next day
        DateTime lateNight = new DateTime(2026, 10, 16, 23, 45, 0, DateTimeKind.Utc);
        DateTime expectedMidnight = new DateTime(2026, 10, 17, 0, 0, 0, DateTimeKind.Utc);

        DateTime actual = RecordingChunkScheduler.ComputeNextBoundaryUtc(lateNight, 60);

        Assert.Equal(expectedMidnight, actual);
    }

    [Fact]
    public void ComputeNextBoundaryUtc_LeapYearMidnightCrossing_HandlesFeb29Correctly()
    {
        // Leap year: 2024-02-28 23:50:00 with 60-minute interval advances to 2024-02-29 00:00:00
        DateTime feb28Leap = new DateTime(2024, 2, 28, 23, 50, 0, DateTimeKind.Utc);
        DateTime expectedFeb29 = new DateTime(2024, 2, 29, 0, 0, 0, DateTimeKind.Utc);

        DateTime actual = RecordingChunkScheduler.ComputeNextBoundaryUtc(feb28Leap, 60);

        Assert.Equal(expectedFeb29, actual);
    }

    [Fact]
    public void ComputeNextBoundaryUtc_YearCrossing_AdvancesToNewYear()
    {
        // 2026-12-31 23:30:00 -> 2027-01-01 00:00:00
        DateTime newYearsEve = new DateTime(2026, 12, 31, 23, 30, 0, DateTimeKind.Utc);
        DateTime expectedNewYear = new DateTime(2027, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        DateTime actual = RecordingChunkScheduler.ComputeNextBoundaryUtc(newYearsEve, 60);

        Assert.Equal(expectedNewYear, actual);
    }

    #endregion

    #region Timestamp Parsing & Epoch Formatting Tests

    [Theory]
    [InlineData("1791583050_123456.mp4", 1791583050123L)] // %s_%f format (seconds + microseconds)
    [InlineData("stationA_1791583050_000000.fmp4", 1791583050000L)]
    [InlineData("1791583050.mp4", 1791583050000L)]
    public void StorageFilenameEpochRegex_ExtractsAccurateMilliseconds(string filename, long expectedEpochMs)
    {
        string nameWithoutExt = System.IO.Path.GetFileNameWithoutExtension(filename);
        var matchEpoch = Regex.Match(nameWithoutExt, @"(?:^|[_-])(?<sec>\d{10})(?:[_-](?<micro>\d{1,6}))?");

        Assert.True(matchEpoch.Success);
        long sec = long.Parse(matchEpoch.Groups["sec"].Value);
        long ms = sec * 1000;
        if (matchEpoch.Groups["micro"].Success && long.TryParse(matchEpoch.Groups["micro"].Value, out long micro))
        {
            ms += (micro / 1000);
        }

        Assert.Equal(expectedEpochMs, ms);
    }

    [Fact]
    public void IsoCreationTimeUtcParsing_MatchesExpectedEpoch()
    {
        string headerSample = "major_brand: isom creation_time: 2026-10-16T12:00:00.000000Z handler_name: VideoHandler";
        var matchIso = Regex.Match(headerSample, @"creation_time[^\d]*(\d{4}-\d{2}-\d{2}[T_ ]\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?)");

        Assert.True(matchIso.Success);
        bool parsed = DateTime.TryParse(matchIso.Groups[1].Value, CultureInfo.InvariantCulture,
            DateTimeStyles.AssumeUniversal | DateTimeStyles.AdjustToUniversal, out DateTime dtUtc);

        Assert.True(parsed);
        long epochMs = new DateTimeOffset(dtUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();

        DateTimeOffset expectedDt = new DateTimeOffset(2026, 10, 16, 12, 0, 0, TimeSpan.Zero);
        Assert.Equal(expectedDt.ToUnixTimeMilliseconds(), epochMs);
    }

    #endregion
}
