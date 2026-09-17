import React, { useState, useRef, useEffect, useCallback } from 'react';
import TimelineRuler from './TimelineRuler.jsx';
import TimelineTrack from './TimelineTrack.jsx';
import Playhead from './Playhead.jsx';
import { formatTimelineClock } from '../../utils/timeFormat.js';
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
    onExport
}) {
    const [hoverMs, setHoverMs] = useState(null);
    const [viewportStartMs, setViewportStartMs] = useState(0);
    const [draggingTarget, setDraggingTarget] = useState(null);
    const [dragStartInfo, setDragStartInfo] = useState(null);
    const [contextMenu, setContextMenu] = useState(null);

    const trackAreaRef = useRef(null);
    const minimapRef = useRef(null);

    const maxDynamicZoom = Math.max(32, totalDurationMs / 2000);
    const viewportDurationMs = totalDurationMs / zoomLevel;

    useEffect(() => {
        setViewportStartMs(prev => Math.max(0, Math.min(prev, totalDurationMs - viewportDurationMs)));
    }, [zoomLevel, totalDurationMs, viewportDurationMs]);

    const getMsFromClientX = useCallback((clientX) => {
        if (!trackAreaRef.current) return viewportStartMs;
        const rect = trackAreaRef.current.getBoundingClientRect();
        const contentLeft = rect.left + 150;
        const contentWidth = rect.width - 150 - 46; // פינוי מקום לכפתור ה-Export האנכי מצד ימין
        if (contentWidth <= 0) return viewportStartMs;

        const offsetX = Math.max(0, Math.min(clientX - contentLeft, contentWidth));
        const relativeMs = (offsetX / contentWidth) * viewportDurationMs;
        return Math.round(viewportStartMs + relativeMs);
    }, [viewportStartMs, viewportDurationMs]);

    const handleFitCut = () => {
        const cutDur = Math.max(2000, outPointMs - inPointMs);
        const targetZoom = Math.max(1, Math.min(maxDynamicZoom, totalDurationMs / cutDur * 0.85));
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

    const handleContextMenu = (e) => {
        e.preventDefault();
        const rect = trackAreaRef.current?.getBoundingClientRect();
        if (!rect || e.clientX - rect.left < 150) return;

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
            }
            else if (draggingTarget === 'in') {
                const maxIn = outPointMs - 1000;
                setInPointMs(Math.max(0, Math.min(currentMs, maxIn)));
            }
            else if (draggingTarget === 'out') {
                const minOut = inPointMs + 1000;
                setOutPointMs(Math.min(totalDurationMs, Math.max(currentMs, minOut)));
            }
            else if (draggingTarget === 'range' && dragStartInfo) {
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

    const inPercent = Math.max(0, Math.min(100, (inPointMs / totalDurationMs) * 100));
    const outPercent = Math.max(0, Math.min(100, (outPointMs / totalDurationMs) * 100));
    const cutWidthPercent = outPercent - inPercent;

    const vpStartPercent = Math.max(0, Math.min(100, (viewportStartMs / totalDurationMs) * 100));
    const vpWidthPercent = Math.max(0, Math.min(100 - vpStartPercent, (viewportDurationMs / totalDurationMs) * 100));

    return (
        <div ref={trackAreaRef} className="timeline-board-root" onContextMenu={handleContextMenu}>
            <div className="timeline-overview-strip">
                {/* אזור הריבוע הפנוי במקום SESSION MAP: הצגת שעון דיגיטלי מודרני לזמני IN/OUT */}
                <div className="overview-digital-clock-label">
                    <span className="clock-item"><span className="lbl">IN</span> {formatTimelineClock(baseEpochMs + inPointMs, timeMode)}</span>
                    <span className="divider">/</span>
                    <span className="clock-item"><span className="lbl">OUT</span> {formatTimelineClock(baseEpochMs + outPointMs, timeMode)}</span>
                </div>

                <div ref={minimapRef} className="overview-track-canvas" onMouseDown={(e) => handleStartDrag('minimap-viewport', e)}>
                    <div className="minimap-viewport-box" style={{ left: `${vpStartPercent}%`, width: `${vpWidthPercent}%` }}>
                        {zoomLevel > 1 && vpWidthPercent > 12 && (
                            <>
                                <span className="minimap-time-text left">{formatTimelineClock(baseEpochMs + viewportStartMs, timeMode)}</span>
                                <span className="minimap-time-text right">{formatTimelineClock(baseEpochMs + viewportStartMs + viewportDurationMs, timeMode)}</span>
                            </>
                        )}
                    </div>

                    <div className="minimap-cut-highlight" style={{ left: `${inPercent}%`, width: `${cutWidthPercent}%` }}>
                        {cutWidthPercent > 12 && (
                            <>
                                <span className="minimap-time-text left">{formatTimelineClock(baseEpochMs + inPointMs, timeMode)}</span>
                                <span className="minimap-time-text right">{formatTimelineClock(baseEpochMs + outPointMs, timeMode)}</span>
                            </>
                        )}
                    </div>

                    <div className="minimap-needle" style={{ left: `${(playheadMs / totalDurationMs) * 100}%` }} />
                </div>

                <div className="timeline-zoom-controls">
                    <button onClick={handleFitCut} className="btn-zoom-action" title="Fit cut region to center viewport">FIT</button>
                    <button onClick={handleResetZoom} className="btn-zoom-action reset" title="Reset zoom to full session">RESET</button>
                </div>
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

            <div className="tracks-with-export-layout">
                <div className="tracks-scroll-area">
                    {stations.map(station => (
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
                        />
                    ))}
                </div>

                {/* כפתור ה-Export האנכי הבולט בצד ימין */}
                <button
                    type="button"
                    onClick={onExport}
                    className="btn-vertical-export-action"
                    title="Cut & Extract Selected Range (Export)"
                >
                    <div className="export-icon-stack">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="6" cy="6" r="3" />
                            <circle cx="6" cy="18" r="3" />
                            <line x1="20" y1="4" x2="8.12" y2="15.88" />
                            <line x1="14.47" y1="14.48" x2="20" y2="20" />
                            <line x1="8.12" y1="8.12" x2="12" y2="12" />
                        </svg>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

            {contextMenu && (
                <div
                    className="timeline-context-menu"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="menu-header">
                        TIMELINE @ {formatTimelineClock(baseEpochMs + contextMenu.targetMs, timeMode)}
                    </div>
                    <button onClick={() => handleMenuAction('playhead')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                        Move Playhead Here
                    </button>
                    <button onClick={() => handleMenuAction('in')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6v12M10 6l6 6-6 6" /></svg>
                        Set Cut IN Marker ([)
                    </button>
                    <button onClick={() => handleMenuAction('out')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6v12M14 6l-6 6 6 6" /></svg>
                        Set Cut OUT Marker (])
                    </button>
                </div>
            )}
        </div>
    );
}