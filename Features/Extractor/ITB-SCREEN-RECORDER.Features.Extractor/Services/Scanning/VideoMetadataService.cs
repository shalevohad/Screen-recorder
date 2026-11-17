// ==========================================
// File: Features/Extractor/Services/Scanning/VideoMetadataService.cs
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
using ITB_SCREEN_RECORDER.Core.Media.Engine;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public class VideoMetadataService : IVideoMetadataService
    {
        private readonly IStorageScannerService _storageScanner;
        private readonly IMemoryCache? _memoryCache;
        private readonly ILogger<VideoMetadataService> _logger;

        public VideoMetadataService(
            IStorageScannerService storageScanner,
            ILogger<VideoMetadataService> logger,
            IMemoryCache? memoryCache = null)
        {
            _storageScanner = storageScanner;
            _logger = logger;
            _memoryCache = memoryCache;
        }

        public async Task<StreamMetadataDto> GetStreamMetadataAsync(string hostname, long epochMs, string ffprobePath, CancellationToken ct = default)
        {
            string cacheKey = $"meta_{hostname}_{epochMs / 60000}";
            if (_memoryCache != null && _memoryCache.TryGetValue(cacheKey, out StreamMetadataDto? cached) && cached != null)
            {
                return cached;
            }

            DateTime targetUtc = DateTimeOffset.FromUnixTimeMilliseconds(epochMs).UtcDateTime;
            var chunks = await _storageScanner.GetChunksForStationAsync(hostname, targetUtc.AddMinutes(-5), targetUtc.AddMinutes(5));
            var matchingChunk = chunks.FirstOrDefault(c => c.StartUtc <= targetUtc && targetUtc <= c.EndUtc)
                                ?? chunks.FirstOrDefault();

            if (matchingChunk == null || !File.Exists(matchingChunk.FullPath))
            {
                return new StreamMetadataDto { Fps = 30.0, FrameDurationMs = 33.333 };
            }

            if (matchingChunk.Width > 0 && matchingChunk.Fps > 0)
            {
                var instantMeta = new StreamMetadataDto
                {
                    Width = matchingChunk.Width,
                    Height = matchingChunk.Height,
                    Fps = Math.Round(matchingChunk.Fps, 2),
                    FrameDurationMs = Math.Round(1000.0 / matchingChunk.Fps, 3)
                };

                _memoryCache?.Set(cacheKey, instantMeta, TimeSpan.FromMinutes(10));
                return instantMeta;
            }

            // 1. High-performance in-process probing via Core.Media native bindings (eliminates ffprobe process)
            if (FfmpegNativeResolver.IsAvailable || FfmpegNativeResolver.EnsureInitialized())
            {
                try
                {
                    var inProcessProbe = new FfmpegInProcessProbe();
                    var probeResult = await inProcessProbe.ProbeFileAsync(matchingChunk.FullPath, ct).ConfigureAwait(false);
                    if (probeResult.Success)
                    {
                        double probedFps = probeResult.Fps > 0 ? probeResult.Fps : 30.0;
                        if (probedFps <= 0.5 || probedFps > 240) probedFps = 30.0;

                        var result = new StreamMetadataDto
                        {
                            Fps = Math.Round(probedFps, 2),
                            FrameDurationMs = Math.Round(1000.0 / probedFps, 3),
                            Width = probeResult.Width > 0 ? probeResult.Width : 1920,
                            Height = probeResult.Height > 0 ? probeResult.Height : 1080
                        };

                        _memoryCache?.Set(cacheKey, result, TimeSpan.FromMinutes(10));
                        return result;
                    }
                }
                catch (Exception pEx)
                {
                    _logger.LogWarning(pEx, "[VideoMetadataService] In-process metadata probe failed on '{File}'.", matchingChunk.FullPath);
                }
            }

            return new StreamMetadataDto { Fps = 30.0, FrameDurationMs = 33.333, Width = 1920, Height = 1080 };
        }

        public async Task<double> GetAccurateVideoDurationSecondsAsync(string filePath, string ffprobePath, CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(filePath) || !File.Exists(filePath)) return 0;

            string cacheKey = $"file_dur_{filePath}_{new FileInfo(filePath).Length}";
            if (_memoryCache != null && _memoryCache.TryGetValue(cacheKey, out double cachedDur))
            {
                return cachedDur;
            }

            // High-performance in-process probing via Core.Media native bindings (zero external process)
            try
            {
                var inProcessProbe = new FfmpegInProcessProbe();
                var probeResult = await inProcessProbe.ProbeFileAsync(filePath, ct).ConfigureAwait(false);
                if (probeResult.Success && probeResult.Duration.TotalSeconds > 0)
                {
                    double val = probeResult.Duration.TotalSeconds;
                    _memoryCache?.Set(cacheKey, val, TimeSpan.FromHours(2));
                    return val;
                }
            }
            catch (Exception pEx)
            {
                _logger.LogWarning(pEx, "[VideoMetadataService] In-process duration probe failed on '{File}'.", filePath);
            }

            return 0;
        }

        public async Task AdjustChunksToAccuratePtsAsync<T>(IEnumerable<T> chunks, string ffprobePath, CancellationToken ct = default) where T : class
        {
            foreach (var chunk in chunks)
            {
                try
                {
                    var fullPathProp = chunk.GetType().GetProperty("FullPath");
                    var startUtcProp = chunk.GetType().GetProperty("StartUtc");
                    var endUtcProp = chunk.GetType().GetProperty("EndUtc");

                    if (fullPathProp == null || startUtcProp == null || endUtcProp == null) continue;

                    string? fullPath = fullPathProp.GetValue(chunk) as string;
                    if (string.IsNullOrEmpty(fullPath) || !File.Exists(fullPath)) continue;

                    DateTime startUtc = (DateTime)startUtcProp.GetValue(chunk)!;

                    double realDuration = await GetAccurateVideoDurationSecondsAsync(fullPath, ffprobePath, ct);
                    if (realDuration > 0 && endUtcProp.CanWrite)
                    {
                        DateTime accurateEndUtc = startUtc.AddSeconds(realDuration);
                        endUtcProp.SetValue(chunk, accurateEndUtc);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "[AdjustChunks] Failed adjusting chunk PTS.");
                }
            }
        }
    }
}