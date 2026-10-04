// ==========================================
// File: ClientApp/src/components/UI/RadialGauge.jsx
// ==========================================
import './RadialGauge.scss';

export default function RadialGauge({
    size = 32,
    strokeWidth = 2.4,
    concentricSegments = [],
    items = [],
    title = '',
    className = ''
}) {
    const center = size / 2;
    const gap = 2;

    return (
        <div className={`radial-metric-cell ${className}`.trim()} title={title}>
            <div className="radial-gauge-wrapper" style={{ width: size, height: size }}>
                <svg width={size} height={size} className="radial-svg">
                    {concentricSegments.map((seg, idx) => {
                        const radius = (size - strokeWidth) / 2 - idx * (strokeWidth + gap);
                        const circumference = 2 * Math.PI * radius;
                        const normalizedPct = Math.min(100, Math.max(0, seg.pct || 0));
                        const dashOffset = circumference - (normalizedPct / 100) * circumference;

                        return (
                            <g key={idx}>
                                <circle
                                    cx={center}
                                    cy={center}
                                    r={radius}
                                    strokeWidth={strokeWidth}
                                    className="radial-track"
                                />
                                <circle
                                    cx={center}
                                    cy={center}
                                    r={radius}
                                    strokeWidth={strokeWidth}
                                    stroke={seg.color}
                                    strokeDasharray={circumference}
                                    strokeDashoffset={dashOffset}
                                    strokeLinecap="round"
                                    className="radial-indicator"
                                />
                            </g>
                        );
                    })}
                </svg>
            </div>

            {items && items.length > 0 && (
                <div className="cell-data-stack">
                    {items.map((item, idx) => {
                        const isPreset = ['cyan', 'blue', 'green', 'amber', 'purple', 'muted'].includes(item.color);
                        return (
                            <div className="data-item" key={idx}>
                                <span
                                    className={`item-lbl ${isPreset ? item.color : ''}`.trim()}
                                    style={!isPreset && item.color ? { color: item.color } : undefined}
                                >
                                    {item.label}
                                </span>
                                <span className="item-val">{item.value}</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}