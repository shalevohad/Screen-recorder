using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services
{
    public class AdvancedExtractorService : ExtractorService
    {
        public AdvancedExtractorService(
            IStorageScannerService storageScanner,
            IFfmpegConcatRunner ffmpegRunner,
            IOptions<ExtractorOptions> extractorOptions,
            ILogger<AdvancedExtractorService> logger)
            : base(storageScanner, ffmpegRunner, extractorOptions, logger)
        {
        }

        /// <summary>
        /// הפקת Filmstrip / Spritesheet דינמי עבור ציר הזמן של עורך ה-NLE
        /// </summary>
        public async Task<Stream> GenerateSpritesheetAsync(
            string hostname,
            DateTime startUtc,
            DateTime endUtc,
            int frameCount,
            int tileWidth = 160,
            int tileHeight = 90,
            CancellationToken ct = default)
        {
            var chunks = await _storageScanner.GetChunksForStationAsync(hostname, startUtc, endUtc);
            if (chunks.Count == 0) return Stream.Null;

            string concatManifest = await _storageScanner.BuildConcatManifestAsync(chunks, startUtc, endUtc);
            string tempManifestPath = Path.Combine(Path.GetTempPath(), $"spritesheet_{Guid.NewGuid():N}.txt");
            await File.WriteAllTextAsync(tempManifestPath, concatManifest, new UTF8Encoding(false), ct);

            double totalSeconds = (endUtc - startUtc).TotalSeconds;
            double interval = Math.Max(0.1, totalSeconds / frameCount);

            string filters = $"fps=1/{interval:F3}," +
                             $"scale={tileWidth}:{tileHeight}:force_original_aspect_ratio=decrease," +
                             $"pad={tileWidth}:{tileHeight}:(ow-iw)/2:(oh-ih)/2:color=black," +
                             $"tile={frameCount}x1";

            string ffmpegPath = ResolveFfmpegBinary();
            string arguments = $"-f concat -safe 0 -i \"{tempManifestPath.Replace('\\', '/')}\" " +
                               $"-vf \"{filters}\" " +
                               $"-frames:v 1 -f image2pipe -vcodec mjpeg pipe:1";

            var startInfo = new ProcessStartInfo
            {
                FileName = ffmpegPath,
                Arguments = arguments,
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            var memoryStream = new MemoryStream();
            using var process = new Process { StartInfo = startInfo };

            await _visualConcurrencyThrottle.WaitAsync(ct);
            try
            {
                process.Start();
                await process.StandardOutput.BaseStream.CopyToAsync(memoryStream, 81920, ct);
                await process.WaitForExitAsync(ct);

                memoryStream.Position = 0;
                return memoryStream;
            }
            finally
            {
                _visualConcurrencyThrottle.Release();

                if (File.Exists(tempManifestPath))
                {
                    try { File.Delete(tempManifestPath); } catch { }
                }
            }
        }

        public override async Task StreamTarArchiveAsync(ExtractionRequestDto request, Stream destinationStream, CancellationToken ct)
        {
            _logger.LogInformation("Advanced NLE Studio is delegating archive stream to base...");
            await base.StreamTarArchiveAsync(request, destinationStream, ct);
        }
    }
}