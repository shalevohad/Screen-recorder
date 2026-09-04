using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Server.Services;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Core.Configuration;

namespace ITB_SCREEN_RECORDER.Server.Controllers
{
    public class FleetStreamingPolicyRequest
    {
        public bool Enable { get; set; }
        public List<string>? Hostnames { get; set; }
    }

    public class AgentTuningRequest
    {
        public int? Fps { get; set; }
        public int? BitrateKbps { get; set; }
        public string? Bitrate { get; set; }
    }

    [ApiController]
    [Route("api/v1/agent")]
    public class AgentController : ControllerBase
    {
        private readonly ITelemetryStateService _telemetryState;
        private readonly TelemetryBroadcastService _broadcastService;
        private readonly StationOverridesService _overridesService;

        public AgentController(
            ITelemetryStateService telemetryState,
            TelemetryBroadcastService broadcastService,
            StationOverridesService overridesService)
        {
            _telemetryState = telemetryState;
            _broadcastService = broadcastService;
            _overridesService = overridesService;
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
            var response = await _telemetryState.ProcessHeartbeatAsync(report, requestHost);
            _ = _broadcastService.BroadcastAgentUpdateAsync(report);

            return Ok(response);
        }

        [HttpPost("tuning/{hostname}")]
        public async Task<IActionResult> UpdateStationTuning(string hostname, [FromBody] AgentTuningRequest request)
        {
            if (string.IsNullOrWhiteSpace(hostname) || request == null)
            {
                return BadRequest("Invalid tuning request.");
            }

            var allOverrides = await _overridesService.GetAllAsync();
            var stationConfig = allOverrides.TryGetValue(hostname, out var existing)
                ? existing
                : new StationOverride();

            // מינימום 10 FPS, מקסימום 60 FPS
            if (request.Fps.HasValue && request.Fps.Value >= 10 && request.Fps.Value <= 60)
            {
                stationConfig.TargetFps = request.Fps.Value;
            }

            // מינימום 1000 Kbps
            if (request.BitrateKbps.HasValue && request.BitrateKbps.Value >= 1000)
            {
                stationConfig.VideoBitrate = $"{request.BitrateKbps.Value}k";
            }
            else if (!string.IsNullOrWhiteSpace(request.Bitrate))
            {
                stationConfig.VideoBitrate = request.Bitrate.Trim();
            }

            await _overridesService.SetOverrideAsync(hostname, stationConfig);

            return Ok(new
            {
                Hostname = hostname,
                TargetFps = stationConfig.TargetFps,
                VideoBitrate = stationConfig.VideoBitrate,
                Message = "Tuning saved. Policy updated for next heartbeat.",
                TimestampUtc = DateTime.UtcNow
            });
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

        [HttpPost("fleet-streaming-policy")]
        public IActionResult EnforceFleetWideStreamingPolicy(
            [FromBody] FleetStreamingPolicyRequest? request,
            [FromQuery] bool? enable)
        {
            bool targetEnable = request?.Enable ?? enable ?? false;
            var allAgents = _telemetryState.GetAllAgents();

            var activeAgents = allAgents
                .Where(agent => (DateTime.UtcNow - agent.Timestamp).TotalSeconds <= 15)
                .ToList();

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