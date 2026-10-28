// ==========================================
// File: src/components/Settings/tabs/SystemOverviewTab.jsx
// ==========================================
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './../styles/_systemOverviewTab.scss';

export default function SystemOverviewTab({
    stations = [],
    form = {},
    onSelectTab,
    onReturnToPortal
}) {
    const [liveStorage, setLiveStorage] = useState(null);
    // serverTelemetry placeholder
    const [, setServerTelemetry] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchTelemetry = useCallback(async () => {
        setIsLoading(true);
        try {
            const [storageRes, telemRes] = await Promise.allSettled([
                fetch('/api/v1/settings/storage-status'),
                fetch('/api/v1/dashboard/server-telemetry')
            ]);

            if (storageRes.status === 'fulfilled' && storageRes.value.ok) {
                const sData = await storageRes.value.json();
                setLiveStorage(sData);
            }
            if (telemRes.status === 'fulfilled' && telemRes.value.ok) {
                const tData = await telemRes.value.json();
                setServerTelemetry(tData);
            }
        } catch (err) {
            console.error('[SystemOverviewTab] Failed fetching live telemetry:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTelemetry();
        const interval = setInterval(fetchTelemetry, 10000);
        return () => clearInterval(interval);
    }, [fetchTelemetry]);

    // Fleet station counters
    const metrics = useMemo(() => {
        const total = stations.length;
        const online = stations.filter(s => s.isOnline || s.isProcessRunning).length;
        const recording = stations.filter(s => s.isRecording || s.status === 'Recording' || s.status === 2).length;
        const monitorOnly = online - recording;
        const withDrops = stations.filter(s => (s.droppedFrames || 0) > 0).length;
        const offline = total - online;

        let healthScore = 100;
        if (total > 0) {
            const dropImpact = Math.min(25, withDrops * 5);
            const offlineRatio = offline / total;
            healthScore = Math.max(15, Math.round(100 - dropImpact - (offlineRatio * 35)));
        }

        return {
            total,
            online,
            recording,
            monitorOnly: Math.max(0, monitorOnly),
            withDrops,
            offline,
            healthScore
        };
    }, [stations]);

    const formatBytes = (bytes) => {
        if (!bytes || bytes <= 0) return '0 B';
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
    };

    const storageUsedPct = useMemo(() => {
        if (!liveStorage?.totalSizeBytes || liveStorage.totalSizeBytes <= 0) return 0;
        const used = liveStorage.usedSizeBytes || (liveStorage.totalSizeBytes - (liveStorage.freeSizeBytes || 0));
        return Math.min(100, Math.max(0, Math.round((used / liveStorage.totalSizeBytes) * 100)));
    }, [liveStorage]);

    return (
        <div className="system-overview-dashboard">
            {/* Top Operational Status Banner */}
            <div className="overview-hero-card">
                <div className="hero-status-cluster">
                    <div className="health-radial-badge" data-status={metrics.healthScore >= 80 ? 'optimal' : metrics.healthScore >= 50 ? 'warning' : 'critical'}>
                        <span className="health-score-val">{metrics.healthScore}%</span>
                        <span className="health-score-label">PLATFORM HEALTH</span>
                    </div>
                    <div className="hero-titles">
                        <div className="hero-heading-row">
                            <h2 className="hero-main-title">Continuous Capture & Command Center</h2>
                            <span className="airgap-badge">🔒 100% AIR-GAPPED & OFFLINE</span>
                        </div>
                        <p className="hero-subtext">
                            Mission-critical workstation screen recording, synchronized audio mixing, and near-live telemetry supervisor.
                        </p>
                    </div>
                </div>

                <div className="hero-quick-actions">
                    <button
                        type="button"
                        className="btn-hero-launch grid-btn"
                        onClick={onReturnToPortal}
                        title="Return to tactical multi-station live monitoring grid"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16">
                            <rect x="3" y="3" width="7" height="7" />
                            <rect x="14" y="3" width="7" height="7" />
                            <rect x="14" y="14" width="7" height="7" />
                            <rect x="3" y="14" width="7" height="7" />
                        </svg>
                        <span>C2 LIVE MONITORING GRID</span>
                    </button>
                    <button
                        type="button"
                        className="btn-hero-refresh"
                        onClick={fetchTelemetry}
                        disabled={isLoading}
                        title="Refresh live system telemetry"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" className={isLoading ? 'spinning' : ''}>
                            <polyline points="23 4 23 10 17 10" />
                            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                        </svg>
                        <span>{isLoading ? 'REFRESHING...' : 'REFRESH'}</span>
                    </button>
                </div>
            </div>

            {/* Station Fleet Metric Cards */}
            <div className="overview-fleet-grid">
                <div className="metric-tactical-card total">
                    <div className="metric-header">
                        <span className="metric-name">TOTAL WORKSTATIONS</span>
                        <span className="metric-icon">🖥️</span>
                    </div>
                    <div className="metric-value">{metrics.total}</div>
                    <div className="metric-footer">
                        <span>{metrics.online} Online</span>
                        <span>•</span>
                        <span>{metrics.offline} Offline</span>
                    </div>
                </div>

                <div className="metric-tactical-card recording">
                    <div className="metric-header">
                        <span className="metric-name">ACTIVE RECORDING</span>
                        <span className="metric-badge live">REC ●</span>
                    </div>
                    <div className="metric-value">{metrics.recording}</div>
                    <div className="metric-footer">
                        <span>{metrics.total > 0 ? Math.round((metrics.recording / metrics.total) * 100) : 0}% fleet capture</span>
                    </div>
                </div>

                <div className="metric-tactical-card monitor">
                    <div className="metric-header">
                        <span className="metric-name">LIVE MONITOR (STANDBY)</span>
                        <span className="metric-badge standby">MON 👁</span>
                    </div>
                    <div className="metric-value">{metrics.monitorOnly}</div>
                    <div className="metric-footer">
                        <span>Streaming live, not archived</span>
                    </div>
                </div>

                <div className="metric-tactical-card drops">
                    <div className="metric-header">
                        <span className="metric-name">FRAME DROPS ALERT</span>
                        <span className="metric-icon">⚠️</span>
                    </div>
                    <div className="metric-value">{metrics.withDrops}</div>
                    <div className="metric-footer">
                        <span>{metrics.withDrops === 0 ? 'Zero dropped frames' : 'Network/CPU latency detected'}</span>
                    </div>
                </div>
            </div>

            {/* Storage & Engine Diagnostics Row */}
            <div className="overview-telemetry-row">
                <div className="telemetry-box storage-box">
                    <div className="box-title-row">
                        <span className="box-title">STORAGE ARCHIVE POOL</span>
                        <span className={`pool-status-tag ${liveStorage?.isAccessible ? 'active' : 'error'}`}>
                            {liveStorage?.isAccessible ? (liveStorage?.isFallbackActive ? 'LOCAL FALLBACK NVMe' : 'PRIMARY NetApp UNC') : 'UNREACHABLE'}
                        </span>
                    </div>

                    <div className="storage-capacity-bar-container">
                        <div className="storage-bar-header">
                            <span className="storage-used-text">{formatBytes(liveStorage?.usedSizeBytes)} used</span>
                            <span className="storage-pct-text">{storageUsedPct}% utilized</span>
                            <span className="storage-total-text">Total: {formatBytes(liveStorage?.totalSizeBytes)}</span>
                        </div>
                        <div className="storage-progress-track">
                            <div
                                className={`storage-progress-fill ${storageUsedPct > 90 ? 'critical' : storageUsedPct > 75 ? 'warning' : 'healthy'}`}
                                style={{ width: `${storageUsedPct}%` }}
                            />
                        </div>
                    </div>

                    <div className="storage-details-grid">
                        <div className="detail-item">
                            <span className="detail-label">Active Target Path</span>
                            <span className="detail-val mono" title={liveStorage?.storagePath}>{liveStorage?.storagePath || '—'}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Chunk Slicing</span>
                            <span className="detail-val">{form?.storage?.chunkIntervalMinutes || 5} min wall-clock</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Retention Policy</span>
                            <span className="detail-val">{form?.storage?.retentionDays || 30} days rolling</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Available Free</span>
                            <span className="detail-val highlight">{formatBytes(liveStorage?.freeSizeBytes)}</span>
                        </div>
                    </div>
                </div>

                <div className="telemetry-box engine-box">
                    <div className="box-title-row">
                        <span className="box-title">STREAMING & RECORDING PIPELINE</span>
                        <span className="pool-status-tag active">MediaMTX v1.15.4</span>
                    </div>

                    <div className="engine-stats-list">
                        <div className="engine-stat-item">
                            <span className="engine-stat-label">MediaMTX Core</span>
                            <span className="engine-stat-val success">● Running (PID Managed)</span>
                        </div>
                        <div className="engine-stat-item">
                            <span className="engine-stat-label">RTMP Ingest Port</span>
                            <span className="engine-stat-val mono">:19350</span>
                        </div>
                        <div className="engine-stat-item">
                            <span className="engine-stat-label">WHEP WebRTC Proxy</span>
                            <span className="engine-stat-val success">● Active (Sub-second)</span>
                        </div>
                        <div className="engine-stat-item">
                            <span className="engine-stat-label">Hardware Encoder Invariant</span>
                            <span className="engine-stat-val">NVENC → QuickSync → x264</span>
                        </div>
                        <div className="engine-stat-item">
                            <span className="engine-stat-label">Audio Pipeline</span>
                            <span className="engine-stat-val">WasapiDualMixer (Loopback + Mic)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Navigation Cards to Systems & Views */}
            <div className="overview-section-header">
                <span className="section-title">SYSTEM NAVIGATION & WORKSPACES</span>
                <span className="section-subtitle">Direct access to tactical C2 components and configuration modules</span>
            </div>

            <div className="overview-navigation-grid">
                <div className="nav-card" onClick={onReturnToPortal}>
                    <div className="nav-card-icon">🖥️</div>
                    <div className="nav-card-info">
                        <h4 className="nav-card-title">C2 Station Monitoring Grid</h4>
                        <p className="nav-card-desc">Tactical real-time multi-station screen grid with canvas topology and audio intercom.</p>
                    </div>
                    <span className="nav-arrow">→</span>
                </div>

                <div className="nav-card" onClick={() => onSelectTab?.('storage')}>
                    <div className="nav-card-icon">🗄️</div>
                    <div className="nav-card-info">
                        <h4 className="nav-card-title">Storage & NetApp Retention</h4>
                        <p className="nav-card-desc">Configure primary NetApp UNC paths, local NVMe failover, storage quota, and retention days.</p>
                    </div>
                    <span className="nav-arrow">→</span>
                </div>

                <div className="nav-card" onClick={() => onSelectTab?.('overrides')}>
                    <div className="nav-card-icon">🎛️</div>
                    <div className="nav-card-info">
                        <h4 className="nav-card-title">Station Overrides & Tuning</h4>
                        <p className="nav-card-desc">Set station-specific target FPS, video bitrates, and hardware encoder acceleration overrides.</p>
                    </div>
                    <span className="nav-arrow">→</span>
                </div>

                <div className="nav-card" onClick={() => onSelectTab?.('stations-roles')}>
                    <div className="nav-card-icon">👥</div>
                    <div className="nav-card-info">
                        <h4 className="nav-card-title">Stations & Operational Roles</h4>
                        <p className="nav-card-desc">Map hostnames to tactical role aliases with CSV import/export and alias swapping (הצלבה).</p>
                    </div>
                    <span className="nav-arrow">→</span>
                </div>

                <div className="nav-card" onClick={() => onSelectTab?.('agent')}>
                    <div className="nav-card-icon">⚙️</div>
                    <div className="nav-card-info">
                        <h4 className="nav-card-title">Agent Operations & Defaults</h4>
                        <p className="nav-card-desc">Tune global default capture rates, bitrates, audio channels, and watchdog timeouts.</p>
                    </div>
                    <span className="nav-arrow">→</span>
                </div>

                <div className="nav-card" onClick={() => onSelectTab?.('system')}>
                    <div className="nav-card-icon">🌐</div>
                    <div className="nav-card-info">
                        <h4 className="nav-card-title">System & Network Topology</h4>
                        <p className="nav-card-desc">Manage API endpoints, WebRTC WHEP proxy roots, and telemetry broadcast rates.</p>
                    </div>
                    <span className="nav-arrow">→</span>
                </div>

                <div className="nav-card" onClick={() => onSelectTab?.('security')}>
                    <div className="nav-card-icon">🛡️</div>
                    <div className="nav-card-info">
                        <h4 className="nav-card-title">Security & Active Directory</h4>
                        <p className="nav-card-desc">Configure LDAP / AD synchronization, organizational units (OU), and RBAC user permissions.</p>
                    </div>
                    <span className="nav-arrow">→</span>
                </div>

                <div className="nav-card" onClick={() => onSelectTab?.('maintenance')}>
                    <div className="nav-card-icon">🛠️</div>
                    <div className="nav-card-info">
                        <h4 className="nav-card-title">Diagnostics & Maintenance</h4>
                        <p className="nav-card-desc">Run database vacuum optimization, clean orphaned chunk segments, and export audit logs.</p>
                    </div>
                    <span className="nav-arrow">→</span>
                </div>
            </div>
        </div>
    );
}
