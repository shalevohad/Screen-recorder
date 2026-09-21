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
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Core.Configuration;

namespace ITB_SCREEN_RECORDER.Features.Extractor.Services
{
    public class StorageScannerService : IStorageScannerService
    {
        private readonly StorageSettings _storageSettings;
        private readonly ExtractorOptions _options;
        private readonly ILogger<StorageScannerService> _logger;
        private readonly IDummyVideoGenerator _dummyGenerator;

        // תבנית 1: שמות קבצים בפורמט קומפקטי עם UTC Z (למשל: 20260920_032041_117698Z.mp4)
        private static readonly Regex IsoUtcCompactRegex = new(
            @"^(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})_(?<hour>\d{2})(?<minute>\d{2})(?<sec>\d{2})(?:_\d+)?Z?\.(mp4|flv)$",
            RegexOptions.Compiled | RegexOptions.IgnoreCase);

        // תבנית 2: שמות קבצים עם מקפים (למשל: 2026-09-20_01-18-07-292918.mp4)
        private static readonly Regex HyphenatedRegex = new(
            @"^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})_(?<hour>\d{2})-(?<minute>\d{2})-(?<sec>\d{2})(?:-\d+)?\.(mp4|flv)$",
            RegexOptions.Compiled | RegexOptions.IgnoreCase);

        // תבנית 3: שמות קבצים הכוללים את שם התחנה כקידומת (Host_YYYYMMDD_HHMMSS.mp4)
        private static readonly Regex LegacyHostPrefixRegex = new(
            @"^(?<host>.+?)_(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})_(?<hour>\d{2})(?<minute>\d{2})(?<sec>\d{2})\.(mp4|flv)$",
            RegexOptions.Compiled | RegexOptions.IgnoreCase);

        public StorageScannerService(
            IConfiguration configuration,
            IOptions<SystemConfig> systemConfig,
            IOptions<ExtractorOptions> options,
            ILogger<StorageScannerService> logger,
            IDummyVideoGenerator dummyGenerator)
        {
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
                    // 1. סריקה מהירה וממוקדת של תיקיית live (רמה עליונה בלבד - TopDirectoryOnly)
                    string liveDir = Path.Combine(root, "live");
                    if (Directory.Exists(liveDir))
                    {
                        foreach (var stationDir in Directory.EnumerateDirectories(liveDir, "*", SearchOption.TopDirectoryOnly))
                        {
                            string hostName = Path.GetFileName(stationDir);
                            if (HasValidRecordingsInRange(stationDir, hostName, startUtc, endUtc))
                            {
                                hosts.Add(hostName);
                            }
                        }
                    }

                    // 2. בדיקת תת-תיקיות תחנה ישירות תחת ה-Root (ללא כניסה לתיקיות מערכת)
                    foreach (var stationDir in Directory.EnumerateDirectories(root, "*", SearchOption.TopDirectoryOnly))
                    {
                        string hostName = Path.GetFileName(stationDir);
                        if (string.Equals(hostName, "live", StringComparison.OrdinalIgnoreCase) ||
                            string.Equals(hostName, "RecordingsBuffer", StringComparison.OrdinalIgnoreCase) ||
                            string.Equals(hostName, "Buffer", StringComparison.OrdinalIgnoreCase) ||
                            string.Equals(hostName, "Logs", StringComparison.OrdinalIgnoreCase))
                        {
                            continue;
                        }

                        if (HasValidRecordingsInRange(stationDir, hostName, startUtc, endUtc))
                        {
                            hosts.Add(hostName);
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Failed fast scanning storage root {Root}", root);
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
                    var targetDirs = new List<string>
                    {
                        Path.Combine(root, "live", hostname),
                        Path.Combine(root, hostname)
                    };

                    // איתור קבצים בתיקיות התחנה הספציפיות
                    foreach (var targetDir in targetDirs)
                    {
                        if (Directory.Exists(targetDir))
                        {
                            var files = Directory.EnumerateFiles(targetDir, "*.mp4", SearchOption.AllDirectories);
                            foreach (var file in files)
                            {
                                var parsed = TryParseChunk(file, hostname);
                                if (parsed != null && parsed.EndUtc >= startUtc && parsed.StartUtc <= endUtc)
                                {
                                    chunks.Add(parsed);
                                }
                            }
                        }
                    }

                    // תמיכה לאחור בקבצים בודדים תחת ה-Root עם קידומת התחנה
                    var legacyFiles = Directory.EnumerateFiles(root, $"{hostname}_*.mp4", SearchOption.TopDirectoryOnly);
                    foreach (var file in legacyFiles)
                    {
                        var parsed = TryParseChunk(file, hostname);
                        if (parsed != null && parsed.EndUtc >= startUtc && parsed.StartUtc <= endUtc)
                        {
                            chunks.Add(parsed);
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Failed reading station chunks from {Root} for {Host}", root, hostname);
                }
            }

            // מיון וניקוי כפילויות
            var sortedUniqueChunks = chunks
                .GroupBy(c => c.FullPath)
                .Select(g => g.First())
                .OrderBy(c => c.StartUtc)
                .ToList();

            // תיקון סטיית הזמנים: עדכון EndUtc לפי תחילת המקטע הבא במקום ברירת מחדל של 10 דקות
            for (int i = 0; i < sortedUniqueChunks.Count; i++)
            {
                if (i < sortedUniqueChunks.Count - 1)
                {
                    var nextChunk = sortedUniqueChunks[i + 1];
                    var diff = nextChunk.StartUtc - sortedUniqueChunks[i].StartUtc;

                    // אם המרחק עד המקטע הבא תקין ורציף (עד 15 דקות), סוף המקטע הנוכחי הוא תחילת המקטע הבא
                    if (diff > TimeSpan.Zero && diff <= TimeSpan.FromMinutes(15))
                    {
                        sortedUniqueChunks[i].EndUtc = nextChunk.StartUtc;
                    }
                }
            }

            return Task.FromResult(sortedUniqueChunks);
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

                // טיפול בפערי זמן (Gaps) בין מקטעים: הזרקת וידאו NO SIGNAL
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

                // חיתוך נקודת התחלה אם המקטע מתחיל לפני החלון המבוקש
                if (chunk.StartUtc < rangeStartUtc)
                {
                    double inPoint = (rangeStartUtc - chunk.StartUtc).TotalSeconds;
                    sb.AppendLine(string.Format(CultureInfo.InvariantCulture, "inpoint {0:F3}", inPoint));
                }

                // חיתוך נקודת סיום אם המקטע מסתיים אחרי החלון המבוקש
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

            // השלמת פער סיום אם טווח החלון המבוקש ארוך מסיום ההקלטה האחרונה
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
                var files = Directory.EnumerateFiles(dirPath, "*.mp4", SearchOption.TopDirectoryOnly);
                foreach (var file in files)
                {
                    var parsed = TryParseChunk(file, hostName);
                    if (parsed != null && parsed.EndUtc >= startUtc && parsed.StartUtc <= endUtc)
                    {
                        return true;
                    }
                }
            }
            catch { }
            return false;
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

        private RecordingChunkMetadata? TryParseChunk(string filePath, string? inferredHost)
        {
            string fileName = Path.GetFileName(filePath);
            DateTime startUtc;
            string host = inferredHost ?? string.Empty;

            // בדיקת תבנית 1: פורמט קומפקטי עם Z (למשל 20260920_032041_117698Z.mp4)
            var match = IsoUtcCompactRegex.Match(fileName);
            if (match.Success)
            {
                int year = int.Parse(match.Groups["year"].Value);
                int month = int.Parse(match.Groups["month"].Value);
                int day = int.Parse(match.Groups["day"].Value);
                int hour = int.Parse(match.Groups["hour"].Value);
                int minute = int.Parse(match.Groups["minute"].Value);
                int second = int.Parse(match.Groups["sec"].Value);

                startUtc = new DateTime(year, month, day, hour, minute, second, DateTimeKind.Utc);
            }
            else
            {
                // בדיקת תבנית 2: פורמט עם מקפים (למשל 2026-09-20_01-18-07-292918.mp4)
                match = HyphenatedRegex.Match(fileName);
                if (match.Success)
                {
                    int year = int.Parse(match.Groups["year"].Value);
                    int month = int.Parse(match.Groups["month"].Value);
                    int day = int.Parse(match.Groups["day"].Value);
                    int hour = int.Parse(match.Groups["hour"].Value);
                    int minute = int.Parse(match.Groups["minute"].Value);
                    int second = int.Parse(match.Groups["sec"].Value);

                    startUtc = new DateTime(year, month, day, hour, minute, second, DateTimeKind.Utc);
                }
                else
                {
                    // בדיקת תבנית 3: שם התחנה בתחילת הקובץ (Host_20260920_...)
                    match = LegacyHostPrefixRegex.Match(fileName);
                    if (!match.Success) return null;

                    host = match.Groups["host"].Value;
                    int year = int.Parse(match.Groups["year"].Value);
                    int month = int.Parse(match.Groups["month"].Value);
                    int day = int.Parse(match.Groups["day"].Value);
                    int hour = int.Parse(match.Groups["hour"].Value);
                    int minute = int.Parse(match.Groups["minute"].Value);
                    int second = int.Parse(match.Groups["sec"].Value);

                    startUtc = new DateTime(year, month, day, hour, minute, second, DateTimeKind.Utc);
                }
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

            try
            {
                var fi = new FileInfo(filePath);
                // ברירת מחדל התחלתית המותאמת בהמשך ב-GetChunksForStationAsync
                var endUtc = startUtc.AddMinutes(10);

                return new RecordingChunkMetadata
                {
                    FullPath = filePath,
                    Hostname = host,
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