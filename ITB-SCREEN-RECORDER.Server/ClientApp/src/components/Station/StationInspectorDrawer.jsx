import { useState, useEffect } from 'react';
import StationTuningFlyout from './StationTuningFlyout';
import { Badge } from '../UI/Badge';
import './StationInspectorDrawer.scss';

const resolveTargetFps = (st) => {
    if (!st) return 30;
    const candidates = [
        st.targetFps,
        st.targetFPS,
        st.configuredFps,
        st.videoFps,
        st.fps,
        st.tuning?.targetFps,
        st.tuning?.fps,
        st.override?.targetFps
    ];
    const found = candidates.find(v => v !== undefined && v !== null && !isNaN(Number(v)) && Number(v) > 0);
    return found ? Number(found) : 30;
};

export default function StationInspectorDrawer({
    station,
    onClose,
    onToggleStream,
    onQuickBookmark,
    onQuickPlayback,
    onQuickExport,
    onToggleFullscreen,
    ...tuningProps
}) {
    // 1. כל ה-Hooks מוגדרים ראשונים ברמת הרכיב ללא תנאי
    const [activeTab, setActiveTab] = useState('telemetry');
    const [confirmStop, setConfirmStop] = useState(false);

    // סנכרון Target FPS לפי תבנית React הרשמית המונעת cascading renders
    const [prevStationId, setPrevStationId] = useState(station?.hostname);
    const [overrideTargetFps, setOverrideTargetFps] = useState(null);

    if (station?.hostname !== prevStationId) {
        setPrevStationId(station?.hostname);
        setOverrideTargetFps(null);
    }

    const activeTargetFps = overrideTargetFps ?? resolveTargetFps(station);

    useEffect(() => {
        if (!confirmStop) return;
        const timer = setTimeout(() => setConfirmStop(false), 4000);
        return () => clearTimeout(timer);
    }, [confirmStop]);

    // 2. Early Return מתבצע אך ורק לאחר ריצת כל ה-Hooks
    if (!station) return null;

    const isLive = station.isStreaming;
    const stationId = station.hostname || station.stationName || '';

    const mediaTx = Number(station.mediaTxMbps ?? 0);
    const linkSpeedMbps = Number(station.linkSpeedMbps ?? station.nicSpeedMbps ?? 1000);
    const netLoadPct = Math.min(100, (mediaTx / linkSpeedMbps) * 100);

    const hostRamPct = Number(station.hostRamPct ?? station.ramUsagePct ?? station.ramPct ?? 0);
    const totalRamGb = Number(station.totalRamGb ?? (station.totalRamMb ? station.totalRamMb / 1024 : 32));
    const usedRamGb = (hostRamPct / 100) * totalRamGb;

    const appRamMb = Number(station.appRamMb ?? station.processRamMb ?? 0);
    const appRamGb = appRamMb / 1024;
    const appRamPct = totalRamGb > 0 ? (appRamGb / totalRamGb) * 100 : 0;
    const sysRamPart = Math.max(0, hostRamPct - appRamPct);

    const hostCpu = Number(station.hostCpuPct ?? station.cpuLoadPct ?? 0);
    const appCpu = Number(station.appCpuPct ?? station.processCpuPct ?? 0);
    const sysCpuPart = Math.max(0, hostCpu - appCpu);

    const nvencTotal = Number(station.gpuNvencPct ?? 0);
    const gpu3dTotal = Number(station.gpu3dPct ?? station.gpuPct ?? 0);

    const handleExecuteStop = () => {
        onToggleStream?.(stationId, true);
        setConfirmStop(false);
    };

    return (
        <div className="inspector-drawer-backdrop" onClick={onClose}>
            <div className="inspector-drawer-panel" onClick={(e) => e.stopPropagation()} dir="ltr">
                <div className="drawer-header">
                    <div className="drawer-title-group">
                        <div className="station-identity-line">
                            <h2 className="drawer-title">{stationId}</h2>
                            <Badge
                                variant={!station.isOnline ? 'critical' : isLive ? 'info' : 'success'}
                                pulse={isLive}
                            >
                                {!station.isOnline ? 'OFFLINE' : isLive ? 'STREAMING' : 'ONLINE'}
                            </Badge>
                        </div>
                        <span className="drawer-ip">{station.ipAddress || '127.0.0.1'}</span>
                    </div>

                    <div className="drawer-top-actions">
                        <button className="drawer-close-btn" onClick={onClose} title="Close Inspector (ESC)">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="drawer-tabs-nav">
                    <button
                        type="button"
                        className={`tab-btn ${activeTab === 'telemetry' ? 'active' : ''}`}
                        onClick={() => setActiveTab('telemetry')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="tab-icon">
                            <rect x="2" y="3" width="20" height="14" rx="2" />
                            <line x1="8" y1="21" x2="16" y2="21" />
                            <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                        Telemetry
                    </button>

                    <button
                        type="button"
                        className={`tab-btn ${activeTab === 'tuning' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tuning')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="tab-icon">
                            <line x1="4" y1="21" x2="4" y2="14" />
                            <line x1="4" y1="10" x2="4" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12" y2="3" />
                            <line x1="20" y1="21" x2="20" y2="16" />
                            <line x1="20" y1="12" x2="20" y2="3" />
                            <line x1="1" y1="14" x2="7" y2="14" />
                            <line x1="9" y1="8" x2="15" y2="8" />
                            <line x1="17" y1="16" x2="23" y2="16" />
                        </svg>
                        Pipeline Tuning
                    </button>

                    <button
                        type="button"
                        className={`tab-btn ${activeTab === 'operations' ? 'active' : ''}`}
                        onClick={() => setActiveTab('operations')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="tab-icon">
                            <circle cx="12" cy="12" r="10" />
                            <polygon points="10 8 16 12 10 16 10 8" />
                        </svg>
                        Operations
                    </button>
                </div>

                <div className="drawer-body">
                    {activeTab === 'telemetry' && (
                        <div className="tab-content-pane">
                            <div className="inspector-card">
                                <div className="card-header-bar">
                                    <span className="card-title">TELEMETRY & CAPACITY METRICS</span>
                                    <div className="telemetry-legend">
                                        <span className="legend-item"><span className="legend-dot app"></span>APP</span>
                                        <span className="legend-item"><span className="legend-dot sys"></span>SYSTEM</span>
                                    </div>
                                </div>

                                <div className="telemetry-grid">
                                    <div className="gauge-box">
                                        <span className="gauge-label">ACTUAL FPS</span>
                                        <div className="gauge-val-row">
                                            <span className="gauge-num">{station.actualFps || 0}</span>
                                            <span className="gauge-sub-meta">TARGET: {activeTargetFps} FPS</span>
                                        </div>
                                        <div className="gauge-bar-track">
                                            <div
                                                className="gauge-bar-segment app"
                                                style={{ width: `${Math.min(100, ((station.actualFps || 0) / (activeTargetFps || 60)) * 100)}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="gauge-box">
                                        <span className="gauge-label">NETWORK TX LOAD</span>
                                        <div className="gauge-val-row">
                                            <span className="gauge-num">{mediaTx.toFixed(1)} Mbps</span>
                                            <span className="gauge-app-tag">({netLoadPct.toFixed(2)}%)</span>
                                        </div>
                                        <div className="gauge-sub-info">OF {linkSpeedMbps} Mbps LINK</div>
                                        <div className="gauge-bar-track" title={`${mediaTx.toFixed(1)} Mbps out of ${linkSpeedMbps} Mbps`}>
                                            <div
                                                className="gauge-bar-segment app"
                                                style={{ width: `${Math.min(100, Math.max(2, netLoadPct))}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="gauge-box">
                                        <span className="gauge-label">CPU UTILIZATION</span>
                                        <div className="gauge-val-row">
                                            <span className="gauge-num">{hostCpu.toFixed(1)}%</span>
                                            <span className="gauge-app-tag">(APP: {appCpu.toFixed(1)}%)</span>
                                        </div>
                                        <div className="gauge-sub-info">TOTAL HOST LOAD</div>
                                        <div className="gauge-bar-track" title={`System: ${sysCpuPart.toFixed(1)}% | App: ${appCpu.toFixed(1)}%`}>
                                            <div
                                                className="gauge-bar-segment app"
                                                style={{ width: `${Math.min(100, appCpu)}%` }}
                                            />
                                            <div
                                                className={`gauge-bar-segment sys ${hostCpu > 85 ? 'crit' : ''}`}
                                                style={{ width: `${Math.min(100 - appCpu, sysCpuPart)}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="gauge-box">
                                        <span className="gauge-label">RAM USAGE</span>
                                        <div className="gauge-val-row">
                                            <span className="gauge-num">{usedRamGb.toFixed(1)} GB / {totalRamGb.toFixed(0)} GB</span>
                                            <span className="gauge-app-tag">({hostRamPct.toFixed(1)}%)</span>
                                        </div>
                                        <div className="gauge-sub-info">
                                            APP: {appRamMb >= 1024 ? `${(appRamMb / 1024).toFixed(1)} GB` : `${Math.round(appRamMb)} MB`} ({appRamPct.toFixed(1)}%)
                                        </div>
                                        <div className="gauge-bar-track" title={`Used: ${usedRamGb.toFixed(1)}GB | App: ${appRamMb.toFixed(0)}MB`}>
                                            <div
                                                className="gauge-bar-segment app"
                                                style={{ width: `${Math.min(100, appRamPct)}%` }}
                                            />
                                            <div
                                                className={`gauge-bar-segment sys ${hostRamPct > 85 ? 'crit' : ''}`}
                                                style={{ width: `${Math.min(100 - appRamPct, sysRamPart)}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="gauge-box">
                                        <span className="gauge-label">NVENC GPU LOAD</span>
                                        <div className="gauge-val-row">
                                            <span className="gauge-num">{nvencTotal.toFixed(0)}%</span>
                                        </div>
                                        <div className="gauge-sub-info">HARDWARE ENCODER</div>
                                        <div className="gauge-bar-track">
                                            <div
                                                className="gauge-bar-segment app"
                                                style={{ width: `${nvencTotal}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="gauge-box">
                                        <span className="gauge-label">GPU 3D ENGINE</span>
                                        <div className="gauge-val-row">
                                            <span className="gauge-num">{gpu3dTotal.toFixed(0)}%</span>
                                        </div>
                                        <div className="gauge-sub-info">GRAPHICS RENDER LOAD</div>
                                        <div className="gauge-bar-track">
                                            <div
                                                className="gauge-bar-segment sys"
                                                style={{ width: `${gpu3dTotal}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="stat-footer-metrics">
                                    <div className="footer-metric">
                                        <span className="f-lbl">DROPPED FRAMES:</span>
                                        <Badge variant={station.droppedFrames > 5 ? 'critical' : station.droppedFrames > 0 ? 'warning' : 'neutral'}>
                                            {station.droppedFrames || 0}
                                        </Badge>
                                    </div>
                                    <div className="footer-metric">
                                        <span className="f-lbl">AUDIO WASAPI:</span>
                                        <Badge variant={station.hasAudio ? 'success' : 'neutral'}>
                                            {station.hasAudio ? 'ONLINE' : 'MUTED'}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'tuning' && (
                        <div className="tab-content-pane tuning-pane">
                            <StationTuningFlyout
                                station={station}
                                {...station}
                                hostname={stationId}
                                apiBaseUrl=""
                                embedded={true}
                                onClose={() => { }}
                                onTuningApplied={(appliedPolicy) => {
                                    const newFps = appliedPolicy?.targetFps || appliedPolicy?.fps;
                                    if (newFps) {
                                        setOverrideTargetFps(Number(newFps));
                                    }
                                }}
                                {...tuningProps}
                            />
                        </div>
                    )}

                    {activeTab === 'operations' && (
                        <div className="tab-content-pane operations-pane">
                            <div className="stream-control-card">
                                <div className="stream-state-info">
                                    <span className="state-label">PIPELINE STATE:</span>
                                    <span className={`state-value ${isLive ? 'active' : 'idle'}`}>
                                        {isLive ? 'LIVE RECORDING IN PROGRESS' : 'AGENT IDLE / STANDBY'}
                                    </span>
                                </div>

                                {!isLive ? (
                                    <button
                                        className="action-stream-btn start"
                                        onClick={() => onToggleStream?.(stationId, false)}
                                    >
                                        START AGENT STREAM
                                    </button>
                                ) : !confirmStop ? (
                                    <button
                                        className="action-stream-btn prepare-stop"
                                        onClick={() => setConfirmStop(true)}
                                    >
                                        STOP STREAM
                                    </button>
                                ) : (
                                    <div className="stop-confirmation-cluster">
                                        <span className="confirmation-warning">CONFIRM STREAM TERMINATION?</span>
                                        <div className="confirmation-buttons-row">
                                            <button
                                                className="action-stream-btn execute-stop"
                                                onClick={handleExecuteStop}
                                            >
                                                YES, STOP STREAM
                                            </button>
                                            <button
                                                className="action-stream-btn cancel-stop"
                                                onClick={() => setConfirmStop(false)}
                                            >
                                                CANCEL
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="operations-quick-actions-card">
                                <span className="card-section-title">TACTICAL ACTIONS</span>
                                <div className="quick-actions-grid">
                                    <button
                                        className="quick-act-btn"
                                        onClick={() => onToggleFullscreen?.()}
                                        title="Open Fullscreen View"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                                        </svg>
                                        <span>FULLSCREEN VIEW</span>
                                    </button>

                                    <button
                                        className="quick-act-btn"
                                        onClick={() => onQuickBookmark?.(stationId)}
                                        title="Insert Tactical Bookmark"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                        </svg>
                                        <span>BOOKMARK</span>
                                    </button>

                                    <button
                                        className="quick-act-btn"
                                        onClick={() => onQuickPlayback?.(stationId)}
                                        title="Open Playback Window"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                        <span>PLAYBACK</span>
                                    </button>

                                    <button
                                        className="quick-act-btn"
                                        onClick={() => onQuickExport?.(stationId)}
                                        title="Export Video Segment"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                        <span>EXPORT CLIP</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}