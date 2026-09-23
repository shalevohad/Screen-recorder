// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Viewport/views/Card/CameraCard.jsx
// ==========================================
import React from 'react';
import { formatTimelineClock } from '../../../../utils/timeFormat.js';
import CameraCardFeed from '../Feed/CameraCardFeed.jsx';
import './CameraCard.scss';

export default function CameraCard({
    station,
    isSolo = false,
    currentEpochMs,
    timeMode = 'LOCAL',
    isPlaying,
    setIsPlaying,
    baseEpochMs,
    totalDurationMs,
    outPointMs,
    setPlayheadMs,
    isSpotlightActive,
    globalGaps = [],
    onOpenSpotlight,
    onSelectActiveStation
}) {
    const isOffline = (station.hostname || station.name || '').includes('Offline');
    const statusClass = isOffline ? 'offline' : 'live';

    const handleCardClick = () => {
        if (isSolo) {
            if (onOpenSpotlight) onOpenSpotlight(station.id);
        } else {
            if (onSelectActiveStation) onSelectActiveStation(station.id);
        }
    };

    const handleCardContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isSolo && onSelectActiveStation) {
            if (setIsPlaying) setIsPlaying(false);
            onSelectActiveStation(null);
        }
    };

    return (
        <div className={`camera-card-cell ${isSolo ? 'solo-mode' : ''}`}>
            <div
                onClick={handleCardClick}
                onContextMenu={handleCardContextMenu}
                className={`camera-card ${statusClass} ${isSolo ? 'is-solo-card' : ''}`}
            >
                <div className="card-topbar">
                    <div className="station-meta">
                        <span className={`status-pulse ${statusClass}`} />
                        <span className="station-name">{station.hostname || station.name}</span>
                    </div>

                    <div className="card-header-actions">
                        {onOpenSpotlight && (
                            <button
                                type="button"
                                className="btn-card-action"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onOpenSpotlight(station.id);
                                }}
                                title="Cinema Fullscreen Inspection"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                </svg>
                            </button>
                        )}

                        <button
                            type="button"
                            className={`btn-card-action ${isSolo ? 'active' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (isSolo && setIsPlaying) setIsPlaying(false);
                                onSelectActiveStation(isSolo ? null : station.id);
                            }}
                            title={isSolo ? "Exit Solo Focus (Back to Grid)" : "Solo Focus"}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                {isSolo ? <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" /> : <circle cx="12" cy="12" r="3" />}
                                {!isSolo && <path d="M3 12h3m12 0h3M12 3v3m0 12v3" />}
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={`card-feed-body ${isOffline ? 'blurred-offline' : ''}`}>
                    <CameraCardFeed
                        station={station}
                        currentEpochMs={currentEpochMs}
                        isOffline={isOffline}
                        isSolo={isSolo}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        baseEpochMs={baseEpochMs}
                        totalDurationMs={totalDurationMs}
                        outPointMs={outPointMs}
                        setPlayheadMs={setPlayheadMs}
                        isSpotlightActive={isSpotlightActive}
                        globalGaps={globalGaps}
                    />

                    {isSolo && !isPlaying && (
                        <div className="solo-hover-tooltip">
                            <span className="tooltip-action"><kbd>L-Click</kbd> Fullscreen</span>
                            <span className="tooltip-dot" />
                            <span className="tooltip-action"><kbd>R-Click</kbd> Back to Grid</span>
                        </div>
                    )}
                </div>

                {!isOffline && (
                    <div className="card-bottom-overlay">
                        <div className="overlay-pill timestamp">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            {formatTimelineClock(currentEpochMs, timeMode)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}