import { useDashboardLogic } from './useDashboardLogic';

import StationInspectorDrawer from '../Station/StationInspectorDrawer';
import FullscreenModal from '../Station/FullscreenModal';
import RemoteWidgetHost from '../UI/RemoteWidgetHost';
import FleetTabs from '../UI/FleetTabs';

import DashboardDock from './DashboardDock';
import SearchShelf from './SearchShelf';
import StationsGridView from './StationsGridView';
import StationsDenseView from './StationsDenseView';

import './DashboardGrid.scss';

export default function DashboardGrid(props) {
    const logic = useDashboardLogic(props);

    const {
        stations, actionPending, onToggleStream,
        onQuickBookmark, onQuickPlayback, systemConfig, onSystemConfigUpdate,
        direction, hideOffline, onToggleHideOffline,
        isFaultFilterActive, onExitFaultFilter
    } = props;

    const serverHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    const dynamicWebrtcBaseUrl = `http://${serverHost}:${import.meta.env?.VITE_WEBRTC_PORT || '8889'}`;

    const isFeatureMode = Boolean(logic.activeFeatureObject);

    return (
        <div className="dashboard-layout-wrapper" dir={direction}>
            <div className="dashboard-content-container">

                <DashboardDock
                    isSearchOpen={logic.isSearchOpen} setIsSearchOpen={logic.setIsSearchOpen}
                    hasActiveFilter={logic.hasActiveFilter}
                    viewMode={logic.viewMode} setViewMode={logic.setViewMode}
                    canStartAny={logic.canStartAny} handleFilteredBulkStart={logic.handleFilteredBulkStart}
                    canStopAny={logic.canStopAny} handleFilteredBulkStop={logic.handleFilteredBulkStop}
                    hideOffline={hideOffline} onToggleHideOffline={onToggleHideOffline}
                    sortAsc={logic.sortAsc} setSortAsc={logic.setSortAsc} canSort={logic.canSort}
                    availableFeatures={logic.availableFeatures} openFeatureIds={logic.openFeatureIds} handleToggleFeature={logic.handleToggleFeature}
                    isFeatureActive={isFeatureMode}
                />

                <main className="dashboard-main-area">
                    {/* באנר תקלות קריטיות */}
                    {!isFeatureMode && isFaultFilterActive && (
                        <div className="tactical-fault-isolation-banner">
                            <div className="isolation-info">
                                <span className="pulse-alert-dot" />
                                <span className="isolation-title">FAULT ISOLATION MODE</span>
                                <span className="isolation-desc">Displaying {logic.processedStations.length} station(s) with critical issues.</span>
                            </div>
                            <button className="btn-exit-isolation" onClick={onExitFaultFilter}>✕ Exit Filter</button>
                        </div>
                    )}

                    {/* פס סינון טקטי אלגנטי - מודרני, קומפקטי ומרוכז */}
                    {!isFeatureMode && !logic.isSearchOpen && logic.hasActiveFilter && (
                        <div className="tactical-active-filter-banner">
                            <div className="banner-left-cluster">
                                <div className="filter-status-indicator">
                                    <span className="pulse-amber-dot" />
                                    <span className="filter-status-title">FILTER ACTIVE</span>
                                </div>

                                <div className="banner-v-divider" />

                                <div className="filter-tags-group">
                                    {logic.searchQuery && (
                                        <span className="tactical-filter-pill">
                                            QUERY: <strong>"{logic.searchQuery}"</strong>
                                        </span>
                                    )}
                                    {logic.currentTabFilter !== 'ALL' && (
                                        <span className="tactical-filter-pill">
                                            STATUS: <strong>{logic.currentTabFilter}</strong>
                                        </span>
                                    )}
                                </div>

                                <span className="filter-match-count">
                                    MATCHED: <strong>{logic.processedStations.length}</strong> / {stations.length}
                                </span>

                                <button
                                    type="button"
                                    className="btn-pill-reset"
                                    onClick={logic.handleResetAllFilters}
                                    title="Clear all filters & restore full fleet"
                                >
                                    ✕ CLEAR
                                </button>
                            </div>

                            <div className="banner-right-cluster">
                                <button
                                    type="button"
                                    className="btn-modify-filters"
                                    onClick={() => logic.setIsSearchOpen(true)}
                                    title="Open Search & Filter Shelf"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                                    </svg>
                                    <span>MOD FILTERS</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* סרגל חיפוש וסינון */}
                    <SearchShelf
                        isSearchOpen={!isFeatureMode && logic.isSearchOpen}
                        searchInputRef={logic.searchInputRef}
                        searchQuery={logic.searchQuery}
                        setSearchQuery={logic.setSearchQuery}
                        handleClearFilter={logic.handleClearFilter}
                        currentTabFilter={logic.currentTabFilter}
                        setFilterForTab={logic.setFilterForTab}
                        resultCount={logic.processedStations.length}
                    />

                    {/* שורת הלשוניות */}
                    <FleetTabs
                        activeTabId={logic.activeTabId} onTabChange={logic.setActiveTabId}
                        allStations={stations} onApplyPolicyToStations={logic.handlePolicyApplication}
                        systemConfig={systemConfig} onSystemConfigUpdate={onSystemConfigUpdate}
                        openFeatureTabs={logic.openFeatureTabs} onCloseFeature={logic.handleCloseFeature}
                    />

                    {/* שטח התוכן של הגריד */}
                    <div className={`tab-pane-content-wrapper ${isFeatureMode ? 'feature-active-pane' : ''}`}>
                        {isFeatureMode ? (
                            <div className="feature-stealth-container" style={{ width: '100%', height: '100%' }}>
                                <RemoteWidgetHost
                                    scriptUrl={logic.activeFeatureObject.scriptUrl}
                                    widgetProps={{
                                        activeHost: logic.focusedWidgetHost || stations[0]?.hostname || 'OHAD-DESKTOP',
                                        defaultWindowHours: 24,
                                        onClose: () => logic.handleCloseFeature(logic.activeFeatureObject.id)
                                    }}
                                />
                            </div>
                        ) : (
                            <>
                                {logic.processedStations.length === 0 && logic.activeInlineFeatures.length === 0 ? (
                                    <div className="stations-empty-state-glass">
                                        <div className="connection-pulse-container">
                                            <div className="pulse-dot-amber"></div>
                                            <div className="pulse-ring"></div>
                                        </div>
                                        <span className="empty-state-text">
                                            {isFaultFilterActive ? "ALL AGENTS HEALTH NOMINAL" : (logic.searchQuery || logic.currentTabFilter !== 'ALL') ? "NO AGENTS MATCH CURRENT FILTERS" : "NO AGENTS CONNECTED TO THIS TAB"}
                                        </span>
                                        {(logic.searchQuery || logic.currentTabFilter !== 'ALL') && (
                                            <button className="clear-filter-action-btn" onClick={logic.handleResetAllFilters}>CLEAR FILTERS</button>
                                        )}
                                    </div>
                                ) : logic.viewMode === 'grid' ? (
                                    <StationsGridView
                                        paginatedStations={logic.paginatedStations}
                                        activeInlineFeatures={logic.activeInlineFeatures}
                                        focusedWidgetHost={logic.focusedWidgetHost}
                                        inspectedHostname={logic.inspectedHostname}
                                        handleCloseFeature={logic.handleCloseFeature}
                                        effectiveZoom={logic.effectiveZoom}
                                        actionPending={actionPending}
                                        onToggleStream={onToggleStream}
                                        setInspectedHostname={logic.setInspectedHostname}
                                        setFullscreenHostname={logic.setFullscreenHostname}
                                        onQuickBookmark={onQuickBookmark}
                                        onQuickPlayback={onQuickPlayback}
                                        handleFeatureQuickExport={logic.handleFeatureQuickExport}
                                    />
                                ) : (
                                    <StationsDenseView
                                        paginatedStations={logic.paginatedStations}
                                        activeInlineFeatures={logic.activeInlineFeatures}
                                        focusedWidgetHost={logic.focusedWidgetHost}
                                        inspectedHostname={logic.inspectedHostname}
                                        handleCloseFeature={logic.handleCloseFeature}
                                        actionPending={actionPending}
                                        onToggleStream={onToggleStream}
                                        setInspectedHostname={logic.setInspectedHostname}
                                        setFullscreenHostname={logic.setFullscreenHostname}
                                    />
                                )}

                                {logic.totalPages > 1 && (
                                    <div className="dashboard-pagination-bar">
                                        <button disabled={logic.currentPage === 1} onClick={() => logic.setCurrentPage(p => p - 1)}>◀ PREV</button>
                                        <span className="page-indicator">PAGE {logic.currentPage} OF {logic.totalPages}</span>
                                        <button disabled={logic.currentPage === logic.totalPages} onClick={() => logic.setCurrentPage(p => p + 1)}>NEXT ▶</button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </main>
            </div>

            {!isFeatureMode && logic.viewMode === 'grid' && (
                <div className="noc-footer-zoom-pill">
                    <button className={`zoom-auto-btn ${logic.isAutoZoom ? 'is-active' : ''}`} onClick={() => logic.setIsAutoZoom(p => !p)}>AUTO</button>
                    <div className="zoom-pill-divider"></div>
                    <button onClick={logic.handleZoomOut} disabled={logic.effectiveZoom === 1} className="zoom-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                    <input type="range" min="1" max="5" step="1" value={logic.effectiveZoom} onChange={logic.handleSliderChange} className="zoom-slider" />
                    <button onClick={logic.handleZoomIn} disabled={logic.effectiveZoom === 5} className="zoom-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                    <span className="zoom-level-badge">{logic.effectiveZoom}</span>
                </div>
            )}

            <StationInspectorDrawer
                station={logic.inspectedStation}
                onClose={() => logic.setInspectedHostname(null)}
                onToggleStream={onToggleStream}
                onQuickBookmark={onQuickBookmark}
                onQuickPlayback={onQuickPlayback}
                onQuickExport={logic.handleFeatureQuickExport}
                onToggleFullscreen={() => { logic.setFullscreenHostname(logic.inspectedHostname); logic.setInspectedHostname(null); }}
            />

            {logic.fullscreenStation && (
                <FullscreenModal
                    {...logic.fullscreenStation}
                    hostname={logic.fullscreenStation.hostname}
                    isStreaming={logic.fullscreenStation.isStreaming}
                    webrtcBaseUrl={dynamicWebrtcBaseUrl}
                    onClose={() => logic.setFullscreenHostname(null)}
                    onToggleStream={onToggleStream}
                    onQuickBookmark={onQuickBookmark}
                    onQuickPlayback={onQuickPlayback}
                    onQuickExport={logic.handleFeatureQuickExport}
                    onOpenInspector={() => { logic.setInspectedHostname(logic.fullscreenHostname); logic.setFullscreenHostname(null); }}
                />
            )}
        </div>
    );
}