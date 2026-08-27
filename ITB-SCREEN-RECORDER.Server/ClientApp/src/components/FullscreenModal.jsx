import { useEffect, useRef } from 'react';
import WebRTCPlayer from './WebRTCPlayer';
import '../styles/FullscreenModal.scss';

export default function FullscreenModal({
    hostname,
    webrtcBaseUrl,
    actualFps = 0,
    internalCaptureFps = 0,
    droppedFrames = 0,
    qosTier = 3,
    onClose
}) {
    const modalBoxRef = useRef(null);

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
                <div className="stream-modal-header">
                    <div className="stream-modal-title">
                        <span className="live-dot"></span>
                        <h2>LIVE // {hostname}</h2>
                    </div>

                    <div className="modal-network-stats">
                        <div className="modal-stat-box">
                            <div className="modal-stat-header">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
                                <span>FPS</span>
                            </div>
                            <span className="modal-stat-value green">{actualFps}</span>
                        </div>

                        <div className="modal-stat-box">
                            <div className="modal-stat-header">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                                <span>CAP</span>
                            </div>
                            <span className="modal-stat-value yellow">{internalCaptureFps}</span>
                        </div>

                        <div className="modal-stat-box">
                            <div className="modal-stat-header">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                <span>DROP</span>
                            </div>
                            <span className={`modal-stat-value ${droppedFrames > 0 ? 'red' : 'gray'}`}>{droppedFrames}</span>
                        </div>

                        <div className="modal-stat-box">
                            <div className="modal-stat-header">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                                <span>QOS</span>
                            </div>
                            <span className="modal-stat-value blue">T{qosTier}</span>
                        </div>
                    </div>

                    <button onClick={onClose} className="stream-modal-close-btn" title="Close (ESC)">
                        ✕
                    </button>
                </div>

                <div className="stream-modal-body" style={{ flexGrow: 1, position: 'relative', backgroundColor: '#000' }}>
                    <WebRTCPlayer
                        streamPath={`live/${hostname}`}
                        webrtcBaseUrl={webrtcBaseUrl}
                        showControls={true}
                    />
                </div>
            </div>
        </div>
    );
}