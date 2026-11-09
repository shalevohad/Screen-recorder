// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/tracks/AudioRoutingTrack.jsx
// Tactical NOC Multi-Track NLE Audio Bus (Fairlight / Premiere Style)
// Supports Vertical Audio Lanes (A1, A2...), Draggable Clip Moving & Trimming, Real Waveforms & Discrete Channels
// ==========================================
import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { formatTimelineClock } from '../../../utils/timeFormat.js';
import { setAudioGain } from '../../../utils/audioLevelMonitor.js';
import { waveformStore, generateWaveformSvgPath, generateDualChannelWaveformPaths, AUDIO_CHANNEL_COLORS } from '../../../utils/waveformStore.js';
import './AudioRoutingTrack.scss';

const LANE_COLORS = ['#06B6D4', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899', '#3B82F6'];

/**
 * Sub-component for rendering acoustic waveform according to channel mode:
 * - 'both': Dual-channel view with SYS (top half in #8B5CF6 Violet) and MIC (bottom half in #F59E0B Amber), separated by a subtle centerline.
 * - 'sys': Single-channel view in #8B5CF6 Violet (System Audio / PC Output).
 * - 'mic': Single-channel view in #F59E0B Amber (Microphone Audio / Voice).
 */
function ClipWaveformRenderer({ peaks, channelMode = 'both', effectiveGain = 1.0, isLoadingWaveform = false, laneColor = '#06B6D4' }) {
    const isBoth = channelMode === 'both';
    const isSys = channelMode === 'sys';
    const isMic = channelMode === 'mic';

    const dualPaths = useMemo(() => {
        if (!isBoth || !peaks) return null;
        return generateDualChannelWaveformPaths(peaks, 100, 24, effectiveGain);
    }, [isBoth, peaks, effectiveGain]);

    const singlePath = useMemo(() => {
        if (isBoth || !peaks) return null;
        return generateWaveformSvgPath(peaks, 100, 24, effectiveGain, { yCenter: 12, maxHalfHeight: 10.5 });
    }, [isBoth, peaks, effectiveGain]);

    if (isLoadingWaveform) {
        return (
            <div className="waveform-loading-shimmer" title="Decoding Station Audio Waveform...">
                <div className="shimmer-scanner" />
                <span className="shimmer-text">DECODING AUDIO...</span>
            </div>
        );
    }

    if (isBoth) {
        const sysColor = AUDIO_CHANNEL_COLORS.sys; // #8B5CF6 (Violet)
        const micColor = AUDIO_CHANNEL_COLORS.mic; // #F59E0B (Amber)
        return (
            <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="waveform-svg waveform-svg-dual">
                {/* SYS Channel - Top Half */}
                <path
                    d={dualPaths?.sysPath || 'M 0,6 L 100,6'}
                    fill={sysColor}
                    fillOpacity="0.45"
                    stroke={sysColor}
                    strokeWidth="1.1"
                    strokeOpacity="0.9"
                    className="waveform-sys-path"
                />
                {/* Dividing Centerline */}
                <line
                    x1="0"
                    y1="12"
                    x2="100"
                    y2="12"
                    stroke="rgba(255, 255, 255, 0.22)"
                    strokeWidth="0.8"
                    strokeDasharray="2 2"
                    className="waveform-center-divider"
                />
                {/* MIC Channel - Bottom Half */}
                <path
                    d={dualPaths?.micPath || 'M 0,18 L 100,18'}
                    fill={micColor}
                    fillOpacity="0.45"
                    stroke={micColor}
                    strokeWidth="1.1"
                    strokeOpacity="0.9"
                    className="waveform-mic-path"
                />
            </svg>
        );
    }

    const strokeColor = isSys ? AUDIO_CHANNEL_COLORS.sys : (isMic ? AUDIO_CHANNEL_COLORS.mic : (laneColor || '#06B6D4'));

    return (
        <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="waveform-svg">
            <path
                d={singlePath || generateWaveformSvgPath(peaks, 100, 24, effectiveGain)}
                fill={strokeColor}
                fillOpacity="0.45"
                stroke={strokeColor}
                strokeWidth="1.2"
                strokeOpacity="0.85"
            />
        </svg>
    );
}

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
    onClipMoveDrag,
    onToggleChannelMode,
    vpStartEpoch,
    viewportDurationMs,
    timeMode,
    stationName
}) {
    const [peaks, setPeaks] = useState(() => {
        return waveformStore.get(clip.sourceStationId, clip.startEpochMs, clip.endEpochMs, 250) || null;
    });
    const [isLoadingWaveform, setIsLoadingWaveform] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const abortController = new AbortController();

        const cached = waveformStore.get(clip.sourceStationId, clip.startEpochMs, clip.endEpochMs, 250);
        if (cached) {
            setPeaks(cached);
            setIsLoadingWaveform(false);
            return;
        }

        setPeaks(null);
        setIsLoadingWaveform(true);

        waveformStore.fetchWaveform(clip.sourceStationId, clip.startEpochMs, clip.endEpochMs, abortController.signal, 250)
            .then(res => {
                if (isMounted) {
                    if (res) {
                        setPeaks(res);
                    }
                    setIsLoadingWaveform(false);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setIsLoadingWaveform(false);
                }
            });

        return () => {
            isMounted = false;
            abortController.abort();
        };
    }, [clip.sourceStationId, clip.startEpochMs, clip.endEpochMs]);

    const s = clip.startEpochMs;
    const e = clip.endEpochMs;
    const durMs = Math.max(1, e - s);
    const effectiveGain = (clip.gain || 1.0) * (lane.gain || 1.0);

    const clStart = Math.max(vpStartEpoch, s);
    const clEnd = Math.min(vpStartEpoch + viewportDurationMs, e);
    const leftPct = ((clStart - vpStartEpoch) / viewportDurationMs) * 100;
    const widthPct = ((clEnd - clStart) / viewportDurationMs) * 100;
    if (widthPct <= 0) return null;

    const channelMode = clip.channelMode || lane.channelMode || 'both';
    const fadeInMs = clip.fadeInMs ?? 50;
    const fadeOutMs = clip.fadeOutMs ?? 50;
    const fadeInWidthPct = Math.min(45, (fadeInMs / durMs) * 100);
    const fadeOutWidthPct = Math.min(45, (fadeOutMs / durMs) * 100);

    return (
        <div
            className={`audio-clip-block ${lane.isMuted ? 'lane-muted' : ''} ${isSelected ? 'is-selected' : ''}`}
            style={{
                left: `${leftPct}%`,
                width: `${widthPct}%`,
                borderLeftColor: laneColor
            }}
            onClick={onSelect}
            onMouseDown={(ev) => {
                if (!ev.target.closest('.trim-handle') && !ev.target.closest('.btn-menu-close') && !ev.target.closest('.clip-channel-tag')) {
                    onClipMoveDrag?.(ev);
                }
            }}
            onDoubleClick={onOpenMenu}
            onContextMenu={onOpenMenu}
            title={`Audio Clip: ${stationName} [${channelMode.toUpperCase()}] (${formatTimelineClock(s, timeMode, { includeSeconds: true })} - ${formatTimelineClock(e, timeMode, { includeSeconds: true })})\nGain: ${Math.round(clip.gain * 100)}% • Fade: IN ${fadeInMs}ms / OUT ${fadeOutMs}ms\nDrag body: Move in time • Drag edges: Trim • Click tag: Toggle channel • Double-click: Edit`}
        >
            {/* Trimming Handle: Left (Cut In) */}
            <div
                className="trim-handle trim-handle-left"
                onMouseDown={(ev) => onTrimDrag(ev, 'start')}
                title="Drag to trim Clip In-Point"
            />

            {/* Visual Fade-In Ramp */}
            {fadeInMs > 0 && (
                <div
                    className="clip-fade-ramp fade-in-ramp"
                    style={{ width: `${fadeInWidthPct}%` }}
                    title={`Fade In: ${fadeInMs}ms`}
                >
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="fade-ramp-svg">
                        <polygon points="0,0 100,0 0,100" fill="rgba(6, 182, 212, 0.3)" />
                        <line x1="0" y1="100" x2="100" y2="0" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 2" />
                    </svg>
                </div>
            )}

            {/* Real Acoustic Waveform Envelope Graphic & Loading State */}
            <div className="clip-waveform-graphic">
                <ClipWaveformRenderer
                    peaks={peaks}
                    channelMode={channelMode}
                    effectiveGain={effectiveGain}
                    isLoadingWaveform={isLoadingWaveform}
                    laneColor={laneColor}
                />
            </div>

            {/* Visual Fade-Out Ramp */}
            {fadeOutMs > 0 && (
                <div
                    className="clip-fade-ramp fade-out-ramp"
                    style={{ width: `${fadeOutWidthPct}%` }}
                    title={`Fade Out: ${fadeOutMs}ms`}
                >
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="fade-ramp-svg">
                        <polygon points="0,0 100,0 100,100" fill="rgba(244, 63, 94, 0.3)" />
                        <line x1="0" y1="0" x2="100" y2="100" stroke="#F43F5E" strokeWidth="2" strokeDasharray="3 2" />
                    </svg>
                </div>
            )}

            {/* Clip Information Bar */}
            <div className="clip-info-badge">
                <span className="clip-station-name">{stationName}</span>
                <span
                    className={`clip-channel-tag mode-${channelMode}`}
                    onClick={(ev) => {
                        ev.stopPropagation();
                        onToggleChannelMode?.();
                    }}
                    title={`Channel Mode: ${channelMode.toUpperCase()} (Click to cycle BOTH / SYS / MIC)`}
                >
                    {channelMode.toUpperCase()}
                </span>
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

/**
 * Sub-component for individual aggregated audio clip displayed inside the collapsed Master Bus timeline.
 * Reflects real acoustic waveforms with dual-channel (SYS/MIC) coloring and instant visual fidelity.
 */
function CollapsedMasterAggregatedWaveform({
    masterActiveClips,
    stations,
    vpStartEpoch,
    viewportDurationMs,
    timeMode,
    onExpand
}) {
    const [stationWaveforms, setStationWaveforms] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const abortController = new AbortController();

        const pendingStations = new Set();
        masterActiveClips.forEach(c => {
            if (c.sourceStationId && !waveformStore.get(c.sourceStationId, c.startEpochMs, c.endEpochMs, 200)) {
                pendingStations.add(c);
            }
        });

        if (pendingStations.size > 0) {
            setIsLoading(true);
            const promises = Array.from(pendingStations).map(c => 
                waveformStore.fetchWaveform(c.sourceStationId, c.startEpochMs, c.endEpochMs, abortController.signal, 200)
            );
            Promise.allSettled(promises).then(() => {
                if (isMounted) {
                    setIsLoading(false);
                    setStationWaveforms({});
                }
            });
        }

        return () => {
            isMounted = false;
            abortController.abort();
        };
    }, [masterActiveClips]);

    const channelModes = new Set(masterActiveClips.map(c => c.effectiveChannelMode || 'both'));
    const overallChannelMode = (channelModes.has('both') || (channelModes.has('sys') && channelModes.has('mic')))
        ? 'both'
        : (channelModes.has('sys') ? 'sys' : (channelModes.has('mic') ? 'mic' : 'both'));

    const aggregatedPeaks = useMemo(() => {
        const POINTS = 200;
        const result = new Array(POINTS).fill(0);
        let hasData = false;

        masterActiveClips.forEach(clip => {
            const cached = waveformStore.get(clip.sourceStationId, clip.startEpochMs, clip.endEpochMs, 200);
            if (!cached || !cached.length) return;
            hasData = true;

            const clipStart = clip.startEpochMs;
            const clipDur = clip.endEpochMs - clipStart;
            if (clipDur <= 0) return;

            const gain = typeof clip.effectiveGain === 'number' ? clip.effectiveGain : 1.0;

            for (let i = 0; i < POINTS; i++) {
                const sampleTime = vpStartEpoch + (i / POINTS) * viewportDurationMs;
                if (sampleTime >= clipStart && sampleTime <= clip.endEpochMs) {
                    const relPos = (sampleTime - clipStart) / clipDur;
                    const peakIdx = Math.min(cached.length - 1, Math.max(0, Math.floor(relPos * cached.length)));
                    const val = (cached[peakIdx] || 0) * gain;
                    if (val > result[i]) {
                        result[i] = val;
                    }
                }
            }
        });

        if (!hasData) {
            return new Array(POINTS).fill(0.03);
        }
        return result;
    }, [masterActiveClips, vpStartEpoch, viewportDurationMs, stationWaveforms]);

    const activeStationNames = Array.from(new Set(masterActiveClips.map(c => {
        const st = stations.find(x => x.id === c.sourceStationId);
        return st ? (st.displayName || st.hostname || st.id) : c.sourceStationId;
    }))).join(' + ');

    return (
        <div
            className={`collapsed-master-clip aggregated-mode mode-${overallChannelMode}`}
            style={{
                left: '0%',
                width: '100%',
                borderLeftColor: '#06B6D4'
            }}
            onDoubleClick={onExpand}
            title={`Audio Master Mix: ${activeStationNames} [${overallChannelMode.toUpperCase()}]\nDouble-click to expand multitrack audio lanes`}
        >
            <div className="clip-waveform-graphic">
                <ClipWaveformRenderer
                    peaks={aggregatedPeaks}
                    channelMode={overallChannelMode}
                    effectiveGain={1.0}
                    isLoadingWaveform={isLoading}
                    laneColor="#06B6D4"
                />
            </div>
            <div className="collapsed-clip-info">
                <span className="collapsed-clip-station">
                    {activeStationNames || 'MASTER AUDIO BUS'}
                </span>
                <span className={`clip-channel-tag mode-${overallChannelMode}`}>
                    {overallChannelMode.toUpperCase()}
                </span>
                <span className="collapsed-clip-gain">
                    {masterActiveClips.length} {masterActiveClips.length === 1 ? 'TRACK' : 'TRACKS'} IN MIX
                </span>
            </div>
        </div>
    );
}

function CollapsedMasterClipRenderer({
    clip,
    vpStartEpoch,
    viewportDurationMs,
    timeMode,
    stationName,
    onExpand
}) {
    const [peaks, setPeaks] = useState(() => {
        return waveformStore.get(clip.sourceStationId, clip.startEpochMs, clip.endEpochMs, 200) || null;
    });
    const [isLoadingWaveform, setIsLoadingWaveform] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const abortController = new AbortController();

        const cached = waveformStore.get(clip.sourceStationId, clip.startEpochMs, clip.endEpochMs, 200);
        if (cached) {
            setPeaks(cached);
            setIsLoadingWaveform(false);
            return;
        }

        setPeaks(null);
        setIsLoadingWaveform(true);

        waveformStore.fetchWaveform(clip.sourceStationId, clip.startEpochMs, clip.endEpochMs, abortController.signal, 200)
            .then(res => {
                if (isMounted) {
                    if (res) setPeaks(res);
                    setIsLoadingWaveform(false);
                }
            })
            .catch(() => {
                if (isMounted) setIsLoadingWaveform(false);
            });

        return () => {
            isMounted = false;
            abortController.abort();
        };
    }, [clip.sourceStationId, clip.startEpochMs, clip.endEpochMs]);

    const s = clip.startEpochMs;
    const e = clip.endEpochMs;
    const clStart = Math.max(vpStartEpoch, s);
    const clEnd = Math.min(vpStartEpoch + viewportDurationMs, e);
    const leftPct = ((clStart - vpStartEpoch) / viewportDurationMs) * 100;
    const widthPct = ((clEnd - clStart) / viewportDurationMs) * 100;
    if (widthPct <= 0) return null;

    const channelMode = clip.effectiveChannelMode || 'both';

    return (
        <div
            className={`collapsed-master-clip mode-${channelMode}`}
            style={{
                left: `${leftPct}%`,
                width: `${widthPct}%`,
                borderLeftColor: clip.laneColor
            }}
            onDoubleClick={onExpand}
            title={`Master Audio Bus Stream: ${stationName} [${channelMode.toUpperCase()}] (${formatTimelineClock(s, timeMode, { includeSeconds: true })} - ${formatTimelineClock(e, timeMode, { includeSeconds: true })})\nGain: ${Math.round(clip.effectiveGain * 100)}%\nDouble-click to expand multitrack audio lanes`}
        >
            <div className="clip-waveform-graphic">
                <ClipWaveformRenderer
                    peaks={peaks}
                    channelMode={channelMode}
                    effectiveGain={clip.effectiveGain}
                    isLoadingWaveform={isLoadingWaveform}
                    laneColor={clip.laneColor}
                />
            </div>
            <div className="collapsed-clip-info">
                <span className="collapsed-clip-station">{stationName}</span>
                <span className={`clip-channel-tag mode-${channelMode}`}>{channelMode.toUpperCase()}</span>
                <span className="collapsed-clip-gain">{Math.round(clip.effectiveGain * 100)}%</span>
            </div>
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
    const isDraggingRef = useRef(false);

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
                        id: s.id || `clip_${idx}_${s.startEpochMs || s.StartEpochMs}`,
                        startEpochMs: s.startEpochMs ?? s.StartEpochMs ?? baseEpochMs,
                        endEpochMs: s.endEpochMs ?? s.EndEpochMs ?? (baseEpochMs + viewportDurationMs),
                        sourceStationId: s.sourceStationId ?? s.SourceStationId ?? (stations[0]?.id || 'station-0'),
                        gain: s.gain ?? s.Gain ?? 1.0,
                        channelMode: s.channelMode ?? s.ChannelMode ?? 'both',
                        fadeInMs: s.fadeInMs ?? s.FadeInMs ?? 50,
                        fadeOutMs: s.fadeOutMs ?? s.FadeOutMs ?? 50
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
                clips: [
                    {
                        id: `clip_default_${Date.now()}`,
                        startEpochMs: baseEpochMs,
                        endEpochMs: baseEpochMs + viewportDurationMs,
                        sourceStationId: stations[0]?.id || 'station-0',
                        gain: 1.0,
                        channelMode: 'both',
                        fadeInMs: 50,
                        fadeOutMs: 50
                    }
                ]
            }
        ];
    });

    const [isMasterMuted, setIsMasterMuted] = useState(false);
    const [selectedMenuClip, setSelectedMenuClip] = useState(null);
    const [menuGainValue, setMenuGainValue] = useState(1.0);
    const [menuFadeInValue, setMenuFadeInValue] = useState(50);
    const [menuFadeOutValue, setMenuFadeOutValue] = useState(50);
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

    // Synchronize lanes whenever audioPlan prop updates from outside (project load, server sync, undo/redo)
    useEffect(() => {
        if (isDraggingRef.current) return; // Do not interrupt an active mouse drag operation
        if (!audioPlan?.segments || audioPlan.segments.length === 0) return;

        setLanes(prev => {
            const currentA1 = prev.find(l => l.id === 'A1') || prev[0];
            const updatedClips = audioPlan.segments.map((s, idx) => ({
                id: s.id || `clip_${idx}_${s.startEpochMs || s.StartEpochMs}`,
                startEpochMs: s.startEpochMs ?? s.StartEpochMs ?? baseEpochMs,
                endEpochMs: s.endEpochMs ?? s.EndEpochMs ?? (baseEpochMs + viewportDurationMs),
                sourceStationId: s.sourceStationId ?? s.SourceStationId ?? (stations[0]?.id || 'station-0'),
                gain: s.gain ?? s.Gain ?? 1.0,
                channelMode: s.channelMode ?? s.ChannelMode ?? currentA1?.channelMode ?? 'both',
                fadeInMs: s.fadeInMs ?? s.FadeInMs ?? 50,
                fadeOutMs: s.fadeOutMs ?? s.FadeOutMs ?? 50
            }));

            return [
                {
                    ...(currentA1 || {
                        id: 'A1',
                        name: 'Track A1',
                        isMuted: false,
                        isSolo: false,
                        gain: 1.0,
                        channelMode: 'both'
                    }),
                    clips: updatedClips
                }
            ];
        });
    }, [audioPlan, baseEpochMs, viewportDurationMs, stations]);

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
                    channelMode: c.channelMode || l.channelMode || 'both',
                    fadeInMs: c.fadeInMs ?? 50,
                    fadeOutMs: c.fadeOutMs ?? 50
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
                        channelMode: l.channelMode || 'both',
                        fadeInMs: 50,
                        fadeOutMs: 50
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
            channelMode: laneMode,
            fadeInMs: 50,
            fadeOutMs: 50
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
                            channelMode: c.channelMode || l.channelMode || 'both',
                            fadeInMs: c.fadeInMs ?? 50,
                            fadeOutMs: c.fadeOutMs ?? 50
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

    // Global hotkey: Ctrl+K / Cmd+K splits audio clips at timeline playhead
    useEffect(() => {
        const handleSplitKey = (e) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
                if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
                e.preventDefault();
                e.stopPropagation();
                handleGlobalSplitAtPlayhead();
            }
        };
        window.addEventListener('keydown', handleSplitKey);
        return () => window.removeEventListener('keydown', handleSplitKey);
    }, [handleGlobalSplitAtPlayhead]);

    // Delete Clip
    const handleDeleteClip = useCallback((laneId, clipId) => {
        setLanes(prev => {
            const updated = prev.map(l => {
                if (l.id !== laneId) return l;
                return {
                    ...l,
                    clips: l.clips.filter(c => c.id !== clipId)
                };
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

    // Change Clip Fade In / Fade Out
    const handleChangeClipFade = useCallback((laneId, clipId, type, val) => {
        const num = Math.max(0, Math.min(10000, Math.round(Number(val) || 0)));
        if (type === 'in') setMenuFadeInValue(num);
        else setMenuFadeOutValue(num);

        setLanes(prev => {
            const updated = prev.map(l => {
                if (l.id !== laneId) return l;
                return {
                    ...l,
                    clips: l.clips.map(c => {
                        if (c.id === clipId) {
                            return type === 'in' ? { ...c, fadeInMs: num } : { ...c, fadeOutMs: num };
                        }
                        return c;
                    })
                };
            });
            syncLanesToPlan(updated);
            return updated;
        });
        setSelectedMenuClip(prev => prev ? (type === 'in' ? { ...prev, fadeInMs: num } : { ...prev, fadeOutMs: num }) : null);
    }, [syncLanesToPlan]);

    // Relative Gain Nudge (+10% or -10%)
    const handleNudgeLaneGain = useCallback((laneId, delta) => {
        setLanes(prev => {
            const updated = prev.map(l => {
                if (l.id !== laneId) return l;
                const newGain = Math.max(0, Math.min(2.0, Math.round((l.gain + delta) * 100) / 100));
                return { ...l, gain: newGain };
            });
            syncLanesToPlan(updated);
            return updated;
        });
    }, [syncLanesToPlan]);

    // Drag to Move Entire Clip Along Timeline
    const handleClipMoveDrag = useCallback((ev, laneId, clipId) => {
        ev.preventDefault();
        ev.stopPropagation();
        if (ev.button !== 0) return;

        const lane = lanes.find(l => l.id === laneId);
        const clip = lane?.clips?.find(c => c.id === clipId);
        if (!clip) return;

        isDraggingRef.current = true;
        const startClientX = ev.clientX;
        const initialStart = clip.startEpochMs;
        const initialEnd = clip.endEpochMs;
        const clipDur = initialEnd - initialStart;

        const surfaceEl = ev.currentTarget.closest('.track-surface') ||
                          ev.currentTarget.closest('.audio-track-surface') ||
                          containerRef.current?.querySelector('.track-surface') ||
                          containerRef.current?.querySelector('.audio-track-surface') ||
                          containerRef.current?.querySelector('.audio-lane-timeline');
        if (!surfaceEl) return;
        const rect = surfaceEl.getBoundingClientRect();
        if (!rect || rect.width <= 0) return;

        let hasMoved = false;

        const handleMouseMove = (moveEv) => {
            const dx = moveEv.clientX - startClientX;
            if (Math.abs(dx) > 2) hasMoved = true;
            const deltaMs = (dx / rect.width) * viewportDurationMs;

            let targetStart = Math.round(initialStart + deltaMs);
            let targetEnd = targetStart + clipDur;

            // Snapping tolerance (12px)
            const snapToleranceMs = (12 / rect.width) * viewportDurationMs;

            // Snap to Playhead
            if (Math.abs(targetStart - playheadEpoch) <= snapToleranceMs) {
                targetStart = playheadEpoch;
                targetEnd = targetStart + clipDur;
            } else if (Math.abs(targetEnd - playheadEpoch) <= snapToleranceMs) {
                targetEnd = playheadEpoch;
                targetStart = targetEnd - clipDur;
            }

            // Clamp within timeline bounds
            if (targetStart < baseEpochMs) {
                targetStart = baseEpochMs;
                targetEnd = targetStart + clipDur;
            }

            setLanes(prev => {
                return prev.map(l => {
                    if (l.id !== laneId) return l;
                    return {
                        ...l,
                        clips: l.clips.map(c => c.id === clipId ? { ...c, startEpochMs: targetStart, endEpochMs: targetEnd } : c)
                    };
                });
            });
        };

        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            isDraggingRef.current = false;
            if (hasMoved) {
                setLanes(prev => {
                    syncLanesToPlan(prev);
                    return prev;
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }, [lanes, viewportDurationMs, playheadEpoch, baseEpochMs, syncLanesToPlan]);

    // Trimming Handles Drag Logic
    const handleTrimDrag = useCallback((ev, laneId, clipId, edge) => {
        ev.preventDefault();
        ev.stopPropagation();
        const startX = ev.clientX;
        const currentLane = lanes.find(l => l.id === laneId);
        const currentClip = currentLane?.clips.find(c => c.id === clipId);
        if (!currentClip) return;

        isDraggingRef.current = true;
        const origStart = currentClip.startEpochMs;
        const origEnd = currentClip.endEpochMs;

        const surfaceEl = ev.currentTarget.closest('.track-surface') ||
                          ev.currentTarget.closest('.audio-track-surface') ||
                          containerRef.current?.querySelector('.track-surface') ||
                          containerRef.current?.querySelector('.audio-track-surface') ||
                          containerRef.current?.querySelector('.audio-lane-timeline');
        if (!surfaceEl) return;
        const rect = surfaceEl.getBoundingClientRect();
        if (!rect || rect.width <= 0) return;

        const handleMouseMove = (moveEv) => {
            const deltaX = moveEv.clientX - startX;
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
            isDraggingRef.current = false;
            setLanes(latest => {
                syncLanesToPlan(latest);
                return latest;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }, [lanes, viewportDurationMs, syncLanesToPlan]);

    // Change Clip Channel Mode
    const handleChangeClipChannelMode = useCallback((laneId, clipId, newMode) => {
        setLanes(prev => {
            const updated = prev.map(l => {
                if (l.id !== laneId) return l;
                return {
                    ...l,
                    clips: l.clips.map(c => c.id === clipId ? { ...c, channelMode: newMode } : c)
                };
            });
            syncLanesToPlan(updated);
            return updated;
        });
        setSelectedMenuClip(prev => prev ? { ...prev, channelMode: newMode } : null);
    }, [syncLanesToPlan]);

    // Cycle Clip Channel Mode directly (both -> sys -> mic -> both)
    const handleCycleClipChannelMode = useCallback((laneId, clipId) => {
        const lane = lanes.find(l => l.id === laneId);
        const clip = lane?.clips?.find(c => c.id === clipId);
        if (!clip) return;
        const currentMode = clip.channelMode || lane.channelMode || 'both';
        const modes = ['both', 'sys', 'mic'];
        const nextIdx = (modes.indexOf(currentMode) + 1) % modes.length;
        const nextMode = modes[nextIdx];
        handleChangeClipChannelMode(laneId, clipId, nextMode);
    }, [lanes, handleChangeClipChannelMode]);

    // Open context menu for clip
    const handleOpenClipMenu = (ev, laneId, clip) => {
        ev.preventDefault();
        ev.stopPropagation();
        const menuWidth = 280;
        const menuHeight = 390;
        const posX = Math.max(16, Math.min(window.innerWidth - menuWidth - 16, ev.clientX - (menuWidth / 2)));
        let posY = ev.clientY - menuHeight - 12;
        if (posY < 80) {
            posY = Math.min(window.innerHeight - menuHeight - 16, ev.clientY + 24);
        }
        setMenuGainValue(clip.gain || 1.0);
        setMenuFadeInValue(clip.fadeInMs ?? 50);
        setMenuFadeOutValue(clip.fadeOutMs ?? 50);

        setSelectedMenuClip({
            laneId,
            clipId: clip.id,
            s: clip.startEpochMs,
            e: clip.endEpochMs,
            x: posX,
            y: posY,
            stationId: clip.sourceStationId,
            gain: clip.gain || 1.0,
            channelMode: clip.channelMode || 'both',
            fadeInMs: clip.fadeInMs ?? 50,
            fadeOutMs: clip.fadeOutMs ?? 50
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

    // Master Active Audio Clips Across All Unmuted / Solo Lanes
    const masterActiveClips = useMemo(() => {
        if (isMasterMuted) return [];
        const hasSolo = lanes.some(l => l.isSolo);
        const activeLanes = lanes.filter(l => hasSolo ? l.isSolo : !l.isMuted);

        const result = [];
        activeLanes.forEach(lane => {
            const laneColor = LANE_COLORS[lanes.indexOf(lane) % LANE_COLORS.length];
            lane.clips.forEach(clip => {
                result.push({
                    ...clip,
                    laneId: lane.id,
                    laneName: lane.name,
                    laneColor: laneColor,
                    effectiveChannelMode: clip.channelMode || lane.channelMode || 'both',
                    effectiveGain: (clip.gain || 1.0) * (lane.gain || 1.0)
                });
            });
        });
        return result.sort((a, b) => a.startEpochMs - b.startEpochMs);
    }, [lanes, isMasterMuted]);

    if (!stations || stations.length === 0) return null;

    // -------------------------------------------------------------
    // RENDER: UNIFIED AUDIO TRACK (Matches TimelineTrack 52px height & 230px sidebar)
    // -------------------------------------------------------------
    return (
        <div className="audio-routing-tracks-wrapper" ref={containerRef}>
            {/* Tactical Multi-Track Audio Master Bar */}
            <div className="audio-bus-master-bar">
                <div className="master-bar-left">
                    <span className="audio-icon">{isMasterMuted ? '🔇' : '🔊'}</span>
                    <span className="audio-master-title">AUDIO MASTER BUS</span>
                    <span className="badge-lanes-count">{lanes.length} {lanes.length === 1 ? 'TRACK' : 'TRACKS'}</span>
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
                        title={`Split audio clips at playhead (${formatTimelineClock(playheadEpoch, timeMode, { includeSeconds: true })}) [Ctrl+K]`}
                    >
                        ✂️ SPLIT AT PLAYHEAD
                    </button>
                </div>
                <div className="master-bar-right">
                    <div className="master-vu-readout" title={`Current Master Level: ${liveLevel.db.toFixed(1)} dB`}>
                        <span className="vu-db-text">{liveLevel.db > -55 ? `${liveLevel.db.toFixed(0)} dB` : '-∞ dB'}</span>
                        <div className="master-vu-bar-outer">
                            <div
                                className="master-vu-bar-inner"
                                style={{
                                    width: `${Math.min(100, Math.max(0, (liveLevel.peak || 0) * 100))}%`,
                                    background: liveLevel.peak > 0.85 ? '#F43F5E' : (liveLevel.peak > 0.65 ? '#F59E0B' : '#10B981')
                                }}
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className={`btn-master-mute ${isMasterMuted ? 'is-muted' : ''}`}
                        onClick={() => setIsMasterMuted(prev => !prev)}
                        title={isMasterMuted ? 'Unmute Master Audio' : 'Mute Master Audio'}
                    >
                        {isMasterMuted ? '🔇 MUTED' : '🔊 MUTE'}
                    </button>
                </div>
            </div>

            {lanes.map((lane, lIdx) => {
                const laneColor = LANE_COLORS[lIdx % LANE_COLORS.length];
                const isDragOver = dragOverLaneId === lane.id;
                const activeStation = stations.find(s => s.id === lane.clips[0]?.sourceStationId) || stations[0];
                const activeStationName = activeStation ? (activeStation.displayName || activeStation.hostname || activeStation.id) : (stations[0]?.displayName || 'Station');

                return (
                    <div
                        key={lane.id}
                        className="timeline-track-container audio-routing-track-container station-collapsed-track"
                    >
                        {/* Track Sidebar (230px, 52px height) matching station track layout */}
                        <div
                            className="track-sidebar station-collapsed-sidebar audio-track-sidebar"
                            style={{ borderLeftColor: laneColor }}
                            title={`Audio Track: ${lane.name} • Station: ${activeStationName} [${(lane.channelMode || 'both').toUpperCase()}]`}
                        >
                            <div className={`status-indicator ${lane.isMuted || isMasterMuted ? 'idle' : 'online'}`} title={lane.isMuted ? 'Audio Muted' : 'Audio Active'} />
                            <span className="audio-lane-icon" title="Audio Bus">
                                {lane.isMuted || isMasterMuted ? '🔇' : '🔊'}
                            </span>
                            <span className="audio-lane-tag" style={{ backgroundColor: laneColor }} title={`Lane ${lane.id}`}>
                                {lane.id}
                            </span>

                            {/* Workstation Source Selector */}
                            <div className="audio-station-picker" title="Change Audio Workstation Source">
                                <select
                                    className="audio-station-select"
                                    value={activeStation?.id || ''}
                                    onChange={(e) => handleSetLaneStation(lane.id, e.target.value)}
                                    title="Select source workstation for audio track"
                                >
                                    {stations.map(st => (
                                        <option key={st.id} value={st.id}>
                                            {st.displayName || st.hostname || st.id}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Channel Mode Toggle: SYS \ MIC \ BOTH */}
                            <button
                                type="button"
                                className={`btn-channel-toggle mode-${lane.channelMode || 'both'}`}
                                onClick={() => handleCycleLaneChannelMode(lane.id)}
                                title={`Audio Channel: ${(lane.channelMode || 'both').toUpperCase()} (Click to toggle SYS \\ MIC \\ BOTH)`}
                            >
                                {(lane.channelMode || 'both') === 'both' ? '⚡ BOTH' : ((lane.channelMode || 'both') === 'sys' ? '💻 SYS' : '🎙️ MIC')}
                            </button>

                            {/* Gain Level Controls: Slider + Percentage + Relative Nudges */}
                            <div className="audio-gain-cluster" title={`Master Track Gain: ${Math.round(lane.gain * 100)}%`}>
                                <input
                                    type="range"
                                    min="0"
                                    max="2"
                                    step="0.05"
                                    value={lane.gain}
                                    onChange={(e) => handleUpdateLaneGain(lane.id, e.target.value)}
                                    className="audio-gain-slider"
                                    title={`Track Gain: ${Math.round(lane.gain * 100)}%`}
                                />
                                <span className="gain-pct-badge">{Math.round(lane.gain * 100)}%</span>
                                <button
                                    type="button"
                                    className="btn-gain-nudge btn-gain-down"
                                    onClick={() => handleNudgeLaneGain(lane.id, -0.1)}
                                    title="Decrease Gain (-10%) relative to other sources"
                                >
                                    -
                                </button>
                                <button
                                    type="button"
                                    className="btn-gain-nudge btn-gain-up"
                                    onClick={() => handleNudgeLaneGain(lane.id, 0.1)}
                                    title="Increase Gain (+10%) relative to other sources"
                                >
                                    +
                                </button>
                            </div>

                            {/* Solo & Mute Buttons */}
                            <div className="audio-mute-solo-btns">
                                <button
                                    type="button"
                                    className={`btn-audio-mute ${lane.isMuted ? 'is-active' : ''}`}
                                    onClick={() => handleToggleLaneMute(lane.id)}
                                    title={lane.isMuted ? 'Unmute Track' : 'Mute Track'}
                                >
                                    M
                                </button>
                                <button
                                    type="button"
                                    className={`btn-audio-solo ${lane.isSolo ? 'is-active' : ''}`}
                                    onClick={() => handleToggleLaneSolo(lane.id)}
                                    title={lane.isSolo ? 'Unsolo Track' : 'Solo Track'}
                                >
                                    S
                                </button>
                            </div>

                            {/* Quick Split Razor Button for this Lane */}
                            <button
                                type="button"
                                className="btn-lane-split-razor"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSplitClipAtPlayhead(lane.id, null);
                                }}
                                title={`Split ${lane.id} at playhead (${formatTimelineClock(playheadEpoch, timeMode, { includeSeconds: true })}) [Ctrl+K]`}
                            >
                                ✂️
                            </button>
                        </div>

                        {/* Track Timeline Surface with Draggable & Trimmable Audio Cuts */}
                        <div
                            className={`track-surface audio-track-surface ${isDragOver ? 'is-drag-over' : ''}`}
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
                                        onClipMoveDrag={(ev) => handleClipMoveDrag(ev, lane.id, clip.id)}
                                        onToggleChannelMode={() => handleCycleClipChannelMode(lane.id, clip.id)}
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

            {/* Tactical Floating Context Menu for Audio Clip Rendered via Portal to eliminate clipping */}
            {selectedMenuClip && createPortal(
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
                        <span className="section-label">AUDIO CHANNEL ROUTING</span>
                        <div className="channel-mode-grid">
                            <button
                                type="button"
                                className={`btn-channel-chip mode-both ${selectedMenuClip.channelMode === 'both' ? 'is-selected' : ''}`}
                                onClick={() => handleChangeClipChannelMode(selectedMenuClip.laneId, selectedMenuClip.clipId, 'both')}
                                title="Dual channels: SYS loopback + MIC voice"
                            >
                                BOTH (SYS + MIC)
                            </button>
                            <button
                                type="button"
                                className={`btn-channel-chip mode-sys ${selectedMenuClip.channelMode === 'sys' ? 'is-selected' : ''}`}
                                onClick={() => handleChangeClipChannelMode(selectedMenuClip.laneId, selectedMenuClip.clipId, 'sys')}
                                title="System audio only (PC output loopback)"
                            >
                                SYS (PC AUDIO)
                            </button>
                            <button
                                type="button"
                                className={`btn-channel-chip mode-mic ${selectedMenuClip.channelMode === 'mic' ? 'is-selected' : ''}`}
                                onClick={() => handleChangeClipChannelMode(selectedMenuClip.laneId, selectedMenuClip.clipId, 'mic')}
                                title="Microphone audio only (vocal input)"
                            >
                                MIC (VOICE)
                            </button>
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

                    <div className="menu-section">
                        <div className="section-label-row">
                            <span className="section-label">VOLUME FADE IN / FADE OUT</span>
                            <span className="fade-val">{menuFadeInValue}ms / {menuFadeOutValue}ms</span>
                        </div>
                        <div className="fade-controls-row">
                            <label className="fade-input-group">
                                <span className="fade-input-label">IN</span>
                                <input
                                    type="number"
                                    min="0"
                                    max="5000"
                                    step="25"
                                    value={menuFadeInValue}
                                    onChange={(e) => handleChangeClipFade(selectedMenuClip.laneId, selectedMenuClip.clipId, 'in', e.target.value)}
                                    className="fade-number-input"
                                />
                                <span className="fade-unit">ms</span>
                            </label>
                            <label className="fade-input-group">
                                <span className="fade-input-label">OUT</span>
                                <input
                                    type="number"
                                    min="0"
                                    max="5000"
                                    step="25"
                                    value={menuFadeOutValue}
                                    onChange={(e) => handleChangeClipFade(selectedMenuClip.laneId, selectedMenuClip.clipId, 'out', e.target.value)}
                                    className="fade-number-input"
                                />
                                <span className="fade-unit">ms</span>
                            </label>
                        </div>
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
                </div>,
                document.body
            )}
        </div>
    );
}
