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
    Task<object> GetCatalogStatsAsync();
}

public class CatalogMaintenanceService : BackgroundService, ICatalogMaintenanceService
{
    private readonly ICatalogConnectionFactory _factory;
    private readonly ICatalogRepository _catalogRepo;
    private readonly StoragePathResolver _storageResolver;
    private readonly IOptionsMonitor<SystemConfig> _configMonitor;
    private readonly TelemetryBroadcastService _broadcastService;
    private readonly IVideoProbeService _probeService;
    private readonly ILogger<CatalogMaintenanceService> _logger;

    private readonly SemaphoreSlim _jobLock = new(1, 1);
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

    private static readonly Regex UniversalChunkRegex = new(
        @"(?:^(?<host>[a-zA-Z0-9_\-\.]+?)[_-])?(?<year>20\d{2})[-_]?(?<month>\d{2})[-_]?(?<day>\d{2})[-_T](?<hour>\d{2})[-_:]?(?<minute>\d{2})[-_:]?(?<sec>\d{2})(?:[_\-\.]\d+)?(?<utc>Z)?\.(mp4|fmp4|flv|mkv|ts)$",
        RegexOptions.Compiled | RegexOptions.IgnoreCase);

    public CatalogMaintenanceService(
        ICatalogConnectionFactory factory,
        ICatalogRepository catalogRepo,
        StoragePathResolver storageResolver,
        IOptionsMonitor<SystemConfig> configMonitor,
        TelemetryBroadcastService broadcastService,
        IVideoProbeService probeService,
        ILogger<CatalogMaintenanceService> logger)
    {
        _factory = factory;
        _catalogRepo = catalogRepo;
        _storageResolver = storageResolver;
        _configMonitor = configMonitor;
        _broadcastService = broadcastService;
        _probeService = probeService;
        _logger = logger;
    }

    public MaintenanceJobState GetCurrentJobState() => _state;

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
            activeJob = _state
        };
    }

    public async Task<MaintenanceJobState> TriggerReindexAsync(bool forceFullRecheck = false)
    {
        if (!await _jobLock.WaitAsync(0))
        {
            return _state;
        }

        string jobId = Guid.NewGuid().ToString("N")[..8];
        _state = new MaintenanceJobState(
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
        );

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

        return _state;
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
            });
            return;
        }

        try
        {
            // שליפת כל הקבצים שכבר מאונדקסים עם רוחב וגובה תקינים (width > 0)
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
                    .Where(f => VideoExtensions.Contains(Path.GetExtension(f)));

                foreach (var f in dirFiles)
                {
                    allFilesToScan.Add((stationName, f));
                }
            }

            int total = allFilesToScan.Count;
            int scanned = 0, added = 0, skipped = 0, errors = 0;
            var batch = new List<ChunkInsertItem>();

            foreach (var item in allFilesToScan)
            {
                scanned++;

                // אם לא נדרש Full Recheck והקובץ כבר קיים ב-DB עם נתוני וידאו תקינים - מדלגים
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
                                // דגימה מדויקת באמצעות FFprobe
                                var probe = await _probeService.ProbeFileAsync(item.FilePath, CancellationToken.None);

                                int width = 0;
                                int height = 0;
                                int fps = 0;
                                bool hasAudio = false;
                                long durationMs;

                                if (probe != null && probe.DurationSeconds > 0)
                                {
                                    durationMs = (long)Math.Round(probe.DurationSeconds * 1000.0);
                                    width = probe.Width;
                                    height = probe.Height;
                                    fps = probe.Fps;
                                    hasAudio = probe.HasAudio;
                                }
                                else
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
                                    Width: width,
                                    Height: height,
                                    Fps: fps,
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
                if (!isSilentScheduled || scanned % 50 == 0 || scanned == total)
                {
                    UpdateState(s => s with
                    {
                        ProgressPercent = pct,
                        TotalFilesScanned = scanned,
                        NewlyIndexedCount = added,
                        SkippedCount = skipped,
                        ErrorsCount = errors,
                        CurrentTarget = item.StationName,
                        StatusMessage = $"Scanned {scanned}/{total} files ({added} indexed with probe)"
                    });
                }
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
            });

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
            });
        }
    }

    private async Task FlushBatchAsync(List<ChunkInsertItem> batch)
    {
        using var db = _factory.CreateConnection();
        using var tx = db.BeginTransaction();
        const string sql = @"
            INSERT INTO recording_chunks (
                station_id, file_path, start_epoch_ms, end_epoch_ms, 
                duration_ms, file_size_bytes, width, height, fps, has_audio, is_finalized, indexed_at_utc
            ) VALUES (
                @StationId, @FilePath, @StartEpochMs, @EndEpochMs, 
                @DurationMs, @FileSizeBytes, @Width, @Height, @Fps, @HasAudio, 1, @Now
            ) ON CONFLICT(file_path) DO UPDATE SET
                duration_ms = excluded.duration_ms,
                width = excluded.width,
                height = excluded.height,
                fps = excluded.fps,
                has_audio = excluded.has_audio;";

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

    private void UpdateState(Func<MaintenanceJobState, MaintenanceJobState> update)
    {
        _state = update(_state);
        _ = _broadcastService.BroadcastServerTelemetryAsync(new { maintenanceJob = _state });
    }

    private static long? TryParseFileTimestamp(string fileName, string? configuredTzId)
    {
        var match = UniversalChunkRegex.Match(fileName);
        if (!match.Success) return null;

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