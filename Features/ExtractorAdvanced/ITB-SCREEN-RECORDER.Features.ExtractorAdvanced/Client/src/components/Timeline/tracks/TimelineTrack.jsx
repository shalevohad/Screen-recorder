// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/tracks/TimelineTrack.jsx
// ==========================================
import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { spritesheetStore } from '../../../utils/spritesheetStore.js';
import './TimelineTrack.scss';
import { cleanDirectorSegmentsWithGaps } from '../../../utils/nleTimelineEngine.js';

const getLodConfig = (viewportDurationMs) => {
    if (viewportDurationMs <= 60 * 1000) return { tileDurationMs: 5 * 1000, framesPerTile: 4 };
    if (viewportDurationMs <= 5 * 60 * 1000) return { tileDurationMs: 20 * 1000, framesPerTile: 4 };
    if (viewportDurationMs <= 30 * 60 * 1000) return { tileDurationMs: 2 * 60 * 1000, framesPerTile: 4 };
    if (viewportDurationMs <= 2 * 60 * 60 * 1000) return { tileDurationMs: 8 * 60 * 1000, framesPerTile: 5 };
    if (viewportDurationMs <= 8 * 60 * 60 * 1000) return { tileDurationMs: 30 * 60 * 1000, framesPerTile: 5 };
    if (viewportDurationMs <= 24 * 60 * 60 * 1000) return { tileDurationMs: 2 * 60 * 60 * 1000, framesPerTile: 5 };
    if (viewportDurationMs <= 72 * 60 * 60 * 1000) return { tileDurationMs: 6 * 60 * 60 * 1000, framesPerTile: 4 };
    if (viewportDurationMs <= 7 * 24 * 60 * 60 * 1000) return { tileDurationMs: 14 * 60 * 60 * 1000, framesPerTile: 4 };
    const autoTileMs = Math.max(24 * 60 * 60 * 1000, Math.round(viewportDurationMs / 14));
    return { tileDurationMs: autoTileMs, framesPerTile: 4 };
};

const getSegStart = (seg) => seg.startEpochMs ?? seg.StartEpochMs ?? seg.startEpoch ?? seg.start ?? 0;
const getSegEnd = (seg) => seg.endEpochMs ?? seg.EndEpochMs ?? seg.endEpoch ?? seg.end ?? 0;

/**
 * Sub-component for rendering a filmstrip canvas (used by both collapsed station composite and expanded child displays)
 */
function FilmstripCanvas({
    hostname,
    displayId = 'mon-0',
    activeSegments = [],
    viewportStartMs = 0,
    viewportDurationMs = 3600000,
    baseEpochMs = 0,
    inPointMs = 0,
    outPointMs = 3600000,
    globalGaps = [],
    gaps = [],
    directorSegments = [],
    isAutoDirectorEnabled = false,
    showDirectorCoverage = false,
    stepperSegments = null
}) {
    const [tilesMap, setTilesMap] = useState({});
    const tilesMapRef = useRef(tilesMap);
    tilesMapRef.current = tilesMap;

    const lodConfig = useMemo(() => getLodConfig(viewportDurationMs), [viewportDurationMs]);

    const timelineTiles = useMemo(() => {
        if (activeSegments.length === 0 || !baseEpochMs || viewportDurationMs <= 0) return [];
        const { tileDurationMs, framesPerTile } = lodConfig;
        const tiles = [];
        const vpStartEpoch = baseEpochMs + viewportStartMs;
        const vpEndEpoch = vpStartEpoch + viewportDurationMs;
        const cullStartEpoch = vpStartEpoch - tileDurationMs;
        const cullEndEpoch = vpEndEpoch + tileDurationMs;

        const sorted = [...activeSegments].sort((a, b) => getSegStart(a) - getSegStart(b));

        const allGapsToCheck = [...(globalGaps || []), ...(gaps || [])];
        const isTileInGap = (tStart, tEnd) => {
            if (!allGapsToCheck || allGapsToCheck.length === 0) return false;
            return allGapsToCheck.some(g => {
                const gs = g.startEpochMs ?? g.startEpoch ?? g.start ?? 0;
                const ge = g.endEpochMs ?? g.endEpoch ?? g.end ?? 0;
                if (ge <= gs) return false;
                return Math.max(tStart, gs) < Math.min(tEnd, ge);
            });
        };

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

                // Invariant: NEVER generate or request filmstrip tiles inside any GAP region
                if (clampedEnd > clampedStart && !isTileInGap(clampedStart, clampedEnd)) {
                    tiles.push({
                        key: `${hostname}_${displayId}_${clampedStart}_${clampedEnd}_${framesPerTile}`,
                        sIdx,
                        startEpoch: clampedStart,
                        endEpoch: clampedEnd,
                        framesPerTile,
                        displayId
                    });
                }
            }
        });

        if (tiles.length > 20) {
            const centerEpoch = baseEpochMs + viewportStartMs + (viewportDurationMs / 2);
            tiles.sort((a, b) => {
                const distA = Math.abs((a.startEpoch + a.endEpoch) / 2 - centerEpoch);
                const distB = Math.abs((b.startEpoch + b.endEpoch) / 2 - centerEpoch);
                return distA - distB;
            });
            tiles.length = 20;
            tiles.sort((a, b) => a.startEpoch - b.startEpoch);
        }

        return tiles;
    }, [activeSegments, baseEpochMs, hostname, displayId, viewportStartMs, viewportDurationMs, lodConfig]);

    useEffect(() => {
        if (timelineTiles.length === 0) return;
        let isMounted = true;
        const abortController = new AbortController();

        const missingTiles = [];
        const immediateUpdates = {};
        let hasImmediate = false;

        timelineTiles.forEach(tile => {
            const cached = spritesheetStore.get(hostname, tile.startEpoch, tile.endEpoch, tile.framesPerTile, displayId);
            if (cached) {
                if (tilesMapRef.current[tile.key] !== cached) {
                    immediateUpdates[tile.key] = cached;
                    hasImmediate = true;
                }
            } else {
                missingTiles.push(tile);
            }
        });

        const visibleKeySet = new Set(timelineTiles.map(t => t.key));
        const currentMap = tilesMapRef.current;
        const pruned = {};
        let needsPrune = false;
        Object.keys(currentMap).forEach(k => {
            if (visibleKeySet.has(k)) {
                pruned[k] = currentMap[k];
            } else {
                needsPrune = true;
            }
        });

        if (hasImmediate || needsPrune) {
            const nextMap = { ...pruned, ...immediateUpdates };
            tilesMapRef.current = nextMap;
            setTilesMap(nextMap);
        }

        if (missingTiles.length === 0) return () => { isMounted = false; };

        const debounceTimer = setTimeout(() => {
            missingTiles.forEach(tile => {
                spritesheetStore.fetchTile(hostname, tile.startEpoch, tile.endEpoch, tile.framesPerTile, abortController.signal, displayId)
                    .then(blobUrl => {
                        if (isMounted && blobUrl) {
                            tilesMapRef.current[tile.key] = blobUrl;
                            setTilesMap(prev => ({ ...prev, [tile.key]: blobUrl }));
                        }
                    });
            });
        }, 150);

        return () => {
            isMounted = false;
            clearTimeout(debounceTimer);
            abortController.abort();
        };
    }, [timelineTiles, hostname, displayId]);

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
                const boundedStart = Math.max(g.startEpochMs ?? g.StartEpochMs, effectiveInEpoch);
                const boundedEnd = Math.min(g.endEpochMs ?? g.EndEpochMs, effectiveOutEpoch);

                if (boundedEnd > boundedStart && boundedEnd > vpStartEpoch && boundedStart < vpEndEpoch) {
                    const clStartEpoch = Math.max(vpStartEpoch, boundedStart);
                    const clEndEpoch = Math.min(vpEndEpoch, boundedEnd);
                    const widthPct = (((clEndEpoch - baseEpochMs) - (clStartEpoch - baseEpochMs)) / viewportDurationMs) * 100;

                    if (widthPct > 0) {
                        resultGaps.push({
                            id: `global-${idx}`,
                            type: 'global',
                            startEpoch: clStartEpoch,
                            endEpoch: clEndEpoch,
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
                    const boundedStart = Math.max(g.startEpochMs ?? g.StartEpochMs, effectiveInEpoch);
                    const boundedEnd = Math.min(g.endEpochMs ?? g.EndEpochMs, effectiveOutEpoch);
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
                        startEpoch: clStartEpoch,
                        endEpoch: clEndEpoch,
                        leftPct: (((clStartEpoch - baseEpochMs) - vpStart) / viewportDurationMs) * 100,
                        widthPct,
                        durationSec: Math.round((sub.endEpoch - sub.startEpoch) / 1000)
                    });
                }
            });
        });

        return resultGaps;
    }, [activeSegments, globalGaps, baseEpochMs, viewportStartMs, viewportDurationMs, inPointMs, outPointMs]);

    // Director Coverage Highlights for child display tracks
    const coverageBlocks = useMemo(() => {
        if (!showDirectorCoverage || !isAutoDirectorEnabled || !directorSegments || directorSegments.length === 0) return [];
        const normDisplayId = (displayId || 'mon-0').toLowerCase();
        const vpStart = viewportStartMs;
        const vpEnd = viewportStartMs + viewportDurationMs;

        return directorSegments.map((seg, idx) => {
            const startMs = (seg.startEpochMs ?? seg.StartEpochMs ?? 0) - baseEpochMs;
            const endMs = (seg.endEpochMs ?? seg.EndEpochMs ?? 0) - baseEpochMs;
            if (endMs <= vpStart || startMs >= vpEnd) return null;

            const clStart = Math.max(vpStart, startMs);
            const clEnd = Math.min(vpEnd, endMs);
            const leftPct = ((clStart - vpStart) / viewportDurationMs) * 100;
            const widthPct = ((clEnd - clStart) / viewportDurationMs) * 100;
            if (widthPct <= 0) return null;

            const target = (seg.targetDisplayId || seg.TargetDisplayId || 'mon-0').toLowerCase();
            const isFeatured = (target === normDisplayId);

            return {
                id: `cov_${idx}`,
                isFeatured,
                leftPct,
                widthPct
            };
        }).filter(Boolean);
    }, [showDirectorCoverage, isAutoDirectorEnabled, directorSegments, displayId, baseEpochMs, viewportStartMs, viewportDurationMs]);

    return (
        <div className="track-canvas">
            {/* Gaps Layer */}
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

            {/* Spritesheet Filmstrip Layer */}
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

            {/* Director Coverage Highlights (Dimmed mask on inactive intervals, Glowing cyan border on active) */}
            {coverageBlocks.map(blk => (
                blk.isFeatured ? (
                    <div
                        key={blk.id}
                        className="director-active-coverage-highlight"
                        style={{ left: `${blk.leftPct}%`, width: `${blk.widthPct}%` }}
                        title="Display Featured by Auto-Director"
                    >
                        
                    </div>
                ) : (
                    <div
                        key={blk.id}
                        className="director-mask-dimmed"
                        style={{ left: `${blk.leftPct}%`, width: `${blk.widthPct}%` }}
                        title="Display Off-Air (Masked by Auto-Director)"
                    />
                )
            ))}

            {/* Health Bar (Thin 3px line indicating video presence) */}
            <div className={`data-presence-layer ${stepperSegments ? 'has-stepper' : ''}`}>
                {recordedBars.map(bar => (
                    <div
                        key={`bar_${bar.id}`}
                        className="data-presence-bar"
                        style={{ left: `${bar.leftPct}%`, width: `${bar.widthPct}%` }}
                    />
                ))}
            </div>

            {/* Director Stepper Ribbon (Only on Collapsed Station Bar with Multi-Screens) */}
            {stepperSegments && stepperSegments.length > 0 && (
                <div className="director-stepper-ribbon">
                    {isAutoDirectorEnabled ? (
                        <>
                            {stepperSegments.map((st, sIdx) => (
                                <div
                                    key={`stp_${sIdx}`}
                                    className={`stepper-block display-${st.dispNum}`}
                                    style={{ left: `${st.leftPct}%`, width: `${st.widthPct}%` }}
                                    title={`Auto-Director: Screen ${st.dispNum} (${st.dispLabel})`}
                                >
                                    <span>{st.dispNum}</span>
                                </div>
                            ))}
                            {/* In GAP regions, zero cuts or screen switches appear */}
                            {classifiedGaps && classifiedGaps.map(gap => (
                                <div
                                    key={`gap_stp_${gap.id}`}
                                    className={`stepper-gap-block ${gap.type === 'global' ? 'gap-global' : 'gap-station'}`}
                                    style={{ left: `${gap.leftPct}%`, width: `${gap.widthPct}%` }}
                                    title={gap.type === 'global' ? `Global Gap: ${gap.durationSec}s skipped in export (No switches)` : `Station Gap: ${gap.durationSec}s No Signal (No switches)`}
                                >
                                    {gap.widthPct > 6 && (
                                        <span className="stepper-gap-badge">
                                            {gap.type === 'global' ? '✂ SKIPPED' : 'NO SIGNAL'}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="stepper-block-manual" title="Auto-Director is OFF — Displaying Screen 1 (Manual Mode)">
                            <span>✋ AUTO-DIRECTOR OFF • SCREEN 1 (MANUAL)</span>
                        </div>
                    )}
                </div>
            )}

            {/* Global Cut-In / Cut-Out Dimmed Masks */}
            {inPercent > 0 && <div className="mask-dimmed left-mask" style={{ width: `${Math.min(100, inPercent)}%` }} />}
            {outPercent < 100 && <div className="mask-dimmed right-mask" style={{ left: `${Math.max(0, outPercent)}%`, right: 0 }} />}
        </div>
    );
}

/**
 * Main TimelineTrack Component supporting:
 * 1. Collapsed Mode: Clean Single-Line Sidebar + Central Filmstrip + Health Bar + 12px Director Stepper Ribbon [1|2|1]
 * 2. Expanded Mode: Streamlined Single-Line Header + Multi-Screen Child Tracks with Director Coverage Masking
 */
export default function TimelineTrack({
    station,
    isExpanded = false,
    onToggleExpand,
    isAutoDirectorEnabled = true,
    onToggleAutoDirector,
    canvasPlacements = [],
    onToggleDisplayOnCanvas,
    directorPlan = null,
    isActive = true,
    onSelect,
    onStationContextMenu,
    onDeselectStation,
    viewportStartMs = 0,
    viewportDurationMs = 3600000,
    inPointMs = 0,
    outPointMs = 3600000,
    baseEpochMs = 0,
    segments: rawSegments = [],
    recordingSegments = {},
    globalGaps = []
}) {
    const hostname = station?.hostname || station?.name || '';
    const stationId = station?.id || hostname;
    const stationDisplayName = station?.displayName || station?.roleAlias || station?.hostname || station?.name || '';
    const physicalHost = station?.hostname || '';

    const stationDisplays = useMemo(() => {
        return station?.displays || station?.Displays || station?.displayTopology?.displays || station?.DisplayTopology?.Displays || station?.topology?.displays || [{ displayId: 'mon-0', displayName: 'Screen 1', isPrimary: true, width: 1920, height: 1080 }];
    }, [station]);

    const primaryDisplayId = useMemo(() => {
        const found = stationDisplays.find(d => d.isPrimary || d.IsPrimary);
        return (found?.displayId || found?.DisplayId || stationDisplays[0]?.displayId || stationDisplays[0]?.DisplayId || 'mon-0').toLowerCase();
    }, [stationDisplays]);

    // Director Plan Segments (supporting both PascalCase and camelCase)
    const effectiveDirectorPlan = directorPlan || station?.directorPlan || station?.DirectorPlan;
    const rawDirectorSegments = useMemo(() => {
        return effectiveDirectorPlan?.segments || effectiveDirectorPlan?.Segments || [];
    }, [effectiveDirectorPlan]);

    const hasDirectorCuts = rawDirectorSegments && rawDirectorSegments.length > 0;
    const hasMultiDisplays = stationDisplays.length > 1 || hasDirectorCuts;

    // Retrieve active recording segments with resilient case-insensitive key lookup
    const activeSegments = useMemo(() => {
        let segs = recordingSegments[stationId] || recordingSegments[hostname] || rawSegments || [];
        if (!segs || segs.length === 0) {
            const lowerId = (stationId || '').toLowerCase();
            const lowerHost = (hostname || '').toLowerCase();
            for (const [k, v] of Object.entries(recordingSegments || {})) {
                const lk = k.toLowerCase();
                if ((lowerId && lk === lowerId) || (lowerHost && lk === lowerHost)) {
                    segs = v;
                    break;
                }
            }
        }
        if (!segs || segs.length === 0) segs = station?.segments || station?.Segments || [];
        if (!segs || segs.length === 0) {
            for (const d of stationDisplays) {
                const dSegs = d.segments || d.Segments || [];
                if (dSegs.length > 0) {
                    segs = dSegs;
                    break;
                }
            }
        }
        return (segs || []).filter(s => (getSegEnd(s) - getSegStart(s)) > 0);
    }, [recordingSegments, rawSegments, stationId, hostname, station, stationDisplays]);

    // All known gaps for this station (global gaps, leading/trailing gaps, and empty recording holes)
    const stationGaps = useMemo(() => {
        if (!baseEpochMs || viewportDurationMs <= 0) return [];
        const sorted = [...activeSegments].sort((a, b) => getSegStart(a) - getSegStart(b));
        const gaps = [];
        const vpEndEpoch = baseEpochMs + viewportDurationMs;

        if (globalGaps && globalGaps.length > 0) {
            globalGaps.forEach(g => {
                const s = g.startEpochMs ?? g.StartEpochMs ?? 0;
                const e = g.endEpochMs ?? g.EndEpochMs ?? 0;
                if (e > s) gaps.push({ startEpoch: s, endEpoch: e, type: 'global' });
            });
        }

        if (sorted.length === 0) {
            gaps.push({ startEpoch: baseEpochMs, endEpoch: vpEndEpoch, type: 'station' });
            return gaps;
        }

        // Leading gap before first recording segment
        const firstSegStart = Math.round(getSegStart(sorted[0]));
        if (firstSegStart - baseEpochMs > 2000) {
            const isCovered = gaps.some(g => g.type === 'global' && g.startEpoch <= baseEpochMs && g.endEpoch >= firstSegStart);
            if (!isCovered) {
                gaps.push({ startEpoch: baseEpochMs, endEpoch: firstSegStart, type: 'station' });
            }
        }

        // Internal gaps between recordings
        for (let i = 0; i < sorted.length - 1; i++) {
            const cEnd = Math.round(getSegEnd(sorted[i]));
            const nStart = Math.round(getSegStart(sorted[i + 1]));
            if (nStart - cEnd > 2000) {
                const isCovered = gaps.some(g => g.type === 'global' && g.startEpoch <= cEnd && g.endEpoch >= nStart);
                if (!isCovered) {
                    gaps.push({ startEpoch: cEnd, endEpoch: nStart, type: 'station' });
                }
            }
        }

        // Trailing gap after last recording segment
        const lastSegEnd = Math.round(getSegEnd(sorted[sorted.length - 1]));
        if (vpEndEpoch - lastSegEnd > 2000) {
            const isCovered = gaps.some(g => g.type === 'global' && g.startEpoch <= lastSegEnd && g.endEpoch >= vpEndEpoch);
            if (!isCovered) {
                gaps.push({ startEpoch: lastSegEnd, endEpoch: vpEndEpoch, type: 'station' });
            }
        }

        return gaps;
    }, [activeSegments, globalGaps, baseEpochMs, viewportDurationMs]);

    // Rule 13 & 2026-11-04 Update: Auto-Director is strictly forbidden from selecting or covering GLOBAL GAPS.
    // Global gaps must remain completely unselected ('לא בחורים').
    // Only local gaps (station-specific gaps with 'No Signal' synthetic slate) remain covered without cuts.
    const gapCleanDirectorSegments = useMemo(() => {
        return cleanDirectorSegmentsWithGaps(rawDirectorSegments, stationGaps, globalGaps);
    }, [rawDirectorSegments, stationGaps, globalGaps]);

    // Stepper segments for collapsed view
    const stepperSegments = useMemo(() => {
        if (!hasDirectorCuts || viewportDurationMs <= 0) return null;
        const vpStart = viewportStartMs;
        const vpEnd = viewportStartMs + viewportDurationMs;

        return gapCleanDirectorSegments.map((seg, idx) => {
            const startMs = (seg.startEpochMs ?? seg.StartEpochMs ?? 0) - baseEpochMs;
            const endMs = (seg.endEpochMs ?? seg.EndEpochMs ?? 0) - baseEpochMs;
            if (endMs <= vpStart || startMs >= vpEnd) return null;

            const clStart = Math.max(vpStart, startMs);
            const clEnd = Math.min(vpEnd, endMs);
            const leftPct = ((clStart - vpStart) / viewportDurationMs) * 100;
            const widthPct = ((clEnd - clStart) / viewportDurationMs) * 100;
            if (widthPct <= 0) return null;

            const targetId = (seg.targetDisplayId || seg.TargetDisplayId || 'mon-0').toLowerCase();
            const dispIdx = stationDisplays.findIndex(d => (d.displayId || d.DisplayId || '').toLowerCase() === targetId);
            let dispNum = dispIdx >= 0 ? (dispIdx + 1) : null;
            if (!dispNum) {
                const match = targetId.match(/\d+/);
                dispNum = match ? parseInt(match[0], 10) + 1 : 1;
            }
            const dispLabel = dispIdx >= 0 ? (stationDisplays[dispIdx].displayName || stationDisplays[dispIdx].DisplayName || `Screen ${dispNum}`) : `Screen ${dispNum}`;

            return {
                id: idx,
                dispNum,
                dispLabel,
                leftPct,
                widthPct
            };
        }).filter(Boolean);
    }, [hasDirectorCuts, gapCleanDirectorSegments, stationDisplays, baseEpochMs, viewportStartMs, viewportDurationMs]);

    // Check if display is on canvas
    const isDisplayOnCanvas = useCallback((dispId) => {
        const norm = (dispId || 'mon-0').toLowerCase();
        return canvasPlacements.some(p => p.stationId === stationId && (p.displayId || 'mon-0').toLowerCase() === norm);
    }, [canvasPlacements, stationId]);

    // -------------------------------------------------------------
    // RENDER: COLLAPSED VIEW (Single Line, Minimum Icons, Zero Vertical Wrapping)
    // -------------------------------------------------------------
    if (!isExpanded) {
        return (
            <div
                onClick={() => {
                    if (onSelect) onSelect();
                    if (hasMultiDisplays && onToggleExpand) {
                        onToggleExpand();
                    }
                }}
                onContextMenu={(e) => {
                    if (onStationContextMenu) {
                        e.preventDefault();
                        e.stopPropagation();
                        onStationContextMenu(e, station);
                    }
                }}
                className={`timeline-track-container station-collapsed-track ${isActive ? 'active-track' : ''} ${hasMultiDisplays ? 'has-stepper' : ''}`}
            >
                <div
                    className="track-sidebar station-collapsed-sidebar"
                    title={`Workstation: ${stationDisplayName}${physicalHost ? ` (${physicalHost})` : ''} • Click to select / expand`}
                >
                    <button
                        type="button"
                        className="btn-accordion-toggle"
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleExpand?.();
                        }}
                        title={isExpanded ? "Collapse station tracks" : "Expand station tracks"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="11" height="11">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                    <div className={`status-indicator ${station?.isOnline ? 'online' : 'idle'}`} />
                    <span className="station-single-label" title={stationDisplayName}>
                        {stationDisplayName}
                    </span>
                    {onToggleAutoDirector && (
                        <button
                            type="button"
                            className={`btn-track-auto-dir-pill ${isAutoDirectorEnabled ? 'is-active' : 'is-inactive'}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleAutoDirector(station.id);
                            }}
                            title={isAutoDirectorEnabled ? 'Auto-Director is Active. Click to turn OFF' : 'Auto-Director is OFF. Click to turn ON'}
                        >
                            {isAutoDirectorEnabled ? '⚡ AUTO' : '✋ OFF'}
                        </button>
                    )}
                    {onDeselectStation && (
                        <button
                            type="button"
                            className="btn-track-deselect"
                            title={`Remove ${stationDisplayName} from project`}
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeselectStation(station.id);
                            }}
                        >
                            ✕
                        </button>
                    )}
                </div>

                <FilmstripCanvas
                    hostname={hostname}
                    displayId={primaryDisplayId}
                    activeSegments={activeSegments}
                    viewportStartMs={viewportStartMs}
                    viewportDurationMs={viewportDurationMs}
                    baseEpochMs={baseEpochMs}
                    inPointMs={inPointMs}
                    outPointMs={outPointMs}
                    globalGaps={globalGaps}
                    isAutoDirectorEnabled={isAutoDirectorEnabled}
                    gaps={stationGaps}
                    stepperSegments={hasMultiDisplays ? stepperSegments : null}
                />
            </div>
        );
    }

    // -------------------------------------------------------------
    // RENDER: EXPANDED ACCORDION VIEW (Streamlined Single Line Header, Minimum Icons)
    // -------------------------------------------------------------
    return (
        <div className="timeline-station-accordion-group">
            {/* 1. Accordion Header Bar: Aligns with 200px sidebar, Zero Wrapping, Always Accessible Auto-Director */}
            <div className="station-accordion-header">
                <div className="accordion-header-left">
                    <button
                        type="button"
                        className="btn-accordion-toggle is-open"
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleExpand?.();
                        }}
                        title="Collapse station tracks"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="11" height="11">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>
                    <div className={`status-indicator ${station?.isOnline ? 'online' : 'idle'}`} />
                    <span className="station-accordion-title" title={stationDisplayName}>
                        {stationDisplayName}
                    </span>
                    {onToggleAutoDirector && (
                        <button
                            type="button"
                            className={`btn-track-auto-dir-pill ${isAutoDirectorEnabled ? 'is-active' : 'is-inactive'}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleAutoDirector(station.id);
                            }}
                            title={isAutoDirectorEnabled ? 'Auto-Director is Active. Click to turn OFF' : 'Auto-Director is OFF. Click to turn ON'}
                        >
                            {isAutoDirectorEnabled ? '⚡ AUTO' : '✋ OFF'}
                        </button>
                    )}
                </div>

                <div className="accordion-header-timeline">
                    {onToggleAutoDirector && (
                        <button
                            type="button"
                            className={`btn-station-auto-director ${isAutoDirectorEnabled ? 'is-active' : 'is-inactive'}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleAutoDirector(station.id);
                            }}
                            title={isAutoDirectorEnabled ? 'Auto-Director is Active. Click to turn OFF for manual multi-screen canvas placement.' : 'Auto-Director is OFF. Primary screen active. Click to re-enable Auto-Director.'}
                        >
                            <span className="dot" />
                            <span>{isAutoDirectorEnabled ? '⚡ AUTO-DIRECTOR: ON' : '✋ AUTO-DIRECTOR: OFF'}</span>
                        </button>
                    )}

                    <button
                        type="button"
                        className="btn-close-accordion"
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleExpand?.();
                        }}
                        title="Close station expansion"
                    >
                        CLOSE ✕
                    </button>
                </div>
            </div>

            {/* 2. Child Display Tracks (SCREEN 1, SCREEN 2...) with Clean Non-Redundant Naming */}
            <div className="station-child-tracks-container">
                {stationDisplays.map((disp, dIdx) => {
                    const dispId = (disp.displayId || disp.DisplayId || `mon-${dIdx}`).toLowerCase();
                    const dispNumber = disp.displayNumber || disp.DisplayNumber || (dIdx + 1);
                    const rawName = disp.displayName || disp.DisplayName || '';
                    const dispLabel = (rawName && !rawName.toLowerCase().includes(hostname.toLowerCase()))
                        ? rawName
                        : `Screen ${dispNumber}${disp.isPrimary || dIdx === 0 ? ' (Main)' : ''}`;
                    const onCanvas = isDisplayOnCanvas(dispId);

                    return (
                        <div
                            key={`${station.id}-${dispId}`}
                            className="timeline-track-container station-child-display-track"
                        >
                            <div className="track-sidebar child-display-sidebar">
                                <span className="child-display-icon">🖥️</span>
                                <span className="child-display-title" title={`${dispLabel} (${disp.width || 1920}×${disp.height || 1080})`}>
                                    {dispLabel}
                                </span>

                                {!isAutoDirectorEnabled && onToggleDisplayOnCanvas && (
                                    <button
                                        type="button"
                                        className={`btn-add-screen-canvas ${onCanvas ? 'is-on-canvas' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onToggleDisplayOnCanvas(station.id, dispId);
                                        }}
                                        title={onCanvas ? 'Remove Screen from Canvas' : 'Add Screen to Canvas Grid'}
                                    >
                                        {onCanvas ? '✓ ON' : '＋ ADD'}
                                    </button>
                                )}
                            </div>

                            <FilmstripCanvas
                                hostname={hostname}
                                displayId={dispId}
                                activeSegments={activeSegments}
                                viewportStartMs={viewportStartMs}
                                viewportDurationMs={viewportDurationMs}
                                baseEpochMs={baseEpochMs}
                                inPointMs={inPointMs}
                                outPointMs={outPointMs}
                                globalGaps={globalGaps}
                                directorSegments={gapCleanDirectorSegments}
                                isAutoDirectorEnabled={isAutoDirectorEnabled}
                                gaps={stationGaps}
                                showDirectorCoverage={hasMultiDisplays}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
