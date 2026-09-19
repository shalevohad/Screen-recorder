// Client/src/components/Modals/MasterTimeRangeModal.jsx
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './MasterTimeRangeModal.scss';

const pad = (n) => String(n).padStart(2, '0');

// פונקציות המרה המותאמות דינמית ל-UTC או LOCAL
const toInputDate = (d, mode) => {
    if (!d || isNaN(d.getTime())) return '';
    if (mode === 'UTC') {
        return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
    }
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const toInputTime = (d, mode) => {
    if (!d || isNaN(d.getTime())) return '';
    if (mode === 'UTC') {
        return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
    }
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const formatStrWithMode = (d, mode) => {
    return `${toInputDate(d, mode)}T${toInputTime(d, mode)}`;
};

const parseSafeDate = (dateStr, mode) => {
    if (!dateStr) return new Date();
    const cleanStr = String(dateStr).replace(' ', 'T');
    if (mode === 'UTC') {
        const utcStr = cleanStr.endsWith('Z') ? cleanStr : `${cleanStr}Z`;
        const d = new Date(utcStr);
        return isNaN(d.getTime()) ? new Date() : d;
    } else {
        const localStr = cleanStr.endsWith('Z') ? cleanStr.slice(0, -1) : cleanStr;
        const d = new Date(localStr);
        return isNaN(d.getTime()) ? new Date() : d;
    }
};

const parseInputToDate = (dateStr, timeStr, mode) => {
    if (!dateStr || !timeStr) return null;
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hour, min, sec] = timeStr.split(':').map(Number);

    if (mode === 'UTC') {
        return new Date(Date.UTC(year, month - 1, day, hour, min, sec || 0));
    }
    return new Date(year, month - 1, day, hour, min, sec || 0);
};

export default function MasterTimeRangeModal({
    isOpen,
    onClose,
    currentRange,
    onApplyRange,
    timeMode = 'LOCAL'
}) {
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [activePreset, setActivePreset] = useState(null);

    // עדכון שדות הקלט בכל פתיחה או שינוי של currentRange או timeMode
    useEffect(() => {
        if (isOpen && currentRange) {
            const startObj = parseSafeDate(currentRange.start, timeMode);
            const endObj = parseSafeDate(currentRange.end, timeMode);

            setStartDate(toInputDate(startObj, timeMode));
            setStartTime(toInputTime(startObj, timeMode));
            setEndDate(toInputDate(endObj, timeMode));
            setEndTime(toInputTime(endObj, timeMode));
            setActivePreset(null);
        }
    }, [isOpen, currentRange, timeMode]);

    if (!isOpen) return null;

    // בחירה מהירה המחשבת ומחילה את הטווח אוטומטית לפי timeMode
    const handleQuickPreset = (durationMs, presetLabel) => {
        setActivePreset(presetLabel);
        const endObj = new Date();
        const startObj = new Date(endObj.getTime() - durationMs);

        const newRange = {
            start: formatStrWithMode(startObj, timeMode),
            end: formatStrWithMode(endObj, timeMode),
            durationMs: durationMs
        };

        if (onApplyRange) onApplyRange(newRange);
        if (onClose) onClose();
    };

    // שמירה ידנית של הזמנים שהוקלדו
    const handleManualLoad = () => {
        const startFull = parseInputToDate(startDate, startTime, timeMode);
        const endFull = parseInputToDate(endDate, endTime, timeMode);

        if (!startFull || !endFull || isNaN(startFull.getTime()) || isNaN(endFull.getTime())) {
            alert('Invalid date or time values');
            return;
        }

        const durationMs = endFull.getTime() - startFull.getTime();
        if (durationMs <= 0) {
            alert('End time must be greater than start time');
            return;
        }

        if (onApplyRange) {
            onApplyRange({
                start: formatStrWithMode(startFull, timeMode),
                end: formatStrWithMode(endFull, timeMode),
                durationMs
            });
        }
        if (onClose) onClose();
    };

    const isUtc = timeMode === 'UTC';

    return createPortal(
        <div className="modal-backdrop-overlay" onClick={onClose} dir="ltr">
            <div className="master-time-modal-card" onClick={(e) => e.stopPropagation()}>
                {/* כותרת ומחוון Timezone פעיל וברור */}
                <div className="modal-header">
                    <div className="title-block">
                        <span className="modal-title">MISSION RECORDING SCOPE</span>
                        <div className={`timezone-badge ${isUtc ? 'utc' : 'local'}`}>
                            <span className="pulse-indicator" />
                            <span className="badge-text">
                                TIMEZONE: <strong>{isUtc ? 'UTC (ZULU)' : 'LOCAL (SYSTEM)'}</strong>
                            </span>
                        </div>
                    </div>
                    <button className="btn-modal-close" onClick={onClose} title="Close">✕</button>
                </div>

                {/* כפתורי בחירה מהירה */}
                <div className="quick-presets-grid">
                    <button
                        className={`btn-preset ${activePreset === '4h' ? 'active' : ''}`}
                        onClick={() => handleQuickPreset(4 * 3600 * 1000, '4h')}
                        title={`Load last 4 hours immediately in ${timeMode}`}
                    >
                        4h Shift <span className="dot" />
                    </button>
                    <button
                        className={`btn-preset ${activePreset === '2h' ? 'active' : ''}`}
                        onClick={() => handleQuickPreset(2 * 3600 * 1000, '2h')}
                        title={`Load last 2 hours immediately in ${timeMode}`}
                    >
                        2h Block <span className="dot" />
                    </button>
                    <button
                        className={`btn-preset ${activePreset === '1h' ? 'active' : ''}`}
                        onClick={() => handleQuickPreset(1 * 3600 * 1000, '1h')}
                        title={`Load last 1 hour immediately in ${timeMode}`}
                    >
                        1h Standard <span className="dot" />
                    </button>
                    <button
                        className={`btn-preset ${activePreset === '30m' ? 'active' : ''}`}
                        onClick={() => handleQuickPreset(30 * 60 * 1000, '30m')}
                        title={`Load last 30 minutes immediately in ${timeMode}`}
                    >
                        30m Tactical <span className="dot" />
                    </button>
                </div>

                {/* שדות קלט עם חיווי של אזור הזמן */}
                <div className="time-range-inputs-container">
                    <div className="input-column">
                        <div className="column-header">
                            <label className="column-label">START POINT (FROM)</label>
                            <span className="tz-label">({timeMode})</span>
                        </div>
                        <div className="field-group">
                            <span className="sub-label">DATE</span>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => { setStartDate(e.target.value); setActivePreset(null); }}
                            />
                        </div>
                        <div className="field-group">
                            <span className="sub-label">TIME</span>
                            <input
                                type="time"
                                step="1"
                                value={startTime}
                                onChange={(e) => { setStartTime(e.target.value); setActivePreset(null); }}
                            />
                        </div>
                    </div>

                    <div className="input-column">
                        <div className="column-header">
                            <label className="column-label">END POINT (TO)</label>
                            <span className="tz-label">({timeMode})</span>
                        </div>
                        <div className="field-group">
                            <span className="sub-label">DATE</span>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => { setEndDate(e.target.value); setActivePreset(null); }}
                            />
                        </div>
                        <div className="field-group">
                            <span className="sub-label">TIME</span>
                            <input
                                type="time"
                                step="1"
                                value={endTime}
                                onChange={(e) => { setEndTime(e.target.value); setActivePreset(null); }}
                            />
                        </div>
                    </div>
                </div>

                <div className="modal-footer-actions">
                    <button className="btn-action-cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn-action-load" onClick={handleManualLoad}>
                        LOAD
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}