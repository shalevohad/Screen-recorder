// Client/src/components/UI/RadialGauge.jsx
import './RadialGauge.scss';

export default function RadialGauge({
    percentage = 0,
    color = 'var(--accent-cyan)',
    size = 42,
    strokeWidth = 4,
    multiSegments = [],
    children
}) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const hasMulti = multiSegments && multiSegments.length > 0;
    let accumulatedOffset = 0;

    const normalizedPct = Math.min(100, Math.max(0, percentage));
    const strokeDashoffset = circumference - (normalizedPct / 100) * circumference;

    const angle = (normalizedPct / 100) * 360 - 90;
    const rad = (angle * Math.PI) / 180;
    const cx = size / 2;
    const cy = size / 2;
    const labelX = cx + (radius + 3) * Math.cos(rad);
    const labelY = cy + (radius + 3) * Math.sin(rad);

    return (
        <div className="radial-gauge-wrapper" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="radial-svg">
                <circle
                    cx={cx}
                    cy={cy}
                    r={radius}
                    strokeWidth={strokeWidth}
                    className="radial-track"
                />

                {hasMulti ? (
                    multiSegments.map((seg, idx) => {
                        const segPct = Math.min(100, Math.max(0, seg.pct));
                        const dashArray = `${(segPct / 100) * circumference} ${circumference}`;
                        const dashOffset = -accumulatedOffset;
                        accumulatedOffset += (segPct / 100) * circumference;

                        return (
                            <circle
                                key={idx}
                                cx={cx}
                                cy={cy}
                                r={radius}
                                strokeWidth={strokeWidth}
                                stroke={seg.color}
                                strokeDasharray={dashArray}
                                strokeDashoffset={dashOffset}
                                strokeLinecap="round"
                                className="radial-indicator multi"
                            />
                        );
                    })
                ) : (
                    <circle
                        cx={cx}
                        cy={cx}
                        r={radius}
                        strokeWidth={strokeWidth}
                        stroke={color}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="radial-indicator"
                    />
                )}
            </svg>

            <div className="radial-inner-content">
                {children}
            </div>

            {!hasMulti && (
                <span
                    className="radial-external-label"
                    style={{
                        left: `${labelX}px`,
                        top: `${labelY}px`
                    }}
                >
                    {Math.round(normalizedPct)}%
                </span>
            )}
        </div>
    );
}