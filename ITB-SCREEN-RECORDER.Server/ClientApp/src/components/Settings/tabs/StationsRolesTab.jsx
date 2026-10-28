// ==========================================
// File: src/components/Settings/tabs/StationsRolesTab.jsx
// ==========================================
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';

export default function StationsRolesTab({ stations = [], onRolesUpdated }) {
    const [roleAliases, setRoleAliases] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [editingHost, setEditingHost] = useState(null);
        const [tempAlias, setTempAlias] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const tableContainerRef = useRef(null);

    useEffect(() => {
        const updateTableCapacity = () => {
            const h = tableContainerRef.current?.clientHeight || (window.innerHeight - 380);
            const rowHeight = 44;
            const usableH = Math.max(180, h - 50);
            setItemsPerPage(Math.max(5, Math.floor(usableH / rowHeight)));
        };
        updateTableCapacity();
        window.addEventListener('resize', updateTableCapacity);
        return () => window.removeEventListener('resize', updateTableCapacity);
    }, []);

    // CSV Import and Diff Preview orchestration
    const [diffPreview, setDiffPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isApplying, setIsApplying] = useState(false);
    const fileInputRef = useRef(null);

    // Cross-Swap orchestration (????? ????)
    const [swapModal, setSwapModal] = useState(null);
    const [isSwapping, setIsSwapping] = useState(false);
    const [swapError, setSwapError] = useState(null);

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

    const handleOpenSwapModal = (initialHost = null) => {
        setSwapError(null);
        const hostList = stations.map(s => s.hostname).filter(Boolean);
        if (hostList.length < 2) {
            alert('At least two workstations are required to perform an alias swap.');
            return;
        }

        const hostA = initialHost || hostList[0];
        const hostB = hostList.find(h => h.toLowerCase() !== hostA.toLowerCase()) || hostList[1];
        setSwapModal({ stationA: hostA, stationB: hostB });
    };

    const handleExecuteSwap = async () => {
        if (!swapModal?.stationA || !swapModal?.stationB) return;
        if (swapModal.stationA.toLowerCase() === swapModal.stationB.toLowerCase()) {
            setSwapError('Please choose two different workstations to swap.');
            return;
        }

        setIsSwapping(true);
        setSwapError(null);

        try {
            const res = await fetch('/api/v1/stations/roles/swap', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    stationA: swapModal.stationA,
                    stationB: swapModal.stationB
                })
            });

            if (res.ok) {
                const hostA = swapModal.stationA;
                const hostB = swapModal.stationB;

                setRoleAliases(prev => {
                    const next = { ...prev };
                    const aliasA = prev[hostA] || null;
                    const aliasB = prev[hostB] || null;

                    if (aliasB) next[hostA] = aliasB; else delete next[hostA];
                    if (aliasA) next[hostB] = aliasA; else delete next[hostB];
                    return next;
                });

                setSwapModal(null);
                onRolesUpdated?.();
                window.dispatchEvent(new CustomEvent('itb-station-roles-updated', {
                    detail: { swapped: [hostA, hostB] }
                }));
            } else {
                const errData = await res.json().catch(() => ({}));
                setSwapError(errData.error || 'Failed swapping station aliases.');
            }
        } catch (err) {
            console.error('[StationsRolesTab] Failed swapping roles:', err);
            setSwapError('Network or server error occurred during swap.');
        } finally {
            setIsSwapping(false);
        }
    };

    const handleSaveInline = async (hostname) => {
        const cleanAlias = tempAlias.trim();
        const cleanLower = cleanAlias.toLowerCase();

        if (cleanLower) {
            const conflictHost = Object.keys(roleAliases).find(h =>
                h.toLowerCase() !== hostname.toLowerCase() &&
                (roleAliases[h] || '').trim().toLowerCase() === cleanLower
            );
            if (conflictHost) {
                alert(`The alias "${cleanAlias}" is already assigned to "${conflictHost}". Each station must have a unique role alias.`);
                return;
            }
        }

        try {
            const res = await fetch(`/api/v1/stations/roles/${hostname}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ roleAlias: cleanAlias || null })
            });
            if (res.ok) {
                setRoleAliases(prev => {
                    const copy = { ...prev };
                    if (cleanAlias) {
                        copy[hostname] = cleanAlias;
                    } else {
                        delete copy[hostname];
                    }
                    return copy;
                });
                setEditingHost(null);
                onRolesUpdated?.();
                window.dispatchEvent(new CustomEvent('itb-station-roles-updated', { detail: { hostname, roleAlias: cleanAlias } }));
            } else {
                const errData = await res.json().catch(() => ({}));
                alert(errData.error || 'Failed updating role alias due to a collision or server error.');
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

        const hasCollisions = diffPreview.some(item => Boolean(item.conflictWith));
        if (hasCollisions) {
            alert('Cannot apply mappings because there are role alias collisions. Each station must have a unique role alias.');
            return;
        }

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
                window.dispatchEvent(new CustomEvent('itb-station-roles-updated'));
            } else {
                const errData = await res.json().catch(() => ({}));
                alert(errData.error || 'Failed applying batch mapping.');
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

    const totalPages = Math.max(1, Math.ceil(filteredStations.length / itemsPerPage));
    const activePage = Math.min(currentPage, totalPages);
    const paginatedStations = filteredStations.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

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
                        onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    />
                    {searchQuery && (
                        <button type="button" className="clear-search-btn" onClick={() => { setSearchQuery(''); setCurrentPage(1); }}>?</button>
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

                    <button
                        type="button"
                        className="btn-action secondary"
                        onClick={() => handleOpenSwapModal()}
                        title="Swap operational names between two workstations (????? ????)"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 16V4M7 4L3 8M7 4L11 8" />
                            <path d="M17 8v12M17 20l4-4M17 20l-4-4" />
                        </svg>
                        <span>Swap Aliases (?????)</span>
                    </button>
                </div>
            </div>

            <div className="stations-roles-table-wrapper" ref={tableContainerRef}>
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
                            paginatedStations.map(st => {
                                const currentAlias = roleAliases[st.hostname];
                                const isEditing = editingHost === st.hostname;

                                const cleanTempAlias = (tempAlias || '').trim().toLowerCase();
                                const inlineConflictHost = isEditing && cleanTempAlias
                                    ? Object.keys(roleAliases).find(h =>
                                        h.toLowerCase() !== st.hostname.toLowerCase() &&
                                        (roleAliases[h] || '').trim().toLowerCase() === cleanTempAlias
                                    )
                                    : null;

                                return (
                                    <tr key={st.hostname} className={currentAlias ? 'has-alias' : ''}>
                                        <td className="hostname-cell">
                                            <span className="host-text">{st.hostname}</span>
                                        </td>
                                        <td className="alias-cell">
                                            {isEditing ? (
                                                <div className={`inline-edit-box ${inlineConflictHost ? 'has-collision' : ''}`}>
                                                    <input
                                                        type="text"
                                                        value={tempAlias}
                                                        onChange={e => setTempAlias(e.target.value)}
                                                        placeholder="e.g. Command Station / Radar 01"
                                                        autoFocus
                                                        onKeyDown={e => {
                                                            if (e.key === 'Enter' && !inlineConflictHost) handleSaveInline(st.hostname);
                                                            if (e.key === 'Escape') setEditingHost(null);
                                                        }}
                                                    />
                                                    {inlineConflictHost && (
                                                        <span className="inline-collision-warning" style={{ display: 'block', fontSize: '10.5px', color: '#F87171', marginTop: '3px', fontWeight: 'bold' }}>
                                                            ?? Already assigned to: {inlineConflictHost}
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className={`alias-text ${!currentAlias ? 'empty' : ''}`}>
                                                    {currentAlias || '� None (Default Hostname) �'}
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
                                                        disabled={Boolean(inlineConflictHost)}
                                                        title={inlineConflictHost ? `Cannot save: alias already taken by ${inlineConflictHost}` : 'Save alias'}
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
                                                <div className="btn-group">
                                                    <button
                                                        type="button"
                                                        className="btn-tbl-sm edit"
                                                        onClick={() => handleStartEdit(st.hostname)}
                                                    >
                                                        Edit Alias
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn-tbl-sm swap"
                                                        onClick={() => handleOpenSwapModal(st.hostname)}
                                                        title={`Swap operational name of ${st.hostname} with another station (?????)`}
                                                    >
                                                        ? Swap
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Staged changes preview dialog (Diff Preview Modal) */}
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
                                        <tr key={row.hostname} className={row.conflictWith ? 'row-conflict' : row.hasChanged ? 'row-changed' : 'row-unchanged'}>
                                            <td className="host-text">{row.hostname}</td>
                                            <td className="curr-alias">{row.currentRoleAlias || '�'}</td>
                                            <td className="new-alias">{row.newRoleAlias || '� (Clear)'}</td>
                                            <td className="status-cell">
                                                {row.conflictWith ? (
                                                    <span className="tag-conflict" style={{ color: '#F87171', fontWeight: 'bold' }}>
                                                        ?? COLLISION ({row.conflictWith})
                                                    </span>
                                                ) : row.hasChanged ? (
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
                                disabled={isApplying || diffPreview.some(r => Boolean(r.conflictWith))}
                                onClick={handleApplyDiff}
                                title={diffPreview.some(r => Boolean(r.conflictWith)) ? 'Cannot apply: alias collisions detected across stations' : 'Apply mappings'}
                            >
                                {isApplying ? 'Applying Mappings�' : 'Apply Mappings to Fleet'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Swap Station Aliases Modal (????? ???? ?????) */}
            {swapModal && (
                <div className="diff-modal-backdrop" onClick={() => setSwapModal(null)}>
                    <div className="swap-modal-card" onClick={e => e.stopPropagation()}>
                        <div className="diff-modal-header">
                            <div className="title-group">
                                <span className="badge">CROSS-SWAP (????? ????)</span>
                                <h3>Swap Operational Names Between Stations</h3>
                            </div>
                        </div>

                        <p className="swap-description">
                            Exchange role names directly between two workstations. The swap is executed atomically without triggering alias collision restrictions.
                        </p>

                        {swapError && (
                            <div className="swap-error-banner">
                                ?? {swapError}
                            </div>
                        )}

                        <div className="swap-selectors-grid">
                            {/* Station A Box */}
                            <div className="swap-station-box">
                                <div className="box-header">
                                    <span className="station-role-label">STATION 1</span>
                                    <span className="station-curr-badge">{roleAliases[swapModal.stationA] || '� No Alias'}</span>
                                </div>
                                <label className="field-label">Select Workstation:</label>
                                <select
                                    value={swapModal.stationA}
                                    onChange={e => setSwapModal(prev => ({ ...prev, stationA: e.target.value }))}
                                    className="swap-select"
                                >
                                    {stations.map(st => (
                                        <option key={st.hostname} value={st.hostname} disabled={st.hostname === swapModal.stationB}>
                                            {st.hostname} {roleAliases[st.hostname] ? `(${roleAliases[st.hostname]})` : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Invert Button */}
                            <div className="swap-center-arrow">
                                <button
                                    type="button"
                                    className="btn-flip-swap"
                                    onClick={() => setSwapModal(prev => ({ stationA: prev.stationB, stationB: prev.stationA }))}
                                    title="Invert Station 1 and Station 2"
                                >
                                    ?
                                </button>
                            </div>

                            {/* Station B Box */}
                            <div className="swap-station-box">
                                <div className="box-header">
                                    <span className="station-role-label">STATION 2</span>
                                    <span className="station-curr-badge">{roleAliases[swapModal.stationB] || '� No Alias'}</span>
                                </div>
                                <label className="field-label">Select Workstation:</label>
                                <select
                                    value={swapModal.stationB}
                                    onChange={e => setSwapModal(prev => ({ ...prev, stationB: e.target.value }))}
                                    className="swap-select"
                                >
                                    {stations.map(st => (
                                        <option key={st.hostname} value={st.hostname} disabled={st.hostname === swapModal.stationA}>
                                            {st.hostname} {roleAliases[st.hostname] ? `(${roleAliases[st.hostname]})` : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Visual Outcome Preview */}
                        <div className="swap-preview-card">
                            <span className="preview-heading">OUTCOME PREVIEW:</span>
                            <div className="preview-row">
                                <span className="preview-host">{swapModal.stationA}:</span>
                                <span className="preview-arrow">?</span>
                                <span className="preview-result">{roleAliases[swapModal.stationB] || '� (Clear)'}</span>
                            </div>
                            <div className="preview-row">
                                <span className="preview-host">{swapModal.stationB}:</span>
                                <span className="preview-arrow">?</span>
                                <span className="preview-result">{roleAliases[swapModal.stationA] || '� (Clear)'}</span>
                            </div>
                        </div>

                        <div className="diff-modal-actions">
                            <button
                                type="button"
                                className="btn-cancel"
                                disabled={isSwapping}
                                onClick={() => setSwapModal(null)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn-apply"
                                disabled={isSwapping || !swapModal.stationA || !swapModal.stationB || swapModal.stationA === swapModal.stationB}
                                onClick={handleExecuteSwap}
                            >
                                {isSwapping ? 'Swapping Aliases�' : 'Confirm Swap (???? ????)'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </fieldset>
    );
}