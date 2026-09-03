import ServerClock from './ServerClock';
import ServerTelemetryWidget from './ServerTelemetryWidget';
import './CommandCenterHeader.scss';

export default function CommandCenterHeader({
    stations = [],
    hideOffline = false,
    onToggleFilter,
    serverTelemetry
}) {
    const totalCount = stations.length;
    const onlineCount = stations.filter(s => s.isOnline || s.status === 1 || s.isProcessRunning).length;
    const offlineCount = Math.max(0, totalCount - onlineCount);

    return (
        <header className="command-center-top-bar">
            {/* 1. מיתוג שמאל */}
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

            {/* 2. שעון NOC מרכז */}
            <div className="header-clock-section">
                <ServerClock uptimeSeconds={serverTelemetry?.uptimeSeconds} />
            </div>

            {/* 3. טלמטריה + קאונטר חכם + הגדרות ימין */}
            <div className="header-actions-group">
                <ServerTelemetryWidget serverTelemetry={serverTelemetry} />

                {/* קאונטר סוכנים טקטי חכם */}
                <div
                    className={`tactical-agents-counter ${hideOffline ? 'is-filtered' : ''}`}
                    onClick={onToggleFilter}
                    title={hideOffline
                        ? `Filtered View: Showing ${onlineCount} active agents (${offlineCount} offline hidden). Click to show all.`
                        : `Fleet Status: ${onlineCount} Online, ${offlineCount} Offline. Click to hide offline.`}
                >
                    <div className="counter-nodes-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <rect x="2" y="3" width="20" height="14" rx="2" />
                            <line x1="8" y1="21" x2="16" y2="21" />
                            <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                        <span className={`status-dot ${onlineCount > 0 ? 'online' : 'offline'}`}></span>
                    </div>

                    <div className="counter-figures">
                        <span className="primary-count">{onlineCount}</span>

                        {/* במצב סינון: מציג -X באדום שמסמל תחנות שהוסתרו מהגריד */}
                        {hideOffline && offlineCount > 0 && (
                            <span className="filter-deficit">-{offlineCount}</span>
                        )}

                        {/* במצב תצוגה מלאה: מציג /Total */}
                        {!hideOffline && offlineCount > 0 && (
                            <span className="total-denominator">/{totalCount}</span>
                        )}
                    </div>
                </div>

                <button className="header-icon-btn" title="System Settings">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                </button>
            </div>
        </header>
    );
}