// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Player/StudioVideoFeed.jsx
// ==========================================
import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import NoSignalHero from '../Viewport/overlays/NoSignalHero.jsx';
import PersistentMinimapHud from '../Viewport/overlays/PersistentMinimapHud.jsx';
import { frameStore } from '../../utils/frameStore.js';
import { getAudioSettings } from '../../utils/studioSessionStore.js';
import './StudioVideoFeed.scss';

/**
 * StudioVideoFeed manages seamless dual-player (Ping-Pong) video streaming, frame caching,
 * intelligent gap skipping, preloading, multi-screen Auto-Director, Split Screen, PiP,
 * and 60fps playhead synchronization.
 * 
 * @param {Object} props
 * @param {Object} props.station - Focused station object.
 * @param {number} [props.baseEpochMs=0] - Base Epoch in milliseconds.
 * @param {number} [props.totalDurationMs=3600000] - Total timeline span in milliseconds.
 * @param {number} [props.playheadMs=0] - Active playhead offset.
 * @param {(ms: number) => void} props.setPlayheadMs - Playhead offset updater.
 * @param {boolean} [props.isPlaying=false] - Whether playback is currently running.
 * @param {(playing: boolean) => void} props.setIsPlaying - Playback state updater.
 * @param {number} [props.playbackSpeed=1] - Playback speed multiplier.
 * @param {Object} [props.directorPlan] - Auto-Director cut plan for the station.
 * @param {(stationId: string, epochMs: number, displayId: string) => void} [props.onOverrideDisplay] - Manual override callback.
 * @returns {JSX.Element|null}
 */
export default function StudioVideoFeed({
    station,
    baseEpochMs = 0,
    totalDurationMs = 3600000,
    playheadMs = 0,
    setPlayheadMs,
    isPlaying = false,
    setIsPlaying,
    playbackSpeed = 1,
    _timeMode = 'LOCAL',
    inPointMs = 0,
    outPointMs = 3600000,
    isLooping = true,
    recordingSegments = {},
    globalGaps = [],
    showWatermark = true,
    directorPlan,
    onOverrideDisplay,
    viewMode: propViewMode,
    onViewModeChange,
    isPipSwapped: propIsPipSwapped,
    onPipSwapChange,
    className = ''
}) {
    // References for ping-pong player elements
    const videoRefA = useRef(null);
    const videoRefB = useRef(null);
    const videoRefSecondary = useRef(null);

    const playheadMsRef = useRef(playheadMs);
    const streamStartOffsetMsRef = useRef(playheadMs);
    const lastEmittedMsRef = useRef(playheadMs);
    const isSeekingRef = useRef(false);
    const seekDebounceTimerRef = useRef(null);
    const prevIsPlayingRef = useRef(isPlaying);
    const isSkippingGapRef = useRef(false);

    playheadMsRef.current = playheadMs;

    const stationId = station?.id;
    const hostname = (station && (station.hostname || station.name)) || '';

    // Multi-display detection
    const stationDisplays = useMemo(() => {
        return station?.displays || station?.topology?.displays || [];
    }, [station]);
    const hasMultipleDisplays = stationDisplays.length > 1;

    // View Mode state: 'director' | 'split' | 'pip' | 'mon-0' | 'mon-1' ...
    const [localViewMode, setLocalViewMode] = useState('director');
    const viewMode = propViewMode !== undefined ? propViewMode : localViewMode;
    const setViewMode = useCallback((val) => {
        const next = typeof val === 'function' ? val(viewMode) : val;
        setLocalViewMode(next);
        if (onViewModeChange) onViewModeChange(next);
    }, [viewMode, onViewModeChange]);

    const [localIsPipSwapped, setLocalIsPipSwapped] = useState(false);
    const isPipSwapped = propIsPipSwapped !== undefined ? propIsPipSwapped : localIsPipSwapped;
    const setIsPipSwapped = useCallback((val) => {
        const next = typeof val === 'function' ? val(isPipSwapped) : val;
        setLocalIsPipSwapped(next);
        if (onPipSwapChange) onPipSwapChange(next);
    }, [isPipSwapped, onPipSwapChange]);

    // Current segment from Auto-Director plan
    const activeDirectorSegment = useMemo(() => {
        const plan = directorPlan || station?.directorPlan;
        if (!plan || !plan.segments || plan.segments.length === 0) return null;
        const curr = baseEpochMs + playheadMs;
        return plan.segments.find(s => {
            const start = s.startEpochMs ?? s.StartEpochMs ?? 0;
            const end = s.endEpochMs ?? s.EndEpochMs ?? 0;
            return curr >= start && curr <= end;
        }) || plan.segments[0];
    }, [directorPlan, station?.directorPlan, baseEpochMs, playheadMs]);

    // Active Display calculation based on mode & director plan
    const activeDisplayId = useMemo(() => {
        if (!hasMultipleDisplays) return 'mon-0';
        if (viewMode === 'split' || viewMode === 'pip') {
            const primaryId = (stationDisplays[0]?.displayId ?? 'mon-0').toLowerCase();
            const secondId = (stationDisplays[1]?.displayId ?? 'mon-1').toLowerCase();
            return isPipSwapped ? secondId : primaryId;
        }
        if (viewMode !== 'director') return viewMode.toLowerCase();
        return (activeDirectorSegment?.targetDisplayId ?? activeDirectorSegment?.TargetDisplayId ?? 'mon-0').toLowerCase();
    }, [hasMultipleDisplays, viewMode, activeDirectorSegment, stationDisplays, isPipSwapped]);

    const secondaryDisplayId = useMemo(() => {
        if (!hasMultipleDisplays) return null;
        const other = stationDisplays.find(d => (d.displayId ?? d.DisplayId ?? '').toLowerCase() !== activeDisplayId);
        return other ? (other.displayId ?? other.DisplayId).toLowerCase() : (stationDisplays[1]?.displayId || 'mon-1').toLowerCase();
    }, [hasMultipleDisplays, stationDisplays, activeDisplayId]);

    const isCurrentManualOverride = useMemo(() => {
        if (viewMode !== 'director' && viewMode !== 'split' && viewMode !== 'pip') return true;
        return Boolean(activeDirectorSegment?.isManualOverride ?? activeDirectorSegment?.IsManualOverride);
    }, [viewMode, activeDirectorSegment]);

    const prevDisplayIdRef = useRef(activeDisplayId);

    // Check segments by both station.id and hostname
    const stationSegments = useMemo(() => {
        if (!station) return [];
        return recordingSegments[station.id] ||
            recordingSegments[station.hostname] ||
            station.segments ||
            [];
    }, [station, recordingSegments]);

    const currentEpoch = baseEpochMs + playheadMs;

    // 2-second tolerance window to prevent NO SIGNAL on micro-gaps between chunks
    const isInRecordingSegment = useMemo(() => {
        if (stationSegments.length === 0) return true; // Fail-open: try streaming if segments not yet loaded
        return stationSegments.some(seg => {
            const s = (seg.startEpochMs ?? seg.startEpoch ?? 0) - 2000;
            const e = (seg.endEpochMs ?? seg.endEpoch ?? 0) + 2000;
            return currentEpoch >= s && currentEpoch <= e;
        });
    }, [stationSegments, currentEpoch]);

    const isNoSignalGap = !isInRecordingSegment && stationSegments.length > 0;

    // Ping-Pong playback state management
    const [activeSlot, setActiveSlot] = useState('A'); // 'A' | 'B'
    const [srcA, setSrcA] = useState('');
    const [srcB, setSrcB] = useState('');
    const [secondarySrc, setSecondarySrc] = useState('');
    const [preloadedSegment, setPreloadedSegment] = useState(null);

    const [isVideoRendering, setIsVideoRendering] = useState(false);
    const [isBufferingStall, setIsBufferingStall] = useState(false);

    // Primary frame state
    const [frameResult, setFrameResult] = useState(() => {
        if (!hostname) return null;
        const targetEpochMs = Math.round(baseEpochMs + playheadMs);
        return frameStore.get(hostname, targetEpochMs, activeDisplayId) || null;
    });

    // Secondary frame state for Split/PiP
    const [secondaryFrameResult, setSecondaryFrameResult] = useState(null);

    const activeVideoRef = activeSlot === 'A' ? videoRefA : videoRefB;
    const backgroundVideoRef = activeSlot === 'A' ? videoRefB : videoRefA;

    const applyAudioSettings = useCallback(() => {
        const audio = getAudioSettings();
        if (videoRefA.current) {
            videoRefA.current.volume = audio.volume;
            videoRefA.current.muted = activeSlot !== 'A' || audio.isMuted;
            videoRefA.current.defaultPlaybackRate = playbackSpeed;
            videoRefA.current.playbackRate = playbackSpeed;
        }
        if (videoRefB.current) {
            videoRefB.current.volume = audio.volume;
            videoRefB.current.muted = activeSlot !== 'B' || audio.isMuted;
            videoRefB.current.defaultPlaybackRate = playbackSpeed;
            videoRefB.current.playbackRate = playbackSpeed;
        }
        if (videoRefSecondary.current) {
            videoRefSecondary.current.muted = true; // Secondary display audio muted to prevent echo
            videoRefSecondary.current.defaultPlaybackRate = playbackSpeed;
            videoRefSecondary.current.playbackRate = playbackSpeed;
        }
    }, [activeSlot, playbackSpeed]);

    useEffect(() => {
        const handleAudioChange = (e) => {
            if (e.detail) {
                if (videoRefA.current) videoRefA.current.volume = e.detail.volume;
                if (videoRefB.current) videoRefB.current.volume = e.detail.volume;
            }
        };
        window.addEventListener('itb-audio-state-changed', handleAudioChange);
        return () => window.removeEventListener('itb-audio-state-changed', handleAudioChange);
    }, []);

    useEffect(() => {
        if (videoRefA.current) {
            videoRefA.current.defaultPlaybackRate = playbackSpeed;
            videoRefA.current.playbackRate = playbackSpeed;
        }
        if (videoRefB.current) {
            videoRefB.current.defaultPlaybackRate = playbackSpeed;
            videoRefB.current.playbackRate = playbackSpeed;
        }
        if (videoRefSecondary.current) {
            videoRefSecondary.current.defaultPlaybackRate = playbackSpeed;
            videoRefSecondary.current.playbackRate = playbackSpeed;
        }
    }, [playbackSpeed]);

    // Fetch frame in Pause state or during Scrubbing (Primary Display)
    useEffect(() => {
        if (!stationId || !hostname) return;

        if (isPlaying && isVideoRendering) {
            prevIsPlayingRef.current = true;
            return;
        }

        const wasPlaying = prevIsPlayingRef.current;
        prevIsPlayingRef.current = isPlaying;

        let isMounted = true;
        const abortController = new AbortController();
        const targetEpochMs = Math.round(baseEpochMs + playheadMs);

        const cached = frameStore.get(hostname, targetEpochMs, activeDisplayId);
        if (cached) {
            setFrameResult(cached);
            return;
        }

        // Fast debounce (35ms instead of 200ms) for snappy scrubbing response
        const delayMs = wasPlaying ? 25 : 35;
        const fetchTimer = setTimeout(() => {
            if (!isMounted) return;
            frameStore.fetchFrame(hostname, targetEpochMs, abortController.signal, activeDisplayId).then(res => {
                if (isMounted && res) setFrameResult(res);
            });
        }, delayMs);

        const unsubscribe = frameStore.subscribe((h, e, val, disp) => {
            if (h === hostname && e === targetEpochMs && (!disp || disp === activeDisplayId) && isMounted) {
                setFrameResult(val);
            }
        });

        return () => {
            isMounted = false;
            clearTimeout(fetchTimer);
            abortController.abort();
            unsubscribe();
        };
    }, [stationId, hostname, baseEpochMs, playheadMs, isPlaying, isVideoRendering, activeDisplayId]);

    // Fetch frame for Secondary Display (Split & PiP)
    useEffect(() => {
        if (!hasMultipleDisplays || (viewMode !== 'split' && viewMode !== 'pip') || !secondaryDisplayId) {
            setSecondaryFrameResult(null);
            return;
        }

        let isMounted = true;
        const abortController = new AbortController();
        const targetEpochMs = Math.round(baseEpochMs + playheadMs);

        const cached = frameStore.get(hostname, targetEpochMs, secondaryDisplayId);
        if (cached) {
            setSecondaryFrameResult(cached);
            return;
        }

        const timer = setTimeout(() => {
            if (!isMounted) return;
            frameStore.fetchFrame(hostname, targetEpochMs, abortController.signal, secondaryDisplayId).then(res => {
                if (isMounted && res) setSecondaryFrameResult(res);
            });
        }, 40);

        const unsubscribe = frameStore.subscribe((h, e, val, disp) => {
            if (h === hostname && e === targetEpochMs && (!disp || disp === secondaryDisplayId) && isMounted) {
                setSecondaryFrameResult(val);
            }
        });

        return () => {
            isMounted = false;
            clearTimeout(timer);
            abortController.abort();
            unsubscribe();
        };
    }, [hasMultipleDisplays, viewMode, secondaryDisplayId, stationId, hostname, baseEpochMs, playheadMs]);

    // Build Epoch-based stream URL
    const buildStreamUrl = useCallback((seekMs, dispId = activeDisplayId) => {
        const startEpochVal = Math.round(baseEpochMs);
        const endEpochVal = Math.round(baseEpochMs + totalDurationMs);
        const seekEpochVal = Math.min(endEpochVal, Math.max(startEpochVal, Math.round(baseEpochMs + seekMs)));
        return `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(hostname)}&startEpoch=${startEpochVal}&endEpoch=${endEpochVal}&seekEpoch=${seekEpochVal}&displayId=${encodeURIComponent(dispId)}&_t=${Date.now()}`;
    }, [baseEpochMs, totalDurationMs, hostname, activeDisplayId]);

    // Initialize streaming on Play or Display switch
    useEffect(() => {
        if (!stationId || !hostname) return;

        if (isPlaying && isInRecordingSegment) {
            const currentHead = playheadMsRef.current;
            streamStartOffsetMsRef.current = currentHead;
            lastEmittedMsRef.current = currentHead;
            isSeekingRef.current = false;

            const url = buildStreamUrl(currentHead, activeDisplayId);

            setIsVideoRendering(false);
            setIsBufferingStall(true);
            setActiveSlot('A');
            setSrcA(url);
            setSrcB('');
            setPreloadedSegment(null);

            if ((viewMode === 'split' || viewMode === 'pip') && secondaryDisplayId) {
                setSecondarySrc(buildStreamUrl(currentHead, secondaryDisplayId));
            } else {
                setSecondarySrc('');
            }
        } else if (!isPlaying) {
            if (seekDebounceTimerRef.current) clearTimeout(seekDebounceTimerRef.current);
            isSeekingRef.current = false;
            setSrcA('');
            setSrcB('');
            setSecondarySrc('');
            setPreloadedSegment(null);
            setIsVideoRendering(false);
            setIsBufferingStall(false);
            if (videoRefA.current) videoRefA.current.pause();
            if (videoRefB.current) videoRefB.current.pause();
            if (videoRefSecondary.current) videoRefSecondary.current.pause();
        }
    }, [isPlaying, stationId, hostname, isInRecordingSegment, buildStreamUrl, activeDisplayId, viewMode, secondaryDisplayId]);

    // React to dynamic director display switch while playing
    useEffect(() => {
        if (prevDisplayIdRef.current !== activeDisplayId) {
            prevDisplayIdRef.current = activeDisplayId;
            if (isPlaying && isInRecordingSegment) {
                const currentHead = playheadMsRef.current;
                streamStartOffsetMsRef.current = currentHead;
                const newUrl = buildStreamUrl(currentHead, activeDisplayId);
                setIsVideoRendering(false);
                setIsBufferingStall(true);
                setActiveSlot('A');
                setSrcA(newUrl);
                setSrcB('');
            }
        }
    }, [activeDisplayId, isPlaying, isInRecordingSegment, buildStreamUrl]);

    // Seek while Playing: continue streaming from new target location
    useEffect(() => {
        if (!stationId || !hostname) return;

        const diff = Math.abs(playheadMs - lastEmittedMsRef.current);
        if (!isPlaying || diff < 15) {
            lastEmittedMsRef.current = playheadMs;
            return;
        }

        isSeekingRef.current = true;
        lastEmittedMsRef.current = playheadMs;
        streamStartOffsetMsRef.current = playheadMs;

        if (videoRefA.current) videoRefA.current.pause();
        if (videoRefB.current) videoRefB.current.pause();
        if (videoRefSecondary.current) videoRefSecondary.current.pause();

        setIsVideoRendering(false);
        setIsBufferingStall(true);

        if (seekDebounceTimerRef.current) {
            clearTimeout(seekDebounceTimerRef.current);
        }

        seekDebounceTimerRef.current = setTimeout(() => {
            if (!isInRecordingSegment) {
                setSrcA('');
                setSrcB('');
                setSecondarySrc('');
                setIsBufferingStall(false);
                isSeekingRef.current = false;
                return;
            }

            const targetMs = playheadMsRef.current;
            const newUrl = buildStreamUrl(targetMs, activeDisplayId);
            setActiveSlot('A');
            setSrcA(newUrl);
            setSrcB('');
            setPreloadedSegment(null);

            if ((viewMode === 'split' || viewMode === 'pip') && secondaryDisplayId) {
                setSecondarySrc(buildStreamUrl(targetMs, secondaryDisplayId));
            }
        }, 75);

        return () => {
            if (seekDebounceTimerRef.current) {
                clearTimeout(seekDebounceTimerRef.current);
            }
        };
    }, [playheadMs, isPlaying, stationId, hostname, isInRecordingSegment, buildStreamUrl, activeDisplayId, viewMode, secondaryDisplayId]);

    // Preload engine for next segment
    useEffect(() => {
        if (!isPlaying || !isVideoRendering || stationSegments.length === 0) return;

        const curEpoch = baseEpochMs + playheadMsRef.current;

        const nextSeg = stationSegments
            .map(seg => ({
                start: seg.startEpochMs ?? seg.startEpoch ?? 0,
                end: seg.endEpochMs ?? seg.endEpoch ?? 0
            }))
            .filter(s => s.start > curEpoch + 500)
            .sort((a, b) => a.start - b.start)[0];

        if (nextSeg && (!preloadedSegment || preloadedSegment.start !== nextSeg.start)) {
            const nextStartMs = nextSeg.start - baseEpochMs;
            if (nextStartMs < outPointMs) {
                const nextUrl = buildStreamUrl(nextStartMs, activeDisplayId);
                setPreloadedSegment({ start: nextSeg.start, ms: nextStartMs });

                if (activeSlot === 'A') {
                    setSrcB(nextUrl);
                } else {
                    setSrcA(nextUrl);
                }
            }
        }
    }, [isPlaying, isVideoRendering, playheadMs, baseEpochMs, outPointMs, stationSegments, preloadedSegment, activeSlot, buildStreamUrl, activeDisplayId]);

    // Seamless Ping-Pong transition when active player ends
    const handleActiveVideoEnded = useCallback(() => {
        if (preloadedSegment) {
            const newSlot = activeSlot === 'A' ? 'B' : 'A';
            const targetRef = newSlot === 'A' ? videoRefA : videoRefB;

            setActiveSlot(newSlot);
            streamStartOffsetMsRef.current = preloadedSegment.ms;
            lastEmittedMsRef.current = preloadedSegment.ms;
            setPreloadedSegment(null);

            if (targetRef.current) {
                targetRef.current.play().then(() => {
                    applyAudioSettings();
                }).catch(() => { });
            }
        } else {
            // Reached boundary or loop point
            if (isLooping) {
                setPlayheadMs(inPointMs);
            } else {
                setIsPlaying(false);
            }
        }
    }, [preloadedSegment, activeSlot, applyAudioSettings, isLooping, inPointMs, setPlayheadMs, setIsPlaying]);

    // Synchronize playhead during active playback
    const handleTimeUpdate = useCallback(() => {
        const vid = activeVideoRef.current;
        if (!vid || isSeekingRef.current || !isPlaying || isSkippingGapRef.current) return;

        const videoElapsedMs = vid.currentTime * 1000;
        const newPlayheadMs = Math.round(streamStartOffsetMsRef.current + videoElapsedMs);

        // Gap skip logic
        if (globalGaps && globalGaps.length > 0) {
            const curAbs = baseEpochMs + newPlayheadMs;
            const matchingGap = globalGaps.find(g => curAbs >= g.startEpochMs && curAbs < g.endEpochMs);
            if (matchingGap) {
                isSkippingGapRef.current = true;
                const resumeMs = Math.round(matchingGap.endEpochMs - baseEpochMs) + 10;
                setPlayheadMs(resumeMs);
                setTimeout(() => { isSkippingGapRef.current = false; }, 150);
                return;
            }
        }

        // Loop / In-Out boundary enforcement
        if (newPlayheadMs >= outPointMs) {
            if (isLooping) {
                setPlayheadMs(inPointMs);
            } else {
                setIsPlaying(false);
                setPlayheadMs(outPointMs);
            }
            return;
        }

        lastEmittedMsRef.current = newPlayheadMs;
        setPlayheadMs(newPlayheadMs);
    }, [activeVideoRef, isPlaying, baseEpochMs, globalGaps, outPointMs, isLooping, inPointMs, setPlayheadMs, setIsPlaying]);

    const showBufferingOverlay = isBufferingStall && isPlaying && !isNoSignalGap;

    return (
        <div className={`studio-video-feed-root ${viewMode} ${className}`}>
            {/* Tactical View Mode Switcher Toolbar (Visible when station has > 1 display) */}
            {hasMultipleDisplays && (
                <div className="feed-viewmode-toolbar" onClick={(e) => e.stopPropagation()}>
                    <button
                        type="button"
                        className={`btn-mode ${viewMode === 'director' ? 'active' : ''}`}
                        onClick={() => setViewMode('director')}
                        title="Auto-Director Cut (Switches based on mouse/keystroke activity or manual overrides)"
                    >
                        🎬 DIRECTOR
                    </button>
                    <button
                        type="button"
                        className={`btn-mode ${viewMode === 'split' ? 'active' : ''}`}
                        onClick={() => setViewMode('split')}
                        title="Split Screen: View all station monitors side-by-side"
                    >
                        🔲 SPLIT
                    </button>
                    <button
                        type="button"
                        className={`btn-mode ${viewMode === 'pip' ? 'active' : ''}`}
                        onClick={() => setViewMode('pip')}
                        title="Picture-in-Picture: Hero primary display with floating secondary window"
                    >
                        🪟 PiP
                    </button>
                    <div className="toolbar-divider" />
                    {stationDisplays.map((d, i) => {
                        const id = (d.displayId ?? `mon-${i}`).toLowerCase();
                        return (
                            <button
                                key={id}
                                type="button"
                                className={`btn-mode ${viewMode === id ? 'active' : ''}`}
                                onClick={() => setViewMode(id)}
                                title={`Pin directly to Display ${i + 1} (${id})`}
                            >
                                🖥️ {i + 1}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Tactical Screen Orientation Indicator */}
            {hasMultipleDisplays && (
                <div className={`feed-display-orientation-banner ${isCurrentManualOverride ? 'is-override' : 'is-auto'}`}>
                    <span className="banner-pulse" />
                    <span className="banner-text">
                        {viewMode === 'split' ? '🔲 SPLIT SCREEN (ALL MONITORS)' :
                         viewMode === 'pip' ? `🪟 PiP MODE: ${activeDisplayId.toUpperCase()} (HERO)` :
                         `${isCurrentManualOverride ? '✋ OVERRIDE' : '⚡ AUTO'}: ${activeDisplayId.toUpperCase()}`}
                    </span>
                </div>
            )}

            {/* Main Video Element: Player A */}
            {srcA && (
                <video
                    ref={videoRefA}
                    src={srcA}
                    className="feed-video-element"
                    style={{
                        opacity: isVideoRendering && activeSlot === 'A' ? 1 : 0,
                        zIndex: activeSlot === 'A' ? 3 : 1,
                        pointerEvents: activeSlot === 'A' ? 'auto' : 'none',
                        imageRendering: '-webkit-optimize-contrast',
                        transform: 'translateZ(0)'
                    }}
                    playsInline
                    autoPlay={activeSlot === 'A'}
                    preload="auto"
                    muted={activeSlot !== 'A' || getAudioSettings().isMuted}
                    onCanPlay={() => {
                        applyAudioSettings();
                        if (isPlaying && activeSlot === 'A' && videoRefA.current) {
                            videoRefA.current.play().catch(() => { });
                        }
                    }}
                    onPlaying={() => {
                        if (activeSlot === 'A') {
                            isSeekingRef.current = false;
                            setIsVideoRendering(true);
                            setIsBufferingStall(false);
                            if (videoRefA.current) {
                                videoRefA.current.defaultPlaybackRate = playbackSpeed;
                                videoRefA.current.playbackRate = playbackSpeed;
                            }
                        }
                    }}
                    onWaiting={() => {
                        if (activeSlot === 'A') setIsBufferingStall(true);
                    }}
                    onTimeUpdate={() => {
                        if (activeSlot === 'A') {
                            if (!isVideoRendering && videoRefA.current?.currentTime > 0) {
                                isSeekingRef.current = false;
                                setIsVideoRendering(true);
                                setIsBufferingStall(false);
                                if (videoRefA.current) {
                                    videoRefA.current.defaultPlaybackRate = playbackSpeed;
                                    videoRefA.current.playbackRate = playbackSpeed;
                                }
                            }
                            handleTimeUpdate();
                        }
                    }}
                    onError={() => {
                        if (activeSlot === 'A') {
                            isSeekingRef.current = false;
                            setIsBufferingStall(false);
                            setIsVideoRendering(false);
                        }
                    }}
                    onEnded={() => {
                        if (activeSlot === 'A') handleActiveVideoEnded();
                    }}
                />
            )}

            {/* Main Video Element: Player B (runs in parallel for preloading) */}
            {srcB && (
                <video
                    ref={videoRefB}
                    src={srcB}
                    className="feed-video-element"
                    style={{
                        opacity: isVideoRendering && activeSlot === 'B' ? 1 : 0,
                        zIndex: activeSlot === 'B' ? 3 : 1,
                        pointerEvents: activeSlot === 'B' ? 'auto' : 'none',
                        imageRendering: '-webkit-optimize-contrast',
                        transform: 'translateZ(0)'
                    }}
                    playsInline
                    autoPlay={activeSlot === 'B'}
                    preload="auto"
                    muted={activeSlot !== 'B' || getAudioSettings().isMuted}
                    onCanPlay={() => {
                        applyAudioSettings();
                        if (isPlaying && activeSlot === 'B' && videoRefB.current) {
                            videoRefB.current.play().catch(() => { });
                        }
                    }}
                    onPlaying={() => {
                        if (activeSlot === 'B') {
                            isSeekingRef.current = false;
                            setIsVideoRendering(true);
                            setIsBufferingStall(false);
                            if (videoRefB.current) {
                                videoRefB.current.defaultPlaybackRate = playbackSpeed;
                                videoRefB.current.playbackRate = playbackSpeed;
                            }
                        }
                    }}
                    onWaiting={() => {
                        if (activeSlot === 'B') setIsBufferingStall(true);
                    }}
                    onTimeUpdate={() => {
                        if (activeSlot === 'B') {
                            if (!isVideoRendering && videoRefB.current?.currentTime > 0) {
                                isSeekingRef.current = false;
                                setIsVideoRendering(true);
                                setIsBufferingStall(false);
                                if (videoRefB.current) {
                                    videoRefB.current.defaultPlaybackRate = playbackSpeed;
                                    videoRefB.current.playbackRate = playbackSpeed;
                                }
                            }
                            handleTimeUpdate();
                        }
                    }}
                    onError={() => {
                        if (activeSlot === 'B') {
                            isSeekingRef.current = false;
                            setIsBufferingStall(false);
                            setIsVideoRendering(false);
                        }
                    }}
                    onEnded={() => {
                        if (activeSlot === 'B') handleActiveVideoEnded();
                    }}
                />
            )}

            {/* Static image / No Signal Hero layer (Standard & Director View) */}
            {viewMode !== 'split' && (
                <div
                    className="feed-static-layer"
                    style={{ zIndex: isVideoRendering ? 0 : 2 }}
                >
                    {isNoSignalGap ? (
                        <NoSignalHero isPlaying={isPlaying} />
                    ) : frameResult && frameResult !== 'NO_SIGNAL' ? (
                        <img
                            src={frameResult}
                            className="feed-static-image"
                            alt="Playback Frame"
                            style={{
                                imageRendering: '-webkit-optimize-contrast',
                                transform: 'translateZ(0)'
                            }}
                        />
                    ) : !isPlaying ? (
                        <div className="feed-decode-pending">
                            <span>DECODE PENDING...</span>
                        </div>
                    ) : null}
                </div>
            )}

            {/* Split Screen View: Renders dual monitors side-by-side */}
            {viewMode === 'split' && hasMultipleDisplays && (
                <div className="feed-split-container">
                    <div className="split-pane pane-primary">
                        <div className="split-pane-header">
                            <span>DISPLAY 1 ({activeDisplayId.toUpperCase()})</span>
                        </div>
                        {frameResult && frameResult !== 'NO_SIGNAL' ? (
                            <img src={frameResult} className="split-frame-img" alt="Display 1" />
                        ) : (
                            <div className="split-pane-placeholder">DECODE PENDING...</div>
                        )}
                    </div>
                    <div className="split-pane-divider" />
                    <div className="split-pane pane-secondary">
                        <div className="split-pane-header">
                            <span>DISPLAY 2 ({(secondaryDisplayId || 'MON-1').toUpperCase()})</span>
                        </div>
                        {secondaryFrameResult && secondaryFrameResult !== 'NO_SIGNAL' ? (
                            <img src={secondaryFrameResult} className="split-frame-img" alt="Display 2" />
                        ) : (
                            <div className="split-pane-placeholder">DECODE PENDING...</div>
                        )}
                    </div>
                </div>
            )}

            {/* Picture-in-Picture (PiP) Inset Floating Frame */}
            {viewMode === 'pip' && hasMultipleDisplays && (
                <div 
                    className="feed-pip-overlay"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsPipSwapped(prev => !prev);
                    }}
                    title="Click to swap primary and secondary screens"
                >
                    <div className="pip-header">
                        <span>PiP: {(secondaryDisplayId || 'MON-1').toUpperCase()}</span>
                        <span className="pip-swap-hint">⇄ SWAP</span>
                    </div>
                    {secondaryFrameResult && secondaryFrameResult !== 'NO_SIGNAL' ? (
                        <img src={secondaryFrameResult} className="pip-frame-img" alt="PiP Stream" />
                    ) : (
                        <div className="pip-placeholder">DECODE PENDING...</div>
                    )}
                </div>
            )}

            {/* Buffering Indicator */}
            {showBufferingOverlay && (
                <div className="feed-buffering-overlay">
                    <div className="buffering-glass-card">
                        <div className="radar-spinner-cluster">
                            <div className="spinner-outer-ring" />
                            <div className="spinner-inner-ring" />
                            <div className="spinner-center-dot" />
                        </div>
                        <div className="buffering-meta-stack">
                            <div className="meta-headline">
                                <span className="beacon-pulse" />
                                <span>INITIALIZING STREAM PIPELINE</span>
                            </div>
                            <span className="meta-sub">
                                BUFFERING // {hostname} • {activeDisplayId.toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Persistent Topology Minimap HUD (Clickable to switch displays) */}
            {hasMultipleDisplays && (
                <PersistentMinimapHud
                    displays={stationDisplays}
                    activeDisplayId={activeDisplayId}
                    mode={isCurrentManualOverride ? 'MANUAL' : 'AUTO'}
                    onSelectDisplay={(dispId) => {
                        if (onOverrideDisplay) {
                            onOverrideDisplay(stationId, baseEpochMs + playheadMs, dispId);
                        }
                        setViewMode(dispId);
                    }}
                />
            )}

            {showWatermark && (
                <div className="feed-brand-watermark">
                    <span>ARCHIVE RECORDING // {hostname}</span>
                </div>
            )}
        </div>
    );
}