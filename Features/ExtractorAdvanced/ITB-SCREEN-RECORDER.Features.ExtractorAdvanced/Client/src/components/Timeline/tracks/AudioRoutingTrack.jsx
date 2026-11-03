// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/tracks/AudioRoutingTrack.jsx
// Minimalist 26px Single-Row Audio Routing Track
// ==========================================
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { formatTimelineClock } from '../../../utils/timeFormat.js';
import './AudioRoutingTrack.scss';

export default function AudioRoutingTrack({
    audioPlan,
    stations = [],
    viewportStartMs = 0,
    viewportDurationMs = 3600000,
    baseEpochMs = 0,
    playheadMs = 0,
    onSplitSegment,
    onChangeSegmentStation,
    onFollowVisualFeed,
    isAutoFollow = false,
    timeMode = 'LOCAL'
}) {
    const containerRef = useRef(null);
    const [selectedMenuSegment, setSelectedMenuSegment] = useState(null);

    const segments = useMemo(() => {
        if (audioPlan?.segments && audioPlan.segments.length > 0) {
            return audioPlan.segments;
        }
        // Fallback default: 1 segment routing station 0
        const defaultStationId = stations[0]?.id || 'station-0';
        return [
            {
                startEpochMs: baseEpochMs,
                endEpochMs: baseEpochMs + viewportDurationMs * 2,
                sourceStationId: defaultStationId
            }
        ];
    }, [audioPlan, stations, baseEpochMs, viewportDurationMs]);

    const playheadEpoch = baseEpochMs + playheadMs;
    const vpStartEpoch = baseEpochMs + viewportStartMs;
    const vpEndEpoch = vpStartEpoch + viewportDurationMs;

    // Current segment at the playhead
    const currentActiveSegment = useMemo(() => {
        if (!segments || segments.length === 0) return null;
        return segments.find(seg => {
            const s = seg.startEpochMs ?? seg.StartEpochMs ?? 0;
            const e = seg.endEpochMs ?? seg.EndEpochMs ?? 0;
            return s <= playheadEpoch && playheadEpoch <= e;
        }) || segments[0];
    }, [segments, playheadEpoch]);

    const activeStationId = currentActiveSegment?.sourceStationId ?? currentActiveSegment?.SourceStationId ?? '';
    const activeStation = useMemo(() => {
        return stations.find(s => s.id === activeStationId) || null;
    }, [stations, activeStationId]);

    const activeStationName = activeStation ? (activeStation.displayName || activeStation.hostname || activeStation.id) : (activeStationId === 'MUTE' ? 'MUTED' : activeStationId);

    const activeStartClock = useMemo(() => {
        if (!currentActiveSegment) return '';
        const s = currentActiveSegment.startEpochMs ?? currentActiveSegment.StartEpochMs ?? 0;
        return formatTimelineClock(s, timeMode, { includeSeconds: true });
    }, [currentActiveSegment, timeMode]);

    const activeEndClock = useMemo(() => {
        if (!currentActiveSegment) return '';
        const e = currentActiveSegment.endEpochMs ?? currentActiveSegment.EndEpochMs ?? 0;
        return formatTimelineClock(e, timeMode, { includeSeconds: true });
    }, [currentActiveSegment, timeMode]);

    // Visible segments in current zoom window
    const visibleSegments = useMemo(() => {
        return segments.filter(seg => {
            const s = seg.startEpochMs ?? seg.StartEpochMs ?? 0;
            const e = seg.endEpochMs ?? seg.EndEpochMs ?? 0;
            return e > vpStartEpoch && s < vpEndEpoch;
        });
    }, [segments, vpStartEpoch, vpEndEpoch]);

    // Close menu on outside click or Escape key
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

    const handleSplitAtPlayhead = (e) => {
        e?.stopPropagation();
        if (!currentActiveSegment) return;
        const s = currentActiveSegment.startEpochMs ?? currentActiveSegment.StartEpochMs ?? 0;
        const eMs = currentActiveSegment.endEpochMs ?? currentActiveSegment.EndEpochMs ?? 0;
        if (playheadEpoch > s + 500 && playheadEpoch < eMs - 500) {
            onSplitSegment?.(playheadEpoch);
            setSelectedMenuSegment(null);
        }
    };

    const handleOpenMenu = (ev, s, e, stId) => {
        ev.preventDefault();
        ev.stopPropagation();

        const timelineEl = containerRef.current?.querySelector('.audio-track-timeline');
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
            currentStationId: stId,
            clickEpoch
        });
    };

    if (!stations || stations.length === 0) return null;

    return (
        <div 
            className="audio-routing-track-container" 
            aria-label="Audio Routing Track"
            ref={containerRef}
        >
            {/* Sleek 180px Header Cell matching DirectorTrack */}
            <div className="audio-track-label">
                <span className="audio-icon">🎙️</span>
                <span className="audio-title">AUDIO</span>
                <span 
                    className={`audio-active-badge ${activeStationId === 'MUTE' ? 'is-muted' : 'is-active'}`}
                    title={`Active audio source at playhead: ${activeStationName} [${activeStartClock} - ${activeEndClock}]`}
                >
                    <span className="badge-pulse" />
                    <span className="badge-text">{activeStationId === 'MUTE' ? 'MUTED' : activeStationName.toUpperCase()}</span>
                </span>

                <div className="audio-track-actions">
                    {onFollowVisualFeed && (
                        <button
                            type="button"
                            className={`btn-audio-mini-action ${isAutoFollow ? 'active' : ''}`}
                            onClick={onFollowVisualFeed}
                            title="Automatically route audio to whichever station is in active visual focus"
                        >
                            🎯
                        </button>
                    )}

                    <button
                        type="button"
                        className="btn-audio-mini-action"
                        onClick={handleSplitAtPlayhead}
                        title="Split Audio Track at Playhead (✂️)"
                    >
                        ✂️
                    </button>
                </div>
            </div>

            {/* Single-row Timeline surface */}
            <div className="audio-track-timeline">
                {visibleSegments.map((seg, idx) => {
                    const s = seg.startEpochMs ?? seg.StartEpochMs ?? 0;
                    const e = seg.endEpochMs ?? seg.EndEpochMs ?? 0;
                    const stId = seg.sourceStationId ?? seg.SourceStationId ?? '';
                    const st = stations.find(x => x.id === stId);
                    const labelName = st ? (st.displayName || st.hostname || st.id) : (stId === 'MUTE' ? 'MUTED' : stId);

                    const leftPct = Math.max(0, ((s - vpStartEpoch) / viewportDurationMs) * 100);
                    const rightPct = Math.min(100, ((e - vpStartEpoch) / viewportDurationMs) * 100);
                    const widthPct = Math.max(0.1, rightPct - leftPct);

                    const isCurrent = currentActiveSegment && 
                        (currentActiveSegment.startEpochMs ?? currentActiveSegment.StartEpochMs) === s;

                    return (
                        <div
                            key={`audio_seg_${idx}_${s}`}
                            className={`audio-segment-block ${isCurrent ? 'is-current' : ''} ${stId === 'MUTE' ? 'is-muted' : ''}`}
                            style={{
                                left: `${leftPct}%`,
                                width: `${widthPct}%`
                            }}
                            onClick={(ev) => handleOpenMenu(ev, s, e, stId)}
                            onContextMenu={(ev) => handleOpenMenu(ev, s, e, stId)}
                            title={`Audio Source: ${labelName} [${formatTimelineClock(s, timeMode, { includeSeconds: true })} - ${formatTimelineClock(e, timeMode, { includeSeconds: true })}] — Click or right-click to edit`}
                        >
                            <div className="audio-wave-anim">
                                <span className="bar b1" />
                                <span className="bar b2" />
                                <span className="bar b3" />
                            </div>
                            <span className="audio-segment-label">
                                {stId === 'MUTE' ? '🔇 MUTED' : `🎙️ ${labelName.toUpperCase()}`}
                            </span>
                            <span className="audio-segment-time">
                                {Math.round((e - s) / 1000)}s
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Tactical Station Selector Popup Menu */}
            {selectedMenuSegment && (
                <div 
                    className="audio-segment-context-menu"
                    style={{
                        position: 'fixed',
                        left: `${Math.min(Math.max(10, selectedMenuSegment.x), window.innerWidth - 240)}px`,
                        top: `${Math.min(Math.max(10, selectedMenuSegment.y), window.innerHeight - 250)}px`,
                        zIndex: 99999
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }}
                >
                    <div className="menu-header">
                        <span className="menu-icon">🎙️</span>
                        <span>ASSIGN AUDIO SOURCE</span>
                        <button 
                            type="button" 
                            className="menu-close-x" 
                            onClick={() => setSelectedMenuSegment(null)}
                            style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '11px' }}
                        >
                            ✕
                        </button>
                    </div>

                    <div className="menu-segment-info" style={{ padding: '6px 12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(0, 0, 0, 0.2)' }}>
                        <div className="info-time" style={{ fontFamily: 'JetBrains Mono', fontSize: '10.5px', color: '#06B6D4' }}>
                            {formatTimelineClock(selectedMenuSegment.s, timeMode, { includeSeconds: true })} - {formatTimelineClock(selectedMenuSegment.e, timeMode, { includeSeconds: true })}
                        </div>
                        <div className="info-duration" style={{ fontSize: '9.5px', color: '#94A3B8', marginTop: '2px' }}>
                            {Math.round((selectedMenuSegment.e - selectedMenuSegment.s) / 1000)}s duration
                        </div>
                    </div>

                    <div className="menu-stations-list">
                        {stations.map(st => {
                            const isSelected = selectedMenuSegment.currentStationId === st.id;
                            const name = st.displayName || st.hostname || st.id;
                            return (
                                <button
                                    key={st.id}
                                    type="button"
                                    className={`btn-station-option ${isSelected ? 'selected' : ''}`}
                                    onClick={() => {
                                        onChangeSegmentStation?.(selectedMenuSegment.s, st.id);
                                        setSelectedMenuSegment(null);
                                    }}
                                >
                                    <span className="dot" />
                                    <span className="name">{name}</span>
                                    {isSelected && <span className="check">✓</span>}
                                </button>
                            );
                        })}

                        <button
                            type="button"
                            className={`btn-station-option mute-option ${selectedMenuSegment.currentStationId === 'MUTE' ? 'selected' : ''}`}
                            onClick={() => {
                                onChangeSegmentStation?.(selectedMenuSegment.s, 'MUTE');
                                setSelectedMenuSegment(null);
                            }}
                        >
                            <span className="dot mute" />
                            <span className="name">🔇 MUTE INTERVAL</span>
                            {selectedMenuSegment.currentStationId === 'MUTE' && <span className="check">✓</span>}
                        </button>
                    </div>

                    <div className="menu-footer">
                        {selectedMenuSegment.clickEpoch && 
                         selectedMenuSegment.clickEpoch > selectedMenuSegment.s + 500 && 
                         selectedMenuSegment.clickEpoch < selectedMenuSegment.e - 500 && (
                            <button
                                type="button"
                                className="btn-menu-split"
                                onClick={() => {
                                    onSplitSegment?.(selectedMenuSegment.clickEpoch);
                                    setSelectedMenuSegment(null);
                                }}
                            >
                                <span>✂️ SPLIT HERE ({formatTimelineClock(selectedMenuSegment.clickEpoch, timeMode, { includeSeconds: true })})</span>
                            </button>
                        )}

                        {playheadEpoch > selectedMenuSegment.s + 500 && playheadEpoch < selectedMenuSegment.e - 500 && (
                            <button
                                type="button"
                                className="btn-menu-split"
                                onClick={() => {
                                    onSplitSegment?.(playheadEpoch);
                                    setSelectedMenuSegment(null);
                                }}
                            >
                                <span>✂️ SPLIT AT PLAYHEAD ({formatTimelineClock(playheadEpoch, timeMode, { includeSeconds: true })})</span>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
