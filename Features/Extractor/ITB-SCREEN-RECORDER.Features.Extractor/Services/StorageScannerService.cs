using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public class StorageScannerService : IStorageScannerService
    {
        private readonly ExtractorOptions _options;
        private readonly ILogger<StorageScannerService> _logger;
        private static readonly Regex ChunkFileNameRegex = new(
            @"^(?<host>.+?)_(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})_(?<hour>\d{2})(?<minute>\d{2})(?<sec>\d{2})\.mp4$",
            RegexOptions.Compiled | RegexOptions.IgnoreCase);

        public StorageScannerService(IOptions<ExtractorOptions> options, ILogger<StorageScannerService> logger)
        {
            _options = options.Value;
            _logger = logger;
        }

        public Task<List<string>> GetAvailableHostsAsync(DateTime startUtc, DateTime endUtc)
        {
            var hosts = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
            var roots = ResolveActiveStorageRoots();

            foreach (var root in roots)
            {
                if (!Directory.Exists(root)) continue;

                try
                {
                    var files = Directory.EnumerateFiles(root, "*.mp4", SearchOption.AllDirectories);
                    foreach (var file in files)
                    {
                        var parsed = TryParseChunk(file);
                        if (parsed != null && parsed.EndUtc >= startUtc && parsed.StartUtc <= endUtc)
                        {
                            hosts.Add(parsed.Hostname);
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Failed scanning storage root {Root}", root);
                }
            }

            return Task.FromResult(hosts.OrderBy(h => h).ToList());
        }

        public Task<List<RecordingChunkMetadata>> GetChunksForStationAsync(string hostname, DateTime startUtc, DateTime endUtc)
        {
            var chunks = new List<RecordingChunkMetadata>();
            var roots = ResolveActiveStorageRoots();

            foreach (var root in roots)
            {
                if (!Directory.Exists(root)) continue;

                try
                {
                    var files = Directory.EnumerateFiles(root, $"{hostname}_*.mp4", SearchOption.AllDirectories);
                    foreach (var file in files)
                    {
                        var parsed = TryParseChunk(file);
                        if (parsed != null &&
                            string.Equals(parsed.Hostname, hostname, StringComparison.OrdinalIgnoreCase) &&
                            parsed.EndUtc >= startUtc &&
                            parsed.StartUtc <= endUtc)
                        {
                            chunks.Add(parsed);
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Failed reading station chunks from {Root}", root);
                }
            }

            var sortedUniqueChunks = chunks
                .GroupBy(c => c.FullPath)
                .Select(g => g.First())
                .OrderBy(c => c.StartUtc)
                .ToList();

            return Task.FromResult(sortedUniqueChunks);
        }

        public string BuildConcatManifest(List<RecordingChunkMetadata> chunks, DateTime rangeStartUtc, DateTime rangeEndUtc)
        {
            var sb = new StringBuilder();
            sb.AppendLine("ffconcat version 1.0");

            for (int i = 0; i < chunks.Count; i++)
            {
                var chunk = chunks[i];
                string normalizedPath = chunk.FullPath.Replace('\\', '/');
                sb.AppendLine($"file '{normalizedPath}'");

                if (i == 0 && rangeStartUtc > chunk.StartUtc)
                {
                    double inPoint = (rangeStartUtc - chunk.StartUtc).TotalSeconds;
                    if (inPoint > 0)
                    {
                        sb.AppendLine(string.Format(CultureInfo.InvariantCulture, "inpoint {0:F3}", inPoint));
                    }
                }

                if (i == chunks.Count - 1 && rangeEndUtc < chunk.EndUtc)
                {
                    double outPoint = (rangeEndUtc - chunk.StartUtc).TotalSeconds;
                    if (outPoint > 0)
                    {
                        sb.AppendLine(string.Format(CultureInfo.InvariantCulture, "outpoint {0:F3}", outPoint));
                    }
                }
            }

            return sb.ToString();
        }

        private IEnumerable<string> ResolveActiveStorageRoots()
        {
            var roots = new List<string>();
            if (!string.IsNullOrWhiteSpace(_options.PrimaryStoragePath) && Directory.Exists(_options.PrimaryStoragePath))
            {
                roots.Add(_options.PrimaryStoragePath);
            }
            if (!string.IsNullOrWhiteSpace(_options.LocalFallbackPath) && Directory.Exists(_options.LocalFallbackPath))
            {
                roots.Add(_options.LocalFallbackPath);
            }
            return roots;
        }

        private RecordingChunkMetadata? TryParseChunk(string filePath)
        {
            string fileName = Path.GetFileName(filePath);
            var match = ChunkFileNameRegex.Match(fileName);
            if (!match.Success) return null;

            try
            {
                int year = int.Parse(match.Groups["year"].Value);
                int month = int.Parse(match.Groups["month"].Value);
                int day = int.Parse(match.Groups["day"].Value);
                int hour = int.Parse(match.Groups["hour"].Value);
                int minute = int.Parse(match.Groups["minute"].Value);
                int second = int.Parse(match.Groups["sec"].Value);

                var localStart = new DateTime(year, month, day, hour, minute, second, DateTimeKind.Local);
                var startUtc = localStart.ToUniversalTime();
                var endUtc = startUtc.AddMinutes(15);
                var fi = new FileInfo(filePath);

                return new RecordingChunkMetadata
                {
                    FullPath = filePath,
                    Hostname = match.Groups["host"].Value,
                    StartUtc = startUtc,
                    EndUtc = endUtc,
                    FileSizeBytes = fi.Exists ? fi.Length : 0
                };
            }
            catch
            {
                return null;
            }
        }
    }
}