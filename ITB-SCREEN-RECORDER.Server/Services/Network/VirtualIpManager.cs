// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Services/Network/VirtualIpManager.cs
// ==========================================
using System;
using System.Linq;
using System.Net;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace ITB_SCREEN_RECORDER.Server.Services.Network
{
    public class VirtualIpManager : IVirtualIpManager
    {
        private readonly INetworkCommandRunner _commandRunner;
        private readonly ILogger<VirtualIpManager> _logger;

        public VirtualIpManager(
            INetworkCommandRunner commandRunner,
            ILogger<VirtualIpManager> logger)
        {
            _commandRunner = commandRunner;
            _logger = logger;
        }

        public Task<bool> IsVirtualIpBoundLocallyAsync(string virtualIp)
        {
            if (string.IsNullOrWhiteSpace(virtualIp)) return Task.FromResult(false);

            try
            {
                var trimmed = virtualIp.Trim();
                var interfaces = NetworkInterface.GetAllNetworkInterfaces()
                    .Where(ni => ni.OperationalStatus == OperationalStatus.Up &&
                                 ni.NetworkInterfaceType != NetworkInterfaceType.Loopback);

                foreach (var iface in interfaces)
                {
                    var props = iface.GetIPProperties();
                    foreach (var addr in props.UnicastAddresses)
                    {
                        if (addr.Address.AddressFamily == AddressFamily.InterNetwork &&
                            string.Equals(addr.Address.ToString(), trimmed, StringComparison.OrdinalIgnoreCase))
                        {
                            return Task.FromResult(true);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "[VIP MANAGER] Error scanning network interfaces for virtual IP {Vip}", virtualIp);
            }

            return Task.FromResult(false);
        }

        public string ResolveActiveInterfaceName(string? configuredInterface = null)
        {
            try
            {
                var interfaces = NetworkInterface.GetAllNetworkInterfaces()
                    .Where(ni => ni.OperationalStatus == OperationalStatus.Up &&
                                 ni.NetworkInterfaceType != NetworkInterfaceType.Loopback)
                    .ToList();

                if (!string.IsNullOrWhiteSpace(configuredInterface))
                {
                    var match = interfaces.FirstOrDefault(ni =>
                        string.Equals(ni.Name, configuredInterface.Trim(), StringComparison.OrdinalIgnoreCase) ||
                        string.Equals(ni.Id, configuredInterface.Trim(), StringComparison.OrdinalIgnoreCase) ||
                        ni.Description.Contains(configuredInterface.Trim(), StringComparison.OrdinalIgnoreCase));

                    if (match != null)
                    {
                        return match.Name;
                    }
                }

                // Auto-detect: Pick interface with IPv4 Gateway
                var gatewayIface = interfaces.FirstOrDefault(ni =>
                {
                    var props = ni.GetIPProperties();
                    return props.GatewayAddresses.Any(g => g.Address.AddressFamily == AddressFamily.InterNetwork) &&
                           props.UnicastAddresses.Any(u => u.Address.AddressFamily == AddressFamily.InterNetwork);
                });

                if (gatewayIface != null)
                {
                    return gatewayIface.Name;
                }

                // Fallback: first interface with valid IPv4
                var ipv4Iface = interfaces.FirstOrDefault(ni =>
                    ni.GetIPProperties().UnicastAddresses.Any(u => u.Address.AddressFamily == AddressFamily.InterNetwork));

                if (ipv4Iface != null)
                {
                    return ipv4Iface.Name;
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "[VIP MANAGER] Failed to resolve active network interface");
            }

            return OperatingSystem.IsWindows() ? "Ethernet" : "eth0";
        }

        public async Task<VipOperationResult> AcquireVirtualIpAsync(
            string virtualIp,
            string subnetMask,
            string? interfaceName = null,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(virtualIp) || !IPAddress.TryParse(virtualIp.Trim(), out var ipObj))
            {
                return new VipOperationResult(false, $"Invalid Virtual IP address: '{virtualIp}'");
            }

            if (string.IsNullOrWhiteSpace(subnetMask) || !IPAddress.TryParse(subnetMask.Trim(), out var maskObj))
            {
                subnetMask = "255.255.255.0";
            }

            string cleanVip = ipObj.ToString();
            string cleanMask = subnetMask.Trim();
            string iface = ResolveActiveInterfaceName(interfaceName);

            // Idempotent: check if already bound locally
            if (await IsVirtualIpBoundLocallyAsync(cleanVip))
            {
                _logger.LogInformation("[VIP MANAGER] Virtual IP {Vip} is already bound locally to interface '{Iface}'. Skipping add.", cleanVip, iface);
                await SendGratuitousArpAsync(cleanVip, iface);
                return new VipOperationResult(true, $"Virtual IP {cleanVip} is already bound locally", iface);
            }

            _logger.LogWarning("[VIP MANAGER] ACQUIRING Virtual IP {Vip} (Mask: {Mask}) on interface '{Iface}'...", cleanVip, cleanMask, iface);

            bool success = false;
            string message = string.Empty;

            if (OperatingSystem.IsWindows())
            {
                // Primary Windows command: netsh interface ipv4 add address name="Ethernet" address=10.0.0.100 mask=255.255.255.0
                string netshArgs = $"interface ipv4 add address name=\"{iface}\" address={cleanVip} mask={cleanMask}";
                var netshResult = await _commandRunner.RunCommandAsync("netsh.exe", netshArgs, ct);

                if (netshResult.Success ||
                    netshResult.StandardOutput.Contains("already exists", StringComparison.OrdinalIgnoreCase) ||
                    netshResult.StandardOutput.Contains("The object already exists", StringComparison.OrdinalIgnoreCase))
                {
                    success = true;
                    message = $"Virtual IP {cleanVip} acquired via netsh on interface '{iface}'.";
                }
                else
                {
                    _logger.LogWarning("[VIP MANAGER] netsh failed (Exit: {Exit}): {StdErr} {StdOut}. Trying PowerShell fallback...",
                        netshResult.ExitCode, netshResult.StandardError, netshResult.StandardOutput);

                    int prefixLength = SubnetMaskToCidr(cleanMask);
                    string psArgs = $"-NoProfile -NonInteractive -Command \"New-NetIPAddress -InterfaceAlias '{iface}' -IPAddress '{cleanVip}' -PrefixLength {prefixLength} -SkipAsSource $false\"";
                    var psResult = await _commandRunner.RunCommandAsync("powershell.exe", psArgs, ct);

                    if (psResult.Success || psResult.StandardOutput.Contains("already exists", StringComparison.OrdinalIgnoreCase))
                    {
                        success = true;
                        message = $"Virtual IP {cleanVip} acquired via PowerShell New-NetIPAddress on interface '{iface}'.";
                    }
                    else
                    {
                        success = false;
                        message = $"Failed to acquire Virtual IP {cleanVip}. netsh: {netshResult.StandardError}. PS: {psResult.StandardError}";
                    }
                }
            }
            else
            {
                // Linux: ip addr add 10.0.0.100/24 dev eth0
                int prefixLength = SubnetMaskToCidr(cleanMask);
                string ipArgs = $"addr add {cleanVip}/{prefixLength} dev {iface}";
                var ipResult = await _commandRunner.RunCommandAsync("ip", ipArgs, ct);

                if (ipResult.Success || ipResult.StandardError.Contains("File exists", StringComparison.OrdinalIgnoreCase))
                {
                    success = true;
                    message = $"Virtual IP {cleanVip} acquired via ip addr add on '{iface}'.";
                }
                else
                {
                    success = false;
                    message = $"Failed to acquire Virtual IP {cleanVip} on Linux: {ipResult.StandardError}";
                }
            }

            if (success)
            {
                _logger.LogInformation("[VIP MANAGER] SUCCESS: {Message}", message);
                await SendGratuitousArpAsync(cleanVip, iface);
            }
            else
            {
                _logger.LogError("[VIP MANAGER] ERROR: {Message}", message);
            }

            return new VipOperationResult(success, message, iface);
        }

        public async Task<VipOperationResult> ReleaseVirtualIpAsync(
            string virtualIp,
            string? interfaceName = null,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(virtualIp) || !IPAddress.TryParse(virtualIp.Trim(), out var ipObj))
            {
                return new VipOperationResult(true, "Virtual IP is empty or invalid. No release necessary.");
            }

            string cleanVip = ipObj.ToString();
            string iface = ResolveActiveInterfaceName(interfaceName);

            // If not bound locally, release is already complete
            if (!await IsVirtualIpBoundLocallyAsync(cleanVip))
            {
                _logger.LogInformation("[VIP MANAGER] Virtual IP {Vip} is not bound locally. Skipping release.", cleanVip);
                return new VipOperationResult(true, $"Virtual IP {cleanVip} was not bound locally", iface);
            }

            _logger.LogWarning("[VIP MANAGER] RELEASING Virtual IP {Vip} from interface '{Iface}'...", cleanVip, iface);

            bool success = false;
            string message = string.Empty;

            if (OperatingSystem.IsWindows())
            {
                // netsh interface ipv4 delete address name="Ethernet" address=10.0.0.100
                string netshArgs = $"interface ipv4 delete address name=\"{iface}\" address={cleanVip}";
                var netshResult = await _commandRunner.RunCommandAsync("netsh.exe", netshArgs, ct);

                if (netshResult.Success || netshResult.StandardOutput.Contains("not found", StringComparison.OrdinalIgnoreCase))
                {
                    success = true;
                    message = $"Virtual IP {cleanVip} released via netsh from interface '{iface}'.";
                }
                else
                {
                    _logger.LogWarning("[VIP MANAGER] netsh delete failed (Exit: {Exit}). Trying PowerShell Remove-NetIPAddress fallback...", netshResult.ExitCode);

                    string psArgs = $"-NoProfile -NonInteractive -Command \"Remove-NetIPAddress -InterfaceAlias '{iface}' -IPAddress '{cleanVip}' -Confirm:$false -ErrorAction SilentlyContinue\"";
                    var psResult = await _commandRunner.RunCommandAsync("powershell.exe", psArgs, ct);

                    success = psResult.Success;
                    message = success
                        ? $"Virtual IP {cleanVip} released via PowerShell Remove-NetIPAddress."
                        : $"Failed to release Virtual IP {cleanVip}: {psResult.StandardError}";
                }
            }
            else
            {
                // Linux: ip addr del 10.0.0.100/24 dev eth0 or ip addr del 10.0.0.100 dev eth0
                string ipArgs = $"addr del {cleanVip} dev {iface}";
                var ipResult = await _commandRunner.RunCommandAsync("ip", ipArgs, ct);

                success = ipResult.Success || ipResult.StandardError.Contains("Cannot assign requested address", StringComparison.OrdinalIgnoreCase);
                message = success
                    ? $"Virtual IP {cleanVip} released via ip addr del from '{iface}'."
                    : $"Failed to release Virtual IP {cleanVip} on Linux: {ipResult.StandardError}";
            }

            if (success)
            {
                _logger.LogInformation("[VIP MANAGER] RELEASE SUCCESS: {Message}", message);
            }
            else
            {
                _logger.LogWarning("[VIP MANAGER] RELEASE WARNING: {Message}", message);
            }

            return new VipOperationResult(success, message, iface);
        }

        public async Task SendGratuitousArpAsync(string virtualIp, string? interfaceName = null)
        {
            try
            {
                string iface = ResolveActiveInterfaceName(interfaceName);

                if (OperatingSystem.IsWindows())
                {
                    // Trigger Windows ARP and DNS registration broadcast
                    _ = _commandRunner.RunCommandAsync("ipconfig.exe", "/registerdns", CancellationToken.None);
                }
                else
                {
                    // Linux: arping -U (unsolicited) -c 3 -I {iface} {vip}
                    await _commandRunner.RunCommandAsync("arping", $"-U -c 3 -I {iface} {virtualIp}", CancellationToken.None);
                }

                _logger.LogDebug("[VIP MANAGER] Broadcasted Gratuitous ARP for Virtual IP {Vip} on '{Iface}'", virtualIp, iface);
            }
            catch (Exception ex)
            {
                _logger.LogDebug(ex, "[VIP MANAGER] Gratuitous ARP notification completed with soft warning");
            }
        }

        public static int SubnetMaskToCidr(string subnetMask)
        {
            if (IPAddress.TryParse(subnetMask, out var mask))
            {
                byte[] bytes = mask.GetAddressBytes();
                int bits = 0;
                foreach (var b in bytes)
                {
                    for (int i = 7; i >= 0; i--)
                    {
                        if ((b & (1 << i)) != 0) bits++;
                        else return bits;
                    }
                }
                return bits;
            }
            return 24; // Default to /24
        }
    }
}
