import { useState, useEffect, useRef } from 'react';
import './StationThumbnail.scss';
import FullscreenModal from './FullscreenModal';
import WebRTCPlayer from '../Player/WebRTCPlayer';
import CyberLoadingOverlay from '../UI/CyberLoadingOverlay';
import TacticalStatusBadge from '../UI/TacticalStatusBadge';
import StationTuningFlyout from './StationTuningFlyout';
import StationMetricsPanel from './StationMetricsPanel';

export default function StationThumbnail(props) {
    const {
        hostname = 'UNKNOWN',
        isOnline = false,
        isStreaming = false,
        ipAddress = 'N/A',
        hasAudio = false,
        lastSeenUtc = null,
        targetFps = null,
        targetBitrateKbps = null,
        actualFps = 0,
        internalCaptureFps = 0,
        mediaTxMbps = 0,
        onToggleStream,
        isPending = false,
        globalShowMetrics = false
    } = props;

    const [showFullscreen, setShowFullscreen] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [recordingSeconds, setRecordingSeconds] = useState(0);
    const [isTuningOpen, setIsTuningOpen] = useState(false);

    const cardRef = useRef(null);
    const tuningWrapRef = useRef(null);

    const serverHost = window.location.hostname;
    const apiPort = import.meta.env?.VITE_SERVER_PORT || '5090';
    const webrtcPort = import.meta.env?.VITE_WEBRTC_PORT || '8889';
    const dynamicWebrtcBaseUrl = `http://${serverHost}:${webrtcPort}`;
    const apiBaseUrl = `http://${serverHost}:${apiPort}`;

    const isLive = isOnline && isStreaming;

    // גזירת הערכים הנוכחיים הפעילים ביותר של התחנה
    const activeLiveFps = targetFps
        || (internalCaptureFps > 0 ? internalCaptureFps : null)
        || (actualFps > 0 ? Math.round(actualFps) : 30);

    const activeLiveBitrate = targetBitrateKbps
        || (mediaTxMbps > 0 ? Math.round(mediaTxMbps * 1000) : 3000);

    useEffect(() => {
        if (!isStreaming) return;
        const timer = setInterval(() => setRecordingSeconds(p => p + 1), 1000);
        return () => {
            clearInterval(timer);
            setRecordingSeconds(0);
        };
    }, [isStreaming]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (tuningWrapRef.current && !tuningWrapRef.current.contains(e.target)) {
                setIsTuningOpen(false);
            }
        };

        if (isTuningOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isTuningOpen]);

    const formatTimer = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    return (
        <div ref={cardRef} className={`station-card ${!isOnline ? 'offline' : ''}`}>
            <div className="station-card-header">
                <div className="header-left-actions">
                    <TacticalStatusBadge
                        type="link"
                        status={isOnline ? 'ok' : 'offline'}
                        label="TELEMETRY LINK"
                        statusText={isOnline ? "ACTIVE" : "OFFLINE"}
                        description={isOnline ? `Agent telemetry operational via SignalR (${ipAddress})` : "Agent offline / no heartbeat"}
                    />

                    <TacticalStatusBadge
                        type={hasAudio ? 'audio' : 'audio-off'}
                        status={hasAudio ? 'ok' : 'crit'}
                        label="AUDIO CHANNEL"
                        statusText={hasAudio ? "LIVE (WASAPI)" : "MUTED / NO AUDIO"}
                        description={hasAudio
                            ? "WASAPI loopback audio stream operational and transmitting"
                            : "No audio feed detected. Station microphone or loopback is inactive"}
                    />

                    {isOnline && (
                        <button
                            className={`tactical-station-btn ${isStreaming ? 'is-streaming' : 'is-idle'} ${isPending ? 'is-pending' : ''}`}
                            onClick={onToggleStream}
                            disabled={isPending}
                            title={isStreaming ? "Stop video stream & telemetry broadcast" : "Start streaming agent screen & audio"}
                        >
                            {isPending ? (
                                <svg className="animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                                    <circle cx="12" cy="12" r="10" strokeDasharray="30" strokeDashoffset="0"></circle>
                                </svg>
                            ) : isStreaming ? (
                                <>
                                    <span className="hud-recording-ring"></span>
                                    <span className="btn-text">REC</span>
                                    <span className="btn-timer">{formatTimer(recordingSeconds)}</span>
                                </>
                            ) : (
                                <>
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10">
                                        <polygon points="6 4 18 12 6 20 6 4" />
                                    </svg>
                                    <span className="btn-text">START</span>
                                </>
                            )}
                        </button>
                    )}

                    {isOnline && (
                        <div className="tuning-container" ref={tuningWrapRef}>
                            <button
                                className={`tactical-tuning-btn ${isTuningOpen ? 'is-active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsTuningOpen(prev => !prev);
                                }}
                                title="Adjust Station FPS & Bitrate Sliders"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                    <line x1="4" y1="21" x2="4" y2="14" />
                                    <line x1="4" y1="10" x2="4" y2="3" />
                                    <line x1="12" y1="21" x2="12" y2="12" />
                                    <line x1="12" y1="8" x2="12" y2="3" />
                                    <line x1="20" y1="21" x2="20" y2="16" />
                                    <line x1="20" y1="12" x2="20" y2="3" />
                                    <circle cx="4" cy="12" r="2.5" fill="currentColor" />
                                    <circle cx="12" cy="10" r="2.5" fill="currentColor" />
                                    <circle cx="20" cy="14" r="2.5" fill="currentColor" />
                                </svg>
                            </button>

                            {isTuningOpen && (
                                <StationTuningFlyout
                                    hostname={hostname}
                                    currentFps={activeLiveFps}
                                    currentBitrateKbps={activeLiveBitrate}
                                    apiBaseUrl={apiBaseUrl}
                                    onClose={() => setIsTuningOpen(false)}
                                />
                            )}
                        </div>
                    )}
                </div>

                <div className="station-identity">
                    <span className="station-hostname">{hostname}</span>
                    <span className="station-ip-sub">{ipAddress}</span>
                </div>
            </div>

            <div className="station-screen-area" onClick={() => isLive && isVideoPlaying && setShowFullscreen(true)}>
                {isLive ? (
                    <>
                        {!isVideoPlaying && <CyberLoadingOverlay size="small" text="CONNECTING..." />}
                        <div className="station-thumbnail-video">
                            <WebRTCPlayer
                                streamPath={`live/${hostname}`}
                                webrtcBaseUrl={dynamicWebrtcBaseUrl}
                                onPlaying={() => setIsVideoPlaying(true)}
                                onError={() => setIsVideoPlaying(false)}
                            />
                        </div>
                    </>
                ) : (
                    <div className="screen-offline-placeholder">
                        <span>{isOnline ? 'STANDBY' : 'STATION OFFLINE'}</span>
                    </div>
                )}
            </div>

            {globalShowMetrics && <StationMetricsPanel {...props} />}

            {showFullscreen && (
                <FullscreenModal
                    hostname={hostname}
                    webrtcBaseUrl={dynamicWebrtcBaseUrl}
                    actualFps={props.actualFps}
                    droppedFrames={props.droppedFrames}
                    hostCpuPct={props.hostCpuPct}
                    gpuNvencPct={props.gpuNvencPct}
                    gpu3dPct={props.gpu3dPct}
                    mediaTxMbps={props.mediaTxMbps}
                    streamingSinceUtc={lastSeenUtc}
                    onClose={() => setShowFullscreen(false)}
                />
            )}
        </div>
    );
}