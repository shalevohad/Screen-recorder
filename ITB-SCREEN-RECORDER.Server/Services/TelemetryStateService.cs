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
        private readonly SystemConfig _systemConfig;
        private readonly StationOverridesService _overridesService;

        public TelemetryStateService(IOptions<SystemConfig> systemConfig, StationOverridesService overridesService)
        {
            _systemConfig = systemConfig.Value;
            _overridesService = overridesService;
        }

        public async Task<AgentHeartbeatResponse> ProcessHeartbeatAsync(AgentTelemetryReport report, string requestHost = null)
        {
            if (report == null || string.IsNullOrWhiteSpace(report.Hostname))
            {
                return new AgentHeartbeatResponse { ShouldStream = false, Command = ServerCommand.Standby };
            }

            string key = report.Hostname.ToUpperInvariant();
            _latestReports[key] = report;

            _agentDesiredStates.CustomGetOrAdd(key, () => report.IsStreaming || report.IsScreenCapturing || true);

            bool desiredStreamState = _agentDesiredStates[key];

            ServerCommand commandToSend = ServerCommand.Standby;
            if (desiredStreamState != report.IsStreaming)
            {
                commandToSend = desiredStreamState ? ServerCommand.StartStream : ServerCommand.StopStream;
            }

            string hostToUse = !string.IsNullOrWhiteSpace(requestHost) ? requestHost : "128.200.3.10";

            // הפקת הפוליסה המותאמת אישית (כולל בדיקת Overrides לעמדה)
            var currentPolicy = await GetAgentPolicyAsync(report.Hostname, hostToUse);

            return new AgentHeartbeatResponse
            {
                ShouldStream = desiredStreamState,
                Command = commandToSend,
                ServerUtcTime = DateTime.UtcNow,
                Policy = currentPolicy
            };
        }

        public void SetAgentStreamState(string hostname, bool shouldStream)
        {
            if (string.IsNullOrWhiteSpace(hostname)) return;
            string key = hostname.ToUpperInvariant();
            _agentDesiredStates[key] = shouldStream;
        }

        public IEnumerable<AgentTelemetryReport> GetAllAgents()
        {
            return _latestReports.Values.ToList();
        }

        public async Task<AgentStreamPolicy> GetAgentPolicyAsync(string hostname, string requestHost)
        {
            int rtmpPort = _systemConfig.MediaMtx?.RtmpPort > 0 ? _systemConfig.MediaMtx.RtmpPort : 19350;

            // ברירות מחדל גלובליות מתוך ה-SystemConfig
            int fps = _systemConfig.DefaultTargetFps;
            if (fps < 15) fps = 15;
            if (fps > 60) fps = 60;

            string bitrate = (_systemConfig.DefaultVideoBitrate ?? "5M").ToUpper();

            // בדיקה האם יש הגדרות מיוחדות (Overrides) לעמדה זו בקובץ ה-stations-config.json
            var overrides = await _overridesService.GetAllAsync();
            if (overrides.TryGetValue(hostname, out var stationConfig))
            {
                if (!string.IsNullOrEmpty(stationConfig.VideoBitrate))
                {
                    bitrate = stationConfig.VideoBitrate.ToUpper();
                }

                if (stationConfig.TargetFps.HasValue && stationConfig.TargetFps.Value >= 15 && stationConfig.TargetFps.Value <= 60)
                {
                    fps = stationConfig.TargetFps.Value;
                }
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