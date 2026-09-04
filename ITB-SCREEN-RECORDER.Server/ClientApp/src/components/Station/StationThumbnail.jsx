import { useState, useEffect } from 'react';
import './StationThumbnail.scss';
import WebRTCPlayer from '../Player/WebRTCPlayer';
import { Badge } from '../UI/Badge';
import { getStationTacticalBadgeConfig, getDropFramesBadgeConfig } from '../../adapters/tacticalStatusAdapter';

export default function StationThumbnail(props) {
    const {
        hostname = 'UNKNOWN',
        isOnline = false,
        isStreaming = false,
        ipAddress = 'N/A',
        droppedFrames = 0,
        hostCpuPct = 0,
        gpuNvencPct = 0,
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
    const hasCriticalError = !isOnline || droppedFrames > 5;

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

    // פתיחת ה-FullscreenModal המבצעי
    const triggerFullscreenModal = (e) => {
        e?.stopPropagation?.();
        onOpenFullscreen?.(props);
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
    const statusBadge = getStationTacticalBadgeConfig(props, formatTimer(recordingSeconds));
    const dropBadge = getDropFramesBadgeConfig(droppedFrames);

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
                    <div className="station-status-cluster">
                        <Badge
                            variant={statusBadge.variant}
                            pulse={statusBadge.pulse}
                            ariaLabel={statusBadge.ariaLabel}
                        >
                            {statusBadge.label}
                        </Badge>

                        {dropBadge && (
                            <Badge
                                variant={dropBadge.variant}
                                pulse={dropBadge.pulse}
                                ariaLabel={dropBadge.ariaLabel}
                            >
                                {dropBadge.label}
                            </Badge>
                        )}
                    </div>

                    {/* כפתור כניסה למודל מסך מלא */}
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

                    {/* כפתור פתיחת ה-Inspector בצד */}
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
                            <line x1="1" y1="14" x2="7" y2="14" />
                            <line x1="9" y1="8" x2="15" y2="8" />
                            <line x1="17" y1="16" x2="23" y2="16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* לחיצה ישירה על אזור הווידאו מפעילה את מודל המסך המלא */}
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

                {/* סרגל פעולות בריחוף מעל הווידאו */}
                <div className="hover-action-bar" onClick={(e) => e.stopPropagation()}>
                    <button
                        className={`action-btn ${isStreaming ? 'stop' : 'start'}`}
                        onClick={onToggleStream}
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

            <div className="health-bar-track" title={`Station Health: ${health}%`}>
                <div
                    className={`health-bar-fill ${health < 50 ? 'crit' : health < 80 ? 'warn' : 'good'}`}
                    style={{ width: `${health}%` }}
                />
            </div>
        </div>
    );
}