// Client/src/components/Timeline/Playhead.jsx
import React from 'react';
import './Playhead.scss';

const formatTimelineClock = (epochMs, mode = 'LOCAL') => {
    if (!epochMs || isNaN(epochMs)) return '--:--:--';
    const d = new Date(epochMs);
    const pad = (n) => String(n).padStart(2, '0');

    if (mode === 'UTC') {
        return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
    }

    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

export default function Playhead({
    baseEpochMs = 0,
    timeMode = 'LOCAL',
    viewportStartMs = 0,
    viewportDurationMs = 3600000,
    playheadMs = 0,
    inPointMs = 0,
    outPointMs = 3600000,
    onStartDrag
}) {
    const toPercent = (ms) => {
        if (!viewportDurationMs || viewportDurationMs <= 0) return '0%';
        const offset = ms - viewportStartMs;
        return `${(offset / viewportDurationMs) * 100}%`;
    };

    const inPercent = ((inPointMs - viewportStartMs) / viewportDurationMs) * 100;
    const outPercent = ((outPointMs - viewportStartMs) / viewportDurationMs) * 100;
    const rawPlayheadPercent = ((playheadMs - viewportStartMs) / viewportDurationMs) * 100;

    const isPlayheadInViewport = rawPlayheadPercent >= -0.2 && rawPlayheadPercent <= 100.2;
    const displayPlayheadPercent = Math.max(0, Math.min(100, rawPlayheadPercent));

    const visibleRangeLeft = Math.max(0, inPercent);
    const visibleRangeRight = Math.min(100, outPercent);
    const visibleRangeWidth = Math.max(0, visibleRangeRight - visibleRangeLeft);

    const handleMouseDown = (type) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof onStartDrag === 'function') {
            onStartDrag(type, e);
        }
    };

    const flipIn = inPercent < 1.5;
    const flipOut = outPercent > 98.5;
    const isInAtEdge = inPercent <= 0.2 && inPercent >= -0.2;
    const isOutAtEdge = outPercent >= 99.8 && outPercent <= 100.2;

    const isPlayheadNearLeft = rawPlayheadPercent >= -0.2 && rawPlayheadPercent < 4.5;
    const isPlayheadNearRight = rawPlayheadPercent > 95.5 && rawPlayheadPercent <= 100.2;

    return (
        <div className="playhead-overlay-pane">

            {visibleRangeWidth > 0 && (
                <div
                    className="draggable-cut-band"
                    style={{ left: `${visibleRangeLeft}%`, width: `${visibleRangeWidth}%` }}
                    onMouseDown={handleMouseDown('range')}
                    title="Drag body to move entire cut range"
                />
            )}

            {/* סמן IN */}
            <div
                className={`marker in-marker ${flipIn ? 'flipped' : ''} ${isInAtEdge ? 'at-edge' : ''}`}
                style={{ left: toPercent(inPointMs) }}
                onMouseDown={handleMouseDown('in')}
                title="Drag IN Point"
            >
                <div className="handle-badge">IN</div>
                <div className="marker-core-line" />
            </div>

            {/* סמן OUT */}
            <div
                className={`marker out-marker ${flipOut ? 'flipped' : ''} ${isOutAtEdge ? 'at-edge' : ''}`}
                style={{ left: toPercent(outPointMs) }}
                onMouseDown={handleMouseDown('out')}
                title="Drag OUT Point"
            >
                <div className="handle-badge">OUT</div>
                <div className="marker-core-line" />
            </div>

            {/* מחט Playhead */}
            {isPlayheadInViewport && (
                <div
                    className="playhead-needle"
                    style={{ left: `${displayPlayheadPercent}%` }}
                    onMouseDown={handleMouseDown('playhead')}
                    title="Drag Playhead"
                >
                    <div className={`head-badge ${isPlayheadNearLeft ? 'edge-left' : ''} ${isPlayheadNearRight ? 'edge-right' : ''}`}>
                        {formatTimelineClock(baseEpochMs + playheadMs, timeMode)}
                    </div>
                    <div className="needle-core-line" />
                    {/* ידית אחיזה תחתונה מעוגלת */}
                    <div className="bottom-handle-node" />
                </div>
            )}
        </div>
    );
}