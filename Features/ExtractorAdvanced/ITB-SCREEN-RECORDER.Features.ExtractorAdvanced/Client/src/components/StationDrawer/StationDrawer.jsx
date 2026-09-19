// Client/src/components/StationDrawer/StationDrawer.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import StationHubCard from './views/Hub/StationHubCard.jsx';
import StationHubTableRow from './views/Hub/StationHubTableRow.jsx';
import StationDrawerRow from './views/Drawer/StationDrawerRow.jsx';
import StationFilterBar from './controls/StationFilterBar.jsx';
import StationPaginationBar from './controls/StationPaginationBar.jsx';
import SelectedStationsChips from './controls/SelectedStationsChips.jsx';
import { getStationDebriefMeta } from './utils/stationDebriefMetadata.js';
import './StationDrawer.scss';

const DEFAULT_SYSTEM_TABS = Object.freeze([]);
const AUTO_GRID_CAPACITY_LIMIT = 12;

export default function StationDrawer({
    isOpen,
    onToggle,
    onClose,
    allStations = [],
    selectedStationIds = [],
    onToggleStation,
    onUpdateSelections,
    isInitialSetup,
    isLoadingStations = false,
    onApply,
    onOpenRangeModal,
    systemTabs = DEFAULT_SYSTEM_TABS,
    recordingSegments = {}, // מילון מקטעים אמיתי מה-API: { [stationId]: [{ startEpoch, endEpoch }] }
    baseEpochMs = 0,        // נקודת התחלת החלון
    durationMs = 0          // אורך החלון במילישניות
}) {
    const [serverTabs, setServerTabs] = useState([]);
    const [selectedTabId, setSelectedTabId] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortAlpha, setSortAlpha] = useState(true);
    const [filterMode, setFilterMode] = useState('all');
    const [manualViewMode, setManualViewMode] = useState(null);
    const [isLoadingTabs, setIsLoadingTabs] = useState(false);

    const [tablePageSize, setTablePageSize] = useState(10);
    const [gridPageSize, setGridPageSize] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);

    const hasFetchedRef = useRef(false);
    const isEmptyState = allStations.length === 0 && !isLoadingStations;

    let panelClass = 'is-closed';
    if (isInitialSetup || isEmptyState || isLoadingStations) panelClass = 'is-full-width';
    else if (isOpen) panelClass = 'is-open';

    useEffect(() => {
        if (systemTabs && systemTabs.length > 0) {
            setServerTabs(systemTabs);
            return;
        }

        if (hasFetchedRef.current || (!isOpen && !isInitialSetup)) return;
        hasFetchedRef.current = true;
        let isMounted = true;

        const loadTabsFromServer = async () => {
            setIsLoadingTabs(true);
            try {
                const res = await fetch('/api/v1/dashboard/tabs');
                if (res.ok && isMounted) {
                    const data = await res.json();
                    if (Array.isArray(data)) setServerTabs(data);
                }
            } catch (err) {
                console.warn('[StationDrawer] Failed to fetch server tabs:', err);
            } finally {
                if (isMounted) setIsLoadingTabs(false);
            }
        };

        loadTabsFromServer();
        return () => { isMounted = false; };
    }, [isOpen, isInitialSetup, systemTabs]);

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
                            return (item.hostname || item.name || '').trim().toLowerCase() === stHost;
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

        return [{ id: 'all', name: 'ALL', stationIds: allStations.map(s => s.id) }];
    }, [serverTabs, systemTabs, allStations]);

    const activeTab = useMemo(() => {
        return effectiveTabs.find(t => t.id === selectedTabId) || effectiveTabs[0];
    }, [effectiveTabs, selectedTabId]);

    const activeTabStationIds = useMemo(() => {
        if (!activeTab || activeTab.id === 'all') return allStations.map(s => s.id);
        return activeTab.stationIds || [];
    }, [activeTab, allStations]);

    // חישוב מטא-דאטה טהור ומבוסס נתונים עבור כל תחנה
    const stationMetaMap = useMemo(() => {
        const map = new Map();
        const scope = { baseEpochMs, durationMs };

        for (const st of allStations) {
            const segs = recordingSegments[st.id] || st.segments || [];
            map.set(st.id, getStationDebriefMeta(st, segs, scope));
        }
        return map;
    }, [allStations, recordingSegments, baseEpochMs, durationMs]);

    const filteredStations = useMemo(() => {
        return allStations
            .filter(st => {
                if (activeTab.id !== 'all' && !activeTabStationIds.includes(st.id)) return false;
                const matchesSearch = (st.displayName || st.hostname || st.name || '').toLowerCase().includes(searchTerm.toLowerCase());
                if (!matchesSearch) return false;

                const isSelected = selectedStationIds.includes(st.id);
                const meta = stationMetaMap.get(st.id);

                if (filterMode === 'selected') return isSelected;
                if (filterMode === 'unselected') return !isSelected;
                if (filterMode === 'gaps') return meta?.hasGaps;
                if (filterMode === 'audio') return meta?.hasAudio;
                return true;
            })
            .sort((a, b) => sortAlpha ? (a.displayName || a.hostname || '').localeCompare(b.displayName || b.hostname || '') : 0);
    }, [allStations, activeTab, activeTabStationIds, searchTerm, filterMode, selectedStationIds, sortAlpha, stationMetaMap]);

    const effectiveViewMode = useMemo(() => {
        if (manualViewMode !== null) return manualViewMode;
        return filteredStations.length > AUTO_GRID_CAPACITY_LIMIT ? 'table' : 'grid';
    }, [manualViewMode, filteredStations.length]);

    const currentActivePageSize = effectiveViewMode === 'table' ? tablePageSize : gridPageSize;
    const totalPages = Math.max(1, Math.ceil(filteredStations.length / currentActivePageSize));

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedTabId, searchTerm, filterMode, effectiveViewMode]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    const paginatedStations = useMemo(() => {
        if (panelClass !== 'is-full-width') return filteredStations;
        const start = (currentPage - 1) * currentActivePageSize;
        return filteredStations.slice(start, start + currentActivePageSize);
    }, [filteredStations, currentPage, currentActivePageSize, panelClass]);

    const handleSelectAllInScope = () => {
        if (!onUpdateSelections) return;
        const targetIds = activeTab.id === 'all' ? filteredStations.map(s => s.id) : activeTabStationIds;
        onUpdateSelections(Array.from(new Set([...selectedStationIds, ...targetIds])));
    };

    const handleClearInScope = () => {
        if (!onUpdateSelections) return;
        const targetIds = activeTab.id === 'all' ? filteredStations.map(s => s.id) : activeTabStationIds;
        onUpdateSelections(selectedStationIds.filter(id => !targetIds.includes(id)));
    };

    const selectedInTabCount = activeTabStationIds.filter(id => selectedStationIds.includes(id)).length;

    return (
        <div className={`station-drawer-panel ${panelClass}`}>
            {panelClass !== 'is-full-width' && (
                <div className="drawer-header" onClick={() => panelClass === 'is-closed' && onToggle && onToggle()}>
                    <div className="header-title">
                        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <span>Station Pool ({selectedStationIds.length}/{allStations.length})</span>
                    </div>
                    {panelClass === 'is-open' && (
                        <button type="button" className="btn-close" onClick={onClose || onToggle} title="Close Drawer">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    )}
                </div>
            )}

            <div className="drawer-body">
                {isLoadingStations ? (
                    <div className="drawer-loading-state">
                        <div className="tactical-spinner" />
                        <span className="loading-title">ANALYZING RECORDING TIMELINES & CHUNKS...</span>
                        <span className="loading-subtitle">Querying recording server for verified segments</span>
                    </div>
                ) : isEmptyState ? (
                    <div className="empty-state-view">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        <h3>No Recording Sessions Found</h3>
                        <p>No video archives exist for any workstation during the selected mission scope.</p>
                        <button type="button" className="btn-change-time" onClick={onOpenRangeModal}>Change Time Scope</button>
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
                                    Review recording continuity, audio availability, and feed health to select stations for investigation.
                                </p>
                            </div>
                        )}

                        <StationFilterBar
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            sortAlpha={sortAlpha}
                            onToggleSort={() => setSortAlpha(!sortAlpha)}
                            effectiveTabs={effectiveTabs}
                            selectedTabId={selectedTabId}
                            onSelectTab={(id) => {
                                setSelectedTabId(id);
                                setManualViewMode(null);
                            }}
                            isLoadingTabs={isLoadingTabs}
                            allStations={allStations}
                            selectedStationIds={selectedStationIds}
                            filterMode={filterMode}
                            onFilterModeChange={setFilterMode}
                            filteredCount={filteredStations.length}
                            selectedInTabCount={selectedInTabCount}
                            unselectedInTabCount={activeTabStationIds.length - selectedInTabCount}
                            activeTabName={activeTab.name}
                            onSelectAllInScope={handleSelectAllInScope}
                            onClearInScope={handleClearInScope}
                            viewMode={effectiveViewMode}
                            onViewModeChange={panelClass === 'is-full-width' ? setManualViewMode : null}
                            isDrawerMode={panelClass !== 'is-full-width'}
                        />

                        {panelClass === 'is-full-width' && effectiveViewMode === 'table' && (
                            <div className="hub-table-header-row">
                                <div className="header-col col-check">SEL</div>
                                <div className="header-col col-name">WORKSTATION IDENTITY</div>
                                <div className="header-col col-audio">AUDIO</div>
                                <div className="header-col col-coverage">RECORDED SCOPE</div>
                                <div className="header-col col-gaps-bar">TIMELINE CONTINUITY & GAPS</div>
                                <div className="header-col col-specs">FEED SPEC</div>
                                <div className="header-col col-size">ARCHIVE</div>
                            </div>
                        )}

                        <div className={`station-list ${panelClass === 'is-full-width' ? (effectiveViewMode === 'grid' ? 'initial-cards-grid' : 'initial-dense-table') : ''}`}>
                            {paginatedStations.map(st => {
                                const isSelected = selectedStationIds.includes(st.id);
                                const meta = stationMetaMap.get(st.id);

                                if (panelClass === 'is-full-width') {
                                    return effectiveViewMode === 'grid' ? (
                                        <StationHubCard
                                            key={st.id}
                                            station={st}
                                            isSelected={isSelected}
                                            onToggle={onToggleStation}
                                            meta={meta}
                                        />
                                    ) : (
                                        <StationHubTableRow
                                            key={st.id}
                                            station={st}
                                            isSelected={isSelected}
                                            onToggle={onToggleStation}
                                            meta={meta}
                                        />
                                    );
                                }

                                return (
                                    <StationDrawerRow
                                        key={st.id}
                                        station={st}
                                        isSelected={isSelected}
                                        onToggle={onToggleStation}
                                        meta={meta}
                                    />
                                );
                            })}
                        </div>

                        {panelClass === 'is-full-width' && (
                            <StationPaginationBar
                                currentPage={currentPage}
                                totalPages={totalPages}
                                pageSize={currentActivePageSize}
                                totalItems={filteredStations.length}
                                onPageChange={setCurrentPage}
                                onPageSizeChange={(size) => {
                                    if (effectiveViewMode === 'table') setTablePageSize(size);
                                    else setGridPageSize(size);
                                    setCurrentPage(1);
                                }}
                                viewMode={effectiveViewMode}
                            />
                        )}

                        {panelClass === 'is-full-width' && (
                            <div className="hub-footer-action-bar">
                                <SelectedStationsChips
                                    selectedStationIds={selectedStationIds}
                                    allStations={allStations}
                                    onToggleStation={onToggleStation}
                                    onClearAll={() => onUpdateSelections && onUpdateSelections([])}
                                    maxVisible={3}
                                />

                                <button
                                    type="button"
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