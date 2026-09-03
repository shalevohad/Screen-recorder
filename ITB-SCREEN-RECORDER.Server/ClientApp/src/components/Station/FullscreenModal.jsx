import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import WebRTCPlayer from '../Player/WebRTCPlayer';
import CyberLoadingOverlay from '../UI/CyberLoadingOverlay';
import './FullscreenModal.scss';

export default function FullscreenModal({
    hostname,
    webrtcBaseUrl,
    actualFps = 0,
    droppedFrames = 0,
    hostCpuPct = 0,
    gpuNvencPct = 0,
    gpu3dPct = 0,
    mediaTxMbps = 0,
    telemetryTxKbps = 0,
    streamingSinceUtc,
    onClose
}) {
    const modalBoxRef = useRef(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // 💡 אתחול ראשוני ללא קריאת setState בתוך effect
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

        if (days > 0) {
            return `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        }
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

    const modalContent = (
        <div className="stream-modal-backdrop" onClick={handleBackdropClick}>
            <div ref={modalBoxRef} className="stream-modal-box">
                <div className="stream-modal-header">
                    <div className="stream-modal-title">
                        <span className="live-dot"></span>
                        <h2>LIVE // {hostname}</h2>
                        <span className="uptime-badge" title="Active stream session duration">{elapsedTimeStr}</span>
                    </div>

                    <div className="modal-network-stats">
                        <span className="stat-pill">FPS <span className="val green">{actualFps}</span></span>
                        <span className="stat-pill">DROP <span className={`val ${droppedFrames > 0 ? 'red' : 'gray'}`}>{droppedFrames}</span></span>
                        <span className="stat-pill">CPU <span className="val yellow">{Number(hostCpuPct).toFixed(1)}%</span></span>
                        <span className="stat-pill">GPU 3D&nbsp;
                            <span className="val yellow">{Number(gpu3dPct).toFixed(1)}%</span>
                            &nbsp;
                            <span className="val yellow">({Number(gpuNvencPct).toFixed(1)}%)</span>
                        </span>
                        <span className="stat-pill">VBR <span className="val blue">{Number(mediaTxMbps).toFixed(2)}</span></span>
                        <span className="stat-pill">C2 <span className="val purple">{Number(telemetryTxKbps).toFixed(1)}</span></span>
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
                        webrtcBaseUrl={webrtcBaseUrl}
                        showControls={true}
                        onPlaying={() => setIsVideoPlaying(true)}
                    />
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}