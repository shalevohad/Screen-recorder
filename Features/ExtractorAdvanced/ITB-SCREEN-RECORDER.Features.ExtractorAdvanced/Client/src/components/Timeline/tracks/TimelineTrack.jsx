// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/TimelineTrack.jsx
// ==========================================
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { spritesheetStore } from '../../../utils/spritesheetStore.js';
import './TimelineTrack.scss';

const getLodConfig = (viewportDurationMs) => {
    if (viewportDurationMs <= 60 * 1000) return { tileDurationMs: 4 * 1000, framesPerTile: 4 };
    if (viewportDurationMs <= 5 * 60 * 1000) return { tileDurationMs: 15 * 1000, framesPerTile: 5 };
    if (viewportDurationMs <= 30 * 60 * 1000) return { tileDurationMs: 60 * 1000, framesPerTile: 6 };
    if (viewportDurationMs <= 2 * 60 * 60 * 1000) return { tileDurationMs: 4 * 60 * 1000, framesPerTile: 6 };
    if (viewportDurationMs <= 8 * 60 * 60 * 1000) return { tileDurationMs: 15 * 60 * 1000, framesPerTile: 6 };
    return { tileDurationMs: 60 * 60 * 1000, framesPerTile: 6 };
};

const getSegStart = (seg) => seg.startEpochMs ?? seg.startEpoch ?? seg.start ?? 0;
const getSegEnd = (seg) => seg.endEpochMs ?? seg.endEpoch ?? seg.end ?? 0;

export default function TimelineTrack({
    station,
    isActive,
    onSelect,
    onStationContextMenu,
    viewportStartMs = 0,
    viewportDurationMs = 3600000,
    inPointMs,
    outPointMs,
    baseEpochMs,
    segments: rawSegments = [],
    recordingSegments = {},
    globalGaps = [],
    disableFilmstrip = false
}) {
    const [tilesMap, setTilesMap] = useState({});
    const tilesMapRef = useRef(tilesMap);
    tilesMapRef.current = tilesMap;

    const hostname = station?.hostname || station?.name || '';
    const stationId = station?.id || hostname;

    // 💡 תיקון: שליפת המקטעים לפי id התחנה (מניעת Tracks ריקים)
    const activeSegments = useMemo(() => {
        const stationSegs = recordingSegments[stationId] || recordingSegments[hostname] || rawSegments || [];
        if (!stationSegs || stationSegs.length === 0) return [];
        return stationSegs.filter(s => (getSegEnd(s) - getSegStart(s)) > 0);
    }, [recordingSegments, rawSegments, stationId, hostname]);

    const lodConfig = useMemo(() => getLodConfig(viewportDurationMs), [viewportDurationMs]);

    const timelineTiles = useMemo(() => {
        if (disableFilmstrip || activeSegments.length === 0 || !baseEpochMs || viewportDurationMs <= 0) return [];

        const { tileDurationMs, framesPerTile } = lodConfig;
        const tiles = [];

        const vpStartEpoch = baseEpochMs + viewportStartMs;
        const vpEndEpoch = vpStartEpoch + viewportDurationMs;
        const cullStartEpoch = vpStartEpoch - tileDurationMs;
        const cullEndEpoch = vpEndEpoch + tileDurationMs;

        const sorted = [...activeSegments].sort((a, b) => getSegStart(a) - getSegStart(b));

        sorted.forEach((seg, sIdx) => {
            const segStart = Math.round(getSegStart(seg));
            const segEnd = Math.round(getSegEnd(seg));
            if (segEnd <= segStart) return;

            const visibleSegStart = Math.max(segStart, cullStartEpoch);
            const visibleSegEnd = Math.min(segEnd, cullEndEpoch);
            if (visibleSegEnd <= visibleSegStart) return;

            const firstTileStart = Math.floor(visibleSegStart / tileDurationMs) * tileDurationMs;

            for (let tStart = firstTileStart; tStart < visibleSegEnd; tStart += tileDurationMs) {
                const tEnd = tStart + tileDurationMs;
                const clampedStart = Math.max(segStart, tStart);
                const clampedEnd = Math.min(segEnd, tEnd);

                if (clampedEnd > clampedStart) {
                    tiles.push({
                        key: `${hostname}_${clampedStart}_${clampedEnd}_${framesPerTile}`,
                        sIdx,
                        startEpoch: clampedStart,
                        endEpoch: clampedEnd,
                        framesPerTile
                    });
                }
            }
        });

        return tiles;
    }, [activeSegments, baseEpochMs, hostname, disableFilmstrip, viewportStartMs, viewportDurationMs, lodConfig]);

    useEffect(() => {
        if (timelineTiles.length === 0) return;

        let isMounted = true;
        const abortController = new AbortController();

        const missingTiles = [];
        const immediateUpdates = {};
        let hasImmediate = false;

        timelineTiles.forEach(tile => {
            const cached = spritesheetStore.get(hostname, tile.startEpoch, tile.endEpoch, tile.framesPerTile);
            if (cached) {
                if (tilesMapRef.current[tile.key] !== cached) {
                    immediateUpdates[tile.key] = cached;
                    hasImmediate = true;
                }
            } else {
                missingTiles.push(tile);
            }
        });

        if (hasImmediate) {
            Object.assign(tilesMapRef.current, immediateUpdates);
            setTilesMap(prev => ({ ...prev, ...immediateUpdates }));
        }

        if (missingTiles.length === 0) return () => { isMounted = false; };

        // 💡 דיבאונס קצר ומהיר (45ms במקום 140ms)
        const debounceTimer = setTimeout(() => {
            missingTiles.forEach(tile => {
                spritesheetStore.fetchTile(hostname, tile.startEpoch, tile.endEpoch, tile.framesPerTile, abortController.signal)
                    .then(blobUrl => {
                        if (isMounted && blobUrl) {
                            tilesMapRef.current[tile.key] = blobUrl;
                            setTilesMap(prev => ({ ...prev, [tile.key]: blobUrl }));
                        }
                    });
            });
        }, 45);

        return () => {
            isMounted = false;
            clearTimeout(debounceTimer);
            abortController.abort();
        };
    }, [timelineTiles, hostname]);

    const inPercent = ((inPointMs - viewportStartMs) / viewportDurationMs) * 100;
    const outPercent = ((outPointMs - viewportStartMs) / viewportDurationMs) * 100;

    const renderedTiles = useMemo(() => {
        if (timelineTiles.length === 0 || !baseEpochMs || viewportDurationMs <= 0) return [];

        const vpStart = viewportStartMs;
        const vpEnd = viewportStartMs + viewportDurationMs;

        return timelineTiles.map(tile => {
            const startMs = tile.startEpoch - baseEpochMs;
            const endMs = tile.endEpoch - baseEpochMs;

            if (endMs <= vpStart || startMs >= vpEnd) return null;

            const clStart = Math.max(vpStart, startMs);
            const clEnd = Math.min(vpEnd, endMs);

            return {
                key: tile.key,
                spriteUrl: tilesMap[tile.key] || null,
                leftPct: ((clStart - vpStart) / viewportDurationMs) * 100,
                widthPct: ((clEnd - clStart) / viewportDurationMs) * 100
            };
        }).filter(Boolean);
    }, [timelineTiles, baseEpochMs, viewportStartMs, viewportDurationMs, tilesMap]);

    const recordedBars = useMemo(() => {
        if (activeSegments.length === 0 || !baseEpochMs || viewportDurationMs <= 0) return [];
        const vpStart = viewportStartMs;
        const vpEnd = viewportStartMs + viewportDurationMs;

        return activeSegments.map((seg, idx) => {
            const startMs = Math.round(getSegStart(seg)) - baseEpochMs;
            const endMs = Math.round(getSegEnd(seg)) - baseEpochMs;
            if (endMs <= vpStart || startMs >= vpEnd) return null;

            const clStart = Math.max(vpStart, startMs);
            const clEnd = Math.min(vpEnd, endMs);

            return {
                id: idx,
                leftPct: ((clStart - vpStart) / viewportDurationMs) * 100,
                widthPct: ((clEnd - clStart) / viewportDurationMs) * 100
            };
        }).filter(Boolean);
    }, [activeSegments, baseEpochMs, viewportStartMs, viewportDurationMs]);

    const classifiedGaps = useMemo(() => {
        if (!baseEpochMs || viewportDurationMs <= 0) return [];

        const sorted = [...activeSegments].sort((a, b) => getSegStart(a) - getSegStart(b));
        const rawStationEmptyRanges = [];
        const vpStart = viewportStartMs;
        const vpEnd = viewportStartMs + viewportDurationMs;
        const vpStartEpoch = baseEpochMs + vpStart;
        const vpEndEpoch = baseEpochMs + vpEnd;

        const effectiveInEpoch = baseEpochMs + (inPointMs !== undefined ? inPointMs : vpStart);
        const effectiveOutEpoch = baseEpochMs + (outPointMs !== undefined ? outPointMs : vpEnd);

        if (sorted.length > 0) {
            const firstSegStart = getSegStart(sorted[0]);
            if (firstSegStart > vpStartEpoch) rawStationEmptyRanges.push({ startEpoch: vpStartEpoch, endEpoch: firstSegStart });
        } else if (viewportDurationMs > 0) {
            rawStationEmptyRanges.push({ startEpoch: vpStartEpoch, endEpoch: vpEndEpoch });
        }

        for (let i = 0; i < sorted.length - 1; i++) {
            const currentEnd = getSegEnd(sorted[i]);
            const nextStart = getSegStart(sorted[i + 1]);
            if (nextStart - currentEnd > 1000) rawStationEmptyRanges.push({ startEpoch: currentEnd, endEpoch: nextStart });
        }

        if (sorted.length > 0) {
            const lastSegEnd = getSegEnd(sorted[sorted.length - 1]);
            if (lastSegEnd < vpEndEpoch) rawStationEmptyRanges.push({ startEpoch: lastSegEnd, endEpoch: vpEndEpoch });
        }

        const resultGaps = [];

        if (globalGaps && globalGaps.length > 0) {
            globalGaps.forEach((g, idx) => {
                const boundedStart = Math.max(g.startEpochMs, effectiveInEpoch);
                const boundedEnd = Math.min(g.endEpochMs, effectiveOutEpoch);

                if (boundedEnd > boundedStart && boundedEnd > vpStartEpoch && boundedStart < vpEndEpoch) {
                    const clStartEpoch = Math.max(vpStartEpoch, boundedStart);
                    const clEndEpoch = Math.min(vpEndEpoch, boundedEnd);
                    const widthPct = (((clEndEpoch - baseEpochMs) - (clStartEpoch - baseEpochMs)) / viewportDurationMs) * 100;

                    if (widthPct > 0) {
                        resultGaps.push({
                            id: `global-${idx}`,
                            type: 'global',
                            leftPct: (((clStartEpoch - baseEpochMs) - vpStart) / viewportDurationMs) * 100,
                            widthPct,
                            durationSec: Math.round((boundedEnd - boundedStart) / 1000)
                        });
                    }
                }
            });
        }

        rawStationEmptyRanges.forEach((range, rIdx) => {
            let subRanges = [range];
            if (globalGaps && globalGaps.length > 0) {
                globalGaps.forEach(g => {
                    const boundedStart = Math.max(g.startEpochMs, effectiveInEpoch);
                    const boundedEnd = Math.min(g.endEpochMs, effectiveOutEpoch);
                    if (boundedEnd <= boundedStart) return;

                    const nextSubs = [];
                    subRanges.forEach(sub => {
                        if (boundedEnd <= sub.startEpoch || boundedStart >= sub.endEpoch) nextSubs.push(sub);
                        else {
                            if (boundedStart > sub.startEpoch) nextSubs.push({ startEpoch: sub.startEpoch, endEpoch: boundedStart });
                            if (boundedEnd < sub.endEpoch) nextSubs.push({ startEpoch: boundedEnd, endEpoch: sub.endEpoch });
                        }
                    });
                    subRanges = nextSubs;
                });
            }

            subRanges.forEach((sub, sIdx) => {
                if (sub.endEpoch - sub.startEpoch < 1000 || sub.endEpoch <= vpStartEpoch || sub.startEpoch >= vpEndEpoch) return;

                const clStartEpoch = Math.max(vpStartEpoch, sub.startEpoch);
                const clEndEpoch = Math.min(vpEndEpoch, sub.endEpoch);
                const widthPct = (((clEndEpoch - baseEpochMs) - (clStartEpoch - baseEpochMs)) / viewportDurationMs) * 100;

                if (widthPct > 0) {
                    resultGaps.push({
                        id: `station-${rIdx}-${sIdx}`,
                        type: 'station',
                        leftPct: (((clStartEpoch - baseEpochMs) - vpStart) / viewportDurationMs) * 100,
                        widthPct,
                        durationSec: Math.round((sub.endEpoch - sub.startEpoch) / 1000)
                    });
                }
            });
        });

        return resultGaps;
    }, [activeSegments, globalGaps, baseEpochMs, viewportStartMs, viewportDurationMs, inPointMs, outPointMs]);

    const stationDisplayName = station?.displayName || station?.hostname || station?.name || '';

    return (
        <div
            onClick={onSelect}
            onContextMenu={(e) => {
                if (onStationContextMenu) {
                    e.preventDefault();
                    e.stopPropagation();
                    onStationContextMenu(e, station);
                }
            }}
            className={`timeline-track-container ${isActive ? 'active-track' : 'collapsed-track'}`}
        >
            <div className="track-sidebar" title={`Right-click to deselect ${stationDisplayName}`}>
                <div className={`status-indicator ${station?.isOnline ? 'online' : 'idle'}`} />
                <span className="station-label" title={stationDisplayName}>{stationDisplayName}</span>
            </div>

            <div className="track-canvas">
                <div className="full-height-gaps-layer">
                    {classifiedGaps.map(gap => (
                        <div
                            key={gap.id}
                            className={`gap-full-block ${gap.type === 'global' ? 'gap-global-skipped' : 'gap-station-signal'}`}
                            style={{ left: `${gap.leftPct}%`, width: `${gap.widthPct}%` }}
                            title={gap.type === 'global' ? `Shared Gap: ${gap.durationSec}s will be skipped` : `Station Gap: ${gap.durationSec}s No-Signal`}
                        >
                            <div className="gap-pattern" />
                            {gap.widthPct > 5 && (
                                <div className={`gap-badge ${gap.type === 'global' ? 'global-badge' : ''}`}>
                                    <span>{gap.type === 'global' ? `✂ SKIPPED (${gap.durationSec}s)` : 'NO SIGNAL'}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {!disableFilmstrip && (
                    <div className="spritesheet-filmstrip-layer">
                        {renderedTiles.map(tile => (
                            <div
                                key={tile.key}
                                className={`spritesheet-tile-block ${tile.spriteUrl ? 'is-loaded' : 'is-loading'}`}
                                style={{
                                    position: 'absolute',
                                    left: `${tile.leftPct}%`,
                                    width: `${tile.widthPct}%`,
                                    height: '100%',
                                    backgroundImage: tile.spriteUrl ? `url("${tile.spriteUrl}")` : 'none',
                                    backgroundSize: '100% 100%',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                                    transition: 'opacity 0.25s ease'
                                }}
                            >
                                {!tile.spriteUrl && (
                                    <div className="tile-shimmer-loader">
                                        <div className="shimmer-wave" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <div className="data-presence-layer">
                    {recordedBars.map(bar => (
                        <div
                            key={`bar_${bar.id}`}
                            className="data-presence-bar"
                            style={{ left: `${bar.leftPct}%`, width: `${bar.widthPct}%` }}
                        />
                    ))}
                </div>

                {inPercent > 0 && <div className="mask-dimmed left-mask" style={{ width: `${Math.min(100, inPercent)}%` }} />}
                {outPercent < 100 && <div className="mask-dimmed right-mask" style={{ left: `${Math.max(0, outPercent)}%`, right: 0 }} />}
            </div>
        </div>
    );
}