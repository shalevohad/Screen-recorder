// Client/src/components/Timeline/TimelineMinimap.jsx
import React from 'react';
import { formatTimelineClock } from '../../../utils/timeFormat.js';
import './TimelineMinimap.scss';

export default function TimelineMinimap({
    minimapRef,
    baseEpochMs = 0,
    timeMode = 'LOCAL',
    totalDurationMs = 3600000,
    viewportStartMs = 0,
    viewportDurationMs = 3600000,
    zoomLevel = 1,
    inPointMs = 0,
    outPointMs = 3600000,
    playheadMs = 0,
    onStartDragMinimap
}) {
    // Percentage position calculations relative to the entire session
    const inPercent = Math.max(0, Math.min(100, (inPointMs / totalDurationMs) * 100));
    const outPercent = Math.max(0, Math.min(100, (outPointMs / totalDurationMs) * 100));
    const cutWidthPercent = Math.max(0, outPercent - inPercent);

    const vpStartPercent = Math.max(0, Math.min(100, (viewportStartMs / totalDurationMs) * 100));
    const vpWidthPercent = Math.max(0, Math.min(100 - vpStartPercent, (viewportDurationMs / totalDurationMs) * 100));
    const vpEndPercent = vpStartPercent + vpWidthPercent;

    const isZoomed = zoomLevel > 1.05;

    // Average label width requires ~7% of minimap width to avoid text collision
    const COLLISION_THRESHOLD = 7;

    // 1. Cut markers (IN / OUT) - Primary user focus
    const canFitCutTags = cutWidthPercent >= 10;
    const canFitBothCutTags = cutWidthPercent >= 16;

    const showCutIn = canFitCutTags;
    const showCutOut = canFitBothCutTags;

    // 2. Viewport tags (zoomed view bounds) - Only displayed if not colliding with cut tags
    const isVpStartColliding = showCutIn && Math.abs(vpStartPercent - inPercent) < COLLISION_THRESHOLD;
    const showVpStart = isZoomed && vpWidthPercent >= 12 && !isVpStartColliding;

    const isVpEndColliding = showCutOut && Math.abs(vpEndPercent - outPercent) < COLLISION_THRESHOLD;
    const showVpEnd = isZoomed && vpWidthPercent >= 12 && !isVpEndColliding;

    return (
        <div
            ref={minimapRef}
            className="overview-track-canvas"
            onMouseDown={(e) => onStartDragMinimap && onStartDragMinimap('minimap-viewport', e)}
        >
            {/* 1. Cut segment (Cut Highlight) */}
            <div
                className="minimap-cut-highlight"
                style={{ left: `${inPercent}%`, width: `${cutWidthPercent}%` }}
            >
                {showCutIn && (
                    <span className="minimap-time-tag cut-in-tag">
                        {formatTimelineClock(baseEpochMs + inPointMs, timeMode)}
                    </span>
                )}

                {showCutOut && (
                    <span className="minimap-time-tag cut-out-tag">
                        {formatTimelineClock(baseEpochMs + outPointMs, timeMode)}
                    </span>
                )}
            </div>

            {/* 2. Scaled Viewport window */}
            <div
                className="minimap-viewport-box"
                style={{ left: `${vpStartPercent}%`, width: `${vpWidthPercent}%` }}
            >
                {showVpStart && (
                    <span className="minimap-time-tag viewport-tag left">
                        {formatTimelineClock(baseEpochMs + viewportStartMs, timeMode)}
                    </span>
                )}

                {showVpEnd && (
                    <span className="minimap-time-tag viewport-tag right">
                        {formatTimelineClock(baseEpochMs + viewportStartMs + viewportDurationMs, timeMode)}
                    </span>
                )}
            </div>

            {/* 3. Playhead indicator needle */}
            <div
                className="minimap-needle"
                style={{ left: `${(playheadMs / totalDurationMs) * 100}%` }}
            />
        </div>
    );
}