import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '../styles/StationThumbnail.css';
import FullscreenModal from './FullscreenModal';

export default function StationThumbnail({ hostname, hlsUrl, isOnline, isStreaming }) {
    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const retryTimeoutRef = React.useRef(null);
    const [showFullscreen, setShowFullscreen] = React.useState(false);

    // Optimized HLS configuration for low latency and smooth streaming
    const hlsConfig = {
        bufferSize: 30, // Reduce buffer size (default 60)
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        targetDuration: 8,
        liveEdgeFudgeDuration: 2 // Stay close to live edge
    };

    React.useEffect(() => {
        if (!isOnline || !isStreaming || !hlsUrl) {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
            if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
            return;
        }

        const attemptStreamConnection = () => {
            const player = playerRef.current;
            if (!player) return;
            player.error(null);
            player.src({ src: hlsUrl, type: 'application/x-mpegURL' });
            player.load();
            player.play().catch(() => {});
        };

        if (!playerRef.current && videoRef.current) {
            playerRef.current = videojs(videoRef.current, {
                autoplay: true,
                controls: false,
                muted: true,
                fluid: true,
                responsive: true,
                liveui: true,
                html5: {
                    hls: hlsConfig
                },
                liveTracker: {
                    trackingThreshold: 3,
                    liveTolerance: 5
                }
            }, function () {
                this.on('error', () => {
                    if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
                    retryTimeoutRef.current = setTimeout(attemptStreamConnection, 3000);
                });
            });
            attemptStreamConnection();
        } else if (playerRef.current) {
            attemptStreamConnection();
        }

        return () => { if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current); };
    }, [hlsUrl, isOnline, isStreaming, hostname]);

    React.useEffect(() => {
        return () => { if (playerRef.current) { playerRef.current.dispose(); playerRef.current = null; } };
    }, []);

    return (
        <>
            <div 
                className="station-thumbnail-container"
                onClick={() => isOnline && isStreaming && hlsUrl && setShowFullscreen(true)}
                title="לחץ להצגה במסך מלא"
            >
                {isOnline && isStreaming && hlsUrl ? (
                    <div data-vjs-player className="station-thumbnail-video">
                        <video ref={videoRef} className="video-js vjs-fluid vjs-default-skin" playsInline muted />
                    </div>
                ) : (
                    <div className="station-thumbnail-offline">
                        <span>📺 אין שידור חי פעיל מהעמדה</span>
                    </div>
                )}
                <div className="station-thumbnail-hostname">
                    {hostname}
                </div>
                {isOnline && isStreaming && hlsUrl && (
                    <div className="station-thumbnail-fullscreen-hint">
                        <div className="station-thumbnail-fullscreen-content">
                            <svg className="station-thumbnail-fullscreen-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8v8m0-8a4 4 0 018 0v8m0-8a4 4 0 018 0v8m0-8V8m0 8a4 4 0 118 0" />
                            </svg>
                            <span className="station-thumbnail-fullscreen-label">מסך מלא</span>
                        </div>
                    </div>
                )}
            </div>

            {showFullscreen && (
                <FullscreenModal
                    hostname={hostname}
                    hlsUrl={hlsUrl}
                    onClose={() => setShowFullscreen(false)}
                />
            )}
        </>
    );
}