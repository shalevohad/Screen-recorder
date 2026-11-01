using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;
using ITB_SCREEN_RECORDER.Core.Contracts.Storage;
using ITB_SCREEN_RECORDER.Server.Data;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Server.Data;

public class CatalogRepositoryTests : IDisposable
{
    private readonly TestSqliteConnectionFactory _factory;
    private readonly CatalogDbInitializer _initializer;
    private readonly CatalogRepository _repository;

    public CatalogRepositoryTests()
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
    public void CatalogDbInitializer_CreatesTablesAndSeedsDefaultRoles()
    {
        using var db = _factory.CreateConnection();
        using var cmd = db.CreateCommand();
        cmd.CommandText = "SELECT count(*) FROM roles;";
        var count = Convert.ToInt32(cmd.ExecuteScalar());

        Assert.True(count >= 4); // Admin, Operator, Investigator, Auditor
    }

    [Fact]
    public async Task BulkUpsertChunks_And_GetChunksForWindow_RetrievesInsertedChunks()
    {
        long start = 1700000000000;
        long end = start + 300000; // 5 minutes

        var chunk1 = new ChunkFinalizedEvent(
            StationId: "station-alpha",
            FilePath: @"C:\Recordings\station-alpha\chunk1.mp4",
            StartEpochMs: start,
            EndEpochMs: end,
            FileSizeBytes: 10485760,
            IsFinalized: true,
            Width: 1920,
            Height: 1080,
            Fps: 30,
            HasAudio: true
        );

        var chunk2 = new ChunkFinalizedEvent(
            StationId: "station-beta",
            FilePath: @"C:\Recordings\station-beta\chunk2.mp4",
            StartEpochMs: start,
            EndEpochMs: end,
            FileSizeBytes: 5242880,
            IsFinalized: true,
            Width: 1920,
            Height: 1080,
            Fps: 30,
            HasAudio: false
        );

        await _repository.BulkUpsertChunksAsync(new[] { chunk1, chunk2 });

        // Query station-alpha in window
        var results = await _repository.GetChunksForWindowAsync("station-alpha", start - 1000, end + 1000);
        Assert.Single(results);
        Assert.Equal(@"C:\Recordings\station-alpha\chunk1.mp4", results[0].FilePath);
        Assert.Equal(10485760, results[0].FileSizeBytes);
        Assert.True(results[0].HasAudio);

        // Query outside window should return empty
        var emptyResults = await _repository.GetChunksForWindowAsync("station-alpha", end + 50000, end + 100000);
        Assert.Empty(emptyResults);
    }

    [Fact]
    public async Task FinalizeChunk_UpdatesDurationAndSize()
    {
        long start = 1700000000000;
        string path = @"C:\Recordings\test\active.mp4";

        await _repository.UpsertActiveChunkAsync("station-test", path, start, 30, 1920, 1080, true);

        long finalizedEnd = start + 120000; // 2 minutes
        long finalSize = 8388608;

        await _repository.FinalizeChunkAsync(path, finalizedEnd, finalSize);

        var chunks = await _repository.GetChunksForWindowAsync("station-test", start, finalizedEnd + 1000);
        Assert.Single(chunks);
        Assert.Equal(finalizedEnd, chunks[0].EndEpochMs);
        Assert.Equal(finalSize, chunks[0].FileSizeBytes);
        Assert.True(chunks[0].IsFinalized);
    }

    [Fact]
    public async Task RemoveChunks_DeletesSpecifiedRecords()
    {
        long start = 1700000000000;
        string path = @"C:\Recordings\to_remove.mp4";

        var chunk = new ChunkFinalizedEvent(
            StationId: "st1",
            FilePath: path,
            StartEpochMs: start,
            EndEpochMs: start + 60000,
            FileSizeBytes: 1024,
            IsFinalized: true,
            Width: 1920, Height: 1080, Fps: 25, HasAudio: false
        );

        await _repository.BulkUpsertChunksAsync(new[] { chunk });
        var before = await _repository.GetChunksForWindowAsync("st1", start, start + 60000);
        Assert.Single(before);

        await _repository.RemoveChunksAsync(new[] { path });
        var after = await _repository.GetChunksForWindowAsync("st1", start, start + 60000);
        Assert.Empty(after);
    }

    [Fact]
    public async Task Keystrokes_LogQueryAndPurge_WorksCorrectly()
    {
        long t1 = 1700000010000;
        long t2 = 1700000020000;
        long t3 = 1700000090000;

        var events = new List<KeystrokeEventDto>
        {
            new() { EpochMs = t1, KeyCombination = "WIN + D", TimestampUtc = DateTime.UtcNow },
            new() { EpochMs = t2, KeyCombination = "ALT + TAB", TimestampUtc = DateTime.UtcNow },
            new() { EpochMs = t3, KeyCombination = "ENTER", TimestampUtc = DateTime.UtcNow }
        };

        await _repository.BulkInsertKeystrokesAsync("host-a", events);

        var queried = await _repository.GetKeystrokesForWindowAsync("host-a", t1 - 1000, t2 + 1000);
        Assert.Equal(2, queried.Count);

        // Purge up to t2
        int purged = await _repository.PurgeExpiredKeystrokesAsync(t2 + 1);
        Assert.Equal(2, purged);

        var remaining = await _repository.GetKeystrokesForWindowAsync("host-a", t1 - 1000, t3 + 1000);
        Assert.Single(remaining);
        Assert.Equal("ENTER", remaining[0].KeyCombination);
    }

    [Fact]
    public async Task StationOverrides_UpsertGetDelete_ManagesRecords()
    {
        await _repository.UpsertOverrideAsync("workstation-99", "3500K", 25);

        var overrides = await _repository.GetAllOverridesAsync();
        Assert.True(overrides.ContainsKey("workstation-99"));
        Assert.Equal("3500K", overrides["workstation-99"].VideoBitrate);
        Assert.Equal(25, overrides["workstation-99"].TargetFps);

        bool deleted = await _repository.DeleteOverrideAsync("workstation-99");
        Assert.True(deleted);

        var afterDelete = await _repository.GetAllOverridesAsync();
        Assert.False(afterDelete.ContainsKey("workstation-99"));
    }

    [Fact]
    public async Task StationRoles_SetAndGet_UpdatesRoleAlias()
    {
        await _repository.SetStationRoleAliasAsync("station-ops-01", "Dispatch Console");

        var roles = await _repository.GetAllStationRoleAliasesAsync();
        Assert.True(roles.ContainsKey("station-ops-01"));
        Assert.Equal("Dispatch Console", roles["station-ops-01"]);
    }

    [Fact]
    public async Task StationRoles_SwapStationRoleAliasesAsync_ExchangesAliasesCleanly()
    {
        await _repository.SetStationRoleAliasAsync("station-alpha", "Role Alpha");
        await _repository.SetStationRoleAliasAsync("station-beta", "Role Beta");

        await _repository.SwapStationRoleAliasesAsync("station-alpha", "station-beta");

        var roles = await _repository.GetAllStationRoleAliasesAsync();
        Assert.Equal("Role Beta", roles["station-alpha"]);
        Assert.Equal("Role Alpha", roles["station-beta"]);
    }

    [Fact]
    public async Task SystemConfigurations_SetAndGet_PersistsValue()
    {
        await _repository.SetConfigurationAsync("ThemePreference", "{\"mode\":\"tactical_dark\"}");

        string? value = await _repository.GetConfigurationAsync("ThemePreference");
        Assert.Equal("{\"mode\":\"tactical_dark\"}", value);

        var all = await _repository.GetAllConfigurationsAsync();
        Assert.True(all.ContainsKey("ThemePreference"));
    }

    [Fact]
    public async Task Users_CreateGetUpdatePasswordAndDelete_LifecyclePasses()
    {
        string userId = await _repository.CreateUserAsync(
            username: "investigator_bob",
            displayName: "Bob Forensic",
            passwordHash: "hash123",
            authSource: "Local",
            roleIds: new[] { "role_investigator" }
        );

        Assert.False(string.IsNullOrWhiteSpace(userId));

        var user = await _repository.GetUserByUsernameAsync("investigator_bob");
        Assert.NotNull(user);
        Assert.Equal("Bob Forensic", user.DisplayName);
        Assert.Contains("role_investigator", user.AssignedRoleIds);

        await _repository.UpdateUserPasswordAsync(userId, "new_hash_456");
        var updatedUser = await _repository.GetUserByIdAsync(userId);
        Assert.NotNull(updatedUser);

        bool deleted = await _repository.DeleteUserAsync(userId);
        Assert.True(deleted);

        var deletedUser = await _repository.GetUserByUsernameAsync("investigator_bob");
        Assert.Null(deletedUser);
    }
}
