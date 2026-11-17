// ==========================================
// File: ITB-SCREEN-RECORDER.Core/Media/Contracts/IMediaProbeService.cs
// ==========================================
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Media.Models;

namespace ITB_SCREEN_RECORDER.Core.Media.Contracts
{
    /// <summary>
    /// Service contract for probing media container format, streams, codecs, and metadata tags in-process.
    /// Eliminates reliance on external ffprobe.exe binaries across Core, Extractor, and ExtractorAdvanced.
    /// </summary>
    public interface IMediaProbeService
    {
        /// <summary>
        /// Asynchronously probes media container and stream attributes from a local or UNC file path.
        /// Adheres to non-locking file access (Rule 10).
        /// </summary>
        Task<MediaProbeResult> ProbeFileAsync(string filePath, CancellationToken ct = default);

        /// <summary>
        /// Synchronously probes media container and stream attributes from a local or UNC file path.
        /// </summary>
        MediaProbeResult ProbeFile(string filePath);
    }
}
