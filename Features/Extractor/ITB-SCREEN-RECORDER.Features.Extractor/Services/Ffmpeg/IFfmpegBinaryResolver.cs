// ==========================================
// File: Features/Extractor/Services/IFfmpegBinaryResolver.cs
// ==========================================
namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public class FfmpegHardwareCapabilities
    {
        public string VideoEncoder { get; set; } = "libx264";
        public string EncoderArgs { get; set; } = "-c:v libx264 -preset veryfast -crf 20";
        public string ZeroLatencyEncoderArgs { get; set; } = "-c:v libx264 -preset veryfast -tune zerolatency -crf 21 -maxrate 6000k -bufsize 6000k -threads 2 -pix_fmt yuv420p";
        public string HwaccelDecodeArgs { get; set; } = "-hwaccel auto";
        public bool IsGpuAccelerated { get; set; } = false;
        public string HardwareType { get; set; } = "CPU";
    }

    public interface IFfmpegBinaryResolver
    {
        string ResolveFfmpeg();
        string ResolveFfprobe();
        string ResolveBinary(string baseName);

        /// <summary>
        /// מחזיר את ארגומנטי הקידוד המהירים ביותר לפי יכולות החומרה שנדגמו פעם אחת בלבד ונשמרו בזיכרון.
        /// </summary>
        string GetOptimalVideoEncoderArgs(int? bitrateKbps = null);
        string GetOptimalVideoEncoderArgs(bool zeroLatency);
        string GetOptimalVideoEncoderArgs(int? bitrateKbps, bool zeroLatency);

        /// <summary>
        /// מחזיר את מודל יכולות החומרה המלא (האם מופעל כרטיס גרפי, סוג מאיץ, פענוח חומרה ושם המקודד).
        /// </summary>
        FfmpegHardwareCapabilities GetCapabilities();
    }
}