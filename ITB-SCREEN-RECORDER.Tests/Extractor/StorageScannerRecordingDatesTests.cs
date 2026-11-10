using System;
using System.IO;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Features.Extractor.Models;
using ITB_SCREEN_RECORDER.Features.Extractor.Services;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Controllers;
using ITB_SCREEN_RECORDER.Features.ExtractorAdvanced.Services;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Extractor
{
    public class StorageScannerRecordingDatesTests : IDisposable
    {
        private readonly string _tempDir;
        private readonly string _storageDir;
        private readonly StorageScannerService _scanner;

        public StorageScannerRecordingDatesTests()
        {
            _tempDir = Path.Combine(Path.GetTempPath(), "itb_dates_test_" + Guid.NewGuid().ToString("N"));
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

        public void Dispose()
        {
            try
            {
                SqliteConnection.ClearAllPools();
                if (Directory.Exists(_tempDir))
                {
                    Directory.Delete(_tempDir, true);
                }
            }
            catch { }
        }

        [Fact]
        public async Task GetRecordingDatesAsync_ReturnsDistinctDates_FromCatalogDb()
        {
            // Seed catalog database with test chunks
            string dbPath = Path.Combine(_tempDir, "system_catalog.db");
            using (var conn = new SqliteConnection($"Data Source={dbPath};Mode=ReadWriteCreate"))
            {
                conn.Open();
                conn.Execute(@"
                    CREATE TABLE IF NOT EXISTS recording_chunks (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        station_id TEXT NOT NULL,
                        file_path TEXT NOT NULL UNIQUE,
                        start_epoch_ms INTEGER NOT NULL,
                        end_epoch_ms INTEGER NOT NULL,
                        duration_ms INTEGER NOT NULL DEFAULT 0,
                        file_size_bytes INTEGER NOT NULL DEFAULT 0,
                        width INTEGER NOT NULL DEFAULT 1920,
                        height INTEGER NOT NULL DEFAULT 1080,
                        fps INTEGER NOT NULL DEFAULT 30,
                        has_audio INTEGER NOT NULL DEFAULT 1,
                        is_finalized INTEGER NOT NULL DEFAULT 1,
                        indexed_at_utc INTEGER NOT NULL DEFAULT 0,
                        display_id TEXT NOT NULL DEFAULT 'mon-0',
                        is_primary INTEGER NOT NULL DEFAULT 1,
                        display_bounds TEXT
                    );");

                // 2026-11-02 10:00:00 UTC
                long d1Start = new DateTimeOffset(2026, 11, 2, 10, 0, 0, TimeSpan.Zero).ToUnixTimeMilliseconds();
                long d1End = d1Start + 300000;

                // 2026-11-05 14:00:00 UTC
                long d2Start = new DateTimeOffset(2026, 11, 5, 14, 0, 0, TimeSpan.Zero).ToUnixTimeMilliseconds();
                long d2End = d2Start + 300000;

                // 2026-12-01 08:00:00 UTC (Station B)
                long d3Start = new DateTimeOffset(2026, 12, 1, 8, 0, 0, TimeSpan.Zero).ToUnixTimeMilliseconds();
                long d3End = d3Start + 300000;

                conn.Execute(@"
                    INSERT INTO recording_chunks (station_id, file_path, start_epoch_ms, end_epoch_ms, is_finalized)
                    VALUES 
                    ('STATION-01', 'rec1.mp4', @d1Start, @d1End, 1),
                    ('STATION-01', 'rec2.mp4', @d2Start, @d2End, 1),
                    ('STATION-02', 'rec3.mp4', @d3Start, @d3End, 1);",
                    new { d1Start, d1End, d2Start, d2End, d3Start, d3End });
            }

            // 1. Query all recording dates
            var allDates = await _scanner.GetRecordingDatesAsync(timeMode: "UTC");
            Assert.Contains("2026-11-02", allDates);
            Assert.Contains("2026-11-05", allDates);
            Assert.Contains("2026-12-01", allDates);
            Assert.Equal(3, allDates.Count);

            // 2. Query filtered by year/month (Nov 2026)
            var novDates = await _scanner.GetRecordingDatesAsync(year: 2026, month: 11, timeMode: "UTC");
            Assert.Contains("2026-11-02", novDates);
            Assert.Contains("2026-11-05", novDates);
            Assert.DoesNotContain("2026-12-01", novDates);
            Assert.Equal(2, novDates.Count);

            // 3. Query filtered by station (STATION-02)
            var st2Dates = await _scanner.GetRecordingDatesAsync(stationId: "STATION-02", timeMode: "UTC");
            Assert.Single(st2Dates);
            Assert.Equal("2026-12-01", st2Dates[0]);
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
