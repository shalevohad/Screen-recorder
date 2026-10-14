// ==========================================
// File: src/components/Settings/tabs/StationsRolesTab.jsx
// ==========================================
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';

export default function StationsRolesTab({ stations = [], onRolesUpdated }) {
    const [roleAliases, setRoleAliases] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [editingHost, setEditingHost] = useState(null);
    const [tempAlias, setTempAlias] = useState('');

    // ניהול ייבוא CSV ו-Diff Preview
    const [diffPreview, setDiffPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isApplying, setIsApplying] = useState(false);
    const fileInputRef = useRef(null);

    const fetchRoles = useCallback(async () => {
        try {
            const res = await fetch('/api/v1/stations/roles');
            if (res.ok) {
                const data = await res.json();
                setRoleAliases(data || {});
            }
        } catch (err) {
            console.error('[StationsRolesTab] Failed fetching station roles:', err);
        }
    }, []);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    const handleStartEdit = (hostname) => {
        setEditingHost(hostname);
        setTempAlias(roleAliases[hostname] || '');
    };

    const handleSaveInline = async (hostname) => {
        try {
            const res = await fetch(`/api/v1/stations/roles/${hostname}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ roleAlias: tempAlias.trim() || null })
            });
            if (res.ok) {
                setRoleAliases(prev => {
                    const copy = { ...prev };
                    if (tempAlias.trim()) {
                        copy[hostname] = tempAlias.trim();
                    } else {
                        delete copy[hostname];
                    }
                    return copy;
                });
                setEditingHost(null);
                onRolesUpdated?.();
            }
        } catch (err) {
            console.error('[StationsRolesTab] Failed updating role alias:', err);
        }
    };

    const handleFileSelect = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setIsUploading(true);
        try {
            const res = await fetch('/api/v1/stations/roles/upload-mapping', {
                method: 'POST',
                body: formData
            });
            if (res.ok) {
                const diffData = await res.json();
                setDiffPreview(diffData);
            } else {
                alert('Failed parsing mapping file. Ensure CSV has header: Hostname,RoleAlias');
            }
        } catch (err) {
            console.error('[StationsRolesTab] Upload preview error:', err);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleApplyDiff = async () => {
        if (!diffPreview || diffPreview.length === 0) return;

        setIsApplying(true);
        try {
            const payload = {
                mappings: diffPreview.map(item => ({
                    hostname: item.hostname,
                    roleAlias: item.newRoleAlias
                }))
            };

            const res = await fetch('/api/v1/stations/roles/apply-mapping', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                await fetchRoles();
                setDiffPreview(null);
                onRolesUpdated?.();
            }
        } catch (err) {
            console.error('[StationsRolesTab] Failed applying mappings:', err);
        } finally {
            setIsApplying(false);
        }
    };

    const handleExportCsv = () => {
        window.open('/api/v1/stations/roles/export-mapping', '_blank');
    };

    const filteredStations = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return stations.filter(st => {
            const host = (st.hostname || '').toLowerCase();
            const alias = (roleAliases[st.hostname] || '').toLowerCase();
            const ip = (st.ipAddress || st.ip || '').toLowerCase();
            return !q || host.includes(q) || alias.includes(q) || ip.includes(q);
        });
    }, [stations, roleAliases, searchQuery]);

    return (
        <fieldset className="settings-fieldset stations-roles-fieldset">
            <legend>Fleet Station Identity & Operational Roles</legend>

            <div className="stations-roles-toolbar">
                <div className="search-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="search-icon">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search stations by hostname, role alias or IP..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button type="button" className="clear-search-btn" onClick={() => setSearchQuery('')}>✕</button>
                    )}
                </div>

                <div className="toolbar-actions">
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept=".csv"
                        style={{ display: 'none' }}
                        onChange={handleFileSelect}
                    />
                    <button
                        type="button"
                        className="btn-action secondary"
                        disabled={isUploading}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <span>{isUploading ? 'Analyzing...' : 'Import CSV'}</span>
                    </button>

                    <button
                        type="button"
                        className="btn-action secondary"
                        onClick={handleExportCsv}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        <span>Export CSV</span>
                    </button>
                </div>
            </div>

            <div className="stations-roles-table-wrapper">
                <table className="stations-roles-table">
                    <thead>
                        <tr>
                            <th style={{ width: '22%' }}>HOSTNAME (PHYSICAL)</th>
                            <th style={{ width: '38%' }}>ROLE ALIAS (OPERATIONAL NAME)</th>
                            <th style={{ width: '20%' }}>IP ADDRESS</th>
                            <th style={{ width: '20%', textAlign: 'right' }}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStations.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="empty-row">No stations found matching "{searchQuery}"</td>
                            </tr>
                        ) : (
                            filteredStations.map(st => {
                                const currentAlias = roleAliases[st.hostname];
                                const isEditing = editingHost === st.hostname;

                                return (
                                    <tr key={st.hostname} className={currentAlias ? 'has-alias' : ''}>
                                        <td className="hostname-cell">
                                            <span className="host-text">{st.hostname}</span>
                                        </td>
                                        <td className="alias-cell">
                                            {isEditing ? (
                                                <div className="inline-edit-box">
                                                    <input
                                                        type="text"
                                                        value={tempAlias}
                                                        onChange={e => setTempAlias(e.target.value)}
                                                        placeholder="e.g. עמדת מפקד / Radar 01"
                                                        autoFocus
                                                        onKeyDown={e => {
                                                            if (e.key === 'Enter') handleSaveInline(st.hostname);
                                                            if (e.key === 'Escape') setEditingHost(null);
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                <span className={`alias-text ${!currentAlias ? 'empty' : ''}`}>
                                                    {currentAlias || '— None (Default Hostname) —'}
                                                </span>
                                            )}
                                        </td>
                                        <td className="ip-cell">{st.ipAddress || st.ip || 'N/A'}</td>
                                        <td className="actions-cell">
                                            {isEditing ? (
                                                <div className="btn-group">
                                                    <button
                                                        type="button"
                                                        className="btn-tbl-sm save"
                                                        onClick={() => handleSaveInline(st.hostname)}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn-tbl-sm cancel"
                                                        onClick={() => setEditingHost(null)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="btn-tbl-sm edit"
                                                    onClick={() => handleStartEdit(st.hostname)}
                                                >
                                                    Edit Alias
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* דיאלוג תצוגת שינויים (Diff Preview Modal) */}
            {diffPreview && (
                <div className="diff-modal-backdrop" onClick={() => setDiffPreview(null)}>
                    <div className="diff-modal-card" onClick={e => e.stopPropagation()}>
                        <div className="diff-modal-header">
                            <div className="title-group">
                                <span className="badge">CSV STAGED CHANGES</span>
                                <h3>Station Role Mappings Preview</h3>
                            </div>
                            <span className="diff-count">
                                {diffPreview.filter(d => d.hasChanged).length} Modified of {diffPreview.length} Rows
                            </span>
                        </div>

                        <div className="diff-table-container">
                            <table className="diff-table">
                                <thead>
                                    <tr>
                                        <th>HOSTNAME</th>
                                        <th>CURRENT ALIAS</th>
                                        <th>NEW ALIAS (CSV)</th>
                                        <th>STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {diffPreview.map(row => (
                                        <tr key={row.hostname} className={row.hasChanged ? 'row-changed' : 'row-unchanged'}>
                                            <td className="host-text">{row.hostname}</td>
                                            <td className="curr-alias">{row.currentRoleAlias || '—'}</td>
                                            <td className="new-alias">{row.newRoleAlias || '— (Clear)'}</td>
                                            <td className="status-cell">
                                                {row.hasChanged ? (
                                                    <span className="tag-changed">UPDATE</span>
                                                ) : (
                                                    <span className="tag-unchanged">UNCHANGED</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="diff-modal-actions">
                            <button
                                type="button"
                                className="btn-cancel"
                                disabled={isApplying}
                                onClick={() => setDiffPreview(null)}
                            >
                                Discard
                            </button>
                            <button
                                type="button"
                                className="btn-apply"
                                disabled={isApplying}
                                onClick={handleApplyDiff}
                            >
                                {isApplying ? 'Applying Mappings…' : 'Apply Mappings to Fleet'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </fieldset>
    );
}