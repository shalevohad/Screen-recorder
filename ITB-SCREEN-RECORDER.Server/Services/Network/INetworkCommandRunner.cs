// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Services/Network/INetworkCommandRunner.cs
// ==========================================
using System.Threading;
using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.Server.Services.Network
{
    public record NetworkCommandResult(int ExitCode, string StandardOutput, string StandardError)
    {
        public bool Success => ExitCode == 0;
    }

    public interface INetworkCommandRunner
    {
        Task<NetworkCommandResult> RunCommandAsync(string fileName, string arguments, CancellationToken ct = default);
    }
}
