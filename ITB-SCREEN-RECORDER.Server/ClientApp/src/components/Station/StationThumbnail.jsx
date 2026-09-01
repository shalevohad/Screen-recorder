import { useState, useEffect } from 'react';
import './StationThumbnail.scss';
import FullscreenModal from './FullscreenModal';
import WebRTCPlayer from '../Player/WebRTCPlayer';
import CyberLoadingOverlay from '../UI/CyberLoadingOverlay';
import CategoryMetricBars from '../UI/CategoryMetricBars';

export default function StationThumbnail({
    hostname = 'UNKNOWN',
    isOnline = false,
    isStreaming = false,
    ipAddress = 'N/A',
    hasAudio = false,
    actualFps = 0,
    qosTier = 3,
    droppedFrames = 0,
    internalCaptureFps = 0,

    hostCpuPct = 0,
    processCpuPct = 0,
    gpu3dPct = 0,
    gpuNvencPct = 0,
    mediaTxMbps = 0,
    netTotalTxMbps = 0,
    hostRamPct = 0,
    processRamMb = 0,
    hostTotalRamMb = 0,
    linkSpeedMbps = 1000,
    nicUtilizationPct = 0,
    telemetryTxKbps = 0,

    onToggleStream,
    isPending = false
}) {
    const [showFullscreen, setShowFullscreen] = useState(false);
    const [retryKey, setRetryKey] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [prevIsStreaming, setPrevIsStreaming] = useState(isStreaming);

    const [recordingSeconds, setRecordingSeconds] = useState(0);

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

    useEffect(() => {
        let timer;
        if (isStreaming) {
            timer = setInterval(() => {
                setRecordingSeconds(sec => sec + 1);
            }, 1000);
        } else {
            setRecordingSeconds(0);
        }
        return () => clearInterval(timer);
    }, [isStreaming]);

    const formatTimer = (totalSec) => {
        const m = Math.floor(totalSec / 60);
        const s = totalSec % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    const isLive = isOnline && isStreaming;

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
                                title={isStreaming ? "Stop Recording / Streaming" : "Start Streaming"}
                            >
                                {isPending ? (
                                    <svg className="animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                                        <circle cx="12" cy="12" r="10" strokeDasharray="30" strokeDashoffset="0"></circle>
                                    </svg>
                                ) : isStreaming ? (
                                    <>
                                        <div className="rec-dot-pulse"></div>
                                        <span className="btn-text">RECORDING</span>
                                        <span className="btn-timer">{formatTimer(recordingSeconds)}</span>
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

                <div className="station-screen-area" onClick={() => isLive && isVideoPlaying && setShowFullscreen(true)}>
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

                <div className="station-telemetry">
                    <div className="inline-network-stats">
                        <div className="stat-box">
                            <div className="stat-header">
                                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>
                                <span>FPS</span>
                            </div>
                            <span className="stat-value green">{actualFps}</span>
                        </div>
                        <div className="stat-box">
                            <div className="stat-header">
                                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                                <span>CAP</span>
                            </div>
                            <span className="stat-value yellow">{internalCaptureFps}</span>
                        </div>
                        <div className="stat-box">
                            <div className="stat-header">
                                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                <span>DROP</span>
                            </div>
                            <span className={`stat-value ${droppedFrames > 0 ? 'red' : 'gray'}`}>{droppedFrames}</span>
                        </div>
                        <div className="stat-box">
                            <div className="stat-header">
                                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M12 20V10M18 20V4M6 20v-4"></path></svg>
                                <span>QOS</span>
                            </div>
                            <span className="stat-value blue">T{qosTier}</span>
                        </div>
                    </div>

                    <CategoryMetricBars
                        hostCpuPct={hostCpuPct}
                        processCpuPct={processCpuPct}
                        gpu3dPct={gpu3dPct}
                        gpuNvencPct={gpuNvencPct}
                        mediaTxMbps={mediaTxMbps}
                        netTotalTxMbps={netTotalTxMbps}
                        hostRamPct={hostRamPct}
                        processRamMb={processRamMb}
                        hostTotalRamMb={hostTotalRamMb}
                        linkSpeedMbps={linkSpeedMbps}
                        compact={true}
                    />
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
                    netTotalTxMbps={netTotalTxMbps}
                    nicUtilizationPct={nicUtilizationPct}
                    telemetryTxKbps={telemetryTxKbps}
                    hostRamPct={hostRamPct}
                    processRamMb={processRamMb}
                    hostTotalRamMb={hostTotalRamMb}
                    onClose={() => setShowFullscreen(false)}
                />
            )}
        </>
    );
}