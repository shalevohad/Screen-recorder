// ==========================================
// File: Features/ExtractorAdvanced/Services/IBridgeVideoGenerator.cs
// ==========================================
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services
{
    public interface IBridgeVideoGenerator
    {
        Task<string> GenerateMatchedBridgeVideoAsync(
            double durationSeconds,
            ProbedStationMetadata probe,
            string tempDir,
            bool forceIncludeAudio,
            CancellationToken ct = default);
    }
}