// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/tracks/DirectorTrack.jsx
// ==========================================
import React, { useMemo, useState, useEffect, useRef } from 'react';
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
    availableDisplays = []
}) {
    const segments = directorPlan?.segments || [];
    const containerRef = useRef(null);
    const [selectedMenuSegment, setSelectedMenuSegment] = useState(null); // { s, e, x, y, targetDisplay, isOverride }

    const playheadEpoch = baseEpochMs + playheadMs;
    const vpStartEpoch = baseEpochMs + viewportStartMs;
    const vpEndEpoch = vpStartEpoch + viewportDurationMs;

    // Determine which display is currently active at the playhead
    const currentActiveSegment = useMemo(() => {
        if (!segments || segments.length === 0) return null;
        return segments.find(seg => {
            const s = seg.startEpochMs ?? seg.StartEpochMs ?? 0;
            const e = seg.endEpochMs ?? seg.EndEpochMs ?? 0;
            return s <= playheadEpoch && playheadEpoch <= e;
        }) || segments[0];
    }, [segments, playheadEpoch]);

    const activeDisplayId = (currentActiveSegment?.targetDisplayId ?? currentActiveSegment?.TargetDisplayId ?? 'mon-0').toUpperCase();
    const isActiveOverride = Boolean(currentActiveSegment?.isManualOverride ?? currentActiveSegment?.IsManualOverride);

    // Filter segments visible in viewport
    const visibleSegments = useMemo(() => {
        return segments.filter(seg => {
            const s = seg.startEpochMs ?? seg.StartEpochMs ?? 0;
            const e = seg.endEpochMs ?? seg.EndEpochMs ?? 0;
            return e > vpStartEpoch && s < vpEndEpoch;
        });
    }, [segments, vpStartEpoch, vpEndEpoch]);

    // Format list of displays
    const displayList = useMemo(() => {
        if (availableDisplays && availableDisplays.length > 0) {
            return availableDisplays.map(d => ({
                id: (d.displayId ?? d.DisplayId ?? 'mon-0').toLowerCase(),
                label: (d.displayName ?? d.DisplayName ?? d.displayId ?? 'mon-0').toUpperCase()
            }));
        }
        return [
            { id: 'mon-0', label: 'DISPLAY 1 (MON-0)' },
            { id: 'mon-1', label: 'DISPLAY 2 (MON-1)' }
        ];
    }, [availableDisplays]);

    // Close menu on outside click
    useEffect(() => {
        if (!selectedMenuSegment) return;
        const handleOutside = () => setSelectedMenuSegment(null);
        window.addEventListener('click', handleOutside);
        return () => window.removeEventListener('click', handleOutside);
    }, [selectedMenuSegment]);

    // Handle Split Segment at Playhead
    const handleSplitAtPlayhead = () => {
        if (!currentActiveSegment) return;
        const s = currentActiveSegment.startEpochMs ?? currentActiveSegment.StartEpochMs ?? 0;
        const e = currentActiveSegment.endEpochMs ?? currentActiveSegment.EndEpochMs ?? 0;
        if (playheadEpoch > s + 500 && playheadEpoch < e - 500) {
            onSplitSegment?.(stationId, playheadEpoch);
            setSelectedMenuSegment(null);
        }
    };

    if (!segments || segments.length === 0) {
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
                <span className="director-title">DIRECTOR FOCUS</span>
                <span 
                    className={`director-active-badge ${isActiveOverride ? 'is-override' : 'is-auto'}`}
                    title={`Current orientation at playhead: ${activeDisplayId} (${isActiveOverride ? 'Manual Override' : 'Auto-Director'})`}
                >
                    <span className="badge-pulse" />
                    {isActiveOverride ? '✋ ' : '⚡ '}
                    {activeDisplayId}
                </span>

                <button 
                    type="button"
                    className="director-split-btn"
                    onClick={handleSplitAtPlayhead}
                    title="Split active director segment at playhead (Hotkey: S)"
                >
                    ✂️
                </button>
            </div>

            <div className="director-track-timeline">
                {visibleSegments.map((seg, idx) => {
                    const s = seg.startEpochMs ?? seg.StartEpochMs ?? 0;
                    const e = seg.endEpochMs ?? seg.EndEpochMs ?? 0;
                    const targetDisplay = (seg.targetDisplayId ?? seg.TargetDisplayId ?? 'mon-0').toUpperCase();
                    const isOverride = Boolean(seg.isManualOverride ?? seg.IsManualOverride);
                    const isAtPlayhead = playheadEpoch >= s && playheadEpoch <= e;

                    // Clamp to viewport
                    const visStart = Math.max(s, vpStartEpoch);
                    const visEnd = Math.min(e, vpEndEpoch);
                    const leftPct = ((visStart - vpStartEpoch) / viewportDurationMs) * 100;
                    const widthPct = Math.max(0.3, ((visEnd - visStart) / viewportDurationMs) * 100);

                    return (
                        <div
                            key={`${s}-${e}-${idx}`}
                            className={`director-segment-block ${isOverride ? 'is-override' : 'is-auto'} ${isAtPlayhead ? 'is-active-at-playhead' : ''}`}
                            style={{
                                left: `${leftPct}%`,
                                width: `${widthPct}%`
                            }}
                            title={`${isOverride ? 'Manual Override' : 'Auto-Director'}: ${targetDisplay} (${Math.round((e - s) / 1000)}s) • Click for options`}
                            onClick={(ev) => {
                                ev.stopPropagation();
                                const rect = ev.currentTarget.getBoundingClientRect();
                                setSelectedMenuSegment({
                                    s,
                                    e,
                                    x: rect.left,
                                    y: rect.bottom + 4,
                                    targetDisplay: targetDisplay.toLowerCase(),
                                    isOverride
                                });
                            }}
                            onContextMenu={(ev) => {
                                ev.preventDefault();
                                ev.stopPropagation();
                                const rect = ev.currentTarget.getBoundingClientRect();
                                setSelectedMenuSegment({
                                    s,
                                    e,
                                    x: rect.left,
                                    y: rect.bottom + 4,
                                    targetDisplay: targetDisplay.toLowerCase(),
                                    isOverride
                                });
                            }}
                        >
                            <span className="segment-badge-icon">
                                {isOverride ? '✋' : '⚡'}
                            </span>
                            <span className="segment-badge-label">
                                {targetDisplay}
                            </span>
                            {isAtPlayhead && (
                                <span className="playhead-indicator-dot" />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Tactical Override / Split Popover Menu */}
            {selectedMenuSegment && (
                <div 
                    className="director-menu-popover"
                    style={{
                        position: 'fixed',
                        left: `${Math.min(window.innerWidth - 220, Math.max(10, selectedMenuSegment.x))}px`,
                        top: `${Math.min(window.innerHeight - 180, selectedMenuSegment.y)}px`,
                        zIndex: 9999
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="menu-header">
                        <span>DIRECTOR OVERRIDE</span>
                        <span className="menu-close-x" onClick={() => setSelectedMenuSegment(null)}>✕</span>
                    </div>

                    <div className="menu-section-label">SWITCH TARGET DISPLAY:</div>
                    <div className="menu-options-list">
                        {displayList.map(disp => {
                            const isCurrent = disp.id === selectedMenuSegment.targetDisplay;
                            return (
                                <button
                                    key={disp.id}
                                    type="button"
                                    className={`menu-item-btn ${isCurrent && selectedMenuSegment.isOverride ? 'active' : ''}`}
                                    onClick={() => {
                                        onChangeSegmentDisplay?.(stationId, selectedMenuSegment.s, disp.id);
                                        setSelectedMenuSegment(null);
                                    }}
                                >
                                    <span>🖥️ {disp.label}</span>
                                    {isCurrent && <span className="menu-check">✓</span>}
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
                                    onResetSegmentToAuto?.(stationId, selectedMenuSegment.s);
                                    setSelectedMenuSegment(null);
                                }}
                            >
                                ⚡ Reset to Auto-Director
                            </button>
                        )}

                        {playheadEpoch > selectedMenuSegment.s && playheadEpoch < selectedMenuSegment.e && (
                            <button
                                type="button"
                                className="menu-item-btn btn-split"
                                onClick={() => {
                                    onSplitSegment?.(stationId, playheadEpoch);
                                    setSelectedMenuSegment(null);
                                }}
                            >
                                ✂️ Split Segment at Playhead
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
