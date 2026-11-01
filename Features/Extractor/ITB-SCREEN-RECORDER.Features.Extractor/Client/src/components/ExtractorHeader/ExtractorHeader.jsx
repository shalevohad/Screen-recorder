// ==========================================
// File: Features/Extractor/Client/src/components/ExtractorHeader/ExtractorHeader.jsx
// ==========================================
import React from 'react';
import './ExtractorHeader.scss';

/**
 * ExtractorHeader renders the top control bar of the archive extractor interface.
 * 
 * @param {Object} props
 * @param {'LOCAL'|'UTC'} props.timeMode - Active display time mode.
 * @param {(mode: 'LOCAL'|'UTC') => void} props.onToggleTimeMode - Callback triggered when toggling time mode.
 * @param {number} props.activeJobsCount - Number of packaging / processing jobs currently running.
 * @param {number} props.readyJobsCount - Number of completed export jobs ready for download.
 * @param {number} props.selectedCount - Count of currently selected stations.
 * @param {number} props.totalCount - Total count of available stations.
 * @returns {JSX.Element}
 */
export default function ExtractorHeader({
    timeMode,
    onToggleTimeMode,
    activeJobsCount,
    readyJobsCount, // Completed jobs ready for download
    selectedCount,
    totalCount
}) {
    const handleOpenMonitor = () => {
        window.dispatchEvent(new CustomEvent('open-export-monitor'));
    };

    return (
        <div className="extractor-header">
            <div className="header-left">
                <span className="status-indicator" />
                <span className="title">ARCHIVE EXTRACTOR</span>
            </div>

            <div className="header-center">
                <div className="time-mode-toggle" title="Toggle Universal Coordinated Time / Local Device Time">
                    <button
                        type="button"
                        className={`toggle-pill ${timeMode === 'LOCAL' ? 'active' : ''}`}
                        onClick={() => onToggleTimeMode('LOCAL')}
                    >
                        LOCAL
                    </button>
                    <button
                        type="button"
                        className={`toggle-pill ${timeMode === 'UTC' ? 'active' : ''}`}
                        onClick={() => onToggleTimeMode('UTC')}
                    >
                        UTC
                    </button>
                </div>
            </div>

            <div className="header-badges">
                {/* 1. Currently active packaging tasks */}
                {activeJobsCount > 0 && (
                    <button
                        type="button"
                        className="active-jobs-pill-btn"
                        onClick={handleOpenMonitor}
                        title="Click to view packaging progress"
                    >
                        <span className="dot pulse" />
                        <span>{activeJobsCount} PACKAGING</span>
                    </button>
                )}

                {/* 2. Finished tasks ready for download across the network */}
                {readyJobsCount > 0 && (
                    <button
                        type="button"
                        className="ready-jobs-pill-btn"
                        onClick={handleOpenMonitor}
                        title="Click to open ready archives for download"
                    >
                        <span className="dot ready" />
                        <span>{readyJobsCount} READY</span>
                    </button>
                )}

                <span className="station-pill">
                    {selectedCount} / {totalCount} STATIONS
                </span>
            </div>
        </div>
    );
}