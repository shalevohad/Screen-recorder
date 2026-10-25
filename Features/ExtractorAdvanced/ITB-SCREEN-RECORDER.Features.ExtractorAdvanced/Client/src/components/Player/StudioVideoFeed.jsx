// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Player/StudioVideoFeed.jsx
// ==========================================
import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import NoSignalHero from '../Viewport/overlays/NoSignalHero.jsx';
import { frameStore } from '../../utils/frameStore.js';
import { getAudioSettings } from '../../utils/studioSessionStore.js';
import './StudioVideoFeed.scss';

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
    // רפרנסים לשני נגני ה-Ping-Pong
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

    // 💡 תיקון קריטי 1: בדיקת מקטעים לפי station.id וגם לפי hostname
    const stationSegments = useMemo(() => {
        if (!station) return [];
        return recordingSegments[station.id] ||
            recordingSegments[station.hostname] ||
            station.segments ||
            [];
    }, [station, recordingSegments]);

    const currentEpoch = baseEpochMs + playheadMs;

    // 💡 תיקון קריטי 2: חלון סבילות של 2 שניות למניעת NO SIGNAL במיקרו-פערים בין צ'אנקים
    const isInRecordingSegment = useMemo(() => {
        if (stationSegments.length === 0) return true; // Fail-open: אם טרם נטענו סגמנטים, מנסים להזרים ולא נועלים ישר
        return stationSegments.some(seg => {
            const s = (seg.startEpochMs ?? seg.startEpoch ?? 0) - 2000;
            const e = (seg.endEpochMs ?? seg.endEpoch ?? 0) + 2000;
            return currentEpoch >= s && currentEpoch <= e;
        });
    }, [stationSegments, currentEpoch]);

    const isNoSignalGap = !isInRecordingSegment && stationSegments.length > 0;

    // ניהול מצב ה-Ping-Pong
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

    // שליפת פריים במצב Pause או בעת דילוג/Scrubbing
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

        // 💡 תגובה סופר-מהירה (35ms במקום 200ms) לשיפור מהירות ה-Scrubbing והזזת הפלייהד
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

    // בניית URL מבוסס Epoch
    const buildStreamUrl = useCallback((seekMs) => {
        const startEpochVal = Math.round(baseEpochMs);
        const endEpochVal = Math.round(baseEpochMs + totalDurationMs);
        const seekEpochVal = Math.min(endEpochVal, Math.max(startEpochVal, Math.round(baseEpochMs + seekMs)));
        return `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(hostname)}&startEpoch=${startEpochVal}&endEpoch=${endEpochVal}&seekEpoch=${seekEpochVal}&_t=${Date.now()}`;
    }, [baseEpochMs, totalDurationMs, hostname]);

    // 💡 אתחול הזרמה בעת לחיצה על Play
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

    // 💡 מעבר מיקום ה-Playhead תוך כדי ניגון (Seek while Playing) והמשך ניגון מהנקודה החדשה
    useEffect(() => {
        if (!stationId || !hostname) return;

        // אם לא מנגנים, או שהשינוי נובע מפעימה פנימית רגילה של smoothTick
        const diff = Math.abs(playheadMs - lastEmittedMsRef.current);
        if (!isPlaying || diff < 15) {
            lastEmittedMsRef.current = playheadMs;
            return;
        }

        // שינוי חיצוני ב-Playhead בזמן ניגון (לחיצה על ציר הזמן, גרירה, Bookmark, Ruler וכו')
        isSeekingRef.current = true;
        lastEmittedMsRef.current = playheadMs;
        streamStartOffsetMsRef.current = playheadMs;

        // הקפאת הנגנים הישנים מיידית כדי שלא ימשיכו לנגן אודיו או וידאו ישן
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

    // 💡 מנוע Preload חכם: טוען את המקטע הבא לנגן הרקע בזמן שהנגן הראשי מנגן
    useEffect(() => {
        if (!isPlaying || !isVideoRendering || stationSegments.length === 0) return;

        const curEpoch = baseEpochMs + playheadMsRef.current;

        // איתור המקטע הבא בציר הזמן
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

                // טעינה לתוך הסלוט הפנוי ברקע
                if (activeSlot === 'A') {
                    setSrcB(nextUrl);
                } else {
                    setSrcA(nextUrl);
                }
            }
        }
    }, [isPlaying, isVideoRendering, stationSegments, baseEpochMs, outPointMs, activeSlot, preloadedSegment, buildStreamUrl]);

    // 💡 מנוע סנכרון חלק ב-60fps
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

                // בדיקת סיום טווח החיתוך
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

                // דילוג על פערי הקלטה (Global Gaps)
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

    // 💡 החלפה חלקה באפס מילי-שניות (Seamless Hand-off) בסיום המקטע
    const handleActiveVideoEnded = () => {
        if (isSkippingGapRef.current) return;

        // אם המקטע הבא כבר טעון בנגן הרקע - מעבירים אליו את הניגון מיד ללא שום Buffering!
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

        // במקרה של לולאה מלאה
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
            {/* 💡 נגן A */}
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

            {/* 💡 נגן B (מופעל במקביל לצורך Preloading) */}
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

            {/* שכבת תמונה סטטית / No Signal Hero */}
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

            {/* חיווי טעינה / Buffering */}
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