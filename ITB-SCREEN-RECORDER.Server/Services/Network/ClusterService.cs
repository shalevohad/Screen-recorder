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
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
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
        private string _orchestratorNodeId = string.Empty;

        public ClusterService(
            IOptionsMonitor<SystemConfig> configMonitor,
            IVirtualIpManager vipManager,
            IHttpClientFactory httpClientFactory,
            IHostApplicationLifetime appLifetime,
            ILogger<ClusterService> logger,
            ITelemetryStateService? telemetryState = null)
        {
            _configMonitor = configMonitor;
            _vipManager = vipManager;
            _httpClientFactory = httpClientFactory;
            _logger = logger;
            _telemetryState = telemetryState;

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
                MaxStreamsCapacity = disc.MaxIngestStreamsCapacity > 0 ? disc.MaxIngestStreamsCapacity : 50,
                MaxConcurrentJobs = disc.MaxConcurrentRenderJobs > 0 ? disc.MaxConcurrentRenderJobs : 2,
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
            bool isLocalOrch = !string.IsNullOrEmpty(_orchestratorNodeId)
                ? string.Equals(_orchestratorNodeId, localId, StringComparison.OrdinalIgnoreCase)
                : (string.Equals(disc.NodeRole, ServerDiscoveryConstants.RoleOrchestrator, StringComparison.OrdinalIgnoreCase) ||
                   string.Equals(disc.NodeRole, ServerDiscoveryConstants.RolePrimary, StringComparison.OrdinalIgnoreCase));

            string cleanVip = disc.VirtualIp?.Trim() ?? string.Empty;
            bool isVipBound = !string.IsNullOrWhiteSpace(cleanVip) &&
                              _vipManager.IsVirtualIpBoundLocallyAsync(cleanVip).GetAwaiter().GetResult();

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
                OnlineNodesCount = nodesList.Count(n => n.IsOnline),
                TotalIngestedStreams = nodesList.Sum(n => n.ActiveStreamsCount),
                TotalStreamsCapacity = nodesList.Sum(n => n.MaxStreamsCapacity),
                TotalActiveRenderJobs = nodesList.Sum(n => n.ActiveJobsCount),
                TotalConcurrentJobsCapacity = nodesList.Sum(n => n.MaxConcurrentJobs),
                EnableVirtualIp = disc.EnableVirtualIp,
                VirtualIp = disc.VirtualIp,
                IsVipBoundLocally = isVipBound,
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

        public Task<ClusterHeartbeatResponse> ProcessNodeHeartbeatAsync(ClusterHeartbeatRequest request, CancellationToken ct = default)
        {
            if (request == null || request.Node == null || string.IsNullOrWhiteSpace(request.Node.NodeId))
            {
                return Task.FromResult(new ClusterHeartbeatResponse { Acknowledged = false });
            }

            var node = request.Node;
            node.LastSeenUtc = DateTime.UtcNow;
            node.State = ClusterNodeState.Active.ToString();
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
                    }
                }
            }

            string localId = Environment.MachineName;
            var response = new ClusterHeartbeatResponse
            {
                Acknowledged = true,
                OrchestratorNodeId = !string.IsNullOrEmpty(_orchestratorNodeId) ? _orchestratorNodeId : localId,
                IsLocalNodeOrchestrator = string.Equals(_orchestratorNodeId, localId, StringComparison.OrdinalIgnoreCase),
                ActiveNodes = _clusterNodes.Values.Where(n => n.IsOnline).ToList(),
                AssignedStations = node.AssignedStations ?? new List<string>(),
                ServerUtcTime = DateTime.UtcNow
            };

            return Task.FromResult(response);
        }

        public Task<string?> ResolveAssignedIngestNodeUrlAsync(string stationHostname, CancellationToken ct = default)
        {
            var config = _configMonitor.CurrentValue;
            var disc = config?.Discovery ?? new DiscoverySettings();

            if (!string.Equals(disc.Role, ServerDiscoveryConstants.RoleActiveActive, StringComparison.OrdinalIgnoreCase))
            {
                return Task.FromResult<string?>(null);
            }

            // Check existing affinity
            if (_stationToNodeMap.TryGetValue(stationHostname, out string? existingNodeId))
            {
                if (_clusterNodes.TryGetValue(existingNodeId, out var existingNode) && existingNode.IsOnline)
                {
                    return Task.FromResult<string?>(existingNode.RtmpBaseUrl);
                }
            }

            // Find least loaded online node (preferring Active nodes; Standby nodes kept as hot spares)
            var onlineNodes = _clusterNodes.Values.Where(n => n.IsOnline).ToList();
            if (onlineNodes.Count == 0) return Task.FromResult<string?>(null);

            var candidateNodes = onlineNodes.Where(n => !n.IsStandby).ToList();
            if (candidateNodes.Count == 0) candidateNodes = onlineNodes;

            var chosenNode = candidateNodes
                .OrderBy(n => n.LoadRatio)
                .ThenBy(n => n.ActiveStreamsCount)
                .ThenBy(n => n.HostCpuPct)
                .First();

            _stationToNodeMap[stationHostname] = chosenNode.NodeId;
            chosenNode.ActiveStreamsCount++;
            if (!chosenNode.AssignedStations.Contains(stationHostname, StringComparer.OrdinalIgnoreCase))
            {
                chosenNode.AssignedStations.Add(stationHostname);
            }

            _logger.LogInformation("[CLUSTER BALANCER] Ingest assignment: Workstation '{Station}' -> Node '{NodeId}' ({RtmpUrl}, Load: {Load}%)",
                stationHostname, chosenNode.NodeId, chosenNode.RtmpBaseUrl, Math.Round(chosenNode.LoadRatio * 100, 1));

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

            var candidateNodes = onlineNodes.Where(n => !n.IsStandby).ToList();
            if (candidateNodes.Count == 0) candidateNodes = onlineNodes;

            // Prefer nodes with spare job capacity (ActiveJobsCount < MaxConcurrentJobs)
            var availableNodes = candidateNodes.Where(n => n.ActiveJobsCount < n.MaxConcurrentJobs).ToList();
            ClusterNodeDescriptor selected;
            if (availableNodes.Count > 0)
            {
                selected = availableNodes
                    .OrderBy(n => n.ActiveJobsCount)
                    .ThenBy(n => n.GpuNvencPct)
                    .ThenBy(n => n.HostCpuPct)
                    .First();
            }
            else
            {
                selected = candidateNodes
                    .OrderBy(n => n.ActiveJobsCount)
                    .ThenBy(n => n.HostCpuPct)
                    .First();
            }

            _logger.LogInformation("[CLUSTER JOB DISPATCHER] Selected worker node '{NodeId}' (Active Jobs: {Jobs}/{Max}, CPU: {Cpu}%, GPU: {Gpu}%)",
                selected.NodeId, selected.ActiveJobsCount, selected.MaxConcurrentJobs, selected.HostCpuPct, selected.GpuNvencPct);

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

        public void UpdateJobStatus(ClusterJobStatusDto status)
        {
            if (status == null || string.IsNullOrWhiteSpace(status.JobId)) return;
            status.UpdatedAtUtc = DateTime.UtcNow;
            _clusterJobs[status.JobId] = status;

            // Update node job counter
            if (!string.IsNullOrEmpty(status.ExecutingNodeId) && _clusterNodes.TryGetValue(status.ExecutingNodeId, out var node))
            {
                node.ActiveJobsCount = _clusterJobs.Values.Count(j =>
                    j.ExecutingNodeId.Equals(node.NodeId, StringComparison.OrdinalIgnoreCase) &&
                    (j.Status == "Processing" || j.Status == "Queued"));
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
                MaxStreamsCapacity = disc.MaxIngestStreamsCapacity > 0 ? disc.MaxIngestStreamsCapacity : 50,
                ActiveJobsCount = localDesc?.ActiveJobsCount ?? 0,
                MaxConcurrentJobs = disc.MaxConcurrentRenderJobs > 0 ? disc.MaxConcurrentRenderJobs : 2,
                HostCpuPct = localDesc?.HostCpuPct ?? 0,
                GpuNvencPct = localDesc?.GpuNvencPct ?? 0,
                IsVipBound = isVipBound,
                LocalIps = localIps,
                AssignedStations = localDesc?.AssignedStations ?? new List<string>(),
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

            // Update or register discovered peer node
            var node = _clusterNodes.GetOrAdd(beacon.NodeId, id => new ClusterNodeDescriptor { NodeId = id });
            node.DisplayName = !string.IsNullOrWhiteSpace(beacon.DisplayName) ? beacon.DisplayName : beacon.NodeId;
            node.ApiBaseUrl = beacon.ApiBaseUrl;
            node.RtmpBaseUrl = beacon.RtmpBaseUrl;
            node.HlsBaseUrl = beacon.HlsBaseUrl;
            node.WhepPort = beacon.WhepPort;
            node.Role = beacon.NodeRole;
            node.NodeMode = beacon.NodeMode;
            node.State = string.Equals(beacon.NodeMode, ServerDiscoveryConstants.NodeModeStandby, StringComparison.OrdinalIgnoreCase)
                ? ClusterNodeState.Standby.ToString()
                : ClusterNodeState.Active.ToString();
            node.Priority = beacon.Priority;
            node.ActiveStreamsCount = beacon.ActiveStreamsCount;
            node.MaxStreamsCapacity = beacon.MaxStreamsCapacity > 0 ? beacon.MaxStreamsCapacity : 50;
            node.ActiveJobsCount = beacon.ActiveJobsCount;
            node.MaxConcurrentJobs = beacon.MaxConcurrentJobs > 0 ? beacon.MaxConcurrentJobs : 2;
            node.HostCpuPct = beacon.HostCpuPct;
            node.GpuNvencPct = beacon.GpuNvencPct;
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
