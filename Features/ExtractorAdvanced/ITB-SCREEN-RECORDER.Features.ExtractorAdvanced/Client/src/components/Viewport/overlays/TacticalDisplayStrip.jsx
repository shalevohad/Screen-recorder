// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Viewport/overlays/TacticalDisplayStrip.jsx
// Minimalist Tactical Multi-Monitor Vertical Strip (Main Dashboard Style)
// ==========================================
import React from 'react';
import './TacticalDisplayStrip.scss';

export default function TacticalDisplayStrip({
    displays = [],
    activeDisplayId = 'mon-0',
    onSelectDisplay,
    areAllDisplaysPlaced = false,
    isAutoDirectorEnabled = false
}) {
    if (!displays || displays.length <= 1) {
        return null;
    }

    const currentNormalized = (activeDisplayId || 'mon-0').toLowerCase();
    const isAutoActive = currentNormalized === 'auto' || currentNormalized === 'director';

    return (
        <aside
            className={`tactical-display-strip-wrapper ${areAllDisplaysPlaced ? 'are-all-placed' : ''}`}
            aria-label="Workstation Display Switcher"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="vertical-display-strip" role="toolbar">
                {/* Optional Auto-Director Trigger */}
                {isAutoDirectorEnabled && (
                    <button
                        type="button"
                        className={`display-strip-btn btn-auto ${isAutoActive ? 'is-active' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelectDisplay?.('auto');
                        }}
                        title="Auto-Director: Automatically follow active keyboard/mouse cuts"
                        aria-label="Auto-Director"
                    >
                        <span className="auto-icon">⚡</span>
                    </button>
                )}

                {/* Numbered Monitor Switcher Buttons (1, 2, 3...) */}
                {displays.map((disp, idx) => {
                    const dispId = (disp.displayId ?? disp.DisplayId ?? `mon-${idx}`).toLowerCase();
                    const isActive = !isAutoActive && (currentNormalized === dispId);
                    const width = disp.width ?? disp.Width ?? 1920;
                    const height = disp.height ?? disp.Height ?? 1080;
                    const name = disp.displayName ?? disp.DisplayName ?? `Monitor ${idx + 1}`;

                    return (
                        <button
                            key={dispId}
                            type="button"
                            className={`display-strip-btn btn-number ${isActive ? 'is-active' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                onSelectDisplay?.(dispId);
                            }}
                            title={`Switch window to Monitor ${idx + 1}: ${name} (${width}×${height})`}
                            aria-label={`Monitor ${idx + 1}`}
                        >
                            <span className="number-label">{idx + 1}</span>
                        </button>
                    );
                })}
            </div>
        </aside>
    );
}
