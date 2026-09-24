// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/TimelineTrack.jsx
// ==========================================
import React, { useMemo, useState, useEffect } from 'react';
import { spritesheetStore } from '../../utils/spritesheetStore.js';
import './TimelineTrack.scss';

// טבלת LOD (Level of Detail) הקובעת את רזולוציית הזמן לפי חלון הזום הנוכחי
const getLodConfig = (viewportDurationMs) => {
    if (viewportDurationMs <= 60 * 1000) {
        return { tileDurationMs: 4 * 1000, framesPerTile: 4 };
    } else if (viewportDurationMs <= 5 * 60 * 1000) {
        return { tileDurationMs: 15 * 1000, framesPerTile: 5 };
    } else if (viewportDurationMs <= 30 * 60 * 1000) {
        return { tileDurationMs: 60 * 1000, framesPerTile: 6 };
    } else if (viewportDurationMs <= 2 * 60 * 60 * 1000) {
        return { tileDurationMs: 4 * 60 * 1000, framesPerTile: 6 };
    } else if (viewportDurationMs <= 8 * 60 * 60 * 1000) {
        return { tileDurationMs: 15 * 60 * 1000, framesPerTile: 6 };
    } else {
        return { tileDurationMs: 60 * 60 * 1000, framesPerTile: 6 };
    }
};

const getSegStart = (seg) =>
    seg.startEpochMs ?? seg.startEpoch ?? seg.StartEpoch ?? seg.start ?? (seg.startUtc ? new Date(seg.startUtc).getTime() : 0);

const getSegEnd = (seg) =>
    seg.endEpochMs ?? seg.endEpoch ?? seg.EndEpoch ?? seg.end ?? (seg.endUtc ? new Date(seg.endUtc).getTime() : 0);

export default function TimelineTrack({
    station,
    isActive,
    onSelect,
    viewportStartMs = 0,
    viewportDurationMs = 3600000,
    inPointMs,
    outPointMs,
    baseEpochMs,
    segments: rawSegments = [],
    globalGaps = [],
    disableFilmstrip = false
}) {
    const [tilesMap, setTilesMap] = useState({});
    const [verifiedChunks, setVerifiedChunks] = useState(null);
    const isLoadingChunks = verifiedChunks === null;

    const hostname = station?.hostname || station?.id || station?.name || '';

    // סנכרון רשימת הצ'אנקים מול השרת לכל רוחב ה-Viewport ולא רק בתוך תחום ה-Cut
    useEffect(() => {
        if (!hostname || !baseEpochMs) return;

        let isMounted = true;
        setVerifiedChunks(null);

        const startEpoch = baseEpochMs + Math.round(viewportStartMs || 0);
        const endEpoch = baseEpochMs + Math.round((viewportStartMs + viewportDurationMs) || 0);

        fetch(`/api/v1/extractor-advanced/timeline-segments?stations=${encodeURIComponent(hostname)}&startEpoch=${startEpoch}&endEpoch=${endEpoch}`)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (!isMounted) return;
                if (data && data[hostname] && Array.isArray(data[hostname])) {
                    setVerifiedChunks(data[hostname]);
                } else {
                    setVerifiedChunks([]);
                }
            })
            .catch(() => {
                if (isMounted) setVerifiedChunks([]);
            });

        return () => { isMounted = false; };
    }, [hostname, baseEpochMs, viewportStartMs, viewportDurationMs]);

    const activeSegments = useMemo(() => {
        if (verifiedChunks !== null) return verifiedChunks;
        if (!rawSegments || rawSegments.length === 0) return [];
        return rawSegments.filter(s => {
            const dur = getSegEnd(s) - getSegStart(s);
            return dur > 0;
        });
    }, [verifiedChunks, rawSegments]);

    const lodConfig = useMemo(() => getLodConfig(viewportDurationMs), [viewportDurationMs]);

    // חישוב אריחי ה-LOD עם Frustum Culling
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

                if (clampedEnd <= clampedStart) continue;

                const key = `${hostname}_${clampedStart}_${clampedEnd}_${framesPerTile}`;
                tiles.push({
                    key,
                    sIdx,
                    startEpoch: clampedStart,
                    endEpoch: clampedEnd,
                    framesPerTile
                });
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
                if (tilesMap[tile.key] !== cached) {
                    immediateUpdates[tile.key] = cached;
                    hasImmediate = true;
                }
            } else {
                missingTiles.push(tile);
            }
        });

        if (hasImmediate) {
            setTilesMap(prev => ({ ...prev, ...immediateUpdates }));
        }

        if (missingTiles.length === 0) {
            return () => { isMounted = false; };
        }

        const debounceTimer = setTimeout(() => {
            missingTiles.forEach(tile => {
                spritesheetStore.fetchTile(hostname, tile.startEpoch, tile.endEpoch, tile.framesPerTile, abortController.signal)
                    .then(blobUrl => {
                        if (isMounted && blobUrl) {
                            setTilesMap(prev => ({ ...prev, [tile.key]: blobUrl }));
                        }
                    });
            });
        }, 140);

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

    // סיווג הפערים: תגיות SKIPPED גלובליות מוגבלות לתחום [inPointMs, outPointMs] בלבד
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

        // 1. פערים גלובליים לחיתוך - תקפים רק בתוך גבולות ה-IN וה-OUT
        if (globalGaps && globalGaps.length > 0) {
            globalGaps.forEach((g, idx) => {
                const gStart = g.startEpochMs;
                const gEnd = g.endEpochMs;

                // חיתוך הפער לתחום ה-IN וה-OUT
                const boundedStart = Math.max(gStart, effectiveInEpoch);
                const boundedEnd = Math.min(gEnd, effectiveOutEpoch);

                if (boundedEnd <= boundedStart) return;
                if (boundedEnd <= vpStartEpoch || boundedStart >= vpEndEpoch) return;

                const clStartEpoch = Math.max(vpStartEpoch, boundedStart);
                const clEndEpoch = Math.min(vpEndEpoch, boundedEnd);
                const startMs = clStartEpoch - baseEpochMs;
                const endMs = clEndEpoch - baseEpochMs;

                const widthPct = ((endMs - startMs) / viewportDurationMs) * 100;
                if (widthPct > 0) {
                    resultGaps.push({
                        id: `global-${idx}`,
                        type: 'global',
                        leftPct: ((startMs - vpStart) / viewportDurationMs) * 100,
                        widthPct,
                        durationSec: Math.round((boundedEnd - boundedStart) / 1000)
                    });
                }
            });
        }

        // 2. פערי היעדר אות תחנתיים (מוצגים כ-NO SIGNAL בכל שאר חלקי הטיים-ליין)
        rawStationEmptyRanges.forEach((range, rIdx) => {
            let subRanges = [range];

            if (globalGaps && globalGaps.length > 0) {
                globalGaps.forEach(g => {
                    const boundedStart = Math.max(g.startEpochMs, effectiveInEpoch);
                    const boundedEnd = Math.min(g.endEpochMs, effectiveOutEpoch);

                    if (boundedEnd <= boundedStart) return;

                    const nextSubs = [];
                    subRanges.forEach(sub => {
                        if (boundedEnd <= sub.startEpoch || boundedStart >= sub.endEpoch) {
                            nextSubs.push(sub);
                        } else {
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
                const startMs = clStartEpoch - baseEpochMs;
                const endMs = clEndEpoch - baseEpochMs;

                const widthPct = ((endMs - startMs) / viewportDurationMs) * 100;
                if (widthPct > 0) {
                    resultGaps.push({
                        id: `station-${rIdx}-${sIdx}`,
                        type: 'station',
                        leftPct: ((startMs - vpStart) / viewportDurationMs) * 100,
                        widthPct,
                        durationSec: Math.round((sub.endEpoch - sub.startEpoch) / 1000)
                    });
                }
            });
        });

        return resultGaps;
    }, [activeSegments, globalGaps, baseEpochMs, viewportStartMs, viewportDurationMs, inPointMs, outPointMs]);

    const stationName = station?.displayName || station?.hostname || station?.name || '';

    return (
        <div onClick={onSelect} className={`timeline-track-container ${isActive ? 'active-track' : 'collapsed-track'}`}>
            <div className="track-sidebar">
                <div className={`status-indicator ${station?.isOnline ? 'online' : 'idle'}`} />
                <span className="station-label" title={stationName}>{stationName}</span>
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

                {isLoadingChunks && (
                    <div className="track-loading-overlay">
                        <div className="track-spinner" />
                        <span className="loading-label">SYNCING TRACK...</span>
                    </div>
                )}
            </div>
        </div>
    );
}