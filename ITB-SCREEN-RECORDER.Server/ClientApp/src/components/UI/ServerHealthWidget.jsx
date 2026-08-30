import React from 'react';
import './ServerHealthWidget.scss';

export default function ServerHealthWidget({
    cpuPct = 0,
    ramUsedGb = 0,
    ramTotalGb = 16,
    netTxMbps = 0,
    netLinkSpeedMbps = 1000 // 1000 = 1Gbps
}) {
    // חישובי אחוזים מול קיבולת מקסימלית
    const ramPct = ramTotalGb > 0 ? (ramUsedGb / ramTotalGb) * 100 : 0;
    const netPct = netLinkSpeedMbps > 0 ? (netTxMbps / netLinkSpeedMbps) * 100 : 0;

    // עיצוב דינמי לפי עומס (ירוק -> צהוב -> אדום)
    const getStatusClass = (pct) => {
        if (pct >= 85) return 'critical';
        if (pct >= 65) return 'warning';
        return 'healthy';
    };

    // המרה חכמה לתצוגת רוחב הפס המקסימלי (למשל 1Gbps או 10Gbps)
    const formatLinkSpeed = (mbps) => {
        if (mbps >= 1000) return `${(mbps / 1000).toFixed(0)}G`;
        return `${mbps}M`;
    };

    return (
        <div className="server-health-widget">
            <div className="health-divider">|</div>

            {/* CPU */}
            <div className={`health-item ${getStatusClass(cpuPct)}`} title={`CPU Load: ${cpuPct.toFixed(1)}%`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                    <rect x="9" y="9" width="6" height="6"></rect>
                    <line x1="9" y1="1" x2="9" y2="4"></line>
                    <line x1="15" y1="1" x2="15" y2="4"></line>
                    <line x1="9" y1="20" x2="9" y2="23"></line>
                    <line x1="15" y1="20" x2="15" y2="23"></line>
                    <line x1="20" y1="9" x2="23" y2="9"></line>
                    <line x1="20" y1="14" x2="23" y2="14"></line>
                    <line x1="1" y1="9" x2="4" y2="9"></line>
                    <line x1="1" y1="14" x2="4" y2="14"></line>
                </svg>
                <span className="value">{cpuPct.toFixed(1)}%</span>
            </div>

            {/* RAM */}
            <div className={`health-item ${getStatusClass(ramPct)}`} title={`RAM: ${ramUsedGb.toFixed(1)}GB / ${ramTotalGb.toFixed(0)}GB`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="21" x2="4" y2="21.01"></line>
                    <line x1="8" y1="21" x2="8" y2="21.01"></line>
                    <line x1="12" y1="21" x2="12" y2="21.01"></line>
                    <line x1="16" y1="21" x2="16" y2="21.01"></line>
                    <line x1="20" y1="21" x2="20" y2="21.01"></line>
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="6" y1="8" x2="6" y2="12"></line>
                    <line x1="10" y1="8" x2="10" y2="12"></line>
                    <line x1="14" y1="8" x2="14" y2="12"></line>
                    <line x1="18" y1="8" x2="18" y2="12"></line>
                </svg>
                <span className="value">
                    {ramPct.toFixed(1)}% <span className="capacity">({ramTotalGb.toFixed(0)}G)</span>
                </span>
            </div>

            {/* NET */}
            <div className={`health-item ${getStatusClass(netPct)}`} title={`NET TX: ${netTxMbps.toFixed(2)} Mbps / ${netLinkSpeedMbps} Mbps`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
                <span className="value">
                    {netPct.toFixed(1)}% <span className="capacity">({formatLinkSpeed(netLinkSpeedMbps)})</span>
                </span>
            </div>
        </div>
    );
}