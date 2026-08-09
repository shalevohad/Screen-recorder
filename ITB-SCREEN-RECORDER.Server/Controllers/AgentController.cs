using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System;
using ITB_SCREEN_RECORDER.Core.Models;
using ITB_SCREEN_RECORDER.Server.Services;

namespace ITB_SCREEN_RECORDER.Server.Controllers
{
    [ApiController]
    [Route("api/v1/agent")]
    public class AgentController : ControllerBase
    {
        private readonly ITelemetryStateService _telemetryState;

        public AgentController(ITelemetryStateService telemetryState)
        {
            _telemetryState = telemetryState;
        }

        [HttpPost("telemetry")]
        public IActionResult ReceiveHeartbeat([FromBody] AgentTelemetryReport report)
        {
            if (report == null || string.IsNullOrWhiteSpace(report.Hostname))
            {
                return BadRequest("Invalid payload.");
            }

            var response = _telemetryState.ProcessHeartbeat(report);
            return Ok(response);
        }

        [HttpPost("command/{hostname}")]
        public IActionResult EnforceStreamingPolicy(string hostname, [FromQuery] bool enable)
        {
            _telemetryState.SetAgentCommand(hostname, enable);
            return Ok(new { Hostname = hostname, StreamingRequested = enable });
        }

        // אנדפוינט חדש שישמש את ה-React Dashboard כדי למשוך את רשימת התחנות
        [HttpGet("stations")]
        public IActionResult GetActiveStations()
        {
            var agents = _telemetryState.GetAllAgents();
            return Ok(agents);
        }
    }
}