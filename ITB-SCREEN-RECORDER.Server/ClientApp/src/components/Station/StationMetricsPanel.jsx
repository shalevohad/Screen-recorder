import './StationMetricsPanel.scss';

export default function StationMetricsPanel({
    actualFps = 0,
    internalCaptureFps = 0,
    hasAudio = false,
    droppedFrames = 0,
    qosTier = 3,
    hostCpuPct = 0,
    processCpuPct = 0,
    gpu3dPct = 0,
    gpuNvencPct = 0,
    hostRamPct = 0,
    processRamMb = 0,
    hostTotalRamMb = 16384,
    mediaTxMbps = 0,
    nicTotalTxMbps = 0,
    nicTotalRxMbps = 0,
    linkSpeedMbps = 1000,
    nicUtilizationPct = 0
}) {
    const effectiveLinkSpeed = linkSpeedMbps > 0 ? linkSpeedMbps : 1000;
    const totalNicMbps = nicTotalTxMbps + nicTotalRxMbps;
    const hostNetPct = nicUtilizationPct > 0
        ? nicUtilizationPct
        : Math.min(100, (totalNicMbps / effectiveLinkSpeed) * 100);
    const appNetPct = Math.min(100, (mediaTxMbps / effectiveLinkSpeed) * 100);
    const linkDisplay = effectiveLinkSpeed >= 1000 ? `${Math.round(effectiveLinkSpeed / 1000)}G` : `${Math.round(effectiveLinkSpeed)}M`;

    const appRamMb = processRamMb || 0;
    const totalRamMb = hostTotalRamMb > 0 ? hostTotalRamMb : 16384;
    const appRamPctOfTotal = (appRamMb / totalRamMb) * 100;
    const appRamDisplay = appRamMb >= 1024 ? `${(appRamMb / 1024).toFixed(1)}G` : `${Math.round(appRamMb)}M`;
    const totalRamDisplay = `${Math.round(totalRamMb / 1024)}G`;

    return (
        <div className="station-telemetry">
            <div className="inline-network-stats">
                <div className="stat-box">
                    <span className="stat-label">FPS</span>
                    <span className="stat-value green">{actualFps}</span>
                </div>
                <div className="stat-box">
                    <span className="stat-label">CAP</span>
                    <span className="stat-value yellow">{internalCaptureFps}</span>
                </div>
                <div className="stat-box">
                    <span className="stat-label">AUDIO</span>
                    <span className={`stat-value ${hasAudio ? 'green' : 'red'}`}>{hasAudio ? 'ON' : 'OFF'}</span>
                </div>
                <div className="stat-box">
                    <span className="stat-label">DROP</span>
                    <span className={`stat-value ${droppedFrames > 0 ? 'red' : 'gray'}`}>{droppedFrames}</span>
                </div>
                <div className="stat-box">
                    <span className="stat-label">QOS</span>
                    <span className="stat-value blue">T{qosTier}</span>
                </div>
            </div>

            <div className="metric-bars-container">
                <div className="dual-metric-group">
                    <div className="telemetry-label">
                        <span className="cat-name">CPU</span>
                        <span className="cat-values">
                            <span className="val-host">{hostCpuPct.toFixed(1)}%</span>
                            <span className="val-app">({processCpuPct.toFixed(1)}%)</span>
                        </span>
                    </div>
                    <div className="bars-pair">
                        <div className="bar-track">
                            <div className="bar-fill host-green" style={{ width: `${Math.min(100, hostCpuPct)}%` }} />
                        </div>
                        <div className="bar-track app-track">
                            <div className="bar-fill app-blue" style={{ width: `${Math.min(100, processCpuPct)}%` }} />
                        </div>
                    </div>
                </div>

                <div className="dual-metric-group">
                    <div className="telemetry-label">
                        <span className="cat-name">RAM</span>
                        <span className="cat-values">
                            <span className="val-host">{hostRamPct.toFixed(1)}%</span>
                            <span className="val-app">({appRamDisplay} / {totalRamDisplay} ({appRamPctOfTotal.toFixed(1)}%))</span>
                        </span>
                    </div>
                    <div className="bars-pair">
                        <div className="bar-track">
                            <div className="bar-fill host-green" style={{ width: `${Math.min(100, hostRamPct)}%` }} />
                        </div>
                        <div className="bar-track app-track">
                            <div className="bar-fill app-blue" style={{ width: `${Math.min(100, appRamPctOfTotal)}%` }} />
                        </div>
                    </div>
                </div>

                <div className="dual-metric-group">
                    <div className="telemetry-label">
                        <span className="cat-name">GPU</span>
                        <span className="cat-values">
                            <span className="val-host">{gpu3dPct.toFixed(1)}%</span>
                            <span className="val-app">({gpuNvencPct.toFixed(1)}%)</span>
                        </span>
                    </div>
                    <div className="bars-pair">
                        <div className="bar-track">
                            <div className="bar-fill host-green" style={{ width: `${Math.min(100, gpu3dPct)}%` }} />
                        </div>
                        <div className="bar-track app-track">
                            <div className="bar-fill app-blue" style={{ width: `${Math.min(100, gpuNvencPct)}%` }} />
                        </div>
                    </div>
                </div>

                <div className="dual-metric-group">
                    <div className="telemetry-label">
                        <span className="cat-name">NET <strong className="link-badge">({linkDisplay})</strong></span>
                        <span className="cat-values">
                            <span className="val-host">{hostNetPct.toFixed(1)}%</span>
                            <span className="val-app">({mediaTxMbps.toFixed(1)}M / {appNetPct.toFixed(1)}%)</span>
                        </span>
                    </div>
                    <div className="bars-pair">
                        <div className="bar-track">
                            <div className="bar-fill host-green" style={{ width: `${Math.min(100, hostNetPct)}%` }} />
                        </div>
                        <div className="bar-track app-track">
                            <div className="bar-fill app-blue" style={{ width: `${Math.min(100, appNetPct)}%` }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}