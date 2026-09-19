// Client/src/components/StationDrawer/views/Hub/StationHubCard.jsx
import React from 'react';
import './StationHubCard.scss';

export default function StationHubCard({ station, isSelected, onToggle, meta }) {
    const hostNameStr = station.displayName || station.hostname || station.name || '';

    return (
        <div
            onClick={() => onToggle(station.id)}
            className={`hub-station-card ${isSelected ? 'is-selected' : ''}`}
        >
            <div className="card-top">
                <div className="monitor-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                </div>

                <div className="card-top-badges">
                    <span className={`audio-pill ${meta.hasAudio ? 'has-audio' : 'no-audio'}`} title={meta.audioChannels}>
                        {meta.hasAudio ? (
                            <>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                </svg>
                                <span>AUDIO</span>
                            </>
                        ) : (
                            <>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                                    <line x1="23" y1="9" x2="17" y2="15" />
                                    <line x1="17" y1="9" x2="23" y2="15" />
                                </svg>
                                <span>NO AUDIO</span>
                            </>
                        )}
                    </span>

                    <span className={`status-indicator-badge ${meta.hasGaps ? 'gap-warning' : 'full-archived'}`}>
                        <span className="dot" />
                        {meta.hasGaps ? 'GAPS DETECTED' : '100% COVERAGE'}
                    </span>
                </div>
            </div>

            <div className="card-info">
                <span className="station-card-title">{hostNameStr}</span>

                <div className="recording-specs-grid">
                    <div className="spec-item">
                        <span className="spec-label">RECORDED</span>
                        <span className="spec-value highlight">{meta.recordedDuration}</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">COVERAGE</span>
                        <span className="spec-value">{meta.coveragePct}%</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">VIDEO FEED</span>
                        <span className="spec-value">{meta.resolution} • {meta.fps}fps</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">SIZE</span>
                        <span className="spec-value">{meta.fileSize}</span>
                    </div>
                </div>

                <div className="card-gap-track-container" title={`Recorded: ${meta.recordedDuration} (${meta.coveragePct}%)`}>
                    <div className="card-gap-track">
                        {meta.segments.map((seg, idx) => (
                            <div
                                key={idx}
                                className={`track-segment ${seg.type === 'rec' ? 'rec' : 'gap'}`}
                                style={{
                                    left: `${seg.startPct}%`,
                                    width: `${seg.widthPct}%`
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="card-bottom-action">
                <div className={`custom-checkbox-pill ${isSelected ? 'checked' : ''}`}>
                    {isSelected ? '✓ SELECTED' : '+ ADD TO WORKSPACE'}
                </div>
            </div>
        </div>
    );
}