using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ITB_SCREEN_RECORDER.Core.Diagnostics;

namespace ITB_SCREEN_RECORDER.Server.Services
{
    public class ServerTelemetryHostService : BackgroundService
    {
        private readonly TelemetryBroadcastService _broadcastService;
        private readonly NetworkTelemetry _networkTelemetry;
        private readonly ILogger<ServerTelemetryHostService> _logger;
        private readonly DateTime _serverStartTime = DateTime.UtcNow;

        public ServerTelemetryHostService(
            TelemetryBroadcastService broadcastService,
            NetworkTelemetry networkTelemetry,
            ILogger<ServerTelemetryHostService> logger)
        {
            _broadcastService = broadcastService;
            _networkTelemetry = networkTelemetry;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await Task.Delay(1500, stoppingToken);

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    var hw = HardwareProbe.GetTelemetrySnapshot();
                    var net = _networkTelemetry.GetMetricsSnapshot();

                    var payload = new
                    {
                        cpuUsagePct = hw.HostCpuUsagePct,
                        appCpuUsagePct = hw.ProcessCpuUsagePct,
                        hostRamPct = hw.HostRamUsagePct,
                        hostTotalRamMb = hw.HostTotalRamMb,
                        appRamMb = hw.ProcessRamMb,
                        nicTotalTxMbps = net.NicTotalTxMbps,
                        nicTotalRxMbps = net.NicTotalRxMbps,
                        linkSpeedMbps = net.NicLinkSpeedMbps,
                        nicUtilizationPct = net.AppLineUtilizationPct,
                        uptimeSeconds = Math.Round((DateTime.UtcNow - _serverStartTime).TotalSeconds, 0)
                    };

                    await _broadcastService.BroadcastServerTelemetryAsync(payload);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning($"[ServerTelemetry] Failed sampling host metrics: {ex.Message}");
                }

                await Task.Delay(1000, stoppingToken);
            }
        }
    }
}