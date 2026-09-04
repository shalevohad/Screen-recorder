export default function StorageRetentionTab({ form, updateField, updateStorageField }) {
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

    return (
        <fieldset className="settings-fieldset">
            <legend>Storage & Retention Policy</legend>

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
        </fieldset>
    );
}