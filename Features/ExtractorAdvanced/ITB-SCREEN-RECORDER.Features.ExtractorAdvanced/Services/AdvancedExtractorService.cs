// ==========================================
// File: Features/ExtractorAdvanced/Services/AdvancedExtractorService.cs
// ==========================================
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
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Models;

using SynchronizationPlan = ITB_SCREEN_RECORDER.Features.Extractor.Models.SynchronizationPlan;

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
        private readonly IFfmpegBinaryResolver _binaryResolver;
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
            IMemoryCache? memoryCache = null,
            IKeystrokeSrtGenerator? srtGenerator = null,
            IFfmpegBinaryResolver? binaryResolver = null)
            : base(storageScanner, ffmpegRunner, extractorOptions, logger, srtGenerator, trackCutter, planBuilder)
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

            _binaryResolver = binaryResolver ?? new AdvancedFfmpegBinaryResolver(
                extractorOptions,
                LoggerFactory.Create(b => { }).CreateLogger<AdvancedFfmpegBinaryResolver>());
        }

        public new string ResolveFfmpegBinary() => _binaryResolver.ResolveFfmpeg();
        public string ResolveFfprobeBinary() => _binaryResolver.ResolveFfprobe();

        public string GetOptimalVideoEncoderArgs(bool zeroLatency = false) =>
            _binaryResolver.GetOptimalVideoEncoderArgs(zeroLatency);

        public FfmpegHardwareCapabilities GetHardwareCapabilities() =>
            _binaryResolver.GetCapabilities();

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

        public async Task<Stream> ExtractFrameAsync(string hostname, long epochMs, CancellationToken ct = default)
        {
            long quantEpoch = (epochMs / 250) * 250;
            string cacheKey = $"frame_{hostname}_{quantEpoch}";

            if (_memoryCache != null && _memoryCache.TryGetValue(cacheKey, out byte[]? cached) && cached != null)
            {
                return new MemoryStream(cached);
            }

            DateTime targetUtc = DateTimeOffset.FromUnixTimeMilliseconds(epochMs).UtcDateTime;

            var chunks = await _storageScanner.GetChunksForStationAsync(hostname, targetUtc.AddMinutes(-5), targetUtc.AddMinutes(5));

            // 💡 חילוץ מקטעים רלוונטיים: מקטעים שמכסים ישירות את נקודת הזמן מקבלים עדיפות עליונה, ולאחריהם מקטעים בתחום של ±2 שניות לתפרי צ'אנקים.
            var candidates = chunks
                .Where(c => !string.IsNullOrEmpty(c.FullPath) && File.Exists(c.FullPath) &&
                            c.StartUtc <= targetUtc.AddSeconds(2) && targetUtc.AddSeconds(-2) <= c.EndUtc)
                .OrderByDescending(c => c.StartUtc <= targetUtc && targetUtc <= c.EndUtc)
                .ThenBy(c => Math.Abs((c.StartUtc + (c.Duration / 2) - targetUtc).TotalSeconds))
                .ToList();

            string ffmpegPath = ResolveFfmpegBinary();

            if (candidates.Count == 0)
            {
                byte[] noSignal = await _patternService.GetOrCreateNoSignalFrameAsync(ffmpegPath, ct);
                return (noSignal != null && noSignal.Length > 0) ? new MemoryStream(noSignal) : Stream.Null;
            }

            foreach (var chunk in candidates)
            {
                double offsetSeconds = Math.Max(0, (targetUtc - chunk.StartUtc).TotalSeconds);
                double maxSafeOffset = Math.Max(0, chunk.Duration.TotalSeconds - 0.05);
                if (offsetSeconds > maxSafeOffset)
                {
                    offsetSeconds = maxSafeOffset;
                }

                // 💡 אם הפריים המבוקש נמצא בתחילת המקטע (<0.20s), נדלג קלות ל-0.25s כדי לעקוף פריים חימום שחור
                double seekOffset = offsetSeconds;
                if (seekOffset < 0.20 && chunk.Duration.TotalSeconds >= 0.3)
                {
                    seekOffset = Math.Min(0.25, maxSafeOffset);
                }

                byte[]? frameData = await ExtractKeyframeDirectAsync(ffmpegPath, chunk.FullPath, seekOffset, ct);

                // 💡 זיהוי פריים שחור/ריק: פריים JPEG שחור ב-1080p/2K/4K שוקל כ-24KB.
                // אם המשקל נמוך מ-28KB, נבצע ניסיון שני מעט קדימה כדי לדלות פריים וידאו מלא
                if (frameData != null && frameData.Length <= 28000 && chunk.Duration.TotalSeconds >= 0.6)
                {
                    double retryOffset = Math.Min(seekOffset + 0.4, maxSafeOffset);
                    if (retryOffset > seekOffset)
                    {
                        byte[]? retryData = await ExtractKeyframeDirectAsync(ffmpegPath, chunk.FullPath, retryOffset, ct);
                        if (retryData != null && retryData.Length > frameData.Length)
                        {
                            frameData = retryData;
                        }
                    }
                }

                if (frameData != null && frameData.Length > 0)
                {
                    _memoryCache?.Set(cacheKey, frameData, TimeSpan.FromMinutes(30));
                    return new MemoryStream(frameData);
                }
            }

            byte[] fallback = await _patternService.GetOrCreateNoSignalFrameAsync(ffmpegPath, ct);
            return new MemoryStream(fallback);
        }

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

            var candidateChunks = chunks
                .Where(c => !string.IsNullOrEmpty(c.FullPath) && File.Exists(c.FullPath))
                .OrderByDescending(c => c.StartUtc <= startUtc && startUtc <= c.EndUtc)
                .ThenByDescending(c =>
                {
                    long overlapStart = Math.Max(startUtc.Ticks, c.StartUtc.Ticks);
                    long overlapEnd = Math.Min(endUtc.Ticks, c.EndUtc.Ticks);
                    return Math.Max(0, overlapEnd - overlapStart);
                })
                .ToList();

            if (candidateChunks.Count == 0)
            {
                var widerChunks = await _storageScanner.GetChunksForStationAsync(hostname, startUtc.AddSeconds(-15), endUtc.AddSeconds(15));
                candidateChunks = widerChunks
                    .Where(c => !string.IsNullOrEmpty(c.FullPath) && File.Exists(c.FullPath))
                    .OrderByDescending(c =>
                    {
                        long overlapStart = Math.Max(startUtc.Ticks, c.StartUtc.Ticks);
                        long overlapEnd = Math.Min(endUtc.Ticks, c.EndUtc.Ticks);
                        return Math.Max(0, overlapEnd - overlapStart);
                    })
                    .ToList();
            }

            if (candidateChunks.Count == 0)
            {
                byte[] blackTile = await _patternService.GetOrCreateBlackTileAsync(ffmpegPath, tileWidth, tileHeight, frameCount, ct);
                return new MemoryStream(blackTile);
            }

            foreach (var sampleChunk in candidateChunks)
            {
                double fileDuration = sampleChunk.Duration.TotalSeconds;
                if (fileDuration <= 0.3) continue;

                // 💡 דילוג בטוח על פריים החימום השחור ב-0.0s
                double offsetSeconds = Math.Max(0.25, (startUtc - sampleChunk.StartUtc).TotalSeconds);
                double maxSafeOffset = Math.Max(0.25, fileDuration - 0.25);
                if (offsetSeconds > maxSafeOffset)
                {
                    offsetSeconds = maxSafeOffset;
                }

                // 💡 קביעת משך הטווח הזמין לדגימה בתוך הקובץ:
                // הגבלת משך הדגימה לעד 18 שניות לכל היותר עבור אריח תצוגה
                // הדבר מבטיח שליפה סילונית (~200-300ms) ללא פענוח כבד של מאות ואלפי פריימים
                double availableDuration = Math.Max(0.5, fileDuration - offsetSeconds);
                double tileSpan = Math.Max(0.5, (endUtc - startUtc).TotalSeconds);
                double targetSpan = Math.Min(availableDuration, Math.Min(tileSpan, 18.0));
                double intervalSeconds = Math.Max(0.05, targetSpan / frameCount);

                string filter = $"fps=1/{intervalSeconds.ToString("0.000", CultureInfo.InvariantCulture)},scale={tileWidth}:{tileHeight},tile={frameCount}x1";

                using var memoryStream = new MemoryStream(65536);
                var startInfo = new ProcessStartInfo
                {
                    FileName = ffmpegPath,
                    Arguments = $"-nostdin -loglevel error -noautorotate -fflags +nobuffer+fastseek -probesize 1000000 -analyzeduration 1000000 " +
                                $"-ss {offsetSeconds.ToString("0.000", CultureInfo.InvariantCulture)} " +
                                $"-t {targetSpan.ToString("0.000", CultureInfo.InvariantCulture)} " +
                                $"-i \"{sampleChunk.FullPath.Replace('\\', '/')}\" " +
                                $"-vf \"{filter}\" -an -sn -dn -threads 2 -frames:v 1 -q:v 2 -f image2pipe -vcodec mjpeg pipe:1",
                    RedirectStandardOutput = true,
                    RedirectStandardError = false,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };

                using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(ct);
                linkedCts.CancelAfter(TimeSpan.FromSeconds(5));

                await _visualThrottle.WaitAsync(linkedCts.Token);
                using var process = new Process { StartInfo = startInfo };

                try
                {
                    process.Start();
                    using var reg = linkedCts.Token.Register(() => { try { if (!process.HasExited) process.Kill(true); } catch { } });

                    await process.StandardOutput.BaseStream.CopyToAsync(memoryStream, 16384, linkedCts.Token);
                    await process.WaitForExitAsync(linkedCts.Token);

                    // 💡 וידוא שהתקבל אריח אמיתי (אריח שחור ריק ממוצע שוקל פחות מ-1.5KB)
                    if (memoryStream.Length > 2000)
                    {
                        byte[] sheetBytes = memoryStream.ToArray();
                        _memoryCache?.Set(sheetCacheKey, sheetBytes, TimeSpan.FromMinutes(60));
                        return new MemoryStream(sheetBytes);
                    }
                }
                catch { }
                finally
                {
                    _visualThrottle.Release();
                }
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
            linkedCts.CancelAfter(TimeSpan.FromSeconds(4));

            await _visualThrottle.WaitAsync(linkedCts.Token);
            try
            {
                var startInfo = new ProcessStartInfo
                {
                    FileName = ffmpegPath,
                    Arguments = $"-nostdin -loglevel error -noautorotate -fflags +nobuffer+fastseek -probesize 131072 -analyzeduration 200000 " +
                                $"-ss {offsetSeconds.ToString("0.000", CultureInfo.InvariantCulture)} " +
                                $"-i \"{inputPath.Replace('\\', '/')}\" -an -sn -dn -threads 2 -frames:v 1 -q:v 1 -f image2pipe -vcodec mjpeg pipe:1",
                    RedirectStandardOutput = true,
                    RedirectStandardError = false,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };

                using var process = new Process { StartInfo = startInfo };
                process.Start();

                using var reg = linkedCts.Token.Register(() => { try { if (!process.HasExited) process.Kill(true); } catch { } });
                await process.StandardOutput.BaseStream.CopyToAsync(memoryStream, 8192, linkedCts.Token);
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