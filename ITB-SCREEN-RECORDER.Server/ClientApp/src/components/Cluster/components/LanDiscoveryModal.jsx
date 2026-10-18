// ==========================================
// File: ClientApp/src/components/Cluster/components/LanDiscoveryModal.jsx
// ==========================================
import React from 'react';
import '../styles/LanDiscoveryModal.scss';

export default function LanDiscoveryModal({
    isOpen,
    onClose,
    isScanning,
    scanResults,
    overview,
    onSelectNode,
    onRescan
}) {
    if (!isOpen) return null;

    return (
        <div className="cluster-modal-backdrop" onClick={onClose}>
            <div className="cluster-modal-window" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="modal-title-row">
                        <span className="radar-icon">📡</span>
                        <h3>LAN Discovery Radar Scan</h3>
                    </div>
                    <button
                        type="button"
                        className="btn-close-modal"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <div className="modal-body">
                    <p className="modal-desc">
                        Broadcasted UDP probe across local subnet ({scanResults?.scannedBroadcast || overview?.Discovery?.BroadcastAddress || '255.255.255.255'}) and multicast group ({scanResults?.scannedMulticast || overview?.Discovery?.MulticastAddress || 'Disabled'}:{scanResults?.scannedPort || overview?.Discovery?.Port || 5098}).
                    </p>

                    {isScanning ? (
                        <div className="scanning-state-box">
                            <div className="radar-spinner" />
                            <span>Listening for node beacons across the local network...</span>
                        </div>
                    ) : scanResults?.nodes?.length > 0 ? (
                        <div className="discovered-nodes-list">
                            {scanResults.nodes.map((node, idx) => (
                                <div key={idx} className="discovered-node-item">
                                    <div className="item-left">
                                        <span className="node-icon">🖥️</span>
                                        <div className="node-details">
                                            <div className="node-head">
                                                <span className="name">{node.ServerName || node.ServerId}</span>
                                                <span className={`pill ${node.Role?.toLowerCase()}`}>{node.Role}</span>
                                                {node.VirtualIp && (
                                                    <span className="vip-chip">VIP: {node.VirtualIp}</span>
                                                )}
                                            </div>
                                            <span className="ip-info">{node.RemoteIp} • API: {node.ApiBaseUrl}</span>
                                        </div>
                                    </div>
                                    <div className="item-right">
                                        <button
                                            type="button"
                                            className="btn-use-partner"
                                            onClick={() => onSelectNode(node.ApiBaseUrl)}
                                        >
                                            Select Node
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-nodes-box">
                            <p>No other active ITB servers detected on this subnet. Operating as autonomous single node.</p>
                            <button
                                type="button"
                                className="btn-rescan"
                                onClick={onRescan}
                            >
                                Scan Again
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
