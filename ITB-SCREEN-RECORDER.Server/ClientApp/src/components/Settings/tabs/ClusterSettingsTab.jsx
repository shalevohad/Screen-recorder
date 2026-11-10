// ==========================================
// File: ClientApp/src/components/Settings/tabs/ClusterSettingsTab.jsx
// ==========================================
import { useState, useEffect, useCallback } from 'react';

export default function ClusterSettingsTab({ form, updateDiscoveryField }) {
    const [clusterStatus, setClusterStatus] = useState(null);
    const [clusterGrid, setClusterGrid] = useState(null);
    const [clusterLoading, setClusterLoading] = useState(false);
    const [clusterActionLoading, setClusterActionLoading] = useState(false);
    const [clusterFeedback, setClusterFeedback] = useState(null);
    const [showAdvancedVip, setShowAdvancedVip] = useState(false);

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
            console.warn('[ClusterSettingsTab] Failed to load cluster status:', err);
        } finally {
            setClusterLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchClusterStatus();
        const interval = setInterval(fetchClusterStatus, 4000);
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
    const discovery = form.discovery || {};

    const streamsUtilizationPct = clusterGrid && clusterGrid.totalStreamsCapacity > 0
        ? Math.round((clusterGrid.totalIngestedStreams / clusterGrid.totalStreamsCapacity) * 100)
        : 0;

    const jobsUtilizationPct = clusterGrid && clusterGrid.totalConcurrentJobsCapacity > 0
        ? Math.round((clusterGrid.totalActiveRenderJobs / clusterGrid.totalConcurrentJobsCapacity) * 100)
        : 0;

    return (
        <div className="tab-body-flow" dir="rtl" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Top Subpanel Header */}
            <div className="subpanel-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.72rem', padding: '3px 8px', borderRadius: '4px', background: '#06B6D4', color: '#020617', fontWeight: 900 }}>
                            {discovery.role === 'Active-Standby' ? 'HA ACTIVE-STANDBY' : (discovery.role === 'Standalone' ? 'STANDALONE' : 'ACTIVE-ACTIVE GRID')}
                        </span>
                        <h4 style={{ margin: 0, color: '#38BDF8', fontSize: '1.05rem', fontWeight: 800 }}>
                            אשכול שרתים מבוזר, ניתוב עומסים חומרי ו-Virtual IP (VIP)
                        </h4>
                    </div>
                    <span className="subpanel-desc" style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '2px', display: 'block' }}>
                        איחוד שרתי הקלטה הטרוגניים לאשכול אחיד, איזון עומסי קליטת שידורים ועיבוד וידאו לפי כוח חומרה, ומנגנון יתירות VIP אוטומטי.
                    </span>
                </div>

                <button
                    type="button"
                    onClick={fetchClusterStatus}
                    className="btn-sync-cluster"
                    style={{
                        background: 'rgba(30, 41, 59, 0.7)',
                        border: '1px solid rgba(6, 182, 212, 0.35)',
                        color: '#38BDF8',
                        padding: '6px 14px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                >
                    <span>{clusterLoading ? '🔄 מרענן...' : '🔄 רענן נתוני אשכול'}</span>
                </button>
            </div>

            {/* Cluster KPI Summary Cards */}
            {clusterGrid && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px'
                }}>
                    {/* KPI 1: Active Nodes */}
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.75)',
                        border: '1px solid rgba(56, 189, 248, 0.2)',
                        borderRadius: '8px',
                        padding: '12px 14px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                    }}>
                        <span style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 700 }}>שרתים פעילים באשכול</span>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                            <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#38BDF8', fontFamily: 'monospace' }}>
                                {clusterGrid.onlineNodesCount}
                            </span>
                            <span style={{ fontSize: '0.78rem', color: '#64748B' }}>/ {clusterGrid.totalNodes} שרתים</span>
                        </div>
                        <span style={{ fontSize: '0.68rem', color: '#10B981', fontWeight: 700 }}>
                            👑 מתזמר ראשי: {clusterGrid.orchestratorNodeId || 'בוחר...'}
                        </span>
                    </div>

                    {/* KPI 2: Streams Ingestion Load */}
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.75)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        borderRadius: '8px',
                        padding: '12px 14px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 700 }}>עומס קליטת שידורים</span>
                            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: streamsUtilizationPct > 75 ? '#F43F5E' : '#34D399' }}>
                                {streamsUtilizationPct}%
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                            <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#F8FAFC', fontFamily: 'monospace' }}>
                                {clusterGrid.totalIngestedStreams}
                            </span>
                            <span style={{ fontSize: '0.78rem', color: '#64748B' }}>/ {clusterGrid.totalStreamsCapacity} ערוצים</span>
                        </div>
                        <div style={{ width: '100%', height: '5px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{
                                width: `${Math.min(100, Math.max(3, streamsUtilizationPct))}%`,
                                height: '100%',
                                background: streamsUtilizationPct > 75 ? '#F43F5E' : '#10B981'
                            }} />
                        </div>
                    </div>

                    {/* KPI 3: Video Render Jobs */}
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.75)',
                        border: '1px solid rgba(244, 114, 182, 0.2)',
                        borderRadius: '8px',
                        padding: '12px 14px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 700 }}>משימות עיבוד וידאו (NLE)</span>
                            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#F472B6' }}>
                                {jobsUtilizationPct}%
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                            <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#F8FAFC', fontFamily: 'monospace' }}>
                                {clusterGrid.totalActiveRenderJobs}
                            </span>
                            <span style={{ fontSize: '0.78rem', color: '#64748B' }}>/ {clusterGrid.totalConcurrentJobsCapacity} משימות במקביל</span>
                        </div>
                        <div style={{ width: '100%', height: '5px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{
                                width: `${Math.min(100, Math.max(3, jobsUtilizationPct))}%`,
                                height: '100%',
                                background: jobsUtilizationPct > 80 ? '#F43F5E' : '#F472B6'
                            }} />
                        </div>
                    </div>

                    {/* KPI 4: Virtual IP Status */}
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.75)',
                        border: '1px solid rgba(234, 179, 8, 0.2)',
                        borderRadius: '8px',
                        padding: '12px 14px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                    }}>
                        <span style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 700 }}>כתובת וירטואלית משותפת (VIP)</span>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: clusterStatus?.isVirtualIpBound ? '#34D399' : '#FDE047', fontFamily: 'monospace' }}>
                                {discovery.virtualIp || 'לא הוגדר'}
                            </span>
                        </div>
                        <span style={{ fontSize: '0.68rem', color: clusterStatus?.isVirtualIpBound ? '#10B981' : '#94A3B8', fontWeight: 700 }}>
                            ● {clusterStatus?.isVirtualIpBound ? 'משויכת פעילה לשרת זה' : (discovery.enableVirtualIp ? 'מנוהלת בעמית / Standby' : 'כבוי')}
                        </span>
                    </div>
                </div>
            )}

            {/* Local Node Identity & Live VIP Actions Banner */}
            {clusterStatus && (
                <div style={{
                    padding: '12px 16px',
                    background: 'rgba(15, 23, 42, 0.85)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 700 }}>שרת נוכחי:</span>
                        <strong style={{ color: '#F8FAFC', fontSize: '0.85rem' }}>{clusterStatus.localNodeId}</strong>

                        <span style={{
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            background: clusterStatus.state === 'Active' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                            color: clusterStatus.state === 'Active' ? '#34D399' : '#FDE047',
                            border: `1px solid ${clusterStatus.state === 'Active' ? '#10B981' : '#EAB308'}`
                        }}>
                            ● {clusterStatus.state} ({clusterStatus.nodeRole})
                        </span>

                        {clusterStatus.enableVirtualIp && clusterStatus.virtualIp && (
                            <span style={{
                                padding: '2px 8px',
                                borderRadius: '9999px',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                background: clusterStatus.isVipBoundLocally ? 'rgba(16, 185, 129, 0.2)' : 'rgba(148, 163, 184, 0.15)',
                                color: clusterStatus.isVipBoundLocally ? '#34D399' : '#94A3B8',
                                border: `1px solid ${clusterStatus.isVipBoundLocally ? 'rgba(16, 185, 129, 0.4)' : 'rgba(148, 163, 184, 0.3)'}`
                            }}>
                                VIP {clusterStatus.virtualIp}: {clusterStatus.isVipBoundLocally ? 'משויכת מקומית' : 'בהמתנה'}
                            </span>
                        )}
                    </div>

                    {/* VIP Promotion / Demotion Action Buttons */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {clusterStatus.enableVirtualIp && !clusterStatus.isVipBoundLocally && (
                            <button
                                type="button"
                                onClick={handleAcquireVip}
                                disabled={clusterActionLoading}
                                style={{
                                    background: 'rgba(16, 185, 129, 0.2)',
                                    border: '1px solid #10B981',
                                    color: '#34D399',
                                    padding: '5px 12px',
                                    borderRadius: '6px',
                                    fontSize: '0.74rem',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                }}
                            >
                                משוך כתובת VIP (הפוך לשרת ראשי)
                            </button>
                        )}
                        {clusterStatus.enableVirtualIp && clusterStatus.isVipBoundLocally && (
                            <button
                                type="button"
                                onClick={handleReleaseVip}
                                disabled={clusterActionLoading}
                                style={{
                                    background: 'rgba(244, 63, 94, 0.2)',
                                    border: '1px solid #F43F5E',
                                    color: '#FDA4AF',
                                    padding: '5px 12px',
                                    borderRadius: '6px',
                                    fontSize: '0.74rem',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                }}
                            >
                                שחרר כתובת VIP (וותר על הראשי)
                            </button>
                        )}
                    </div>
                </div>
            )}

            {clusterFeedback && (
                <div style={{
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

            {/* CLUSTER NODES TOPOLOGY GRID */}
            {discovery.role !== 'Standalone' && clusterGrid && (
                <div style={{
                    padding: '14px 16px',
                    background: 'rgba(15, 23, 42, 0.85)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '0.72rem', padding: '2px 6px', borderRadius: '4px', background: '#06B6D4', color: '#0F172A', fontWeight: 900 }}>
                                טופולוגיית אשכול
                            </span>
                            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#38BDF8' }}>
                                שרתים משתתפים, חלוקת עומסי שידור ומדדי כוח חישובי
                            </span>
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#34D399', fontWeight: 700 }}>
                            📡 גילוי עמיתים אוטונומי פעיל ברשת LAN (קבוצה: {discovery.clusterGroup || 'Production'})
                        </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '12px' }}>
                        {clusterGrid.nodes?.map(node => {
                            const isStandbyNode = node.nodeMode === 'Standby' || node.role === 'Secondary';
                            const isOverloaded = node.isOverloaded || node.hostCpuPct >= 75.0;

                            return (
                                <div key={node.nodeId} style={{
                                    background: 'rgba(30, 41, 59, 0.55)',
                                    border: `1px solid ${node.isOnline ? (node.isOrchestrator ? '#F59E0B' : (isStandbyNode ? '#EAB308' : '#06B6D4')) : '#EF4444'}`,
                                    borderRadius: '8px',
                                    padding: '12px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                    boxShadow: node.isOrchestrator ? '0 0 15px rgba(245, 158, 11, 0.15)' : 'none'
                                }}>
                                    {/* Top Line: Name + Badges */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ fontWeight: 800, fontSize: '0.82rem', color: '#F8FAFC' }}>
                                                {node.displayName || node.nodeId}
                                            </span>
                                            {node.nodeId === clusterGrid.localNodeId && (
                                                <span style={{ fontSize: '0.62rem', padding: '1px 5px', borderRadius: '3px', background: 'rgba(148, 163, 184, 0.25)', color: '#CBD5E1', fontWeight: 700 }}>
                                                    שרת נוכחי
                                                </span>
                                            )}
                                        </div>

                                        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                            <span style={{
                                                fontSize: '0.65rem',
                                                padding: '1px 6px',
                                                borderRadius: '4px',
                                                background: isStandbyNode ? 'rgba(234, 179, 8, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                                                color: isStandbyNode ? '#FDE047' : '#34D399',
                                                fontWeight: 800
                                            }}>
                                                {isStandbyNode ? '🟡 STANDBY' : '🟢 ACTIVE'}
                                            </span>
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
                                                fontWeight: 800
                                            }}>
                                                ● {node.isOnline ? 'ONLINE' : 'DOWN'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Hardware Spec & Power Index */}
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        background: 'rgba(15, 23, 42, 0.7)',
                                        padding: '5px 8px',
                                        borderRadius: '5px',
                                        border: '1px solid rgba(56, 189, 248, 0.15)',
                                        fontSize: '0.68rem'
                                    }}>
                                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                            <span style={{ color: '#38BDF8', fontWeight: 700 }}>
                                                {node.gpuModel && node.gpuModel !== 'CPU Software' ? `🎮 ${node.gpuModel}` : `💻 ${node.cpuCores || 4}C / ${Math.round(node.totalRamGb || 8)}GB`}
                                            </span>
                                            <span style={{ color: '#64748B' }}>•</span>
                                            <span style={{ color: '#94A3B8' }}>{node.encoderType || 'libx264'}</span>
                                        </div>
                                        <span style={{
                                            padding: '1px 6px',
                                            borderRadius: '3px',
                                            fontWeight: 900,
                                            fontSize: '0.65rem',
                                            background: (node.hardwareCapabilityScore || 200) >= 600 ? 'rgba(16, 185, 129, 0.25)' : ((node.hardwareCapabilityScore || 200) >= 300 ? 'rgba(6, 182, 212, 0.25)' : 'rgba(148, 163, 184, 0.2)'),
                                            color: (node.hardwareCapabilityScore || 200) >= 600 ? '#34D399' : ((node.hardwareCapabilityScore || 200) >= 300 ? '#38BDF8' : '#CBD5E1')
                                        }}>
                                            ⚡ מדד כוח {node.hardwareCapabilityScore || 200}
                                        </span>
                                    </div>

                                    {/* Streams & Jobs Capacity */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8' }}>
                                        <span>IP: <strong style={{ color: '#38BDF8', fontFamily: 'monospace' }}>{node.localIps?.[0] || 'Auto'}</strong></span>
                                        <span>שידורים: <strong style={{ color: '#F8FAFC' }}>{node.activeStreamsCount} / {node.maxStreamsCapacity}</strong></span>
                                        <span>משימות NLE: <strong style={{ color: '#F8FAFC' }}>{node.activeJobsCount} / {node.maxConcurrentJobs}</strong></span>
                                    </div>

                                    {/* CPU & GPU Telemetry */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94A3B8' }}>
                                        <span>CPU: <strong style={{ color: isOverloaded ? '#F43F5E' : '#34D399' }}>{Math.round(node.hostCpuPct || 0)}%</strong></span>
                                        <span>GPU: <strong style={{ color: '#38BDF8' }}>{Math.round(node.gpuNvencPct || 0)}%</strong></span>
                                        <span>עדיפות: <strong style={{ color: '#E2E8F0' }}>{node.priority}</strong></span>
                                    </div>

                                    {/* Ingest Pressure & Overload Guard Bar */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '0.66rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}>
                                            <span>
                                                לחץ קליטה (Ingest): <strong style={{ color: isOverloaded ? '#F43F5E' : '#38BDF8' }}>
                                                    {Math.round(node.ingestPressureScore || 0)} pts
                                                </strong>
                                                {isOverloaded && (
                                                    <span style={{ color: '#F43F5E', fontWeight: 800, marginRight: '4px' }}>[מוגן מעומס יתר]</span>
                                                )}
                                            </span>
                                            <span>
                                                התאמת עיבוד: <strong style={{ color: (node.computeFitnessScore || 0) > 0 ? '#34D399' : '#64748B' }}>
                                                    {(node.computeFitnessScore || 0) > 0 ? Math.round(node.computeFitnessScore) : 'בהמתנה'}
                                                </strong>
                                            </span>
                                        </div>
                                        <div style={{ width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                                            <div style={{
                                                width: `${Math.min(100, Math.max(4, Math.round(node.ingestPressureScore || 0)))}%`,
                                                height: '100%',
                                                background: isOverloaded ? '#F43F5E' : ((node.ingestPressureScore || 0) > 50 ? '#F59E0B' : '#10B981'),
                                                transition: 'width 0.4s ease'
                                            }} />
                                        </div>
                                    </div>

                                    {/* Orchestrator Transfer Action */}
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
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                fontSize: '0.7rem',
                                                fontWeight: 800,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            העבר תפקיד מתזמר ראשי לשרת זה
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* PRIMARY CLUSTER CONFIGURATION SETTINGS */}
            <div className="settings-fields-row" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div className="settings-field" style={{ flex: '1 1 calc(33% - 10px)' }}>
                    <span>תצורת פריסה (Cluster Mode)</span>
                    <select
                        value={discovery.role || 'Active-Active'}
                        onChange={e => updateDiscoveryField('role', e.target.value)}
                        className="tactical-select"
                    >
                        <option value="Active-Active">Active-Active (אשכול מבוזר - שיתוף עומסים ועיבוד וידאו מלא)</option>
                        <option value="Active-Standby">Active-Standby (אשכול גיבוי חם - שרת ראשי ושרת משני)</option>
                        <option value="Standalone">Standalone (שרת יחיד ללא אשכול)</option>
                    </select>
                    <span className="field-note" style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '4px' }}>
                        קובע האם השרת פועל כחלק מאשכול מבוזר או כשרת עצמאי.
                    </span>
                </div>

                {discovery.role !== 'Standalone' && (
                    <>
                        <div className="settings-field" style={{ flex: '1 1 calc(33% - 10px)' }}>
                            <span>אופי פעילות שרת זה (Node Mode)</span>
                            <select
                                value={discovery.nodeMode || (discovery.nodeRole === 'Secondary' ? 'Standby' : 'Active')}
                                onChange={e => {
                                    const mode = e.target.value;
                                    updateDiscoveryField('nodeMode', mode);
                                    updateDiscoveryField('nodeRole', mode === 'Standby' ? 'Secondary' : 'Primary');
                                }}
                                className="tactical-select"
                            >
                                <option value="Active">🟢 שרת פעיל (Active - קולט שידורים, מקליט ומעבד וידאו)</option>
                                <option value="Standby">🟡 שרת גיבוי חם (Standby - עומד בהמתנה, נכנס לפעולה בנפילה)</option>
                            </select>
                            <span className="field-note" style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '4px' }}>
                                תצורה משולבת (Hybrid): שרתים פעילים מתחלקים בעומס, ושרת גיבוי נכנס לפעולה רק במידת הצורך.
                            </span>
                        </div>

                        <div className="settings-field" style={{ flex: '1 1 calc(33% - 10px)' }}>
                            <span>שם קבוצת האשכול (Cluster Group)</span>
                            <input
                                type="text"
                                placeholder="Production"
                                value={discovery.clusterGroup || 'Production'}
                                onChange={e => updateDiscoveryField('clusterGroup', e.target.value)}
                            />
                            <span className="field-note" style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '4px' }}>
                                כל שרת ברשת המוגדר באותו שם קבוצה יזהה את עמיתיו ויצטרף לאשכול אוטומטית!
                            </span>
                        </div>
                    </>
                )}
            </div>

            {/* CAPACITY, BALANCING & OVERLOAD CEILINGS */}
            {discovery.role !== 'Standalone' && (
                <div style={{
                    padding: '14px 16px',
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h5 style={{ margin: 0, color: '#38BDF8', fontSize: '0.9rem', fontWeight: 800 }}>
                            ⚙️ מדדי קיבולת, חלוקת עומסים והגנת שרתים חלשים
                        </h5>
                        <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                            תקרת בטיחות: שרת עם מעבד מעל 75% ננעל אוטומטית מקבלת שידורים חדשים
                        </span>
                    </div>

                    <div className="settings-fields-row" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <div className="settings-field" style={{ flex: '1 1 calc(25% - 10px)' }}>
                            <span>קיבולת שידורים מקסימלית לשרת</span>
                            <input
                                type="number"
                                min="10"
                                max="200"
                                value={discovery.maxIngestStreamsCapacity ?? 50}
                                onChange={e => updateDiscoveryField('maxIngestStreamsCapacity', Number(e.target.value))}
                            />
                            <span className="field-note" style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                                כמות מקסימלית של ערוצי וידאו חיים לשרת זה.
                            </span>
                        </div>

                        <div className="settings-field" style={{ flex: '1 1 calc(25% - 10px)' }}>
                            <span>משימות עיבוד וידאו בו-זמנית</span>
                            <input
                                type="number"
                                min="1"
                                max="16"
                                value={discovery.maxConcurrentRenderJobs ?? 2}
                                onChange={e => updateDiscoveryField('maxConcurrentRenderJobs', Number(e.target.value))}
                            />
                            <span className="field-note" style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                                משימות יצוא NLE מקביליות לפני offload לעמית.
                            </span>
                        </div>

                        <div className="settings-field" style={{ flex: '1 1 calc(25% - 10px)' }}>
                            <span>עדיפות מנהיגות (Node Priority 1-100)</span>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                value={discovery.priority ?? 50}
                                onChange={e => updateDiscoveryField('priority', Number(e.target.value))}
                            />
                            <span className="field-note" style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                                עדיפות גבוהה יותר נבחרת כמתזמר ראשי בנפילה.
                            </span>
                        </div>

                        <div className="settings-field" style={{ flex: '1 1 calc(25% - 10px)' }}>
                            <span>קצב פעימות לב (Heartbeat Sec)</span>
                            <input
                                type="number"
                                min="1"
                                max="30"
                                value={discovery.heartbeatIntervalSeconds ?? 2}
                                onChange={e => updateDiscoveryField('heartbeatIntervalSeconds', Number(e.target.value))}
                            />
                            <span className="field-note" style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                                מרווח שניות בין שידורי UDP באשכול.
                            </span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', paddingTop: '6px' }}>
                        <label className="tactical-checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.78rem', color: '#E2E8F0' }}>
                            <input
                                type="checkbox"
                                checked={discovery.autoBalanceStreams !== false}
                                onChange={e => updateDiscoveryField('autoBalanceStreams', e.target.checked)}
                            />
                            <span>איזון עומסים אוטומטי של עמדות שידור (Auto-Balance Streams)</span>
                        </label>

                        <label className="tactical-checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.78rem', color: '#E2E8F0' }}>
                            <input
                                type="checkbox"
                                checked={discovery.distributedVideoProcessingEnabled !== false}
                                onChange={e => updateDiscoveryField('distributedVideoProcessingEnabled', e.target.checked)}
                            />
                            <span>עיבוד וידאו מבוזר באשכול (Offload NLE Render Jobs to Idle Peers)</span>
                        </label>

                        <label className="tactical-checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.78rem', color: '#E2E8F0' }}>
                            <input
                                type="checkbox"
                                checked={discovery.autoPeerDiscovery !== false}
                                onChange={e => updateDiscoveryField('autoPeerDiscovery', e.target.checked)}
                            />
                            <span>גילוי עמיתים אוטונומי ב-Multicast (UDP 239.210.1.5)</span>
                        </label>
                    </div>
                </div>
            )}

            {/* VIRTUAL IP (VIP) & NETWORKING ADVANCED CONTROLS */}
            {discovery.role !== 'Standalone' && (
                <div style={{
                    padding: '14px 16px',
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(234, 179, 8, 0.25)',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '0.68rem', padding: '2px 6px', borderRadius: '4px', background: '#EAB308', color: '#0F172A', fontWeight: 900 }}>
                                FAILOVER VIP
                            </span>
                            <h5 style={{ margin: 0, color: '#FDE047', fontSize: '0.9rem', fontWeight: 800 }}>
                                הגדרות כתובת וירטואלית משותפת (Virtual IP) ויתירות רשת
                            </h5>
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
                            {showAdvancedVip ? 'הסתר הגדרות VIP מפורטות' : 'הצג הגדרות VIP מפורטות'}
                        </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <label className="tactical-checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.8rem', color: '#F8FAFC', fontWeight: 700 }}>
                            <input
                                type="checkbox"
                                checked={Boolean(discovery.enableVirtualIp)}
                                onChange={e => updateDiscoveryField('enableVirtualIp', e.target.checked)}
                            />
                            <span>הפעל כתובת וירטואלית משותפת (Virtual IP Failover)</span>
                        </label>
                    </div>

                    {(discovery.enableVirtualIp || showAdvancedVip) && (
                        <div className="settings-fields-row" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <div className="settings-field" style={{ flex: '1 1 calc(33% - 10px)' }}>
                                <span>כתובת Virtual IP (IPv4)</span>
                                <input
                                    type="text"
                                    placeholder="e.g. 192.168.1.200"
                                    value={discovery.virtualIp || ''}
                                    onChange={e => updateDiscoveryField('virtualIp', e.target.value)}
                                />
                                <span className="field-note" style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                                    הכתובת המשותפת אליה פונים עמדות ה-Agent ודפדפני ה-C2.
                                </span>
                            </div>

                            <div className="settings-field" style={{ flex: '1 1 calc(33% - 10px)' }}>
                                <span>מסכת רשת (Subnet Mask)</span>
                                <input
                                    type="text"
                                    placeholder="255.255.255.0"
                                    value={discovery.virtualIpSubnetMask || '255.255.255.0'}
                                    onChange={e => updateDiscoveryField('virtualIpSubnetMask', e.target.value)}
                                />
                            </div>

                            <div className="settings-field" style={{ flex: '1 1 calc(33% - 10px)' }}>
                                <span>שם כרטיס רשת (Interface Name)</span>
                                <input
                                    type="text"
                                    placeholder="Auto (השאר ריק לבחירה אוטומטית)"
                                    value={discovery.networkInterfaceName || ''}
                                    onChange={e => updateDiscoveryField('networkInterfaceName', e.target.value)}
                                />
                                <span className="field-note" style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                                    למשל Ethernet או ens18. ברירת מחדל: אוטומטי לפי ה-NIC הפעיל.
                                </span>
                            </div>
                        </div>
                    )}

                    {showAdvancedVip && (
                        <div className="settings-fields-row" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <div className="settings-field" style={{ flex: '1 1 100%' }}>
                                <span>כתובות עמיתים ידניות (Manual Seed Peers) — רק לרשתות שבהן חסום UDP Multicast</span>
                                <input
                                    type="text"
                                    placeholder="http://192.168.1.101:5090, http://192.168.1.102:5090"
                                    value={Array.isArray(discovery.clusterPeerUrls) ? discovery.clusterPeerUrls.join(', ') : (discovery.clusterPeerUrls || '')}
                                    onChange={e => updateDiscoveryField('clusterPeerUrls', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
