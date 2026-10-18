// ==========================================
// File: ClientApp/src/components/Cluster/components/topology/FloatingVipGateway.jsx
// ==========================================
import React from 'react';

export default function FloatingVipGateway({
    isHoldingVip,
    isVipConfigured,
    vipAddress,
    vipHolderNode
}) {
    return (
        <div className={`topology-vip-anchor ${isHoldingVip ? 'holding-local' : (isVipConfigured ? 'holding-partner' : 'disabled')}`}>
            <div className="vip-diamond-box">
                <div className="diamond-glow" />
                <div className="diamond-inner">
                    <span className="vip-symbol">⚡</span>
                    <span className="vip-title">CLUSTER VIP</span>
                    <span className="vip-ip">{vipAddress}</span>
                </div>
            </div>
            <div className="vip-meta-badge">
                {isVipConfigured ? (
                    <>
                        <span className="owner-txt">
                            ACTIVE GATEWAY OWNER: <strong>{vipHolderNode}</strong>
                        </span>
                        <span className="arp-txt">Gratuitous ARP Broadcasting (Cross-Platform)</span>
                    </>
                ) : (
                    <span className="unconfigured-txt">Direct IP Ingest Mode (VIP Disabled)</span>
                )}
            </div>
        </div>
    );
}
