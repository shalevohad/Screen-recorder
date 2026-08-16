import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '../styles/FullscreenModal.css';

export default function FullscreenModal({ hostname, hlsUrl, onClose }) {
    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const retryTimeoutRef = React.useRef(null);

    // Optimized HLS configuration for low latency and smooth streaming
    const hlsConfig = {
        bufferSize: 30,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        targetDuration: 8,
        liveEdgeFudgeDuration: 2
    };

    React.useEffect(() => {
        const attemptStreamConnection = () => {
            const player = playerRef.current;
            if (!player) return;
            player.error(null);
            player.src({ src: hlsUrl, type: 'application/x-mpegURL' });
            player.load();
            player.play().catch(() => {});
        };

        if (videoRef.current && !playerRef.current) {
            playerRef.current = videojs(videoRef.current, {
                autoplay: true,
                controls: true,
                muted: true,
                fluid: true,
                responsive: true,
                liveui: true,
                controlBar: {
                    children: ['playToggle', 'volumePanel', 'liveDisplay', 'fullscreenToggle']
                },
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
        }

        return () => { if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current); };
    }, [hlsUrl]);

    React.useEffect(() => {
        // Prevent background scroll
        document.body.style.overflow = 'hidden';

        // Handle ESC key
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [onClose]);

    return (
        <div className="fullscreen-modal-overlay">
            {/* Header with close button */}
            <div className="fullscreen-modal-header">
                <div className="fullscreen-modal-title">
                    <span className="text-white font-mono font-bold text-lg">?? {hostname}</span>
                    <span className="text-gray-400 text-xs font-mono">?? LIVE</span>
                </div>
                <button
                    onClick={onClose}
                    className="fullscreen-modal-close-btn"
                    title="???? (ESC)"
                >
                    ?
                </button>
            </div>

            {/* Video container */}
            <div className="fullscreen-modal-content">
                <div className="w-full h-full relative">
                    <div data-vjs-player className="w-full h-full">
                        <video
                            ref={videoRef}
                            className="video-js vjs-fluid vjs-default-skin w-full h-full"
                            playsInline
                            muted
                        />
                    </div>
                </div>
            </div>

            {/* Footer info */}
            <div className="fullscreen-modal-footer">
                <span>?? {hlsUrl}</span>
                <span>ESC ?? ??? X ??????</span>
            </div>
        </div>
    );
}
