using System;
using System.IO;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Server.Models;
using Microsoft.Extensions.Hosting;

namespace ITB_SCREEN_RECORDER.Server.Services
{
    public class SettingsFileService
    {
        private readonly string _appSettingsPath;
        private readonly SemaphoreSlim _writeLock = new(1, 1);

        public SettingsFileService(IHostEnvironment env)
        {
            _appSettingsPath = Path.Combine(env.ContentRootPath, "appsettings.json");
        }

        public async Task<SystemConfigDto> ReadAsync()
        {
            await using var stream = File.OpenRead(_appSettingsPath);
            var root = await JsonNode.ParseAsync(stream).ConfigureAwait(false);
            var systemConfig = root?["SystemConfig"] ?? throw new InvalidOperationException("SystemConfig section missing from appsettings.json");
            var storage = systemConfig["Storage"] ?? throw new InvalidOperationException("SystemConfig.Storage section missing from appsettings.json");
            var discovery = systemConfig["Discovery"];

            var discoveryDto = new DiscoverySettingsDto();
            if (discovery != null)
            {
                discoveryDto.Enabled = (bool)(discovery["Enabled"] ?? true);
                discoveryDto.Port = (int)(discovery["Port"] ?? 5098);
                discoveryDto.MulticastAddress = (string)(discovery["MulticastAddress"] ?? "239.255.10.90");
                discoveryDto.Role = (string)(discovery["Role"] ?? "Primary");
                discoveryDto.Priority = (int)(discovery["Priority"] ?? 1);
                discoveryDto.PartnerServerUrl = (string?)discovery["PartnerServerUrl"];
                discoveryDto.AutoFailoverDashboard = (bool)(discovery["AutoFailoverDashboard"] ?? true);
                discoveryDto.DashboardFailoverDelaySeconds = (int)(discovery["DashboardFailoverDelaySeconds"] ?? 8);
            }

            return new SystemConfigDto
            {
                RecordingRetentionDays = (int)systemConfig["RecordingRetentionDays"]!,
                MaxStorageQuotaGb = (int)systemConfig["MaxStorageQuotaGb"]!,
                DashboardRefreshRateMs = (int)systemConfig["DashboardRefreshRateMs"]!,
                DefaultVideoBitrate = (string)systemConfig["DefaultVideoBitrate"]!,
                DefaultTargetFps = (int)systemConfig["DefaultTargetFps"]!,

                DisplayTimezone = (string)(systemConfig["DisplayTimezone"] ?? "Asia/Jerusalem"),

                // 💡 קריאת ה-Locale
                DisplayLocale = (string)(systemConfig["DisplayLocale"] ?? "en-US"),

                Storage = new StorageSettingsDto
                {
                    NetAppUncPath = (string)storage["NetAppUncPath"]!,
                    LocalFallbackPath = (string)storage["LocalFallbackPath"]!,
                    ChunkIntervalMinutes = (int)storage["ChunkIntervalMinutes"]!,
                    RetentionDays = (int)storage["RetentionDays"]!,
                    ChunkEventLogPath = (string)storage["ChunkEventLogPath"]!
                },

                Discovery = discoveryDto
            };
        }

        public async Task WriteAsync(SystemConfigDto dto)
        {
            await _writeLock.WaitAsync().ConfigureAwait(false);
            try
            {
                var root = JsonNode.Parse(await File.ReadAllTextAsync(_appSettingsPath).ConfigureAwait(false));
                var systemConfig = root?["SystemConfig"] ?? throw new InvalidOperationException("SystemConfig section missing from appsettings.json");
                var storage = systemConfig["Storage"] ?? throw new InvalidOperationException("SystemConfig.Storage section missing from appsettings.json");

                systemConfig["RecordingRetentionDays"] = dto.RecordingRetentionDays;
                systemConfig["MaxStorageQuotaGb"] = dto.MaxStorageQuotaGb;
                systemConfig["DashboardRefreshRateMs"] = dto.DashboardRefreshRateMs;
                systemConfig["DefaultVideoBitrate"] = dto.DefaultVideoBitrate;
                systemConfig["DefaultTargetFps"] = dto.DefaultTargetFps;

                systemConfig["DisplayTimezone"] = dto.DisplayTimezone;

                // 💡 כתיבת ה-Locale לדיסק
                systemConfig["DisplayLocale"] = dto.DisplayLocale;

                storage["NetAppUncPath"] = dto.Storage.NetAppUncPath;
                storage["LocalFallbackPath"] = dto.Storage.LocalFallbackPath;
                storage["ChunkIntervalMinutes"] = dto.Storage.ChunkIntervalMinutes;
                storage["RetentionDays"] = dto.Storage.RetentionDays;
                storage["ChunkEventLogPath"] = dto.Storage.ChunkEventLogPath;

                if (dto.Discovery != null)
                {
                    var discNode = systemConfig["Discovery"] as JsonObject;
                    if (discNode == null)
                    {
                        discNode = new JsonObject();
                        systemConfig["Discovery"] = discNode;
                    }

                    discNode["Enabled"] = dto.Discovery.Enabled;
                    discNode["Port"] = dto.Discovery.Port;
                    discNode["MulticastAddress"] = dto.Discovery.MulticastAddress;
                    discNode["Role"] = dto.Discovery.Role;
                    discNode["Priority"] = dto.Discovery.Priority;
                    discNode["PartnerServerUrl"] = dto.Discovery.PartnerServerUrl ?? "";
                    discNode["AutoFailoverDashboard"] = dto.Discovery.AutoFailoverDashboard;
                    discNode["DashboardFailoverDelaySeconds"] = dto.Discovery.DashboardFailoverDelaySeconds;
                }

                var json = root!.ToJsonString(new JsonSerializerOptions { WriteIndented = true });

                var tempPath = _appSettingsPath + ".tmp";
                await File.WriteAllTextAsync(tempPath, json).ConfigureAwait(false);
                File.Move(tempPath, _appSettingsPath, overwrite: true);
            }
            finally
            {
                _writeLock.Release();
            }
        }
    }
}