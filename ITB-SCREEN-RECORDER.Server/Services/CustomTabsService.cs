using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace ITB_SCREEN_RECORDER.Server.Services
{
    public class CustomTabModel
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = Guid.NewGuid().ToString("N");

        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("hostnames")]
        public List<string> Hostnames { get; set; } = new();

        [JsonPropertyName("targetFps")]
        public int? TargetFps { get; set; }

        [JsonPropertyName("targetBitrateKbps")]
        public int? TargetBitrateKbps { get; set; }

        [JsonPropertyName("isDefault")]
        public bool IsDefault { get; set; }
    }

    public class CustomTabsService
    {
        private readonly string _filePath;
        private readonly ILogger<CustomTabsService> _logger;
        private readonly SemaphoreSlim _lock = new(1, 1);
        private List<CustomTabModel> _tabs = new();

        public CustomTabsService(ILogger<CustomTabsService> logger)
        {
            _logger = logger;
            _filePath = Path.Combine(AppContext.BaseDirectory, "custom-tabs.json");
            LoadInitialTabs();
        }

        private void LoadInitialTabs()
        {
            try
            {
                if (File.Exists(_filePath))
                {
                    string json = File.ReadAllText(_filePath);
                    _tabs = JsonSerializer.Deserialize<List<CustomTabModel>>(json) ?? GetDefaultTabs();
                }
                else
                {
                    _tabs = GetDefaultTabs();
                    SaveTabsInternal();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[TABS] Failed to load tabs configuration. Using defaults.");
                _tabs = GetDefaultTabs();
            }
        }

        private List<CustomTabModel> GetDefaultTabs() => new()
        {
            new CustomTabModel
            {
                Id = "all",
                Name = "כל התחנות",
                Hostnames = new List<string>(),
                IsDefault = true
            }
        };

        public async Task<List<CustomTabModel>> GetAllTabsAsync()
        {
            await _lock.WaitAsync();
            try
            {
                return _tabs.ToList();
            }
            finally
            {
                _lock.Release();
            }
        }

        public async Task<CustomTabModel> SaveTabAsync(CustomTabModel tab)
        {
            await _lock.WaitAsync();
            try
            {
                if (string.IsNullOrWhiteSpace(tab.Id)) tab.Id = Guid.NewGuid().ToString("N");

                int idx = _tabs.FindIndex(t => t.Id.Equals(tab.Id, StringComparison.OrdinalIgnoreCase));
                if (idx >= 0)
                {
                    if (_tabs[idx].IsDefault) tab.IsDefault = true;
                    _tabs[idx] = tab;
                }
                else
                {
                    _tabs.Add(tab);
                }

                SaveTabsInternal();
                return tab;
            }
            finally
            {
                _lock.Release();
            }
        }

        public async Task<bool> DeleteTabAsync(string tabId)
        {
            await _lock.WaitAsync();
            try
            {
                var tab = _tabs.FirstOrDefault(t => t.Id.Equals(tabId, StringComparison.OrdinalIgnoreCase));
                if (tab == null || tab.IsDefault) return false;

                _tabs.Remove(tab);
                SaveTabsInternal();
                return true;
            }
            finally
            {
                _lock.Release();
            }
        }

        public async Task AssignStationAsync(string tabId, string hostname)
        {
            await _lock.WaitAsync();
            try
            {
                var tab = _tabs.FirstOrDefault(t => t.Id.Equals(tabId, StringComparison.OrdinalIgnoreCase));
                if (tab != null && !tab.Hostnames.Contains(hostname, StringComparer.OrdinalIgnoreCase))
                {
                    tab.Hostnames.Add(hostname);
                    SaveTabsInternal();
                }
            }
            finally
            {
                _lock.Release();
            }
        }

        public async Task RemoveStationAsync(string tabId, string hostname)
        {
            await _lock.WaitAsync();
            try
            {
                var tab = _tabs.FirstOrDefault(t => t.Id.Equals(tabId, StringComparison.OrdinalIgnoreCase));
                if (tab != null)
                {
                    tab.Hostnames.RemoveAll(h => h.Equals(hostname, StringComparison.OrdinalIgnoreCase));
                    SaveTabsInternal();
                }
            }
            finally
            {
                _lock.Release();
            }
        }

        private void SaveTabsInternal()
        {
            try
            {
                string json = JsonSerializer.Serialize(_tabs, new JsonSerializerOptions { WriteIndented = true });
                File.WriteAllText(_filePath, json);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[TABS] Failed to persist tabs to disk.");
            }
        }
    }
}