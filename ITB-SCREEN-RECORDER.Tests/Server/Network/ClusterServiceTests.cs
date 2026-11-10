// ==========================================
// File: ITB-SCREEN-RECORDER.Tests/Server/Network/ClusterServiceTests.cs
// ==========================================
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Server.Services.Network;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Server.Network
{
    public class ClusterServiceTests
    {
        private static (Mock<IOptionsMonitor<SystemConfig>> mockConfig, Mock<IVirtualIpManager> mockVip, Mock<IHttpClientFactory> mockHttp, Mock<IHostApplicationLifetime> mockLifetime, Mock<ILogger<ClusterService>> mockLogger) CreateMocks(SystemConfig config)
        {
            var mockConfig = new Mock<IOptionsMonitor<SystemConfig>>();
            mockConfig.Setup(c => c.CurrentValue).Returns(config);

            var mockVip = new Mock<IVirtualIpManager>();
            mockVip.Setup(v => v.IsVirtualIpBoundLocallyAsync(It.IsAny<string>()))
                .ReturnsAsync(false);
            mockVip.Setup(v => v.AcquireVirtualIpAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new VipOperationResult(true, "Acquired"));
            mockVip.Setup(v => v.ReleaseVirtualIpAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new VipOperationResult(true, "Released"));
            mockVip.Setup(v => v.ResolveActiveInterfaceName(It.IsAny<string>()))
                .Returns("Ethernet0");

            var mockHttp = new Mock<IHttpClientFactory>();
            var mockLifetime = new Mock<IHostApplicationLifetime>();
            var mockLogger = new Mock<ILogger<ClusterService>>();

            return (mockConfig, mockVip, mockHttp, mockLifetime, mockLogger);
        }

        [Fact]
        public void Standalone_InitializesAsActiveStandalone()
        {
            var config = new SystemConfig
            {
                Discovery = new DiscoverySettings
                {
                    Role = "Standalone"
                }
            };

            var (mockConfig, mockVip, mockHttp, mockLifetime, mockLogger) = CreateMocks(config);
            var service = new ClusterService(mockConfig.Object, mockVip.Object, mockHttp.Object, mockLifetime.Object, mockLogger.Object);
            var status = service.GetClusterStatus();

            Assert.Equal("Standalone", status.State);
            Assert.True(status.IsActive);
            Assert.False(status.IsStandby);
        }

        [Fact]
        public void ActiveActive_InitializesAsActive()
        {
            var config = new SystemConfig
            {
                Discovery = new DiscoverySettings
                {
                    Role = "Active-Active",
                    NodeRole = "Primary"
                }
            };

            var (mockConfig, mockVip, mockHttp, mockLifetime, mockLogger) = CreateMocks(config);
            var service = new ClusterService(mockConfig.Object, mockVip.Object, mockHttp.Object, mockLifetime.Object, mockLogger.Object);
            var status = service.GetClusterStatus();

            Assert.Equal("Active", status.State);
            Assert.True(status.IsActive);
            Assert.False(status.IsStandby);
        }

        [Fact]
        public async Task ActiveStandby_Primary_InitializesAsActiveAndClaimsVip()
        {
            var config = new SystemConfig
            {
                Discovery = new DiscoverySettings
                {
                    Role = "Active-Standby",
                    NodeRole = "Primary",
                    EnableVirtualIp = true,
                    VirtualIp = "192.168.1.200",
                    VirtualIpSubnetMask = "255.255.255.0",
                    NetworkInterfaceName = "Ethernet0"
                }
            };

            var (mockConfig, mockVip, mockHttp, mockLifetime, mockLogger) = CreateMocks(config);
            var service = new ClusterService(mockConfig.Object, mockVip.Object, mockHttp.Object, mockLifetime.Object, mockLogger.Object);

            using var cts = new CancellationTokenSource();
            await service.StartAsync(cts.Token);
            await Task.Delay(50);
            await service.StopAsync(CancellationToken.None);

            var status = service.GetClusterStatus();

            Assert.Equal("Active", status.State);
            Assert.True(status.IsActive);
            Assert.False(status.IsStandby);

            mockVip.Verify(v => v.AcquireVirtualIpAsync("192.168.1.200", "255.255.255.0", "Ethernet0", It.IsAny<CancellationToken>()), Times.Once);
        }

        [Fact]
        public void ActiveStandby_Secondary_InitializesAsStandbyAndDoesNotClaimVip()
        {
            var config = new SystemConfig
            {
                Discovery = new DiscoverySettings
                {
                    Role = "Active-Standby",
                    NodeRole = "Secondary",
                    EnableVirtualIp = true,
                    VirtualIp = "192.168.1.200",
                    VirtualIpSubnetMask = "255.255.255.0",
                    NetworkInterfaceName = "Ethernet0"
                }
            };

            var (mockConfig, mockVip, mockHttp, mockLifetime, mockLogger) = CreateMocks(config);
            var service = new ClusterService(mockConfig.Object, mockVip.Object, mockHttp.Object, mockLifetime.Object, mockLogger.Object);
            var status = service.GetClusterStatus();

            Assert.Equal("Standby", status.State);
            Assert.False(status.IsActive);
            Assert.True(status.IsStandby);

            mockVip.Verify(v => v.AcquireVirtualIpAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
        }

        [Fact]
        public async Task HandleHandoverNotificationAsync_PromotesStandbyToActiveAndClaimsVip()
        {
            var config = new SystemConfig
            {
                Discovery = new DiscoverySettings
                {
                    Role = "Active-Standby",
                    NodeRole = "Secondary",
                    EnableVirtualIp = true,
                    VirtualIp = "192.168.1.200",
                    VirtualIpSubnetMask = "255.255.255.0",
                    NetworkInterfaceName = "Ethernet0"
                }
            };

            var (mockConfig, mockVip, mockHttp, mockLifetime, mockLogger) = CreateMocks(config);
            var service = new ClusterService(mockConfig.Object, mockVip.Object, mockHttp.Object, mockLifetime.Object, mockLogger.Object);

            Assert.Equal("Standby", service.GetClusterStatus().State);

            // Act - partner node cedes leadership and triggers handover
            var result = await service.HandleHandoverNotificationAsync("PartnerNode1", CancellationToken.None);

            // Assert
            Assert.True(result.Success);
            var status = service.GetClusterStatus();
            Assert.Equal("Active", status.State);
            Assert.True(status.IsActive);

            mockVip.Verify(v => v.AcquireVirtualIpAsync("192.168.1.200", "255.255.255.0", "Ethernet0", It.IsAny<CancellationToken>()), Times.Once);
        }

        [Fact]
        public async Task CedeLeadershipAsync_ReleasesVipAndTransitionsToStandby()
        {
            var config = new SystemConfig
            {
                Discovery = new DiscoverySettings
                {
                    Role = "Active-Standby",
                    NodeRole = "Primary",
                    EnableVirtualIp = true,
                    VirtualIp = "192.168.1.200",
                    VirtualIpSubnetMask = "255.255.255.0",
                    NetworkInterfaceName = "Ethernet0"
                }
            };

            var (mockConfig, mockVip, mockHttp, mockLifetime, mockLogger) = CreateMocks(config);
            var service = new ClusterService(mockConfig.Object, mockVip.Object, mockHttp.Object, mockLifetime.Object, mockLogger.Object);

            Assert.Equal("Active", service.GetClusterStatus().State);

            // Act
            await service.CedeLeadershipAsync(CancellationToken.None);

            // Assert
            var status = service.GetClusterStatus();
            Assert.Equal("Standby", status.State);
            Assert.False(status.IsActive);

            mockVip.Verify(v => v.ReleaseVirtualIpAsync("192.168.1.200", "Ethernet0", It.IsAny<CancellationToken>()), Times.Once);
        }

        [Fact]
        public async Task ActiveActive_ProcessNodeHeartbeat_RegistersWorkerAndReturnsGridStatus()
        {
            var config = new SystemConfig
            {
                Discovery = new DiscoverySettings
                {
                    Role = "Active-Active",
                    NodeRole = "Orchestrator",
                    Priority = 100
                }
            };

            var (mockConfig, mockVip, mockHttp, mockLifetime, mockLogger) = CreateMocks(config);
            var service = new ClusterService(mockConfig.Object, mockVip.Object, mockHttp.Object, mockLifetime.Object, mockLogger.Object);

            var workerReq = new ClusterHeartbeatRequest
            {
                Node = new ClusterNodeDescriptor
                {
                    NodeId = "SRV-WORKER-02",
                    DisplayName = "Secondary Worker",
                    ApiBaseUrl = "http://192.168.1.102:5090",
                    RtmpBaseUrl = "rtmps://192.168.1.102:19350/live",
                    Role = ServerDiscoveryConstants.RoleWorker,
                    MaxStreamsCapacity = 60,
                    ActiveStreamsCount = 10,
                    MaxConcurrentJobs = 4,
                    ActiveJobsCount = 1
                }
            };

            var response = await service.ProcessNodeHeartbeatAsync(workerReq, CancellationToken.None);

            Assert.True(response.Acknowledged);
            Assert.True(response.IsLocalNodeOrchestrator);

            var grid = service.GetClusterGridStatus();
            Assert.Equal(2, grid.TotalNodes);
            Assert.Equal(2, grid.OnlineNodesCount);
            Assert.Contains(grid.Nodes, n => n.NodeId == "SRV-WORKER-02");
        }

        [Fact]
        public async Task ActiveActive_ResolveAssignedIngestNodeUrl_BalancesStreamsAcrossNodes()
        {
            var config = new SystemConfig
            {
                Discovery = new DiscoverySettings
                {
                    Role = "Active-Active",
                    NodeRole = "Orchestrator",
                    Priority = 100
                }
            };

            var (mockConfig, mockVip, mockHttp, mockLifetime, mockLogger) = CreateMocks(config);
            var service = new ClusterService(mockConfig.Object, mockVip.Object, mockHttp.Object, mockLifetime.Object, mockLogger.Object);

            // Register Local Node as moderately loaded (25/50 = 50%)
            await service.ProcessNodeHeartbeatAsync(new ClusterHeartbeatRequest
            {
                Node = new ClusterNodeDescriptor
                {
                    NodeId = Environment.MachineName,
                    RtmpBaseUrl = $"rtmps://{Environment.MachineName.ToLowerInvariant()}:19350/live",
                    MaxStreamsCapacity = 50,
                    ActiveStreamsCount = 25
                }
            });

            // Register Worker 1 (heavily loaded: 40/50 streams = 80%)
            await service.ProcessNodeHeartbeatAsync(new ClusterHeartbeatRequest
            {
                Node = new ClusterNodeDescriptor
                {
                    NodeId = "NODE-HEAVY",
                    RtmpBaseUrl = "rtmps://node-heavy:19350/live",
                    MaxStreamsCapacity = 50,
                    ActiveStreamsCount = 40
                }
            });

            // Register Worker 2 (lightly loaded: 5/50 streams = 10%)
            await service.ProcessNodeHeartbeatAsync(new ClusterHeartbeatRequest
            {
                Node = new ClusterNodeDescriptor
                {
                    NodeId = "NODE-LIGHT",
                    RtmpBaseUrl = "rtmps://node-light:19350/live",
                    MaxStreamsCapacity = 50,
                    ActiveStreamsCount = 5
                }
            });

            // Act: Ingest balancer routes new station
            var assignedUrl = await service.ResolveAssignedIngestNodeUrlAsync("STATION-ALPHA", CancellationToken.None);

            // Assert: Should route to NODE-LIGHT
            Assert.Equal("rtmps://node-light:19350/live", assignedUrl);

            // Repeated request for same station should maintain affinity
            var recheckUrl = await service.ResolveAssignedIngestNodeUrlAsync("STATION-ALPHA", CancellationToken.None);
            Assert.Equal("rtmps://node-light:19350/live", recheckUrl);
        }

        [Fact]
        public async Task ActiveActive_SelectOptimalWorkerForJob_SelectsLeastLoadedNode()
        {
            var config = new SystemConfig
            {
                Discovery = new DiscoverySettings
                {
                    Role = "Active-Active",
                    NodeRole = "Orchestrator",
                    Priority = 100
                }
            };

            var (mockConfig, mockVip, mockHttp, mockLifetime, mockLogger) = CreateMocks(config);
            var service = new ClusterService(mockConfig.Object, mockVip.Object, mockHttp.Object, mockLifetime.Object, mockLogger.Object);

            // Local Node has 1 active job
            await service.ProcessNodeHeartbeatAsync(new ClusterHeartbeatRequest
            {
                Node = new ClusterNodeDescriptor
                {
                    NodeId = Environment.MachineName,
                    MaxConcurrentJobs = 2,
                    ActiveJobsCount = 1,
                    HostCpuPct = 45.0
                }
            });

            // Node 1 is busy rendering 2/2 jobs
            await service.ProcessNodeHeartbeatAsync(new ClusterHeartbeatRequest
            {
                Node = new ClusterNodeDescriptor
                {
                    NodeId = "NODE-BUSY",
                    MaxConcurrentJobs = 2,
                    ActiveJobsCount = 2,
                    HostCpuPct = 85.0
                }
            });

            // Node 2 is idle with 0/2 jobs
            await service.ProcessNodeHeartbeatAsync(new ClusterHeartbeatRequest
            {
                Node = new ClusterNodeDescriptor
                {
                    NodeId = "NODE-IDLE",
                    MaxConcurrentJobs = 2,
                    ActiveJobsCount = 0,
                    HostCpuPct = 12.0
                }
            });

            var optimalNode = await service.SelectOptimalWorkerForJobAsync(CancellationToken.None);

            Assert.NotNull(optimalNode);
            Assert.Equal("NODE-IDLE", optimalNode.NodeId);
        }

        [Fact]
        public async Task ActiveActive_TransferOrchestratorRole_ReleasesVipAndUpdatesRole()
        {
            var config = new SystemConfig
            {
                Discovery = new DiscoverySettings
                {
                    Role = "Active-Active",
                    NodeRole = "Orchestrator",
                    EnableVirtualIp = true,
                    VirtualIp = "192.168.1.200",
                    NetworkInterfaceName = "Ethernet0"
                }
            };

            var (mockConfig, mockVip, mockHttp, mockLifetime, mockLogger) = CreateMocks(config);
            var service = new ClusterService(mockConfig.Object, mockVip.Object, mockHttp.Object, mockLifetime.Object, mockLogger.Object);

            // Register Target Worker
            await service.ProcessNodeHeartbeatAsync(new ClusterHeartbeatRequest
            {
                Node = new ClusterNodeDescriptor
                {
                    NodeId = "SRV-WORKER-02",
                    ApiBaseUrl = "http://192.168.1.102:5090"
                }
            });

            // Transfer Orchestrator
            var result = await service.TransferOrchestratorRoleAsync("SRV-WORKER-02", CancellationToken.None);

            Assert.True(result.Success);
            mockVip.Verify(v => v.ReleaseVirtualIpAsync("192.168.1.200", "Ethernet0", It.IsAny<CancellationToken>()), Times.Once);

            var grid = service.GetClusterGridStatus();
            Assert.Equal("SRV-WORKER-02", grid.OrchestratorNodeId);
            Assert.False(grid.IsLocalNodeOrchestrator);
        }

        #region Zero-Configuration Multicast/Broadcast Beacon Discovery Tests

        [Fact]
        public void AutoDiscovery_CreateLocalBeaconPacket_GeneratesValidBeaconWithNetworkMetrics()
        {
            var config = new SystemConfig
            {
                HttpPort = 5090,
                Discovery = new DiscoverySettings
                {
                    Role = "Active-Active",
                    NodeMode = "Active",
                    ClusterGroup = "Tactical-NOC-1",
                    Priority = 80,
                    ServerDisplayName = "Alpha Recording Server"
                }
            };

            var (mockConfig, mockVip, mockHttp, mockLifetime, mockLogger) = CreateMocks(config);
            var service = new ClusterService(mockConfig.Object, mockVip.Object, mockHttp.Object, mockLifetime.Object, mockLogger.Object);

            var beacon = service.CreateLocalBeaconPacket();

            Assert.NotNull(beacon);
            Assert.Equal(ServerDiscoveryConstants.ClusterBeaconMagic, beacon.Magic);
            Assert.Equal("Tactical-NOC-1", beacon.ClusterGroup);
            Assert.Equal(System.Environment.MachineName, beacon.NodeId);
            Assert.Equal("Alpha Recording Server", beacon.DisplayName);
            Assert.Equal(ServerDiscoveryConstants.NodeModeActive, beacon.NodeMode);
            Assert.Equal(80, beacon.Priority);
            Assert.False(string.IsNullOrWhiteSpace(beacon.ApiBaseUrl));
            Assert.Contains("5090", beacon.ApiBaseUrl);
        }

        [Fact]
        public async Task AutoDiscovery_ProcessClusterBeacon_DiscoversPeerAndAutoAssignsStreams()
        {
            var config = new SystemConfig
            {
                Discovery = new DiscoverySettings
                {
                    Role = "Active-Active",
                    NodeMode = "Active",
                    ClusterGroup = "Production",
                    Priority = 50
                }
            };

            var (mockConfig, mockVip, mockHttp, mockLifetime, mockLogger) = CreateMocks(config);
            var service = new ClusterService(mockConfig.Object, mockVip.Object, mockHttp.Object, mockLifetime.Object, mockLogger.Object);

            // Receive an autonomous beacon from peer node
            var peerBeacon = new ClusterBeaconPacket
            {
                Magic = ServerDiscoveryConstants.ClusterBeaconMagic,
                ClusterGroup = "Production",
                NodeId = "PEER-COMPUTE-02",
                DisplayName = "Secondary Video Worker",
                NodeMode = "Active",
                NodeRole = "Worker",
                Priority = 40,
                ApiBaseUrl = "http://192.168.1.150:5090",
                RtmpBaseUrl = "rtmps://192.168.1.150:19350/live",
                MaxStreamsCapacity = 60,
                ActiveStreamsCount = 0,
                AssignedStations = new System.Collections.Generic.List<string> { "STATION-RECON-7" }
            };

            await service.ProcessClusterBeaconAsync(peerBeacon, CancellationToken.None);

            var grid = service.GetClusterGridStatus();
            Assert.Contains(grid.Nodes, n => n.NodeId == "PEER-COMPUTE-02");
            var discoveredNode = grid.Nodes.First(n => n.NodeId == "PEER-COMPUTE-02");
            Assert.Equal("http://192.168.1.150:5090", discoveredNode.ApiBaseUrl);
            Assert.True(discoveredNode.IsOnline);

            // Stream resolve for existing station mapped via beacon
            var assignedUrl = await service.ResolveAssignedIngestNodeUrlAsync("STATION-RECON-7", CancellationToken.None);
            Assert.Equal("rtmps://192.168.1.150:19350/live", assignedUrl);
        }

        [Fact]
        public async Task AutoDiscovery_ProcessClusterBeacon_FiltersDifferentClusterGroup()
        {
            var config = new SystemConfig
            {
                Discovery = new DiscoverySettings
                {
                    Role = "Active-Active",
                    ClusterGroup = "Sector-Alpha"
                }
            };

            var (mockConfig, mockVip, mockHttp, mockLifetime, mockLogger) = CreateMocks(config);
            var service = new ClusterService(mockConfig.Object, mockVip.Object, mockHttp.Object, mockLifetime.Object, mockLogger.Object);

            // Beacon from foreign cluster on the same LAN
            var foreignBeacon = new ClusterBeaconPacket
            {
                ClusterGroup = "Sector-Bravo",
                NodeId = "FOREIGN-SRV-99",
                ApiBaseUrl = "http://192.168.1.99:5090"
            };

            await service.ProcessClusterBeaconAsync(foreignBeacon, CancellationToken.None);

            var grid = service.GetClusterGridStatus();
            Assert.DoesNotContain(grid.Nodes, n => n.NodeId == "FOREIGN-SRV-99");
        }

        [Fact]
        public async Task AutoDiscovery_HybridCluster_StandbyNodePromotesToOrchestratorWhenActiveNodesUnreachable()
        {
            var config = new SystemConfig
            {
                Discovery = new DiscoverySettings
                {
                    Role = "Active-Standby",
                    NodeMode = "Standby",
                    NodeRole = "Secondary",
                    ClusterGroup = "Production",
                    Priority = 50,
                    EnableVirtualIp = true,
                    VirtualIp = "192.168.1.200",
                    NetworkInterfaceName = "Ethernet0"
                }
            };

            var (mockConfig, mockVip, mockHttp, mockLifetime, mockLogger) = CreateMocks(config);
            var service = new ClusterService(mockConfig.Object, mockVip.Object, mockHttp.Object, mockLifetime.Object, mockLogger.Object);

            // Local node initialized as Standby
            Assert.Equal("Standby", service.GetClusterStatus().State);

            // Discovers an active node
            var activeBeacon = new ClusterBeaconPacket
            {
                ClusterGroup = "Production",
                NodeId = "ACTIVE-PRIMARY-01",
                NodeMode = "Active",
                NodeRole = "Orchestrator",
                Priority = 100,
                ApiBaseUrl = "http://192.168.1.101:5090"
            };

            await service.ProcessClusterBeaconAsync(activeBeacon, CancellationToken.None);

            var grid = service.GetClusterGridStatus();
            Assert.Equal("ACTIVE-PRIMARY-01", grid.OrchestratorNodeId);
            Assert.False(grid.IsLocalNodeOrchestrator);

            // Simulate all active nodes going offline / unreachable
            var discoveredNode = grid.Nodes.First(n => n.NodeId == "ACTIVE-PRIMARY-01");
            discoveredNode.LastSeenUtc = System.DateTime.UtcNow.AddMinutes(-5); // Expired

            // Re-trigger beacon evaluation with empty/dead active nodes
            var dummyStandbyPeer = new ClusterBeaconPacket
            {
                ClusterGroup = "Production",
                NodeId = "ANOTHER-STANDBY-03",
                NodeMode = "Standby",
                Priority = 20
            };
            await service.ProcessClusterBeaconAsync(dummyStandbyPeer, CancellationToken.None);

            // Standby node promoted itself to Active Orchestrator and bound VIP!
            var updatedGrid = service.GetClusterGridStatus();
            Assert.True(updatedGrid.IsLocalNodeOrchestrator);
            mockVip.Verify(v => v.AcquireVirtualIpAsync("192.168.1.200", It.IsAny<string>(), "Ethernet0", It.IsAny<CancellationToken>()), Times.Once);
        }

        #endregion

        #region Hardware-Aware Weighted Balancing & Overload Protection Tests

        [Fact]
        public async Task HardwareAware_IngestBalancing_HighCapabilityNodeAbsorbsHigherStreamLoad()
        {
            var config = new SystemConfig
            {
                Discovery = new DiscoverySettings
                {
                    Role = "Active-Active"
                }
            };

            var (mockConfig, mockVip, mockHttp, mockLifetime, mockLogger) = CreateMocks(config);
            var service = new ClusterService(mockConfig.Object, mockVip.Object, mockHttp.Object, mockLifetime.Object, mockLogger.Object);

            // Local node is already busy with 20 streams
            await service.ProcessNodeHeartbeatAsync(new ClusterHeartbeatRequest
            {
                Node = new ClusterNodeDescriptor
                {
                    NodeId = Environment.MachineName,
                    ActiveStreamsCount = 20,
                    EffectiveStreamsCapacity = 20,
                    HostCpuPct = 60.0
                }
            });

            // Weak CPU-only node (Score: 50 + 4*25 + 8*5 = 190) with 3 active streams
            await service.ProcessNodeHeartbeatAsync(new ClusterHeartbeatRequest
            {
                Node = new ClusterNodeDescriptor
                {
                    NodeId = "NODE-COMMODITY-WEAK",
                    CpuCores = 4,
                    TotalRamGb = 8.0,
                    GpuModel = "CPU Software",
                    EncoderType = "libx264",
                    HardwareCapabilityScore = 190,
                    EffectiveStreamsCapacity = 20,
                    ActiveStreamsCount = 3,
                    HostCpuPct = 30.0,
                    RtmpBaseUrl = "rtmps://weak-node:19350/live"
                }
            });

            // High-Performance GPU node (Score: 500 + 16*25 + 32*5 = 1060) with 3 active streams
            await service.ProcessNodeHeartbeatAsync(new ClusterHeartbeatRequest
            {
                Node = new ClusterNodeDescriptor
                {
                    NodeId = "NODE-ENTERPRISE-GPU",
                    CpuCores = 16,
                    TotalRamGb = 32.0,
                    GpuModel = "NVIDIA RTX 4070",
                    EncoderType = "h264_nvenc",
                    HardwareCapabilityScore = 1060,
                    EffectiveStreamsCapacity = 100,
                    ActiveStreamsCount = 3,
                    HostCpuPct = 30.0,
                    RtmpBaseUrl = "rtmps://gpu-node:19350/live"
                }
            });

            // Request ingest assignment for a new workstation
            var assignedUrl = await service.ResolveAssignedIngestNodeUrlAsync("WS-ROOM-401", CancellationToken.None);

            // High capability GPU server absorbs the new stream because its IngestPressureScore is significantly lower
            Assert.Equal("rtmps://gpu-node:19350/live", assignedUrl);
        }

        [Fact]
        public async Task HardwareAware_OverloadProtection_NodeWithCpuOver75PercentIsThrottledAndNeverAssigned()
        {
            var config = new SystemConfig
            {
                Discovery = new DiscoverySettings
                {
                    Role = "Active-Active"
                }
            };

            var (mockConfig, mockVip, mockHttp, mockLifetime, mockLogger) = CreateMocks(config);
            var service = new ClusterService(mockConfig.Object, mockVip.Object, mockHttp.Object, mockLifetime.Object, mockLogger.Object);

            // Local node is overloaded with 20 streams and 2 jobs
            await service.ProcessNodeHeartbeatAsync(new ClusterHeartbeatRequest
            {
                Node = new ClusterNodeDescriptor
                {
                    NodeId = Environment.MachineName,
                    ActiveStreamsCount = 20,
                    EffectiveStreamsCapacity = 20,
                    ActiveJobsCount = 2,
                    MaxConcurrentJobs = 2,
                    HostCpuPct = 82.0
                }
            });

            // High capability node, but heavily overloaded (CPU at 78% >= 75% threshold)
            await service.ProcessNodeHeartbeatAsync(new ClusterHeartbeatRequest
            {
                Node = new ClusterNodeDescriptor
                {
                    NodeId = "NODE-OVERLOADED-GPU",
                    CpuCores = 16,
                    TotalRamGb = 32.0,
                    HardwareCapabilityScore = 1060,
                    EffectiveStreamsCapacity = 100,
                    ActiveStreamsCount = 2,
                    HostCpuPct = 78.0, // Overload threshold exceeded!
                    RtmpBaseUrl = "rtmps://overloaded-node:19350/live"
                }
            });

            // Moderate node, healthy at 22% CPU
            await service.ProcessNodeHeartbeatAsync(new ClusterHeartbeatRequest
            {
                Node = new ClusterNodeDescriptor
                {
                    NodeId = "NODE-HEALTHY-MIDTIER",
                    CpuCores = 8,
                    TotalRamGb = 16.0,
                    HardwareCapabilityScore = 530,
                    EffectiveStreamsCapacity = 50,
                    ActiveStreamsCount = 2,
                    HostCpuPct = 22.0,
                    RtmpBaseUrl = "rtmps://healthy-node:19350/live"
                }
            });

            // Ingest assignment must shield the overloaded node and select the healthy node
            var assignedUrl = await service.ResolveAssignedIngestNodeUrlAsync("WS-ROOM-402", CancellationToken.None);
            Assert.Equal("rtmps://healthy-node:19350/live", assignedUrl);

            // Compute job dispatcher must also protect the overloaded node
            var selectedWorker = await service.SelectOptimalWorkerForJobAsync(CancellationToken.None);
            Assert.NotNull(selectedWorker);
            Assert.Equal("NODE-HEALTHY-MIDTIER", selectedWorker.NodeId);
        }

        [Fact]
        public async Task HardwareAware_ComputeJobSelection_WeakNodeLimitedToOneJobAndPrefersGpuWorker()
        {
            var config = new SystemConfig
            {
                Discovery = new DiscoverySettings
                {
                    Role = "Active-Active"
                }
            };

            var (mockConfig, mockVip, mockHttp, mockLifetime, mockLogger) = CreateMocks(config);
            var service = new ClusterService(mockConfig.Object, mockVip.Object, mockHttp.Object, mockLifetime.Object, mockLogger.Object);

            // Local node is at job capacity (2/2 jobs)
            await service.ProcessNodeHeartbeatAsync(new ClusterHeartbeatRequest
            {
                Node = new ClusterNodeDescriptor
                {
                    NodeId = Environment.MachineName,
                    ActiveJobsCount = 2,
                    MaxConcurrentJobs = 2,
                    HostCpuPct = 50.0
                }
            });

            // Weak CPU-only node with 0 active jobs
            var weakNode = new ClusterNodeDescriptor
            {
                NodeId = "NODE-WEAK-CPU",
                HardwareCapabilityScore = 180,
                EncoderType = "libx264",
                MaxConcurrentJobs = 2,
                ActiveJobsCount = 0,
                HostCpuPct = 20.0
            };

            // High GPU node with 0 active jobs
            var gpuNode = new ClusterNodeDescriptor
            {
                NodeId = "NODE-STRONG-GPU",
                HardwareCapabilityScore = 900,
                EncoderType = "h264_nvenc",
                MaxConcurrentJobs = 3,
                ActiveJobsCount = 0,
                HostCpuPct = 20.0
            };

            await service.ProcessNodeHeartbeatAsync(new ClusterHeartbeatRequest { Node = weakNode });
            await service.ProcessNodeHeartbeatAsync(new ClusterHeartbeatRequest { Node = gpuNode });

            // 1. When both are idle, dispatcher picks the powerful GPU worker
            var worker1 = await service.SelectOptimalWorkerForJobAsync(CancellationToken.None);
            Assert.NotNull(worker1);
            Assert.Equal("NODE-STRONG-GPU", worker1.NodeId);

            // 2. If Weak node already has 1 job running, its fitness must drop to -1.0 (strict 1-job ceiling for weak CPU nodes)
            weakNode.ActiveJobsCount = 1;
            double weakFitness = ClusterService.CalculateComputeFitness(weakNode);
            Assert.Equal(-1.0, weakFitness);
        }

        [Fact]
        public void CalculateHardwareCapacities_DerivesCapacitiesAccurately()
        {
            // 1. High-end NVIDIA GPU node (8 cores, 32GB RAM, NVENC)
            var (nvStreams, nvJobs) = ClusterBeaconPacket.CalculateHardwareCapacities(8, 32.0, "h264_nvenc", "NVIDIA GeForce RTX 4070");
            Assert.InRange(nvStreams, 150, 200);
            Assert.InRange(nvJobs, 4, 8);

            // 2. Intel QuickSync node (8 cores, 16GB RAM, QSV)
            var (qsvStreams, qsvJobs) = ClusterBeaconPacket.CalculateHardwareCapacities(8, 16.0, "h264_qsv", "Intel Iris Xe");
            Assert.InRange(qsvStreams, 80, 120);
            Assert.InRange(qsvJobs, 2, 4);

            // 3. CPU Software node (4 cores, 8GB RAM, libx264)
            var (cpuStreams, cpuJobs) = ClusterBeaconPacket.CalculateHardwareCapacities(4, 8.0, "libx264", "CPU Software");
            Assert.InRange(cpuStreams, 10, 25);
            Assert.Equal(1, cpuJobs); // Weak CPU node strictly capped at 1 job
        }

        [Fact]
        public void ReportJobStatus_UpdatesActiveJobsCountAndRecalculatesFitness()
        {
            var config = new SystemConfig();
            config.Discovery.Role = ServerDiscoveryConstants.RoleActiveActive;
            var (mockConfig, mockVip, mockHttp, mockLifetime, mockLogger) = CreateMocks(config);

            var service = new ClusterService(mockConfig.Object, mockVip.Object, mockHttp.Object, mockLifetime.Object, mockLogger.Object);

            string localNodeId = Environment.MachineName;

            // Initially 0 active jobs
            Assert.Equal(0, service.GetActiveJobsCount());

            // Enqueue job 1
            service.ReportJobStatus(new ClusterJobStatusDto
            {
                JobId = "job-101",
                ExecutingNodeId = localNodeId,
                Status = "Queued"
            });
            Assert.Equal(1, service.GetActiveJobsCount());

            // Job 1 transitions to Processing, enqueue job 2
            service.ReportJobStatus(new ClusterJobStatusDto
            {
                JobId = "job-101",
                ExecutingNodeId = localNodeId,
                Status = "Processing"
            });
            service.ReportJobStatus(new ClusterJobStatusDto
            {
                JobId = "job-102",
                ExecutingNodeId = localNodeId,
                Status = "Processing"
            });
            Assert.Equal(2, service.GetActiveJobsCount());

            // Job 1 completes, job 2 fails
            service.ReportJobStatus(new ClusterJobStatusDto
            {
                JobId = "job-101",
                ExecutingNodeId = localNodeId,
                Status = "Completed"
            });
            Assert.Equal(1, service.GetActiveJobsCount());

            service.ReportJobStatus(new ClusterJobStatusDto
            {
                JobId = "job-102",
                ExecutingNodeId = localNodeId,
                Status = "Failed"
            });
            Assert.Equal(0, service.GetActiveJobsCount());
        }

        [Fact]
        public void HardwareSizingCalculator_CalculatesRequirementsCorrectly()
        {
            // Sizing for 70 workstations and 4 concurrent cuts in Active-Active mode
            var request = new HardwareSizingRequest
            {
                TargetStations = 70,
                TargetConcurrentJobs = 4,
                RedundancyMode = "Active-Active",
                HardwareProfile = "NVENC"
            };

            var grid = new ClusterGridStatusDto
            {
                TotalNodes = 2,
                TotalStreamsCapacity = 100,
                TotalConcurrentJobsCapacity = 4
            };

            var result = HardwareSizingCalculator.Calculate(request, grid);

            Assert.NotNull(result);
            Assert.Equal(70, result.TargetStations);
            Assert.Equal(4, result.TargetConcurrentJobs);
            Assert.True(result.RecommendedNodeCount >= 2);
            Assert.True(result.MinCpuCoresPerNode >= 8);
            Assert.True(result.MinRamGbPerNode >= 16);
            Assert.True(result.StorageWriteRateMBps > 30.0);
            Assert.Equal("Ready", result.EvaluationStatus);
            Assert.True(result.CurrentClusterCapable);
            Assert.Contains("ITB SCREEN RECORDER — CLUSTER HARDWARE SIZING", result.SizingReport);
        }

        #endregion
    }
}
