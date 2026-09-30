// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/TimelineBoard.jsx
// ==========================================
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import TimelineRuler from './TimelineRuler.jsx';
import TimelineTrack from './TimelineTrack.jsx';
import Playhead from './Playhead.jsx';
import SessionClockBadge from './SessionClockBadge.jsx';
import TimelineMinimap from './TimelineMinimap.jsx';
import TimelineContextMenu from './TimelineContextMenu.jsx';
import { formatTimelineClock } from '../../utils/timeFormat.js';
import './TimelineBoard.scss';

const TRACKS_PER_BANK = 8;

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

const formatEstimateSize = (bytes) => {
    if (!bytes || bytes <= 0) return '0 MB';
    const mb = bytes / (1024 * 1024);
    if (mb >= 1000) return `${(mb / 1024).toFixed(1)} GB`;
    return `${Math.round(mb)} MB`;
};

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
    viewportStartMs: propViewportStartMs,
    onViewportStartChange,
    onEstimateLoaded
}) {
    const [hoverMs, setHoverMs] = useState(null);
    const [trackBankIndex, setTrackBankIndex] = useState(0);

    const [internalViewportStartMs, setInternalViewportStartMs] = useState(propViewportStartMs || 0);
    const viewportStartMs = propViewportStartMs !== undefined ? propViewportStartMs : internalViewportStartMs;

    const setViewportStartMs = useCallback((val) => {
        const nextVal = typeof val === 'function' ? val(viewportStartMs) : val;
        if (propViewportStartMs === undefined) {
            setInternalViewportStartMs(nextVal);
        }
        if (onViewportStartChange) {
            onViewportStartChange(nextVal);
        }
    }, [propViewportStartMs, onViewportStartChange, viewportStartMs]);

    const [draggingTarget, setDraggingTarget] = useState(null);
    const [dragStartInfo, setDragStartInfo] = useState(null);
    const [contextMenu, setContextMenu] = useState(null);

    const [activeFps, setActiveFps] = useState(30);
    const [estimateData, setEstimateData] = useState(null);
    const [isEstimating, setIsEstimating] = useState(false);

    const trackAreaRef = useRef(null);
    const minimapRef = useRef(null);
    const hasInitializedPlayheadRef = useRef(false);

    const animFrameRef = useRef(null);
    const viewportStartRef = useRef(viewportStartMs);
    const onEstimateLoadedRef = useRef(onEstimateLoaded);

    const isInitialMountRef = useRef(true);
    const prevInRef = useRef(inPointMs);
    const prevOutRef = useRef(outPointMs);

    useEffect(() => {
        onEstimateLoadedRef.current = onEstimateLoaded;
    });

    const maxDynamicZoom = Math.max(32, totalDurationMs / 2000);
    const viewportDurationMs = totalDurationMs / zoomLevel;

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
            if (neededBank !== trackBankIndex) {
                setTrackBankIndex(neededBank);
            }
        }
    }, [activeStationId, stations, trackBankIndex]);

    const { earliestMediaMs, latestMediaMs } = useMemo(() => {
        if (!stations.length || !baseEpochMs) return { earliestMediaMs: null, latestMediaMs: null };
        let minEpoch = Infinity;
        let maxEpoch = -Infinity;

        stations.forEach(st => {
            const segs = recordingSegments[st.id] || recordingSegments[st.hostname] || st.segments || [];
            segs.forEach(seg => {
                const s = seg.startEpochMs ?? seg.startEpoch ?? 0;
                const e = seg.endEpochMs ?? seg.endEpoch ?? 0;
                if (s > 0 && s < minEpoch) minEpoch = s;
                if (e > 0 && e > maxEpoch) maxEpoch = e;
            });
        });

        if (minEpoch === Infinity) return { earliestMediaMs: null, latestMediaMs: null };
        const startRel = Math.max(0, Math.min(totalDurationMs, minEpoch - baseEpochMs));
        const endRel = Math.max(0, Math.min(totalDurationMs, maxEpoch - baseEpochMs));
        return { earliestMediaMs: startRel, latestMediaMs: endRel };
    }, [stations, recordingSegments, baseEpochMs, totalDurationMs]);

    const hasActiveCut = useMemo(() => {
        const isRangeNonDefault = (inPointMs > 500) || (outPointMs < totalDurationMs - 500);
        return isRangeNonDefault && (outPointMs - inPointMs >= 1000);
    }, [inPointMs, outPointMs, totalDurationMs]);

    useEffect(() => {
        if (!activeStationId || !baseEpochMs) return;

        const targetEpoch = baseEpochMs + Math.round(inPointMs || 0);
        fetch(`/api/v1/extractor-advanced/stream-metadata?hostname=${encodeURIComponent(activeStationId)}&epochMs=${targetEpoch}`)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data && data.fps > 0) {
                    setActiveFps(data.fps);
                }
            })
            .catch(() => { });
    }, [activeStationId, baseEpochMs, inPointMs]);

    const stationIdsKey = useMemo(() => stations.map(s => s.id).sort().join(','), [stations]);

    useEffect(() => {
        if (!stationIdsKey || outPointMs <= inPointMs || !baseEpochMs) {
            setEstimateData(null);
            return;
        }

        const controller = new AbortController();
        setIsEstimating(true);

        const timer = setTimeout(async () => {
            try {
                const payload = {
                    stationIds: stationIdsKey.split(','),
                    inEpochMs: baseEpochMs + Math.round(inPointMs),
                    outEpochMs: baseEpochMs + Math.round(outPointMs)
                };

                const res = await fetch('/api/v1/extractor-advanced/estimate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                    signal: controller.signal
                });

                if (res.ok) {
                    const data = await res.json();
                    setEstimateData(data);
                    if (onEstimateLoadedRef.current) {
                        onEstimateLoadedRef.current(data);
                    }
                }
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.warn('[TimelineBoard] Estimate failed:', err);
                }
            } finally {
                setIsEstimating(false);
            }
        }, 350);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [stationIdsKey, inPointMs, outPointMs, baseEpochMs]);

    useEffect(() => {
        viewportStartRef.current = viewportStartMs;
    }, [viewportStartMs]);

    useEffect(() => {
        return () => {
            if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!hasInitializedPlayheadRef.current && setPlayheadMs) {
            if (playheadMs === 0 || playheadMs === null || playheadMs === undefined) {
                setPlayheadMs(inPointMs);
                hasInitializedPlayheadRef.current = true;
            }
        }
    }, [inPointMs, playheadMs, setPlayheadMs]);

    useEffect(() => {
        if (totalDurationMs > 0 && viewportDurationMs > 0 && viewportDurationMs < totalDurationMs) {
            const maxStart = totalDurationMs - viewportDurationMs;
            if (viewportStartRef.current > maxStart) {
                setViewportStartMs(Math.max(0, maxStart));
            }
        }
    }, [zoomLevel, totalDurationMs, viewportDurationMs, setViewportStartMs]);

    const animateViewportTo = useCallback((targetStart, durationMs = 280) => {
        if (animFrameRef.current) {
            cancelAnimationFrame(animFrameRef.current);
        }

        const startPos = viewportStartRef.current;
        const delta = targetStart - startPos;
        if (Math.abs(delta) < 1) return;

        const startTime = performance.now();

        const step = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / durationMs);
            const eased = easeOutCubic(progress);

            const nextPos = startPos + delta * eased;
            setViewportStartMs(Math.round(nextPos));

            if (progress < 1) {
                animFrameRef.current = requestAnimationFrame(step);
            } else {
                animFrameRef.current = null;
            }
        };

        animFrameRef.current = requestAnimationFrame(step);
    }, [setViewportStartMs]);

    const handleFitRange = useCallback((startMs, endMs) => {
        const cutDur = Math.max(1000, endMs - startMs);
        const paddingMs = Math.max(500, cutDur * 0.05);

        const targetStart = Math.max(0, startMs - paddingMs);
        const targetEnd = Math.min(totalDurationMs, endMs + paddingMs);
        const effectiveDur = targetEnd - targetStart;

        const targetZoom = Math.max(1, Math.min(maxDynamicZoom, totalDurationMs / effectiveDur));
        const newVpDur = totalDurationMs / targetZoom;
        const newStart = Math.max(0, Math.min(targetStart, totalDurationMs - newVpDur));

        animateViewportTo(newStart);
        if (onZoomChange) onZoomChange(Number(targetZoom.toFixed(1)));
    }, [totalDurationMs, maxDynamicZoom, animateViewportTo, onZoomChange]);

    useEffect(() => {
        if (isInitialMountRef.current) {
            isInitialMountRef.current = false;
            prevInRef.current = inPointMs;
            prevOutRef.current = outPointMs;
            return;
        }

        if (draggingTarget) return;

        const inChanged = Math.abs(prevInRef.current - inPointMs) > 10;
        const outChanged = Math.abs(prevOutRef.current - outPointMs) > 10;

        if (inChanged || outChanged) {
            prevInRef.current = inPointMs;
            prevOutRef.current = outPointMs;

            if (outPointMs - inPointMs >= 1000) {
                handleFitRange(inPointMs, outPointMs);
            }
        }
    }, [inPointMs, outPointMs, draggingTarget, handleFitRange]);

    const handleContextualFit = useCallback(() => {
        if (hasActiveCut) {
            handleFitRange(inPointMs, outPointMs);
        } else if (earliestMediaMs !== null && latestMediaMs !== null && latestMediaMs > earliestMediaMs) {
            handleFitRange(earliestMediaMs, latestMediaMs);
        } else {
            animateViewportTo(0);
            if (onZoomReset) onZoomReset();
        }
    }, [hasActiveCut, inPointMs, outPointMs, earliestMediaMs, latestMediaMs, handleFitRange, animateViewportTo, onZoomReset]);

    const handleResetZoom = useCallback(() => {
        animateViewportTo(0);
        if (onZoomReset) onZoomReset();
    }, [animateViewportTo, onZoomReset]);

    const handleJumpToFirstMedia = useCallback(() => {
        if (earliestMediaMs === null) return;
        setPlayheadMs(earliestMediaMs);
        const targetStart = Math.max(0, Math.min(earliestMediaMs - viewportDurationMs / 4, totalDurationMs - viewportDurationMs));
        animateViewportTo(targetStart);
    }, [earliestMediaMs, setPlayheadMs, viewportDurationMs, totalDurationMs, animateViewportTo]);

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

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

            const realFrameMs = 1000 / (activeFps || 30);
            const isHighZoom = viewportDurationMs <= 30000;
            const baseStep = isHighZoom ? realFrameMs : 1000;
            const step = baseStep * (e.shiftKey ? 5 : 1);

            const keyUpper = e.key ? e.key.toUpperCase() : '';

            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextPlayhead = Math.min(totalDurationMs, playheadMs + step);
                setPlayheadMs(nextPlayhead);

                const currentVpStart = viewportStartRef.current;
                const currentVpEnd = currentVpStart + viewportDurationMs;

                if (nextPlayhead >= currentVpEnd) {
                    let targetVpStart = nextPlayhead - (viewportDurationMs / 2);
                    targetVpStart = Math.max(0, Math.min(targetVpStart, totalDurationMs - viewportDurationMs));
                    animateViewportTo(targetVpStart);
                }
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const nextPlayhead = Math.max(0, playheadMs - step);
                setPlayheadMs(nextPlayhead);

                const currentVpStart = viewportStartRef.current;

                if (nextPlayhead < currentVpStart) {
                    let targetVpStart = nextPlayhead - viewportDurationMs;
                    targetVpStart = Math.max(0, Math.min(targetVpStart, totalDurationMs - viewportDurationMs));
                    animateViewportTo(targetVpStart);
                }
            } else if (e.code === 'BracketLeft' || e.key === '[' || keyUpper === 'I') {
                e.preventDefault();
                const newIn = Math.min(playheadMs, outPointMs - 1000);
                const finalIn = Math.max(0, newIn);
                setInPointMs(finalIn);
            } else if (e.code === 'BracketRight' || e.key === ']' || keyUpper === 'O') {
                e.preventDefault();
                const newOut = Math.max(playheadMs, inPointMs + 1000);
                const finalOut = Math.min(totalDurationMs, newOut);
                setOutPointMs(finalOut);
            } else if (e.key === 'Home') {
                e.preventDefault();
                setPlayheadMs(inPointMs);
            } else if (e.key === 'End') {
                e.preventDefault();
                setPlayheadMs(outPointMs);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [viewportDurationMs, totalDurationMs, playheadMs, inPointMs, outPointMs, setPlayheadMs, setInPointMs, setOutPointMs, animateViewportTo, activeFps]);

    // 💡 מנגנון עכבר מקצועי: הפרדה בין Zoom (Ctrl/Alt) ל-Pan אופקי (Wheel/Shift)
    useEffect(() => {
        const el = trackAreaRef.current;
        if (!el) return;

        const handleWheel = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const isZoomGesture = e.ctrlKey || e.altKey || Math.abs(e.deltaY) > 0 && !e.shiftKey && Math.abs(e.deltaX) === 0;

            if (e.ctrlKey || e.altKey) {
                // מצב ZOOM
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
            } else {
                // מצב PAN (גלילה אופקית בציר הזמן)
                const scrollDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
                const panStepMs = (scrollDelta / 100) * (viewportDurationMs * 0.15);
                const newStartMs = Math.max(0, Math.min(totalDurationMs - viewportDurationMs, viewportStartMs + panStepMs));

                setViewportStartMs(Math.round(newStartMs));
            }
        };

        el.addEventListener('wheel', handleWheel, { passive: false });
        return () => el.removeEventListener('wheel', handleWheel);
    }, [zoomLevel, viewportStartMs, viewportDurationMs, totalDurationMs, getMsFromClientX, onZoomChange, maxDynamicZoom, setViewportStartMs]);

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

    const handleStartDrag = (target, e) => {
        setContextMenu(null);
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
    }, [draggingTarget, dragStartInfo, getMsFromClientX, inPointMs, outPointMs, playheadMs, totalDurationMs, viewportDurationMs, setPlayheadMs, setInPointMs, setOutPointMs, setViewportStartMs]);

    const isRangeValid = stations.length > 0 && Math.abs(outPointMs - inPointMs) >= 1000;

    const getExportTooltip = () => {
        if (stations.length === 0) return "Select stations to enable export";
        if (!isRangeValid) return "Select a valid IN/OUT range to export";
        if (!estimateData) return "Export Synchronized Multi-Track Clip (Ctrl+E)";

        const sizeStr = formatEstimateSize(estimateData.estimatedFileSizeBytes);
        const gapsStr = estimateData.removedGlobalGapsCount > 0
            ? ` • ${estimateData.removedGlobalGapsCount} global gap(s) skipped`
            : '';
        return `Export Cut (Ctrl+E) • Est: ~${sizeStr}${gapsStr}`;
    };

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
                        />

                        <div className="timeline-viewport-actions-group">
                            {earliestMediaMs !== null && (
                                <button
                                    type="button"
                                    className="btn-vp-action"
                                    onClick={handleJumpToFirstMedia}
                                    title={`Jump playhead to first media (${formatTimelineClock(baseEpochMs + earliestMediaMs, timeMode)})`}
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <polygon points="19 20 9 12 19 4 19 20" />
                                        <line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2.5" />
                                    </svg>
                                    <span>FIRST MEDIA</span>
                                </button>
                            )}

                            <button
                                type="button"
                                className={`btn-vp-action fit-action ${hasActiveCut ? 'fit-cut' : ''}`}
                                onClick={handleContextualFit}
                                title={hasActiveCut ? "Fit Viewport to Cut Range" : "Fit Viewport to Recorded Media"}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                </svg>
                                <span>{hasActiveCut ? 'FIT CUT' : 'FIT MEDIA'}</span>
                            </button>

                            <button
                                type="button"
                                className="btn-vp-action"
                                onClick={handleResetZoom}
                                title="Reset to Full Time Scope (100% / No Zoom)"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="1 4 1 10 7 10" />
                                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                                </svg>
                                <span>RESET</span>
                            </button>
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
                            earliestMediaMs={earliestMediaMs}
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
                onMouseMove={handleTracksMouseMove}
                onMouseLeave={handleTracksMouseLeave}
            >
                <div className="tracks-scroll-area">
                    {stations.length > 0 ? (
                        currentBankStations.map(station => {
                            const fullStationSegments =
                                recordingSegments[station.id] ||
                                recordingSegments[station.hostname] ||
                                station.segments ||
                                [];

                            return (
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
                                    segments={fullStationSegments}
                                    recordingSegments={recordingSegments}
                                    globalGaps={estimateData?.removedGlobalGaps || []}
                                    disableFilmstrip={stations.length > 1 && station.id !== activeStationId}
                                />
                            );
                        })
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
                    title={getExportTooltip()}
                >
                    <div className="export-icon-top">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    </div>

                    <span className="vertical-label">EXPORT CUT</span>

                    {isRangeValid && (
                        <div className="export-button-estimate-box">
                            {isEstimating ? (
                                <span className="estimate-loading">...</span>
                            ) : estimateData ? (
                                <>
                                    <span className="estimate-size-pill">
                                        ~{formatEstimateSize(estimateData.estimatedFileSizeBytes)}
                                    </span>
                                    {estimateData.removedGlobalGapsCount > 0 && (
                                        <span className="estimate-gaps-pill" title={`${estimateData.removedGlobalGapsCount} global gaps will be skipped`}>
                                            ✂ {estimateData.removedGlobalGapsCount}
                                        </span>
                                    )}
                                </>
                            ) : null}
                        </div>
                    )}
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