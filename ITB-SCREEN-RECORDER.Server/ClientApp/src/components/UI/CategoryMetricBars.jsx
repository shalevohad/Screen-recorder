import './CategoryMetricBars.scss';

const formatVal = (val, type) => {
    if (val === null || val === undefined || isNaN(val)) return '0';
    if (type === 'ram') return `${Number(val).toFixed(0)}M`;
    if (type === 'net') return `${Number(val).toFixed(1)}M`;
    return `${Number(val).toFixed(0)}%`;
};

// 💡 קומפוננטה קטנה ומבודדת לכל מדד בודד (CPU / RAM / GPU / NET וכו')
function SingleMetricBar({ label, appVal, hostVal, appFormatted, hostFormatted }) {
    return (
        <div className="metric-row">
            <div className="metric-label">
                <span className="metric-name">{label}</span>
                <span className="metric-values">
                    <span className="app-val">{appFormatted}</span> / <span className="host-val">{hostFormatted}</span>
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
    ramAvg = 0,
    processRamMb = 0,
    hostTotalRamMb = 0,
    compact = false
}) {
    // חישוב דינמי של סך ה-RAM המקסימלי מתוך הטלמטריה
    let totalRamMb = hostTotalRamMb;
    if (!totalRamMb || totalRamMb <= 0) {
        if (ramAvg > 0 && processRamMb > 0) {
            totalRamMb = ramAvg > 0 ? (processRamMb / (ramAvg / 100)) : 16384;
        } else {
            totalRamMb = 16384;
        }
    }

    const appRamPct = Math.min(100, Math.max(0, (processRamMb / totalRamMb) * 100));
    const hostRamPct = Math.min(100, Math.max(0, ramAvg));

    const metrics = [
        {
            key: 'cpu',
            label: 'CPU',
            appVal: processCpuPct,
            hostVal: hostCpuPct,
            appFormatted: formatVal(processCpuPct),
            hostFormatted: formatVal(hostCpuPct)
        },
        {
            key: 'ram',
            label: 'RAM',
            appVal: appRamPct,
            hostVal: hostRamPct,
            appFormatted: formatVal(processRamMb, 'ram'),
            hostFormatted: formatVal(hostRamPct)
        },
        {
            key: 'gpu',
            label: 'GPU',
            appVal: gpuNvencPct,
            hostVal: gpu3dPct,
            appFormatted: formatVal(gpuNvencPct),
            hostFormatted: formatVal(gpu3dPct)
        },
        {
            key: 'net',
            label: 'NET',
            appVal: (mediaTxMbps / 1000) * 100,
            hostVal: (netTotalTxMbps / 1000) * 100,
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