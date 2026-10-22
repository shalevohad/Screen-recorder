import React, { useMemo } from 'react';
import WebRTCPlayer from '../Player/WebRTCPlayer';
import { calculateTopologyBounds, calculateNormalizedDisplayRect } from '../../utils/topologyLayout';
import './VirtualTopologyCanvas.scss';

export default function VirtualTopologyCanvas({
    station,
    activeDisplayId = 'canvas',
    onSelectDisplay,
    isMuted = true,
    volume = 1,
    isInteractive = false
}) {
    const stationHost = station?.hostname || station?.Hostname || station?.stationId || station?.StationId || '';

    const displays = useMemo(() => {
        const raw = station?.displays || station?.Displays || station?.displayTopology?.displays || station?.DisplayTopology?.Displays;
        if (raw && raw.length > 0) {
            return raw.map(d => ({
                DisplayId: d.DisplayId || d.displayId || 'mon-0',
                DisplayName: d.DisplayName || d.displayName || 'Display',
                IsPrimary: Boolean(d.IsPrimary ?? d.isPrimary),
                X: d.X ?? d.x ?? 0,
                Y: d.Y ?? d.y ?? 0,
                Width: d.Width || d.width || 1920,
                Height: d.Height || d.height || 1080
            }));
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

    const bounds = useMemo(() => calculateTopologyBounds(displays), [displays]);

    // Single display solo view when not in 'canvas' mode
    if (activeDisplayId !== 'canvas') {
        const soloDisplay = displays.find(d => d.DisplayId === activeDisplayId) || displays[0];
        const streamPath = stationHost ? `live/${stationHost}/${soloDisplay.DisplayId}` : '';

        return (
            <div className="virtual-topology-solo-viewport">
                {streamPath && (
                    <WebRTCPlayer
                        streamPath={streamPath}
                        isMuted={!soloDisplay.IsPrimary || isMuted}
                        volume={volume}
                        showControls={false}
                    />
                )}
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
                const { leftPct, topPct, widthPct, heightPct } = calculateNormalizedDisplayRect(d, bounds);
                const streamPath = stationHost ? `live/${stationHost}/${d.DisplayId}` : '';

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
                        title={`Click to solo ${d.DisplayName || d.DisplayId} (${d.Width}x${d.Height})`}
                    >
                        {streamPath && (
                            <WebRTCPlayer
                                streamPath={streamPath}
                                isMuted={!d.IsPrimary || isMuted}
                                volume={volume}
                                showControls={false}
                            />
                        )}

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
