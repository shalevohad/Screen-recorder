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
            @"(?:^(?<host>[a-zA-Z0-9_\-\.]+?)[_-])?(?<epoch>\d{10})(?:[_\-\.](?<micro>\d{1,6}))?(?:[_\-\.][a-zA-Z0-9]+)?\.(mp4|fmp4|flv|mkv|ts|mov)$",
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
                            ON recording_chunks (station_id COLLATE NOCASE, start_epoch_ms, end_epoch_ms);";
                        cmd.ExecuteNonQuery();
                        _pragmaInitialized = true;
                    }
                }
            }

            TriggerCatalogSelfHeal();

            return conn;
        }

        public async Task<List<string>> GetAvailableHostsAsync(DateTime startUtc, DateTime endUtc)
        {
            long startMs = new DateTimeOffset(startUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();
            long endMs = new DateTimeOffset(endUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();

            var hostsSet = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

            try
            {
                using var conn = OpenCatalogDbConnection();
                const string sql = @"
                    SELECT DISTINCT station_id 
                    FROM recording_chunks 
                    WHERE end_epoch_ms >= @startMs AND start_epoch_ms <= @endMs
                    UNION
                    SELECT station_id FROM station_nodes;";

                var dbHosts = await conn.QueryAsync<string>(sql, new { startMs, endMs });
                foreach (var h in dbHosts.Where(s => !string.IsNullOrWhiteSpace(s)))
                {
                    hostsSet.Add(h);
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "[STORAGE SCANNER] Failed querying available hosts from DB.");
            }

            foreach (var root in ResolveActiveStorageRoots().Where(Directory.Exists))
            {
                try
                {
                    foreach (var dir in Directory.EnumerateDirectories(root))
                    {
                        string dirName = Path.GetFileName(dir);
                        if (string.Equals(dirName, "live", StringComparison.OrdinalIgnoreCase))
                        {
                            foreach (var sub in Directory.EnumerateDirectories(dir))
                            {
                                hostsSet.Add(Path.GetFileName(sub));
                            }
                        }
                        else if (!dirName.StartsWith(".") && !dirName.Equals("temp", StringComparison.OrdinalIgnoreCase))
                        {
                            hostsSet.Add(dirName);
                        }
                    }
                }
                catch { }
            }

            return hostsSet.OrderBy(h => h).ToList();
        }

        private static readonly System.Collections.Concurrent.ConcurrentDictionary<string, DateTime> _lastDiskScanTimes = new(StringComparer.OrdinalIgnoreCase);

        public async Task<List<RecordingChunkMetadata>> GetChunksForStationAsync(string hostname, DateTime startUtc, DateTime endUtc)
        {
            long startMs = new DateTimeOffset(startUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();
            long endMs = new DateTimeOffset(endUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();

            // 1. שליפה סופר-מהירה מה-DB עם תמיכה מלאה ב-COLLATE NOCASE (0ms - 1ms)
            var dbChunks = await QueryChunksFromDbAsync(hostname, startMs, endMs);
            var knownPaths = new HashSet<string>(dbChunks.Select(c => c.FullPath), StringComparer.OrdinalIgnoreCase);

            // 2. סריקה דינמית בדיסק לאיתור קבצים שטרם אונדקסו - מוגבלת בתדירות (Cooldown 30s) כדי למנוע צוואר בקבוק I/O
            bool hasRecentScan = _lastDiskScanTimes.TryGetValue(hostname, out var lastScan) && (DateTime.UtcNow - lastScan).TotalSeconds < 30;
            bool shouldScanDisk = dbChunks.Count == 0 || !hasRecentScan;

            if (shouldScanDisk)
            {
                _lastDiskScanTimes[hostname] = DateTime.UtcNow;
                var missingOnDisk = await ScanUnindexedFilesForStationAsync(hostname, startMs, endMs, knownPaths);

                if (missingOnDisk.Count > 0)
                {
                    _logger.LogInformation("[STORAGE SCANNER] Found {Count} unindexed file(s) on disk for '{Host}'. Auto-indexing immediately...",
                        missingOnDisk.Count, hostname);

                    await FlushChunksBatchAsync(missingOnDisk);
                    return await QueryChunksFromDbAsync(hostname, startMs, endMs);
                }
            }

            return dbChunks;
        }

        private async Task<List<RecordingChunkMetadata>> QueryChunksFromDbAsync(string hostname, long startMs, long endMs)
        {
            using var conn = OpenCatalogDbConnection();

            // 💡 שימוש ב-COLLATE NOCASE למניעת אי-התאמות בין אותיות קטנות לגדולות
            const string sql = @"
                SELECT file_path AS FullPath, station_id AS Hostname,
                       start_epoch_ms AS StartEpochMs, end_epoch_ms AS EndEpochMs,
                       file_size_bytes AS FileSizeBytes,
                       COALESCE(width, 1920) AS Width,
                       COALESCE(height, 1080) AS Height,
                       COALESCE(fps, 30) AS Fps,
                       COALESCE(has_audio, 1) AS HasAudio
                FROM recording_chunks
                WHERE station_id = @hostname COLLATE NOCASE
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

        private async Task<List<(string StationId, string Path, long StartMs, long EndMs, long Size)>> ScanUnindexedFilesForStationAsync(
            string hostname, long startMs, long endMs, HashSet<string> knownPaths)
        {
            var missing = new List<(string StationId, string Path, long StartMs, long EndMs, long Size)>();
            var roots = ResolveActiveStorageRoots().Where(Directory.Exists);

            int intervalMinutes = Math.Max(1, _systemConfigMonitor.CurrentValue?.Storage?.ChunkIntervalMinutes ?? 15);
            long defaultDurationMs = intervalMinutes * 60 * 1000;

            foreach (var root in roots)
            {
                // 💡 איתור תיקיית התחנה ללא תלות ב-Case Sensitivity (תואם לינוקס ווינדוס כאחד)
                string? targetDir = null;
                try
                {
                    targetDir = Directory.EnumerateDirectories(root)
                        .FirstOrDefault(d => string.Equals(Path.GetFileName(d), hostname, StringComparison.OrdinalIgnoreCase));

                    if (targetDir == null)
                    {
                        string liveDir = Path.Combine(root, "live");
                        if (Directory.Exists(liveDir))
                        {
                            targetDir = Directory.EnumerateDirectories(liveDir)
                                .FirstOrDefault(d => string.Equals(Path.GetFileName(d), hostname, StringComparison.OrdinalIgnoreCase));
                        }
                    }
                }
                catch { }

                if (targetDir == null) continue;

                var candidateFiles = Directory.EnumerateFiles(targetDir, "*.*", SearchOption.TopDirectoryOnly)
                    .Where(f => SupportedVideoExtensions.Contains(Path.GetExtension(f), StringComparer.OrdinalIgnoreCase) && !knownPaths.Contains(f))
                    .OrderBy(f => f)
                    .ToList();

                for (int i = 0; i < candidateFiles.Count; i++)
                {
                    string file = candidateFiles[i];
                    var parsed = TryParseChunkFast(file, hostname);
                    if (parsed != null)
                    {
                        long fStart = new DateTimeOffset(parsed.StartUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();
                        long fEnd = 0;

                        if (i + 1 < candidateFiles.Count)
                        {
                            var nextParsed = TryParseChunkFast(candidateFiles[i + 1], hostname);
                            if (nextParsed != null)
                            {
                                long nextStart = new DateTimeOffset(nextParsed.StartUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();
                                if (nextStart > fStart && (nextStart - fStart) <= (30 * 60 * 1000))
                                {
                                    // בדוק אם הקובץ עצמו הסתיים מוקדם יותר מאשר תחילת הקובץ הבא (למשל אם יש פער)
                                    long accurateMs = GetAccurateChunkDurationMs(file, parsed.StartUtc, nextStart - fStart);
                                    fEnd = fStart + accurateMs;
                                }
                            }
                        }

                        if (fEnd <= 0)
                        {
                            // קובץ אחרון ברצף או שאין קובץ עוקב בטווח 30 דקות - חובה לדגום משך מדויק כדי לא ליצור מקטע רפאים!
                            long accurateMs = GetAccurateChunkDurationMs(file, parsed.StartUtc, defaultDurationMs);
                            fEnd = fStart + accurateMs;
                        }

                        if (fEnd >= startMs && fStart <= endMs)
                        {
                            var fi = new FileInfo(file);
                            if (fi.Exists && fi.Length >= 1024)
                            {
                                missing.Add((hostname, file, fStart, fEnd, fi.Length));
                            }
                        }
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

                // קבצים שנכתבים ברגע זה ממש (פעילים)
                if (fi.LastWriteTimeUtc > DateTime.UtcNow.AddMinutes(-2))
                {
                    return fallbackDurationMs;
                }

                string? ffprobePath = ResolveFfprobePath();
                if (!string.IsNullOrWhiteSpace(ffprobePath) && File.Exists(ffprobePath))
                {
                    var psi = new ProcessStartInfo
                    {
                        FileName = ffprobePath,
                        Arguments = $"-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 \"{filePath.Replace('\\', '/')}\"",
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

                // Fallback לפי שעת סגירת הקובץ בדיסק (LastWriteTimeUtc)
                if (fi.LastWriteTimeUtc > startUtc)
                {
                    long diffMs = (long)(fi.LastWriteTimeUtc - startUtc).TotalMilliseconds;
                    if (diffMs > 500 && diffMs < fallbackDurationMs)
                    {
                        return diffMs;
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogDebug(ex, "[STORAGE SCANNER] Could not probe exact duration for '{Path}'.", filePath);
            }

            return fallbackDurationMs;
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
            var chunksToAdd = new List<(string StationId, string Path, long StartMs, long EndMs, long Size)>();
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
            if (items == null || items.Count == 0) return;

            using var conn = OpenCatalogDbConnection();
            using var tx = conn.BeginTransaction();
            const string sql = @"
                INSERT INTO recording_chunks (
                    station_id, file_path, start_epoch_ms, end_epoch_ms, 
                    duration_ms, file_size_bytes, width, height, fps, has_audio, is_finalized, indexed_at_utc
                ) VALUES (
                    @StationId, @Path, @StartMs, @EndMs, 
                    (@EndMs - @StartMs), @Size, 1920, 1080, 30, 1, 1, @Now
                ) ON CONFLICT(file_path) DO UPDATE SET
                    end_epoch_ms = excluded.end_epoch_ms,
                    duration_ms = (excluded.end_epoch_ms - recording_chunks.start_epoch_ms),
                    file_size_bytes = excluded.file_size_bytes,
                    is_finalized = 1;";

            long now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            foreach (var item in items)
            {
                await conn.ExecuteAsync(new CommandDefinition(sql, new { item.StationId, item.Path, item.StartMs, item.EndMs, item.Size, Now = now }, tx, cancellationToken: ct));
            }
            await tx.CommitAsync(ct);
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

            // בדיקת תבנית Epoch ישירה במילישניות (13 ספרות)
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
                long micro = matchEpoch.Groups["micro"].Success ? long.Parse(matchEpoch.Groups["micro"].Value) : 0;
                DateTime startUtc = DateTimeOffset.FromUnixTimeMilliseconds(sec * 1000 + (micro / 1000)).UtcDateTime;

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