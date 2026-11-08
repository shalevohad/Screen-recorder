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
    timeMode,
    keystrokeMode = 'BURN_IN', // 'NONE' | 'BURN_IN'
    onChangeKeystrokeMode,
    showRulerKeystrokes = false,
    onToggleRulerKeystrokes
}) {
    const normalizedMode = (keystrokeMode || 'NONE').toUpperCase().replace('-', '_');

    // Toggles keystroke display mode on button click (OFF <-> BURN_IN)
    const handleCycleKeystrokeMode = () => {
        if (!onChangeKeystrokeMode) return;
        if (normalizedMode === 'BURN_IN') onChangeKeystrokeMode('NONE');
        else onChangeKeystrokeMode('BURN_IN');
    };

    const getModeLabel = () => {
        return normalizedMode === 'BURN_IN' ? 'KEYS: BURN-IN' : 'KEYS: OFF';
    };

    return (
        <div className="timeline-viewport-actions-group">
            {/* Tactical toggle for Keystroke Preview & Export Mode (Burn-in or Off) */}
            {onChangeKeystrokeMode && (
                <button
                    type="button"
                    className={`btn-vp-action keys-mode-btn mode-${normalizedMode === 'BURN_IN' ? 'burn-in' : 'none'}`}
                    onClick={handleCycleKeystrokeMode}
                    title="Toggle Keystroke Export & Preview Mode (Off / Burn-in)"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 16h8" />
                    </svg>
                    <span>{getModeLabel()}</span>
                </button>
            )}

            {/* Tactical toggle to show/hide Keystroke event ticks on Timeline Ruler */}
            {onToggleRulerKeystrokes && (
                <button
                    type="button"
                    className={`btn-vp-action ruler-keys-btn ${showRulerKeystrokes ? 'active' : 'inactive'}`}
                    onClick={onToggleRulerKeystrokes}
                    title={showRulerKeystrokes ? "Hide Keystroke Ticks on Ruler" : "Show Keystroke Ticks on Ruler"}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" fill={showRulerKeystrokes ? "currentColor" : "none"} />
                        <path d="M3 12h3M18 12h3M12 3v3M12 18v3" />
                    </svg>
                    <span>{showRulerKeystrokes ? 'RULER TICKS: ON' : 'RULER TICKS: OFF'}</span>
                </button>
            )}

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