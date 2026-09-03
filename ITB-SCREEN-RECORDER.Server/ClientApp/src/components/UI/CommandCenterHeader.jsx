import ServerClock from './ServerClock';
import ServerTelemetryWidget from './ServerTelemetryWidget';
import './CommandCenterHeader.scss';

export default function CommandCenterHeader({
    stations = [],
    hideOffline = true,
    serverTelemetry,
    isSettingsOpen = false,
    onOpenSettings
}) {
    const totalCount = stations.length;

    const activeWorkerCount = stations.filter(s =>
        (s.isOnline || s.status === 1 || s.status === 2) && s.isProcessRunning
    ).length;

    const connectedNoWorkerCount = stations.filter(s =>
        (s.isOnline || s.status === 1 || s.status === 2) && !s.isProcessRunning
    ).length;

    const fullyOfflineCount = stations.filter(s =>
        !s.isOnline && s.status !== 1 && s.status !== 2 && !s.isProcessRunning
    ).length;

    const filteredOutCount = connectedNoWorkerCount + fullyOfflineCount;

    return (
        <header className="command-center-top-bar">
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
                        <span className="brand-main">COMMAND CENTER</span>
                    </div>
                    <span className="brand-subtitle">LIVE AGENT OPERATIONS</span>
                </div>
            </div>

            <div className="header-clock-section">
                <ServerClock uptimeSeconds={serverTelemetry?.uptimeSeconds} />
            </div>

            <div className="header-actions-group">
                <ServerTelemetryWidget serverTelemetry={serverTelemetry} />

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
                        <div className="data-title">CONNECTED AGENTS</div>
                        <div className="data-values">
                            <span className="count-active">{activeWorkerCount}</span>
                            {connectedNoWorkerCount > 0 && (
                                <span className="count-warning" title={`${connectedNoWorkerCount} agents connected without active worker`}>
                                    ({connectedNoWorkerCount} NO WORKER)
                                </span>
                            )}
                            {hideOffline && filteredOutCount > 0 && (
                                <span className="count-filtered" title={`${filteredOutCount} non-operational stations hidden from view`}>
                                    [-{filteredOutCount} HIDDEN]
                                </span>
                            )}
                            {!hideOffline && totalCount > 0 && (
                                <span className="count-total">/{totalCount}</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* 💡 כפתור Settings מקבל את מחלקת is-active כאשר מודאל ההגדרות פתוח */}
                <button
                    className={`header-icon-btn ${isSettingsOpen ? 'is-active' : ''}`}
                    title="System Settings"
                    onClick={onOpenSettings}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                </button>
            </div>
        </header>
    );
}