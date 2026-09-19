// Client/src/components/StationDrawer/StationDrawer.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import './StationDrawer.scss';

// אובייקט קבוע מחוץ לקומפוננטה למניעת יצירת מערכים חדשים בזיכרון בכל רינדור
const DEFAULT_SYSTEM_TABS = Object.freeze([]);

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
    onOpenRangeModal,
    systemTabs = DEFAULT_SYSTEM_TABS
}) {
    const [serverTabs, setServerTabs] = useState([]);
    const [selectedTabId, setSelectedTabId] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortAlpha, setSortAlpha] = useState(true);
    const [filterMode, setFilterMode] = useState('all'); // 'all' | 'selected' | 'unselected'
    const [isLoadingTabs, setIsLoadingTabs] = useState(false);

    // מניעת קריאות רשת חוזרות בלולאה
    const hasFetchedRef = useRef(false);

    const isEmptyState = allStations.length === 0;

    let panelClass = 'is-closed';
    if (isInitialSetup || isEmptyState) panelClass = 'is-full-width';
    else if (isOpen) panelClass = 'is-open';

    // 1. טעינה מבוקרת חד-פעמית מ-DashboardController
    useEffect(() => {
        // אם מועברים טאבים ישירות כ-Props, נשתמש בהם מיד
        if (systemTabs && systemTabs.length > 0) {
            setServerTabs(systemTabs);
            return;
        }

        // הגנה הרמטית: מניעת הרצת fetch יותר מפעם אחת
        if (hasFetchedRef.current) return;
        if (!isOpen && !isInitialSetup) return;

        hasFetchedRef.current = true;
        let isMounted = true;

        const loadTabsFromServer = async () => {
            setIsLoadingTabs(true);
            try {
                const res = await fetch('/api/v1/dashboard/tabs');
                if (res.ok && isMounted) {
                    const data = await res.json();
                    if (Array.isArray(data)) {
                        setServerTabs(data);
                    }
                }
            } catch (err) {
                console.warn('[StationDrawer] Failed to fetch tabs:', err);
            } finally {
                if (isMounted) {
                    setIsLoadingTabs(false);
                }
            }
        };

        loadTabsFromServer();

        return () => {
            isMounted = false;
        };
    }, [isOpen, isInitialSetup, systemTabs]);

    // 2. נרמול הטאבים ושיוך העמדות לפי hostname
    const effectiveTabs = useMemo(() => {
        const rawTabs = serverTabs.length > 0 ? serverTabs : systemTabs;

        if (rawTabs && rawTabs.length > 0) {
            const normalized = rawTabs.map(tab => {
                const assignedList = tab.hostnames || tab.assignedHostnames || tab.stations || tab.stationIds || [];

                const matchedStationIds = allStations
                    .filter(st => {
                        const stHost = (st.hostname || st.name || '').trim().toLowerCase();
                        return assignedList.some(item => {
                            if (typeof item === 'string') {
                                return item.trim().toLowerCase() === stHost || stHost.includes(item.trim().toLowerCase());
                            }
                            const itemHost = (item.hostname || item.name || '').trim().toLowerCase();
                            return itemHost === stHost;
                        });
                    })
                    .map(st => st.id);

                return {
                    id: String(tab.id || tab.tabId || tab.name),
                    name: tab.name || 'Tab',
                    stationIds: matchedStationIds
                };
            });

            return [
                { id: 'all', name: 'ALL', stationIds: allStations.map(s => s.id) },
                ...normalized.filter(t => t.id.toLowerCase() !== 'all')
            ];
        }

        // חלוקה לוגית במידה ולא הוגדרו טאבים בשרת
        const groups = {};
        allStations.forEach(st => {
            const name = st.hostname || st.name || '';
            let groupName = 'Operators';
            if (name.includes('Watchtower') || name.includes('East')) groupName = 'Watchtowers';
            else if (name.includes('Radar') || name.includes('Secondary')) groupName = 'Radar Units';
            else if (name.includes('Gate') || name.includes('CCTV') || name.includes('North')) groupName = 'Perimeter';

            if (!groups[groupName]) groups[groupName] = [];
            groups[groupName].push(st.id);
        });

        return [
            { id: 'all', name: 'ALL', stationIds: allStations.map(s => s.id) },
            ...Object.entries(groups).map(([groupName, ids]) => ({
                id: groupName.toLowerCase().replace(/\s+/g, '-'),
                name: groupName,
                stationIds: ids
            }))
        ];
    }, [serverTabs, systemTabs, allStations]);

    // הטאב הפעיל כרגע בסינון
    const activeTab = useMemo(() => {
        return effectiveTabs.find(t => t.id === selectedTabId) || effectiveTabs[0];
    }, [effectiveTabs, selectedTabId]);

    const activeTabStationIds = useMemo(() => {
        if (!activeTab || activeTab.id === 'all') {
            return allStations.map(s => s.id);
        }
        return activeTab.stationIds || [];
    }, [activeTab, allStations]);

    // סינון תחנות מקומי
    const filteredStations = useMemo(() => {
        return allStations
            .filter(st => {
                if (activeTab.id !== 'all' && !activeTabStationIds.includes(st.id)) {
                    return false;
                }

                const matchesSearch = (st.hostname || st.name || '').toLowerCase().includes(searchTerm.toLowerCase());
                if (!matchesSearch) return false;

                const isSelected = selectedStationIds.includes(st.id);
                if (filterMode === 'selected') return isSelected;
                if (filterMode === 'unselected') return !isSelected;
                return true;
            })
            .sort((a, b) => sortAlpha ? (a.hostname || a.name || '').localeCompare(b.hostname || b.name || '') : 0);
    }, [allStations, activeTab, activeTabStationIds, searchTerm, filterMode, selectedStationIds, sortAlpha]);

    // הוספת עמדות הטאב המסונן בלבד
    const handleSelectAllInScope = () => {
        if (!onUpdateSelections) return;
        const targetIds = activeTab.id === 'all'
            ? filteredStations.map(s => s.id)
            : activeTabStationIds;

        const merged = Array.from(new Set([...selectedStationIds, ...targetIds]));
        onUpdateSelections(merged);
    };

    // הסרת עמדות הטאב המסונן בלבד
    const handleClearInScope = () => {
        if (!onUpdateSelections) return;
        const targetIds = activeTab.id === 'all'
            ? filteredStations.map(s => s.id)
            : activeTabStationIds;

        const remaining = selectedStationIds.filter(id => !targetIds.includes(id));
        onUpdateSelections(remaining);
    };

    const handleHeaderClick = () => {
        if (panelClass === 'is-closed' && onToggle) onToggle();
    };

    const selectedInTabCount = activeTabStationIds.filter(id => selectedStationIds.includes(id)).length;

    return (
        <div className={`station-drawer-panel ${panelClass}`}>
            {panelClass !== 'is-full-width' && (
                <div className="drawer-header" onClick={handleHeaderClick}>
                    <div className="header-title">
                        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <span>Station Pool ({selectedStationIds.length}/{allStations.length})</span>
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
            )}

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
                    <div className={panelClass === 'is-full-width' ? 'initial-setup-hub-wrapper' : 'standard-drawer-content'}>
                        {panelClass === 'is-full-width' && (
                            <div className="hub-hero-header">
                                <div className="hero-title-group">
                                    <svg className="hero-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                        <line x1="8" y1="21" x2="16" y2="21" />
                                        <line x1="12" y1="17" x2="12" y2="21" />
                                    </svg>
                                    <h2 className="hero-title">WORKSPACE INITIALIZATION</h2>
                                </div>
                                <p className="hero-subtitle">
                                    Select workstations to synchronize and monitor across the tactical timeline.
                                </p>
                            </div>
                        )}

                        <div className="search-and-actions">
                            <div className="search-bar">
                                <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search in stations..."
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

                            {/* רצועת הטאבים לסינון בלבד */}
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
                                                className={`btn-tab-filter ${isTabActive ? 'active' : ''}`}
                                                onClick={() => setSelectedTabId(tab.id)}
                                                title={`Filter by "${tab.name}"`}
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

                            {/* שורת פעולות מהירות */}
                            <div className="filter-controls-row">
                                <div className="filter-pills-group">
                                    <button
                                        className={`filter-pill ${filterMode === 'all' ? 'active' : ''}`}
                                        onClick={() => setFilterMode('all')}
                                    >
                                        All ({filteredStations.length})
                                    </button>
                                    <button
                                        className={`filter-pill ${filterMode === 'selected' ? 'active' : ''}`}
                                        onClick={() => setFilterMode('selected')}
                                    >
                                        Sel ({selectedInTabCount})
                                    </button>
                                    <button
                                        className={`filter-pill ${filterMode === 'unselected' ? 'active' : ''}`}
                                        onClick={() => setFilterMode('unselected')}
                                    >
                                        Unsel ({activeTabStationIds.length - selectedInTabCount})
                                    </button>
                                </div>

                                <div className="bulk-actions-group">
                                    <button
                                        className="btn-bulk"
                                        onClick={handleSelectAllInScope}
                                        title={`Add all stations from "${activeTab.name}" to workspace`}
                                    >
                                        + Select Tab
                                    </button>
                                    <span className="divider" />
                                    <button
                                        className="btn-bulk clear-btn"
                                        onClick={handleClearInScope}
                                        title={`Deselect stations belonging to "${activeTab.name}"`}
                                    >
                                        ✕ Clear Tab
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* רשימת הכרטיסיות */}
                        <div className={`station-list ${panelClass === 'is-full-width' ? 'initial-cards-grid' : ''}`}>
                            {filteredStations.map(st => {
                                const isSelected = selectedStationIds.includes(st.id);
                                const hostNameStr = st.hostname || st.name || '';
                                const isLive = !hostNameStr.includes('Offline');

                                if (panelClass === 'is-full-width') {
                                    return (
                                        <div
                                            key={st.id}
                                            onClick={() => onToggleStation(st.id)}
                                            className={`hub-station-card ${isSelected ? 'is-selected' : ''}`}
                                        >
                                            <div className="card-top">
                                                <div className="monitor-icon-wrap">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                                        <line x1="8" y1="21" x2="16" y2="21" />
                                                        <line x1="12" y1="17" x2="12" y2="21" />
                                                    </svg>
                                                </div>
                                                <span className={`status-indicator-badge ${isLive ? 'online' : 'offline'}`}>
                                                    <span className="dot" />
                                                    {isLive ? 'ONLINE' : 'IDLE'}
                                                </span>
                                            </div>

                                            <div className="card-info">
                                                <span className="station-card-title">{hostNameStr}</span>
                                                <span className="station-card-desc">Workstation Agent • Ready</span>
                                            </div>

                                            <div className="card-bottom-action">
                                                <div className={`custom-checkbox-pill ${isSelected ? 'checked' : ''}`}>
                                                    {isSelected ? '✓ SELECTED' : '+ ADD TO WORKSPACE'}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

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
                                            <span className="hostname" title={hostNameStr}>{hostNameStr}</span>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>

                        {panelClass === 'is-full-width' && (
                            <div className="hub-footer-action-bar">
                                <button
                                    className="btn-start-hero"
                                    disabled={selectedStationIds.length === 0}
                                    onClick={onApply}
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                    <span>
                                        {selectedStationIds.length === 0
                                            ? 'SELECT AT LEAST ONE STATION'
                                            : `START WORKSPACE (${selectedStationIds.length} SELECTED)`}
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}