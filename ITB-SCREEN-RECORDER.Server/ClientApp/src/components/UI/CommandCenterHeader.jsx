import { useState, useEffect } from 'react';
import ServerClock from '../UI/ServerClock';
import './CommandCenterHeader.scss';

export default function CommandCenterHeader({
    activeAgentsCount = 0,
    onOpenTelemetry,
    onOpenSettings,
    serverCpu,
    serverRamUsedMb,
    serverRamTotalMb,
    serverNetTxMbps,
    serverNetMaxMbps,
    serverUptimeSeconds
}) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`command-center-top-bar ${isScrolled ? 'scrolled' : ''}`}>
            {/* צד שמאל: לוגו הקלטה טקטי וכותרת */}
            <div className="brand-logo-section">
                <div className="tactical-emblem">
                    <div className="emblem-core-pulse"></div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="8" fill="currentColor" fillOpacity="0.2"></circle>
                        <circle cx="12" cy="12" r="4" fill="currentColor"></circle>
                    </svg>
                </div>
                <div className="brand-text-group">
                    <div className="brand-title-row">
                        <span className="brand-name">ITB</span>
                        <span className="brand-main">COMMAND CENTER</span>
                    </div>
                    <span className="brand-subtitle">LIVE AGENT OPERATIONS</span>
                </div>
            </div>

            {/* מרכז: שעון השרת ומדדי הבריאות */}
            <div className="header-clock-section">
                <ServerClock
                    hostCpu={serverCpu?.hostCpuPct || 0}
                    processCpu={serverCpu?.processCpuPct || 0}
                    serverRamUsedMb={serverRamUsedMb}
                    serverRamTotalMb={serverRamTotalMb}
                    serverNetTxMbps={serverNetTxMbps}
                    serverNetMaxMbps={serverNetMaxMbps}
                    serverUptimeSeconds={serverUptimeSeconds}
                />
            </div>

            {/* צד ימין: כפתורי פעולה */}
            <div className="header-actions-group">
                <div className="active-agents-badge">
                    Active Agents: {activeAgentsCount}
                </div>

                <button className="header-icon-btn" onClick={onOpenTelemetry} title="Telemetry & Analytics">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                </button>

                <button className="header-icon-btn" onClick={onOpenSettings} title="Settings">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                </button>
            </div>
        </header>
    );
}