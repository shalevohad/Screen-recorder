// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Services/CatalogMaintenanceService.cs
// ==========================================
namespace ITB_SCREEN_RECORDER.Server.Services;

using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Server.Data;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

public record MaintenanceJobState(
    string JobId,
    string JobType,
    bool IsRunning,
    int ProgressPercent,
    int TotalFilesScanned,
    int NewlyIndexedCount,
    int SkippedCount,
    int ErrorsCount,
    string CurrentTarget,
    string StatusMessage,
    DateTime? StartedAtUtc,
    DateTime? CompletedAtUtc
);

public interface ICatalogMaintenanceService
{
    MaintenanceJobState GetCurrentJobState();
    Task<MaintenanceJobState> TriggerReindexAsync(bool forceFullRecheck = false);
    Task<MaintenanceJobState> TriggerRepairCatalogAsync();
    Task<object> GetCatalogStatsAsync();
}

public class CatalogMaintenanceService : BackgroundService, ICatalogMaintenanceService
{
    private readonly ICatalogConnectionFactory _factory;
    private readonly ICatalogRepository _catalogRepo;
    private readonly StoragePathResolver _storageResolver;
    private readonly IOptionsMonitor<SystemConfig> _configMonitor;
    private readonly IHubContext<TelemetryHub> _hubContext;
    private readonly IVideoProbeService _probeService;
    private readonly ILogger<CatalogMaintenanceService> _logger;

    private readonly SemaphoreSlim _jobLock = new(1, 1);
    private readonly object _stateLock = new();
    private DateTime _lastBroadcastTime = DateTime.MinValue;

    private CancellationTokenSource? _activeJobCts;
    private volatile bool _isSilentJobRunning = false;

    private MaintenanceJobState _state = new(
        JobId: string.Empty,
        JobType: "Idle",
        IsRunning: false,
        ProgressPercent: 0,
        TotalFilesScanned: 0,
        NewlyIndexedCount: 0,
        SkippedCount: 0,
        ErrorsCount: 0,
        CurrentTarget: string.Empty,
        StatusMessage: "System Idle",
        StartedAtUtc: null,
        CompletedAtUtc: null
    );

    // 💡 תיקון קריטי: החרגת תיקיות מיוחדות, Snapshot של NetApp וספריות מערכת למניעת קריסות גישה וזחילה מיותרת
    private static readonly HashSet<string> ReservedDirNames = new(StringComparer.OrdinalIgnoreCase)
    {
        "logs", "export", "exports", "recordingsbuffer", "buffer", "temp", ".git",
        ".snapshot", "~snapshot", ".zfs", "$RECYCLE.BIN", "System Volume Information", "lost+found", "@Recycle"
    };

    private static readonly HashSet<string> VideoExtensions = new(StringComparer.OrdinalIgnoreCase)
    {
        ".mp4", ".fmp4", ".flv", ".mkv", ".ts", ".mov"
    };

    // 💡 תמיכה כפולה: תבנית תאריך קלאסית + תבנית Epoch של MediaMTX (%s_%f)
    private static readonly Regex UniversalChunkRegex = new(
        @"(?:^(?<host>[a-zA-Z0-9_\-\.]+?)[_-])?(?<year>20\d{2})[-_]?(?<month>\d{2})[-_]?(?<day>\d{2})[-_T](?<hour>\d{2})[-_:]?(?<minute>\d{2})[-_:]?(?<sec>\d{2})(?:[_\-\.]\d+)?(?<utc>Z)?\.(mp4|fmp4|flv|mkv|ts)$",
        RegexOptions.Compiled | RegexOptions.IgnoreCase);

    private static readonly Regex EpochChunkRegex = new(
        @"(?:^(?<host>[a-zA-Z0-9_\-\.]+?)[_-])?(?<epoch>\d{10})(?:[_\-\.](?<micro>\d{1,6}))?(?:[_\-\.][a-zA-Z0-9]+)?\.(mp4|fmp4|flv|mkv|ts|mov)$",
        RegexOptions.Compiled | RegexOptions.IgnoreCase);

    public CatalogMaintenanceService(
        ICatalogConnectionFactory factory,
        ICatalogRepository catalogRepo,
        StoragePathResolver storageResolver,
        IOptionsMonitor<SystemConfig> configMonitor,
        IHubContext<TelemetryHub> hubContext,
        IVideoProbeService probeService,
        ILogger<CatalogMaintenanceService> logger)
    {
        _factory = factory;
        _catalogRepo = catalogRepo;
        _storageResolver = storageResolver;
        _configMonitor = configMonitor;
        _hubContext = hubContext;
        _probeService = probeService;
        _logger = logger;
    }

    public MaintenanceJobState GetCurrentJobState()
    {
        lock (_stateLock)
        {
            return _state;
        }
    }

    public async Task<object> GetCatalogStatsAsync()
    {
        using var db = _factory.CreateConnection();
        var totalChunks = await db.ExecuteScalarAsync<long>("SELECT COUNT(1) FROM recording_chunks;");
        var totalBytes = await db.ExecuteScalarAsync<long>("SELECT COALESCE(SUM(file_size_bytes), 0) FROM recording_chunks;");
        var totalStations = await db.ExecuteScalarAsync<int>("SELECT COUNT(DISTINCT station_id) FROM recording_chunks;");
        var oldestEpoch = await db.ExecuteScalarAsync<long?>("SELECT MIN(start_epoch_ms) FROM recording_chunks WHERE start_epoch_ms > 0;");
        var newestEpoch = await db.ExecuteScalarAsync<long?>("SELECT MAX(end_epoch_ms) FROM recording_chunks;");

        return new
        {
            totalChunks,
            totalSizeGb = Math.Round(totalBytes / (1024.0 * 1024.0 * 1024.0), 2),
            totalStations,
            oldestRecordingUtc = oldestEpoch.HasValue ? DateTimeOffset.FromUnixTimeMilliseconds(oldestEpoch.Value).UtcDateTime : (DateTime?)null,
            newestRecordingUtc = newestEpoch.HasValue ? DateTimeOffset.FromUnixTimeMilliseconds(newestEpoch.Value).UtcDateTime : (DateTime?)null,
            activeJob = GetCurrentJobState()
        };
    }

    public async Task<MaintenanceJobState> TriggerReindexAsync(bool forceFullRecheck = false)
    {
        // 💡 אם משימת רקע שקטה פעילה כרגע - קוטעים אותה לטובת הבקשה היזומה של המשתמש
        if (_isSilentJobRunning && _activeJobCts != null && !_activeJobCts.IsCancellationRequested)
        {
            _logger.LogInformation("[MAINTENANCE] Preempting scheduled silent background job for manual reindex request.");
            try { _activeJobCts.Cancel(); } catch { }
        }

        // המתנה קצרה לשחרור המנעול במקום סירוב מיידי ב-0 מילישניות
        if (!await _jobLock.WaitAsync(TimeSpan.FromSeconds(3)))
        {
            _logger.LogWarning("[MAINTENANCE] Reindex already actively running. Returning current status.");
            return GetCurrentJobState();
        }

        var cts = new CancellationTokenSource();
        _activeJobCts = cts;
        _isSilentJobRunning = false;

        string jobId = Guid.NewGuid().ToString("N")[..8];
        UpdateState(s => new MaintenanceJobState(
            JobId: jobId,
            JobType: "CatalogReindex",
            IsRunning: true,
            ProgressPercent: 1,
            TotalFilesScanned: 0,
            NewlyIndexedCount: 0,
            SkippedCount: 0,
            ErrorsCount: 0,
            CurrentTarget: "Initializing scan...",
            StatusMessage: "Locating and checking storage roots...",
            StartedAtUtc: DateTime.UtcNow,
            CompletedAtUtc: null
        ), forceBroadcast: true);

        _ = Task.Run(async () =>
        {
            try
            {
                await RunReindexCoreAsync(forceFullRecheck, isSilentScheduled: false, cts.Token);
            }
            finally
            {
                _jobLock.Release();
            }
        });

        return GetCurrentJobState();
    }

    public async Task<MaintenanceJobState> TriggerRepairCatalogAsync()
    {
        if (_isSilentJobRunning && _activeJobCts != null && !_activeJobCts.IsCancellationRequested)
        {
            try { _activeJobCts.Cancel(); } catch { }
        }

        if (!await _jobLock.WaitAsync(TimeSpan.FromSeconds(3)))
        {
            return GetCurrentJobState();
        }

        var cts = new CancellationTokenSource();
        _activeJobCts = cts;
        _isSilentJobRunning = false;

        string jobId = Guid.NewGuid().ToString("N")[..8];
        UpdateState(s => new MaintenanceJobState(
            JobId: jobId,
            JobType: "CatalogRepair",
            IsRunning: true,
            ProgressPercent: 1,
            TotalFilesScanned: 0,
            NewlyIndexedCount: 0,
            SkippedCount: 0,
            ErrorsCount: 0,
            CurrentTarget: "Auditing database entries...",
            StatusMessage: "Auditing catalog for duration mismatches and ghost chunks...",
            StartedAtUtc: DateTime.UtcNow,
            CompletedAtUtc: null
        ), forceBroadcast: true);

        _ = Task.Run(async () =>
        {
            try
            {
                await RunCatalogIntegrityAuditAsync(isSilentScheduled: false, cts.Token);
            }
            finally
            {
                _jobLock.Release();
            }
        });

        return GetCurrentJobState();
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("[MAINTENANCE] Storage Maintenance Engine & Auto-Indexer started.");

        try
        {
            await Task.Delay(TimeSpan.FromSeconds(20), stoppingToken);
        }
        catch (OperationCanceledException)
        {
            return;
        }

        while (!stoppingToken.IsCancellationRequested)
        {
            int intervalMinutes = Math.Max(5, _configMonitor.CurrentValue.Storage?.ChunkIntervalMinutes ?? 15);
            var cycleDelay = TimeSpan.FromMinutes(intervalMinutes);

            try
            {
                if (await _jobLock.WaitAsync(0, stoppingToken))
                {
                    var cts = CancellationTokenSource.CreateLinkedTokenSource(stoppingToken);
                    _activeJobCts = cts;
                    _isSilentJobRunning = true;

                    try
                    {
                        _logger.LogDebug("[MAINTENANCE] Running scheduled catalog delta scan on storage...");
                        await RunReindexCoreAsync(forceFullRecheck: false, isSilentScheduled: true, cts.Token);

                        if (!cts.IsCancellationRequested)
                        {
                            await RunCatalogIntegrityAuditAsync(isSilentScheduled: true, cts.Token);
                        }
                    }
                    finally
                    {
                        _isSilentJobRunning = false;
                        _jobLock.Release();
                    }
                }
            }
            catch (OperationCanceledException)
            {
                break;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[MAINTENANCE] Error during scheduled background reindex.");
            }

            try
            {
                await Task.Delay(cycleDelay, stoppingToken);
            }
            catch (OperationCanceledException)
            {
                break;
            }
        }

        _logger.LogInformation("[MAINTENANCE] Storage Maintenance Engine stopped.");
    }

    private async Task RunReindexCoreAsync(bool forceFullRecheck, bool isSilentScheduled, CancellationToken ct = default)
    {
        var config = _configMonitor.CurrentValue;

        // 💡 תמיכה בריבוי Storage Roots (גם NetApp UNC וגם LocalFallback בו-זמנית)
        var roots = new List<string>();
        if (!string.IsNullOrWhiteSpace(config.Storage?.NetAppUncPath))
        {
            bool reachable = await StoragePathResolver.IsNetAppReachableAsync(config.Storage.NetAppUncPath);
            if (reachable)
            {
                roots.Add(config.Storage.NetAppUncPath);
            }
            else
            {
                _logger.LogWarning("[MAINTENANCE] NetApp UNC path '{Path}' unreachable during reindex.", config.Storage.NetAppUncPath);
            }
        }

        if (!string.IsNullOrWhiteSpace(config.Storage?.LocalFallbackPath) && Directory.Exists(config.Storage.LocalFallbackPath))
        {
            if (!roots.Contains(config.Storage.LocalFallbackPath, StringComparer.OrdinalIgnoreCase))
            {
                roots.Add(config.Storage.LocalFallbackPath);
            }
        }

        if (roots.Count == 0)
        {
            UpdateState(s => s with
            {
                IsRunning = false,
                StatusMessage = "Storage roots unavailable (check NetApp share connectivity and local fallback path).",
                CompletedAtUtc = DateTime.UtcNow
            }, forceBroadcast: true);
            return;
        }

        try
        {
            HashSet<string> existingValidPaths;
            using (var db = _factory.CreateConnection())
            {
                var indexed = await db.QueryAsync<string>("SELECT file_path FROM recording_chunks WHERE width > 0 AND height > 0;");
                existingValidPaths = new HashSet<string>(indexed, StringComparer.OrdinalIgnoreCase);
            }

            var enumDirOptions = new EnumerationOptions
            {
                RecurseSubdirectories = false,
                IgnoreInaccessible = true,
                AttributesToSkip = FileAttributes.ReparsePoint | FileAttributes.System
            };

            var enumFileOptions = new EnumerationOptions
            {
                RecurseSubdirectories = false,
                IgnoreInaccessible = true,
                AttributesToSkip = FileAttributes.ReparsePoint | FileAttributes.System,
                MatchCasing = MatchCasing.CaseInsensitive
            };

            // 1. איתור בטוח של תיקיות התחנות והמסכים ללא קריסה על NetApp Snapshot או הרשאות חסומות
            var candidateStationFolders = new List<(string StationName, string FolderPath, string DisplayId, bool IsPrimary)>();

            foreach (var root in roots)
            {
                if (ct.IsCancellationRequested) break;
                if (!Directory.Exists(root)) continue;

                var candidateDirs = new List<string>();
                try
                {
                    foreach (var dir in Directory.EnumerateDirectories(root, "*", enumDirOptions))
                    {
                        string dirName = Path.GetFileName(dir);
                        if (dirName.StartsWith(".") || dirName.StartsWith("~") || ReservedDirNames.Contains(dirName))
                        {
                            continue;
                        }

                        if (string.Equals(dirName, "live", StringComparison.OrdinalIgnoreCase) ||
                            string.Equals(dirName, "recordings", StringComparison.OrdinalIgnoreCase))
                        {
                            try
                            {
                                foreach (var sub in Directory.EnumerateDirectories(dir, "*", enumDirOptions))
                                {
                                    string subName = Path.GetFileName(sub);
                                    if (subName.StartsWith(".") || subName.StartsWith("~") || ReservedDirNames.Contains(subName)) continue;
                                    if (string.Equals(subName, "live", StringComparison.OrdinalIgnoreCase))
                                    {
                                        foreach (var sub2 in Directory.EnumerateDirectories(sub, "*", enumDirOptions))
                                        {
                                            string sub2Name = Path.GetFileName(sub2);
                                            if (!sub2Name.StartsWith(".") && !ReservedDirNames.Contains(sub2Name))
                                                candidateDirs.Add(sub2);
                                        }
                                    }
                                    else
                                    {
                                        candidateDirs.Add(sub);
                                    }
                                }
                            }
                            catch { }
                        }
                        else
                        {
                            candidateDirs.Add(dir);
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "[MAINTENANCE] Error enumerating station directories in root '{Root}'.", root);
                }

                foreach (var stationPath in candidateDirs)
                {
                    string rawName = Path.GetFileName(stationPath);
                    string stationName = rawName.StartsWith("live/", StringComparison.OrdinalIgnoreCase) ? rawName.Substring(5) : rawName;

                    // 💡 זיהוי מסכים מרובים: תתי-תיקיות mon-0, mon-1, display-0 וכד'
                    try
                    {
                        foreach (var sub in Directory.EnumerateDirectories(stationPath, "*", enumDirOptions))
                        {
                            string subName = Path.GetFileName(sub);
                            if (subName.StartsWith("mon-", StringComparison.OrdinalIgnoreCase) ||
                                subName.StartsWith("display-", StringComparison.OrdinalIgnoreCase))
                            {
                                string dId = subName.ToLowerInvariant();
                                bool isPrim = dId == "mon-0" || dId == "display-0";
                                candidateStationFolders.Add((stationName, sub, dId, isPrim));
                            }
                        }
                    }
                    catch { }

                    // שמירת תיקיית התחנה הראשית עבור הקלטות רגילות / מסך בודד או קבצים היסטוריים בשורש התחנה
                    candidateStationFolders.Add((stationName, stationPath, "mon-0", true));
                }
            }

            if (!isSilentScheduled)
            {
                UpdateState(s => s with
                {
                    StatusMessage = $"Scanning {candidateStationFolders.Count} station folder targets across {roots.Count} storage root(s)..."
                }, forceBroadcast: true);
            }

            // 2. איסוף רשימת קובצי הווידאו
            var allFilesToScan = new List<(string StationName, string FilePath, string DisplayId, bool IsPrimary)>();
            foreach (var (stationName, folderPath, displayId, isPrimary) in candidateStationFolders)
            {
                if (ct.IsCancellationRequested) break;
                try
                {
                    if (!Directory.Exists(folderPath)) continue;
                    foreach (var file in Directory.EnumerateFiles(folderPath, "*.*", enumFileOptions))
                    {
                        if (VideoExtensions.Contains(Path.GetExtension(file)))
                        {
                            allFilesToScan.Add((stationName, file, displayId, isPrimary));
                        }
                    }
                }
                catch { }
            }

            allFilesToScan.Sort((a, b) => string.Compare(a.FilePath, b.FilePath, StringComparison.OrdinalIgnoreCase));

            // 3. מטמון רזולוציה ו-FPS לפי תחנה ומסך למניעת קריאות ffprobe סדרתיות אינסופיות מעל SMB
            var dimensionCache = new ConcurrentDictionary<string, (int Width, int Height, int Fps, bool HasAudio)>(StringComparer.OrdinalIgnoreCase);
            try
            {
                using var db = _factory.CreateConnection();
                var cached = await db.QueryAsync<(string StationId, string DisplayId, int Width, int Height, int Fps, int HasAudio)>(@"
                    SELECT station_id AS StationId, display_id AS DisplayId, width AS Width, height AS Height, fps AS Fps, has_audio AS HasAudio
                    FROM recording_chunks
                    WHERE width > 0 AND height > 0
                    GROUP BY station_id, display_id;");

                foreach (var c in cached)
                {
                    dimensionCache[$"{c.StationId}:{c.DisplayId}"] = (c.Width, c.Height, c.Fps, c.HasAudio != 0);
                }
            }
            catch { }

            int total = allFilesToScan.Count;
            int scanned = 0, added = 0, skipped = 0, errors = 0;
            var batch = new List<ChunkInsertItem>();
            int fallbackMin = Math.Max(1, config.Storage?.ChunkIntervalMinutes ?? 15);
            long defaultDurationMs = fallbackMin * 60 * 1000L;

            for (int i = 0; i < allFilesToScan.Count; i++)
            {
                if (ct.IsCancellationRequested) break;
                var item = allFilesToScan[i];
                scanned++;

                if (!forceFullRecheck && existingValidPaths.Contains(item.FilePath))
                {
                    skipped++;
                }
                else
                {
                    try
                    {
                        var parsedStart = TryParseFileTimestamp(Path.GetFileName(item.FilePath), config.DisplayTimezone);
                        if (parsedStart.HasValue)
                        {
                            long startMs = parsedStart.Value;
                            var fileInfo = new FileInfo(item.FilePath);
                            long fileSize = fileInfo.Length;

                            if (fileSize > 0)
                            {
                                long durationMs = 0;

                                // חישוב משך חכם: בדיקת תחילת הקובץ הבא באותו ערוץ ומסך
                                if (i + 1 < allFilesToScan.Count &&
                                    string.Equals(allFilesToScan[i + 1].StationName, item.StationName, StringComparison.OrdinalIgnoreCase) &&
                                    string.Equals(allFilesToScan[i + 1].DisplayId, item.DisplayId, StringComparison.OrdinalIgnoreCase))
                                {
                                    var nextStart = TryParseFileTimestamp(Path.GetFileName(allFilesToScan[i + 1].FilePath), config.DisplayTimezone);
                                    if (nextStart.HasValue && nextStart.Value > startMs && (nextStart.Value - startMs) <= (30 * 60 * 1000L))
                                    {
                                        durationMs = nextStart.Value - startMs;
                                    }
                                }

                                if (durationMs <= 0 && fileInfo.LastWriteTimeUtc > DateTimeOffset.FromUnixTimeMilliseconds(startMs).UtcDateTime)
                                {
                                    long diffMs = (long)(fileInfo.LastWriteTimeUtc - DateTimeOffset.FromUnixTimeMilliseconds(startMs).UtcDateTime).TotalMilliseconds;
                                    if (diffMs > 500 && diffMs <= (30 * 60 * 1000L))
                                    {
                                        durationMs = diffMs;
                                    }
                                }

                                if (durationMs <= 0)
                                {
                                    durationMs = defaultDurationMs;
                                }

                                long endMs = startMs + durationMs;

                                // שליפת מימדי הווידאו: שימוש במטמון מהיר או דגימת Probe בודדת לתחנה
                                string dimKey = $"{item.StationName}:{item.DisplayId}";
                                int width = 1920;
                                int height = 1080;
                                int fps = config.DefaultTargetFps > 0 ? config.DefaultTargetFps : 30;
                                bool hasAudio = item.IsPrimary;

                                if (dimensionCache.TryGetValue(dimKey, out var dims) && dims.Width > 0 && dims.Height > 0)
                                {
                                    width = dims.Width;
                                    height = dims.Height;
                                    fps = dims.Fps > 0 ? dims.Fps : fps;
                                    hasAudio = dims.HasAudio;
                                }
                                else
                                {
                                    var probe = await _probeService.ProbeFileAsync(item.FilePath, ct);
                                    if (probe != null && probe.Width > 0 && probe.Height > 0)
                                    {
                                        width = probe.Width;
                                        height = probe.Height;
                                        fps = probe.Fps > 0 ? probe.Fps : fps;
                                        hasAudio = probe.HasAudio;
                                        if (probe.DurationSeconds > 0.1 && (durationMs == defaultDurationMs))
                                        {
                                            durationMs = (long)Math.Round(probe.DurationSeconds * 1000.0);
                                            endMs = startMs + durationMs;
                                        }
                                    }
                                    dimensionCache[dimKey] = (width, height, fps, hasAudio);
                                }

                                batch.Add(new ChunkInsertItem(
                                    StationId: item.StationName,
                                    FilePath: item.FilePath,
                                    StartEpochMs: startMs,
                                    EndEpochMs: endMs,
                                    DurationMs: durationMs,
                                    FileSizeBytes: fileSize,
                                    Width: width,
                                    Height: height,
                                    Fps: fps,
                                    HasAudio: hasAudio ? 1 : 0,
                                    DisplayId: item.DisplayId,
                                    IsPrimary: item.IsPrimary
                                ));

                                added++;
                                existingValidPaths.Add(item.FilePath);
                            }
                            else
                            {
                                errors++;
                            }
                        }
                        else
                        {
                            errors++;
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning(ex, "[MAINTENANCE] Error processing file '{Path}'.", item.FilePath);
                        errors++;
                    }
                }

                if (batch.Count >= 50)
                {
                    await FlushBatchAsync(batch);
                    batch.Clear();
                }

                if (!isSilentScheduled && (scanned % 20 == 0 || scanned == total))
                {
                    int pct = total > 0 ? (int)Math.Min(99, (scanned * 100.0) / total) : 100;
                    UpdateState(s => s with
                    {
                        ProgressPercent = pct,
                        TotalFilesScanned = scanned,
                        NewlyIndexedCount = added,
                        SkippedCount = skipped,
                        ErrorsCount = errors,
                        CurrentTarget = item.StationName,
                        StatusMessage = $"Indexing: {scanned}/{total} ({added} added, {skipped} existing)"
                    }, forceBroadcast: (scanned == total));
                }
            }

            if (batch.Count > 0)
            {
                await FlushBatchAsync(batch);
                batch.Clear();
            }

            if (!isSilentScheduled)
            {
                UpdateState(s => s with
                {
                    IsRunning = false,
                    ProgressPercent = 100,
                    TotalFilesScanned = scanned,
                    NewlyIndexedCount = added,
                    SkippedCount = skipped,
                    ErrorsCount = errors,
                    CurrentTarget = string.Empty,
                    StatusMessage = $"Scan completed. Indexed {added} new recording(s), skipped {skipped} existing.",
                    CompletedAtUtc = DateTime.UtcNow
                }, forceBroadcast: true);
            }

            _logger.LogInformation("[MAINTENANCE] Reindex finished. Total: {Found}, Indexed: {Indexed}, Skipped: {Skipped}",
                total, added, skipped);
        }
        catch (OperationCanceledException)
        {
            _logger.LogInformation("[MAINTENANCE] Storage reindex cancelled.");
            if (!isSilentScheduled)
            {
                UpdateState(s => s with
                {
                    IsRunning = false,
                    StatusMessage = "Scan cancelled.",
                    CompletedAtUtc = DateTime.UtcNow
                }, forceBroadcast: true);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "[MAINTENANCE] Critical failure during catalog scan.");
            if (!isSilentScheduled)
            {
                UpdateState(s => s with
                {
                    IsRunning = false,
                    StatusMessage = $"Failed: {ex.Message}",
                    CompletedAtUtc = DateTime.UtcNow
                }, forceBroadcast: true);
            }
        }
    }

    private async Task FlushBatchAsync(List<ChunkInsertItem> batch)
    {
        using var db = _factory.CreateConnection();
        using var cmd = db.CreateCommand();
        cmd.CommandText = "PRAGMA busy_timeout = 30000;";
        cmd.ExecuteNonQuery();

        using var tx = db.BeginTransaction();

        const string sql = @"
            INSERT INTO recording_chunks (
                station_id, file_path, start_epoch_ms, end_epoch_ms, 
                duration_ms, file_size_bytes, width, height, fps, has_audio, is_finalized, indexed_at_utc,
                display_id, is_primary
            ) VALUES (
                @StationId, @FilePath, @StartEpochMs, @EndEpochMs, 
                @DurationMs, @FileSizeBytes, @Width, @Height, @Fps, @HasAudio, 1, @Now,
                @DisplayId, @IsPrimary
            ) ON CONFLICT(file_path) DO UPDATE SET
                start_epoch_ms = excluded.start_epoch_ms,
                end_epoch_ms = excluded.end_epoch_ms,
                duration_ms = excluded.duration_ms,
                file_size_bytes = excluded.file_size_bytes,
                width = CASE WHEN excluded.width > 0 THEN excluded.width ELSE recording_chunks.width END,
                height = CASE WHEN excluded.height > 0 THEN excluded.height ELSE recording_chunks.height END,
                fps = CASE WHEN excluded.fps > 0 THEN excluded.fps ELSE recording_chunks.fps END,
                has_audio = excluded.has_audio,
                display_id = excluded.display_id,
                is_primary = excluded.is_primary,
                is_finalized = 1;";

        long now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        foreach (var b in batch)
        {
            await db.ExecuteAsync(sql, new
            {
                b.StationId,
                b.FilePath,
                b.StartEpochMs,
                b.EndEpochMs,
                b.DurationMs,
                b.FileSizeBytes,
                b.Width,
                b.Height,
                b.Fps,
                b.HasAudio,
                b.DisplayId,
                IsPrimary = b.IsPrimary ? 1 : 0,
                Now = now
            }, tx);
        }
        tx.Commit();
    }

    private async Task RunCatalogIntegrityAuditAsync(bool isSilentScheduled, CancellationToken ct = default)
    {
        try
        {
            using var db = _factory.CreateConnection();

            // 💡 בסריקה שקטה תקופתית: בודקים רק סרטונים אחרונים (4 שעות אחרונות) או סרטונים שלא הושלמו (Unfinalized)
            // כדי למנוע הצפת Share מרוחק במיליוני שאילתות File.Exists
            string query = isSilentScheduled
                ? @"SELECT id AS Id, station_id AS StationId, file_path AS FilePath,
                           start_epoch_ms AS StartEpochMs, end_epoch_ms AS EndEpochMs,
                           duration_ms AS DurationMs, file_size_bytes AS FileSizeBytes
                    FROM recording_chunks
                    WHERE end_epoch_ms >= @recentThresholdMs OR is_finalized = 0
                    ORDER BY start_epoch_ms DESC LIMIT 300;"
                : @"SELECT id AS Id, station_id AS StationId, file_path AS FilePath,
                           start_epoch_ms AS StartEpochMs, end_epoch_ms AS EndEpochMs,
                           duration_ms AS DurationMs, file_size_bytes AS FileSizeBytes
                    FROM recording_chunks
                    ORDER BY start_epoch_ms DESC;";

            long recentThresholdMs = DateTimeOffset.UtcNow.AddHours(-4).ToUnixTimeMilliseconds();
            var allChunks = (await db.QueryAsync<(long Id, string StationId, string FilePath, long StartEpochMs, long EndEpochMs, long DurationMs, long FileSizeBytes)>(
                query, new { recentThresholdMs })).ToList();

            int total = allChunks.Count;
            int scanned = 0;
            int repaired = 0;
            int pruned = 0;
            int skipped = 0;

            var toPruneIds = new List<long>();
            var toUpdateChunks = new List<object>();

            for (int i = 0; i < total; i++)
            {
                if (ct.IsCancellationRequested) break;
                var chunk = allChunks[i];
                scanned++;

                if (!File.Exists(chunk.FilePath))
                {
                    toPruneIds.Add(chunk.Id);
                    pruned++;
                }
                else
                {
                    var fi = new FileInfo(chunk.FilePath);
                    bool needsProbe = false;

                    // נדרשת דגימת וידאו רק כאשר המשך או המימדים חסרים או לא הגיוניים
                    if (chunk.DurationMs <= 0 || chunk.StartEpochMs <= 0)
                    {
                        needsProbe = true;
                    }
                    else if (Math.Abs((chunk.EndEpochMs - chunk.StartEpochMs) - chunk.DurationMs) > 2000)
                    {
                        needsProbe = true;
                    }

                    if (needsProbe)
                    {
                        var probe = await _probeService.ProbeFileAsync(chunk.FilePath, ct);
                        if (probe != null && probe.DurationSeconds > 0.05)
                        {
                            long actualDurMs = (long)Math.Round(probe.DurationSeconds * 1000.0);
                            long actualEndMs = chunk.StartEpochMs + actualDurMs;

                            if (Math.Abs(actualDurMs - chunk.DurationMs) > 1000 || chunk.EndEpochMs != actualEndMs || chunk.FileSizeBytes != fi.Length)
                            {
                                toUpdateChunks.Add(new
                                {
                                    Id = chunk.Id,
                                    NewEndMs = actualEndMs,
                                    NewDurMs = actualDurMs,
                                    Size = fi.Length,
                                    W = probe.Width > 0 ? probe.Width : 1920,
                                    H = probe.Height > 0 ? probe.Height : 1080,
                                    Fps = probe.Fps > 0 ? (int)Math.Round((double)probe.Fps) : 30,
                                    Audio = probe.HasAudio ? 1 : 0
                                });
                                repaired++;
                            }
                            else
                            {
                                skipped++;
                            }
                        }
                        else
                        {
                            skipped++;
                        }
                    }
                    else
                    {
                        skipped++;
                    }
                }

                if (!isSilentScheduled && (scanned % 20 == 0 || scanned == total))
                {
                    int pct = total > 0 ? (int)Math.Min(99, (scanned * 100.0) / total) : 100;
                    UpdateState(s => s with
                    {
                        ProgressPercent = pct,
                        TotalFilesScanned = scanned,
                        NewlyIndexedCount = repaired,
                        ErrorsCount = pruned,
                        SkippedCount = skipped,
                        CurrentTarget = chunk.StationId,
                        StatusMessage = $"Auditing catalog: {scanned}/{total} ({repaired} repaired, {pruned} ghost records pruned)"
                    });
                }
            }

            if (toPruneIds.Count > 0 || toUpdateChunks.Count > 0)
            {
                using var tx = db.BeginTransaction();

                if (toPruneIds.Count > 0)
                {
                    await db.ExecuteAsync("DELETE FROM recording_chunks WHERE id = @Id;", toPruneIds.Select(id => new { Id = id }), tx);
                }

                if (toUpdateChunks.Count > 0)
                {
                    const string updateSql = @"
                        UPDATE recording_chunks
                        SET end_epoch_ms = @NewEndMs,
                            duration_ms = @NewDurMs,
                            file_size_bytes = @Size,
                            width = @W,
                            height = @H,
                            fps = @Fps,
                            has_audio = @Audio,
                            is_finalized = 1
                        WHERE id = @Id;";

                    await db.ExecuteAsync(updateSql, toUpdateChunks, tx);
                }

                tx.Commit();
                _logger.LogInformation("[MAINTENANCE] Catalog audit completed: {Repaired} repaired, {Pruned} orphaned records deleted.", repaired, pruned);
            }

            if (!isSilentScheduled)
            {
                UpdateState(s => s with
                {
                    IsRunning = false,
                    ProgressPercent = 100,
                    TotalFilesScanned = scanned,
                    NewlyIndexedCount = repaired,
                    ErrorsCount = pruned,
                    SkippedCount = skipped,
                    CurrentTarget = string.Empty,
                    StatusMessage = $"Integrity audit complete: {repaired} chunk(s) repaired, {pruned} ghost chunk(s) pruned.",
                    CompletedAtUtc = DateTime.UtcNow
                }, forceBroadcast: true);
            }
        }
        catch (OperationCanceledException)
        {
            _logger.LogInformation("[MAINTENANCE] Catalog audit cancelled.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "[MAINTENANCE] Failure during catalog integrity audit.");
            if (!isSilentScheduled)
            {
                UpdateState(s => s with
                {
                    IsRunning = false,
                    StatusMessage = $"Audit Failed: {ex.Message}",
                    CompletedAtUtc = DateTime.UtcNow
                }, forceBroadcast: true);
            }
        }
    }

    private void UpdateState(Func<MaintenanceJobState, MaintenanceJobState> update, bool forceBroadcast = false)
    {
        MaintenanceJobState stateSnapshot;
        bool shouldBroadcast = false;

        lock (_stateLock)
        {
            _state = update(_state);
            stateSnapshot = _state;

            var now = DateTime.UtcNow;
            if (forceBroadcast || (now - _lastBroadcastTime).TotalMilliseconds >= 250)
            {
                _lastBroadcastTime = now;
                shouldBroadcast = true;
            }
        }

        if (shouldBroadcast)
        {
            _ = _hubContext.Clients.All.SendAsync("ReceiveMaintenanceJob", stateSnapshot);
        }
    }

    private static long? TryParseFileTimestamp(string fileName, string? configuredTzId)
    {
        // 1. עדיפות עליונה: תבנית Epoch של MediaMTX (%s_%f או %s)
        var matchEpoch = EpochChunkRegex.Match(fileName);
        if (matchEpoch.Success)
        {
            if (long.TryParse(matchEpoch.Groups["epoch"].Value, out long sec))
            {
                long micro = matchEpoch.Groups["micro"].Success && long.TryParse(matchEpoch.Groups["micro"].Value, out long m) ? m : 0;
                return (sec * 1000L) + (micro / 1000L);
            }
        }

        // 2. תבנית תאריך קלאסית (YYYY-MM-DD...)
        var match = UniversalChunkRegex.Match(fileName);
        if (match.Success)
        {
            int year = int.Parse(match.Groups["year"].Value);
            int month = int.Parse(match.Groups["month"].Value);
            int day = int.Parse(match.Groups["day"].Value);
            int hour = int.Parse(match.Groups["hour"].Value);
            int minute = int.Parse(match.Groups["minute"].Value);
            int second = int.Parse(match.Groups["sec"].Value);

            if (match.Groups["utc"].Success)
            {
                return new DateTimeOffset(new DateTime(year, month, day, hour, minute, second, DateTimeKind.Utc)).ToUnixTimeMilliseconds();
            }

            TimeZoneInfo tz;
            try
            {
                tz = !string.IsNullOrWhiteSpace(configuredTzId)
                    ? TimeZoneInfo.FindSystemTimeZoneById(configuredTzId)
                    : TimeZoneInfo.Local;
            }
            catch
            {
                tz = TimeZoneInfo.Local;
            }

            var localDt = new DateTime(year, month, day, hour, minute, second, DateTimeKind.Unspecified);
            DateTime utc = TimeZoneInfo.ConvertTimeToUtc(localDt, tz);
            return new DateTimeOffset(utc, TimeSpan.Zero).ToUnixTimeMilliseconds();
        }

        return null;
    }

    private sealed record ChunkInsertItem(
        string StationId,
        string FilePath,
        long StartEpochMs,
        long EndEpochMs,
        long DurationMs,
        long FileSizeBytes,
        int Width,
        int Height,
        int Fps,
        int HasAudio,
        string DisplayId = "mon-0",
        bool IsPrimary = true
    );
}