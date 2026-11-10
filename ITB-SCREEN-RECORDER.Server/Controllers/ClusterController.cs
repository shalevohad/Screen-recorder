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
        /// Evaluates hardware sizing, minimum specifications, and capacity requirements for target stations and NLE jobs.
        /// </summary>
        [HttpPost("hardware-sizing")]
        [AllowAnonymous]
        public IActionResult CalculateHardwareSizing([FromBody] HardwareSizingRequest request)
        {
            try
            {
                var grid = _clusterService.GetClusterGridStatus();
                var result = HardwareSizingCalculator.Calculate(request, grid);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "[CLUSTER API] Failed to calculate hardware sizing");
                return StatusCode(500, new { Error = "Failed to calculate hardware sizing", Details = ex.Message });
            }
        }

        /// <summary>
        /// Evaluates hardware sizing with query parameters (GET).
        /// </summary>
        [HttpGet("hardware-sizing")]
        [AllowAnonymous]
        public IActionResult GetHardwareSizing(
            [FromQuery] int stations = 50,
            [FromQuery] int jobs = 2,
            [FromQuery] string mode = "Active-Active",
            [FromQuery] string profile = "Auto")
        {
            try
            {
                var req = new HardwareSizingRequest
                {
                    TargetStations = stations,
                    TargetConcurrentJobs = jobs,
                    RedundancyMode = mode,
                    HardwareProfile = profile
                };
                var grid = _clusterService.GetClusterGridStatus();
                var result = HardwareSizingCalculator.Calculate(req, grid);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "[CLUSTER API] Failed to calculate hardware sizing");
                return StatusCode(500, new { Error = "Failed to calculate hardware sizing", Details = ex.Message });
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

        #region Inter-Node C2 Coordination Endpoints

        /// <summary>
        /// Inter-node C2 endpoint: enforces station stream/recording policy forwarded from another cluster node.
        /// </summary>
        [HttpPost("c2/stream-policy")]
        [AllowAnonymous]
        public IActionResult ApplyStreamPolicy([FromBody] ClusterStreamPolicyRequest req)
        {
            _clusterService.ApplyInterNodeStreamPolicy(req);
            return Ok(new { success = true });
        }

        /// <summary>
        /// Inter-node C2 endpoint: enforces fleet-wide stream/recording policy forwarded from another cluster node.
        /// </summary>
        [HttpPost("c2/fleet-policy")]
        [AllowAnonymous]
        public IActionResult ApplyFleetPolicy([FromBody] ClusterFleetStreamPolicyRequest req)
        {
            _clusterService.ApplyInterNodeFleetStreamPolicy(req);
            return Ok(new { success = true });
        }

        /// <summary>
        /// Inter-node C2 endpoint: synchronizes station overrides and tuning across all nodes.
        /// </summary>
        [HttpPost("c2/station-override")]
        [AllowAnonymous]
        public async Task<IActionResult> ApplyStationOverride([FromBody] ClusterStationOverrideRequest req)
        {
            await _clusterService.ApplyInterNodeStationOverrideAsync(req);
            return Ok(new { success = true });
        }

        /// <summary>
        /// Inter-node C2 endpoint: synchronizes global system configuration across all cluster nodes.
        /// </summary>
        [HttpPost("c2/sync-config")]
        [AllowAnonymous]
        public async Task<IActionResult> ApplyConfigSync([FromBody] ClusterConfigSyncRequest req)
        {
            await _clusterService.ApplyInterNodeConfigSyncAsync(req);
            return Ok(new { success = true });
        }

        /// <summary>
        /// Inter-node C2 endpoint: synchronizes node backup mode (Active/Hot vs Standby) across all cluster nodes.
        /// </summary>
        [HttpPost("c2/node-mode")]
        [AllowAnonymous]
        public IActionResult ApplyNodeMode([FromBody] ClusterNodeModeRequest req)
        {
            _clusterService.ApplyInterNodeNodeMode(req);
            return Ok(new { success = true });
        }

        /// <summary>
        /// Resolves the currently active Orchestrator node URL and Virtual IP for single-entry routing.
        /// </summary>
        [HttpGet("orchestrator")]
        [AllowAnonymous]
        public IActionResult GetOrchestratorInfo()
        {
            var orch = _clusterService.GetOrchestratorNode();
            return Ok(new
            {
                orchestratorNodeId = orch?.NodeId ?? "Unknown",
                apiBaseUrl = orch?.ApiBaseUrl ?? string.Empty,
                isLocal = _clusterService.IsLocalNodeOrchestrator,
                displayName = orch?.DisplayName ?? string.Empty
            });
        }

        #endregion

        #region Node Administrative Lifecycle Operations

        /// <summary>
        /// Sets a cluster node into Hot (Active) or Standby backup mode.
        /// </summary>
        [HttpPost("nodes/{nodeId}/mode")]
        [AuthorizePermission(PermissionKeys.SettingsCluster)]
        public async Task<IActionResult> SetNodeMode(string nodeId, [FromQuery] string mode, CancellationToken ct)
        {
            _logger.LogWarning("[CLUSTER API] Set mode={Mode} for node '{Node}' requested by {User}", mode, nodeId, User.Identity?.Name ?? "Admin");
            var result = await _clusterService.SetNodeModeAsync(nodeId, mode, ct);
            return result.Success ? Ok(result) : StatusCode(400, result);
        }

        /// <summary>
        /// Sets a cluster node into Draining (maintenance) or Active mode.
        /// </summary>
        [HttpPost("nodes/{nodeId}/drain")]
        [AuthorizePermission(PermissionKeys.SettingsCluster)]
        public async Task<IActionResult> SetNodeDraining(string nodeId, [FromQuery] bool enable, CancellationToken ct)
        {
            _logger.LogWarning("[CLUSTER API] Set draining={Enable} for node '{Node}' requested by {User}", enable, nodeId, User.Identity?.Name ?? "Admin");
            var result = await _clusterService.SetNodeDrainingAsync(nodeId, enable, ct);
            return result.Success ? Ok(result) : StatusCode(400, result);
        }

        /// <summary>
        /// Initiates a safe server service restart sequence for a specific node or all cluster nodes.
        /// </summary>
        [HttpPost("nodes/{nodeId}/restart")]
        [AuthorizePermission(PermissionKeys.SettingsCluster)]
        public async Task<IActionResult> RestartNode(string nodeId, CancellationToken ct)
        {
            _logger.LogWarning("[CLUSTER API] Restart for node '{Node}' requested by {User}", nodeId, User.Identity?.Name ?? "Admin");
            var result = await _clusterService.RestartNodeAsync(nodeId, ct);
            return result.Success ? Ok(result) : StatusCode(400, result);
        }

        /// <summary>
        /// Updates capacity limits (max ingest streams, max concurrent render jobs, node mode) for any cluster node.
        /// </summary>
        [HttpPost("nodes/{nodeId}/capacities")]
        [AuthorizePermission(PermissionKeys.SettingsCluster)]
        public async Task<IActionResult> UpdateNodeCapacities(string nodeId, [FromBody] ClusterNodeCapacitiesUpdateRequest req, CancellationToken ct)
        {
            _logger.LogInformation("[CLUSTER API] Capacities update for node '{Node}' requested by {User}", nodeId, User.Identity?.Name ?? "Admin");
            var result = await _clusterService.UpdateNodeCapacitiesAsync(nodeId, req, ct);
            return result.Success ? Ok(result) : StatusCode(400, result);
        }

        #endregion

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
