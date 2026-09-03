import { useEffect, useRef, useState } from 'react';
import WebRTCPlayer from '../Player/WebRTCPlayer';
import CyberLoadingOverlay from '../UI/CyberLoadingOverlay';
import './FullscreenModal.scss';

// הלינטר תוקן: הוסרו 9 משתני הטלמטריה שלא הודפסו בפועל
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
    onClose
}) {
    const modalBoxRef = useRef(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleBackdropClick = (e) => {
        if (modalBoxRef.current && !modalBoxRef.current.contains(e.target)) {
            onClose();
        }
    };

    return (
        <div
            className="stream-modal-backdrop"
            onClick={handleBackdropClick}
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                transform: 'translateZ(0)',
                zIndex: 9999
            }}
        >
            <div ref={modalBoxRef} className="stream-modal-box">

                <div className="stream-modal-header">
                    <div className="stream-modal-title">
                        <span className="live-dot"></span>
                        <h2>LIVE // {hostname}</h2>
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
                        <div
                            style={{ position: 'absolute', inset: 0, zIndex: 10 }}
                            onAnimationEnd={() => { }}
                        >
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
}