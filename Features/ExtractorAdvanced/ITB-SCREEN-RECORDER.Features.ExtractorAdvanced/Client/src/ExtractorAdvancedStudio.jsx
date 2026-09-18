import React, { useState, useMemo, useEffect } from 'react';
import TopScopeBar from './components/TopScopeBar/TopScopeBar.jsx';
import MulticamViewport from './components/Viewport/MulticamViewport.jsx';
import TransportBar from './components/TransportBar/TransportBar.jsx';
import TimelineBoard from './components/Timeline/TimelineBoard.jsx';
import StationDrawer from './components/StationDrawer/StationDrawer.jsx';
import MasterTimeRangeModal from './components/Modals/MasterTimeRangeModal.jsx';
import BookmarksModal from './components/Modals/BookmarksModal.jsx';
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
    const safeStr = dateStr.replace(' ', 'T');
    const ms = new Date(safeStr).getTime();
    return isNaN(ms) ? new Date().getTime() : ms;
};

export default function ExtractorAdvancedStudio() {
    const cached = getStudioSessionCache();

    // 1. הגדרות המשימה (Mission Scope)
    const [timeRange, setTimeRange] = useState(() => cached?.timeRange || generateDefaultTimeRange());
    const [timeMode, setTimeMode] = useState(() => cached?.timeMode || 'LOCAL');

    const baseEpochMs = useMemo(() => parseSafeEpoch(timeRange.start), [timeRange.start]);

    // 2. חישוב Buffer של 5% (לפחות 60 שניות) למתן גמישות בקצוות הציר
    const bufferMs = useMemo(() => {
        return Math.max(60000, Math.round(timeRange.durationMs * 0.05));
    }, [timeRange.durationMs]);

    // תחילת הציר ומשכו הכולל בתוספת ה-Buffer
    const timelineBaseEpochMs = useMemo(() => baseEpochMs - bufferMs, [baseEpochMs, bufferMs]);
    const totalTimelineDurationMs = useMemo(() => timeRange.durationMs + (2 * bufferMs), [timeRange.durationMs, bufferMs]);

    const [allStations, setAllStations] = useState([]);
    const [selectedStationIds, setSelectedStationIds] = useState(() => cached?.selectedStationIds || []);
    const [activeStationId, setActiveStationId] = useState(() => cached?.activeStationId || null);

    const [isRangeModalOpen, setIsRangeModalOpen] = useState(false);
    const [isBookmarksModalOpen, setIsBookmarksModalOpen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(() => cached?.zoomLevel || 1);

    // 3. ברירת מחדל: IN ו-OUT נקבעים בדיוק על זמני המשימה (בתוך ה-Buffer)
    const [inPointMs, setInPointMs] = useState(() => cached?.inPointMs ?? bufferMs);
    const [outPointMs, setOutPointMs] = useState(() => cached?.outPointMs ?? (bufferMs + timeRange.durationMs));

    // Playhead מתחיל בדיוק בסמן ה-IN
    const [playheadMs, setPlayheadMs] = useState(() => cached?.playheadMs ?? (cached?.inPointMs ?? bufferMs));

    const [isPlaying, setIsPlaying] = useState(false);
    const [isWorkspaceActive, setIsWorkspaceActive] = useState(() => cached?.isWorkspaceActive ?? false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const isInitialSetup = !isWorkspaceActive;
    const forceDrawerOpen = isDrawerOpen || isInitialSetup;

    // שמירה שוטפת לזיכרון עבור מעבר טאבים
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
            isWorkspaceActive
        });
    }, [timeRange, timeMode, inPointMs, outPointMs, playheadMs, selectedStationIds, activeStationId, zoomLevel, isWorkspaceActive]);

    // טעינת תחנות תוך כיסוי חלון ה-Buffer המלא
    useEffect(() => {
        const fetchStations = async () => {
            if (isNaN(timelineBaseEpochMs)) return;
            const endEpochMs = timelineBaseEpochMs + totalTimelineDurationMs;
            try {
                const response = await fetch(`/api/v1/extractor-advanced/stations?startEpoch=${timelineBaseEpochMs}&endEpoch=${endEpochMs}`);
                if (response.ok) {
                    const data = await response.json();
                    setAllStations(data);
                }
            } catch (error) {
                console.error('[Studio] Failed to fetch stations:', error);
            }
        };
        fetchStations();
    }, [timelineBaseEpochMs, totalTimelineDurationMs]);

    const activeStation = allStations.find(s => s.id === activeStationId);
    const timelineStations = allStations.filter(s => selectedStationIds.includes(s.id));

    const handleLoadBookmark = (bm) => {
        const startMs = parseSafeEpoch(bm.startTime);
        const endMs = parseSafeEpoch(bm.endTime);
        const durationMs = Math.max(0, endMs - startMs);

        const newTimeRange = { start: bm.startTime, end: bm.endTime, durationMs: durationMs > 0 ? durationMs : 14400000 };
        const newBuf = Math.max(60000, Math.round(newTimeRange.durationMs * 0.05));

        const newIn = bm.inPointMs !== undefined ? bm.inPointMs + newBuf : newBuf;
        const newOut = bm.outPointMs !== undefined ? bm.outPointMs + newBuf : (newBuf + newTimeRange.durationMs);
        const newPlayhead = bm.playheadMs !== undefined ? bm.playheadMs + newBuf : newIn;

        setTimeRange(newTimeRange);
        setInPointMs(newIn);
        setOutPointMs(newOut);
        setPlayheadMs(newPlayhead);

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

        // חישוב Epoch אבסולוטי מדויק לייצוא
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
                {/* סרגל עליון: מציג את זמני המשימה הנקיים (ללא ה-Buffer) */}
                <TopScopeBar
                    timeRange={timeRange}
                    baseEpochMs={baseEpochMs}
                    timeMode={timeMode}
                    setTimeMode={setTimeMode}
                    activeStationId={activeStationId}
                    selectedStationCount={selectedStationIds.length}
                    onResetActiveStation={() => setActiveStationId(null)}
                    onOpenRangeModal={() => setIsRangeModalOpen(true)}
                    onOpenBookmarksModal={() => setIsBookmarksModalOpen(true)}
                    onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
                />

                <div className="studio-lower-body">
                    <div className="studio-left-content">
                        <div className="studio-main-viewport-container">
                            <MulticamViewport
                                activeStation={activeStation}
                                timelineStations={timelineStations}
                                onSelectActiveStation={(id) => setActiveStationId(id)}
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
                            {/* ציר הזמן מקבל את הטווח המורחב עם ה-Buffer */}
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
                            />
                        </div>
                    </div>

                    <StationDrawer
                        isOpen={forceDrawerOpen}
                        onToggle={() => setIsDrawerOpen(!isDrawerOpen)}
                        onClose={() => setIsDrawerOpen(false)}
                        allStations={allStations}
                        selectedStationIds={selectedStationIds}
                        onToggleStation={(id) => setSelectedStationIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])}
                        isInitialSetup={isInitialSetup}
                        onApply={() => {
                            setIsWorkspaceActive(true);
                            setIsDrawerOpen(false);
                        }}
                        onOpenRangeModal={() => setIsRangeModalOpen(true)}
                    />
                </div>
            </div>

            <MasterTimeRangeModal
                isOpen={isRangeModalOpen}
                onClose={() => setIsRangeModalOpen(false)}
                currentRange={timeRange}
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
        </div>
    );
}