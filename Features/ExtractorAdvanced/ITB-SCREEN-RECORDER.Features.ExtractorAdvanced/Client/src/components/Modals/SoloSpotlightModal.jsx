// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Modals/SoloSpotlightModal.jsx
// ==========================================
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { formatTimelineClock } from '../../utils/timeFormat.js';
import TimelineBoard from '../Timeline/TimelineBoard.jsx';
import TransportBar from '../TransportBar/TransportBar.jsx';
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
    globalGaps = []
}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);

    const [streamSrc, setStreamSrc] = useState('');

    // 💡 אתחול מיידי (Lazy Initial State) מתוך ה-frameStore המרכזי באפס השהייה ובאפס קריאות רשת
    const [frameResult, setFrameResult] = useState(() => {
        if (!station) return null;
        const host = station.hostname || station.name || '';
        const targetEpochMs = Math.round(baseEpochMs + playheadMs);
        return frameStore.get(host, targetEpochMs) || null;
    });

    const [isVideoReady, setIsVideoReady] = useState(false);

    const videoRef = useRef(null);
    const streamStartOffsetMsRef = useRef(playheadMs);
    const hostname = station?.hostname || station?.name || '';

    // שליפת פריים סטטי רק בעצירה (Pause) אם במקרה עדיין אינו קיים במטמון
    useEffect(() => {
        if (!isOpen || !station || isPlaying) {
            return;
        }

        let isMounted = true;
        const abortController = new AbortController();
        const targetEpochMs = Math.round(baseEpochMs + playheadMs);

        const cached = frameStore.get(hostname, targetEpochMs);
        if (cached) {
            setFrameResult(cached);
            return;
        }

        const fetchTimer = setTimeout(() => {
            if (!isMounted) return;

            frameStore.fetchFrame(hostname, targetEpochMs, abortController.signal).then(res => {
                if (isMounted && res) {
                    setFrameResult(res);
                }
            });
        }, 120);

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

    // פתיחת הסטרים פעם אחת בתחילת הניגון
    useEffect(() => {
        if (!isOpen || !station) return;

        let safetyTimeout = null;

        if (isPlaying) {
            streamStartOffsetMsRef.current = playheadMs;

            const startEpochVal = Math.round(baseEpochMs);
            const endEpochVal = Math.round(baseEpochMs + totalDurationMs);
            const rawSeekEpoch = baseEpochMs + playheadMs;
            const seekEpochVal = Math.min(endEpochVal, Math.max(startEpochVal, Math.round(rawSeekEpoch)));

            const url = `/api/v1/extractor-advanced/stream?hostname=${encodeURIComponent(hostname)}&startEpoch=${startEpochVal}&endEpoch=${endEpochVal}&seekEpoch=${seekEpochVal}`;

            setStreamSrc(url);
            setIsVideoReady(false);

            safetyTimeout = setTimeout(() => {
                setIsVideoReady(true);
            }, 600);

        } else {
            setStreamSrc('');
            setIsVideoReady(false);
            if (videoRef.current) {
                videoRef.current.pause();
            }
        }

        return () => {
            if (safetyTimeout) clearTimeout(safetyTimeout);
        };
    }, [isPlaying, isOpen, station, hostname, baseEpochMs, totalDurationMs]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = playbackSpeed;
        }
    }, [playbackSpeed]);

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (!video || !isPlaying) return;

        if (!isVideoReady) setIsVideoReady(true);

        let currentMs = streamStartOffsetMsRef.current + Math.round(video.currentTime * 1000);

        if (globalGaps && globalGaps.length > 0) {
            const currentEpoch = baseEpochMs + currentMs;
            const activeGap = globalGaps.find(g => currentEpoch >= g.startEpochMs && currentEpoch < g.endEpochMs);
            if (activeGap) {
                const gapEndOffsetMs = activeGap.endEpochMs - baseEpochMs;
                video.currentTime = Math.max(0, (gapEndOffsetMs - streamStartOffsetMsRef.current) / 1000);
                currentMs = gapEndOffsetMs;
            }
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

    useEffect(() => {
        if (!isOpen || !station || allStations.length === 0) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }

            if (e.code === 'Space') {
                e.preventDefault();
                setIsPlaying(prev => !prev);
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
    }, [isOpen, station, allStations, onSelectStation, onClose, playheadMs, inPointMs, outPointMs, totalDurationMs, setInPointMs, setOutPointMs, setPlayheadMs]);

    const currentIdx = allStations.findIndex(s => s.id === station?.id);
    const prevStation = allStations[currentIdx - 1];
    const nextStation = allStations[currentIdx + 1];

    if (!isOpen || !station) return null;

    const timelineStations = [station];
    const stationSegments = recordingSegments[station.id] || station.segments || [];

    const currentEpoch = baseEpochMs + playheadMs;
    const isInRecordingSegment = stationSegments.some(seg => {
        const s = seg.startEpochMs ?? seg.startEpoch ?? 0;
        const e = seg.endEpochMs ?? seg.endEpoch ?? 0;
        return currentEpoch >= s && currentEpoch <= e;
    });

    const isNoSignalGap = !isInRecordingSegment;

    return createPortal(
        <div className="solo-spotlight-modal-overlay" dir="ltr">
            <div className="spotlight-viewport-canvas">
                <div className="canvas-video-feed">

                    {streamSrc && (
                        <video
                            ref={videoRef}
                            src={streamSrc}
                            className="spotlight-active-video"
                            style={{ position: 'absolute', zIndex: 1 }}
                            playsInline
                            autoPlay
                            onPlaying={() => setIsVideoReady(true)}
                            onTimeUpdate={handleTimeUpdate}
                            onEnded={() => {
                                if (isLooping) {
                                    setPlayheadMs(inPointMs);
                                    setIsPlaying(true);
                                } else {
                                    setIsPlaying(false);
                                }
                            }}
                        />
                    )}

                    {isNoSignalGap ? (
                        <div className="tactical-spotlight-hero" style={{ position: 'absolute', zIndex: 2, inset: 0, background: '#020617', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                            <div className="spotlight-badge-container">
                                <svg viewBox="0 0 40 40" fill="none" className="torch-fullscreen-svg" style={{ width: '48px', height: '48px' }}>
                                    <path d="M5 12V6a1 1 0 0 1 1-1h6" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
                                    <path d="M28 5h6a1 1 0 0 1 1 1v6" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
                                    <path d="M5 28v6a1 1 0 0 0 1 1h6" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
                                    <path d="M28 35h6a1 1 0 0 0 1-1v-6" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="20" y1="13" x2="20" y2="7" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                                    <polygon points="14,18 26,18 23,22 17,22" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.8" strokeLinejoin="round" />
                                    <rect x="17" y="22" width="6" height="10" rx="1.5" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.8" />
                                </svg>
                            </div>
                            <span className="spotlight-title-label" style={{ fontFamily: 'monospace', color: '#22d3ee', fontWeight: 'bold', letterSpacing: '2px' }}>NO SIGNAL / GAP</span>
                        </div>
                    ) : frameResult && frameResult !== 'NO_SIGNAL' ? (
                        <img
                            src={frameResult}
                            className={`spotlight-static-frame ${isVideoReady ? 'hidden-under-video' : ''}`}
                            style={{ position: 'absolute', zIndex: 2 }}
                            alt="Current Frame"
                        />
                    ) : (
                        <div style={{ position: 'absolute', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#f59e0b', background: 'rgba(245, 158, 11, 0.15)', padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>DECODE PENDING...</span>
                        </div>
                    )}

                    {isPlaying && !isVideoReady && (
                        <div className="stream-buffering-overlay" style={{ position: 'absolute', zIndex: 3 }}>
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

            <div className="spotlight-bottom-island">
                <div className="island-transport-row">
                    <div className="cut-duration-pill">
                        <span className="label">CUT DURATION</span>
                        <span className="val">{formatCutDurationSMPTE(outPointMs - inPointMs)}</span>
                    </div>

                    <TransportBar
                        activeStationId={station.id}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
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
                        stations={timelineStations}
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
                    />
                </div>
            </div>
        </div>,
        document.body
    );
}