// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/TimelineTrack.jsx
// ==========================================
import React, { useMemo, useState, useEffect, useRef } from 'react';
import './TimelineTrack.scss';

const MAX_SPRITESHEET_ZOOM_MS = 2.5 * 60 * 60 * 1000;
const MAX_CONCURRENT_REQUESTS = 3;

// פונקציות עזר גנריות לחילוץ מדויק של תחילת וסיום מקטע
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
    segments: initialSegments = [],
    globalGaps = []
}) {
    const trackRef = useRef(null);
    const [loadedFrames, setLoadedFrames] = useState({});
    const [streamMetadata, setStreamMetadata] = useState({ fps: 30, frameDurationMs: 33.333 });
    const [realChunks, setRealChunks] = useState([]);
    const activeAbortControllerRef = useRef(null);

    const hostname = station.hostname || station.id || station.name || '';

    // 1. שליפת נתוני וידאו אמיתיים מ-FFprobe
    useEffect(() => {
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
    }, [hostname, baseEpochMs, inPointMs, viewportStartMs]);

    // 2. שליפת הצ'אנקים האמיתיים שנמצאו פיזית על הדיסק עבור התחנה בטווח הנוכחי
    useEffect(() => {
        if (!hostname || !baseEpochMs) return;

        const startEpoch = baseEpochMs + Math.round(inPointMs || viewportStartMs || 0);
        const endEpoch = baseEpochMs + Math.round(outPointMs || (viewportStartMs + viewportDurationMs) || 0);

        fetch(`/api/v1/extractor-advanced/timeline-segments?stations=${encodeURIComponent(hostname)}&startEpoch=${startEpoch}&endEpoch=${endEpoch}`)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data && data[hostname] && Array.isArray(data[hostname])) {
                    setRealChunks(data[hostname]);
                }
            })
            .catch(() => { });
    }, [hostname, baseEpochMs, inPointMs, outPointMs, viewportStartMs, viewportDurationMs]);

    // 3. הגדרת המקטעים האמיתיים: עדיפות מוחלטת לצ'אנקים שנסרקו מהדיסק
    const activeSegments = useMemo(() => {
        if (realChunks.length > 0) return realChunks;

        // אם עדיין לא הגיעו צ'אנקים מהשרת, מנפים מקטע מדומה שלוקח את כל ה-Scope
        return (initialSegments || []).filter(s => {
            const dur = getSegEnd(s) - getSegStart(s);
            return dur > 0 && dur < viewportDurationMs * 0.95;
        });
    }, [realChunks, initialSegments, viewportDurationMs]);

    const inPercent = ((inPointMs - viewportStartMs) / viewportDurationMs) * 100;
    const outPercent = ((outPointMs - viewportStartMs) / viewportDurationMs) * 100;

    // 4. חישוב תאי הפריים: אכיפה קשיחה של יצירת פריימים אך ורק בתחום הצ'אנקים האמיתיים
    const frameCells = useMemo(() => {
        if (
            !baseEpochMs ||
            viewportDurationMs <= 0 ||
            viewportDurationMs > MAX_SPRITESHEET_ZOOM_MS ||
            !activeSegments ||
            activeSegments.length === 0
        ) {
            return [];
        }

        const realFrameDurationMs = streamMetadata.frameDurationMs || (1000 / (streamMetadata.fps || 30));

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

        const cells = [];

        activeSegments.forEach((seg, sIdx) => {
            const segStart = getSegStart(seg);
            const segEnd = getSegEnd(seg);

            // חיתוך גבולות הפריים אך ורק לתחום המקטע האמיתי
            const activeStartEpoch = Math.max(focusStartEpoch, segStart);
            const activeEndEpoch = Math.min(focusEndEpoch, segEnd);

            // אם אין חפיפה בין הצ'אנק לפוקוס — מדלגים לחלוטין (מונע ציור פריימים על גבי Gaps)
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
    }, [hostname, baseEpochMs, viewportStartMs, viewportDurationMs, inPointMs, outPointMs, activeSegments, streamMetadata]);

    // 5. תור טעינת פריימים מבוקר
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
                .then(res => (res.ok && res.status === 200 ? res.blob() : null))
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

    // 6. מקטעי הקלטה פעילים (קו נוכחות ירוק בתחתית עבור הצ'אנקים האמיתיים בלבד)
    const recordedBars = useMemo(() => {
        if (!activeSegments || activeSegments.length === 0 || !baseEpochMs) return [];

        const vpStart = viewportStartMs;
        const vpEnd = viewportStartMs + viewportDurationMs;

        return activeSegments
            .map((seg, idx) => {
                const startEpoch = getSegStart(seg);
                const endEpoch = getSegEnd(seg);

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
    }, [activeSegments, baseEpochMs, viewportStartMs, viewportDurationMs]);

    // 7. סיווג פערים: הפרדה בין פער משותף (כתום-ענבר שיורד ב-Cut) לבין פער פרטני (אדום/No Signal)
    const classifiedGaps = useMemo(() => {
        if (!baseEpochMs || viewportDurationMs <= 0) return [];

        const sorted = [...(activeSegments || [])].sort((a, b) => getSegStart(a) - getSegStart(b));

        const rawStationEmptyRanges = [];
        const vpStart = viewportStartMs;
        const vpEnd = viewportStartMs + viewportDurationMs;
        const vpStartEpoch = baseEpochMs + vpStart;
        const vpEndEpoch = baseEpochMs + vpEnd;

        if (sorted.length > 0) {
            const firstSegStart = getSegStart(sorted[0]);
            if (firstSegStart > vpStartEpoch) {
                rawStationEmptyRanges.push({ startEpoch: vpStartEpoch, endEpoch: firstSegStart });
            }
        } else if (viewportDurationMs > 0) {
            rawStationEmptyRanges.push({ startEpoch: vpStartEpoch, endEpoch: vpEndEpoch });
        }

        for (let i = 0; i < sorted.length - 1; i++) {
            const currentEnd = getSegEnd(sorted[i]);
            const nextStart = getSegStart(sorted[i + 1]);

            if (nextStart - currentEnd > 1000) {
                rawStationEmptyRanges.push({ startEpoch: currentEnd, endEpoch: nextStart });
            }
        }

        if (sorted.length > 0) {
            const lastSegEnd = getSegEnd(sorted[sorted.length - 1]);
            if (lastSegEnd < vpEndEpoch) {
                rawStationEmptyRanges.push({ startEpoch: lastSegEnd, endEpoch: vpEndEpoch });
            }
        }

        const resultGaps = [];

        // 1. פערים משותפים (כתום-ענבר שייחתכו החוצה ב-Export)
        if (globalGaps && globalGaps.length > 0) {
            globalGaps.forEach((g, idx) => {
                const gStart = g.startEpochMs;
                const gEnd = g.endEpochMs;

                if (gEnd <= vpStartEpoch || gStart >= vpEndEpoch) return;

                const clStartEpoch = Math.max(vpStartEpoch, gStart);
                const clEndEpoch = Math.min(vpEndEpoch, gEnd);

                const startMs = clStartEpoch - baseEpochMs;
                const endMs = clEndEpoch - baseEpochMs;

                const leftPct = ((startMs - vpStart) / viewportDurationMs) * 100;
                const widthPct = ((endMs - startMs) / viewportDurationMs) * 100;

                if (widthPct > 0) {
                    resultGaps.push({
                        id: `global-${idx}`,
                        type: 'global',
                        leftPct,
                        widthPct,
                        durationSec: g.durationSeconds || Math.round((gEnd - gStart) / 1000)
                    });
                }
            });
        }

        // 2. פערי תחנה פרטניים (אדום/No Signal - נשארים עם שקופית גישור)
        rawStationEmptyRanges.forEach((range, rIdx) => {
            let subRanges = [range];

            if (globalGaps && globalGaps.length > 0) {
                globalGaps.forEach(g => {
                    const nextSubs = [];
                    subRanges.forEach(sub => {
                        if (g.endEpochMs <= sub.startEpoch || g.startEpochMs >= sub.endEpoch) {
                            nextSubs.push(sub);
                        } else {
                            if (g.startEpochMs > sub.startEpoch) {
                                nextSubs.push({ startEpoch: sub.startEpoch, endEpoch: g.startEpochMs });
                            }
                            if (g.endEpochMs < sub.endEpoch) {
                                nextSubs.push({ startEpoch: g.endEpochMs, endEpoch: sub.endEpoch });
                            }
                        }
                    });
                    subRanges = nextSubs;
                });
            }

            subRanges.forEach((sub, sIdx) => {
                if (sub.endEpoch - sub.startEpoch < 1000) return;
                if (sub.endEpoch <= vpStartEpoch || sub.startEpoch >= vpEndEpoch) return;

                const clStartEpoch = Math.max(vpStartEpoch, sub.startEpoch);
                const clEndEpoch = Math.min(vpEndEpoch, sub.endEpoch);

                const startMs = clStartEpoch - baseEpochMs;
                const endMs = clEndEpoch - baseEpochMs;

                const leftPct = ((startMs - vpStart) / viewportDurationMs) * 100;
                const widthPct = ((endMs - startMs) / viewportDurationMs) * 100;

                if (widthPct > 0) {
                    resultGaps.push({
                        id: `station-${rIdx}-${sIdx}`,
                        type: 'station',
                        leftPct,
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
                {/* 1. שכבת פערי זמן בגובה מלא */}
                <div className="full-height-gaps-layer">
                    {classifiedGaps.map(gap => (
                        <div
                            key={gap.id}
                            className={`gap-full-block ${gap.type === 'global' ? 'gap-global-skipped' : 'gap-station-signal'}`}
                            style={{ left: `${gap.leftPct}%`, width: `${gap.widthPct}%` }}
                            title={
                                gap.type === 'global'
                                    ? `Shared Gap: ${gap.durationSec}s will be skipped in export with 0.3s dip-to-black`
                                    : `Station Gap: ${gap.durationSec}s will be bridged with No-Signal pattern`
                            }
                        >
                            <div className="gap-pattern" />
                            {gap.widthPct > 5 && (
                                <div className={`gap-badge ${gap.type === 'global' ? 'global-badge' : ''}`}>
                                    <span>
                                        {gap.type === 'global' ? `✂ SKIPPED (${gap.durationSec}s)` : 'NO SIGNAL'}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* 2. שכבת תאי הפריים (נוצרת אך ורק במקטעים שבהם באמת הוקלט וידאו) */}
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
                                    <div className="placeholder-blur" />
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

                {/* 3. מחוון נוכחות ירוק בתחתית (עבור הצ'אנקים האמיתיים בלבד) */}
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