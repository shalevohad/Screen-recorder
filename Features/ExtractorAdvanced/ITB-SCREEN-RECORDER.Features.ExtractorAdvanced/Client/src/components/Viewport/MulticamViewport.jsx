// Client/src/components/Viewport/MulticamViewport.jsx
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { formatTimelineClock } from '../../utils/timeFormat.js';
import './MulticamViewport.scss';

function CameraCardFeed({ station, currentEpochMs, isOffline }) {
    const [imgSrc, setImgSrc] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const stationName = station.hostname || station.name || '';

    useEffect(() => {
        if (isOffline || !currentEpochMs || !stationName) {
            setImgSrc(null);
            return;
        }

        setIsLoading(true);
        const timer = setTimeout(() => {
            const url = `/api/v1/extractor-advanced/frame?hostname=${encodeURIComponent(stationName)}&epochMs=${currentEpochMs}`;
            setImgSrc(url);
            setHasError(false);
        }, 180);

        return () => clearTimeout(timer);
    }, [stationName, currentEpochMs, isOffline]);

    if (isOffline) {
        return (
            <div className="offline-state-overlay">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>SIGNAL LOST</span>
            </div>
        );
    }

    return (
        <div className="card-video-frame-container">
            {imgSrc && !hasError && (
                <img
                    src={imgSrc}
                    alt={stationName}
                    className="station-live-frame"
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setHasError(true);
                        setIsLoading(false);
                    }}
                />
            )}

            {(!imgSrc || hasError) && (
                <div className="tactical-spotlight-hero">
                    <div className="spotlight-badge-container">
                        <svg
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="torch-fullscreen-svg"
                            shapeRendering="geometricPrecision"
                        >
                            <path d="M5 12V6a1 1 0 0 1 1-1h6" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
                            <path d="M28 5h6a1 1 0 0 1 1 1v6" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
                            <path d="M5 28v6a1 1 0 0 0 1 1h6" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
                            <path d="M28 35h6a1 1 0 0 0 1-1v-6" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
                            <line x1="20" y1="13" x2="20" y2="7" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                            <polygon points="14,18 26,18 23,22 17,22" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.8" strokeLinejoin="round" />
                            <rect x="17" y="22" width="6" height="10" rx="1.5" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.8" />
                        </svg>
                    </div>
                    <span className="spotlight-title-label">NO SIGNAL / GAP</span>
                </div>
            )}
        </div>
    );
}

export default function MulticamViewport({
    activeStation,
    timelineStations = [],
    onSelectActiveStation,
    onOpenSpotlight,
    baseEpochMs = 0,
    playheadMs = 0,
    timeMode = 'LOCAL'
}) {
    const containerRef = useRef(null);
    const [gridStyle, setGridStyle] = useState({ gridTemplateColumns: '1fr', gridTemplateRows: '1fr' });

    const currentEpochMs = useMemo(() => {
        return baseEpochMs + playheadMs;
    }, [baseEpochMs, playheadMs]);

    useEffect(() => {
        const count = timelineStations.length;
        if (count === 0 || activeStation) return;

        const updateLayout = () => {
            if (!containerRef.current) return;
            const { width, height } = containerRef.current.getBoundingClientRect();

            const availableWidth = width - 24;
            const availableHeight = height - 24;
            if (availableWidth <= 0 || availableHeight <= 0) return;

            const gap = 16;
            let bestArea = 0;
            let bestCols = 1;
            let bestRows = 1;

            for (let cols = 1; cols <= count; cols++) {
                const rows = Math.ceil(count / cols);

                const cellW = (availableWidth - (cols - 1) * gap) / cols;
                const cellH = (availableHeight - (rows - 1) * gap) / rows;

                if (cellW <= 0 || cellH <= 0) continue;

                let camW = cellW;
                let camH = cellW * (9 / 16);

                if (camH > cellH) {
                    camH = cellH;
                    camW = cellH * (16 / 9);
                }

                const area = camW * camH;
                if (area > bestArea) {
                    bestArea = area;
                    bestCols = cols;
                    bestRows = rows;
                }
            }

            setGridStyle({
                gridTemplateColumns: `repeat(${bestCols}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${bestRows}, minmax(0, 1fr))`
            });
        };

        const observer = new ResizeObserver(updateLayout);
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        updateLayout();

        return () => observer.disconnect();
    }, [timelineStations.length, activeStation]);

    if (timelineStations.length === 0 && !activeStation) return null;

    const renderCard = (station, isSolo = false) => {
        const isOffline = (station.hostname || station.name || '').includes('Offline');
        const statusClass = isOffline ? 'offline' : 'live';

        const handleCardClick = () => {
            if (isSolo) {
                if (onOpenSpotlight) onOpenSpotlight(station.id);
            } else {
                if (onSelectActiveStation) onSelectActiveStation(station.id);
            }
        };

        const handleCardContextMenu = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isSolo && onSelectActiveStation) {
                onSelectActiveStation(null);
            }
        };

        return (
            <div key={station.id || 'solo'} className={`camera-card-cell ${isSolo ? 'solo-mode' : ''}`}>
                <div
                    onClick={handleCardClick}
                    onContextMenu={handleCardContextMenu}
                    className={`camera-card ${statusClass} ${isSolo ? 'is-solo-card' : ''}`}
                >
                    <div className="card-topbar">
                        <div className="station-meta">
                            <span className={`status-pulse ${statusClass}`} />
                            <span className="station-name">{station.hostname || station.name}</span>
                        </div>

                        <div className="card-header-actions">
                            {onOpenSpotlight && (
                                <button
                                    type="button"
                                    className="btn-card-action"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onOpenSpotlight(station.id);
                                    }}
                                    title="Cinema Fullscreen Inspection"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                    </svg>
                                </button>
                            )}

                            <button
                                type="button"
                                className={`btn-card-action ${isSolo ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectActiveStation(isSolo ? null : station.id);
                                }}
                                title={isSolo ? "Exit Solo Focus (Back to Grid)" : "Solo Focus"}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    {isSolo ? (
                                        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                    ) : (
                                        <circle cx="12" cy="12" r="3" />
                                    )}
                                    {!isSolo && <path d="M3 12h3m12 0h3M12 3v3m0 12v3" />}
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className={`card-feed-body ${isOffline ? 'blurred-offline' : ''}`}>
                        <CameraCardFeed
                            station={station}
                            currentEpochMs={currentEpochMs}
                            isOffline={isOffline}
                        />

                        {isSolo && (
                            <div className="solo-hover-tooltip">
                                <span className="tooltip-action">
                                    <kbd>L-Click</kbd> Fullscreen
                                </span>
                                <span className="tooltip-dot" />
                                <span className="tooltip-action">
                                    <kbd>R-Click</kbd> Back to Grid
                                </span>
                            </div>
                        )}
                    </div>

                    {!isOffline && (
                        <div className="card-bottom-overlay">
                            <div className="overlay-pill timestamp">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                {formatTimelineClock(currentEpochMs, timeMode)}
                            </div>

                            <div className="overlay-pill archive-tag">
                                <span>LIVE DEBRIEF</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    if (activeStation) {
        return (
            <div className="multicam-viewport-root solo">
                {renderCard(activeStation, true)}
            </div>
        );
    }

    return (
        <div className="multicam-viewport-root multicam">
            <div className="multicam-tactical-grid" ref={containerRef} style={gridStyle}>
                {timelineStations.map(st => renderCard(st, false))}
            </div>
        </div>
    );
}