// ==========================================
// File: Features/Extractor/Client/src/components/Modals/ExportOptionsModal.jsx
// ==========================================
import React, { useState } from 'react';
import './ExportOptionsModal.scss';

export default function ExportOptionsModal({
    isOpen,
    onClose,
    onConfirm,
    title = 'EXPORT CONFIRMATION',
    summaryText = ''
}) {
    const [mode, setMode] = useState('BurnIn');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = async () => {
        setIsSubmitting(true);
        try {
            await onConfirm(mode, notes);
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

                        <label className={`mode-card ${mode === 'BurnIn' ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="keystrokeMode"
                                value="BurnIn"
                                checked={mode === 'BurnIn'}
                                onChange={() => setMode('BurnIn')}
                            />
                            <div className="mode-content">
                                <div className="mode-name">HARD BURN-IN (RECOMMENDED)</div>
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

                    <div className="options-title">MISSION / FORENSIC EXPORT NOTE (OPTIONAL)</div>
                    <div className="export-notes-wrapper">
                        <textarea
                            className="export-notes-input"
                            placeholder="Add operational notes or investigation context for team members..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={2}
                            maxLength={500}
                        />
                        <div className="notes-char-counter">{notes.length} / 500</div>
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