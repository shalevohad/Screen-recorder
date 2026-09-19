// Client/src/components/Timeline/TimelineContextMenu.jsx
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { formatTimelineClock } from '../../utils/timeFormat.js';
import './TimelineContextMenu.scss';

export default function TimelineContextMenu({
    contextMenu,
    baseEpochMs = 0,
    timeMode = 'LOCAL',
    onAction,
    onClose
}) {
    const menuRef = useRef(null);

    useEffect(() => {
        if (!contextMenu) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && onClose) onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [contextMenu, onClose]);

    if (!contextMenu) return null;

    // הגנה מפני חריגה מגבולות המסך (Edge Clamping)
    const menuWidth = 210;
    const menuHeight = 150;
    const posX = Math.min(contextMenu.x, window.innerWidth - menuWidth - 12);
    const posY = Math.min(contextMenu.y, window.innerHeight - menuHeight - 12);

    const content = (
        <div
            ref={menuRef}
            className="timeline-context-menu"
            style={{ top: posY, left: posX }}
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
        >
            <div className="menu-header">
                <span className="header-tag">TIMELINE POSITION</span>
                <span className="time-badge">
                    {formatTimelineClock(baseEpochMs + contextMenu.targetMs, timeMode)}
                </span>
            </div>

            <div className="menu-items">
                <button type="button" onClick={() => onAction('playhead')}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polygon points="6 4 18 12 6 20 6 4" fill="currentColor" />
                    </svg>
                    <span>Move Playhead</span>
                </button>

                <button type="button" onClick={() => onAction('in')}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 6v12M9 6l6 6-6 6" />
                    </svg>
                    <span>Set Cut IN</span>
                    <kbd className="shortcut-pill">[</kbd>
                </button>

                <button type="button" onClick={() => onAction('out')}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6v12M15 6l-6 6 6 6" />
                    </svg>
                    <span>Set Cut OUT</span>
                    <kbd className="shortcut-pill">]</kbd>
                </button>
            </div>
        </div>
    );

    // רינדור ב-Portal כדי למנוע חסימות ו-overflow מה-Parent containers
    return createPortal(content, document.body);
}