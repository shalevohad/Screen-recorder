// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/header/TimelineHeaderActions.jsx
// ==========================================
import React from 'react';
import { formatTimelineClock } from '../../../utils/timeFormat.js';
import './TimelineHeaderActions.scss';

export default function TimelineHeaderActions({
    earliestMediaMs,
    latestMediaMs,
    hasActiveCut,
    onJumpToFirst,
    onJumpToLast,
    onContextualFit,
    onResetZoom,
    baseEpochMs,
    timeMode
}) {
    return (
        <div className="timeline-viewport-actions-group">
            {earliestMediaMs !== null && (
                <button
                    type="button"
                    className="btn-vp-action"
                    onClick={onJumpToFirst}
                    title={`Jump playhead to first media (${formatTimelineClock(baseEpochMs + earliestMediaMs, timeMode)})`}
                >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="19 20 9 12 19 4 19 20" />
                        <line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2.5" />
                    </svg>
                    <span>FIRST MEDIA</span>
                </button>
            )}

            {latestMediaMs !== null && (
                <button
                    type="button"
                    className="btn-vp-action"
                    onClick={onJumpToLast}
                    title={`Jump playhead to last media (${formatTimelineClock(baseEpochMs + latestMediaMs, timeMode)})`}
                >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 4 15 12 5 20 5 4" />
                        <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2.5" />
                    </svg>
                    <span>LAST MEDIA</span>
                </button>
            )}

            <button
                type="button"
                className={`btn-vp-action fit-action ${hasActiveCut ? 'fit-cut' : ''}`}
                onClick={onContextualFit}
                title={hasActiveCut ? "Fit Viewport to Cut Range" : "Fit Viewport to Recorded Media"}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
                <span>{hasActiveCut ? 'FIT CUT' : 'FIT MEDIA'}</span>
            </button>

            <button
                type="button"
                className="btn-vp-action"
                onClick={onResetZoom}
                title="Reset to Full Time Scope (100% / No Zoom)"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
                <span>RESET</span>
            </button>
        </div>
    );
}