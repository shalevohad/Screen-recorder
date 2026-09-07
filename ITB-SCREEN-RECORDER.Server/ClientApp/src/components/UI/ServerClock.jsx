import { useState, useEffect, useMemo } from 'react';
import './ServerClock.scss';

function getTimeParts(date, timeZone, locale = 'en-US') {
    try {
        const dtf = new Intl.DateTimeFormat(locale, {
            timeZone: timeZone || 'UTC',
            hour12: false,
            hourCycle: 'h23',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'shortOffset'
        });
        const parts = dtf.formatToParts(date);
        const map = {};
        for (const p of parts) {
            map[p.type] = p.value;
        }
        return map;
    } catch {
        const dtf = new Intl.DateTimeFormat('en-US', {
            timeZone: 'UTC',
            hour12: false,
            hourCycle: 'h23',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'shortOffset'
        });
        const parts = dtf.formatToParts(date);
        const map = {};
        for (const p of parts) {
            map[p.type] = p.value;
        }
        return map;
    }
}

export default function ServerClock({
    uptimeSeconds: serverUptime = 0,
    timezone = 'UTC',
    locale = 'en-US'
}) {
    const [currentTime, setCurrentTime] = useState(new Date());

    const [prevServerUptime, setPrevServerUptime] = useState(serverUptime);
    const [elapsedUptime, setElapsedUptime] = useState(serverUptime);

    if (serverUptime !== prevServerUptime) {
        setPrevServerUptime(serverUptime);
        setElapsedUptime(serverUptime);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
            setElapsedUptime(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatUptime = (totalSec) => {
        const d = Math.floor(totalSec / 86400);
        const h = Math.floor((totalSec % 86400) / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = totalSec % 60;

        if (d > 0) return `UP: ${d}d ${h}h ${m}m ${s}s`;
        if (h > 0) return `UP: ${h}h ${m}m ${s}s`;
        return `UP: ${m}m ${s}s`;
    };

    const timeParts = useMemo(() => {
        return getTimeParts(currentTime, timezone, locale);
    }, [currentTime, timezone, locale]);

    const displayHours = timeParts.hour || '00';
    const displayMinutes = timeParts.minute || '00';
    const displaySeconds = timeParts.second || '00';

    const utcHours = String(currentTime.getUTCHours()).padStart(2, '0');
    const utcMinutes = String(currentTime.getUTCMinutes()).padStart(2, '0');
    const utcSeconds = String(currentTime.getUTCSeconds()).padStart(2, '0');

    // בדיקה האם זמן התצוגה חופף לזמן UTC (לדוגמה כשהקונפיג מוגדר ל-UTC)
    const isUtcSame = useMemo(() => {
        const tzUpper = (timezone || '').trim().toUpperCase();
        if (tzUpper === 'UTC' || tzUpper === 'ETC/UTC' || tzUpper === 'Z') return true;
        return displayHours === utcHours && displayMinutes === utcMinutes;
    }, [timezone, displayHours, displayMinutes, utcHours, utcMinutes]);

    const tzLabel = timeParts.timeZoneName || timezone || 'UTC';
    const dayName = (timeParts.weekday || '').toUpperCase();
    const monthName = (timeParts.month || '').toUpperCase();
    const dayOfMonth = timeParts.day || '';
    const year = timeParts.year || '';

    return (
        <div className="noc-clock-panel">
            <div className="clock-col chrono-col">
                <div className="chrono-main-row">
                    <span className="chrono-digits">{displayHours}:{displayMinutes}:</span>
                    <span className="chrono-seconds">{displaySeconds}</span>
                    <span className="chrono-tz">({tzLabel})</span>
                </div>

                {/* דרישה 3: הסתרת שורת ה-UTC כשהזמן המוצג זהה ל-UTC */}
                {!isUtcSame && (
                    <div className="chrono-sub-row">
                        <span className="chrono-utc">UTC: {utcHours}:{utcMinutes}:{utcSeconds}</span>
                    </div>
                )}

                <div className="chrono-uptime-row">
                    <span className="chrono-uptime">{formatUptime(elapsedUptime)}</span>
                </div>
            </div>

            <div className="clock-col date-col">
                <span className="date-day-name">{dayName}</span>
                <span className="date-month-day">{monthName} {dayOfMonth}</span>
                <span className="date-year">{year}</span>
            </div>
        </div>
    );
}