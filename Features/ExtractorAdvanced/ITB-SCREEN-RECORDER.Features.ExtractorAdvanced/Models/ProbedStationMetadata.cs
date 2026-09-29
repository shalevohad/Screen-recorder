// ==========================================
// File: Features/ExtractorAdvanced/Models/ProbedStationMetadata.cs
// ==========================================
namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models
{
    public class ProbedStationMetadata
    {
        public int Width { get; set; } = 1920;
        public int Height { get; set; } = 1080;
        public double Fps { get; set; } = 30.0;
        public bool IsVfr { get; set; } = false;
        public string PixFmt { get; set; } = "yuv420p";
        public bool HasAudio { get; set; } = false;
        public int AudioSampleRate { get; set; } = 48000;
        public int AudioChannels { get; set; } = 2;
        public string AudioCodec { get; set; } = "aac";
    }
}