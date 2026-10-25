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
        private readonly MediaMtxApiClient? _mediaMtxApi;

        public TelemetryStateService(
            IOptionsMonitor<SystemConfig> configMonitor,
            StationOverridesService overridesService,
            CustomTabsService tabsService,
            OfflineSyncManager syncManager,
            MediaMtxApiClient? mediaMtxApi = null)
        {
            _configMonitor = configMonitor;
            _overridesService = overridesService;
            _tabsService = tabsService;
            _syncManager = syncManager;
            _mediaMtxApi = mediaMtxApi;
        }

        public async Task<AgentHeartbeatResponse> ProcessHeartbeatAsync(AgentTelemetryReport report, string requestHost = null)
        {
            if (report == null || string.IsNullOrWhiteSpace(report.Hostname))
            {
                return new AgentHeartbeatResponse { ShouldStream = false, Command = ServerCommand.Standby };
            }

            string key = report.Hostname.ToUpperInvariant();

            // 💡 העמדות משדרות תמיד בלייב כשהן פעילות (24/7 Continuous Live Surveillance)
            bool shouldStream = true;

            // ניהול מצב הקלטה רצוי (Record vs Monitor-Only)
            _agentDesiredStates.CustomGetOrAdd(key, () => report.IsRecording || report.RecordingStartedAtUtc.HasValue || report.AutoStartRecordingOnLaunch);

            bool isRecordingDesired = _agentDesiredStates[key];
            report.IsRecording = isRecordingDesired;

            // העמדה מקבלת פקודת שידור תמידית כל עוד היא אינה משדרת
            ServerCommand commandToSend = ServerCommand.Standby;
            if (!report.IsStreaming)
            {
                commandToSend = ServerCommand.StartStream;
            }

            // ניהול טיימר הקלטה עבור עמדה מקליטה בלבד
            if (report.IsRecording)
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

            // עדכון חותמת הזמן על פי שעון השרת הנוכחי למניעת בעיות Clock Skew בין עמדות הקצה לשרת
            report.Timestamp = DateTime.UtcNow;

            if (report.DisplayTopology == null && _latestReports.TryGetValue(key, out var prevReport) && prevReport.DisplayTopology != null)
            {
                report.DisplayTopology = prevReport.DisplayTopology;
            }

            _latestReports[key] = report;

            string hostToUse = !string.IsNullOrWhiteSpace(requestHost)
                ? requestHost
                : (!string.IsNullOrWhiteSpace(_configMonitor.CurrentValue.Discovery?.VirtualIp)
                    ? _configMonitor.CurrentValue.Discovery.VirtualIp
                    : "127.0.0.1");

            // מדרג מדיניות (Overrides -> Tab Settings -> Global Defaults)
            var currentPolicy = await GetAgentPolicyAsync(report.Hostname, hostToUse);

            // ניהול תור העלאת באפרים מאופליין
            var bufferAction = _syncManager.GetSyncCommand(report.Hostname, report.OfflineFilesTotalSizeMb);

            return new AgentHeartbeatResponse
            {
                ShouldStream = shouldStream,
                ShouldRecord = isRecordingDesired,
                Command = commandToSend,
                ServerUtcTime = DateTime.UtcNow,
                Policy = currentPolicy,
                OfflineBufferAction = bufferAction
            };
        }

        public void SetAgentStreamState(string hostname, bool shouldRecord)
        {
            if (string.IsNullOrWhiteSpace(hostname)) return;
            string key = hostname.ToUpperInvariant();
            _agentDesiredStates[key] = shouldRecord;

            if (_latestReports.TryGetValue(key, out var report))
            {
                report.IsRecording = shouldRecord;
                if (shouldRecord && !report.RecordingStartedAtUtc.HasValue)
                {
                    report.RecordingStartedAtUtc = DateTime.UtcNow;
                }
                else if (!shouldRecord)
                {
                    report.RecordingStartedAtUtc = null;
                }
            }

            if (_mediaMtxApi != null)
            {
                _ = Task.Run(async () =>
                {
                    try
                    {
                        int apiPort = _configMonitor.CurrentValue.MediaMtx.ApiPort;
                        string cleanHost = Uri.EscapeDataString(hostname.Replace(" ", "_"));
                        await _mediaMtxApi.SetPathRecordingStateAsync(apiPort, cleanHost, shouldRecord, CancellationToken.None).ConfigureAwait(false);
                        await _mediaMtxApi.SetPathRecordingStateAsync(apiPort, $"live/{cleanHost}", shouldRecord, CancellationToken.None).ConfigureAwait(false);
                        await _mediaMtxApi.SetPathRecordingStateAsync(apiPort, $"live/{cleanHost}/mon-0", shouldRecord, CancellationToken.None).ConfigureAwait(false);
                        await _mediaMtxApi.SetPathRecordingStateAsync(apiPort, $"live/{cleanHost}/mon-1", shouldRecord, CancellationToken.None).ConfigureAwait(false);
                        await _mediaMtxApi.SetPathRecordingStateAsync(apiPort, $"live/{cleanHost}/mon-2", shouldRecord, CancellationToken.None).ConfigureAwait(false);
                        await _mediaMtxApi.SetPathRecordingStateAsync(apiPort, $"live/{cleanHost}/mon-3", shouldRecord, CancellationToken.None).ConfigureAwait(false);
                    }
                    catch { }
                });
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
            if (_tabsService != null)
            {
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
            }

            // 3. דריסה פרטנית לתחנה (העדיפות הגבוהה ביותר)
            if (_overridesService != null)
            {
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
            }

            if (int.TryParse(bitrate, out int numericBitrate))
            {
                bitrate = $"{numericBitrate}k";
            }

            return new AgentStreamPolicy
            {
                RtmpServerBaseUrl = $"rtmps://{requestHost}:{rtmpPort}/live",
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