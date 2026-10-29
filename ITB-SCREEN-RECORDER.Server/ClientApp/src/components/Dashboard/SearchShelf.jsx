// Client/src/components/Dashboard/SearchShelf.jsx
import './SearchShelf.scss';

export default function SearchShelf({
    isSearchOpen,
    searchInputRef,
    searchQuery,
    setSearchQuery,
    handleClearFilter,
    currentTabFilter,
    setFilterForTab,
    monitoredSubFilter = 'ALL',
    setMonitoredSubFilter,
    monitoredCounts,
    resultCount
}) {
    const isMonitoredActive = currentTabFilter === 'MONITORED' || currentTabFilter === 'IDLE';

    return (
        <div className={`fleet-search-shelf ${isSearchOpen ? 'is-open' : ''}`}>
            <div className="search-shelf-inner">
                <div className="search-input-field">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="14" height="14">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="FILTER FLEET BY HOSTNAME OR IP..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Escape' && handleClearFilter()}
                    />
                    {searchQuery && (
                        <button className="clear-btn" onClick={handleClearFilter} title="Clear filter">✕</button>
                    )}
                </div>

                <div className="tab-local-filters">
                    <button className={currentTabFilter === 'ALL' ? 'active' : ''} onClick={() => setFilterForTab('ALL')}>ALL</button>
                    <button className={currentTabFilter === 'ONLINE' ? 'active' : ''} onClick={() => setFilterForTab('ONLINE')}>ONLINE</button>
                    <button className={currentTabFilter === 'RECORDING' ? 'active' : ''} onClick={() => setFilterForTab('RECORDING')}>REC</button>
                    <button
                        className={isMonitoredActive ? 'active' : ''}
                        onClick={() => setFilterForTab('MONITORED')}
                        title="Workstations online but not currently recording"
                    >
                        MONITORED
                        {monitoredCounts?.total > 0 && <span className="filter-pill-count">{monitoredCounts.total}</span>}
                    </button>
                    <button className={currentTabFilter === 'OFFLINE' ? 'active' : ''} onClick={() => setFilterForTab('OFFLINE')}>OFFLINE</button>
                </div>

                {isMonitoredActive && (
                    <div className="monitored-sub-filters">
                        <span className="sub-filter-divider">/</span>
                        <button
                            type="button"
                            className={`sub-filter-btn ${monitoredSubFilter === 'ALL' ? 'active' : ''}`}
                            onClick={() => setMonitoredSubFilter?.('ALL')}
                            title="Show all monitored workstations"
                        >
                            ALL
                            {monitoredCounts?.total > 0 && <span className="sub-badge">{monitoredCounts.total}</span>}
                        </button>
                        <button
                            type="button"
                            className={`sub-filter-btn alert-btn ${monitoredSubFilter === 'NOT_SNOOZED' ? 'active' : ''}`}
                            onClick={() => setMonitoredSubFilter?.('NOT_SNOOZED')}
                            title="Show monitored workstations with active unrecorded alerts (not snoozed)"
                        >
                            ⚠️ NOT SNOOZED
                            {monitoredCounts?.notSnoozed > 0 && <span className="sub-badge alert">{monitoredCounts.notSnoozed}</span>}
                        </button>
                        <button
                            type="button"
                            className={`sub-filter-btn snooze-btn ${monitoredSubFilter === 'SNOOZED' ? 'active' : ''}`}
                            onClick={() => setMonitoredSubFilter?.('SNOOZED')}
                            title="Show monitored workstations with postponed alerts (snoozed)"
                        >
                            ⏱ SNOOZED
                            {monitoredCounts?.snoozed > 0 && <span className="sub-badge snooze">{monitoredCounts.snoozed}</span>}
                        </button>
                    </div>
                )}

                <div className="search-actions-group">
                    {searchQuery && (
                        <button className="reset-filter-link" onClick={handleClearFilter}>
                            RESET FILTER
                        </button>
                    )}
                    <div className="search-stats-badge">
                        {resultCount} AGENTS
                    </div>
                </div>
            </div>
        </div>
    );
}