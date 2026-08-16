import React, { useEffect, useRef } from 'react';
import VideoPlayer from './VideoPlayer';
import '../styles/FullscreenModal.css';

export default function FullscreenModal({ hostname, hlsUrl, onClose }) {
    const modalBoxRef = useRef(null);

    // סגירה בלחיצה על מקש ESC
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // סגירה בלחיצה מחוץ למסגרת הוידאו
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
                // כפייה ישירה ועקיפת כל קבצי ה-CSS
                backgroundColor: 'rgba(255, 255, 255, 0.15)', // רקע לבן חלבי
                backdropFilter: 'blur(15px)',                 // טשטוש עוצמתי
                WebkitBackdropFilter: 'blur(15px)',           // תאימות מורחבת
                transform: 'translateZ(0)'                    // 🚀 מכריח את ה-GPU לרנדר את הטשטוש!
            }}
        >
            <div ref={modalBoxRef} className="stream-modal-box">
                {/* Header */}
                <div className="stream-modal-header">
                    <div className="stream-modal-title">
                        <span className="live-dot"></span>
                        <h2>LIVE MONITOR // {hostname}</h2>
                    </div>
                    <button onClick={onClose} className="stream-modal-close-btn" title="Close (ESC)">
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="stream-modal-body">
                    <VideoPlayer hlsUrl={hlsUrl} hostname={hostname} />
                </div>
            </div>
        </div>
    );
}