import { useState, useEffect } from 'react';

export default function ServerClock() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [timezone, setTimezone] = useState('Asia/Jerusalem');
    const [locale, setLocale] = useState('en-US'); // 💡 מצב ה-Locale

    useEffect(() => {
        let isActive = true;
        fetch('/api/v1/settings')
            .then(res => res.json())
            .then(data => {
                if (isActive) {
                    if (data.displayTimezone) setTimezone(data.displayTimezone);
                    if (data.displayLocale) setLocale(data.displayLocale); // 💡 טעינת ה-Locale
                }
            })
            .catch(() => console.warn('[ServerClock] Failed to fetch settings, using defaults'));

        return () => { isActive = false; };
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // 💡 שימוש ב-Locale הדינמי לעיצוב התאריך
    const dateFormatter = new Intl.DateTimeFormat(locale, {
        timeZone: timezone,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    });

    // 💡 שימוש ב-Locale הדינמי לעיצוב השעה (משפיע למשל על פורמט 12/24 שעות אם לא דורסים אותו)
    const timeFormatter = new Intl.DateTimeFormat(locale, {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // שומר על תצוגה צבאית/NOC, ללא קשר ל-Locale
    });

    const formattedDate = dateFormatter.format(currentTime).toUpperCase();
    const formattedTime = timeFormatter.format(currentTime);

    const displayLocation = timezone.split('/').pop().replace('_', ' ').toUpperCase();

    return (
        <div className="flex flex-col items-center justify-center bg-gray-950 border border-gray-800 rounded-xl px-8 py-4 shadow-[0_0_25px_rgba(0,0,0,0.7)] min-w-[260px] select-none">

            <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]"></div>
                <span className="text-gray-500 text-xs font-bold tracking-[0.2em]">
                    {displayLocation} NOC
                </span>
            </div>

            <div className="text-gray-300 font-mono text-sm tracking-[0.1em] mb-1">
                {formattedDate}
            </div>

            <div
                className="text-emerald-400 font-mono font-black text-5xl tracking-tight leading-none"
                style={{ textShadow: '0 0 15px rgba(52, 211, 153, 0.4)' }}
            >
                {formattedTime}
            </div>

        </div>
    );
}