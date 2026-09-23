// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Viewport/views/Feed/CameraCardFeed.jsx
// ==========================================
import React, { useRef, useState, useEffect } from 'react';
import { frameStore } from '../../../../utils/frameStore.js';
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
    globalGaps = []
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

    const prevIsPlayingRef = useRef(isPlaying);
    const videoRef = useRef(null);
    const streamStartOffsetMsRef = useRef(0);
    const currentRelativeMsRef = useRef(currentEpochMs - baseEpochMs);
    const isSkippingGapRef = useRef(false);
    currentRelativeMsRef.current = currentEpochMs - baseEpochMs;

    const stationSegments = station.segments || [];
    const isInRecordingSegment = stationSegments.some(seg => {
        const s = seg.startEpochMs ?? seg.startEpoch ?? 0;
        const e = seg.endEpochMs ?? seg.endEpoch ?? 0;
        return currentEpochMs >= s && currentEpochMs <= e;
    });

    useEffect(() => {
        if (isOffline || !roundedEpochMs || !stationName) return;

        if (isPlaying) {
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
            return;
        }

        const delayMs = wasPlaying ? 50 : 350;

        const timer = setTimeout(() => {
            if (!isMounted) return;

            frameStore.fetchFrame(stationName, roundedEpochMs, abortController.signal).then(res => {
                if (isMounted) {
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
    }, [stationName, roundedEpochMs, isOffline, isPlaying]);

    useEffect(() => {
        if (!stationName || !isSolo) return;

        let safetyTimeout = null;

        if (isPlaying && !isSpotlightActive && isInRecordingSegment) {
            const initialSeekMs = currentRelativeMsRef.current;
            streamStartOffsetMsRef.current = initialSeekMs;
            const url = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(stationName)}&startEpoch=${baseEpochMs}&endEpoch=${baseEpochMs + totalDurationMs}&seekEpoch=${baseEpochMs + initialSeekMs}&_t=${Date.now()}`;
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

        // דילוג רציף מעל כל פער חיתוך גלובלי
        const activeGap = globalGaps?.find(g => curEpoch >= g.startEpochMs && curEpoch < g.endEpochMs);
        if (activeGap) {
            isSkippingGapRef.current = true;
            const gapEndOffsetMs = activeGap.endEpochMs - baseEpochMs;
            setPlayheadMs(gapEndOffsetMs);
            streamStartOffsetMsRef.current = gapEndOffsetMs;
            const newUrl = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(stationName)}&startEpoch=${baseEpochMs}&endEpoch=${baseEpochMs + totalDurationMs}&seekEpoch=${baseEpochMs + gapEndOffsetMs}&_t=${Date.now()}`;
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
            const newUrl = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(stationName)}&startEpoch=${baseEpochMs}&endEpoch=${baseEpochMs + totalDurationMs}&seekEpoch=${baseEpochMs + nextMs}&_t=${Date.now()}`;
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

            {isSolo && isPlaying && isInRecordingSegment && !isVideoReady && !isSpotlightActive && (
                <div className="feed-buffering-overlay" style={{ zIndex: 4 }}>
                    <div className="feed-buffer-spinner" />
                    <span className="feed-buffer-badge">BUFFERING...</span>
                </div>
            )}
        </div>
    );
}