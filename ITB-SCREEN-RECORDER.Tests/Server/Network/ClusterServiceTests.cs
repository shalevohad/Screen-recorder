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
    }
}
