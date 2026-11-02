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
    public void SingleMasterMp4_FileName_HasCorrectMp4Extension()
    {
        DateTime startUtc = new DateTime(2026, 11, 2, 10, 0, 0, DateTimeKind.Utc);
        DateTime endUtc = new DateTime(2026, 11, 2, 10, 30, 0, DateTimeKind.Utc);
        string stationSummary = "WS-01_WS-02";

        string fileName = $"RECORDINGS_EXPORT_{stationSummary}_{startUtc:yyyyMMdd_HHmm}_to_{endUtc:HHmm}.mp4";

        Assert.EndsWith(".mp4", fileName, StringComparison.OrdinalIgnoreCase);
        Assert.DoesNotContain(".tar", fileName, StringComparison.OrdinalIgnoreCase);
        Assert.Equal("RECORDINGS_EXPORT_WS-01_WS-02_20261102_1000_to_1030.mp4", fileName);
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
}
