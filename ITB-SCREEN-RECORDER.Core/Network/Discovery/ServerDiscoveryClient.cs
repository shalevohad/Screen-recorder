// ==========================================
// File: ITB-SCREEN-RECORDER.Core/Network/Discovery/ServerDiscoveryClient.cs
// ==========================================
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Contracts.Network;
using ITB_SCREEN_RECORDER.Core.Security.Pki;
using Microsoft.Extensions.Logging;

namespace ITB_SCREEN_RECORDER.Core.Network.Discovery
{
    public class ServerDiscoveryClient
    {
        private readonly ILogger? _logger;
        private readonly int _discoveryPort;
        private readonly string _multicastAddress;
        private readonly List<string> _dnsSearchHostnames;
        private readonly int _fallbackHttpPort;
        private readonly int _fallbackRtmpPort;
        private readonly string _targetEnvironment;

        public ServerDiscoveryClient(
            ILogger? logger = null,
            int discoveryPort = ServerDiscoveryConstants.DefaultDiscoveryPort,
            string multicastAddress = ServerDiscoveryConstants.DefaultMulticastAddress,
            IEnumerable<string>? dnsSearchHostnames = null,
            int fallbackHttpPort = 5090,
            int fallbackRtmpPort = 19350,
            string targetEnvironment = "Production")
        {
            _logger = logger;
            _discoveryPort = discoveryPort;
            _multicastAddress = multicastAddress;
            _dnsSearchHostnames = dnsSearchHostnames != null
                ? dnsSearchHostnames.Where(h => !string.IsNullOrWhiteSpace(h)).Select(h => h.Trim()).Distinct(StringComparer.OrdinalIgnoreCase).ToList()
                : new List<string> { "itb-server", "screenrecorder" };
            _fallbackHttpPort = fallbackHttpPort > 0 ? fallbackHttpPort : 5090;
            _fallbackRtmpPort = fallbackRtmpPort > 0 ? fallbackRtmpPort : 19350;
            _targetEnvironment = !string.IsNullOrWhiteSpace(targetEnvironment) ? targetEnvironment : "Production";
        }

        /// <summary>
        /// Sends an autonomous discovery probe across Multicast and Broadcast channels,
        /// collecting all responding ITB Central Servers within the specified timeout.
        /// </summary>
        public async Task<List<ServerDiscoveryResponse>> DiscoverServersAsync(int timeoutMs = 2000, CancellationToken ct = default)
        {
            var discoveredServers = new ConcurrentDictionary<string, ServerDiscoveryResponse>(StringComparer.OrdinalIgnoreCase);
            using var cts = CancellationTokenSource.CreateLinkedTokenSource(ct);
            cts.CancelAfter(timeoutMs);

            using var udpClient = new UdpClient();
            try
            {
                // Allow broadcasting and set multicast TTL to allow crossing local routers if configured
                udpClient.EnableBroadcast = true;
                try
                {
                    udpClient.Client.SetSocketOption(SocketOptionLevel.IP, SocketOptionName.MulticastTimeToLive, 4);
                }
                catch { /* Non-critical if socket option fails on specific OS stack */ }

                var probe = new ServerDiscoveryProbe
                {
                    ClientMachineName = Environment.MachineName,
                    TimestampUtc = DateTime.UtcNow
                };

                byte[] probeBytes = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(probe));

                // 1. Send Multicast Probe
                try
                {
                    var multicastEp = new IPEndPoint(IPAddress.Parse(_multicastAddress), _discoveryPort);
                    await udpClient.SendAsync(probeBytes, probeBytes.Length, multicastEp);
                    _logger?.LogDebug("[DISCOVERY] Sent UDP multicast probe to {Address}:{Port}", _multicastAddress, _discoveryPort);
                }
                catch (Exception ex)
                {
                    _logger?.LogDebug(ex, "[DISCOVERY] Failed to send multicast probe. Falling back to subnet broadcast.");
                }

                // 2. Send Broadcast Probe (for flat networks or where multicast is restricted)
                try
                {
                    var broadcastEp = new IPEndPoint(IPAddress.Broadcast, _discoveryPort);
                    await udpClient.SendAsync(probeBytes, probeBytes.Length, broadcastEp);
                    _logger?.LogDebug("[DISCOVERY] Sent UDP broadcast probe to 255.255.255.255:{Port}", _discoveryPort);
                }
                catch (Exception ex)
                {
                    _logger?.LogDebug(ex, "[DISCOVERY] Failed to send broadcast probe.");
                }

                // 3. Listen for incoming responses until timeout
                while (!cts.Token.IsCancellationRequested)
                {
                    try
                    {
                        var receiveTask = udpClient.ReceiveAsync(cts.Token);
                        var result = await receiveTask;

                        string json = Encoding.UTF8.GetString(result.Buffer);
                        var response = JsonSerializer.Deserialize<ServerDiscoveryResponse>(json, new JsonSerializerOptions
                        {
                            PropertyNameCaseInsensitive = true
                        });

                        if (response != null && response.Magic == ServerDiscoveryConstants.ResponseMagic)
                        {
                            // If ApiBaseUrl is relative or loopback, enrich with the actual remote IP that answered
                            string respondingIp = result.RemoteEndPoint.Address.ToString();
                            if (string.IsNullOrWhiteSpace(response.ApiBaseUrl) || response.ApiBaseUrl.Contains("127.0.0.1") || response.ApiBaseUrl.Contains("localhost"))
                            {
                                response.ApiBaseUrl = $"https://{respondingIp}:{response.HttpPort}";
                            }
                            if (string.IsNullOrWhiteSpace(response.RtmpBaseUrl) || response.RtmpBaseUrl.Contains("127.0.0.1") || response.RtmpBaseUrl.Contains("localhost"))
                            {
                                response.RtmpBaseUrl = $"rtmps://{respondingIp}:{response.RtmpPort}/live";
                            }

                            if (!response.ServerIps.Contains(respondingIp))
                            {
                                response.ServerIps.Insert(0, respondingIp);
                            }

                            string key = !string.IsNullOrWhiteSpace(response.ServerId) ? response.ServerId : response.ApiBaseUrl;
                            discoveredServers.TryAdd(key, response);
                            _logger?.LogInformation("[DISCOVERY] Discovered server '{Name}' at {Api} (Status: accepting={Accepting})",
                                response.ServerName, response.ApiBaseUrl, response.AcceptingNewAgents);
                        }
                    }
                    catch (OperationCanceledException)
                    {
                        break;
                    }
                    catch (Exception ex)
                    {
                        _logger?.LogDebug(ex, "[DISCOVERY] Error receiving UDP packet.");
                    }
                }
            }
            catch (Exception ex)
            {
                _logger?.LogWarning(ex, "[DISCOVERY] UDP Discovery process encountered an issue.");
            }

            // Fallback: If no server was found via UDP, attempt Corporate DNS resolution if available
            if (discoveredServers.IsEmpty)
            {
                var dnsServer = await TryDiscoverViaDnsAsync(ct);
                if (dnsServer != null)
                {
                    discoveredServers.TryAdd(dnsServer.ServerId, dnsServer);
                }
            }

            return discoveredServers.Values
                .OrderByDescending(s => s.AcceptingNewAgents)
                .ThenBy(s => s.Priority > 0 ? s.Priority : 100)
                .ThenByDescending(s => string.Equals(s.Role, "Primary", StringComparison.OrdinalIgnoreCase))
                .ThenByDescending(s => string.Equals(s.Environment, _targetEnvironment, StringComparison.OrdinalIgnoreCase))
                .ToList();
        }

        /// <summary>
        /// Discovers the single best candidate server (prioritizing Primary role, Priority level, and target environment).
        /// Returns null if no reachable server is detected.
        /// </summary>
        public async Task<ServerDiscoveryResponse?> DiscoverBestServerAsync(int timeoutMs = 2000, CancellationToken ct = default)
        {
            var servers = await DiscoverServersAsync(timeoutMs, ct);
            return servers.FirstOrDefault();
        }

        /// <summary>
        /// Probes corporate DNS suffixes for configured server hostnames.
        /// </summary>
        private async Task<ServerDiscoveryResponse?> TryDiscoverViaDnsAsync(CancellationToken ct)
        {
            try
            {
                string domain = string.Empty;
                try
                {
                    domain = IPGlobalProperties.GetIPGlobalProperties().DomainName;
                }
                catch { /* Network properties may not be available on all environments */ }

                var candidates = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
                foreach (var host in _dnsSearchHostnames)
                {
                    if (string.IsNullOrWhiteSpace(host)) continue;
                    string trimmed = host.Trim();
                    candidates.Add(trimmed);

                    if (!string.IsNullOrWhiteSpace(domain) && !trimmed.Contains('.'))
                    {
                        candidates.Add($"{trimmed}.{domain.Trim().TrimStart('.')}");
                    }
                }

                foreach (var host in candidates)
                {
                    try
                    {
                        var addresses = await Dns.GetHostAddressesAsync(host, ct);
                        var validIp = addresses.FirstOrDefault(a => a.AddressFamily == AddressFamily.InterNetwork);
                        if (validIp != null)
                        {
                            string ipStr = validIp.ToString();
                            _logger?.LogInformation("[DISCOVERY] Found Central Server through DNS: {Host} -> {Ip}", host, ipStr);

                            return new ServerDiscoveryResponse
                            {
                                ServerId = $"DNS-{host}",
                                ServerName = host,
                                Environment = _targetEnvironment,
                                Role = "Primary",
                                Priority = 1,
                                ApiBaseUrl = $"https://{ipStr}:{_fallbackHttpPort}",
                                RtmpBaseUrl = $"rtmps://{ipStr}:{_fallbackRtmpPort}/live",
                                HttpPort = _fallbackHttpPort,
                                RtmpPort = _fallbackRtmpPort,
                                ServerIps = new List<string> { ipStr }
                            };
                        }
                    }
                    catch { /* Host resolution failure is expected for unused candidates */ }
                }
            }
            catch (Exception ex)
            {
                _logger?.LogDebug(ex, "[DISCOVERY] DNS discovery check skipped.");
            }

            return null;
        }

        /// <summary>
        /// Performs a fast HTTPS health probe against an endpoint to confirm reachability.
        /// </summary>
        public static async Task<bool> VerifyServerHealthAsync(string apiBaseUrl, int timeoutMs = 2500, CancellationToken ct = default)
        {
            try
            {
                var handler = new HttpClientHandler();
                AgentCertificateValidator.ConfigureHandler(handler);

                using var client = new HttpClient(handler)
                {
                    Timeout = TimeSpan.FromMilliseconds(timeoutMs)
                };

                string cleanUrl = apiBaseUrl.TrimEnd('/');
                string target = cleanUrl.StartsWith("http", StringComparison.OrdinalIgnoreCase)
                    ? $"{cleanUrl}/api/v1/health"
                    : $"https://{cleanUrl}/api/v1/health";

                using var response = await client.GetAsync(target, ct);
                return response.IsSuccessStatusCode;
            }
            catch
            {
                return false;
            }
        }
    }
}
