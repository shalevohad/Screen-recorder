using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Player.Core.Ingestion;
using ITB_SCREEN_RECORDER.Player.Core.Presentation;
using Moq;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Player;

public class PlayerPresentationPlanAndExportTests
{
    [Fact]
    public void PresentationDirectorPlan_SaveAndLoad_RoundtripsSuccessfully()
    {
        string tempFile = Path.Combine(Path.GetTempPath(), $"director_test_{Guid.NewGuid():N}.itblayout");

        try
        {
            var plan = new PresentationDirectorPlan
            {
                Title = "Incident Investigation Alpha",
                InitialLayoutMode = "Pip",
                InitialHeroTrackIndex = 1,
                InitialPipTrackIndex = 0,
                InitialSplitTrackIndices = new List<int> { 0, 1, 2 },
                Cues = new List<PresentationCue>
                {
                    new()
                    {
                        OffsetSeconds = 0.0,
                        Action = "SetPipHero",
                        LayoutMode = "Pip",
                        TargetTrackIndex = 1,
                        TargetHostname = "WS-01",
                        TargetDisplayId = "mon-1",
                        SecondaryTrackIndex = 0,
                        Description = "Hero set to secondary monitor"
                    },
                    new()
                    {
                        OffsetSeconds = 14.5,
                        Action = "SwapPip",
                        LayoutMode = "Pip",
                        TargetTrackIndex = 0,
                        TargetHostname = "WS-01",
                        TargetDisplayId = "mon-0",
                        SecondaryTrackIndex = 1,
                        Description = "Swapped to primary monitor"
                    },
                    new()
                    {
                        OffsetSeconds = 30.0,
                        Action = "SwitchLayout",
                        LayoutMode = "Split",
                        TargetTrackIndex = 0,
                        TargetHostname = "WS-01",
                        TargetDisplayId = "mon-0",
                        Description = "Switched to dual split view"
                    }
                }
            };

            plan.SaveToFile(tempFile);
            Assert.True(File.Exists(tempFile));

            var loaded = PresentationDirectorPlan.LoadFromFile(tempFile);

            Assert.Equal(plan.Title, loaded.Title);
            Assert.Equal("Pip", loaded.InitialLayoutMode);
            Assert.Equal(1, loaded.InitialHeroTrackIndex);
            Assert.Equal(0, loaded.InitialPipTrackIndex);
            Assert.Equal(3, loaded.InitialSplitTrackIndices.Count);
            Assert.Equal(3, loaded.Cues.Count);
            Assert.Equal(14.5, loaded.Cues[1].OffsetSeconds);
            Assert.Equal("SwapPip", loaded.Cues[1].Action);
            Assert.Equal("Split", loaded.Cues[2].LayoutMode);
        }
        finally
        {
            if (File.Exists(tempFile))
            {
                try { File.Delete(tempFile); } catch { }
            }
        }
    }

    [Fact]
    public void PlayerTrackInfo_IsDirectorCut_DeserializationAndFlagCheck()
    {
        string json = @"
        {
            ""hostname"": ""STATION-01"",
            ""videoFileName"": ""recordings/station01_director.mp4"",
            ""displayId"": ""director"",
            ""isPrimary"": true,
            ""isDirectorCut"": true,
            ""width"": 1920,
            ""height"": 1080
        }";

        var track = JsonSerializer.Deserialize<PlayerTrackInfo>(json);

        Assert.NotNull(track);
        Assert.Equal("STATION-01", track.Hostname);
        Assert.Equal("director", track.DisplayId);
        Assert.True(track.IsPrimary);
        Assert.True(track.IsDirectorCut);
        Assert.Equal(1920, track.Width);
        Assert.Equal(1080, track.Height);
    }

    [Fact]
    public async Task MasterVideoExportService_ThrowsOnNullArguments()
    {
        var service = new MasterVideoExportService();

        await Assert.ThrowsAsync<ArgumentNullException>(() =>
            service.ExportMasterVideoAsync(null!, new PresentationDirectorPlan(), "output.mp4"));

        var mockTar = new Mock<ITarVirtualFileSystem>();
        await Assert.ThrowsAsync<ArgumentNullException>(() =>
            service.ExportMasterVideoAsync(mockTar.Object, null!, "output.mp4"));

        await Assert.ThrowsAsync<ArgumentException>(() =>
            service.ExportMasterVideoAsync(mockTar.Object, new PresentationDirectorPlan(), ""));
    }

    [Fact]
    public async Task MasterVideoExportService_ThrowsOnEmptyManifestTracks()
    {
        var service = new MasterVideoExportService();
        var mockTar = new Mock<ITarVirtualFileSystem>();
        var manifest = new PlayerPackageManifest
        {
            SessionId = "test-session",
            Tracks = new List<PlayerTrackInfo>() // Empty tracks
        };
        mockTar.Setup(t => t.Manifest).Returns(manifest);

        var plan = new PresentationDirectorPlan();

        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            service.ExportMasterVideoAsync(mockTar.Object, plan, "output.mp4"));
    }
}
