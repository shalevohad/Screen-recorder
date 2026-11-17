// ==========================================
// File: Features/Extractor/Services/Scanning/MediaProbeService.cs
// ==========================================
using System;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ITB_SCREEN_RECORDER.Core.Media.Contracts;
using ITB_SCREEN_RECORDER.Core.Media.Engine;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public class MediaProbeService : ITB_SCREEN_RECORDER.Features.Extractor.Services.IMediaProbeService
    {
        private readonly IStorageScannerService _storageScanner;
        private readonly IMemoryCache? _memoryCache;
        private readonly ILogger<MediaProbeService> _logger;
        private readonly ExtractorOptions _extractorOptions;
        private static readonly SemaphoreSlim _probeThrottle = new(6, 6);

        public MediaProbeService(
            IStorageScannerService storageScanner,
            IOptions<ExtractorOptions> extractorOptions,
            ILogger<MediaProbeService> logger,
            IMemoryCache? memoryCache = null)
        {
            _storageScanner = storageScanner;
            _extractorOptions = extractorOptions.Value;
            _logger = logger;
            _memoryCache = memoryCache;
        }

        public string ResolveFfprobeBinary()
        {
            string binaryName = OperatingSystem.IsWindows() ? "ffprobe.exe" : "ffprobe";
            var baseDir = AppContext.BaseDirectory;
            string[] directCandidates = {
                Path.Combine(baseDir, "Features", "Extractor", binaryName),
                Path.Combine(baseDir, "Features", "ExtractorAdvanced", binaryName),
                Path.Combine(baseDir, "Features", "Extractor", "Bin", binaryName),
                Path.Combine(baseDir, "Features", "Extractor", "Tools", "Win", binaryName),
                Path.Combine(baseDir, binaryName)
            };

            foreach (var path in directCandidates)
            {
                var full = Path.GetFullPath(path);
                if (File.Exists(full)) return full;
            }

            return binaryName;
        }

        public async Task<ProbedStationMetadata> GetOrProbeStationMetadataAsync(
            string hostname,
            DateTime startUtc,
            DateTime endUtc,
            CancellationToken ct = default)
        {
            string cacheKey = $"station_probe_meta_{hostname}";
            if (_memoryCache != null && _memoryCache.TryGetValue(cacheKey, out ProbedStationMetadata? cached) && cached != null)
            {
                return cached;
            }

            await _probeThrottle.WaitAsync(ct);
            try
            {
                if (_memoryCache != null && _memoryCache.TryGetValue(cacheKey, out cached) && cached != null)
                {
                    return cached;
                }

                var chunks = await _storageScanner.GetChunksForStationAsync(hostname, startUtc, endUtc);
                if (chunks.Count == 0)
                {
                    chunks = await _storageScanner.GetChunksForStationAsync(hostname, startUtc.AddHours(-48), endUtc.AddHours(24));
                }

                var sampleChunk = chunks
                    .Where(c => !string.IsNullOrEmpty(c.FullPath) && File.Exists(c.FullPath) && c.FileSizeBytes > 4096)
                    .OrderByDescending(c => c.StartUtc)
                    .FirstOrDefault();

                if (sampleChunk == null)
                {
                    return new ProbedStationMetadata();
                }

                if (sampleChunk.Width > 0 && sampleChunk.Fps > 0)
                {
                    var metaFromDb = new ProbedStationMetadata
                    {
                        Width = sampleChunk.Width,
                        Height = sampleChunk.Height,
                        Fps = sampleChunk.Fps,
                        HasAudio = sampleChunk.HasAudio,
                        AudioCodec = sampleChunk.HasAudio ? "aac" : "none"
                    };
                    _memoryCache?.Set(cacheKey, metaFromDb, TimeSpan.FromMinutes(30));
                    return metaFromDb;
                }

                var probed = await ProbeMediaFileDirectlyAsync(sampleChunk.FullPath, hostname, ct);
                _memoryCache?.Set(cacheKey, probed, TimeSpan.FromMinutes(15));
                return probed;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "[ProbeStation] Failed probing station '{Host}'", hostname);
                return new ProbedStationMetadata();
            }
            finally
            {
                _probeThrottle.Release();
            }
        }

        /// <summary>
        /// Probes media container and stream attributes directly using native in-process FFmpeg bindings (zero external processes).
        /// </summary>
        /// <param name="filePath">Target video chunk file path.</param>
        /// <param name="stationId">Target station identifier.</param>
        /// <param name="ct">Cancellation token.</param>
        /// <returns>Extracted station metadata (width, height, fps, sample rate, channels, audio existence).</returns>
        public async Task<ProbedStationMetadata> ProbeMediaFileDirectlyAsync(string filePath, string stationId, CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(filePath) || !File.Exists(filePath))
            {
                return new ProbedStationMetadata();
            }

            try
            {
                var inProcessProbe = new FfmpegInProcessProbe();
                var probeResult = await inProcessProbe.ProbeFileAsync(filePath, ct).ConfigureAwait(false);
                if (probeResult.Success)
                {
                    return new ProbedStationMetadata
                    {
                        Width = probeResult.Width > 0 ? probeResult.Width : 1920,
                        Height = probeResult.Height > 0 ? probeResult.Height : 1080,
                        Fps = probeResult.Fps > 0 ? probeResult.Fps : 30.0,
                        IsVfr = probeResult.IsVfr,
                        PixFmt = !string.IsNullOrEmpty(probeResult.PixelFormat) ? probeResult.PixelFormat : "yuv420p",
                        HasAudio = probeResult.HasAudio,
                        AudioSampleRate = probeResult.AudioSampleRate,
                        AudioChannels = probeResult.AudioChannels,
                        AudioCodec = probeResult.AudioCodec
                    };
                }
            }
            catch (Exception pEx)
            {
                _logger.LogWarning(pEx, "[MediaProbeService] In-process probe failed on '{File}'.", filePath);
            }

            return new ProbedStationMetadata();
        }
    }
}