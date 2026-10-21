import React, { useMemo } from 'react';
import WebRTCPlayer from '../Player/WebRTCPlayer';
import './VirtualTopologyCanvas.scss';

export default function VirtualTopologyCanvas({
    station,
    activeDisplayId = 'canvas',
    onSelectDisplay,
    isMuted = true,
    volume = 1,
    isInteractive = false
}) {
    const displays = useMemo(() => {
        if (station?.Displays && station.Displays.length > 0) {
            return station.Displays;
        }
        if (station?.DisplayTopology?.Displays && station.DisplayTopology.Displays.length > 0) {
            return station.DisplayTopology.Displays;
        }
        return [
            {
                DisplayId: 'mon-0',
                DisplayName: 'Display 1',
                IsPrimary: true,
                X: 0,
                Y: 0,
                Width: 1920,
                Height: 1080
            }
        ];
    }, [station]);

    const bounds = useMemo(() => {
        if (!displays || displays.length === 0) {
            return { minX: 0, minY: 0, totalWidth: 1920, totalHeight: 1080 };
        }
        const minX = Math.min(...displays.map(d => d.X ?? 0));
        const minY = Math.min(...displays.map(d => d.Y ?? 0));
        const maxX = Math.max(...displays.map(d => (d.X ?? 0) + (d.Width || 1920)));
        const maxY = Math.max(...displays.map(d => (d.Y ?? 0) + (d.Height || 1080)));

        return {
            minX,
            minY,
            totalWidth: Math.max(1, maxX - minX),
            totalHeight: Math.max(1, maxY - minY)
        };
    }, [displays]);

    // Single display solo view when not in 'canvas' mode
    if (activeDisplayId !== 'canvas') {
        const soloDisplay = displays.find(d => d.DisplayId === activeDisplayId) || displays[0];
        const streamPath = `live/${station.Hostname}/${soloDisplay.DisplayId}`;

        return (
            <div className="virtual-topology-solo-viewport">
                <WebRTCPlayer
                    streamPath={streamPath}
                    isMuted={!soloDisplay.IsPrimary || isMuted}
                    volume={volume}
                    showControls={false}
                />
                <div className="solo-display-badge">
                    <span className="solo-indicator">●</span>
                    <span className="solo-label">
                        {soloDisplay.DisplayName || soloDisplay.DisplayId.toUpperCase()} ({soloDisplay.Width}x{soloDisplay.Height})
                    </span>
                </div>
            </div>
        );
    }

    // Default: Multi-display Virtual Desktop Canvas
    return (
        <div
            className={`virtual-topology-canvas-container ${isInteractive ? 'interactive' : ''}`}
            style={{
                aspectRatio: `${bounds.totalWidth} / ${bounds.totalHeight}`
            }}
        >
            <div className="virtual-canvas-grid-bg" />

            {displays.map((d, index) => {
                const leftPct = ((d.X - bounds.minX) / bounds.totalWidth) * 100;
                const topPct = ((d.Y - bounds.minY) / bounds.totalHeight) * 100;
                const widthPct = (d.Width / bounds.totalWidth) * 100;
                const heightPct = (d.Height / bounds.totalHeight) * 100;
                const streamPath = `live/${station.Hostname}/${d.DisplayId}`;

                return (
                    <div
                        key={d.DisplayId}
                        className={`sub-display-box ${d.IsPrimary ? 'is-primary' : 'is-secondary'}`}
                        style={{
                            left: `${leftPct}%`,
                            top: `${topPct}%`,
                            width: `${widthPct}%`,
                            height: `${heightPct}%`
                        }}
                        onClick={() => onSelectDisplay && onSelectDisplay(d.DisplayId)}
                        title={`Click to solo ${d.DisplayName || d.DisplayId} (${d.Width}x{d.Height})`}
                    >
                        <WebRTCPlayer
                            streamPath={streamPath}
                            isMuted={!d.IsPrimary || isMuted}
                            volume={volume}
                            showControls={false}
                        />

                        <div className="sub-display-overlay">
                            <span className="display-index-pill">
                                {d.IsPrimary ? '★ ' : ''}🖥 {index + 1}
                            </span>
                            <span className="display-res-pill">
                                {d.Width}x{d.Height}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
