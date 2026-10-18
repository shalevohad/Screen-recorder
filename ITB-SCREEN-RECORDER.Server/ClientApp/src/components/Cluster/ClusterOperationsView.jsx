// ==========================================
// File: ClientApp/src/components/Cluster/ClusterOperationsView.jsx
// ==========================================
import { useState, useEffect, useCallback, useMemo } from 'react';
import './ClusterOperationsView.scss';

// Subcomponents
import ClusterHeader from './components/ClusterHeader';
import ClusterActionBar from './components/ClusterActionBar';
import ClusterTopologySection from './components/topology/ClusterTopologySection';
import ClusterWorkloadSection from './components/workload/ClusterWorkloadSection';
import LanDiscoveryModal from './components/LanDiscoveryModal';
import ClusterSettingsDrawer from './components/ClusterSettingsDrawer';

export default function ClusterOperationsView({ onNavigate }) {
    const [overview, setOverview] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAutoRefresh, setIsAutoRefresh] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(() => new Date());

    // Action states
    const [pingResults, setPingResults] = useState({});
    const [pingingNodeId, setPingingNodeId] = useState(null);

    const [isScanning, setIsScanning] = useState(false);
    const [scanResults, setScanResults] = useState(null);
    const [isScanModalOpen, setIsScanModalOpen] = useState(false);

    const [isVipActionPending, setIsVipActionPending] = useState(false);
    const [vipActionFeedback, setVipActionFeedback] = useState(null);

    // Quick Settings Drawer
    const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);
    const [settingsForm, setSettingsForm] = useState({
        role: 'Active-Active',
        priority: 1,
        partnerServerUrl: '',
        enableVirtualIp: false,
        virtualIp: '',
        virtualIpSubnetMask: '',
        networkInterfaceName: '',
        autoFailoverDashboard: true,
        dashboardFailoverDelaySeconds: 8,
        multicastAddress: '',
        broadcastAddress: '',
        port: 5098,
        enableBroadcastFallback: true
    });
    const [isSavingSettings, setIsSavingSettings] = useState(false);
    const [settingsFeedback, setSettingsFeedback] = useState(null);

    // Fetch Cluster Overview
    const fetchOverview = useCallback(async () => {
        try {
            const res = await fetch('/api/v1/cluster/overview');
            if (!res.ok) throw new Error(`HTTP error ${res.status}`);
            const data = await res.json();
            setOverview(data);
            setLastUpdated(new Date());
            setError(null);

            // Seed settings drawer
            if (data?.LocalNode && data?.Discovery) {
                setSettingsForm(prev => ({
                    ...prev,
                    role: data.LocalNode.Role || 'Active-Active',
                    priority: data.LocalNode.Priority ?? 1,
                    partnerServerUrl: data.PartnerNode?.PartnerUrl || '',
                    enableVirtualIp: data.LocalNode.VipStatus?.EnableVirtualIp || false,
                    virtualIp: data.LocalNode.VipStatus?.VirtualIp || '',
                    virtualIpSubnetMask: data.LocalNode.VipStatus?.SubnetMask || data.Discovery?.VirtualIpSubnetMask || '',
                    networkInterfaceName: data.LocalNode.VipStatus?.ActiveInterface || '',
                    autoFailoverDashboard: data.Discovery.AutoFailoverDashboard !== false,
                    dashboardFailoverDelaySeconds: data.Discovery.FailoverDelaySeconds || 8,
                    multicastAddress: data.Discovery.MulticastAddress || '',
                    broadcastAddress: data.Discovery.BroadcastAddress || '',
                    port: data.Discovery.Port || 5098,
                    enableBroadcastFallback: data.Discovery.EnableBroadcastFallback !== false
                }));
            }
        } catch (err) {
            console.error('Failed to load cluster overview:', err);
            setError(err.message || 'Unable to connect to Cluster API');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOverview();
        if (!isAutoRefresh) return;
        const timer = setInterval(fetchOverview, 2500);
        return () => clearInterval(timer);
    }, [fetchOverview, isAutoRefresh]);

    // Handle Ping Node
    const handlePingNode = async (targetNode) => {
        if (!targetNode?.ApiBaseUrl) return;
        setPingingNodeId(targetNode.NodeId || targetNode.ApiBaseUrl);
        try {
            const res = await fetch('/api/v1/cluster/ping-partner', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ partnerUrl: targetNode.ApiBaseUrl })
            });
            const data = await res.json();
            setPingResults(prev => ({ ...prev, [targetNode.NodeId || targetNode.ApiBaseUrl]: data }));
        } catch (err) {
            setPingResults(prev => ({
                ...prev,
                [targetNode.NodeId || targetNode.ApiBaseUrl]: { success: false, message: err.message || 'Ping failed' }
            }));
        } finally {
            setPingingNodeId(null);
        }
    };

    // Handle LAN Scan
    const handleScanLan = async () => {
        setIsScanning(true);
        setIsScanModalOpen(true);
        setScanResults(null);
        try {
            const res = await fetch('/api/v1/cluster/scan-lan', { method: 'POST' });
            const data = await res.json();
            setScanResults(data);
        } catch (err) {
            setScanResults({ nodes: [], error: err.message || 'Scan failed' });
        } finally {
            setIsScanning(false);
        }
    };

    // Handle VIP Takeover / Release
    const handleVipToggle = async (action) => {
        setIsVipActionPending(true);
        setVipActionFeedback(null);
        try {
            const endpoint = action === 'takeover' ? '/api/v1/cluster/vip/takeover' : '/api/v1/cluster/vip/release';
            const res = await fetch(endpoint, { method: 'POST' });
            const data = await res.json();
            setVipActionFeedback(data);
            await fetchOverview();
        } catch (err) {
            setVipActionFeedback({ success: false, message: err.message || 'VIP action failed' });
        } finally {
            setIsVipActionPending(false);
        }
    };

    // Handle Save Cluster Settings
    const handleSaveSettings = async (e) => {
        e.preventDefault();
        setIsSavingSettings(true);
        setSettingsFeedback(null);
        try {
            const res = await fetch('/api/v1/cluster/update-config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settingsForm)
            });
            const data = await res.json();
            setSettingsFeedback(data);
            if (data.success) {
                await fetchOverview();
                setTimeout(() => setIsSettingsDrawerOpen(false), 1200);
            }
        } catch (err) {
            setSettingsFeedback({ success: false, message: err.message || 'Save failed' });
        } finally {
            setIsSavingSettings(false);
        }
    };

    const handleSettingsChange = (patch) => {
        setSettingsForm(prev => ({ ...prev, ...patch }));
    };

    const isHoldingVip = overview?.LocalNode?.VipStatus?.IsHoldingVip;
    const isVipConfigured = overview?.LocalNode?.VipStatus?.EnableVirtualIp && overview?.LocalNode?.VipStatus?.VirtualIp;
    const vipAddress = overview?.LocalNode?.VipStatus?.VirtualIp || 'Not Configured';

    // Dynamic mesh state
    const clusterNodes = overview?.ClusterNodes || [];
    const isStandalone = overview?.IsStandalone !== false && clusterNodes.length <= 1;
    const totalActiveNodes = overview?.TotalActiveNodes || Math.max(1, clusterNodes.length);
    const optimalNodeId = overview?.OptimalWorkloadNode?.NodeId;

    // Identify who holds VIP across all nodes
    const vipHolderNode = useMemo(() => {
        if (!isVipConfigured) return null;
        if (isHoldingVip) return overview?.LocalNode?.MachineName || 'This Local Node';
        const remoteHolder = clusterNodes.find(n => n.IsHoldingVip && !n.IsLocal);
        return remoteHolder?.MachineName || 'Elected Cluster Leader';
    }, [isVipConfigured, isHoldingVip, clusterNodes, overview]);

    return (
        <div className="cluster-ops-container" dir="ltr">
            {/* Top Tactical Command Header */}
            <ClusterHeader
                isStandalone={isStandalone}
                totalActiveNodes={totalActiveNodes}
                isVipConfigured={isVipConfigured}
                isHoldingVip={isHoldingVip}
                vipAddress={vipAddress}
                isAutoRefresh={isAutoRefresh}
                lastUpdated={lastUpdated}
                onToggleAutoRefresh={() => setIsAutoRefresh(p => !p)}
                onOpenSettings={() => setIsSettingsDrawerOpen(true)}
                onNavigate={onNavigate}
            />

            {/* Quick Action & Diagnostics Bar */}
            <ClusterActionBar
                isVipConfigured={isVipConfigured}
                isHoldingVip={isHoldingVip}
                isVipActionPending={isVipActionPending}
                vipActionFeedback={vipActionFeedback}
                isScanning={isScanning}
                onVipToggle={handleVipToggle}
                onScanLan={handleScanLan}
                onNavigate={onNavigate}
            />

            {/* Main Operational Canvas */}
            <div className="cluster-main-grid">
                {/* 1. VISUAL TOPOLOGY & CONNECTIVITY MAP */}
                <ClusterTopologySection
                    isStandalone={isStandalone}
                    clusterNodes={clusterNodes}
                    isHoldingVip={isHoldingVip}
                    isVipConfigured={isVipConfigured}
                    vipAddress={vipAddress}
                    vipHolderNode={vipHolderNode}
                    overview={overview}
                    optimalNodeId={optimalNodeId}
                    pingResults={pingResults}
                    pingingNodeId={pingingNodeId}
                    onPingNode={handlePingNode}
                    onScanLan={handleScanLan}
                    isScanning={isScanning}
                />

                {/* 2. LOAD BALANCER & HARDWARE METRICS SECTION */}
                <ClusterWorkloadSection
                    overview={overview}
                    clusterNodes={clusterNodes}
                    optimalNodeId={optimalNodeId}
                    totalActiveNodes={totalActiveNodes}
                    isStandalone={isStandalone}
                />
            </div>

            {/* LAN DISCOVERY RADAR MODAL */}
            <LanDiscoveryModal
                isOpen={isScanModalOpen}
                onClose={() => setIsScanModalOpen(false)}
                isScanning={isScanning}
                scanResults={scanResults}
                overview={overview}
                onSelectNode={(nodeApiBaseUrl) => {
                    handleSettingsChange({ partnerServerUrl: nodeApiBaseUrl });
                    setIsScanModalOpen(false);
                    setIsSettingsDrawerOpen(true);
                }}
                onRescan={handleScanLan}
            />

            {/* QUICK CLUSTER SETTINGS DRAWER */}
            <ClusterSettingsDrawer
                isOpen={isSettingsDrawerOpen}
                onClose={() => setIsSettingsDrawerOpen(false)}
                settingsForm={settingsForm}
                onSettingsChange={handleSettingsChange}
                onSave={handleSaveSettings}
                isSaving={isSavingSettings}
                feedback={settingsFeedback}
            />
        </div>
    );
}
