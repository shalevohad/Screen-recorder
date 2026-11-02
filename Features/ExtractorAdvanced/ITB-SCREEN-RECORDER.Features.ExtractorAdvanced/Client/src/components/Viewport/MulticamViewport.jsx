// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Viewport/MulticamViewport.jsx
// ==========================================
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import CameraCard from './views/Card/CameraCard.jsx';
import StudioVideoFeed from '../Player/StudioVideoFeed.jsx';
import KeystrokePlaybackOverlay from '../Player/KeystrokePlaybackOverlay.jsx';
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

function getGridDimensions(count, width, height) {
    if (width > 0 && height > 0) {
        return calculateOptimalGrid(count, width, height, 14);
    }
    if (count <= 1) return { cols: 1, rows: 1 };
    if (count === 2) return { cols: 2, rows: 1 };
    if (count <= 4) return { cols: 2, rows: 2 };
    if (count <= 6) return { cols: 3, rows: 2 };
    if (count <= 8) return { cols: 4, rows: 2 };
    if (count <= 9) return { cols: 3, rows: 3 };
    if (count <= 12) return { cols: 4, rows: 3 };
    if (count <= 16) return { cols: 4, rows: 4 };
    const cols = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / cols);
    return { cols, rows };
}

export default function MulticamViewport({
    activeStation,
    timelineStations = [],
    onSelectActiveStation,
    onOpenSpotlight,
    onStationContextMenu,
    baseEpochMs = 0,
    playheadMs = 0,
    playheadEpochMs = 0,
    timeMode = 'LOCAL',
    isPlaying = false,
    setIsPlaying,
    totalDurationMs,
    inPointMs,
    outPointMs,
    setPlayheadMs,
    globalGaps = [],
    recordingSegments = {},
    playbackSpeed = 1,
    keystrokeMode = 'BURN_IN',
    keystrokes = [],
    directorPlan,
    onOverrideDisplay,
    onResetOverride,
    // Universal Studio Composition Engine Props
    compositionScope = 'intra-station',
    onChangeCompositionScope,
    compositionLayout = 'director',
    onChangeCompositionLayout,
    isAutoDirectorEnabled = true,
    onToggleAutoDirector,
    isPipSwapped = false,
    onTogglePipSwap
}) {
    const resizeObserverRef = useRef(null);
    const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

    const [isGridMatrixView, setIsGridMatrixView] = useState(() => {
        return timelineStations.length > 2 && compositionScope !== 'inter-station';
    });

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
        return playheadEpochMs > 0 ? playheadEpochMs : Math.round(baseEpochMs + playheadMs);
    }, [playheadEpochMs, baseEpochMs, playheadMs]);

    const updateDims = useCallback((node) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
            setContainerDimensions(prev => {
                if (Math.abs(prev.width - rect.width) < 1 && Math.abs(prev.height - rect.height) < 1) {
                    return prev;
                }
                return { width: rect.width, height: rect.height };
            });
        }
    }, []);

    const setGridContainerRef = useCallback((node) => {
        if (resizeObserverRef.current) {
            resizeObserverRef.current.disconnect();
            resizeObserverRef.current = null;
        }

        if (node) {
            updateDims(node);

            const observer = new ResizeObserver(() => {
                updateDims(node);
            });
            observer.observe(node);
            resizeObserverRef.current = observer;
        }
    }, [updateDims]);

    useEffect(() => {
        return () => {
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }
        };
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

    const gridStyle = useMemo(() => {
        const count = visibleStations.length;
        if (count <= 1) {
            return {
                gridTemplateColumns: 'minmax(0, 1fr)',
                gridTemplateRows: 'minmax(0, 1fr)'
            };
        }

        const { cols, rows } = getGridDimensions(count, containerDimensions.width, containerDimensions.height);
        return {
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
        };
    }, [visibleStations.length, containerDimensions.width, containerDimensions.height]);

    if (timelineStations.length === 0 && !activeStation) return null;

    const isSingleStationMode = timelineStations.length === 1;
    const soloStationToRender = activeStation || (isSingleStationMode ? timelineStations[0] : null);

    // Inter-station target stations
    const station0 = !isPipSwapped ? timelineStations[0] : (timelineStations[1] || timelineStations[0]);
    const station1 = !isPipSwapped ? (timelineStations[1] || timelineStations[0]) : timelineStations[0];

    const isInterStationActive = compositionScope === 'inter-station' && timelineStations.length >= 2 && !isGridMatrixView;

    return (
        <div className={`multicam-viewport-root ${soloStationToRender && !isInterStationActive && !isGridMatrixView ? 'solo' : 'multicam'}`}>
            {/* Universal Studio Composition Engine Control Bar */}
            <div className="multicam-composition-mode-bar">
                <div className="comp-mode-left">
                    <span className="comp-icon">🎛️</span>
                    <span className="comp-title">COMPOSITION:</span>

                    <div className="comp-pill-group">
                        <button
                            type="button"
                            className={`btn-comp-tab ${compositionScope === 'inter-station' ? 'active' : ''}`}
                            onClick={() => {
                                onChangeCompositionScope?.('inter-station');
                                setIsGridMatrixView(false);
                            }}
                            disabled={timelineStations.length < 2}
                            title={timelineStations.length < 2 ? "Select at least 2 workstations to enable inter-station composition" : "Compose across multiple workstations"}
                        >
                            🌐 INTER-STATION ({timelineStations.length})
                        </button>
                        <button
                            type="button"
                            className={`btn-comp-tab ${compositionScope === 'intra-station' ? 'active' : ''}`}
                            onClick={() => onChangeCompositionScope?.('intra-station')}
                            title="Compose between displays of focused workstation"
                        >
                            🖥️ INTRA-STATION
                        </button>
                    </div>

                    <div className="comp-pill-group layouts">
                        <button
                            type="button"
                            className={`btn-comp-tab ${compositionLayout === 'split' ? 'active' : ''}`}
                            onClick={() => {
                                onChangeCompositionLayout?.('split');
                                setIsGridMatrixView(false);
                            }}
                            title="Side-by-Side Split View"
                        >
                            ⊞ SPLIT
                        </button>
                        <button
                            type="button"
                            className={`btn-comp-tab ${compositionLayout === 'pip' ? 'active' : ''}`}
                            onClick={() => {
                                onChangeCompositionLayout?.('pip');
                                setIsGridMatrixView(false);
                            }}
                            title="Picture-in-Picture View"
                        >
                            ⧉ PIP
                        </button>
                        <button
                            type="button"
                            className={`btn-comp-tab ${compositionLayout === 'canvas' ? 'active' : ''}`}
                            onClick={() => {
                                onChangeCompositionLayout?.('canvas');
                                setIsGridMatrixView(false);
                            }}
                            title="Virtual Canvas View"
                        >
                            ▦ CANVAS
                        </button>
                        <button
                            type="button"
                            className={`btn-comp-tab ${compositionLayout === 'director' ? 'active' : ''}`}
                            onClick={() => {
                                onChangeCompositionLayout?.('director');
                                setIsGridMatrixView(false);
                            }}
                            title="Auto-Director Cut View"
                        >
                            🎬 DIRECTOR CUT
                        </button>
                    </div>

                    {(compositionLayout === 'split' || compositionLayout === 'pip') && (
                        <button
                            type="button"
                            className={`btn-comp-swap ${isPipSwapped ? 'swapped' : ''}`}
                            onClick={onTogglePipSwap}
                            title="Swap Primary/Secondary or Main/Inset"
                        >
                            ⇄ SWAP {isPipSwapped ? '(SWAPPED)' : ''}
                        </button>
                    )}

                    <button
                        type="button"
                        className={`btn-director-toggle ${isAutoDirectorEnabled ? 'is-on' : 'is-off'}`}
                        onClick={onToggleAutoDirector}
                        title={isAutoDirectorEnabled ? "Auto-Director is ON: follows active activity cuts" : "Auto-Director is OFF: composition layout is static"}
                    >
                        <span className="dot" />
                        <span>AUTO-DIRECTOR: {isAutoDirectorEnabled ? 'ON' : 'OFF'}</span>
                    </button>
                </div>

                <div className="comp-mode-right">
                    {timelineStations.length > 1 && (
                        <button
                            type="button"
                            className={`btn-grid-toggle ${isGridMatrixView ? 'active' : ''}`}
                            onClick={() => setIsGridMatrixView(p => !p)}
                            title="Toggle between Master Composition and Multi-Station Matrix Grid"
                        >
                            {isGridMatrixView ? '📺 COMPOSITION CANVAS' : '🗖 STATION GRID MATRIX'}
                        </button>
                    )}
                </div>
            </div>

            {/* View Mode 1: Inter-Station Composition */}
            {isInterStationActive && station0 && station1 && (
                <div className="interstation-viewport-container">
                    {compositionLayout === 'split' ? (
                        <div className="interstation-split-grid">
                            <div className="split-pane left">
                                <div className="pane-banner">
                                    <span className="dot live" />
                                    <span className="pane-label">LEFT FEED: {station0.displayName || station0.hostname}</span>
                                </div>
                                <div className="pane-content">
                                    <StudioVideoFeed
                                        station={station0}
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
                                    <KeystrokePlaybackOverlay
                                        currentEpochMs={currentEpochMs}
                                        keystrokes={keystrokes}
                                        keystrokeMode={keystrokeMode}
                                    />
                                </div>
                            </div>
                            <div className="split-divider-line" />
                            <div className="split-pane right">
                                <div className="pane-banner">
                                    <span className="dot live" />
                                    <span className="pane-label">RIGHT FEED: {station1.displayName || station1.hostname}</span>
                                </div>
                                <div className="pane-content">
                                    <StudioVideoFeed
                                        station={station1}
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
                                </div>
                            </div>
                        </div>
                    ) : compositionLayout === 'pip' ? (
                        <div className="interstation-pip-container">
                            <div className="pip-hero-viewport">
                                <StudioVideoFeed
                                    station={station0}
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
                                <KeystrokePlaybackOverlay
                                    currentEpochMs={currentEpochMs}
                                    keystrokes={keystrokes}
                                    keystrokeMode={keystrokeMode}
                                />
                            </div>
                            <div className="pip-floating-inset">
                                <div className="inset-banner">
                                    <span className="dot" />
                                    <span className="inset-name">{station1.displayName || station1.hostname}</span>
                                </div>
                                <div className="inset-video-wrapper">
                                    <StudioVideoFeed
                                        station={station1}
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
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Canvas or Director View for Inter-Station */
                        <div className="interstation-canvas-container">
                            <div className="canvas-station-card">
                                <div className="canvas-badge">{station0.displayName || station0.hostname}</div>
                                <StudioVideoFeed
                                    station={station0}
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
                                <KeystrokePlaybackOverlay
                                    currentEpochMs={currentEpochMs}
                                    keystrokes={keystrokes}
                                    keystrokeMode={keystrokeMode}
                                />
                            </div>
                            <div className="canvas-station-card">
                                <div className="canvas-badge">{station1.displayName || station1.hostname}</div>
                                <StudioVideoFeed
                                    station={station1}
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
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* View Mode 2: Single Station / Intra-Station Composition */}
            {!isInterStationActive && !isGridMatrixView && soloStationToRender && (
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
                            directorPlan={directorPlan || soloStationToRender?.directorPlan}
                            onOverrideDisplay={onOverrideDisplay}
                            onResetOverride={onResetOverride}
                            viewMode={compositionLayout}
                            isPipSwapped={isPipSwapped}
                        />

                        <KeystrokePlaybackOverlay
                            currentEpochMs={currentEpochMs}
                            keystrokes={keystrokes}
                            keystrokeMode={keystrokeMode}
                        />

                        <div className="spotlight-interaction-hint">
                            <span className="hint-pill">
                                {isSingleStationMode ? 'L-Click: Fullscreen' : 'L-Click: Fullscreen • R-Click: Back to Grid'}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* View Mode 3: Station Grid Matrix */}
            {(isGridMatrixView || (!soloStationToRender && !isInterStationActive)) && (
                <div className="multicam-matrix-content">
                    {timelineStations.length > dynamicPageCapacity && (
                        <div className="viewport-matrix-toolbar">
                            <div className="mode-toggle-pill">
                                <button
                                    type="button"
                                    className={`btn-mode-toggle ${viewMode === 'paged' ? 'active' : ''}`}
                                    onClick={() => handleSetViewMode('paged')}
                                    title={`Optimized Layout: ${dynamicPageCapacity} feeds per page`}
                                >
                                    PAGED ({dynamicPageCapacity})
                                </button>
                                <button
                                    type="button"
                                    className={`btn-mode-toggle ${viewMode === 'wall' ? 'active' : ''}`}
                                    onClick={() => handleSetViewMode('wall')}
                                    title="Tactical Wall: All stations displayed simultaneously"
                                >
                                    WALL ({timelineStations.length})
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
                                        {((currentPage - 1) * dynamicPageCapacity) + 1}–{Math.min(timelineStations.length, currentPage * dynamicPageCapacity)} OF {timelineStations.length}
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

                    <div className="multicam-tactical-grid" ref={setGridContainerRef} style={gridStyle}>
                        {visibleStations.map(st => (
                            <div
                                key={st.id}
                                className="multicam-card-cell-wrapper"
                                onContextMenu={(e) => onStationContextMenu && onStationContextMenu(e, st)}
                                style={{ width: '100%', height: '100%', minWidth: 0, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <CameraCard
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
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
