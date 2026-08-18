using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;

namespace ITB_SCREEN_RECORDER.Server.Services
{
    public interface ITelemetryStateService
    {
        AgentHeartbeatResponse ProcessHeartbeat(AgentTelemetryReport report);
        void SetAgentStreamState(string hostname, bool shouldStream);

        // המתודה שהייתה חסרה והדשבורד דורש אותה!
        IEnumerable<AgentTelemetryReport> GetAllAgents();
    }

    public class TelemetryStateService : ITelemetryStateService
    {
        // 1. מילון לשמירת "המצב הרצוי" של הסטרימינג (נשלט מהדשבורד)
        private readonly ConcurrentDictionary<string, bool> _agentDesiredStates = new();

        // 2. מילון חדש לשמירת תמונת המצב האחרונה של כל סוכן (עבור תצוגת הדשבורד)
        private readonly ConcurrentDictionary<string, AgentTelemetryReport> _latestReports = new();

        public AgentHeartbeatResponse ProcessHeartbeat(AgentTelemetryReport report)
        {
            if (report == null || string.IsNullOrWhiteSpace(report.Hostname))
            {
                return new AgentHeartbeatResponse { ShouldStream = false, Command = ServerCommand.Standby };
            }

            string key = report.Hostname.ToUpperInvariant();

            // שומרים את הדו"ח המעודכן ביותר כדי שה-DashboardController יוכל לשלוף אותו
            _latestReports[key] = report;

            // קביעת מצב סטרימינג רצוי (אם זו פעם ראשונה שרואים את התחנה)
            _agentDesiredStates.CustomGetOrAdd(key, () => report.IsStreaming || report.IsScreenCapturing || true);

            bool desiredStreamState = _agentDesiredStates[key];

            return new AgentHeartbeatResponse
            {
                ShouldStream = desiredStreamState,
                Command = desiredStreamState ? ServerCommand.StartStream : ServerCommand.StopStream,
                ServerTime = DateTime.UtcNow
            };
        }

        public void SetAgentStreamState(string hostname, bool shouldStream)
        {
            if (string.IsNullOrWhiteSpace(hostname)) return;
            string key = hostname.ToUpperInvariant();

            // עדכון המצב הרצוי (יעבור לסוכן בפעימת הלב הבאה שלו)
            _agentDesiredStates[key] = shouldStream;
        }

        // מימוש המתודה עבור הדשבורד - מחזירה את כל הדיווחים האחרונים
        public IEnumerable<AgentTelemetryReport> GetAllAgents()
        {
            return _latestReports.Values.ToList();
        }
    }

    // מתודת הרחבה (Extension Method) לעבודה בטוחה עם ConcurrentDictionary
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