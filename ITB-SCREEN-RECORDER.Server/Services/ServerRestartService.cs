// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Services/ServerRestartService.cs
// ==========================================
using System;
using System.Diagnostics;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace ITB_SCREEN_RECORDER.Server.Services
{
    /// <summary>
    /// Contract for scheduling a graceful self-restart of the ITB-SCREEN-RECORDER Server.
    /// </summary>
    public interface IServerRestartService
    {
        /// <summary>
        /// Schedules an asynchronous server self-restart after the specified delay.
        /// Allows HTTP responses to flush completely before termination.
        /// </summary>
        /// <param name="delayMilliseconds">Delay in milliseconds before restart command is executed.</param>
        void ScheduleRestart(int delayMilliseconds = 1500);
    }

    /// <summary>
    /// Executes a clean graceful restart of the server process or Windows / systemd service.
    /// </summary>
    public class ServerRestartService : IServerRestartService
    {
        private readonly IHostApplicationLifetime _appLifetime;
        private readonly ILogger<ServerRestartService> _logger;
        private int _isRestarting;

        public ServerRestartService(
            IHostApplicationLifetime appLifetime,
            ILogger<ServerRestartService> logger)
        {
            _appLifetime = appLifetime;
            _logger = logger;
        }

        public void ScheduleRestart(int delayMilliseconds = 1500)
        {
            if (Interlocked.Exchange(ref _isRestarting, 1) != 0)
            {
                _logger.LogWarning("[RESTART] Restart sequence is already scheduled or in progress.");
                return;
            }

            _logger.LogInformation("[RESTART] Scheduling server self-restart in {DelayMs}ms...", delayMilliseconds);

            _ = Task.Run(async () =>
            {
                try
                {
                    await Task.Delay(Math.Max(500, delayMilliseconds)).ConfigureAwait(false);
                    _logger.LogInformation("[RESTART] Executing server restart dispatcher...");

                    if (OperatingSystem.IsWindows())
                    {
                        bool isService = Microsoft.Extensions.Hosting.WindowsServices.WindowsServiceHelpers.IsWindowsService();

                        if (isService)
                        {
                            _logger.LogInformation("[RESTART] Running as Windows Service 'ITB_ServerService'. Spawning service restart command...");
                            // PowerShell restart with fallback to start if already stopped
                            var psi = new ProcessStartInfo
                            {
                                FileName = "powershell.exe",
                                Arguments = "-NoProfile -ExecutionPolicy Bypass -Command \"Start-Sleep -Seconds 2; try { Restart-Service -Name 'ITB_ServerService' -Force } catch { Start-Service -Name 'ITB_ServerService' }\"",
                                CreateNoWindow = true,
                                UseShellExecute = false
                            };
                            Process.Start(psi);
                        }
                        else
                        {
                            _logger.LogInformation("[RESTART] Running in interactive/console mode. Spawning new process instance...");
                            string? exePath = Environment.ProcessPath;
                            if (!string.IsNullOrEmpty(exePath) && File.Exists(exePath))
                            {
                                var psi = new ProcessStartInfo
                                {
                                    FileName = "cmd.exe",
                                    Arguments = $"/c timeout /t 2 /nobreak >nul & start \"\" \"{exePath}\"",
                                    CreateNoWindow = true,
                                    UseShellExecute = false
                                };
                                Process.Start(psi);
                            }
                        }
                    }
                    else if (OperatingSystem.IsLinux())
                    {
                        _logger.LogInformation("[RESTART] Running on Linux. Spawning systemctl restart...");
                        var psi = new ProcessStartInfo
                        {
                            FileName = "/bin/bash",
                            Arguments = "-c \"sleep 2 && (systemctl restart ITB_ServerService || systemctl restart itb-server || systemctl restart itb-screen-recorder)\"",
                            CreateNoWindow = true,
                            UseShellExecute = false
                        };
                        Process.Start(psi);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "[RESTART] Error while spawning restart command process.");
                }
                finally
                {
                    _logger.LogInformation("[RESTART] Gracefully stopping host application lifetime...");
                    _appLifetime.StopApplication();
                }
            });
        }
    }
}

