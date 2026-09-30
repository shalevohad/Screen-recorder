import { useState, useRef, useEffect, useCallback } from 'react';
import TabConfigModal from './TabConfigModal';
import './FleetTabs.scss';

export default function FleetTabs({
    activeTabId,
    onTabChange,
    allStations = [],
    onApplyPolicyToStations,
    openFeatureTabs = [],
    onCloseFeature
}) {
    const [fleetTabsList, setFleetTabsList] = useState([]);
    const [isTabConfigOpen, setIsTabConfigOpen] = useState(false);
    const [editingTab, setEditingTab] = useState(null);
    const [pendingTabSave, setPendingTabSave] = useState(null);
    const [conflictStations, setConflictStations] = useState([]);

    const overflowContainerRef = useRef(null);
    const [isOverflowOpen, setIsOverflowOpen] = useState(false);

    const [renamingTabId, setRenamingTabId] = useState(null);
    const [renamingTabName, setRenamingTabName] = useState('');
    const renameInputRef = useRef(null);

    // שליפת טאבים מה-DB בעלייה
    const fetchTabsFromDb = useCallback(async () => {
        try {
            const res = await fetch('/api/v1/dashboard/tabs');
            if (res.ok) {
                const data = await res.json();
                setFleetTabsList(data.filter(t => !t.isDefault));
            }
        } catch (err) {
            console.error('Failed fetching fleet tabs from DB:', err);
        }
    }, []);

    useEffect(() => {
        fetchTabsFromDb();
    }, [fetchTabsFromDb]);

    useEffect(() => {
        if (renamingTabId && renameInputRef.current) {
            renameInputRef.current.focus();
            renameInputRef.current.select();
        }
    }, [renamingTabId]);

    const handleStartRename = (e, tab) => {
        e.preventDefault();
        e.stopPropagation();
        setRenamingTabId(tab.id);
        setRenamingTabName(tab.name || '');
    };

    const handleCommitRename = async (tab) => {
        if (!renamingTabId) return;
        const trimmed = renamingTabName.trim();
        if (trimmed && trimmed !== tab.name) {
            const updated = { ...tab, name: trimmed };
            await saveTabToBackend(updated);
        }
        setRenamingTabId(null);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (overflowContainerRef.current && !overflowContainerRef.current.contains(e.target)) {
                setIsOverflowOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const saveTabToBackend = async (tabData) => {
        try {
            const res = await fetch('/api/v1/dashboard/tabs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tabData)
            });

            if (res.ok) {
                await fetchTabsFromDb();
            }
        } catch (err) {
            console.error('Failed saving tab to DB:', err);
        }
    };

    const handlePreSaveTab = (tabData) => {
        const matchingStations = allStations.filter(st => {
            const matchesName = tabData.assignedHostnames?.includes(st.hostname);
            const matchesOu = tabData.assignedOus?.some(ou =>
                st.ou?.toLowerCase().includes(ou.toLowerCase()) ||
                st.group?.toLowerCase().includes(ou.toLowerCase())
            );
            return matchesName || matchesOu;
        });

        const conflicted = matchingStations.filter(st =>
            (st.customBitrate && tabData.defaultBitrate) ||
            (st.customFps && tabData.defaultFps)
        );

        if (conflicted.length > 0 && (tabData.defaultBitrate || tabData.defaultFps)) {
            setConflictStations(conflicted);
            setPendingTabSave(tabData);
        } else {
            commitSave(tabData, false);
        }
    };

    const commitSave = async (tabData, overrideCustomSettings) => {
        await saveTabToBackend(tabData);

        if (onApplyPolicyToStations) {
            onApplyPolicyToStations({
                tabId: tabData.id,
                tabData,
                overrideCustomSettings
            });
        }

        setPendingTabSave(null);
        setConflictStations([]);
        setEditingTab(null);
        setIsTabConfigOpen(false);
        if (tabData.id) onTabChange(tabData.id);
    };

    const handleDeleteTab = async (tabId) => {
        try {
            const res = await fetch(`/api/v1/dashboard/tabs/${tabId}`, { method: 'DELETE' });
            if (res.ok) {
                await fetchTabsFromDb();
                if (activeTabId === tabId) {
                    onTabChange('ALL');
                }
            }
        } catch (err) {
            console.error('Failed deleting tab from DB:', err);
        }
        setEditingTab(null);
        setIsTabConfigOpen(false);
    };

    const currentTabConfig = fleetTabsList.find(t => t.id === activeTabId) || null;

    const MAX_VISIBLE_FEATURE_TABS = 4;
    const visibleFeatureTabs = openFeatureTabs.slice(0, MAX_VISIBLE_FEATURE_TABS);
    const overflowFeatureTabs = openFeatureTabs.slice(MAX_VISIBLE_FEATURE_TABS);
    const hasOverflow = overflowFeatureTabs.length > 0;

    return (
        <div className="dashboard-tabs-bar-wrapper">
            <div className="tabs-navigation-container">
                <div className="active-tabs-cluster unified-flow">
                    <div
                        className={`fleet-tab-wrapper all-tab ${activeTabId === 'ALL' ? 'active' : ''}`}
                        title="View All Stations"
                    >
                        <button
                            type="button"
                            className="fleet-tab-pill"
                            onClick={() => onTabChange('ALL')}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="tab-all-icon">
                                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                            </svg>
                            <span className="tab-name-label">ALL</span>
                            <span className="tab-count-badge">{allStations.length}</span>
                        </button>
                    </div>

                    {fleetTabsList.map(tab => {
                        const isEditing = renamingTabId === tab.id;
                        return (
                            <div
                                key={tab.id}
                                className={`fleet-tab-wrapper ${activeTabId === tab.id ? 'active' : ''}`}
                                onDoubleClick={(e) => handleStartRename(e, tab)}
                                title="Click to select, Double-click to rename"
                            >
                                {isEditing ? (
                                    <input
                                        ref={renameInputRef}
                                        type="text"
                                        className="inline-tab-rename-input"
                                        value={renamingTabName}
                                        onChange={(e) => setRenamingTabName(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleCommitRename(tab);
                                            if (e.key === 'Escape') setRenamingTabId(null);
                                        }}
                                        onBlur={() => handleCommitRename(tab)}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                ) : (
                                    <button
                                        type="button"
                                        className="fleet-tab-pill"
                                        onClick={() => onTabChange(tab.id)}
                                    >
                                        <span className="tab-name-label">{tab.name}</span>
                                    </button>
                                )}

                                <button
                                    type="button"
                                    className="tab-edit-gear"
                                    onClick={(e) => { e.stopPropagation(); setEditingTab(tab); setIsTabConfigOpen(true); }}
                                    title="Configure Tab"
                                >
                                    ⚙
                                </button>
                            </div>
                        );
                    })}

                    <button
                        type="button"
                        className="fleet-tab-add-btn"
                        onClick={(e) => { e.preventDefault(); setEditingTab(null); setIsTabConfigOpen(true); }}
                        title="Create new tab"
                    >
                        +
                    </button>

                    {visibleFeatureTabs.length > 0 && (
                        <div className="tab-cluster-separator" />
                    )}

                    {visibleFeatureTabs.map(feat => (
                        <div
                            key={feat.id}
                            className={`fleet-tab-wrapper feature-tab ${activeTabId === feat.id ? 'active' : ''}`}
                        >
                            <button
                                type="button"
                                className="fleet-tab-pill feature"
                                onClick={() => onTabChange(feat.id)}
                            >
                                <span className="feature-dot" />
                                <span className="feature-title-text">{feat.title.toUpperCase()}</span>
                            </button>
                            <button
                                type="button"
                                className="tab-close-btn"
                                onClick={(e) => { e.stopPropagation(); onCloseFeature(feat.id); }}
                                title="Close Module"
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    {hasOverflow && (
                        <div className="windows-overflow-dropdown-wrapper" ref={overflowContainerRef}>
                            <button
                                type="button"
                                className={`windows-overflow-btn ${overflowFeatureTabs.some(f => f.id === activeTabId) ? 'active' : ''}`}
                                onClick={() => setIsOverflowOpen(p => !p)}
                                title="More open modules"
                            >
                                <span>▾</span>
                                <span className="overflow-badge">+{overflowFeatureTabs.length}</span>
                            </button>

                            {isOverflowOpen && (
                                <div className="windows-overflow-menu">
                                    <div className="menu-header">Active Modules</div>
                                    {overflowFeatureTabs.map(feat => (
                                        <div
                                            key={feat.id}
                                            className={`overflow-menu-item ${activeTabId === feat.id ? 'active' : ''}`}
                                            onClick={() => { onTabChange(feat.id); setIsOverflowOpen(false); }}
                                        >
                                            <span className="feature-dot" />
                                            <span className="feat-title">{feat.title.toUpperCase()}</span>
                                            <button
                                                type="button"
                                                className="menu-item-close"
                                                onClick={(e) => { e.stopPropagation(); onCloseFeature(feat.id); }}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {currentTabConfig && (currentTabConfig.defaultBitrate || currentTabConfig.defaultFps) && (
                <div className="tab-fleet-settings-badge">
                    <span>TAB STREAM POLICY:</span>
                    {currentTabConfig.defaultBitrate && <span>Bitrate: {currentTabConfig.defaultBitrate} kbps</span>}
                    {currentTabConfig.defaultFps && <span>FPS: {currentTabConfig.defaultFps}</span>}
                </div>
            )}

            {isTabConfigOpen && (
                <TabConfigModal
                    initialData={editingTab}
                    allStations={allStations}
                    onSave={handlePreSaveTab}
                    onDelete={handleDeleteTab}
                    onClose={() => { setIsTabConfigOpen(false); setEditingTab(null); }}
                />
            )}

            {pendingTabSave && (
                <ConflictResolutionModal
                    conflictStations={conflictStations}
                    tabName={pendingTabSave.name}
                    onResolve={(shouldOverride) => commitSave(pendingTabSave, shouldOverride)}
                    onCancel={() => { setPendingTabSave(null); setConflictStations([]); }}
                />
            )}
        </div>
    );
}

function ConflictResolutionModal({ conflictStations, tabName, onResolve, onCancel }) {
    return (
        <div className="tab-config-modal-backdrop conflict-resolution-backdrop">
            <div className="tab-config-modal-card conflict-card">
                <div className="conflict-header">
                    <span className="warning-badge">CONFLICT DETECTED</span>
                    <h3>Individual Station Settings Found</h3>
                </div>
                <p className="conflict-desc">The following <strong>{conflictStations.length} station(s)</strong> assigned to <strong>"{tabName}"</strong> already have custom settings:</p>
                <div className="conflict-stations-list">
                    {conflictStations.map(st => (
                        <div key={st.hostname} className="conflict-station-row">
                            <span className="st-name">{st.displayName || st.hostname}</span>
                            <span className="st-current-policy">{st.customBitrate ? `${st.customBitrate}k` : 'Auto'} / {st.customFps ? `${st.customFps}fps` : 'Auto'}</span>
                        </div>
                    ))}
                </div>
                <p className="conflict-question">Overwrite individual settings or keep custom values?</p>
                <div className="conflict-actions">
                    <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
                    <button type="button" className="btn-preserve" onClick={() => onResolve(false)}>Keep Custom Settings</button>
                    <button type="button" className="btn-overwrite" onClick={() => onResolve(true)}>Overwrite All</button>
                </div>
            </div>
        </div>
    );
}