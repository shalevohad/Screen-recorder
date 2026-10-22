import React, { useState, useEffect, useRef, useMemo } from 'react';
import { calculateTopologyBounds, calculateNormalizedDisplayRect } from '../../utils/topologyLayout';
import './StationDisplayBar.scss';

/**
 * Renders a mini SVG wireframe topology icon showing the layout of the displays
 * and highlighting the currently targeted display (or all displays for 'canvas').
 */
function MonitorWireframeIcon({ displays, targetDisplayId }) {
    const bounds = useMemo(() => calculateTopologyBounds(displays), [displays]);
    const isCanvas = targetDisplayId === 'canvas';

    return (
        <div className="monitor-wireframe-badge" aria-hidden="true">
            <svg
                viewBox={`0 0 ${bounds.totalWidth} ${bounds.totalHeight}`}
                className="wireframe-svg"
                preserveAspectRatio="xMidYMid meet"
            >
                {displays.map((d) => {
                    const isSelected = isCanvas || d.DisplayId === targetDisplayId;
                    const x = d.X ?? d.x ?? 0;
                    const y = d.Y ?? d.y ?? 0;
                    const width = d.Width || d.width || 1920;
                    const height = d.Height || d.height || 1080;

                    return (
                        <rect
                            key={d.DisplayId}
                            x={x - bounds.minX + 20}
                            y={y - bounds.minY + 20}
                            width={Math.max(10, width - 40)}
                            height={Math.max(10, height - 40)}
                            rx="80"
                            ry="80"
                            className={`wireframe-rect ${isSelected ? 'is-selected' : 'is-dimmed'}`}
                        />
                    );
                })}
            </svg>
        </div>
    );
}

/**
 * Tactical Multi-Monitor Floating Tool Strip & Flyout Menu
 * - Vertical bar of circular buttons: [ ≡ | ✱ | ① | ② ... ]
 * - Interactive flyout menu showing desktop wireframe and monitor specifications
 */
export default function StationDisplayBar({
    displays = [],
    activeDisplayId = 'canvas',
    onSelectDisplay
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDirection, setOpenDirection] = useState('right');
    const containerRef = useRef(null);

    // Close on click outside or Escape
    useEffect(() => {
        if (!isMenuOpen) return;

        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('pointerdown', handleClickOutside, true);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handleClickOutside, true);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMenuOpen]);

    // Calculate whether flyout should open right or left based on viewport boundary
    const handleToggleMenu = (e) => {
        e.stopPropagation();
        if (!isMenuOpen && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const flyoutWidth = 270;
            if (rect.right + flyoutWidth > window.innerWidth) {
                setOpenDirection('left');
            } else {
                setOpenDirection('right');
            }
        }
        setIsMenuOpen(prev => !prev);
    };

    const handleSelect = (e, displayId) => {
        e.stopPropagation();
        if (onSelectDisplay) {
            onSelectDisplay(displayId);
        }
        setIsMenuOpen(false);
    };

    if (!displays || displays.length <= 1) {
        return null;
    }

    return (
        <div
            className="station-display-bar-wrapper"
            ref={containerRef}
            onClick={(e) => e.stopPropagation()}
            role="toolbar"
            aria-label="Multi-Monitor Display Switcher"
        >
            {/* Vertical Pill Bar */}
            <div className="vertical-display-strip">
                {/* 1. Hamburger / Menu Options Trigger */}
                <button
                    type="button"
                    className={`display-strip-btn btn-menu-trigger ${isMenuOpen ? 'is-active' : ''}`}
                    onClick={handleToggleMenu}
                    title="Display Options Menu"
                    aria-label="Display Options Menu"
                    aria-expanded={isMenuOpen}
                >
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>

                {/* 2. Asterisk / Whole Desktop Button */}
                <button
                    type="button"
                    className={`display-strip-btn btn-canvas ${activeDisplayId === 'canvas' ? 'is-active' : ''}`}
                    onClick={(e) => handleSelect(e, 'canvas')}
                    title="Whole desktop (Virtual Desktop Canvas Layout)"
                    aria-label="Whole desktop"
                >
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                        {/* Crisp 6-ray Asterisk Icon */}
                        <path d="M11 2h2v7.17l5.07-5.07 1.41 1.41L14.41 10.6 21.5 11v2l-7.09.4 5.07 5.07-1.41 1.41L13 14.83V22h-2v-7.17l-5.07 5.07-1.41-1.41L9.59 13.4 2.5 13v-2l7.09-.4-5.07-5.07 1.41-1.41L11 9.17V2z" />
                    </svg>
                </button>

                {/* 3. Numbered Display Buttons (Monitor 1, 2, ...) */}
                {displays.map((d, idx) => {
                    const isSolo = activeDisplayId === d.DisplayId;
                    return (
                        <button
                            key={d.DisplayId}
                            type="button"
                            className={`display-strip-btn btn-number ${isSolo ? 'is-active' : ''}`}
                            onClick={(e) => handleSelect(e, d.DisplayId)}
                            title={`Monitor ${idx + 1}: ${d.DisplayName || d.DisplayId} (${d.Width}x${d.Height})`}
                            aria-label={`Monitor ${idx + 1}`}
                        >
                            <span className="number-label">{idx + 1}</span>
                        </button>
                    );
                })}
            </div>

            {/* Flyout Popup Menu */}
            {isMenuOpen && (
                <div
                    className={`display-flyout-menu direction-${openDirection}`}
                    role="menu"
                    aria-label="Workstation Monitors"
                >
                    {/* Item 1: Whole Desktop */}
                    <div
                        className={`flyout-item ${activeDisplayId === 'canvas' ? 'is-active' : ''}`}
                        onClick={(e) => handleSelect(e, 'canvas')}
                        role="menuitem"
                        tabIndex={0}
                    >
                        <MonitorWireframeIcon displays={displays} targetDisplayId="canvas" />
                        <div className="item-text-group">
                            <span className="item-title">Whole desktop</span>
                            <span className="item-subtitle">View the client's whole desktop</span>
                        </div>
                    </div>

                    {/* Items 2..N: Individual Monitors */}
                    {displays.map((d, idx) => {
                        const isSolo = activeDisplayId === d.DisplayId;
                        const monitorName = d.DisplayName || 'Generic PnP Monitor';
                        return (
                            <div
                                key={d.DisplayId}
                                className={`flyout-item ${isSolo ? 'is-active' : ''}`}
                                onClick={(e) => handleSelect(e, d.DisplayId)}
                                role="menuitem"
                                tabIndex={0}
                            >
                                <MonitorWireframeIcon displays={displays} targetDisplayId={d.DisplayId} />
                                <div className="item-text-group">
                                    <span className="item-title">Monitor {idx + 1}</span>
                                    <span className="item-subtitle">
                                        {monitorName} ({d.Width}, {d.Height})
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
