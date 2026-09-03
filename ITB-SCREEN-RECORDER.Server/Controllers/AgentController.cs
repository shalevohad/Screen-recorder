using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Server.Services;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;

namespace ITB_SCREEN_RECORDER.Server.Controllers
{
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

            // 2. 💡 דחיפת הדיווח בזמן אמת לטכנאים בחמ"ל מבלי לעכב את תשובת ה-HTTP לעמדה
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
        /// אוכף מדיניות שידור/הקלטה גורפת על כלל העמדות המחוברות ברשת (Fleet Wide)
        /// </summary>
        /// <param name="enable">true להפעלת שידור/הקלטה בכל העמדות, false לעצירה גורפת</param>
        [HttpPost("fleet-streaming-policy")]
        public IActionResult EnforceFleetWideStreamingPolicy([FromQuery] bool enable)
        {
            var allAgents = _telemetryState.GetAllAgents();

            // סינון עמדות שנצפו ב-15 השניות האחרונות (Online בלבד)
            var activeAgents = allAgents
                .Where(agent => (DateTime.UtcNow - agent.Timestamp).TotalSeconds <= 15)
                .ToList();

            foreach (var agent in activeAgents)
            {
                _telemetryState.SetAgentStreamState(agent.Hostname, enable);
            }

            return Ok(new
            {
                Action = enable ? "START_ALL" : "STOP_ALL",
                TargetStationCount = activeAgents.Count,
                TargetHostnames = activeAgents.Select(a => a.Hostname).ToList(),
                TimestampUtc = DateTime.UtcNow
            });
        }
    }
}