// ==========================================
// File: ITB-SCREEN-RECORDER.Core/Media/Contracts/IAudioDecoderService.cs
// ==========================================
using System.Threading;
using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.Core.Media.Contracts
{
    /// <summary>
    /// Service contract for decoding audio streams and extracting acoustic waveform peak envelopes in-process.
    /// Eliminates spawning subprocess ffmpeg instances during timeline waveform generation.
    /// </summary>
    public interface IAudioDecoderService
    {
        /// <summary>
        /// Extracts normalized acoustic waveform peaks [0.0 to 1.0] across a time window directly in-memory.
        /// </summary>
        Task<float[]> ExtractWaveformPeaksAsync(
            string filePath,
            double startSec,
            double durationSec,
            int targetPoints,
            CancellationToken ct = default);

        /// <summary>
        /// Decodes a time slice of an audio file to 16-bit PCM mono or stereo samples in-process.
        /// </summary>
        Task<short[]> DecodeAudioSamplesAsync(
            string filePath,
            double startSec,
            double durationSec,
            int targetSampleRate = 1000,
            int targetChannels = 1,
            CancellationToken ct = default);
    }
}
