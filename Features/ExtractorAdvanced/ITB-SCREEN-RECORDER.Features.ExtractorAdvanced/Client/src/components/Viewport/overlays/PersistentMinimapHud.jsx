// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Viewport/overlays/PersistentMinimapHud.jsx
// ==========================================
import React, { useMemo } from 'react';
import './PersistentMinimapHud.scss';

export default function PersistentMinimapHud({
    displays = [],
    activeDisplayId = 'mon-0',
    onSelectDisplay,
    isTransitioning = false,
    mode = 'AUTO' // 'AUTO' or 'MANUAL'
}) {
    // Calculate real physical topology bounds
    const bounds = useMemo(() => {
        if (!displays || displays.length <= 1) return null;
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        displays.forEach(d => {
            const x = d.x ?? d.X ?? 0;
            const y = d.y ?? d.Y ?? 0;
            const w = d.width ?? d.Width ?? 1920;
            const h = d.height ?? d.Height ?? 1080;
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x + w);
            maxY = Math.max(maxY, y + h);
        });

        const totalW = Math.max(1, maxX - minX);
        const totalH = Math.max(1, maxY - minY);
        return { minX, minY, totalW, totalH };
    }, [displays]);

    if (!displays || displays.length <= 1 || !bounds) {
        return null;
    }

    const activeDisplay = displays.find(d => (d.displayId ?? d.DisplayId) === activeDisplayId) || displays[0];
    const activeLabel = activeDisplay ? (activeDisplay.displayId ?? activeDisplay.DisplayId ?? 'mon-0').toUpperCase() : 'MON-0';

    return (
        <aside 
            className={`persistent-minimap-hud ${isTransitioning ? 'transition-inflection' : ''}`}
            aria-label="Display Topology Minimap Radar"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="hud-header">
                <span className={`hud-badge ${mode.toLowerCase()}`}>
                    <span className="hud-pulse" />
                    {mode === 'MANUAL' ? '✋ OVERRIDE' : '⚡ AUTO'} : {activeLabel}
                </span>
            </div>

            <div className="hud-canvas-wrap">
                <svg 
                    className="hud-topology-svg" 
                    viewBox={`0 0 ${bounds.totalW} ${bounds.totalH}`}
                    preserveAspectRatio="xMidYMid meet"
                >
                    {displays.map((d, idx) => {
                        const id = d.displayId ?? d.DisplayId ?? `mon-${idx}`;
                        const x = (d.x ?? d.X ?? 0) - bounds.minX;
                        const y = (d.y ?? d.Y ?? 0) - bounds.minY;
                        const w = d.width ?? d.Width ?? 1920;
                        const h = d.height ?? d.Height ?? 1080;
                        const isActive = id === activeDisplayId;

                        return (
                            <g 
                                key={id} 
                                className={`hud-monitor-node ${isActive ? 'is-active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectDisplay?.(id);
                                }}
                            >
                                <rect
                                    x={x + 10}
                                    y={y + 10}
                                    width={Math.max(10, w - 20)}
                                    height={Math.max(10, h - 20)}
                                    rx="24"
                                    className="monitor-box"
                                />
                                <text
                                    x={x + w / 2}
                                    y={y + h / 2}
                                    className="monitor-text"
                                    dominantBaseline="central"
                                    textAnchor="middle"
                                >
                                    {idx + 1}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </aside>
    );
}
