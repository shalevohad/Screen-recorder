using ITB_SCREEN_RECORDER.Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.NetworkInformation;
using System.Threading;

namespace ITB_SCREEN_RECORDER.Core.Diagnostics
{
    public class NicMetric
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public double LinkSpeedMbps { get; set; }
        public double TxMbps { get; set; }
        public double RxMbps { get; set; }
        public double UtilizationPct { get; set; }
    }

    public class NetworkMetricsSnapshot
    {
        public double AppMediaTxMbps { get; set; }
        public double AppTelemetryTxKbps { get; set; }

        public double NicLinkSpeedMbps { get; set; }
        public double NicTotalTxMbps { get; set; }
        public double NicTotalRxMbps { get; set; }
        public double AppLineUtilizationPct { get; set; }

        public List<NicMetric> Nics { get; set; } = new();
    }

    public class NetworkTelemetry
    {
        private long _appMediaBytesTx = 0;
        private long _appTelemetryBytesTx = 0;
        private DateTime _lastSampleTime;

        private readonly Dictionary<string, (long BytesSent, long BytesReceived)> _nicStates = new();
        private string _routedNicId = string.Empty;

        public NetworkTelemetry()
        {
            _lastSampleTime = DateTime.UtcNow;
        }

        public void TrackMediaBytes(long bytes) => Interlocked.Add(ref _appMediaBytesTx, bytes);
        public void TrackTelemetryBytes(long bytes) => Interlocked.Add(ref _appTelemetryBytesTx, bytes);

        public void ResolveRoutingInterface(string targetServerIp)
        {
            if (string.IsNullOrWhiteSpace(targetServerIp)) return;

            try
            {
                using var socket = new System.Net.Sockets.Socket(System.Net.Sockets.AddressFamily.InterNetwork, System.Net.Sockets.SocketType.Dgram, 0);
                socket.Connect(targetServerIp, 65530);

                if (socket.LocalEndPoint is IPEndPoint endPoint)
                {
                    string localIpUsed = endPoint.Address.ToString();

                    var matchedNic = NetworkInterface.GetAllNetworkInterfaces()
                        .FirstOrDefault(nic => nic.OperationalStatus == OperationalStatus.Up &&
                                               nic.GetIPProperties().UnicastAddresses
                                                  .Any(ua => ua.Address.ToString() == localIpUsed));

                    if (matchedNic != null)
                    {
                        _routedNicId = matchedNic.Id;
                    }
                }
            }
            catch { }
        }

        public NetworkMetricsSnapshot GetMetricsSnapshot()
        {
            DateTime now = DateTime.UtcNow;
            double elapsedSeconds = (now - _lastSampleTime).TotalSeconds;

            long mediaBytes = Interlocked.Exchange(ref _appMediaBytesTx, 0);
            long telemBytes = Interlocked.Exchange(ref _appTelemetryBytesTx, 0);
            _lastSampleTime = now;

            var snapshot = new NetworkMetricsSnapshot();

            if (elapsedSeconds > 0)
            {
                snapshot.AppMediaTxMbps = Math.Round((mediaBytes * 8.0) / (elapsedSeconds * 1_000_000.0), 2);
                snapshot.AppTelemetryTxKbps = Math.Round((telemBytes * 8.0) / (elapsedSeconds * 1_000.0), 2);

                // 💡 סינון קפדני: לוקחים אך ורק כרטיסים פיזיים פעילים, ללא VPN, ללא Virtual Switch, וללא Loopback
                var activeNics = NetworkInterface.GetAllNetworkInterfaces()
                    .Where(nic => nic.OperationalStatus == OperationalStatus.Up &&
                                  nic.NetworkInterfaceType != NetworkInterfaceType.Loopback &&
                                  nic.NetworkInterfaceType != NetworkInterfaceType.Tunnel &&
                                  !nic.Name.Contains("Virtual", StringComparison.OrdinalIgnoreCase) &&
                                  !nic.Name.Contains("VMware", StringComparison.OrdinalIgnoreCase) &&
                                  !nic.Name.Contains("Hyper-V", StringComparison.OrdinalIgnoreCase) &&
                                  !nic.Description.Contains("Virtual", StringComparison.OrdinalIgnoreCase))
                    .ToList();

                foreach (var nic in activeNics)
                {
                    try
                    {
                        var stats = nic.GetIPv4Statistics();
                        long currentSent = stats.BytesSent;
                        long currentReceived = stats.BytesReceived;

                        double txMbps = 0, rxMbps = 0, utilPct = 0;
                        double linkSpeed = nic.Speed / 1_000_000.0;

                        if (_nicStates.TryGetValue(nic.Id, out var prevState))
                        {
                            txMbps = Math.Round(((currentSent - prevState.BytesSent) * 8.0) / (elapsedSeconds * 1_000_000.0), 2);
                            rxMbps = Math.Round(((currentReceived - prevState.BytesReceived) * 8.0) / (elapsedSeconds * 1_000_000.0), 2);

                            if (linkSpeed > 0)
                            {
                                double maxThroughput = Math.Max(txMbps, rxMbps);
                                utilPct = Math.Round((maxThroughput / linkSpeed) * 100.0, 2);
                            }
                        }

                        _nicStates[nic.Id] = (currentSent, currentReceived);

                        // 💡 סינון נוסף: נציג רק כרטיסים שיש להם מהירות לינק אמיתית ושעוברת בהם תעבורה או שהם הוגדרו כממשקי ליבה
                        bool hasTraffic = (txMbps > 0.05 || rxMbps > 0.05);
                        bool isRelevantNic = hasTraffic || linkSpeed >= 1000; // מציג כרטיסי 1Gbps ומעלה או כאלה שפעילים כרגע

                        if (linkSpeed > 0 && isRelevantNic)
                        {
                            snapshot.Nics.Add(new NicMetric
                            {
                                Id = nic.Id,
                                Name = nic.Name,
                                LinkSpeedMbps = linkSpeed,
                                TxMbps = txMbps,
                                RxMbps = rxMbps,
                                UtilizationPct = utilPct
                            });
                        }
                    }
                    catch { }
                }

                var targetNic = snapshot.Nics.FirstOrDefault(n => n.Id == _routedNicId)
                             ?? snapshot.Nics.OrderByDescending(n => n.RxMbps + n.TxMbps).FirstOrDefault();

                if (targetNic != null)
                {
                    snapshot.NicLinkSpeedMbps = targetNic.LinkSpeedMbps;
                    snapshot.NicTotalTxMbps = targetNic.TxMbps;
                    snapshot.NicTotalRxMbps = targetNic.RxMbps;
                    snapshot.AppLineUtilizationPct = Math.Round(((snapshot.AppMediaTxMbps + (snapshot.AppTelemetryTxKbps / 1000.0)) / targetNic.LinkSpeedMbps) * 100.0, 4);
                }
            }

            return snapshot;
        }
    }
}