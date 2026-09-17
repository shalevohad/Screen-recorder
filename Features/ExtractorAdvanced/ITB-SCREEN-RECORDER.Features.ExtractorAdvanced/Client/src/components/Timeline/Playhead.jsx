import React from 'react';
import './Playhead.scss';

// המרת Epoch Ms למחרוזת שעה בהתאם למצב השעון (LOCAL מול UTC)
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
    // חישוב אחוזים למיקום הסמנים
    const toPercent = (ms) => {
        if (!viewportDurationMs || viewportDurationMs <= 0) return '0%';
        const offset = ms - viewportStartMs;
        return `${(offset / viewportDurationMs) * 100}%`;
    };

    const inPercent = ((inPointMs - viewportStartMs) / viewportDurationMs) * 100;
    const outPercent = ((outPointMs - viewportStartMs) / viewportDurationMs) * 100;

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

    // אלגוריתם היפוך חכם:
    // ברירת המחדל היא שהסמנים מצביעים החוצה כדי לא להסתיר את תוכן החיתוך.
    // אבל אם גוררים אותם לקצה הקיצוני של המסך, הם מתהפכים פנימה כדי לא להעלם.
    const flipIn = inPercent < 1.5;
    const flipOut = outPercent > 98.5;

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
                className={`marker in-marker ${flipIn ? 'flipped' : ''}`}
                style={{ left: toPercent(inPointMs) }}
                onMouseDown={handleMouseDown('in')}
                title="Drag IN Point"
            >
                <div className="handle-badge"></div>
                <div className="marker-core-line" />
            </div>

            {/* סמן OUT */}
            <div
                className={`marker out-marker ${flipOut ? 'flipped' : ''}`}
                style={{ left: toPercent(outPointMs) }}
                onMouseDown={handleMouseDown('out')}
                title="Drag OUT Point"
            >
                <div className="handle-badge"></div>
                <div className="marker-core-line" />
            </div>

            {/* מחט Playhead */}
            <div
                className="playhead-needle"
                style={{ left: toPercent(playheadMs) }}
                onMouseDown={handleMouseDown('playhead')}
                title="Drag Playhead (Snaps to IN / OUT)"
            >
                <div className="head-badge">
                    {formatTimelineClock(baseEpochMs + playheadMs, timeMode)}
                </div>
                <div className="needle-core-line" />
            </div>
        </div>
    );
}