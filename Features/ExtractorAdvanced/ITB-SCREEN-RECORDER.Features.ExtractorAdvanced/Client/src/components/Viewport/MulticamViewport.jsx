// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Viewport/MulticamViewport.jsx
// Master Live Canvas Composer & WYSIWYG 16:9 Export Preview Stage
// Full Drag-and-Drop, Feeds Palette, Layers Stacking, Shadows, and Preset Save/Load Parity
// ==========================================
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import CameraCard from './views/Card/CameraCard.jsx';
import './MulticamViewport.scss';

const VIRTUAL_CANVAS_W = 1920;
const VIRTUAL_CANVAS_H = 1080;

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

function generateAutoPackPlacements(feeds) {
    const W = VIRTUAL_CANVAS_W;
    const H = VIRTUAL_CANVAS_H;
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
        const halfW = 960;
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
        const cellW = 960;
        const cellH = 540;
        const gridCells = [
            { cx: 0, cy: 0 },
            { cx: 960, cy: 0 },
            { cx: 480, cy: 540 }
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
        const cellW = 960;
        const cellH = 540;
        const gridCells = [
            { cx: 0, cy: 0 },
            { cx: 960, cy: 0 },
            { cx: 0, cy: 540 },
            { cx: 960, cy: 540 }
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
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [snapGuides, setSnapGuides] = useState({ vertical: null, horizontal: null });

    const dragStateRef = useRef(null);
    const hasUserCustomizedRef = useRef(false);
    const [selectedPresetId, setSelectedPresetId] = useState('auto-grid');

    // Dynamic responsive 16:9 canvas frame measurement
    useEffect(() => {
        const el = stageWrapperRef.current;
        if (!el) return;

        const updateDimensions = () => {
            const rect = el.getBoundingClientRect();
            // Provide 24px breathing space inside viewport
            const availableW = Math.max(320, (rect.width || 960) - 24);
            const availableH = Math.max(180, (rect.height || 540) - 24);

            let finalW, finalH;
            if (availableW / availableH >= (16 / 9)) {
                // Height is the limiting factor (pillarbox)
                finalH = availableH;
                finalW = Math.round(finalH * (16 / 9));
            } else {
                // Width is the limiting factor (letterbox)
                finalW = availableW;
                finalH = Math.round(finalW / (16 / 9));
            }

            setCanvasFrameDimensions(prev => {
                if (prev.width === finalW && prev.height === finalH) return prev;
                return { width: finalW, height: finalH };
            });
        };

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
    }, []);

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
                        width: VIRTUAL_CANVAS_W,
                        height: VIRTUAL_CANVAS_H,
                        backgroundColor: '#070A10',
                        fps: 30.0,
                        placements: generateAutoPackPlacements(availableFeeds)
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
                    placements: newPlacements
                }
            };
            const nextTimeline = { ...prev, keyframes: nextKfs };
            if (onUpdateCanvasLayoutTimeline) onUpdateCanvasLayoutTimeline(nextTimeline);
            return nextTimeline;
        });
    }, [safeActiveIdx, onUpdateCanvasLayoutTimeline]);

    // Auto-populate AUTO-GRID by default when availableFeeds become available and canvas is empty
    useEffect(() => {
        if (availableFeeds.length > 0 && (!currentPlacements || currentPlacements.length === 0) && !hasUserCustomizedRef.current) {
            const autoPacked = generateAutoPackPlacements(availableFeeds);
            if (autoPacked.length > 0) {
                updateActivePlacements(autoPacked);
                setSelectedPresetId('auto-grid');
            }
        }
    }, [availableFeeds, currentPlacements, updateActivePlacements]);

    // Sync current canvas layout to parent Studio
    useEffect(() => {
        if (onUpdateCanvasLayout) {
            onUpdateCanvasLayout({
                width: VIRTUAL_CANVAS_W,
                height: VIRTUAL_CANVAS_H,
                backgroundColor: '#070A10',
                fps: 30.0,
                placements: currentPlacements,
                timeline: internalTimeline
            });
        }
    }, [currentPlacements, internalTimeline, onUpdateCanvasLayout]);

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

    // Focus single placement to fill 100% of 16:9 canvas (1x1 Focus Viewport)
    const handleFocus1x1 = useCallback((idx = selectedFeedIndex) => {
        if (idx < 0 || !currentPlacements[idx]) return;
        const maxRank = currentPlacements.length;
        const next = currentPlacements.map((p, i) => {
            if (i === idx) {
                return {
                    ...p,
                    x: 0,
                    y: 0,
                    width: VIRTUAL_CANVAS_W,
                    height: VIRTUAL_CANVAS_H,
                    zIndex: maxRank
                };
            }
            return p;
        });
        updateActivePlacements(next);
    }, [selectedFeedIndex, currentPlacements, updateActivePlacements]);

    // -------------------------------------------------------------
    // PRESET TEMPLATES
    // -------------------------------------------------------------
    const handleApplyPreset = useCallback((presetId) => {
        let newPlacements = [];
        const feeds = availableFeeds.length > 0 ? availableFeeds : currentPlacements;

        switch (presetId) {
            case 'auto':
            case 'auto-grid':
                newPlacements = generateAutoPackPlacements(feeds);
                break;
            case '1x1':
                if (feeds.length > 0) {
                    newPlacements = [{
                        ...feeds[0],
                        x: 0,
                        y: 0,
                        width: 1920,
                        height: 1080,
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
                    const halfW = 960;
                    newPlacements = feeds.slice(0, 2).map((f, idx) => {
                        const aspect = f.nativeAspectRatio || (f.sourceWidth && f.sourceHeight ? f.sourceWidth / f.sourceHeight : 16 / 9);
                        const { x, y, width, height } = fitInCell(idx * halfW, 0, halfW, 1080, aspect);
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
                    newPlacements = generateAutoPackPlacements(feeds);
                }
                break;
            case '2x2':
                newPlacements = feeds.slice(0, 4).map((f, idx) => ({
                    ...f,
                    x: (idx % 2) * 960,
                    y: Math.floor(idx / 2) * 540,
                    width: 960,
                    height: 540,
                    zIndex: idx,
                    rotation: 0,
                    borderWidth: 2,
                    borderColor: SLOT_BORDER_COLORS[idx % SLOT_BORDER_COLORS.length],
                    shadowEffect: 'deep',
                    borderRadius: 0
                }));
                break;
            case '1+3-pip':
                if (feeds.length >= 2) {
                    newPlacements = [
                        { ...feeds[0], x: 0, y: 0, width: 1920, height: 1080, zIndex: 0, rotation: 0, borderWidth: 0, borderColor: SLOT_BORDER_COLORS[0], shadowEffect: 'none', borderRadius: 0 }
                    ];
                    const insets = feeds.slice(1, 4);
                    const insetW = 440;
                    const insetH = 248;
                    insets.forEach((f, idx) => {
                        newPlacements.push({
                            ...f,
                            x: 1920 - insetW - 24,
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
                    newPlacements = [
                        { ...feeds[0], x: 0, y: 0, width: 1280, height: 1080, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: SLOT_BORDER_COLORS[0], shadowEffect: 'deep', borderRadius: 0 },
                        { ...feeds[1], x: 1280, y: 0, width: 640, height: 540, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: SLOT_BORDER_COLORS[1], shadowEffect: 'deep', borderRadius: 0 },
                        { ...feeds[2], x: 1280, y: 540, width: 640, height: 540, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: SLOT_BORDER_COLORS[2], shadowEffect: 'deep', borderRadius: 0 }
                    ];
                }
                break;
            case '3-grid':
                if (feeds.length >= 3) {
                    newPlacements = [
                        { ...feeds[0], x: 0, y: 0, width: 960, height: 540, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: SLOT_BORDER_COLORS[0], shadowEffect: 'deep', borderRadius: 0 },
                        { ...feeds[1], x: 960, y: 0, width: 960, height: 540, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: SLOT_BORDER_COLORS[1], shadowEffect: 'deep', borderRadius: 0 },
                        { ...feeds[2], x: 480, y: 540, width: 960, height: 540, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: SLOT_BORDER_COLORS[2], shadowEffect: 'deep', borderRadius: 0 }
                    ];
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
    }, [availableFeeds, currentPlacements, updateActivePlacements]);

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
            width: VIRTUAL_CANVAS_W,
            height: VIRTUAL_CANVAS_H,
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
    }, [currentPlacements, internalTimeline]);

    const handleImportCanvasFile = useCallback((e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new window.FileReader();
        reader.onload = (event) => {
            try {
                const parsed = JSON.parse(event.target.result);
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

        if (!canvasFrameRef.current) return;
        const rect = canvasFrameRef.current.getBoundingClientRect();
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
            scaleX: VIRTUAL_CANVAS_W / rect.width,
            scaleY: VIRTUAL_CANVAS_H / rect.height
        };

        setIsDragging(true);

        const handleMouseMove = (moveEv) => {
            if (!dragStateRef.current || dragStateRef.current.mode !== 'drag') return;
            const ds = dragStateRef.current;
            const dx = (moveEv.clientX - ds.startX) * ds.scaleX;
            const dy = (moveEv.clientY - ds.startY) * ds.scaleY;

            let newX = Math.round(ds.initialX + dx);
            let newY = Math.round(ds.initialY + dy);

            newX = clamp(newX, 0, VIRTUAL_CANVAS_W - ds.initialW);
            newY = clamp(newY, 0, VIRTUAL_CANVAS_H - ds.initialH);

            let vGuide = null;
            let hGuide = null;

            if (Math.abs(newX + ds.initialW / 2 - VIRTUAL_CANVAS_W / 2) < 18) {
                newX = Math.round((VIRTUAL_CANVAS_W - ds.initialW) / 2);
                vGuide = 50;
            } else if (Math.abs(newX) < 16) {
                newX = 0;
                vGuide = 0;
            } else if (Math.abs(newX + ds.initialW - VIRTUAL_CANVAS_W) < 16) {
                newX = VIRTUAL_CANVAS_W - ds.initialW;
                vGuide = 100;
            }

            if (Math.abs(newY + ds.initialH / 2 - VIRTUAL_CANVAS_H / 2) < 18) {
                newY = Math.round((VIRTUAL_CANVAS_H - ds.initialH) / 2);
                hGuide = 50;
            } else if (Math.abs(newY) < 16) {
                newY = 0;
                hGuide = 0;
            } else if (Math.abs(newY + ds.initialH - VIRTUAL_CANVAS_H) < 16) {
                newY = VIRTUAL_CANVAS_H - ds.initialH;
                hGuide = 100;
            }

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
            scaleX: VIRTUAL_CANVAS_W / rect.width,
            scaleY: VIRTUAL_CANVAS_H / rect.height
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
                const maxW = VIRTUAL_CANVAS_W - ds.initialX;
                const maxH = VIRTUAL_CANVAS_H - ds.initialY;
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
                const maxH = VIRTUAL_CANVAS_H - ds.initialY;
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
                const maxW = VIRTUAL_CANVAS_W - ds.initialX;
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

        if (p.y + newH > VIRTUAL_CANVAS_H) {
            newH = VIRTUAL_CANVAS_H - p.y;
            newW = Math.round(newH * nativeRatio);
        }
        if (p.x + newW > VIRTUAL_CANVAS_W) {
            newW = VIRTUAL_CANVAS_W - p.x;
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
                    const newX = clamp(target.x + dx, 0, VIRTUAL_CANVAS_W - target.width);
                    const newY = clamp(target.y + dy, 0, VIRTUAL_CANVAS_H - target.height);
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
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedFeedIndex, currentPlacements, handleRemovePlacement, updateActivePlacements]);

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
            const canvasX = clamp(Math.round((dropClientX / rect.width) * VIRTUAL_CANVAS_W), 0, VIRTUAL_CANVAS_W - 320);
            const canvasY = clamp(Math.round((dropClientY / rect.height) * VIRTUAL_CANVAS_H), 0, VIRTUAL_CANVAS_H - 180);

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
                        x: clamp(canvasX, 0, VIRTUAL_CANVAS_W - initW),
                        y: clamp(canvasY, 0, VIRTUAL_CANVAS_H - initH),
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
                            x: clamp(canvasX, 0, VIRTUAL_CANVAS_W - p.width),
                            y: clamp(canvasY, 0, VIRTUAL_CANVAS_H - p.height)
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
    }, [availableFeeds, currentPlacements, updateActivePlacements]);

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
                                const autoPacked = generateAutoPackPlacements(availableFeeds);
                                const resetTimeline = {
                                    id: 'canvas-timeline-root',
                                    keyframes: [
                                        {
                                            id: 'kf_root_0',
                                            timestampEpochMs: baseEpochMs,
                                            transitionDurationSec: 0.5,
                                            transitionType: 'smooth',
                                            layout: {
                                                width: VIRTUAL_CANVAS_W,
                                                height: VIRTUAL_CANVAS_H,
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

            {/* Interactive Live Master Canvas Stage (WYSIWYG 16:9 Frame) */}
            <div ref={stageWrapperRef} className="canvas-stage-wrapper">
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

                    {/* 16:9 Canvas Stage Frame */}
                    <div
                        ref={canvasFrameRef}
                        className="canvas-master-frame-16-9"
                        style={{
                            width: canvasFrameDimensions.width > 180 ? `${canvasFrameDimensions.width}px` : '100%',
                            height: canvasFrameDimensions.height > 100 ? `${canvasFrameDimensions.height}px` : '100%',
                            maxWidth: '100%',
                            maxHeight: '100%',
                            aspectRatio: '16 / 9'
                        }}
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

                            const leftPct = (p.x / VIRTUAL_CANVAS_W) * 100;
                            const topPct = (p.y / VIRTUAL_CANVAS_H) * 100;
                            const widthPct = (p.width / VIRTUAL_CANVAS_W) * 100;
                            const heightPct = (p.height / VIRTUAL_CANVAS_H) * 100;

                            const boxBoxShadow = getShadowCss(shadowEffect, isSelected, bColor);
                            const isFlippedDown = p.y < 50;
                            const isNearLeft = p.x < 100;
                            const isNearRight = (p.x + p.width) > 1820;
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
                                    <div className="box-header-badge">
                                        <div className="badge-title">
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
                                            title="Click and drag anywhere to move this window on the canvas"
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

                                    {/* Selected Floating Tactical Inspector */}
                                    {isSelected && selectedPlacement && (
                                        <div
                                            className={`floating-feed-inspector ${isFlippedDown ? 'is-flipped-down' : ''} ${isNearLeft ? 'align-left' : ''} ${isNearRight ? 'align-right' : ''}`}
                                            onMouseDown={(e) => e.stopPropagation()}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {/* Border Color Palette */}
                                            <div className="inspector-group colors">
                                                <span className="group-label">BORDER:</span>
                                                {PALETTE_COLORS.map(c => (
                                                    <button
                                                        key={c}
                                                        type="button"
                                                        className={`btn-color-dot ${bColor === c ? 'is-active' : ''}`}
                                                        style={{ backgroundColor: c === 'transparent' ? '#1E293B' : c }}
                                                        onClick={() => handleUpdateSelectedStyle({ borderColor: c })}
                                                        title={c === 'transparent' ? 'No Border Color' : `Border Color: ${c}`}
                                                    />
                                                ))}
                                            </div>

                                            {/* Border Thickness */}
                                            <div className="inspector-group width">
                                                <span className="group-label">WIDTH:</span>
                                                {BORDER_WIDTHS.map(w => (
                                                    <button
                                                        key={w}
                                                        type="button"
                                                        className={`btn-width-pill ${bWidth === w ? 'is-active' : ''}`}
                                                        onClick={() => handleUpdateSelectedStyle({ borderWidth: w })}
                                                    >
                                                        {w === 0 ? 'NONE' : `${w}PX`}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Shadow Effect Dropdown */}
                                            <div className="inspector-group shadow">
                                                <button
                                                    type="button"
                                                    className={`btn-action-tool ${showShadowControl ? 'active' : ''}`}
                                                    onClick={() => setShowShadowControl(prev => !prev)}
                                                    title="Select shadow or glow effect"
                                                >
                                                    🌑 SHADOW ▾
                                                </button>
                                                {showShadowControl && (
                                                    <div className="shadow-dropdown-menu">
                                                        {SHADOW_PRESETS.map(s => (
                                                            <button
                                                                key={s.id}
                                                                type="button"
                                                                className={`shadow-option-btn ${shadowEffect === s.id ? 'active' : ''}`}
                                                                onClick={() => {
                                                                    handleUpdateSelectedStyle({ shadowEffect: s.id });
                                                                    setShowShadowControl(false);
                                                                }}
                                                            >
                                                                {s.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Layer Stacking Order */}
                                            <div className="inspector-group layers">
                                                <span className="group-label">LAYER #{layerRank}:</span>
                                                <button type="button" className="btn-action-tool" onClick={() => handleSendBackward(origIdx)} title="Send backward (L-1)">⬇️ -1</button>
                                                <button type="button" className="btn-action-tool" onClick={() => handleBringForward(origIdx)} title="Bring forward (L+1)">⬆️ +1</button>
                                                <button type="button" className="btn-action-tool" onClick={() => handleSendToBack(origIdx)} title="Send to Back (Bottom)">⏬ BACK</button>
                                                <button type="button" className="btn-action-tool" onClick={() => handleBringToFront(origIdx)} title="Bring to Front (Top)">⏫ FRONT</button>
                                            </div>

                                            {/* Rotate 90 & Slider Toggle */}
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

                                            {/* Delete Feed Button */}
                                            <button
                                                type="button"
                                                className="btn-action-tool btn-del-feed"
                                                onClick={() => handleRemovePlacement(origIdx)}
                                                title="Remove this feed from canvas"
                                            >
                                                🗑️
                                            </button>

                                            {/* 1x1 Focus Mode: Expand feed to fill entire 16:9 canvas */}
                                            <button
                                                type="button"
                                                className="btn-action-tool highlight"
                                                onClick={() => handleFocus1x1(origIdx)}
                                                title="Maximize this window to fill the entire 16:9 canvas (1x1 Focus View)"
                                            >
                                                ⊞ 1x1 FOCUS
                                            </button>

                                            {/* Deep Forensic Spotlight Shortcut */}
                                            <button
                                                type="button"
                                                className="btn-action-tool"
                                                onClick={() => onOpenSpotlight && onOpenSpotlight(st.id, p.displayId)}
                                                title="Open station forensic spotlight view"
                                            >
                                                ⛶ SPOTLIGHT
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
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
