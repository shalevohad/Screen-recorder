import { useState, useMemo } from 'react';
import ServerClock from './ServerClock';
import ServerTelemetryWidget from './ServerTelemetryWidget';
import './CommandCenterHeader.scss';

export default function CommandCenterHeader({
    stations = [],
    hideOffline = true,
    serverTelemetry,
    isSettingsOpen = false,
    onOpenSettings,
    isFaultFilterActive = false,
    onToggleFaultFilter
}) {
    const totalCount = stations.length;

    // חישוב מדדים: התראות נספרות אך ורק עבור עמדות אונליין עם נפילת פריימים
    const agentMetrics = useMemo(() => {
        const onlineStations = stations.filter(s => s.isOnline || s.status === 1 || s.status === 2);
        const onlineCount = onlineStations.length;
        const streamingCount = stations.filter(s => s.isStreaming).length;

        // עמדה Offline איננה תקלה מבצעית! תקלה = עמדה פעילה עם מעל 5 dropped frames
        const criticalAlerts = onlineStations.filter(s => (s.droppedFrames || 0) > 5).length;
        const aggregateTxMbps = stations.reduce((acc, s) => acc + (s.mediaTxMbps || 0), 0);

        return { onlineCount, streamingCount, criticalAlerts, aggregateTxMbps };
    }, [stations]);

    const activeWorkerCount = stations.filter(s =>
        (s.isOnline || s.status === 1 || s.status === 2) && s.isProcessRunning
    ).length;

    const offlineCount = stations.filter(s =>
        !s.isOnline && s.status !== 1 && s.status !== 2 && !s.isProcessRunning
    ).length;

    const [isExpanded, setIsExpanded] = useState(true);

    const toggleExpand = () => {
        setIsExpanded(prev => !prev);
    };

    return (
        <header className={`command-center-top-bar ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}>
            <div className="top-row-main">
                <div className="brand-logo-section">
                    <div className="tactical-emblem">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polygon points="12 2 2 7 12 12 22 7 12 2" />
                            <polyline points="2 17 12 22 22 17" />
                            <polyline points="2 12 12 17 22 12" />
                        </svg>
                        <div className="emblem-core-pulse"></div>
                    </div>
                    <div className="brand-text-group">
                        <div className="brand-title-row">
                            <span className="brand-name">ITB</span>
                            <span className="brand-main">RECORDING CENTER</span>
                        </div>
                        <span className="brand-subtitle">LIVE AGENT OPERATIONS</span>
                    </div>
                </div>

                <div className="header-clock-section">
                    <ServerClock uptimeSeconds={serverTelemetry?.uptimeSeconds} />
                </div>

                <div className="header-actions-group">
                    <button
                        className={`header-icon-btn toggle-collapse-btn ${isExpanded ? 'active' : ''}`}
                        title={isExpanded ? "Collapse Telemetry & Agents Overview" : "Expand Telemetry & Agents Overview"}
                        onClick={toggleExpand}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="16" height="16">
                            {isExpanded ? (
                                <polyline points="18 15 12 9 6 15" />
                            ) : (
                                <polyline points="6 9 12 15 18 9" />
                            )}
                        </svg>
                    </button>

                    <div className="fleet-nodes-indicator">
                        <div className="indicator-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                <rect x="2" y="3" width="20" height="14" rx="2" />
                                <line x1="8" y1="21" x2="16" y2="21" />
                                <line x1="12" y1="17" x2="12" y2="21" />
                            </svg>
                            <span className={`status-beacon ${activeWorkerCount > 0 ? 'online' : 'offline'}`}></span>
                        </div>

                        <div className="indicator-data">
                            <div className="data-title">
                                CONNECTED AGENTS
                            </div>
                            <div className="data-values">
                                {/* אם אופליין לא מוסתר - מציג את כל העמדות המנוטרות (1). אם מוסתר - מציג פעילים */}
                                <span className="count-active">
                                    {hideOffline ? activeWorkerCount : totalCount}
                                </span>

                                {/* תג HIDDEN ללא מינוס - מוצג אך ורק כשאופליין באמת מוסתר */}
                                {hideOffline && offlineCount > 0 && (
                                    <span className="count-filtered" title={`${offlineCount} offline stations hidden from view`}>
                                        [{offlineCount} HIDDEN]
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        className={`header-icon-btn ${isSettingsOpen ? 'is-active' : ''}`}
                        title="System Settings"
                        onClick={onOpenSettings}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l-.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09A1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="top-row-telemetry">
                <div className="header-fleet-summary">
                    <div className="fleet-summary-pill">
                        <div className="summary-pod">
                            <span className="pod-lbl">RECORDING AGENTS</span>
                            <div className="pod-val-row">
                                <span className="pod-primary cyan">{agentMetrics.streamingCount}</span>
                                <span className="pod-slash">/</span>
                                <span className="pod-total">{agentMetrics.onlineCount} LIVE</span>
                            </div>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-pod">
                            <span className="pod-lbl">AGGREGATE TX</span>
                            <div className="pod-val-row">
                                <span className="pod-primary blue">{agentMetrics.aggregateTxMbps.toFixed(1)}</span>
                                <span className="pod-unit">Mbps</span>
                            </div>
                        </div>

                        <div className="summary-divider"></div>

                        <div
                            className={`summary-pod health-pod ${agentMetrics.criticalAlerts > 0 ? 'alert is-clickable' : 'nominal'} ${isFaultFilterActive ? 'filter-active' : ''}`}
                            onClick={() => {
                                if (agentMetrics.criticalAlerts > 0 && onToggleFaultFilter) {
                                    onToggleFaultFilter();
                                }
                            }}
                            title={
                                agentMetrics.criticalAlerts > 0
                                    ? isFaultFilterActive
                                        ? "Click to exit fault isolation mode"
                                        : `Click to isolate ${agentMetrics.criticalAlerts} agent(s) with issues`
                                    : "Fleet health nominal"
                            }
                        >
                            <span className="pod-lbl">AGENT HEALTH</span>
                            <div className="pod-val-row">
                                {agentMetrics.criticalAlerts > 0 ? (
                                    <>
                                        <span className="alert-beacon-dot"></span>
                                        <span className="pod-primary red">
                                            {isFaultFilterActive ? `${agentMetrics.criticalAlerts} FILTERED` : `${agentMetrics.criticalAlerts} ALERTS`}
                                        </span>
                                        {isFaultFilterActive && <span className="filter-active-indicator">✕</span>}
                                    </>
                                ) : (
                                    <>
                                        <span className="nominal-beacon-dot"></span>
                                        <span className="pod-primary green">NOMINAL</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="header-telemetry-wrapper">
                    <ServerTelemetryWidget serverTelemetry={serverTelemetry} />
                </div>
            </div>
        </header>
    );
}