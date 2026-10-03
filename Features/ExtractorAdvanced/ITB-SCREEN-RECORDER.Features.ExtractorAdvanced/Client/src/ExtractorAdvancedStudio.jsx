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

import { useStudioData } from './hooks/useStudioData.js';
import { usePlaybackEngine } from './hooks/usePlaybackEngine.js';
import { useTimelineNavigation } from './hooks/useTimelineNavigation.js';
import { useStudioHotkeys } from './hooks/useStudioHotkeys.js';
import { getStudioSessionCache, saveStudioSessionCache } from './utils/studioSessionStore.js';

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
        durationMs: 14400000
    };
};

const parseSafeEpoch = (dateStr) => {
    if (!dateStr) return new Date().getTime();
    const safeStr = String(dateStr).replace(' ', 'T');
    const ms = new Date(safeStr).getTime();
    return isNaN(ms) ? new Date().getTime() : ms;
};

export default function ExtractorAdvancedStudio() {
    const cached = useMemo(() => getStudioSessionCache() || {}, []);

    const [timeRange, setTimeRange] = useState(cached.timeRange || generateDefaultTimeRange());
    const [timeMode, setTimeMode] = useState(cached.timeMode || 'LOCAL');

    const baseEpochMs = useMemo(() => parseSafeEpoch(timeRange.start), [timeRange.start]);
    const bufferMs = useMemo(() => Math.max(60000, Math.round(timeRange.durationMs * 0.05)), [timeRange.durationMs]);
    const timelineBaseEpochMs = useMemo(() => baseEpochMs - bufferMs, [baseEpochMs, bufferMs]);
    const totalTimelineDurationMs = useMemo(() => timeRange.durationMs + (2 * bufferMs), [timeRange.durationMs, bufferMs]);

    const [selectedStationIds, setSelectedStationIds] = useState(cached.selectedStationIds || []);
    const [activeStationId, setActiveStationId] = useState(cached.activeStationId || null);
    const [spotlightStationId, setSpotlightStationId] = useState(null);
    const [globalGaps, setGlobalGaps] = useState([]);

    const [inPointMs, setInPointMs] = useState(cached.inPointMs !== null && cached.inPointMs !== undefined ? cached.inPointMs : 0);
    const [outPointMs, setOutPointMs] = useState(cached.outPointMs !== null && cached.outPointMs !== undefined ? cached.outPointMs : totalTimelineDurationMs);

    const { allStations, recordingSegments, isLoadingStations, movieBoundaries } = useStudioData(
        timelineBaseEpochMs,
        totalTimelineDurationMs,
        timeRange,
        timeMode,
        activeStationId
    );

    const activeStation = allStations.find(s => s.id === activeStationId);
    const timelineStations = allStations.filter(s => selectedStationIds.includes(s.id));
    const spotlightStation = allStations.find(s => s.id === spotlightStationId);

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
        initialPlayheadMs: cached.playheadMs || 0,
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

    useEffect(() => {
        if (selectedStationIds.length === 1) {
            const singleId = selectedStationIds[0];
            if (activeStationId !== singleId) {
                setActiveStationId(singleId);
            }
        }
    }, [selectedStationIds, activeStationId]);

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
        const timer = setTimeout(() => {
            saveStudioSessionCache({
                timeRange,
                timeMode,
                inPointMs,
                outPointMs,
                playheadMs: Math.round(playheadMs),
                selectedStationIds,
                activeStationId,
                zoomLevel,
                viewportStartMs,
                isWorkspaceActive,
                isLooping,
                playbackSpeed
            });
        }, 1200);

        return () => clearTimeout(timer);
    }, [timeRange, timeMode, inPointMs, outPointMs, playheadMs, selectedStationIds, activeStationId, zoomLevel, viewportStartMs, isWorkspaceActive, isLooping, playbackSpeed]);

    const handleExportSmartCut = async () => {
        const targetStationIds = timelineStations.map(s => s.id);
        if (targetStationIds.length === 0) return alert('No active stations selected in timeline.');

        try {
            const response = await fetch('/api/v1/extractor-advanced/cut', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    stationIds: targetStationIds,
                    inEpochMs: timelineBaseEpochMs + inPointMs,
                    outEpochMs: timelineBaseEpochMs + outPointMs
                })
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            window.dispatchEvent(new CustomEvent('open-export-monitor'));
        } catch (error) {
            console.error('[Studio] Export failed:', error);
            alert('Failed to launch background export job.');
        }
    };

    const handleResetStudioSession = useCallback(() => {
        try {
            localStorage.removeItem('itb_studio_session_cache');
            window.dispatchEvent(new CustomEvent('extractor:clear-session'));
        } catch { }

        const defaultRange = generateDefaultTimeRange();
        const newBuf = Math.max(60000, Math.round(defaultRange.durationMs * 0.05));
        const newTotal = defaultRange.durationMs + (2 * newBuf);

        setTimeRange(defaultRange);
        setInPointMs(0);
        setOutPointMs(newTotal);
        setPlayheadMs(0);
        setSelectedStationIds([]);
        setActiveStationId(null);
        setSpotlightStationId(null);
        setIsPlaying(false);
        setPlaybackSpeed(1);
        resetZoom();
        setIsWorkspaceActive(false);
        setIsDrawerOpen(true);
    }, [resetZoom, setIsPlaying, setPlaybackSpeed, setPlayheadMs]);

    const isInitialSetup = !isWorkspaceActive || selectedStationIds.length === 0;

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

                <div className="studio-lower-body">
                    {!isInitialSetup && (
                        <div className="studio-left-content">
                            <div className="studio-main-viewport-container">
                                <MulticamViewport
                                    activeStation={activeStation}
                                    timelineStations={timelineStations}
                                    onSelectActiveStation={handleSelectActiveStation}
                                    onOpenSpotlight={handleOpenSpotlightFullscreen}
                                    onOpenDrawer={() => setIsDrawerOpen(true)}
                                    baseEpochMs={timelineBaseEpochMs}
                                    playheadMs={playheadMs}
                                    timeMode={timeMode}
                                    isPlaying={isPlaying}
                                    setIsPlaying={setIsPlaying}
                                    totalDurationMs={totalTimelineDurationMs}
                                    inPointMs={inPointMs}
                                    outPointMs={outPointMs}
                                    setPlayheadMs={setPlayheadMs}
                                    globalGaps={globalGaps}
                                    recordingSegments={recordingSegments}
                                    playbackSpeed={playbackSpeed}
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
                                    onExport={handleExportSmartCut}
                                    recordingSegments={recordingSegments}
                                    movieBoundaries={movieBoundaries}
                                    onEstimateLoaded={(est) => est?.removedGlobalGaps && setGlobalGaps(est.removedGlobalGaps)}
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
                onApplyRange={(newRange) => {
                    const newBuf = Math.max(60000, Math.round(newRange.durationMs * 0.05));
                    const newTotal = newRange.durationMs + (2 * newBuf);
                    setTimeRange(newRange);
                    setInPointMs(0);
                    setOutPointMs(newTotal);
                    setPlayheadMs(0);
                }}
            />

            <BookmarksModal
                isOpen={isBookmarksModalOpen}
                onClose={() => setIsBookmarksModalOpen(false)}
                currentState={{ timeRange, playheadMs, inPointMs, outPointMs, selectedStationIds }}
                onLoadBookmark={(bm) => {
                    const startMs = parseSafeEpoch(bm.startTime);
                    const endMs = parseSafeEpoch(bm.endTime);
                    const durationMs = Math.max(0, endMs - startMs);
                    const newRange = { start: bm.startTime, end: bm.endTime, durationMs: durationMs > 0 ? durationMs : 14400000 };
                    const newBuf = Math.max(60000, Math.round(newRange.durationMs * 0.05));

                    setTimeRange(newRange);
                    setInPointMs(bm.inPointMs !== undefined ? bm.inPointMs + newBuf : 0);
                    setOutPointMs(bm.outPointMs !== undefined ? bm.outPointMs + newBuf : (newRange.durationMs + 2 * newBuf));
                    setPlayheadMs(bm.playheadMs !== undefined ? bm.playheadMs + newBuf : 0);

                    if (bm.stationIds?.length > 0) {
                        setSelectedStationIds(bm.stationIds);
                        setActiveStationId(bm.stationIds.length === 1 ? bm.stationIds[0] : null);
                        setSpotlightStationId(null);
                    }
                    setIsWorkspaceActive(true);
                    setIsDrawerOpen(false);
                }}
            />

            <ShortcutsHelpModal
                isOpen={isHelpModalOpen}
                onClose={() => setIsHelpModalOpen(false)}
            />

            <SoloSpotlightModal
                isOpen={Boolean(spotlightStationId && spotlightStation)}
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
                viewportStartMs={viewportStartMs}
                onViewportStartChange={setViewportStartMs}
                playheadMs={playheadMs}
                setPlayheadMs={setPlayheadMs}
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
                onExport={handleExportSmartCut}
            />

            <ExportJobMonitor />
        </div>
    );
}