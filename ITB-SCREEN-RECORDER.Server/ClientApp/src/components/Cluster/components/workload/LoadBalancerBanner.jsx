// ==========================================
// File: ClientApp/src/components/Cluster/components/workload/LoadBalancerBanner.jsx
// ==========================================
import React from 'react';

export default function LoadBalancerBanner({ totalActiveNodes, isStandalone }) {
    return (
        <div className="lb-proportional-banner">
            <div className="banner-icon">⚖️</div>
            <div className="banner-content">
                <h4>Intelligent Asymmetric Hardware Workload Balancing</h4>
                <p>
                    The cluster automatically evaluates node capacity (NVIDIA NVENC 3.5x, Intel QSV 2.0x, CPU 1.0x) and routes new stream recordings and FFMPEG transcoding tasks to maintain balanced operational strain percentage across all active instances.
                </p>
            </div>
            <div className="banner-ratio-pills">
                <span className="ratio-pill primary">
                    Current Active Nodes: {totalActiveNodes}
                </span>
                <span className="ratio-divider">•</span>
                <span className="ratio-pill secondary">
                    Mode: {isStandalone ? 'Autonomous Single-Node' : 'Active-Active Mesh'}
                </span>
            </div>
        </div>
    );
}
