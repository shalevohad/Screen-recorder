namespace ITB_SCREEN_RECORDER.Server.Features.Extractor.Models
{
    public class ExtractorOptions
    {
        public const string SectionName = "Extractor";

        public string? FfmpegPath { get; set; } = string.Empty;

        public int MaxConcurrentFfmpegProcesses { get; set; } = 4;
    }
}