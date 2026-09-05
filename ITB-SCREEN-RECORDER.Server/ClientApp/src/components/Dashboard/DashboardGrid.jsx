import { useState, useMemo, useEffect, useRef } from 'react';
import StationThumbnail from '../Station/StationThumbnail';
import StationInspectorDrawer from '../Station/StationInspectorDrawer';
import FullscreenModal from '../Station/FullscreenModal';
import './DashboardGrid.scss';

// זיהוי עמדה תקולה: אך ורק עמדות Online פעילות שסובלות מנפילת פריימים
const isStationFaulty = (s) => (s.isOnline || s.status === 1 || s.status === 2) && (s.droppedFrames || 0) > 5;

export default function DashboardGrid({
    stations = [],
    actionPending = {},
    onToggleStream,
    onBulkStart,
    onBulkStop,
    onQuickBookmark,
    onQuickPlayback,
    onQuickExport,
    direction = 'ltr',
    hideOffline = true,
    onToggleHideOffline,
    isFaultFilterActive = false,
    onExitFaultFilter
}) {
    const [sortAsc, setSortAsc] = useState(true);

    // שמירת ה-hostname בלבד מונעת סנכרון כפול ו-cascading renders
    const [inspectedHostname, setInspectedHostname] = useState(null);
    const [fullscreenHostname, setFullscreenHostname] = useState(null);

    const inspectedStation = useMemo(() => {
        return stations.find(s => s.hostname === inspectedHostname) || null;
    }, [stations, inspectedHostname]);

    const fullscreenStation = useMemo(() => {
        return stations.find(s => s.hostname === fullscreenHostname) || null;
    }, [stations, fullscreenHostname]);

    const [viewMode, setViewMode] = useState(() => {
        return localStorage.getItem('itb_dashboard_view_mode') || 'grid';
    });

    useEffect(() => {
        localStorage.setItem('itb_dashboard_view_mode', viewMode);
    }, [viewMode]);

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

    const faultyStationsCount = useMemo(() => {
        return stations.filter(isStationFaulty).length;
    }, [stations]);

    useEffect(() => {
        if (isFaultFilterActive && faultyStationsCount === 0) {
            onExitFaultFilter?.();
        }
    }, [isFaultFilterActive, faultyStationsCount, onExitFaultFilter]);

    const processedStations = useMemo(() => {
        let list = [...stations];

        if (isFaultFilterActive) {
            list = list.filter(isStationFaulty);
        } else if (hideOffline) {
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
    }, [stations, isFaultFilterActive, hideOffline, searchQuery, sortAsc]);

    const canSort = processedStations.length > 1;

    const canStartAny = useMemo(() => {
        return processedStations.some(s =>
            (s.isOnline || s.status === 1 || s.status === 2 || s.isProcessRunning) && !s.isStreaming
        );
    }, [processedStations]);

    const canStopAny = useMemo(() => {
        return processedStations.some(s => s.isStreaming);
    }, [processedStations]);

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

    const handleClearFilter = () => {
        setSearchQuery('');
        if (searchInputRef.current) searchInputRef.current.focus();
    };

    const serverHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    const webrtcPort = import.meta.env?.VITE_WEBRTC_PORT || '8889';
    const dynamicWebrtcBaseUrl = `http://${serverHost}:${webrtcPort}`;

    return (
        <div className="dashboard-layout-wrapper" dir={direction}>
            <div className="dashboard-content-container">
                <aside className="dashboard-vertical-dock tactical-c2-dock">
                    <button
                        className={`dock-icon-btn tactical-btn-search ${isSearchOpen ? 'is-engaged' : ''}`}
                        onClick={() => setIsSearchOpen(p => !p)}
                        title={isSearchOpen ? "Hide search shelf" : "Show search shelf"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                            <circle cx="11" cy="11" r="7.5" />
                            <line x1="21" y1="21" x2="16.5" y2="16.5" />
                        </svg>
                    </button>

                    <button
                        className={`dock-icon-btn tactical-btn-viewmode ${viewMode === 'dense' ? 'is-engaged' : ''}`}
                        onClick={() => setViewMode(v => v === 'grid' ? 'dense' : 'grid')}
                        title={viewMode === 'grid' ? "Switch to Dense List View" : "Switch to Visual Grid View"}
                    >
                        {viewMode === 'grid' ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                                <line x1="4" y1="6" x2="20" y2="6" />
                                <line x1="4" y1="12" x2="20" y2="12" />
                                <line x1="4" y1="18" x2="20" y2="18" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                                <rect x="3" y="3" width="7" height="7" rx="1" />
                                <rect x="14" y="3" width="7" height="7" rx="1" />
                                <rect x="14" y="14" width="7" height="7" rx="1" />
                                <rect x="3" y="14" width="7" height="7" rx="1" />
                            </svg>
                        )}
                    </button>

                    <div className="dock-divider"></div>

                    <button
                        className={`dock-icon-btn tactical-btn-start ${canStartAny ? 'is-actionable' : 'disabled'}`}
                        onClick={canStartAny ? handleFilteredBulkStart : undefined}
                        disabled={!canStartAny}
                        title={canStartAny ? `Start streaming on filtered agents` : "No idle filtered agents"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                            <polygon points="6 3 20 12 6 21 6 3" />
                            <line x1="20" y1="4" x2="20" y2="20" strokeWidth="3" />
                            <circle cx="11" cy="12" r="2.2" fill="currentColor" />
                        </svg>
                    </button>

                    <button
                        className={`dock-icon-btn tactical-btn-stop ${canStopAny ? 'is-actionable' : 'disabled'}`}
                        onClick={canStopAny ? handleFilteredBulkStop : undefined}
                        disabled={!canStopAny}
                        title={canStopAny ? `Stop active filtered streams` : "No active streams"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                            <line x1="9" y1="9" x2="15" y2="15" strokeWidth="3" />
                            <line x1="15" y1="9" x2="9" y2="15" strokeWidth="3" />
                        </svg>
                    </button>

                    <div className="dock-divider"></div>

                    <button
                        className={`dock-icon-btn tactical-btn-filter ${hideOffline ? 'is-engaged' : ''}`}
                        onClick={onToggleHideOffline}
                        title={hideOffline ? "Filter: Active only" : "Filter: All stations"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
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
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
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
                </aside>

                <main className="dashboard-main-area">
                    {isFaultFilterActive && (
                        <div className="tactical-fault-isolation-banner">
                            <div className="isolation-info">
                                <span className="pulse-alert-dot" />
                                <span className="isolation-title">FAULT ISOLATION MODE</span>
                                <span className="isolation-desc">
                                    Displaying {processedStations.length} station{processedStations.length === 1 ? '' : 's'} with critical issues. Automatically reverts once resolved.
                                </span>
                            </div>
                            <button
                                type="button"
                                className="btn-exit-isolation"
                                onClick={onExitFaultFilter}
                                title="Exit fault isolation mode"
                            >
                                ✕ Exit Filter
                            </button>
                        </div>
                    )}

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
                                {isFaultFilterActive
                                    ? "ALL AGENTS HEALTH NOMINAL"
                                    : searchQuery
                                        ? "NO AGENTS MATCH SEARCH QUERY"
                                        : "NO AGENTS CONNECTED / FILTERED OUT"}
                            </span>
                            {searchQuery && (
                                <button className="clear-filter-action-btn" onClick={handleClearFilter}>
                                    CLEAR FILTER
                                </button>
                            )}
                        </div>
                    ) : viewMode === 'grid' ? (
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
                                        onSelectStation={() => setInspectedHostname(station.hostname)}
                                        onOpenFullscreen={() => setFullscreenHostname(station.hostname)}
                                        onQuickBookmark={onQuickBookmark}
                                        onQuickPlayback={onQuickPlayback}
                                        onQuickExport={onQuickExport}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="stations-dense-container">
                            <table className="stations-dense-table">
                                <thead>
                                    <tr>
                                        <th>STATUS</th>
                                        <th>HOSTNAME</th>
                                        <th>IP ADDRESS</th>
                                        <th>STREAM</th>
                                        <th>FPS / DROPS</th>
                                        <th>HOST CPU</th>
                                        <th>QUICK ACTIONS</th>
                                        <th>INSPECT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {processedStations.map((s) => {
                                        const isRec = s.isStreaming;
                                        const hasDrops = s.droppedFrames > 0;
                                        return (
                                            <tr
                                                key={s.hostname}
                                                className={`dense-row ${!s.isOnline ? 'is-offline' : ''} ${hasDrops ? 'has-crit' : ''}`}
                                                onClick={() => setInspectedHostname(s.hostname)}
                                                onDoubleClick={() => setFullscreenHostname(s.hostname)}
                                                title="Click to inspect, double-click for Fullscreen"
                                            >
                                                <td>
                                                    <span className={`dense-beacon ${s.isOnline ? 'online' : 'offline'}`} />
                                                </td>
                                                <td className="dense-hostname">{s.hostname}</td>
                                                <td className="dense-ip">{s.ipAddress || 'N/A'}</td>
                                                <td>
                                                    {isRec ? (
                                                        <span className="dense-badge rec">REC</span>
                                                    ) : (
                                                        <span className="dense-badge idle">IDLE</span>
                                                    )}
                                                </td>
                                                <td className="dense-metric">
                                                    {s.actualFps || 0} FPS
                                                    {hasDrops && <span className="dense-drop-tag">({s.droppedFrames} D)</span>}
                                                </td>
                                                <td className="dense-metric">{s.hostCpuPct || 0}%</td>
                                                <td className="dense-actions-cell" onClick={(e) => e.stopPropagation()}>
                                                    <button
                                                        className={`dense-act-btn ${isRec ? 'stop' : 'start'}`}
                                                        onClick={() => onToggleStream(s.hostname, isRec)}
                                                    >
                                                        {isRec ? 'STOP' : 'START'}
                                                    </button>
                                                    <button
                                                        className="dense-act-btn full"
                                                        onClick={() => setFullscreenHostname(s.hostname)}
                                                        title="Open Station in Fullscreen View"
                                                    >
                                                        FULL
                                                    </button>
                                                    <button
                                                        className="dense-act-btn icon"
                                                        onClick={() => onQuickBookmark?.(s.hostname)}
                                                        title="Bookmark"
                                                    >
                                                        BM
                                                    </button>
                                                    <button
                                                        className="dense-act-btn icon"
                                                        onClick={() => onQuickPlayback?.(s.hostname)}
                                                        title="Playback"
                                                    >
                                                        PLAY
                                                    </button>
                                                </td>
                                                <td className="dense-inspect-cell">
                                                    <button
                                                        className="dense-inspect-btn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setInspectedHostname(s.hostname);
                                                        }}
                                                    >
                                                        INSPECT ↗
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>

            {viewMode === 'grid' && (
                <div className="noc-footer-zoom-pill">
                    <button
                        className={`zoom-auto-btn ${isAutoZoom ? 'is-active' : ''}`}
                        onClick={() => setIsAutoZoom(p => !p)}
                        title={isAutoZoom ? "Auto zoom active" : "Enable Auto Zoom"}
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
            )}

            <StationInspectorDrawer
                station={inspectedStation}
                onClose={() => setInspectedHostname(null)}
                onToggleStream={onToggleStream}
                onQuickBookmark={onQuickBookmark}
                onQuickPlayback={onQuickPlayback}
                onQuickExport={onQuickExport}
                onToggleFullscreen={() => {
                    setFullscreenHostname(inspectedHostname);
                    setInspectedHostname(null);
                }}
            />

            {fullscreenStation && (
                <FullscreenModal
                    {...fullscreenStation}
                    hostname={fullscreenStation.hostname}
                    isStreaming={fullscreenStation.isStreaming}
                    webrtcBaseUrl={dynamicWebrtcBaseUrl}
                    onClose={() => setFullscreenHostname(null)}
                    onToggleStream={onToggleStream}
                    onQuickBookmark={onQuickBookmark}
                    onQuickPlayback={onQuickPlayback}
                    onQuickExport={onQuickExport}
                    onOpenInspector={() => {
                        setInspectedHostname(fullscreenHostname);
                        setFullscreenHostname(null);
                    }}
                />
            )}
        </div>
    );
}