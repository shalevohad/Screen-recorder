import React, { useState, useMemo, useEffect } from 'react';
import TopScopeBar from './components/TopScopeBar/TopScopeBar.jsx';
import MulticamViewport from './components/Viewport/MulticamViewport.jsx';
import TransportBar from './components/TransportBar/TransportBar.jsx';
import TimelineBoard from './components/Timeline/TimelineBoard.jsx';
import StationDrawer from './components/StationDrawer/StationDrawer.jsx';
import MasterTimeRangeModal from './components/Modals/MasterTimeRangeModal.jsx';
import BookmarksModal from './components/Modals/BookmarksModal.jsx';
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
    const [timeRange, setTimeRange] = useState(generateDefaultTimeRange);
    const [timeMode, setTimeMode] = useState('LOCAL');

    const baseEpochMs = useMemo(() => parseSafeEpoch(timeRange.start), [timeRange.start]);

    const [allStations, setAllStations] = useState([]);
    const [selectedStationIds, setSelectedStationIds] = useState([]);
    const [activeStationId, setActiveStationId] = useState(null);

    const [isRangeModalOpen, setIsRangeModalOpen] = useState(false);
    const [isBookmarksModalOpen, setIsBookmarksModalOpen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);

    const [playheadMs, setPlayheadMs] = useState(7200000);
    const [inPointMs, setInPointMs] = useState(0);
    const [outPointMs, setOutPointMs] = useState(14400000);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isWorkspaceActive, setIsWorkspaceActive] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const isInitialSetup = !isWorkspaceActive;
    const forceDrawerOpen = isDrawerOpen || isInitialSetup;

    useEffect(() => {
        const fetchStations = async () => {
            if (isNaN(baseEpochMs)) return;
            const endEpochMs = baseEpochMs + timeRange.durationMs;
            try {
                const response = await fetch(`/api/v1/extractor-advanced/stations?startEpoch=${baseEpochMs}&endEpoch=${endEpochMs}`);
                if (response.ok) {
                    const data = await response.json();
                    setAllStations(data);
                }
            } catch (error) {
                console.error('[Studio] Failed to fetch stations:', error);
            }
        };
        fetchStations();
    }, [baseEpochMs, timeRange.durationMs]);

    const activeStation = allStations.find(s => s.id === activeStationId);
    const timelineStations = allStations.filter(s => selectedStationIds.includes(s.id));

    const handleLoadBookmark = (bm) => {
        const startMs = parseSafeEpoch(bm.startTime);
        const endMs = parseSafeEpoch(bm.endTime);
        const durationMs = Math.max(0, endMs - startMs);

        setTimeRange({ start: bm.startTime, end: bm.endTime, durationMs: durationMs > 0 ? durationMs : 14400000 });
        setPlayheadMs(bm.playheadMs ?? 0);
        setInPointMs(bm.inPointMs ?? 0);
        setOutPointMs(bm.outPointMs ?? durationMs);

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
            inEpochMs: baseEpochMs + inPointMs,
            outEpochMs: baseEpochMs + outPointMs
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
                    selectedStationCount={selectedStationIds.length}
                    onResetActiveStation={() => setActiveStationId(null)}
                    onOpenRangeModal={() => setIsRangeModalOpen(true)}
                    onOpenBookmarksModal={() => setIsBookmarksModalOpen(true)}
                    onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
                />

                <div className="studio-lower-body" style={{ flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden' }}>

                    <div className="studio-left-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0 }}>
                        <div className="studio-main-viewport-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                            <MulticamViewport
                                activeStation={activeStation}
                                timelineStations={timelineStations}
                                onSelectActiveStation={(id) => setActiveStationId(id)}
                                baseEpochMs={baseEpochMs}
                                playheadMs={playheadMs}
                                timeMode={timeMode}
                            />
                            <TransportBar
                                baseEpochMs={baseEpochMs}
                                timeMode={timeMode}
                                totalDurationMs={timeRange.durationMs}
                                inPointMs={inPointMs}
                                setInPointMs={setInPointMs}
                                outPointMs={outPointMs}
                                setOutPointMs={setOutPointMs}
                                activeStationId={activeStationId}
                                isPlaying={isPlaying}
                                setIsPlaying={setIsPlaying}
                            />
                        </div>

                        <div className="studio-bottom-timeline" style={{ flexShrink: 0}}>
                            <TimelineBoard
                                stations={timelineStations}
                                activeStationId={activeStationId}
                                onSelectActiveStation={(id) => setActiveStationId(id === activeStationId ? null : id)}
                                baseEpochMs={baseEpochMs}
                                timeMode={timeMode}
                                totalDurationMs={timeRange.durationMs}
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
                    setTimeRange(newRange);
                    setInPointMs(0);
                    setOutPointMs(newRange.durationMs);
                    setPlayheadMs(Math.floor(newRange.durationMs / 2));
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