import './SearchShelf.scss';

export default function SearchShelf({
    isSearchOpen,
    searchInputRef,
    searchQuery,
    setSearchQuery,
    handleClearFilter,
    currentTabFilter,
    setFilterForTab,
    resultCount
}) {
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
                        <button className="clear-btn" onClick={handleClearFilter}>✕</button>
                    )}
                </div>

                <div className="tab-local-filters">
                    <button className={currentTabFilter === 'ALL' ? 'active' : ''} onClick={() => setFilterForTab('ALL')}>ALL</button>
                    <button className={currentTabFilter === 'ONLINE' ? 'active' : ''} onClick={() => setFilterForTab('ONLINE')}>ONLINE</button>
                    <button className={currentTabFilter === 'RECORDING' ? 'active' : ''} onClick={() => setFilterForTab('RECORDING')}>REC</button>
                    <button className={currentTabFilter === 'IDLE' ? 'active' : ''} onClick={() => setFilterForTab('IDLE')}>IDLE</button>
                </div>

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