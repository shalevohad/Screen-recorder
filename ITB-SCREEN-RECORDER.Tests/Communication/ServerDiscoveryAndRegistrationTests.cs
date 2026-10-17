using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Core.Diagnostics;
using ITB_SCREEN_RECORDER.Core.Network.Discovery;
using ITB_SCREEN_RECORDER.Server.Controllers;
using ITB_SCREEN_RECORDER.Server.Services;
using ITB_SCREEN_RECORDER.Server.Services.Network;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace ITB_SCREEN_RECORDER.Tests.Communication
{
    public class ServerDiscoveryAndRegistrationTests
    {
        #region Contract Serialization Tests

        [Fact]
        public void ServerDiscoveryContracts_ProbeSerialization_PreservesMagicAndStructure()
        {
            var probe = new ServerDiscoveryProbe
            {
                ClientMachineName = "TEST-WORKSTATION-42",
                TimestampUtc = new DateTime(2026, 10, 17, 12, 0, 0, DateTimeKind.Utc)
            };

            string json = JsonSerializer.Serialize(probe);
            var deserialized = JsonSerializer.Deserialize<ServerDiscoveryProbe>(json);

            Assert.NotNull(deserialized);
            Assert.Equal(ServerDiscoveryConstants.ProbeMagic, deserialized.Magic);
            Assert.Equal("1.0", deserialized.Version);
            Assert.Equal("TEST-WORKSTATION-42", deserialized.ClientMachineName);
        }

        [Fact]
        public void ServerDiscoveryContracts_ResponseSerialization_PreservesAllServerMetadata()
        {
            var response = new ServerDiscoveryResponse
            {
                ServerId = "SRV-TEST-01",
                ServerName = "Central Management Server",
                Environment = "Production",
                ApiBaseUrl = "https://10.0.100.50:5090",
                RtmpBaseUrl = "rtmps://10.0.100.50:19350/live",
                HttpPort = 5090,
                RtmpPort = 19350,
                TlsThumbprint = "ABCDEF1234567890",
                Version = "1.0.4",
                ServerIps = new List<string> { "10.0.100.50", "192.168.1.10" },
                AcceptingNewAgents = true
            };

            string json = JsonSerializer.Serialize(response);
            var deserialized = JsonSerializer.Deserialize<ServerDiscoveryResponse>(json);

            Assert.NotNull(deserialized);
            Assert.Equal(ServerDiscoveryConstants.ResponseMagic, deserialized.Magic);
            Assert.Equal("SRV-TEST-01", deserialized.ServerId);
            Assert.Equal("Central Management Server", deserialized.ServerName);
            Assert.Equal("Production", deserialized.Environment);
            Assert.Equal("https://10.0.100.50:5090", deserialized.ApiBaseUrl);
            Assert.Equal("rtmps://10.0.100.50:19350/live", deserialized.RtmpBaseUrl);
            Assert.Equal(5090, deserialized.HttpPort);
            Assert.Equal(19350, deserialized.RtmpPort);
            Assert.True(deserialized.AcceptingNewAgents);
            Assert.Equal(2, deserialized.ServerIps.Count);
        }

        [Fact]
        public void AgentRegistrationRequest_ResponseSerialization_PreservesHandshakeData()
        {
            var request = new AgentRegistrationRequest
            {
                MachineName = "AGENT-DESKTOP-99",
                OsVersion = "Microsoft Windows 11 Pro 10.0.22631",
                HardwareUuid = "550e8400-e29b-41d4-a716-446655440000",
                MacAddress = "00:1A:2B:3C:4D:5E",
                AgentVersion = "1.0.4"
            };

            string reqJson = JsonSerializer.Serialize(request);
            var parsedReq = JsonSerializer.Deserialize<AgentRegistrationRequest>(reqJson);

            Assert.NotNull(parsedReq);
            Assert.Equal("AGENT-DESKTOP-99", parsedReq.MachineName);
            Assert.Equal("550e8400-e29b-41d4-a716-446655440000", parsedReq.HardwareUuid);

            var resp = new AgentRegistrationResponse
            {
                AgentId = "550e8400-e29b-41d4-a716-446655440000",
                ServerName = "CENTRAL-SRV",
                AssignedStreamKey = "AGENT-DESKTOP-99",
                RtmpServerBaseUrl = "rtmps://10.0.100.50:19350/live",
                Policy = new AgentStreamPolicy
                {
                    TargetFps = 25,
                    VideoBitrate = "3000k",
                    RtmpServerBaseUrl = "rtmps://10.0.100.50:19350/live"
                },
                HeartbeatIntervalSeconds = 2
            };

            string respJson = JsonSerializer.Serialize(resp);
            var parsedResp = JsonSerializer.Deserialize<AgentRegistrationResponse>(respJson);

            Assert.NotNull(parsedResp);
            Assert.Equal("CENTRAL-SRV", parsedResp.ServerName);
            Assert.Equal("AGENT-DESKTOP-99", parsedResp.AssignedStreamKey);
            Assert.Equal(25, parsedResp.Policy.TargetFps);
            Assert.Equal("3000k", parsedResp.Policy.VideoBitrate);
        }

        #endregion

        #region Discovery Client & Timeout Tests

        [Fact]
        public async Task ServerDiscoveryClient_WhenNoServerResponds_ReturnsEmptyWithinTimeout()
        {
            // Pick a high random port where nothing is listening
            int testPort = 59123;
            var client = new ServerDiscoveryClient(null, discoveryPort: testPort);

            var stopwatch = System.Diagnostics.Stopwatch.StartNew();
            var results = await client.DiscoverServersAsync(timeoutMs: 300);
            stopwatch.Stop();

            Assert.NotNull(results);
            Assert.Empty(results);
            Assert.True(stopwatch.ElapsedMilliseconds >= 250, $"Elapsed was {stopwatch.ElapsedMilliseconds}ms");
        }

        [Fact]
        public async Task ServerDiscovery_EndToEnd_ClientDiscoversSimulatedServer()
        {
            int testPort = 59124;
            using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));

            // Run a simulated server UDP responder
            var serverTask = Task.Run(async () =>
            {
                using var udpServer = new UdpClient();
                udpServer.Client.SetSocketOption(SocketOptionLevel.Socket, SocketOptionName.ReuseAddress, true);
                udpServer.Client.Bind(new IPEndPoint(IPAddress.Any, testPort));

                var receiveResult = await udpServer.ReceiveAsync(cts.Token);
                string receivedText = Encoding.UTF8.GetString(receiveResult.Buffer);
                Assert.Contains(ServerDiscoveryConstants.ProbeMagic, receivedText);

                var response = new ServerDiscoveryResponse
                {
                    ServerId = "MOCK-SRV-01",
                    ServerName = "Mock Recording Server",
                    Environment = "Test",
                    ApiBaseUrl = "https://127.0.0.1:5090",
                    RtmpBaseUrl = "rtmps://127.0.0.1:19350/live",
                    HttpPort = 5090,
                    RtmpPort = 19350,
                    ServerIps = new List<string> { "127.0.0.1" },
                    AcceptingNewAgents = true
                };

                byte[] respBytes = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(response));
                await udpServer.SendAsync(respBytes, respBytes.Length, receiveResult.RemoteEndPoint);
            }, cts.Token);

            // Small delay to ensure server socket is listening
            await Task.Delay(100);

            var client = new ServerDiscoveryClient(null, discoveryPort: testPort);
            var bestServer = await client.DiscoverBestServerAsync(timeoutMs: 1500, cts.Token);

            await serverTask;

            Assert.NotNull(bestServer);
            Assert.Equal("MOCK-SRV-01", bestServer.ServerId);
            Assert.Equal("Mock Recording Server", bestServer.ServerName);
            Assert.Equal(5090, bestServer.HttpPort);
            Assert.Equal(19350, bestServer.RtmpPort);
        }

        [Fact]
        public async Task ServerDiscoveryHostedService_HonorsCustomPortAndAddressFromConfiguration()
        {
            int customPort = 59128;
            string customMulticast = "239.255.10.98";

            var configMock = new Mock<IOptionsMonitor<SystemConfig>>();
            var systemConfig = new SystemConfig
            {
                HttpPort = 5090,
                MediaMtx = new MediaMtxSettings { RtmpPort = 19350 },
                Discovery = new DiscoverySettings
                {
                    Enabled = true,
                    Port = customPort,
                    MulticastAddress = customMulticast
                }
            };
            configMock.Setup(c => c.CurrentValue).Returns(systemConfig);

            using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
            var service = new ServerDiscoveryHostedService(configMock.Object, Mock.Of<ILogger<ServerDiscoveryHostedService>>());

            _ = Task.Run(() => service.StartAsync(cts.Token), cts.Token);
            await Task.Delay(150); // Allow socket to bind

            try
            {
                var client = new ServerDiscoveryClient(null, discoveryPort: customPort, multicastAddress: customMulticast);
                var discovered = await client.DiscoverBestServerAsync(timeoutMs: 1500, cts.Token);

                Assert.NotNull(discovered);
                Assert.Equal(5090, discovered.HttpPort);
                Assert.Equal(19350, discovered.RtmpPort);
            }
            finally
            {
                await service.StopAsync(CancellationToken.None);
            }
        }

        [Fact]
        public async Task ServerDiscoveryHostedService_WhenDisabledInConfiguration_DoesNotRespond()
        {
            int disabledPort = 59129;

            var configMock = new Mock<IOptionsMonitor<SystemConfig>>();
            var systemConfig = new SystemConfig
            {
                HttpPort = 5090,
                MediaMtx = new MediaMtxSettings { RtmpPort = 19350 },
                Discovery = new DiscoverySettings
                {
                    Enabled = false,
                    Port = disabledPort
                }
            };
            configMock.Setup(c => c.CurrentValue).Returns(systemConfig);

            using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(3));
            var service = new ServerDiscoveryHostedService(configMock.Object, Mock.Of<ILogger<ServerDiscoveryHostedService>>());

            _ = Task.Run(() => service.StartAsync(cts.Token), cts.Token);
            await Task.Delay(100);

            try
            {
                var client = new ServerDiscoveryClient(null, discoveryPort: disabledPort);
                var discovered = await client.DiscoverBestServerAsync(timeoutMs: 300, cts.Token);

                Assert.Null(discovered);
            }
            finally
            {
                await service.StopAsync(CancellationToken.None);
            }
        }

        [Fact]
        public async Task ServerDiscoveryHostedService_HonorsCustomServerDisplayNameAndEnvironment()
        {
            int customPort = 59135;
            string customMulticast = "239.255.10.99";

            var configMock = new Mock<IOptionsMonitor<SystemConfig>>();
            var systemConfig = new SystemConfig
            {
                HttpPort = 5090,
                MediaMtx = new MediaMtxSettings { RtmpPort = 19350 },
                Discovery = new DiscoverySettings
                {
                    Enabled = true,
                    Port = customPort,
                    MulticastAddress = customMulticast,
                    ServerDisplayName = "Custom-HQ-Recorder",
                    EnvironmentName = "DisasterRecovery"
                }
            };
            configMock.Setup(c => c.CurrentValue).Returns(systemConfig);

            using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
            var service = new ServerDiscoveryHostedService(configMock.Object, Mock.Of<ILogger<ServerDiscoveryHostedService>>());

            _ = Task.Run(() => service.StartAsync(cts.Token), cts.Token);
            await Task.Delay(150);

            try
            {
                var client = new ServerDiscoveryClient(
                    null,
                    discoveryPort: customPort,
                    multicastAddress: customMulticast,
                    targetEnvironment: "DisasterRecovery");

                var discovered = await client.DiscoverBestServerAsync(timeoutMs: 1500, cts.Token);

                Assert.NotNull(discovered);
                Assert.Contains("Custom-HQ-Recorder", discovered.ServerName);
                Assert.Equal("DisasterRecovery", discovered.Environment);
            }
            finally
            {
                await service.StopAsync(CancellationToken.None);
            }
        }

        [Fact]
        public void AppConfig_And_ServerConfig_ProvideDefaultConfiguredDiscoveryNames()
        {
            var appConfig = new AppConfig();
            Assert.NotNull(appConfig.DiscoveryDnsHostnames);
            Assert.Contains("itb-server", appConfig.DiscoveryDnsHostnames);
            Assert.Contains("screenrecorder", appConfig.DiscoveryDnsHostnames);
            Assert.Equal(2500, appConfig.DiscoveryTimeoutMs);
            Assert.Equal("Production", appConfig.DiscoveryTargetEnvironment);
            Assert.Equal(5090, appConfig.DiscoveryFallbackHttpPort);
            Assert.Equal(19350, appConfig.DiscoveryFallbackRtmpPort);

            var sysConfig = new SystemConfig();
            Assert.Equal("ITB Central Server", sysConfig.Discovery.ServerDisplayName);
            Assert.Equal("Production", sysConfig.Discovery.EnvironmentName);
            Assert.Equal("ITB-SCREEN-RECORDER", sysConfig.Discovery.ServiceName);
            Assert.Equal("Primary", sysConfig.Discovery.Role);
            Assert.Equal(1, sysConfig.Discovery.Priority);
        }

        [Fact]
        public async Task ServerDiscoveryHostedService_HonorsCustomServerRoleAndPriority()
        {
            int customPort = 59140;
            string customMulticast = "239.255.10.101";

            var configMock = new Mock<IOptionsMonitor<SystemConfig>>();
            var systemConfig = new SystemConfig
            {
                HttpPort = 5090,
                MediaMtx = new MediaMtxSettings { RtmpPort = 19350 },
                Discovery = new DiscoverySettings
                {
                    Enabled = true,
                    Port = customPort,
                    MulticastAddress = customMulticast,
                    ServerDisplayName = "DR-Standby-Node-02",
                    EnvironmentName = "Production",
                    Role = "Standby",
                    Priority = 2
                }
            };
            configMock.Setup(c => c.CurrentValue).Returns(systemConfig);

            using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
            var service = new ServerDiscoveryHostedService(configMock.Object, Mock.Of<ILogger<ServerDiscoveryHostedService>>());

            _ = Task.Run(() => service.StartAsync(cts.Token), cts.Token);
            await Task.Delay(150);

            try
            {
                var client = new ServerDiscoveryClient(null, discoveryPort: customPort, multicastAddress: customMulticast);
                var discovered = await client.DiscoverBestServerAsync(timeoutMs: 1500, cts.Token);

                Assert.NotNull(discovered);
                Assert.Equal("Standby", discovered.Role);
                Assert.Equal(2, discovered.Priority);
                Assert.Contains("DR-Standby-Node-02", discovered.ServerName);
            }
            finally
            {
                await service.StopAsync(CancellationToken.None);
            }
        }

        [Fact]
        public void ServerDiscoveryResponse_RoleAndPriority_SerializeAndDeserializeCleanly()
        {
            var response = new ServerDiscoveryResponse
            {
                ServerId = "SRV-TEST",
                ServerName = "Standby Server",
                Role = "Standby",
                Priority = 2,
                ApiBaseUrl = "https://10.0.0.2:5090"
            };

            string json = JsonSerializer.Serialize(response);
            var deserialized = JsonSerializer.Deserialize<ServerDiscoveryResponse>(json);

            Assert.NotNull(deserialized);
            Assert.Equal("Standby", deserialized.Role);
            Assert.Equal(2, deserialized.Priority);
        }

        #endregion

        #region Agent Registration Endpoint Tests

        [Fact]
        public async Task AgentController_RegisterAgent_ValidRequest_ReturnsRegisteredPolicyAndStreamKey()
        {
            var mockTelemetry = new Mock<ITelemetryStateService>();
            var mockConfig = new Mock<IOptionsMonitor<SystemConfig>>();
            mockConfig.Setup(c => c.CurrentValue).Returns(new SystemConfig
            {
                HttpPort = 5090,
                MediaMtx = new MediaMtxSettings { RtmpPort = 19350 }
            });

            mockTelemetry.Setup(t => t.GetAgentPolicyAsync("FINANCE STATION 01", "10.0.100.50"))
                .ReturnsAsync(new AgentStreamPolicy
                {
                    TargetFps = 30,
                    VideoBitrate = "4000k",
                    RtmpServerBaseUrl = "rtmps://10.0.100.50:19350/live"
                });

            var controller = new AgentController(
                mockTelemetry.Object,
                null!,
                null!,
                mockConfig.Object,
                null!,
                null!,
                null!,
                Mock.Of<ILogger<AgentController>>())
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext()
                }
            };
            controller.HttpContext.Request.Host = new HostString("10.0.100.50:5090");

            var request = new AgentRegistrationRequest
            {
                MachineName = "FINANCE STATION 01",
                OsVersion = "Windows 11",
                HardwareUuid = "UUID-12345",
                AgentVersion = "1.0.4"
            };

            var actionResult = await controller.RegisterAgent(request);
            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            var response = Assert.IsType<AgentRegistrationResponse>(okResult.Value);

            Assert.Equal("UUID-12345", response.AgentId);
            Assert.Equal("FINANCE_STATION_01", response.AssignedStreamKey);
            Assert.Equal("rtmps://10.0.100.50:19350/live", response.RtmpServerBaseUrl);
            Assert.Equal(30, response.Policy.TargetFps);
            Assert.Equal("4000k", response.Policy.VideoBitrate);
        }

        [Theory]
        [InlineData("")]
        [InlineData("   ")]
        [InlineData(null)]
        public async Task AgentController_RegisterAgent_InvalidMachineName_ReturnsBadRequest(string? invalidName)
        {
            var controller = new AgentController(
                Mock.Of<ITelemetryStateService>(),
                null!,
                null!,
                Mock.Of<IOptionsMonitor<SystemConfig>>(),
                null!,
                null!,
                null!,
                Mock.Of<ILogger<AgentController>>());

            var request = new AgentRegistrationRequest { MachineName = invalidName! };
            var result = await controller.RegisterAgent(request);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Theory]
        [InlineData("Primary", true, false, false)]
        [InlineData("primary", true, false, false)]
        [InlineData("Secondary", false, true, false)]
        [InlineData("secondary", false, true, false)]
        [InlineData("Standby", false, true, false)]
        [InlineData("standby", false, true, false)]
        [InlineData("Aggregate", false, false, true)]
        [InlineData("aggregate", false, false, true)]
        public void ServerDiscoveryResponse_RoleProperties_IdentifiesRoleAccurately(
            string role, bool expectedPrimary, bool expectedSecondary, bool expectedAggregate)
        {
            var response = new ServerDiscoveryResponse
            {
                Role = role,
                Priority = expectedPrimary ? 1 : (expectedSecondary ? 2 : 0)
            };

            Assert.Equal(expectedPrimary, response.IsPrimary);
            Assert.Equal(expectedSecondary, response.IsSecondary);
            Assert.Equal(expectedAggregate, response.IsAggregate);
        }

        [Fact]
        public void ServerDiscoveryContracts_ResponseSerialization_PreservesVirtualIpMetadata()
        {
            var response = new ServerDiscoveryResponse
            {
                ServerId = "SRV-CLUSTER-01",
                Role = "Primary",
                EnableVirtualIp = true,
                VirtualIp = "192.168.1.200"
            };

            string json = JsonSerializer.Serialize(response);
            var deserialized = JsonSerializer.Deserialize<ServerDiscoveryResponse>(json);

            Assert.NotNull(deserialized);
            Assert.True(deserialized.EnableVirtualIp);
            Assert.Equal("192.168.1.200", deserialized.VirtualIp);
        }

        [Fact]
        public async Task VirtualIpManagerService_WhenDisabled_DoesNotHoldVip()
        {
            var config = new SystemConfig
            {
                Discovery = new DiscoverySettings
                {
                    EnableVirtualIp = false,
                    VirtualIp = "192.168.1.200",
                    Role = "Primary"
                }
            };

            var monitorMock = new Mock<IOptionsMonitor<SystemConfig>>();
            monitorMock.Setup(m => m.CurrentValue).Returns(config);

            var loggerMock = new Mock<ILogger<VirtualIpManagerService>>();

            var service = new VirtualIpManagerService(monitorMock.Object, loggerMock.Object);

            using var cts = new CancellationTokenSource(TimeSpan.FromMilliseconds(500));
            await service.StartAsync(cts.Token);
            await Task.Delay(200);
            await service.StopAsync(CancellationToken.None);

            Assert.False(service.IsHoldingVip);
        }

        [Fact]
        public void ClusterMeshContracts_BeaconSerialization_PreservesHardwareAndLoadScore()
        {
            var beacon = new ClusterNodeBeacon
            {
                NodeId = "SRV-TEST-01",
                MachineName = "RENDER-RIG-01",
                ServerDisplayName = "ITB Transcoding Node",
                ApiBaseUrl = "https://192.168.1.150:5090",
                RtmpBaseUrl = "rtmps://192.168.1.150:19350/live",
                Role = "Active-Active",
                Priority = 1,
                IsHoldingVip = true,
                EnableVirtualIp = true,
                VirtualIp = "192.168.1.200",
                Hardware = new NodeHardwareProfile
                {
                    CpuCores = 16,
                    TotalRamMb = 32768,
                    DetectedEncoder = "h264_nvenc",
                    GpuName = "NVIDIA RTX 4080",
                    CapacityWeight = 3.5
                },
                Workload = new NodeWorkloadMetrics
                {
                    HostCpuPct = 25.5,
                    HostRamPct = 40.0,
                    GpuNvencPct = 18.0,
                    ActiveStreams = 6,
                    NormalizedLoadScore = 12.8
                }
            };

            string json = JsonSerializer.Serialize(beacon);
            var deserialized = JsonSerializer.Deserialize<ClusterNodeBeacon>(json);

            Assert.NotNull(deserialized);
            Assert.Equal(ClusterMeshConstants.BeaconMagic, deserialized.Magic);
            Assert.Equal("RENDER-RIG-01", deserialized.MachineName);
            Assert.Equal("Active-Active", deserialized.Role);
            Assert.True(deserialized.IsHoldingVip);
            Assert.Equal("192.168.1.200", deserialized.VirtualIp);
            Assert.Equal("h264_nvenc", deserialized.Hardware.DetectedEncoder);
            Assert.Equal(3.5, deserialized.Hardware.CapacityWeight);
            Assert.Equal(6, deserialized.Workload.ActiveStreams);
            Assert.Equal(12.8, deserialized.Workload.NormalizedLoadScore);
        }

        [Fact]
        public void NodeHardwareProfile_CapacityWeight_CorrectlyWeightsNvencQsvCpu()
        {
            double nvencWeight = NodeHardwareProfile.CalculateCapacityWeight("h264_nvenc", 8);
            double qsvWeight = NodeHardwareProfile.CalculateCapacityWeight("h264_qsv", 8);
            double amfWeight = NodeHardwareProfile.CalculateCapacityWeight("h264_amf", 8);
            double cpuWeight = NodeHardwareProfile.CalculateCapacityWeight("libx264", 8);

            Assert.Equal(3.5, nvencWeight);
            Assert.Equal(2.0, qsvWeight);
            Assert.Equal(2.5, amfWeight);
            Assert.Equal(1.0, cpuWeight);

            // High-capacity GPU should have higher weight than QSV, and QSV higher than CPU
            Assert.True(nvencWeight > qsvWeight);
            Assert.True(qsvWeight > cpuWeight);
        }

        [Fact]
        public void NodeWorkloadMetrics_ComputeLoadScore_WeightsHardwareCapacity()
        {
            // Scenario requested by user:
            // Server A has powerful GPU (NVENC weight 3.5), handling 6 streams, CPU 20%, GPU 20%
            // Server B has Intel QSV (weight 2.0), handling 3 streams, CPU 20%, GPU 20%
            double scoreA = NodeWorkloadMetrics.ComputeLoadScore(
                cpuPct: 20, ramPct: 30, gpuNvencPct: 20, activeStreams: 6, capacityWeight: 3.5);

            double scoreB = NodeWorkloadMetrics.ComputeLoadScore(
                cpuPct: 20, ramPct: 30, gpuNvencPct: 20, activeStreams: 3, capacityWeight: 2.0);

            // Despite handling DOUBLE the streams, Server A's score should be comparable to Server B!
            // Raw A = (20*0.4)+(30*0.1)+(6*5)+(20*0.3) = 8 + 3 + 30 + 6 = 47. 47 / 3.5 = 13.43
            // Raw B = (20*0.4)+(30*0.1)+(3*5)+(20*0.3) = 8 + 3 + 15 + 6 = 32. 32 / 2.0 = 16.0
            Assert.True(scoreA < scoreB, $"GPU node should have lower normalized strain ({scoreA} < {scoreB})");
        }

        [Fact]
        public void ClusterMeshService_StandaloneSingleNode_ReturnsSelfAsOptimal()
        {
            var config = new SystemConfig
            {
                Discovery = new DiscoverySettings
                {
                    Role = "Active-Active",
                    Priority = 1,
                    EnableVirtualIp = true,
                    VirtualIp = "192.168.1.200"
                }
            };
            var configMock = new Mock<IOptionsMonitor<SystemConfig>>();
            configMock.Setup(m => m.CurrentValue).Returns(config);

            var telemetryState = new Mock<ITelemetryStateService>();
            telemetryState.Setup(t => t.GetAllAgents()).Returns(new List<AgentTelemetryReport>());

            var netTelemetry = new NetworkTelemetry();
            var configurationMock = new Mock<Microsoft.Extensions.Configuration.IConfiguration>();
            var loggerMock = new Mock<ILogger<ClusterMeshService>>();

            var meshService = new ClusterMeshService(
                configMock.Object,
                telemetryState.Object,
                netTelemetry,
                configurationMock.Object,
                loggerMock.Object);

            Assert.True(meshService.IsStandalone);
            Assert.Equal(1, meshService.TotalActiveNodes);

            var allNodes = meshService.GetAllNodes();
            Assert.Single(allNodes);
            Assert.True(allNodes[0].IsLocal);

            var optimal = meshService.GetOptimalNodeForWorkload();
            Assert.NotNull(optimal);
            Assert.True(optimal.IsLocal);

            // In standalone mode with VIP enabled, local node always holds VIP
            Assert.True(meshService.ShouldLocalNodeHoldVip());
        }

        [Fact]
        public async Task ClusterController_Overview_ReturnsStandaloneAndActiveActiveMeshMetadata()
        {
            var config = new SystemConfig
            {
                HttpPort = 5090,
                MediaMtx = new MediaMtxSettings { RtmpPort = 19350 },
                Discovery = new DiscoverySettings
                {
                    Role = "Active-Active",
                    Priority = 1,
                    EnableVirtualIp = false
                }
            };
            var configMock = new Mock<IOptionsMonitor<SystemConfig>>();
            configMock.Setup(m => m.CurrentValue).Returns(config);

            var telemetryState = new Mock<ITelemetryStateService>();
            telemetryState.Setup(t => t.GetAllAgents()).Returns(new List<AgentTelemetryReport>());

            var netTelemetry = new NetworkTelemetry();
            var configurationMock = new Mock<Microsoft.Extensions.Configuration.IConfiguration>();
            var loggerMeshMock = new Mock<ILogger<ClusterMeshService>>();

            var meshService = new ClusterMeshService(
                configMock.Object,
                telemetryState.Object,
                netTelemetry,
                configurationMock.Object,
                loggerMeshMock.Object);

            var vipLogger = new Mock<ILogger<VirtualIpManagerService>>();
            var vipManager = new VirtualIpManagerService(configMock.Object, vipLogger.Object, meshService);

            var envMock = new Mock<Microsoft.Extensions.Hosting.IHostEnvironment>();
            envMock.Setup(e => e.ContentRootPath).Returns(AppContext.BaseDirectory);
            var settingsFileService = new SettingsFileService(envMock.Object);

            var httpClientFactory = new Mock<System.Net.Http.IHttpClientFactory>();
            var controllerLogger = new Mock<ILogger<ClusterController>>();

            var controller = new ClusterController(
                telemetryState.Object,
                vipManager,
                netTelemetry,
                settingsFileService,
                configMock.Object,
                configurationMock.Object,
                httpClientFactory.Object,
                controllerLogger.Object,
                meshService);

            var result = await controller.GetClusterOverview();
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);

            // Test dedicated mesh nodes endpoint
            var nodesResult = controller.GetClusterNodes();
            var nodesOk = Assert.IsType<OkObjectResult>(nodesResult);
            Assert.NotNull(nodesOk.Value);

            // Test optimal node endpoint
            var optimalResult = controller.GetOptimalNode();
            var optimalOk = Assert.IsType<OkObjectResult>(optimalResult);
            Assert.NotNull(optimalOk.Value);
        }

        #endregion
    }
}
