using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Contracts.Storage;
using ITB_SCREEN_RECORDER.Server.Data;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Server.Data;

public class CatalogRepositoryEdgeCaseTests : IDisposable
{
    private readonly TestSqliteConnectionFactory _factory;
    private readonly CatalogDbInitializer _initializer;
    private readonly CatalogRepository _repository;

    public CatalogRepositoryEdgeCaseTests()
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
    public async Task BulkUpsertChunks_ConflictResolution_PreservesExistingResolutionWhenExcludedIsZero()
    {
        string filePath = @"C:\Recordings\station-hd\chunk_conflict_test.mp4";
        long start = 1700000000000;

        // 1. Initial insert with 1920x1080 @ 30fps
        var initialChunk = new ChunkFinalizedEvent(
            StationId: "station-hd",
            FilePath: filePath,
            StartEpochMs: start,
            EndEpochMs: start + 60000,
            FileSizeBytes: 5000000,
            IsFinalized: false,
            Width: 1920,
            Height: 1080,
            Fps: 30,
            HasAudio: true
        );
        await _repository.BulkUpsertChunksAsync(new[] { initialChunk });

        // 2. Secondary update (e.g. from an indexer that didn't probe width/height -> zeros)
        var updatedChunk = new ChunkFinalizedEvent(
            StationId: "station-hd",
            FilePath: filePath,
            StartEpochMs: start,
            EndEpochMs: start + 120000, // Updated end
            FileSizeBytes: 10000000,   // Updated size
            IsFinalized: true,
            Width: 0,
            Height: 0,
            Fps: 0,
            HasAudio: true
        );
        await _repository.BulkUpsertChunksAsync(new[] { updatedChunk });

        var chunks = await _repository.GetChunksForWindowAsync("station-hd", start, start + 200000);
        Assert.Single(chunks);
        var chunk = chunks[0];

        // EndEpochMs and FileSizeBytes should be updated
        Assert.Equal(start + 120000, chunk.EndEpochMs);
        Assert.Equal(10000000, chunk.FileSizeBytes);
        Assert.True(chunk.IsFinalized);

        // Width, Height, FPS must NOT be overwritten by zero!
        Assert.Equal(1920, chunk.Width);
        Assert.Equal(1080, chunk.Height);
        Assert.Equal(30, chunk.Fps);
    }

    [Fact]
    public async Task GetChunksForWindow_InvertedWindow_ReturnsEmptyWithoutThrowing()
    {
        long start = 1700000000000;
        var chunk = new ChunkFinalizedEvent(
            StationId: "st-inv",
            FilePath: @"C:\Recordings\chunk_inv.mp4",
            StartEpochMs: start,
            EndEpochMs: start + 60000,
            FileSizeBytes: 1000,
            IsFinalized: true,
            Width: 1920, Height: 1080, Fps: 25, HasAudio: false
        );
        await _repository.BulkUpsertChunksAsync(new[] { chunk });

        // fromEpochMs > toEpochMs
        var results = await _repository.GetChunksForWindowAsync("st-inv", start + 50000, start + 10000);
        Assert.Empty(results);
    }

    [Fact]
    public async Task GetChunksForWindow_ExactBoundaryEdges_IncludesChunk()
    {
        long start = 1700000000000;
        long end = start + 60000;

        var chunk = new ChunkFinalizedEvent(
            StationId: "st-exact",
            FilePath: @"C:\Recordings\chunk_exact.mp4",
            StartEpochMs: start,
            EndEpochMs: end,
            FileSizeBytes: 1000,
            IsFinalized: true,
            Width: 1920, Height: 1080, Fps: 25, HasAudio: false
        );
        await _repository.BulkUpsertChunksAsync(new[] { chunk });

        // Query with exact boundaries
        var results = await _repository.GetChunksForWindowAsync("st-exact", start, end);
        Assert.Single(results);
    }

    [Fact]
    public async Task RemoveChunks_EmptyCollectionOrNonExistent_DoesNotThrow()
    {
        var exception = await Record.ExceptionAsync(async () =>
        {
            await _repository.RemoveChunksAsync(Array.Empty<string>());
            await _repository.RemoveChunksAsync(new[] { @"C:\does_not_exist_9999.mp4" });
        });

        Assert.Null(exception);
    }

    [Fact]
    public async Task LargeVolume_BulkUpsert_200ChunksInSingleCall()
    {
        long baseTime = 1700000000000;
        var bulkChunks = Enumerable.Range(0, 200).Select(i => new ChunkFinalizedEvent(
            StationId: "station-bulk",
            FilePath: $@"C:\Recordings\bulk\chunk_{i:D4}.mp4",
            StartEpochMs: baseTime + (i * 60000),
            EndEpochMs: baseTime + ((i + 1) * 60000),
            FileSizeBytes: 1024 * 1024,
            IsFinalized: true,
            Width: 1920, Height: 1080, Fps: 30, HasAudio: true
        )).ToList();

        await _repository.BulkUpsertChunksAsync(bulkChunks);

        var retrieved = await _repository.GetChunksForWindowAsync("station-bulk", baseTime, baseTime + (200 * 60000));
        Assert.Equal(200, retrieved.Count);
    }

    [Fact]
    public async Task GetExpiredCandidateChunks_RespectsBatchLimit()
    {
        long now = 1700000000000;
        long cutoff = now + 500000;

        var chunks = Enumerable.Range(0, 30).Select(i => new ChunkFinalizedEvent(
            StationId: "station-exp",
            FilePath: $@"C:\Recordings\exp\chunk_{i}.mp4",
            StartEpochMs: now + (i * 1000),
            EndEpochMs: now + ((i + 1) * 1000),
            FileSizeBytes: 1024,
            IsFinalized: true,
            Width: 1920, Height: 1080, Fps: 30, HasAudio: false
        ));
        await _repository.BulkUpsertChunksAsync(chunks);

        var candidates = await _repository.GetExpiredCandidateChunksAsync(cutoff, batchLimit: 10);
        Assert.Equal(10, candidates.Count);
    }

    [Fact]
    public async Task StationOverrides_CaseInsensitiveLookup()
    {
        await _repository.UpsertOverrideAsync("WORKSTATION-X", "4000K", 30);

        var overrides = await _repository.GetAllOverridesAsync();
        Assert.True(overrides.ContainsKey("workstation-x"));
        Assert.True(overrides.ContainsKey("WORKSTATION-X"));
    }

    [Fact]
    public async Task UserManagement_NonExistentUser_ReturnsNullOrFalseSafely()
    {
        var nonExistentUser = await _repository.GetUserByUsernameAsync("ghost_user_999");
        Assert.Null(nonExistentUser);

        bool deleted = await _repository.DeleteUserAsync("usr_ghost_id");
        Assert.False(deleted);
    }
}
