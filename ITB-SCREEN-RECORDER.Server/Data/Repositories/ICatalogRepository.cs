namespace ITB_SCREEN_RECORDER.Server.Data.Repositories;

using System.Collections.Generic;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Contracts.Storage;

public interface ICatalogRepository
{
    Task BulkUpsertChunksAsync(IEnumerable<ChunkFinalizedEvent> chunks);
    Task<IReadOnlyList<ChunkFinalizedEvent>> GetChunksForWindowAsync(string stationId, long fromEpochMs, long toEpochMs);
    Task<IReadOnlyList<ChunkFinalizedEvent>> GetExpiredCandidateChunksAsync(long cutoffUtc, int batchLimit);
    Task RemoveChunksAsync(IEnumerable<string> filePaths);
}