using Microsoft.AspNetCore.Mvc;
using System;
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

                Console.WriteLine($"[VALIDATION FAILED]: {errors}");
                return BadRequest(errors);
            }

            // העברת אובייקט הטלמטריה המלא לשירות וקבלת המצב הרצוי (Desired State)
            var response = _telemetryState.ProcessHeartbeat(report);
            return Ok(response);
        }

        [HttpPost("command/{hostname}")]
        public IActionResult EnforceStreamingPolicy(string hostname, [FromQuery] bool enable)
        {
            // תיקון קריאת המתודה בהתאם לחתימה החדשה של השרת
            _telemetryState.SetAgentStreamState(hostname, enable);

            return Ok(new { Hostname = hostname, StreamingRequested = enable });
        }
    }
}