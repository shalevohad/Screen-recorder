import { useState, useEffect, useCallback } from 'react';

export default function StorageRetentionTab({ form, updateField, updateStorageField }) {
    const [liveStorage, setLiveStorage] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchLiveStorage = useCallback(async () => {
        setIsRefreshing(true);
        try {
            const res = await fetch('/api/v1/settings/storage-status');
            if (res.ok) {
                const data = await res.json();
                setLiveStorage(data);
            }
        } catch (err) {
            console.error('Failed to query storage status:', err);
        } finally {
            setIsRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchLiveStorage();
    }, [fetchLiveStorage, form?.storage?.netAppUncPath, form?.storage?.localFallbackPath]);

    const formatBytes = (bytes) => {
        if (!bytes || bytes <= 0) return '0 B';
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
    };

    const retentionTicks = [
        { val: 7, label: '7d' },
        { val: 30, label: '30d' },
        { val: 90, label: '90d' },
        { val: 365, label: '1yr' }
    ];

    const quotaTicks = [
        { val: 100, label: '100G' },
        { val: 1000, label: '1TB' },
        { val: 10000, label: '10TB' },
        { val: 50000, label: '50TB' }
    ];

    const chunkTicks = [
        { val: 1, label: '1m' },
        { val: 5, label: '5m' },
        { val: 15, label: '15m' },
        { val: 60, label: '60m' }
    ];

    const renderSliderWithTicks = (value, min, max, step, onChange, ticks) => (
        <div className="range-with-input">
            <div className="slider-input-inline-row">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={Math.max(min, Math.min(max, Number(value) || min))}
                    onChange={e => onChange(Number(e.target.value))}
                    className="tactical-range-slider"
                />
                <input
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={e => onChange(Number(e.target.value))}
                    required
                />
            </div>

            <div className="slider-ticks-track">
                {ticks.map((tick) => {
                    const THUMB_RADIUS = 12;
                    const pct = ((tick.val - min) / (max - min)) * 100;
                    const isCurrent = Number(value) === tick.val;
                    return (
                        <button
                            key={tick.val}
                            type="button"
                            className={`tick-anchor ${isCurrent ? 'is-active' : ''}`}
                            style={{ left: `calc(${THUMB_RADIUS}px + (100% - ${THUMB_RADIUS * 2}px) * ${pct / 100})` }}
                            onClick={() => onChange(tick.val)}
                            title={`Set ${tick.label}`}
                        >
                            <span className="tick-pip"></span>
                            <span className="tick-text">{tick.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );

    const isAccessible = Boolean(liveStorage?.isAccessible);
    const isFallback = Boolean(liveStorage?.isFallbackActive);
    const usedPct = liveStorage?.usedPercent ?? 0;

    return (
        <fieldset className="settings-fieldset storage-retention-fieldset">
            <legend>Storage & Retention Policy</legend>

            {/* Real-time storage telemetry banner reflecting the currently active operational path */}
            {liveStorage && (
                <div className="live-storage-telemetry-banner">
                    <div className="banner-header-row">
                        <div className="pool-title-stack">
                            <span className={`status-beacon-dot ${isAccessible ? (isFallback ? 'warning' : 'healthy') : 'critical'}`} />
                            <span className="pool-tag">{liveStorage.storageLabel || (isFallback ? 'FALLBACK POOL' : 'STORAGE POOL')}</span>
                            <span className={`pool-state-badge ${isAccessible ? (isFallback ? 'fallback' : 'accessible') : ''}`}>
                                {isAccessible ? (isFallback ? 'Fallback Active (Local NVMe)' : 'Active & Reachable (Primary NetApp)') : 'Storage Unreachable'}
                            </span>
                        </div>
                        <button
                            type="button"
                            className="btn-refresh-telemetry"
                            onClick={fetchLiveStorage}
                            disabled={isRefreshing}
                            title="Verify and sample active storage path now"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}>
                                <path d="M23 4v6h-6M1 20v-6h6" />
                                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                            </svg>
                            <span>{isRefreshing ? 'Checking�' : 'Probe Path'}</span>
                        </button>
                    </div>

                    <div className="active-path-snippet">
                        <span className="path-label">Active Storage Path:</span>
                        <span className="path-val">{liveStorage.storagePath || 'None configured'}</span>
                    </div>

                    {isAccessible && liveStorage.totalSizeBytes > 0 && (
                        <div className="storage-capacity-bar-container">
                            <div className="capacity-stats-row">
                                <span>Used: <strong className="stats-val">{formatBytes(liveStorage.usedSizeBytes)} ({usedPct}%)</strong></span>
                                <span>Free: <strong className="stats-val">{formatBytes(liveStorage.freeSizeBytes)}</strong></span>
                                <span>Total: <strong className="stats-val">{formatBytes(liveStorage.totalSizeBytes)}</strong></span>
                            </div>
                            <div className="tactical-progress-track">
                                <div
                                    className={`tactical-progress-fill ${usedPct > 85 ? 'warning' : 'healthy'}`}
                                    style={{ width: `${Math.min(100, Math.max(0, usedPct))}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="settings-fields-row">
                <div className="settings-field">
                    <span>Retention Period (days)</span>
                    {renderSliderWithTicks(
                        form.storage?.retentionDays || 30,
                        1,
                        365,
                        1,
                        val => updateStorageField('retentionDays', val),
                        retentionTicks
                    )}
                </div>

                <div className="settings-field">
                    <span>Max Storage Quota (GB)</span>
                    {renderSliderWithTicks(
                        form.maxStorageQuotaGb || 1000,
                        10,
                        100000,
                        100,
                        val => updateField('maxStorageQuotaGb', val),
                        quotaTicks
                    )}
                </div>
            </div>

            <div className="settings-fields-row">
                <div className="settings-field">
                    <span>Chunk Interval (minutes)</span>
                    {renderSliderWithTicks(
                        form.storage?.chunkIntervalMinutes || 5,
                        1,
                        60,
                        1,
                        val => updateStorageField('chunkIntervalMinutes', val),
                        chunkTicks
                    )}
                </div>
            </div>

            <label className="settings-field">
                <span>NetApp UNC Path</span>
                <input
                    type="text"
                    value={form.storage.netAppUncPath}
                    onChange={e => updateStorageField('netAppUncPath', e.target.value)}
                    required
                />
            </label>

            <label className="settings-field">
                <span>Local Fallback Path</span>
                <input
                    type="text"
                    value={form.storage.localFallbackPath}
                    onChange={e => updateStorageField('localFallbackPath', e.target.value)}
                    required
                />
            </label>

            <label className="settings-field">
                <span>Chunk Event Log Path</span>
                <input
                    type="text"
                    value={form.storage.chunkEventLogPath}
                    onChange={e => updateStorageField('chunkEventLogPath', e.target.value)}
                    required
                />
            </label>

            <label className="settings-field">
                <span>Recording Segment Container Format</span>
                <select
                    value={form.storage.recordFormat || 'fmp4'}
                    onChange={e => updateStorageField('recordFormat', e.target.value)}
                    className="tactical-select"
                >
                    <option value="fmp4">fMP4 (Fragmented MP4 - Crash Resilient & Clock Aligned)</option>
                    <option value="mp4">MP4 (Standard ISO MP4)</option>
                    <option value="mkv">MKV (Matroska Container)</option>
                </select>
            </label>
        </fieldset>
    );
}