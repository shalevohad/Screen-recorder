import { useState, useEffect } from 'react';
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

export default function ServerTelemetryWidget({ serverTelemetry }) {
    const [cpuHistory, setCpuHistory] = useState([]);
    const [ramHistory, setRamHistory] = useState([]);
    const [netHistory, setNetHistory] = useState([]);
    const historyPoints = 40;

    const cpuPct = serverTelemetry?.cpuUsagePct ?? serverTelemetry?.hostCpuUsagePct ?? 0;
    const appCpuPct = serverTelemetry?.appCpuUsagePct ?? serverTelemetry?.processCpuUsagePct ?? 0;

    const hostRamPct = serverTelemetry?.hostRamPct ?? serverTelemetry?.hostRamUsagePct ?? 0;
    const appRamMb = serverTelemetry?.appRamMb ?? serverTelemetry?.processRamMb ?? 0;
    const hostTotalRamMb = serverTelemetry?.hostTotalRamMb ?? 131072;
    const appRamDisplay = appRamMb >= 1024 ? `${(appRamMb / 1024).toFixed(1)}G` : `${Math.round(appRamMb)}M`;
    const totalRamDisplay = `${Math.round(hostTotalRamMb / 1024)}G`;

    const netTxMbps = serverTelemetry?.nicTotalTxMbps ?? 0;
    const netRxMbps = serverTelemetry?.nicTotalRxMbps ?? 0;
    const totalNetMbps = netTxMbps + netRxMbps;
    const linkSpeedMbps = serverTelemetry?.linkSpeedMbps ?? serverTelemetry?.nicLinkSpeedMbps ?? 1000;
    const netUtilPct = serverTelemetry?.nicUtilizationPct ?? serverTelemetry?.appLineUtilizationPct ?? Math.min(100, (totalNetMbps / (linkSpeedMbps || 1)) * 100);
    const linkDisplay = linkSpeedMbps >= 1000 ? `${Math.round(linkSpeedMbps / 1000)}G` : `${Math.round(linkSpeedMbps)}M`;

    useEffect(() => {
        setCpuHistory(prev => [...prev, cpuPct].slice(-historyPoints));
        setRamHistory(prev => [...prev, hostRamPct].slice(-historyPoints));
        setNetHistory(prev => [...prev, netUtilPct].slice(-historyPoints));
    }, [cpuPct, hostRamPct, netUtilPct]);

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
            {/* CPU Pod */}
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

            {/* RAM Pod */}
            <div className={`telemetry-pod ${getStatusClass(hostRamPct)}`}>
                <div className="pod-header">
                    <span className="pod-title">RAM USAGE</span>
                    <span className="pod-sub">{appRamDisplay} / {totalRamDisplay}</span>
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

            {/* NET Pod */}
            <div className={`telemetry-pod ${getStatusClass(netUtilPct)}`}>
                <div className="pod-header">
                    <span className="pod-title">NET ({linkDisplay})</span>
                    <span className="pod-sub">{totalNetMbps.toFixed(1)}M Total</span>
                </div>
                <div className="pod-content-row">
                    <span className="pod-val">{netUtilPct.toFixed(1)}%</span>
                    <div className="pod-graph-slot">
                        <SparklineChart data={netHistory} color={netUtilPct > 70 ? getGraphColor(netUtilPct) : 'var(--c2-blue)'} limit={historyPoints} />
                    </div>
                </div>
                <div className="pod-track">
                    <div className="pod-bar net-bar" style={{ width: `${Math.min(100, netUtilPct)}%` }}></div>
                </div>
            </div>
        </div>
    );
}