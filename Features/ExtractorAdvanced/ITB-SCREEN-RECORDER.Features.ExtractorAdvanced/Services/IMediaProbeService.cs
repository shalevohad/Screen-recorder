// ==========================================
// File: Features/ExtractorAdvanced/Services/IMediaProbeService.cs
// ==========================================
using System;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services
{
    public interface IMediaProbeService
    {
        Task<ProbedStationMetadata> GetOrProbeStationMetadataAsync(
            string hostname,
            DateTime startUtc,
            DateTime endUtc,
            CancellationToken ct = default);

        Task<ProbedStationMetadata> ProbeMediaFileDirectlyAsync(
            string filePath,
            string stationId,
            CancellationToken ct = default);
    }
}