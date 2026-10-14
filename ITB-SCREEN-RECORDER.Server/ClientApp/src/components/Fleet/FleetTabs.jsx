// ==========================================
// File: Client/src/components/UI/FleetTabs.jsx
// ==========================================
import { useState, useRef, useEffect, useCallback } from 'react';
import TabConfigModal from './TabConfigModal';
import { Can } from '../../context/AuthContext';
import './FleetTabs.scss';

export default function FleetTabs({
    activeTabId,
    onTabChange,
    allStations = [],
    openFeatureTabs = [],
    onCloseFeature
}) {
    const [fleetTabsList, setFleetTabsList] = useState([]);
    const [isTabConfigOpen, setIsTabConfigOpen] = useState(false);
    const [editingTab, setEditingTab] = useState(null);

    const overflowContainerRef = useRef(null);
    const [isOverflowOpen, setIsOverflowOpen] = useState(false);

    const [renamingTabId, setRenamingTabId] = useState(null);
    const [renamingTabName, setRenamingTabName] = useState('');
    const renameInputRef = useRef(null);

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
                window.dispatchEvent(new CustomEvent('itb-fleet-tabs-updated'));
            }
        } catch (err) {
            console.error('Failed saving tab to DB:', err);
        }
    };

    const handleSaveTab = async (tabData) => {
        await saveTabToBackend(tabData);
        setEditingTab(null);
        setIsTabConfigOpen(false);
        if (tabData.id) onTabChange(tabData.id);
    };

    const handleDeleteTab = async (tabId) => {
        try {
            const res = await fetch(`/api/v1/dashboard/tabs/${tabId}`, { method: 'DELETE' });
            if (res.ok) {
                await fetchTabsFromDb();
                window.dispatchEvent(new CustomEvent('itb-fleet-tabs-updated'));
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

                                <Can permission="stations.manage">
                                    <button
                                        type="button"
                                        className="tab-edit-gear"
                                        onClick={(e) => { e.stopPropagation(); setEditingTab(tab); setIsTabConfigOpen(true); }}
                                        title="Configure Tab"
                                    >
                                        ⚙
                                    </button>
                                </Can>
                            </div>
                        );
                    })}

                    <Can permission="stations.manage">
                        <button
                            type="button"
                            className="fleet-tab-add-btn"
                            onClick={(e) => { e.preventDefault(); setEditingTab(null); setIsTabConfigOpen(true); }}
                            title="Create new tab"
                        >
                            +
                        </button>
                    </Can>

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

            {isTabConfigOpen && (
                <TabConfigModal
                    initialData={editingTab}
                    allStations={allStations}
                    onSave={handleSaveTab}
                    onDelete={handleDeleteTab}
                    onClose={() => { setIsTabConfigOpen(false); setEditingTab(null); }}
                />
            )}
        </div>
    );
}