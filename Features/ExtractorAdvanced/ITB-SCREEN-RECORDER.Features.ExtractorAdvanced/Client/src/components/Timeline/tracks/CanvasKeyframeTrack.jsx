// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/tracks/CanvasKeyframeTrack.jsx
// Visual Layout Keyframes Track on Timeline (Minimalist 26px Sleek Design & Draggable Keyframes)
// Interactive Keyframe Navigation, Step-by-Step Skipping, Quick-Jump Navigator & Detailed Settings
// ==========================================
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { formatTimelineClock } from '../../../utils/timeFormat.js';
import { formatClockPositionLabel } from '../../../utils/clockPositionStore.js';
import './CanvasKeyframeTrack.scss';

export default function CanvasKeyframeTrack({
    canvasLayoutTimeline,
    activeKfIndex = 0,
    onSelectKeyframe,
    onAddKeyframeAtEpoch,
    onDeleteKeyframe,
    onUpdateKeyframeEpoch,
    onUpdateKeyframeTransition,
    onUpdateKeyframeClockPosition,
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
    const [showQuickJumpList, setShowQuickJumpList] = useState(false);

    const playheadEpoch = baseEpochMs + playheadMs;
    const vpStartEpoch = baseEpochMs + viewportStartMs;
    const vpEndEpoch = vpStartEpoch + viewportDurationMs;

    // Direct keyframe jumping & inspection
    const jumpToKeyframe = useCallback((targetIdx) => {
        if (!keyframes || targetIdx < 0 || targetIdx >= keyframes.length) return;
        const targetKf = keyframes[targetIdx];
        if (!targetKf) return;
        if (onSelectKeyframe) {
            onSelectKeyframe(targetIdx, targetKf.timestampEpochMs);
        }
        setSelectedConfigKfIndex(targetIdx);
        setShowQuickJumpList(false);
    }, [keyframes, onSelectKeyframe]);

    // Keyboard Shortcuts: [ or Alt+Left for Prev KF, ] or Alt+Right for Next KF
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
                return;
            }
            if (e.key === '[' || (e.altKey && e.key === 'ArrowLeft')) {
                e.preventDefault();
                if (activeKfIndex > 0) {
                    jumpToKeyframe(activeKfIndex - 1);
                }
            } else if (e.key === ']' || (e.altKey && e.key === 'ArrowRight')) {
                e.preventDefault();
                if (activeKfIndex < keyframes.length - 1) {
                    jumpToKeyframe(activeKfIndex + 1);
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeKfIndex, keyframes, jumpToKeyframe]);

    // Popover outside-click and Escape listeners
    useEffect(() => {
        if (selectedConfigKfIndex === null) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedConfigKfIndex(null);
        };
        const handleClickOutside = (e) => {
            if (!e.target.closest('.kf-inspector-popover') && !e.target.closest('.kf-marker-diamond') && !e.target.closest('.btn-row-settings')) {
                setSelectedConfigKfIndex(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedConfigKfIndex]);

    // Quick-jump dropdown outside-click listener
    useEffect(() => {
        if (!showQuickJumpList) return;
        const handleClickOutside = (e) => {
            if (!e.target.closest('.kf-quick-jump-dropdown') && !e.target.closest('.kf-count-pill')) {
                setShowQuickJumpList(false);
            }
        };
        window.addEventListener('mousedown', handleClickOutside);
        return () => window.removeEventListener('mousedown', handleClickOutside);
    }, [showQuickJumpList]);

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
        <div className={`canvas-keyframe-track-row ${(selectedConfigKfIndex !== null || showQuickJumpList) ? 'has-active-popover' : ''}`}>
            {/* Header Cell with Keyframe Navigation and Jump Controls */}
            <div className="track-header-cell">
                <span className="track-icon">❖</span>
                <span className="track-title">LAYOUT</span>

                {/* Keyframe Jump Controls: Prev / Current Pill / Next */}
                <div className="kf-nav-cluster">
                    <button
                        type="button"
                        className="btn-kf-nav btn-prev-kf"
                        disabled={activeKfIndex <= 0}
                        onClick={(e) => {
                            e.stopPropagation();
                            jumpToKeyframe(activeKfIndex - 1);
                        }}
                        title="Jump to Previous Keyframe ([ or Alt+Left)"
                    >
                        ◀
                    </button>

                    <button
                        type="button"
                        className={`kf-count-pill ${showQuickJumpList ? 'is-active' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowQuickJumpList(p => !p);
                        }}
                        title="Keyframe Navigator: Click to inspect and jump across keyframes"
                    >
                        <span>{keyframes.length > 0 ? `KF ${activeKfIndex + 1}/${keyframes.length}` : '0 KF'}</span>
                        <span className="pill-caret">▾</span>
                    </button>

                    <button
                        type="button"
                        className="btn-kf-nav btn-next-kf"
                        disabled={activeKfIndex >= keyframes.length - 1}
                        onClick={(e) => {
                            e.stopPropagation();
                            jumpToKeyframe(activeKfIndex + 1);
                        }}
                        title="Jump to Next Keyframe (] or Alt+Right)"
                    >
                        ▶
                    </button>
                </div>

                <button
                    type="button"
                    className="btn-add-kf-track"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onAddKeyframeAtEpoch) onAddKeyframeAtEpoch(playheadEpoch);
                    }}
                    title="Add layout keyframe at playhead position (+ / K)"
                >
                    + KF
                </button>

                {/* Quick-Jump Dropdown Menu */}
                {showQuickJumpList && (
                    <div
                        className="kf-quick-jump-dropdown"
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <div className="dropdown-header">
                            <span className="dropdown-title">KEYFRAME NAVIGATOR ({keyframes.length})</span>
                            <button
                                type="button"
                                className="btn-close-dropdown"
                                onClick={() => setShowQuickJumpList(false)}
                                title="Close"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="dropdown-list">
                            {keyframes.map((k, kIdx) => {
                                const isCurrent = kIdx === activeKfIndex;
                                const kTime = formatTimelineClock(k.timestampEpochMs, timeMode, { includeSeconds: true });
                                const kOffsetSec = Math.max(0, (k.timestampEpochMs - baseEpochMs) / 1000).toFixed(1);
                                const kClock = k.utcClockPosition || k.layout?.utcClockPosition || 'top-right';
                                const kClockLabel = formatClockPositionLabel(kClock);
                                const feedsCount = k.layout?.placements?.length || 0;
                                const trans = kIdx === 0 ? 'Root' : `${k.transitionType || 'smooth'} (${k.transitionDurationSec ?? 0.5}s)`;

                                return (
                                    <div
                                        key={k.id || kIdx}
                                        className={`kf-jump-row ${isCurrent ? 'is-active' : ''}`}
                                        onClick={() => jumpToKeyframe(kIdx)}
                                        title={`Seek to Keyframe #${kIdx + 1} at ${kTime}`}
                                    >
                                        <div className="row-col-idx">
                                            <span className="diamond-mini">❖</span>
                                            <span className="idx-num">#{kIdx + 1}</span>
                                        </div>
                                        <div className="row-col-time">
                                            <span className="time-val">{kTime}</span>
                                            <span className="offset-val">+{kOffsetSec}s</span>
                                        </div>
                                        <div className="row-col-meta">
                                            <span className="meta-badge clock-badge" title="UTC Clock Position">⏱️ {kClockLabel}</span>
                                            <span className="meta-badge trans-badge" title="Transition">{trans}</span>
                                            <span className="meta-badge feeds-badge" title="Feeds on canvas">🖥️ {feedsCount}</span>
                                        </div>
                                        <div className="row-col-action">
                                            <button
                                                type="button"
                                                className="btn-row-settings"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    jumpToKeyframe(kIdx);
                                                }}
                                                title="View & Edit Keyframe Settings"
                                            >
                                                ⚙
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
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

                    const clockPos = kf.utcClockPosition || kf.layout?.utcClockPosition || 'top-right';
                    const clockPosLabel = formatClockPositionLabel(clockPos);
                    const placementsCount = kf.layout?.placements?.length || 0;

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
                            title={`Keyframe #${idx + 1} at ${clockStr} (+${offsetSec}s) • ${transLabel} • Clock: ${clockPosLabel} • Feeds: ${placementsCount}\nDrag: Reposition timestamp • Click: Seek • Right-click: Delete`}
                        >
                            <div className="diamond-shape">❖</div>
                            {isThisDragging && (
                                <div className="diamond-drag-tooltip">
                                    <span>{clockStr}</span>
                                    <span className="tooltip-sub">+{offsetSec}s</span>
                                    <span className="tooltip-clock-pos">⏱️ {clockPosLabel}</span>
                                </div>
                            )}
                            {isPopoverOpen && (
                                <div
                                    className={`kf-inspector-popover ${popoverAlignClass}`}
                                    onClick={(e) => e.stopPropagation()}
                                    onMouseDown={(e) => e.stopPropagation()}
                                >
                                    {/* Popover Header with Instant Previous / Next Flipping */}
                                    <div className="kf-popover-header">
                                        <button
                                            type="button"
                                            className="btn-kf-popover-nav"
                                            disabled={idx <= 0}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                jumpToKeyframe(idx - 1);
                                            }}
                                            title="Jump to Previous Keyframe ([ or Alt+Left)"
                                        >
                                            ◀
                                        </button>
                                        <span className="kf-badge">💎 KEYFRAME #{idx + 1} of {keyframes.length}</span>
                                        <button
                                            type="button"
                                            className="btn-kf-popover-nav"
                                            disabled={idx >= keyframes.length - 1}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                jumpToKeyframe(idx + 1);
                                            }}
                                            title="Jump to Next Keyframe (] or Alt+Right)"
                                        >
                                            ▶
                                        </button>
                                        <span className="kf-clock">{clockStr}</span>
                                        <button
                                            type="button"
                                            className="btn-kf-popover-close"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedConfigKfIndex(null);
                                            }}
                                            title="Close Settings (Esc)"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    <div className="kf-popover-body">
                                        {/* Transition & Duration Controls (for keyframes > 0) */}
                                        {idx > 0 ? (
                                            <>
                                                <div className="kf-field-row">
                                                    <span className="kf-field-label">INCOMING TRANSITION</span>
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
                                                        <span className="kf-field-label">TRANSITION DURATION</span>
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
                                            </>
                                        ) : (
                                            <div className="kf-root-notice-bar">
                                                <span className="kf-root-tag">ROOT KEYFRAME</span>
                                                <span className="kf-root-desc">Base layout governing cut origin (t = 0)</span>
                                            </div>
                                        )}

                                        {/* UTC Wall Clock Position Selector (Available for ALL keyframes!) */}
                                        <div className="kf-field-row">
                                            <div className="kf-field-header-row">
                                                <span className="kf-field-label">UTC CLOCK POSITION</span>
                                                <span className="kf-current-clock-badge">⏱️ {clockPosLabel}</span>
                                            </div>
                                            <div className="kf-clock-pos-buttons">
                                                {[
                                                    { id: 'top-left', label: '↖ Top-Left' },
                                                    { id: 'top-right', label: '↗ Top-Right' },
                                                    { id: 'bottom-left', label: '↙ Bottom-Left' },
                                                    { id: 'bottom-right', label: '↘ Bottom-Right' }
                                                ].map(pos => (
                                                    <button
                                                        key={pos.id}
                                                        type="button"
                                                        className={`btn-clock-pos-choice ${clockPos === pos.id ? 'is-active' : ''}`}
                                                        onClick={() => onUpdateKeyframeClockPosition?.(idx, pos.id)}
                                                        title={`Set UTC Wall Clock to ${pos.label}`}
                                                    >
                                                        {pos.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Layout & Feeds Settings Readout */}
                                        <div className="kf-field-row kf-layout-summary-row">
                                            <span className="kf-field-label">ACTIVE FEEDS & COMPOSITION</span>
                                            <div className="kf-layout-summary-box">
                                                <div className="summary-header">
                                                    <span className="summary-res">📺 {kf.layout?.width || 1920}×{kf.layout?.height || 1080}</span>
                                                    <span className="summary-count">🖥️ {(kf.layout?.placements?.length || 0)} Screens</span>
                                                </div>
                                                {kf.layout?.placements?.length > 0 ? (
                                                    <div className="summary-feed-tags">
                                                        {kf.layout.placements.map((p, pI) => (
                                                            <span
                                                                key={pI}
                                                                className="feed-tag"
                                                                title={`${p.stationId} (${p.displayId || 'mon-0'}) • Dim: ${p.width}×${p.height} • Pos: (${p.x}, ${p.y})`}
                                                            >
                                                                {p.label || `${p.stationId} (${p.displayId || 'mon-0'})`}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="no-feeds-hint">No feeds placed on canvas in this keyframe</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Footer Actions */}
                                        <div className="kf-popover-footer">
                                            {!isActive && (
                                                <button
                                                    type="button"
                                                    className="btn-kf-seek"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        jumpToKeyframe(idx);
                                                    }}
                                                    title="Seek Playhead to this Keyframe"
                                                >
                                                    📍 Jump Playhead Here
                                                </button>
                                            )}

                                            {idx > 0 && (
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
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
