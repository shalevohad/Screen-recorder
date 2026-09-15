import { useState, useRef, useEffect } from 'react';
import TabConfigModal from './TabConfigModal';
import './FleetTabs.scss';

// 💡 פונקציית עזר חיצונית שאינה תלויה ברינדור של React (עוקפת את שגיאת Purity)
const generateTabId = () => 'tab_' + Date.now();

export default function FleetTabs({
    activeTabId,
    onTabChange,
    allStations = [],
    onApplyPolicyToStations,
    systemConfig,
    onSystemConfigUpdate,
    openFeatureTabs = [],
    onCloseFeature
}) {
    const fleetTabsList = systemConfig?.dashboard?.fleetTabs || [];

    const [isTabConfigOpen, setIsTabConfigOpen] = useState(false);
    const [editingTab, setEditingTab] = useState(null);
    const [pendingTabSave, setPendingTabSave] = useState(null);
    const [conflictStations, setConflictStations] = useState([]);

    const overflowContainerRef = useRef(null);
    const [isOverflowOpen, setIsOverflowOpen] = useState(false);

    const [renamingTabId, setRenamingTabId] = useState(null);
    const [renamingTabName, setRenamingTabName] = useState('');
    const renameInputRef = useRef(null);

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

    const handleCommitRename = (tabId) => {
        if (!renamingTabId) return;
        const trimmed = renamingTabName.trim();
        if (trimmed) {
            const updatedTabs = fleetTabsList.map(t =>
                t.id === tabId ? { ...t, name: trimmed } : t
            );
            saveTabsToBackend(updatedTabs);
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

    const saveTabsToBackend = async (newTabsList) => {
        const baseConfig = systemConfig || { dashboard: {} };
        const updatedConfig = {
            ...baseConfig,
            dashboard: {
                ...(baseConfig.dashboard || {}),
                fleetTabs: newTabsList
            }
        };

        try {
            const res = await fetch('/api/v1/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedConfig)
            });

            if (res.ok) {
                const savedData = await res.json();
                onSystemConfigUpdate?.(savedData);
            } else {
                onSystemConfigUpdate?.(updatedConfig);
            }
        } catch {
            onSystemConfigUpdate?.(updatedConfig);
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

    const commitSave = (tabData, overrideCustomSettings) => {
        const finalId = tabData.id || generateTabId();
        const finalTabData = { ...tabData, id: finalId };

        let updatedTabs = [...fleetTabsList];
        const existsIdx = updatedTabs.findIndex(t => t.id === finalId);
        if (existsIdx > -1) {
            updatedTabs[existsIdx] = finalTabData;
        } else {
            updatedTabs.push(finalTabData);
        }

        saveTabsToBackend(updatedTabs);

        if (onApplyPolicyToStations) {
            onApplyPolicyToStations({
                tabId: finalId,
                tabData: finalTabData,
                overrideCustomSettings
            });
        }

        setPendingTabSave(null);
        setConflictStations([]);
        setEditingTab(null);
        setIsTabConfigOpen(false);
        onTabChange(finalId);
    };

    const handleDeleteTab = (tabId) => {
        const updatedTabs = fleetTabsList.filter(t => t.id !== tabId);
        saveTabsToBackend(updatedTabs);

        if (activeTabId === tabId) {
            onTabChange('ALL');
        }
        setEditingTab(null);
        setIsTabConfigOpen(false);
    };

    const currentTabConfig = fleetTabsList.find(t => t.id === activeTabId) || null;

    const MAX_VISIBLE_FEATURE_TABS = 3;
    const visibleFeatureTabs = openFeatureTabs.slice(0, MAX_VISIBLE_FEATURE_TABS);
    const overflowFeatureTabs = openFeatureTabs.slice(MAX_VISIBLE_FEATURE_TABS);
    const hasOverflow = overflowFeatureTabs.length > 0;

    return (
        <div className="dashboard-tabs-bar-wrapper">
            <div className="tabs-navigation-container">
                <div className="active-tabs-cluster left-cluster">
                    <button
                        type="button"
                        className={`fleet-tab-pill ${activeTabId === 'ALL' ? 'active' : ''}`}
                        onClick={() => onTabChange('ALL')}
                    >
                        ALL ({allStations.length})
                    </button>

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
                                            if (e.key === 'Enter') handleCommitRename(tab.id);
                                            if (e.key === 'Escape') setRenamingTabId(null);
                                        }}
                                        onBlur={() => handleCommitRename(tab.id)}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                ) : (
                                    <button
                                        type="button"
                                        className="fleet-tab-pill"
                                        onClick={() => onTabChange(tab.id)}
                                    >
                                        {tab.name}
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
                </div>

                <div className="active-tabs-cluster right-cluster">
                    {visibleFeatureTabs.map(feat => (
                        <div key={feat.id} className={`fleet-tab-wrapper feature-tab ${activeTabId === feat.id ? 'active' : ''}`}>
                            <button type="button" className="fleet-tab-pill feature" onClick={() => onTabChange(feat.id)}>
                                <span className="feature-dot" />
                                {feat.title.toUpperCase()}
                            </button>
                            <button
                                type="button"
                                className="tab-close-btn"
                                onClick={(e) => { e.stopPropagation(); onCloseFeature(feat.id); }}
                                title="Close Feature"
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
                                title="More open features"
                            >
                                <span>▾</span>
                                <span className="overflow-badge">+{overflowFeatureTabs.length}</span>
                            </button>

                            {isOverflowOpen && (
                                <div className="windows-overflow-menu">
                                    <div className="menu-header">Active Background Features</div>
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
                <p className="conflict-desc">The following <strong>{conflictStations.length} station(s)</strong> assigned to <strong>"{tabName}"</strong> already have custom Bitrate/FPS settings defined:</p>
                <div className="conflict-stations-list">
                    {conflictStations.map(st => (
                        <div key={st.hostname} className="conflict-station-row">
                            <span className="st-name">{st.displayName || st.hostname}</span>
                            <span className="st-current-policy">{st.customBitrate ? `${st.customBitrate}k` : 'Auto'} / {st.customFps ? `${st.customFps}fps` : 'Auto'}</span>
                        </div>
                    ))}
                </div>
                <p className="conflict-question">Would you like to overwrite their individual settings with the tab's policy, or preserve their custom values?</p>
                <div className="conflict-actions">
                    <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
                    <button type="button" className="btn-preserve" onClick={() => onResolve(false)}>Keep Custom Settings</button>
                    <button type="button" className="btn-overwrite" onClick={() => onResolve(true)}>Overwrite All</button>
                </div>
            </div>
        </div>
    );
}