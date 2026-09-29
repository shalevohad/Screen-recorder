// Client/src/components/StationDrawer/StationDrawer.jsx
import React, { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';
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
    isLoadingSegments = false,
    onApply,
    onOpenRangeModal,
    systemTabs = DEFAULT_SYSTEM_TABS,
    recordingSegments = {},
    baseEpochMs = 0,
    durationMs = 0
}) {
    const [serverTabs, setServerTabs] = useState([]);
    const [selectedTabId, setSelectedTabId] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortAlpha, setSortAlpha] = useState(true);
    const [filterMode, setFilterMode] = useState('all');
    const [manualViewMode, setManualViewMode] = useState(null);
    const [isLoadingTabs, setIsLoadingTabs] = useState(false);

    const [tablePageSize, setTablePageSize] = useState(15);
    const [gridPageSize, setGridPageSize] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);

    const hasFetchedRef = useRef(false);
    const listContainerRef = useRef(null); // 💡 Ref למדידת גובה הרשימה ב-DOM

    const isInitialDiscovery = isLoadingStations && allStations.length === 0;
    const isEmptyState = allStations.length === 0 && !isLoadingStations;

    let panelClass = 'is-closed';
    if (isInitialSetup || isEmptyState || isInitialDiscovery) panelClass = 'is-full-width';
    else if (isOpen) panelClass = 'is-open';

    // 💡 בחירת גודל עמוד אך ורק מתוך קטגוריות תקניות (ללא מספרים שרירותיים וללא סקרול)
    useLayoutEffect(() => {
        const calculateOptimalPageSize = () => {
            if (!listContainerRef.current) return;
            const containerHeight = listContainerRef.current.clientHeight;
            if (containerHeight <= 0) return;

            const firstRow = listContainerRef.current.querySelector('.station-row, .hub-table-row');
            const rowHeight = firstRow ? firstRow.offsetHeight : 40;

            if (rowHeight > 0) {
                // חישוב מספר השורות המקסימלי שנכנס ללא חריגה
                const calculatedRows = Math.floor(containerHeight / rowHeight) - 2;

                // קטגוריות הגדלים המותרות לבחירה
                const standardCategories = [5, 10, 15, 20, 25, 30];

                // מציאת הקטגוריה הגדולה ביותר שלא עוברת את מספר השורות המקסימלי
                const optimalSize = standardCategories
                    .filter(cat => cat <= calculatedRows)
                    .pop() || 5; // ברירת מחדל אם המסך קטן מדי

                setTablePageSize(optimalSize);
            }
        };

        calculateOptimalPageSize();
        window.addEventListener('resize', calculateOptimalPageSize);

        const observer = new ResizeObserver(calculateOptimalPageSize);
        if (listContainerRef.current) {
            observer.observe(listContainerRef.current);
        }

        return () => {
            window.removeEventListener('resize', calculateOptimalPageSize);
            observer.disconnect();
        };
    }, [manualViewMode, allStations.length]);

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

    const loadedStationsCount = useMemo(() => {
        if (!recordingSegments || Object.keys(recordingSegments).length === 0) {
            return allStations.filter(s => s.isLoaded || (s.segments && s.segments.length > 0)).length;
        }
        return allStations.filter(s => (recordingSegments[s.id] !== undefined) || s.isLoaded).length;
    }, [allStations, recordingSegments]);

    const isSegmentsSyncing = useMemo(() => {
        if (isLoadingSegments) return true;
        if (isLoadingStations && allStations.length > 0) return true;
        if (allStations.length > 0 && loadedStationsCount < allStations.length && Object.keys(recordingSegments).length > 0) return true;
        return false;
    }, [isLoadingSegments, isLoadingStations, allStations.length, loadedStationsCount, recordingSegments]);

    const stationMetaMap = useMemo(() => {
        const map = new Map();
        const scope = { baseEpochMs, durationMs };

        for (const st of allStations) {
            const hasLoadedSegments = (recordingSegments && recordingSegments[st.id] !== undefined) ||
                st.isLoaded === true ||
                (st.segments && st.segments.length > 0);

            const isStationLoading = !hasLoadedSegments && (isSegmentsSyncing || isLoadingStations || isLoadingSegments);
            const segs = (recordingSegments && recordingSegments[st.id]) || st.segments || [];
            const meta = getStationDebriefMeta(st, segs, scope);

            map.set(st.id, {
                ...meta,
                hasAudio: st.hasAudio !== undefined ? st.hasAudio : meta?.hasAudio,
                audioLabel: st.audioLabel || (st.hasAudio ? 'AAC' : (meta?.audioLabel || 'NONE')),
                audioChannels: st.audioChannels ? (st.audioChannels === 1 ? 'Mono' : 'Stereo') : meta?.audioChannels,
                feedSpec: st.feedSpec || meta?.feedSpec || `${st.resolution || '1080p'} • ${st.fps || 30}fps`,
                resolution: st.resolution || meta?.resolution || '1080p',
                fps: st.fps || meta?.fps || 30,
                isLoading: isStationLoading
            });
        }
        return map;
    }, [allStations, recordingSegments, baseEpochMs, durationMs, isSegmentsSyncing, isLoadingStations, isLoadingSegments]);

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
        const targetIds = activeTab.id === 'all'
            ? filteredStations.map(s => s.id)
            : activeTabStationIds;
        onUpdateSelections(Array.from(new Set([...selectedStationIds, ...targetIds])));
    };

    const handleClearInScope = () => {
        if (!onUpdateSelections) return;
        const targetIds = new Set(
            activeTab.id === 'all'
                ? filteredStations.map(s => s.id)
                : activeTabStationIds
        );
        onUpdateSelections(selectedStationIds.filter(id => !targetIds.has(id)));
    };

    const selectedInTabCount = activeTabStationIds.filter(id => selectedStationIds.includes(id)).length;
    const filteredSelectedCount = filteredStations.filter(st => selectedStationIds.includes(st.id)).length;

    return (
        <div className={`station-drawer-panel ${panelClass}`}>
            {panelClass !== 'is-full-width' && (
                <>
                    <div className="drawer-header" onClick={() => panelClass === 'is-closed' && onToggle && onToggle()}>
                        <div className="header-title">
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <span>
                                Station Pool ({selectedStationIds.length}/{allStations.length})
                                {isSegmentsSyncing && <span className="sync-badge-inline"> • Syncing {loadedStationsCount}/{allStations.length}</span>}
                            </span>
                        </div>
                        {panelClass === 'is-open' && (
                            <button type="button" className="btn-close" onClick={onClose || onToggle} title="Close Drawer">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {panelClass === 'is-open' && (
                        <div className="drawer-quick-actions-bar">
                            <button
                                type="button"
                                className="btn-quick-action select-all"
                                onClick={handleSelectAllInScope}
                                disabled={filteredStations.length === 0}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Select All ({filteredStations.length})</span>
                            </button>
                            <span className="action-sep">•</span>
                            <button
                                type="button"
                                className="btn-quick-action clear"
                                onClick={handleClearInScope}
                                disabled={filteredSelectedCount === 0}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                                <span>Clear ({filteredSelectedCount})</span>
                            </button>
                        </div>
                    )}

                    {isSegmentsSyncing && (
                        <div className="drawer-thin-progress-bar">
                            <div
                                className="drawer-thin-progress-fill"
                                style={{ width: `${allStations.length > 0 ? (loadedStationsCount / allStations.length) * 100 : 0}%` }}
                            />
                        </div>
                    )}
                </>
            )}

            <div className="drawer-body">
                {isInitialDiscovery ? (
                    <div className="drawer-loading-state">
                        <div className="tactical-spinner" />
                        <span className="loading-title">DISCOVERING RECORDING STATIONS...</span>
                        <span className="loading-subtitle">Scanning storage directories and catalog database</span>
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

                        {panelClass === 'is-full-width' && allStations.length > 0 && (
                            <div className={`hub-sync-banner ${isSegmentsSyncing ? 'is-syncing' : 'is-synced'}`}>
                                <div className="sync-info">
                                    <div className="sync-icon-wrap">
                                        {isSegmentsSyncing ? (
                                            <div className="mini-tactical-spinner" />
                                        ) : (
                                            <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="sync-text-group">
                                        <span className="sync-title">
                                            {isSegmentsSyncing
                                                ? `ANALYZING TIMELINE ARCHIVES • ${loadedStationsCount} OF ${allStations.length} STATIONS SYNCED (${Math.min(100, Math.round((loadedStationsCount / allStations.length) * 100))}%)`
                                                : `ALL WORKSTATION ARCHIVES SYNCED • ${allStations.length} STATIONS READY`}
                                        </span>
                                        <span className="sync-subtitle">
                                            {isSegmentsSyncing
                                                ? 'Scanning verified recording chunks in background. You can select stations and begin immediately.'
                                                : 'Continuity analysis and feed specifications are verified and up-to-date.'}
                                        </span>
                                    </div>
                                </div>
                                <div className="sync-progress-bar-wrap">
                                    <div
                                        className="sync-progress-bar-fill"
                                        style={{
                                            width: `${allStations.length > 0 ? Math.min(100, Math.round((loadedStationsCount / allStations.length) * 100)) : 0}%`
                                        }}
                                    />
                                </div>
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

                        {panelClass === 'is-full-width' && (
                            <div className="hub-bulk-actions-bar">
                                <div className="bulk-actions-left">
                                    <button
                                        type="button"
                                        className="btn-bulk-action select-all"
                                        onClick={handleSelectAllInScope}
                                        disabled={filteredStations.length === 0}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        <span>SELECT ALL IN VIEW ({filteredStations.length})</span>
                                    </button>

                                    <button
                                        type="button"
                                        className="btn-bulk-action clear"
                                        onClick={handleClearInScope}
                                        disabled={filteredSelectedCount === 0}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                        <span>CLEAR SELECTION ({filteredSelectedCount})</span>
                                    </button>
                                </div>

                                <div className="bulk-actions-right">
                                    <span className="bulk-stats-label">
                                        Active Selection: <strong>{selectedStationIds.length}</strong> / {allStations.length} Stations
                                    </span>
                                </div>
                            </div>
                        )}

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

                        {/* 💡 חיבור ה-Ref כאן כדי למדוד את גובה ה-DOM בזמן אמת */}
                        <div
                            ref={listContainerRef}
                            className={`station-list ${panelClass === 'is-full-width' ? (effectiveViewMode === 'grid' ? 'initial-cards-grid' : 'initial-dense-table') : ''}`}
                        >
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