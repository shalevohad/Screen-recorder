namespace ITB_SCREEN_RECORDER.Server.Data.Repositories;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
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
            (station_id, file_path, start_epoch_ms, end_epoch_ms, file_size_bytes, is_finalized, indexed_at_utc)
            VALUES (@StationId, @FilePath, @StartEpochMs, @EndEpochMs, @FileSizeBytes, @IsFinalized, @IndexedAtUtc)
            ON CONFLICT(file_path) DO UPDATE SET
                end_epoch_ms = excluded.end_epoch_ms,
                file_size_bytes = excluded.file_size_bytes,
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
            c.IsFinalized,
            IndexedAtUtc = now
        });

        await db.ExecuteAsync(sql, records, tx);
        tx.Commit();
    }

    public async Task<IReadOnlyList<ChunkFinalizedEvent>> GetChunksForWindowAsync(string stationId, long fromEpochMs, long toEpochMs)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            SELECT station_id AS StationId, file_path AS FilePath, 
                   start_epoch_ms AS StartEpochMs, end_epoch_ms AS EndEpochMs, 
                   file_size_bytes AS FileSizeBytes, is_finalized AS IsFinalized
            FROM recording_chunks
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
                   file_size_bytes AS FileSizeBytes, is_finalized AS IsFinalized
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
}