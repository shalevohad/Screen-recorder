import { useState } from 'react';

export default function StationOverridesTab({
    stations = [],
    overrides = {},
    defaultTargetFps,
    defaultVideoBitrateKbps,
    onSaveOverride,
    onResetOverride,
    onResetAllOverrides
}) {
    const [editingStation, setEditingStation] = useState(null);
    const [overrideFps, setOverrideFps] = useState(30);
    const [overrideBitrateKbps, setOverrideBitrateKbps] = useState(5000);

    const customOverridesCount = Object.keys(overrides).length;

    const fpsTicks = [
        { val: 10, label: '10' },
        { val: 20, label: '20' },
        { val: 30, label: '30' },
        { val: 60, label: '60' }
    ];

    const bitrateTicks = [
        { val: 1000, label: '1M' },
        { val: 2500, label: '2.5M' },
        { val: 5000, label: '5M' },
        { val: 10000, label: '10M' },
        { val: 20000, label: '20M' }
    ];

    const parseBitrateVal = (val, fallback) => {
        if (!val) return fallback;
        const raw = String(val).trim().toUpperCase();
        if (raw.endsWith('K')) return parseInt(raw.replace('K', ''), 10);
        if (raw.endsWith('M')) return Math.round(parseFloat(raw.replace('M', '')) * 1000);
        return parseInt(raw, 10) || fallback;
    };

    const startEdit = (station) => {
        const existing = overrides[station.hostname.toUpperCase()];
        setEditingStation(station.hostname);
        setOverrideFps(existing?.targetFps ?? defaultTargetFps);
        setOverrideBitrateKbps(parseBitrateVal(existing?.videoBitrate, defaultVideoBitrateKbps));
    };

    const handleSave = (hostname) => {
        onSaveOverride(hostname, Number(overrideFps), Number(overrideBitrateKbps));
        setEditingStation(null);
    };

    const handleConfirmResetAll = () => {
        const confirmed = window.confirm(
            `Resetting all ${customOverridesCount} customized stations back to default will cause an immediate ~1s stream restart on stations whose bitrate or FPS changes. Proceed?`
        );
        if (confirmed && onResetAllOverrides) {
            onResetAllOverrides();
        }
    };

    const sortedStations = [...stations].sort((a, b) => {
        const aCustom = !!overrides[a.hostname.toUpperCase()];
        const bCustom = !!overrides[b.hostname.toUpperCase()];
        if (aCustom && !bCustom) return -1;
        if (!aCustom && bCustom) return 1;
        return a.hostname.localeCompare(b.hostname, undefined, { numeric: true });
    });

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
                />
            </div>

            <div className="slider-ticks-track">
                {ticks.map((tick) => {
                    const THUMB_RADIUS = 12;
                    const pct = ((tick.val - min) / (max - min)) * 100;
                    // המיקום מתייחס לרוחב הפנוי של פס הסליידר (ללא אזור תיבת המספרים)
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

    return (
        <div className="stations-overrides-container">
            <div className="overrides-control-header">
                <div className="overrides-counter-badge">
                    <span className="count-num">{customOverridesCount}</span>
                    <span className="count-label">Custom Profiles Active</span>
                </div>

                {customOverridesCount > 0 && (
                    <button
                        type="button"
                        className="btn-reset-all-overrides"
                        onClick={handleConfirmResetAll}
                        title="Reset all customized stations back to fleet defaults"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                        </svg>
                        Reset All to Defaults
                    </button>
                )}
            </div>

            <div className="overrides-list">
                {sortedStations.length === 0 ? (
                    <div className="no-stations-notice">No stations currently discovered.</div>
                ) : (
                    sortedStations.map(st => {
                        const override = overrides[st.hostname.toUpperCase()];
                        const isCustom = !!override;
                        const isEditing = editingStation === st.hostname;

                        const currentFps = override?.targetFps ?? defaultTargetFps;
                        const currentBitrateKbps = parseBitrateVal(override?.videoBitrate, defaultVideoBitrateKbps);

                        const isBitrateChanging = Number(overrideBitrateKbps) !== currentBitrateKbps;
                        const isFpsIncreasing = Number(overrideFps) > currentFps;
                        const willTriggerRestart = isBitrateChanging || isFpsIncreasing;

                        return (
                            <div key={st.hostname} className={`station-override-card ${isCustom ? 'is-custom' : ''}`}>
                                <div className="card-top-row">
                                    <div className="station-title-group">
                                        <span className="station-name">{st.hostname}</span>
                                        {isCustom && <span className="custom-indicator-dot" title="Non-default profile active"></span>}
                                    </div>
                                    <span className={`policy-badge ${isCustom ? 'custom' : 'default'}`}>
                                        {isCustom ? 'CUSTOM OVERRIDE' : 'GLOBAL DEFAULT'}
                                    </span>
                                </div>

                                {isEditing ? (
                                    <div className="card-edit-box">
                                        <div className="edit-inputs-row">
                                            <label>
                                                <span>Target FPS</span>
                                                {renderSliderWithTicks(
                                                    overrideFps,
                                                    10,
                                                    60,
                                                    1,
                                                    val => setOverrideFps(val),
                                                    fpsTicks
                                                )}
                                            </label>
                                            <label>
                                                <span>Bitrate (Kbps)</span>
                                                {renderSliderWithTicks(
                                                    overrideBitrateKbps,
                                                    1000,
                                                    50000,
                                                    250,
                                                    val => setOverrideBitrateKbps(val),
                                                    bitrateTicks
                                                )}
                                            </label>
                                        </div>

                                        {willTriggerRestart ? (
                                            <div className="override-pipeline-notice warning">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                                    <line x1="12" y1="9" x2="12" y2="13" />
                                                    <line x1="12" y1="17" x2="12.01" y2="17" />
                                                </svg>
                                                <span>Modifying bitrate or increasing FPS causes a ~1s recording drop while the encoder restarts.</span>
                                            </div>
                                        ) : (
                                            <div className="override-pipeline-notice safe">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <span>Lowering FPS applies on-the-fly without dropping the stream.</span>
                                            </div>
                                        )}

                                        <div className="edit-actions-row">
                                            <button type="button" className="btn-save-sm" onClick={() => handleSave(st.hostname)}>
                                                Apply Override
                                            </button>
                                            <button type="button" className="btn-cancel-sm" onClick={() => setEditingStation(null)}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="card-info-row">
                                        <div className="info-item">
                                            <span className="lbl">FPS:</span>
                                            <span className="val">{override?.targetFps ?? defaultTargetFps}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="lbl">Bitrate:</span>
                                            <span className="val">{override?.videoBitrate ?? `${defaultVideoBitrateKbps}k`}</span>
                                        </div>
                                        <div className="card-actions">
                                            <button type="button" className="btn-action-text" onClick={() => startEdit(st)}>
                                                Edit
                                            </button>
                                            {isCustom && (
                                                <button type="button" className="btn-action-text danger" onClick={() => onResetOverride(st.hostname)}>
                                                    Reset
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}