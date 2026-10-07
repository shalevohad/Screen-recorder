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
            _logger.LogInformation("[CONFIG SYNC] Aligning system configuration across installation, files, and SQLite...");

            // 💡 ההגדרות מקובצי הקונפיגורציה (שהוגדרו בהתקנה) הן הסמכות העליונה (SSOT) בעליית השירות
            var currentFileConfig = _configMonitor.CurrentValue;
            string fileConfigJson = JsonSerializer.Serialize(currentFileConfig, new JsonSerializerOptions { WriteIndented = true });

            // סנכרון ישיר ל-SQLite: יוצר רשומה בהתקנה נקייה או מעדכן התקנה קיימת
            await _catalogRepo.SetConfigurationAsync("SystemConfig", fileConfigJson);
            _logger.LogInformation("[CONFIG SYNC] Successfully synchronized active file settings into SQLite database.");
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

            // 2. שמירה ויישור קו בכל קובצי ה-JSON בדיסק
            await WriteConfigToDiskFilesAsync(updatedJson);

            _logger.LogInformation("[CONFIG SYNC] System configuration updated in SQLite and flushed to disk configuration files.");
        }
        finally
        {
            _lock.Release();
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;

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

        // סנכרון לתיקיית המקור בסביבת פיתוח (אם קיימת)
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
                    _logger.LogInformation("[CONFIG SYNC] Flushed updated configuration into '{Path}'", filePath);
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "[CONFIG SYNC] Could not write configuration to '{Path}'.", filePath);
            }
        }
    }
}