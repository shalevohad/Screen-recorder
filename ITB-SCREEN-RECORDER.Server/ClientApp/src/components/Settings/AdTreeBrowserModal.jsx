// ==========================================
// File: src/components/Settings/AdTreeBrowserModal.jsx
// ==========================================
import { useState, useEffect, useCallback, useMemo } from 'react';

export default function AdTreeBrowserModal({
    isOpen,
    onClose,
    onSelectEntities,
    alreadySelectedNames = []
}) {
    const [currentDn, setCurrentDn] = useState('');
    const [currentName, setCurrentName] = useState('');
    const [subOus, setSubOus] = useState([]);
    const [entities, setEntities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSimulated, setIsSimulated] = useState(false);
    const [simulatedMessage, setSimulatedMessage] = useState('');
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    // Multi-selection state inside modal: Map of samAccountName -> entity
    const [selectedMap, setSelectedMap] = useState({});

    // Filter inside current OU
    const [filterQuery, setFilterQuery] = useState('');

    // Global directory search
    const [globalSearchInput, setGlobalSearchInput] = useState('');
    const [isGlobalSearchActive, setIsGlobalSearchActive] = useState(false);
    const [globalResults, setGlobalResults] = useState([]);
    const [searchingGlobal, setSearchingGlobal] = useState(false);

    // Tree hierarchy state: map of dn -> array of child OUs for expansion
    const [treeCache, setTreeCache] = useState({});
    const [expandedDns, setExpandedDns] = useState(new Set());

    // Set of already mapped names (lowercase)
    const alreadyMappedSet = useMemo(() => {
        return new Set((alreadySelectedNames || []).map(n => (typeof n === 'string' ? n : n.groupName || '').toLowerCase()));
    }, [alreadySelectedNames]);

    const fetchOuData = useCallback(async (targetDn = '') => {
        setLoading(true);
        try {
            const url = targetDn 
                ? `/api/v1/settings/security/ad/browse?baseDn=${encodeURIComponent(targetDn)}`
                : '/api/v1/settings/security/ad/browse';
            
            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed loading AD tree data');
            const data = await res.json();

            setCurrentDn(data.currentDn || '');
            setCurrentName(data.currentName || 'Root Domain');
            setSubOus(data.subOus || []);
            setEntities(data.entities || []);
            setIsSimulated(Boolean(data.isSimulated));
            setSimulatedMessage(data.message || '');

            // Update tree cache
            if (data.currentDn) {
                setTreeCache(prev => ({
                    ...prev,
                    [data.currentDn]: data.subOus || []
                }));
                setExpandedDns(prev => new Set([...prev, data.currentDn]));
            }

            // Build breadcrumbs
            if (data.currentDn) {
                const parts = data.currentDn.split(',').map(p => p.trim());
                const crumbs = [];
                for (let i = parts.length - 1; i >= 0; i--) {
                    const dnSlice = parts.slice(i).join(',');
                    const part = parts[i];
                    const eqIndex = part.indexOf('=');
                    const label = eqIndex >= 0 ? part.substring(eqIndex + 1) : part;
                    crumbs.push({ dn: dnSlice, label });
                }
                setBreadcrumbs(crumbs);
            }
        } catch (err) {
            console.error('[AdTreeBrowserModal] Browse failed:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            fetchOuData('');
            setSelectedMap({});
            setFilterQuery('');
            setGlobalSearchInput('');
            setIsGlobalSearchActive(false);
            setGlobalResults([]);
        }
    }, [isOpen, fetchOuData]);

    // Handle Global Search across AD
    const handleTriggerGlobalSearch = async (e) => {
        e?.preventDefault();
        const q = globalSearchInput.trim();
        if (!q) {
            setIsGlobalSearchActive(false);
            return;
        }

        setSearchingGlobal(true);
        setIsGlobalSearchActive(true);
        try {
            const res = await fetch(`/api/v1/settings/security/ad/search?query=${encodeURIComponent(q)}&limit=50`);
            if (res.ok) {
                const data = await res.json();
                setGlobalResults(data.results || []);
                if (data.isSimulated) {
                    setIsSimulated(true);
                    setSimulatedMessage(data.message || '');
                }
            }
        } catch (err) {
            console.error('[AdTreeBrowserModal] Global search failed:', err);
        } finally {
            setSearchingGlobal(false);
        }
    };

    // Toggle entity selection
    const toggleEntitySelect = (entity) => {
        const key = entity.samAccountName;
        setSelectedMap(prev => {
            const next = { ...prev };
            if (next[key]) {
                delete next[key];
            } else {
                next[key] = entity;
            }
            return next;
        });
    };

    // Filtered entities in current OU
    const displayEntities = useMemo(() => {
        if (isGlobalSearchActive) {
            return globalResults;
        }
        if (!filterQuery.trim()) return entities;
        const q = filterQuery.toLowerCase();
        return entities.filter(e => 
            (e.samAccountName && e.samAccountName.toLowerCase().includes(q)) ||
            (e.displayName && e.displayName.toLowerCase().includes(q)) ||
            (e.description && e.description.toLowerCase().includes(q)) ||
            (e.type && e.type.toLowerCase().includes(q))
        );
    }, [isGlobalSearchActive, globalResults, entities, filterQuery]);

    // Select all displayed entities
    const handleSelectAllVisible = () => {
        setSelectedMap(prev => {
            const next = { ...prev };
            displayEntities.forEach(e => {
                next[e.samAccountName] = e;
            });
            return next;
        });
    };

    const handleClearSelection = () => {
        setSelectedMap({});
    };

    const handleConfirmSelection = () => {
        const selectedList = Object.values(selectedMap);
        if (selectedList.length === 0) return;
        onSelectEntities(selectedList);
        onClose();
    };

    const toggleOuExpand = (dn, e) => {
        e?.stopPropagation();
        setExpandedDns(prev => {
            const next = new Set(prev);
            if (next.has(dn)) {
                next.delete(dn);
            } else {
                next.add(dn);
                if (!treeCache[dn]) {
                    // Lazy load child OUs
                    fetch(`/api/v1/settings/security/ad/browse?baseDn=${encodeURIComponent(dn)}`)
                        .then(r => r.json())
                        .then(d => {
                            setTreeCache(c => ({ ...c, [dn]: d.subOus || [] }));
                        })
                        .catch(console.error);
                }
            }
            return next;
        });
    };

    if (!isOpen) return null;

    const selectedCount = Object.keys(selectedMap).length;

    return (
        <div className="security-modal-overlay ad-browser-overlay" onClick={onClose}>
            <div className="ad-browser-modal-card" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="ad-browser-header">
                    <div className="header-left">
                        <div className="ad-icon-badge">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v6m-3-3h6" />
                            </svg>
                        </div>
                        <div className="header-titles">
                            <h3>Active Directory Explorer & OU Tree</h3>
                            <span className="subtitle">
                                Browse directory tree, navigate Organizational Units (OUs), and assign AD Security Groups to operational roles.
                            </span>
                        </div>
                    </div>

                    <div className="header-right">
                        {isSimulated ? (
                            <span className="dc-status-pill simulated" title={simulatedMessage}>
                                <span className="status-dot simulated" />
                                <span>Directory Preview (Simulated)</span>
                            </span>
                        ) : (
                            <span className="dc-status-pill connected" title="Connected to Active Directory Domain Controller">
                                <span className="status-dot connected" />
                                <span>Live Domain Controller</span>
                            </span>
                        )}
                        <button type="button" className="btn-modal-close" onClick={onClose} title="Close Explorer">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Directory Global Search Bar */}
                <div className="ad-browser-search-bar">
                    <form className="global-search-form" onSubmit={handleTriggerGlobalSearch}>
                        <div className="search-input-dock">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search all AD Security Groups & Users across domain (e.g. C2_Admins, Operators, SOC)..."
                                value={globalSearchInput}
                                onChange={e => {
                                    setGlobalSearchInput(e.target.value);
                                    if (!e.target.value.trim() && isGlobalSearchActive) {
                                        setIsGlobalSearchActive(false);
                                    }
                                }}
                            />
                            {globalSearchInput && (
                                <button
                                    type="button"
                                    className="btn-clear-search"
                                    onClick={() => {
                                        setGlobalSearchInput('');
                                        setIsGlobalSearchActive(false);
                                    }}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        <button type="submit" className="btn-do-search" disabled={searchingGlobal}>
                            {searchingGlobal ? 'Searching…' : 'Domain Search'}
                        </button>
                    </form>
                </div>

                {/* Main Split Body: Left Tree | Right Entities */}
                <div className="ad-browser-body-grid">
                    {/* Left Pane: Hierarchical Tree Navigation */}
                    <div className="ou-tree-sidebar">
                        <div className="sidebar-header">
                            <span className="sidebar-title">ORGANIZATIONAL UNITS</span>
                            <button
                                type="button"
                                className="btn-tree-root"
                                onClick={() => {
                                    setIsGlobalSearchActive(false);
                                    fetchOuData('');
                                }}
                                title="Return to Domain Root"
                            >
                                Root
                            </button>
                        </div>

                        <div className="tree-scroll-container">
                            {/* Root Node */}
                            <div
                                className={`tree-node-item root ${currentDn === '' || currentDn.startsWith('DC=') && currentDn.split(',').length <= 2 ? 'active' : ''}`}
                                onClick={() => {
                                    setIsGlobalSearchActive(false);
                                    fetchOuData('');
                                }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15" className="tree-icon">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="2" y1="12" x2="22" y2="12" />
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                </svg>
                                <span className="node-label">Domain Root</span>
                            </div>

                            {/* Render OUs */}
                            <div className="tree-children-list">
                                {subOus.map(ou => {
                                    const isExpanded = expandedDns.has(ou.distinguishedName);
                                    const isSelected = currentDn === ou.distinguishedName;
                                    const cachedChildren = treeCache[ou.distinguishedName] || [];

                                    return (
                                        <div key={ou.distinguishedName} className="tree-node-group">
                                            <div
                                                className={`tree-node-item ${isSelected ? 'active' : ''}`}
                                                onClick={() => {
                                                    setIsGlobalSearchActive(false);
                                                    fetchOuData(ou.distinguishedName);
                                                }}
                                            >
                                                <button
                                                    type="button"
                                                    className={`tree-chevron ${isExpanded ? 'open' : ''}`}
                                                    onClick={(e) => toggleOuExpand(ou.distinguishedName, e)}
                                                    title={isExpanded ? 'Collapse' : 'Expand'}
                                                >
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                                                        <polyline points="9 18 15 12 9 6" />
                                                    </svg>
                                                </button>

                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15" className="tree-icon folder">
                                                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                                                </svg>

                                                <span className="node-label" title={ou.distinguishedName}>
                                                    {ou.name}
                                                </span>

                                                {ou.type === 'container' && (
                                                    <span className="node-type-tag">CN</span>
                                                )}
                                            </div>

                                            {/* Sub-children if expanded */}
                                            {isExpanded && cachedChildren.length > 0 && (
                                                <div className="tree-nested-level">
                                                    {cachedChildren.map(child => (
                                                        <div
                                                            key={child.distinguishedName}
                                                            className={`tree-node-item nested ${currentDn === child.distinguishedName ? 'active' : ''}`}
                                                            onClick={() => {
                                                                setIsGlobalSearchActive(false);
                                                                fetchOuData(child.distinguishedName);
                                                            }}
                                                        >
                                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" className="tree-icon">
                                                                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                                                            </svg>
                                                            <span className="node-label" title={child.distinguishedName}>
                                                                {child.name}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Pane: Entities in Current OU or Global Search Results */}
                    <div className="entities-content-pane">
                        {/* Location Bar & Breadcrumbs */}
                        <div className="pane-location-header">
                            <div className="location-breadcrumbs">
                                <span className="loc-label">LOCATION:</span>
                                {isGlobalSearchActive ? (
                                    <span className="crumb-active">Domain Search Results for &ldquo;{globalSearchInput}&rdquo;</span>
                                ) : (
                                    breadcrumbs.map((c, idx) => (
                                        <span key={c.dn} className="crumb-item">
                                            {idx > 0 && <span className="crumb-sep">/</span>}
                                            <button
                                                type="button"
                                                className={`crumb-btn ${idx === breadcrumbs.length - 1 ? 'current' : ''}`}
                                                onClick={() => fetchOuData(c.dn)}
                                            >
                                                {c.label}
                                            </button>
                                        </span>
                                    ))
                                )}
                            </div>

                            {!isGlobalSearchActive && (
                                <div className="quick-filter-box">
                                    <input
                                        type="text"
                                        placeholder="Filter in this OU..."
                                        value={filterQuery}
                                        onChange={e => setFilterQuery(e.target.value)}
                                    />
                                    {filterQuery && (
                                        <button type="button" onClick={() => setFilterQuery('')}>✕</button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Selection Action Ribbon */}
                        <div className="selection-toolbar">
                            <div className="toolbar-stats">
                                <span className="stat-count">
                                    {displayEntities.length} entities found {isGlobalSearchActive ? 'across domain' : 'in this container'}
                                </span>
                                {selectedCount > 0 && (
                                    <span className="selected-badge">
                                        {selectedCount} selected for role assignment
                                    </span>
                                )}
                            </div>

                            <div className="toolbar-buttons">
                                <button
                                    type="button"
                                    className="btn-select-all"
                                    onClick={handleSelectAllVisible}
                                    disabled={displayEntities.length === 0}
                                >
                                    Select All Visible
                                </button>
                                {selectedCount > 0 && (
                                    <button
                                        type="button"
                                        className="btn-clear-selection"
                                        onClick={handleClearSelection}
                                    >
                                        Clear Selection ({selectedCount})
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Entities List */}
                        <div className="entities-list-viewport">
                            {loading || searchingGlobal ? (
                                <div className="ad-loading-box">
                                    <div className="ad-spinner" />
                                    <span>Querying Active Directory Domain Controller…</span>
                                </div>
                            ) : displayEntities.length === 0 ? (
                                <div className="ad-empty-box">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="36" height="36">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                    <h5>No matching security entities found</h5>
                                    <p>Select another Organizational Unit from the tree or search for group names across the domain.</p>
                                </div>
                            ) : (
                                <div className="entities-grid">
                                    {displayEntities.map(entity => {
                                        const isSelected = Boolean(selectedMap[entity.samAccountName]);
                                        const isAlreadyMapped = alreadyMappedSet.has(entity.samAccountName.toLowerCase());

                                        return (
                                            <div
                                                key={entity.distinguishedName || entity.samAccountName}
                                                className={`ad-entity-card ${isSelected ? 'selected' : ''} ${isAlreadyMapped ? 'already-mapped' : ''}`}
                                                onClick={() => toggleEntitySelect(entity)}
                                            >
                                                <div className="card-checkbox-dock">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => toggleEntitySelect(entity)}
                                                        onClick={e => e.stopPropagation()}
                                                    />
                                                </div>

                                                <div className="card-icon-dock">
                                                    {entity.type === 'User' ? (
                                                        <div className="entity-avatar user" title="Domain User">
                                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                                <circle cx="12" cy="7" r="4" />
                                                            </svg>
                                                        </div>
                                                    ) : entity.type === 'Security Group' ? (
                                                        <div className="entity-avatar sec-group" title="Active Directory Security Group">
                                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                                            </svg>
                                                        </div>
                                                    ) : (
                                                        <div className="entity-avatar dist-group" title="Active Directory Distribution Group">
                                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                                <circle cx="9" cy="7" r="4" />
                                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="card-meta">
                                                    <div className="meta-top-row">
                                                        <span className="entity-sam-name">{entity.samAccountName}</span>
                                                        <div className="meta-badges">
                                                            <span className={`type-tag ${entity.type === 'Security Group' ? 'sec' : entity.type === 'User' ? 'user' : 'dist'}`}>
                                                                {entity.type}
                                                            </span>
                                                            {isAlreadyMapped && (
                                                                <span className="mapped-pill">Already Mapped</span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <span className="entity-display-name">{entity.displayName}</span>
                                                    {entity.description && (
                                                        <p className="entity-desc">{entity.description}</p>
                                                    )}
                                                    <span className="entity-dn-preview" title={entity.distinguishedName}>
                                                        {entity.distinguishedName}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="ad-browser-footer">
                    <div className="footer-left">
                        {selectedCount > 0 ? (
                            <span className="footer-selection-summary">
                                <strong>{selectedCount}</strong> Active Directory entities selected
                            </span>
                        ) : (
                            <span className="footer-hint">
                                Select one or more security groups above to assign to this role.
                            </span>
                        )}
                    </div>

                    <div className="footer-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn-confirm-add"
                            disabled={selectedCount === 0}
                            onClick={handleConfirmSelection}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Add Selected Entities ({selectedCount})</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
