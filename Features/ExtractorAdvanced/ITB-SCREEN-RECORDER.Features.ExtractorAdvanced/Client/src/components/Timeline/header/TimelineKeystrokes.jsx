// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/header/TimelineKeystrokes.jsx
// Multi-Station Forensics Ruler Keystroke Indicators & Tooltip
// ==========================================
import React, { useState, useEffect, useMemo, memo } from 'react';
import { cleanKeyName, KEYSTROKE_CALIBRATION_OFFSET_MS } from '../../../utils/virtualKeyMap.js';
import { formatTimelineClock } from '../../../utils/timeFormat.js';
import './TimelineKeystrokes.scss';

const MIN_PIXEL_DISTANCE = 8; // Pixel distance threshold for clustering close keystroke events

function TimelineKeystrokes({
    activeStationName = '',
    stationHostname = '',
    stations = [],
    keystrokes: propKeystrokes = null,
    baseEpochMs = 0,
    timeMode = 'LOCAL',
    viewportStartMs = 0,
    viewportDurationMs = 3600000,
    pixelWidth = 1000,
    onSeek
}) {
    const [fetchedKeystrokes, setFetchedKeystrokes] = useState([]);
    const [, setIsLoading] = useState(false);

    // Target stations resolution for parallel multi-workstation query
    const targetStations = useMemo(() => {
        if (stations && Array.isArray(stations) && stations.length > 0) {
            return stations.map(s => ({
                id: s.id,
                name: s.displayName || s.hostname || s.name || s.id,
                hostname: s.hostname || s.id
            }));
        }
        if (stationHostname || activeStationName) {
            return [{
                id: stationHostname || activeStationName,
                name: activeStationName || stationHostname,
                hostname: stationHostname || activeStationName
            }];
        }
        return [];
    }, [stations, stationHostname, activeStationName]);

    // Viewport-aware data fetching with parallel station queries & cancellation
    useEffect(() => {
        if (propKeystrokes !== null && propKeystrokes !== undefined) {
            return;
        }

        if (!targetStations.length || !baseEpochMs || viewportDurationMs <= 0) {
            setFetchedKeystrokes([]);
            return;
        }

        const abortController = new AbortController();
        const startEpoch = Math.max(0, baseEpochMs + viewportStartMs - KEYSTROKE_CALIBRATION_OFFSET_MS);
        const endEpoch = baseEpochMs + viewportStartMs + viewportDurationMs + KEYSTROKE_CALIBRATION_OFFSET_MS;

        setIsLoading(true);

        const fetches = targetStations.map(st => {
            const url = `/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(st.hostname)}&startEpoch=${startEpoch}&endEpoch=${endEpoch}`;
            return fetch(url, { signal: abortController.signal })
                .then(res => res.ok ? res.json() : [])
                .then(data => (Array.isArray(data) ? data : []).map(evt => ({
                    ...evt,
                    stationId: st.id,
                    stationName: st.name
                })))
                .catch(err => {
                    if (err.name !== 'AbortError') return [];
                    throw err;
                });
        });

        Promise.all(fetches)
            .then(results => {
                const combined = results.flat();
                setFetchedKeystrokes(combined);
                setIsLoading(false);
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    setFetchedKeystrokes([]);
                    setIsLoading(false);
                }
            });

        return () => abortController.abort();
    }, [targetStations, baseEpochMs, viewportStartMs, viewportDurationMs, propKeystrokes]);

    const activeKeystrokes = (propKeystrokes !== null && propKeystrokes !== undefined)
        ? propKeystrokes
        : fetchedKeystrokes;

    // Pixel distance clustering algorithm (prevents DOM clutter and tick overlap)
    const clusters = useMemo(() => {
        if (!activeKeystrokes.length || viewportDurationMs <= 0 || pixelWidth <= 0) {
            return [];
        }

        const viewStartEpoch = baseEpochMs + viewportStartMs;
        const viewEndEpoch = viewStartEpoch + viewportDurationMs;

        // Sort ascending by Epoch timestamp
        const sorted = [...activeKeystrokes].sort((a, b) => a.epochMs - b.epochMs);
        const result = [];
        let currentCluster = null;
        let lastPixel = -999;

        for (const evt of sorted) {
            const calibratedEpochMs = evt.epochMs + KEYSTROKE_CALIBRATION_OFFSET_MS;
            if (calibratedEpochMs < viewStartEpoch || calibratedEpochMs > viewEndEpoch) {
                continue;
            }

            const offsetMs = calibratedEpochMs - baseEpochMs;
            const currentPixel = ((offsetMs - viewportStartMs) / viewportDurationMs) * pixelWidth;

            if (currentCluster && (currentPixel - lastPixel) < MIN_PIXEL_DISTANCE) {
                // Merge into existing cluster
                currentCluster.events.push(evt);
                currentCluster.endOffsetMs = offsetMs;
                currentCluster.endEpochMs = calibratedEpochMs;
                const uniqueStations = new Set(currentCluster.events.map(e => e.stationName || e.stationHostname || activeStationName || 'Workstation'));
                currentCluster.isMultiStation = uniqueStations.size > 1;
                currentCluster.stationCount = uniqueStations.size;
                lastPixel = currentPixel;
            } else {
                // Initialize new cluster
                const pct = ((offsetMs - viewportStartMs) / viewportDurationMs) * 100;
                currentCluster = {
                    id: `kc_${evt.epochMs}_${result.length}`,
                    startOffsetMs: offsetMs,
                    endOffsetMs: offsetMs,
                    startEpochMs: calibratedEpochMs,
                    endEpochMs: calibratedEpochMs,
                    pct,
                    events: [evt],
                    isMultiStation: false,
                    stationCount: 1
                };
                result.push(currentCluster);
                lastPixel = currentPixel;
            }
        }

        return result;
    }, [activeKeystrokes, baseEpochMs, viewportStartMs, viewportDurationMs, pixelWidth]);

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

    function formatTooltipTime(epochMs, mode = 'LOCAL') {
        return formatTimelineClock(epochMs, mode);
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
                const isMultiStation = cluster.isMultiStation;
                const badgeText = formatBadgeText(cluster);
                const timeLabel = formatTooltipTime(cluster.startEpochMs, timeMode);
                const edgeClass = cluster.pct < 10 ? 'edge-left' : (cluster.pct > 90 ? 'edge-right' : '');

                // Group cluster events by station
                const stationGroups = {};
                cluster.events.forEach(evt => {
                    const sName = evt.stationName || evt.stationHostname || activeStationName || 'Workstation';
                    if (!stationGroups[sName]) stationGroups[sName] = [];
                    stationGroups[sName].push(evt);
                });

                return (
                    <div
                        key={cluster.id}
                        className={`keystroke-tick-node ${isCluster ? 'is-cluster' : 'is-single'} ${isMultiStation ? 'is-multi-station' : ''}`}
                        style={{ left: `${cluster.pct}%` }}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onSeek) onSeek(cluster.startOffsetMs);
                        }}
                    >
                        <div className="keystroke-tick-line" />
                        <div className="keystroke-pip-anchor" title={`${badgeText} at ${timeLabel}`}>
                            <div className="keystroke-pip-glyph" />
                            {isCluster && (
                                <span className="keystroke-pip-count">
                                    {isMultiStation ? `${cluster.stationCount}S` : (count > 9 ? '9+' : count)}
                                </span>
                            )}
                        </div>

                        {/* Tactical tooltip popover */}
                        <div className={`keystroke-tooltip ${edgeClass}`}>
                            <div className="tooltip-header">
                                <span className="tooltip-type">
                                    {isMultiStation
                                        ? `MULTICAM KEYSTROKES (${cluster.stationCount} WORKSTATIONS • ${count} EVT)`
                                        : (isCluster ? `KEYSTROKE BURST (${count})` : 'KEYSTROKE')}
                                </span>
                                <span className="tooltip-time">{timeLabel}</span>
                            </div>

                            <div className="tooltip-station-sections-container">
                                {Object.entries(stationGroups).map(([stName, stEvents]) => {
                                    const groups = groupClusterEvents(stEvents);
                                    return (
                                        <div key={stName} className="tooltip-station-row">
                                            <div className="station-row-badge">
                                                <span className="station-mini-icon">🖥️</span>
                                                <span className="station-title">{stName}</span>
                                                <span className="station-count">({stEvents.length})</span>
                                            </div>
                                            <div className="tooltip-keys-list">
                                                {groups.slice(0, 6).map((g, idx) => (
                                                    <span key={idx} className="tooltip-key-pill">
                                                        {g.key}{g.count > 1 ? ` ×${g.count}` : ''}
                                                    </span>
                                                ))}
                                                {groups.length > 6 && (
                                                    <span className="tooltip-more">+{groups.length - 6} more</span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
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
