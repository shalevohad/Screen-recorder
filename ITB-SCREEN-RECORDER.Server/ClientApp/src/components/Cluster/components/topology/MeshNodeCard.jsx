// ==========================================
// File: ClientApp/src/components/Cluster/components/topology/MeshNodeCard.jsx
// ==========================================
import React from 'react';

export default function MeshNodeCard({
    node,
    isOptimal,
    isLocalNode,
    pingData,
    isPingingThis,
    onPingNode
}) {
    return (
        <div
            className={`node-card mesh-node ${node.IsHoldingVip ? 'is-vip-owner' : ''} ${isOptimal ? 'is-optimal' : ''} ${isLocalNode ? 'local-instance' : 'remote-peer'}`}
        >
            <div className="node-card-header">
                <div className="node-status-indicator">
                    <span className={`status-orb ${node.Status === 'Healthy' ? 'green' : (node.Status === 'Degraded' ? 'amber' : 'red')}`} />
                    <span className="node-label">
                        {isLocalNode ? 'THIS INSTANCE (LOCAL)' : 'ACTIVE CLUSTER PEER'}
                    </span>
                </div>
                <span className="role-badge primary">
                    ACTIVE-ACTIVE (P{node.Priority})
                </span>
            </div>

            <div className="node-hostname-row">
                <span className="node-hostname">{node.MachineName}</span>
                {isOptimal && (
                    <span className="optimal-pill" title="Selected by the intelligent load balancer for new video ingestion and FFMPEG tasks">
                        ⚖️ LEAST LOADED
                    </span>
                )}
            </div>

            {/* Hardware Capacity Badge */}
            <div className="hardware-capacity-chip">
                <span className="chip-icon">⚡</span>
                <span className="chip-name">
                    {node.Hardware?.DetectedEncoder?.toUpperCase() || 'LIBX264'}
                </span>
                <span className="chip-weight">
                    Capacity: {node.Hardware?.CapacityWeight || 1.0}x
                </span>
                {node.Hardware?.GpuName && (
                    <span className="chip-gpu-name">({node.Hardware.GpuName})</span>
                )}
            </div>

            <div className="node-props-grid">
                <div className="prop-row">
                    <span className="prop-k">API Endpoint</span>
                    <span className="prop-v link" title={node.ApiBaseUrl}>{node.ApiBaseUrl}</span>
                </div>
                <div className="prop-row">
                    <span className="prop-k">CPU / RAM Strain</span>
                    <span className="prop-v">{node.Workload?.HostCpuPct ?? 0}% CPU • {node.Workload?.HostRamPct ?? 0}% RAM</span>
                </div>
                <div className="prop-row">
                    <span className="prop-k">Active Streams</span>
                    <span className="prop-v highlight">{node.Workload?.ActiveStreams ?? 0} Ingesting</span>
                </div>
                <div className="prop-row">
                    <span className="prop-k">GPU Engine</span>
                    <span className="prop-v">{node.Workload?.GpuNvencPct ?? 0}% NVENC</span>
                </div>
                <div className="prop-row">
                    <span className="prop-k">Normalized Load Score</span>
                    <span className="prop-v font-bold cyan">{node.Workload?.NormalizedLoadScore ?? 0} pts</span>
                </div>
                <div className="prop-row">
                    <span className="prop-k">VIP Ownership</span>
                    <span className={`prop-v ${node.IsHoldingVip ? 'cyan font-bold' : 'gray'}`}>
                        {node.IsHoldingVip ? '⚡ ACTIVE HOLDER' : 'Standby / Unbound'}
                    </span>
                </div>
            </div>

            <div className="node-ips-strip">
                <span className="ip-lbl">IPs:</span>
                {node.ServerIps?.length > 0 ? (
                    node.ServerIps.slice(0, 3).map(ip => (
                        <span key={ip} className="ip-chip">{ip}</span>
                    ))
                ) : (
                    <span className="ip-chip">127.0.0.1</span>
                )}
            </div>

            {/* Action bar for remote peers */}
            {!isLocalNode && (
                <div className="peer-action-row">
                    <button
                        type="button"
                        className="btn-peer-ping"
                        onClick={() => onPingNode(node)}
                        disabled={isPingingThis}
                    >
                        {isPingingThis ? 'Pinging...' : (pingData?.latencyMs ? `Ping: ${pingData.latencyMs}ms` : 'Ping Peer')}
                    </button>
                    {pingData && (
                        <span className={`ping-status-pill ${pingData.success ? 'green' : 'red'}`}>
                            {pingData.success ? 'ONLINE' : 'UNREACHABLE'}
                        </span>
                    )}
                </div>
            )}

            {node.IsHoldingVip && (
                <div className="vip-owner-banner">
                    <span className="bolt">⚡</span>
                    <span>ACTIVE VIP INBOUND GATEWAY</span>
                </div>
            )}
        </div>
    );
}
