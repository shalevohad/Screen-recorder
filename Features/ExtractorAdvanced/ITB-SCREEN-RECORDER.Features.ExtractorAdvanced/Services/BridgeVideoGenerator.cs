// ==========================================
// File: Features/ExtractorAdvanced/Services/BridgeVideoGenerator.cs
// ==========================================
using System;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;
using Microsoft.Extensions.Logging;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services
{
    public class BridgeVideoGenerator : IBridgeVideoGenerator
    {
        private readonly IFfmpegBinaryResolver _binaryResolver;
        private readonly ILogger<BridgeVideoGenerator> _logger;

        public BridgeVideoGenerator(
            IFfmpegBinaryResolver binaryResolver,
            ILogger<BridgeVideoGenerator> logger)
        {
            _binaryResolver = binaryResolver;
            _logger = logger;
        }

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

            string args;
            if (forceIncludeAudio)
            {
                int sampleRate = probe.AudioSampleRate > 0 ? probe.AudioSampleRate : 48000;
                int channels = probe.AudioChannels > 0 ? probe.AudioChannels : 2;
                string channelLayout = channels == 1 ? "mono" : "stereo";

                args = $"-nostdin -loglevel error -y " +
                       $"-f lavfi -i color=c=black:s={probe.Width}x{probe.Height}:r={fpsStr} " +
                       $"-f lavfi -i anullsrc=r={sampleRate}:cl={channelLayout} " +
                       $"-t {durStr} " +
                       $"-c:v libx264 -preset ultrafast -pix_fmt yuv420p " +
                       $"-c:a aac -b:a 128k -ar {sampleRate} -ac {channels} " +
                       $"\"{bridgePath.Replace('\\', '/')}\"";
            }
            else
            {
                args = $"-nostdin -loglevel error -y " +
                       $"-f lavfi -i color=c=black:s={probe.Width}x{probe.Height}:r={fpsStr} " +
                       $"-t {durStr} " +
                       $"-c:v libx264 -preset ultrafast -pix_fmt yuv420p " +
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
    }
}