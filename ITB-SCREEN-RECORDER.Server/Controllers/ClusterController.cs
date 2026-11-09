// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Controllers/ClusterController.cs
// ==========================================
using System;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Server.Services.Network;
using ITB_SCREEN_RECORDER.Server.Services.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ITB_SCREEN_RECORDER.Server.Controllers
{
    [ApiController]
    [Route("api/v1/cluster")]
    public class ClusterController : ControllerBase
    {
        private readonly IClusterService _clusterService;
        private readonly ILogger<ClusterController> _logger;

        public ClusterController(
            IClusterService clusterService,
            ILogger<ClusterController> logger)
        {
            _clusterService = clusterService;
            _logger = logger;
        }

        /// <summary>
        /// Retrieves the comprehensive cluster topology, node state, VIP status, and partner health.
        /// </summary>
        [HttpGet("status")]
        [AllowAnonymous]
        public IActionResult GetStatus()
        {
            try
            {
                var status = _clusterService.GetClusterStatus();
                return Ok(status);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "[CLUSTER API] Failed to query cluster status");
                return StatusCode(500, new { Error = "Failed to query cluster status", Details = ex.Message });
            }
        }

        /// <summary>
        /// Inter-node heartbeat endpoint used by the partner cluster node for sub-second health checks.
        /// </summary>
        [HttpGet("partner-health")]
        [AllowAnonymous]
        public IActionResult GetPartnerHealth()
        {
            var health = _clusterService.GetPartnerHealthDto();
            return Ok(health);
        }

        /// <summary>
        /// Manually promotes this server node to Active and acquires the Virtual IP (VIP).
        /// </summary>
        [HttpPost("failover/acquire-vip")]
        [AuthorizePermission(PermissionKeys.SettingsCluster)]
        public async Task<IActionResult> AcquireVipManual(CancellationToken ct)
        {
            _logger.LogWarning("[CLUSTER API] Manual VIP acquisition requested by user {User}", User.Identity?.Name ?? "Admin");
            var result = await _clusterService.AcquireVipManualAsync(ct);
            if (result.Success)
            {
                return Ok(result);
            }
            return StatusCode(500, result);
        }

        /// <summary>
        /// Manually releases the Virtual IP (VIP) from this server node and demotes to Standby.
        /// </summary>
        [HttpPost("failover/release-vip")]
        [AuthorizePermission(PermissionKeys.SettingsCluster)]
        public async Task<IActionResult> ReleaseVipManual(CancellationToken ct)
        {
            _logger.LogWarning("[CLUSTER API] Manual VIP release requested by user {User}", User.Identity?.Name ?? "Admin");
            var result = await _clusterService.ReleaseVipManualAsync(ct);
            if (result.Success)
            {
                return Ok(result);
            }
            return StatusCode(500, result);
        }

        /// <summary>
        /// Fast-failover notification sent by a shutting down or surrendering partner node.
        /// </summary>
        [HttpPost("failover/handover")]
        [AllowAnonymous]
        public async Task<IActionResult> Handover([FromBody] HandoverPayload payload, CancellationToken ct)
        {
            _logger.LogWarning("[CLUSTER API] Handover notification received from node '{SourceNode}'", payload.SourceNodeId);
            var result = await _clusterService.HandleHandoverNotificationAsync(payload.SourceNodeId, ct);
            return Ok(result);
        }

        public class HandoverPayload
        {
            public string SourceNodeId { get; set; } = string.Empty;
            public DateTime TimestampUtc { get; set; } = DateTime.UtcNow;
        }
    }
}
