// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Modals/SoloSpotlightModal.jsx
// ==========================================
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { formatTimelineClock } from '../../utils/timeFormat.js';
import TimelineBoard from '../Timeline/TimelineBoard.jsx';
import TransportBar from '../TransportBar/TransportBar.jsx';
import StudioVideoFeed from '../Player/StudioVideoFeed.jsx';
import ShortcutsHelpModal from './ShortcutsHelpModal.jsx';
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
    globalGaps = [],
    onExport,
    isPlaying: propIsPlaying,
    setIsPlaying: propSetIsPlaying,
    isLooping: propIsLooping = true,
    setIsLooping: propSetIsLooping,
    playbackSpeed: propPlaybackSpeed,
    setPlaybackSpeed: propSetPlaybackSpeed
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

    const [localIsLooping, setLocalIsLooping] = useState(true);
    const isLooping = propIsLooping !== undefined ? propIsLooping : localIsLooping;
    const setIsLooping = propSetIsLooping || setLocalIsLooping;

    const [localPlaybackSpeed, setLocalPlaybackSpeed] = useState(1);
    const playbackSpeed = propPlaybackSpeed !== undefined ? propPlaybackSpeed : localPlaybackSpeed;
    const setPlaybackSpeed = propSetPlaybackSpeed || setLocalPlaybackSpeed;

    const [exportToast, _setExportToast] = useState(null);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [activeGaps, setActiveGaps] = useState(globalGaps);

    const timelineWrapRef = useRef(null);

    const prevStationIdRef = useRef(station && station.id);
    useEffect(() => {
        if (station && station.id && prevStationIdRef.current !== station.id) {
            prevStationIdRef.current = station.id;
            setPlaybackSpeed(1);
        }
    }, [station, setPlaybackSpeed]);

    const memoizedSoloStations = useMemo(() => (station ? [station] : []), [station]);

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
        const el = timelineWrapRef.current;
        if (!el || !onZoomChange || !onViewportStartChange) return;

        const handleWheel = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const isHorizontal = e.ctrlKey || e.shiftKey;

            if (isHorizontal) {
                const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
                if (delta === 0) return;

                const visibleMs = totalDurationMs / zoomLevel;
                const maxStart = Math.max(0, totalDurationMs - visibleMs);
                const stepMs = (visibleMs * 0.08) * (delta > 0 ? 1 : -1);

                onViewportStartChange(prev => Math.max(0, Math.min(maxStart, prev + stepMs)));
            } else {
                if (e.deltaY === 0) return;

                const isZoomIn = e.deltaY < 0;
                const zoomFactor = isZoomIn ? 1.25 : 0.8;

                const rect = el.getBoundingClientRect();
                const mouseX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
                const mouseRatio = rect.width > 0 ? (mouseX / rect.width) : 0.5;

                const nextZoom = Math.max(1, Math.min(32, Math.round(zoomLevel * zoomFactor * 100) / 100));
                if (nextZoom === zoomLevel) return;

                const oldVisibleMs = totalDurationMs / zoomLevel;
                const newVisibleMs = totalDurationMs / nextZoom;
                const mouseEpochOffset = viewportStartMs + (mouseRatio * oldVisibleMs);

                const nextStart = mouseEpochOffset - (mouseRatio * newVisibleMs);
                const maxStart = Math.max(0, totalDurationMs - newVisibleMs);

                onViewportStartChange(Math.max(0, Math.min(maxStart, nextStart)));
                onZoomChange(nextZoom);
            }
        };

        el.addEventListener('wheel', handleWheel, { passive: false, capture: true });
        return () => el.removeEventListener('wheel', handleWheel, { capture: true });
    }, [totalDurationMs, zoomLevel, viewportStartMs, onZoomChange, onViewportStartChange]);

    const handleTogglePlaySmart = useCallback(() => {
        setIsPlaying(prev => !prev);
    }, [setIsPlaying]);

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

    useEffect(() => {
        if (!isOpen || !station) return;

        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'e' || e.key === 'E')) {
                e.preventDefault();
                handleTriggerExport();
                return;
            }

            if (e.key === '?' || (e.shiftKey && e.code === 'Slash')) {
                e.preventDefault();
                setIsHelpOpen(prev => !prev);
                return;
            }

            if (isHelpOpen) {
                if (e.key === 'Escape') setIsHelpOpen(false);
                return;
            }

            if (e.key === 'Escape' || e.code === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                onClose?.();
                return;
            }

            if (e.code === 'Space') {
                e.preventDefault();
                handleTogglePlaySmart();
                return;
            }

            if (e.code === 'KeyI') {
                e.preventDefault();
                setInPointMs(Math.max(0, Math.min(playheadMs, outPointMs - 1000)));
                return;
            }

            if (e.code === 'KeyO') {
                e.preventDefault();
                setOutPointMs(Math.min(totalDurationMs, Math.max(playheadMs, inPointMs + 1000)));
                return;
            }

            if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
                e.preventDefault();
                setIsPlaying(false);
                const isLeft = e.code === 'ArrowLeft';

                let stepMs;
                if (e.ctrlKey || e.metaKey) {
                    stepMs = 33;
                } else if (e.shiftKey) {
                    stepMs = 5000;
                } else {
                    const currentZoom = Math.max(1, zoomLevel);
                    stepMs = Math.max(33, Math.round(1000 / currentZoom));
                }

                setPlayheadMs(prev => {
                    const next = isLeft ? prev - stepMs : prev + stepMs;
                    return Math.max(0, Math.min(totalDurationMs, next));
                });
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
        };

        window.addEventListener('keydown', handleKeyDown, { capture: true });
        return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
    }, [
        isOpen,
        station,
        allStations,
        onSelectStation,
        onClose,
        playheadMs,
        inPointMs,
        outPointMs,
        totalDurationMs,
        zoomLevel,
        setInPointMs,
        setOutPointMs,
        setPlayheadMs,
        handleTriggerExport,
        handleTogglePlaySmart,
        setIsPlaying,
        isHelpOpen
    ]);

    const currentIdx = allStations.findIndex(s => s.id === (station && station.id));
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
                <StudioVideoFeed
                    station={station}
                    baseEpochMs={baseEpochMs}
                    totalDurationMs={totalDurationMs}
                    playheadMs={playheadMs}
                    setPlayheadMs={setPlayheadMs}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    playbackSpeed={playbackSpeed}
                    timeMode={timeMode}
                    inPointMs={inPointMs}
                    outPointMs={outPointMs}
                    isLooping={isLooping}
                    recordingSegments={recordingSegments}
                    globalGaps={activeGaps}
                    showWatermark={true}
                />
                <div className="canvas-scrim-top" />
                <div className="canvas-scrim-bottom" />
            </div>

            <div className="spotlight-top-hud">
                <div className="top-hud-left-group">
                    <button
                        type="button"
                        className="btn-exit-spotlight"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onClose?.();
                        }}
                        title="Exit Fullscreen (Esc)"
                    >
                        <kbd>ESC</kbd>
                        <span>EXIT FULLSCREEN</span>
                    </button>

                    <button
                        type="button"
                        className="btn-spotlight-help"
                        onClick={() => setIsHelpOpen(true)}
                        title="Keyboard Shortcuts Cheat Sheet (?)"
                    >
                        <span className="help-icon-symbol">?</span>
                        <span>SHORTCUTS</span>
                    </button>
                </div>

                {allStations.length > 1 && (
                    <div className="station-switcher-pill" dir="ltr">
                        <button
                            type="button"
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
                            type="button"
                            disabled={!nextStation}
                            onClick={() => nextStation && onSelectStation(nextStation.id)}
                            title={nextStation ? `Next: ${nextStation.hostname || nextStation.name} (↓)` : 'Last station'}
                        >
                            ▶
                        </button>
                    </div>
                )}

                <div className="station-brand-pill">
                    <span className="feed-res">SURVEILLANCE ARCHIVE</span>
                    <span className="divider" />
                    <span className="station-title">{station.hostname || station.name}</span>
                </div>
            </div>

            <div className={`spotlight-bottom-island ${isPlaying ? 'is-playing-dimmed' : ''}`}>
                <div className="island-transport-row">
                    <div className="cut-actions-cluster">
                        <div className="cut-duration-pill">
                            <span className="label">CUT DURATION</span>
                            <span className="val">{formatCutDurationSMPTE(outPointMs - inPointMs)}</span>
                        </div>

                        <button
                            type="button"
                            className="btn-export-cut-hero"
                            onClick={handleTriggerExport}
                            title="Export Selected Cut Window (Ctrl+E)"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            <span>EXPORT CUT</span>
                        </button>
                    </div>

                    <TransportBar
                        activeStationId={station.id}
                        isPlaying={isPlaying}
                        setIsPlaying={handleTogglePlaySmart}
                        isLooping={isLooping}
                        setIsLooping={setIsLooping}
                        playbackSpeed={playbackSpeed}
                        onChangeSpeed={setPlaybackSpeed}
                        baseEpochMs={baseEpochMs}
                        timeMode={timeMode}
                        totalDurationMs={totalDurationMs}
                        inPointMs={inPointMs}
                        setInPointMs={setInPointMs}
                        outPointMs={outPointMs}
                        setOutPointMs={setOutPointMs}
                        onSetInPoint={() => setInPointMs(Math.max(0, Math.min(playheadMs, outPointMs - 1000)))}
                        onSetOutPoint={() => setOutPointMs(Math.min(totalDurationMs, Math.max(playheadMs, inPointMs + 1000)))}
                        onStepFrameBackward={() => { setIsPlaying(false); setPlayheadMs(p => Math.max(0, p - 33)); }}
                        onStepFrameForward={() => { setIsPlaying(false); setPlayheadMs(p => Math.min(totalDurationMs, p + 33)); }}
                    />

                    <div className="clock-timecode">
                        <span className="label">PLAYHEAD</span>
                        <span className="digits">{formatTimelineClock(baseEpochMs + playheadMs, timeMode)}</span>
                    </div>
                </div>

                <div className="island-timeline-board-wrap" ref={timelineWrapRef}>
                    <TimelineBoard
                        stations={memoizedSoloStations}
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
                            if (est?.removedGlobalGaps) setActiveGaps(est.removedGlobalGaps);
                        }}
                    />
                </div>
            </div>

            <ShortcutsHelpModal
                isOpen={isHelpOpen}
                onClose={() => setIsHelpOpen(false)}
            />
        </div>,
        document.body
    );
}