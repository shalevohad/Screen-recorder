// Client/src/components/Viewport/MulticamViewport.jsx
import React, { useRef, useState, useEffect } from 'react';
import { formatTimelineClock } from '../../utils/timeFormat.js';
import './MulticamViewport.scss';

export default function MulticamViewport({
    activeStation,
    timelineStations = [],
    onSelectActiveStation,
    baseEpochMs,
    playheadMs,
    timeMode
}) {
    const containerRef = useRef(null);
    const [gridStyle, setGridStyle] = useState({ gridTemplateColumns: '1fr', gridTemplateRows: '1fr' });

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
        const isAlert = (station.hostname || station.name || '').includes('Alert');
        const statusClass = isOffline ? 'offline' : (isAlert ? 'alert' : 'live');

        return (
            <div key={station.id || 'solo'} className={`camera-card-cell ${isSolo ? 'solo-mode' : ''}`}>
                <div
                    onClick={() => !isSolo && onSelectActiveStation(station.id)}
                    className={`camera-card ${statusClass}`}
                >
                    <div className="card-topbar">
                        <div className="station-meta">
                            <span className={`status-pulse ${statusClass}`} />
                            <span className="station-name">{station.hostname || station.name}</span>
                        </div>
                        {/* כפתור Solo Focus מינימליסטי המבוסס על אייקון עם Tooltip */}
                        <button
                            className="btn-solo-focus-icon"
                            title={isSolo ? "Exit Solo Focus (Back to Grid)" : "Solo Focus (Expand Camera)"}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                {isSolo ? (
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                ) : (
                                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                )}
                            </svg>
                        </button>
                    </div>

                    <div className={`card-feed-body ${isOffline ? 'blurred-offline' : ''}`}>
                        {isOffline ? (
                            <div className="offline-state-overlay">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                <span>SIGNAL LOST</span>
                            </div>
                        ) : (
                            <div className="tactical-crosshair-center" />
                        )}
                    </div>

                    {!isOffline && (
                        <div className="card-bottom-overlay">
                            <div className="overlay-pill timestamp">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                {formatTimelineClock(baseEpochMs + playheadMs, timeMode)}
                            </div>
                            <div className="overlay-pill metrics">
                                <span>30fps</span>
                                <span className="divider" />
                                <span>4.2 Mbps</span>
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