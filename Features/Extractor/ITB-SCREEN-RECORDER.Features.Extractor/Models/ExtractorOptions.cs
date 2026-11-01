namespace ITB_SCREEN_RECORDER.Features.Extractor.Models
{
    /// <summary>
    /// Configuration options for the video extractor engine, paths, and FFmpeg concurrency limits.
    /// </summary>
    public class ExtractorOptions
    {
        public const string SectionName = "Extractor";

        /// <summary>
        /// Destination directory where cut videos and exported archives (Smart Cut / Tar Archives) are stored.
        /// </summary>
        public string ExportPath { get; set; } = @"C:\ProgramData\ITB-SCREEN-RECORDER\Exports";

        /// <summary>
        /// Explicit path to the FFmpeg binary (optional; defaults to system PATH or application directory).
        /// </summary>
        public string? FfmpegPath { get; set; } = string.Empty;

        /// <summary>
        /// Maximum number of concurrent FFmpeg worker processes allowed for cutting and export operations.
        /// </summary>
        public int MaxConcurrentFfmpegProcesses { get; set; } = 4;
    }
}