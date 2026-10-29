// ==========================================
// File: Features/Extractor/Services/StorageScannerService.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Diagnostics;
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
        private static bool _selfHealTriggered = false;
        private static readonly object _selfHealLock = new();

        private static readonly string[] SupportedVideoExtensions = { ".mp4", ".fmp4", ".flv", ".mkv", ".ts", ".mov" };

        private static readonly Regex UniversalChunkRegex = new(
            @"(?:^(?<host>[a-zA-Z0-9_\-\.]+?)[_-])?(?<year>20\d{2})[-_]?(?<month>\d{2})[-_]?(?<day>\d{2})[-_T](?<hour>\d{2})[-_:]?(?<minute>\d{2})[-_:]?(?<sec>\d{2})(?:[_\-\.]\d+)?(?<utc>Z)?\.(mp4|fmp4|flv|mkv|ts|mov)$",
            RegexOptions.Compiled | RegexOptions.IgnoreCase);

        private static readonly Regex EpochChunkRegex = new(
            @"(?:^(?<host>[a-zA-Z0-9_\-\.]+?)[_-])?(?<epoch>\d{10})(?:[_\-\.](?<micro>\d{1,9}))?(?:[_\-\.][a-zA-Z0-9]+)?\.(mp4|fmp4|flv|mkv|ts|mov)$",
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

            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                    PRAGMA journal_mode=WAL; 
                    PRAGMA synchronous=NORMAL; 
                    PRAGMA temp_store=MEMORY;
                    PRAGMA busy_timeout=30000;
                    CREATE TABLE IF NOT EXISTS recording_chunks (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        station_id TEXT NOT NULL,
                        file_path TEXT NOT NULL UNIQUE,
                        start_epoch_ms INTEGER NOT NULL,
                        end_epoch_ms INTEGER NOT NULL,
                        duration_ms INTEGER NOT NULL DEFAULT 0,
                        file_size_bytes INTEGER NOT NULL DEFAULT 0,
                        width INTEGER NOT NULL DEFAULT 0,
                        height INTEGER NOT NULL DEFAULT 0,
                        fps INTEGER NOT NULL DEFAULT 0,
                        has_audio INTEGER NOT NULL DEFAULT 0,
                        is_finalized INTEGER NOT NULL DEFAULT 0,
                        indexed_at_utc INTEGER NOT NULL,
                        display_id TEXT NOT NULL DEFAULT 'mon-0',
                        is_primary INTEGER NOT NULL DEFAULT 1,
                        display_bounds TEXT
                    );
                    CREATE INDEX IF NOT EXISTS idx_chunks_station_range 
                    ON recording_chunks (station_id COLLATE NOCASE, start_epoch_ms, end_epoch_ms);
                    CREATE INDEX IF NOT EXISTS idx_chunks_station_display
                    ON recording_chunks (station_id COLLATE NOCASE, display_id, start_epoch_ms, end_epoch_ms);";
                cmd.ExecuteNonQuery();

                EnsureColumn(conn, "recording_chunks", "display_id", "TEXT NOT NULL DEFAULT 'mon-0'");
                EnsureColumn(conn, "recording_chunks", "is_primary", "INTEGER NOT NULL DEFAULT 1");
                EnsureColumn(conn, "recording_chunks", "display_bounds", "TEXT");
            }

            TriggerCatalogSelfHeal();

            return conn;
        }

        public async Task<List<string>> GetAvailableHostsAsync(DateTime startUtc, DateTime endUtc)
        {
            long startMs = new DateTimeOffset(startUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();
            long endMs = new DateTimeOffset(endUtc, TimeSpan.Zero).ToUnixTimeMilliseconds() + 300000;

            var hostsSet = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

            try
            {
                using var conn = OpenCatalogDbConnection();
                const string sql = @"
                    SELECT DISTINCT station_id 
                    FROM recording_chunks 
                    WHERE end_epoch_ms >= @startMs AND start_epoch_ms <= @endMs
                    UNION
                    SELECT station_id FROM recording_chunks
                    UNION
                    SELECT station_id FROM station_nodes;";

                var dbHosts = await conn.QueryAsync<string>(sql, new { startMs, endMs });
                foreach (var h in dbHosts.Where(s => !string.IsNullOrWhiteSpace(s)))
                {
                    string clean = h.StartsWith("live/", StringComparison.OrdinalIgnoreCase) ? h.Substring(5) : h;
                    int slashIdx = clean.IndexOf('/');
                    if (slashIdx > 0)
                    {
                        clean = clean.Substring(0, slashIdx);
                    }
                    hostsSet.Add(clean);
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "[STORAGE SCANNER] Failed querying available hosts from DB.");
            }

            // DB-FIRST: If stations are indexed in the database, return them immediately with 0 disk/network I/O
            if (hostsSet.Count > 0)
            {
                return hostsSet.OrderBy(h => h).ToList();
            }

            // Fallback scan is executed ONLY if the database catalog is completely empty (cold start / fresh installation)
            foreach (var root in ResolveActiveStorageRoots().Where(Directory.Exists))
            {
                try
                {
                    ScanHostsInDirectory(root, hostsSet);
                    string liveDir = Path.Combine(root, "live");
                    if (Directory.Exists(liveDir))
                    {
                        ScanHostsInDirectory(liveDir, hostsSet);
                    }
                    string recDir = Path.Combine(root, "recordings");
                    if (Directory.Exists(recDir))
                    {
                        ScanHostsInDirectory(recDir, hostsSet);
                        string recLive = Path.Combine(recDir, "live");
                        if (Directory.Exists(recLive))
                        {
                            ScanHostsInDirectory(recLive, hostsSet);
                        }
                    }
                }
                catch { }
            }

            return hostsSet.OrderBy(h => h).ToList();
        }

        private static void ScanHostsInDirectory(string dir, HashSet<string> hostsSet)
        {
            if (!Directory.Exists(dir)) return;
            foreach (var sub in Directory.EnumerateDirectories(dir))
            {
                string dirName = Path.GetFileName(sub);
                if (dirName.StartsWith(".") ||
                    string.Equals(dirName, "live", StringComparison.OrdinalIgnoreCase) ||
                    string.Equals(dirName, "recordings", StringComparison.OrdinalIgnoreCase) ||
                    string.Equals(dirName, "temp", StringComparison.OrdinalIgnoreCase) ||
                    string.Equals(dirName, "buffer", StringComparison.OrdinalIgnoreCase) ||
                    string.Equals(dirName, "logs", StringComparison.OrdinalIgnoreCase) ||
                    dirName.StartsWith("mon-", StringComparison.OrdinalIgnoreCase) ||
                    dirName.StartsWith("display-", StringComparison.OrdinalIgnoreCase))
                {
                    continue;
                }
                hostsSet.Add(dirName);
            }
        }

        private static readonly System.Collections.Concurrent.ConcurrentDictionary<string, DateTime> _lastDiskScanTimes = new(StringComparer.OrdinalIgnoreCase);

        public async Task<RecordingChunkMetadata?> GetStationSampleChunkAsync(string hostname)
        {
            if (string.IsNullOrWhiteSpace(hostname)) return null;
            string cleanHost = hostname.StartsWith("live/", StringComparison.OrdinalIgnoreCase) ? hostname.Substring(5) : hostname;

            try
            {
                using var conn = OpenCatalogDbConnection();
                const string sql = @"
                    SELECT file_path AS FullPath, station_id AS Hostname,
                           start_epoch_ms AS StartEpochMs, end_epoch_ms AS EndEpochMs,
                           file_size_bytes AS FileSizeBytes,
                           COALESCE(width, 1920) AS Width,
                           COALESCE(height, 1080) AS Height,
                           COALESCE(fps, 30) AS Fps,
                           COALESCE(has_audio, 1) AS HasAudio,
                           COALESCE(is_finalized, 1) AS IsFinalized,
                           COALESCE(display_id, 'mon-0') AS DisplayId,
                           COALESCE(is_primary, 1) AS IsPrimary
                    FROM recording_chunks
                    WHERE (station_id = @cleanHost 
                           OR station_id = ('live/' || @cleanHost) 
                           OR station_id = @rawHost
                           OR station_id LIKE (@cleanHost || '/%')
                           OR station_id LIKE ('live/' || @cleanHost || '/%')) COLLATE NOCASE
                    ORDER BY start_epoch_ms DESC
                    LIMIT 1;";

                var row = await conn.QueryFirstOrDefaultAsync(sql, new { cleanHost, rawHost = hostname });
                if (row != null)
                {
                    return new RecordingChunkMetadata
                    {
                        FullPath = (string)row.FullPath,
                        Hostname = cleanHost,
                        StartUtc = DateTimeOffset.FromUnixTimeMilliseconds((long)row.StartEpochMs).UtcDateTime,
                        EndUtc = DateTimeOffset.FromUnixTimeMilliseconds((long)row.EndEpochMs).UtcDateTime,
                        FileSizeBytes = (long)row.FileSizeBytes,
                        Width = (int)row.Width,
                        Height = (int)row.Height,
                        Fps = (double)row.Fps,
                        HasAudio = (long)row.HasAudio != 0,
                        IsFinalized = (long)row.IsFinalized != 0,
                        DisplayId = row.DisplayId != null ? (string)row.DisplayId : "mon-0",
                        IsPrimary = row.IsPrimary != null ? ((long)row.IsPrimary != 0) : true
                    };
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "[STORAGE SCANNER] Failed querying sample chunk for '{Host}' from DB.", cleanHost);
            }

            return null;
        }

        public async Task<List<RecordingChunkMetadata>> GetChunksForStationAsync(string hostname, DateTime startUtc, DateTime endUtc)
        {
            string cleanHost = hostname.StartsWith("live/", StringComparison.OrdinalIgnoreCase) ? hostname.Substring(5) : hostname;
            long startMs = new DateTimeOffset(startUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();
            long endMs = new DateTimeOffset(endUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();

            // 1. DB-FIRST: High-speed indexed query from database with 0 disk I/O (a few milliseconds)
            var dbChunks = await QueryChunksFromDbAsync(cleanHost, startMs, endMs);

            bool isHistorical = endUtc < DateTime.UtcNow.AddMinutes(-15);

            // Historical range found in DB: return immediately! Zero disk or network share access!
            if (isHistorical && dbChunks.Count > 0)
            {
                return dbChunks;
            }

            // Disk access cooldown check per station
            bool isRecentScope = !isHistorical;
            double cooldownSeconds = isRecentScope ? 3.0 : 60.0;
            bool hasRecentScan = _lastDiskScanTimes.TryGetValue(cleanHost, out var lastScan) && (DateTime.UtcNow - lastScan).TotalSeconds < cooldownSeconds;

            if (hasRecentScan)
            {
                return dbChunks;
            }

            // Determine if a disk scan is necessary to locate gaps or update the active hot chunk
            bool shouldScanDisk = false;

            if (dbChunks.Count == 0)
            {
                // DB contains no chunks for station in requested range - scan disk to discover segments
                shouldScanDisk = true;
            }
            else if (isRecentScope)
            {
                bool hasUnfinalized = dbChunks.Any(c => !c.IsFinalized);
                var latestChunk = dbChunks.MaxBy(c => c.EndUtc);
                bool tailIsPast = latestChunk != null && (DateTime.UtcNow - latestChunk.EndUtc).TotalSeconds > 10;

                if (hasUnfinalized || tailIsPast)
                {
                    shouldScanDisk = true;
                }
            }

            if (shouldScanDisk)
            {
                _lastDiskScanTimes[cleanHost] = DateTime.UtcNow;
                _lastDiskScanTimes[hostname] = DateTime.UtcNow;

                var knownFinalizedPaths = new HashSet<string>(
                    dbChunks.Where(c => c.IsFinalized).Select(c => c.FullPath), 
                    StringComparer.OrdinalIgnoreCase);

                var missingOnDisk = await ScanUnindexedFilesForStationAsync(cleanHost, startMs, endMs, knownFinalizedPaths);

                if (missingOnDisk.Count > 0)
                {
                    _logger.LogInformation("[STORAGE SCANNER] Found {Count} unindexed/updated file(s) on disk for '{Host}'. Auto-indexing immediately...",
                        missingOnDisk.Count, cleanHost);

                    await FlushChunksBatchAsync(missingOnDisk);
                    return await QueryChunksFromDbAsync(cleanHost, startMs, endMs);
                }
            }

            return dbChunks;
        }

        public async Task<int> ForceIndexStationAsync(string hostname, CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(hostname)) return 0;
            string cleanHost = hostname.StartsWith("live/", StringComparison.OrdinalIgnoreCase) ? hostname.Substring(5) : hostname;

            _lastDiskScanTimes.TryRemove(cleanHost, out _);
            _lastDiskScanTimes.TryRemove(hostname, out _);

            long startMs = DateTimeOffset.UtcNow.AddHours(-24).ToUnixTimeMilliseconds();
            long endMs = DateTimeOffset.UtcNow.AddMinutes(15).ToUnixTimeMilliseconds();

            var knownFinalizedPaths = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
            using (var conn = OpenCatalogDbConnection())
            {
                var existing = await conn.QueryAsync<string>(
                    @"SELECT file_path FROM recording_chunks 
                      WHERE (station_id = @cleanHost 
                             OR station_id = ('live/' || @cleanHost) 
                             OR station_id = @rawHost 
                             OR station_id LIKE (@cleanHost || '/%') 
                             OR station_id LIKE ('live/' || @cleanHost || '/%')) 
                        AND is_finalized = 1;",
                    new { cleanHost, rawHost = hostname });
                foreach (var p in existing) knownFinalizedPaths.Add(p);
            }

            var missing = await ScanUnindexedFilesForStationAsync(cleanHost, startMs, endMs, knownFinalizedPaths);
            if (missing.Count > 0)
            {
                _logger.LogInformation("[STORAGE SCANNER] ForceIndexStationAsync indexed {Count} chunk(s) for '{Host}'.", missing.Count, cleanHost);
                await FlushChunksBatchAsync(missing, ct);
                return missing.Count;
            }

            return 0;
        }

        private async Task<List<RecordingChunkMetadata>> QueryChunksFromDbAsync(string hostname, long startMs, long endMs)
        {
            string cleanHost = hostname.StartsWith("live/", StringComparison.OrdinalIgnoreCase) ? hostname.Substring(5) : hostname;
            long endMsTolerance = endMs + 300000;

            using var conn = OpenCatalogDbConnection();

            const string sql = @"
                SELECT file_path AS FullPath, station_id AS Hostname,
                       start_epoch_ms AS StartEpochMs, end_epoch_ms AS EndEpochMs,
                       file_size_bytes AS FileSizeBytes,
                       COALESCE(width, 1920) AS Width,
                       COALESCE(height, 1080) AS Height,
                       COALESCE(fps, 30) AS Fps,
                       COALESCE(has_audio, 1) AS HasAudio,
                       COALESCE(is_finalized, 1) AS IsFinalized,
                       COALESCE(display_id, 'mon-0') AS DisplayId,
                       COALESCE(is_primary, 1) AS IsPrimary
                FROM recording_chunks
                WHERE (station_id = @cleanHost 
                       OR station_id = ('live/' || @cleanHost) 
                       OR station_id = @rawHost
                       OR station_id LIKE (@cleanHost || '/%')
                       OR station_id LIKE ('live/' || @cleanHost || '/%')) COLLATE NOCASE
                  AND end_epoch_ms >= @startMs
                  AND start_epoch_ms <= @endMsTolerance
                ORDER BY start_epoch_ms ASC;";

            var rows = await conn.QueryAsync(sql, new { cleanHost, rawHost = hostname, startMs, endMsTolerance });
            var chunks = new List<RecordingChunkMetadata>();

            foreach (var r in rows)
            {
                bool isFin = (long)r.IsFinalized != 0;
                long eMs = (long)r.EndEpochMs;
                if (!isFin && eMs < DateTimeOffset.UtcNow.ToUnixTimeMilliseconds())
                {
                    eMs = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
                }

                chunks.Add(new RecordingChunkMetadata
                {
                    FullPath = (string)r.FullPath,
                    Hostname = cleanHost,
                    StartUtc = DateTimeOffset.FromUnixTimeMilliseconds((long)r.StartEpochMs).UtcDateTime,
                    EndUtc = DateTimeOffset.FromUnixTimeMilliseconds(eMs).UtcDateTime,
                    FileSizeBytes = (long)r.FileSizeBytes,
                    Width = (int)r.Width,
                    Height = (int)r.Height,
                    Fps = (double)r.Fps,
                    HasAudio = (long)r.HasAudio != 0,
                    IsFinalized = isFin,
                    DisplayId = r.DisplayId != null ? (string)r.DisplayId : "mon-0",
                    IsPrimary = r.IsPrimary != null ? ((long)r.IsPrimary != 0) : true
                });
            }

            return chunks;
        }

        private static string? FindStationDirectory(string root, string cleanHost)
        {
            if (!Directory.Exists(root)) return null;

            string[] directCandidates = {
                Path.Combine(root, cleanHost),
                Path.Combine(root, "live", cleanHost),
                Path.Combine(root, "recordings", cleanHost),
                Path.Combine(root, "recordings", "live", cleanHost)
            };

            foreach (var candidate in directCandidates)
            {
                if (Directory.Exists(candidate)) return candidate;
            }

            string normalizedClean = cleanHost.Replace('-', '_');

            try
            {
                var directSub = Directory.EnumerateDirectories(root)
                    .FirstOrDefault(d => string.Equals(Path.GetFileName(d), cleanHost, StringComparison.OrdinalIgnoreCase) ||
                                         string.Equals(Path.GetFileName(d).Replace('-', '_'), normalizedClean, StringComparison.OrdinalIgnoreCase));
                if (directSub != null) return directSub;

                string liveDir = Path.Combine(root, "live");
                if (Directory.Exists(liveDir))
                {
                    var liveSub = Directory.EnumerateDirectories(liveDir)
                        .FirstOrDefault(d => string.Equals(Path.GetFileName(d), cleanHost, StringComparison.OrdinalIgnoreCase) ||
                                             string.Equals(Path.GetFileName(d).Replace('-', '_'), normalizedClean, StringComparison.OrdinalIgnoreCase));
                    if (liveSub != null) return liveSub;
                }

                string recDir = Path.Combine(root, "recordings");
                if (Directory.Exists(recDir))
                {
                    var recSub = Directory.EnumerateDirectories(recDir)
                        .FirstOrDefault(d => string.Equals(Path.GetFileName(d), cleanHost, StringComparison.OrdinalIgnoreCase) ||
                                             string.Equals(Path.GetFileName(d).Replace('-', '_'), normalizedClean, StringComparison.OrdinalIgnoreCase));
                    if (recSub != null) return recSub;

                    string recLive = Path.Combine(recDir, "live");
                    if (Directory.Exists(recLive))
                    {
                        var recLiveSub = Directory.EnumerateDirectories(recLive)
                            .FirstOrDefault(d => string.Equals(Path.GetFileName(d), cleanHost, StringComparison.OrdinalIgnoreCase) ||
                                                 string.Equals(Path.GetFileName(d).Replace('-', '_'), normalizedClean, StringComparison.OrdinalIgnoreCase));
                        if (recLiveSub != null) return recLiveSub;
                    }
                }
            }
            catch { }

            return null;
        }

        private async Task<List<(string StationId, string Path, long StartMs, long EndMs, long Size, bool IsFinalized)>> ScanUnindexedFilesForStationAsync(
            string hostname, long startMs, long endMs, HashSet<string> knownPaths)
        {
            var missing = new List<(string StationId, string Path, long StartMs, long EndMs, long Size, bool IsFinalized)>();
            var roots = ResolveActiveStorageRoots().Where(Directory.Exists);

            int intervalMinutes = Math.Max(1, _systemConfigMonitor.CurrentValue?.Storage?.ChunkIntervalMinutes ?? 15);
            long defaultDurationMs = intervalMinutes * 60 * 1000;
            string cleanHost = hostname.StartsWith("live/", StringComparison.OrdinalIgnoreCase) ? hostname.Substring(5) : hostname;

            foreach (var root in roots)
            {
                string? targetDir = FindStationDirectory(root, cleanHost);
                if (targetDir == null) continue;

                var searchDirs = new List<string> { targetDir };
                try
                {
                    var displaySubDirs = Directory.EnumerateDirectories(targetDir)
                        .Where(d => Path.GetFileName(d).StartsWith("mon-", StringComparison.OrdinalIgnoreCase) ||
                                    Path.GetFileName(d).StartsWith("display-", StringComparison.OrdinalIgnoreCase));
                    searchDirs.AddRange(displaySubDirs);
                }
                catch { }

                var candidateFiles = new List<string>();
                foreach (var d in searchDirs)
                {
                    try
                    {
                        candidateFiles.AddRange(Directory.EnumerateFiles(d, "*.*", SearchOption.TopDirectoryOnly)
                            .Where(f => SupportedVideoExtensions.Contains(Path.GetExtension(f), StringComparer.OrdinalIgnoreCase) && !knownPaths.Contains(f)));
                    }
                    catch { }
                }

                candidateFiles = candidateFiles.OrderBy(f => f).ToList();

                for (int i = 0; i < candidateFiles.Count; i++)
                {
                    string file = candidateFiles[i];
                    var parsed = TryParseChunkFast(file, cleanHost);
                    if (parsed == null) continue;

                    long fStart = new DateTimeOffset(parsed.StartUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();

                    // Fast in-memory boundary filtering prior to disk access: skip files outside requested range
                    if (fStart > (endMs + 300000) || (fStart + 3600000) < startMs)
                    {
                        continue;
                    }

                    long fEnd = 0;
                    bool isLocked = IsFileLocked(file);
                    bool isFinalized = !isLocked;

                    if (i + 1 < candidateFiles.Count)
                    {
                        var nextParsed = TryParseChunkFast(candidateFiles[i + 1], cleanHost);
                        if (nextParsed != null)
                        {
                            long nextStart = new DateTimeOffset(nextParsed.StartUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();
                            if (nextStart > fStart && (nextStart - fStart) <= (30 * 60 * 1000))
                            {
                                // Chunk duration is defined by the start of the succeeding chunk without FFprobe invocation
                                fEnd = nextStart;
                            }
                        }
                    }

                    if (fEnd <= 0)
                    {
                        if (isLocked)
                        {
                            long activeDurMs = (long)(DateTime.UtcNow - parsed.StartUtc).TotalMilliseconds;
                            fEnd = fStart + (activeDurMs > 500 ? activeDurMs : defaultDurationMs);
                        }
                        else
                        {
                            try
                            {
                                var fi = new FileInfo(file);
                                if (fi.Exists && fi.LastWriteTimeUtc > parsed.StartUtc)
                                {
                                    long writeDiffMs = (long)(fi.LastWriteTimeUtc - parsed.StartUtc).TotalMilliseconds;
                                    fEnd = fStart + (writeDiffMs > 500 ? Math.Min(writeDiffMs, defaultDurationMs) : defaultDurationMs);
                                }
                                else
                                {
                                    fEnd = fStart + defaultDurationMs;
                                }
                            }
                            catch
                            {
                                fEnd = fStart + defaultDurationMs;
                            }
                        }
                    }

                    if (fEnd >= startMs && fStart <= (endMs + 300000))
                    {
                        try
                        {
                            var fi = new FileInfo(file);
                            if (fi.Exists && fi.Length >= 1024)
                            {
                                missing.Add((cleanHost, file, fStart, fEnd, fi.Length, isFinalized));
                            }
                        }
                        catch { }
                    }
                }
            }

            return missing;
        }

        private long GetAccurateChunkDurationMs(string filePath, DateTime startUtc, long fallbackDurationMs)
        {
            try
            {
                var fi = new FileInfo(filePath);
                if (!fi.Exists || fi.Length < 1024) return fallbackDurationMs;

                // Check if file is still being actively written (Locked / Near-Live DVR)
                if (IsFileLocked(filePath))
                {
                    long activeDurMs = (long)(DateTime.UtcNow - startUtc).TotalMilliseconds;
                    return activeDurMs > 500 ? activeDurMs : fallbackDurationMs;
                }

                // Fast check without external child processes based on disk file modification time (LastWriteTimeUtc)
                if (fi.LastWriteTimeUtc > startUtc)
                {
                    long diffMs = (long)(fi.LastWriteTimeUtc - startUtc).TotalMilliseconds;
                    if (diffMs > 500 && diffMs <= (30 * 60 * 1000))
                    {
                        return diffMs;
                    }
                }

                // Final fallback probe via FFprobe only if not derivable from file metadata
                // The file is finalized on disk: sample accurate duration using FFprobe
                string? ffprobePath = ResolveFfprobePath();
                if (!string.IsNullOrWhiteSpace(ffprobePath) && File.Exists(ffprobePath))
                {
                    var psi = new ProcessStartInfo
                    {
                        FileName = ffprobePath,
                        Arguments = $"-v error -analyzeduration 1M -probesize 1M -threads 2 -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 \"{filePath.Replace('\\', '/')}\"",
                        RedirectStandardOutput = true,
                        RedirectStandardError = true,
                        UseShellExecute = false,
                        CreateNoWindow = true
                    };
                    using var proc = Process.Start(psi);
                    if (proc != null)
                    {
                        if (proc.WaitForExit(3000))
                        {
                            string output = proc.StandardOutput.ReadToEnd().Trim();
                            if (double.TryParse(output, NumberStyles.Any, CultureInfo.InvariantCulture, out double durSec) && durSec > 0.05)
                            {
                                return (long)Math.Round(durSec * 1000.0);
                            }
                        }
                        else
                        {
                            try { proc.Kill(); } catch { }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogDebug(ex, "[STORAGE SCANNER] Could not probe exact duration for '{Path}'.", filePath);
            }

            return fallbackDurationMs;
        }

        private static bool IsFileLocked(string filePath)
        {
            try
            {
                using var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.None);
                return false;
            }
            catch (IOException)
            {
                return true;
            }
            catch
            {
                return false;
            }
        }

        private static string? ResolveFfprobePath()
        {
            string binaryName = OperatingSystem.IsWindows() ? "ffprobe.exe" : "ffprobe";
            var baseDir = AppContext.BaseDirectory;
            string[] directCandidates = {
                Path.Combine(baseDir, "Features", "ExtractorAdvanced", binaryName),
                Path.Combine(baseDir, "Features", "Extractor", binaryName),
                Path.Combine(baseDir, "Features", "Extractor", "Tools", "Win", binaryName),
                Path.Combine(baseDir, "Tools", "Win", binaryName),
                Path.Combine(baseDir, binaryName),
                Path.Combine(baseDir, "..", "..", "..", "Tools", "Win", binaryName),
                Path.Combine(baseDir, "..", "..", "..", "..", "Features", "ExtractorAdvanced", "ITB-SCREEN-RECORDER.Features.ExtractorAdvanced", "Tools", "Win", binaryName),
                Path.Combine(baseDir, "..", "..", "..", "..", "Features", "Extractor", "ITB-SCREEN-RECORDER.Features.Extractor", "Tools", "Win", binaryName)
            };

            foreach (var path in directCandidates)
            {
                try
                {
                    var full = Path.GetFullPath(path);
                    if (File.Exists(full)) return full;
                }
                catch { }
            }

            return binaryName;
        }

        private void TriggerCatalogSelfHeal()
        {
            if (_selfHealTriggered) return;
            lock (_selfHealLock)
            {
                if (_selfHealTriggered) return;
                _selfHealTriggered = true;
            }

            _ = Task.Run(async () =>
            {
                try
                {
                    using var conn = OpenCatalogDbConnection();
                    const string querySql = @"
                        SELECT file_path AS FilePath, start_epoch_ms AS StartEpochMs, end_epoch_ms AS EndEpochMs, duration_ms AS DurationMs
                        FROM recording_chunks
                        WHERE duration_ms = 900000;";

                    var candidates = (await conn.QueryAsync<(string FilePath, long StartEpochMs, long EndEpochMs, long DurationMs)>(querySql)).ToList();
                    if (candidates.Count == 0) return;

                    var updates = new List<(string FilePath, long NewEndMs, long NewDurMs)>();

                    foreach (var item in candidates)
                    {
                        if (!File.Exists(item.FilePath)) continue;
                        var fi = new FileInfo(item.FilePath);
                        if (fi.Length < 70_000_000)
                        {
                            long realDurMs = GetAccurateChunkDurationMs(item.FilePath, DateTimeOffset.FromUnixTimeMilliseconds(item.StartEpochMs).UtcDateTime, 900000);
                            if (realDurMs > 0 && Math.Abs(realDurMs - item.DurationMs) > 5000)
                            {
                                updates.Add((item.FilePath, item.StartEpochMs + realDurMs, realDurMs));
                            }
                        }
                    }

                    if (updates.Count > 0)
                    {
                        using var tx = conn.BeginTransaction();
                        const string updateSql = @"
                            UPDATE recording_chunks
                            SET end_epoch_ms = @NewEndMs, duration_ms = @NewDurMs
                            WHERE file_path = @FilePath;";

                        foreach (var u in updates)
                        {
                            await conn.ExecuteAsync(updateSql, new { u.NewEndMs, u.NewDurMs, u.FilePath }, tx);
                        }
                        tx.Commit();
                        _logger.LogInformation("[STORAGE SCANNER] Self-healed {Count} chunks with accurate durations.", updates.Count);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogDebug(ex, "[STORAGE SCANNER] Catalog self-heal background task completed with non-fatal note.");
                }
            });
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
            var chunksToAdd = new List<(string StationId, string Path, long StartMs, long EndMs, long Size, bool IsFinalized)>();
            int intervalMinutes = Math.Max(1, _systemConfigMonitor.CurrentValue?.Storage?.ChunkIntervalMinutes ?? 15);
            long defaultDurationMs = intervalMinutes * 60 * 1000;

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
                            long startMs = new DateTimeOffset(parsed.StartUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();
                            long endMs = startMs + defaultDurationMs;

                            if (i + 1 < files.Count)
                            {
                                var nextParsed = TryParseChunkFast(files[i + 1], null);
                                if (nextParsed != null && string.Equals(nextParsed.Hostname, parsed.Hostname, StringComparison.OrdinalIgnoreCase))
                                {
                                    long nextStartMs = new DateTimeOffset(nextParsed.StartUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();
                                    if (nextStartMs > startMs && (nextStartMs - startMs) <= (30 * 60 * 1000))
                                    {
                                        endMs = nextStartMs;
                                    }
                                }
                            }

                            chunksToAdd.Add((parsed.Hostname, file, startMs, endMs, fi.Length, true));
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

        private async Task FlushChunksBatchAsync(List<(string StationId, string Path, long StartMs, long EndMs, long Size, bool IsFinalized)> items, CancellationToken ct = default)
        {
            if (items == null || items.Count == 0) return;

            using var conn = OpenCatalogDbConnection();
            using var tx = conn.BeginTransaction();
            const string sql = @"
                INSERT INTO recording_chunks (
                    station_id, file_path, start_epoch_ms, end_epoch_ms, 
                    duration_ms, file_size_bytes, width, height, fps, has_audio, is_finalized, indexed_at_utc,
                    display_id, is_primary
                ) VALUES (
                    @StationId, @Path, @StartMs, @EndMs, 
                    (@EndMs - @StartMs), @Size, 1920, 1080, 30, 1, @IsFinalized, @Now,
                    @DisplayId, @IsPrimary
                ) ON CONFLICT(file_path) DO UPDATE SET
                    station_id = excluded.station_id,
                    end_epoch_ms = excluded.end_epoch_ms,
                    duration_ms = (excluded.end_epoch_ms - recording_chunks.start_epoch_ms),
                    file_size_bytes = excluded.file_size_bytes,
                    is_finalized = excluded.is_finalized,
                    indexed_at_utc = excluded.indexed_at_utc,
                    display_id = excluded.display_id,
                    is_primary = excluded.is_primary;";

            long now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            foreach (var item in items)
            {
                string displayId = ExtractDisplayIdFromPath(item.Path);
                int isPrimary = displayId.Equals("mon-0", StringComparison.OrdinalIgnoreCase) ? 1 : 0;

                await conn.ExecuteAsync(new CommandDefinition(sql, new { 
                    item.StationId, 
                    item.Path, 
                    item.StartMs, 
                    item.EndMs, 
                    item.Size, 
                    IsFinalized = item.IsFinalized ? 1 : 0, 
                    Now = now,
                    DisplayId = displayId,
                    IsPrimary = isPrimary
                }, tx, cancellationToken: ct));
            }
            await tx.CommitAsync(ct);
        }

        private static string ExtractDisplayIdFromPath(string filePath)
        {
            try
            {
                var parent = Directory.GetParent(filePath);
                if (parent != null)
                {
                    if (parent.Name.StartsWith("mon-", StringComparison.OrdinalIgnoreCase) ||
                        parent.Name.StartsWith("display-", StringComparison.OrdinalIgnoreCase))
                    {
                        return parent.Name;
                    }
                }
            }
            catch { }
            return "mon-0";
        }

        private static void EnsureColumn(SqliteConnection conn, string tableName, string columnName, string columnDefinition)
        {
            try
            {
                using var cmd = conn.CreateCommand();
                cmd.CommandText = $"PRAGMA table_info({tableName});";
                using var reader = cmd.ExecuteReader();
                bool exists = false;
                while (reader.Read())
                {
                    if (string.Equals(reader.GetString(1), columnName, StringComparison.OrdinalIgnoreCase))
                    {
                        exists = true;
                        break;
                    }
                }
                reader.Close();

                if (!exists)
                {
                    using var alterCmd = conn.CreateCommand();
                    alterCmd.CommandText = $"ALTER TABLE {tableName} ADD COLUMN {columnName} {columnDefinition};";
                    alterCmd.ExecuteNonQuery();
                }
            }
            catch { }
        }

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
            string? host = inferredHost;

            if (string.IsNullOrWhiteSpace(host))
            {
                var parentDir = Directory.GetParent(filePath);
                if (parentDir != null)
                {
                    if (string.Equals(parentDir.Name, "live", StringComparison.OrdinalIgnoreCase) ||
                        string.Equals(parentDir.Name, "recordings", StringComparison.OrdinalIgnoreCase))
                    {
                        var grandParent = parentDir.Parent;
                        if (grandParent != null && !grandParent.Name.StartsWith("Screen", StringComparison.OrdinalIgnoreCase))
                        {
                            host = grandParent.Name;
                        }
                    }
                    else
                    {
                        host = parentDir.Name;
                    }
                }
            }

            // Direct Unix epoch timestamp pattern in milliseconds (13 digits)
            var matchEpochMs = Regex.Match(fileName, @"(?:^(?<host>[a-zA-Z0-9_\-\.]+?)[_-])?(?<epoch>\d{13})\.(mp4|fmp4|flv|mkv|ts|mov)$", RegexOptions.IgnoreCase);
            if (matchEpochMs.Success)
            {
                if (string.IsNullOrWhiteSpace(host) && matchEpochMs.Groups["host"].Success)
                {
                    host = matchEpochMs.Groups["host"].Value;
                }

                long ms = long.Parse(matchEpochMs.Groups["epoch"].Value);
                DateTime startUtc = DateTimeOffset.FromUnixTimeMilliseconds(ms).UtcDateTime;

                return new RecordingChunkMetadata
                {
                    FullPath = filePath,
                    Hostname = host ?? "Station",
                    StartUtc = startUtc,
                    EndUtc = startUtc.AddMinutes(15)
                };
            }

            var matchEpoch = EpochChunkRegex.Match(fileName);
            if (matchEpoch.Success)
            {
                if (string.IsNullOrWhiteSpace(host) && matchEpoch.Groups["host"].Success)
                {
                    host = matchEpoch.Groups["host"].Value;
                }

                long sec = long.Parse(matchEpoch.Groups["epoch"].Value);
                long msOffset = 0;
                if (matchEpoch.Groups["micro"].Success)
                {
                    string microStr = matchEpoch.Groups["micro"].Value;
                    if (microStr.Length >= 3)
                        msOffset = long.Parse(microStr.Substring(0, 3));
                    else
                        msOffset = long.Parse(microStr.PadRight(3, '0'));
                }
                DateTime startUtc = DateTimeOffset.FromUnixTimeMilliseconds(sec * 1000 + msOffset).UtcDateTime;

                return new RecordingChunkMetadata
                {
                    FullPath = filePath,
                    Hostname = host ?? "Station",
                    StartUtc = startUtc,
                    EndUtc = startUtc.AddMinutes(15)
                };
            }

            var match = UniversalChunkRegex.Match(fileName);
            if (match.Success)
            {
                if (string.IsNullOrWhiteSpace(host) && match.Groups["host"].Success)
                {
                    host = match.Groups["host"].Value;
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

            return null;
        }
    }
}