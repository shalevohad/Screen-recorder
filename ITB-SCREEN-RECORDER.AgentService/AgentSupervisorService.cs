using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Core.Diagnostics;
using ITB_SCREEN_RECORDER.Core.Ipc;
using ITB_SCREEN_RECORDER.AgentService.Infrastructure;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Win32;
using System;
using System.Diagnostics;
using System.IO;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using System.Runtime.InteropServices; // חובה עבור זיהוי OS

namespace ITB_SCREEN_RECORDER.AgentService
{
    public class AgentSupervisorService : BackgroundService
    {
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

            LoadServerIpConfig(); // מתודה חדשה וחוצת-פלטפורמות
            LoadLocalPolicyFallback();
        }

        // --- הפיכת קריאת התצורה ל-Cross-Platform ---
        private void LoadServerIpConfig()
        {
            var envIp = Environment.GetEnvironmentVariable("ITB_SERVER_IP");
            if (!string.IsNullOrWhiteSpace(envIp))
            {
                _serverBaseUrl = envIp.Trim();
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                LoadServerIpFromRegistrySafe();
            }
            else
            {
                _logger.LogInformation("Linux environment detected. No ITB_SERVER_IP env var found. Defaulting to {ServerBaseUrl}", _serverBaseUrl);
            }

            // וידוא קיומו של פורט בכתובת - אם אין נקודתיים, נוסיף את פורט ברירת המחדל 5090
            if (!string.IsNullOrWhiteSpace(_serverBaseUrl) && !_serverBaseUrl.Contains(':'))
            {
                _serverBaseUrl = $"{_serverBaseUrl.Trim()}:{_defaultPort}";
                _logger.LogInformation("No port specified in server address. Automatically appended default port {DefaultPort}: {ServerBaseUrl}", _defaultPort, _serverBaseUrl);
            }
        }

        // מתודה נפרדת ועטופה כדי למנוע טעינת ספריות Win32 על Linux ב-Runtime
        private void LoadServerIpFromRegistrySafe()
        {
#pragma warning disable CA1416 // Validate platform compatibility
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
        // ------------------------------------------------

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
            // שליטה על חלון ה-Console בהתאם לדגל ה-Debug (פועל רק על Windows בתוך המתודה)
            DebugHelper.ApplyConsoleVisibility();

            _logger.LogInformation("AgentSupervisorService initialized. Target Server URL: {ServerBaseUrl}", _serverBaseUrl);

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

                string targetEndpoint = $"http://{_serverBaseUrl}/api/v1/agent/telemetry";

                var response = await _httpClient.PostAsJsonAsync(targetEndpoint, report, ct);

                if (response.IsSuccessStatusCode)
                {
                    string responseJson = await response.Content.ReadAsStringAsync(ct);
                    try
                    {
                        var heartbeatResponse = JsonSerializer.Deserialize<AgentHeartbeatResponse>(responseJson);
                        if (heartbeatResponse != null)
                        {
                            // 1. בדיקת שינוי בפוליסה מהשרת (Thin Client Architecture)
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

                                    // אם אנחנו באמצע שידור, נשלח פקודת ריסטארט מיידית ל-Worker להחלפת פרמטרים על-חם
                                    if (isStreaming)
                                    {
                                        await SendCommandToWorkerAsync("Restart");
                                    }
                                }
                            }

                            // 2. פקודות הפעלה ועצירה רגילות
                            if (heartbeatResponse.Command == ServerCommand.StopStream)
                            {
                                if (DebugHelper.IsDebugModeEnabled()) _logger.LogInformation("[Service] Server requested STOP. Forwarding to Worker.");
                                await SendCommandToWorkerAsync("Stop");
                            }
                            else if (heartbeatResponse.Command == ServerCommand.StartStream)
                            {
                                if (DebugHelper.IsDebugModeEnabled()) _logger.LogInformation("[Service] Server requested START. Forwarding to Worker.");
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