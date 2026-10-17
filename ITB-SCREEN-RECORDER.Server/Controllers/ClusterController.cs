// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Controllers/ClusterController.cs
// ==========================================
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Core.Diagnostics;
using ITB_SCREEN_RECORDER.Server.Models;
using ITB_SCREEN_RECORDER.Server.Services;
using ITB_SCREEN_RECORDER.Server.Services.Network;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace ITB_SCREEN_RECORDER.Server.Controllers
{
    [ApiController]
    [Route("api/v1/cluster")]
    public class ClusterController : ControllerBase
    {
        private readonly ITelemetryStateService _telemetryState;
        private readonly VirtualIpManagerService _vipManager;
        private readonly NetworkTelemetry _serverNetworkTelemetry;
        private readonly SettingsFileService _settingsFileService;
        private readonly IOptionsMonitor<SystemConfig> _configMonitor;
        private readonly IConfiguration _configuration;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ILogger<ClusterController> _logger;

        public ClusterController(
            ITelemetryStateService telemetryState,
            VirtualIpManagerService vipManager,
            NetworkTelemetry serverNetworkTelemetry,
            SettingsFileService settingsFileService,
            IOptionsMonitor<SystemConfig> configMonitor,
            IConfiguration configuration,
            IHttpClientFactory httpClientFactory,
            ILogger<ClusterController> logger)
        {
            _telemetryState = telemetryState;
            _vipManager = vipManager;
            _serverNetworkTelemetry = serverNetworkTelemetry;
            _settingsFileService = settingsFileService;
            _configMonitor = configMonitor;
            _configuration = configuration;
            _httpClientFactory = httpClientFactory;
            _logger = logger;
        }

        [HttpGet("overview")]
        [AllowAnonymous]
        public async Task<IActionResult> GetClusterOverview()
        {
            var config = _configMonitor.CurrentValue;
            var disc = config.Discovery ?? new DiscoverySettings();
            var mtx = config.MediaMtx ?? new MediaMtxSettings();
            var storage = config.Storage ?? new StorageSettings();

            using var currentProcess = Process.GetCurrentProcess();
            var uptime = DateTime.UtcNow - currentProcess.StartTime.ToUniversalTime();

            var hwSnapshot = HardwareProbe.GetTelemetrySnapshot();
            var netSnapshot = _serverNetworkTelemetry.GetMetricsSnapshot();

            var allAgents = _telemetryState.GetAllAgents().ToList();
            var onlineAgentsCount = allAgents.Count(a => (DateTime.UtcNow - a.Timestamp).TotalSeconds <= 15);
            var streamingAgentsCount = allAgents.Count(a => a.IsStreaming);

            // Determine Local IP addresses
            var localIps = GetLocalIpv4Addresses();

            // Storage capacity check
            double localFreeGb = 0;
            double localTotalGb = 0;
            try
            {
                if (!string.IsNullOrWhiteSpace(storage.LocalFallbackPath))
                {
                    var drivePath = Path.GetPathRoot(Path.GetFullPath(storage.LocalFallbackPath));
                    if (!string.IsNullOrEmpty(drivePath))
                    {
                        var drive = new DriveInfo(drivePath);
                        if (drive.IsReady)
                        {
                            localFreeGb = Math.Round((double)drive.AvailableFreeSpace / (1024 * 1024 * 1024), 1);
                            localTotalGb = Math.Round((double)drive.TotalSize / (1024 * 1024 * 1024), 1);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogDebug(ex, "Failed to retrieve local storage drive metrics");
            }

            bool netAppReachable = false;
            try
            {
                if (!string.IsNullOrWhiteSpace(storage.NetAppUncPath))
                {
                    netAppReachable = Directory.Exists(storage.NetAppUncPath);
                }
            }
            catch
            {
                netAppReachable = false;
            }

            // Encoder detection
            string detectedEncoder = "libx264";
            try
            {
                string ffmpegPath = _configuration["Extractor:FfmpegPath"] ?? "ffmpeg";
                detectedEncoder = await HardwareProbe.ResolveEncoderAsync(
                    ffmpegPath,
                    "auto"
                ).ConfigureAwait(false);
            }
            catch
            {
                detectedEncoder = "libx264";
            }

            // Partner status check (cached or fast check if configured)
            var partnerUrl = (disc.PartnerServerUrl ?? string.Empty).Trim();
            bool isPartnerConfigured = !string.IsNullOrWhiteSpace(partnerUrl);

            return Ok(new
            {
                LocalNode = new
                {
                    MachineName = Environment.MachineName,
                    Role = !string.IsNullOrWhiteSpace(disc.Role) ? disc.Role : "Primary",
                    Priority = disc.Priority > 0 ? disc.Priority : 1,
                    ServerDisplayName = disc.ServerDisplayName ?? "ITB Central Node",
                    ServiceName = disc.ServiceName ?? "ITB-SCREEN-RECORDER",
                    EnvironmentName = disc.EnvironmentName ?? "Production",
                    LocalIps = localIps,
                    UptimeSeconds = Math.Round(uptime.TotalSeconds, 0),
                    Ports = new
                    {
                        HttpPort = config.HttpPort > 0 ? config.HttpPort : 5090,
                        RtmpPort = mtx.RtmpPort > 0 ? mtx.RtmpPort : 19350,
                        ApiPort = mtx.ApiPort > 0 ? mtx.ApiPort : 9997,
                        HlsPort = mtx.HlsPort > 0 ? mtx.HlsPort : 8888,
                        DiscoveryPort = disc.Port > 0 ? disc.Port : 5098
                    },
                    VipStatus = new
                    {
                        EnableVirtualIp = disc.EnableVirtualIp,
                        VirtualIp = disc.VirtualIp ?? string.Empty,
                        SubnetMask = disc.VirtualIpSubnetMask ?? "255.255.255.0",
                        IsHoldingVip = _vipManager.IsHoldingVip,
                        ActiveInterface = _vipManager.ActiveInterfaceName ?? disc.NetworkInterfaceName ?? string.Empty,
                        LastTransitionUtc = _vipManager.LastVipTransitionUtc
                    }
                },
                PartnerNode = new
                {
                    IsConfigured = isPartnerConfigured,
                    PartnerUrl = partnerUrl,
                    FailedHealthChecks = _vipManager.FailedHealthChecks
                },
                Workload = new
                {
                    HostCpuPct = Math.Round(hwSnapshot.HostCpuUsagePct, 1),
                    ProcessCpuPct = Math.Round(hwSnapshot.ProcessCpuUsagePct, 1),
                    HostRamPct = Math.Round(hwSnapshot.HostRamUsagePct, 1),
                    ProcessRamMb = Math.Round(hwSnapshot.ProcessRamMb, 1),
                    HostTotalRamMb = Math.Round(hwSnapshot.HostTotalRamMb, 1),
                    Gpu3dPct = Math.Round(hwSnapshot.Gpu3dUsagePct, 1),
                    GpuNvencPct = Math.Round(hwSnapshot.GpuNvencUsagePct, 1),
                    DetectedEncoder = detectedEncoder,
                    ActiveStreams = streamingAgentsCount,
                    OnlineAgents = onlineAgentsCount,
                    TotalAgents = allAgents.Count,
                    NetworkTxMbps = Math.Round(netSnapshot.NicTotalTxMbps, 2),
                    NetworkRxMbps = Math.Round(netSnapshot.NicTotalRxMbps, 2),
                    NetworkLinkSpeedMbps = Math.Round(netSnapshot.NicLinkSpeedMbps, 2)
                },
                Storage = new
                {
                    NetAppUncPath = storage.NetAppUncPath,
                    IsNetAppReachable = netAppReachable,
                    LocalFallbackPath = storage.LocalFallbackPath,
                    LocalFreeSpaceGb = localFreeGb,
                    LocalTotalSpaceGb = localTotalGb
                },
                Discovery = new
                {
                    Enabled = disc.Enabled,
                    MulticastAddress = disc.MulticastAddress ?? "239.255.10.90",
                    Port = disc.Port > 0 ? disc.Port : 5098,
                    AutoFailoverDashboard = disc.AutoFailoverDashboard,
                    FailoverDelaySeconds = disc.DashboardFailoverDelaySeconds > 0 ? disc.DashboardFailoverDelaySeconds : 8
                }
            });
        }

        [HttpPost("ping-partner")]
        public async Task<IActionResult> PingPartnerNode([FromBody] PingPartnerRequest? request)
        {
            var targetUrl = request?.PartnerUrl?.Trim();
            if (string.IsNullOrWhiteSpace(targetUrl))
            {
                targetUrl = _configMonitor.CurrentValue.Discovery?.PartnerServerUrl?.Trim();
            }

            if (string.IsNullOrWhiteSpace(targetUrl))
            {
                return BadRequest(new { success = false, message = "No partner URL provided or configured." });
            }

            var sw = Stopwatch.StartNew();
            try
            {
                var client = _httpClientFactory.CreateClient();
                client.Timeout = TimeSpan.FromMilliseconds(3000);

                var normalizedUrl = targetUrl.TrimEnd('/');
                var probeUrl = $"{normalizedUrl}/api/v1/health";

                var response = await client.GetAsync(probeUrl).ConfigureAwait(false);
                sw.Stop();

                if (response.IsSuccessStatusCode)
                {
                    var body = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    return Ok(new
                    {
                        success = true,
                        latencyMs = sw.ElapsedMilliseconds,
                        statusCode = (int)response.StatusCode,
                        payload = body,
                        message = $"Partner responded in {sw.ElapsedMilliseconds} ms (HTTP {response.StatusCode})"
                    });
                }

                return Ok(new
                {
                    success = false,
                    latencyMs = sw.ElapsedMilliseconds,
                    statusCode = (int)response.StatusCode,
                    message = $"Partner returned status HTTP {response.StatusCode}"
                });
            }
            catch (Exception ex)
            {
                sw.Stop();
                return Ok(new
                {
                    success = false,
                    latencyMs = sw.ElapsedMilliseconds,
                    message = $"Ping to partner failed: {ex.Message}"
                });
            }
        }

        [HttpPost("scan-lan")]
        public async Task<IActionResult> ScanLanDiscovery()
        {
            var config = _configMonitor.CurrentValue.Discovery ?? new DiscoverySettings();
            int port = config.Port > 0 ? config.Port : 5098;
            string mcast = !string.IsNullOrWhiteSpace(config.MulticastAddress) ? config.MulticastAddress : "239.255.10.90";

            var discoveredNodes = new List<object>();

            try
            {
                using var udp = new UdpClient();
                udp.EnableBroadcast = true;
                udp.Client.ReceiveTimeout = 1200;

                var probeJson = JsonSerializer.Serialize(new
                {
                    magic = "ITB_DISCOVERY_PROBE",
                    timestampUtc = DateTime.UtcNow,
                    clientMachineName = Environment.MachineName
                });
                var probeBytes = Encoding.UTF8.GetBytes(probeJson);

                // Broadcast & Multicast
                try
                {
                    await udp.SendAsync(probeBytes, probeBytes.Length, "255.255.255.255", port).ConfigureAwait(false);
                }
                catch { }

                try
                {
                    await udp.SendAsync(probeBytes, probeBytes.Length, mcast, port).ConfigureAwait(false);
                }
                catch { }

                var cts = new CancellationTokenSource(1200);
                while (!cts.IsCancellationRequested)
                {
                    try
                    {
                        var result = await udp.ReceiveAsync(cts.Token).ConfigureAwait(false);
                        var responseText = Encoding.UTF8.GetString(result.Buffer);

                        if (responseText.Contains("ITB_DISCOVERY_RESPONSE"))
                        {
                            var parsed = JsonSerializer.Deserialize<JsonElement>(responseText);
                            discoveredNodes.Add(new
                            {
                                RemoteEndpoint = result.RemoteEndPoint.ToString(),
                                RemoteIp = result.RemoteEndPoint.Address.ToString(),
                                ServerId = parsed.TryGetProperty("serverId", out var sId) ? sId.GetString() : "Unknown",
                                ServerName = parsed.TryGetProperty("serverName", out var sName) ? sName.GetString() : "ITB Server",
                                Role = parsed.TryGetProperty("role", out var sRole) ? sRole.GetString() : "Primary",
                                Priority = parsed.TryGetProperty("priority", out var sPri) ? sPri.GetInt32() : 1,
                                Version = parsed.TryGetProperty("version", out var sVer) ? sVer.GetString() : "1.0",
                                VirtualIp = parsed.TryGetProperty("virtualIp", out var sVip) ? sVip.GetString() : "",
                                EnableVirtualIp = parsed.TryGetProperty("enableVirtualIp", out var sEnVip) && sEnVip.GetBoolean(),
                                ApiBaseUrl = parsed.TryGetProperty("apiBaseUrl", out var sApi) ? sApi.GetString() : "",
                                ServerIps = parsed.TryGetProperty("serverIps", out var sIps) ? sIps.EnumerateArray().Select(x => x.GetString()).ToList() : new List<string?>()
                            });
                        }
                    }
                    catch (OperationCanceledException)
                    {
                        break;
                    }
                    catch
                    {
                        break;
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "LAN Discovery probe failed");
            }

            return Ok(new
            {
                scannedPort = port,
                scannedMulticast = mcast,
                nodesCount = discoveredNodes.Count,
                nodes = discoveredNodes
            });
        }

        [HttpPost("vip/takeover")]
        public async Task<IActionResult> TakeoverVirtualIp()
        {
            _logger.LogInformation("[CLUSTER CONTROLLER] Operator requested manual VIP TAKEOVER.");
            bool acquired = await _vipManager.ForceAcquireVipAsync().ConfigureAwait(false);
            return Ok(new
            {
                success = acquired,
                isHoldingVip = _vipManager.IsHoldingVip,
                message = acquired ? "Virtual IP successfully bound to this node." : "Failed to bind Virtual IP. Check network interface permissions."
            });
        }

        [HttpPost("vip/release")]
        public async Task<IActionResult> ReleaseVirtualIp()
        {
            _logger.LogInformation("[CLUSTER CONTROLLER] Operator requested manual VIP RELEASE.");
            bool released = await _vipManager.ForceReleaseVipAsync().ConfigureAwait(false);
            return Ok(new
            {
                success = released,
                isHoldingVip = _vipManager.IsHoldingVip,
                message = released ? "Virtual IP released from this node." : "Failed to release Virtual IP."
            });
        }

        [HttpPost("update-config")]
        public async Task<IActionResult> UpdateClusterConfig([FromBody] ClusterConfigUpdateDto dto)
        {
            if (dto == null) return BadRequest("Invalid payload.");

            try
            {
                var existing = await _settingsFileService.ReadAsync().ConfigureAwait(false);
                var disc = existing.Discovery ?? new DiscoverySettingsDto();

                if (!string.IsNullOrWhiteSpace(dto.Role)) disc.Role = dto.Role.Trim();
                if (dto.Priority.HasValue) disc.Priority = dto.Priority.Value;
                if (dto.PartnerServerUrl != null) disc.PartnerServerUrl = dto.PartnerServerUrl.Trim();
                if (dto.EnableVirtualIp.HasValue) disc.EnableVirtualIp = dto.EnableVirtualIp.Value;
                if (dto.VirtualIp != null) disc.VirtualIp = dto.VirtualIp.Trim();
                if (dto.VirtualIpSubnetMask != null) disc.VirtualIpSubnetMask = dto.VirtualIpSubnetMask.Trim();
                if (dto.NetworkInterfaceName != null) disc.NetworkInterfaceName = dto.NetworkInterfaceName.Trim();
                if (dto.AutoFailoverDashboard.HasValue) disc.AutoFailoverDashboard = dto.AutoFailoverDashboard.Value;
                if (dto.DashboardFailoverDelaySeconds.HasValue) disc.DashboardFailoverDelaySeconds = dto.DashboardFailoverDelaySeconds.Value;

                existing.Discovery = disc;
                await _settingsFileService.WriteAsync(existing).ConfigureAwait(false);

                return Ok(new { success = true, message = "Cluster configuration updated and persisted." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to update cluster configuration.");
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        private static List<string> GetLocalIpv4Addresses()
        {
            var ips = new List<string>();
            try
            {
                foreach (var iface in NetworkInterface.GetAllNetworkInterfaces())
                {
                    if (iface.OperationalStatus != OperationalStatus.Up || iface.NetworkInterfaceType == NetworkInterfaceType.Loopback)
                        continue;

                    var ipProps = iface.GetIPProperties();
                    foreach (var addr in ipProps.UnicastAddresses)
                    {
                        if (addr.Address.AddressFamily == AddressFamily.InterNetwork && !IPAddress.IsLoopback(addr.Address))
                        {
                            ips.Add(addr.Address.ToString());
                        }
                    }
                }
            }
            catch { }
            return ips.Distinct().ToList();
        }
    }

    public class PingPartnerRequest
    {
        public string? PartnerUrl { get; set; }
    }

    public class ClusterConfigUpdateDto
    {
        public string? Role { get; set; }
        public int? Priority { get; set; }
        public string? PartnerServerUrl { get; set; }
        public bool? EnableVirtualIp { get; set; }
        public string? VirtualIp { get; set; }
        public string? VirtualIpSubnetMask { get; set; }
        public string? NetworkInterfaceName { get; set; }
        public bool? AutoFailoverDashboard { get; set; }
        public int? DashboardFailoverDelaySeconds { get; set; }
    }
}
