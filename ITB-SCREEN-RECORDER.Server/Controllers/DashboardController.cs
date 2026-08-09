using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using ITB_SCREEN_RECORDER.Core.Models;
using ITB_SCREEN_RECORDER.Server.Services;

namespace ITB_SCREEN_RECORDER.Server.Controllers
{
    [ApiController]
    [Route("api/v1/dashboard")]
    public class DashboardController : ControllerBase
    {
        private readonly ITelemetryStateService _telemetryState;
        private readonly SystemConfig _config;

        public DashboardController(ITelemetryStateService telemetryState, IOptions<SystemConfig> config)
        {
            _telemetryState = telemetryState;
            _config = config.Value;
        }

        [HttpGet("stations")]
        public IActionResult GetStationsSummary()
        {
            var agents = _telemetryState.GetAllAgents();

            // שליפת הנתונים ישירות מתוך קובץ ה-קונפיג הדינמי
            var host = Request.Host.Value.Split(':')[0];
            var hlsPort = _config.MediaMtx.HlsPort;

            var result = agents.Select(agent =>
            {
                bool isStreaming = false;
                bool isOnline = true;

                return new
                {
                    agent.Hostname,
                    agent.IpAddress,
                    IsStreaming = isStreaming,
                    IsOnline = isOnline,
                    Status = isStreaming ? "Streaming" : "Standby",
                    HlsUrl = $"http://{host}:{hlsPort}/live/{agent.Hostname}/index.m3u8"
                };
            });

            return Ok(result);
        }
    }
}