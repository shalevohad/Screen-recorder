// ==========================================
// File: Client/src/components/Dashboard/NotRecordingAlertBanner.jsx
// ==========================================
import React, { useState } from 'react';
import './NotRecordingAlertBanner.scss';

export default function NotRecordingAlertBanner({
    unrecordedStations = [],
    snoozedStations = [],
    onStartRecordingStation,
    onStartRecordingAll,
    onOpenSnoozeModal,
    onOpenBulkSnoozeModal,
    onSelectStation,
    isPrioritizeAtFront = true,
    onTogglePrioritizeAtFront
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
                    <span className="snooze-icon">⏱</span>
                    <span className="snooze-text">
                        <strong>{snoozedCount} Workstation(s)</strong> have recording alerts temporarily postponed.
                    </span>
                </div>
                <div className="snoozed-chips">
                    {snoozedStations.map(s => (
                        <span key={s.hostname} className="snoozed-chip" onClick={() => onOpenSnoozeModal?.(s.hostname)}>
                            🖥 {s.displayName || s.hostname} ({s.remainingMinutes}m)
                        </span>
                    ))}
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
                        <span className="alert-icon">⚠️</span>
                    </div>
                    <div className="alert-headline-text">
                        <div className="alert-title-row">
                            <span className="alert-main-title">
                                OPERATIONAL ALERT: {activeCount} WORKSTATION(S) NOT RECORDING
                            </span>
                            {snoozedCount > 0 && (
                                <span className="snoozed-count-pill">
                                    ⏱ {snoozedCount} Postponed
                                </span>
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
                        <span>⏱ Postpone All</span>
                    </button>

                    <button
                        type="button"
                        className="btn-bulk-record"
                        onClick={onStartRecordingAll}
                        title="Resume recording immediately on all unrecorded workstations"
                    >
                        <span>▶ Start Recording All ({activeCount})</span>
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
                                            ▶ REC
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
                                            ⏱
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
