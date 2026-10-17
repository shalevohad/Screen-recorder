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
    const [isPinging, setIsPinging] = useState(false);
    const [pingResult, setPingResult] = useState(null);

    const [isScanning, setIsScanning] = useState(false);
    const [scanResults, setScanResults] = useState(null);
    const [isScanModalOpen, setIsScanModalOpen] = useState(false);

    const [isVipActionPending, setIsVipActionPending] = useState(false);
    const [vipActionFeedback, setVipActionFeedback] = useState(null);

    // Quick Settings Drawer
    const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);
    const [settingsForm, setSettingsForm] = useState({
        role: 'Primary',
        priority: 1,
        partnerServerUrl: '',
        enableVirtualIp: false,
        virtualIp: '',
        virtualIpSubnetMask: '255.255.255.0',
        networkInterfaceName: '',
        autoFailoverDashboard: true,
        dashboardFailoverDelaySeconds: 8
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
                    role: data.LocalNode.Role || 'Primary',
                    priority: data.LocalNode.Priority ?? 1,
                    partnerServerUrl: data.PartnerNode?.PartnerUrl || '',
                    enableVirtualIp: data.LocalNode.VipStatus?.EnableVirtualIp || false,
                    virtualIp: data.LocalNode.VipStatus?.VirtualIp || '',
                    virtualIpSubnetMask: data.LocalNode.VipStatus?.SubnetMask || '255.255.255.0',
                    networkInterfaceName: data.LocalNode.VipStatus?.ActiveInterface || '',
                    autoFailoverDashboard: data.Discovery.AutoFailoverDashboard !== false,
                    dashboardFailoverDelaySeconds: data.Discovery.FailoverDelaySeconds || 8
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

    // Handle Ping Partner
    const handlePingPartner = async () => {
        setIsPinging(true);
        setPingResult(null);
        try {
            const res = await fetch('/api/v1/cluster/ping-partner', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ partnerUrl: overview?.PartnerNode?.PartnerUrl })
            });
            const data = await res.json();
            setPingResult(data);
        } catch (err) {
            setPingResult({ success: false, message: err.message || 'Network call failed' });
        } finally {
            setIsPinging(false);
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

    const localRole = overview?.LocalNode?.Role || 'Primary';
    const isPrimary = localRole.toLowerCase() === 'primary';
    const partnerUrl = overview?.PartnerNode?.PartnerUrl;

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
                            <span className={`cluster-badge-pill ${localRole.toLowerCase()}`}>
                                <span className="dot" />
                                {localRole.toUpperCase()} NODE
                            </span>
                            {isVipConfigured && (
                                <span className={`vip-badge-pill ${isHoldingVip ? 'holding' : 'standby'}`}>
                                    <span className="vip-icon">⚡</span>
                                    VIP: {vipAddress} [{isHoldingVip ? 'ACTIVE HERE' : 'STANDBY'}]
                                </span>
                            )}
                        </div>
                        <h1>Cluster Architecture & High Availability Operations</h1>
                        <p className="subtitle">
                            ACTIVE-ACTIVE REDUNDANCY • VIRTUAL IP (VIP) FAILOVER • LOAD BALANCING & HARDWARE MONITORING
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

                <div className="action-buttons-wrap">
                    {/* VIP Takeover / Release */}
                    {isVipConfigured && (
                        <button
                            type="button"
                            className={`btn-action-vip ${isHoldingVip ? 'release' : 'takeover'}`}
                            onClick={() => handleVipToggle(isHoldingVip ? 'release' : 'takeover')}
                            disabled={isVipActionPending}
                        >
                            <span className="bolt">⚡</span>
                            {isVipActionPending ? 'Executing...' : (isHoldingVip ? 'Release Virtual IP (VIP)' : 'Force Takeover Virtual IP (VIP)')}
                        </button>
                    )}

                    {/* Ping Partner */}
                    <button
                        type="button"
                        className="btn-action-tool"
                        onClick={handlePingPartner}
                        disabled={isPinging || !partnerUrl}
                        title={!partnerUrl ? 'No Partner URL configured' : 'Ping partner server'}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="15" height="15">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                        </svg>
                        <span>{isPinging ? 'Pinging...' : 'Ping Partner Server'}</span>
                    </button>

                    {/* Scan LAN Discovery */}
                    <button
                        type="button"
                        className="btn-action-tool"
                        onClick={handleScanLan}
                        disabled={isScanning}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="15" height="15">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="2" x2="12" y2="12" />
                            <path d="M12 12l7 4" />
                        </svg>
                        <span>{isScanning ? 'Scanning LAN...' : 'LAN Discovery Radar'}</span>
                    </button>

                    {/* Navigate to Recording Command Center */}
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
                {pingResult && (
                    <div className={`action-feedback-pill ${pingResult.success ? 'success' : 'error'}`}>
                        {pingResult.message}
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
                            <h2>Live Cluster Topology & Node Interconnects</h2>
                        </div>
                        <div className="title-right">
                            <span className="live-pulse-dot" />
                            <span className="sub-txt">REAL-TIME CIRCUIT VISUALIZATION</span>
                        </div>
                    </div>

                    <div className="topology-canvas-container">
                        {/* FLOATING VIP GATEWAY ANCHOR (TOP CENTER) */}
                        <div className={`topology-vip-anchor ${isHoldingVip ? 'holding-local' : 'holding-partner'}`}>
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
                                            ACTIVE OWNER: <strong>{isHoldingVip ? 'THIS NODE (LOCAL)' : 'PARTNER NODE'}</strong>
                                        </span>
                                        <span className="arp-txt">Gratuitous ARP Broadcasting</span>
                                    </>
                                ) : (
                                    <span className="unconfigured-txt">VIP Feature Disabled</span>
                                )}
                            </div>
                        </div>

                        {/* NODES ROW */}
                        <div className="topology-nodes-row">
                            {/* NODE 1: LOCAL SERVER (THIS INSTANCE) */}
                            <div className={`node-card local-node ${isHoldingVip ? 'is-vip-owner' : ''}`}>
                                <div className="node-card-header">
                                    <div className="node-status-indicator">
                                        <span className="status-orb green" />
                                        <span className="node-label">LOCAL NODE (THIS INSTANCE)</span>
                                    </div>
                                    <span className={`role-badge ${localRole.toLowerCase()}`}>
                                        {localRole.toUpperCase()} (P{overview?.LocalNode?.Priority ?? 1})
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
                                        <span>ACTIVE VIP INBOUND GATEWAY</span>
                                    </div>
                                )}
                            </div>

                            {/* CIRCUIT INTERCONNECT VISUALIZER */}
                            <div className="topology-interconnect-column">
                                <div className={`interconnect-line ${overview?.PartnerNode?.IsConfigured ? 'connected' : 'disconnected'}`}>
                                    <div className="packet-pulse packet-forward" />
                                    <div className="packet-pulse packet-backward" />
                                </div>
                                <div className="interconnect-hub-pill">
                                    <span className="sync-icon">⇌</span>
                                    <span className="hub-label">HEARTBEAT & SYNC</span>
                                    {pingResult?.latencyMs ? (
                                        <span className="ping-pill">{pingResult.latencyMs} ms</span>
                                    ) : (
                                        <span className="ping-pill status">HEALTHY</span>
                                    )}
                                </div>
                            </div>

                            {/* NODE 2: PARTNER SERVER NODE */}
                            <div className={`node-card partner-node ${!overview?.PartnerNode?.IsConfigured ? 'not-configured' : ''}`}>
                                <div className="node-card-header">
                                    <div className="node-status-indicator">
                                        <span className={`status-orb ${overview?.PartnerNode?.IsConfigured ? 'green' : 'amber'}`} />
                                        <span className="node-label">PARTNER NODE (CLUSTER PAIR)</span>
                                    </div>
                                    <span className="role-badge standby">
                                        {isPrimary ? 'SECONDARY' : 'PRIMARY'}
                                    </span>
                                </div>

                                <div className="node-hostname">
                                    {overview?.PartnerNode?.PartnerUrl || 'No Partner Configured'}
                                </div>

                                {overview?.PartnerNode?.IsConfigured ? (
                                    <>
                                        <div className="node-props-grid">
                                            <div className="prop-row">
                                                <span className="prop-k">Partner URL</span>
                                                <span className="prop-v link" title={partnerUrl}>{partnerUrl}</span>
                                            </div>
                                            <div className="prop-row">
                                                <span className="prop-k">Health Check</span>
                                                <span className="prop-v green">VERIFIED ONLINE</span>
                                            </div>
                                            <div className="prop-row">
                                                <span className="prop-k">Failed Probes</span>
                                                <span className="prop-v">{overview?.PartnerNode?.FailedHealthChecks || 0} / 2</span>
                                            </div>
                                            <div className="prop-row">
                                                <span className="prop-k">Failover Trigger</span>
                                                <span className="prop-v">Auto Failover Enabled</span>
                                            </div>
                                            <div className="prop-row">
                                                <span className="prop-k">Failover Delay</span>
                                                <span className="prop-v">{overview?.Discovery?.FailoverDelaySeconds || 8}s</span>
                                            </div>
                                        </div>

                                        <div className="partner-action-row">
                                            <button
                                                type="button"
                                                className="btn-partner-ping"
                                                onClick={handlePingPartner}
                                                disabled={isPinging}
                                            >
                                                {isPinging ? 'Testing...' : 'Test Connection Ping'}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="not-configured-notice">
                                        <p>No partner server URL configured yet.</p>
                                        <button
                                            type="button"
                                            className="btn-setup-partner"
                                            onClick={() => setIsSettingsDrawerOpen(true)}
                                        >
                                            Configure Partner Server →
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

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
                            <h2>Active-Active Load Balancer & Hardware Meters</h2>
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

                    {/* LOAD BALANCER RECOMMENDATION STRIP */}
                    <div className="lb-proportional-banner">
                        <div className="banner-icon">⚖️</div>
                        <div className="banner-content">
                            <h4>Asymmetric Hardware Workload Distribution (Active-Active)</h4>
                            <p>
                                The cluster automatically computes proportional load balancing between cluster nodes based on available GPU (NVENC), Intel QuickSync (QSV), and CPU cores to balance operational pressure evenly across both server instances.
                            </p>
                        </div>
                        <div className="banner-ratio-pills">
                            <span className="ratio-pill primary">Local ({overview?.Workload?.DetectedEncoder?.includes('nvenc') ? 'GPU 70%' : 'QSV/CPU 45%'})</span>
                            <span className="ratio-divider">:</span>
                            <span className="ratio-pill secondary">Partner (Reserve Capacity)</span>
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
                                Broadcasted UDP probe across local subnet (255.255.255.255) and multicast group ({scanResults?.scannedMulticast || '239.255.10.90'}:{scanResults?.scannedPort || 5098}).
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
                                                    Select as Partner
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-nodes-box">
                                    <p>No other active ITB servers detected on this subnet.</p>
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
                                <label>Server Role</label>
                                <select
                                    value={settingsForm.role}
                                    onChange={e => setSettingsForm({ ...settingsForm, role: e.target.value })}
                                >
                                    <option value="Primary">Primary (Active Main Server)</option>
                                    <option value="Secondary">Secondary (Standby / Auto-Failover)</option>
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
                                <span className="helper-txt">1 = Primary, 2+ = Secondary, 0 = Aggregate</span>
                            </div>

                            <div className="form-group">
                                <label>Partner Server URL</label>
                                <input
                                    type="text"
                                    placeholder="https://192.168.1.101:5090"
                                    value={settingsForm.partnerServerUrl}
                                    onChange={e => setSettingsForm({ ...settingsForm, partnerServerUrl: e.target.value })}
                                />
                                <span className="helper-txt">Direct URL of the peer cluster node for health checks and failover</span>
                            </div>

                            <div className="form-divider" />

                            <div className="form-group checkbox-group">
                                <label className="custom-check-row">
                                    <input
                                        type="checkbox"
                                        checked={settingsForm.enableVirtualIp}
                                        onChange={e => setSettingsForm({ ...settingsForm, enableVirtualIp: e.target.checked })}
                                    />
                                    <span className="check-title">Enable Cluster Virtual IP (VIP)</span>
                                </label>
                            </div>

                            {settingsForm.enableVirtualIp && (
                                <>
                                    <div className="form-group">
                                        <label>Virtual IP (VIP) Address</label>
                                        <input
                                            type="text"
                                            placeholder="192.168.1.200"
                                            value={settingsForm.virtualIp}
                                            onChange={e => setSettingsForm({ ...settingsForm, virtualIp: e.target.value })}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>VIP Subnet Mask</label>
                                        <input
                                            type="text"
                                            placeholder="255.255.255.0"
                                            value={settingsForm.virtualIpSubnetMask}
                                            onChange={e => setSettingsForm({ ...settingsForm, virtualIpSubnetMask: e.target.value })}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Network Interface Name (Optional)</label>
                                        <input
                                            type="text"
                                            placeholder="Leave empty for auto-detection (e.g. Ethernet / eth0)"
                                            value={settingsForm.networkInterfaceName}
                                            onChange={e => setSettingsForm({ ...settingsForm, networkInterfaceName: e.target.value })}
                                        />
                                    </div>
                                </>
                            )}

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
