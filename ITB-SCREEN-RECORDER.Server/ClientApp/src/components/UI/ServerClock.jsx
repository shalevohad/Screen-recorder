import { useState, useEffect, useRef } from 'react';
import './ServerClock.scss';

function ServerMetricRow({ color, title, iconSvg, primaryValue, secondaryValue }) {
    return (
        <div className="metric-line" style={{ color }} title={title}>
            {iconSvg}
            <span className="metric-val">
                <span className="metric-primary">{primaryValue}</span>
                {secondaryValue && <span className="metric-secondary">{secondaryValue}</span>}
            </span>
        </div>
    );
}

export default function ServerClock({
    hostCpu = 0,
    processCpu = 0,
    serverRamUsedMb = 0,
    serverRamTotalMb = 16384,
    serverNetTxMbps = 0,
    serverNetMaxMbps = 1000,
    serverUptimeSeconds = 0
}) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [localUptime, setLocalUptime] = useState(serverUptimeSeconds);
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
        if (serverUptimeSeconds > 0) {
            setLocalUptime(serverUptimeSeconds);
        }
    }, [serverUptimeSeconds]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
            setLocalUptime(prev => prev + 1);
        }, 1000);

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

    // חישוב אחוז ניצול RAM כללי למערכת
    const ramPct = serverRamTotalMb > 0 ? (serverRamUsedMb / serverRamTotalMb) * 100 : 0;
    const netPct = serverNetMaxMbps > 0 ? (serverNetTxMbps / serverNetMaxMbps) * 100 : 0;

    const getStatusColor = (pct) => {
        if (pct >= 90) return '#ef4444';
        if (pct >= 75) return '#f97316';
        return '#4ade80';
    };

    const formatUptime = (totalSeconds) => {
        if (!totalSeconds || totalSeconds <= 0) return 'UP: 0s';

        const d = Math.floor(totalSeconds / 86400);
        const h = Math.floor((totalSeconds % 86400) / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = Math.floor(totalSeconds % 60);

        let str = 'UP: ';
        if (d > 0) str += `${d}d `;
        if (d > 0 || h > 0) str += `${h}h `;
        if (d > 0 || h > 0 || m > 0) str += `${m}m `;
        str += `${s}s`;

        return str;
    };

    // פונקציית עזר להצגת נפח ה-RAM (MB או GB)
    const formatMemorySize = (mb) => {
        const gb = mb / 1024;
        return gb >= 1 ? `${gb.toFixed(0)}G` : `${Math.round(mb)}M`;
    };

    const cpuIcon = (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <rect x="8" y="8" width="8" height="8"></rect>
        </svg>
    );

    const ramIcon = (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="2" y="6" width="20" height="12" rx="3" ry="3"></rect>
            <line x1="6" y1="6" x2="6" y2="18"></line>
            <line x1="10" y1="6" x2="10" y2="18"></line>
            <line x1="14" y1="6" x2="14" y2="18"></line>
            <line x1="18" y1="6" x2="18" y2="18"></line>
        </svg>
    );

    const netIcon = (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M3 12h4l3-8 4 16 3-8h4"></path>
        </svg>
    );

    // נתוני האפליקציה (Process RAM מתוך ה-API)
    const appRamMb = serverRamUsedMb; // הערך שמגיע מ-processRamMb
    const appRamPctOfTotal = serverRamTotalMb > 0 ? (appRamMb / serverRamTotalMb) * 100 : 0;
    const totalRamGbStr = formatMemorySize(serverRamTotalMb);
    const appRamStr = formatMemorySize(appRamMb);

    return (
        <div className="noc-clock-panel">
            <div className="clock-section-left">
                <div className="location-row">
                    <div className="live-dot"></div>
                    <span className="location-text">{displayLocation}</span>
                </div>
                <div className="date-text">{formattedDate}</div>
            </div>

            <div className="clock-divider"></div>

            <div className="clock-section-middle">
                <span className="digital-time">{formattedTime}</span>
                <span className="uptime-text">{formatUptime(localUptime)}</span>
            </div>

            <div className="clock-divider"></div>

            <div className="clock-section-right">
                {/* CPU */}
                <ServerMetricRow
                    color={getStatusColor(hostCpu)}
                    title={`Host Total CPU: ${hostCpu.toFixed(1)}%\nApp CPU: ${processCpu.toFixed(1)}%`}
                    iconSvg={cpuIcon}
                    primaryValue={`${hostCpu.toFixed(1)}%`}
                    secondaryValue={` (App ${processCpu.toFixed(1)}%)`}
                />

                {/* RAM: אחוז כללי בירוק, פירוט מוחלט ואחוז תרומה בסוגריים כחולים */}
                <ServerMetricRow
                    color={getStatusColor(ramPct)}
                    title={`Host Total RAM: ${ramPct.toFixed(1)}%\nApp RAM: ${appRamStr} of ${totalRamGbStr} (${appRamPctOfTotal.toFixed(1)}%)`}
                    iconSvg={ramIcon}
                    primaryValue={`${ramPct.toFixed(1)}%`}
                    secondaryValue={` (${appRamStr} / ${totalRamGbStr} (${appRamPctOfTotal.toFixed(1)}%))`}
                />

                {/* NET */}
                <ServerMetricRow
                    color={getStatusColor(netPct)}
                    title={`Server Network TX: ${serverNetTxMbps.toFixed(2)} Mbps out of ${serverNetMaxMbps} Mbps`}
                    iconSvg={netIcon}
                    primaryValue={`${netPct.toFixed(1)}%`}
                    secondaryValue={` (${(serverNetMaxMbps / 1000).toFixed(0)}G)`}
                />
            </div>
        </div>
    );
}