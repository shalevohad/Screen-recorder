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
        /// Returns optimal video encoder CLI arguments based on hardware capabilities probed once and cached in memory.
        /// </summary>
        /// <param name="bitrateKbps">Optional target video bitrate in kilobits per second.</param>
        /// <returns>FFmpeg argument string for video encoding.</returns>
        string GetOptimalVideoEncoderArgs(int? bitrateKbps = null);

        /// <summary>
        /// Returns optimal video encoder CLI arguments with zero-latency tuning.
        /// </summary>
        /// <param name="zeroLatency">Whether to enforce zero-latency flags for live rendering.</param>
        /// <returns>FFmpeg argument string for video encoding.</returns>
        string GetOptimalVideoEncoderArgs(bool zeroLatency);

        /// <summary>
        /// Returns optimal video encoder CLI arguments with bitrate and latency specifications.
        /// </summary>
        /// <param name="bitrateKbps">Optional target video bitrate in kilobits per second.</param>
        /// <param name="zeroLatency">Whether to enforce zero-latency flags.</param>
        /// <returns>FFmpeg argument string for video encoding.</returns>
        string GetOptimalVideoEncoderArgs(int? bitrateKbps, bool zeroLatency);

        /// <summary>
        /// Returns the full hardware capabilities model (GPU accelerated flag, accelerator type, hardware decoding, and encoder name).
        /// </summary>
        /// <returns>The hardware capabilities descriptor.</returns>
        FfmpegHardwareCapabilities GetCapabilities();
    }
}