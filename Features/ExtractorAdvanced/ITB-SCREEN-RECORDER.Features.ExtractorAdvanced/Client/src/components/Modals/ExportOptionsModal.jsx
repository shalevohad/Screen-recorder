import React, { useState } from 'react';
import './ExportOptionsModal.scss';

export default function ExportOptionsModal({
    isOpen,
    onClose,
    onConfirm,
    title = 'EXPORT CONFIRMATION',
    summaryText = ''
}) {
    const [mode, setMode] = useState('Caption');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = async () => {
        setIsSubmitting(true);
        try {
            await onConfirm(mode);
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="itb-export-modal-backdrop" onClick={onClose}>
            <div className="itb-export-modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="header-title">
                        <span className="dot" />
                        <h3>{title}</h3>
                    </div>
                    <button type="button" className="btn-close" onClick={onClose}>✕</button>
                </div>

                <div className="modal-body">
                    {summaryText && <div className="summary-banner">{summaryText}</div>}

                    <div className="options-title">SELECT KEYSTROKE PRESENTATION</div>

                    <div className="modes-grid">
                        <label className={`mode-card ${mode === 'Caption' ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="keystrokeMode"
                                value="Caption"
                                checked={mode === 'Caption'}
                                onChange={() => setMode('Caption')}
                            />
                            <div className="mode-content">
                                <div className="mode-name">SOFT CAPTIONS (RECOMMENDED)</div>
                                <div className="mode-desc">
                                    Embeds a soft subtitle track (mov_text). Toggable in VLC/Players, keeps video pristine and clean.
                                </div>
                            </div>
                        </label>

                        <label className={`mode-card ${mode === 'BurnIn' ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="keystrokeMode"
                                value="BurnIn"
                                checked={mode === 'BurnIn'}
                                onChange={() => setMode('BurnIn')}
                            />
                            <div className="mode-content">
                                <div className="mode-name">HARD BURN-IN</div>
                                <div className="mode-desc">
                                    Permanently bakes keystrokes directly onto the video pixels for unalterable court evidence.
                                </div>
                            </div>
                        </label>

                        <label className={`mode-card ${mode === 'None' ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="keystrokeMode"
                                value="None"
                                checked={mode === 'None'}
                                onChange={() => setMode('None')}
                            />
                            <div className="mode-content">
                                <div className="mode-name">NONE (CLEAN VIDEO)</div>
                                <div className="mode-desc">
                                    Export video without any keystroke overlays or subtitle tracks.
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn-cancel" onClick={onClose} disabled={isSubmitting}>
                        CANCEL
                    </button>
                    <button type="button" className="btn-confirm" onClick={handleConfirm} disabled={isSubmitting}>
                        {isSubmitting ? 'PREPARING...' : 'CONFIRM & EXPORT'}
                    </button>
                </div>
            </div>
        </div>
    );
}