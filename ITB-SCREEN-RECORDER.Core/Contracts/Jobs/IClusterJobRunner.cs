// ==========================================
// File: ITB-SCREEN-RECORDER.Core/Contracts/Jobs/IClusterJobRunner.cs
// ==========================================
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;

namespace ITB_SCREEN_RECORDER.Core.Contracts.Jobs
{
    /// <summary>
    /// Contract for executing video processing and extraction jobs dispatched to a cluster compute node.
    /// </summary>
    public interface IClusterJobRunner
    {
        Task<ClusterJobStatusDto> ExecuteDispatchedJobAsync(ClusterJobDispatchRequest request, CancellationToken ct = default);
        List<ClusterJobStatusDto> GetActiveJobs();
    }
}
