// Client/src/components/UI/ServerTelemetryWidget.jsx
import RadialGauge from './RadialGauge';
import './ServerTelemetryWidget.scss';

export default function ServerTelemetryWidget({ serverTelemetry, fleetC2Kbps = 0 }) {
    const cpuPct = serverTelemetry?.cpuUsagePct ?? serverTelemetry?.hostCpuUsagePct ?? 0;
    const appCpuPct = serverTelemetry?.appCpuUsagePct ?? serverTelemetry?.processCpuUsagePct ?? 0;

    const hostRamPct = serverTelemetry?.hostRamPct ?? serverTelemetry?.hostRamUsagePct ?? 0;
    const appRamMb = serverTelemetry?.appRamMb ?? serverTelemetry?.processRamMb ?? 0;
    const appRamDisplay = appRamMb >= 1024 ? `${(appRamMb / 1024).toFixed(1)}G` : `${Math.round(appRamMb)}M`;

    const netTxMbps = serverTelemetry?.nicTotalTxMbps ?? 0;
    const netRxMbps = serverTelemetry?.nicTotalRxMbps ?? 0;
    const totalNetMbps = netTxMbps + netRxMbps;

    const linkSpeedMbps = serverTelemetry?.linkSpeedMbps ?? serverTelemetry?.nicLinkSpeedMbps ?? 1000;
    const netUtilPct = serverTelemetry?.nicUtilizationPct ?? serverTelemetry?.appLineUtilizationPct ?? Math.min(100, (totalNetMbps / (linkSpeedMbps || 1)) * 100);

    const getStatusColor = (pct) => {
        if (pct >= 85) return 'var(--c2-red, #EF4444)';
        if (pct >= 70) return 'var(--c2-yellow, #F59E0B)';
        return 'var(--c2-green, #10B981)';
    };

    const getStatusClass = (pct) => {
        if (pct >= 85) return 'crit';
        if (pct >= 70) return 'warn';
        return 'ok';
    };

    const txPct = Math.min(100, (netTxMbps / linkSpeedMbps) * 100);
    const rxPct = Math.min(100, (netRxMbps / linkSpeedMbps) * 100);

    return (
        <div className="server-telemetry-widget layout-large">
            <div className={`telemetry-pod horizontal-capsule ${getStatusClass(cpuPct)}`}>
                <span className="pod-title">CPU LOAD</span>
                <div className="pod-body-row">
                    <div className="pod-info-group">
                        <span className="info-lbl">APP</span>
                        <span className="info-val">{appCpuPct.toFixed(1)}%</span>
                    </div>
                    <RadialGauge percentage={cpuPct} color={getStatusColor(cpuPct)} size={42} strokeWidth={4} />
                </div>
            </div>

            <div className={`telemetry-pod horizontal-capsule ${getStatusClass(hostRamPct)}`}>
                <span className="pod-title">RAM USAGE</span>
                <div className="pod-body-row">
                    <div className="pod-info-group">
                        <span className="info-lbl">APP</span>
                        <span className="info-val">{appRamDisplay}</span>
                    </div>
                    <RadialGauge percentage={hostRamPct} color={getStatusColor(hostRamPct)} size={42} strokeWidth={4} />
                </div>
            </div>

            <div className={`telemetry-pod horizontal-capsule net-capsule ${getStatusClass(netUtilPct)}`}>
                <span className="pod-title">NET LOAD</span>
                <div className="pod-body-row">
                    <div className="pod-info-group">
                        <span className="info-lbl">TOTAL</span>
                        <span className="info-val">{totalNetMbps.toFixed(1)}M</span>
                    </div>
                    <RadialGauge
                        multiSegments={[
                            { pct: txPct, color: 'var(--accent-cyan, #06B6D4)' },
                            { pct: rxPct, color: 'var(--accent-emerald, #10B981)' }
                        ]}
                        size={42}
                        strokeWidth={4}
                    >
                        <span className="radial-net-center">{Math.round(netUtilPct)}%</span>
                    </RadialGauge>
                </div>
            </div>
        </div>
    );
}