// Client/src/components/Timeline/SessionClockBadge.jsx
import React, { useState, useRef, useEffect } from 'react';
import { formatTimelineClock, formatDuration } from '../../utils/timeFormat.js';
import './SessionClockBadge.scss';

export default function SessionClockBadge({
    baseEpochMs = 0,
    timeMode = 'LOCAL',
    totalDurationMs = 3600000,
    inPointMs = 0,
    setInPointMs,
    outPointMs = 3600000,
    setOutPointMs
}) {
    const [editingMarker, setEditingMarker] = useState(null);
    const [tempTimeText, setTempTimeText] = useState('');
    const editInputRef = useRef(null);

    const cutDurationMs = Math.max(0, outPointMs - inPointMs);

    useEffect(() => {
        if (editingMarker && editInputRef.current) {
            editInputRef.current.focus();
            editInputRef.current.select();
        }
    }, [editingMarker]);

    const handleStartEdit = (markerType) => {
        const currentMs = markerType === 'IN' ? inPointMs : outPointMs;
        setTempTimeText(formatTimelineClock(baseEpochMs + currentMs, timeMode));
        setEditingMarker(markerType);
    };

    const handleCommitEdit = () => {
        if (!editingMarker) return;

        const parts = tempTimeText.trim().split(':').map(Number);
        if (parts.length === 3 && parts.every(p => !isNaN(p))) {
            const [h, m, s] = parts;
            if (h >= 0 && h < 24 && m >= 0 && m < 60 && s >= 0 && s < 60) {
                const targetDate = new Date(baseEpochMs);
                if (timeMode === 'UTC') {
                    targetDate.setUTCHours(h, m, s, 0);
                } else {
                    targetDate.setHours(h, m, s, 0);
                }

                const targetOffsetMs = targetDate.getTime() - baseEpochMs;

                if (editingMarker === 'IN') {
                    const validIn = Math.max(0, Math.min(targetOffsetMs, outPointMs - 1000));
                    setInPointMs(validIn);
                } else {
                    const validOut = Math.min(totalDurationMs, Math.max(targetOffsetMs, inPointMs + 1000));
                    setOutPointMs(validOut);
                }
            }
        }
        setEditingMarker(null);
    };

    const handleEditKeyDown = (e) => {
        if (e.key === 'Enter') handleCommitEdit();
        if (e.key === 'Escape') setEditingMarker(null);
    };

    return (
        <div className="tactical-timecode-console">
            {/* שורת IN מוגדלת */}
            <div className="console-row in-accent">
                <span className="console-tag">IN</span>
                {editingMarker === 'IN' ? (
                    <input
                        ref={editInputRef}
                        type="text"
                        className="console-input"
                        value={tempTimeText}
                        onChange={(e) => setTempTimeText(e.target.value)}
                        onBlur={handleCommitEdit}
                        onKeyDown={handleEditKeyDown}
                    />
                ) : (
                    <span
                        className="console-digits"
                        onClick={() => handleStartEdit('IN')}
                        title="Click to edit IN time"
                    >
                        {formatTimelineClock(baseEpochMs + inPointMs, timeMode)}
                    </span>
                )}
            </div>

            {/* שורת OUT מוגדלת */}
            <div className="console-row out-accent">
                <span className="console-tag">OUT</span>
                {editingMarker === 'OUT' ? (
                    <input
                        ref={editInputRef}
                        type="text"
                        className="console-input"
                        value={tempTimeText}
                        onChange={(e) => setTempTimeText(e.target.value)}
                        onBlur={handleCommitEdit}
                        onKeyDown={handleEditKeyDown}
                    />
                ) : (
                    <span
                        className="console-digits"
                        onClick={() => handleStartEdit('OUT')}
                        title="Click to edit OUT time"
                    >
                        {formatTimelineClock(baseEpochMs + outPointMs, timeMode)}
                    </span>
                )}
            </div>

            {/* שורת Duration רחבה ומובחנת בתחתית הריבוע */}
            <div className="console-duration-shelf" title="Trimmed Duration">
                <div className="dur-label-group">
                    <span className="dur-dot" />
                    <span className="dur-title">DUR</span>
                </div>
                <span className="dur-timecode">{formatDuration(cutDurationMs)}</span>
            </div>
        </div>
    );
}