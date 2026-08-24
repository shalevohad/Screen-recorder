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

        public AgentController(ITelemetryStateService telemetryState)
        {
            _telemetryState = telemetryState;
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

            // הפעלת שירות הסטטוס שמפיק את התשובה והפוליסה המעודכנת באופן מלא
            var response = await _telemetryState.ProcessHeartbeatAsync(report, requestHost);

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
    }
}