// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/TransportBar/TransportBar.jsx
// ==========================================
import React, { useState } from 'react';
import './TransportBar.scss';

export default function TransportBar({
    activeStationId,
    isPlaying,
    setIsPlaying,
    isLooping,        // 💡 סטייט ה-Loop
    setIsLooping,     // 💡 פונקציית עדכון ה-Loop
    onStepFrameForward,
    onStepFrameBackward,
    playbackSpeed = 1,
    onChangeSpeed
}) {
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

    const isEnabled = Boolean(activeStationId);

    const handlePlayPause = () => {
        if (!isEnabled) return;
        setIsPlaying(!isPlaying);
    };

    const handleCycleSpeed = () => {
        if (!isEnabled || !onChangeSpeed) return;
        const speeds = [0.5, 1, 2, 4, 8];
        const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
        onChangeSpeed(speeds[nextIdx]);
    };

    return (
        <div
            className={`transport-bar-root ${isEnabled ? 'is-expanded' : 'is-compact-disabled'}`}
            title={!isEnabled ? 'Select a station card above to enable timeline playback' : ''}
        >
            <button
                type="button"
                className="btn-speed-badge"
                disabled={!isEnabled}
                onClick={handleCycleSpeed}
                title="Playback Speed"
            >
                {playbackSpeed}x
            </button>

            <div className="transport-controls-cluster">
                {/* 💡 כפתור Repeat / Loop */}
                <button
                    type="button"
                    className={`btn-ctrl-action btn-loop ${isLooping ? 'active-loop' : ''}`}
                    disabled={!isEnabled}
                    onClick={() => setIsLooping && setIsLooping(!isLooping)}
                    title={isLooping ? 'Repeat/Loop (ON)' : 'Repeat/Loop (OFF)'}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="17 1 21 5 17 9"></polyline>
                        <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                        <polyline points="7 23 3 19 7 15"></polyline>
                        <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                    </svg>
                </button>

                <div className="divider" />

                <button
                    type="button"
                    className="btn-ctrl-action"
                    disabled={!isEnabled}
                    onClick={onStepFrameBackward}
                    title="Jump Back (5s)"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polygon points="11 19 2 12 11 5 11 19" fill="currentColor" />
                        <polygon points="22 19 13 12 22 5 22 19" fill="currentColor" />
                    </svg>
                </button>

                <button
                    type="button"
                    className="btn-ctrl-action"
                    disabled={!isEnabled}
                    onClick={onStepFrameBackward}
                    title="Step 1 Frame Back"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="5" x2="5" y2="19" />
                        <polygon points="19 19 8 12 19 5 19 19" fill="currentColor" />
                    </svg>
                </button>

                <button
                    type="button"
                    className={`btn-play-hero ${isPlaying ? 'playing' : ''}`}
                    disabled={!isEnabled}
                    onClick={handlePlayPause}
                    title={isPlaying ? 'Pause' : 'Play'}
                >
                    {isPlaying ? (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16" rx="1.5" />
                            <rect x="14" y="4" width="4" height="16" rx="1.5" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="7 4 20 12 7 20 7 4" />
                        </svg>
                    )}
                </button>

                <button
                    type="button"
                    className="btn-ctrl-action"
                    disabled={!isEnabled}
                    onClick={onStepFrameForward}
                    title="Step 1 Frame Forward"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="19" y1="5" x2="19" y2="19" />
                        <polygon points="5 5 16 12 5 19 5 5" fill="currentColor" />
                    </svg>
                </button>

                <button
                    type="button"
                    className="btn-ctrl-action"
                    disabled={!isEnabled}
                    onClick={onStepFrameForward}
                    title="Jump Forward (5s)"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polygon points="13 19 22 12 13 5 13 19" fill="currentColor" />
                        <polygon points="2 19 11 12 2 5 2 19" fill="currentColor" />
                    </svg>
                </button>
            </div>

            {isEnabled && (
                <div className="audio-control-cluster">
                    <button
                        type="button"
                        className="btn-audio-mute"
                        onClick={() => setIsMuted(!isMuted)}
                        title={isMuted ? 'Unmute' : 'Mute'}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {isMuted ? (
                                <>
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                                    <line x1="23" y1="9" x2="17" y2="15" />
                                    <line x1="17" y1="9" x2="23" y2="15" />
                                </>
                            ) : (
                                <>
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                </>
                            )}
                        </svg>
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => {
                            setVolume(parseFloat(e.target.value));
                            if (isMuted) setIsMuted(false);
                        }}
                        className="volume-slider"
                    />
                </div>
            )}
        </div>
    );
}