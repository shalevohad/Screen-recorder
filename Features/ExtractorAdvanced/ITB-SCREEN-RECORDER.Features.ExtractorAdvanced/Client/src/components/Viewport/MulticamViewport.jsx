// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Viewport/MulticamViewport.jsx
// ==========================================
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import CameraCard from './views/Card/CameraCard.jsx';
import StudioVideoFeed from '../Player/StudioVideoFeed.jsx';
import { calculateOptimalGrid } from './utils/viewportLayoutCalculator.js';
import './MulticamViewport.scss';

function computeOptimalPageCapacity(width, height, gap = 14) {
    if (!width || !height) return 12;

    const minCardWidth = 270;
    const minCardHeight = 175;

    const maxCols = Math.max(1, Math.floor((width + gap) / (minCardWidth + gap)));
    const maxRows = Math.max(1, Math.floor((height + gap) / (minCardHeight + gap)));

    const effectiveCols = Math.min(maxCols, width > 2200 ? 5 : 4);
    const effectiveRows = Math.min(maxRows, height > 1100 ? 4 : 3);

    const cols = Math.max(2, effectiveCols);
    const rows = Math.max(2, effectiveRows);

    return cols * rows;
}

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
    globalGaps = [],
    recordingSegments = {},
    playbackSpeed = 1
}) {
    const containerRef = useRef(null);
    const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
    const [gridStyle, setGridStyle] = useState({ gridTemplateColumns: '1fr', gridTemplateRows: '1fr' });

    const [viewMode, setViewMode] = useState(() => {
        try {
            return localStorage.getItem('itb_multicam_view_mode') || 'paged';
        } catch {
            return 'paged';
        }
    });

    const [currentPage, setCurrentPage] = useState(1);

    const handleSetViewMode = useCallback((mode) => {
        setViewMode(mode);
        try {
            localStorage.setItem('itb_multicam_view_mode', mode);
        } catch { }
    }, []);

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
        if (!containerRef.current) return;
        const updateDims = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setContainerDimensions({ width, height });
            }
        };

        const observer = new ResizeObserver(updateDims);
        observer.observe(containerRef.current);
        updateDims();

        return () => observer.disconnect();
    }, []);

    const dynamicPageCapacity = useMemo(() => {
        return computeOptimalPageCapacity(containerDimensions.width, containerDimensions.height, 14);
    }, [containerDimensions.width, containerDimensions.height]);

    const totalPages = Math.ceil(timelineStations.length / dynamicPageCapacity) || 1;

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    const visibleStations = useMemo(() => {
        if (viewMode === 'wall' || timelineStations.length <= dynamicPageCapacity) {
            return timelineStations;
        }
        const start = (currentPage - 1) * dynamicPageCapacity;
        return timelineStations.slice(start, start + dynamicPageCapacity);
    }, [timelineStations, viewMode, dynamicPageCapacity, currentPage]);

    useEffect(() => {
        const count = visibleStations.length;
        if (count <= 1 || activeStation) return;

        const { width, height } = containerDimensions;
        if (width <= 0 || height <= 0) return;

        const { cols, rows } = calculateOptimalGrid(count, width, height, 14);

        setGridStyle({
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
        });
    }, [visibleStations.length, containerDimensions, activeStation]);

    if (timelineStations.length === 0 && !activeStation) return null;

    const isSingleStationMode = timelineStations.length === 1;
    const soloStationToRender = activeStation || (isSingleStationMode ? timelineStations[0] : null);

    if (soloStationToRender) {
        return (
            <div className="multicam-viewport-root solo">
                <div
                    className="spotlight-workspace-viewport"
                    onClick={() => onOpenSpotlight && onOpenSpotlight(soloStationToRender.id)}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        if (!isSingleStationMode && onSelectActiveStation) {
                            onSelectActiveStation(null);
                        }
                    }}
                >
                    <div className="spotlight-viewport-header">
                        <div className="header-meta-group">
                            <span className="status-dot live" />
                            <span className="station-name">
                                {soloStationToRender.hostname || soloStationToRender.displayName || soloStationToRender.name}
                            </span>
                            <span className="feed-spec">
                                {soloStationToRender.feedSpec || `${soloStationToRender.resolution || '1080p'} • ${soloStationToRender.fps || 30}fps`}
                            </span>
                        </div>

                        <button
                            type="button"
                            className="btn-fullscreen-trigger"
                            onClick={(e) => {
                                e.stopPropagation();
                                onOpenSpotlight && onOpenSpotlight(soloStationToRender.id);
                            }}
                            title="Expand to Fullscreen"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="14" height="14">
                                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                            </svg>
                        </button>
                    </div>

                    <div className="spotlight-feed-wrapper">
                        <StudioVideoFeed
                            station={soloStationToRender}
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
                            isLooping={true}
                            recordingSegments={recordingSegments}
                            globalGaps={globalGaps}
                            showWatermark={false}
                        />

                        <div className="spotlight-interaction-hint">
                            <span className="hint-pill">
                                {isSingleStationMode ? 'L-Click: Fullscreen' : 'L-Click: Fullscreen • R-Click: Back to Grid'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const showControls = timelineStations.length > dynamicPageCapacity;
    const startIndex = (currentPage - 1) * dynamicPageCapacity + 1;
    const endIndex = Math.min(timelineStations.length, currentPage * dynamicPageCapacity);

    return (
        <div className="multicam-viewport-root multicam">
            {showControls && (
                <div className="viewport-matrix-toolbar">
                    <div className="mode-toggle-pill">
                        <button
                            type="button"
                            className={`btn-mode-toggle ${viewMode === 'paged' ? 'active' : ''}`}
                            onClick={() => handleSetViewMode('paged')}
                            title={`Optimized Layout: ${dynamicPageCapacity} feeds per page without empty space`}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                            </svg>
                            <span>PAGED ({dynamicPageCapacity})</span>
                        </button>
                        <button
                            type="button"
                            className={`btn-mode-toggle ${viewMode === 'wall' ? 'active' : ''}`}
                            onClick={() => handleSetViewMode('wall')}
                            title="Tactical Wall: All stations displayed simultaneously"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                                <rect x="2" y="2" width="20" height="20" rx="2" />
                                <line x1="2" y1="8" x2="22" y2="8" />
                                <line x1="2" y1="16" x2="22" y2="16" />
                                <line x1="8" y1="2" x2="8" y2="22" />
                                <line x1="16" y1="2" x2="16" y2="22" />
                            </svg>
                            <span>WALL ({timelineStations.length})</span>
                        </button>
                    </div>

                    {viewMode === 'paged' && totalPages > 1 && (
                        <div className="paged-nav-pill">
                            <button
                                type="button"
                                className="btn-page-arrow"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                title="Previous Feed Matrix"
                            >
                                ◀
                            </button>
                            <span className="page-indicator-text">
                                {startIndex}–{endIndex} OF {timelineStations.length}
                            </span>
                            <button
                                type="button"
                                className="btn-page-arrow"
                                disabled={currentPage >= totalPages}
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                title="Next Feed Matrix"
                            >
                                ▶
                            </button>
                        </div>
                    )}
                </div>
            )}

            <div className="multicam-tactical-grid" ref={containerRef} style={gridStyle}>
                {visibleStations.map(st => (
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
                        recordingSegments={recordingSegments}
                        playbackSpeed={playbackSpeed}
                    />
                ))}
            </div>
        </div>
    );
}