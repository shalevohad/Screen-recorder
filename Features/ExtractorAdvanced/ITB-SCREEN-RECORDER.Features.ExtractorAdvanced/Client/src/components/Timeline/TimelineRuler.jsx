import React, { useRef, useMemo } from 'react';
import './TimelineRuler.scss';

// חישוב מדרגות זמנים עגולות בהתאם לאורך החלון הנצפה
function getOptimalStepSeconds(durationSec) {
    if (durationSec <= 15) return { major: 5, minor: 1 };
    if (durationSec <= 30) return { major: 10, minor: 2 };
    if (durationSec <= 60) return { major: 15, minor: 5 };
    if (durationSec <= 180) return { major: 30, minor: 10 };
    if (durationSec <= 600) return { major: 60, minor: 15 };
    if (durationSec <= 1800) return { major: 180, minor: 30 };
    if (durationSec <= 3600) return { major: 300, minor: 60 };
    if (durationSec <= 7200) return { major: 600, minor: 120 };
    if (durationSec <= 14400) return { major: 900, minor: 300 };
    return { major: 1800, minor: 600 };
}

// המרת Epoch Ms למחרוזת שעה מפורמטת בהתאם ל-LOCAL / UTC
const formatTimelineClock = (epochMs, mode = 'LOCAL') => {
    if (!epochMs || isNaN(epochMs)) return '--:--:--';
    const d = new Date(epochMs);
    const pad = (n) => String(n).padStart(2, '0');

    if (mode === 'UTC') {
        return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
    }

    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

export default function TimelineRuler({
    baseEpochMs = 0,
    timeMode = 'LOCAL',
    viewportStartMs = 0,
    viewportDurationMs = 3600000,
    hoverMs,
    onHoverChange,
    onSeek
}) {
    const rulerRef = useRef(null);
    const durationSec = Math.max(1, Math.floor(viewportDurationMs / 1000));

    // נקודת הזמן האבסולוטית באפוק שבה מתחיל החלון הנצפה
    const viewportStartEpoch = baseEpochMs + viewportStartMs;

    const { major, minor } = useMemo(() => getOptimalStepSeconds(durationSec), [durationSec]);

    // חישוב שנתות שננעלות על שעות ודקות עגולות בשעון האמיתי
    const ticks = useMemo(() => {
        const result = [];
        const startSec = Math.floor(viewportStartEpoch / 1000);
        const endSec = startSec + durationSec;
        const firstTickSec = Math.ceil(startSec / minor) * minor;

        for (let s = firstTickSec; s <= endSec; s += minor) {
            const isMajor = s % major === 0;
            const currentEpoch = s * 1000;
            const percent = ((currentEpoch - viewportStartEpoch) / viewportDurationMs) * 100;

            if (percent >= 0 && percent <= 100) {
                result.push({
                    epochMs: currentEpoch,
                    isMajor,
                    percent
                });
            }
        }
        return result;
    }, [viewportStartEpoch, durationSec, viewportDurationMs, major, minor]);

    const handleMouseMove = (e) => {
        if (!rulerRef.current) return;
        const rect = rulerRef.current.getBoundingClientRect();
        const offsetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        onHoverChange(viewportStartMs + (offsetX / rect.width) * viewportDurationMs);
    };

    const handleClick = (e) => {
        if (!rulerRef.current) return;
        const rect = rulerRef.current.getBoundingClientRect();
        const offsetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        onSeek(viewportStartMs + (offsetX / rect.width) * viewportDurationMs);
    };

    return (
        <div
            ref={rulerRef}
            className="timeline-ruler"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => onHoverChange(null)}
            onClick={handleClick}
        >
            {/* רינדור שנתות הזמן */}
            {ticks.map(({ epochMs, isMajor, percent }) => (
                <div
                    key={epochMs}
                    className={`tick-anchor ${isMajor ? 'major' : 'minor'}`}
                    style={{ left: `${percent}%` }}
                >
                    {isMajor && (
                        <span className="tick-label">
                            {formatTimelineClock(epochMs, timeMode)}
                        </span>
                    )}
                    <div className="tick-line" />
                </div>
            ))}

            {/* אינדיקטור ריחוף עם תגית זמן אמיתית */}
            {hoverMs !== null && hoverMs >= viewportStartMs && hoverMs <= viewportStartMs + viewportDurationMs && (
                <div
                    className="ruler-hover-badge"
                    style={{ left: `${((hoverMs - viewportStartMs) / viewportDurationMs) * 100}%` }}
                >
                    <span>{formatTimelineClock(baseEpochMs + hoverMs, timeMode)}</span>
                    <div className="hover-line" />
                </div>
            )}
        </div>
    );
}