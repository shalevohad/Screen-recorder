// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Services/Network/IVirtualIpManager.cs
// ==========================================
using System.Threading;
using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.Server.Services.Network
{
    public record VipOperationResult(bool Success, string Message, string? BoundInterface = null);

    public interface IVirtualIpManager
    {
        Task<bool> IsVirtualIpBoundLocallyAsync(string virtualIp);
        Task<VipOperationResult> AcquireVirtualIpAsync(string virtualIp, string subnetMask, string? interfaceName = null, CancellationToken ct = default);
        Task<VipOperationResult> ReleaseVirtualIpAsync(string virtualIp, string? interfaceName = null, CancellationToken ct = default);
        Task SendGratuitousArpAsync(string virtualIp, string? interfaceName = null);
        string ResolveActiveInterfaceName(string? configuredInterface = null);
    }
}
