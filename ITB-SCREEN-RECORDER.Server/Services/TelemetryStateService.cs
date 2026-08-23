using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Options;

namespace ITB_SCREEN_RECORDER.Server.Services
{
    public interface ITelemetryStateService
    {
        // הוספנו את ה-requestHost כפרמטר אופציונלי
        AgentHeartbeatResponse ProcessHeartbeat(AgentTelemetryReport report, string requestHost = null);
        void SetAgentStreamState(string hostname, bool shouldStream);
        IEnumerable<AgentTelemetryReport> GetAllAgents();
        AgentStreamPolicy GetAgentPolicy(string hostname, string requestHost);
    }

    public class TelemetryStateService : ITelemetryStateService
    {
        private readonly ConcurrentDictionary<string, bool> _agentDesiredStates = new();
        private readonly ConcurrentDictionary<string, AgentTelemetryReport> _latestReports = new();
        private readonly SystemConfig _systemConfig;

        public TelemetryStateService(IOptions<SystemConfig> systemConfig)
        {
            _systemConfig = systemConfig.Value;
        }

        public AgentHeartbeatResponse ProcessHeartbeat(AgentTelemetryReport report, string requestHost = null)
        {
            if (report == null || string.IsNullOrWhiteSpace(report.Hostname))
            {
                return new AgentHeartbeatResponse { ShouldStream = false, Command = ServerCommand.Standby };
            }

            string key = report.Hostname.ToUpperInvariant();
            _latestReports[key] = report;

            // שומרים על הלוגיקה המקורית שלך - הפעלה אוטומטית כברירת מחדל
            _agentDesiredStates.CustomGetOrAdd(key, () => report.IsStreaming || report.IsScreenCapturing || true);

            bool desiredStreamState = _agentDesiredStates[key];

            ServerCommand commandToSend = ServerCommand.Standby;
            if (desiredStreamState != report.IsStreaming)
            {
                commandToSend = desiredStreamState ? ServerCommand.StartStream : ServerCommand.StopStream;
            }

            // יצירת ה-Policy הדינמי: שימוש בכתובת הבקשה או כתובת גיבוי במידה וחסר
            string hostToUse = !string.IsNullOrWhiteSpace(requestHost) ? requestHost : "128.200.3.10";
            var currentGlobalPolicy = GetAgentPolicy(report.Hostname, hostToUse);

            return new AgentHeartbeatResponse
            {
                ShouldStream = desiredStreamState,
                Command = commandToSend,
                ServerTime = DateTime.UtcNow,
                Policy = currentGlobalPolicy
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

        public AgentStreamPolicy GetAgentPolicy(string hostname, string requestHost)
        {
            // שליפת הפורט מהקונפיגורציה, או 19350 כדיפולט
            int rtmpPort = _systemConfig.MediaMtx?.RtmpPort > 0 ? _systemConfig.MediaMtx.RtmpPort : 19350;

            // 1. אכיפת טווח FPS
            int fps = _systemConfig.DefaultTargetFps;
            if (fps < 15) fps = 15;
            if (fps > 60) fps = 60;

            // 2. אכיפת ונרמול Bitrate
            string bitrate = (_systemConfig.DefaultVideoBitrate ?? "5M").ToUpper();
            if (bitrate != "1M" && bitrate != "2M" && bitrate != "3M" && bitrate != "4M" && bitrate != "5M")
            {
                bitrate = "5M"; // Fallback לערך בטוח
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