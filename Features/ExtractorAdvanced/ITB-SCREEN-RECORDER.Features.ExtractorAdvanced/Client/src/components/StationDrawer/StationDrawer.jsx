import React, { useState } from 'react';
import './StationDrawer.scss';

export default function StationDrawer({
    isOpen,
    onToggle,
    allStations,
    selectedStationIds,
    onToggleStation,
    activeStationId,
    onSetActiveStation
}) {
    const [search, setSearch] = useState('');
    const [sortAlpha, setSortAlpha] = useState(true);

    const stations = allStations
        .filter(s => s.hostname.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => sortAlpha ? a.hostname.localeCompare(b.hostname) : 0);

    return (
        <div className={`station-drawer-panel ${isOpen ? 'is-open' : 'is-closed'}`}>
            {/* כפתור פתיחה/סגירה בראש המגירה */}
            <div className="drawer-header" onClick={onToggle}>
                <div className="header-title">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    {isOpen && <span>Station Pool</span>}
                </div>
                {isOpen && (
                    <button className="btn-close" title="Close Drawer">✕</button>
                )}
            </div>

            {isOpen && (
                <div className="drawer-body">
                    {/* חיפוש ומיון */}
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Filter stations..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            className="btn-sort"
                            onClick={() => setSortAlpha(!sortAlpha)}
                            title="Toggle alphabetical sort"
                        >
                            {sortAlpha ? 'A-Z' : 'Default'}
                        </button>
                    </div>

                    {/* רשימת תחנות */}
                    <div className="station-list">
                        {stations.map(st => {
                            const isSelected = selectedStationIds.includes(st.id);
                            const isActive = activeStationId === st.id;

                            return (
                                <div key={st.id} className={`station-row ${isActive ? 'active' : ''}`}>
                                    <label className="checkbox-wrap">
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => onToggleStation(st.id)}
                                        />
                                        <span className="hostname">{st.hostname}</span>
                                    </label>
                                    {isSelected && (
                                        <button
                                            className={`btn-preview ${isActive ? 'viewing' : ''}`}
                                            onClick={() => onSetActiveStation(st.id)}
                                        >
                                            {isActive ? 'ACTIVE' : 'VIEW'}
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}