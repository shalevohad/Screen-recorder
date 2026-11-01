// ==========================================
// File: Features/Extractor/Services/Jobs/DummyVideoGenerator.cs
// ==========================================
using System;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public class DummyVideoGenerator : IDummyVideoGenerator
    {
        private readonly IFfmpegBinaryResolver _binaryResolver;
        private readonly INoSignalPatternService _patternService;
        private readonly ILogger<DummyVideoGenerator> _logger;
        private static readonly System.Collections.Concurrent.ConcurrentDictionary<string, string> _cachedDummies = new();

        public DummyVideoGenerator(
            IFfmpegBinaryResolver binaryResolver,
            INoSignalPatternService patternService,
            ILogger<DummyVideoGenerator> logger)
        {
            _binaryResolver = binaryResolver;
            _patternService = patternService;
            _logger = logger;
        }

        /// <summary>
        /// Generates or retrieves a cached dummy video using sample file properties, defaulting to 1080p30 with audio.
        /// Breaks circular dependency with IMediaProbeService.
        /// </summary>
        /// <param name="sampleFilePath">Optional sample file path for parameter resolution.</param>
        /// <param name="durationSeconds">Duration of dummy video to generate in seconds (clamped to 5s).</param>
        /// <param name="ct">Cancellation token.</param>
        /// <returns>Path to the generated dummy MP4 file.</returns>
        public async Task<string> GetOrGenerateDummyVideoAsync(string sampleFilePath, double durationSeconds = 5, CancellationToken ct = default)
        {
            // Default to 1080p30 unless explicit resolution is requested
            return await GetOrCreateDummyVideoAsync(durationSeconds, 1920, 1080, 30.0, true, ct);
        }

        public async Task<string> GetOrCreateDummyVideoAsync(double durationSeconds, int width, int height, double fps, bool hasAudio = true, CancellationToken ct = default)
        {
            int w = width > 0 ? width : 1920;
            int h = height > 0 ? height : 1080;
            double f = fps > 0 ? fps : 30.0;
            string fpsStr = f.ToString("0.00", CultureInfo.InvariantCulture);

            string cacheKey = $"{w}x{h}_{fpsStr}_{hasAudio}";
            if (_cachedDummies.TryGetValue(cacheKey, out var cachedPath) && File.Exists(cachedPath) && new FileInfo(cachedPath).Length > 1024)
            {
                return cachedPath;
            }

            string tempDir = Path.GetTempPath();
            string outPath = Path.Combine(tempDir, $"dummy_{cacheKey}_{Guid.NewGuid():N}.mp4");

            // Rule: Cap the generated master dummy video asset duration to 5 seconds max.
            // The FFmpeg concat demuxer can loop or repeat this 5-second template in the manifest to fill any gap,
            // enabling near-instant (50ms) encoding rather than generating massive hour-long dummy files that stall exports.
            double safeDuration = Math.Clamp(durationSeconds, 1.0, 5.0);

            await GenerateProceduralDummyAsync(outPath, w.ToString(), h.ToString(), fpsStr, safeDuration, hasAudio, ct);

            if (File.Exists(outPath) && new FileInfo(outPath).Length > 1024)
            {
                _cachedDummies[cacheKey] = outPath;
                return outPath;
            }

            return outPath;
        }

        public Task<string> GetOrGenerateDummyVideoAsync(double durationSeconds, int width, int height, double fps, bool hasAudio = true, CancellationToken ct = default)
        {
            return GetOrCreateDummyVideoAsync(durationSeconds, width, height, fps, hasAudio, ct);
        }

        public Task<string> GetOrCreateDummyVideoAsync(double durationSeconds, CancellationToken ct = default)
        {
            return GetOrCreateDummyVideoAsync(durationSeconds, 1920, 1080, 30.0, true, ct);
        }

        public Task GenerateDummyVideoAsync(string outputPath, string width, string height, string fps)
        {
            return GenerateProceduralDummyAsync(outputPath, width, height, fps, 5.0, true, CancellationToken.None);
        }

        private async Task GenerateProceduralDummyAsync(string outputPath, string width, string height, string fpsStr, double durationSeconds, bool hasAudio, CancellationToken ct)
        {
            string ffmpegPath = _binaryResolver.ResolveFfmpeg();
            string durStr = durationSeconds.ToString("0.000", CultureInfo.InvariantCulture);
            string? tempImg = null;

            using var timeoutCts = CancellationTokenSource.CreateLinkedTokenSource(ct);
            timeoutCts.CancelAfter(TimeSpan.FromSeconds(10));
            var effectiveCt = timeoutCts.Token;

            try
            {
                byte[] noSignalBytes = await _patternService.GetOrCreateNoSignalFrameAsync(ffmpegPath, effectiveCt);

                if (noSignalBytes != null && noSignalBytes.Length > 0)
                {
                    tempImg = Path.Combine(Path.GetTempPath(), $"nosignal_dummy_{Guid.NewGuid():N}.jpg");
                    await File.WriteAllBytesAsync(tempImg, noSignalBytes, effectiveCt);

                    string imageFilter = $"scale={width}:{height}:force_original_aspect_ratio=decrease," +
                                         $"pad={width}:{height}:(ow-iw)/2:(oh-ih)/2:color=black";

                    string audioInput = hasAudio ? $"-f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 " : "";
                    string audioCodec = hasAudio ? "-c:a aac -b:a 64k " : "-an ";

                    string imgArgs = $"-y -nostdin -loglevel error " +
                                     $"-loop 1 -framerate {fpsStr} -i \"{tempImg.Replace('\\', '/')}\" " +
                                     $"{audioInput}" +
                                     $"-vf \"{imageFilter}\" " +
                                     $"-c:v libx264 -preset ultrafast -tune stillimage -crf 24 -pix_fmt yuv420p " +
                                     $"{audioCodec}-t {durStr} \"{outputPath.Replace('\\', '/')}\"";

                    using var proc = Process.Start(new ProcessStartInfo
                    {
                        FileName = ffmpegPath,
                        Arguments = imgArgs,
                        UseShellExecute = false,
                        CreateNoWindow = true
                    });

                    if (proc != null)
                    {
                        await proc.WaitForExitAsync(effectiveCt);
                        if (proc.ExitCode == 0 && File.Exists(outputPath) && new FileInfo(outputPath).Length > 1024)
                        {
                            return;
                        }
                    }
                }

                string fbAudioInput = hasAudio ? $"-f lavfi -i anullsrc=channel_layout=stereo:sample_rate=48000 " : "";
                string fbAudioCodec = hasAudio ? "-c:a aac -b:a 64k " : "-an ";

                string fallbackArgs = $"-y -nostdin -loglevel error " +
                                      $"-f lavfi -i color=c=black:s={width}x{height}:r={fpsStr} " +
                                      $"{fbAudioInput}" +
                                      $"-c:v libx264 -preset ultrafast -tune stillimage -crf 26 -pix_fmt yuv420p " +
                                      $"{fbAudioCodec}-t {durStr} \"{outputPath.Replace('\\', '/')}\"";

                using var fallbackProcess = Process.Start(new ProcessStartInfo
                {
                    FileName = ffmpegPath,
                    Arguments = fallbackArgs,
                    UseShellExecute = false,
                    CreateNoWindow = true
                });

                if (fallbackProcess != null)
                {
                    await fallbackProcess.WaitForExitAsync(effectiveCt);
                }
            }
            finally
            {
                if (tempImg != null && File.Exists(tempImg))
                {
                    try { File.Delete(tempImg); } catch { }
                }
            }
        }
    }
}