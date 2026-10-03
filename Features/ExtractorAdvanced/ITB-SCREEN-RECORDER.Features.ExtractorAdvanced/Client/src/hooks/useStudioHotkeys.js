// ==========================================
// File: Features/ExtractorAdvanced/Client/src/hooks/useStudioHotkeys.js
// ==========================================
import { useEffect } from 'react';

export function useStudioHotkeys({
    activeStationId,
    spotlightStationId,
    timelineStations = [],
    selectedStationIdsCount = 0,
    onSelectActiveStation,
    setPlaybackSpeed,
    playheadMs,
    setPlayheadMs,
    inPointMs,
    setInPointMs,
    outPointMs,
    setOutPointMs,
    totalTimelineDurationMs,
    zoomLevel = 1,
    togglePlaySmart,
    onToggleHelpModal,
    isModalActive = false
}) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            const target = e.target;
            const isTyping =
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.tagName === 'SELECT' ||
                target.isContentEditable ||
                target.closest('.modal, .studio-reset-modal-backdrop, [role="dialog"]');

            if (isTyping) return;

            if (e.key === '?' || (e.shiftKey && e.code === 'Slash')) {
                e.preventDefault();
                onToggleHelpModal?.();
                return;
            }

            if (isModalActive || spotlightStationId) return;

            if (e.code === 'KeyI') {
                e.preventDefault();
                setInPointMs(Math.max(0, Math.min(playheadMs, outPointMs - 1000)));
                return;
            }

            if (e.code === 'KeyO') {
                e.preventDefault();
                setOutPointMs(Math.min(totalTimelineDurationMs, Math.max(playheadMs, inPointMs + 1000)));
                return;
            }

            if (e.code === 'Space') {
                e.preventDefault();
                if (!activeStationId && !spotlightStationId && selectedStationIdsCount > 1) return;
                togglePlaySmart();
                return;
            }

            if (e.key === 'Home') {
                e.preventDefault();
                setPlayheadMs(inPointMs);
                return;
            }
            if (e.key === 'End') {
                e.preventDefault();
                setPlayheadMs(outPointMs);
                return;
            }

            if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
                e.preventDefault();
                const isLeft = e.code === 'ArrowLeft';

                let stepMs;
                if (e.ctrlKey || e.metaKey) {
                    stepMs = 33;
                } else if (e.shiftKey) {
                    stepMs = 5000;
                } else {
                    const currentZoom = Math.max(1, zoomLevel);
                    stepMs = Math.max(33, Math.round(1000 / currentZoom));
                }

                setPlayheadMs(prev => {
                    const next = isLeft ? prev - stepMs : prev + stepMs;
                    return Math.max(0, Math.min(totalTimelineDurationMs, next));
                });
                return;
            }

            if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
                if (!activeStationId || timelineStations.length <= 1) return;
                e.preventDefault();
                const currentIdx = timelineStations.findIndex(s => s.id === activeStationId);
                if (currentIdx === -1) {
                    onSelectActiveStation(timelineStations[0].id);
                    setPlaybackSpeed(1);
                    return;
                }

                if (e.code === 'ArrowDown') {
                    const nextIdx = (currentIdx + 1) % timelineStations.length;
                    onSelectActiveStation(timelineStations[nextIdx].id);
                    setPlaybackSpeed(1);
                } else {
                    const prevIdx = (currentIdx - 1 + timelineStations.length) % timelineStations.length;
                    onSelectActiveStation(timelineStations[prevIdx].id);
                    setPlaybackSpeed(1);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown, { capture: true });
        return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
    }, [
        activeStationId,
        spotlightStationId,
        timelineStations,
        selectedStationIdsCount,
        onSelectActiveStation,
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
        onToggleHelpModal,
        isModalActive
    ]);
}