namespace ITB_SCREEN_RECORDER.Server.Data.Repositories;

using System.Collections.Generic;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Contracts.Storage;

public record StationOverrideRecord(string Hostname, string? VideoBitrate, int? TargetFps, long UpdatedAtUtc);

public record CustomTabRecord(
    string Id,
    string Name,
    string HostnamesJson,
    string OusJson,
    int? TargetFps,
    int? TargetBitrateKbps,
    bool IsDefault,
    int DisplayOrder,
    long UpdatedAtUtc
);

public interface ICatalogRepository
{
    // Recording Chunks
    Task BulkUpsertChunksAsync(IEnumerable<ChunkFinalizedEvent> chunks);
    Task UpsertActiveChunkAsync(string stationId, string filePath, long startEpochMs, int fps, int width, int height, bool hasAudio);
    Task FinalizeChunkAsync(string filePath, long endEpochMs, long fileSizeBytes);
    Task<IReadOnlyList<ChunkFinalizedEvent>> GetChunksForWindowAsync(string stationId, long fromEpochMs, long toEpochMs);
    Task<IReadOnlyList<ChunkFinalizedEvent>> GetExpiredCandidateChunksAsync(long cutoffUtc, int batchLimit);
    Task RemoveChunksAsync(IEnumerable<string> filePaths);

    // System Configurations
    Task<string?> GetConfigurationAsync(string key);
    Task SetConfigurationAsync(string key, string jsonValue);
    Task<Dictionary<string, string>> GetAllConfigurationsAsync();

    // Custom Tabs
    Task<List<CustomTabRecord>> GetAllTabsAsync();
    Task UpsertTabAsync(CustomTabRecord tab);
    Task<bool> DeleteTabAsync(string tabId);

    // Station Overrides
    Task<Dictionary<string, StationOverrideRecord>> GetAllOverridesAsync();
    Task UpsertOverrideAsync(string hostname, string? videoBitrate, int? targetFps);
    Task<bool> DeleteOverrideAsync(string hostname);
}