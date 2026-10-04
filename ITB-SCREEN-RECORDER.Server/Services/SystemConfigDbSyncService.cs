// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Services/SystemConfigDbSyncService.cs
// ==========================================
namespace ITB_SCREEN_RECORDER.Server.Services;

using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

public interface ISystemConfigDbSyncService
{
    Task UpdateSystemConfigAsync(Action<SystemConfig> updateAction);
}

public class SystemConfigDbSyncService : IHostedService, ISystemConfigDbSyncService
{
    private readonly ICatalogRepository _catalogRepo;
    private readonly IOptionsMonitor<SystemConfig> _configMonitor;
    private readonly ILogger<SystemConfigDbSyncService> _logger;
    private readonly SemaphoreSlim _lock = new(1, 1);

    public SystemConfigDbSyncService(
        ICatalogRepository catalogRepo,
        IOptionsMonitor<SystemConfig> configMonitor,
        ILogger<SystemConfigDbSyncService> logger)
    {
        _catalogRepo = catalogRepo;
        _configMonitor = configMonitor;
        _logger = logger;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        await _lock.WaitAsync(cancellationToken);
        try
        {
            _logger.LogInformation("[CONFIG SYNC] Verifying system configuration state between SQLite DB and JSON settings...");

            string? dbConfigJson = await _catalogRepo.GetConfigurationAsync("SystemConfig");

            if (!string.IsNullOrWhiteSpace(dbConfigJson))
            {
                // 💡 מסד הנתונים מכיל את ההגדרות שנשמרו - הוא ה-Source of Truth
                _logger.LogInformation("[CONFIG SYNC] Discovered persistent configuration in SQLite DB. Syncing settings to disk & runtime...");

                var dbConfig = JsonSerializer.Deserialize<SystemConfig>(dbConfigJson, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (dbConfig != null)
                {
                    UpdateConfigInMemory(_configMonitor.CurrentValue, dbConfig);
                    await WriteConfigToDiskFilesAsync(dbConfigJson);
                }
            }
            else
            {
                // 💡 עלייה ראשונה - אין עדיין רשומה ב-DB, מאתחלים מתוך הקובץ
                _logger.LogInformation("[CONFIG SYNC] Initializing SQLite configuration from active settings file...");
                var currentFileConfig = _configMonitor.CurrentValue;
                string fileConfigJson = JsonSerializer.Serialize(currentFileConfig, new JsonSerializerOptions { WriteIndented = true });
                await _catalogRepo.SetConfigurationAsync("SystemConfig", fileConfigJson);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "[CONFIG SYNC] Failed to synchronize configuration on startup.");
        }
        finally
        {
            _lock.Release();
        }
    }

    public async Task UpdateSystemConfigAsync(Action<SystemConfig> updateAction)
    {
        await _lock.WaitAsync();
        try
        {
            var config = _configMonitor.CurrentValue;
            updateAction(config);

            string updatedJson = JsonSerializer.Serialize(config, new JsonSerializerOptions { WriteIndented = true });

            // 1. שמירה במסד הנתונים SQLite
            await _catalogRepo.SetConfigurationAsync("SystemConfig", updatedJson);

            // 2. שמירה בכל קובצי ה-appsettings הרלוונטיים (כולל תיקיית המקור בפיתוח)
            await WriteConfigToDiskFilesAsync(updatedJson);

            _logger.LogInformation("[CONFIG SYNC] System configuration successfully updated in DB and disk configuration files.");
        }
        finally
        {
            _lock.Release();
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;

    private static void UpdateConfigInMemory(SystemConfig target, SystemConfig source)
    {
        target.DefaultTargetFps = source.DefaultTargetFps;
        target.DefaultVideoBitrate = source.DefaultVideoBitrate;
        target.RecordingRetentionDays = source.RecordingRetentionDays;
        target.MaxStorageQuotaGb = source.MaxStorageQuotaGb;
        target.DashboardRefreshRateMs = source.DashboardRefreshRateMs;
        target.DisplayTimezone = source.DisplayTimezone;
        target.DisplayLocale = source.DisplayLocale;

        if (source.Storage != null)
        {
            target.Storage ??= new StorageSettings();
            target.Storage.NetAppUncPath = source.Storage.NetAppUncPath;
            target.Storage.LocalFallbackPath = source.Storage.LocalFallbackPath;
            target.Storage.ChunkIntervalMinutes = source.Storage.ChunkIntervalMinutes;
            target.Storage.RetentionDays = source.Storage.RetentionDays;
            target.Storage.ChunkEventLogPath = source.Storage.ChunkEventLogPath;
            target.Storage.RecordFormat = source.Storage.RecordFormat;
        }

        if (source.MediaMtx != null)
        {
            target.MediaMtx ??= new MediaMtxSettings();
            target.MediaMtx.RtmpPort = source.MediaMtx.RtmpPort;
            target.MediaMtx.HlsPort = source.MediaMtx.HlsPort;
            target.MediaMtx.ApiPort = source.MediaMtx.ApiPort;
        }

        if (source.Dashboard != null)
        {
            target.Dashboard ??= new DashboardSettings();
            target.Dashboard.SnapshotMinDelayMs = source.Dashboard.SnapshotMinDelayMs;
            target.Dashboard.SnapshotMaxDelayMs = source.Dashboard.SnapshotMaxDelayMs;
            target.Dashboard.SnapshotBufferMarginPx = source.Dashboard.SnapshotBufferMarginPx;
            target.Dashboard.MaxConcurrentLiveStreams = source.Dashboard.MaxConcurrentLiveStreams;
        }
    }

    private async Task WriteConfigToDiskFilesAsync(string updatedJson)
    {
        var candidatePaths = new List<string>();

        string baseDir = AppContext.BaseDirectory;
        string mainBinFile = Path.Combine(baseDir, "appsettings.json");
        if (File.Exists(mainBinFile)) candidatePaths.Add(mainBinFile);

        if (OperatingSystem.IsWindows())
        {
            string winBinFile = Path.Combine(baseDir, "appsettings.Windows.json");
            if (File.Exists(winBinFile)) candidatePaths.Add(winBinFile);
        }
        else if (OperatingSystem.IsLinux())
        {
            string linuxBinFile = Path.Combine(baseDir, "appsettings.Linux.json");
            if (File.Exists(linuxBinFile)) candidatePaths.Add(linuxBinFile);
        }

        // 💡 כתיבה גם לקובץ המקור בפרויקט כדי ש-Rebuild עתידי לא ידרוס את ההגדרות
        try
        {
            string projectRoot = Path.GetFullPath(Path.Combine(baseDir, "..", "..", ".."));
            string projectAppSettings = Path.Combine(projectRoot, "appsettings.json");
            if (File.Exists(projectAppSettings) && !candidatePaths.Contains(projectAppSettings, StringComparer.OrdinalIgnoreCase))
            {
                candidatePaths.Add(projectAppSettings);
            }
        }
        catch { }

        foreach (var filePath in candidatePaths)
        {
            try
            {
                string original = await File.ReadAllTextAsync(filePath);
                var rootNode = JsonNode.Parse(original)?.AsObject();
                if (rootNode != null)
                {
                    string sectionKey = rootNode.ContainsKey("SystemConfig") ? "SystemConfig"
                        : rootNode.ContainsKey("systemConfig") ? "systemConfig"
                        : "SystemConfig";

                    rootNode[sectionKey] = JsonNode.Parse(updatedJson);
                    await File.WriteAllTextAsync(filePath, rootNode.ToJsonString(new JsonSerializerOptions { WriteIndented = true }));
                    _logger.LogInformation("[CONFIG SYNC] Synced updated configuration into '{Path}'", filePath);
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "[CONFIG SYNC] Could not write configuration to '{Path}'.", filePath);
            }
        }
    }
}