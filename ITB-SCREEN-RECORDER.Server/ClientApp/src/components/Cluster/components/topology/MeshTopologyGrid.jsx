// ==========================================
// File: ClientApp/src/components/Cluster/components/topology/MeshTopologyGrid.jsx
// ==========================================
import React from 'react';
import MeshNodeCard from './MeshNodeCard';

export default function MeshTopologyGrid({
    clusterNodes,
    optimalNodeId,
    pingResults,
    pingingNodeId,
    onPingNode
}) {
    return (
        <div className="topology-mesh-nodes-grid">
            {clusterNodes.map(node => {
                const isOptimal = node.NodeId === optimalNodeId;
                const isLocalNode = node.IsLocal;
                const pingData = pingResults[node.NodeId || node.ApiBaseUrl];
                const isPingingThis = pingingNodeId === (node.NodeId || node.ApiBaseUrl);

                return (
                    <MeshNodeCard
                        key={node.NodeId || node.MachineName}
                        node={node}
                        isOptimal={isOptimal}
                        isLocalNode={isLocalNode}
                        pingData={pingData}
                        isPingingThis={isPingingThis}
                        onPingNode={onPingNode}
                    />
                );
            })}
        </div>
    );
}
