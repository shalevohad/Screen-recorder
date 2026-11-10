// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Services/Network/IClusterService.cs
// ==========================================
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;

namespace ITB_SCREEN_RECORDER.Server.Services.Network
{
    public interface IClusterService
    {
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
        
        // Distributed Jobs & Unified Telemetry
        void UpdateJobStatus(ClusterJobStatusDto status);
        List<ClusterJobStatusDto> GetAllClusterJobs();
        Task<List<AgentTelemetryReport>> GetClusterStationsAsync(CancellationToken ct = default);
        string? ResolveStreamNodeHost(string stationHostname);
    }
}
