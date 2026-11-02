// ==========================================
// File: Client/src/components/Settings/tabs/SystemNetworkTab.jsx
// ==========================================
import React from 'react';

export default function SystemNetworkTab({ form, updateField, updateDashboardField, updateMediaMtxField, updateDiscoveryField, updateAutoDirectorField }) {
    if (!form) return null;

    const dashboard = form.dashboard || {};
    const mediaMtx = form.mediaMtx || {};
    const discovery = form.discovery || {};
    const autoDirector = form.autoDirector || {};

    const dwellTicks = [
        { val: 3, label: '3s' },
        { val: 5, label: '5s' },
        { val: 10, label: '10s' },
        { val: 15, label: '15s' },
        { val: 30, label: '30s' },
        { val: 60, label: '60s' }
    ];

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
                        <span>HTTP / HTTPS Server Port</span>
                        <input
                            type="number"
                            min="1"
                            max="65535"
                            value={form.httpPort || 5090}
                            onChange={e => updateField('httpPort', Number(e.target.value))}
                            required
                        />
                        <span className="field-note" style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '4px' }}>
                            שינוי פורט יאתחל אוטומטית את השרת ויעביר את הדפדפן לכתובת החדשה (ברירת מחדל ללא פורט: 443 ל-HTTPS, 80 ל-HTTP).
                        </span>
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

            <div className="security-subpanel">
                <div className="subpanel-header">
                    <h4>AUTONOMOUS SERVER DISCOVERY & AGENT REGISTRATION</h4>
                    <span className="subpanel-desc">Configure UDP beacon discovery, multicast/broadcast settings, and network adapter binding for autonomous agent registration.</span>
                </div>

                <div className="settings-fields-row">
                    <div className="settings-field">
                        <span>UDP Discovery Port</span>
                        <input
                            type="number"
                            min="1024"
                            max="65535"
                            placeholder="5098"
                            value={discovery.port ?? 5098}
                            onChange={e => updateDiscoveryField('port', Number(e.target.value))}
                            required
                        />
                    </div>

                    <div className="settings-field">
                        <span>UDP Multicast Address</span>
                        <input
                            type="text"
                            placeholder="e.g. 239.210.1.5"
                            value={discovery.multicastAddress ?? '239.210.1.5'}
                            onChange={e => updateDiscoveryField('multicastAddress', e.target.value)}
                        />
                    </div>

                    <div className="settings-field">
                        <span>Subnet Broadcast Address</span>
                        <input
                            type="text"
                            placeholder="e.g. 255.255.255.255"
                            value={discovery.broadcastAddress ?? '255.255.255.255'}
                            onChange={e => updateDiscoveryField('broadcastAddress', e.target.value)}
                        />
                    </div>

                    <div className="settings-field">
                        <span>Network Interface (Optional)</span>
                        <input
                            type="text"
                            placeholder="Auto-detect active adapter"
                            value={discovery.networkInterfaceName || ''}
                            onChange={e => updateDiscoveryField('networkInterfaceName', e.target.value)}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', marginTop: '14px', flexWrap: 'wrap' }}>
                    <label className="tactical-checkbox-label">
                        <input
                            type="checkbox"
                            checked={discovery.enableBroadcastFallback !== false}
                            onChange={e => updateDiscoveryField('enableBroadcastFallback', e.target.checked)}
                        />
                        <span>Enable Subnet Broadcast Fallback (Auto-fallback when multicast packets are blocked by network switches)</span>
                    </label>
                </div>
            </div>
            <div className="security-subpanel">
                <div className="subpanel-header">
                    <h4>AUTO-DIRECTOR & REPLAY STUDIO ENGINE</h4>
                    <span className="subpanel-desc">Configure automated multi-monitor focus tracking, camera dwell hysteresis, and transition pacing for forensic replay and video export.</span>
                </div>

                <div className="settings-fields-row">
                    <div className="settings-field" style={{ flex: '1 1 100%' }}>
                        <span>Auto-Director Minimum Screen Dwell Time (Seconds)</span>
                        <div className="range-with-input">
                            <div className="slider-input-inline-row">
                                <input
                                    type="range"
                                    min={1}
                                    max={60}
                                    step={1}
                                    value={Math.max(1, Math.min(60, Number(autoDirector.minDwellSeconds) || 10))}
                                    onChange={e => updateAutoDirectorField?.('minDwellSeconds', Number(e.target.value))}
                                    className="tactical-range-slider"
                                />
                                <input
                                    type="number"
                                    min={1}
                                    max={120}
                                    step={1}
                                    value={autoDirector.minDwellSeconds || 10}
                                    onChange={e => updateAutoDirectorField?.('minDwellSeconds', Number(e.target.value))}
                                    required
                                />
                            </div>

                            <div className="slider-ticks-track">
                                {dwellTicks.map((tick) => {
                                    const THUMB_RADIUS = 12;
                                    const pct = ((tick.val - 1) / (60 - 1)) * 100;
                                    const isCurrent = Number(autoDirector.minDwellSeconds || 10) === tick.val;
                                    return (
                                        <button
                                            key={tick.val}
                                            type="button"
                                            className={`tick-anchor ${isCurrent ? 'is-active' : ''}`}
                                            style={{ left: `calc(${THUMB_RADIUS}px + (100% - ${THUMB_RADIUS * 2}px) * ${pct / 100})` }}
                                            onClick={() => updateAutoDirectorField?.('minDwellSeconds', tick.val)}
                                            title={`Set ${tick.label}`}
                                        >
                                            <span className="tick-pip"></span>
                                            <span className="tick-text">{tick.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <span className="field-note" style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '6px' }}>
                            זמן שהייה מינימלי במסך לפני מעבר לבמאי האוטומטי (ברירת מחדל: 10 שניות). מונע מעברים מהירים ותכופים שמעייפים את העין בסרטוני שחזור וייצוא.
                        </span>
                    </div>
                </div>
            </div>
        </fieldset>
    );
}
