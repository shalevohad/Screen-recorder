using Microsoft.AspNetCore.Mvc;
using ITB_SCREEN_RECORDER.Server.Services;
using ITB_SCREEN_RECORDER.Server.Services.Security;
using System.Linq;
using System;
using System.Diagnostics;
using ITB_SCREEN_RECORDER.Core.Diagnostics;

namespace ITB_SCREEN_RECORDER.Server.Controllers
{
    [ApiController]
    [Route("api/monitoring")]
    [AuthorizePermission(PermissionKeys.StationsView)]
    public class FleetMonitoringController : ControllerBase
    {
        private readonly ITelemetryStateService _telemetryState;
        private readonly NetworkTelemetry _serverNetworkTelemetry;
        private readonly OfflineSyncManager _syncManager;

        public FleetMonitoringController(ITelemetryStateService telemetryState, NetworkTelemetry serverNetworkTelemetry, OfflineSyncManager syncManager)
        {
            _telemetryState = telemetryState;
            _serverNetworkTelemetry = serverNetworkTelemetry;
            _syncManager = syncManager;
        }

        [HttpGet("fleet")]
        public IActionResult GetFleetMetrics()
        {
            var agents = _telemetryState.GetAllAgents()
                .Where(a => !string.IsNullOrEmpty(a.Hostname))
                .Select(a =>
                {
                    return new
                    {
                        agentHostname = a.Hostname,

                        // Total host machine load
                        hostCpuPct = Math.Round(a.HostCpuPct, 1),
                        hostGpuPct = Math.Round(a.Gpu3dPct, 1),
                        netTotalTxMbps = Math.Round(a.NicTotalTxMbps, 2),
                        netTotalRxMbps = Math.Round(a.NicTotalRxMbps, 2),

                        // Application-specific recording load
                        appCpuPct = Math.Round(a.ProcessCpuPct, 1),
                        appRamMb = Math.Round(a.ProcessRamMb, 1),
                        appNetTxMbps = Math.Round(a.MediaTxMbps, 2),

                        netUsagePct = Math.Round(a.NicUtilizationPct, 2),
                        isStreaming = a.IsStreaming ? 1 : 0
                    };
                });

            return Ok(agents);
        }

        /// <summary>
        /// Retrieves telemetry metrics for an individual workstation by hostname.
        /// </summary>
        /// <param name="agentHostname">Workstation hostname.</param>
        /// <returns>200 OK with station telemetry, or 404 Not Found if station is not currently reporting.</returns>
        [HttpGet("fleet/{agentHostname}")]
        public IActionResult GetStationMetrics(string agentHostname)
        {
            // Case-insensitive lookup in live telemetry state cache
            var agent = _telemetryState.GetAllAgents()
                .FirstOrDefault(a => string.Equals(a.Hostname, agentHostname, StringComparison.OrdinalIgnoreCase));

            if (agent == null)
            {
                // Returning 404 allows monitoring systems (e.g. OpManager) to immediately register station as non-reporting
                return NotFound(new { error = $"Station '{agentHostname}' not found or offline" });
            }

            var metrics = new
            {
                agentHostname = agent.Hostname,

                // Total host machine load
                hostCpuPct = Math.Round(agent.HostCpuPct, 1),
                hostGpuPct = Math.Round(agent.Gpu3dPct, 1),
                netTotalTxMbps = Math.Round(agent.NicTotalTxMbps, 2),
                netTotalRxMbps = Math.Round(agent.NicTotalRxMbps, 2),

                // Application-specific recording load
                appCpuPct = Math.Round(agent.ProcessCpuPct, 1),
                appRamMb = Math.Round(agent.ProcessRamMb, 1),
                appNetTxMbps = Math.Round(agent.MediaTxMbps, 2),

                netUsagePct = Math.Round(agent.NicUtilizationPct, 2),
                isStreaming = agent.IsStreaming ? 1 : 0
            };

            return Ok(metrics);
        }

        /// <summary>
        /// Retrieves central server resource metrics including physical host and process CPU/RAM, thread count, and network card bandwidth.
        /// </summary>
        /// <returns>200 OK with server resource and network card metrics.</returns>
        [HttpGet("server")]
        public async Task<IActionResult> GetServerMetrics()
        {
            using var currentProcess = Process.GetCurrentProcess();
            var uptime = DateTime.Now - currentProcess.StartTime;

            var activeAgentsCount = _telemetryState.GetAllAgents()
                .Count(a => !string.IsNullOrEmpty(a.Hostname));

            var hardwareSnapshot = HardwareProbe.GetTelemetrySnapshot();
            var netSnapshot = _serverNetworkTelemetry.GetMetricsSnapshot();
            var encoderReport = await HardwareProbe.GetEncoderProbeReportAsync().ConfigureAwait(false);

            var serverMetrics = new
            {
                serverHostname = Environment.MachineName,

                // Full physical server host load vs. recording server process load
                hostCpuPct = Math.Round(hardwareSnapshot.HostCpuUsagePct, 1),
                processCpuPct = Math.Round(hardwareSnapshot.ProcessCpuUsagePct, 1),
                hostTotalRamMb = Math.Round(hardwareSnapshot.HostTotalRamMb, 1),
                processRamMb = Math.Round(hardwareSnapshot.ProcessRamMb, 1),

                // Primary network adapter throughput for HUD telemetry
                serverNetworkTxMbps = Math.Round(netSnapshot.NicTotalTxMbps, 2),
                serverNetworkRxMbps = Math.Round(netSnapshot.NicTotalRxMbps, 2),
                serverNetworkLinkSpeed = Math.Round(netSnapshot.NicLinkSpeedMbps, 2),

                activeThreads = currentProcess.Threads.Count,
                uptimeSeconds = Math.Round(uptime.TotalSeconds, 0),
                connectedAgents = activeAgentsCount,

                // Hardware Encoder Invariant Probe (Rule 8)
                encoderProbe = encoderReport,

                // Full list of physical and virtual network adapters
                nics = netSnapshot.Nics.Select(n => new
                {
                    nicName = n.Name,
                    capacityMbps = Math.Round(n.LinkSpeedMbps, 2),
                    txMbps = Math.Round(n.TxMbps, 2),
                    rxMbps = Math.Round(n.RxMbps, 2),
                    usagePct = Math.Round(n.UtilizationPct, 2)
                })
            };

            return Ok(serverMetrics);
        }

        [HttpGet("encoder-probe")]
        public async Task<IActionResult> GetEncoderProbe()
        {
            var report = await HardwareProbe.GetEncoderProbeReportAsync().ConfigureAwait(false);
            return Ok(report);
        }

        /// <summary>
        /// Retrieves offline buffer debt and ingestion sync metrics across all fleet stations.
        /// </summary>
        /// <returns>200 OK with global and per-station sync metrics.</returns>
        [HttpGet("sync-status")]
        public IActionResult GetSyncStatusMetrics()
        {
            var allStations = _telemetryState.GetAllAgents();
            var stationsWithDebt = allStations.Where(s => s.OfflineFilesTotalSizeMb > 0).ToList();

            long globalDebtMb = stationsWithDebt.Sum(s => s.OfflineFilesTotalSizeMb);

            var response = new
            {
                globalMetrics = new
                {
                    totalStationsWithDebt = stationsWithDebt.Count,
                    globalDebtSizeMb = globalDebtMb,
                    currentlySyncingStations = _syncManager.GetActiveUploadsCount(),
                    serverUploadQueueState = globalDebtMb > 0 ? "SYNCING" : "IDLE"
                },
                stationDebts = stationsWithDebt.Select(s => new
                {
                    hostname = s.Hostname,
                    ipAddress = s.IpAddress,
                    debtSizeMb = s.OfflineFilesTotalSizeMb,
                    filesPending = s.OfflineFilesCount,
                    syncStatus = _syncManager.GetSyncCommand(s.Hostname, s.OfflineFilesTotalSizeMb).ToString()
                })
            };

            return Ok(response);
        }
    }
}