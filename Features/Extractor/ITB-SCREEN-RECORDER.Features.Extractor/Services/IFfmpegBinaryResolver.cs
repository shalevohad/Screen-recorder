// ==========================================
// File: Features/Extractor/Services/IFfmpegBinaryResolver.cs
// ==========================================
namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public class FfmpegHardwareCapabilities
    {
        public string VideoEncoder { get; set; } = "libx264";
        public string EncoderArgs { get; set; } = "-c:v libx264 -preset veryfast -crf 20";
        public bool IsGpuAccelerated { get; set; } = false;
        public string HardwareType { get; set; } = "CPU";
    }

    public interface IFfmpegBinaryResolver
    {
        string ResolveFfmpeg();
        string ResolveFfprobe();
        string ResolveBinary(string baseName);

        /// <summary>
        /// מחזיר את ארגומנטי הקידוד המהירים ביותר לפי יכולות החומרה שנדגמו ונשמרו בזיכרון.
        /// </summary>
        string GetOptimalVideoEncoderArgs(int? bitrateKbps = null);

        /// <summary>
        /// מחזיר את מודל יכולות החומרה המלא (האם מופעל כרטיס גרפי, סוג מאיץ ושם המקודד).
        /// </summary>
        FfmpegHardwareCapabilities GetCapabilities();
    }
}