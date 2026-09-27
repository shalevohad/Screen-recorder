namespace ITB_SCREEN_RECORDER.Features.Extractor.Data.Repositories;

using System.Collections.Generic;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;

public interface IExportJobRepository
{
    Task UpsertJobAsync(ExportJobInfo job);
    Task<List<ExportJobInfo>> GetAllJobsAsync();
    Task<ExportJobInfo?> GetJobAsync(string jobId);
    Task<bool> DeleteJobAsync(string jobId);
    Task UpdateBookmarkAsync(string jobId, bool isBookmarked);
    Task IncrementDownloadCountAsync(string jobId);
}