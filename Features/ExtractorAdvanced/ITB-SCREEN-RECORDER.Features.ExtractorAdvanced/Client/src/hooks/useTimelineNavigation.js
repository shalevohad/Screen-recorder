// ==========================================
// File: Features/ExtractorAdvanced/Client/src/hooks/useTimelineNavigation.js
// ==========================================
import { useState, useEffect, useRef, useCallback } from 'react';

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

export function useTimelineNavigation({
    containerRef,
    totalTimelineDurationMs,
    initialZoom = 1,
    initialViewportStart = 0
}) {
    const [zoomLevel, setZoomLevel] = useState(initialZoom);
    const [viewportStartMs, setViewportStartMs] = useState(initialViewportStart);

    const animFrameRef = useRef(null);
    const viewportStartRef = useRef(viewportStartMs);
    viewportStartRef.current = viewportStartMs;
    const zoomLevelRef = useRef(zoomLevel);
    zoomLevelRef.current = zoomLevel;
    const totalDurationRef = useRef(totalTimelineDurationMs);
    totalDurationRef.current = totalTimelineDurationMs;

    const maxDynamicZoom = Math.max(32, totalTimelineDurationMs / 2000);
    const viewportDurationMs = totalTimelineDurationMs / zoomLevel;

    const animateViewportTo = useCallback((targetStart, durationMs = 280) => {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        const startPos = viewportStartRef.current;
        const delta = targetStart - startPos;
        if (Math.abs(delta) < 1) return;

        const startTime = performance.now();
        const step = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / durationMs);
            setViewportStartMs(Math.round(startPos + delta * easeOutCubic(progress)));

            if (progress < 1) animFrameRef.current = requestAnimationFrame(step);
            else animFrameRef.current = null;
        };
        animFrameRef.current = requestAnimationFrame(step);
    }, []);

    const fitRange = useCallback((startMs, endMs) => {
        const cutDur = Math.max(1000, endMs - startMs);
        const paddingMs = Math.max(500, cutDur * 0.05);
        const targetStart = Math.max(0, startMs - paddingMs);
        const targetEnd = Math.min(totalTimelineDurationMs, endMs + paddingMs);
        const effectiveDur = targetEnd - targetStart;

        const targetZoom = Math.max(1, Math.min(maxDynamicZoom, Number((totalTimelineDurationMs / effectiveDur).toFixed(1))));
        const newVpDur = totalTimelineDurationMs / targetZoom;
        const newStart = Math.max(0, Math.min(targetStart, totalTimelineDurationMs - newVpDur));

        animateViewportTo(newStart);
        setZoomLevel(targetZoom);
    }, [totalTimelineDurationMs, maxDynamicZoom, animateViewportTo]);

    const resetZoom = useCallback(() => {
        animateViewportTo(0);
        setZoomLevel(1);
    }, [animateViewportTo]);

    const jumpViewportTo = useCallback((targetMs, align = 'center') => {
        if (targetMs === null || targetMs === undefined) return;
        const offset = align === 'start' ? viewportDurationMs / 4 : (viewportDurationMs * 0.75);
        const targetStart = Math.max(0, Math.min(targetMs - offset, totalTimelineDurationMs - viewportDurationMs));
        animateViewportTo(targetStart);
    }, [viewportDurationMs, totalTimelineDurationMs, animateViewportTo]);

    useEffect(() => {
        return () => {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, []);

    useEffect(() => {
        let attachedEl = null;

        const handleWheel = (e) => {
            if (e.defaultPrevented) return;
            e.preventDefault();
            e.stopPropagation();

            const isHorizontalScroll = e.ctrlKey || e.shiftKey;
            const currentZoom = zoomLevelRef.current;
            const currentStart = viewportStartRef.current;
            const currentTotal = totalDurationRef.current;

            if (isHorizontalScroll) {
                const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
                if (delta === 0) return;

                const visibleDurationMs = currentTotal / Math.max(1, currentZoom);
                const maxStart = Math.max(0, currentTotal - visibleDurationMs);
                const scrollStepMs = (visibleDurationMs * 0.08) * (delta > 0 ? 1 : -1);

                setViewportStartMs(prev => Math.max(0, Math.min(maxStart, prev + scrollStepMs)));
            } else {
                if (e.deltaY === 0) return;

                const isZoomIn = e.deltaY < 0;
                const zoomFactor = isZoomIn ? 1.25 : 0.8;
                const maxDynZoom = Math.max(32, currentTotal / 2000);

                const rect = attachedEl ? attachedEl.getBoundingClientRect() : { left: 0, width: window.innerWidth };
                const mouseX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
                const mouseRatio = rect.width > 0 ? (mouseX / rect.width) : 0.5;

                setZoomLevel(prevZoom => {
                    const nextZoom = Math.max(1, Math.min(maxDynZoom, Math.round(prevZoom * zoomFactor * 100) / 100));
                    if (nextZoom === prevZoom) return prevZoom;

                    const oldVisibleMs = currentTotal / prevZoom;
                    const newVisibleMs = currentTotal / nextZoom;
                    const mouseEpochOffset = currentStart + (mouseRatio * oldVisibleMs);

                    const nextStart = mouseEpochOffset - (mouseRatio * newVisibleMs);
                    const maxStart = Math.max(0, currentTotal - newVisibleMs);

                    setViewportStartMs(Math.max(0, Math.min(maxStart, nextStart)));
                    return nextZoom;
                });
            }
        };

        const tryAttach = () => {
            const el = containerRef?.current || (typeof document !== 'undefined' ? (document.querySelector('.studio-bottom-timeline') || document.querySelector('.timeline-board-root')) : null);
            if (el && !attachedEl) {
                attachedEl = el;
                attachedEl.addEventListener('wheel', handleWheel, { passive: false, capture: true });
                return true;
            }
            return Boolean(attachedEl);
        };

        if (!tryAttach()) {
            const checkTimer = setInterval(() => {
                if (tryAttach()) clearInterval(checkTimer);
            }, 100);
            return () => {
                clearInterval(checkTimer);
                if (attachedEl) attachedEl.removeEventListener('wheel', handleWheel, { capture: true });
            };
        }

        return () => {
            if (attachedEl) attachedEl.removeEventListener('wheel', handleWheel, { capture: true });
        };
    }, [containerRef]);

    return {
        zoomLevel,
        setZoomLevel,
        viewportStartMs,
        setViewportStartMs,
        viewportDurationMs,
        animateViewportTo,
        fitRange,
        resetZoom,
        jumpViewportTo
    };
}
