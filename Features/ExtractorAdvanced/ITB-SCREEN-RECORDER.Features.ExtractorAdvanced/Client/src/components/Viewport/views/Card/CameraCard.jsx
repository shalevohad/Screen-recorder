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
    stationsCount = 1,
    onDeselectStation = null,
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
    onSelectActiveStation,
    recordingSegments = {},
    playbackSpeed = 1,
    activeAudioStationId = null,
    onSoloAudio,
    directorPlan = null,
    isAutoDirectorEnabled = true,
    targetDisplayId = 'auto',
    onSelectDisplayId = null,
    areAllDisplaysPlaced = false,
    _slotIndex = 0,
    borderColor = null,
    onSwapWithNext = null,
    isDecoderAllowed = true,
    maxHeight = null
}) {
    const isAudioActive = Boolean(
        activeAudioStationId && (station.id === activeAudioStationId || (station.hostname && station.hostname === activeAudioStationId))
    );
    const isOffline = (station.hostname || station.name || '').includes('Offline');
    const statusClass = isOffline ? 'offline' : 'live';

    const stationDisplays = station?.displays || station?.topology?.displays || [];
    const hasMultipleDisplays = stationDisplays.length > 1;

    const handleCardClick = () => {
        if (isSolo) {
            const dispToOpen = (targetDisplayId && targetDisplayId !== 'auto' && targetDisplayId !== 'director') ? targetDisplayId : null;
            if (onOpenSpotlight) onOpenSpotlight(station.id, dispToOpen);
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
                style={borderColor ? { borderColor } : undefined}
            >
                <div className="card-topbar">
                    <div className="station-meta">
                        <span className={`status-pulse ${statusClass}`} />
                        <span className="station-name">{station.displayName || station.roleAlias || station.hostname || station.name}</span>
                        {station.hostname && (station.displayName || station.roleAlias) && (station.displayName || station.roleAlias).toLowerCase() !== station.hostname.toLowerCase() && (
                            <span className="station-physical-badge" title={`Physical Machine: ${station.hostname}`}>
                                {station.hostname}
                            </span>
                        )}
                    </div>



                    <div className="card-header-actions">
                        {onSwapWithNext && (
                            <button
                                type="button"
                                className="btn-card-action swap-action"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSwapWithNext();
                                }}
                                title="Swap Slot Position (⇄)"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                                    <path d="M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" />
                                </svg>
                            </button>
                        )}

                        {onSoloAudio && stationsCount > 1 && (
                            <button
                                type="button"
                                className={`btn-card-action audio-action ${isAudioActive ? 'audio-active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSoloAudio(isAudioActive ? null : station.id);
                                }}
                                title={isAudioActive ? "Mute Station Audio (Audio Active)" : "Solo Station Audio (Rule 12)"}
                            >
                                {isAudioActive ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fillOpacity="0.25" />
                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <line x1="23" y1="9" x2="17" y2="15" />
                                        <line x1="17" y1="9" x2="23" y2="15" />
                                    </svg>
                                )}
                            </button>
                        )}

                        {onOpenSpotlight && (
                            <button
                                type="button"
                                className="btn-card-action"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const dispToOpen = (targetDisplayId && targetDisplayId !== 'auto' && targetDisplayId !== 'director') ? targetDisplayId : null;
                                    onOpenSpotlight(station.id, dispToOpen);
                                }}
                                title="Cinema Fullscreen Inspection"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                </svg>
                            </button>
                        )}

                        {onSelectActiveStation && (
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
                        )}

                        {onDeselectStation && (
                            <button
                                type="button"
                                className="btn-card-action deselect-action"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeselectStation(station.id);
                                }}
                                title={`Deselect and remove ${station.displayName || station.hostname} from project`}
                            >
                                ✕
                            </button>
                        )}
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
                        recordingSegments={recordingSegments}
                        playbackSpeed={playbackSpeed}
                        activeAudioStationId={activeAudioStationId}
                        directorPlan={directorPlan}
                        isAutoDirectorEnabled={isAutoDirectorEnabled}
                        targetDisplayId={targetDisplayId}
                        onSelectDisplayId={onSelectDisplayId}
                        areAllDisplaysPlaced={areAllDisplaysPlaced}
                        hideDisplayStrip={true}
                        isDecoderAllowed={isDecoderAllowed}
                        maxHeight={maxHeight}
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
