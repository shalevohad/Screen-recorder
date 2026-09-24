// Client/src/components/Timeline/TimelineMinimap.jsx
import React from 'react';
import { formatTimelineClock } from '../../utils/timeFormat.js';
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
    onStartDragMinimap,
    onFitCut,
    onResetZoom
}) {
    // חישובי מיקומים באחוזים מתוך כלל הסשן
    const inPercent = Math.max(0, Math.min(100, (inPointMs / totalDurationMs) * 100));
    const outPercent = Math.max(0, Math.min(100, (outPointMs / totalDurationMs) * 100));
    const cutWidthPercent = Math.max(0, outPercent - inPercent);

    const vpStartPercent = Math.max(0, Math.min(100, (viewportStartMs / totalDurationMs) * 100));
    const vpWidthPercent = Math.max(0, Math.min(100 - vpStartPercent, (viewportDurationMs / totalDurationMs) * 100));
    const vpEndPercent = vpStartPercent + vpWidthPercent;

    const isZoomed = zoomLevel > 1.05;

    // רוחב תגית ממוצע דורש כ-7% מרוחב המיני-מפה כדי למנוע התנגשות
    const COLLISION_THRESHOLD = 7;

    // 1. תגיות חיתוך (IN / OUT) - העדיפות הראשית למשתמש
    const canFitCutTags = cutWidthPercent >= 10;
    const canFitBothCutTags = cutWidthPercent >= 16;

    const showCutIn = canFitCutTags;
    const showCutOut = canFitBothCutTags;

    // 2. תגיות Viewport (זמני החלון המוגדל) - מוצגות רק אם אינן דורסות את תגיות החיתוך
    const isVpStartColliding = showCutIn && Math.abs(vpStartPercent - inPercent) < COLLISION_THRESHOLD;
    const showVpStart = isZoomed && vpWidthPercent >= 12 && !isVpStartColliding;

    const isVpEndColliding = showCutOut && Math.abs(vpEndPercent - outPercent) < COLLISION_THRESHOLD;
    const showVpEnd = isZoomed && vpWidthPercent >= 12 && !isVpEndColliding;

    return (
        <>
            <div
                ref={minimapRef}
                className="overview-track-canvas"
                onMouseDown={(e) => onStartDragMinimap && onStartDragMinimap('minimap-viewport', e)}
            >
                {/* 1. מקטע החיתוך (Cut Highlight) */}
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

                {/* 2. חלון ה-Viewport המוזז */}
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

                {/* 3. מחט המיקום (Playhead Needle) */}
                <div
                    className="minimap-needle"
                    style={{ left: `${(playheadMs / totalDurationMs) * 100}%` }}
                />
            </div>

            {/* כפתורי הזום */}
            <div className="timeline-zoom-controls">
                <button
                    type="button"
                    onClick={onFitCut}
                    className="btn-zoom-action fit"
                    title="Fit cut region to center viewport"
                >
                    FIT
                </button>
                <button
                    type="button"
                    onClick={onResetZoom}
                    className="btn-zoom-action reset"
                    title="Reset zoom to full session"
                >
                    RESET
                </button>
            </div>
        </>
    );
}