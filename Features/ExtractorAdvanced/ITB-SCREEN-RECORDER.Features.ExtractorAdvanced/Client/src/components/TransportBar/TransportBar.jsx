// Client/src/components/TransportBar/TransportBar.jsx
import React, { useState } from 'react';
import './TransportBar.scss';

export default function TransportBar({
    activeStationId,
    isPlaying,
    setIsPlaying,
    onStepBack,
    onJumpBack,
    onJumpForward,
    onStepForward
}) {
    const [volume, setVolume] = useState(80);
    const [isMuted, setIsMuted] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

    const speedOptions = [0.5, 1.0, 2.0, 4.0];

    const cycleSpeed = () => {
        const currentIndex = speedOptions.indexOf(playbackSpeed);
        const nextIndex = (currentIndex + 1) % speedOptions.length;
        setPlaybackSpeed(speedOptions[nextIndex]);
    };

    return (
        /* הקונטיינר החיצוני שממרכז את הסרגל ומייצר את האפקט המרחף */
        <div className="transport-bar-container">
            {/* הקפסולה עצמה בעלת הפינות העגולות לחלוטין */}
            <div className="unified-transport-capsule">

                {/* צד שמאל - בורר מהירות בתוך קפסולה עגולה עדינה */}
                <div className="transport-side-cluster">
                    <button
                        className={`speed-selector-btn ${playbackSpeed !== 1.0 ? 'active' : ''}`}
                        onClick={cycleSpeed}
                        title="Playback Speed"
                    >
                        {playbackSpeed}x
                    </button>
                </div>

                {/* מרכז - פקדי הניגון הרכים וכפתור הגיבור המרכזי */}
                <div className="transport-center-cluster">
                    <button className="ctrl-btn minor" onClick={onStepBack} disabled={!activeStationId} title="-1 Frame">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" /></svg>
                    </button>

                    <button className="ctrl-btn" onClick={onJumpBack} disabled={!activeStationId} title="-10 Seconds">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="19 20 9 12 19 4 19 20" /><line x1="5" y1="19" x2="5" y2="5" /></svg>
                    </button>

                    <button
                        className={`play-pause-master-btn ${isPlaying ? 'is-playing' : ''} ${!activeStationId ? 'disabled' : ''}`}
                        onClick={() => setIsPlaying(!isPlaying)}
                        disabled={!activeStationId}
                        title={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? (
                            <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '4px' }}><path d="M5 3l14 9-14 9V3z" /></svg>
                        )}
                    </button>

                    <button className="ctrl-btn" onClick={onJumpForward} disabled={!activeStationId} title="+10 Seconds">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 4 15 12 5 20 5 4" /><line x1="19" y1="5" x2="19" y2="19" /></svg>
                    </button>

                    <button className="ctrl-btn minor" onClick={onStepForward} disabled={!activeStationId} title="+1 Frame">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 17l5-5-5-5M6 17l5-5-5-5" /></svg>
                    </button>
                </div>

                {/* צד ימין - שליטת שמע מודרנית עגולה */}
                <div className="transport-side-cluster right">
                    {activeStationId ? (
                        <div className="volume-widget">
                            <button className="btn-volume" onClick={() => setIsMuted(!isMuted)}>
                                {isMuted || volume === 0 ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><line x1="17" y1="9" x2="23" y2="15" strokeWidth="2" strokeLinecap="round" /><line x1="23" y1="9" x2="17" y2="15" strokeWidth="2" strokeLinecap="round" /></svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                                )}
                            </button>
                            <input type="range" min="0" max="100" value={isMuted ? 0 : volume} onChange={(e) => { setVolume(Number(e.target.value)); if (isMuted) setIsMuted(false); }} className="volume-slider" />
                        </div>
                    ) : (
                        <div className="volume-widget-placeholder"></div>
                    )}
                </div>

            </div>
        </div>
    );
}