using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Server.Services;
using ITB_SCREEN_RECORDER.Core.Configuration;

namespace ITB_SCREEN_RECORDER.Server.Controllers
{
    [ApiController]
    [Route("api/v1/dashboard")]
    public class DashboardController : ControllerBase
    {
        private readonly ITelemetryStateService _telemetryState;
        private readonly StationOverridesService _overridesService;
        private readonly SystemConfig _config;

        public DashboardController(
            ITelemetryStateService telemetryState,
            StationOverridesService overridesService,
            IOptions<SystemConfig> config)
        {
            _telemetryState = telemetryState;
            _overridesService = overridesService;
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
                bool isOnline = (DateTime.UtcNow - agent.Timestamp).TotalSeconds <= 15;
                bool isStreaming = agent.IsStreaming;

                return new
                {
                    agent.Hostname,
                    agent.IpAddress,
                    IsOnline = isOnline,
                    IsStreaming = isStreaming,
                    Status = isOnline ? (isStreaming ? "Streaming" : "Standby") : "Offline",

                    HasAudio = agent.HasActiveMicrophone || agent.HasActiveSpeakers,
                    LastSeenUtc = agent.Timestamp,

                    ActualFps = agent.ActualFps,
                    InternalCaptureFps = agent.InternalCaptureFps,
                    DroppedFrames = agent.DroppedFrames,
                    QosTier = agent.QosTier,

                    MediaTxMbps = agent.MediaTxMbps,
                    NicTotalRxMbps = agent.NicTotalRxMbps,
                    NicTotalTxMbps = agent.NicTotalTxMbps,
                    NetTotalTxMbps = agent.NicTotalTxMbps,
                    TelemetryTxKbps = agent.TelemetryTxKbps,
                    NicUtilizationPct = agent.NicUtilizationPct,
                    LinkSpeedMbps = agent.LinkSpeedMbps > 0 ? agent.LinkSpeedMbps : 1000,

                    HostCpuPct = agent.HostCpuPct,
                    ProcessCpuPct = agent.ProcessCpuPct,
                    ProcessRamMb = agent.ProcessRamMb,

                    Gpu3dPct = agent.Gpu3dPct,
                    GpuNvencPct = agent.GpuNvencPct,

                    HlsUrl = $"http://{host}:{hlsPort}/live/{agent.Hostname}/index.m3u8"
                };
            });

            return Ok(result);
        }

        [HttpPost("stations/{hostname}/override")]
        public async Task<IActionResult> SetStationOverride(string hostname, [FromBody] StationOverride request)
        {
            await _overridesService.SetOverrideAsync(hostname, request);
            return Ok(new { Message = $"Configuration for station '{hostname}' updated successfully." });
        }
    }
}