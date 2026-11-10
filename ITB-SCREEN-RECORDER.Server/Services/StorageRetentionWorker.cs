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

public interface IStorageRetentionCoordinator
{
    void TriggerImmediateSweep();
}

public sealed class StorageRetentionWorker : BackgroundService, IStorageRetentionCoordinator
{
    private readonly IEnumerable<IRetentionTask> _retentionTasks;
    private readonly IOptionsMonitor<SystemConfig> _configMonitor;
    private readonly ILogger<StorageRetentionWorker> _logger;
    private readonly SemaphoreSlim _wakeSignal = new(0, 1);

    public StorageRetentionWorker(
        IEnumerable<IRetentionTask> retentionTasks,
        IOptionsMonitor<SystemConfig> configMonitor,
        ILogger<StorageRetentionWorker> logger)
    {
        _retentionTasks = retentionTasks;
        _configMonitor = configMonitor;
        _logger = logger;
    }

    public void TriggerImmediateSweep()
    {
        try
        {
            if (_wakeSignal.CurrentCount == 0)
            {
                _wakeSignal.Release();
                _logger.LogInformation("[RETENTION] Immediate retention & quota sweep requested by operator/system.");
            }
        }
        catch (ObjectDisposedException) { }
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("[RETENTION] Unified System Retention Worker active.");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                int retentionDays = Math.Max(1, _configMonitor.CurrentValue?.Storage?.RetentionDays > 0 
                    ? _configMonitor.CurrentValue.Storage.RetentionDays 
                    : (_configMonitor.CurrentValue?.RecordingRetentionDays ?? 30));

                long cutoffEpochMs = DateTimeOffset.UtcNow.AddDays(-retentionDays).ToUnixTimeMilliseconds();

                _logger.LogInformation("[RETENTION] Starting retention & quota sweep across all sub-systems (Cutoff: older than {Days} days)...", retentionDays);

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

            // Periodic retention execution cycle every 15 minutes, or immediately on trigger
            try
            {
                await _wakeSignal.WaitAsync(TimeSpan.FromMinutes(15), stoppingToken);
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                break;
            }
        }
    }
}
