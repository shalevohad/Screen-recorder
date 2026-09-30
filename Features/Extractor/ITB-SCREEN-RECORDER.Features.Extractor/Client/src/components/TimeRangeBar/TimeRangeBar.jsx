import React, { useRef } from 'react';
import './TimeRangeBar.scss';

export default function TimeRangeBar({
    startString,
    endString,
    timeMode,
    isScanning,
    isSubmitting,
    onStartChange,
    onEndChange,
    onScan
}) {
    const startInputRef = useRef(null);
    const endInputRef = useRef(null);

    return (
        <div className="time-range-bar">
            <div className="time-field-card" onClick={() => { try { startInputRef.current?.showPicker?.(); } catch { } }}>
                <div className="field-meta">
                    <span className="field-label">START WINDOW ({timeMode})</span>
                    <span className="field-icon">📅</span>
                </div>
                <input
                    ref={startInputRef}
                    type="datetime-local"
                    className="control-input"
                    lang="en-GB"
                    value={startString}
                    onClick={(e) => { e.stopPropagation(); try { e.target.showPicker?.(); } catch { } }}
                    onChange={(e) => onStartChange(e.target.value)}
                />
            </div>

            <div className="time-field-card" onClick={() => { try { endInputRef.current?.showPicker?.(); } catch { } }}>
                <div className="field-meta">
                    <span className="field-label">END WINDOW ({timeMode})</span>
                    <span className="field-icon">📅</span>
                </div>
                <input
                    ref={endInputRef}
                    type="datetime-local"
                    className="control-input"
                    lang="en-GB"
                    value={endString}
                    onClick={(e) => { e.stopPropagation(); try { e.target.showPicker?.(); } catch { } }}
                    onChange={(e) => onEndChange(e.target.value)}
                />
            </div>

            <button
                className={`btn-scan-action ${isScanning ? 'scanning' : ''}`}
                onClick={onScan}
                disabled={isScanning || isSubmitting}
            >
                {isScanning ? 'SCANNING...' : 'SCAN ARCHIVES'}
            </button>
        </div>
    );
}