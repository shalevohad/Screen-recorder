// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Player/KeystrokePlaybackOverlay.jsx
// ==========================================
import React, { useMemo } from 'react';
import { cleanKeyCombination, parseKeyCombination, KEYSTROKE_CALIBRATION_OFFSET_MS } from '../../utils/virtualKeyMap.js';
import './KeystrokePlaybackOverlay.scss';

const DISPLAY_DURATION_MS = 2200;
const FADE_DURATION_MS = 400;

/**
 * KeystrokePlaybackOverlay renders tactical keycaps or caption HUD overlay synchronized with playback time.
 * Filters strictly to targetStationId and targetDisplayId when specified.
 * 
 * @param {Object} props
 * @param {number} [props.currentEpochMs=0] - Current playhead timestamp in Epoch milliseconds.
 * @param {Array} [props.keystrokes=[]] - Keystroke telemetry event array.
 * @param {'NONE'|'CAPTION'|'BURN_IN'|'OFF'} [props.keystrokeMode='BURN_IN'] - Display mode.
 * @param {string|null} [props.targetStationId=null] - Specific station to filter for.
 * @param {string|null} [props.targetDisplayId=null] - Specific display to filter for (or 'auto' for director track).
 * @param {Array} [props.displays=[]] - Display topology metadata for coordinate bounding checks.
 * @param {Object|null} [props.directorPlan=null] - Multi-display director plan.
 * @returns {JSX.Element|null}
 */
export default function KeystrokePlaybackOverlay({
    currentEpochMs = 0,
    keystrokes = [],
    keystrokeMode = 'BURN_IN', // Options: 'NONE' | 'CAPTION' | 'BURN_IN' | 'OFF'
    targetStationId = null,
    targetDisplayId = null,
    displays = [],
    directorPlan = null
}) {
    const normalizedMode = (keystrokeMode || 'NONE').toUpperCase().replace('-', '_');
    const isVisibleMode = normalizedMode === 'BURN_IN' || normalizedMode === 'CAPTION';

    const activeEvent = useMemo(() => {
        if (!isVisibleMode || !keystrokes.length || !currentEpochMs) return null;

        // Determine effective target display
        let effectiveTargetDisplay = targetDisplayId ? String(targetDisplayId).toLowerCase() : null;
        if (effectiveTargetDisplay === 'auto' && directorPlan?.segments) {
            const seg = directorPlan.segments.find(s => currentEpochMs >= s.startEpochMs && currentEpochMs < s.endEpochMs);
            effectiveTargetDisplay = (seg?.activeDisplayId || 'mon-0').toLowerCase();
        }

        const normalizedTargetStation = targetStationId ? String(targetStationId).toLowerCase() : null;

        for (let i = keystrokes.length - 1; i >= 0; i--) {
            const k = keystrokes[i];
            if (!k) continue;

            // Station check
            if (normalizedTargetStation) {
                const eventStation = (k.stationId || k.stationHostname || k.stationName || k.hostname || '').toLowerCase();
                if (eventStation && eventStation !== normalizedTargetStation) {
                    continue;
                }
            }

            // Display check
            if (effectiveTargetDisplay && effectiveTargetDisplay !== 'canvas' && effectiveTargetDisplay !== 'all-displays') {
                let eventDisplay = (k.displayId || k.DisplayId || '').toLowerCase();
                if (!eventDisplay && displays && displays.length > 0) {
                    const kx = k.x ?? k.X;
                    const ky = k.y ?? k.Y;
                    if (typeof kx === 'number' && typeof ky === 'number') {
                        const matchedDisp = displays.find(d => {
                            const dx = d.X ?? d.x ?? 0;
                            const dy = d.Y ?? d.y ?? 0;
                            const dw = d.Width ?? d.width ?? 1920;
                            const dh = d.Height ?? d.height ?? 1080;
                            return kx >= dx && kx < dx + dw && ky >= dy && ky < dy + dh;
                        });
                        if (matchedDisp) {
                            eventDisplay = (matchedDisp.DisplayId || matchedDisp.displayId || 'mon-0').toLowerCase();
                        }
                    }
                }
                if (!eventDisplay) {
                    eventDisplay = 'mon-0';
                }

                if (effectiveTargetDisplay !== eventDisplay) {
                    continue;
                }
            }

            const calibratedEpochMs = k.epochMs + KEYSTROKE_CALIBRATION_OFFSET_MS;
            const elapsed = currentEpochMs - calibratedEpochMs;

            if (elapsed >= 0 && elapsed <= DISPLAY_DURATION_MS) {
                return {
                    ...k,
                    elapsed
                };
            }
        }
        return null;
    }, [isVisibleMode, currentEpochMs, keystrokes, targetStationId, targetDisplayId, displays, directorPlan]);

    if (!isVisibleMode || !activeEvent) return null;

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
