// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Modals/MasterTimeRangeModal.jsx
// ==========================================
import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import './MasterTimeRangeModal.scss';

const MAX_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 שעות במדויק
const pad = (n) => String(n).padStart(2, '0');

/**
 * המרת אובייקט Date למחרוזת שמתאימה ל-input datetime-local (YYYY-MM-DDTHH:mm:ss)
 */
const toInputDateTime = (d, mode) => {
    if (!d || isNaN(d.getTime())) return '';
    if (mode === 'UTC') {
        const y = d.getUTCFullYear();
        const m = pad(d.getUTCMonth() + 1);
        const day = pad(d.getUTCDate());
        const hh = pad(d.getUTCHours());
        const mm = pad(d.getUTCMinutes());
        const ss = pad(d.getUTCSeconds());
        return `${y}-${m}-${day}T${hh}:${mm}:${ss}`;
    }
    const y = d.getFullYear();
    const m = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hh = pad(d.getHours());
    const mm = pad(d.getMinutes());
    const ss = pad(d.getSeconds());
    return `${y}-${m}-${day}T${hh}:${mm}:${ss}`;
};

/**
 * פענוח מחרוזת datetime-local לאובייקט Date בהתאם ל-mode
 */
const parseInputDateTime = (dtStr, mode) => {
    if (!dtStr) return null;
    const parts = dtStr.split('T');
    if (parts.length !== 2) return null;

    const [year, month, day] = parts[0].split('-').map(Number);
    const timeParts = parts[1].split(':').map(Number);
    const hour = timeParts[0] || 0;
    const min = timeParts[1] || 0;
    const sec = timeParts[2] || 0;

    if (mode === 'UTC') {
        return new Date(Date.UTC(year, month - 1, day, hour, min, sec));
    }
    return new Date(year, month - 1, day, hour, min, sec);
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

export default function MasterTimeRangeModal({
    isOpen,
    onClose,
    currentRange,
    onApplyRange,
    timeMode = 'LOCAL',
    onTimeModeChange
}) {
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const [activePreset, setActivePreset] = useState(null);

    useEffect(() => {
        if (isOpen && currentRange) {
            const startObj = parseSafeDate(currentRange.start, timeMode);
            const endObj = parseSafeDate(currentRange.end, timeMode);

            setStartDateTime(toInputDateTime(startObj, timeMode));
            setEndDateTime(toInputDateTime(endObj, timeMode));
            setActivePreset(null);
        }
    }, [isOpen, currentRange, timeMode]);

    // חישוב גבולות דינמיים: חסימה הדדית שלא תאפשר בחירה מעבר ל-24 שעות
    const limits = useMemo(() => {
        const startObj = parseInputDateTime(startDateTime, timeMode);
        const endObj = parseInputDateTime(endDateTime, timeMode);

        const startMs = startObj?.getTime();
        const endMs = endObj?.getTime();

        return {
            // ה-Start לא יכול להיות מאוחר מה-End, ולא יכול להיות ישן יותר מ-End מינוס 24 שעות
            startMax: endMs ? toInputDateTime(new Date(endMs - 1000), timeMode) : undefined,
            startMin: endMs ? toInputDateTime(new Date(endMs - MAX_WINDOW_MS), timeMode) : undefined,

            // ה-End לא יכול להיות מוקדם מה-Start, ולא יכול לעבור את Start פלוס 24 שעות
            endMin: startMs ? toInputDateTime(new Date(startMs + 1000), timeMode) : undefined,
            endMax: startMs ? toInputDateTime(new Date(startMs + MAX_WINDOW_MS), timeMode) : undefined
        };
    }, [startDateTime, endDateTime, timeMode]);

    // חישוב משך הזמן הנבחר כרגע להצגה
    const currentDurationHours = useMemo(() => {
        const startObj = parseInputDateTime(startDateTime, timeMode);
        const endObj = parseInputDateTime(endDateTime, timeMode);
        if (!startObj || !endObj || endObj <= startObj) return '0h';
        const hours = (endObj.getTime() - startObj.getTime()) / (1000 * 60 * 60);
        return `${hours.toFixed(1)}h`;
    }, [startDateTime, endDateTime, timeMode]);

    if (!isOpen) return null;

    const handleQuickPreset = (durationMs, presetLabel) => {
        setActivePreset(presetLabel);
        const endObj = new Date();
        const startObj = new Date(endObj.getTime() - durationMs);

        const newRange = {
            start: toInputDateTime(startObj, timeMode),
            end: toInputDateTime(endObj, timeMode),
            durationMs: durationMs
        };

        if (onApplyRange) onApplyRange(newRange);
        if (onClose) onClose();
    };

    const handleStartChange = (e) => {
        const newStartStr = e.target.value;
        setStartDateTime(newStartStr);
        setActivePreset(null);

        const startObj = parseInputDateTime(newStartStr, timeMode);
        const endObj = parseInputDateTime(endDateTime, timeMode);
        if (!startObj) return;

        // אם ה-End הנוכחי רחוק ביותר מ-24 שעות מה-Start החדש, מיישרים את ה-End
        if (endObj && (endObj.getTime() - startObj.getTime() > MAX_WINDOW_MS)) {
            setEndDateTime(toInputDateTime(new Date(startObj.getTime() + MAX_WINDOW_MS), timeMode));
        } else if (endObj && endObj.getTime() <= startObj.getTime()) {
            setEndDateTime(toInputDateTime(new Date(startObj.getTime() + (3600 * 1000)), timeMode));
        }
    };

    const handleEndChange = (e) => {
        const newEndStr = e.target.value;
        setEndDateTime(newEndStr);
        setActivePreset(null);

        const endObj = parseInputDateTime(newEndStr, timeMode);
        const startObj = parseInputDateTime(startDateTime, timeMode);
        if (!endObj) return;

        // אם ה-Start הנוכחי ישן ביותר מ-24 שעות מה-End שנבחר, מקדמים את ה-Start
        if (startObj && (endObj.getTime() - startObj.getTime() > MAX_WINDOW_MS)) {
            setStartDateTime(toInputDateTime(new Date(endObj.getTime() - MAX_WINDOW_MS), timeMode));
        } else if (startObj && startObj.getTime() >= endObj.getTime()) {
            setStartDateTime(toInputDateTime(new Date(endObj.getTime() - (3600 * 1000)), timeMode));
        }
    };

    const handleManualLoad = () => {
        const startFull = parseInputDateTime(startDateTime, timeMode);
        const endFull = parseInputDateTime(endDateTime, timeMode);

        if (!startFull || !endFull || isNaN(startFull.getTime()) || isNaN(endFull.getTime())) {
            alert('Invalid date or time values');
            return;
        }

        const durationMs = endFull.getTime() - startFull.getTime();
        if (durationMs <= 0) {
            alert('End point must be greater than start point');
            return;
        }

        if (durationMs > MAX_WINDOW_MS) {
            alert('Maximum allowed time scope is 24 hours');
            return;
        }

        if (onApplyRange) {
            onApplyRange({
                start: startDateTime,
                end: endDateTime,
                durationMs
            });
        }
        if (onClose) onClose();
    };

    const isUtc = timeMode === 'UTC';

    return createPortal(
        <div className="modal-backdrop-overlay" onClick={onClose} dir="ltr">
            <div className="master-time-modal-card" onClick={(e) => e.stopPropagation()}>
                {/* כותרת ראשית ובורר UTC / Local מובנה */}
                <div className="modal-header">
                    <div className="title-block">
                        <span className="modal-title">MISSION RECORDING SCOPE</span>

                        <div className="header-actions-row">
                            <div className={`timezone-badge ${isUtc ? 'utc' : 'local'}`}>
                                <span className="pulse-indicator" />
                                <span className="badge-text">
                                    TIMEZONE: <strong>{isUtc ? 'UTC (ZULU)' : 'LOCAL (SYSTEM)'}</strong>
                                </span>
                            </div>

                            {onTimeModeChange && (
                                <div className="modal-mode-toggle">
                                    <button
                                        type="button"
                                        className={`mode-pill ${!isUtc ? 'active' : ''}`}
                                        onClick={() => onTimeModeChange('LOCAL')}
                                    >
                                        LOCAL
                                    </button>
                                    <button
                                        type="button"
                                        className={`mode-pill ${isUtc ? 'active' : ''}`}
                                        onClick={() => onTimeModeChange('UTC')}
                                    >
                                        UTC
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <button className="btn-modal-close" onClick={onClose} title="Close">✕</button>
                </div>

                {/* כפתורי בחירה מהירה (עד 24 שעות) */}
                <div className="quick-presets-grid">
                    <button
                        className={`btn-preset ${activePreset === '24h' ? 'active' : ''}`}
                        onClick={() => handleQuickPreset(24 * 3600 * 1000, '24h')}
                    >
                        24h Max <span className="dot" />
                    </button>
                    <button
                        className={`btn-preset ${activePreset === '8h' ? 'active' : ''}`}
                        onClick={() => handleQuickPreset(8 * 3600 * 1000, '8h')}
                    >
                        8h Shift <span className="dot" />
                    </button>
                    <button
                        className={`btn-preset ${activePreset === '4h' ? 'active' : ''}`}
                        onClick={() => handleQuickPreset(4 * 3600 * 1000, '4h')}
                    >
                        4h Block <span className="dot" />
                    </button>
                    <button
                        className={`btn-preset ${activePreset === '1h' ? 'active' : ''}`}
                        onClick={() => handleQuickPreset(1 * 3600 * 1000, '1h')}
                    >
                        1h Standard <span className="dot" />
                    </button>
                </div>

                {/* שדות תאריך ושעה מאוחדים (24H עם חסימה הדדית) */}
                <div className="time-range-inputs-container">
                    <div className="input-column">
                        <div className="column-header">
                            <span className="column-label">START POINT (FROM)</span>
                            <span className="tz-label">({timeMode} - 24H)</span>
                        </div>

                        <div className="field-group" onClick={(e) => e.currentTarget.querySelector('input')?.showPicker?.()}>
                            <div className="input-row-wrapper">
                                <input
                                    type="datetime-local"
                                    step="1"
                                    value={startDateTime}
                                    min={limits.startMin}
                                    max={limits.startMax}
                                    onChange={handleStartChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="input-column">
                        <div className="column-header">
                            <span className="column-label">END POINT (TO)</span>
                            <span className="tz-label">({timeMode} - 24H)</span>
                        </div>

                        <div className="field-group" onClick={(e) => e.currentTarget.querySelector('input')?.showPicker?.()}>
                            <div className="input-row-wrapper">
                                <input
                                    type="datetime-local"
                                    step="1"
                                    value={endDateTime}
                                    min={limits.endMin}
                                    max={limits.endMax}
                                    onChange={handleEndChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* שורת אינדיקציה של חלון הזמן המרבי */}
                <div className="range-scope-summary-pill">
                    <span className="summary-label">SELECTED WINDOW:</span>
                    <strong className="summary-value">{currentDurationHours}</strong>
                    <span className="summary-cap">/ 24h MAXIMUM</span>
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