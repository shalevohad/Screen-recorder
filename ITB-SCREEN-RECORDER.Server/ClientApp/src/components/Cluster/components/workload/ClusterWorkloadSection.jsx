// ==========================================
// File: ClientApp/src/components/Cluster/components/workload/ClusterWorkloadSection.jsx
// ==========================================
import React from 'react';
import WorkloadMetricsGrid from './WorkloadMetricsGrid';
import MeshLoadMatrix from './MeshLoadMatrix';
import LoadBalancerBanner from './LoadBalancerBanner';
import '../../styles/ClusterWorkload.scss';

export default function ClusterWorkloadSection({
    overview,
    clusterNodes,
    optimalNodeId,
    totalActiveNodes,
    isStandalone
}) {
    return (
        <section className="workload-card-section">
            <div className="section-title-row">
                <div className="title-left">
                    <span className="num-pill">02</span>
                    <h2>Active-Active Load Balancer & Dynamic Hardware Distribution</h2>
                </div>
                <div className="title-right">
                    <span className="encoder-tag">
                        ACTIVE ENCODER: <strong>{overview?.Workload?.DetectedEncoder?.toUpperCase() || 'LIBX264'}</strong>
                    </span>
                </div>
            </div>

            <WorkloadMetricsGrid workload={overview?.Workload} />

            <MeshLoadMatrix
                clusterNodes={clusterNodes}
                optimalNodeId={optimalNodeId}
            />

            <LoadBalancerBanner
                totalActiveNodes={totalActiveNodes}
                isStandalone={isStandalone}
            />
        </section>
    );
}
