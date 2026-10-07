// ==========================================
// File: Features/ExtractorAdvanced/Client/src/components/Timeline/header/SessionClockBadge.jsx
// ==========================================
import React, { useState, useMemo, useCallback } from 'react';
import { getLocalOffsetMinutes, checkTimeAmbiguity } from '../../../utils/dstEngine.js';
import './SessionClockBadge.scss';

const pad = (n) => String(n).padStart(2, '0');

export default function SessionClockBadge({
    baseEpochMs = 0,
    timeMode = 'LOCAL',
    totalDurationMs = 3600000,
    inPointMs = 0,
    setInPointMs,
    outPointMs = 3600000,
    setOutPointMs
}) {
    const [isEditingIn, setIsEditingIn] = useState(false);
    const [isEditingOut, setIsEditingOut] = useState(false);
    const [inInputText, setInInputText] = useState('');
    const [outInputText, setOutInputText] = useState('');

    // 💡 עיצוב שעה מדויק ומכויל מול מנוע ה-DST של השרת
    const formatEpochTime = useCallback((epochMs) => {
        if (!epochMs || isNaN(epochMs) || epochMs <= 0) {
            return { timeStr: '--:--:--', zoneLabel: '' };
        }

        if (timeMode === 'UTC') {
            const d = new Date(epochMs);
            return {
                timeStr: `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`,
                zoneLabel: 'UTC'
            };
        }

        // שימוש בסטיית ה-DST המנוהלת מהשרת
        const { offsetMin, label } = getLocalOffsetMinutes(epochMs);
        const localDate = new Date(epochMs + (offsetMin * 60 * 1000));

        return {
            timeStr: `${pad(localDate.getUTCHours())}:${pad(localDate.getUTCMinutes())}:${pad(localDate.getUTCSeconds())}`,
            zoneLabel: label
        };
    }, [timeMode]);

    const formatDuration = useCallback((durMs) => {
        if (!durMs || durMs < 0) return '00:00:00';
        const totalSec = Math.floor(durMs / 1000);
        const h = Math.floor(totalSec / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = totalSec % 60;
        return `${pad(h)}:${pad(m)}:${pad(s)}`;
    }, []);

    const inInfo = useMemo(() => formatEpochTime(baseEpochMs + inPointMs), [formatEpochTime, baseEpochMs, inPointMs]);
    const outInfo = useMemo(() => formatEpochTime(baseEpochMs + outPointMs), [formatEpochTime, baseEpochMs, outPointMs]);
    const durationDisplayStr = useMemo(() => formatDuration(Math.max(0, outPointMs - inPointMs)), [formatDuration, inPointMs, outPointMs]);

    // 💡 פענוח קלט ידני מבוסס Epoch ו-dstEngine (כולל פתרון חכם לשעות כפולות)
    const parseTimeStringToMs = useCallback((inputStr, fallbackMs) => {
        if (!inputStr || !inputStr.trim()) return fallbackMs;
        const cleanInput = inputStr.trim().split(' ')[0]; // הסרת תגית אזור זמן אם הוקלדה בטעות
        const parts = cleanInput.split(':').map(Number);
        if (parts.length < 2 || parts.some(isNaN)) return fallbackMs;

        const [h, m, s = 0] = parts;

        if (timeMode === 'UTC') {
            const d = new Date(baseEpochMs);
            d.setUTCHours(h, m, s, 0);
            let targetEpoch = d.getTime();

            while (targetEpoch < baseEpochMs) targetEpoch += 86400000;
            while (targetEpoch > baseEpochMs + totalDurationMs + 1000) targetEpoch -= 86400000;

            const offset = targetEpoch - baseEpochMs;
            return isNaN(offset) ? fallbackMs : Math.max(0, Math.min(totalDurationMs, offset));
        }

        // חישוב זמן מקומי מכויל מול dstEngine
        const { offsetMin: baseOffset } = getLocalOffsetMinutes(baseEpochMs);
        const baseLocalDate = new Date(baseEpochMs + (baseOffset * 60000));
        const y = baseLocalDate.getUTCFullYear();
        const mo = baseLocalDate.getUTCMonth();
        const day = baseLocalDate.getUTCDate();

        const dateStr = `${y}-${pad(mo + 1)}-${pad(day)}`;
        const timeStr = `${pad(h)}:${pad(m)}:${pad(s)}`;

        // בדיקת שעה עמומה (מעבר חורף)
        const ambiguity = checkTimeAmbiguity(dateStr, timeStr);
        let candidateEpoch;

        if (ambiguity.isAmbiguous) {
            // בחירת המופע הקרוב ביותר לערך הנוכחי (inPoint / outPoint)
            const currentEpoch = baseEpochMs + fallbackMs;
            const diff1 = Math.abs(ambiguity.firstOccurrenceEpoch - currentEpoch);
            const diff2 = Math.abs(ambiguity.secondOccurrenceEpoch - currentEpoch);
            candidateEpoch = diff1 <= diff2 ? ambiguity.firstOccurrenceEpoch : ambiguity.secondOccurrenceEpoch;
        } else {
            const localTargetUtcMs = Date.UTC(y, mo, day, h, m, s);
            const { offsetMin: targetOffset } = getLocalOffsetMinutes(localTargetUtcMs - (baseOffset * 60000));
            candidateEpoch = localTargetUtcMs - (targetOffset * 60000);
        }

        while (candidateEpoch < baseEpochMs) candidateEpoch += 86400000;
        while (candidateEpoch > baseEpochMs + totalDurationMs + 1000) candidateEpoch -= 86400000;

        const calculatedOffsetMs = candidateEpoch - baseEpochMs;
        if (isNaN(calculatedOffsetMs)) return fallbackMs;

        return Math.max(0, Math.min(totalDurationMs, calculatedOffsetMs));
    }, [baseEpochMs, timeMode, totalDurationMs]);

    const handleStartEditIn = () => {
        setInInputText(inInfo.timeStr);
        setIsEditingIn(true);
    };

    const handleCommitIn = () => {
        setIsEditingIn(false);
        if (!inInputText || !inInputText.trim() || inInputText.trim() === inInfo.timeStr) {
            return;
        }
        const parsedMs = parseTimeStringToMs(inInputText.trim(), inPointMs);
        if (parsedMs !== null && !isNaN(parsedMs) && parsedMs < outPointMs) {
            setInPointMs(parsedMs);
        }
    };

    const handleStartEditOut = () => {
        setOutInputText(outInfo.timeStr);
        setIsEditingOut(true);
    };

    const handleCommitOut = () => {
        setIsEditingOut(false);
        if (!outInputText || !outInputText.trim() || outInputText.trim() === outInfo.timeStr) {
            return;
        }
        const parsedMs = parseTimeStringToMs(outInputText.trim(), outPointMs);
        if (parsedMs !== null && !isNaN(parsedMs) && parsedMs > inPointMs) {
            setOutPointMs(parsedMs);
        }
    };

    return (
        <div className="tactical-timecode-console">
            {/* שורת IN */}
            <div className="console-row in-accent">
                <span className="console-tag">IN</span>
                {isEditingIn ? (
                    <input
                        type="text"
                        className="console-input"
                        value={inInputText}
                        autoFocus
                        onChange={(e) => setInInputText(e.target.value)}
                        onBlur={handleCommitIn}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCommitIn();
                            if (e.key === 'Escape') setIsEditingIn(false);
                        }}
                    />
                ) : (
                    <span
                        className="console-digits"
                        onClick={handleStartEditIn}
                        title={`Click to edit IN time (${inInfo.zoneLabel})`}
                    >
                        {inInfo.timeStr}
                        <span className="console-zone-tag">{inInfo.zoneLabel}</span>
                    </span>
                )}
            </div>

            {/* שורת OUT */}
            <div className="console-row out-accent">
                <span className="console-tag">OUT</span>
                {isEditingOut ? (
                    <input
                        type="text"
                        className="console-input"
                        value={outInputText}
                        autoFocus
                        onChange={(e) => setOutInputText(e.target.value)}
                        onBlur={handleCommitOut}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCommitOut();
                            if (e.key === 'Escape') setIsEditingOut(false);
                        }}
                    />
                ) : (
                    <span
                        className="console-digits"
                        onClick={handleStartEditOut}
                        title={`Click to edit OUT time (${outInfo.zoneLabel})`}
                    >
                        {outInfo.timeStr}
                        <span className="console-zone-tag">{outInfo.zoneLabel}</span>
                    </span>
                )}
            </div>

            {/* מדף משך זמן (Duration) */}
            <div className="console-duration-shelf">
                <div className="dur-label-group">
                    <span className="dur-dot" />
                    <span className="dur-title">DUR</span>
                </div>
                <span className="dur-timecode">{durationDisplayStr}</span>
            </div>
        </div>
    );
}