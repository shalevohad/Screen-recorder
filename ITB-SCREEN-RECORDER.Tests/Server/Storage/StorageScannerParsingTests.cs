using System;
using ITB_SCREEN_RECORDER.Server.Services;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Server.Storage;

public class StorageScannerParsingTests
{
    [Fact]
    public void TryParseStartEpoch_MediaMtxSecondsAndMicroseconds_ParsesCorrectly()
    {
        // 1791582402 seconds + 381843 microseconds = 1791582402381 milliseconds
        string fileName = "1791582402_381843.mp4";
        var fallbackUtc = DateTime.UtcNow;

        long epochMs = StorageScannerService.TryParseStartEpoch(fileName, fallbackUtc, "UTC");

        Assert.Equal(1791582402381L, epochMs);
    }

    [Fact]
    public void TryParseStartEpoch_TenDigitEpoch_ParsesSecondsToMilliseconds()
    {
        string fileName = "chunk_1791582402.mp4";
        var fallbackUtc = DateTime.UtcNow;

        long epochMs = StorageScannerService.TryParseStartEpoch(fileName, fallbackUtc, "UTC");

        Assert.Equal(1791582402000L, epochMs);
    }

    [Fact]
    public void TryParseStartEpoch_DirectThirteenDigitMs_ParsesDirectEpochMs()
    {
        string fileName = "1791583050601.mp4";
        var fallbackUtc = DateTime.UtcNow;

        long epochMs = StorageScannerService.TryParseStartEpoch(fileName, fallbackUtc, "UTC");

        Assert.Equal(1791583050601L, epochMs);
    }

    [Fact]
    public void TryParseStartEpoch_LegacyHyphenFormat_WithUtcTimezone_ParsesExactUtc()
    {
        string fileName = "station1_2026-10-16_14-30-00.mp4";
        var fallbackUtc = DateTime.UtcNow;

        long epochMs = StorageScannerService.TryParseStartEpoch(fileName, fallbackUtc, "UTC");

        var expectedUtc = new DateTime(2026, 10, 16, 14, 30, 0, DateTimeKind.Utc);
        long expectedMs = new DateTimeOffset(expectedUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();

        Assert.Equal(expectedMs, epochMs);
    }

    [Fact]
    public void TryParseStartEpoch_CompactFormat_ParsesAsUtc()
    {
        string fileName = "rec_20261016_143000.mp4";
        var fallbackUtc = DateTime.UtcNow;

        long epochMs = StorageScannerService.TryParseStartEpoch(fileName, fallbackUtc, "UTC");

        var expectedUtc = new DateTime(2026, 10, 16, 14, 30, 0, DateTimeKind.Utc);
        long expectedMs = new DateTimeOffset(expectedUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();

        Assert.Equal(expectedMs, epochMs);
    }

    [Fact]
    public void TryParseStartEpoch_UnrecognizedName_FallsBackToCreationTime()
    {
        string fileName = "arbitrary_recording_name.mp4";
        var fallbackUtc = new DateTime(2026, 10, 15, 12, 0, 0, DateTimeKind.Utc);

        long epochMs = StorageScannerService.TryParseStartEpoch(fileName, fallbackUtc, "UTC");

        long expectedMs = new DateTimeOffset(fallbackUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();
        Assert.Equal(expectedMs, epochMs);
    }
}
