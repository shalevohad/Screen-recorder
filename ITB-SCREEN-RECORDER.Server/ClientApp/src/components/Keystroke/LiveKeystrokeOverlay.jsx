// ==========================================
// File: ClientApp/src/components/Keystroke/LiveKeystrokeOverlay.jsx
// ==========================================
import React, { useMemo } from 'react';
import { parseKeyCombination } from '../../utils/keyUtils';
import './LiveKeystrokeOverlay.scss';

const DISPLAY_DURATION_MS = 2500;
const FADE_DURATION_MS = 400;

export default function LiveKeystrokeOverlay({
    keystrokes = [],
    isLive = false,
    variant = 'viewport' // 'viewport' | 'fullscreen' | 'compact'
}) {
    if (!isLive || !keystrokes || keystrokes.length === 0) {
        return null;
    }

    // שליפת האירוע העדכני ביותר מתוך המקשים הפעילים
    const latestEvent = keystrokes[keystrokes.length - 1];
    if (!latestEvent || !latestEvent.combo) {
        return null;
    }

    const elapsed = latestEvent.receivedAt ? Date.now() - latestEvent.receivedAt : 0;
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

    const keys = parseKeyCombination(latestEvent.combo);
    if (!keys || keys.length === 0) {
        return null;
    }

    // תצוגה דחוסה לשורות ב-Dense View
    if (variant === 'compact') {
        return (
            <div className="live-keystroke-compact-pill" style={{ opacity }} title={`Live Keystroke: ${latestEvent.combo}`}>
                <span className="live-key-beacon" />
                <span className="live-key-text">{latestEvent.combo}</span>
            </div>
        );
    }

    // תצוגת Viewport בכרטיס או במסך מלא
    const isFullscreen = variant === 'fullscreen';

    return (
        <div
            className={`live-keystroke-overlay-root ${isFullscreen ? 'mode-fullscreen' : 'mode-viewport'}`}
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
