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
using ITB_SCREEN_RECORDER.Core.Contracts.Storage;
using ITB_SCREEN_RECORDER.Server.Data;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

public record ReindexProgressReport(
    bool IsRunning,
    int ProgressPercent,
    int TotalFilesScanned,
    int NewlyIndexedCount,
    int SkippedCount,
    int ErrorsCount,
    string CurrentTarget,
    string StatusMessage,
    DateTime? StartedAtUtc = null,
    DateTime? CompletedAtUtc = null
);

public interface IStorageScannerService
{
    // HOT PATH (used by Extractor and Timeline - high performance, queries SQLite catalog directly)
    Task<List<string>> GetAvailableHostsAsync(DateTime startUtc, DateTime endUtc);
    Task<IReadOnlyList<ChunkFinalizedEvent>> GetStationChunksAsync(string stationId, DateTime startUtc, DateTime endUtc);

    // COLD PATH (maintenance, storage synchronization, and indexing against physical disk)
    Task<ReindexProgressReport> StartReindexAsync(bool forceFullRecheck = false, CancellationToken ct = default);
    ReindexProgressReport GetCurrentReindexProgress();
}

public class StorageScannerService : IStorageScannerService
{
    private readonly ICatalogRepository _catalogRepo;
    private readonly ICatalogConnectionFactory _factory;
    private readonly IVideoProbeService _probeService;
    private readonly StoragePathResolver _storageResolver;
    private readonly IOptionsMonitor<SystemConfig> _configMonitor;
    private readonly ILogger<StorageScannerService> _logger;

    private readonly SemaphoreSlim _reindexLock = new(1, 1);
    private ReindexProgressReport _lastProgress = new(
        IsRunning: false,
        ProgressPercent: 0,
        TotalFilesScanned: 0,
        NewlyIndexedCount: 0,
        SkippedCount: 0,
        ErrorsCount: 0,
        CurrentTarget: string.Empty,
        StatusMessage: "System Idle"
    );

    internal static readonly HashSet<string> ReservedDirNames = new(StringComparer.OrdinalIgnoreCase)
    {
        "logs", "export", "exports", "recordingsbuffer", "buffer", "temp", ".git",
        ".snapshot", "~snapshot", ".zfs", "$RECYCLE.BIN", "System Volume Information", "lost+found", "@Recycle"
    };

    private static readonly HashSet<string> SupportedExtensions = new(StringComparer.OrdinalIgnoreCase)
    {
        ".mp4", ".fmp4", ".flv", ".mkv", ".ts", ".mov"
    };

    public StorageScannerService(
        ICatalogRepository catalogRepo,
        ICatalogConnectionFactory factory,
        IVideoProbeService probeService,
        StoragePathResolver storageResolver,
        IOptionsMonitor<SystemConfig> configMonitor,
        ILogger<StorageScannerService> logger)
    {
        _catalogRepo = catalogRepo;
        _factory = factory;
        _probeService = probeService;
        _storageResolver = storageResolver;
        _configMonitor = configMonitor;
        _logger = logger;
    }

    #region HOT PATH (Zero Disk I/O, Sub-millisecond SQLite queries)

    public async Task<List<string>> GetAvailableHostsAsync(DateTime startUtc, DateTime endUtc)
    {
        long startMs = new DateTimeOffset(startUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();
        long endMs = new DateTimeOffset(endUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();

        using var db = _factory.CreateConnection();
        const string sql = @"
            SELECT DISTINCT station_id 
            FROM recording_chunks 
            WHERE end_epoch_ms >= @startMs AND start_epoch_ms <= @endMs
            UNION
            SELECT hostname FROM station_overrides
            ORDER BY 1 ASC;
        ";

        var result = await db.QueryAsync<string>(sql, new { startMs, endMs });
        return result.AsList();
    }

    public async Task<IReadOnlyList<ChunkFinalizedEvent>> GetStationChunksAsync(string stationId, DateTime startUtc, DateTime endUtc)
    {
        long startMs = new DateTimeOffset(startUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();
        long endMs = new DateTimeOffset(endUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();

        return await _catalogRepo.GetChunksForWindowAsync(stationId, startMs, endMs);
    }

    #endregion

    #region COLD PATH (Disk Scanning, FFprobe, and SQLite Delta Backfill)

    public ReindexProgressReport GetCurrentReindexProgress() => _lastProgress;

    public async Task<ReindexProgressReport> StartReindexAsync(bool forceFullRecheck = false, CancellationToken ct = default)
    {
        if (!await _reindexLock.WaitAsync(0, ct))
        {
            return _lastProgress with { StatusMessage = "Re-indexing task is already running in background." };
        }

        _lastProgress = new ReindexProgressReport(
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
                await ExecuteStorageReindexAsync(forceFullRecheck, ct);
            }
            finally
            {
                _reindexLock.Release();
            }
        }, ct);

        return _lastProgress;
    }

    private async Task ExecuteStorageReindexAsync(bool forceFullRecheck, CancellationToken ct)
    {
        var config = _configMonitor.CurrentValue;
        string root = await _storageResolver.ResolveActiveRootAsync(config.Storage, _logger);

        _logger.LogInformation("[STORAGE INDEXER] Starting cold reindex scan on directory: '{Root}'", root);

        if (!Directory.Exists(root))
        {
            _lastProgress = _lastProgress with
            {
                IsRunning = false,
                StatusMessage = "Storage root directory unavailable.",
                CompletedAtUtc = DateTime.UtcNow
            };
            return;
        }

        try
        {
            HashSet<string> existingDbFiles;
            using (var db = _factory.CreateConnection())
            {
                var files = await db.QueryAsync<string>("SELECT file_path FROM recording_chunks;");
                existingDbFiles = new HashSet<string>(files, StringComparer.OrdinalIgnoreCase);
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

            // Pre-collect all matching files to calculate accurate progress percentage
            var allFilesToScan = new List<(string StationName, string FilePath)>();
            foreach (var stationPath in candidateStationDirs)
            {
                string stationName = Path.GetFileName(stationPath);
                var dirFiles = Directory.GetFiles(stationPath, "*.*", SearchOption.AllDirectories)
                    .Where(f => SupportedExtensions.Contains(Path.GetExtension(f)));

                foreach (var f in dirFiles)
                {
                    allFilesToScan.Add((stationName, f));
                }
            }

            int totalFiles = allFilesToScan.Count;
            int scanned = 0, skipped = 0, indexed = 0, errors = 0;
            var newChunksToInsert = new List<ChunkFinalizedEvent>();

            foreach (var item in allFilesToScan)
            {
                if (ct.IsCancellationRequested) break;
                scanned++;

                if (!forceFullRecheck && existingDbFiles.Contains(item.FilePath))
                {
                    skipped++;
                }
                else
                {
                    try
                    {
                        var chunkEvent = await BuildChunkMetadataAsync(item.StationName, item.FilePath, config, ct);
                        if (chunkEvent.HasValue)
                        {
                            newChunksToInsert.Add(chunkEvent.Value);
                            indexed++;
                            existingDbFiles.Add(item.FilePath);

                            if (newChunksToInsert.Count >= 50)
                            {
                                await _catalogRepo.BulkUpsertChunksAsync(newChunksToInsert);
                                newChunksToInsert.Clear();
                            }
                        }
                        else
                        {
                            errors++;
                        }
                    }
                    catch
                    {
                        errors++;
                    }
                }

                int percent = totalFiles > 0 ? (int)Math.Min(99, (scanned * 100.0) / totalFiles) : 100;
                if (scanned % 10 == 0 || scanned == totalFiles)
                {
                    _lastProgress = _lastProgress with
                    {
                        ProgressPercent = percent,
                        TotalFilesScanned = scanned,
                        NewlyIndexedCount = indexed,
                        SkippedCount = skipped,
                        ErrorsCount = errors,
                        CurrentTarget = item.StationName,
                        StatusMessage = $"Scanned {scanned}/{totalFiles} files ({indexed} added)"
                    };
                }
            }

            if (newChunksToInsert.Count > 0)
            {
                await _catalogRepo.BulkUpsertChunksAsync(newChunksToInsert);
                newChunksToInsert.Clear();
            }

            _lastProgress = _lastProgress with
            {
                IsRunning = false,
                ProgressPercent = 100,
                TotalFilesScanned = scanned,
                NewlyIndexedCount = indexed,
                SkippedCount = skipped,
                ErrorsCount = errors,
                CurrentTarget = string.Empty,
                StatusMessage = $"Scan completed. Indexed {indexed} new file(s).",
                CompletedAtUtc = DateTime.UtcNow
            };

            _logger.LogInformation("[STORAGE INDEXER] Reindex finished. Total: {Found}, Indexed: {Indexed}, Skipped: {Skipped}",
                totalFiles, indexed, skipped);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "[STORAGE INDEXER] Error during storage reindex process.");
            _lastProgress = _lastProgress with
            {
                IsRunning = false,
                StatusMessage = $"Failed: {ex.Message}",
                CompletedAtUtc = DateTime.UtcNow
            };
        }
    }

    private async Task<ChunkFinalizedEvent?> BuildChunkMetadataAsync(
        string stationId,
        string filePath,
        SystemConfig config,
        CancellationToken ct)
    {
        var fileInfo = new FileInfo(filePath);
        if (fileInfo.Length < 1024) return null;

        long startEpochMs = TryParseStartEpoch(fileInfo.Name, fileInfo.CreationTimeUtc, config.DisplayTimezone);
        if (startEpochMs <= 0) return null;

        var probe = await _probeService.ProbeFileAsync(filePath, ct);

        // If validation probe fails or duration is near zero, file is corrupted or truncated. Do not index as an arbitrary default duration!
        if (probe == null || probe.DurationSeconds <= 0.05)
        {
            _logger.LogWarning("[STORAGE INDEXER] Skipping corrupt or zero-duration media file: '{Path}'", filePath);
            return null;
        }

        long endEpochMs = startEpochMs + (long)Math.Round(probe.DurationSeconds * 1000.0);
        int width = probe.Width > 0 ? probe.Width : 1920;
        int height = probe.Height > 0 ? probe.Height : 1080;
        int fps = probe.Fps > 0 ? probe.Fps : (config.DefaultTargetFps > 0 ? config.DefaultTargetFps : 30);
        bool hasAudio = probe.HasAudio;

        string displayId = "mon-0";
        string? parentDir = Path.GetFileName(Path.GetDirectoryName(filePath));
        if (!string.IsNullOrEmpty(parentDir) && (parentDir.StartsWith("mon-", StringComparison.OrdinalIgnoreCase) || parentDir.StartsWith("display-", StringComparison.OrdinalIgnoreCase)))
        {
            displayId = parentDir.ToLowerInvariant();
        }

        return new ChunkFinalizedEvent(
            StationId: stationId,
            FilePath: fileInfo.FullName,
            StartEpochMs: startEpochMs,
            EndEpochMs: endEpochMs,
            FileSizeBytes: fileInfo.Length,
            IsFinalized: true,
            Width: width,
            Height: height,
            Fps: fps,
            HasAudio: hasAudio,
            DisplayId: displayId
        );
    }

    internal static long TryParseStartEpoch(string fileName, DateTime fallbackCreationTimeUtc, string? configuredTzId)
    {
        string nameOnly = Path.GetFileNameWithoutExtension(fileName);

        // 1. Direct millisecond Epoch pattern (13 digits, e.g. 1791583050601)
        var matchDirectMs = Regex.Match(nameOnly, @"^(\d{13})$");
        if (matchDirectMs.Success && long.TryParse(matchDirectMs.Groups[1].Value, out long directMs))
        {
            return directMs;
        }

        // 2. Epoch pattern with seconds and microseconds from MediaMTX (e.g. 1791582402_381843)
        var matchEpoch = Regex.Match(nameOnly, @"(?:^|[_-])(?<sec>\d{10})(?:[_-](?<micro>\d{1,6}))?");
        if (matchEpoch.Success && long.TryParse(matchEpoch.Groups["sec"].Value, out long sec))
        {
            long ms = sec * 1000;
            if (matchEpoch.Groups["micro"].Success && long.TryParse(matchEpoch.Groups["micro"].Value, out long micro))
            {
                ms += (micro / 1000);
            }
            return ms;
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

        var match1 = Regex.Match(nameOnly, @"(\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2})");
        if (match1.Success && DateTime.TryParseExact(match1.Groups[1].Value, "yyyy-MM-dd_HH-mm-ss",
            CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime parsedLocal))
        {
            DateTime utc = TimeZoneInfo.ConvertTimeToUtc(parsedLocal, tz);
            return new DateTimeOffset(utc, TimeSpan.Zero).ToUnixTimeMilliseconds();
        }

        var match2 = Regex.Match(nameOnly, @"(\d{8}_\d{6})");
        if (match2.Success && DateTime.TryParseExact(match2.Groups[1].Value, "yyyyMMdd_HHmmss",
            CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal | DateTimeStyles.AdjustToUniversal, out DateTime dt2))
        {
            return new DateTimeOffset(dt2, TimeSpan.Zero).ToUnixTimeMilliseconds();
        }

        return new DateTimeOffset(fallbackCreationTimeUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();
    }

    #endregion
}