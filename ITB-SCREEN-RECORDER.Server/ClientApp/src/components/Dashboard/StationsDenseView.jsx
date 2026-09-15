import RemoteWidgetHost from '../UI/RemoteWidgetHost';
import './StationsDenseView.scss';

export default function StationsDenseView({
    paginatedStations,
    activeInlineFeatures,
    focusedWidgetHost,
    inspectedHostname,
    handleCloseFeature,
    onToggleStream,
    setInspectedHostname,
    setFullscreenHostname
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
                    const isRec = s.isStreaming;
                    const hasDrops = s.droppedFrames > 0;
                    return (
                        <div
                            key={s.hostname}
                            className={`dense-row-card ${!s.isOnline ? 'is-offline' : ''} ${hasDrops ? 'has-crit' : ''}`}
                            onClick={() => setInspectedHostname(s.hostname)}
                            onDoubleClick={() => setFullscreenHostname(s.hostname)}
                            title="Click to inspect, double-click for Fullscreen"
                        >
                            <div className="dense-col status-col">
                                <span className={`dense-beacon ${s.isOnline ? 'online' : 'offline'}`} />
                            </div>
                            <div className="dense-col host-info">
                                <span className="dense-hostname">{s.hostname}</span>
                                <span className="dense-ip">{s.ipAddress || 'N/A'}</span>
                            </div>
                            <div className="dense-col tag-col">
                                {isRec ? <span className="dense-badge rec">REC</span> : <span className="dense-badge idle">IDLE</span>}
                            </div>
                            <div className="dense-col metrics">
                                <span>{s.effectiveFps || s.actualFps || 0} FPS</span>
                                <span className="cpu-metric">{s.hostCpuPct || 0}% CPU</span>
                                {hasDrops && <span className="dense-drop-tag">({s.droppedFrames} D)</span>}
                            </div>
                            <div className="dense-col actions" onClick={(e) => e.stopPropagation()}>
                                <button
                                    className={`dense-act-btn ${isRec ? 'stop' : 'start'}`}
                                    onClick={() => onToggleStream(s.hostname, isRec, {
                                        bitrate: s.effectiveBitrate,
                                        fps: s.effectiveFps
                                    })}
                                >
                                    {isRec ? 'STOP' : 'START'}
                                </button>
                                <button
                                    className="dense-act-btn full"
                                    onClick={() => setFullscreenHostname(s.hostname)}
                                    title="Open Station in Fullscreen View"
                                >
                                    FULL
                                </button>
                                <button
                                    className="dense-act-btn icon"
                                    onClick={() => setInspectedHostname(s.hostname)}
                                    title="Inspect"
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