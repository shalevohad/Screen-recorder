import { useEffect, useRef, useState } from 'react';
import '../styles/SettingsModal.css';

export default function SettingsModal({ onClose }) {
    const modalBoxRef = useRef(null);
    const [form, setForm] = useState(null);
    const [status, setStatus] = useState({ loading: true, saving: false, error: null, saved: false });

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    useEffect(() => {
        let isActive = true;
        (async () => {
            try {
                const response = await fetch('/api/v1/settings');
                if (!response.ok) throw new Error(`Failed to load settings (${response.status})`);
                const data = await response.json();
                if (isActive) {
                    setForm(data);
                    setStatus(s => ({ ...s, loading: false }));
                }
            } catch (err) {
                if (isActive) setStatus(s => ({ ...s, loading: false, error: err.message }));
            }
        })();
        return () => { isActive = false; };
    }, []);

    const handleBackdropClick = (e) => {
        if (modalBoxRef.current && !modalBoxRef.current.contains(e.target)) {
            onClose();
        }
    };

    const updateField = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
    const updateStorageField = (field, value) => setForm(prev => ({ ...prev, Storage: { ...prev.Storage, [field]: value } }));

    const handleSave = async (e) => {
        e.preventDefault();
        setStatus(s => ({ ...s, saving: true, error: null, saved: false }));
        try {
            const response = await fetch('/api/v1/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (!response.ok) {
                const problem = await response.json().catch(() => null);
                const message = problem?.errors
                    ? Object.values(problem.errors).flat().join(' ')
                    : `Failed to save settings (${response.status})`;
                throw new Error(message);
            }
            const saved = await response.json();
            setForm(saved);
            setStatus(s => ({ ...s, saving: false, saved: true }));
        } catch (err) {
            setStatus(s => ({ ...s, saving: false, error: err.message }));
        }
    };

    return (
        <div className="settings-modal-backdrop" onClick={handleBackdropClick}>
            <div ref={modalBoxRef} className="settings-modal-box">
                <div className="settings-modal-header">
                    <h2>SETTINGS</h2>
                    <button onClick={onClose} className="settings-modal-close-btn" title="Close (ESC)">✕</button>
                </div>

                <div className="settings-modal-body">
                    {status.loading && <p className="settings-status">Loading settings…</p>}
                    {!status.loading && status.error && !form && <p className="settings-status settings-status-error">{status.error}</p>}

                    {form && (
                        <form onSubmit={handleSave}>
                            <fieldset className="settings-fieldset">
                                <legend>System</legend>

                                <label className="settings-field">
                                    <span>Recording retention (days)</span>
                                    <input type="number" min={1} max={365} value={form.recordingRetentionDays}
                                        onChange={e => updateField('recordingRetentionDays', Number(e.target.value))} required />
                                </label>

                                <label className="settings-field">
                                    <span>Max storage quota (GB)</span>
                                    <input type="number" min={10} max={100000} value={form.maxStorageQuotaGb}
                                        onChange={e => updateField('maxStorageQuotaGb', Number(e.target.value))} required />
                                </label>

                                <label className="settings-field">
                                    <span>Dashboard refresh rate (ms)</span>
                                    <input type="number" min={500} max={60000} step={100} value={form.dashboardRefreshRateMs}
                                        onChange={e => updateField('dashboardRefreshRateMs', Number(e.target.value))} required />
                                </label>

                                <label className="settings-field">
                                    <span>Default video bitrate</span>
                                    <input type="text" placeholder="5M" pattern="^[1-5][Mm]$" value={form.defaultVideoBitrate}
                                        onChange={e => updateField('defaultVideoBitrate', e.target.value)} required />
                                </label>

                                <label className="settings-field">
                                    <span>Default target FPS</span>
                                    <input type="number" min={15} max={60} value={form.defaultTargetFps}
                                        onChange={e => updateField('defaultTargetFps', Number(e.target.value))} required />
                                </label>
                            </fieldset>

                            <fieldset className="settings-fieldset">
                                <legend>Storage</legend>

                                <label className="settings-field">
                                    <span>NetApp UNC path</span>
                                    <input type="text" value={form.storage.netAppUncPath}
                                        onChange={e => updateStorageField('netAppUncPath', e.target.value)} required />
                                </label>

                                <label className="settings-field">
                                    <span>Local fallback path</span>
                                    <input type="text" value={form.storage.localFallbackPath}
                                        onChange={e => updateStorageField('localFallbackPath', e.target.value)} required />
                                </label>

                                <label className="settings-field">
                                    <span>Chunk interval (minutes)</span>
                                    <input type="number" min={1} max={60} value={form.storage.chunkIntervalMinutes}
                                        onChange={e => updateStorageField('chunkIntervalMinutes', Number(e.target.value))} required />
                                </label>

                                <label className="settings-field">
                                    <span>Storage retention (days)</span>
                                    <input type="number" min={1} max={365} value={form.storage.retentionDays}
                                        onChange={e => updateStorageField('retentionDays', Number(e.target.value))} required />
                                </label>

                                <label className="settings-field">
                                    <span>Chunk event log path</span>
                                    <input type="text" value={form.storage.chunkEventLogPath}
                                        onChange={e => updateStorageField('chunkEventLogPath', e.target.value)} required />
                                </label>
                            </fieldset>

                            <div className="settings-footer">
                                {status.error && <span className="settings-status settings-status-error">{status.error}</span>}
                                {status.saved && !status.error && <span className="settings-status settings-status-ok">Saved</span>}
                                <button type="submit" className="settings-save-btn" disabled={status.saving}>
                                    {status.saving ? 'Saving…' : 'Save changes'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
