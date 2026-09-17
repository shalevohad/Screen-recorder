import React from 'react';
import { formatTimelineClock } from '../../utils/timeFormat';
import './MulticamViewport.scss';

export default function MulticamViewport({
    activeStation,
    timelineStations = [],
    onSelectActiveStation,
    baseEpochMs,
    playheadMs,
    timeMode
}) {
    if (activeStation) {
        return (
            <div className="multicam-viewport-root">
                <div className="single-focus-feed">
                    <span className="feed-live-indicator">● FOCUSED LIVE STREAM</span>
                    <h2 className="feed-title">{activeStation.hostname}</h2>
                </div>
            </div>
        );
    }

    const stationCount = timelineStations.length;

    return (
        <div className="multicam-viewport-root">
            <div className="multicam-tactical-grid" data-count={stationCount}>
                {timelineStations.map(st => (
                    <div
                        key={st.id}
                        onClick={() => onSelectActiveStation(st.id)}
                        className="camera-card"
                    >
                        <div className="card-topbar">
                            <div className="station-meta">
                                <span className="status-pulse" />
                                <span className="station-name">{st.hostname}</span>
                            </div>
                            <span className="focus-hover-badge">SOLO FOCUS ⤢</span>
                        </div>
                        <div className="card-feed-placeholder">
                            <div className="tactical-crosshair" />
                            <span className="fetch-indicator">
                                FRAME FETCH @ {formatTimelineClock(baseEpochMs + playheadMs, timeMode)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}