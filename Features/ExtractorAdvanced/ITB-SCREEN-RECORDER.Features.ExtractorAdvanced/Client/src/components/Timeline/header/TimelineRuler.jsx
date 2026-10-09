// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/header/TimelineRuler.jsx
// ==========================================
import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { formatTimelineClock } from '../../../../utils/timeFormat.js';
import { findTransitionsInRange, formatLocalClockWithDst } from '../../../../utils/dstEngine.js';
import './TimelineRuler.scss';

const NICE_INTERVALS_MS = [
    1000, 2000, 5000, 10000, 15000, 30000,
    60000, 120000, 300000, 600000, 900000, 1800000,
    3600000, 7200000, 14400000, 21600000, 43200000,
    86400000
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
    _inPointMs,
    _outPointMs,
    earliestMediaMs = null,
    movieBoundaries = null,
    activeStationName = ''
}) {
    const rulerRef = useRef(null);
    const [pixelWidth, setPixelWidth] = useState(1000);
    const [keystrokes, setKeystrokes] = useState([]);

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

    // 💡 שליפת נתוני המקלדת עבור התחנה הפעילה ב-Viewport הנוכחי
    useEffect(() => {
        if (!activeStationName || !baseEpochMs) {
            setKeystrokes([]);
            return;
        }

        const startEp = baseEpochMs + viewportStartMs;
        const endEp = startEp + viewportDurationMs;

        fetch(`/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(activeStationName)}&startEpoch=${startEp}&endEpoch=${endEp}`)
            .then(res => res.ok ? res.json() : [])
            .then(data => setKeystrokes(data || []))
            .catch(() => setKeystrokes([]));
    }, [activeStationName, baseEpochMs, viewportStartMs, viewportDurationMs]);

    const toPercent = useCallback((ms) => {
        if (!viewportDurationMs || viewportDurationMs <= 0) return '0%';
        const offset = ms - viewportStartMs;
        return `${(offset / viewportDurationMs) * 100}%`;
    }, [viewportDurationMs, viewportStartMs]);

    const isVisibleInViewport = useCallback((ms) => {
        const offset = ms - viewportStartMs;
        const pct = (offset / viewportDurationMs) * 100;
        return pct >= -5 && pct <= 105;
    }, [viewportStartMs, viewportDurationMs]);

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

    const tickIntervalMs = useMemo(() => {
        const maxLabels = Math.max(3, Math.floor(pixelWidth / 95));
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

    const visibleDstTransitions = useMemo(() => {
        if (timeMode === 'UTC' || !baseEpochMs) return [];
        const startEpoch = baseEpochMs + viewportStartMs;
        const endEpoch = startEpoch + viewportDurationMs;

        return findTransitionsInRange(startEpoch, endEpoch).map(tr => ({
            ...tr,
            pct: ((tr.switchEpochMs - baseEpochMs - viewportStartMs) / viewportDurationMs) * 100
        }));
    }, [baseEpochMs, viewportStartMs, viewportDurationMs, timeMode]);

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

    const {
        globalFirstMs = earliestMediaMs,
        globalLastMs = null,
        currentFirstMs = null,
        currentLastMs = null
    } = movieBoundaries || { globalFirstMs: earliestMediaMs };

    const isFirstOverlapping = globalFirstMs !== null && currentFirstMs !== null && Math.abs(globalFirstMs - currentFirstMs) < 1000;
    const isLastOverlapping = globalLastMs !== null && currentLastMs !== null && Math.abs(globalLastMs - currentLastMs) < 1000;

    const mediaPins = useMemo(() => {
        const list = [];

        if (isFirstOverlapping) {
            if (isVisibleInViewport(globalFirstMs)) {
                list.push({
                    id: 'first-combined',
                    ms: globalFirstMs,
                    pct: toPercent(globalFirstMs),
                    className: 'ruler-media-pin global-first combined',
                    badge: 'FIRST (ALL & ACTIVE)',
                    title: `First Media (All & Active Station): ${formatTimelineClock(baseEpochMs + globalFirstMs, timeMode)} (Click to jump)`
                });
            }
        } else {
            if (isVisibleInViewport(globalFirstMs)) {
                list.push({
                    id: 'first-global',
                    ms: globalFirstMs,
                    pct: toPercent(globalFirstMs),
                    className: 'ruler-media-pin global-first',
                    badge: 'FIRST (ALL)',
                    title: `Global First Media: ${formatTimelineClock(baseEpochMs + globalFirstMs, timeMode)} (Click to jump)`
                });
            }
            if (isVisibleInViewport(currentFirstMs)) {
                list.push({
                    id: 'first-current',
                    ms: currentFirstMs,
                    pct: toPercent(currentFirstMs),
                    className: 'ruler-media-pin current-first',
                    badge: activeStationName ? `FIRST (${activeStationName})` : 'FIRST (ACTIVE)',
                    title: `Active Station First Media: ${formatTimelineClock(baseEpochMs + currentFirstMs, timeMode)} (Click to jump)`
                });
            }
        }

        if (isLastOverlapping) {
            if (isVisibleInViewport(globalLastMs)) {
                list.push({
                    id: 'last-combined',
                    ms: globalLastMs,
                    pct: toPercent(globalLastMs),
                    className: 'ruler-media-pin global-last combined',
                    badge: 'LAST (ALL & ACTIVE)',
                    title: `Last Media (All & Active Station): ${formatTimelineClock(baseEpochMs + globalLastMs, timeMode)} (Click to jump)`
                });
            }
        } else {
            if (isVisibleInViewport(currentLastMs)) {
                list.push({
                    id: 'last-current',
                    ms: currentLastMs,
                    pct: toPercent(currentLastMs),
                    className: 'ruler-media-pin current-last',
                    badge: activeStationName ? `LAST (${activeStationName})` : 'LAST (ACTIVE)',
                    title: `Active Station Last Media: ${formatTimelineClock(baseEpochMs + currentLastMs, timeMode)} (Click to jump)`
                });
            }
            if (isVisibleInViewport(globalLastMs)) {
                list.push({
                    id: 'last-global',
                    ms: globalLastMs,
                    pct: toPercent(globalLastMs),
                    className: 'ruler-media-pin global-last',
                    badge: 'LAST (ALL)',
                    title: `Global Last Media: ${formatTimelineClock(baseEpochMs + globalLastMs, timeMode)} (Click to jump)`
                });
            }
        }

        return list;
    }, [
        globalFirstMs,
        globalLastMs,
        currentFirstMs,
        currentLastMs,
        isFirstOverlapping,
        isLastOverlapping,
        baseEpochMs,
        timeMode,
        activeStationName,
        isVisibleInViewport,
        toPercent
    ]);

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
                    const epoch = baseEpochMs + tickMs;
                    const label = timeMode === 'LOCAL'
                        ? formatLocalClockWithDst(epoch)
                        : formatTimelineClock(epoch, 'UTC');

                    return (
                        <div key={tickMs} className="ruler-tick" style={{ left: `${pct}` }}>
                            <div className="tick-line" />
                            <span className="tick-label">{label}</span>
                        </div>
                    );
                })}

                {/* 💡 שנתות אירועי מקלדת ציאן טקטיות על גבי הסרגל */}
                {keystrokes.map((k, idx) => {
                    const offsetMs = k.epochMs - baseEpochMs;
                    if (!isVisibleInViewport(offsetMs)) return null;
                    const pct = toPercent(offsetMs);

                    return (
                        <div
                            key={`k_${idx}`}
                            className="ruler-keystroke-tick"
                            style={{ left: `${pct}` }}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onSeek) onSeek(offsetMs);
                            }}
                            title={`[KEYSTROKE] ${k.keyCombination} (Click to jump)`}
                        >
                            <div className="keystroke-tick-dot" />
                            <div className="keystroke-tick-tooltip">{k.keyCombination}</div>
                        </div>
                    );
                })}

                {visibleDstTransitions.map(tr => (
                    <div
                        key={tr.switchEpochMs}
                        className="ruler-dst-boundary"
                        style={{ left: `${tr.pct}%` }}
                        title={`${tr.description} (${tr.labelBefore} ➔ ${tr.labelAfter})`}
                    >
                        <div className="dst-datum-line" />
                        <div className="dst-tactical-chip">
                            <span className="dst-icon">⚡</span>
                            <span className="dst-text">{tr.description}</span>
                        </div>
                    </div>
                ))}

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

                {mediaPins.map(pin => (
                    <div
                        key={pin.id}
                        className={pin.className}
                        style={{ left: `${pin.pct}` }}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onSeek) onSeek(pin.ms);
                        }}
                        title={pin.title}
                    >
                        <div className="pin-badge">{pin.badge}</div>
                        <div className="pin-head">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="12 18 6 6 18 6 12 18" />
                            </svg>
                        </div>
                        <div className="pin-line" />
                    </div>
                ))}
            </div>

            {isHoverVisible && (
                <div className="ruler-hover-cursor" style={{ left: `${hoverPercent}%` }}>
                    <div className="hover-time-badge">
                        {timeMode === 'LOCAL' ? formatLocalClockWithDst(baseEpochMs + hoverMs) : formatTimelineClock(baseEpochMs + hoverMs, 'UTC')}
                    </div>
                    <div className="hover-guide-line" />
                </div>
            )}
        </div>
    );
}