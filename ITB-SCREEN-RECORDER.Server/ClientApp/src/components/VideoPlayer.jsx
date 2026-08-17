import React, { useEffect, useRef, useState, useCallback } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '../styles/VideoPlayer.css';

export default function VideoPlayer({ hlsUrl, hostname }) {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const pollingTimeoutRef = useRef(null);
    const isInitializingRef = useRef(false);

    const [isStreamReady, setIsStreamReady] = useState(false);
    const [playerError, setPlayerError] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(1);
    const [bufferProgress, setBufferProgress] = useState(100);

    // State חדש לניהול יחס התמונה הדינמי (ברירת מחדל 16:9 עד קבלת הזרם)
    const [aspectRatio, setAspectRatio] = useState(16 / 9);

    const pollStreamAvailability = useCallback(() => {
        fetch(hlsUrl, { method: 'GET', cache: 'no-store' })
            .then((response) => {
                if (response.ok) {
                    setIsStreamReady(true);
                    setPlayerError(false);
                    const player = playerRef.current;
                    if (player && !player.isDisposed()) {
                        player.error(null);
                        player.src({ src: hlsUrl, type: 'application/x-mpegURL' });
                        player.load();
                        player.play().catch(() => { });
                    }
                } else {
                    pollingTimeoutRef.current = setTimeout(pollStreamAvailability, 2000);
                }
            })
            .catch(() => {
                pollingTimeoutRef.current = setTimeout(pollStreamAvailability, 2000);
            });
    }, [hlsUrl]);

    useEffect(() => {
        if (isInitializingRef.current || playerRef.current) return;
        isInitializingRef.current = true;

        if (videoRef.current) {
            const player = videojs(videoRef.current, {
                autoplay: true,
                controls: false,
                muted: true,
                fluid: true,
                responsive: true,
                preload: 'auto',
                liveui: true,
                html5: {
                    vhs: {
                        overrideNative: true,
                        backBufferLength: 10,
                        // Must stay comfortably inside MediaMTX's live HLS window
                        // (hlsSegmentCount * hlsSegmentDuration in mediamtx.yml, currently
                        // 10s) or VHS requests segments that have already rolled off the
                        // window and been deleted -> persistent 404s -> player stuck loading.
                        maxBufferLength: 6,
                        liveSyncDuration: 4,
                        enableLowInitialPlaylist: false,
                        smoothQualityChange: true
                    }
                }
            });

            playerRef.current = player;

            // פונקציה לשאיפת רזולוציית המקור וחישוב היחס
            const updateAspectRatio = () => {
                if (!player.isDisposed()) {
                    const videoWidth = player.videoWidth();
                    const videoHeight = player.videoHeight();
                    if (videoWidth > 0 && videoHeight > 0) {
                        setAspectRatio(videoWidth / videoHeight);
                    }
                }
            };

            // האזנה לאירועי טעינת הוידאו ושינוי רזולוציה בשידור החי
            player.on('loadedmetadata', updateAspectRatio);
            player.on('resize', updateAspectRatio);

            player.on('play', () => setIsPlaying(true));
            player.on('pause', () => setIsPlaying(false));

            player.on('volumechange', () => {
                if (!player.isDisposed()) {
                    setIsMuted(player.muted());
                    setVolume(player.muted() ? 0 : player.volume());
                }
            });

            player.on('progress', () => {
                if (!player.isDisposed()) {
                    const buffered = player.buffered();
                    const duration = player.duration();
                    if (buffered.length > 0 && duration > 0) {
                        const end = buffered.end(buffered.length - 1);
                        setBufferProgress(Math.min(100, (end / duration) * 100));
                    }
                }
            });

            player.on('error', () => {
                setPlayerError(true);
                setIsStreamReady(false);
                pollStreamAvailability();
            });

            pollStreamAvailability();
        }

        return () => {
            if (pollingTimeoutRef.current) clearTimeout(pollingTimeoutRef.current);
            setTimeout(() => {
                if (!videoRef.current && playerRef.current && !playerRef.current.isDisposed()) {
                    playerRef.current.dispose();
                    playerRef.current = null;
                }
            }, 50);
        };
    }, [pollStreamAvailability]);

    const togglePlay = () => {
        const player = playerRef.current;
        if (!player || player.isDisposed()) return;
        if (player.paused()) player.play().catch(() => { });
        else player.pause();
    };

    const toggleMute = () => {
        const player = playerRef.current;
        if (!player || player.isDisposed()) return;
        const newMuteState = !player.muted();
        player.muted(newMuteState);
        if (!newMuteState && player.volume() === 0) player.volume(0.8);
    };

    const handleVolumeChange = (e) => {
        const player = playerRef.current;
        if (!player || player.isDisposed()) return;
        const newVol = parseFloat(e.target.value);
        player.volume(newVol);
        player.muted(newVol === 0);
    };

    const jumpToLive = () => {
        const player = playerRef.current;
        if (!player || player.isDisposed()) return;
        if (player.liveTracker && player.liveTracker.isLive()) {
            player.liveTracker.seekToLiveEdge();
        } else {
            player.load();
            player.play().catch(() => { });
        }
    };

    return (
        <div className="video-player-container">
            {/* הזרקת יחס התמונה הדינמי ישירות לקונטיינר. 
                חלון ה-Modal העוטף ימתח או יתכווץ אוטומטית בהתאם! 
            */}
            <div className="video-stage" style={{ aspectRatio: aspectRatio }}>
                <div data-vjs-player className={`player-wrapper ${!isStreamReady ? 'hidden' : ''}`}>
                    <video ref={videoRef} className="video-js vjs-fluid vjs-default-skin" playsInline />
                </div>

                {!isStreamReady && !playerError && (
                    <div className="player-loading">
                        <div className="spinner"></div>
                        <p>Buffering live stream pipeline...</p>
                    </div>
                )}

                {playerError && (
                    <div className="player-error">
                        <h3>Stream Connection Error</h3>
                        <p>Handshake dropped or source stream went offline.</p>
                        <button onClick={pollStreamAvailability}>Retry Connection</button>
                    </div>
                )}
            </div>

            {/* Controls Bar */}
            <div className="yt-controls-bar">
                <div className="yt-progress-container" onClick={jumpToLive}>
                    <div className="yt-progress-bg">
                        <div className="yt-progress-buffer" style={{ width: `${bufferProgress}%` }}></div>
                        <div className="yt-progress-live"></div>
                    </div>
                </div>

                <div className="yt-controls-row">
                    <div className="yt-controls-left">
                        <button className="yt-btn" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
                            {isPlaying ? (
                                <svg className="yt-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                            ) : (
                                <svg className="yt-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5v14l11-7z" /></svg>
                            )}
                        </button>

                        <div className="yt-volume-group">
                            <button className="yt-btn" onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
                                {isMuted || volume === 0 ? (
                                    <svg className="yt-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
                                ) : (
                                    <svg className="yt-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                                )}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="yt-volume-slider"
                            />
                        </div>

                        <button className="yt-live-tag" onClick={jumpToLive}>
                            <span className="yt-live-dot"></span>
                            LIVE
                        </button>
                    </div>

                    <div className="yt-controls-right">
                        <span className="yt-stream-info">{hostname}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}