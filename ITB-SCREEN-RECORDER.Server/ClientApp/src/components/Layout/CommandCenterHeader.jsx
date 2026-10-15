// ==========================================
// File: Client/src/components/Layout/CommandCenterHeader.jsx
// ==========================================
import { useState, useMemo, useEffect } from 'react';
import ServerClock from '../Telemetry/ServerClock';
import ServerTelemetryWidget from '../Telemetry/ServerTelemetryWidget';
import RadialGauge from '../Telemetry/RadialGauge';
import SessionControlWidget from './SessionControlWidget';
import './CommandCenterHeader.scss';

export default function CommandCenterHeader({
    stations = [],
    hideOffline = true,
    serverTelemetry,
    onOpenAppSwitcher,
    isFaultFilterActive = false,
    onToggleFaultFilter,
    systemConfig: propSystemConfig
}) {
    const totalCount = stations.length;
    const [fetchedConfig, setFetchedConfig] = useState(null);
    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
        if (!propSystemConfig) {
            fetch('/api/system/config')
                .then(res => res.json())
                .then(data => {
                    if (data) setFetchedConfig(data);
                })
                .catch(() => {
                    console.error("Unable to fetch config timezone - falling back to default 'Asia/Jerusalem'");
                });
        }
    }, [propSystemConfig]);

    const activeConfig = propSystemConfig || fetchedConfig;

    const resolvedTimezone = useMemo(() => {
        return activeConfig?.DisplayTimezone
            || activeConfig?.displayTimezone
            || serverTelemetry?.displayTimezone
            || 'Asia/Jerusalem';
    }, [activeConfig, serverTelemetry]);

    const resolvedLocale = useMemo(() => {
        return activeConfig?.DisplayLocale
            || activeConfig?.displayLocale
            || 'en-US';
    }, [activeConfig]);

    const agentMetrics = useMemo(() => {
        const onlineStations = stations.filter(s => s.isOnline || s.status === 1 || s.status === 2);
        const onlineCount = onlineStations.length;
        const streamingCount = stations.filter(s => s.isStreaming).length;
        const criticalAlerts = onlineStations.filter(s => (s.droppedFrames || 0) > 5).length;
        const aggregateTxMbps = stations.reduce((acc, s) => acc + (s.mediaTxMbps || 0), 0);
        const aggregateC2Kbps = stations.reduce((acc, s) => acc + (s.telemetryTxKbps || 0), 0);

        const recordingPct = onlineCount > 0 ? Math.round((streamingCount / onlineCount) * 100) : 0;
        const onlinePct = totalCount > 0 ? Math.round((onlineCount / totalCount) * 100) : 0;

        return { onlineCount, streamingCount, criticalAlerts, aggregateTxMbps, aggregateC2Kbps, recordingPct, onlinePct };
    }, [stations, totalCount]);

    const activeWorkerCount = stations.filter(s =>
        (s.isOnline || s.status === 1 || s.status === 2) && s.isProcessRunning
    ).length;

    const offlineCount = stations.filter(s =>
        !s.isOnline && s.status !== 1 && s.status !== 2 && !s.isProcessRunning
    ).length;

    return (
        <header className={`command-center-top-bar ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}>
            <div className="top-row-main">
                <div className="brand-logo-section">
                    <div className="tactical-emblem">
                        <img
                            src="/images/LogoDark2.png"
                            alt="ITB Logo Dark"
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <div className="emblem-core-pulse" />
                    </div>
                    <div className="brand-text-group">
                        <div className="brand-title-row">
                            <span className="brand-name">ITB</span>
                            <span className="brand-main">SCREEN RECORDING CENTER</span>
                        </div>
                        <span className="brand-subtitle">LIVE AGENT OPERATIONS</span>
                    </div>
                </div>

                <div className="header-clock-section">
                    <ServerClock
                        uptimeSeconds={serverTelemetry?.uptimeSeconds ?? serverTelemetry?.systemUptimeSeconds}
                        timezone={resolvedTimezone}
                        locale={resolvedLocale}
                    />
                </div>

                <div className="header-actions-group">
                    <SessionControlWidget onOpenAppSwitcher={onOpenAppSwitcher} />

                    <button
                        className={`header-icon-btn toggle-collapse-btn ${isExpanded ? 'active' : ''}`}
                        title={isExpanded ? "Collapse Overview" : "Expand Overview"}
                        onClick={() => setIsExpanded(p => !p)}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="16" height="16">
                            {isExpanded ? <polyline points="18 15 12 9 6 15" /> : <polyline points="6 9 12 15 18 9" />}
                        </svg>
                    </button>

                    <div className="fleet-nodes-indicator" title="Connected Fleet Agents">
                        <div className="indicator-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                <rect x="2" y="3" width="20" height="14" rx="2" />
                                <line x1="8" y1="21" x2="16" y2="21" />
                                <line x1="12" y1="17" x2="12" y2="21" />
                            </svg>
                            <span className={`status-beacon ${activeWorkerCount > 0 ? 'online' : 'offline'}`} />
                        </div>

                        <div className="indicator-data">
                            <div className="data-title">CONNECTED AGENTS</div>
                            <div className="data-values">
                                <span className="count-active">
                                    {hideOffline ? activeWorkerCount : totalCount}
                                </span>
                                {hideOffline && offlineCount > 0 && (
                                    <span className="count-filtered" title={`${offlineCount} offline stations hidden`}>
                                        [{offlineCount} HIDDEN]
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="top-row-telemetry">
                <div className="header-fleet-summary">
                    <div className="fleet-summary-pill">
                        <div
                            className="summary-pod recording-agents-pod"
                            title={`Recording Fleet: ${agentMetrics.streamingCount} recording of ${agentMetrics.onlineCount} online (${agentMetrics.recordingPct}%)`}
                        >
                            <span className="pod-lbl">RECORDING AGENTS</span>
                            <div className="pod-content-row">
                                <span className="pod-val cyan">{agentMetrics.recordingPct}%</span>
                                <RadialGauge
                                    size={32}
                                    strokeWidth={2.4}
                                    concentricSegments={[
                                        { pct: agentMetrics.recordingPct, color: 'var(--accent-cyan-light, #38BDF8)' },
                                        { pct: agentMetrics.onlinePct, color: 'var(--accent-emerald, #10B981)' }
                                    ]}
                                    items={[
                                        { label: 'REC', value: agentMetrics.streamingCount, color: 'cyan' },
                                        { label: 'LIVE', value: agentMetrics.onlineCount, color: 'green' }
                                    ]}
                                />
                            </div>
                        </div>

                        <div className="summary-divider" />

                        <div className="summary-pod">
                            <span className="pod-lbl">AGGREGATE TX</span>
                            <div className="pod-val-row">
                                <span className="pod-primary blue">{agentMetrics.aggregateTxMbps.toFixed(1)}</span>
                                <span className="pod-unit">Mbps</span>
                            </div>
                        </div>

                        <div className="summary-divider" />

                        <div
                            className={`summary-pod health-pod ${agentMetrics.criticalAlerts > 0 ? 'is-clickable' : ''} ${isFaultFilterActive ? 'filter-active' : ''}`}
                            onClick={() => {
                                if (agentMetrics.criticalAlerts > 0 && onToggleFaultFilter) onToggleFaultFilter();
                            }}
                            title={agentMetrics.criticalAlerts > 0 ? "Filter alerts" : "Fleet health nominal"}
                        >
                            <span className="pod-lbl">AGENT HEALTH</span>
                            <div className="pod-val-row">
                                {agentMetrics.criticalAlerts > 0 ? (
                                    <>
                                        <span className="alert-beacon-dot" />
                                        <span className="pod-primary red">{agentMetrics.criticalAlerts} ALERTS</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="nominal-beacon-dot" />
                                        <span className="pod-primary green">NOMINAL</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="header-telemetry-wrapper">
                    {/* מגן כנגד ערך null למניעת קריסות רינדור */}
                    <ServerTelemetryWidget
                        serverTelemetry={serverTelemetry || {}}
                        fleetC2Kbps={agentMetrics.aggregateC2Kbps}
                    />
                </div>
            </div>
        </header>
    );
}