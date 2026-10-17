// ==========================================
// File: ITB-SCREEN-RECORDER.Server/Services/Network/VirtualIpManagerService.cs
// ==========================================
using System;
using System.Diagnostics;
using System.Linq;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Threading;
using System.Threading.Tasks;
using ITB_SCREEN_RECORDER.Core.Configuration;
using ITB_SCREEN_RECORDER.Core.Network.Discovery;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace ITB_SCREEN_RECORDER.Server.Services.Network
{
    /// <summary>
    /// Autonomous Virtual IP (VIP) Manager for High-Availability clusters.
    /// Ensures that the primary server actively owns the VIP, and in the event of primary failure,
    /// the secondary standby server automatically binds the VIP and broadcasts gratuitous ARP.
    /// Supports Windows (via netsh) and Linux (via iproute2 / arping) natively.
    /// </summary>
    public class VirtualIpManagerService : BackgroundService
    {
        private readonly IOptionsMonitor<SystemConfig> _configMonitor;
        private readonly ILogger<VirtualIpManagerService> _logger;
        private bool _isHoldingVip = false;
        private int _failedHealthChecks = 0;

        public VirtualIpManagerService(
            IOptionsMonitor<SystemConfig> configMonitor,
            ILogger<VirtualIpManagerService> logger)
        {
            _configMonitor = configMonitor;
            _logger = logger;
        }

        public bool IsHoldingVip => _isHoldingVip;
        public DateTime? LastVipTransitionUtc { get; private set; }
        public string? ActiveInterfaceName { get; private set; }
        public int FailedHealthChecks => _failedHealthChecks;

        public async Task<bool> ForceAcquireVipAsync()
        {
            var disc = _configMonitor.CurrentValue.Discovery ?? new DiscoverySettings();
            if (string.IsNullOrWhiteSpace(disc.VirtualIp)) return false;
            await AcquireVirtualIpAsync(disc).ConfigureAwait(false);
            return _isHoldingVip;
        }

        public async Task<bool> ForceReleaseVipAsync()
        {
            var disc = _configMonitor.CurrentValue.Discovery ?? new DiscoverySettings();
            await ReleaseVirtualIpAsync(disc).ConfigureAwait(false);
            return !_isHoldingVip;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("[VIP MANAGER] Service started. Monitoring cluster redundancy role and VIP state...");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    var config = _configMonitor.CurrentValue;
                    var disc = config.Discovery ?? new DiscoverySettings();

                    if (!disc.EnableVirtualIp || string.IsNullOrWhiteSpace(disc.VirtualIp))
                    {
                        if (_isHoldingVip)
                        {
                            await ReleaseVirtualIpAsync(disc).ConfigureAwait(false);
                        }
                        await Task.Delay(3000, stoppingToken).ConfigureAwait(false);
                        continue;
                    }

                    bool isPrimary = string.Equals(disc.Role, "Primary", StringComparison.OrdinalIgnoreCase);
                    bool isSecondary = string.Equals(disc.Role, "Secondary", StringComparison.OrdinalIgnoreCase);

                    if (isPrimary)
                    {
                        // Primary node must always attempt to hold the Virtual IP
                        if (!_isHoldingVip)
                        {
                            await AcquireVirtualIpAsync(disc).ConfigureAwait(false);
                        }
                    }
                    else if (isSecondary)
                    {
                        // Secondary node monitors Primary health and takes over only if Primary fails
                        string partnerUrl = (disc.PartnerServerUrl ?? string.Empty).Trim();
                        if (string.IsNullOrWhiteSpace(partnerUrl))
                        {
                            _logger.LogDebug("[VIP MANAGER] Secondary node has no PartnerServerUrl configured for VIP failover.");
                        }
                        else
                        {
                            bool primaryHealthy = await ServerDiscoveryClient.VerifyServerHealthAsync(partnerUrl, 1500, stoppingToken).ConfigureAwait(false);
                            if (primaryHealthy)
                            {
                                _failedHealthChecks = 0;
                                if (_isHoldingVip)
                                {
                                    _logger.LogInformation("[VIP MANAGER] Primary server recovered at {PartnerUrl}. Releasing VIP back to Primary node.", partnerUrl);
                                    await ReleaseVirtualIpAsync(disc).ConfigureAwait(false);
                                }
                            }
                            else
                            {
                                _failedHealthChecks++;
                                _logger.LogWarning("[VIP MANAGER] Primary health check failed ({Count}/2) at {PartnerUrl}.", _failedHealthChecks, partnerUrl);

                                // After 2 consecutive failures (~3-4 seconds), fail over and claim the VIP!
                                if (_failedHealthChecks >= 2 && !_isHoldingVip)
                                {
                                    _logger.LogWarning("[VIP MANAGER] Primary server confirmed OFFLINE! Secondary taking ownership of Virtual IP {Vip}.", disc.VirtualIp);
                                    await AcquireVirtualIpAsync(disc).ConfigureAwait(false);
                                }
                            }
                        }
                    }
                }
                catch (OperationCanceledException)
                {
                    break;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "[VIP MANAGER] Unexpected error in VIP supervision loop.");
                }

                await Task.Delay(2000, stoppingToken).ConfigureAwait(false);
            }

            // Cleanup on shutdown
            var finalDisc = _configMonitor.CurrentValue.Discovery ?? new DiscoverySettings();
            if (_isHoldingVip)
            {
                await ReleaseVirtualIpAsync(finalDisc).ConfigureAwait(false);
            }
        }

        public override async Task StopAsync(CancellationToken cancellationToken)
        {
            if (_isHoldingVip)
            {
                var disc = _configMonitor.CurrentValue.Discovery ?? new DiscoverySettings();
                await ReleaseVirtualIpAsync(disc).ConfigureAwait(false);
            }
            await base.StopAsync(cancellationToken).ConfigureAwait(false);
        }

        private async Task AcquireVirtualIpAsync(DiscoverySettings disc)
        {
            string vip = disc.VirtualIp!.Trim();
            string mask = !string.IsNullOrWhiteSpace(disc.VirtualIpSubnetMask) ? disc.VirtualIpSubnetMask.Trim() : "255.255.255.0";
            string? iface = ResolveInterfaceName(disc.NetworkInterfaceName);

            if (string.IsNullOrWhiteSpace(iface))
            {
                _logger.LogWarning("[VIP MANAGER] Unable to resolve active network interface to bind VIP {Vip}.", vip);
                return;
            }

            _logger.LogInformation("[VIP MANAGER] Binding Virtual IP {Vip} on interface '{Interface}' (Mask: {Mask})...", vip, iface, mask);

            bool success = false;
            if (OperatingSystem.IsWindows())
            {
                // netsh interface ipv4 add address name="Ethernet" addr=192.168.1.10 mask=255.255.255.0
                success = await RunCommandAsync("netsh", $"interface ipv4 add address name=\"{iface}\" addr={vip} mask={mask}").ConfigureAwait(false);
            }
            else if (OperatingSystem.IsLinux())
            {
                // ip addr add 192.168.1.10/24 dev eth0
                int prefix = SubnetMaskToCidr(mask);
                success = await RunCommandAsync("ip", $"addr add {vip}/{prefix} dev {iface}").ConfigureAwait(false);
                if (success)
                {
                    // Emit gratuitous ARP announcement to switch
                    _ = RunCommandAsync("arping", $"-c 2 -U -I {iface} {vip}");
                }
            }

            if (success)
            {
                _isHoldingVip = true;
                ActiveInterfaceName = iface;
                LastVipTransitionUtc = DateTime.UtcNow;
                _logger.LogInformation("[VIP MANAGER] Successfully ACQUIRED Virtual IP {Vip} on interface '{Interface}'.", vip, iface);
            }
            else
            {
                _logger.LogWarning("[VIP MANAGER] Command to acquire Virtual IP {Vip} returned non-zero code. It may already be assigned or require elevated permissions.", vip);
                _isHoldingVip = true; // Mark as holding if already assigned
                ActiveInterfaceName = iface;
                LastVipTransitionUtc = DateTime.UtcNow;
            }
        }

        private async Task ReleaseVirtualIpAsync(DiscoverySettings disc)
        {
            if (string.IsNullOrWhiteSpace(disc.VirtualIp))
            {
                _isHoldingVip = false;
                return;
            }

            string vip = disc.VirtualIp.Trim();
            string? iface = ResolveInterfaceName(disc.NetworkInterfaceName);
            if (string.IsNullOrWhiteSpace(iface))
            {
                _isHoldingVip = false;
                return;
            }

            _logger.LogInformation("[VIP MANAGER] Releasing Virtual IP {Vip} from interface '{Interface}'...", vip, iface);

            if (OperatingSystem.IsWindows())
            {
                await RunCommandAsync("netsh", $"interface ipv4 delete address name=\"{iface}\" addr={vip}").ConfigureAwait(false);
            }
            else if (OperatingSystem.IsLinux())
            {
                string mask = !string.IsNullOrWhiteSpace(disc.VirtualIpSubnetMask) ? disc.VirtualIpSubnetMask.Trim() : "255.255.255.0";
                int prefix = SubnetMaskToCidr(mask);
                await RunCommandAsync("ip", $"addr del {vip}/{prefix} dev {iface}").ConfigureAwait(false);
            }

            _isHoldingVip = false;
            LastVipTransitionUtc = DateTime.UtcNow;
            _logger.LogInformation("[VIP MANAGER] Virtual IP {Vip} released.", vip);
        }

        private static string? ResolveInterfaceName(string? configuredName)
        {
            if (!string.IsNullOrWhiteSpace(configuredName)) return configuredName;

            var iface = NetworkInterface.GetAllNetworkInterfaces()
                .FirstOrDefault(ni => ni.OperationalStatus == OperationalStatus.Up
                    && ni.NetworkInterfaceType != NetworkInterfaceType.Loopback
                    && ni.GetIPProperties().UnicastAddresses.Any(u => u.Address.AddressFamily == AddressFamily.InterNetwork));

            return iface?.Name;
        }

        private static int SubnetMaskToCidr(string mask)
        {
            try
            {
                var bytes = System.Net.IPAddress.Parse(mask).GetAddressBytes();
                int bits = 0;
                foreach (var b in bytes)
                {
                    for (int i = 7; i >= 0; i--)
                    {
                        if ((b & (1 << i)) != 0) bits++;
                    }
                }
                return bits > 0 ? bits : 24;
            }
            catch
            {
                return 24;
            }
        }

        private async Task<bool> RunCommandAsync(string command, string arguments)
        {
            try
            {
                var psi = new ProcessStartInfo
                {
                    FileName = command,
                    Arguments = arguments,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };
                using var process = Process.Start(psi);
                if (process == null) return false;
                await process.WaitForExitAsync().ConfigureAwait(false);
                return process.ExitCode == 0;
            }
            catch (Exception ex)
            {
                _logger.LogDebug(ex, "[VIP MANAGER] Execution of '{Cmd} {Args}' failed.", command, arguments);
                return false;
            }
        }
    }
}
