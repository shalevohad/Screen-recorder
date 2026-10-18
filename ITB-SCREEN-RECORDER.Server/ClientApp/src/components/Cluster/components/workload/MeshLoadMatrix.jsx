// ==========================================
// File: ClientApp/src/components/Cluster/components/workload/MeshLoadMatrix.jsx
// ==========================================
import React from 'react';

export default function MeshLoadMatrix({ clusterNodes, optimalNodeId }) {
    if (!clusterNodes || clusterNodes.length <= 1) return null;

    return (
        <div className="mesh-load-comparison-matrix">
            <div className="matrix-header">
                <span className="matrix-icon">⚖️</span>
                <h3>Cluster-Wide Workload Balancing Matrix (Active-Active)</h3>
            </div>
            <div className="matrix-table-wrap">
                <table className="mesh-load-table">
                    <thead>
                        <tr>
                            <th>Node</th>
                            <th>Hardware Engine</th>
                            <th>Capacity Weight</th>
                            <th>CPU Load</th>
                            <th>Active Streams</th>
                            <th>Normalized Load Score</th>
                            <th>Routing Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clusterNodes.map(n => {
                            const isSelected = n.NodeId === optimalNodeId;
                            return (
                                <tr key={n.NodeId} className={isSelected ? 'optimal-row' : ''}>
                                    <td className="node-cell">
                                        <span className="dot" />
                                        <strong>{n.MachineName}</strong> {n.IsLocal && <span className="tag">Local</span>}
                                    </td>
                                    <td>{n.Hardware?.DetectedEncoder?.toUpperCase()}</td>
                                    <td><span className="weight-pill">{n.Hardware?.CapacityWeight || 1.0}x</span></td>
                                    <td>{n.Workload?.HostCpuPct ?? 0}%</td>
                                    <td>{n.Workload?.ActiveStreams ?? 0}</td>
                                    <td className="score-cell font-bold cyan">{n.Workload?.NormalizedLoadScore ?? 0} pts</td>
                                    <td>
                                        {isSelected ? (
                                            <span className="optimal-badge">⚡ Optimal Route (New Ingest)</span>
                                        ) : (
                                            <span className="balanced-badge">Active Participant</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
