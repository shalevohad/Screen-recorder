namespace ITB_SCREEN_RECORDER.Server.Services;

using System;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

public class RecordingChunkScheduler : BackgroundService
{
    private readonly IOptionsMonitor<SystemConfig> _configMonitor;
    private readonly StoragePathResolver _storageResolver;
    private readonly MediaMtxApiClient _apiClient;
    private readonly EventLogger _eventLogger;
    private readonly ILogger<RecordingChunkScheduler> _logger;
    private readonly IDisposable? _configChangeSubscription;

    private string? _lastAppliedRoot;
    private string? _lastAppliedTimezone;

    public RecordingChunkScheduler(
        IOptionsMonitor<SystemConfig> configMonitor,
        StoragePathResolver storageResolver,
        MediaMtxApiClient apiClient,
        EventLogger eventLogger,
        ILogger<RecordingChunkScheduler> logger)
    {
        _configMonitor = configMonitor;
        _storageResolver = storageResolver;
        _apiClient = apiClient;
        _eventLogger = eventLogger;
        _logger = logger;

        // תיקון סעיף 9: האזנה לעדכון נתיבי אחסון בזמן אמת ללא צורך באיתחול שירות
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

        // החלת תצורה ראשונית על MediaMTX
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
                await OnBoundaryReachedAsync(stoppingToken).ConfigureAwait(false);
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

    private async Task OnBoundaryReachedAsync(CancellationToken stoppingToken)
    {
        SystemConfig config = _configMonitor.CurrentValue;

        // וידוא שהגדרות האחסון מסונכרנות לפני חיתוך
        await ApplyMediaMtxStorageConfigAsync(config, stoppingToken).ConfigureAwait(false);

        string root = await _storageResolver.ResolveActiveRootAsync(config.Storage, _logger).ConfigureAwait(false);
        var activePaths = await _apiClient.GetActivePathNamesAsync(config.MediaMtx.ApiPort, stoppingToken).ConfigureAwait(false);

        foreach (string path in activePaths)
        {
            bool rotated = await _apiClient.RotatePathRecordingAsync(config.MediaMtx.ApiPort, path, stoppingToken).ConfigureAwait(false);
            await _eventLogger.LogChunkCutAsync(config.Storage.ChunkEventLogPath, path, root, rotated, stoppingToken).ConfigureAwait(false);
        }

        if (activePaths.Count > 0)
        {
            _logger.LogInformation("[CHUNK SCHEDULER] Rotated {Count} active recording(s) at clock boundary.", activePaths.Count);
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