// ==========================================
// File: ClientApp/src/components/Cluster/components/topology/ClusterTopologySection.jsx
// ==========================================
import React from 'react';
import FloatingVipGateway from './FloatingVipGateway';
import StandaloneTopology from './StandaloneTopology';
import MeshTopologyGrid from './MeshTopologyGrid';
import ClusterInfraRow from './ClusterInfraRow';
import '../../styles/ClusterTopology.scss';

export default function ClusterTopologySection({
    isStandalone,
    clusterNodes,
    isHoldingVip,
    isVipConfigured,
    vipAddress,
    vipHolderNode,
    overview,
    optimalNodeId,
    pingResults,
    pingingNodeId,
    onPingNode,
    onScanLan,
    isScanning
}) {
    return (
        <section className="topology-card-section">
            <div className="section-title-row">
                <div className="title-left">
                    <span className="num-pill">01</span>
                    <h2>
                        {isStandalone
                            ? 'Autonomous Single-Node Topology & Mesh Listener'
                            : `Live Active-Active Mesh Topology (${clusterNodes.length} Nodes Online)`}
                    </h2>
                </div>
                <div className="title-right">
                    <span className="live-pulse-dot" />
                    <span className="sub-txt">
                        {isStandalone ? 'STANDALONE MODE • DISCOVERY ACTIVE' : 'ACTIVE-ACTIVE PEER MESH'}
                    </span>
                </div>
            </div>

            <div className="topology-canvas-container">
                {/* FLOATING VIP GATEWAY ANCHOR (TOP CENTER) */}
                <FloatingVipGateway
                    isHoldingVip={isHoldingVip}
                    isVipConfigured={isVipConfigured}
                    vipAddress={vipAddress}
                    vipHolderNode={vipHolderNode}
                />

                {/* CASE A: STANDALONE MODE (SINGLE SERVER OPERATING AUTONOMOUSLY) */}
                {isStandalone ? (
                    <StandaloneTopology
                        overview={overview}
                        isHoldingVip={isHoldingVip}
                        onScanLan={onScanLan}
                        isScanning={isScanning}
                    />
                ) : (
                    /* CASE B: MULTI-NODE ACTIVE-ACTIVE MESH TOPOLOGY */
                    <MeshTopologyGrid
                        clusterNodes={clusterNodes}
                        optimalNodeId={optimalNodeId}
                        pingResults={pingResults}
                        pingingNodeId={pingingNodeId}
                        onPingNode={onPingNode}
                    />
                )}

                {/* INFRASTRUCTURE LINKS ROW (STORAGE & FLEET) */}
                <ClusterInfraRow overview={overview} />
            </div>
        </section>
    );
}
