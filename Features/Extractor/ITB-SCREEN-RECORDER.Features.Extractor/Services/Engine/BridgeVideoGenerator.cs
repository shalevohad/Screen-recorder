// ==========================================
// File: Features/Extractor/Services/BridgeVideoGenerator.cs
// ==========================================
using System;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using Microsoft.Extensions.Logging;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    /// <summary>
    /// Generates bridge videos (e.g. synthetic "No Signal" test pattern frames with silent audio)
    /// to fill recording gaps and maintain timeline synchronization across multi-station exports.
    /// </summary>
    public class BridgeVideoGenerator : IBridgeVideoGenerator
    {
        private readonly IFfmpegBinaryResolver _binaryResolver;
        private readonly INoSignalPatternService _patternService;
        private readonly ILogger<BridgeVideoGenerator> _logger;

        public BridgeVideoGenerator(
            IFfmpegBinaryResolver binaryResolver,
            INoSignalPatternService patternService,
            ILogger<BridgeVideoGenerator> logger)
        {
            _binaryResolver = binaryResolver;
            _patternService = patternService;
            _logger = logger;
        }

        /// <summary>
        /// Generates a synthetic MP4 video bridge matching the target station's resolution, frame rate, and audio properties.
        /// </summary>
        /// <param name="durationSeconds">Duration of the gap in seconds.</param>
        /// <param name="probe">Target station metadata (resolution, fps, audio channels and sample rate).</param>
        /// <param name="tempDir">Temporary directory to write the generated bridge MP4 file.</param>
        /// <param name="forceIncludeAudio">Whether to generate a silent audio track matching the station's audio stream.</param>
        /// <param name="ct">Cancellation token for aborting generation.</param>
        /// <returns>The file path to the generated bridge video file.</returns>
        public async Task<string> GenerateMatchedBridgeVideoAsync(
            double durationSeconds,
            ProbedStationMetadata probe,
            string tempDir,
            bool forceIncludeAudio,
            CancellationToken ct = default)
        {
            string bridgePath = Path.Combine(tempDir, $"bridge_{Guid.NewGuid():N}.mp4");
            string ffmpegPath = _binaryResolver.ResolveFfmpeg();
            string durStr = durationSeconds.ToString("0.000", CultureInfo.InvariantCulture);
            string fpsStr = Math.Clamp(probe.Fps, 10, 120).ToString("0.00", CultureInfo.InvariantCulture);
            int width = probe.Width > 0 ? probe.Width : 1920;
            int height = probe.Height > 0 ? probe.Height : 1080;

            string? tempNoSignalImg = null;

            try
            {
                // 1. Utilize graphic "No Signal" slate instead of blank black screen
                byte[] noSignalBytes = await _patternService.GetOrCreateNoSignalFrameAsync(ffmpegPath, ct);

                string videoInputArgs;
                string videoFilter;

                if (noSignalBytes != null && noSignalBytes.Length > 0)
                {
                    tempNoSignalImg = Path.Combine(tempDir, $"nosignal_{Guid.NewGuid():N}.jpg");
                    await File.WriteAllBytesAsync(tempNoSignalImg, noSignalBytes, ct);

                    videoInputArgs = $"-loop 1 -i \"{tempNoSignalImg.Replace('\\', '/')}\"";
                    videoFilter = $"-vf \"scale={width}:{height}:force_original_aspect_ratio=decrease,pad={width}:{height}:(ow-iw)/2:(oh-ih)/2:color=black,fps={fpsStr},format=yuv420p\"";
                }
                else
                {
                    videoInputArgs = $"-f lavfi -i color=c=black:s={width}x{height}:r={fpsStr}";
                    videoFilter = "-pix_fmt yuv420p";
                }

                // 2. Synthesize video with synchronized silent audio if required
                string args;
                if (forceIncludeAudio)
                {
                    int sampleRate = probe.AudioSampleRate > 0 ? probe.AudioSampleRate : 48000;
                    int channels = probe.AudioChannels > 0 ? probe.AudioChannels : 2;
                    string channelLayout = channels == 1 ? "mono" : "stereo";

                    args = $"-nostdin -loglevel error -y " +
                           $"{videoInputArgs} " +
                           $"-f lavfi -i anullsrc=r={sampleRate}:cl={channelLayout} " +
                           $"-t {durStr} " +
                           $"{videoFilter} " +
                           $"-c:v libx264 -preset ultrafast " +
                           $"-c:a aac -b:a 128k -ar {sampleRate} -ac {channels} " +
                           $"\"{bridgePath.Replace('\\', '/')}\"";
                }
                else
                {
                    args = $"-nostdin -loglevel error -y " +
                           $"{videoInputArgs} " +
                           $"-t {durStr} " +
                           $"{videoFilter} " +
                           $"-c:v libx264 -preset ultrafast " +
                           $"-an \"{bridgePath.Replace('\\', '/')}\"";
                }

                var psi = new ProcessStartInfo
                {
                    FileName = ffmpegPath,
                    Arguments = args,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };

                using var proc = Process.Start(psi);
                if (proc != null)
                {
                    await proc.WaitForExitAsync(ct);
                }

                return bridgePath;
            }
            finally
            {
                if (tempNoSignalImg != null && File.Exists(tempNoSignalImg))
                {
                    try { File.Delete(tempNoSignalImg); } catch { }
                }
            }
        }
    }
}