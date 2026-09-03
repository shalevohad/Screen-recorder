import './CategoryMetricBars.scss';

const formatVal = (val, type) => {
    if (val === null || val === undefined || isNaN(val)) return '0';
    if (type === 'ram') return `${Number(val).toFixed(0)}M`;
    if (type === 'net') return `${Number(val).toFixed(2)}M`;
    return `${Number(val).toFixed(1)}%`;
};

function SingleMetricBar({ label, appVal, hostVal, appFormatted, hostFormatted }) {
    return (
        <div className="metric-row">
            <div className="metric-label">
                <span className="metric-name">{label}</span>
                <span className="metric-values">
                    <span className="app-val" title="App Contribution">{appFormatted}</span> / <span className="host-val" title="Total Host Load">{hostFormatted}</span>
                </span>
            </div>
            <div className="metric-bar-bg">
                <div className="metric-bar-fill app-fill" style={{ width: `${Math.min(100, Math.max(0, appVal))}%` }} />
            </div>
            <div className="metric-bar-bg">
                <div className="metric-bar-fill host-fill" style={{ width: `${Math.min(100, Math.max(0, hostVal))}%` }} />
            </div>
        </div>
    );
}

export default function CategoryMetricBars({
    hostCpuPct = 0,
    processCpuPct = 0,
    gpu3dPct = 0,
    gpuNvencPct = 0,
    mediaTxMbps = 0,
    netTotalTxMbps = 0,
    hostRamPct = 0,
    processRamMb = 0,
    hostTotalRamMb = 0,
    linkSpeedMbps = 1000,
    compact = false
}) {
    // 💡 שימוש אוטומטי בנפח הפיזי, אם חסר מניח 128GB המותקנים בתחנת העבודה Z2 G9 שלך
    const totalRamMb = hostTotalRamMb > 0 ? hostTotalRamMb : 131072;
    const appRamPct = (processRamMb / totalRamMb) * 100;

    const appNetPct = (mediaTxMbps / linkSpeedMbps) * 100;
    const hostNetPct = (netTotalTxMbps / linkSpeedMbps) * 100;

    const metrics = [
        {
            key: 'cpu',
            label: 'CPU',
            appVal: processCpuPct,
            hostVal: hostCpuPct,
            appFormatted: `${Number(processCpuPct).toFixed(1)}%`,
            hostFormatted: `${Number(hostCpuPct).toFixed(1)}%`
        },
        {
            key: 'ram',
            label: 'RAM',
            appVal: appRamPct,
            hostVal: hostRamPct,
            appFormatted: formatVal(processRamMb, 'ram'),
            hostFormatted: `${Number(hostRamPct).toFixed(1)}%`
        },
        {
            key: 'gpu',
            label: 'GPU',
            appVal: gpuNvencPct,
            hostVal: gpu3dPct,
            appFormatted: `${Number(gpuNvencPct).toFixed(1)}%`,
            hostFormatted: `${Number(gpu3dPct).toFixed(1)}%`
        },
        {
            key: 'net',
            label: 'NET',
            appVal: appNetPct,
            hostVal: hostNetPct,
            appFormatted: formatVal(mediaTxMbps, 'net'),
            hostFormatted: formatVal(netTotalTxMbps, 'net')
        }
    ];

    return (
        <div className={`category-metrics-container ${compact ? 'compact' : ''}`}>
            {metrics.map((m) => (
                <SingleMetricBar
                    key={m.key}
                    label={m.label}
                    appVal={m.appVal}
                    hostVal={m.hostVal}
                    appFormatted={m.appFormatted}
                    hostFormatted={m.hostFormatted}
                />
            ))}
        </div>
    );
}