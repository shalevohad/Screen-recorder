import { useState, useEffect, useMemo } from 'react';
import RangeSlider from './RangeSlider';
import './TabConfigModal.scss';

export default function TabConfigModal({
    initialData,
    allStations = [],
    onSave,
    onDelete,
    onClose
}) {
    const [name, setName] = useState(initialData?.name || '');
    const [assignedHostnames, setAssignedHostnames] = useState(initialData?.assignedHostnames || []);
    const [assignedOus, setAssignedOus] = useState(initialData?.assignedOus || []);
    const [adSettings, setAdSettings] = useState({ isEnabled: false, availableOus: [], loading: true });

    const [enableBitrate, setEnableBitrate] = useState(!!initialData?.defaultBitrate);
    const [defaultBitrate, setDefaultBitrate] = useState(initialData?.defaultBitrate || 2500);

    const [enableFps, setEnableFps] = useState(!!initialData?.defaultFps);
    const [defaultFps, setDefaultFps] = useState(initialData?.defaultFps || 30);

    // שדה חיפוש תחנות ייעודי
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.ok ? res.json() : {})
            .then(data => {
                const isActive = data?.activeDirectory?.enabled || data?.adSettings?.enabled;
                const ousList = data?.activeDirectory?.ouList || data?.adSettings?.ous || [];
                if (isActive) {
                    setAdSettings({ isEnabled: true, availableOus: ousList, loading: false });
                } else {
                    setAdSettings({
                        isEnabled: true,
                        availableOus: ['TelAviv-HQ', 'Operations', 'North-Branch', 'South-Branch', 'DevOps'],
                        loading: false
                    });
                }
            })
            .catch(() => setAdSettings({ isEnabled: false, availableOus: [], loading: false }));
    }, []);

    const handleToggleHost = (hostname) => {
        setAssignedHostnames(prev =>
            prev.includes(hostname) ? prev.filter(h => h !== hostname) : [...prev, hostname]
        );
    };

    const handleRemoveHost = (hostname, e) => {
        e?.stopPropagation();
        setAssignedHostnames(prev => prev.filter(h => h !== hostname));
    };

    const handleToggleOu = (ou) => {
        setAssignedOus(prev =>
            prev.includes(ou) ? prev.filter(o => o !== ou) : [...prev, ou]
        );
    };

    // סינון תחנות לפי שדה החיפוש
    const filteredStations = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return allStations;
        return allStations.filter(st =>
            (st.hostname && st.hostname.toLowerCase().includes(q)) ||
            (st.displayName && st.displayName.toLowerCase().includes(q)) ||
            (st.ipAddress && st.ipAddress.includes(q))
        );
    }, [allStations, searchQuery]);

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
        <div className="tab-config-modal-backdrop" onClick={onClose}>
            <div className="tab-config-modal-card" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal-title">{initialData ? 'Configure Fleet Tab' : 'Create New Fleet Tab'}</h3>

                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label className="field-label">Tab Name:</label>
                        <input
                            type="text"
                            className="tab-name-input"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="e.g. Command Center, North Branch"
                            required
                        />
                    </div>

                    <div className="config-section">
                        <div className="section-title">Batch Stream Policy</div>
                        <div className="form-row">
                            <div className="form-group slider-group-wrapper">
                                <div className="toggle-header">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={enableBitrate}
                                            onChange={e => setEnableBitrate(e.target.checked)}
                                        />
                                        <span>Override Default Bitrate</span>
                                    </label>
                                </div>
                                <RangeSlider
                                    label="Bitrate Limit"
                                    value={defaultBitrate}
                                    min={500}
                                    max={10000}
                                    step={100}
                                    unit="k"
                                    disabled={!enableBitrate}
                                    onChange={setDefaultBitrate}
                                />
                            </div>

                            <div className="form-group slider-group-wrapper">
                                <div className="toggle-header">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={enableFps}
                                            onChange={e => setEnableFps(e.target.checked)}
                                        />
                                        <span>Override Default FPS</span>
                                    </label>
                                </div>
                                <RangeSlider
                                    label="FPS Limit"
                                    value={defaultFps}
                                    min={10}
                                    max={60}
                                    step={5}
                                    unit=" fps"
                                    disabled={!enableFps}
                                    onChange={setDefaultFps}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="config-section">
                        <div className="section-title">Tab Assignment Logic</div>

                        {adSettings.loading ? (
                            <div className="form-group"><span className="loading-text">Fetching AD config...</span></div>
                        ) : adSettings.isEnabled ? (
                            <div className="form-group">
                                <label className="field-label">Assign by Active Directory OUs:</label>
                                <div className="stations-checklist-box ad-box">
                                    {adSettings.availableOus.map(ou => {
                                        const isSelected = assignedOus.includes(ou);
                                        return (
                                            <div
                                                key={ou}
                                                className={`check-item ${isSelected ? 'selected' : ''}`}
                                                onClick={() => handleToggleOu(ou)}
                                            >
                                                <input type="checkbox" checked={isSelected} readOnly />
                                                <span>{ou}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : null}

                        {/* 💡 1. תיבת תגיות של התחנות שנבחרו - עם מחיקה בקליק */}
                        <div className="form-group">
                            <label className="field-label">
                                Assigned Stations ({assignedHostnames.length}):
                            </label>
                            <div className="assigned-stations-chip-box">
                                {assignedHostnames.length === 0 ? (
                                    <span className="chips-placeholder">
                                        No stations assigned. Search and select from the list below:
                                    </span>
                                ) : (
                                    assignedHostnames.map(hostname => {
                                        const st = allStations.find(s => s.hostname === hostname);
                                        const label = st?.displayName || hostname;
                                        return (
                                            <span key={hostname} className="station-chip-pill">
                                                <span className="chip-name">{label}</span>
                                                <button
                                                    type="button"
                                                    className="chip-remove-btn"
                                                    onClick={(e) => handleRemoveHost(hostname, e)}
                                                    title={`Remove ${label}`}
                                                >
                                                    ✕
                                                </button>
                                            </span>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        {/* 💡 2. שדה חיפוש מהיר לתחנות */}
                        <div className="form-group">
                            <label className="field-label">Or Select Stations Explicitly:</label>
                            <div className="station-search-filter-field">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="search-icon">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search stations by name or IP..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        className="clear-search-btn"
                                        onClick={() => setSearchQuery('')}
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>

                            {/* רשימת תחנות נגללת עם אינדיקטור בחירה */}
                            <div className="stations-checklist-box">
                                {filteredStations.length === 0 ? (
                                    <div className="no-results-msg">No stations match "{searchQuery}"</div>
                                ) : (
                                    filteredStations.map(st => {
                                        const isSelected = assignedHostnames.includes(st.hostname);
                                        return (
                                            <div
                                                key={st.hostname}
                                                className={`check-item ${isSelected ? 'selected' : ''}`}
                                                onClick={() => handleToggleHost(st.hostname)}
                                            >
                                                <input type="checkbox" checked={isSelected} readOnly />
                                                <span className="st-name">{st.displayName || st.hostname}</span>
                                                {st.ipAddress && <span className="st-ip">{st.ipAddress}</span>}
                                                <span className="st-status">{isSelected ? '✓ ADDED' : '+ ADD'}</span>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="modal-actions">
                        {initialData ? (
                            <button
                                type="button"
                                className="btn-delete"
                                onClick={() => onDelete(initialData.id)}
                            >
                                Delete Tab
                            </button>
                        ) : <div />}

                        <div className="right-actions">
                            <button type="button" className="btn-cancel" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="submit" className="btn-save">
                                Save Tab
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}