// ==========================================
// File: ClientApp/src/components/Cluster/components/workload/WorkloadMetricsGrid.jsx
// ==========================================
import React from 'react';

export default function WorkloadMetricsGrid({ workload }) {
    const cpuPct = workload?.HostCpuPct ?? 0;
    const ramPct = workload?.HostRamPct ?? 0;
    const gpuNvenc = workload?.GpuNvencPct ?? 0;
    const rxMbps = workload?.NetworkRxMbps ?? 0;

    return (
        <div className="workload-metrics-grid">
            {/* CPU LOAD METER */}
            <div className="metric-pod-card">
                <div className="pod-header">
                    <span className="pod-title">HOST CPU UTILIZATION</span>
                    <span className="pod-badge cyan">{cpuPct}%</span>
                </div>
                <div className="progress-bar-wrap">
                    <div
                        className="progress-fill cyan"
                        style={{ width: `${Math.min(cpuPct, 100)}%` }}
                    />
                </div>
                <div className="pod-footer-meta">
                    <span>Server Process: {workload?.ProcessCpuPct ?? 0}%</span>
                    <span>Multi-core Balancer</span>
                </div>
            </div>

            {/* RAM LOAD METER */}
            <div className="metric-pod-card">
                <div className="pod-header">
                    <span className="pod-title">MEMORY ALLOCATION</span>
                    <span className="pod-badge blue">{ramPct}%</span>
                </div>
                <div className="progress-bar-wrap">
                    <div
                        className="progress-fill blue"
                        style={{ width: `${Math.min(ramPct, 100)}%` }}
                    />
                </div>
                <div className="pod-footer-meta">
                    <span>Server App: {Math.round(workload?.ProcessRamMb ?? 0)} MB</span>
                    <span>Host Total: {Math.round(workload?.HostTotalRamMb ?? 0)} MB</span>
                </div>
            </div>

            {/* GPU / HARDWARE ACCELERATION */}
            <div className="metric-pod-card">
                <div className="pod-header">
                    <span className="pod-title">GPU / HW TRANSCODING</span>
                    <span className="pod-badge purple">{gpuNvenc}% NVENC</span>
                </div>
                <div className="progress-bar-wrap">
                    <div
                        className="progress-fill purple"
                        style={{ width: `${Math.min(gpuNvenc, 100)}%` }}
                    />
                </div>
                <div className="pod-footer-meta">
                    <span>3D Engine: {workload?.Gpu3dPct ?? 0}%</span>
                    <span>{workload?.DetectedEncoder || 'auto'}</span>
                </div>
            </div>

            {/* NETWORK I/O THROUGHPUT */}
            <div className="metric-pod-card">
                <div className="pod-header">
                    <span className="pod-title">NETWORK I/O THROUGHPUT</span>
                    <span className="pod-badge emerald">{rxMbps} Mbps RX</span>
                </div>
                <div className="progress-bar-wrap">
                    <div
                        className="progress-fill emerald"
                        style={{ width: `${Math.min((rxMbps / 1000) * 100, 100)}%` }}
                    />
                </div>
                <div className="pod-footer-meta">
                    <span>TX: {workload?.NetworkTxMbps ?? 0} Mbps</span>
                    <span>NIC Link: {workload?.NetworkLinkSpeedMbps ?? 1000} Mbps</span>
                </div>
            </div>
        </div>
    );
}
