namespace ITB_SCREEN_RECORDER.Server.Data.Repositories;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;
using ITB_SCREEN_RECORDER.Core.Contracts.Storage;
using ITB_SCREEN_RECORDER.Server.Data;

public sealed class CatalogRepository : ICatalogRepository
{
    private readonly ICatalogConnectionFactory _factory;

    public CatalogRepository(ICatalogConnectionFactory factory)
    {
        _factory = factory;
    }

    public async Task BulkUpsertChunksAsync(IEnumerable<ChunkFinalizedEvent> chunks)
    {
        using var db = _factory.CreateConnection();
        using var tx = db.BeginTransaction();

        const string sql = @"
            INSERT INTO recording_chunks 
            (station_id, file_path, start_epoch_ms, end_epoch_ms, duration_ms, file_size_bytes, 
             width, height, fps, has_audio, is_finalized, indexed_at_utc)
            VALUES (@StationId, @FilePath, @StartEpochMs, @EndEpochMs, (@EndEpochMs - @StartEpochMs), 
                    @FileSizeBytes, @Width, @Height, @Fps, @HasAudio, @IsFinalized, @IndexedAtUtc)
            ON CONFLICT(file_path) DO UPDATE SET
                end_epoch_ms = excluded.end_epoch_ms,
                duration_ms = (excluded.end_epoch_ms - recording_chunks.start_epoch_ms),
                file_size_bytes = excluded.file_size_bytes,
                width = CASE WHEN excluded.width > 0 THEN excluded.width ELSE recording_chunks.width END,
                height = CASE WHEN excluded.height > 0 THEN excluded.height ELSE recording_chunks.height END,
                fps = CASE WHEN excluded.fps > 0 THEN excluded.fps ELSE recording_chunks.fps END,
                has_audio = excluded.has_audio,
                is_finalized = excluded.is_finalized,
                indexed_at_utc = excluded.indexed_at_utc;
        ";

        var now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        var records = chunks.Select(c => new
        {
            c.StationId,
            c.FilePath,
            c.StartEpochMs,
            c.EndEpochMs,
            c.FileSizeBytes,
            Width = c.Width > 0 ? c.Width : 1920,
            Height = c.Height > 0 ? c.Height : 1080,
            Fps = c.Fps > 0 ? c.Fps : 30,
            HasAudio = c.HasAudio ? 1 : 0,
            IsFinalized = c.IsFinalized ? 1 : 0,
            IndexedAtUtc = now
        });

        await db.ExecuteAsync(sql, records, tx);
        tx.Commit();
    }

    public async Task UpsertActiveChunkAsync(string stationId, string filePath, long startEpochMs, int fps, int width, int height, bool hasAudio)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            INSERT INTO recording_chunks 
            (station_id, file_path, start_epoch_ms, end_epoch_ms, duration_ms, file_size_bytes, 
             width, height, fps, has_audio, is_finalized, indexed_at_utc)
            VALUES (@stationId, @filePath, @startEpochMs, @startEpochMs, 0, 0, 
                    @width, @height, @fps, @hasAudio, 0, @indexedAtUtc)
            ON CONFLICT(file_path) DO NOTHING;
        ";

        await db.ExecuteAsync(sql, new
        {
            stationId,
            filePath,
            startEpochMs,
            width = width > 0 ? width : 1920,
            height = height > 0 ? height : 1080,
            fps = fps > 0 ? fps : 30,
            hasAudio = hasAudio ? 1 : 0,
            indexedAtUtc = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
        });
    }

    public async Task FinalizeChunkAsync(string filePath, long endEpochMs, long fileSizeBytes)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            UPDATE recording_chunks 
            SET end_epoch_ms = @endEpochMs,
                duration_ms = (@endEpochMs - start_epoch_ms),
                file_size_bytes = @fileSizeBytes,
                is_finalized = 1,
                indexed_at_utc = @indexedAtUtc
            WHERE file_path = @filePath;
        ";

        await db.ExecuteAsync(sql, new
        {
            filePath,
            endEpochMs,
            fileSizeBytes,
            indexedAtUtc = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
        });
    }

    public async Task<IReadOnlyList<ChunkFinalizedEvent>> GetChunksForWindowAsync(string stationId, long fromEpochMs, long toEpochMs)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            SELECT station_id AS StationId, file_path AS FilePath, 
                   start_epoch_ms AS StartEpochMs, end_epoch_ms AS EndEpochMs, 
                   file_size_bytes AS FileSizeBytes, is_finalized AS IsFinalized,
                   width AS Width, height AS Height, fps AS Fps, has_audio AS HasAudio
            FROM recording_chunks INDEXED BY idx_chunks_station_window_covering
            WHERE station_id = @stationId
              AND end_epoch_ms >= @fromEpochMs
              AND start_epoch_ms <= @toEpochMs
            ORDER BY start_epoch_ms ASC;
        ";

        var result = await db.QueryAsync<ChunkFinalizedEvent>(sql, new { stationId, fromEpochMs, toEpochMs });
        return result.AsList();
    }

    public async Task<IReadOnlyList<ChunkFinalizedEvent>> GetExpiredCandidateChunksAsync(long cutoffUtc, int batchLimit)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            SELECT station_id AS StationId, file_path AS FilePath, 
                   start_epoch_ms AS StartEpochMs, end_epoch_ms AS EndEpochMs, 
                   file_size_bytes AS FileSizeBytes, is_finalized AS IsFinalized,
                   width AS Width, height AS Height, fps AS Fps, has_audio AS HasAudio
            FROM recording_chunks
            WHERE end_epoch_ms < @cutoffUtc
              AND is_finalized = 1
            ORDER BY end_epoch_ms ASC
            LIMIT @batchLimit;
        ";

        var result = await db.QueryAsync<ChunkFinalizedEvent>(sql, new { cutoffUtc, batchLimit });
        return result.AsList();
    }

    public async Task RemoveChunksAsync(IEnumerable<string> filePaths)
    {
        using var db = _factory.CreateConnection();
        using var tx = db.BeginTransaction();
        const string sql = "DELETE FROM recording_chunks WHERE file_path = @filePath;";
        await db.ExecuteAsync(sql, filePaths.Select(f => new { filePath = f }), tx);
        tx.Commit();
    }

    public async Task BulkInsertKeystrokesAsync(string stationId, IEnumerable<KeystrokeEventDto> events)
    {
        if (events == null || !events.Any()) return;

        using var db = _factory.CreateConnection();
        using var tx = db.BeginTransaction();

        const string sql = @"
            INSERT INTO keystroke_events (station_id, epoch_ms, key_combination, timestamp_utc)
            VALUES (@StationId, @EpochMs, @KeyCombination, @TimestampUtc);
        ";

        var records = events.Select(e => new
        {
            StationId = stationId,
            e.EpochMs,
            e.KeyCombination,
            TimestampUtc = e.TimestampUtc.ToString("o")
        });

        await db.ExecuteAsync(sql, records, tx);
        tx.Commit();
    }

    public async Task<IReadOnlyList<KeystrokeEventDto>> GetKeystrokesForWindowAsync(string stationId, long fromEpochMs, long toEpochMs)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            SELECT epoch_ms AS EpochMs, key_combination AS KeyCombination, timestamp_utc AS TimestampUtc
            FROM keystroke_events INDEXED BY idx_keystrokes_station_epoch
            WHERE station_id = @stationId
              AND epoch_ms >= @fromEpochMs
              AND epoch_ms <= @toEpochMs
            ORDER BY epoch_ms ASC;
        ";

        var results = await db.QueryAsync<KeystrokeEventDto>(sql, new { stationId, fromEpochMs, toEpochMs });
        return results.AsList();
    }

    public async Task<string?> GetConfigurationAsync(string key)
    {
        using var db = _factory.CreateConnection();
        const string sql = "SELECT config_value FROM system_configurations WHERE config_key = @key;";
        return await db.QuerySingleOrDefaultAsync<string?>(sql, new { key });
    }

    public async Task SetConfigurationAsync(string key, string jsonValue)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            INSERT INTO system_configurations (config_key, config_value, updated_at_utc)
            VALUES (@key, @jsonValue, @now)
            ON CONFLICT(config_key) DO UPDATE SET
                config_value = excluded.config_value,
                updated_at_utc = excluded.updated_at_utc;
        ";
        await db.ExecuteAsync(sql, new { key, jsonValue, now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() });
    }

    public async Task<Dictionary<string, string>> GetAllConfigurationsAsync()
    {
        using var db = _factory.CreateConnection();
        const string sql = "SELECT config_key, config_value FROM system_configurations;";
        var rows = await db.QueryAsync<(string Key, string Value)>(sql);
        return rows.ToDictionary(r => r.Key, r => r.Value);
    }

    public async Task<List<CustomTabRecord>> GetAllTabsAsync()
    {
        using var db = _factory.CreateConnection();
        const string sql = "SELECT id, name, hostnames_json AS HostnamesJson, ous_json AS OusJson, target_fps AS TargetFps, target_bitrate_kbps AS TargetBitrateKbps, is_default AS IsDefault, display_order AS DisplayOrder, updated_at_utc AS UpdatedAtUtc FROM custom_tabs ORDER BY display_order ASC, name ASC;";
        var results = await db.QueryAsync<CustomTabRecord>(sql);
        return results.AsList();
    }

    public async Task UpsertTabAsync(CustomTabRecord tab)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
        INSERT INTO custom_tabs 
        (id, name, hostnames_json, ous_json, target_fps, target_bitrate_kbps, is_default, display_order, updated_at_utc)
        VALUES (@Id, @Name, @HostnamesJson, @OusJson, @TargetFps, @TargetBitrateKbps, @IsDefault, @DisplayOrder, @UpdatedAtUtc)
        ON CONFLICT(id) DO UPDATE SET
            name = excluded.name,
            hostnames_json = excluded.hostnames_json,
            ous_json = excluded.ous_json,
            target_fps = excluded.target_fps,
            target_bitrate_kbps = excluded.target_bitrate_kbps,
            is_default = excluded.is_default,
            display_order = excluded.display_order,
            updated_at_utc = excluded.updated_at_utc;
    ";
        await db.ExecuteAsync(sql, tab);
    }

    public async Task<bool> DeleteTabAsync(string tabId)
    {
        using var db = _factory.CreateConnection();
        const string sql = "DELETE FROM custom_tabs WHERE id = @tabId AND is_default = 0;";
        int affected = await db.ExecuteAsync(sql, new { tabId });
        return affected > 0;
    }

    public async Task<Dictionary<string, StationOverrideRecord>> GetAllOverridesAsync()
    {
        using var db = _factory.CreateConnection();
        const string sql = "SELECT hostname AS Hostname, video_bitrate AS VideoBitrate, target_fps AS TargetFps, updated_at_utc AS UpdatedAtUtc FROM station_overrides;";
        var rows = await db.QueryAsync<StationOverrideRecord>(sql);
        return rows.ToDictionary(r => r.Hostname, StringComparer.OrdinalIgnoreCase);
    }

    public async Task UpsertOverrideAsync(string hostname, string? videoBitrate, int? targetFps)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            INSERT INTO station_overrides (hostname, video_bitrate, target_fps, updated_at_utc)
            VALUES (@hostname, @videoBitrate, @targetFps, @now)
            ON CONFLICT(hostname) DO UPDATE SET
                video_bitrate = excluded.video_bitrate,
                target_fps = excluded.target_fps,
                updated_at_utc = excluded.updated_at_utc;
        ";
        await db.ExecuteAsync(sql, new { hostname, videoBitrate, targetFps, now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() });
    }

    public async Task<bool> DeleteOverrideAsync(string hostname)
    {
        using var db = _factory.CreateConnection();
        const string sql = "DELETE FROM station_overrides WHERE hostname = @hostname;";
        int affected = await db.ExecuteAsync(sql, new { hostname });
        return affected > 0;
    }
}