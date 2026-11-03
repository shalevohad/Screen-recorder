// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/tracks/AudioRoutingTrack.jsx
// Tactical NOC Real-Time Reactive Audio Track with Waveform, Live VU Meter & Gain Control
// ==========================================
import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { formatTimelineClock } from '../../../utils/timeFormat.js';
import { setAudioGain } from '../../../utils/audioLevelMonitor.js';
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
    onChangeSegmentGain,
    onFollowVisualFeed,
    isAutoFollow = false,
    timeMode = 'LOCAL'
}) {
    const containerRef = useRef(null);
    const [selectedMenuSegment, setSelectedMenuSegment] = useState(null);
    const [menuGainValue, setMenuGainValue] = useState(1.0);

    // Track Height: Compact (26px) vs Expanded (74px) with persistent preference
    const [isExpanded, setIsExpanded] = useState(() => {
        try {
            return localStorage.getItem('itb_audio_track_expanded') === 'true';
        } catch {
            return false;
        }
    });

    // Real-time acoustic volume level from Web Audio AnalyserNode (not random)
    const [liveLevel, setLiveLevel] = useState({ rms: 0, peak: 0, db: -60, isPlaying: false });

    useEffect(() => {
        const handleLevel = (e) => {
            if (e.detail) {
                setLiveLevel(e.detail);
            }
        };
        window.addEventListener('itb-live-audio-level', handleLevel);
        return () => window.removeEventListener('itb-live-audio-level', handleLevel);
    }, []);

    const toggleExpanded = useCallback(() => {
        setIsExpanded(prev => {
            const next = !prev;
            try {
                localStorage.setItem('itb_audio_track_expanded', String(next));
            } catch {
                // Ignore storage error
            }
            return next;
        });
    }, []);

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
                sourceStationId: defaultStationId,
                gain: 1.0
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
    const activeGain = currentActiveSegment?.gain ?? currentActiveSegment?.Gain ?? 1.0;

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

    const handleOpenMenu = (ev, s, e, stId, gain = 1.0) => {
        ev.preventDefault();
        ev.stopPropagation();

        const timelineEl = containerRef.current?.querySelector('.audio-track-timeline');
        let clickEpoch = null;
        if (timelineEl) {
            const rect = timelineEl.getBoundingClientRect();
            const ratio = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
            clickEpoch = Math.round(vpStartEpoch + ratio * viewportDurationMs);
        }

        const currentGainVal = (typeof gain === 'number' && gain >= 0) ? gain : 1.0;
        setMenuGainValue(currentGainVal);

        // Strict Viewport Clamping: Prevents menu from ever getting cut off on top, bottom, or sides
        const MENU_WIDTH = 290;
        const MENU_HEIGHT = 440;

        let posX = ev.clientX - 60;
        if (posX + MENU_WIDTH > window.innerWidth - 16) {
            posX = window.innerWidth - MENU_WIDTH - 16;
        }
        if (posX < 16) {
            posX = 16;
        }

        let posY;
        // Pop above click if in the bottom 55% of the screen
        if (ev.clientY > window.innerHeight * 0.45) {
            posY = ev.clientY - MENU_HEIGHT - 12;
        } else {
            posY = ev.clientY + 12;
        }

        if (posY < 16) {
            posY = 16;
        }
        if (posY + MENU_HEIGHT > window.innerHeight - 16) {
            posY = Math.max(16, window.innerHeight - MENU_HEIGHT - 16);
        }

        setSelectedMenuSegment({
            s,
            e,
            x: posX,
            y: posY,
            currentStationId: stId,
            currentGain: currentGainVal,
            clickEpoch
        });
    };

    const handleApplyGainChange = (newGain) => {
        const val = Math.max(0, Math.min(2.5, Number(newGain)));
        setMenuGainValue(val);
        if (selectedMenuSegment) {
            onChangeSegmentGain?.(selectedMenuSegment.s, val);
            setAudioGain(val);
        }
    };

    // Calculate real live bar heights from actual audio RMS & Peak
    const liveBarHeights = useMemo(() => {
        if (!liveLevel.isPlaying || liveLevel.rms < 0.005) {
            return [2, 2, 2, 2]; // Resting silent baseline
        }
        const rms = liveLevel.rms;
        const peak = liveLevel.peak;
        return [
            Math.min(100, Math.max(15, Math.round(rms * 125))),
            Math.min(100, Math.max(22, Math.round(peak * 130))),
            Math.min(100, Math.max(10, Math.round(rms * 105))),
            Math.min(100, Math.max(28, Math.round(peak * 145)))
        ];
    }, [liveLevel]);

    if (!stations || stations.length === 0) return null;

    return (
        <div 
            className={`audio-routing-track-container ${isExpanded ? 'is-expanded-track' : 'is-compact-track'}`} 
            aria-label="Audio Routing Track"
            ref={containerRef}
        >
            {/* 180px Header Cell with Real VU Meter, Active Source, and Expand Toggle */}
            <div className="audio-track-label">
                <div className="label-top-row">
                    <span className="audio-icon">🎙️</span>
                    <span className="audio-title">AUDIO</span>
                    <span 
                        className={`audio-active-badge ${activeStationId === 'MUTE' ? 'is-muted' : 'is-active'}`}
                        title={`Active audio source: ${activeStationName} [${activeStartClock} - ${activeEndClock}] • Gain: ${Math.round(activeGain * 100)}% (${activeGain > 0 ? (20 * Math.log10(activeGain)).toFixed(1) + 'dB' : 'Mute'})`}
                    >
                        {/* Real-time VU Acoustic Indicator Bar */}
                        <div className="badge-live-vu" title={`Real-time Level: ${liveLevel.db.toFixed(1)} dB (RMS: ${Math.round(liveLevel.rms * 100)}%)`}>
                            <span 
                                className="vu-meter-bar" 
                                style={{ 
                                    height: `${Math.min(100, Math.max(10, (liveLevel.rms * 115)))}%`,
                                    background: liveLevel.db > -3 ? '#F43F5E' : (liveLevel.db > -9 ? '#F59E0B' : '#10B981')
                                }} 
                            />
                        </div>
                        <span className="badge-text">{activeStationId === 'MUTE' ? 'MUTED' : activeStationName.toUpperCase()}</span>
                        {activeGain !== 1.0 && (
                            <span className="badge-gain-tag">{Math.round(activeGain * 100)}%</span>
                        )}
                    </span>

                    <div className="audio-track-actions">
                        {/* Height Expand / Collapse Toggle (26px <-> 74px) */}
                        <button
                            type="button"
                            className={`btn-audio-mini-action expand-toggle ${isExpanded ? 'active' : ''}`}
                            onClick={toggleExpanded}
                            title={isExpanded ? 'Collapse Audio Track to Compact (26px)' : 'Expand Audio Track & Waveforms (74px)'}
                        >
                            {isExpanded ? '▲' : '▼'}
                        </button>

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

                {/* Expanded Header Sub-Meter Display */}
                {isExpanded && (
                    <div className="label-bottom-expanded-meter">
                        <div className="vu-scale-container">
                            <span className="vu-db-readout">
                                {liveLevel.isPlaying ? `${liveLevel.db.toFixed(1)} dB` : 'IDLE'}
                            </span>
                            <div className="vu-led-track">
                                <div 
                                    className="vu-led-fill" 
                                    style={{ 
                                        width: `${Math.min(100, Math.max(0, (liveLevel.rms * 120)))}%`,
                                        background: liveLevel.db > -3 ? '#F43F5E' : (liveLevel.db > -9 ? '#F59E0B' : '#10B981')
                                    }} 
                                />
                            </div>
                        </div>
                        <span className="vu-gain-label">
                            MASTER: {Math.round(activeGain * 100)}%
                        </span>
                    </div>
                )}
            </div>

            {/* Timeline surface with Waveforms and Segments */}
            <div className="audio-track-timeline">
                {visibleSegments.map((seg, idx) => {
                    const s = seg.startEpochMs ?? seg.StartEpochMs ?? 0;
                    const e = seg.endEpochMs ?? seg.EndEpochMs ?? 0;
                    const stId = seg.sourceStationId ?? seg.SourceStationId ?? '';
                    const gain = seg.gain ?? seg.Gain ?? 1.0;
                    const st = stations.find(x => x.id === stId);
                    const labelName = st ? (st.displayName || st.hostname || st.id) : (stId === 'MUTE' ? 'MUTED' : stId);

                    const leftPct = Math.max(0, ((s - vpStartEpoch) / viewportDurationMs) * 100);
                    const rightPct = Math.min(100, ((e - vpStartEpoch) / viewportDurationMs) * 100);
                    const widthPct = Math.max(0.1, rightPct - leftPct);

                    const isCurrent = currentActiveSegment && 
                        (currentActiveSegment.startEpochMs ?? currentActiveSegment.StartEpochMs) === s;

                    const gainDbStr = gain > 0 ? (20 * Math.log10(gain)).toFixed(1) + ' dB' : '-∞ dB';

                    return (
                        <div
                            key={`audio_seg_${idx}_${s}`}
                            className={`audio-segment-block ${isCurrent ? 'is-current' : ''} ${stId === 'MUTE' ? 'is-muted' : ''} ${isExpanded ? 'is-expanded' : ''}`}
                            style={{
                                left: `${leftPct}%`,
                                width: `${widthPct}%`
                            }}
                            onClick={(ev) => handleOpenMenu(ev, s, e, stId, gain)}
                            onContextMenu={(ev) => handleOpenMenu(ev, s, e, stId, gain)}
                            title={`Audio Source: ${labelName} [${formatTimelineClock(s, timeMode, { includeSeconds: true })} - ${formatTimelineClock(e, timeMode, { includeSeconds: true })}] • Gain: ${Math.round(gain * 100)}% (${gainDbStr}) — Right-click for Gain Scale & Settings`}
                        >
                            {/* Detailed Acoustic Waveform Display (Mirrored Envelope) */}
                            <div className="audio-segment-waveform-surface">
                                <svg 
                                    className="audio-waveform-svg" 
                                    viewBox="0 0 200 40" 
                                    preserveAspectRatio="none"
                                >
                                    {stId === 'MUTE' || gain === 0 ? (
                                        // Muted flat baseline
                                        <line x1="0" y1="20" x2="200" y2="20" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                                    ) : (
                                        // Realistic Speech & Signal Waveform Peaks (Scaled by Segment Gain)
                                        <g className="waveform-peaks" opacity="0.85">
                                            {/* Symmetrical Amplitude Envelope */}
                                            {Array.from({ length: 50 }).map((_, barIdx) => {
                                                const x = (barIdx / 50) * 200 + 2;
                                                // Seeded deterministic pseudo-acoustic pattern
                                                const seed = (Math.sin((s / 1000) + barIdx * 0.7) * 10000);
                                                const rand = Math.abs(seed - Math.floor(seed));
                                                // Natural speech cadence rhythm modulation
                                                const cadence = Math.sin(barIdx * 0.25) * 0.4 + 0.6;
                                                const rawAmp = (0.15 + rand * 0.85) * cadence;
                                                // Scale directly by user gain!
                                                const amp = Math.min(1.0, rawAmp * gain);
                                                const h = Math.max(2, amp * 18);
                                                const yTop = 20 - h;
                                                const yBottom = 20 + h;

                                                return (
                                                    <line
                                                        key={`wave_bar_${barIdx}`}
                                                        x1={x}
                                                        y1={yTop}
                                                        x2={x}
                                                        y2={yBottom}
                                                        stroke={gain > 1.05 ? '#F59E0B' : (isCurrent ? '#34D399' : '#10B981')}
                                                        strokeWidth="2.5"
                                                        strokeLinecap="round"
                                                        opacity={isCurrent ? 0.95 : 0.75}
                                                    />
                                                );
                                            })}
                                            {/* Center Reference Guide Line */}
                                            <line x1="0" y1="20" x2="200" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeDasharray="2 2" />
                                        </g>
                                    )}
                                </svg>
                            </div>

                            {/* Live Reactive Micro-VU Bars (Reacts strictly to heard sound) */}
                            <div className="audio-wave-anim">
                                <span 
                                    className="bar b1" 
                                    style={{ 
                                        height: isCurrent ? `${liveBarHeights[0]}%` : '20%',
                                        background: liveLevel.db > -4 ? '#F43F5E' : (liveLevel.db > -9 ? '#F59E0B' : '#10B981')
                                    }} 
                                />
                                <span 
                                    className="bar b2" 
                                    style={{ 
                                        height: isCurrent ? `${liveBarHeights[1]}%` : '35%',
                                        background: liveLevel.db > -4 ? '#F43F5E' : (liveLevel.db > -9 ? '#F59E0B' : '#10B981')
                                    }} 
                                />
                                <span 
                                    className="bar b3" 
                                    style={{ 
                                        height: isCurrent ? `${liveBarHeights[2]}%` : '15%',
                                        background: liveLevel.db > -4 ? '#F43F5E' : (liveLevel.db > -9 ? '#F59E0B' : '#10B981')
                                    }} 
                                />
                                <span 
                                    className="bar b4" 
                                    style={{ 
                                        height: isCurrent ? `${liveBarHeights[3]}%` : '40%',
                                        background: liveLevel.db > -4 ? '#F43F5E' : (liveLevel.db > -9 ? '#F59E0B' : '#10B981')
                                    }} 
                                />
                            </div>

                            {/* Label & Details */}
                            <div className="audio-segment-meta-group">
                                <span className="audio-segment-label">
                                    {stId === 'MUTE' ? '🔇 MUTED' : `🎙️ ${labelName.toUpperCase()}`}
                                </span>
                                {gain !== 1.0 && (
                                    <span className={`audio-segment-gain-badge ${gain > 1 ? 'is-boost' : 'is-cut'}`}>
                                        {gain > 1 ? `▲ ${gainDbStr}` : `▼ ${gainDbStr}`} ({Math.round(gain * 100)}%)
                                    </span>
                                )}
                            </div>

                            <span className="audio-segment-time">
                                {Math.round((e - s) / 1000)}s
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Tactical Station Selector & Gain Scale Popover Menu */}
            {selectedMenuSegment && (
                <div 
                    className="audio-segment-context-menu"
                    style={{
                        position: 'fixed',
                        left: `${selectedMenuSegment.x}px`,
                        top: `${selectedMenuSegment.y}px`,
                        width: '290px',
                        maxHeight: 'calc(100vh - 32px)',
                        overflowY: 'auto',
                        zIndex: 99999
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }}
                >
                    <div className="menu-header">
                        <span className="menu-icon">🎚️</span>
                        <span>AUDIO SEGMENT & GAIN CONTROLLER</span>
                        <button 
                            type="button" 
                            className="menu-close-x" 
                            onClick={() => setSelectedMenuSegment(null)}
                            title="Close menu (Esc)"
                            style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '11px' }}
                        >
                            ✕
                        </button>
                    </div>

                    <div className="menu-segment-info">
                        <div className="info-time" title="Segment Start and End Time">
                            ⏱️ {formatTimelineClock(selectedMenuSegment.s, timeMode, { includeSeconds: true })} - {formatTimelineClock(selectedMenuSegment.e, timeMode, { includeSeconds: true })}
                        </div>
                        <div className="info-duration" title="Segment Duration">
                            ⏳ {Math.round((selectedMenuSegment.e - selectedMenuSegment.s) / 1000)}s duration
                        </div>
                    </div>

                    {/* GAIN SCALE & AMPLIFIER SECTION */}
                    <div className="menu-gain-section">
                        <div className="gain-header-row">
                            <span className="gain-label">🔊 VOLUME GAIN SCALE:</span>
                            <span className={`gain-readout ${menuGainValue > 1 ? 'is-boost' : (menuGainValue === 0 ? 'is-mute' : 'is-normal')}`}>
                                {menuGainValue > 1 ? '🚀 ' : (menuGainValue === 0 ? '🔇 ' : '🎚️ ')}
                                {Math.round(menuGainValue * 100)}% ({menuGainValue > 0 ? (20 * Math.log10(menuGainValue)).toFixed(1) + ' dB' : '-∞ dB'})
                            </span>
                        </div>
                        <p className="gain-subtitle">
                            Calibrate volume for this slice. Applied live to playback and encoded into export MP4.
                        </p>

                        {/* Interactive Range Slider */}
                        <div className="gain-slider-wrapper">
                            <input
                                type="range"
                                min="0"
                                max="2.5"
                                step="0.05"
                                value={menuGainValue}
                                onChange={(e) => handleApplyGainChange(e.target.value)}
                                className="gain-range-slider"
                                title={`Adjust Audio Volume Gain: ${Math.round(menuGainValue * 100)}% (${menuGainValue > 0 ? (20 * Math.log10(menuGainValue)).toFixed(1) + ' dB' : '-∞ dB'})`}
                            />
                            <div className="gain-ticks-scale">
                                <span className="tick" onClick={() => handleApplyGainChange(0)} title="Mute (0% / -∞ dB)">0%</span>
                                <span className="tick" onClick={() => handleApplyGainChange(0.5)} title="Cut 50% (-6 dB)">-6dB</span>
                                <span className="tick center" onClick={() => handleApplyGainChange(1.0)} title="Unity Gain (100% / 0 dB)">0dB (100%)</span>
                                <span className="tick" onClick={() => handleApplyGainChange(1.41)} title="Boost +3 dB (141%)">+3dB</span>
                                <span className="tick" onClick={() => handleApplyGainChange(2.0)} title="Boost +6 dB (200%)">+6dB</span>
                                <span className="tick" onClick={() => handleApplyGainChange(2.5)} title="Max Boost +8 dB (250%)">+8dB</span>
                            </div>
                        </div>

                        {/* Quick Gain Presets with Universal Icons & Tooltips */}
                        <div className="gain-presets-row">
                            <button
                                type="button"
                                className={`btn-gain-preset ${menuGainValue === 0 ? 'active' : ''}`}
                                onClick={() => handleApplyGainChange(0)}
                                title="Mute audio on this segment (0% / -∞ dB)"
                            >
                                🔇 Mute
                            </button>
                            <button
                                type="button"
                                className={`btn-gain-preset ${Math.abs(menuGainValue - 0.5) < 0.05 ? 'active' : ''}`}
                                onClick={() => handleApplyGainChange(0.5)}
                                title="Attenuate volume by 50% (-6.0 dB) for loud passages"
                            >
                                🔉 -6 dB
                            </button>
                            <button
                                type="button"
                                className={`btn-gain-preset unity ${Math.abs(menuGainValue - 1.0) < 0.05 ? 'active' : ''}`}
                                onClick={() => handleApplyGainChange(1.0)}
                                title="Reset volume to original unity recording level (100% / 0.0 dB)"
                            >
                                ⚖️ 0 dB (100%)
                            </button>
                            <button
                                type="button"
                                className={`btn-gain-preset ${Math.abs(menuGainValue - 1.41) < 0.05 ? 'active' : ''}`}
                                onClick={() => handleApplyGainChange(1.41)}
                                title="Boost volume by 141% (+3.0 dB) for clearer speech"
                            >
                                🔊 +3 dB
                            </button>
                            <button
                                type="button"
                                className={`btn-gain-preset ${Math.abs(menuGainValue - 2.0) < 0.05 ? 'active' : ''}`}
                                onClick={() => handleApplyGainChange(2.0)}
                                title="Double volume (+6.0 dB / 200%) for quiet microphones"
                            >
                                🚀 +6 dB
                            </button>
                        </div>
                    </div>

                    {/* ASSIGN AUDIO SOURCE */}
                    <div className="menu-stations-list">
                        <div className="sub-header">🖥️ ROUTE AUDIO FROM WORKSTATION:</div>
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
                                    title={`Route live audio from ${name} during this segment`}
                                >
                                    <span className="dot" />
                                    <span className="name">🖥️ {name}</span>
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
                            title="Mute all workstation audio during this segment"
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
                                title="Split this audio block at the clicked time to route different stations or gains"
                            >
                                <span>✂️ SPLIT AT CLICK ({formatTimelineClock(selectedMenuSegment.clickEpoch, timeMode, { includeSeconds: true })})</span>
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
                                title="Split this audio block at the current playhead position"
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
