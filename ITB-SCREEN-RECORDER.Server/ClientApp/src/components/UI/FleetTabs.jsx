import { useState, useRef, useEffect } from 'react';
import RangeSlider from './RangeSlider';
import './FleetTabs.scss';

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
        const finalId = tabData.id || ('tab_' + Date.now());
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
                        className={`fleet-tab-pill ${activeTabId === 'ALL' ? 'active' : ''}`}
                        onClick={() => onTabChange('ALL')}
                    >
                        ALL ({allStations.length})
                    </button>

                    {fleetTabsList.map(tab => (
                        <div key={tab.id} className={`fleet-tab-wrapper ${activeTabId === tab.id ? 'active' : ''}`}>
                            <button className="fleet-tab-pill" onClick={() => onTabChange(tab.id)}>
                                {tab.name}
                            </button>
                            <button
                                className="tab-edit-gear"
                                onClick={(e) => { e.stopPropagation(); setEditingTab(tab); setIsTabConfigOpen(true); }}
                                title="Configure Tab"
                            >
                                ⚙
                            </button>
                        </div>
                    ))}

                    <button
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
                            <button className="fleet-tab-pill feature" onClick={() => onTabChange(feat.id)}>
                                <span className="feature-dot" />
                                {feat.title.toUpperCase()}
                            </button>
                            <button
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

function TabConfigModal({ initialData, allStations, onSave, onDelete, onClose }) {
    const [name, setName] = useState(initialData?.name || '');
    const [assignedHostnames, setAssignedHostnames] = useState(initialData?.assignedHostnames || []);
    const [adSettings, setAdSettings] = useState({ isEnabled: false, availableOus: [], loading: true });
    const [assignedOus, setAssignedOus] = useState(initialData?.assignedOus || []);

    const [enableBitrate, setEnableBitrate] = useState(!!initialData?.defaultBitrate);
    const [defaultBitrate, setDefaultBitrate] = useState(initialData?.defaultBitrate || 2500);

    const [enableFps, setEnableFps] = useState(!!initialData?.defaultFps);
    const [defaultFps, setDefaultFps] = useState(initialData?.defaultFps || 30);

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.ok ? res.json() : {})
            .then(data => {
                const isActive = data?.activeDirectory?.enabled || data?.adSettings?.enabled;
                const ousList = data?.activeDirectory?.ouList || data?.adSettings?.ous || [];
                if (isActive) {
                    setAdSettings({ isEnabled: true, availableOus: ousList, loading: false });
                } else {
                    setAdSettings({ isEnabled: true, availableOus: ['TelAviv-HQ', 'Operations', 'North-Branch', 'South-Branch', 'DevOps'], loading: false });
                }
            })
            .catch(() => setAdSettings({ isEnabled: false, availableOus: [], loading: false }));
    }, []);

    const handleToggleHost = (hostname) => {
        setAssignedHostnames(prev => prev.includes(hostname) ? prev.filter(h => h !== hostname) : [...prev, hostname]);
    };

    const handleToggleOu = (ou) => {
        setAssignedOus(prev => prev.includes(ou) ? prev.filter(o => o !== ou) : [...prev, ou]);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSave({
            id: initialData?.id,
            name: name.trim(),
            assignedHostnames,
            assignedOus,
            defaultBitrate: enableBitrate ? Number(defaultBitrate) : null,
            defaultFps: enableFps ? Number(defaultFps) : null
        });
    };

    return (
        <div className="tab-config-modal-backdrop">
            <div className="tab-config-modal-card">
                <h3>{initialData ? 'Configure Fleet Tab' : 'Create New Fleet Tab'}</h3>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label>Tab Name:</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Command Center, North Branch" required />
                    </div>
                    <div className="config-section">
                        <div className="section-title">Batch Stream Policy</div>
                        <div className="form-row">
                            <div className="form-group slider-group-wrapper">
                                <div className="toggle-header"><label><input type="checkbox" checked={enableBitrate} onChange={e => setEnableBitrate(e.target.checked)} /> Override Default Bitrate</label></div>
                                <RangeSlider label="Bitrate Limit" value={defaultBitrate} min={500} max={10000} step={100} unit="k" disabled={!enableBitrate} onChange={setDefaultBitrate} />
                            </div>
                            <div className="form-group slider-group-wrapper">
                                <div className="toggle-header"><label><input type="checkbox" checked={enableFps} onChange={e => setEnableFps(e.target.checked)} /> Override Default FPS</label></div>
                                <RangeSlider label="FPS Limit" value={defaultFps} min={10} max={60} step={5} unit=" fps" disabled={!enableFps} onChange={setDefaultFps} />
                            </div>
                        </div>
                    </div>
                    <div className="config-section">
                        <div className="section-title">Tab Assignment Logic</div>
                        {adSettings.loading ? <div className="form-group"><span className="loading-text">Fetching AD config...</span></div> : adSettings.isEnabled ? (
                            <div className="form-group">
                                <label>Assign by Active Directory OUs:</label>
                                <div className="stations-checklist-box">
                                    {adSettings.availableOus.map(ou => {
                                        const isSelected = assignedOus.includes(ou);
                                        return (
                                            <div key={ou} className={`check-item ${isSelected ? 'selected' : ''}`} onClick={() => handleToggleOu(ou)}>
                                                <input type="checkbox" checked={isSelected} readOnly /><span>{ou}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : null}
                        <div className="form-group">
                            <label>Or Select Stations Explicitly:</label>
                            <div className="stations-checklist-box">
                                {allStations.map(st => {
                                    const isSelected = assignedHostnames.includes(st.hostname);
                                    return (
                                        <div key={st.hostname} className={`check-item ${isSelected ? 'selected' : ''}`} onClick={() => handleToggleHost(st.hostname)}>
                                            <input type="checkbox" checked={isSelected} readOnly /><span>{st.displayName || st.hostname}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="modal-actions">
                        {initialData && <button type="button" className="btn-delete" onClick={() => onDelete(initialData.id)}>Delete Tab</button>}
                        <div className="right-actions">
                            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn-save">Save Tab</button>
                        </div>
                    </div>
                </form>
            </div>
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