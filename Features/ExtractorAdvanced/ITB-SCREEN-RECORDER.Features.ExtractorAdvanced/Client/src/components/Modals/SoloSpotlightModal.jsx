// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Modals/SoloSpotlightModal.jsx
// ==========================================
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { formatTimelineClock } from '../../utils/timeFormat.js';
import TimelineBoard from '../Timeline/TimelineBoard.jsx';
import TransportBar from '../TransportBar/TransportBar.jsx';
import StudioVideoFeed from '../Player/StudioVideoFeed.jsx';
import KeystrokePlaybackOverlay from '../Player/KeystrokePlaybackOverlay.jsx';
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

/**
 * SoloSpotlightModal provides a high-density theater viewport for a single station with full timeline transport and keystroke overlay.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether spotlight modal is visible.
 * @param {Object} props.station - Focused station object.
 * @param {Array} [props.allStations=[]] - Full list of available stations.
 * @param {(station: Object) => void} props.onSelectStation - Callback to switch focused station.
 * @param {() => void} props.onClose - Exit spotlight handler.
 * @returns {JSX.Element|null}
 */
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
    onZoomReset,
    onFitRange,
    onJumpViewportTo,
    viewportStartMs = 0,
    onViewportStartChange,
    playheadMs = 0,
    playheadEpochMs = 0,
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
    setPlaybackSpeed: propSetPlaybackSpeed,
    keystrokeMode = 'BURN_IN',
    onChangeKeystrokeMode,
    keystrokes = [],
    showRulerKeystrokes = false,
    onToggleRulerKeystrokes,
    directorPlan,
    onOverrideDisplay,
    onSplitDirectorSegment,
    onChangeDirectorSegmentDisplay,
    onResetDirectorSegmentToAuto
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
    const [viewMode, setViewMode] = useState('director');
    const [isPipSwapped, setIsPipSwapped] = useState(false);

    const bottomIslandRef = useRef(null);

    const zoomLevelRef = useRef(zoomLevel);
    zoomLevelRef.current = zoomLevel;

    const viewportStartRef = useRef(viewportStartMs);
    viewportStartRef.current = viewportStartMs;

    const totalDurationRef = useRef(totalDurationMs);
    totalDurationRef.current = totalDurationMs;

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
        if (!isOpen) return;
        const el = bottomIslandRef.current;
        if (!el || !onZoomChange || !onViewportStartChange) return;

        const handleWheel = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const isHorizontal = e.ctrlKey || e.shiftKey;
            const currentZoom = zoomLevelRef.current;
            const currentStart = viewportStartRef.current;
            const currentTotal = totalDurationRef.current || 3600000;

            if (isHorizontal) {
                const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
                if (delta === 0) return;

                const visibleMs = currentTotal / currentZoom;
                const maxStart = Math.max(0, currentTotal - visibleMs);
                const stepMs = (visibleMs * 0.08) * (delta > 0 ? 1 : -1);
                const nextStart = Math.max(0, Math.min(maxStart, currentStart + stepMs));

                viewportStartRef.current = nextStart;
                onViewportStartChange(nextStart);
            } else {
                if (e.deltaY === 0) return;

                const isZoomIn = e.deltaY < 0;
                const zoomFactor = isZoomIn ? 1.25 : 0.8;

                const rect = el.getBoundingClientRect();
                const trackLeft = rect.left + 150;
                const trackRight = rect.right - 58;
                const trackWidth = Math.max(100, trackRight - trackLeft);

                let mouseRatio = 0.5;
                if (e.clientX >= trackLeft && e.clientX <= trackRight) {
                    mouseRatio = (e.clientX - trackLeft) / trackWidth;
                } else if (rect.width > 0) {
                    mouseRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                }

                const maxDynamicZoom = Math.max(32, currentTotal / 2000);
                const nextZoom = Math.max(1, Math.min(maxDynamicZoom, Math.round(currentZoom * zoomFactor * 100) / 100));
                if (nextZoom === currentZoom) return;

                const oldVisibleMs = currentTotal / currentZoom;
                const newVisibleMs = currentTotal / nextZoom;
                const mouseEpochOffset = currentStart + (mouseRatio * oldVisibleMs);

                const nextStart = mouseEpochOffset - (mouseRatio * newVisibleMs);
                const maxStart = Math.max(0, currentTotal - newVisibleMs);
                const clampedStart = Math.max(0, Math.min(maxStart, nextStart));

                zoomLevelRef.current = nextZoom;
                viewportStartRef.current = clampedStart;

                onViewportStartChange(clampedStart);
                onZoomChange(nextZoom);
            }
        };

        el.addEventListener('wheel', handleWheel, { passive: false, capture: true });
        return () => el.removeEventListener('wheel', handleWheel, { capture: true });
    }, [isOpen, station, onZoomChange, onViewportStartChange]);

    const handleZoomReset = useCallback(() => {
        if (onZoomReset) {
            onZoomReset();
        } else {
            viewportStartRef.current = 0;
            zoomLevelRef.current = 1;
            onViewportStartChange?.(0);
            onZoomChange?.(1);
        }
    }, [onZoomReset, onViewportStartChange, onZoomChange]);

    const handleFitRange = useCallback((startMs, endMs) => {
        if (onFitRange) {
            onFitRange(startMs, endMs);
        } else {
            const cutDur = Math.max(1000, endMs - startMs);
            const paddingMs = Math.max(500, cutDur * 0.05);
            const targetStart = Math.max(0, startMs - paddingMs);
            const targetEnd = Math.min(totalDurationMs, endMs + paddingMs);
            const effectiveDur = targetEnd - targetStart;

            const maxDynamicZoom = Math.max(32, totalDurationMs / 2000);
            const targetZoom = Math.max(1, Math.min(maxDynamicZoom, Number((totalDurationMs / effectiveDur).toFixed(1))));
            const newVpDur = totalDurationMs / targetZoom;
            const newStart = Math.max(0, Math.min(targetStart, totalDurationMs - newVpDur));

            viewportStartRef.current = newStart;
            zoomLevelRef.current = targetZoom;
            onViewportStartChange?.(newStart);
            onZoomChange?.(targetZoom);
        }
    }, [onFitRange, totalDurationMs, onViewportStartChange, onZoomChange]);

    const handleJumpViewportTo = useCallback((targetMs, align = 'center') => {
        if (onJumpViewportTo) {
            onJumpViewportTo(targetMs, align);
        } else {
            if (targetMs === null || targetMs === undefined) return;
            const currentZoom = zoomLevelRef.current || 1;
            const vpDur = totalDurationMs / Math.max(1, currentZoom);
            const offset = align === 'start' ? vpDur / 4 : (vpDur * 0.75);
            const targetStart = Math.max(0, Math.min(targetMs - offset, totalDurationMs - vpDur));
            viewportStartRef.current = targetStart;
            onViewportStartChange?.(targetStart);
        }
    }, [onJumpViewportTo, totalDurationMs, onViewportStartChange]);

    const handleTogglePlaySmart = useCallback(() => {
        setIsPlaying(prev => !prev);
    }, [setIsPlaying]);

    const handleTriggerExport = useCallback(async () => {
        if (!station || Math.abs(outPointMs - inPointMs) < 1000) return;

        const normMode = (keystrokeMode || 'NONE').toUpperCase().replace('-', '_');
        let resolvedMode;
        if (normMode === 'NONE' || normMode === 'OFF') resolvedMode = 'None';
        else if (normMode === 'CAPTION') resolvedMode = 'Caption';
        else resolvedMode = 'BurnIn';

        const payload = {
            stationIds: [station.id],
            stations: [station.id],
            stationId: station.id,
            hostname: station.hostname || station.name || station.id,
            inEpochMs: baseEpochMs + Math.round(inPointMs),
            outEpochMs: baseEpochMs + Math.round(outPointMs),
            keystrokeMode: resolvedMode,
            layoutMode: viewMode,
            targetDisplayId: (viewMode === 'mon-0' || viewMode === 'mon-1' || viewMode.startsWith('mon-')) ? viewMode : null,
            isPipSwapped: isPipSwapped,
            directorSegments: directorPlan?.segments || station?.directorPlan?.segments || []
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
    }, [station, inPointMs, outPointMs, baseEpochMs, onExport, keystrokeMode, viewMode, isPipSwapped, directorPlan]);

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

    const currentCalculatedEpoch = playheadEpochMs > 0 ? playheadEpochMs : Math.round(baseEpochMs + playheadMs);

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
                    directorPlan={directorPlan || station?.directorPlan}
                    onOverrideDisplay={onOverrideDisplay}
                    onResetOverride={onResetDirectorSegmentToAuto}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    isPipSwapped={isPipSwapped}
                    onPipSwapChange={setIsPipSwapped}
                />

                {/* HUD Keystroke playback overlay above fullscreen player */}
                <KeystrokePlaybackOverlay
                    currentEpochMs={currentCalculatedEpoch}
                    keystrokes={keystrokes}
                    keystrokeMode={keystrokeMode}
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
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="13" height="13" className="help-icon-symbol">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <span>SHORTCUTS</span>
                    </button>
                </div>

                {allStations.length > 1 && (
                    <div className="station-switcher-pill" dir="ltr">
                        <button
                            type="button"
                            disabled={!prevStation}
                            onClick={() => prevStation && onSelectStation(prevStation.id)}
                            title={prevStation ? `Previous: ${prevStation.displayName || prevStation.roleAlias || prevStation.hostname || prevStation.name} (↑)` : 'First station'}
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
                            title={nextStation ? `Next: ${nextStation.displayName || nextStation.roleAlias || nextStation.hostname || nextStation.name} (↓)` : 'Last station'}
                        >
                            ▶
                        </button>
                    </div>
                )}

                <div className="station-brand-pill">
                    <span className="feed-res">SURVEILLANCE ARCHIVE</span>
                    <span className="divider" />
                    <span className="station-title">{station.displayName || station.roleAlias || station.hostname || station.name}</span>
                    {station.hostname && (station.displayName || station.roleAlias) && (station.displayName || station.roleAlias).toLowerCase() !== station.hostname.toLowerCase() && (
                        <span className="station-physical-badge" style={{ fontSize: '10px', color: '#94a3b8', background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px' }} title={`Physical Machine: ${station.hostname}`}>
                            {station.hostname}
                        </span>
                    )}
                </div>
            </div>

            <div className={`spotlight-bottom-island ${isPlaying ? 'is-playing-dimmed' : ''}`} ref={bottomIslandRef}>
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
                            title={`Export Selected Cut Window as ${viewMode.toUpperCase()} (Ctrl+E)`}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            <span>EXPORT CUT ({viewMode.toUpperCase()})</span>
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

                <div className="island-timeline-board-wrap">
                    <TimelineBoard
                        stations={memoizedSoloStations}
                        activeStationId={station.id}
                        onSelectActiveStation={() => { }}
                        baseEpochMs={baseEpochMs}
                        timeMode={timeMode}
                        totalDurationMs={totalDurationMs}
                        zoomLevel={zoomLevel}
                        onZoomChange={onZoomChange}
                        onZoomReset={handleZoomReset}
                        onFitRange={handleFitRange}
                        onJumpViewportTo={handleJumpViewportTo}
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
                        keystrokeMode={keystrokeMode}
                        onChangeKeystrokeMode={onChangeKeystrokeMode}
                        keystrokes={keystrokes}
                        showKeystrokes={showRulerKeystrokes}
                        showRulerKeystrokes={showRulerKeystrokes}
                        onToggleRulerKeystrokes={onToggleRulerKeystrokes}
                        onSplitDirectorSegment={onSplitDirectorSegment}
                        onChangeDirectorSegmentDisplay={onChangeDirectorSegmentDisplay}
                        onResetDirectorSegmentToAuto={onResetDirectorSegmentToAuto}
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