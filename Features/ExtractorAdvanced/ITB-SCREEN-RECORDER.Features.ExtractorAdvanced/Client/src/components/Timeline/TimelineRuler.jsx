// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/TimelineRuler.jsx
// ==========================================
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

    // 💡 אלגוריתם חכם להתאמת מרווחי השנתות למניעת Overlap (תומך בטווחים של 40+ שעות)
    const tickIntervalMs = useMemo(() => {
        const hours = viewportDurationMs / (3600 * 1000);
        if (hours <= 0.1) return 1000;         // עד 6 דקות: כל שניה
        if (hours <= 0.5) return 10000;        // עד חצי שעה: כל 10 שניות
        if (hours <= 2) return 60000;          // עד שעתיים: כל דקה
        if (hours <= 6) return 300000;         // עד 6 שעות: כל 5 דקות
        if (hours <= 12) return 900000;        // עד 12 שעות: כל 15 דקות
        if (hours <= 24) return 3600000;       // עד יום: כל שעה
        if (hours <= 72) return 14400000;      // עד 3 ימים: כל 4 שעות
        return 28800000;                       // מעבר לכך: כל 8 שעות
    }, [viewportDurationMs]);

    const ticks = useMemo(() => {
        const result = [];
        const firstTick = Math.ceil(viewportStartMs / tickIntervalMs) * tickIntervalMs;
        const lastTick = viewportStartMs + viewportDurationMs;

        for (let t = firstTick; t <= lastTick; t += tickIntervalMs) {
            result.push(t);
        }
        // מניעת עומס יתר ברולר: מגבלה של מקסימום 30 שנתות בו-זמנית במסך
        if (result.length > 30) {
            const step = Math.ceil(result.length / 25);
            return result.filter((_, idx) => idx % step === 0);
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