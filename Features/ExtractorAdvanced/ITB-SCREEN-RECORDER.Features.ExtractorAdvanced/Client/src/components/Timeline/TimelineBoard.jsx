import React, { useState, useRef, useEffect, useCallback } from 'react';
import TimelineRuler from './TimelineRuler';
import TimelineTrack from './TimelineTrack';
import Playhead from './Playhead';
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
    setOutPointMs
}) {
    const [hoverMs, setHoverMs] = useState(null);
    const [viewportStartMs, setViewportStartMs] = useState(0);
    const [draggingTarget, setDraggingTarget] = useState(null);
    const [dragStartInfo, setDragStartInfo] = useState(null);

    const trackAreaRef = useRef(null);
    const minimapRef = useRef(null);

    // חלון הזמן הנצפה בפועל בטיים-ליין לפי רמת הזום
    const viewportDurationMs = totalDurationMs / zoomLevel;

    // שמירה על גבולות תקינים בזמן שינוי זום
    useEffect(() => {
        setViewportStartMs(prev => Math.max(0, Math.min(prev, totalDurationMs - viewportDurationMs)));
    }, [zoomLevel, totalDurationMs, viewportDurationMs]);

    // המרת מיקום עכבר (X) לזמן במילי-שניות מתוך החלון הנצפה
    const getMsFromClientX = useCallback((clientX) => {
        if (!trackAreaRef.current) return viewportStartMs;
        const rect = trackAreaRef.current.getBoundingClientRect();
        const contentLeft = rect.left + 150; // קיזוז ה-Sidebar של שמות התחנות
        const contentWidth = rect.width - 150;
        if (contentWidth <= 0) return viewportStartMs;

        const offsetX = Math.max(0, Math.min(clientX - contentLeft, contentWidth));
        const relativeMs = (offsetX / contentWidth) * viewportDurationMs;
        return Math.round(viewportStartMs + relativeMs);
    }, [viewportStartMs, viewportDurationMs]);

    // =========================================================
    // זום באמצעות גלגלת העכבר (Wheel Zoom) ממוקד במיקום הסמן
    // =========================================================
    useEffect(() => {
        const el = trackAreaRef.current;
        if (!el) return;

        const handleWheel = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const zoomFactor = e.deltaY < 0 ? 1.25 : 0.8;
            const newZoom = Math.max(1, Math.min(32, +(zoomLevel * zoomFactor).toFixed(2)));
            if (newZoom === zoomLevel) return;

            // שמירת מיקום העכבר בזמן אבסולוטי כדי שהזום יתבצע סביב הנקודה שעליה מצביעים
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
    }, [zoomLevel, viewportStartMs, viewportDurationMs, totalDurationMs, getMsFromClientX, onZoomChange]);

    // =========================================================
    // ניהול גרירה: IN, OUT, RANGE, PLAYHEAD, MINIMAP
    // =========================================================
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

        const snapThreshold = viewportDurationMs * 0.015; // סף מגנוט של 1.5% מרוחב החלון

        const handleMouseMove = (e) => {
            // גרירת ה-Viewport בחלון ה-Minimap העליון
            if (draggingTarget === 'minimap-viewport' && minimapRef.current) {
                const rect = minimapRef.current.getBoundingClientRect();
                const offsetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                const targetCenterMs = (offsetX / rect.width) * totalDurationMs;
                const newStart = Math.max(0, Math.min(targetCenterMs - viewportDurationMs / 2, totalDurationMs - viewportDurationMs));
                setViewportStartMs(newStart);
                return;
            }

            const currentMs = getMsFromClientX(e.clientX);

            // גרירת ה-Playhead עם מגנוט אוטומטי ל-IN ול-OUT
            if (draggingTarget === 'playhead') {
                let target = currentMs;
                if (Math.abs(target - inPointMs) <= snapThreshold) {
                    target = inPointMs;
                } else if (Math.abs(target - outPointMs) <= snapThreshold) {
                    target = outPointMs;
                }
                setPlayheadMs(Math.max(0, Math.min(totalDurationMs, target)));
            }
            // גרירת סמן IN בודד
            else if (draggingTarget === 'in') {
                const maxIn = outPointMs - 1000;
                setInPointMs(Math.max(0, Math.min(currentMs, maxIn)));
            }
            // גרירת סמן OUT בודד
            else if (draggingTarget === 'out') {
                const minOut = inPointMs + 1000;
                setOutPointMs(Math.min(totalDurationMs, Math.max(currentMs, minOut)));
            }
            // גרירת כל שטח החיתוך כמקשה אחת (Whole Range Drag)
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

    return (
        <div ref={trackAreaRef} className="timeline-board-root">
            {/* סרגל Minimap עליון קבוע עם פקדי זום */}
            <div className="timeline-overview-strip">
                <div className="overview-sidebar-label">SESSION MAP</div>

                <div
                    ref={minimapRef}
                    className="overview-track-canvas"
                    onMouseDown={(e) => handleStartDrag('minimap-viewport', e)}
                >
                    {/* חלון ה-Viewport הנצפה בזום */}
                    <div
                        className="minimap-viewport-box"
                        style={{
                            left: `${(viewportStartMs / totalDurationMs) * 100}%`,
                            width: `${(viewportDurationMs / totalDurationMs) * 100}%`
                        }}
                    />

                    {/* חיווי טווח החיתוך המסומן במפה הכללית */}
                    <div
                        className="minimap-cut-highlight"
                        style={{
                            left: `${(inPointMs / totalDurationMs) * 100}%`,
                            width: `${((outPointMs - inPointMs) / totalDurationMs) * 100}%`
                        }}
                    />

                    {/* סמן ה-Playhead במפה הכללית */}
                    <div
                        className="minimap-needle"
                        style={{ left: `${(playheadMs / totalDurationMs) * 100}%` }}
                    />
                </div>

                {/* פקדי זום צמודים לסרגל */}
                <div className="timeline-zoom-controls">
                    <button
                        onClick={() => onZoomChange && onZoomChange(Math.max(1, +(zoomLevel / 1.5).toFixed(1)))}
                        className="btn-zoom"
                        title="Zoom Out"
                    >
                        -
                    </button>
                    <span className="zoom-value">{zoomLevel}x</span>
                    <button
                        onClick={() => onZoomChange && onZoomChange(Math.min(32, +(zoomLevel * 1.5).toFixed(1)))}
                        className="btn-zoom"
                        title="Zoom In"
                    >
                        +
                    </button>
                    <button
                        onClick={onZoomReset}
                        className="btn-fit"
                        title="Reset Zoom to 1x"
                    >
                        FIT
                    </button>
                </div>
            </div>

            {/* סרגל הזמנים עם שעון אמת ומתג LOCAL/UTC */}
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
                />
            </div>

            {/* ערוצי התחנות והפריימים */}
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
                    />
                ))}

                {/* שכבת הסמנים האינטראקטיבית */}
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
            </div>
        </div>
    );
}