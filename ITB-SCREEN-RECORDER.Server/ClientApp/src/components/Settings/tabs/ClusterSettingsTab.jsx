// ==========================================
// File: Client/src/components/Settings/tabs/ClusterSettingsTab.jsx
// ==========================================
import React, { useState, useEffect, useCallback } from 'react';

export default function ClusterSettingsTab({ form, updateDiscoveryField }) {
    const discovery = form?.discovery || {};

    const [clusterStatus, setClusterStatus] = useState(null);
    const [clusterGrid, setClusterGrid] = useState(null);
    const [clusterLoading, setClusterLoading] = useState(false);
    const [clusterActionLoading, setClusterActionLoading] = useState(false);
    const [clusterFeedback, setClusterFeedback] = useState(null);
    const [showAdvancedVip, setShowAdvancedVip] = useState(false);

    // Hardware Sizing Calculator state
    const [calcStations, setCalcStations] = useState(50);
    const [calcJobs, setCalcJobs] = useState(2);
    const [calcMode, setCalcMode] = useState('Active-Active');
    const [calcProfile, setCalcProfile] = useState('Auto');
    const [sizingResult, setSizingResult] = useState(null);
    const [copiedSizing, setCopiedSizing] = useState(false);

    const fetchSizing = useCallback(async (st, jb, md, pr) => {
        try {
            const res = await fetch('/api/v1/cluster/hardware-sizing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    targetStations: st,
                    targetConcurrentJobs: jb,
                    redundancyMode: md,
                    hardwareProfile: pr
                })
            });
            if (res.ok) {
                const data = await res.json();
                setSizingResult(data);
            }
        } catch (err) {
            console.error('[ClusterSettingsTab] Sizing API request failed:', err);
        }
    }, []);

    useEffect(() => {
        fetchSizing(calcStations, calcJobs, calcMode, calcProfile);
    }, [calcStations, calcJobs, calcMode, calcProfile, fetchSizing, clusterGrid]);

    const handleCopySizing = () => {
        if (!sizingResult?.sizingReport) return;
        navigator.clipboard.writeText(sizingResult.sizingReport).then(() => {
            setCopiedSizing(true);
            setTimeout(() => setCopiedSizing(false), 2500);
        });
    };

    const handleApplySizingTargets = () => {
        if (!sizingResult) return;
        const targetStreams = Math.ceil(calcStations / Math.max(1, sizingResult.recommendedActiveNodes));
        const targetJobs = Math.ceil(calcJobs / Math.max(1, sizingResult.recommendedActiveNodes));
        updateDiscoveryField('maxIngestStreamsCapacity', targetStreams);
        updateDiscoveryField('maxConcurrentRenderJobs', targetJobs);
        setClusterFeedback({
            type: 'success',
            message: `Applied recommended capacities to this node: ${targetStreams} Ingest Streams & ${targetJobs} Concurrent NLE Jobs. Click Save Settings to persist.`
        });
    };

    const fetchClusterStatus = useCallback(async () => {
        setClusterLoading(true);
        try {
            const [statusRes, gridRes] = await Promise.allSettled([
                fetch('/api/v1/cluster/status'),
                fetch('/api/v1/cluster/grid')
            ]);

            if (statusRes.status === 'fulfilled' && statusRes.value.ok) {
                const sData = await statusRes.value.json();
                setClusterStatus(sData);
            }
            if (gridRes.status === 'fulfilled' && gridRes.value.ok) {
                const gData = await gridRes.value.json();
                setClusterGrid(gData);
            }
        } catch (err) {
            console.error('[ClusterSettingsTab] Failed fetching cluster topology:', err);
        } finally {
            setClusterLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchClusterStatus();
        const interval = setInterval(fetchClusterStatus, 4000);
        return () => clearInterval(interval);
    }, [fetchClusterStatus]);

    const handleAcquireVip = async () => {
        setClusterActionLoading(true);
        setClusterFeedback(null);
        try {
            const res = await fetch('/api/v1/cluster/acquire-vip', { method: 'POST' });
            const data = await res.json();
            if (res.ok && data.success) {
                setClusterFeedback({ type: 'success', message: data.message || 'VIP acquired and bound successfully.' });
                await fetchClusterStatus();
            } else {
                setClusterFeedback({ type: 'error', message: data.message || 'Failed to acquire Virtual IP.' });
            }
        } catch (err) {
            setClusterFeedback({ type: 'error', message: err.message || 'VIP acquisition request failed.' });
        } finally {
            setClusterActionLoading(false);
        }
    };

    const handleReleaseVip = async () => {
        setClusterActionLoading(true);
        setClusterFeedback(null);
        try {
            const res = await fetch('/api/v1/cluster/release-vip', { method: 'POST' });
            const data = await res.json();
            if (res.ok && data.success) {
                setClusterFeedback({ type: 'success', message: data.message || 'VIP released successfully.' });
                await fetchClusterStatus();
            } else {
                setClusterFeedback({ type: 'error', message: data.message || 'Failed to release Virtual IP.' });
            }
        } catch (err) {
            setClusterFeedback({ type: 'error', message: err.message || 'VIP release request failed.' });
        } finally {
            setClusterActionLoading(false);
        }
    };

    const handleTransferOrchestrator = async (targetNodeId) => {
        if (!window.confirm(`Transfer Orchestrator leadership to node '${targetNodeId}'?`)) {
            return;
        }
        setClusterActionLoading(true);
        setClusterFeedback(null);
        try {
            const res = await fetch('/api/v1/cluster/orchestrator/transfer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetNodeId })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setClusterFeedback({ type: 'success', message: data.message || 'Orchestrator leadership transferred.' });
                await fetchClusterStatus();
            } else {
                setClusterFeedback({ type: 'error', message: data.message || 'Failed to transfer leadership.' });
            }
        } catch (err) {
            setClusterFeedback({ type: 'error', message: err.message || 'Transfer request failed.' });
        } finally {
            setClusterActionLoading(false);
        }
    };

    const handleToggleDrain = async (nodeId, enable) => {
        const actionText = enable ? 'Drain (Enter Maintenance Mode)' : 'Undrain (Resume Active Service)';
        if (!window.confirm(`${actionText} for node '${nodeId}'?`)) return;

        setClusterActionLoading(true);
        setClusterFeedback(null);
        try {
            const res = await fetch(`/api/v1/cluster/nodes/${encodeURIComponent(nodeId)}/drain?enable=${enable}`, {
                method: 'POST'
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setClusterFeedback({ type: 'success', message: data.message || `Node '${nodeId}' state updated.` });
                await fetchClusterStatus();
            } else {
                setClusterFeedback({ type: 'error', message: data.message || `Failed to update node '${nodeId}'.` });
            }
        } catch (err) {
            setClusterFeedback({ type: 'error', message: err.message || 'Drain request failed.' });
        } finally {
            setClusterActionLoading(false);
        }
    };

    const handleRestartNode = async (nodeId) => {
        const isAll = nodeId === 'all';
        const msg = isAll
            ? 'Are you sure you want to RESTART ALL SERVERS across the entire cluster? All active streams will reconnect via watchdog.'
            : `Are you sure you want to RESTART the Screen Recorder server service on node '${nodeId}'?`;

        if (!window.confirm(msg)) return;

        setClusterActionLoading(true);
        setClusterFeedback(null);
        try {
            const res = await fetch(`/api/v1/cluster/nodes/${encodeURIComponent(nodeId)}/restart`, {
                method: 'POST'
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setClusterFeedback({ type: 'success', message: data.message || `Restart initiated for '${nodeId}'.` });
                setTimeout(fetchClusterStatus, 2500);
            } else {
                setClusterFeedback({ type: 'error', message: data.message || `Failed restarting node '${nodeId}'.` });
            }
        } catch (err) {
            setClusterFeedback({ type: 'error', message: err.message || 'Restart request failed.' });
        } finally {
            setClusterActionLoading(false);
        }
    };

    const [editingNodeCapacities, setEditingNodeCapacities] = useState(null);
    const [nodeCapStreams, setNodeCapStreams] = useState(50);
    const [nodeCapJobs, setNodeCapJobs] = useState(2);
    const [nodeCapMode, setNodeCapMode] = useState('Active');

    const handleOpenEditCapacities = (node) => {
        setEditingNodeCapacities(node);
        setNodeCapStreams(node.maxStreamsCapacity || 50);
        setNodeCapJobs(node.maxConcurrentJobs || 2);
        setNodeCapMode(node.nodeMode || 'Active');
    };

    const handleSaveNodeCapacities = async (e) => {
        e.preventDefault();
        if (!editingNodeCapacities) return;
        setClusterActionLoading(true);
        setClusterFeedback(null);
        try {
            const res = await fetch(`/api/v1/cluster/nodes/${encodeURIComponent(editingNodeCapacities.nodeId)}/capacities`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    maxStreamsCapacity: Number(nodeCapStreams),
                    maxConcurrentJobs: Number(nodeCapJobs),
                    nodeMode: nodeCapMode
                })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setClusterFeedback({ type: 'success', message: data.message || `Capacities updated for '${editingNodeCapacities.nodeId}'.` });
                setEditingNodeCapacities(null);
                await fetchClusterStatus();
            } else {
                setClusterFeedback({ type: 'error', message: data.message || 'Failed to update capacities.' });
            }
        } catch (err) {
            setClusterFeedback({ type: 'error', message: err.message || 'Capacities update failed.' });
        } finally {
            setClusterActionLoading(false);
        }
    };

    // Range Sliders Scale Tick Marks
    const streamCapacityTicks = [
        { val: 10, label: '10' },
        { val: 25, label: '25' },
        { val: 50, label: '50' },
        { val: 100, label: '100' },
        { val: 200, label: '200' }
    ];

    const jobCapacityTicks = [
        { val: 1, label: '1' },
        { val: 2, label: '2 (Def)' },
        { val: 4, label: '4' },
        { val: 8, label: '8' },
        { val: 16, label: '16' }
    ];

    const priorityTicks = [
        { val: 10, label: '10' },
        { val: 30, label: '30' },
        { val: 50, label: '50 (Def)' },
        { val: 80, label: '80' },
        { val: 100, label: '100 (Max)' }
    ];

    const heartbeatTicks = [
        { val: 1, label: '1s' },
        { val: 2, label: '2s (Def)' },
        { val: 5, label: '5s' },
        { val: 10, label: '10s' },
        { val: 30, label: '30s' }
    ];

    const sizingStationTicks = [
        { val: 10, label: '10' },
        { val: 25, label: '25' },
        { val: 50, label: '50' },
        { val: 70, label: '70' },
        { val: 100, label: '100' },
        { val: 150, label: '150' },
        { val: 200, label: '200' }
    ];

    const sizingJobTicks = [
        { val: 1, label: '1' },
        { val: 2, label: '2' },
        { val: 4, label: '4' },
        { val: 6, label: '6' },
        { val: 8, label: '8' },
        { val: 10, label: '10' }
    ];

    const renderSliderWithTicks = (value, min, max, step, onChange, ticks) => (
        <div className="range-with-input">
            <div className="slider-input-inline-row">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={Math.max(min, Math.min(max, Number(value) || min))}
                    onChange={e => onChange(Number(e.target.value))}
                    className="tactical-range-slider"
                />
                <input
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={e => onChange(Number(e.target.value))}
                    required
                />
            </div>

            <div className="slider-ticks-track">
                {ticks.map((tick) => {
                    const THUMB_RADIUS = 12;
                    const pct = ((tick.val - min) / (max - min)) * 100;
                    const isCurrent = Number(value) === tick.val;
                    return (
                        <button
                            key={tick.val}
                            type="button"
                            className={`tick-anchor ${isCurrent ? 'is-active' : ''}`}
                            style={{ left: `calc(${THUMB_RADIUS}px + (100% - ${THUMB_RADIUS * 2}px) * ${pct / 100})` }}
                            onClick={() => onChange(tick.val)}
                            title={`Set ${tick.label}`}
                        >
                            <span className="tick-pip"></span>
                            <span className="tick-text">{tick.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );

    const streamsUtilizationPct = clusterGrid && clusterGrid.totalStreamsCapacity > 0
        ? Math.round((clusterGrid.totalIngestedStreams / clusterGrid.totalStreamsCapacity) * 100)
        : 0;

    const jobsUtilizationPct = clusterGrid && clusterGrid.totalConcurrentJobsCapacity > 0
        ? Math.round((clusterGrid.totalActiveRenderJobs / clusterGrid.totalConcurrentJobsCapacity) * 100)
        : 0;

    return (
        <fieldset className="settings-fieldset cluster-settings-fieldset">
            <legend>Distributed Server Cluster &amp; Nodes</legend>

            {/* TOP SUBPANEL: CLUSTER STATUS & KPI SUMMARY */}
            <div className="security-subpanel">
                <div className="subpanel-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '4px', background: '#06B6D4', color: '#0F172A', fontWeight: 900 }}>
                                {discovery.role === 'Active-Standby' ? 'HA ACTIVE-STANDBY' : (discovery.role === 'Standalone' ? 'STANDALONE' : 'ACTIVE-ACTIVE GRID')}
                            </span>
                            <h4 style={{ margin: 0 }}>CLUSTER TOPOLOGY &amp; VIRTUAL IP (VIP)</h4>
                        </div>
                        <span className="subpanel-desc">
                            Federate heterogeneous recording servers (Windows &amp; Linux) into a unified cluster, balance stream ingestion and NLE video processing based on hardware capability, with automated VIP failover.
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                            type="button"
                            onClick={fetchClusterStatus}
                            className="btn-refresh-telemetry"
                            disabled={clusterLoading}
                            title="Verify and refresh cluster state now"
                            style={{ height: '32px', padding: '0 12px' }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}>
                                <path d="M23 4v6h-6M1 20v-6h6" />
                                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                            </svg>
                            <span>{clusterLoading ? 'Refreshing...' : 'Refresh Cluster'}</span>
                        </button>
                    </div>
                </div>

                {/* Cluster KPI Summary Cards */}
                {clusterGrid && (
                    <div className="cluster-kpi-grid">
                        {/* KPI 1: Active Nodes */}
                        <div className="cluster-kpi-card">
                            <span className="kpi-title">Active Cluster Nodes</span>
                            <div className="kpi-metric-row">
                                <span className="kpi-main-val" style={{ color: '#38BDF8' }}>
                                    {clusterGrid.onlineNodesCount}
                                </span>
                                <span className="kpi-sub-val">/ {clusterGrid.totalNodes} Nodes</span>
                            </div>
                            <span className="kpi-note" style={{ color: '#10B981' }}>
                                👑 Orchestrator: {clusterGrid.orchestratorNodeId || 'Electing...'}
                            </span>
                        </div>

                        {/* KPI 2: Streams Ingestion Load */}
                        <div className="cluster-kpi-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className="kpi-title">Stream Ingestion Load</span>
                                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: streamsUtilizationPct > 75 ? '#F43F5E' : '#34D399' }}>
                                    {streamsUtilizationPct}%
                                </span>
                            </div>
                            <div className="kpi-metric-row">
                                <span className="kpi-main-val">
                                    {clusterGrid.totalIngestedStreams}
                                </span>
                                <span className="kpi-sub-val">/ {clusterGrid.totalStreamsCapacity} Channels</span>
                            </div>
                            <div style={{ width: '100%', height: '5px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden', marginTop: '2px' }}>
                                <div style={{
                                    width: `${Math.min(100, Math.max(3, streamsUtilizationPct))}%`,
                                    height: '100%',
                                    background: streamsUtilizationPct > 75 ? '#F43F5E' : '#10B981'
                                }} />
                            </div>
                        </div>

                        {/* KPI 3: Video Render Jobs */}
                        <div className="cluster-kpi-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className="kpi-title">Video Render Jobs (NLE)</span>
                                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#F472B6' }}>
                                    {jobsUtilizationPct}%
                                </span>
                            </div>
                            <div className="kpi-metric-row">
                                <span className="kpi-main-val">
                                    {clusterGrid.totalActiveRenderJobs}
                                </span>
                                <span className="kpi-sub-val">/ {clusterGrid.totalConcurrentJobsCapacity} Concurrent Jobs</span>
                            </div>
                            <div style={{ width: '100%', height: '5px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden', marginTop: '2px' }}>
                                <div style={{
                                    width: `${Math.min(100, Math.max(3, jobsUtilizationPct))}%`,
                                    height: '100%',
                                    background: jobsUtilizationPct > 80 ? '#F43F5E' : '#F472B6'
                                }} />
                            </div>
                        </div>

                        {/* KPI 4: Virtual IP Status */}
                        <div className="cluster-kpi-card">
                            <span className="kpi-title">Virtual IP (VIP) Status</span>
                            <div className="kpi-metric-row">
                                <span className="kpi-main-val" style={{ fontSize: '1.05rem', color: clusterStatus?.isVirtualIpBound ? '#34D399' : '#FDE047' }}>
                                    {discovery.virtualIp || 'Not Configured'}
                                </span>
                            </div>
                            <span className="kpi-note" style={{ color: clusterStatus?.isVirtualIpBound ? '#10B981' : '#94A3B8' }}>
                                ● {clusterStatus?.isVirtualIpBound ? 'Acquired & Bound Locally' : (discovery.enableVirtualIp ? 'Managed by Peer / Standby' : 'Disabled')}
                            </span>
                        </div>
                    </div>
                )}

                {/* Local Node Identity & Live VIP Actions Banner */}
                {clusterStatus && (
                    <div className="cluster-identity-banner" style={{ marginTop: '10px' }}>
                        <div className="identity-info">
                            <span className="node-id-label">Local Node:</span>
                            <span className="node-id-val">{clusterStatus.localNodeId}</span>

                            <span className={`node-badge ${clusterStatus.state === 'Active' ? 'active' : 'standby'}`}>
                                ● {clusterStatus.state} ({clusterStatus.nodeRole})
                            </span>

                            {clusterStatus.enableVirtualIp && clusterStatus.virtualIp && (
                                <span className={`vip-state-pill ${clusterStatus.isVipBoundLocally ? 'bound' : 'unbound'}`}>
                                    VIP {clusterStatus.virtualIp}: {clusterStatus.isVipBoundLocally ? 'Bound Locally' : 'Standby'}
                                </span>
                            )}
                        </div>

                        {/* VIP Promotion / Demotion Action Buttons */}
                        <div className="identity-actions">
                            {clusterStatus.enableVirtualIp && !clusterStatus.isVipBoundLocally && (
                                <button
                                    type="button"
                                    onClick={handleAcquireVip}
                                    disabled={clusterActionLoading}
                                    className="btn-vip-action acquire"
                                    title="Acquire and bind Virtual IP to this host"
                                >
                                    Acquire VIP (Assume Primary)
                                </button>
                            )}
                            {clusterStatus.enableVirtualIp && clusterStatus.isVipBoundLocally && (
                                <button
                                    type="button"
                                    onClick={handleReleaseVip}
                                    disabled={clusterActionLoading}
                                    className="btn-vip-action release"
                                    title="Release Virtual IP from this host"
                                >
                                    Release VIP (Cede Primary)
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {clusterFeedback && (
                    <div style={{
                        marginTop: '10px',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        background: clusterFeedback.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                        color: clusterFeedback.type === 'success' ? '#34D399' : '#FDA4AF',
                        border: `1px solid ${clusterFeedback.type === 'success' ? '#10B981' : '#F43F5E'}`
                    }}>
                        {clusterFeedback.message}
                    </div>
                )}
            </div>

            {/* PARTICIPATING NODES BLADE GRID */}
            {discovery.role !== 'Standalone' && clusterGrid && (
                <div className="security-subpanel">
                    <div className="subpanel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '4px', background: '#06B6D4', color: '#0F172A', fontWeight: 900 }}>
                                    COMPUTE GRID
                                </span>
                                <h4 style={{ margin: 0 }}>PARTICIPATING NODES &amp; HARDWARE HORSEPOWER</h4>
                            </div>
                            <span className="subpanel-desc">
                                Live node telemetry, cross-platform operating system, hardware horsepower rating (PWR), stream load, and compute fitness.
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <button
                                type="button"
                                onClick={() => handleRestartNode('all')}
                                disabled={clusterActionLoading}
                                className="btn-restart-cluster"
                                title="Safely trigger server service restart across the entire cluster"
                            >
                                🔄 Restart All Cluster Nodes
                            </button>
                            <span style={{ fontSize: '0.72rem', color: '#34D399', fontWeight: 700 }}>
                                📡 Autonomous Peer Discovery Active on LAN (Group: {discovery.clusterGroup || 'Production'})
                            </span>
                        </div>
                    </div>

                    <div className="cluster-nodes-grid">
                        {clusterGrid.nodes?.map(node => {
                            const isStandbyNode = node.nodeMode === 'Standby' || node.role === 'Secondary';
                            const isOverloaded = node.isOverloaded || node.hostCpuPct >= 75.0;
                            const isLinux = node.osPlatform === 'Linux' || (node.osDescription && node.osDescription.toLowerCase().includes('linux'));

                            let nodeClass = 'worker';
                            if (!node.isOnline) nodeClass = 'offline';
                            else if (node.isDraining) nodeClass = 'draining';
                            else if (node.isOrchestrator) nodeClass = 'orchestrator';
                            else if (isStandbyNode) nodeClass = 'standby';

                            return (
                                <div key={node.nodeId} className={`cluster-node-blade ${nodeClass}`}>
                                    {/* Top Line: Name + Badges */}
                                    <div className="blade-top-row">
                                        <div className="node-title-group">
                                            <span className="node-name">
                                                {node.displayName || node.nodeId}
                                            </span>
                                            {node.nodeId === clusterGrid.localNodeId && (
                                                <span className="local-node-pill">
                                                    LOCAL
                                                </span>
                                            )}
                                            {/* Cross-Platform OS Badge */}
                                            <span className={`os-platform-badge ${isLinux ? 'linux' : 'windows'}`}>
                                                {isLinux ? '🐧 Linux' : '🪟 Windows'}
                                            </span>
                                        </div>

                                        <div className="node-status-badges">
                                            {node.isDraining ? (
                                                <span className="role-badge draining-badge" style={{
                                                    background: 'rgba(245, 158, 11, 0.25)',
                                                    color: '#FCD34D',
                                                    border: '1px solid rgba(245, 158, 11, 0.4)'
                                                }}>
                                                    ⚠️ DRAINING
                                                </span>
                                            ) : (
                                                <span className="role-badge" style={{
                                                    background: isStandbyNode ? 'rgba(234, 179, 8, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                                                    color: isStandbyNode ? '#FDE047' : '#34D399'
                                                }}>
                                                    {isStandbyNode ? 'STANDBY' : 'ACTIVE'}
                                                </span>
                                            )}
                                            <span className="role-badge" style={{
                                                background: node.isOrchestrator ? 'rgba(245, 158, 11, 0.25)' : 'rgba(6, 182, 212, 0.2)',
                                                color: node.isOrchestrator ? '#FCD34D' : '#38BDF8'
                                            }}>
                                                {node.isOrchestrator ? '👑 ORCHESTRATOR' : '⚡ WORKER'}
                                            </span>
                                            <span className="online-indicator" style={{
                                                color: node.isOnline ? '#10B981' : '#F43F5E'
                                            }}>
                                                ● {node.isOnline ? 'ONLINE' : 'DOWN'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Hardware Spec & Power Index */}
                                    <div className="hardware-spec-strip">
                                        <span className="spec-text">
                                            {node.gpuModel && node.gpuModel !== 'CPU Software' ? `🎮 ${node.gpuModel}` : `💻 ${node.cpuCores || 4}C / ${Math.round(node.totalRamGb || 8)}GB`} • {node.encoderType || 'libx264'}
                                        </span>
                                        <span className="pwr-rating-pill" style={{
                                            background: (node.hardwareCapabilityScore || 200) >= 600 ? 'rgba(16, 185, 129, 0.25)' : ((node.hardwareCapabilityScore || 200) >= 300 ? 'rgba(6, 182, 212, 0.25)' : 'rgba(148, 163, 184, 0.2)'),
                                            color: (node.hardwareCapabilityScore || 200) >= 600 ? '#34D399' : ((node.hardwareCapabilityScore || 200) >= 300 ? '#38BDF8' : '#CBD5E1')
                                        }}>
                                            ⚡ PWR {node.hardwareCapabilityScore || 200}
                                        </span>
                                    </div>

                                    {/* Streams & Jobs Capacity */}
                                    <div className="blade-metrics-row">
                                        <span>IP: <strong style={{ color: '#38BDF8', fontFamily: 'monospace' }}>{node.localIps?.[0] || 'Auto'}</strong></span>
                                        <span>Streams: <strong style={{ color: '#F8FAFC' }}>{node.activeStreamsCount} / {node.maxStreamsCapacity}</strong></span>
                                        <span>NLE Jobs: <strong style={{ color: '#F8FAFC' }}>{node.activeJobsCount} / {node.maxConcurrentJobs}</strong></span>
                                    </div>
                                    {node.recommendedStreamsCapacity > 0 && (
                                        <div style={{ fontSize: '0.67rem', color: '#94A3B8', display: 'flex', justifyContent: 'space-between', padding: '1px 0' }}>
                                            <span>Hardware Baseline:</span>
                                            <span style={{ color: '#38BDF8', fontFamily: 'monospace', fontWeight: 700 }}>
                                                ⚡ {node.recommendedStreamsCapacity} Str • {node.recommendedConcurrentJobs} Jobs
                                            </span>
                                        </div>
                                    )}

                                    {/* CPU & GPU Telemetry */}
                                    <div className="blade-metrics-row" style={{ fontSize: '0.7rem' }}>
                                        <span>CPU: <strong style={{ color: isOverloaded ? '#F43F5E' : '#34D399' }}>{Math.round(node.hostCpuPct || 0)}%</strong></span>
                                        <span>GPU: <strong style={{ color: '#38BDF8' }}>{Math.round(node.gpuNvencPct || 0)}%</strong></span>
                                        <span>Priority: <strong style={{ color: '#E2E8F0' }}>{node.priority}</strong></span>
                                    </div>

                                    {/* Ingest Pressure & Overload Guard Bar */}
                                    <div className="pressure-meter-block">
                                        <div className="meter-header">
                                            <span>
                                                Ingest Pressure: <strong style={{ color: isOverloaded ? '#F43F5E' : '#38BDF8' }}>
                                                    {Math.round(node.ingestPressureScore || 0)} pts
                                                </strong>
                                                {isOverloaded && (
                                                    <span style={{ color: '#F43F5E', fontWeight: 800, marginLeft: '4px' }}>[THROTTLED - OVERLOAD GUARD]</span>
                                                )}
                                            </span>
                                            <span>
                                                Compute Fitness: <strong style={{ color: (node.computeFitnessScore || 0) > 0 ? '#34D399' : '#64748B' }}>
                                                    {(node.computeFitnessScore || 0) > 0 ? Math.round(node.computeFitnessScore) : 'Standby'}
                                                </strong>
                                            </span>
                                        </div>
                                        <div className="meter-track">
                                            <div
                                                className="meter-fill"
                                                style={{
                                                    width: `${Math.min(100, Math.max(4, Math.round(node.ingestPressureScore || 0)))}%`,
                                                    background: isOverloaded ? '#F43F5E' : ((node.ingestPressureScore || 0) > 50 ? '#F59E0B' : '#10B981')
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Centralized Node Command & Control Toolbar */}
                                    <div className="node-command-toolbar">
                                        {clusterGrid.isLocalNodeOrchestrator && !node.isOrchestrator && node.isOnline && !node.isDraining && (
                                            <button
                                                type="button"
                                                onClick={() => handleTransferOrchestrator(node.nodeId)}
                                                disabled={clusterActionLoading}
                                                className="btn-transfer-leader"
                                                title="Promote this node to Cluster Orchestrator"
                                            >
                                                👑 Promote Leader
                                            </button>
                                        )}

                                        {node.isOnline && (
                                            <button
                                                type="button"
                                                onClick={() => handleToggleDrain(node.nodeId, !node.isDraining)}
                                                disabled={clusterActionLoading}
                                                className={`btn-node-action ${node.isDraining ? 'btn-undrain' : 'btn-drain'}`}
                                                title={node.isDraining ? "Resume active service on this node" : "Drain node: stop routing new streams/jobs for maintenance"}
                                            >
                                                {node.isDraining ? '✅ Resume' : '🛑 Drain'}
                                            </button>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() => handleOpenEditCapacities(node)}
                                            disabled={clusterActionLoading}
                                            className="btn-node-action btn-tune-cap"
                                            title="Edit stream and transcode capacity limits"
                                        >
                                            ⚙️ Limits
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleRestartNode(node.nodeId)}
                                            disabled={clusterActionLoading}
                                            className="btn-node-action btn-restart-node"
                                            title="Restart Screen Recorder service on this node"
                                        >
                                            🔄 Restart
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* HARDWARE SIZING & CAPACITY REQUIREMENTS CALCULATOR */}
            <div className="sizing-calculator-subpanel">
                <div className="calculator-header-strip">
                    <div className="header-left">
                        <span className="calculator-pill">SIZING &amp; CAPACITY PLANNER</span>
                        <h4>HARDWARE REQUIREMENTS &amp; FLEET SIZING CALCULATOR</h4>
                    </div>
                    <div className="calculator-actions">
                        {sizingResult && (
                            <>
                                <button
                                    type="button"
                                    className="btn-calc-action btn-copy"
                                    onClick={handleCopySizing}
                                    title="Copy complete hardware specification for RFPs and procurement"
                                >
                                    {copiedSizing ? '✓ SPECIFICATION COPIED' : '📋 COPY HARDWARE SPEC'}
                                </button>
                                <button
                                    type="button"
                                    className="btn-calc-action btn-apply-targets"
                                    onClick={handleApplySizingTargets}
                                    title="Apply recommended per-node targets to this node's settings below"
                                >
                                    ⚡ APPLY RECOMMENDED TARGETS
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="calculator-inputs-grid">
                    <div className="settings-field">
                        <span>Target Workstations (Streams)</span>
                        {renderSliderWithTicks(
                            calcStations,
                            10,
                            200,
                            5,
                            val => setCalcStations(val),
                            sizingStationTicks
                        )}
                        <span className="field-note">Active workstations continuously capturing &amp; streaming video.</span>
                    </div>

                    <div className="settings-field">
                        <span>Concurrent NLE Export Cuts</span>
                        {renderSliderWithTicks(
                            calcJobs,
                            1,
                            10,
                            1,
                            val => setCalcJobs(val),
                            sizingJobTicks
                        )}
                        <span className="field-note">Simultaneous forensic multi-station video timeline exports.</span>
                    </div>

                    <div className="settings-field">
                        <span>Redundancy Architecture</span>
                        <select
                            className="tactical-select"
                            value={calcMode}
                            onChange={e => setCalcMode(e.target.value)}
                        >
                            <option value="Active-Active">Active-Active (Distributed Compute Grid)</option>
                            <option value="Active-Standby">Active-Standby (N+1 Full Redundancy)</option>
                            <option value="Standalone">Standalone (Single Host Non-Clustered)</option>
                        </select>
                        <span className="field-note">Topology distribution for compute and network failover.</span>
                    </div>

                    <div className="settings-field">
                        <span>Hardware / GPU Profile</span>
                        <select
                            className="tactical-select"
                            value={calcProfile}
                            onChange={e => setCalcProfile(e.target.value)}
                        >
                            <option value="Auto">Auto (Auto-Detect Current Hardware)</option>
                            <option value="NVENC">NVIDIA NVENC (Dedicated GPU - High Density)</option>
                            <option value="QSV">Intel QuickSync QSV (Integrated Graphics)</option>
                            <option value="Software">CPU Software (libx264 Software Only)</option>
                        </select>
                        <span className="field-note">Encoder tier to size compute power and memory requirements.</span>
                    </div>
                </div>

                {sizingResult && (
                    <div className="sizing-results-card">
                        <div className={`readiness-banner ${sizingResult.evaluationStatus?.toLowerCase() || 'ready'}`}>
                            <span>
                                {sizingResult.evaluationStatus === 'Ready' && '🟢 [FLEET QUALIFIED] '}
                                {sizingResult.evaluationStatus === 'Warning' && '🟡 [CAPACITY WARNING] '}
                                {sizingResult.evaluationStatus === 'Deficit' && '🔴 [HARDWARE DEFICIT] '}
                                {sizingResult.evaluationSummary}
                            </span>
                        </div>

                        <div className="specs-matrix">
                            <div className="spec-box">
                                <span className="spec-lbl">Recommended Nodes</span>
                                <span className="spec-val">
                                    {sizingResult.recommendedNodeCount} Nodes
                                </span>
                                <span className="spec-sub">
                                    {sizingResult.recommendedActiveNodes} Active
                                    {sizingResult.recommendedStandbyNodes > 0 ? ` + ${sizingResult.recommendedStandbyNodes} Standby` : ' Grid'}
                                </span>
                            </div>

                            <div className="spec-box">
                                <span className="spec-lbl">Min CPU Cores</span>
                                <span className="spec-val">{sizingResult.minCpuCoresPerNode} Cores</span>
                                <span className="spec-sub">{sizingResult.minCpuCoresPerNode * 2} vCPUs @ 3.0GHz+</span>
                            </div>

                            <div className="spec-box">
                                <span className="spec-lbl">Min System RAM</span>
                                <span className="spec-val">{sizingResult.minRamGbPerNode} GB</span>
                                <span className="spec-sub">DDR4 / DDR5 ECC</span>
                            </div>

                            <div className="spec-box">
                                <span className="spec-lbl">GPU / Encoder Tier</span>
                                <span className="spec-val" style={{ fontSize: '0.82rem' }}>
                                    {sizingResult.recommendedGpuTier?.split('(')[0]?.trim() || 'NVIDIA NVENC'}
                                </span>
                                <span className="spec-sub">Hardware Offload</span>
                            </div>
                        </div>

                        <div className="infra-requirements-row">
                            <div className="infra-item">
                                <strong>Network Throughput:</strong>
                                <span>{sizingResult.recommendedNetworkCard} • Min Bandwidth: {sizingResult.minNetworkSpeedMbps >= 10000 ? '10 Gbps SFP+' : '1 Gbps LAN'}</span>
                            </div>
                            <div className="infra-item">
                                <strong>Storage Sustained I/O:</strong>
                                <span>{sizingResult.storageRequirementsText} (Write Rate: {sizingResult.storageWriteRateMBps} MB/s)</span>
                            </div>
                            <div className="infra-item">
                                <strong>Workload Distribution:</strong>
                                <span>~{Math.ceil(calcStations / Math.max(1, sizingResult.recommendedActiveNodes))} Stations &amp; ~{Math.ceil(calcJobs / Math.max(1, sizingResult.recommendedActiveNodes))} NLE Cuts per active node</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* PRIMARY CLUSTER CONFIGURATION SETTINGS */}
            <div className="security-subpanel">
                <div className="subpanel-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '4px', background: '#06B6D4', color: '#0F172A', fontWeight: 900 }}>
                            TOPOLOGY
                        </span>
                        <h4 style={{ margin: 0 }}>CLUSTER DEPLOYMENT MODE &amp; NODE IDENTITY</h4>
                    </div>
                    <span className="subpanel-desc">
                        Configure cluster clustering model, local node operational role, and discovery group.
                    </span>
                </div>

                <div className="settings-fields-row">
                    <div className="settings-field">
                        <span>Cluster Deployment Mode</span>
                        <select
                            value={discovery.role || 'Active-Active'}
                            onChange={e => updateDiscoveryField('role', e.target.value)}
                            className="tactical-select"
                        >
                            <option value="Active-Active">Active-Active (Distributed Compute Grid - Load Balancing &amp; Offloading)</option>
                            <option value="Active-Standby">Active-Standby (High Availability Failover - Primary &amp; Hot Backup)</option>
                            <option value="Standalone">Standalone (Single Server - No Clustering)</option>
                        </select>
                        <span className="field-note">
                            Defines whether this server operates within an autonomous cluster or as a standalone station.
                        </span>
                    </div>

                    {discovery.role !== 'Standalone' && (
                        <>
                            <div className="settings-field">
                                <span>Node Operating Mode</span>
                                <select
                                    value={discovery.nodeMode || (discovery.nodeRole === 'Secondary' ? 'Standby' : 'Active')}
                                    onChange={e => {
                                        const mode = e.target.value;
                                        updateDiscoveryField('nodeMode', mode);
                                        updateDiscoveryField('nodeRole', mode === 'Standby' ? 'Secondary' : 'Primary');
                                    }}
                                    className="tactical-select"
                                >
                                    <option value="Active">🟢 Active Node (Ingests streams, records, and processes video)</option>
                                    <option value="Standby">🟡 Standby Node (Hot backup reserve - takes over upon peer failure)</option>
                                </select>
                                <span className="field-note">
                                    Hybrid topology: active nodes balance workloads dynamically while standby nodes remain in reserve.
                                </span>
                            </div>

                            <div className="settings-field">
                                <span>Cluster Group Name</span>
                                <input
                                    type="text"
                                    placeholder="Production"
                                    value={discovery.clusterGroup || 'Production'}
                                    onChange={e => updateDiscoveryField('clusterGroup', e.target.value)}
                                />
                                <span className="field-note">
                                    Servers on the LAN configured with the same group name will auto-discover and federate automatically.
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* CAPACITY LIMITS, BALANCING & SAFETY CEILINGS */}
            {discovery.role !== 'Standalone' && (
                <div className="security-subpanel">
                    <div className="subpanel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '4px', background: '#06B6D4', color: '#0F172A', fontWeight: 900 }}>
                                BALANCING
                            </span>
                            <h4 style={{ margin: 0 }}>CAPACITY LIMITS, BALANCING &amp; OVERLOAD CEILINGS</h4>
                        </div>
                        <span className="subpanel-desc">
                            Safety Ceiling: Nodes exceeding 75% CPU are throttled from taking new ingest streams
                        </span>
                    </div>

                    <div className="settings-fields-row">
                        <div className="settings-field">
                            <span>Target Ingest Streams Capacity</span>
                            {renderSliderWithTicks(
                                discovery.maxIngestStreamsCapacity ?? 50,
                                10,
                                200,
                                5,
                                val => updateDiscoveryField('maxIngestStreamsCapacity', val),
                                streamCapacityTicks
                            )}
                            <span className="field-note">Target concurrent live streams for this node.</span>
                        </div>

                        <div className="settings-field">
                            <span>Max Concurrent Video Render Jobs</span>
                            {renderSliderWithTicks(
                                discovery.maxConcurrentRenderJobs ?? 2,
                                1,
                                16,
                                1,
                                val => updateDiscoveryField('maxConcurrentRenderJobs', val),
                                jobCapacityTicks
                            )}
                            <span className="field-note">Maximum concurrent NLE export jobs before dispatching to idle peers.</span>
                        </div>
                    </div>

                    <div className="settings-fields-row" style={{ marginTop: '8px' }}>
                        <div className="settings-field">
                            <span>Election Priority (1-100)</span>
                            {renderSliderWithTicks(
                                discovery.priority ?? 50,
                                1,
                                100,
                                1,
                                val => updateDiscoveryField('priority', val),
                                priorityTicks
                            )}
                            <span className="field-note">Higher priority node assumes Orchestrator leadership on failover.</span>
                        </div>

                        <div className="settings-field">
                            <span>Heartbeat Interval (Sec)</span>
                            {renderSliderWithTicks(
                                discovery.heartbeatIntervalSeconds ?? 2,
                                1,
                                30,
                                1,
                                val => updateDiscoveryField('heartbeatIntervalSeconds', val),
                                heartbeatTicks
                            )}
                            <span className="field-note">Broadcast beacon interval in seconds over UDP.</span>
                        </div>
                    </div>

                    <div className="settings-fields-row" style={{ marginTop: '14px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <label className="tactical-checkbox-label">
                            <input
                                type="checkbox"
                                checked={discovery.autoBalanceStreams !== false}
                                onChange={e => updateDiscoveryField('autoBalanceStreams', e.target.checked)}
                            />
                            <span>Auto-balance incoming agent streams across cluster nodes</span>
                        </label>

                        <label className="tactical-checkbox-label">
                            <input
                                type="checkbox"
                                checked={discovery.distributedVideoProcessingEnabled !== false}
                                onChange={e => updateDiscoveryField('distributedVideoProcessingEnabled', e.target.checked)}
                            />
                            <span>Offload NLE video render jobs to idle cluster peers</span>
                        </label>

                        <label className="tactical-checkbox-label">
                            <input
                                type="checkbox"
                                checked={discovery.autoPeerDiscovery !== false}
                                onChange={e => updateDiscoveryField('autoPeerDiscovery', e.target.checked)}
                            />
                            <span>Autonomous peer discovery via UDP Multicast (239.210.1.5)</span>
                        </label>
                    </div>
                </div>
            )}

            {/* VIRTUAL IP (VIP) & NETWORKING ADVANCED CONTROLS */}
            {discovery.role !== 'Standalone' && (
                <div className="security-subpanel">
                    <div className="subpanel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '4px', background: '#EAB308', color: '#0F172A', fontWeight: 900 }}>
                                FAILOVER VIP
                            </span>
                            <h4 style={{ margin: 0, color: '#FDE047' }}>
                                VIRTUAL IP (VIP) &amp; NETWORK REDUNDANCY
                            </h4>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowAdvancedVip(prev => !prev)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#94A3B8',
                                fontSize: '0.74rem',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            {showAdvancedVip ? 'Hide Detailed VIP Parameters' : 'Show Detailed VIP Parameters'}
                        </button>
                    </div>

                    <div className="settings-fields-row" style={{ marginTop: '4px' }}>
                        <label className="tactical-checkbox-label">
                            <input
                                type="checkbox"
                                checked={Boolean(discovery.enableVirtualIp)}
                                onChange={e => updateDiscoveryField('enableVirtualIp', e.target.checked)}
                            />
                            <span>Enable Shared Virtual IP (VIP Failover)</span>
                        </label>
                    </div>

                    {(discovery.enableVirtualIp || showAdvancedVip) && (
                        <div className="settings-fields-row" style={{ marginTop: '10px' }}>
                            <div className="settings-field">
                                <span>Virtual IP Address (IPv4)</span>
                                <input
                                    type="text"
                                    placeholder="e.g. 192.168.1.200"
                                    value={discovery.virtualIp || ''}
                                    onChange={e => updateDiscoveryField('virtualIp', e.target.value)}
                                />
                                <span className="field-note">
                                    Shared Virtual IP accessed by capture agents and NOC operators.
                                </span>
                            </div>

                            <div className="settings-field">
                                <span>Subnet Mask</span>
                                <input
                                    type="text"
                                    placeholder="255.255.255.0"
                                    value={discovery.virtualIpSubnetMask || '255.255.255.0'}
                                    onChange={e => updateDiscoveryField('virtualIpSubnetMask', e.target.value)}
                                />
                            </div>

                            <div className="settings-field">
                                <span>Network Interface Name</span>
                                <input
                                    type="text"
                                    placeholder="Auto (Leave empty for auto-detection)"
                                    value={discovery.networkInterfaceName || ''}
                                    onChange={e => updateDiscoveryField('networkInterfaceName', e.target.value)}
                                />
                                <span className="field-note">
                                    e.g. Ethernet or ens18 / eth0. Default: auto-detected from active interface with gateway.
                                </span>
                            </div>
                        </div>
                    )}

                    {showAdvancedVip && (
                        <div className="settings-fields-row" style={{ marginTop: '10px' }}>
                            <div className="settings-field" style={{ flex: '1 1 100%' }}>
                                <span>Manual Seed Peer URLs — For subnets where UDP Multicast is disabled</span>
                                <input
                                    type="text"
                                    placeholder="http://192.168.1.101:5090, http://192.168.1.102:5090"
                                    value={Array.isArray(discovery.clusterPeerUrls) ? discovery.clusterPeerUrls.join(', ') : (discovery.clusterPeerUrls || '')}
                                    onChange={e => updateDiscoveryField('clusterPeerUrls', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                                />
                                <span className="field-note">
                                    Comma-separated list of peer server base URLs.
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Node Capacity Tuning Modal */}
            {editingNodeCapacities && (
                <div className="cluster-modal-backdrop" onClick={() => setEditingNodeCapacities(null)}>
                    <div className="cluster-modal-panel" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>TUNE NODE LIMITS: {editingNodeCapacities.displayName || editingNodeCapacities.nodeId}</h3>
                            <button type="button" className="close-btn" onClick={() => setEditingNodeCapacities(null)}>✕</button>
                        </div>
                        <form onSubmit={handleSaveNodeCapacities}>
                            <div className="modal-body">
                                <p className="modal-subtitle">
                                    Adjust runtime stream ingestion and concurrent NLE transcode limits for this specific cluster node. Changes propagate across the grid immediately.
                                </p>

                                <div className="form-group">
                                    <label>Operating Mode:</label>
                                    <select value={nodeCapMode} onChange={e => setNodeCapMode(e.target.value)}>
                                        <option value="Active">Active (Ingest &amp; Compute Processing)</option>
                                        <option value="Standby">Standby (Warm Hot-Spare)</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Max Ingest Streams Capacity:</label>
                                    <input
                                        type="number"
                                        min="5"
                                        max="200"
                                        value={nodeCapStreams}
                                        onChange={e => setNodeCapStreams(Number(e.target.value))}
                                        required
                                    />
                                    <span className="field-hint">Hardware recommended: {editingNodeCapacities.recommendedStreamsCapacity || 50} streams</span>
                                </div>

                                <div className="form-group">
                                    <label>Max Concurrent NLE Video Cuts Capacity:</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="16"
                                        value={nodeCapJobs}
                                        onChange={e => setNodeCapJobs(Number(e.target.value))}
                                        required
                                    />
                                    <span className="field-hint">Hardware recommended: {editingNodeCapacities.recommendedConcurrentJobs || 2} concurrent cuts</span>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn-cancel" onClick={() => setEditingNodeCapacities(null)}>Cancel</button>
                                <button type="submit" className="btn-submit" disabled={clusterActionLoading}>
                                    {clusterActionLoading ? 'Saving...' : 'Apply Node Limits'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </fieldset>
    );
}
