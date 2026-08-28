import { useState, useEffect } from 'react';
import './StationThumbnail.scss';
import FullscreenModal from './FullscreenModal';
import WebRTCPlayer from '../Player/WebRTCPlayer';
import CyberLoadingOverlay from '../UI/CyberLoadingOverlay';

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

const getTrafficLightClass = (qosTier) => {
    if (qosTier === 3) return 'qos-good';
    if (qosTier >= 1) return 'qos-fair';
    return 'qos-critical';
};

export default function StationThumbnail({
    hostname,
    isOnline,
    isStreaming,
    ipAddress = 'N/A',
    hasAudio = false,
    isPending = false,
    onToggleStream,
    actualFps = 0,
    internalCaptureFps = 0,
    droppedFrames = 0,
    qosTier = 3,

    // מדדי החומרה והרשת
    hostCpuPct = 0,
    processCpuPct = 0,
    gpu3dPct = 0,
    gpuNvencPct = 0,
    mediaTxMbps = 0,
    nicUtilizationPct = 0,
    telemetryTxKbps = 0
}) {
    const [showFullscreen, setShowFullscreen] = useState(false);
    const [retryKey, setRetryKey] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [prevIsStreaming, setPrevIsStreaming] = useState(isStreaming);

    const serverHost = window.location.hostname;
    const webrtcPort = import.meta.env?.VITE_WEBRTC_PORT || '8889';
    const dynamicWebrtcBaseUrl = `http://${serverHost}:${webrtcPort}`;

    if (isStreaming !== prevIsStreaming) {
        setPrevIsStreaming(isStreaming);
        setIsVideoPlaying(false);
    }

    useEffect(() => {
        let timer;
        if (isOnline && isStreaming) {
            timer = setTimeout(() => {
                setRetryKey(prev => prev + 1);
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [isOnline, isStreaming]);

    const isLive = isOnline && isStreaming;

    // חישוב עומס כרטיס המסך המקסימלי (3D או קידוד) לתצוגה בפס
    const maxGpuLoad = Math.max(gpu3dPct, gpuNvencPct);

    return (
        <>
            <div className={`station-card ${!isOnline ? 'offline' : ''}`}>
                <div className="station-card-header">
                    <div className="header-left-actions">
                        <div className={`status-pill ${isOnline ? 'online' : 'offline'}`}>
                            {isOnline ? 'ONLINE' : 'OFFLINE'}
                        </div>

                        {hasAudio && isOnline && (
                            <div className="mic-indicator" title="Audio Stream Active">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                    <line x1="12" y1="19" x2="12" y2="23"></line>
                                    <line x1="8" y1="23" x2="16" y2="23"></line>
                                </svg>
                            </div>
                        )}

                        {isOnline && (
                            <button
                                className={`stream-action-btn ${isStreaming ? 'is-streaming' : 'is-idle'} ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={onToggleStream}
                                disabled={isPending}
                                title={isStreaming ? "Stop Streaming" : "Start Streaming"}
                            >
                                {isPending ? (
                                    <svg className="animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                                        <circle cx="12" cy="12" r="10" strokeDasharray="30" strokeDashoffset="0"></circle>
                                    </svg>
                                ) : isStreaming ? (
                                    <>
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><rect x="6" y="6" width="12" height="12"></rect></svg>
                                        <span className="btn-text">STOP</span>
                                    </>
                                ) : (
                                    <>
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                        <span className="btn-text">START</span>
                                    </>
                                )}
                            </button>
                        )}
                    </div>

                    <div className="station-identity">
                        <span className="station-hostname">{hostname}</span>
                        <span className="station-ip">{ipAddress}</span>
                    </div>
                </div>

                <div
                    className="station-screen-area"
                    onClick={() => isLive && isVideoPlaying && setShowFullscreen(true)}
                >
                    {isLive && isVideoPlaying && (
                        <div className="traffic-light-badge" title={`FPS: ${actualFps} | Tier: ${qosTier}`}>
                            <div className={`light-dot ${getTrafficLightClass(qosTier)}`}></div>
                        </div>
                    )}

                    {isLive ? (
                        <>
                            {!isVideoPlaying && <CyberLoadingOverlay size="small" text="CONNECTING" />}

                            <div className="station-thumbnail-video">
                                <WebRTCPlayer
                                    key={retryKey}
                                    streamPath={`live/${hostname}`}
                                    webrtcBaseUrl={dynamicWebrtcBaseUrl}
                                    onPlaying={() => setIsVideoPlaying(true)}
                                />
                            </div>

                            {isVideoPlaying && (
                                <div className="play-overlay-hint">
                                    <span className="hint-text">EXPAND FULLSCREEN</span>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="screen-offline-placeholder">
                            <span>{isOnline && !isStreaming ? 'WAITING FOR STREAM...' : 'STATION OFFLINE'}</span>
                        </div>
                    )}
                </div>

                {/* תצוגת פסי ההתקדמות (Progress Bars) ל-CPU, GPU ו-NET */}
                <div className="station-telemetry">
                    <div className="telemetry-row">
                        <div className="telemetry-label">
                            <span className="label-name">CPU</span>
                            <span className="label-value" style={{ color: getBarColor(hostCpuPct) }}>{formatTelemetry(hostCpuPct)}%</span>
                        </div>
                        <div className="telemetry-bar-bg">
                            <div className="telemetry-bar-fill" style={{ width: `${Math.min(100, Math.max(0, hostCpuPct))}%`, backgroundColor: getBarColor(hostCpuPct) }} />
                        </div>
                    </div>

                    <div className="telemetry-row">
                        <div className="telemetry-label">
                            <span className="label-name">GPU</span>
                            <span className="label-value" style={{ color: getBarColor(maxGpuLoad) }}>{formatTelemetry(maxGpuLoad)}%</span>
                        </div>
                        <div className="telemetry-bar-bg">
                            <div className="telemetry-bar-fill" style={{ width: `${Math.min(100, Math.max(0, maxGpuLoad))}%`, backgroundColor: getBarColor(maxGpuLoad) }} />
                        </div>
                    </div>

                    <div className="telemetry-row">
                        <div className="telemetry-label">
                            <span className="label-name">NET</span>
                            <span className="label-value" style={{ color: getBarColor(nicUtilizationPct) }}>{formatTelemetry(nicUtilizationPct)}%</span>
                        </div>
                        <div className="telemetry-bar-bg">
                            <div className="telemetry-bar-fill" style={{ width: `${Math.min(100, Math.max(0, nicUtilizationPct))}%`, backgroundColor: getBarColor(nicUtilizationPct) }} />
                        </div>
                    </div>
                </div>
            </div>

            {showFullscreen && (
                <FullscreenModal
                    hostname={hostname}
                    webrtcBaseUrl={dynamicWebrtcBaseUrl}
                    actualFps={actualFps}
                    internalCaptureFps={internalCaptureFps}
                    droppedFrames={droppedFrames}
                    qosTier={qosTier}

                    hostCpuPct={hostCpuPct}
                    processCpuPct={processCpuPct}
                    gpu3dPct={gpu3dPct}
                    gpuNvencPct={gpuNvencPct}
                    mediaTxMbps={mediaTxMbps}
                    nicUtilizationPct={nicUtilizationPct}
                    telemetryTxKbps={telemetryTxKbps}

                    onClose={() => setShowFullscreen(false)}
                />
            )}
        </>
    );
}