// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Services/Network/ClusterService.cs
// ==========================================
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Contracts.Jobs;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Core.Diagnostics;
using ITB_SCREEN_RECORDER.Server.Services;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace ITB_SCREEN_RECORDER.Server.Services.Network
{
    public class ClusterService : BackgroundService, IClusterService
    {
        private readonly IOptionsMonitor<SystemConfig> _configMonitor;
        private readonly IVirtualIpManager _vipManager;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ILogger<ClusterService> _logger;
        private readonly ITelemetryStateService? _telemetryState;
        private readonly TelemetryBroadcastService? _broadcastService;
        private readonly NetworkTelemetry? _networkTelemetry;
        private readonly DateTime _startTimeUtc = DateTime.UtcNow;

        private ClusterNodeState _state = ClusterNodeState.Standalone;
        private int _failoverCount = 0;
        private DateTime? _lastHeartbeatUtc;
        private string _partnerStatus = "Unknown";
        private bool _partnerIsVipOwner = false;
        private int _consecutiveMissedHeartbeats = 0;
        private readonly SemaphoreSlim _transitionLock = new(1, 1);

        // Active-Active Distributed Compute Grid
        private readonly ConcurrentDictionary<string, ClusterNodeDescriptor> _clusterNodes = new(StringComparer.OrdinalIgnoreCase);
        private readonly ConcurrentDictionary<string, string> _stationToNodeMap = new(StringComparer.OrdinalIgnoreCase);
        private readonly ConcurrentDictionary<string, ClusterJobStatusDto> _clusterJobs = new(StringComparer.OrdinalIgnoreCase);
        private readonly ConcurrentDictionary<string, AgentTelemetryReport> _remoteStationTelemetry = new(StringComparer.OrdinalIgnoreCase);
        private readonly ConcurrentDictionary<string, bool> _clusterDesiredStreamPolicies = new(StringComparer.OrdinalIgnoreCase);
        private string _orchestratorNodeId = string.Empty;
        private readonly IServiceProvider? _serviceProvider;

        public ClusterService(
            IOptionsMonitor<SystemConfig> configMonitor,
            IVirtualIpManager vipManager,
            IHttpClientFactory httpClientFactory,
            IHostApplicationLifetime appLifetime,
            ILogger<ClusterService> logger,
            ITelemetryStateService? telemetryState = null,
            TelemetryBroadcastService? broadcastService = null,
            NetworkTelemetry? networkTelemetry = null,
            IServiceProvider? serviceProvider = null)
        {
            _configMonitor = configMonitor;
            _vipManager = vipManager;
            _httpClientFactory = httpClientFactory;
            _logger = logger;
            _telemetryState = telemetryState;
            _broadcastService = broadcastService;
            _networkTelemetry = networkTelemetry;
            _serviceProvider = serviceProvider;

            var config = _configMonitor.CurrentValue;
            var disc = config?.Discovery ?? new DiscoverySettings();

            if (disc.Role == ServerDiscoveryConstants.RoleStandalone)
            {
                _state = ClusterNodeState.Standalone;
            }
            else if (string.Equals(disc.Role, ServerDiscoveryConstants.RoleActiveStandby, StringComparison.OrdinalIgnoreCase) &&
                     (string.Equals(disc.NodeRole, ServerDiscoveryConstants.RoleSecondary, StringComparison.OrdinalIgnoreCase) ||
                      string.Equals(disc.NodeRole, "Standby", StringComparison.OrdinalIgnoreCase)))
            {
                _state = ClusterNodeState.Standby;
            }
            else
            {
                _state = ClusterNodeState.Active;
            }

            // Initialize Active-Active local node registration
            RegisterLocalNodeInRegistry();

            appLifetime.ApplicationStopping.Register(() =>
            {
                try
                {
                    _logger.LogWarning("[CLUSTER] Server is stopping. Surrendering Virtual IP leadership if active...");
                    CedeLeadershipAsync(CancellationToken.None).GetAwaiter().GetResult();
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "[CLUSTER] Error during shutdown VIP surrender");
                }
            });
        }

        private void RegisterLocalNodeInRegistry()
        {
            var config = _configMonitor.CurrentValue;
            var disc = config?.Discovery ?? new DiscoverySettings();
            string localId = Environment.MachineName;

            bool isOrchestrator = !string.IsNullOrEmpty(_orchestratorNodeId)
                ? string.Equals(_orchestratorNodeId, localId, StringComparison.OrdinalIgnoreCase)
                : (string.Equals(disc.NodeRole, ServerDiscoveryConstants.RoleOrchestrator, StringComparison.OrdinalIgnoreCase) ||
                   string.Equals(disc.NodeRole, ServerDiscoveryConstants.RolePrimary, StringComparison.OrdinalIgnoreCase));

            int httpPort = config?.HttpPort > 0 ? config.HttpPort : 5090;
            int rtmpPort = config?.MediaMtx?.RtmpPort > 0 ? config.MediaMtx.RtmpPort : 19350;
            int hlsPort = config?.MediaMtx?.HlsPort > 0 ? config.MediaMtx.HlsPort : 8888;

            string cleanVip = disc.VirtualIp?.Trim() ?? string.Empty;
            bool isVipBound = !string.IsNullOrWhiteSpace(cleanVip) &&
                              _vipManager.IsVirtualIpBoundLocallyAsync(cleanVip).GetAwaiter().GetResult();

            var telemetry = HardwareProbe.GetTelemetrySnapshot();
            var detectedGpus = HardwareProbe.GetDetectedGpus();
            string gpuModel = detectedGpus.Count > 0 ? detectedGpus[0].Name : "CPU Software";
            string configuredEncoder = detectedGpus.Any(g => g.Name.Contains("NVIDIA", StringComparison.OrdinalIgnoreCase)) ? "h264_nvenc" :
                                      (detectedGpus.Any(g => g.Name.Contains("Intel", StringComparison.OrdinalIgnoreCase)) ? "h264_qsv" :
                                      (detectedGpus.Any(g => g.Name.Contains("AMD", StringComparison.OrdinalIgnoreCase)) ? "h264_amf" : "libx264"));
            double totalRamGb = telemetry.HostTotalRamMb > 0 ? Math.Round(telemetry.HostTotalRamMb / 1024.0, 1) : 8.0;
            int cpuCores = Environment.ProcessorCount;
            int hwScore = ClusterBeaconPacket.CalculateHardwareCapabilityScore(cpuCores, totalRamGb, configuredEncoder, gpuModel);
            var (hwStreamsCap, hwJobsCap) = ClusterBeaconPacket.CalculateHardwareCapacities(cpuCores, totalRamGb, configuredEncoder, gpuModel);
            int effectiveCap = disc.MaxIngestStreamsCapacity > 0 ? disc.MaxIngestStreamsCapacity : hwStreamsCap;
            int effectiveJobs = disc.MaxConcurrentRenderJobs > 0 ? disc.MaxConcurrentRenderJobs : hwJobsCap;

            var localNode = new ClusterNodeDescriptor
            {
                NodeId = localId,
                DisplayName = !string.IsNullOrWhiteSpace(disc.ServerDisplayName) ? disc.ServerDisplayName : localId,
                ApiBaseUrl = $"http://{localId.ToLowerInvariant()}:{httpPort}",
                RtmpBaseUrl = $"rtmps://{localId.ToLowerInvariant()}:{rtmpPort}/live",
                HlsBaseUrl = $"http://{localId.ToLowerInvariant()}:{hlsPort}/live",
                WhepPort = 8889,
                Role = isOrchestrator ? ServerDiscoveryConstants.RoleOrchestrator : ServerDiscoveryConstants.RoleWorker,
                NodeMode = !string.IsNullOrWhiteSpace(disc.NodeMode) ? disc.NodeMode : ServerDiscoveryConstants.NodeModeActive,
                State = _state.ToString(),
                Priority = disc.Priority,
                MaxStreamsCapacity = effectiveCap,
                EffectiveStreamsCapacity = effectiveCap,
                RecommendedStreamsCapacity = hwStreamsCap,
                MaxConcurrentJobs = effectiveJobs,
                RecommendedConcurrentJobs = hwJobsCap,
                ActiveJobsCount = GetActiveJobsCount(),
                HostCpuPct = telemetry.HostCpuUsagePct,
                HostRamPct = telemetry.HostRamUsagePct,
                GpuNvencPct = telemetry.GpuNvencUsagePct,
                ProcessRamMb = telemetry.ProcessRamMb,
                NicTotalTxMbps = _networkTelemetry?.GetMetricsSnapshot()?.NicTotalTxMbps ?? 0,
                NicTotalRxMbps = _networkTelemetry?.GetMetricsSnapshot()?.NicTotalRxMbps ?? 0,
                LinkSpeedMbps = _networkTelemetry?.GetMetricsSnapshot()?.NicLinkSpeedMbps > 0 ? _networkTelemetry.GetMetricsSnapshot().NicLinkSpeedMbps : 1000,
                CpuCores = cpuCores,
                TotalRamGb = totalRamGb,
                GpuModel = gpuModel,
                EncoderType = configuredEncoder,
                HardwareCapabilityScore = hwScore,
                OsPlatform = OperatingSystem.IsWindows() ? "Windows" : (OperatingSystem.IsLinux() ? "Linux" : "Other"),
                OsDescription = System.Runtime.InteropServices.RuntimeInformation.OSDescription,
                LocalIps = ServerDiscoveryHostedService.GetActiveLocalIps(),
                IsVipBound = isVipBound,
                LastSeenUtc = DateTime.UtcNow
            };

            if (_telemetryState != null)
            {
                var localAgents = _telemetryState.GetAllAgents();
                localNode.ActiveStreamsCount = localAgents.Count(a => a.IsStreaming);
                localNode.AssignedStations = localAgents.Select(a => a.Hostname).ToList();
                foreach (var station in localNode.AssignedStations)
                {
                    _stationToNodeMap[station] = localId;
                }
            }

            localNode.IngestPressureScore = CalculateIngestPressure(localNode);
            localNode.ComputeFitnessScore = CalculateComputeFitness(localNode);

            _clusterNodes[localId] = localNode;
            if (isOrchestrator && string.IsNullOrEmpty(_orchestratorNodeId))
            {
                _orchestratorNodeId = localId;
            }
        }

        public ClusterStatusDto GetClusterStatus()
        {
            var config = _configMonitor.CurrentValue;
            var disc = config.Discovery ?? new DiscoverySettings();

            string cleanVip = disc.VirtualIp?.Trim() ?? string.Empty;
            bool isVipBound = !string.IsNullOrWhiteSpace(cleanVip) &&
                              _vipManager.IsVirtualIpBoundLocallyAsync(cleanVip).GetAwaiter().GetResult();

            return new ClusterStatusDto
            {
                LocalNodeId = Environment.MachineName,
                ServerDisplayName = disc.ServerDisplayName,
                ClusterMode = disc.Role,
                NodeRole = disc.NodeRole,
                State = _state.ToString(),
                Priority = disc.Priority,
                EnableVirtualIp = disc.EnableVirtualIp,
                VirtualIp = disc.VirtualIp,
                VirtualIpSubnetMask = disc.VirtualIpSubnetMask,
                IsVipBoundLocally = isVipBound,
                NetworkInterface = _vipManager.ResolveActiveInterfaceName(disc.NetworkInterfaceName),
                PartnerServerUrl = disc.PartnerServerUrl,
                PartnerStatus = _partnerStatus,
                LastHeartbeatUtc = _lastHeartbeatUtc,
                FailoverCount = _failoverCount,
                UptimeSeconds = (DateTime.UtcNow - _startTimeUtc).TotalSeconds,
                PreemptLowerPriority = disc.PreemptLowerPriority
            };
        }

        public ClusterPartnerHealthDto GetPartnerHealthDto()
        {
            var config = _configMonitor.CurrentValue;
            var disc = config.Discovery ?? new DiscoverySettings();

            string cleanVip = disc.VirtualIp?.Trim() ?? string.Empty;
            bool isVipBound = !string.IsNullOrWhiteSpace(cleanVip) &&
                              _vipManager.IsVirtualIpBoundLocallyAsync(cleanVip).GetAwaiter().GetResult();

            return new ClusterPartnerHealthDto
            {
                NodeId = Environment.MachineName,
                ClusterMode = disc.Role,
                NodeRole = disc.NodeRole,
                State = _state.ToString(),
                Priority = disc.Priority,
                IsVipOwner = isVipBound || _state == ClusterNodeState.Active,
                TimestampUtc = DateTime.UtcNow
            };
        }

        public ClusterGridStatusDto GetClusterGridStatus()
        {
            var config = _configMonitor.CurrentValue;
            var disc = config?.Discovery ?? new DiscoverySettings();
            string localId = Environment.MachineName;

            RegisterLocalNodeInRegistry();

            var nodesList = _clusterNodes.Values.ToList();
            foreach (var node in nodesList)
            {
                node.IngestPressureScore = CalculateIngestPressure(node);
                node.ComputeFitnessScore = CalculateComputeFitness(node);
            }
            bool isLocalOrch = !string.IsNullOrEmpty(_orchestratorNodeId)
                ? string.Equals(_orchestratorNodeId, localId, StringComparison.OrdinalIgnoreCase)
                : (string.Equals(disc.NodeRole, ServerDiscoveryConstants.RoleOrchestrator, StringComparison.OrdinalIgnoreCase) ||
                   string.Equals(disc.NodeRole, ServerDiscoveryConstants.RolePrimary, StringComparison.OrdinalIgnoreCase));

            string cleanVip = disc.VirtualIp?.Trim() ?? string.Empty;
            bool isVipBound = !string.IsNullOrWhiteSpace(cleanVip) &&
                              _vipManager.IsVirtualIpBoundLocallyAsync(cleanVip).GetAwaiter().GetResult();

            var onlineNodes = nodesList.Where(n => n.IsOnline).ToList();
            int activeNodes = onlineNodes.Count(n => string.Equals(n.NodeMode, ServerDiscoveryConstants.NodeModeActive, StringComparison.OrdinalIgnoreCase) ||
                                                     string.Equals(n.Role, ServerDiscoveryConstants.RoleOrchestrator, StringComparison.OrdinalIgnoreCase));
            int standbyNodes = onlineNodes.Count(n => string.Equals(n.NodeMode, ServerDiscoveryConstants.NodeModeStandby, StringComparison.OrdinalIgnoreCase) ||
                                                      string.Equals(n.Role, ServerDiscoveryConstants.RoleSecondary, StringComparison.OrdinalIgnoreCase));

            double avgCpu = onlineNodes.Count > 0 ? Math.Round(onlineNodes.Average(n => n.HostCpuPct), 1) : 0;
            double avgAppCpu = onlineNodes.Count > 0 ? Math.Round(onlineNodes.Average(n => n.GpuNvencPct > 0 ? n.GpuNvencPct : (n.HostCpuPct * 0.2)), 1) : 0;
            double totalRamGb = onlineNodes.Sum(n => n.TotalRamGb);
            double usedRamGb = Math.Round(onlineNodes.Sum(n => n.TotalRamGb * (n.HostRamPct / 100.0)), 1);
            double ramPct = totalRamGb > 0 ? Math.Round((usedRamGb / totalRamGb) * 100.0, 1) : 0;
            double appRamMb = Math.Round(onlineNodes.Sum(n => n.ProcessRamMb), 0);
            double totalTx = Math.Round(onlineNodes.Sum(n => n.NicTotalTxMbps), 2);
            double totalRx = Math.Round(onlineNodes.Sum(n => n.NicTotalRxMbps), 2);
            double totalNet = Math.Round(totalTx + totalRx, 2);
            double totalSpeed = onlineNodes.Sum(n => n.LinkSpeedMbps > 0 ? n.LinkSpeedMbps : 1000);
            double netUtil = totalSpeed > 0 ? Math.Min(100.0, Math.Round((totalNet / totalSpeed) * 100.0, 1)) : 0;

            // Cluster-wide encoder status & GPU models aggregation
            var gpuModels = onlineNodes
                .Where(n => !string.IsNullOrWhiteSpace(n.GpuModel) && !n.GpuModel.Equals("CPU Software", StringComparison.OrdinalIgnoreCase))
                .Select(n => $"{n.DisplayName}: {n.GpuModel}")
                .Distinct()
                .ToList();

            int hwEncoders = onlineNodes.Count(n =>
                !string.IsNullOrWhiteSpace(n.EncoderType) &&
                (n.EncoderType.Contains("nvenc", StringComparison.OrdinalIgnoreCase) ||
                 n.EncoderType.Contains("qsv", StringComparison.OrdinalIgnoreCase) ||
                 n.EncoderType.Contains("amf", StringComparison.OrdinalIgnoreCase)));

            string clusterEncoderStatus;
            if (onlineNodes.Count > 0 && hwEncoders == onlineNodes.Count)
            {
                clusterEncoderStatus = "Optimal (All Hardware NVENC/QSV Accelerated)";
            }
            else if (hwEncoders > 0)
            {
                clusterEncoderStatus = $"Hybrid ({hwEncoders}/{onlineNodes.Count} Hardware Accelerated, Remainder CPU Fallback)";
            }
            else
            {
                clusterEncoderStatus = "CPU Software Encoding (libx264)";
            }

            return new ClusterGridStatusDto
            {
                ClusterMode = disc.Role,
                ClusterGroup = !string.IsNullOrWhiteSpace(disc.ClusterGroup) ? disc.ClusterGroup : "Production",
                AutoPeerDiscovery = disc.AutoPeerDiscovery,
                LocalNodeId = localId,
                LocalNodeRole = isLocalOrch ? ServerDiscoveryConstants.RoleOrchestrator : ServerDiscoveryConstants.RoleWorker,
                OrchestratorNodeId = !string.IsNullOrEmpty(_orchestratorNodeId) ? _orchestratorNodeId : (isLocalOrch ? localId : "Unknown"),
                IsLocalNodeOrchestrator = isLocalOrch,
                TotalNodes = nodesList.Count,
                OnlineNodesCount = onlineNodes.Count,
                ActiveNodesCount = activeNodes,
                StandbyNodesCount = standbyNodes,
                TotalIngestedStreams = nodesList.Sum(n => n.ActiveStreamsCount),
                TotalStreamsCapacity = nodesList.Sum(n => n.MaxStreamsCapacity),
                TotalActiveRenderJobs = nodesList.Sum(n => n.ActiveJobsCount),
                TotalConcurrentJobsCapacity = nodesList.Sum(n => n.MaxConcurrentJobs),

                // Overall Cluster Telemetry Aggregates
                AggregateCpuPct = avgCpu,
                AggregateAppCpuPct = avgAppCpu,
                AggregateRamPct = ramPct,
                AggregateTotalRamGb = Math.Round(totalRamGb, 1),
                AggregateUsedRamGb = usedRamGb,
                AggregateAppRamMb = appRamMb,
                AggregateNicTxMbps = totalTx,
                AggregateNicRxMbps = totalRx,
                AggregateNicTotalMbps = totalNet,
                AggregateLinkSpeedMbps = totalSpeed,
                AggregateNicUtilizationPct = netUtil,

                EnableVirtualIp = disc.EnableVirtualIp,
                VirtualIp = disc.VirtualIp,
                IsVipBoundLocally = isVipBound,
                ClusterEncoderStatus = clusterEncoderStatus,
                ClusterHardwareEncodersCount = hwEncoders,
                ClusterTotalEncoderCapacityStreams = nodesList.Sum(n => n.MaxStreamsCapacity),
                ClusterGpuModels = gpuModels,
                Nodes = nodesList
            };
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("[CLUSTER] Initializing High-Availability Cluster supervision...");

            await InitializeClusterStateAsync(stoppingToken);

            while (!stoppingToken.IsCancellationRequested)
            {
                var config = _configMonitor.CurrentValue;
                var disc = config.Discovery ?? new DiscoverySettings();

                int intervalSec = Math.Clamp(disc.HeartbeatIntervalSeconds, 1, 30);

                try
                {
                    if (disc.Role == ServerDiscoveryConstants.RoleStandalone)
                    {
                        if (_state != ClusterNodeState.Standalone)
                        {
                            _state = ClusterNodeState.Standalone;
                            _partnerStatus = "N/A";
                        }
                    }
                    else if (string.Equals(disc.Role, ServerDiscoveryConstants.RoleActiveActive, StringComparison.OrdinalIgnoreCase))
                    {
                        await RunActiveActiveCycleAsync(disc, stoppingToken);
                    }
                    else
                    {
                        await RunHeartbeatCycleAsync(disc, stoppingToken);
                    }
                }
                catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
                {
                    break;
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "[CLUSTER] Error during cluster heartbeat cycle");
                }

                await Task.Delay(TimeSpan.FromSeconds(intervalSec), stoppingToken);
            }
        }

        private async Task InitializeClusterStateAsync(CancellationToken ct)
        {
            await _transitionLock.WaitAsync(ct);
            try
            {
                var config = _configMonitor.CurrentValue;
                var disc = config.Discovery ?? new DiscoverySettings();

                if (disc.Role == ServerDiscoveryConstants.RoleStandalone)
                {
                    _state = ClusterNodeState.Standalone;
                    _logger.LogInformation("[CLUSTER] Mode is Standalone. VIP and heartbeats are dormant.");
                    return;
                }

                bool isStandbyRole = string.Equals(disc.Role, ServerDiscoveryConstants.RoleActiveStandby, StringComparison.OrdinalIgnoreCase);
                bool isSecondaryNode = string.Equals(disc.NodeRole, ServerDiscoveryConstants.RoleSecondary, StringComparison.OrdinalIgnoreCase) ||
                                       string.Equals(disc.NodeRole, "Standby", StringComparison.OrdinalIgnoreCase);

                if (isStandbyRole && isSecondaryNode)
                {
                    _state = ClusterNodeState.Standby;
                    _logger.LogInformation("[CLUSTER] Initialized as STANDBY (Secondary Node). Monitoring partner for failover...");
                }
                else
                {
                    // Primary, Orchestrator or Active-Active node
                    _state = ClusterNodeState.Active;
                    _logger.LogInformation("[CLUSTER] Initialized as ACTIVE ({Role}/{NodeRole}).", disc.Role, disc.NodeRole);

                    bool isOrchestrator = string.Equals(disc.NodeRole, ServerDiscoveryConstants.RoleOrchestrator, StringComparison.OrdinalIgnoreCase) ||
                                          string.Equals(disc.NodeRole, ServerDiscoveryConstants.RolePrimary, StringComparison.OrdinalIgnoreCase) ||
                                          !string.Equals(disc.Role, ServerDiscoveryConstants.RoleActiveStandby, StringComparison.OrdinalIgnoreCase);

                    if (isOrchestrator && disc.EnableVirtualIp && !string.IsNullOrWhiteSpace(disc.VirtualIp))
                    {
                        _logger.LogInformation("[CLUSTER] Acquiring Virtual IP {Vip} at node startup...", disc.VirtualIp);
                        await _vipManager.AcquireVirtualIpAsync(disc.VirtualIp, disc.VirtualIpSubnetMask, disc.NetworkInterfaceName, ct);
                    }
                }
            }
            finally
            {
                _transitionLock.Release();
            }
        }

        #region Active-Active Distributed Orchestration & Workload Balancing

        private async Task RunActiveActiveCycleAsync(DiscoverySettings disc, CancellationToken ct)
        {
            string localId = Environment.MachineName;
            RegisterLocalNodeInRegistry();

            bool isLocalOrchestrator = string.Equals(_orchestratorNodeId, localId, StringComparison.OrdinalIgnoreCase) ||
                                       string.Equals(disc.NodeRole, ServerDiscoveryConstants.RoleOrchestrator, StringComparison.OrdinalIgnoreCase) ||
                                       string.Equals(disc.NodeRole, ServerDiscoveryConstants.RolePrimary, StringComparison.OrdinalIgnoreCase);

            if (isLocalOrchestrator)
            {
                // Orchestrator Duties:
                // 1. Prune timed-out nodes
                foreach (var kvp in _clusterNodes)
                {
                    if (kvp.Key.Equals(localId, StringComparison.OrdinalIgnoreCase)) continue;

                    var node = kvp.Value;
                    if (!node.IsOnline)
                    {
                        if (node.State != ClusterNodeState.Unreachable.ToString())
                        {
                            node.State = ClusterNodeState.Unreachable.ToString();
                            _logger.LogWarning("[CLUSTER ORCHESTRATOR] Worker node '{NodeId}' is now UNREACHABLE (Last seen: {LastSeen})",
                                node.NodeId, node.LastSeenUtc);

                            // Reassign its stations to healthy nodes
                            var lostStations = _stationToNodeMap.Where(x => x.Value.Equals(node.NodeId, StringComparison.OrdinalIgnoreCase)).Select(x => x.Key).ToList();
                            foreach (var st in lostStations)
                            {
                                _stationToNodeMap.TryRemove(st, out _);
                                _logger.LogInformation("[CLUSTER ORCHESTRATOR] Station '{Station}' unmapped from dead node '{NodeId}' for rebalance.", st, node.NodeId);
                            }
                        }
                    }
                }

                // 2. Poll configured peers/seeds if needed
                var peerUrls = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
                if (!string.IsNullOrWhiteSpace(disc.PartnerServerUrl)) peerUrls.Add(disc.PartnerServerUrl.TrimEnd('/'));
                if (disc.ClusterPeerUrls != null)
                {
                    foreach (var u in disc.ClusterPeerUrls) if (!string.IsNullOrWhiteSpace(u)) peerUrls.Add(u.TrimEnd('/'));
                }

                foreach (var peerUrl in peerUrls)
                {
                    try
                    {
                        using var client = CreateClusterHttpClient();
                        var res = await client.GetAsync($"{peerUrl}/api/v1/cluster/partner-health", ct);
                        if (res.IsSuccessStatusCode)
                        {
                            var health = await res.Content.ReadFromJsonAsync<ClusterPartnerHealthDto>(cancellationToken: ct);
                            if (health != null && !health.NodeId.Equals(localId, StringComparison.OrdinalIgnoreCase))
                            {
                                if (_clusterNodes.TryGetValue(health.NodeId, out var existing))
                                {
                                    existing.LastSeenUtc = DateTime.UtcNow;
                                    existing.State = health.State;
                                }
                            }
                        }
                    }
                    catch
                    {
                        // Ignore individual peer poll errors
                    }
                }
            }
            else
            {
                // Worker Node Duties:
                // Send heartbeat to Orchestrator
                string? targetOrchUrl = ResolveOrchestratorEndpoint(disc);
                bool heartbeatSuccess = false;

                if (!string.IsNullOrWhiteSpace(targetOrchUrl))
                {
                    try
                    {
                        using var client = CreateClusterHttpClient();
                        _clusterNodes.TryGetValue(localId, out var localDesc);

                        var heartbeatReq = new ClusterHeartbeatRequest
                        {
                            Node = localDesc ?? new ClusterNodeDescriptor { NodeId = localId },
                            Stations = _telemetryState != null ? _telemetryState.GetAllAgents().ToList() : new List<AgentTelemetryReport>(),
                            ReportedAtUtc = DateTime.UtcNow
                        };

                        var response = await client.PostAsJsonAsync($"{targetOrchUrl.TrimEnd('/')}/api/v1/cluster/nodes/heartbeat", heartbeatReq, ct);
                        if (response.IsSuccessStatusCode)
                        {
                            var hbResp = await response.Content.ReadFromJsonAsync<ClusterHeartbeatResponse>(cancellationToken: ct);
                            if (hbResp != null && hbResp.Acknowledged)
                            {
                                heartbeatSuccess = true;
                                _lastHeartbeatUtc = DateTime.UtcNow;
                                _consecutiveMissedHeartbeats = 0;
                                _partnerStatus = "Healthy (Orchestrator Online)";
                                _orchestratorNodeId = hbResp.OrchestratorNodeId;

                                // Sync active cluster nodes
                                foreach (var activeNode in hbResp.ActiveNodes)
                                {
                                    if (!activeNode.NodeId.Equals(localId, StringComparison.OrdinalIgnoreCase))
                                    {
                                        _clusterNodes[activeNode.NodeId] = activeNode;
                                    }
                                }

                                // Sync all fleet stations from orchestrator
                                if (hbResp.ClusterStations != null)
                                {
                                    foreach (var st in hbResp.ClusterStations)
                                    {
                                        if (!string.Equals(st.HostingNodeId, localId, StringComparison.OrdinalIgnoreCase))
                                        {
                                            _stationToNodeMap[st.Hostname] = st.HostingNodeId;
                                            _remoteStationTelemetry[st.Hostname] = st;
                                            if (_broadcastService != null)
                                            {
                                                _ = _broadcastService.BroadcastAgentUpdateAsync(st);
                                            }
                                        }
                                    }
                                }

                                // Sync authoritative stream policies from orchestrator
                                if (hbResp.DesiredStreamPolicies != null)
                                {
                                    foreach (var kvp in hbResp.DesiredStreamPolicies)
                                    {
                                        _clusterDesiredStreamPolicies[kvp.Key] = kvp.Value;
                                        _telemetryState?.SetAgentStreamState(kvp.Key, kvp.Value);
                                    }
                                }
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogDebug(ex, "[CLUSTER WORKER] Heartbeat to Orchestrator {Url} failed", targetOrchUrl);
                    }
                }

                if (!heartbeatSuccess)
                {
                    _consecutiveMissedHeartbeats++;
                    _logger.LogWarning("[CLUSTER WORKER] Missed heartbeat {Count}/{Threshold} to Orchestrator",
                        _consecutiveMissedHeartbeats, disc.HeartbeatMissedThreshold);

                    if (_consecutiveMissedHeartbeats >= disc.HeartbeatMissedThreshold)
                    {
                        // ORCHESTRATOR IS DOWN! RUN LEADER ELECTION:
                        await RunLeaderElectionAsync(disc, ct);
                    }
                }
            }
        }

        private string? ResolveOrchestratorEndpoint(DiscoverySettings disc)
        {
            if (!string.IsNullOrEmpty(_orchestratorNodeId) && _clusterNodes.TryGetValue(_orchestratorNodeId, out var orchNode))
            {
                if (!string.IsNullOrWhiteSpace(orchNode.ApiBaseUrl)) return orchNode.ApiBaseUrl;
            }

            if (!string.IsNullOrWhiteSpace(disc.PartnerServerUrl)) return disc.PartnerServerUrl;
            return disc.ClusterPeerUrls?.FirstOrDefault(u => !string.IsNullOrWhiteSpace(u));
        }

        private async Task RunLeaderElectionAsync(DiscoverySettings disc, CancellationToken ct)
        {
            await _transitionLock.WaitAsync(ct);
            try
            {
                string localId = Environment.MachineName;
                _logger.LogCritical("[CLUSTER LEADER ELECTION] Orchestrator missing! Initiating cluster leader election across online peers...");

                // Find candidate with highest Priority; if tied, compare NodeId string
                // Prefer Active nodes; if none are online, allow Standby nodes to promote
                var aliveNodes = _clusterNodes.Values
                    .Where(n => n.IsOnline || n.NodeId.Equals(localId, StringComparison.OrdinalIgnoreCase))
                    .Where(n => !n.IsStandby)
                    .ToList();

                if (aliveNodes.Count == 0)
                {
                    aliveNodes = _clusterNodes.Values
                        .Where(n => n.IsOnline || n.NodeId.Equals(localId, StringComparison.OrdinalIgnoreCase))
                        .ToList();
                }

                if (!aliveNodes.Any(n => n.NodeId.Equals(localId, StringComparison.OrdinalIgnoreCase)))
                {
                    aliveNodes.Add(new ClusterNodeDescriptor { NodeId = localId, Priority = disc.Priority, Role = ServerDiscoveryConstants.RoleWorker });
                }

                var winner = aliveNodes
                    .OrderByDescending(n => n.Priority)
                    .ThenBy(n => n.NodeId, StringComparer.OrdinalIgnoreCase)
                    .FirstOrDefault();

                if (winner != null && winner.NodeId.Equals(localId, StringComparison.OrdinalIgnoreCase))
                {
                    // LOCAL NODE WON ELECTION!
                    _orchestratorNodeId = localId;
                    _state = ClusterNodeState.Active;
                    _failoverCount++;

                    if (_clusterNodes.TryGetValue(localId, out var localDesc))
                    {
                        localDesc.Role = ServerDiscoveryConstants.RoleOrchestrator;
                        localDesc.State = ClusterNodeState.Active.ToString();
                    }

                    _logger.LogCritical("[CLUSTER LEADER ELECTION] Local node '{LocalId}' (Priority: {Priority}) WON LEADER ELECTION and is now the NEW ORCHESTRATOR!",
                        localId, disc.Priority);

                    if (disc.EnableVirtualIp && !string.IsNullOrWhiteSpace(disc.VirtualIp))
                    {
                        _logger.LogWarning("[CLUSTER LEADER ELECTION] Binding Virtual IP {Vip} as new Orchestrator...", disc.VirtualIp);
                        await _vipManager.AcquireVirtualIpAsync(disc.VirtualIp, disc.VirtualIpSubnetMask, disc.NetworkInterfaceName, ct);
                    }

                    _consecutiveMissedHeartbeats = 0;
                    _partnerStatus = "Local Node is Orchestrator";
                }
                else if (winner != null)
                {
                    _orchestratorNodeId = winner.NodeId;
                    _logger.LogInformation("[CLUSTER LEADER ELECTION] Candidate '{WinnerNode}' elected as new Orchestrator. Redirecting heartbeats...", winner.NodeId);
                }
            }
            finally
            {
                _transitionLock.Release();
            }
        }

        public async Task<ClusterHeartbeatResponse> ProcessNodeHeartbeatAsync(ClusterHeartbeatRequest request, CancellationToken ct = default)
        {
            if (request == null || request.Node == null || string.IsNullOrWhiteSpace(request.Node.NodeId))
            {
                return new ClusterHeartbeatResponse { Acknowledged = false };
            }

            var node = request.Node;
            node.LastSeenUtc = DateTime.UtcNow;
            node.State = ClusterNodeState.Active.ToString();

            if (node.HardwareCapabilityScore <= 0)
            {
                node.HardwareCapabilityScore = ClusterBeaconPacket.CalculateHardwareCapabilityScore(node.CpuCores, node.TotalRamGb, node.EncoderType, node.GpuModel);
            }
            if (node.EffectiveStreamsCapacity <= 0)
            {
                node.EffectiveStreamsCapacity = node.MaxStreamsCapacity > 0 ? node.MaxStreamsCapacity : Math.Clamp(node.HardwareCapabilityScore / 10, 10, 150);
            }
            node.IngestPressureScore = CalculateIngestPressure(node);
            node.ComputeFitnessScore = CalculateComputeFitness(node);

            _clusterNodes[node.NodeId] = node;

            // Map stations reported by this worker node
            if (request.Stations != null)
            {
                foreach (var station in request.Stations)
                {
                    if (!string.IsNullOrWhiteSpace(station.Hostname))
                    {
                        station.HostingNodeId = node.NodeId;
                        station.HostingNodeName = node.DisplayName;
                        _stationToNodeMap[station.Hostname] = node.NodeId;
                        _remoteStationTelemetry[station.Hostname] = station;

                        if (_broadcastService != null)
                        {
                            _ = _broadcastService.BroadcastAgentUpdateAsync(station);
                        }
                    }
                }
            }

            string localId = Environment.MachineName;
            var allStations = await GetClusterStationsAsync();
            var response = new ClusterHeartbeatResponse
            {
                Acknowledged = true,
                OrchestratorNodeId = !string.IsNullOrEmpty(_orchestratorNodeId) ? _orchestratorNodeId : localId,
                IsLocalNodeOrchestrator = string.Equals(_orchestratorNodeId, localId, StringComparison.OrdinalIgnoreCase),
                ActiveNodes = _clusterNodes.Values.Where(n => n.IsOnline).ToList(),
                AssignedStations = node.AssignedStations ?? new List<string>(),
                ClusterStations = allStations,
                DesiredStreamPolicies = new Dictionary<string, bool>(_clusterDesiredStreamPolicies, StringComparer.OrdinalIgnoreCase),
                ServerUtcTime = DateTime.UtcNow
            };

            return response;
        }

        public static double CalculateIngestPressure(ClusterNodeDescriptor node)
        {
            if (node == null) return 999.0;
            if (node.IsStandby || node.IsDraining) return 9999.0;

            // Hard safety ceiling: if CPU >= 75% or GPU NVENC >= 85%, mark node as heavily pressured
            if (node.IsOverloaded)
            {
                return Math.Round(50.0 + (node.HostCpuPct / 10.0), 2);
            }

            int cap = node.EffectiveStreamsCapacity > 0 ? node.EffectiveStreamsCapacity : Math.Max(10, node.MaxStreamsCapacity);
            double streamLoadRatio = (double)node.ActiveStreamsCount / cap;
            double cpuStrain = Math.Max(0.0, node.HostCpuPct / 100.0);
            double gpuStrain = Math.Max(0.0, node.GpuNvencPct / 100.0);

            // Weighted pressure: 50% CPU strain, 35% stream load, 15% GPU strain
            double rawPressure = (cpuStrain * 0.50) + (streamLoadRatio * 0.35) + (gpuStrain * 0.15);

            // Damping factor: Powerful hardware absorbs pressure much better than weak machines
            int score = Math.Max(100, node.HardwareCapabilityScore);
            double capabilityDamping = Math.Max(0.35, 500.0 / score);

            return Math.Round(rawPressure * capabilityDamping * 100.0, 2);
        }

        public static double CalculateComputeFitness(ClusterNodeDescriptor node)
        {
            if (node == null || node.IsStandby || node.IsDraining) return -1.0;

            // Hard safety ceilings:
            // 1. If CPU >= 75% or GPU NVENC >= 85%, strictly ineligible for new heavy video jobs
            if (node.IsOverloaded) return -1.0;

            // 2. Weak CPU-only node (score < 300 or libx264 software encoder):
            // Strictly capped at max 1 concurrent job, and only permitted if CPU < 60%
            bool isWeakCpuNode = node.HardwareCapabilityScore < 300 ||
                                 string.Equals(node.EncoderType, "libx264", StringComparison.OrdinalIgnoreCase);
            if (isWeakCpuNode)
            {
                if (node.ActiveJobsCount >= 1 || node.HostCpuPct >= 60.0)
                {
                    return -1.0;
                }
            }

            // 3. Normal concurrency limit: cannot exceed node's MaxConcurrentJobs
            if (node.ActiveJobsCount >= node.MaxConcurrentJobs)
            {
                return -1.0;
            }

            // Available slots and headroom
            double slotsHeadroom = (double)(node.MaxConcurrentJobs - node.ActiveJobsCount) / Math.Max(1, node.MaxConcurrentJobs);
            double cpuHeadroom = Math.Max(0.01, (100.0 - node.HostCpuPct) / 100.0);
            double gpuHeadroom = Math.Max(0.01, (100.0 - node.GpuNvencPct) / 100.0);

            double fitness = node.HardwareCapabilityScore * slotsHeadroom * (cpuHeadroom * 0.6 + gpuHeadroom * 0.4);
            return Math.Round(fitness, 2);
        }

        public Task<string?> ResolveAssignedIngestNodeUrlAsync(string stationHostname, CancellationToken ct = default)
        {
            var config = _configMonitor.CurrentValue;
            var disc = config?.Discovery ?? new DiscoverySettings();

            if (!string.Equals(disc.Role, ServerDiscoveryConstants.RoleActiveActive, StringComparison.OrdinalIgnoreCase))
            {
                return Task.FromResult<string?>(null);
            }

            // Check existing affinity - keep affinity if node is online AND NOT severely overloaded (CPU < 85%)
            if (_stationToNodeMap.TryGetValue(stationHostname, out string? existingNodeId))
            {
                if (_clusterNodes.TryGetValue(existingNodeId, out var existingNode) && 
                    existingNode.IsOnline && 
                    existingNode.HostCpuPct < 85.0)
                {
                    return Task.FromResult<string?>(existingNode.RtmpBaseUrl);
                }
            }

            // Find least loaded online node (preferring Active nodes; Standby nodes kept as hot spares)
            var onlineNodes = _clusterNodes.Values.Where(n => n.IsOnline).ToList();
            if (onlineNodes.Count == 0) return Task.FromResult<string?>(null);

            var candidateNodes = onlineNodes.Where(n => !n.IsStandby && !n.IsDraining).ToList();
            if (candidateNodes.Count == 0) candidateNodes = onlineNodes;

            // Overload Protection: If any healthy (non-overloaded) nodes exist, filter out overloaded nodes
            var healthyCandidates = candidateNodes.Where(n => !n.IsOverloaded).ToList();
            var selectionPool = healthyCandidates.Count > 0 ? healthyCandidates : candidateNodes;

            var chosenNode = selectionPool
                .OrderBy(n => CalculateIngestPressure(n))
                .ThenBy(n => n.ActiveStreamsCount)
                .ThenBy(n => n.HostCpuPct)
                .First();

            _stationToNodeMap[stationHostname] = chosenNode.NodeId;
            chosenNode.ActiveStreamsCount++;
            if (!chosenNode.AssignedStations.Contains(stationHostname, StringComparer.OrdinalIgnoreCase))
            {
                chosenNode.AssignedStations.Add(stationHostname);
            }

            _logger.LogInformation("[CLUSTER BALANCER] Ingest assignment: Workstation '{Station}' -> Node '{NodeId}' ({RtmpUrl}, HW-Score: {Score}, IngestPressure: {Pressure}, CPU: {Cpu}%)",
                stationHostname, chosenNode.NodeId, chosenNode.RtmpBaseUrl, chosenNode.HardwareCapabilityScore, CalculateIngestPressure(chosenNode), chosenNode.HostCpuPct);

            return Task.FromResult<string?>(chosenNode.RtmpBaseUrl);
        }

        public Task<ClusterNodeDescriptor?> SelectOptimalWorkerForJobAsync(CancellationToken ct = default)
        {
            var onlineNodes = _clusterNodes.Values.Where(n => n.IsOnline).ToList();
            if (onlineNodes.Count == 0)
            {
                _clusterNodes.TryGetValue(Environment.MachineName, out var localNode);
                return Task.FromResult(localNode);
            }

            var candidateNodes = onlineNodes.Where(n => !n.IsStandby && !n.IsDraining).ToList();
            if (candidateNodes.Count == 0) candidateNodes = onlineNodes;

            // Evaluate hardware fitness for video processing
            var eligibleNodes = candidateNodes
                .Select(n => (Node: n, Fitness: CalculateComputeFitness(n)))
                .Where(x => x.Fitness > 0)
                .OrderByDescending(x => x.Fitness)
                .ThenBy(x => x.Node.ActiveJobsCount)
                .ToList();

            ClusterNodeDescriptor selected;
            if (eligibleNodes.Count > 0)
            {
                selected = eligibleNodes.First().Node;
                _logger.LogInformation("[CLUSTER JOB BALANCER] Dispatched job to optimal worker '{NodeId}' (HW-Score: {Score}, Fitness: {Fitness}, CPU: {Cpu}%, GPU: {Gpu}%, Active Jobs: {Jobs}/{Max})",
                    selected.NodeId, selected.HardwareCapabilityScore, eligibleNodes.First().Fitness, selected.HostCpuPct, selected.GpuNvencPct, selected.ActiveJobsCount, selected.MaxConcurrentJobs);
            }
            else
            {
                // All nodes are either overloaded or at capacity. Fall back to the least pressured candidate node
                selected = candidateNodes
                    .Where(n => n.HostCpuPct < 85.0)
                    .OrderBy(n => n.ActiveJobsCount)
                    .ThenBy(n => CalculateIngestPressure(n))
                    .FirstOrDefault() ?? candidateNodes.OrderBy(n => n.ActiveJobsCount).First();

                _logger.LogWarning("[CLUSTER JOB BALANCER] All nodes saturated; falling back to candidate '{NodeId}' (Active Jobs: {Jobs}/{Max}, CPU: {Cpu}%)",
                    selected.NodeId, selected.ActiveJobsCount, selected.MaxConcurrentJobs, selected.HostCpuPct);
            }

            return Task.FromResult<ClusterNodeDescriptor?>(selected);
        }

        public async Task<ClusterFailoverResultDto> TransferOrchestratorRoleAsync(string targetNodeId, CancellationToken ct = default)
        {
            await _transitionLock.WaitAsync(ct);
            try
            {
                string localId = Environment.MachineName;
                if (!string.Equals(_orchestratorNodeId, localId, StringComparison.OrdinalIgnoreCase))
                {
                    return new ClusterFailoverResultDto
                    {
                        Success = false,
                        Message = "Local node is not the current Orchestrator and cannot transfer role."
                    };
                }

                if (!_clusterNodes.TryGetValue(targetNodeId, out var targetNode) || !targetNode.IsOnline)
                {
                    return new ClusterFailoverResultDto
                    {
                        Success = false,
                        Message = $"Target node '{targetNodeId}' was not found or is offline."
                    };
                }

                var config = _configMonitor.CurrentValue;
                var disc = config.Discovery ?? new DiscoverySettings();

                // Release VIP locally
                if (disc.EnableVirtualIp && !string.IsNullOrWhiteSpace(disc.VirtualIp))
                {
                    _logger.LogWarning("[CLUSTER ORCHESTRATOR TRANSFER] Releasing VIP locally before transfer...");
                    await _vipManager.ReleaseVirtualIpAsync(disc.VirtualIp, disc.NetworkInterfaceName, ct);
                }

                // Notify target node
                try
                {
                    using var client = CreateClusterHttpClient();
                    string handoverUrl = $"{targetNode.ApiBaseUrl.TrimEnd('/')}/api/v1/cluster/failover/handover";
                    var payload = new { SourceNodeId = localId, TimestampUtc = DateTime.UtcNow };
                    await client.PostAsJsonAsync(handoverUrl, payload, ct);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "[CLUSTER ORCHESTRATOR TRANSFER] Error notifying target node {TargetId}", targetNodeId);
                }

                _orchestratorNodeId = targetNodeId;
                if (_clusterNodes.TryGetValue(localId, out var localDesc))
                {
                    localDesc.Role = ServerDiscoveryConstants.RoleWorker;
                }

                _logger.LogInformation("[CLUSTER ORCHESTRATOR TRANSFER] Successfully transferred Orchestrator role to '{TargetId}'.", targetNodeId);

                return new ClusterFailoverResultDto
                {
                    Success = true,
                    State = ClusterNodeState.Active.ToString(),
                    Message = $"Orchestrator role transferred to node '{targetNodeId}'."
                };
            }
            finally
            {
                _transitionLock.Release();
            }
        }

        public int GetActiveJobsCount()
        {
            string localId = Environment.MachineName;
            return _clusterJobs.Values.Count(j =>
                (string.Equals(j.ExecutingNodeId, localId, StringComparison.OrdinalIgnoreCase) || string.IsNullOrEmpty(j.ExecutingNodeId)) &&
                (string.Equals(j.Status, "Processing", StringComparison.OrdinalIgnoreCase) || string.Equals(j.Status, "Queued", StringComparison.OrdinalIgnoreCase)));
        }

        public void ReportJobStatus(ClusterJobStatusDto status)
        {
            UpdateJobStatus(status);
        }

        public void UpdateJobStatus(ClusterJobStatusDto status)
        {
            if (status == null || string.IsNullOrWhiteSpace(status.JobId)) return;
            status.UpdatedAtUtc = DateTime.UtcNow;
            _clusterJobs[status.JobId] = status;

            string localId = Environment.MachineName;
            string targetNodeId = !string.IsNullOrEmpty(status.ExecutingNodeId) ? status.ExecutingNodeId : localId;

            // Update node job counter & fitness
            if (_clusterNodes.TryGetValue(targetNodeId, out var node))
            {
                node.ActiveJobsCount = _clusterJobs.Values.Count(j =>
                    j.ExecutingNodeId.Equals(node.NodeId, StringComparison.OrdinalIgnoreCase) &&
                    (string.Equals(j.Status, "Processing", StringComparison.OrdinalIgnoreCase) || string.Equals(j.Status, "Queued", StringComparison.OrdinalIgnoreCase)));
                node.ComputeFitnessScore = CalculateComputeFitness(node);
            }

            // Keep local node active jobs count fresh
            if (_clusterNodes.TryGetValue(localId, out var localNode))
            {
                localNode.ActiveJobsCount = GetActiveJobsCount();
                localNode.ComputeFitnessScore = CalculateComputeFitness(localNode);
            }
        }

        public List<ClusterJobStatusDto> GetAllClusterJobs()
        {
            return _clusterJobs.Values.OrderByDescending(j => j.UpdatedAtUtc).ToList();
        }

        public Task<List<AgentTelemetryReport>> GetClusterStationsAsync(CancellationToken ct = default)
        {
            var result = new Dictionary<string, AgentTelemetryReport>(StringComparer.OrdinalIgnoreCase);

            // Local stations
            if (_telemetryState != null)
            {
                foreach (var a in _telemetryState.GetAllAgents())
                {
                    a.HostingNodeId = Environment.MachineName;
                    a.HostingNodeName = _configMonitor.CurrentValue?.Discovery?.ServerDisplayName ?? Environment.MachineName;
                    result[a.Hostname] = a;
                }
            }

            // Remote stations
            foreach (var kvp in _remoteStationTelemetry)
            {
                if (!result.ContainsKey(kvp.Key))
                {
                    result[kvp.Key] = kvp.Value;
                }
            }

            return Task.FromResult(result.Values.ToList());
        }

        public string? ResolveStreamNodeHost(string stationHostname)
        {
            if (string.IsNullOrWhiteSpace(stationHostname)) return null;

            if (_stationToNodeMap.TryGetValue(stationHostname, out string? nodeId))
            {
                if (nodeId.Equals(Environment.MachineName, StringComparison.OrdinalIgnoreCase))
                {
                    return null; // Local
                }

                if (_clusterNodes.TryGetValue(nodeId, out var node) && !string.IsNullOrWhiteSpace(node.ApiBaseUrl))
                {
                    try
                    {
                        var uri = new Uri(node.ApiBaseUrl);
                        return uri.Host;
                    }
                    catch { }
                }
            }

            return null;
        }

        #endregion

        #region Autonomous UDP Multicast/Broadcast Beacon Discovery

        public ClusterBeaconPacket CreateLocalBeaconPacket()
        {
            var config = _configMonitor.CurrentValue;
            var disc = config?.Discovery ?? new DiscoverySettings();
            string localId = Environment.MachineName;

            RegisterLocalNodeInRegistry();
            _clusterNodes.TryGetValue(localId, out var localDesc);

            int httpPort = config?.HttpPort > 0 ? config.HttpPort : 5090;
            int rtmpPort = config?.MediaMtx?.RtmpPort > 0 ? config.MediaMtx.RtmpPort : 19350;
            int hlsPort = config?.MediaMtx?.HlsPort > 0 ? config.MediaMtx.HlsPort : 8888;

            string cleanVip = disc.VirtualIp?.Trim() ?? string.Empty;
            bool isVipBound = !string.IsNullOrWhiteSpace(cleanVip) &&
                              _vipManager.IsVirtualIpBoundLocallyAsync(cleanVip).GetAwaiter().GetResult();

            var localIps = ServerDiscoveryHostedService.GetActiveLocalIps();
            string primaryIp = localIps.FirstOrDefault() ?? "127.0.0.1";

            bool isLocalOrchestrator = !string.IsNullOrEmpty(_orchestratorNodeId)
                ? string.Equals(_orchestratorNodeId, localId, StringComparison.OrdinalIgnoreCase)
                : (string.Equals(disc.NodeRole, ServerDiscoveryConstants.RoleOrchestrator, StringComparison.OrdinalIgnoreCase) ||
                   string.Equals(disc.NodeRole, ServerDiscoveryConstants.RolePrimary, StringComparison.OrdinalIgnoreCase));

            bool isStandby = string.Equals(disc.NodeMode, ServerDiscoveryConstants.NodeModeStandby, StringComparison.OrdinalIgnoreCase) ||
                             string.Equals(disc.NodeRole, ServerDiscoveryConstants.RoleSecondary, StringComparison.OrdinalIgnoreCase) ||
                             _state == ClusterNodeState.Standby;

            string role = isLocalOrchestrator ? ServerDiscoveryConstants.RoleOrchestrator : (isStandby ? ServerDiscoveryConstants.RoleSecondary : ServerDiscoveryConstants.RoleWorker);

            var (hwStreamsCap, hwJobsCap) = ClusterBeaconPacket.CalculateHardwareCapacities(
                localDesc?.CpuCores ?? Environment.ProcessorCount,
                localDesc?.TotalRamGb ?? 8.0,
                localDesc?.EncoderType ?? "libx264",
                localDesc?.GpuModel ?? "CPU Software");

            int effectiveStreamsCap = disc.MaxIngestStreamsCapacity > 0 ? disc.MaxIngestStreamsCapacity : (localDesc?.MaxStreamsCapacity > 0 ? localDesc.MaxStreamsCapacity : hwStreamsCap);
            int effectiveJobsCap = disc.MaxConcurrentRenderJobs > 0 ? disc.MaxConcurrentRenderJobs : (localDesc?.MaxConcurrentJobs > 0 ? localDesc.MaxConcurrentJobs : hwJobsCap);

            return new ClusterBeaconPacket
            {
                Magic = ServerDiscoveryConstants.ClusterBeaconMagic,
                ClusterGroup = !string.IsNullOrWhiteSpace(disc.ClusterGroup) ? disc.ClusterGroup : "Production",
                NodeId = localId,
                DisplayName = !string.IsNullOrWhiteSpace(disc.ServerDisplayName) ? disc.ServerDisplayName : localId,
                NodeMode = isStandby ? ServerDiscoveryConstants.NodeModeStandby : ServerDiscoveryConstants.NodeModeActive,
                NodeRole = role,
                Priority = disc.Priority,
                ApiBaseUrl = $"http://{primaryIp}:{httpPort}",
                RtmpBaseUrl = $"rtmps://{primaryIp}:{rtmpPort}/live",
                HlsBaseUrl = $"http://{primaryIp}:{hlsPort}/live",
                WhepPort = 8889,
                ActiveStreamsCount = localDesc?.ActiveStreamsCount ?? 0,
                MaxStreamsCapacity = effectiveStreamsCap,
                RecommendedStreamsCapacity = hwStreamsCap,
                ActiveJobsCount = localDesc?.ActiveJobsCount ?? GetActiveJobsCount(),
                MaxConcurrentJobs = effectiveJobsCap,
                RecommendedConcurrentJobs = hwJobsCap,
                HostCpuPct = localDesc?.HostCpuPct ?? 0,
                HostRamPct = localDesc?.HostRamPct ?? 0,
                NicTotalTxMbps = localDesc?.NicTotalTxMbps ?? 0,
                NicTotalRxMbps = localDesc?.NicTotalRxMbps ?? 0,
                LinkSpeedMbps = localDesc?.LinkSpeedMbps ?? 1000,
                GpuNvencPct = localDesc?.GpuNvencPct ?? 0,
                CpuCores = localDesc?.CpuCores ?? Environment.ProcessorCount,
                TotalRamGb = localDesc?.TotalRamGb ?? 8.0,
                GpuModel = localDesc?.GpuModel ?? "CPU Software",
                EncoderType = localDesc?.EncoderType ?? "libx264",
                HardwareCapabilityScore = localDesc?.HardwareCapabilityScore ?? 200,
                OsPlatform = localDesc?.OsPlatform ?? (OperatingSystem.IsWindows() ? "Windows" : (OperatingSystem.IsLinux() ? "Linux" : "Other")),
                OsDescription = localDesc?.OsDescription ?? System.Runtime.InteropServices.RuntimeInformation.OSDescription,
                IsVipBound = isVipBound,
                LocalIps = localIps,
                AssignedStations = localDesc?.AssignedStations ?? new List<string>(),
                IsDraining = _state == ClusterNodeState.Draining,
                TimestampUtc = DateTime.UtcNow
            };
        }

        public async Task ProcessClusterBeaconAsync(ClusterBeaconPacket beacon, CancellationToken ct = default)
        {
            if (beacon == null || string.IsNullOrWhiteSpace(beacon.NodeId)) return;
            string localId = Environment.MachineName;

            // Ignore beacon sent by local node
            if (string.Equals(beacon.NodeId, localId, StringComparison.OrdinalIgnoreCase)) return;

            var config = _configMonitor.CurrentValue;
            var disc = config?.Discovery ?? new DiscoverySettings();

            // Ignore beacons from different cluster groups on the LAN
            string myGroup = !string.IsNullOrWhiteSpace(disc.ClusterGroup) ? disc.ClusterGroup : "Production";
            if (!string.Equals(beacon.ClusterGroup, myGroup, StringComparison.OrdinalIgnoreCase))
            {
                return;
            }

            var (peerHwStreamsCap, peerHwJobsCap) = ClusterBeaconPacket.CalculateHardwareCapacities(
                beacon.CpuCores,
                beacon.TotalRamGb,
                beacon.EncoderType,
                beacon.GpuModel);

            // Update or register discovered peer node
            var node = _clusterNodes.GetOrAdd(beacon.NodeId, id => new ClusterNodeDescriptor { NodeId = id });
            node.DisplayName = !string.IsNullOrWhiteSpace(beacon.DisplayName) ? beacon.DisplayName : beacon.NodeId;
            node.ApiBaseUrl = beacon.ApiBaseUrl;
            node.RtmpBaseUrl = beacon.RtmpBaseUrl;
            node.HlsBaseUrl = beacon.HlsBaseUrl;
            node.WhepPort = beacon.WhepPort;
            node.Role = beacon.NodeRole;
            node.NodeMode = beacon.NodeMode;
            node.State = beacon.IsDraining
                ? ClusterNodeState.Draining.ToString()
                : (string.Equals(beacon.NodeMode, ServerDiscoveryConstants.NodeModeStandby, StringComparison.OrdinalIgnoreCase)
                    ? ClusterNodeState.Standby.ToString()
                    : ClusterNodeState.Active.ToString());
            node.Priority = beacon.Priority;
            node.ActiveStreamsCount = beacon.ActiveStreamsCount;
            node.MaxStreamsCapacity = beacon.MaxStreamsCapacity > 0 ? beacon.MaxStreamsCapacity : peerHwStreamsCap;
            node.RecommendedStreamsCapacity = beacon.RecommendedStreamsCapacity > 0 ? beacon.RecommendedStreamsCapacity : peerHwStreamsCap;
            node.ActiveJobsCount = beacon.ActiveJobsCount;
            node.MaxConcurrentJobs = beacon.MaxConcurrentJobs > 0 ? beacon.MaxConcurrentJobs : peerHwJobsCap;
            node.RecommendedConcurrentJobs = beacon.RecommendedConcurrentJobs > 0 ? beacon.RecommendedConcurrentJobs : peerHwJobsCap;
            node.HostCpuPct = beacon.HostCpuPct;
            node.HostRamPct = beacon.HostRamPct;
            node.NicTotalTxMbps = beacon.NicTotalTxMbps;
            node.NicTotalRxMbps = beacon.NicTotalRxMbps;
            node.LinkSpeedMbps = beacon.LinkSpeedMbps > 0 ? beacon.LinkSpeedMbps : 1000;
            node.GpuNvencPct = beacon.GpuNvencPct;
            node.CpuCores = beacon.CpuCores;
            node.TotalRamGb = beacon.TotalRamGb;
            node.GpuModel = !string.IsNullOrWhiteSpace(beacon.GpuModel) ? beacon.GpuModel : "CPU Software";
            node.EncoderType = !string.IsNullOrWhiteSpace(beacon.EncoderType) ? beacon.EncoderType : "libx264";
            node.HardwareCapabilityScore = beacon.HardwareCapabilityScore > 0
                ? beacon.HardwareCapabilityScore
                : ClusterBeaconPacket.CalculateHardwareCapabilityScore(beacon.CpuCores, beacon.TotalRamGb, beacon.EncoderType, beacon.GpuModel);
            node.OsPlatform = !string.IsNullOrWhiteSpace(beacon.OsPlatform) ? beacon.OsPlatform : "Unknown";
            node.OsDescription = !string.IsNullOrWhiteSpace(beacon.OsDescription) ? beacon.OsDescription : string.Empty;
            node.EffectiveStreamsCapacity = node.MaxStreamsCapacity;
            node.IngestPressureScore = CalculateIngestPressure(node);
            node.ComputeFitnessScore = CalculateComputeFitness(node);
            node.IsVipBound = beacon.IsVipBound;
            node.LocalIps = beacon.LocalIps ?? new List<string>();
            node.LastSeenUtc = DateTime.UtcNow;

            if (beacon.AssignedStations != null)
            {
                node.AssignedStations = beacon.AssignedStations;
                foreach (var station in beacon.AssignedStations)
                {
                    if (!string.IsNullOrWhiteSpace(station))
                    {
                        _stationToNodeMap[station] = beacon.NodeId;
                    }
                }
            }

            // Automatic Deterministic Leader Arbitration:
            bool isLocalStandby = string.Equals(disc.NodeMode, ServerDiscoveryConstants.NodeModeStandby, StringComparison.OrdinalIgnoreCase) ||
                                  _state == ClusterNodeState.Standby;

            var onlineActiveNodes = _clusterNodes.Values
                .Where(n => n.IsOnline && !n.IsStandby)
                .ToList();

            if (!isLocalStandby && !onlineActiveNodes.Any(n => n.NodeId.Equals(localId, StringComparison.OrdinalIgnoreCase)))
            {
                if (_clusterNodes.TryGetValue(localId, out var localDesc))
                {
                    onlineActiveNodes.Add(localDesc);
                }
            }

            if (onlineActiveNodes.Count > 0)
            {
                var candidate = onlineActiveNodes
                    .OrderByDescending(n => n.Priority)
                    .ThenBy(n => n.NodeId, StringComparer.OrdinalIgnoreCase)
                    .First();

                if (candidate.NodeId.Equals(localId, StringComparison.OrdinalIgnoreCase))
                {
                    if (!string.Equals(_orchestratorNodeId, localId, StringComparison.OrdinalIgnoreCase))
                    {
                        _logger.LogInformation("[CLUSTER AUTO-DISCOVERY] Local node '{LocalId}' (Priority: {Priority}) designated as ORCHESTRATOR.",
                            localId, disc.Priority);
                        _orchestratorNodeId = localId;

                        if (disc.EnableVirtualIp && !string.IsNullOrWhiteSpace(disc.VirtualIp))
                        {
                            await _vipManager.AcquireVirtualIpAsync(disc.VirtualIp, disc.VirtualIpSubnetMask, disc.NetworkInterfaceName, ct);
                        }
                    }
                }
                else
                {
                    if (string.Equals(_orchestratorNodeId, localId, StringComparison.OrdinalIgnoreCase) && candidate.Priority > disc.Priority)
                    {
                        _logger.LogInformation("[CLUSTER AUTO-DISCOVERY] Yielding Orchestrator to higher priority node '{Winner}' ({Priority} > {MyPriority}).",
                            candidate.NodeId, candidate.Priority, disc.Priority);
                        _orchestratorNodeId = candidate.NodeId;
                        if (disc.EnableVirtualIp && !string.IsNullOrWhiteSpace(disc.VirtualIp))
                        {
                            await _vipManager.ReleaseVirtualIpAsync(disc.VirtualIp, disc.NetworkInterfaceName, ct);
                        }
                    }
                    else if (string.IsNullOrEmpty(_orchestratorNodeId))
                    {
                        _orchestratorNodeId = candidate.NodeId;
                    }
                }
            }
            else if (isLocalStandby)
            {
                // No active nodes detected! Standby promotes itself to keep cluster operational
                _logger.LogCritical("[CLUSTER AUTO-DISCOVERY] Zero online Active nodes detected! Standby node '{LocalId}' PROMOTING TO ACTIVE ORCHESTRATOR!", localId);
                _state = ClusterNodeState.Active;
                _orchestratorNodeId = localId;
                if (disc.EnableVirtualIp && !string.IsNullOrWhiteSpace(disc.VirtualIp))
                {
                    await _vipManager.AcquireVirtualIpAsync(disc.VirtualIp, disc.VirtualIpSubnetMask, disc.NetworkInterfaceName, ct);
                }
            }
        }

        #endregion

        #region Active-Standby Heartbeat & VIP Failover

        private async Task RunHeartbeatCycleAsync(DiscoverySettings disc, CancellationToken ct)
        {
            if (string.IsNullOrWhiteSpace(disc.PartnerServerUrl))
            {
                _partnerStatus = "Unconfigured";
                return;
            }

            ClusterPartnerHealthDto? partnerHealth = null;
            try
            {
                using var client = CreateClusterHttpClient();
                string targetUrl = disc.PartnerServerUrl.TrimEnd('/') + "/api/v1/cluster/partner-health";

                using var cts = CancellationTokenSource.CreateLinkedTokenSource(ct);
                cts.CancelAfter(TimeSpan.FromMilliseconds(1500));

                var response = await client.GetAsync(targetUrl, cts.Token);
                if (response.IsSuccessStatusCode)
                {
                    partnerHealth = await response.Content.ReadFromJsonAsync<ClusterPartnerHealthDto>(cancellationToken: cts.Token);
                }
            }
            catch
            {
                partnerHealth = null;
            }

            await _transitionLock.WaitAsync(ct);
            try
            {
                if (partnerHealth != null)
                {
                    _consecutiveMissedHeartbeats = 0;
                    _lastHeartbeatUtc = DateTime.UtcNow;
                    _partnerStatus = partnerHealth.State;
                    _partnerIsVipOwner = partnerHealth.IsVipOwner;

                    bool isStandbyCluster = string.Equals(disc.Role, ServerDiscoveryConstants.RoleActiveStandby, StringComparison.OrdinalIgnoreCase);

                    if (isStandbyCluster)
                    {
                        if (_state == ClusterNodeState.Standby)
                        {
                            if (string.Equals(partnerHealth.State, ClusterNodeState.Standby.ToString(), StringComparison.OrdinalIgnoreCase) ||
                                string.Equals(partnerHealth.State, ClusterNodeState.Demoting.ToString(), StringComparison.OrdinalIgnoreCase))
                            {
                                if (disc.Priority >= partnerHealth.Priority)
                                {
                                    _logger.LogWarning("[CLUSTER] Partner is Standby/Demoting. Promoting local node to ACTIVE!");
                                    await PromoteToActiveAsync(disc, ct);
                                }
                            }
                        }
                        else if (_state == ClusterNodeState.Active)
                        {
                            if (string.Equals(partnerHealth.State, ClusterNodeState.Active.ToString(), StringComparison.OrdinalIgnoreCase))
                            {
                                if (disc.Priority < partnerHealth.Priority)
                                {
                                    _logger.LogWarning("[CLUSTER] Split-Brain Alert: Both nodes are Active! Local priority ({Local}) < Partner priority ({Partner}). Demoting local node to STANDBY.",
                                        disc.Priority, partnerHealth.Priority);
                                    await DemoteToStandbyAsync(disc, ct);
                                }
                            }
                        }
                    }
                }
                else
                {
                    _consecutiveMissedHeartbeats++;
                    _logger.LogDebug("[CLUSTER] Missed heartbeat {Count}/{Threshold} from partner {PartnerUrl}",
                        _consecutiveMissedHeartbeats, disc.HeartbeatMissedThreshold, disc.PartnerServerUrl);

                    if (_consecutiveMissedHeartbeats >= disc.HeartbeatMissedThreshold)
                    {
                        _partnerStatus = "Unreachable";

                        if (_state == ClusterNodeState.Standby)
                        {
                            _logger.LogCritical("[CLUSTER FAILOVER] Partner node {PartnerUrl} missed {Missed} heartbeats and is UNREACHABLE! Promoting this node to ACTIVE!",
                                disc.PartnerServerUrl, _consecutiveMissedHeartbeats);
                            await PromoteToActiveAsync(disc, ct);
                        }
                    }
                }
            }
            finally
            {
                _transitionLock.Release();
            }
        }

        private async Task PromoteToActiveAsync(DiscoverySettings disc, CancellationToken ct)
        {
            _state = ClusterNodeState.Promoting;
            _failoverCount++;

            if (disc.EnableVirtualIp && !string.IsNullOrWhiteSpace(disc.VirtualIp))
            {
                _logger.LogWarning("[CLUSTER FAILOVER] Claiming Virtual IP {Vip} on interface '{Iface}'...",
                    disc.VirtualIp, disc.NetworkInterfaceName);

                var result = await _vipManager.AcquireVirtualIpAsync(
                    disc.VirtualIp,
                    disc.VirtualIpSubnetMask,
                    disc.NetworkInterfaceName,
                    ct);

                _logger.LogInformation("[CLUSTER FAILOVER] VIP Acquisition result: {Result}", result.Message);
            }

            _state = ClusterNodeState.Active;
            _logger.LogInformation("[CLUSTER FAILOVER] Local node is now fully ACTIVE (Failover Count: {Count}).", _failoverCount);
        }

        private async Task DemoteToStandbyAsync(DiscoverySettings disc, CancellationToken ct)
        {
            _state = ClusterNodeState.Demoting;

            if (disc.EnableVirtualIp && !string.IsNullOrWhiteSpace(disc.VirtualIp))
            {
                _logger.LogWarning("[CLUSTER] Releasing Virtual IP {Vip} during demotion...", disc.VirtualIp);
                await _vipManager.ReleaseVirtualIpAsync(disc.VirtualIp, disc.NetworkInterfaceName, ct);
            }

            _state = ClusterNodeState.Standby;
            _logger.LogInformation("[CLUSTER] Local node demoted to STANDBY.");
        }

        public async Task<ClusterFailoverResultDto> AcquireVipManualAsync(CancellationToken ct = default)
        {
            await _transitionLock.WaitAsync(ct);
            try
            {
                var config = _configMonitor.CurrentValue;
                var disc = config.Discovery ?? new DiscoverySettings();

                if (string.IsNullOrWhiteSpace(disc.VirtualIp))
                {
                    return new ClusterFailoverResultDto
                    {
                        Success = false,
                        State = _state.ToString(),
                        IsVipBound = false,
                        Message = "Virtual IP is not configured in settings."
                    };
                }

                await PromoteToActiveAsync(disc, ct);

                bool isBound = await _vipManager.IsVirtualIpBoundLocallyAsync(disc.VirtualIp);
                return new ClusterFailoverResultDto
                {
                    Success = true,
                    State = _state.ToString(),
                    IsVipBound = isBound,
                    Message = $"Successfully promoted to Active and acquired Virtual IP {disc.VirtualIp}."
                };
            }
            finally
            {
                _transitionLock.Release();
            }
        }

        public async Task<ClusterFailoverResultDto> ReleaseVipManualAsync(CancellationToken ct = default)
        {
            await _transitionLock.WaitAsync(ct);
            try
            {
                var config = _configMonitor.CurrentValue;
                var disc = config.Discovery ?? new DiscoverySettings();

                if (string.IsNullOrWhiteSpace(disc.VirtualIp))
                {
                    return new ClusterFailoverResultDto
                    {
                        Success = true,
                        State = _state.ToString(),
                        IsVipBound = false,
                        Message = "Virtual IP is not configured."
                    };
                }

                var releaseRes = await _vipManager.ReleaseVirtualIpAsync(disc.VirtualIp, disc.NetworkInterfaceName, ct);
                if (string.Equals(disc.Role, ServerDiscoveryConstants.RoleActiveStandby, StringComparison.OrdinalIgnoreCase))
                {
                    _state = ClusterNodeState.Standby;
                }

                bool isBound = await _vipManager.IsVirtualIpBoundLocallyAsync(disc.VirtualIp);
                return new ClusterFailoverResultDto
                {
                    Success = releaseRes.Success,
                    State = _state.ToString(),
                    IsVipBound = isBound,
                    Message = releaseRes.Message
                };
            }
            finally
            {
                _transitionLock.Release();
            }
        }

        public async Task<ClusterFailoverResultDto> HandleHandoverNotificationAsync(string sourceNodeId, CancellationToken ct = default)
        {
            _logger.LogWarning("[CLUSTER HANDOVER] Received fast-failover handover notice from node '{SourceNode}'! Claiming leadership immediately...", sourceNodeId);

            await _transitionLock.WaitAsync(ct);
            try
            {
                var config = _configMonitor.CurrentValue;
                var disc = config.Discovery ?? new DiscoverySettings();

                await PromoteToActiveAsync(disc, ct);

                string cleanVip = disc.VirtualIp?.Trim() ?? string.Empty;
                bool isBound = !string.IsNullOrWhiteSpace(cleanVip) && await _vipManager.IsVirtualIpBoundLocallyAsync(cleanVip);

                return new ClusterFailoverResultDto
                {
                    Success = true,
                    State = _state.ToString(),
                    IsVipBound = isBound,
                    Message = $"Fast handover accepted from {sourceNodeId}. Node promoted to Active."
                };
            }
            finally
            {
                _transitionLock.Release();
            }
        }

        public async Task CedeLeadershipAsync(CancellationToken ct = default)
        {
            var config = _configMonitor.CurrentValue;
            var disc = config.Discovery ?? new DiscoverySettings();

            if (disc.Role == ServerDiscoveryConstants.RoleStandalone) return;

            // Notify partner of fast handover
            if (!string.IsNullOrWhiteSpace(disc.PartnerServerUrl))
            {
                try
                {
                    using var client = CreateClusterHttpClient();
                    string handoverUrl = disc.PartnerServerUrl.TrimEnd('/') + "/api/v1/cluster/failover/handover";

                    using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(2));
                    var payload = new { SourceNodeId = Environment.MachineName, TimestampUtc = DateTime.UtcNow };
                    await client.PostAsJsonAsync(handoverUrl, payload, cts.Token);
                    _logger.LogInformation("[CLUSTER] Notified partner {PartnerUrl} of leadership surrender.", disc.PartnerServerUrl);
                }
                catch (Exception ex)
                {
                    _logger.LogDebug(ex, "[CLUSTER] Could not notify partner during cede leadership");
                }
            }

            // Release Virtual IP
            if (disc.EnableVirtualIp && !string.IsNullOrWhiteSpace(disc.VirtualIp))
            {
                try
                {
                    await _vipManager.ReleaseVirtualIpAsync(disc.VirtualIp, disc.NetworkInterfaceName, ct);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "[CLUSTER] Error releasing VIP during cede leadership");
                }
            }

            _state = ClusterNodeState.Standby;
        }

        #endregion

        #region Dependency Helpers

        private StationOverridesService? GetOverridesService() => _serviceProvider?.GetService(typeof(StationOverridesService)) as StationOverridesService;
        private ISystemConfigDbSyncService? GetSyncService() => _serviceProvider?.GetService(typeof(ISystemConfigDbSyncService)) as ISystemConfigDbSyncService;
        private IServerRestartService? GetRestartService() => _serviceProvider?.GetService(typeof(IServerRestartService)) as IServerRestartService;

        #endregion

        #region Inter-Node C2 Coordination & Configuration Synchronization

        public async Task BroadcastStationStreamPolicyAsync(string hostname, bool enable, CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(hostname)) return;

            string localId = Environment.MachineName;
            _clusterDesiredStreamPolicies[hostname] = enable;

            // If remote station exists in local cache, update it immediately
            if (_remoteStationTelemetry.TryGetValue(hostname, out var remoteStation))
            {
                remoteStation.IsRecording = enable;
                if (_broadcastService != null)
                {
                    _ = _broadcastService.BroadcastAgentUpdateAsync(remoteStation);
                }
            }

            var payload = new ClusterStreamPolicyRequest
            {
                Hostname = hostname,
                Enable = enable,
                SourceNodeId = localId,
                TimestampUtc = DateTime.UtcNow
            };

            var peerNodes = _clusterNodes.Values
                .Where(n => n.IsOnline && !string.IsNullOrWhiteSpace(n.ApiBaseUrl) && !n.NodeId.Equals(localId, StringComparison.OrdinalIgnoreCase))
                .ToList();

            if (peerNodes.Count == 0) return;

            using var client = CreateClusterHttpClient();
            var tasks = peerNodes.Select(async node =>
            {
                try
                {
                    await client.PostAsJsonAsync($"{node.ApiBaseUrl.TrimEnd('/')}/api/v1/cluster/c2/stream-policy", payload, ct);
                }
                catch (Exception ex)
                {
                    _logger.LogDebug(ex, "[CLUSTER C2] Failed forwarding stream policy for {Host} to peer {Peer}", hostname, node.NodeId);
                }
            });

            await Task.WhenAll(tasks);
        }

        public async Task BroadcastFleetStreamPolicyAsync(IEnumerable<string> hostnames, bool enable, CancellationToken ct = default)
        {
            var list = hostnames.Where(h => !string.IsNullOrWhiteSpace(h)).Distinct(StringComparer.OrdinalIgnoreCase).ToList();
            if (list.Count == 0) return;

            string localId = Environment.MachineName;
            foreach (var h in list)
            {
                _clusterDesiredStreamPolicies[h] = enable;
                if (_remoteStationTelemetry.TryGetValue(h, out var remoteStation))
                {
                    remoteStation.IsRecording = enable;
                    if (_broadcastService != null)
                    {
                        _ = _broadcastService.BroadcastAgentUpdateAsync(remoteStation);
                    }
                }
            }

            var payload = new ClusterFleetStreamPolicyRequest
            {
                Hostnames = list,
                Enable = enable,
                SourceNodeId = localId,
                TimestampUtc = DateTime.UtcNow
            };

            var peerNodes = _clusterNodes.Values
                .Where(n => n.IsOnline && !string.IsNullOrWhiteSpace(n.ApiBaseUrl) && !n.NodeId.Equals(localId, StringComparison.OrdinalIgnoreCase))
                .ToList();

            if (peerNodes.Count == 0) return;

            using var client = CreateClusterHttpClient();
            var tasks = peerNodes.Select(async node =>
            {
                try
                {
                    await client.PostAsJsonAsync($"{node.ApiBaseUrl.TrimEnd('/')}/api/v1/cluster/c2/fleet-policy", payload, ct);
                }
                catch (Exception ex)
                {
                    _logger.LogDebug(ex, "[CLUSTER C2] Failed forwarding fleet policy to peer {Peer}", node.NodeId);
                }
            });

            await Task.WhenAll(tasks);
        }

        public void ApplyInterNodeStreamPolicy(ClusterStreamPolicyRequest req)
        {
            if (req == null || string.IsNullOrWhiteSpace(req.Hostname)) return;

            _clusterDesiredStreamPolicies[req.Hostname] = req.Enable;
            _telemetryState?.SetAgentStreamState(req.Hostname, req.Enable);

            // If locally hosted station, update and broadcast
            var localAgent = _telemetryState?.GetAllAgents().FirstOrDefault(a => string.Equals(a.Hostname, req.Hostname, StringComparison.OrdinalIgnoreCase));
            if (localAgent != null)
            {
                localAgent.IsRecording = req.Enable;
                if (_broadcastService != null)
                {
                    _ = _broadcastService.BroadcastAgentUpdateAsync(localAgent);
                }
            }
            else if (_remoteStationTelemetry.TryGetValue(req.Hostname, out var remoteStation))
            {
                remoteStation.IsRecording = req.Enable;
                if (_broadcastService != null)
                {
                    _ = _broadcastService.BroadcastAgentUpdateAsync(remoteStation);
                }
            }
        }

        public void ApplyInterNodeFleetStreamPolicy(ClusterFleetStreamPolicyRequest req)
        {
            if (req == null || req.Hostnames == null) return;
            foreach (var h in req.Hostnames)
            {
                ApplyInterNodeStreamPolicy(new ClusterStreamPolicyRequest
                {
                    Hostname = h,
                    Enable = req.Enable,
                    SourceNodeId = req.SourceNodeId
                });
            }
        }

        public async Task BroadcastStationOverrideAsync(string hostname, string? videoBitrate, int? targetFps, bool isDelete = false, CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(hostname)) return;

            string localId = Environment.MachineName;
            var payload = new ClusterStationOverrideRequest
            {
                Hostname = hostname,
                VideoBitrate = videoBitrate,
                TargetFps = targetFps,
                IsDelete = isDelete,
                SourceNodeId = localId,
                TimestampUtc = DateTime.UtcNow
            };

            var peerNodes = _clusterNodes.Values
                .Where(n => n.IsOnline && !string.IsNullOrWhiteSpace(n.ApiBaseUrl) && !n.NodeId.Equals(localId, StringComparison.OrdinalIgnoreCase))
                .ToList();

            if (peerNodes.Count == 0) return;

            using var client = CreateClusterHttpClient();
            var tasks = peerNodes.Select(async node =>
            {
                try
                {
                    await client.PostAsJsonAsync($"{node.ApiBaseUrl.TrimEnd('/')}/api/v1/cluster/c2/station-override", payload, ct);
                }
                catch (Exception ex)
                {
                    _logger.LogDebug(ex, "[CLUSTER C2] Failed forwarding station override for {Host} to peer {Peer}", hostname, node.NodeId);
                }
            });

            await Task.WhenAll(tasks);
        }

        public async Task ApplyInterNodeStationOverrideAsync(ClusterStationOverrideRequest req)
        {
            if (req == null || string.IsNullOrWhiteSpace(req.Hostname)) return;

            var overridesService = GetOverridesService();
            if (overridesService != null)
            {
                if (req.IsDelete)
                {
                    await overridesService.RemoveOverrideAsync(req.Hostname);
                }
                else
                {
                    await overridesService.SetOverrideAsync(req.Hostname, new StationOverride
                    {
                        VideoBitrate = req.VideoBitrate,
                        TargetFps = req.TargetFps
                    });
                }
            }
        }

        public async Task PropagateClusterConfigAsync(SystemConfig config, CancellationToken ct = default)
        {
            if (config == null) return;
            string localId = Environment.MachineName;

            var payload = new ClusterConfigSyncRequest
            {
                SourceNodeId = localId,
                SystemConfig = config,
                TimestampUtc = DateTime.UtcNow
            };

            var peerNodes = _clusterNodes.Values
                .Where(n => n.IsOnline && !string.IsNullOrWhiteSpace(n.ApiBaseUrl) && !n.NodeId.Equals(localId, StringComparison.OrdinalIgnoreCase))
                .ToList();

            if (peerNodes.Count == 0) return;

            using var client = CreateClusterHttpClient();
            var tasks = peerNodes.Select(async node =>
            {
                try
                {
                    await client.PostAsJsonAsync($"{node.ApiBaseUrl.TrimEnd('/')}/api/v1/cluster/c2/sync-config", payload, ct);
                }
                catch (Exception ex)
                {
                    _logger.LogDebug(ex, "[CLUSTER C2] Failed propagating config to peer {Peer}", node.NodeId);
                }
            });

            await Task.WhenAll(tasks);
        }

        public async Task ApplyInterNodeConfigSyncAsync(ClusterConfigSyncRequest req)
        {
            if (req == null || req.SystemConfig == null) return;
            var syncService = GetSyncService();
            if (syncService != null)
            {
                await syncService.UpdateSystemConfigAsync(c =>
                {
                    c.RecordingRetentionDays = req.SystemConfig.RecordingRetentionDays;
                    c.MaxStorageQuotaGb = req.SystemConfig.MaxStorageQuotaGb;
                    c.DefaultTargetFps = req.SystemConfig.DefaultTargetFps;
                    c.DefaultVideoBitrate = req.SystemConfig.DefaultVideoBitrate;
                    c.DisplayTimezone = req.SystemConfig.DisplayTimezone;
                    c.DisplayLocale = req.SystemConfig.DisplayLocale;

                    if (req.SystemConfig.Storage != null)
                    {
                        c.Storage ??= new StorageSettings();
                        c.Storage.NetAppUncPath = req.SystemConfig.Storage.NetAppUncPath;
                        c.Storage.LocalFallbackPath = req.SystemConfig.Storage.LocalFallbackPath;
                        c.Storage.ChunkIntervalMinutes = req.SystemConfig.Storage.ChunkIntervalMinutes;
                        c.Storage.RetentionDays = req.SystemConfig.Storage.RetentionDays;
                        c.Storage.RecordFormat = req.SystemConfig.Storage.RecordFormat;
                    }

                    if (req.SystemConfig.MediaMtx != null)
                    {
                        c.MediaMtx ??= new MediaMtxSettings();
                        c.MediaMtx.RtmpPort = req.SystemConfig.MediaMtx.RtmpPort;
                        c.MediaMtx.HlsPort = req.SystemConfig.MediaMtx.HlsPort;
                        c.MediaMtx.ApiPort = req.SystemConfig.MediaMtx.ApiPort;
                        c.MediaMtx.HlsSegmentDuration = req.SystemConfig.MediaMtx.HlsSegmentDuration;
                    }

                    if (req.SystemConfig.Discovery != null)
                    {
                        c.Discovery ??= new DiscoverySettings();
                        c.Discovery.Role = req.SystemConfig.Discovery.Role;
                        c.Discovery.ClusterGroup = req.SystemConfig.Discovery.ClusterGroup;
                        c.Discovery.VirtualIp = req.SystemConfig.Discovery.VirtualIp;
                        c.Discovery.VirtualIpSubnetMask = req.SystemConfig.Discovery.VirtualIpSubnetMask;
                        c.Discovery.EnableVirtualIp = req.SystemConfig.Discovery.EnableVirtualIp;
                    }
                });
            }
        }

        #endregion

        #region Remote Node Lifecycle & Maintenance Operations

        public async Task<ClusterActionResultDto> SetNodeDrainingAsync(string nodeId, bool enableDraining, CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(nodeId)) return new ClusterActionResultDto { Success = false, Message = "NodeId is required." };

            string localId = Environment.MachineName;
            string targetState = enableDraining ? ClusterNodeState.Draining.ToString() : ClusterNodeState.Active.ToString();

            if (nodeId.Equals(localId, StringComparison.OrdinalIgnoreCase))
            {
                _state = enableDraining ? ClusterNodeState.Draining : ClusterNodeState.Active;
                if (_clusterNodes.TryGetValue(localId, out var localDesc))
                {
                    localDesc.State = targetState;
                }

                // If local node was orchestrator and is now draining, gracefully transfer leadership to next active node
                if (enableDraining && string.Equals(_orchestratorNodeId, localId, StringComparison.OrdinalIgnoreCase))
                {
                    var nextCandidate = _clusterNodes.Values
                        .Where(n => n.IsOnline && !n.IsDraining && !n.IsStandby && !n.NodeId.Equals(localId, StringComparison.OrdinalIgnoreCase))
                        .OrderByDescending(n => n.Priority)
                        .ThenByDescending(n => n.HardwareCapabilityScore)
                        .FirstOrDefault();

                    if (nextCandidate != null)
                    {
                        _logger.LogWarning("[CLUSTER DRAIN] Orchestrator is draining. Transferring leadership to '{NextNode}'...", nextCandidate.NodeId);
                        _ = TransferOrchestratorRoleAsync(nextCandidate.NodeId, ct);
                    }
                }

                _logger.LogWarning("[CLUSTER NODE] Local node {LocalId} state set to {State}", localId, targetState);
                return new ClusterActionResultDto { Success = true, Message = $"Node '{localId}' state changed to {targetState}.", TargetNodeId = localId, State = targetState };
            }

            // Remote node
            if (_clusterNodes.TryGetValue(nodeId, out var remoteNode) && !string.IsNullOrWhiteSpace(remoteNode.ApiBaseUrl))
            {
                try
                {
                    using var client = CreateClusterHttpClient();
                    var res = await client.PostAsync($"{remoteNode.ApiBaseUrl.TrimEnd('/')}/api/v1/cluster/nodes/{nodeId}/drain?enable={enableDraining}", null, ct);
                    if (res.IsSuccessStatusCode)
                    {
                        remoteNode.State = targetState;
                        return new ClusterActionResultDto { Success = true, Message = $"Remote node '{nodeId}' set to {targetState}.", TargetNodeId = nodeId, State = targetState };
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "[CLUSTER NODE] Failed to set draining on remote node {NodeId}", nodeId);
                    return new ClusterActionResultDto { Success = false, Message = $"Failed contacting remote node '{nodeId}': {ex.Message}", TargetNodeId = nodeId };
                }
            }

            return new ClusterActionResultDto { Success = false, Message = $"Node '{nodeId}' not found in cluster registry.", TargetNodeId = nodeId };
        }

        public async Task<ClusterActionResultDto> RestartNodeAsync(string nodeId, CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(nodeId)) return new ClusterActionResultDto { Success = false, Message = "NodeId is required." };

            string localId = Environment.MachineName;

            if (nodeId.Equals(localId, StringComparison.OrdinalIgnoreCase) || nodeId.Equals("all", StringComparison.OrdinalIgnoreCase))
            {
                _logger.LogWarning("[CLUSTER NODE] Restart scheduled for local node {LocalId}", localId);
                var restartSvc = GetRestartService();
                restartSvc?.ScheduleRestart(1500);

                if (!nodeId.Equals("all", StringComparison.OrdinalIgnoreCase))
                {
                    return new ClusterActionResultDto { Success = true, Message = $"Restart sequence scheduled for node '{localId}'.", TargetNodeId = localId };
                }
            }

            if (nodeId.Equals("all", StringComparison.OrdinalIgnoreCase))
            {
                var peers = _clusterNodes.Values
                    .Where(n => n.IsOnline && !string.IsNullOrWhiteSpace(n.ApiBaseUrl) && !n.NodeId.Equals(localId, StringComparison.OrdinalIgnoreCase))
                    .ToList();

                using var client = CreateClusterHttpClient();
                foreach (var p in peers)
                {
                    try
                    {
                        _ = client.PostAsync($"{p.ApiBaseUrl.TrimEnd('/')}/api/v1/cluster/nodes/{p.NodeId}/restart", null, ct);
                    }
                    catch { }
                }

                return new ClusterActionResultDto { Success = true, Message = "Cluster-wide restart sequence initiated.", TargetNodeId = "all" };
            }

            // Remote node
            if (_clusterNodes.TryGetValue(nodeId, out var remoteNode) && !string.IsNullOrWhiteSpace(remoteNode.ApiBaseUrl))
            {
                try
                {
                    using var client = CreateClusterHttpClient();
                    var res = await client.PostAsync($"{remoteNode.ApiBaseUrl.TrimEnd('/')}/api/v1/cluster/nodes/{nodeId}/restart", null, ct);
                    if (res.IsSuccessStatusCode)
                    {
                        return new ClusterActionResultDto { Success = true, Message = $"Restart command sent successfully to remote node '{nodeId}'.", TargetNodeId = nodeId };
                    }
                }
                catch (Exception ex)
                {
                    return new ClusterActionResultDto { Success = false, Message = $"Failed contacting node '{nodeId}': {ex.Message}", TargetNodeId = nodeId };
                }
            }

            return new ClusterActionResultDto { Success = false, Message = $"Node '{nodeId}' not found.", TargetNodeId = nodeId };
        }

        public async Task<ClusterActionResultDto> UpdateNodeCapacitiesAsync(string nodeId, ClusterNodeCapacitiesUpdateRequest req, CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(nodeId) || req == null) return new ClusterActionResultDto { Success = false, Message = "Invalid request." };

            string localId = Environment.MachineName;

            if (nodeId.Equals(localId, StringComparison.OrdinalIgnoreCase))
            {
                var syncService = GetSyncService();
                if (syncService != null)
                {
                    await syncService.UpdateSystemConfigAsync(c =>
                    {
                        c.Discovery ??= new DiscoverySettings();
                        if (req.MaxStreamsCapacity.HasValue && req.MaxStreamsCapacity.Value > 0)
                            c.Discovery.MaxIngestStreamsCapacity = req.MaxStreamsCapacity.Value;
                        if (req.MaxConcurrentJobs.HasValue && req.MaxConcurrentJobs.Value > 0)
                            c.Discovery.MaxConcurrentRenderJobs = req.MaxConcurrentJobs.Value;
                        if (!string.IsNullOrWhiteSpace(req.NodeMode))
                            c.Discovery.NodeMode = req.NodeMode;
                    });
                }

                RegisterLocalNodeInRegistry();
                return new ClusterActionResultDto { Success = true, Message = $"Capacities updated for local node '{localId}'.", TargetNodeId = localId };
            }

            // Remote node
            if (_clusterNodes.TryGetValue(nodeId, out var remoteNode) && !string.IsNullOrWhiteSpace(remoteNode.ApiBaseUrl))
            {
                try
                {
                    using var client = CreateClusterHttpClient();
                    var res = await client.PostAsJsonAsync($"{remoteNode.ApiBaseUrl.TrimEnd('/')}/api/v1/cluster/nodes/{nodeId}/capacities", req, ct);
                    if (res.IsSuccessStatusCode)
                    {
                        if (req.MaxStreamsCapacity.HasValue && req.MaxStreamsCapacity.Value > 0)
                            remoteNode.MaxStreamsCapacity = req.MaxStreamsCapacity.Value;
                        if (req.MaxConcurrentJobs.HasValue && req.MaxConcurrentJobs.Value > 0)
                            remoteNode.MaxConcurrentJobs = req.MaxConcurrentJobs.Value;
                        if (!string.IsNullOrWhiteSpace(req.NodeMode))
                            remoteNode.NodeMode = req.NodeMode;

                        return new ClusterActionResultDto { Success = true, Message = $"Capacities updated for remote node '{nodeId}'.", TargetNodeId = nodeId };
                    }
                }
                catch (Exception ex)
                {
                    return new ClusterActionResultDto { Success = false, Message = $"Failed contacting node '{nodeId}': {ex.Message}", TargetNodeId = nodeId };
                }
            }

            return new ClusterActionResultDto { Success = false, Message = $"Node '{nodeId}' not found.", TargetNodeId = nodeId };
        }

        public bool IsLocalNodeOrchestrator => string.Equals(_orchestratorNodeId, Environment.MachineName, StringComparison.OrdinalIgnoreCase);

        public ClusterNodeDescriptor? GetOrchestratorNode()
        {
            if (!string.IsNullOrEmpty(_orchestratorNodeId) && _clusterNodes.TryGetValue(_orchestratorNodeId, out var orch))
            {
                return orch;
            }
            return _clusterNodes.Values.FirstOrDefault(n => n.IsOrchestrator && n.IsOnline)
                ?? _clusterNodes.Values.FirstOrDefault(n => n.IsOnline);
        }

        public async Task<ClusterActionResultDto> SetNodeModeAsync(string nodeId, string mode, CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(nodeId)) return new ClusterActionResultDto { Success = false, Message = "NodeId is required." };
            string normalizedMode = string.Equals(mode, "Standby", StringComparison.OrdinalIgnoreCase)
                ? ServerDiscoveryConstants.NodeModeStandby
                : ServerDiscoveryConstants.NodeModeActive;

            string localId = Environment.MachineName;
            if (nodeId.Equals(localId, StringComparison.OrdinalIgnoreCase))
            {
                if (_clusterNodes.TryGetValue(localId, out var localDesc))
                {
                    localDesc.NodeMode = normalizedMode;
                    localDesc.State = normalizedMode == ServerDiscoveryConstants.NodeModeStandby
                        ? ClusterNodeState.Standby.ToString()
                        : ClusterNodeState.Active.ToString();
                }

                var syncService = GetSyncService();
                if (syncService != null)
                {
                    await syncService.UpdateSystemConfigAsync(c =>
                    {
                        c.Discovery ??= new DiscoverySettings();
                        c.Discovery.NodeMode = normalizedMode;
                        c.Discovery.NodeRole = normalizedMode == ServerDiscoveryConstants.NodeModeStandby
                            ? ServerDiscoveryConstants.RoleSecondary
                            : ServerDiscoveryConstants.RoleWorker;
                    });
                }

                await BroadcastNodeModeAsync(nodeId, normalizedMode, ct);
                return new ClusterActionResultDto { Success = true, Message = $"Local node backup mode set to '{normalizedMode}'.", TargetNodeId = localId };
            }

            // Remote node
            if (_clusterNodes.TryGetValue(nodeId, out var remoteNode) && !string.IsNullOrWhiteSpace(remoteNode.ApiBaseUrl))
            {
                try
                {
                    using var client = CreateClusterHttpClient();
                    var res = await client.PostAsync($"{remoteNode.ApiBaseUrl.TrimEnd('/')}/api/v1/cluster/nodes/{nodeId}/mode?mode={normalizedMode}", null, ct);
                    if (res.IsSuccessStatusCode)
                    {
                        remoteNode.NodeMode = normalizedMode;
                        remoteNode.State = normalizedMode == ServerDiscoveryConstants.NodeModeStandby
                            ? ClusterNodeState.Standby.ToString()
                            : ClusterNodeState.Active.ToString();

                        await BroadcastNodeModeAsync(nodeId, normalizedMode, ct);
                        return new ClusterActionResultDto { Success = true, Message = $"Node '{nodeId}' backup mode set to '{normalizedMode}'.", TargetNodeId = nodeId };
                    }
                }
                catch (Exception ex)
                {
                    return new ClusterActionResultDto { Success = false, Message = $"Failed contacting node '{nodeId}': {ex.Message}", TargetNodeId = nodeId };
                }
            }

            return new ClusterActionResultDto { Success = false, Message = $"Node '{nodeId}' not found.", TargetNodeId = nodeId };
        }

        public async Task BroadcastNodeModeAsync(string nodeId, string mode, CancellationToken ct = default)
        {
            var req = new ClusterNodeModeRequest { NodeId = nodeId, Mode = mode };
            var peers = _clusterNodes.Values
                .Where(n => n.IsOnline && !string.IsNullOrWhiteSpace(n.ApiBaseUrl) && !n.NodeId.Equals(Environment.MachineName, StringComparison.OrdinalIgnoreCase))
                .ToList();

            using var client = CreateClusterHttpClient();
            foreach (var peer in peers)
            {
                try
                {
                    _ = client.PostAsJsonAsync($"{peer.ApiBaseUrl.TrimEnd('/')}/api/v1/cluster/c2/node-mode", req, ct);
                }
                catch { }
            }
        }

        public void ApplyInterNodeNodeMode(ClusterNodeModeRequest req)
        {
            if (req == null || string.IsNullOrWhiteSpace(req.NodeId)) return;
            if (_clusterNodes.TryGetValue(req.NodeId, out var node))
            {
                node.NodeMode = req.Mode;
                node.State = string.Equals(req.Mode, ServerDiscoveryConstants.NodeModeStandby, StringComparison.OrdinalIgnoreCase)
                    ? ClusterNodeState.Standby.ToString()
                    : ClusterNodeState.Active.ToString();
                _logger.LogInformation("[CLUSTER C2] Applied inter-node backup mode for '{NodeId}' -> '{Mode}'", req.NodeId, req.Mode);
            }
        }

        #endregion

        private HttpClient CreateClusterHttpClient()
        {
            var handler = new HttpClientHandler
            {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            };
            return new HttpClient(handler)
            {
                Timeout = TimeSpan.FromSeconds(2)
            };
        }
    }
}
