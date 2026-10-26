using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Core.Contracts.Topology;
using ITB_SCREEN_RECORDER.Server.Controllers;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using ITB_SCREEN_RECORDER.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Moq;
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
            AudioCarrierDisplayId = "mon-0",
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
                    HasAudio = true,
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
                    HasAudio = false,
                    X = -1920,
                    Y = 0
                }
            }
        };

        var json = JsonSerializer.Serialize(topology, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
        var deserialized = JsonSerializer.Deserialize<StationDisplayTopologyDto>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        Assert.NotNull(deserialized);
        Assert.Equal("STATION-TACTICAL-01", deserialized.Hostname);
        Assert.Equal("mon-0", deserialized.AudioCarrierDisplayId);
        Assert.Equal(2, deserialized.Displays.Count);
        Assert.Equal(-1920, deserialized.VirtualDesktopBounds.X);
        Assert.Equal(4480, deserialized.VirtualDesktopBounds.Width);

        var primary = deserialized.Displays[0];
        Assert.Equal("mon-0", primary.DisplayId);
        Assert.True(primary.IsPrimary);
        Assert.True(primary.HasAudio);
        Assert.Equal(2560, primary.Width);
        Assert.Equal(1440, primary.Height);
        Assert.Equal(0, primary.X);
        Assert.Equal("NVIDIA GeForce RTX 4080", primary.AdapterName);

        var secondary = deserialized.Displays[1];
        Assert.Equal("mon-1", secondary.DisplayId);
        Assert.False(secondary.IsPrimary);
        Assert.False(secondary.HasAudio);
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

    [Fact]
    public async Task DashboardController_GetStationsSummary_PreservesExactAgentTopologyWithoutSyntheticMutation()
    {
        // 1. Arrange an agent with non-linear multi-monitor topology:
        //    - mon-0 (Primary): 1920x1080 at (0, 0)
        //    - mon-1 (Portrait): 1080x1920 at (1920, 0) -> Height > Width
        //    - mon-2 (Stacked vertical above): 1920x1080 at (0, -1080) -> Negative Y
        //    - mon-3 (Left wing extended): 1920x1080 at (-1920, 0) -> Negative X
        var agent = new AgentTelemetryReport
        {
            Hostname = "NOC-TACTICAL-01",
            Timestamp = DateTime.UtcNow,
            IsStreaming = true,
            DisplayTopology = new StationDisplayTopologyDto
            {
                Hostname = "NOC-TACTICAL-01",
                VirtualDesktopBounds = new DesktopBoundsDto { X = -1920, Y = -1080, Width = 4920, Height = 3000 },
                Displays = new List<DisplayMetadataDto>
                {
                    new DisplayMetadataDto { DisplayId = "mon-0", X = 0, Y = 0, Width = 1920, Height = 1080, IsPrimary = true },
                    new DisplayMetadataDto { DisplayId = "mon-1", X = 1920, Y = 0, Width = 1080, Height = 1920, IsPrimary = false },
                    new DisplayMetadataDto { DisplayId = "mon-2", X = 0, Y = -1080, Width = 1920, Height = 1080, IsPrimary = false },
                    new DisplayMetadataDto { DisplayId = "mon-3", X = -1920, Y = 0, Width = 1920, Height = 1080, IsPrimary = false }
                }
            }
        };

        var telemetryMock = new Mock<ITelemetryStateService>();
        telemetryMock.Setup(t => t.GetAllAgents()).Returns(new List<AgentTelemetryReport> { agent });

        var catalogMock = new Mock<ICatalogRepository>();
        catalogMock.Setup(c => c.GetAllStationRoleAliasesAsync())
            .ReturnsAsync(new Dictionary<string, string>());

        var configOptions = Mock.Of<IOptionsMonitor<SystemConfig>>(m => m.CurrentValue == new SystemConfig
        {
            MediaMtx = new MediaMtxSettings { HlsPort = 8888 }
        });

        var controller = new DashboardController(
            telemetryMock.Object,
            null!,
            null!,
            catalogMock.Object,
            configOptions
        );

        var httpContext = new DefaultHttpContext();
        httpContext.Request.Host = new HostString("10.0.0.1:5000");
        httpContext.Request.Scheme = "https";
        controller.ControllerContext = new ControllerContext { HttpContext = httpContext };

        // 2. Act
        var result = await controller.GetStationsSummary();
        var okResult = Assert.IsType<OkObjectResult>(result);

        // 3. Assert: Deserialize returned anonymous structure and verify NO synthetic side-by-side rewriting occurred
        var json = JsonSerializer.Serialize(okResult.Value, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;
        Assert.Equal(JsonValueKind.Array, root.ValueKind);
        Assert.Equal(1, root.GetArrayLength());

        var station = root[0];
        Assert.Equal("NOC-TACTICAL-01", station.GetProperty("hostname").GetString());

        var displays = station.GetProperty("displays");
        Assert.Equal(4, displays.GetArrayLength());

        // mon-0 (Primary center):
        var d0 = displays[0];
        Assert.Equal("mon-0", d0.GetProperty("displayId").GetString());
        Assert.Equal(0, d0.GetProperty("x").GetInt32());
        Assert.Equal(0, d0.GetProperty("y").GetInt32());
        Assert.Equal(1920, d0.GetProperty("width").GetInt32());
        Assert.Equal(1080, d0.GetProperty("height").GetInt32());

        // mon-1 (Portrait right): height MUST be 1920, width 1080
        var d1 = displays[1];
        Assert.Equal("mon-1", d1.GetProperty("displayId").GetString());
        Assert.Equal(1920, d1.GetProperty("x").GetInt32());
        Assert.Equal(0, d1.GetProperty("y").GetInt32());
        Assert.Equal(1080, d1.GetProperty("width").GetInt32());
        Assert.Equal(1920, d1.GetProperty("height").GetInt32());

        // mon-2 (Stacked top): Y MUST be -1080 (never overwritten to 0 or side-by-side)
        var d2 = displays[2];
        Assert.Equal("mon-2", d2.GetProperty("displayId").GetString());
        Assert.Equal(0, d2.GetProperty("x").GetInt32());
        Assert.Equal(-1080, d2.GetProperty("y").GetInt32());
        Assert.Equal(1920, d2.GetProperty("width").GetInt32());
        Assert.Equal(1080, d2.GetProperty("height").GetInt32());

        // mon-3 (Left wing): X MUST be -1920 (never forced to positive offset)
        var d3 = displays[3];
        Assert.Equal("mon-3", d3.GetProperty("displayId").GetString());
        Assert.Equal(-1920, d3.GetProperty("x").GetInt32());
        Assert.Equal(0, d3.GetProperty("y").GetInt32());
    }

    [Fact]
    public async Task TelemetryStateService_ProcessHeartbeat_PreservesExistingTopologyWhenSubsequentHeartbeatOmitsIt()
    {
        var configOptions = Mock.Of<IOptionsMonitor<SystemConfig>>(m => m.CurrentValue == new SystemConfig());
        var syncManager = new OfflineSyncManager();
        var service = new TelemetryStateService(configOptions, null!, null!, syncManager);

        // Heartbeat 1: Agent reports arbitrary 3-display topology (stacked & portrait)
        var report1 = new AgentTelemetryReport
        {
            Hostname = "STATION-FIELD-01",
            Status = AgentStatus.Streaming,
            IsStreaming = true,
            DisplayTopology = new StationDisplayTopologyDto
            {
                Hostname = "STATION-FIELD-01",
                VirtualDesktopBounds = new DesktopBoundsDto { X = 0, Y = -1080, Width = 3000, Height = 3000 },
                Displays = new List<DisplayMetadataDto>
                {
                    new DisplayMetadataDto { DisplayId = "mon-0", X = 0, Y = 0, Width = 1920, Height = 1080, IsPrimary = true },
                    new DisplayMetadataDto { DisplayId = "mon-1", X = 1920, Y = 0, Width = 1080, Height = 1920, IsPrimary = false },
                    new DisplayMetadataDto { DisplayId = "mon-2", X = 0, Y = -1080, Width = 1920, Height = 1080, IsPrimary = false }
                }
            }
        };

        await service.ProcessHeartbeatAsync(report1, "127.0.0.1");

        var agents1 = service.GetAllAgents().ToList();
        Assert.Single(agents1);
        Assert.NotNull(agents1[0].DisplayTopology);
        Assert.Equal(3, agents1[0].DisplayTopology!.Displays.Count);

        // Heartbeat 2: Routine keep-alive heartbeat with DisplayTopology == null
        var report2 = new AgentTelemetryReport
        {
            Hostname = "STATION-FIELD-01",
            Status = AgentStatus.Streaming,
            IsStreaming = true,
            DisplayTopology = null // Not resent every tick to conserve bandwidth
        };

        await service.ProcessHeartbeatAsync(report2, "127.0.0.1");

        var agents2 = service.GetAllAgents().ToList();
        Assert.Single(agents2);
        var topology2 = agents2[0].DisplayTopology;
        Assert.NotNull(topology2);
        Assert.Equal(3, topology2.Displays.Count);
        Assert.Equal(1080, topology2.Displays[1].Width);
        Assert.Equal(1920, topology2.Displays[1].Height);
        Assert.Equal(-1080, topology2.Displays[2].Y);

        // Heartbeat 3: Hot-plug event modifies topology to 4 displays
        var report3 = new AgentTelemetryReport
        {
            Hostname = "STATION-FIELD-01",
            Status = AgentStatus.Streaming,
            IsStreaming = true,
            DisplayTopology = new StationDisplayTopologyDto
            {
                Hostname = "STATION-FIELD-01",
                VirtualDesktopBounds = new DesktopBoundsDto { X = -1920, Y = -1080, Width = 4920, Height = 3000 },
                Displays = new List<DisplayMetadataDto>
                {
                    new DisplayMetadataDto { DisplayId = "mon-0", X = 0, Y = 0, Width = 1920, Height = 1080, IsPrimary = true },
                    new DisplayMetadataDto { DisplayId = "mon-1", X = 1920, Y = 0, Width = 1080, Height = 1920, IsPrimary = false },
                    new DisplayMetadataDto { DisplayId = "mon-2", X = 0, Y = -1080, Width = 1920, Height = 1080, IsPrimary = false },
                    new DisplayMetadataDto { DisplayId = "mon-3", X = -1920, Y = 0, Width = 1920, Height = 1080, IsPrimary = false }
                }
            }
        };

        await service.ProcessHeartbeatAsync(report3, "127.0.0.1");

        var agents3 = service.GetAllAgents().ToList();
        Assert.Single(agents3);
        var topology3 = agents3[0].DisplayTopology;
        Assert.NotNull(topology3);
        Assert.Equal(4, topology3.Displays.Count);
        Assert.Equal(-1920, topology3.Displays[3].X);
    }


    [Fact]
    public void WorkerIpcJson_WithComplexNonLinearTopology_DeserializesProperly()
    {
        string rawIpcJson = @"
        {
            ""isStreaming"": true,
            ""isRecording"": true,
            ""displayTopology"": {
                ""hostname"": ""STATION-IPC-01"",
                ""virtualDesktopBounds"": { ""x"": -1920, ""y"": -1080, ""width"": 4920, ""height"": 3000 },
                ""displays"": [
                    { ""displayId"": ""mon-0"", ""x"": 0, ""y"": 0, ""width"": 1920, ""height"": 1080, ""isPrimary"": true },
                    { ""displayId"": ""mon-1"", ""x"": 1920, ""y"": 0, ""width"": 1080, ""height"": 1920, ""isPrimary"": false },
                    { ""displayId"": ""mon-2"", ""x"": 0, ""y"": -1080, ""width"": 1920, ""height"": 1080, ""isPrimary"": false }
                ]
            }
        }";

        var jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        using var doc = JsonDocument.Parse(rawIpcJson);
        var topologyElement = doc.RootElement.GetProperty("displayTopology");
        var topology = JsonSerializer.Deserialize<StationDisplayTopologyDto>(topologyElement.GetRawText(), jsonOptions);

        Assert.NotNull(topology);
        Assert.Equal("STATION-IPC-01", topology.Hostname);
        Assert.Equal(3, topology.Displays.Count);
        Assert.Equal(1080, topology.Displays[1].Width);
        Assert.Equal(1920, topology.Displays[1].Height);
        Assert.Equal(-1080, topology.Displays[2].Y);
    }
}

