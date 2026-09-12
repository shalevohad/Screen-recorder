using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public interface IStorageScannerService
    {
        Task<List<string>> GetAvailableHostsAsync(DateTime startUtc, DateTime endUtc);
        Task<List<RecordingChunkMetadata>> GetChunksForStationAsync(string hostname, DateTime startUtc, DateTime endUtc);
        string BuildConcatManifest(List<RecordingChunkMetadata> chunks, DateTime rangeStartUtc, DateTime rangeEndUtc);
    }
}