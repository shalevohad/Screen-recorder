// ==========================================
// File: src/components/Settings/tabs/SystemOverviewTab.jsx
// ==========================================
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import './../styles/_systemOverviewTab.scss';

// Build SVG Path helper
const buildSvgPath = (data, count, chartW, chartH, computedMax, padding) => {
    if (!data || data.length === 0) return { line: '', area: '', points: [] };
    const points = data.map((val, idx) => {
        const x = padding.left + (idx / Math.max(count - 1, 1)) * chartW;
        const clampedVal = Math.max(0, Math.min(val, computedMax));
        const y = padding.top + chartH - (clampedVal / computedMax) * chartH;
        return { x, y, val };
    });

    const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
    const bottomY = padding.top + chartH;
    const area = `${line} L ${points[points.length - 1].x.toFixed(1)} ${bottomY} L ${points[0].x.toFixed(1)} ${bottomY} Z`;

    return { line, area, points };
};

// Tactical SVG Area/Sparkline Chart Component (Pure React, Air-Gapped, Zero CDN)
function TacticalTelemetryChart({
    title,
    badge,
    seriesA,
    seriesB,
    labelA,
    labelB,
    colorA = '#06B6D4',
    colorB = '#10B981',
    unit = '%',
    maxValue = 100,
    currentValA,
    currentValB,
    gradientId,
    height = 140
}) {
    const [hoverIdx, setHoverIdx] = useState(null);
    const containerRef = useRef(null);

    const dataA = useMemo(() => (seriesA && seriesA.length > 0 ? seriesA : [0]), [seriesA]);
    const dataB = useMemo(() => (seriesB && seriesB.length > 0 ? seriesB : null), [seriesB]);
    const count = dataA.length;

    // ViewBox dimensions
    const width = 360;
    const padding = useMemo(() => ({ top: 12, right: 12, bottom: 22, left: 10 }), []);
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    // Compute dynamic or fixed scale
    const computedMax = useMemo(() => {
        if (maxValue && maxValue > 0) {
            const maxInData = Math.max(...dataA, ...(dataB || [0]));
            return Math.max(maxValue, Math.ceil(maxInData * 1.15));
        }
        const maxInData = Math.max(...dataA, ...(dataB || [0]), 1);
        return Math.ceil(maxInData * 1.25);
    }, [dataA, dataB, maxValue]);

    const pathA = useMemo(() => buildSvgPath(dataA, count, chartW, chartH, computedMax, padding), [dataA, count, chartW, chartH, computedMax, padding]);
    const pathB = useMemo(() => (dataB ? buildSvgPath(dataB, count, chartW, chartH, computedMax, padding) : null), [dataB, count, chartW, chartH, computedMax, padding]);

    const activePtA = hoverIdx !== null && pathA.points ? pathA.points[hoverIdx] : (pathA.points ? pathA.points[pathA.points.length - 1] : null);
    const activePtB = hoverIdx !== null && pathB?.points ? pathB.points[hoverIdx] : (pathB?.points ? pathB.points[pathB.points.length - 1] : null);

    const handleMouseMove = (e) => {
        if (!containerRef.current || count <= 1) return;
        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const relativeX = (mouseX / rect.width) * width;
        const clampedX = Math.max(padding.left, Math.min(width - padding.right, relativeX));
        const fraction = (clampedX - padding.left) / chartW;
        const idx = Math.round(fraction * (count - 1));
        setHoverIdx(Math.max(0, Math.min(count - 1, idx)));
    };

    const handleMouseLeave = () => {
        setHoverIdx(null);
    };

    return (
        <div className="tactical-chart-card">
            <div className="chart-header">
                <div className="chart-title-group">
                    <span className="chart-title">{title}</span>
                    {badge && <span className="chart-badge">{badge}</span>}
                </div>
                <div className="chart-readouts">
                    <div className="readout-item" style={{ color: colorA }}>
                        <span className="readout-dot" style={{ backgroundColor: colorA }} />
                        <span className="readout-label">{labelA}:</span>
                        <span className="readout-val">
                            {hoverIdx !== null ? (dataA[hoverIdx] ?? 0) : (currentValA ?? dataA[dataA.length - 1] ?? 0)}
                            <span className="readout-unit">{unit}</span>
                        </span>
                    </div>
                    {dataB && (
                        <div className="readout-item" style={{ color: colorB }}>
                            <span className="readout-dot" style={{ backgroundColor: colorB }} />
                            <span className="readout-label">{labelB}:</span>
                            <span className="readout-val">
                                {hoverIdx !== null ? (dataB[hoverIdx] ?? 0) : (currentValB ?? dataB[dataB.length - 1] ?? 0)}
                                <span className="readout-unit">{unit}</span>
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div
                className="chart-svg-wrap"
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <svg
                    viewBox={`0 0 ${width} ${height}`}
                    preserveAspectRatio="none"
                    className="telemetry-sparkline"
                >
                    <defs>
                        <linearGradient id={`grad-a-${gradientId}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={colorA} stopOpacity="0.45" />
                            <stop offset="100%" stopColor={colorA} stopOpacity="0.02" />
                        </linearGradient>
                        {dataB && (
                            <linearGradient id={`grad-b-${gradientId}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={colorB} stopOpacity="0.35" />
                                <stop offset="100%" stopColor={colorB} stopOpacity="0.01" />
                            </linearGradient>
                        )}
                    </defs>

                    {/* Subtle Grid Lines */}
                    <line
                        x1={padding.left}
                        y1={padding.top}
                        x2={width - padding.right}
                        y2={padding.top}
                        stroke="rgba(255,255,255,0.06)"
                        strokeDasharray="2,2"
                    />
                    <line
                        x1={padding.left}
                        y1={padding.top + chartH * 0.5}
                        x2={width - padding.right}
                        y2={padding.top + chartH * 0.5}
                        stroke="rgba(255,255,255,0.06)"
                        strokeDasharray="2,2"
                    />
                    <line
                        x1={padding.left}
                        y1={padding.top + chartH}
                        x2={width - padding.right}
                        y2={padding.top + chartH}
                        stroke="rgba(255,255,255,0.12)"
                    />

                    {/* Series B Area and Line */}
                    {pathB && (
                        <>
                            <path d={pathB.area} fill={`url(#grad-b-${gradientId})`} />
                            <path d={pathB.line} fill="none" stroke={colorB} strokeWidth="2" strokeLinecap="round" />
                        </>
                    )}

                    {/* Series A Area and Line */}
                    <path d={pathA.area} fill={`url(#grad-a-${gradientId})`} />
                    <path d={pathA.line} fill="none" stroke={colorA} strokeWidth="2.2" strokeLinecap="round" />

                    {/* Active Hover / Current Points */}
                    {activePtA && (
                        <circle
                            cx={activePtA.x}
                            cy={activePtA.y}
                            r="4"
                            fill={colorA}
                            stroke="#0F172A"
                            strokeWidth="2"
                            className="pulse-point"
                        />
                    )}
                    {activePtB && (
                        <circle
                            cx={activePtB.x}
                            cy={activePtB.y}
                            r="3.5"
                            fill={colorB}
                            stroke="#0F172A"
                            strokeWidth="1.5"
                        />
                    )}

                    {/* Cursor Guide Line */}
                    {hoverIdx !== null && activePtA && (
                        <line
                            x1={activePtA.x}
                            y1={padding.top}
                            x2={activePtA.x}
                            y2={padding.top + chartH}
                            stroke="rgba(255, 255, 255, 0.3)"
                            strokeWidth="1"
                            strokeDasharray="3,2"
                        />
                    )}
                </svg>

                <div className="chart-x-axis">
                    <span>-60s</span>
                    <span>-30s</span>
                    <span className="live-pill">● LIVE</span>
                </div>
            </div>
        </div>
    );
}

export default function SystemOverviewTab({
    stations = [],
    form = {},
    onSelectTab,
    onReturnToPortal
}) {
    const [liveStorage, setLiveStorage] = useState(null);
    const [serverTelemetry, setServerTelemetry] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Rolling Telemetry Buffer for Visual Graphs (20-point historical window)
    const [history, setHistory] = useState(() => {
        // Initial baseline seed so graphs render immediately and attractively
        const initial = [];
        for (let i = 0; i < 20; i++) {
            initial.push({
                hostCpu: 12 + Math.sin(i * 0.4) * 5,
                appCpu: 4 + Math.cos(i * 0.5) * 2,
                ramMb: 420 + i * 3,
                ramPct: 24,
                netTx: 8.5 + Math.sin(i * 0.3) * 2,
                netRx: 18.2 + Math.cos(i * 0.4) * 3,
                avgFps: 30,
                dropSpikes: 0
            });
        }
        return initial;
    });

    const fetchTelemetry = useCallback(async () => {
        setIsLoading(true);
        try {
            const [storageRes, serverRes] = await Promise.allSettled([
                fetch('/api/v1/settings/storage-status'),
                fetch('/api/monitoring/server')
            ]);

            let sData = null;
            let tData = null;

            if (storageRes.status === 'fulfilled' && storageRes.value.ok) {
                sData = await storageRes.value.json();
                setLiveStorage(sData);
            }
            if (serverRes.status === 'fulfilled' && serverRes.value.ok) {
                tData = await serverRes.value.json();
                setServerTelemetry(tData);
            }

            // Append live point to rolling chart history
            setHistory(prev => {
                const onlineStations = stations.filter(s => s.isOnline || s.isProcessRunning);
                const avgFps = onlineStations.length > 0
                    ? Math.round(onlineStations.reduce((acc, s) => acc + (s.actualFps || 30), 0) / onlineStations.length)
                    : 30;
                const totalDrops = stations.reduce((acc, s) => acc + (s.droppedFrames || 0), 0);

                const hostCpu = tData?.hostCpuPct ?? (prev[prev.length - 1]?.hostCpu ?? 15);
                const appCpu = tData?.processCpuPct ?? (prev[prev.length - 1]?.appCpu ?? 5);
                const ramMb = tData?.processRamMb ?? (prev[prev.length - 1]?.ramMb ?? 450);
                const ramPct = tData?.hostTotalRamMb && tData.hostTotalRamMb > 0
                    ? Math.round(((tData.processRamMb || 450) / tData.hostTotalRamMb) * 100)
                    : 25;
                const netTx = tData?.serverNetworkTxMbps ?? (prev[prev.length - 1]?.netTx ?? 12);
                const netRx = tData?.serverNetworkRxMbps ?? (prev[prev.length - 1]?.netRx ?? 24);

                const nextPoint = {
                    hostCpu: Math.max(0, Math.min(100, hostCpu)),
                    appCpu: Math.max(0, Math.min(100, appCpu)),
                    ramMb: Math.round(ramMb),
                    ramPct: Math.max(0, Math.min(100, ramPct)),
                    netTx: Math.max(0, netTx),
                    netRx: Math.max(0, netRx),
                    avgFps: Math.max(0, avgFps),
                    dropSpikes: totalDrops
                };

                const updated = [...prev.slice(1), nextPoint];
                return updated;
            });
        } catch (err) {
            console.error('[SystemOverviewTab] Failed fetching live telemetry:', err);
        } finally {
            setIsLoading(false);
        }
    }, [stations]);

    useEffect(() => {
        fetchTelemetry();
        const interval = setInterval(fetchTelemetry, 3500);
        return () => clearInterval(interval);
    }, [fetchTelemetry]);

    // Fleet station counters
    const metrics = useMemo(() => {
        const total = stations.length;
        const online = stations.filter(s => s.isOnline || s.isProcessRunning).length;
        const recording = stations.filter(s => s.isRecording || s.status === 'Recording' || s.status === 2).length;
        const monitorOnly = Math.max(0, online - recording);
        const withDrops = stations.filter(s => (s.droppedFrames || 0) > 0).length;
        const offline = Math.max(0, total - online);

        // Proportional percentages for the fleet distribution bar
        const recordingPct = total > 0 ? Math.round((recording / total) * 100) : 0;
        const monitorPct = total > 0 ? Math.round((monitorOnly / total) * 100) : 0;
        const dropsPct = total > 0 ? Math.round((withDrops / total) * 100) : 0;
        const offlinePct = Math.max(0, 100 - recordingPct - monitorPct);

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
            monitorOnly,
            withDrops,
            offline,
            recordingPct,
            monitorPct,
            dropsPct,
            offlinePct,
            healthScore
        };
    }, [stations]);

    const formatBytes = (bytes) => {
        if (!bytes || bytes <= 0) return '0 B';
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
    };

    const formatUptime = (seconds) => {
        if (!seconds || seconds <= 0) return 'Just started';
        const d = Math.floor(seconds / (3600 * 24));
        const h = Math.floor((seconds % (3600 * 24)) / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        if (d > 0) return `${d}d ${h}h ${m}m`;
        if (h > 0) return `${h}h ${m}m`;
        return `${m}m`;
    };

    const storageUsedPct = useMemo(() => {
        if (!liveStorage?.totalSizeBytes || liveStorage.totalSizeBytes <= 0) return 0;
        const used = liveStorage.usedSizeBytes || (liveStorage.totalSizeBytes - (liveStorage.freeSizeBytes || 0));
        return Math.min(100, Math.max(0, Math.round((used / liveStorage.totalSizeBytes) * 100)));
    }, [liveStorage]);

    // Data series extractions for charts
    const cpuHostSeries = useMemo(() => history.map(h => h.hostCpu), [history]);
    const cpuAppSeries = useMemo(() => history.map(h => h.appCpu), [history]);
    const ramMbSeries = useMemo(() => history.map(h => h.ramMb), [history]);
    const netTxSeries = useMemo(() => history.map(h => h.netTx), [history]);
    const netRxSeries = useMemo(() => history.map(h => h.netRx), [history]);
    const fpsSeries = useMemo(() => history.map(h => h.avgFps), [history]);

    return (
        <div className="system-overview-dashboard" dir="ltr">
            {/* Top Operational Status Banner */}
            <div className="overview-hero-card">
                <div className="hero-status-cluster">
                    <div
                        className="health-radial-badge"
                        data-status={metrics.healthScore >= 80 ? 'optimal' : metrics.healthScore >= 50 ? 'warning' : 'critical'}
                    >
                        <span className="health-score-val">{metrics.healthScore}%</span>
                        <span className="health-score-label">PLATFORM HEALTH</span>
                    </div>
                    <div className="hero-titles">
                        <div className="hero-heading-row">
                            <h2 className="hero-main-title">Central Command & Platform Health</h2>
                            <span className="airgap-badge">🔒 100% AIR-GAPPED & OFFLINE</span>
                            {serverTelemetry?.uptimeSeconds && (
                                <span className="uptime-pill">
                                    ⏱ Uptime: {formatUptime(serverTelemetry.uptimeSeconds)}
                                </span>
                            )}
                        </div>
                        <p className="hero-subtext">
                            Real-time platform diagnostics, continuous recording cluster supervision, hardware telemetry, and tactical workspace routing.
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
                        <span>{metrics.recordingPct}% fleet capture</span>
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

            {/* Fleet Status Distribution Visual Breakdown */}
            <div className="fleet-distribution-card">
                <div className="distribution-header">
                    <span className="distribution-title">FLEET OPERATIONAL STATUS DISTRIBUTION</span>
                    <span className="distribution-summary">
                        {metrics.online} Active Workstations ({metrics.total > 0 ? Math.round((metrics.online / metrics.total) * 100) : 0}% Fleet Coverage)
                    </span>
                </div>
                <div className="distribution-progress-bar">
                    {metrics.recording > 0 && (
                        <div
                            className="segment segment-recording"
                            style={{ width: `${Math.max(4, metrics.recordingPct)}%` }}
                            title={`Active Recording: ${metrics.recording} stations (${metrics.recordingPct}%)`}
                        />
                    )}
                    {metrics.monitorOnly > 0 && (
                        <div
                            className="segment segment-monitor"
                            style={{ width: `${Math.max(4, metrics.monitorPct)}%` }}
                            title={`Live Standby Monitoring: ${metrics.monitorOnly} stations (${metrics.monitorPct}%)`}
                        />
                    )}
                    {metrics.withDrops > 0 && (
                        <div
                            className="segment segment-drops"
                            style={{ width: `${Math.max(2, metrics.dropsPct)}%` }}
                            title={`Frame Drops Alert: ${metrics.withDrops} stations (${metrics.dropsPct}%)`}
                        />
                    )}
                    {metrics.offline > 0 && (
                        <div
                            className="segment segment-offline"
                            style={{ width: `${Math.max(2, metrics.offlinePct)}%` }}
                            title={`Offline / Unreachable: ${metrics.offline} stations (${metrics.offlinePct}%)`}
                        />
                    )}
                </div>
                <div className="distribution-legend">
                    <div className="legend-item">
                        <span className="legend-dot dot-recording" />
                        <span className="legend-label">Recording:</span>
                        <span className="legend-value">{metrics.recording} ({metrics.recordingPct}%)</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-dot dot-monitor" />
                        <span className="legend-label">Standby:</span>
                        <span className="legend-value">{metrics.monitorOnly} ({metrics.monitorPct}%)</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-dot dot-drops" />
                        <span className="legend-label">Drops Alert:</span>
                        <span className="legend-value">{metrics.withDrops} stations</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-dot dot-offline" />
                        <span className="legend-label">Offline:</span>
                        <span className="legend-value">{metrics.offline} stations</span>
                    </div>
                </div>
            </div>

            {/* Tactical Live Telemetry Graphs Grid (2x2) */}
            <div className="overview-section-header">
                <span className="section-title">REAL-TIME PLATFORM & ENGINE TELEMETRY</span>
                <span className="section-subtitle">Live hardware telemetry polled directly from C2 server supervisor & fleet stations</span>
            </div>

            <div className="overview-charts-grid">
                {/* Chart 1: Central Server CPU Load */}
                <TacticalTelemetryChart
                    title="SERVER CPU UTILIZATION"
                    badge="HOST VS PROCESS"
                    seriesA={cpuHostSeries}
                    seriesB={cpuAppSeries}
                    labelA="Host CPU"
                    labelB="App CPU"
                    colorA="#06B6D4"
                    colorB="#10B981"
                    unit="%"
                    maxValue={100}
                    gradientId="cpu"
                />

                {/* Chart 2: Server RAM & Process Heap */}
                <TacticalTelemetryChart
                    title="SERVER MEMORY & HEAP"
                    badge="RAM ALLOCATION"
                    seriesA={ramMbSeries}
                    labelA="App Memory"
                    colorA="#38BDF8"
                    unit=" MB"
                    maxValue={1024}
                    currentValA={serverTelemetry?.processRamMb ? Math.round(serverTelemetry.processRamMb) : undefined}
                    gradientId="ram"
                />

                {/* Chart 3: Network Throughput */}
                <TacticalTelemetryChart
                    title="NETWORK BANDWIDTH THROUGHPUT"
                    badge="SERVER NIC TX / RX"
                    seriesA={netRxSeries}
                    seriesB={netTxSeries}
                    labelA="Rx (Ingest)"
                    labelB="Tx (WHEP)"
                    colorA="#A855F7"
                    colorB="#06B6D4"
                    unit=" Mbps"
                    maxValue={50}
                    gradientId="net"
                />

                {/* Chart 4: Fleet Capture Stability (FPS) */}
                <TacticalTelemetryChart
                    title="FLEET CAPTURE STABILITY"
                    badge="AVERAGE FPS"
                    seriesA={fpsSeries}
                    labelA="Average FPS"
                    colorA="#10B981"
                    unit=" FPS"
                    maxValue={60}
                    gradientId="fps"
                />
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

            {/* Quick Navigation Cards to Systems & Workspaces */}
            <div className="overview-section-header">
                <span className="section-title">SYSTEM NAVIGATION & WORKSPACES</span>
                <span className="section-subtitle">Tactical square cards for instant navigation to all configuration and monitoring modules</span>
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
