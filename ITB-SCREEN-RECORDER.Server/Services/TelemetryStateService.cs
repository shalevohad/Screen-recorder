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
        IEnumerable<AgentTelemetryReport> GetAllAgents();
    }

    public class TelemetryStateService : ITelemetryStateService
    {
        private readonly ConcurrentDictionary<string, bool> _agentDesiredStates = new();
        private readonly ConcurrentDictionary<string, AgentTelemetryReport> _latestReports = new();

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

            return new AgentHeartbeatResponse
            {
                ShouldStream = desiredStreamState,
                Command = commandToSend,
                ServerTime = DateTime.UtcNow
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