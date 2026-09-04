using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Server.Services;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;

namespace ITB_SCREEN_RECORDER.Server.Controllers
{
    /// <summary>
    /// מודל בקשה להפעלת מדיניות שידור/הקלטה גורפת או מפולטרת
    /// </summary>
    public class FleetStreamingPolicyRequest
    {
        public bool Enable { get; set; }

        /// <summary>
        /// רשימת תחנות ספציפיות שעליהן תבוצע הפעולה (אם ריק/null - מופעל על כלל העמדות המחוברות)
        /// </summary>
        public List<string>? Hostnames { get; set; }
    }

    [ApiController]
    [Route("api/v1/agent")]
    public class AgentController : ControllerBase
    {
        private readonly ITelemetryStateService _telemetryState;
        private readonly TelemetryBroadcastService _broadcastService;

        public AgentController(ITelemetryStateService telemetryState, TelemetryBroadcastService broadcastService)
        {
            _telemetryState = telemetryState;
            _broadcastService = broadcastService;
        }

        [HttpPost("telemetry")]
        public async Task<IActionResult> ReceiveHeartbeat([FromBody] AgentTelemetryReport report)
        {
            if (report == null || string.IsNullOrWhiteSpace(report.Hostname))
            {
                return BadRequest("Invalid payload.");
            }

            if (!ModelState.IsValid)
            {
                var errors = string.Join(" | ", ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage));

                return BadRequest(errors);
            }

            string requestHost = Request.Host.Host;

            // 1. הפעלת שירות הסטטוס שמפיק את התשובה והפוליסה
            var response = await _telemetryState.ProcessHeartbeatAsync(report, requestHost);

            // 2. דחיפת הדיווח בזמן אמת לטכנאים בחמ"ל מבלי לעכב את תשובת ה-HTTP לעמדה
            _ = _broadcastService.BroadcastAgentUpdateAsync(report);

            return Ok(response);
        }

        [HttpPost("command/{hostname}")]
        public IActionResult EnforceStreamingPolicy(string hostname, [FromQuery] bool enable)
        {
            _telemetryState.SetAgentStreamState(hostname, enable);
            return Ok(new { Hostname = hostname, StreamingRequested = enable });
        }

        [HttpGet("config/{hostname}")]
        public async Task<IActionResult> GetAgentConfig(string hostname)
        {
            var policy = await _telemetryState.GetAgentPolicyAsync(hostname, Request.Host.Host);
            return Ok(policy);
        }

        /// <summary>
        /// אוכף מדיניות שידור/הקלטה על כלל העמדות או על רשימת עמדות מפולטרת
        /// </summary>
        [HttpPost("fleet-streaming-policy")]
        public IActionResult EnforceFleetWideStreamingPolicy(
            [FromBody] FleetStreamingPolicyRequest? request,
            [FromQuery] bool? enable)
        {
            // קביעת מצב ההפעלה/עצירה מתמיכה ב-Body או כ-Fallback מ-Query Parameter
            bool targetEnable = request?.Enable ?? enable ?? false;

            var allAgents = _telemetryState.GetAllAgents();

            // סינון עמדות שנצפו ב-15 השניות האחרונות (Online בלבד)
            var activeAgents = allAgents
                .Where(agent => (DateTime.UtcNow - agent.Timestamp).TotalSeconds <= 15)
                .ToList();

            // אם נשלחה רשימת עמדות ספציפית (פילטור מה-Dashboard), מבצעים סינון נוסף
            if (request?.Hostnames != null && request.Hostnames.Any())
            {
                var filterSet = new HashSet<string>(request.Hostnames, StringComparer.OrdinalIgnoreCase);
                activeAgents = activeAgents.Where(agent => filterSet.Contains(agent.Hostname)).ToList();
            }

            foreach (var agent in activeAgents)
            {
                _telemetryState.SetAgentStreamState(agent.Hostname, targetEnable);
            }

            return Ok(new
            {
                Action = targetEnable ? "START_POLICY" : "STOP_POLICY",
                IsFiltered = request?.Hostnames != null && request.Hostnames.Any(),
                TargetStationCount = activeAgents.Count,
                TargetHostnames = activeAgents.Select(a => a.Hostname).ToList(),
                TimestampUtc = DateTime.UtcNow
            });
        }
    }
}