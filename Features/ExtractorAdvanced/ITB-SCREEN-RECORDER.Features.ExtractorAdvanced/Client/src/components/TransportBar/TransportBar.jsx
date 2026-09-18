import React, { useState } from 'react';
import './TransportBar.scss';

export default function TransportBar({
    baseEpochMs,
    timeMode,
    totalDurationMs,
    inPointMs,
    setInPointMs,
    outPointMs,
    setOutPointMs,
    activeStationId,
    isPlaying,
    setIsPlaying
}) {
    const [volume, setVolume] = useState(80);
    const [isMuted, setIsMuted] = useState(false);

    return (
        <div className="viewport-transport-bar">
            <div className="playback-controls">
                <button
                    type="button"
                    disabled={!activeStationId}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`btn-round-playback ${!activeStationId ? 'disabled' : ''}`}
                    title={!activeStationId ? "Playback available in Solo View only" : (isPlaying ? "Pause" : "Play")}
                >
                    {isPlaying ? (
                        <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                    ) : (
                        <svg viewBox="0 0 24 24" style={{ marginLeft: 2 }}><path d="M8 5v14l11-7z" /></svg>
                    )}
                </button>

                {activeStationId && (
                    <div className="volume-control-widget">
                        <button type="button" className="btn-volume-icon" onClick={() => setIsMuted(!isMuted)}>
                            {isMuted || volume === 0 ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                    <line x1="17" y1="9" x2="23" y2="15" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="23" y1="9" x2="17" y2="15" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                </svg>
                            )}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => {
                                setVolume(Number(e.target.value));
                                if (isMuted) setIsMuted(false);
                            }}
                            className="volume-slider"
                        />
                        <span className="volume-text">{isMuted ? '0%' : `${volume}%`}</span>
                    </div>
                )}
            </div>
        </div>
    );
}