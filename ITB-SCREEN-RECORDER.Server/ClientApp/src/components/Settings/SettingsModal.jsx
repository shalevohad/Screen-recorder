import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import AgentOperationsTab from './tabs/AgentOperationsTab';
import StorageRetentionTab from './tabs/StorageRetentionTab';
import StationOverridesTab from './tabs/StationOverridesTab';
import './SettingsModal.scss';
import './styles/_commonControls.scss';
import './styles/_agentOperations.scss';
import './styles/_storageRetention.scss';
import './styles/_stationOverrides.scss';

export default function SettingsModal({ onClose, onSettingsSaved }) {
    const modalBoxRef = useRef(null);
    const [form, setForm] = useState(null);
    const [status, setStatus] = useState({ loading: true, saving: false, error: null, saved: false });
    const [headerBottom, setHeaderBottom] = useState(112);
    const [activeTab, setActiveTab] = useState('agent');

    const [stations, setStations] = useState([]);
    const [overrides, setOverrides] = useState({});

    const updateHeaderOffset = useCallback(() => {
        const headerEl = document.querySelector('.command-center-top-bar');
        if (headerEl) {
            const rect = headerEl.getBoundingClientRect();
            setHeaderBottom(Math.round(rect.bottom + 12));
        }
    }, []);

    useEffect(() => {
        updateHeaderOffset();
        window.addEventListener('resize', updateHeaderOffset);
        window.addEventListener('scroll', updateHeaderOffset, { passive: true });
        return () => {
            window.removeEventListener('resize', updateHeaderOffset);
            window.removeEventListener('scroll', updateHeaderOffset);
        };
    }, [updateHeaderOffset]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const parseBitrateToKbps = (val) => {
        if (!val) return 5000;
        const str = String(val).trim().toUpperCase();
        if (str.endsWith('M')) return Math.round(parseFloat(str.replace('M', '')) * 1000);
        if (str.endsWith('K')) return parseInt(str.replace('K', ''), 10);
        const parsed = parseInt(str, 10);
        return isNaN(parsed) ? 5000 : parsed;
    };

    const loadData = useCallback(async () => {
        try {
            const [settingsRes, stationsRes, overridesRes] = await Promise.all([
                fetch('/api/v1/settings'),
                fetch('/api/v1/dashboard/stations'),
                fetch('/api/v1/dashboard/stations/overrides')
            ]);

            if (!settingsRes.ok) throw new Error(`Failed settings (${settingsRes.status})`);
            const settingsData = await settingsRes.json();
            settingsData.defaultVideoBitrateKbps = parseBitrateToKbps(settingsData.defaultVideoBitrate);
            setForm(settingsData);

            if (stationsRes.ok) setStations(await stationsRes.json());
            if (overridesRes.ok) {
                const overridesData = await overridesRes.json();
                const mapped = {};
                Object.keys(overridesData || {}).forEach(k => {
                    mapped[k.toUpperCase()] = overridesData[k];
                });
                setOverrides(mapped);
            }

            setStatus(s => ({ ...s, loading: false }));
        } catch (err) {
            setStatus(s => ({ ...s, loading: false, error: err.message }));
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const updateField = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
    const updateStorageField = (field, value) => setForm(prev => ({ ...prev, storage: { ...prev.storage, [field]: value } }));

    const handleSave = async (e) => {
        e.preventDefault();
        setStatus(s => ({ ...s, saving: true, error: null, saved: false }));

        const payload = {
            ...form,
            recordingRetentionDays: form.storage.retentionDays,
            defaultVideoBitrate: `${form.defaultVideoBitrateKbps}k`
        };

        try {
            const response = await fetch('/api/v1/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error(`Failed to save settings (${response.status})`);

            const saved = await response.json();
            saved.defaultVideoBitrateKbps = parseBitrateToKbps(saved.defaultVideoBitrate);
            setForm(saved);
            setStatus(s => ({ ...s, saving: false, saved: true }));

            if (onSettingsSaved) onSettingsSaved(saved);
            setTimeout(() => onClose(), 300);
        } catch (err) {
            setStatus(s => ({ ...s, saving: false, error: err.message }));
        }
    };

    const handleSaveOverride = async (hostname, targetFps, bitrateKbps) => {
        try {
            const payload = { targetFps, videoBitrate: `${bitrateKbps}k` };
            const res = await fetch(`/api/v1/dashboard/stations/${hostname}/override`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                setOverrides(prev => ({ ...prev, [hostname.toUpperCase()]: payload }));
                if (onSettingsSaved) onSettingsSaved();
            }
        } catch (err) {
            console.error('Failed to set override:', err);
        }
    };

    const handleResetOverride = async (hostname) => {
        try {
            const res = await fetch(`/api/v1/dashboard/stations/${hostname}/override`, { method: 'DELETE' });
            if (res.ok) {
                setOverrides(prev => {
                    const copy = { ...prev };
                    delete copy[hostname.toUpperCase()];
                    return copy;
                });
                if (onSettingsSaved) onSettingsSaved();
            }
        } catch (err) {
            console.error('Failed to reset override:', err);
        }
    };

    const modalContent = (
        <div
            className="settings-modal-backdrop"
            style={{ '--header-bottom-offset': `${headerBottom}px` }}
        >
            <aside ref={modalBoxRef} className="settings-modal-box" dir="ltr">
                <div className="settings-modal-header">
                    <div className="header-title-group">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="header-icon">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                        <h2>SYSTEM CONFIGURATION</h2>
                    </div>
                    <button onClick={onClose} className="settings-modal-close-btn" title="Close (ESC)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className="settings-tabs-nav">
                    <button
                        type="button"
                        className={`tab-btn ${activeTab === 'agent' ? 'active' : ''}`}
                        onClick={() => setActiveTab('agent')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="tab-icon">
                            <rect x="2" y="3" width="20" height="14" rx="2" />
                            <line x1="8" y1="21" x2="16" y2="21" />
                            <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                        Agent Operations
                    </button>
                    <button
                        type="button"
                        className={`tab-btn ${activeTab === 'storage' ? 'active' : ''}`}
                        onClick={() => setActiveTab('storage')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="tab-icon">
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                        </svg>
                        Storage & Retention
                    </button>
                    <button
                        type="button"
                        className={`tab-btn ${activeTab === 'stations' ? 'active' : ''}`}
                        onClick={() => setActiveTab('stations')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="tab-icon">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                        Station Overrides
                    </button>
                </div>

                <div className="settings-modal-body">
                    {status.loading && (
                        <div className="settings-loader-box">
                            <div className="connection-pulse-container">
                                <div className="pulse-dot-amber"></div>
                                <div className="pulse-ring"></div>
                            </div>
                            <span className="settings-status">Loading configuration parameters…</span>
                        </div>
                    )}

                    {!status.loading && status.error && !form && (
                        <div className="settings-error-banner">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <span>{status.error}</span>
                        </div>
                    )}

                    {form && (
                        <form id="settingsForm" onSubmit={handleSave}>
                            {activeTab === 'agent' && (
                                <AgentOperationsTab form={form} updateField={updateField} />
                            )}
                            {activeTab === 'storage' && (
                                <StorageRetentionTab form={form} updateField={updateField} updateStorageField={updateStorageField} />
                            )}
                            {activeTab === 'stations' && (
                                <StationOverridesTab
                                    stations={stations}
                                    overrides={overrides}
                                    defaultTargetFps={form.defaultTargetFps}
                                    defaultVideoBitrateKbps={form.defaultVideoBitrateKbps}
                                    onSaveOverride={handleSaveOverride}
                                    onResetOverride={handleResetOverride}
                                />
                            )}
                        </form>
                    )}
                </div>

                <div className="settings-footer">
                    <div className="status-container">
                        {status.error && <span className="settings-status settings-status-error">{status.error}</span>}
                        {status.saved && !status.error && <span className="settings-status settings-status-ok">Configuration Saved</span>}
                    </div>
                    <div className="footer-actions">
                        <button type="button" className="settings-cancel-btn" onClick={onClose}>
                            Close
                        </button>
                        {activeTab !== 'stations' && (
                            <button
                                type="submit"
                                form="settingsForm"
                                className="settings-save-btn"
                                disabled={status.saving || status.loading}
                            >
                                {status.saving ? 'Saving…' : 'Save Changes'}
                            </button>
                        )}
                    </div>
                </div>
            </aside>
        </div>
    );

    return createPortal(modalContent, document.body);
}