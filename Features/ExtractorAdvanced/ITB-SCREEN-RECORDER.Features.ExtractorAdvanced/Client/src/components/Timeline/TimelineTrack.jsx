import React from 'react';
import './TimelineTrack.scss';

export default function TimelineTrack({
    station,
    isActive,
    onSelect,
    viewportStartMs = 0,
    viewportDurationMs = 3600000,
    inPointMs,
    outPointMs
}) {
    const inPercent = ((inPointMs - viewportStartMs) / viewportDurationMs) * 100;
    const outPercent = ((outPointMs - viewportStartMs) / viewportDurationMs) * 100;

    return (
        <div
            onClick={onSelect}
            className={`timeline-track-container ${isActive ? 'active-track' : 'collapsed-track'}`}
        >
            <div className="track-sidebar">
                <div className={`status-indicator ${isActive ? 'online' : 'idle'}`} />
                <span className="station-label">{station.hostname}</span>
            </div>

            <div className="track-canvas">
                {isActive ? (
                    <div className="filmstrip-view">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="frame-thumb">
                                <span>FR {i + 1}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="presence-view">
                        <div className="presence-bar">
                            <div className="bar-seg has-data" style={{ width: '100%' }} />
                        </div>
                    </div>
                )}

                {/* מסיכה שמאלית (מחוץ ל-IN) */}
                {inPercent > 0 && (
                    <div className="mask-dimmed left-mask" style={{ width: `${Math.min(100, inPercent)}%` }} />
                )}

                {/* מסיכה ימנית (מחוץ ל-OUT) */}
                {outPercent < 100 && (
                    <div className="mask-dimmed right-mask" style={{ left: `${Math.max(0, outPercent)}%`, right: 0 }} />
                )}
            </div>
        </div>
    );
}