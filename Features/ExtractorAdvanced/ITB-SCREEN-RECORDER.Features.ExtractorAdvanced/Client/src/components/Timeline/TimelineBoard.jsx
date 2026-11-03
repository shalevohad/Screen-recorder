// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/TimelineBoard.jsx
// ==========================================
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';

import TimelineRuler from './header/TimelineRuler.jsx';
import SessionClockBadge from './header/SessionClockBadge.jsx';
import TimelineMinimap from './header/TimelineMinimap.jsx';
import TimelineHeaderActions from './header/TimelineHeaderActions.jsx';
import TimelineTrack from './tracks/TimelineTrack.jsx';
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
    _onZoomChange,
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
    onToggleDisplayOnCanvas,
    onUpdateAudioPlan
}) {
    const [hoverMs, setHoverMs] = useState(null);
    const [trackBankIndex, setTrackBankIndex] = useState(0);
    const [contextMenu, setContextMenu] = useState(null);
    const [isMasterVideoOpen, setIsMasterVideoOpen] = useState(true);
    const [expandedStationId, setExpandedStationId] = useState(null);

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
        const contentLeft = rect.left + 180;
        const contentWidth = rect.width - 180 - 58;
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

    const isRangeValid = stations.length > 0 && Math.abs(outPointMs - inPointMs) >= 1000;

    return (
        <div
            ref={trackAreaRef}
            className="timeline-board-root"
            onContextMenu={(e) => {
                e.preventDefault();
                const rect = trackAreaRef.current?.getBoundingClientRect();
                if (!rect || e.clientX - rect.left < 180 || e.clientX > rect.right - 58) return;
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
                            showKeystrokes={Boolean(showRulerKeystrokes ?? showKeystrokes)}
                            keystrokes={keystrokes}
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
                    if (e.clientX >= rect.left + 180 && e.clientX <= rect.right - 58) {
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
                                {isMasterVideoOpen ? '▼' : '▶'}
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

                    {/* When Video Area is Collapsed: Sleek 26px Master Health Bar with Global Gaps */}
                    {!isMasterVideoOpen && (
                        <div className="timeline-track-container master-video-summary-track" onClick={() => setIsMasterVideoOpen(true)}>
                            <div className="track-sidebar summary-sidebar">
                                <button type="button" className="btn-accordion-toggle">▶</button>
                                <span className="summary-title">🎬 ALL VIDEO (COLLAPSED)</span>
                                <span className="summary-badge">{stations.length} STATIONS</span>
                            </div>
                            <div className="track-canvas">
                                <div className="full-height-gaps-layer">
                                    {(estimateData?.removedGlobalGaps || []).map((gap, gIdx) => {
                                        const sMs = gap.startEpochMs - baseEpochMs;
                                        const eMs = gap.endEpochMs - baseEpochMs;
                                        const leftPct = ((Math.max(viewportStartMs, sMs) - viewportStartMs) / viewportDurationMs) * 100;
                                        const rightPct = ((Math.min(viewportStartMs + viewportDurationMs, eMs) - viewportStartMs) / viewportDurationMs) * 100;
                                        const widthPct = rightPct - leftPct;
                                        if (widthPct <= 0) return null;
                                        const durSec = Math.round((gap.endEpochMs - gap.startEpochMs) / 1000);
                                        return (
                                            <div
                                                key={`sum_gap_${gIdx}`}
                                                className="gap-full-block gap-global-skipped"
                                                style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                                                title={`Shared Gap: ${durSec}s skipped across all stations`}
                                            >
                                                <div className="gap-pattern" />
                                                {widthPct > 5 && (
                                                    <div className="gap-badge global-badge">
                                                        <span>✂ SKIPPED (${durSec}s)</span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="data-presence-layer">
                                    <div className="data-presence-bar" style={{ left: '0%', width: '100%' }} />
                                </div>
                                {inPointMs > viewportStartMs && (
                                    <div className="mask-dimmed left-mask" style={{ width: `${Math.min(100, ((inPointMs - viewportStartMs) / viewportDurationMs) * 100)}%` }} />
                                )}
                                {outPointMs < viewportStartMs + viewportDurationMs && (
                                    <div className="mask-dimmed right-mask" style={{ left: `${Math.max(0, ((outPointMs - viewportStartMs) / viewportDurationMs) * 100)}%`, right: 0 }} />
                                )}
                            </div>
                        </div>
                    )}

                    {/* When Video Area is Open: Paginated Workstation Tracks with Accordion */}
                    {isMasterVideoOpen && (
                        stations.length > 0 ? (
                            currentBankStations.map(station => {
                                const isSoloed = station.id === activeStationId;
                                const isExpanded = expandedStationId === station.id;
                                const isStationAutoDirectorOn = stationAutoDirectorMap ? (stationAutoDirectorMap[station.id] ?? true) : true;

                                return (
                                    <TimelineTrack
                                        key={station.id}
                                        station={station}
                                        isExpanded={isExpanded}
                                        onToggleExpand={() => setExpandedStationId(prev => prev === station.id ? null : station.id)}
                                        isAutoDirectorEnabled={isStationAutoDirectorOn}
                                        onToggleAutoDirector={onToggleStationAutoDirector}
                                        canvasPlacements={currentPlacements}
                                        onToggleDisplayOnCanvas={onToggleDisplayOnCanvas}
                                        directorPlan={station.directorPlan}
                                        isActive={isSoloed || !activeStationId}
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
                    {canvasLayoutTimeline?.keyframes?.length > 0 && (
                        <CanvasKeyframeTrack
                            canvasLayoutTimeline={canvasLayoutTimeline}
                            activeKfIndex={activeKfIndex}
                            onSelectKeyframe={onSelectKeyframe}
                            onAddKeyframeAtEpoch={onAddKeyframeAtEpoch}
                            onDeleteKeyframe={onDeleteKeyframe}
                            onUpdateKeyframeEpoch={onUpdateKeyframeEpoch}
                            viewportStartMs={viewportStartMs}
                            viewportDurationMs={viewportDurationMs}
                            baseEpochMs={baseEpochMs}
                            totalDurationMs={totalDurationMs}
                            playheadMs={playheadMs}
                            timeMode={timeMode}
                        />
                    )}
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