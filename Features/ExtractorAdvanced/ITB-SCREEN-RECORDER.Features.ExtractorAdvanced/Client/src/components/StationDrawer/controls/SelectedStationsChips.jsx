// Client/src/components/StationDrawer/controls/SelectedStationsChips.jsx
import React, { useState, useRef, useEffect, useMemo } from 'react';
import './SelectedStationsChips.scss';

/**
 * SelectedStationsChips displays active station selection chips with overflow popover and clear controls.
 * 
 * @param {Object} props
 * @param {Array<string>} [props.selectedStationIds=[]] - Selected station ID array.
 * @param {Array} [props.allStations=[]] - All available station objects.
 * @param {(id: string) => void} props.onToggleStation - Toggle station selection handler.
 * @param {() => void} props.onClearAll - Clear all selections callback.
 * @param {number} [props.maxVisible=3] - Maximum visible chips before overflow grouping.
 * @returns {JSX.Element}
 */
export default function SelectedStationsChips({
    selectedStationIds = [],
    allStations = [],
    onToggleStation,
    onClearAll,
    maxVisible = 3
}) {
    const [isOverflowOpen, setIsOverflowOpen] = useState(false);
    const popoverRef = useRef(null);

    // Dismiss popover on outside pointer down
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popoverRef.current && !popoverRef.current.contains(e.target)) {
                setIsOverflowOpen(false);
            }
        };
        if (isOverflowOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOverflowOpen]);

    const selectedStations = useMemo(() => {
        const stationMap = new Map(allStations.map(s => [s.id, s]));
        return selectedStationIds.map(id => stationMap.get(id) || { id, hostname: `Station ${id}` });
    }, [selectedStationIds, allStations]);

    // Empty selection state — render subtle tactical hint bar
    if (selectedStationIds.length === 0) {
        return (
            <div className="selected-chips-dock-root empty-selection">
                <span className="dock-hint-dot" />
                <span className="dock-hint-text">Select workstations above to include in mission scope</span>
            </div>
        );
    }

    const visibleChips = selectedStations.slice(0, maxVisible);
    const overflowChips = selectedStations.slice(maxVisible);
    const hasOverflow = overflowChips.length > 0;

    return (
        <div className="selected-chips-dock-root">
            <div className="dock-lead-badge">
                <span className="pulse-dot" />
                <span>ACTIVE ({selectedStationIds.length})</span>
            </div>

            <div className="chips-dock-track">
                {visibleChips.map(st => {
                    const name = st.displayName || st.hostname || st.name || st.id;
                    return (
                        <div key={st.id} className="dock-chip" title={name}>
                            <span className="chip-name">{name}</span>
                            <button
                                type="button"
                                className="btn-chip-remove"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleStation(st.id);
                                }}
                                title={`Remove ${name}`}
                            >
                                ✕
                            </button>
                        </div>
                    );
                })}

                {/* Smart overflow pill button with upward opening popover */}
                {hasOverflow && (
                    <div className="overflow-popover-container" ref={popoverRef}>
                        <button
                            type="button"
                            className={`btn-overflow-pill ${isOverflowOpen ? 'active' : ''}`}
                            onClick={() => setIsOverflowOpen(!isOverflowOpen)}
                            title="View all selected workstations"
                        >
                            <span>+{overflowChips.length} MORE</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="18 15 12 9 6 15" />
                            </svg>
                        </button>

                        {isOverflowOpen && (
                            <div className="overflow-popover-menu upward">
                                <div className="popover-header">
                                    <span>ADDITIONAL WORKSTATIONS ({overflowChips.length})</span>
                                </div>
                                <div className="popover-list">
                                    {overflowChips.map(st => {
                                        const name = st.displayName || st.hostname || st.name || st.id;
                                        return (
                                            <div key={st.id} className="popover-item">
                                                <span className="item-name" title={name}>{name}</span>
                                                <button
                                                    type="button"
                                                    className="btn-item-remove"
                                                    onClick={() => onToggleStation(st.id)}
                                                    title={`Remove ${name}`}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <button
                type="button"
                className="btn-clear-dock"
                onClick={onClearAll}
                title="Deselect all stations"
            >
                Clear All
            </button>
        </div>
    );
}