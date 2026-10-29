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
    // Only render floating HUD navigator when timeline is zoomed in (>1x)
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

            {/* Mini overview map of entire timeline session */}
            <div className="hud-track-mini">
                {/* Active cut range highlight */}
                <div
                    className="hud-cut-range"
                    style={{
                        left: toPercent(inPointMs),
                        width: `${((outPointMs - inPointMs) / durationMs) * 100}%`
                    }}
                />
                {/* Playhead position needle on minimap */}
                <div
                    className="hud-playhead-needle"
                    style={{ left: toPercent(playheadMs) }}
                />
            </div>
        </div>
    );
}