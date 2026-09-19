// Client/src/components/Extractor/ExtractorAdvancedStudio.jsx
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import TopScopeBar from './components/TopScopeBar/TopScopeBar.jsx';
import MulticamViewport from './components/Viewport/MulticamViewport.jsx';
import TransportBar from './components/TransportBar/TransportBar.jsx';
import TimelineBoard from './components/Timeline/TimelineBoard.jsx';
import StationDrawer from './components/StationDrawer/StationDrawer.jsx';
import MasterTimeRangeModal from './components/Modals/MasterTimeRangeModal.jsx';
import BookmarksModal from './components/Modals/BookmarksModal.jsx';
import SoloSpotlightModal from './components/Modals/SoloSpotlightModal.jsx';
import { getStudioSessionCache, saveStudioSessionCache } from './studioSessionStore.js';
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
    // 1. טעינת סנאפשוט יציב וחד-פעמי מהזיכרון המקומי
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

    // 2. אתחול כל המצבים ישירות לערכים המדויקים שהיו שמורים לפני הריענון (F5)
    const [selectedStationIds, setSelectedStationIds] = useState(cached.selectedStationIds || []);
    const [activeStationId, setActiveStationId] = useState(cached.activeStationId || null);
    const [spotlightStationId, setSpotlightStationId] = useState(null);

    const [isRangeModalOpen, setIsRangeModalOpen] = useState(false);
    const [isBookmarksModalOpen, setIsBookmarksModalOpen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(cached.zoomLevel || 1);

    const [inPointMs, setInPointMs] = useState(cached.inPointMs ?? bufferMs);
    const [outPointMs, setOutPointMs] = useState(cached.outPointMs ?? (bufferMs + timeRange.durationMs));
    const [playheadMs, setPlayheadMs] = useState(cached.playheadMs ?? (cached.inPointMs ?? bufferMs));

    const [isPlaying, setIsPlaying] = useState(false);
    const [isWorkspaceActive, setIsWorkspaceActive] = useState(
        Boolean(cached.isWorkspaceActive && cached.selectedStationIds?.length > 0)
    );
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // =========================================================================
    // שמירה מתמשכת ל-Storage - מופעלת בכל שינוי בלי לדרוס וללא עיכובים
    // =========================================================================
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
            isWorkspaceActive,
            allStations
        });
    }, [timeRange, timeMode, inPointMs, outPointMs, playheadMs, selectedStationIds, activeStationId, zoomLevel, isWorkspaceActive, allStations]);

    // =========================================================================
    // שליפה דינמית של תחנות פעילות (ללא מחיקה אגרסיבית של בחירות)
    // =========================================================================
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

    // =========================================================================
    // שליפת מקטעי הקלטות (Segments) מהשרת
    // =========================================================================
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

    // =========================================================================
    // סניטייזר רך - רק מנקה עמדות ממוקדות אם בוטל הסימון שלהן
    // =========================================================================
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

    // מגן על ה-UI: ירנדר רק תחנות שנבחרו ועדיין קיימות ברשימת התחנות החיות
    const timelineStations = allStations.filter(s => selectedStationIds.includes(s.id));
    const spotlightStation = allStations.find(s => s.id === spotlightStationId);

    // ניווט מקלדת מעגלי במצב Spot
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
            if (isRangeModalOpen || isBookmarksModalOpen || spotlightStationId) return;

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
        const targetStation = activeStationId || (timelineStations[0] ? timelineStations[0].id : null);
        if (!targetStation) return alert('No station selected for export.');

        const payload = {
            stationId: targetStation,
            inEpochMs: timelineBaseEpochMs + inPointMs,
            outEpochMs: timelineBaseEpochMs + outPointMs
        };

        try {
            const response = await fetch('/api/v1/extractor-advanced/export-cut', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error(`Status: ${response.status}`);
            const result = await response.json();
            alert(`Export Successful!\nSaved to: ${result.filePath}`);
        } catch (error) {
            console.error('[Studio] Export Error:', error);
            alert('Export failed. Check console.');
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
                                    onExport={handleExportSmartCut}
                                    recordingSegments={recordingSegments}
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
                playheadMs={playheadMs}
                setPlayheadMs={setPlayheadMs}
                inPointMs={inPointMs}
                setInPointMs={setInPointMs}
                outPointMs={outPointMs}
                setOutPointMs={setOutPointMs}
            />
        </div>
    );
}