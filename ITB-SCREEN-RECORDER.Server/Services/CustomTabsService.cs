using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Dapper;
using ITB_SCREEN_RECORDER.Server.Data;
using Microsoft.Extensions.Logging;

namespace ITB_SCREEN_RECORDER.Server.Services
{
    public class CustomTabModel
    {
        private List<string> _hostnames = new();
        private int? _targetFps;
        private int? _targetBitrateKbps;

        [JsonPropertyName("id")]
        public string Id { get; set; } = Guid.NewGuid().ToString("N");

        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        // תמיכה כפולה בשם השדה הישן והחדש (Hostnames מול assignedHostnames מה-UI)
        [JsonPropertyName("hostnames")]
        public List<string> Hostnames
        {
            get => _hostnames;
            set { if (value != null && (value.Count > 0 || _hostnames.Count == 0)) _hostnames = value; }
        }

        [JsonPropertyName("assignedHostnames")]
        public List<string> AssignedHostnames
        {
            get => _hostnames;
            set { if (value != null && (value.Count > 0 || _hostnames.Count == 0)) _hostnames = value; }
        }

        [JsonPropertyName("assignedOus")]
        public List<string> AssignedOus { get; set; } = new();

        // תמיכה כפולה ב-TargetFps ו-defaultFps
        [JsonPropertyName("targetFps")]
        public int? TargetFps
        {
            get => _targetFps;
            set { if (value.HasValue || !_targetFps.HasValue) _targetFps = value; }
        }

        [JsonPropertyName("defaultFps")]
        public int? DefaultFps
        {
            get => _targetFps;
            set { if (value.HasValue || !_targetFps.HasValue) _targetFps = value; }
        }

        // תמיכה כפולה ב-TargetBitrateKbps ו-defaultBitrate
        [JsonPropertyName("targetBitrateKbps")]
        public int? TargetBitrateKbps
        {
            get => _targetBitrateKbps;
            set { if (value.HasValue || !_targetBitrateKbps.HasValue) _targetBitrateKbps = value; }
        }

        [JsonPropertyName("defaultBitrate")]
        public int? DefaultBitrate
        {
            get => _targetBitrateKbps;
            set { if (value.HasValue || !_targetBitrateKbps.HasValue) _targetBitrateKbps = value; }
        }

        [JsonPropertyName("isDefault")]
        public bool IsDefault { get; set; }

        [JsonPropertyName("displayOrder")]
        public int DisplayOrder { get; set; }
    }

    public class CustomTabsService
    {
        private readonly ICatalogConnectionFactory _factory;
        private readonly ILogger<CustomTabsService> _logger;
        private readonly string _legacyFilePath;

        public CustomTabsService(ICatalogConnectionFactory factory, ILogger<CustomTabsService> logger)
        {
            _factory = factory;
            _logger = logger;
            _legacyFilePath = Path.Combine(AppContext.BaseDirectory, "custom-tabs.json");
            EnsureInitialized();
        }

        private void EnsureInitialized()
        {
            try
            {
                using var db = _factory.CreateConnection();
                db.Execute(@"
                    CREATE TABLE IF NOT EXISTS custom_tabs (
                        id TEXT PRIMARY KEY,
                        name TEXT NOT NULL,
                        hostnames_json TEXT NOT NULL DEFAULT '[]',
                        ous_json TEXT NOT NULL DEFAULT '[]',
                        target_fps INTEGER,
                        target_bitrate_kbps INTEGER,
                        is_default INTEGER NOT NULL DEFAULT 0,
                        display_order INTEGER NOT NULL DEFAULT 0,
                        updated_at_utc INTEGER NOT NULL
                    );
                    CREATE INDEX IF NOT EXISTS idx_custom_tabs_order ON custom_tabs (display_order ASC);
                ");

                int count = db.ExecuteScalar<int>("SELECT COUNT(1) FROM custom_tabs;");
                if (count == 0)
                {
                    // מיגרציה של קובץ ה-JSON הקיים למסד הנתונים
                    if (File.Exists(_legacyFilePath))
                    {
                        string json = File.ReadAllText(_legacyFilePath);
                        var legacyTabs = JsonSerializer.Deserialize<List<CustomTabModel>>(json);
                        if (legacyTabs != null && legacyTabs.Count > 0)
                        {
                            var now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
                            foreach (var tab in legacyTabs)
                            {
                                db.Execute(@"
                                    INSERT INTO custom_tabs (
                                        id, name, hostnames_json, ous_json, 
                                        target_fps, target_bitrate_kbps, is_default, display_order, updated_at_utc
                                    ) VALUES (
                                        @Id, @Name, @HostnamesJson, @OusJson, 
                                        @TargetFps, @TargetBitrateKbps, @IsDefault, @DisplayOrder, @UpdatedAtUtc
                                    );",
                                    new
                                    {
                                        tab.Id,
                                        tab.Name,
                                        HostnamesJson = JsonSerializer.Serialize(tab.Hostnames ?? new List<string>()),
                                        OusJson = JsonSerializer.Serialize(tab.AssignedOus ?? new List<string>()),
                                        tab.TargetFps,
                                        tab.TargetBitrateKbps,
                                        IsDefault = tab.IsDefault ? 1 : 0,
                                        tab.DisplayOrder,
                                        UpdatedAtUtc = now
                                    });
                            }
                            _logger.LogInformation("[TABS] Successfully migrated {Count} tabs from custom-tabs.json to SQLite.", legacyTabs.Count);
                            return;
                        }
                    }

                    // יצירת טאב ברירת מחדל אם לא קיים קובץ מקור
                    var defaultNow = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
                    db.Execute(@"
                        INSERT INTO custom_tabs (
                            id, name, hostnames_json, ous_json, 
                            target_fps, target_bitrate_kbps, is_default, display_order, updated_at_utc
                        ) VALUES (
                            'all', 'All Stations', '[]', '[]', 
                            NULL, NULL, 1, 0, @UpdatedAtUtc
                        );", new { UpdatedAtUtc = defaultNow });

                    _logger.LogInformation("[TABS] Initialized default 'All Stations' tab in SQLite.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[TABS] Failed to initialize SQLite custom_tabs table or migrate JSON.");
            }
        }

        public async Task<List<CustomTabModel>> GetAllTabsAsync()
        {
            using var db = _factory.CreateConnection();
            const string sql = @"
                SELECT id AS Id, name AS Name, 
                       hostnames_json AS HostnamesJson, ous_json AS OusJson, 
                       target_fps AS TargetFps, target_bitrate_kbps AS TargetBitrateKbps, 
                       is_default AS IsDefault, display_order AS DisplayOrder
                FROM custom_tabs 
                ORDER BY display_order ASC, name ASC;
            ";

            var rows = await db.QueryAsync<TabDbEntity>(sql);
            var list = new List<CustomTabModel>();

            foreach (var row in rows)
            {
                list.Add(new CustomTabModel
                {
                    Id = row.Id,
                    Name = row.Name,
                    Hostnames = DeserializeList(row.HostnamesJson),
                    AssignedOus = DeserializeList(row.OusJson),
                    TargetFps = row.TargetFps,
                    TargetBitrateKbps = row.TargetBitrateKbps,
                    IsDefault = row.IsDefault != 0,
                    DisplayOrder = row.DisplayOrder
                });
            }

            if (list.Count == 0)
            {
                var defaultTab = new CustomTabModel
                {
                    Id = "all",
                    Name = "All Stations",
                    Hostnames = new List<string>(),
                    IsDefault = true,
                    DisplayOrder = 0
                };
                await SaveTabAsync(defaultTab);
                list.Add(defaultTab);
            }

            return list;
        }

        public async Task<CustomTabModel> SaveTabAsync(CustomTabModel tab)
        {
            if (tab == null) throw new ArgumentNullException(nameof(tab));
            if (string.IsNullOrWhiteSpace(tab.Id)) tab.Id = $"tab_{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}";

            using var db = _factory.CreateConnection();

            const string checkSql = "SELECT is_default FROM custom_tabs WHERE id = @Id;";
            int? existingDefault = await db.ExecuteScalarAsync<int?>(checkSql, new { tab.Id });
            if (existingDefault.HasValue && existingDefault.Value == 1)
            {
                tab.IsDefault = true;
            }

            const string upsertSql = @"
                INSERT INTO custom_tabs (
                    id, name, hostnames_json, ous_json, 
                    target_fps, target_bitrate_kbps, is_default, display_order, updated_at_utc
                ) VALUES (
                    @Id, @Name, @HostnamesJson, @OusJson, 
                    @TargetFps, @TargetBitrateKbps, @IsDefault, @DisplayOrder, @UpdatedAtUtc
                )
                ON CONFLICT(id) DO UPDATE SET
                    name = excluded.name,
                    hostnames_json = excluded.hostnames_json,
                    ous_json = excluded.ous_json,
                    target_fps = excluded.target_fps,
                    target_bitrate_kbps = excluded.target_bitrate_kbps,
                    is_default = excluded.is_default,
                    display_order = excluded.display_order,
                    updated_at_utc = excluded.updated_at_utc;
            ";

            var now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            await db.ExecuteAsync(upsertSql, new
            {
                tab.Id,
                Name = tab.Name ?? string.Empty,
                HostnamesJson = JsonSerializer.Serialize(tab.Hostnames ?? new List<string>()),
                OusJson = JsonSerializer.Serialize(tab.AssignedOus ?? new List<string>()),
                tab.TargetFps,
                tab.TargetBitrateKbps,
                IsDefault = tab.IsDefault ? 1 : 0,
                tab.DisplayOrder,
                UpdatedAtUtc = now
            });

            _ = SyncToJsonFileAsync();

            return tab;
        }

        public async Task<bool> DeleteTabAsync(string tabId)
        {
            if (string.IsNullOrWhiteSpace(tabId)) return false;

            using var db = _factory.CreateConnection();
            const string deleteSql = "DELETE FROM custom_tabs WHERE id = @tabId AND is_default = 0;";
            int affected = await db.ExecuteAsync(deleteSql, new { tabId });

            if (affected > 0)
            {
                _ = SyncToJsonFileAsync();
                return true;
            }

            return false;
        }

        public async Task AssignStationAsync(string tabId, string hostname)
        {
            if (string.IsNullOrWhiteSpace(tabId) || string.IsNullOrWhiteSpace(hostname)) return;

            using var db = _factory.CreateConnection();
            const string selectSql = "SELECT hostnames_json FROM custom_tabs WHERE id = @tabId;";
            string? hostnamesJson = await db.ExecuteScalarAsync<string?>(selectSql, new { tabId });

            if (hostnamesJson != null)
            {
                var list = DeserializeList(hostnamesJson);
                if (!list.Contains(hostname, StringComparer.OrdinalIgnoreCase))
                {
                    list.Add(hostname);
                    const string updateSql = @"
                        UPDATE custom_tabs 
                        SET hostnames_json = @HostnamesJson, updated_at_utc = @UpdatedAtUtc 
                        WHERE id = @tabId;
                    ";
                    await db.ExecuteAsync(updateSql, new
                    {
                        tabId,
                        HostnamesJson = JsonSerializer.Serialize(list),
                        UpdatedAtUtc = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
                    });

                    _ = SyncToJsonFileAsync();
                }
            }
        }

        public async Task RemoveStationAsync(string tabId, string hostname)
        {
            if (string.IsNullOrWhiteSpace(tabId) || string.IsNullOrWhiteSpace(hostname)) return;

            using var db = _factory.CreateConnection();
            const string selectSql = "SELECT hostnames_json FROM custom_tabs WHERE id = @tabId;";
            string? hostnamesJson = await db.ExecuteScalarAsync<string?>(selectSql, new { tabId });

            if (hostnamesJson != null)
            {
                var list = DeserializeList(hostnamesJson);
                int removedCount = list.RemoveAll(h => string.Equals(h, hostname, StringComparison.OrdinalIgnoreCase));
                if (removedCount > 0)
                {
                    const string updateSql = @"
                        UPDATE custom_tabs 
                        SET hostnames_json = @HostnamesJson, updated_at_utc = @UpdatedAtUtc 
                        WHERE id = @tabId;
                    ";
                    await db.ExecuteAsync(updateSql, new
                    {
                        tabId,
                        HostnamesJson = JsonSerializer.Serialize(list),
                        UpdatedAtUtc = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
                    });

                    _ = SyncToJsonFileAsync();
                }
            }
        }

        private async Task SyncToJsonFileAsync()
        {
            try
            {
                var all = await GetAllTabsAsync();
                string json = JsonSerializer.Serialize(all, new JsonSerializerOptions { WriteIndented = true });
                await File.WriteAllTextAsync(_legacyFilePath, json);
            }
            catch (Exception ex)
            {
                _logger.LogWarning("[TABS] Failed to sync tabs to JSON mirror: {Message}", ex.Message);
            }
        }

        private static List<string> DeserializeList(string? json)
        {
            if (string.IsNullOrWhiteSpace(json)) return new List<string>();
            try
            {
                return JsonSerializer.Deserialize<List<string>>(json) ?? new List<string>();
            }
            catch
            {
                return new List<string>();
            }
        }

        private sealed class TabDbEntity
        {
            public string Id { get; set; } = string.Empty;
            public string Name { get; set; } = string.Empty;
            public string? HostnamesJson { get; set; }
            public string? OusJson { get; set; }
            public int? TargetFps { get; set; }
            public int? TargetBitrateKbps { get; set; }
            public int IsDefault { get; set; }
            public int DisplayOrder { get; set; }
            public long UpdatedAtUtc { get; set; }
        }
    }
}