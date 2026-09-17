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
        if (count === 0) return;

        const updateLayout = () => {
            if (!containerRef.current) return;
            const { width, height } = containerRef.current.getBoundingClientRect();

            const availableWidth = width - 20;
            const availableHeight = height - 20;
            if (availableWidth <= 0 || availableHeight <= 0) return;

            const gap = 10;
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
    }, [timelineStations.length]);

    if (activeStation) {
        return (
            <div className="multicam-viewport-root">
                <div className="single-focus-feed-wrapper" style={{ flex: 1, minHeight: 0, padding: 10, display: 'flex', containerType: 'size', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="camera-card" style={{ width: '100cqw', maxWidth: 'calc(100cqh * (16/9))', maxHeight: '100cqh', aspectRatio: '16/9', display: 'flex', flexDirection: 'column', background: 'radial-gradient(circle at center, #0d1a38 0%, #03060d 100%)', border: '1px solid #00e5ff', borderRadius: 4, overflow: 'hidden' }}>

                        <div className="card-topbar" style={{ height: 24, background: '#0d172e', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px' }}>
                            <div className="station-meta" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                                <span className="status-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e676' }} />
                                <span className="station-name" style={{ fontSize: 11, fontWeight: 700, color: '#e2e8f0' }}>{activeStation.hostname}</span>
                            </div>
                            <span className="focus-hover-badge" style={{ fontSize: 9, color: '#00e5ff' }}>SOLO FOCUS ACTIVE</span>
                        </div>

                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: '#00e676', fontSize: 11, fontWeight: 800, marginBottom: 4 }}>● FOCUSED LIVE STREAM</span>
                            <h2 style={{ fontSize: 26, fontWeight: 700, color: '#fff', margin: 0 }}>{activeStation.hostname}</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="multicam-viewport-root">
            <div className="multicam-tactical-grid" ref={containerRef} style={gridStyle}>
                {timelineStations.map(st => (
                    <div key={st.id} className="camera-card-cell">
                        <div
                            onClick={() => onSelectActiveStation(st.id)}
                            className="camera-card"
                        >
                            <div className="card-topbar">
                                <div className="station-meta">
                                    <span className="status-pulse" />
                                    <span className="station-name">{st.hostname}</span>
                                </div>
                                <span className="focus-hover-badge">SOLO FOCUS ⤢</span>
                            </div>
                            <div className="card-feed-placeholder">
                                <div className="tactical-crosshair" />
                                <span className="fetch-indicator">
                                    FRAME FETCH @ {formatTimelineClock(baseEpochMs + playheadMs, timeMode)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}