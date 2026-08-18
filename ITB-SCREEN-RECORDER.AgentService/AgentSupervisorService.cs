using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Core.Diagnostics;
using ITB_SCREEN_RECORDER.Core.Ipc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;
using System.IO;
using System.IO.Pipes;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace ITB_SCREEN_RECORDER.AgentService
{
    public class AgentSupervisorService : BackgroundService
    {
        private readonly ILogger<AgentSupervisorService> _logger;
        private readonly string _workerPath;
        private readonly HttpClient _httpClient;
        private readonly AppConfig _config;

        private bool _isWorkerStreaming;
        private DateTime _lastWorkerHeartbeat = DateTime.MinValue;

        public AgentSupervisorService(ILogger<AgentSupervisorService> logger)
        {
            _logger = logger;
            _workerPath = Path.Combine(AppContext.BaseDirectory, "ITB-SCREEN-RECORDER.AgentWorker.exe");
            _config = ConfigLoader.Load();
            _httpClient = new HttpClient
            {
                Timeout = TimeSpan.FromSeconds(5)
            };
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("AgentSupervisorService initialized.");

            // הפעלת משימת האזנה ל-IPC ברקע
            _ = Task.Run(() => ListenToWorkerIpcAsync(stoppingToken), stoppingToken);

            // לולאת הדיווח המרכזית לשרת (Telemetry Heartbeat)
            while (!stoppingToken.IsCancellationRequested)
            {
                EnsureWorkerRunning();
                await SendTelemetryToServerAsync(stoppingToken);

                await Task.Delay(3000, stoppingToken); // דיווח לשרת כל 3 שניות
            }

#if WINDOWS
            Infrastructure.WindowsProcessLauncher.TerminateWorkerProcesses();
#endif
        }

        private async Task ListenToWorkerIpcAsync(CancellationToken ct)
        {
            while (!ct.IsCancellationRequested)
            {
                try
                {
                    using var pipeServer = new NamedPipeServerStream(
                        "ITB_Agent_IPC",
                        PipeDirection.InOut,
                        1,
                        PipeTransmissionMode.Byte,
                        PipeOptions.Asynchronous);

                    await pipeServer.WaitForConnectionAsync(ct);
                    using var reader = new StreamReader(pipeServer);

                    while (pipeServer.IsConnected && !ct.IsCancellationRequested)
                    {
                        string? line = await reader.ReadLineAsync(ct);
                        if (!string.IsNullOrEmpty(line))
                        {
                            var status = JsonSerializer.Deserialize<WorkerIpcStatusMessage>(line);
                            if (status != null)
                            {
                                _isWorkerStreaming = status.IsStreaming;
                                _lastWorkerHeartbeat = DateTime.UtcNow;
                            }
                        }
                    }
                }
                catch (OperationCanceledException) { }
                catch (Exception ex)
                {
                    _logger.LogTrace("IPC server tick: {Msg}", ex.Message);
                    await Task.Delay(1000, ct);
                }
            }
        }

        private async Task SendTelemetryToServerAsync(CancellationToken ct)
        {
            try
            {
                bool isWorkerAlive = (DateTime.UtcNow - _lastWorkerHeartbeat).TotalSeconds < 6;
                bool isStreaming = isWorkerAlive && _isWorkerStreaming;

                // איסוף מדדי חומרה מתוך ה-Core
                var hardwareStats = HardwareProbe.GetTelemetry();

                var report = new AgentTelemetryReport
                {
                    Hostname = Environment.MachineName,
                    IpAddress = HardwareProbe.GetLocalIpAddress(),
                    Status = isStreaming ? AgentStatus.Streaming : (isWorkerAlive ? AgentStatus.Standby : AgentStatus.Offline),
                    IsProcessRunning = isWorkerAlive,
                    IsStreaming = isStreaming,
                    IsScreenCapturing = isStreaming,
                    CpuUsagePercentage = hardwareStats.CpuUsagePercentage,
                    GpuUsagePercentage = hardwareStats.GpuUsagePercentage,
                    ClientTimestamp = DateTime.UtcNow,
                    Timestamp = DateTime.UtcNow
                };

                string serverUrl = _config.DashboardApiUrl;
                var response = await _httpClient.PostAsJsonAsync(serverUrl, report, ct);

                if (response.IsSuccessStatusCode)
                {
                    _logger.LogDebug("Telemetry reported successfully to server. Status: {Status}", report.Status);
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning("Failed to send telemetry report to server: {Msg}", ex.Message);
            }
        }

        private void EnsureWorkerRunning()
        {
#if WINDOWS
            var procs = Process.GetProcessesByName("ITB-SCREEN-RECORDER.AgentWorker");
            if (procs.Length == 0 && File.Exists(_workerPath))
            {
                _logger.LogInformation("Worker process not detected. Launching Worker in active user session...");
                Infrastructure.WindowsProcessLauncher.StartWorkerInActiveSession(_workerPath, string.Empty);
            }
#endif
        }
    }
}