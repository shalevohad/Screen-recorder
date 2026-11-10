// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/TimelineBoard.jsx
// ==========================================
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';

import TimelineRuler from './header/TimelineRuler.jsx';
import SessionClockBadge from './header/SessionClockBadge.jsx';
import TimelineMinimap from './header/TimelineMinimap.jsx';
import TimelineHeaderActions from './header/TimelineHeaderActions.jsx';
import TimelineTrack, { FilmstripCanvas } from './tracks/TimelineTrack.jsx';
// import DirectorTrack from './tracks/DirectorTrack.jsx';
import AudioRoutingTrack from './tracks/AudioRoutingTrack.jsx';
import CanvasKeyframeTrack from './tracks/CanvasKeyframeTrack.jsx';
import Playhead from './overlays/Playhead.jsx';
import TimelineContextMenu from './overlays/TimelineContextMenu.jsx';
import TimelineVerticalExportBtn from './export/TimelineVerticalExportBtn.jsx';

import { useTimelineEstimate } from './hooks/useTimelineEstimate.js';
import { useTimelineDrag } from './hooks/useTimelineDrag.js';

import './TimelineBoard.scss';

const TRACKS_PER_BANK = 4;
const TIMELINE_SIDEBAR_WIDTH_PX = 230;
const TIMELINE_EXPORT_WIDTH_PX = 58;

export default function TimelineBoard({
    stations = [],
    activeStationId,
    onSelectActiveStation,
    onStationContextMenu,
    onDeselectStation,
    stationAutoDirectorMap = {},
    onToggleStationAutoDirector,
    baseEpochMs = 0,
    timeMode = 'LOCAL',
    totalDurationMs = 3600000,
    zoomLevel = 1,
    onZoomChange,
    onZoomReset,
    playheadMs = 0,
    setPlayheadMs,
    inPointMs = 0,
    setInPointMs,
    outPointMs = 3600000,
    setOutPointMs,
    onExport,
    recordingSegments = {},
    movieBoundaries,
    viewportStartMs = 0,
    onViewportStartChange,
    onEstimateLoaded,
    onFitRange,
    onJumpViewportTo,
    keystrokeMode = 'BURN_IN',
    onChangeKeystrokeMode,
    keystrokes = [],
    showKeystrokes = false,
    showRulerKeystrokes = false,
    onToggleRulerKeystrokes,
    _onSplitDirectorSegment,
    _onChangeDirectorSegmentDisplay,
    _onResetDirectorSegmentToAuto,
    audioRoutingPlan,
    onSplitAudioSegment,
    onChangeAudioSegmentStation,
    onChangeAudioSegmentGain,
    onFollowVisualFeed,
    isAutoFollowAudio,
    canvasLayoutTimeline,
    activeKfIndex = 0,
    onSelectKeyframe,
    onAddKeyframeAtEpoch,
    onDeleteKeyframe,
    onUpdateKeyframeEpoch,
    onUpdateKeyframeTransition,
    onUpdateKeyframeClockPosition,
    onToggleDisplayOnCanvas,
    onUpdateAudioPlan
}) {
    const [hoverMs, setHoverMs] = useState(null);
    const [trackBankIndex, setTrackBankIndex] = useState(0);
    const [contextMenu, setContextMenu] = useState(null);
    const [isMasterVideoOpen, setIsMasterVideoOpen] = useState(true);
    const getStationDisplaysCount = (s) => {
        const list = s?.displays || s?.Displays || s?.displayTopology?.displays || s?.DisplayTopology?.Displays || s?.topology?.displays || [];
        return list.length;
    };
    // Invariant (2026-11-05): Workstations with only 1 display cannot expand. Only stations with 2+ displays can expand.
    const [expandedStationId, setExpandedStationId] = useState(() => {
        return (stations.length === 1 && getStationDisplaysCount(stations[0]) > 1) ? stations[0]?.id : null;
    });

    useEffect(() => {
        if (stations.length === 1 && !expandedStationId && stations[0]?.id && getStationDisplaysCount(stations[0]) > 1) {
            setExpandedStationId(stations[0].id);
        } else if (expandedStationId) {
            const exp = stations.find(s => s.id === expandedStationId);
            if (!exp || getStationDisplaysCount(exp) <= 1) {
                setExpandedStationId(null);
            }
        }
    }, [stations, expandedStationId]);

    const trackAreaRef = useRef(null);
    const minimapRef = useRef(null);
    const viewportDurationMs = totalDurationMs / Math.max(1, zoomLevel);

    const totalBanks = Math.ceil(stations.length / TRACKS_PER_BANK) || 1;
    const currentBankStations = useMemo(() => {
        const start = trackBankIndex * TRACKS_PER_BANK;
        return stations.slice(start, start + TRACKS_PER_BANK);
    }, [stations, trackBankIndex]);

    useEffect(() => {
        if (!activeStationId && !expandedStationId) return;
        const targetId = expandedStationId || activeStationId;
        const stationIdx = stations.findIndex(s => s.id === targetId);
        if (stationIdx !== -1) {
            const neededBank = Math.floor(stationIdx / TRACKS_PER_BANK);
            if (neededBank !== trackBankIndex) setTrackBankIndex(neededBank);
        }
    }, [activeStationId, expandedStationId, stations, trackBankIndex]);

    const activeKeyframe = canvasLayoutTimeline?.keyframes?.[activeKfIndex] || canvasLayoutTimeline?.keyframes?.[0];
    const currentPlacements = useMemo(() => activeKeyframe?.layout?.placements || [], [activeKeyframe]);

    const activeStationObj = useMemo(() => stations.find(s => s.id === activeStationId) || null, [stations, activeStationId]);

    const earliestMediaMs = movieBoundaries?.globalFirstMs ?? null;
    const latestMediaMs = movieBoundaries?.globalLastMs ?? null;

    const hasActiveCut = useMemo(() => {
        const isRangeNonDefault = (inPointMs > 500) || (outPointMs < totalDurationMs - 500);
        return isRangeNonDefault && (outPointMs - inPointMs >= 1000);
    }, [inPointMs, outPointMs, totalDurationMs]);

    const stationIdsKey = useMemo(() => stations.map(s => s.id).sort().join(','), [stations]);
    const { estimateData, isEstimating, formatEstimateSize } = useTimelineEstimate({
        stationIdsKey,
        inPointMs,
        outPointMs,
        baseEpochMs,
        onEstimateLoaded
    });

    const getMsFromClientX = useCallback((clientX) => {
        if (!trackAreaRef.current) return viewportStartMs;
        const rect = trackAreaRef.current.getBoundingClientRect();
        const contentLeft = rect.left + TIMELINE_SIDEBAR_WIDTH_PX;
        const contentWidth = rect.width - TIMELINE_SIDEBAR_WIDTH_PX - TIMELINE_EXPORT_WIDTH_PX;
        if (contentWidth <= 0) return viewportStartMs;
        const offsetX = Math.max(0, Math.min(clientX - contentLeft, contentWidth));
        return Math.round(viewportStartMs + (offsetX / contentWidth) * viewportDurationMs);
    }, [viewportStartMs, viewportDurationMs]);

    const { draggingTarget, handleStartDrag } = useTimelineDrag({
        viewportDurationMs,
        totalDurationMs,
        playheadMs,
        setPlayheadMs,
        inPointMs,
        setInPointMs,
        outPointMs,
        setOutPointMs,
        viewportStartMs,
        setViewportStartMs: onViewportStartChange,
        getMsFromClientX,
        minimapRef
    });

    const zoomLevelRef = useRef(zoomLevel);
    zoomLevelRef.current = zoomLevel;
    const viewportStartRef = useRef(viewportStartMs);
    viewportStartRef.current = viewportStartMs;
    const totalDurationRef = useRef(totalDurationMs);
    totalDurationRef.current = totalDurationMs;
    const playheadRef = useRef(playheadMs);
    playheadRef.current = playheadMs;

    // Immediate wheel zoom and horizontal scrub listener on the timeline board
    useEffect(() => {
        const el = trackAreaRef.current;
        if (!el) return;

        const handleWheel = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const isHorizontalScroll = e.ctrlKey || e.shiftKey;
            const currentZoom = zoomLevelRef.current;
            const currentStart = viewportStartRef.current;
            const currentTotal = totalDurationRef.current;
            const currentPlayhead = playheadRef.current;

            if (isHorizontalScroll) {
                const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
                if (delta === 0) return;

                const visibleDurationMs = currentTotal / Math.max(1, currentZoom);
                const maxStart = Math.max(0, currentTotal - visibleDurationMs);
                const scrollStepMs = (visibleDurationMs * 0.08) * (delta > 0 ? 1 : -1);

                onViewportStartChange?.(Math.max(0, Math.min(maxStart, currentStart + scrollStepMs)));
            } else {
                if (e.deltaY === 0) return;

                const isZoomIn = e.deltaY < 0;
                const zoomFactor = isZoomIn ? 1.25 : 0.8;
                const maxDynamicZoom = Math.max(32, currentTotal / 2000);

                const rect = el.getBoundingClientRect();
                const contentLeft = rect.left + TIMELINE_SIDEBAR_WIDTH_PX;
                const contentWidth = rect.width - TIMELINE_SIDEBAR_WIDTH_PX - TIMELINE_EXPORT_WIDTH_PX;

                let mouseRatio = 0.5;
                if (contentWidth > 0) {
                    if (e.clientX >= contentLeft && e.clientX <= rect.right - TIMELINE_EXPORT_WIDTH_PX) {
                        mouseRatio = Math.max(0, Math.min(1, (e.clientX - contentLeft) / contentWidth));
                    } else {
                        const visibleDurationMs = currentTotal / Math.max(1, currentZoom);
                        const playheadRatio = (currentPlayhead - currentStart) / visibleDurationMs;
                        mouseRatio = (playheadRatio >= 0 && playheadRatio <= 1) ? playheadRatio : 0.5;
                    }
                }

                const nextZoom = Math.max(1, Math.min(maxDynamicZoom, Math.round(currentZoom * zoomFactor * 100) / 100));
                if (nextZoom === currentZoom) return;

                const oldVisibleMs = currentTotal / currentZoom;
                const newVisibleMs = currentTotal / nextZoom;
                const mouseEpochOffset = currentStart + (mouseRatio * oldVisibleMs);

                const nextStart = mouseEpochOffset - (mouseRatio * newVisibleMs);
                const maxStart = Math.max(0, currentTotal - newVisibleMs);

                onZoomChange?.(nextZoom);
                onViewportStartChange?.(Math.max(0, Math.min(maxStart, nextStart)));
            }
        };

        el.addEventListener('wheel', handleWheel, { passive: false, capture: true });
        return () => el.removeEventListener('wheel', handleWheel, { capture: true });
    }, [onZoomChange, onViewportStartChange]);

    const isRangeValid = stations.length > 0 && Math.abs(outPointMs - inPointMs) >= 1000;

    return (
        <div
            ref={trackAreaRef}
            className="timeline-board-root"
            onContextMenu={(e) => {
                e.preventDefault();
                const rect = trackAreaRef.current?.getBoundingClientRect();
                if (!rect || e.clientX - rect.left < TIMELINE_SIDEBAR_WIDTH_PX || e.clientX > rect.right - TIMELINE_EXPORT_WIDTH_PX) return;
                setContextMenu({ x: e.clientX, y: e.clientY, targetMs: Math.max(0, Math.min(totalDurationMs, getMsFromClientX(e.clientX))) });
            }}
        >
            <div className="timeline-top-deck">
                <div className="timeline-badge-slot">
                    <SessionClockBadge
                        baseEpochMs={baseEpochMs}
                        timeMode={timeMode}
                        totalDurationMs={totalDurationMs}
                        inPointMs={inPointMs}
                        setInPointMs={setInPointMs}
                        outPointMs={outPointMs}
                        setOutPointMs={setOutPointMs}
                    />
                </div>

                <div className="timeline-meters-track">
                    <div className="timeline-overview-strip">
                        <TimelineMinimap
                            minimapRef={minimapRef}
                            baseEpochMs={baseEpochMs}
                            timeMode={timeMode}
                            totalDurationMs={totalDurationMs}
                            viewportStartMs={viewportStartMs}
                            viewportDurationMs={viewportDurationMs}
                            zoomLevel={zoomLevel}
                            inPointMs={inPointMs}
                            outPointMs={outPointMs}
                            playheadMs={playheadMs}
                            onStartDragMinimap={handleStartDrag}
                        />

                        <TimelineHeaderActions
                            earliestMediaMs={earliestMediaMs}
                            latestMediaMs={latestMediaMs}
                            hasActiveCut={hasActiveCut}
                            onJumpToFirst={() => {
                                if (earliestMediaMs === null) return;
                                setPlayheadMs?.(earliestMediaMs);
                                onJumpViewportTo?.(earliestMediaMs, 'start');
                            }}
                            onJumpToLast={() => {
                                if (latestMediaMs === null) return;
                                setPlayheadMs?.(latestMediaMs);
                                onJumpViewportTo?.(latestMediaMs, 'end');
                            }}
                            onContextualFit={() => {
                                if (hasActiveCut) onFitRange?.(inPointMs, outPointMs);
                                else if (earliestMediaMs !== null && latestMediaMs !== null && latestMediaMs > earliestMediaMs) {
                                    onFitRange?.(earliestMediaMs, latestMediaMs);
                                } else {
                                    onZoomReset?.();
                                }
                            }}
                            onResetZoom={onZoomReset}
                            baseEpochMs={baseEpochMs}
                            timeMode={timeMode}
                            keystrokeMode={keystrokeMode}
                            onChangeKeystrokeMode={onChangeKeystrokeMode}
                            showRulerKeystrokes={showRulerKeystrokes}
                            onToggleRulerKeystrokes={onToggleRulerKeystrokes}
                        />
                    </div>

                    <div className="ruler-container-offset">
                        <TimelineRuler
                            baseEpochMs={baseEpochMs}
                            timeMode={timeMode}
                            viewportStartMs={viewportStartMs}
                            viewportDurationMs={viewportDurationMs}
                            totalDurationMs={totalDurationMs}
                            hoverMs={hoverMs}
                            onHoverChange={setHoverMs}
                            onSeek={(seekMs) => setPlayheadMs?.(seekMs)}
                            inPointMs={inPointMs}
                            outPointMs={outPointMs}
                            earliestMediaMs={earliestMediaMs}
                            movieBoundaries={movieBoundaries}
                            stationHostname={activeStationObj?.hostname || activeStationObj?.id || activeStationObj?.name}
                            activeStationName={activeStationObj?.displayName || activeStationObj?.hostname || activeStationObj?.name}
                            stations={stations}
                            showKeystrokes={Boolean(showRulerKeystrokes ?? showKeystrokes)}
                            keystrokes={keystrokes}
                            recordingSegments={recordingSegments}
                        />
                    </div>
                </div>
            </div>

            {totalBanks > 1 && (
                <div className="timeline-bank-nav-bar">
                    <button
                        type="button"
                        disabled={trackBankIndex === 0}
                        onClick={() => setTrackBankIndex(p => Math.max(0, p - 1))}
                        className="btn-bank-step"
                        title="Previous 8 channels"
                    >
                        ◀ PREV
                    </button>
                    <span className="bank-status-pill">
                        CHANNELS {trackBankIndex * TRACKS_PER_BANK + 1}–{Math.min(stations.length, (trackBankIndex + 1) * TRACKS_PER_BANK)} OF {stations.length}
                    </span>
                    <button
                        type="button"
                        disabled={trackBankIndex >= totalBanks - 1}
                        onClick={() => setTrackBankIndex(p => Math.min(totalBanks - 1, p + 1))}
                        className="btn-bank-step"
                        title="Next 8 channels"
                    >
                        NEXT ▶
                    </button>
                </div>
            )}

            <div
                className="tracks-with-export-layout"
                onMouseMove={(e) => {
                    if (draggingTarget || !trackAreaRef.current) return;
                    const rect = trackAreaRef.current.getBoundingClientRect();
                    if (e.clientX >= rect.left + TIMELINE_SIDEBAR_WIDTH_PX && e.clientX <= rect.right - TIMELINE_EXPORT_WIDTH_PX) {
                        setHoverMs(getMsFromClientX(e.clientX));
                    } else {
                        setHoverMs(null);
                    }
                }}
                onMouseLeave={() => !draggingTarget && setHoverMs(null)}
            >
                <div className="tracks-scroll-area">
                    {/* Master Video Section Header Bar */}
                    <div className="timeline-section-divider-bar video-section-bar">
                        <div className="section-title-wrap" onClick={() => setIsMasterVideoOpen(prev => !prev)}>
                            <button type="button" className="btn-section-toggle" title="Collapse / Expand All Video Stations">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="11" height="11">
                                    <polyline points={isMasterVideoOpen ? "6 9 12 15 18 9" : "9 18 15 12 9 6"} />
                                </svg>
                            </button>
                            <span className="section-title-text">
                                🎬 VIDEO STATIONS ({stations.length} Active Workstations)
                            </span>
                        </div>

                        {isMasterVideoOpen && totalBanks > 1 && (
                            <div className="bank-pagination-inline">
                                <button
                                    type="button"
                                    disabled={trackBankIndex === 0}
                                    onClick={(e) => { e.stopPropagation(); setTrackBankIndex(p => Math.max(0, p - 1)); }}
                                    className="btn-bank-mini"
                                    title="Previous Bank"
                                >
                                    ◀
                                </button>
                                <span className="bank-pill-mini">
                                    BANK {trackBankIndex + 1}/{totalBanks} ({trackBankIndex * TRACKS_PER_BANK + 1}–{Math.min(stations.length, (trackBankIndex + 1) * TRACKS_PER_BANK)})
                                </span>
                                <button
                                    type="button"
                                    disabled={trackBankIndex >= totalBanks - 1}
                                    onClick={(e) => { e.stopPropagation(); setTrackBankIndex(p => Math.min(totalBanks - 1, p + 1)); }}
                                    className="btn-bank-mini"
                                    title="Next Bank"
                                >
                                    ▶
                                </button>
                            </div>
                        )}
                    </div>

                    {/* When Video Area is Collapsed: Sleek Master Track with Filmstrip in Cuts & Zero Gaps */}
                    {!isMasterVideoOpen && (
                        <div className="timeline-track-container master-video-summary-track" onClick={() => setIsMasterVideoOpen(true)}>
                            <div className="track-sidebar summary-sidebar" title="Click to Expand Video Stations">
                                <button type="button" className="btn-accordion-toggle">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="11" height="11">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </button>
                                <span className="summary-title">ALL VIDEO (CANVAS)</span>
                                <span className="summary-badge">{currentPlacements?.length || stations.length} STA</span>
                            </div>
                            <div className="track-canvas">
                                {stations.length > 0 && (() => {
                                    const primaryPlacement = currentPlacements?.find(p => p.isPrimary || p.isFocused) || currentPlacements?.[0];
                                    const masterHost = primaryPlacement?.stationId || stations[0]?.hostname || stations[0]?.id;
                                    const masterDisp = primaryPlacement?.displayId || 'mon-0';
                                    let masterSegs = [];
                                    if (currentPlacements && currentPlacements.length > 0) {
                                        const segSet = new Map();
                                        currentPlacements.forEach(p => {
                                            const sSegs = recordingSegments[p.stationId] || recordingSegments[p.stationId?.toLowerCase()] || [];
                                            sSegs.forEach(s => {
                                                const k = `${s.startEpochMs || s.start}_${s.endEpochMs || s.end}`;
                                                if (!segSet.has(k)) segSet.set(k, s);
                                            });
                                        });
                                        masterSegs = Array.from(segSet.values());
                                    }
                                    if (masterSegs.length === 0) {
                                        masterSegs = recordingSegments[stations[0]?.id] || recordingSegments[stations[0]?.hostname] || stations[0]?.segments || [];
                                    }

                                    return (
                                        <FilmstripCanvas
                                            hostname={masterHost}
                                            displayId={masterDisp}
                                            activeSegments={masterSegs}
                                            viewportStartMs={viewportStartMs}
                                            viewportDurationMs={viewportDurationMs}
                                            baseEpochMs={baseEpochMs}
                                            inPointMs={inPointMs}
                                            outPointMs={outPointMs}
                                            globalGaps={estimateData?.removedGlobalGaps || []}
                                            isAutoDirectorEnabled={false}
                                            isCanvasSummary={true}
                                        />
                                    );
                                })()}
                            </div>
                        </div>
                    )}

                    {/* When Video Area is Open: Paginated Workstation Tracks with Accordion */}
                    {isMasterVideoOpen && (
                        stations.length > 0 ? (
                            currentBankStations.map(station => {
                                const isSoloed = Boolean(activeStationId && station.id === activeStationId);
                                const isExpanded = expandedStationId === station.id;
                                const isStationAutoDirectorOn = stationAutoDirectorMap ? (stationAutoDirectorMap[station.id] ?? true) : true;

                                return (
                                    <TimelineTrack
                                        key={station.id}
                                        station={station}
                                        isExpanded={isExpanded && getStationDisplaysCount(station) > 1}
                                        onToggleExpand={() => {
                                            if (getStationDisplaysCount(station) > 1) {
                                                setExpandedStationId(prev => prev === station.id ? null : station.id);
                                            }
                                        }}
                                        isAutoDirectorEnabled={isStationAutoDirectorOn}
                                        onToggleAutoDirector={onToggleStationAutoDirector}
                                        canvasPlacements={currentPlacements}
                                        onToggleDisplayOnCanvas={onToggleDisplayOnCanvas}
                                        directorPlan={station.directorPlan}
                                        isActive={isSoloed}
                                        onSelect={() => onSelectActiveStation?.(station.id)}
                                        onStationContextMenu={onStationContextMenu}
                                        onDeselectStation={onDeselectStation}
                                        viewportStartMs={viewportStartMs}
                                        viewportDurationMs={viewportDurationMs}
                                        inPointMs={inPointMs}
                                        outPointMs={outPointMs}
                                        baseEpochMs={baseEpochMs}
                                        segments={recordingSegments[station.id] || recordingSegments[station.hostname] || station.segments || []}
                                        recordingSegments={recordingSegments}
                                        globalGaps={estimateData?.removedGlobalGaps || []}
                                    />
                                );
                            })
                        ) : (
                            <div className="timeline-empty-tracks-placeholder">
                                <span className="placeholder-pulse" />
                                <span>NO STATIONS SELECTED — TIMELINE CHANNELS MUTED</span>
                            </div>
                        )
                    )}

                    {/* 2. Global Support Channels (Grouped cleanly at the end, one after the other) */}
                    {stations.length > 0 && (
                        <AudioRoutingTrack
                            audioPlan={audioRoutingPlan}
                            stations={stations}
                            viewportStartMs={viewportStartMs}
                            viewportDurationMs={viewportDurationMs}
                            baseEpochMs={baseEpochMs}
                            playheadMs={playheadMs}
                            onSplitSegment={onSplitAudioSegment}
                            onChangeSegmentStation={onChangeAudioSegmentStation}
                            onChangeSegmentGain={onChangeAudioSegmentGain}
                            onFollowVisualFeed={onFollowVisualFeed}
                            isAutoFollow={isAutoFollowAudio}
                            timeMode={timeMode}
                            onUpdateAudioPlan={onUpdateAudioPlan}
                        />
                    )}
                    <CanvasKeyframeTrack
                            canvasLayoutTimeline={canvasLayoutTimeline}
                            activeKfIndex={activeKfIndex}
                            onSelectKeyframe={onSelectKeyframe}
                            onAddKeyframeAtEpoch={onAddKeyframeAtEpoch}
                            onDeleteKeyframe={onDeleteKeyframe}
                            onUpdateKeyframeEpoch={onUpdateKeyframeEpoch}
                            onUpdateKeyframeTransition={onUpdateKeyframeTransition}
                            onUpdateKeyframeClockPosition={onUpdateKeyframeClockPosition}
                            viewportStartMs={viewportStartMs}
                            viewportDurationMs={viewportDurationMs}
                            baseEpochMs={baseEpochMs}
                            totalDurationMs={totalDurationMs}
                            playheadMs={playheadMs}
                            inPointMs={inPointMs}
                            outPointMs={outPointMs}
                            timeMode={timeMode}
                        />
                </div>

                <TimelineVerticalExportBtn
                    isRangeValid={isRangeValid}
                    onExport={onExport}
                    isEstimating={isEstimating}
                    estimateData={estimateData}
                    formatEstimateSize={formatEstimateSize}
                    stationsCount={stations.length}
                />
            </div>

            <Playhead
                baseEpochMs={baseEpochMs}
                timeMode={timeMode}
                viewportStartMs={viewportStartMs}
                viewportDurationMs={viewportDurationMs}
                playheadMs={playheadMs}
                inPointMs={inPointMs}
                outPointMs={outPointMs}
                onStartDrag={handleStartDrag}
            />

            <TimelineContextMenu
                contextMenu={contextMenu}
                baseEpochMs={baseEpochMs}
                timeMode={timeMode}
                onAction={(type) => {
                    if (!contextMenu) return;
                    if (type === 'playhead') setPlayheadMs?.(contextMenu.targetMs);
                    else if (type === 'in') setInPointMs?.(Math.max(0, Math.min(contextMenu.targetMs, outPointMs - 1000)));
                    else if (type === 'out') setOutPointMs?.(Math.min(totalDurationMs, Math.max(contextMenu.targetMs, inPointMs + 1000)));
                    setContextMenu(null);
                }}
                onClose={() => setContextMenu(null)}
            />
        </div>
    );
}