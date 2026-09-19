// Client/src/components/StationDrawer/views/Drawer/StationDrawerRow.jsx
import React from 'react';
import './StationDrawerRow.scss';

export default function StationDrawerRow({ station, isSelected, onToggle, meta }) {
    const hostNameStr = station.displayName || station.hostname || station.name || '';
    const trafficLevel = meta.trafficStatus?.level || (meta.hasGaps ? 'critical' : 'optimal');

    return (
        <label className={`station-row ${isSelected ? 'selected' : ''}`}>
            <div className="checkbox-wrap">
                <input
                    type="checkbox"
                    className="hidden-checkbox"
                    checked={isSelected}
                    onChange={() => onToggle(station.id)}
                />
                <div className="custom-checkbox">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>

                {/* נקודת רמזור: ירוק / צהוב / אדום */}
                <div className={`status-dot ${trafficLevel}`} title={meta.trafficStatus?.label} />
                <span className="hostname" title={hostNameStr}>{hostNameStr}</span>
            </div>

            <div className="mini-row-tags">
                {meta.hasAudio && (
                    <span className="mini-audio-icon" title={meta.audioChannels}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                        </svg>
                    </span>
                )}
                {/* תצוגת אחוז בצבע תואם לרמזור */}
                <span className={`coverage-pct ${trafficLevel}`}>{meta.coveragePct}%</span>
            </div>
        </label>
    );
}