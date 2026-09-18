import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import WebRTCPlayer from '../Player/WebRTCPlayer';
import CyberLoadingOverlay from '../UI/CyberLoadingOverlay';
import './FullscreenModal.scss';

export default function FullscreenModal(props) {
    const {
        hostname,
        webrtcBaseUrl,
        actualFps = 0,
        targetFps = 30,
        droppedFrames = 0,
        hostCpuPct = 0,
        appCpuPct = 0,
        hostRamPct = 0,
        appRamMb = 0,
        gpuNvencPct = 0,
        gpu3dPct = 0,
        mediaTxMbps = 0,
        telemetryTxKbps = 0,
        streamingSinceUtc,
        isStreaming = false,
        onToggleStream,
        onOpenInspector,
        onClose
    } = props;

    const modalBoxRef = useRef(null);
    const sessionStartTimeRef = useRef(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [confirmStop, setConfirmStop] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    // יחס מסך דינמי שמתאים את עצמו לרזולוציית התחנה (ברירת מחדל 16:9)
    const [aspectRatio, setAspectRatio] = useState(16 / 9);

    // זיהוי רזולוציית הווידאו בפועל והתאמת גבולות החלון אליה ללא פסים
    useEffect(() => {
        const checkVideoDimensions = () => {
            if (!modalBoxRef.current) return;
            const videoEl = modalBoxRef.current.querySelector('video');
            if (videoEl && videoEl.videoWidth > 0 && videoEl.videoHeight > 0) {
                const streamRatio = videoEl.videoWidth / videoEl.videoHeight;
                if (Math.abs(streamRatio - aspectRatio) > 0.01) {
                    setAspectRatio(streamRatio);
                }
            }
        };

        const interval = setInterval(checkVideoDimensions, 500);
        return () => clearInterval(interval);
    }, [aspectRatio]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose?.();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    useEffect(() => {
        if (!confirmStop) return;
        const timer = setTimeout(() => setConfirmStop(false), 4000);
        return () => clearTimeout(timer);
    }, [confirmStop]);

    // טיימר שידור חי נקי לחלוטין ללא קריאות setState סינכרוניות בתוך האפקט
    useEffect(() => {
        if (!isStreaming) {
            sessionStartTimeRef.current = null;
            return;
        }

        const rawStart = streamingSinceUtc || props.recordingStartTime || props.startedAt || props.streamingStartedAt;
        const parsedStart = rawStart ? new Date(rawStart).getTime() : null;
        const hasValidDate = parsedStart && !isNaN(parsedStart) && parsedStart > 0;

        if (!hasValidDate && !sessionStartTimeRef.current) {
            sessionStartTimeRef.current = Date.now();
        }

        const updateClock = () => {
            const startTimestamp = hasValidDate ? parsedStart : sessionStartTimeRef.current;
            const diff = Math.max(0, Math.floor((Date.now() - startTimestamp) / 1000));
            setElapsedSeconds(diff);
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, [isStreaming, streamingSinceUtc, props.recordingStartTime, props.startedAt, props.streamingStartedAt]);

    // אם הסטרימינג לא פעיל, הזמן המוצג הוא תמיד 0 באופן מובטח
    const displayElapsedSeconds = isStreaming ? elapsedSeconds : 0;

    const formatElapsedTime = (totalSec) => {
        const days = Math.floor(totalSec / 86400);
        let rem = totalSec % 86400;
        const hours = Math.floor(rem / 3600);
        rem %= 3600;
        const minutes = Math.floor(rem / 60);
        const seconds = rem % 60;

        const pad = (n) => String(n).padStart(2, '0');
        if (days > 0) return `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    const handleBackdropClick = (e) => {
        if (modalBoxRef.current && !modalBoxRef.current.contains(e.target)) {
            onClose?.();
        }
    };

    const serverHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    const webrtcPort = import.meta.env?.VITE_WEBRTC_PORT || '8889';
    const dynamicWebrtcBaseUrl = webrtcBaseUrl || `http://${serverHost}:${webrtcPort}`;

    const hostCpu = Number(hostCpuPct || 0);
    const appCpu = Number(appCpuPct || 0);
    const hostRam = Number(hostRamPct || 0);
    const appRam = Number(appRamMb || 0);

    const formatRamSub = (mb) => {
        if (!mb) return '';
        if (mb >= 1024) return `(${(mb / 1024).toFixed(1)}G)`;
        return `(${Math.round(mb)}M)`;
    };

    const modalContent = (
        <div className="stream-modal-backdrop" onClick={handleBackdropClick}>
            <div
                ref={modalBoxRef}
                className="stream-modal-box"
                style={{ '--video-aspect': aspectRatio }}
            >
                <div className="stream-modal-header">
                    <div className="stream-modal-title">
                        <span className={`live-dot ${isStreaming ? 'streaming' : 'idle'}`}></span>
                        <h2>LIVE // {hostname}</h2>
                        {isStreaming && (
                            <span className="uptime-badge" title="Active stream duration">
                                {formatElapsedTime(displayElapsedSeconds)}
                            </span>
                        )}
                    </div>

                    <div className="modal-network-stats">
                        <span className="stat-pill" title={`Target: ${targetFps} FPS`}>
                            FPS <span className="val green">{actualFps}</span>
                        </span>

                        <span className="stat-pill">
                            DROP <span className={`val ${droppedFrames > 0 ? 'red' : 'gray'}`}>{droppedFrames}</span>
                        </span>

                        <span className="stat-pill" title={`Host CPU: ${hostCpu.toFixed(1)}% | App: ${appCpu.toFixed(1)}%`}>
                            CPU <span className="val yellow">{hostCpu.toFixed(1)}%</span>
                            {appCpu > 0 && <span className="val cyan">({appCpu.toFixed(1)}%)</span>}
                        </span>

                        <span className="stat-pill" title={`RAM Usage: ${hostRam.toFixed(1)}% | App: ${appRam}MB`}>
                            RAM <span className="val yellow">{hostRam.toFixed(1)}%</span>
                            {appRam > 0 && <span className="val cyan">{formatRamSub(appRam)}</span>}
                        </span>

                        <span className="stat-pill" title={`GPU 3D: ${Number(gpu3dPct).toFixed(0)}% | NVENC: ${Number(gpuNvencPct).toFixed(0)}%`}>
                            GPU <span className="val yellow">{Number(gpu3dPct).toFixed(0)}%</span>
                            <span className="val cyan">({Number(gpuNvencPct).toFixed(0)}%)</span>
                        </span>

                        <span className="stat-pill">
                            VBR <span className="val blue">{Number(mediaTxMbps).toFixed(2)}M</span>
                        </span>

                        <span className="stat-pill">
                            C2 <span className="val purple">{Number(telemetryTxKbps).toFixed(1)}k</span>
                        </span>
                    </div>

                    <div className="modal-actions-cluster">
                        {!isStreaming ? (
                            <button
                                type="button"
                                className="act-pill-btn start"
                                onClick={() => onToggleStream?.(hostname, false)}
                                title="Start Stream"
                            >
                                START
                            </button>
                        ) : !confirmStop ? (
                            <button
                                type="button"
                                className="act-pill-btn stop"
                                onClick={() => setConfirmStop(true)}
                                title="Stop Stream"
                            >
                                STOP
                            </button>
                        ) : (
                            <div className="safe-stop-confirm">
                                <span>STOP?</span>
                                <button
                                    type="button"
                                    className="confirm-btn yes"
                                    onClick={() => {
                                        onToggleStream?.(hostname, true);
                                        setConfirmStop(false);
                                    }}
                                >
                                    YES
                                </button>
                                <button
                                    type="button"
                                    className="confirm-btn no"
                                    onClick={() => setConfirmStop(false)}
                                >
                                    NO
                                </button>
                            </div>
                        )}

                        <button
                            type="button"
                            className="act-pill-btn inspect"
                            onClick={() => {
                                onClose?.();
                                onOpenInspector?.();
                            }}
                            title="Open Station Inspector Drawer"
                        >
                            INSPECT ↗
                        </button>
                    </div>

                    <button type="button" onClick={onClose} className="stream-modal-close-btn" title="Close Fullscreen (ESC)">
                        ✕
                    </button>
                </div>

                <div className="stream-modal-body">
                    {!isVideoPlaying && (
                        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
                            <CyberLoadingOverlay
                                text="ESTABLISHING SECURE STREAM..."
                                size="large"
                            />
                        </div>
                    )}

                    <WebRTCPlayer
                        streamPath={`live/${hostname}`}
                        webrtcBaseUrl={dynamicWebrtcBaseUrl}
                        showControls={false}
                        isMuted={isMuted}
                        onPlaying={() => setIsVideoPlaying(true)}
                    />

                    <div className="fullscreen-audio-corner">
                        <button
                            type="button"
                            className={`audio-floating-btn ${isMuted ? 'muted' : 'active'}`}
                            onClick={() => setIsMuted(p => !p)}
                            title={isMuted ? "Unmute Audio" : "Mute Audio"}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="13" height="13">
                                {isMuted ? (
                                    <>
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <line x1="23" y1="9" x2="17" y2="15" />
                                        <line x1="17" y1="9" x2="23" y2="15" />
                                    </>
                                ) : (
                                    <>
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                    </>
                                )}
                            </svg>
                            <span>{isMuted ? 'MUTED' : 'LIVE AUDIO'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}