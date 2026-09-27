namespace ITB_SCREEN_RECORDER.Server.Services;

using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Contracts.Storage;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

public class RecordingChunkScheduler : BackgroundService
{
    private readonly IOptionsMonitor<SystemConfig> _configMonitor;
    private readonly StoragePathResolver _storageResolver;
    private readonly MediaMtxApiClient _apiClient;
    private readonly EventLogger _eventLogger;
    private readonly ICatalogRepository _catalogRepository;
    private readonly ILogger<RecordingChunkScheduler> _logger;
    private readonly IDisposable? _configChangeSubscription;

    private string? _lastAppliedRoot;
    private string? _lastAppliedTimezone;

    public RecordingChunkScheduler(
        IOptionsMonitor<SystemConfig> configMonitor,
        StoragePathResolver storageResolver,
        MediaMtxApiClient apiClient,
        EventLogger eventLogger,
        ICatalogRepository catalogRepository,
        ILogger<RecordingChunkScheduler> logger)
    {
        _configMonitor = configMonitor;
        _storageResolver = storageResolver;
        _apiClient = apiClient;
        _eventLogger = eventLogger;
        _catalogRepository = catalogRepository;
        _logger = logger;

        _configChangeSubscription = _configMonitor.OnChange(async newConfig =>
        {
            _logger.LogInformation("[CHUNK SCHEDULER] Live configuration change detected. Applying to MediaMTX immediately...");
            try
            {
                await ApplyMediaMtxStorageConfigAsync(newConfig, CancellationToken.None).ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[CHUNK SCHEDULER] Failed to apply live storage configuration update to MediaMTX.");
            }
        });
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("[CHUNK SCHEDULER] Recording chunk scheduler starting...");

        await ApplyMediaMtxStorageConfigAsync(_configMonitor.CurrentValue, stoppingToken).ConfigureAwait(false);

        while (!stoppingToken.IsCancellationRequested)
        {
            int intervalMinutes = Math.Max(1, _configMonitor.CurrentValue.Storage.ChunkIntervalMinutes);
            DateTime nextBoundaryUtc = ComputeNextBoundaryUtc(DateTime.UtcNow, intervalMinutes);
            TimeSpan delay = nextBoundaryUtc - DateTime.UtcNow;

            try
            {
                if (delay > TimeSpan.Zero)
                {
                    await Task.Delay(delay, stoppingToken).ConfigureAwait(false);
                }
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                break;
            }

            if (stoppingToken.IsCancellationRequested) break;

            try
            {
                await OnBoundaryReachedAsync(nextBoundaryUtc, stoppingToken).ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[CHUNK SCHEDULER] Unhandled error while rotating recordings at a chunk boundary.");
            }
        }
    }

    private async Task ApplyMediaMtxStorageConfigAsync(SystemConfig config, CancellationToken ct)
    {
        string root = await _storageResolver.ResolveActiveRootAsync(config.Storage, _logger).ConfigureAwait(false);
        string currentTimezone = config.MediaMtx?.Timezone ?? "UTC";

        string recordPath = _storageResolver.BuildRecordPath(root, config);
        string recordFormat = string.IsNullOrWhiteSpace(config.Storage.RecordFormat)
            ? "fmp4"
            : config.Storage.RecordFormat.Trim().ToLowerInvariant();

        string chunkDuration = $"{config.Storage.ChunkIntervalMinutes}m";
        string retentionHours = $"{config.Storage.RetentionDays * 24}h";

        bool applied = await _apiClient.PatchPathDefaultsAsync(
            config.MediaMtx.ApiPort,
            recordPath,
            recordFormat,
            chunkDuration,
            retentionHours,
            ct).ConfigureAwait(false);

        if (applied)
        {
            _lastAppliedRoot = root;
            _lastAppliedTimezone = currentTimezone;
            _logger.LogInformation("[CHUNK SCHEDULER] MediaMTX patched live: Root='{Root}', Path='{RecordPath}', Format='{Format}', Chunk='{Chunk}'",
                root, recordPath, recordFormat, chunkDuration);
        }
    }

    private async Task OnBoundaryReachedAsync(DateTime boundaryUtc, CancellationToken stoppingToken)
    {
        SystemConfig config = _configMonitor.CurrentValue;

        await ApplyMediaMtxStorageConfigAsync(config, stoppingToken).ConfigureAwait(false);

        string root = await _storageResolver.ResolveActiveRootAsync(config.Storage, _logger).ConfigureAwait(false);
        var activePaths = await _apiClient.GetActivePathNamesAsync(config.MediaMtx.ApiPort, stoppingToken).ConfigureAwait(false);

        var finalizedChunksToIndex = new List<ChunkFinalizedEvent>();

        foreach (string path in activePaths)
        {
            bool rotated = await _apiClient.RotatePathRecordingAsync(config.MediaMtx.ApiPort, path, stoppingToken).ConfigureAwait(false);
            await _eventLogger.LogChunkCutAsync(config.Storage.ChunkEventLogPath, path, root, rotated, stoppingToken).ConfigureAwait(false);

            if (rotated)
            {
                // איתור הקובץ שנסגר ואינדוקסו
                var chunkEvent = await TryResolveFinalizedChunkAsync(root, path, config, boundaryUtc, stoppingToken).ConfigureAwait(false);
                if (chunkEvent.HasValue)
                {
                    finalizedChunksToIndex.Add(chunkEvent.Value);
                }
            }
        }

        if (finalizedChunksToIndex.Count > 0)
        {
            await _catalogRepository.BulkUpsertChunksAsync(finalizedChunksToIndex).ConfigureAwait(false);
            _logger.LogInformation("[CHUNK SCHEDULER] Indexed {Count} finalized chunk(s) into SQLite system_catalog.db.", finalizedChunksToIndex.Count);
        }

        if (activePaths.Count > 0)
        {
            _logger.LogInformation("[CHUNK SCHEDULER] Rotated {Count} active recording(s) at clock boundary.", activePaths.Count);
        }
    }

    private async Task<ChunkFinalizedEvent?> TryResolveFinalizedChunkAsync(
        string root,
        string stationPath,
        SystemConfig config,
        DateTime boundaryUtc,
        CancellationToken ct)
    {
        try
        {
            // השהיה קצרה לשחרור אטומי של ה-File Lock ע"י MediaMTX
            await Task.Delay(350, ct).ConfigureAwait(false);

            string stationDir = Path.Combine(root, stationPath);
            if (!Directory.Exists(stationDir)) return null;

            string format = string.IsNullOrWhiteSpace(config.Storage.RecordFormat) ? "fmp4" : config.Storage.RecordFormat.Trim().ToLowerInvariant();
            var dirInfo = new DirectoryInfo(stationDir);

            // שליפת הקובץ האחרון שנכתב (למעט קבצים ריקים)
            var lastClosedFile = dirInfo.GetFiles($"*.{format}")
                .OrderByDescending(f => f.LastWriteTimeUtc)
                .FirstOrDefault(f => f.Length > 0);

            if (lastClosedFile == null) return null;

            long startEpochMs;
            long endEpochMs = new DateTimeOffset(boundaryUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();

            // חילוץ זמן ההתחלה מתוך תבנית השם (למשל: 20260924_114500)
            string fileNameWithoutExt = Path.GetFileNameWithoutExtension(lastClosedFile.Name);
            if (fileNameWithoutExt.Length >= 15 &&
                DateTime.TryParseExact(fileNameWithoutExt.Substring(0, 15), "yyyyMMdd_HHmmss", CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal | DateTimeStyles.AdjustToUniversal, out DateTime parsedStartUtc))
            {
                startEpochMs = new DateTimeOffset(parsedStartUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();
            }
            else
            {
                int intervalMinutes = Math.Max(1, config.Storage.ChunkIntervalMinutes);
                startEpochMs = endEpochMs - (intervalMinutes * 60 * 1000);
            }

            return new ChunkFinalizedEvent(
                StationId: stationPath,
                FilePath: lastClosedFile.FullName,
                StartEpochMs: startEpochMs,
                EndEpochMs: endEpochMs,
                FileSizeBytes: lastClosedFile.Length,
                IsFinalized: true
            );
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "[CHUNK SCHEDULER] Could not parse finalized chunk file metadata for station '{Station}'.", stationPath);
            return null;
        }
    }

    internal static DateTime ComputeNextBoundaryUtc(DateTime nowUtc, int intervalMinutes)
    {
        int minutesSinceMidnight = nowUtc.Hour * 60 + nowUtc.Minute;
        int currentBucketStart = minutesSinceMidnight - (minutesSinceMidnight % intervalMinutes);
        return nowUtc.Date.AddMinutes(currentBucketStart + intervalMinutes);
    }

    public override void Dispose()
    {
        _configChangeSubscription?.Dispose();
        base.Dispose();
    }
}