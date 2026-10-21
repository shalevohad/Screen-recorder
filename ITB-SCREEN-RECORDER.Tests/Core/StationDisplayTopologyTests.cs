using System;
using System.Collections.Generic;
using System.Text.Json;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Core.Contracts.Topology;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Core;

public class StationDisplayTopologyTests
{
    [Fact]
    public void StationDisplayTopologyDto_SerializationRoundTrip_PreservesAllProperties()
    {
        var topology = new StationDisplayTopologyDto
        {
            Hostname = "STATION-TACTICAL-01",
            TimestampEpochMs = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds(),
            VirtualDesktopBounds = new DesktopBoundsDto { X = -1920, Y = 0, Width = 4480, Height = 1440 },
            Displays = new List<DisplayMetadataDto>
            {
                new DisplayMetadataDto
                {
                    DisplayId = "mon-0",
                    DisplayName = @"\\.\DISPLAY1",
                    AdapterLuid = "0x1234",
                    AdapterName = "NVIDIA GeForce RTX 4080",
                    Width = 2560,
                    Height = 1440,
                    RefreshRateHz = 144,
                    TargetFps = 30,
                    IsPrimary = true,
                    X = 0,
                    Y = 0
                },
                new DisplayMetadataDto
                {
                    DisplayId = "mon-1",
                    DisplayName = @"\\.\DISPLAY2",
                    AdapterLuid = "0x5678",
                    AdapterName = "Intel UHD Graphics 770",
                    Width = 1920,
                    Height = 1080,
                    RefreshRateHz = 60,
                    TargetFps = 30,
                    IsPrimary = false,
                    X = -1920,
                    Y = 0
                }
            }
        };

        var json = JsonSerializer.Serialize(topology, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
        var deserialized = JsonSerializer.Deserialize<StationDisplayTopologyDto>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        Assert.NotNull(deserialized);
        Assert.Equal("STATION-TACTICAL-01", deserialized.Hostname);
        Assert.Equal(2, deserialized.Displays.Count);
        Assert.Equal(-1920, deserialized.VirtualDesktopBounds.X);
        Assert.Equal(4480, deserialized.VirtualDesktopBounds.Width);

        var primary = deserialized.Displays[0];
        Assert.Equal("mon-0", primary.DisplayId);
        Assert.True(primary.IsPrimary);
        Assert.Equal(2560, primary.Width);
        Assert.Equal(1440, primary.Height);
        Assert.Equal(0, primary.X);
        Assert.Equal("NVIDIA GeForce RTX 4080", primary.AdapterName);

        var secondary = deserialized.Displays[1];
        Assert.Equal("mon-1", secondary.DisplayId);
        Assert.False(secondary.IsPrimary);
        Assert.Equal(1920, secondary.Width);
        Assert.Equal(-1920, secondary.X);
        Assert.Equal("Intel UHD Graphics 770", secondary.AdapterName);
    }

    [Fact]
    public void AgentTelemetryReport_WithDisplayTopology_SerializesCorrectly()
    {
        var report = new AgentTelemetryReport
        {
            Hostname = "WORKSTATION-A",
            Status = AgentStatus.Streaming,
            DisplayTopology = new StationDisplayTopologyDto
            {
                Hostname = "WORKSTATION-A",
                VirtualDesktopBounds = new DesktopBoundsDto { X = 0, Y = 0, Width = 1920, Height = 1080 },
                Displays = new List<DisplayMetadataDto>
                {
                    new DisplayMetadataDto
                    {
                        DisplayId = "mon-0",
                        Width = 1920,
                        Height = 1080,
                        IsPrimary = true,
                        X = 0,
                        Y = 0
                    }
                }
            }
        };

        var json = JsonSerializer.Serialize(report, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
        var deserialized = JsonSerializer.Deserialize<AgentTelemetryReport>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        Assert.NotNull(deserialized);
        Assert.NotNull(deserialized.DisplayTopology);
        Assert.Single(deserialized.DisplayTopology.Displays);
        Assert.Equal("mon-0", deserialized.DisplayTopology.Displays[0].DisplayId);
        Assert.True(deserialized.DisplayTopology.Displays[0].IsPrimary);
    }

    [Fact]
    public void LinuxDisplayTopology_BuildTopologyDto_ReturnsValidTopologyStructure()
    {
        var topology = ITB_SCREEN_RECORDER.AgentWorker.Providers.Video.LinuxX11DisplayEnumerator.BuildTopologyDto("LINUX-STATION-01");
        Assert.NotNull(topology);
        Assert.Equal("LINUX-STATION-01", topology.Hostname);
        Assert.NotNull(topology.VirtualDesktopBounds);
        Assert.True(topology.VirtualDesktopBounds.Width > 0);
        Assert.True(topology.VirtualDesktopBounds.Height > 0);
        Assert.NotNull(topology.Displays);
    }
}
