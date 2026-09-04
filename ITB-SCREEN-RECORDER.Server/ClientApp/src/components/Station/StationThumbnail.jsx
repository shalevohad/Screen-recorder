import { useState, useEffect, useRef } from 'react';
import './StationThumbnail.scss';
import FullscreenModal from './FullscreenModal';
import WebRTCPlayer from '../Player/WebRTCPlayer';
import CyberLoadingOverlay from '../UI/CyberLoadingOverlay';
import TacticalStatusBadge from '../UI/TacticalStatusBadge';

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
    lastSeenUtc = null,

    hostCpuPct = 0,
    processCpuPct = 0,
    gpu3dPct = 0,
    gpuNvencPct = 0,
    hostRamPct = 0,
    processRamMb = 0,
    hostTotalRamMb = 16384,
    mediaTxMbps = 0,
    nicTotalTxMbps = 0,
    nicTotalRxMbps = 0,
    linkSpeedMbps = 1000,
    nicUtilizationPct = 0,

    onToggleStream,
    isPending = false,
    globalShowMetrics = false
}) {
    const [showFullscreen, setShowFullscreen] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [recordingSeconds, setRecordingSeconds] = useState(0);

    const cardRef = useRef(null);
    const serverHost = window.location.hostname;
    const webrtcPort = import.meta.env?.VITE_WEBRTC_PORT || '8889';
    const dynamicWebrtcBaseUrl = `http://${serverHost}:${webrtcPort}`;

    const isLive = isOnline && isStreaming;

    useEffect(() => {
        if (!isStreaming) return;
        const timer = setInterval(() => setRecordingSeconds(p => p + 1), 1000);
        return () => {
            clearInterval(timer);
            setRecordingSeconds(0);
        };
    }, [isStreaming]);

    const formatTimer = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    const effectiveLinkSpeed = linkSpeedMbps > 0 ? linkSpeedMbps : 1000;
    const totalNicMbps = nicTotalTxMbps + nicTotalRxMbps;
    const hostNetPct = nicUtilizationPct > 0
        ? nicUtilizationPct
        : Math.min(100, (totalNicMbps / effectiveLinkSpeed) * 100);
    const appNetPct = Math.min(100, (mediaTxMbps / effectiveLinkSpeed) * 100);
    const linkDisplay = effectiveLinkSpeed >= 1000 ? `${Math.round(effectiveLinkSpeed / 1000)}G` : `${Math.round(effectiveLinkSpeed)}M`;

    const appRamMb = processRamMb || 0;
    const totalRamMb = hostTotalRamMb > 0 ? hostTotalRamMb : 16384;
    const appRamPctOfTotal = (appRamMb / totalRamMb) * 100;
    const appRamDisplay = appRamMb >= 1024 ? `${(appRamMb / 1024).toFixed(1)}G` : `${Math.round(appRamMb)}M`;
    const totalRamDisplay = `${Math.round(totalRamMb / 1024)}G`;

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

                    {/* חיווי ערוץ סאונד: ירוק כשיש שידור סאונד, אדום מושתק כשאין */}
                    <TacticalStatusBadge
                        type={hasAudio ? 'audio' : 'audio-off'}
                        status={hasAudio ? 'ok' : 'crit'}
                        label="AUDIO CHANNEL"
                        statusText={hasAudio ? "LIVE (WASAPI)" : "MUTED / NO AUDIO"}
                        description={hasAudio
                            ? "WASAPI loopback audio stream operational and transmitting"
                            : "No audio feed detected. Station microphone or desktop loopback is inactive"}
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
                </div>

                <div className="station-identity">
                    <span className="station-hostname">{hostname}</span>
                    <span className="station-ip-inline">({ipAddress})</span>
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

            {globalShowMetrics && (
                <div className="station-telemetry">
                    <div className="inline-network-stats">
                        <div className="stat-box">
                            <span className="stat-label">FPS</span>
                            <span className="stat-value green">{actualFps}</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label">CAP</span>
                            <span className="stat-value yellow">{internalCaptureFps}</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label">AUDIO</span>
                            <span className={`stat-value ${hasAudio ? 'green' : 'red'}`}>{hasAudio ? 'ON' : 'OFF'}</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label">DROP</span>
                            <span className={`stat-value ${droppedFrames > 0 ? 'red' : 'gray'}`}>{droppedFrames}</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label">QOS</span>
                            <span className="stat-value blue">T{qosTier}</span>
                        </div>
                    </div>

                    <div className="metric-bars-container">
                        <div className="dual-metric-group">
                            <div className="telemetry-label">
                                <span className="cat-name">CPU</span>
                                <span className="cat-values">
                                    <span className="val-host">{hostCpuPct.toFixed(1)}%</span>
                                    <span className="val-app">({processCpuPct.toFixed(1)}%)</span>
                                </span>
                            </div>
                            <div className="bars-pair">
                                <div className="bar-track">
                                    <div className="bar-fill host-green" style={{ width: `${Math.min(100, hostCpuPct)}%` }} />
                                </div>
                                <div className="bar-track app-track">
                                    <div className="bar-fill app-blue" style={{ width: `${Math.min(100, processCpuPct)}%` }} />
                                </div>
                            </div>
                        </div>

                        <div className="dual-metric-group">
                            <div className="telemetry-label">
                                <span className="cat-name">RAM</span>
                                <span className="cat-values">
                                    <span className="val-host">{hostRamPct.toFixed(1)}%</span>
                                    <span className="val-app">({appRamDisplay} / {totalRamDisplay} ({appRamPctOfTotal.toFixed(1)}%))</span>
                                </span>
                            </div>
                            <div className="bars-pair">
                                <div className="bar-track">
                                    <div className="bar-fill host-green" style={{ width: `${Math.min(100, hostRamPct)}%` }} />
                                </div>
                                <div className="bar-track app-track">
                                    <div className="bar-fill app-blue" style={{ width: `${Math.min(100, appRamPctOfTotal)}%` }} />
                                </div>
                            </div>
                        </div>

                        <div className="dual-metric-group">
                            <div className="telemetry-label">
                                <span className="cat-name">GPU</span>
                                <span className="cat-values">
                                    <span className="val-host">{gpu3dPct.toFixed(1)}%</span>
                                    <span className="val-app">({gpuNvencPct.toFixed(1)}%)</span>
                                </span>
                            </div>
                            <div className="bars-pair">
                                <div className="bar-track">
                                    <div className="bar-fill host-green" style={{ width: `${Math.min(100, gpu3dPct)}%` }} />
                                </div>
                                <div className="bar-track app-track">
                                    <div className="bar-fill app-blue" style={{ width: `${Math.min(100, gpuNvencPct)}%` }} />
                                </div>
                            </div>
                        </div>

                        <div className="dual-metric-group">
                            <div className="telemetry-label">
                                <span className="cat-name">NET <strong className="link-badge">({linkDisplay})</strong></span>
                                <span className="cat-values">
                                    <span className="val-host">{hostNetPct.toFixed(1)}%</span>
                                    <span className="val-app">({mediaTxMbps.toFixed(1)}M / {appNetPct.toFixed(1)}%)</span>
                                </span>
                            </div>
                            <div className="bars-pair">
                                <div className="bar-track">
                                    <div className="bar-fill host-green" style={{ width: `${Math.min(100, hostNetPct)}%` }} />
                                </div>
                                <div className="bar-track app-track">
                                    <div className="bar-fill app-blue" style={{ width: `${Math.min(100, appNetPct)}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showFullscreen && (
                <FullscreenModal
                    hostname={hostname}
                    webrtcBaseUrl={dynamicWebrtcBaseUrl}
                    actualFps={actualFps}
                    droppedFrames={droppedFrames}
                    hostCpuPct={hostCpuPct}
                    gpuNvencPct={gpuNvencPct}
                    gpu3dPct={gpu3dPct}
                    mediaTxMbps={mediaTxMbps}
                    streamingSinceUtc={lastSeenUtc}
                    onClose={() => setShowFullscreen(false)}
                />
            )}
        </div>
    );
}