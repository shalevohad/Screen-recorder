using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System;
// הפניה למודלים של ה-Core - ודא שזה ה-Namespace המדויק שמוגדר בתוך פרויקט ה-Core שלך
using ITB_SCREEN_RECORDER.Core.Models;

namespace ITB_SCREEN_RECORDER.Server.Services
{
    public interface ITelemetryStateService
    {
        AgentHeartbeatResponse ProcessHeartbeat(AgentTelemetryReport report);
        void SetAgentCommand(string hostname, bool shouldStream);
        IEnumerable<AgentTelemetryReport> GetAllAgents();
    }

    public class TelemetryStateService : ITelemetryStateService
    {
        private readonly ConcurrentDictionary<string, AgentTelemetryReport> _reports = new(StringComparer.OrdinalIgnoreCase);
        private readonly ConcurrentDictionary<string, bool> _commandState = new(StringComparer.OrdinalIgnoreCase);

        public AgentHeartbeatResponse ProcessHeartbeat(AgentTelemetryReport report)
        {
            _reports[report.Hostname] = report;

            _commandState.TryGetValue(report.Hostname, out bool shouldStream);

            return new AgentHeartbeatResponse
            {
                ShouldStream = shouldStream,
                Command = shouldStream ? ServerCommand.StartStream : ServerCommand.Standby,
                ServerTime = DateTime.UtcNow
            };
        }

        public void SetAgentCommand(string hostname, bool shouldStream)
        {
            _commandState[hostname] = shouldStream;
        }

        public IEnumerable<AgentTelemetryReport> GetAllAgents() => _reports.Values.ToList();
    }
}