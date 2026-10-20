using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;
using ITB_SCREEN_RECORDER.Server.Services;
using Moq;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Server.Storage;

public class KeystrokeSrtGeneratorTests
{
    [Theory]
    [InlineData(0, "00:00:00,000")]
    [InlineData(1500, "00:00:01,500")]
    [InlineData(65432, "00:01:05,432")]
    [InlineData(3661005, "01:01:01,005")]
    public void FormatSrtTimestamp_FormatsCorrectly(long ms, string expected)
    {
        string formatted = KeystrokeSrtGenerator.FormatSrtTimestamp(ms);
        Assert.Equal(expected, formatted);
    }

    [Theory]
    [InlineData(0, "0:00:00.00")]
    [InlineData(1500, "0:00:01.50")]
    [InlineData(65430, "0:01:05.43")]
    public void FormatAssTimestamp_FormatsCorrectly(long ms, string expected)
    {
        string formatted = KeystrokeSrtGenerator.FormatAssTimestamp(ms);
        Assert.Equal(expected, formatted);
    }

    [Fact]
    public async Task CreateSrtFileAsync_GeneratesWellFormedSrtFile()
    {
        var mockRepo = new Mock<IKeystrokeRepository>();
        long baseEpoch = 1700000000000;
        IReadOnlyList<KeystrokeEventDto> keys = new List<KeystrokeEventDto>
        {
            new() { EpochMs = baseEpoch + 1000, KeyCombination = "Ctrl + C" },
            new() { EpochMs = baseEpoch + 3500, KeyCombination = "Ctrl + V" }
        };

        mockRepo.Setup(r => r.GetKeystrokesForWindowAsync("station-1", baseEpoch, baseEpoch + 10000))
            .ReturnsAsync(keys);

        var generator = new KeystrokeSrtGenerator(mockRepo.Object);
        string? srtPath = await generator.CreateSrtFileAsync("station-1", baseEpoch, baseEpoch + 10000);

        Assert.NotNull(srtPath);
        Assert.True(File.Exists(srtPath));

        try
        {
            string content = await File.ReadAllTextAsync(srtPath);
            Assert.Contains("00:00:01,000 --> 00:00:03,000", content);
            Assert.Contains("[ Ctrl + C ]", content);
            Assert.Contains("00:00:03,500 --> 00:00:05,500", content);
            Assert.Contains("[ Ctrl + V ]", content);
        }
        finally
        {
            if (File.Exists(srtPath)) File.Delete(srtPath);
        }
    }

    [Fact]
    public async Task CreateSrtFileAsync_NoKeystrokes_ReturnsNull()
    {
        var mockRepo = new Mock<IKeystrokeRepository>();
        IReadOnlyList<KeystrokeEventDto> empty = new List<KeystrokeEventDto>();
        mockRepo.Setup(r => r.GetKeystrokesForWindowAsync("station-empty", 0, 10000))
            .ReturnsAsync(empty);

        var generator = new KeystrokeSrtGenerator(mockRepo.Object);
        string? srtPath = await generator.CreateSrtFileAsync("station-empty", 0, 10000);

        Assert.Null(srtPath);
    }

    [Fact]
    public async Task CreateAssKeycapsFileAsync_GeneratesValidAssHeaderAndDialogues()
    {
        var mockRepo = new Mock<IKeystrokeRepository>();
        long baseEpoch = 1700000000000;
        IReadOnlyList<KeystrokeEventDto> keys = new List<KeystrokeEventDto>
        {
            new() { EpochMs = baseEpoch + 2000, KeyCombination = "WIN + SHIFT + S" }
        };

        mockRepo.Setup(r => r.GetKeystrokesForWindowAsync("station-1", baseEpoch, baseEpoch + 10000))
            .ReturnsAsync(keys);

        var generator = new KeystrokeSrtGenerator(mockRepo.Object);
        string? assPath = await generator.CreateAssKeycapsFileAsync("station-1", baseEpoch, baseEpoch + 10000);

        Assert.NotNull(assPath);
        Assert.True(File.Exists(assPath));

        try
        {
            string content = await File.ReadAllTextAsync(assPath);
            Assert.Contains("[Script Info]", content);
            Assert.Contains("[V4+ Styles]", content);
            Assert.Contains("Dialogue: 0,", content);
            Assert.Contains("Dialogue: 1,", content);
            Assert.Contains("Dialogue: 2,", content);
            Assert.Contains("WIN", content);
            Assert.Contains("SHIFT", content);
            Assert.Contains("S", content);
        }
        finally
        {
            if (File.Exists(assPath)) File.Delete(assPath);
        }
    }

    [Theory]
    [InlineData("SHIFT + KEY(160)", "Shift")]
    [InlineData("CTRL + Key(162)", "Ctrl")]
    [InlineData("Shift + Shift", "Shift")]
    [InlineData("Ctrl + C", "Ctrl,C")]
    [InlineData("WIN + SHIFT + S", "Win,Shift,S")]
    public void ParseKeyCombination_NormalizesAndDeduplicates(string input, string expectedJoined)
    {
        var keys = KeystrokeSrtGenerator.ParseKeyCombination(input);
        Assert.Equal(expectedJoined, string.Join(",", keys));
    }

    [Fact]
    public async Task CreateAssKeycapsFileAsync_RapidKeystrokes_PreventsVerticalStacking()
    {
        var mockRepo = new Mock<IKeystrokeRepository>();
        long baseEpoch = 1700000000000;
        IReadOnlyList<KeystrokeEventDto> keys = new List<KeystrokeEventDto>
        {
            new() { EpochMs = baseEpoch + 1000, KeyCombination = "SHIFT + KEY(160)" },
            new() { EpochMs = baseEpoch + 1300, KeyCombination = "SHIFT + G" },
            new() { EpochMs = baseEpoch + 1800, KeyCombination = "SHIFT + F" }
        };

        mockRepo.Setup(r => r.GetKeystrokesForWindowAsync("station-rapid", baseEpoch, baseEpoch + 10000))
            .ReturnsAsync(keys);

        var generator = new KeystrokeSrtGenerator(mockRepo.Object);
        string? assPath = await generator.CreateAssKeycapsFileAsync("station-rapid", baseEpoch, baseEpoch + 10000);

        Assert.NotNull(assPath);
        Assert.True(File.Exists(assPath));

        try
        {
            string content = await File.ReadAllTextAsync(assPath);
            // Verify event 1 end time is cut at event 2 start time (0:00:01.30)
            Assert.Contains("0:00:01.00,0:00:01.30", content);
            // Verify event 2 end time is cut at event 3 start time (0:00:01.80)
            Assert.Contains("0:00:01.30,0:00:01.80", content);
            // Verify Shift + Key(160) was normalized to just SHIFT
            Assert.DoesNotContain("KEY(160)", content);
            Assert.Contains("SHIFT", content);
            Assert.Contains("G", content);
            Assert.Contains("F", content);
        }
        finally
        {
            if (File.Exists(assPath)) File.Delete(assPath);
        }
    }
}
