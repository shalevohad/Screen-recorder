namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Data.Repositories;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Data;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;

public interface IBookmarkRepository
{
    Task UpsertAsync(BookmarkInfo bookmark);
    Task<List<BookmarkInfo>> GetAllAsync();
    Task<List<BookmarkInfo>> GetByStationAsync(string stationId);
    Task<bool> DeleteAsync(string id);
    Task<bool> HasOverlapAsync(string stationId, DateTime startUtc, DateTime endUtc);
}

public sealed class BookmarkRepository : IBookmarkRepository
{
    private readonly IAdvancedExtractorConnectionFactory _factory;

    public BookmarkRepository(IAdvancedExtractorConnectionFactory factory)
    {
        _factory = factory;
    }

    public async Task UpsertAsync(BookmarkInfo bookmark)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            INSERT INTO bookmarks (
                Id, StationId, Title, Description, StartUtc, EndUtc, Tags, CreatedBy, CreatedAtUtc
            ) VALUES (
                @Id, @StationId, @Title, @Description, @StartUtc, @EndUtc, @Tags, @CreatedBy, @CreatedAtUtc
            )
            ON CONFLICT(Id) DO UPDATE SET
                Title = excluded.Title,
                Description = excluded.Description,
                StartUtc = excluded.StartUtc,
                EndUtc = excluded.EndUtc,
                Tags = excluded.Tags,
                CreatedBy = excluded.CreatedBy;
        ";
        await db.ExecuteAsync(sql, bookmark);
    }

    public async Task<List<BookmarkInfo>> GetAllAsync()
    {
        using var db = _factory.CreateConnection();
        const string sql = "SELECT * FROM bookmarks ORDER BY StartUtc DESC;";
        var results = await db.QueryAsync<BookmarkInfo>(sql);
        return results.AsList();
    }

    public async Task<List<BookmarkInfo>> GetByStationAsync(string stationId)
    {
        using var db = _factory.CreateConnection();
        const string sql = "SELECT * FROM bookmarks WHERE StationId = @stationId ORDER BY StartUtc DESC;";
        var results = await db.QueryAsync<BookmarkInfo>(sql, new { stationId });
        return results.AsList();
    }

    public async Task<bool> DeleteAsync(string id)
    {
        using var db = _factory.CreateConnection();
        const string sql = "DELETE FROM bookmarks WHERE Id = @id;";
        int rows = await db.ExecuteAsync(sql, new { id });
        return rows > 0;
    }

    public async Task<bool> HasOverlapAsync(string stationId, DateTime startUtc, DateTime endUtc)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            SELECT COUNT(1) FROM bookmarks 
            WHERE StationId = @stationId 
              AND StartUtc < @endUtc 
              AND EndUtc > @startUtc 
            LIMIT 1;
        ";
        int count = await db.ExecuteScalarAsync<int>(sql, new { stationId, startUtc, endUtc });
        return count > 0;
    }
}