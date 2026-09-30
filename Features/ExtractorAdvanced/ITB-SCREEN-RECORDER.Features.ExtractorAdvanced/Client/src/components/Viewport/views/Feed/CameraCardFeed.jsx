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
    const [isLoadingFrame, setIsLoadingFrame] = useState(false); // 💡 חיווי טעינה לפריים בגריד

    const prevIsPlayingRef = useRef(isPlaying);
    const videoRef = useRef(null);
    const streamStartOffsetMsRef = useRef(0);
    const currentRelativeMsRef = useRef(currentEpochMs - baseEpochMs);
    const isSkippingGapRef = useRef(false);
    currentRelativeMsRef.current = currentEpochMs - baseEpochMs;

    const stationSegments = recordingSegments[station?.id] || station?.segments || [];
    const isInRecordingSegment = stationSegments.some(seg => {
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

    // 💡 עדכון מהירות הניגון מקומית בלבד (playbackRate)
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

        // 💡 הפעלת ספינר טעינה כאשר הפריים עדיין לא ב-Cache ונשלף מהשרת
        setIsLoadingFrame(true);
        const delayMs = wasPlaying ? 50 : 350;

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

    // 💡 הזרמה תמיד ב-speed=1 קבוע לצורך c copy מהיר ורציף
    useEffect(() => {
        if (!stationName || !isSolo) return;

        let safetyTimeout = null;

        if (isPlaying && !isSpotlightActive && isInRecordingSegment) {
            const initialSeekMs = currentRelativeMsRef.current;
            streamStartOffsetMsRef.current = initialSeekMs;
            const url = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(stationName)}&startEpoch=${baseEpochMs}&endEpoch=${baseEpochMs + totalDurationMs}&seekEpoch=${baseEpochMs + initialSeekMs}&speed=1&_t=${Date.now()}`;
            setStreamSrc(url);
            setIsVideoReady(false);

            safetyTimeout = setTimeout(() => {
                setIsVideoReady(true);
            }, 500);

        } else if (!isPlaying) {
            setStreamSrc('');
            setIsVideoReady(false);
            if (videoRef.current) {
                videoRef.current.pause();
            }
        }

        return () => {
            if (safetyTimeout) clearTimeout(safetyTimeout);
        };
    }, [isPlaying, isSolo, stationName, baseEpochMs, totalDurationMs, isSpotlightActive, isInRecordingSegment]);

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (!video || !isPlaying || !setPlayheadMs || isSpotlightActive || isSkippingGapRef.current) return;

        if (!isVideoReady) setIsVideoReady(true);

        let calculatedMs = streamStartOffsetMsRef.current + Math.round(video.currentTime * 1000);
        const curEpoch = baseEpochMs + calculatedMs;

        const activeGap = globalGaps?.find(g => curEpoch >= g.startEpochMs && curEpoch < g.endEpochMs);
        if (activeGap) {
            isSkippingGapRef.current = true;
            const gapEndOffsetMs = activeGap.endEpochMs - baseEpochMs;
            setPlayheadMs(gapEndOffsetMs);
            streamStartOffsetMsRef.current = gapEndOffsetMs;
            const newUrl = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(stationName)}&startEpoch=${baseEpochMs}&endEpoch=${baseEpochMs + totalDurationMs}&seekEpoch=${baseEpochMs + gapEndOffsetMs}&speed=1&_t=${Date.now()}`;
            setStreamSrc(newUrl);
            setIsVideoReady(false);

            setTimeout(() => { isSkippingGapRef.current = false; }, 300);
            return;
        }

        if (calculatedMs >= outPointMs) {
            if (setIsPlaying) setIsPlaying(false);
            setPlayheadMs(outPointMs);
        } else {
            setPlayheadMs(calculatedMs);
        }
    };

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
            setStreamSrc(newUrl);
            setIsVideoReady(false);

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
                        zIndex: isVideoReady ? 3 : 1
                    }}
                    playsInline
                    autoPlay
                    muted={getAudioSettings().isMuted}
                    onLoadedData={() => {
                        setIsVideoReady(true);
                        if (videoRef.current) {
                            videoRef.current.playbackRate = playbackSpeed;
                        }
                        if (isPlaying && videoRef.current) {
                            videoRef.current.play().catch(err => console.warn("[Video] Play prevented:", err));
                        }
                    }}
                    onCanPlay={() => {
                        applyAudioToVideo();
                        if (videoRef.current) {
                            videoRef.current.playbackRate = playbackSpeed;
                        }
                        if (isPlaying && videoRef.current) {
                            videoRef.current.play().catch(err => console.warn("[Video] CanPlay prevented:", err));
                        }
                    }}
                    onPlaying={() => setIsVideoReady(true)}
                    onTimeUpdate={handleTimeUpdate}
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

            {/* 💡 אינדיקטור טעינה לפריים כאשר מתבצעת שליפה (Loading Frame) */}
            {isLoadingFrame && (!isSolo || !isPlaying || !isVideoReady) && (
                <div className="feed-buffering-overlay" style={{ zIndex: 5, background: 'rgba(10, 14, 23, 0.75)', backdropFilter: 'blur(3px)' }}>
                    <div className="feed-buffer-spinner" style={{ width: '26px', height: '26px', border: '3px solid rgba(59, 130, 246, 0.2)', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    <span className="feed-buffer-badge" style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '1px', color: '#93c5fd', marginTop: '6px' }}>
                        LOADING FRAME...
                    </span>
                </div>
            )}

            {isSolo && isPlaying && isInRecordingSegment && !isVideoReady && !isSpotlightActive && (
                <div className="feed-buffering-overlay" style={{ zIndex: 4 }}>
                    <div className="feed-buffer-spinner" />
                    <span className="feed-buffer-badge">BUFFERING...</span>
                </div>
            )}
        </div>
    );
}