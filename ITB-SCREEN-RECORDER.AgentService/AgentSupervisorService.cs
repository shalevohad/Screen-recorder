using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Core.Diagnostics;
using ITB_SCREEN_RECORDER.Core.Ipc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using System.Runtime.InteropServices;

#if WINDOWS
using Microsoft.Win32;
using ITB_SCREEN_RECORDER.AgentService.Infrastructure;
#endif

namespace ITB_SCREEN_RECORDER.AgentService
{
    public class AgentSupervisorService : BackgroundService
    {
        private bool _lastWorkerLaunchFailed = false;
        private readonly ILogger<AgentSupervisorService> _logger;
        private readonly string _workerPath;
        private readonly string _policyFilePath;
        private readonly HttpClient _httpClient;

        private string _serverBaseUrl = "127.0.0.1:5090";
        private int _defaultPort = 5090;
        private AgentStreamPolicy _currentPolicy = new AgentStreamPolicy();

        private bool _isWorkerStreaming;
        private DateTime _lastWorkerHeartbeat = DateTime.MinValue;
        private StreamWriter? _workerCommandWriter;
        private TimeSpan _serverUtcOffset = TimeSpan.Zero;
        private IpcTelemetryDto? _lastTelemetry = null;

        private long _lastTelemetryPayloadSizeBytes = 0;
        private DateTime _lastTelemetrySendTime = DateTime.UtcNow;

        private class IpcMessageDto
        {
            public bool IsStreaming { get; set; }
            public IpcTelemetryDto? Telemetry { get; set; }
        }

        private class IpcTelemetryDto
        {
            public int ActualFps { get; set; }
            public int DroppedFrames { get; set; }
            public int InternalCaptureFps { get; set; }
            public int QosTier { get; set; }
            public double HostCpuPct { get; set; }
            public double ProcessCpuPct { get; set; }
            public double ProcessRamMb { get; set; }
            public double Gpu3dPct { get; set; }
            public double GpuNvencPct { get; set; }
            public double MediaTxMbps { get; set; }
            public double NicLinkSpeedMbps { get; set; }
            public double NicTotalTxMbps { get; set; }
            public double NicTotalRxMbps { get; set; }
            public double AppLineUtilizationPct { get; set; }
        }

        public AgentSupervisorService(ILogger<AgentSupervisorService> logger)
        {
            _logger = logger;
            _policyFilePath = Path.Combine(AppContext.BaseDirectory, "agent-policy.json");

            _workerPath = Path.Combine(AppContext.BaseDirectory, OperatingSystem.IsWindows() ? "ITB-SCREEN-RECORDER.AgentWorker.exe" : "ITB-SCREEN-RECORDER.AgentWorker");
            if (!File.Exists(_workerPath) && OperatingSystem.IsLinux())
            {
                _workerPath = Path.Combine(AppContext.BaseDirectory, "ITB-SCREEN-RECORDER.AgentWorker.exe");
            }

            _httpClient = new HttpClient
            {
                Timeout = TimeSpan.FromSeconds(5)
            };

            LoadServerIpConfig();
            LoadLocalPolicyFallback();
        }

        private void LoadServerIpConfig()
        {
            var envIp = Environment.GetEnvironmentVariable("ITB_SERVER_IP");
            if (!string.IsNullOrWhiteSpace(envIp))
            {
                _serverBaseUrl = envIp.Trim();
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
#if WINDOWS
                LoadServerIpFromRegistrySafe();
#endif
            }
            else
            {
                _logger.LogInformation("Linux environment detected. No ITB_SERVER_IP env var found. Defaulting to {ServerBaseUrl}", _serverBaseUrl);
            }

            if (!string.IsNullOrWhiteSpace(_serverBaseUrl) && !_serverBaseUrl.Contains(':'))
            {
                _serverBaseUrl = $"{_serverBaseUrl.Trim()}:{_defaultPort}";
                _logger.LogInformation("No port specified in server address. Automatically appended default port {DefaultPort}: {ServerBaseUrl}", _defaultPort, _serverBaseUrl);
            }
        }

#if WINDOWS
        private void LoadServerIpFromRegistrySafe()
        {
#pragma warning disable CA1416
            try
            {
                using var key = Registry.LocalMachine.OpenSubKey(@"SOFTWARE\ITB\ScreenRecorder");
                if (key != null)
                {
                    var ipVal = key.GetValue("ServerIp");
                    if (ipVal != null && !string.IsNullOrWhiteSpace(ipVal.ToString()))
                    {
                        _serverBaseUrl = ipVal.ToString()!;
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning("Failed to read ServerIp from Windows Registry: {Msg}", ex.Message);
            }
#pragma warning restore CA1416
        }
#endif

        private void LoadLocalPolicyFallback()
        {
            if (File.Exists(_policyFilePath))
            {
                try
                {
                    string json = File.ReadAllText(_policyFilePath);
                    var localPolicy = JsonSerializer.Deserialize<AgentStreamPolicy>(json);
                    if (localPolicy != null) _currentPolicy = localPolicy;
                }
                catch { }
            }
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            DebugHelper.ApplyConsoleVisibility();

            _logger.LogInformation("AgentSupervisorService initialized. Target Server URL: {ServerBaseUrl}", _serverBaseUrl);

            _ = Task.Run(() => ListenToWorkerIpcAsync(stoppingToken), stoppingToken);

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    EnsureWorkerRunning();
                    await SendTelemetryToServerAsync(stoppingToken);
                }
                catch (Exception ex)
                {
                    if (DebugHelper.IsDebugModeEnabled())
                    {
                        _logger.LogError("Supervisor tick failed: {Msg}", ex.Message);
                    }
                }

                int delayMs = _isWorkerStreaming ? 1000 : 3000;
                await Task.Delay(delayMs, stoppingToken);
            }

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
        }

        private async Task ListenToWorkerIpcAsync(CancellationToken ct)
        {
            var jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            while (!ct.IsCancellationRequested)
            {
                try
                {
                    using var pipeServer = IpcServerFactory.CreateSecureServerPipe("ITB_Agent_IPC");

                    if (DebugHelper.IsDebugModeEnabled()) _logger.LogInformation("Waiting for Worker IPC connection...");
                    await pipeServer.WaitForConnectionAsync(ct);
                    if (DebugHelper.IsDebugModeEnabled()) _logger.LogInformation("Worker connected to IPC!");

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
                                var status = JsonSerializer.Deserialize<IpcMessageDto>(line, jsonOptions);
                                if (status != null)
                                {
                                    _isWorkerStreaming = status.IsStreaming;
                                    _lastTelemetry = status.Telemetry;
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
                    if (DebugHelper.IsDebugModeEnabled()) _logger.LogTrace("IPC server tick warning: {Msg}", ex.Message);
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

                var fallbackHwStats = HardwareProbe.GetTelemetrySnapshot();

                double elapsedSec = (DateTime.UtcNow - _lastTelemetrySendTime).TotalSeconds;
                double currentTelemKbps = elapsedSec > 0 ? (_lastTelemetryPayloadSizeBytes * 8.0) / (elapsedSec * 1000.0) : 0;
                _lastTelemetrySendTime = DateTime.UtcNow;

                double currentHostCpu = isStreaming ? (_lastTelemetry?.HostCpuPct ?? fallbackHwStats.HostCpuUsagePct) : fallbackHwStats.HostCpuUsagePct;
                double currentGpu3d = isStreaming ? (_lastTelemetry?.Gpu3dPct ?? fallbackHwStats.Gpu3dUsagePct) : fallbackHwStats.Gpu3dUsagePct;
                double currentGpuNvenc = isStreaming ? (_lastTelemetry?.GpuNvencPct ?? 0) : 0;

                var report = new AgentTelemetryReport
                {
                    Hostname = Environment.MachineName,
                    IpAddress = HardwareProbe.GetLocalIpAddress(),
                    Status = isStreaming ? AgentStatus.Streaming : (isWorkerAlive ? AgentStatus.Standby : AgentStatus.Offline),
                    IsProcessRunning = isWorkerAlive,
                    IsStreaming = isStreaming,
                    IsScreenCapturing = isStreaming,
                    HasActiveSpeakers = true,
                    HasActiveMicrophone = true,
                    ClientTimestamp = DateTime.UtcNow,
                    Timestamp = DateTime.UtcNow,

                    ActualFps = isStreaming ? (_lastTelemetry?.ActualFps ?? 0) : 0,
                    DroppedFrames = isStreaming ? (_lastTelemetry?.DroppedFrames ?? 0) : 0,
                    InternalCaptureFps = isStreaming ? (_lastTelemetry?.InternalCaptureFps ?? 0) : 0,
                    QosTier = isStreaming ? (_lastTelemetry?.QosTier ?? 3) : 3,

                    HostCpuPct = Math.Round(currentHostCpu, 2),
                    ProcessCpuPct = isStreaming ? Math.Round(_lastTelemetry?.ProcessCpuPct ?? 0, 2) : 0,
                    ProcessRamMb = isStreaming ? Math.Round(_lastTelemetry?.ProcessRamMb ?? 0, 2) : 0,
                    Gpu3dPct = Math.Round(currentGpu3d, 2),
                    GpuNvencPct = Math.Round(currentGpuNvenc, 2),

                    MediaTxMbps = isStreaming ? Math.Round(_lastTelemetry?.MediaTxMbps ?? 0, 2) : 0,
                    TelemetryTxKbps = Math.Round(currentTelemKbps, 2),
                    NicUtilizationPct = isStreaming ? Math.Round(_lastTelemetry?.AppLineUtilizationPct ?? 0, 4) : 0
                };

                string jsonPayload = JsonSerializer.Serialize(report);
                _lastTelemetryPayloadSizeBytes = Encoding.UTF8.GetByteCount(jsonPayload);

                string targetEndpoint = $"http://{_serverBaseUrl}/api/v1/agent/telemetry";

                using var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
                var response = await _httpClient.PostAsync(targetEndpoint, content, ct);

                if (response.IsSuccessStatusCode)
                {
                    string responseJson = await response.Content.ReadAsStringAsync(ct);
                    try
                    {
                        var heartbeatResponse = JsonSerializer.Deserialize<AgentHeartbeatResponse>(responseJson, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                        if (heartbeatResponse != null)
                        {
                            if (heartbeatResponse.ServerUtcTime != default)
                            {
                                _serverUtcOffset = heartbeatResponse.ServerUtcTime - DateTime.UtcNow;
                            }

                            if (heartbeatResponse.Policy != null)
                            {
                                bool policyChanged =
                                    _currentPolicy.VideoBitrate != heartbeatResponse.Policy.VideoBitrate ||
                                    _currentPolicy.TargetFps != heartbeatResponse.Policy.TargetFps ||
                                    _currentPolicy.RtmpServerBaseUrl != heartbeatResponse.Policy.RtmpServerBaseUrl;

                                if (policyChanged)
                                {
                                    if (DebugHelper.IsDebugModeEnabled())
                                        _logger.LogInformation("Policy change detected from server. Updating local cache.");

                                    _currentPolicy = heartbeatResponse.Policy;
                                    await File.WriteAllTextAsync(_policyFilePath, JsonSerializer.Serialize(_currentPolicy), ct);

                                    if (isStreaming)
                                    {
                                        await SendCommandToWorkerAsync($"Restart|{_serverUtcOffset.Ticks}");
                                    }
                                }
                            }

                            if (heartbeatResponse.Command == ServerCommand.StopStream)
                            {
                                if (DebugHelper.IsDebugModeEnabled()) _logger.LogInformation("[Service] Server requested STOP. Forwarding to Worker.");
                                await SendCommandToWorkerAsync("Stop");
                            }
                            else if (heartbeatResponse.Command == ServerCommand.StartStream)
                            {
                                if (DebugHelper.IsDebugModeEnabled()) _logger.LogInformation("[Service] Server requested START. Forwarding to Worker.");
                                await SendCommandToWorkerAsync($"Start|{_serverUtcOffset.Ticks}");
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
                if (DebugHelper.IsDebugModeEnabled())
                {
                    _logger.LogWarning("Failed to send telemetry report to server: {Msg}", ex.Message);
                }
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
            try
            {
                string processName = Path.GetFileNameWithoutExtension(_workerPath);
                var procs = Process.GetProcessesByName(processName);

                bool hasEverConnected = _lastWorkerHeartbeat != DateTime.MinValue;
                bool isHeartbeatDead = hasEverConnected && (DateTime.UtcNow - _lastWorkerHeartbeat).TotalSeconds > 15;

                if (procs.Length > 0 && isHeartbeatDead)
                {
                    _logger.LogWarning("Worker process detected but IPC heartbeat is dead. Terminating frozen process...");
                    foreach (var proc in procs)
                    {
                        try
                        {
                            proc.Kill();
                            proc.WaitForExit(2000);
                        }
                        catch { }
                    }

                    procs = Array.Empty<Process>();
                    _lastWorkerHeartbeat = DateTime.MinValue;
                    _isWorkerStreaming = false;
                }
                else if (procs.Length == 0 && File.Exists(_workerPath))
                {
                    if (!_lastWorkerLaunchFailed)
                    {
                        _logger.LogInformation("Worker process not detected (or was purged). Launching Worker...");
                    }

                    if (OperatingSystem.IsWindows())
                    {
#if WINDOWS
                        bool launched = InteractiveProcessLauncher.StartProcessInActiveSession(_workerPath, string.Empty);
                        if (!launched)
                        {
                            if (!_lastWorkerLaunchFailed)
                            {
                                _logger.LogWarning("Failed to launch AgentWorker interactively. Normal if session is locked/logged out. (Further identical warnings suppressed).");
                                _lastWorkerLaunchFailed = true;
                            }
                        }
                        else
                        {
                            _logger.LogInformation("AgentWorker successfully launched into the active user session.");
                            _lastWorkerHeartbeat = DateTime.UtcNow;
                            _lastWorkerLaunchFailed = false;
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
                            _lastWorkerHeartbeat = DateTime.UtcNow;
                            _lastWorkerLaunchFailed = false;
                        }
                        catch (Exception ex)
                        {
                            _logger.LogError("Failed to launch Worker on Linux: {Msg}", ex.Message);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Critical error in EnsureWorkerRunning: {Msg}", ex.Message);
            }
        }
    }
}