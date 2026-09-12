import { useState, useEffect } from 'react';
import './StationThumbnail.scss';
import WebRTCPlayer from '../Player/WebRTCPlayer';

export default function StationThumbnail(props) {
    const {
        hostname = 'UNKNOWN',
        isOnline = false,
        isStreaming = false,
        ipAddress = 'N/A',
        droppedFrames = 0,
        hostCpuPct = 0,
        gpuNvencPct = 0,
        hasActiveSpeakers = false,
        hasActiveMicrophone = false,
        isAudioStreaming = false,
        hasAudio = false,
        targetFps,
        videoBitrate,
        isCustomOverride = false,
        isPending = false,
        onToggleStream,
        onSelectStation,
        onOpenFullscreen,
        onQuickBookmark,
        onQuickPlayback,
        onQuickExport
    } = props;

    const [recordingSeconds, setRecordingSeconds] = useState(0);

    const serverHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    const webrtcPort = import.meta.env?.VITE_WEBRTC_PORT || '8889';
    const dynamicWebrtcBaseUrl = `http://${serverHost}:${webrtcPort}`;

    const isLive = isOnline && isStreaming;
    const hasCriticalError = isOnline && (droppedFrames > 5);

    const audioHasPlayback = Boolean(hasActiveSpeakers);
    const audioHasMic = Boolean(hasActiveMicrophone);
    const isAudioLive = Boolean(isAudioStreaming || hasAudio || audioHasPlayback || audioHasMic);

    const hasCustomPolicy = Boolean(
        isCustomOverride ||
        props.hasCustomPolicy ||
        props.isOverridden ||
        (targetFps && targetFps !== 20 && targetFps !== 30) ||
        (videoBitrate && videoBitrate !== '2500k' && videoBitrate !== '3M')
    );

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

    const triggerFullscreenModal = (e) => {
        e?.stopPropagation?.();
        onOpenFullscreen?.(props);
    };

    const handleQuickToggleRec = (e) => {
        e.stopPropagation();
        if (!isOnline || isPending) return;
        onToggleStream?.(hostname, isStreaming);
    };

    const computeHealthScore = () => {
        if (!isOnline) return 0;
        let score = 100;
        if (droppedFrames > 0) score -= Math.min(40, droppedFrames * 5);
        if (hostCpuPct > 85) score -= 25;
        if (gpuNvencPct > 90) score -= 20;
        return Math.max(10, score);
    };

    const health = computeHealthScore();

    const getAudioBadgeText = () => {
        if (!isOnline) return 'OFF';
        if (audioHasPlayback && audioHasMic) return 'SPK + MIC';
        if (audioHasPlayback) return 'SPK ONLY';
        if (audioHasMic) return 'MIC ONLY';
        return isAudioLive ? 'AUDIO ON' : 'MUTED';
    };

    return (
        <div
            className={`station-tactical-card ${!isOnline ? 'is-offline' : ''} ${hasCriticalError ? 'has-critical' : ''}`}
            onClick={() => onSelectStation?.(props)}
            title="Click card background to open Station Inspector"
        >
            <div className="card-minimal-header">
                <div className="station-brand">
                    <span className="station-name">{hostname}</span>
                    <span className="station-ip">{ipAddress}</span>
                </div>

                <div className="station-header-right">
                    <button
                        type="button"
                        className={`one-click-rec-btn ${!isOnline ? 'is-offline' : isStreaming ? 'is-rec' : 'is-idle'} ${isPending ? 'is-pending' : ''}`}
                        onClick={handleQuickToggleRec}
                        disabled={!isOnline || isPending}
                        title={
                            !isOnline
                                ? "Station Offline"
                                : isPending
                                    ? "Action in progress..."
                                    : isStreaming
                                        ? "Click to STOP Recording"
                                        : "Click to START Recording"
                        }
                    >
                        <span className="rec-indicator-dot" />
                        <span className="rec-label">
                            {!isOnline ? 'OFFLINE' : isPending ? 'WAIT...' : isStreaming ? `REC ${formatTimer(recordingSeconds)}` : 'IDLE'}
                        </span>
                    </button>

                    <button
                        className="header-action-icon-btn fullscreen-btn"
                        onClick={triggerFullscreenModal}
                        title="Open Fullscreen Theater Mode"
                        aria-label="Toggle Fullscreen"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                        </svg>
                    </button>

                    <button
                        className="header-action-icon-btn inspect-drawer-trigger"
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelectStation?.(props);
                        }}
                        title="Open Station Inspector: Telemetry & Tuning"
                        aria-label="Open Station Inspector"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="4" y1="21" x2="4" y2="14" />
                            <line x1="4" y1="10" x2="4" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12" y2="3" />
                            <line x1="20" y1="21" x2="20" y2="16" />
                            <line x1="20" y1="12" x2="20" y2="3" />
                        </svg>
                    </button>
                </div>
            </div>

            <div
                className="card-screen-viewport"
                onClick={triggerFullscreenModal}
                title="Click video to open Fullscreen Theater"
            >
                {isLive ? (
                    <div className="webrtc-container" style={{ pointerEvents: 'none' }}>
                        <WebRTCPlayer
                            streamPath={`live/${hostname}`}
                            webrtcBaseUrl={dynamicWebrtcBaseUrl}
                        />
                    </div>
                ) : (
                    <div className="offline-screen-matte">
                        <span>{isOnline ? 'STANDBY' : 'OFFLINE'}</span>
                    </div>
                )}

                <div
                    className={`tactical-audio-indicator ${isAudioLive ? 'active' : 'muted'}`}
                    title={`Audio Status: ${getAudioBadgeText()} (Playback: ${audioHasPlayback ? 'Active' : 'Silent'}, Mic: ${audioHasMic ? 'Active' : 'Silent'})`}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="12" height="12">
                        {isAudioLive ? (
                            <>
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                            </>
                        ) : (
                            <>
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <line x1="23" y1="9" x2="17" y2="15" />
                                <line x1="17" y1="9" x2="23" y2="15" />
                            </>
                        )}
                    </svg>
                    <span>{getAudioBadgeText()}</span>
                </div>

                {hasCustomPolicy && (
                    <div
                        className="tactical-override-tag"
                        title={`Custom Policy: ${targetFps ? `${targetFps} FPS` : ''} ${videoBitrate ? `| ${videoBitrate}` : ''}`}
                    >
                        <span>MOD // {targetFps ? `${targetFps}F` : ''}{targetFps && videoBitrate ? ' • ' : ''}{videoBitrate || ''}</span>
                    </div>
                )}

                <div className="hover-action-bar" onClick={(e) => e.stopPropagation()}>
                    <button
                        className={`action-btn ${isStreaming ? 'stop' : 'start'}`}
                        onClick={handleQuickToggleRec}
                        title={isStreaming ? "Stop Stream" : "Start Stream"}
                    >
                        {isStreaming ? 'STOP' : 'START'}
                    </button>
                    <button
                        className="action-btn"
                        onClick={triggerFullscreenModal}
                        title="Fullscreen Theater Mode"
                    >
                        FULL
                    </button>
                    <button
                        className="action-btn"
                        onClick={() => onQuickBookmark?.(hostname)}
                        title="Add Bookmark"
                    >
                        BM
                    </button>
                    <button
                        className="action-btn"
                        onClick={() => onQuickPlayback?.(hostname)}
                        title="Open Playback"
                    >
                        PLAY
                    </button>
                    <button
                        className="action-btn"
                        onClick={() => onQuickExport?.(hostname)}
                        title="Export Clip"
                    >
                        EXP
                    </button>
                </div>
            </div>

            <div className="card-minimal-footer">
                {droppedFrames > 0 && (
                    <div className={`dropped-frames-notice ${droppedFrames > 5 ? 'critical' : 'warning'}`}>
                        <span className="drop-indicator-dot" />
                        <span className="drop-label">{droppedFrames} DROPPED FRAMES</span>
                    </div>
                )}
                <div className="health-bar-track" title={`Station Health: ${health}%`}>
                    <div
                        className={`health-bar-fill ${health < 50 ? 'crit' : health < 80 ? 'warn' : 'good'}`}
                        style={{ width: `${health}%` }}
                    />
                </div>
            </div>
        </div>
    );
}