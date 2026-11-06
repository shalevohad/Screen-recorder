// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Viewport/MulticamViewport.jsx
// Master Live Canvas Composer & WYSIWYG 16:9 Export Preview Stage
// Full Drag-and-Drop, Feeds Palette, Layers Stacking, Shadows, and Preset Save/Load Parity
// ==========================================
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import CameraCard from './views/Card/CameraCard.jsx';
import CanvasUtcWallClock from './overlays/CanvasUtcWallClock.jsx';
import ActiveAudioSourceOverlay from './overlays/ActiveAudioSourceOverlay.jsx';
import { saveStudioSessionCache } from '../../utils/studioSessionStore.js';
import { formatTimelineClock } from '../../utils/timeFormat.js';
import {
    clamp,
    resolveActiveKeyframeIndex,
    interpolateKeyframePlacements,
    synthesizeAutoKeyframe,
    updateKeyframeTransition,
    deleteKeyframe,
    insertExplicitKeyframe
} from '../../utils/nleTimelineEngine.js';
import {
    computeDecoderAllocations,
    resolveStreamQuality,
    MAX_CONCURRENT_CANVAS_DECODERS
} from '../../utils/canvasStreamGovernor.js';
import {
    RESOLUTION_PRESETS,
    CUSTOM_RESOLUTION_ID,
    ASPECT_PRESETS,
    DEFAULT_CANVAS_RESOLUTION,
    DEFAULT_CANVAS_ASPECT,
    DEFAULT_VIRTUAL_CANVAS_W,
    DEFAULT_VIRTUAL_CANVAS_H,
    sanitizeEvenDimension,
    parseResolutionString,
    parseAspectRatioString,
    computeCanvasDimensions,
    getReadableAspectRatio
} from '../../utils/canvasResolutionEngine.js';
import './MulticamViewport.scss';

export {
    RESOLUTION_PRESETS,
    CUSTOM_RESOLUTION_ID,
    ASPECT_PRESETS,
    DEFAULT_CANVAS_RESOLUTION,
    DEFAULT_CANVAS_ASPECT,
    DEFAULT_VIRTUAL_CANVAS_W,
    DEFAULT_VIRTUAL_CANVAS_H,
    sanitizeEvenDimension,
    parseResolutionString,
    parseAspectRatioString,
    computeCanvasDimensions,
    getReadableAspectRatio
};



const SLOT_BORDER_COLORS = [
    '#06B6D4', // Cyan
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#F43F5E', // Rose
    '#A855F7', // Purple
    '#38BDF8'  // Sky
];

const PALETTE_COLORS = [
    '#06B6D4', '#10B981', '#F59E0B', '#F43F5E',
    '#A855F7', '#38BDF8', '#FFFFFF', 'transparent'
];

const BORDER_WIDTHS = [0, 2, 4, 6, 8];

const SHADOW_PRESETS = [
    { id: 'none', label: 'None' },
    { id: 'deep', label: 'Deep Cinema' },
    { id: 'glow-cyan', label: 'Cyan Glow' },
    { id: 'glow-emerald', label: 'Emerald Glow' },
    { id: 'glow-rose', label: 'Rose Glow' },
    { id: 'glow-amber', label: 'Amber Glow' }
];

function getShadowCss(shadowEffect, isSelected, bColor) {
    let base;
    switch (shadowEffect) {
        case 'deep':
            base = '0 18px 45px rgba(0, 0, 0, 0.9), 0 4px 12px rgba(0, 0, 0, 0.7)';
            break;
        case 'glow-cyan':
            base = '0 0 24px rgba(6, 182, 212, 0.65), 0 10px 30px rgba(0, 0, 0, 0.8)';
            break;
        case 'glow-emerald':
            base = '0 0 24px rgba(16, 185, 129, 0.65), 0 10px 30px rgba(0, 0, 0, 0.8)';
            break;
        case 'glow-rose':
            base = '0 0 24px rgba(244, 63, 94, 0.65), 0 10px 30px rgba(0, 0, 0, 0.8)';
            break;
        case 'glow-amber':
            base = '0 0 24px rgba(245, 158, 11, 0.65), 0 10px 30px rgba(0, 0, 0, 0.8)';
            break;
        default:
            base = '0 6px 20px rgba(0, 0, 0, 0.5)';
            break;
    }
    if (isSelected) {
        return `${base}, 0 0 0 2px ${bColor || '#06B6D4'}, inset 0 0 16px rgba(6, 182, 212, 0.25)`;
    }
    return base;
}



function fitInCell(cellX, cellY, cellW, cellH, aspect) {
    const safeAspect = aspect > 0 ? aspect : (16 / 9);
    const cellAspect = cellW / cellH;
    let w, h, x, y;
    if (safeAspect >= cellAspect) {
        w = cellW;
        h = Math.round(w / safeAspect);
        x = cellX;
        y = cellY + Math.round((cellH - h) / 2);
    } else {
        h = cellH;
        w = Math.round(h * safeAspect);
        x = cellX + Math.round((cellW - w) / 2);
        y = cellY;
    }
    return { x, y, width: w, height: h };
}

export function generateAutoPackPlacements(feeds, W = DEFAULT_VIRTUAL_CANVAS_W, H = DEFAULT_VIRTUAL_CANVAS_H) {
    const count = feeds.length;
    if (count === 0) return [];

    if (count === 1) {
        const f0 = feeds[0];
        const aspect = f0.nativeAspectRatio || (f0.sourceWidth && f0.sourceHeight ? f0.sourceWidth / f0.sourceHeight : 16 / 9);
        const { x, y, width, height } = fitInCell(0, 0, W, H, aspect);
        return [{
            ...f0,
            x,
            y,
            width,
            height,
            sourceWidth: f0.sourceWidth || 1920,
            sourceHeight: f0.sourceHeight || 1080,
            nativeAspectRatio: aspect,
            aspectRatio: aspect,
            zIndex: 0,
            rotation: 0,
            borderWidth: 0,
            borderColor: SLOT_BORDER_COLORS[0],
            shadowEffect: 'deep',
            borderRadius: 0
        }];
    }

    if (count === 2) {
        const halfW = Math.round(W / 2);
        return feeds.slice(0, 2).map((f, idx) => {
            const aspect = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 16 / 9);
            const { x, y, width, height } = fitInCell(idx * halfW, 0, halfW, H, aspect);
            return {
                ...f,
                x,
                y,
                width,
                height,
                sourceWidth: f.sourceWidth || 1920,
                sourceHeight: f.sourceHeight || 1080,
                nativeAspectRatio: aspect,
                aspectRatio: aspect,
                zIndex: idx,
                rotation: 0,
                borderWidth: 2,
                borderColor: SLOT_BORDER_COLORS[idx % SLOT_BORDER_COLORS.length],
                shadowEffect: 'deep',
                borderRadius: 0
            };
        });
    }

    if (count === 3) {
        const isUltrawide = (W / H) >= 2.5;
        if (isUltrawide) {
            const thirdW = Math.round(W / 3);
            return feeds.slice(0, 3).map((f, idx) => {
                const aspect = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 16 / 9);
                const { x, y, width, height } = fitInCell(idx * thirdW, 0, thirdW, H, aspect);
                return {
                    ...f,
                    x,
                    y,
                    width,
                    height,
                    sourceWidth: f.sourceWidth || 1920,
                    sourceHeight: f.sourceHeight || 1080,
                    nativeAspectRatio: aspect,
                    aspectRatio: aspect,
                    zIndex: idx,
                    rotation: 0,
                    borderWidth: 2,
                    borderColor: SLOT_BORDER_COLORS[idx % SLOT_BORDER_COLORS.length],
                    shadowEffect: 'deep',
                    borderRadius: 0
                };
            });
        }
        const cellW = Math.round(W / 2);
        const cellH = Math.round(H / 2);
        const gridCells = [
            { cx: 0, cy: 0 },
            { cx: cellW, cy: 0 },
            { cx: Math.round(cellW / 2), cy: cellH }
        ];
        return feeds.slice(0, 3).map((f, idx) => {
            const aspect = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 16 / 9);
            const { cx, cy } = gridCells[idx];
            const { x, y, width, height } = fitInCell(cx, cy, cellW, cellH, aspect);
            return {
                ...f,
                x,
                y,
                width,
                height,
                sourceWidth: f.sourceWidth || 1920,
                sourceHeight: f.sourceHeight || 1080,
                nativeAspectRatio: aspect,
                aspectRatio: aspect,
                zIndex: idx,
                rotation: 0,
                borderWidth: 2,
                borderColor: SLOT_BORDER_COLORS[idx % SLOT_BORDER_COLORS.length],
                shadowEffect: 'deep',
                borderRadius: 0
            };
        });
    }

    if (count === 4) {
        const cellW = Math.round(W / 2);
        const cellH = Math.round(H / 2);
        const gridCells = [
            { cx: 0, cy: 0 },
            { cx: cellW, cy: 0 },
            { cx: 0, cy: cellH },
            { cx: cellW, cy: cellH }
        ];
        return feeds.slice(0, 4).map((f, idx) => {
            const aspect = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 16 / 9);
            const { cx, cy } = gridCells[idx];
            const { x, y, width, height } = fitInCell(cx, cy, cellW, cellH, aspect);
            return {
                ...f,
                x,
                y,
                width,
                height,
                sourceWidth: f.sourceWidth || 1920,
                sourceHeight: f.sourceHeight || 1080,
                nativeAspectRatio: aspect,
                aspectRatio: aspect,
                zIndex: idx,
                rotation: 0,
                borderWidth: 2,
                borderColor: SLOT_BORDER_COLORS[idx % SLOT_BORDER_COLORS.length],
                shadowEffect: 'deep',
                borderRadius: 0
            };
        });
    }

    const cols = count <= 6 ? 3 : count <= 8 ? 4 : Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / cols);
    const cellW = Math.floor(W / cols);
    const cellH = Math.floor(H / rows);

    return feeds.map((f, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const aspect = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 16 / 9);
        const { x, y, width, height } = fitInCell(col * cellW, row * cellH, cellW, cellH, aspect);
        return {
            ...f,
            x,
            y,
            width,
            height,
            sourceWidth: f.sourceWidth || 1920,
            sourceHeight: f.sourceHeight || 1080,
            nativeAspectRatio: aspect,
            aspectRatio: aspect,
            zIndex: i,
            rotation: 0,
            borderWidth: 2,
            borderColor: SLOT_BORDER_COLORS[i % SLOT_BORDER_COLORS.length],
            shadowEffect: 'deep',
            borderRadius: 0
        };
    });
}

export default function MulticamViewport({
    activeStation,
    timelineStations = [],
    allStations = [],
    onSelectActiveStation,
    onOpenSpotlight,
    onStationContextMenu,
    onDeselectStation = null,
    stationAutoDirectorMap = {},
    onToggleStationAutoDirector = null,
    baseEpochMs = 0,
    playheadMs = 0,
    playheadEpochMs = 0,
    timeMode = 'LOCAL',
    isPlaying = false,
    setIsPlaying,
    totalDurationMs,
    inPointMs = 0,
    outPointMs,
    setPlayheadMs,
    globalGaps = [],
    recordingSegments = {},
    playbackSpeed = 1,
    onChangePlaybackSpeed: _onChangePlaybackSpeed,
    keystrokeMode = 'BurnIn',
    keystrokes = [],
    directorPlan = null,
    onOverrideDisplay,
    onResetOverride,
    compositionLayout = 'canvas',
    onChangeCompositionLayout,
    isAutoDirectorEnabled = true,
    onToggleAutoDirector,
    onUpdateCanvasLayout,
    canvasLayoutTimeline = null,
    onUpdateCanvasLayoutTimeline,
    activeKfIndex = 0,
    setActiveKfIndex,
    isModalOpen = false,
    isGridFullscreen: propIsGridFullscreen = undefined,
    onToggleGridFullscreen: propOnToggleGridFullscreen = null
}) {
    const currentEpochMs = playheadEpochMs > 0 ? playheadEpochMs : (baseEpochMs + playheadMs);
    const [utcClockPosition, setUtcClockPosition] = useState(() => {
        try {
            return localStorage.getItem('itb_canvas_utc_clock_pos') || 'top-right';
        } catch {
            return 'top-right';
        }
    });
    const cutStartEpochMs = baseEpochMs + inPointMs;

    // Audio solo state
    const [activeAudioStationId, setActiveAudioStationId] = useState(() => {
        return timelineStations[0]?.id || null;
    });

    // Side Panels: Unified Feeds & Layers Manager, Save/Load Presets
    const [showFeedsDrawer, setShowFeedsDrawer] = useState(false);
    const [draggedDrawerItem, setDraggedDrawerItem] = useState(null);
    const [drawerDragOverState, setDrawerDragOverState] = useState({ index: null, position: null });
    const [showSavePresetModal, setShowSavePresetModal] = useState(false);
    const [showPresetsMenu, setShowPresetsMenu] = useState(false);
    const [showLayoutPresetsPopout, setShowLayoutPresetsPopout] = useState(false);
    const [showAspectPopout, setShowAspectPopout] = useState(false);
    const [showResolutionPopout, setShowResolutionPopout] = useState(false);
    const [presetNameInput, setPresetNameInput] = useState('');
    const [feedSearchQuery, setFeedSearchQuery] = useState('');
    const importFileInputRef = useRef(null);

    // Saved Presets in localStorage
    const [savedPresets, setSavedPresets] = useState(() => {
        try {
            const raw = localStorage.getItem('itb_canvas_saved_presets');
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    const persistSavedPresets = (presets) => {
        setSavedPresets(presets);
        try {
            localStorage.setItem('itb_canvas_saved_presets', JSON.stringify(presets));
        } catch {}
    };

    // Fullscreen HUD state
    const [internalIsGridFullscreen, setInternalIsGridFullscreen] = useState(false);
    const isGridFullscreen = propIsGridFullscreen !== undefined ? propIsGridFullscreen : internalIsGridFullscreen;
    const [_showHudControls, setShowHudControls] = useState(false);
    const hudTimerRef = useRef(null);
    const viewportRootRef = useRef(null);
    const canvasFrameRef = useRef(null);
    const stageWrapperRef = useRef(null);
    const [canvasFrameDimensions, setCanvasFrameDimensions] = useState({ width: 960, height: 540 });

    // Selection & Free Transform state
    const [selectedFeedIndex, setSelectedFeedIndex] = useState(null);
    const [isInspectorOpen, setIsInspectorOpen] = useState(false);

    // Screen Title Inline & HUD Inspector Editing State
    const [editingTitleIndex, setEditingTitleIndex] = useState(null);
    const [editingTitleValue, setEditingTitleValue] = useState('');
    const titleInputRef = useRef(null);
    const [inspectorTitleValue, setInspectorTitleValue] = useState('');

    useEffect(() => {
        if (editingTitleIndex !== null && titleInputRef.current) {
            titleInputRef.current.focus();
            titleInputRef.current.select();
        }
    }, [editingTitleIndex]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsInspectorOpen(false);
                setSelectedFeedIndex(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);
    const [showRotationControl, setShowRotationControl] = useState(false);
    const [showShadowControl, setShowShadowControl] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [snapGuides, setSnapGuides] = useState({ vertical: null, horizontal: null });

    // Precision Rulers & Windows Snap Assist State
    const [showRulers, setShowRulers] = useState(true);
    const [isSnappingEnabled, setIsSnappingEnabled] = useState(true);
    const [snapZonePreview, setSnapZonePreview] = useState(null);
    const [mouseCanvasCoords, setMouseCanvasCoords] = useState({ x: 0, y: 0, isInside: false });
    const workSurfaceRef = useRef(null);

    const dragStateRef = useRef(null);
    const hasUserCustomizedRef = useRef(false);
    const [selectedPresetId, setSelectedPresetId] = useState('auto-grid');

    // Undo / Redo History Stack (CTRL+Z / CTRL+Y) & Windows QuickSave (CTRL+S)
    const undoStackRef = useRef([]);
    const redoStackRef = useRef([]);
    const preActionSnapshotRef = useRef(null);
    const [, setHistoryVersion] = useState(0);

    const toastTimerRef = useRef(null);
    const [toastMessage, setToastMessage] = useState(null);

    const triggerToast = useCallback((text, type = 'success', icon = '💾') => {
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        setToastMessage({ text, type, icon });
        toastTimerRef.current = setTimeout(() => {
            setToastMessage(null);
            toastTimerRef.current = null;
        }, 2200);
    }, []);

    // Custom Canvas Dimensions State (for Manual / Custom Resolutions)
    const [customCanvasDims, setCustomCanvasDims] = useState(() => {
        const tw = canvasLayoutTimeline?.keyframes?.[0]?.layout?.width;
        const th = canvasLayoutTimeline?.keyframes?.[0]?.layout?.height;
        if (tw && th && tw >= 320 && th >= 180) {
            return { w: sanitizeEvenDimension(tw), h: sanitizeEvenDimension(th, 180, 4320) };
        }
        try {
            const sw = localStorage.getItem('itb_studio_canvas_custom_w');
            const sh = localStorage.getItem('itb_studio_canvas_custom_h');
            if (sw && sh) {
                const pw = parseInt(sw, 10);
                const ph = parseInt(sh, 10);
                if (pw >= 320 && ph >= 180) {
                    return { w: sanitizeEvenDimension(pw), h: sanitizeEvenDimension(ph, 180, 4320) };
                }
            }
        } catch {
            // Ignore
        }
        return { w: 2560, h: 1440 };
    });

    // Decoupled Canvas Resolution & Aspect Ratio State (Default: 2K, 16:9)
    const [selectedResolutionId, setSelectedResolutionId] = useState(() => {
        const fromTimeline = canvasLayoutTimeline?.resolution;
        if (fromTimeline) {
            if (RESOLUTION_PRESETS.some(r => r.id === fromTimeline) || fromTimeline === CUSTOM_RESOLUTION_ID || parseResolutionString(fromTimeline)) {
                return fromTimeline;
            }
        }
        try {
            const stored = localStorage.getItem('itb_studio_canvas_resolution');
            if (stored && (RESOLUTION_PRESETS.some(r => r.id === stored) || stored === CUSTOM_RESOLUTION_ID || parseResolutionString(stored))) return stored;
        } catch {
            // Ignore
        }
        return '2K'; // Default 2K per user specification
    });

    const [selectedAspectId, setSelectedAspectId] = useState(() => {
        const fromTimelineAspect = canvasLayoutTimeline?.aspectRatio;
        if (fromTimelineAspect && ASPECT_PRESETS.some(p => p.id === fromTimelineAspect)) {
            return fromTimelineAspect;
        }
        const w = canvasLayoutTimeline?.keyframes?.[0]?.layout?.width;
        const h = canvasLayoutTimeline?.keyframes?.[0]?.layout?.height;
        if (w && h) {
            const aspect = w / h;
            const match = ASPECT_PRESETS.find(p => Math.abs(p.ratio - aspect) < 0.04);
            if (match) return match.id;
        }
        try {
            const stored = localStorage.getItem('itb_studio_canvas_aspect');
            if (stored && (ASPECT_PRESETS.some(p => p.id === stored) || parseAspectRatioString(stored))) return stored;
        } catch {
            // Ignore
        }
        return DEFAULT_CANVAS_ASPECT; // Default 16:9 Broadcast
    });

    const canvasDimensions = useMemo(() => {
        return computeCanvasDimensions(selectedResolutionId, selectedAspectId, customCanvasDims);
    }, [selectedResolutionId, selectedAspectId, customCanvasDims]);

    const virtualW = canvasDimensions.w;
    const virtualH = canvasDimensions.h;

    const activeAspectPreset = useMemo(() => {
        const p = ASPECT_PRESETS.find(ap => ap.id === selectedAspectId);
        if (p) return { ...p, w: virtualW, h: virtualH };
        const customRatio = (virtualW && virtualH && virtualH > 0) ? (virtualW / virtualH) : (16 / 9);
        return {
            id: selectedAspectId,
            label: `${selectedAspectId}`,
            ratio: customRatio,
            w: virtualW,
            h: virtualH
        };
    }, [selectedAspectId, virtualW, virtualH]);

    const currentAspect = activeAspectPreset.ratio;

    // Manual / Custom Resolution Popout Inputs State
    const [customWidthInput, setCustomWidthInput] = useState('');
    const [customHeightInput, setCustomHeightInput] = useState('');
    const [customResError, setCustomResError] = useState(null);

    // Sync input dimensions whenever the resolution popout opens
    useEffect(() => {
        if (showResolutionPopout) {
            setCustomWidthInput(String(virtualW));
            setCustomHeightInput(String(virtualH));
            setCustomResError(null);
        }
    }, [showResolutionPopout]);

    const [isFullWidth, setIsFullWidth] = useState(() => {
        try {
            const stored = localStorage.getItem('itb_studio_canvas_fullwidth');
            if (stored !== null) return stored === 'true';
        } catch {
            // Ignore
        }
        return false; // Default to FIT PAGE
    });

    const handleToggleFullWidth = useCallback(() => {
        setIsFullWidth(prev => {
            const next = !prev;
            try {
                localStorage.setItem('itb_studio_canvas_fullwidth', String(next));
            } catch {
                // Ignore
            }
            return next;
        });
    }, []);

    // Precision Rulers ticks generation (dynamic to virtual canvas aspect)
    const rulerTicksX = useMemo(() => {
        const ticks = [];
        const step = virtualW >= 3000 ? 200 : 100;
        const medStep = step / 2;
        const minorStep = step / 10;
        for (let x = 0; x <= virtualW; x += minorStep) {
            const isMajor = x % step === 0;
            const isMed = !isMajor && x % medStep === 0;
            ticks.push({ val: x, isMajor, isMed });
        }
        return ticks;
    }, [virtualW]);

    const rulerTicksY = useMemo(() => {
        const ticks = [];
        const step = 100;
        const medStep = 50;
        const minorStep = 10;
        for (let y = 0; y <= virtualH; y += minorStep) {
            const isMajor = y % step === 0;
            const isMed = !isMajor && y % medStep === 0;
            ticks.push({ val: y, isMajor, isMed });
        }
        return ticks;
    }, [virtualH]);

    const handleWorkSurfaceMouseMove = useCallback((e) => {
        const activeRef = workSurfaceRef.current || canvasFrameRef.current;
        if (!activeRef) return;
        const rect = activeRef.getBoundingClientRect();
        const cx = clamp(Math.round(((e.clientX - rect.left) / rect.width) * virtualW), 0, virtualW);
        const cy = clamp(Math.round(((e.clientY - rect.top) / rect.height) * virtualH), 0, virtualH);
        setMouseCanvasCoords({ x: cx, y: cy, isInside: true });
    }, [virtualW, virtualH]);

    const handleWorkSurfaceMouseLeave = useCallback(() => {
        setMouseCanvasCoords(prev => ({ ...prev, isInside: false }));
    }, []);

    // Dynamic responsive canvas frame measurement matching target export aspect ratio
    const updateDimensions = useCallback(() => {
        const el = stageWrapperRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        // Provide breathing space and reserve room for flush side toolbars
        const docksReserve = 104;
        const availableW = Math.max(320, Math.floor(rect.width || 960) - docksReserve - 16);
        const availableH = Math.max(180, Math.floor(rect.height || 540) - 16);

        let finalW, finalH;
        if (isFullWidth) {
            // Full screen width: canvas expands to 100% of available viewport width
            finalW = availableW;
            finalH = Math.round(finalW / currentAspect);
        } else {
            // Fit stage: contain within stage bounds
            if (availableW / availableH >= currentAspect) {
                finalH = availableH;
                finalW = Math.round(finalH * currentAspect);
            } else {
                finalW = availableW;
                finalH = Math.round(finalW / currentAspect);
            }
        }

        setCanvasFrameDimensions(prev => {
            if (prev.width === finalW && prev.height === finalH) return prev;
            return { width: finalW, height: finalH };
        });
    }, [isFullWidth, currentAspect]);

    useEffect(() => {
        const el = stageWrapperRef.current;
        if (!el) return;

        updateDimensions();

        let ro = null;
        if (typeof ResizeObserver !== 'undefined') {
            ro = new ResizeObserver(() => {
                updateDimensions();
            });
            ro.observe(el);
        }
        window.addEventListener('resize', updateDimensions);

        return () => {
            if (ro) ro.disconnect();
            window.removeEventListener('resize', updateDimensions);
        };
    }, [updateDimensions]);

    // Default initial workstation feeds: exactly 1 central composition per station preserving aspect ratio
    const defaultStationFeeds = useMemo(() => {
        const pool = (timelineStations && timelineStations.length > 0) ? timelineStations : allStations;
        return pool.map(st => {
            const displays = (st.displays && st.displays.length > 0)
                ? st.displays
                : (st.topology && st.topology.displays && st.topology.displays.length > 0)
                    ? st.topology.displays
                    : [{ displayId: 'mon-0', isPrimary: true, width: st.width || 1920, height: st.height || 1080 }];
            const primary = displays.find(d => d.isPrimary) || displays[0];
            const srcW = primary.width || primary.Width || st.width || 1920;
            const srcH = primary.height || primary.Height || st.height || 1080;
            const nativeRatio = (srcW && srcH) ? (srcW / srcH) : (16 / 9);
            const hasMulti = displays.length > 1;
            return {
                stationId: st.id,
                displayId: 'auto',
                label: `${st.displayName || st.roleAlias || st.hostname || st.name} - ${hasMulti ? 'Central Composition (Auto-Director)' : 'Main Display'}`,
                stationName: st.displayName || st.roleAlias || st.hostname || st.name,
                stationHostname: st.hostname || st.id,
                isPrimary: true,
                sourceWidth: srcW,
                sourceHeight: srcH,
                nativeAspectRatio: nativeRatio,
                aspectRatio: nativeRatio,
                width: srcW,
                height: srcH
            };
        });
    }, [timelineStations, allStations]);

    // Enumerate all available workstation feeds across displays (including central composite and individual screens)
    const availableFeeds = useMemo(() => {
        const pool = (timelineStations && timelineStations.length > 0) ? timelineStations : allStations;
        const feeds = [];
        pool.forEach(st => {
            const displays = (st.displays && st.displays.length > 0)
                ? st.displays
                : (st.topology && st.topology.displays && st.topology.displays.length > 0)
                    ? st.topology.displays
                    : [{ displayId: 'mon-0', isPrimary: true, width: st.width || 1920, height: st.height || 1080 }];

            const primary = displays.find(d => d.isPrimary) || displays[0];
            const pW = primary.width || primary.Width || st.width || 1920;
            const pH = primary.height || primary.Height || st.height || 1080;
            const pRatio = (pW && pH) ? (pW / pH) : (16 / 9);

            // Add Central Composition feed
            feeds.push({
                stationId: st.id,
                displayId: 'auto',
                label: `${st.displayName || st.roleAlias || st.hostname || st.name} - ${displays.length > 1 ? 'Central Composition' : 'Main Display'}`,
                stationName: st.displayName || st.roleAlias || st.hostname || st.name,
                stationHostname: st.hostname || st.id,
                isPrimary: true,
                sourceWidth: pW,
                sourceHeight: pH,
                nativeAspectRatio: pRatio,
                aspectRatio: pRatio,
                width: pW,
                height: pH
            });

            // If multi-monitor, also add discrete screens
            if (displays.length > 1) {
                displays.forEach((d, idx) => {
                    const dispId = (d.displayId || `mon-${idx}`).toLowerCase();
                    const dispNum = d.displayNumber || (idx + 1);
                    const dispTitle = d.displayName || `Screen ${dispNum}`;
                    const srcW = d.width || d.Width || st.width || 1920;
                    const srcH = d.height || d.Height || st.height || 1080;
                    const nativeRatio = (srcW && srcH) ? (srcW / srcH) : (16 / 9);
                    feeds.push({
                        stationId: st.id,
                        displayId: dispId,
                        label: `${st.displayName || st.roleAlias || st.hostname || st.name} - ${dispTitle}`,
                        stationName: st.displayName || st.roleAlias || st.hostname || st.name,
                        stationHostname: st.hostname || st.id,
                        isPrimary: Boolean(d.isPrimary),
                        sourceWidth: srcW,
                        sourceHeight: srcH,
                        nativeAspectRatio: nativeRatio,
                        aspectRatio: nativeRatio,
                        width: srcW,
                        height: srcH
                    });
                });
            }
        });
        return feeds;
    }, [timelineStations, allStations]);

    // Timeline Keyframes Layout State: Initializes with 1 equal slot per station (Central Composition)
    const [internalTimeline, setInternalTimeline] = useState(() => {
        if (canvasLayoutTimeline?.keyframes?.length > 0) {
            const sanitized = JSON.parse(JSON.stringify(canvasLayoutTimeline));
            if (timelineStations && timelineStations.length > 0) {
                const selectedIds = new Set(timelineStations.map(s => s.id));
                sanitized.keyframes.forEach(kf => {
                    if (kf.layout?.placements?.length > 0) {
                        kf.layout.placements = kf.layout.placements.filter(p => selectedIds.has(p.stationId));
                    }
                });
                const hasValid = sanitized.keyframes.some(kf => kf.layout?.placements?.length > 0);
                if (hasValid) return sanitized;
            } else {
                return sanitized;
            }
        }
        return {
            id: 'canvas-timeline-root',
            keyframes: [
                {
                    id: 'kf_root_0',
                    timestampEpochMs: baseEpochMs,
                    transitionDurationSec: 0.5,
                    transitionType: 'smooth',
                    layout: {
                        width: DEFAULT_VIRTUAL_CANVAS_W,
                        height: DEFAULT_VIRTUAL_CANVAS_H,
                        backgroundColor: '#070A10',
                        fps: 30.0,
                        placements: generateAutoPackPlacements(defaultStationFeeds, DEFAULT_VIRTUAL_CANVAS_W, DEFAULT_VIRTUAL_CANVAS_H)
                    }
                }
            ]
        };
    });

    useEffect(() => {
        if (canvasLayoutTimeline?.keyframes?.length > 0) {
            const sanitized = JSON.parse(JSON.stringify(canvasLayoutTimeline));
            if (timelineStations && timelineStations.length > 0) {
                const selectedIds = new Set(timelineStations.map(s => s.id));
                sanitized.keyframes.forEach(kf => {
                    if (kf.layout?.placements?.length > 0) {
                        kf.layout.placements = kf.layout.placements.filter(p => selectedIds.has(p.stationId));
                    }
                });
            }
            setInternalTimeline(sanitized);
            const hasExisting = sanitized.keyframes.some(k => k.layout?.placements?.length > 0);
            if (hasExisting) {
                hasUserCustomizedRef.current = true;
                setSelectedPresetId('custom');
            }
        }
    }, [canvasLayoutTimeline, timelineStations]);

    const keyframes = internalTimeline.keyframes || [];
    const activeKfIndexByTime = useMemo(() => {
        return resolveActiveKeyframeIndex(keyframes, currentEpochMs);
    }, [keyframes, currentEpochMs]);

    const safeActiveIdx = clamp(
        (activeKfIndex !== undefined && activeKfIndex !== null) ? activeKfIndex : activeKfIndexByTime,
        0,
        Math.max(0, keyframes.length - 1)
    );
    const currentKf = keyframes[safeActiveIdx] || keyframes[activeKfIndexByTime] || keyframes[0];
    const currentPlacements = useMemo(() => {
        return currentKf?.layout?.placements || [];
    }, [currentKf]);

    // Keep HUD inspector title input synchronized with selected placement label
    useEffect(() => {
        if (selectedFeedIndex >= 0 && currentPlacements[selectedFeedIndex]) {
            setInspectorTitleValue(currentPlacements[selectedFeedIndex].label ?? '');
        } else {
            setInspectorTitleValue('');
        }
    }, [selectedFeedIndex, currentPlacements]);

    // Capture current snapshot of entire canvas state
    const captureCurrentSnapshot = useCallback((label = 'Action') => {
        return {
            label,
            timeline: JSON.parse(JSON.stringify(internalTimeline)),
            resolutionId: selectedResolutionId,
            aspectId: selectedAspectId,
            presetId: selectedPresetId,
            selectedFeedIndex: selectedFeedIndex
        };
    }, [internalTimeline, selectedResolutionId, selectedAspectId, selectedPresetId, selectedFeedIndex]);

    const pushUndoSnapshot = useCallback((label = 'Action') => {
        const snap = captureCurrentSnapshot(label);
        undoStackRef.current.push(snap);
        if (undoStackRef.current.length > 50) {
            undoStackRef.current.shift();
        }
        redoStackRef.current = [];
        setHistoryVersion(v => v + 1);
    }, [captureCurrentSnapshot]);

    const pushPreActionSnapshot = useCallback(() => {
        if (preActionSnapshotRef.current) {
            undoStackRef.current.push(preActionSnapshotRef.current);
            if (undoStackRef.current.length > 50) {
                undoStackRef.current.shift();
            }
            redoStackRef.current = [];
            preActionSnapshotRef.current = null;
            setHistoryVersion(v => v + 1);
        }
    }, []);

    // Helper to ensure a keyframe exists at the current epoch before dragging or resizing
    const ensureKeyframeAtCurrentEpoch = useCallback(() => {
        const currentEpoch = playheadEpochMs > 0 ? playheadEpochMs : (baseEpochMs + playheadMs);
        const TOLERANCE_MS = 500;
        if (currentEpoch <= baseEpochMs + TOLERANCE_MS) return safeActiveIdx;

        const activeLayout = currentKf?.layout || {
            width: virtualW,
            height: virtualH,
            backgroundColor: '#070A10',
            fps: 30.0,
            placements: currentPlacements
        };

        const { nextTimeline, newIndex, isNew } = insertExplicitKeyframe(internalTimeline, currentEpoch, activeLayout, TOLERANCE_MS);
        if (isNew) {
            setInternalTimeline(nextTimeline);
            if (onUpdateCanvasLayoutTimeline) onUpdateCanvasLayoutTimeline(nextTimeline);
            if (setActiveKfIndex) setActiveKfIndex(newIndex);
            triggerToast(
                `Keyframe #${newIndex + 1} created at ${formatTimelineClock(currentEpoch, timeMode, { includeSeconds: true })}`,
                'success',
                '💎'
            );
        }
        return newIndex;
    }, [playheadEpochMs, baseEpochMs, playheadMs, safeActiveIdx, currentKf, virtualW, virtualH, currentPlacements, internalTimeline, onUpdateCanvasLayoutTimeline, setActiveKfIndex, timeMode, triggerToast]);

    // Helper to update current placements on active keyframe with Auto-Keyframe synthesis
    const updateActivePlacements = useCallback((newPlacements, actionLabel = null) => {
        if (actionLabel) {
            pushUndoSnapshot(actionLabel);
        }
        const currentEpoch = playheadEpochMs > 0 ? playheadEpochMs : (baseEpochMs + playheadMs);

        setInternalTimeline(prev => {
            const { nextTimeline, newIndex, isNewKeyframe } = synthesizeAutoKeyframe({
                prevTimeline: prev,
                newPlacements,
                currentEpochMs: currentEpoch,
                baseEpochMs,
                toleranceMs: 500,
                virtualW,
                virtualH,
                fps: 30.0
            });

            if (onUpdateCanvasLayoutTimeline) onUpdateCanvasLayoutTimeline(nextTimeline);
            if (setActiveKfIndex) setActiveKfIndex(newIndex);

            if (isNewKeyframe && newIndex > 0) {
                triggerToast(
                    `Keyframe #${newIndex + 1} created at ${formatTimelineClock(currentEpoch, timeMode, { includeSeconds: true })}`,
                    'success',
                    '💎'
                );
            }

            return nextTimeline;
        });
    }, [playheadEpochMs, baseEpochMs, playheadMs, virtualW, virtualH, onUpdateCanvasLayoutTimeline, setActiveKfIndex, timeMode, triggerToast, pushUndoSnapshot]);

    // Auto-populate AUTO-GRID by default when defaultStationFeeds become available and canvas is empty (1 central composite per station)
    useEffect(() => {
        if (defaultStationFeeds.length > 0 && (!currentPlacements || currentPlacements.length === 0) && !hasUserCustomizedRef.current) {
            let targetAspect = selectedAspectId;
            if (defaultStationFeeds.length === 2 && selectedAspectId === '16:9') {
                targetAspect = '32:9';
                setSelectedAspectId('32:9');
            }
            const activePreset = ASPECT_PRESETS.find(p => p.id === targetAspect) || ASPECT_PRESETS[0];
            const autoPacked = generateAutoPackPlacements(defaultStationFeeds, activePreset.w, activePreset.h);
            if (autoPacked.length > 0) {
                updateActivePlacements(autoPacked);
                setSelectedPresetId('auto-grid');
            }
        }
    }, [defaultStationFeeds, currentPlacements, updateActivePlacements, selectedAspectId]);

    // Keep canvas layout synchronized with selected timeline stations:
    // If the operator adds/removes stations from selection, auto-update the grid if in auto-grid mode,
    // or purge unselected stations if custom layout.
    const prevTimelineStationIdsRef = useRef('');
    useEffect(() => {
        const currentIdsStr = (timelineStations || []).map(s => s.id).sort().join(',');
        if (prevTimelineStationIdsRef.current === '') {
            prevTimelineStationIdsRef.current = currentIdsStr;
            return;
        }
        if (prevTimelineStationIdsRef.current !== currentIdsStr) {
            prevTimelineStationIdsRef.current = currentIdsStr;

            if (timelineStations && timelineStations.length > 0) {
                const selectedIds = new Set(timelineStations.map(s => s.id));
                if (selectedPresetId === 'auto-grid' || !hasUserCustomizedRef.current) {
                    let targetAspect = selectedAspectId;
                    if (defaultStationFeeds.length === 2 && selectedAspectId === '16:9') {
                        targetAspect = '32:9';
                        setSelectedAspectId('32:9');
                    }
                    const activePreset = ASPECT_PRESETS.find(p => p.id === targetAspect) || ASPECT_PRESETS[0];
                    const autoPacked = generateAutoPackPlacements(defaultStationFeeds, activePreset.w, activePreset.h);
                    if (autoPacked.length > 0) {
                        updateActivePlacements(autoPacked);
                    }
                } else if (currentPlacements && currentPlacements.length > 0) {
                    const cleaned = currentPlacements.filter(p => selectedIds.has(p.stationId));
                    if (cleaned.length !== currentPlacements.length) {
                        if (cleaned.length === 0) {
                            const autoPacked = generateAutoPackPlacements(defaultStationFeeds, virtualW, virtualH);
                            updateActivePlacements(autoPacked);
                        } else {
                            updateActivePlacements(cleaned);
                        }
                    }
                }
            }
        }
    }, [timelineStations, defaultStationFeeds, selectedPresetId, selectedAspectId, currentPlacements, updateActivePlacements, virtualW, virtualH]);

    // Sync current canvas layout to parent Studio
    useEffect(() => {
        if (onUpdateCanvasLayout) {
            onUpdateCanvasLayout({
                width: virtualW,
                height: virtualH,
                resolution: selectedResolutionId,
                aspectRatio: selectedAspectId,
                backgroundColor: '#070A10',
                fps: 30.0,
                placements: currentPlacements,
                timeline: internalTimeline
            });
        }
        if (onUpdateCanvasLayoutTimeline && internalTimeline) {
            onUpdateCanvasLayoutTimeline(internalTimeline);
        }
    }, [currentPlacements, internalTimeline, onUpdateCanvasLayout, onUpdateCanvasLayoutTimeline, virtualW, virtualH, selectedResolutionId, selectedAspectId]);

    // Switch Resolution handler (scales placements proportionally to match new pixel density)
    const handleSelectResolution = useCallback((newResId) => {
        if (selectedResolutionId === newResId) return;
        const oldDims = computeCanvasDimensions(selectedResolutionId, selectedAspectId, customCanvasDims);
        const newDims = computeCanvasDimensions(newResId, selectedAspectId, customCanvasDims);
        setSelectedResolutionId(newResId);
        try {
            localStorage.setItem('itb_studio_canvas_resolution', newResId);
        } catch {
            // Ignore
        }

        const ratioX = newDims.w / oldDims.w;
        const ratioY = newDims.h / oldDims.h;
        const rescaled = currentPlacements.map(p => ({
            ...p,
            x: Math.round(p.x * ratioX),
            y: Math.round(p.y * ratioY),
            width: Math.max(40, Math.round(p.width * ratioX)),
            height: Math.max(30, Math.round(p.height * ratioY))
        }));
        updateActivePlacements(rescaled, `Resolution change to ${newResId}`);
        triggerToast(`Canvas Resolution: ${newResId} (${newDims.w}×${newDims.h})`, 'info', '📺');
    }, [selectedResolutionId, selectedAspectId, customCanvasDims, currentPlacements, updateActivePlacements, triggerToast]);

    // Apply Manual / Custom Resolution handler
    const handleApplyCustomResolution = useCallback(() => {
        const rawW = parseInt(customWidthInput, 10);
        const rawH = parseInt(customHeightInput, 10);

        if (isNaN(rawW) || isNaN(rawH)) {
            setCustomResError('Enter valid numbers');
            return;
        }
        if (rawW < 320 || rawW > 7680) {
            setCustomResError('Width: 320 - 7680px');
            return;
        }
        if (rawH < 180 || rawH > 4320) {
            setCustomResError('Height: 180 - 4320px');
            return;
        }

        setCustomResError(null);
        const sanitizedW = sanitizeEvenDimension(rawW, 320, 7680);
        const sanitizedH = sanitizeEvenDimension(rawH, 180, 4320);

        const oldDims = computeCanvasDimensions(selectedResolutionId, selectedAspectId, customCanvasDims);
        const newDims = { w: sanitizedW, h: sanitizedH };

        setCustomCanvasDims(newDims);
        setSelectedResolutionId(CUSTOM_RESOLUTION_ID);

        // Auto-detect and set corresponding aspect ratio
        const detectedAspect = getReadableAspectRatio(sanitizedW, sanitizedH);
        setSelectedAspectId(detectedAspect);

        try {
            localStorage.setItem('itb_studio_canvas_resolution', CUSTOM_RESOLUTION_ID);
            localStorage.setItem('itb_studio_canvas_custom_w', String(sanitizedW));
            localStorage.setItem('itb_studio_canvas_custom_h', String(sanitizedH));
            localStorage.setItem('itb_studio_canvas_aspect', detectedAspect);
        } catch {
            // Ignore
        }

        if (oldDims.w !== newDims.w || oldDims.h !== newDims.h) {
            const ratioX = newDims.w / oldDims.w;
            const ratioY = newDims.h / oldDims.h;
            const rescaled = currentPlacements.map(p => ({
                ...p,
                x: Math.round(p.x * ratioX),
                y: Math.round(p.y * ratioY),
                width: Math.max(40, Math.round(p.width * ratioX)),
                height: Math.max(30, Math.round(p.height * ratioY))
            }));
            updateActivePlacements(rescaled, `Custom resolution set to ${sanitizedW}×${sanitizedH}`);
        }

        setShowResolutionPopout(false);
        triggerToast(`Canvas Resolution: Custom (${sanitizedW}×${sanitizedH})`, 'info', '📺');
    }, [customWidthInput, customHeightInput, selectedResolutionId, selectedAspectId, customCanvasDims, currentPlacements, updateActivePlacements, triggerToast]);

    // Switch Aspect Ratio handler (re-packing or rescaling existing placements proportionally to fill the target aspect)
    const handleSelectAspectRatio = useCallback((newAspectId) => {
        if (selectedAspectId === newAspectId) return;
        const oldDims = computeCanvasDimensions(selectedResolutionId, selectedAspectId, customCanvasDims);
        let newDims;
        if (selectedResolutionId === CUSTOM_RESOLUTION_ID && customCanvasDims?.h) {
            const aspectObj = ASPECT_PRESETS.find(a => a.id === newAspectId);
            const ratio = aspectObj ? aspectObj.ratio : (parseAspectRatioString(newAspectId) || (16 / 9));
            const newW = sanitizeEvenDimension(Math.round(customCanvasDims.h * ratio), 320, 7680);
            newDims = { w: newW, h: customCanvasDims.h };
            setCustomCanvasDims(newDims);
            try {
                localStorage.setItem('itb_studio_canvas_custom_w', String(newDims.w));
                localStorage.setItem('itb_studio_canvas_custom_h', String(newDims.h));
            } catch {
                // Ignore
            }
        } else {
            newDims = computeCanvasDimensions(selectedResolutionId, newAspectId, customCanvasDims);
        }
        setSelectedAspectId(newAspectId);
        try {
            localStorage.setItem('itb_studio_canvas_aspect', newAspectId);
        } catch {
            // Ignore
        }

        if (!hasUserCustomizedRef.current) {
            const targetFeeds = defaultStationFeeds.length > 0 ? defaultStationFeeds : (currentPlacements && currentPlacements.length > 0 ? currentPlacements : availableFeeds);
            const autoPacked = generateAutoPackPlacements(targetFeeds, newDims.w, newDims.h);
            updateActivePlacements(autoPacked, `Aspect change to ${newAspectId}`);
        } else {
            const ratioX = newDims.w / oldDims.w;
            const ratioY = newDims.h / oldDims.h;
            const rescaled = currentPlacements.map(p => ({
                ...p,
                x: Math.round(p.x * ratioX),
                y: Math.round(p.y * ratioY),
                width: Math.max(40, Math.round(p.width * ratioX)),
                height: Math.max(30, Math.round(p.height * ratioY))
            }));
            updateActivePlacements(rescaled, `Aspect change to ${newAspectId}`);
        }
        triggerToast(`Canvas Aspect: ${newAspectId} (${newDims.w}×${newDims.h})`, 'info', '📐');
    }, [selectedAspectId, selectedResolutionId, customCanvasDims, defaultStationFeeds, currentPlacements, availableFeeds, updateActivePlacements, triggerToast]);

    // -------------------------------------------------------------
    // FEEDS PALETTE ACTIONS: ADD / REMOVE / CLEAR
    // -------------------------------------------------------------
    const handleAddFeedToCanvas = useCallback((f) => {
        const maxZ = currentPlacements.length > 0 ? Math.max(...currentPlacements.map(p => p.zIndex || 0)) + 1 : 0;
        const color = SLOT_BORDER_COLORS[currentPlacements.length % SLOT_BORDER_COLORS.length];

        const aspect = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 16 / 9);
        const initW = aspect >= 1 ? 640 : Math.round(360 * aspect);
        const initH = aspect >= 1 ? Math.round(640 / aspect) : 360;

        const newPlacement = {
            stationId: f.stationId,
            displayId: f.displayId,
            label: f.label,
            x: 100 + (currentPlacements.length * 40) % 800,
            y: 80 + (currentPlacements.length * 40) % 500,
            width: initW,
            height: initH,
            sourceWidth: f.sourceWidth || 1920,
            sourceHeight: f.sourceHeight || 1080,
            nativeAspectRatio: aspect,
            aspectRatio: aspect,
            zIndex: maxZ,
            rotation: 0,
            borderWidth: 2,
            borderColor: color,
            shadowEffect: 'deep',
            borderRadius: 0
        };

        const next = [...currentPlacements, newPlacement];
        updateActivePlacements(next);
        setSelectedFeedIndex(next.length - 1);
    }, [currentPlacements, updateActivePlacements]);

    const handleRemovePlacement = useCallback((idx) => {
        const next = currentPlacements.filter((_, i) => i !== idx);
        updateActivePlacements(next);
        setSelectedFeedIndex(prev => (next.length === 0 ? null : (prev !== null ? Math.min(prev, next.length - 1) : null)));
    }, [currentPlacements, updateActivePlacements]);

    const handleClearCanvas = useCallback(() => {
        updateActivePlacements([]);
        setSelectedFeedIndex(null);
    }, [updateActivePlacements]);

    // Helper to normalize placements to sequential 1-based ranks (1 = bottom, N = top)
    const normalizeLayers = (placements) => {
        const indexed = placements.map((p, origIdx) => ({ p, origIdx }));
        indexed.sort((a, b) => ((a.p.zIndex ?? a.origIdx) - (b.p.zIndex ?? b.origIdx)));
        const res = [...placements];
        indexed.forEach(({ origIdx }, rank) => {
            res[origIdx] = { ...res[origIdx], zIndex: rank + 1 };
        });
        return res;
    };

    // -------------------------------------------------------------
    // LAYER STACKING ACTIONS ("מי לפני מי" - מספור קדימות מוגדר ומדויק)
    // -------------------------------------------------------------
    const handleBringToFront = useCallback((idx = selectedFeedIndex) => {
        if (idx < 0 || !currentPlacements[idx]) return;
        const normalized = normalizeLayers(currentPlacements);
        const currentRank = normalized[idx].zIndex;
        const maxRank = normalized.length;
        if (currentRank >= maxRank) return;

        const next = normalized.map((p, i) => {
            if (i === idx) return { ...p, zIndex: maxRank };
            if (p.zIndex > currentRank) return { ...p, zIndex: p.zIndex - 1 };
            return p;
        });
        updateActivePlacements(next);
    }, [selectedFeedIndex, currentPlacements, updateActivePlacements]);

    const handleSendToBack = useCallback((idx = selectedFeedIndex) => {
        if (idx < 0 || !currentPlacements[idx]) return;
        const normalized = normalizeLayers(currentPlacements);
        const currentRank = normalized[idx].zIndex;
        if (currentRank <= 1) return;

        const next = normalized.map((p, i) => {
            if (i === idx) return { ...p, zIndex: 1 };
            if (p.zIndex < currentRank) return { ...p, zIndex: p.zIndex + 1 };
            return p;
        });
        updateActivePlacements(next);
    }, [selectedFeedIndex, currentPlacements, updateActivePlacements]);

    const handleBringForward = useCallback((idx = selectedFeedIndex) => {
        if (idx < 0 || !currentPlacements[idx]) return;
        const normalized = normalizeLayers(currentPlacements);
        const currentRank = normalized[idx].zIndex;
        const targetRank = currentRank + 1;
        if (targetRank > normalized.length) return;

        const next = normalized.map((p, i) => {
            if (i === idx) return { ...p, zIndex: targetRank };
            if (p.zIndex === targetRank) return { ...p, zIndex: currentRank };
            return p;
        });
        updateActivePlacements(next);
    }, [selectedFeedIndex, currentPlacements, updateActivePlacements]);

    const handleSendBackward = useCallback((idx = selectedFeedIndex) => {
        if (idx < 0 || !currentPlacements[idx]) return;
        const normalized = normalizeLayers(currentPlacements);
        const currentRank = normalized[idx].zIndex;
        const targetRank = currentRank - 1;
        if (targetRank < 1) return;

        const next = normalized.map((p, i) => {
            if (i === idx) return { ...p, zIndex: targetRank };
            if (p.zIndex === targetRank) return { ...p, zIndex: currentRank };
            return p;
        });
        updateActivePlacements(next);
    }, [selectedFeedIndex, currentPlacements, updateActivePlacements]);

    // -------------------------------------------------------------
    // STYLE UPDATES: BORDER, SHADOW, ROTATION, ROUNDING
    // -------------------------------------------------------------
    const handleUpdateSelectedStyle = useCallback((styleProps) => {
        if (selectedFeedIndex < 0 || !currentPlacements[selectedFeedIndex]) return;
        const next = currentPlacements.map((p, idx) => {
            if (idx === selectedFeedIndex) {
                return { ...p, ...styleProps };
            }
            return p;
        });
        updateActivePlacements(next);
    }, [selectedFeedIndex, currentPlacements, updateActivePlacements]);

    const handleUpdatePlacementLabel = useCallback((targetIndex, newLabel, shouldPushUndo = true) => {
        if (targetIndex < 0 || !currentPlacements[targetIndex]) return;
        const trimmed = typeof newLabel === 'string' ? newLabel.trim() : '';
        const labelValue = trimmed.length > 0 ? trimmed : null;
        if (currentPlacements[targetIndex].label === labelValue) return;

        const next = currentPlacements.map((p, idx) => {
            if (idx === targetIndex) {
                return { ...p, label: labelValue };
            }
            return p;
        });
        updateActivePlacements(next, shouldPushUndo ? 'Rename Screen Title' : null);
    }, [currentPlacements, updateActivePlacements]);

    const handleCommitTitle = useCallback((targetIndex) => {
        if (targetIndex < 0 || !currentPlacements[targetIndex]) {
            setEditingTitleIndex(null);
            return;
        }
        handleUpdatePlacementLabel(targetIndex, editingTitleValue, true);
        setEditingTitleIndex(null);
    }, [currentPlacements, editingTitleValue, handleUpdatePlacementLabel]);

    const handleRotateStep = useCallback((stepDeg = 90) => {
        const target = currentPlacements[selectedFeedIndex];
        if (!target) return;
        const currentRot = target.rotation || 0;
        const nextRot = (currentRot + stepDeg) % 360;
        handleUpdateSelectedStyle({ rotation: nextRot });
    }, [selectedFeedIndex, currentPlacements, handleUpdateSelectedStyle]);

    // Focus single placement to fill 100% of canvas (1x1 Focus Viewport)
    const handleFocus1x1 = useCallback((idx = selectedFeedIndex) => {
        if (idx < 0 || !currentPlacements[idx]) return;
        const maxRank = currentPlacements.length;
        const next = currentPlacements.map((p, i) => {
            if (i === idx) {
                return {
                    ...p,
                    x: 0,
                    y: 0,
                    width: virtualW,
                    height: virtualH,
                    zIndex: maxRank
                };
            }
            return p;
        });
        updateActivePlacements(next);
    }, [selectedFeedIndex, currentPlacements, updateActivePlacements, virtualW, virtualH]);

    // -------------------------------------------------------------
    // PRESET TEMPLATES
    // -------------------------------------------------------------
    const handleApplyPreset = useCallback((presetId) => {
        let newPlacements = [];
        // Strictly use selected station feeds (defaultStationFeeds / availableFeeds)
        const feeds = defaultStationFeeds.length > 0 ? defaultStationFeeds : (availableFeeds.length > 0 ? availableFeeds : currentPlacements);

        switch (presetId) {
            case 'auto':
            case 'auto-grid':
                newPlacements = generateAutoPackPlacements(feeds, virtualW, virtualH);
                break;
            case '1x1':
                if (feeds.length > 0) {
                    newPlacements = [{
                        ...feeds[0],
                        x: 0,
                        y: 0,
                        width: virtualW,
                        height: virtualH,
                        zIndex: 1,
                        rotation: 0,
                        borderWidth: 0,
                        borderColor: SLOT_BORDER_COLORS[0],
                        shadowEffect: 'none',
                        borderRadius: 0
                    }];
                }
                break;
            case '1x2':
                if (feeds.length >= 2) {
                    const halfW = Math.round(virtualW / 2);
                    newPlacements = feeds.slice(0, 2).map((f, idx) => {
                        const aspect = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 16 / 9);
                        const { x, y, width, height } = fitInCell(idx * halfW, 0, halfW, virtualH, aspect);
                        return {
                            ...f,
                            x,
                            y,
                            width,
                            height,
                            sourceWidth: f.sourceWidth || 1920,
                            sourceHeight: f.sourceHeight || 1080,
                            nativeAspectRatio: aspect,
                            aspectRatio: aspect,
                            zIndex: idx + 1,
                            rotation: 0,
                            borderWidth: 2,
                            borderColor: SLOT_BORDER_COLORS[idx % SLOT_BORDER_COLORS.length],
                            shadowEffect: 'deep',
                            borderRadius: 0
                        };
                    });
                } else {
                    newPlacements = generateAutoPackPlacements(feeds, virtualW, virtualH);
                }
                break;
            case '2x2': {
                const halfW = Math.round(virtualW / 2);
                const halfH = Math.round(virtualH / 2);
                newPlacements = feeds.slice(0, 4).map((f, idx) => ({
                    ...f,
                    x: (idx % 2) * halfW,
                    y: Math.floor(idx / 2) * halfH,
                    width: halfW,
                    height: halfH,
                    zIndex: idx,
                    rotation: 0,
                    borderWidth: 2,
                    borderColor: SLOT_BORDER_COLORS[idx % SLOT_BORDER_COLORS.length],
                    shadowEffect: 'deep',
                    borderRadius: 0
                }));
                break;
            }
            case '1+3-pip':
                if (feeds.length >= 2) {
                    newPlacements = [
                        { ...feeds[0], x: 0, y: 0, width: virtualW, height: virtualH, zIndex: 0, rotation: 0, borderWidth: 0, borderColor: SLOT_BORDER_COLORS[0], shadowEffect: 'none', borderRadius: 0 }
                    ];
                    const insets = feeds.slice(1, 4);
                    const insetW = Math.round(virtualW * 0.23);
                    const insetH = Math.round(insetW / (16 / 9));
                    insets.forEach((f, idx) => {
                        newPlacements.push({
                            ...f,
                            x: virtualW - insetW - 24,
                            y: 24 + idx * (insetH + 16),
                            width: insetW,
                            height: insetH,
                            zIndex: 10 + idx,
                            rotation: 0,
                            borderWidth: 3,
                            borderColor: SLOT_BORDER_COLORS[(idx + 1) % SLOT_BORDER_COLORS.length],
                            shadowEffect: 'glow-cyan',
                            borderRadius: 6
                        });
                    });
                }
                break;
            case 'hero-stacked':
                if (feeds.length >= 3) {
                    const heroW = Math.round(virtualW * 0.666);
                    const sideW = virtualW - heroW;
                    const sideH = Math.round(virtualH / 2);
                    newPlacements = [
                        { ...feeds[0], x: 0, y: 0, width: heroW, height: virtualH, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: SLOT_BORDER_COLORS[0], shadowEffect: 'deep', borderRadius: 0 },
                        { ...feeds[1], x: heroW, y: 0, width: sideW, height: sideH, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: SLOT_BORDER_COLORS[1], shadowEffect: 'deep', borderRadius: 0 },
                        { ...feeds[2], x: heroW, y: sideH, width: sideW, height: sideH, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: SLOT_BORDER_COLORS[2], shadowEffect: 'deep', borderRadius: 0 }
                    ];
                }
                break;
            case '3-grid':
                if (feeds.length >= 3) {
                    const isWide = (virtualW / virtualH) >= 2.5;
                    if (isWide) {
                        const thirdW = Math.round(virtualW / 3);
                        newPlacements = feeds.slice(0, 3).map((f, idx) => {
                            const aspect = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 16 / 9);
                            const { x, y, width, height } = fitInCell(idx * thirdW, 0, thirdW, virtualH, aspect);
                            return {
                                ...f,
                                x,
                                y,
                                width,
                                height,
                                sourceWidth: f.sourceWidth || 1920,
                                sourceHeight: f.sourceHeight || 1080,
                                nativeAspectRatio: aspect,
                                aspectRatio: aspect,
                                zIndex: idx,
                                rotation: 0,
                                borderWidth: 2,
                                borderColor: SLOT_BORDER_COLORS[idx % SLOT_BORDER_COLORS.length],
                                shadowEffect: 'deep',
                                borderRadius: 0
                            };
                        });
                    } else {
                        const halfW = Math.round(virtualW / 2);
                        const halfH = Math.round(virtualH / 2);
                        newPlacements = [
                            { ...feeds[0], x: 0, y: 0, width: halfW, height: halfH, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: SLOT_BORDER_COLORS[0], shadowEffect: 'deep', borderRadius: 0 },
                            { ...feeds[1], x: halfW, y: 0, width: halfW, height: halfH, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: SLOT_BORDER_COLORS[1], shadowEffect: 'deep', borderRadius: 0 },
                            { ...feeds[2], x: Math.round(halfW / 2), y: halfH, width: halfW, height: halfH, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: SLOT_BORDER_COLORS[2], shadowEffect: 'deep', borderRadius: 0 }
                        ];
                    }
                }
                break;
            default:
                break;
        }

        if (newPlacements.length > 0) {
            updateActivePlacements(newPlacements);
            setSelectedFeedIndex(0);
            if (presetId === 'auto' || presetId === 'auto-grid') {
                setSelectedPresetId('auto-grid');
            } else {
                setSelectedPresetId(presetId);
                hasUserCustomizedRef.current = true;
            }
        }
    }, [availableFeeds, currentPlacements, updateActivePlacements, virtualW, virtualH]);

    // -------------------------------------------------------------
    // CUSTOM PRESETS: SAVE & LOAD ("לשמור אותו ולטעון אותו")
    // -------------------------------------------------------------
    const handleSaveCurrentPreset = useCallback(() => {
        const name = presetNameInput.trim() || `Custom Layout ${savedPresets.length + 1}`;
        const newPreset = {
            id: `preset-${Date.now()}`,
            name,
            createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            dateStr: new Date().toLocaleDateString(),
            placements: JSON.parse(JSON.stringify(currentPlacements)),
            keyframes: JSON.parse(JSON.stringify(keyframes))
        };
        const next = [newPreset, ...savedPresets];
        persistSavedPresets(next);
        setPresetNameInput('');
        setShowSavePresetModal(false);
    }, [presetNameInput, savedPresets, currentPlacements, keyframes]);

    const handleLoadSavedPreset = useCallback((preset) => {
        if (!preset || !preset.placements) return;
        updateActivePlacements(preset.placements);
        setSelectedFeedIndex(0);
        setSelectedPresetId('custom');
        hasUserCustomizedRef.current = true;
        setShowPresetsMenu(false);
    }, [updateActivePlacements]);

    const handleDeleteSavedPreset = useCallback((presetId, e) => {
        e?.stopPropagation();
        const next = savedPresets.filter(p => p.id !== presetId);
        persistSavedPresets(next);
    }, [savedPresets]);

    // -------------------------------------------------------------
    // CANVAS FILE EXPORT & IMPORT (No raw JSON modal needed)
    // -------------------------------------------------------------
    const handleExportCanvasFile = useCallback(() => {
        const exportData = {
            version: '1.0',
            type: 'itb-canvas-layout',
            exportedAt: new Date().toISOString(),
            width: virtualW,
            height: virtualH,
            aspectRatio: selectedAspectId,
            placements: currentPlacements,
            timeline: internalTimeline
        };
        const jsonStr = JSON.stringify(exportData, null, 2);
        const blob = new window.Blob([jsonStr], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        const timeStr = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
        a.href = url;
        a.download = `canvas_layout_${timeStr}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, [currentPlacements, internalTimeline, virtualW, virtualH, selectedAspectId]);

    const handleImportCanvasFile = useCallback((e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new window.FileReader();
        reader.onload = (event) => {
            try {
                const parsed = JSON.parse(event.target.result);
                if (parsed.width && parsed.height) {
                    const match = ASPECT_PRESETS.find(p => p.w === parsed.width && p.h === parsed.height);
                    if (match) setSelectedAspectId(match.id);
                } else if (parsed.aspectRatio) {
                    const match = ASPECT_PRESETS.find(p => p.id === parsed.aspectRatio);
                    if (match) setSelectedAspectId(match.id);
                }

                let importedPlacements = null;
                if (Array.isArray(parsed)) {
                    importedPlacements = parsed;
                } else if (parsed.placements && Array.isArray(parsed.placements)) {
                    importedPlacements = parsed.placements;
                } else if (parsed.layout?.placements && Array.isArray(parsed.layout.placements)) {
                    importedPlacements = parsed.layout.placements;
                }

                if (importedPlacements && importedPlacements.length > 0) {
                    updateActivePlacements(importedPlacements);
                    setSelectedFeedIndex(0);
                    setSelectedPresetId('custom');
                    hasUserCustomizedRef.current = true;
                }
                if (parsed.timeline?.keyframes?.length > 0) {
                    setInternalTimeline(parsed.timeline);
                    if (onUpdateCanvasLayoutTimeline) onUpdateCanvasLayoutTimeline(parsed.timeline);
                }
            } catch (err) {
                console.error('Failed to parse imported canvas JSON:', err);
                alert(`Canvas Import Error: ${err.message}`);
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    }, [updateActivePlacements, onUpdateCanvasLayoutTimeline]);

    // -------------------------------------------------------------
    // DIRECT DRAG & RESIZE ENGINE (MODAL PARITY)
    // -------------------------------------------------------------
    const handleMouseDownBox = (e, index) => {
        if (e.button !== 0) return;
        e.stopPropagation();
        e.preventDefault();

        setSelectedFeedIndex(index);
        hasUserCustomizedRef.current = true;
        setSelectedPresetId('custom');

        const targetKfIdx = ensureKeyframeAtCurrentEpoch();

        const activeRef = workSurfaceRef.current || canvasFrameRef.current;
        if (!activeRef) return;
        const rect = activeRef.getBoundingClientRect();
        const p = currentPlacements[index];
        if (!p) return;

        preActionSnapshotRef.current = captureCurrentSnapshot('Move Feed');

        dragStateRef.current = {
            mode: 'drag',
            index,
            startX: e.clientX,
            startY: e.clientY,
            initialX: p.x,
            initialY: p.y,
            initialW: p.width,
            initialH: p.height,
            scaleX: virtualW / rect.width,
            scaleY: virtualH / rect.height,
            activeSnapZone: null
        };

        setIsDragging(true);

        const handleMouseMove = (moveEv) => {
            if (!dragStateRef.current || dragStateRef.current.mode !== 'drag') return;
            const ds = dragStateRef.current;
            const targetEl = workSurfaceRef.current || canvasFrameRef.current;
            if (!targetEl) return;
            const currentRect = targetEl.getBoundingClientRect();

            const dx = (moveEv.clientX - ds.startX) * ds.scaleX;
            const dy = (moveEv.clientY - ds.startY) * ds.scaleY;

            let newX = Math.round(ds.initialX + dx);
            let newY = Math.round(ds.initialY + dy);

            newX = clamp(newX, 0, virtualW - ds.initialW);
            newY = clamp(newY, 0, virtualH - ds.initialH);

            const isSnapActive = isSnappingEnabled && !moveEv.altKey;
            let activeZone = null;
            let vGuide = null;
            let hGuide = null;

            if (isSnapActive) {
                // 1. Windows Snap Assist (Aero Snap Edge Zones)
                const cursorRelX = moveEv.clientX - currentRect.left;
                const cursorRelY = moveEv.clientY - currentRect.top;
                const edgeMargin = 32; // px from outer edge
                const halfW = Math.round(virtualW / 2);
                const halfH = Math.round(virtualH / 2);

                if (cursorRelX <= edgeMargin) {
                    // Left edge detected
                    if (cursorRelY <= currentRect.height * 0.22) {
                        activeZone = { x: 0, y: 0, width: halfW, height: halfH, label: '◰ Top-Left Quarter' };
                    } else if (cursorRelY >= currentRect.height * 0.78) {
                        activeZone = { x: 0, y: halfH, width: halfW, height: halfH, label: '◱ Bottom-Left Quarter' };
                    } else {
                        activeZone = { x: 0, y: 0, width: halfW, height: virtualH, label: '◧ Left Half (50%)' };
                    }
                } else if (cursorRelX >= currentRect.width - edgeMargin) {
                    // Right edge detected
                    if (cursorRelY <= currentRect.height * 0.22) {
                        activeZone = { x: halfW, y: 0, width: halfW, height: halfH, label: '◲ Top-Right Quarter' };
                    } else if (cursorRelY >= currentRect.height * 0.78) {
                        activeZone = { x: halfW, y: halfH, width: halfW, height: halfH, label: '◳ Bottom-Right Quarter' };
                    } else {
                        activeZone = { x: halfW, y: 0, width: halfW, height: virtualH, label: '◨ Right Half (50%)' };
                    }
                } else if (cursorRelY <= edgeMargin && cursorRelX >= currentRect.width * 0.25 && cursorRelX <= currentRect.width * 0.75) {
                    // Top edge center -> Fullscreen Maximize
                    activeZone = { x: 0, y: 0, width: virtualW, height: virtualH, label: '🗖 Full Canvas Maximize' };
                }

                // 2. Magnetic Smart Guides (to canvas edges, center lines, and sibling windows)
                if (!activeZone) {
                    const SNAP_THRESHOLD = 18; // virtual pixels threshold
                    const otherPlacements = currentPlacements.filter((_, i) => i !== ds.index);

                    // Candidate X positions:
                    const candidateSnapX = [
                        { snapTo: 0, targetX: 0, guide: 0 },
                        { snapTo: virtualW, targetX: virtualW - ds.initialW, guide: 100 },
                        { snapTo: halfW, targetX: halfW - Math.round(ds.initialW / 2), guide: 50 }
                    ];

                    otherPlacements.forEach(op => {
                        // Align Left-to-Left
                        candidateSnapX.push({ snapTo: op.x, targetX: op.x, guide: (op.x / virtualW) * 100 });
                        // Align Right-to-Right
                        candidateSnapX.push({ snapTo: op.x + op.width, targetX: op.x + op.width - ds.initialW, guide: ((op.x + op.width) / virtualW) * 100 });
                        // Dock Left-to-Right
                        candidateSnapX.push({ snapTo: op.x + op.width, targetX: op.x + op.width, guide: ((op.x + op.width) / virtualW) * 100 });
                        // Dock Right-to-Left
                        candidateSnapX.push({ snapTo: op.x, targetX: op.x - ds.initialW, guide: (op.x / virtualW) * 100 });
                    });

                    let bestDiffX = SNAP_THRESHOLD;
                    candidateSnapX.forEach(cand => {
                        const diff = Math.abs(newX - cand.targetX);
                        if (diff < bestDiffX) {
                            bestDiffX = diff;
                            newX = cand.targetX;
                            vGuide = cand.guide;
                        }
                    });

                    // Candidate Y positions:
                    const candidateSnapY = [
                        { snapTo: 0, targetY: 0, guide: 0 },
                        { snapTo: virtualH, targetY: virtualH - ds.initialH, guide: 100 },
                        { snapTo: halfH, targetY: halfH - Math.round(ds.initialH / 2), guide: 50 }
                    ];

                    otherPlacements.forEach(op => {
                        // Align Top-to-Top
                        candidateSnapY.push({ snapTo: op.y, targetY: op.y, guide: (op.y / virtualH) * 100 });
                        // Align Bottom-to-Bottom
                        candidateSnapY.push({ snapTo: op.y + op.height, targetY: op.y + op.height - ds.initialH, guide: ((op.y + op.height) / virtualH) * 100 });
                        // Stack Below
                        candidateSnapY.push({ snapTo: op.y + op.height, targetY: op.y + op.height, guide: ((op.y + op.height) / virtualH) * 100 });
                        // Stack Above
                        candidateSnapY.push({ snapTo: op.y, targetY: op.y - ds.initialH, guide: (op.y / virtualH) * 100 });
                    });

                    let bestDiffY = SNAP_THRESHOLD;
                    candidateSnapY.forEach(cand => {
                        const diff = Math.abs(newY - cand.targetY);
                        if (diff < bestDiffY) {
                            bestDiffY = diff;
                            newY = cand.targetY;
                            hGuide = cand.guide;
                        }
                    });
                }
            }

            ds.activeSnapZone = activeZone;
            ds.latestX = newX;
            ds.latestY = newY;
            setSnapZonePreview(activeZone);
            setSnapGuides({ vertical: vGuide, horizontal: hGuide });

            setInternalTimeline(prev => {
                const nextKfs = [...(prev.keyframes || [])];
                const activeIdx = targetKfIdx < nextKfs.length ? targetKfIdx : safeActiveIdx;
                if (!nextKfs[activeIdx]) return prev;
                const placements = [...(nextKfs[activeIdx].layout.placements || [])];
                if (!placements[ds.index]) return prev;
                placements[ds.index] = { ...placements[ds.index], x: newX, y: newY };
                nextKfs[activeIdx] = {
                    ...nextKfs[activeIdx],
                    layout: { ...nextKfs[activeIdx].layout, placements }
                };
                return { ...prev, keyframes: nextKfs };
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setSnapGuides({ vertical: null, horizontal: null });

            if (dragStateRef.current?.activeSnapZone) {
                const zone = dragStateRef.current.activeSnapZone;
                const dsIdx = dragStateRef.current.index;
                setInternalTimeline(prev => {
                    const nextKfs = [...(prev.keyframes || [])];
                    const activeIdx = targetKfIdx < nextKfs.length ? targetKfIdx : safeActiveIdx;
                    if (!nextKfs[activeIdx]) return prev;
                    const placements = [...(nextKfs[activeIdx].layout.placements || [])];
                    if (!placements[dsIdx]) return prev;
                    placements[dsIdx] = {
                        ...placements[dsIdx],
                        x: zone.x,
                        y: zone.y,
                        width: zone.width,
                        height: zone.height
                    };
                    nextKfs[activeIdx] = {
                        ...nextKfs[activeIdx],
                        layout: { ...nextKfs[activeIdx].layout, placements }
                    };
                    return { ...prev, keyframes: nextKfs };
                });
            }

            if (dragStateRef.current) {
                const ds = dragStateRef.current;
                const initialX = ds.initialX;
                const initialY = ds.initialY;
                const finalX = ds.activeSnapZone ? ds.activeSnapZone.x : (ds.latestX ?? initialX);
                const finalY = ds.activeSnapZone ? ds.activeSnapZone.y : (ds.latestY ?? initialY);
                if (finalX !== initialX || finalY !== initialY) {
                    pushPreActionSnapshot();
                    if (onUpdateCanvasLayoutTimeline) {
                        setInternalTimeline(latest => {
                            onUpdateCanvasLayoutTimeline(latest);
                            return latest;
                        });
                    }
                } else {
                    preActionSnapshotRef.current = null;
                }
            }

            setSnapZonePreview(null);
            dragStateRef.current = null;
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDownResize = (e, index, corner = 'br') => {
        if (e.button !== 0) return;
        e.stopPropagation();
        e.preventDefault();

        setSelectedFeedIndex(index);
        hasUserCustomizedRef.current = true;
        setSelectedPresetId('custom');

        const targetKfIdx = ensureKeyframeAtCurrentEpoch();

        if (!canvasFrameRef.current) return;
        const rect = canvasFrameRef.current.getBoundingClientRect();
        const p = currentPlacements[index];
        if (!p) return;

        preActionSnapshotRef.current = captureCurrentSnapshot('Resize Feed');

        const matchedFeed = availableFeeds.find(f => f.stationId === p.stationId && f.displayId === p.displayId);
        const sourceWidth = p.sourceWidth || matchedFeed?.sourceWidth || 1920;
        const sourceHeight = p.sourceHeight || matchedFeed?.sourceHeight || 1080;
        const nativeAspectRatio = p.nativeAspectRatio || p.aspectRatio || (matchedFeed?.nativeAspectRatio) || (sourceWidth / sourceHeight) || (p.width / p.height) || (16 / 9);

        dragStateRef.current = {
            mode: 'resize',
            corner,
            index,
            startX: e.clientX,
            startY: e.clientY,
            initialX: p.x,
            initialY: p.y,
            initialW: p.width,
            initialH: p.height,
            sourceWidth,
            sourceHeight,
            nativeAspectRatio,
            scaleX: virtualW / rect.width,
            scaleY: virtualH / rect.height
        };

        setIsResizing(true);

        const handleMouseMove = (moveEv) => {
            if (!dragStateRef.current || dragStateRef.current.mode !== 'resize') return;
            const ds = dragStateRef.current;
            const dw = (moveEv.clientX - ds.startX) * ds.scaleX;
            const dh = (moveEv.clientY - ds.startY) * ds.scaleY;

            // User requirement: Resizing with CTRL (or Shift) maintains the recorded native aspect ratio!
            const isLockAspect = moveEv.ctrlKey || moveEv.shiftKey || moveEv.metaKey;
            const nativeRatio = ds.nativeAspectRatio > 0 ? ds.nativeAspectRatio : (ds.initialW / ds.initialH);

            let newX = ds.initialX;
            let newY = ds.initialY;
            let newW = ds.initialW;
            let newH = ds.initialH;

            if (ds.corner === 'br') {
                const maxW = virtualW - ds.initialX;
                const maxH = virtualH - ds.initialY;
                if (isLockAspect) {
                    let targetW = Math.max(160, Math.min(maxW, Math.round(ds.initialW + dw)));
                    let targetH = Math.round(targetW / nativeRatio);
                    if (targetH > maxH) {
                        targetH = maxH;
                        targetW = Math.round(targetH * nativeRatio);
                    }
                    if (targetH < 90) {
                        targetH = 90;
                        targetW = Math.round(targetH * nativeRatio);
                    }
                    newW = targetW;
                    newH = targetH;
                } else {
                    newW = clamp(Math.round(ds.initialW + dw), 160, maxW);
                    newH = clamp(Math.round(ds.initialH + dh), 90, maxH);
                }
            } else if (ds.corner === 'bl') {
                const maxW = ds.initialX + ds.initialW;
                const maxH = virtualH - ds.initialY;
                if (isLockAspect) {
                    let targetW = Math.max(160, Math.min(maxW, Math.round(ds.initialW - dw)));
                    let targetH = Math.round(targetW / nativeRatio);
                    if (targetH > maxH) {
                        targetH = maxH;
                        targetW = Math.round(targetH * nativeRatio);
                    }
                    if (targetH < 90) {
                        targetH = 90;
                        targetW = Math.round(targetH * nativeRatio);
                    }
                    newW = targetW;
                    newH = targetH;
                    newX = ds.initialX + ds.initialW - newW;
                } else {
                    newW = clamp(Math.round(ds.initialW - dw), 160, maxW);
                    newH = clamp(Math.round(ds.initialH + dh), 90, maxH);
                    newX = ds.initialX + ds.initialW - newW;
                }
            } else if (ds.corner === 'tr') {
                const maxW = virtualW - ds.initialX;
                const maxH = ds.initialY + ds.initialH;
                if (isLockAspect) {
                    let targetW = Math.max(160, Math.min(maxW, Math.round(ds.initialW + dw)));
                    let targetH = Math.round(targetW / nativeRatio);
                    if (targetH > maxH) {
                        targetH = maxH;
                        targetW = Math.round(targetH * nativeRatio);
                    }
                    if (targetH < 90) {
                        targetH = 90;
                        targetW = Math.round(targetH * nativeRatio);
                    }
                    newW = targetW;
                    newH = targetH;
                    newY = ds.initialY + ds.initialH - newH;
                } else {
                    newW = clamp(Math.round(ds.initialW + dw), 160, maxW);
                    newH = clamp(Math.round(ds.initialH - dh), 90, maxH);
                    newY = ds.initialY + ds.initialH - newH;
                }
            } else if (ds.corner === 'tl') {
                const maxW = ds.initialX + ds.initialW;
                const maxH = ds.initialY + ds.initialH;
                if (isLockAspect) {
                    let targetW = Math.max(160, Math.min(maxW, Math.round(ds.initialW - dw)));
                    let targetH = Math.round(targetW / nativeRatio);
                    if (targetH > maxH) {
                        targetH = maxH;
                        targetW = Math.round(targetH * nativeRatio);
                    }
                    if (targetH < 90) {
                        targetH = 90;
                        targetW = Math.round(targetH * nativeRatio);
                    }
                    newW = targetW;
                    newH = targetH;
                    newX = ds.initialX + ds.initialW - newW;
                    newY = ds.initialY + ds.initialH - newH;
                } else {
                    newW = clamp(Math.round(ds.initialW - dw), 160, maxW);
                    newH = clamp(Math.round(ds.initialH - dh), 90, maxH);
                    newX = ds.initialX + ds.initialW - newW;
                    newY = ds.initialY + ds.initialH - newH;
                }
            }

            setInternalTimeline(prev => {
                const nextKfs = [...(prev.keyframes || [])];
                const activeIdx = targetKfIdx < nextKfs.length ? targetKfIdx : safeActiveIdx;
                if (!nextKfs[activeIdx]) return prev;
                const placements = [...(nextKfs[activeIdx].layout.placements || [])];
                if (!placements[ds.index]) return prev;
                placements[ds.index] = {
                    ...placements[ds.index],
                    x: newX,
                    y: newY,
                    width: newW,
                    height: newH,
                    sourceWidth: ds.sourceWidth,
                    sourceHeight: ds.sourceHeight,
                    nativeAspectRatio: ds.nativeAspectRatio,
                    aspectRatio: ds.nativeAspectRatio
                };
                nextKfs[activeIdx] = {
                    ...nextKfs[activeIdx],
                    layout: { ...nextKfs[activeIdx].layout, placements }
                };
                return { ...prev, keyframes: nextKfs };
            });
        };

        const handleMouseUp = () => {
            if (dragStateRef.current) {
                const ds = dragStateRef.current;
                const finalW = ds.latestW ?? ds.initialW;
                const finalH = ds.latestH ?? ds.initialH;
                if (finalW !== ds.initialW || finalH !== ds.initialH) {
                    pushPreActionSnapshot();
                    if (onUpdateCanvasLayoutTimeline) {
                        setInternalTimeline(latest => {
                            onUpdateCanvasLayoutTimeline(latest);
                            return latest;
                        });
                    }
                } else {
                    preActionSnapshotRef.current = null;
                }
            }
            setIsResizing(false);
            dragStateRef.current = null;
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleSnapToNativeAspect = useCallback((index) => {
        const p = currentPlacements[index];
        if (!p) return;

        const matchedFeed = availableFeeds.find(f => f.stationId === p.stationId && f.displayId === p.displayId);
        const nativeRatio = p.nativeAspectRatio || p.aspectRatio || (matchedFeed?.nativeAspectRatio) || ((p.sourceWidth && p.sourceHeight) ? p.sourceWidth / p.sourceHeight : (16 / 9));

        let newW = p.width;
        let newH = Math.round(newW / nativeRatio);

        if (p.y + newH > virtualH) {
            newH = virtualH - p.y;
            newW = Math.round(newH * nativeRatio);
        }
        if (p.x + newW > virtualW) {
            newW = virtualW - p.x;
            newH = Math.round(newW / nativeRatio);
        }

        const next = currentPlacements.map((pl, idx) => {
            if (idx === index) {
                return {
                    ...pl,
                    width: Math.max(160, newW),
                    height: Math.max(90, newH),
                    sourceWidth: p.sourceWidth || matchedFeed?.sourceWidth || 1920,
                    sourceHeight: p.sourceHeight || matchedFeed?.sourceHeight || 1080,
                    nativeAspectRatio: nativeRatio,
                    aspectRatio: nativeRatio
                };
            }
            return pl;
        });
        updateActivePlacements(next, 'Snap Native Aspect');
    }, [currentPlacements, availableFeeds, updateActivePlacements]);

    // -------------------------------------------------------------
    // UNDO / REDO & QUICK-SAVE (CTRL+Z / CTRL+Y / CTRL+S PARITY)
    // -------------------------------------------------------------
    const handleUndo = useCallback(() => {
        if (undoStackRef.current.length === 0) return;

        const currentSnap = captureCurrentSnapshot('Redo State');
        redoStackRef.current.push(currentSnap);
        if (redoStackRef.current.length > 50) {
            redoStackRef.current.shift();
        }

        const prevSnap = undoStackRef.current.pop();
        if (!prevSnap) return;

        setInternalTimeline(prevSnap.timeline);
        if (onUpdateCanvasLayoutTimeline) onUpdateCanvasLayoutTimeline(prevSnap.timeline);
        if (prevSnap.resolutionId && prevSnap.resolutionId !== selectedResolutionId) {
            setSelectedResolutionId(prevSnap.resolutionId);
        }
        if (prevSnap.aspectId && prevSnap.aspectId !== selectedAspectId) {
            setSelectedAspectId(prevSnap.aspectId);
        }
        if (prevSnap.presetId) setSelectedPresetId(prevSnap.presetId);
        if (prevSnap.selectedFeedIndex !== undefined) setSelectedFeedIndex(prevSnap.selectedFeedIndex);

        hasUserCustomizedRef.current = true;
        setHistoryVersion(v => v + 1);
        triggerToast(`Undo: ${prevSnap.label || 'Previous State'}`, 'undo', '↺');
    }, [captureCurrentSnapshot, onUpdateCanvasLayoutTimeline, selectedAspectId, triggerToast]);

    const handleRedo = useCallback(() => {
        if (redoStackRef.current.length === 0) return;

        const currentSnap = captureCurrentSnapshot('Undo State');
        undoStackRef.current.push(currentSnap);
        if (undoStackRef.current.length > 50) {
            undoStackRef.current.shift();
        }

        const nextSnap = redoStackRef.current.pop();
        if (!nextSnap) return;

        setInternalTimeline(nextSnap.timeline);
        if (onUpdateCanvasLayoutTimeline) onUpdateCanvasLayoutTimeline(nextSnap.timeline);
        if (nextSnap.resolutionId && nextSnap.resolutionId !== selectedResolutionId) {
            setSelectedResolutionId(nextSnap.resolutionId);
        }
        if (nextSnap.aspectId && nextSnap.aspectId !== selectedAspectId) {
            setSelectedAspectId(nextSnap.aspectId);
        }
        if (nextSnap.presetId) setSelectedPresetId(nextSnap.presetId);
        if (nextSnap.selectedFeedIndex !== undefined) setSelectedFeedIndex(nextSnap.selectedFeedIndex);

        hasUserCustomizedRef.current = true;
        setHistoryVersion(v => v + 1);
        triggerToast(`Redo: ${nextSnap.label || 'Restored State'}`, 'info', '↻');
    }, [captureCurrentSnapshot, onUpdateCanvasLayoutTimeline, selectedAspectId, triggerToast]);

    const handleSaveState = useCallback(() => {
        const quickSavePreset = {
            id: 'preset-quicksave',
            name: `QuickSave (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })})`,
            createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            dateStr: new Date().toLocaleDateString(),
            placements: JSON.parse(JSON.stringify(currentPlacements)),
            keyframes: JSON.parse(JSON.stringify(keyframes)),
            aspectId: selectedAspectId,
            width: virtualW,
            height: virtualH
        };

        const nextPresets = [quickSavePreset, ...savedPresets.filter(p => p.id !== 'preset-quicksave')];
        persistSavedPresets(nextPresets);

        try {
            saveStudioSessionCache({
                canvasLayoutTimeline: internalTimeline,
                selectedAspectId,
                selectedPresetId,
                isFullWidth
            });
        } catch (e) {
            console.warn('[MulticamViewport] QuickSave session cache flush error:', e);
        }

        triggerToast(`State Saved (${virtualW}×${virtualH} • ${currentPlacements.length} Feeds)`, 'success', '💾');
    }, [currentPlacements, keyframes, selectedAspectId, virtualW, virtualH, savedPresets, persistSavedPresets, internalTimeline, selectedPresetId, isFullWidth, triggerToast]);

    // Hotkey Custom Event Listeners
    useEffect(() => {
        const onUndo = () => handleUndo();
        const onRedo = () => handleRedo();
        const onSave = () => handleSaveState();

        window.addEventListener('itb:studio-undo', onUndo);
        window.addEventListener('itb:studio-redo', onRedo);
        window.addEventListener('itb:studio-save-now', onSave);
        return () => {
            window.removeEventListener('itb:studio-undo', onUndo);
            window.removeEventListener('itb:studio-redo', onRedo);
            window.removeEventListener('itb:studio-save-now', onSave);
        };
    }, [handleUndo, handleRedo, handleSaveState]);

    // Fullscreen handling
    const handleToggleGridFullscreen = useCallback(() => {
        if (propOnToggleGridFullscreen) {
            propOnToggleGridFullscreen();
            return;
        }
        setInternalIsGridFullscreen(prev => {
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
    }, [propOnToggleGridFullscreen, onSelectActiveStation]);

    // Explicit Keyframe & Transition Action Handlers
    const handleExplicitAddKeyframe = useCallback(() => {
        const currentEpoch = playheadEpochMs > 0 ? playheadEpochMs : (baseEpochMs + playheadMs);
        const { nextTimeline, newIndex, isNew } = insertExplicitKeyframe(
            internalTimeline,
            currentEpoch,
            currentKf?.layout || {
                width: virtualW,
                height: virtualH,
                backgroundColor: '#070A10',
                fps: 30.0,
                placements: JSON.parse(JSON.stringify(currentPlacements))
            }
        );

        if (isNew) {
            pushUndoSnapshot('Add Keyframe');
            setInternalTimeline(nextTimeline);
            if (onUpdateCanvasLayoutTimeline) onUpdateCanvasLayoutTimeline(nextTimeline);
            if (setActiveKfIndex) setActiveKfIndex(newIndex);
            triggerToast(`Keyframe #${newIndex + 1} created at ${formatTimelineClock(currentEpoch, timeMode, { includeSeconds: true })}`, 'success', '💎');
        } else {
            if (setActiveKfIndex) setActiveKfIndex(newIndex);
            triggerToast(`Jumped to existing Keyframe #${newIndex + 1}`, 'info', '💎');
        }
    }, [playheadEpochMs, baseEpochMs, playheadMs, currentKf, currentPlacements, virtualW, virtualH, internalTimeline, onUpdateCanvasLayoutTimeline, setActiveKfIndex, timeMode, triggerToast, pushUndoSnapshot]);

    const handleDeleteActiveKeyframe = useCallback(() => {
        if (keyframes.length <= 1 || safeActiveIdx === 0) {
            triggerToast('Cannot delete the root keyframe (t=0)', 'warning', '⚠️');
            return;
        }
        pushUndoSnapshot('Delete Keyframe');
        const { nextTimeline, success, newIndex } = deleteKeyframe(internalTimeline, safeActiveIdx);
        if (success) {
            setInternalTimeline(nextTimeline);
            if (onUpdateCanvasLayoutTimeline) onUpdateCanvasLayoutTimeline(nextTimeline);
            if (setActiveKfIndex) setActiveKfIndex(newIndex);
            triggerToast('Keyframe deleted', 'info', '🗑️');
        }
    }, [keyframes, safeActiveIdx, internalTimeline, onUpdateCanvasLayoutTimeline, setActiveKfIndex, triggerToast, pushUndoSnapshot]);

    const handleUpdateTransitionType = useCallback((type) => {
        if (safeActiveIdx === 0) return;
        pushUndoSnapshot('Update Transition Type');
        setInternalTimeline(prev => {
            const nextTimeline = updateKeyframeTransition(prev, safeActiveIdx, { transitionType: type });
            if (onUpdateCanvasLayoutTimeline) onUpdateCanvasLayoutTimeline(nextTimeline);
            return nextTimeline;
        });
    }, [safeActiveIdx, onUpdateCanvasLayoutTimeline, pushUndoSnapshot]);

    const handleUpdateTransitionDuration = useCallback((durSec) => {
        if (safeActiveIdx === 0) return;
        pushUndoSnapshot('Update Transition Duration');
        setInternalTimeline(prev => {
            const nextTimeline = updateKeyframeTransition(prev, safeActiveIdx, { transitionDurationSec: durSec });
            if (onUpdateCanvasLayoutTimeline) onUpdateCanvasLayoutTimeline(nextTimeline);
            return nextTimeline;
        });
    }, [safeActiveIdx, onUpdateCanvasLayoutTimeline, pushUndoSnapshot]);

    // Keyboard shortcuts for tactical canvas editing
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
                return;
            }

            // Delete / Backspace: delete selected box
            if (e.key === 'Delete' || e.key === 'Backspace') {
                if (selectedFeedIndex >= 0 && currentPlacements[selectedFeedIndex]) {
                    e.preventDefault();
                    handleRemovePlacement(selectedFeedIndex);
                }
                return;
            }

            // Escape: close drawers / panels
            // Spacebar: Toggle Synchronized Canvas Playback
            if (e.code === 'Space' || e.key === ' ') {
                if (setIsPlaying) {
                    e.preventDefault();
                    setIsPlaying(p => !p);
                    return;
                }
            }

            // K key: Add Keyframe at playhead
            if (e.key === 'k' || e.key === 'K') {
                if (!e.ctrlKey && !e.metaKey && !e.altKey) {
                    e.preventDefault();
                    handleExplicitAddKeyframe();
                    return;
                }
            }

            if (e.key === 'Escape') {
                setShowFeedsDrawer(false);
                setShowPresetsMenu(false);
                setShowShadowControl(false);
                setShowRotationControl(false);
                setShowColorPicker(false);
                setShowSavePresetModal(false);
                setIsInspectorOpen(false);
                setSelectedFeedIndex(null);
                return;
            }

            // Arrow keys: nudge selected box
            if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                if (selectedFeedIndex >= 0 && currentPlacements[selectedFeedIndex]) {
                    e.preventDefault();
                    hasUserCustomizedRef.current = true;
                    setSelectedPresetId('custom');
                    const step = e.shiftKey ? 1 : 10;
                    let dx = 0;
                    let dy = 0;
                    if (e.key === 'ArrowLeft') dx = -step;
                    if (e.key === 'ArrowRight') dx = step;
                    if (e.key === 'ArrowUp') dy = -step;
                    if (e.key === 'ArrowDown') dy = step;

                    const target = currentPlacements[selectedFeedIndex];
                    const newX = clamp(target.x + dx, 0, virtualW - target.width);
                    const newY = clamp(target.y + dy, 0, virtualH - target.height);
                    const next = currentPlacements.map((p, idx) => {
                        if (idx === selectedFeedIndex) {
                            return { ...p, x: newX, y: newY };
                        }
                        return p;
                    });
                    updateActivePlacements(next);
                }
                return;
            }

            // R key: Toggle Precision CAD / NLE Rulers
            if (e.key === 'r' || e.key === 'R') {
                if (!e.ctrlKey && !e.metaKey && !e.altKey) {
                    e.preventDefault();
                    setShowRulers(p => !p);
                    return;
                }
            }

            // S key: Toggle Windows Snap & Magnetic Smart Guides
            if (e.key === 's' || e.key === 'S') {
                if (!e.ctrlKey && !e.metaKey && !e.altKey) {
                    e.preventDefault();
                    setIsSnappingEnabled(p => !p);
                    return;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedFeedIndex, currentPlacements, handleRemovePlacement, updateActivePlacements, setShowRulers, setIsSnappingEnabled]);

    // Interpolation for smooth playback transitions across keyframes
    const activeDisplayPlacements = useMemo(() => {
        return interpolateKeyframePlacements({
            keyframes,
            currentEpochMs,
            currentPlacements,
            isEditing: isDragging || isResizing
        });
    }, [isDragging, isResizing, keyframes, currentEpochMs, currentPlacements]);

    // Sorted placements for rendering (lowest zIndex in back)
    const sortedRenderPlacements = useMemo(() => {
        return activeDisplayPlacements.map((p, originalIndex) => ({ ...p, originalIndex }))
            .sort((a, b) => ((a.zIndex ?? a.originalIndex) - (b.zIndex ?? b.originalIndex)));
    }, [activeDisplayPlacements]);

    // Dynamic hardware video decoder allocations & quality profiling to protect browser & server
    const decoderAllocations = useMemo(() => {
        return computeDecoderAllocations(currentPlacements, {
            maxConcurrentDecoders: MAX_CONCURRENT_CANVAS_DECODERS,
            activeAudioStationId,
            selectedFeedIndex
        });
    }, [currentPlacements, activeAudioStationId, selectedFeedIndex]);

    const selectedPlacement = currentPlacements[selectedFeedIndex] || null;

    // Unified Feeds & Layers items list:
    // Placed feeds: Sorted with the currently SELECTED feed at the very top!
    // Remaining placed feeds are ordered by layer rank descending (top layer to bottom layer).
    // Unplaced feeds: Feeds available in the system not yet on canvas.
    const { filteredPlaced, filteredUnplaced } = useMemo(() => {
        const q = (feedSearchQuery || '').toLowerCase();

        const placed = currentPlacements.map((p, origIdx) => {
            const layerRank = p.zIndex ?? (origIdx + 1);
            const matchedFeed = availableFeeds.find(f => f.stationId === p.stationId && f.displayId === p.displayId);
            return {
                type: 'placed',
                origIdx,
                placement: p,
                feed: matchedFeed,
                stationId: p.stationId,
                displayId: p.displayId,
                label: p.label || matchedFeed?.label || `${p.stationId} (${p.displayId})`,
                layerRank,
                isSelected: origIdx === selectedFeedIndex,
                sourceWidth: p.sourceWidth || matchedFeed?.sourceWidth || 1920,
                sourceHeight: p.sourceHeight || matchedFeed?.sourceHeight || 1080
            };
        });

        // Sort placed strictly by layerRank descending (Top Layer #N at top, Bottom Layer #1 at bottom)
        placed.sort((a, b) => b.layerRank - a.layerRank);

        const unplaced = availableFeeds
            .filter(f => !currentPlacements.some(p => p.stationId === f.stationId && p.displayId === f.displayId))
            .map(f => ({
                type: 'unplaced',
                feed: f,
                stationId: f.stationId,
                displayId: f.displayId,
                label: f.label,
                layerRank: null,
                isSelected: false,
                sourceWidth: f.sourceWidth || 1920,
                sourceHeight: f.sourceHeight || 1080
            }));

        const filteredP = q ? placed.filter(item => item.label.toLowerCase().includes(q)) : placed;
        const filteredU = q ? unplaced.filter(item => item.label.toLowerCase().includes(q)) : unplaced;

        return { filteredPlaced: filteredP, filteredUnplaced: filteredU };
    }, [currentPlacements, availableFeeds, selectedFeedIndex, feedSearchQuery]);

    // -------------------------------------------------------------
    // FEEDS & LAYERS DRAWER DRAG & DROP REORDERING ENGINE
    // -------------------------------------------------------------
    const handleRowDragStart = useCallback((e, item) => {
        e.stopPropagation();
        setDraggedDrawerItem(item);
        e.dataTransfer.effectAllowed = 'copyMove';
        e.dataTransfer.setData('text/plain', JSON.stringify({
            origIdx: item.origIdx,
            type: item.type,
            stationId: item.stationId,
            displayId: item.displayId
        }));
    }, []);

    const handleRowDragOver = useCallback((e, index) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'move';
        const rect = e.currentTarget.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        const position = e.clientY < midY ? 'above' : 'below';
        setDrawerDragOverState(prev => {
            if (prev.index === index && prev.position === position) return prev;
            return { index, position };
        });
    }, []);

    const handleRowDragLeave = useCallback((e, index) => {
        e.stopPropagation();
        setDrawerDragOverState(prev => {
            if (prev.index === index) {
                return { index: null, position: null };
            }
            return prev;
        });
    }, []);

    const handleRowDragEnd = useCallback(() => {
        setDraggedDrawerItem(null);
        setDrawerDragOverState({ index: null, position: null });
    }, []);

    const handleRowDrop = useCallback((e, targetIndex) => {
        e.preventDefault();
        e.stopPropagation();
        const state = drawerDragOverState;
        setDrawerDragOverState({ index: null, position: null });
        setDraggedDrawerItem(null);

        const dataStr = e.dataTransfer.getData('text/plain');
        if (!dataStr) return;

        try {
            const data = JSON.parse(dataStr);
            if (data.type === 'placed') {
                const sourceOrigIdx = data.origIdx;
                const sourceListIndex = filteredPlaced.findIndex(item => item.origIdx === sourceOrigIdx);
                if (sourceListIndex === -1) return;

                let insertIndex = targetIndex;
                if (state.position === 'below') {
                    insertIndex += 1;
                }
                if (sourceListIndex < insertIndex) {
                    insertIndex -= 1;
                }

                if (sourceListIndex === insertIndex) return;

                const reordered = [...filteredPlaced];
                const [moved] = reordered.splice(sourceListIndex, 1);
                reordered.splice(insertIndex, 0, moved);

                // Re-rank sequentially: Index 0 gets highest rank N, bottom gets 1
                const N = reordered.length;
                const nextPlacements = currentPlacements.map((p, pIdx) => {
                    const pos = reordered.findIndex(item => item.origIdx === pIdx);
                    if (pos !== -1) {
                        return {
                            ...p,
                            zIndex: N - pos
                        };
                    }
                    return p;
                });
                updateActivePlacements(nextPlacements);
                setSelectedFeedIndex(moved.origIdx);
            } else if (data.type === 'unplaced') {
                const feed = availableFeeds.find(f => f.stationId === data.stationId && f.displayId === data.displayId);
                if (!feed) return;

                const aspect = feed.nativeAspectRatio || (feed.sourceWidth && feed.sourceHeight ? feed.sourceWidth / feed.sourceHeight : 16 / 9);
                const initW = aspect >= 1 ? 640 : Math.round(360 * aspect);
                const initH = aspect >= 1 ? Math.round(640 / aspect) : 360;
                const color = SLOT_BORDER_COLORS[currentPlacements.length % SLOT_BORDER_COLORS.length];

                let insertIndex = targetIndex;
                if (state.position === 'below') {
                    insertIndex += 1;
                }

                const newPlacement = {
                    stationId: feed.stationId,
                    displayId: feed.displayId,
                    label: feed.label,
                    x: 100 + (currentPlacements.length * 40) % 800,
                    y: 80 + (currentPlacements.length * 40) % 500,
                    width: initW,
                    height: initH,
                    sourceWidth: feed.sourceWidth || 1920,
                    sourceHeight: feed.sourceHeight || 1080,
                    nativeAspectRatio: aspect,
                    aspectRatio: aspect,
                    zIndex: 1,
                    rotation: 0,
                    borderWidth: 2,
                    borderColor: color,
                    shadowEffect: 'deep',
                    borderRadius: 0
                };

                const next = [...currentPlacements, newPlacement];
                const newOrigIdx = next.length - 1;

                const reordered = [...filteredPlaced];
                reordered.splice(insertIndex, 0, { origIdx: newOrigIdx });

                const N = reordered.length;
                const finalizedPlacements = next.map((p, pIdx) => {
                    const pos = reordered.findIndex(item => item.origIdx === pIdx);
                    return {
                        ...p,
                        zIndex: pos !== -1 ? N - pos : 1
                    };
                });

                updateActivePlacements(finalizedPlacements);
                setSelectedFeedIndex(newOrigIdx);
            }
        } catch (err) {
            console.warn('Failed to handle layer drag drop:', err);
        }
    }, [drawerDragOverState, filteredPlaced, currentPlacements, availableFeeds, updateActivePlacements]);

    const handleCanvasDrop = useCallback((e) => {
        e.preventDefault();
        const dataStr = e.dataTransfer.getData('text/plain');
        if (!dataStr || !canvasFrameRef.current) return;
        try {
            const data = JSON.parse(dataStr);
            const rect = canvasFrameRef.current.getBoundingClientRect();
            const dropClientX = e.clientX - rect.left;
            const dropClientY = e.clientY - rect.top;
            const canvasX = clamp(Math.round((dropClientX / rect.width) * virtualW), 0, virtualW - 320);
            const canvasY = clamp(Math.round((dropClientY / rect.height) * virtualH), 0, virtualH - 180);

            if (data.type === 'unplaced') {
                const feed = availableFeeds.find(f => f.stationId === data.stationId && f.displayId === data.displayId);
                if (feed) {
                    const aspect = feed.nativeAspectRatio || (feed.sourceWidth && feed.sourceHeight ? feed.sourceWidth / feed.sourceHeight : 16 / 9);
                    const initW = aspect >= 1 ? 640 : Math.round(360 * aspect);
                    const initH = aspect >= 1 ? Math.round(640 / aspect) : 360;
                    const maxZ = currentPlacements.length > 0 ? Math.max(...currentPlacements.map(p => p.zIndex || 0)) + 1 : 1;
                    const color = SLOT_BORDER_COLORS[currentPlacements.length % SLOT_BORDER_COLORS.length];

                    const newPlacement = {
                        stationId: feed.stationId,
                        displayId: feed.displayId,
                        label: feed.label,
                        x: clamp(canvasX, 0, virtualW - initW),
                        y: clamp(canvasY, 0, virtualH - initH),
                        width: initW,
                        height: initH,
                        sourceWidth: feed.sourceWidth || 1920,
                        sourceHeight: feed.sourceHeight || 1080,
                        nativeAspectRatio: aspect,
                        aspectRatio: aspect,
                        zIndex: maxZ,
                        rotation: 0,
                        borderWidth: 2,
                        borderColor: color,
                        shadowEffect: 'deep',
                        borderRadius: 0
                    };
                    const next = [...currentPlacements, newPlacement];
                    updateActivePlacements(next);
                    setSelectedFeedIndex(next.length - 1);
                }
            } else if (data.type === 'placed' && data.origIdx !== undefined) {
                const next = currentPlacements.map((p, idx) => {
                    if (idx === data.origIdx) {
                        return {
                            ...p,
                            x: clamp(canvasX, 0, virtualW - p.width),
                            y: clamp(canvasY, 0, virtualH - p.height)
                        };
                    }
                    return p;
                });
                updateActivePlacements(next);
                setSelectedFeedIndex(data.origIdx);
            }
        } catch (err) {
            console.warn('Canvas drop failed:', err);
        }
    }, [availableFeeds, currentPlacements, updateActivePlacements, virtualW, virtualH]);

    return (
        <div
            ref={viewportRootRef}
            className={`multicam-viewport-root canvas-grid ${isGridFullscreen ? 'fullscreen-grid-active' : ''}`}
        >
            {/* Global Transparent Drag Shield */}
            {(isDragging || isResizing) && (
                <div
                    className="canvas-global-drag-shield"
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 999999,
                        cursor: isDragging ? 'grabbing' : 'nwse-resize',
                        userSelect: 'none'
                    }}
                />
            )}

            {/* Tactical Action Toast */}
            {toastMessage && (
                <div className={`canvas-action-toast ${toastMessage.type}`}>
                    <span className="toast-icon">{toastMessage.icon}</span>
                    <span className="toast-text">{toastMessage.text}</span>
                </div>
            )}

            {/* Master Canvas Editing Arena */}
            <div className="canvas-editing-arena">
                {/* Left Wing Dock: Composition Tools */}
                

                {/* Center Canvas Stage */}
                <div
                    ref={stageWrapperRef}
                    className={`canvas-stage-wrapper ${isFullWidth ? 'is-full-width-mode' : 'is-fit-stage-mode'}`}
                    onClick={(e) => {
                        if (e.target === stageWrapperRef.current || e.target?.classList?.contains('canvas-stage-wrapper')) {
                            setSelectedFeedIndex(null);
                            setIsInspectorOpen(false);
                        }
                    }}
                >
                    {/* Unified Minimalist Feeds & Layers Drawer */}
                    {showFeedsDrawer && (
                        <div className="canvas-side-drawer feeds-layers-drawer">
                            <div className="drawer-header">
                                <div className="header-title-group">
                                    <span className="header-icon">🗂️</span>
                                    <span>FEEDS & LAYERS</span>
                                    <span className="header-count-pill">{currentPlacements.length} on canvas</span>
                                </div>
                                <button type="button" className="btn-close-drawer" onClick={() => setShowFeedsDrawer(false)}>✕</button>
                            </div>
                            <div className="drawer-search">
                                <input
                                    type="text"
                                    placeholder="Filter workstations / displays..."
                                    value={feedSearchQuery}
                                    onChange={(e) => setFeedSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="drawer-list-scroll">
                                {/* 1. Placed Feeds (Canvas Layers) - Selected item is always pinned at the top! */}
                                {filteredPlaced.length > 0 && (
                                    <div className="drawer-section">
                                        <div className="drawer-section-title">
                                            <span>CANVAS LAYERS</span>
                                            <span className="section-count">{filteredPlaced.length}</span>
                                        </div>
                                        {filteredPlaced.map((item, listIdx) => {
                                            const isThisDragged = draggedDrawerItem && draggedDrawerItem.type === 'placed' && draggedDrawerItem.origIdx === item.origIdx;
                                            const isOverThis = drawerDragOverState.index === listIdx;
                                            const dropClass = isOverThis ? (drawerDragOverState.position === 'above' ? 'drop-above' : 'drop-below') : '';

                                            return (
                                                <div
                                                    key={`feed-layer-${item.stationId}-${item.displayId}-${item.origIdx}`}
                                                    className={`feed-layer-row ${item.isSelected ? 'is-selected' : ''} ${isThisDragged ? 'is-dragging-row' : ''} ${dropClass}`}
                                                    draggable
                                                    onDragStart={(e) => handleRowDragStart(e, item)}
                                                    onDragOver={(e) => handleRowDragOver(e, listIdx)}
                                                    onDragLeave={(e) => handleRowDragLeave(e, listIdx)}
                                                    onDrop={(e) => handleRowDrop(e, listIdx)}
                                                    onDragEnd={handleRowDragEnd}
                                                    onClick={() => setSelectedFeedIndex(item.origIdx)}
                                                    title={`Drag to reorder layer (${item.label})`}
                                                >
                                                    <span className="drag-handle-grip" title="Drag to reorder layer order">⠿</span>
                                                    <span className="layer-rank-badge" title={`Layer Priority: #${item.layerRank}`}>
                                                        #{item.layerRank}
                                                    </span>
                                                    <span className={`status-dot ${item.isSelected ? 'active' : ''}`} />
                                                    <span className="row-label" title={item.label}>
                                                        {item.label}
                                                    </span>
                                                    <span className="row-res">
                                                        {item.sourceWidth}×{item.sourceHeight}
                                                    </span>
                                                    <div className="row-actions" onClick={(e) => e.stopPropagation()}>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleBringForward(item.origIdx)}
                                                            title="Bring Forward (Layer +1)"
                                                        >
                                                            ⬆️
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleSendBackward(item.origIdx)}
                                                            title="Send Backward (Layer -1)"
                                                        >
                                                            ⬇️
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn-remove-row"
                                                            onClick={() => handleRemovePlacement(item.origIdx)}
                                                            title="Remove from canvas"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* 2. Unplaced Available Feeds */}
                                {filteredUnplaced.length > 0 && (
                                    <div className="drawer-section">
                                        <div className="drawer-section-title">
                                            <span>AVAILABLE FEEDS</span>
                                            <span className="section-count">{filteredUnplaced.length}</span>
                                        </div>
                                        {filteredUnplaced.map((item) => {
                                            const isThisDragged = draggedDrawerItem && draggedDrawerItem.type === 'unplaced' && draggedDrawerItem.stationId === item.stationId && draggedDrawerItem.displayId === item.displayId;

                                            return (
                                                <div
                                                    key={`unplaced-feed-${item.stationId}-${item.displayId}`}
                                                    className={`feed-layer-row unplaced ${isThisDragged ? 'is-dragging-row' : ''}`}
                                                    draggable
                                                    onDragStart={(e) => handleRowDragStart(e, item)}
                                                    onDragEnd={handleRowDragEnd}
                                                    onClick={() => handleAddFeedToCanvas(item.feed)}
                                                    title={`Drag onto canvas or layers, or click to add ${item.label}`}
                                                >
                                                    <span className="drag-handle-grip" title="Drag onto canvas or layers">⠿</span>
                                                    <span className="layer-rank-badge unplaced">＋</span>
                                                    <span className="status-dot unplaced" />
                                                    <span className="row-label" title={item.label}>
                                                        {item.label}
                                                    </span>
                                                    <span className="row-res">
                                                        {item.sourceWidth}×{item.sourceHeight}
                                                    </span>
                                                    <div className="row-actions" onClick={(e) => e.stopPropagation()}>
                                                        <button
                                                            type="button"
                                                            className="btn-add-row"
                                                            onClick={() => handleAddFeedToCanvas(item.feed)}
                                                            title="Add to canvas"
                                                        >
                                                            ＋ ADD
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {filteredPlaced.length === 0 && filteredUnplaced.length === 0 && (
                                    <div className="drawer-empty-search">
                                        No matching workstation feeds found.
                                    </div>
                                )}
                            </div>
                            <div className="drawer-footer-actions">
                                <button type="button" className="btn-drawer-action auto" onClick={() => handleApplyPreset('auto')}>
                                    ⊞ ADD ALL FEEDS
                                </button>
                                <button type="button" className="btn-drawer-action clear" onClick={handleClearCanvas}>
                                    🗑️ CLEAR CANVAS
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="canvas-stage-assembly">
                        <aside className="canvas-left-wing-dock">
                    <button
                        type="button"
                        className={`btn-wing-tool ${showFeedsDrawer ? 'active' : ''}`}
                        onClick={() => setShowFeedsDrawer(p => !p)}
                        title={`Feeds & Layers Palette (${currentPlacements.length}/${availableFeeds.length} on canvas)`}
                    >
                        <span className="tool-icon">🗂️</span>
                        <span className="tool-badge">{currentPlacements.length}</span>
                        <span className="tool-label">FEEDS</span>
                    </button>

                    <div className="wing-divider" />

                    {/* Layout Presets Popout Trigger */}
                    <div className="wing-popout-wrapper">
                        <button
                            type="button"
                            className={`btn-wing-tool ${showLayoutPresetsPopout ? 'active' : ''}`}
                            onClick={() => {
                                setShowLayoutPresetsPopout(p => !p);
                                setShowAspectPopout(false);
                            }}
                            title="Canvas Layout Presets (Auto-Grid, 1x1, 1x2, 2x2, PIP, Hero)"
                        >
                            <span className="tool-icon">⊞</span>
                            <span className="tool-label">GRID</span>
                        </button>

                        {showLayoutPresetsPopout && (
                            <div className="wing-floating-popout left-side-popout">
                                <div className="popout-title">LAYOUT PRESETS</div>
                                <button
                                    type="button"
                                    className={`popout-item ${selectedPresetId === 'auto-grid' ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedPresetId('auto-grid');
                                        handleApplyPreset('auto-grid');
                                        setShowLayoutPresetsPopout(false);
                                    }}
                                >
                                    <span>⊞ AUTO-GRID</span>
                                    <span className="item-badge">{(() => {
                                        const activeTimelineIds = new Set((timelineStations && timelineStations.length > 0 ? timelineStations : allStations).map(s => s.id));
                                        const activeCurrentPlacements = (currentPlacements || []).filter(p => activeTimelineIds.has(p.stationId));
                                        const stationsWithNoPlacement = (timelineStations && timelineStations.length > 0 ? timelineStations : allStations)
                                            .filter(st => !activeCurrentPlacements.some(p => p.stationId === st.id));
                                        return activeCurrentPlacements.length > 0 ? activeCurrentPlacements.length + stationsWithNoPlacement.length : defaultStationFeeds.length;
                                    })()}</span>
                                </button>
                                <button
                                    type="button"
                                    className={`popout-item ${selectedPresetId === '1x1' ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedPresetId('1x1');
                                        handleApplyPreset('1x1');
                                        setShowLayoutPresetsPopout(false);
                                    }}
                                >
                                    <span>⊞ 1x1 FOCUS</span>
                                </button>
                                <button
                                    type="button"
                                    className={`popout-item ${selectedPresetId === '1x2' ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedPresetId('1x2');
                                        handleApplyPreset('1x2');
                                        setShowLayoutPresetsPopout(false);
                                    }}
                                >
                                    <span>⊞ 1x2 DUAL</span>
                                </button>
                                <button
                                    type="button"
                                    className={`popout-item ${selectedPresetId === '2x2' ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedPresetId('2x2');
                                        handleApplyPreset('2x2');
                                        setShowLayoutPresetsPopout(false);
                                    }}
                                >
                                    <span>⊞ 2x2 QUAD</span>
                                </button>
                                <button
                                    type="button"
                                    className={`popout-item ${selectedPresetId === '1+3-pip' ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedPresetId('1+3-pip');
                                        handleApplyPreset('1+3-pip');
                                        setShowLayoutPresetsPopout(false);
                                    }}
                                >
                                    <span>⊞ 1+3 PIP</span>
                                </button>
                                <button
                                    type="button"
                                    className={`popout-item ${selectedPresetId === 'hero-stacked' ? 'active' : ''}`}
                                    onClick={() => {
                                        setSelectedPresetId('hero-stacked');
                                        handleApplyPreset('hero-stacked');
                                        setShowLayoutPresetsPopout(false);
                                    }}
                                >
                                    <span>⊞ HERO+2</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Canvas Resolution Popout Trigger */}
                    <div className="wing-popout-wrapper">
                        <button
                            type="button"
                            className={`btn-wing-tool ${showResolutionPopout ? 'active' : ''}`}
                            onClick={() => {
                                setShowResolutionPopout(p => !p);
                                setShowAspectPopout(false);
                                setShowLayoutPresetsPopout(false);
                            }}
                            title={`Canvas Resolution: ${selectedResolutionId === CUSTOM_RESOLUTION_ID ? `Custom (${virtualW}×${virtualH}px)` : selectedResolutionId} (${virtualW}×${virtualH}px) - Click to change`}
                        >
                            <span className="tool-icon">📺</span>
                            <span className="tool-label" style={selectedResolutionId === CUSTOM_RESOLUTION_ID ? { fontSize: '7px' } : undefined}>
                                {selectedResolutionId === CUSTOM_RESOLUTION_ID ? 'CUSTOM' : selectedResolutionId}
                            </span>
                        </button>

                        {showResolutionPopout && (
                            <div className="wing-floating-popout left-side-popout resolution-popout">
                                <div className="popout-title">CANVAS RESOLUTION</div>
                                {RESOLUTION_PRESETS.map(res => {
                                    const dims = computeCanvasDimensions(res.id, selectedAspectId, customCanvasDims);
                                    return (
                                        <button
                                            key={res.id}
                                            type="button"
                                            className={`popout-item ${selectedResolutionId === res.id ? 'active' : ''}`}
                                            onClick={() => {
                                                handleSelectResolution(res.id);
                                                setShowResolutionPopout(false);
                                            }}
                                        >
                                            <span>{res.label}</span>
                                            <span className="dimmed-size">{dims.w}×{dims.h}</span>
                                        </button>
                                    );
                                })}

                                <div className="popout-divider" />

                                <div className="custom-res-container">
                                    <div className="custom-res-header">
                                        <span>MANUAL / CUSTOM</span>
                                        {selectedResolutionId === CUSTOM_RESOLUTION_ID && (
                                            <span className="custom-active-tag">ACTIVE</span>
                                        )}
                                    </div>
                                    <div className="custom-res-inputs-row">
                                        <div className="custom-dim-field">
                                            <span className="field-lbl">W</span>
                                            <input
                                                type="number"
                                                className="custom-dim-input"
                                                min="320"
                                                max="7680"
                                                step="2"
                                                value={customWidthInput}
                                                onChange={(e) => setCustomWidthInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') handleApplyCustomResolution();
                                                }}
                                                placeholder="Width"
                                                title="Width in pixels (320-7680, even)"
                                            />
                                        </div>
                                        <span className="dim-times">×</span>
                                        <div className="custom-dim-field">
                                            <span className="field-lbl">H</span>
                                            <input
                                                type="number"
                                                className="custom-dim-input"
                                                min="180"
                                                max="4320"
                                                step="2"
                                                value={customHeightInput}
                                                onChange={(e) => setCustomHeightInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') handleApplyCustomResolution();
                                                }}
                                                placeholder="Height"
                                                title="Height in pixels (180-4320, even)"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className="btn-apply-custom-res"
                                            onClick={handleApplyCustomResolution}
                                            title="Apply custom resolution"
                                        >
                                            SET
                                        </button>
                                    </div>
                                    {customResError && (
                                        <div className="custom-res-error-msg">{customResError}</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Aspect Ratio Popout Trigger */}
                    <div className="wing-popout-wrapper">
                        <button
                            type="button"
                            className={`btn-wing-tool ${showAspectPopout ? 'active' : ''}`}
                            onClick={() => {
                                setShowAspectPopout(p => !p);
                                setShowResolutionPopout(false);
                                setShowLayoutPresetsPopout(false);
                            }}
                            title={`Aspect Ratio: ${selectedAspectId} (${virtualW}×${virtualH}px) - Click to change`}
                        >
                            <span className="tool-icon">📐</span>
                            <span className="tool-label">{selectedAspectId}</span>
                        </button>

                        {showAspectPopout && (
                            <div className="wing-floating-popout left-side-popout">
                                <div className="popout-title">CANVAS ASPECT</div>
                                {ASPECT_PRESETS.map(ap => {
                                    const dims = computeCanvasDimensions(selectedResolutionId, ap.id);
                                    return (
                                        <button
                                            key={ap.id}
                                            type="button"
                                            className={`popout-item ${selectedAspectId === ap.id ? 'active' : ''}`}
                                            onClick={() => {
                                                handleSelectAspectRatio(ap.id);
                                                setShowAspectPopout(false);
                                            }}
                                        >
                                            <span>{ap.label}</span>
                                            <span className="dimmed-size">{dims.w}×{dims.h}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        className={`btn-wing-tool ${isFullWidth ? 'highlight-emerald' : 'highlight-cyan'}`}
                        onClick={handleToggleFullWidth}
                        title={isFullWidth ? '100% Width (Click for FIT PAGE)' : 'Fit Page (Click for 100% Width)'}
                    >
                        <span className="tool-icon">{isFullWidth ? '↔' : '⊞'}</span>
                        <span className="tool-label">{isFullWidth ? '100%' : 'FIT'}</span>
                    </button>

                    <div className="wing-divider" />

                    <button
                        type="button"
                        className={`btn-wing-tool ${isSnappingEnabled ? 'active' : ''}`}
                        onClick={() => setIsSnappingEnabled(p => !p)}
                        title={isSnappingEnabled ? 'Aero Snap & Smart Guides: ON (S)' : 'Aero Snap: OFF (S)'}
                    >
                        <span className="tool-icon">🧲</span>
                        <span className="tool-label">SNAP</span>
                    </button>

                    <button
                        type="button"
                        className={`btn-wing-tool ${showRulers ? 'active' : ''}`}
                        onClick={() => setShowRulers(p => !p)}
                        title={showRulers ? 'CAD Rulers: ON (R)' : 'CAD Rulers: OFF (R)'}
                    >
                        <span className="tool-icon">📏</span>
                        <span className="tool-label">RULER</span>
                    </button>

                    <div className="wing-divider" />

                    <button
                        type="button"
                        className="btn-wing-tool"
                        onClick={handleUndo}
                        disabled={undoStackRef.current.length === 0}
                        title="Undo (Ctrl+Z)"
                    >
                        <span className="tool-icon">↺</span>
                        <span className="tool-label">UNDO</span>
                    </button>

                    <button
                        type="button"
                        className="btn-wing-tool"
                        onClick={handleRedo}
                        disabled={redoStackRef.current.length === 0}
                        title="Redo (Ctrl+Y)"
                    >
                        <span className="tool-icon">↻</span>
                        <span className="tool-label">REDO</span>
                    </button>
                </aside>

                        {/* Master Canvas Stage Frame (WYSIWYG Export Parity) */}
                    <div
                        ref={(el) => {
                            canvasFrameRef.current = el;
                            workSurfaceRef.current = el;
                        }}
                        className={`canvas-master-frame-16-9 ${isFullWidth ? 'is-full-width' : 'is-fit-stage'}`}
                        style={{
                            width: canvasFrameDimensions.width > 180 ? `${canvasFrameDimensions.width}px` : '100%',
                            height: canvasFrameDimensions.height > 100 ? `${canvasFrameDimensions.height}px` : 'auto',
                            aspectRatio: `${virtualW} / ${virtualH}`
                        }}
                        onMouseMove={handleWorkSurfaceMouseMove}
                        onMouseLeave={handleWorkSurfaceMouseLeave}
                        onDragOver={(e) => {
                            e.preventDefault();
                            e.dataTransfer.dropEffect = 'copy';
                        }}
                        onDrop={handleCanvasDrop}
                        onClick={(e) => {
                            if (e.target === canvasFrameRef.current ||
                                e.target?.classList?.contains('canvas-master-frame-16-9') ||
                                e.target?.classList?.contains('corner-accent') ||
                                e.target?.classList?.contains('canvas-work-surface')) {
                                setSelectedFeedIndex(null);
                                setIsInspectorOpen(false);
                            }
                        }}
                    >
                        <div className="corner-accent top-left" />
                        <div className="corner-accent top-right" />
                        <div className="corner-accent bottom-left" />
                        <div className="corner-accent bottom-right" />

                        {/* Windows Snap Assist Ghost Preview Box */}
                        {snapZonePreview && (
                            <div
                                className="canvas-snap-ghost-preview"
                                style={{
                                    position: 'absolute',
                                    left: `${(snapZonePreview.x / virtualW) * 100}%`,
                                    top: `${(snapZonePreview.y / virtualH) * 100}%`,
                                    width: `${(snapZonePreview.width / virtualW) * 100}%`,
                                    height: `${(snapZonePreview.height / virtualH) * 100}%`,
                                    zIndex: 9990,
                                    pointerEvents: 'none'
                                }}
                            >
                                <div className="snap-ghost-badge">
                                    <span className="snap-icon">🧲</span>
                                    <span className="snap-label">{snapZonePreview.label}</span>
                                </div>
                            </div>
                        )}

                        {/* Precision CAD / NLE Rulers Overlay */}
                        {showRulers && (
                            <div className="canvas-rulers-container">
                                {/* Top-Left Corner Box with live coordinate indicator */}
                                <div className="canvas-ruler-corner" title={`Virtual Canvas Bounds: ${virtualW}×${virtualH}px`}>
                                    <span className="corner-coord-mini">
                                        {mouseCanvasCoords.isInside ? `${mouseCanvasCoords.x},${mouseCanvasCoords.y}` : 'px'}
                                    </span>
                                </div>

                                {/* Horizontal Top Ruler (X-Axis) */}
                                <div className="canvas-ruler-top-bar">
                                    <svg
                                        className="canvas-ruler-svg-x"
                                        viewBox={`0 0 ${virtualW} 20`}
                                        preserveAspectRatio="none"
                                    >
                                        {selectedPlacement && (
                                            <rect
                                                x={selectedPlacement.x}
                                                y="0"
                                                width={selectedPlacement.width}
                                                height="20"
                                                fill="rgba(6, 182, 212, 0.25)"
                                                stroke="#06B6D4"
                                                strokeWidth="1"
                                            />
                                        )}
                                        {rulerTicksX.map(tick => {
                                            if (tick.isMajor) {
                                                return (
                                                    <g key={`rx-${tick.val}`}>
                                                        <line x1={tick.val} y1="0" x2={tick.val} y2="18" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                                                        <text x={tick.val + 2} y="11" fill="#94A3B8" fontSize="9" fontFamily="monospace">
                                                            {tick.val}
                                                        </text>
                                                    </g>
                                                );
                                            }
                                            if (tick.isMed) {
                                                return <line key={`rx-${tick.val}`} x1={tick.val} y1="8" x2={tick.val} y2="18" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />;
                                            }
                                            return <line key={`rx-${tick.val}`} x1={tick.val} y1="13" x2={tick.val} y2="18" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />;
                                        })}
                                        {mouseCanvasCoords.isInside && (
                                            <line
                                                x1={mouseCanvasCoords.x}
                                                y1="0"
                                                x2={mouseCanvasCoords.x}
                                                y2="20"
                                                stroke="#06B6D4"
                                                strokeWidth="2"
                                            />
                                        )}
                                    </svg>
                                </div>

                                {/* Vertical Left Ruler (Y-Axis) */}
                                <div className="canvas-ruler-left-bar">
                                    <svg
                                        className="canvas-ruler-svg-y"
                                        viewBox={`0 0 20 ${virtualH}`}
                                        preserveAspectRatio="none"
                                    >
                                        {selectedPlacement && (
                                            <rect
                                                x="0"
                                                y={selectedPlacement.y}
                                                width="20"
                                                height={selectedPlacement.height}
                                                fill="rgba(6, 182, 212, 0.25)"
                                                stroke="#06B6D4"
                                                strokeWidth="1"
                                            />
                                        )}
                                        {rulerTicksY.map(tick => {
                                            if (tick.isMajor) {
                                                return (
                                                    <g key={`ry-${tick.val}`}>
                                                        <line x1="0" y1={tick.val} x2="18" y2={tick.val} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                                                        <text x="2" y={tick.val - 2} fill="#94A3B8" fontSize="8" fontFamily="monospace">
                                                            {tick.val}
                                                        </text>
                                                    </g>
                                                );
                                            }
                                            if (tick.isMed) {
                                                return <line key={`ry-${tick.val}`} x1="8" y1={tick.val} x2="18" y2={tick.val} stroke="rgba(255,255,255,0.25)" strokeWidth="1" />;
                                            }
                                            return <line key={`ry-${tick.val}`} x1="13" y1={tick.val} x2="18" y2={tick.val} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />;
                                        })}
                                        {mouseCanvasCoords.isInside && (
                                            <line
                                                x1="0"
                                                y1={mouseCanvasCoords.y}
                                                x2="20"
                                                y2={mouseCanvasCoords.y}
                                                stroke="#06B6D4"
                                                strokeWidth="2"
                                            />
                                        )}
                                    </svg>
                                </div>
                            </div>
                        )}

                        {/* Visual Glowing Snap Guidelines */}
                        {snapGuides.vertical !== null && (
                            <div
                                className="canvas-snap-guide-v"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    bottom: 0,
                                    left: `${snapGuides.vertical}%`,
                                    width: '2px',
                                    background: '#06B6D4',
                                    boxShadow: '0 0 10px #06B6D4, 0 0 4px #FFFFFF',
                                    zIndex: 9999,
                                    pointerEvents: 'none'
                                }}
                            />
                        )}
                        {snapGuides.horizontal !== null && (
                            <div
                                className="canvas-snap-guide-h"
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    top: `${snapGuides.horizontal}%`,
                                    height: '2px',
                                    background: '#06B6D4',
                                    boxShadow: '0 0 10px #06B6D4, 0 0 4px #FFFFFF',
                                    zIndex: 9999,
                                    pointerEvents: 'none'
                                }}
                            />
                        )}

                        {/* Empty Canvas Interactive State */}
                        {currentPlacements.length === 0 && (
                            <div className="canvas-empty-state-guide">
                                <div className="empty-icon">🎨</div>
                                <h3>MANUAL CANVAS STUDIO</h3>
                                <p>The canvas is currently empty. Open the Feeds Palette to add screens or apply a preset template.</p>
                                <div className="empty-actions-row">
                                    <button type="button" className="btn-empty-add" onClick={() => setShowFeedsDrawer(true)}>
                                        ＋ OPEN FEEDS & LAYERS
                                    </button>
                                    <button type="button" className="btn-empty-preset" onClick={() => handleApplyPreset('auto')}>
                                        ⊞ AUTO-PACK ALL SCREENS
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Interactive Feed Boxes on Canvas */}
                        {sortedRenderPlacements.map((p) => {
                            const origIdx = p.originalIndex;
                            const isSelected = selectedFeedIndex === origIdx;
                            const isThisDragging = isDragging && selectedFeedIndex === origIdx;
                            const isThisResizing = isResizing && selectedFeedIndex === origIdx;
                            const matchedStation = (allStations.length > 0 ? allStations : timelineStations).find(s => 
                                s.id === p.stationId || 
                                s.hostname?.toLowerCase() === p.stationId?.toLowerCase() || 
                                s.id?.toLowerCase() === p.stationId?.toLowerCase()
                            );
                            const matchedFeed = availableFeeds.find(f => f.stationId === p.stationId && f.displayId === p.displayId);
                            const st = matchedStation || { 
                                id: p.stationId, 
                                hostname: matchedFeed?.stationHostname || p.stationHostname || p.stationId,
                                displayName: matchedFeed?.stationName || p.label || p.stationId,
                                displays: matchedFeed ? [{ displayId: matchedFeed.displayId, width: matchedFeed.sourceWidth, height: matchedFeed.sourceHeight }] : []
                            };
                            const stDisplays = st?.displays || st?.topology?.displays || [];
                            const placedForThisStation = currentPlacements.filter(pl => 
                                pl.stationId === p.stationId || (st && (pl.stationId === st.id || pl.stationId === st.hostname))
                            );
                            const areAllDisplaysPlaced = stDisplays.length > 1 && placedForThisStation.length >= stDisplays.length;
                            const bColor = p.borderColor || SLOT_BORDER_COLORS[origIdx % SLOT_BORDER_COLORS.length];
                            const bWidth = p.borderWidth !== undefined ? p.borderWidth : 2;
                            const rot = p.rotation || 0;
                            const shadowEffect = p.shadowEffect || 'deep';
                            const bRadius = p.borderRadius || 0;

                            const leftPct = (p.x / virtualW) * 100;
                            const topPct = (p.y / virtualH) * 100;
                            const widthPct = (p.width / virtualW) * 100;
                            const heightPct = (p.height / virtualH) * 100;

                            const boxBoxShadow = getShadowCss(shadowEffect, isSelected, bColor);
                            const isFlippedDown = p.y < 50;
                            const isNearLeft = p.x < 100;
                            const isNearRight = (p.x + p.width) > (virtualW - 100);
                            const layerRank = p.zIndex !== undefined ? p.zIndex : origIdx + 1;

                            return (
                                <div
                                    key={`feed-${p.stationId}-${p.displayId}-${origIdx}`}
                                    className={`canvas-feed-card-box ${isSelected ? 'is-selected' : ''} ${isThisDragging ? 'is-dragging' : ''} ${isThisResizing ? 'is-resizing' : ''}`}
                                    style={{
                                        position: 'absolute',
                                        left: `${leftPct}%`,
                                        top: `${topPct}%`,
                                        width: `${widthPct}%`,
                                        height: `${heightPct}%`,
                                        zIndex: (isThisDragging || isThisResizing) ? 2000 : (isSelected ? 1000 + (layerRank * 10) : (layerRank * 10)),
                                        transformOrigin: 'center center',
                                        border: `${bWidth}px solid ${bColor}`,
                                        borderRadius: `${bRadius}px`,
                                        boxShadow: boxBoxShadow,
                                        opacity: p.opacity !== undefined ? p.opacity : 1,
                                        pointerEvents: (p.opacity !== undefined && p.opacity < 0.1) ? 'none' : 'auto',
                                        cursor: isThisDragging ? 'grabbing' : 'grab',
                                        transition: (isThisDragging || isThisResizing) ? 'none' : 'left 0.15s ease-out, top 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out'
                                    }}
                                    onMouseDown={(e) => handleMouseDownBox(e, origIdx)}
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setSelectedFeedIndex(origIdx);
                                        setIsInspectorOpen(true);
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFeedIndex(origIdx);
                                    }}
                                >
                                    {/* Top Draggable Bar & Coordinates */}
                                    <div
                                        className="box-header-badge"
                                        onMouseDown={(e) => handleMouseDownBox(e, origIdx)}
                                        onDoubleClick={() => handleFocus1x1(origIdx)}
                                        title="Click and drag to move window (Double-click to expand 1x1)"
                                    >
                                        <div className="badge-title">
                                            <span className="badge-drag-grip">⠿</span>
                                            <span className="dot-indicator" />
                                            {editingTitleIndex === origIdx ? (
                                                <span
                                                    className="badge-title-edit-container"
                                                    onClick={(e) => e.stopPropagation()}
                                                    onMouseDown={(e) => e.stopPropagation()}
                                                    onDoubleClick={(e) => e.stopPropagation()}
                                                >
                                                    <input
                                                        ref={titleInputRef}
                                                        type="text"
                                                        className="badge-title-input"
                                                        value={editingTitleValue}
                                                        placeholder={`${st.displayName || p.stationId} (${p.displayId})`}
                                                        onChange={(e) => setEditingTitleValue(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            e.stopPropagation();
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault();
                                                                handleCommitTitle(origIdx);
                                                            } else if (e.key === 'Escape') {
                                                                e.preventDefault();
                                                                setEditingTitleIndex(null);
                                                            }
                                                        }}
                                                        onBlur={() => handleCommitTitle(origIdx)}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn-edit-title is-saving"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleCommitTitle(origIdx);
                                                        }}
                                                        title="Save screen title (Enter)"
                                                    >
                                                        ✓
                                                    </button>
                                                </span>
                                            ) : (
                                                <>
                                                    <span
                                                        className="badge-title-text"
                                                        onDoubleClick={(e) => {
                                                            e.stopPropagation();
                                                            setEditingTitleIndex(origIdx);
                                                            setEditingTitleValue(p.label || '');
                                                        }}
                                                        title="Double-click to rename screen (burned into video)"
                                                    >
                                                        {p.label || `${st.displayName || p.stationId} (${p.displayId})`}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        className="btn-edit-title"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setEditingTitleIndex(origIdx);
                                                            setEditingTitleValue(p.label || '');
                                                        }}
                                                        title="Rename screen title (burned into video)"
                                                    >
                                                        ✏️
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                        <div className="badge-coords">
                                            {Math.round(p.width)}×{Math.round(p.height)} ({getReadableAspectRatio(p.width, p.height)}) @ ({Math.round(p.x)},{Math.round(p.y)})
                                            {rot !== 0 && <span className="badge-rot">📐{rot}°</span>}
                                        </div>
                                        <span className="badge-layer" title={`Layer priority rank: #${layerRank}`}>#${layerRank}</span>
                                        <button
                                            type="button"
                                            className={`btn-badge-action-inspector ${isSelected && isInspectorOpen ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedFeedIndex(origIdx);
                                                setIsInspectorOpen(prev => (!prev || selectedFeedIndex !== origIdx));
                                            }}
                                            title="Window Controls & Styling (Right-click window)"
                                        >
                                            ⚙️
                                        </button>
                                    </div>

                                    {/* Live Video Content Viewport */}
                                    <div className="feed-content-viewport">
                                        <div
                                            className="feed-rotation-surface"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                transform: rot ? `rotate(${rot}deg)` : undefined,
                                                transformOrigin: 'center center',
                                                transition: isThisDragging ? 'none' : 'transform 0.2s ease-out'
                                            }}
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
                                                globalGaps={globalGaps}
                                                onOpenSpotlight={onOpenSpotlight}
                                                onSelectActiveStation={null}
                                                recordingSegments={recordingSegments}
                                                playbackSpeed={playbackSpeed}
                                                activeAudioStationId={activeAudioStationId}
                                                onSoloAudio={setActiveAudioStationId}
                                                directorPlan={directorPlan || st?.directorPlan}
                                                isAutoDirectorEnabled={stationAutoDirectorMap ? (stationAutoDirectorMap[st.id] ?? true) : true}
                                                stationsCount={timelineStations.length}
                                                onDeselectStation={onDeselectStation}
                                                targetDisplayId={p.displayId}
                                                onSelectDisplayId={(dispId) => {
                                                    const next = currentPlacements.map((pl, idx) => {
                                                        if (idx === origIdx) {
                                                            return { ...pl, displayId: dispId };
                                                        }
                                                        return pl;
                                                    });
                                                    updateActivePlacements(next);
                                                }}
                                                areAllDisplaysPlaced={areAllDisplaysPlaced}
                                                slotIndex={origIdx}
                                                borderColor={bColor}
                                                isDecoderAllowed={decoderAllocations[origIdx] ?? true}
                                                maxHeight={resolveStreamQuality(
                                                    Math.round((p.width || 1920) * ((canvasFrameDimensions?.width || 960) / virtualW)),
                                                    Math.round((p.height || 1080) * ((canvasFrameDimensions?.height || 540) / virtualH))
                                                )}
                                            />
                                        </div>

                                        {/* Transparent Drag Surface overlay allowing instant drag over video */}
                                        <div
                                            className="card-drag-surface"
                                            onMouseDown={(e) => handleMouseDownBox(e, origIdx)}
                                            onDoubleClick={() => handleFocus1x1(origIdx)}
                                            title="Click and drag anywhere to move this window on the canvas (Double-click for 1x1 focus)"
                                        />
                                    </div>

                                    {/* Multi-Corner Freeform Resize Handles */}
                                    {isSelected && (
                                        <>
                                            <div
                                                className="resize-handle-corner resize-handle-tl"
                                                onMouseDown={(e) => handleMouseDownResize(e, origIdx, 'tl')}
                                                title={`Resize Northwest (Top-Left) - Hold CTRL to lock recorded aspect ratio (${getReadableAspectRatio(p.sourceWidth, p.sourceHeight)})`}
                                            />
                                            <div
                                                className="resize-handle-corner resize-handle-tr"
                                                onMouseDown={(e) => handleMouseDownResize(e, origIdx, 'tr')}
                                                title={`Resize Northeast (Top-Right) - Hold CTRL to lock recorded aspect ratio (${getReadableAspectRatio(p.sourceWidth, p.sourceHeight)})`}
                                            />
                                            <div
                                                className="resize-handle-corner resize-handle-bl"
                                                onMouseDown={(e) => handleMouseDownResize(e, origIdx, 'bl')}
                                                title={`Resize Southwest (Bottom-Left) - Hold CTRL to lock recorded aspect ratio (${getReadableAspectRatio(p.sourceWidth, p.sourceHeight)})`}
                                            />
                                            <div
                                                className="resize-handle-corner resize-handle-br"
                                                onMouseDown={(e) => handleMouseDownResize(e, origIdx, 'br')}
                                                title={`Resize Southeast (Bottom-Right) - Hold CTRL to lock recorded aspect ratio (${getReadableAspectRatio(p.sourceWidth, p.sourceHeight)})`}
                                            >
                                                ↘
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}

                        {/* Selected Floating Tactical Inspector (Stage-Level Overlay: Always on Top z-index: 99999) */}
                        {!isModalOpen && isInspectorOpen && selectedFeedIndex !== null && selectedPlacement && (() => {
                            const p = selectedPlacement;
                            const origIdx = selectedFeedIndex;
                            const bColor = p.borderColor || SLOT_BORDER_COLORS[origIdx % SLOT_BORDER_COLORS.length];
                            const bWidth = p.borderWidth !== undefined ? p.borderWidth : 2;
                            const rot = p.rotation || 0;
                            const shadowEffect = p.shadowEffect || 'deep';
                            const layerRank = p.zIndex !== undefined ? p.zIndex : origIdx + 1;

                            // Strict Multi-Axis Viewport Clamping: position BELOW the window (never on the top ruler)
                            const cardLeftPct = (p.x / virtualW) * 100;
                            const cardWidthPct = (p.width / virtualW) * 100;
                            const centerXPct = cardLeftPct + (cardWidthPct / 2);

                            // Horizontal clamping: never clip outside left or right edges
                            let leftStyle = `${centerXPct}%`;
                            let transformStyle = 'translateX(-50%)';
                            if (centerXPct < 28) {
                                leftStyle = `${Math.max(1, cardLeftPct)}%`;
                                transformStyle = 'none';
                            } else if (centerXPct > 72) {
                                leftStyle = `${Math.min(99, cardLeftPct + cardWidthPct)}%`;
                                transformStyle = 'translateX(-100%)';
                            }

                            // Strictly place inspector BELOW the bottom edge of the window
                            const bottomEdgeVirtual = p.y + p.height + 8;
                            let topStyle;
                            if (bottomEdgeVirtual + 45 > virtualH) {
                                // If window is flush with bottom of canvas, dock inside bottom of window
                                topStyle = `${Math.max(20, ((p.y + p.height - 44) / virtualH) * 100)}%`;
                            } else {
                                topStyle = `${(bottomEdgeVirtual / virtualH) * 100}%`;
                            }

                            const matchedStation = (allStations.length > 0 ? allStations : timelineStations).find(s => 
                                s.id === p.stationId || 
                                s.hostname?.toLowerCase() === p.stationId?.toLowerCase()
                            );
                            const stationTargetId = matchedStation ? matchedStation.id : p.stationId;

                            return (
                                <div
                                    className="floating-feed-inspector compact-hud-inspector"
                                    style={{
                                        position: 'absolute',
                                        left: leftStyle,
                                        top: topStyle,
                                        transform: transformStyle,
                                        zIndex: 99999
                                    }}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* Active Screen Pill Badge */}
                                    <span className="inspector-screen-pill" title={`Active Screen: ${p.label || stationTargetId} • Layer #${layerRank}`}>
                                        🎛️ #${layerRank}
                                    </span>

                                    {/* Border Color Swatch Button & Popover */}
                                    {/* Screen Title Customization */}
                                    <div className="inspector-group title-rename-group">
                                        <span className="inspector-group-label">TITLE:</span>
                                        <input
                                            type="text"
                                            className="inspector-title-input"
                                            value={inspectorTitleValue}
                                            placeholder={`${matchedStation?.displayName || p.stationId} (${p.displayId})`}
                                            onChange={(e) => setInspectorTitleValue(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleUpdatePlacementLabel(selectedFeedIndex, inspectorTitleValue);
                                                }
                                            }}
                                            onBlur={() => {
                                                handleUpdatePlacementLabel(selectedFeedIndex, inspectorTitleValue);
                                            }}
                                            title="Rename screen feed (displayed on canvas and burned into exported video)"
                                        />
                                    </div>

                                    <div className="inspector-group color-swatch-group">
                                        <button
                                            type="button"
                                            className="btn-mini-tool color-swatch-trigger"
                                            onClick={() => setShowColorPicker(prev => !prev)}
                                            title="🎨 Frame Color: Choose border color"
                                        >
                                            <span
                                                className="swatch-circle"
                                                style={{ backgroundColor: bColor === 'transparent' ? '#1E293B' : bColor }}
                                            />
                                        </button>
                                        {showColorPicker && (
                                            <div className="compact-color-palette-popover">
                                                {PALETTE_COLORS.map(c => (
                                                    <button
                                                        key={c}
                                                        type="button"
                                                        className={`btn-color-dot ${bColor === c ? 'is-active' : ''}`}
                                                        style={{ backgroundColor: c === 'transparent' ? '#1E293B' : c }}
                                                        onClick={() => {
                                                            handleUpdateSelectedStyle({ borderColor: c });
                                                            setShowColorPicker(false);
                                                        }}
                                                        title={c === 'transparent' ? 'No Border (Transparent)' : `Border Color: ${c}`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Border Width Cycle Mini-Button */}
                                    <button
                                        type="button"
                                        className="btn-mini-tool"
                                        onClick={() => {
                                            const widths = [0, 2, 4, 8];
                                            const nextW = widths[(widths.indexOf(bWidth) + 1) % widths.length];
                                            handleUpdateSelectedStyle({ borderWidth: nextW });
                                        }}
                                        title={`Border Width: ${bWidth}px (Click to cycle: 0px → 2px → 4px → 8px)`}
                                    >
                                        📏 {bWidth}px
                                    </button>

                                    {/* Shadow Glow Cycle Mini-Button */}
                                    <button
                                        type="button"
                                        className={`btn-mini-tool ${shadowEffect !== 'none' ? 'highlight-glow' : ''}`}
                                        onClick={() => {
                                            const shadows = ['none', 'deep', 'glow-cyan', 'glow-emerald'];
                                            const nextS = shadows[(shadows.indexOf(shadowEffect) + 1) % shadows.length];
                                            handleUpdateSelectedStyle({ shadowEffect: nextS });
                                        }}
                                        title={`Shadow Effect: ${shadowEffect} (Click to cycle: None → Cinema → Cyan Glow → Emerald Glow)`}
                                    >
                                        🌑
                                    </button>

                                    {/* Layer Ordering Mini Cluster */}
                                    <div className="mini-layer-dock">
                                        <button
                                            type="button"
                                            className="btn-mini-tool"
                                            onClick={() => handleBringForward(origIdx)}
                                            title="Step Layer Up (+1)"
                                        >
                                            ▲
                                        </button>
                                        <button
                                            type="button"
                                            className="btn-mini-tool"
                                            onClick={() => handleSendBackward(origIdx)}
                                            title="Step Layer Down (-1)"
                                        >
                                            ▼
                                        </button>
                                    </div>

                                    {/* Rotation Step Button */}
                                    <button
                                        type="button"
                                        className="btn-mini-tool"
                                        onClick={() => handleRotateStep(90)}
                                        title={`Rotate: Step 90° clockwise (Current: ${rot}°)`}
                                    >
                                        ↺ 90°
                                    </button>

                                    {/* Native Recorded Aspect Ratio Snap */}
                                    <button
                                        type="button"
                                        className="btn-mini-tool highlight"
                                        onClick={() => handleSnapToNativeAspect(origIdx)}
                                        title={`Snap to Native Recorded Aspect (${getReadableAspectRatio(p.sourceWidth, p.sourceHeight)})`}
                                    >
                                        📐 NATIVE
                                    </button>

                                    {/* 1x1 Focus Viewport */}
                                    <button
                                        type="button"
                                        className="btn-mini-tool highlight"
                                        onClick={() => handleFocus1x1(origIdx)}
                                        title="1x1 Focus Mode (Double-click window to toggle)"
                                    >
                                        ⛶ 1x1
                                    </button>

                                    {/* Deep Forensic Spotlight Shortcut */}
                                    {onOpenSpotlight && (
                                        <button
                                            type="button"
                                            className="btn-mini-tool"
                                            onClick={() => onOpenSpotlight(stationTargetId, p.displayId)}
                                            title="Deep Forensic Multi-Angle Spotlight"
                                        >
                                            🔍
                                        </button>
                                    )}

                                    {/* Remove Screen Button */}
                                    <button
                                        type="button"
                                        className="btn-mini-tool btn-del-feed"
                                        onClick={() => handleRemovePlacement(origIdx)}
                                        title="Remove Screen from Canvas"
                                    >
                                        🗑️
                                    </button>

                                    {/* Close Inspector Button */}
                                    <button
                                        type="button"
                                        className="btn-mini-tool btn-close-inspector"
                                        onClick={() => {
                                            setSelectedFeedIndex(null);
                                            setIsInspectorOpen(false);
                                        }}
                                        title="Deselect & Finish Editing (Esc)"
                                    >
                                        ✕
                                    </button>
                                </div>
                            );
                        })()}
                        {/* Persistent Canvas UTC Wall Clock Overlay (Movable, Cannot Be Removed) */}
                        <CanvasUtcWallClock
                            currentEpochMs={currentEpochMs}
                            position={utcClockPosition}
                            onPositionChange={(newPos) => {
                                setUtcClockPosition(newPos);
                                try {
                                    localStorage.setItem('itb_canvas_utc_clock_pos', newPos);
                                } catch { }
                            }}
                        />
                        {/* Live Audio Source Playback Overlay Indicator */}
                        <ActiveAudioSourceOverlay />
                    </div>

                    <aside className="canvas-right-wing-dock">
                    <button
                        type="button"
                        className="btn-wing-tool highlight-emerald"
                        onClick={() => setShowSavePresetModal(true)}
                        title="Save current canvas layout as custom preset"
                    >
                        <span className="tool-icon">💾</span>
                        <span className="tool-label">SAVE</span>
                    </button>

                    <div className="wing-popout-wrapper">
                        <button
                            type="button"
                            className={`btn-wing-tool ${showPresetsMenu ? 'active' : ''}`}
                            onClick={() => setShowPresetsMenu(p => !p)}
                            title={`Saved Presets Library (${savedPresets.length})`}
                        >
                            <span className="tool-icon">📁</span>
                            <span className="tool-badge">{savedPresets.length}</span>
                            <span className="tool-label">PRESETS</span>
                        </button>

                        {showPresetsMenu && (
                            <div className="wing-floating-popout right-side-popout">
                                <div className="popout-header">
                                    <span>SAVED PRESETS</span>
                                    <button type="button" className="btn-close-pop" onClick={() => setShowPresetsMenu(false)}>✕</button>
                                </div>
                                <div className="presets-list-scroll">
                                    {savedPresets.length === 0 ? (
                                        <div className="empty-presets-hint">No saved custom presets yet.</div>
                                    ) : (
                                        savedPresets.map(preset => (
                                            <div key={preset.id} className="saved-preset-item" onClick={() => {
                                                handleLoadSavedPreset(preset);
                                                setShowPresetsMenu(false);
                                            }}>
                                                <div className="preset-item-info">
                                                    <span className="preset-item-name">{preset.name}</span>
                                                    <span className="preset-item-meta">{preset.placements?.length || 0} screens • {preset.dateStr}</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn-del-preset"
                                                    onClick={(e) => handleDeleteSavedPreset(preset.id, e)}
                                                    title="Delete saved preset"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="wing-divider" />

                    <button
                        type="button"
                        className="btn-wing-tool"
                        onClick={handleExportCanvasFile}
                        title="Export Canvas Layout to .json file"
                    >
                        <span className="tool-icon">📤</span>
                        <span className="tool-label">EXPORT</span>
                    </button>

                    <button
                        type="button"
                        className="btn-wing-tool"
                        onClick={() => importFileInputRef.current?.click()}
                        title="Import Canvas Layout from .json file"
                    >
                        <span className="tool-icon">📥</span>
                        <span className="tool-label">IMPORT</span>
                    </button>

                    <input
                        ref={importFileInputRef}
                        type="file"
                        accept=".json"
                        style={{ display: 'none' }}
                        onChange={handleImportCanvasFile}
                    />

                    <div className="wing-divider" />

                    <button
                        type="button"
                        className="btn-wing-tool highlight-rose"
                        onClick={() => {
                            hasUserCustomizedRef.current = false;
                            setSelectedPresetId('auto-grid');
                            const targetFeeds = defaultStationFeeds.length > 0 ? defaultStationFeeds : availableFeeds;
                            const autoPacked = generateAutoPackPlacements(targetFeeds, virtualW, virtualH);
                            const resetTimeline = {
                                id: 'canvas-timeline-root',
                                keyframes: [
                                    {
                                        id: 'kf_root_0',
                                        timestampEpochMs: baseEpochMs,
                                        transitionDurationSec: 0.5,
                                        transitionType: 'smooth',
                                        layout: {
                                            width: virtualW,
                                            height: virtualH,
                                            backgroundColor: '#070A10',
                                            fps: 30.0,
                                            placements: autoPacked
                                        }
                                    }
                                ]
                            };
                            setInternalTimeline(resetTimeline);
                            if (onUpdateCanvasLayoutTimeline) onUpdateCanvasLayoutTimeline(resetTimeline);
                            setSelectedFeedIndex(0);
                        }}
                        title="Reset Canvas: Auto-Grid arrangement of all available screens"
                    >
                        <span className="tool-icon">↺</span>
                        <span className="tool-label">RESET</span>
                    </button>

                    <button
                        type="button"
                        className="btn-wing-tool"
                        onClick={handleClearCanvas}
                        title="Clear Canvas: Remove all screens"
                    >
                        <span className="tool-icon">🗑️</span>
                        <span className="tool-label">CLEAR</span>
                    </button>

                    <div className="wing-divider" />

                    <button
                        type="button"
                        className={`btn-wing-tool ${isGridFullscreen ? 'active' : ''}`}
                        onClick={handleToggleGridFullscreen}
                        title="Fullscreen Canvas Grid (F)"
                    >
                        <span className="tool-icon">{isGridFullscreen ? '⤓' : '⛶'}</span>
                        <span className="tool-label">{isGridFullscreen ? 'EXIT' : 'FULL'}</span>
                    </button>
                </aside>
                </div> {/* End canvas-stage-assembly */}
            </div>

            
                {/* Right Wing Dock: Presets & Production Actions */}
                
            </div> {/* End canvas-editing-arena */}
{/* Save Preset Modal Dialog */}
            {showSavePresetModal && (
                <div className="canvas-modal-backdrop" onClick={() => setShowSavePresetModal(false)}>
                    <div className="canvas-modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <span>💾 SAVE CANVAS LAYOUT PRESET</span>
                            <button type="button" className="btn-close-modal" onClick={() => setShowSavePresetModal(false)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <label className="input-label">Preset Name:</label>
                            <input
                                type="text"
                                className="input-preset-name"
                                placeholder="e.g. Command Dual Screen Setup, Tactical Quad"
                                value={presetNameInput}
                                onChange={(e) => setPresetNameInput(e.target.value)}
                                autoFocus
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSaveCurrentPreset();
                                }}
                            />
                            <p className="modal-hint">
                                This saves the exact positions, dimensions, rotation, borders, and shadows of all {currentPlacements.length} screens so you can load them anytime in future editing sessions.
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn-modal-cancel" onClick={() => setShowSavePresetModal(false)}>Cancel</button>
                            <button type="button" className="btn-modal-confirm" onClick={handleSaveCurrentPreset}>Save Preset</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
