// ==========================================
// File: ClientApp/src/components/Dashboard/NotRecordingAlertBanner.jsx
// ==========================================
import { useState } from 'react';
import './NotRecordingAlertBanner.scss';

export default function NotRecordingAlertBanner({
    unrecordedStations = [],
    snoozedStations = [],
    onSelectStation,
    onStartRecordingStation,
    onStartRecordingAll,
    onOpenBulkSnoozeModal,
    onOpenSnoozeModal,
    isPrioritizeAtFront,
    onTogglePrioritizeAtFront,
    onViewSnoozed,
    isSnoozedFilterActive,
    onClearSnoozedFilter
}) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    if (unrecordedStations.length === 0 && snoozedStations.length === 0) {
        return null;
    }

    const activeCount = unrecordedStations.length;
    const snoozedCount = snoozedStations.length;

    // If all are snoozed, render a calm small status bar
    if (activeCount === 0 && snoozedCount > 0) {
        return (
            <div className="snoozed-fleet-status-bar">
                <div className="snoozed-left">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="14" height="14" className="snooze-icon">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className="snooze-text">
                        <strong>{snoozedCount} Workstation(s)</strong> have recording alerts postponed.
                    </span>
                </div>
                <div className="snoozed-actions">
                    {isSnoozedFilterActive ? (
                        <button
                            type="button"
                            className="btn-return-all"
                            onClick={onClearSnoozedFilter}
                            title="Return to standard view showing all workstations"
                        >
                            <span>↺ Return to All Stations</span>
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn-view-snoozed"
                            onClick={onViewSnoozed}
                            title="Filter dashboard grid to view only postponed workstations"
                        >
                            <span>⏰ View Postponed Stations ({snoozedCount})</span>
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="not-recording-alert-banner">
            <div className="alert-banner-top-row">
                <div className="alert-banner-headline">
                    <div className="alert-pulse-badge">
                        <span className="alert-sonar-wave" />
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="15" height="15" className="alert-icon">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                    </div>
                    <div className="alert-headline-text">
                        <div className="alert-title-row">
                            <span className="alert-main-title">
                                OPERATIONAL ALERT: {activeCount} WORKSTATION(S) NOT RECORDING
                            </span>
                            {snoozedCount > 0 && (
                                <button
                                    type="button"
                                    className={`snoozed-count-pill ${isSnoozedFilterActive ? "active" : ""}`}
                                    onClick={isSnoozedFilterActive ? onClearSnoozedFilter : onViewSnoozed}
                                    style={{ cursor: 'pointer', border: '1px solid rgba(245, 158, 11, 0.5)' }}
                                    title={isSnoozedFilterActive ? "Currently viewing postponed stations. Click to return to all." : "Click to view only postponed stations."}
                                >
                                    ⏰ {snoozedCount} Postponed {isSnoozedFilterActive ? '(Viewing ↺ Return)' : '(View)'}
                                </button>
                            )}
                        </div>
                        <span className="alert-sub-description">
                            Continuous capture invariant: Workstations are streaming live in Monitor-Only mode. Disk archive is suspended.
                        </span>
                    </div>
                </div>

                <div className="alert-banner-actions">
                    <button
                        type="button"
                        className={`btn-toggle-prioritize ${isPrioritizeAtFront ? 'active' : ''}`}
                        onClick={onTogglePrioritizeAtFront}
                        title={isPrioritizeAtFront ? "Warning stations are pinned to front of grid" : "Click to pin warning stations to front"}
                    >
                        <span>{isPrioritizeAtFront ? '📌 PINNED TO TOP' : '📌 PIN TO TOP'}</span>
                    </button>

                    <button
                        type="button"
                        className="btn-bulk-snooze"
                        onClick={onOpenBulkSnoozeModal}
                        title="Postpone alerts for all unrecorded stations (e.g. for maintenance)"
                    >
                        <span>⏰ Postpone All</span>
                    </button>

                    <button
                        type="button"
                        className="btn-bulk-record"
                        onClick={onStartRecordingAll}
                        title="Resume recording immediately on all unrecorded workstations"
                    >
                        <span>⏺ Start Recording All ({activeCount})</span>
                    </button>

                    <button
                        type="button"
                        className="btn-collapse-toggle"
                        onClick={() => setIsCollapsed(p => !p)}
                        title={isCollapsed ? "Expand Stations List" : "Collapse Stations List"}
                    >
                        {isCollapsed ? '▼' : '▲'}
                    </button>
                </div>
            </div>

            {!isCollapsed && (
                <div className="alert-stations-tray">
                    <div className="tray-label">AFFECTED WORKSTATIONS:</div>
                    <div className="tray-chips-scroll">
                        {unrecordedStations.map(s => {
                            const name = s.displayName || s.hostname;
                            return (
                                <div key={s.hostname} className="alert-station-card-chip">
                                    <div
                                        className="chip-info"
                                        onClick={() => onSelectStation?.(s)}
                                        title="Click to inspect workstation"
                                    >
                                        <span className="chip-beacon" />
                                        <span className="chip-name">{name}</span>
                                        <span className="chip-mode">MONITOR ONLY</span>
                                    </div>

                                    <div className="chip-actions">
                                        <button
                                            type="button"
                                            className="btn-chip-record"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onStartRecordingStation?.(s.hostname);
                                            }}
                                            title="Start Recording this station immediately"
                                        >
                                            ⏺ REC
                                        </button>
                                        <button
                                            type="button"
                                            className="btn-chip-snooze"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onOpenSnoozeModal?.(s.hostname);
                                            }}
                                            title="Postpone alert for this station"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="12" height="12">
                                                <circle cx="12" cy="12" r="10" />
                                                <polyline points="12 6 12 12 16 14" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
