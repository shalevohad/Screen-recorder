// Client/src/components/Dashboard/DashboardDock.jsx
import { useMemo } from 'react';
import DynamicIcon from '../UI/DynamicIcon';
import { useAuth } from '../../context/AuthContext';
import './DashboardDock.scss';

export default function DashboardDock({
    isSearchOpen,
    setIsSearchOpen,
    hasActiveFilter,
    viewMode,
    setViewMode,
    canStartAny,
    handleFilteredBulkStart,
    canStopAny,
    handleFilteredBulkStop,
    keystrokeMode = 'burn-in',
    handleCycleKeystrokeMode,
    sortAsc,
    setSortAsc,
    canSort,
    availableFeatures = [],
    openFeatureIds = [],
    handleToggleFeature,
    isFeatureActive
}) {
    const { isSystemRoot, hasPermission } = useAuth();
    const canControlStations = isSystemRoot || hasPermission('stations.control');

    const permittedFeatures = useMemo(() => {
        return availableFeatures.filter(f => {
            const id = (f.id || '').toLowerCase();
            if (id.includes('extractor')) {
                return isSystemRoot || hasPermission('extractor.view');
            }
            if (id.includes('studio')) {
                return isSystemRoot || hasPermission('studio.view');
            }
            return true;
        });
    }, [availableFeatures, isSystemRoot, hasPermission]);

    const onFeatureClick = (feat, isOpen) => {
        if (isOpen) {
            window.dispatchEvent(new CustomEvent('extractor:clear-session'));
        }
        if (handleToggleFeature) {
            handleToggleFeature(feat);
        }
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

            <div className="dock-divider" />

            <button
                className={`dock-icon-btn tactical-btn-start ${canStartAny && canControlStations && !isFeatureActive ? 'is-actionable' : 'disabled'}`}
                onClick={canStartAny && canControlStations && !isFeatureActive ? handleFilteredBulkStart : undefined}
                disabled={!canStartAny || !canControlStations || isFeatureActive}
                title={
                    !canControlStations
                        ? "Start action requires 'stations.control' permission"
                        : isFeatureActive
                        ? "Bulk actions unavailable in Feature Mode"
                        : canStartAny
                        ? "Start recording on all unrecorded stations"
                        : "All stations currently recording"
                }
            >
                <svg viewBox="0 0 24 24" fill="none">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="2.2" />
                    <circle cx="12" cy="12" r="4.5" fill="currentColor" />
                </svg>
            </button>

            <button
                className={`dock-icon-btn tactical-btn-stop ${canStopAny && canControlStations && !isFeatureActive ? 'is-actionable' : 'disabled'}`}
                onClick={canStopAny && canControlStations && !isFeatureActive ? handleFilteredBulkStop : undefined}
                disabled={!canStopAny || !canControlStations || isFeatureActive}
                title={
                    !canControlStations
                        ? "Stop action requires 'stations.control' permission"
                        : isFeatureActive
                        ? "Bulk actions unavailable in Feature Mode"
                        : canStopAny
                        ? "Stop recording on stations (Remain in Live Monitor)"
                        : "No stations currently recording"
                }
            >
                <svg viewBox="0 0 24 24" fill="none">
                    <rect x="5.5" y="5.5" width="13" height="13" rx="2" fill="currentColor" />
                </svg>
            </button>

            <div className="dock-divider" />

            {/* Tactical tri-state control for keystroke overlay: BURN-IN -> CAPTION -> OFF */}
            <button
                className={`dock-icon-btn tactical-btn-keystroke mode-${keystrokeMode} ${isFeatureActive ? 'disabled' : ''}`}
                onClick={!isFeatureActive ? handleCycleKeystrokeMode : undefined}
                disabled={isFeatureActive}
                title={
                    isFeatureActive
                        ? "Keystroke overlay unavailable in Feature Mode"
                        : `Keystroke Overlay: ${keystrokeMode === 'burn-in' ? 'HARD BURN-IN' : keystrokeMode === 'caption' ? 'SOFT CAPTION' : 'OFF'} (Click to cycle)`
                }
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 16h8" />
                </svg>
                <span className={`dock-mode-indicator ${keystrokeMode}`}>
                    {keystrokeMode === 'burn-in' ? 'BURN' : keystrokeMode === 'caption' ? 'CAPT' : 'OFF'}
                </span>
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

            {permittedFeatures && permittedFeatures.length > 0 && (
                <>
                    <div className="dock-divider" />
                    {permittedFeatures.map((feat) => {
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