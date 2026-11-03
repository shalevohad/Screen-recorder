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
    const canvasW = compositionSummary.canvasWidth || 1920;
    const canvasH = compositionSummary.canvasHeight || 1080;
    const aspect = canvasW / canvasH;

    let aspectLabel;
    if (Math.abs(aspect - (32 / 9)) < 0.15) aspectLabel = '32:9 Dual Screen';
    else if (Math.abs(aspect - (21 / 9)) < 0.15) aspectLabel = '21:9 Ultrawide';
    else if (Math.abs(aspect - (16 / 10)) < 0.15) aspectLabel = '16:10 WUXGA';
    else if (Math.abs(aspect - (4 / 3)) < 0.15) aspectLabel = '4:3 Standard';
    else if (Math.abs(aspect - (16 / 9)) < 0.15) aspectLabel = '16:9 Broadcast';
    else aspectLabel = `${Math.round(aspect * 100) / 100}:1 Custom`;

    const calcWidth = (h) => {
        const w = Math.round(h * aspect);
        return w - (w % 2);
    };

    const calcBitrateStr = (w, h) => {
        const mbps = Math.round((((w * h) / (1920 * 1080)) * 6.0) * 10) / 10;
        const mbPerMin = Math.round((mbps * 60 / 8) * 10) / 10;
        return `~${mbps} Mbps (~${mbPerMin} MB/min)`;
    };

    const qualityTiers = [
        {
            id: 'NATIVE',
            badge: `Native 1:1 (${canvasW}×${canvasH})`,
            res: `${canvasW} × ${canvasH}`,
            bitrate: calcBitrateStr(canvasW, canvasH),
            desc: `Exact 1:1 canvas match (Recommended). Preserves original recorded pixel fidelity without scaling or distortion.`
        },
        {
            id: '4K',
            badge: `4K UHD (${calcWidth(2160)}×2160)`,
            res: `${calcWidth(2160)} × 2160`,
            bitrate: calcBitrateStr(calcWidth(2160), 2160),
            desc: `Maximum resolution. Uncompromised multi-monitor canvas clarity for NOC video walls.`
        },
        {
            id: '2K',
            badge: `2K QHD (${calcWidth(1440)}×1440)`,
            res: `${calcWidth(1440)} × 1440`,
            bitrate: calcBitrateStr(calcWidth(1440), 1440),
            desc: `High pixel density. Preserves small fonts, HUD telemetry, and detailed application windows.`
        },
        {
            id: 'HD',
            badge: `HD 720p (${calcWidth(720)}×720)`,
            res: `${calcWidth(720)} × 720`,
            bitrate: calcBitrateStr(calcWidth(720), 720),
            desc: `Compact file size, rapid export. Ideal for low-bandwidth operational networks or fast triage.`
        }
    ];

    const [keystrokeMode, setKeystrokeMode] = useState('BurnIn');
    const [resolution, setResolution] = useState(compositionSummary.resolution || 'NATIVE');
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

    const currentTier = qualityTiers.find(t => t.id === resolution) || qualityTiers[0];

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
                        {isSubmitting ? 'ENQUEUING MASTER EXPORT...' : `CONFIRM & EXPORT MASTER MP4 (${currentTier.res})`}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
