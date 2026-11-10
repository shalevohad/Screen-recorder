// ==========================================
// File: Server/Services/Retention/StorageChunksRetentionTask.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Plugins;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace ITB_SCREEN_RECORDER.Server.Services.Retention
{
    public class StorageChunksRetentionTask : IRetentionTask
    {
        private readonly ICatalogRepository _repository;
        private readonly IEnumerable<IRetentionShieldProvider> _shieldProviders;
        private readonly IOptionsMonitor<SystemConfig> _configMonitor;
        private readonly IStorageTelemetryService _storageTelemetryService;
        private readonly ILogger<StorageChunksRetentionTask> _logger;

        public string TaskName => "Storage Video Chunks & Index";

        public StorageChunksRetentionTask(
            ICatalogRepository repository,
            IEnumerable<IRetentionShieldProvider> shieldProviders,
            IOptionsMonitor<SystemConfig> configMonitor,
            IStorageTelemetryService storageTelemetryService,
            ILogger<StorageChunksRetentionTask> logger)
        {
            _repository = repository;
            _shieldProviders = shieldProviders;
            _configMonitor = configMonitor;
            _storageTelemetryService = storageTelemetryService;
            _logger = logger;
        }

        public async Task<int> ExecuteRetentionAsync(long cutoffEpochMs, CancellationToken ct)
        {
            int totalPurged = 0;
            var shieldedPaths = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

            // =========================================================================
            // PHASE 1: Time-Based Retention Sweep (Retention Days)
            // Purge all unshielded chunks where end_epoch_ms < cutoffEpochMs
            // =========================================================================
            _logger.LogInformation("[RETENTION TIME] Starting time-based chunk purge for recordings older than cutoff epoch {Cutoff}...", cutoffEpochMs);

            while (!ct.IsCancellationRequested)
            {
                var candidates = await _repository.GetExpiredCandidateChunksAsync(cutoffEpochMs, batchLimit: 200, excludedFilePaths: shieldedPaths);
                if (candidates.Count == 0) break;

                var filesToDelete = new List<string>();

                foreach (var chunk in candidates)
                {
                    if (ct.IsCancellationRequested) break;

                    bool isShielded = false;
                    foreach (var provider in _shieldProviders)
                    {
                        if (await provider.IsRangeShieldedAsync(chunk.StationId, chunk.StartEpochMs, chunk.EndEpochMs))
                        {
                            isShielded = true;
                            break;
                        }
                    }

                    if (isShielded)
                    {
                        shieldedPaths.Add(chunk.FilePath);
                        continue;
                    }

                    try
                    {
                        if (File.Exists(chunk.FilePath))
                        {
                            File.Delete(chunk.FilePath);
                        }
                        filesToDelete.Add(chunk.FilePath);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning(ex, "[RETENTION] Could not delete physical chunk '{Path}'. Will retry next cycle.", chunk.FilePath);
                    }
                }

                if (filesToDelete.Count > 0)
                {
                    await _repository.RemoveChunksAsync(filesToDelete);
                    totalPurged += filesToDelete.Count;
                    _logger.LogInformation("[RETENTION TIME] Purged batch of {Count} expired chunk files.", filesToDelete.Count);
                }
                else
                {
                    // No unshielded files were deletable in this batch; avoid spinning
                    break;
                }
            }

            // =========================================================================
            // PHASE 2: Quota-Based FIFO Retention Sweep (MaxStorageQuotaGb)
            // "במידה וזה QUOTA צריכים להימחק קודם כל הקבצים הישנים יותר (FIFO)"
            // Purge oldest unshielded chunks FIFO until storage is strictly within quota
            // =========================================================================
            int quotaGb = _configMonitor.CurrentValue?.MaxStorageQuotaGb ?? 0;
            if (quotaGb > 0 && !ct.IsCancellationRequested)
            {
                long maxQuotaBytes = (long)quotaGb * 1024L * 1024L * 1024L;
                long targetQuotaBytes = (long)(maxQuotaBytes * 0.95); // 5% safety buffer to prevent thrashing

                long trackedRecordingsBytes = await _repository.GetTotalRecordingSizeBytesAsync();
                var telemetry = _storageTelemetryService.GetCurrentStorageTelemetry();
                long diskUsedBytes = telemetry.IsAccessible && telemetry.TotalSizeBytes > 0 ? telemetry.UsedSizeBytes : 0;

                bool isExceeded = trackedRecordingsBytes > maxQuotaBytes || (diskUsedBytes > maxQuotaBytes);

                if (isExceeded)
                {
                    _logger.LogWarning(
                        "[RETENTION QUOTA] Storage quota exceeded! Quota: {QuotaGb} GB ({MaxBytes:N0} bytes). Tracked in Catalog: {Tracked:N0} bytes, Disk Pool Used: {DiskUsed:N0} bytes. Initiating FIFO purge of oldest unshielded recordings...",
                        quotaGb, maxQuotaBytes, trackedRecordingsBytes, diskUsedBytes);

                    while (!ct.IsCancellationRequested)
                    {
                        if (trackedRecordingsBytes <= targetQuotaBytes && (diskUsedBytes <= 0 || diskUsedBytes <= targetQuotaBytes))
                        {
                            _logger.LogInformation(
                                "[RETENTION QUOTA] Storage quota successfully satisfied (Tracked: {Tracked:N0} bytes, Disk Pool: {DiskUsed:N0} bytes, Target: {Target:N0} bytes).",
                                trackedRecordingsBytes, diskUsedBytes, targetQuotaBytes);
                            break;
                        }

                        var oldestCandidates = await _repository.GetOldestCandidateChunksAsync(batchLimit: 200, excludedFilePaths: shieldedPaths);
                        if (oldestCandidates.Count == 0)
                        {
                            _logger.LogWarning("[RETENTION QUOTA] No more unshielded chunks available to purge, but quota remains active. Protected bookmarks are preserved.");
                            break;
                        }

                        var fifoFilesToDelete = new List<string>();
                        long batchFreedBytes = 0;

                        foreach (var chunk in oldestCandidates)
                        {
                            if (ct.IsCancellationRequested) break;

                            bool isShielded = false;
                            foreach (var provider in _shieldProviders)
                            {
                                if (await provider.IsRangeShieldedAsync(chunk.StationId, chunk.StartEpochMs, chunk.EndEpochMs))
                                {
                                    isShielded = true;
                                    break;
                                }
                            }

                            if (isShielded)
                            {
                                shieldedPaths.Add(chunk.FilePath);
                                continue;
                            }

                            long fileSize = chunk.FileSizeBytes;
                            try
                            {
                                if (File.Exists(chunk.FilePath))
                                {
                                    var fi = new FileInfo(chunk.FilePath);
                                    fileSize = Math.Max(fileSize, fi.Length);
                                    File.Delete(chunk.FilePath);
                                }
                                fifoFilesToDelete.Add(chunk.FilePath);
                                batchFreedBytes += fileSize;
                                trackedRecordingsBytes = Math.Max(0, trackedRecordingsBytes - fileSize);
                                diskUsedBytes = Math.Max(0, diskUsedBytes - fileSize);
                            }
                            catch (Exception ex)
                            {
                                _logger.LogWarning(ex, "[RETENTION QUOTA] Failed to delete chunk '{Path}'. Will skip.", chunk.FilePath);
                            }

                            if (trackedRecordingsBytes <= targetQuotaBytes && (diskUsedBytes <= 0 || diskUsedBytes <= targetQuotaBytes))
                            {
                                break;
                            }
                        }

                        if (fifoFilesToDelete.Count > 0)
                        {
                            await _repository.RemoveChunksAsync(fifoFilesToDelete);
                            totalPurged += fifoFilesToDelete.Count;
                            _logger.LogInformation(
                                "[RETENTION QUOTA] FIFO Purged {Count} oldest chunk(s), freed ~{FreedMb:F1} MB. Remaining Tracked: {TrackedMb:F1} MB.",
                                fifoFilesToDelete.Count, batchFreedBytes / (1024.0 * 1024.0), trackedRecordingsBytes / (1024.0 * 1024.0));
                        }
                        else
                        {
                            // No unshielded files could be deleted in this batch
                            break;
                        }
                    }
                }
                else
                {
                    _logger.LogInformation(
                        "[RETENTION QUOTA] Storage quota OK. Current tracked: {TrackedMb:F1} MB / Quota: {QuotaGb} GB.",
                        trackedRecordingsBytes / (1024.0 * 1024.0), quotaGb);
                }
            }

            return totalPurged;
        }
    }
}
