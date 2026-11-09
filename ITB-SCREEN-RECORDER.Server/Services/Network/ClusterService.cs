// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Services/Network/ClusterService.cs
// ==========================================
using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
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
        private readonly DateTime _startTimeUtc = DateTime.UtcNow;

        private ClusterNodeState _state = ClusterNodeState.Standalone;
        private int _failoverCount = 0;
        private DateTime? _lastHeartbeatUtc;
        private string _partnerStatus = "Unknown";
        private bool _partnerIsVipOwner = false;
        private int _consecutiveMissedHeartbeats = 0;
        private readonly SemaphoreSlim _transitionLock = new(1, 1);

        public ClusterService(
            IOptionsMonitor<SystemConfig> configMonitor,
            IVirtualIpManager vipManager,
            IHttpClientFactory httpClientFactory,
            IHostApplicationLifetime appLifetime,
            ILogger<ClusterService> logger)
        {
            _configMonitor = configMonitor;
            _vipManager = vipManager;
            _httpClientFactory = httpClientFactory;
            _logger = logger;

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

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("[CLUSTER] Initializing High-Availability Cluster supervision...");

            // Initial startup state resolution
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
                    // Primary or Active-Active node
                    _state = ClusterNodeState.Active;
                    _logger.LogInformation("[CLUSTER] Initialized as ACTIVE ({Role}/{NodeRole}).", disc.Role, disc.NodeRole);

                    if (disc.EnableVirtualIp && !string.IsNullOrWhiteSpace(disc.VirtualIp))
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
                cts.CancelAfter(TimeSpan.FromMilliseconds(1500)); // Quick 1.5s sub-second timeout

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
                    // Partner is alive!
                    _consecutiveMissedHeartbeats = 0;
                    _lastHeartbeatUtc = DateTime.UtcNow;
                    _partnerStatus = partnerHealth.State;
                    _partnerIsVipOwner = partnerHealth.IsVipOwner;

                    // Evaluate transitions in Active-Standby mode
                    bool isStandbyCluster = string.Equals(disc.Role, ServerDiscoveryConstants.RoleActiveStandby, StringComparison.OrdinalIgnoreCase);

                    if (isStandbyCluster)
                    {
                        if (_state == ClusterNodeState.Standby)
                        {
                            // If partner surrendered or is demoted to Standby, promote ourselves!
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
                            // Split-brain check: If BOTH nodes are Active, lower priority demotes to avoid IP collision!
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
                    // Heartbeat missed!
                    _consecutiveMissedHeartbeats++;
                    _logger.LogDebug("[CLUSTER] Missed heartbeat {Count}/{Threshold} from partner {PartnerUrl}",
                        _consecutiveMissedHeartbeats, disc.HeartbeatMissedThreshold, disc.PartnerServerUrl);

                    if (_consecutiveMissedHeartbeats >= disc.HeartbeatMissedThreshold)
                    {
                        _partnerStatus = "Unreachable";

                        // FAILOVER PROMOTION: If this node is Standby and Partner died, Promote to Active!
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
