// ==========================================
// File: ClientApp/src/components/Cluster/components/ClusterHeader.jsx
// ==========================================
import React from 'react';
import '../styles/ClusterHeader.scss';

export default function ClusterHeader({
    isStandalone,
    totalActiveNodes,
    isVipConfigured,
    isHoldingVip,
    vipAddress,
    isAutoRefresh,
    lastUpdated,
    onToggleAutoRefresh,
    onOpenSettings,
    onNavigate
}) {
    return (
        <header className="cluster-header">
            <div className="header-brand">
                <div className="brand-emblem-cluster">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <rect x="2" y="2" width="20" height="8" rx="2" />
                        <rect x="2" y="14" width="20" height="8" rx="2" />
                        <line x1="6" y1="6" x2="6.01" y2="6" />
                        <line x1="6" y1="18" x2="6.01" y2="18" />
                        <path d="M12 10v4" />
                    </svg>
                    <span className="emblem-beacon" />
                </div>
                <div className="brand-meta">
                    <div className="meta-row">
                        <span className="accent-tag">ITB ENTERPRISE CLUSTER</span>
                        <span className={`cluster-badge-pill ${isStandalone ? 'standalone' : 'active-active'}`}>
                            <span className="dot" />
                            {isStandalone ? 'STANDALONE ACTIVE (1/1 NODE)' : `ACTIVE-ACTIVE MESH (${totalActiveNodes} NODES)`}
                        </span>
                        <span className="platform-badge-pill">
                            <span className="platform-icon">🌐</span>
                            CROSS-PLATFORM (WIN/LINUX)
                        </span>
                        {isVipConfigured && (
                            <span className={`vip-badge-pill ${isHoldingVip ? 'holding' : 'standby'}`}>
                                <span className="vip-icon">{isHoldingVip ? '👑' : '🔗'}</span>
                                VIP: {vipAddress} [{isHoldingVip ? 'ACTIVE VIP LEADER' : 'PEER HOLDER'}]
                            </span>
                        )}
                    </div>
                    <h1>Cluster Architecture & High Availability Operations</h1>
                    <p className="subtitle">
                        ALWAYS ACTIVE-ACTIVE • ASYMMETRIC HARDWARE LOAD BALANCING • AUTONOMOUS UDP MESH DISCOVERY • CROSS-PLATFORM VIP
                    </p>
                </div>
            </div>

            <div className="header-controls">
                <div className="sync-status-cell">
                    <span className={`sync-dot ${isAutoRefresh ? 'live' : 'paused'}`} />
                    <span className="sync-lbl">
                        {isAutoRefresh ? 'LIVE (2.5s)' : 'PAUSED'}
                    </span>
                    <span className="sync-time">
                        {lastUpdated.toLocaleTimeString()}
                    </span>
                </div>

                <button
                    type="button"
                    className="btn-cluster-tool"
                    onClick={onToggleAutoRefresh}
                    title={isAutoRefresh ? 'Pause polling' : 'Resume polling'}
                >
                    {isAutoRefresh ? '⏸ Pause' : '▶ Resume'}
                </button>

                <button
                    type="button"
                    className="btn-cluster-tool btn-settings-trigger"
                    onClick={onOpenSettings}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                    <span>Cluster Config</span>
                </button>

                <button
                    type="button"
                    className="btn-cluster-nav-back"
                    onClick={() => onNavigate('portal')}
                >
                    <span>Exit Hub</span>
                    <span className="arrow">→</span>
                </button>
            </div>
        </header>
    );
}
