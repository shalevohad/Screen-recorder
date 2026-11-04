// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Viewport/overlays/CanvasUtcWallClock.jsx
// Persistent Tactical UTC Wall Clock & Date Overlay for WYSIWYG Master Canvas
// Permanent orientation clock: Position can be moved between corners, but CANNOT be removed.
// ==========================================
import React, { useState, useEffect, useCallback } from 'react';
import './CanvasUtcWallClock.scss';

const CORNER_POSITIONS = ['top-right', 'bottom-right', 'bottom-left', 'top-left'];

export default function CanvasUtcWallClock({
    currentEpochMs,
    position = null,
    onPositionChange = null
}) {
    const [internalPos, setInternalPos] = useState(() => {
        try {
            return localStorage.getItem('itb_canvas_utc_clock_pos') || 'top-right';
        } catch {
            return 'top-right';
        }
    });

    const activePos = position || internalPos;

    const handleCyclePosition = useCallback((e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const curIdx = CORNER_POSITIONS.indexOf(activePos);
        const nextIdx = (curIdx + 1) % CORNER_POSITIONS.length;
        const nextPos = CORNER_POSITIONS[nextIdx];
        setInternalPos(nextPos);
        try {
            localStorage.setItem('itb_canvas_utc_clock_pos', nextPos);
        } catch { }
        if (onPositionChange) {
            onPositionChange(nextPos);
        }
    }, [activePos, onPositionChange]);

    const dateObj = new Date(currentEpochMs || Date.now());
    const yyyy = dateObj.getUTCFullYear();
    const mm = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getUTCDate()).padStart(2, '0');
    const hh = String(dateObj.getUTCHours()).padStart(2, '0');
    const min = String(dateObj.getUTCMinutes()).padStart(2, '0');
    const ss = String(dateObj.getUTCSeconds()).padStart(2, '0');

    const dateStr = `${yyyy}-${mm}-${dd}`;
    const timeStr = `${hh}:${min}:${ss} UTC`;

    return (
        <aside
            className={`canvas-utc-wall-clock corner-${activePos}`}
            onClick={handleCyclePosition}
            title="Persistent Canvas UTC Wall Clock • Click or use [⤢] to cycle corner position (Permanent orientation clock)"
            aria-label="Canvas UTC Wall Clock"
        >
            <div className="clock-beacon-pulse" />
            <div className="clock-content-wrap">
                <span className="clock-date-val">{dateStr}</span>
                <span className="clock-sep">•</span>
                <span className="clock-time-val">{timeStr}</span>
            </div>
            <button
                type="button"
                className="btn-cycle-corner"
                onClick={handleCyclePosition}
                title={`Current corner: ${activePos.toUpperCase()} • Click to switch corner`}
                aria-label="Switch clock corner"
            >
                ⤢
            </button>
        </aside>
    );
}
