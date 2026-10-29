// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Modals/StationContextMenu.jsx
// ==========================================
import React, { useEffect, useRef } from 'react';
import './StationContextMenu.scss';

export default function StationContextMenu({
    menu, // { x, y, station }
    onClose,
    onDeselect,
    onFocusSolo
}) {
    const menuRef = useRef(null);

    useEffect(() => {
        if (!menu) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose?.();
        };

        const handleMouseDown = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                onClose?.();
            }
        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [menu, onClose]);

    if (!menu || !menu.station) return null;

    const { x, y, station } = menu;
    const stationName = station.displayName || station.hostname || station.name || station.id;

    return (
        <div
            ref={menuRef}
            className="station-context-menu-root"
            style={{ top: `${y}px`, left: `${x}px` }}
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
        >
            <div className="menu-header">
                <span className="station-title" title={stationName}>
                    {stationName}
                </span>
                <span className="station-sub">
                    {station.hostname && stationName.toLowerCase() !== station.hostname.toLowerCase() ? `HOST: ${station.hostname}` : (station.ipAddress || (station.isOnline ? 'ONLINE' : 'ACTIVE CHANNEL'))}
                </span>
            </div>

            <div className="menu-divider" />

            <button
                type="button"
                className="menu-action-item deselect-action"
                onClick={() => {
                    onDeselect?.(station.id);
                    onClose?.();
                }}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="13" height="13">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                <span>Deselect (Remove from Grid)</span>
            </button>

            {onFocusSolo && (
                <button
                    type="button"
                    className="menu-action-item focus-action"
                    onClick={() => {
                        onFocusSolo?.(station.id);
                        onClose?.();
                    }}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="13" height="13">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M3 12h3M18 12h3M12 3v3M12 18v3" />
                    </svg>
                    <span>Focus Station (Solo)</span>
                </button>
            )}
        </div>
    );
}