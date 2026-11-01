using System;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Player.Core.Audio;
using ITB_SCREEN_RECORDER.Player.Core.Ingestion;
using ITB_SCREEN_RECORDER.Player.Core.Keystrokes;
using ITB_SCREEN_RECORDER.Player.Core.Streaming;
using ITB_SCREEN_RECORDER.Player.Core.Synchronization;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Player;

public class PlayerEndToEndPipelineTests : IDisposable
{
    private readonly string _tempDir;
    private readonly string _tarPath;

    public PlayerEndToEndPipelineTests()
    {
        _tempDir = Path.Combine(Path.GetTempPath(), "itb_player_e2e_" + Guid.NewGuid().ToString("N"));
        Directory.CreateDirectory(_tempDir);
        _tarPath = Path.Combine(_tempDir, "session_package.tar");
    }

    public void Dispose()
    {
        try
        {
            if (Directory.Exists(_tempDir))
            {
                Directory.Delete(_tempDir, true);
            }
        }
        catch
        {
            // Ignore cleanup failure
        }
    }

    [Fact]
    public async Task FullPlaybackPipeline_IngestsStreamsSyncsAndMixesAccurately()
    {
        // 1. Create a synthetic package TAR
        var manifestJson = @"{
  ""sessionId"": ""SESSION-E2E-TEST"",
  ""rangeStartUtc"": ""2026-11-01T10:00:00Z"",
  ""rangeEndUtc"": ""2026-11-01T10:05:00Z"",
  ""originalDurationSeconds"": 300.0,
  ""exportedDurationSeconds"": 300.0,
  ""removedGlobalGaps"": [],
  ""stationGaps"": [
    {
      ""stationId"": ""WS-ALPHA"",
      ""startUtc"": ""2026-11-01T10:02:00Z"",
      ""endUtc"": ""2026-11-01T10:02:30Z"",
      ""durationSeconds"": 30.0,
      ""bridgeType"": ""NoSignal""
    }
  ],
  ""tracks"": [
    {
      ""hostname"": ""WS-ALPHA"",
      ""videoFileName"": ""track_0.mp4"",
      ""startOffsetMs"": 0,
      ""durationMs"": 300000,
      ""hasAudio"": true,
      ""audioChannels"": 2,
      ""displayId"": ""mon-0"",
      ""isPrimary"": true
    },
    {
      ""hostname"": ""WS-BETA"",
      ""videoFileName"": ""track_1.mp4"",
      ""startOffsetMs"": 0,
      ""durationMs"": 300000,
      ""hasAudio"": true,
      ""audioChannels"": 2,
      ""displayId"": ""mon-0"",
      ""isPrimary"": true
    }
  ]
}";

        var srtContent = @"1
00:00:01,000 --> 00:00:03,000
[Ctrl+Shift+Esc] Opened Task Manager

2
00:00:05,000 --> 00:00:08,000
User typed: kill process
";

        byte[] video0Bytes = new byte[1024];
        new Random(42).NextBytes(video0Bytes);

        byte[] video1Bytes = new byte[2048];
        new Random(84).NextBytes(video1Bytes);

        using (var fs = new FileStream(_tarPath, FileMode.Create, FileAccess.Write))
        {
            WriteTarBlock(fs, "session.json", Encoding.UTF8.GetBytes(manifestJson));
            WriteTarBlock(fs, "track_0.mp4", video0Bytes);
            WriteTarBlock(fs, "track_1.mp4", video1Bytes);
            WriteTarBlock(fs, "subtitles.srt", Encoding.UTF8.GetBytes(srtContent));
            fs.Write(new byte[1024]); // 2 zero blocks at end of tar
        }

        // 2. Virtual File System Ingestion
        using var vfs = new TarVirtualFileSystem();
        await vfs.OpenArchiveAsync(_tarPath);

        Assert.NotNull(vfs.Manifest);
        Assert.Equal("SESSION-E2E-TEST", vfs.Manifest.SessionId);
        Assert.Equal(4, vfs.Entries.Count);

        // 3. In-Process Loopback HTTP 206 Streaming Server
        using var server = new LoopbackHttpRangeServer();
        await server.StartAsync(vfs);
        Assert.True(server.IsRunning);

        using var httpClient = new HttpClient();
        string track0Url = server.GetTrackStreamUrl(0);
        string track1Url = server.GetTrackStreamUrl(1);

        // Fetch Track 0
        var res0 = await httpClient.GetAsync(track0Url);
        Assert.True(res0.IsSuccessStatusCode);
        byte[] downloaded0 = await res0.Content.ReadAsByteArrayAsync();
        Assert.Equal(video0Bytes, downloaded0);

        // Fetch Track 1 with Range Request
        var rangeReq = new HttpRequestMessage(HttpMethod.Get, track1Url);
        rangeReq.Headers.Range = new System.Net.Http.Headers.RangeHeaderValue(100, 199);
        var res1 = await httpClient.SendAsync(rangeReq);
        Assert.Equal(System.Net.HttpStatusCode.PartialContent, res1.StatusCode);
        byte[] downloadedRange1 = await res1.Content.ReadAsByteArrayAsync();
        Assert.Equal(100, downloadedRange1.Length);

        // 4. Synchronization & Gap Navigation
        var gapNav = new GapSkipNavigator(vfs.Manifest);
        using var clock = new MasterPlaybackClock(TimeSpan.FromSeconds(vfs.Manifest.ExportedDurationSeconds), gapNav, vfs.Manifest.RangeStartUtc, enableTimer: false);

        clock.Seek(TimeSpan.FromSeconds(125)); // 10:02:05 UTC -> within WS-ALPHA gap
        Assert.True(gapNav.IsStationInGap("WS-ALPHA", clock.CurrentTime, out var stationGap));
        Assert.NotNull(stationGap);
        Assert.Equal("WS-ALPHA", stationGap.StationId);

        // 5. Keystroke Indexing & Instant Search
        var indexer = new KeystrokeAuditIndexer();
        using var srtStream = vfs.OpenReadStream("subtitles.srt");
        await indexer.IngestSrtStreamAsync("WS-ALPHA", srtStream);

        var searchResults = indexer.Search("Task Manager");
        Assert.Single(searchResults);
        Assert.True(searchResults[0].IsShortcutOrControlKey);

        // 6. Multi-Station Audio Mixer & Cross-Ducker
        var mixer = new PlayerAudioMixer();
        mixer.RegisterStation("WS-ALPHA", "WS-ALPHA");
        mixer.RegisterStation("WS-BETA", "WS-BETA");

        var outL = new float[2];
        var outR = new float[2];

        // WS-ALPHA speaks into mic
        mixer.ProcessAudioFrame("WS-ALPHA", new float[] { 0.0f, 0.0f }, new float[] { 0.8f, 0.8f }, outL, outR);
        // WS-BETA receives intercom loopback
        mixer.ProcessAudioFrame("WS-BETA", new float[] { 1.0f, 1.0f }, new float[] { 0.0f, 0.0f }, outL, outR);

        mixer.UpdateSpeechEnergyAndDucking(DateTime.UtcNow);

        var betaSettings = mixer.GetSettings("WS-BETA");
        Assert.NotNull(betaSettings);
        Assert.True(betaSettings.IsDucked); // WS-BETA auto-ducked to neutralize intercom echo!
    }

    private static void WriteTarBlock(Stream stream, string entryName, byte[] data)
    {
        byte[] header = new byte[512];
        byte[] nameBytes = Encoding.ASCII.GetBytes(entryName);
        Array.Copy(nameBytes, 0, header, 0, Math.Min(nameBytes.Length, 100));

        WriteOctal(header, 100, 8, 0x1ED);
        WriteOctal(header, 108, 8, 0);
        WriteOctal(header, 116, 8, 0);
        WriteOctal(header, 124, 12, (ulong)data.Length);
        WriteOctal(header, 136, 12, (ulong)DateTimeOffset.UtcNow.ToUnixTimeSeconds());

        header[156] = (byte)'0'; // Regular file
        Array.Copy(Encoding.ASCII.GetBytes("ustar\0"), 0, header, 257, 6);
        Array.Copy(Encoding.ASCII.GetBytes("00"), 0, header, 263, 2);

        for (int i = 0; i < 8; i++) header[148 + i] = 32;

        ulong sum = 0;
        for (int i = 0; i < 512; i++) sum += header[i];

        string checkStr = Convert.ToString((long)sum, 8).PadLeft(6, '0') + "\0 ";
        byte[] checkBytes = Encoding.ASCII.GetBytes(checkStr);
        Array.Copy(checkBytes, 0, header, 148, checkBytes.Length);

        stream.Write(header, 0, 512);
        stream.Write(data, 0, data.Length);

        int pad = 512 - (data.Length % 512);
        if (pad > 0 && pad < 512)
        {
            stream.Write(new byte[pad], 0, pad);
        }
    }

    private static void WriteOctal(byte[] buffer, int offset, int length, ulong val)
    {
        string s = Convert.ToString((long)val, 8).PadLeft(length - 1, '0') + "\0";
        byte[] b = Encoding.ASCII.GetBytes(s);
        Array.Copy(b, 0, buffer, offset, Math.Min(b.Length, length));
    }
}
