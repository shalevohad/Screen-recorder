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
using System.Threading.Tasks;
using Microsoft.Data.Sqlite;
using Dapper;
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
        private readonly StorageSettings _storageSettings;
        private readonly ExtractorOptions _options;
        private readonly ILogger<StorageScannerService> _logger;
        private readonly IDummyVideoGenerator _dummyGenerator;
        private readonly TimeZoneInfo _serverLocalTz;

        private static readonly string[] SupportedVideoExtensions = new[] { ".mp4", ".fmp4", ".flv", ".mkv", ".ts", ".mov" };

        // תבנית גמישה המזהה שמות קבצים עם/בלי שם תחנה, עם מקפים או בפורמט קומפקטי (כולל הקלטות חיצוניות)
        private static readonly Regex UniversalChunkRegex = new(
            @"(?:^(?<host>[a-zA-Z0-9_\-\.]+?)[_-])?(?<year>20\d{2})[-_]?(?<month>\d{2})[-_]?(?<day>\d{2})[-_T](?<hour>\d{2})[-_:]?(?<minute>\d{2})[-_:]?(?<sec>\d{2})(?:[_\-\.]\d+)?(?<utc>Z)?\.(mp4|fmp4|flv|mkv|ts|mov)$",
            RegexOptions.Compiled | RegexOptions.IgnoreCase);

        private static readonly Regex IsoUtcCompactRegex = new(
            @"^(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})_(?<hour>\d{2})(?<minute>\d{2})(?<sec>\d{2})(?:_\d+)?(?<utc>Z)?\.(mp4|fmp4|flv|mkv|ts|mov)$",
            RegexOptions.Compiled | RegexOptions.IgnoreCase);

        private static readonly Regex HyphenatedRegex = new(
            @"^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})_(?<hour>\d{2})-(?<minute>\d{2})-(?<sec>\d{2})(?:-\d+)?(?<utc>Z)?\.(mp4|fmp4|flv|mkv|ts|mov)$",
            RegexOptions.Compiled | RegexOptions.IgnoreCase);

        private static readonly Regex LegacyHostPrefixRegex = new(
            @"^(?<host>.+?)_(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})_(?<hour>\d{2})(?<minute>\d{2})(?<sec>\d{2})(?<utc>Z)?\.(mp4|fmp4|flv|mkv|ts|mov)$",
            RegexOptions.Compiled | RegexOptions.IgnoreCase);

        public StorageScannerService(
            IConfiguration configuration,
            IOptions<SystemConfig> systemConfig,
            IOptions<ExtractorOptions> options,
            ILogger<StorageScannerService> logger,
            IDummyVideoGenerator dummyGenerator)
        {
            _configuration = configuration;
            _options = options.Value;
            _logger = logger;
            _dummyGenerator = dummyGenerator;

            string netAppPath = systemConfig.Value?.Storage?.NetAppUncPath;
            if (string.IsNullOrWhiteSpace(netAppPath))
            {
                netAppPath = configuration["SystemConfig:Storage:NetAppUncPath"] ?? @"\\NetAppStorage\CaptureRecordings";
            }

            string fallbackPath = systemConfig.Value?.Storage?.LocalFallbackPath;
            if (string.IsNullOrWhiteSpace(fallbackPath))
            {
                fallbackPath = configuration["SystemConfig:Storage:LocalFallbackPath"] ?? @"C:\ProgramData\ITB-SCREEN-RECORDER\Recordings";
            }

            _storageSettings = new StorageSettings
            {
                NetAppUncPath = netAppPath,
                LocalFallbackPath = fallbackPath
            };

            string configuredTz = systemConfig.Value?.DisplayTimezone;
            try
            {
                _serverLocalTz = !string.IsNullOrWhiteSpace(configuredTz)
                    ? TimeZoneInfo.FindSystemTimeZoneById(configuredTz)
                    : TimeZoneInfo.Local;
            }
            catch
            {
                _serverLocalTz = TimeZoneInfo.Local;
            }

            _logger.LogInformation("[STORAGE SCANNER:INIT] Configured Storage Paths: NetApp='{NetApp}', Fallback='{Fallback}', TimeZone='{Tz}'",
                _storageSettings.NetAppUncPath, _storageSettings.LocalFallbackPath, _serverLocalTz.Id);
        }

        private SqliteConnection? OpenCatalogDbConnection()
        {
            try
            {
                string baseDir = _configuration["Database:BaseDirectory"]
                    ?? Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData), "ITB-SCREEN-RECORDER", "Data");
                string dbPath = Path.Combine(baseDir, "system_catalog.db");

                if (!File.Exists(dbPath))
                {
                    _logger.LogDebug("[STORAGE SCANNER:DB] system_catalog.db not found at '{Path}'", dbPath);
                    return null;
                }

                var csb = new SqliteConnectionStringBuilder
                {
                    DataSource = dbPath,
                    Mode = SqliteOpenMode.ReadOnly,
                    DefaultTimeout = 3
                };

                var conn = new SqliteConnection(csb.ConnectionString);
                conn.Open();
                return conn;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "[STORAGE SCANNER:DB] Could not open system_catalog.db in ReadOnly mode.");
                return null;
            }
        }

        public async Task<List<string>> GetAvailableHostsAsync(DateTime startUtc, DateTime endUtc)
        {
            _logger.LogInformation("================================================================================");
            _logger.LogInformation("[STORAGE SCANNER] Starting Host Discovery. Window: [{Start} -> {End}]",
                startUtc.ToString("yyyy-MM-dd HH:mm:ss UTC"), endUtc.ToString("yyyy-MM-dd HH:mm:ss UTC"));

            var hosts = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

            // 1. שאילתות מסד הנתונים: תחנות עם הקלטות בטווח וכל התחנות הרשומות
            using (var conn = OpenCatalogDbConnection())
            {
                if (conn != null)
                {
                    try
                    {
                        long startMs = new DateTimeOffset(startUtc).ToUnixTimeMilliseconds();
                        long endMs = new DateTimeOffset(endUtc).ToUnixTimeMilliseconds();

                        const string chunksSql = @"
                            SELECT DISTINCT station_id 
                            FROM recording_chunks 
                            WHERE end_epoch_ms >= @startMs AND start_epoch_ms <= @endMs;";

                        var dbStations = (await conn.QueryAsync<string>(chunksSql, new { startMs, endMs })).ToList();
                        foreach (var s in dbStations)
                        {
                            if (!string.IsNullOrWhiteSpace(s)) hosts.Add(s);
                        }

                        const string nodesSql = "SELECT station_id FROM station_nodes;";
                        var nodeStations = (await conn.QueryAsync<string>(nodesSql)).ToList();
                        foreach (var s in nodeStations)
                        {
                            if (!string.IsNullOrWhiteSpace(s)) hosts.Add(s);
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "[STORAGE SCANNER:DB] Exception occurred querying system_catalog.db");
                    }
                }
            }

            // 2. סריקה פיזית של מערכת הקבצים (NetApp / מקומי) - מגלה תחנות חיצוניות והיסטוריות
            var roots = ResolveActiveStorageRoots().ToList();
            foreach (var root in roots)
            {
                if (!Directory.Exists(root)) continue;

                try
                {
                    // א. סריקת תיקיית live
                    string liveDir = Path.Combine(root, "live");
                    if (Directory.Exists(liveDir))
                    {
                        var liveStationDirs = Directory.EnumerateDirectories(liveDir, "*", SearchOption.TopDirectoryOnly);
                        foreach (var stationDir in liveStationDirs)
                        {
                            string hostName = Path.GetFileName(stationDir);
                            if (string.IsNullOrWhiteSpace(hostName) || hosts.Contains(hostName)) continue;

                            if (HasValidRecordingsInRange(stationDir, hostName, startUtc, endUtc))
                            {
                                _logger.LogInformation("[STORAGE SCANNER:FS] Discovered station in live: '{Host}'", hostName);
                                hosts.Add(hostName);
                            }
                        }
                    }

                    // ב. סריקת תיקיות תחנה בשורש האחסון
                    var rootDirs = Directory.EnumerateDirectories(root, "*", SearchOption.TopDirectoryOnly);
                    foreach (var stationDir in rootDirs)
                    {
                        string hostName = Path.GetFileName(stationDir);
                        if (string.IsNullOrWhiteSpace(hostName) || IsReservedDirectoryName(hostName)) continue;
                        if (hosts.Contains(hostName)) continue;

                        if (HasValidRecordingsInRange(stationDir, hostName, startUtc, endUtc))
                        {
                            _logger.LogInformation("[STORAGE SCANNER:FS] Discovered external/offline station in root: '{Host}'", hostName);
                            hosts.Add(hostName);
                        }
                    }

                    // ג. איתור קבצי Legacy ישירות בשורש
                    var rootFiles = Directory.EnumerateFiles(root, "*.*", SearchOption.TopDirectoryOnly);
                    foreach (var file in rootFiles)
                    {
                        string ext = Path.GetExtension(file);
                        if (!SupportedVideoExtensions.Contains(ext, StringComparer.OrdinalIgnoreCase)) continue;

                        var parsed = TryParseChunkFast(file, null);
                        if (parsed != null && parsed.StartUtc <= endUtc && parsed.StartUtc.AddMinutes(15) >= startUtc)
                        {
                            if (!string.IsNullOrWhiteSpace(parsed.Hostname))
                            {
                                hosts.Add(parsed.Hostname);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "[STORAGE SCANNER:FS] Error scanning storage root '{Root}'", root);
                }
            }

            var resultList = hosts.OrderBy(h => h).ToList();
            _logger.LogInformation("[STORAGE SCANNER] Host Discovery Complete. Discovered {Count} unique stations: [{List}]",
                resultList.Count, string.Join(", ", resultList));
            _logger.LogInformation("================================================================================");

            return resultList;
        }

        public async Task<List<RecordingChunkMetadata>> GetChunksForStationAsync(string hostname, DateTime startUtc, DateTime endUtc)
        {
            _logger.LogInformation("[STORAGE SCANNER:CHUNKS] Fetching chunks for host '{Host}' between {Start} and {End}",
                hostname, startUtc.ToString("yyyy-MM-dd HH:mm:ss UTC"), endUtc.ToString("yyyy-MM-dd HH:mm:ss UTC"));

            var chunks = new List<RecordingChunkMetadata>();
            var indexedPaths = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

            // 1. שליפה מ-system_catalog.db
            using (var conn = OpenCatalogDbConnection())
            {
                if (conn != null)
                {
                    try
                    {
                        long startMs = new DateTimeOffset(startUtc).ToUnixTimeMilliseconds();
                        long endMs = new DateTimeOffset(endUtc).ToUnixTimeMilliseconds();

                        const string sql = @"
                            SELECT file_path AS FullPath, station_id AS Hostname,
                                   start_epoch_ms AS StartEpochMs, end_epoch_ms AS EndEpochMs,
                                   file_size_bytes AS FileSizeBytes
                            FROM recording_chunks
                            WHERE station_id = @hostname
                              AND end_epoch_ms >= @startMs
                              AND start_epoch_ms <= @endMs
                            ORDER BY start_epoch_ms ASC;";

                        var dbChunks = await conn.QueryAsync(sql, new { hostname, startMs, endMs });
                        int dbCount = 0;
                        foreach (var row in dbChunks)
                        {
                            string filePath = (string)row.FullPath;
                            if (File.Exists(filePath))
                            {
                                indexedPaths.Add(filePath);
                                chunks.Add(new RecordingChunkMetadata
                                {
                                    FullPath = filePath,
                                    Hostname = (string)row.Hostname,
                                    StartUtc = DateTimeOffset.FromUnixTimeMilliseconds((long)row.StartEpochMs).UtcDateTime,
                                    EndUtc = DateTimeOffset.FromUnixTimeMilliseconds((long)row.EndEpochMs).UtcDateTime,
                                    FileSizeBytes = (long)row.FileSizeBytes
                                });
                                dbCount++;
                            }
                        }
                        _logger.LogInformation("[STORAGE SCANNER:CHUNKS] Loaded {Count} verified chunks from system_catalog.db for '{Host}'", dbCount, hostname);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "[STORAGE SCANNER:CHUNKS] Failed querying DB chunks for '{Host}'", hostname);
                    }
                }
            }

            // 2. השלמה מהירה מתוך מערכת הקבצים
            var roots = ResolveActiveStorageRoots();
            int fsFoundCount = 0;

            foreach (var root in roots)
            {
                if (!Directory.Exists(root)) continue;

                try
                {
                    var targetDirs = new List<string>
                    {
                        Path.Combine(root, "live", hostname),
                        Path.Combine(root, hostname)
                    };

                    foreach (var targetDir in targetDirs)
                    {
                        if (Directory.Exists(targetDir))
                        {
                            var files = Directory.EnumerateFiles(targetDir, "*.*", SearchOption.AllDirectories);
                            foreach (var file in files)
                            {
                                if (indexedPaths.Contains(file)) continue;

                                string ext = Path.GetExtension(file);
                                if (!SupportedVideoExtensions.Contains(ext, StringComparer.OrdinalIgnoreCase)) continue;

                                // בדיקת זמנים מהירה משם הקובץ בלבד לפני שנוגעים בדיסק
                                var fastChunk = TryParseChunkFast(file, hostname);
                                if (fastChunk == null) continue;

                                // דילוג מיידי על קבצים שמחוץ לטווח כדי לא לקרוא Headers מיותרים מעל ה-NetApp
                                if (fastChunk.StartUtc > endUtc || fastChunk.StartUtc.AddHours(2) < startUtc)
                                {
                                    continue;
                                }

                                var chunk = ResolveChunkWithFileInfo(file, fastChunk.StartUtc, hostname);
                                if (chunk != null && chunk.EndUtc >= startUtc && chunk.StartUtc <= endUtc)
                                {
                                    indexedPaths.Add(file);
                                    chunks.Add(chunk);
                                    fsFoundCount++;
                                }
                            }
                        }
                    }

                    // קבצי Legacy ישירות בשורש
                    var legacyFiles = Directory.EnumerateFiles(root, $"{hostname}_*.*", SearchOption.TopDirectoryOnly);
                    foreach (var file in legacyFiles)
                    {
                        if (indexedPaths.Contains(file)) continue;

                        string ext = Path.GetExtension(file);
                        if (!SupportedVideoExtensions.Contains(ext, StringComparer.OrdinalIgnoreCase)) continue;

                        var fastChunk = TryParseChunkFast(file, hostname);
                        if (fastChunk == null) continue;

                        if (fastChunk.StartUtc > endUtc || fastChunk.StartUtc.AddHours(2) < startUtc) continue;

                        var chunk = ResolveChunkWithFileInfo(file, fastChunk.StartUtc, hostname);
                        if (chunk != null && chunk.EndUtc >= startUtc && chunk.StartUtc <= endUtc)
                        {
                            indexedPaths.Add(file);
                            chunks.Add(chunk);
                            fsFoundCount++;
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "[STORAGE SCANNER:CHUNKS] Failed reading filesystem chunks for '{Host}' in '{Root}'", hostname, root);
                }
            }

            if (fsFoundCount > 0)
            {
                _logger.LogInformation("[STORAGE SCANNER:CHUNKS] Supplemented {Count} external/unindexed files from filesystem for '{Host}'", fsFoundCount, hostname);
            }

            var sortedUniqueChunks = chunks
                .GroupBy(c => c.FullPath, StringComparer.OrdinalIgnoreCase)
                .Select(g => g.First())
                .OrderBy(c => c.StartUtc)
                .ToList();

            _logger.LogInformation("[STORAGE SCANNER:CHUNKS] Total valid chunks returned for '{Host}': {Count}", sortedUniqueChunks.Count, hostname);
            return sortedUniqueChunks;
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

        private bool HasValidRecordingsInRange(string dirPath, string hostName, DateTime startUtc, DateTime endUtc)
        {
            try
            {
                var files = Directory.EnumerateFiles(dirPath, "*.*", SearchOption.AllDirectories);
                foreach (var file in files)
                {
                    string ext = Path.GetExtension(file);
                    if (!SupportedVideoExtensions.Contains(ext, StringComparer.OrdinalIgnoreCase)) continue;

                    // פענוח מהיר של שם הקובץ ללא קריאת כותרי וידאו מהאחסון
                    var parsed = TryParseChunkFast(file, hostName);
                    if (parsed != null)
                    {
                        if (parsed.StartUtc <= endUtc && parsed.StartUtc.AddMinutes(15) >= startUtc)
                        {
                            return true;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogDebug(ex, "[STORAGE SCANNER:FS] Cannot read directory '{Dir}'", dirPath);
            }
            return false;
        }

        private static bool IsReservedDirectoryName(string dirName)
        {
            return string.Equals(dirName, "live", StringComparison.OrdinalIgnoreCase) ||
                   string.Equals(dirName, "RecordingsBuffer", StringComparison.OrdinalIgnoreCase) ||
                   string.Equals(dirName, "Buffer", StringComparison.OrdinalIgnoreCase) ||
                   string.Equals(dirName, "Logs", StringComparison.OrdinalIgnoreCase) ||
                   string.Equals(dirName, "Export", StringComparison.OrdinalIgnoreCase) ||
                   string.Equals(dirName, "Exports", StringComparison.OrdinalIgnoreCase) ||
                   string.Equals(dirName, "Temp", StringComparison.OrdinalIgnoreCase);
        }

        private IEnumerable<string> ResolveActiveStorageRoots()
        {
            var roots = new List<string>();
            if (!string.IsNullOrWhiteSpace(_storageSettings.NetAppUncPath) && Directory.Exists(_storageSettings.NetAppUncPath))
            {
                roots.Add(_storageSettings.NetAppUncPath);
            }
            if (!string.IsNullOrWhiteSpace(_storageSettings.LocalFallbackPath) && Directory.Exists(_storageSettings.LocalFallbackPath))
            {
                roots.Add(_storageSettings.LocalFallbackPath);
            }
            return roots;
        }

        private RecordingChunkMetadata? TryParseChunkFast(string filePath, string? inferredHost)
        {
            string fileName = Path.GetFileName(filePath);
            DateTime startUtc;
            string host = inferredHost ?? string.Empty;

            var match = UniversalChunkRegex.Match(fileName);
            if (!match.Success)
            {
                match = IsoUtcCompactRegex.Match(fileName);
                if (!match.Success) match = HyphenatedRegex.Match(fileName);
                if (!match.Success) match = LegacyHostPrefixRegex.Match(fileName);
            }

            if (match.Success)
            {
                if (string.IsNullOrWhiteSpace(host) && match.Groups["host"].Success)
                {
                    host = match.Groups["host"].Value;
                }

                int year = int.Parse(match.Groups["year"].Value);
                int month = int.Parse(match.Groups["month"].Value);
                int day = int.Parse(match.Groups["day"].Value);
                int hour = int.Parse(match.Groups["hour"].Value);
                int minute = int.Parse(match.Groups["minute"].Value);
                int second = int.Parse(match.Groups["sec"].Value);

                bool isExplicitUtc = match.Groups["utc"].Success;
                if (isExplicitUtc)
                {
                    startUtc = new DateTime(year, month, day, hour, minute, second, DateTimeKind.Utc);
                }
                else
                {
                    var localTime = new DateTime(year, month, day, hour, minute, second, DateTimeKind.Unspecified);
                    startUtc = TimeZoneInfo.ConvertTimeToUtc(localTime, _serverLocalTz);
                }
            }
            else
            {
                return null;
            }

            if (string.IsNullOrWhiteSpace(host))
            {
                var parentDir = Directory.GetParent(filePath);
                if (parentDir != null && !string.Equals(parentDir.Name, "live", StringComparison.OrdinalIgnoreCase))
                {
                    host = parentDir.Name;
                }
            }

            if (string.IsNullOrWhiteSpace(host)) return null;

            return new RecordingChunkMetadata
            {
                FullPath = filePath,
                Hostname = host,
                StartUtc = startUtc,
                EndUtc = startUtc.AddSeconds(60),
                FileSizeBytes = 0
            };
        }

        private RecordingChunkMetadata? ResolveChunkWithFileInfo(string filePath, DateTime startUtc, string hostname)
        {
            try
            {
                var fi = new FileInfo(filePath);
                if (!fi.Exists || fi.Length < 1024) return null;

                DateTime endUtc = startUtc;
                var headerDuration = Mp4HeaderInspector.ExtractDuration(filePath);
                if (headerDuration.HasValue && headerDuration.Value.TotalSeconds > 1)
                {
                    endUtc = startUtc + headerDuration.Value;
                }
                else
                {
                    DateTime fileWriteUtc = fi.LastWriteTimeUtc;
                    endUtc = fileWriteUtc > startUtc.AddSeconds(1) ? fileWriteUtc : startUtc.AddSeconds(60);
                }

                return new RecordingChunkMetadata
                {
                    FullPath = filePath,
                    Hostname = hostname,
                    StartUtc = startUtc,
                    EndUtc = endUtc,
                    FileSizeBytes = fi.Length
                };
            }
            catch
            {
                return null;
            }
        }
    }
}