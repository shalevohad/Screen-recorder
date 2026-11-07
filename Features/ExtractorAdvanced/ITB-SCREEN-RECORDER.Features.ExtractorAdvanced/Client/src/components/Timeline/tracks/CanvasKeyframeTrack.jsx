// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/tracks/CanvasKeyframeTrack.jsx
// Visual Layout Keyframes Track on Timeline (Minimalist 26px Sleek Design & Draggable Keyframes)
// ==========================================
import React, { useMemo, useState } from 'react';
import { formatTimelineClock } from '../../../utils/timeFormat.js';
import './CanvasKeyframeTrack.scss';

export default function CanvasKeyframeTrack({
    canvasLayoutTimeline,
    activeKfIndex = 0,
    onSelectKeyframe,
    onAddKeyframeAtEpoch,
    onDeleteKeyframe,
    onUpdateKeyframeEpoch,
    onUpdateKeyframeTransition,
    viewportStartMs = 0,
    viewportDurationMs = 3600000,
    baseEpochMs = 0,
    totalDurationMs = 3600000,
    playheadMs = 0,
    inPointMs = 0,
    outPointMs = 3600000,
    timeMode = 'LOCAL'
}) {
    const keyframes = useMemo(() => {
        return canvasLayoutTimeline?.keyframes || [];
    }, [canvasLayoutTimeline]);

    const [draggingKf, setDraggingKf] = useState(null);
    const [selectedConfigKfIndex, setSelectedConfigKfIndex] = useState(null);

    React.useEffect(() => {
        if (selectedConfigKfIndex === null) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedConfigKfIndex(null);
        };
        const handleClickOutside = (e) => {
            if (!e.target.closest('.kf-inspector-popover') && !e.target.closest('.kf-marker-diamond')) {
                setSelectedConfigKfIndex(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedConfigKfIndex]); // { idx, startClientX, initialEpoch, currentEpoch }

    const playheadEpoch = baseEpochMs + playheadMs;
    const vpStartEpoch = baseEpochMs + viewportStartMs;
    const vpEndEpoch = vpStartEpoch + viewportDurationMs;

    // Track surface click to add keyframe
    const handleTrackClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const pct = Math.max(0, Math.min(1, clickX / rect.width));
        const clickEpoch = Math.round(vpStartEpoch + pct * viewportDurationMs);
        if (onAddKeyframeAtEpoch) {
            onAddKeyframeAtEpoch(clickEpoch);
        }
    };

    const handleMouseDownMarker = (e, idx, kf) => {
        if (e.button !== 0) return;
        e.stopPropagation();
        e.preventDefault();

        const startClientX = e.clientX;
        const initialEpoch = kf.timestampEpochMs;
        const kfId = kf.id || `kf_${idx}_${initialEpoch}`;
        const surfaceEl = e.currentTarget.closest('.track-surface');
        if (!surfaceEl) return;

        let hasMoved = false;

        setDraggingKf({
            idx,
            kfId,
            startClientX,
            initialEpoch,
            currentEpoch: initialEpoch
        });

        const handleMouseMove = (moveEv) => {
            const dx = moveEv.clientX - startClientX;
            if (Math.abs(dx) > 3) hasMoved = true;

            const rect = surfaceEl.getBoundingClientRect();
            const deltaMs = (dx / rect.width) * viewportDurationMs;
            let targetEpoch = Math.round(initialEpoch + deltaMs);

            // Clamp within timeline range
            targetEpoch = Math.max(baseEpochMs, Math.min(baseEpochMs + totalDurationMs, targetEpoch));

            // Magnetic snap to Playhead, Cut Start (In Point), and Cut End (Out Point)
            const inEpoch = baseEpochMs + inPointMs;
            const outEpoch = baseEpochMs + outPointMs;
            const snapToleranceMs = (14 / rect.width) * viewportDurationMs;

            if (Math.abs(targetEpoch - playheadEpoch) <= snapToleranceMs) {
                targetEpoch = playheadEpoch;
            } else if (Math.abs(targetEpoch - inEpoch) <= snapToleranceMs) {
                targetEpoch = inEpoch;
            } else if (Math.abs(targetEpoch - outEpoch) <= snapToleranceMs) {
                targetEpoch = outEpoch;
            }

            setDraggingKf(prev => prev ? { ...prev, currentEpoch: targetEpoch } : null);
        };

        const handleMouseUp = (upEv) => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            setDraggingKf(null);

            const rect = surfaceEl.getBoundingClientRect();
            const dx = upEv.clientX - startClientX;
            const deltaMs = (dx / rect.width) * viewportDurationMs;
            let finalEpoch = Math.round(initialEpoch + deltaMs);
            finalEpoch = Math.max(baseEpochMs, Math.min(baseEpochMs + totalDurationMs, finalEpoch));

            const inEpoch = baseEpochMs + inPointMs;
            const outEpoch = baseEpochMs + outPointMs;
            const snapToleranceMs = (14 / rect.width) * viewportDurationMs;

            if (Math.abs(finalEpoch - playheadEpoch) <= snapToleranceMs) {
                finalEpoch = playheadEpoch;
            } else if (Math.abs(finalEpoch - inEpoch) <= snapToleranceMs) {
                finalEpoch = inEpoch;
            } else if (Math.abs(finalEpoch - outEpoch) <= snapToleranceMs) {
                finalEpoch = outEpoch;
            }

            if (hasMoved) {
                if (onUpdateKeyframeEpoch) {
                    onUpdateKeyframeEpoch(kfId, finalEpoch);
                }
                if (onSelectKeyframe) {
                    onSelectKeyframe(idx, finalEpoch);
                }
            } else {
                if (onSelectKeyframe) {
                    onSelectKeyframe(idx, initialEpoch);
                }
                setSelectedConfigKfIndex(prev => prev === idx ? null : idx);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className={`canvas-keyframe-track-row ${selectedConfigKfIndex !== null ? 'has-active-popover' : ''}`}>
            {/* Minimalist 180px Header matching DirectorTrack */}
            <div className="track-header-cell">
                <span className="track-icon">❖</span>
                <span className="track-title">LAYOUT</span>
                <span className="kf-count-pill">{keyframes.length} KF</span>
                <button
                    type="button"
                    className="btn-add-kf-track"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onAddKeyframeAtEpoch) onAddKeyframeAtEpoch(playheadEpoch);
                    }}
                    title="Add layout keyframe at playhead position (+)"
                >
                    + KF
                </button>
            </div>

            {/* Draggable Surface */}
            <div
                className="track-surface"
                onClick={handleTrackClick}
                title="Click anywhere to insert a layout keyframe at timestamp"
            >
                <div className="track-grid-lines" />

                {keyframes.map((kf, idx) => {
                    const isThisDragging = draggingKf?.idx === idx;
                    const epoch = isThisDragging ? draggingKf.currentEpoch : kf.timestampEpochMs;
                    if (epoch < vpStartEpoch - 50000 || epoch > vpEndEpoch + 50000) return null;

                    const leftPct = ((epoch - vpStartEpoch) / viewportDurationMs) * 100;
                    if (leftPct < -2 || leftPct > 102) return null;

                    const isActive = idx === activeKfIndex;
                    const isPopoverOpen = selectedConfigKfIndex === idx && !isThisDragging;
                    const isNearLeft = leftPct < 15;
                    const isNearRight = leftPct > 85;
                    const popoverAlignClass = isNearLeft ? 'align-left' : (isNearRight ? 'align-right' : 'align-center');
                    const clockStr = formatTimelineClock(epoch, timeMode, { includeSeconds: true });
                    const transLabel = `${kf.transitionType || 'smooth'} (${kf.transitionDurationSec ?? 0.5}s)`;
                    const offsetSec = Math.max(0, (epoch - baseEpochMs) / 1000).toFixed(1);

                    return (
                        <div
                            key={`kf-${idx}`}
                            className={`kf-marker-diamond ${isActive ? 'is-active' : ''} ${isThisDragging ? 'is-dragging' : ''} ${isPopoverOpen ? 'has-active-popover' : ''}`}
                            style={{ left: `${leftPct}%` }}
                            onMouseDown={(e) => handleMouseDownMarker(e, idx, kf)}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (keyframes.length > 1 && onDeleteKeyframe) {
                                    onDeleteKeyframe(idx);
                                }
                            }}
                            title={`Keyframe #${idx + 1} at ${clockStr} (+${offsetSec}s) • ${transLabel}\nDrag: Reposition timestamp • Click: Seek • Right-click: Delete`}
                        >
                            <div className="diamond-shape">❖</div>
                            {isThisDragging && (
                                <div className="diamond-drag-tooltip">
                                    <span>{clockStr}</span>
                                    <span className="tooltip-sub">+{offsetSec}s</span>
                                </div>
                            )}
                            {isPopoverOpen && (
                                <div
                                    className={`kf-inspector-popover ${popoverAlignClass}`}
                                    onClick={(e) => e.stopPropagation()}
                                    onMouseDown={(e) => e.stopPropagation()}
                                >
                                    <div className="kf-popover-header">
                                        <span className="kf-badge">💎 KEYFRAME #{idx + 1}</span>
                                        <span className="kf-clock">{clockStr}</span>
                                        <button
                                            type="button"
                                            className="btn-kf-popover-close"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedConfigKfIndex(null);
                                            }}
                                            title="Close"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    {idx > 0 ? (
                                        <div className="kf-popover-body">
                                            <div className="kf-field-row">
                                                <span className="kf-field-label">TRANSITION</span>
                                                <div className="kf-trans-buttons">
                                                    <button
                                                        type="button"
                                                        className={`btn-trans-choice ${(kf.transitionType || 'smooth') === 'smooth' ? 'is-active' : ''}`}
                                                        onClick={() => onUpdateKeyframeTransition?.(idx, { transitionType: 'smooth' })}
                                                        title="Smooth Bezier transition into keyframe layout"
                                                    >
                                                        ⚡ Smooth
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={`btn-trans-choice ${kf.transitionType === 'linear' ? 'is-active' : ''}`}
                                                        onClick={() => onUpdateKeyframeTransition?.(idx, { transitionType: 'linear' })}
                                                        title="Linear transition into keyframe layout"
                                                    >
                                                        ↗ Linear
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={`btn-trans-choice ${kf.transitionType === 'cut' ? 'is-active' : ''}`}
                                                        onClick={() => onUpdateKeyframeTransition?.(idx, { transitionType: 'cut' })}
                                                        title="Instant cut into keyframe layout"
                                                    >
                                                        ✂ Cut
                                                    </button>
                                                </div>
                                            </div>

                                            {kf.transitionType !== 'cut' && (
                                                <div className="kf-field-row">
                                                    <span className="kf-field-label">DURATION</span>
                                                    <div className="kf-dur-buttons">
                                                        {[0.2, 0.5, 1.0, 1.5, 2.0].map(sec => (
                                                            <button
                                                                key={sec}
                                                                type="button"
                                                                className={`btn-dur-choice ${(kf.transitionDurationSec ?? 0.5) === sec ? 'is-active' : ''}`}
                                                                onClick={() => onUpdateKeyframeTransition?.(idx, { transitionDurationSec: sec })}
                                                            >
                                                                {sec}s
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="kf-popover-footer">
                                                <button
                                                    type="button"
                                                    className="btn-kf-delete"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (onDeleteKeyframe) onDeleteKeyframe(idx);
                                                        setSelectedConfigKfIndex(null);
                                                    }}
                                                    title="Delete this keyframe"
                                                >
                                                    🗑️ Delete Keyframe
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="kf-popover-body">
                                            <span className="kf-root-notice">Root Origin Keyframe (Base layout at timeline origin)</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
