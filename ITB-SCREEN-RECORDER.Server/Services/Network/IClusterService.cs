// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Services/Network/IClusterService.cs
// ==========================================
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;

namespace ITB_SCREEN_RECORDER.Server.Services.Network
{
    public interface IClusterService
    {
        ClusterStatusDto GetClusterStatus();
        ClusterPartnerHealthDto GetPartnerHealthDto();
        Task<ClusterFailoverResultDto> AcquireVipManualAsync(CancellationToken ct = default);
        Task<ClusterFailoverResultDto> ReleaseVipManualAsync(CancellationToken ct = default);
        Task<ClusterFailoverResultDto> HandleHandoverNotificationAsync(string sourceNodeId, CancellationToken ct = default);
        Task CedeLeadershipAsync(CancellationToken ct = default);
    }
}
