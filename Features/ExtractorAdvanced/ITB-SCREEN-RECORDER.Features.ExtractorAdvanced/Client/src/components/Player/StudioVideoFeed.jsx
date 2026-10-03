// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Player/StudioVideoFeed.jsx
// ==========================================
import React, { useRef, useState, useEffect, useCallback } from 'react';
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
    timeMode = 'LOCAL',
    inPointMs = 0,
    outPointMs = 3600000,
    isLooping = true,
    recordingSegments = {},
    globalGaps = [],
    showWatermark = true,
    className = ''
}) {
    const videoRef = useRef(null);
    const playheadMsRef = useRef(playheadMs);
    const streamStartOffsetMsRef = useRef(playheadMs);
    const prevIsPlayingRef = useRef(isPlaying);
    const isSkippingGapRef = useRef(false);

    playheadMsRef.current = playheadMs;

    // 💡 שימוש במזהים פרימיטיביים למניעת רינדורי-סרק ושבירת רפרנסים
    const stationId = station?.id;
    const hostname = (station && (station.hostname || station.name)) || '';
    const stationSegments = (station && (recordingSegments[station.id] || station.segments)) || [];

    const currentEpoch = baseEpochMs + playheadMs;
    const isInRecordingSegment = stationSegments.some(seg => {
        const s = seg.startEpochMs ?? seg.startEpoch ?? 0;
        const e = seg.endEpochMs ?? seg.endEpoch ?? 0;
        return currentEpoch >= s && currentEpoch <= e;
    });

    const isNoSignalGap = !isInRecordingSegment;

    const [streamSrc, setStreamSrc] = useState('');
    const [isVideoRendering, setIsVideoRendering] = useState(false);
    const [isBufferingStall, setIsBufferingStall] = useState(false);

    const [frameResult, setFrameResult] = useState(() => {
        if (!hostname) return null;
        const targetEpochMs = Math.round(baseEpochMs + playheadMs);
        return frameStore.get(hostname, targetEpochMs) || null;
    });

    const applyAudioSettings = useCallback(() => {
        if (!videoRef.current) return;
        const audio = getAudioSettings();
        videoRef.current.volume = audio.volume;
        videoRef.current.muted = audio.isMuted;
    }, []);

    useEffect(() => {
        const handleAudioChange = (e) => {
            if (videoRef.current && e.detail) {
                videoRef.current.volume = e.detail.volume;
                videoRef.current.muted = e.detail.isMuted;
            }
        };
        window.addEventListener('itb-audio-state-changed', handleAudioChange);
        return () => window.removeEventListener('itb-audio-state-changed', handleAudioChange);
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = playbackSpeed;
        }
    }, [playbackSpeed]);

    // 💡 שליפת פריים: תלוי ב-stationId ו-hostname ולא באובייקט station כולו
    useEffect(() => {
        if (!stationId || !hostname) return;

        if (isPlaying) {
            prevIsPlayingRef.current = true;
            return;
        }

        const wasPlaying = prevIsPlayingRef.current;
        prevIsPlayingRef.current = false;

        let isMounted = true;
        const abortController = new AbortController();
        const targetEpochMs = Math.round(baseEpochMs + playheadMs);

        const cached = frameStore.get(hostname, targetEpochMs);
        if (cached) {
            setFrameResult(cached);
            return;
        }

        const delayMs = wasPlaying ? 50 : 350;
        const fetchTimer = setTimeout(() => {
            if (!isMounted) return;
            frameStore.fetchFrame(hostname, targetEpochMs, abortController.signal).then(res => {
                if (isMounted && res) {
                    setFrameResult(res);
                }
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
    }, [stationId, hostname, baseEpochMs, playheadMs, isPlaying]);

    // 💡 הפעלת הווידאו: נמנעת מפירוק הווידאו כשתחנות אחרות מתעדכנות
    useEffect(() => {
        if (!stationId || !hostname) return;

        if (isPlaying && isInRecordingSegment) {
            const currentHead = playheadMsRef.current;
            streamStartOffsetMsRef.current = currentHead;

            const startEpochVal = Math.round(baseEpochMs);
            const endEpochVal = Math.round(baseEpochMs + totalDurationMs);
            const seekEpochVal = Math.min(endEpochVal, Math.max(startEpochVal, Math.round(baseEpochMs + currentHead)));

            const url = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(hostname)}&startEpoch=${startEpochVal}&endEpoch=${endEpochVal}&seekEpoch=${seekEpochVal}&speed=1&_t=${Date.now()}`;

            setIsVideoRendering(false);
            setIsBufferingStall(false);
            setStreamSrc(url);
        } else if (!isPlaying) {
            setStreamSrc('');
            setIsVideoRendering(false);
            setIsBufferingStall(false);
            if (videoRef.current) {
                videoRef.current.pause();
            }
        }
    }, [isPlaying, stationId, hostname, baseEpochMs, totalDurationMs, isInRecordingSegment]);

    // 💡 מנוע סנכרון חלק ב-60fps עם פילטר מונוטוני למניעת קפיצות אחורה
    useEffect(() => {
        if (!isPlaying || !streamSrc || !isVideoRendering) return;

        let rafId = null;
        let syncVideoSec = videoRef.current ? videoRef.current.currentTime : 0;
        let syncWallTime = performance.now();
        let lastEmittedMs = streamStartOffsetMsRef.current + Math.round(syncVideoSec * 1000);

        const smoothTick = () => {
            const video = videoRef.current;
            if (video && !video.paused && !video.ended && !isBufferingStall && !isSkippingGapRef.current) {
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

                // פילטר מונוטוני: מניעת תנודות אחורה מתיקוני A/V sync (עד 300ms)
                const delta = calculatedMs - lastEmittedMs;
                if (delta < 0 && delta > -300) {
                    calculatedMs = lastEmittedMs;
                }

                // בדיקת סיום טווח החיתוך (Out Point)
                if (calculatedMs >= outPointMs) {
                    if (isLooping) {
                        lastEmittedMs = inPointMs;
                        streamStartOffsetMsRef.current = inPointMs;
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

                    const startEpochVal = Math.round(baseEpochMs);
                    const endEpochVal = Math.round(baseEpochMs + totalDurationMs);
                    const seekEpochVal = Math.min(endEpochVal, Math.max(startEpochVal, Math.round(baseEpochMs + gapEndMs)));
                    const url = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(hostname)}&startEpoch=${startEpochVal}&endEpoch=${endEpochVal}&seekEpoch=${seekEpochVal}&speed=1&_t=${Date.now()}`;

                    setIsVideoRendering(false);
                    setStreamSrc(url);

                    setTimeout(() => { isSkippingGapRef.current = false; }, 300);
                    return;
                }

                if (calculatedMs !== lastEmittedMs) {
                    lastEmittedMs = calculatedMs;
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
        streamSrc,
        isVideoRendering,
        isBufferingStall,
        playbackSpeed,
        outPointMs,
        inPointMs,
        isLooping,
        baseEpochMs,
        totalDurationMs,
        hostname,
        globalGaps,
        setPlayheadMs,
        setIsPlaying
    ]);

    const handleVideoEnded = () => {
        if (isSkippingGapRef.current) return;
        const curEpoch = baseEpochMs + playheadMsRef.current;

        const nextSeg = stationSegments
            .map(seg => ({ start: seg.startEpochMs ?? seg.startEpoch ?? 0, end: seg.endEpochMs ?? seg.endEpoch ?? 0 }))
            .filter(s => s.start > curEpoch + 200)
            .sort((a, b) => a.start - b.start)[0];

        if (nextSeg && (nextSeg.start - baseEpochMs) < outPointMs) {
            isSkippingGapRef.current = true;
            const nextMs = nextSeg.start - baseEpochMs;
            setPlayheadMs?.(nextMs);
            streamStartOffsetMsRef.current = nextMs;

            const startEpochVal = Math.round(baseEpochMs);
            const endEpochVal = Math.round(baseEpochMs + totalDurationMs);
            const seekEpochVal = Math.min(endEpochVal, Math.max(startEpochVal, Math.round(baseEpochMs + nextMs)));
            const url = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(hostname)}&startEpoch=${startEpochVal}&endEpoch=${endEpochVal}&seekEpoch=${seekEpochVal}&speed=1&_t=${Date.now()}`;

            setIsVideoRendering(false);
            setStreamSrc(url);

            setTimeout(() => { isSkippingGapRef.current = false; }, 300);
            return;
        }

        if (isLooping) {
            setPlayheadMs?.(inPointMs);
            setIsPlaying?.(true);
        } else {
            setIsPlaying?.(false);
            setPlayheadMs?.(outPointMs);
        }
    };

    if (!station) return null;

    const showBufferingOverlay = isPlaying && isInRecordingSegment && (!isVideoRendering || isBufferingStall);

    return (
        <div className={`studio-video-feed-root ${className}`.trim()}>
            {streamSrc && (
                <video
                    ref={videoRef}
                    src={streamSrc}
                    className="feed-video-element"
                    style={{
                        opacity: isVideoRendering ? 1 : 0,
                        zIndex: isVideoRendering ? 3 : 1
                    }}
                    playsInline
                    autoPlay
                    muted={getAudioSettings().isMuted}
                    onLoadedData={() => {
                        if (videoRef.current) {
                            videoRef.current.playbackRate = playbackSpeed;
                        }
                    }}
                    onCanPlay={() => {
                        applyAudioSettings();
                        if (videoRef.current) {
                            videoRef.current.playbackRate = playbackSpeed;
                        }
                        if (isPlaying && videoRef.current) {
                            videoRef.current.play().catch(err => console.warn('[Video] Play interrupted:', err));
                        }
                    }}
                    onPlaying={() => {
                        setIsVideoRendering(true);
                        setIsBufferingStall(false);
                    }}
                    onWaiting={() => {
                        setIsBufferingStall(true);
                    }}
                    onTimeUpdate={() => {
                        if (!isVideoRendering && videoRef.current?.currentTime > 0) {
                            setIsVideoRendering(true);
                            setIsBufferingStall(false);
                        }
                    }}
                    onEnded={handleVideoEnded}
                />
            )}

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
                    />
                ) : !isPlaying ? (
                    <div className="feed-decode-pending">
                        <span>DECODE PENDING...</span>
                    </div>
                ) : null}
            </div>

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