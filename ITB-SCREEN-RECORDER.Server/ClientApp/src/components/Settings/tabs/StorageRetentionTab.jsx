export default function StorageRetentionTab({ form, updateField, updateStorageField }) {
    return (
        <fieldset className="settings-fieldset">
            <legend>Storage & Retention Policy</legend>

            <div className="settings-fields-row">
                <label className="settings-field">
                    <span>Retention Period (days)</span>
                    <input
                        type="number"
                        min={1}
                        max={365}
                        value={form.storage.retentionDays}
                        onChange={e => updateStorageField('retentionDays', Number(e.target.value))}
                        required
                    />
                </label>

                <label className="settings-field">
                    <span>Max Storage Quota (GB)</span>
                    <input
                        type="number"
                        min={10}
                        max={100000}
                        value={form.maxStorageQuotaGb}
                        onChange={e => updateField('maxStorageQuotaGb', Number(e.target.value))}
                        required
                    />
                </label>
            </div>

            <div className="settings-fields-row">
                <label className="settings-field">
                    <span>Chunk Interval (minutes)</span>
                    <input
                        type="number"
                        min={1}
                        max={60}
                        value={form.storage.chunkIntervalMinutes}
                        onChange={e => updateStorageField('chunkIntervalMinutes', Number(e.target.value))}
                        required
                    />
                </label>
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