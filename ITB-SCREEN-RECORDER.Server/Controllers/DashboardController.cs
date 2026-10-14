using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Server.Services;
using ITB_SCREEN_RECORDER.Server.Services.Security;
using ITB_SCREEN_RECORDER.Server.Data.Repositories;
using ITB_SCREEN_RECORDER.Core.Configuration;

namespace ITB_SCREEN_RECORDER.Server.Controllers
{
    [ApiController]
    [Route("api/v1/dashboard")]
    public class DashboardController : ControllerBase
    {
        private readonly ITelemetryStateService _telemetryState;
        private readonly StationOverridesService _overridesService;
        private readonly CustomTabsService _tabsService;
        private readonly ICatalogRepository _catalogRepository;
        private readonly IOptionsMonitor<SystemConfig> _configMonitor;

        public DashboardController(
            ITelemetryStateService telemetryState,
            StationOverridesService overridesService,
            CustomTabsService tabsService,
            ICatalogRepository catalogRepository,
            IOptionsMonitor<SystemConfig> configMonitor)
        {
            _telemetryState = telemetryState;
            _overridesService = overridesService;
            _tabsService = tabsService;
            _catalogRepository = catalogRepository;
            _configMonitor = configMonitor;
        }

        [HttpGet("stations")]
        [AuthorizePermission(PermissionKeys.StationsView)]
        public async Task<IActionResult> GetStationsSummary()
        {
            var agents = _telemetryState.GetAllAgents();
            var aliases = await _catalogRepository.GetAllStationRoleAliasesAsync();

            var host = Request.Host.Value.Split(':')[0];
            var hlsPort = _configMonitor.CurrentValue.MediaMtx.HlsPort;

            var result = agents.Select(agent =>
            {
                bool isOnline = (DateTime.UtcNow - agent.Timestamp).TotalSeconds <= 15;
                bool isStreaming = agent.IsStreaming;
                aliases.TryGetValue(agent.Hostname, out string? roleAlias);

                return new
                {
                    agent.Hostname,
                    RoleAlias = roleAlias,
                    agent.IpAddress,
                    IsOnline = isOnline,
                    IsStreaming = isStreaming,
                    IsRecording = isStreaming,
                    RecordingStartedAtUtc = isStreaming ? agent.RecordingStartedAtUtc : null,
                    Status = isOnline ? (isStreaming ? "Recording" : "Standby") : "Offline",

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

        [HttpGet("config")]
        [AuthorizePermission(PermissionKeys.StationsView)]
        public IActionResult GetDashboardConfig()
        {
            return Ok(_configMonitor.CurrentValue.Dashboard);
        }

        #region Custom Tabs API

        [HttpGet("tabs")]
        [AuthorizePermission(PermissionKeys.StationsView)]
        public async Task<IActionResult> GetTabs()
        {
            var tabs = await _tabsService.GetAllTabsAsync();
            return Ok(tabs);
        }

        [HttpPost("tabs")]
        [AuthorizePermission(PermissionKeys.StationsManage)]
        public async Task<IActionResult> SaveTab([FromBody] CustomTabModel model)
        {
            if (model == null || string.IsNullOrWhiteSpace(model.Name))
            {
                return BadRequest("Tab name is required.");
            }

            var saved = await _tabsService.SaveTabAsync(model);
            return Ok(saved);
        }

        [HttpDelete("tabs/{tabId}")]
        [AuthorizePermission(PermissionKeys.StationsManage)]
        public async Task<IActionResult> DeleteTab(string tabId)
        {
            bool deleted = await _tabsService.DeleteTabAsync(tabId);
            if (!deleted) return BadRequest("Cannot delete default tab or tab not found.");
            return Ok(new { success = true });
        }

        [HttpPost("tabs/{tabId}/assign/{hostname}")]
        [AuthorizePermission(PermissionKeys.StationsManage)]
        public async Task<IActionResult> AssignStationToTab(string tabId, string hostname)
        {
            await _tabsService.AssignStationAsync(tabId, hostname);
            return Ok(new { success = true });
        }

        [HttpPost("tabs/{tabId}/remove/{hostname}")]
        [AuthorizePermission(PermissionKeys.StationsManage)]
        public async Task<IActionResult> RemoveStationFromTab(string tabId, string hostname)
        {
            await _tabsService.RemoveStationAsync(tabId, hostname);
            return Ok(new { success = true });
        }

        #endregion

        #region Station Overrides API

        [HttpGet("stations/overrides")]
        [AuthorizePermission(PermissionKeys.StationsView)]
        public async Task<IActionResult> GetStationOverrides()
        {
            var overrides = await _overridesService.GetAllAsync();
            return Ok(overrides);
        }

        [HttpPost("stations/{hostname}/override")]
        [AuthorizePermission(PermissionKeys.SettingsAgents)]
        public async Task<IActionResult> SetStationOverride(string hostname, [FromBody] StationOverride request)
        {
            if (string.IsNullOrWhiteSpace(hostname) || request == null)
            {
                return BadRequest("Invalid station override payload.");
            }

            await _overridesService.SetOverrideAsync(hostname, request);
            return Ok(new { Message = $"Configuration for station '{hostname}' updated successfully." });
        }

        [HttpDelete("stations/{hostname}/override")]
        [AuthorizePermission(PermissionKeys.SettingsAgents)]
        public async Task<IActionResult> RemoveStationOverride(string hostname)
        {
            if (string.IsNullOrWhiteSpace(hostname))
            {
                return BadRequest("Invalid hostname.");
            }

            await _overridesService.RemoveOverrideAsync(hostname);
            return Ok(new { Message = $"Override for station '{hostname}' removed successfully." });
        }

        [HttpDelete("stations/overrides/reset-all")]
        [AuthorizePermission(PermissionKeys.SettingsAgents)]
        public async Task<IActionResult> ResetAllStationOverrides()
        {
            await _overridesService.ResetAllOverridesAsync();
            return Ok(new { Message = "All station overrides have been reset to global defaults." });
        }
        #endregion
    }
}