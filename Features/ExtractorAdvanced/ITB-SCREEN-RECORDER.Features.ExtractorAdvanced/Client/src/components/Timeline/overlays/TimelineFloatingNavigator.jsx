import React from 'react';
import './TimelineFloatingNavigator.scss';

export default function TimelineFloatingNavigator({
    durationMs,
    zoomLevel,
    onZoomIn,
    onZoomOut,
    onZoomReset,
    inPointMs,
    outPointMs,
    playheadMs
}) {
    // מציג את ה-HUD הצף אך ורק כאשר מופעל זום
    if (zoomLevel <= 1) return null;

    const toPercent = (ms) => `${Math.max(0, Math.min((ms / durationMs) * 100, 100))}%`;

    return (
        <div className="timeline-floating-hud">
            <div className="hud-header">
                <span className="hud-title">ZOOM NAVIGATOR ({zoomLevel}x)</span>
                <div className="hud-controls">
                    <button onClick={onZoomOut} title="Zoom Out">-</button>
                    <button onClick={onZoomIn} title="Zoom In">+</button>
                    <button onClick={onZoomReset} className="btn-fit" title="Fit Entire Timeline">FIT</button>
                </div>
            </div>

            {/* מפת ניווט ממוזערת של כל השעה */}
            <div className="hud-track-mini">
                {/* תחום החיתוך המסומן */}
                <div
                    className="hud-cut-range"
                    style={{
                        left: toPercent(inPointMs),
                        width: `${((outPointMs - inPointMs) / durationMs) * 100}%`
                    }}
                />
                {/* מחט הסמן במפה */}
                <div
                    className="hud-playhead-needle"
                    style={{ left: toPercent(playheadMs) }}
                />
            </div>
        </div>
    );
}