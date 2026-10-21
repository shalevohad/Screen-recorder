import React, { useMemo } from 'react';
import { calculateTopologyBounds, calculateNormalizedDisplayRect } from '../../utils/topologyLayout';
import './FullscreenMinimapNavigator.scss';

export default function FullscreenMinimapNavigator({
    station,
    activeDisplayId,
    onSelectDisplay
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

    const bounds = useMemo(() => calculateTopologyBounds(displays), [displays]);

    // Don't render if workstation only has a single display
    if (displays.length <= 1) {
        return null;
    }

    return (
        <div className="fullscreen-minimap-navigator" role="navigation" aria-label="Multi-Monitor HUD Minimap">
            <div className="minimap-header">
                <span className="minimap-radar-icon">⊞</span>
                <span className="minimap-title">RADAR TOPOLOGY</span>
                <button
                    type="button"
                    className="btn-minimap-canvas"
                    onClick={() => onSelectDisplay && onSelectDisplay('canvas')}
                    title="Switch to full virtual canvas overview"
                >
                    CANVAS
                </button>
            </div>

            <div
                className="minimap-canvas-box"
                style={{
                    aspectRatio: `${bounds.totalWidth} / ${bounds.totalHeight}`
                }}
            >
                {displays.map((d, idx) => {
                    const { leftPct, topPct, widthPct, heightPct } = calculateNormalizedDisplayRect(d, bounds);
                    const isActive = d.DisplayId === activeDisplayId;

                    return (
                        <button
                            key={d.DisplayId}
                            type="button"
                            className={`minimap-display-rect ${isActive ? 'is-active' : ''} ${d.IsPrimary ? 'is-primary' : ''}`}
                            style={{
                                left: `${leftPct}%`,
                                top: `${topPct}%`,
                                width: `${widthPct}%`,
                                height: `${heightPct}%`
                            }}
                            onClick={() => onSelectDisplay && onSelectDisplay(d.DisplayId)}
                            title={`Switch view to ${d.DisplayName || d.DisplayId} (${d.Width}x${d.Height})`}
                        >
                            <span className="display-num">{idx + 1}</span>
                            {isActive && <span className="focus-indicator">● FOCUS</span>}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
