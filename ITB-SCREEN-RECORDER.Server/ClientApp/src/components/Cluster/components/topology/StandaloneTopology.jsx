// ==========================================
// File: ClientApp/src/components/Cluster/components/topology/StandaloneTopology.jsx
// ==========================================
import React from 'react';
import { formatUptime } from '../../utils/clusterUtils';

export default function StandaloneTopology({
    overview,
    isHoldingVip,
    onScanLan,
    isScanning
}) {
    return (
        <div className="topology-nodes-row standalone-layout">
            {/* LOCAL SERVER (THIS INSTANCE) */}
            <div className={`node-card local-node ${isHoldingVip ? 'is-vip-owner' : ''}`}>
                <div className="node-card-header">
                    <div className="node-status-indicator">
                        <span className="status-orb green" />
                        <span className="node-label">LOCAL NODE (THIS INSTANCE)</span>
                    </div>
                    <span className="role-badge primary">
                        ACTIVE-ACTIVE (P{overview?.LocalNode?.Priority ?? 1})
                    </span>
                </div>

                <div className="node-hostname">
                    {overview?.LocalNode?.MachineName || 'Local Server'}
                </div>

                <div className="node-props-grid">
                    <div className="prop-row">
                        <span className="prop-k">Uptime</span>
                        <span className="prop-v highlight">{formatUptime(overview?.LocalNode?.UptimeSeconds)}</span>
                    </div>
                    <div className="prop-row">
                        <span className="prop-k">Dashboard Port</span>
                        <span className="prop-v">HTTPS {overview?.LocalNode?.Ports?.HttpPort || 5090}</span>
                    </div>
                    <div className="prop-row">
                        <span className="prop-k">RTMPS / HLS</span>
                        <span className="prop-v">{overview?.LocalNode?.Ports?.RtmpPort || 19350} / {overview?.LocalNode?.Ports?.HlsPort || 8888}</span>
                    </div>
                    <div className="prop-row">
                        <span className="prop-k">Discovery Port</span>
                        <span className="prop-v">UDP {overview?.LocalNode?.Ports?.DiscoveryPort || 5098}</span>
                    </div>
                    <div className="prop-row">
                        <span className="prop-k">Hardware Encoder</span>
                        <span className="prop-v green">{overview?.Workload?.DetectedEncoder?.toUpperCase() || 'LIBX264'}</span>
                    </div>
                    <div className="prop-row">
                        <span className="prop-k">VIP Status</span>
                        <span className={`prop-v ${isHoldingVip ? 'cyan font-bold' : 'gray'}`}>
                            {isHoldingVip ? '⚡ ACTIVE HOLDER' : 'Standby / Unbound'}
                        </span>
                    </div>
                </div>

                <div className="node-ips-strip">
                    <span className="ip-lbl">IPs:</span>
                    {overview?.LocalNode?.LocalIps?.length > 0 ? (
                        overview.LocalNode.LocalIps.slice(0, 3).map(ip => (
                            <span key={ip} className="ip-chip">{ip}</span>
                        ))
                    ) : (
                        <span className="ip-chip">127.0.0.1</span>
                    )}
                </div>

                {isHoldingVip && (
                    <div className="vip-owner-banner">
                        <span className="bolt">⚡</span>
                        <span>PRIMARY VIP INBOUND GATEWAY</span>
                    </div>
                )}
            </div>

            {/* CIRCUIT INTERCONNECT TO AUTONOMOUS MESH */}
            <div className="topology-interconnect-column">
                <div className="interconnect-line standalone-active">
                    <div className="packet-pulse packet-forward" />
                </div>
                <div className="interconnect-hub-pill standalone">
                    <span className="sync-icon">📡</span>
                    <span className="hub-label">AUTONOMOUS DISCOVERY</span>
                    <span className="ping-pill status">LISTENING</span>
                </div>
            </div>

            {/* STANDALONE MESH PEER LISTENER CARD */}
            <div className="node-card mesh-listener-card">
                <div className="node-card-header">
                    <div className="node-status-indicator">
                        <span className="status-orb cyan-pulse" />
                        <span className="node-label">AUTO-DISCOVERY MESH ENGINE</span>
                    </div>
                    <span className="role-badge mesh-ready">
                        STANDALONE 1/1
                    </span>
                </div>

                <div className="mesh-listener-head">
                    <div className="radar-radar-icon">📡</div>
                    <div className="mesh-info-text">
                        <div className="mesh-title">Zero-Configuration Cluster Ready</div>
                        <div className="mesh-desc">
                            Operating autonomously with zero errors. All streams, recordings, and APIs are fully operational on this single server instance.
                        </div>
                    </div>
                </div>

                <div className="node-props-grid">
                    <div className="prop-row">
                        <span className="prop-k">Multicast Channel</span>
                        <span className="prop-v">{overview?.Discovery?.MulticastAddress || 'Disabled'}:{overview?.Discovery?.Port || 5098}</span>
                    </div>
                    <div className="prop-row">
                        <span className="prop-k">Subnet Broadcast</span>
                        <span className="prop-v">{overview?.Discovery?.BroadcastAddress || '255.255.255.255'}:{overview?.Discovery?.Port || 5098}</span>
                    </div>
                    <div className="prop-row">
                        <span className="prop-k">Cluster Expansion</span>
                        <span className="prop-v green">AUTOMATIC JOIN READY</span>
                    </div>
                    <div className="prop-row">
                        <span className="prop-k">Load Balancing Mode</span>
                        <span className="prop-v">ACTIVE-ACTIVE WHEN PEERS JOIN</span>
                    </div>
                </div>

                <div className="standalone-action-box">
                    <p className="note">
                        When additional server instances boot on the local network, they automatically announce themselves via UDP beacons and join this Active-Active cluster with dynamic load balancing.
                    </p>
                    <button
                        type="button"
                        className="btn-trigger-radar"
                        onClick={onScanLan}
                        disabled={isScanning}
                    >
                        {isScanning ? 'Probing Subnet...' : '📡 Scan LAN Subnet for Peers'}
                    </button>
                </div>
            </div>
        </div>
    );
}
