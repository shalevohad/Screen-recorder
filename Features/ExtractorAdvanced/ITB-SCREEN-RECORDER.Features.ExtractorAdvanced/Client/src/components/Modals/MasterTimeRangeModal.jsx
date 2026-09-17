import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './MasterTimeRangeModal.scss';

export default function MasterTimeRangeModal({ isOpen, onClose, currentRange, onApplyRange }) {
    if (!isOpen || typeof document === 'undefined') return null;

    const [startDate, setStartDate] = useState(currentRange.start.slice(0, 10));
    const [startTime, setStartTime] = useState(currentRange.start.slice(11, 19) || '11:00:00');
    const [endDate, setEndDate] = useState(currentRange.end.slice(0, 10));
    const [endTime, setEndTime] = useState(currentRange.end.slice(11, 19) || '12:00:00');

    const handlePreset = (minutes) => {
        const now = new Date();
        const past = new Date(now.getTime() - minutes * 60000);

        const pad = (n) => String(n).padStart(2, '0');
        const formatD = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
        const formatT = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

        setStartDate(formatD(past));
        setStartTime(formatT(past));
        setEndDate(formatD(now));
        setEndTime(formatT(now));
    };

    const handleApply = () => {
        const fullStart = `${startDate} ${startTime}`;
        const fullEnd = `${endDate} ${endTime}`;
        const startMs = new Date(fullStart.replace(' ', 'T')).getTime();
        const endMs = new Date(fullEnd.replace(' ', 'T')).getTime();
        const diffMs = Math.max(60000, endMs - startMs);

        onApplyRange({
            start: fullStart,
            end: fullEnd,
            durationMs: diffMs
        });
        onClose();
    };

    const modalContent = (
        <div className="master-range-modal-portal" onClick={onClose}>
            <div className="master-range-card" onClick={(e) => e.stopPropagation()}>
                <div className="card-header">
                    <div className="title-group">
                        <svg className="icon-calendar" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
                            <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
                            <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
                            <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
                        </svg>
                        <span>MISSION RECORDING SCOPE</span>
                    </div>
                    <button className="btn-close-modal" onClick={onClose} title="Close (Esc)">✕</button>
                </div>

                {/* כפתורי Preset מהירים ומעוצבים */}
                <div className="presets-toolbar">
                    <button className="preset-chip" onClick={() => handlePreset(15)} title="Set scope to the last 15 minutes of live operations">
                        <span className="dot" />
                        <span>15m Quick</span>
                    </button>
                    <button className="preset-chip" onClick={() => handlePreset(30)} title="Set scope to the last 30 minutes">
                        <span className="dot" />
                        <span>30m Tactical</span>
                    </button>
                    <button className="preset-chip" onClick={() => handlePreset(60)} title="Set scope to the last 1 full hour">
                        <span className="dot" />
                        <span>1h Standard</span>
                    </button>
                    <button className="preset-chip" onClick={() => handlePreset(240)} title="Set scope to the last 4 hours (Full Shift)">
                        <span className="dot" />
                        <span>4h Shift</span>
                    </button>
                </div>

                {/* בחירת תאריך ושעה מלאים להתחלה ולסיום */}
                <div className="datetime-selection-grid">
                    <div className="scope-col">
                        <div className="col-heading">START POINT (FROM)</div>
                        <div className="input-group">
                            <label>Date</label>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Time</label>
                            <input type="time" step="1" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        </div>
                    </div>

                    <div className="scope-col">
                        <div className="col-heading">END POINT (TO)</div>
                        <div className="input-group">
                            <label>Date</label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Time</label>
                            <input type="time" step="1" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="modal-actions">
                    <button className="btn-cancel" onClick={onClose}>Cancel</button>
                    <button className="btn-apply" onClick={handleApply}>Load Master Session</button>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
}