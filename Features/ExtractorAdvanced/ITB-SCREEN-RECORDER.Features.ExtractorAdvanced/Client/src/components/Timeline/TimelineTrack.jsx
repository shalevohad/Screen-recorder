// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/TimelineTrack.jsx
// ==========================================
import React, { useMemo, useState, useEffect, useRef } from 'react';
import './TimelineTrack.scss';

const MAX_SPRITESHEET_ZOOM_MS = 2.5 * 60 * 60 * 1000;
const MAX_CONCURRENT_REQUESTS = 3;

export default function TimelineTrack({
    station,
    isActive,
    onSelect,
    viewportStartMs = 0,
    viewportDurationMs = 3600000,
    inPointMs,
    outPointMs,
    baseEpochMs,
    segments = []
}) {
    const trackRef = useRef(null);
    const [loadedFrames, setLoadedFrames] = useState({});
    const [streamMetadata, setStreamMetadata] = useState({ fps: 30, frameDurationMs: 33.333 });
    const activeAbortControllerRef = useRef(null);

    // 1. שליפת נתוני וידאו אמיתיים (FPS ורזולוציה) מ-FFprobe
    useEffect(() => {
        const hostname = station.hostname || station.id || station.name;
        if (!hostname || !baseEpochMs) return;

        const targetEpoch = baseEpochMs + Math.round(inPointMs || viewportStartMs);
        fetch(`/api/v1/extractor-advanced/stream-metadata?hostname=${encodeURIComponent(hostname)}&epochMs=${targetEpoch}`)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data && data.fps > 0) {
                    setStreamMetadata(data);
                }
            })
            .catch(() => { });
    }, [station, baseEpochMs, inPointMs, viewportStartMs]);

    const inPercent = ((inPointMs - viewportStartMs) / viewportDurationMs) * 100;
    const outPercent = ((outPointMs - viewportStartMs) / viewportDurationMs) * 100;

    // 2. חישוב תאי הזמן המסונכרנים עם ה-FPS
    const frameCells = useMemo(() => {
        if (
            !baseEpochMs ||
            viewportDurationMs <= 0 ||
            viewportDurationMs > MAX_SPRITESHEET_ZOOM_MS ||
            !segments ||
            segments.length === 0
        ) {
            return [];
        }

        const realFrameDurationMs = streamMetadata.frameDurationMs || (1000 / (streamMetadata.fps || 30));

        // קביעת צעד הזמן לפי רמת הזום (בזום מקסימלי: פריים בודד לפי ה-FPS)
        let stepMs = realFrameDurationMs;
        if (viewportDurationMs > 600000) {
            stepMs = 30000;
        } else if (viewportDurationMs > 180000) {
            stepMs = 10000;
        } else if (viewportDurationMs > 45000) {
            stepMs = 5000;
        } else if (viewportDurationMs > 12000) {
            stepMs = 1000;
        } else if (viewportDurationMs > 2500) {
            stepMs = Math.round(realFrameDurationMs * 5);
        }

        const focusStartMs = Math.max(viewportStartMs, inPointMs);
        const focusEndMs = Math.min(viewportStartMs + viewportDurationMs, outPointMs);

        if (focusEndMs <= focusStartMs) return [];

        const focusStartEpoch = baseEpochMs + focusStartMs;
        const focusEndEpoch = baseEpochMs + focusEndMs;

        const hostname = station.hostname || station.id || station.name || '';
        const cells = [];

        segments.forEach((seg, sIdx) => {
            const segStart = seg.startEpoch ?? seg.StartEpoch ?? seg.start ?? 0;
            const segEnd = seg.endEpoch ?? seg.EndEpoch ?? seg.end ?? 0;

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

                const leftPct = ((cellStartMs - viewportStartMs) / viewportDurationMs) * 100;
                const widthPct = ((cellEndMs - cellStartMs) / viewportDurationMs) * 100;

                const sampleEpoch = Math.round((clampedStart + clampedEnd) / 2);
                const url = `/api/v1/extractor-advanced/frame?hostname=${encodeURIComponent(hostname)}&epochMs=${sampleEpoch}`;

                cells.push({
                    id: `frame_${sIdx}_${sampleEpoch}`,
                    sampleEpoch,
                    url,
                    leftPct,
                    widthPct
                });
            }
        });

        return cells;
    }, [station, baseEpochMs, viewportStartMs, viewportDurationMs, inPointMs, outPointMs, segments, streamMetadata]);

    // 3. תור טעינת פריימים מבוקר
    useEffect(() => {
        if (frameCells.length === 0) return;

        if (activeAbortControllerRef.current) {
            activeAbortControllerRef.current.abort();
        }
        const abortController = new AbortController();
        activeAbortControllerRef.current = abortController;

        let isCancelled = false;
        let activeWorkers = 0;
        const queue = frameCells.filter(cell => !loadedFrames[cell.id]);

        if (queue.length === 0) return;

        const pumpQueue = () => {
            if (isCancelled || queue.length === 0 || activeWorkers >= MAX_CONCURRENT_REQUESTS) {
                return;
            }

            const nextCell = queue.shift();
            if (!nextCell) return;

            activeWorkers++;

            fetch(nextCell.url, { signal: abortController.signal })
                .then(res => {
                    if (res.ok && res.status === 200) {
                        return res.blob();
                    }
                    return null;
                })
                .then(blob => {
                    if (blob && blob.size > 0 && !isCancelled) {
                        const blobUrl = URL.createObjectURL(blob);
                        setLoadedFrames(prev => ({ ...prev, [nextCell.id]: blobUrl }));
                    }
                })
                .catch(() => { })
                .finally(() => {
                    activeWorkers--;
                    pumpQueue();
                });

            if (activeWorkers < MAX_CONCURRENT_REQUESTS) {
                pumpQueue();
            }
        };

        for (let i = 0; i < MAX_CONCURRENT_REQUESTS; i++) {
            pumpQueue();
        }

        return () => {
            isCancelled = true;
            abortController.abort();
        };
    }, [frameCells]);

    // מקטעי הקלטה פעילים (ירוק)
    const recordedBars = useMemo(() => {
        if (!segments || segments.length === 0 || !baseEpochMs) return [];

        const vpStart = viewportStartMs;
        const vpEnd = viewportStartMs + viewportDurationMs;

        return segments
            .map((seg, idx) => {
                const startEpoch = seg.startEpoch ?? seg.StartEpoch ?? seg.start ?? 0;
                const endEpoch = seg.endEpoch ?? seg.EndEpoch ?? seg.end ?? 0;

                const startMs = startEpoch - baseEpochMs;
                const endMs = endEpoch - baseEpochMs;

                if (endMs <= vpStart || startMs >= vpEnd) return null;

                const clStart = Math.max(vpStart, startMs);
                const clEnd = Math.min(vpEnd, endMs);

                const leftPct = ((clStart - vpStart) / viewportDurationMs) * 100;
                const widthPct = ((clEnd - clStart) / viewportDurationMs) * 100;

                return { id: idx, leftPct, widthPct };
            })
            .filter(Boolean);
    }, [segments, baseEpochMs, viewportStartMs, viewportDurationMs]);

    // פערי זמן (GAPs) בגובה מלא
    const realGaps = useMemo(() => {
        if (!baseEpochMs || viewportDurationMs <= 0) return [];

        const sorted = [...(segments || [])].sort((a, b) => {
            const aStart = a.startEpoch ?? a.StartEpoch ?? a.start ?? 0;
            const bStart = b.startEpoch ?? b.StartEpoch ?? b.start ?? 0;
            return aStart - bStart;
        });

        const gaps = [];
        const vpStart = viewportStartMs;
        const vpEnd = viewportStartMs + viewportDurationMs;

        if (sorted.length > 0) {
            const firstSegStart = sorted[0].startEpoch ?? sorted[0].StartEpoch ?? sorted[0].start ?? baseEpochMs;
            const firstSegStartMs = firstSegStart - baseEpochMs;
            if (firstSegStartMs > vpStart) {
                const clStart = vpStart;
                const clEnd = Math.min(vpEnd, firstSegStartMs);
                const leftPct = ((clStart - vpStart) / viewportDurationMs) * 100;
                const widthPct = ((clEnd - clStart) / viewportDurationMs) * 100;
                if (widthPct > 0) gaps.push({ id: 'gap-leading', leftPct, widthPct });
            }
        } else if (viewportDurationMs > 0) {
            gaps.push({ id: 'gap-all', leftPct: 0, widthPct: 100 });
        }

        for (let i = 0; i < sorted.length - 1; i++) {
            const currentEnd = sorted[i].endEpoch ?? sorted[i].EndEpoch ?? sorted[i].end ?? 0;
            const nextStart = sorted[i + 1].startEpoch ?? sorted[i + 1].StartEpoch ?? sorted[i + 1].start ?? 0;

            const currentEndMs = currentEnd - baseEpochMs;
            const nextStartMs = nextStart - baseEpochMs;

            if (nextStartMs - currentEndMs > 1000) {
                if (nextStartMs > vpStart && currentEndMs < vpEnd) {
                    const clStart = Math.max(vpStart, currentEndMs);
                    const clEnd = Math.min(vpEnd, nextStartMs);

                    const leftPct = ((clStart - vpStart) / viewportDurationMs) * 100;
                    const widthPct = ((clEnd - clStart) / viewportDurationMs) * 100;

                    if (widthPct > 0) gaps.push({ id: `gap-${i}`, leftPct, widthPct });
                }
            }
        }

        if (sorted.length > 0) {
            const lastSegEnd = sorted[sorted.length - 1].endEpoch ?? sorted[sorted.length - 1].EndEpoch ?? sorted[sorted.length - 1].end ?? baseEpochMs;
            const lastSegEndMs = lastSegEnd - baseEpochMs;
            if (lastSegEndMs < vpEnd) {
                const clStart = Math.max(vpStart, lastSegEndMs);
                const clEnd = vpEnd;
                const leftPct = ((clStart - vpStart) / viewportDurationMs) * 100;
                const widthPct = ((clEnd - clStart) / viewportDurationMs) * 100;
                if (widthPct > 0) gaps.push({ id: 'gap-trailing', leftPct, widthPct });
            }
        }

        return gaps;
    }, [segments, baseEpochMs, viewportStartMs, viewportDurationMs]);

    const stationName = station.displayName || station.hostname || station.name || '';

    return (
        <div
            onClick={onSelect}
            className={`timeline-track-container ${isActive ? 'active-track' : 'collapsed-track'}`}
        >
            <div className="track-sidebar">
                <div className={`status-indicator ${station.isOnline ? 'online' : 'idle'}`} />
                <span className="station-label" title={stationName}>
                    {stationName}
                </span>
            </div>

            <div className="track-canvas" ref={trackRef}>
                {/* 1. שכבת GAPs בגובה מלא */}
                <div className="full-height-gaps-layer">
                    {realGaps.map(gap => (
                        <div
                            key={gap.id}
                            className="gap-full-block"
                            style={{ left: `${gap.leftPct}%`, width: `${gap.widthPct}%` }}
                            title="Recording Gap / No Signal"
                        >
                            <div className="gap-pattern" />
                            {gap.widthPct > 6 && (
                                <div className="gap-badge">
                                    <span>NO SIGNAL</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* 2. שכבת תאי הפריים עם שקופית Blur מקדימה ומעבר Focus-In */}
                {frameCells.length > 0 && (
                    <div className="spritesheet-filmstrip-layer">
                        {frameCells.map(cell => {
                            const blobUrl = loadedFrames[cell.id];
                            return (
                                <div
                                    key={cell.id}
                                    className={`filmstrip-cell ${blobUrl ? 'is-loaded' : 'is-loading'}`}
                                    style={{
                                        left: `${cell.leftPct}%`,
                                        width: `${cell.widthPct}%`
                                    }}
                                >
                                    {/* 💡 שקופית Blur מקדימה המוצגת מיידית */}
                                    <div className="placeholder-blur" />

                                    {/* 💡 התמונה האמיתית: נכנסת ב-Focus רך מטושטש לחד */}
                                    {blobUrl && (
                                        <div
                                            className="frame-image-cover"
                                            style={{ backgroundImage: `url("${blobUrl}")` }}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* 3. מחוון נוכחות ירוק בתחתית */}
                <div className="data-presence-layer">
                    {recordedBars.map(bar => (
                        <div
                            key={bar.id}
                            className="data-presence-bar"
                            style={{ left: `${bar.leftPct}%`, width: `${bar.widthPct}%` }}
                            title="Active Recording"
                        />
                    ))}
                </div>

                {/* 4. מסכות In/Out עמומות */}
                {inPercent > 0 && (
                    <div className="mask-dimmed left-mask" style={{ width: `${Math.min(100, inPercent)}%` }} />
                )}

                {outPercent < 100 && (
                    <div className="mask-dimmed right-mask" style={{ left: `${Math.max(0, outPercent)}%`, right: 0 }} />
                )}
            </div>
        </div>
    );
}