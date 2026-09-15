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

    const cardWidthMap = { 1: '290px', 2: '360px', 3: '450px', 4: '570px', 5: '700px' };
    const serverHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    const dynamicWebrtcBaseUrl = `http://${serverHost}:${import.meta.env?.VITE_WEBRTC_PORT || '8889'}`;

    return (
        <div className="dashboard-layout-wrapper" dir={direction}>
            <div className="dashboard-content-container">

                <DashboardDock
                    isSearchOpen={logic.isSearchOpen} setIsSearchOpen={logic.setIsSearchOpen}
                    viewMode={logic.viewMode} setViewMode={logic.setViewMode}
                    canStartAny={logic.canStartAny} handleFilteredBulkStart={logic.handleFilteredBulkStart}
                    canStopAny={logic.canStopAny} handleFilteredBulkStop={logic.handleFilteredBulkStop}
                    hideOffline={hideOffline} onToggleHideOffline={onToggleHideOffline}
                    sortAsc={logic.sortAsc} setSortAsc={logic.setSortAsc} canSort={logic.canSort}
                    availableFeatures={logic.availableFeatures} openFeatureIds={logic.openFeatureIds} handleToggleFeature={logic.handleToggleFeature}

                    // 💡 השורה שהתווספה: מודיעה לסרגל הצד שפיצ'ר תפס את המסך
                    isFeatureActive={!!logic.activeFeatureObject}
                />

                <main className="dashboard-main-area">
                    <FleetTabs
                        activeTabId={logic.activeTabId} onTabChange={logic.setActiveTabId}
                        allStations={stations} onApplyPolicyToStations={logic.handlePolicyApplication}
                        systemConfig={systemConfig} onSystemConfigUpdate={onSystemConfigUpdate}
                        openFeatureTabs={logic.openFeatureTabs} onCloseFeature={logic.handleCloseFeature}
                    />

                    <div className={`tab-pane-content-wrapper ${logic.activeFeatureObject ? 'feature-active-pane' : ''}`}>
                        {logic.activeFeatureObject ? (
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
                                {isFaultFilterActive && (
                                    <div className="tactical-fault-isolation-banner">
                                        <div className="isolation-info">
                                            <span className="pulse-alert-dot" />
                                            <span className="isolation-title">FAULT ISOLATION MODE</span>
                                            <span className="isolation-desc">Displaying {logic.processedStations.length} station(s) with critical issues.</span>
                                        </div>
                                        <button className="btn-exit-isolation" onClick={onExitFaultFilter}>✕ Exit Filter</button>
                                    </div>
                                )}

                                <SearchShelf
                                    isSearchOpen={logic.isSearchOpen}
                                    searchInputRef={logic.searchInputRef}
                                    searchQuery={logic.searchQuery}
                                    setSearchQuery={logic.setSearchQuery}
                                    handleClearFilter={logic.handleClearFilter}
                                    currentTabFilter={logic.currentTabFilter}
                                    setFilterForTab={logic.setFilterForTab}
                                    resultCount={logic.processedStations.length}
                                />

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
                                            <button className="clear-filter-action-btn" onClick={() => { logic.setSearchQuery(''); logic.setFilterForTab('ALL'); }}>CLEAR FILTERS</button>
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

            {!logic.activeFeatureObject && logic.viewMode === 'grid' && (
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