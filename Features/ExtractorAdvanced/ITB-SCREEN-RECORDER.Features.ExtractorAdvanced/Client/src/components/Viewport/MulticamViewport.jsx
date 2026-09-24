// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Viewport/MulticamViewport.jsx
// ==========================================
import React, { useRef, useState, useEffect, useMemo } from 'react';
import CameraCard from './views/Card/CameraCard.jsx';
import { calculateOptimalGrid } from './utils/viewportLayoutCalculator.js';
import './MulticamViewport.scss';

export default function MulticamViewport({
    activeStation,
    timelineStations = [],
    onSelectActiveStation,
    onOpenSpotlight,
    baseEpochMs = 0,
    playheadMs = 0,
    timeMode = 'LOCAL',
    isPlaying = false,
    setIsPlaying,
    totalDurationMs,
    inPointMs,
    outPointMs,
    setPlayheadMs,
    globalGaps = []
}) {
    const containerRef = useRef(null);
    const [gridStyle, setGridStyle] = useState({ gridTemplateColumns: '1fr', gridTemplateRows: '1fr' });

    const [isSpotlightActive, setIsSpotlightActive] = useState(() => {
        return typeof document !== 'undefined' && document.body.classList.contains('itb-spotlight-active');
    });

    useEffect(() => {
        const handleSpotlightChange = (e) => setIsSpotlightActive(!!e.detail?.isOpen);
        const handleSyncPlay = (e) => {
            if (setIsPlaying && typeof e.detail?.isPlaying === 'boolean') {
                setIsPlaying(e.detail.isPlaying);
            }
        };

        window.addEventListener('spotlight-state-changed', handleSpotlightChange);
        window.addEventListener('itb-set-playing', handleSyncPlay);

        return () => {
            window.removeEventListener('spotlight-state-changed', handleSpotlightChange);
            window.removeEventListener('itb-set-playing', handleSyncPlay);
        };
    }, [setIsPlaying]);

    const currentEpochMs = useMemo(() => {
        return Math.round(baseEpochMs + playheadMs);
    }, [baseEpochMs, playheadMs]);

    useEffect(() => {
        const count = timelineStations.length;
        if (count === 0 || activeStation) return;

        const updateLayout = () => {
            if (!containerRef.current) return;
            const { width, height } = containerRef.current.getBoundingClientRect();

            const { cols, rows } = calculateOptimalGrid(count, width, height, 14);

            setGridStyle({
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
            });
        };

        const observer = new ResizeObserver(updateLayout);
        if (containerRef.current) observer.observe(containerRef.current);
        updateLayout();

        return () => observer.disconnect();
    }, [timelineStations.length, activeStation]);

    if (timelineStations.length === 0 && !activeStation) return null;

    if (activeStation) {
        return (
            <div className="multicam-viewport-root solo">
                <CameraCard
                    key={activeStation.id || 'solo'}
                    station={activeStation}
                    isSolo={true}
                    currentEpochMs={currentEpochMs}
                    timeMode={timeMode}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    baseEpochMs={baseEpochMs}
                    totalDurationMs={totalDurationMs}
                    outPointMs={outPointMs}
                    setPlayheadMs={setPlayheadMs}
                    isSpotlightActive={isSpotlightActive}
                    globalGaps={globalGaps}
                    onOpenSpotlight={onOpenSpotlight}
                    onSelectActiveStation={onSelectActiveStation}
                />
            </div>
        );
    }

    return (
        <div className="multicam-viewport-root multicam">
            <div className="multicam-tactical-grid" ref={containerRef} style={gridStyle}>
                {timelineStations.map(st => (
                    <CameraCard
                        key={st.id}
                        station={st}
                        isSolo={false}
                        currentEpochMs={currentEpochMs}
                        timeMode={timeMode}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        baseEpochMs={baseEpochMs}
                        totalDurationMs={totalDurationMs}
                        outPointMs={outPointMs}
                        setPlayheadMs={setPlayheadMs}
                        isSpotlightActive={isSpotlightActive}
                        globalGaps={globalGaps}
                        onOpenSpotlight={onOpenSpotlight}
                        onSelectActiveStation={onSelectActiveStation}
                    />
                ))}
            </div>
        </div>
    );
}