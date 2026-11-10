// ==========================================
// File: ITB-SCREEN-RECORDER.Tests/Server/Network/VirtualIpManagerTests.cs
// ==========================================
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Server.Services.Network;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Server.Network
{
    public class VirtualIpManagerTests
    {
        [Theory]
        [InlineData("255.255.255.0", 24)]
        [InlineData("255.255.0.0", 16)]
        [InlineData("255.0.0.0", 8)]
        [InlineData("255.255.255.128", 25)]
        [InlineData("255.255.255.252", 30)]
        [InlineData("invalid", 24)]
        public void SubnetMaskToCidr_ComputesAccuratePrefix(string mask, int expectedPrefix)
        {
            var prefix = VirtualIpManager.SubnetMaskToCidr(mask);
            Assert.Equal(expectedPrefix, prefix);
        }

        [Fact]
        public async Task AcquireVirtualIpAsync_WhenAlreadyBound_ReturnsSuccessWithoutAddingAgain()
        {
            // Arrange
            var mockRunner = new Mock<INetworkCommandRunner>();
            mockRunner.Setup(r => r.RunCommandAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new NetworkCommandResult(0, "OK", ""));

            var mockLogger = new Mock<ILogger<VirtualIpManager>>();
            var manager = new VirtualIpManager(mockRunner.Object, mockLogger.Object);

            var localBoundIp = System.Net.NetworkInformation.NetworkInterface.GetAllNetworkInterfaces()
                .Where(ni => ni.OperationalStatus == System.Net.NetworkInformation.OperationalStatus.Up &&
                             ni.NetworkInterfaceType != System.Net.NetworkInformation.NetworkInterfaceType.Loopback)
                .SelectMany(ni => ni.GetIPProperties().UnicastAddresses)
                .FirstOrDefault(u => u.Address.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)?.Address.ToString();

            if (string.IsNullOrEmpty(localBoundIp))
            {
                return;
            }

            // Act
            var result = await manager.AcquireVirtualIpAsync(localBoundIp, "255.255.255.0", "Ethernet0");

            // Assert
            Assert.True(result.Success);
            // Neither netsh add nor ip addr add should be called for an existing bound address
            mockRunner.Verify(r => r.RunCommandAsync(
                It.Is<string>(cmd => cmd.Contains("netsh") || cmd == "ip"),
                It.Is<string>(args => args.Contains("add address") || args.Contains("addr add")),
                It.IsAny<CancellationToken>()), Times.Never);
        }

        [Fact]
        public async Task ReleaseVirtualIpAsync_WhenNotBound_ReturnsSuccessWithoutRunningDelete()
        {
            // Arrange
            var mockRunner = new Mock<INetworkCommandRunner>();
            var mockLogger = new Mock<ILogger<VirtualIpManager>>();
            var manager = new VirtualIpManager(mockRunner.Object, mockLogger.Object);

            // 192.0.2.1 is RFC 5737 TEST-NET-1, not bound on test machine
            const string unboundIp = "192.0.2.1";

            // Act
            var result = await manager.ReleaseVirtualIpAsync(unboundIp, "Ethernet0");

            // Assert
            Assert.True(result.Success);
            mockRunner.Verify(r => r.RunCommandAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
        }

        [Fact]
        public async Task AcquireVirtualIpAsync_WhenUnbound_ExecutesOsCommand()
        {
            // Arrange
            var mockRunner = new Mock<INetworkCommandRunner>();
            mockRunner.Setup(r => r.RunCommandAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new NetworkCommandResult(0, "OK", ""));

            var mockLogger = new Mock<ILogger<VirtualIpManager>>();
            var manager = new VirtualIpManager(mockRunner.Object, mockLogger.Object);

            const string testVip = "192.0.2.99";
            const string mask = "255.255.255.0";
            const string iface = "Ethernet0";

            // Act
            var result = await manager.AcquireVirtualIpAsync(testVip, mask, iface);

            // Assert
            Assert.True(result.Success);

            if (System.OperatingSystem.IsWindows())
            {
                mockRunner.Verify(r => r.RunCommandAsync(
                    "netsh.exe",
                    It.Is<string>(args => args.Contains("interface ipv4 add address") && args.Contains(testVip) && args.Contains(mask)),
                    It.IsAny<CancellationToken>()), Times.Once);
            }
            else
            {
                mockRunner.Verify(r => r.RunCommandAsync(
                    "ip",
                    It.Is<string>(args => args.Contains("addr add") && args.Contains(testVip)),
                    It.IsAny<CancellationToken>()), Times.Once);
            }
        }

        [Fact]
        public async Task SendGratuitousArpAsync_CallsPlatformArpTool()
        {
            // Arrange
            var mockRunner = new Mock<INetworkCommandRunner>();
            mockRunner.Setup(r => r.RunCommandAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new NetworkCommandResult(0, "OK", ""));

            var mockLogger = new Mock<ILogger<VirtualIpManager>>();
            var manager = new VirtualIpManager(mockRunner.Object, mockLogger.Object);

            // Act
            await manager.SendGratuitousArpAsync("192.0.2.100", "Ethernet0");

            // Assert
            if (System.OperatingSystem.IsWindows())
            {
                mockRunner.Verify(r => r.RunCommandAsync("ipconfig.exe", "/registerdns", It.IsAny<CancellationToken>()), Times.Once);
            }
            else
            {
                mockRunner.Verify(r => r.RunCommandAsync(
                    "arping",
                    It.Is<string>(args => args.Contains("-U") && args.Contains("192.0.2.100")),
                    It.IsAny<CancellationToken>()), Times.Once);
            }
        }
    }
}
