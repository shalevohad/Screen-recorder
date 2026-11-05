// ==========================================
// File: Features/ExtractorAdvanced/Client/src/ExtractorAdvancedStudio.jsx
// ==========================================
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import TopScopeBar from './components/TopScopeBar/TopScopeBar.jsx';
import MulticamViewport from './components/Viewport/MulticamViewport.jsx';
import TransportBar from './components/TransportBar/TransportBar.jsx';
import TimelineBoard from './components/Timeline/TimelineBoard.jsx';
import StationDrawer from './components/StationDrawer/StationDrawer.jsx';
import MasterTimeRangeModal from './components/Modals/MasterTimeRangeModal.jsx';
import BookmarksModal from './components/Modals/BookmarksModal.jsx';
import SoloSpotlightModal from './components/Modals/SoloSpotlightModal.jsx';
import ShortcutsHelpModal from './components/Modals/ShortcutsHelpModal.jsx';
import ExportJobMonitor from './components/ExportMonitor/ExportJobMonitor.jsx';
import StationContextMenu from './components/Modals/StationContextMenu.jsx';
import ExportOptionsModal from './components/Modals/ExportOptionsModal.jsx';

import { useStudioData } from './hooks/useStudioData.js';
import { usePlaybackEngine } from './hooks/usePlaybackEngine.js';
import { useTimelineNavigation } from './hooks/useTimelineNavigation.js';
import { useStudioHotkeys } from './hooks/useStudioHotkeys.js';
import { updateKeyframeTransition } from './utils/nleTimelineEngine.js';
import { getStudioSessionCache, saveStudioSessionCache, clearStudioSessionCache } from './utils/studioSessionStore.js';
import { initDstEngineAsync, formatDateTimeComponents, dateTimeToEpochMs } from './utils/dstEngine.js';
import { formatTimelineClock } from './utils/timeFormat.js';
import { getCurrentOperatorName } from './utils/operatorStore.js';
import { waveformStore } from './utils/waveformStore.js';

import './components/ExportMonitor/ExportJobMonitor.scss';
import './ExtractorAdvancedStudio.scss';

const generateDefaultTimeRange = (mode = 'LOCAL') => {
    const now = Date.now();
    const fourHoursAgo = now - (4 * 60 * 60 * 1000);
    const sComp = formatDateTimeComponents(fourHoursAgo, mode);
    const eComp = formatDateTimeComponents(now, mode);
    return {
        start: sComp.fullStr,
        end: eComp.fullStr,
        startEpochMs: fourHoursAgo,
        endEpochMs: now,
        durationMs: 14400000
    };
};

export const parseSafeEpoch = (dateStr, timeStr = null, mode = 'LOCAL') => {
    if (!dateStr) return Date.now();
    if (typeof dateStr === 'number') return dateStr;
    const str = String(dateStr).trim();
    if (/^\d+$/.test(str)) return Number(str);
    
    let d = str;
    let t = timeStr;
    if (!t) {
        if (str.includes('T')) {
            const parts = str.split('T');
            d = parts[0];
            t = parts[1];
        } else if (str.includes(' ')) {
            const parts = str.split(' ');
            d = parts[0];
            t = parts[1];
        }
    }

    if (d && t) {
        const cleanT = t.substring(0, 8);
        const epoch = dateTimeToEpochMs(d, cleanT, mode);
        if (epoch !== null && !isNaN(epoch)) return epoch;
    }

    const safeStr = str.replace(' ', 'T');
    const ms = new Date(safeStr).getTime();
    return isNaN(ms) ? Date.now() : ms;
};

export default function ExtractorAdvancedStudio() {
    const cached = useMemo(() => getStudioSessionCache() || {}, []);

    const [timeRange, setTimeRange] = useState(() => {
        if (cached.timeRange?.startEpochMs && cached.timeRange?.endEpochMs) {
            return cached.timeRange;
        }
        return generateDefaultTimeRange();
    });

    const [timeMode, setTimeMode] = useState(cached.timeMode || 'LOCAL');
    const [keystrokeMode, setKeystrokeMode] = useState(cached.keystrokeMode || 'BURN_IN');
    const [showRulerKeystrokes, setShowRulerKeystrokes] = useState(() => {
        return typeof cached.showRulerKeystrokes === 'boolean' ? cached.showRulerKeystrokes : false;
    });

    useEffect(() => {
        initDstEngineAsync().catch(err => console.warn('[Studio] DST init error:', err));
    }, []);

    const baseEpochMs = useMemo(() => {
        if (timeRange.startEpochMs) return timeRange.startEpochMs;
        return parseSafeEpoch(timeRange.start);
    }, [timeRange.start, timeRange.startEpochMs]);

    const bufferMs = useMemo(() => Math.max(60000, Math.round(timeRange.durationMs * 0.05)), [timeRange.durationMs]);
    const timelineBaseEpochMs = useMemo(() => baseEpochMs - bufferMs, [baseEpochMs, bufferMs]);
    const totalTimelineDurationMs = useMemo(() => timeRange.durationMs + (2 * bufferMs), [timeRange.durationMs, bufferMs]);

    const [selectedStationIds, setSelectedStationIds] = useState(cached.selectedStationIds || []);
    const [activeStationId, setActiveStationId] = useState(cached.activeStationId || null);
    const [spotlightStationId, setSpotlightStationId] = useState(null);
    const [spotlightInitialDisplayId, setSpotlightInitialDisplayId] = useState(null);
    const [globalGaps, setGlobalGaps] = useState([]);
    const [noStationsAlert, setNoStationsAlert] = useState(false);

    const [stationContextMenu, setStationContextMenu] = useState(null);

    // Universal Studio Composition Engine State
    const [compositionScope, setCompositionScope] = useState(() => {
        return cached.compositionScope || (cached.selectedStationIds?.length > 1 ? 'inter-station' : 'intra-station');
    });
    // Solo mode: defaults automatically to 'canvas' while remembering the operator's last layout choice
    const [compositionLayout, setCompositionLayoutState] = useState(() => {
        try {
            const saved = localStorage.getItem('itb_composition_layout');
            if (saved) return saved;
        } catch {}
        return cached.compositionLayout || 'canvas';
    });
    const setCompositionLayout = useCallback((layout) => {
        setCompositionLayoutState(prev => {
            const next = typeof layout === 'function' ? layout(prev) : layout;
            try {
                localStorage.setItem('itb_composition_layout', next);
            } catch {}
            return next;
        });
    }, []);
    const [isAutoDirectorEnabled, setIsAutoDirectorEnabled] = useState(() => {
        return typeof cached.isAutoDirectorEnabled === 'boolean' ? cached.isAutoDirectorEnabled : true;
    });
    const [isPipSwapped, setIsPipSwapped] = useState(() => {
        return Boolean(cached.isPipSwapped);
    });

    // Audio Routing Track State
    const [audioRoutingPlan, setAudioRoutingPlan] = useState(() => {
        return cached.audioRoutingPlan || null;
    });
    const [isAutoFollowAudio, setIsAutoFollowAudio] = useState(() => {
        return typeof cached.isAutoFollowAudio === 'boolean' ? cached.isAutoFollowAudio : true;
    });

    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [currentCanvasLayout, setCurrentCanvasLayout] = useState(null);
    const [canvasLayoutTimeline, setCanvasLayoutTimeline] = useState(() => {
        return cached.canvasLayoutTimeline || null;
    });
    const [activeKfIndex, setActiveKfIndex] = useState(0);

    const handleAddKeyframeAtEpoch = useCallback((targetEpoch) => {
        setCanvasLayoutTimeline(prev => {
            const currentKfs = [...(prev?.keyframes || [])];
            const existingIdx = currentKfs.findIndex(k => Math.abs(k.timestampEpochMs - targetEpoch) < 300);
            if (existingIdx >= 0) {
                setActiveKfIndex(existingIdx);
                return prev;
            }

            const activeKf = currentKfs[activeKfIndex] || currentKfs[0];
            const activeLayout = activeKf?.layout || currentCanvasLayout || {
                width: 1920,
                height: 1080,
                backgroundColor: '#070A10',
                fps: 30.0,
                placements: []
            };

            const newKf = {
                id: `kf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
                timestampEpochMs: Math.round(targetEpoch),
                transitionDurationSec: 0.5,
                transitionType: 'smooth',
                layout: JSON.parse(JSON.stringify(activeLayout))
            };

            const nextKfs = [...currentKfs, newKf].sort((a, b) => a.timestampEpochMs - b.timestampEpochMs);
            const newIdx = nextKfs.findIndex(k => k.timestampEpochMs === Math.round(targetEpoch));
            setActiveKfIndex(newIdx >= 0 ? newIdx : 0);

            return {
                ...(prev || {}),
                width: 1920,
                height: 1080,
                backgroundColor: '#070A10',
                fps: 30.0,
                keyframes: nextKfs
            };
        });
    }, [activeKfIndex, currentCanvasLayout]);

    const handleUpdateKeyframeTransition = useCallback((idx, patch) => {
        setCanvasLayoutTimeline(prev => {
            if (!prev?.keyframes || prev.keyframes.length === 0) return prev;
            return updateKeyframeTransition(prev, idx, patch);
        });
    }, []);

    const handleDeleteKeyframe = useCallback((idxToDelete) => {
        setCanvasLayoutTimeline(prev => {
            if (!prev?.keyframes || prev.keyframes.length <= 1) return prev;
            const nextKfs = prev.keyframes.filter((_, i) => i !== idxToDelete);
            setActiveKfIndex(prevIdx => Math.max(0, prevIdx - 1));
            return { ...prev, keyframes: nextKfs };
        });
    }, []);


    

    const handleUpdateKeyframeEpoch = useCallback((idxOrId, newEpoch) => {
        setCanvasLayoutTimeline(prev => {
            if (!prev?.keyframes || prev.keyframes.length === 0) return prev;
            const targetEpoch = Math.round(newEpoch);
            const foundIdx = typeof idxOrId === 'number' && prev.keyframes[idxOrId]
                ? idxOrId
                : prev.keyframes.findIndex(k => k.id === idxOrId);
            if (foundIdx === -1) return prev;

            const nextKfs = [...prev.keyframes];
            nextKfs[foundIdx] = {
                ...nextKfs[foundIdx],
                timestampEpochMs: targetEpoch
            };
            nextKfs.sort((a, b) => a.timestampEpochMs - b.timestampEpochMs);
            const newActiveIdx = nextKfs.findIndex(k => k.timestampEpochMs === targetEpoch);
            if (newActiveIdx >= 0) setActiveKfIndex(newActiveIdx);
            return {
                ...prev,
                keyframes: nextKfs
            };
        });
    }, []);

    // Notify parent app (CommandCenterHeader) that Studio editing mode is active to auto-collapse telemetry
    useEffect(() => {
        window.dispatchEvent(new CustomEvent('itb:studio-mode', { detail: { active: true } }));
        return () => {
            window.dispatchEvent(new CustomEvent('itb:studio-mode', { detail: { active: false } }));
        };
    }, []);

    const [stationAutoDirectorMap, setStationAutoDirectorMap] = useState({});

    const handleDeselectStation = useCallback((stationId) => {
        setSelectedStationIds(prev => prev.filter(id => id !== stationId));
        if (activeStationId === stationId) setActiveStationId(null);
        if (spotlightStationId === stationId) setSpotlightStationId(null);
        // Purge deselected station from canvas layout keyframes
        setCanvasLayoutTimeline(prev => {
            if (!prev || !prev.keyframes) return prev;
            const nextKfs = prev.keyframes.map(kf => ({
                ...kf,
                layout: {
                    ...kf.layout,
                    placements: (kf.layout?.placements || []).filter(p => p.stationId !== stationId)
                }
            }));
            return { ...prev, keyframes: nextKfs };
        });
    }, [activeStationId, spotlightStationId]);

    const handleStationContextMenu = useCallback((e, station) => {
        e.preventDefault();
        e.stopPropagation();

        const menuWidth = 195;
        const menuHeight = 110;
        const x = Math.min(e.clientX, window.innerWidth - menuWidth - 10);
        const y = Math.min(e.clientY, window.innerHeight - menuHeight - 10);

        setStationContextMenu({ x, y, station });
    }, []);

    const initialInPointMs = useMemo(() => {
        if (typeof cached.inEpochMs === 'number') {
            return Math.max(0, Math.min(totalTimelineDurationMs, cached.inEpochMs - timelineBaseEpochMs));
        }
        if (typeof cached.inPointMs === 'number') {
            return Math.max(0, Math.min(totalTimelineDurationMs, cached.inPointMs));
        }
        return bufferMs;
    }, [cached.inEpochMs, cached.inPointMs, timelineBaseEpochMs, totalTimelineDurationMs, bufferMs]);

    const initialOutPointMs = useMemo(() => {
        if (typeof cached.outEpochMs === 'number') {
            return Math.max(initialInPointMs + 1000, Math.min(totalTimelineDurationMs, cached.outEpochMs - timelineBaseEpochMs));
        }
        if (typeof cached.outPointMs === 'number') {
            return Math.max(initialInPointMs + 1000, Math.min(totalTimelineDurationMs, cached.outPointMs));
        }
        return bufferMs + timeRange.durationMs;
    }, [cached.outEpochMs, cached.outPointMs, timelineBaseEpochMs, totalTimelineDurationMs, bufferMs, timeRange.durationMs, initialInPointMs]);

    const initialPlayheadMs = useMemo(() => {
        if (typeof cached.playheadEpochMs === 'number') {
            return Math.max(0, Math.min(totalTimelineDurationMs, cached.playheadEpochMs - timelineBaseEpochMs));
        }
        if (typeof cached.playheadMs === 'number') {
            return Math.max(0, Math.min(totalTimelineDurationMs, cached.playheadMs));
        }
        return initialInPointMs;
    }, [cached.playheadEpochMs, cached.playheadMs, timelineBaseEpochMs, totalTimelineDurationMs, initialInPointMs]);

    const [inPointMs, setInPointMs] = useState(initialInPointMs);
    const [outPointMs, setOutPointMs] = useState(initialOutPointMs);

    // Invariant (2026-11-04): Automatically ensure Keyframes exist at CUT boundaries (In and Out) and move with them
    useEffect(() => {
        if (!timelineBaseEpochMs) return;
        const inEpoch = Math.round(timelineBaseEpochMs + inPointMs);
        const outEpoch = Math.round(timelineBaseEpochMs + outPointMs);

        setCanvasLayoutTimeline(prev => {
            if (!prev || !prev.keyframes || prev.keyframes.length === 0) return prev;
            let kfs = [...prev.keyframes];
            let modified = false;

            // Find or bind cut-in keyframe
            let inKf = kfs.find(k => k.tag === 'cut-in');
            if (inKf) {
                if (inKf.timestampEpochMs !== inEpoch) {
                    inKf.timestampEpochMs = inEpoch;
                    modified = true;
                }
            } else {
                const nearIn = kfs.find(k => Math.abs(k.timestampEpochMs - inEpoch) < 500);
                if (nearIn) {
                    nearIn.tag = 'cut-in';
                    nearIn.timestampEpochMs = inEpoch;
                    modified = true;
                } else {
                    const baseLayout = kfs[0]?.layout || currentCanvasLayout || { width: 1920, height: 1080, placements: [] };
                    kfs.push({
                        id: `kf_cut_in_${Date.now()}`,
                        tag: 'cut-in',
                        timestampEpochMs: inEpoch,
                        transitionDurationSec: 0.5,
                        transitionType: 'smooth',
                        layout: JSON.parse(JSON.stringify(baseLayout))
                    });
                    modified = true;
                }
            }

            // Find or bind cut-out keyframe
            let outKf = kfs.find(k => k.tag === 'cut-out');
            if (outKf) {
                if (outKf.timestampEpochMs !== outEpoch) {
                    outKf.timestampEpochMs = outEpoch;
                    modified = true;
                }
            } else {
                const nearOut = kfs.find(k => Math.abs(k.timestampEpochMs - outEpoch) < 500 && k.tag !== 'cut-in');
                if (nearOut) {
                    nearOut.tag = 'cut-out';
                    nearOut.timestampEpochMs = outEpoch;
                    modified = true;
                } else {
                    const baseLayout = kfs[kfs.length - 1]?.layout || currentCanvasLayout || { width: 1920, height: 1080, placements: [] };
                    kfs.push({
                        id: `kf_cut_out_${Date.now()}`,
                        tag: 'cut-out',
                        timestampEpochMs: outEpoch,
                        transitionDurationSec: 0.5,
                        transitionType: 'smooth',
                        layout: JSON.parse(JSON.stringify(baseLayout))
                    });
                    modified = true;
                }
            }

            if (!modified) return prev;
            kfs.sort((a, b) => a.timestampEpochMs - b.timestampEpochMs);
            return {
                ...prev,
                keyframes: kfs
            };
        });
    }, [timelineBaseEpochMs, inPointMs, outPointMs, currentCanvasLayout]);

    const { allStations, recordingSegments, isLoadingStations, movieBoundaries } = useStudioData(
        timelineBaseEpochMs,
        totalTimelineDurationMs,
        timeRange,
        timeMode,
        activeStationId
    );

    const activeStation = useMemo(() => {
        return allStations.find(s => s.id === activeStationId) || null;
    }, [allStations, activeStationId]);

    const handleToggleStationAutoDirector = useCallback((stationId) => {
        setStationAutoDirectorMap(prev => {
            const nextState = !(prev[stationId] ?? true);
            // Invariant (2026-11-04): When Auto-Director is turned OFF for a station,
            // migrate any 'auto' placement for that station on the canvas to 'mon-0' (Primary Screen),
            // so the system explicitly recognizes that Screen 1 is already on the Canvas and allows removing/toggling it!
            setCanvasLayoutTimeline(layoutPrev => {
                if (!layoutPrev?.keyframes) return layoutPrev;
                const nextKfs = layoutPrev.keyframes.map(kf => {
                    const placements = kf.layout?.placements || [];
                    let modified = false;
                    const updatedPlacements = placements.map(p => {
                        if (p.stationId === stationId) {
                            if (!nextState && (p.displayId === 'auto' || !p.displayId)) {
                                modified = true;
                                const st = allStations.find(s => s.id === stationId);
                                return {
                                    ...p,
                                    displayId: 'mon-0',
                                    label: `${st?.displayName || stationId} - Screen 1 (Main)`
                                };
                            } else if (nextState && (p.displayId === 'mon-0' || !p.displayId)) {
                                const stationPlacementsCount = placements.filter(x => x.stationId === stationId).length;
                                if (stationPlacementsCount === 1) {
                                    modified = true;
                                    const st = allStations.find(s => s.id === stationId);
                                    return {
                                        ...p,
                                        displayId: 'auto',
                                        label: `${st?.displayName || stationId} - Central Composition (Auto-Director)`
                                    };
                                }
                            }
                        }
                        return p;
                    });
                    if (!modified) return kf;
                    return {
                        ...kf,
                        layout: {
                            ...kf.layout,
                            placements: updatedPlacements
                        }
                    };
                });
                return { ...layoutPrev, keyframes: nextKfs };
            });

            return {
                ...prev,
                [stationId]: nextState
            };
        });
    }, [allStations]);

    const handleToggleDisplayOnCanvas = useCallback((stationId, displayId) => {
        setCanvasLayoutTimeline(prev => {
            if (!prev || !prev.keyframes || prev.keyframes.length === 0) return prev;
            const targetKfIdx = activeKfIndex >= 0 && activeKfIndex < prev.keyframes.length ? activeKfIndex : 0;
            const currentKf = prev.keyframes[targetKfIdx];
            const placements = currentKf?.layout?.placements || [];
            const normDispId = (displayId || 'mon-0').toLowerCase();
            const existingIdx = placements.findIndex(p => {
                if (p.stationId !== stationId) return false;
                const pDisp = (p.displayId || 'mon-0').toLowerCase();
                if (pDisp === normDispId) return true;
                if (pDisp === 'auto' && (normDispId === 'mon-0' || normDispId === 'screen-0')) return true;
                return false;
            });

            let nextPlacements;
            if (existingIdx >= 0) {
                nextPlacements = placements.filter((_, i) => i !== existingIdx);
            } else {
                const st = allStations.find(s => s.id === stationId);
                const disp = st?.displays?.find(d => (d.displayId || '').toLowerCase() === normDispId) || { displayId: normDispId, width: 1920, height: 1080 };
                const srcW = disp.width || 1920;
                const srcH = disp.height || 1080;
                const aspect = srcW / srcH;
                const initW = aspect >= 1 ? 640 : Math.round(360 * aspect);
                const initH = aspect >= 1 ? Math.round(640 / aspect) : 360;
                const newPlacement = {
                    stationId,
                    displayId: normDispId,
                    label: `${st?.displayName || stationId} - ${disp.displayName || normDispId}`,
                    x: 120 + (placements.length * 40) % 800,
                    y: 100 + (placements.length * 40) % 500,
                    width: initW,
                    height: initH,
                    sourceWidth: srcW,
                    sourceHeight: srcH,
                    nativeAspectRatio: aspect,
                    aspectRatio: aspect,
                    zIndex: placements.length,
                    rotation: 0,
                    borderWidth: 2,
                    borderColor: '#06B6D4',
                    shadowEffect: 'deep',
                    borderRadius: 0
                };
                nextPlacements = [...placements, newPlacement];
            }

            const nextKfs = [...prev.keyframes];
            nextKfs[targetKfIdx] = {
                ...nextKfs[targetKfIdx],
                layout: {
                    ...nextKfs[targetKfIdx].layout,
                    placements: nextPlacements
                }
            };
            return { ...prev, keyframes: nextKfs };
        });
    }, [activeKfIndex, allStations]);

    const timelineStations = useMemo(() => {
        if (!selectedStationIds || selectedStationIds.length === 0) return [];
        return allStations.filter(s => selectedStationIds.includes(s.id));
    }, [allStations, selectedStationIds]);

    // Guarantee Root Keyframe and Cut Out Keyframe on session mount
    useEffect(() => {
        if (!timelineBaseEpochMs || isNaN(timelineBaseEpochMs)) return;
        setCanvasLayoutTimeline(prev => {
            if (prev?.keyframes && prev.keyframes.length > 0) return prev;
            const inEpoch = timelineBaseEpochMs + (inPointMs || 0);
            const outEpoch = timelineBaseEpochMs + (outPointMs || totalTimelineDurationMs || 3600000);
            const initialLayout = currentCanvasLayout || {
                width: 1920,
                height: 1080,
                backgroundColor: "#070A10",
                fps: 30.0,
                placements: []
            };
            return {
                width: 1920,
                height: 1080,
                backgroundColor: "#070A10",
                fps: 30.0,
                keyframes: [
                    {
                        id: `kf_root_${inEpoch}`,
                        timestampEpochMs: Math.round(inEpoch),
                        transitionDurationSec: 0.5,
                        transitionType: "smooth",
                        layout: JSON.parse(JSON.stringify(initialLayout))
                    },
                    {
                        id: `kf_out_${outEpoch}`,
                        timestampEpochMs: Math.round(outEpoch),
                        transitionDurationSec: 0.5,
                        transitionType: "smooth",
                        layout: JSON.parse(JSON.stringify(initialLayout))
                    }
                ]
            };
        });
    }, [timelineBaseEpochMs, inPointMs, outPointMs, totalTimelineDurationMs, currentCanvasLayout]);

    // Pre-fetch real acoustic waveforms for timeline stations across active cut interval for zero-time instant display
    useEffect(() => {
        if (!timelineStations || timelineStations.length === 0 || !timelineBaseEpochMs || isNaN(timelineBaseEpochMs)) return;
        const inEpoch = timelineBaseEpochMs + (inPointMs || 0);
        const outEpoch = timelineBaseEpochMs + (outPointMs || totalTimelineDurationMs || 3600000);
        if (outEpoch <= inEpoch) return;

        timelineStations.forEach(st => {
            waveformStore.fetchWaveform(st.id, inEpoch, outEpoch, null, 250);
        });
    }, [timelineStations, timelineBaseEpochMs, inPointMs, outPointMs, totalTimelineDurationMs]);

    const spotlightStation = useMemo(() => {
        return allStations.find(s => s.id === spotlightStationId) || null;
    }, [allStations, spotlightStationId]);

    // Spotlight fullscreen display state
    const isSpotlightOpen = Boolean(spotlightStationId && spotlightStation);

    const lastViewBeforeFullscreenRef = useRef('grid');
    const timelineContainerRef = useRef(null);

    const {
        playheadMs,
        setPlayheadMs,
        isPlaying,
        setIsPlaying,
        playbackSpeed,
        setPlaybackSpeed,
        isLooping,
        setIsLooping,
        togglePlaySmart
    } = usePlaybackEngine({
        timelineBaseEpochMs,
        inPointMs,
        outPointMs,
        globalGaps,
        activeStation,
        spotlightStation,
        recordingSegments,
        initialPlayheadMs,
        initialIsPlaying: false,
        initialIsLooping: cached.isLooping !== undefined ? cached.isLooping : true,
        initialPlaybackSpeed: cached.playbackSpeed || 1,
        isGridMode: !activeStationId
    });

    const {
        zoomLevel,
        setZoomLevel,
        viewportStartMs,
        setViewportStartMs,
        resetZoom,
        fitRange,
        jumpViewportTo
    } = useTimelineNavigation({
        containerRef: timelineContainerRef,
        totalTimelineDurationMs,
        initialZoom: cached.zoomLevel || 1,
        initialViewportStart: cached.viewportStartMs || 0
    });

    const [isRangeModalOpen, setIsRangeModalOpen] = useState(false);
    const [isBookmarksModalOpen, setIsBookmarksModalOpen] = useState(false);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isWorkspaceActive, setIsWorkspaceActive] = useState(
        Boolean(cached.isWorkspaceActive && cached.selectedStationIds?.length > 0)
    );

    const [activeStationKeystrokes, setActiveStationKeystrokes] = useState([]);

    useEffect(() => {
        const targetStation = isSpotlightOpen ? (spotlightStation || activeStation) : activeStation;
        const stationName = targetStation?.hostname || targetStation?.displayName || targetStation?.id;
        const normalizedMode = (keystrokeMode || 'NONE').toUpperCase().replace('-', '_');
        const shouldFetch = (normalizedMode !== 'NONE' && normalizedMode !== 'OFF') || showRulerKeystrokes;

        if (!stationName || !timelineBaseEpochMs || !shouldFetch) {
            setActiveStationKeystrokes([]);
            return;
        }

        const startEpoch = Math.max(0, timelineBaseEpochMs - 5000);
        const endEpoch = timelineBaseEpochMs + totalTimelineDurationMs + 5000;
        const ac = new AbortController();

        fetch(`/api/v1/extractor-advanced/keystrokes?stationId=${encodeURIComponent(stationName)}&startEpoch=${startEpoch}&endEpoch=${endEpoch}`, { signal: ac.signal })
            .then(res => res.ok ? res.json() : [])
            .then(data => setActiveStationKeystrokes(Array.isArray(data) ? data : []))
            .catch(err => {
                if (err.name !== 'AbortError') setActiveStationKeystrokes([]);
            });

        return () => ac.abort();
    }, [activeStation, spotlightStation, isSpotlightOpen, timelineBaseEpochMs, totalTimelineDurationMs, keystrokeMode, showRulerKeystrokes]);

// Single station opens directly into Master Canvas Grid for WYSIWYG editing

    useEffect(() => {
        if (isLoadingStations) return;

        if (allStations.length === 0) {
            if (selectedStationIds.length > 0 || activeStationId || isWorkspaceActive) {
                setSelectedStationIds([]);
                setActiveStationId(null);
                setSpotlightStationId(null);
                setIsWorkspaceActive(false);
            }
            setIsDrawerOpen(true);
            setNoStationsAlert(true);
        } else {
            setNoStationsAlert(false);

            setSelectedStationIds(prev => {
                const valid = prev.filter(id => allStations.some(s => s.id === id));
                if (valid.length !== prev.length) {
                    if (valid.length === 0) {
                        setIsWorkspaceActive(false);
                        setIsDrawerOpen(true);
                    }
                    return valid;
                }
                return prev;
            });
        }
    }, [isLoadingStations, allStations]);

    const handleSelectActiveStation = useCallback((id) => {
        if (id === null) {
            setIsPlaying(false);
            setPlaybackSpeed(1);
            setActiveStationId(null);
            return;
        }
        if (id !== activeStationId) {
            setPlaybackSpeed(1);
        }
        setActiveStationId(id);
    }, [activeStationId, setIsPlaying, setPlaybackSpeed]);

    const handleOpenSpotlightFullscreen = useCallback((id, targetDisplayId = null) => {
        if (id !== activeStationId) setPlaybackSpeed(1);
        lastViewBeforeFullscreenRef.current = (selectedStationIds.length <= 1 || activeStationId) ? 'spotlight' : 'grid';
        setActiveStationId(id);
        setSpotlightStationId(id);
        setSpotlightInitialDisplayId(targetDisplayId || null);
    }, [activeStationId, selectedStationIds.length, setPlaybackSpeed]);

    const handleCloseSpotlightFullscreen = useCallback(() => {
        setSpotlightStationId(null);
        setSpotlightInitialDisplayId(null);
        if (lastViewBeforeFullscreenRef.current === 'grid') {
            setActiveStationId(null);
        }
    }, []);

    // Master Audio Routing Management
    const effectiveAudioPlan = useMemo(() => {
        if (audioRoutingPlan?.segments && audioRoutingPlan.segments.length > 0) {
            return audioRoutingPlan;
        }
        const defaultStationId = selectedStationIds[0] || activeStationId || 'mon-0';
        return {
            segments: [
                {
                    startEpochMs: timelineBaseEpochMs,
                    endEpochMs: timelineBaseEpochMs + totalTimelineDurationMs,
                    sourceStationId: defaultStationId
                }
            ]
        };
    }, [audioRoutingPlan, selectedStationIds, activeStationId, timelineBaseEpochMs, totalTimelineDurationMs]);

    const handleSplitAudioSegment = useCallback((splitEpochMs) => {
        setAudioRoutingPlan(prev => {
            const plan = prev || effectiveAudioPlan;
            const segments = [...(plan.segments || [])];
            const segIdx = segments.findIndex(seg => {
                const s = seg.startEpochMs ?? seg.StartEpochMs ?? 0;
                const e = seg.endEpochMs ?? seg.EndEpochMs ?? 0;
                return splitEpochMs > s + 500 && splitEpochMs < e - 500;
            });
            if (segIdx === -1) return prev;

            const targetSeg = segments[segIdx];
            const s = targetSeg.startEpochMs ?? targetSeg.StartEpochMs ?? 0;
            const e = targetSeg.endEpochMs ?? targetSeg.EndEpochMs ?? 0;
            const stId = targetSeg.sourceStationId ?? targetSeg.SourceStationId ?? selectedStationIds[0];

            const seg1 = { startEpochMs: s, endEpochMs: splitEpochMs, sourceStationId: stId };
            const seg2 = { startEpochMs: splitEpochMs, endEpochMs: e, sourceStationId: stId };

            segments.splice(segIdx, 1, seg1, seg2);
            return { ...plan, segments };
        });
    }, [effectiveAudioPlan, selectedStationIds]);

    const handleChangeAudioSegmentStation = useCallback((segmentEpochMs, newStationId) => {
        setAudioRoutingPlan(prev => {
            const plan = prev || effectiveAudioPlan;
            const segments = (plan.segments || []).map(seg => {
                const s = seg.startEpochMs ?? seg.StartEpochMs ?? 0;
                const e = seg.endEpochMs ?? seg.EndEpochMs ?? 0;
                if (segmentEpochMs >= s && segmentEpochMs <= e) {
                    return { ...seg, sourceStationId: newStationId };
                }
                return seg;
            });
            return { ...plan, segments };
        });
        setIsAutoFollowAudio(false);
    }, [effectiveAudioPlan]);

    const handleChangeAudioSegmentGain = useCallback((segmentEpochMs, newGain) => {
        setAudioRoutingPlan(prev => {
            const plan = prev || effectiveAudioPlan;
            const segments = (plan.segments || []).map(seg => {
                const s = seg.startEpochMs ?? seg.StartEpochMs ?? 0;
                const e = seg.endEpochMs ?? seg.EndEpochMs ?? 0;
                if (segmentEpochMs >= s && segmentEpochMs <= e) {
                    return { ...seg, gain: newGain };
                }
                return seg;
            });
            return { ...plan, segments };
        });
    }, [effectiveAudioPlan]);

    const handleFollowVisualFeed = useCallback(() => {
        setIsAutoFollowAudio(prev => !prev);
    }, []);

    // Multi-Monitor Auto-Director State & Manual Overrides
    const [stationDirectorPlans, setStationDirectorPlans] = useState({});

    const getStationPlan = useCallback((stId) => {
        if (!stId) return null;
        if (stationDirectorPlans[stId]) return stationDirectorPlans[stId];
        const target = allStations.find(s => s.id === stId);
        if (target?.directorPlan) return target.directorPlan;
        return {
            stationId: stId,
            segments: [
                {
                    startEpochMs: timelineBaseEpochMs,
                    endEpochMs: timelineBaseEpochMs + totalTimelineDurationMs,
                    targetDisplayId: 'mon-0',
                    isManualOverride: false
                }
            ]
        };
    }, [stationDirectorPlans, allStations, timelineBaseEpochMs, totalTimelineDurationMs]);

    const handleSplitDirectorSegment = useCallback((stId, splitEpochMs) => {
        if (!stId) return;
        setStationDirectorPlans(prev => {
            const plan = prev[stId] || getStationPlan(stId);
            const segments = [...(plan.segments || [])];
            const segIdx = segments.findIndex(seg => {
                const s = seg.startEpochMs ?? seg.StartEpochMs ?? 0;
                const e = seg.endEpochMs ?? seg.EndEpochMs ?? 0;
                return splitEpochMs > s + 500 && splitEpochMs < e - 500;
            });
            if (segIdx === -1) return prev;

            const targetSeg = segments[segIdx];
            const s = targetSeg.startEpochMs ?? targetSeg.StartEpochMs ?? 0;
            const e = targetSeg.endEpochMs ?? targetSeg.EndEpochMs ?? 0;
            const disp = targetSeg.targetDisplayId ?? targetSeg.TargetDisplayId ?? 'mon-0';
            const isOverride = Boolean(targetSeg.isManualOverride ?? targetSeg.IsManualOverride);

            const seg1 = { ...targetSeg, startEpochMs: s, endEpochMs: splitEpochMs, targetDisplayId: disp, isManualOverride: isOverride };
            const seg2 = { ...targetSeg, startEpochMs: splitEpochMs, endEpochMs: e, targetDisplayId: disp, isManualOverride: isOverride };

            segments.splice(segIdx, 1, seg1, seg2);
            return { ...prev, [stId]: { ...plan, segments } };
        });
    }, [getStationPlan]);

    const handleChangeDirectorSegmentDisplay = useCallback((stId, segmentEpochMs, newDisplayId) => {
        if (!stId) return;
        setStationDirectorPlans(prev => {
            const plan = prev[stId] || getStationPlan(stId);
            const segments = [...(plan.segments || [])];
            // Match specific segment: prioritize strict containment (midpoint) to avoid adjacent boundary collisions
            let segIdx = segments.findIndex(seg => {
                const s = seg.startEpochMs ?? seg.StartEpochMs ?? 0;
                const e = seg.endEpochMs ?? seg.EndEpochMs ?? 0;
                return segmentEpochMs > s && segmentEpochMs < e;
            });
            if (segIdx === -1) {
                segIdx = segments.findIndex(seg => {
                    const s = seg.startEpochMs ?? seg.StartEpochMs ?? 0;
                    const e = seg.endEpochMs ?? seg.EndEpochMs ?? 0;
                    return segmentEpochMs >= s && segmentEpochMs <= e;
                });
            }
            if (segIdx === -1) return prev;

            const targetSeg = segments[segIdx];
            segments[segIdx] = { ...targetSeg, targetDisplayId: newDisplayId, isManualOverride: true };
            return { ...prev, [stId]: { ...plan, segments } };
        });
    }, [getStationPlan]);

    const handleResetDirectorSegmentToAuto = useCallback((stId, segmentEpochMs) => {
        if (!stId) return;
        const targetStation = allStations.find(s => s.id === stId);
        const autoPlan = targetStation?.directorPlan;

        setStationDirectorPlans(prev => {
            const plan = prev[stId] || getStationPlan(stId);
            const segments = [...(plan.segments || [])];

            let segIdx = segments.findIndex(seg => {
                const s = seg.startEpochMs ?? seg.StartEpochMs ?? 0;
                const e = seg.endEpochMs ?? seg.EndEpochMs ?? 0;
                return segmentEpochMs > s && segmentEpochMs < e;
            });
            if (segIdx === -1) {
                segIdx = segments.findIndex(seg => {
                    const s = seg.startEpochMs ?? seg.StartEpochMs ?? 0;
                    const e = seg.endEpochMs ?? seg.EndEpochMs ?? 0;
                    return segmentEpochMs >= s && segmentEpochMs <= e;
                });
            }
            if (segIdx === -1) return prev;

            const targetSeg = segments[segIdx];
            const s = targetSeg.startEpochMs ?? targetSeg.StartEpochMs ?? 0;
            const e = targetSeg.endEpochMs ?? targetSeg.EndEpochMs ?? 0;
            const mid = (s + e) / 2;

            const autoSeg = autoPlan?.segments?.find(as => {
                const start = as.startEpochMs ?? as.StartEpochMs ?? 0;
                const end = as.endEpochMs ?? as.EndEpochMs ?? 0;
                return mid >= start && mid <= end;
            });
            const autoDisplay = autoSeg ? (autoSeg.targetDisplayId ?? autoSeg.TargetDisplayId ?? 'mon-0') : 'mon-0';

            segments[segIdx] = { ...targetSeg, targetDisplayId: autoDisplay, isManualOverride: false };
            return { ...prev, [stId]: { ...plan, segments } };
        });
    }, [allStations, getStationPlan]);

    // Invariant (2026-11-05): Re-plan Auto-Director when CUT window (IN / OUT points) expands or changes
    // Listens to cut range adjustments and fetches refined director plan for multi-display stations,
    // preserving any manual overrides while covering newly added deltas.
    useEffect(() => {
        if (!timelineStations || timelineStations.length === 0 || isNaN(timelineBaseEpochMs)) return;
        const cutStartEpoch = timelineBaseEpochMs + inPointMs;
        const cutEndEpoch = timelineBaseEpochMs + outPointMs;
        if (cutEndEpoch <= cutStartEpoch) return;

        const timer = setTimeout(async () => {
            const multiStations = timelineStations.filter(s => {
                const disps = s.displays || s.Displays || s.displayTopology?.displays || [];
                return disps.length > 1;
            });
            if (multiStations.length === 0) return;

            for (const st of multiStations) {
                try {
                    const res = await fetch(`/api/v1/extractor-advanced/director-plan?stationId=${encodeURIComponent(st.id)}&startEpoch=${cutStartEpoch}&endEpoch=${cutEndEpoch}`);
                    if (res.ok) {
                        const newPlan = await res.json();
                        if (newPlan?.segments && newPlan.segments.length > 0) {
                            setStationDirectorPlans(prev => {
                                const currentPlan = prev[st.id] || st.directorPlan;
                                const manualOverrides = (currentPlan?.segments || []).filter(s => s.isManualOverride || s.IsManualOverride);

                                if (manualOverrides.length === 0) {
                                    return { ...prev, [st.id]: newPlan };
                                }

                                const merged = [...newPlan.segments];
                                manualOverrides.forEach(mo => {
                                    const mStart = mo.startEpochMs ?? mo.StartEpochMs;
                                    const mEnd = mo.endEpochMs ?? mo.EndEpochMs;
                                    for (let i = merged.length - 1; i >= 0; i--) {
                                        const s = merged[i].startEpochMs ?? merged[i].StartEpochMs;
                                        const e = merged[i].endEpochMs ?? merged[i].EndEpochMs;
                                        if (e <= mStart || s >= mEnd) continue;
                                        if (s >= mStart && e <= mEnd) {
                                            merged.splice(i, 1);
                                        } else if (s < mStart && e > mEnd) {
                                            const left = { ...merged[i], endEpochMs: mStart };
                                            const right = { ...merged[i], startEpochMs: mEnd };
                                            merged.splice(i, 1, left, right);
                                        } else if (s < mStart) {
                                            merged[i].endEpochMs = mStart;
                                        } else if (e > mEnd) {
                                            merged[i].startEpochMs = mEnd;
                                        }
                                    }
                                    merged.push(mo);
                                });
                                merged.sort((a, b) => (a.startEpochMs ?? a.StartEpochMs) - (b.startEpochMs ?? b.StartEpochMs));
                                return { ...prev, [st.id]: { ...newPlan, segments: merged } };
                            });
                        }
                    }
                } catch {
                    // Graceful fallback
                }
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [inPointMs, outPointMs, timelineStations, timelineBaseEpochMs]);

    const enrichedTimelineStations = useMemo(() => {
        return timelineStations.map(st => ({
            ...st,
            directorPlan: stationDirectorPlans[st.id] || st.directorPlan || getStationPlan(st.id)
        }));
    }, [timelineStations, stationDirectorPlans, getStationPlan]);

    const enrichedActiveStation = useMemo(() => {
        if (!activeStation) return null;
        return {
            ...activeStation,
            directorPlan: stationDirectorPlans[activeStation.id] || activeStation.directorPlan || getStationPlan(activeStation.id)
        };
    }, [activeStation, stationDirectorPlans, getStationPlan]);

    const enrichedSpotlightStation = useMemo(() => {
        if (!spotlightStation) return null;
        return {
            ...spotlightStation,
            directorPlan: stationDirectorPlans[spotlightStation.id] || spotlightStation.directorPlan || getStationPlan(spotlightStation.id)
        };
    }, [spotlightStation, stationDirectorPlans, getStationPlan]);

    const formatCutDurationSMPTE = (durationMs, fps = 30) => {
        const totalMs = Math.max(0, durationMs);
        const totalSeconds = Math.floor(totalMs / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const frames = Math.floor(((totalMs % 1000) / 1000) * fps);
        const pad = (n) => String(n).padStart(2, '0');
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(frames)}`;
    };

    const [isGridFullscreen, setIsGridFullscreen] = useState(false);
    const [isCinemaDockVisible, setIsCinemaDockVisible] = useState(true);
    const [isHoveringCinemaDock, setIsHoveringCinemaDock] = useState(false);
    const cinemaIdleTimerRef = useRef(null);

    const hasGridPlacements = useMemo(() => {
        const kfs = canvasLayoutTimeline?.keyframes;
        const kf = kfs?.[activeKfIndex] || kfs?.[0];
        const placements = kf?.layout?.placements || currentCanvasLayout?.placements || [];
        return placements.length > 0 || (selectedStationIds && selectedStationIds.length > 0);
    }, [canvasLayoutTimeline, activeKfIndex, currentCanvasLayout, selectedStationIds]);

    const resetCinemaIdleTimer = useCallback(() => {
        if (cinemaIdleTimerRef.current) clearTimeout(cinemaIdleTimerRef.current);
        setIsCinemaDockVisible(true);
        cinemaIdleTimerRef.current = setTimeout(() => {
            if (!isHoveringCinemaDock) {
                setIsCinemaDockVisible(false);
            }
        }, 2500);
    }, [isHoveringCinemaDock]);

    useEffect(() => {
        if (!isGridFullscreen) {
            setIsCinemaDockVisible(true);
            if (cinemaIdleTimerRef.current) clearTimeout(cinemaIdleTimerRef.current);
            return;
        }

        const handleMouseMove = (e) => {
            if (e.clientY >= window.innerHeight - 280) {
                setIsCinemaDockVisible(true);
            }
            resetCinemaIdleTimer();
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        resetCinemaIdleTimer();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (cinemaIdleTimerRef.current) clearTimeout(cinemaIdleTimerRef.current);
        };
    }, [isGridFullscreen, resetCinemaIdleTimer]);

    const handleToggleGridFullscreen = useCallback(() => {
        setIsGridFullscreen(prev => {
            const next = !prev;
            if (next) {
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen().catch(() => {});
                }
            } else {
                if (document.fullscreenElement) {
                    document.exitFullscreen().catch(() => {});
                }
            }
            return next;
        });
    }, []);

    const handleExitGridFullscreen = useCallback(() => {
        setIsGridFullscreen(false);
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
        }
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && isGridFullscreen) {
                setIsGridFullscreen(false);
            }
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, [isGridFullscreen]);

    useStudioHotkeys({
        activeStationId,
        spotlightStationId,
        timelineStations: enrichedTimelineStations,
        selectedStationIdsCount: selectedStationIds.length,
        onSelectActiveStation: handleSelectActiveStation,
        setPlaybackSpeed,
        playheadMs,
        setPlayheadMs,
        inPointMs,
        setInPointMs,
        outPointMs,
        setOutPointMs,
        totalTimelineDurationMs,
        zoomLevel,
        togglePlaySmart,
        onToggleHelpModal: () => setIsHelpModalOpen(prev => !prev),
        onSplitDirectorAtPlayhead: () => {
            const targetId = activeStationId || (selectedStationIds.length === 1 ? selectedStationIds[0] : null);
            if (targetId) {
                const targetStation = allStations.find(s => s.id === targetId);
                const hasMulti = Boolean((targetStation?.displays?.length > 1) || (targetStation?.topology?.displays?.length > 1));
                if (hasMulti) {
                    handleSplitDirectorSegment(targetId, timelineBaseEpochMs + playheadMs);
                }
            }
        },
        isModalActive: isRangeModalOpen || isBookmarksModalOpen || isHelpModalOpen,
        hasGridPlacements,
        onToggleGridFullscreen: handleToggleGridFullscreen,
        isGridFullscreen,
        onExitGridFullscreen: handleExitGridFullscreen
    });

    useEffect(() => {
        const inEpochMs = timelineBaseEpochMs + inPointMs;
        const outEpochMs = timelineBaseEpochMs + outPointMs;
        const playheadEpochMs = timelineBaseEpochMs + playheadMs;

        saveStudioSessionCache({
            timeRange,
            timeMode,
            inPointMs,
            outPointMs,
            playheadMs: Math.round(playheadMs),
            inEpochMs,
            outEpochMs,
            playheadEpochMs,
            selectedStationIds,
            activeStationId,
            zoomLevel,
            viewportStartMs,
            isWorkspaceActive,
            isLooping,
            playbackSpeed,
            keystrokeMode,
            showRulerKeystrokes,
            compositionScope,
            compositionLayout,
            isAutoDirectorEnabled,
            isPipSwapped,
            audioRoutingPlan: effectiveAudioPlan,
            isAutoFollowAudio,
            canvasLayoutTimeline
        });
    }, [
        timeRange,
        timeMode,
        inPointMs,
        outPointMs,
        playheadMs,
        selectedStationIds,
        activeStationId,
        zoomLevel,
        viewportStartMs,
        isWorkspaceActive,
        isLooping,
        playbackSpeed,
        timelineBaseEpochMs,
        keystrokeMode,
        showRulerKeystrokes,
        compositionScope,
        compositionLayout,
        isAutoDirectorEnabled,
        isPipSwapped,
        effectiveAudioPlan,
        isAutoFollowAudio,
        canvasLayoutTimeline
    ]);

    const handleLoadBookmark = useCallback((bm) => {
        const startMs = parseSafeEpoch(bm.startTime);
        const endMs = parseSafeEpoch(bm.endTime);
        const durationMs = Math.max(0, endMs - startMs) || 14400000;
        const newRange = {
            start: bm.startTime,
            end: bm.endTime,
            durationMs,
            startEpochMs: startMs,
            endEpochMs: endMs
        };
        const newBuf = Math.max(60000, Math.round(durationMs * 0.05));
        const newTimelineBase = startMs - newBuf;
        const newTotal = durationMs + (2 * newBuf);

        setTimeRange(newRange);

        if (bm.inEpochMs && bm.outEpochMs) {
            const targetIn = Math.max(0, Math.min(newTotal, bm.inEpochMs - newTimelineBase));
            const targetOut = Math.max(targetIn + 1000, Math.min(newTotal, bm.outEpochMs - newTimelineBase));
            const targetPlayhead = bm.playheadEpochMs
                ? Math.max(0, Math.min(newTotal, bm.playheadEpochMs - newTimelineBase))
                : targetIn;

            setInPointMs(targetIn);
            setOutPointMs(targetOut);
            setPlayheadMs(targetPlayhead);
        } else {
            const rawIn = typeof bm.inPointMs === 'number' ? bm.inPointMs : newBuf;
            const rawOut = typeof bm.outPointMs === 'number' ? bm.outPointMs : (newBuf + durationMs);
            const rawPlay = typeof bm.playheadMs === 'number' ? bm.playheadMs : rawIn;

            setInPointMs(Math.max(0, Math.min(newTotal, rawIn)));
            setOutPointMs(Math.max(0, Math.min(newTotal, rawOut)));
            setPlayheadMs(Math.max(0, Math.min(newTotal, rawPlay)));
        }

        const stationsToSelect = (bm.selectedStationIds?.length > 0)
            ? bm.selectedStationIds
            : (bm.cutStationIds?.length > 0 ? bm.cutStationIds : bm.stationIds);

        if (stationsToSelect?.length > 0) {
            setSelectedStationIds(stationsToSelect);

            const rawSpotlightId = bm.spotlightStationId || bm.SpotlightStationId || null;
            const rawActiveId = bm.activeStationId || bm.ActiveStationId || null;

            if (rawSpotlightId && stationsToSelect.includes(rawSpotlightId)) {
                setActiveStationId(rawSpotlightId);
                setSpotlightStationId(rawSpotlightId);
            } else if (rawActiveId && stationsToSelect.includes(rawActiveId)) {
                setActiveStationId(rawActiveId);
                setSpotlightStationId(null);
            } else {
                setActiveStationId(null);
                setSpotlightStationId(null);
            }
        }

        if (bm.keystrokeMode) setKeystrokeMode(bm.keystrokeMode);
        setIsWorkspaceActive(true);
        setIsDrawerOpen(false);
    }, []);

    const handleApplyRange = useCallback((newRange) => {
        const startMs = newRange.startEpochMs || parseSafeEpoch(newRange.start, null, timeMode);
        const endMs = newRange.endEpochMs || parseSafeEpoch(newRange.end, null, timeMode);
        const durationMs = Math.max(0, endMs - startMs) || 14400000;
        const newBuf = Math.max(60000, Math.round(durationMs * 0.05));
        const newTimelineBase = startMs - newBuf;
        const newTotalDuration = durationMs + (2 * newBuf);

        setTimeRange({
            ...newRange,
            startEpochMs: startMs,
            endEpochMs: endMs,
            durationMs
        });
        setNoStationsAlert(false);
        setInPointMs(newBuf);
        setOutPointMs(newBuf + durationMs);
        setPlayheadMs(newBuf);

        // Sanitize & re-anchor canvas timeline keyframes to new timeline range
        setCanvasLayoutTimeline(prev => {
            if (!prev?.keyframes || prev.keyframes.length === 0) return prev;
            const updated = prev.keyframes.map((kf, i) => {
                if (i === 0) return { ...kf, timestampEpochMs: newTimelineBase };
                return kf;
            }).filter(kf => kf.timestampEpochMs >= newTimelineBase && kf.timestampEpochMs <= newTimelineBase + newTotalDuration);
            return { ...prev, keyframes: updated };
        });

        // Re-anchor audio routing plan if existing segments fall outside the new window
        setAudioRoutingPlan(prev => {
            if (!prev?.segments || prev.segments.length === 0) return prev;
            const hasOverlap = prev.segments.some(s => {
                const segStart = s.startEpochMs ?? s.StartEpochMs ?? 0;
                const segEnd = s.endEpochMs ?? s.EndEpochMs ?? 0;
                return segEnd > newTimelineBase && segStart < newTimelineBase + newTotalDuration;
            });
            if (!hasOverlap) {
                const defaultStationId = selectedStationIds[0] || activeStationId || 'station-0';
                return {
                    segments: [
                        {
                            startEpochMs: newTimelineBase,
                            endEpochMs: newTimelineBase + newTotalDuration,
                            sourceStationId: defaultStationId
                        }
                    ]
                };
            }
            return prev;
        });

        // Reset manual overrides so fresh director analysis is loaded for the new scope
        setStationDirectorPlans({});
    }, [timeMode, selectedStationIds, activeStationId]);

    const handleExecuteExport = useCallback(() => {
        const targetStationIds = timelineStations.map(s => s.id);
        if (targetStationIds.length === 0) return alert('No active stations selected in timeline.');
        setIsExportModalOpen(true);
    }, [timelineStations]);

    const handleConfirmMasterExport = useCallback(async (chosenKeystrokeMode, chosenResolution, notes = '') => {
        const targetStationIds = timelineStations.map(s => s.id);
        if (targetStationIds.length === 0) return;

        let resolvedMode = chosenKeystrokeMode === 'None' ? 'None' : 'BurnIn';
        const targetResolution = chosenResolution || 'NATIVE';

        const directorSegs = ((enrichedActiveStation?.displays?.length > 1) || (enrichedActiveStation?.topology?.displays?.length > 1))
            ? (enrichedActiveStation?.directorPlan?.segments || [])
            : [];

        try {
            const response = await fetch('/api/v1/extractor-advanced/cut', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    createdBy: getCurrentOperatorName(),
                    notes: (notes || '').trim(),
                    stationIds: targetStationIds,
                    inEpochMs: timelineBaseEpochMs + inPointMs,
                    outEpochMs: timelineBaseEpochMs + outPointMs,
                    keystrokeMode: resolvedMode,
                    resolution: targetResolution,
                    videoQuality: targetResolution,
                    compositionScope: compositionScope,
                    layoutMode: 'canvas',
                    canvasLayout: currentCanvasLayout,
                    canvasLayoutTimeline: canvasLayoutTimeline,
                    isPipSwapped: isPipSwapped,
                    isAutoDirectorEnabled: isAutoDirectorEnabled,
                    directorSegments: directorSegs,
                    audioRoutingSegments: effectiveAudioPlan.segments || [],
                    utcClockPosition: (() => {
                        try {
                            return localStorage.getItem('itb_canvas_utc_clock_pos') || 'top-right';
                        } catch {
                            return 'top-right';
                        }
                    })()
                })
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            window.dispatchEvent(new CustomEvent('open-export-monitor'));
        } catch (error) {
            console.error('[Studio] Export failed:', error);
            alert('Failed to launch background master MP4 export job.');
        }
    }, [timelineStations, timelineBaseEpochMs, inPointMs, outPointMs, compositionScope, currentCanvasLayout, canvasLayoutTimeline, isPipSwapped, isAutoDirectorEnabled, enrichedActiveStation, effectiveAudioPlan]);

    


    const handleResetStudioSession = useCallback(() => {
        clearStudioSessionCache();
        try {
            window.dispatchEvent(new CustomEvent('extractor:clear-session'));
        } catch { }

        const defaultRange = generateDefaultTimeRange();
        const newBuf = Math.max(60000, Math.round(defaultRange.durationMs * 0.05));

        setTimeRange(defaultRange);
        setInPointMs(newBuf);
        setOutPointMs(newBuf + defaultRange.durationMs);
        setPlayheadMs(newBuf);
        setSelectedStationIds([]);
        setActiveStationId(null);
        setSpotlightStationId(null);
        setIsPlaying(false);
        setPlaybackSpeed(1);
        setKeystrokeMode('BURN_IN');
        resetZoom();
        setIsWorkspaceActive(false);
        setIsDrawerOpen(true);
    }, [resetZoom, setIsPlaying, setPlaybackSpeed, setPlayheadMs]);

    const isInitialSetup = !isWorkspaceActive || selectedStationIds.length === 0;
    const currentPlayheadEpochMs = timelineBaseEpochMs + playheadMs;

    // Synchronize active layout keyframe index with current playhead epoch during playback and scrubbing
    useEffect(() => {
        const kfs = canvasLayoutTimeline?.keyframes;
        if (!kfs || kfs.length === 0) return;
        let targetIdx = 0;
        for (let i = 0; i < kfs.length; i++) {
            if (kfs[i].timestampEpochMs <= currentPlayheadEpochMs + 50) {
                targetIdx = i;
            } else {
                break;
            }
        }
        if (targetIdx !== activeKfIndex) {
            setActiveKfIndex(targetIdx);
        }
    }, [currentPlayheadEpochMs, canvasLayoutTimeline?.keyframes, activeKfIndex]);

    return (
        <div className="extractor-advanced-studio">
            <div className="studio-workspace-area">
                <TopScopeBar
                    timeRange={timeRange}
                    baseEpochMs={baseEpochMs}
                    timeMode={timeMode}
                    setTimeMode={setTimeMode}
                    activeStationId={activeStationId}
                    hideBackToGrid={timelineStations.length <= 1}
                    onResetActiveStation={() => handleSelectActiveStation(null)}
                    onOpenRangeModal={() => setIsRangeModalOpen(true)}
                    onOpenBookmarksModal={() => setIsBookmarksModalOpen(true)}
                    onOpenHelpModal={() => setIsHelpModalOpen(true)}
                    onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
                    isInitialSetup={isInitialSetup}
                    selectedCount={selectedStationIds.length}
                    totalCount={allStations.length}
                    onResetStudio={handleResetStudioSession}
                />

                {noStationsAlert && (
                    <div className="studio-scope-alert-banner">
                        <div className="alert-content">
                            <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <div className="alert-text">
                                <span className="alert-title">NO RECORDING SESSIONS FOUND IN SELECTED TIME SCOPE</span>
                                <span className="alert-desc">
                                    No stations or recorded video segments were found in the selected time range ({timeRange.start} — {timeRange.end}).
                                </span>
                            </div>
                        </div>
                        <div className="alert-actions">
                            <button
                                type="button"
                                className="btn-alert-change-time"
                                onClick={() => setIsRangeModalOpen(true)}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                <span>CHANGE TIME SCOPE</span>
                            </button>
                            <button
                                type="button"
                                className="btn-alert-dismiss"
                                onClick={() => setNoStationsAlert(false)}
                                title="Dismiss Alert"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}

                <div className={`studio-lower-body ${isGridFullscreen ? 'cinema-fullscreen-mode' : ''}`}>
                    {isGridFullscreen && (
                        <div className={`cinema-top-hud ${!isCinemaDockVisible ? 'is-hud-hidden' : ''}`}>
                            <div className="top-hud-left-group">
                                <button
                                    type="button"
                                    className="btn-exit-spotlight"
                                    onClick={handleExitGridFullscreen}
                                    title="Exit Fullscreen (Esc or F)"
                                >
                                    <kbd>ESC</kbd>
                                    <span>EXIT FULLSCREEN</span>
                                </button>
                                <button
                                    type="button"
                                    className="btn-spotlight-help"
                                    onClick={() => setIsHelpModalOpen(true)}
                                    title="Keyboard Shortcuts (?)"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="13" height="13">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                        <line x1="12" y1="17" x2="12.01" y2="17" />
                                    </svg>
                                    <span>SHORTCUTS</span>
                                </button>
                            </div>
                            <div className="cinema-brand-pill">
                                <span className="feed-res">MULTICAM GRID</span>
                                <span className="divider" />
                                <span className="station-title">TACTICAL CANVAS THEATER</span>
                                <span className="station-physical-badge">
                                    {enrichedTimelineStations.length} ACTIVE WORKSTATIONS
                                </span>
                            </div>
                        </div>
                    )}
                    {!isInitialSetup && (
                        <div className="studio-left-content">
                            <div className="studio-main-viewport-container">
                                <MulticamViewport
                                    activeStation={enrichedActiveStation}
                                    timelineStations={enrichedTimelineStations}
                                    allStations={allStations}
                                    onSelectActiveStation={handleSelectActiveStation}
                                    onOpenSpotlight={handleOpenSpotlightFullscreen}
                                    onStationContextMenu={handleStationContextMenu}
                                    onDeselectStation={handleDeselectStation}
                                    stationAutoDirectorMap={stationAutoDirectorMap}
                                    onToggleStationAutoDirector={handleToggleStationAutoDirector}
                                    onOpenDrawer={() => setIsDrawerOpen(true)}
                                    baseEpochMs={timelineBaseEpochMs}
                                    playheadMs={playheadMs}
                                    playheadEpochMs={currentPlayheadEpochMs}
                                    timeMode={timeMode}
                                    /* Critical: When Spotlight is open, disable playback and audio in the underlying Viewport */
                                    isPlaying={isSpotlightOpen ? false : isPlaying}
                                    setIsPlaying={setIsPlaying}
                                    totalDurationMs={totalTimelineDurationMs}
                                    inPointMs={inPointMs}
                                    outPointMs={outPointMs}
                                    setPlayheadMs={setPlayheadMs}
                                    globalGaps={globalGaps}
                                    recordingSegments={recordingSegments}
                                    playbackSpeed={playbackSpeed}
                                    onChangePlaybackSpeed={setPlaybackSpeed}
                                    keystrokeMode={keystrokeMode}
                                    keystrokes={activeStationKeystrokes}
                                    directorPlan={enrichedActiveStation?.directorPlan}
                                    onOverrideDisplay={handleChangeDirectorSegmentDisplay}
                                    onResetOverride={handleResetDirectorSegmentToAuto}
                                    compositionScope={compositionScope}
                                    onChangeCompositionScope={setCompositionScope}
                                    compositionLayout={compositionLayout}
                                    onChangeCompositionLayout={setCompositionLayout}
                                    isAutoDirectorEnabled={isAutoDirectorEnabled}
                                    onToggleAutoDirector={() => setIsAutoDirectorEnabled(p => !p)}
                                    isPipSwapped={isPipSwapped}
                                    onTogglePipSwap={() => setIsPipSwapped(p => !p)}
                                    onUpdateCanvasLayout={setCurrentCanvasLayout}
                                    canvasLayoutTimeline={canvasLayoutTimeline}
                                    onUpdateCanvasLayoutTimeline={setCanvasLayoutTimeline}
                                    activeKfIndex={activeKfIndex}
                                    setActiveKfIndex={setActiveKfIndex}
                                    isModalOpen={isExportModalOpen || isRangeModalOpen || isBookmarksModalOpen || isSpotlightOpen || isHelpModalOpen}
                                    isGridFullscreen={isGridFullscreen}
                                    onToggleGridFullscreen={handleToggleGridFullscreen}
                                />
                                {!isGridFullscreen && (
                                    <TransportBar
                                        hasGridPlacements={hasGridPlacements}
                                        baseEpochMs={timelineBaseEpochMs}
                                        timeMode={timeMode}
                                        totalDurationMs={totalTimelineDurationMs}
                                        playheadMs={playheadMs}
                                        setPlayheadMs={setPlayheadMs}
                                        inPointMs={inPointMs}
                                        setInPointMs={setInPointMs}
                                        outPointMs={outPointMs}
                                        setOutPointMs={setOutPointMs}
                                        activeStationId={activeStationId}
                                        isPlaying={isPlaying}
                                        setIsPlaying={togglePlaySmart}
                                        isLooping={isLooping}
                                        setIsLooping={setIsLooping}
                                        playbackSpeed={playbackSpeed}
                                        onChangeSpeed={setPlaybackSpeed}
                                        onSetInPoint={() => setInPointMs(Math.max(0, Math.min(playheadMs, outPointMs - 1000)))}
                                        onSetOutPoint={() => setOutPointMs(Math.min(totalTimelineDurationMs, Math.max(playheadMs, inPointMs + 1000)))}
                                        onStepFrameBackward={() => { setIsPlaying(false); setPlayheadMs(p => Math.max(0, p - 33)); }}
                                        onStepFrameForward={() => { setIsPlaying(false); setPlayheadMs(p => Math.min(totalTimelineDurationMs, p + 33)); }}
                                    />
                                )}
                            </div>

                            {isGridFullscreen && (
                                <div
                                    className="cinema-bottom-sensor-strip"
                                    onMouseEnter={() => {
                                        setIsCinemaDockVisible(true);
                                        resetCinemaIdleTimer();
                                    }}
                                />
                            )}

                            <div
                                className={`studio-bottom-timeline ${isGridFullscreen ? 'cinema-timeline-island' : ''} ${isGridFullscreen && !isCinemaDockVisible ? 'dock-hidden' : ''} ${isGridFullscreen && isPlaying ? 'is-playing-dimmed' : ''}`}
                                ref={timelineContainerRef}
                                onMouseEnter={() => setIsHoveringCinemaDock(true)}
                                onMouseLeave={() => {
                                    setIsHoveringCinemaDock(false);
                                    if (isGridFullscreen) resetCinemaIdleTimer();
                                }}
                            >
                                {isGridFullscreen && (
                                    <div className="cinema-island-transport-row">
                                        <div className="cut-actions-cluster">
                                            <div className="cut-duration-pill">
                                                <span className="label">CUT DURATION</span>
                                                <span className="val">{formatCutDurationSMPTE(outPointMs - inPointMs)}</span>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn-export-cut-hero"
                                                onClick={handleExecuteExport}
                                                title="Export Selected Cut Window (Ctrl+E)"
                                            >
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                    <polyline points="7 10 12 15 17 10" />
                                                    <line x1="12" y1="15" x2="12" y2="3" />
                                                </svg>
                                                <span>EXPORT CUT</span>
                                            </button>
                                        </div>
                                        <TransportBar
                                            hasGridPlacements={hasGridPlacements}
                                            baseEpochMs={timelineBaseEpochMs}
                                            timeMode={timeMode}
                                            totalDurationMs={totalTimelineDurationMs}
                                            playheadMs={playheadMs}
                                            setPlayheadMs={setPlayheadMs}
                                            inPointMs={inPointMs}
                                            setInPointMs={setInPointMs}
                                            outPointMs={outPointMs}
                                            setOutPointMs={setOutPointMs}
                                            activeStationId={activeStationId}
                                            isPlaying={isPlaying}
                                            setIsPlaying={togglePlaySmart}
                                            isLooping={isLooping}
                                            setIsLooping={setIsLooping}
                                            playbackSpeed={playbackSpeed}
                                            onChangeSpeed={setPlaybackSpeed}
                                            onSetInPoint={() => setInPointMs(Math.max(0, Math.min(playheadMs, outPointMs - 1000)))}
                                            onSetOutPoint={() => setOutPointMs(Math.min(totalTimelineDurationMs, Math.max(playheadMs, inPointMs + 1000)))}
                                            onStepFrameBackward={() => { setIsPlaying(false); setPlayheadMs(p => Math.max(0, p - 33)); }}
                                            onStepFrameForward={() => { setIsPlaying(false); setPlayheadMs(p => Math.min(totalTimelineDurationMs, p + 33)); }}
                                        />
                                        <div className="clock-timecode">
                                            <span className="label">PLAYHEAD</span>
                                            <span className="digits">{formatTimelineClock(timelineBaseEpochMs + playheadMs, timeMode)}</span>
                                        </div>
                                    </div>
                                )}
                                <TimelineBoard
                                    stations={enrichedTimelineStations}
                                    activeStationId={activeStationId}
                                    onSelectActiveStation={(id) => handleSelectActiveStation(selectedStationIds.length <= 1 ? id : (id === activeStationId ? null : id))}
                                    onStationContextMenu={handleStationContextMenu}
                                    onDeselectStation={handleDeselectStation}
                                    stationAutoDirectorMap={stationAutoDirectorMap}
                                    onToggleStationAutoDirector={handleToggleStationAutoDirector}
                                    baseEpochMs={timelineBaseEpochMs}
                                    timeMode={timeMode}
                                    totalDurationMs={totalTimelineDurationMs}
                                    zoomLevel={zoomLevel}
                                    onZoomChange={setZoomLevel}
                                    onZoomReset={resetZoom}
                                    onFitRange={fitRange}
                                    onJumpViewportTo={jumpViewportTo}
                                    playheadMs={playheadMs}
                                    setPlayheadMs={setPlayheadMs}
                                    inPointMs={inPointMs}
                                    setInPointMs={setInPointMs}
                                    outPointMs={outPointMs}
                                    setOutPointMs={setOutPointMs}
                                    viewportStartMs={viewportStartMs}
                                    onViewportStartChange={setViewportStartMs}
                                    onExport={handleExecuteExport}
                                    recordingSegments={recordingSegments}
                                    movieBoundaries={movieBoundaries}
                                    onEstimateLoaded={(est) => est?.removedGlobalGaps && setGlobalGaps(est.removedGlobalGaps)}
                                    keystrokeMode={keystrokeMode}
                                    onChangeKeystrokeMode={setKeystrokeMode}
                                    keystrokes={activeStationKeystrokes}
                                    showKeystrokes={showRulerKeystrokes}
                                    showRulerKeystrokes={showRulerKeystrokes}
                                    onToggleRulerKeystrokes={() => setShowRulerKeystrokes(prev => !prev)}
                                    onSplitDirectorSegment={handleSplitDirectorSegment}
                                    onChangeDirectorSegmentDisplay={handleChangeDirectorSegmentDisplay}
                                    onResetDirectorSegmentToAuto={handleResetDirectorSegmentToAuto}
                                    audioRoutingPlan={effectiveAudioPlan}
                                    onSplitAudioSegment={handleSplitAudioSegment}
                                    onChangeAudioSegmentStation={handleChangeAudioSegmentStation}
                                    onChangeAudioSegmentGain={handleChangeAudioSegmentGain}
                                    onFollowVisualFeed={handleFollowVisualFeed}
                                    isAutoFollowAudio={isAutoFollowAudio}
                                    canvasLayoutTimeline={canvasLayoutTimeline}
                                    activeKfIndex={activeKfIndex}
                                    onSelectKeyframe={(idx, epoch) => {
                                        setActiveKfIndex(idx);
                                        setPlayheadMs(Math.max(0, epoch - timelineBaseEpochMs));
                                    }}
                                    onAddKeyframeAtEpoch={handleAddKeyframeAtEpoch}
                                    onDeleteKeyframe={handleDeleteKeyframe}
                                    onUpdateKeyframeEpoch={handleUpdateKeyframeEpoch}
                                    onUpdateKeyframeTransition={handleUpdateKeyframeTransition}
                                    onToggleDisplayOnCanvas={handleToggleDisplayOnCanvas}
                                    onUpdateAudioPlan={setAudioRoutingPlan}
                                />
                            </div>
                        </div>
                    )}

                    {!isGridFullscreen && (
                        <StationDrawer
                            isOpen={isDrawerOpen || isInitialSetup}
                            onToggle={() => setIsDrawerOpen(!isDrawerOpen)}
                            onClose={() => setIsDrawerOpen(false)}
                            allStations={allStations}
                            selectedStationIds={selectedStationIds}
                            onToggleStation={(id) => setSelectedStationIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])}
                            onUpdateSelections={setSelectedStationIds}
                            isInitialSetup={isInitialSetup}
                            isLoadingStations={isLoadingStations}
                            recordingSegments={recordingSegments}
                            baseEpochMs={baseEpochMs}
                            durationMs={timeRange.durationMs}
                            onApply={() => {
                                if (selectedStationIds.length > 0) {
                                    setActiveStationId(null); // Always start in Master Canvas Grid
                                    setSpotlightStationId(null);
                                    setIsWorkspaceActive(true);
                                    setIsDrawerOpen(false);
                                }
                            }}
                            onOpenRangeModal={() => setIsRangeModalOpen(true)}
                        />
                    )}
                </div>
            </div>

            <MasterTimeRangeModal
                isOpen={isRangeModalOpen}
                onClose={() => setIsRangeModalOpen(false)}
                currentRange={timeRange}
                timeMode={timeMode}
                onTimeModeChange={setTimeMode}
                onLoadBookmark={handleLoadBookmark}
                onApplyRange={handleApplyRange}
            />

            <BookmarksModal
                isOpen={isBookmarksModalOpen}
                onClose={() => setIsBookmarksModalOpen(false)}
                timeMode={timeMode}
                currentState={{
                    timeRange,
                    baseEpochMs: timelineBaseEpochMs,
                    timelineBaseEpochMs,
                    playheadMs,
                    inPointMs,
                    outPointMs,
                    selectedStationIds,
                    selectedStationNames: allStations
                        .filter(s => selectedStationIds.includes(s.id))
                        .map(s => s.displayName || s.hostname || s.id),
                    allStationIds: allStations.map(s => s.id),
                    activeStationId,
                    activeStationName: activeStation?.displayName || activeStation?.hostname || null,
                    spotlightStationId,
                    keystrokeMode
                }}
                onLoadBookmark={handleLoadBookmark}
            />

            <ShortcutsHelpModal
                isOpen={isHelpModalOpen}
                onClose={() => setIsHelpModalOpen(false)}
            />

            <SoloSpotlightModal
                isOpen={isSpotlightOpen}
                station={enrichedSpotlightStation}
                initialDisplayId={spotlightInitialDisplayId}
                allStations={enrichedTimelineStations}
                onSelectStation={(newId) => {
                    if (newId !== spotlightStationId) setPlaybackSpeed(1);
                    setActiveStationId(newId);
                    setSpotlightStationId(newId);
                }}
                onClose={handleCloseSpotlightFullscreen}
                baseEpochMs={timelineBaseEpochMs}
                timeMode={timeMode}
                totalDurationMs={totalTimelineDurationMs}
                zoomLevel={zoomLevel}
                onZoomChange={setZoomLevel}
                onZoomReset={resetZoom}
                onFitRange={fitRange}
                onJumpViewportTo={jumpViewportTo}
                viewportStartMs={viewportStartMs}
                onViewportStartChange={setViewportStartMs}
                playheadMs={playheadMs}
                setPlayheadMs={setPlayheadMs}
                playheadEpochMs={currentPlayheadEpochMs}
                inPointMs={inPointMs}
                setInPointMs={setInPointMs}
                outPointMs={outPointMs}
                setOutPointMs={setOutPointMs}
                recordingSegments={recordingSegments}
                globalGaps={globalGaps}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                isLooping={isLooping}
                setIsLooping={setIsLooping}
                playbackSpeed={playbackSpeed}
                setPlaybackSpeed={setPlaybackSpeed}
                onExport={handleExecuteExport}
                keystrokeMode={keystrokeMode}
                onChangeKeystrokeMode={setKeystrokeMode}
                keystrokes={activeStationKeystrokes}
                showRulerKeystrokes={showRulerKeystrokes}
                onToggleRulerKeystrokes={() => setShowRulerKeystrokes(prev => !prev)}
                directorPlan={enrichedSpotlightStation?.directorPlan}
                onOverrideDisplay={handleChangeDirectorSegmentDisplay}
                onSplitDirectorSegment={handleSplitDirectorSegment}
                onChangeDirectorSegmentDisplay={handleChangeDirectorSegmentDisplay}
                onResetDirectorSegmentToAuto={handleResetDirectorSegmentToAuto}
            />

            <StationContextMenu
                menu={stationContextMenu}
                onClose={() => setStationContextMenu(null)}
                onDeselect={handleDeselectStation}
                onFocusSolo={handleSelectActiveStation}
            />

            <ExportOptionsModal
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                onConfirm={handleConfirmMasterExport}
                compositionSummary={{
                    scope: compositionScope,
                    layout: currentCanvasLayout?.preset || compositionLayout,
                    isPipSwapped,
                    isAutoDirectorEnabled,
                    stationsCount: timelineStations.length,
                    audioSegmentsCount: effectiveAudioPlan?.segments?.length || 1,
                    resolution: canvasLayoutTimeline?.resolution || 'NATIVE',
                    canvasWidth: currentCanvasLayout?.width || 1920,
                    canvasHeight: currentCanvasLayout?.height || 1080
                }}
            />



            <ExportJobMonitor />
        </div>
    );
}