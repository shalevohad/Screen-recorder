// ==========================================
// File: ClientApp/src/components/Cluster/components/ClusterSettingsDrawer.jsx
// ==========================================
import React from 'react';
import '../styles/ClusterSettingsDrawer.scss';

export default function ClusterSettingsDrawer({
    isOpen,
    onClose,
    settingsForm,
    onSettingsChange,
    onSave,
    isSaving,
    feedback
}) {
    if (!isOpen) return null;

    return (
        <div className="cluster-drawer-backdrop" onClick={onClose}>
            <div className="cluster-drawer-panel" onClick={e => e.stopPropagation()}>
                <div className="drawer-header">
                    <div className="drawer-title-row">
                        <span className="drawer-icon">⚙️</span>
                        <h3>Cluster & VIP Configuration</h3>
                    </div>
                    <button
                        type="button"
                        className="btn-close-drawer"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <form className="drawer-form" onSubmit={onSave}>
                    <div className="form-group">
                        <label>Cluster Operational Mode / Role</label>
                        <select
                            value={settingsForm.role}
                            onChange={e => onSettingsChange({ role: e.target.value })}
                        >
                            <option value="Active-Active">Active-Active (Dynamic Distributed Mesh)</option>
                            <option value="Standalone">Standalone (Single Independent Server)</option>
                            <option value="Aggregate">Aggregate (Super-Server Studio)</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>VIP Election Priority Level</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={settingsForm.priority}
                            onChange={e => onSettingsChange({ priority: parseInt(e.target.value) || 1 })}
                        />
                        <span className="helper-txt">Lower number = higher VIP election priority (1 = preferred VIP leader)</span>
                    </div>

                    <div className="form-group">
                        <label>Peer Server URL (Optional)</label>
                        <input
                            type="text"
                            placeholder="Leave empty for zero-conf UDP auto-discovery"
                            value={settingsForm.partnerServerUrl}
                            onChange={e => onSettingsChange({ partnerServerUrl: e.target.value })}
                        />
                        <span className="helper-txt">Leave empty to discover cluster nodes automatically via LAN Multicast/Broadcast</span>
                    </div>

                    <div className="form-divider" />

                    <div className="form-group checkbox-group">
                        <label className="custom-check-row">
                            <input
                                type="checkbox"
                                checked={settingsForm.enableVirtualIp}
                                onChange={e => onSettingsChange({ enableVirtualIp: e.target.checked })}
                            />
                            <span className="check-title">Enable Cross-Platform Virtual IP (VIP)</span>
                        </label>
                    </div>

                    {settingsForm.enableVirtualIp && (
                        <>
                            <div className="form-group">
                                <label>Virtual IP (VIP) Address</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 192.168.1.200"
                                    value={settingsForm.virtualIp}
                                    onChange={e => onSettingsChange({ virtualIp: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>VIP Subnet Mask</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 255.255.255.0"
                                    value={settingsForm.virtualIpSubnetMask}
                                    onChange={e => onSettingsChange({ virtualIpSubnetMask: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Network Interface Name (Optional)</label>
                                <input
                                    type="text"
                                    placeholder="Leave empty for auto-detection (Windows: Ethernet / Linux: eth0)"
                                    value={settingsForm.networkInterfaceName}
                                    onChange={e => onSettingsChange({ networkInterfaceName: e.target.value })}
                                />
                            </div>
                        </>
                    )}

                    <div className="form-divider" />
                    <div className="drawer-section-title" style={{ color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                        Network & Discovery Mesh Configuration
                    </div>

                    <div className="form-group">
                        <label>UDP Multicast Group Address</label>
                        <input
                            type="text"
                            placeholder="e.g. 239.255.10.90"
                            value={settingsForm.multicastAddress}
                            onChange={e => onSettingsChange({ multicastAddress: e.target.value })}
                        />
                        <span className="helper-txt">Administratively scoped IPv4 Multicast group used for cluster peer heartbeat</span>
                    </div>

                    <div className="form-group">
                        <label>Subnet Broadcast Address</label>
                        <input
                            type="text"
                            placeholder="e.g. 255.255.255.255"
                            value={settingsForm.broadcastAddress}
                            onChange={e => onSettingsChange({ broadcastAddress: e.target.value })}
                        />
                        <span className="helper-txt">Fallback subnet broadcast address when multicast is restricted</span>
                    </div>

                    <div className="form-group">
                        <label>UDP Discovery Port</label>
                        <input
                            type="number"
                            min="1024"
                            max="65535"
                            placeholder="5098"
                            value={settingsForm.port}
                            onChange={e => onSettingsChange({ port: parseInt(e.target.value) || 5098 })}
                        />
                    </div>

                    <div className="form-divider" />

                    <div className="form-group checkbox-group">
                        <label className="custom-check-row">
                            <input
                                type="checkbox"
                                checked={settingsForm.autoFailoverDashboard}
                                onChange={e => onSettingsChange({ autoFailoverDashboard: e.target.checked })}
                            />
                            <span className="check-title">Auto-Failover Dashboard to Peer Node on Failure</span>
                        </label>
                    </div>

                    <div className="form-group">
                        <label>Failover Delay Countdown (Seconds)</label>
                        <input
                            type="number"
                            min="2"
                            max="60"
                            value={settingsForm.dashboardFailoverDelaySeconds}
                            onChange={e => onSettingsChange({ dashboardFailoverDelaySeconds: parseInt(e.target.value) || 8 })}
                        />
                    </div>

                    {feedback && (
                        <div className={`drawer-feedback-pill ${feedback.success ? 'success' : 'error'}`}>
                            {feedback.message}
                        </div>
                    )}

                    <div className="drawer-actions">
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-save"
                            disabled={isSaving}
                        >
                            {isSaving ? 'Saving...' : 'Save Configuration'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
