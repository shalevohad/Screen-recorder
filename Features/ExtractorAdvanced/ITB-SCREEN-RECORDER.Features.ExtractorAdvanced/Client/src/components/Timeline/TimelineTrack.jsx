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
    baseEpochMs
}) {
    const inPercent = ((inPointMs - viewportStartMs) / viewportDurationMs) * 100;
    const outPercent = ((outPointMs - viewportStartMs) / viewportDurationMs) * 100;

    const spritesheetUrl = useMemo(() => {
        if (!baseEpochMs) return '';
        const startIso = new Date(baseEpochMs + viewportStartMs).toISOString();
        const endIso = new Date(baseEpochMs + viewportStartMs + viewportDurationMs).toISOString();
        const encodedHost = encodeURIComponent(station.hostname);
        return `/api/v1/extractor-advanced/spritesheet?hostname=${encodedHost}&startUtc=${startIso}&endUtc=${endIso}&frameCount=12&tileWidth=160&tileHeight=90`;
    }, [station.hostname, baseEpochMs, viewportStartMs, viewportDurationMs]);

    const mockGaps = useMemo(() => {
        const gaps = [];
        if (station.hostname.includes('01') || station.hostname.includes('Main')) {
            gaps.push({ startMs: 3600000, endMs: 5400000 });
        }
        if (station.hostname.includes('03') || station.hostname.includes('East')) {
            gaps.push({ startMs: 7200000, endMs: 8200000 });
            gaps.push({ startMs: 10800000, endMs: 12600000 });
        }
        return gaps;
    }, [station.hostname]);

    const renderGaps = (isPresenceView) => {
        return mockGaps.map((gap, i) => {
            const leftPct = Math.max(0, ((gap.startMs - viewportStartMs) / viewportDurationMs) * 100);
            const rightPct = Math.min(100, ((gap.endMs - viewportStartMs) / viewportDurationMs) * 100);
            const widthPct = rightPct - leftPct;

            if (widthPct > 0 && leftPct < 100 && rightPct > 0) {
                if (isPresenceView) {
                    return <div key={i} className="bar-seg gap" style={{ position: 'absolute', left: `${leftPct}%`, width: `${widthPct}%` }} />;
                } else {
                    return <div key={i} className="filmstrip-gap-mask" style={{ left: `${leftPct}%`, width: `${widthPct}%` }} title="Recording Gap" />;
                }
            }
            return null;
        });
    };

    return (
        <div
            onClick={onSelect}
            className={`timeline-track-container ${isActive ? 'active-track' : 'collapsed-track'}`}
        >
            <div className="track-sidebar">
                <div className={`status-indicator ${isActive ? 'online' : 'idle'}`} />
                <span className="station-label">{station.hostname}</span>
            </div>

            <div className="track-canvas">
                {isActive ? (
                    <div
                        className="filmstrip-view"
                        style={{
                            backgroundImage: spritesheetUrl ? `url('${spritesheetUrl}')` : 'none',
                            backgroundSize: '100% 100%',
                            backgroundRepeat: 'no-repeat',
                            position: 'relative',
                            paddingBottom: 8
                        }}
                    >
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="frame-thumb" style={{ background: 'transparent', borderColor: 'rgba(32, 51, 87, 0.4)' }}>
                                <span style={{ opacity: 0.5 }}>FR {i + 1}</span>
                            </div>
                        ))}

                        {renderGaps(false)}

                        <div className="active-presence-bar" style={{ position: 'absolute', bottom: 2, left: 6, right: 6, height: 4, background: '#040710', borderRadius: 2, overflow: 'hidden' }}>
                            <div className="bar-seg has-data" style={{ width: '100%', height: '100%', position: 'absolute', left: 0, background: '#00e676' }} />
                            {renderGaps(true)}
                        </div>
                    </div>
                ) : (
                    <div className="presence-view">
                        <div className="presence-bar" style={{ position: 'relative' }}>
                            <div className="bar-seg has-data" style={{ width: '100%', position: 'absolute', left: 0 }} />
                            {renderGaps(true)}
                        </div>
                    </div>
                )}

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