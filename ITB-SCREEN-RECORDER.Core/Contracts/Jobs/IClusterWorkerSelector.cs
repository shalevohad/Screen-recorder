// ==========================================
// File: ITB-SCREEN-RECORDER.Core/Contracts/Jobs/IClusterWorkerSelector.cs
// ==========================================
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;

namespace ITB_SCREEN_RECORDER.Core.Contracts.Jobs
{
    /// <summary>
    /// Hardware-aware cluster worker selection and stream load balancing.
    /// Distributes workload proportionally according to GPU/CPU capabilities,
    /// protecting weak nodes from overload and maximizing cluster throughput.
    /// </summary>
    public interface IClusterWorkerSelector
    {
        Task<ClusterNodeDescriptor?> SelectOptimalWorkerForJobAsync(CancellationToken ct = default);
        Task<string?> ResolveAssignedIngestNodeUrlAsync(string stationHostname, CancellationToken ct = default);
        void ReportJobStatus(ClusterJobStatusDto status);
        int GetActiveJobsCount();
    }
}
