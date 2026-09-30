namespace ITB_SCREEN_RECORDER.Server.Services;

using System;
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
    private readonly string _appSettingsPath;
    private readonly SemaphoreSlim _lock = new(1, 1);

    public SystemConfigDbSyncService(
        ICatalogRepository catalogRepo,
        IOptionsMonitor<SystemConfig> configMonitor,
        ILogger<SystemConfigDbSyncService> logger)
    {
        _catalogRepo = catalogRepo;
        _configMonitor = configMonitor;
        _logger = logger;
        _appSettingsPath = ResolveActiveSettingsFilePath();
    }

    private static string ResolveActiveSettingsFilePath()
    {
        string baseDir = AppContext.BaseDirectory;
        if (OperatingSystem.IsLinux())
        {
            string linuxPath = Path.Combine(baseDir, "appsettings.Linux.json");
            if (File.Exists(linuxPath)) return linuxPath;
        }
        else if (OperatingSystem.IsWindows())
        {
            string winPath = Path.Combine(baseDir, "appsettings.Windows.json");
            if (File.Exists(winPath)) return winPath;
        }

        return Path.Combine(baseDir, "appsettings.json");
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        await _lock.WaitAsync(cancellationToken);
        try
        {
            _logger.LogInformation("[CONFIG SYNC] Verifying system configuration state between DB and '{File}'...", Path.GetFileName(_appSettingsPath));

            var currentFileConfig = _configMonitor.CurrentValue;
            string fileConfigJson = JsonSerializer.Serialize(currentFileConfig);

            string? dbConfigJson = await _catalogRepo.GetConfigurationAsync("SystemConfig");

            if (string.IsNullOrWhiteSpace(dbConfigJson))
            {
                _logger.LogInformation("[CONFIG SYNC] No config found in SQLite. Initializing DB from settings file...");
                await _catalogRepo.SetConfigurationAsync("SystemConfig", fileConfigJson);
            }
            else if (!AreJsonEqual(fileConfigJson, dbConfigJson))
            {
                _logger.LogInformation("[CONFIG SYNC] Difference detected between settings file and DB. Synchronizing DB with current file state...");
                await _catalogRepo.SetConfigurationAsync("SystemConfig", fileConfigJson);
            }
            else
            {
                _logger.LogInformation("[CONFIG SYNC] Configuration state between DB and JSON is synchronized.");
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

            // 1. עדכון מסד הנתונים SQLite
            await _catalogRepo.SetConfigurationAsync("SystemConfig", updatedJson);

            // 2. עדכון קובץ ה-appsettings הרלוונטי בדיסק
            if (File.Exists(_appSettingsPath))
            {
                string originalFullJson = await File.ReadAllTextAsync(_appSettingsPath);
                var rootNode = JsonNode.Parse(originalFullJson)?.AsObject();
                if (rootNode != null)
                {
                    rootNode["SystemConfig"] = JsonNode.Parse(updatedJson);
                    await File.WriteAllTextAsync(_appSettingsPath, rootNode.ToJsonString(new JsonSerializerOptions { WriteIndented = true }));
                }
            }

            _logger.LogInformation("[CONFIG SYNC] System configuration successfully updated in DB and '{File}'.", Path.GetFileName(_appSettingsPath));
        }
        finally
        {
            _lock.Release();
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;

    private static bool AreJsonEqual(string json1, string json2)
    {
        try
        {
            var node1 = JsonNode.Parse(json1);
            var node2 = JsonNode.Parse(json2);
            return JsonNode.DeepEquals(node1, node2);
        }
        catch
        {
            return false;
        }
    }
}