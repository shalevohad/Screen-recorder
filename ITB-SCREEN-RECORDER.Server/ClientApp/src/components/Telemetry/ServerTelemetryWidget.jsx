// ==========================================
// File: Client/src/components/UI/ServerTelemetryWidget.jsx
// ==========================================
import { useState, useEffect } from 'react';
import RadialGauge from './RadialGauge';
import './ServerTelemetryWidget.scss';

function SparklineChart({ data, color, limit = 40 }) {
    if (!data || data.length < 2) {
        return <div className="sparkline-placeholder" />;
    }

    const width = 80;
    const height = 24;

    const points = data
        .map((val, idx) => {
            const x = (idx / (limit - 1)) * width;
            const y = height - (Math.min(100, Math.max(0, val)) / 100) * height;
            return `${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(' ');

    return (
        <svg className="sparkline-svg" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
            <polyline
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
            />
        </svg>
    );
}

const calcTacticalBarPct = (rateKbps, maxLinkKbps = 1000000) => {
    if (!rateKbps || rateKbps <= 0) return 0;
    const maxLog = Math.log10(Math.max(1000, maxLinkKbps));
    const curLog = Math.log10(Math.max(1, rateKbps));
    const pct = (curLog / maxLog) * 100;
    return Math.min(100, Math.max(6, Math.round(pct)));
};

const formatStorageBytes = (bytes) => {
    if (!bytes || bytes <= 0) return '0T';
    const tb = bytes / (1024 * 1024 * 1024 * 1024);
    if (tb >= 1) return `${tb.toFixed(1)}T`;
    const gb = bytes / (1024 * 1024 * 1024);
    return `${Math.round(gb)}G`;
};

export default function ServerTelemetryWidget({ serverTelemetry, fleetC2Kbps = 0 }) {
    const historyPoints = 40;

    // Cluster detection & telemetry scope toggle
    const cluster = serverTelemetry?.cluster;
    const isClusterAvailable = Boolean(cluster && (cluster.totalNodes > 1 || (cluster.clusterMode && cluster.clusterMode !== 'Standalone')));
    const [telemetryScope, setTelemetryScope] = useState('cluster');
    const activeScope = isClusterAvailable ? telemetryScope : 'local';

    // Format helpers
    const formatLinkSpeed = (mbps) => {
        if (mbps >= 1000) {
            const gbps = mbps / 1000;
            return gbps % 1 === 0 ? `${gbps}G` : `${gbps.toFixed(1)}G`;
        }
        return `${Math.round(mbps)}M`;
    };

    const formatCurrentRate = (mbps) => {
        if (mbps >= 1000) return `${(mbps / 1000).toFixed(1)}G`;
        if (mbps >= 1) return `${mbps.toFixed(1)}M`;
        const kbps = mbps * 1000;
        return `${Math.round(kbps)}K`;
    };

    // CPU Metrics
    const cpuPct = activeScope === 'cluster'
        ? (cluster?.aggregateCpuPct ?? 0)
        : (serverTelemetry?.cpuUsagePct ?? serverTelemetry?.hostCpuUsagePct ?? 0);

    const appCpuPct = activeScope === 'cluster'
        ? (cluster?.aggregateAppCpuPct ?? 0)
        : (serverTelemetry?.appCpuUsagePct ?? serverTelemetry?.processCpuUsagePct ?? 0);

    const cpuTitle = activeScope === 'cluster' ? 'CLUSTER CPU' : 'HOST CPU';
    const cpuSub = activeScope === 'cluster'
        ? `Avg of ${cluster?.onlineNodesCount || cluster?.totalNodes || 1} Nodes`
        : `App ${appCpuPct.toFixed(1)}%`;

    // RAM Metrics
    const hostRamPct = activeScope === 'cluster'
        ? (cluster?.aggregateRamPct ?? 0)
        : (serverTelemetry?.hostRamPct ?? serverTelemetry?.hostRamUsagePct ?? 0);

    const totalRamGb = activeScope === 'cluster'
        ? (cluster?.aggregateTotalRamGb ?? 128)
        : Math.round((serverTelemetry?.hostTotalRamMb ?? 131072) / 1024);

    const usedRamGb = activeScope === 'cluster'
        ? (cluster?.aggregateUsedRamGb ?? ((hostRamPct / 100) * totalRamGb))
        : ((hostRamPct / 100) * totalRamGb);

    const appRamMb = activeScope === 'cluster'
        ? (cluster?.aggregateAppRamMb ?? 0)
        : (serverTelemetry?.appRamMb ?? serverTelemetry?.processRamMb ?? 0);

    const appRamDisplay = appRamMb >= 1024 ? `${(appRamMb / 1024).toFixed(1)}G` : `${Math.round(appRamMb)}M`;
    const totalRamDisplay = `${Math.round(totalRamGb)}G`;
    const hostUsedRamDisplay = `${usedRamGb.toFixed(1)}G`;

    const ramTitle = activeScope === 'cluster' ? 'CLUSTER RAM' : 'HOST RAM';
    const ramSub = activeScope === 'cluster'
        ? `${hostUsedRamDisplay} / ${totalRamDisplay}`
        : `App ${appRamDisplay}`;

    // NET Metrics
    const netTxMbps = activeScope === 'cluster'
        ? (cluster?.aggregateNicTxMbps ?? 0)
        : (serverTelemetry?.nicTotalTxMbps ?? 0);

    const netRxMbps = activeScope === 'cluster'
        ? (cluster?.aggregateNicRxMbps ?? 0)
        : (serverTelemetry?.nicTotalRxMbps ?? 0);

    const totalNetMbps = activeScope === 'cluster'
        ? (cluster?.aggregateNicTotalMbps ?? (netTxMbps + netRxMbps))
        : (netTxMbps + netRxMbps);

    const linkSpeedMbps = activeScope === 'cluster'
        ? (cluster?.aggregateLinkSpeedMbps ?? 1000)
        : (serverTelemetry?.linkSpeedMbps ?? serverTelemetry?.nicLinkSpeedMbps ?? 1000);

    const netUtilPct = activeScope === 'cluster'
        ? (cluster?.aggregateNicUtilizationPct ?? (totalNetMbps > 0 ? (totalNetMbps / linkSpeedMbps) * 100 : 0))
        : (serverTelemetry?.nicUtilizationPct ?? serverTelemetry?.appLineUtilizationPct ?? Math.min(100, (totalNetMbps / (linkSpeedMbps || 1)) * 100));

    const netTitle = activeScope === 'cluster' ? 'CLUSTER NET' : 'HOST NET';
    const netSub = activeScope === 'cluster'
        ? `${formatLinkSpeed(linkSpeedMbps)} FLEET`
        : `${formatLinkSpeed(linkSpeedMbps)} MAX`;

    const c2Kbps = serverTelemetry?.telemetryTxKbps ?? fleetC2Kbps;
    const linkSpeedKbps = (linkSpeedMbps || 1000) * 1000;
    const txPct = calcTacticalBarPct(netTxMbps * 1000, linkSpeedKbps);
    const rxPct = calcTacticalBarPct(netRxMbps * 1000, linkSpeedKbps);
    const netPct = calcTacticalBarPct(totalNetMbps * 1000, linkSpeedKbps);
    const c2Pct = calcTacticalBarPct(c2Kbps, 5000);

    // Storage pool telemetry metrics
    const storageData = serverTelemetry?.storage;
    const isAccessible = Boolean(storageData?.isAccessible);
    const isFallback = Boolean(storageData?.isFallbackActive);

    const totalStorageBytes = storageData?.totalSizeBytes ?? 0;
    const freeStorageBytes = storageData?.freeSizeBytes ?? 0;
    const usedStorageBytes = storageData?.usedSizeBytes ?? Math.max(0, totalStorageBytes - freeStorageBytes);

    const storageUsedPct = isAccessible && totalStorageBytes > 0
        ? (storageData?.usedPercent ?? ((usedStorageBytes / totalStorageBytes) * 100))
        : 0;

    const storageFreePct = isAccessible && totalStorageBytes > 0
        ? (storageData?.freePercent ?? ((freeStorageBytes / totalStorageBytes) * 100))
        : 0;

    const totalStorageDisplay = formatStorageBytes(totalStorageBytes);
    const freeStorageDisplay = formatStorageBytes(freeStorageBytes);
    const usedStorageDisplay = formatStorageBytes(usedStorageBytes);
    const currentIops = isAccessible ? Math.round(storageData?.currentIops ?? 0) : 0;

    const storagePath = storageData?.storagePath || '';
    const primaryPath = storageData?.primaryPath || '';
    const storageLabel = isFallback ? 'FALLBACK POOL' : (storageData?.storageLabel || 'STORAGE POOL');

    const [history, setHistory] = useState({
        cpu: [cpuPct],
        ram: [hostRamPct],
        net: [netUtilPct]
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setHistory(prev => ({
                cpu: [...prev.cpu, cpuPct].slice(-historyPoints),
                ram: [...prev.ram, hostRamPct].slice(-historyPoints),
                net: [...prev.net, netUtilPct].slice(-historyPoints)
            }));
        }, 0);
        return () => clearTimeout(timer);
    }, [cpuPct, hostRamPct, netUtilPct, historyPoints]);

    const linkCapacityDisplay = formatLinkSpeed(linkSpeedMbps);
    const c2Display = c2Kbps >= 1000 ? `${(c2Kbps / 1000).toFixed(1)}M` : `${Math.round(c2Kbps)}K`;

    const getStatusClass = (pct) => {
        if (pct >= 85) return 'crit';
        if (pct >= 70) return 'warn';
        return 'ok';
    };

    const getGraphColor = (pct) => {
        if (pct >= 85) return 'var(--accent-rose, #EF4444)';
        if (pct >= 70) return 'var(--accent-amber, #F59E0B)';
        return 'var(--accent-emerald, #10B981)';
    };

    const getStorageColor = (pct) => {
        if (!isAccessible) return 'rgba(148, 163, 184, 0.25)';
        if (isFallback) return 'var(--accent-amber, #F59E0B)';
        if (pct >= 90) return 'var(--accent-rose, #EF4444)';
        if (pct >= 75) return 'var(--accent-amber, #F59E0B)';
        return 'var(--accent-emerald, #10B981)';
    };

    const getStorageTooltip = () => {
        if (!isAccessible) {
            return `Storage Unreachable / Disconnected\nPrimary Target: ${primaryPath || 'None'}\nFallback Target: ${storagePath || 'None'}`;
        }
        if (isFallback) {
            return `⚠️ PRIMARY SHARE UNREACHABLE - FALLBACK ACTIVE\nActive Fallback: ${storagePath}\nPrimary Target: ${primaryPath || 'None'}\nAllocated: ${totalStorageDisplay} | Used: ${usedStorageDisplay} (${storageUsedPct.toFixed(1)}%)\nFree Available: ${freeStorageDisplay} (${storageFreePct.toFixed(1)}%)\nDisk IOPS: ${currentIops} IOPS`;
        }
        return `Storage Target: ${storagePath}\nAllocated: ${totalStorageDisplay} | Used: ${usedStorageDisplay} (${storageUsedPct.toFixed(1)}%)\nFree Available: ${freeStorageDisplay} (${storageFreePct.toFixed(1)}%)\nDisk IOPS: ${currentIops} IOPS`;
    };

    const getCpuTooltip = () => {
        if (activeScope === 'cluster' && cluster?.nodes?.length) {
            const lines = cluster.nodes.map(n =>
                `• ${n.displayName || n.nodeId} (${n.role || 'Node'}/${n.nodeMode || 'Active'}): ${Number(n.hostCpuPct || 0).toFixed(1)}% (${n.cpuCores || 4} cores${n.isOverloaded ? ' - OVERLOAD' : ''})`
            );
            return `CLUSTER CPU: ${cpuPct.toFixed(1)}% (Avg of ${cluster.onlineNodesCount || cluster.totalNodes} Nodes)\nTopology: ${cluster.clusterMode || 'Mesh'}\n\nNodes Breakdown:\n${lines.join('\n')}`;
        }
        return `Host CPU Load: ${cpuPct.toFixed(1)}%\nApp Process: ${appCpuPct.toFixed(1)}%`;
    };

    const getRamTooltip = () => {
        if (activeScope === 'cluster' && cluster?.nodes?.length) {
            const lines = cluster.nodes.map(n =>
                `• ${n.displayName || n.nodeId}: ${Number(n.hostRamPct || 0).toFixed(1)}% (Total: ${Number(n.totalRamGb || 8).toFixed(0)} GB)`
            );
            return `CLUSTER RAM: ${hostUsedRamDisplay} Used / ${totalRamDisplay} Total (${hostRamPct.toFixed(1)}%)\nApp Overhead: ${appRamDisplay}\n\nNodes Breakdown:\n${lines.join('\n')}`;
        }
        return `Host Total: ${hostUsedRamDisplay} / ${totalRamDisplay} (${hostRamPct.toFixed(1)}%) | App: ${appRamDisplay}`;
    };

    const getNetTooltip = () => {
        if (activeScope === 'cluster' && cluster?.nodes?.length) {
            const lines = cluster.nodes.map(n =>
                `• ${n.displayName || n.nodeId}: TX ${formatCurrentRate(n.nicTotalTxMbps || 0)} | RX ${formatCurrentRate(n.nicTotalRxMbps || 0)} (${n.activeStreamsCount || 0} streams, ${n.activeJobsCount || 0} cuts)`
            );
            return `CLUSTER NETWORK: ${formatCurrentRate(totalNetMbps)} Aggregate (${netUtilPct.toFixed(1)}%)\nFleet TX: ${formatCurrentRate(netTxMbps)} | Fleet RX: ${formatCurrentRate(netRxMbps)}\nFleet Link Capacity: ${formatLinkSpeed(linkSpeedMbps)}\nGrid Streams: ${cluster.totalIngestedStreams || 0} / ${cluster.totalStreamsCapacity || 0} Streams\nGrid Render Cuts: ${cluster.totalActiveRenderJobs || 0} / ${cluster.totalConcurrentJobsCapacity || 0} Cuts\n\nNodes Breakdown:\n${lines.join('\n')}`;
        }
        return `Host Network: ${formatCurrentRate(totalNetMbps)} (${netUtilPct.toFixed(1)}%)\nTX: ${formatCurrentRate(netTxMbps)} | RX: ${formatCurrentRate(netRxMbps)}\nLink Speed: ${formatLinkSpeed(linkSpeedMbps)}`;
    };

    return (
        <div className="server-telemetry-widget layout-large">
            {/* Tactical Scope Toggle: Cluster Aggregate vs Local Host */}
            {isClusterAvailable && (
                <div className="telemetry-scope-dock" role="group" aria-label="Telemetry Scope">
                    <button
                        type="button"
                        className={`scope-pill-btn ${activeScope === 'cluster' ? 'is-active' : ''}`}
                        onClick={() => setTelemetryScope('cluster')}
                        title={`Displaying Fleet Aggregate Telemetry for ${cluster.onlineNodesCount || cluster.totalNodes} Nodes in ${cluster.clusterMode || 'Active-Active'} Topology`}
                    >
                        <span className="scope-indicator-dot cluster-dot" />
                        <span className="scope-lbl">CLUSTER</span>
                        <span className="scope-badge">{cluster.onlineNodesCount || cluster.totalNodes} NODES</span>
                        <span className="scope-mode-sub">({cluster.clusterMode === 'Active-Active' ? 'ACT-ACT' : (cluster.clusterMode === 'Active-Standby' ? 'ACT-STBY' : 'GRID')})</span>
                    </button>
                    <button
                        type="button"
                        className={`scope-pill-btn ${activeScope === 'local' ? 'is-active' : ''}`}
                        onClick={() => setTelemetryScope('local')}
                        title={`Displaying Host-Local Telemetry for ${cluster.localNodeId || 'This Machine'}`}
                    >
                        <span className="scope-indicator-dot local-dot" />
                        <span className="scope-lbl">LOCAL</span>
                    </button>
                </div>
            )}

            {/* CPU Pod */}
            <div className={`telemetry-pod ${getStatusClass(cpuPct)}`} title={getCpuTooltip()}>
                <div className="pod-header">
                    <span className="pod-title">{cpuTitle}</span>
                    <span className="pod-sub">{cpuSub}</span>
                </div>
                <div className="pod-content-row">
                    <span className="pod-val">{cpuPct.toFixed(1)}%</span>
                    <div className="pod-graph-slot">
                        <SparklineChart data={history.cpu} color={getGraphColor(cpuPct)} limit={historyPoints} />
                    </div>
                </div>
                <div className="pod-track">
                    <div className="pod-bar" style={{ width: `${Math.min(100, cpuPct)}%` }} />
                </div>
            </div>

            {/* RAM Pod */}
            <div
                className={`telemetry-pod ${getStatusClass(hostRamPct)}`}
                title={getRamTooltip()}
            >
                <div className="pod-header">
                    <span className="pod-title">{ramTitle}</span>
                    <span className="pod-sub">{ramSub}</span>
                </div>
                <div className="pod-content-row">
                    <span className="pod-val">{hostRamPct.toFixed(1)}%</span>
                    <div className="pod-graph-slot">
                        <SparklineChart data={history.ram} color={getGraphColor(hostRamPct)} limit={historyPoints} />
                    </div>
                </div>
                <div className="pod-track">
                    <div className="pod-bar" style={{ width: `${Math.min(100, hostRamPct)}%` }} />
                </div>
            </div>

            {/* STORAGE POOL POD - Integrated with modern RadialGauge */}
            <div
                className={`telemetry-pod storage-pod-radial ${isAccessible
                        ? (isFallback ? 'is-fallback-active' : getStatusClass(storageUsedPct))
                        : 'is-disconnected'
                    }`}
                title={getStorageTooltip()}
            >
                <div className="pod-header">
                    <div className="pod-title-group">
                        {isFallback && <span className="fallback-beacon-dot" aria-hidden="true" />}
                        <span className={`pod-title ${isFallback ? 'fallback-title' : ''}`}>
                            {storageLabel}
                        </span>
                    </div>
                    <span className="pod-sub">
                        {isAccessible ? (
                            isFallback ? (
                                <span className="fallback-tag-badge">⚠️ FALLBACK</span>
                            ) : (
                                `${freeStorageDisplay} FREE`
                            )
                        ) : (
                            'OFFLINE'
                        )}
                    </span>
                </div>

                <div className="pod-content-row">
                    <span className={`pod-val ${isFallback ? 'fallback-val' : ''}`}>
                        {isAccessible ? `${storageUsedPct.toFixed(0)}%` : '--'}
                    </span>

                    <RadialGauge
                        size={32}
                        strokeWidth={2.4}
                        concentricSegments={
                            isAccessible
                                ? [
                                    { pct: storageUsedPct, color: getStorageColor(storageUsedPct) },
                                    { pct: storageFreePct, color: isFallback ? 'rgba(245, 158, 11, 0.4)' : 'var(--accent-cyan-light, #38BDF8)' }
                                ]
                                : [
                                    { pct: 0, color: 'rgba(148, 163, 184, 0.2)' },
                                    { pct: 0, color: 'rgba(148, 163, 184, 0.15)' }
                                ]
                        }
                        items={[
                            { label: isFallback ? 'LOC-FREE' : 'FREE', value: isAccessible ? freeStorageDisplay : '--', color: isAccessible ? (isFallback ? 'amber' : 'green') : 'muted' },
                            { label: 'TOTAL', value: isAccessible ? totalStorageDisplay : '--', color: isAccessible ? 'cyan' : 'muted' }
                        ]}
                    />
                </div>

                <div className="pod-track">
                    <div
                        className="pod-bar storage-bar"
                        style={{
                            width: isAccessible ? `${Math.min(100, storageUsedPct)}%` : '0%',
                            backgroundColor: getStorageColor(storageUsedPct)
                        }}
                    />
                </div>
            </div>

            {/* NET POD - Network utilization using modern RadialGauge cluster */}
            <div className={`telemetry-pod net-pod-radial ${getStatusClass(netUtilPct)}`} title={getNetTooltip()}>
                <div className="pod-header">
                    <span className="pod-title">{netTitle}</span>
                    <span className="pod-sub">{netSub}</span>
                </div>
                <div className="pod-content-row">
                    <span className="pod-val">{netUtilPct.toFixed(1)}%</span>

                    <div className="net-radials-cluster">
                        {/* Gauge 1: TX / RX */}
                        <RadialGauge
                            size={32}
                            strokeWidth={2.4}
                            title={`TX: ${formatCurrentRate(netTxMbps)} | RX: ${formatCurrentRate(netRxMbps)}`}
                            concentricSegments={[
                                { pct: txPct, color: 'var(--accent-cyan, #06B6D4)' },
                                { pct: rxPct, color: 'var(--accent-emerald, #10B981)' }
                            ]}
                            items={[
                                { label: 'TX', value: formatCurrentRate(netTxMbps), color: 'cyan' },
                                { label: 'RX', value: formatCurrentRate(netRxMbps), color: 'green' }
                            ]}
                        />

                        {/* Gauge 2: NET / Grid Streams */}
                        <RadialGauge
                            size={32}
                            strokeWidth={2.4}
                            title={activeScope === 'cluster'
                                ? `Streams: ${cluster?.totalIngestedStreams || 0}/${cluster?.totalStreamsCapacity || 0} | Cuts: ${cluster?.totalActiveRenderJobs || 0}/${cluster?.totalConcurrentJobsCapacity || 0}`
                                : `NET: ${formatCurrentRate(totalNetMbps)} | C2: ${c2Display}`
                            }
                            concentricSegments={[
                                { pct: netPct, color: 'var(--accent-cyan-light, #38BDF8)' },
                                { pct: c2Pct, color: '#C084FC' }
                            ]}
                            items={activeScope === 'cluster' ? [
                                { label: 'NET', value: formatCurrentRate(totalNetMbps), color: 'blue' },
                                { label: 'STM', value: `${cluster?.totalIngestedStreams || 0}`, color: 'purple' }
                            ] : [
                                { label: 'NET', value: formatCurrentRate(totalNetMbps), color: 'blue' },
                                { label: 'C2', value: c2Display, color: 'purple' }
                            ]}
                        />
                    </div>
                </div>
                <div className="pod-track">
                    <div className="pod-bar net-bar" style={{ width: `${Math.min(100, netUtilPct)}%` }} />
                </div>
            </div>
        </div>
    );
}