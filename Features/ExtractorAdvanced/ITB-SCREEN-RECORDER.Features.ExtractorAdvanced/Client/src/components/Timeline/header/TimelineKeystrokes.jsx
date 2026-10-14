// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/header/TimelineKeystrokes.jsx
// ==========================================
import React, { useState, useEffect, useMemo, memo } from 'react';
import './TimelineKeystrokes.scss';

const MIN_PIXEL_DISTANCE = 8; // סף מרחק בפיקסלים למיזוג אירועים לאשכול

function TimelineKeystrokes({
    activeStationName = '',
    baseEpochMs = 0,
    viewportStartMs = 0,
    viewportDurationMs = 3600000,
    pixelWidth = 1000,
    onSeek
}) {
    const [keystrokes, setKeystrokes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // 💡 שליפת נתונים מותאמת Viewport עם ביטול בקשות קודמות בזמן גרירה/זום מהיר
    useEffect(() => {
        if (!activeStationName || !baseEpochMs || viewportDurationMs <= 0) {
            setKeystrokes([]);
            return;
        }

        const abortController = new AbortController();
        const startEpoch = baseEpochMs + viewportStartMs;
        const endEpoch = startEpoch + viewportDurationMs;

        setIsLoading(true);

        const url = `/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(activeStationName)}&startEpoch=${startEpoch}&endEpoch=${endEpoch}`;

        fetch(url, { signal: abortController.signal })
            .then(res => res.ok ? res.json() : [])
            .then(data => {
                setKeystrokes(Array.isArray(data) ? data : []);
                setIsLoading(false);
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    setKeystrokes([]);
                    setIsLoading(false);
                }
            });

        return () => abortController.abort();
    }, [activeStationName, baseEpochMs, viewportStartMs, viewportDurationMs]);

    // 💡 אלגוריתם Clustering מבוסס מרחק פיקסלים (מונע לחלוטין עומס וציפוף שנתות)
    const clusters = useMemo(() => {
        if (!keystrokes.length || viewportDurationMs <= 0 || pixelWidth <= 0) {
            return [];
        }

        const viewStartEpoch = baseEpochMs + viewportStartMs;
        const viewEndEpoch = viewStartEpoch + viewportDurationMs;

        // מיון עולה לפי Epoch
        const sorted = [...keystrokes].sort((a, b) => a.epochMs - b.epochMs);
        const result = [];
        let currentCluster = null;
        let lastPixel = -999;

        for (const evt of sorted) {
            if (evt.epochMs < viewStartEpoch || evt.epochMs > viewEndEpoch) {
                continue;
            }

            const offsetMs = evt.epochMs - baseEpochMs;
            const currentPixel = ((offsetMs - viewportStartMs) / viewportDurationMs) * pixelWidth;

            if (currentCluster && (currentPixel - lastPixel) < MIN_PIXEL_DISTANCE) {
                // מיזוג לאשכול קיים
                currentCluster.events.push(evt);
                currentCluster.endOffsetMs = offsetMs;
                currentCluster.endEpochMs = evt.epochMs;
                lastPixel = currentPixel;
            } else {
                // פתיחת אשכול חדש
                const pct = ((offsetMs - viewportStartMs) / viewportDurationMs) * 100;
                currentCluster = {
                    id: `kc_${evt.epochMs}_${result.length}`,
                    startOffsetMs: offsetMs,
                    endOffsetMs: offsetMs,
                    startEpochMs: evt.epochMs,
                    endEpochMs: evt.epochMs,
                    pct,
                    events: [evt]
                };
                result.push(currentCluster);
                lastPixel = currentPixel;
            }
        }

        return result;
    }, [keystrokes, baseEpochMs, viewportStartMs, viewportDurationMs, pixelWidth]);

// 💡 עזרי פענוח וניקוי שמות מקשים למניעת הדפסת קודי מקשים גולמיים
function cleanKeyName(rawKey) {
    if (!rawKey) return '';
    return rawKey
        .replace(/Key\(162\)/gi, 'Ctrl')
        .replace(/Key\(163\)/gi, 'RCtrl')
        .replace(/Key\(164\)/gi, 'Alt')
        .replace(/Key\(165\)/gi, 'RAlt')
        .replace(/Key\(160\)/gi, 'Shift')
        .replace(/Key\(161\)/gi, 'RShift')
        .replace(/Key\(13\)/gi, 'Enter')
        .replace(/Key\(32\)/gi, 'Space')
        .replace(/Key\(27\)/gi, 'Esc')
        .replace(/Key\(8\)/gi, 'Backspace')
        .replace(/Key\(46\)/gi, 'Delete')
        .replace(/Key\(9\)/gi, 'Tab')
        .replace(/Key\(190\)/gi, '.')
        .replace(/Key\(188\)/gi, ',')
        .replace(/Key\(191\)/gi, '/')
        .replace(/Key\(189\)/gi, '-')
        .replace(/Key\(187\)/gi, '=');
}

function formatBadgeText(cluster) {
    if (!cluster.events.length) return '';
    if (cluster.events.length === 1) {
        return cleanKeyName(cluster.events[0].keyCombination);
    }
    // עדיפות לצירוף עם מקש קיצור (Ctrl/Alt/Shift)
    const combo = cluster.events.find(e => e.keyCombination.includes('+'));
    if (combo) {
        const cleaned = cleanKeyName(combo.keyCombination);
        return cluster.events.length > 1 ? `${cleaned} (+${cluster.events.length - 1})` : cleaned;
    }

    // אם כל המקשים באשכול זהים
    const firstClean = cleanKeyName(cluster.events[0].keyCombination);
    const allSame = cluster.events.every(e => cleanKeyName(e.keyCombination) === firstClean);
    if (allSame) {
        return `${firstClean} ×${cluster.events.length}`;
    }

    // רצף מקשים מעורב: מציג את המקש הראשון ומספר המקשים הנוספים
    return `${firstClean} (+${cluster.events.length - 1})`;
}

function formatTooltipTime(epochMs) {
    const d = new Date(epochMs);
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
}

function groupClusterEvents(events) {
    const groups = [];
    for (const evt of events) {
        const key = cleanKeyName(evt.keyCombination);
        if (groups.length && groups[groups.length - 1].key === key) {
            groups[groups.length - 1].count++;
        } else {
            groups.push({ key, count: 1 });
        }
    }
    return groups;
}

    if (!clusters.length) {
        return null;
    }

    return (
        <div className="timeline-keystrokes-layer">
            {clusters.map((cluster) => {
                const count = cluster.events.length;
                const isCluster = count > 1;
                const badgeText = formatBadgeText(cluster);
                const timeLabel = formatTooltipTime(cluster.startEpochMs);
                const groups = groupClusterEvents(cluster.events);

                return (
                    <div
                        key={cluster.id}
                        className={`keystroke-tick-node ${isCluster ? 'is-cluster' : 'is-single'}`}
                        style={{ left: `${cluster.pct}%` }}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onSeek) onSeek(cluster.startOffsetMs);
                        }}
                    >
                        <div className="keystroke-tick-line" />
                        <div className="keystroke-tick-cap" title={`${badgeText} at ${timeLabel}`}>
                            <span className="keystroke-badge-text">{badgeText}</span>
                        </div>

                        {/* תגית Tooltip טקטית */}
                        <div className="keystroke-tooltip">
                            <div className="tooltip-header">
                                <span className="tooltip-type">
                                    {isCluster ? `KEYSTROKE BURST (${count})` : 'KEYSTROKE'}
                                </span>
                                <span className="tooltip-time">{timeLabel}</span>
                            </div>
                            <div className="tooltip-keys-list">
                                {groups.slice(0, 8).map((g, idx) => (
                                    <span key={idx} className="tooltip-key-pill">
                                        {g.key}{g.count > 1 ? ` ×${g.count}` : ''}
                                    </span>
                                ))}
                                {groups.length > 8 && (
                                    <span className="tooltip-more">+{groups.length - 8} more</span>
                                )}
                            </div>
                            <div className="tooltip-hint">Click to seek playhead</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default memo(TimelineKeystrokes);