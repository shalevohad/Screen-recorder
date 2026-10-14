// ==========================================
// File: Client/src/components/Settings/SettingsView.jsx
// ==========================================
import { useState, useEffect, useCallback } from 'react';
import AgentOperationsTab from './tabs/AgentOperationsTab';
import StorageRetentionTab from './tabs/StorageRetentionTab';
import StationOverridesTab from './tabs/StationOverridesTab';
import StationsRolesTab from './tabs/StationsRolesTab';
import SecurityAccessTab from './tabs/SecurityAccessTab';
import MaintenanceTab from './tabs/MaintenanceTab';

import './SettingsView.scss';
import './styles/_commonControls.scss';
import './styles/_agentOperations.scss';
import './styles/_storageRetention.scss';
import './styles/_stationOverrides.scss';
import './styles/_maintenanceTab.scss';
import './styles/_stationsRolesTab.scss';
import './styles/_securityAccessTab.scss';

export default function SettingsView({ onReturnToPortal, onSettingsSaved }) {
    const [activeTab, setActiveTab] = useState('agent');
    const [form, setForm] = useState(null);
    const [stations, setStations] = useState([]);
    const [overrides, setOverrides] = useState({});
    const [status, setStatus] = useState({ loading: true, saving: false, error: null, saved: false });

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

            if (!settingsRes.ok) throw new Error(`Server returned ${settingsRes.status}`);
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

    const handleSaveGlobalConfig = async (e) => {
        e.preventDefault();
        setStatus(s => ({ ...s, saving: true, error: null, saved: false }));

        const payload = {
            ...form,
            recordingRetentionDays: form.storage?.retentionDays,
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

    return (
        <div className="settings-hub-canvas full-page-hub" dir="ltr">
            <div className="settings-hub-header">
                <div className="hub-header-left">
                    {/* כפתור חזרה לשער המערכות (PORTAL) */}
                    <button type="button" className="btn-back-dashboard" onClick={onReturnToPortal} title="Return to Enterprise Portal Hub">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <rect x="3" y="3" width="7" height="7" rx="1.5" />
                            <rect x="14" y="3" width="7" height="7" rx="1.5" />
                            <rect x="14" y="14" width="7" height="7" rx="1.5" />
                            <rect x="3" y="14" width="7" height="7" rx="1.5" />
                        </svg>
                        <span>BACK TO PORTAL</span>
                    </button>
                    <div className="hub-title-stack">
                        <h2>SYSTEM SETTINGS & FLEET ADMINISTRATION</h2>
                        <span className="hub-subtitle">Centralized C2 Configuration • RBAC Security • Fleet Tuning</span>
                    </div>
                </div>

                <div className="hub-header-right">
                    {status.saved && <span className="status-badge ok">Configuration Synchronized</span>}
                    {status.error && <span className="status-badge err">Error: {status.error}</span>}
                </div>
            </div>

            <div className="settings-hub-nav-dock">
                <div className="nav-dock-track">
                    <button
                        type="button"
                        className={`dock-tab-pill ${activeTab === 'agent' ? 'active' : ''}`}
                        onClick={() => setActiveTab('agent')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="tab-glyph">
                            <rect x="2" y="3" width="20" height="14" rx="2" />
                            <line x1="8" y1="21" x2="16" y2="21" />
                            <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                        <span>Agent Operations</span>
                    </button>

                    <button
                        type="button"
                        className={`dock-tab-pill ${activeTab === 'storage' ? 'active' : ''}`}
                        onClick={() => setActiveTab('storage')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="tab-glyph">
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                        </svg>
                        <span>Storage & Retention</span>
                    </button>

                    <button
                        type="button"
                        className={`dock-tab-pill ${activeTab === 'overrides' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overrides')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="tab-glyph">
                            <line x1="4" y1="21" x2="4" y2="14" />
                            <line x1="4" y1="10" x2="4" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12" y2="3" />
                            <line x1="20" y1="21" x2="20" y2="16" />
                            <line x1="20" y1="12" x2="20" y2="3" />
                            <line x1="1" y1="14" x2="7" y2="14" />
                            <line x1="9" y1="8" x2="15" y2="8" />
                            <line x1="17" y1="16" x2="23" y2="16" />
                        </svg>
                        <span>Station Overrides</span>
                    </button>

                    <button
                        type="button"
                        className={`dock-tab-pill ${activeTab === 'stations-roles' ? 'active' : ''}`}
                        onClick={() => setActiveTab('stations-roles')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="tab-glyph">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                        <span>Stations & Roles</span>
                    </button>

                    <button
                        type="button"
                        className={`dock-tab-pill ${activeTab === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="tab-glyph">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <span>Security & Access</span>
                    </button>

                    <button
                        type="button"
                        className={`dock-tab-pill ${activeTab === 'maintenance' ? 'active' : ''}`}
                        onClick={() => setActiveTab('maintenance')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="tab-glyph">
                            <ellipse cx="12" cy="5" rx="9" ry="3" />
                            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                        </svg>
                        <span>Maintenance</span>
                    </button>
                </div>
            </div>

            <div className="settings-hub-workspace">
                {status.loading ? (
                    <div className="settings-loader-box">Loading configuration parameters…</div>
                ) : (
                    <div className="workspace-inner-content">
                        {activeTab === 'agent' && form && (
                            <form id="globalSettingsForm" onSubmit={handleSaveGlobalConfig}>
                                <AgentOperationsTab form={form} updateField={updateField} />
                                <div className="hub-footer-actions">
                                    <button type="submit" className="btn-save-global" disabled={status.saving}>
                                        {status.saving ? 'Saving Changes…' : 'Save Agent Operations'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {activeTab === 'storage' && form && (
                            <form id="globalSettingsForm" onSubmit={handleSaveGlobalConfig}>
                                <StorageRetentionTab
                                    form={form}
                                    updateField={updateField}
                                    updateStorageField={updateStorageField}
                                />
                                <div className="hub-footer-actions">
                                    <button type="submit" className="btn-save-global" disabled={status.saving}>
                                        {status.saving ? 'Saving Changes…' : 'Save Storage Configuration'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {activeTab === 'overrides' && form && (
                            <StationOverridesTab
                                stations={stations}
                                overrides={overrides}
                                defaultTargetFps={form.defaultTargetFps}
                                defaultVideoBitrateKbps={form.defaultVideoBitrateKbps}
                                onSaveOverride={handleSaveOverride}
                                onResetOverride={handleResetOverride}
                            />
                        )}

                        {activeTab === 'stations-roles' && (
                            <StationsRolesTab
                                stations={stations}
                                onRolesUpdated={loadData}
                            />
                        )}

                        {activeTab === 'security' && (
                            <SecurityAccessTab />
                        )}

                        {activeTab === 'maintenance' && (
                            <MaintenanceTab />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}