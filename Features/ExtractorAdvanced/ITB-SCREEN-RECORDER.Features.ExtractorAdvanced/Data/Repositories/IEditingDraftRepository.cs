namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Data.Repositories;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Data;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;

public interface IEditingDraftRepository
{
    Task UpsertAsync(EditingDraftInfo draft);
    Task<List<EditingDraftInfo>> GetAllAsync();
    Task<EditingDraftInfo?> GetByIdAsync(string draftId);
    Task<bool> DeleteAsync(string draftId);
}

public sealed class EditingDraftRepository : IEditingDraftRepository
{
    private readonly IAdvancedExtractorConnectionFactory _factory;

    public EditingDraftRepository(IAdvancedExtractorConnectionFactory factory)
    {
        _factory = factory;
    }

    public async Task UpsertAsync(EditingDraftInfo draft)
    {
        draft.UpdatedAtUtc = DateTime.UtcNow;
        using var db = _factory.CreateConnection();
        const string sql = @"
            INSERT INTO editing_drafts (DraftId, Title, StateJson, CreatedAtUtc, UpdatedAtUtc)
            VALUES (@DraftId, @Title, @StateJson, @CreatedAtUtc, @UpdatedAtUtc)
            ON CONFLICT(DraftId) DO UPDATE SET
                Title = excluded.Title,
                StateJson = excluded.StateJson,
                UpdatedAtUtc = excluded.UpdatedAtUtc;
        ";
        await db.ExecuteAsync(sql, draft);
    }

    public async Task<List<EditingDraftInfo>> GetAllAsync()
    {
        using var db = _factory.CreateConnection();
        const string sql = "SELECT * FROM editing_drafts ORDER BY UpdatedAtUtc DESC;";
        var results = await db.QueryAsync<EditingDraftInfo>(sql);
        return results.AsList();
    }

    public async Task<EditingDraftInfo?> GetByIdAsync(string draftId)
    {
        using var db = _factory.CreateConnection();
        const string sql = "SELECT * FROM editing_drafts WHERE DraftId = @draftId;";
        return await db.QuerySingleOrDefaultAsync<EditingDraftInfo>(sql, new { draftId });
    }

    public async Task<bool> DeleteAsync(string draftId)
    {
        using var db = _factory.CreateConnection();
        const string sql = "DELETE FROM editing_drafts WHERE DraftId = @draftId;";
        int rows = await db.ExecuteAsync(sql, new { draftId });
        return rows > 0;
    }
}