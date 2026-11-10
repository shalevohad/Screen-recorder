// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Viewport/overlays/CanvasUtcWallClock.jsx
// Persistent Tactical UTC Wall Clock & Date Overlay for WYSIWYG Master Canvas
// Supports freeform drag-and-drop anywhere on canvas as well as corner preset cycling.
// Permanent orientation clock: Position can be moved, but CANNOT be removed.
// ==========================================
import React, { useState, useEffect, useCallback, useRef } from 'react';
import './CanvasUtcWallClock.scss';
import { CORNER_POSITIONS, parseClockPosition } from '../../../utils/clockPositionStore.js';

export default function CanvasUtcWallClock({
    currentEpochMs,
    position = null,
    onPositionChange = null
}) {
    const clockRef = useRef(null);
    const dragStartRef = useRef(null);

    const [internalPos, setInternalPos] = useState(() => {
        try {
            return localStorage.getItem('itb_canvas_utc_clock_pos') || 'top-right';
        } catch {
            return 'top-right';
        }
    });

    const activePos = position || internalPos;
    const parsedPos = parseClockPosition(activePos);

    const [isDragging, setIsDragging] = useState(false);
    const [dragCoords, setDragCoords] = useState(null);

    // Sync state when position prop updates externally
    useEffect(() => {
        if (!isDragging) {
            if (parsedPos.isCustom) {
                setDragCoords({ xPct: parsedPos.xPct, yPct: parsedPos.yPct });
            } else {
                setDragCoords(null);
            }
        }
    }, [activePos, isDragging, parsedPos.isCustom, parsedPos.xPct, parsedPos.yPct]);

    // Cycle between standard corners (or snap from custom to top-right)
    const handleCyclePosition = useCallback((e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        let nextPos;
        if (parsedPos.isCustom || !CORNER_POSITIONS.includes(parsedPos.preset)) {
            nextPos = 'top-right';
        } else {
            const curIdx = CORNER_POSITIONS.indexOf(parsedPos.preset);
            const nextIdx = (curIdx + 1) % CORNER_POSITIONS.length;
            nextPos = CORNER_POSITIONS[nextIdx];
        }
        setInternalPos(nextPos);
        setDragCoords(null);
        try {
            localStorage.setItem('itb_canvas_utc_clock_pos', nextPos);
        } catch { }
        if (onPositionChange) {
            onPositionChange(nextPos);
        }
    }, [parsedPos.isCustom, parsedPos.preset, onPositionChange]);

    // Drag-and-drop pointer interaction
    const handlePointerDown = useCallback((e) => {
        if (e.button !== undefined && e.button !== 0) return;
        if (e.target.closest('.btn-cycle-corner')) return;

        const clockEl = clockRef.current;
        if (!clockEl) return;
        const parentEl = clockEl.parentElement;
        if (!parentEl) return;

        const clockRect = clockEl.getBoundingClientRect();
        const parentRect = parentEl.getBoundingClientRect();

        dragStartRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            clockWidth: clockRect.width,
            clockHeight: clockRect.height,
            parentRect: parentRect,
            offsetX: e.clientX - clockRect.left,
            offsetY: e.clientY - clockRect.top,
            hasMoved: false
        };

        const onPointerMove = (moveEvent) => {
            if (!dragStartRef.current) return;
            const ds = dragStartRef.current;
            const dist = Math.hypot(moveEvent.clientX - ds.startX, moveEvent.clientY - ds.startY);
            if (!ds.hasMoved && dist > 4) {
                ds.hasMoved = true;
                setIsDragging(true);
            }
            if (!ds.hasMoved) return;

            const parentW = ds.parentRect.width;
            const parentH = ds.parentRect.height;
            const maxLeft = Math.max(1, parentW - ds.clockWidth - 28);
            const maxTop = Math.max(1, parentH - ds.clockHeight - 28);

            const currentLeft = moveEvent.clientX - ds.parentRect.left - ds.offsetX - 14;
            const currentTop = moveEvent.clientY - ds.parentRect.top - ds.offsetY - 14;

            const clampedX = Math.max(0, Math.min(maxLeft, currentLeft));
            const clampedY = Math.max(0, Math.min(maxTop, currentTop));

            const xPct = Math.round((clampedX / maxLeft) * 1000) / 10;
            const yPct = Math.round((clampedY / maxTop) * 1000) / 10;

            setDragCoords({ xPct, yPct });
        };

        const onPointerUp = (upEvent) => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointercancel', onPointerUp);

            const ds = dragStartRef.current;
            dragStartRef.current = null;
            setIsDragging(false);

            if (!ds) return;

            // If user simply clicked without moving, cycle position
            if (!ds.hasMoved) {
                handleCyclePosition();
                return;
            }

            const maxLeft = Math.max(1, ds.parentRect.width - ds.clockWidth - 28);
            const maxTop = Math.max(1, ds.parentRect.height - ds.clockHeight - 28);
            const currentX = upEvent.clientX - ds.parentRect.left - ds.offsetX - 14;
            const currentTop = upEvent.clientY - ds.parentRect.top - ds.offsetY - 14;
            const clampedX = Math.max(0, Math.min(maxLeft, currentX));
            const clampedY = Math.max(0, Math.min(maxTop, currentTop));
            const xPct = (clampedX / maxLeft) * 100;
            const yPct = (clampedY / maxTop) * 100;

            let finalPos;
            // Snap to corner presets if dropped within 6% of extreme bounds
            if (xPct > 94 && yPct < 6) finalPos = 'top-right';
            else if (xPct < 6 && yPct < 6) finalPos = 'top-left';
            else if (xPct > 94 && yPct > 94) finalPos = 'bottom-right';
            else if (xPct < 6 && yPct > 94) finalPos = 'bottom-left';
            else {
                finalPos = `custom:${xPct.toFixed(1)},${yPct.toFixed(1)}`;
            }

            setInternalPos(finalPos);
            try {
                localStorage.setItem('itb_canvas_utc_clock_pos', finalPos);
            } catch { }
            if (onPositionChange) {
                onPositionChange(finalPos);
            }
        };

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);
    }, [handleCyclePosition, onPositionChange]);

    const dateObj = new Date(currentEpochMs || Date.now());
    const yyyy = dateObj.getUTCFullYear();
    const mm = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getUTCDate()).padStart(2, '0');
    const hh = String(dateObj.getUTCHours()).padStart(2, '0');
    const min = String(dateObj.getUTCMinutes()).padStart(2, '0');
    const ss = String(dateObj.getUTCSeconds()).padStart(2, '0');

    const dateStr = `${yyyy}-${mm}-${dd}`;
    const timeStr = `${hh}:${min}:${ss} UTC`;

    const isCustomActive = (dragCoords !== null) || parsedPos.isCustom;
    const currentCoords = dragCoords || (parsedPos.isCustom ? { xPct: parsedPos.xPct, yPct: parsedPos.yPct } : null);

    let customInlineStyle = undefined;
    if (currentCoords) {
        const xRatio = currentCoords.xPct / 100;
        const yRatio = currentCoords.yPct / 100;
        customInlineStyle = {
            left: `calc(14px + (100% - 28px) * ${xRatio})`,
            top: `calc(14px + (100% - 28px) * ${yRatio})`,
            transform: `translate(-${currentCoords.xPct}%, -${currentCoords.yPct}%)`,
            right: 'auto',
            bottom: 'auto'
        };
    }

    const cornerClass = (!isCustomActive && parsedPos.preset) ? `corner-${parsedPos.preset}` : '';

    return (
        <aside
            ref={clockRef}
            className={`canvas-utc-wall-clock ${cornerClass} ${isDragging ? 'is-dragging' : ''} ${isCustomActive ? 'is-custom' : ''}`}
            style={customInlineStyle}
            onPointerDown={handlePointerDown}
            title="Persistent Canvas UTC Wall Clock • Drag to place anywhere on canvas • Click or use [⤢] to cycle corners"
            aria-label="Canvas UTC Wall Clock"
        >
            <div className="clock-beacon-pulse" />
            <div className="clock-content-wrap">
                <span className="clock-date-val">{dateStr}</span>
                <span className="clock-sep">•</span>
                <span className="clock-time-val">{timeStr}</span>
            </div>
            {isDragging && currentCoords && (
                <div className="clock-drag-badge">
                    <span>{Math.round(currentCoords.xPct)}%, {Math.round(currentCoords.yPct)}%</span>
                </div>
            )}
            <button
                type="button"
                className="btn-cycle-corner"
                onClick={handleCyclePosition}
                title={isCustomActive
                    ? `Custom Position (${Math.round(currentCoords?.xPct || 0)}%, ${Math.round(currentCoords?.yPct || 0)}%) • Click to snap to TOP-RIGHT`
                    : `Current corner: ${parsedPos.preset?.toUpperCase() || 'TOP-RIGHT'} • Click to switch corner`}
                aria-label="Switch clock corner"
            >
                ⤢
            </button>
        </aside>
    );
}
