// Client/src/components/Timeline/TimelineBoard.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import TimelineRuler from './TimelineRuler.jsx';
import TimelineTrack from './TimelineTrack.jsx';
import Playhead from './Playhead.jsx';
import SessionClockBadge from './SessionClockBadge.jsx';
import TimelineMinimap from './TimelineMinimap.jsx';
import TimelineContextMenu from './TimelineContextMenu.jsx';
import './TimelineBoard.scss';

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
    recordingSegments = {}
}) {
    const [hoverMs, setHoverMs] = useState(null);
    const [viewportStartMs, setViewportStartMs] = useState(0);
    const [draggingTarget, setDraggingTarget] = useState(null);
    const [dragStartInfo, setDragStartInfo] = useState(null);
    const [contextMenu, setContextMenu] = useState(null);

    const trackAreaRef = useRef(null);
    const minimapRef = useRef(null);
    const hasInitializedPlayheadRef = useRef(false);

    const maxDynamicZoom = Math.max(32, totalDurationMs / 2000);
    const viewportDurationMs = totalDurationMs / zoomLevel;

    useEffect(() => {
        if (!hasInitializedPlayheadRef.current && setPlayheadMs) {
            if (playheadMs === 0 || playheadMs === null || playheadMs === undefined) {
                setPlayheadMs(inPointMs);
                hasInitializedPlayheadRef.current = true;
            }
        }
    }, [inPointMs, playheadMs, setPlayheadMs]);

    useEffect(() => {
        setViewportStartMs(prev => Math.max(0, Math.min(prev, totalDurationMs - viewportDurationMs)));
    }, [zoomLevel, totalDurationMs, viewportDurationMs]);

    // חישוב מדויק של זמן ממיקום X: ניכוי 180px משמאל (Header) ו-58px מימין (Export Button)
    const getMsFromClientX = useCallback((clientX) => {
        if (!trackAreaRef.current) return viewportStartMs;
        const rect = trackAreaRef.current.getBoundingClientRect();
        const contentLeft = rect.left + 180;
        const contentWidth = rect.width - 180 - 58;
        if (contentWidth <= 0) return viewportStartMs;

        const offsetX = Math.max(0, Math.min(clientX - contentLeft, contentWidth));
        const relativeMs = (offsetX / contentWidth) * viewportDurationMs;
        return Math.round(viewportStartMs + relativeMs);
    }, [viewportStartMs, viewportDurationMs]);

    // סנכרון זמן הרולר בעת הזזת עכבר מעל אזור הערוצים (Tracks)
    const handleTracksMouseMove = useCallback((e) => {
        if (draggingTarget || !trackAreaRef.current) return;
        const rect = trackAreaRef.current.getBoundingClientRect();
        const contentLeft = rect.left + 180;
        const contentRight = rect.right - 58;

        if (e.clientX >= contentLeft && e.clientX <= contentRight) {
            const currentHoverMs = getMsFromClientX(e.clientX);
            setHoverMs(currentHoverMs);
        } else {
            setHoverMs(null);
        }
    }, [draggingTarget, getMsFromClientX]);

    const handleTracksMouseLeave = useCallback(() => {
        if (!draggingTarget) {
            setHoverMs(null);
        }
    }, [draggingTarget]);

    const handleFitCut = () => {
        const cutDur = Math.max(2000, outPointMs - inPointMs);
        const targetZoom = Math.max(1, Math.min(maxDynamicZoom, (totalDurationMs / cutDur) * 0.85));
        const center = (inPointMs + outPointMs) / 2;
        const newVpDur = totalDurationMs / targetZoom;
        const newStart = Math.max(0, Math.min(center - newVpDur / 2, totalDurationMs - newVpDur));
        setViewportStartMs(newStart);
        if (onZoomChange) onZoomChange(Number(targetZoom.toFixed(1)));
    };

    const handleResetZoom = () => {
        setViewportStartMs(0);
        if (onZoomReset) onZoomReset();
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

            const frameMs = 50;
            const isHighZoom = viewportDurationMs <= 30000;
            let baseStep = isHighZoom ? frameMs : 1000;
            const step = baseStep * (e.shiftKey ? 5 : 1);

            if (e.key === 'ArrowRight') {
                e.preventDefault();
                setPlayheadMs(prev => Math.min(totalDurationMs, prev + step));
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                setPlayheadMs(prev => Math.max(0, prev - step));
            } else if (e.key === '[') {
                e.preventDefault();
                const newOut = Math.max(playheadMs, inPointMs + 1000);
                setOutPointMs(Math.min(totalDurationMs, newOut));
            } else if (e.key === ']') {
                e.preventDefault();
                const newIn = Math.min(playheadMs, outPointMs - 1000);
                setInPointMs(Math.max(0, newIn));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [viewportDurationMs, totalDurationMs, playheadMs, inPointMs, outPointMs, setPlayheadMs, setInPointMs, setOutPointMs]);

    // פתיחת תפריט קליק ימני (Context Menu) עם חסימת קצוות מדויקת
    const handleContextMenu = (e) => {
        e.preventDefault();
        const rect = trackAreaRef.current?.getBoundingClientRect();
        if (!rect) return;

        if (e.clientX - rect.left < 180 || e.clientX > rect.right - 58) return;

        const targetMs = getMsFromClientX(e.clientX);
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            targetMs: Math.max(0, Math.min(totalDurationMs, targetMs))
        });
    };

    useEffect(() => {
        const handleClickOutside = () => setContextMenu(null);
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    const handleMenuAction = (actionType) => {
        if (!contextMenu) return;
        const { targetMs } = contextMenu;

        if (actionType === 'playhead') {
            setPlayheadMs(targetMs);
        } else if (actionType === 'in') {
            const newIn = Math.min(targetMs, outPointMs - 1000);
            setInPointMs(Math.max(0, newIn));
        } else if (actionType === 'out') {
            const newOut = Math.max(targetMs, inPointMs + 1000);
            setOutPointMs(Math.min(totalDurationMs, newOut));
        }
        setContextMenu(null);
    };

    useEffect(() => {
        const el = trackAreaRef.current;
        if (!el) return;

        const handleWheel = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const zoomFactor = e.deltaY < 0 ? 1.25 : 0.8;
            const newZoom = Math.max(1, Math.min(maxDynamicZoom, +(zoomLevel * zoomFactor).toFixed(2)));
            if (newZoom === zoomLevel) return;

            const mouseMs = getMsFromClientX(e.clientX);
            const newViewportDuration = totalDurationMs / newZoom;
            const cursorRatio = (mouseMs - viewportStartMs) / viewportDurationMs;

            let newStartMs = mouseMs - cursorRatio * newViewportDuration;
            newStartMs = Math.max(0, Math.min(newStartMs, totalDurationMs - newViewportDuration));

            setViewportStartMs(newStartMs);
            if (onZoomChange) onZoomChange(newZoom);
        };

        el.addEventListener('wheel', handleWheel, { passive: false });
        return () => el.removeEventListener('wheel', handleWheel);
    }, [zoomLevel, viewportStartMs, viewportDurationMs, totalDurationMs, getMsFromClientX, onZoomChange, maxDynamicZoom]);

    const handleStartDrag = (target, e) => {
        setContextMenu(null);
        setDraggingTarget(target);
        setDragStartInfo({
            startX: e.clientX,
            initialPlayhead: playheadMs,
            initialIn: inPointMs,
            initialOut: outPointMs,
            initialViewportStart: viewportStartMs
        });
    };

    useEffect(() => {
        if (!draggingTarget) return;

        const snapThreshold = viewportDurationMs * 0.015;

        const handleMouseMove = (e) => {
            if (draggingTarget === 'minimap-viewport' && minimapRef.current) {
                const rect = minimapRef.current.getBoundingClientRect();
                const offsetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                const targetCenterMs = (offsetX / rect.width) * totalDurationMs;
                const newStart = Math.max(0, Math.min(targetCenterMs - viewportDurationMs / 2, totalDurationMs - viewportDurationMs));
                setViewportStartMs(newStart);
                return;
            }

            const currentMs = getMsFromClientX(e.clientX);

            if (draggingTarget === 'playhead') {
                let target = currentMs;
                if (Math.abs(target - inPointMs) <= snapThreshold) { target = inPointMs; }
                else if (Math.abs(target - outPointMs) <= snapThreshold) { target = outPointMs; }
                setPlayheadMs(Math.max(0, Math.min(totalDurationMs, target)));
            } else if (draggingTarget === 'in') {
                const maxIn = outPointMs - 1000;
                setInPointMs(Math.max(0, Math.min(currentMs, maxIn)));
            } else if (draggingTarget === 'out') {
                const minOut = inPointMs + 1000;
                setOutPointMs(Math.min(totalDurationMs, Math.max(currentMs, minOut)));
            } else if (draggingTarget === 'range' && dragStartInfo) {
                const deltaMs = currentMs - getMsFromClientX(dragStartInfo.startX);
                const rangeDuration = dragStartInfo.initialOut - dragStartInfo.initialIn;
                let newIn = dragStartInfo.initialIn + deltaMs;
                let newOut = dragStartInfo.initialOut + deltaMs;

                if (newIn < 0) {
                    newIn = 0;
                    newOut = rangeDuration;
                } else if (newOut > totalDurationMs) {
                    newOut = totalDurationMs;
                    newIn = totalDurationMs - rangeDuration;
                }

                setInPointMs(newIn);
                setOutPointMs(newOut);
            }
        };

        const handleMouseUp = () => {
            setDraggingTarget(null);
            setDragStartInfo(null);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [draggingTarget, dragStartInfo, getMsFromClientX, inPointMs, outPointMs, playheadMs, totalDurationMs, viewportDurationMs, setPlayheadMs, setInPointMs, setOutPointMs]);

    const isRangeValid = stations.length > 0 && Math.abs(outPointMs - inPointMs) >= 1000;

    return (
        <div ref={trackAreaRef} className="timeline-board-root" onContextMenu={handleContextMenu}>
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
                            onFitCut={handleFitCut}
                            onResetZoom={handleResetZoom}
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
                            onSeek={(seekMs) => setPlayheadMs && setPlayheadMs(seekMs)}
                            inPointMs={inPointMs}
                            outPointMs={outPointMs}
                        />
                    </div>
                </div>
            </div>

            <div
                className="tracks-with-export-layout"
                onMouseMove={handleTracksMouseMove}
                onMouseLeave={handleTracksMouseLeave}
            >
                <div className="tracks-scroll-area">
                    {stations.length > 0 ? (
                        stations.map(station => (
                            <TimelineTrack
                                key={station.id}
                                station={station}
                                isActive={station.id === activeStationId}
                                onSelect={() => onSelectActiveStation && onSelectActiveStation(station.id)}
                                viewportStartMs={viewportStartMs}
                                viewportDurationMs={viewportDurationMs}
                                inPointMs={inPointMs}
                                outPointMs={outPointMs}
                                baseEpochMs={baseEpochMs}
                                segments={recordingSegments[station.id] || station.segments || []}
                                recordingSegments={recordingSegments}
                            />
                        ))
                    ) : (
                        <div className="timeline-empty-tracks-placeholder">
                            <span className="placeholder-pulse" />
                            <span>NO STATIONS SELECTED — TIMELINE CHANNELS MUTED</span>
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    onClick={isRangeValid ? onExport : undefined}
                    className={`btn-vertical-export-action ${isRangeValid ? 'active' : 'disabled'}`}
                    disabled={!isRangeValid}
                    title={
                        stations.length === 0
                            ? "Select stations to enable export"
                            : (isRangeValid ? "Export Clip (Ctrl+E)" : "Select a valid IN/OUT range to export")
                    }
                >
                    <div className="export-icon-top">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    </div>
                    <span className="vertical-label">EXPORT CUT</span>
                </button>
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
                onAction={handleMenuAction}
                onClose={() => setContextMenu(null)}
            />
        </div>
    );
}