// Client/src/components/StationDrawer/StationDrawer.jsx
import React, { useState, useMemo } from 'react';
import './StationDrawer.scss';

export default function StationDrawer({
    isOpen,
    onToggle,
    onClose,
    allStations = [],
    selectedStationIds = [],
    onToggleStation,
    onUpdateSelections,
    isInitialSetup,
    onApply,
    onOpenRangeModal
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortAlpha, setSortAlpha] = useState(true);
    const [filterMode, setFilterMode] = useState('all'); // 'all' | 'selected' | 'unselected'

    const isEmptyState = allStations.length === 0;

    let panelClass = 'is-closed';
    if (isInitialSetup || isEmptyState) panelClass = 'is-full-width';
    else if (isOpen) panelClass = 'is-open';

    const stations = useMemo(() => {
        return allStations
            .filter(s => {
                const matchesSearch = (s.hostname || s.name || '').toLowerCase().includes(searchTerm.toLowerCase());
                const isSelected = selectedStationIds.includes(s.id);

                if (filterMode === 'selected') return matchesSearch && isSelected;
                if (filterMode === 'unselected') return matchesSearch && !isSelected;
                return matchesSearch;
            })
            .sort((a, b) => sortAlpha ? (a.hostname || a.name || '').localeCompare(b.hostname || b.name || '') : 0);
    }, [allStations, searchTerm, sortAlpha, filterMode, selectedStationIds]);

    const handleHeaderClick = () => {
        if (panelClass === 'is-closed' && onToggle) {
            onToggle();
        }
    };

    const handleSelectAll = () => {
        if (onUpdateSelections) {
            const visibleIds = stations.map(s => s.id);
            const merged = Array.from(new Set([...selectedStationIds, ...visibleIds]));
            onUpdateSelections(merged);
        }
    };

    const handleClearAll = () => {
        if (onUpdateSelections) {
            const visibleIds = stations.map(s => s.id);
            const remaining = selectedStationIds.filter(id => !visibleIds.includes(id));
            onUpdateSelections(remaining);
        }
    };

    return (
        <div className={`station-drawer-panel ${panelClass}`}>
            <div className="drawer-header" onClick={handleHeaderClick}>
                <div className="header-title">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    {panelClass !== 'is-closed' && <span>Station Pool ({selectedStationIds.length}/{allStations.length})</span>}
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
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
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
                            <div className="search-and-actions">
                                <div className="search-bar">
                                    <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
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
                                        {sortAlpha ? 'A-Z' : 'Def'}
                                    </button>
                                </div>

                                {/* פילטרים מהירים: All / Selected / Unselected */}
                                <div className="filter-pills-row">
                                    <button
                                        className={`filter-pill ${filterMode === 'all' ? 'active' : ''}`}
                                        onClick={() => setFilterMode('all')}
                                    >
                                        All
                                    </button>
                                    <button
                                        className={`filter-pill ${filterMode === 'selected' ? 'active' : ''}`}
                                        onClick={() => setFilterMode('selected')}
                                    >
                                        Selected
                                    </button>
                                    <button
                                        className={`filter-pill ${filterMode === 'unselected' ? 'active' : ''}`}
                                        onClick={() => setFilterMode('unselected')}
                                    >
                                        Unselected
                                    </button>
                                </div>

                                <div className="bulk-actions">
                                    <button onClick={handleSelectAll}>Select All</button>
                                    <div className="divider" />
                                    <button onClick={handleClearAll}>Clear</button>
                                </div>
                            </div>

                            {panelClass === 'is-full-width' && (
                                <div className="full-width-hint">
                                    Please select at least one station from the pool below to initialize the workspace.
                                </div>
                            )}

                            <div className={`station-list ${panelClass === 'is-full-width' ? 'grid-view' : ''}`}>
                                {stations.map(st => {
                                    const isSelected = selectedStationIds.includes(st.id);
                                    const isLive = !st.hostname.includes('Offline');

                                    return (
                                        <label key={st.id} className={`station-row ${isSelected ? 'selected' : ''}`}>
                                            <div className="checkbox-wrap">
                                                <input
                                                    type="checkbox"
                                                    className="hidden-checkbox"
                                                    checked={isSelected}
                                                    onChange={() => onToggleStation(st.id)}
                                                />
                                                <div className="custom-checkbox">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                </div>
                                                <div className={`status-dot ${isLive ? 'live' : 'offline'}`} />
                                                <span className="hostname" title={st.hostname || st.name}>{st.hostname || st.name}</span>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>

                            {panelClass === 'is-full-width' && (
                                <div className="drawer-footer">
                                    <button
                                        className="btn-apply-changes"
                                        disabled={selectedStationIds.length === 0}
                                        onClick={onApply}
                                    >
                                        Start Workspace
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}