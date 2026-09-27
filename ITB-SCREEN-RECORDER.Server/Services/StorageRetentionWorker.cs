namespace ITB_SCREEN_RECORDER.Server.Services;

using ITB_SCREEN_RECORDER.Core.Plugins;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

public sealed class StorageRetentionWorker : BackgroundService
{
    private readonly ICatalogRepository _repository;
    private readonly IEnumerable<IRetentionShieldProvider> _shieldProviders;
    private readonly int _retentionDays;
    private readonly ILogger<StorageRetentionWorker> _logger;

    public StorageRetentionWorker(
        ICatalogRepository repository,
        IEnumerable<IRetentionShieldProvider> shieldProviders,
        IConfiguration configuration,
        ILogger<StorageRetentionWorker> logger)
    {
        _repository = repository;
        _shieldProviders = shieldProviders;
        _logger = logger;
        _retentionDays = configuration.GetValue<int>("SystemConfig:Storage:RetentionDays", 30);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var cutoffUtc = DateTimeOffset.UtcNow.AddDays(-_retentionDays).ToUnixTimeMilliseconds();
                var candidates = await _repository.GetExpiredCandidateChunksAsync(cutoffUtc, batchLimit: 100);

                var filesToDelete = new List<string>();

                foreach (var chunk in candidates)
                {
                    bool isShielded = false;

                    foreach (var provider in _shieldProviders)
                    {
                        if (await provider.IsRangeShieldedAsync(chunk.StationId, chunk.StartEpochMs, chunk.EndEpochMs))
                        {
                            isShielded = true;
                            break;
                        }
                    }

                    if (!isShielded)
                    {
                        if (File.Exists(chunk.FilePath))
                        {
                            File.Delete(chunk.FilePath);
                        }
                        filesToDelete.Add(chunk.FilePath);
                    }
                }

                if (filesToDelete.Count > 0)
                {
                    await _repository.RemoveChunksAsync(filesToDelete);
                    _logger.LogInformation("Retention sweep purged {Count} unshielded chunks older than {Days} days.", filesToDelete.Count, _retentionDays);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred during storage retention sweep.");
            }

            await Task.Delay(TimeSpan.FromHours(1), stoppingToken);
        }
    }
}