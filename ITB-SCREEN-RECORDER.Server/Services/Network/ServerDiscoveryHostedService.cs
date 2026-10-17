// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Services/Network/ServerDiscoveryHostedService.cs
// ==========================================
using System;
using System.Collections.Generic;
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
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace ITB_SCREEN_RECORDER.Server.Services.Network
{
    public class ServerDiscoveryHostedService : BackgroundService
    {
        private readonly IOptionsMonitor<SystemConfig> _configMonitor;
        private readonly ILogger<ServerDiscoveryHostedService> _logger;
        private readonly int _port;
        private readonly string _multicastAddress;

        public ServerDiscoveryHostedService(
            IOptionsMonitor<SystemConfig> configMonitor,
            ILogger<ServerDiscoveryHostedService> logger,
            int port = ServerDiscoveryConstants.DefaultDiscoveryPort,
            string multicastAddress = ServerDiscoveryConstants.DefaultMulticastAddress)
        {
            _configMonitor = configMonitor;
            _logger = logger;
            _port = port;
            _multicastAddress = multicastAddress;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            UdpClient? udpServer = null;

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    udpServer = new UdpClient();
                    udpServer.Client.SetSocketOption(SocketOptionLevel.Socket, SocketOptionName.ReuseAddress, true);
                    udpServer.Client.Bind(new IPEndPoint(IPAddress.Any, _port));

                    // Join the autonomous discovery multicast group
                    try
                    {
                        var mcastIp = IPAddress.Parse(_multicastAddress);
                        udpServer.JoinMulticastGroup(mcastIp);
                        _logger.LogInformation("[DISCOVERY SERVICE] Joined Multicast Group {Group}:{Port} (Listening for autonomous agent probes)", _multicastAddress, _port);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning(ex, "[DISCOVERY SERVICE] Multicast group join failed; listening on UDP broadcast fallback on port {Port}", _port);
                    }

                    while (!stoppingToken.IsCancellationRequested)
                    {
                        UdpReceiveResult receiveResult;
                        try
                        {
                            receiveResult = await udpServer.ReceiveAsync(stoppingToken);
                        }
                        catch (OperationCanceledException)
                        {
                            break;
                        }

                        _ = ProcessProbeAsync(udpServer, receiveResult, stoppingToken);
                    }
                }
                catch (OperationCanceledException)
                {
                    break;
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "[DISCOVERY SERVICE] Socket error encountered in discovery listener. Retrying in 5 seconds...");
                    await Task.Delay(5000, stoppingToken).ConfigureAwait(false);
                }
                finally
                {
                    try
                    {
                        udpServer?.Close();
                        udpServer?.Dispose();
                    }
                    catch { }
                }
            }
        }

        private async Task ProcessProbeAsync(UdpClient socket, UdpReceiveResult result, CancellationToken ct)
        {
            try
            {
                string payload = Encoding.UTF8.GetString(result.Buffer);
                if (!payload.Contains(ServerDiscoveryConstants.ProbeMagic))
                {
                    return; // Ignore non-discovery packets
                }

                var currentConfig = _configMonitor.CurrentValue;
                int httpPort = currentConfig.HttpPort > 0 ? currentConfig.HttpPort : 5090;
                int rtmpPort = currentConfig.MediaMtx?.RtmpPort > 0 ? currentConfig.MediaMtx.RtmpPort : 19350;

                var localIps = GetActiveLocalIps();
                string preferredIp = PickBestLocalIp(result.RemoteEndPoint.Address, localIps);

                var response = new ServerDiscoveryResponse
                {
                    ServerId = Environment.MachineName,
                    ServerName = $"ITB Central Server ({Environment.MachineName})",
                    Environment = "Production",
                    HttpPort = httpPort,
                    RtmpPort = rtmpPort,
                    ApiBaseUrl = $"https://{preferredIp}:{httpPort}",
                    RtmpBaseUrl = $"rtmps://{preferredIp}:{rtmpPort}/live",
                    ServerIps = localIps,
                    ServerUtcTime = DateTime.UtcNow,
                    AcceptingNewAgents = true
                };

                byte[] respBytes = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(response));

                // Send unicast response directly back to the probing agent/installer
                await socket.SendAsync(respBytes, respBytes.Length, result.RemoteEndPoint);

                _logger.LogInformation("[DISCOVERY SERVICE] Responded to discovery probe from {ClientEndpoint} with ApiBaseUrl: {Api}",
                    result.RemoteEndPoint, response.ApiBaseUrl);
            }
            catch (Exception ex)
            {
                _logger.LogDebug(ex, "[DISCOVERY SERVICE] Error replying to probe from {Endpoint}", result.RemoteEndPoint);
            }
        }

        private static List<string> GetActiveLocalIps()
        {
            var ips = new List<string>();
            try
            {
                var interfaces = NetworkInterface.GetAllNetworkInterfaces()
                    .Where(ni => ni.OperationalStatus == OperationalStatus.Up &&
                                 ni.NetworkInterfaceType != NetworkInterfaceType.Loopback);

                foreach (var iface in interfaces)
                {
                    var props = iface.GetIPProperties();
                    foreach (var addr in props.UnicastAddresses)
                    {
                        if (addr.Address.AddressFamily == AddressFamily.InterNetwork &&
                            !IPAddress.IsLoopback(addr.Address))
                        {
                            ips.Add(addr.Address.ToString());
                        }
                    }
                }
            }
            catch { }

            if (ips.Count == 0)
            {
                ips.Add("127.0.0.1");
            }

            return ips.Distinct().ToList();
        }

        private static string PickBestLocalIp(IPAddress remoteAddress, List<string> localIps)
        {
            if (localIps.Count == 0) return "127.0.0.1";

            // If the client's first 3 octets match one of our local IPs (same subnet /24 heuristic), use that one!
            byte[] remoteBytes = remoteAddress.GetAddressBytes();
            if (remoteBytes.Length == 4)
            {
                foreach (var ipStr in localIps)
                {
                    if (IPAddress.TryParse(ipStr, out var localIp))
                    {
                        byte[] localBytes = localIp.GetAddressBytes();
                        if (localBytes.Length == 4 &&
                            localBytes[0] == remoteBytes[0] &&
                            localBytes[1] == remoteBytes[1] &&
                            localBytes[2] == remoteBytes[2])
                        {
                            return ipStr;
                        }
                    }
                }
            }

            // Otherwise, return first non-loopback IP
            return localIps[0];
        }
    }
}
