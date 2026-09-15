import { useState } from 'react';
import './ServerTelemetryWidget.scss';

function SparklineChart({ data, color, limit = 40 }) {
    if (!data || data.length < 2) {
        return <div className="sparkline-placeholder"></div>;
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

export default function ServerTelemetryWidget({ serverTelemetry, fleetC2Kbps = 0 }) {
    const historyPoints = 40;

    const cpuPct = serverTelemetry?.cpuUsagePct ?? serverTelemetry?.hostCpuUsagePct ?? 0;
    const appCpuPct = serverTelemetry?.appCpuUsagePct ?? serverTelemetry?.processCpuUsagePct ?? 0;

    const hostRamPct = serverTelemetry?.hostRamPct ?? serverTelemetry?.hostRamUsagePct ?? 0;
    const appRamMb = serverTelemetry?.appRamMb ?? serverTelemetry?.processRamMb ?? 0;
    const hostTotalRamMb = serverTelemetry?.hostTotalRamMb ?? 131072;
    const appRamDisplay = appRamMb >= 1024 ? `${(appRamMb / 1024).toFixed(1)}G` : `${Math.round(appRamMb)}M`;
    const totalRamGb = Math.round(hostTotalRamMb / 1024);
    const totalRamDisplay = `${totalRamGb}G`;
    const hostUsedRamDisplay = `${((hostRamPct / 100) * totalRamGb).toFixed(1)}G`;

    const netTxMbps = serverTelemetry?.nicTotalTxMbps ?? 0;
    const netRxMbps = serverTelemetry?.nicTotalRxMbps ?? 0;
    const totalNetMbps = netTxMbps + netRxMbps;
    const c2Kbps = serverTelemetry?.telemetryTxKbps ?? fleetC2Kbps;

    const linkSpeedMbps = serverTelemetry?.linkSpeedMbps ?? serverTelemetry?.nicLinkSpeedMbps ?? 1000;
    const netUtilPct = serverTelemetry?.nicUtilizationPct ?? serverTelemetry?.appLineUtilizationPct ?? Math.min(100, (totalNetMbps / (linkSpeedMbps || 1)) * 100);

    const linkSpeedKbps = (linkSpeedMbps || 1000) * 1000;
    const txPct = calcTacticalBarPct(netTxMbps * 1000, linkSpeedKbps);
    const rxPct = calcTacticalBarPct(netRxMbps * 1000, linkSpeedKbps);
    const netPct = calcTacticalBarPct(totalNetMbps * 1000, linkSpeedKbps);
    const c2Pct = calcTacticalBarPct(c2Kbps, 5000);

    const [history, setHistory] = useState({
        cpu: [cpuPct],
        ram: [hostRamPct],
        net: [netUtilPct],
        lastCpu: cpuPct,
        lastRam: hostRamPct,
        lastNet: netUtilPct
    });

    const isMetricsChanged = cpuPct !== history.lastCpu || hostRamPct !== history.lastRam || netUtilPct !== history.lastNet;

    const cpuHistory = isMetricsChanged ? [...history.cpu, cpuPct].slice(-historyPoints) : history.cpu;
    const ramHistory = isMetricsChanged ? [...history.ram, hostRamPct].slice(-historyPoints) : history.ram;
    const netHistory = isMetricsChanged ? [...history.net, netUtilPct].slice(-historyPoints) : history.net;

    if (isMetricsChanged) {
        setHistory({
            cpu: cpuHistory,
            ram: ramHistory,
            net: netHistory,
            lastCpu: cpuPct,
            lastRam: hostRamPct,
            lastNet: netUtilPct
        });
    }

    const formatCurrentRate = (mbps) => {
        if (mbps >= 1000) return `${(mbps / 1000).toFixed(1)}G`;
        if (mbps >= 1) return `${mbps.toFixed(1)}M`;
        const kbps = mbps * 1000;
        return `${Math.round(kbps)}K`;
    };

    const formatLinkSpeed = (mbps) => {
        if (mbps >= 1000) {
            const gbps = mbps / 1000;
            return gbps % 1 === 0 ? `${gbps}G` : `${gbps.toFixed(1)}G`;
        }
        return `${Math.round(mbps)}M`;
    };

    const linkCapacityDisplay = formatLinkSpeed(linkSpeedMbps);
    const c2Display = c2Kbps >= 1000 ? `${(c2Kbps / 1000).toFixed(1)}M` : `${Math.round(c2Kbps)}K`;

    const getStatusClass = (pct) => {
        if (pct >= 85) return 'crit';
        if (pct >= 70) return 'warn';
        return 'ok';
    };

    const getGraphColor = (pct) => {
        if (pct >= 85) return 'var(--c2-red)';
        if (pct >= 70) return 'var(--c2-yellow)';
        return 'var(--c2-green)';
    };

    return (
        <div className="server-telemetry-widget layout-large">
            <div className={`telemetry-pod ${getStatusClass(cpuPct)}`}>
                <div className="pod-header">
                    <span className="pod-title">CPU LOAD</span>
                    <span className="pod-sub">App {appCpuPct.toFixed(1)}%</span>
                </div>
                <div className="pod-content-row">
                    <span className="pod-val">{cpuPct.toFixed(1)}%</span>
                    <div className="pod-graph-slot">
                        <SparklineChart data={cpuHistory} color={getGraphColor(cpuPct)} limit={historyPoints} />
                    </div>
                </div>
                <div className="pod-track">
                    <div className="pod-bar" style={{ width: `${Math.min(100, cpuPct)}%` }}></div>
                </div>
            </div>

            <div
                className={`telemetry-pod ${getStatusClass(hostRamPct)}`}
                title={`Host Total: ${hostUsedRamDisplay} / ${totalRamDisplay} (${hostRamPct.toFixed(1)}%) | App: ${appRamDisplay}`}
            >
                <div className="pod-header">
                    <span className="pod-title">RAM USAGE</span>
                    <span className="pod-sub">App {appRamDisplay}</span>
                </div>
                <div className="pod-content-row">
                    <span className="pod-val">{hostRamPct.toFixed(1)}%</span>
                    <div className="pod-graph-slot">
                        <SparklineChart data={ramHistory} color={getGraphColor(hostRamPct)} limit={historyPoints} />
                    </div>
                </div>
                <div className="pod-track">
                    <div className="pod-bar" style={{ width: `${Math.min(100, hostRamPct)}%` }}></div>
                </div>
            </div>

            <div className={`telemetry-pod net-pod ${getStatusClass(netUtilPct)}`}>
                <div className="pod-header">
                    <span className="pod-title">NET LOAD</span>
                    <span className="pod-sub">{linkCapacityDisplay} MAX</span>
                </div>
                <div className="pod-content-row">
                    <span className="pod-val">{netUtilPct.toFixed(1)}%</span>

                    <div className="net-stats-grid">
                        <div className="net-stat-bar-container" title={`TX Rate: ${formatCurrentRate(netTxMbps)}`}>
                            <div className="ns-bar-fill" style={{ width: `${txPct}%` }}></div>
                            <div className="ns-content">
                                <span className="ns-lbl">TX</span>
                                <span className="ns-val">{formatCurrentRate(netTxMbps)}</span>
                            </div>
                        </div>

                        <div className="net-stat-bar-container" title={`Total Net Rate: ${formatCurrentRate(totalNetMbps)}`}>
                            <div className="ns-bar-fill" style={{ width: `${netPct}%` }}></div>
                            <div className="ns-content">
                                <span className="ns-lbl">NET</span>
                                <span className="ns-val">{formatCurrentRate(totalNetMbps)}</span>
                            </div>
                        </div>

                        <div className="net-stat-bar-container" title={`RX Rate: ${formatCurrentRate(netRxMbps)}`}>
                            <div className="ns-bar-fill" style={{ width: `${rxPct}%` }}></div>
                            <div className="ns-content">
                                <span className="ns-lbl">RX</span>
                                <span className="ns-val">{formatCurrentRate(netRxMbps)}</span>
                            </div>
                        </div>

                        <div className="net-stat-bar-container" title={`C2 Telemetry Rate: ${c2Display}`}>
                            <div className="ns-bar-fill" style={{ width: `${c2Pct}%` }}></div>
                            <div className="ns-content">
                                <span className="ns-lbl">C2</span>
                                <span className="ns-val">{c2Display}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pod-track">
                    <div className="pod-bar net-bar" style={{ width: `${Math.min(100, netUtilPct)}%` }}></div>
                </div>
            </div>
        </div>
    );
}