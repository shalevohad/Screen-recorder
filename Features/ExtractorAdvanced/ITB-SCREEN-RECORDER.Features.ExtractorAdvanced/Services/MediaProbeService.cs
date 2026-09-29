// ==========================================
// File: Features/ExtractorAdvanced/Services/MediaProbeService.cs
// ==========================================
using System;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
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
    public class MediaProbeService : IMediaProbeService
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
                Path.Combine(baseDir, "Features", "ExtractorAdvanced", binaryName),
                Path.Combine(baseDir, "Features", "Extractor", binaryName),
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

        public async Task<ProbedStationMetadata> ProbeMediaFileDirectlyAsync(string filePath, string stationId, CancellationToken ct = default)
        {
            var meta = new ProbedStationMetadata();
            string ffprobePath = ResolveFfprobeBinary();

            var psi = new ProcessStartInfo
            {
                FileName = ffprobePath,
                Arguments = $"-v error -show_streams -show_format -of json \"{filePath.Replace('\\', '/')}\"",
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var proc = new Process { StartInfo = psi };
            var sb = new StringBuilder();
            proc.OutputDataReceived += (_, e) => { if (e.Data != null) sb.AppendLine(e.Data); };

            try
            {
                proc.Start();
                proc.BeginOutputReadLine();
                await proc.WaitForExitAsync(ct);

                string json = sb.ToString();
                if (string.IsNullOrWhiteSpace(json)) return meta;

                using var doc = JsonDocument.Parse(json);
                if (doc.RootElement.TryGetProperty("streams", out var streams) && streams.ValueKind == JsonValueKind.Array)
                {
                    bool foundVideo = false;
                    foreach (var stream in streams.EnumerateArray())
                    {
                        if (!stream.TryGetProperty("codec_type", out var typeProp)) continue;
                        string type = typeProp.GetString() ?? "";

                        if (type.Equals("video", StringComparison.OrdinalIgnoreCase) && !foundVideo)
                        {
                            foundVideo = true;
                            if (stream.TryGetProperty("width", out var w) && w.TryGetInt32(out int wVal)) meta.Width = wVal;
                            if (stream.TryGetProperty("height", out var h) && h.TryGetInt32(out int hVal)) meta.Height = hVal;
                            if (stream.TryGetProperty("pix_fmt", out var pf)) meta.PixFmt = pf.GetString() ?? "yuv420p";

                            double aFps = 0.0;
                            double rFps = 0.0;

                            bool hasAvg = stream.TryGetProperty("avg_frame_rate", out var afr) &&
                                          ParseFpsFraction(afr.GetString(), out aFps) && aFps > 0 && aFps <= 240;

                            bool hasR = stream.TryGetProperty("r_frame_rate", out var rfr) &&
                                        ParseFpsFraction(rfr.GetString(), out rFps) && rFps > 0 && rFps <= 240;

                            if (hasAvg && aFps >= 5 && aFps <= 120) meta.Fps = Math.Round(aFps, 2);
                            else if (hasR && rFps >= 5 && rFps <= 120) meta.Fps = Math.Round(rFps, 2);
                            else if (hasAvg) meta.Fps = Math.Round(aFps, 2);
                            else if (hasR) meta.Fps = Math.Round(rFps, 2);

                            if (hasAvg && hasR && Math.Abs(aFps - rFps) > 0.8)
                            {
                                meta.IsVfr = true;
                            }
                        }
                        else if (type.Equals("audio", StringComparison.OrdinalIgnoreCase))
                        {
                            meta.HasAudio = true;
                            if (stream.TryGetProperty("sample_rate", out var sr))
                            {
                                if (sr.ValueKind == JsonValueKind.Number && sr.TryGetInt32(out int srNum)) meta.AudioSampleRate = srNum;
                                else if (sr.ValueKind == JsonValueKind.String && int.TryParse(sr.GetString(), out int srVal) && srVal > 0) meta.AudioSampleRate = srVal;
                            }
                            if (stream.TryGetProperty("channels", out var ch))
                            {
                                if (ch.ValueKind == JsonValueKind.Number && ch.TryGetInt32(out int chVal)) meta.AudioChannels = chVal;
                                else if (ch.ValueKind == JsonValueKind.String && int.TryParse(ch.GetString(), out int chStrVal)) meta.AudioChannels = chStrVal;
                            }
                            if (stream.TryGetProperty("codec_name", out var cn))
                            {
                                meta.AudioCodec = cn.GetString() ?? "aac";
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[MediaProbeService] Failed probing file '{File}' for station '{StationId}'.", filePath, stationId);
            }

            return meta;
        }

        private static bool ParseFpsFraction(string? fpsStr, out double fps)
        {
            fps = 30.0;
            if (string.IsNullOrWhiteSpace(fpsStr)) return false;
            var parts = fpsStr.Split('/');
            if (parts.Length == 2 &&
                double.TryParse(parts[0], NumberStyles.Any, CultureInfo.InvariantCulture, out double num) &&
                double.TryParse(parts[1], NumberStyles.Any, CultureInfo.InvariantCulture, out double den) && den > 0)
            {
                fps = num / den;
                return true;
            }
            if (double.TryParse(fpsStr, NumberStyles.Any, CultureInfo.InvariantCulture, out double val) && val > 0)
            {
                fps = val;
                return true;
            }
            return false;
        }
    }
}