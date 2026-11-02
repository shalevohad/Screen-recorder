// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/tracks/DirectorTrack.jsx
// ==========================================
import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { formatTimelineClock } from '../../../utils/timeFormat.js';
import './DirectorTrack.scss';

export default function DirectorTrack({
    stationId,
    directorPlan,
    viewportStartMs = 0,
    viewportDurationMs = 3600000,
    baseEpochMs = 0,
    playheadMs = 0,
    onSplitSegment,
    onChangeSegmentDisplay,
    onResetSegmentToAuto,
    availableDisplays = [],
    timeMode = 'LOCAL'
}) {
    const rawSegments = directorPlan?.segments;
    const segments = useMemo(() => rawSegments || [], [rawSegments]);
    const containerRef = useRef(null);
    const [selectedMenuSegment, setSelectedMenuSegment] = useState(null); // { s, e, x, y, targetDisplay, dispNumber, dispLabel, isOverride, clickEpoch }

    const playheadEpoch = baseEpochMs + playheadMs;
    const vpStartEpoch = baseEpochMs + viewportStartMs;
    const vpEndEpoch = vpStartEpoch + viewportDurationMs;

    // Filter segments visible in viewport
    const visibleSegments = useMemo(() => {
        return segments.filter(seg => {
            const s = seg.startEpochMs ?? seg.StartEpochMs ?? 0;
            const e = seg.endEpochMs ?? seg.EndEpochMs ?? 0;
            return e > vpStartEpoch && s < vpEndEpoch;
        });
    }, [segments, vpStartEpoch, vpEndEpoch]);

    // Format list of displays with 1-based numbering
    const displayList = useMemo(() => {
        if (availableDisplays && availableDisplays.length > 0) {
            return availableDisplays.map((d, idx) => {
                const id = (d.displayId ?? d.DisplayId ?? `mon-${idx}`).toLowerCase();
                const num = d.displayNumber ?? d.DisplayNumber ?? (idx + 1);
                const rawName = d.displayName || d.DisplayName || `Screen ${num}`;
                const label = rawName.replace(/\s*\(mon-\d+\)/i, '').trim().toUpperCase();
                return {
                    id,
                    number: num,
                    label
                };
            });
        }
        return [];
    }, [availableDisplays]);

    const getDisplayNumber = useCallback((dispId) => {
        if (!dispId) return 1;
        const norm = dispId.toLowerCase();
        const found = displayList.find(d => d.id === norm);
        if (found) return found.number;
        const match = norm.match(/\d+/);
        if (match) {
            const n = parseInt(match[0], 10);
            return norm.startsWith('mon-') ? n + 1 : n;
        }
        return 1;
    }, [displayList]);

    const getDisplayLabel = useCallback((dispId) => {
        if (!dispId) return 'SCREEN 1';
        const norm = dispId.toLowerCase();
        const found = displayList.find(d => d.id === norm);
        if (found) return found.label;
        if (norm === 'mon-0' || norm === '0') return 'SCREEN 1';
        if (norm === 'mon-1' || norm === '1') return 'SCREEN 2';
        const match = norm.match(/\d+/);
        if (match) {
            const n = parseInt(match[0], 10);
            return `SCREEN ${norm.startsWith('mon-') ? n + 1 : n}`;
        }
        return dispId.toUpperCase();
    }, [displayList]);

    // Active segment at playhead
    const currentActiveSegment = useMemo(() => {
        if (!segments || segments.length === 0) return null;
        return segments.find(seg => {
            const s = seg.startEpochMs ?? seg.StartEpochMs ?? 0;
            const e = seg.endEpochMs ?? seg.EndEpochMs ?? 0;
            return s <= playheadEpoch && playheadEpoch <= e;
        }) || segments[0];
    }, [segments, playheadEpoch]);

    const activeDisplayId = (currentActiveSegment?.targetDisplayId ?? currentActiveSegment?.TargetDisplayId ?? 'mon-0').toLowerCase();
    const activeDisplayNum = getDisplayNumber(activeDisplayId);
    const isActiveOverride = Boolean(currentActiveSegment?.isManualOverride ?? currentActiveSegment?.IsManualOverride);

    // Close menu on outside click or escape key
    useEffect(() => {
        if (!selectedMenuSegment) return;
        const handleOutside = () => setSelectedMenuSegment(null);
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedMenuSegment(null);
        };
        window.addEventListener('click', handleOutside);
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('click', handleOutside);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedMenuSegment]);

    if (!availableDisplays || availableDisplays.length < 2 || !segments || segments.length === 0) {
        return null;
    }

    return (
        <div 
            className="director-track-container" 
            aria-label="Auto-Director Track"
            ref={containerRef}
        >
            <div className="director-track-label">
                <span className="director-icon">🎬</span>
                <span className="director-title">DIRECTOR</span>
                <span 
                    className={`director-active-badge ${isActiveOverride ? 'is-override' : 'is-auto'}`}
                    title={`Current orientation at playhead: Screen ${activeDisplayNum} (${isActiveOverride ? 'Manual Override' : 'Auto-Director'})`}
                >
                    <span className="badge-pulse" />
                    {isActiveOverride ? '✋ ' : '⚡ '}
                    {`🖥 ${activeDisplayNum}`}
                </span>

                {isActiveOverride && onResetSegmentToAuto && (
                    <button
                        type="button"
                        className="director-revert-btn"
                        onClick={() => onResetSegmentToAuto(stationId, playheadEpoch)}
                        title="Revert active override to AI Auto-Director"
                    >
                        ↩ Auto
                    </button>
                )}
            </div>

            <div className="director-track-timeline">
                {visibleSegments.map((seg, idx) => {
                    const s = seg.startEpochMs ?? seg.StartEpochMs ?? 0;
                    const e = seg.endEpochMs ?? seg.EndEpochMs ?? 0;
                    const targetDisplay = (seg.targetDisplayId ?? seg.TargetDisplayId ?? 'mon-0').toLowerCase();
                    const dispNumber = getDisplayNumber(targetDisplay);
                    const dispLabel = getDisplayLabel(targetDisplay);
                    const isOverride = Boolean(seg.isManualOverride ?? seg.IsManualOverride);
                    const isAtPlayhead = playheadEpoch >= s && playheadEpoch <= e;

                    // Clamp to viewport
                    const visStart = Math.max(s, vpStartEpoch);
                    const visEnd = Math.min(e, vpEndEpoch);
                    if (visEnd <= visStart) return null;

                    // Precise percentage without artificial min-width padding to prevent overlapping in zoom-out
                    const rawLeftPct = ((visStart - vpStartEpoch) / viewportDurationMs) * 100;
                    const rawRightPct = ((visEnd - vpStartEpoch) / viewportDurationMs) * 100;
                    const leftPct = rawLeftPct;
                    const widthPct = Math.max(0.01, rawRightPct - rawLeftPct);

                    const durationSec = Math.round((e - s) / 1000);
                    const startClock = formatTimelineClock(s, timeMode, { includeSeconds: true });
                    const endClock = formatTimelineClock(e, timeMode, { includeSeconds: true });

                    const handleOpenMenu = (ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();

                        const timelineEl = containerRef.current?.querySelector('.director-track-timeline');
                        let clickEpoch = null;
                        if (timelineEl) {
                            const rect = timelineEl.getBoundingClientRect();
                            const ratio = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
                            clickEpoch = Math.round(vpStartEpoch + ratio * viewportDurationMs);
                        }

                        setSelectedMenuSegment({
                            s,
                            e,
                            x: ev.clientX,
                            y: ev.clientY,
                            targetDisplay,
                            dispNumber,
                            dispLabel,
                            isOverride,
                            clickEpoch
                        });
                    };

                    const themeClassIndex = ((dispNumber - 1) % 4) + 1;

                    return (
                        <div
                            key={`${s}-${e}-${idx}`}
                            className={`director-segment-block disp-theme-${themeClassIndex} ${isOverride ? 'is-override' : 'is-auto'} ${isAtPlayhead ? 'is-active-at-playhead' : ''}`}
                            style={{
                                left: `${leftPct}%`,
                                width: `${widthPct}%`
                            }}
                            title={`Screen ${dispNumber} (${dispLabel}) • ${startClock} - ${endClock} (${durationSec}s) • ${isOverride ? 'Manual Override' : 'Auto-Director'} • Right-click to edit`}
                            onClick={handleOpenMenu}
                            onContextMenu={handleOpenMenu}
                        >
                            {/* Minimalist text: display ONLY the screen number decided upon */}
                            {widthPct >= 2.5 ? (
                                <span className="segment-screen-badge">
                                    {isOverride && <span className="override-indicator">✋</span>}
                                    <span className="screen-num">{`🖥 ${dispNumber}`}</span>
                                </span>
                            ) : widthPct >= 0.8 ? (
                                <span className="segment-screen-badge mini">
                                    {isOverride && <span className="override-dot">•</span>}
                                    <span className="screen-num">{dispNumber}</span>
                                </span>
                            ) : null}

                            {isAtPlayhead && (
                                <span className="playhead-indicator-dot" />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Tactical Right-Click Context Menu */}
            {selectedMenuSegment && (
                <div 
                    className="director-context-menu"
                    style={{
                        position: 'fixed',
                        left: `${Math.min(window.innerWidth - 240, Math.max(10, selectedMenuSegment.x))}px`,
                        top: `${Math.min(window.innerHeight - 260, Math.max(10, selectedMenuSegment.y))}px`,
                        zIndex: 99999
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }}
                >
                    <div className="menu-header">
                        <span className="menu-title">
                            {selectedMenuSegment.isOverride ? '✋ MANUAL OVERRIDE' : '⚡ AUTO-DIRECTOR'}
                        </span>
                        <button 
                            type="button" 
                            className="menu-close-x" 
                            onClick={() => setSelectedMenuSegment(null)}
                        >
                            ✕
                        </button>
                    </div>

                    <div className="menu-segment-info">
                        <div className="info-time">
                            {formatTimelineClock(selectedMenuSegment.s, timeMode, { includeSeconds: true })} - {formatTimelineClock(selectedMenuSegment.e, timeMode, { includeSeconds: true })}
                        </div>
                        <div className="info-duration">
                            {Math.round((selectedMenuSegment.e - selectedMenuSegment.s) / 1000)}s • Current: Screen {selectedMenuSegment.dispNumber}
                        </div>
                    </div>

                    <div className="menu-section-label">SWITCH THIS SEGMENT TO:</div>
                    <div className="menu-options-list">
                        {displayList.map(disp => {
                            const isCurrent = disp.id === selectedMenuSegment.targetDisplay;
                            return (
                                <button
                                    key={disp.id}
                                    type="button"
                                    className={`menu-item-btn disp-btn ${isCurrent ? 'active' : ''}`}
                                    onClick={() => {
                                        const midEpoch = Math.round((selectedMenuSegment.s + selectedMenuSegment.e) / 2);
                                        onChangeSegmentDisplay?.(stationId, midEpoch, disp.id);
                                        setSelectedMenuSegment(null);
                                    }}
                                >
                                    <span className="btn-label">🖥️ Screen {disp.number} ({disp.label})</span>
                                    {isCurrent && <span className="menu-check">✓ Active</span>}
                                </button>
                            );
                        })}
                    </div>

                    <div className="menu-divider" />

                    <div className="menu-actions">
                        {selectedMenuSegment.isOverride && (
                            <button
                                type="button"
                                className="menu-item-btn btn-reset-auto"
                                onClick={() => {
                                    const midEpoch = Math.round((selectedMenuSegment.s + selectedMenuSegment.e) / 2);
                                    onResetSegmentToAuto?.(stationId, midEpoch);
                                    setSelectedMenuSegment(null);
                                }}
                            >
                                ⚡ Revert to Auto-Director
                            </button>
                        )}

                        {selectedMenuSegment.clickEpoch && 
                         selectedMenuSegment.clickEpoch > selectedMenuSegment.s + 1000 && 
                         selectedMenuSegment.clickEpoch < selectedMenuSegment.e - 1000 && (
                            <button
                                type="button"
                                className="menu-item-btn btn-split"
                                onClick={() => {
                                    onSplitSegment?.(stationId, selectedMenuSegment.clickEpoch);
                                    setSelectedMenuSegment(null);
                                }}
                            >
                                ✂️ Split here ({formatTimelineClock(selectedMenuSegment.clickEpoch, timeMode, { includeSeconds: true })})
                            </button>
                        )}

                        {playheadEpoch > selectedMenuSegment.s + 500 && playheadEpoch < selectedMenuSegment.e - 500 && (
                            <button
                                type="button"
                                className="menu-item-btn btn-split"
                                onClick={() => {
                                    onSplitSegment?.(stationId, playheadEpoch);
                                    setSelectedMenuSegment(null);
                                }}
                            >
                                ✂️ Split at Playhead ({formatTimelineClock(playheadEpoch, timeMode, { includeSeconds: true })})
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
