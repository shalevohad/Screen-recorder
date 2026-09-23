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
import ExportJobMonitor from './components/ExportMonitor/ExportJobMonitor.jsx';
import { getStudioSessionCache, saveStudioSessionCache } from './studioSessionStore.js';
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

    const [allStations, setAllStations] = useState(cached.allStations || []);
    const [recordingSegments, setRecordingSegments] = useState({});
    const [isLoadingStations, setIsLoadingStations] = useState(false);

    const [selectedStationIds, setSelectedStationIds] = useState(cached.selectedStationIds || []);
    const [activeStationId, setActiveStationId] = useState(cached.activeStationId || null);
    const [spotlightStationId, setSpotlightStationId] = useState(null);

    const [isRangeModalOpen, setIsRangeModalOpen] = useState(false);
    const [isBookmarksModalOpen, setIsBookmarksModalOpen] = useState(false);

    // ניהול הזום וגלילת ה-Viewport ברמת הסטודיו הראשי
    const [zoomLevel, setZoomLevel] = useState(cached.zoomLevel || 1);
    const [viewportStartMs, setViewportStartMs] = useState(cached.viewportStartMs || 0);
    const viewportDurationMs = totalTimelineDurationMs / zoomLevel;

    const [inPointMs, setInPointMs] = useState(cached.inPointMs ?? bufferMs);
    const [outPointMs, setOutPointMs] = useState(cached.outPointMs ?? (bufferMs + timeRange.durationMs));
    const [playheadMs, setPlayheadMs] = useState(cached.playheadMs ?? (cached.inPointMs ?? bufferMs));

    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [globalGaps, setGlobalGaps] = useState([]);

    // עצירת הניגון במסך הראשי ברגע שנפתח חלון הספוטלייט (מניעת ניגון כפול ברקע)
    useEffect(() => {
        if (spotlightStationId) {
            setIsPlaying(false);
        }
    }, [spotlightStationId]);

    useEffect(() => {
        setPlayheadMs((prev) => {
            if (prev < inPointMs) return inPointMs;
            if (prev > outPointMs) {
                setIsPlaying(false);
                return outPointMs;
            }
            return prev;
        });
    }, [inPointMs, outPointMs]);

    const lastTickRef = useRef(null);
    const requestRef = useRef(null);

    const updatePlayhead = useCallback((timestamp) => {
        if (!lastTickRef.current) lastTickRef.current = timestamp;
        const deltaMs = timestamp - lastTickRef.current;
        lastTickRef.current = timestamp;

        setPlayheadMs((prev) => {
            let nextPos = prev + deltaMs;

            if (globalGaps && globalGaps.length > 0) {
                const currentEpoch = timelineBaseEpochMs + nextPos;
                const activeGap = globalGaps.find(g => currentEpoch >= g.startEpochMs && currentEpoch < g.endEpochMs);
                if (activeGap) {
                    const gapEndOffsetMs = activeGap.endEpochMs - timelineBaseEpochMs;
                    nextPos = gapEndOffsetMs;
                }
            }

            if (nextPos >= outPointMs) {
                if (isLooping) {
                    nextPos = inPointMs;
                } else {
                    setIsPlaying(false);
                    nextPos = outPointMs;
                }
            }
            return nextPos;
        });

        if (isPlaying) {
            requestRef.current = requestAnimationFrame(updatePlayhead);
        }
    }, [isPlaying, isLooping, inPointMs, outPointMs, globalGaps, timelineBaseEpochMs]);

    useEffect(() => {
        if (isPlaying) {
            lastTickRef.current = performance.now();
            requestRef.current = requestAnimationFrame(updatePlayhead);
        } else {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            lastTickRef.current = null;
        }

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isPlaying, updatePlayhead]);

    const [isWorkspaceActive, setIsWorkspaceActive] = useState(
        Boolean(cached.isWorkspaceActive && cached.selectedStationIds?.length > 0)
    );
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        saveStudioSessionCache({
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
            allStations
        });
    }, [timeRange, timeMode, inPointMs, outPointMs, playheadMs, selectedStationIds, activeStationId, zoomLevel, viewportStartMs, isWorkspaceActive, allStations]);

    const fetchActiveStationsForTimeScope = useCallback(async () => {
        if (isNaN(timelineBaseEpochMs)) return;
        const endEpochMs = timelineBaseEpochMs + totalTimelineDurationMs;

        setIsLoadingStations(true);
        try {
            const queryParams = new URLSearchParams({
                startEpoch: String(timelineBaseEpochMs),
                endEpoch: String(endEpochMs),
                startTime: timeRange.start,
                endTime: timeRange.end,
                timeMode: timeMode
            });

            const res = await fetch(`/api/v1/extractor-advanced/stations?${queryParams.toString()}`);
            if (res.ok) {
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const data = await res.json();
                    const rawList = Array.isArray(data) ? data : (data.stations || data.items || []);

                    const normalized = rawList.map(item => ({
                        id: String(item.id || item.stationId || item.agentId || item.hostname),
                        hostname: item.hostname || item.displayName || item.name || 'Station',
                        displayName: item.displayName || item.hostname || item.name,
                        isOnline: item.isOnline !== undefined ? item.isOnline : true,
                        recordingsCount: item.recordingsCount || 0
                    }));

                    setAllStations(normalized);
                }
            }
        } catch (err) {
            console.warn('[Studio] Failed fetching active stations for scope:', err);
        } finally {
            setIsLoadingStations(false);
        }
    }, [timelineBaseEpochMs, totalTimelineDurationMs, timeRange.start, timeRange.end, timeMode]);

    useEffect(() => {
        fetchActiveStationsForTimeScope();
    }, [fetchActiveStationsForTimeScope]);

    const stationIdsKey = useMemo(() => allStations.map(s => s.id).sort().join(','), [allStations]);

    useEffect(() => {
        if (!stationIdsKey || isNaN(timelineBaseEpochMs)) {
            setRecordingSegments({});
            return;
        }

        let isMounted = true;
        const fetchSegments = async () => {
            try {
                const endEpochMs = timelineBaseEpochMs + totalTimelineDurationMs;
                const res = await fetch(`/api/v1/extractor/timeline-segments?stations=${stationIdsKey}&startEpoch=${timelineBaseEpochMs}&endEpoch=${endEpochMs}`);
                if (res.ok && isMounted) {
                    const data = await res.json();
                    setRecordingSegments(data || {});
                }
            } catch {
                if (isMounted) setRecordingSegments({});
            }
        };

        fetchSegments();
        return () => { isMounted = false; };
    }, [stationIdsKey, timelineBaseEpochMs, totalTimelineDurationMs]);

    useEffect(() => {
        if (selectedStationIds.length === 1 && !activeStationId) {
            setActiveStationId(selectedStationIds[0]);
        } else if (selectedStationIds.length === 0 && allStations.length === 1) {
            setSelectedStationIds([allStations[0].id]);
            setActiveStationId(allStations[0].id);
            setIsWorkspaceActive(true);
        }
    }, [selectedStationIds, allStations, activeStationId]);

    useEffect(() => {
        if (activeStationId && !selectedStationIds.includes(activeStationId)) {
            setActiveStationId(null);
        }
        if (spotlightStationId && !selectedStationIds.includes(spotlightStationId)) {
            setSpotlightStationId(selectedStationIds[0] || null);
        }
        if (selectedStationIds.length === 0 && isWorkspaceActive) {
            setIsWorkspaceActive(false);
        }
    }, [selectedStationIds, activeStationId, spotlightStationId, isWorkspaceActive]);

    const isInitialSetup = !isWorkspaceActive || selectedStationIds.length === 0;
    const forceDrawerOpen = isDrawerOpen || isInitialSetup;

    const activeStation = allStations.find(s => s.id === activeStationId);
    const timelineStations = allStations.filter(s => selectedStationIds.includes(s.id));
    const spotlightStation = allStations.find(s => s.id === spotlightStationId);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
            if (isRangeModalOpen || isBookmarksModalOpen || spotlightStationId) return;

            if (e.code === 'Space') {
                e.preventDefault();
                setIsPlaying(p => !p);
                return;
            }

            if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
            if (!activeStationId || timelineStations.length <= 1) return;

            e.preventDefault();
            const currentIdx = timelineStations.findIndex(s => s.id === activeStationId);
            if (currentIdx === -1) {
                setActiveStationId(timelineStations[0].id);
                return;
            }

            if (e.key === 'ArrowDown') {
                const nextIdx = (currentIdx + 1) % timelineStations.length;
                setActiveStationId(timelineStations[nextIdx].id);
            } else if (e.key === 'ArrowUp') {
                const prevIdx = (currentIdx - 1 + timelineStations.length) % timelineStations.length;
                setActiveStationId(timelineStations[prevIdx].id);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeStationId, timelineStations, isRangeModalOpen, isBookmarksModalOpen, spotlightStationId]);

    const handleLoadBookmark = (bm) => {
        const startMs = parseSafeEpoch(bm.startTime);
        const endMs = parseSafeEpoch(bm.endTime);
        const durationMs = Math.max(0, endMs - startMs);

        const newTimeRange = { start: bm.startTime, end: bm.endTime, durationMs: durationMs > 0 ? durationMs : 14400000 };
        const newBuf = Math.max(60000, Math.round(newTimeRange.durationMs * 0.05));

        setTimeRange(newTimeRange);
        setInPointMs(bm.inPointMs !== undefined ? bm.inPointMs + newBuf : newBuf);
        setOutPointMs(bm.outPointMs !== undefined ? bm.outPointMs + newBuf : (newBuf + newTimeRange.durationMs));
        setPlayheadMs(bm.playheadMs !== undefined ? bm.playheadMs + newBuf : (bm.inPointMs !== undefined ? bm.inPointMs + newBuf : newBuf));

        if (bm.stationIds && bm.stationIds.length > 0) {
            setSelectedStationIds(bm.stationIds);
            setActiveStationId(bm.stationIds[0]);
        }

        setIsWorkspaceActive(true);
        setIsDrawerOpen(false);
    };

    const handleExportSmartCut = async () => {
        const targetStationIds = timelineStations.map(s => s.id);
        if (targetStationIds.length === 0) {
            return alert('No active stations selected in timeline.');
        }

        const payload = {
            stationIds: targetStationIds,
            inEpochMs: timelineBaseEpochMs + inPointMs,
            outEpochMs: timelineBaseEpochMs + outPointMs
        };

        try {
            const response = await fetch('/api/v1/extractor-advanced/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`Server returned HTTP ${response.status}`);
            window.dispatchEvent(new CustomEvent('open-export-monitor'));
        } catch (error) {
            console.error('[Studio] Failed enqueuing export job:', error);
            alert('Failed to launch background export. Check server connectivity.');
        }
    };

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
                    onResetActiveStation={() => setActiveStationId(null)}
                    onOpenRangeModal={() => setIsRangeModalOpen(true)}
                    onOpenBookmarksModal={() => setIsBookmarksModalOpen(true)}
                    onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
                    isInitialSetup={isInitialSetup}
                />

                <div className="studio-lower-body">
                    {!isInitialSetup && (
                        <div className="studio-left-content">
                            <div className="studio-main-viewport-container">
                                <MulticamViewport
                                    activeStation={activeStation}
                                    timelineStations={timelineStations}
                                    onSelectActiveStation={(id) => setActiveStationId(id)}
                                    onOpenSpotlight={(id) => setSpotlightStationId(id)}
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
                                />
                                <TransportBar
                                    baseEpochMs={timelineBaseEpochMs}
                                    timeMode={timeMode}
                                    totalDurationMs={totalTimelineDurationMs}
                                    inPointMs={inPointMs}
                                    setInPointMs={setInPointMs}
                                    outPointMs={outPointMs}
                                    setOutPointMs={setOutPointMs}
                                    activeStationId={activeStationId}
                                    isPlaying={isPlaying}
                                    setIsPlaying={setIsPlaying}
                                    isLooping={isLooping}
                                    setIsLooping={setIsLooping}
                                />
                            </div>

                            <div className="studio-bottom-timeline">
                                <TimelineBoard
                                    stations={timelineStations}
                                    activeStationId={activeStationId}
                                    onSelectActiveStation={(id) => setActiveStationId(id === activeStationId ? null : id)}
                                    baseEpochMs={timelineBaseEpochMs}
                                    timeMode={timeMode}
                                    totalDurationMs={totalTimelineDurationMs}
                                    zoomLevel={zoomLevel}
                                    onZoomChange={setZoomLevel}
                                    onZoomReset={() => setZoomLevel(1)}
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
                                    onEstimateLoaded={(est) => {
                                        if (est && est.removedGlobalGaps) {
                                            setGlobalGaps(est.removedGlobalGaps);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    <StationDrawer
                        isOpen={forceDrawerOpen}
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
                    setTimeRange(newRange);
                    setInPointMs(newBuf);
                    setOutPointMs(newBuf + newRange.durationMs);
                    setPlayheadMs(newBuf);
                }}
            />

            <BookmarksModal
                isOpen={isBookmarksModalOpen}
                onClose={() => setIsBookmarksModalOpen(false)}
                currentState={{ timeRange, playheadMs, inPointMs, outPointMs, selectedStationIds }}
                onLoadBookmark={handleLoadBookmark}
            />

            <SoloSpotlightModal
                isOpen={Boolean(spotlightStationId && spotlightStation)}
                station={spotlightStation}
                allStations={timelineStations}
                onSelectStation={setSpotlightStationId}
                onClose={() => setSpotlightStationId(null)}
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
            />

            <ExportJobMonitor />
        </div>
    );
}