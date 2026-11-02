// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Viewport/MulticamViewport.jsx
// Universal Master Canvas Grid Engine & WYSIWYG Export Preview
// ==========================================
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import CameraCard from './views/Card/CameraCard.jsx';
import StudioVideoFeed from '../Player/StudioVideoFeed.jsx';
import KeystrokePlaybackOverlay from '../Player/KeystrokePlaybackOverlay.jsx';
import { formatTimelineClock } from '../../utils/timeFormat.js';
import './MulticamViewport.scss';

const SLOT_BORDER_COLORS = ['#06B6D4', '#10B981', '#F59E0B', '#F43F5E', '#A855F7', '#EC4899', '#38BDF8', '#34D399'];

/**
 * Computes exact pixel-perfect 1920x1080 master canvas placements matching FFmpeg backend export.
 */
function getCanvasPlacementsForExport(preset, slots) {
    const W = 1920;
    const H = 1080;
    const count = slots.length;
    if (count === 0) return [];

    let effectivePreset = preset;
    if (effectivePreset === 'auto') {
        if (count === 1) effectivePreset = '1x1';
        else if (count === 2) effectivePreset = '1x2';
        else if (count === 3) effectivePreset = '3-grid';
        else if (count <= 4) effectivePreset = '2x2';
        else effectivePreset = 'grid';
    }

    const placements = [];

    if (effectivePreset === '1x1') {
        const s = slots[0];
        if (s && s.station) {
            placements.push({
                stationId: s.station.id,
                displayId: (s.displayId && s.displayId !== 'auto') ? s.displayId : 'director',
                x: 0,
                y: 0,
                width: W,
                height: H,
                zIndex: 0,
                borderWidth: 0,
                borderColor: SLOT_BORDER_COLORS[0],
                label: s.station.displayName || s.station.roleAlias || s.station.hostname || s.station.name
            });
        }
    } else if (effectivePreset === '1x2') {
        const halfW = Math.floor(W / 2);
        for (let i = 0; i < Math.min(2, slots.length); i++) {
            const s = slots[i];
            if (!s || !s.station) continue;
            placements.push({
                stationId: s.station.id,
                displayId: (s.displayId && s.displayId !== 'auto') ? s.displayId : 'director',
                x: i * halfW,
                y: 0,
                width: halfW,
                height: H,
                zIndex: i,
                borderWidth: 2,
                borderColor: SLOT_BORDER_COLORS[i % SLOT_BORDER_COLORS.length],
                label: s.station.displayName || s.station.roleAlias || s.station.hostname || s.station.name
            });
        }
    } else if (effectivePreset === '3-grid') {
        const halfW = Math.floor(W / 2);
        const halfH = Math.floor(H / 2);
        const coords = [
            { x: 0, y: 0, w: halfW, h: halfH },
            { x: halfW, y: 0, w: halfW, h: halfH },
            { x: Math.floor(halfW / 2), y: halfH, w: halfW, h: halfH }
        ];
        for (let i = 0; i < Math.min(3, slots.length); i++) {
            const s = slots[i];
            if (!s || !s.station) continue;
            const c = coords[i];
            placements.push({
                stationId: s.station.id,
                displayId: (s.displayId && s.displayId !== 'auto') ? s.displayId : 'director',
                x: c.x,
                y: c.y,
                width: c.w,
                height: c.h,
                zIndex: i,
                borderWidth: 2,
                borderColor: SLOT_BORDER_COLORS[i % SLOT_BORDER_COLORS.length],
                label: s.station.displayName || s.station.roleAlias || s.station.hostname || s.station.name
            });
        }
    } else if (effectivePreset === '2x2') {
        const halfW = Math.floor(W / 2);
        const halfH = Math.floor(H / 2);
        for (let i = 0; i < Math.min(4, slots.length); i++) {
            const s = slots[i];
            if (!s || !s.station) continue;
            const col = i % 2;
            const row = Math.floor(i / 2);
            placements.push({
                stationId: s.station.id,
                displayId: (s.displayId && s.displayId !== 'auto') ? s.displayId : 'director',
                x: col * halfW,
                y: row * halfH,
                width: halfW,
                height: halfH,
                zIndex: i,
                borderWidth: 2,
                borderColor: SLOT_BORDER_COLORS[i % SLOT_BORDER_COLORS.length],
                label: s.station.displayName || s.station.roleAlias || s.station.hostname || s.station.name
            });
        }
    } else {
        const cols = count <= 6 ? 3 : Math.ceil(Math.sqrt(count));
        const rows = Math.ceil(count / cols);
        const cellW = Math.floor(W / cols);
        const cellH = Math.floor(H / rows);
        for (let i = 0; i < count; i++) {
            const s = slots[i];
            if (!s || !s.station) continue;
            const col = i % cols;
            const row = Math.floor(i / cols);
            placements.push({
                stationId: s.station.id,
                displayId: (s.displayId && s.displayId !== 'auto') ? s.displayId : 'director',
                x: col * cellW,
                y: row * cellH,
                width: cellW,
                height: cellH,
                zIndex: i,
                borderWidth: 2,
                borderColor: SLOT_BORDER_COLORS[i % SLOT_BORDER_COLORS.length],
                label: s.station.displayName || s.station.roleAlias || s.station.hostname || s.station.name
            });
        }
    }

    return placements;
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
    compositionLayout = 'canvas',
    onChangeCompositionLayout,
    isAutoDirectorEnabled = true,
    onToggleAutoDirector,
    onChangePlaybackSpeed,
    _onOpenCanvasComposer,
    onUpdateCanvasLayout
}) {
    const viewportRootRef = useRef(null);
    const [isGridFullscreen, setIsGridFullscreen] = useState(false);
    const [activeAudioStationId, setActiveAudioStationId] = useState(() => timelineStations[0]?.id || null);
    const [showHudControls, setShowHudControls] = useState(true);
    const hudTimerRef = useRef(null);

    // Canvas Layout Preset: '1x1' | '1x2' | '3-grid' | '2x2' | 'auto'
    const [canvasPreset, setCanvasPreset] = useState(() => {
        try {
            return localStorage.getItem('itb_canvas_preset') || 'auto';
        } catch {
            return 'auto';
        }
    });

    const handleSelectCanvasPreset = useCallback((preset) => {
        setCanvasPreset(preset);
        try {
            localStorage.setItem('itb_canvas_preset', preset);
        } catch { }
    }, []);

    // Slot display and order management
    const [slotOrder, setSlotOrder] = useState([]);
    const [slotDisplayMap, setSlotDisplayMap] = useState({});
    const [draggedSlotIdx, setDraggedSlotIdx] = useState(null);
    const [dragOverSlotIdx, setDragOverSlotIdx] = useState(null);

    // Synchronize slot order with timeline stations
    useEffect(() => {
        if (timelineStations.length === 0) {
            setSlotOrder([]);
            return;
        }

        setSlotOrder(prev => {
            const validPrev = prev.filter(id => timelineStations.some(s => s.id === id));
            const missing = timelineStations.filter(s => !validPrev.includes(s.id)).map(s => s.id);
            return [...validPrev, ...missing];
        });
    }, [timelineStations]);

    // Active audio station maintenance
    useEffect(() => {
        if (timelineStations.length > 0 && (!activeAudioStationId || !timelineStations.some(s => s.id === activeAudioStationId))) {
            setActiveAudioStationId(timelineStations[0].id);
        }
    }, [timelineStations, activeAudioStationId]);

    // Current playhead epoch
    const currentEpochMs = useMemo(() => {
        return playheadEpochMs > 0 ? playheadEpochMs : Math.round(baseEpochMs + playheadMs);
    }, [playheadEpochMs, baseEpochMs, playheadMs]);

    // Build the resolved slot objects for the active preset
    const slots = useMemo(() => {
        if (timelineStations.length === 0) return [];

        const orderedStations = slotOrder
            .map(id => timelineStations.find(s => s.id === id))
            .filter(Boolean);

        // Fallback if orderedStations is empty
        const effectiveStations = orderedStations.length > 0 ? orderedStations : timelineStations;

        // Special case: Single station with 2+ monitors in 1x2 or 2x2 mode
        if (effectiveStations.length === 1 && (canvasPreset === '1x2' || canvasPreset === '2x2')) {
            const st = effectiveStations[0];
            const displays = st.displays || st.topology?.displays || [];
            if (displays.length > 1) {
                return [
                    {
                        key: `${st.id}-disp-0`,
                        station: st,
                        displayId: slotDisplayMap[0] || 'mon-0',
                        slotIndex: 0
                    },
                    {
                        key: `${st.id}-disp-1`,
                        station: st,
                        displayId: slotDisplayMap[1] || 'mon-1',
                        slotIndex: 1
                    }
                ];
            }
        }

        // Determine capacity based on preset
        let maxSlots = effectiveStations.length;
        if (canvasPreset === '1x1') maxSlots = 1;
        else if (canvasPreset === '1x2') maxSlots = Math.min(2, effectiveStations.length);
        else if (canvasPreset === '3-grid') maxSlots = Math.min(3, effectiveStations.length);
        else if (canvasPreset === '2x2') maxSlots = Math.min(4, effectiveStations.length);

        return effectiveStations.slice(0, maxSlots).map((st, idx) => ({
            key: `${st.id}-${idx}`,
            station: st,
            displayId: slotDisplayMap[idx] || 'auto',
            slotIndex: idx
        }));
    }, [timelineStations, slotOrder, canvasPreset, slotDisplayMap]);

    // Compute master export placements matching exact visible slots
    const computedPlacements = useMemo(() => {
        return getCanvasPlacementsForExport(canvasPreset, slots);
    }, [canvasPreset, slots]);

    // Notify parent studio of current canvas layout for WYSIWYG export
    useEffect(() => {
        if (onUpdateCanvasLayout) {
            onUpdateCanvasLayout({
                width: 1920,
                height: 1080,
                backgroundColor: '#070A10',
                fps: 30.0,
                preset: canvasPreset,
                placements: computedPlacements
            });
        }
    }, [computedPlacements, canvasPreset, onUpdateCanvasLayout]);

    // Slot swapping actions
    const handleSwapSlots = useCallback((idx1, idx2) => {
        if (idx1 === idx2 || idx1 < 0 || idx2 < 0) return;
        setSlotOrder(prev => {
            const next = [...prev];
            if (idx1 >= next.length || idx2 >= next.length) return prev;
            const temp = next[idx1];
            next[idx1] = next[idx2];
            next[idx2] = temp;
            return next;
        });
    }, []);

    const handleSelectDisplayForSlot = useCallback((slotIdx, dispId) => {
        setSlotDisplayMap(prev => ({
            ...prev,
            [slotIdx]: dispId
        }));
    }, []);

    // Drag-and-drop slot reordering
    const handleDragStart = useCallback((e, slotIdx) => {
        setDraggedSlotIdx(slotIdx);
        e.dataTransfer.setData('text/plain', String(slotIdx));
        e.dataTransfer.effectAllowed = 'move';
    }, []);

    const handleDragOver = useCallback((e, slotIdx) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (dragOverSlotIdx !== slotIdx) {
            setDragOverSlotIdx(slotIdx);
        }
    }, [dragOverSlotIdx]);

    const handleDrop = useCallback((e, targetSlotIdx) => {
        e.preventDefault();
        setDragOverSlotIdx(null);
        if (draggedSlotIdx !== null && draggedSlotIdx !== targetSlotIdx) {
            handleSwapSlots(draggedSlotIdx, targetSlotIdx);
        }
        setDraggedSlotIdx(null);
    }, [draggedSlotIdx, handleSwapSlots]);

    // Fullscreen toggles
    const handleToggleGridFullscreen = useCallback(() => {
        setIsGridFullscreen(prev => {
            const next = !prev;
            if (next) {
                if (onSelectActiveStation) onSelectActiveStation(null);
                const rootEl = viewportRootRef.current;
                if (rootEl && rootEl.requestFullscreen) {
                    rootEl.requestFullscreen().catch(() => {});
                }
            } else {
                if (document.fullscreenElement) {
                    document.exitFullscreen().catch(() => {});
                }
            }
            return next;
        });
    }, [onSelectActiveStation]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && isGridFullscreen) {
                setIsGridFullscreen(false);
            }
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, [isGridFullscreen]);

    // Hotkey bindings: F for Fullscreen Grid, Space for Play/Pause All
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

            if (e.key === 'f' || e.key === 'F') {
                e.preventDefault();
                handleToggleGridFullscreen();
            } else if (e.key === 'Escape' && isGridFullscreen) {
                e.preventDefault();
                setIsGridFullscreen(false);
                if (document.fullscreenElement) {
                    document.exitFullscreen().catch(() => {});
                }
            } else if (e.code === 'Space') {
                e.preventDefault();
                setIsPlaying && setIsPlaying(p => !p);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isGridFullscreen, handleToggleGridFullscreen, setIsPlaying]);

    const handleMouseMove = useCallback(() => {
        if (!isGridFullscreen) return;
        setShowHudControls(true);
        if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
        hudTimerRef.current = setTimeout(() => {
            setShowHudControls(false);
        }, 3200);
    }, [isGridFullscreen]);

    if (timelineStations.length === 0 && !activeStation) return null;

    const isSoloMode = Boolean(activeStation);

    return (
        <div
            ref={viewportRootRef}
            onMouseMove={handleMouseMove}
            className={`multicam-viewport-root ${isSoloMode ? 'solo' : 'canvas-grid'} ${isGridFullscreen ? 'fullscreen-grid-active' : ''}`}
        >
            {/* Universal Master Canvas Grid Control Bar */}
            <div className="multicam-composition-mode-bar">
                <div className="comp-mode-left">
                    <span className="comp-icon">🎛️</span>
                    <span className="comp-title">MASTER CANVAS:</span>

                    {/* Canvas Presets Toolbar */}
                    <div className="comp-pill-group layouts">
                        <button
                            type="button"
                            className={`btn-comp-tab ${canvasPreset === '1x1' ? 'active' : ''}`}
                            onClick={() => handleSelectCanvasPreset('1x1')}
                            title="Single Feed (1x1 Full Screen Master Frame)"
                        >
                            ⊞ 1x1
                        </button>
                        <button
                            type="button"
                            className={`btn-comp-tab ${canvasPreset === '1x2' ? 'active' : ''}`}
                            onClick={() => handleSelectCanvasPreset('1x2')}
                            title="Side-by-Side Dual Feeds (1x2 Master Frame)"
                        >
                            ⊞ 1x2 DUAL
                        </button>
                        <button
                            type="button"
                            className={`btn-comp-tab ${canvasPreset === '3-grid' ? 'active' : ''}`}
                            onClick={() => handleSelectCanvasPreset('3-grid')}
                            title="3 Feeds (Top Dual + Bottom Center)"
                        >
                            ⊞ 3-GRID
                        </button>
                        <button
                            type="button"
                            className={`btn-comp-tab ${canvasPreset === '2x2' ? 'active' : ''}`}
                            onClick={() => handleSelectCanvasPreset('2x2')}
                            title="2x2 Quad Feeds Master Frame"
                        >
                            ⊞ 2x2 QUAD
                        </button>
                        <button
                            type="button"
                            className={`btn-comp-tab ${canvasPreset === 'auto' ? 'active' : ''}`}
                            onClick={() => handleSelectCanvasPreset('auto')}
                            title="Auto Layout (Fits available feeds optimally in 16:9)"
                        >
                            ⊞ AUTO-GRID
                        </button>
                    </div>

                    {/* Quick Swap First Two Slots */}
                    {slots.length >= 2 && (
                        <button
                            type="button"
                            className="btn-comp-swap"
                            onClick={() => handleSwapSlots(0, 1)}
                            title="Quick Swap Primary & Secondary Feeds (⇄)"
                        >
                            ⇄ SWAP FEEDS
                        </button>
                    )}

                    {/* Auto-Director Toggle */}
                    <button
                        type="button"
                        className={`btn-director-toggle ${isAutoDirectorEnabled ? 'is-on' : 'is-off'}`}
                        onClick={onToggleAutoDirector}
                        title={isAutoDirectorEnabled ? "Auto-Director is ON: follows active activity cuts across keyframes" : "Auto-Director is OFF: manual monitor pinning"}
                    >
                        <span className="dot" />
                        <span>AUTO-DIRECTOR: {isAutoDirectorEnabled ? 'ON' : 'OFF'}</span>
                    </button>
                </div>

                {/* Center WYSIWYG Badge */}
                <div className="comp-mode-center">
                    <div className="wysiwyg-export-badge" title="What You See Is What You Get: Exactly how the Master MP4 will render">
                        <span className="dot live" />
                        <span className="badge-text">WYSIWYG 16:9 MASTER PREVIEW</span>
                    </div>
                </div>

                <div className="comp-mode-right">
                    {isSoloMode && (
                        <button
                            type="button"
                            className="btn-grid-toggle active"
                            onClick={() => onSelectActiveStation && onSelectActiveStation(null)}
                            title="Return to Master Canvas Grid"
                        >
                            ⊞ BACK TO CANVAS GRID
                        </button>
                    )}

                    <button
                        type="button"
                        className={`btn-grid-fullscreen-top ${isGridFullscreen ? 'active' : ''}`}
                        onClick={handleToggleGridFullscreen}
                        title="Fullscreen Multi-Station Grid (F)"
                    >
                        {isGridFullscreen ? '⤓ EXIT FULLSCREEN' : '⛶ FULLSCREEN GRID'}
                    </button>
                </div>
            </div>

            {/* View Mode A: Solo Workstation Inspection */}
            {isSoloMode && activeStation && (
                <div
                    className="spotlight-workspace-viewport"
                    onClick={() => onOpenSpotlight && onOpenSpotlight(activeStation.id, compositionLayout)}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        if (onSelectActiveStation) onSelectActiveStation(null);
                    }}
                >
                    <div className="spotlight-viewport-header">
                        <div className="header-meta-group">
                            <span className="status-dot live" />
                            <span className="station-name">
                                {activeStation.hostname || activeStation.displayName || activeStation.name}
                            </span>
                            <span className="feed-spec">
                                {activeStation.feedSpec || `${activeStation.resolution || '1080p'} • ${activeStation.fps || 30}fps`}
                            </span>
                        </div>

                        <button
                            type="button"
                            className="btn-fullscreen-trigger"
                            onClick={(e) => {
                                e.stopPropagation();
                                onOpenSpotlight && onOpenSpotlight(activeStation.id, compositionLayout);
                            }}
                            title="Expand to Cinema Fullscreen"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="14" height="14">
                                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                            </svg>
                        </button>
                    </div>

                    <div className="spotlight-feed-wrapper">
                        <StudioVideoFeed
                            station={activeStation}
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
                            directorPlan={directorPlan || activeStation?.directorPlan}
                            onOverrideDisplay={onOverrideDisplay}
                            onResetOverride={onResetOverride}
                            viewMode={compositionLayout || 'canvas'}
                            onViewModeChange={(newMode) => {
                                onChangeCompositionLayout && onChangeCompositionLayout(newMode);
                            }}
                            onOpenFullscreen={(targetDispId) => {
                                onOpenSpotlight && onOpenSpotlight(activeStation.id, targetDispId);
                            }}
                        />

                        <KeystrokePlaybackOverlay
                            currentEpochMs={currentEpochMs}
                            keystrokes={keystrokes}
                            keystrokeMode={keystrokeMode}
                        />

                        <div className="spotlight-interaction-hint">
                            <span className="hint-pill">
                                L-Click: Fullscreen • R-Click: Back to Grid
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* View Mode B: Master Canvas Grid (WYSIWYG 16:9 Frame) */}
            {!isSoloMode && (
                <div className="canvas-stage-wrapper">
                    <div className={`canvas-master-frame-16-9 preset-${canvasPreset}`}>
                        {/* 16:9 Master Frame Corner Accents */}
                        <div className="corner-accent top-left" />
                        <div className="corner-accent top-right" />
                        <div className="corner-accent bottom-left" />
                        <div className="corner-accent bottom-right" />

                        {/* Slots Matrix */}
                        <div className="canvas-slots-container">
                            {slots.map((slot, sIdx) => {
                                const isBeingDragged = draggedSlotIdx === sIdx;
                                const isDragTarget = dragOverSlotIdx === sIdx;
                                const borderColor = SLOT_BORDER_COLORS[sIdx % SLOT_BORDER_COLORS.length];

                                return (
                                    <div
                                        key={slot.key}
                                        className={`canvas-slot-card-container ${isBeingDragged ? 'is-dragging' : ''} ${isDragTarget ? 'is-drag-over' : ''}`}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, sIdx)}
                                        onDragOver={(e) => handleDragOver(e, sIdx)}
                                        onDrop={(e) => handleDrop(e, sIdx)}
                                        onContextMenu={(e) => onStationContextMenu && onStationContextMenu(e, slot.station)}
                                    >
                                        <CameraCard
                                            station={slot.station}
                                            isSolo={false}
                                            currentEpochMs={currentEpochMs}
                                            timeMode={timeMode}
                                            isPlaying={isPlaying}
                                            setIsPlaying={setIsPlaying}
                                            baseEpochMs={baseEpochMs}
                                            totalDurationMs={totalDurationMs}
                                            outPointMs={outPointMs}
                                            setPlayheadMs={setPlayheadMs}
                                            globalGaps={globalGaps}
                                            onOpenSpotlight={onOpenSpotlight}
                                            onSelectActiveStation={onSelectActiveStation}
                                            recordingSegments={recordingSegments}
                                            playbackSpeed={playbackSpeed}
                                            activeAudioStationId={activeAudioStationId}
                                            onSoloAudio={setActiveAudioStationId}
                                            directorPlan={directorPlan || slot.station?.directorPlan}
                                            isAutoDirectorEnabled={isAutoDirectorEnabled}
                                            targetDisplayId={slot.displayId}
                                            onSelectDisplayId={(dispId) => handleSelectDisplayForSlot(sIdx, dispId)}
                                            slotIndex={sIdx}
                                            borderColor={borderColor}
                                            onSwapWithNext={slots.length > 1 ? () => handleSwapSlots(sIdx, (sIdx + 1) % slots.length) : null}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Fullscreen Grid Floating Tactical Transport Dock */}
            {isGridFullscreen && (
                <div
                    className={`grid-fullscreen-floating-dock ${showHudControls ? 'visible' : 'hidden'}`}
                    onMouseEnter={() => setShowHudControls(true)}
                >
                    <div className="dock-glass-panel">
                        {/* Play/Pause Button */}
                        <button
                            type="button"
                            className={`btn-dock-play ${isPlaying ? 'playing' : ''}`}
                            onClick={() => setIsPlaying && setIsPlaying(p => !p)}
                            title={isPlaying ? "Pause All Stations (Space)" : "Play All Stations Synchronously (Space)"}
                        >
                            {isPlaying ? (
                                <>
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <rect x="6" y="4" width="4" height="16" rx="1" />
                                        <rect x="14" y="4" width="4" height="16" rx="1" />
                                    </svg>
                                    <span>PAUSE ALL</span>
                                </>
                            ) : (
                                <>
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                    <span>PLAY ALL</span>
                                </>
                            )}
                        </button>

                        {/* Scrubber Range Slider */}
                        <div className="dock-scrubber-wrapper">
                            <input
                                type="range"
                                min={0}
                                max={totalDurationMs}
                                value={playheadMs}
                                onChange={(e) => {
                                    const newHead = Number(e.target.value);
                                    setPlayheadMs && setPlayheadMs(newHead);
                                }}
                                className="dock-scrubber-slider"
                                title="Scrub Playhead"
                            />
                        </div>

                        {/* Playhead Clock Display */}
                        <div className="dock-clock-badge">
                            <span className="dot live" />
                            <span className="clock-text">
                                {formatTimelineClock(currentEpochMs, timeMode)}
                            </span>
                        </div>

                        {/* Speed Pills */}
                        <div className="dock-speed-pill">
                            {[0.5, 1, 2, 4].map(spd => (
                                <button
                                    key={spd}
                                    type="button"
                                    className={`btn-dock-speed ${playbackSpeed === spd ? 'active' : ''}`}
                                    onClick={() => onChangePlaybackSpeed && onChangePlaybackSpeed(spd)}
                                >
                                    {spd}x
                                </button>
                            ))}
                        </div>

                        {/* Rule 12 Audio Solo Selector */}
                        <div className="dock-audio-selector">
                            <span className="audio-icon">🔊</span>
                            <select
                                value={activeAudioStationId || ''}
                                onChange={(e) => setActiveAudioStationId(e.target.value || null)}
                                className="dock-audio-select"
                                title="Rule 12 Audio Solo: Select unmuted workstation"
                            >
                                <option value="">🔇 MUTE ALL AUDIO</option>
                                {timelineStations.map(st => (
                                    <option key={st.id} value={st.id}>
                                        {st.displayName || st.hostname} (SOLO AUDIO)
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Exit Fullscreen Button */}
                        <button
                            type="button"
                            className="btn-dock-exit"
                            onClick={handleToggleGridFullscreen}
                            title="Exit Fullscreen Grid (Esc)"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                            </svg>
                            <span>EXIT</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
