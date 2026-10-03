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
        const el = containerRef?.current;
        if (!el) return;

        const handleWheel = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const isHorizontalScroll = e.ctrlKey || e.shiftKey;

            if (isHorizontalScroll) {
                const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
                if (delta === 0) return;

                const visibleDurationMs = totalTimelineDurationMs / zoomLevel;
                const maxStart = Math.max(0, totalTimelineDurationMs - visibleDurationMs);
                const scrollStepMs = (visibleDurationMs * 0.08) * (delta > 0 ? 1 : -1);

                setViewportStartMs(prev => Math.max(0, Math.min(maxStart, prev + scrollStepMs)));
            } else {
                if (e.deltaY === 0) return;

                const isZoomIn = e.deltaY < 0;
                const zoomFactor = isZoomIn ? 1.25 : 0.8;

                const rect = el.getBoundingClientRect();
                const mouseX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
                const mouseRatio = rect.width > 0 ? (mouseX / rect.width) : 0.5;

                setZoomLevel(prevZoom => {
                    const nextZoom = Math.max(1, Math.min(maxDynamicZoom, Math.round(prevZoom * zoomFactor * 100) / 100));
                    if (nextZoom === prevZoom) return prevZoom;

                    const oldVisibleMs = totalTimelineDurationMs / prevZoom;
                    const newVisibleMs = totalTimelineDurationMs / nextZoom;
                    const mouseEpochOffset = viewportStartMs + (mouseRatio * oldVisibleMs);

                    const nextStart = mouseEpochOffset - (mouseRatio * newVisibleMs);
                    const maxStart = Math.max(0, totalTimelineDurationMs - newVisibleMs);

                    setViewportStartMs(Math.max(0, Math.min(maxStart, nextStart)));
                    return nextZoom;
                });
            }
        };

        el.addEventListener('wheel', handleWheel, { passive: false, capture: true });
        return () => el.removeEventListener('wheel', handleWheel, { capture: true });
    }, [containerRef, totalTimelineDurationMs, zoomLevel, viewportStartMs, maxDynamicZoom]);

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