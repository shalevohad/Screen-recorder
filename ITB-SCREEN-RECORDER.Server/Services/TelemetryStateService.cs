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
        AgentHeartbeatResponse ProcessHeartbeat(AgentTelemetryReport report);
        void SetAgentStreamState(string hostname, bool shouldStream);
        IEnumerable<AgentTelemetryReport> GetAllAgents();

        // הוספת מתודה לשליפת פוליסה דינמית (עם תשתית עתידית לפי קליינט)
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

        public AgentHeartbeatResponse ProcessHeartbeat(AgentTelemetryReport report)
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

            // הפוליסה הארגונית שנשלחת לתחנות (בעתיד ניתן לשלוף מה-DB לפי Hostname)
            var currentGlobalPolicy = new AgentStreamPolicy
            {
                RtmpServerBaseUrl = "rtmp://127.0.0.1:19350/live",
                VideoBitrate = "5M",
                TargetFps = 30
            };

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
            int rtmpPort = _systemConfig.MediaMtx?.RtmpPort > 0 ? _systemConfig.MediaMtx.RtmpPort : 19350;

            // 1. אכיפת טווח FPS
            int fps = _systemConfig.DefaultTargetFps;
            if (fps < 15) fps = 15;
            if (fps > 60) fps = 60;

            // 2. אכיפת ונרמול Bitrate
            string bitrate = (_systemConfig.DefaultVideoBitrate ?? "5M").ToUpper(); // המרה תמידית לאות גדולה
            if (bitrate != "1M" && bitrate != "2M" && bitrate != "3M" && bitrate != "4M" && bitrate != "5M")
            {
                bitrate = "5M"; // Fallback לערך בטוח
            }

            // בעתיד: לפני יצירת האובייקט נוכל לבדוק במסד הנתונים אם קיים Override ספציפי עבור ה-hostname

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