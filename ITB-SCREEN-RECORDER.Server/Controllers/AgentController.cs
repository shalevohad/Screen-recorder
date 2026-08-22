using Microsoft.AspNetCore.Mvc;
using System.Linq;
using ITB_SCREEN_RECORDER.Server.Services;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;

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

            if (!ModelState.IsValid)
            {
                var errors = string.Join(" | ", ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage));

                return BadRequest(errors);
            }

            var response = _telemetryState.ProcessHeartbeat(report);
            return Ok(response);
        }

        [HttpPost("command/{hostname}")]
        public IActionResult EnforceStreamingPolicy(string hostname, [FromQuery] bool enable)
        {
            _telemetryState.SetAgentStreamState(hostname, enable);
            return Ok(new { Hostname = hostname, StreamingRequested = enable });
        }

        [HttpGet("config/{hostname}")]
        public IActionResult GetAgentConfig(string hostname)
        {
            // שאיבה דינמית מלאה דרך שירות הסטטוס המרכזי
            var policy = _telemetryState.GetAgentPolicy(hostname, Request.Host.Host);
            return Ok(policy);
        }
    }
}