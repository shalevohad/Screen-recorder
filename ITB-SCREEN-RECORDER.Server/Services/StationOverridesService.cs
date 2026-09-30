using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Dapper;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Server.Data;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace ITB_SCREEN_RECORDER.Server.Services
{
    public class StationOverridesService
    {
        private readonly ICatalogConnectionFactory _factory;
        private readonly ILogger<StationOverridesService> _logger;
        private readonly string _filePath;
        private readonly JsonSerializerOptions _jsonOptions = new()
        {
            WriteIndented = true,
            PropertyNameCaseInsensitive = true
        };

        public StationOverridesService(
            ICatalogConnectionFactory factory,
            ILogger<StationOverridesService> logger,
            IHostEnvironment? env = null)
        {
            _factory = factory;
            _logger = logger;

            string targetDir = env?.ContentRootPath ?? AppContext.BaseDirectory;
            try
            {
                string testFile = Path.Combine(targetDir, $".perm_test_{Guid.NewGuid():N}");
                File.WriteAllText(testFile, string.Empty);
                File.Delete(testFile);
            }
            catch
            {
                targetDir = Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData),
                    "ITB-SCREEN-RECORDER");
            }

            Directory.CreateDirectory(targetDir);
            _filePath = Path.Combine(targetDir, "stations-config.json");

            EnsureInitialized();
        }

        private void EnsureInitialized()
        {
            try
            {
                using var db = _factory.CreateConnection();
                db.Execute(@"
                    CREATE TABLE IF NOT EXISTS station_overrides (
                        hostname TEXT PRIMARY KEY,
                        video_bitrate TEXT,
                        target_fps INTEGER,
                        updated_at_utc INTEGER NOT NULL
                    );
                ");

                int count = db.ExecuteScalar<int>("SELECT COUNT(1) FROM station_overrides;");
                if (count == 0 && File.Exists(_filePath))
                {
                    string json = File.ReadAllText(_filePath);
                    if (!string.IsNullOrWhiteSpace(json) && json.Trim() != "{}")
                    {
                        var legacyData = JsonSerializer.Deserialize<Dictionary<string, StationOverride>>(json, _jsonOptions);
                        if (legacyData != null && legacyData.Count > 0)
                        {
                            var now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
                            foreach (var kvp in legacyData)
                            {
                                db.Execute(@"
                                    INSERT INTO station_overrides (hostname, video_bitrate, target_fps, updated_at_utc)
                                    VALUES (@Hostname, @VideoBitrate, @TargetFps, @UpdatedAtUtc);",
                                    new
                                    {
                                        Hostname = kvp.Key.Trim(),
                                        kvp.Value.VideoBitrate,
                                        kvp.Value.TargetFps,
                                        UpdatedAtUtc = now
                                    });
                            }
                            _logger.LogInformation("[OVERRIDES] Successfully migrated {Count} station overrides from JSON to SQLite.", legacyData.Count);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[OVERRIDES] Failed to initialize SQLite station_overrides table or migrate data.");
            }
        }

        public async Task<Dictionary<string, StationOverride>> GetAllAsync()
        {
            try
            {
                using var db = _factory.CreateConnection();
                const string sql = "SELECT hostname AS Hostname, video_bitrate AS VideoBitrate, target_fps AS TargetFps FROM station_overrides;";
                var rows = await db.QueryAsync<OverrideDbEntity>(sql);

                var dict = new Dictionary<string, StationOverride>(StringComparer.OrdinalIgnoreCase);
                foreach (var row in rows)
                {
                    dict[row.Hostname] = new StationOverride
                    {
                        VideoBitrate = row.VideoBitrate,
                        TargetFps = row.TargetFps
                    };
                }
                return dict;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[OVERRIDES] Failed reading overrides from SQLite. Falling back to local mirror.");
                return await ReadJsonFallbackAsync();
            }
        }

        public async Task SetOverrideAsync(string hostname, StationOverride overrideConfig)
        {
            if (string.IsNullOrWhiteSpace(hostname) || overrideConfig == null) return;

            using var db = _factory.CreateConnection();
            const string sql = @"
                INSERT INTO station_overrides (hostname, video_bitrate, target_fps, updated_at_utc)
                VALUES (@Hostname, @VideoBitrate, @TargetFps, @UpdatedAtUtc)
                ON CONFLICT(hostname) DO UPDATE SET
                    video_bitrate = excluded.video_bitrate,
                    target_fps = excluded.target_fps,
                    updated_at_utc = excluded.updated_at_utc;
            ";

            var now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            await db.ExecuteAsync(sql, new
            {
                Hostname = hostname.Trim(),
                overrideConfig.VideoBitrate,
                overrideConfig.TargetFps,
                UpdatedAtUtc = now
            });

            _ = SyncToJsonFileAsync();
        }

        public async Task<bool> RemoveOverrideAsync(string hostname)
        {
            if (string.IsNullOrWhiteSpace(hostname)) return false;

            using var db = _factory.CreateConnection();
            const string sql = "DELETE FROM station_overrides WHERE hostname = @Hostname;";
            int affected = await db.ExecuteAsync(sql, new { Hostname = hostname.Trim() });

            if (affected > 0)
            {
                _ = SyncToJsonFileAsync();
                return true;
            }
            return false;
        }

        public async Task ResetAllOverridesAsync()
        {
            using var db = _factory.CreateConnection();
            await db.ExecuteAsync("DELETE FROM station_overrides;");
            _ = SyncToJsonFileAsync();
        }

        private async Task SyncToJsonFileAsync()
        {
            try
            {
                var data = await GetAllAsync();
                string tempPath = $"{_filePath}.{Guid.NewGuid():N}.tmp";

                await using (var createStream = new FileStream(
                    tempPath,
                    FileMode.Create,
                    FileAccess.Write,
                    FileShare.None))
                {
                    await JsonSerializer.SerializeAsync(createStream, data, _jsonOptions);
                    await createStream.FlushAsync();
                }

                File.Move(tempPath, _filePath, overwrite: true);
            }
            catch (Exception ex)
            {
                _logger.LogWarning("[OVERRIDES] Failed to mirror overrides to stations-config.json: {Message}", ex.Message);
            }
        }

        private async Task<Dictionary<string, StationOverride>> ReadJsonFallbackAsync()
        {
            if (!File.Exists(_filePath))
            {
                return new Dictionary<string, StationOverride>(StringComparer.OrdinalIgnoreCase);
            }

            try
            {
                await using var stream = new FileStream(_filePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                if (stream.Length == 0) return new Dictionary<string, StationOverride>(StringComparer.OrdinalIgnoreCase);

                var res = await JsonSerializer.DeserializeAsync<Dictionary<string, StationOverride>>(stream, _jsonOptions);
                return res != null
                    ? new Dictionary<string, StationOverride>(res, StringComparer.OrdinalIgnoreCase)
                    : new Dictionary<string, StationOverride>(StringComparer.OrdinalIgnoreCase);
            }
            catch
            {
                return new Dictionary<string, StationOverride>(StringComparer.OrdinalIgnoreCase);
            }
        }

        private sealed class OverrideDbEntity
        {
            public string Hostname { get; set; } = string.Empty;
            public string? VideoBitrate { get; set; }
            public int? TargetFps { get; set; }
        }
    }
}