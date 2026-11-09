// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Services/Network/SystemNetworkCommandRunner.cs
// ==========================================
using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace ITB_SCREEN_RECORDER.Server.Services.Network
{
    public class SystemNetworkCommandRunner : INetworkCommandRunner
    {
        private readonly ILogger<SystemNetworkCommandRunner> _logger;

        public SystemNetworkCommandRunner(ILogger<SystemNetworkCommandRunner> logger)
        {
            _logger = logger;
        }

        public async Task<NetworkCommandResult> RunCommandAsync(string fileName, string arguments, CancellationToken ct = default)
        {
            try
            {
                _logger.LogDebug("[NET-CMD] Executing: {FileName} {Arguments}", fileName, arguments);

                using var process = new Process
                {
                    StartInfo = new ProcessStartInfo
                    {
                        FileName = fileName,
                        Arguments = arguments,
                        RedirectStandardOutput = true,
                        RedirectStandardError = true,
                        UseShellExecute = false,
                        CreateNoWindow = true
                    }
                };

                process.Start();

                var stdoutTask = process.StandardOutput.ReadToEndAsync(ct);
                var stderrTask = process.StandardError.ReadToEndAsync(ct);

                await process.WaitForExitAsync(ct).ConfigureAwait(false);

                string stdout = await stdoutTask.ConfigureAwait(false);
                string stderr = await stderrTask.ConfigureAwait(false);

                _logger.LogDebug("[NET-CMD] Result: ExitCode={ExitCode}, Stdout={Stdout}, Stderr={Stderr}",
                    process.ExitCode, stdout.Trim(), stderr.Trim());

                return new NetworkCommandResult(process.ExitCode, stdout, stderr);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "[NET-CMD] Failed to run command: {FileName} {Arguments}", fileName, arguments);
                return new NetworkCommandResult(-1, string.Empty, ex.Message);
            }
        }
    }
}
