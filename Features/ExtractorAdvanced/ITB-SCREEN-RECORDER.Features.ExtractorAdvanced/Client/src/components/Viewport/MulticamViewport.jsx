// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Viewport/MulticamViewport.jsx
// Universal Live Master Canvas Composer, Multi-Keyframe Timeline Engine & WYSIWYG Export
// ==========================================
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import CameraCard from './views/Card/CameraCard.jsx';
import StudioVideoFeed from '../Player/StudioVideoFeed.jsx';
import KeystrokePlaybackOverlay from '../Player/KeystrokePlaybackOverlay.jsx';
import { formatTimelineClock } from '../../utils/timeFormat.js';
import './MulticamViewport.scss';

const VIRTUAL_CANVAS_W = 1920;
const VIRTUAL_CANVAS_H = 1080;

const SLOT_BORDER_COLORS = [
    '#06B6D4', '#10B981', '#F59E0B', '#F43F5E',
    '#A855F7', '#EC4899', '#38BDF8', '#34D399', '#FFFFFF'
];

const PALETTE_COLORS = [
    '#06B6D4', '#10B981', '#F59E0B', '#F43F5E',
    '#A855F7', '#38BDF8', '#FFFFFF', 'transparent'
];

const BORDER_WIDTHS = [0, 2, 4, 6, 8];

function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

function cubicEaseInOut(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Packs all available feeds into optimal 16:9 layout coordinates on a 1920x1080 canvas.
 */
function generateAutoPackPlacements(feeds) {
    const W = VIRTUAL_CANVAS_W;
    const H = VIRTUAL_CANVAS_H;
    const count = feeds.length;
    if (count === 0) return [];

    if (count === 1) {
        return [{
            ...feeds[0],
            x: 0,
            y: 0,
            width: W,
            height: H,
            zIndex: 0,
            rotation: 0,
            borderWidth: 0,
            borderColor: SLOT_BORDER_COLORS[0]
        }];
    }

    if (count === 2) {
        const halfW = 960;
        return [
            { ...feeds[0], x: 0, y: 0, width: halfW, height: H, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: SLOT_BORDER_COLORS[0] },
            { ...feeds[1], x: halfW, y: 0, width: halfW, height: H, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: SLOT_BORDER_COLORS[1] }
        ];
    }

    if (count === 3) {
        return [
            { ...feeds[0], x: 0, y: 0, width: 960, height: 540, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: SLOT_BORDER_COLORS[0] },
            { ...feeds[1], x: 960, y: 0, width: 960, height: 540, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: SLOT_BORDER_COLORS[1] },
            { ...feeds[2], x: 480, y: 540, width: 960, height: 540, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: SLOT_BORDER_COLORS[2] }
        ];
    }

    if (count === 4) {
        return [
            { ...feeds[0], x: 0, y: 0, width: 960, height: 540, zIndex: 0, rotation: 0, borderWidth: 2, borderColor: SLOT_BORDER_COLORS[0] },
            { ...feeds[1], x: 960, y: 0, width: 960, height: 540, zIndex: 1, rotation: 0, borderWidth: 2, borderColor: SLOT_BORDER_COLORS[1] },
            { ...feeds[2], x: 0, y: 540, width: 960, height: 540, zIndex: 2, rotation: 0, borderWidth: 2, borderColor: SLOT_BORDER_COLORS[2] },
            { ...feeds[3], x: 960, y: 540, width: 960, height: 540, zIndex: 3, rotation: 0, borderWidth: 2, borderColor: SLOT_BORDER_COLORS[3] }
        ];
    }

    const cols = count <= 6 ? 3 : count <= 8 ? 4 : Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / cols);
    const cellW = Math.floor(W / cols);
    const cellH = Math.floor(H / rows);

    return feeds.map((f, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        return {
            ...f,
            x: col * cellW,
            y: row * cellH,
            width: cellW,
            height: cellH,
            zIndex: i,
            rotation: 0,
            borderWidth: 2,
            borderColor: SLOT_BORDER_COLORS[i % SLOT_BORDER_COLORS.length]
        };
    });
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
    inPointMs = 0,
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
    onUpdateCanvasLayout,
    canvasLayoutTimeline,
    onUpdateCanvasLayoutTimeline,
    activeKfIndex = 0,
    setActiveKfIndex
}) {
    const viewportRootRef = useRef(null);
    const canvasFrameRef = useRef(null);

    const [isGridFullscreen, setIsGridFullscreen] = useState(false);
    const [activeAudioStationId, setActiveAudioStationId] = useState(() => timelineStations[0]?.id || null);
    const [showHudControls, setShowHudControls] = useState(true);
    const hudTimerRef = useRef(null);

    // Selected feed index on canvas
    const [selectedFeedIndex, setSelectedFeedIndex] = useState(0);

    // Dynamic drag & resize state
    const dragStateRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [snapGuides, setSnapGuides] = useState({ vertical: null, horizontal: null });

    // Rotation slider display toggle
    const [showRotationControl, setShowRotationControl] = useState(false);

    // All available feeds extracted from selected timeline stations
    const availableFeeds = useMemo(() => {
        const feeds = [];
        timelineStations.forEach(st => {
            const displays = (st.displays && st.displays.length > 0)
                ? st.displays
                : (st.topology && st.topology.displays && st.topology.displays.length > 0)
                    ? st.topology.displays
                    : [{ displayId: 'mon-0', isPrimary: true }];

            displays.forEach((d, dIdx) => {
                const dispId = (d.displayId || d.DisplayId || `mon-${dIdx}`).toLowerCase();
                const dispName = d.displayName || d.DisplayName || (dispId === 'mon-0' ? 'Screen 1' : `Screen ${dIdx + 1}`);
                const stationLabel = st.displayName || st.roleAlias || st.hostname || st.name;
                feeds.push({
                    feedKey: `${st.id}:${dispId}`,
                    stationId: st.id,
                    displayId: dispId,
                    station: st,
                    label: displays.length > 1 ? `${stationLabel} - ${dispName}` : stationLabel
                });
            });
        });
        return feeds;
    }, [timelineStations]);

    // Current playhead epoch
    const currentEpochMs = useMemo(() => {
        return playheadEpochMs > 0 ? playheadEpochMs : Math.round(baseEpochMs + playheadMs);
    }, [playheadEpochMs, baseEpochMs, playheadMs]);

    const cutStartEpochMs = useMemo(() => baseEpochMs + inPointMs, [baseEpochMs, inPointMs]);
    const cutEndEpochMs = useMemo(() => baseEpochMs + (outPointMs || totalDurationMs), [baseEpochMs, outPointMs, totalDurationMs]);

    // Internal Keyframes Timeline State
    const [internalTimeline, setInternalTimeline] = useState(() => {
        if (canvasLayoutTimeline?.keyframes?.length > 0) {
            return canvasLayoutTimeline;
        }
        return {
            width: VIRTUAL_CANVAS_W,
            height: VIRTUAL_CANVAS_H,
            backgroundColor: '#070A10',
            fps: 30.0,
            preset: 'auto',
            keyframes: [
                {
                    timestampEpochMs: cutStartEpochMs,
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

    // Synchronize available feeds with keyframes if stations changed
    useEffect(() => {
        if (availableFeeds.length === 0) return;

        setInternalTimeline(prev => {
            const currentKfs = prev?.keyframes || [];
            if (currentKfs.length === 0) {
                const initPlacements = generateAutoPackPlacements(availableFeeds);
                const nextTimeline = {
                    width: VIRTUAL_CANVAS_W,
                    height: VIRTUAL_CANVAS_H,
                    backgroundColor: '#070A10',
                    fps: 30.0,
                    preset: 'auto',
                    keyframes: [
                        {
                            timestampEpochMs: cutStartEpochMs,
                            transitionDurationSec: 0.5,
                            transitionType: 'smooth',
                            layout: {
                                width: VIRTUAL_CANVAS_W,
                                height: VIRTUAL_CANVAS_H,
                                backgroundColor: '#070A10',
                                fps: 30.0,
                                placements: initPlacements
                            }
                        }
                    ]
                };
                if (onUpdateCanvasLayoutTimeline) onUpdateCanvasLayoutTimeline(nextTimeline);
                return nextTimeline;
            }

            let hasChanged = false;
            const updatedKfs = currentKfs.map(kf => {
                const existing = kf.layout?.placements || [];
                const missing = availableFeeds.filter(f => !existing.some(p => p.stationId === f.stationId && p.displayId === f.displayId));
                if (missing.length > 0) {
                    hasChanged = true;
                    const allMerged = [...existing, ...missing];
                    return {
                        ...kf,
                        layout: {
                            ...kf.layout,
                            placements: generateAutoPackPlacements(allMerged)
                        }
                    };
                }
                return kf;
            });

            if (hasChanged) {
                const nextTimeline = { ...prev, keyframes: updatedKfs };
                if (onUpdateCanvasLayoutTimeline) onUpdateCanvasLayoutTimeline(nextTimeline);
                return nextTimeline;
            }
            return prev;
        });
    }, [availableFeeds, cutStartEpochMs, onUpdateCanvasLayoutTimeline]);

    // Active keyframes & selected keyframe reference
    const keyframes = useMemo(() => internalTimeline.keyframes || [], [internalTimeline.keyframes]);
    const safeActiveIdx = Math.max(0, Math.min(keyframes.length - 1, activeKfIndex));
    const currentKf = keyframes[safeActiveIdx] || keyframes[0];
    const currentPlacements = useMemo(() => currentKf?.layout?.placements || [], [currentKf?.layout?.placements]);

    // Helper to update placements in the active keyframe
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

    // Apply Preset Layouts to Active Keyframe
    const handleApplyPreset = useCallback((preset) => {
        let newPlacements = [];

        if (preset === '1x1') {
            const target = availableFeeds[selectedFeedIndex] || availableFeeds[0];
            if (target) {
                newPlacements = [{
                    ...target,
                    x: 0,
                    y: 0,
                    width: VIRTUAL_CANVAS_W,
                    height: VIRTUAL_CANVAS_H,
                    zIndex: 0,
                    rotation: 0,
                    borderWidth: 0,
                    borderColor: SLOT_BORDER_COLORS[0]
                }];
            }
        } else if (preset === '1x2') {
            const halfW = 960;
            newPlacements = availableFeeds.slice(0, 2).map((f, i) => ({
                ...f,
                x: i * halfW,
                y: 0,
                width: halfW,
                height: VIRTUAL_CANVAS_H,
                zIndex: i,
                rotation: 0,
                borderWidth: 2,
                borderColor: SLOT_BORDER_COLORS[i % SLOT_BORDER_COLORS.length]
            }));
        } else if (preset === '2x2') {
            newPlacements = availableFeeds.slice(0, 4).map((f, i) => {
                const col = i % 2;
                const row = Math.floor(i / 2);
                return {
                    ...f,
                    x: col * 960,
                    y: row * 540,
                    width: 960,
                    height: 540,
                    zIndex: i,
                    rotation: 0,
                    borderWidth: 2,
                    borderColor: SLOT_BORDER_COLORS[i % SLOT_BORDER_COLORS.length]
                };
            });
        } else if (preset === '3-grid') {
            newPlacements = availableFeeds.slice(0, 3).map((f, i) => {
                const coords = [
                    { x: 0, y: 0, w: 960, h: 540 },
                    { x: 960, y: 0, w: 960, h: 540 },
                    { x: 480, y: 540, w: 960, h: 540 }
                ];
                const c = coords[i] || coords[0];
                return {
                    ...f,
                    x: c.x,
                    y: c.y,
                    width: c.w,
                    height: c.h,
                    zIndex: i,
                    rotation: 0,
                    borderWidth: 2,
                    borderColor: SLOT_BORDER_COLORS[i % SLOT_BORDER_COLORS.length]
                };
            });
        } else if (preset === '1+3-pip') {
            const main = availableFeeds[0];
            const insets = availableFeeds.slice(1, 4);
            newPlacements.push({
                ...main,
                x: 0,
                y: 0,
                width: VIRTUAL_CANVAS_W,
                height: VIRTUAL_CANVAS_H,
                zIndex: 0,
                rotation: 0,
                borderWidth: 0,
                borderColor: SLOT_BORDER_COLORS[0]
            });
            const insetW = 440;
            const insetH = 248;
            insets.forEach((ins, idx) => {
                newPlacements.push({
                    ...ins,
                    x: VIRTUAL_CANVAS_W - insetW - 24,
                    y: VIRTUAL_CANVAS_H - ((idx + 1) * (insetH + 16)) - 16,
                    width: insetW,
                    height: insetH,
                    zIndex: idx + 1,
                    rotation: 0,
                    borderWidth: 3,
                    borderColor: SLOT_BORDER_COLORS[(idx + 1) % SLOT_BORDER_COLORS.length]
                });
            });
        } else {
            // 'auto': default pack all available feeds
            newPlacements = generateAutoPackPlacements(availableFeeds);
        }

        updateActivePlacements(newPlacements);
    }, [availableFeeds, selectedFeedIndex, updateActivePlacements]);

    // Real-Time Playback & Scrubbing Interpolation
    const activeDisplayPlacements = useMemo(() => {
        // While actively dragging or resizing, show current placements with 0 latency
        if (isDragging || isResizing || keyframes.length <= 1) {
            return currentPlacements;
        }

        let kfA = keyframes[0];
        let kfB = null;

        for (let i = 0; i < keyframes.length; i++) {
            if (keyframes[i].timestampEpochMs <= currentEpochMs) {
                kfA = keyframes[i];
            } else {
                kfB = keyframes[i];
                break;
            }
        }

        if (!kfB) {
            return kfA.layout?.placements || currentPlacements;
        }

        const transType = kfB.transitionType || 'smooth';
        const transDurMs = Math.max(100, (kfB.transitionDurationSec ?? 0.5) * 1000);
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

            let interpOpacity = 1;
            if (transType === 'fade') {
                interpOpacity = Number(tEased.toFixed(2));
            } else if (transType === 'dip') {
                interpOpacity = ratio < 0.5 ? Number((1 - ratio * 2).toFixed(2)) : Number(((ratio - 0.5) * 2).toFixed(2));
            }

            return {
                ...pB,
                x: interpX,
                y: interpY,
                width: interpW,
                height: interpH,
                rotation: interpRot,
                opacity: interpOpacity
            };
        });
    }, [isDragging, isResizing, keyframes, currentEpochMs, currentPlacements]);

    // Keep parent Studio informed of current canvas layout for WYSIWYG export
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

    // Add Keyframe at Current Playhead
    const handleAddKeyframeAtPlayhead = useCallback(() => {
        const targetEpoch = clamp(currentEpochMs, cutStartEpochMs, cutEndEpochMs);

        setInternalTimeline(prev => {
            const currentKfs = [...(prev.keyframes || [])];
            const existingIdx = currentKfs.findIndex(k => Math.abs(k.timestampEpochMs - targetEpoch) < 300);
            if (existingIdx >= 0) {
                if (setActiveKfIndex) setActiveKfIndex(existingIdx);
                return prev;
            }

            const activeLayout = currentKf?.layout || {
                width: VIRTUAL_CANVAS_W,
                height: VIRTUAL_CANVAS_H,
                backgroundColor: '#070A10',
                fps: 30.0,
                placements: currentPlacements
            };

            const newKf = {
                timestampEpochMs: targetEpoch,
                transitionDurationSec: 0.5,
                transitionType: 'smooth',
                layout: JSON.parse(JSON.stringify(activeLayout))
            };

            const nextKfs = [...currentKfs, newKf].sort((a, b) => a.timestampEpochMs - b.timestampEpochMs);
            const newIdx = nextKfs.findIndex(k => k.timestampEpochMs === targetEpoch);
            if (setActiveKfIndex) setActiveKfIndex(newIdx >= 0 ? newIdx : 0);

            const nextTimeline = { ...prev, keyframes: nextKfs };
            if (onUpdateCanvasLayoutTimeline) onUpdateCanvasLayoutTimeline(nextTimeline);
            return nextTimeline;
        });
    }, [currentEpochMs, cutStartEpochMs, cutEndEpochMs, currentKf?.layout, currentPlacements, setActiveKfIndex, onUpdateCanvasLayoutTimeline]);

    // Delete Active Keyframe
    const handleDeleteActiveKeyframe = useCallback(() => {
        if (keyframes.length <= 1) return;
        setInternalTimeline(prev => {
            const nextKfs = (prev.keyframes || []).filter((_, i) => i !== safeActiveIdx);
            if (setActiveKfIndex) setActiveKfIndex(prevIdx => Math.max(0, prevIdx - 1));
            const nextTimeline = { ...prev, keyframes: nextKfs };
            if (onUpdateCanvasLayoutTimeline) onUpdateCanvasLayoutTimeline(nextTimeline);
            return nextTimeline;
        });
    }, [keyframes.length, safeActiveIdx, setActiveKfIndex, onUpdateCanvasLayoutTimeline]);

    // Apply Active Layout to All Timeline Keyframes
    const handleApplyLayoutToAll = useCallback(() => {
        setInternalTimeline(prev => {
            const activeLayoutCopy = JSON.parse(JSON.stringify(currentKf.layout));
            const updatedKfs = (prev.keyframes || []).map(k => ({
                ...k,
                layout: activeLayoutCopy
            }));
            const nextTimeline = { ...prev, keyframes: updatedKfs };
            if (onUpdateCanvasLayoutTimeline) onUpdateCanvasLayoutTimeline(nextTimeline);
            return nextTimeline;
        });
    }, [currentKf?.layout, onUpdateCanvasLayoutTimeline]);

    // -------------------------------------------------------------
    // HIGH-PERFORMANCE 60FPS DIRECT DRAG & RESIZE ENGINE (MODAL PARITY)
    // -------------------------------------------------------------
    const handleMouseDownBox = (e, index) => {
        if (e.button !== 0) return; // Left click only
        e.stopPropagation();
        e.preventDefault();

        setSelectedFeedIndex(index);

        if (!canvasFrameRef.current) return;
        const rect = canvasFrameRef.current.getBoundingClientRect();
        const p = currentPlacements[index];
        if (!p) return;

        const scaleX = VIRTUAL_CANVAS_W / rect.width;
        const scaleY = VIRTUAL_CANVAS_H / rect.height;

        dragStateRef.current = {
            mode: 'drag',
            index,
            startX: e.clientX,
            startY: e.clientY,
            initialX: p.x,
            initialY: p.y,
            initialW: p.width,
            initialH: p.height,
            scaleX,
            scaleY
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

            // 18px Magnetic snap to center X (960) & canvas borders
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

            // 18px Magnetic snap to center Y (540) & canvas borders
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
            if (onUpdateCanvasLayoutTimeline) onUpdateCanvasLayoutTimeline(internalTimeline);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDownResize = (e, index) => {
        if (e.button !== 0) return;
        e.stopPropagation();
        e.preventDefault();

        setSelectedFeedIndex(index);

        if (!canvasFrameRef.current) return;
        const rect = canvasFrameRef.current.getBoundingClientRect();
        const p = currentPlacements[index];
        if (!p) return;

        const scaleX = VIRTUAL_CANVAS_W / rect.width;
        const scaleY = VIRTUAL_CANVAS_H / rect.height;

        dragStateRef.current = {
            mode: 'resize',
            index,
            startX: e.clientX,
            startY: e.clientY,
            initialX: p.x,
            initialY: p.y,
            initialW: p.width,
            initialH: p.height,
            scaleX,
            scaleY
        };

        setIsResizing(true);

        const handleMouseMove = (moveEv) => {
            if (!dragStateRef.current || dragStateRef.current.mode !== 'resize') return;
            const ds = dragStateRef.current;
            const dw = (moveEv.clientX - ds.startX) * ds.scaleX;
            const dh = (moveEv.clientY - ds.startY) * ds.scaleY;

            let newW = clamp(Math.round(ds.initialW + dw), 200, VIRTUAL_CANVAS_W - ds.initialX);
            let newH = clamp(Math.round(ds.initialH + dh), 112, VIRTUAL_CANVAS_H - ds.initialY);

            // Shift key lock to 16:9
            if (moveEv.shiftKey) {
                newH = Math.round(newW * (9 / 16));
            }

            setInternalTimeline(prev => {
                const nextKfs = [...(prev.keyframes || [])];
                if (!nextKfs[safeActiveIdx]) return prev;
                const placements = [...(nextKfs[safeActiveIdx].layout.placements || [])];
                if (!placements[ds.index]) return prev;
                placements[ds.index] = { ...placements[ds.index], width: newW, height: newH };
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
            if (onUpdateCanvasLayoutTimeline) onUpdateCanvasLayoutTimeline(internalTimeline);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    // Styling Updaters for Selected Feed
    const handleUpdateSelectedStyle = (updates) => {
        const next = currentPlacements.map((p, idx) => {
            if (idx === selectedFeedIndex) {
                return { ...p, ...updates };
            }
            return p;
        });
        updateActivePlacements(next);
    };

    const handleRotateStep = (degrees = 90) => {
        const target = currentPlacements[selectedFeedIndex];
        if (!target) return;
        const curRot = target.rotation || 0;
        const nextRot = (curRot + degrees) % 360;
        handleUpdateSelectedStyle({ rotation: nextRot });
    };

    const handleZIndexStep = (dir = 1) => {
        const target = currentPlacements[selectedFeedIndex];
        if (!target) return;
        const curZ = target.zIndex || 0;
        handleUpdateSelectedStyle({ zIndex: Math.max(0, curZ + dir) });
    };

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

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && isGridFullscreen) {
                setIsGridFullscreen(false);
            }
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, [isGridFullscreen]);

    // Hotkey: F for Fullscreen Grid, Space for Play/Pause All
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
    const selectedPlacement = currentPlacements[selectedFeedIndex] || null;

    return (
        <div
            ref={viewportRootRef}
            onMouseMove={handleMouseMove}
            className={`multicam-viewport-root ${isSoloMode ? 'solo' : 'canvas-grid'} ${isGridFullscreen ? 'fullscreen-grid-active' : ''}`}
        >
            {/* Global Transparent Drag Shield ensuring 100% mouse capture */}
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

            {/* Master Canvas Mode Bar: Presets & Layouts */}
            <div className="multicam-composition-mode-bar">
                <div className="comp-mode-left">
                    <span className="comp-icon">🎛️</span>
                    <span className="comp-title">LIVE CANVAS COMPOSER:</span>

                    {/* Canvas Presets Toolbar */}
                    <div className="comp-pill-group layouts">
                        <button
                            type="button"
                            className="btn-comp-tab"
                            onClick={() => handleApplyPreset('auto')}
                            title="Auto-Pack: Neatly arrange all available stations & displays in 16:9"
                        >
                            ⊞ AUTO-PACK ALL ({availableFeeds.length})
                        </button>
                        <button
                            type="button"
                            className="btn-comp-tab"
                            onClick={() => handleApplyPreset('1x1')}
                            title="Single Feed (1x1 Full Screen Master Frame)"
                        >
                            ⊞ 1x1 FOCUS
                        </button>
                        <button
                            type="button"
                            className="btn-comp-tab"
                            onClick={() => handleApplyPreset('1x2')}
                            title="Side-by-Side Dual Feeds (1x2 Master Frame)"
                        >
                            ⊞ 1x2 DUAL
                        </button>
                        <button
                            type="button"
                            className="btn-comp-tab"
                            onClick={() => handleApplyPreset('2x2')}
                            title="2x2 Quad Feeds Master Frame"
                        >
                            ⊞ 2x2 QUAD
                        </button>
                        <button
                            type="button"
                            className="btn-comp-tab"
                            onClick={() => handleApplyPreset('1+3-pip')}
                            title="Picture-in-Picture: 1 Full Master + 3 Insets"
                        >
                            ⊞ 1+3 PIP
                        </button>
                        <button
                            type="button"
                            className="btn-comp-tab"
                            onClick={() => handleApplyPreset('3-grid')}
                            title="3 Feeds (Top Dual + Bottom Center)"
                        >
                            ⊞ 3-GRID
                        </button>
                    </div>

                    {/* Auto-Director Toggle */}
                    <button
                        type="button"
                        className={`btn-director-toggle ${isAutoDirectorEnabled ? 'is-on' : 'is-off'}`}
                        onClick={onToggleAutoDirector}
                        title={isAutoDirectorEnabled ? "Auto-Director is ON: follows active activity cuts across keyframes" : "Auto-Director is OFF"}
                    >
                        <span className="dot" />
                        <span>AUTO-DIRECTOR: {isAutoDirectorEnabled ? 'ON' : 'OFF'}</span>
                    </button>
                </div>

                {/* Center WYSIWYG Badge */}
                <div className="comp-mode-center">
                    <div className="wysiwyg-export-badge" title="What You See Is What You Get: Exact Master Canvas Export Preview">
                        <span className="dot live" />
                        <span className="badge-text">WYSIWYG LIVE CANVAS STUDIO</span>
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

            {/* Layout Keyframes Strip Bar */}
            {!isSoloMode && (
                <div className="canvas-keyframes-strip-bar">
                    <div className="strip-left">
                        <span className="strip-label">❖ LAYOUT KEYFRAMES:</span>
                        <div className="keyframe-pills-scroll">
                            {keyframes.map((kf, kIdx) => {
                                const isActive = kIdx === safeActiveIdx;
                                const clockStr = formatTimelineClock(kf.timestampEpochMs, timeMode, { includeSeconds: true });
                                return (
                                    <button
                                        key={`kf-pill-${kIdx}-${kf.timestampEpochMs}`}
                                        type="button"
                                        className={`btn-kf-pill ${isActive ? 'is-active' : ''}`}
                                        onClick={() => {
                                            if (setActiveKfIndex) setActiveKfIndex(kIdx);
                                            if (setPlayheadMs) {
                                                const targetMs = Math.max(0, kf.timestampEpochMs - baseEpochMs);
                                                setPlayheadMs(targetMs);
                                            }
                                        }}
                                        title={`Jump to Keyframe #${kIdx + 1} at ${clockStr}`}
                                    >
                                        <span className="kf-icon">❖</span>
                                        <span className="kf-idx">KF {kIdx + 1}</span>
                                        <span className="kf-time">{clockStr}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            className="btn-add-kf-pill"
                            onClick={handleAddKeyframeAtPlayhead}
                            title="Capture current layout as keyframe at playhead position (+)"
                        >
                            + ADD KEYFRAME
                        </button>
                    </div>

                    <div className="strip-right">
                        {currentKf && (
                            <>
                                <div className="transition-selector-group">
                                    <span className="field-label">ANIMATION:</span>
                                    <select
                                        value={currentKf.transitionType || 'smooth'}
                                        onChange={(e) => {
                                            const newType = e.target.value;
                                            setInternalTimeline(prev => {
                                                const nextKfs = [...(prev.keyframes || [])];
                                                if (!nextKfs[safeActiveIdx]) return prev;
                                                nextKfs[safeActiveIdx] = { ...nextKfs[safeActiveIdx], transitionType: newType };
                                                const nextTimeline = { ...prev, keyframes: nextKfs };
                                                if (onUpdateCanvasLayoutTimeline) onUpdateCanvasLayoutTimeline(nextTimeline);
                                                return nextTimeline;
                                            });
                                        }}
                                        className="select-transition"
                                        title="Select transition animation to this keyframe"
                                    >
                                        <option value="smooth">Smooth Ease (Glide)</option>
                                        <option value="linear">Linear Speed</option>
                                        <option value="cut">Instant Cut</option>
                                        <option value="fade">Crossfade Opacity</option>
                                        <option value="dip">Millisecond Dip-to-Black</option>
                                    </select>

                                    <select
                                        value={String(currentKf.transitionDurationSec ?? 0.5)}
                                        onChange={(e) => {
                                            const newDur = parseFloat(e.target.value);
                                            setInternalTimeline(prev => {
                                                const nextKfs = [...(prev.keyframes || [])];
                                                if (!nextKfs[safeActiveIdx]) return prev;
                                                nextKfs[safeActiveIdx] = { ...nextKfs[safeActiveIdx], transitionDurationSec: newDur };
                                                const nextTimeline = { ...prev, keyframes: nextKfs };
                                                if (onUpdateCanvasLayoutTimeline) onUpdateCanvasLayoutTimeline(nextTimeline);
                                                return nextTimeline;
                                            });
                                        }}
                                        className="select-duration"
                                        title="Transition duration in seconds"
                                    >
                                        <option value="0.25">0.25s</option>
                                        <option value="0.5">0.5s</option>
                                        <option value="1.0">1.0s</option>
                                        <option value="1.5">1.5s</option>
                                        <option value="2.0">2.0s</option>
                                    </select>
                                </div>

                                <button
                                    type="button"
                                    className="btn-strip-action"
                                    onClick={handleApplyLayoutToAll}
                                    title="Copy current canvas arrangement to all timeline keyframes"
                                >
                                    📋 APPLY TO ALL
                                </button>

                                {keyframes.length > 1 && (
                                    <button
                                        type="button"
                                        className="btn-strip-delete"
                                        onClick={handleDeleteActiveKeyframe}
                                        title="Delete active keyframe"
                                    >
                                        🗑️
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}

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

            {/* View Mode B: Interactive Live Master Canvas Stage (WYSIWYG 16:9 Frame) */}
            {!isSoloMode && (
                <div className="canvas-stage-wrapper">
                    <div
                        ref={canvasFrameRef}
                        className="canvas-master-frame-16-9"
                    >
                        {/* 16:9 Master Frame Corner Accents */}
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
                                    boxShadow: '0 0 10px #06B6D4',
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
                                    boxShadow: '0 0 10px #06B6D4',
                                    zIndex: 9999,
                                    pointerEvents: 'none'
                                }}
                            />
                        )}

                        {/* Interactive Feed Boxes on Canvas */}
                        {activeDisplayPlacements.map((p, sIdx) => {
                            const isSelected = selectedFeedIndex === sIdx;
                            const isThisDragging = isDragging && selectedFeedIndex === sIdx;
                            const isThisResizing = isResizing && selectedFeedIndex === sIdx;
                            const st = timelineStations.find(s => s.id === p.stationId) || { id: p.stationId, displayName: p.label || p.stationId };
                            const bColor = p.borderColor || SLOT_BORDER_COLORS[sIdx % SLOT_BORDER_COLORS.length];
                            const bWidth = p.borderWidth !== undefined ? p.borderWidth : 2;
                            const rot = p.rotation || 0;
                            const op = p.opacity !== undefined ? p.opacity : 1;

                            const leftPct = (p.x / VIRTUAL_CANVAS_W) * 100;
                            const topPct = (p.y / VIRTUAL_CANVAS_H) * 100;
                            const widthPct = (p.width / VIRTUAL_CANVAS_W) * 100;
                            const heightPct = (p.height / VIRTUAL_CANVAS_H) * 100;

                            return (
                                <div
                                    key={`feed-${p.stationId}-${p.displayId}-${sIdx}`}
                                    className={`canvas-feed-card-box ${isSelected ? 'is-selected' : ''} ${isThisDragging ? 'is-dragging' : ''} ${isThisResizing ? 'is-resizing' : ''}`}
                                    style={{
                                        position: 'absolute',
                                        left: `${leftPct}%`,
                                        top: `${topPct}%`,
                                        width: `${widthPct}%`,
                                        height: `${heightPct}%`,
                                        zIndex: isSelected ? 1000 : (p.zIndex || sIdx),
                                        transform: `rotate(${rot}deg)`,
                                        transformOrigin: 'center center',
                                        border: `${bWidth}px solid ${bColor}`,
                                        opacity: op,
                                        boxShadow: isSelected ? `0 0 20px ${bColor}, inset 0 0 12px rgba(6, 182, 212, 0.2)` : undefined,
                                        cursor: isThisDragging ? 'grabbing' : 'grab',
                                        transition: (isThisDragging || isThisResizing) ? 'none' : 'left 0.15s ease-out, top 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out, transform 0.15s ease-out'
                                    }}
                                    onMouseDown={(e) => handleMouseDownBox(e, sIdx)}
                                    onContextMenu={(e) => onStationContextMenu && onStationContextMenu(e, st)}
                                >
                                    {/* Top Draggable Bar & Coordinates */}
                                    <div className="box-header-badge">
                                        <div className="badge-title">
                                            <span className="dot-indicator" />
                                            <span>{p.label || `${st.displayName || p.stationId} (${p.displayId})`}</span>
                                        </div>
                                        <div className="badge-coords">
                                            {Math.round(p.width)}×{Math.round(p.height)} @ ({Math.round(p.x)},{Math.round(p.y)})
                                            {rot !== 0 && <span className="badge-rot">📐{rot}°</span>}
                                        </div>
                                        <span className="badge-layer">L{p.zIndex || sIdx}</span>
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
                                                    if (idx === sIdx) {
                                                        return { ...pl, displayId: dispId };
                                                    }
                                                    return pl;
                                                });
                                                updateActivePlacements(next);
                                            }}
                                            slotIndex={sIdx}
                                            borderColor={bColor}
                                        />

                                        {/* Transparent Drag Surface overlay allowing instant drag over video */}
                                        <div
                                            className="card-drag-surface"
                                            title="Click and drag anywhere to move this window on the canvas"
                                        />
                                    </div>

                                    {/* Bottom-Right Corner Resize Handle */}
                                    <div
                                        className="resize-handle-br"
                                        onMouseDown={(e) => handleMouseDownResize(e, sIdx)}
                                        title="Drag to resize dimensions (Hold Shift for 16:9 aspect lock)"
                                    >
                                        ↘
                                    </div>

                                    {/* Selected Floating Tactical Inspector */}
                                    {isSelected && selectedPlacement && (
                                        <div className="floating-feed-inspector" onMouseDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
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
                                                        title="Rotation Angle (-180° to +180°)"
                                                    />
                                                )}
                                            </div>

                                            {/* Layer Depth */}
                                            <div className="inspector-group layer">
                                                <button
                                                    type="button"
                                                    className="btn-action-tool"
                                                    onClick={() => handleZIndexStep(1)}
                                                    title="Bring Forward (Higher Layer)"
                                                >
                                                    ▲ LAYER
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn-action-tool"
                                                    onClick={() => handleZIndexStep(-1)}
                                                    title="Send Backward (Lower Layer)"
                                                >
                                                    ▼
                                                </button>
                                            </div>

                                            {/* Maximize to full 16:9 */}
                                            <button
                                                type="button"
                                                className="btn-action-tool highlight"
                                                onClick={() => handleApplyPreset('1x1')}
                                                title="Maximize this feed to fill entire 16:9 canvas"
                                            >
                                                ⛶ MAX
                                            </button>

                                            {/* Solo Focus Action */}
                                            <button
                                                type="button"
                                                className="btn-action-tool"
                                                onClick={() => onSelectActiveStation && onSelectActiveStation(st.id)}
                                                title="Solo focus inspection"
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

            {/* Fullscreen Grid Floating Tactical Transport Dock */}
            {isGridFullscreen && (
                <div
                    className={`grid-fullscreen-floating-dock ${showHudControls ? 'visible' : 'hidden'}`}
                    onMouseEnter={() => setShowHudControls(true)}
                >
                    <div className="dock-glass-panel">
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

                        <div className="dock-clock-badge">
                            <span className="dot live" />
                            <span className="clock-text">
                                {formatTimelineClock(currentEpochMs, timeMode)}
                            </span>
                        </div>

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
