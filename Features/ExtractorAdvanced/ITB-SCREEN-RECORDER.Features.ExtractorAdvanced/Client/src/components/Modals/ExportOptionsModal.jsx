// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Modals/ExportOptionsModal.jsx
// ==========================================
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './ExportOptionsModal.scss';

export default function ExportOptionsModal({
    isOpen,
    onClose,
    onConfirm,
    compositionSummary = {},
    title = 'MASTER MP4 EXPORT CONFIRMATION'
}) {
    const [keystrokeMode, setKeystrokeMode] = useState('BurnIn');
    const [resolution, setResolution] = useState(compositionSummary.resolution || 'FHD');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = async () => {
        setIsSubmitting(true);
        try {
            await onConfirm(keystrokeMode, resolution);
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    const layoutLabel = (compositionSummary.layout || 'DIRECTOR').toUpperCase();
    const stationsCount = compositionSummary.stationsCount || 1;
    const audioRoutingCount = compositionSummary.audioSegmentsCount || 1;

    const qualityTiers = [
        {
            id: 'HD',
            badge: 'HD 720p',
            res: '1280 × 720',
            bitrate: '~2.5 Mbps (~18 MB/min)',
            desc: 'Compact file size, rapid export. Ideal for low-bandwidth networks or rapid review.'
        },
        {
            id: 'FHD',
            badge: 'FHD 1080p',
            res: '1920 × 1080',
            bitrate: '~6.0 Mbps (~45 MB/min)',
            desc: 'Standard high-fidelity master output (Recommended). Balanced clarity and size.'
        },
        {
            id: '2K',
            badge: '2K QHD 1440p',
            res: '2560 × 1440',
            bitrate: '~12.0 Mbps (~90 MB/min)',
            desc: 'High pixel density. Preserves small fonts, HUD telemetry, and complex multi-window feeds.'
        },
        {
            id: '4K',
            badge: '4K UHD 2160p',
            res: '3840 × 2160',
            bitrate: '~24.0 Mbps (~180 MB/min)',
            desc: 'Maximum resolution. Uncompromised multi-monitor canvas clarity for video walls.'
        }
    ];

    const currentTier = qualityTiers.find(t => t.id === resolution) || qualityTiers[1];

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
                                MASTER CANVAS [{layoutLabel}] (WYSIWYG 16:9)
                            </span>
                        </div>
                        <div className="summary-row">
                            <span className="label">TARGET RESOLUTION:</span>
                            <span className="value highlight">
                                {currentTier.res} ({currentTier.badge})
                            </span>
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
                                <span className="value enabled">ENABLED (SEAMLESS 150ms DIP-TO-BLACK TRANSITIONS)</span>
                            </div>
                        )}
                    </div>

                    {/* Target Resolution & Quality Selection */}
                    <div className="options-title">SELECT EXPORT QUALITY & RESOLUTION</div>
                    <div className="quality-grid">
                        {qualityTiers.map((tier) => (
                            <label key={tier.id} className={`quality-card ${resolution === tier.id ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    name="videoQuality"
                                    value={tier.id}
                                    checked={resolution === tier.id}
                                    onChange={() => setResolution(tier.id)}
                                />
                                <div className="quality-card-body">
                                    <div className="quality-card-header">
                                        <span className="quality-badge">{tier.badge}</span>
                                        <span className="quality-res">{tier.res}</span>
                                    </div>
                                    <div className="quality-metric">{tier.bitrate}</div>
                                    <div className="quality-desc">{tier.desc}</div>
                                </div>
                            </label>
                        ))}
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
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn-cancel" onClick={onClose} disabled={isSubmitting}>
                        CANCEL
                    </button>
                    <button type="button" className="btn-confirm" onClick={handleConfirm} disabled={isSubmitting}>
                        {isSubmitting ? 'ENQUEUING MASTER EXPORT...' : `CONFIRM & EXPORT MASTER MP4 (${currentTier.badge})`}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
