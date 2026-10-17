// ==========================================
// File: ClientApp/src/components/Cluster/ClusterOperationsView.jsx
// ==========================================
import { useState, useEffect, useCallback, useMemo } from 'react';
import './ClusterOperationsView.scss';

export default function ClusterOperationsView({ onNavigate }) {
    const [overview, setOverview] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAutoRefresh, setIsAutoRefresh] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(() => new Date());

    // Action states
    const [pingResults, setPingResults] = useState({});
    const [pingingNodeId, setPingingNodeId] = useState(null);

    const [isScanning, setIsScanning] = useState(false);
    const [scanResults, setScanResults] = useState(null);
    const [isScanModalOpen, setIsScanModalOpen] = useState(false);

    const [isVipActionPending, setIsVipActionPending] = useState(false);
    const [vipActionFeedback, setVipActionFeedback] = useState(null);

    // Quick Settings Drawer
    const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);
    const [settingsForm, setSettingsForm] = useState({
        role: 'Active-Active',
        priority: 1,
        partnerServerUrl: '',
        enableVirtualIp: false,
        virtualIp: '',
        virtualIpSubnetMask: '',
        networkInterfaceName: '',
        autoFailoverDashboard: true,
        dashboardFailoverDelaySeconds: 8,
        multicastAddress: '',
        broadcastAddress: '',
        port: 5098,
        enableBroadcastFallback: true
    });
    const [isSavingSettings, setIsSavingSettings] = useState(false);
    const [settingsFeedback, setSettingsFeedback] = useState(null);

    // Fetch Cluster Overview
    const fetchOverview = useCallback(async () => {
        try {
            const res = await fetch('/api/v1/cluster/overview');
            if (!res.ok) throw new Error(`HTTP error ${res.status}`);
            const data = await res.json();
            setOverview(data);
            setLastUpdated(new Date());
            setError(null);

            // Seed settings drawer
            if (data?.LocalNode && data?.Discovery) {
                setSettingsForm(prev => ({
                    ...prev,
                    role: data.LocalNode.Role || 'Active-Active',
                    priority: data.LocalNode.Priority ?? 1,
                    partnerServerUrl: data.PartnerNode?.PartnerUrl || '',
                    enableVirtualIp: data.LocalNode.VipStatus?.EnableVirtualIp || false,
                    virtualIp: data.LocalNode.VipStatus?.VirtualIp || '',
                    virtualIpSubnetMask: data.LocalNode.VipStatus?.SubnetMask || data.Discovery?.VirtualIpSubnetMask || '',
                    networkInterfaceName: data.LocalNode.VipStatus?.ActiveInterface || '',
                    autoFailoverDashboard: data.Discovery.AutoFailoverDashboard !== false,
                    dashboardFailoverDelaySeconds: data.Discovery.FailoverDelaySeconds || 8,
                    multicastAddress: data.Discovery.MulticastAddress || '',
                    broadcastAddress: data.Discovery.BroadcastAddress || '',
                    port: data.Discovery.Port || 5098,
                    enableBroadcastFallback: data.Discovery.EnableBroadcastFallback !== false
                }));
            }
        } catch (err) {
            console.error('Failed to load cluster overview:', err);
            setError(err.message || 'Unable to connect to Cluster API');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOverview();
        if (!isAutoRefresh) return;
        const timer = setInterval(fetchOverview, 2500);
        return () => clearInterval(timer);
    }, [fetchOverview, isAutoRefresh]);

    // Handle Ping Node
    const handlePingNode = async (targetNode) => {
        if (!targetNode?.ApiBaseUrl) return;
        setPingingNodeId(targetNode.NodeId || targetNode.ApiBaseUrl);
        try {
            const res = await fetch('/api/v1/cluster/ping-partner', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ partnerUrl: targetNode.ApiBaseUrl })
            });
            const data = await res.json();
            setPingResults(prev => ({ ...prev, [targetNode.NodeId || targetNode.ApiBaseUrl]: data }));
        } catch (err) {
            setPingResults(prev => ({
                ...prev,
                [targetNode.NodeId || targetNode.ApiBaseUrl]: { success: false, message: err.message || 'Ping failed' }
            }));
        } finally {
            setPingingNodeId(null);
        }
    };

    // Handle LAN Scan
    const handleScanLan = async () => {
        setIsScanning(true);
        setIsScanModalOpen(true);
        setScanResults(null);
        try {
            const res = await fetch('/api/v1/cluster/scan-lan', { method: 'POST' });
            const data = await res.json();
            setScanResults(data);
        } catch (err) {
            setScanResults({ nodes: [], error: err.message || 'Scan failed' });
        } finally {
            setIsScanning(false);
        }
    };

    // Handle VIP Takeover / Release
    const handleVipToggle = async (action) => {
        setIsVipActionPending(true);
        setVipActionFeedback(null);
        try {
            const endpoint = action === 'takeover' ? '/api/v1/cluster/vip/takeover' : '/api/v1/cluster/vip/release';
            const res = await fetch(endpoint, { method: 'POST' });
            const data = await res.json();
            setVipActionFeedback(data);
            await fetchOverview();
        } catch (err) {
            setVipActionFeedback({ success: false, message: err.message || 'VIP action failed' });
        } finally {
            setIsVipActionPending(false);
        }
    };

    // Handle Save Cluster Settings
    const handleSaveSettings = async (e) => {
        e.preventDefault();
        setIsSavingSettings(true);
        setSettingsFeedback(null);
        try {
            const res = await fetch('/api/v1/cluster/update-config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settingsForm)
            });
            const data = await res.json();
            setSettingsFeedback(data);
            if (data.success) {
                await fetchOverview();
                setTimeout(() => setIsSettingsDrawerOpen(false), 1200);
            }
        } catch (err) {
            setSettingsFeedback({ success: false, message: err.message || 'Save failed' });
        } finally {
            setIsSavingSettings(false);
        }
    };

    const isHoldingVip = overview?.LocalNode?.VipStatus?.IsHoldingVip;
    const isVipConfigured = overview?.LocalNode?.VipStatus?.EnableVirtualIp && overview?.LocalNode?.VipStatus?.VirtualIp;
    const vipAddress = overview?.LocalNode?.VipStatus?.VirtualIp || 'Not Configured';

    // Dynamic mesh state
    const clusterNodes = overview?.ClusterNodes || [];
    const isStandalone = overview?.IsStandalone !== false && clusterNodes.length <= 1;
    const totalActiveNodes = overview?.TotalActiveNodes || Math.max(1, clusterNodes.length);
    const optimalNodeId = overview?.OptimalWorkloadNode?.NodeId;
    const localRole = overview?.LocalNode?.Role || 'Active-Active';

    // Identify who holds VIP across all nodes
    const vipHolderNode = useMemo(() => {
        if (!isVipConfigured) return null;
        if (isHoldingVip) return overview?.LocalNode?.MachineName || 'This Local Node';
        const remoteHolder = clusterNodes.find(n => n.IsHoldingVip && !n.IsLocal);
        return remoteHolder?.MachineName || 'Elected Cluster Leader';
    }, [isVipConfigured, isHoldingVip, clusterNodes, overview]);

    const formatUptime = (seconds) => {
        if (!seconds) return '0s';
        const d = Math.floor(seconds / (3600 * 24));
        const h = Math.floor((seconds % (3600 * 24)) / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        if (d > 0) return `${d}d ${h}h ${m}m`;
        if (h > 0) return `${h}h ${m}m ${s}s`;
        return `${m}m ${s}s`;
    };

    return (
        <div className="cluster-ops-container" dir="ltr">
            {/* Top Tactical Command Header */}
            <header className="cluster-header">
                <div className="header-brand">
                    <div className="brand-emblem-cluster">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <rect x="2" y="2" width="20" height="8" rx="2" />
                            <rect x="2" y="14" width="20" height="8" rx="2" />
                            <line x1="6" y1="6" x2="6.01" y2="6" />
                            <line x1="6" y1="18" x2="6.01" y2="18" />
                            <path d="M12 10v4" />
                        </svg>
                        <span className="emblem-beacon" />
                    </div>
                    <div className="brand-meta">
                        <div className="meta-row">
                            <span className="accent-tag">ITB ENTERPRISE CLUSTER</span>
                            <span className={`cluster-badge-pill ${isStandalone ? 'standalone' : 'active-active'}`}>
                                <span className="dot" />
                                {isStandalone ? 'STANDALONE ACTIVE (1/1 NODE)' : `ACTIVE-ACTIVE MESH (${totalActiveNodes} NODES)`}
                            </span>
                            <span className="platform-badge-pill">
                                <span className="platform-icon">🌐</span>
                                CROSS-PLATFORM (WIN/LINUX)
                            </span>
                            {isVipConfigured && (
                                <span className={`vip-badge-pill ${isHoldingVip ? 'holding' : 'standby'}`}>
                                    <span className="vip-icon">⚡</span>
                                    VIP: {vipAddress} [{isHoldingVip ? 'ACTIVE HERE' : 'PEER HOLDER'}]
                                </span>
                            )}
                        </div>
                        <h1>Cluster Architecture & High Availability Operations</h1>
                        <p className="subtitle">
                            ALWAYS ACTIVE-ACTIVE • ASYMMETRIC HARDWARE LOAD BALANCING • AUTONOMOUS UDP MESH DISCOVERY • CROSS-PLATFORM VIP
                        </p>
                    </div>
                </div>

                <div className="header-controls">
                    <div className="sync-status-cell">
                        <span className={`sync-dot ${isAutoRefresh ? 'live' : 'paused'}`} />
                        <span className="sync-lbl">
                            {isAutoRefresh ? 'LIVE (2.5s)' : 'PAUSED'}
                        </span>
                        <span className="sync-time">
                            {lastUpdated.toLocaleTimeString()}
                        </span>
                    </div>

                    <button
                        type="button"
                        className="btn-cluster-tool"
                        onClick={() => setIsAutoRefresh(p => !p)}
                        title={isAutoRefresh ? 'Pause polling' : 'Resume polling'}
                    >
                        {isAutoRefresh ? '⏸ Pause' : '▶ Resume'}
                    </button>

                    <button
                        type="button"
                        className="btn-cluster-tool btn-settings-trigger"
                        onClick={() => setIsSettingsDrawerOpen(true)}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                        <span>Cluster Config</span>
                    </button>

                    <button
                        type="button"
                        className="btn-cluster-nav-back"
                        onClick={() => onNavigate('portal')}
                    >
                        <span>Exit Hub</span>
                        <span className="arrow">→</span>
                    </button>
                </div>
            </header>

            {/* Quick Action & Diagnostics Bar */}
            <div className="cluster-action-bar">
                <div className="action-bar-label">
                    <span className="icon">⚙</span>
                    <span>TACTICAL CONTROLS:</span>
                </div>

                <div className="action-buttons-group">
                    {/* VIP Force Takeover / Release */}
                    {isVipConfigured && (
                        <>
                            {!isHoldingVip ? (
                                <button
                                    type="button"
                                    className="btn-action-tool vip-takeover"
                                    onClick={() => handleVipToggle('takeover')}
                                    disabled={isVipActionPending}
                                >
                                    <span className="icon">⚡</span>
                                    <span>{isVipActionPending ? 'Claiming VIP...' : 'Force VIP Takeover Here'}</span>
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="btn-action-tool vip-release"
                                    onClick={() => handleVipToggle('release')}
                                    disabled={isVipActionPending}
                                >
                                    <span className="icon">⚡</span>
                                    <span>{isVipActionPending ? 'Releasing VIP...' : 'Release VIP to Cluster'}</span>
                                </button>
                            )}
                        </>
                    )}

                    {/* LAN Discovery Radar Scan */}
                    <button
                        type="button"
                        className="btn-action-tool radar"
                        onClick={handleScanLan}
                        disabled={isScanning}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16">
                            <circle cx="12" cy="12" r="10" />
                            <circle cx="12" cy="12" r="6" />
                            <circle cx="12" cy="12" r="2" />
                            <path d="M12 12l7 4" />
                        </svg>
                        <span>{isScanning ? 'Scanning LAN Subnet...' : 'LAN Discovery Radar'}</span>
                    </button>

                    {/* Quick navigation to Recording Command Center */}
                    <button
                        type="button"
                        className="btn-action-tool secondary"
                        onClick={() => onNavigate('recording')}
                    >
                        <span>Screen Recording Center →</span>
                    </button>
                </div>

                {/* Inline Feedback Pill */}
                {vipActionFeedback && (
                    <div className={`action-feedback-pill ${vipActionFeedback.success ? 'success' : 'error'}`}>
                        {vipActionFeedback.message}
                    </div>
                )}
            </div>

            {/* Main Operational Canvas */}
            <div className="cluster-main-grid">
                {/* 1. VISUAL TOPOLOGY & CONNECTIVITY MAP */}
                <section className="topology-card-section">
                    <div className="section-title-row">
                        <div className="title-left">
                            <span className="num-pill">01</span>
                            <h2>
                                {isStandalone
                                    ? 'Autonomous Single-Node Topology & Mesh Listener'
                                    : `Live Active-Active Mesh Topology (${clusterNodes.length} Nodes Online)`}
                            </h2>
                        </div>
                        <div className="title-right">
                            <span className="live-pulse-dot" />
                            <span className="sub-txt">
                                {isStandalone ? 'STANDALONE MODE • DISCOVERY ACTIVE' : 'ACTIVE-ACTIVE PEER MESH'}
                            </span>
                        </div>
                    </div>

                    <div className="topology-canvas-container">
                        {/* FLOATING VIP GATEWAY ANCHOR (TOP CENTER) */}
                        <div className={`topology-vip-anchor ${isHoldingVip ? 'holding-local' : (isVipConfigured ? 'holding-partner' : 'disabled')}`}>
                            <div className="vip-diamond-box">
                                <div className="diamond-glow" />
                                <div className="diamond-inner">
                                    <span className="vip-symbol">⚡</span>
                                    <span className="vip-title">CLUSTER VIP</span>
                                    <span className="vip-ip">{vipAddress}</span>
                                </div>
                            </div>
                            <div className="vip-meta-badge">
                                {isVipConfigured ? (
                                    <>
                                        <span className="owner-txt">
                                            ACTIVE GATEWAY OWNER: <strong>{vipHolderNode}</strong>
                                        </span>
                                        <span className="arp-txt">Gratuitous ARP Broadcasting (Cross-Platform)</span>
                                    </>
                                ) : (
                                    <span className="unconfigured-txt">Direct IP Ingest Mode (VIP Disabled)</span>
                                )}
                            </div>
                        </div>

                        {/* CASE A: STANDALONE MODE (SINGLE SERVER OPERATING AUTONOMOUSLY) */}
                        {isStandalone ? (
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
                                            onClick={handleScanLan}
                                            disabled={isScanning}
                                        >
                                            {isScanning ? 'Probing Subnet...' : '📡 Scan LAN Subnet for Peers'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* CASE B: MULTI-NODE ACTIVE-ACTIVE MESH TOPOLOGY */
                            <div className="topology-mesh-nodes-grid">
                                {clusterNodes.map(node => {
                                    const isOptimal = node.NodeId === optimalNodeId;
                                    const isLocalNode = node.IsLocal;
                                    const pingData = pingResults[node.NodeId || node.ApiBaseUrl];
                                    const isPingingThis = pingingNodeId === (node.NodeId || node.ApiBaseUrl);

                                    return (
                                        <div
                                            key={node.NodeId || node.MachineName}
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
                                                        onClick={() => handlePingNode(node)}
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
                                })}
                            </div>
                        )}

                        {/* INFRASTRUCTURE LINKS ROW (STORAGE & FLEET) */}
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
                    </div>
                </section>

                {/* 2. LOAD BALANCER & HARDWARE METRICS SECTION */}
                <section className="workload-card-section">
                    <div className="section-title-row">
                        <div className="title-left">
                            <span className="num-pill">02</span>
                            <h2>Active-Active Load Balancer & Dynamic Hardware Distribution</h2>
                        </div>
                        <div className="title-right">
                            <span className="encoder-tag">
                                ACTIVE ENCODER: <strong>{overview?.Workload?.DetectedEncoder?.toUpperCase() || 'LIBX264'}</strong>
                            </span>
                        </div>
                    </div>

                    <div className="workload-metrics-grid">
                        {/* CPU LOAD METER */}
                        <div className="metric-pod-card">
                            <div className="pod-header">
                                <span className="pod-title">HOST CPU UTILIZATION</span>
                                <span className="pod-badge cyan">{overview?.Workload?.HostCpuPct ?? 0}%</span>
                            </div>
                            <div className="progress-bar-wrap">
                                <div
                                    className="progress-fill cyan"
                                    style={{ width: `${Math.min(overview?.Workload?.HostCpuPct ?? 0, 100)}%` }}
                                />
                            </div>
                            <div className="pod-footer-meta">
                                <span>Server Process: {overview?.Workload?.ProcessCpuPct ?? 0}%</span>
                                <span>Multi-core Balancer</span>
                            </div>
                        </div>

                        {/* RAM LOAD METER */}
                        <div className="metric-pod-card">
                            <div className="pod-header">
                                <span className="pod-title">MEMORY ALLOCATION</span>
                                <span className="pod-badge blue">{overview?.Workload?.HostRamPct ?? 0}%</span>
                            </div>
                            <div className="progress-bar-wrap">
                                <div
                                    className="progress-fill blue"
                                    style={{ width: `${Math.min(overview?.Workload?.HostRamPct ?? 0, 100)}%` }}
                                />
                            </div>
                            <div className="pod-footer-meta">
                                <span>Server App: {Math.round(overview?.Workload?.ProcessRamMb ?? 0)} MB</span>
                                <span>Host Total: {Math.round(overview?.Workload?.HostTotalRamMb ?? 0)} MB</span>
                            </div>
                        </div>

                        {/* GPU / HARDWARE ACCELERATION */}
                        <div className="metric-pod-card">
                            <div className="pod-header">
                                <span className="pod-title">GPU / HW TRANSCODING</span>
                                <span className="pod-badge purple">{overview?.Workload?.GpuNvencPct ?? 0}% NVENC</span>
                            </div>
                            <div className="progress-bar-wrap">
                                <div
                                    className="progress-fill purple"
                                    style={{ width: `${Math.min(overview?.Workload?.GpuNvencPct ?? 0, 100)}%` }}
                                />
                            </div>
                            <div className="pod-footer-meta">
                                <span>3D Engine: {overview?.Workload?.Gpu3dPct ?? 0}%</span>
                                <span>{overview?.Workload?.DetectedEncoder || 'auto'}</span>
                            </div>
                        </div>

                        {/* NETWORK I/O THROUGHPUT */}
                        <div className="metric-pod-card">
                            <div className="pod-header">
                                <span className="pod-title">NETWORK I/O THROUGHPUT</span>
                                <span className="pod-badge emerald">{overview?.Workload?.NetworkRxMbps ?? 0} Mbps RX</span>
                            </div>
                            <div className="progress-bar-wrap">
                                <div
                                    className="progress-fill emerald"
                                    style={{ width: `${Math.min(((overview?.Workload?.NetworkRxMbps ?? 0) / 1000) * 100, 100)}%` }}
                                />
                            </div>
                            <div className="pod-footer-meta">
                                <span>TX: {overview?.Workload?.NetworkTxMbps ?? 0} Mbps</span>
                                <span>NIC Link: {overview?.Workload?.NetworkLinkSpeedMbps ?? 1000} Mbps</span>
                            </div>
                        </div>
                    </div>

                    {/* DYNAMIC MULTI-NODE WORKLOAD COMPARISON MATRIX */}
                    {clusterNodes.length > 1 && (
                        <div className="mesh-load-comparison-matrix">
                            <div className="matrix-header">
                                <span className="matrix-icon">⚖️</span>
                                <h3>Cluster-Wide Workload Balancing Matrix (Active-Active)</h3>
                            </div>
                            <div className="matrix-table-wrap">
                                <table className="mesh-load-table">
                                    <thead>
                                        <tr>
                                            <th>Node</th>
                                            <th>Hardware Engine</th>
                                            <th>Capacity Weight</th>
                                            <th>CPU Load</th>
                                            <th>Active Streams</th>
                                            <th>Normalized Load Score</th>
                                            <th>Routing Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clusterNodes.map(n => {
                                            const isSelected = n.NodeId === optimalNodeId;
                                            return (
                                                <tr key={n.NodeId} className={isSelected ? 'optimal-row' : ''}>
                                                    <td className="node-cell">
                                                        <span className="dot" />
                                                        <strong>{n.MachineName}</strong> {n.IsLocal && <span className="tag">Local</span>}
                                                    </td>
                                                    <td>{n.Hardware?.DetectedEncoder?.toUpperCase()}</td>
                                                    <td><span className="weight-pill">{n.Hardware?.CapacityWeight || 1.0}x</span></td>
                                                    <td>{n.Workload?.HostCpuPct ?? 0}%</td>
                                                    <td>{n.Workload?.ActiveStreams ?? 0}</td>
                                                    <td className="score-cell font-bold cyan">{n.Workload?.NormalizedLoadScore ?? 0} pts</td>
                                                    <td>
                                                        {isSelected ? (
                                                            <span className="optimal-badge">⚡ Optimal Route (New Ingest)</span>
                                                        ) : (
                                                            <span className="balanced-badge">Active Participant</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* LOAD BALANCER RECOMMENDATION STRIP */}
                    <div className="lb-proportional-banner">
                        <div className="banner-icon">⚖️</div>
                        <div className="banner-content">
                            <h4>Intelligent Asymmetric Hardware Workload Balancing</h4>
                            <p>
                                The cluster automatically evaluates node capacity (NVIDIA NVENC 3.5x, Intel QSV 2.0x, CPU 1.0x) and routes new stream recordings and FFMPEG transcoding tasks to maintain balanced operational strain percentage across all active instances.
                            </p>
                        </div>
                        <div className="banner-ratio-pills">
                            <span className="ratio-pill primary">
                                Current Active Nodes: {totalActiveNodes}
                            </span>
                            <span className="ratio-divider">•</span>
                            <span className="ratio-pill secondary">
                                Mode: {isStandalone ? 'Autonomous Single-Node' : 'Active-Active Mesh'}
                            </span>
                        </div>
                    </div>
                </section>
            </div>

            {/* LAN DISCOVERY RADAR MODAL */}
            {isScanModalOpen && (
                <div className="cluster-modal-backdrop" onClick={() => setIsScanModalOpen(false)}>
                    <div className="cluster-modal-window" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-title-row">
                                <span className="radar-icon">📡</span>
                                <h3>LAN Discovery Radar Scan</h3>
                            </div>
                            <button
                                type="button"
                                className="btn-close-modal"
                                onClick={() => setIsScanModalOpen(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="modal-body">
                            <p className="modal-desc">
                                Broadcasted UDP probe across local subnet ({scanResults?.scannedBroadcast || overview?.Discovery?.BroadcastAddress || '255.255.255.255'}) and multicast group ({scanResults?.scannedMulticast || overview?.Discovery?.MulticastAddress || 'Disabled'}:{scanResults?.scannedPort || overview?.Discovery?.Port || 5098}).
                            </p>

                            {isScanning ? (
                                <div className="scanning-state-box">
                                    <div className="radar-spinner" />
                                    <span>Listening for node beacons across the local network...</span>
                                </div>
                            ) : scanResults?.nodes?.length > 0 ? (
                                <div className="discovered-nodes-list">
                                    {scanResults.nodes.map((node, idx) => (
                                        <div key={idx} className="discovered-node-item">
                                            <div className="item-left">
                                                <span className="node-icon">🖥️</span>
                                                <div className="node-details">
                                                    <div className="node-head">
                                                        <span className="name">{node.ServerName || node.ServerId}</span>
                                                        <span className={`pill ${node.Role?.toLowerCase()}`}>{node.Role}</span>
                                                        {node.VirtualIp && (
                                                            <span className="vip-chip">VIP: {node.VirtualIp}</span>
                                                        )}
                                                    </div>
                                                    <span className="ip-info">{node.RemoteIp} • API: {node.ApiBaseUrl}</span>
                                                </div>
                                            </div>
                                            <div className="item-right">
                                                <button
                                                    type="button"
                                                    className="btn-use-partner"
                                                    onClick={() => {
                                                        setSettingsForm(prev => ({ ...prev, partnerServerUrl: node.ApiBaseUrl }));
                                                        setIsScanModalOpen(false);
                                                        setIsSettingsDrawerOpen(true);
                                                    }}
                                                >
                                                    Select Node
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-nodes-box">
                                    <p>No other active ITB servers detected on this subnet. Operating as autonomous single node.</p>
                                    <button
                                        type="button"
                                        className="btn-rescan"
                                        onClick={handleScanLan}
                                    >
                                        Scan Again
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* QUICK CLUSTER SETTINGS DRAWER */}
            {isSettingsDrawerOpen && (
                <div className="cluster-drawer-backdrop" onClick={() => setIsSettingsDrawerOpen(false)}>
                    <div className="cluster-drawer-panel" onClick={e => e.stopPropagation()}>
                        <div className="drawer-header">
                            <div className="drawer-title-row">
                                <span className="drawer-icon">⚙️</span>
                                <h3>Cluster & VIP Configuration</h3>
                            </div>
                            <button
                                type="button"
                                className="btn-close-drawer"
                                onClick={() => setIsSettingsDrawerOpen(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <form className="drawer-form" onSubmit={handleSaveSettings}>
                            <div className="form-group">
                                <label>Cluster Operational Mode / Role</label>
                                <select
                                    value={settingsForm.role}
                                    onChange={e => setSettingsForm({ ...settingsForm, role: e.target.value })}
                                >
                                    <option value="Active-Active">Active-Active (Dynamic Distributed Mesh)</option>
                                    <option value="Primary">Primary (Dedicated VIP Preferred Node)</option>
                                    <option value="Secondary">Secondary (Standby Node)</option>
                                    <option value="Aggregate">Aggregate (Super-Server Studio)</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Priority Level</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={settingsForm.priority}
                                    onChange={e => setSettingsForm({ ...settingsForm, priority: parseInt(e.target.value) || 1 })}
                                />
                                <span className="helper-txt">1 = Highest Priority for VIP Leadership; 2+ = Secondary</span>
                            </div>

                            <div className="form-group">
                                <label>Peer Server URL (Optional)</label>
                                <input
                                    type="text"
                                    placeholder="Leave empty for zero-conf UDP auto-discovery"
                                    value={settingsForm.partnerServerUrl}
                                    onChange={e => setSettingsForm({ ...settingsForm, partnerServerUrl: e.target.value })}
                                />
                                <span className="helper-txt">Leave empty to discover cluster nodes automatically via LAN Multicast/Broadcast</span>
                            </div>

                            <div className="form-divider" />

                            <div className="form-group checkbox-group">
                                <label className="custom-check-row">
                                    <input
                                        type="checkbox"
                                        checked={settingsForm.enableVirtualIp}
                                        onChange={e => setSettingsForm({ ...settingsForm, enableVirtualIp: e.target.checked })}
                                    />
                                    <span className="check-title">Enable Cross-Platform Virtual IP (VIP)</span>
                                </label>
                            </div>

                            {settingsForm.enableVirtualIp && (
                                <>
                                    <div className="form-group">
                                        <label>Virtual IP (VIP) Address</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 192.168.1.200"
                                            value={settingsForm.virtualIp}
                                            onChange={e => setSettingsForm({ ...settingsForm, virtualIp: e.target.value })}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>VIP Subnet Mask</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 255.255.255.0"
                                            value={settingsForm.virtualIpSubnetMask}
                                            onChange={e => setSettingsForm({ ...settingsForm, virtualIpSubnetMask: e.target.value })}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Network Interface Name (Optional)</label>
                                        <input
                                            type="text"
                                            placeholder="Leave empty for auto-detection (Windows: Ethernet / Linux: eth0)"
                                            value={settingsForm.networkInterfaceName}
                                            onChange={e => setSettingsForm({ ...settingsForm, networkInterfaceName: e.target.value })}
                                        />
                                    </div>
                                </>
                            )}

                            <div className="form-divider" />
                            <div className="drawer-section-title" style={{ color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                                Network & Discovery Mesh Configuration
                            </div>

                            <div className="form-group">
                                <label>UDP Multicast Group Address</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 239.255.10.90"
                                    value={settingsForm.multicastAddress}
                                    onChange={e => setSettingsForm({ ...settingsForm, multicastAddress: e.target.value })}
                                />
                                <span className="helper-txt">Administratively scoped IPv4 Multicast group used for cluster peer heartbeat</span>
                            </div>

                            <div className="form-group">
                                <label>Subnet Broadcast Address</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 255.255.255.255"
                                    value={settingsForm.broadcastAddress}
                                    onChange={e => setSettingsForm({ ...settingsForm, broadcastAddress: e.target.value })}
                                />
                                <span className="helper-txt">Fallback subnet broadcast address when multicast is restricted</span>
                            </div>

                            <div className="form-group">
                                <label>UDP Discovery Port</label>
                                <input
                                    type="number"
                                    min="1024"
                                    max="65535"
                                    placeholder="5098"
                                    value={settingsForm.port}
                                    onChange={e => setSettingsForm({ ...settingsForm, port: parseInt(e.target.value) || 5098 })}
                                />
                            </div>

                            <div className="form-divider" />

                            <div className="form-group checkbox-group">
                                <label className="custom-check-row">
                                    <input
                                        type="checkbox"
                                        checked={settingsForm.autoFailoverDashboard}
                                        onChange={e => setSettingsForm({ ...settingsForm, autoFailoverDashboard: e.target.checked })}
                                    />
                                    <span className="check-title">Auto-Failover Dashboard to Peer Node on Failure</span>
                                </label>
                            </div>

                            <div className="form-group">
                                <label>Failover Delay Countdown (Seconds)</label>
                                <input
                                    type="number"
                                    min="2"
                                    max="60"
                                    value={settingsForm.dashboardFailoverDelaySeconds}
                                    onChange={e => setSettingsForm({ ...settingsForm, dashboardFailoverDelaySeconds: parseInt(e.target.value) || 8 })}
                                />
                            </div>

                            {settingsFeedback && (
                                <div className={`drawer-feedback-pill ${settingsFeedback.success ? 'success' : 'error'}`}>
                                    {settingsFeedback.message}
                                </div>
                            )}

                            <div className="drawer-actions">
                                <button
                                    type="button"
                                    className="btn-cancel"
                                    onClick={() => setIsSettingsDrawerOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-save"
                                    disabled={isSavingSettings}
                                >
                                    {isSavingSettings ? 'Saving...' : 'Save Configuration'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
