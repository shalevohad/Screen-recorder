// Client/src/components/StationDrawer/controls/StationFilterBar.jsx
import React, { useState } from 'react';
import './StationFilterBar.scss';

export default function StationFilterBar({
    searchTerm,
    onSearchChange,
    sortAlpha,
    onToggleSort,
    effectiveTabs,
    selectedTabId,
    onSelectTab,
    isLoadingTabs,
    allStations,
    selectedStationIds,
    filterMode,
    onFilterModeChange,
    filteredCount,
    selectedInTabCount,
    unselectedInTabCount,
    activeTabName,
    onSelectAllInScope,
    onClearInScope,
    viewMode = 'grid',
    onViewModeChange,
    isDrawerMode = false // האם הרכיב מוצג בתוך מגירה צרה
}) {
    const [isFilterTrayOpen, setIsFilterTrayOpen] = useState(false);
    const hasActiveSubFilter = filterMode !== 'all';

    return (
        <div className={`station-filter-bar-root ${isDrawerMode ? 'is-drawer-compact' : ''}`}>
            {/* שורת חיפוש ובקרה ראשית */}
            <div className="search-bar-row">
                <div className="search-input-wrap">
                    <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Filter stations..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                {/* במצב מגירה: כפתור לפתיחת/סגירת גלולות הסינון */}
                {isDrawerMode && (
                    <button
                        type="button"
                        className={`btn-filter-toggle ${isFilterTrayOpen ? 'open' : ''} ${hasActiveSubFilter ? 'has-filter' : ''}`}
                        onClick={() => setIsFilterTrayOpen(!isFilterTrayOpen)}
                        title="Toggle Filters"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                        </svg>
                        {hasActiveSubFilter && <span className="active-dot" />}
                    </button>
                )}

                {/* בורר מצב תצוגה (Grid / Table) מופיע רק במסך מלא */}
                {!isDrawerMode && onViewModeChange && (
                    <div className="view-mode-toggle-group">
                        <button
                            type="button"
                            className={`btn-view-mode ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => onViewModeChange('grid')}
                            title="Grid View"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className={`btn-view-mode ${viewMode === 'table' ? 'active' : ''}`}
                            onClick={() => onViewModeChange('table')}
                            title="Table View"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
                                <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
                                <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                )}

                <button
                    type="button"
                    className="btn-sort"
                    onClick={onToggleSort}
                    title="Toggle alphabetical sort"
                >
                    {sortAlpha ? 'A-Z' : 'Def'}
                </button>
            </div>

            {/* בחירת טאבים: Dropdown קומפקטי במגירה צרה / רצועה רחבה במסך מלא */}
            {effectiveTabs.length > 1 && (
                isDrawerMode ? (
                    <div className="drawer-tabs-dropdown-row">
                        <span className="dropdown-label">TAB:</span>
                        <select
                            className="tab-select-native"
                            value={selectedTabId}
                            onChange={(e) => onSelectTab(e.target.value)}
                        >
                            {effectiveTabs.map(tab => {
                                const tIds = tab.id === 'all' ? allStations.map(s => s.id) : (tab.stationIds || []);
                                const selectedCount = tIds.filter(id => selectedStationIds.includes(id)).length;
                                return (
                                    <option key={tab.id} value={tab.id}>
                                        {tab.name} ({selectedCount}/{tIds.length})
                                    </option>
                                );
                            })}
                        </select>
                        <div className="compact-bulk-btns">
                            <button type="button" className="btn-bulk-text" onClick={onSelectAllInScope}>+All</button>
                            <span className="div">|</span>
                            <button type="button" className="btn-bulk-text clear" onClick={onClearInScope}>Clear</button>
                        </div>
                    </div>
                ) : (
                    <div className="tabs-filter-strip">
                        <div className="tabs-header-row">
                            <span className="strip-label">SYSTEM TABS (FILTER ONLY)</span>
                            {isLoadingTabs && <span className="sync-badge">Syncing...</span>}
                        </div>
                        <div className="tabs-scroll-row">
                            {effectiveTabs.map(tab => {
                                const isTabActive = selectedTabId === tab.id;
                                const tIds = tab.id === 'all' ? allStations.map(s => s.id) : (tab.stationIds || []);
                                const totalCount = tIds.length;
                                const selectedCount = tIds.filter(id => selectedStationIds.includes(id)).length;

                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        className={`btn-tab-filter ${isTabActive ? 'active' : ''}`}
                                        onClick={() => onSelectTab(tab.id)}
                                    >
                                        <span className="tab-name">{tab.name}</span>
                                        <span className={`tab-count-pill ${selectedCount > 0 ? 'has-selected' : ''}`}>
                                            {selectedCount}/{totalCount}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )
            )}

            {/* גלולות הסינון: נפתחות בלחיצה במגירה צרה / מוצגות קבוע במסך מלא */}
            {(!isDrawerMode || isFilterTrayOpen) && (
                <div className={`filter-controls-row ${isDrawerMode ? 'is-collapsed-tray' : ''}`}>
                    <div className="filter-pills-group">
                        <button
                            type="button"
                            className={`filter-pill ${filterMode === 'all' ? 'active' : ''}`}
                            onClick={() => onFilterModeChange('all')}
                        >
                            All ({filteredCount})
                        </button>
                        <button
                            type="button"
                            className={`filter-pill ${filterMode === 'selected' ? 'active' : ''}`}
                            onClick={() => onFilterModeChange('selected')}
                        >
                            Sel ({selectedInTabCount})
                        </button>
                        <button
                            type="button"
                            className={`filter-pill ${filterMode === 'unselected' ? 'active' : ''}`}
                            onClick={() => onFilterModeChange('unselected')}
                        >
                            Unsel ({unselectedInTabCount})
                        </button>
                        <button
                            type="button"
                            className={`filter-pill ${filterMode === 'gaps' ? 'active' : ''}`}
                            onClick={() => onFilterModeChange('gaps')}
                            title="Show stations with gaps"
                        >
                            Gaps ⚠️
                        </button>
                        <button
                            type="button"
                            className={`filter-pill ${filterMode === 'audio' ? 'active' : ''}`}
                            onClick={() => onFilterModeChange('audio')}
                            title="Show stations with audio"
                        >
                            Audio 🔊
                        </button>
                    </div>

                    {!isDrawerMode && (
                        <div className="bulk-actions-group">
                            <button type="button" className="btn-bulk" onClick={onSelectAllInScope}>
                                + Select Tab
                            </button>
                            <span className="divider" />
                            <button type="button" className="btn-bulk clear-btn" onClick={onClearInScope}>
                                ✕ Clear Tab
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}