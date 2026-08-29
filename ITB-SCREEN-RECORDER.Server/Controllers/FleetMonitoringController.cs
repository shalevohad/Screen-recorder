using Microsoft.AspNetCore.Mvc;
using ITB_SCREEN_RECORDER.Server.Services;
using System.Linq;
using System;
using System.Diagnostics;
using ITB_SCREEN_RECORDER.Core.Diagnostics;

namespace ITB_SCREEN_RECORDER.Server.Controllers
{
    [ApiController]
    [Route("api/monitoring")]
    public class FleetMonitoringController : ControllerBase
    {
        private readonly ITelemetryStateService _telemetryState;
        private readonly NetworkTelemetry _serverNetworkTelemetry;

        public FleetMonitoringController(ITelemetryStateService telemetryState, NetworkTelemetry serverNetworkTelemetry)
        {
            _telemetryState = telemetryState;
            _serverNetworkTelemetry = serverNetworkTelemetry;
        }

        // --- 1. צי העמדות (Tabular Data) ---
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
                        cpuAvgPct = Math.Round(a.HostCpuPct, 1),
                        gpuAvgPct = Math.Round(a.Gpu3dPct, 1),
                        ramAvgPct = Math.Round((a.ProcessRamMb / 16384.0) * 100, 1),
                        netTxMbps = Math.Round(a.MediaTxMbps, 2),
                        c2TelemetryKbps = Math.Round(a.TelemetryTxKbps, 2),
                        netUsagePct = Math.Round(a.NicUtilizationPct, 2),
                        isStreaming = a.IsStreaming ? 1 : 0
                    };
                });

            return Ok(agents);
        }

        // --- 2. שרת הניהול המרכזי (כולל את כל כרטיסי הרשת הפנימיים) ---
        [HttpGet("server")]
        public IActionResult GetServerMetrics()
        {
            using var currentProcess = Process.GetCurrentProcess();
            var uptime = DateTime.Now - currentProcess.StartTime;

            var activeAgentsCount = _telemetryState.GetAllAgents()
                .Count(a => !string.IsNullOrEmpty(a.Hostname));

            var hardwareSnapshot = HardwareProbe.GetTelemetrySnapshot();
            var netSnapshot = _serverNetworkTelemetry.GetMetricsSnapshot();

            double totalTx = netSnapshot.Nics.Sum(n => n.TxMbps);
            double totalRx = netSnapshot.Nics.Sum(n => n.RxMbps);

            var serverMetrics = new
            {
                serverHostname = Environment.MachineName,
                processCpuPct = Math.Round(hardwareSnapshot.ProcessCpuUsagePct, 1),
                processRamMb = Math.Round(hardwareSnapshot.ProcessRamMb, 1),

                serverNetworkTxMbps = Math.Round(totalTx, 2),
                serverNetworkRxMbps = Math.Round(totalRx, 2),

                activeThreads = currentProcess.Threads.Count,
                uptimeSeconds = Math.Round(uptime.TotalSeconds, 0),
                connectedAgents = activeAgentsCount,

                // 💡 מערך כרטיסי הרשת שולב ישירות פנימה
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
    }
}