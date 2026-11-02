// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/tracks/AudioRoutingTrack.jsx
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

    // Close menu on outside click
    useEffect(() => {
        if (!selectedMenuSegment) return;
        const handleOutside = () => setSelectedMenuSegment(null);
        window.addEventListener('click', handleOutside);
        return () => window.removeEventListener('click', handleOutside);
    }, [selectedMenuSegment]);

    const handleSplitAtPlayhead = () => {
        if (!currentActiveSegment) return;
        const s = currentActiveSegment.startEpochMs ?? currentActiveSegment.StartEpochMs ?? 0;
        const e = currentActiveSegment.endEpochMs ?? currentActiveSegment.EndEpochMs ?? 0;
        if (playheadEpoch > s + 500 && playheadEpoch < e - 500) {
            onSplitSegment?.(playheadEpoch);
            setSelectedMenuSegment(null);
        }
    };

    if (!stations || stations.length === 0) return null;

    return (
        <div 
            className="audio-routing-track-container" 
            aria-label="Audio Routing Track"
            ref={containerRef}
        >
            <div className="audio-track-label">
                <span className="audio-icon">🎙️</span>
                <span className="audio-title">AUDIO ROUTING (MASTER MIX)</span>
                <span 
                    className={`audio-active-badge ${activeStationId === 'MUTE' ? 'is-muted' : 'is-active'}`}
                    title={`Active audio source at playhead: ${activeStationName} [${activeStartClock} - ${activeEndClock}]`}
                >
                    <span className="badge-pulse" />
                    {activeStationId === 'MUTE' ? '🔇 MUTED' : `🎙️ ${activeStationName.toUpperCase()}`}
                    {activeStartClock && (
                        <span className="active-interval-time">
                            [{activeStartClock} - {activeEndClock}]
                        </span>
                    )}
                </span>

                <div className="audio-track-actions">
                    {onFollowVisualFeed && (
                        <button
                            type="button"
                            className={`btn-audio-action ${isAutoFollow ? 'active' : ''}`}
                            onClick={onFollowVisualFeed}
                            title="Automatically route audio to whichever station is currently in active visual focus"
                        >
                            <span className="icon">🎯</span>
                            <span>{isAutoFollow ? 'AUTO-FOLLOW ON' : 'FOLLOW VISUAL'}</span>
                        </button>
                    )}

                    <button
                        type="button"
                        className="btn-audio-action"
                        onClick={handleSplitAtPlayhead}
                        title="Split Audio Track at Playhead (✂️)"
                    >
                        <span className="icon">✂️</span>
                        <span>SPLIT</span>
                    </button>
                </div>
            </div>

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
                            onClick={(ev) => {
                                ev.stopPropagation();
                                const rect = ev.currentTarget.getBoundingClientRect();
                                setSelectedMenuSegment({
                                    s,
                                    e,
                                    x: rect.left,
                                    y: rect.bottom + 4,
                                    currentStationId: stId
                                });
                            }}
                            title={`Audio Source: ${labelName} [${formatTimelineClock(s, timeMode, { includeSeconds: true })} - ${formatTimelineClock(e, timeMode, { includeSeconds: true })}] — Click to change station`}
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
                        left: `${Math.min(selectedMenuSegment.x, window.innerWidth - 220)}px`,
                        top: `${Math.min(selectedMenuSegment.y, window.innerHeight - 200)}px`
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="menu-header">
                        <span className="menu-icon">🎙️</span>
                        <span>ASSIGN AUDIO SOURCE</span>
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
                        <button
                            type="button"
                            className="btn-menu-split"
                            onClick={() => {
                                onSplitSegment?.(playheadEpoch);
                                setSelectedMenuSegment(null);
                            }}
                        >
                            <span>✂️ SPLIT AT PLAYHEAD</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
