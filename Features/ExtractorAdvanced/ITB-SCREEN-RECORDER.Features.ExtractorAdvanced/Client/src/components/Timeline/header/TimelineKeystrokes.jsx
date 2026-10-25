// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/header/TimelineKeystrokes.jsx
// ==========================================
import React, { useState, useEffect, useMemo, memo } from 'react';
import { cleanKeyName } from '../../../utils/virtualKeyMap.js';
import './TimelineKeystrokes.scss';

const MIN_PIXEL_DISTANCE = 8; // Pixel distance threshold for clustering close keystroke events

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

    // Viewport-aware data fetching with previous request cancellation on fast drag/zoom
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

    // Pixel distance clustering algorithm (prevents DOM clutter and tick overlap)
    const clusters = useMemo(() => {
        if (!keystrokes.length || viewportDurationMs <= 0 || pixelWidth <= 0) {
            return [];
        }

        const viewStartEpoch = baseEpochMs + viewportStartMs;
        const viewEndEpoch = viewStartEpoch + viewportDurationMs;

        // Sort ascending by Epoch timestamp
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
                // Merge into existing cluster
                currentCluster.events.push(evt);
                currentCluster.endOffsetMs = offsetMs;
                currentCluster.endEpochMs = evt.epochMs;
                lastPixel = currentPixel;
            } else {
                // Initialize new cluster
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


function formatBadgeText(cluster) {
    if (!cluster.events.length) return '';
    if (cluster.events.length === 1) {
        return cleanKeyName(cluster.events[0].keyCombination);
    }
    // Prefer combination with shortcut modifier (Ctrl/Alt/Shift)
    const combo = cluster.events.find(e => e.keyCombination.includes('+'));
    if (combo) {
        const cleaned = cleanKeyName(combo.keyCombination);
        return cluster.events.length > 1 ? `${cleaned} (+${cluster.events.length - 1})` : cleaned;
    }

    // If all keys in cluster are identical
    const firstClean = cleanKeyName(cluster.events[0].keyCombination);
    const allSame = cluster.events.every(e => cleanKeyName(e.keyCombination) === firstClean);
    if (allSame) {
        return `${firstClean} ×${cluster.events.length}`;
    }

    // Mixed key sequence: show first key plus remaining count
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
                const edgeClass = cluster.pct < 10 ? 'edge-left' : (cluster.pct > 90 ? 'edge-right' : '');

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
                        <div className="keystroke-pip-anchor" title={`${badgeText} at ${timeLabel}`}>
                            <div className="keystroke-pip-glyph" />
                            {isCluster && <span className="keystroke-pip-count">{count > 9 ? '9+' : count}</span>}
                        </div>

                        {/* Tactical tooltip popover */}
                        <div className={`keystroke-tooltip ${edgeClass}`}>
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