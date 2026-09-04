import React from 'react';
import './TacticalStatusBadge.scss';

const DEFAULT_PRESETS = {
    link: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round">
            <circle cx="12" cy="12" r="3" fill="currentColor" />
            <path d="M5 12a7 7 0 0 1 14 0" />
            <path d="M2 12a10 10 0 0 1 20 0" />
        </svg>
    ),
    audio: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
    ),
    'audio-off': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <line x1="1" y1="1" x2="23" y2="23" />
            <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V5a3 3 0 0 0-5.94-.6" />
            <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
    ),
    encoder: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="4" y="4" width="16" height="16" rx="2.5" />
            <circle cx="12" cy="12" r="3.5" fill="currentColor" />
        </svg>
    ),
    alert: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3L22 21H2L12 3z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <circle cx="12" cy="17" r="1" fill="currentColor" />
        </svg>
    )
};

export default function TacticalStatusBadge({
    icon,
    type = 'link',
    status = 'ok',
    title = 'SYSTEM TELEMETRY',
    label,
    statusText,
    description = '',
    children,
    className = ''
}) {
    const rawIcon = icon || children || DEFAULT_PRESETS[type] || null;

    const renderedIcon = React.isValidElement(rawIcon)
        ? React.cloneElement(rawIcon, {
            className: `tactical-icon-glyph ${rawIcon.props.className || ''}`,
            strokeWidth: rawIcon.props.strokeWidth || 2.4,
            'aria-hidden': true
        })
        : rawIcon;

    let displayTitle = label || title || '';
    let displayStatus = statusText;

    if (!displayStatus && typeof displayTitle === 'string') {
        if (displayTitle.endsWith(' ACTIVE')) {
            displayTitle = displayTitle.slice(0, -7);
            displayStatus = 'ACTIVE';
        } else if (displayTitle.endsWith(' OFFLINE')) {
            displayTitle = displayTitle.slice(0, -8);
            displayStatus = 'OFFLINE';
        }
    }

    return (
        <div className={`tactical-status-badge status-${status} ${className}`}>
            <span className="badge-icon-slot">
                {renderedIcon}
            </span>

            {(displayTitle || description) && (
                <div className="tactical-hud-tooltip">
                    <div className="tooltip-header">
                        <span className="tooltip-dot"></span>
                        <span className="tooltip-title">{displayTitle}</span>
                        {displayStatus && <span className="tooltip-status">{displayStatus}</span>}
                    </div>
                    {description && <div className="tooltip-desc">{description}</div>}
                </div>
            )}
        </div>
    );
}