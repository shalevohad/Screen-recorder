// ==========================================
// File: Client/src/components/Dashboard/StationsDenseView.jsx
// ==========================================
import RemoteWidgetHost from '../Plugins/RemoteWidgetHost';
import LiveKeystrokeOverlay from '../Keystroke/LiveKeystrokeOverlay';
import { Can } from '../../context/AuthContext';
import './StationsDenseView.scss';

export default function StationsDenseView({
    paginatedStations = [],
    activeInlineFeatures = [],
    focusedWidgetHost,
    inspectedHostname,
    handleCloseFeature,
    actionPending = {},
    onToggleStream,
    setInspectedHostname,
    setFullscreenHostname,
    liveKeystrokes = {},
    keystrokeMode = 'burn-in'
}) {
    return (
        <div className="stations-dense-container">
            {activeInlineFeatures.length > 0 && (
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    {activeInlineFeatures.map((feat) => (
                        <div key={feat.id} style={{ flex: '1 1 450px', minHeight: '380px' }}>
                            <RemoteWidgetHost
                                scriptUrl={feat.scriptUrl}
                                widgetProps={{
                                    activeHost: focusedWidgetHost || inspectedHostname || paginatedStations[0]?.hostname || 'OHAD-DESKTOP',
                                    defaultWindowHours: 24,
                                    onClose: () => handleCloseFeature(feat.id)
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}

            <div className="stations-dense-grid">
                {paginatedStations.map((s) => {
                    const hasDrops = (s.droppedFrames || 0) > 0;
                    const isPending = actionPending[s.hostname] || false;
                    const isRec = Boolean(s.isRecording ?? (s.status === 'Recording')) && !isPending;
                    const isLive = Boolean(s.isOnline && (s.isStreaming || s.isRecording)) && !isPending;
                    const isMonitoring = isLive && !isRec;
                    const isStarting = isPending === 'starting' || (Boolean(isPending) && !isRec);
                    const isStopping = isPending === 'stopping' || (Boolean(isPending) && isRec);
                    const primaryTitle = s.roleAlias || s.displayName || s.hostname;
                    const secondaryHost = s.roleAlias ? s.hostname : null;

                    return (
                        <div
                            key={s.hostname}
                            className={`dense-row-card ${!s.isOnline ? 'is-offline' : ''} ${hasDrops ? 'has-crit' : ''}`}
                            onClick={() => setInspectedHostname(s.hostname)}
                            onDoubleClick={() => isLive && setFullscreenHostname(s.hostname)}
                            title={isLive ? "Click to inspect, double-click for Fullscreen" : "Click to inspect"}
                        >
                            <div className="dense-col status-col">
                                <span className={`dense-beacon ${s.isOnline ? 'online' : 'offline'}`} />
                            </div>

                            <div className="dense-col host-info">
                                <span className="dense-hostname">{primaryTitle}</span>
                                <div className="dense-sub-info">
                                    {secondaryHost && <span className="dense-machine-name">[{secondaryHost}]</span>}
                                    <span className="dense-ip">{s.ipAddress || s.ip || 'N/A'}</span>
                                </div>
                            </div>

                            <div className="dense-col tag-col">
                                {isStarting ? (
                                    <span className="dense-badge pending" style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#38BDF8', border: '1px solid rgba(6, 182, 212, 0.4)' }}>STARTING</span>
                                ) : isStopping ? (
                                    <span className="dense-badge pending" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#F87171', border: '1px solid rgba(239, 68, 68, 0.4)' }}>STOPPING</span>
                                ) : isRec ? (
                                    <span className="dense-badge rec">REC</span>
                                ) : isMonitoring ? (
                                    <span className="dense-badge monitor" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B', border: '1px solid rgba(245, 158, 11, 0.4)' }}>MONITOR</span>
                                ) : (
                                    <span className="dense-badge idle">STANDBY</span>
                                )}
                                {isLive && (
                                    <LiveKeystrokeOverlay
                                        keystrokes={s.recentKeystrokes || liveKeystrokes[s.hostname?.toLowerCase()]}
                                        isLive={isLive}
                                        variant="compact"
                                        mode={keystrokeMode}
                                    />
                                )}
                            </div>

                            <div className="dense-col metrics">
                                <span>{s.effectiveFps || s.actualFps || 0} FPS</span>
                                <span className="cpu-metric">{s.hostCpuPct || 0}% CPU</span>
                                {hasDrops && <span className="dense-drop-tag">({s.droppedFrames} D)</span>}
                            </div>

                            <div className="dense-col actions" onClick={(e) => e.stopPropagation()}>
                                <Can permission="stations.control" disabled disabledTooltip="No stream control permissions">
                                    <button
                                        type="button"
                                        className={`dense-act-btn ${isRec ? 'stop' : 'start'}`}
                                        disabled={!s.isOnline || Boolean(isPending)}
                                        onClick={() => onToggleStream(s.hostname, isRec, {
                                            bitrate: s.effectiveBitrate,
                                            fps: s.effectiveFps
                                        })}
                                    >
                                        {isStarting ? '...' : isStopping ? '...' : isRec ? 'STOP' : 'START REC'}
                                    </button>
                                </Can>
                                <button
                                    type="button"
                                    className={`dense-act-btn full ${!isLive ? 'disabled' : ''}`}
                                    onClick={() => isLive && setFullscreenHostname(s.hostname)}
                                    disabled={!isLive}
                                    title={isLive ? "Open Station in Fullscreen View" : "Fullscreen unavailable while offline"}
                                >
                                    FULL
                                </button>
                                <button
                                    type="button"
                                    className="dense-act-btn icon"
                                    onClick={() => setInspectedHostname(s.hostname)}
                                    title="Inspect station"
                                >
                                    INSP
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}