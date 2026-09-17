import React, { useState, useMemo } from 'react';
import TopScopeBar from './components/TopScopeBar/TopScopeBar';
import MulticamViewport from './components/Viewport/MulticamViewport';
import TransportBar from './components/TransportBar/TransportBar';
import TimelineBoard from './components/Timeline/TimelineBoard';
import StationDrawer from './components/StationDrawer/StationDrawer';
import MasterTimeRangeModal from './components/Modals/MasterTimeRangeModal';
import './ExtractorAdvancedStudio.scss';

const MOCK_STATIONS = [
    { id: 'st-1', hostname: 'PC-01 (Main Operator)' },
    { id: 'st-2', hostname: 'PC-02 (Secondary Radar)' },
    { id: 'st-3', hostname: 'PC-03 (East Watchtower)' },
    { id: 'st-4', hostname: 'CCTV-Gate-North' }
];

export default function ExtractorAdvancedStudio() {
    const [timeRange, setTimeRange] = useState({
        start: '2026-09-17 10:27:31',
        end: '2026-09-17 14:27:31',
        durationMs: 14400000
    });

    const [timeMode, setTimeMode] = useState('LOCAL'); // 'LOCAL' | 'UTC'

    const baseEpochMs = useMemo(() => {
        return new Date(timeRange.start.replace(' ', 'T')).getTime();
    }, [timeRange.start]);

    const [isRangeModalOpen, setIsRangeModalOpen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [playheadMs, setPlayheadMs] = useState(1800000);
    const [inPointMs, setInPointMs] = useState(1551000);
    const [outPointMs, setOutPointMs] = useState(3351000);
    const [isPlaying, setIsPlaying] = useState(false);

    const [allStations] = useState(MOCK_STATIONS);
    const [selectedStationIds, setSelectedStationIds] = useState(['st-2', 'st-3', 'st-4']);
    const [activeStationId, setActiveStationId] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const activeStation = allStations.find(s => s.id === activeStationId);
    const timelineStations = allStations.filter(s => selectedStationIds.includes(s.id));

    const handleExportSmartCut = () => {
        const payload = {
            stationId: activeStationId || (timelineStations[0] ? timelineStations[0].id : null),
            inEpochMs: baseEpochMs + inPointMs,
            outEpochMs: baseEpochMs + outPointMs,
            durationMs: Math.max(0, outPointMs - inPointMs)
        };
        console.log('[SMART-CUT] Exporting cut range (UTC Epoch Absolute):', payload);
    };

    return (
        <div className="extractor-advanced-studio">
            <div className="studio-workspace-area">
                {/* 1. סרגל זמן ומתגים עליון */}
                <TopScopeBar
                    timeRange={timeRange}
                    baseEpochMs={baseEpochMs}
                    timeMode={timeMode}
                    setTimeMode={setTimeMode}
                    activeStationId={activeStationId}
                    onResetActiveStation={() => setActiveStationId(null)}
                    onOpenRangeModal={() => setIsRangeModalOpen(true)}
                />

                {/* 2. אזור התצוגה המרכזי (רב-ערוצי או בודד) */}
                <div className="studio-main-viewport-container">
                    <MulticamViewport
                        activeStation={activeStation}
                        timelineStations={timelineStations}
                        onSelectActiveStation={(id) => setActiveStationId(id)}
                        baseEpochMs={baseEpochMs}
                        playheadMs={playheadMs}
                        timeMode={timeMode}
                    />

                    {/* 3. סרגל ה-Transport: עריכת IN/OUT, שליטה בניגון ו-Export */}
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
                        onExport={handleExportSmartCut}
                    />
                </div>

                {/* 4. ציר הזמן התחתון */}
                <div className="studio-bottom-timeline">
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
                    />
                </div>
            </div>

            {/* מגירת תחנות */}
            <StationDrawer
                isOpen={isDrawerOpen}
                onToggle={() => setIsDrawerOpen(!isDrawerOpen)}
                allStations={allStations}
                selectedStationIds={selectedStationIds}
                onToggleStation={(id) => setSelectedStationIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])}
                activeStationId={activeStationId}
                onSetActiveStation={(id) => setActiveStationId(id === activeStationId ? null : id)}
            />

            {/* מודאל שינוי טווח זמנים */}
            <MasterTimeRangeModal
                isOpen={isRangeModalOpen}
                onClose={() => setIsRangeModalOpen(false)}
                currentRange={timeRange}
                onApplyRange={setTimeRange}
            />
        </div>
    );
}