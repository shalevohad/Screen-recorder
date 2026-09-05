import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import WebRTCPlayer from '../Player/WebRTCPlayer';
import CyberLoadingOverlay from '../UI/CyberLoadingOverlay';
import './FullscreenModal.scss';

export default function FullscreenModal({
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
    onQuickBookmark,
    onQuickPlayback,
    onQuickExport,
    onOpenInspector,
    onClose
}) {
    const modalBoxRef = useRef(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [confirmStop, setConfirmStop] = useState(false);

    const [elapsedTimeStr, setElapsedTimeStr] = useState(() => {
        if (!streamingSinceUtc) return '00:00:00';
        const start = new Date(streamingSinceUtc).getTime();
        const now = Date.now();
        let diffSec = Math.max(0, Math.floor((now - start) / 1000));

        const days = Math.floor(diffSec / 86400);
        diffSec %= 86400;
        const hours = Math.floor(diffSec / 3600);
        diffSec %= 3600;
        const minutes = Math.floor(diffSec / 60);
        const seconds = diffSec % 60;

        const pad = (n) => String(n).padStart(2, '0');
        if (days > 0) return `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    });

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    useEffect(() => {
        if (!confirmStop) return;
        const timer = setTimeout(() => setConfirmStop(false), 4000);
        return () => clearTimeout(timer);
    }, [confirmStop]);

    useEffect(() => {
        if (!streamingSinceUtc) return;

        const updateTimer = () => {
            const start = new Date(streamingSinceUtc).getTime();
            const now = Date.now();
            let diffSec = Math.max(0, Math.floor((now - start) / 1000));

            const days = Math.floor(diffSec / 86400);
            diffSec %= 86400;
            const hours = Math.floor(diffSec / 3600);
            diffSec %= 3600;
            const minutes = Math.floor(diffSec / 60);
            const seconds = diffSec % 60;

            const pad = (n) => String(n).padStart(2, '0');
            if (days > 0) {
                setElapsedTimeStr(`${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
            } else {
                setElapsedTimeStr(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
            }
        };

        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [streamingSinceUtc]);

    const handleBackdropClick = (e) => {
        if (modalBoxRef.current && !modalBoxRef.current.contains(e.target)) {
            onClose();
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
            <div ref={modalBoxRef} className="stream-modal-box">
                <div className="stream-modal-header">
                    <div className="stream-modal-title">
                        <span className={`live-dot ${isStreaming ? 'streaming' : 'idle'}`}></span>
                        <h2>LIVE // {hostname}</h2>
                        {isStreaming && (
                            <span className="uptime-badge" title="Active stream session duration">
                                {elapsedTimeStr}
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
                                className="act-pill-btn start"
                                onClick={() => onToggleStream?.(hostname, false)}
                                title="Start Stream"
                            >
                                START
                            </button>
                        ) : !confirmStop ? (
                            <button
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
                                    className="confirm-btn yes"
                                    onClick={() => {
                                        onToggleStream?.(hostname, true);
                                        setConfirmStop(false);
                                    }}
                                >
                                    YES
                                </button>
                                <button
                                    className="confirm-btn no"
                                    onClick={() => setConfirmStop(false)}
                                >
                                    NO
                                </button>
                            </div>
                        )}

                        <button
                            className="act-pill-btn"
                            onClick={() => onQuickBookmark?.(hostname)}
                            title="Add Bookmark"
                        >
                            BM
                        </button>

                        <button
                            className="act-pill-btn"
                            onClick={() => onQuickPlayback?.(hostname)}
                            title="Open Playback"
                        >
                            PLAY
                        </button>

                        <button
                            className="act-pill-btn"
                            onClick={() => onQuickExport?.(hostname)}
                            title="Export Video Segment"
                        >
                            EXP
                        </button>

                        <button
                            className="act-pill-btn inspect"
                            onClick={() => {
                                onClose();
                                onOpenInspector?.();
                            }}
                            title="Open Station Inspector Drawer"
                        >
                            INSPECT ↗
                        </button>
                    </div>

                    <button onClick={onClose} className="stream-modal-close-btn" title="Close (ESC)">
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
                        showControls={true}
                        onPlaying={() => setIsVideoPlaying(true)}
                    />
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}