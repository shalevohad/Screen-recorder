using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ITB_SCREEN_RECORDER.Server.Features.Extractor.Models;

namespace ITB_SCREEN_RECORDER.Server.Features.Extractor.Services
{
    public interface IStorageScannerService
    {
        Task<List<string>> GetRecordedHostnamesAsync(DateTime startUtc, DateTime endUtc);
        Task<List<RecordingChunkMetadata>> GetChunksForStationAsync(string hostname, DateTime startUtc, DateTime endUtc);
        Task<ExtractionPreviewResponseDto> BuildPreviewAsync(List<string> hostnames, DateTime startUtc, DateTime endUtc);
        string BuildConcatManifest(List<RecordingChunkMetadata> chunks, DateTime requestedStartUtc, DateTime requestedEndUtc);
    }

    public class StorageScannerService : IStorageScannerService
    {
        private readonly string? _netAppPath;
        private readonly string? _localFallbackPath;
        private readonly ILogger<StorageScannerService> _logger;

        private static readonly ConcurrentDictionary<string, CachedChunkMetadata> ChunkCache = new(StringComparer.OrdinalIgnoreCase);

        private static readonly Regex TimestampFilenamePattern = new(
            @"(\d{4})-(\d{2})-(\d{2})_(\d{2})-(\d{2})-(\d{2})",
            RegexOptions.Compiled | RegexOptions.IgnoreCase
        );

        public StorageScannerService(IConfiguration config, ILogger<StorageScannerService> logger)
        {
            _logger = logger;

            // קריאת שני הנתיבים מתצורת ה-appsettings.json
            _netAppPath = config["SystemConfig:Storage:NetAppUncPath"];
            _localFallbackPath = config["SystemConfig:Storage:LocalFallbackPath"];

            _logger.LogInformation("Storage configured. NetApp: {NetApp}, LocalFallback: {Local}",
                _netAppPath ?? "Not Configured",
                _localFallbackPath ?? "Not Configured");
        }

        /// <summary>
        /// בוחר את נתיב הבסיס הפעיל: בודק קודם את NetApp, ואם אינו זמין עובר ל-Local
        /// </summary>
        private string GetActiveBasePath()
        {
            // בדיקת זמינות נתיב NetApp (אם הוגדר)
            if (!string.IsNullOrEmpty(_netAppPath))
            {
                try
                {
                    if (Directory.Exists(_netAppPath))
                    {
                        return _netAppPath;
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "NetApp path {Path} is unreachable. Falling back to local storage.", _netAppPath);
                }
            }

            // Fallback לנתיב המקומי
            if (!string.IsNullOrEmpty(_localFallbackPath) && Directory.Exists(_localFallbackPath))
            {
                return _localFallbackPath;
            }

            return @"C:\ProgramData\ITB-SCREEN-RECORDER\Recordings";
        }

        public async Task<List<string>> GetRecordedHostnamesAsync(DateTime startUtc, DateTime endUtc)
        {
            return await Task.Run(() =>
            {
                string activeBase = GetActiveBasePath();
                if (!Directory.Exists(activeBase))
                {
                    _logger.LogWarning("Active storage base path does not exist: {Path}", activeBase);
                    return new List<string>();
                }

                var allDirs = Directory.GetDirectories(activeBase, "*", SearchOption.AllDirectories);
                var activeHosts = new List<string>();

                foreach (var dir in allDirs)
                {
                    string host = Path.GetFileName(dir);
                    var chunks = GetChunksForStationInternal(activeBase, host, startUtc, endUtc);
                    if (chunks.Count > 0 && !activeHosts.Contains(host))
                    {
                        activeHosts.Add(host);
                    }
                }

                return activeHosts.OrderBy(h => h).ToList();
            });
        }

        public async Task<List<RecordingChunkMetadata>> GetChunksForStationAsync(string hostname, DateTime startUtc, DateTime endUtc)
        {
            return await Task.Run(() =>
            {
                string activeBase = GetActiveBasePath();
                return GetChunksForStationInternal(activeBase, hostname, startUtc, endUtc);
            });
        }

        public async Task<ExtractionPreviewResponseDto> BuildPreviewAsync(List<string> hostnames, DateTime startUtc, DateTime endUtc)
        {
            string activeBase = GetActiveBasePath();
            return await Task.Run(() =>
            {
                var response = new ExtractionPreviewResponseDto
                {
                    TotalDuration = endUtc - startUtc
                };

                foreach (var host in hostnames)
                {
                    var chunks = GetChunksForStationInternal(activeBase, host, startUtc, endUtc);
                    if (chunks.Count == 0) continue;

                    var gaps = DetectGaps(chunks);
                    long totalBytes = chunks.Sum(c => c.FileSizeBytes);

                    response.Stations.Add(new StationCoverageDto
                    {
                        Hostname = host,
                        ChunkCount = chunks.Count,
                        TotalSizeBytes = totalBytes,
                        HasTimeGaps = gaps.Count > 0,
                        Gaps = gaps
                    });

                    response.TotalChunkCount += chunks.Count;
                    response.EstimatedTotalSizeBytes += totalBytes;
                }

                response.TotalHostCount = response.Stations.Count;
                return response;
            });
        }

        public string BuildConcatManifest(List<RecordingChunkMetadata> chunks, DateTime requestedStartUtc, DateTime requestedEndUtc)
        {
            if (chunks.Count == 0) return string.Empty;

            var lines = new List<string>();

            for (int i = 0; i < chunks.Count; i++)
            {
                var chunk = chunks[i];
                string normalizedPath = chunk.FullPath.Replace('\\', '/').Replace("'", "'\\''");
                lines.Add($"file '{normalizedPath}'");

                double? inpointSeconds = null;
                double? outpointSeconds = null;

                if (i == 0 && requestedStartUtc > chunk.StartUtc)
                {
                    inpointSeconds = Math.Max(0, (requestedStartUtc - chunk.StartUtc).TotalSeconds);
                    lines.Add($"inpoint {inpointSeconds.Value.ToString("F3", CultureInfo.InvariantCulture)}");
                }

                if (i == chunks.Count - 1 && requestedEndUtc < chunk.EndUtc)
                {
                    outpointSeconds = Math.Min(chunk.Duration.TotalSeconds, (requestedEndUtc - chunk.StartUtc).TotalSeconds);
                    if (!inpointSeconds.HasValue || outpointSeconds.Value > inpointSeconds.Value)
                    {
                        lines.Add($"outpoint {outpointSeconds.Value.ToString("F3", CultureInfo.InvariantCulture)}");
                    }
                }
            }

            return string.Join("\n", lines) + "\n";
        }

        private List<RecordingChunkMetadata> GetChunksForStationInternal(string basePath, string hostname, DateTime startUtc, DateTime endUtc)
        {
            string? stationDir = Directory.GetDirectories(basePath, hostname, SearchOption.AllDirectories).FirstOrDefault();
            if (string.IsNullOrEmpty(stationDir) || !Directory.Exists(stationDir))
            {
                return new List<RecordingChunkMetadata>();
            }

            var matched = new List<RecordingChunkMetadata>();
            var files = Directory.GetFiles(stationDir, "*.*", SearchOption.TopDirectoryOnly)
                                 .Where(f => f.EndsWith(".mp4", StringComparison.OrdinalIgnoreCase) ||
                                             f.EndsWith(".flv", StringComparison.OrdinalIgnoreCase))
                                 .ToArray();

            foreach (var file in files)
            {
                if (IsFileOutsideCandidateWindow(file, startUtc, endUtc))
                {
                    continue;
                }

                var metadata = ResolveChunkMetadata(file, hostname);
                if (metadata == null) continue;

                if (metadata.StartUtc < endUtc && metadata.EndUtc > startUtc)
                {
                    matched.Add(metadata);
                }
            }

            return matched.OrderBy(c => c.StartUtc).ToList();
        }

        private RecordingChunkMetadata? ResolveChunkMetadata(string filePath, string hostname)
        {
            try
            {
                var fileInfo = new FileInfo(filePath);
                if (!fileInfo.Exists || fileInfo.Length == 0) return null;

                if (ChunkCache.TryGetValue(filePath, out var cached))
                {
                    if (cached.IsClosed)
                    {
                        return new RecordingChunkMetadata
                        {
                            FullPath = filePath,
                            Hostname = hostname,
                            StartUtc = cached.StartUtc,
                            EndUtc = cached.EndUtc,
                            FileSizeBytes = cached.FileSizeBytes
                        };
                    }
                }

                var headerResult = FlvHeaderInspector.ExtractMetadata(filePath);

                DateTime startUtc;
                DateTime endUtc;

                if (headerResult != null)
                {
                    startUtc = headerResult.StartUtc;
                    endUtc = headerResult.EndUtc;
                }
                else
                {
                    var match = TimestampFilenamePattern.Match(fileInfo.Name);
                    if (match.Success)
                    {
                        string localIsoFormatted = $"{match.Groups[1].Value}-{match.Groups[2].Value}-{match.Groups[3].Value}T{match.Groups[4].Value}:{match.Groups[5].Value}:{match.Groups[6].Value}";
                        if (DateTime.TryParse(localIsoFormatted, null, DateTimeStyles.AssumeLocal, out DateTime parsedLocal))
                        {
                            startUtc = parsedLocal.ToUniversalTime();
                        }
                        else
                        {
                            startUtc = fileInfo.CreationTimeUtc;
                        }
                    }
                    else
                    {
                        startUtc = fileInfo.CreationTimeUtc;
                    }

                    endUtc = fileInfo.LastWriteTimeUtc > startUtc.AddSeconds(5)
                        ? fileInfo.LastWriteTimeUtc.ToUniversalTime()
                        : startUtc.AddMinutes(5);
                }

                bool isClosed = (DateTime.UtcNow - fileInfo.LastWriteTimeUtc).TotalMinutes > 3;

                var entry = new CachedChunkMetadata
                {
                    StartUtc = startUtc,
                    EndUtc = endUtc,
                    FileSizeBytes = fileInfo.Length,
                    IsClosed = isClosed
                };

                if (isClosed)
                {
                    ChunkCache[filePath] = entry;
                }

                return new RecordingChunkMetadata
                {
                    FullPath = filePath,
                    Hostname = hostname,
                    StartUtc = entry.StartUtc,
                    EndUtc = entry.EndUtc,
                    FileSizeBytes = entry.FileSizeBytes
                };
            }
            catch (Exception ex)
            {
                _logger.LogDebug(ex, "Failed resolving metadata for {File}", filePath);
                return null;
            }
        }

        private static bool IsFileOutsideCandidateWindow(string filePath, DateTime startUtc, DateTime endUtc)
        {
            var match = TimestampFilenamePattern.Match(Path.GetFileName(filePath));
            if (!match.Success) return false;

            string localIsoFormatted = $"{match.Groups[1].Value}-{match.Groups[2].Value}-{match.Groups[3].Value}T{match.Groups[4].Value}:{match.Groups[5].Value}:{match.Groups[6].Value}";
            if (DateTime.TryParse(localIsoFormatted, null, DateTimeStyles.AssumeLocal, out DateTime fileApproxStartLocal))
            {
                DateTime fileApproxStartUtc = fileApproxStartLocal.ToUniversalTime();

                if (fileApproxStartUtc > endUtc.AddHours(6)) return true;
                if (fileApproxStartUtc < startUtc.AddHours(-6)) return true;
            }

            return false;
        }

        private static List<TimeGapDto> DetectGaps(List<RecordingChunkMetadata> sortedChunks)
        {
            var gaps = new List<TimeGapDto>();
            const double GapToleranceSeconds = 5.0;

            for (int i = 0; i < sortedChunks.Count - 1; i++)
            {
                var current = sortedChunks[i];
                var next = sortedChunks[i + 1];

                double diff = (next.StartUtc - current.EndUtc).TotalSeconds;
                if (diff > GapToleranceSeconds)
                {
                    gaps.Add(new TimeGapDto
                    {
                        ExpectedUtc = current.EndUtc,
                        ActualNextStartUtc = next.StartUtc
                    });
                }
            }

            return gaps;
        }

        private record CachedChunkMetadata
        {
            public DateTime StartUtc { get; init; }
            public DateTime EndUtc { get; init; }
            public long FileSizeBytes { get; init; }
            public bool IsClosed { get; init; }
        }
    }
}