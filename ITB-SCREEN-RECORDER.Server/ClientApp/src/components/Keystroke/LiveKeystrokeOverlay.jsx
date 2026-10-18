// ==========================================
// File: ClientApp/src/components/Keystroke/LiveKeystrokeOverlay.jsx
// ==========================================
import React, { useMemo } from 'react';
import { parseKeyCombination, cleanKeyCombination } from '../../utils/keyUtils';
import './LiveKeystrokeOverlay.scss';

const DISPLAY_DURATION_MS = 2800;
const FADE_DURATION_MS = 450;

export default function LiveKeystrokeOverlay({
    keystrokes = [],
    isLive = false,
    variant = 'viewport', // 'viewport' | 'fullscreen' | 'compact'
    mode = 'burn-in'      // 'burn-in' | 'caption' | 'none'
}) {
    const normalizedMode = (mode || 'burn-in').toLowerCase().replace('_', '-');

    // 💡 מצב כבוי לחלוטין (None / Off)
    if (normalizedMode === 'none' || normalizedMode === 'off') {
        return null;
    }

    if (!isLive || !keystrokes || (Array.isArray(keystrokes) && keystrokes.length === 0)) {
        return null;
    }

    // שליפת האירוע העדכני ביותר מתוך המקשים הפעילים
    const latestEvent = Array.isArray(keystrokes) ? keystrokes[keystrokes.length - 1] : keystrokes;
    if (!latestEvent) {
        return null;
    }

    const rawCombo = latestEvent.combo || latestEvent.keyCombination || latestEvent.KeyCombination || (typeof latestEvent === 'string' ? latestEvent : '');
    if (!rawCombo || !rawCombo.trim()) {
        return null;
    }

    const now = Date.now();
    const receivedAt = latestEvent.receivedAt || latestEvent.epochMs || latestEvent.EpochMs || now;
    const elapsed = Math.max(0, now - receivedAt);
    if (elapsed > DISPLAY_DURATION_MS) {
        return null;
    }

    // חישוב שקיפות עדינה ב-Fade Out
    let opacity = 1;
    if (elapsed > (DISPLAY_DURATION_MS - FADE_DURATION_MS)) {
        const fadeProgress = (elapsed - (DISPLAY_DURATION_MS - FADE_DURATION_MS)) / FADE_DURATION_MS;
        opacity = Math.max(0, 1 - fadeProgress);
    }

    if (opacity <= 0.05) {
        return null;
    }

    const cleanCombo = cleanKeyCombination(rawCombo) || rawCombo;

    // תצוגה דחוסה לשורות ב-Dense View
    if (variant === 'compact') {
        return (
            <div className="live-keystroke-compact-pill" style={{ opacity }} title={`Live Keystroke: ${cleanCombo}`}>
                <span className="live-key-beacon" />
                <span className="live-key-text">{cleanCombo}</span>
            </div>
        );
    }

    const isFullscreen = variant === 'fullscreen';

    // 🎯 מצב 1: כתובית תחתונה רכה (Soft Caption) - כמו בסטודיו
    if (normalizedMode === 'caption') {
        return (
            <div
                className={`live-keystroke-overlay-root mode-caption ${isFullscreen ? 'mode-fullscreen' : 'mode-viewport'}`}
                style={{ opacity }}
            >
                <div className="caption-bar">
                    <span className="caption-text">[ {cleanCombo} ]</span>
                </div>
            </div>
        );
    }

    // 🎯 מצב 2: צריבה קשיחה טקטית (Hard Burn-in) - Keycaps זוהרים
    const keys = parseKeyCombination(rawCombo);
    if (!keys || keys.length === 0) {
        return null;
    }

    return (
        <div
            className={`live-keystroke-overlay-root mode-burnin ${isFullscreen ? 'mode-fullscreen' : 'mode-viewport'}`}
            style={{ opacity }}
        >
            <div className="keycap-cluster">
                {keys.map((key, idx) => (
                    <React.Fragment key={`${latestEvent.id || idx}_${key}_${idx}`}>
                        <div className={`keycap-badge ${key === '*' ? 'is-masked' : ''}`}>
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
