// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/tracks/AudioRoutingTrack.jsx
// Tactical NOC Multi-Track NLE Audio Bus (Fairlight / Premiere Style)
// Supports Vertical Audio Lanes (A1, A2...), Draggable Clip Trimming, Real Waveforms & Discrete Channels
// ==========================================
import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { formatTimelineClock } from '../../../utils/timeFormat.js';
import { setAudioGain } from '../../../utils/audioLevelMonitor.js';
import { waveformStore, generateWaveformSvgPath } from '../../../utils/waveformStore.js';
import './AudioRoutingTrack.scss';

const LANE_COLORS = ['#06B6D4', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899', '#3B82F6'];

/**
 * Sub-component for individual audio clip with real acoustic waveform envelope
 */
function AudioClipRenderer({
    clip,
    lane,
    laneColor,
    isSelected,
    onSelect,
    onOpenMenu,
    onTrimDrag,
    vpStartEpoch,
    viewportDurationMs,
    timeMode,
    stationName
}) {
    const [peaks, setPeaks] = useState(() => {
        return waveformStore.get(clip.sourceStationId, clip.startEpochMs, clip.endEpochMs) || null;
    });

    useEffect(() => {
        let isMounted = true;
        const abortController = new AbortController();

        const cached = waveformStore.get(clip.sourceStationId, clip.startEpochMs, clip.endEpochMs);
        if (cached) {
            setPeaks(cached);
            return;
        }

        waveformStore.fetchWaveform(clip.sourceStationId, clip.startEpochMs, clip.endEpochMs, abortController.signal, 180)
            .then(res => {
                if (isMounted && res) {
                    setPeaks(res);
                }
            })
            .catch(() => {});

        return () => {
            isMounted = false;
            abortController.abort();
        };
    }, [clip.sourceStationId, clip.startEpochMs, clip.endEpochMs]);

    const s = clip.startEpochMs;
    const e = clip.endEpochMs;
    const effectiveGain = (clip.gain || 1.0) * (lane.gain || 1.0);
    const waveformPath = useMemo(() => {
        return generateWaveformSvgPath(peaks, 100, 24, effectiveGain);
    }, [peaks, effectiveGain]);

    const clStart = Math.max(vpStartEpoch, s);
    const clEnd = Math.min(vpStartEpoch + viewportDurationMs, e);
    const leftPct = ((clStart - vpStartEpoch) / viewportDurationMs) * 100;
    const widthPct = ((clEnd - clStart) / viewportDurationMs) * 100;
    if (widthPct <= 0) return null;

    const channelMode = clip.channelMode || lane.channelMode || 'both';

    return (
        <div
            className={`audio-clip-block ${lane.isMuted ? 'lane-muted' : ''} ${isSelected ? 'is-selected' : ''}`}
            style={{
                left: `${leftPct}%`,
                width: `${widthPct}%`,
                borderLeftColor: laneColor
            }}
            onClick={onSelect}
            onDoubleClick={onOpenMenu}
            onContextMenu={onOpenMenu}
            title={`Audio Clip: ${stationName} [${channelMode.toUpperCase()}] (${formatTimelineClock(s, timeMode, { includeSeconds: true })} - ${formatTimelineClock(e, timeMode, { includeSeconds: true })}) • Gain: ${Math.round(clip.gain * 100)}%`}
        >
            {/* Trimming Handle: Left (Cut In) */}
            <div
                className="trim-handle trim-handle-left"
                onMouseDown={(ev) => onTrimDrag(ev, 'start')}
                title="Drag to trim Clip In-Point"
            />

            {/* Real Acoustic Waveform Envelope Graphic */}
            <div className="clip-waveform-graphic">
                <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="waveform-svg">
                    <path
                        d={waveformPath}
                        fill={laneColor}
                        fillOpacity="0.45"
                        stroke={laneColor}
                        strokeWidth="1.2"
                        strokeOpacity="0.85"
                    />
                </svg>
            </div>

            {/* Clip Information Bar */}
            <div className="clip-info-badge">
                <span className="clip-station-name">{stationName}</span>
                <span className={`clip-channel-tag mode-${channelMode}`}>{channelMode.toUpperCase()}</span>
                <span className="clip-gain-tag">{Math.round(clip.gain * 100)}%</span>
            </div>

            {/* Trimming Handle: Right (Cut Out) */}
            <div
                className="trim-handle trim-handle-right"
                onMouseDown={(ev) => onTrimDrag(ev, 'end')}
                title="Drag to trim Clip Out-Point"
            />
        </div>
    );
}

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
    const [selectedMenuClip, setSelectedMenuClip] = useState(null);
    const [menuGainValue, setMenuGainValue] = useState(1.0);
    const [selectedClipIds, setSelectedClipIds] = useState([]);
    const [dragOverLaneId, setDragOverLaneId] = useState(null);

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
        if (audioPlan?.segments && audioPlan.segments.length > 0) {
            return [
                {
                    id: 'A1',
                    name: 'Track A1',
                    isMuted: false,
                    isSolo: false,
                    gain: 1.0,
                    channelMode: 'both',
                    clips: audioPlan.segments.map((s, idx) => ({
                        id: `clip_${idx}_${s.startEpochMs || s.StartEpochMs}`,
                        startEpochMs: s.startEpochMs ?? s.StartEpochMs ?? baseEpochMs,
                        endEpochMs: s.endEpochMs ?? s.EndEpochMs ?? (baseEpochMs + viewportDurationMs),
                        sourceStationId: s.sourceStationId ?? s.SourceStationId ?? (stations[0]?.id || 'station-0'),
                        gain: s.gain ?? s.Gain ?? 1.0,
                        channelMode: s.channelMode ?? s.ChannelMode ?? 'both'
                    }))
                }
            ];
        }

        return [
            {
                id: 'A1',
                name: 'Track A1',
                isMuted: false,
                isSolo: false,
                gain: 1.0,
                channelMode: 'both',
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
                    gain: c.gain * l.gain,
                    channelMode: c.channelMode || l.channelMode || 'both'
                });
            });
        });
        allClips.sort((a, b) => a.startEpochMs - b.startEpochMs);
        onUpdateAudioPlan({ segments: allClips });
    }, [onUpdateAudioPlan, isMasterMuted]);

    // Broadcast Active Audio Source Playback Event for Viewport & Camera Cards
    useEffect(() => {
        let activeSource = null;
        for (const lane of lanes) {
            if (lane.isMuted || isMasterMuted) continue;
            for (const clip of lane.clips) {
                if (playheadEpoch >= clip.startEpochMs && playheadEpoch <= clip.endEpochMs) {
                    const st = stations.find(s => s.id === clip.sourceStationId);
                    activeSource = {
                        stationId: clip.sourceStationId,
                        stationName: st ? (st.displayName || st.hostname || st.id) : clip.sourceStationId,
                        channelMode: clip.channelMode || lane.channelMode || 'both',
                        gain: clip.gain * lane.gain,
                        isPlaying: liveLevel.isPlaying
                    };
                    break;
                }
            }
            if (activeSource) break;
        }

        window.dispatchEvent(new CustomEvent('itb-active-audio-source', { detail: activeSource }));
    }, [lanes, isMasterMuted, playheadEpoch, stations, liveLevel.isPlaying]);

    // Delete selected audio clips via Delete/Backspace hotkey or custom event
    useEffect(() => {
        const handleDeleteSelectedClips = () => {
            if (selectedClipIds.length === 0) return;
            setLanes(prev => {
                const updated = prev.map(l => ({
                    ...l,
                    clips: l.clips.filter(c => !selectedClipIds.includes(c.id))
                }));
                syncLanesToPlan(updated);
                return updated;
            });
            setSelectedClipIds([]);
            setSelectedMenuClip(null);
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Delete' || e.key === 'Backspace') {
                const target = e.target;
                const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
                if (isTyping) return;
                if (selectedClipIds.length > 0) {
                    e.preventDefault();
                    handleDeleteSelectedClips();
                }
            }
        };

        const handleCustomDelete = () => handleDeleteSelectedClips();
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('itb:studio-delete-selected', handleCustomDelete);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('itb:studio-delete-selected', handleCustomDelete);
        };
    }, [selectedClipIds, syncLanesToPlan]);

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
                channelMode: 'both',
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

    // Cycle Discrete Channel Mode (BOTH -> SYS -> MIC -> BOTH)
    const handleCycleLaneChannelMode = useCallback((laneId) => {
        const modes = ['both', 'sys', 'mic'];
        setLanes(prev => {
            const updated = prev.map(l => {
                if (l.id !== laneId) return l;
                const currentMode = l.channelMode || 'both';
                const nextMode = modes[(modes.indexOf(currentMode) + 1) % modes.length];
                return {
                    ...l,
                    channelMode: nextMode,
                    clips: l.clips.map(c => ({ ...c, channelMode: nextMode }))
                };
            });
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

    // Quick Reassign Station for Lane / Clips
    const handleSetLaneStation = useCallback((laneId, stationId) => {
        if (!stationId) return;
        setLanes(prev => {
            const updated = prev.map(l => {
                if (l.id !== laneId) return l;
                if (l.clips.length === 0) {
                    // Create an initial full-timeline clip if track was empty
                    const fullClip = {
                        id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
                        startEpochMs: baseEpochMs,
                        endEpochMs: baseEpochMs + viewportDurationMs,
                        sourceStationId: stationId,
                        gain: 1.0,
                        channelMode: l.channelMode || 'both'
                    };
                    return { ...l, clips: [fullClip] };
                }
                return {
                    ...l,
                    clips: l.clips.map(c => ({ ...c, sourceStationId: stationId }))
                };
            });
            syncLanesToPlan(updated);
            return updated;
        });
    }, [baseEpochMs, viewportDurationMs, syncLanesToPlan]);

    // Add Clip to Lane
    const handleAddClipToLane = useCallback((laneId, stationId = null, targetStart = null) => {
        const stId = stationId || stations[0]?.id || 'station-0';
        const start = targetStart !== null ? targetStart : playheadEpoch;
        const dur = Math.min(viewportDurationMs, 60000);
        const end = start + dur;

        const targetLane = lanes.find(l => l.id === laneId);
        const laneMode = targetLane?.channelMode || 'both';

        const newClip = {
            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            startEpochMs: Math.round(start),
            endEpochMs: Math.round(end),
            sourceStationId: stId,
            gain: 1.0,
            channelMode: laneMode
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
    }, [lanes, playheadEpoch, viewportDurationMs, stations, syncLanesToPlan]);

    // Split Clip at Playhead
    const handleSplitClipAtPlayhead = useCallback((laneId, clipId = null) => {
        setLanes(prev => {
            const updated = prev.map(l => {
                if (laneId && l.id !== laneId) return l;
                const nextClips = [];
                l.clips.forEach(c => {
                    const matchesTarget = !clipId || c.id === clipId || selectedClipIds.includes(c.id);
                    if (matchesTarget && playheadEpoch > c.startEpochMs + 500 && playheadEpoch < c.endEpochMs - 500) {
                        nextClips.push({ ...c, endEpochMs: playheadEpoch });
                        nextClips.push({
                            id: `clip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
                            startEpochMs: playheadEpoch,
                            endEpochMs: c.endEpochMs,
                            sourceStationId: c.sourceStationId,
                            gain: c.gain,
                            channelMode: c.channelMode || l.channelMode || 'both'
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
    }, [playheadEpoch, selectedClipIds, syncLanesToPlan]);

    // Split any clip intersecting playhead across all active lanes
    const handleGlobalSplitAtPlayhead = useCallback(() => {
        handleSplitClipAtPlayhead(null, null);
    }, [handleSplitClipAtPlayhead]);

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
        const menuWidth = 260;
        const menuHeight = 280;
        const posX = Math.max(16, Math.min(window.innerWidth - menuWidth - 16, ev.clientX - (menuWidth / 2)));
        let posY = ev.clientY - menuHeight - 12;
        if (posY < 140) {
            posY = Math.min(window.innerHeight - menuHeight - 16, ev.clientY + 24);
        }
        setMenuGainValue(clip.gain || 1.0);
        setSelectedMenuClip({
            laneId,
            clipId: clip.id,
            s: clip.startEpochMs,
            e: clip.endEpochMs,
            x: posX,
            y: posY,
            stationId: clip.sourceStationId,
            gain: clip.gain || 1.0,
            channelMode: clip.channelMode || 'both'
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

                    <button
                        type="button"
                        className="btn-split-playhead"
                        onClick={handleGlobalSplitAtPlayhead}
                        title="Split clip at playhead (Ctrl+K / Razor Tool)"
                    >
                        ✂️ SPLIT AT PLAYHEAD
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
                    const activeStation = stations.find(s => s.id === (lane.clips[0]?.sourceStationId || stations[0]?.id));
                    const isDragOver = dragOverLaneId === lane.id;

                    return (
                        <div key={lane.id} className="audio-lane-row">
                            {/* Lane Control Sidebar */}
                            <div className="audio-lane-sidebar">
                                <div className="lane-badge" style={{ backgroundColor: `${laneColor}26`, borderColor: `${laneColor}80`, color: laneColor }}>
                                    {lane.id}
                                </div>
                                <span className="lane-name-text">{lane.name}</span>

                                {/* Channel Mode Selector (BOTH / SYS / MIC) */}
                                <button
                                    type="button"
                                    className={`btn-lane-channel-mode mode-${lane.channelMode || 'both'}`}
                                    onClick={() => handleCycleLaneChannelMode(lane.id)}
                                    title={`Discrete Audio Channel: ${(lane.channelMode || 'both').toUpperCase()} (Click to toggle BOTH / SYS / MIC)`}
                                >
                                    {(lane.channelMode || 'both') === 'mic' ? '🎤 MIC' :
                                     (lane.channelMode || 'both') === 'sys' ? '🔊 SYS' : '🎧 BOTH'}
                                </button>

                                {/* Station Selector Dropdown */}
                                <div className="lane-station-dropdown-wrapper">
                                    <select
                                        className="lane-station-select"
                                        value={activeStation?.id || ''}
                                        onChange={(e) => handleSetLaneStation(lane.id, e.target.value)}
                                        title="Select source workstation for this track / Drop workstation here"
                                    >
                                        {stations.map(st => (
                                            <option key={st.id} value={st.id}>
                                                {st.displayName || st.hostname || st.id}
                                            </option>
                                        ))}
                                    </select>
                                </div>

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

                            {/* Lane Timeline Track Canvas with Drag & Drop */}
                            <div
                                className={`audio-lane-timeline ${isDragOver ? 'is-drag-over' : ''}`}
                                onClick={() => setSelectedClipIds([])}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    e.dataTransfer.dropEffect = 'copy';
                                    if (dragOverLaneId !== lane.id) setDragOverLaneId(lane.id);
                                }}
                                onDragLeave={() => {
                                    if (dragOverLaneId === lane.id) setDragOverLaneId(null);
                                }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setDragOverLaneId(null);
                                    const stId = e.dataTransfer.getData('text/station-id') || e.dataTransfer.getData('text/plain');
                                    if (stId) {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                                        const dropEpoch = Math.round(vpStartEpoch + ratio * viewportDurationMs);
                                        handleAddClipToLane(lane.id, stId, dropEpoch);
                                    }
                                }}
                                onDoubleClick={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                                    const clickEpoch = Math.round(vpStartEpoch + ratio * viewportDurationMs);
                                    handleAddClipToLane(lane.id, stations[0]?.id, clickEpoch);
                                }}
                            >
                                {lane.clips.map(clip => {
                                    const st = stations.find(x => x.id === clip.sourceStationId);
                                    const stationName = st ? (st.displayName || st.hostname || st.id) : clip.sourceStationId;

                                    if (clip.endEpochMs <= vpStartEpoch || clip.startEpochMs >= vpEndEpoch) return null;

                                    return (
                                        <AudioClipRenderer
                                            key={clip.id}
                                            clip={clip}
                                            lane={lane}
                                            laneColor={laneColor}
                                            isSelected={selectedClipIds.includes(clip.id)}
                                            onSelect={(ev) => {
                                                ev.stopPropagation();
                                                if (ev.ctrlKey || ev.metaKey) {
                                                    setSelectedClipIds(prev =>
                                                        prev.includes(clip.id) ? prev.filter(x => x !== clip.id) : [...prev, clip.id]
                                                    );
                                                } else {
                                                    setSelectedClipIds([clip.id]);
                                                }
                                            }}
                                            onOpenMenu={(ev) => handleOpenClipMenu(ev, lane.id, clip)}
                                            onTrimDrag={(ev, edge) => handleTrimDrag(ev, lane.id, clip.id, edge)}
                                            vpStartEpoch={vpStartEpoch}
                                            viewportDurationMs={viewportDurationMs}
                                            timeMode={timeMode}
                                            stationName={stationName}
                                        />
                                    );
                                })}

                                {/* Empty Lane Insertion Guide */}
                                {lane.clips.length === 0 && (
                                    <div
                                        className="empty-lane-placeholder"
                                        onClick={() => handleAddClipToLane(lane.id, stations[0]?.id, playheadEpoch)}
                                        title="Click or drop workstation here to insert audio clip"
                                    >
                                        <span>＋ CLICK OR DRAG WORKSTATION HERE ({lane.name})</span>
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
                        <span className="section-label">SOURCE WORKSTATION</span>
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
