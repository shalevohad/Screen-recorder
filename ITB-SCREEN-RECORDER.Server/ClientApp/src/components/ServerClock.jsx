import { useState, useEffect } from 'react';
import '../styles/ServerClock.scss'; // ייבוא קובץ העיצוב הייעודי

export default function ServerClock() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [timezone, setTimezone] = useState('Asia/Jerusalem');
    const [locale, setLocale] = useState('en-US');

    useEffect(() => {
        let isActive = true;
        fetch('/api/v1/settings')
            .then(res => res.json())
            .then(data => {
                if (isActive) {
                    if (data.displayTimezone) setTimezone(data.displayTimezone);
                    if (data.displayLocale) setLocale(data.displayLocale);
                }
            })
            .catch(() => console.warn('[ServerClock] Failed to fetch settings, using defaults'));

        return () => { isActive = false; };
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const dateFormatter = new Intl.DateTimeFormat(locale, {
        timeZone: timezone,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    });

    const timeFormatter = new Intl.DateTimeFormat(locale, {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const formattedDate = dateFormatter.format(currentTime).toUpperCase();
    const formattedTime = timeFormatter.format(currentTime);
    const displayLocation = timezone.split('/').pop().replace('_', ' ').toUpperCase();

    return (
        <div className="noc-clock-container">
            {/* Live Indicator + Location */}
            <div className="noc-indicator-wrapper">
                <div className="noc-live-dot"></div>
                <span className="noc-location-text">
                    {displayLocation}
                </span>
            </div>

            <div className="noc-divider"></div>

            {/* Date */}
            <div className="noc-date-text">
                {formattedDate}
            </div>

            <div className="noc-divider"></div>

            {/* Time */}
            <div className="noc-time-display">
                {formattedTime}
            </div>
        </div>
    );
}