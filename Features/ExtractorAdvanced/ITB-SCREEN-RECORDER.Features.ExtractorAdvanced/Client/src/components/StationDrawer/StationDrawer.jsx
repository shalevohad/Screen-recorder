import React, { useState, useMemo } from 'react';
import './StationDrawer.scss';

export default function StationDrawer({
    isOpen,
    onToggle,
    onClose,
    allStations = [],
    selectedStationIds = [],
    onToggleStation,
    isInitialSetup,
    onApply,
    onOpenRangeModal
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortAlpha, setSortAlpha] = useState(true);

    const isEmptyState = allStations.length === 0;

    let panelClass = 'is-closed';
    if (isInitialSetup || isEmptyState) panelClass = 'is-full-width';
    else if (isOpen) panelClass = 'is-open';

    const stations = useMemo(() => {
        return allStations
            .filter(s => s.hostname.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => sortAlpha ? a.hostname.localeCompare(b.hostname) : 0);
    }, [allStations, searchTerm, sortAlpha]);

    const handleHeaderClick = () => {
        if (panelClass === 'is-closed' && onToggle) {
            onToggle();
        }
    };

    return (
        <div className={`station-drawer-panel ${panelClass}`}>
            <div className="drawer-header" onClick={handleHeaderClick}>
                <div className="header-title">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    {panelClass !== 'is-closed' && <span>Station Pool</span>}
                </div>
                {panelClass === 'is-open' && (
                    <button
                        className="btn-close"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onClose) onClose();
                            else if (onToggle) onToggle();
                        }}
                        title="Close Drawer"
                    >
                        ✕
                    </button>
                )}
            </div>

            {panelClass !== 'is-closed' && (
                <div className="drawer-body">
                    {isEmptyState ? (
                        <div className="empty-state-view">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            <h3>No Active Stations Found</h3>
                            <p>No recording agents were active during the currently selected mission scope.</p>
                            <button className="btn-change-time" onClick={onOpenRangeModal}>
                                Change Time Window
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="search-bar">
                                <input
                                    type="text"
                                    placeholder="Filter stations..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button
                                    className="btn-sort"
                                    onClick={() => setSortAlpha(!sortAlpha)}
                                    title="Toggle alphabetical sort"
                                >
                                    {sortAlpha ? 'A-Z' : 'Default'}
                                </button>
                            </div>

                            {panelClass === 'is-full-width' && (
                                <div className="full-width-hint">
                                    Please select at least one station from the pool below to initialize the workspace.
                                </div>
                            )}

                            <div className={`station-list ${panelClass === 'is-full-width' ? 'grid-view' : ''}`}>
                                {stations.map(st => {
                                    const isSelected = selectedStationIds.includes(st.id);
                                    return (
                                        <label key={st.id} className={`station-row ${isSelected ? 'selected' : ''}`}>
                                            <div className="checkbox-wrap">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => onToggleStation(st.id)}
                                                />
                                                <span className="hostname">{st.hostname}</span>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>

                            <div className="drawer-footer">
                                <button
                                    className="btn-apply-changes"
                                    disabled={selectedStationIds.length === 0}
                                    onClick={onApply}
                                >
                                    {isInitialSetup ? 'Start Workspace' : 'Apply Changes'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}