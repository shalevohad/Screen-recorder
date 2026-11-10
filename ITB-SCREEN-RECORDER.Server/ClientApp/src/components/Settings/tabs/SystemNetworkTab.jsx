// ==========================================
// File: Client/src/components/Settings/tabs/SystemNetworkTab.jsx
// ==========================================
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function SystemNetworkTab({ form, activeFeatures = [], updateField, updateDashboardField, updateMediaMtxField, updateDiscoveryField, updateAutoDirectorField }) {
    const hasReplayStudioFeature = React.useMemo(() => {
        if (!Array.isArray(activeFeatures) || activeFeatures.length === 0) return false;
        return activeFeatures.some(f =>
            f.id === 'extractor-advanced-studio' ||
            f.id === 'extractor-slicer' ||
            (typeof f.id === 'string' && f.id.toLowerCase().includes('extractor'))
        );
    }, [activeFeatures]);
    const { isSystemRoot, hasPermission } = useAuth();

    const [clusterStatus, setClusterStatus] = useState(null);
    const [clusterGrid, setClusterGrid] = useState(null);
    const [clusterLoading, setClusterLoading] = useState(false);
    const [clusterActionLoading, setClusterActionLoading] = useState(false);
    const [clusterFeedback, setClusterFeedback] = useState(null);

    const fetchClusterStatus = useCallback(async () => {
        try {
            setClusterLoading(true);
            const [statusRes, gridRes] = await Promise.all([
                fetch('/api/v1/cluster/status'),
                fetch('/api/v1/cluster/grid')
            ]);
            if (statusRes.ok) {
                const data = await statusRes.json();
                setClusterStatus(data);
            }
            if (gridRes.ok) {
                const gridData = await gridRes.json();
                setClusterGrid(gridData);
            }
        } catch (err) {
            console.warn('[ClusterUI] Failed to load cluster status:', err);
        } finally {
            setClusterLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchClusterStatus();
        const interval = setInterval(fetchClusterStatus, 5000);
        return () => clearInterval(interval);
    }, [fetchClusterStatus]);

    const handleTransferOrchestrator = async (targetNodeId) => {
        try {
            setClusterActionLoading(true);
            setClusterFeedback(null);
            const res = await fetch('/api/v1/cluster/orchestrator/transfer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetNodeId })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setClusterFeedback({ type: 'success', message: data.message || `Orchestrator transferred to ${targetNodeId}` });
                fetchClusterStatus();
            } else {
                setClusterFeedback({ type: 'error', message: data.message || 'Failed to transfer Orchestrator' });
            }
        } catch (err) {
            setClusterFeedback({ type: 'error', message: err.message });
        } finally {
            setClusterActionLoading(false);
        }
    };

    const handleAcquireVip = async () => {
        try {
            setClusterActionLoading(true);
            setClusterFeedback(null);
            const res = await fetch('/api/v1/cluster/failover/acquire-vip', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setClusterFeedback({ type: 'success', message: data.message || 'Virtual IP acquired successfully!' });
                fetchClusterStatus();
            } else {
                setClusterFeedback({ type: 'error', message: data.message || 'Failed to acquire Virtual IP' });
            }
        } catch (err) {
            setClusterFeedback({ type: 'error', message: err.message });
        } finally {
            setClusterActionLoading(false);
        }
    };

    const handleReleaseVip = async () => {
        try {
            setClusterActionLoading(true);
            setClusterFeedback(null);
            const res = await fetch('/api/v1/cluster/failover/release-vip', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setClusterFeedback({ type: 'success', message: data.message || 'Virtual IP released successfully' });
                fetchClusterStatus();
            } else {
                setClusterFeedback({ type: 'error', message: data.message || 'Failed to release Virtual IP' });
            }
        } catch (err) {
            setClusterFeedback({ type: 'error', message: err.message });
        } finally {
            setClusterActionLoading(false);
        }
    };

    if (!form) return null;

    const isStealthAuthorized = isSystemRoot || Boolean(hasPermission?.('system.stealth') || hasPermission?.('settings.stealth'));

    const dashboard = form.dashboard || {};
    const mediaMtx = form.mediaMtx || {};
    const discovery = form.discovery || {};
    const autoDirector = form.autoDirector || {};

    const studioScreenTicks = [
        { val: 1, label: '1' },
        { val: 2, label: '2' },
        { val: 3, label: '3' },
        { val: 4, label: '4' },
        { val: 5, label: '5' },
        { val: 6, label: '6' }
    ];

    const preloadTicks = [
        { val: 0.5, label: '0.5s' },
        { val: 1.0, label: '1.0s' },
        { val: 1.5, label: '1.5s' },
        { val: 2.0, label: '2.0s' },
        { val: 3.0, label: '3.0s' },
        { val: 5.0, label: '5.0s' }
    ];

    const dwellTicks = [
        { val: 3, label: '3s' },
        { val: 5, label: '5s' },
        { val: 10, label: '10s' },
        { val: 15, label: '15s' },
        { val: 30, label: '30s' },
        { val: 60, label: '60s' }
    ];

    const timezones = [
        { val: 'Asia/Jerusalem', label: 'Asia/Jerusalem (Israel Standard Time)' },
        { val: 'UTC', label: 'UTC (Coordinated Universal Time)' },
        { val: 'America/New_York', label: 'America/New_York (Eastern Time)' },
        { val: 'Europe/London', label: 'Europe/London (GMT/BST)' },
        { val: 'Europe/Berlin', label: 'Europe/Berlin (Central European Time)' }
    ];

    const locales = [
        { val: 'en-US', label: 'English (United States - en-US)' },
        { val: 'he-IL', label: 'Hebrew (Israel - he-IL)' }
    ];

    return (
        <fieldset className="settings-fieldset system-network-fieldset">
            <legend>System, Network & Streaming Engine</legend>

            <div className="security-subpanel">
                <div className="subpanel-header">
                    <h4>SERVER NETWORK & LOCALIZATION</h4>
                    <span className="subpanel-desc">Configure central HTTP listening port, timezone, and locale settings.</span>
                </div>

                <div className="settings-fields-row">
                    <div className="settings-field">
                        <span>HTTP / HTTPS Server Port</span>
                        <input
                            type="number"
                            min="1"
                            max="65535"
                            value={form.httpPort || 5090}
                            onChange={e => updateField('httpPort', Number(e.target.value))}
                            required
                        />
                        <span className="field-note" style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '4px' }}>
                            שינוי פורט יאתחל אוטומטית את השרת ויעביר את הדפדפן לכתובת החדשה (ברירת מחדל ללא פורט: 443 ל-HTTPS, 80 ל-HTTP).
                        </span>
                    </div>

                    <div className="settings-field">
                        <span>System Display Timezone</span>
                        <select
                            value={form.displayTimezone || 'Asia/Jerusalem'}
                            onChange={e => updateField('displayTimezone', e.target.value)}
                            className="tactical-select"
                        >
                            {timezones.map(tz => (
                                <option key={tz.val} value={tz.val}>{tz.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="settings-field">
                        <span>System Locale</span>
                        <select
                            value={form.displayLocale || 'en-US'}
                            onChange={e => updateField('displayLocale', e.target.value)}
                            className="tactical-select"
                        >
                            {locales.map(loc => (
                                <option key={loc.val} value={loc.val}>{loc.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="security-subpanel">
                <div className="subpanel-header">
                    <h4>DASHBOARD WEB STREAMING & SNAPSHOT LIMITS</h4>
                    <span className="subpanel-desc">Tune browser viewport load balancing and adaptive snapshot intervals.</span>
                </div>

                <div className="settings-fields-row">
                    <div className="settings-field">
                        <span>Max Concurrent Live Streams</span>
                        <input
                            type="number"
                            min="1"
                            max="36"
                            value={dashboard.maxConcurrentLiveStreams || 9}
                            onChange={e => updateDashboardField('maxConcurrentLiveStreams', Number(e.target.value))}
                            required
                        />
                    </div>

                    <div className="settings-field">
                        <span>Snapshot Min Delay (ms)</span>
                        <input
                            type="number"
                            min="500"
                            max="5000"
                            step="100"
                            value={dashboard.snapshotMinDelayMs || 1500}
                            onChange={e => updateDashboardField('snapshotMinDelayMs', Number(e.target.value))}
                            required
                        />
                    </div>

                    <div className="settings-field">
                        <span>Snapshot Max Delay (ms)</span>
                        <input
                            type="number"
                            min="1000"
                            max="15000"
                            step="500"
                            value={dashboard.snapshotMaxDelayMs || 4500}
                            onChange={e => updateDashboardField('snapshotMaxDelayMs', Number(e.target.value))}
                            required
                        />
                    </div>

                    <div className="settings-field">
                        <span>Viewport Buffer Margin (px)</span>
                        <input
                            type="number"
                            min="50"
                            max="1000"
                            step="50"
                            value={dashboard.snapshotBufferMarginPx || 250}
                            onChange={e => updateDashboardField('snapshotBufferMarginPx', Number(e.target.value))}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="security-subpanel">
                <div className="subpanel-header">
                    <h4>MEDIAMTX RTSP/RTMP/HLS STREAMING ENGINE</h4>
                    <span className="subpanel-desc">MediaMTX high-performance video broker ports and protocols.</span>
                </div>

                <div className="settings-fields-row">
                    <div className="settings-field">
                        <span>RTMP Ingestion Port</span>
                        <input
                            type="number"
                            min="1024"
                            max="65535"
                            value={mediaMtx.rtmpPort || 19350}
                            onChange={e => updateMediaMtxField('rtmpPort', Number(e.target.value))}
                            required
                        />
                    </div>

                    <div className="settings-field">
                        <span>HLS Web Delivery Port</span>
                        <input
                            type="number"
                            min="1024"
                            max="65535"
                            value={mediaMtx.hlsPort || 8888}
                            onChange={e => updateMediaMtxField('hlsPort', Number(e.target.value))}
                            required
                        />
                    </div>

                    <div className="settings-field">
                        <span>Control API Port</span>
                        <input
                            type="number"
                            min="1024"
                            max="65535"
                            value={mediaMtx.apiPort || 9997}
                            onChange={e => updateMediaMtxField('apiPort', Number(e.target.value))}
                            required
                        />
                    </div>

                    <div className="settings-field">
                        <span>Playback Port</span>
                        <input
                            type="number"
                            min="1024"
                            max="65535"
                            value={mediaMtx.playbackPort || 9996}
                            onChange={e => updateMediaMtxField('playbackPort', Number(e.target.value))}
                            required
                        />
                    </div>
                </div>

                <div className="settings-fields-row">
                    <div className="settings-field">
                        <span>Metrics Port (Prometheus)</span>
                        <input
                            type="number"
                            min="1024"
                            max="65535"
                            value={mediaMtx.metricsPort || 9998}
                            onChange={e => updateMediaMtxField('metricsPort', Number(e.target.value))}
                        />
                    </div>

                    <div className="settings-field">
                        <span>HLS Segment Duration</span>
                        <input
                            type="text"
                            placeholder="e.g. 2s"
                            value={mediaMtx.hlsSegmentDuration || '2s'}
                            onChange={e => updateMediaMtxField('hlsSegmentDuration', e.target.value)}
                        />
                    </div>

                    <div className="settings-field">
                        <span>HLS Variant</span>
                        <select
                            value={mediaMtx.hlsVariant || 'fmp4'}
                            onChange={e => updateMediaMtxField('hlsVariant', e.target.value)}
                            className="tactical-select"
                        >
                            <option value="fmp4">fMP4 (Low-Latency fragmented MP4)</option>
                            <option value="mpegts">MPEG-TS (Legacy TS chunks)</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', marginTop: '14px', flexWrap: 'wrap' }}>
                    <label className="tactical-checkbox-label">
                        <input
                            type="checkbox"
                            checked={Boolean(mediaMtx.enableMetrics)}
                            onChange={e => updateMediaMtxField('enableMetrics', e.target.checked)}
                        />
                        <span>Enable MediaMTX Prometheus Metrics</span>
                    </label>

                    <label className="tactical-checkbox-label">
                        <input
                            type="checkbox"
                            checked={Boolean(mediaMtx.enablePlayback)}
                            onChange={e => updateMediaMtxField('enablePlayback', e.target.checked)}
                        />
                        <span>Enable MediaMTX Native Playback API</span>
                    </label>
                </div>
            </div>

            <div className="security-subpanel">
                <div className="subpanel-header">
                    <h4>AUTONOMOUS SERVER DISCOVERY & AGENT REGISTRATION</h4>
                    <span className="subpanel-desc">Configure UDP beacon discovery, multicast/broadcast settings, and network adapter binding for autonomous agent registration.</span>
                </div>

                <div className="settings-fields-row">
                    <div className="settings-field">
                        <span>UDP Discovery Port</span>
                        <input
                            type="number"
                            min="1024"
                            max="65535"
                            placeholder="5098"
                            value={discovery.port ?? 5098}
                            onChange={e => updateDiscoveryField('port', Number(e.target.value))}
                            required
                        />
                    </div>

                    <div className="settings-field">
                        <span>UDP Multicast Address</span>
                        <input
                            type="text"
                            placeholder="e.g. 239.210.1.5"
                            value={discovery.multicastAddress ?? '239.210.1.5'}
                            onChange={e => updateDiscoveryField('multicastAddress', e.target.value)}
                        />
                    </div>

                    <div className="settings-field">
                        <span>Subnet Broadcast Address</span>
                        <input
                            type="text"
                            placeholder="e.g. 255.255.255.255"
                            value={discovery.broadcastAddress ?? '255.255.255.255'}
                            onChange={e => updateDiscoveryField('broadcastAddress', e.target.value)}
                        />
                    </div>

                    <div className="settings-field">
                        <span>Network Interface (Optional)</span>
                        <input
                            type="text"
                            placeholder="Auto-detect active adapter"
                            value={discovery.networkInterfaceName || ''}
                            onChange={e => updateDiscoveryField('networkInterfaceName', e.target.value)}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', marginTop: '14px', flexWrap: 'wrap' }}>
                    <label className="tactical-checkbox-label">
                        <input
                            type="checkbox"
                            checked={discovery.enableBroadcastFallback !== false}
                            onChange={e => updateDiscoveryField('enableBroadcastFallback', e.target.checked)}
                        />
                        <span>Enable Subnet Broadcast Fallback (Auto-fallback when multicast packets are blocked by network switches)</span>
                    </label>
                </div>
            </div>

            {/* HIGH AVAILABILITY, MULTI-SERVER CLUSTERING & VIRTUAL IP (VIP) */}
            <div className="security-subpanel ha-cluster-subpanel" style={{ borderColor: 'rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.02)' }}>
                <div className="subpanel-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '0.68rem', padding: '2px 6px', borderRadius: '4px', background: '#10B981', color: '#020617', fontWeight: 800 }}>HA CLUSTER</span>
                            <h4 style={{ margin: 0, color: '#10B981' }}>MULTI-SERVER CLUSTERING & VIRTUAL IP (VIP)</h4>
                        </div>
                        <span className="subpanel-desc">Configure Active-Active or Active-Standby redundancy, inter-node heartbeat sync, and OS Virtual IP (VIP) failover routing.</span>
                    </div>

                    <button
                        type="button"
                        onClick={fetchClusterStatus}
                        className="btn-sync-cluster"
                        style={{
                            background: 'rgba(30, 41, 59, 0.6)',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            color: '#34D399',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        <span>{clusterLoading ? '🔄 Syncing...' : '🔄 Refresh Live Status'}</span>
                    </button>
                </div>

                {/* Live Node Status Card */}
                {clusterStatus && (
                    <div style={{
                        marginTop: '12px',
                        marginBottom: '16px',
                        padding: '12px 16px',
                        background: 'rgba(15, 23, 42, 0.7)',
                        border: '1px solid rgba(16, 185, 129, 0.25)',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 700 }}>NODE STATE:</span>
                                <span style={{
                                    padding: '3px 10px',
                                    borderRadius: '9999px',
                                    fontSize: '0.75rem',
                                    fontWeight: 800,
                                    letterSpacing: '0.05em',
                                    background: clusterStatus.currentState === 'Active' ? 'rgba(16, 185, 129, 0.2)' : clusterStatus.currentState === 'Standby' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(148, 163, 184, 0.2)',
                                    color: clusterStatus.currentState === 'Active' ? '#10B981' : clusterStatus.currentState === 'Standby' ? '#38BDF8' : '#94A3B8',
                                    border: `1px solid ${clusterStatus.currentState === 'Active' ? '#10B981' : clusterStatus.currentState === 'Standby' ? '#06B6D4' : '#64748B'}`
                                }}>
                                    ● {clusterStatus.currentState?.toUpperCase() || 'UNKNOWN'} ({clusterStatus.nodeRole || 'Node'})
                                </span>

                                {clusterStatus.virtualIpEnabled && (
                                    <span style={{
                                        padding: '3px 10px',
                                        borderRadius: '9999px',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        background: clusterStatus.isVirtualIpBound ? 'rgba(16, 185, 129, 0.25)' : 'rgba(244, 63, 94, 0.15)',
                                        color: clusterStatus.isVirtualIpBound ? '#34D399' : '#FDA4AF',
                                        border: `1px solid ${clusterStatus.isVirtualIpBound ? 'rgba(16, 185, 129, 0.5)' : 'rgba(244, 63, 94, 0.3)'}`
                                    }}>
                                        VIP {clusterStatus.virtualIp}: {clusterStatus.isVirtualIpBound ? 'BOUND (ONLINE)' : 'STANDBY (NOT BOUND)'}
                                    </span>
                                )}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {clusterStatus.virtualIpEnabled && !clusterStatus.isVirtualIpBound && (
                                    <button
                                        type="button"
                                        onClick={handleAcquireVip}
                                        disabled={clusterActionLoading}
                                        style={{
                                            background: 'rgba(16, 185, 129, 0.2)',
                                            border: '1px solid #10B981',
                                            color: '#34D399',
                                            padding: '4px 12px',
                                            borderRadius: '6px',
                                            fontSize: '0.72rem',
                                            fontWeight: 700,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Claim Virtual IP (Promote)
                                    </button>
                                )}

                                {clusterStatus.virtualIpEnabled && clusterStatus.isVirtualIpBound && (
                                    <button
                                        type="button"
                                        onClick={handleReleaseVip}
                                        disabled={clusterActionLoading}
                                        style={{
                                            background: 'rgba(244, 63, 94, 0.2)',
                                            border: '1px solid #F43F5E',
                                            color: '#FDA4AF',
                                            padding: '4px 12px',
                                            borderRadius: '6px',
                                            fontSize: '0.72rem',
                                            fontWeight: 700,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Release Virtual IP (Demote)
                                    </button>
                                )}
                            </div>
                        </div>

                        {clusterStatus.partnerServerUrl && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.72rem', color: '#94A3B8', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }}>
                                <span>PARTNER NODE: <strong style={{ color: '#E2E8F0' }}>{clusterStatus.partnerServerUrl}</strong></span>
                                <span style={{ color: clusterStatus.partnerReachable ? '#10B981' : '#F43F5E', fontWeight: 700 }}>
                                    ● {clusterStatus.partnerReachable ? 'PARTNER HEALTHY' : `PARTNER UNREACHABLE (${clusterStatus.consecutiveMissedHeartbeats} missed)`}
                                </span>
                                <span>PRIORITY: <strong style={{ color: '#E2E8F0' }}>{clusterStatus.priority}</strong></span>
                            </div>
                        )}

                        {clusterFeedback && (
                            <div style={{
                                padding: '6px 10px',
                                borderRadius: '4px',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                background: clusterFeedback.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)',
                                color: clusterFeedback.type === 'success' ? '#34D399' : '#FDA4AF',
                                border: `1px solid ${clusterFeedback.type === 'success' ? '#10B981' : '#F43F5E'}`
                            }}>
                                {clusterFeedback.message}
                            </div>
                        )}
                    </div>
                )}

                {/* ACTIVE-ACTIVE DISTRIBUTED COMPUTE GRID & CLUSTER TOPOLOGY */}
                {discovery.role === 'Active-Active' && clusterGrid && (
                    <div style={{
                        marginTop: '12px',
                        marginBottom: '16px',
                        padding: '12px 16px',
                        background: 'rgba(15, 23, 42, 0.85)',
                        border: '1px solid rgba(6, 182, 212, 0.35)',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '0.68rem', padding: '2px 6px', borderRadius: '4px', background: '#06B6D4', color: '#0F172A', fontWeight: 800 }}>ACTIVE-ACTIVE GRID</span>
                                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#38BDF8' }}>DISTRIBUTED VIDEO COMPUTE & RECORDING CLUSTER</span>
                            </div>
                            <div style={{ display: 'flex', gap: '10px', fontSize: '0.72rem', color: '#94A3B8', flexWrap: 'wrap' }}>
                                <span>👑 Orchestrator: <strong style={{ color: '#FCD34D' }}>{clusterGrid.orchestratorNodeId || 'Electing...'}</strong></span>
                                <span>💻 Nodes: <strong style={{ color: '#34D399' }}>{clusterGrid.onlineNodesCount} / {clusterGrid.totalNodes} Online</strong></span>
                                <span>📹 Streams: <strong style={{ color: '#38BDF8' }}>{clusterGrid.totalIngestedStreams} / {clusterGrid.totalStreamsCapacity}</strong></span>
                                <span>⚡ Active Jobs: <strong style={{ color: '#F472B6' }}>{clusterGrid.totalActiveRenderJobs} / {clusterGrid.totalConcurrentJobsCapacity}</strong></span>
                            </div>
                        </div>

                        {/* Cluster Nodes Table / Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
                            {clusterGrid.nodes?.map(node => (
                                <div key={node.nodeId} style={{
                                    background: 'rgba(30, 41, 59, 0.5)',
                                    border: `1px solid ${node.isOnline ? (node.isOrchestrator ? '#F59E0B' : '#06B6D4') : '#EF4444'}`,
                                    borderRadius: '6px',
                                    padding: '10px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '6px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 800, fontSize: '0.78rem', color: '#F8FAFC' }}>
                                            {node.displayName || node.nodeId}
                                        </span>
                                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                            <span style={{
                                                fontSize: '0.65rem',
                                                padding: '1px 6px',
                                                borderRadius: '4px',
                                                background: node.isOrchestrator ? 'rgba(245, 158, 11, 0.25)' : 'rgba(6, 182, 212, 0.2)',
                                                color: node.isOrchestrator ? '#FCD34D' : '#38BDF8',
                                                fontWeight: 800
                                            }}>
                                                {node.isOrchestrator ? '👑 ORCHESTRATOR' : '⚡ WORKER'}
                                            </span>
                                            <span style={{
                                                fontSize: '0.65rem',
                                                color: node.isOnline ? '#10B981' : '#F43F5E',
                                                fontWeight: 700
                                            }}>
                                                ● {node.isOnline ? 'ONLINE' : 'DOWN'}
                                            </span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94A3B8' }}>
                                        <span>Streams: <strong style={{ color: '#E2E8F0' }}>{node.activeStreamsCount} / {node.maxStreamsCapacity}</strong></span>
                                        <span>Export Jobs: <strong style={{ color: '#E2E8F0' }}>{node.activeJobsCount} / {node.maxConcurrentJobs}</strong></span>
                                        <span>Priority: <strong style={{ color: '#E2E8F0' }}>{node.priority}</strong></span>
                                    </div>

                                    {clusterGrid.isLocalNodeOrchestrator && !node.isOrchestrator && node.isOnline && (
                                        <button
                                            type="button"
                                            onClick={() => handleTransferOrchestrator(node.nodeId)}
                                            disabled={clusterActionLoading}
                                            style={{
                                                marginTop: '4px',
                                                background: 'rgba(245, 158, 11, 0.15)',
                                                border: '1px solid rgba(245, 158, 11, 0.4)',
                                                color: '#FCD34D',
                                                padding: '3px 8px',
                                                borderRadius: '4px',
                                                fontSize: '0.68rem',
                                                fontWeight: 700,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Transfer Orchestrator Role
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="settings-fields-row">
                    <div className="settings-field">
                        <span>Cluster Deployment Role</span>
                        <select
                            value={discovery.role || 'Active-Active'}
                            onChange={e => updateDiscoveryField('role', e.target.value)}
                            className="tactical-select"
                        >
                            <option value="Active-Active">Active-Active (Distributed Compute Grid & Workload Partitioning)</option>
                            <option value="Active-Standby">Active-Standby (High Availability with Automatic Failover)</option>
                            <option value="Standalone">Standalone (Single Server)</option>
                        </select>
                    </div>

                    <div className="settings-field">
                        <span>Cluster Node Role</span>
                        <select
                            value={discovery.nodeRole || 'Primary'}
                            onChange={e => updateDiscoveryField('nodeRole', e.target.value)}
                            className="tactical-select"
                        >
                            <option value="Orchestrator">Orchestrator (Leader / Workload & Ingest Coordinator)</option>
                            <option value="Worker">Worker (Compute & Stream Ingest Node)</option>
                            <option value="Primary">Primary (Active-Standby Leader Node)</option>
                            <option value="Secondary">Secondary (Active-Standby Hot Standby Node)</option>
                        </select>
                    </div>

                    <div className="settings-field">
                        <span>Node Priority (1-100)</span>
                        <input
                            type="number"
                            min="1"
                            max="100"
                            value={discovery.priority ?? 100}
                            onChange={e => updateDiscoveryField('priority', Number(e.target.value))}
                        />
                        <span className="field-note" style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '4px' }}>
                            עדיפות גבוהה יותר קובעת את בחירת ה-Orchestrator במקרה של ניתוק או בחירות מנהיג (Leader Election).
                        </span>
                    </div>

                    <div className="settings-field">
                        <span>Partner Server URL (C2 Endpoint)</span>
                        <input
                            type="text"
                            placeholder="e.g. http://192.168.1.102:5090"
                            value={discovery.partnerServerUrl || ''}
                            onChange={e => updateDiscoveryField('partnerServerUrl', e.target.value)}
                        />
                    </div>
                </div>

                <div className="settings-fields-row">
                    <div className="settings-field" style={{ flex: '1 1 100%' }}>
                        <span>Cluster Peer / Seed URLs (Comma-Separated for Multi-Server Active-Active)</span>
                        <input
                            type="text"
                            placeholder="e.g. http://192.168.1.101:5090, http://192.168.1.102:5090"
                            value={Array.isArray(discovery.clusterPeerUrls) ? discovery.clusterPeerUrls.join(', ') : (discovery.clusterPeerUrls || '')}
                            onChange={e => updateDiscoveryField('clusterPeerUrls', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                        />
                        <span className="field-note" style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '4px' }}>
                            הזן את כתובות השרתים הנוספים המשתתפים בעיבוד הוידאו ובהקלטה המשותפת בקלאסטר.
                        </span>
                    </div>
                </div>

                <div className="settings-fields-row">
                    <div className="settings-field">
                        <span>Max Ingest Streams Capacity (Per Node)</span>
                        <input
                            type="number"
                            min="10"
                            max="200"
                            value={discovery.maxIngestStreamsCapacity ?? 50}
                            onChange={e => updateDiscoveryField('maxIngestStreamsCapacity', Number(e.target.value))}
                        />
                    </div>

                    <div className="settings-field">
                        <span>Max Concurrent Render Jobs (Per Node)</span>
                        <input
                            type="number"
                            min="1"
                            max="16"
                            value={discovery.maxConcurrentRenderJobs ?? 2}
                            onChange={e => updateDiscoveryField('maxConcurrentRenderJobs', Number(e.target.value))}
                        />
                    </div>

                    <div className="settings-field">
                        <span>Heartbeat Interval (Seconds)</span>
                        <input
                            type="number"
                            min="1"
                            max="30"
                            value={discovery.heartbeatIntervalSeconds ?? 3}
                            onChange={e => updateDiscoveryField('heartbeatIntervalSeconds', Number(e.target.value))}
                        />
                    </div>

                    <div className="settings-field">
                        <span>Missed Heartbeats Failover Threshold</span>
                        <input
                            type="number"
                            min="2"
                            max="10"
                            value={discovery.heartbeatMissedThreshold ?? 3}
                            onChange={e => updateDiscoveryField('heartbeatMissedThreshold', Number(e.target.value))}
                        />
                    </div>
                </div>

                <div className="settings-fields-row">
                    <div className="settings-field" style={{ flex: '1 1 calc(50% - 10px)' }}>
                        <span>Virtual IP (VIP) Address</span>
                        <input
                            type="text"
                            placeholder="e.g. 192.168.1.200"
                            value={discovery.virtualIp || ''}
                            onChange={e => updateDiscoveryField('virtualIp', e.target.value)}
                        />
                    </div>

                    <div className="settings-field" style={{ flex: '1 1 calc(50% - 10px)' }}>
                        <span>Virtual IP Subnet Mask</span>
                        <input
                            type="text"
                            placeholder="e.g. 255.255.255.0"
                            value={discovery.virtualIpSubnetMask || '255.255.255.0'}
                            onChange={e => updateDiscoveryField('virtualIpSubnetMask', e.target.value)}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', marginTop: '14px', flexWrap: 'wrap' }}>
                    <label className="tactical-checkbox-label">
                        <input
                            type="checkbox"
                            checked={discovery.autoBalanceStreams !== false}
                            onChange={e => updateDiscoveryField('autoBalanceStreams', e.target.checked)}
                        />
                        <span>Auto-Balance Workstations across Cluster Nodes (Distributes recording streams across commodity hardware)</span>
                    </label>

                    <label className="tactical-checkbox-label">
                        <input
                            type="checkbox"
                            checked={discovery.distributedVideoProcessingEnabled !== false}
                            onChange={e => updateDiscoveryField('distributedVideoProcessingEnabled', e.target.checked)}
                        />
                        <span>Enable Distributed Video Extraction & Multi-Node Render Offloading (Combines multiple GPUs/CPUs for fast exports)</span>
                    </label>

                    <label className="tactical-checkbox-label">
                        <input
                            type="checkbox"
                            checked={Boolean(discovery.enableVirtualIp)}
                            onChange={e => updateDiscoveryField('enableVirtualIp', e.target.checked)}
                        />
                        <span>Enable Operating System Virtual IP (VIP) Management (Automated acquisition via netsh / ip addr & Gratuitous ARP)</span>
                    </label>

                    <label className="tactical-checkbox-label">
                        <input
                            type="checkbox"
                            checked={Boolean(discovery.preemptLowerPriority)}
                            onChange={e => updateDiscoveryField('preemptLowerPriority', e.target.checked)}
                        />
                        <span>Preempt Lower Priority (Automatically reclaim VIP/Orchestrator if Primary node recovers)</span>
                    </label>
                </div>
            </div>
            {/* STEALTH REPLAY STUDIO & AUTO-DIRECTOR ENGINE CONFIGURATION */}
            {/* Principle of Secrecy (עקרון החשאיות): Feature settings strictly exposed ONLY if server has feature active */}
            {isStealthAuthorized && hasReplayStudioFeature && (
                <div className="security-subpanel stealth-studio-subpanel" style={{ borderColor: 'rgba(6, 182, 212, 0.35)', background: 'rgba(6, 182, 212, 0.03)' }}>
                    <div className="subpanel-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '0.68rem', padding: '2px 6px', borderRadius: '4px', background: '#06B6D4', color: '#0F172A', fontWeight: 800 }}>STEALTH OPS</span>
                            <h4 style={{ margin: 0 }}>AUTO-DIRECTOR & REPLAY STUDIO ENGINE</h4>
                        </div>
                        <span className="subpanel-desc">Configure forensic NLE playback limits, hardware decoder budget, buffer preload hysteresis, and multi-monitor focus tracking.</span>
                    </div>

                    <div className="settings-fields-row" style={{ marginTop: '16px' }}>
                        {/* Max Concurrent Studio Feeds (Hard Capped at 6) */}
                        <div className="settings-field" style={{ flex: '1 1 calc(50% - 10px)' }}>
                            <span>Max Concurrent Studio Playback Streams (Hard Cap: 6)</span>
                            <div className="range-with-input">
                                <div className="slider-input-inline-row">
                                    <input
                                        type="range"
                                        min={1}
                                        max={6}
                                        step={1}
                                        value={Math.max(1, Math.min(6, Number(autoDirector.maxConcurrentScreens) || 6))}
                                        onChange={e => updateAutoDirectorField?.('maxConcurrentScreens', Number(e.target.value))}
                                        className="tactical-range-slider"
                                    />
                                    <input
                                        type="number"
                                        min={1}
                                        max={6}
                                        step={1}
                                        value={Math.max(1, Math.min(6, Number(autoDirector.maxConcurrentScreens) || 6))}
                                        onChange={e => updateAutoDirectorField?.('maxConcurrentScreens', Math.max(1, Math.min(6, Number(e.target.value))))}
                                        required
                                    />
                                </div>

                                <div className="slider-ticks-track">
                                    {studioScreenTicks.map((tick) => {
                                        const THUMB_RADIUS = 12;
                                        const pct = ((tick.val - 1) / (6 - 1)) * 100;
                                        const isCurrent = (Number(autoDirector.maxConcurrentScreens) || 6) === tick.val;
                                        return (
                                            <button
                                                key={tick.val}
                                                type="button"
                                                className={`tick-anchor ${isCurrent ? 'is-active' : ''}`}
                                                style={{ left: `calc(${THUMB_RADIUS}px + (100% - ${THUMB_RADIUS * 2}px) * ${pct / 100})` }}
                                                onClick={() => updateAutoDirectorField?.('maxConcurrentScreens', tick.val)}
                                                title={`Cap at ${tick.label} Screens`}
                                            >
                                                <span className="tick-pip"></span>
                                                <span className="tick-text">{tick.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            <span className="field-note" style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '6px' }}>
                                הגבלת כמות מסכי וידאו מקבילים בהרצה סימולטנית במערכת העריכה (מקסימום 6). מבטיח ביצועים חלקים ללא קריסת Decoders.
                            </span>
                        </div>

                        {/* Buffer Preload Lead-In Duration */}
                        <div className="settings-field" style={{ flex: '1 1 calc(50% - 10px)' }}>
                            <span>Buffer Preload Lead-In (Seconds)</span>
                            <div className="range-with-input">
                                <div className="slider-input-inline-row">
                                    <input
                                        type="range"
                                        min={0.5}
                                        max={5.0}
                                        step={0.5}
                                        value={Math.max(0.5, Math.min(5.0, Number(autoDirector.bufferPreloadSeconds) || 2.0))}
                                        onChange={e => updateAutoDirectorField?.('bufferPreloadSeconds', Number(e.target.value))}
                                        className="tactical-range-slider"
                                    />
                                    <input
                                        type="number"
                                        min={0.5}
                                        max={5.0}
                                        step={0.5}
                                        value={Number(autoDirector.bufferPreloadSeconds) || 2.0}
                                        onChange={e => updateAutoDirectorField?.('bufferPreloadSeconds', Math.max(0.5, Math.min(5.0, Number(e.target.value))))}
                                        required
                                    />
                                </div>

                                <div className="slider-ticks-track">
                                    {preloadTicks.map((tick) => {
                                        const THUMB_RADIUS = 12;
                                        const pct = ((tick.val - 0.5) / (5.0 - 0.5)) * 100;
                                        const isCurrent = Math.abs((Number(autoDirector.bufferPreloadSeconds) || 2.0) - tick.val) < 0.1;
                                        return (
                                            <button
                                                key={tick.val}
                                                type="button"
                                                className={`tick-anchor ${isCurrent ? 'is-active' : ''}`}
                                                style={{ left: `calc(${THUMB_RADIUS}px + (100% - ${THUMB_RADIUS * 2}px) * ${pct / 100})` }}
                                                onClick={() => updateAutoDirectorField?.('bufferPreloadSeconds', tick.val)}
                                                title={`Set ${tick.label}`}
                                            >
                                                <span className="tick-pip"></span>
                                                <span className="tick-text">{tick.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            <span className="field-note" style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '6px' }}>
                                זמן טעינה מוקדם ל-Buffer לפני תחילת השמעה מקבילית. מונע כניסה ל-Buffering לסירוגין ("אורגן Buffer") בהרצה של מספר מסכים.
                            </span>
                        </div>

                        {/* Auto-Director Minimum Screen Dwell Time */}
                        <div className="settings-field" style={{ flex: '1 1 100%', marginTop: '12px' }}>
                            <span>Auto-Director Minimum Screen Dwell Time (Seconds)</span>
                            <div className="range-with-input">
                                <div className="slider-input-inline-row">
                                    <input
                                        type="range"
                                        min={1}
                                        max={60}
                                        step={1}
                                        value={Math.max(1, Math.min(60, Number(autoDirector.minDwellSeconds) || 10))}
                                        onChange={e => updateAutoDirectorField?.('minDwellSeconds', Number(e.target.value))}
                                        className="tactical-range-slider"
                                    />
                                    <input
                                        type="number"
                                        min={1}
                                        max={120}
                                        step={1}
                                        value={autoDirector.minDwellSeconds || 10}
                                        onChange={e => updateAutoDirectorField?.('minDwellSeconds', Number(e.target.value))}
                                        required
                                    />
                                </div>

                                <div className="slider-ticks-track">
                                    {dwellTicks.map((tick) => {
                                        const THUMB_RADIUS = 12;
                                        const pct = ((tick.val - 1) / (60 - 1)) * 100;
                                        const isCurrent = Number(autoDirector.minDwellSeconds || 10) === tick.val;
                                        return (
                                            <button
                                                key={tick.val}
                                                type="button"
                                                className={`tick-anchor ${isCurrent ? 'is-active' : ''}`}
                                                style={{ left: `calc(${THUMB_RADIUS}px + (100% - ${THUMB_RADIUS * 2}px) * ${pct / 100})` }}
                                                onClick={() => updateAutoDirectorField?.('minDwellSeconds', tick.val)}
                                                title={`Set ${tick.label}`}
                                            >
                                                <span className="tick-pip"></span>
                                                <span className="tick-text">{tick.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            <span className="field-note" style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '6px' }}>
                                זמן שהייה מינימלי במסך לפני מעבר לבמאי האוטומטי (ברירת מחדל: 10 שניות). מונע מעברים מהירים ותכופים שמעייפים את העין בסרטוני שחזור וייצוא.
                            </span>
                        </div>

                        {/* Master Auto-Director Toggle */}
                        <div style={{ marginTop: '12px', width: '100%' }}>
                            <label className="tactical-checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={autoDirector.enableAutoDirector !== false}
                                    onChange={e => updateAutoDirectorField?.('enableAutoDirector', e.target.checked)}
                                />
                                <span>Enable Automated Multi-Monitor Camera Tracking in Replay Studio (Auto-Director)</span>
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </fieldset>
    );
}
