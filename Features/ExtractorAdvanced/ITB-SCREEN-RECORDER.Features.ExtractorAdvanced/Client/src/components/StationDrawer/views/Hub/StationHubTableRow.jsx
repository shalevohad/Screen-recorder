// Client/src/components/StationDrawer/views/Hub/StationHubTableRow.jsx
import React from 'react';
import './StationHubTableRow.scss';

export default function StationHubTableRow({ station, isSelected, onToggle, meta }) {
    const hostNameStr = station.displayName || station.hostname || station.name || '';

    return (
        <div
            onClick={() => onToggle(station.id)}
            className={`hub-table-row ${isSelected ? 'is-selected' : ''}`}
        >
            <div className="row-col col-check">
                <div className={`row-checkbox ${isSelected ? 'checked' : ''}`}>
                    {isSelected && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    )}
                </div>
            </div>

            <div className="row-col col-name">
                <span className="station-name-text" title={hostNameStr}>{hostNameStr}</span>
            </div>

            <div className="row-col col-audio">
                <span className={`badge-pill ${meta.hasAudio ? 'audio-on' : 'audio-off'}`} title={meta.audioChannels}>
                    {meta.hasAudio ? 'AUDIO' : 'MUTED'}
                </span>
            </div>

            <div className="row-col col-coverage">
                <span className="coverage-text">{meta.recordedDuration} ({meta.coveragePct}%)</span>
            </div>

            <div className="row-col col-gaps-bar">
                <div className="row-gap-track" title={`Coverage: ${meta.coveragePct}%`}>
                    {meta.segments.map((seg, idx) => (
                        <div
                            key={idx}
                            className={`track-seg ${seg.type === 'rec' ? 'rec' : 'gap'}`}
                            style={{ left: `${seg.startPct}%`, width: `${seg.widthPct}%` }}
                        />
                    ))}
                </div>
            </div>

            <div className="row-col col-specs">
                <span className="specs-text">{meta.resolution} • {meta.fps}fps</span>
            </div>

            <div className="row-col col-size">
                <span className="size-text">{meta.fileSize}</span>
            </div>
        </div>
    );
}