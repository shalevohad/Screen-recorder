// ==========================================
// File: Features/ExtractorAdvanced/Client/src/hooks/useStudioHotkeys.js
// Enterprise NLE Shuttle, Marking, Layout & Keyframe Hotkeys
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
    onSplitDirectorAtPlayhead,
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

            // Help Modal Shortcut
            if (e.key === '?' || (e.shiftKey && e.code === 'Slash')) {
                e.preventDefault();
                onToggleHelpModal?.();
                return;
            }

            if (isModalActive || spotlightStationId) return;

            // NLE Mark In & Mark Out
            if (e.code === 'KeyI' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault();
                setInPointMs?.(Math.max(0, Math.min(playheadMs, outPointMs - 1000)));
                return;
            }

            if (e.code === 'KeyO' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault();
                setOutPointMs?.(Math.min(totalTimelineDurationMs, Math.max(playheadMs, inPointMs + 1000)));
                return;
            }

            // Clear In/Out Range
            if (e.code === 'KeyX' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault();
                setInPointMs?.(0);
                setOutPointMs?.(totalTimelineDurationMs);
                return;
            }

            // NLE Shuttle Controls: J / K / L
            if (e.code === 'KeyL' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault();
                setPlaybackSpeed?.(prev => {
                    if (prev <= 0) return 1;
                    if (prev === 1) return 2;
                    if (prev === 2) return 4;
                    if (prev >= 4) return 8;
                    return 1;
                });
                window.dispatchEvent(new CustomEvent('itb:studio-shuttle-forward'));
                return;
            }

            if (e.code === 'KeyK' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault();
                setPlaybackSpeed?.(1);
                window.dispatchEvent(new CustomEvent('itb:studio-shuttle-pause'));
                return;
            }

            if (e.code === 'KeyJ' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('itb:studio-shuttle-reverse'));
                return;
            }

            // Toggle Audio Mute
            if (e.code === 'KeyM' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('itb:studio-toggle-mute'));
                return;
            }

            // Layout Presets: 1, 2, 4
            if (e.code === 'Digit1' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('itb:studio-layout-preset', { detail: { count: 1 } }));
                return;
            }
            if (e.code === 'Digit2' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('itb:studio-layout-preset', { detail: { count: 2 } }));
                return;
            }
            if (e.code === 'Digit4' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('itb:studio-layout-preset', { detail: { count: 4 } }));
                return;
            }

            // Auto-Grid, Reset Canvas, Fullscreen
            if (e.code === 'KeyG' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('itb:studio-auto-grid'));
                return;
            }
            if (e.code === 'KeyR' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('itb:studio-reset-canvas'));
                return;
            }
            if (e.code === 'KeyF' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('itb:studio-toggle-fullscreen'));
                return;
            }

            // Add Keyframe (+ or Insert)
            if ((e.code === 'Equal' || e.code === 'NumpadAdd' || e.code === 'Insert') && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('itb:studio-add-keyframe'));
                return;
            }

            // Delete Selected Item
            if (e.code === 'Delete' || e.code === 'Backspace') {
                window.dispatchEvent(new CustomEvent('itb:studio-delete-selected'));
            }

            // Zoom Timeline Hotkeys
            if (e.code === 'BracketLeft') {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('itb:studio-zoom-step', { detail: { direction: 'in' } }));
                return;
            }
            if (e.code === 'BracketRight') {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('itb:studio-zoom-step', { detail: { direction: 'out' } }));
                return;
            }
            if (e.code === 'Backslash') {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('itb:studio-zoom-fit-cut'));
                return;
            }

            // Cut / Save Session
            if (e.code === 'KeyS') {
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent('itb:studio-save-now'));
                    return;
                } else if (!e.altKey) {
                    e.preventDefault();
                    onSplitDirectorAtPlayhead?.();
                    return;
                }
            }

            // Undo / Redo
            if (e.code === 'KeyZ' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                if (e.shiftKey) {
                    window.dispatchEvent(new CustomEvent('itb:studio-redo'));
                } else {
                    window.dispatchEvent(new CustomEvent('itb:studio-undo'));
                }
                return;
            }

            if (e.code === 'KeyY' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('itb:studio-redo'));
                return;
            }

            // Spacebar Play / Pause
            if (e.code === 'Space') {
                e.preventDefault();
                if (!activeStationId && !spotlightStationId && selectedStationIdsCount > 1) return;
                togglePlaySmart();
                return;
            }

            // Home / End
            if (e.key === 'Home') {
                e.preventDefault();
                setPlayheadMs?.(inPointMs);
                return;
            }
            if (e.key === 'End') {
                e.preventDefault();
                setPlayheadMs?.(outPointMs);
                return;
            }

            // Frame Stepping
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

                setPlayheadMs?.(prev => {
                    const next = isLeft ? prev - stepMs : prev + stepMs;
                    return Math.max(0, Math.min(totalTimelineDurationMs, next));
                });
                return;
            }

            // Station Switching (Up / Down)
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
        onSplitDirectorAtPlayhead,
        isModalActive
    ]);
}
