// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/tracks/AudioRoutingTrack.jsx
// Tactical NOC Multi-Track NLE Audio Bus (Fairlight / Premiere Style)
// Supports Vertical Audio Lanes (A1, A2...), Draggable Clip Trimming, Overlap Mixing, and Waveforms
// ==========================================
import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { formatTimelineClock } from '../../../utils/timeFormat.js';
import { setAudioGain } from '../../../utils/audioLevelMonitor.js';
import './AudioRoutingTrack.scss';

const LANE_COLORS = ['#06B6D4', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899', '#3B82F6'];

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
    timeMode = 'LOCAL',
    onUpdateAudioPlan = null
}) {
    const containerRef = useRef(null);

    // Default: Closed / collapsed (26px) with 0 active playback channels initially
    const [isBusExpanded, setIsBusExpanded] = useState(() => {
        try {
            return localStorage.getItem('itb_audio_bus_expanded') === 'true';
        } catch {
            return false;
        }
    });

    const [isMasterMuted, setIsMasterMuted] = useState(false);
    const [selectedMenuClip, setSelectedMenuClip] = useState(null); // { laneId, clipId, s, e, x, y, stationId, gain }
    const [menuGainValue, setMenuGainValue] = useState(1.0);

    // Real-time acoustic volume level from Web Audio AnalyserNode
    const [liveLevel, setLiveLevel] = useState({ rms: 0, peak: 0, db: -60, isPlaying: false });

    useEffect(() => {
        const handleLevel = (e) => {
            if (e.detail) setLiveLevel(e.detail);
        };
        window.addEventListener('itb-live-audio-level', handleLevel);
        return () => window.removeEventListener('itb-live-audio-level', handleLevel);
    }, []);

    const toggleBusExpanded = useCallback(() => {
        setIsBusExpanded(prev => {
            const next = !prev;
            try {
                localStorage.setItem('itb_audio_bus_expanded', String(next));
            } catch {}
            return next;
        });
    }, []);

    // Multi-Lane Architecture State
    const [lanes, setLanes] = useState(() => {
        // Initialize from existing audioPlan if present
        if (audioPlan?.segments && audioPlan.segments.length > 0) {
            return [
                {
                    id: 'A1',
                    name: 'Track A1',
                    isMuted: false,
                    isSolo: false,
                    gain: 1.0,
                    clips: audioPlan.segments.map((s, idx) => ({
                        id: `clip_${idx}_${s.startEpochMs || s.StartEpochMs}`,
                        startEpochMs: s.startEpochMs ?? s.StartEpochMs ?? baseEpochMs,
                        endEpochMs: s.endEpochMs ?? s.EndEpochMs ?? (baseEpochMs + viewportDurationMs),
                        sourceStationId: s.sourceStationId ?? s.SourceStationId ?? (stations[0]?.id || 'station-0'),
                        gain: s.gain ?? s.Gain ?? 1.0
                    }))
                }
            ];
        }

        // Closed/empty by default: 1 lane with no clips (muted)
        return [
            {
                id: 'A1',
                name: 'Track A1',
                isMuted: false,
                isSolo: false,
                gain: 1.0,
                clips: []
            }
        ];
    });

    const playheadEpoch = baseEpochMs + playheadMs;
    const vpStartEpoch = baseEpochMs + viewportStartMs;
    const vpEndEpoch = vpStartEpoch + viewportDurationMs;

    // Synchronize multi-lane state to audioPlan whenever lanes or clips change
    const syncLanesToPlan = useCallback((currentLanes) => {
        if (!onUpdateAudioPlan) return;
        const allClips = [];
        currentLanes.forEach(l => {
            if (l.isMuted || isMasterMuted) return;
            l.clips.forEach(c => {
                allClips.push({
                    startEpochMs: c.startEpochMs,
                    endEpochMs: c.endEpochMs,
                    sourceStationId: c.sourceStationId,
                    gain: c.gain * l.gain
                });
            });
        });
        allClips.sort((a, b) => a.startEpochMs - b.startEpochMs);
        onUpdateAudioPlan({ segments: allClips });
    }, [onUpdateAudioPlan, isMasterMuted]);

    // Add a new Audio Lane (A2, A3...)
    const handleAddLane = useCallback(() => {
        setLanes(prev => {
            const nextLaneNum = prev.length + 1;
            const newLaneId = `A${nextLaneNum}`;
            const newLane = {
                id: newLaneId,
                name: `Track ${newLaneId}`,
                isMuted: false,
                isSolo: false,
                gain: 1.0,
                clips: []
            };
            const updated = [...prev, newLane];
            syncLanesToPlan(updated);
            return updated;
        });
    }, [syncLanesToPlan]);

    // Remove an Audio Lane
    const handleRemoveLane = useCallback((laneId) => {
        setLanes(prev => {
            if (prev.length <= 1) return prev;
            const updated = prev.filter(l => l.id !== laneId);
            syncLanesToPlan(updated);
            return updated;
        });
    }, [syncLanesToPlan]);

    // Toggle Lane Mute / Solo
    const handleToggleLaneMute = useCallback((laneId) => {
        setLanes(prev => {
            const updated = prev.map(l => l.id === laneId ? { ...l, isMuted: !l.isMuted } : l);
            syncLanesToPlan(updated);
            return updated;
        });
    }, [syncLanesToPlan]);

    const handleToggleLaneSolo = useCallback((laneId) => {
        setLanes(prev => {
            const isCurrentlySolo = prev.find(l => l.id === laneId)?.isSolo;
            const updated = prev.map(l => ({
                ...l,
                isSolo: l.id === laneId ? !isCurrentlySolo : false,
                isMuted: l.id === laneId ? false : (!isCurrentlySolo)
            }));
            syncLanesToPlan(updated);
            return updated;
        });
    }, [syncLanesToPlan]);

    // Update Lane Gain
    const handleUpdateLaneGain = useCallback((laneId, newGain) => {
        const val = Math.max(0, Math.min(2.0, Number(newGain)));
        setLanes(prev => {
            const updated = prev.map(l => l.id === laneId ? { ...l, gain: val } : l);
            syncLanesToPlan(updated);
            return updated;
        });
        setAudioGain(val);
    }, [syncLanesToPlan]);

    // Add Clip to Lane
    const handleAddClipToLane = useCallback((laneId, stationId = null, targetStart = null) => {
        const stId = stationId || stations[0]?.id || 'station-0';
        const start = targetStart !== null ? targetStart : playheadEpoch;
        const dur = Math.min(viewportDurationMs, 60000); // 1 minute or viewport duration
        const end = start + dur;

        const newClip = {
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: Math.round(start),
            endEpochMs: Math.round(end),
            sourceStationId: stId,
            gain: 1.0
        };

        setLanes(prev => {
            const updated = prev.map(l => {
                if (l.id === laneId) {
                    return {
                        ...l,
                        clips: [...l.clips, newClip].sort((a, b) => a.startEpochMs - b.startEpochMs)
                    };
                }
                return l;
            });
            syncLanesToPlan(updated);
            return updated;
        });
    }, [playheadEpoch, viewportDurationMs, stations, syncLanesToPlan]);

    // Split Clip at Playhead
    const handleSplitClipAtPlayhead = useCallback((laneId, clipId) => {
        setLanes(prev => {
            const updated = prev.map(l => {
                if (l.id !== laneId) return l;
                const nextClips = [];
                l.clips.forEach(c => {
                    if (c.id === clipId && playheadEpoch > c.startEpochMs + 500 && playheadEpoch < c.endEpochMs - 500) {
                        nextClips.push({ ...c, endEpochMs: playheadEpoch });
                        nextClips.push({
                            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
                            startEpochMs: playheadEpoch,
                            endEpochMs: c.endEpochMs,
                            sourceStationId: c.sourceStationId,
                            gain: c.gain
                        });
                    } else {
                        nextClips.push(c);
                    }
                });
                return { ...l, clips: nextClips };
            });
            syncLanesToPlan(updated);
            return updated;
        });
        setSelectedMenuClip(null);
    }, [playheadEpoch, syncLanesToPlan]);

    // Delete Clip
    const handleDeleteClip = useCallback((laneId, clipId) => {
        setLanes(prev => {
            const updated = prev.map(l => {
                if (l.id !== laneId) return l;
                return { ...l, clips: l.clips.filter(c => c.id !== clipId) };
            });
            syncLanesToPlan(updated);
            return updated;
        });
        setSelectedMenuClip(null);
    }, [syncLanesToPlan]);

    // Change Clip Station
    const handleChangeClipStation = useCallback((laneId, clipId, newStationId) => {
        setLanes(prev => {
            const updated = prev.map(l => {
                if (l.id !== laneId) return l;
                return {
                    ...l,
                    clips: l.clips.map(c => c.id === clipId ? { ...c, sourceStationId: newStationId } : c)
                };
            });
            syncLanesToPlan(updated);
            return updated;
        });
        setSelectedMenuClip(prev => prev ? { ...prev, stationId: newStationId } : null);
    }, [syncLanesToPlan]);

    // Change Clip Gain
    const handleChangeClipGain = useCallback((laneId, clipId, newGain) => {
        const val = Math.max(0, Math.min(2.5, Number(newGain)));
        setMenuGainValue(val);
        setLanes(prev => {
            const updated = prev.map(l => {
                if (l.id !== laneId) return l;
                return {
                    ...l,
                    clips: l.clips.map(c => c.id === clipId ? { ...c, gain: val } : c)
                };
            });
            syncLanesToPlan(updated);
            return updated;
        });
        setAudioGain(val);
    }, [syncLanesToPlan]);

    // Trimming Handles Drag Logic
    const handleTrimDrag = useCallback((ev, laneId, clipId, edge) => {
        ev.preventDefault();
        ev.stopPropagation();
        const startX = ev.clientX;
        const currentLane = lanes.find(l => l.id === laneId);
        const currentClip = currentLane?.clips.find(c => c.id === clipId);
        if (!currentClip) return;

        const origStart = currentClip.startEpochMs;
        const origEnd = currentClip.endEpochMs;

        const handleMouseMove = (moveEv) => {
            const deltaX = moveEv.clientX - startX;
            const containerEl = containerRef.current?.querySelector('.audio-lane-timeline');
            if (!containerEl) return;
            const rect = containerEl.getBoundingClientRect();
            const deltaMs = (deltaX / rect.width) * viewportDurationMs;

            setLanes(prev => prev.map(l => {
                if (l.id !== laneId) return l;
                return {
                    ...l,
                    clips: l.clips.map(c => {
                        if (c.id !== clipId) return c;
                        if (edge === 'start') {
                            const newStart = Math.min(origEnd - 500, origStart + deltaMs);
                            return { ...c, startEpochMs: Math.round(newStart) };
                        } else {
                            const newEnd = Math.max(origStart + 500, origEnd + deltaMs);
                            return { ...c, endEpochMs: Math.round(newEnd) };
                        }
                    })
                };
            }));
        };

        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            setLanes(latest => {
                syncLanesToPlan(latest);
                return latest;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }, [lanes, viewportDurationMs, syncLanesToPlan]);

    // Open context menu for clip
    const handleOpenClipMenu = (ev, laneId, clip) => {
        ev.preventDefault();
        ev.stopPropagation();
        const posX = Math.min(window.innerWidth - 260, Math.max(16, ev.clientX - 40));
        const posY = Math.min(window.innerHeight - 280, Math.max(16, ev.clientY - 200));
        setMenuGainValue(clip.gain || 1.0);
        setSelectedMenuClip({
            laneId,
            clipId: clip.id,
            s: clip.startEpochMs,
            e: clip.endEpochMs,
            x: posX,
            y: posY,
            stationId: clip.sourceStationId,
            gain: clip.gain || 1.0
        });
    };

    // Close menu on outside click or Escape
    useEffect(() => {
        if (!selectedMenuClip) return;
        const handleOutside = () => setSelectedMenuClip(null);
        const handleKeyDown = (e) => { if (e.key === 'Escape') setSelectedMenuClip(null); };
        window.addEventListener('click', handleOutside);
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('click', handleOutside);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedMenuClip]);

    const totalActiveClips = useMemo(() => {
        return lanes.reduce((acc, l) => acc + (l.isMuted ? 0 : l.clips.length), 0);
    }, [lanes]);

    if (!stations || stations.length === 0) return null;

    // -------------------------------------------------------------
    // RENDER: COLLAPSED VIEW (Closed by default, 26px)
    // -------------------------------------------------------------
    if (!isBusExpanded) {
        return (
            <div
                className="audio-routing-track-container is-compact-track"
                ref={containerRef}
                onClick={toggleBusExpanded}
                title="Audio Master Bus is Collapsed. Click to Expand Multi-Track Lanes (Fairlight/Premiere NLE)"
            >
                <div className="audio-track-label collapsed-bus-sidebar">
                    <button type="button" className="btn-expand-bus" title="Expand Audio Master Bus">
                        ▶
                    </button>
                    <span className="audio-icon">🔇</span>
                    <span className="audio-title">AUDIO MASTER BUS</span>
                    <span className="badge-bus-status">
                        {totalActiveClips > 0 ? `${totalActiveClips} CLIPS ACTIVE` : 'MUTED (0 ACTIVE)'}
                    </span>
                    <div className="mini-vu-dot" style={{ background: liveLevel.isPlaying ? '#10B981' : '#64748B' }} />
                </div>
                <div className="audio-track-timeline collapsed-bus-timeline">
                    <div className="collapsed-audio-guide-line" />
                    <span className="collapsed-audio-label">
                        [ 🔇 MASTER AUDIO BUS — CLICK TO EXPAND MULTI-TRACK LANES (A1, A2...) ]
                    </span>
                </div>
            </div>
        );
    }

    // -------------------------------------------------------------
    // RENDER: EXPANDED MULTI-LANE VIEW
    // -------------------------------------------------------------
    return (
        <div className="audio-routing-track-container is-expanded-multitrack" ref={containerRef}>
            {/* Master Header Deck */}
            <div className="audio-bus-master-bar">
                <div className="master-bar-left">
                    <button
                        type="button"
                        className="btn-expand-bus is-open"
                        onClick={toggleBusExpanded}
                        title="Collapse Audio Master Bus"
                    >
                        ▼
                    </button>
                    <span className="audio-icon">🔊</span>
                    <span className="audio-master-title">AUDIO MASTER BUS</span>
                    <span className="badge-lanes-count">{lanes.length} TRACKS</span>

                    <button
                        type="button"
                        className="btn-add-audio-lane"
                        onClick={handleAddLane}
                        title="Add New Audio Lane (A2, A3...)"
                    >
                        ＋ ADD AUDIO LANE
                    </button>
                </div>

                <div className="master-bar-right">
                    {/* Live Acoustic VU Meter Readout */}
                    <div className="master-vu-readout">
                        <span className="vu-db-text">{liveLevel.isPlaying ? `${liveLevel.db.toFixed(1)} dB` : '-∞ dB'}</span>
                        <div className="master-vu-bar-outer">
                            <div
                                className="master-vu-bar-inner"
                                style={{
                                    width: `${Math.min(100, Math.max(0, liveLevel.rms * 120))}%`,
                                    background: liveLevel.db > -3 ? '#F43F5E' : (liveLevel.db > -9 ? '#F59E0B' : '#10B981')
                                }}
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        className={`btn-master-mute ${isMasterMuted ? 'is-muted' : ''}`}
                        onClick={() => setIsMasterMuted(prev => !prev)}
                        title={isMasterMuted ? 'Unmute Master Audio' : 'Mute All Audio Lanes'}
                    >
                        {isMasterMuted ? '🔇 MUTED' : '🔊 MUTE ALL'}
                    </button>
                </div>
            </div>

            {/* Vertical Multi-Lane Tracks (A1, A2, A3...) */}
            <div className="audio-lanes-stack">
                {lanes.map((lane, lIdx) => {
                    const laneColor = LANE_COLORS[lIdx % LANE_COLORS.length];

                    return (
                        <div key={lane.id} className="audio-lane-row">
                            {/* Lane Control Sidebar (180px) */}
                            <div className="audio-lane-sidebar">
                                <div className="lane-badge" style={{ backgroundColor: `${laneColor}26`, borderColor: `${laneColor}80`, color: laneColor }}>
                                    {lane.id}
                                </div>
                                <span className="lane-name-text">{lane.name}</span>

                                <div className="lane-buttons-group">
                                    <button
                                        type="button"
                                        className={`btn-lane-toggle mute-btn ${lane.isMuted ? 'active' : ''}`}
                                        onClick={() => handleToggleLaneMute(lane.id)}
                                        title={lane.isMuted ? 'Unmute Lane' : 'Mute Lane'}
                                    >
                                        M
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn-lane-toggle solo-btn ${lane.isSolo ? 'active' : ''}`}
                                        onClick={() => handleToggleLaneSolo(lane.id)}
                                        title={lane.isSolo ? 'Unsolo Lane' : 'Solo Lane'}
                                    >
                                        S
                                    </button>
                                </div>

                                <div className="lane-gain-control">
                                    <input
                                        type="range"
                                        min="0"
                                        max="2"
                                        step="0.05"
                                        value={lane.gain}
                                        onChange={(e) => handleUpdateLaneGain(lane.id, e.target.value)}
                                        title={`Lane Gain: ${Math.round(lane.gain * 100)}%`}
                                        className="lane-gain-slider"
                                    />
                                    <span className="gain-label-pct">{Math.round(lane.gain * 100)}%</span>
                                </div>

                                {lanes.length > 1 && (
                                    <button
                                        type="button"
                                        className="btn-remove-lane"
                                        onClick={() => handleRemoveLane(lane.id)}
                                        title="Delete Audio Lane"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>

                            {/* Lane Timeline Track Canvas */}
                            <div
                                className="audio-lane-timeline"
                                onDoubleClick={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                                    const clickEpoch = Math.round(vpStartEpoch + ratio * viewportDurationMs);
                                    handleAddClipToLane(lane.id, stations[0]?.id, clickEpoch);
                                }}
                            >
                                {lane.clips.map(clip => {
                                    const s = clip.startEpochMs;
                                    const e = clip.endEpochMs;
                                    const st = stations.find(x => x.id === clip.sourceStationId);
                                    const stationName = st ? (st.displayName || st.hostname || st.id) : clip.sourceStationId;

                                    if (e <= vpStartEpoch || s >= vpEndEpoch) return null;

                                    const clStart = Math.max(vpStartEpoch, s);
                                    const clEnd = Math.min(vpEndEpoch, e);
                                    const leftPct = ((clStart - vpStartEpoch) / viewportDurationMs) * 100;
                                    const widthPct = ((clEnd - clStart) / viewportDurationMs) * 100;
                                    if (widthPct <= 0) return null;

                                    return (
                                        <div
                                            key={clip.id}
                                            className={`audio-clip-block ${lane.isMuted ? 'lane-muted' : ''}`}
                                            style={{
                                                left: `${leftPct}%`,
                                                width: `${widthPct}%`,
                                                borderLeftColor: laneColor
                                            }}
                                            onClick={(ev) => handleOpenClipMenu(ev, lane.id, clip)}
                                            onContextMenu={(ev) => handleOpenClipMenu(ev, lane.id, clip)}
                                            title={`Audio Clip: ${stationName} [${formatTimelineClock(s, timeMode, { includeSeconds: true })} - ${formatTimelineClock(e, timeMode, { includeSeconds: true })}] • Gain: ${Math.round(clip.gain * 100)}%`}
                                        >
                                            {/* Trimming Handle: Left (Cut In) */}
                                            <div
                                                className="trim-handle trim-handle-left"
                                                onMouseDown={(ev) => handleTrimDrag(ev, lane.id, clip.id, 'start')}
                                                title="Drag to trim Clip In-Point"
                                            />

                                            {/* Clip Waveform Envelope Graphic */}
                                            <div className="clip-waveform-graphic">
                                                <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="waveform-svg">
                                                    <path
                                                        d="M0,12 L5,6 L10,18 L15,4 L20,20 L25,8 L30,16 L35,2 L40,22 L45,10 L50,14 L55,5 L60,19 L65,8 L70,16 L75,3 L80,21 L85,9 L90,15 L95,7 L100,12"
                                                        fill="none"
                                                        stroke={laneColor}
                                                        strokeWidth="1.2"
                                                        strokeOpacity="0.85"
                                                    />
                                                </svg>
                                            </div>

                                            {/* Clip Information Bar */}
                                            <div className="clip-info-badge">
                                                <span className="clip-station-name">{stationName}</span>
                                                <span className="clip-gain-tag">{Math.round(clip.gain * 100)}%</span>
                                            </div>

                                            {/* Trimming Handle: Right (Cut Out) */}
                                            <div
                                                className="trim-handle trim-handle-right"
                                                onMouseDown={(ev) => handleTrimDrag(ev, lane.id, clip.id, 'end')}
                                                title="Drag to trim Clip Out-Point"
                                            />
                                        </div>
                                    );
                                })}

                                {/* Empty Lane Insertion Guide */}
                                {lane.clips.length === 0 && (
                                    <div
                                        className="empty-lane-placeholder"
                                        onClick={() => handleAddClipToLane(lane.id, stations[0]?.id, playheadEpoch)}
                                        title="Click to insert audio clip at playhead"
                                    >
                                        <span>＋ CLICK TO INSERT AUDIO CLIP ({lane.name})</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Tactical Floating Context Menu for Audio Clip */}
            {selectedMenuClip && (
                <div
                    className="audio-clip-context-menu"
                    style={{ left: selectedMenuClip.x, top: selectedMenuClip.y }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="menu-header">
                        <span className="menu-title">🎙️ EDIT AUDIO CLIP</span>
                        <button
                            type="button"
                            className="btn-menu-close"
                            onClick={() => setSelectedMenuClip(null)}
                        >
                            ✕
                        </button>
                    </div>

                    <div className="menu-section">
                        <span className="section-label">SOURCE STATION</span>
                        <div className="station-select-grid">
                            {stations.map(st => {
                                const isCurrent = st.id === selectedMenuClip.stationId;
                                return (
                                    <button
                                        key={st.id}
                                        type="button"
                                        className={`btn-station-chip ${isCurrent ? 'is-selected' : ''}`}
                                        onClick={() => handleChangeClipStation(selectedMenuClip.laneId, selectedMenuClip.clipId, st.id)}
                                    >
                                        {st.displayName || st.hostname || st.id}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="menu-section">
                        <div className="section-label-row">
                            <span className="section-label">VOLUME GAIN</span>
                            <span className="gain-val">{Math.round(menuGainValue * 100)}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="2.5"
                            step="0.05"
                            value={menuGainValue}
                            onChange={(e) => handleChangeClipGain(selectedMenuClip.laneId, selectedMenuClip.clipId, e.target.value)}
                            className="menu-gain-slider"
                        />
                    </div>

                    <div className="menu-actions-row">
                        <button
                            type="button"
                            className="btn-menu-action split"
                            onClick={() => handleSplitClipAtPlayhead(selectedMenuClip.laneId, selectedMenuClip.clipId)}
                            title="Split clip at timeline playhead (Ctrl+K)"
                        >
                            ✂️ SPLIT AT PLAYHEAD
                        </button>
                        <button
                            type="button"
                            className="btn-menu-action delete"
                            onClick={() => handleDeleteClip(selectedMenuClip.laneId, selectedMenuClip.clipId)}
                            title="Delete this audio clip"
                        >
                            🗑️ DELETE CLIP
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
