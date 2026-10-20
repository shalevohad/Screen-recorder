// ==========================================
// File: Features/ExtractorAdvanced/Client/src/ExtractorAdvancedStudio.jsx
// ==========================================
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import TopScopeBar from './components/TopScopeBar/TopScopeBar.jsx';
import MulticamViewport from './components/Viewport/MulticamViewport.jsx';
import TransportBar from './components/TransportBar/TransportBar.jsx';
import TimelineBoard from './components/Timeline/TimelineBoard.jsx';
import StationDrawer from './components/StationDrawer/StationDrawer.jsx';
import MasterTimeRangeModal from './components/Modals/MasterTimeRangeModal.jsx';
import BookmarksModal from './components/Modals/BookmarksModal.jsx';
import SoloSpotlightModal from './components/Modals/SoloSpotlightModal.jsx';
import ShortcutsHelpModal from './components/Modals/ShortcutsHelpModal.jsx';
import ExportJobMonitor from './components/ExportMonitor/ExportJobMonitor.jsx';
import StationContextMenu from './components/Modals/StationContextMenu.jsx';

import { useStudioData } from './hooks/useStudioData.js';
import { usePlaybackEngine } from './hooks/usePlaybackEngine.js';
import { useTimelineNavigation } from './hooks/useTimelineNavigation.js';
import { useStudioHotkeys } from './hooks/useStudioHotkeys.js';
import { getStudioSessionCache, saveStudioSessionCache, clearStudioSessionCache } from './utils/studioSessionStore.js';
import { initDstEngineAsync } from './utils/dstEngine.js';

import './components/ExportMonitor/ExportJobMonitor.scss';
import './ExtractorAdvancedStudio.scss';

const pad = (n) => String(n).padStart(2, '0');
const formatStr = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

const generateDefaultTimeRange = () => {
    const now = new Date();
    const fourHoursAgo = new Date(now.getTime() - (4 * 60 * 60 * 1000));
    return {
        start: formatStr(fourHoursAgo),
        end: formatStr(now),
        startEpochMs: fourHoursAgo.getTime(),
        endEpochMs: now.getTime(),
        durationMs: 14400000
    };
};

export const parseSafeEpoch = (dateStr) => {
    if (!dateStr) return Date.now();
    if (typeof dateStr === 'number') return dateStr;
    const safeStr = String(dateStr).replace(' ', 'T');
    const ms = new Date(safeStr).getTime();
    return isNaN(ms) ? Date.now() : ms;
};

export default function ExtractorAdvancedStudio() {
    const cached = useMemo(() => getStudioSessionCache() || {}, []);

    const [timeRange, setTimeRange] = useState(() => {
        if (cached.timeRange?.startEpochMs && cached.timeRange?.endEpochMs) {
            return cached.timeRange;
        }
        return generateDefaultTimeRange();
    });

    const [timeMode, setTimeMode] = useState(cached.timeMode || 'LOCAL');
    const [keystrokeMode, setKeystrokeMode] = useState(cached.keystrokeMode || 'BURN_IN');
    const [showRulerKeystrokes, setShowRulerKeystrokes] = useState(() => {
        return typeof cached.showRulerKeystrokes === 'boolean' ? cached.showRulerKeystrokes : false;
    });

    useEffect(() => {
        initDstEngineAsync().catch(err => console.warn('[Studio] DST init error:', err));
    }, []);

    const baseEpochMs = useMemo(() => {
        if (timeRange.startEpochMs) return timeRange.startEpochMs;
        return parseSafeEpoch(timeRange.start);
    }, [timeRange.start, timeRange.startEpochMs]);

    const bufferMs = useMemo(() => Math.max(60000, Math.round(timeRange.durationMs * 0.05)), [timeRange.durationMs]);
    const timelineBaseEpochMs = useMemo(() => baseEpochMs - bufferMs, [baseEpochMs, bufferMs]);
    const totalTimelineDurationMs = useMemo(() => timeRange.durationMs + (2 * bufferMs), [timeRange.durationMs, bufferMs]);

    const [selectedStationIds, setSelectedStationIds] = useState(cached.selectedStationIds || []);
    const [activeStationId, setActiveStationId] = useState(cached.activeStationId || null);
    const [spotlightStationId, setSpotlightStationId] = useState(null);
    const [globalGaps, setGlobalGaps] = useState([]);
    const [noStationsAlert, setNoStationsAlert] = useState(false);

    const [stationContextMenu, setStationContextMenu] = useState(null);

    const handleDeselectStation = useCallback((stationId) => {
        setSelectedStationIds(prev => prev.filter(id => id !== stationId));
        if (activeStationId === stationId) setActiveStationId(null);
        if (spotlightStationId === stationId) setSpotlightStationId(null);
    }, [activeStationId, spotlightStationId]);

    const handleStationContextMenu = useCallback((e, station) => {
        e.preventDefault();
        e.stopPropagation();

        const menuWidth = 195;
        const menuHeight = 110;
        const x = Math.min(e.clientX, window.innerWidth - menuWidth - 10);
        const y = Math.min(e.clientY, window.innerHeight - menuHeight - 10);

        setStationContextMenu({ x, y, station });
    }, []);

    const initialInPointMs = useMemo(() => {
        if (typeof cached.inEpochMs === 'number') {
            return Math.max(0, Math.min(totalTimelineDurationMs, cached.inEpochMs - timelineBaseEpochMs));
        }
        if (typeof cached.inPointMs === 'number') {
            return Math.max(0, Math.min(totalTimelineDurationMs, cached.inPointMs));
        }
        return bufferMs;
    }, [cached.inEpochMs, cached.inPointMs, timelineBaseEpochMs, totalTimelineDurationMs, bufferMs]);

    const initialOutPointMs = useMemo(() => {
        if (typeof cached.outEpochMs === 'number') {
            return Math.max(initialInPointMs + 1000, Math.min(totalTimelineDurationMs, cached.outEpochMs - timelineBaseEpochMs));
        }
        if (typeof cached.outPointMs === 'number') {
            return Math.max(initialInPointMs + 1000, Math.min(totalTimelineDurationMs, cached.outPointMs));
        }
        return bufferMs + timeRange.durationMs;
    }, [cached.outEpochMs, cached.outPointMs, timelineBaseEpochMs, totalTimelineDurationMs, bufferMs, timeRange.durationMs, initialInPointMs]);

    const initialPlayheadMs = useMemo(() => {
        if (typeof cached.playheadEpochMs === 'number') {
            return Math.max(0, Math.min(totalTimelineDurationMs, cached.playheadEpochMs - timelineBaseEpochMs));
        }
        if (typeof cached.playheadMs === 'number') {
            return Math.max(0, Math.min(totalTimelineDurationMs, cached.playheadMs));
        }
        return initialInPointMs;
    }, [cached.playheadEpochMs, cached.playheadMs, timelineBaseEpochMs, totalTimelineDurationMs, initialInPointMs]);

    const [inPointMs, setInPointMs] = useState(initialInPointMs);
    const [outPointMs, setOutPointMs] = useState(initialOutPointMs);

    const { allStations, recordingSegments, isLoadingStations, movieBoundaries } = useStudioData(
        timelineBaseEpochMs,
        totalTimelineDurationMs,
        timeRange,
        timeMode,
        activeStationId
    );

    const activeStation = useMemo(() => {
        return allStations.find(s => s.id === activeStationId) || null;
    }, [allStations, activeStationId]);

    const timelineStations = useMemo(() => {
        if (!selectedStationIds || selectedStationIds.length === 0) return [];
        return allStations.filter(s => selectedStationIds.includes(s.id));
    }, [allStations, selectedStationIds]);

    const spotlightStation = useMemo(() => {
        return allStations.find(s => s.id === spotlightStationId) || null;
    }, [allStations, spotlightStationId]);

    // Spotlight fullscreen display state
    const isSpotlightOpen = Boolean(spotlightStationId && spotlightStation);

    const lastViewBeforeFullscreenRef = useRef('grid');
    const timelineContainerRef = useRef(null);

    const {
        playheadMs,
        setPlayheadMs,
        isPlaying,
        setIsPlaying,
        playbackSpeed,
        setPlaybackSpeed,
        isLooping,
        setIsLooping,
        togglePlaySmart
    } = usePlaybackEngine({
        timelineBaseEpochMs,
        inPointMs,
        outPointMs,
        globalGaps,
        activeStation,
        spotlightStation,
        recordingSegments,
        initialPlayheadMs,
        initialIsPlaying: false,
        initialIsLooping: cached.isLooping !== undefined ? cached.isLooping : true,
        initialPlaybackSpeed: cached.playbackSpeed || 1
    });

    const {
        zoomLevel,
        setZoomLevel,
        viewportStartMs,
        setViewportStartMs,
        resetZoom,
        fitRange,
        jumpViewportTo
    } = useTimelineNavigation({
        containerRef: timelineContainerRef,
        totalTimelineDurationMs,
        initialZoom: cached.zoomLevel || 1,
        initialViewportStart: cached.viewportStartMs || 0
    });

    const [isRangeModalOpen, setIsRangeModalOpen] = useState(false);
    const [isBookmarksModalOpen, setIsBookmarksModalOpen] = useState(false);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isWorkspaceActive, setIsWorkspaceActive] = useState(
        Boolean(cached.isWorkspaceActive && cached.selectedStationIds?.length > 0)
    );

    const [activeStationKeystrokes, setActiveStationKeystrokes] = useState([]);

    useEffect(() => {
        const targetStation = isSpotlightOpen ? (spotlightStation || activeStation) : activeStation;
        const stationName = targetStation?.hostname || targetStation?.displayName || targetStation?.id;
        const normalizedMode = (keystrokeMode || 'NONE').toUpperCase().replace('-', '_');

        if (!stationName || !timelineBaseEpochMs || normalizedMode === 'NONE' || normalizedMode === 'OFF') {
            setActiveStationKeystrokes([]);
            return;
        }

        const startEpoch = timelineBaseEpochMs;
        const endEpoch = timelineBaseEpochMs + totalTimelineDurationMs;
        const ac = new AbortController();

        fetch(`/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(stationName)}&startEpoch=${startEpoch}&endEpoch=${endEpoch}`, { signal: ac.signal })
            .then(res => res.ok ? res.json() : [])
            .then(data => setActiveStationKeystrokes(Array.isArray(data) ? data : []))
            .catch(err => {
                if (err.name !== 'AbortError') setActiveStationKeystrokes([]);
            });

        return () => ac.abort();
    }, [activeStation, spotlightStation, isSpotlightOpen, timelineBaseEpochMs, totalTimelineDurationMs, keystrokeMode]);

    useEffect(() => {
        if (selectedStationIds.length === 1) {
            const singleId = selectedStationIds[0];
            if (activeStationId !== singleId) {
                setActiveStationId(singleId);
            }
        }
    }, [selectedStationIds, activeStationId]);

    useEffect(() => {
        if (isLoadingStations) return;

        if (allStations.length === 0) {
            if (selectedStationIds.length > 0 || activeStationId || isWorkspaceActive) {
                setSelectedStationIds([]);
                setActiveStationId(null);
                setSpotlightStationId(null);
                setIsWorkspaceActive(false);
            }
            setIsDrawerOpen(true);
            setNoStationsAlert(true);
        } else {
            setNoStationsAlert(false);

            setSelectedStationIds(prev => {
                const valid = prev.filter(id => allStations.some(s => s.id === id));
                if (valid.length !== prev.length) {
                    if (valid.length === 0) {
                        setIsWorkspaceActive(false);
                        setIsDrawerOpen(true);
                    }
                    return valid;
                }
                return prev;
            });
        }
    }, [isLoadingStations, allStations]);

    const handleSelectActiveStation = useCallback((id) => {
        if (selectedStationIds.length <= 1) return;
        if (id === null) {
            setIsPlaying(false);
            setPlaybackSpeed(1);
        } else if (id !== activeStationId) {
            setPlaybackSpeed(1);
        }
        setActiveStationId(id);
    }, [activeStationId, selectedStationIds.length, setIsPlaying, setPlaybackSpeed]);

    const handleOpenSpotlightFullscreen = useCallback((id) => {
        if (id !== activeStationId) setPlaybackSpeed(1);
        lastViewBeforeFullscreenRef.current = (selectedStationIds.length <= 1 || activeStationId) ? 'spotlight' : 'grid';
        setActiveStationId(id);
        setSpotlightStationId(id);
    }, [activeStationId, selectedStationIds.length, setPlaybackSpeed]);

    const handleCloseSpotlightFullscreen = useCallback(() => {
        setSpotlightStationId(null);
        if (selectedStationIds.length <= 1) {
            if (selectedStationIds.length === 1) setActiveStationId(selectedStationIds[0]);
            return;
        }
        if (lastViewBeforeFullscreenRef.current === 'grid') {
            setActiveStationId(null);
        }
    }, [selectedStationIds]);

    useStudioHotkeys({
        activeStationId,
        spotlightStationId,
        timelineStations,
        selectedStationIdsCount: selectedStationIds.length,
        onSelectActiveStation: handleSelectActiveStation,
        setPlaybackSpeed,
        playheadMs,
        setPlayheadMs,
        inPointMs,
        setInPointMs,
        outPointMs,
        setOutPointMs,
        totalTimelineDurationMs,
        zoomLevel,
        togglePlaySmart,
        onToggleHelpModal: () => setIsHelpModalOpen(prev => !prev),
        isModalActive: isRangeModalOpen || isBookmarksModalOpen || isHelpModalOpen
    });

    useEffect(() => {
        const inEpochMs = timelineBaseEpochMs + inPointMs;
        const outEpochMs = timelineBaseEpochMs + outPointMs;
        const playheadEpochMs = timelineBaseEpochMs + playheadMs;

        saveStudioSessionCache({
            timeRange,
            timeMode,
            inPointMs,
            outPointMs,
            playheadMs: Math.round(playheadMs),
            inEpochMs,
            outEpochMs,
            playheadEpochMs,
            selectedStationIds,
            activeStationId,
            zoomLevel,
            viewportStartMs,
            isWorkspaceActive,
            isLooping,
            playbackSpeed,
            keystrokeMode,
            showRulerKeystrokes
        });
    }, [
        timeRange,
        timeMode,
        inPointMs,
        outPointMs,
        playheadMs,
        selectedStationIds,
        activeStationId,
        zoomLevel,
        viewportStartMs,
        isWorkspaceActive,
        isLooping,
        playbackSpeed,
        timelineBaseEpochMs,
        keystrokeMode,
        showRulerKeystrokes
    ]);

    const handleLoadBookmark = useCallback((bm) => {
        const startMs = parseSafeEpoch(bm.startTime);
        const endMs = parseSafeEpoch(bm.endTime);
        const durationMs = Math.max(0, endMs - startMs) || 14400000;
        const newRange = {
            start: bm.startTime,
            end: bm.endTime,
            durationMs,
            startEpochMs: startMs,
            endEpochMs: endMs
        };
        const newBuf = Math.max(60000, Math.round(durationMs * 0.05));
        const newTimelineBase = startMs - newBuf;
        const newTotal = durationMs + (2 * newBuf);

        setTimeRange(newRange);

        if (bm.inEpochMs && bm.outEpochMs) {
            const targetIn = Math.max(0, Math.min(newTotal, bm.inEpochMs - newTimelineBase));
            const targetOut = Math.max(targetIn + 1000, Math.min(newTotal, bm.outEpochMs - newTimelineBase));
            const targetPlayhead = bm.playheadEpochMs
                ? Math.max(0, Math.min(newTotal, bm.playheadEpochMs - newTimelineBase))
                : targetIn;

            setInPointMs(targetIn);
            setOutPointMs(targetOut);
            setPlayheadMs(targetPlayhead);
        } else {
            const rawIn = typeof bm.inPointMs === 'number' ? bm.inPointMs : newBuf;
            const rawOut = typeof bm.outPointMs === 'number' ? bm.outPointMs : (newBuf + durationMs);
            const rawPlay = typeof bm.playheadMs === 'number' ? bm.playheadMs : rawIn;

            setInPointMs(Math.max(0, Math.min(newTotal, rawIn)));
            setOutPointMs(Math.max(0, Math.min(newTotal, rawOut)));
            setPlayheadMs(Math.max(0, Math.min(newTotal, rawPlay)));
        }

        const stationsToSelect = (bm.selectedStationIds?.length > 0)
            ? bm.selectedStationIds
            : (bm.cutStationIds?.length > 0 ? bm.cutStationIds : bm.stationIds);

        if (stationsToSelect?.length > 0) {
            setSelectedStationIds(stationsToSelect);

            const rawSpotlightId = bm.spotlightStationId || bm.SpotlightStationId || null;
            const rawActiveId = bm.activeStationId || bm.ActiveStationId || null;

            if (rawSpotlightId && stationsToSelect.includes(rawSpotlightId)) {
                setActiveStationId(rawSpotlightId);
                setSpotlightStationId(rawSpotlightId);
            } else if (rawActiveId && stationsToSelect.includes(rawActiveId)) {
                setActiveStationId(rawActiveId);
                setSpotlightStationId(null);
            } else if (stationsToSelect.length === 1) {
                setActiveStationId(stationsToSelect[0]);
                setSpotlightStationId(null);
            } else {
                setActiveStationId(null);
                setSpotlightStationId(null);
            }
        }

        if (bm.keystrokeMode) setKeystrokeMode(bm.keystrokeMode);
        setIsWorkspaceActive(true);
        setIsDrawerOpen(false);
    }, []);

    const handleApplyRange = useCallback((newRange) => {
        const startMs = newRange.startEpochMs || parseSafeEpoch(newRange.start);
        const endMs = newRange.endEpochMs || parseSafeEpoch(newRange.end);
        const durationMs = Math.max(0, endMs - startMs) || 14400000;
        const newBuf = Math.max(60000, Math.round(durationMs * 0.05));

        setTimeRange({
            ...newRange,
            startEpochMs: startMs,
            endEpochMs: endMs,
            durationMs
        });
        setNoStationsAlert(false);
        setInPointMs(newBuf);
        setOutPointMs(newBuf + durationMs);
        setPlayheadMs(newBuf);
    }, []);

    const handleExecuteExport = useCallback(async () => {
        const targetStationIds = timelineStations.map(s => s.id);
        if (targetStationIds.length === 0) return alert('No active stations selected in timeline.');

        let resolvedMode = 'BurnIn';
        const normMode = (keystrokeMode || 'NONE').toUpperCase().replace('-', '_');
        if (normMode === 'NONE' || normMode === 'OFF') resolvedMode = 'None';
        else if (normMode === 'CAPTION') resolvedMode = 'Caption';
        else resolvedMode = 'BurnIn';

        try {
            const response = await fetch('/api/v1/extractor-advanced/cut', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    stationIds: targetStationIds,
                    inEpochMs: timelineBaseEpochMs + inPointMs,
                    outEpochMs: timelineBaseEpochMs + outPointMs,
                    keystrokeMode: resolvedMode
                })
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            window.dispatchEvent(new CustomEvent('open-export-monitor'));
        } catch (error) {
            console.error('[Studio] Export failed:', error);
            alert('Failed to launch background export job.');
        }
    }, [timelineStations, timelineBaseEpochMs, inPointMs, outPointMs, keystrokeMode]);

    const handleResetStudioSession = useCallback(() => {
        clearStudioSessionCache();
        try {
            window.dispatchEvent(new CustomEvent('extractor:clear-session'));
        } catch { }

        const defaultRange = generateDefaultTimeRange();
        const newBuf = Math.max(60000, Math.round(defaultRange.durationMs * 0.05));

        setTimeRange(defaultRange);
        setInPointMs(newBuf);
        setOutPointMs(newBuf + defaultRange.durationMs);
        setPlayheadMs(newBuf);
        setSelectedStationIds([]);
        setActiveStationId(null);
        setSpotlightStationId(null);
        setIsPlaying(false);
        setPlaybackSpeed(1);
        setKeystrokeMode('BURN_IN');
        resetZoom();
        setIsWorkspaceActive(false);
        setIsDrawerOpen(true);
    }, [resetZoom, setIsPlaying, setPlaybackSpeed, setPlayheadMs]);

    const isInitialSetup = !isWorkspaceActive || selectedStationIds.length === 0;
    const currentPlayheadEpochMs = timelineBaseEpochMs + playheadMs;

    return (
        <div className="extractor-advanced-studio">
            <div className="studio-workspace-area">
                <TopScopeBar
                    timeRange={timeRange}
                    baseEpochMs={baseEpochMs}
                    timeMode={timeMode}
                    setTimeMode={setTimeMode}
                    activeStationId={activeStationId}
                    hideBackToGrid={timelineStations.length <= 1}
                    onResetActiveStation={() => handleSelectActiveStation(null)}
                    onOpenRangeModal={() => setIsRangeModalOpen(true)}
                    onOpenBookmarksModal={() => setIsBookmarksModalOpen(true)}
                    onOpenHelpModal={() => setIsHelpModalOpen(true)}
                    onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
                    isInitialSetup={isInitialSetup}
                    selectedCount={selectedStationIds.length}
                    totalCount={allStations.length}
                    onResetStudio={handleResetStudioSession}
                />

                {noStationsAlert && (
                    <div className="studio-scope-alert-banner">
                        <div className="alert-content">
                            <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <div className="alert-text">
                                <span className="alert-title">NO RECORDING SESSIONS FOUND IN SELECTED TIME SCOPE</span>
                                <span className="alert-desc">
                                    No stations or recorded video segments were found in the selected time range ({timeRange.start} — {timeRange.end}).
                                </span>
                            </div>
                        </div>
                        <div className="alert-actions">
                            <button
                                type="button"
                                className="btn-alert-change-time"
                                onClick={() => setIsRangeModalOpen(true)}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                <span>CHANGE TIME SCOPE</span>
                            </button>
                            <button
                                type="button"
                                className="btn-alert-dismiss"
                                onClick={() => setNoStationsAlert(false)}
                                title="Dismiss Alert"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}

                <div className="studio-lower-body">
                    {!isInitialSetup && (
                        <div className="studio-left-content">
                            <div className="studio-main-viewport-container">
                                <MulticamViewport
                                    activeStation={activeStation}
                                    timelineStations={timelineStations}
                                    onSelectActiveStation={handleSelectActiveStation}
                                    onOpenSpotlight={handleOpenSpotlightFullscreen}
                                    onStationContextMenu={handleStationContextMenu}
                                    onOpenDrawer={() => setIsDrawerOpen(true)}
                                    baseEpochMs={timelineBaseEpochMs}
                                    playheadMs={playheadMs}
                                    playheadEpochMs={currentPlayheadEpochMs}
                                    timeMode={timeMode}
                                    /* Critical: When Spotlight is open, disable playback and audio in the underlying Viewport */
                                    isPlaying={isSpotlightOpen ? false : isPlaying}
                                    setIsPlaying={setIsPlaying}
                                    totalDurationMs={totalTimelineDurationMs}
                                    inPointMs={inPointMs}
                                    outPointMs={outPointMs}
                                    setPlayheadMs={setPlayheadMs}
                                    globalGaps={globalGaps}
                                    recordingSegments={recordingSegments}
                                    playbackSpeed={playbackSpeed}
                                    keystrokeMode={keystrokeMode}
                                    keystrokes={activeStationKeystrokes}
                                />
                                <TransportBar
                                    baseEpochMs={timelineBaseEpochMs}
                                    timeMode={timeMode}
                                    totalDurationMs={totalTimelineDurationMs}
                                    playheadMs={playheadMs}
                                    setPlayheadMs={setPlayheadMs}
                                    inPointMs={inPointMs}
                                    setInPointMs={setInPointMs}
                                    outPointMs={outPointMs}
                                    setOutPointMs={setOutPointMs}
                                    activeStationId={activeStationId}
                                    isPlaying={isPlaying}
                                    setIsPlaying={togglePlaySmart}
                                    isLooping={isLooping}
                                    setIsLooping={setIsLooping}
                                    playbackSpeed={playbackSpeed}
                                    onChangeSpeed={setPlaybackSpeed}
                                    onSetInPoint={() => setInPointMs(Math.max(0, Math.min(playheadMs, outPointMs - 1000)))}
                                    onSetOutPoint={() => setOutPointMs(Math.min(totalTimelineDurationMs, Math.max(playheadMs, inPointMs + 1000)))}
                                />
                            </div>

                            <div className="studio-bottom-timeline" ref={timelineContainerRef}>
                                <TimelineBoard
                                    stations={timelineStations}
                                    activeStationId={activeStationId}
                                    onSelectActiveStation={(id) => handleSelectActiveStation(selectedStationIds.length <= 1 ? id : (id === activeStationId ? null : id))}
                                    onStationContextMenu={handleStationContextMenu}
                                    baseEpochMs={timelineBaseEpochMs}
                                    timeMode={timeMode}
                                    totalDurationMs={totalTimelineDurationMs}
                                    zoomLevel={zoomLevel}
                                    onZoomChange={setZoomLevel}
                                    onZoomReset={resetZoom}
                                    onFitRange={fitRange}
                                    onJumpViewportTo={jumpViewportTo}
                                    playheadMs={playheadMs}
                                    setPlayheadMs={setPlayheadMs}
                                    inPointMs={inPointMs}
                                    setInPointMs={setInPointMs}
                                    outPointMs={outPointMs}
                                    setOutPointMs={setOutPointMs}
                                    viewportStartMs={viewportStartMs}
                                    onViewportStartChange={setViewportStartMs}
                                    onExport={handleExecuteExport}
                                    recordingSegments={recordingSegments}
                                    movieBoundaries={movieBoundaries}
                                    onEstimateLoaded={(est) => est?.removedGlobalGaps && setGlobalGaps(est.removedGlobalGaps)}
                                    keystrokeMode={keystrokeMode}
                                    onChangeKeystrokeMode={setKeystrokeMode}
                                    showKeystrokes={showRulerKeystrokes}
                                    showRulerKeystrokes={showRulerKeystrokes}
                                    onToggleRulerKeystrokes={() => setShowRulerKeystrokes(prev => !prev)}
                                />
                            </div>
                        </div>
                    )}

                    <StationDrawer
                        isOpen={isDrawerOpen || isInitialSetup}
                        onToggle={() => setIsDrawerOpen(!isDrawerOpen)}
                        onClose={() => setIsDrawerOpen(false)}
                        allStations={allStations}
                        selectedStationIds={selectedStationIds}
                        onToggleStation={(id) => setSelectedStationIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])}
                        onUpdateSelections={setSelectedStationIds}
                        isInitialSetup={isInitialSetup}
                        isLoadingStations={isLoadingStations}
                        recordingSegments={recordingSegments}
                        baseEpochMs={baseEpochMs}
                        durationMs={timeRange.durationMs}
                        onApply={() => {
                            if (selectedStationIds.length > 0) {
                                if (selectedStationIds.length === 1) {
                                    setActiveStationId(selectedStationIds[0]);
                                } else {
                                    setActiveStationId(null);
                                }
                                setSpotlightStationId(null);
                                setIsWorkspaceActive(true);
                                setIsDrawerOpen(false);
                            }
                        }}
                        onOpenRangeModal={() => setIsRangeModalOpen(true)}
                    />
                </div>
            </div>

            <MasterTimeRangeModal
                isOpen={isRangeModalOpen}
                onClose={() => setIsRangeModalOpen(false)}
                currentRange={timeRange}
                timeMode={timeMode}
                onTimeModeChange={setTimeMode}
                onLoadBookmark={handleLoadBookmark}
                onApplyRange={handleApplyRange}
            />

            <BookmarksModal
                isOpen={isBookmarksModalOpen}
                onClose={() => setIsBookmarksModalOpen(false)}
                currentState={{
                    timeRange,
                    baseEpochMs: timelineBaseEpochMs,
                    timelineBaseEpochMs,
                    playheadMs,
                    inPointMs,
                    outPointMs,
                    selectedStationIds,
                    selectedStationNames: allStations
                        .filter(s => selectedStationIds.includes(s.id))
                        .map(s => s.displayName || s.hostname || s.id),
                    allStationIds: allStations.map(s => s.id),
                    activeStationId,
                    activeStationName: activeStation?.displayName || activeStation?.hostname || null,
                    spotlightStationId,
                    keystrokeMode
                }}
                onLoadBookmark={handleLoadBookmark}
            />

            <ShortcutsHelpModal
                isOpen={isHelpModalOpen}
                onClose={() => setIsHelpModalOpen(false)}
            />

            <SoloSpotlightModal
                isOpen={isSpotlightOpen}
                station={spotlightStation}
                allStations={timelineStations}
                onSelectStation={(newId) => {
                    if (newId !== spotlightStationId) setPlaybackSpeed(1);
                    setActiveStationId(newId);
                    setSpotlightStationId(newId);
                }}
                onClose={handleCloseSpotlightFullscreen}
                baseEpochMs={timelineBaseEpochMs}
                timeMode={timeMode}
                totalDurationMs={totalTimelineDurationMs}
                zoomLevel={zoomLevel}
                onZoomChange={setZoomLevel}
                onZoomReset={resetZoom}
                onFitRange={fitRange}
                onJumpViewportTo={jumpViewportTo}
                viewportStartMs={viewportStartMs}
                onViewportStartChange={setViewportStartMs}
                playheadMs={playheadMs}
                setPlayheadMs={setPlayheadMs}
                playheadEpochMs={currentPlayheadEpochMs}
                inPointMs={inPointMs}
                setInPointMs={setInPointMs}
                outPointMs={outPointMs}
                setOutPointMs={setOutPointMs}
                recordingSegments={recordingSegments}
                globalGaps={globalGaps}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                isLooping={isLooping}
                setIsLooping={setIsLooping}
                playbackSpeed={playbackSpeed}
                setPlaybackSpeed={setPlaybackSpeed}
                onExport={handleExecuteExport}
                keystrokeMode={keystrokeMode}
                onChangeKeystrokeMode={setKeystrokeMode}
                keystrokes={activeStationKeystrokes}
                showRulerKeystrokes={showRulerKeystrokes}
                onToggleRulerKeystrokes={() => setShowRulerKeystrokes(prev => !prev)}
            />

            <StationContextMenu
                menu={stationContextMenu}
                onClose={() => setStationContextMenu(null)}
                onDeselect={handleDeselectStation}
                onFocusSolo={handleSelectActiveStation}
            />

            <ExportJobMonitor />
        </div>
    );
}