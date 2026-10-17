// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Services/Network/ClusterMeshService.cs
// ==========================================
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Core.Diagnostics;
using ITB_SCREEN_RECORDER.Server.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace ITB_SCREEN_RECORDER.Server.Services.Network
{
    /// <summary>
    /// Autonomous Peer-to-Peer Cluster Mesh Service.
    /// Manages zero-configuration auto-discovery of cluster nodes, maintains live peer health,
    /// coordinates deterministic Virtual IP leadership, and provides Active-Active workload balancing
    /// weighted by hardware acceleration (GPU NVENC vs Intel QSV vs CPU).
    /// </summary>
    public class ClusterMeshService : BackgroundService
    {
        private readonly IOptionsMonitor<SystemConfig> _configMonitor;
        private readonly ITelemetryStateService _telemetryState;
        private readonly NetworkTelemetry _serverNetworkTelemetry;
        private readonly IConfiguration _configuration;
        private readonly ILogger<ClusterMeshService> _logger;

        private readonly string _localNodeId;
        private readonly ConcurrentDictionary<string, ClusterNodeInfo> _peers = new(StringComparer.OrdinalIgnoreCase);

        // Cached encoder & capacity weight
        private string _resolvedEncoder = "libx264";
        private double _cachedCapacityWeight = 1.0;
        private bool _isHoldingVip = false;

        public ClusterMeshService(
            IOptionsMonitor<SystemConfig> configMonitor,
            ITelemetryStateService telemetryState,
            NetworkTelemetry serverNetworkTelemetry,
            IConfiguration configuration,
            ILogger<ClusterMeshService> logger)
        {
            _configMonitor = configMonitor;
            _telemetryState = telemetryState;
            _serverNetworkTelemetry = serverNetworkTelemetry;
            _configuration = configuration;
            _logger = logger;

            _localNodeId = $"SRV-{Environment.MachineName}-{Guid.NewGuid().ToString("N")[..8]}";
        }

        public string LocalNodeId => _localNodeId;
        public bool IsHoldingVip => _isHoldingVip;
        public void SetHoldingVip(bool holding) => _isHoldingVip = holding;

        public bool IsStandalone => GetActivePeerCount() == 0;
        public int TotalActiveNodes => 1 + GetActivePeerCount();

        public int GetActivePeerCount()
        {
            var cutoff = DateTime.UtcNow.AddSeconds(-ClusterMeshConstants.DefaultNodeOfflineTimeoutSeconds);
            return _peers.Values.Count(p => p.LastSeenUtc >= cutoff && p.Status != "Offline");
        }

        public IReadOnlyList<ClusterNodeInfo> GetAllNodes()
        {
            var nodes = new List<ClusterNodeInfo>();
            nodes.Add(BuildLocalNodeInfo());

            var cutoff = DateTime.UtcNow.AddSeconds(-ClusterMeshConstants.DefaultNodeOfflineTimeoutSeconds);
            foreach (var peer in _peers.Values)
            {
                if (peer.LastSeenUtc >= cutoff)
                {
                    nodes.Add(peer);
                }
            }

            return nodes.OrderBy(n => n.Priority).ThenBy(n => n.MachineName).ToList();
        }

        public ClusterNodeInfo GetOptimalNodeForWorkload()
        {
            var all = GetAllNodes().Where(n => n.Status != "Offline").ToList();
            if (all.Count == 0) return BuildLocalNodeInfo();

            // Active-Active: Select the healthy node with the lowest normalized load score!
            // In case of a tie, select the node with the higher hardware capacity weight.
            return all
                .OrderBy(n => n.Workload.NormalizedLoadScore)
                .ThenByDescending(n => n.Hardware.CapacityWeight)
                .ThenBy(n => n.Priority)
                .First();
        }

        public bool ShouldLocalNodeHoldVip()
        {
            var config = _configMonitor.CurrentValue.Discovery ?? new DiscoverySettings();
            if (!config.EnableVirtualIp || string.IsNullOrWhiteSpace(config.VirtualIp))
            {
                return false;
            }

            var activeNodes = GetAllNodes().Where(n => n.Status != "Offline").ToList();
            if (activeNodes.Count <= 1)
            {
                // Autonomous single-node mode: Local node naturally holds the VIP
                return true;
            }

            // Multi-node Active-Active election:
            // Lowest priority number wins (1 is highest priority).
            // Tie-break: lowest alphabetical MachineName (deterministic across all nodes).
            var electedLeader = activeNodes
                .OrderBy(n => n.Priority)
                .ThenBy(n => n.MachineName, StringComparer.OrdinalIgnoreCase)
                .First();

            return electedLeader.IsLocal;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("[CLUSTER MESH] Initializing autonomous cluster mesh engine (Node ID: {NodeId})...", _localNodeId);

            // 1. Initial encoder detection
            try
            {
                string ffmpegPath = _configuration["Extractor:FfmpegPath"] ?? "ffmpeg";
                _resolvedEncoder = await HardwareProbe.ResolveEncoderAsync(ffmpegPath, "auto").ConfigureAwait(false);
                _cachedCapacityWeight = NodeHardwareProfile.CalculateCapacityWeight(_resolvedEncoder, Environment.ProcessorCount);
                _logger.LogInformation("[CLUSTER MESH] Detected video encoder: {Encoder} (Capacity Weight: {Weight}x)",
                    _resolvedEncoder, _cachedCapacityWeight);
            }
            catch (Exception ex)
            {
                _logger.LogDebug(ex, "[CLUSTER MESH] Hardware encoder probe fallback to CPU");
                _resolvedEncoder = "libx264";
                _cachedCapacityWeight = 1.0;
            }

            // 2. Launch listener and broadcaster concurrently
            var listenerTask = RunListenerLoopAsync(stoppingToken);
            var broadcasterTask = RunBroadcasterLoopAsync(stoppingToken);
            var sweeperTask = RunSweeperLoopAsync(stoppingToken);

            await Task.WhenAll(listenerTask, broadcasterTask, sweeperTask).ConfigureAwait(false);
        }

        private async Task RunBroadcasterLoopAsync(CancellationToken ct)
        {
            using var udpSender = new UdpClient();
            udpSender.EnableBroadcast = true;

            try
            {
                udpSender.Client.SetSocketOption(SocketOptionLevel.IP, SocketOptionName.MulticastTimeToLive, 4);
            }
            catch { }

            while (!ct.IsCancellationRequested)
            {
                try
                {
                    var config = _configMonitor.CurrentValue;
                    var disc = config.Discovery ?? new DiscoverySettings();

                    if (disc.Enabled)
                    {
                        int port = disc.Port > 0 ? disc.Port : ServerDiscoveryConstants.DefaultDiscoveryPort;
                        string mcast = !string.IsNullOrWhiteSpace(disc.MulticastAddress)
                            ? disc.MulticastAddress
                            : ServerDiscoveryConstants.DefaultMulticastAddress;

                        var beacon = BuildLocalBeacon(disc, config);
                        byte[] beaconBytes = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(beacon));

                        // Send Multicast
                        try
                        {
                            var mcastEp = new IPEndPoint(IPAddress.Parse(mcast), port);
                            await udpSender.SendAsync(beaconBytes, beaconBytes.Length, mcastEp).ConfigureAwait(false);
                        }
                        catch { }

                        // Send Broadcast fallback
                        try
                        {
                            var bcastEp = new IPEndPoint(IPAddress.Broadcast, port);
                            await udpSender.SendAsync(beaconBytes, beaconBytes.Length, bcastEp).ConfigureAwait(false);
                        }
                        catch { }
                    }
                }
                catch (OperationCanceledException)
                {
                    break;
                }
                catch (Exception ex)
                {
                    _logger.LogDebug(ex, "[CLUSTER MESH] Error broadcasting cluster node beacon");
                }

                await Task.Delay(TimeSpan.FromSeconds(ClusterMeshConstants.DefaultBeaconIntervalSeconds), ct).ConfigureAwait(false);
            }
        }

        private async Task RunListenerLoopAsync(CancellationToken ct)
        {
            while (!ct.IsCancellationRequested)
            {
                UdpClient? udpListener = null;
                try
                {
                    var config = _configMonitor.CurrentValue.Discovery ?? new DiscoverySettings();
                    int port = config.Port > 0 ? config.Port : ServerDiscoveryConstants.DefaultDiscoveryPort;
                    string mcast = !string.IsNullOrWhiteSpace(config.MulticastAddress)
                        ? config.MulticastAddress
                        : ServerDiscoveryConstants.DefaultMulticastAddress;

                    udpListener = new UdpClient();
                    udpListener.Client.SetSocketOption(SocketOptionLevel.Socket, SocketOptionName.ReuseAddress, true);
                    udpListener.Client.Bind(new IPEndPoint(IPAddress.Any, port));

                    try
                    {
                        udpListener.JoinMulticastGroup(IPAddress.Parse(mcast));
                    }
                    catch { }

                    while (!ct.IsCancellationRequested)
                    {
                        var result = await udpListener.ReceiveAsync(ct).ConfigureAwait(false);
                        ProcessIncomingPacket(result);
                    }
                }
                catch (OperationCanceledException)
                {
                    break;
                }
                catch (Exception ex)
                {
                    _logger.LogDebug(ex, "[CLUSTER MESH] Listener socket restarted after transient error.");
                    await Task.Delay(3000, ct).ConfigureAwait(false);
                }
                finally
                {
                    try { udpListener?.Close(); udpListener?.Dispose(); } catch { }
                }
            }
        }

        private void ProcessIncomingPacket(UdpReceiveResult result)
        {
            try
            {
                string text = Encoding.UTF8.GetString(result.Buffer);
                if (!text.Contains(ClusterMeshConstants.BeaconMagic))
                {
                    return; // Ignore client probes or foreign packets
                }

                var beacon = JsonSerializer.Deserialize<ClusterNodeBeacon>(text, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (beacon == null || string.IsNullOrWhiteSpace(beacon.NodeId)) return;

                // Ignore our own beacon
                if (string.Equals(beacon.NodeId, _localNodeId, StringComparison.OrdinalIgnoreCase)) return;

                // Enrich with actual remote IP if needed
                string remoteIp = result.RemoteEndPoint.Address.ToString();
                if (!beacon.ServerIps.Contains(remoteIp))
                {
                    beacon.ServerIps.Insert(0, remoteIp);
                }

                if (string.IsNullOrWhiteSpace(beacon.ApiBaseUrl) || beacon.ApiBaseUrl.Contains("127.0.0.1") || beacon.ApiBaseUrl.Contains("localhost"))
                {
                    beacon.ApiBaseUrl = $"https://{remoteIp}:{beacon.HttpPort}";
                }

                bool isNew = !_peers.ContainsKey(beacon.NodeId);
                var nodeInfo = new ClusterNodeInfo
                {
                    NodeId = beacon.NodeId,
                    MachineName = beacon.MachineName,
                    ServerDisplayName = beacon.ServerDisplayName,
                    ApiBaseUrl = beacon.ApiBaseUrl,
                    RtmpBaseUrl = beacon.RtmpBaseUrl,
                    ServerIps = beacon.ServerIps,
                    HttpPort = beacon.HttpPort,
                    RtmpPort = beacon.RtmpPort,
                    Role = beacon.Role,
                    Priority = beacon.Priority,
                    IsHoldingVip = beacon.IsHoldingVip,
                    EnableVirtualIp = beacon.EnableVirtualIp,
                    VirtualIp = beacon.VirtualIp,
                    IsLocal = false,
                    LastSeenUtc = DateTime.UtcNow,
                    Status = "Healthy",
                    Hardware = beacon.Hardware ?? new NodeHardwareProfile(),
                    Workload = beacon.Workload ?? new NodeWorkloadMetrics()
                };

                _peers.AddOrUpdate(beacon.NodeId, nodeInfo, (_, existing) =>
                {
                    nodeInfo.LatencyMs = existing.LatencyMs;
                    return nodeInfo;
                });

                if (isNew)
                {
                    _logger.LogInformation("[CLUSTER MESH] Discovered new cluster node: '{MachineName}' at {ApiBaseUrl} (Role: {Role}, Capacity: {Weight}x). Cluster mesh expanded to {Count} active nodes.",
                        beacon.MachineName, beacon.ApiBaseUrl, beacon.Role, nodeInfo.Hardware.CapacityWeight, TotalActiveNodes);
                }
            }
            catch (Exception ex)
            {
                _logger.LogDebug(ex, "[CLUSTER MESH] Error parsing incoming beacon packet");
            }
        }

        private async Task RunSweeperLoopAsync(CancellationToken ct)
        {
            while (!ct.IsCancellationRequested)
            {
                try
                {
                    var now = DateTime.UtcNow;
                    foreach (var kvp in _peers)
                    {
                        var peer = kvp.Value;
                        double elapsed = (now - peer.LastSeenUtc).TotalSeconds;

                        if (elapsed > ClusterMeshConstants.DefaultNodeOfflineTimeoutSeconds)
                        {
                            if (peer.Status != "Offline")
                            {
                                peer.Status = "Offline";
                                _logger.LogWarning("[CLUSTER MESH] Cluster peer '{MachineName}' marked OFFLINE (No heartbeat for {Sec}s).",
                                    peer.MachineName, Math.Round(elapsed, 1));
                            }
                        }
                        else if (elapsed > ClusterMeshConstants.DefaultNodeDegradedTimeoutSeconds)
                        {
                            if (peer.Status == "Healthy")
                            {
                                peer.Status = "Degraded";
                                _logger.LogWarning("[CLUSTER MESH] Cluster peer '{MachineName}' marked DEGRADED (Missed beacons, elapsed: {Sec}s).",
                                    peer.MachineName, Math.Round(elapsed, 1));
                            }
                        }
                        else
                        {
                            peer.Status = "Healthy";
                        }
                    }
                }
                catch (OperationCanceledException)
                {
                    break;
                }
                catch { }

                await Task.Delay(3000, ct).ConfigureAwait(false);
            }
        }

        private ClusterNodeInfo BuildLocalNodeInfo()
        {
            var config = _configMonitor.CurrentValue;
            var disc = config.Discovery ?? new DiscoverySettings();
            var mtx = config.MediaMtx ?? new MediaMtxSettings();

            var hw = HardwareProbe.GetTelemetrySnapshot();
            var allAgents = _telemetryState.GetAllAgents().ToList();
            int online = allAgents.Count(a => (DateTime.UtcNow - a.Timestamp).TotalSeconds <= 15);
            int streaming = allAgents.Count(a => a.IsStreaming);

            int httpPort = config.HttpPort > 0 ? config.HttpPort : 5090;
            int rtmpPort = mtx.RtmpPort > 0 ? mtx.RtmpPort : 19350;

            var localIps = GetLocalIpv4Addresses();
            string primaryIp = localIps.FirstOrDefault() ?? "127.0.0.1";

            double loadScore = NodeWorkloadMetrics.ComputeLoadScore(
                hw.HostCpuUsagePct,
                hw.HostRamUsagePct,
                hw.GpuNvencUsagePct,
                streaming,
                _cachedCapacityWeight
            );

            return new ClusterNodeInfo
            {
                NodeId = _localNodeId,
                MachineName = Environment.MachineName,
                ServerDisplayName = disc.ServerDisplayName ?? "ITB Central Node",
                ApiBaseUrl = $"https://{primaryIp}:{httpPort}",
                RtmpBaseUrl = $"rtmps://{primaryIp}:{rtmpPort}/live",
                ServerIps = localIps,
                HttpPort = httpPort,
                RtmpPort = rtmpPort,
                Role = !string.IsNullOrWhiteSpace(disc.Role) ? disc.Role : ClusterMeshConstants.ModeActiveActive,
                Priority = disc.Priority > 0 ? disc.Priority : 1,
                IsHoldingVip = _isHoldingVip,
                EnableVirtualIp = disc.EnableVirtualIp,
                VirtualIp = disc.VirtualIp,
                IsLocal = true,
                LastSeenUtc = DateTime.UtcNow,
                Status = "Healthy",
                LatencyMs = 0,
                Hardware = new NodeHardwareProfile
                {
                    CpuCores = Environment.ProcessorCount,
                    TotalRamMb = Math.Round(hw.HostTotalRamMb, 0),
                    DetectedEncoder = _resolvedEncoder,
                    GpuName = _resolvedEncoder.Contains("nvenc") ? "NVIDIA Dedicated GPU" : (_resolvedEncoder.Contains("qsv") ? "Intel QuickSync" : "Host CPU"),
                    CapacityWeight = _cachedCapacityWeight
                },
                Workload = new NodeWorkloadMetrics
                {
                    HostCpuPct = Math.Round(hw.HostCpuUsagePct, 1),
                    ProcessCpuPct = Math.Round(hw.ProcessCpuUsagePct, 1),
                    HostRamPct = Math.Round(hw.HostRamUsagePct, 1),
                    ProcessRamMb = Math.Round(hw.ProcessRamMb, 1),
                    GpuNvencPct = Math.Round(hw.GpuNvencUsagePct, 1),
                    ActiveStreams = streaming,
                    OnlineAgents = online,
                    TotalAgents = allAgents.Count,
                    NormalizedLoadScore = loadScore
                }
            };
        }

        private ClusterNodeBeacon BuildLocalBeacon(DiscoverySettings disc, SystemConfig config)
        {
            var info = BuildLocalNodeInfo();
            return new ClusterNodeBeacon
            {
                NodeId = info.NodeId,
                MachineName = info.MachineName,
                ServerDisplayName = info.ServerDisplayName,
                ApiBaseUrl = info.ApiBaseUrl,
                RtmpBaseUrl = info.RtmpBaseUrl,
                ServerIps = info.ServerIps,
                HttpPort = info.HttpPort,
                RtmpPort = info.RtmpPort,
                Role = info.Role,
                Priority = info.Priority,
                IsHoldingVip = info.IsHoldingVip,
                EnableVirtualIp = info.EnableVirtualIp,
                VirtualIp = info.VirtualIp,
                Hardware = info.Hardware,
                Workload = info.Workload,
                TimestampUtc = DateTime.UtcNow
            };
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
}
