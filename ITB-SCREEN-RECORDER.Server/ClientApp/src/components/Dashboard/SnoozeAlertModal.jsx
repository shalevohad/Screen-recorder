// ==========================================
// File: Client/src/components/Dashboard/SnoozeAlertModal.jsx
// ==========================================
import React, { useState } from 'react';
import './SnoozeAlertModal.scss';

const PRESET_DURATIONS = [
    { label: '15m', minutes: 15 },
    { label: '30m', minutes: 30 },
    { label: '1 Hour', minutes: 60 },
    { label: '2 Hours', minutes: 120 },
    { label: '4 Hours', minutes: 240 }
];

export default function SnoozeAlertModal({
    isOpen,
    onClose,
    targetHostname,
    isBulk = false,
    bulkCount = 0,
    isCurrentlySnoozed = false,
    currentRemainingMinutes = 0,
    onConfirmSnooze,
    onCancelSnooze
}) {
    const [selectedMinutes, setSelectedMinutes] = useState(30);
    const [customMinutes, setCustomMinutes] = useState('');
    const [isCustom, setIsCustom] = useState(false);
    const [reason, setReason] = useState('');

    if (!isOpen) return null;

    const handleSelectPreset = (mins) => {
        setIsCustom(false);
        setSelectedMinutes(mins);
    };

    const handleCustomChange = (e) => {
        setIsCustom(true);
        const val = e.target.value;
        setCustomMinutes(val);
        const num = parseInt(val, 10);
        if (!isNaN(num) && num > 0) {
            setSelectedMinutes(num);
        }
    };

    const handleConfirm = () => {
        const finalMinutes = isCustom
            ? Math.max(1, parseInt(customMinutes, 10) || 30)
            : selectedMinutes;
        onConfirmSnooze(finalMinutes, reason);
        onClose();
    };

    return (
        <div className="snooze-modal-backdrop" onClick={onClose}>
            <div className="snooze-modal-window" onClick={(e) => e.stopPropagation()}>
                <div className="snooze-modal-header">
                    <div className="header-icon-cluster">
                        <span className="snooze-pulse-icon">⏱</span>
                        <div className="header-titles">
                            <h3 className="modal-title">POSTPONE RECORDING ALERT</h3>
                            <span className="modal-target">
                                {isBulk ? `Fleet Batch: ${bulkCount} Workstation(s)` : `Workstation: ${targetHostname}`}
                            </span>
                        </div>
                    </div>
                    <button type="button" className="btn-close-modal" onClick={onClose} aria-label="Close">✕</button>
                </div>

                <div className="snooze-modal-body">
                    <p className="snooze-instruction">
                        Workstations must continuously record all active screens. If this station is intentionally running in 
                        <strong> Monitor-Only</strong> or maintenance mode, you can temporarily postpone the alert.
                    </p>

                    {isCurrentlySnoozed && (
                        <div className="currently-snoozed-alert-box">
                            <span className="box-icon">ℹ️</span>
                            <div className="box-content">
                                <strong>Currently Postponed</strong>
                                <span>Alert is snoozed with approximately {currentRemainingMinutes} minute(s) remaining.</span>
                            </div>
                        </div>
                    )}

                    <div className="snooze-field-group">
                        <label className="field-label">POSTPONE DURATION</label>
                        <div className="preset-buttons-row">
                            {PRESET_DURATIONS.map((preset) => (
                                <button
                                    key={preset.minutes}
                                    type="button"
                                    className={`btn-preset-duration ${!isCustom && selectedMinutes === preset.minutes ? 'active' : ''}`}
                                    onClick={() => handleSelectPreset(preset.minutes)}
                                >
                                    {preset.label}
                                </button>
                            ))}
                            <button
                                type="button"
                                className={`btn-preset-duration ${isCustom ? 'active' : ''}`}
                                onClick={() => {
                                    setIsCustom(true);
                                    if (!customMinutes) setCustomMinutes(String(selectedMinutes));
                                }}
                            >
                                Custom
                            </button>
                        </div>

                        {isCustom && (
                            <div className="custom-input-wrapper">
                                <input
                                    type="number"
                                    min="1"
                                    max="1440"
                                    className="custom-minutes-input"
                                    placeholder="Enter minutes (e.g. 45)"
                                    value={customMinutes}
                                    onChange={handleCustomChange}
                                    autoFocus
                                />
                                <span className="custom-suffix">Minutes</span>
                            </div>
                        )}
                    </div>

                    <div className="snooze-field-group">
                        <label className="field-label">OPERATIONAL REASON (OPTIONAL)</label>
                        <input
                            type="text"
                            className="reason-text-input"
                            placeholder="e.g. Scheduled display maintenance, driver tuning..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </div>
                </div>

                <div className="snooze-modal-footer">
                    {isCurrentlySnoozed && (
                        <button
                            type="button"
                            className="btn-cancel-snooze"
                            onClick={() => {
                                onCancelSnooze();
                                onClose();
                            }}
                        >
                            ✕ Cancel Snooze &amp; Arm Alert
                        </button>
                    )}
                    <div className="footer-right-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="button" className="btn-confirm-snooze" onClick={handleConfirm}>
                            Postpone Alert ({isCustom ? (parseInt(customMinutes, 10) || selectedMinutes) : selectedMinutes}m)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
