// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Services/Network/IClusterService.cs
// ==========================================
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Contracts.Jobs;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;

namespace ITB_SCREEN_RECORDER.Server.Services.Network
{
    public interface IClusterService : IClusterWorkerSelector
    {
        bool IsLocalNodeOrchestrator { get; }
        ClusterStatusDto GetClusterStatus();
        ClusterPartnerHealthDto GetPartnerHealthDto();
        ClusterGridStatusDto GetClusterGridStatus();
        
        Task<ClusterFailoverResultDto> AcquireVipManualAsync(CancellationToken ct = default);
        Task<ClusterFailoverResultDto> ReleaseVipManualAsync(CancellationToken ct = default);
        Task<ClusterFailoverResultDto> HandleHandoverNotificationAsync(string sourceNodeId, CancellationToken ct = default);
        Task CedeLeadershipAsync(CancellationToken ct = default);

        // Active-Active Distributed Orchestration & Workload Balancing
        Task<ClusterHeartbeatResponse> ProcessNodeHeartbeatAsync(ClusterHeartbeatRequest request, CancellationToken ct = default);
        Task<string?> ResolveAssignedIngestNodeUrlAsync(string stationHostname, CancellationToken ct = default);
        Task<ClusterNodeDescriptor?> SelectOptimalWorkerForJobAsync(CancellationToken ct = default);
        Task<ClusterFailoverResultDto> TransferOrchestratorRoleAsync(string targetNodeId, CancellationToken ct = default);
        
        // Zero-Configuration Autonomous Multicast/Broadcast Beacon Discovery
        Task ProcessClusterBeaconAsync(ClusterBeaconPacket beacon, CancellationToken ct = default);
        ClusterBeaconPacket CreateLocalBeaconPacket();

        // Distributed Jobs & Unified Telemetry
        void UpdateJobStatus(ClusterJobStatusDto status);
        List<ClusterJobStatusDto> GetAllClusterJobs();
        Task<List<AgentTelemetryReport>> GetClusterStationsAsync(CancellationToken ct = default);
        string? ResolveStreamNodeHost(string stationHostname);

        // Inter-Node C2 Coordination & Configuration Synchronization
        Task BroadcastStationStreamPolicyAsync(string hostname, bool enable, CancellationToken ct = default);
        Task BroadcastFleetStreamPolicyAsync(IEnumerable<string> hostnames, bool enable, CancellationToken ct = default);
        void ApplyInterNodeStreamPolicy(ClusterStreamPolicyRequest req);
        void ApplyInterNodeFleetStreamPolicy(ClusterFleetStreamPolicyRequest req);

        Task BroadcastStationOverrideAsync(string hostname, string? videoBitrate, int? targetFps, bool isDelete = false, CancellationToken ct = default);
        Task ApplyInterNodeStationOverrideAsync(ClusterStationOverrideRequest req);

        Task PropagateClusterConfigAsync(ITB_SCREEN_RECORDER.Core.Configuration.SystemConfig config, CancellationToken ct = default);
        Task ApplyInterNodeConfigSyncAsync(ClusterConfigSyncRequest req);

        // Remote Node Lifecycle & Maintenance Operations
        ClusterNodeDescriptor? GetOrchestratorNode();
        Task<ClusterActionResultDto> SetNodeDrainingAsync(string nodeId, bool enableDraining, CancellationToken ct = default);
        Task<ClusterActionResultDto> SetNodeModeAsync(string nodeId, string mode, CancellationToken ct = default);
        Task BroadcastNodeModeAsync(string nodeId, string mode, CancellationToken ct = default);
        void ApplyInterNodeNodeMode(ClusterNodeModeRequest req);
        Task<ClusterActionResultDto> RestartNodeAsync(string nodeId, CancellationToken ct = default);
        Task<ClusterActionResultDto> UpdateNodeCapacitiesAsync(string nodeId, ClusterNodeCapacitiesUpdateRequest req, CancellationToken ct = default);
    }
}
