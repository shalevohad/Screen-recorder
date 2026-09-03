export default function AgentOperationsTab({ form, updateField }) {
    return (
        <fieldset className="settings-fieldset">
            <legend>Global Stream Defaults</legend>

            <div className="settings-fields-row">
                <label className="settings-field">
                    <span>Default Video Bitrate (Kbps)</span>
                    <input
                        type="number"
                        min={500}
                        max={50000}
                        step={250}
                        value={form.defaultVideoBitrateKbps}
                        onChange={e => updateField('defaultVideoBitrateKbps', Number(e.target.value))}
                        required
                    />
                </label>

                <label className="settings-field">
                    <span>Default Target FPS</span>
                    <input
                        type="number"
                        min={15}
                        max={60}
                        value={form.defaultTargetFps}
                        onChange={e => updateField('defaultTargetFps', Number(e.target.value))}
                        required
                    />
                </label>
            </div>

            <label className="settings-field">
                <span>Dashboard Telemetry Refresh Rate (ms)</span>
                <input
                    type="number"
                    min={500}
                    max={60000}
                    step={100}
                    value={form.dashboardRefreshRateMs}
                    onChange={e => updateField('dashboardRefreshRateMs', Number(e.target.value))}
                    required
                />
            </label>
        </fieldset>
    );
}