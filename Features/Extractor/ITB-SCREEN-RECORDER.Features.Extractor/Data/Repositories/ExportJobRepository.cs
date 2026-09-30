namespace ITB_SCREEN_RECORDER.Features.Extractor.Data.Repositories;

using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using ITB_SCREEN_RECORDER.Features.Extractor.Data;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;

public sealed class ExportJobRepository : IExportJobRepository
{
    private readonly IExtractorConnectionFactory _factory;

    public ExportJobRepository(IExtractorConnectionFactory factory)
    {
        _factory = factory;
    }

    public async Task UpsertJobAsync(ExportJobInfo job)
    {
        using var db = _factory.CreateConnection();
        const string sql = @"
            INSERT INTO export_jobs (
                JobId, FileName, Status, ProgressPercent, StatusMessage, SpeedMBps,
                EtaSeconds, FileSizeBytes, CreatedAtUtc, CompletedAtUtc, ErrorMessage,
                OutputFilePath, NetworkFolderPath, DownloadCount, IsBookmarked
            ) VALUES (
                @JobId, @FileName, @Status, @ProgressPercent, @StatusMessage, @SpeedMBps,
                @EtaSeconds, @FileSizeBytes, @CreatedAtUtc, @CompletedAtUtc, @ErrorMessage,
                @OutputFilePath, @NetworkFolderPath, @DownloadCount, @IsBookmarked
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
                IsBookmarked = excluded.IsBookmarked;
        ";

        await db.ExecuteAsync(sql, job);
    }

    public async Task<List<ExportJobInfo>> GetAllJobsAsync()
    {
        using var db = _factory.CreateConnection();
        const string sql = "SELECT * FROM export_jobs ORDER BY CreatedAtUtc DESC;";
        var results = await db.QueryAsync<ExportJobInfo>(sql);
        return results.AsList();
    }

    public async Task<ExportJobInfo?> GetJobAsync(string jobId)
    {
        using var db = _factory.CreateConnection();
        const string sql = "SELECT * FROM export_jobs WHERE JobId = @jobId;";
        return await db.QuerySingleOrDefaultAsync<ExportJobInfo>(sql, new { jobId });
    }

    public async Task<bool> DeleteJobAsync(string jobId)
    {
        using var db = _factory.CreateConnection();
        const string sql = "DELETE FROM export_jobs WHERE JobId = @jobId;";
        int rows = await db.ExecuteAsync(sql, new { jobId });
        return rows > 0;
    }

    public async Task UpdateBookmarkAsync(string jobId, bool isBookmarked)
    {
        using var db = _factory.CreateConnection();
        const string sql = "UPDATE export_jobs SET IsBookmarked = @isBookmarked WHERE JobId = @jobId;";
        await db.ExecuteAsync(sql, new { jobId, isBookmarked });
    }

    public async Task IncrementDownloadCountAsync(string jobId)
    {
        using var db = _factory.CreateConnection();
        const string sql = "UPDATE export_jobs SET DownloadCount = DownloadCount + 1 WHERE JobId = @jobId;";
        await db.ExecuteAsync(sql, new { jobId });
    }
}