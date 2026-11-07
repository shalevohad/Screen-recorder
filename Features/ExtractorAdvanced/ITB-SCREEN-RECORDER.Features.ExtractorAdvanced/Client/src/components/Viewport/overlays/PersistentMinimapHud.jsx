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
    mode = 'AUTO', // 'AUTO' or 'MANUAL'
    activeTimeRange = ''
}) {
    const isAuto = mode === 'AUTO';

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
    const activeIndex = displays.indexOf(activeDisplay);
    const screenNum = activeIndex >= 0 ? (activeIndex + 1) : 1;
    const rawLabel = activeDisplay ? (activeDisplay.displayName ?? activeDisplay.DisplayName ?? '') : '';
    const cleanLabel = rawLabel.replace(/\s*\(mon-\d+\)/i, '').trim();
    const activeLabel = cleanLabel && !cleanLabel.toLowerCase().includes('screen')
        ? `SCREEN ${screenNum} (${cleanLabel.toUpperCase()})`
        : (cleanLabel ? cleanLabel.toUpperCase() : `SCREEN ${screenNum}`);

    return (
        <aside 
            className={`persistent-minimap-hud ${isAuto ? 'is-auto-mode is-read-only' : 'is-manual-mode is-interactive'} ${isTransitioning ? 'transition-inflection' : ''}`}
            aria-label="Display Topology Minimap Radar"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="hud-header">
                <span 
                    className={`hud-badge ${mode.toLowerCase()} ${isAuto ? 'is-read-only' : 'is-interactive'}`}
                    title={isAuto 
                        ? "Auto-Director Active: Reflecting active screen at current playhead position (Locked / Read-Only)" 
                        : "Manual Override: Click any screen box below to switch active display"
                    }
                >
                    <span className="hud-pulse" />
                    <span className="hud-mode-text">{isAuto ? '⚡ AUTO-DIRECTOR' : '✋ OVERRIDE'}</span>
                    <span className="hud-colon">:</span>
                    <span className="hud-screen-text">{activeLabel}</span>
                    {isAuto && (
                        <span className="hud-lock-icon" title="Auto-Director is controlling screen cuts (Selection Read-Only)">🔒</span>
                    )}
                    {activeTimeRange && <span className="hud-time-range"> [{activeTimeRange}]</span>}
                </span>
            </div>

            {isAuto && (
                <div className="hud-reflection-indicator" title="Status reflection: Displays active screen selected by Auto-Director cuts">
                    <span className="reflection-icon">👁️</span>
                    <span className="reflection-text">AUTO-DIRECTOR REFLECTION</span>
                </div>
            )}

            {isTransitioning && (
                <div className="hud-transition-alert">
                    <span className="transition-icon">⚡</span>
                    <span>SWITCHED TO {activeLabel}</span>
                </div>
            )}

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
                                className={`hud-monitor-node ${isActive ? 'is-active' : 'is-inactive'} ${isAuto ? 'is-read-only' : 'is-interactive'}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (isAuto) return; // In Auto-Director mode, selection is locked to Auto-Director reflection
                                    onSelectDisplay?.(id);
                                }}
                            >
                                <title>
                                    {isAuto
                                        ? `Screen ${idx + 1} (${isActive ? 'Active by Auto-Director' : 'Inactive'}) • Auto-Director Reflection (Read-Only)`
                                        : `Click to switch to Screen ${idx + 1}`
                                    }
                                </title>
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
