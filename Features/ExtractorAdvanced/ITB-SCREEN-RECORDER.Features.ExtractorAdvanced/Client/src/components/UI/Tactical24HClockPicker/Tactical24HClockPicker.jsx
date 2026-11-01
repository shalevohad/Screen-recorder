// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/UI/Tactical24HClockPicker/Tactical24HClockPicker.jsx
// ==========================================
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import './Tactical24HClockPicker.scss';

const pad = (n) => String(n).padStart(2, '0');

// 12 sectors on standard analog clock (30 degrees per hour: 12 top, 6 bottom)
const CLOCK_HOURS_AM = [
    { label: '00', val: 0, angle: 0 },
    { label: '01', val: 1, angle: 30 },
    { label: '02', val: 2, angle: 60 },
    { label: '03', val: 3, angle: 90 },
    { label: '04', val: 4, angle: 120 },
    { label: '05', val: 5, angle: 150 },
    { label: '06', val: 6, angle: 180 },
    { label: '07', val: 7, angle: 210 },
    { label: '08', val: 8, angle: 240 },
    { label: '09', val: 9, angle: 270 },
    { label: '10', val: 10, angle: 300 },
    { label: '11', val: 11, angle: 330 }
];

const CLOCK_HOURS_PM = [
    { label: '12', val: 12, angle: 0 },
    { label: '13', val: 13, angle: 30 },
    { label: '14', val: 14, angle: 60 },
    { label: '15', val: 15, angle: 90 },
    { label: '16', val: 16, angle: 120 },
    { label: '17', val: 17, angle: 150 },
    { label: '18', val: 18, angle: 180 },
    { label: '19', val: 19, angle: 210 },
    { label: '20', val: 20, angle: 240 },
    { label: '21', val: 21, angle: 270 },
    { label: '22', val: 22, angle: 300 },
    { label: '23', val: 23, angle: 330 }
];

/**
 * Tactical 24-hour analog/digital clock picker component with interactive drag hands.
 * @param {Object} props
 * @param {string} [props.value='00:00:00'] - Formatted 24-hour time string "HH:MM:SS" or "HH:MM".
 * @param {Function} [props.onChange] - Callback fired on change: (formattedString, { h, m, s }) => void.
 * @param {string} [props.label='TIME (24H)'] - Visual label on shelf.
 * @param {'cyan'|'amber'} [props.accent='cyan'] - Tactical color theme.
 * @param {boolean} [props.showSeconds=true] - Whether seconds hand and inputs are active.
 * @param {string} [props.className=''] - Additional CSS classes.
 * @returns {JSX.Element}
 */
export default function Tactical24HClockPicker({
    value = '00:00:00',
    onChange,
    label = 'TIME (24H)',
    accent = 'cyan',
    showSeconds = true,
    className = ''
}) {
    const [textInput, setTextInput] = useState(value);
    const [activeDragHand, setActiveDragHand] = useState(null); // 'hours' | 'minutes' | 'seconds' | null

    const svgRef = useRef(null);

    const { h, m, s } = useMemo(() => {
        if (!value) return { h: 0, m: 0, s: 0 };
        const parts = String(value).split(':').map(Number);
        return {
            h: Math.min(23, Math.max(0, parts[0] || 0)),
            m: Math.min(59, Math.max(0, parts[1] || 0)),
            s: Math.min(59, Math.max(0, parts[2] || 0))
        };
    }, [value]);

    const isPm = useMemo(() => h >= 12, [h]);

    useEffect(() => {
        setTextInput(value);
    }, [value]);

    const handleTextCommit = () => {
        const clean = textInput.replace(/[^0-9:]/g, '').trim();
        const parts = clean.split(':').filter(p => p.length > 0);

        let newH = 0, newM = 0, newS = 0;
        if (parts.length >= 1) newH = Math.min(23, Math.max(0, parseInt(parts[0], 10) || 0));
        if (parts.length >= 2) newM = Math.min(59, Math.max(0, parseInt(parts[1], 10) || 0));
        if (parts.length >= 3 && showSeconds) newS = Math.min(59, Math.max(0, parseInt(parts[2], 10) || 0));

        const formatted = showSeconds
            ? `${pad(newH)}:${pad(newM)}:${pad(newS)}`
            : `${pad(newH)}:${pad(newM)}`;

        setTextInput(formatted);
        if (onChange) {
            onChange(formatted, { h: newH, m: newM, s: newS });
        }
    };

    /**
     * Toggles between AM (00:00-11:59) and PM (12:00-23:59) period.
     * @param {'AM'|'PM'} targetPeriod
     */
    const handlePeriodToggle = (targetPeriod) => {
        let newH = h;
        if (targetPeriod === 'AM' && h >= 12) {
            newH = h - 12;
        } else if (targetPeriod === 'PM' && h < 12) {
            newH = h + 12;
        }

        const formatted = showSeconds
            ? `${pad(newH)}:${pad(m)}:${pad(s)}`
            : `${pad(newH)}:${pad(m)}`;

        setTextInput(formatted);
        if (onChange) {
            onChange(formatted, { h: newH, m, s });
        }
    };

    /**
     * Calculates time value from pointer event angle relative to clock center.
     * @param {PointerEvent|MouseEvent} e
     * @param {'hours'|'minutes'|'seconds'} handType
     * @returns {number|null} Time integer value or null if element ref missing.
     */
    const calculateValueFromPointer = useCallback((e, handType) => {
        if (!svgRef.current) return null;
        const rect = svgRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const x = e.clientX - cx;
        const y = e.clientY - cy;

        let angleDeg = (Math.atan2(y, x) * 180 / Math.PI) + 90;
        if (angleDeg < 0) angleDeg += 360;

        if (handType === 'hours') {
            const step = Math.round(angleDeg / 30) % 12; // 12 hour positions on clock dial
            if (isPm) {
                return step === 0 ? 12 : step + 12; // 12, 13..23
            }
            return step === 0 ? 0 : step; // 00, 01..11
        }

        // Minutes and seconds: 60 perimeter ticks = 6 degrees per unit
        return Math.round(angleDeg / 6) % 60;
    }, [isPm]);

    const updateTimeValue = useCallback((handType, val) => {
        let newH = h;
        let newM = m;
        let newS = s;

        if (handType === 'hours') newH = val;
        else if (handType === 'minutes') newM = val;
        else if (handType === 'seconds') newS = val;

        const formatted = showSeconds
            ? `${pad(newH)}:${pad(newM)}:${pad(newS)}`
            : `${pad(newH)}:${pad(newM)}`;

        setTextInput(formatted);
        if (onChange) {
            onChange(formatted, { h: newH, m: newM, s: newS });
        }
    }, [h, m, s, showSeconds, onChange]);

    const handleStartDrag = (handType, e) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveDragHand(handType);

        const val = calculateValueFromPointer(e, handType);
        if (val !== null) updateTimeValue(handType, val);
    };

    useEffect(() => {
        if (!activeDragHand) return;

        const handlePointerMove = (e) => {
            const val = calculateValueFromPointer(e, activeDragHand);
            if (val !== null) {
                updateTimeValue(activeDragHand, val);
            }
        };

        const handlePointerUp = () => {
            setActiveDragHand(null);
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, [activeDragHand, calculateValueFromPointer, updateTimeValue]);

    // Hour hand angle: 30 degrees per hour across 12 hours
    const hourHandAngle = useMemo(() => (h % 12) * 30, [h]);
    const minuteHandAngle = useMemo(() => (m % 60) * 6, [m]);
    const secondHandAngle = useMemo(() => (s % 60) * 6, [s]);

    const currentDialHours = isPm ? CLOCK_HOURS_PM : CLOCK_HOURS_AM;

    // 60 perimeter ticks (matching minutes, seconds, and 12-hour positions)
    const tickMarks = useMemo(() => {
        const ticks = [];
        for (let i = 0; i < 60; i++) {
            const angleRad = (i * 6 - 90) * (Math.PI / 180);
            const isHourTick = i % 5 === 0;
            const rOuter = 104;
            const rInner = isHourTick ? 93 : 98;

            ticks.push({
                index: i,
                x1: 110 + rInner * Math.cos(angleRad),
                y1: 110 + rInner * Math.sin(angleRad),
                x2: 110 + rOuter * Math.cos(angleRad),
                y2: 110 + rOuter * Math.sin(angleRad),
                isMajor: isHourTick
            });
        }
        return ticks;
    }, []);

    return (
        <div className={`tactical-24h-clock-picker ${accent} ${className} ${activeDragHand ? 'is-dragging' : ''}`}>

            {/* Top shelf: Title + AM/PM period selector + 24H digital input */}
            <div className="clock-header-shelf">
                <span className="shelf-label">{label}</span>

                <div className="shelf-controls-group">
                    {/* Tactical AM / PM selector */}
                    <div className="am-pm-toggle-pill">
                        <button
                            type="button"
                            className={`btn-period ${!isPm ? 'active' : ''}`}
                            onClick={() => handlePeriodToggle('AM')}
                            title="Day / Morning (00:00 - 11:59)"
                        >
                            AM
                        </button>
                        <button
                            type="button"
                            className={`btn-period ${isPm ? 'active' : ''}`}
                            onClick={() => handlePeriodToggle('PM')}
                            title="Night / Evening (12:00 - 23:59)"
                        >
                            PM
                        </button>
                    </div>

                    <input
                        type="text"
                        className="shelf-digital-input"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        onBlur={handleTextCommit}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') e.currentTarget.blur();
                        }}
                        maxLength={8}
                        placeholder="HH:MM:SS"
                        title="Type 24H time or drag the hands directly"
                    />
                </div>
            </div>

            {/* Analog clock dial face */}
            <div className="clock-dial-container">
                <svg
                    ref={svgRef}
                    className="clock-dial-svg"
                    viewBox="0 0 220 220"
                >
                    <circle cx="110" cy="110" r="105" className="dial-background" />
                    <circle cx="110" cy="110" r="88" className="dial-track-ring" />

                    {/* Clock ticks */}
                    <g className="dial-ticks-layer">
                        {tickMarks.map(t => (
                            <line
                                key={`tick-${t.index}`}
                                x1={t.x1}
                                y1={t.y1}
                                x2={t.x2}
                                y2={t.y2}
                                className={`dial-tick ${t.isMajor ? 'major' : 'minor'}`}
                            />
                        ))}
                    </g>

                    {/* 12 hour numerals on dial face (12 at top, 6 at bottom - 24H display according to AM/PM) */}
                    {currentDialHours.map(item => {
                        const angleRad = (item.angle - 90) * (Math.PI / 180);
                        const r = 76;
                        const x = 110 + r * Math.cos(angleRad);
                        const y = 110 + r * Math.sin(angleRad);
                        const isSelected = h === item.val;

                        return (
                            <text
                                key={`dial-h-${item.val}`}
                                x={x}
                                y={y}
                                className={`dial-num ${isSelected ? 'selected' : ''}`}
                                textAnchor="middle"
                                dominantBaseline="central"
                            >
                                {item.label}
                            </text>
                        );
                    })}

                    {/* 1. Hour hand (short, thick) */}
                    <g
                        className={`interactive-hand-group hand-group-hour ${activeDragHand === 'hours' ? 'dragging' : ''}`}
                        transform={`rotate(${hourHandAngle} 110 110)`}
                    >
                        <line x1="110" y1="110" x2="110" y2="52" className="dial-hand hand-hour" />
                        <circle cx="110" cy="52" r="7.5" className="hand-grab-ring ring-hour" />
                        <circle
                            cx="110"
                            cy="52"
                            r="20"
                            className="hand-hitbox"
                            onPointerDown={(e) => handleStartDrag('hours', e)}
                        />
                    </g>

                    {/* 2. Minute hand (30m aligned with 6 o'clock) */}
                    <g
                        className={`interactive-hand-group hand-group-minute ${activeDragHand === 'minutes' ? 'dragging' : ''}`}
                        transform={`rotate(${minuteHandAngle} 110 110)`}
                    >
                        <line x1="110" y1="110" x2="110" y2="28" className="dial-hand hand-minute" />
                        <circle cx="110" cy="28" r="6.5" className="hand-grab-ring ring-minute" />
                        <circle
                            cx="110"
                            cy="28"
                            r="18"
                            className="hand-hitbox"
                            onPointerDown={(e) => handleStartDrag('minutes', e)}
                        />
                    </g>

                    {/* 3. Second hand (30s aligned with 6 o'clock) */}
                    {showSeconds && (
                        <g
                            className={`interactive-hand-group hand-group-second ${activeDragHand === 'seconds' ? 'dragging' : ''}`}
                            transform={`rotate(${secondHandAngle} 110 110)`}
                        >
                            <line x1="110" y1="126" x2="110" y2="22" className="dial-hand hand-second" />
                            <circle cx="110" cy="22" r="5" className="hand-grab-ring ring-second" />
                            <circle
                                cx="110"
                                cy="22"
                                r="16"
                                className="hand-hitbox"
                                onPointerDown={(e) => handleStartDrag('seconds', e)}
                            />
                        </g>
                    )}

                    {/* Tactical center pivot pin */}
                    <circle cx="110" cy="110" r="5.5" className="dial-center-pin" />
                    <circle cx="110" cy="110" r="2.2" className="dial-center-dot" />
                </svg>
            </div>
        </div>
    );
}