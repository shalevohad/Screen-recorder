// Client/src/components/UI/RadialGauge.jsx
import './RadialGauge.scss';

export default function RadialGauge({
    percentage = 0,
    color = 'var(--accent-cyan, #06B6D4)',
    size = 36,
    strokeWidth = 2.5,
    concentricSegments = [], // עבור שני שעונים עם שתי קשתות (חיצונית ופנימית)
    multiSegments = [],      // עבור רצועות עוקבות באותו היקף
    children
}) {
    const center = size / 2;

    // מצב 1: שתי קשתות קונצנטריות (Outer Arc + Inner Arc)
    if (concentricSegments && concentricSegments.length > 0) {
        const gap = 2; // רווח עדין בין הקשת החיצונית לפנימית

        return (
            <div className="radial-gauge-wrapper" style={{ width: size, height: size }}>
                <svg width={size} height={size} className="radial-svg">
                    {concentricSegments.map((seg, idx) => {
                        const radius = (size - strokeWidth) / 2 - idx * (strokeWidth + gap);
                        const circumference = 2 * Math.PI * radius;
                        const normalizedPct = Math.min(100, Math.max(0, seg.pct));
                        const dashOffset = circumference - (normalizedPct / 100) * circumference;

                        return (
                            <g key={idx}>
                                {/* מסלול רקע אפור עדין */}
                                <circle
                                    cx={center}
                                    cy={center}
                                    r={radius}
                                    strokeWidth={strokeWidth}
                                    className="radial-track"
                                />
                                {/* קשת צבעונית פעילה */}
                                <circle
                                    cx={center}
                                    cy={center}
                                    r={radius}
                                    strokeWidth={strokeWidth}
                                    stroke={seg.color}
                                    strokeDasharray={circumference}
                                    strokeDashoffset={dashOffset}
                                    strokeLinecap="round"
                                    className="radial-indicator concentric"
                                />
                            </g>
                        );
                    })}
                </svg>
                {children && <div className="radial-inner-content">{children}</div>}
            </div>
        );
    }

    // מצב 2: שעון רדיאלי רגיל או רצועות עוקבות
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const hasMulti = multiSegments && multiSegments.length > 0;
    let accumulatedOffset = 0;

    const normalizedPct = Math.min(100, Math.max(0, percentage));
    const strokeDashoffset = circumference - (normalizedPct / 100) * circumference;

    return (
        <div className="radial-gauge-wrapper" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="radial-svg">
                <circle
                    cx={center}
                    cy={center}
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
                                cx={center}
                                cy={center}
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
                        cx={center}
                        cy={center}
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

            {children && <div className="radial-inner-content">{children}</div>}
        </div>
    );
}