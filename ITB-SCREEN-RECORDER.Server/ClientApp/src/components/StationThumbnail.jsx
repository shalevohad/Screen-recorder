import { useState, useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '../styles/StationThumbnail.css';
import FullscreenModal from './FullscreenModal';

// 💡 הוצאת האובייקט החוצה: מונע יצירה מחדש בכל רינדור ופותר את אזהרת הלינטר של ה-Dependencies
const hlsConfig = {
    backBufferLength: 10,
    maxBufferLength: 6,
    liveSyncDuration: 4,
    enableLowInitialPlaylist: false
};

export default function StationThumbnail({
    hostname,
    hlsUrl,
    isOnline,
    isStreaming,
    ipAddress = 'N/A',
    cpuUsage = 0,
    gpuUsage = 0,
    hasAudio = false,
    isPending = false,
    onToggleStream
}) {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const retryTimeoutRef = useRef(null);
    const [showFullscreen, setShowFullscreen] = useState(false);

    const formatTelemetry = (val) => {
        if (val === null || val === undefined || isNaN(val)) return '0.0';
        return Number(val).toFixed(1);
    };

    const getBarColor = (val) => {
        const num = Number(val);
        if (num < 60) return '#10b981';
        if (num < 85) return '#f59e0b';
        return '#ef4444';
    };

    useEffect(() => {
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
            player.play().catch(() => { });
        };

        if (!playerRef.current && videoRef.current) {
            playerRef.current = videojs(videoRef.current, {
                autoplay: true,
                controls: false,
                muted: true,
                fluid: true,
                responsive: true,
                liveui: true,
                html5: { vhs: hlsConfig },
                liveTracker: { trackingThreshold: 3, liveTolerance: 5 }
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

    useEffect(() => {
        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, []);

    const isLive = isOnline && isStreaming && hlsUrl;

    return (
        <>
            <div className={`station-card ${!isOnline ? 'offline' : ''}`}>

                {/* Header */}
                <div className="station-card-header">
                    <div className="header-left-actions">
                        <div className={`status-pill ${isOnline ? 'online' : 'offline'}`}>
                            {isOnline ? 'ONLINE' : 'OFFLINE'}
                        </div>

                        {/* חיווי מיקרופון */}
                        {hasAudio && isOnline && (
                            <div className="mic-indicator" title="Audio Stream Active">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                    <line x1="12" y1="19" x2="12" y2="23"></line>
                                    <line x1="8" y1="23" x2="16" y2="23"></line>
                                </svg>
                            </div>
                        )}

                        {/* כפתור הפעלה/עצירה דינמי לשידור */}
                        {isOnline && (
                            <button
                                className={`stop-stream-btn ${isStreaming ? 'is-streaming' : 'is-idle'} ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={onToggleStream}
                                disabled={isPending}
                                title={isStreaming ? "Stop Streaming" : "Start Streaming"}
                            >
                                {isPending ? (
                                    <svg className="animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeDasharray="30" strokeDashoffset="0"></circle></svg>
                                ) : isStreaming ? (
                                    <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12"></rect></svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>
                                )}
                            </button>
                        )}
                    </div>

                    <div className="station-identity">
                        <span className="station-hostname">{hostname}</span>
                        <span className="station-ip">{ipAddress}</span>
                    </div>
                </div>

                {/* Video Stage / Thumbnail */}
                <div
                    className="station-screen-area"
                    onClick={() => isLive && setShowFullscreen(true)}
                >
                    {isLive ? (
                        <>
                            <div data-vjs-player className="station-thumbnail-video">
                                <video ref={videoRef} className="video-js vjs-fluid vjs-default-skin" playsInline muted />
                            </div>
                            <div className="play-overlay-hint">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8v8m0-8a4 4 0 018 0v8m0-8a4 4 0 018 0v8m0-8V8m0 8a4 4 0 118 0" />
                                </svg>
                                <span>מסך מלא</span>
                            </div>
                        </>
                    ) : (
                        <div className="screen-offline-placeholder">
                            <span>{isOnline && !isStreaming ? 'ממתין לשידור...' : 'אין חיבור לעמדה'}</span>
                        </div>
                    )}
                </div>

                {/* Telemetry Footer */}
                <div className="station-telemetry">
                    <div className="telemetry-row">
                        <div className="telemetry-label">
                            <span>CPU</span>
                            <span style={{ color: getBarColor(cpuUsage) }}>{formatTelemetry(cpuUsage)}%</span>
                        </div>
                        <div className="telemetry-bar-bg">
                            <div
                                className="telemetry-bar-fill"
                                style={{
                                    width: `${Math.min(100, Math.max(0, cpuUsage))}%`,
                                    backgroundColor: getBarColor(cpuUsage)
                                }}
                            />
                        </div>
                    </div>
                    <div className="telemetry-row">
                        <div className="telemetry-label">
                            <span>GPU</span>
                            <span style={{ color: getBarColor(gpuUsage) }}>{formatTelemetry(gpuUsage)}%</span>
                        </div>
                        <div className="telemetry-bar-bg">
                            <div
                                className="telemetry-bar-fill"
                                style={{
                                    width: `${Math.min(100, Math.max(0, gpuUsage))}%`,
                                    backgroundColor: getBarColor(gpuUsage)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
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