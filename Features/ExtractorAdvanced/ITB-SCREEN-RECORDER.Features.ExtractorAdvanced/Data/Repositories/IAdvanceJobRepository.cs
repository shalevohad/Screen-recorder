namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Data.Repositories;

using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Data;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;

public interface IAdvanceJobRepository
{
    Task UpsertJobAsync(AdvanceJobInfo job);
    Task<List<AdvanceJobInfo>> GetAllJobsAsync();
    Task<AdvanceJobInfo?> GetJobAsync(string jobId);
    Task<bool> DeleteJobAsync(string jobId);
}

public sealed class AdvanceJobRepository : IAdvanceJobRepository
{
    private readonly IAdvancedExtractorConnectionFactory _factory;

    public AdvanceJobRepository(IAdvancedExtractorConnectionFactory factory)
    {
        _factory = factory;
    }

    public async Task UpsertJobAsync(AdvanceJobInfo job)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            INSERT INTO advance_jobs (
                JobId, FileName, Status, ProgressPercent, StatusMessage, SpeedMBps,
                EtaSeconds, FileSizeBytes, CreatedAtUtc, CompletedAtUtc, ErrorMessage,
                OutputFilePath, NetworkFolderPath, DownloadCount, IsBookmarked,
                StationIds, InEpochMs, OutEpochMs, CutMode, EstimatedSecondsRemaining
            ) VALUES (
                @JobId, @FileName, @Status, @ProgressPercent, @StatusMessage, @SpeedMBps,
                @EtaSeconds, @FileSizeBytes, @CreatedAtUtc, @CompletedAtUtc, @ErrorMessage,
                @OutputFilePath, @NetworkFolderPath, @DownloadCount, @IsBookmarked,
                @StationIds, @InEpochMs, @OutEpochMs, @CutMode, @EstimatedSecondsRemaining
            )
            ON CONFLICT(JobId) DO UPDATE SET
                Status = excluded.Status,
                ProgressPercent = excluded.ProgressPercent,
                StatusMessage = excluded.StatusMessage,
                SpeedMBps = excluded.SpeedMBps,
                EtaSeconds = excluded.EtaSeconds,
                FileSizeBytes = excluded.FileSizeBytes,
                CompletedAtUtc = excluded.CompletedAtUtc,
                ErrorMessage = excluded.ErrorMessage,
                OutputFilePath = excluded.OutputFilePath,
                NetworkFolderPath = excluded.NetworkFolderPath,
                DownloadCount = excluded.DownloadCount,
                IsBookmarked = excluded.IsBookmarked,
                StationIds = excluded.StationIds,
                InEpochMs = excluded.InEpochMs,
                OutEpochMs = excluded.OutEpochMs,
                CutMode = excluded.CutMode,
                EstimatedSecondsRemaining = excluded.EstimatedSecondsRemaining;
        ";

        await db.ExecuteAsync(sql, job);
    }

    public async Task<List<AdvanceJobInfo>> GetAllJobsAsync()
    {
        using var db = _factory.CreateConnection();
        const string sql = "SELECT * FROM advance_jobs ORDER BY CreatedAtUtc DESC;";
        var results = await db.QueryAsync<AdvanceJobInfo>(sql);
        return results.AsList();
    }

    public async Task<AdvanceJobInfo?> GetJobAsync(string jobId)
    {
        using var db = _factory.CreateConnection();
        const string sql = "SELECT * FROM advance_jobs WHERE JobId = @jobId;";
        return await db.QuerySingleOrDefaultAsync<AdvanceJobInfo>(sql, new { jobId });
    }

    public async Task<bool> DeleteJobAsync(string jobId)
    {
        using var db = _factory.CreateConnection();
        const string sql = "DELETE FROM advance_jobs WHERE JobId = @jobId;";
        int rows = await db.ExecuteAsync(sql, new { jobId });
        return rows > 0;
    }
}