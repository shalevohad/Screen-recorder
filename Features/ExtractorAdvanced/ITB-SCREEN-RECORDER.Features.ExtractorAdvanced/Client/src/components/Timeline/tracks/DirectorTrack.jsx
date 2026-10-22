// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/tracks/DirectorTrack.jsx
// ==========================================
import React, { useMemo } from 'react';
import './DirectorTrack.scss';

export default function DirectorTrack({
    stationId,
    directorPlan,
    viewportStartMs = 0,
    viewportDurationMs = 3600000,
    baseEpochMs = 0,
    playheadMs = 0,
    onSplitSegment,
    onChangeSegmentDisplay,
    onResetSegmentToAuto,
    availableDisplays = []
}) {
    const segments = directorPlan?.segments || [];
    if (!segments || segments.length === 0) {
        return null;
    }

    const vpStartEpoch = baseEpochMs + viewportStartMs;
    const vpEndEpoch = vpStartEpoch + viewportDurationMs;

    // Filter segments visible in viewport
    const visibleSegments = useMemo(() => {
        return segments.filter(seg => {
            const s = seg.startEpochMs ?? seg.StartEpochMs ?? 0;
            const e = seg.endEpochMs ?? seg.EndEpochMs ?? 0;
            return e > vpStartEpoch && s < vpEndEpoch;
        });
    }, [segments, vpStartEpoch, vpEndEpoch]);

    return (
        <div className="director-track-container" aria-label="Auto-Director Track">
            <div className="director-track-label">
                <span className="director-icon">🎬</span>
                <span className="director-title">DIRECTOR FOCUS</span>
            </div>

            <div className="director-track-timeline">
                {visibleSegments.map((seg, idx) => {
                    const s = seg.startEpochMs ?? seg.StartEpochMs ?? 0;
                    const e = seg.endEpochMs ?? seg.EndEpochMs ?? 0;
                    const targetDisplay = (seg.targetDisplayId ?? seg.TargetDisplayId ?? 'mon-0').toUpperCase();
                    const isOverride = Boolean(seg.isManualOverride ?? seg.IsManualOverride);

                    // Clamp to viewport
                    const visStart = Math.max(s, vpStartEpoch);
                    const visEnd = Math.min(e, vpEndEpoch);
                    const leftPct = ((visStart - vpStartEpoch) / viewportDurationMs) * 100;
                    const widthPct = Math.max(0.2, ((visEnd - visStart) / viewportDurationMs) * 100);

                    return (
                        <div
                            key={`${s}-${e}-${idx}`}
                            className={`director-segment-block ${isOverride ? 'is-override' : 'is-auto'}`}
                            style={{
                                left: `${leftPct}%`,
                                width: `${widthPct}%`
                            }}
                            title={`${isOverride ? 'Manual Override' : 'Auto-Director'}: ${targetDisplay} (${Math.round((e - s) / 1000)}s)`}
                            onContextMenu={(ev) => {
                                ev.preventDefault();
                                ev.stopPropagation();
                                // Context action: toggle between displays or reset
                                if (isOverride) {
                                    onResetSegmentToAuto?.(stationId, s);
                                } else {
                                    const nextDisp = targetDisplay === 'MON-0' ? 'mon-1' : 'mon-0';
                                    onChangeSegmentDisplay?.(stationId, s, nextDisp);
                                }
                            }}
                        >
                            <span className="segment-badge-icon">
                                {isOverride ? '✋' : '⚡'}
                            </span>
                            <span className="segment-badge-label">
                                {targetDisplay}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
