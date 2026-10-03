// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/TopScopeBar/TopScopeBar.jsx
// ==========================================
import React, { useMemo, useState } from 'react';
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
    onOpenHelpModal, // 💡 פתיחת מודאל המקשים
    onToggleDrawer,
    isInitialSetup = false,
    selectedCount = 0,
    totalCount = 0,
    onResetStudio
}) {
    const [isConfirmResetOpen, setIsConfirmResetOpen] = useState(false);

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

                {/* 💡 כפתור חלון מקשי הקיצור והעזרה */}
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

            {isConfirmResetOpen && (
                <div className="studio-reset-modal-backdrop" onClick={() => setIsConfirmResetOpen(false)}>
                    <div className="studio-reset-modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="reset-modal-header">
                            <span className="warning-icon">⚠</span>
                            <h3>RESET STUDIO SESSION</h3>
                        </div>
                        <p className="reset-modal-desc">
                            Are you sure you want to reset the entire studio workspace?
                            <br />
                            All station selections, cut in/out markers, playhead position, and local timeline caches will be permanently cleared.
                        </p>
                        <div className="reset-modal-actions">
                            <button type="button" className="btn-cancel" onClick={() => setIsConfirmResetOpen(false)}>
                                CANCEL
                            </button>
                            <button type="button" className="btn-confirm-danger" onClick={handleConfirmReset}>
                                YES, RESET EVERYTHING
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}