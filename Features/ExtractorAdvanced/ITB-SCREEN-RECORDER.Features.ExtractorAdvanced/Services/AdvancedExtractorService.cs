// ==========================================
// File: Features/ExtractorAdvanced/Services/AdvancedExtractorService.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
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
        private static readonly SemaphoreSlim _localVisualThrottle = new(4, 4);

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
            string? assemblyDir = Path.GetDirectoryName(typeof(AdvancedExtractorService).Assembly.Location);
            if (!string.IsNullOrWhiteSpace(assemblyDir))
            {
                string pluginBin = Path.Combine(assemblyDir, binaryName);
                if (File.Exists(pluginBin)) { EnsureLinuxPermissions(pluginBin); return pluginBin; }
            }

            if (!string.IsNullOrWhiteSpace(_extractorOptions.FfmpegPath) && File.Exists(_extractorOptions.FfmpegPath) && baseName == "ffmpeg")
            {
                EnsureLinuxPermissions(_extractorOptions.FfmpegPath);
                return _extractorOptions.FfmpegPath;
            }

            var baseDir = AppContext.BaseDirectory;
            string[] directCandidates = {
                Path.Combine(baseDir, "Features", "ExtractorAdvanced", binaryName),
                Path.Combine(baseDir, "Features", "Extractor", binaryName),
                Path.Combine(baseDir, "Features", "Extractor", "Bin", binaryName),
                Path.Combine(baseDir, "Features", "Extractor", "Tools", "Win", binaryName),
                Path.Combine(baseDir, binaryName)
            };

            foreach (var path in directCandidates)
            {
                var full = Path.GetFullPath(path);
                if (File.Exists(full)) { EnsureLinuxPermissions(full); return full; }
            }

            return binaryName;
        }

        private static void EnsureLinuxPermissions(string filePath)
        {
            if (!OperatingSystem.IsLinux() || !File.Exists(filePath)) return;
            try
            {
                File.SetUnixFileMode(filePath,
                    UnixFileMode.UserRead | UnixFileMode.UserWrite | UnixFileMode.UserExecute |
                    UnixFileMode.GroupRead | UnixFileMode.GroupExecute |
                    UnixFileMode.OtherRead | UnixFileMode.OtherExecute);
            }
            catch { }
        }

        // 💡 מתודת הדגימה הנדרשת עבור ExtractorAdvancedController בשורה 71
        public Task<ProbedStationMetadata> GetOrProbeStationMetadataAsync(
            string hostname,
            DateTime startUtc,
            DateTime endUtc,
            CancellationToken ct = default) =>
            _mediaProbeService.GetOrProbeStationMetadataAsync(hostname, startUtc, endUtc, ct);

        public Task<ProbedStationMetadata> ProbeMediaFileDirectlyAsync(
            string filePath,
            string stationId,
            CancellationToken ct = default) =>
            _mediaProbeService.ProbeMediaFileDirectlyAsync(filePath, stationId, ct);

        public Task<StreamMetadataDto> GetStreamMetadataAsync(string hostname, long epochMs, CancellationToken ct = default) =>
            _metadataService.GetStreamMetadataAsync(hostname, epochMs, ResolveFfprobeBinary(), ct);

        public Task AdjustChunksToAccuratePtsAsync<T>(IEnumerable<T> chunks, CancellationToken ct = default) where T : class =>
            _metadataService.AdjustChunksToAccuratePtsAsync(chunks, ResolveFfprobeBinary(), ct);

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

        public async Task<Stream> ExtractFrameAsync(string hostname, long epochMs, CancellationToken ct = default)
        {
            string cacheKey = $"frame_{hostname}_{epochMs}";
            if (_memoryCache != null && _memoryCache.TryGetValue(cacheKey, out byte[]? cached) && cached != null)
                return new MemoryStream(cached);

            DateTime targetUtc = DateTimeOffset.FromUnixTimeMilliseconds(epochMs).UtcDateTime;

            var chunks = await _storageScanner.GetChunksForStationAsync(hostname, targetUtc.AddMinutes(-5), targetUtc.AddMinutes(5));
            await AdjustChunksToAccuratePtsAsync(chunks, ct);

            var matchingChunk = chunks.FirstOrDefault(c =>
                !string.IsNullOrEmpty(c.FullPath) &&
                File.Exists(c.FullPath) &&
                c.StartUtc <= targetUtc &&
                targetUtc <= c.EndUtc);

            string ffmpegPath = ResolveFfmpegBinary();

            if (matchingChunk == null)
            {
                byte[] noSignal = await _patternService.GetOrCreateNoSignalFrameAsync(ffmpegPath, ct);
                if (noSignal != null && noSignal.Length > 0)
                {
                    return new MemoryStream(noSignal);
                }
                return Stream.Null;
            }

            double offsetSeconds = Math.Max(0, (targetUtc - matchingChunk.StartUtc).TotalSeconds);
            string normalizedPath = matchingChunk.FullPath.Replace('\\', '/');

            byte[]? frameBytes = await TryExtractFrameInternalAsync(ffmpegPath, normalizedPath, offsetSeconds, fastSeek: true, ct);
            if (frameBytes == null || frameBytes.Length == 0)
            {
                frameBytes = await TryExtractFrameInternalAsync(ffmpegPath, normalizedPath, offsetSeconds, fastSeek: false, ct);
            }

            if (frameBytes != null && frameBytes.Length > 0)
            {
                _memoryCache?.Set(cacheKey, frameBytes, TimeSpan.FromMinutes(3));
                return new MemoryStream(frameBytes);
            }

            byte[] fallbackPattern = await _patternService.GetOrCreateNoSignalFrameAsync(ffmpegPath, ct);
            return new MemoryStream(fallbackPattern);
        }

        private async Task<byte[]?> TryExtractFrameInternalAsync(string ffmpegPath, string inputPath, double offsetSeconds, bool fastSeek, CancellationToken ct)
        {
            using var memoryStream = new MemoryStream(65536);
            using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(ct);
            linkedCts.CancelAfter(TimeSpan.FromSeconds(4));

            try
            {
                string seekArgs = fastSeek
                    ? $"-ss {offsetSeconds.ToString("0.000", CultureInfo.InvariantCulture)}"
                    : $"-ss {Math.Max(0, offsetSeconds - 3.0).ToString("0.000", CultureInfo.InvariantCulture)} -accurate_seek";

                double targetTime = fastSeek ? offsetSeconds : (offsetSeconds - Math.Max(0, offsetSeconds - 3.0));

                var startInfo = new ProcessStartInfo
                {
                    FileName = ffmpegPath,
                    Arguments = $"-nostdin -loglevel error -noautorotate {seekArgs} " +
                                $"-i \"{inputPath}\" -ss {targetTime.ToString("0.000", CultureInfo.InvariantCulture)} " +
                                $"-an -sn -dn -threads 2 -vframes 1 -q:v 4 -f image2pipe -vcodec mjpeg pipe:1",
                    RedirectStandardOutput = true,
                    RedirectStandardError = false,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };

                using var process = new Process { StartInfo = startInfo };
                process.Start();

                using var reg = linkedCts.Token.Register(() => { try { if (!process.HasExited) process.Kill(true); } catch { } });
                await process.StandardOutput.BaseStream.CopyToAsync(memoryStream, 32768, linkedCts.Token);
                await process.WaitForExitAsync(linkedCts.Token);

                if (memoryStream.Length > 0)
                {
                    return memoryStream.ToArray();
                }
            }
            catch { }

            return null;
        }

        public async Task<Stream> GenerateSpritesheetAsync(string hostname, DateTime startUtc, DateTime endUtc, int frameCount, int tileWidth = 100, int tileHeight = 50, CancellationToken ct = default)
        {
            frameCount = Math.Clamp(frameCount, 2, 8);
            tileWidth = Math.Clamp(tileWidth, 60, 240);
            tileHeight = Math.Clamp(tileHeight, 30, 135);

            double totalSeconds = (endUtc - startUtc).TotalSeconds;
            if (totalSeconds <= 0) return Stream.Null;

            string cacheDir = Path.Combine(Path.GetTempPath(), "itb_sprites_cache", hostname);
            Directory.CreateDirectory(cacheDir);

            string cacheFilePath = Path.Combine(cacheDir, $"{startUtc:yyyyMMddHHmmss}_{endUtc:yyyyMMddHHmmss}_{frameCount}_{tileWidth}x{tileHeight}.jpg");
            if (File.Exists(cacheFilePath) && new FileInfo(cacheFilePath).Length > 0)
                return new FileStream(cacheFilePath, FileMode.Open, FileAccess.Read, FileShare.Read);

            var chunks = await _storageScanner.GetChunksForStationAsync(hostname, startUtc, endUtc);
            await AdjustChunksToAccuratePtsAsync(chunks, ct);

            string ffmpegPath = ResolveFfmpegBinary();
            if (chunks.Count == 0)
            {
                byte[] blackTile = await _patternService.GetOrCreateBlackTileAsync(ffmpegPath, tileWidth, tileHeight, frameCount, ct);
                return new MemoryStream(blackTile);
            }

            var manifestLines = chunks.OrderBy(c => c.StartUtc).Select(c => $"file '{c.FullPath.Replace('\\', '/')}'").ToList();
            string tempManifestPath = Path.Combine(Path.GetTempPath(), $"spritesheet_{Guid.NewGuid():N}.txt");
            await File.WriteAllLinesAsync(tempManifestPath, manifestLines, new UTF8Encoding(false), ct);

            double interval = Math.Max(0.05, totalSeconds / frameCount);
            string filters = $"fps=1/{interval.ToString("F3", CultureInfo.InvariantCulture)},scale={tileWidth}:{tileHeight},tile={frameCount}x1";

            var startInfo = new ProcessStartInfo
            {
                FileName = ffmpegPath,
                Arguments = $"-nostdin -loglevel error -noautorotate -f concat -safe 0 -i \"{tempManifestPath.Replace('\\', '/')}\" " +
                            $"-vf \"{filters}\" -an -sn -dn -threads 2 -frames:v 1 -q:v 4 -y \"{cacheFilePath.Replace('\\', '/')}\"",
                RedirectStandardOutput = false,
                RedirectStandardError = false,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(ct);
            linkedCts.CancelAfter(TimeSpan.FromSeconds(8));
            await _localVisualThrottle.WaitAsync(linkedCts.Token);

            using var process = new Process { StartInfo = startInfo };
            try
            {
                process.Start();
                using var reg = linkedCts.Token.Register(() => { try { if (!process.HasExited) process.Kill(true); } catch { } });
                await process.WaitForExitAsync(linkedCts.Token);

                if (File.Exists(cacheFilePath) && new FileInfo(cacheFilePath).Length > 0)
                    return new FileStream(cacheFilePath, FileMode.Open, FileAccess.Read, FileShare.Read);

                byte[] blackTile = await _patternService.GetOrCreateBlackTileAsync(ffmpegPath, tileWidth, tileHeight, frameCount, ct);
                return new MemoryStream(blackTile);
            }
            catch (OperationCanceledException)
            {
                try { if (!process.HasExited) process.Kill(true); } catch { }
                throw;
            }
            finally
            {
                _localVisualThrottle.Release();
                if (File.Exists(tempManifestPath)) try { File.Delete(tempManifestPath); } catch { }
            }
        }
    }
}