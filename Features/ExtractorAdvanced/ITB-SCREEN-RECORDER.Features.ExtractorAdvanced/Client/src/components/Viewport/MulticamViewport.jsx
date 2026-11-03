// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Viewport/MulticamViewport.jsx
// Master Live Canvas Composer & WYSIWYG 16:9 Export Preview Stage
// Full Drag-and-Drop, Feeds Palette, Layers Stacking, Shadows, and Preset Save/Load Parity
// ==========================================
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import CameraCard from './views/Card/CameraCard.jsx';
import './MulticamViewport.scss';

export const ASPECT_PRESETS = [
    { id: '16:9', label: '16:9 Broadcast', ratio: 16 / 9, w: 1920, h: 1080 },
    { id: '32:9', label: '32:9 Dual Screen', ratio: 32 / 9, w: 3840, h: 1080 },
    { id: '21:9', label: '21:9 Ultrawide', ratio: 21 / 9, w: 2560, h: 1080 },
    { id: '16:10', label: '16:10 WUXGA', ratio: 16 / 10, w: 1920, h: 1200 },
    { id: '4:3', label: '4:3 Standard', ratio: 4 / 3, w: 1440, h: 1080 }
];

const DEFAULT_VIRTUAL_CANVAS_W = 1920;
const DEFAULT_VIRTUAL_CANVAS_H = 1080;

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

function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

function cubicEaseInOut(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

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

export function getReadableAspectRatio(w, h) {
    if (!w || !h || w <= 0 || h <= 0) return '16:9';
    const ratio = w / h;
    if (Math.abs(ratio - (16 / 9)) < 0.04) return '16:9';
    if (Math.abs(ratio - (4 / 3)) < 0.04) return '4:3';
    if (Math.abs(ratio - (16 / 10)) < 0.04) return '16:10';
    if (Math.abs(ratio - (21 / 9)) < 0.06) return '21:9';
    if (Math.abs(ratio - (32 / 9)) < 0.08) return '32:9';
    if (Math.abs(ratio - (5 / 4)) < 0.04) return '5:4';
    if (Math.abs(ratio - (9 / 16)) < 0.04) return '9:16';
    if (Math.abs(ratio - 1) < 0.04) return '1:1';
    return `${ratio.toFixed(2)}:1`;
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

function generateAutoPackPlacements(feeds, W = DEFAULT_VIRTUAL_CANVAS_W, H = DEFAULT_VIRTUAL_CANVAS_H) {
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
    _setActiveKfIndex
}) {
    const currentEpochMs = playheadEpochMs > 0 ? playheadEpochMs : (baseEpochMs + playheadMs);
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
    const [isGridFullscreen, setIsGridFullscreen] = useState(false);
    const [_showHudControls, setShowHudControls] = useState(false);
    const hudTimerRef = useRef(null);
    const viewportRootRef = useRef(null);
    const canvasFrameRef = useRef(null);
    const stageWrapperRef = useRef(null);
    const [canvasFrameDimensions, setCanvasFrameDimensions] = useState({ width: 960, height: 540 });

    // Selection & Free Transform state
    const [selectedFeedIndex, setSelectedFeedIndex] = useState(0);
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

    // Master Export Aspect Ratio & Full-Width Staging Mode
    const [selectedAspectId, setSelectedAspectId] = useState(() => {
        const w = canvasLayoutTimeline?.keyframes?.[0]?.layout?.width;
        const h = canvasLayoutTimeline?.keyframes?.[0]?.layout?.height;
        if (w && h) {
            const match = ASPECT_PRESETS.find(p => p.w === w && p.h === h);
            if (match) return match.id;
        }
        return '16:9';
    });
    const [isFullWidth, setIsFullWidth] = useState(true);

    const activeAspectPreset = useMemo(() => {
        return ASPECT_PRESETS.find(p => p.id === selectedAspectId) || ASPECT_PRESETS[0];
    }, [selectedAspectId]);

    const virtualW = activeAspectPreset.w;
    const virtualH = activeAspectPreset.h;
    const currentAspect = activeAspectPreset.ratio;

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
        // Provide 16px breathing space inside viewport
        const availableW = Math.max(320, Math.floor(rect.width || 960) - 16);
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

    // Enumerate all available workstation feeds across displays
    const availableFeeds = useMemo(() => {
        const pool = (allStations && allStations.length > 0) ? allStations : timelineStations;
        const feeds = [];
        pool.forEach(st => {
            const displays = (st.displays && st.displays.length > 0)
                ? st.displays
                : (st.topology && st.topology.displays && st.topology.displays.length > 0)
                    ? st.topology.displays
                    : [{ displayId: 'mon-0', isPrimary: true, width: st.width || 1920, height: st.height || 1080 }];

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
        });
        return feeds;
    }, [allStations, timelineStations]);

    // Timeline Keyframes Layout State
    const [internalTimeline, setInternalTimeline] = useState(() => {
        if (canvasLayoutTimeline?.keyframes?.length > 0) {
            return JSON.parse(JSON.stringify(canvasLayoutTimeline));
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
                        placements: generateAutoPackPlacements(availableFeeds, DEFAULT_VIRTUAL_CANVAS_W, DEFAULT_VIRTUAL_CANVAS_H)
                    }
                }
            ]
        };
    });

    useEffect(() => {
        if (canvasLayoutTimeline?.keyframes?.length > 0) {
            setInternalTimeline(JSON.parse(JSON.stringify(canvasLayoutTimeline)));
            const hasExisting = canvasLayoutTimeline.keyframes.some(k => k.layout?.placements?.length > 0);
            if (hasExisting) {
                hasUserCustomizedRef.current = true;
                setSelectedPresetId('custom');
            }
        }
    }, [canvasLayoutTimeline]);

    const keyframes = internalTimeline.keyframes || [];
    const safeActiveIdx = clamp(activeKfIndex || 0, 0, Math.max(0, keyframes.length - 1));
    const currentKf = keyframes[safeActiveIdx] || keyframes[0];
    const currentPlacements = useMemo(() => {
        return currentKf?.layout?.placements || [];
    }, [currentKf]);

    // Helper to update current placements on active keyframe
    const updateActivePlacements = useCallback((newPlacements) => {
        setInternalTimeline(prev => {
            const nextKfs = [...(prev.keyframes || [])];
            if (!nextKfs[safeActiveIdx]) return prev;
            nextKfs[safeActiveIdx] = {
                ...nextKfs[safeActiveIdx],
                layout: {
                    ...nextKfs[safeActiveIdx].layout,
                    width: virtualW,
                    height: virtualH,
                    placements: newPlacements
                }
            };
            const nextTimeline = { ...prev, keyframes: nextKfs };
            if (onUpdateCanvasLayoutTimeline) onUpdateCanvasLayoutTimeline(nextTimeline);
            return nextTimeline;
        });
    }, [safeActiveIdx, onUpdateCanvasLayoutTimeline, virtualW, virtualH]);

    // Auto-populate AUTO-GRID by default when availableFeeds become available and canvas is empty
    useEffect(() => {
        if (availableFeeds.length > 0 && (!currentPlacements || currentPlacements.length === 0) && !hasUserCustomizedRef.current) {
            const autoPacked = generateAutoPackPlacements(availableFeeds, virtualW, virtualH);
            if (autoPacked.length > 0) {
                updateActivePlacements(autoPacked);
                setSelectedPresetId('auto-grid');
            }
        }
    }, [availableFeeds, currentPlacements, updateActivePlacements, virtualW, virtualH]);

    // Sync current canvas layout to parent Studio
    useEffect(() => {
        if (onUpdateCanvasLayout) {
            onUpdateCanvasLayout({
                width: virtualW,
                height: virtualH,
                backgroundColor: '#070A10',
                fps: 30.0,
                placements: currentPlacements,
                timeline: internalTimeline
            });
        }
    }, [currentPlacements, internalTimeline, onUpdateCanvasLayout, virtualW, virtualH]);

    // Switch Aspect Ratio handler (rescaling existing placements proportionally)
    const handleSelectAspectRatio = useCallback((newAspectId) => {
        const oldPreset = activeAspectPreset;
        const newPreset = ASPECT_PRESETS.find(p => p.id === newAspectId) || ASPECT_PRESETS[0];
        if (oldPreset.id === newPreset.id) return;

        setSelectedAspectId(newPreset.id);

        const ratioX = newPreset.w / oldPreset.w;
        const ratioY = newPreset.h / oldPreset.h;

        const rescaled = currentPlacements.map(p => ({
            ...p,
            x: Math.round(p.x * ratioX),
            y: Math.round(p.y * ratioY),
            width: Math.round(p.width * ratioX),
            height: Math.round(p.height * ratioY)
        }));

        updateActivePlacements(rescaled);
    }, [activeAspectPreset, currentPlacements, updateActivePlacements]);

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
        setSelectedFeedIndex(prev => Math.max(0, prev - 1));
    }, [currentPlacements, updateActivePlacements]);

    const handleClearCanvas = useCallback(() => {
        updateActivePlacements([]);
        setSelectedFeedIndex(-1);
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
        const feeds = availableFeeds.length > 0 ? availableFeeds : currentPlacements;

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

        const activeRef = workSurfaceRef.current || canvasFrameRef.current;
        if (!activeRef) return;
        const rect = activeRef.getBoundingClientRect();
        const p = currentPlacements[index];
        if (!p) return;

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
            setSnapZonePreview(activeZone);
            setSnapGuides({ vertical: vGuide, horizontal: hGuide });

            setInternalTimeline(prev => {
                const nextKfs = [...(prev.keyframes || [])];
                if (!nextKfs[safeActiveIdx]) return prev;
                const placements = [...(nextKfs[safeActiveIdx].layout.placements || [])];
                if (!placements[ds.index]) return prev;
                placements[ds.index] = { ...placements[ds.index], x: newX, y: newY };
                nextKfs[safeActiveIdx] = {
                    ...nextKfs[safeActiveIdx],
                    layout: { ...nextKfs[safeActiveIdx].layout, placements }
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
                    if (!nextKfs[safeActiveIdx]) return prev;
                    const placements = [...(nextKfs[safeActiveIdx].layout.placements || [])];
                    if (!placements[dsIdx]) return prev;
                    placements[dsIdx] = {
                        ...placements[dsIdx],
                        x: zone.x,
                        y: zone.y,
                        width: zone.width,
                        height: zone.height
                    };
                    nextKfs[safeActiveIdx] = {
                        ...nextKfs[safeActiveIdx],
                        layout: { ...nextKfs[safeActiveIdx].layout, placements }
                    };
                    return { ...prev, keyframes: nextKfs };
                });
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

        if (!canvasFrameRef.current) return;
        const rect = canvasFrameRef.current.getBoundingClientRect();
        const p = currentPlacements[index];
        if (!p) return;

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
                if (!nextKfs[safeActiveIdx]) return prev;
                const placements = [...(nextKfs[safeActiveIdx].layout.placements || [])];
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
                nextKfs[safeActiveIdx] = {
                    ...nextKfs[safeActiveIdx],
                    layout: { ...nextKfs[safeActiveIdx].layout, placements }
                };
                return { ...prev, keyframes: nextKfs };
            });
        };

        const handleMouseUp = () => {
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
        updateActivePlacements(next);
    }, [currentPlacements, availableFeeds, updateActivePlacements]);

    // Fullscreen handling
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
            if (e.key === 'Escape') {
                setShowFeedsDrawer(false);
                setShowPresetsMenu(false);
                setShowShadowControl(false);
                setShowRotationControl(false);
                setShowColorPicker(false);
                setShowSavePresetModal(false);
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
        if (isDragging || isResizing || keyframes.length <= 1) {
            return currentPlacements;
        }

        let kfA = keyframes[0];
        let kfB = keyframes[0];
        for (let i = 0; i < keyframes.length; i++) {
            if (keyframes[i].timestampEpochMs <= currentEpochMs) {
                kfA = keyframes[i];
                kfB = keyframes[i + 1] || keyframes[i];
            }
        }

        if (kfA === kfB) {
            return kfA.layout?.placements || currentPlacements;
        }

        const transDurMs = (kfB.transitionDurationSec || 0.5) * 1000;
        const transType = kfB.transitionType || 'smooth';
        const transStartEpoch = kfB.timestampEpochMs - transDurMs;

        if (currentEpochMs < transStartEpoch) {
            return kfA.layout?.placements || currentPlacements;
        }
        if (currentEpochMs >= kfB.timestampEpochMs) {
            return kfB.layout?.placements || currentPlacements;
        }

        if (transType === 'cut') {
            return kfA.layout?.placements || currentPlacements;
        }

        const rawRatio = (currentEpochMs - transStartEpoch) / transDurMs;
        const ratio = clamp(rawRatio, 0, 1);
        const tEased = transType === 'linear' ? ratio : cubicEaseInOut(ratio);

        const aPlacements = kfA.layout?.placements || [];
        const bPlacements = kfB.layout?.placements || [];

        return bPlacements.map(pB => {
            const pA = aPlacements.find(x => x.stationId === pB.stationId && x.displayId === pB.displayId) || pB;
            const interpX = Math.round(pA.x + (pB.x - pA.x) * tEased);
            const interpY = Math.round(pA.y + (pB.y - pA.y) * tEased);
            const interpW = Math.round(pA.width + (pB.width - pA.width) * tEased);
            const interpH = Math.round(pA.height + (pB.height - pA.height) * tEased);
            const interpRot = Number(((pA.rotation || 0) + ((pB.rotation || 0) - (pA.rotation || 0)) * tEased).toFixed(1));

            return {
                ...pB,
                x: interpX,
                y: interpY,
                width: interpW,
                height: interpH,
                rotation: interpRot
            };
        });
    }, [isDragging, isResizing, keyframes, currentEpochMs, currentPlacements]);

    // Sorted placements for rendering (lowest zIndex in back)
    const sortedRenderPlacements = useMemo(() => {
        return activeDisplayPlacements.map((p, originalIndex) => ({ ...p, originalIndex }))
            .sort((a, b) => ((a.zIndex ?? a.originalIndex) - (b.zIndex ?? b.originalIndex)));
    }, [activeDisplayPlacements]);

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

            {/* Universal Master Composition Toolbar */}
            <div className="multicam-composition-mode-bar">
                <div className="comp-mode-left">
                    <span className="comp-icon">🎛️</span>
                    <span className="comp-title">LIVE CANVAS COMPOSER:</span>

                    {/* Unified Feeds & Layers Drawer Toggle */}
                    <button
                        type="button"
                        className={`btn-comp-action ${showFeedsDrawer ? 'active' : ''}`}
                        onClick={() => setShowFeedsDrawer(p => !p)}
                        title="Toggle Feeds Inventory & Layers Manager"
                    >
                        🗂️ FEEDS & LAYERS ({currentPlacements.length}/{availableFeeds.length})
                    </button>

                    {/* Canvas Presets Toolbar */}
                    <div className="comp-pill-group layouts">
                        <button
                            type="button"
                            className={`btn-comp-tab ${selectedPresetId === 'auto-grid' ? 'active' : ''}`}
                            onClick={() => {
                                setSelectedPresetId('auto-grid');
                                handleApplyPreset('auto-grid');
                            }}
                            title="Auto-Grid: Neatly arrange all available stations & displays"
                        >
                            ⊞ AUTO-GRID ({availableFeeds.length})
                        </button>
                        <button
                            type="button"
                            className={`btn-comp-tab ${selectedPresetId === '1x1' ? 'active' : ''}`}
                            onClick={() => {
                                setSelectedPresetId('1x1');
                                handleApplyPreset('1x1');
                            }}
                            title="Single Feed (1x1 Focus Frame)"
                        >
                            ⊞ 1x1
                        </button>
                        <button
                            type="button"
                            className={`btn-comp-tab ${selectedPresetId === '1x2' ? 'active' : ''}`}
                            onClick={() => {
                                setSelectedPresetId('1x2');
                                handleApplyPreset('1x2');
                            }}
                            title="Side-by-Side Dual Feeds (1x2 Dual)"
                        >
                            ⊞ 1x2 DUAL
                        </button>
                        <button
                            type="button"
                            className={`btn-comp-tab ${selectedPresetId === '2x2' ? 'active' : ''}`}
                            onClick={() => {
                                setSelectedPresetId('2x2');
                                handleApplyPreset('2x2');
                            }}
                            title="2x2 Quad Feeds Master Frame"
                        >
                            ⊞ 2x2 QUAD
                        </button>
                        <button
                            type="button"
                            className={`btn-comp-tab ${selectedPresetId === '1+3-pip' ? 'active' : ''}`}
                            onClick={() => {
                                setSelectedPresetId('1+3-pip');
                                handleApplyPreset('1+3-pip');
                            }}
                            title="Picture-in-Picture: 1 Full Master + 3 Insets"
                        >
                            ⊞ 1+3 PIP
                        </button>
                        <button
                            type="button"
                            className={`btn-comp-tab ${selectedPresetId === 'hero-stacked' ? 'active' : ''}`}
                            onClick={() => {
                                setSelectedPresetId('hero-stacked');
                                handleApplyPreset('hero-stacked');
                            }}
                            title="Hero Main + 2 Stacked Displays"
                        >
                            ⊞ HERO+2
                        </button>
                        <button
                            type="button"
                            className="btn-comp-action reset"
                            onClick={() => {
                                hasUserCustomizedRef.current = false;
                                setSelectedPresetId('auto-grid');
                                const autoPacked = generateAutoPackPlacements(availableFeeds, virtualW, virtualH);
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
                            title="Restart Canvas: Reset to default AUTO-GRID with all screens"
                        >
                            ↺ RESET CANVAS
                        </button>
                        <button
                            type="button"
                            className="btn-comp-tab clear"
                            onClick={handleClearCanvas}
                            title="Clear Canvas: Start fresh with an empty canvas"
                        >
                            🗑️ CLEAR
                        </button>
                    </div>

                    {/* Export Aspect Ratio Selector & Full Width Toggle */}
                    <div className="comp-pill-group aspect-group">
                        <span className="aspect-label">📐 EXPORT ASPECT:</span>
                        <select
                            className="select-aspect-ratio"
                            value={selectedAspectId}
                            onChange={(e) => handleSelectAspectRatio(e.target.value)}
                            title="Set Export Master Aspect Ratio (WYSIWYG Target)"
                        >
                            {ASPECT_PRESETS.map(ap => (
                                <option key={ap.id} value={ap.id}>
                                    {ap.label} ({ap.w}×{ap.h})
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            className={`btn-width-mode ${isFullWidth ? 'is-full' : 'is-fit'}`}
                            onClick={() => setIsFullWidth(p => !p)}
                            title={isFullWidth ? 'Full Screen Width (100% Width) - Click to fit stage' : 'Fit to Stage - Click for 100% Full Width'}
                        >
                            {isFullWidth ? '↔ 100% WIDTH' : '⊞ FIT STAGE'}
                        </button>
                    </div>

                    {/* Auto-Director Toggle */}
                    <button
                        type="button"
                        className={`btn-director-toggle ${isAutoDirectorEnabled ? 'is-on' : 'is-off'}`}
                        onClick={onToggleAutoDirector}
                        title={isAutoDirectorEnabled ? 'Auto-Director is ON' : 'Auto-Director is OFF'}
                    >
                        <span className="dot" />
                        <span>AUTO-DIRECTOR: {isAutoDirectorEnabled ? 'ON' : 'OFF'}</span>
                    </button>

                    {/* Precision CAD / NLE Rulers Toggle */}
                    <button
                        type="button"
                        className={`btn-ruler-toggle ${showRulers ? 'is-active' : ''}`}
                        onClick={() => setShowRulers(p => !p)}
                        title={showRulers ? 'Precision Rulers: ON (Press R to toggle)' : 'Precision Rulers: OFF (Press R to toggle)'}
                    >
                        📏 RULERS: {showRulers ? 'ON' : 'OFF'}
                    </button>

                    {/* Windows Aero Snap & Magnetic Smart Guides Toggle */}
                    <button
                        type="button"
                        className={`btn-snap-toggle ${isSnappingEnabled ? 'is-active' : ''}`}
                        onClick={() => setIsSnappingEnabled(p => !p)}
                        title={isSnappingEnabled ? 'Windows Snap & Smart Guides: ON (Press S to toggle, hold Alt to bypass)' : 'Windows Snap & Smart Guides: OFF (Press S to toggle)'}
                    >
                        🧲 SNAP: {isSnappingEnabled ? 'ON' : 'OFF'}
                    </button>
                </div>

                {/* Right Actions: Save, Presets Dropdown, JSON, Fullscreen */}
                <div className="comp-mode-right">
                    {/* Save Preset Button */}
                    <button
                        type="button"
                        className="btn-comp-action save"
                        onClick={() => setShowSavePresetModal(true)}
                        title="Save current canvas placement layout for future edits"
                    >
                        💾 SAVE PRESET
                    </button>

                    {/* Saved Presets Dropdown */}
                    <div className="saved-presets-dropdown-wrapper">
                        <button
                            type="button"
                            className={`btn-comp-action ${showPresetsMenu ? 'active' : ''}`}
                            onClick={() => setShowPresetsMenu(p => !p)}
                            title="Load a saved custom layout preset"
                        >
                            📁 SAVED PRESETS ({savedPresets.length}) ▾
                        </button>

                        {showPresetsMenu && (
                            <div className="saved-presets-menu-popover">
                                <div className="popover-header">
                                    <span>SAVED CANVAS PRESETS</span>
                                    <button type="button" className="btn-close-pop" onClick={() => setShowPresetsMenu(false)}>✕</button>
                                </div>
                                <div className="presets-list-scroll">
                                    {savedPresets.length === 0 ? (
                                        <div className="empty-presets-hint">
                                            No saved custom presets yet. Arrange your canvas and click "SAVE PRESET"!
                                        </div>
                                    ) : (
                                        savedPresets.map(preset => (
                                            <div key={preset.id} className="saved-preset-item" onClick={() => handleLoadSavedPreset(preset)}>
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

                    {/* Canvas Layout File Export & Import */}
                    <button
                        type="button"
                        className="btn-comp-action"
                        onClick={handleExportCanvasFile}
                        title="Download/Export current canvas layout as a .json file"
                    >
                        📤 EXPORT CANVAS
                    </button>
                    <button
                        type="button"
                        className="btn-comp-action"
                        onClick={() => importFileInputRef.current?.click()}
                        title="Import/Load a canvas layout from a saved .json file"
                    >
                        📥 IMPORT CANVAS
                    </button>
                    <input
                        ref={importFileInputRef}
                        type="file"
                        accept=".json"
                        style={{ display: 'none' }}
                        onChange={handleImportCanvasFile}
                    />

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

            {/* Interactive Live Master Canvas Stage (WYSIWYG Frame) */}
            <div ref={stageWrapperRef} className={`canvas-stage-wrapper ${isFullWidth ? 'is-full-width-mode' : 'is-fit-stage-mode'}`}>
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
                                        zIndex: (layerRank * 10) + (isThisDragging ? 100 : 0),
                                        transformOrigin: 'center center',
                                        border: `${bWidth}px solid ${bColor}`,
                                        borderRadius: `${bRadius}px`,
                                        boxShadow: boxBoxShadow,
                                        cursor: isThisDragging ? 'grabbing' : 'grab',
                                        transition: (isThisDragging || isThisResizing) ? 'none' : 'left 0.15s ease-out, top 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out'
                                    }}
                                    onMouseDown={(e) => handleMouseDownBox(e, origIdx)}
                                    onContextMenu={(e) => onStationContextMenu && onStationContextMenu(e, st)}
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
                                            <span>{p.label || `${st.displayName || p.stationId} (${p.displayId})`}</span>
                                        </div>
                                        <div className="badge-coords">
                                            {Math.round(p.width)}×{Math.round(p.height)} ({getReadableAspectRatio(p.width, p.height)}) @ ({Math.round(p.x)},{Math.round(p.y)})
                                            {rot !== 0 && <span className="badge-rot">📐{rot}°</span>}
                                        </div>
                                        <span className="badge-layer" title={`Layer priority rank: #${layerRank}`}>#{layerRank}</span>
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
                                                isAutoDirectorEnabled={isAutoDirectorEnabled}
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
                                                slotIndex={origIdx}
                                                borderColor={bColor}
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
                        {selectedFeedIndex !== null && selectedPlacement && (() => {
                            const p = selectedPlacement;
                            const origIdx = selectedFeedIndex;
                            const bColor = p.borderColor || SLOT_BORDER_COLORS[origIdx % SLOT_BORDER_COLORS.length];
                            const bWidth = p.borderWidth !== undefined ? p.borderWidth : 2;
                            const rot = p.rotation || 0;
                            const shadowEffect = p.shadowEffect || 'deep';
                            const layerRank = p.zIndex !== undefined ? p.zIndex : origIdx + 1;

                            // Calculate positioning relative to virtual canvas bounds
                            const isFlippedDown = p.y < 45;
                            const centerXPct = ((p.x + p.width / 2) / virtualW) * 100;
                            const isNearLeft = centerXPct < 22;
                            const isNearRight = centerXPct > 78;

                            let leftStyle = `${centerXPct}%`;
                            let transformStyle = 'translateX(-50%)';
                            if (isNearLeft) {
                                leftStyle = `${Math.max(1, (p.x / virtualW) * 100)}%`;
                                transformStyle = 'none';
                            } else if (isNearRight) {
                                leftStyle = `${Math.min(99, ((p.x + p.width) / virtualW) * 100)}%`;
                                transformStyle = 'translateX(-100%)';
                            }

                            const topStyle = isFlippedDown
                                ? `${((p.y + 26) / virtualH) * 100}%`
                                : `calc(${((p.y) / virtualH) * 100}% - 34px)`;

                            const matchedStation = (allStations.length > 0 ? allStations : timelineStations).find(s => 
                                s.id === p.stationId || 
                                s.hostname?.toLowerCase() === p.stationId?.toLowerCase()
                            );
                            const stationTargetId = matchedStation ? matchedStation.id : p.stationId;

                            return (
                                <div
                                    className={`floating-feed-inspector ${isFlippedDown ? 'is-flipped-down' : ''}`}
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
                                    {/* Border Color Swatch Button & Popover */}
                                    <div className="inspector-group color-swatch-group">
                                        <button
                                            type="button"
                                            className="btn-color-swatch-trigger"
                                            onClick={() => setShowColorPicker(prev => !prev)}
                                            title="Border Color: Click to choose"
                                        >
                                            <span
                                                className="swatch-circle"
                                                style={{ backgroundColor: bColor === 'transparent' ? '#1E293B' : bColor }}
                                            />
                                            <span className="caret">▾</span>
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
                                                        title={c === 'transparent' ? 'No Border Color' : `Border Color: ${c}`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Border Thickness Select (Stroke Lines) */}
                                    <div className="inspector-group width-select-group">
                                        <select
                                            className="tactical-select width-select"
                                            value={bWidth}
                                            onChange={(e) => handleUpdateSelectedStyle({ borderWidth: Number(e.target.value) })}
                                            title="Select border thickness"
                                        >
                                            <option value={0}>━ None (0px)</option>
                                            <option value={2}>━ Thin (2px)</option>
                                            <option value={4}>━━ Med (4px)</option>
                                            <option value={6}>━━━ Thick (6px)</option>
                                            <option value={8}>━━━━ Heavy (8px)</option>
                                            <option value={12}>━━━━━ Ultra (12px)</option>
                                        </select>
                                    </div>

                                    {/* Shadow Effect Dropdown */}
                                    <div className="inspector-group shadow-select-group">
                                        <select
                                            className="tactical-select shadow-select"
                                            value={shadowEffect}
                                            onChange={(e) => handleUpdateSelectedStyle({ shadowEffect: e.target.value })}
                                            title="Shadow Effect"
                                        >
                                            {SHADOW_PRESETS.map(s => (
                                                <option key={s.id} value={s.id}>{s.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Layer Stacking Order Select */}
                                    <div className="inspector-group layer-select-group">
                                        <select
                                            className="tactical-select layer-select"
                                            value=""
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (val === 'front') handleBringToFront(origIdx);
                                                else if (val === 'back') handleSendToBack(origIdx);
                                                else if (val === 'up') handleBringForward(origIdx);
                                                else if (val === 'down') handleSendBackward(origIdx);
                                            }}
                                            title="Change layer stacking order"
                                        >
                                            <option value="" disabled>L#{layerRank} ▾</option>
                                            <option value="front">⏫ Front (Top)</option>
                                            <option value="up">▲ Forward (+1)</option>
                                            <option value="down">▼ Backward (-1)</option>
                                            <option value="back">⏬ Back (Bottom)</option>
                                        </select>
                                    </div>

                                    {/* Rotation Step & Fine Slider */}
                                    <div className="inspector-group rotate">
                                        <button
                                            type="button"
                                            className="btn-action-tool"
                                            onClick={() => handleRotateStep(90)}
                                            title="Rotate 90 degrees clockwise (↺)"
                                        >
                                            ↺ 90°
                                        </button>
                                        <button
                                            type="button"
                                            className={`btn-action-tool ${showRotationControl ? 'active' : ''}`}
                                            onClick={() => setShowRotationControl(prev => !prev)}
                                            title="Toggle fine rotation slider"
                                        >
                                            📐 {rot}°
                                        </button>
                                        {showRotationControl && (
                                            <input
                                                type="range"
                                                min="-180"
                                                max="180"
                                                value={rot}
                                                onChange={(e) => handleUpdateSelectedStyle({ rotation: Number(e.target.value) })}
                                                className="rotation-slider"
                                            />
                                        )}
                                    </div>

                                    {/* Native Recorded Aspect Ratio Snap */}
                                    <button
                                        type="button"
                                        className="btn-action-tool highlight"
                                        onClick={() => handleSnapToNativeAspect(origIdx)}
                                        title={`Snap window dimensions to its exact recorded aspect ratio (${getReadableAspectRatio(p.sourceWidth, p.sourceHeight)})`}
                                    >
                                        📐 NATIVE ({getReadableAspectRatio(p.sourceWidth, p.sourceHeight)})
                                    </button>

                                    {/* 1x1 Focus Mode: Expand feed to fill entire 16:9 canvas */}
                                    <button
                                        type="button"
                                        className="btn-action-tool highlight"
                                        onClick={() => handleFocus1x1(origIdx)}
                                        title="Maximize this window to fill the entire 16:9 canvas (1x1 Focus View)"
                                    >
                                        ⊞ 1x1
                                    </button>

                                    {/* Deep Forensic Spotlight Shortcut */}
                                    <button
                                        type="button"
                                        className="btn-action-tool"
                                        onClick={() => onOpenSpotlight && onOpenSpotlight(stationTargetId, p.displayId)}
                                        title="Open station forensic spotlight view"
                                    >
                                        ⛶ SPOTLIGHT
                                    </button>

                                    {/* Delete Feed Button */}
                                    <button
                                        type="button"
                                        className="btn-action-tool btn-del-feed"
                                        onClick={() => handleRemovePlacement(origIdx)}
                                        title="Remove this feed from canvas"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            );
                        })()}
                    </div>
                </div>

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
