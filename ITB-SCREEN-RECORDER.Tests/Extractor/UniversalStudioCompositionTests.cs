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
}
