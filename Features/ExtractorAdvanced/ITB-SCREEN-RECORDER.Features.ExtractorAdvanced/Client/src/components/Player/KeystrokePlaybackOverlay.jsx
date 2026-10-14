// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Player/KeystrokePlaybackOverlay.jsx
// ==========================================
import React, { useMemo } from 'react';
import { cleanKeyCombination, parseKeyCombination } from '../../utils/virtualKeyMap.js';
import './KeystrokePlaybackOverlay.scss';

const DISPLAY_DURATION_MS = 2200;
const FADE_DURATION_MS = 400;

export default function KeystrokePlaybackOverlay({
    currentEpochMs = 0,
    keystrokes = [],
    keystrokeMode = 'BURN_IN' // אפשרויות: 'NONE' | 'CAPTION' | 'BURN_IN' | 'OFF'
}) {
    const normalizedMode = (keystrokeMode || 'NONE').toUpperCase().replace('-', '_');

    // 💡 אם המצב הוא NONE או OFF - לא מרנדרים דבר
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

    // חישוב שקיפות ה-Fade Out ב-400 המילישניות האחרונות
    let opacity = 1;
    if (activeEvent.elapsed > (DISPLAY_DURATION_MS - FADE_DURATION_MS)) {
        const fadeProgress = (activeEvent.elapsed - (DISPLAY_DURATION_MS - FADE_DURATION_MS)) / FADE_DURATION_MS;
        opacity = Math.max(0, 1 - fadeProgress);
    }

    if (opacity <= 0.05) return null;

    // 💡 מצב 1: כתובית סרטים רכה (Caption) - מוצגת בתחתית הנגן (מעל האי בציר זמן ב-Fullscreen)
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

    // 💡 מצב 2: צריבה קשיחה טקטית (Burn-In) - מקשי Keycaps זוהרים במרכז
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