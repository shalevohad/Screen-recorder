// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/TimelineBoard.jsx
// ==========================================
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';

// 💡 ייבוא רכיבי הסרגל העליון (header)
import TimelineRuler from './header/TimelineRuler.jsx';
import SessionClockBadge from './header/SessionClockBadge.jsx';
import TimelineMinimap from './header/TimelineMinimap.jsx';
import TimelineHeaderActions from './header/TimelineHeaderActions.jsx';

// 💡 ייבוא שכבת הערוצים (tracks)
import TimelineTrack from './tracks/TimelineTrack.jsx';

// 💡 ייבוא שכבות מרחפות (overlays)
import Playhead from './overlays/Playhead.jsx';
import TimelineContextMenu from './overlays/TimelineContextMenu.jsx';

// 💡 ייבוא כפתור ייצוא (export)
import TimelineVerticalExportBtn from './export/TimelineVerticalExportBtn.jsx';

// 💡 ייבוא Hooks ייעודיים
import { useTimelineEstimate } from './hooks/useTimelineEstimate.js';
import { useTimelineDrag } from './hooks/useTimelineDrag.js';

import './TimelineBoard.scss';

const TRACKS_PER_BANK = 8;

export default function TimelineBoard({
    stations = [],
    activeStationId,
    onSelectActiveStation,
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
    onJumpViewportTo
}) {
    const [hoverMs, setHoverMs] = useState(null);
    const [trackBankIndex, setTrackBankIndex] = useState(0);
    const [contextMenu, setContextMenu] = useState(null);

    const trackAreaRef = useRef(null);
    const minimapRef = useRef(null);
    const viewportDurationMs = totalDurationMs / Math.max(1, zoomLevel);

    const totalBanks = Math.ceil(stations.length / TRACKS_PER_BANK) || 1;
    const currentBankStations = useMemo(() => {
        const start = trackBankIndex * TRACKS_PER_BANK;
        return stations.slice(start, start + TRACKS_PER_BANK);
    }, [stations, trackBankIndex]);

    useEffect(() => {
        if (!activeStationId) return;
        const stationIdx = stations.findIndex(s => s.id === activeStationId);
        if (stationIdx !== -1) {
            const neededBank = Math.floor(stationIdx / TRACKS_PER_BANK);
            if (neededBank !== trackBankIndex) setTrackBankIndex(neededBank);
        }
    }, [activeStationId, stations, trackBankIndex]);

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
                            activeStationName={activeStationObj?.displayName || activeStationObj?.hostname || activeStationObj?.name}
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
                    {stations.length > 0 ? (
                        currentBankStations.map(station => (
                            <TimelineTrack
                                key={station.id}
                                station={station}
                                isActive={station.id === activeStationId}
                                onSelect={() => onSelectActiveStation?.(station.id)}
                                viewportStartMs={viewportStartMs}
                                viewportDurationMs={viewportDurationMs}
                                inPointMs={inPointMs}
                                outPointMs={outPointMs}
                                baseEpochMs={baseEpochMs}
                                segments={recordingSegments[station.id] || recordingSegments[station.hostname] || station.segments || []}
                                recordingSegments={recordingSegments}
                                globalGaps={estimateData?.removedGlobalGaps || []}
                                disableFilmstrip={stations.length > 1 && station.id !== activeStationId}
                            />
                        ))
                    ) : (
                        <div className="timeline-empty-tracks-placeholder">
                            <span className="placeholder-pulse" />
                            <span>NO STATIONS SELECTED — TIMELINE CHANNELS MUTED</span>
                        </div>
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