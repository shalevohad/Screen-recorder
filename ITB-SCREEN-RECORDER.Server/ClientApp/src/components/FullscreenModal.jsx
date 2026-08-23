import { useEffect, useRef } from 'react';
import WebRTCPlayer from './WebRTCPlayer';
import '../styles/FullscreenModal.css';

// מקבל כעת את webrtcBaseUrl במקום את hlsUrl מהקומפוננטת אב
export default function FullscreenModal({ hostname, webrtcBaseUrl, onClose }) {
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
                        <h2>LIVE MONITOR // {hostname}</h2>
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