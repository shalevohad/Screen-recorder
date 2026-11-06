// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Modals/ExportOptionsModal.jsx
// ==========================================
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './ExportOptionsModal.scss';
import { formatClockPositionLabel } from '../../utils/clockPositionStore.js';

export default function ExportOptionsModal({
    isOpen,
    onClose,
    onConfirm,
    compositionSummary = {},
    title = 'MASTER MP4 EXPORT CONFIRMATION'
}) {
    const canvasW = compositionSummary.canvasWidth || 2560;
    const canvasH = compositionSummary.canvasHeight || 1440;
    const aspect = canvasW / canvasH;
    const resolutionTier = compositionSummary.resolution || '2K';

    let aspectLabel;
    if (Math.abs(aspect - (16 / 9)) < 0.05) aspectLabel = '16:9 Broadcast';
    else if (Math.abs(aspect - (16 / 10)) < 0.05) aspectLabel = '16:10 WUXGA / WQXGA';
    else if (Math.abs(aspect - (19 / 10)) < 0.05) aspectLabel = '19:10 NOC Extended';
    else if (Math.abs(aspect - (32 / 9)) < 0.15) aspectLabel = '32:9 Dual Screen';
    else if (Math.abs(aspect - (21 / 9)) < 0.15) aspectLabel = '21:9 Ultrawide';
    else if (Math.abs(aspect - (4 / 3)) < 0.15) aspectLabel = '4:3 Standard';
    else aspectLabel = `${Math.round(aspect * 100) / 100}:1 Custom`;



    const calcBitrateStr = (w, h) => {
        const mbps = Math.round((((w * h) / (1920 * 1080)) * 6.0) * 10) / 10;
        const mbPerMin = Math.round((mbps * 60 / 8) * 10) / 10;
        return `~${mbps} Mbps (~${mbPerMin} MB/min)`;
    };

    const bitrateStr = calcBitrateStr(canvasW, canvasH);

    const [keystrokeMode, setKeystrokeMode] = useState('BurnIn');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = async () => {
        setIsSubmitting(true);
        try {
            await onConfirm(keystrokeMode, resolutionTier, notes);
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    const layoutLabel = (compositionSummary.layout || 'DIRECTOR').toUpperCase();
    const stationsCount = compositionSummary.stationsCount || 1;
    const audioRoutingCount = compositionSummary.audioSegmentsCount || 1;

    return createPortal(
        <div className="itb-export-modal-backdrop" onClick={onClose} dir="ltr">
            <div className="itb-export-modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="header-title">
                        <span className="dot" />
                        <h3>{title}</h3>
                    </div>
                    <button type="button" className="btn-close" onClick={onClose}>✕</button>
                </div>

                <div className="modal-body">
                    {/* Master MP4 Format Banner */}
                    <div className="summary-banner master-mp4-badge">
                        <div className="banner-icon">🎬</div>
                        <div className="banner-details">
                            <div className="banner-title">UNIVERSAL MASTER MP4 OUTPUT</div>
                            <div className="banner-desc">
                                Slices, aligns, and composes all active channels into a <strong>single standalone MP4 file</strong>. Plays seamlessly in VLC, browsers, and forensic viewers with zero external player dependencies.
                            </div>
                        </div>
                    </div>

                    {/* Composition & Audio Routing Summary */}
                    <div className="composition-summary-card">
                        <div className="summary-row">
                            <span className="label">VISUAL COMPOSITION:</span>
                            <span className="value highlight">
                                MASTER CANVAS [{layoutLabel}] (WYSIWYG {aspectLabel})
                            </span>
                        </div>
                        <div className="summary-row">
                            <span className="label">CANVAS GEOMETRY:</span>
                            <span className="value">{canvasW} × {canvasH} (Ratio {aspect.toFixed(2)}:1)</span>
                        </div>
                        <div className="summary-row">
                            <span className="label">TARGET RESOLUTION:</span>
                            <span className="value highlight">
                                {canvasW} × {canvasH} ({resolutionTier} • WYSIWYG MATCH)
                            </span>
                        </div>
                        <div className="summary-row">
                            <span className="label">ESTIMATED BITRATE:</span>
                            <span className="value">{bitrateStr}</span>
                        </div>
                        <div className="summary-row">
                            <span className="label">ACTIVE STATIONS:</span>
                            <span className="value">{stationsCount} WORKSTATION{stationsCount > 1 ? 'S' : ''}</span>
                        </div>
                        <div className="summary-row">
                            <span className="label">AUDIO MASTER MIX:</span>
                            <span className="value">
                                {audioRoutingCount > 1 ? `DYNAMIC ROUTING (${audioRoutingCount} SEGMENTS)` : 'PRIMARY CHANNEL AUDIO'}
                            </span>
                        </div>
                        {compositionSummary.isAutoDirectorEnabled && (
                            <div className="summary-row">
                                <span className="label">AUTO-DIRECTOR:</span>
                                <span className="value enabled">ENABLED (SEAMLESS 150ms DIP-TO-BLACK & DISPLAY TOPOLOGY HUD)</span>
                            </div>
                        )}
                        <div className="summary-row">
                            <span className="label">UTC WALL CLOCK:</span>
                            <span className="value enabled">PERMANENT (BURNED-IN AT {formatClockPositionLabel((typeof localStorage !== 'undefined' && localStorage.getItem('itb_canvas_utc_clock_pos')) || 'top-right')})</span>
                        </div>
                    </div>

                    {/* Locked WYSIWYG Canvas Resolution & Quality Specification */}
                    <div className="options-title">CANVAS EXPORT SPECIFICATION (WYSIWYG 1:1)</div>
                    <div className="locked-resolution-banner">
                        <div className="locked-res-header">
                            <div className="locked-res-badge">
                                <span className="lock-icon">🔒</span>
                                <span className="badge-text">{canvasW} × {canvasH} ({resolutionTier} • {aspectLabel})</span>
                            </div>
                            <div className="locked-res-metric">{bitrateStr}</div>
                        </div>
                        <div className="locked-res-desc">
                            Exact 1:1 WYSIWYG canvas rendering locked from workspace. Pre-configured canvas geometry, multi-screen tiles, typography, and UTC clock overlay export with zero distortion or scaling artifacts.
                        </div>
                    </div>

                    {/* Keystroke Presentation Selection */}
                    <div className="options-title">SELECT KEYSTROKE PRESENTATION</div>
                    <div className="modes-grid">
                        <label className={`mode-card ${keystrokeMode === 'BurnIn' ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="keystrokeMode"
                                value="BurnIn"
                                checked={keystrokeMode === 'BurnIn'}
                                onChange={() => setKeystrokeMode('BurnIn')}
                            />
                            <div className="mode-content">
                                <div className="mode-name">HARD BURN-IN (IN-PLACE ON VIDEO)</div>
                                <div className="mode-desc">
                                    Permanently bakes keystrokes directly onto the video pixels at the exact coordinate position of each screen for unalterable forensic evidence.
                                </div>
                            </div>
                        </label>

                        <label className={`mode-card ${keystrokeMode === 'None' ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="keystrokeMode"
                                value="None"
                                checked={keystrokeMode === 'None'}
                                onChange={() => setKeystrokeMode('None')}
                            />
                            <div className="mode-content">
                                <div className="mode-name">NONE (CLEAN MASTER VIDEO)</div>
                                <div className="mode-desc">
                                    Export master video cleanly without any on-screen keystroke overlays.
                                </div>
                            </div>
                        </label>
                    </div>

                    {/* Mission / Operational Export Notes */}
                    <div className="options-title">MISSION / FORENSIC EXPORT NOTE (OPTIONAL)</div>
                    <div className="export-notes-wrapper">
                        <textarea
                            className="export-notes-input"
                            placeholder="Add operational notes or investigation context for team members (e.g. Incident #104 review, Shift handover)..."
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
                        {isSubmitting ? 'ENQUEUING MASTER EXPORT...' : `CONFIRM & EXPORT MASTER MP4 (${canvasW}×${canvasH})`}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
