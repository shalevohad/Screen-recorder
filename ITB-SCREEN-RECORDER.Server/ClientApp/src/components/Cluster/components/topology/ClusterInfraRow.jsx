// ==========================================
// File: ClientApp/src/components/Cluster/components/topology/ClusterInfraRow.jsx
// ==========================================
import React from 'react';

export default function ClusterInfraRow({ overview }) {
    return (
        <div className="topology-infra-row">
            {/* Connected Fleet Card */}
            <div className="infra-card fleet-card">
                <div className="infra-icon-cell cyan">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                </div>
                <div className="infra-data-cell">
                    <span className="infra-label">ACTIVE AGENTS FLEET</span>
                    <div className="infra-val-row">
                        <span className="big-val cyan">{overview?.Workload?.OnlineAgents ?? 0}</span>
                        <span className="sub-unit">/ {overview?.Workload?.TotalAgents ?? 0} STATIONS ONLINE</span>
                    </div>
                    <span className="sub-detail">
                        {overview?.Workload?.ActiveStreams ?? 0} Live Video Streams Ingesting ({overview?.Workload?.NetworkRxMbps ?? 0} Mbps)
                    </span>
                </div>
            </div>

            {/* Storage Infrastructure Card */}
            <div className="infra-card storage-card">
                <div className="infra-icon-cell emerald">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                </div>
                <div className="infra-data-cell">
                    <span className="infra-label">STORAGE & ARCHIVE POOL</span>
                    <div className="infra-val-row">
                        <span className="big-val emerald">{overview?.Storage?.LocalFreeSpaceGb ?? 0} GB</span>
                        <span className="sub-unit">FREE LOCAL FALLBACK</span>
                    </div>
                    <span className="sub-detail">
                        NetApp Mount: {overview?.Storage?.IsNetAppReachable ? '✅ CONNECTED' : '⚠️ OFFLINE'}
                    </span>
                </div>
            </div>
        </div>
    );
}
