// ==========================================
// File: Server/Services/RecordingChunkScheduler.cs
// ==========================================
namespace ITB_SCREEN_RECORDER.Server.Services;

using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
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
    private readonly ITelemetryStateService _telemetryState;
    private readonly ILogger<RecordingChunkScheduler> _logger;
    private readonly IDisposable? _configChangeSubscription;

    public RecordingChunkScheduler(
        IOptionsMonitor<SystemConfig> configMonitor,
        StoragePathResolver storageResolver,
        MediaMtxApiClient apiClient,
        EventLogger eventLogger,
        ICatalogRepository catalogRepository,
        ITelemetryStateService telemetryState,
        ILogger<RecordingChunkScheduler> logger)
    {
        _configMonitor = configMonitor;
        _storageResolver = storageResolver;
        _apiClient = apiClient;
        _eventLogger = eventLogger;
        _catalogRepository = catalogRepository;
        _telemetryState = telemetryState;
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
        _logger.LogInformation("[CHUNK SCHEDULER] Recording chunk scheduler starting with SQLite-backed catalog...");

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
                _logger.LogError(ex, "[CHUNK SCHEDULER] Unhandled error while rotating recordings at clock boundary.");
            }
        }
    }

    private async Task ApplyMediaMtxStorageConfigAsync(SystemConfig config, CancellationToken ct)
    {
        string root = await _storageResolver.ResolveActiveRootAsync(config.Storage, _logger).ConfigureAwait(false);
        string cleanRoot = root.Replace('\\', '/').TrimEnd('/');

        // 💡 שימוש בתבנית Epoch (%s_%f) למניעת בעיות אזורי זמן ושעוני מערכת הפעלה
        string recordPath = $"{cleanRoot}/%path/%s_%f";
        string recordFormat = string.IsNullOrWhiteSpace(config.Storage.RecordFormat) ? "fmp4" : config.Storage.RecordFormat.Trim().ToLowerInvariant();
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
            _logger.LogInformation("[CHUNK SCHEDULER] MediaMTX patched live with Epoch path: Root='{Root}', Path='{RecordPath}', Format='{Format}', Chunk='{Chunk}'",
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
            _logger.LogInformation("[CHUNK SCHEDULER] Indexed {Count} finalized chunk(s) into SQLite system_catalog.db using live telemetry.", finalizedChunksToIndex.Count);
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
            await Task.Delay(400, ct).ConfigureAwait(false);

            string stationDir = Path.Combine(root, stationPath);
            if (!Directory.Exists(stationDir))
            {
                string altStationDir = Path.Combine(root, "live", stationPath);
                if (Directory.Exists(altStationDir)) stationDir = altStationDir;
                else return null;
            }

            var dirInfo = new DirectoryInfo(stationDir);
            var supportedExtensions = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { ".mp4", ".fmp4", ".flv", ".mkv", ".ts" };

            var lastClosedFile = dirInfo.GetFiles("*.*")
                .Where(f => supportedExtensions.Contains(f.Extension))
                .OrderByDescending(f => f.LastWriteTimeUtc)
                .FirstOrDefault(f => f.Length > 0);

            if (lastClosedFile == null) return null;

            long startEpochMs = 0;
            long endEpochMs = new DateTimeOffset(boundaryUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();

            // 1. קריאת מטא-דאטה מוטבע מתוך הקובץ (In-Band Metadata) כעדיפות עליונה
            var fileMeta = TryExtractFileMetadata(lastClosedFile.FullName);
            if (fileMeta.HasValue)
            {
                startEpochMs = fileMeta.Value.StartEpochMs;
                if (fileMeta.Value.DurationMs > 0)
                {
                    endEpochMs = startEpochMs + fileMeta.Value.DurationMs;
                }
            }

            // 2. אם המטא-דאטה לא זמין, חילוץ משם הקובץ (Epoch או תאריך)
            if (startEpochMs <= 0)
            {
                string fileNameWithoutExt = Path.GetFileNameWithoutExtension(lastClosedFile.Name);

                // א. בדיקת תבנית Epoch (%s_%f או %s)
                var matchEpoch = Regex.Match(fileNameWithoutExt, @"(?:^|[_-])(?<sec>\d{10})(?:[_-](?<micro>\d{1,6}))?");
                if (matchEpoch.Success && long.TryParse(matchEpoch.Groups["sec"].Value, out long sec))
                {
                    long ms = sec * 1000;
                    if (matchEpoch.Groups["micro"].Success && long.TryParse(matchEpoch.Groups["micro"].Value, out long micro))
                    {
                        ms += (micro / 1000);
                    }
                    startEpochMs = ms;
                }
                else
                {
                    // ב. בדיקת תבניות תאריך קודמות
                    var matchHyphen = Regex.Match(fileNameWithoutExt, @"(\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}(?:-\d+)?)");
                    var matchCompact = Regex.Match(fileNameWithoutExt, @"(\d{8}_\d{6})");

                    if (matchHyphen.Success)
                    {
                        string rawDate = matchHyphen.Groups[1].Value;
                        if (DateTime.TryParseExact(rawDate.Length > 19 ? rawDate.Substring(0, 19) : rawDate,
                            "yyyy-MM-dd_HH-mm-ss", CultureInfo.InvariantCulture, DateTimeStyles.AssumeLocal, out DateTime localDt))
                        {
                            startEpochMs = new DateTimeOffset(localDt).ToUnixTimeMilliseconds();
                        }
                    }
                    else if (matchCompact.Success && DateTime.TryParseExact(matchCompact.Groups[1].Value, "yyyyMMdd_HHmmss",
                        CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal | DateTimeStyles.AdjustToUniversal, out DateTime parsedStartUtc))
                    {
                        startEpochMs = new DateTimeOffset(parsedStartUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();
                    }
                }
            }

            // ג. ברירת מחדל אם טרם חולץ
            int intervalMinutes = Math.Max(1, config.Storage.ChunkIntervalMinutes);
            if (startEpochMs <= 0)
            {
                startEpochMs = endEpochMs - (intervalMinutes * 60 * 1000);
            }
            if (endEpochMs <= startEpochMs)
            {
                endEpochMs = startEpochMs + (intervalMinutes * 60 * 1000);
            }

            string stationName = Path.GetFileName(stationPath);
            var (width, height, fps, hasAudio) = ResolveTelemetryMetadata(stationName, config);

            return new ChunkFinalizedEvent(
                StationId: stationName,
                FilePath: lastClosedFile.FullName,
                StartEpochMs: startEpochMs,
                EndEpochMs: endEpochMs,
                FileSizeBytes: lastClosedFile.Length,
                IsFinalized: true,
                Width: width,
                Height: height,
                Fps: fps,
                HasAudio: hasAudio
            );
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "[CHUNK SCHEDULER] Could not parse chunk file metadata for station '{Station}'.", stationPath);
            return null;
        }
    }

    private static (long StartEpochMs, long DurationMs)? TryExtractFileMetadata(string filePath)
    {
        try
        {
            using var fs = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite | FileShare.Delete);
            byte[] buffer = new byte[65536];
            int read = fs.Read(buffer, 0, buffer.Length);
            if (read < 32) return null;

            string headerText = Encoding.ASCII.GetString(buffer, 0, read);

            // בדיקת תגית ITB_EPOCH:1759583561000 שהוטבעה ע"י הסוכן
            var matchEpoch = Regex.Match(headerText, @"ITB_EPOCH:(\d{10,13})");
            if (matchEpoch.Success && long.TryParse(matchEpoch.Groups[1].Value, out long epoch))
            {
                long startMs = epoch < 100000000000L ? epoch * 1000 : epoch;
                return (startMs, 0);
            }

            // בדיקת תגית itb_start_epoch_ms
            var matchStartEpoch = Regex.Match(headerText, @"itb_start_epoch_ms[^\d]*(\d{10,13})");
            if (matchStartEpoch.Success && long.TryParse(matchStartEpoch.Groups[1].Value, out long startEpoch))
            {
                long startMs = startEpoch < 100000000000L ? startEpoch * 1000 : startEpoch;
                return (startMs, 0);
            }

            // בדיקת תגית creation_time בפורמט ISO
            var matchIso = Regex.Match(headerText, @"creation_time[^\d]*(\d{4}-\d{2}-\d{2}[T_ ]\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?)");
            if (matchIso.Success && DateTime.TryParse(matchIso.Groups[1].Value, CultureInfo.InvariantCulture,
                DateTimeStyles.AssumeUniversal | DateTimeStyles.AdjustToUniversal, out DateTime dtUtc))
            {
                long startMs = new DateTimeOffset(dtUtc, TimeSpan.Zero).ToUnixTimeMilliseconds();
                return (startMs, 0);
            }
        }
        catch { }
        return null;
    }

    private (int Width, int Height, int Fps, bool HasAudio) ResolveTelemetryMetadata(string stationId, SystemConfig config)
    {
        try
        {
            var agent = _telemetryState.GetAllAgents()
                .FirstOrDefault(a => string.Equals(a.Hostname, stationId, StringComparison.OrdinalIgnoreCase));

            if (agent != null)
            {
                int width = agent.ScreenWidth > 0 ? agent.ScreenWidth : 0;
                int height = agent.ScreenHeight > 0 ? agent.ScreenHeight : 0;
                int fps = agent.ActualFps > 0 ? agent.ActualFps : (agent.InternalCaptureFps > 0 ? agent.InternalCaptureFps : 0);
                bool hasAudio = agent.HasAudio;

                return (width, height, fps, hasAudio);
            }
        }
        catch
        {
        }

        return (0, 0, 0, false);
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