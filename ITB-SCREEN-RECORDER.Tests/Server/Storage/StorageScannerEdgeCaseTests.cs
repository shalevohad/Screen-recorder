using System;
using ITB_SCREEN_RECORDER.Server.Services;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Server.Storage;

public class StorageScannerEdgeCaseTests
{
    [Fact]
    public void StationNameWithNumbersAndDots_ExtractsEpochCorrectly()
    {
        // Hostname contains numbers ("node-2026.hq.internal"), MediaMTX epoch is at the end
        string fileName = "node-2026.hq.internal_1791582402_381843.fmp4";
        var fallbackUtc = DateTime.UtcNow;

        long epoch = StorageScannerService.TryParseStartEpoch(fileName, fallbackUtc, "UTC");

        Assert.Equal(1791582402381L, epoch);
    }

    [Fact]
    public void StationNameWithChannelNumber_ExtractsTenDigitEpoch()
    {
        string fileName = "ch04_cam01_1791582402.mp4";
        var fallbackUtc = DateTime.UtcNow;

        long epoch = StorageScannerService.TryParseStartEpoch(fileName, fallbackUtc, "UTC");

        Assert.Equal(1791582402000L, epoch);
    }

    [Fact]
    public void MaxMicroseconds_NineNineNineNineNineNine_AddsNineHundredNinetyNineMs()
    {
        string fileName = "1791582402_999999.mp4";
        var fallbackUtc = DateTime.UtcNow;

        long epoch = StorageScannerService.TryParseStartEpoch(fileName, fallbackUtc, "UTC");

        Assert.Equal(1791582402999L, epoch);
    }

    [Fact]
    public void ImpossibleDate_February31_FallsBackSafelyWithoutException()
    {
        // 2026-02-31 does not exist on the calendar
        string fileName = "cam_2026-02-31_12-00-00.mp4";
        var fallbackUtc = new DateTime(2026, 2, 28, 12, 0, 0, DateTimeKind.Utc);

        long epoch = StorageScannerService.TryParseStartEpoch(fileName, fallbackUtc, "UTC");

        long expectedFallbackMs = new DateTimeOffset(fallbackUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();
        Assert.Equal(expectedFallbackMs, epoch);
    }

    [Fact]
    public void InvalidTimezoneIdentifier_FallsBackSafelyWithoutThrowing()
    {
        string fileName = "station1_2026-10-16_14-30-00.mp4";
        var fallbackUtc = DateTime.UtcNow;

        // An invalid timezone string must not throw TimeZoneNotFoundException
        var exception = Record.Exception(() =>
        {
            StorageScannerService.TryParseStartEpoch(fileName, fallbackUtc, "Completely/Invalid_Timezone_ID");
        });

        Assert.Null(exception);
    }

    [Fact]
    public void FilenameWithMultipleHyphensAndUnderscores_ParsesExpectedPattern()
    {
        string fileName = "sec-hq-ops-room-cam-02_1791582402_100000.mp4";
        var fallbackUtc = DateTime.UtcNow;

        long epoch = StorageScannerService.TryParseStartEpoch(fileName, fallbackUtc, "UTC");

        Assert.Equal(1791582402100L, epoch);
    }
}
