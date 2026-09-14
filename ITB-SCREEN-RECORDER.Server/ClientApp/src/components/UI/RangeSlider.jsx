import React from 'react';
import './RangeSlider.scss';

export default function RangeSlider({
    label,
    value,
    min,
    max,
    step = 1,
    onChange,
    unit = '',
    disabled = false,
    formatValue
}) {
    const displayValue = formatValue ? formatValue(value) : `${value}${unit}`;
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className={`generic-range-slider ${disabled ? 'is-disabled' : ''}`}>
            <div className="slider-header">
                <label>{label}</label>
                <span className="slider-value-badge">{disabled ? 'Disabled' : displayValue}</span>
            </div>

            <div className="slider-track-container">
                <input
                    type="range"
                    className="custom-range-input"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => onChange(Number(e.target.value))}
                    style={{ '--slider-fill': `${percentage}%` }}
                />
            </div>

            <div className="slider-ticks">
                <span>{formatValue ? formatValue(min) : min + unit}</span>
                <span>{formatValue ? formatValue(max) : max + unit}</span>
            </div>
        </div>
    );
}