// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/TopScopeBar/TopScopeBar.jsx
// ==========================================
import React, { useMemo, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './TopScopeBar.scss';

export default function TopScopeBar({
    timeRange,
    baseEpochMs,
    timeMode,
    setTimeMode,
    activeStationId,
    hideBackToGrid,
    onResetActiveStation,
    onOpenRangeModal,
    onOpenBookmarksModal,
    onOpenHelpModal,
    onToggleDrawer,
    isInitialSetup = false,
    selectedCount = 0,
    totalCount = 0,
    onResetStudio
}) {
    const [isConfirmResetOpen, setIsConfirmResetOpen] = useState(false);

    useEffect(() => {
        if (!isConfirmResetOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsConfirmResetOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isConfirmResetOpen]);

    const formattedScopeRange = useMemo(() => {
        const startEpoch = baseEpochMs || (timeRange?.start ? new Date(timeRange.start).getTime() : Date.now());
        const durationMs = timeRange?.durationMs || 0;
        const endEpoch = startEpoch + durationMs;
        const pad = (n) => String(n).padStart(2, '0');

        const dStart = new Date(startEpoch);
        const dEnd = new Date(endEpoch);

        if (timeMode === 'UTC') {
            const sDate = `${dStart.getUTCFullYear()}-${pad(dStart.getUTCMonth() + 1)}-${pad(dStart.getUTCDate())}`;
            const sTime = `${pad(dStart.getUTCHours())}:${pad(dStart.getUTCMinutes())}:${pad(dStart.getUTCSeconds())}`;

            const eDate = `${dEnd.getUTCFullYear()}-${pad(dEnd.getUTCMonth() + 1)}-${pad(dEnd.getUTCDate())}`;
            const eTime = `${pad(dEnd.getUTCHours())}:${pad(dEnd.getUTCMinutes())}:${pad(dEnd.getUTCSeconds())}`;

            const endFormatted = sDate === eDate ? eTime : `${eDate} ${eTime}`;
            return `${sDate} ${sTime} ➔ ${endFormatted} (UTC)`;
        }

        const sDate = `${dStart.getFullYear()}-${pad(dStart.getMonth() + 1)}-${pad(dStart.getDate())}`;
        const sTime = `${pad(dStart.getHours())}:${pad(dStart.getMinutes())}:${pad(dStart.getSeconds())}`;

        const eDate = `${dEnd.getFullYear()}-${pad(dEnd.getMonth() + 1)}-${pad(dEnd.getDate())}`;
        const eTime = `${pad(dEnd.getHours())}:${pad(dEnd.getMinutes())}:${pad(dEnd.getSeconds())}`;

        const endFormatted = sDate === eDate ? eTime : `${eDate} ${eTime}`;
        return `${sDate} ${sTime} ➔ ${endFormatted} (LOCAL)`;
    }, [baseEpochMs, timeRange?.start, timeRange?.durationMs, timeMode]);

    const formattedDuration = useMemo(() => {
        const totalMinutes = Math.floor((timeRange?.durationMs || 0) / 60000);
        if (totalMinutes >= 1440) {
            const days = (totalMinutes / 1440).toFixed(1);
            const cleanDays = days.endsWith('.0') ? parseInt(days, 10) : days;
            return `(${cleanDays}d / ${totalMinutes}m Total)`;
        }
        return `(${totalMinutes}m Total)`;
    }, [timeRange?.durationMs]);

    const handleConfirmReset = () => {
        setIsConfirmResetOpen(false);
        onResetStudio?.();
    };

    const resetModal = isConfirmResetOpen ? (
        <div className="studio-reset-modal-backdrop" onClick={() => setIsConfirmResetOpen(false)}>
            <div className="studio-reset-modal-card" onClick={(e) => e.stopPropagation()} dir="ltr">
                <div className="reset-modal-header">
                    <div className="reset-header-title-group">
                        <div className="warning-icon-badge">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                <line x1="12" y1="9" x2="12" y2="13" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                        </div>
                        <div className="reset-header-text">
                            <h3>RESET STUDIO SESSION</h3>
                            <span className="reset-header-sub">WORKSPACE CACHE CLEAR</span>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="btn-modal-close"
                        onClick={() => setIsConfirmResetOpen(false)}
                        title="Close (ESC)"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className="reset-modal-body">
                    <p className="reset-modal-lead">
                        Are you sure you want to reset the entire studio workspace?
                    </p>
                    <ul className="reset-impact-list">
                        <li>All station selections and multicam views will be unpinned</li>
                        <li>Cut In / Out points and playhead timeline markers will reset</li>
                        <li>Playback speeds, zoom parameters, and local caches will clear</li>
                    </ul>
                </div>

                <div className="reset-modal-actions">
                    <button type="button" className="btn-cancel" onClick={() => setIsConfirmResetOpen(false)}>
                        CANCEL
                    </button>
                    <button type="button" className="btn-confirm-danger" onClick={handleConfirmReset}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="14" height="14">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                        </svg>
                        YES, RESET EVERYTHING
                    </button>
                </div>
            </div>
        </div>
    ) : null;

    return (
        <div className="studio-top-scope-bar">
            <div className="scope-info-group">
                <span className="scope-tag">MISSION SCOPE</span>

                <div
                    className="scope-time-badge clickable"
                    onClick={onOpenRangeModal}
                    title="Click to modify mission time window"
                >
                    <span className="time-string">{formattedScopeRange}</span>
                    <span className="total-duration">{formattedDuration}</span>
                </div>

                <div className="time-mode-toggle-group">
                    <button
                        type="button"
                        className={`btn-mode-icon ${timeMode === 'LOCAL' ? 'active' : ''}`}
                        onClick={() => setTimeMode('LOCAL')}
                        title="Workstation Local Time (e.g. IDT / GMT+3)"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="9" strokeWidth="2.5" />
                            <polyline points="12 7 12 12 15 15" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        className={`btn-mode-icon ${timeMode === 'UTC' ? 'active' : ''}`}
                        onClick={() => setTimeMode('UTC')}
                        title="Coordinated Universal Time / Military Zulu (UTC)"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" strokeWidth="2.5" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" strokeWidth="2.5" />
                            <line x1="2" y1="12" x2="22" y2="12" strokeWidth="2.5" />
                        </svg>
                    </button>
                </div>

                <div
                    className="scope-fleet-selection-pill clickable"
                    onClick={onToggleDrawer}
                    title="Click to change selected station pool"
                >
                    <span className="beacon-dot" />
                    <span className="selection-label">SELECTED:</span>
                    <strong className="selection-count">{selectedCount}</strong>
                    <span className="selection-total">/ {totalCount}</span>
                </div>
            </div>

            <div className="scope-view-actions">
                {!hideBackToGrid && activeStationId && (
                    <button type="button" onClick={onResetActiveStation} className="btn-grid-return">
                        ⊞ Back to Grid
                    </button>
                )}

                <button
                    type="button"
                    onClick={onOpenBookmarksModal}
                    className="btn-bookmarks-prominent"
                    title="Session Bookmarks & Events"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <span>BOOKMARKS</span>
                </button>

                <button
                    type="button"
                    onClick={onOpenHelpModal}
                    className="btn-help-shortcuts"
                    title="Keyboard Shortcuts & Controls Cheat Sheet (Press ?)"
                >
                    <span className="help-icon-symbol">?</span>
                    <span>SHORTCUTS</span>
                </button>

                <button
                    type="button"
                    onClick={() => setIsConfirmResetOpen(true)}
                    className="btn-reset-studio"
                    title="Reset Studio Session & Clear Cache"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                    </svg>
                    <span>RESET</span>
                </button>

                {!isInitialSetup && (
                    <button
                        type="button"
                        onClick={onToggleDrawer}
                        className="btn-toggle-drawer"
                        title="Toggle Station Pool"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                )}
            </div>

            {typeof document !== 'undefined' && resetModal && createPortal(resetModal, document.body)}
        </div>
    );
}