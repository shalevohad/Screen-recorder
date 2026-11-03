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
    viewportStartMs = 0,
    viewportDurationMs = 3600000,
    baseEpochMs = 0,
    totalDurationMs = 3600000,
    playheadMs = 0,
    timeMode = 'LOCAL'
}) {
    const keyframes = useMemo(() => {
        return canvasLayoutTimeline?.keyframes || [];
    }, [canvasLayoutTimeline]);

    const [draggingKf, setDraggingKf] = useState(null); // { idx, startClientX, initialEpoch, currentEpoch }

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
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className="canvas-keyframe-track-row">
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
                    const clockStr = formatTimelineClock(epoch, timeMode, { includeSeconds: true });
                    const transLabel = `${kf.transitionType || 'smooth'} (${kf.transitionDurationSec ?? 0.5}s)`;
                    const offsetSec = Math.max(0, (epoch - baseEpochMs) / 1000).toFixed(1);

                    return (
                        <div
                            key={`kf-${idx}`}
                            className={`kf-marker-diamond ${isActive ? 'is-active' : ''} ${isThisDragging ? 'is-dragging' : ''}`}
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
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
