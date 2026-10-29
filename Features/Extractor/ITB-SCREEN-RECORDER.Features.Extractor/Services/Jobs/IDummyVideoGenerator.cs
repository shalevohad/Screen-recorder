// ==========================================
// File: Features/Extractor/Services/Jobs/IDummyVideoGenerator.cs
// ==========================================
using System.Threading;
using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    /// <summary>
    /// Service responsible for generating synthetic video placeholders ("No Signal" slate) matching station dimensions.
    /// </summary>
    public interface IDummyVideoGenerator
    {
        /// <summary>
        /// Generates or fetches a dummy video matching properties derived from a sample file or defaults.
        /// </summary>
        /// <param name="sampleFilePath">Optional sample recording file path.</param>
        /// <param name="durationSeconds">Duration of dummy video in seconds.</param>
        /// <param name="ct">Cancellation token.</param>
        /// <returns>Path to the generated dummy video file.</returns>
        Task<string> GetOrGenerateDummyVideoAsync(string sampleFilePath, double durationSeconds = 3600, CancellationToken ct = default);

        Task<string> GetOrCreateDummyVideoAsync(double durationSeconds, int width, int height, double fps, bool hasAudio = true, CancellationToken ct = default);
        Task<string> GetOrGenerateDummyVideoAsync(double durationSeconds, int width, int height, double fps, bool hasAudio = true, CancellationToken ct = default);
        Task<string> GetOrCreateDummyVideoAsync(double durationSeconds, CancellationToken ct = default);
        Task GenerateDummyVideoAsync(string outputPath, string width, string height, string fps);
    }
}