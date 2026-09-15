namespace ITB_SCREEN_RECORDER.Features.Extractor.Models
{
    public class ExtractorOptions
    {
        public const string SectionName = "Extractor";

        public string PrimaryStoragePath { get; set; } = @"\\netapp\recordings";

        public string LocalFallbackPath { get; set; } = @"C:\Recordings";

        public string? FfmpegPath { get; set; } = string.Empty;

        public int MaxConcurrentFfmpegProcesses { get; set; } = 4;
    }
}