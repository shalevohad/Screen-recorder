// Client/src/components/Timeline/SessionClockBadge.jsx
import React, { useState, useMemo, useCallback } from 'react';
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

    const formatEpochTime = useCallback((epochMs) => {
        if (!epochMs || isNaN(epochMs)) return '--:--:--';
        const d = new Date(epochMs);
        if (timeMode === 'UTC') {
            return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
        }
        return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }, [timeMode]);

    const formatDuration = useCallback((durMs) => {
        if (!durMs || durMs < 0) return '00:00:00';
        const totalSec = Math.floor(durMs / 1000);
        const h = Math.floor(totalSec / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = totalSec % 60;
        return `${pad(h)}:${pad(m)}:${pad(s)}`;
    }, []);

    const inDisplayStr = useMemo(() => formatEpochTime(baseEpochMs + inPointMs), [formatEpochTime, baseEpochMs, inPointMs]);
    const outDisplayStr = useMemo(() => formatEpochTime(baseEpochMs + outPointMs), [formatEpochTime, baseEpochMs, outPointMs]);
    const durationDisplayStr = useMemo(() => formatDuration(Math.max(0, outPointMs - inPointMs)), [formatDuration, inPointMs, outPointMs]);

    const parseTimeStringToMs = useCallback((inputStr, fallbackMs) => {
        if (!inputStr || !inputStr.trim()) return fallbackMs;
        const parts = inputStr.trim().split(':').map(Number);
        if (parts.length < 2 || parts.some(isNaN)) return fallbackMs;

        const [h, m, s = 0] = parts;
        const d = new Date(baseEpochMs);

        if (timeMode === 'UTC') {
            d.setUTCHours(h, m, s, 0);
        } else {
            d.setHours(h, m, s, 0);
        }

        let targetEpoch = d.getTime();

        while (targetEpoch < baseEpochMs) {
            targetEpoch += 24 * 60 * 60 * 1000;
        }
        while (targetEpoch > baseEpochMs + totalDurationMs + 1000) {
            targetEpoch -= 24 * 60 * 60 * 1000;
        }

        const calculatedOffsetMs = targetEpoch - baseEpochMs;
        if (isNaN(calculatedOffsetMs)) return fallbackMs;

        return Math.max(0, Math.min(totalDurationMs, calculatedOffsetMs));
    }, [baseEpochMs, timeMode, totalDurationMs]);

    const handleStartEditIn = () => {
        setInInputText(inDisplayStr);
        setIsEditingIn(true);
    };

    const handleCommitIn = () => {
        setIsEditingIn(false);
        if (!inInputText || !inInputText.trim() || inInputText.trim() === inDisplayStr) {
            return;
        }
        const parsedMs = parseTimeStringToMs(inInputText.trim(), inPointMs);
        if (parsedMs !== null && !isNaN(parsedMs) && parsedMs < outPointMs) {
            setInPointMs(parsedMs);
        }
    };

    const handleStartEditOut = () => {
        setOutInputText(outDisplayStr);
        setIsEditingOut(true);
    };

    const handleCommitOut = () => {
        setIsEditingOut(false);
        if (!outInputText || !outInputText.trim() || outInputText.trim() === outDisplayStr) {
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
                    <span className="console-digits" onClick={handleStartEditIn} title="Click to edit IN time">
                        {inDisplayStr}
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
                    <span className="console-digits" onClick={handleStartEditOut} title="Click to edit OUT time">
                        {outDisplayStr}
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