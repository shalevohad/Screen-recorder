export default function AgentOperationsTab({ form, updateField }) {
    const fpsTicks = [
        { val: 10, label: '10' },
        { val: 20, label: '20' },
        { val: 30, label: '30' },
        { val: 60, label: '60' }
    ];

    // 💡 טווח ה-Bitrate מותאם כעת מ-1000 ועד 20000 (20M) עם הטיקים המדויקים
    const bitrateTicks = [
        { val: 1000, label: '1M' },
        { val: 5000, label: '5M' },
        { val: 10000, label: '10M' },
        { val: 20000, label: '20M' }
    ];

    const refreshTicks = [
        { val: 1000, label: '1s' },
        { val: 3000, label: '3s' },
        { val: 5000, label: '5s' },
        { val: 10000, label: '10s' }
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
            <legend>Global Stream Defaults</legend>

            <div className="settings-fields-row">
                <div className="settings-field">
                    <span>Default Video Bitrate (Kbps)</span>
                    {renderSliderWithTicks(
                        form.defaultVideoBitrateKbps || 2500,
                        1000,
                        20000, // 💡 מקסימום 20,000 Kbps (20M)
                        250,
                        val => updateField('defaultVideoBitrateKbps', val),
                        bitrateTicks
                    )}
                </div>

                <div className="settings-field">
                    <span>Default Target FPS</span>
                    {renderSliderWithTicks(
                        form.defaultTargetFps || 20,
                        10,
                        60,
                        1,
                        val => updateField('defaultTargetFps', val),
                        fpsTicks
                    )}
                </div>
            </div>

            <div className="settings-field">
                <span>Dashboard Telemetry Refresh Rate (ms)</span>
                {renderSliderWithTicks(
                    form.dashboardRefreshRateMs || 3000,
                    1000,
                    10000,
                    500,
                    val => updateField('dashboardRefreshRateMs', val),
                    refreshTicks
                )}
            </div>
        </fieldset>
    );
}