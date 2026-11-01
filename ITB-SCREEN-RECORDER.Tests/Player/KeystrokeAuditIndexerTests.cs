using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Player.Core.Keystrokes;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Player;

public class KeystrokeAuditIndexerTests
{
    private const string SampleSrt = @"1
00:00:01,500 --> 00:00:03,000
[Ctrl+C] Copied confidential_report.docx

2
00:00:05,000 --> 00:00:07,500
User typed: git status

3
00:00:10,200 --> 00:00:12,800
[Enter] Executed deployment script
";

    [Fact]
    public async Task IngestSrtStreamAsync_ParsesCuesAccurately_AndDetectsHotkeys()
    {
        var indexer = new KeystrokeAuditIndexer();
        using var stream = new MemoryStream(Encoding.UTF8.GetBytes(SampleSrt));

        await indexer.IngestSrtStreamAsync("WS-01", stream);

        Assert.Equal(3, indexer.TotalCueCount);

        var cues = indexer.GetAllCues("WS-01");
        Assert.Equal(3, cues.Count);

        // Cue 1
        Assert.Equal(1, cues[0].Index);
        Assert.Equal(TimeSpan.FromMilliseconds(1500), cues[0].StartTime);
        Assert.Equal(TimeSpan.FromMilliseconds(3000), cues[0].EndTime);
        Assert.Contains("confidential_report", cues[0].Text);
        Assert.True(cues[0].IsShortcutOrControlKey);

        // Cue 2
        Assert.Equal(2, cues[1].Index);
        Assert.Equal(TimeSpan.FromMilliseconds(5000), cues[1].StartTime);
        Assert.False(cues[1].IsShortcutOrControlKey);

        // Cue 3
        Assert.Equal(3, cues[2].Index);
        Assert.True(cues[2].IsShortcutOrControlKey);
    }

    [Fact]
    public async Task Search_FindsKeywords_CaseInsensitive()
    {
        var indexer = new KeystrokeAuditIndexer();
        using var stream1 = new MemoryStream(Encoding.UTF8.GetBytes(SampleSrt));
        await indexer.IngestSrtStreamAsync("WS-01", stream1);

        var results = indexer.Search("CONFIDENTIAL");
        Assert.Single(results);
        Assert.Equal(1, results[0].Index);

        var gitResults = indexer.Search("git");
        Assert.Single(gitResults);
        Assert.Equal(2, gitResults[0].Index);

        var noMatch = indexer.Search("nonexistent_token");
        Assert.Empty(noMatch);
    }

    [Fact]
    public async Task GetCuesAtTime_ReturnsActiveCues_ForGivenTimestamp()
    {
        var indexer = new KeystrokeAuditIndexer();
        using var stream = new MemoryStream(Encoding.UTF8.GetBytes(SampleSrt));
        await indexer.IngestSrtStreamAsync("WS-01", stream);

        // At 00:00:02.000 -> within Cue 1 (1.5s to 3.0s)
        var cuesAt2s = indexer.GetCuesAtTime(TimeSpan.FromSeconds(2));
        Assert.Single(cuesAt2s);
        Assert.Equal(1, cuesAt2s[0].Index);

        // At 00:00:04.000 -> in between Cue 1 and Cue 2
        var cuesAt4s = indexer.GetCuesAtTime(TimeSpan.FromSeconds(4));
        Assert.Empty(cuesAt4s);

        // At 00:00:06.000 -> within Cue 2 (5.0s to 7.5s)
        var cuesAt6s = indexer.GetCuesAtTime(TimeSpan.FromSeconds(6));
        Assert.Single(cuesAt6s);
        Assert.Equal(2, cuesAt6s[0].Index);
    }
}
