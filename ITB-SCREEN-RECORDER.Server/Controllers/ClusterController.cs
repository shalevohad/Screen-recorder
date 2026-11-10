// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Controllers/ClusterController.cs
// ==========================================
using System;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Contracts.Jobs;
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
        private readonly IClusterJobRunner? _jobRunner;
        private readonly ILogger<ClusterController> _logger;

        public ClusterController(
            IClusterService clusterService,
            ILogger<ClusterController> logger,
            IClusterJobRunner? jobRunner = null)
        {
            _clusterService = clusterService;
            _logger = logger;
            _jobRunner = jobRunner;
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
        /// Retrieves the full Active-Active distributed compute grid topology and live node metrics.
        /// </summary>
        [HttpGet("grid")]
        [AllowAnonymous]
        public IActionResult GetClusterGrid()
        {
            try
            {
                var grid = _clusterService.GetClusterGridStatus();
                return Ok(grid);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "[CLUSTER API] Failed to query cluster grid status");
                return StatusCode(500, new { Error = "Failed to query cluster grid status", Details = ex.Message });
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
        /// Processes periodic heartbeat pulses and station telemetry reports sent by worker nodes to the Orchestrator.
        /// </summary>
        [HttpPost("nodes/heartbeat")]
        [AllowAnonymous]
        public async Task<IActionResult> ProcessHeartbeat([FromBody] ClusterHeartbeatRequest request, CancellationToken ct)
        {
            var response = await _clusterService.ProcessNodeHeartbeatAsync(request, ct);
            return Ok(response);
        }

        /// <summary>
        /// Manually transfers the Cluster Orchestrator role to another specified online node.
        /// </summary>
        [HttpPost("orchestrator/transfer")]
        [AuthorizePermission(PermissionKeys.SettingsCluster)]
        public async Task<IActionResult> TransferOrchestrator([FromBody] TransferOrchestratorPayload payload, CancellationToken ct)
        {
            if (string.IsNullOrWhiteSpace(payload?.TargetNodeId))
            {
                return BadRequest("TargetNodeId is required.");
            }

            _logger.LogWarning("[CLUSTER API] Orchestrator transfer to node '{TargetNode}' requested by user {User}",
                payload.TargetNodeId, User.Identity?.Name ?? "Admin");

            var result = await _clusterService.TransferOrchestratorRoleAsync(payload.TargetNodeId, ct);
            return result.Success ? Ok(result) : StatusCode(400, result);
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

        /// <summary>
        /// Returns all video extraction jobs across all cluster nodes for the unified jobs queue.
        /// </summary>
        [HttpGet("jobs/cluster-queue")]
        [AuthorizePermission(PermissionKeys.StationsView)]
        public IActionResult GetClusterJobs()
        {
            var jobs = _clusterService.GetAllClusterJobs();
            return Ok(jobs);
        }

        /// <summary>
        /// Endpoint where worker nodes report live progress of dispatched video processing jobs.
        /// </summary>
        [HttpPost("jobs/status-update")]
        [AllowAnonymous]
        public IActionResult UpdateJobStatus([FromBody] ClusterJobStatusDto status)
        {
            _clusterService.UpdateJobStatus(status);
            return Ok(new { success = true });
        }

        /// <summary>
        /// Executes a video export cut job dispatched to this compute node from the cluster orchestrator.
        /// </summary>
        [HttpPost("jobs/execute")]
        [AllowAnonymous]
        public async Task<IActionResult> ExecuteDispatchedJob([FromBody] ClusterJobDispatchRequest request, CancellationToken ct)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.JobId))
            {
                return BadRequest("Invalid job dispatch payload.");
            }

            if (_jobRunner != null)
            {
                _logger.LogInformation("[CLUSTER COMPUTE] Executing dispatched video job '{JobId}' locally...", request.JobId);
                var result = await _jobRunner.ExecuteDispatchedJobAsync(request, ct);
                _clusterService.UpdateJobStatus(result);
                return Ok(result);
            }

            return StatusCode(501, new { error = "No local video job runner registered on this node." });
        }

        public class HandoverPayload
        {
            public string SourceNodeId { get; set; } = string.Empty;
            public DateTime TimestampUtc { get; set; } = DateTime.UtcNow;
        }

        public class TransferOrchestratorPayload
        {
            public string TargetNodeId { get; set; } = string.Empty;
        }
    }
}
