// ==========================================
// File: Features/Extractor/Services/StorageScannerService.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Core.Configuration;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public class StorageScannerService : IStorageScannerService
    {
        private readonly IConfiguration _configuration;
        private readonly IOptionsMonitor<SystemConfig> _systemConfigMonitor;
        private readonly ExtractorOptions _options;
        private readonly ILogger<StorageScannerService> _logger;
        private readonly IDummyVideoGenerator _dummyGenerator;

        private static bool _pragmaInitialized = false;
        private static readonly object _pragmaLock = new();

        private static readonly string[] SupportedVideoExtensions = { ".mp4", ".fmp4", ".flv", ".mkv", ".ts", ".mov" };

        private static readonly Regex UniversalChunkRegex = new(
            @"(?:^(?<host>[a-zA-Z0-9_\-\.]+?)[_-])?(?<year>20\d{2})[-_]?(?<month>\d{2})[-_]?(?<day>\d{2})[-_T](?<hour>\d{2})[-_:]?(?<minute>\d{2})[-_:]?(?<sec>\d{2})(?:[_\-\.]\d+)?(?<utc>Z)?\.(mp4|fmp4|flv|mkv|ts|mov)$",
            RegexOptions.Compiled | RegexOptions.IgnoreCase);

        public StorageScannerService(
            IConfiguration configuration,
            IOptionsMonitor<SystemConfig> systemConfigMonitor,
            IOptions<ExtractorOptions> options,
            ILogger<StorageScannerService> logger,
            IDummyVideoGenerator dummyGenerator)
        {
            _configuration = configuration;
            _systemConfigMonitor = systemConfigMonitor;
            _options = options.Value;
            _logger = logger;
            _dummyGenerator = dummyGenerator;
        }

        private TimeZoneInfo GetCurrentTimezone()
        {
            string? configuredTz = _systemConfigMonitor.CurrentValue?.DisplayTimezone;
            try
            {
                return !string.IsNullOrWhiteSpace(configuredTz)
                    ? TimeZoneInfo.FindSystemTimeZoneById(configuredTz)
                    : TimeZoneInfo.Local;
            }
            catch
            {
                return TimeZoneInfo.Local;
            }
        }

        private SqliteConnection OpenCatalogDbConnection()
        {
            string baseDir = _configuration["Database:BaseDirectory"]
                ?? Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData), "ITB-SCREEN-RECORDER", "Data");
            string dbPath = Path.Combine(baseDir, "system_catalog.db");

            var csb = new SqliteConnectionStringBuilder
            {
                DataSource = dbPath,
                Mode = SqliteOpenMode.ReadWriteCreate,
                DefaultTimeout = 30,
                Cache = SqliteCacheMode.Shared
            };

            var conn = new SqliteConnection(csb.ConnectionString);
            conn.Open();

            if (!_pragmaInitialized)
            {
                lock (_pragmaLock)
                {
                    if (!_pragmaInitialized)
                    {
                        using var cmd = conn.CreateCommand();
                        cmd.CommandText = @"
                            PRAGMA journal_mode=WAL; 
                            PRAGMA synchronous=NORMAL; 
                            PRAGMA temp_store=MEMORY;
                            PRAGMA busy_timeout=30000;
                            CREATE INDEX IF NOT EXISTS idx_chunks_station_range 
                            ON recording_chunks (station_id, start_epoch_ms, end_epoch_ms);";
                        cmd.ExecuteNonQuery();
                        _pragmaInitialized = true;
                    }
                }
            }

            return conn;
        }

        public async Task<List<string>> GetAvailableHostsAsync(DateTime startUtc, DateTime endUtc)
        {
            long startMs = new DateTimeOffset(startUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();
            long endMs = new DateTimeOffset(endUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();

            using var conn = OpenCatalogDbConnection();
            const string sql = @"
                SELECT DISTINCT station_id 
                FROM recording_chunks 
                WHERE end_epoch_ms >= @startMs AND start_epoch_ms <= @endMs
                UNION
                SELECT station_id FROM station_nodes
                ORDER BY 1 ASC;";

            var hosts = (await conn.QueryAsync<string>(sql, new { startMs, endMs })).ToList();
            return hosts.Where(h => !string.IsNullOrWhiteSpace(h)).ToList();
        }

        public async Task<List<RecordingChunkMetadata>> GetChunksForStationAsync(string hostname, DateTime startUtc, DateTime endUtc)
        {
            long startMs = new DateTimeOffset(startUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();
            long endMs = new DateTimeOffset(endUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();

            using var conn = OpenCatalogDbConnection();
            const string sql = @"
                SELECT file_path AS FullPath, station_id AS Hostname,
                       start_epoch_ms AS StartEpochMs, end_epoch_ms AS EndEpochMs,
                       file_size_bytes AS FileSizeBytes,
                       COALESCE(width, 1920) AS Width,
                       COALESCE(height, 1080) AS Height,
                       COALESCE(fps, 30) AS Fps,
                       COALESCE(has_audio, 1) AS HasAudio
                FROM recording_chunks
                WHERE station_id = @hostname
                  AND end_epoch_ms >= @startMs
                  AND start_epoch_ms <= @endMs
                ORDER BY start_epoch_ms ASC;";

            var rows = await conn.QueryAsync(sql, new { hostname, startMs, endMs });
            var chunks = new List<RecordingChunkMetadata>();

            foreach (var r in rows)
            {
                chunks.Add(new RecordingChunkMetadata
                {
                    FullPath = (string)r.FullPath,
                    Hostname = (string)r.Hostname,
                    StartUtc = DateTimeOffset.FromUnixTimeMilliseconds((long)r.StartEpochMs).UtcDateTime,
                    EndUtc = DateTimeOffset.FromUnixTimeMilliseconds((long)r.EndEpochMs).UtcDateTime,
                    FileSizeBytes = (long)r.FileSizeBytes,
                    Width = (int)r.Width,
                    Height = (int)r.Height,
                    Fps = (double)r.Fps,
                    HasAudio = (long)r.HasAudio != 0
                });
            }

            return chunks;
        }

        public async Task<string> BuildConcatManifestAsync(List<RecordingChunkMetadata> chunks, DateTime rangeStartUtc, DateTime rangeEndUtc)
        {
            var sb = new StringBuilder();
            sb.AppendLine("ffconcat version 1.0");

            if (chunks.Count == 0) return sb.ToString();

            bool requiresPadding = false;
            DateTime currentCheckUtc = rangeStartUtc;
            foreach (var chunk in chunks)
            {
                if (chunk.StartUtc > currentCheckUtc.AddSeconds(1))
                {
                    requiresPadding = true;
                    break;
                }
                currentCheckUtc = chunk.EndUtc > currentCheckUtc ? chunk.EndUtc : currentCheckUtc;
            }
            if (currentCheckUtc < rangeEndUtc.AddSeconds(-1)) requiresPadding = true;

            string? dummyPath = null;
            if (requiresPadding)
            {
                string sampleFile = chunks.First().FullPath;
                dummyPath = await _dummyGenerator.GetOrGenerateDummyVideoAsync(sampleFile);
                dummyPath = dummyPath.Replace('\\', '/');
            }

            DateTime currentTimelineUtc = rangeStartUtc;

            foreach (var chunk in chunks)
            {
                if (chunk.EndUtc <= currentTimelineUtc) continue;

                if (chunk.StartUtc > currentTimelineUtc)
                {
                    TimeSpan gap = chunk.StartUtc - currentTimelineUtc;
                    if (gap.TotalSeconds > 0.5 && dummyPath != null)
                    {
                        sb.AppendLine($"file '{dummyPath}'");
                        sb.AppendLine(string.Format(CultureInfo.InvariantCulture, "duration {0:F3}", gap.TotalSeconds));
                    }
                    currentTimelineUtc = chunk.StartUtc;
                }

                string normalizedPath = chunk.FullPath.Replace('\\', '/');
                sb.AppendLine($"file '{normalizedPath}'");

                if (chunk.StartUtc < rangeStartUtc)
                {
                    double inPoint = (rangeStartUtc - chunk.StartUtc).TotalSeconds;
                    sb.AppendLine(string.Format(CultureInfo.InvariantCulture, "inpoint {0:F3}", inPoint));
                }

                if (chunk.EndUtc > rangeEndUtc)
                {
                    double outPoint = (rangeEndUtc - chunk.StartUtc).TotalSeconds;
                    sb.AppendLine(string.Format(CultureInfo.InvariantCulture, "outpoint {0:F3}", outPoint));
                    currentTimelineUtc = rangeEndUtc;
                    break;
                }
                else
                {
                    currentTimelineUtc = chunk.EndUtc;
                }
            }

            if (currentTimelineUtc < rangeEndUtc)
            {
                TimeSpan finalGap = rangeEndUtc - currentTimelineUtc;
                if (finalGap.TotalSeconds > 0.5 && dummyPath != null)
                {
                    sb.AppendLine($"file '{dummyPath}'");
                    sb.AppendLine(string.Format(CultureInfo.InvariantCulture, "duration {0:F3}", finalGap.TotalSeconds));
                }
            }

            return sb.ToString();
        }

        public async Task<ReindexResult> ScanAndIndexMissingFilesAsync(CancellationToken ct = default)
        {
            var roots = ResolveActiveStorageRoots().Where(Directory.Exists).ToList();
            if (roots.Count == 0) return new ReindexResult(0, 0, 0, 0);

            HashSet<string> existingPaths;
            using (var conn = OpenCatalogDbConnection())
            {
                var indexed = await conn.QueryAsync<string>("SELECT file_path FROM recording_chunks;");
                existingPaths = new HashSet<string>(indexed, StringComparer.OrdinalIgnoreCase);
            }

            int totalScanned = 0, newlyIndexed = 0, skipped = 0, errors = 0;
            var chunksToAdd = new List<(string StationId, string Path, long StartMs, long EndMs, long Size)>();

            foreach (var root in roots)
            {
                if (ct.IsCancellationRequested) break;

                var files = await Task.Run(() =>
                {
                    return Directory.EnumerateFiles(root, "*.*", SearchOption.AllDirectories)
                        .Where(f => SupportedVideoExtensions.Contains(Path.GetExtension(f), StringComparer.OrdinalIgnoreCase))
                        .OrderBy(f => f)
                        .ToList();
                }, ct);

                for (int i = 0; i < files.Count; i++)
                {
                    if (ct.IsCancellationRequested) break;
                    var file = files[i];
                    totalScanned++;

                    if (existingPaths.Contains(file))
                    {
                        skipped++;
                        continue;
                    }

                    try
                    {
                        var parsed = TryParseChunkFast(file, null);
                        if (parsed != null)
                        {
                            var fi = new FileInfo(file);
                            long startMs = new DateTimeOffset(parsed.StartUtc).ToUnixTimeMilliseconds();

                            long endMs = startMs + (15 * 60 * 1000);
                            if (i + 1 < files.Count)
                            {
                                var nextParsed = TryParseChunkFast(files[i + 1], null);
                                if (nextParsed != null && string.Equals(nextParsed.Hostname, parsed.Hostname, StringComparison.OrdinalIgnoreCase))
                                {
                                    long nextStartMs = new DateTimeOffset(nextParsed.StartUtc).ToUnixTimeMilliseconds();
                                    if (nextStartMs > startMs && (nextStartMs - startMs) <= (20 * 60 * 1000))
                                    {
                                        endMs = nextStartMs;
                                    }
                                }
                            }

                            chunksToAdd.Add((parsed.Hostname, file, startMs, endMs, fi.Length));
                            newlyIndexed++;
                            existingPaths.Add(file);
                        }
                    }
                    catch
                    {
                        errors++;
                    }

                    if (chunksToAdd.Count >= 50)
                    {
                        await FlushChunksBatchAsync(chunksToAdd, ct);
                        chunksToAdd.Clear();
                    }
                }
            }

            if (chunksToAdd.Count > 0)
            {
                await FlushChunksBatchAsync(chunksToAdd, ct);
            }

            _logger.LogInformation("[REINDEX] Completed. Scanned: {Total}, Added: {Added}, Skipped: {Skipped}, Errors: {Err}",
                totalScanned, newlyIndexed, skipped, errors);

            return new ReindexResult(totalScanned, newlyIndexed, skipped, errors);
        }

        private async Task FlushChunksBatchAsync(List<(string StationId, string Path, long StartMs, long EndMs, long Size)> items, CancellationToken ct = default)
        {
            using var conn = OpenCatalogDbConnection();
            using var tx = conn.BeginTransaction();
            const string sql = @"
                INSERT INTO recording_chunks (
                    station_id, file_path, start_epoch_ms, end_epoch_ms, 
                    duration_ms, file_size_bytes, width, height, fps, has_audio, is_finalized, indexed_at_utc
                ) VALUES (
                    @StationId, @Path, @StartMs, @EndMs, 
                    (@EndMs - @StartMs), @Size, 1920, 1080, 30, 1, 1, @Now
                ) ON CONFLICT(file_path) DO NOTHING;";

            long now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            foreach (var item in items)
            {
                await conn.ExecuteAsync(new CommandDefinition(sql, new { item.StationId, item.Path, item.StartMs, item.EndMs, item.Size, Now = now }, tx, cancellationToken: ct));
            }
            await tx.CommitAsync(ct);
        }

        // 💡 קריאה דינמית מה-OptionsMonitor בכל סריקה
        private IEnumerable<string> ResolveActiveStorageRoots()
        {
            var list = new List<string>();
            var cfg = _systemConfigMonitor.CurrentValue;

            string netApp = cfg?.Storage?.NetAppUncPath
                ?? _configuration["SystemConfig:Storage:NetAppUncPath"]
                ?? @"\\NetAppStorage\CaptureRecordings";

            string fallback = cfg?.Storage?.LocalFallbackPath
                ?? _configuration["SystemConfig:Storage:LocalFallbackPath"]
                ?? @"C:\ProgramData\ITB-SCREEN-RECORDER\Recordings";

            if (!string.IsNullOrWhiteSpace(netApp)) list.Add(netApp);
            if (!string.IsNullOrWhiteSpace(fallback)) list.Add(fallback);
            return list;
        }

        private RecordingChunkMetadata? TryParseChunkFast(string filePath, string? inferredHost)
        {
            string fileName = Path.GetFileName(filePath);
            var match = UniversalChunkRegex.Match(fileName);
            if (!match.Success) return null;

            string host = inferredHost ?? (match.Groups["host"].Success ? match.Groups["host"].Value : string.Empty);
            if (string.IsNullOrWhiteSpace(host))
            {
                var parentDir = Directory.GetParent(filePath);
                if (parentDir != null && !string.Equals(parentDir.Name, "live", StringComparison.OrdinalIgnoreCase))
                {
                    host = parentDir.Name;
                }
            }

            if (string.IsNullOrWhiteSpace(host)) return null;

            int year = int.Parse(match.Groups["year"].Value);
            int month = int.Parse(match.Groups["month"].Value);
            int day = int.Parse(match.Groups["day"].Value);
            int hour = int.Parse(match.Groups["hour"].Value);
            int minute = int.Parse(match.Groups["minute"].Value);
            int second = int.Parse(match.Groups["sec"].Value);

            DateTime startUtc = match.Groups["utc"].Success
                ? new DateTime(year, month, day, hour, minute, second, DateTimeKind.Utc)
                : TimeZoneInfo.ConvertTimeToUtc(new DateTime(year, month, day, hour, minute, second), GetCurrentTimezone());

            return new RecordingChunkMetadata
            {
                FullPath = filePath,
                Hostname = host,
                StartUtc = startUtc,
                EndUtc = startUtc.AddMinutes(15)
            };
        }
    }
}