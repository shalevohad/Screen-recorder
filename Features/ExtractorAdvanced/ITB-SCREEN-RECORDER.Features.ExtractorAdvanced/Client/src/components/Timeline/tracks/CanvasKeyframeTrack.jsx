// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/tracks/CanvasKeyframeTrack.jsx
// Visual Layout Keyframes Track on Timeline
// ==========================================
import React, { useMemo } from 'react';
import { formatTimelineClock } from '../../../utils/timeFormat.js';
import './CanvasKeyframeTrack.scss';

export default function CanvasKeyframeTrack({
    canvasLayoutTimeline,
    activeKfIndex = 0,
    onSelectKeyframe,
    onAddKeyframeAtEpoch,
    onDeleteKeyframe,
    viewportStartMs = 0,
    viewportDurationMs = 3600000,
    baseEpochMs = 0,
    playheadMs = 0,
    timeMode = 'LOCAL'
}) {
    const keyframes = useMemo(() => {
        return canvasLayoutTimeline?.keyframes || [];
    }, [canvasLayoutTimeline]);

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

    const currentKf = keyframes[activeKfIndex] || keyframes[0] || null;

    return (
        <div className="canvas-keyframe-track-row">
            <div className="track-header-cell">
                <div className="header-meta">
                    <span className="track-icon">🎛️</span>
                    <span className="track-title">LAYOUT TIMELINE</span>
                    <span className="kf-count-pill">{keyframes.length} KF{keyframes.length !== 1 ? 'S' : ''}</span>
                </div>
                <div className="header-sub">
                    {currentKf ? (
                        <span className="active-trans-badge">
                            {currentKf.transitionType || 'smooth'} ({currentKf.transitionDurationSec ?? 0.5}s)
                        </span>
                    ) : (
                        <span className="active-trans-badge">AUTO-GRID</span>
                    )}
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
            </div>

            <div
                className="track-surface"
                onClick={handleTrackClick}
                title="Click anywhere to insert a layout keyframe at timestamp"
            >
                <div className="track-grid-lines" />

                {keyframes.map((kf, idx) => {
                    const epoch = kf.timestampEpochMs;
                    if (epoch < vpStartEpoch - 50000 || epoch > vpEndEpoch + 50000) return null;

                    const leftPct = ((epoch - vpStartEpoch) / viewportDurationMs) * 100;
                    if (leftPct < -2 || leftPct > 102) return null;

                    const isActive = idx === activeKfIndex;
                    const clockStr = formatTimelineClock(epoch, timeMode, { includeSeconds: true });
                    const transLabel = `${kf.transitionType || 'smooth'} (${kf.transitionDurationSec ?? 0.5}s)`;

                    return (
                        <div
                            key={`kf-${epoch}-${idx}`}
                            className={`kf-marker-diamond ${isActive ? 'is-active' : ''}`}
                            style={{ left: `${leftPct}%` }}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onSelectKeyframe) onSelectKeyframe(idx, epoch);
                            }}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (keyframes.length > 1 && onDeleteKeyframe) {
                                    onDeleteKeyframe(idx);
                                }
                            }}
                            title={`Keyframe #${idx + 1} at ${clockStr} • ${transLabel}\nLeft-click: Seek & Edit • Right-click: Delete`}
                        >
                            <div className="diamond-shape">❖</div>
                            <span className="diamond-label">KF {idx + 1}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
