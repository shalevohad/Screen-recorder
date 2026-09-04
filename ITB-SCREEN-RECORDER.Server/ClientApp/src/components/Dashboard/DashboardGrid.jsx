import { useState, useMemo, useEffect, useRef } from 'react';
import StationThumbnail from '../Station/StationThumbnail';
import './DashboardGrid.scss';

export default function DashboardGrid({
    stations = [],
    actionPending = {},
    onToggleStream,
    onBulkStart,
    onBulkStop,
    direction = 'ltr'
}) {
    const [hideOffline, setHideOffline] = useState(true);
    const [sortAsc, setSortAsc] = useState(true);

    const [isSearchOpen, setIsSearchOpen] = useState(() => {
        const saved = localStorage.getItem('itb_dashboard_search_open');
        return saved !== null ? JSON.parse(saved) : false;
    });

    const [searchQuery, setSearchQuery] = useState(() => {
        return localStorage.getItem('itb_dashboard_search_query') || '';
    });

    useEffect(() => {
        localStorage.setItem('itb_dashboard_search_open', JSON.stringify(isSearchOpen));
    }, [isSearchOpen]);

    useEffect(() => {
        localStorage.setItem('itb_dashboard_search_query', searchQuery);
    }, [searchQuery]);

    const searchInputRef = useRef(null);

    const [globalShowMetrics, setGlobalShowMetrics] = useState(() => {
        const saved = localStorage.getItem('itb_global_show_metrics');
        return saved !== null ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        localStorage.setItem('itb_global_show_metrics', JSON.stringify(globalShowMetrics));
    }, [globalShowMetrics]);

    const [manualZoom, setManualZoom] = useState(() => {
        const savedZoom = localStorage.getItem('itb_dashboard_zoom');
        return savedZoom ? Number(savedZoom) : 3;
    });

    const [isAutoZoom, setIsAutoZoom] = useState(() => {
        const savedAuto = localStorage.getItem('itb_dashboard_auto_zoom');
        return savedAuto !== null ? JSON.parse(savedAuto) : true;
    });

    useEffect(() => {
        localStorage.setItem('itb_dashboard_zoom', manualZoom);
    }, [manualZoom]);

    useEffect(() => {
        localStorage.setItem('itb_dashboard_auto_zoom', JSON.stringify(isAutoZoom));
    }, [isAutoZoom]);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    // 💡 1. חישוב הרשימה המפולטרת המוצגת בפועל
    const processedStations = useMemo(() => {
        let list = [...stations];

        if (hideOffline) {
            list = list.filter(s => s.isOnline || s.status === 1 || s.status === 2 || s.isProcessRunning);
        }

        if (searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase();
            list = list.filter(s =>
                (s.hostname && s.hostname.toLowerCase().includes(q)) ||
                (s.displayName && s.displayName.toLowerCase().includes(q)) ||
                (s.ipAddress && s.ipAddress.includes(q))
            );
        }

        list.sort((a, b) => {
            const nameA = (a.displayName || a.hostname || '').toLowerCase();
            const nameB = (b.displayName || b.hostname || '').toLowerCase();
            const comp = nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: 'base' });
            return sortAsc ? comp : -comp;
        });

        return list;
    }, [stations, hideOffline, searchQuery, sortAsc]);

    // 💡 2. סנכרון תנאי הכפתורים אך ורק מול מה שמוצג בפועל
    const hasVisibleStations = processedStations.length > 0;
    const canSort = processedStations.length > 1;

    const canStartAny = useMemo(() => {
        return processedStations.some(s =>
            (s.isOnline || s.status === 1 || s.status === 2 || s.isProcessRunning) && !s.isStreaming
        );
    }, [processedStations]);

    const canStopAny = useMemo(() => {
        return processedStations.some(s => s.isStreaming);
    }, [processedStations]);

    // 💡 3. הפעלת ה-Bulk רק על העמדות שמוצגות כרגע בפילטר
    const handleFilteredBulkStart = () => {
        if (!canStartAny) return;
        const targetHostnames = processedStations
            .filter(s => (s.isOnline || s.status === 1 || s.status === 2 || s.isProcessRunning) && !s.isStreaming)
            .map(s => s.hostname);

        onBulkStart?.(targetHostnames);
    };

    const handleFilteredBulkStop = () => {
        if (!canStopAny) return;
        const targetHostnames = processedStations
            .filter(s => s.isStreaming)
            .map(s => s.hostname);

        onBulkStop?.(targetHostnames);
    };

    const autoOptimalZoom = useMemo(() => {
        const count = processedStations.length;
        if (count <= 1) return 4;
        if (count <= 2) return 4;
        if (count <= 4) return 3;
        if (count <= 8) return 2;
        return 1;
    }, [processedStations.length]);

    const effectiveZoom = isAutoZoom ? autoOptimalZoom : manualZoom;

    const cardWidthMap = {
        1: '290px',
        2: '360px',
        3: '450px',
        4: '570px',
        5: '700px'
    };

    const handleZoomOut = () => {
        setIsAutoZoom(false);
        setManualZoom(prev => Math.max(prev - 1, 1));
    };

    const handleZoomIn = () => {
        setIsAutoZoom(false);
        setManualZoom(prev => Math.min(prev + 1, 5));
    };

    const handleSliderChange = (e) => {
        setIsAutoZoom(false);
        setManualZoom(Number(e.target.value));
    };

    const handleToggleAutoZoom = () => {
        setIsAutoZoom(prev => !prev);
    };

    const handleToggleSearch = () => {
        setIsSearchOpen(prev => !prev);
    };

    const handleClearFilter = () => {
        setSearchQuery('');
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Escape') {
            handleClearFilter();
        }
    };

    return (
        <div className="dashboard-layout-wrapper" dir={direction}>
            <div className="dashboard-content-container">
                <aside className="dashboard-vertical-dock tactical-c2-dock">
                    <button
                        className={`dock-icon-btn tactical-btn-search ${isSearchOpen ? 'is-engaged' : ''}`}
                        onClick={handleToggleSearch}
                        title={isSearchOpen ? "Hide search drawer" : "Show search drawer (persists across reload)"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="7.5" />
                            <line x1="21" y1="21" x2="16.5" y2="16.5" />
                        </svg>
                    </button>

                    <div className="dock-divider"></div>

                    <button
                        className={`dock-icon-btn tactical-btn-start ${canStartAny ? 'is-actionable' : 'disabled'}`}
                        onClick={canStartAny ? handleFilteredBulkStart : undefined}
                        disabled={!canStartAny}
                        title={canStartAny ? `Start streaming on ${processedStations.filter(s => !s.isStreaming).length} filtered agents` : "No idle filtered agents available"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="6 3 20 12 6 21 6 3" />
                            <line x1="20" y1="4" x2="20" y2="20" strokeWidth="3" />
                            <circle cx="11" cy="12" r="2.2" fill="currentColor" />
                        </svg>
                    </button>

                    <button
                        className={`dock-icon-btn tactical-btn-stop ${canStopAny ? 'is-actionable' : 'disabled'}`}
                        onClick={canStopAny ? handleFilteredBulkStop : undefined}
                        disabled={!canStopAny}
                        title={canStopAny ? `Stop all ${processedStations.filter(s => s.isStreaming).length} active filtered streams` : "No active streams running in filtered view"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                            <line x1="9" y1="9" x2="15" y2="15" strokeWidth="3" />
                            <line x1="15" y1="9" x2="9" y2="15" strokeWidth="3" />
                        </svg>
                    </button>

                    <div className="dock-divider"></div>

                    <button
                        className={`dock-icon-btn tactical-btn-filter ${hideOffline ? 'is-engaged' : ''}`}
                        onClick={() => setHideOffline(p => !p)}
                        title={hideOffline ? "Filter: Active only (Click to show all)" : "Filter: All stations (Click to hide offline)"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="9.5" />
                            <path d="M12 2.5a9.5 9.5 0 0 1 9.5 9.5" strokeWidth="3.2" />
                            <line x1="12" y1="12" x2="18.5" y2="5.5" strokeWidth="2.6" />
                            <circle cx="12" cy="12" r="2.2" fill="currentColor" />
                            {hideOffline && <circle cx="16" cy="8" r="1.8" fill="currentColor" />}
                        </svg>
                    </button>

                    <button
                        className={`dock-icon-btn tactical-btn-sort ${!sortAsc ? 'is-reversed' : ''} ${!canSort ? 'disabled' : ''}`}
                        onClick={canSort ? () => setSortAsc(p => !p) : undefined}
                        disabled={!canSort}
                        title={sortAsc ? "Sort: A to Z" : "Sort: Z to A"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h7M3 12h5M3 18h3" />
                            {sortAsc ? (
                                <>
                                    <path d="M17 18V6" strokeWidth="3" />
                                    <path d="M13 10l4-4 4 4" strokeWidth="2.6" />
                                </>
                            ) : (
                                <>
                                    <path d="M17 6v12" strokeWidth="3" />
                                    <path d="M13 14l4 4 4-4" strokeWidth="2.6" />
                                </>
                            )}
                        </svg>
                    </button>

                    <button
                        className={`dock-icon-btn tactical-btn-sensors ${globalShowMetrics ? 'is-engaged' : ''} ${!hasVisibleStations ? 'disabled' : ''}`}
                        onClick={hasVisibleStations ? () => setGlobalShowMetrics(p => !p) : undefined}
                        disabled={!hasVisibleStations}
                        title={globalShowMetrics ? "Telemetry HUD: Visible" : "Telemetry HUD: Hidden"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2.5" />
                            <path d="M7 16v-4M12 16V8M17 16v-6" strokeWidth="3" />
                            <circle cx="12" cy="8" r="1.2" fill="currentColor" />
                            <circle cx="17" cy="10" r="1.2" fill="currentColor" />
                            <circle cx="7" cy="12" r="1.2" fill="currentColor" />
                        </svg>
                    </button>
                </aside>

                <main className="dashboard-main-area">
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
                                    onKeyDown={handleSearchKeyDown}
                                />
                                {searchQuery && (
                                    <button className="clear-btn" onClick={handleClearFilter} title="Clear filter (ESC)">✕</button>
                                )}
                            </div>

                            <div className="search-actions-group">
                                {searchQuery && (
                                    <button className="reset-filter-link" onClick={handleClearFilter}>
                                        RESET FILTER
                                    </button>
                                )}
                                <div className="search-stats-badge">
                                    SHOWING {processedStations.length} OF {stations.length} AGENTS
                                </div>
                            </div>
                        </div>
                    </div>

                    {processedStations.length === 0 ? (
                        <div className="stations-empty-state-glass">
                            <div className="connection-pulse-container">
                                <div className="pulse-dot-amber"></div>
                                <div className="pulse-ring"></div>
                            </div>
                            <span className="empty-state-text">
                                {searchQuery ? "NO AGENTS MATCH SEARCH QUERY" : "NO AGENTS CONNECTED / FILTERED OUT"}
                            </span>
                            {searchQuery && (
                                <button className="clear-filter-action-btn" onClick={handleClearFilter}>
                                    CLEAR FILTER
                                </button>
                            )}
                        </div>
                    ) : (
                        <div
                            className="stations-grid-wrapper tight-grid"
                            style={{ '--station-card-width': cardWidthMap[effectiveZoom] }}
                        >
                            {processedStations.map((station) => (
                                <div key={station.hostname} className="station-wrapper-cell">
                                    <StationThumbnail
                                        {...station}
                                        isPending={actionPending[station.hostname]}
                                        onToggleStream={() => onToggleStream(station.hostname, station.isStreaming)}
                                        globalShowMetrics={globalShowMetrics}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            <div className="noc-footer-zoom-pill">
                <button
                    className={`zoom-auto-btn ${isAutoZoom ? 'is-active' : ''}`}
                    onClick={handleToggleAutoZoom}
                    title={isAutoZoom ? "Auto zoom active (Matches fleet count)" : "Click to enable Auto Zoom"}
                >
                    AUTO
                </button>
                <div className="zoom-pill-divider"></div>
                <button
                    onClick={handleZoomOut}
                    disabled={effectiveZoom === 1}
                    className="zoom-btn"
                    title="Zoom Out (-)"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
                <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={effectiveZoom}
                    onChange={handleSliderChange}
                    className="zoom-slider"
                />
                <button
                    onClick={handleZoomIn}
                    disabled={effectiveZoom === 5}
                    className="zoom-btn"
                    title="Zoom In (+)"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
                <span className="zoom-level-badge">{effectiveZoom}</span>
            </div>
        </div>
    );
}