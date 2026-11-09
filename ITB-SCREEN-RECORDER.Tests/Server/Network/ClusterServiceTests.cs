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
    }
}
