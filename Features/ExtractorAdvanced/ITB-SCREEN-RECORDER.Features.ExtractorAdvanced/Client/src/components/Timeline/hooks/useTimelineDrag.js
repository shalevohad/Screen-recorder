// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/hooks/useTimelineDrag.js
// ==========================================
import { useState, useEffect } from 'react';

export function useTimelineDrag({
    viewportDurationMs,
    totalDurationMs,
    playheadMs,
    setPlayheadMs,
    inPointMs,
    setInPointMs,
    outPointMs,
    setOutPointMs,
    viewportStartMs,
    setViewportStartMs,
    getMsFromClientX,
    minimapRef
}) {
    const [draggingTarget, setDraggingTarget] = useState(null);
    const [dragStartInfo, setDragStartInfo] = useState(null);

    const handleStartDrag = (target, e) => {
        setDraggingTarget(target);
        setDragStartInfo({
            target,
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
            if (draggingTarget === 'minimap-viewport' && minimapRef?.current) {
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
                if (Math.abs(target - inPointMs) <= snapThreshold) target = inPointMs;
                else if (Math.abs(target - outPointMs) <= snapThreshold) target = outPointMs;
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
    }, [
        draggingTarget,
        dragStartInfo,
        getMsFromClientX,
        inPointMs,
        outPointMs,
        playheadMs,
        totalDurationMs,
        viewportDurationMs,
        setPlayheadMs,
        setInPointMs,
        setOutPointMs,
        setViewportStartMs,
        minimapRef
    ]);

    return { draggingTarget, handleStartDrag };
}