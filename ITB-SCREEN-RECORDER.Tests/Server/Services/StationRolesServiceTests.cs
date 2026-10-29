namespace ITB_SCREEN_RECORDER.Tests.Server.Services;

using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Moq;
using Xunit;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using ITB_SCREEN_RECORDER.Server.Services;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;

public class StationRolesServiceTests
{
    [Fact]
    public async Task ExportMappingCsvAsync_IncludesAllKnownStations_AndWritesDefaultWhenAliasIsEmpty()
    {
        var repoMock = new Mock<ICatalogRepository>();
        var telemetryMock = new Mock<ITelemetryStateService>();

        // Repository returns some roles and known stations
        repoMock.Setup(r => r.GetAllStationRoleAliasesAsync())
            .ReturnsAsync(new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
            {
                ["STATION-ALPHA"] = "Radar North"
            });

        repoMock.Setup(r => r.GetAllKnownStationHostnamesAsync())
            .ReturnsAsync(new HashSet<string>(StringComparer.OrdinalIgnoreCase)
            {
                "STATION-ALPHA",
                "STATION-BETA" // Has no role
            });

        // Telemetry state has an active station not yet in catalog
        telemetryMock.Setup(t => t.GetAllAgents())
            .Returns(new List<AgentTelemetryReport>
            {
                new AgentTelemetryReport { Hostname = "STATION-GAMMA" }
            });

        var service = new StationRolesService(repoMock.Object, telemetryMock.Object);

        var bytes = await service.ExportMappingCsvAsync();
        string csv = Encoding.UTF8.GetString(bytes);

        var lines = csv.Split(new[] { "\r\n", "\n" }, StringSplitOptions.RemoveEmptyEntries);
        Assert.Equal("Hostname,RoleAlias", lines[0]);
        Assert.Contains("STATION-ALPHA,Radar North", lines);
        Assert.Contains("STATION-BETA,Default", lines);
        Assert.Contains("STATION-GAMMA,Default", lines);
    }

    [Fact]
    public async Task PreviewCsvMappingAsync_NormalizesDefaultToNullWithoutConflict()
    {
        var repoMock = new Mock<ICatalogRepository>();
        repoMock.Setup(r => r.GetAllStationRoleAliasesAsync())
            .ReturnsAsync(new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
            {
                ["STATION-ALPHA"] = "Radar North"
            });

        var service = new StationRolesService(repoMock.Object);

        string csvContent = "Hostname,RoleAlias\r\nSTATION-ALPHA,Default\r\nSTATION-BETA,Default\r\nSTATION-GAMMA,Radar South\r\n";
        using var ms = new MemoryStream(Encoding.UTF8.GetBytes(csvContent));

        var diff = await service.PreviewCsvMappingAsync(ms);

        Assert.Equal(3, diff.Count);

        var itemAlpha = diff.FirstOrDefault(d => d.Hostname == "STATION-ALPHA");
        Assert.NotNull(itemAlpha);
        Assert.Null(itemAlpha.NewRoleAlias); // Default normalized to null
        Assert.True(itemAlpha.HasChanged); // from "Radar North" to null
        Assert.Null(itemAlpha.ConflictWith); // No collision with other "Default" stations

        var itemBeta = diff.FirstOrDefault(d => d.Hostname == "STATION-BETA");
        Assert.NotNull(itemBeta);
        Assert.Null(itemBeta.NewRoleAlias);
        Assert.Null(itemBeta.ConflictWith);

        var itemGamma = diff.FirstOrDefault(d => d.Hostname == "STATION-GAMMA");
        Assert.NotNull(itemGamma);
        Assert.Equal("Radar South", itemGamma.NewRoleAlias);
        Assert.Null(itemGamma.ConflictWith);
    }

    [Fact]
    public async Task SetRoleAliasAsync_WhenSetToDefault_ClearsRoleAlias()
    {
        var repoMock = new Mock<ICatalogRepository>();
        repoMock.Setup(r => r.GetAllStationRoleAliasesAsync())
            .ReturnsAsync(new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase));

        var service = new StationRolesService(repoMock.Object);

        await service.SetRoleAliasAsync("STATION-ALPHA", "Default");

        repoMock.Verify(r => r.SetStationRoleAliasAsync("STATION-ALPHA", null), Times.Once);
    }
}
