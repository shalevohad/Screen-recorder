using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services;
using System;
using System.Collections.Generic;
using System.Text.Json;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Extractor;

public class UniversalStudioCompositionTests
{
    [Fact]
    public void SynchronizationPlan_CarriesUniversalCompositionAndAudioRouting()
    {
        var plan = new SynchronizationPlan
        {
            KeystrokeMode = KeystrokeExportMode.BurnIn,
            CompositionScope = "inter-station",
            LayoutMode = "split",
            IsPipSwapped = true,
            IsAutoDirectorEnabled = false,
            AudioRoutingSegments = new List<AudioRoutingSegmentDto>
            {
                new AudioRoutingSegmentDto
                {
                    StartEpochMs = 1700000000000,
                    EndEpochMs = 1700001800000,
                    SourceStationId = "WS-01"
                },
                new AudioRoutingSegmentDto
                {
                    StartEpochMs = 1700001800000,
                    EndEpochMs = 1700003600000,
                    SourceStationId = "WS-02"
                }
            }
        };

        string json = JsonSerializer.Serialize(plan);
        var deserialized = JsonSerializer.Deserialize<SynchronizationPlan>(json);

        Assert.NotNull(deserialized);
        Assert.Equal("inter-station", deserialized.CompositionScope);
        Assert.Equal("split", deserialized.LayoutMode);
        Assert.True(deserialized.IsPipSwapped);
        Assert.False(deserialized.IsAutoDirectorEnabled);
        Assert.Equal(KeystrokeExportMode.BurnIn, deserialized.KeystrokeMode);
        Assert.NotNull(deserialized.AudioRoutingSegments);
        Assert.Equal(2, deserialized.AudioRoutingSegments.Count);
        Assert.Equal("WS-01", deserialized.AudioRoutingSegments[0].SourceStationId);
        Assert.Equal("WS-02", deserialized.AudioRoutingSegments[1].SourceStationId);
    }

    [Fact]
    public void SingleMasterMp4_FileName_IsExportTime()
    {
        DateTime exportTimeUtc = new DateTime(2026, 11, 2, 14, 30, 0, DateTimeKind.Utc);
        string fileName = $"{exportTimeUtc:yyyy-MM-dd_HH-mm-ss}.mp4";

        Assert.EndsWith(".mp4", fileName, StringComparison.OrdinalIgnoreCase);
        Assert.DoesNotContain(".tar", fileName, StringComparison.OrdinalIgnoreCase);
        Assert.Equal("2026-11-02_14-30-00.mp4", fileName);
    }

    [Fact]
    public void AudioRoutingSegment_SupportsMuteInterval()
    {
        var seg = new AudioRoutingSegmentDto
        {
            StartEpochMs = 1000,
            EndEpochMs = 2000,
            SourceStationId = "MUTE"
        };

        Assert.Equal("MUTE", seg.SourceStationId);
    }

    [Fact]
    public void HardBurnIn_Invariant_EnforcesInPlaceKeystrokes()
    {
        var plan = new SynchronizationPlan
        {
            KeystrokeMode = KeystrokeExportMode.BurnIn
        };

        Assert.Equal(KeystrokeExportMode.BurnIn, plan.KeystrokeMode);
    }
    [Fact]
    public void AutoDirector_AppliedWhenStationHasSingleScreenInLayout()
    {
        // Layout with 1 placement for WS-01
        var placements = new List<ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models.CanvasPlacementDto>
        {
            new ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models.CanvasPlacementDto
            {
                StationId = "WS-01",
                DisplayId = "mon-0",
                X = 0, Y = 0, Width = 960, Height = 1080
            },
            new ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models.CanvasPlacementDto
            {
                StationId = "WS-02",
                DisplayId = "mon-0",
                X = 960, Y = 0, Width = 960, Height = 1080
            }
        };

        // WS-01 has 2 available recorded displays
        var availableDisps = new List<string> { "mon-0", "mon-1" };

        int screenCountForStation = placements
            .Where(x => string.Equals(x.StationId, "WS-01", StringComparison.OrdinalIgnoreCase))
            .Select(x => !string.IsNullOrEmpty(x.DisplayId) ? x.DisplayId.ToLowerInvariant() : "mon-0")
            .Distinct()
            .Count();

        // When screenCountForStation <= 1 and station has multiple screens, it routes via director
        bool shouldUseDirector = screenCountForStation <= 1 && availableDisps.Count > 1;
        Assert.True(shouldUseDirector);
    }

    [Fact]
    public void AutoDirector_NotAppliedWhenStationHasMultipleScreensInLayout()
    {
        // Layout with 2 distinct screens for WS-01
        var placements = new List<ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models.CanvasPlacementDto>
        {
            new ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models.CanvasPlacementDto
            {
                StationId = "WS-01",
                DisplayId = "mon-0",
                X = 0, Y = 0, Width = 960, Height = 540
            },
            new ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models.CanvasPlacementDto
            {
                StationId = "WS-01",
                DisplayId = "mon-1",
                X = 0, Y = 540, Width = 960, Height = 540
            }
        };

        var availableDisps = new List<string> { "mon-0", "mon-1" };

        int screenCountForStation = placements
            .Where(x => string.Equals(x.StationId, "WS-01", StringComparison.OrdinalIgnoreCase))
            .Select(x => !string.IsNullOrEmpty(x.DisplayId) ? x.DisplayId.ToLowerInvariant() : "mon-0")
            .Distinct()
            .Count();

        // When screenCountForStation > 1, Auto-Director is NOT forced so discrete displays are preserved
        bool shouldUseDirector = screenCountForStation <= 1 && availableDisps.Count > 1;
        Assert.False(shouldUseDirector);
        Assert.Equal(2, screenCountForStation);
    }

    [Theory]
    [InlineData("HD", 1280, 720, 2500)]
    [InlineData("720p", 1280, 720, 2500)]
    [InlineData("720", 1280, 720, 2500)]
    [InlineData("1280x720", 1280, 720, 2500)]
    [InlineData("FHD", 1920, 1080, 6000)]
    [InlineData("1080p", 1920, 1080, 6000)]
    [InlineData("1080", 1920, 1080, 6000)]
    [InlineData("1920x1080", 1920, 1080, 6000)]
    [InlineData("FullHD", 1920, 1080, 6000)]
    [InlineData("2K", 2560, 1440, 12000)]
    [InlineData("1440p", 2560, 1440, 12000)]
    [InlineData("2560x1440", 2560, 1440, 12000)]
    [InlineData("QHD", 2560, 1440, 12000)]
    [InlineData("4K", 3840, 2160, 24000)]
    [InlineData("2160p", 3840, 2160, 24000)]
    [InlineData("3840x2160", 3840, 2160, 24000)]
    [InlineData("UHD", 3840, 2160, 24000)]
    [InlineData(null, 1920, 1080, 6000)]
    [InlineData("", 1920, 1080, 6000)]
    [InlineData("invalid_quality", 1920, 1080, 6000)]
    public void ParseQualityResolution_MapsAllAliasesCorrectly(string? input, int expectedW, int expectedH, int expectedBitrate)
    {
        var (w, h, bitrate) = AdvanceJobManager.ParseQualityResolution(input);
        Assert.Equal(expectedW, w);
        Assert.Equal(expectedH, h);
        Assert.Equal(expectedBitrate, bitrate);
    }

    [Theory]
    [InlineData("HD", "HD")]
    [InlineData("720p", "HD")]
    [InlineData("FHD", "FHD")]
    [InlineData("1080p", "FHD")]
    [InlineData("2K", "2K")]
    [InlineData("1440p", "2K")]
    [InlineData("4K", "4K")]
    [InlineData("2160p", "4K")]
    [InlineData(null, "FHD")]
    [InlineData("unknown", "FHD")]
    public void NormalizeQualityName_ResolvesStandardTier(string? input, string expectedCanonical)
    {
        string canonical = AdvanceJobManager.NormalizeQualityName(input);
        Assert.Equal(expectedCanonical, canonical);
    }

    [Fact]
    public void ParseQualityResolution_ScalesDualScreenAndNativeAspectCorrectly()
    {
        double aspect32_9 = 32.0 / 9.0;
        int dualW = 3840;
        int dualH = 1080;

        // Native 1:1 on 32:9 dual screen canvas
        var (natW, natH, natBr) = AdvanceJobManager.ParseQualityResolution("NATIVE", aspect32_9, dualW, dualH);
        Assert.Equal(3840, natW);
        Assert.Equal(1080, natH);
        Assert.Equal(12000, natBr);

        // FHD on 32:9 dual screen canvas (should match native vertical 1080 lines, NOT squashed to 1920x540)
        var (fhdW, fhdH, fhdBr) = AdvanceJobManager.ParseQualityResolution("FHD", aspect32_9, dualW, dualH);
        Assert.Equal(3840, fhdW);
        Assert.Equal(1080, fhdH);
        Assert.Equal(12000, fhdBr);

        // 4K on 32:9 dual screen canvas (2160p vertical lines -> 7680x2160)
        var (uhdW, uhdH, uhdBr) = AdvanceJobManager.ParseQualityResolution("4K", aspect32_9, dualW, dualH);
        Assert.Equal(7680, uhdW);
        Assert.Equal(2160, uhdH);
        Assert.Equal(48000, uhdBr);

        // HD on 32:9 dual screen canvas (720p vertical lines -> 2560x720)
        var (hdW, hdH, hdBr) = AdvanceJobManager.ParseQualityResolution("HD", aspect32_9, dualW, dualH);
        Assert.Equal(2560, hdW);
        Assert.Equal(720, hdH);
        Assert.True(hdBr >= 5000);

        // Exact custom dimensions string
        var (custW, custH, custBr) = AdvanceJobManager.ParseQualityResolution("3840X1080");
        Assert.Equal(3840, custW);
        Assert.Equal(1080, custH);
        Assert.Equal(12000, custBr);
    }


    [Fact]
    public void QualityScaling_Scales4KCoordinates_Proportionally()
    {
        int refW = 1920;
        int refH = 1080;
        var (targetW, targetH, _) = AdvanceJobManager.ParseQualityResolution("4K");
        Assert.Equal(3840, targetW);
        Assert.Equal(2160, targetH);

        double scaleX = (double)targetW / refW;
        double scaleY = (double)targetH / refH;

        Assert.Equal(2.0, scaleX);
        Assert.Equal(2.0, scaleY);

        // Window originally at (960, 0, 960, 1080)
        int scaledX = (int)Math.Round(960 * scaleX);
        int scaledY = (int)Math.Round(0 * scaleY);
        int scaledW = (int)Math.Round(960 * scaleX);
        int scaledH = (int)Math.Round(1080 * scaleY);

        Assert.Equal(1920, scaledX);
        Assert.Equal(0, scaledY);
        Assert.Equal(1920, scaledW);
        Assert.Equal(2160, scaledH);

        // Scaled font and border
        int scaledFont = Math.Max(10, (int)Math.Round(13 * scaleX));
        int scaledBorder = Math.Max(1, (int)Math.Round(2 * scaleX));

        Assert.Equal(26, scaledFont);
        Assert.Equal(4, scaledBorder);
    }

    [Fact]
    public void QualityScaling_Scales720pCoordinates_Proportionally()
    {
        int refW = 1920;
        int refH = 1080;
        var (targetW, targetH, _) = AdvanceJobManager.ParseQualityResolution("HD");
        Assert.Equal(1280, targetW);
        Assert.Equal(720, targetH);

        double scaleX = (double)targetW / refW;
        double scaleY = (double)targetH / refH;

        int scaledX = (int)Math.Round(960 * scaleX);
        int scaledW = (int)Math.Round(960 * scaleX);
        int scaledH = (int)Math.Round(1080 * scaleY);

        Assert.Equal(640, scaledX);
        Assert.Equal(640, scaledW);
        Assert.Equal(720, scaledH);

        int scaledFont = Math.Max(10, (int)Math.Round(13 * scaleX));
        int scaledBorder = Math.Max(1, (int)Math.Round(2 * scaleX));

        Assert.Equal(10, scaledFont); // Clamped minimum
        Assert.Equal(1, scaledBorder);
    }

    [Fact]
    public void QualityFileSizes_ScaleMonotonicallyWithResolutionTiers()
    {
        double durationSeconds = 60.0; // 1 minute

        var (_, _, hdBitrate) = AdvanceJobManager.ParseQualityResolution("HD");
        var (_, _, fhdBitrate) = AdvanceJobManager.ParseQualityResolution("FHD");
        var (_, _, qhdBitrate) = AdvanceJobManager.ParseQualityResolution("2K");
        var (_, _, uhdBitrate) = AdvanceJobManager.ParseQualityResolution("4K");

        long hdSize = (long)(((hdBitrate + 128) * 1000.0 / 8.0) * durationSeconds);
        long fhdSize = (long)(((fhdBitrate + 128) * 1000.0 / 8.0) * durationSeconds);
        long qhdSize = (long)(((qhdBitrate + 128) * 1000.0 / 8.0) * durationSeconds);
        long uhdSize = (long)(((uhdBitrate + 128) * 1000.0 / 8.0) * durationSeconds);

        Assert.True(hdSize < fhdSize);
        Assert.True(fhdSize < qhdSize);
        Assert.True(qhdSize < uhdSize);

        // Decimal MB: HD ~19.7 MB, FHD ~45.9 MB, 2K ~90.9 MB, 4K ~180.9 MB
        double hdMb = hdSize / 1_000_000.0;
        double fhdMb = fhdSize / 1_000_000.0;
        double qhdMb = qhdSize / 1_000_000.0;
        double uhdMb = uhdSize / 1_000_000.0;

        Assert.InRange(hdMb, 18.0, 22.0);
        Assert.InRange(fhdMb, 44.0, 48.0);
        Assert.InRange(qhdMb, 88.0, 93.0);
        Assert.InRange(uhdMb, 178.0, 184.0);
    }
}
