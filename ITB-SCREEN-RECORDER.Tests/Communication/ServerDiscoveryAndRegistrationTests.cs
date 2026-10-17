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
using ITB_SCREEN_RECORDER.Core.Network.Discovery;
using ITB_SCREEN_RECORDER.Server.Controllers;
using ITB_SCREEN_RECORDER.Server.Services;
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

        #endregion
    }
}
