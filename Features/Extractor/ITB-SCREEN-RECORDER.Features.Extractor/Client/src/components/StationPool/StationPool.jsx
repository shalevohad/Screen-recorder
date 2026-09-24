import React, { useState, useMemo } from 'react';
import './StationPool.scss';

export default function StationPool({ availableHosts, selectedHosts, preview, onToggleHost, onSelectBatch, onClearBatch }) {
    const [search, setSearch] = useState('');
    const [filterTab, setFilterTab] = useState('ALL');

    const filtered = useMemo(() => {
        return availableHosts.filter(h => {
            const matchesSearch = h.toLowerCase().includes(search.toLowerCase());
            if (!matchesSearch) return false;

            const meta = preview?.stations?.find(s => s.hostname === h);
            if (filterTab === 'SELECTED') return selectedHosts.includes(h);
            if (filterTab === 'GAPS') return meta?.hasTimeGaps;
            return true;
        });
    }, [availableHosts, search, filterTab, selectedHosts, preview]);

    return (
        <div className="station-pool-card">
            <div className="pool-toolbar">
                <div className="search-wrap">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Filter by station name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                    />
                    {search && (
                        <button className="btn-clear-search" onClick={() => setSearch('')}>✕</button>
                    )}
                </div>

                <div className="pool-filters">
                    <button className={`filter-chip ${filterTab === 'ALL' ? 'active' : ''}`} onClick={() => setFilterTab('ALL')}>
                        ALL ({availableHosts.length})
                    </button>
                    <button className={`filter-chip ${filterTab === 'SELECTED' ? 'active' : ''}`} onClick={() => setFilterTab('SELECTED')}>
                        SELECTED ({selectedHosts.length})
                    </button>
                    <button className={`filter-chip ${filterTab === 'GAPS' ? 'active' : ''}`} onClick={() => setFilterTab('GAPS')}>
                        WITH GAPS ({preview?.stations?.filter(s => s.hasTimeGaps).length || 0})
                    </button>
                </div>

                <div className="bulk-actions">
                    <button className="btn-mini" onClick={() => onSelectBatch(filtered)}>SELECT VISIBLE</button>
                    <button className="btn-mini" onClick={() => onClearBatch(filtered)}>CLEAR</button>
                </div>
            </div>

            <div className="station-matrix-grid">
                {filtered.map(host => {
                    const meta = preview?.stations?.find(s => s.hostname === host);
                    const hasGaps = meta?.hasTimeGaps;
                    const gapsCount = meta?.gaps?.length || 0;
                    const isSelected = selectedHosts.includes(host);

                    return (
                        <div
                            key={host}
                            className={`station-tile ${isSelected ? 'selected' : ''} ${hasGaps ? 'has-gaps' : ''}`}
                            onClick={() => onToggleHost(host)}
                            title={`${host} ${hasGaps ? `(${gapsCount} gaps)` : '(Continuous)'}`}
                        >
                            <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => { }}
                                className="tile-check"
                            />
                            <span className="tile-host-name">{host}</span>
                            {preview && (
                                <span className={`tile-tag ${hasGaps ? 'warn' : 'ok'}`}>
                                    {hasGaps ? `${gapsCount}G` : 'OK'}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}