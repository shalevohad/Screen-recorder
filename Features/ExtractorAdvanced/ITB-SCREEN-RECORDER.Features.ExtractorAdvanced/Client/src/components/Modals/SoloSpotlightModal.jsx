// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Modals/SoloSpotlightModal.jsx
// ==========================================
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { formatTimelineClock } from '../../utils/timeFormat.js';
import TimelineBoard from '../Timeline/TimelineBoard.jsx';
import TransportBar from '../TransportBar/TransportBar.jsx';
import NoSignalHero from '../Viewport/overlays/NoSignalHero.jsx';
import { frameStore } from '../../utils/frameStore.js';
import './SoloSpotlightModal.scss';

const formatCutDurationSMPTE = (durationMs, fps = 30) => {
    const totalMs = Math.max(0, durationMs);
    const totalSeconds = Math.floor(totalMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const frames = Math.floor(((totalMs % 1000) / 1000) * fps);

    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(frames)}`;
};

export default function SoloSpotlightModal({
    isOpen,
    station,
    allStations = [],
    onSelectStation,
    onClose,
    baseEpochMs = 0,
    timeMode = 'LOCAL',
    totalDurationMs = 3600000,
    zoomLevel = 1,
    onZoomChange,
    viewportStartMs = 0,
    onViewportStartChange,
    playheadMs = 0,
    setPlayheadMs,
    inPointMs = 0,
    setInPointMs,
    outPointMs = 3600000,
    setOutPointMs,
    recordingSegments = {},
    globalGaps: propGlobalGaps = [],
    onExport,
    isPlaying: propIsPlaying,
    setIsPlaying: propSetIsPlaying
}) {
    const [localIsPlaying, setLocalIsPlaying] = useState(false);
    const isPlaying = propIsPlaying !== undefined ? propIsPlaying : localIsPlaying;

    const setIsPlaying = useCallback((val) => {
        const nextVal = typeof val === 'function' ? val(isPlaying) : val;
        if (propSetIsPlaying) {
            propSetIsPlaying(nextVal);
        } else {
            setLocalIsPlaying(nextVal);
        }
        window.dispatchEvent(new CustomEvent('itb-set-playing', { detail: { isPlaying: nextVal } }));
    }, [isPlaying, propSetIsPlaying]);

    // 💡 ניהול פערים גלובליים לחיתוך בתוך ה-Spotlight
    const [spotlightGlobalGaps, setSpotlightGlobalGaps] = useState(propGlobalGaps || []);

    useEffect(() => {
        if (propGlobalGaps && propGlobalGaps.length > 0) {
            setSpotlightGlobalGaps(propGlobalGaps);
        }
    }, [propGlobalGaps]);

    const activeGlobalGaps = spotlightGlobalGaps.length > 0 ? spotlightGlobalGaps : propGlobalGaps;

    const [isLooping, setIsLooping] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [streamSrc, setStreamSrc] = useState('');
    const [exportToast, setExportToast] = useState(null);
    const [isVideoReady, setIsVideoReady] = useState(false);

    const prevIsPlayingRef = useRef(isPlaying);
    const playheadMsRef = useRef(playheadMs);
    const videoRef = useRef(null);
    const streamStartOffsetMsRef = useRef(playheadMs);
    const isSkippingGapRef = useRef(false);

    playheadMsRef.current = playheadMs;
    const hostname = station?.hostname || station?.name || '';
    const stationSegments = recordingSegments[station?.id] || station?.segments || [];

    const currentEpoch = baseEpochMs + playheadMs;
    const isInRecordingSegment = stationSegments.some(seg => {
        const s = seg.startEpochMs ?? seg.startEpoch ?? 0;
        const e = seg.endEpochMs ?? seg.endEpoch ?? 0;
        return currentEpoch >= s && currentEpoch <= e;
    });

    const isNoSignalGap = !isInRecordingSegment;

    const [frameResult, setFrameResult] = useState(() => {
        if (!station) return null;
        const host = station.hostname || station.name || '';
        const targetEpochMs = Math.round(baseEpochMs + playheadMs);
        return frameStore.get(host, targetEpochMs) || null;
    });

    useEffect(() => {
        if (!isOpen) return;
        document.body.classList.add('itb-spotlight-active');
        window.dispatchEvent(new CustomEvent('spotlight-state-changed', { detail: { isOpen: true } }));

        return () => {
            document.body.classList.remove('itb-spotlight-active');
            window.dispatchEvent(new CustomEvent('spotlight-state-changed', { detail: { isOpen: false } }));
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen || !station) return;

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
    }, [isOpen, station, hostname, baseEpochMs, playheadMs, isPlaying]);

    useEffect(() => {
        if (!isOpen || !station) return;

        let safetyTimeout = null;

        if (isPlaying && isInRecordingSegment) {
            const currentHead = playheadMsRef.current;
            streamStartOffsetMsRef.current = currentHead;

            const startEpochVal = Math.round(baseEpochMs);
            const endEpochVal = Math.round(baseEpochMs + totalDurationMs);
            const seekEpochVal = Math.min(endEpochVal, Math.max(startEpochVal, Math.round(baseEpochMs + currentHead)));

            const url = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(hostname)}&startEpoch=${startEpochVal}&endEpoch=${endEpochVal}&seekEpoch=${seekEpochVal}&_t=${Date.now()}`;

            setStreamSrc(url);
            setIsVideoReady(false);

            safetyTimeout = setTimeout(() => {
                setIsVideoReady(true);
            }, 600);
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
    }, [isPlaying, isOpen, station, hostname, baseEpochMs, totalDurationMs, isInRecordingSegment]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = playbackSpeed;
        }
    }, [playbackSpeed]);

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (!video || !isPlaying || isSkippingGapRef.current) return;

        if (!isVideoReady) setIsVideoReady(true);

        let currentMs = streamStartOffsetMsRef.current + Math.round(video.currentTime * 1000);
        const curEpoch = baseEpochMs + currentMs;

        const activeGlobalGap = activeGlobalGaps?.find(g => curEpoch >= g.startEpochMs && curEpoch < g.endEpochMs);
        if (activeGlobalGap) {
            isSkippingGapRef.current = true;
            const gapEndMs = activeGlobalGap.endEpochMs - baseEpochMs;
            setPlayheadMs(gapEndMs);
            streamStartOffsetMsRef.current = gapEndMs;

            const startEpochVal = Math.round(baseEpochMs);
            const endEpochVal = Math.round(baseEpochMs + totalDurationMs);
            const seekEpochVal = Math.min(endEpochVal, Math.max(startEpochVal, Math.round(baseEpochMs + gapEndMs)));
            const url = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(hostname)}&startEpoch=${startEpochVal}&endEpoch=${endEpochVal}&seekEpoch=${seekEpochVal}&_t=${Date.now()}`;
            setStreamSrc(url);
            setIsVideoReady(false);

            setTimeout(() => { isSkippingGapRef.current = false; }, 300);
            return;
        }

        if (currentMs >= outPointMs) {
            if (isLooping) {
                setPlayheadMs(inPointMs);
                streamStartOffsetMsRef.current = inPointMs;
                if (videoRef.current) {
                    videoRef.current.currentTime = Math.max(0, (inPointMs - streamStartOffsetMsRef.current) / 1000);
                }
            } else {
                setIsPlaying(false);
                setPlayheadMs(outPointMs);
            }
        } else {
            setPlayheadMs(currentMs);
        }
    };

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
            setPlayheadMs(nextMs);
            streamStartOffsetMsRef.current = nextMs;

            const startEpochVal = Math.round(baseEpochMs);
            const endEpochVal = Math.round(baseEpochMs + totalDurationMs);
            const seekEpochVal = Math.min(endEpochVal, Math.max(startEpochVal, Math.round(baseEpochMs + nextMs)));

            const url = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(hostname)}&startEpoch=${startEpochVal}&endEpoch=${endEpochVal}&seekEpoch=${seekEpochVal}&_t=${Date.now()}`;
            setStreamSrc(url);
            setIsVideoReady(false);

            setTimeout(() => { isSkippingGapRef.current = false; }, 300);
            return;
        }

        if (isLooping) {
            setPlayheadMs(inPointMs);
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
            setPlayheadMs(outPointMs);
        }
    };

    const handleTogglePlaySmart = useCallback(() => {
        if (!isPlaying) {
            let targetPlayhead = playheadMs;
            const curEpoch = baseEpochMs + targetPlayhead;

            const activeGlobalGap = activeGlobalGaps?.find(g => curEpoch >= g.startEpochMs && curEpoch < g.endEpochMs);
            if (activeGlobalGap) {
                targetPlayhead = activeGlobalGap.endEpochMs - baseEpochMs;
            } else if (!isInRecordingSegment) {
                const nextSeg = stationSegments
                    .map(seg => ({ start: seg.startEpochMs ?? seg.startEpoch ?? 0, end: seg.endEpochMs ?? seg.endEpoch ?? 0 }))
                    .filter(s => s.start > curEpoch)
                    .sort((a, b) => a.start - b.start)[0];

                if (nextSeg) {
                    targetPlayhead = nextSeg.start - baseEpochMs;
                }
            }

            if (targetPlayhead !== playheadMs) {
                setPlayheadMs(targetPlayhead);
            }
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
    }, [isPlaying, playheadMs, baseEpochMs, activeGlobalGaps, isInRecordingSegment, stationSegments, setPlayheadMs, setIsPlaying]);

    const handleTriggerExport = useCallback(async () => {
        if (!station || Math.abs(outPointMs - inPointMs) < 1000) return;

        const payload = {
            stationIds: [station.id],
            stations: [station.id],
            stationId: station.id,
            hostname: station.hostname || station.name || station.id,
            inEpochMs: baseEpochMs + Math.round(inPointMs),
            outEpochMs: baseEpochMs + Math.round(outPointMs)
        };

        try {
            if (onExport) {
                await onExport(payload);
            } else {
                let res = await fetch('/api/v1/extractor-advanced/jobs', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!res.ok) {
                    await fetch('/api/v1/extractor/jobs', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                }
            }
        } catch (err) {
            console.warn('[SoloSpotlightModal] Export trigger error:', err);
        } finally {
            window.dispatchEvent(new CustomEvent('open-export-monitor'));
        }
    }, [station, inPointMs, outPointMs, baseEpochMs, onExport]);

    // קיצורי מקלדת
    useEffect(() => {
        if (!isOpen || !station || allStations.length === 0) return;

        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'e' || e.key === 'E')) {
                e.preventDefault();
                handleTriggerExport();
                return;
            }

            if (e.key === 'Escape') {
                onClose();
                return;
            }

            if (e.code === 'Space') {
                e.preventDefault();
                handleTogglePlaySmart();
                return;
            }

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const curIdx = allStations.findIndex(s => s.id === station.id);
                if (curIdx !== -1) {
                    const nextIdx = (curIdx + 1) % allStations.length;
                    onSelectStation(allStations[nextIdx].id);
                }
                return;
            }

            if (e.key === 'ArrowUp') {
                e.preventDefault();
                const curIdx = allStations.findIndex(s => s.id === station.id);
                if (curIdx !== -1) {
                    const prevIdx = (curIdx - 1 + allStations.length) % allStations.length;
                    onSelectStation(allStations[prevIdx].id);
                }
                return;
            }

            if (e.key === '[') {
                e.preventDefault();
                setInPointMs(Math.max(0, Math.min(playheadMs, outPointMs - 1000)));
                return;
            }

            if (e.key === ']') {
                e.preventDefault();
                setOutPointMs(Math.min(totalDurationMs, Math.max(playheadMs, inPointMs + 1000)));
                return;
            }

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                setIsPlaying(false);
                setPlayheadMs(prev => Math.max(0, prev - (e.shiftKey ? 1000 : 100)));
                return;
            }

            if (e.key === 'ArrowRight') {
                e.preventDefault();
                setIsPlaying(false);
                setPlayheadMs(prev => Math.min(totalDurationMs, prev + (e.shiftKey ? 1000 : 100)));
                return;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, station, allStations, onSelectStation, onClose, playheadMs, inPointMs, outPointMs, totalDurationMs, setInPointMs, setOutPointMs, setPlayheadMs, handleTriggerExport, handleTogglePlaySmart, setIsPlaying]);

    const currentIdx = allStations.findIndex(s => s.id === station?.id);
    const prevStation = allStations[currentIdx - 1];
    const nextStation = allStations[currentIdx + 1];

    if (!isOpen || !station) return null;

    return createPortal(
        <div className="solo-spotlight-modal-overlay" dir="ltr">
            {exportToast && (
                <div className={`spotlight-export-toast ${exportToast.status}`}>
                    <div className="toast-icon">
                        {exportToast.status === 'submitting' && <div className="toast-spinner" />}
                        {exportToast.status === 'success' && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        )}
                        {exportToast.status === 'error' && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        )}
                    </div>
                    <div className="toast-content">
                        <span className="toast-title">{exportToast.message}</span>
                        <span className="toast-meta">
                            CUT: {formatCutDurationSMPTE(outPointMs - inPointMs)} ({formatTimelineClock(baseEpochMs + inPointMs, timeMode)} → {formatTimelineClock(baseEpochMs + outPointMs, timeMode)})
                        </span>
                    </div>
                </div>
            )}

            <div className="spotlight-viewport-canvas">
                <div className="canvas-video-feed">
                    {streamSrc && (
                        <video
                            ref={videoRef}
                            src={streamSrc}
                            className="spotlight-active-video"
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
                        className="spotlight-static-layer"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: (isPlaying && isVideoReady) ? 0 : 2,
                            pointerEvents: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {isNoSignalGap ? (
                            <NoSignalHero isPlaying={isPlaying} />
                        ) : frameResult && frameResult !== 'NO_SIGNAL' ? (
                            <img
                                src={frameResult}
                                className="spotlight-static-frame"
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                alt="Current Frame"
                            />
                        ) : !isPlaying ? (
                            <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#f59e0b', background: 'rgba(245, 158, 11, 0.15)', padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                                    DECODE PENDING...
                                </span>
                            </div>
                        ) : null}
                    </div>

                    {isPlaying && isInRecordingSegment && !isVideoReady && (
                        <div className="stream-buffering-overlay" style={{ position: 'absolute', zIndex: 4 }}>
                            <div className="buffer-spinner" />
                            <span>BUFFERING STREAM...</span>
                        </div>
                    )}

                    <div className="feed-brand-watermark">
                        <span>ARCHIVE RECORDING // {station.hostname || station.name}</span>
                    </div>
                </div>

                <div className="canvas-scrim-top" />
                <div className="canvas-scrim-bottom" />
            </div>

            <div className="spotlight-top-hud">
                <button className="btn-exit-spotlight" onClick={onClose} title="Exit Fullscreen (Esc)">
                    <kbd>ESC</kbd>
                    <span>EXIT FULLSCREEN</span>
                </button>

                <div className="station-switcher-pill" dir="ltr">
                    <button
                        disabled={!prevStation}
                        onClick={() => prevStation && onSelectStation(prevStation.id)}
                        title={prevStation ? `Previous: ${prevStation.hostname || prevStation.name} (↑)` : 'First station'}
                    >
                        ◀
                    </button>
                    <span className="counter-text" dir="ltr">
                        {currentIdx + 1} / {allStations.length}
                    </span>
                    <button
                        disabled={!nextStation}
                        onClick={() => nextStation && onSelectStation(nextStation.id)}
                        title={nextStation ? `Next: ${nextStation.hostname || nextStation.name} (↓)` : 'Last station'}
                    >
                        ▶
                    </button>
                </div>

                <div className="station-brand-pill">
                    <span className="feed-res">SURVEILLANCE ARCHIVE</span>
                    <span className="divider" />
                    <span className="station-title">{station.hostname || station.name}</span>
                </div>
            </div>

            <div className={`spotlight-bottom-island ${isPlaying ? 'is-playing-dimmed' : ''}`}>
                <div className="island-transport-row">
                    <div className="cut-duration-pill">
                        <span className="label">CUT DURATION</span>
                        <span className="val">{formatCutDurationSMPTE(outPointMs - inPointMs)}</span>
                    </div>

                    <TransportBar
                        activeStationId={station.id}
                        isPlaying={isPlaying}
                        setIsPlaying={handleTogglePlaySmart}
                        isLooping={isLooping}
                        setIsLooping={setIsLooping}
                        playbackSpeed={playbackSpeed}
                        onChangeSpeed={setPlaybackSpeed}
                        onStepFrameBackward={() => { setIsPlaying(false); setPlayheadMs(p => Math.max(0, p - 100)); }}
                        onStepFrameForward={() => { setIsPlaying(false); setPlayheadMs(p => Math.min(totalDurationMs, p + 100)); }}
                    />

                    <div className="clock-timecode">
                        <span className="label">PLAYHEAD</span>
                        <span className="digits">{formatTimelineClock(baseEpochMs + playheadMs, timeMode)}</span>
                    </div>
                </div>

                <div className="island-timeline-board-wrap">
                    <TimelineBoard
                        stations={[station]}
                        activeStationId={station.id}
                        onSelectActiveStation={() => { }}
                        baseEpochMs={baseEpochMs}
                        timeMode={timeMode}
                        totalDurationMs={totalDurationMs}
                        zoomLevel={zoomLevel}
                        onZoomChange={onZoomChange}
                        viewportStartMs={viewportStartMs}
                        onViewportStartChange={onViewportStartChange}
                        playheadMs={playheadMs}
                        setPlayheadMs={(ms) => { setIsPlaying(false); setPlayheadMs(ms); }}
                        inPointMs={inPointMs}
                        setInPointMs={setInPointMs}
                        outPointMs={outPointMs}
                        setOutPointMs={setOutPointMs}
                        recordingSegments={recordingSegments}
                        onExport={handleTriggerExport}
                        onEstimateLoaded={(est) => {
                            if (est && est.removedGlobalGaps) {
                                setSpotlightGlobalGaps(est.removedGlobalGaps);
                            }
                        }}
                    />
                </div>
            </div>
        </div>,
        document.body
    );
}