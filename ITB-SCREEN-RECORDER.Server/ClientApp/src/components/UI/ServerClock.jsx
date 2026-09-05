import { useState, useEffect } from 'react';
import './ServerClock.scss';

export default function ServerClock({ uptimeSeconds: serverUptime = 0 }) {
    const [currentTime, setCurrentTime] = useState(new Date());

    // סנכרון Prop-to-State ישיר בזמן רינדור ללא useEffect וללא cascading renders
    const [prevServerUptime, setPrevServerUptime] = useState(serverUptime);
    const [elapsedUptime, setElapsedUptime] = useState(serverUptime);

    if (serverUptime !== prevServerUptime) {
        setPrevServerUptime(serverUptime);
        setElapsedUptime(serverUptime);
    }

    // קידום השעון וה-Uptime בכל שנייה
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

    const getTimezoneOffset = () => {
        const offset = -currentTime.getTimezoneOffset() / 60;
        const sign = offset >= 0 ? '+' : '-';
        return `GMT${sign}${Math.abs(offset)}`;
    };

    const localHours = String(currentTime.getHours()).padStart(2, '0');
    const localMinutes = String(currentTime.getMinutes()).padStart(2, '0');
    const localSeconds = String(currentTime.getSeconds()).padStart(2, '0');

    const utcHours = String(currentTime.getUTCHours()).padStart(2, '0');
    const utcMinutes = String(currentTime.getUTCMinutes()).padStart(2, '0');
    const utcSeconds = String(currentTime.getUTCSeconds()).padStart(2, '0');

    const dayName = currentTime.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
    const monthName = currentTime.toLocaleDateString('en-US', { month: 'long' }).toUpperCase();
    const dayOfMonth = currentTime.getDate();
    const year = currentTime.getFullYear();

    return (
        <div className="noc-clock-panel">
            <div className="clock-col chrono-col">
                <div className="chrono-main-row">
                    <span className="chrono-digits">{localHours}:{localMinutes}:</span>
                    <span className="chrono-seconds">{localSeconds}</span>
                    <span className="chrono-tz">({getTimezoneOffset()})</span>
                </div>
                <div className="chrono-sub-row">
                    <span className="chrono-utc">UTC: {utcHours}:{utcMinutes}:{utcSeconds}</span>
                </div>
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