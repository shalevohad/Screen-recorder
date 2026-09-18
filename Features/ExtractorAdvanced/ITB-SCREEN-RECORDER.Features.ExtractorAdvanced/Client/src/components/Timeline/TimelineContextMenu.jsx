// Client/src/components/Timeline/TimelineContextMenu.jsx
import React from 'react';
import { formatTimelineClock } from '../../utils/timeFormat.js';
import './TimelineContextMenu.scss';

export default function TimelineContextMenu({
    contextMenu,
    baseEpochMs = 0,
    timeMode = 'LOCAL',
    onAction
}) {
    if (!contextMenu) return null;

    return (
        <div
            className="timeline-context-menu"
            style={{ top: contextMenu.y, left: contextMenu.x }}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="menu-header">
                TIMELINE @ {formatTimelineClock(baseEpochMs + contextMenu.targetMs, timeMode)}
            </div>
            <button type="button" onClick={() => onAction('playhead')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Move Playhead Here
            </button>
            <button type="button" onClick={() => onAction('in')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 6v12M10 6l6 6-6 6" />
                </svg>
                Set Cut IN Marker ([)
            </button>
            <button type="button" onClick={() => onAction('out')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6v12M14 6l-6 6 6 6" />
                </svg>
                Set Cut OUT Marker (])
            </button>
        </div>
    );
}