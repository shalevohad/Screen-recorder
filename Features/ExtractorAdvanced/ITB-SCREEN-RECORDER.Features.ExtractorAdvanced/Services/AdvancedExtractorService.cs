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

        public async Task<Stream> ExtractFrameAsync(string hostname, long epochMs, string? displayId = null, CancellationToken ct = default)
        {
            long quantEpoch = (epochMs / 250) * 250;
            string cleanDisplay = string.IsNullOrWhiteSpace(displayId) ? "mon-0" : displayId.Trim().ToLowerInvariant();
            string cacheKey = $"frame_{hostname}_{cleanDisplay}_{quantEpoch}";

            if (_memoryCache != null && _memoryCache.TryGetValue(cacheKey, out byte[]? cached) && cached != null)
            {
                return new MemoryStream(cached);
            }

            DateTime targetUtc = DateTimeOffset.FromUnixTimeMilliseconds(epochMs).UtcDateTime;

            var chunks = await _storageScanner.GetChunksForStationAsync(hostname, targetUtc.AddMinutes(-5), targetUtc.AddMinutes(5));

            if (!string.IsNullOrWhiteSpace(displayId))
            {
                var displayChunks = chunks.Where(c => string.Equals(c.DisplayId, displayId, StringComparison.OrdinalIgnoreCase)).ToList();
                if (displayChunks.Count > 0)
                {
                    chunks = displayChunks;
                }
            }

            // Extract relevant chunks: chunks directly enclosing target timestamp receive top priority, followed by boundary chunks within ±2s
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

                // If requested frame is at the very beginning of the chunk (<0.20s), offset slightly to 0.25s to bypass initial black warmup frames
                double seekOffset = offsetSeconds;
                if (seekOffset < 0.20 && chunk.Duration.TotalSeconds >= 0.3)
                {
                    seekOffset = Math.Min(0.25, maxSafeOffset);
                }

                byte[]? frameData = await ExtractKeyframeDirectAsync(ffmpegPath, chunk.FullPath, seekOffset, ct);

                // Black frame detection: blank/black 1080p/2K/4K JPEG frames typically weigh <24KB.
                // If frame size is below 28KB, perform a second probe slightly forward to extract active content
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
            CancellationToken ct = default,
            string? displayId = null)
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
            string cleanDisplay = string.IsNullOrWhiteSpace(displayId) ? "mon-0" : displayId.Trim().ToLowerInvariant();
            string sheetCacheKey = $"sheet_{hostname}_{cleanDisplay}_{bucketStart}_{frameCount}_{tileWidth}x{tileHeight}";

            if (_memoryCache != null && _memoryCache.TryGetValue(sheetCacheKey, out byte[]? cachedSheet) && cachedSheet != null)
            {
                return new MemoryStream(cachedSheet);
            }

            var chunks = await _storageScanner.GetChunksForStationAsync(hostname, startUtc, endUtc);
            if (!string.IsNullOrEmpty(displayId))
            {
                chunks = chunks.Where(c => string.Equals(c.DisplayId, cleanDisplay, StringComparison.OrdinalIgnoreCase)).ToList();
            }
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
                if (!string.IsNullOrEmpty(displayId))
                {
                    widerChunks = widerChunks.Where(c => string.Equals(c.DisplayId, cleanDisplay, StringComparison.OrdinalIgnoreCase)).ToList();
                }
                candidateChunks = widerChunks
                    .Where(c => !string.IsNullOrEmpty(c.FullPath) && File.Exists(c.FullPath))
                    .OrderByDescending(c => c.StartUtc <= startUtc && startUtc <= c.EndUtc)
                    .ThenByDescending(c =>
                    {
                        long overlapStart = Math.Max(startUtc.Ticks, c.StartUtc.Ticks);
                        long overlapEnd = Math.Min(endUtc.Ticks, c.EndUtc.Ticks);
                        return Math.Max(0, overlapEnd - overlapStart);
                    })
                    .ToList();
            }

            if (candidateChunks.Count == 0)
            {
                // No candidate chunks exist for this specific display or temporal window.
                // Return Stream.Null to return HTTP 204 NoContent and prevent cross-monitor false filmstrip tiles.
                return Stream.Null;
            }

            foreach (var sampleChunk in candidateChunks)
            {
                double fileDuration = sampleChunk.Duration.TotalSeconds;
                if (fileDuration <= 0.3) continue;

                // Safely skip initial black encoder warmup frames at 0.0s
                double offsetSeconds = Math.Max(0.25, (startUtc - sampleChunk.StartUtc).TotalSeconds);
                double maxSafeOffset = Math.Max(0.25, fileDuration - 0.25);
                if (offsetSeconds > maxSafeOffset)
                {
                    offsetSeconds = maxSafeOffset;
                }

                // Determine available sampling range within the file:
                // Cap sample duration to 18 seconds max for timeline tile spritesheets to ensure ultra-fast extraction (~200-300ms)
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

                    // Verify non-empty tile (blank black tile typically weighs less than 1.5KB)
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

        /// <summary>
        /// Extracts real acoustic waveform peak envelope data (0.0 to 1.0) for a station across a specified time window.
        /// Samples mono audio at 1000Hz using FFmpeg, downsamples to the requested number of points, and caches results.
        /// </summary>
        public async Task<float[]> GenerateAudioWaveformAsync(
            string stationId,
            DateTime startUtc,
            DateTime endUtc,
            int points = 200,
            CancellationToken ct = default)
        {
            if (points < 10) points = 10;
            if (points > 1000) points = 1000;

            string cacheKey = $"waveform_{stationId}_{startUtc:yyyyMMdd_HHmmssfff}_{endUtc:yyyyMMdd_HHmmssfff}_{points}";
            if (_memoryCache != null && _memoryCache.TryGetValue(cacheKey, out float[]? cached) && cached != null)
            {
                return cached;
            }

            double totalSeconds = (endUtc - startUtc).TotalSeconds;
            if (totalSeconds <= 0.05)
            {
                return new float[points];
            }

            var chunks = await _storageScanner.GetChunksForStationAsync(stationId, startUtc, endUtc);
            var audioChunks = chunks
                .Where(c => c.HasAudio != false && c.Duration.TotalSeconds > 0.1)
                .OrderBy(c => c.StartUtc)
                .ToList();

            float[] peaks = new float[points];
            if (audioChunks.Count == 0)
            {
                Array.Fill(peaks, 0.02f);
                return peaks;
            }

            string ffmpegPath = ResolveFfmpegBinary();

            foreach (var chunk in audioChunks)
            {
                var oStart = chunk.StartUtc > startUtc ? chunk.StartUtc : startUtc;
                var oEnd = chunk.EndUtc < endUtc ? chunk.EndUtc : endUtc;
                double dur = (oEnd - oStart).TotalSeconds;
                if (dur <= 0.05) continue;

                double seekOffset = Math.Max(0, (oStart - chunk.StartUtc).TotalSeconds);

                var startInfo = new ProcessStartInfo
                {
                    FileName = ffmpegPath,
                    Arguments = $"-nostdin -loglevel error -fflags +nobuffer+fastseek -probesize 1000000 -analyzeduration 1000000 " +
                                $"-ss {seekOffset.ToString("0.000", CultureInfo.InvariantCulture)} " +
                                $"-t {dur.ToString("0.000", CultureInfo.InvariantCulture)} " +
                                $"-i \"{chunk.FullPath.Replace('\\', '/')}\" " +
                                $"-vn -sn -dn -ac 1 -ar 1000 -f s16le pipe:1",
                    RedirectStandardOutput = true,
                    RedirectStandardError = false,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };

                using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(ct);
                linkedCts.CancelAfter(TimeSpan.FromSeconds(5));

                try
                {
                    using var process = new Process { StartInfo = startInfo };
                    process.Start();
                    using var reg = linkedCts.Token.Register(() => { try { if (!process.HasExited) process.Kill(true); } catch { } });

                    byte[] buffer = new byte[2000];
                    int bytesRead;
                    long totalSamplesRead = 0;
                    double chunkBaseRelSec = (oStart - startUtc).TotalSeconds;

                    while ((bytesRead = await process.StandardOutput.BaseStream.ReadAsync(buffer.AsMemory(0, buffer.Length), linkedCts.Token)) > 0)
                    {
                        int sampleCount = bytesRead / 2;
                        for (int i = 0; i < sampleCount; i++)
                        {
                            short sampleVal = BitConverter.ToInt16(buffer, i * 2);
                            double sampleRelSec = chunkBaseRelSec + ((totalSamplesRead + i) / 1000.0);
                            int pIdx = (int)Math.Clamp(Math.Floor((sampleRelSec / totalSeconds) * points), 0, points - 1);
                            float amp = Math.Abs(sampleVal) / 32768.0f;
                            if (amp > peaks[pIdx])
                            {
                                peaks[pIdx] = amp;
                            }
                        }
                        totalSamplesRead += sampleCount;
                    }

                    await process.WaitForExitAsync(linkedCts.Token);
                }
                catch
                {
                    // Proceed across surviving audio chunks
                }
            }

            float maxPeak = 0;
            for (int i = 0; i < points; i++)
            {
                if (peaks[i] > maxPeak) maxPeak = peaks[i];
            }

            if (maxPeak > 0.01f)
            {
                float normFactor = Math.Min(3.0f, 0.95f / maxPeak);
                for (int i = 0; i < points; i++)
                {
                    peaks[i] = Math.Clamp(peaks[i] * normFactor, 0.03f, 1.0f);
                }
            }
            else
            {
                for (int i = 0; i < points; i++)
                {
                    peaks[i] = 0.02f;
                }
            }

            _memoryCache?.Set(cacheKey, peaks, TimeSpan.FromMinutes(30));
            return peaks;
        }
    }
}
