// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Viewport/views/Feed/CameraCardFeed.jsx
// ==========================================
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { frameStore } from '../../../../utils/frameStore.js';
import { getAudioSettings } from '../../../../utils/studioSessionStore.js';
import NoSignalHero from '../../overlays/NoSignalHero.jsx';
import './CameraCardFeed.scss';

export default function CameraCardFeed({
    station,
    currentEpochMs,
    isOffline,
    isSolo,
    isPlaying,
    setIsPlaying,
    baseEpochMs,
    totalDurationMs,
    outPointMs,
    setPlayheadMs,
    isSpotlightActive,
    globalGaps = [],
    recordingSegments = {},
    playbackSpeed = 1
}) {
    const stationName = station.hostname || station.name || '';
    const roundedEpochMs = Math.round(currentEpochMs);

    const [frameSrc, setFrameSrc] = useState(() => {
        if (!stationName || !roundedEpochMs) return null;
        return frameStore.get(stationName, roundedEpochMs) || null;
    });

    const [streamSrc, setStreamSrc] = useState('');
    const [isVideoReady, setIsVideoReady] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [_isLoadingFrame, setIsLoadingFrame] = useState(false);

    const prevIsPlayingRef = useRef(isPlaying);
    const videoRef = useRef(null);
    const streamStartOffsetMsRef = useRef(0);
    const currentRelativeMsRef = useRef(currentEpochMs - baseEpochMs);
    const isSkippingGapRef = useRef(false);
    currentRelativeMsRef.current = currentEpochMs - baseEpochMs;

    const stationSegments = recordingSegments[station?.id] || recordingSegments[stationName] || station?.segments || [];
    const isInRecordingSegment = stationSegments.length === 0 || stationSegments.some(seg => {
        const s = seg.startEpochMs ?? seg.startEpoch ?? 0;
        const e = seg.endEpochMs ?? seg.endEpoch ?? 0;
        return currentEpochMs >= s && currentEpochMs <= e;
    });

    const applyAudioToVideo = useCallback(() => {
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

    useEffect(() => {
        if (isOffline || !roundedEpochMs || !stationName) return;

        if (isPlaying && isSolo) {
            prevIsPlayingRef.current = true;
            return;
        }

        const wasPlaying = prevIsPlayingRef.current;
        prevIsPlayingRef.current = false;

        let isMounted = true;
        const abortController = new AbortController();

        const cached = frameStore.get(stationName, roundedEpochMs);
        if (cached) {
            setFrameSrc(cached);
            setHasError(false);
            setIsLoadingFrame(false);
            return;
        }

        setIsLoadingFrame(true);
        const delayMs = wasPlaying ? 40 : 200;

        const timer = setTimeout(() => {
            if (!isMounted) return;

            frameStore.fetchFrame(stationName, roundedEpochMs, abortController.signal).then(res => {
                if (isMounted) {
                    setIsLoadingFrame(false);
                    if (res && res !== 'NO_SIGNAL') {
                        setFrameSrc(res);
                        setHasError(false);
                    } else if (res === 'NO_SIGNAL') {
                        setHasError(true);
                    }
                }
            });
        }, delayMs);

        const unsubscribe = frameStore.subscribe((h, e, val) => {
            if (h === stationName && e === roundedEpochMs && isMounted) {
                setIsLoadingFrame(false);
                if (val && val !== 'NO_SIGNAL') {
                    setFrameSrc(val);
                    setHasError(false);
                } else if (val === 'NO_SIGNAL') {
                    setHasError(true);
                }
            }
        });

        return () => {
            isMounted = false;
            clearTimeout(timer);
            abortController.abort();
            unsubscribe();
        };
    }, [stationName, roundedEpochMs, isOffline, isPlaying, isSolo]);

    useEffect(() => {
        if (!stationName || !isSolo) return;

        let debounceTimer = null;

        if (isPlaying && !isSpotlightActive && isInRecordingSegment) {
            debounceTimer = setTimeout(() => {
                const initialSeekMs = currentRelativeMsRef.current;
                streamStartOffsetMsRef.current = initialSeekMs;
                const url = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(stationName)}&startEpoch=${baseEpochMs}&endEpoch=${baseEpochMs + totalDurationMs}&seekEpoch=${baseEpochMs + initialSeekMs}&speed=1&_t=${Date.now()}`;

                setIsVideoReady(false);
                setStreamSrc(url);
            }, 100);

        } else if (!isPlaying) {
            setStreamSrc('');
            setIsVideoReady(false);
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.removeAttribute('src');
                videoRef.current.load();
            }
        }

        return () => {
            if (debounceTimer) clearTimeout(debounceTimer);
        };
    }, [isPlaying, isSolo, stationName, baseEpochMs, totalDurationMs, isSpotlightActive, isInRecordingSegment]);

    // 💡 מנוע 60fps מונוטוני כאשר כרטיסיית פיד מנוגנת במצב Solo
    useEffect(() => {
        if (!isSolo || !isPlaying || !streamSrc || !isVideoReady || isSpotlightActive) return;

        let rafId = null;
        let syncVideoSec = videoRef.current ? videoRef.current.currentTime : 0;
        let syncWallTime = performance.now();
        let lastEmittedMs = streamStartOffsetMsRef.current + Math.round(syncVideoSec * 1000);

        const smoothTick = () => {
            const video = videoRef.current;
            if (video && !video.paused && !video.ended && !isSkippingGapRef.current) {
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

                if (calculatedMs >= outPointMs) {
                    setIsPlaying?.(false);
                    setPlayheadMs?.(outPointMs);
                    return;
                }

                const curEpoch = baseEpochMs + calculatedMs;
                const activeGap = globalGaps?.find(g => curEpoch >= g.startEpochMs && curEpoch < g.endEpochMs);
                if (activeGap) {
                    isSkippingGapRef.current = true;
                    const gapEndOffsetMs = activeGap.endEpochMs - baseEpochMs;
                    setPlayheadMs(gapEndOffsetMs);
                    streamStartOffsetMsRef.current = gapEndOffsetMs;
                    lastEmittedMs = gapEndOffsetMs;

                    const newUrl = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(stationName)}&startEpoch=${baseEpochMs}&endEpoch=${baseEpochMs + totalDurationMs}&seekEpoch=${baseEpochMs + gapEndOffsetMs}&speed=1&_t=${Date.now()}`;
                    setIsVideoReady(false);
                    setStreamSrc(newUrl);

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
        isSolo,
        isPlaying,
        streamSrc,
        isVideoReady,
        isSpotlightActive,
        playbackSpeed,
        outPointMs,
        baseEpochMs,
        totalDurationMs,
        stationName,
        globalGaps,
        setPlayheadMs,
        setIsPlaying
    ]);

    const handleVideoEnded = () => {
        if (isSkippingGapRef.current) return;
        const curEpoch = baseEpochMs + currentRelativeMsRef.current;

        const nextSeg = stationSegments
            .map(seg => ({ start: seg.startEpochMs ?? seg.startEpoch ?? 0, end: seg.endEpochMs ?? seg.endEpoch ?? 0 }))
            .filter(s => s.start > curEpoch + 200)
            .sort((a, b) => a.start - b.start)[0];

        if (nextSeg && (nextSeg.start - baseEpochMs) < outPointMs) {
            isSkippingGapRef.current = true;
            const nextMs = nextSeg.start - baseEpochMs;
            setPlayheadMs(nextMs);
            streamStartOffsetMsRef.current = nextMs;
            const newUrl = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(stationName)}&startEpoch=${baseEpochMs}&endEpoch=${baseEpochMs + totalDurationMs}&seekEpoch=${baseEpochMs + nextMs}&speed=1&_t=${Date.now()}`;

            setIsVideoReady(false);
            setStreamSrc(newUrl);

            setTimeout(() => { isSkippingGapRef.current = false; }, 300);
            return;
        }

        if (setIsPlaying) setIsPlaying(false);
    };

    if (isOffline) {
        return (
            <div className="offline-state-overlay">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>SIGNAL LOST</span>
            </div>
        );
    }

    return (
        <div className="camera-card-feed-root">
            {isSolo && streamSrc && (
                <video
                    ref={videoRef}
                    src={streamSrc}
                    className="station-live-frame"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        opacity: isVideoReady ? 1 : 0,
                        transition: 'opacity 0.2s ease-out',
                        zIndex: isVideoReady ? 3 : 1
                    }}
                    playsInline
                    autoPlay
                    muted={getAudioSettings().isMuted}
                    onLoadedData={() => {
                        if (videoRef.current) videoRef.current.playbackRate = playbackSpeed;
                    }}
                    onCanPlay={() => {
                        applyAudioToVideo();
                        if (videoRef.current) videoRef.current.playbackRate = playbackSpeed;
                        if (isPlaying && videoRef.current) videoRef.current.play().catch(() => { });
                    }}
                    onPlaying={() => {
                        setIsVideoReady(true);
                    }}
                    onWaiting={() => {
                        setIsVideoReady(false);
                    }}
                    onTimeUpdate={() => {
                        if (!isVideoReady && videoRef.current?.currentTime > 0) {
                            setIsVideoReady(true);
                        }
                    }}
                    onEnded={handleVideoEnded}
                />
            )}

            <div
                className="feed-static-layer"
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: (isSolo && isPlaying && isVideoReady && !isSpotlightActive) ? 0 : 2,
                    pointerEvents: 'none'
                }}
            >
                {frameSrc && !hasError ? (
                    <img
                        src={frameSrc}
                        alt={stationName}
                        className="station-live-frame"
                        onError={() => setHasError(true)}
                    />
                ) : (!frameSrc || hasError || !isInRecordingSegment) && !streamSrc ? (
                    <NoSignalHero isPlaying={isPlaying} />
                ) : null}
            </div>

            {isSolo && isPlaying && isInRecordingSegment && !isVideoReady && !isSpotlightActive && (
                <div className="tactical-feed-buffering-overlay">
                    <div className="buffering-glass-hud">
                        <div className="radar-dual-ring">
                            <div className="ring-outer" />
                            <div className="ring-inner" />
                            <div className="radar-blip" />
                        </div>
                        <div className="hud-meta-stack">
                            <div className="hud-headline">
                                <span className="beacon-pulse" />
                                <span>INITIALIZING STREAM PIPELINE</span>
                            </div>
                            <span className="hud-sub">
                                BUFFERING // {stationName}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}