using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public record ReindexResult(int TotalScanned, int NewlyIndexed, int SkippedExisting, int Errors);

    public interface IStorageScannerService
    {
        Task<List<string>> GetAvailableHostsAsync(DateTime startUtc, DateTime endUtc);
        Task<List<RecordingChunkMetadata>> GetChunksForStationAsync(string hostname, DateTime startUtc, DateTime endUtc);
        Task<string> BuildConcatManifestAsync(List<RecordingChunkMetadata> chunks, DateTime rangeStartUtc, DateTime rangeEndUtc);
        Task<ReindexResult> ScanAndIndexMissingFilesAsync(CancellationToken ct = default);
    }
}