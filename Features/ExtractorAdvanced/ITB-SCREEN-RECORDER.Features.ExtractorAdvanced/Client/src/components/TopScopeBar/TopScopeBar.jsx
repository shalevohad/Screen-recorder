// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/TopScopeBar/TopScopeBar.jsx
// ==========================================
import React, { useMemo } from 'react';
import './TopScopeBar.scss';

export default function TopScopeBar({
    timeRange,
    baseEpochMs,
    timeMode,
    setTimeMode,
    activeStationId,
    hideBackToGrid, // 💡 הפרופ החדש שקיבלנו מהאבא
    onResetActiveStation,
    onOpenRangeModal,
    onOpenBookmarksModal,
    onToggleDrawer,
    isInitialSetup = false
}) {
    const formattedScopeRange = useMemo(() => {
        const startEpoch = baseEpochMs;
        const endEpoch = baseEpochMs + timeRange.durationMs;
        const pad = (n) => String(n).padStart(2, '0');

        const dStart = new Date(startEpoch);
        const dEnd = new Date(endEpoch);

        if (timeMode === 'UTC') {
            const dateStr = `${dStart.getUTCFullYear()}-${pad(dStart.getUTCMonth() + 1)}-${pad(dStart.getUTCDate())}`;
            const sTime = `${pad(dStart.getUTCHours())}:${pad(dStart.getUTCMinutes())}:${pad(dStart.getUTCSeconds())}`;
            const eTime = `${pad(dEnd.getUTCHours())}:${pad(dEnd.getUTCMinutes())}:${pad(dEnd.getUTCSeconds())}`;
            return `${dateStr} ${sTime} ➔ ${eTime} (UTC)`;
        }

        const dateStr = `${dStart.getFullYear()}-${pad(dStart.getMonth() + 1)}-${pad(dStart.getDate())}`;
        const sTime = `${pad(dStart.getHours())}:${pad(dStart.getMinutes())}:${pad(dStart.getSeconds())}`;
        const eTime = `${pad(dEnd.getHours())}:${pad(dEnd.getMinutes())}:${pad(dEnd.getSeconds())}`;
        return `${dateStr} ${sTime} ➔ ${eTime} (LOCAL)`;
    }, [baseEpochMs, timeRange.durationMs, timeMode]);

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
                    <span className="total-duration">({Math.floor(timeRange.durationMs / 60000)}m Total)</span>
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
            </div>

            <div className="scope-view-actions">
                {/* 💡 העלמה מוחלטת של כפתור החזרה אם נבחרה תחנה יחידה */}
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
        </div>
    );
}