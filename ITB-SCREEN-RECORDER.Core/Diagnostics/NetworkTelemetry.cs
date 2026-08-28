using System;
using System.Linq;
using System.Net.NetworkInformation;
using System.Threading;
using ITB_SCREEN_RECORDER.Core.Common;

namespace ITB_SCREEN_RECORDER.Core.Diagnostics
{
    public class NetworkMetricsSnapshot
    {
        // נתוני האפליקציה נטו (VBR)
        public double AppMediaTxMbps { get; set; }
        public double AppTelemetryTxKbps { get; set; }

        // נתוני כרטיס הרשת הפיזי (OS Level)
        public double NicLinkSpeedMbps { get; set; }
        public double NicTotalTxMbps { get; set; }
        public double NicTotalRxMbps { get; set; }

        // ניצולת תעבורת האפליקציה מתוך רוחב הפס המקסימלי
        public double AppLineUtilizationPct { get; set; }
    }

    public class NetworkTelemetry
    {
        // מוני תעבורה אטומיים ברמת האפליקציה
        private long _appMediaBytesTx = 0;
        private long _appTelemetryBytesTx = 0;

        // מצב כרטיס הרשת הפיזי
        private NetworkInterface? _activeNic;
        private long _lastNicBytesSent = 0;
        private long _lastNicBytesReceived = 0;
        private DateTime _lastSampleTime;

        public NetworkTelemetry()
        {
            ResolveActiveNetworkInterface();
            _lastSampleTime = DateTime.UtcNow;
        }

        // 💡 פונקציות Thread-Safe לדחיפת נתונים מכל מקום ב-Agent
        public void TrackMediaBytes(long bytes) => Interlocked.Add(ref _appMediaBytesTx, bytes);
        public void TrackTelemetryBytes(long bytes) => Interlocked.Add(ref _appTelemetryBytesTx, bytes);

        private void ResolveActiveNetworkInterface()
        {
            try
            {
                // איתור כרטיס הרשת המבצעי (מתעלם מ-Loopback ומ-VPNs)
                _activeNic = NetworkInterface.GetAllNetworkInterfaces()
                    .FirstOrDefault(nic =>
                        nic.OperationalStatus == OperationalStatus.Up &&
                        nic.NetworkInterfaceType != NetworkInterfaceType.Loopback &&
                        nic.NetworkInterfaceType != NetworkInterfaceType.Tunnel &&
                        nic.GetIPv4Statistics().BytesReceived > 0);

                if (_activeNic != null)
                {
                    var stats = _activeNic.GetIPv4Statistics();
                    _lastNicBytesSent = stats.BytesSent;
                    _lastNicBytesReceived = stats.BytesReceived;

                    Logger.Info($"[NETWORK] Bound to NIC: {_activeNic.Name} | Link Speed: {(_activeNic.Speed / 1_000_000)} Mbps");
                }
            }
            catch (Exception ex)
            {
                Logger.Warn($"[NETWORK] Failed to resolve active network interface: {ex.Message}");
            }
        }

        public NetworkMetricsSnapshot GetMetricsSnapshot()
        {
            DateTime now = DateTime.UtcNow;
            double elapsedSeconds = (now - _lastSampleTime).TotalSeconds;

            // שליפה ואיפוס של מוני האפליקציה בפעולה אחת (Zero-Locking)
            long mediaBytes = Interlocked.Exchange(ref _appMediaBytesTx, 0);
            long telemBytes = Interlocked.Exchange(ref _appTelemetryBytesTx, 0);

            _lastSampleTime = now;

            double appMediaMbps = 0;
            double appTelemKbps = 0;
            double nicTxMbps = 0;
            double nicRxMbps = 0;
            double linkSpeedMbps = 0;
            double appLineUtil = 0;

            if (elapsedSeconds > 0)
            {
                appMediaMbps = Math.Round((mediaBytes * 8.0) / (elapsedSeconds * 1_000_000.0), 2);
                appTelemKbps = Math.Round((telemBytes * 8.0) / (elapsedSeconds * 1_000.0), 2);

                if (_activeNic != null)
                {
                    try
                    {
                        var stats = _activeNic.GetIPv4Statistics();
                        long currentSent = stats.BytesSent;
                        long currentReceived = stats.BytesReceived;

                        nicTxMbps = Math.Round(((currentSent - _lastNicBytesSent) * 8.0) / (elapsedSeconds * 1_000_000.0), 2);
                        nicRxMbps = Math.Round(((currentReceived - _lastNicBytesReceived) * 8.0) / (elapsedSeconds * 1_000_000.0), 2);

                        _lastNicBytesSent = currentSent;
                        _lastNicBytesReceived = currentReceived;

                        linkSpeedMbps = _activeNic.Speed / 1_000_000.0;

                        if (linkSpeedMbps > 0)
                        {
                            // סכימת המדיה והטלמטריה ביחס למהירות כרטיס הרשת הפיזי
                            appLineUtil = Math.Round(((appMediaMbps + (appTelemKbps / 1000.0)) / linkSpeedMbps) * 100.0, 4);
                        }
                    }
                    catch
                    {
                        // הגנה מפני נפילת רשת או ניתוק כבל בזמן ריצה
                    }
                }
            }

            return new NetworkMetricsSnapshot
            {
                AppMediaTxMbps = Math.Max(0, appMediaMbps),
                AppTelemetryTxKbps = Math.Max(0, appTelemKbps),
                NicLinkSpeedMbps = linkSpeedMbps,
                NicTotalTxMbps = Math.Max(0, nicTxMbps),
                NicTotalRxMbps = Math.Max(0, nicRxMbps),
                AppLineUtilizationPct = appLineUtil
            };
        }
    }
}