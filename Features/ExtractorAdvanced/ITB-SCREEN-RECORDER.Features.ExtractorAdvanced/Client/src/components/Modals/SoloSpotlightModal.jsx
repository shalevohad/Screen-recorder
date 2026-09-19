// Client/src/components/Modals/SoloSpotlightModal.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { formatTimelineClock } from '../../utils/timeFormat.js';
import TimelineRuler from '../Timeline/TimelineRuler.jsx';
import Playhead from '../Timeline/Playhead.jsx';
import TimelineTrack from '../Timeline/TimelineTrack.jsx';
import './SoloSpotlightModal.scss';

// פונקציית עזר לפורמט זמן חיתוך מקצועי: שעות:דקות:שניות.פריימים
const formatCutDurationSMPTE = (durationMs, fps = 30) => {
    const totalMs = Math.max(0, durationMs);
    const totalSeconds = Math.floor(totalMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const frames = Math.floor(((totalMs % 1000) / 1000) * fps);

    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(frames)}`;
};

export default function SoloSpotlightModal({
    isOpen,
    station,
    allStations = [],
    onSelectStation,
    onClose,
    baseEpochMs = 0,
    timeMode = 'LOCAL',
    totalDurationMs = 3600000,
    playheadMs = 0,
    setPlayheadMs,
    inPointMs = 0,
    setInPointMs,
    outPointMs = 3600000,
    setOutPointMs
}) {
    const [hoverMs, setHoverMs] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [draggingTarget, setDraggingTarget] = useState(null);
    const timelineRef = useRef(null);

    // ניווט במקלדת
    useEffect(() => {
        if (!isOpen || !station || allStations.length === 0) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }

            if (e.code === 'Space') {
                e.preventDefault();
                setIsPlaying(prev => !prev);
                return;
            }

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const curIdx = allStations.findIndex(s => s.id === station.id);
                if (curIdx !== -1) {
                    const nextIdx = (curIdx + 1) % allStations.length;
                    onSelectStation(allStations[nextIdx].id);
                }
                return;
            }

            if (e.key === 'ArrowUp') {
                e.preventDefault();
                const curIdx = allStations.findIndex(s => s.id === station.id);
                if (curIdx !== -1) {
                    const prevIdx = (curIdx - 1 + allStations.length) % allStations.length;
                    onSelectStation(allStations[prevIdx].id);
                }
                return;
            }

            if (e.key === '[') {
                e.preventDefault();
                setInPointMs(Math.max(0, Math.min(playheadMs, outPointMs - 1000)));
                return;
            }

            if (e.key === ']') {
                e.preventDefault();
                setOutPointMs(Math.min(totalDurationMs, Math.max(playheadMs, inPointMs + 1000)));
                return;
            }

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                setPlayheadMs(prev => Math.max(0, prev - (e.shiftKey ? 1000 : 100)));
                return;
            }

            if (e.key === 'ArrowRight') {
                e.preventDefault();
                setPlayheadMs(prev => Math.min(totalDurationMs, prev + (e.shiftKey ? 1000 : 100)));
                return;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [
        isOpen,
        station,
        allStations,
        onSelectStation,
        onClose,
        playheadMs,
        inPointMs,
        outPointMs,
        totalDurationMs,
        setInPointMs,
        setOutPointMs,
        setPlayheadMs
    ]);

    // מנגנון ניגון
    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(() => {
            setPlayheadMs(prev => {
                const next = prev + (50 * playbackSpeed);
                if (next >= outPointMs) {
                    setIsPlaying(false);
                    return outPointMs;
                }
                return next;
            });
        }, 50);
        return () => clearInterval(interval);
    }, [isPlaying, playbackSpeed, outPointMs, setPlayheadMs]);

    // דגימה דינמית של משתנה ה-CSS (SSOT)
    const getSidebarWidth = useCallback(() => {
        if (!timelineRef.current) return 180;
        const cssVar = getComputedStyle(timelineRef.current).getPropertyValue('--track-sidebar-width');
        if (cssVar) {
            const parsed = parseFloat(cssVar.trim());
            if (!isNaN(parsed) && parsed > 0) return parsed;
        }
        return 180;
    }, []);

    const getMsFromClientX = useCallback((clientX) => {
        if (!timelineRef.current) return 0;
        const rect = timelineRef.current.getBoundingClientRect();
        const sidebarW = getSidebarWidth();
        const contentLeft = rect.left + sidebarW;
        const contentWidth = rect.width - sidebarW;
        if (contentWidth <= 0) return 0;

        const offsetX = Math.max(0, Math.min(clientX - contentLeft, contentWidth));
        return Math.round((offsetX / contentWidth) * totalDurationMs);
    }, [totalDurationMs, getSidebarWidth]);

    // גרירה גלובלית
    useEffect(() => {
        if (!draggingTarget) return;

        const handleWindowMouseMove = (e) => {
            const ms = getMsFromClientX(e.clientX);
            if (draggingTarget === 'playhead') {
                setPlayheadMs(Math.max(0, Math.min(totalDurationMs, ms)));
            } else if (draggingTarget === 'in') {
                setInPointMs(Math.max(0, Math.min(ms, outPointMs - 1000)));
            } else if (draggingTarget === 'out') {
                setOutPointMs(Math.min(totalDurationMs, Math.max(ms, inPointMs + 1000)));
            }
        };

        const handleWindowMouseUp = () => {
            setDraggingTarget(null);
        };

        window.addEventListener('mousemove', handleWindowMouseMove);
        window.addEventListener('mouseup', handleWindowMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleWindowMouseMove);
            window.removeEventListener('mouseup', handleWindowMouseUp);
        };
    }, [draggingTarget, getMsFromClientX, outPointMs, inPointMs, totalDurationMs, setPlayheadMs, setInPointMs, setOutPointMs]);

    const handleTimelineMouseMove = (e) => {
        if (draggingTarget || !timelineRef.current) return;
        const rect = timelineRef.current.getBoundingClientRect();
        const sidebarW = getSidebarWidth();

        if (e.clientX >= rect.left + sidebarW && e.clientX <= rect.right) {
            setHoverMs(getMsFromClientX(e.clientX));
        } else {
            setHoverMs(null);
        }
    };

    const currentIdx = allStations.findIndex(s => s.id === station?.id);
    const prevStation = allStations[currentIdx - 1];
    const nextStation = allStations[currentIdx + 1];

    if (!isOpen || !station) return null;

    return createPortal(
        <div className="solo-spotlight-modal-overlay" dir="ltr">
            {/* 1. רקע הווידאו במסך מלא */}
            <div className="spotlight-viewport-canvas">
                <div className="canvas-video-feed">
                    <div className="tactical-grid-overlay" />
                    <div className="center-target-reticle" />
                    <div className="feed-brand-watermark">
                        <span>ARCHIVE RECORDING // {station.hostname || station.name}</span>
                    </div>
                </div>

                <div className="canvas-scrim-top" />
                <div className="canvas-scrim-bottom" />
            </div>

            {/* 2. Top Floating Header HUD */}
            <div className="spotlight-top-hud">
                <button className="btn-exit-spotlight" onClick={onClose} title="Exit Fullscreen (Esc)">
                    <kbd>ESC</kbd>
                    <span>EXIT FULLSCREEN</span>
                </button>

                <div className="station-switcher-pill" dir="ltr">
                    <button
                        disabled={!prevStation}
                        onClick={() => prevStation && onSelectStation(prevStation.id)}
                        title={prevStation ? `Previous: ${prevStation.hostname || prevStation.name} (↑)` : 'First station'}
                    >
                        ◀
                    </button>
                    <span className="counter-text" dir="ltr">
                        {currentIdx + 1} / {allStations.length}
                    </span>
                    <button
                        disabled={!nextStation}
                        onClick={() => nextStation && onSelectStation(nextStation.id)}
                        title={nextStation ? `Next: ${nextStation.hostname || nextStation.name} (↓)` : 'Last station'}
                    >
                        ▶
                    </button>
                </div>

                <div className="station-brand-pill">
                    <span className="feed-res">SURVEILLANCE ARCHIVE</span>
                    <span className="divider" />
                    <span className="station-title">{station.hostname || station.name}</span>
                </div>
            </div>

            {/* 3. Bottom Floating Control Island */}
            <div className="spotlight-bottom-island">
                <div className="island-transport-row">
                    {/* זמן חיתוך בפורמט שעות:דקות:שניות.פריימים */}
                    <div className="cut-duration-pill">
                        <span className="label">CUT DURATION</span>
                        <span className="val">{formatCutDurationSMPTE(outPointMs - inPointMs)}</span>
                    </div>

                    <div className="transport-controls">
                        <button
                            className="btn-speed"
                            onClick={() => setPlaybackSpeed(s => s === 1 ? 2 : (s === 2 ? 4 : (s === 4 ? 0.5 : 1)))}
                        >
                            {playbackSpeed}x
                        </button>
                        <button className="btn-step" onClick={() => setPlayheadMs(p => Math.max(0, p - 100))} title="Step Back (←)">
                            ⏮
                        </button>
                        <button className={`btn-play-hero ${isPlaying ? 'active' : ''}`} onClick={() => setIsPlaying(!isPlaying)} title="Play / Pause (Space)">
                            {isPlaying ? '⏸' : '▶'}
                        </button>
                        <button className="btn-step" onClick={() => setPlayheadMs(p => Math.min(totalDurationMs, p + 100))} title="Step Forward (→)">
                            ⏭
                        </button>
                    </div>

                    <div className="clock-timecode">
                        <span className="label">PLAYHEAD</span>
                        <span className="digits">{formatTimelineClock(baseEpochMs + playheadMs, timeMode)}</span>
                    </div>
                </div>

                <div
                    className="island-timeline-row"
                    ref={timelineRef}
                    onMouseMove={handleTimelineMouseMove}
                    onMouseLeave={() => setHoverMs(null)}
                >
                    <div className="floating-ruler-wrap">
                        <TimelineRuler
                            baseEpochMs={baseEpochMs}
                            timeMode={timeMode}
                            viewportStartMs={0}
                            viewportDurationMs={totalDurationMs}
                            totalDurationMs={totalDurationMs}
                            hoverMs={hoverMs}
                            onHoverChange={setHoverMs}
                            onSeek={setPlayheadMs}
                            inPointMs={inPointMs}
                            outPointMs={outPointMs}
                        />
                    </div>

                    <div className="floating-track-wrap">
                        <TimelineTrack
                            station={station}
                            isActive={true}
                            viewportStartMs={0}
                            viewportDurationMs={totalDurationMs}
                            inPointMs={inPointMs}
                            outPointMs={outPointMs}
                            baseEpochMs={baseEpochMs}
                        />

                        <Playhead
                            baseEpochMs={baseEpochMs}
                            timeMode={timeMode}
                            viewportStartMs={0}
                            viewportDurationMs={totalDurationMs}
                            playheadMs={playheadMs}
                            inPointMs={inPointMs}
                            outPointMs={outPointMs}
                            onStartDrag={(target) => setDraggingTarget(target)}
                        />
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}