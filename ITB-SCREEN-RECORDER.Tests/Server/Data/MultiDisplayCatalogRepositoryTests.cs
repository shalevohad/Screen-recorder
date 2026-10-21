using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using ITB_SCREEN_RECORDER.Core.Contracts.Storage;
using ITB_SCREEN_RECORDER.Server.Data;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Server.Data;

public class MultiDisplayCatalogRepositoryTests : IDisposable
{
    private readonly TestSqliteConnectionFactory _factory;
    private readonly CatalogDbInitializer _initializer;
    private readonly CatalogRepository _repository;

    public MultiDisplayCatalogRepositoryTests()
    {
        _factory = new TestSqliteConnectionFactory();
        _initializer = new CatalogDbInitializer(_factory);
        _initializer.Initialize();
        _repository = new CatalogRepository(_factory);
    }

    public void Dispose()
    {
        _factory.Dispose();
    }

    [Fact]
    public async Task BulkUpsertChunks_WithMultipleDisplays_PersistsDisplayIdAndIsPrimaryCorrectly()
    {
        long start = 1791582400000;
        long end = start + 300000; // 5 min

        var chunkMon0 = new ChunkFinalizedEvent(
            StationId: "station-ops-01",
            FilePath: @"C:\Recordings\station-ops-01\mon-0\chunk_01.mp4",
            StartEpochMs: start,
            EndEpochMs: end,
            FileSizeBytes: 10485760,
            IsFinalized: true,
            Width: 2560,
            Height: 1440,
            Fps: 30,
            HasAudio: true,
            DisplayId: "mon-0"
        );

        var chunkMon1 = new ChunkFinalizedEvent(
            StationId: "station-ops-01",
            FilePath: @"C:\Recordings\station-ops-01\mon-1\chunk_01.mp4",
            StartEpochMs: start,
            EndEpochMs: end,
            FileSizeBytes: 8388608,
            IsFinalized: true,
            Width: 1920,
            Height: 1080,
            Fps: 30,
            HasAudio: false,
            DisplayId: "mon-1"
        );

        await _repository.BulkUpsertChunksAsync(new[] { chunkMon0, chunkMon1 });

        // Retrieve chunks via window query
        var results = await _repository.GetChunksForWindowAsync("station-ops-01", start, end);

        Assert.Equal(2, results.Count);

        var retrievedMon0 = results.First(c => c.DisplayId == "mon-0");
        Assert.Equal(2560, retrievedMon0.Width);
        Assert.True(retrievedMon0.HasAudio);

        var retrievedMon1 = results.First(c => c.DisplayId == "mon-1");
        Assert.Equal(1920, retrievedMon1.Width);
        Assert.False(retrievedMon1.HasAudio);

        // Verify SQLite database column values directly
        using var db = _factory.CreateConnection();
        var rawRows = (await db.QueryAsync<(string FilePath, string DisplayId, int IsPrimary)>(
            "SELECT file_path AS FilePath, display_id AS DisplayId, is_primary AS IsPrimary FROM recording_chunks ORDER BY display_id ASC;")).ToList();

        Assert.Equal(2, rawRows.Count);
        Assert.Equal("mon-0", rawRows[0].DisplayId);
        Assert.Equal(1, rawRows[0].IsPrimary);

        Assert.Equal("mon-1", rawRows[1].DisplayId);
        Assert.Equal(0, rawRows[1].IsPrimary);
    }

    [Fact]
    public async Task UpsertActiveChunk_WithSecondaryDisplay_PersistsDisplayIdCorrectly()
    {
        long start = 1791582400000;
        string path = @"C:\Recordings\station-ops-02\mon-2\active.mp4";

        await _repository.UpsertActiveChunkAsync(
            stationId: "station-ops-02",
            filePath: path,
            startEpochMs: start,
            fps: 30,
            width: 1920,
            height: 1080,
            hasAudio: false,
            displayId: "mon-2");

        long finalizedEnd = start + 300000;
        long finalSize = 5242880;

        await _repository.FinalizeChunkAsync(path, finalizedEnd, finalSize);

        var chunks = await _repository.GetChunksForWindowAsync("station-ops-02", start, finalizedEnd);
        Assert.Single(chunks);
        Assert.Equal("mon-2", chunks[0].DisplayId);
        Assert.Equal(finalSize, chunks[0].FileSizeBytes);
        Assert.True(chunks[0].IsFinalized);
    }

    [Fact]
    public async Task StationDisplayIndex_QueryByDisplayId_UtilizesDisplayIndex()
    {
        using var db = _factory.CreateConnection();
        long start = 1791582400000;

        for (int i = 0; i < 5; i++)
        {
            await _repository.UpsertActiveChunkAsync("station-perf", $@"C:\Recordings\station-perf\mon-0\chunk_{i}.mp4", start + (i * 300000), 30, 1920, 1080, true, "mon-0");
            await _repository.UpsertActiveChunkAsync("station-perf", $@"C:\Recordings\station-perf\mon-1\chunk_{i}.mp4", start + (i * 300000), 30, 1920, 1080, false, "mon-1");
        }

        var mon1Chunks = await db.QueryAsync<string>(
            "SELECT file_path FROM recording_chunks WHERE station_id = @stationId AND display_id = @displayId;",
            new { stationId = "station-perf", displayId = "mon-1" });

        Assert.Equal(5, mon1Chunks.Count());
    }
}
