// ==========================================
// File: Client/src/components/Settings/tabs/SystemNetworkTab.jsx
// ==========================================
import React from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function SystemNetworkTab({ form, activeFeatures = [], updateField, updateDashboardField, updateMediaMtxField, updateDiscoveryField, updateAutoDirectorField }) {
    const hasReplayStudioFeature = React.useMemo(() => {
        if (!Array.isArray(activeFeatures) || activeFeatures.length === 0) return false;
        return activeFeatures.some(f =>
            f.id === 'extractor-advanced-studio' ||
            f.id === 'extractor-slicer' ||
            (typeof f.id === 'string' && f.id.toLowerCase().includes('extractor'))
        );
    }, [activeFeatures]);
    const { isSystemRoot, hasPermission } = useAuth();

    if (!form) return null;

    const isStealthAuthorized = isSystemRoot || Boolean(hasPermission?.('system.stealth') || hasPermission?.('settings.stealth'));

    const dashboard = form.dashboard || {};
    const mediaMtx = form.mediaMtx || {};
    const discovery = form.discovery || {};
    const autoDirector = form.autoDirector || {};

    const studioScreenTicks = [
        { val: 1, label: '1' },
        { val: 2, label: '2' },
        { val: 3, label: '3' },
        { val: 4, label: '4' },
        { val: 5, label: '5' },
        { val: 6, label: '6' }
    ];

    const preloadTicks = [
        { val: 0.5, label: '0.5s' },
        { val: 1.0, label: '1.0s' },
        { val: 1.5, label: '1.5s' },
        { val: 2.0, label: '2.0s' },
        { val: 3.0, label: '3.0s' },
        { val: 5.0, label: '5.0s' }
    ];

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
            {/* STEALTH REPLAY STUDIO & AUTO-DIRECTOR ENGINE CONFIGURATION */}
            {/* Principle of Secrecy (עקרון החשאיות): Feature settings strictly exposed ONLY if server has feature active */}
            {isStealthAuthorized && hasReplayStudioFeature && (
                <div className="security-subpanel stealth-studio-subpanel" style={{ borderColor: 'rgba(6, 182, 212, 0.35)', background: 'rgba(6, 182, 212, 0.03)' }}>
                    <div className="subpanel-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '0.68rem', padding: '2px 6px', borderRadius: '4px', background: '#06B6D4', color: '#0F172A', fontWeight: 800 }}>STEALTH OPS</span>
                            <h4 style={{ margin: 0 }}>AUTO-DIRECTOR & REPLAY STUDIO ENGINE</h4>
                        </div>
                        <span className="subpanel-desc">Configure forensic NLE playback limits, hardware decoder budget, buffer preload hysteresis, and multi-monitor focus tracking.</span>
                    </div>

                    <div className="settings-fields-row" style={{ marginTop: '16px' }}>
                        {/* Max Concurrent Studio Feeds (Hard Capped at 6) */}
                        <div className="settings-field" style={{ flex: '1 1 calc(50% - 10px)' }}>
                            <span>Max Concurrent Studio Playback Streams (Hard Cap: 6)</span>
                            <div className="range-with-input">
                                <div className="slider-input-inline-row">
                                    <input
                                        type="range"
                                        min={1}
                                        max={6}
                                        step={1}
                                        value={Math.max(1, Math.min(6, Number(autoDirector.maxConcurrentScreens) || 6))}
                                        onChange={e => updateAutoDirectorField?.('maxConcurrentScreens', Number(e.target.value))}
                                        className="tactical-range-slider"
                                    />
                                    <input
                                        type="number"
                                        min={1}
                                        max={6}
                                        step={1}
                                        value={Math.max(1, Math.min(6, Number(autoDirector.maxConcurrentScreens) || 6))}
                                        onChange={e => updateAutoDirectorField?.('maxConcurrentScreens', Math.max(1, Math.min(6, Number(e.target.value))))}
                                        required
                                    />
                                </div>

                                <div className="slider-ticks-track">
                                    {studioScreenTicks.map((tick) => {
                                        const THUMB_RADIUS = 12;
                                        const pct = ((tick.val - 1) / (6 - 1)) * 100;
                                        const isCurrent = (Number(autoDirector.maxConcurrentScreens) || 6) === tick.val;
                                        return (
                                            <button
                                                key={tick.val}
                                                type="button"
                                                className={`tick-anchor ${isCurrent ? 'is-active' : ''}`}
                                                style={{ left: `calc(${THUMB_RADIUS}px + (100% - ${THUMB_RADIUS * 2}px) * ${pct / 100})` }}
                                                onClick={() => updateAutoDirectorField?.('maxConcurrentScreens', tick.val)}
                                                title={`Cap at ${tick.label} Screens`}
                                            >
                                                <span className="tick-pip"></span>
                                                <span className="tick-text">{tick.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            <span className="field-note" style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '6px' }}>
                                הגבלת כמות מסכי וידאו מקבילים בהרצה סימולטנית במערכת העריכה (מקסימום 6). מבטיח ביצועים חלקים ללא קריסת Decoders.
                            </span>
                        </div>

                        {/* Buffer Preload Lead-In Duration */}
                        <div className="settings-field" style={{ flex: '1 1 calc(50% - 10px)' }}>
                            <span>Buffer Preload Lead-In (Seconds)</span>
                            <div className="range-with-input">
                                <div className="slider-input-inline-row">
                                    <input
                                        type="range"
                                        min={0.5}
                                        max={5.0}
                                        step={0.5}
                                        value={Math.max(0.5, Math.min(5.0, Number(autoDirector.bufferPreloadSeconds) || 2.0))}
                                        onChange={e => updateAutoDirectorField?.('bufferPreloadSeconds', Number(e.target.value))}
                                        className="tactical-range-slider"
                                    />
                                    <input
                                        type="number"
                                        min={0.5}
                                        max={5.0}
                                        step={0.5}
                                        value={Number(autoDirector.bufferPreloadSeconds) || 2.0}
                                        onChange={e => updateAutoDirectorField?.('bufferPreloadSeconds', Math.max(0.5, Math.min(5.0, Number(e.target.value))))}
                                        required
                                    />
                                </div>

                                <div className="slider-ticks-track">
                                    {preloadTicks.map((tick) => {
                                        const THUMB_RADIUS = 12;
                                        const pct = ((tick.val - 0.5) / (5.0 - 0.5)) * 100;
                                        const isCurrent = Math.abs((Number(autoDirector.bufferPreloadSeconds) || 2.0) - tick.val) < 0.1;
                                        return (
                                            <button
                                                key={tick.val}
                                                type="button"
                                                className={`tick-anchor ${isCurrent ? 'is-active' : ''}`}
                                                style={{ left: `calc(${THUMB_RADIUS}px + (100% - ${THUMB_RADIUS * 2}px) * ${pct / 100})` }}
                                                onClick={() => updateAutoDirectorField?.('bufferPreloadSeconds', tick.val)}
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
                                זמן טעינה מוקדם ל-Buffer לפני תחילת השמעה מקבילית. מונע כניסה ל-Buffering לסירוגין ("אורגן Buffer") בהרצה של מספר מסכים.
                            </span>
                        </div>

                        {/* Auto-Director Minimum Screen Dwell Time */}
                        <div className="settings-field" style={{ flex: '1 1 100%', marginTop: '12px' }}>
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

                        {/* Master Auto-Director Toggle */}
                        <div style={{ marginTop: '12px', width: '100%' }}>
                            <label className="tactical-checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={autoDirector.enableAutoDirector !== false}
                                    onChange={e => updateAutoDirectorField?.('enableAutoDirector', e.target.checked)}
                                />
                                <span>Enable Automated Multi-Monitor Camera Tracking in Replay Studio (Auto-Director)</span>
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </fieldset>
    );
}
