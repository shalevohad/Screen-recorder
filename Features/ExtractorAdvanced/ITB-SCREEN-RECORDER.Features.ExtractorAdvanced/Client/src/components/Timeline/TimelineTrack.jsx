// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/TimelineTrack.jsx
// ==========================================
import React, { useMemo } from 'react';
import './TimelineTrack.scss';

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
    const inPercent = ((inPointMs - viewportStartMs) / viewportDurationMs) * 100;
    const outPercent = ((outPointMs - viewportStartMs) / viewportDurationMs) * 100;

    // 💡 ארכיטקטורת Time-Bucket Tiling: חלוקת ה-Viewport לאריחים קבועים
    const tiles = useMemo(() => {
        if (!baseEpochMs || viewportDurationMs <= 0) return [];

        // קביעת גודל ה-Bucket לפי עומק הזום (30 דק' / 15 דק' / 5 דק')
        let bucketDurationMs = 1800000; // 30 דקות כברירת מחדל
        if (viewportDurationMs <= 3600000) {
            bucketDurationMs = 300000; // 5 דקות בזום קרוב
        } else if (viewportDurationMs <= 14400000) {
            bucketDurationMs = 900000; // 15 דקות בזום בינוני
        }

        const viewStartEpoch = baseEpochMs + viewportStartMs;
        const viewEndEpoch = viewStartEpoch + viewportDurationMs;

        // נרמול זמני התחלה וסיום לפי ה-Bucket
        const firstBucketStart = Math.floor(viewStartEpoch / bucketDurationMs) * bucketDurationMs;
        const lastBucketEnd = Math.ceil(viewEndEpoch / bucketDurationMs) * bucketDurationMs;

        const hostname = station.hostname || station.id || station.name || '';
        const tileList = [];

        for (let bStart = firstBucketStart; bStart < lastBucketEnd; bStart += bucketDurationMs) {
            const bEnd = bStart + bucketDurationMs;

            // חישוב מיקום ה-Tile באחוזים יחסית ל-Viewport
            const tileStartMs = bStart - baseEpochMs;
            const tileEndMs = bEnd - baseEpochMs;

            const clStart = Math.max(viewportStartMs, tileStartMs);
            const clEnd = Math.min(viewportStartMs + viewportDurationMs, tileEndMs);

            if (clEnd <= clStart) continue;

            const leftPct = ((clStart - viewportStartMs) / viewportDurationMs) * 100;
            const widthPct = ((clEnd - clStart) / viewportDurationMs) * 100;

            const url = `/api/v1/extractor-advanced/spritesheet?hostname=${encodeURIComponent(hostname)}&startEpoch=${bStart}&endEpoch=${bEnd}&frameCount=4&tileWidth=140&tileHeight=78`;

            tileList.push({
                id: `tile_${bStart}`,
                url,
                leftPct,
                widthPct
            });
        }

        return tileList;
    }, [station, baseEpochMs, viewportStartMs, viewportDurationMs]);

    // עיבוד מקטעי ההקלטה האמיתיים (ירוק)
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

    // פערי זמן (Gaps)
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

        // פער התחלה
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

        // פערים פנימיים
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

        // פער סיום
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

            <div className="track-canvas">
                {/* 💡 ריצוף ה-Tiles: כל מקטע מציג את חלקו ונשמר במטמון בנפרד */}
                <div className="spritesheet-filmstrip-layer">
                    {tiles.map(tile => (
                        <div
                            key={tile.id}
                            className="filmstrip-tile"
                            style={{
                                left: `${tile.leftPct}%`,
                                width: `${tile.widthPct}%`,
                                backgroundImage: `url("${tile.url}")`
                            }}
                        />
                    ))}
                </div>

                <div className="presence-view">
                    <div className="presence-bar">
                        {recordedBars.map(bar => (
                            <div
                                key={bar.id}
                                className="bar-seg has-data"
                                style={{ left: `${bar.leftPct}%`, width: `${bar.widthPct}%` }}
                            />
                        ))}
                        {realGaps.map(gap => (
                            <div
                                key={gap.id}
                                className="bar-seg gap"
                                style={{ left: `${gap.leftPct}%`, width: `${gap.widthPct}%` }}
                                title="Recording Gap / No Signal"
                            />
                        ))}
                    </div>
                </div>

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