// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Player/KeystrokePlaybackOverlay.jsx
// ==========================================
import React, { useMemo } from 'react';
import { cleanKeyCombination, parseKeyCombination } from '../../utils/virtualKeyMap.js';
import './KeystrokePlaybackOverlay.scss';

const DISPLAY_DURATION_MS = 2200;
const FADE_DURATION_MS = 400;

/**
 * KeystrokePlaybackOverlay renders tactical keycaps or caption HUD overlay synchronized with playback time.
 * 
 * @param {Object} props
 * @param {number} [props.currentEpochMs=0] - Current playhead timestamp in Epoch milliseconds.
 * @param {Array} [props.keystrokes=[]] - Keystroke telemetry event array.
 * @param {'NONE'|'CAPTION'|'BURN_IN'|'OFF'} [props.keystrokeMode='BURN_IN'] - Display mode.
 * @returns {JSX.Element|null}
 */
export default function KeystrokePlaybackOverlay({
    currentEpochMs = 0,
    keystrokes = [],
    keystrokeMode = 'BURN_IN' // Options: 'NONE' | 'CAPTION' | 'BURN_IN' | 'OFF'
}) {
    const normalizedMode = (keystrokeMode || 'NONE').toUpperCase().replace('-', '_');

    // If mode is NONE or OFF - render nothing
    if (normalizedMode === 'NONE' || normalizedMode === 'OFF') {
        return null;
    }

    const isVisibleMode = normalizedMode === 'BURN_IN' || normalizedMode === 'CAPTION';
    if (!isVisibleMode) return null;

    const activeEvent = useMemo(() => {
        if (!keystrokes.length || !currentEpochMs) return null;

        for (let i = keystrokes.length - 1; i >= 0; i--) {
            const k = keystrokes[i];
            const elapsed = currentEpochMs - k.epochMs;

            if (elapsed >= 0 && elapsed <= DISPLAY_DURATION_MS) {
                return {
                    ...k,
                    elapsed
                };
            }
        }
        return null;
    }, [currentEpochMs, keystrokes]);

    if (!activeEvent) return null;

    // Calculate fade-out opacity over the last 400 milliseconds
    let opacity = 1;
    if (activeEvent.elapsed > (DISPLAY_DURATION_MS - FADE_DURATION_MS)) {
        const fadeProgress = (activeEvent.elapsed - (DISPLAY_DURATION_MS - FADE_DURATION_MS)) / FADE_DURATION_MS;
        opacity = Math.max(0, 1 - fadeProgress);
    }

    if (opacity <= 0.05) return null;

    // Mode 1: Soft subtitle caption at bottom of player
    if (normalizedMode === 'CAPTION') {
        const cleanCombo = cleanKeyCombination(activeEvent.keyCombination);
        if (!cleanCombo) return null;

        return (
            <div className="keystroke-overlay-root mode-caption" style={{ opacity }}>
                <div className="caption-bar">
                    <span className="caption-text">[ {cleanCombo} ]</span>
                </div>
            </div>
        );
    }

    // Mode 2: Tactical Burn-In - Glowing 3D keycaps centered in viewport
    const keys = parseKeyCombination(activeEvent.keyCombination);
    if (!keys.length) return null;

    return (
        <div className="keystroke-overlay-root mode-burnin" style={{ opacity }}>
            <div className="keycap-cluster">
                {keys.map((key, idx) => (
                    <React.Fragment key={idx}>
                        <div className="keycap-badge">
                            <span className="keycap-text">{key.toUpperCase()}</span>
                        </div>
                        {idx < keys.length - 1 && (
                            <span className="keycap-plus">+</span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}