// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/TimelineRuler.jsx
// ==========================================
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { formatTimelineClock } from '../../utils/timeFormat.js';
import './TimelineRuler.scss';

// מרווחי זמן עגולים ומסודרים
const NICE_INTERVALS_MS = [
    1000, 2000, 5000, 10000, 15000, 30000,             // שניות
    60000, 120000, 300000, 600000, 900000, 1800000,    // 1, 2, 5, 10, 15, 30 דקות
    3600000, 7200000, 14400000, 21600000, 43200000,    // 1, 2, 4, 6, 12 שעות
    86400000                                           // 24 שעות
];

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
    const [pixelWidth, setPixelWidth] = useState(1000);

    // 💡 מדידה דינמית של רוחב הרולר בפועל למניעת צפיפות בכל גודל מסך
    useEffect(() => {
        if (!rulerRef.current) return;
        const ro = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.contentRect.width > 50) {
                    setPixelWidth(entry.contentRect.width);
                }
            }
        });
        ro.observe(rulerRef.current);
        return () => ro.disconnect();
    }, []);

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

    // 💡 חישוב מרווח שנתות מרווח (לפחות 85px מרווח לכל תווית שעה!)
    const tickIntervalMs = useMemo(() => {
        const maxLabels = Math.max(3, Math.floor(pixelWidth / 85));
        const targetInterval = viewportDurationMs / maxLabels;

        for (let interval of NICE_INTERVALS_MS) {
            if (interval >= targetInterval) return interval;
        }
        return NICE_INTERVALS_MS[NICE_INTERVALS_MS.length - 1];
    }, [viewportDurationMs, pixelWidth]);

    const ticks = useMemo(() => {
        const result = [];
        const firstTick = Math.ceil(viewportStartMs / tickIntervalMs) * tickIntervalMs;
        const lastTick = viewportStartMs + viewportDurationMs;

        for (let t = firstTick; t <= lastTick; t += tickIntervalMs) {
            result.push(t);
        }
        return result;
    }, [viewportStartMs, viewportDurationMs, tickIntervalMs]);

    // זיהוי מעברי חצות (תאריך חדש)
    const dateBoundaries = useMemo(() => {
        if (!viewportDurationMs || !baseEpochMs) return [];

        const startEpoch = baseEpochMs + viewportStartMs;
        const endEpoch = startEpoch + viewportDurationMs;
        const isUtc = timeMode === 'UTC';
        const boundaries = [];

        const cur = new Date(startEpoch);
        if (isUtc) {
            cur.setUTCHours(0, 0, 0, 0);
            if (cur.getTime() < startEpoch) cur.setUTCDate(cur.getUTCDate() + 1);
        } else {
            cur.setHours(0, 0, 0, 0);
            if (cur.getTime() < startEpoch) cur.setDate(cur.getDate() + 1);
        }

        while (cur.getTime() <= endEpoch) {
            const epoch = cur.getTime();
            const offsetMs = epoch - baseEpochMs;
            const pct = ((offsetMs - viewportStartMs) / viewportDurationMs) * 100;

            const dateLabel = cur.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                timeZone: isUtc ? 'UTC' : undefined
            }).toUpperCase();

            boundaries.push({ epoch, pct, dateLabel });

            if (isUtc) cur.setUTCDate(cur.getUTCDate() + 1);
            else cur.setDate(cur.getDate() + 1);
        }

        return boundaries;
    }, [baseEpochMs, viewportStartMs, viewportDurationMs, timeMode]);

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

                {dateBoundaries.map(boundary => (
                    <div
                        key={boundary.epoch}
                        className="ruler-date-boundary"
                        style={{ left: `${boundary.pct}%` }}
                    >
                        <div className="boundary-datum-line" />
                        <div className="boundary-tactical-chip">
                            <svg className="calendar-svg" viewBox="0 0 12 12" fill="none">
                                <rect x="1.5" y="2.5" width="9" height="8" rx="1.5" stroke="currentColor" strokeWidth="1" />
                                <line x1="3.5" y1="1" x2="3.5" y2="2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                                <line x1="8.5" y1="1" x2="8.5" y2="2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                                <line x1="1.5" y1="5.5" x2="10.5" y2="5.5" stroke="currentColor" strokeWidth="0.8" />
                            </svg>
                            <span className="date-str">{boundary.dateLabel}</span>
                            <span className="divider-dot" />
                            <span className="time-str">00:00</span>
                        </div>
                    </div>
                ))}
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