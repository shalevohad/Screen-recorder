using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using ITB_SCREEN_RECORDER.Server.Services;
using ITB_SCREEN_RECORDER.Core.Configuration;

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

            var host = Request.Host.Value.Split(':')[0];
            var hlsPort = _config.MediaMtx.HlsPort;

            var result = agents.Select(agent =>
            {
                // חישוב דינמי למצב מקוון: אם חלפו יותר מ-15 שניות ללא פעימת חיים, התחנה מנותקת
                bool isOnline = (DateTime.UtcNow - agent.Timestamp).TotalSeconds <= 15;

                // שימוש בנתון האמיתי שהגיע מה-Agent (ולא בערך קשיח)
                bool isStreaming = agent.IsStreaming;

                return new
                {
                    agent.Hostname,
                    agent.IpAddress,
                    IsOnline = isOnline,
                    IsStreaming = isStreaming,
                    Status = isOnline ? (isStreaming ? "Streaming" : "Standby") : "Offline",

                    // חשיפת המדדים המעודכנים ל-Dashboard
                    CpuUsage = agent.CpuUsagePercentage,
                    GpuUsage = agent.GpuUsagePercentage,
                    HasAudio = agent.HasActiveMicrophone || agent.HasActiveSpeakers,
                    LastSeenUtc = agent.Timestamp,

                    HlsUrl = $"http://{host}:{hlsPort}/live/{agent.Hostname}/index.m3u8"
                };
            });

            return Ok(result);
        }
    }
}