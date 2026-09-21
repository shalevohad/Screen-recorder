import React from 'react';
import './TelemetryBar.scss';

const formatSize = (bytes) => {
    if (!bytes) return '0 B';
    const mb = bytes / (1024 * 1024);
    if (mb >= 1000) return `${(mb / 1024).toFixed(2)} GB`;
    return `${mb.toFixed(1)} MB`;
};

export default function TelemetryBar({ totalChunks, totalBytes, totalGaps, hasAnyGaps }) {
    return (
        <div className="telemetry-compact-bar">
            <div className="metric-pill">
                <span className="lbl">SEGMENTS:</span>
                <span className="val">{totalChunks}</span>
            </div>
            <div className="metric-pill highlight">
                <span className="lbl">EST. ARCHIVE:</span>
                <span className="val accent">{formatSize(totalBytes)}</span>
            </div>
            <div className="metric-pill">
                <span className="lbl">GAPS:</span>
                <span className={`val ${totalGaps > 0 ? 'rose' : ''}`}>{totalGaps}</span>
            </div>

            <div className={`continuity-capsule ${hasAnyGaps ? 'alert' : 'healthy'}`}>
                <span className="indicator-dot" />
                <span>{hasAnyGaps ? 'TELEMETRY GAPS DETECTED' : 'UNBROKEN STREAM'}</span>
            </div>
        </div>
    );
}