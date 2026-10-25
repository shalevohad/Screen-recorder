// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Player/StudioVideoFeed.jsx
// ==========================================
import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import NoSignalHero from '../Viewport/overlays/NoSignalHero.jsx';
import { frameStore } from '../../utils/frameStore.js';
import { getAudioSettings } from '../../utils/studioSessionStore.js';
import './StudioVideoFeed.scss';

/**
 * StudioVideoFeed manages seamless dual-player (Ping-Pong) video streaming, frame caching,
 * intelligent gap skipping, preloading, and 60fps playhead synchronization.
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
    className = ''
}) {
    // References for ping-pong player elements
    const videoRefA = useRef(null);
    const videoRefB = useRef(null);

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
    const [preloadedSegment, setPreloadedSegment] = useState(null);

    const [isVideoRendering, setIsVideoRendering] = useState(false);
    const [isBufferingStall, setIsBufferingStall] = useState(false);

    const [frameResult, setFrameResult] = useState(() => {
        if (!hostname) return null;
        const targetEpochMs = Math.round(baseEpochMs + playheadMs);
        return frameStore.get(hostname, targetEpochMs) || null;
    });

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
    }, [playbackSpeed]);

    // Fetch frame in Pause state or during Scrubbing
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

        const cached = frameStore.get(hostname, targetEpochMs);
        if (cached) {
            setFrameResult(cached);
            return;
        }

        // Fast debounce (35ms instead of 200ms) for snappy scrubbing response
        const delayMs = wasPlaying ? 25 : 35;
        const fetchTimer = setTimeout(() => {
            if (!isMounted) return;
            frameStore.fetchFrame(hostname, targetEpochMs, abortController.signal).then(res => {
                if (isMounted && res) setFrameResult(res);
            });
        }, delayMs);

        const unsubscribe = frameStore.subscribe((h, e, val) => {
            if (h === hostname && e === targetEpochMs && isMounted) {
                setFrameResult(val);
            }
        });

        return () => {
            isMounted = false;
            clearTimeout(fetchTimer);
            abortController.abort();
            unsubscribe();
        };
    }, [stationId, hostname, baseEpochMs, playheadMs, isPlaying, isVideoRendering]);

    // Build Epoch-based stream URL
    const buildStreamUrl = useCallback((seekMs) => {
        const startEpochVal = Math.round(baseEpochMs);
        const endEpochVal = Math.round(baseEpochMs + totalDurationMs);
        const seekEpochVal = Math.min(endEpochVal, Math.max(startEpochVal, Math.round(baseEpochMs + seekMs)));
        return `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(hostname)}&startEpoch=${startEpochVal}&endEpoch=${endEpochVal}&seekEpoch=${seekEpochVal}&_t=${Date.now()}`;
    }, [baseEpochMs, totalDurationMs, hostname]);

    // Initialize streaming on Play
    useEffect(() => {
        if (!stationId || !hostname) return;

        if (isPlaying && isInRecordingSegment) {
            const currentHead = playheadMsRef.current;
            streamStartOffsetMsRef.current = currentHead;
            lastEmittedMsRef.current = currentHead;
            isSeekingRef.current = false;

            const url = buildStreamUrl(currentHead);

            setIsVideoRendering(false);
            setIsBufferingStall(true);
            setActiveSlot('A');
            setSrcA(url);
            setSrcB('');
            setPreloadedSegment(null);
        } else if (!isPlaying) {
            if (seekDebounceTimerRef.current) clearTimeout(seekDebounceTimerRef.current);
            isSeekingRef.current = false;
            setSrcA('');
            setSrcB('');
            setPreloadedSegment(null);
            setIsVideoRendering(false);
            setIsBufferingStall(false);
            if (videoRefA.current) videoRefA.current.pause();
            if (videoRefB.current) videoRefB.current.pause();
        }
    }, [isPlaying, stationId, hostname, isInRecordingSegment, buildStreamUrl]);

    // Seek while Playing: continue streaming from new target location
    useEffect(() => {
        if (!stationId || !hostname) return;

        // If not playing, or change is from internal smoothTick clock
        const diff = Math.abs(playheadMs - lastEmittedMsRef.current);
        if (!isPlaying || diff < 15) {
            lastEmittedMsRef.current = playheadMs;
            return;
        }

        // External playhead update during playback (timeline click, drag, bookmark, ruler)
        isSeekingRef.current = true;
        lastEmittedMsRef.current = playheadMs;
        streamStartOffsetMsRef.current = playheadMs;

        // Freeze existing video elements immediately to halt outdated audio/video
        if (videoRefA.current) videoRefA.current.pause();
        if (videoRefB.current) videoRefB.current.pause();

        setIsVideoRendering(false);
        setIsBufferingStall(true);

        if (seekDebounceTimerRef.current) {
            clearTimeout(seekDebounceTimerRef.current);
        }

        seekDebounceTimerRef.current = setTimeout(() => {
            if (!isInRecordingSegment) {
                setSrcA('');
                setSrcB('');
                setIsBufferingStall(false);
                isSeekingRef.current = false;
                return;
            }

            const targetMs = playheadMsRef.current;
            const newUrl = buildStreamUrl(targetMs);
            setActiveSlot('A');
            setSrcA(newUrl);
            setSrcB('');
            setPreloadedSegment(null);
        }, 75);

        return () => {
            if (seekDebounceTimerRef.current) {
                clearTimeout(seekDebounceTimerRef.current);
            }
        };
    }, [playheadMs, isPlaying, stationId, hostname, isInRecordingSegment, buildStreamUrl]);

    // Preload engine: Loads next upcoming segment in background player while active player runs
    useEffect(() => {
        if (!isPlaying || !isVideoRendering || stationSegments.length === 0) return;

        const curEpoch = baseEpochMs + playheadMsRef.current;

        // Locate next timeline segment
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
                const nextUrl = buildStreamUrl(nextStartMs);
                setPreloadedSegment({ start: nextSeg.start, ms: nextStartMs });

                // Load into idle background slot
                if (activeSlot === 'A') {
                    setSrcB(nextUrl);
                } else {
                    setSrcA(nextUrl);
                }
            }
        }
    }, [isPlaying, isVideoRendering, stationSegments, baseEpochMs, outPointMs, activeSlot, preloadedSegment, buildStreamUrl]);

    // Smooth 60fps synchronization engine
    useEffect(() => {
        if (!isPlaying || !isVideoRendering) return;

        let rafId = null;
        let syncVideoSec = activeVideoRef.current ? activeVideoRef.current.currentTime : 0;
        let syncWallTime = performance.now();
        let lastEmittedMs = streamStartOffsetMsRef.current + Math.round(syncVideoSec * 1000);

        const smoothTick = () => {
            const video = activeVideoRef.current;
            if (video && !video.paused && !video.ended && !isBufferingStall && !isSkippingGapRef.current && !isSeekingRef.current) {
                const now = performance.now();
                const currentVideoSec = video.currentTime;

                if (Math.abs(currentVideoSec - syncVideoSec) > 0.0005) {
                    syncVideoSec = currentVideoSec;
                    syncWallTime = now;
                }

                const elapsedSec = Math.max(0, (now - syncWallTime) / 1000);
                const rate = video.playbackRate || playbackSpeed || 1;
                const estimatedVideoSec = syncVideoSec + (elapsedSec * rate);

                let calculatedMs = streamStartOffsetMsRef.current + Math.round(estimatedVideoSec * 1000);

                const delta = calculatedMs - lastEmittedMs;
                if (delta < 0 && delta > -300) {
                    calculatedMs = lastEmittedMs;
                }

                // Check out-point boundary
                if (calculatedMs >= outPointMs) {
                    if (isLooping) {
                        lastEmittedMs = inPointMs;
                        streamStartOffsetMsRef.current = inPointMs;
                        lastEmittedMsRef.current = inPointMs;
                        if (video) video.currentTime = 0;
                        syncVideoSec = 0;
                        syncWallTime = performance.now();
                        setPlayheadMs?.(inPointMs);
                    } else {
                        setIsPlaying?.(false);
                        setPlayheadMs?.(outPointMs);
                    }
                    return;
                }

                // Skip recording global gaps
                const curEpoch = baseEpochMs + calculatedMs;
                const activeGlobalGap = globalGaps?.find(g => curEpoch >= g.startEpochMs && curEpoch < g.endEpochMs);
                if (activeGlobalGap) {
                    isSkippingGapRef.current = true;
                    const gapEndMs = activeGlobalGap.endEpochMs - baseEpochMs;
                    setPlayheadMs?.(gapEndMs);
                    streamStartOffsetMsRef.current = gapEndMs;
                    lastEmittedMs = gapEndMs;
                    lastEmittedMsRef.current = gapEndMs;

                    const url = buildStreamUrl(gapEndMs);
                    if (activeSlot === 'A') setSrcA(url);
                    else setSrcB(url);

                    setTimeout(() => { isSkippingGapRef.current = false; }, 300);
                    return;
                }

                if (calculatedMs !== lastEmittedMs) {
                    lastEmittedMs = calculatedMs;
                    lastEmittedMsRef.current = calculatedMs;
                    setPlayheadMs?.(calculatedMs);
                }
            }

            rafId = requestAnimationFrame(smoothTick);
        };

        rafId = requestAnimationFrame(smoothTick);
        return () => {
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [
        isPlaying,
        isVideoRendering,
        isBufferingStall,
        playbackSpeed,
        outPointMs,
        inPointMs,
        isLooping,
        baseEpochMs,
        activeSlot,
        activeVideoRef,
        globalGaps,
        buildStreamUrl,
        setPlayheadMs,
        setIsPlaying
    ]);

    // Seamless zero-millisecond hand-off when active segment ends
    const handleActiveVideoEnded = () => {
        if (isSkippingGapRef.current) return;

        // If next segment is preloaded in background player, transition immediately with 0 buffering
        if (preloadedSegment && backgroundVideoRef.current) {
            const nextMs = preloadedSegment.ms;
            streamStartOffsetMsRef.current = nextMs;
            lastEmittedMsRef.current = nextMs;
            setPlayheadMs?.(nextMs);

            const nextSlot = activeSlot === 'A' ? 'B' : 'A';
            setActiveSlot(nextSlot);
            applyAudioSettings();

            backgroundVideoRef.current.play().catch(e => console.warn('[Video] Preload play:', e));
            setPreloadedSegment(null);
            return;
        }

        // Full loop repetition
        if (isLooping) {
            setPlayheadMs?.(inPointMs);
            streamStartOffsetMsRef.current = inPointMs;
            lastEmittedMsRef.current = inPointMs;
            const url = buildStreamUrl(inPointMs);
            if (activeSlot === 'A') setSrcA(url);
            else setSrcB(url);
        } else {
            setIsPlaying?.(false);
            setPlayheadMs?.(outPointMs);
        }
    };

    if (!station) return null;

    const showBufferingOverlay = isPlaying && isInRecordingSegment && (!isVideoRendering || isBufferingStall);

    return (
        <div className={`studio-video-feed-root ${className}`.trim()}>
            {/* Player A */}
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
                        if (activeSlot === 'A' && !isVideoRendering && videoRefA.current?.currentTime > 0) {
                            isSeekingRef.current = false;
                            setIsVideoRendering(true);
                            setIsBufferingStall(false);
                            if (videoRefA.current) {
                                videoRefA.current.defaultPlaybackRate = playbackSpeed;
                                videoRefA.current.playbackRate = playbackSpeed;
                            }
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

            {/* Player B (runs in parallel for preloading) */}
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
                        if (activeSlot === 'B' && !isVideoRendering && videoRefB.current?.currentTime > 0) {
                            isSeekingRef.current = false;
                            setIsVideoRendering(true);
                            setIsBufferingStall(false);
                            if (videoRefB.current) {
                                videoRefB.current.defaultPlaybackRate = playbackSpeed;
                                videoRefB.current.playbackRate = playbackSpeed;
                            }
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

            {/* Static image / No Signal Hero layer */}
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
                                BUFFERING // {hostname}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {showWatermark && (
                <div className="feed-brand-watermark">
                    <span>ARCHIVE RECORDING // {hostname}</span>
                </div>
            )}
        </div>
    );
}