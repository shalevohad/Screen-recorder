using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Extractor
{
    public class StorageScannerLiveClosedChunkTests : IDisposable
    {
        private readonly string _tempDir;
        private readonly string _storageDir;
        private readonly StorageScannerService _scanner;

        public StorageScannerLiveClosedChunkTests()
        {
            _tempDir = Path.Combine(Path.GetTempPath(), "itb_scanner_test_" + Guid.NewGuid().ToString("N"));
            _storageDir = Path.Combine(_tempDir, "Recordings");
            Directory.CreateDirectory(_storageDir);

            var configDict = new System.Collections.Generic.Dictionary<string, string?>
            {
                ["Database:BaseDirectory"] = _tempDir,
                ["SystemConfig:Storage:LocalFallbackPath"] = _storageDir,
                ["SystemConfig:Storage:NetAppUncPath"] = ""
            };

            var configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(configDict)
                .Build();

            var sysConfig = new SystemConfig
            {
                Storage = new StorageSettings
                {
                    LocalFallbackPath = _storageDir,
                    NetAppUncPath = "",
                    ChunkIntervalMinutes = 15
                }
            };

            var monitorMock = new TestOptionsMonitor<SystemConfig>(sysConfig);
            var extractorOptions = Options.Create(new ExtractorOptions());
            var dummyGen = new Moq.Mock<IDummyVideoGenerator>().Object;

            _scanner = new StorageScannerService(
                configuration,
                monitorMock,
                extractorOptions,
                NullLogger<StorageScannerService>.Instance,
                dummyGen);
        }

        [Fact]
        public async Task ForceIndexStationAsync_IndexesNewlyClosedFile_WithAccurateDuration()
        {
            string stationName = "WORKSTATION-102";
            string stationDir = Path.Combine(_storageDir, "live", stationName);
            Directory.CreateDirectory(stationDir);

            // Create a fake chunk that started 30 seconds ago and closed 5 seconds ago (duration = 25 seconds)
            long startSec = DateTimeOffset.UtcNow.AddSeconds(-30).ToUnixTimeSeconds();
            string fileName = $"{startSec}_000000.mp4";
            string filePath = Path.Combine(stationDir, fileName);

            // Write 2KB dummy data
            await File.WriteAllBytesAsync(filePath, new byte[2048]);
            File.SetLastWriteTimeUtc(filePath, DateTime.UtcNow.AddSeconds(-5));

            int indexed = await _scanner.ForceIndexStationAsync(stationName);
            Assert.True(indexed >= 1, "Expected newly closed file to be indexed.");

            var chunks = await _scanner.GetChunksForStationAsync(stationName, DateTime.UtcNow.AddMinutes(-5), DateTime.UtcNow);
            Assert.NotEmpty(chunks);

            var chunk = chunks[0];
            Assert.Equal(stationName, chunk.Hostname);
            // Duration should be around 25 seconds (~25000ms), NOT 15 minutes (900000ms)!
            Assert.True(chunk.Duration.TotalSeconds < 60, $"Expected duration to be ~25s but was {chunk.Duration.TotalSeconds}s");
        }

        [Fact]
        public async Task GetAvailableHostsAsync_NormalizesLivePrefix_ReturnsCleanStationNames()
        {
            string liveSub = Path.Combine(_storageDir, "live", "DESKTOP-OPS-01");
            Directory.CreateDirectory(liveSub);

            var hosts = await _scanner.GetAvailableHostsAsync(DateTime.UtcNow.AddHours(-1), DateTime.UtcNow);
            Assert.Contains("DESKTOP-OPS-01", hosts);
            Assert.DoesNotContain("live/DESKTOP-OPS-01", hosts);
        }

        [Fact]
        public async Task GetChunksForStationAsync_HandlesLivePrefixInRequest_AndFindsSegments()
        {
            string stationName = "STATION-ALPHA";
            string stationDir = Path.Combine(_storageDir, stationName);
            Directory.CreateDirectory(stationDir);

            long startSec = DateTimeOffset.UtcNow.AddMinutes(-10).ToUnixTimeSeconds();
            string filePath = Path.Combine(stationDir, $"{startSec}_500000.mp4");
            await File.WriteAllBytesAsync(filePath, new byte[4096]);
            File.SetLastWriteTimeUtc(filePath, DateTime.UtcNow.AddMinutes(-2));

            // Request with "live/STATION-ALPHA"
            var chunks = await _scanner.GetChunksForStationAsync("live/" + stationName, DateTime.UtcNow.AddHours(-1), DateTime.UtcNow);
            Assert.NotEmpty(chunks);
            Assert.Equal(stationName, chunks[0].Hostname);
        }

        [Fact]
        public async Task GetChunksForStationAsync_HistoricalQuery_UsesDatabaseFirst_WithoutDiskIo()
        {
            string stationName = "STATION-HISTORICAL";
            DateTime pastStart = DateTime.UtcNow.AddDays(-3);
            DateTime pastEnd = pastStart.AddMinutes(15);

            long startMs = new DateTimeOffset(pastStart, TimeSpan.Zero).ToUnixTimeMilliseconds();
            long endMs = new DateTimeOffset(pastEnd, TimeSpan.Zero).ToUnixTimeMilliseconds();

            // Index chunk directly into SQLite database
            using (var conn = new Microsoft.Data.Sqlite.SqliteConnection($"Data Source={Path.Combine(_tempDir, "system_catalog.db")}"))
            {
                await conn.OpenAsync();
                using var cmd = conn.CreateCommand();
                cmd.CommandText = @"
                    CREATE TABLE IF NOT EXISTS recording_chunks (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        station_id TEXT NOT NULL,
                        file_path TEXT NOT NULL UNIQUE,
                        start_epoch_ms INTEGER NOT NULL,
                        end_epoch_ms INTEGER NOT NULL,
                        duration_ms INTEGER NOT NULL,
                        file_size_bytes INTEGER NOT NULL,
                        width INTEGER NOT NULL DEFAULT 1920,
                        height INTEGER NOT NULL DEFAULT 1080,
                        fps INTEGER NOT NULL DEFAULT 30,
                        has_audio INTEGER NOT NULL DEFAULT 1,
                        is_finalized INTEGER NOT NULL DEFAULT 1,
                        indexed_at_utc INTEGER NOT NULL,
                        display_id TEXT NOT NULL DEFAULT 'mon-0',
                        is_primary INTEGER NOT NULL DEFAULT 1,
                        display_bounds TEXT
                    );
                    INSERT INTO recording_chunks (
                        station_id, file_path, start_epoch_ms, end_epoch_ms, duration_ms, file_size_bytes, width, height, fps, has_audio, is_finalized, indexed_at_utc
                    ) VALUES (
                        'STATION-HISTORICAL', 'C:\\fake\\path\\chunk.mp4', " + startMs + ", " + endMs + @", 900000, 1048576, 1920, 1080, 30, 1, 1, " + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() + @");";
                await cmd.ExecuteNonQueryAsync();
            }

            // Historical query should return the DB chunk without touching disk even if the file does not exist on disk
            var chunks = await _scanner.GetChunksForStationAsync(stationName, pastStart, pastEnd);
            Assert.Single(chunks);
            Assert.Equal("STATION-HISTORICAL", chunks[0].Hostname);
            Assert.Equal(1048576, chunks[0].FileSizeBytes);
        }

        [Fact]
        public async Task GetStationSampleChunkAsync_ReturnsLatestSampleDirectlyFromDb()
        {
            string stationName = "STATION-SAMPLE-TEST";
            long startMs = DateTimeOffset.UtcNow.AddHours(-5).ToUnixTimeMilliseconds();
            long endMs = startMs + 900000;

            // Trigger scanner initialization to ensure SQLite schema exists
            await _scanner.GetAvailableHostsAsync(DateTime.UtcNow.AddHours(-1), DateTime.UtcNow);

            using (var conn = new Microsoft.Data.Sqlite.SqliteConnection($"Data Source={Path.Combine(_tempDir, "system_catalog.db")}"))
            {
                await conn.OpenAsync();
                using var cmd = conn.CreateCommand();
                cmd.CommandText = @"
                    CREATE TABLE IF NOT EXISTS recording_chunks (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        station_id TEXT NOT NULL,
                        file_path TEXT NOT NULL UNIQUE,
                        start_epoch_ms INTEGER NOT NULL,
                        end_epoch_ms INTEGER NOT NULL,
                        duration_ms INTEGER NOT NULL,
                        file_size_bytes INTEGER NOT NULL,
                        width INTEGER NOT NULL DEFAULT 1920,
                        height INTEGER NOT NULL DEFAULT 1080,
                        fps INTEGER NOT NULL DEFAULT 30,
                        has_audio INTEGER NOT NULL DEFAULT 1,
                        is_finalized INTEGER NOT NULL DEFAULT 1,
                        indexed_at_utc INTEGER NOT NULL,
                        display_id TEXT NOT NULL DEFAULT 'mon-0',
                        is_primary INTEGER NOT NULL DEFAULT 1,
                        display_bounds TEXT
                    );
                    INSERT INTO recording_chunks (
                        station_id, file_path, start_epoch_ms, end_epoch_ms, duration_ms, file_size_bytes, width, height, fps, has_audio, is_finalized, indexed_at_utc
                    ) VALUES (
                        'STATION-SAMPLE-TEST', 'C:\\fake\\sample.mp4', " + startMs + ", " + endMs + @", 900000, 2048, 2560, 1440, 60, 1, 1, " + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() + @");";
                await cmd.ExecuteNonQueryAsync();
            }

            var sample = await _scanner.GetStationSampleChunkAsync(stationName);
            Assert.NotNull(sample);
            Assert.Equal("STATION-SAMPLE-TEST", sample.Hostname);
            Assert.Equal(2560, sample.Width);
            Assert.Equal(1440, sample.Height);
            Assert.Equal(60.0, sample.Fps);
        }

        public void Dispose()
        {
            try
            {
                if (Directory.Exists(_tempDir))
                {
                    Directory.Delete(_tempDir, true);
                }
            }
            catch { }
        }

        private class TestOptionsMonitor<T> : IOptionsMonitor<T>
        {
            public T CurrentValue { get; }
            public TestOptionsMonitor(T val) => CurrentValue = val;
            public T Get(string? name) => CurrentValue;
            public IDisposable OnChange(Action<T, string?> listener) => new NullDisposable();
            private class NullDisposable : IDisposable { public void Dispose() { } }
        }
    }
}
