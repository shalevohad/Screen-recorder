using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Contracts.Storage;
using ITB_SCREEN_RECORDER.Core.Plugins;
using ITB_SCREEN_RECORDER.Server.Data;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using ITB_SCREEN_RECORDER.Server.Models;
using ITB_SCREEN_RECORDER.Server.Services;
using ITB_SCREEN_RECORDER.Server.Services.Retention;
using ITB_SCREEN_RECORDER.Tests.Server.Data;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Server.Storage;

public class StorageChunksRetentionTaskTests : IDisposable
{
    private readonly TestSqliteConnectionFactory _factory;
    private readonly CatalogDbInitializer _initializer;
    private readonly CatalogRepository _repository;
    private readonly string _tempDirectory;

    public StorageChunksRetentionTaskTests()
    {
        _factory = new TestSqliteConnectionFactory();
        _initializer = new CatalogDbInitializer(_factory);
        _initializer.Initialize();
        _repository = new CatalogRepository(_factory);

        _tempDirectory = Path.Combine(Path.GetTempPath(), "ITB_RetentionTests_" + Guid.NewGuid().ToString("N"));
        Directory.CreateDirectory(_tempDirectory);
    }

    public void Dispose()
    {
        _factory.Dispose();
        try
        {
            if (Directory.Exists(_tempDirectory))
            {
                Directory.Delete(_tempDirectory, true);
            }
        }
        catch
        {
            // Ignore cleanup failures
        }
    }

    private string CreateDummyChunkFile(string fileName, int sizeBytes = 1024)
    {
        var filePath = Path.Combine(_tempDirectory, fileName);
        var bytes = new byte[sizeBytes];
        File.WriteAllBytes(filePath, bytes);
        return filePath;
    }

    [Fact]
    public async Task TimeBasedSweep_PurgesExpiredChunks_AndPreservesUnexpired()
    {
        // Arrange
        long cutoff = 1700000000000;
        var fileExpired = CreateDummyChunkFile("expired.mp4", 1024);
        var fileUnexpired = CreateDummyChunkFile("unexpired.mp4", 1024);

        var chunkExpired = new ChunkFinalizedEvent("st-1", fileExpired, cutoff - 600000, cutoff - 300000, 1024, true, 1920, 1080, 30, true);
        var chunkUnexpired = new ChunkFinalizedEvent("st-1", fileUnexpired, cutoff + 10000, cutoff + 300000, 1024, true, 1920, 1080, 30, true);
        await _repository.BulkUpsertChunksAsync(new[] { chunkExpired, chunkUnexpired });

        var config = new SystemConfig
        {
            MaxStorageQuotaGb = 1000
        };
        var configMonitor = new Mock<IOptionsMonitor<SystemConfig>>();
        configMonitor.Setup(m => m.CurrentValue).Returns(config);

        var telemetryService = new Mock<IStorageTelemetryService>();
        telemetryService.Setup(s => s.GetCurrentStorageTelemetry()).Returns(new StorageTelemetryDto { UsedSizeBytes = 2048, TotalSizeBytes = 10000000 });

        var task = new StorageChunksRetentionTask(
            _repository,
            Enumerable.Empty<IRetentionShieldProvider>(),
            configMonitor.Object,
            telemetryService.Object,
            NullLogger<StorageChunksRetentionTask>.Instance);

        // Act
        int purged = await task.ExecuteRetentionAsync(cutoff, CancellationToken.None);

        // Assert
        Assert.Equal(1, purged);
        Assert.False(File.Exists(fileExpired), "Expired physical chunk file must be deleted.");
        Assert.True(File.Exists(fileUnexpired), "Unexpired chunk file must remain untouched.");

        var candidates = await _repository.GetExpiredCandidateChunksAsync(cutoff, 10);
        Assert.Empty(candidates);
    }

    [Fact]
    public async Task TimeBasedSweep_ShieldedChunks_AreNeverDeleted()
    {
        // Arrange
        long cutoff = 1700000000000;
        var fileShielded = CreateDummyChunkFile("bookmarked.mp4", 1024);
        var fileExpired = CreateDummyChunkFile("normal_expired.mp4", 1024);

        var chunkShielded = new ChunkFinalizedEvent("st-1", fileShielded, cutoff - 1200000, cutoff - 900000, 1024, true, 1920, 1080, 30, true);
        var chunkExpired = new ChunkFinalizedEvent("st-1", fileExpired, cutoff - 600000, cutoff - 300000, 1024, true, 1920, 1080, 30, true);
        await _repository.BulkUpsertChunksAsync(new[] { chunkShielded, chunkExpired });

        var shieldMock = new Mock<IRetentionShieldProvider>();
        shieldMock.Setup(s => s.ProviderName).Returns("BookmarkShield");
        shieldMock.Setup(s => s.IsRangeShieldedAsync("st-1", chunkShielded.StartEpochMs, chunkShielded.EndEpochMs))
                  .ReturnsAsync(true);
        shieldMock.Setup(s => s.IsRangeShieldedAsync("st-1", chunkExpired.StartEpochMs, chunkExpired.EndEpochMs))
                  .ReturnsAsync(false);

        var config = new SystemConfig
        {
            MaxStorageQuotaGb = 1000
        };
        var configMonitor = new Mock<IOptionsMonitor<SystemConfig>>();
        configMonitor.Setup(m => m.CurrentValue).Returns(config);

        var telemetryService = new Mock<IStorageTelemetryService>();
        telemetryService.Setup(s => s.GetCurrentStorageTelemetry()).Returns(new StorageTelemetryDto { UsedSizeBytes = 2048, TotalSizeBytes = 10000000 });

        var task = new StorageChunksRetentionTask(
            _repository,
            new[] { shieldMock.Object },
            configMonitor.Object,
            telemetryService.Object,
            NullLogger<StorageChunksRetentionTask>.Instance);

        // Act
        int purged = await task.ExecuteRetentionAsync(cutoff, CancellationToken.None);

        // Assert
        Assert.Equal(1, purged);
        Assert.True(File.Exists(fileShielded), "Bookmarked/Shielded chunk MUST NOT be deleted.");
        Assert.False(File.Exists(fileExpired), "Unshielded expired chunk must be deleted.");
    }

    [Fact]
    public async Task QuotaExceeded_PurgesOldestChunksInFifoOrder_UntilWithinQuota()
    {
        // Arrange
        long cutoff = 1000000; // Small cutoff so Phase 1 doesn't delete these newer chunks
        long baseTime = 1700000000000;

        int chunkSize = 40 * 1024 * 1024; // 40 MB each
        var fileOldest = CreateDummyChunkFile("chunk_oldest.mp4", chunkSize);
        var fileMiddle = CreateDummyChunkFile("chunk_middle.mp4", chunkSize);
        var fileNewest = CreateDummyChunkFile("chunk_newest.mp4", chunkSize);

        var chunk1 = new ChunkFinalizedEvent("st-1", fileOldest, baseTime, baseTime + 300000, chunkSize, true, 1920, 1080, 30, true);
        var chunk2 = new ChunkFinalizedEvent("st-1", fileMiddle, baseTime + 300000, baseTime + 600000, chunkSize, true, 1920, 1080, 30, true);
        var chunk3 = new ChunkFinalizedEvent("st-1", fileNewest, baseTime + 600000, baseTime + 900000, chunkSize, true, 1920, 1080, 30, true);
        await _repository.BulkUpsertChunksAsync(new[] { chunk1, chunk2, chunk3 });

        var config = new SystemConfig
        {
            MaxStorageQuotaGb = 1 // 1 GB = 1,073,741,824 bytes
        };
        var configMonitor = new Mock<IOptionsMonitor<SystemConfig>>();
        configMonitor.Setup(m => m.CurrentValue).Returns(config);

        // Quota = 1,073,741,824 bytes. Target (95%) = 1,020,054,732 bytes.
        // Simulated disk usage = Quota + 20 MB = 1,093,741,824 bytes (needs ~73.7 MB freed to reach target).
        // 2 chunks of 40 MB = 80 MB freed -> stops before deleting the 3rd (newest) chunk!
        long quotaBytes = 1L * 1024L * 1024L * 1024L;
        long simulatedUsage = quotaBytes + (20L * 1024L * 1024L);

        var telemetryService = new Mock<IStorageTelemetryService>();
        telemetryService.Setup(s => s.GetCurrentStorageTelemetry()).Returns(new StorageTelemetryDto
        {
            IsAccessible = true,
            UsedSizeBytes = simulatedUsage,
            TotalSizeBytes = 2000000000
        });

        var task = new StorageChunksRetentionTask(
            _repository,
            Enumerable.Empty<IRetentionShieldProvider>(),
            configMonitor.Object,
            telemetryService.Object,
            NullLogger<StorageChunksRetentionTask>.Instance);

        // Act
        int purged = await task.ExecuteRetentionAsync(cutoff, CancellationToken.None);

        // Assert
        Assert.Equal(2, purged);
        // FIFO check: chunk1 (oldest) and chunk2 (middle) MUST be deleted first!
        Assert.False(File.Exists(fileOldest), "Oldest chunk MUST be deleted first under FIFO quota purge.");
        Assert.False(File.Exists(fileMiddle), "Middle chunk was also purged to satisfy quota buffer.");
        // Newest chunk should still be preserved
        Assert.True(File.Exists(fileNewest), "Newest chunk should be preserved.");
    }

    [Fact]
    public async Task QuotaExceeded_PreservesBookmarkedChunks_EvenWhenOldest()
    {
        // Arrange
        long cutoff = 1000000;
        long baseTime = 1700000000000;

        int chunkSize = 40 * 1024 * 1024;
        var fileOldestShielded = CreateDummyChunkFile("chunk_bookmarked_oldest.mp4", chunkSize);
        var fileMiddleUnshielded = CreateDummyChunkFile("chunk_unshielded_middle.mp4", chunkSize);

        var chunk1 = new ChunkFinalizedEvent("st-1", fileOldestShielded, baseTime, baseTime + 300000, chunkSize, true, 1920, 1080, 30, true);
        var chunk2 = new ChunkFinalizedEvent("st-1", fileMiddleUnshielded, baseTime + 300000, baseTime + 600000, chunkSize, true, 1920, 1080, 30, true);
        await _repository.BulkUpsertChunksAsync(new[] { chunk1, chunk2 });

        var shieldMock = new Mock<IRetentionShieldProvider>();
        shieldMock.Setup(s => s.ProviderName).Returns("BookmarkShield");
        shieldMock.Setup(s => s.IsRangeShieldedAsync("st-1", chunk1.StartEpochMs, chunk1.EndEpochMs)).ReturnsAsync(true);
        shieldMock.Setup(s => s.IsRangeShieldedAsync("st-1", chunk2.StartEpochMs, chunk2.EndEpochMs)).ReturnsAsync(false);

        var config = new SystemConfig
        {
            MaxStorageQuotaGb = 1
        };
        var configMonitor = new Mock<IOptionsMonitor<SystemConfig>>();
        configMonitor.Setup(m => m.CurrentValue).Returns(config);

        long quotaBytes = 1L * 1024L * 1024L * 1024L;
        var telemetryService = new Mock<IStorageTelemetryService>();
        telemetryService.Setup(s => s.GetCurrentStorageTelemetry()).Returns(new StorageTelemetryDto
        {
            IsAccessible = true,
            UsedSizeBytes = quotaBytes + 20000000,
            TotalSizeBytes = 2000000000
        });

        var task = new StorageChunksRetentionTask(
            _repository,
            new[] { shieldMock.Object },
            configMonitor.Object,
            telemetryService.Object,
            NullLogger<StorageChunksRetentionTask>.Instance);

        // Act
        int purged = await task.ExecuteRetentionAsync(cutoff, CancellationToken.None);

        // Assert
        Assert.Equal(1, purged);
        Assert.True(File.Exists(fileOldestShielded), "Oldest chunk is bookmarked and MUST NOT be purged.");
        Assert.False(File.Exists(fileMiddleUnshielded), "Unshielded chunk was purged to free quota space.");
    }
}
