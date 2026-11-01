using System;
using System.Collections.Generic;
using System.Text.Json;
using ITB_SCREEN_RECORDER.Player.Core.Ingestion;
using ITB_SCREEN_RECORDER.Player.Core.Topology;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Player;

public class MultiDisplayPlayerTopologyTests
{
    [Fact]
    public void StationTopologyCalculator_SideBySideDualMonitors_ComputesProperBoundingAndOffsets()
    {
        var disp0 = new DisplayGeometry
        {
            Hostname = "STATION-NOC-01",
            DisplayId = "mon-0",
            MonitorIndex = 0,
            IsPrimary = true,
            Width = 1920,
            Height = 1080,
            X = 0,
            Y = 0
        };

        var disp1 = new DisplayGeometry
        {
            Hostname = "STATION-NOC-01",
            DisplayId = "mon-1",
            MonitorIndex = 1,
            IsPrimary = false,
            Width = 1920,
            Height = 1080,
            X = 1920,
            Y = 0
        };

        var res = StationTopologyCalculator.Calculate(new[] { disp0, disp1 });

        Assert.Equal(3840, res.BoundingWidth);
        Assert.Equal(1080, res.BoundingHeight);
        Assert.Equal(0, disp0.CanvasLeft);
        Assert.Equal(0, disp0.CanvasTop);
        Assert.Equal(1920, disp1.CanvasLeft);
        Assert.Equal(0, disp1.CanvasTop);
    }

    [Fact]
    public void StationTopologyCalculator_VerticalStackedMonitors_ComputesProperBounding()
    {
        var disp0 = new DisplayGeometry
        {
            Hostname = "STATION-NOC-02",
            DisplayId = "mon-0",
            MonitorIndex = 0,
            IsPrimary = true,
            Width = 1920,
            Height = 1080,
            X = 0,
            Y = 0
        };

        var disp1 = new DisplayGeometry
        {
            Hostname = "STATION-NOC-02",
            DisplayId = "mon-1",
            MonitorIndex = 1,
            IsPrimary = false,
            Width = 1920,
            Height = 1080,
            X = 0,
            Y = 1080
        };

        var res = StationTopologyCalculator.Calculate(new[] { disp0, disp1 });

        Assert.Equal(1920, res.BoundingWidth);
        Assert.Equal(2160, res.BoundingHeight);
        Assert.Equal(0, disp1.CanvasLeft);
        Assert.Equal(1080, disp1.CanvasTop);
    }

    [Fact]
    public void StationTopologyCalculator_NegativeCoordinateOffsets_NormalizesZeroOrigin()
    {
        // Left-wing extended monitor with negative X coordinate (-1920)
        var dispLeft = new DisplayGeometry
        {
            Hostname = "STATION-LEFT-EXT",
            DisplayId = "mon-1",
            MonitorIndex = 1,
            IsPrimary = false,
            Width = 1920,
            Height = 1080,
            X = -1920,
            Y = 0
        };

        var dispPrimary = new DisplayGeometry
        {
            Hostname = "STATION-LEFT-EXT",
            DisplayId = "mon-0",
            MonitorIndex = 0,
            IsPrimary = true,
            Width = 1920,
            Height = 1080,
            X = 0,
            Y = 0
        };

        var res = StationTopologyCalculator.Calculate(new[] { dispLeft, dispPrimary });

        Assert.Equal(-1920, res.MinX);
        Assert.Equal(3840, res.BoundingWidth);
        Assert.Equal(0, dispLeft.CanvasLeft);
        Assert.Equal(1920, dispPrimary.CanvasLeft);
    }

    [Fact]
    public void PlayerPackageManifest_Deserialization_PreservesAllDisplayProperties()
    {
        string manifestJson = @"{
  ""sessionId"": ""DISCRETE-MULTI-DISPLAY-TEST"",
  ""rangeStartUtc"": ""2026-11-01T10:00:00Z"",
  ""rangeEndUtc"": ""2026-11-01T10:05:00Z"",
  ""originalDurationSeconds"": 300.0,
  ""exportedDurationSeconds"": 300.0,
  ""tracks"": [
    {
      ""hostname"": ""STATION-ALPHA"",
      ""videoFileName"": ""STATION-ALPHA_mon-0.mp4"",
      ""startOffsetMs"": 0,
      ""durationMs"": 300000,
      ""hasAudio"": true,
      ""displayId"": ""mon-0"",
      ""isPrimary"": true,
      ""width"": 1920,
      ""height"": 1080,
      ""x"": 0,
      ""y"": 0
    },
    {
      ""hostname"": ""STATION-ALPHA"",
      ""videoFileName"": ""STATION-ALPHA_mon-1.mp4"",
      ""startOffsetMs"": 0,
      ""durationMs"": 300000,
      ""hasAudio"": false,
      ""displayId"": ""mon-1"",
      ""isPrimary"": false,
      ""width"": 2560,
      ""height"": 1440,
      ""x"": 1920,
      ""y"": 0
    }
  ]
}";

        var manifest = JsonSerializer.Deserialize<PlayerPackageManifest>(manifestJson);
        Assert.NotNull(manifest);
        Assert.Equal(2, manifest.Tracks.Count);

        var t0 = manifest.Tracks[0];
        Assert.Equal("STATION-ALPHA", t0.Hostname);
        Assert.Equal("mon-0", t0.DisplayId);
        Assert.True(t0.IsPrimary);
        Assert.Equal(1920, t0.Width);
        Assert.Equal(1080, t0.Height);
        Assert.Equal(0, t0.X);
        Assert.Equal(0, t0.Y);

        var t1 = manifest.Tracks[1];
        Assert.Equal("STATION-ALPHA", t1.Hostname);
        Assert.Equal("mon-1", t1.DisplayId);
        Assert.False(t1.IsPrimary);
        Assert.Equal(2560, t1.Width);
        Assert.Equal(1440, t1.Height);
        Assert.Equal(1920, t1.X);
        Assert.Equal(0, t1.Y);
    }
}
