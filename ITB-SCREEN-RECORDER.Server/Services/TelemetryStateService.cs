using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;

namespace ITB_SCREEN_RECORDER.Server.Services
{
    public interface ITelemetryStateService
    {
        Task<AgentHeartbeatResponse> ProcessHeartbeatAsync(AgentTelemetryReport report, string requestHost = null);
        void SetAgentStreamState(string hostname, bool shouldStream);
        IEnumerable<AgentTelemetryReport> GetAllAgents();
        Task<AgentStreamPolicy> GetAgentPolicyAsync(string hostname, string requestHost);
    }

    public class TelemetryStateService : ITelemetryStateService
    {
        private readonly ConcurrentDictionary<string, bool> _agentDesiredStates = new();
        private readonly ConcurrentDictionary<string, AgentTelemetryReport> _latestReports = new();
        private readonly IOptionsMonitor<SystemConfig> _configMonitor;
        private readonly StationOverridesService _overridesService;
        private readonly CustomTabsService _tabsService;
        private readonly OfflineSyncManager _syncManager;

        public TelemetryStateService(
            IOptionsMonitor<SystemConfig> configMonitor,
            StationOverridesService overridesService,
            CustomTabsService tabsService,
            OfflineSyncManager syncManager)
        {
            _configMonitor = configMonitor;
            _overridesService = overridesService;
            _tabsService = tabsService;
            _syncManager = syncManager;
        }

        public async Task<AgentHeartbeatResponse> ProcessHeartbeatAsync(AgentTelemetryReport report, string requestHost = null)
        {
            if (report == null || string.IsNullOrWhiteSpace(report.Hostname))
            {
                return new AgentHeartbeatResponse { ShouldStream = false, Command = ServerCommand.Standby };
            }

            string key = report.Hostname.ToUpperInvariant();

            // תיקון סעיף 4: כיבוד הגדרת AutoStartRecordingOnLaunch ומניעת הקלטה כפויה
            _agentDesiredStates.CustomGetOrAdd(key, () => report.IsStreaming || report.AutoStartRecordingOnLaunch);

            bool desiredStreamState = _agentDesiredStates[key];

            ServerCommand commandToSend = ServerCommand.Standby;
            if (desiredStreamState != report.IsStreaming)
            {
                commandToSend = desiredStreamState ? ServerCommand.StartStream : ServerCommand.StopStream;
            }

            // תיקון סעיף REC Timer: שימור חותמת זמן ההקלטה המקורית ומניעת איפוסה בריענונים
            if (report.IsStreaming)
            {
                if (!report.RecordingStartedAtUtc.HasValue)
                {
                    if (_latestReports.TryGetValue(key, out var prev) && prev.RecordingStartedAtUtc.HasValue)
                    {
                        report.RecordingStartedAtUtc = prev.RecordingStartedAtUtc;
                    }
                    else
                    {
                        report.RecordingStartedAtUtc = DateTime.UtcNow;
                    }
                }
            }
            else
            {
                report.RecordingStartedAtUtc = null;
            }

            _latestReports[key] = report;

            string hostToUse = !string.IsNullOrWhiteSpace(requestHost) ? requestHost : "128.200.3.10";

            // מדרג מדיניות (Overrides -> Tab Settings -> Global Defaults)
            var currentPolicy = await GetAgentPolicyAsync(report.Hostname, hostToUse);

            // ניהול תור העלאת באפרים מאופליין
            var bufferAction = _syncManager.GetSyncCommand(report.Hostname, report.OfflineFilesTotalSizeMb);

            return new AgentHeartbeatResponse
            {
                ShouldStream = desiredStreamState,
                Command = commandToSend,
                ServerUtcTime = DateTime.UtcNow,
                Policy = currentPolicy,
                OfflineBufferAction = bufferAction
            };
        }

        public void SetAgentStreamState(string hostname, bool shouldStream)
        {
            if (string.IsNullOrWhiteSpace(hostname)) return;
            string key = hostname.ToUpperInvariant();
            _agentDesiredStates[key] = shouldStream;

            if (_latestReports.TryGetValue(key, out var report))
            {
                if (shouldStream && !report.RecordingStartedAtUtc.HasValue)
                {
                    report.RecordingStartedAtUtc = DateTime.UtcNow;
                }
                else if (!shouldStream)
                {
                    report.RecordingStartedAtUtc = null;
                }
            }
        }

        public IEnumerable<AgentTelemetryReport> GetAllAgents()
        {
            return _latestReports.Values.ToList();
        }

        public async Task<AgentStreamPolicy> GetAgentPolicyAsync(string hostname, string requestHost)
        {
            var config = _configMonitor.CurrentValue;
            int rtmpPort = config.MediaMtx?.RtmpPort > 0 ? config.MediaMtx.RtmpPort : 19350;

            // 1. ברירות מחדל גלובליות דינמיות מתוך SystemConfig (מתעדכן בלייב)
            int fps = config.DefaultTargetFps >= 10 && config.DefaultTargetFps <= 60 ? config.DefaultTargetFps : 20;
            string bitrate = !string.IsNullOrWhiteSpace(config.DefaultVideoBitrate) ? config.DefaultVideoBitrate : "3000k";

            // 2. בדיקת מדיניות לפי Tab (אם העמדה משויכת ל-Tab ייעודי)
            var allTabs = await _tabsService.GetAllTabsAsync();
            var assignedTab = allTabs.FirstOrDefault(t => !t.IsDefault && t.Hostnames.Contains(hostname, StringComparer.OrdinalIgnoreCase));
            if (assignedTab != null)
            {
                if (assignedTab.TargetFps.HasValue && assignedTab.TargetFps.Value >= 10 && assignedTab.TargetFps.Value <= 60)
                {
                    fps = assignedTab.TargetFps.Value;
                }
                if (assignedTab.TargetBitrateKbps.HasValue && assignedTab.TargetBitrateKbps.Value >= 500)
                {
                    bitrate = $"{assignedTab.TargetBitrateKbps.Value}k";
                }
            }

            // 3. דריסה פרטנית לתחנה (העדיפות הגבוהה ביותר)
            var overrides = await _overridesService.GetAllAsync();
            if (overrides.TryGetValue(hostname, out var stationConfig))
            {
                if (!string.IsNullOrEmpty(stationConfig.VideoBitrate))
                {
                    bitrate = stationConfig.VideoBitrate.ToUpperInvariant();
                }

                if (stationConfig.TargetFps.HasValue && stationConfig.TargetFps.Value >= 10 && stationConfig.TargetFps.Value <= 60)
                {
                    fps = stationConfig.TargetFps.Value;
                }
            }

            if (int.TryParse(bitrate, out int numericBitrate))
            {
                bitrate = $"{numericBitrate}k";
            }

            return new AgentStreamPolicy
            {
                RtmpServerBaseUrl = $"rtmp://{requestHost}:{rtmpPort}/live",
                VideoBitrate = bitrate,
                TargetFps = fps
            };
        }
    }

    public static class ConcurrentDictionaryExtensions
    {
        public static TValue CustomGetOrAdd<TKey, TValue>(
            this ConcurrentDictionary<TKey, TValue> dict,
            TKey key,
            Func<TValue> valueFactory) where TKey : notnull
        {
            return dict.GetOrAdd(key, _ => valueFactory());
        }
    }
}