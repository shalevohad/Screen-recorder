using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;

namespace ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services
{
    public class AdvancedExtractorService : ExtractorService
    {
        private readonly IDummyVideoGenerator _dummyVideoGenerator;
        private readonly INoSignalPatternService _patternService;
        private readonly IVideoMetadataService _metadataService;
        private readonly ISynchronizationPlanBuilder _planBuilder;
        private readonly ISynchronizedTrackCutter _trackCutter;
        private readonly IMediaProbeService _mediaProbeService;
        private readonly ILogger<AdvancedExtractorService> _advancedLogger;
        private readonly ExtractorOptions _extractorOptions;
        private readonly IMemoryCache? _memoryCache;
        private static readonly SemaphoreSlim _visualThrottle = new(4, 4);

        public AdvancedExtractorService(
            IStorageScannerService storageScanner,
            IFfmpegConcatRunner ffmpegRunner,
            IOptions<ExtractorOptions> extractorOptions,
            IDummyVideoGenerator dummyVideoGenerator,
            INoSignalPatternService patternService,
            IVideoMetadataService metadataService,
            ISynchronizationPlanBuilder planBuilder,
            ISynchronizedTrackCutter trackCutter,
            IMediaProbeService mediaProbeService,
            ILogger<AdvancedExtractorService> logger,
            IMemoryCache? memoryCache = null)
            : base(storageScanner, ffmpegRunner, extractorOptions, logger)
        {
            _dummyVideoGenerator = dummyVideoGenerator;
            _patternService = patternService;
            _metadataService = metadataService;
            _planBuilder = planBuilder;
            _trackCutter = trackCutter;
            _mediaProbeService = mediaProbeService;
            _advancedLogger = logger;
            _extractorOptions = extractorOptions.Value;
            _memoryCache = memoryCache;
        }

        public new string ResolveFfmpegBinary() => ResolveBinary("ffmpeg");
        public string ResolveFfprobeBinary() => ResolveBinary("ffprobe");

        public string ResolveBinary(string baseName)
        {
            string binaryName = OperatingSystem.IsWindows() ? $"{baseName}.exe" : baseName;
            var baseDir = AppContext.BaseDirectory;
            string[] directCandidates = {
                Path.Combine(baseDir, "Features", "ExtractorAdvanced", binaryName),
                Path.Combine(baseDir, "Features", "Extractor", binaryName),
                Path.Combine(baseDir, "MediaMTX", binaryName),
                Path.Combine(baseDir, binaryName)
            };

            foreach (var path in directCandidates)
            {
                var full = Path.GetFullPath(path);
                if (File.Exists(full)) return full;
            }

            return binaryName;
        }

        public Task<ProbedStationMetadata> GetOrProbeStationMetadataAsync(
            string hostname, DateTime startUtc, DateTime endUtc, CancellationToken ct = default) =>
            _mediaProbeService.GetOrProbeStationMetadataAsync(hostname, startUtc, endUtc, ct);

        public Task<StreamMetadataDto> GetStreamMetadataAsync(string hostname, long epochMs, CancellationToken ct = default) =>
            _metadataService.GetStreamMetadataAsync(hostname, epochMs, ResolveFfprobeBinary(), ct);

        public SynchronizationPlan BuildSynchronizationPlan(
            List<string> stationIds,
            DateTime startUtc,
            DateTime endUtc,
            Dictionary<string, List<RecordingChunkMetadata>> stationChunks) =>
            _planBuilder.BuildSynchronizationPlan(stationIds, startUtc, endUtc, stationChunks);

        public Task<(string OutputFilePath, bool HasAudio)> CutSynchronizedTrackAsync(
            string stationId,
            SynchronizationPlan plan,
            List<RecordingChunkMetadata> stationChunks,
            string tempOutputDir,
            bool isMultiStation,
            IProgress<(double SecondsProcessed, double Fps, double SpeedMultiplier)>? progress = null,
            CancellationToken ct = default) =>
            _trackCutter.CutSynchronizedTrackAsync(stationId, plan, stationChunks, tempOutputDir, isMultiStation, progress, ct);

        // =========================================================================
        // חילוץ פריים מהיר (Keyframe Fast-Seek ב-RAM בלבד)
        // =========================================================================

        public async Task<Stream> ExtractFrameAsync(string hostname, long epochMs, CancellationToken ct = default)
        {
            long quantEpoch = (epochMs / 500) * 500;
            string cacheKey = $"frame_{hostname}_{quantEpoch}";

            if (_memoryCache != null && _memoryCache.TryGetValue(cacheKey, out byte[]? cached) && cached != null)
            {
                return new MemoryStream(cached);
            }

            DateTime targetUtc = DateTimeOffset.FromUnixTimeMilliseconds(epochMs).UtcDateTime;

            var chunks = await _storageScanner.GetChunksForStationAsync(hostname, targetUtc.AddMinutes(-5), targetUtc.AddMinutes(5));
            var matchingChunk = chunks.FirstOrDefault(c =>
                !string.IsNullOrEmpty(c.FullPath) &&
                File.Exists(c.FullPath) &&
                c.StartUtc <= targetUtc &&
                targetUtc <= c.EndUtc);

            string ffmpegPath = ResolveFfmpegBinary();

            if (matchingChunk == null)
            {
                byte[] noSignal = await _patternService.GetOrCreateNoSignalFrameAsync(ffmpegPath, ct);
                return (noSignal != null && noSignal.Length > 0) ? new MemoryStream(noSignal) : Stream.Null;
            }

            double offsetSeconds = Math.Max(0, (targetUtc - matchingChunk.StartUtc).TotalSeconds);
            byte[]? frameData = await ExtractKeyframeDirectAsync(ffmpegPath, matchingChunk.FullPath, offsetSeconds, ct);

            if (frameData != null && frameData.Length > 0)
            {
                _memoryCache?.Set(cacheKey, frameData, TimeSpan.FromMinutes(3));
                return new MemoryStream(frameData);
            }

            byte[] fallback = await _patternService.GetOrCreateNoSignalFrameAsync(ffmpegPath, ct);
            return new MemoryStream(fallback);
        }

        // =========================================================================
        // יצירת Spritesheet מבוססת דגימת מפתח ישירה (ללא Concat וללא קבצים בדיסק)
        // =========================================================================

        public async Task<Stream> GenerateSpritesheetAsync(
            string hostname,
            DateTime startUtc,
            DateTime endUtc,
            int frameCount,
            int tileWidth = 100,
            int tileHeight = 50,
            CancellationToken ct = default)
        {
            frameCount = Math.Clamp(frameCount, 2, 8);
            tileWidth = Math.Clamp(tileWidth, 60, 240);
            tileHeight = Math.Clamp(tileHeight, 30, 135);

            long startEpoch = new DateTimeOffset(startUtc).ToUnixTimeMilliseconds();
            long endEpoch = new DateTimeOffset(endUtc).ToUnixTimeMilliseconds();
            long totalMs = endEpoch - startEpoch;

            if (totalMs <= 0) return Stream.Null;

            long bucketSizeMs = Math.Max(1000, totalMs / frameCount);
            long bucketStart = (startEpoch / bucketSizeMs) * bucketSizeMs;
            string sheetCacheKey = $"sheet_{hostname}_{bucketStart}_{frameCount}_{tileWidth}x{tileHeight}";

            if (_memoryCache != null && _memoryCache.TryGetValue(sheetCacheKey, out byte[]? cachedSheet) && cachedSheet != null)
            {
                return new MemoryStream(cachedSheet);
            }

            var chunks = await _storageScanner.GetChunksForStationAsync(hostname, startUtc, endUtc);
            string ffmpegPath = ResolveFfmpegBinary();

            if (chunks.Count == 0)
            {
                byte[] blackTile = await _patternService.GetOrCreateBlackTileAsync(ffmpegPath, tileWidth, tileHeight, frameCount, ct);
                return new MemoryStream(blackTile);
            }

            var sampleChunk = chunks.First();
            double offsetSeconds = Math.Max(0, (startUtc - sampleChunk.StartUtc).TotalSeconds);
            double intervalSeconds = Math.Max(0.1, (endUtc - startUtc).TotalSeconds / frameCount);

            string filter = $"fps=1/{intervalSeconds.ToString("0.00", CultureInfo.InvariantCulture)},scale={tileWidth}:{tileHeight},tile={frameCount}x1";

            using var memoryStream = new MemoryStream(65536);
            var startInfo = new ProcessStartInfo
            {
                FileName = ffmpegPath,
                Arguments = $"-nostdin -loglevel error -noautorotate " +
                            $"-ss {offsetSeconds.ToString("0.000", CultureInfo.InvariantCulture)} " +
                            $"-i \"{sampleChunk.FullPath.Replace('\\', '/')}\" " +
                            $"-vf \"{filter}\" -an -sn -dn -threads 2 -frames:v 1 -q:v 4 -f image2pipe -vcodec mjpeg pipe:1",
                RedirectStandardOutput = true,
                RedirectStandardError = false,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(ct);
            linkedCts.CancelAfter(TimeSpan.FromSeconds(4));

            await _visualThrottle.WaitAsync(linkedCts.Token);
            using var process = new Process { StartInfo = startInfo };

            try
            {
                process.Start();
                using var reg = linkedCts.Token.Register(() => { try { if (!process.HasExited) process.Kill(true); } catch { } });

                await process.StandardOutput.BaseStream.CopyToAsync(memoryStream, 16384, linkedCts.Token);
                await process.WaitForExitAsync(linkedCts.Token);

                if (memoryStream.Length > 0)
                {
                    byte[] sheetBytes = memoryStream.ToArray();
                    _memoryCache?.Set(sheetCacheKey, sheetBytes, TimeSpan.FromMinutes(5));
                    return new MemoryStream(sheetBytes);
                }
            }
            catch { }
            finally
            {
                _visualThrottle.Release();
            }

            byte[] fallbackTile = await _patternService.GetOrCreateBlackTileAsync(ffmpegPath, tileWidth, tileHeight, frameCount, ct);
            return new MemoryStream(fallbackTile);
        }

        private async Task<byte[]?> ExtractKeyframeDirectAsync(
            string ffmpegPath,
            string inputPath,
            double offsetSeconds,
            CancellationToken ct)
        {
            using var memoryStream = new MemoryStream(32768);
            using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(ct);
            linkedCts.CancelAfter(TimeSpan.FromSeconds(2));

            await _visualThrottle.WaitAsync(linkedCts.Token);
            try
            {
                var startInfo = new ProcessStartInfo
                {
                    FileName = ffmpegPath,
                    Arguments = $"-nostdin -loglevel error -noautorotate " +
                                $"-skip_frame nokey -ss {offsetSeconds.ToString("0.000", CultureInfo.InvariantCulture)} " +
                                $"-i \"{inputPath.Replace('\\', '/')}\" -an -sn -dn -threads 1 -vframes 1 -q:v 3 -f image2pipe -vcodec mjpeg pipe:1",
                    RedirectStandardOutput = true,
                    RedirectStandardError = false,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };

                using var process = new Process { StartInfo = startInfo };
                process.Start();

                using var reg = linkedCts.Token.Register(() => { try { if (!process.HasExited) process.Kill(true); } catch { } });
                await process.StandardOutput.BaseStream.CopyToAsync(memoryStream, 16384, linkedCts.Token);
                await process.WaitForExitAsync(linkedCts.Token);

                if (memoryStream.Length > 0)
                {
                    return memoryStream.ToArray();
                }
            }
            catch { }
            finally
            {
                _visualThrottle.Release();
            }

            return null;
        }
    }
}