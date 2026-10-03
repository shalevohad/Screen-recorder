// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/export/TimelineVerticalExportBtn.jsx
// ==========================================
import React from 'react';
import './TimelineVerticalExportBtn.scss';

export default function TimelineVerticalExportBtn({
    isRangeValid,
    onExport,
    isEstimating,
    estimateData,
    formatEstimateSize,
    stationsCount = 0
}) {
    const getExportTooltip = () => {
        if (stationsCount === 0) return "Select stations to enable export";
        if (!isRangeValid) return "Select a valid IN/OUT range to export";
        if (!estimateData) return "Export Synchronized Multi-Track Clip (Ctrl+E)";

        const sizeStr = formatEstimateSize(estimateData.estimatedFileSizeBytes);
        const gapsStr = estimateData.removedGlobalGapsCount > 0
            ? ` • ${estimateData.removedGlobalGapsCount} global gap(s) skipped`
            : '';
        return `Export Cut (Ctrl+E) • Est: ~${sizeStr}${gapsStr}`;
    };

    return (
        <button
            type="button"
            onClick={isRangeValid ? onExport : undefined}
            className={`btn-vertical-export-action ${isRangeValid ? 'active' : 'disabled'}`}
            disabled={!isRangeValid}
            title={getExportTooltip()}
        >
            <div className="export-icon-top">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
            </div>

            <span className="vertical-label">EXPORT CUT</span>

            {isRangeValid && (
                <div className="export-button-estimate-box">
                    {isEstimating ? (
                        <span className="estimate-loading">...</span>
                    ) : estimateData ? (
                        <>
                            <span className="estimate-size-pill">
                                ~{formatEstimateSize(estimateData.estimatedFileSizeBytes)}
                            </span>
                            {estimateData.removedGlobalGapsCount > 0 && (
                                <span className="estimate-gaps-pill" title={`${estimateData.removedGlobalGapsCount} global gaps will be skipped`}>
                                    ✂ {estimateData.removedGlobalGapsCount}
                                </span>
                            )}
                        </>
                    ) : null}
                </div>
            )}
        </button>
    );
}