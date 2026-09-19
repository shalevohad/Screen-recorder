// Client/src/components/Timeline/TimelineRuler.jsx
import React, { useRef, useMemo } from 'react';
import { formatTimelineClock } from '../../utils/timeFormat.js';
import './TimelineRuler.scss';

export default function TimelineRuler({
    baseEpochMs = 0,
    timeMode = 'LOCAL',
    viewportStartMs = 0,
    viewportDurationMs = 3600000,
    totalDurationMs = 3600000,
    hoverMs = null,
    onHoverChange,
    onSeek,
    inPointMs,
    outPointMs
}) {
    const rulerRef = useRef(null);

    const toPercent = (ms) => {
        if (!viewportDurationMs) return 0;
        return ((ms - viewportStartMs) / viewportDurationMs) * 100;
    };

    const handleMouseMove = (e) => {
        if (!rulerRef.current) return;
        const rect = rulerRef.current.getBoundingClientRect();
        const offsetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const currentMs = Math.round(viewportStartMs + (offsetX / rect.width) * viewportDurationMs);
        if (onHoverChange) onHoverChange(currentMs);
    };

    const handleMouseLeave = () => {
        if (onHoverChange) onHoverChange(null);
    };

    const handleClick = (e) => {
        if (!rulerRef.current || !onSeek) return;
        const rect = rulerRef.current.getBoundingClientRect();
        const offsetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const seekMs = Math.round(viewportStartMs + (offsetX / rect.width) * viewportDurationMs);
        onSeek(Math.max(0, Math.min(totalDurationMs, seekMs)));
    };

    // חישוב חלוקות הזמן ברולר בהתאם לזום
    const tickIntervalMs = useMemo(() => {
        if (viewportDurationMs <= 10000) return 1000;       // 1 שניה
        if (viewportDurationMs <= 60000) return 5000;       // 5 שניות
        if (viewportDurationMs <= 300000) return 30000;     // 30 שניות
        if (viewportDurationMs <= 1800000) return 120000;   // 2 דקות
        if (viewportDurationMs <= 7200000) return 600000;   // 10 דקות
        return 1800000;                                     // 30 דקות
    }, [viewportDurationMs]);

    const ticks = useMemo(() => {
        const result = [];
        const firstTick = Math.ceil(viewportStartMs / tickIntervalMs) * tickIntervalMs;
        const lastTick = viewportStartMs + viewportDurationMs;

        for (let t = firstTick; t <= lastTick; t += tickIntervalMs) {
            result.push(t);
        }
        return result;
    }, [viewportStartMs, viewportDurationMs, tickIntervalMs]);

    const hoverPercent = hoverMs !== null ? toPercent(hoverMs) : null;
    const isHoverVisible = hoverPercent !== null && hoverPercent >= 0 && hoverPercent <= 100;

    return (
        <div
            ref={rulerRef}
            className="timeline-ruler-root"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <div className="ruler-ticks-track">
                {ticks.map(tickMs => {
                    const pct = toPercent(tickMs);
                    return (
                        <div key={tickMs} className="ruler-tick" style={{ left: `${pct}%` }}>
                            <div className="tick-line" />
                            <span className="tick-label">
                                {formatTimelineClock(baseEpochMs + tickMs, timeMode)}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* סמן הריחוף שמגיב גם למעבר עכבר על גבי הערוצים */}
            {isHoverVisible && (
                <div className="ruler-hover-cursor" style={{ left: `${hoverPercent}%` }}>
                    <div className="hover-time-badge">
                        {formatTimelineClock(baseEpochMs + hoverMs, timeMode)}
                    </div>
                    <div className="hover-guide-line" />
                </div>
            )}
        </div>
    );
}