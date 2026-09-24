import DynamicIcon from '../UI/DynamicIcon';
import './DashboardDock.scss';

export default function DashboardDock({
    isSearchOpen, setIsSearchOpen,
    hasActiveFilter,
    viewMode, setViewMode,
    canStartAny, handleFilteredBulkStart,
    canStopAny, handleFilteredBulkStop,
    hideOffline, onToggleHideOffline,
    sortAsc, setSortAsc, canSort,
    availableFeatures, openFeatureIds, handleToggleFeature,
    isFeatureActive
}) {
    const onFeatureClick = (feat, isOpen) => {
        if (isOpen) {
            window.dispatchEvent(new CustomEvent('extractor:clear-session'));
        }
        handleToggleFeature(feat);
    };

    return (
        <aside className="dashboard-vertical-dock tactical-c2-dock">
            <button
                className={`dock-icon-btn tactical-btn-search ${isSearchOpen ? 'is-engaged' : ''} ${hasActiveFilter ? 'has-active-filter' : ''} ${isFeatureActive ? 'disabled' : ''}`}
                onClick={() => setIsSearchOpen(p => !p)}
                disabled={isFeatureActive}
                title={isFeatureActive ? "Filters unavailable in Feature Mode" : hasActiveFilter ? "Filter Active - Click to view/hide shelf" : isSearchOpen ? "Hide filters & search" : "Show filters & search"}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>

                {!isSearchOpen && hasActiveFilter && (
                    <span className="filter-dock-alert-dot" />
                )}
            </button>

            <button
                className={`dock-icon-btn tactical-btn-viewmode ${viewMode === 'dense' ? 'is-engaged' : ''} ${isFeatureActive ? 'disabled' : ''}`}
                onClick={() => setViewMode(v => v === 'grid' ? 'dense' : 'grid')}
                disabled={isFeatureActive}
                title={isFeatureActive ? "View mode unavailable in Feature Mode" : viewMode === 'grid' ? "Switch to Dense List View" : "Switch to Visual Grid View"}
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
                className={`dock-icon-btn tactical-btn-start ${canStartAny && !isFeatureActive ? 'is-actionable' : 'disabled'}`}
                onClick={canStartAny && !isFeatureActive ? handleFilteredBulkStart : undefined}
                disabled={!canStartAny || isFeatureActive}
                title={isFeatureActive ? "Bulk actions unavailable in Feature Mode" : canStartAny ? `Start streaming on filtered agents` : "No idle filtered agents"}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                    <polygon points="6 3 20 12 6 21 6 3" />
                    <line x1="20" y1="4" x2="20" y2="20" strokeWidth="3" />
                    <circle cx="11" cy="12" r="2.2" fill="currentColor" />
                </svg>
            </button>

            <button
                className={`dock-icon-btn tactical-btn-stop ${canStopAny && !isFeatureActive ? 'is-actionable' : 'disabled'}`}
                onClick={canStopAny && !isFeatureActive ? handleFilteredBulkStop : undefined}
                disabled={!canStopAny || isFeatureActive}
                title={isFeatureActive ? "Bulk actions unavailable in Feature Mode" : canStopAny ? `Stop active filtered streams` : "No active streams"}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <line x1="9" y1="9" x2="15" y2="15" strokeWidth="3" />
                    <line x1="15" y1="9" x2="9" y2="15" strokeWidth="3" />
                </svg>
            </button>

            <div className="dock-divider"></div>

            <button
                className={`dock-icon-btn tactical-btn-filter ${hideOffline ? 'is-engaged' : ''} ${isFeatureActive ? 'disabled' : ''}`}
                onClick={onToggleHideOffline}
                disabled={isFeatureActive}
                title={isFeatureActive ? "Filtering unavailable in Feature Mode" : hideOffline ? "Filter: Active only" : "Filter: All stations"}
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
                className={`dock-icon-btn tactical-btn-sort ${!sortAsc ? 'is-reversed' : ''} ${(!canSort || isFeatureActive) ? 'disabled' : ''}`}
                onClick={canSort && !isFeatureActive ? () => setSortAsc(p => !p) : undefined}
                disabled={!canSort || isFeatureActive}
                title={isFeatureActive ? "Sorting unavailable in Feature Mode" : sortAsc ? "Sort: A to Z" : "Sort: Z to A"}
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

            {availableFeatures.length > 0 && (
                <>
                    <div className="dock-divider"></div>
                    {availableFeatures.map((feat) => {
                        const isOpen = openFeatureIds.includes(feat.id);
                        return (
                            <button
                                key={feat.id}
                                className={`dock-icon-btn tactical-btn-feature ${isOpen ? 'is-engaged' : ''}`}
                                onClick={() => onFeatureClick(feat, isOpen)}
                                title={isOpen ? `Close ${feat.title}` : `Open ${feat.title}`}
                            >
                                <DynamicIcon name={feat.iconName} size={20} />
                            </button>
                        );
                    })}
                </>
            )}
        </aside>
    );
}