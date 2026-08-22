using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Core.Diagnostics;
using ITB_SCREEN_RECORDER.Core.Ipc;
using ITB_SCREEN_RECORDER.AgentService.Infrastructure;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;
using System.IO;
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
        private StreamWriter? _workerCommandWriter;

        public AgentSupervisorService(ILogger<AgentSupervisorService> logger)
        {
            _logger = logger;

            _workerPath = Path.Combine(AppContext.BaseDirectory, OperatingSystem.IsWindows() ? "ITB-SCREEN-RECORDER.AgentWorker.exe" : "ITB-SCREEN-RECORDER.AgentWorker");
            if (!File.Exists(_workerPath) && OperatingSystem.IsLinux())
            {
                _workerPath = Path.Combine(AppContext.BaseDirectory, "ITB-SCREEN-RECORDER.AgentWorker.exe");
            }

            _config = ConfigLoader.Load();
            _httpClient = new HttpClient
            {
                Timeout = TimeSpan.FromSeconds(5)
            };
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("AgentSupervisorService initialized.");

            _ = Task.Run(() => ListenToWorkerIpcAsync(stoppingToken), stoppingToken);

            while (!stoppingToken.IsCancellationRequested)
            {
                EnsureWorkerRunning();
                await SendTelemetryToServerAsync(stoppingToken);
                await Task.Delay(3000, stoppingToken);
            }

            if (OperatingSystem.IsWindows())
            {
#if WINDOWS
                try
                {
                    string workerName = Path.GetFileNameWithoutExtension(_workerPath);
                    var procs = Process.GetProcessesByName(workerName);
                    foreach (var proc in procs)
                    {
                        try
                        {
                            proc.Kill();
                            proc.WaitForExit(1000);
                        }
                        catch { }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning("Failed to terminate worker processes on shutdown: {Msg}", ex.Message);
                }
#endif
            }
        }

        private async Task ListenToWorkerIpcAsync(CancellationToken ct)
        {
            while (!ct.IsCancellationRequested)
            {
                try
                {
                    using var pipeServer = IpcServerFactory.CreateSecureServerPipe("ITB_Agent_IPC");

                    _logger.LogInformation("Waiting for Worker IPC connection...");
                    await pipeServer.WaitForConnectionAsync(ct);
                    _logger.LogInformation("Worker connected to IPC!");

                    using var reader = new StreamReader(pipeServer);
                    using var writer = new StreamWriter(pipeServer) { AutoFlush = true };

                    _workerCommandWriter = writer;

                    while (pipeServer.IsConnected && !ct.IsCancellationRequested)
                    {
                        string? line = await reader.ReadLineAsync(ct);
                        if (!string.IsNullOrEmpty(line))
                        {
                            try
                            {
                                var status = JsonSerializer.Deserialize<WorkerIpcStatusMessage>(line);
                                if (status != null)
                                {
                                    _isWorkerStreaming = status.IsStreaming;
                                    _lastWorkerHeartbeat = DateTime.UtcNow;
                                }
                            }
                            catch (Exception ex)
                            {
                                _logger.LogWarning("Failed to parse IPC message from worker: {Msg}", ex.Message);
                            }
                        }
                    }
                }
                catch (OperationCanceledException) { }
                catch (Exception ex)
                {
                    _logger.LogTrace("IPC server tick warning: {Msg}", ex.Message);
                    await Task.Delay(1000, ct);
                }
                finally
                {
                    _workerCommandWriter = null;
                }
            }
        }

        private async Task SendTelemetryToServerAsync(CancellationToken ct)
        {
            try
            {
                bool isWorkerAlive = (DateTime.UtcNow - _lastWorkerHeartbeat).TotalSeconds < 6;
                bool isStreaming = isWorkerAlive && _isWorkerStreaming;

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

                string targetEndpoint = _config.DashboardApiUrl;
                if (!targetEndpoint.Contains("/api/"))
                {
                    targetEndpoint = $"{targetEndpoint.TrimEnd('/')}/api/v1/agent/telemetry";
                }

                var response = await _httpClient.PostAsJsonAsync(targetEndpoint, report, ct);

                if (response.IsSuccessStatusCode)
                {
                    string responseJson = await response.Content.ReadAsStringAsync(ct);
                    try
                    {
                        var heartbeatResponse = JsonSerializer.Deserialize<AgentHeartbeatResponse>(responseJson);
                        if (heartbeatResponse != null)
                        {
                            if (heartbeatResponse.Command == ServerCommand.StopStream)
                            {
                                _logger.LogInformation("[Service] Server requested STOP. Forwarding to Worker.");
                                await SendCommandToWorkerAsync("Stop");
                            }
                            else if (heartbeatResponse.Command == ServerCommand.StartStream)
                            {
                                _logger.LogInformation("[Service] Server requested START. Forwarding to Worker.");
                                await SendCommandToWorkerAsync("Start");
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning("Failed to deserialize heartbeat response: {Msg}", ex.Message);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning("Failed to send telemetry report to server: {Msg}", ex.Message);
            }
        }

        private async Task SendCommandToWorkerAsync(string command)
        {
            if (_workerCommandWriter != null)
            {
                try
                {
                    await _workerCommandWriter.WriteLineAsync(command);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning("Failed to dispatch command to worker: {Msg}", ex.Message);
                }
            }
        }

        private void EnsureWorkerRunning()
        {
            string processName = Path.GetFileNameWithoutExtension(_workerPath);
            var procs = Process.GetProcessesByName(processName);

            if (procs.Length == 0 && File.Exists(_workerPath))
            {
                _logger.LogInformation("Worker process not detected. Launching Worker...");

                if (OperatingSystem.IsWindows())
                {
#if WINDOWS
                    bool launched = InteractiveProcessLauncher.StartProcessInActiveSession(_workerPath, string.Empty);
                    if (!launched)
                    {
                        _logger.LogWarning("Failed to launch AgentWorker interactively. This is normal if no user is currently logged into Windows.");
                    }
                    else
                    {
                        _logger.LogInformation("AgentWorker successfully launched into the active user session.");
                    }
#endif
                }
                else if (OperatingSystem.IsLinux())
                {
                    var psi = new ProcessStartInfo
                    {
                        FileName = _workerPath,
                        UseShellExecute = false,
                        CreateNoWindow = true
                    };
                    psi.EnvironmentVariables["DISPLAY"] = ":0";
                    try
                    {
                        Process.Start(psi);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError("Failed to launch Worker on Linux: {Msg}", ex.Message);
                    }
                }
            }
        }
    }
}