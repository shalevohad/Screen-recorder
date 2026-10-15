// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Services/CatalogMaintenanceService.cs
// ==========================================
namespace ITB_SCREEN_RECORDER.Server.Services;

using System;
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

    private static readonly HashSet<string> ReservedDirNames = new(StringComparer.OrdinalIgnoreCase)
    {
        "logs", "export", "exports", "recordingsbuffer", "buffer", "temp", ".git"
    };

    private static readonly HashSet<string> VideoExtensions = new(StringComparer.OrdinalIgnoreCase)
    {
        ".mp4", ".fmp4", ".flv", ".mkv", ".ts"
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
        if (!await _jobLock.WaitAsync(0))
        {
            return GetCurrentJobState();
        }

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
            StatusMessage: "Locating storage roots...",
            StartedAtUtc: DateTime.UtcNow,
            CompletedAtUtc: null
        ), forceBroadcast: true);

        _ = Task.Run(async () =>
        {
            try
            {
                await RunReindexCoreAsync(forceFullRecheck, isSilentScheduled: false);
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
        if (!await _jobLock.WaitAsync(0))
        {
            return GetCurrentJobState();
        }

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
                await RunCatalogIntegrityAuditAsync(isSilentScheduled: false);
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
            await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);
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
                    try
                    {
                        _logger.LogInformation("[MAINTENANCE] Running scheduled catalog delta scan on storage...");
                        await RunReindexCoreAsync(forceFullRecheck: false, isSilentScheduled: true);

                        _logger.LogInformation("[MAINTENANCE] Running scheduled catalog integrity and duration audit...");
                        await RunCatalogIntegrityAuditAsync(isSilentScheduled: true);
                    }
                    finally
                    {
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

    private async Task RunReindexCoreAsync(bool forceFullRecheck, bool isSilentScheduled)
    {
        var config = _configMonitor.CurrentValue;
        string root = await _storageResolver.ResolveActiveRootAsync(config.Storage, _logger);

        if (!Directory.Exists(root))
        {
            UpdateState(s => s with
            {
                IsRunning = false,
                StatusMessage = "Storage root unavailable.",
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

            var candidateStationDirs = new List<string>();
            foreach (var dir in Directory.GetDirectories(root))
            {
                string dirName = Path.GetFileName(dir);
                if (string.Equals(dirName, "live", StringComparison.OrdinalIgnoreCase))
                {
                    candidateStationDirs.AddRange(Directory.GetDirectories(dir));
                }
                else if (!ReservedDirNames.Contains(dirName))
                {
                    candidateStationDirs.Add(dir);
                }
            }

            var allFilesToScan = new List<(string StationName, string FilePath)>();
            foreach (var stationPath in candidateStationDirs)
            {
                string stationName = Path.GetFileName(stationPath);
                var dirFiles = Directory.GetFiles(stationPath, "*.*", SearchOption.AllDirectories)
                    .Where(f => VideoExtensions.Contains(Path.GetExtension(f)))
                    .OrderBy(f => f);

                foreach (var f in dirFiles)
                {
                    allFilesToScan.Add((stationName, f));
                }
            }

            int total = allFilesToScan.Count;
            int scanned = 0, added = 0, skipped = 0, errors = 0;
            var batch = new List<ChunkInsertItem>();

            for (int i = 0; i < allFilesToScan.Count; i++)
            {
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
                                var probe = await _probeService.ProbeFileAsync(item.FilePath, CancellationToken.None);

                                int width = 0;
                                int height = 0;
                                int fps = 0;
                                bool hasAudio = false;
                                long durationMs = 0;

                                if (probe != null && probe.DurationSeconds > 0)
                                {
                                    durationMs = (long)Math.Round(probe.DurationSeconds * 1000.0);
                                    width = probe.Width;
                                    height = probe.Height;
                                    fps = probe.Fps;
                                    hasAudio = probe.HasAudio;
                                }

                                // 💡 חישוב משך חכם: אם ה-Probe לא מחזיר משך, בודקים את נקודת ההתחלה של הקובץ הבא באותה עמדה
                                if (durationMs <= 0)
                                {
                                    if (i + 1 < allFilesToScan.Count && string.Equals(allFilesToScan[i + 1].StationName, item.StationName, StringComparison.OrdinalIgnoreCase))
                                    {
                                        var nextStart = TryParseFileTimestamp(Path.GetFileName(allFilesToScan[i + 1].FilePath), config.DisplayTimezone);
                                        if (nextStart.HasValue && nextStart.Value > startMs && (nextStart.Value - startMs) <= (30 * 60 * 1000L))
                                        {
                                            durationMs = nextStart.Value - startMs;
                                        }
                                    }
                                }

                                if (durationMs <= 0)
                                {
                                    int fallbackMin = Math.Max(1, config.Storage?.ChunkIntervalMinutes ?? 15);
                                    durationMs = fallbackMin * 60 * 1000L;
                                }

                                long endMs = startMs + durationMs;

                                batch.Add(new ChunkInsertItem(
                                    StationId: item.StationName,
                                    FilePath: item.FilePath,
                                    StartEpochMs: startMs,
                                    EndEpochMs: endMs,
                                    DurationMs: durationMs,
                                    FileSizeBytes: fileSize,
                                    Width: width > 0 ? width : 1920,
                                    Height: height > 0 ? height : 1080,
                                    Fps: fps > 0 ? fps : 30,
                                    HasAudio: hasAudio ? 1 : 0
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
                        _logger.LogWarning(ex, "[MAINTENANCE] Failed probing file '{Path}'.", item.FilePath);
                        errors++;
                    }
                }

                if (batch.Count >= 25)
                {
                    await FlushBatchAsync(batch);
                    batch.Clear();
                }

                int pct = total > 0 ? (int)Math.Min(99, (scanned * 100.0) / total) : 100;

                UpdateState(s => s with
                {
                    ProgressPercent = pct,
                    TotalFilesScanned = scanned,
                    NewlyIndexedCount = added,
                    SkippedCount = skipped,
                    ErrorsCount = errors,
                    CurrentTarget = item.StationName,
                    StatusMessage = $"Scanned {scanned}/{total} files ({added} indexed)"
                }, forceBroadcast: (scanned == total));
            }

            if (batch.Count > 0)
            {
                await FlushBatchAsync(batch);
            }

            UpdateState(s => s with
            {
                IsRunning = false,
                ProgressPercent = 100,
                TotalFilesScanned = scanned,
                NewlyIndexedCount = added,
                SkippedCount = skipped,
                ErrorsCount = errors,
                CurrentTarget = string.Empty,
                StatusMessage = $"Completed. Indexed {added} new file(s) with media probe.",
                CompletedAtUtc = DateTime.UtcNow
            }, forceBroadcast: true);

            _logger.LogInformation("[MAINTENANCE] Reindex finished. Scanned: {Scanned}, Added: {Added}, Skipped: {Skipped}", scanned, added, skipped);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "[MAINTENANCE] Critical failure during catalog scan.");
            UpdateState(s => s with
            {
                IsRunning = false,
                StatusMessage = $"Failed: {ex.Message}",
                CompletedAtUtc = DateTime.UtcNow
            }, forceBroadcast: true);
        }
    }

    private async Task FlushBatchAsync(List<ChunkInsertItem> batch)
    {
        using var db = _factory.CreateConnection();
        using var cmd = db.CreateCommand();
        cmd.CommandText = "PRAGMA busy_timeout = 30000;";
        cmd.ExecuteNonQuery();

        using var tx = db.BeginTransaction();

        // 💡 עדכון מלא ומדויק של start, end ו-duration גם ב-ON CONFLICT
        const string sql = @"
            INSERT INTO recording_chunks (
                station_id, file_path, start_epoch_ms, end_epoch_ms, 
                duration_ms, file_size_bytes, width, height, fps, has_audio, is_finalized, indexed_at_utc
            ) VALUES (
                @StationId, @FilePath, @StartEpochMs, @EndEpochMs, 
                @DurationMs, @FileSizeBytes, @Width, @Height, @Fps, @HasAudio, 1, @Now
            ) ON CONFLICT(file_path) DO UPDATE SET
                start_epoch_ms = excluded.start_epoch_ms,
                end_epoch_ms = excluded.end_epoch_ms,
                duration_ms = excluded.duration_ms,
                file_size_bytes = excluded.file_size_bytes,
                width = CASE WHEN excluded.width > 0 THEN excluded.width ELSE recording_chunks.width END,
                height = CASE WHEN excluded.height > 0 THEN excluded.height ELSE recording_chunks.height END,
                fps = CASE WHEN excluded.fps > 0 THEN excluded.fps ELSE recording_chunks.fps END,
                has_audio = excluded.has_audio,
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
                Now = now
            }, tx);
        }
        tx.Commit();
    }

    private async Task RunCatalogIntegrityAuditAsync(bool isSilentScheduled)
    {
        try
        {
            using var db = _factory.CreateConnection();
            var allChunks = (await db.QueryAsync<(long Id, string StationId, string FilePath, long StartEpochMs, long EndEpochMs, long DurationMs, long FileSizeBytes)>(@"
                SELECT id AS Id, station_id AS StationId, file_path AS FilePath,
                       start_epoch_ms AS StartEpochMs, end_epoch_ms AS EndEpochMs,
                       duration_ms AS DurationMs, file_size_bytes AS FileSizeBytes
                FROM recording_chunks
                ORDER BY start_epoch_ms DESC;")).ToList();

            int total = allChunks.Count;
            int scanned = 0;
            int repaired = 0;
            int pruned = 0;
            int skipped = 0;

            var toPruneIds = new List<long>();
            var toUpdateChunks = new List<object>();

            for (int i = 0; i < total; i++)
            {
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

                    // 1. קובץ שהוגדר באורך 15 דקות בדיוק (ערך ברירת מחדל שעלול להיות שגוי בעת הפסקה מוקדמת)
                    if (chunk.DurationMs == 900000)
                    {
                        needsProbe = true;
                    }
                    // 2. קובץ קטן יחסית שאינו תואם למשך המוצהר (קובץ של פחות מ-70MB לא יכול להימשך 15 דקות)
                    else if (fi.Length < 70_000_000 && chunk.DurationMs > 300_000)
                    {
                        needsProbe = true;
                    }
                    // 3. אי-התאמה בין start, end ל-duration הרשום
                    else if (Math.Abs((chunk.EndEpochMs - chunk.StartEpochMs) - chunk.DurationMs) > 1000)
                    {
                        needsProbe = true;
                    }
                    // 4. שינוי משמעותי בגודל הקובץ מאז שנרשם
                    else if (Math.Abs(fi.Length - chunk.FileSizeBytes) > 1_000_000)
                    {
                        needsProbe = true;
                    }

                    if (needsProbe)
                    {
                        var probe = await _probeService.ProbeFileAsync(chunk.FilePath, CancellationToken.None);
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
                                    Fps = probe.Fps > 0 ? (int)Math.Round(probe.Fps) : 30,
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

                if (!isSilentScheduled && (scanned % 15 == 0 || scanned == total))
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
                            has_audio = @Audio
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
        int HasAudio
    );
}