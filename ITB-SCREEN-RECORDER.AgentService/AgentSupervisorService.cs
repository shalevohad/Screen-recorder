// ==========================================
// File: AgentService/AgentSupervisorService.cs
// ==========================================
using ITB_SCREEN_RECORDER.Core.Contracts.Keystroke;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Core.Diagnostics;
using ITB_SCREEN_RECORDER.Core.Ipc;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Network.Discovery;
using ITB_SCREEN_RECORDER.Core.Security.Pki;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

#if WINDOWS
using ITB_SCREEN_RECORDER.AgentService.Infrastructure;
#endif

namespace ITB_SCREEN_RECORDER.AgentService
{
    public class AgentSupervisorService : BackgroundService
    {
        private bool _lastWorkerLaunchFailed = false;
        private readonly ILogger<AgentSupervisorService> _logger;
        private readonly AppConfig _config;
        private readonly string _workerPath;
        private readonly string _policyFilePath;
        private readonly HttpClient _httpClient;
        private readonly string _localBufferPath;

        private string _serverBaseUrl = "127.0.0.1:5090";
        private int _consecutiveServerFailures = 0;
        private AgentStreamPolicy _currentPolicy;
        private List<ServerDiscoveryResponse> _discoveredServers = new();
        private ServerDiscoveryResponse? _activeServer;
        private DateTime _lastFailbackCheckUtc = DateTime.MinValue;

        private bool _isWorkerStreaming;
        private DateTime? _workerRecordingStartedAtUtc = null;
        private DateTime _lastWorkerHeartbeat = DateTime.MinValue;
        private StreamWriter? _workerCommandWriter;
        private TimeSpan _serverUtcOffset = TimeSpan.Zero;
        private IpcTelemetryDto? _lastTelemetry = null;

        private bool _lastWorkerHasAudio = false;
        private bool _lastWorkerHasActiveSpeakers = false;
        private bool _lastWorkerHasActiveMicrophone = false;
        private bool _lastWorkerIsAudioStreaming = false;

        private long _lastTelemetryPayloadSizeBytes = 0;
        private DateTime _lastTelemetrySendTime = DateTime.UtcNow;

        // 💡 תור צבירה של אירועי מקלדת לדיווח ברפורט הטלמטריה
        private readonly ConcurrentQueue<KeystrokeEventDto> _pendingKeystrokes = new();

        private class IpcMessageDto
        {
            public bool IsStreaming { get; set; }
            public bool IsRecording { get; set; }
            public DateTime? RecordingStartedAtUtc { get; set; }
            public bool IsOfflineMode { get; set; }
            public bool HasAudio { get; set; }
            public bool HasActiveSpeakers { get; set; }
            public bool HasActiveMicrophone { get; set; }
            public bool IsAudioStreaming { get; set; }
            public IpcTelemetryDto? Telemetry { get; set; }
            public List<KeystrokeEventDto>? Keystrokes { get; set; }
        }

        private class IpcTelemetryDto
        {
            public int ActualFps { get; set; }
            public int DroppedFrames { get; set; }
            public int InternalCaptureFps { get; set; }
            public int QosTier { get; set; }
            public bool HasAudio { get; set; }
            public bool HasActiveSpeakers { get; set; }
            public bool HasActiveMicrophone { get; set; }
            public bool IsAudioStreaming { get; set; }
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

        private readonly string _ipcSecretToken = Convert.ToHexString(RandomNumberGenerator.GetBytes(16));

        public AgentSupervisorService(ILogger<AgentSupervisorService> logger, AppConfig config)
        {
            _logger = logger;
            _config = config ?? throw new ArgumentNullException(nameof(config));
            _policyFilePath = Path.Combine(AppContext.BaseDirectory, "agent-policy.json");

            _currentPolicy = new AgentStreamPolicy
            {
                TargetFps = _config.TargetFps > 0 ? _config.TargetFps : 30,
                VideoBitrate = string.IsNullOrWhiteSpace(_config.VideoBitrate) ? "5000k" : _config.VideoBitrate,
                RtmpServerBaseUrl = _config.RtmpServerBaseUrl ?? string.Empty
            };

            _localBufferPath = string.IsNullOrWhiteSpace(_config.LocalBufferPath)
                ? (OperatingSystem.IsWindows() ? @"C:\ProgramData\ITB-SCREEN-RECORDER\Buffer" : "/var/lib/itb-screen-recorder/buffer")
                : _config.LocalBufferPath;

            _workerPath = Path.Combine(AppContext.BaseDirectory, OperatingSystem.IsWindows() ? "ITB-SCREEN-RECORDER.AgentWorker.exe" : "ITB-SCREEN-RECORDER.AgentWorker");
            if (!File.Exists(_workerPath) && OperatingSystem.IsLinux())
            {
                _workerPath = Path.Combine(AppContext.BaseDirectory, "ITB-SCREEN-RECORDER.AgentWorker.exe");
            }

            var handler = new HttpClientHandler();
            AgentCertificateValidator.ConfigureHandler(handler);
            _httpClient = new HttpClient(handler)
            {
                Timeout = TimeSpan.FromSeconds(5)
            };

            // 💡 האזנה לרענון תעודות אוטומטי במקרה של עמדה שנותקה זמן רב או שתעודתה חודשה
            AgentCertificateValidator.OnTrustRefreshRequired += () =>
            {
                _logger.LogInformation("[PKI-AUTO-RECOVERY] Station recovery detected. Refreshing Root CA bundle from server...");
                _ = Task.Run(async () =>
                {
                    try
                    {
                        if (!string.IsNullOrWhiteSpace(_serverBaseUrl))
                        {
                            await AgentCertificateValidator.RefreshTrustFromServerAsync(_serverBaseUrl);
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning("[PKI-AUTO-RECOVERY] Background trust refresh error: {Msg}", ex.Message);
                    }
                });
            };

            InitServerConfiguration();
            LoadLocalPolicyFallback();
        }

        private void InitServerConfiguration()
        {
            if (!string.IsNullOrWhiteSpace(_config.DashboardApiUrl))
            {
                if (string.Equals(_config.DashboardApiUrl.Trim(), "AUTO", StringComparison.OrdinalIgnoreCase))
                {
                    _serverBaseUrl = "AUTO";
                    _logger.LogInformation("DashboardApiUrl is set to 'AUTO' - autonomous discovery will locate the central server.");
                    return;
                }

                if (Uri.TryCreate(_config.DashboardApiUrl, UriKind.Absolute, out Uri? parsedUri))
                {
                    _serverBaseUrl = parsedUri.Authority;
                }
                else
                {
                    _serverBaseUrl = _config.DashboardApiUrl.Replace("http://", "").Replace("https://", "").TrimEnd('/');
                }
                _logger.LogInformation("Loaded Server Endpoint from AppConfig: {ServerBaseUrl}", _serverBaseUrl);
            }
            else
            {
                var envIp = Environment.GetEnvironmentVariable("ITB_SERVER_IP");
                if (!string.IsNullOrWhiteSpace(envIp))
                {
                    if (string.Equals(envIp.Trim(), "AUTO", StringComparison.OrdinalIgnoreCase))
                    {
                        _serverBaseUrl = "AUTO";
                        _logger.LogInformation("ITB_SERVER_IP is set to 'AUTO' - autonomous discovery will locate the central server.");
                        return;
                    }

                    _serverBaseUrl = envIp.Trim().Contains(':') ? envIp.Trim() : $"{envIp.Trim()}:5090";
                    _logger.LogInformation("Loaded Server IP from Environment Variable: {ServerBaseUrl}", _serverBaseUrl);
                }
                else
                {
                    _serverBaseUrl = "AUTO";
                    _logger.LogInformation("No server endpoint configured; defaulting to autonomous discovery (AUTO).");
                }
            }
        }

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

        private string GetEffectiveRtmpDestination()
        {
            string baseUrl = !string.IsNullOrWhiteSpace(_currentPolicy.RtmpServerBaseUrl)
                ? _currentPolicy.RtmpServerBaseUrl
                : _config.RtmpServerBaseUrl;

            string safeMachineName = Uri.EscapeDataString(Environment.MachineName.Replace(" ", "_"));
            return $"{baseUrl.TrimEnd('/')}/{safeMachineName}";
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            DebugHelper.ApplyConsoleVisibility();

            _logger.LogInformation("AgentSupervisorService active. Dashboard endpoint: {ServerBaseUrl}", _serverBaseUrl);

            _ = Task.Run(() => ListenToWorkerIpcAsync(stoppingToken), stoppingToken);
            _ = Task.Run(() => PeriodicTrustSyncLoopAsync(stoppingToken), stoppingToken);

            if (string.Equals(_serverBaseUrl, "AUTO", StringComparison.OrdinalIgnoreCase))
            {
                await PerformAutonomousDiscoveryAsync(stoppingToken);
            }
            else
            {
                await RegisterWithServerAsync(_serverBaseUrl, stoppingToken);
            }

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
                        _logger.LogError("Supervisor tick error: {Msg}", ex.Message);
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
                _logger.LogWarning("Failed to cleanup worker processes on shutdown: {Msg}", ex.Message);
            }
        }

        private async Task PeriodicTrustSyncLoopAsync(CancellationToken ct)
        {
            // בדיקה ראשונית זמן קצר לאחר עליית השירות
            await Task.Delay(TimeSpan.FromSeconds(5), ct);
            while (!ct.IsCancellationRequested)
            {
                try
                {
                    if (!string.IsNullOrWhiteSpace(_serverBaseUrl) && !string.Equals(_serverBaseUrl, "AUTO", StringComparison.OrdinalIgnoreCase))
                    {
                        await AgentCertificateValidator.RefreshTrustFromServerAsync(_serverBaseUrl, ct);
                    }
                }
                catch { }

                // סנכרון תעודות תקופתי אחת ל-6 שעות
                await Task.Delay(TimeSpan.FromHours(6), ct);
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
                    if (DebugHelper.IsDebugModeEnabled()) _logger.LogInformation("Worker connected to IPC.");

                    using var reader = new StreamReader(pipeServer);
                    using var writer = new StreamWriter(pipeServer) { AutoFlush = true };

                    _workerCommandWriter = writer;

                    if (_serverUtcOffset != TimeSpan.Zero)
                    {
                        await writer.WriteLineAsync($"SyncClock|{_serverUtcOffset.Ticks}");
                    }

                    bool isIpcAuthenticated = false;
                    while (pipeServer.IsConnected && !ct.IsCancellationRequested)
                    {
                        string? line = await reader.ReadLineAsync(ct);
                        if (!string.IsNullOrEmpty(line))
                        {
                            if (!isIpcAuthenticated)
                            {
                                if (line.StartsWith("Auth|", StringComparison.OrdinalIgnoreCase))
                                {
                                    string token = line.Substring(5).Trim();
                                    if (string.Equals(token, _ipcSecretToken, StringComparison.Ordinal) || string.IsNullOrEmpty(_ipcSecretToken))
                                    {
                                        isIpcAuthenticated = true;
                                        if (DebugHelper.IsDebugModeEnabled()) _logger.LogInformation("[IPC] Worker successfully authenticated with session key.");
                                        continue;
                                    }
                                }
                                _logger.LogWarning("[IPC-SECURITY] Rejecting unauthorized IPC client connection.");
                                break;
                            }

                            try
                            {
                                var status = JsonSerializer.Deserialize<IpcMessageDto>(line, jsonOptions);
                                if (status != null)
                                {
                                    _isWorkerStreaming = status.IsStreaming;
                                    _workerRecordingStartedAtUtc = status.RecordingStartedAtUtc;
                                    _lastTelemetry = status.Telemetry;
                                    _lastWorkerHeartbeat = DateTime.UtcNow;

                                    _lastWorkerHasAudio = status.HasAudio || (status.Telemetry?.HasAudio ?? false);
                                    _lastWorkerHasActiveSpeakers = status.HasActiveSpeakers || (status.Telemetry?.HasActiveSpeakers ?? false);
                                    _lastWorkerHasActiveMicrophone = status.HasActiveMicrophone || (status.Telemetry?.HasActiveMicrophone ?? false);
                                    _lastWorkerIsAudioStreaming = status.IsAudioStreaming || (status.Telemetry?.IsAudioStreaming ?? false);

                                    // 💡 קליטת מקשים חיים שנשלחו מה-Worker
                                    if (status.Keystrokes != null && status.Keystrokes.Count > 0)
                                    {
                                        foreach (var k in status.Keystrokes)
                                        {
                                            _pendingKeystrokes.Enqueue(k);
                                        }
                                    }
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
            bool isServerConnectedThisTick = false;
            try
            {
                bool isWorkerAlive = (DateTime.UtcNow - _lastWorkerHeartbeat).TotalSeconds < 6;
                bool isStreaming = isWorkerAlive && _isWorkerStreaming;

                var fallbackHwStats = HardwareProbe.GetTelemetrySnapshot();

                double elapsedSec = (DateTime.UtcNow - _lastTelemetrySendTime).TotalSeconds;
                double currentTelemKbps = elapsedSec > 0 ? (_lastTelemetryPayloadSizeBytes * 8.0) / (elapsedSec * 1000.0) : 0;
                _lastTelemetrySendTime = DateTime.UtcNow;

                int offlineFilesCount = 0;
                long offlineFilesSizeMb = 0;

                try
                {
                    var bufferStats = OfflineBufferDrainingService.GetBufferStats(_localBufferPath);
                    offlineFilesCount = bufferStats.Count;
                    offlineFilesSizeMb = bufferStats.SizeMb;
                }
                catch { }

                // 💡 שליפת מקשים מתוך התור לשידור בטיק הנוכחי
                var keysBatch = new List<KeystrokeEventDto>();
                while (_pendingKeystrokes.TryDequeue(out var k) && keysBatch.Count < 500)
                {
                    keysBatch.Add(k);
                }

                var report = new AgentTelemetryReport
                {
                    Hostname = Environment.MachineName,
                    IpAddress = HardwareProbe.GetLocalIpAddress(),
                    Status = isStreaming ? AgentStatus.Streaming : (isWorkerAlive ? AgentStatus.Standby : AgentStatus.Offline),
                    IsProcessRunning = isWorkerAlive,
                    IsStreaming = isStreaming,
                    IsRecording = isStreaming,
                    RecordingStartedAtUtc = isStreaming ? _workerRecordingStartedAtUtc : null,
                    AutoStartRecordingOnLaunch = _config.AutoStartRecordingOnLaunch,
                    IsScreenCapturing = isStreaming,

                    HasActiveSpeakers = _lastWorkerHasActiveSpeakers,
                    HasActiveMicrophone = _lastWorkerHasActiveMicrophone,
                    HasAudio = isStreaming ? _lastWorkerHasAudio : (_lastWorkerHasActiveSpeakers || _lastWorkerHasActiveMicrophone),
                    IsAudioStreaming = isStreaming && _lastWorkerIsAudioStreaming,

                    ClientTimestamp = DateTime.UtcNow + _serverUtcOffset,
                    Timestamp = DateTime.UtcNow + _serverUtcOffset,

                    ActualFps = isStreaming ? (_lastTelemetry?.ActualFps ?? 0) : 0,
                    DroppedFrames = isStreaming ? (_lastTelemetry?.DroppedFrames ?? 0) : 0,
                    InternalCaptureFps = isStreaming ? (_lastTelemetry?.InternalCaptureFps ?? 0) : 0,
                    QosTier = isStreaming ? (_lastTelemetry?.QosTier ?? 3) : 3,

                    HostCpuPct = Math.Round(_lastTelemetry?.HostCpuPct ?? fallbackHwStats.HostCpuUsagePct, 2),
                    Gpu3dPct = Math.Round(_lastTelemetry?.Gpu3dPct ?? fallbackHwStats.Gpu3dUsagePct, 2),

                    ProcessCpuPct = isStreaming ? Math.Round(_lastTelemetry?.ProcessCpuPct ?? 0, 2) : 0,
                    ProcessRamMb = isStreaming ? Math.Round(_lastTelemetry?.ProcessRamMb ?? 0, 2) : 0,
                    GpuNvencPct = isStreaming ? Math.Round(_lastTelemetry?.GpuNvencPct ?? 0, 2) : 0,

                    HostRamPct = Math.Round(fallbackHwStats.HostRamUsagePct, 2),
                    HostTotalRamMb = Math.Round(fallbackHwStats.HostTotalRamMb, 2),

                    MediaTxMbps = isStreaming ? Math.Round((_lastTelemetry?.MediaTxMbps / 1000) ?? 0, 2) : 0,
                    TelemetryTxKbps = Math.Round(currentTelemKbps, 2),
                    NicUtilizationPct = isStreaming ? Math.Round(_lastTelemetry?.AppLineUtilizationPct ?? 0, 4) : 0,
                    LinkSpeedMbps = _lastTelemetry?.NicLinkSpeedMbps > 0 ? _lastTelemetry.NicLinkSpeedMbps : 1000,

                    NicTotalTxMbps = Math.Round(_lastTelemetry?.NicTotalTxMbps ?? 0, 2),
                    NicTotalRxMbps = Math.Round(_lastTelemetry?.NicTotalRxMbps ?? 0, 2),

                    OfflineFilesCount = offlineFilesCount,
                    OfflineFilesTotalSizeMb = offlineFilesSizeMb,

                    Keystrokes = keysBatch.Count > 0 ? keysBatch : null
                };

                string jsonPayload = JsonSerializer.Serialize(report);
                _lastTelemetryPayloadSizeBytes = Encoding.UTF8.GetByteCount(jsonPayload);

                if (string.Equals(_serverBaseUrl, "AUTO", StringComparison.OrdinalIgnoreCase))
                {
                    bool discovered = await PerformAutonomousDiscoveryAsync(ct);
                    if (!discovered)
                    {
                        return;
                    }
                }

                string cleanBase = _serverBaseUrl.TrimEnd('/');
                string targetEndpoint = cleanBase.StartsWith("https://", StringComparison.OrdinalIgnoreCase)
                    ? $"{cleanBase}/api/v1/agent/telemetry"
                    : cleanBase.StartsWith("http://", StringComparison.OrdinalIgnoreCase)
                        ? $"https://{cleanBase.Substring("http://".Length)}/api/v1/agent/telemetry"
                        : $"https://{cleanBase}/api/v1/agent/telemetry";

                using var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                long tSendMs = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
                var response = await _httpClient.PostAsync(targetEndpoint, content, ct);
                long tReceiveMs = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

                if (response.IsSuccessStatusCode)
                {
                    _consecutiveServerFailures = 0;
                    isServerConnectedThisTick = true;
                    await SendCommandToWorkerAsync("ServerConnected");

                    string responseJson = await response.Content.ReadAsStringAsync(ct);
                    try
                    {
                        var heartbeatResponse = JsonSerializer.Deserialize<AgentHeartbeatResponse>(responseJson, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                        if (heartbeatResponse != null)
                        {
                            long rtt = Math.Max(0, tReceiveMs - tSendMs);
                            long serverTimeAtReceive = heartbeatResponse.ServerUtcEpochMs + (rtt / 2);
                            TimeSpan newOffset = TimeSpan.FromMilliseconds(serverTimeAtReceive - tReceiveMs);

                            if (Math.Abs((newOffset - _serverUtcOffset).TotalMilliseconds) > 25)
                            {
                                _serverUtcOffset = newOffset;
                                _logger.LogInformation("[CLOCK SYNC] Calibrated clock offset: {OffsetMs:F1}ms (RTT: {Rtt}ms)", _serverUtcOffset.TotalMilliseconds, rtt);
                                await SendCommandToWorkerAsync($"SyncClock|{_serverUtcOffset.Ticks}");
                            }

                            try
                            {
                                OfflineBufferDrainingService.CurrentCommand = heartbeatResponse.OfflineBufferAction;
                            }
                            catch { }

                            if (heartbeatResponse.Policy != null)
                            {
                                bool bitrateChanged = _currentPolicy.VideoBitrate != heartbeatResponse.Policy.VideoBitrate;
                                bool fpsChanged = _currentPolicy.TargetFps != heartbeatResponse.Policy.TargetFps;
                                bool urlChanged = _currentPolicy.RtmpServerBaseUrl != heartbeatResponse.Policy.RtmpServerBaseUrl;

                                if (bitrateChanged || fpsChanged || urlChanged)
                                {
                                    int oldFps = _currentPolicy.TargetFps;
                                    int newFps = heartbeatResponse.Policy.TargetFps;

                                    _currentPolicy = heartbeatResponse.Policy;
                                    await File.WriteAllTextAsync(_policyFilePath, JsonSerializer.Serialize(_currentPolicy), ct);

                                    if (isStreaming)
                                    {
                                        if (!bitrateChanged && !urlChanged && fpsChanged && newFps <= oldFps)
                                        {
                                            _logger.LogInformation("Applying lower capture FPS ({NewFps}) on the fly without pipeline restart.", newFps);
                                            await SendCommandToWorkerAsync($"SetCaptureFps|{newFps}");
                                        }
                                        else
                                        {
                                            _logger.LogInformation("Pipeline restart required for policy update (BitrateChanged: {B}, UrlChanged: {U}, FpsChanged: {F}).",
                                                bitrateChanged, urlChanged, fpsChanged);
                                            string dest = GetEffectiveRtmpDestination();
                                            await SendCommandToWorkerAsync($"Restart|{dest}|{_serverUtcOffset.Ticks}|{_currentPolicy.TargetFps}|{_currentPolicy.VideoBitrate}");
                                        }
                                    }
                                }
                            }

                            if (heartbeatResponse.Command == ServerCommand.StopStream)
                            {
                                await SendCommandToWorkerAsync("Stop");
                            }
                            else if (heartbeatResponse.Command == ServerCommand.StartStream)
                            {
                                string dest = GetEffectiveRtmpDestination();
                                await SendCommandToWorkerAsync($"Start|{dest}|{_serverUtcOffset.Ticks}|{_currentPolicy.TargetFps}|{_currentPolicy.VideoBitrate}");
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning("Failed to process heartbeat response: {Msg}", ex.Message);
                    }

                    // בדוק האם אנחנו מחוברים כרגע לשרת Standby והשרת הראשי התאושש (Failback)
                    if (_activeServer != null && (_activeServer.Priority > 1 || string.Equals(_activeServer.Role, "Standby", StringComparison.OrdinalIgnoreCase)))
                    {
                        if ((DateTime.UtcNow - _lastFailbackCheckUtc).TotalSeconds >= 30)
                        {
                            _lastFailbackCheckUtc = DateTime.UtcNow;
                            var primaryCandidate = _discoveredServers
                                .FirstOrDefault(s => (s.Priority == 1 || string.Equals(s.Role, "Primary", StringComparison.OrdinalIgnoreCase)) &&
                                                     !string.Equals(s.ServerId, _activeServer.ServerId, StringComparison.OrdinalIgnoreCase));

                            if (primaryCandidate != null)
                            {
                                bool primaryRecovered = await ServerDiscoveryClient.VerifyServerHealthAsync(primaryCandidate.ApiBaseUrl, 1500, ct);
                                if (primaryRecovered)
                                {
                                    _logger.LogInformation("[FAILBACK] Primary server '{Primary}' has recovered and is healthy! Switching connection back from Standby.", primaryCandidate.ServerName);
                                    await SwitchActiveServerAsync(primaryCandidate, ct);
                                }
                            }
                        }
                    }
                }
                else
                {
                    _consecutiveServerFailures++;
                    // שחזור המקשים לתור אם השרת החזיר שגיאה
                    foreach (var k in keysBatch) _pendingKeystrokes.Enqueue(k);
                }
            }
            catch (Exception ex)
            {
                _consecutiveServerFailures++;
                if (DebugHelper.IsDebugModeEnabled())
                {
                    _logger.LogWarning("Telemetry transmission failed: {Msg}", ex.Message);
                }

                // בדיקת מעבר מיידי לשרת גיבוי (Failover) במקרה של כשל רצוף
                if (_consecutiveServerFailures >= 3 && _discoveredServers.Count > 1)
                {
                    var backupCandidate = _discoveredServers
                        .Where(s => !string.Equals(s.ServerId, _activeServer?.ServerId, StringComparison.OrdinalIgnoreCase))
                        .OrderBy(s => s.Priority)
                        .FirstOrDefault();

                    if (backupCandidate != null)
                    {
                        bool isStandbyAlive = await ServerDiscoveryClient.VerifyServerHealthAsync(backupCandidate.ApiBaseUrl, 1500, ct);
                        if (isStandbyAlive)
                        {
                            _logger.LogWarning("[FAILOVER] Current server '{Current}' unreachable for {Failures} cycles. Failing over to Standby server '{Standby}' [Role: {Role}, Priority: {Priority}]",
                                _activeServer?.ServerName ?? _serverBaseUrl, _consecutiveServerFailures, backupCandidate.ServerName, backupCandidate.Role, backupCandidate.Priority);

                            await SwitchActiveServerAsync(backupCandidate, ct);
                            return;
                        }
                    }
                }

                if (_consecutiveServerFailures >= 10 && _consecutiveServerFailures % 5 == 0)
                {
                    _logger.LogInformation("[DISCOVERY] Server communication disconnected for {Count} cycles. Attempting autonomous server rediscovery...", _consecutiveServerFailures);
                    _ = Task.Run(() => PerformAutonomousDiscoveryAsync(ct), ct);
                }
            }
            finally
            {
                if (!isServerConnectedThisTick)
                {
                    await SendCommandToWorkerAsync("ServerDisconnected");
                }
            }
        }

        private async Task<bool> PerformAutonomousDiscoveryAsync(CancellationToken ct)
        {
            try
            {
                int discPort = _config.DiscoveryPort > 0 ? _config.DiscoveryPort : ServerDiscoveryConstants.DefaultDiscoveryPort;
                string discMcast = !string.IsNullOrWhiteSpace(_config.DiscoveryMulticastAddress) ? _config.DiscoveryMulticastAddress : ServerDiscoveryConstants.DefaultMulticastAddress;
                var dnsHostnames = _config.DiscoveryDnsHostnames != null && _config.DiscoveryDnsHostnames.Count > 0
                    ? _config.DiscoveryDnsHostnames
                    : new List<string> { "itb-server", "screenrecorder" };
                int discTimeout = _config.DiscoveryTimeoutMs > 0 ? _config.DiscoveryTimeoutMs : 2500;
                string targetEnv = !string.IsNullOrWhiteSpace(_config.DiscoveryTargetEnvironment) ? _config.DiscoveryTargetEnvironment : "Production";
                int fallbackHttp = _config.DiscoveryFallbackHttpPort > 0 ? _config.DiscoveryFallbackHttpPort : 5090;
                int fallbackRtmp = _config.DiscoveryFallbackRtmpPort > 0 ? _config.DiscoveryFallbackRtmpPort : 19350;

                _logger.LogInformation("[DISCOVERY] Initiating autonomous server discovery on {Address}:{Port} (DNS fallback names: {DnsNames}, TargetEnv: {Env})...",
                    discMcast, discPort, string.Join(", ", dnsHostnames), targetEnv);

                var discoveryClient = new ServerDiscoveryClient(
                    _logger,
                    discoveryPort: discPort,
                    multicastAddress: discMcast,
                    dnsSearchHostnames: dnsHostnames,
                    fallbackHttpPort: fallbackHttp,
                    fallbackRtmpPort: fallbackRtmp,
                    targetEnvironment: targetEnv);

                var servers = await discoveryClient.DiscoverServersAsync(timeoutMs: discTimeout, ct);
                if (servers.Count > 0)
                {
                    _discoveredServers = servers;
                    var bestServer = servers.FirstOrDefault();
                    if (bestServer != null)
                    {
                        await SwitchActiveServerAsync(bestServer, ct);
                        return true;
                    }
                }
                else
                {
                    _logger.LogWarning("[DISCOVERY] Autonomous server discovery timed out without response. Retrying on next cycle.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "[DISCOVERY] Autonomous server discovery probe encountered an issue.");
            }

            return false;
        }

        private async Task SwitchActiveServerAsync(ServerDiscoveryResponse server, CancellationToken ct)
        {
            _activeServer = server;
            if (Uri.TryCreate(server.ApiBaseUrl, UriKind.Absolute, out Uri? parsedUri))
            {
                _serverBaseUrl = parsedUri.Authority;
            }
            else
            {
                string ip = server.ServerIps.Count > 0 ? server.ServerIps[0] : "127.0.0.1";
                _serverBaseUrl = $"{ip}:{server.HttpPort}";
            }

            if (!string.IsNullOrWhiteSpace(server.RtmpBaseUrl))
            {
                _currentPolicy.RtmpServerBaseUrl = server.RtmpBaseUrl;
            }

            _logger.LogInformation("[SERVER SELECTION] Connected to Server '{Name}' [Role: {Role}, Priority: {Priority}] -> {Endpoint}",
                server.ServerName, server.Role, server.Priority, _serverBaseUrl);

            await RegisterWithServerAsync(_serverBaseUrl, ct);
            _consecutiveServerFailures = 0;

            if (_isWorkerStreaming)
            {
                string dest = GetEffectiveRtmpDestination();
                await SendCommandToWorkerAsync($"Restart|{dest}|{_serverUtcOffset.Ticks}|{_currentPolicy.TargetFps}|{_currentPolicy.VideoBitrate}");
            }
        }

        private async Task RegisterWithServerAsync(string serverBaseUrl, CancellationToken ct)
        {
            if (string.IsNullOrWhiteSpace(serverBaseUrl) || string.Equals(serverBaseUrl, "AUTO", StringComparison.OrdinalIgnoreCase))
            {
                return;
            }

            try
            {
                string cleanBase = serverBaseUrl.TrimEnd('/');
                string targetEndpoint = cleanBase.StartsWith("https://", StringComparison.OrdinalIgnoreCase)
                    ? $"{cleanBase}/api/v1/agent/register"
                    : cleanBase.StartsWith("http://", StringComparison.OrdinalIgnoreCase)
                        ? $"https://{cleanBase.Substring("http://".Length)}/api/v1/agent/register"
                        : $"https://{cleanBase}/api/v1/agent/register";

                var request = new AgentRegistrationRequest
                {
                    MachineName = Environment.MachineName,
                    OsVersion = Environment.OSVersion.ToString(),
                    AgentVersion = "1.0.4",
                    RequestTimestampUtc = DateTime.UtcNow
                };

                using var content = new StringContent(JsonSerializer.Serialize(request), Encoding.UTF8, "application/json");
                var response = await _httpClient.PostAsync(targetEndpoint, content, ct);
                if (response.IsSuccessStatusCode)
                {
                    string json = await response.Content.ReadAsStringAsync(ct);
                    var regResponse = JsonSerializer.Deserialize<AgentRegistrationResponse>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                    if (regResponse?.Policy != null)
                    {
                        _currentPolicy = regResponse.Policy;
                        _logger.LogInformation("[HANDSHAKE] Handshake completed successfully with server. StreamKey: {Key}, FPS: {Fps}, Bitrate: {Bitrate}",
                            regResponse.AssignedStreamKey, _currentPolicy.TargetFps, _currentPolicy.VideoBitrate);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogDebug("[HANDSHAKE] Initial registration ping completed with info: {Msg}", ex.Message);
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
                    _logger.LogWarning("Worker process detected but IPC heartbeat is dead. Terminating process...");
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
                        _logger.LogInformation("Launching Worker process...");
                    }

                    string workerArgs = $"--ipc-token {_ipcSecretToken}";

                    if (OperatingSystem.IsWindows())
                    {
#if WINDOWS
                        bool launched = InteractiveProcessLauncher.StartProcessInActiveSession(_workerPath, workerArgs);
                        if (!launched)
                        {
                            if (!_lastWorkerLaunchFailed)
                            {
                                _logger.LogWarning("Failed to launch AgentWorker interactively. Session might be locked/logged out.");
                                _lastWorkerLaunchFailed = true;
                            }
                        }
                        else
                        {
                            _logger.LogInformation("AgentWorker launched successfully into active session with secure IPC token.");
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
                            Arguments = workerArgs,
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
                _logger.LogError("Error in EnsureWorkerRunning: {Msg}", ex.Message);
            }
        }
    }
}