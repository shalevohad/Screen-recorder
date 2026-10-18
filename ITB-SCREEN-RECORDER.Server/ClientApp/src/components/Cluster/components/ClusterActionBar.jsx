// ==========================================
// File: ClientApp/src/components/Cluster/components/ClusterActionBar.jsx
// ==========================================
import React from 'react';
import '../styles/ClusterActionBar.scss';

export default function ClusterActionBar({
    isVipConfigured,
    isHoldingVip,
    isVipActionPending,
    vipActionFeedback,
    isScanning,
    onVipToggle,
    onScanLan,
    onNavigate
}) {
    return (
        <div className="cluster-action-bar">
            <div className="action-bar-label">
                <span className="icon">⚙</span>
                <span>TACTICAL CONTROLS:</span>
            </div>

            <div className="action-buttons-group">
                {/* VIP Force Takeover / Release */}
                {isVipConfigured && (
                    <>
                        {!isHoldingVip ? (
                            <button
                                type="button"
                                className="btn-action-tool vip-takeover"
                                onClick={() => onVipToggle('takeover')}
                                disabled={isVipActionPending}
                            >
                                <span className="icon">⚡</span>
                                <span>{isVipActionPending ? 'Claiming VIP...' : 'Force VIP Takeover Here'}</span>
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn-action-tool vip-release"
                                onClick={() => onVipToggle('release')}
                                disabled={isVipActionPending}
                            >
                                <span className="icon">⚡</span>
                                <span>{isVipActionPending ? 'Releasing VIP...' : 'Release VIP to Cluster'}</span>
                            </button>
                        )}
                    </>
                )}

                {/* LAN Discovery Radar Scan */}
                <button
                    type="button"
                    className="btn-action-tool radar"
                    onClick={onScanLan}
                    disabled={isScanning}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="6" />
                        <circle cx="12" cy="12" r="2" />
                        <path d="M12 12l7 4" />
                    </svg>
                    <span>{isScanning ? 'Scanning LAN Subnet...' : 'LAN Discovery Radar'}</span>
                </button>

                {/* Quick navigation to Recording Command Center */}
                <button
                    type="button"
                    className="btn-action-tool secondary"
                    onClick={() => onNavigate('recording')}
                >
                    <span>Screen Recording Center →</span>
                </button>
            </div>

            {/* Inline Feedback Pill */}
            {vipActionFeedback && (
                <div className={`action-feedback-pill ${vipActionFeedback.success ? 'success' : 'error'}`}>
                    {vipActionFeedback.message}
                </div>
            )}
        </div>
    );
}
