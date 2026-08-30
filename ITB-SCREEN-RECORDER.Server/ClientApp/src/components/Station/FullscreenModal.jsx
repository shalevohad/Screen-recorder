import { useEffect, useRef, useState } from 'react';
import WebRTCPlayer from '../Player/WebRTCPlayer';
import CyberLoadingOverlay from '../UI/CyberLoadingOverlay';
import CategoryMetricBars from './CategoryMetricBars';
import './FullscreenModal.scss';

export default function FullscreenModal({
    hostname,
    webrtcBaseUrl,
    actualFps = 0,
    internalCaptureFps = 0,
    droppedFrames = 0,
    qosTier = 3,

    hostCpuPct = 0,
    processCpuPct = 0,
    gpu3dPct = 0,
    gpuNvencPct = 0,
    mediaTxMbps = 0,
    netTotalTxMbps = 0,
    nicUtilizationPct = 0,
    telemetryTxKbps = 0,
    ramAvg = 0,
    processRamMb = 0,
    hostTotalRamMb = 0,

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
            <div ref={modalBoxRef} className="stream-modal-box" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="stream-modal-header" style={{ flexWrap: 'wrap', gap: '15px' }}>
                    <div className="stream-modal-title">
                        <span className="live-dot"></span>
                        <h2>LIVE // {hostname}</h2>
                    </div>

                    <div className="modal-network-stats">
                        <div className="modal-stat-box">
                            <div className="modal-stat-header"><span>FPS</span></div>
                            <span className="modal-stat-value green">{actualFps}</span>
                        </div>
                        <div className="modal-stat-box">
                            <div className="modal-stat-header"><span>DROP</span></div>
                            <span className={`modal-stat-value ${droppedFrames > 0 ? 'red' : 'gray'}`}>{droppedFrames}</span>
                        </div>
                        <div className="modal-stat-box">
                            <div className="modal-stat-header"><span>CPU (App/Host)</span></div>
                            <span className="modal-stat-value yellow">{Number(processCpuPct).toFixed(1)}% / {Number(hostCpuPct).toFixed(1)}%</span>
                        </div>
                        <div className="modal-stat-box">
                            <div className="modal-stat-header"><span>NVENC</span></div>
                            <span className="modal-stat-value yellow">{Number(gpuNvencPct).toFixed(1)}%</span>
                        </div>
                        <div className="modal-stat-box" style={{ minWidth: '80px' }}>
                            <div className="modal-stat-header"><span>VBR Mbps</span></div>
                            <span className="modal-stat-value blue">{Number(mediaTxMbps).toFixed(2)}</span>
                        </div>
                        <div className="modal-stat-box" style={{ minWidth: '80px' }}>
                            <div className="modal-stat-header"><span>C2 Kbps</span></div>
                            <span className="modal-stat-value" style={{ color: '#a855f7' }}>{Number(telemetryTxKbps).toFixed(1)}</span>
                        </div>
                    </div>

                    <button onClick={onClose} className="stream-modal-close-btn" title="Close (ESC)">
                        ✕
                    </button>
                </div>

                {/* שילוב פסי הקטגוריות המודולריים במודל */}
                <div style={{ padding: '10px 20px', background: '#020617', borderBottom: '1px solid #1e293b' }}>
                    <CategoryMetricBars
                        hostCpuPct={hostCpuPct}
                        processCpuPct={processCpuPct}
                        gpu3dPct={gpu3dPct}
                        gpuNvencPct={gpuNvencPct}
                        mediaTxMbps={mediaTxMbps}
                        netTotalTxMbps={netTotalTxMbps}
                        ramAvg={ramAvg}
                        processRamMb={processRamMb}
                        hostTotalRamMb={hostTotalRamMb}
                    />
                </div>

                <div className="stream-modal-body" style={{ flexGrow: 1, position: 'relative', backgroundColor: '#000' }}>
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