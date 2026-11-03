// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Viewport/MulticamViewport.jsx
// Master Live Canvas Composer & WYSIWYG 16:9 Export Preview Stage
// Full Drag-and-Drop, Feeds Palette, Layers Stacking, Shadows, and Preset Save/Load Parity
// ==========================================
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import StudioVideoFeed from '../Player/StudioVideoFeed.jsx';
import CameraCard from './views/Card/CameraCard.jsx';
import KeystrokePlaybackOverlay from '../Player/KeystrokePlaybackOverlay.jsx';
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

    // Side Panels: Feeds Palette, Layers Manager, Save/Load Presets, JSON Modal
    const [showFeedsPalette, setShowFeedsPalette] = useState(false);
    const [showLayersPanel, setShowLayersPanel] = useState(false);
    const [showSavePresetModal, setShowSavePresetModal] = useState(false);
    const [showPresetsMenu, setShowPresetsMenu] = useState(false);
    const [showJsonModal, setShowJsonModal] = useState(false);
    const [jsonModalText, setJsonModalText] = useState('');
    const [presetNameInput, setPresetNameInput] = useState('');
    const [feedSearchQuery, setFeedSearchQuery] = useState('');

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

    // -------------------------------------------------------------
    // LAYER STACKING ACTIONS ("מי לפני מי")
    // -------------------------------------------------------------
    const handleBringToFront = useCallback((idx = selectedFeedIndex) => {
        if (idx < 0 || !currentPlacements[idx]) return;
        const maxZ = Math.max(...currentPlacements.map(p => p.zIndex || 0), 0);
        const next = [...currentPlacements];
        next[idx] = { ...next[idx], zIndex: maxZ + 1 };
        updateActivePlacements(next);
    }, [selectedFeedIndex, currentPlacements, updateActivePlacements]);

    const handleSendToBack = useCallback((idx = selectedFeedIndex) => {
        if (idx < 0 || !currentPlacements[idx]) return;
        const minZ = Math.min(...currentPlacements.map(p => p.zIndex || 0), 0);
        const next = [...currentPlacements];
        next[idx] = { ...next[idx], zIndex: Math.max(0, minZ - 1) };
        updateActivePlacements(next);
    }, [selectedFeedIndex, currentPlacements, updateActivePlacements]);

    const handleBringForward = useCallback((idx = selectedFeedIndex) => {
        if (idx < 0 || !currentPlacements[idx]) return;
        const next = [...currentPlacements];
        next[idx] = { ...next[idx], zIndex: (next[idx].zIndex || 0) + 1 };
        updateActivePlacements(next);
    }, [selectedFeedIndex, currentPlacements, updateActivePlacements]);

    const handleSendBackward = useCallback((idx = selectedFeedIndex) => {
        if (idx < 0 || !currentPlacements[idx]) return;
        const next = [...currentPlacements];
        next[idx] = { ...next[idx], zIndex: Math.max(0, (next[idx].zIndex || 0) - 1) };
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
                        zIndex: 0,
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
                    newPlacements = [
                        { ...feeds[0], x: 0, y: 0, width: 960, height: 1080, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: SLOT_BORDER_COLORS[0], shadowEffect: 'deep', borderRadius: 0 },
                        { ...feeds[1], x: 960, y: 0, width: 960, height: 1080, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: SLOT_BORDER_COLORS[1], shadowEffect: 'deep', borderRadius: 0 }
                    ];
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

    // JSON Import / Export
    const handleOpenJsonModal = useCallback(() => {
        setJsonModalText(JSON.stringify({ placements: currentPlacements, keyframes }, null, 2));
        setShowJsonModal(true);
    }, [currentPlacements, keyframes]);

    const handleApplyJsonImport = useCallback(() => {
        try {
            const parsed = JSON.parse(jsonModalText);
            if (parsed.placements && Array.isArray(parsed.placements)) {
                updateActivePlacements(parsed.placements);
                setSelectedFeedIndex(0);
                setSelectedPresetId('custom');
                hasUserCustomizedRef.current = true;
                setShowJsonModal(false);
                return;
            }
            if (parsed.keyframes && Array.isArray(parsed.keyframes)) {
                setInternalTimeline({ id: 'canvas-timeline-imported', keyframes: parsed.keyframes });
                setSelectedFeedIndex(0);
                setSelectedPresetId('custom');
                hasUserCustomizedRef.current = true;
                setShowJsonModal(false);
                return;
            }
            alert('Invalid JSON structure. Must contain "placements" array or "keyframes" array.');
        } catch (err) {
            alert(`JSON Parse Error: ${err.message}`);
        }
    }, [jsonModalText, updateActivePlacements]);

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
                setShowFeedsPalette(false);
                setShowLayersPanel(false);
                setShowPresetsMenu(false);
                setShowShadowControl(false);
                setShowRotationControl(false);
                setShowSavePresetModal(false);
                setShowJsonModal(false);
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
            .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
    }, [activeDisplayPlacements]);

    const isSoloMode = Boolean(activeStation);
    const selectedPlacement = currentPlacements[selectedFeedIndex] || null;

    return (
        <div
            ref={viewportRootRef}
            className={`multicam-viewport-root ${isSoloMode ? 'solo' : 'canvas-grid'} ${isGridFullscreen ? 'fullscreen-grid-active' : ''}`}
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

                    {/* Feeds Palette Button */}
                    <button
                        type="button"
                        className={`btn-comp-action ${showFeedsPalette ? 'active' : ''}`}
                        onClick={() => setShowFeedsPalette(p => !p)}
                        title="Open Station Feeds & Displays Inventory Palette"
                    >
                        ＋ FEEDS PALETTE
                    </button>

                    {/* Layers Panel Button */}
                    <button
                        type="button"
                        className={`btn-comp-action ${showLayersPanel ? 'active' : ''}`}
                        onClick={() => setShowLayersPanel(p => !p)}
                        title="Open Canvas Stacking Layers Hierarchy Manager"
                    >
                        ≡ LAYERS ({currentPlacements.length})
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

                    {/* JSON Import / Export Button */}
                    <button
                        type="button"
                        className="btn-comp-action"
                        onClick={handleOpenJsonModal}
                        title="View, copy, or paste layout JSON structure"
                    >
                        📋 JSON DATA
                    </button>

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

            {/* View Mode A: Solo Workstation Spotlight */}
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

            {/* View Mode B: Interactive Live Master Canvas Stage (WYSIWYG 16:9 Frame) */}
            {!isSoloMode && (
                <div className="canvas-stage-wrapper">
                    {/* Collapsible Left Panel: Feeds & Displays Palette */}
                    {showFeedsPalette && (
                        <div className="canvas-side-drawer feeds-palette-drawer">
                            <div className="drawer-header">
                                <span>＋ FEEDS & DISPLAYS PALETTE</span>
                                <button type="button" className="btn-close-drawer" onClick={() => setShowFeedsPalette(false)}>✕</button>
                            </div>
                            <div className="drawer-search">
                                <input
                                    type="text"
                                    placeholder="Filter workstations..."
                                    value={feedSearchQuery}
                                    onChange={(e) => setFeedSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="drawer-list-scroll">
                                {availableFeeds
                                    .filter(f => !feedSearchQuery || f.label.toLowerCase().includes(feedSearchQuery.toLowerCase()))
                                    .map((f, fIdx) => {
                                        const countOnCanvas = currentPlacements.filter(p => p.stationId === f.stationId && p.displayId === f.displayId).length;
                                        return (
                                            <div key={`palette-feed-${f.stationId}-${f.displayId}-${fIdx}`} className="drawer-feed-item">
                                                <div className="feed-item-header">
                                                    <span className="feed-item-title">{f.label}</span>
                                                    {f.isPrimary && <span className="primary-badge">PRIMARY</span>}
                                                </div>
                                                <div className="feed-item-details">
                                                    <span>{f.width}×{f.height}</span>
                                                    {countOnCanvas > 0 && (
                                                        <span className="on-canvas-tag">{countOnCanvas} on canvas</span>
                                                    )}
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn-add-to-canvas"
                                                    onClick={() => handleAddFeedToCanvas(f)}
                                                >
                                                    ＋ ADD TO CANVAS
                                                </button>
                                            </div>
                                        );
                                    })}
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

                    {/* Collapsible Right Panel: Layers Stacking Hierarchy ("מי לפני מי") */}
                    {showLayersPanel && (
                        <div className="canvas-side-drawer layers-panel-drawer">
                            <div className="drawer-header">
                                <span>≡ LAYERS STACKING ORDER</span>
                                <button type="button" className="btn-close-drawer" onClick={() => setShowLayersPanel(false)}>✕</button>
                            </div>
                            <div className="layers-list-scroll">
                                {sortedRenderPlacements.slice().reverse().map((p) => {
                                    const origIdx = p.originalIndex;
                                    const isSel = origIdx === selectedFeedIndex;
                                    return (
                                        <div
                                            key={`layer-row-${p.stationId}-${p.displayId}-${origIdx}`}
                                            className={`layer-item-row ${isSel ? 'selected' : ''}`}
                                            onClick={() => setSelectedFeedIndex(origIdx)}
                                        >
                                            <div className="layer-info-left">
                                                <span className="layer-num-pill">L{p.zIndex || origIdx}</span>
                                                <span className="layer-name">{p.label || `${p.stationId} (${p.displayId})`}</span>
                                            </div>
                                            <div className="layer-actions-right" onClick={(e) => e.stopPropagation()}>
                                                <button type="button" onClick={() => handleBringForward(origIdx)} title="Bring Forward (L+1)">⬆️</button>
                                                <button type="button" onClick={() => handleSendBackward(origIdx)} title="Send Backward (L-1)">⬇️</button>
                                                <button type="button" onClick={() => handleBringToFront(origIdx)} title="Bring to Front (Top)">⏫</button>
                                                <button type="button" onClick={() => handleSendToBack(origIdx)} title="Send to Back (Bottom)">⏬</button>
                                                <button type="button" className="btn-del-layer" onClick={() => handleRemovePlacement(origIdx)} title="Remove feed from canvas">✕</button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* 16:9 Canvas Stage Frame */}
                    <div
                        ref={canvasFrameRef}
                        className="canvas-master-frame-16-9"
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
                                    <button type="button" className="btn-empty-add" onClick={() => setShowFeedsPalette(true)}>
                                        ＋ OPEN FEEDS PALETTE
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
                            const st = (allStations.length > 0 ? allStations : timelineStations).find(s => s.id === p.stationId) || { id: p.stationId, displayName: p.label || p.stationId };
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
                                        zIndex: isSelected ? 1000 : (p.zIndex || origIdx),
                                        transform: `rotate(${rot}deg)`,
                                        transformOrigin: 'center center',
                                        border: `${bWidth}px solid ${bColor}`,
                                        borderRadius: `${bRadius}px`,
                                        boxShadow: boxBoxShadow,
                                        cursor: isThisDragging ? 'grabbing' : 'grab',
                                        transition: (isThisDragging || isThisResizing) ? 'none' : 'left 0.15s ease-out, top 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out, transform 0.15s ease-out'
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
                                        <span className="badge-layer">L{p.zIndex || origIdx}</span>
                                    </div>

                                    {/* Live Video Content Viewport */}
                                    <div className="feed-content-viewport">
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
                                            className="floating-feed-inspector"
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
                                                <button type="button" className="btn-action-tool" onClick={() => handleBringForward(origIdx)} title="Bring forward (+1)">⬆️</button>
                                                <button type="button" className="btn-action-tool" onClick={() => handleSendBackward(origIdx)} title="Send backward (-1)">⬇️</button>
                                                <button type="button" className="btn-action-tool" onClick={() => handleBringToFront(origIdx)} title="Bring to Front">⏫</button>
                                                <button type="button" className="btn-action-tool" onClick={() => handleSendToBack(origIdx)} title="Send to Back">⏬</button>
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

                                            {/* Solo Inspection Shortcut */}
                                            <button
                                                type="button"
                                                className="btn-action-tool highlight"
                                                onClick={() => onSelectActiveStation && onSelectActiveStation(st.id)}
                                                title="Inspect this workstation in Solo Viewport"
                                            >
                                                🔍 SOLO
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

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

            {/* JSON Import / Export Modal Dialog */}
            {showJsonModal && (
                <div className="canvas-modal-backdrop" onClick={() => setShowJsonModal(false)}>
                    <div className="canvas-modal-card wide" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <span>📋 JSON LAYOUT DATA (IMPORT / EXPORT)</span>
                            <button type="button" className="btn-close-modal" onClick={() => setShowJsonModal(false)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <p className="modal-hint">
                                Copy this configuration to save elsewhere, or paste existing canvas JSON to apply immediately.
                            </p>
                            <textarea
                                className="json-textarea"
                                rows={14}
                                value={jsonModalText}
                                onChange={(e) => setJsonModalText(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn-modal-cancel"
                                onClick={() => {
                                    navigator.clipboard.writeText(jsonModalText);
                                    alert('JSON copied to clipboard!');
                                }}
                            >
                                📋 Copy to Clipboard
                            </button>
                            <button type="button" className="btn-modal-cancel" onClick={() => setShowJsonModal(false)}>Close</button>
                            <button type="button" className="btn-modal-confirm" onClick={handleApplyJsonImport}>Apply Layout</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
