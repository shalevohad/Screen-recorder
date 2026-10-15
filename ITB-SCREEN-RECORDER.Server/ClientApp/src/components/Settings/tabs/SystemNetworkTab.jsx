// ==========================================
// File: Client/src/components/Settings/tabs/SystemNetworkTab.jsx
// ==========================================
import React from 'react';

export default function SystemNetworkTab({ form, updateField, updateDashboardField, updateMediaMtxField }) {
    if (!form) return null;

    const dashboard = form.dashboard || {};
    const mediaMtx = form.mediaMtx || {};

    const timezones = [
        { val: 'Asia/Jerusalem', label: 'Asia/Jerusalem (Israel Standard Time)' },
        { val: 'UTC', label: 'UTC (Coordinated Universal Time)' },
        { val: 'America/New_York', label: 'America/New_York (Eastern Time)' },
        { val: 'Europe/London', label: 'Europe/London (GMT/BST)' },
        { val: 'Europe/Berlin', label: 'Europe/Berlin (Central European Time)' }
    ];

    const locales = [
        { val: 'en-US', label: 'English (United States - en-US)' },
        { val: 'he-IL', label: 'Hebrew (Israel - he-IL)' }
    ];

    return (
        <fieldset className="settings-fieldset system-network-fieldset">
            <legend>System, Network & Streaming Engine</legend>

            <div className="security-subpanel">
                <div className="subpanel-header">
                    <h4>SERVER NETWORK & LOCALIZATION</h4>
                    <span className="subpanel-desc">Configure central HTTP listening port, timezone, and locale settings.</span>
                </div>

                <div className="settings-fields-row">
                    <div className="settings-field">
                        <span>HTTP Server Port</span>
                        <input
                            type="number"
                            min="1"
                            max="65535"
                            value={form.httpPort || 5090}
                            onChange={e => updateField('httpPort', Number(e.target.value))}
                            required
                        />
                    </div>

                    <div className="settings-field">
                        <span>System Display Timezone</span>
                        <select
                            value={form.displayTimezone || 'Asia/Jerusalem'}
                            onChange={e => updateField('displayTimezone', e.target.value)}
                            className="tactical-select"
                        >
                            {timezones.map(tz => (
                                <option key={tz.val} value={tz.val}>{tz.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="settings-field">
                        <span>System Locale</span>
                        <select
                            value={form.displayLocale || 'en-US'}
                            onChange={e => updateField('displayLocale', e.target.value)}
                            className="tactical-select"
                        >
                            {locales.map(loc => (
                                <option key={loc.val} value={loc.val}>{loc.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="security-subpanel">
                <div className="subpanel-header">
                    <h4>DASHBOARD WEB STREAMING & SNAPSHOT LIMITS</h4>
                    <span className="subpanel-desc">Tune browser viewport load balancing and adaptive snapshot intervals.</span>
                </div>

                <div className="settings-fields-row">
                    <div className="settings-field">
                        <span>Max Concurrent Live Streams</span>
                        <input
                            type="number"
                            min="1"
                            max="36"
                            value={dashboard.maxConcurrentLiveStreams || 9}
                            onChange={e => updateDashboardField('maxConcurrentLiveStreams', Number(e.target.value))}
                            required
                        />
                    </div>

                    <div className="settings-field">
                        <span>Snapshot Min Delay (ms)</span>
                        <input
                            type="number"
                            min="500"
                            max="5000"
                            step="100"
                            value={dashboard.snapshotMinDelayMs || 1500}
                            onChange={e => updateDashboardField('snapshotMinDelayMs', Number(e.target.value))}
                            required
                        />
                    </div>

                    <div className="settings-field">
                        <span>Snapshot Max Delay (ms)</span>
                        <input
                            type="number"
                            min="1000"
                            max="15000"
                            step="500"
                            value={dashboard.snapshotMaxDelayMs || 4500}
                            onChange={e => updateDashboardField('snapshotMaxDelayMs', Number(e.target.value))}
                            required
                        />
                    </div>

                    <div className="settings-field">
                        <span>Viewport Buffer Margin (px)</span>
                        <input
                            type="number"
                            min="50"
                            max="1000"
                            step="50"
                            value={dashboard.snapshotBufferMarginPx || 250}
                            onChange={e => updateDashboardField('snapshotBufferMarginPx', Number(e.target.value))}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="security-subpanel">
                <div className="subpanel-header">
                    <h4>MEDIAMTX RTSP/RTMP/HLS STREAMING ENGINE</h4>
                    <span className="subpanel-desc">MediaMTX high-performance video broker ports and protocols.</span>
                </div>

                <div className="settings-fields-row">
                    <div className="settings-field">
                        <span>RTMP Ingestion Port</span>
                        <input
                            type="number"
                            min="1024"
                            max="65535"
                            value={mediaMtx.rtmpPort || 19350}
                            onChange={e => updateMediaMtxField('rtmpPort', Number(e.target.value))}
                            required
                        />
                    </div>

                    <div className="settings-field">
                        <span>HLS Web Delivery Port</span>
                        <input
                            type="number"
                            min="1024"
                            max="65535"
                            value={mediaMtx.hlsPort || 8888}
                            onChange={e => updateMediaMtxField('hlsPort', Number(e.target.value))}
                            required
                        />
                    </div>

                    <div className="settings-field">
                        <span>Control API Port</span>
                        <input
                            type="number"
                            min="1024"
                            max="65535"
                            value={mediaMtx.apiPort || 9997}
                            onChange={e => updateMediaMtxField('apiPort', Number(e.target.value))}
                            required
                        />
                    </div>

                    <div className="settings-field">
                        <span>Playback Port</span>
                        <input
                            type="number"
                            min="1024"
                            max="65535"
                            value={mediaMtx.playbackPort || 9996}
                            onChange={e => updateMediaMtxField('playbackPort', Number(e.target.value))}
                            required
                        />
                    </div>
                </div>

                <div className="settings-fields-row">
                    <div className="settings-field">
                        <span>Metrics Port (Prometheus)</span>
                        <input
                            type="number"
                            min="1024"
                            max="65535"
                            value={mediaMtx.metricsPort || 9998}
                            onChange={e => updateMediaMtxField('metricsPort', Number(e.target.value))}
                        />
                    </div>

                    <div className="settings-field">
                        <span>HLS Segment Duration</span>
                        <input
                            type="text"
                            placeholder="e.g. 2s"
                            value={mediaMtx.hlsSegmentDuration || '2s'}
                            onChange={e => updateMediaMtxField('hlsSegmentDuration', e.target.value)}
                        />
                    </div>

                    <div className="settings-field">
                        <span>HLS Variant</span>
                        <select
                            value={mediaMtx.hlsVariant || 'fmp4'}
                            onChange={e => updateMediaMtxField('hlsVariant', e.target.value)}
                            className="tactical-select"
                        >
                            <option value="fmp4">fMP4 (Low-Latency fragmented MP4)</option>
                            <option value="mpegts">MPEG-TS (Legacy TS chunks)</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', marginTop: '14px', flexWrap: 'wrap' }}>
                    <label className="tactical-checkbox-label">
                        <input
                            type="checkbox"
                            checked={Boolean(mediaMtx.enableMetrics)}
                            onChange={e => updateMediaMtxField('enableMetrics', e.target.checked)}
                        />
                        <span>Enable MediaMTX Prometheus Metrics</span>
                    </label>

                    <label className="tactical-checkbox-label">
                        <input
                            type="checkbox"
                            checked={Boolean(mediaMtx.enablePlayback)}
                            onChange={e => updateMediaMtxField('enablePlayback', e.target.checked)}
                        />
                        <span>Enable MediaMTX Native Playback API</span>
                    </label>
                </div>
            </div>
        </fieldset>
    );
}
