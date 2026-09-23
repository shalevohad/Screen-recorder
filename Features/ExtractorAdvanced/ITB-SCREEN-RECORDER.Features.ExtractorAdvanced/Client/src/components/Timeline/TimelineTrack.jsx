// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/TimelineTrack.jsx
// ==========================================
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { frameStore } from '../../utils/frameStore.js';
import './TimelineTrack.scss';

const MAX_SPRITESHEET_ZOOM_MS = 2.5 * 60 * 60 * 1000;

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
    disableFilmstrip = false // 💡 תוספת למניעת טעינת פריים-תרמילים (Filmstrip) במקומות נדרשים כמו Spotlight
}) {
    const [loadedFrames, setLoadedFrames] = useState({});
    const [streamMetadata, setStreamMetadata] = useState({ fps: 30, frameDurationMs: 33.333 });

    const hostname = station.hostname || station.id || station.name || '';

    const [verifiedChunks, setVerifiedChunks] = useState(null);
    const isLoadingChunks = verifiedChunks === null;

    useEffect(() => {
        if (!hostname || !baseEpochMs) return;
        const targetEpoch = baseEpochMs + Math.round(inPointMs || 0);
        fetch(`/api/v1/extractor-advanced/stream-metadata?hostname=${encodeURIComponent(hostname)}&epochMs=${targetEpoch}`)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data && data.fps > 0) setStreamMetadata(data);
            })
            .catch(() => { });
    }, [hostname, baseEpochMs, inPointMs]);

    useEffect(() => {
        if (!hostname || !baseEpochMs) return;

        let isMounted = true;
        setVerifiedChunks(null);

        const startEpoch = baseEpochMs + Math.round(inPointMs || viewportStartMs || 0);
        const endEpoch = baseEpochMs + Math.round(outPointMs || (viewportStartMs + viewportDurationMs) || 0);

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
    }, [hostname, baseEpochMs, inPointMs, outPointMs, viewportStartMs, viewportDurationMs]);

    const activeSegments = useMemo(() => {
        if (verifiedChunks !== null) return verifiedChunks;

        if (!rawSegments || rawSegments.length === 0) return [];
        return rawSegments.filter(s => {
            const dur = getSegEnd(s) - getSegStart(s);
            if (dur <= 0) return false;

            if (Math.abs(dur - viewportDurationMs) < 2000 && rawSegments.length === 1) {
                return false;
            }
            return true;
        });
    }, [verifiedChunks, rawSegments, viewportDurationMs]);

    const inPercent = ((inPointMs - viewportStartMs) / viewportDurationMs) * 100;
    const outPercent = ((outPointMs - viewportStartMs) / viewportDurationMs) * 100;

    const frameCells = useMemo(() => {
        // 💡 אם מוגדר disableFilmstrip, לא מחשבים תאי פריימים כלל ולא שולחים בקשות רשת
        if (disableFilmstrip || !baseEpochMs || viewportDurationMs <= 0 || viewportDurationMs > MAX_SPRITESHEET_ZOOM_MS || activeSegments.length === 0) {
            return [];
        }

        const realFrameDurationMs = streamMetadata.frameDurationMs || (1000 / (streamMetadata.fps || 30));
        let stepMs = realFrameDurationMs;

        if (viewportDurationMs > 600000) stepMs = 30000;
        else if (viewportDurationMs > 180000) stepMs = 10000;
        else if (viewportDurationMs > 45000) stepMs = 5000;
        else if (viewportDurationMs > 12000) stepMs = 1000;
        else if (viewportDurationMs > 2500) stepMs = Math.round(realFrameDurationMs * 5);

        const focusStartMs = viewportStartMs;
        const focusEndMs = viewportStartMs + viewportDurationMs;

        if (focusEndMs <= focusStartMs) return [];

        const focusStartEpoch = baseEpochMs + focusStartMs;
        const focusEndEpoch = baseEpochMs + focusEndMs;
        const cells = [];

        activeSegments.forEach((seg, sIdx) => {
            const segStart = getSegStart(seg);
            const segEnd = getSegEnd(seg);

            const activeStartEpoch = Math.max(focusStartEpoch, segStart);
            const activeEndEpoch = Math.min(focusEndEpoch, segEnd);

            if (activeEndEpoch <= activeStartEpoch) return;

            const firstCellStart = Math.floor(activeStartEpoch / stepMs) * stepMs;

            for (let cStart = firstCellStart; cStart < activeEndEpoch; cStart += stepMs) {
                const cEnd = cStart + stepMs;
                const clampedStart = Math.max(activeStartEpoch, cStart);
                const clampedEnd = Math.min(activeEndEpoch, cEnd);

                if (clampedEnd <= clampedStart) continue;

                const cellStartMs = clampedStart - baseEpochMs;
                const cellEndMs = clampedEnd - baseEpochMs;
                const sampleEpoch = Math.round((clampedStart + clampedEnd) / 2);

                cells.push({
                    id: `frame_${sIdx}_${sampleEpoch}`,
                    sampleEpoch,
                    leftPct: ((cellStartMs - viewportStartMs) / viewportDurationMs) * 100,
                    widthPct: ((cellEndMs - cellStartMs) / viewportDurationMs) * 100
                });
            }
        });

        return cells;
    }, [disableFilmstrip, baseEpochMs, viewportStartMs, viewportDurationMs, activeSegments, streamMetadata]);

    useEffect(() => {
        if (disableFilmstrip || frameCells.length === 0 || !hostname) return;

        let isCancelled = false;

        frameCells.forEach(cell => {
            if (isCancelled) return;
            const targetEpoch = cell.sampleEpoch;

            const cachedVal = frameStore.get(hostname, targetEpoch);
            if (cachedVal) {
                setLoadedFrames(prev => ({ ...prev, [cell.id]: cachedVal }));
                return;
            }

            frameStore.fetchFrame(hostname, targetEpoch).then(result => {
                if (!isCancelled && result) {
                    setLoadedFrames(prev => ({ ...prev, [cell.id]: result }));
                }
            });
        });

        const unsubscribe = frameStore.subscribe((h, e, val) => {
            if (h === hostname && !isCancelled) {
                const targetCell = frameCells.find(c => c.sampleEpoch === e);
                if (targetCell) {
                    setLoadedFrames(prev => ({ ...prev, [targetCell.id]: val }));
                }
            }
        });

        return () => {
            isCancelled = true;
            unsubscribe();
        };
    }, [frameCells, hostname, disableFilmstrip]);

    const recordedBars = useMemo(() => {
        if (activeSegments.length === 0 || !baseEpochMs) return [];
        const vpStart = viewportStartMs;
        const vpEnd = viewportStartMs + viewportDurationMs;

        return activeSegments.map((seg, idx) => {
            const startMs = getSegStart(seg) - baseEpochMs;
            const endMs = getSegEnd(seg) - baseEpochMs;
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
                const gStart = g.startEpochMs;
                const gEnd = g.endEpochMs;
                if (gEnd <= vpStartEpoch || gStart >= vpEndEpoch) return;

                const clStartEpoch = Math.max(vpStartEpoch, gStart);
                const clEndEpoch = Math.min(vpEndEpoch, gEnd);
                const startMs = clStartEpoch - baseEpochMs;
                const endMs = clEndEpoch - baseEpochMs;

                const widthPct = ((endMs - startMs) / viewportDurationMs) * 100;
                if (widthPct > 0) {
                    resultGaps.push({
                        id: `global-${idx}`,
                        type: 'global',
                        leftPct: ((startMs - vpStart) / viewportDurationMs) * 100,
                        widthPct,
                        durationSec: g.durationSeconds || Math.round((gEnd - gStart) / 1000)
                    });
                }
            });
        }

        rawStationEmptyRanges.forEach((range, rIdx) => {
            let subRanges = [range];

            if (globalGaps && globalGaps.length > 0) {
                globalGaps.forEach(g => {
                    const nextSubs = [];
                    subRanges.forEach(sub => {
                        if (g.endEpochMs <= sub.startEpoch || g.startEpochMs >= sub.endEpoch) {
                            nextSubs.push(sub);
                        } else {
                            if (g.startEpochMs > sub.startEpoch) nextSubs.push({ startEpoch: sub.startEpoch, endEpoch: g.startEpochMs });
                            if (g.endEpochMs < sub.endEpoch) nextSubs.push({ startEpoch: g.endEpochMs, endEpoch: sub.endEpoch });
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
    }, [activeSegments, globalGaps, baseEpochMs, viewportStartMs, viewportDurationMs]);

    const stationName = station.displayName || station.hostname || station.name || '';

    return (
        <div onClick={onSelect} className={`timeline-track-container ${isActive ? 'active-track' : 'collapsed-track'}`}>
            <div className="track-sidebar">
                <div className={`status-indicator ${station.isOnline ? 'online' : 'idle'}`} />
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

                {!disableFilmstrip && frameCells.length > 0 && (
                    <div className="spritesheet-filmstrip-layer">
                        {frameCells.map(cell => {
                            const frameData = loadedFrames[cell.id];
                            const isLoaded = Boolean(frameData);
                            const isNoSignal = frameData === 'NO_SIGNAL';

                            return (
                                <div key={cell.id} className={`filmstrip-cell ${isLoaded ? 'is-loaded' : 'is-loading'}`} style={{ left: `${cell.leftPct}%`, width: `${cell.widthPct}%` }}>
                                    {!isLoaded && <div className="placeholder-blur" />}

                                    {isNoSignal ? (
                                        <div className="frame-no-signal-pattern" />
                                    ) : isLoaded ? (
                                        <div className="frame-image-cover" style={{ backgroundImage: `url("${frameData}")` }} />
                                    ) : null}
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="data-presence-layer">
                    {recordedBars.map(bar => (
                        <div key={bar.id} className="data-presence-bar" style={{ left: `${bar.leftPct}%`, width: `${bar.widthPct}%` }} title="Active Recording" />
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