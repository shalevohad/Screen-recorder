// ==========================================
// File: Server/Services/StorageRetentionWorker.cs
// ==========================================
namespace ITB_SCREEN_RECORDER.Server.Services;

using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Server.Services.Retention;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

public sealed class StorageRetentionWorker : BackgroundService
{
    private readonly IEnumerable<IRetentionTask> _retentionTasks;
    private readonly IOptionsMonitor<SystemConfig> _configMonitor;
    private readonly ILogger<StorageRetentionWorker> _logger;

    public StorageRetentionWorker(
        IEnumerable<IRetentionTask> retentionTasks,
        IOptionsMonitor<SystemConfig> configMonitor,
        ILogger<StorageRetentionWorker> logger)
    {
        _retentionTasks = retentionTasks;
        _configMonitor = configMonitor;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("[RETENTION] Unified System Retention Worker active.");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                int retentionDays = Math.Max(1, _configMonitor.CurrentValue?.Storage?.RetentionDays ?? 30);
                long cutoffEpochMs = DateTimeOffset.UtcNow.AddDays(-retentionDays).ToUnixTimeMilliseconds();

                _logger.LogInformation("[RETENTION] Starting retention sweep across all sub-systems (Cutoff: older than {Days} days)...", retentionDays);

                foreach (var task in _retentionTasks)
                {
                    if (stoppingToken.IsCancellationRequested) break;

                    try
                    {
                        int purged = await task.ExecuteRetentionAsync(cutoffEpochMs, stoppingToken);
                        _logger.LogInformation("[RETENTION] Task '{Name}' completed. Purged items: {Count}.", task.TaskName, purged);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "[RETENTION] Task '{Name}' failed during execution.", task.TaskName);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[RETENTION] Fatal error during unified retention cycle.");
            }

            // Periodic retention execution cycle every 1 hour
            await Task.Delay(TimeSpan.FromHours(1), stoppingToken);
        }
    }
}