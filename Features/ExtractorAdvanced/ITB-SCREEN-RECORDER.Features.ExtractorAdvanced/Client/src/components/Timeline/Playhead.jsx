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
    // חישוב מיקום יחסי באחוזים ביחס לחלון הנצפה (Viewport)
    const toPercent = (ms) => {
        if (!viewportDurationMs || viewportDurationMs <= 0) return '0%';
        const offset = ms - viewportStartMs;
        return `${(offset / viewportDurationMs) * 100}%`;
    };

    const inPercent = ((inPointMs - viewportStartMs) / viewportDurationMs) * 100;
    const outPercent = ((outPointMs - viewportStartMs) / viewportDurationMs) * 100;

    // חיתוך גבולות התצוגה של רצועת החיתוך כך שלא תחרוג מחוץ ל-Viewport
    const visibleRangeLeft = Math.max(0, inPercent);
    const visibleRangeRight = Math.min(100, outPercent);
    const visibleRangeWidth = Math.max(0, visibleRangeRight - visibleRangeLeft);

    const handleMouseDown = (type) => (e) => {
        e.preventDefault();
        e.stopPropagation(); // מונע מאירוע הגרירה של הקו להפעיל את גרירת השטח שמתחתיו
        if (typeof onStartDrag === 'function') {
            onStartDrag(type, e);
        }
    };

    return (
        <div className="playhead-overlay-pane">
            {/* רצועת השטח שבין IN ל-OUT - גרירה של כל החיתוך כמקשה אחת */}
            {visibleRangeWidth > 0 && (
                <div
                    className="draggable-cut-band"
                    style={{
                        left: `${visibleRangeLeft}%`,
                        width: `${visibleRangeWidth}%`
                    }}
                    onMouseDown={handleMouseDown('range')}
                    title="Drag body to move entire cut range"
                />
            )}

            {/* סמן קו IN נפרד עם Hitbox מורחב ו-z-index עליון */}
            <div
                className="marker in-marker"
                style={{ left: toPercent(inPointMs) }}
                onMouseDown={handleMouseDown('in')}
                title="Drag IN Point"
            >
                <div className="handle-badge">[ IN</div>
                <div className="marker-core-line" />
            </div>

            {/* סמן קו OUT נפרד עם Hitbox מורחב ו-z-index עליון */}
            <div
                className="marker out-marker"
                style={{ left: toPercent(outPointMs) }}
                onMouseDown={handleMouseDown('out')}
                title="Drag OUT Point"
            >
                <div className="handle-badge">OUT ]</div>
                <div className="marker-core-line" />
            </div>

            {/* מחט ה-Playhead הראשית המציגה שעת אמת לפי timeMode */}
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