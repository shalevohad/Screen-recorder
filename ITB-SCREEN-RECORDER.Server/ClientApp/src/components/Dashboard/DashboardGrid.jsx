import { useState, useEffect, useMemo } from 'react';
import * as signalR from '@microsoft/signalr';
import StationThumbnail from '../Station/StationThumbnail';
import './DashboardGrid.scss';

export default function DashboardGrid({
    stations: initialStations = [],
    actionPending = {},
    onToggleStream,
    onBulkStart,
    onBulkStop,
    direction = 'ltr'
}) {
    const [liveStations, setLiveStations] = useState(initialStations);

    // ברירת מחדל: מסונן מראש ומיון מ-A ל-Z
    const [hideOffline, setHideOffline] = useState(true);
    const [sortAsc, setSortAsc] = useState(true);

    // 💡 ברירת מחדל כבוי (false) עם שמירה וטעינה מ-localStorage
    const [globalShowMetrics, setGlobalShowMetrics] = useState(() => {
        const saved = localStorage.getItem('itb_global_show_metrics');
        return saved !== null ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        localStorage.setItem('itb_global_show_metrics', JSON.stringify(globalShowMetrics));
    }, [globalShowMetrics]);

    const [zoomLevel, setZoomLevel] = useState(() => {
        const savedZoom = localStorage.getItem('itb_dashboard_zoom');
        return savedZoom ? Number(savedZoom) : 3;
    });

    useEffect(() => {
        localStorage.setItem('itb_dashboard_zoom', zoomLevel);
    }, [zoomLevel]);

    useEffect(() => {
        setLiveStations(initialStations);
    }, [initialStations]);

    useEffect(() => {
        const port = import.meta.env?.VITE_SERVER_PORT || '5090';
        const hubUrl = `http://${window.location.hostname}:${port}/hubs/telemetry`;

        const connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .withAutomaticReconnect()
            .build();

        connection.on("ReceiveAgentMetrics", (report) => {
            setLiveStations(prev => {
                const idx = prev.findIndex(s => s.hostname === report.hostname);
                const isOnline = report.status === 1 || report.status === 2 || report.isProcessRunning;

                if (idx > -1) {
                    const copy = [...prev];
                    copy[idx] = { ...copy[idx], ...report, isOnline };
                    return copy;
                }
                return [...prev, { ...report, isOnline }];
            });
        });

        connection.start().catch(err => console.error("[SignalR] Connection Error:", err));
        return () => { connection.stop(); };
    }, []);

    // 1. חישוב זכאות לפעולות ולחצני ה-Dock
    const hasStations = liveStations.length > 0;
    const canSort = liveStations.length > 1;

    const canStartAny = useMemo(() => {
        return liveStations.some(s =>
            (s.isOnline || s.status === 1 || s.status === 2 || s.isProcessRunning) && !s.isStreaming
        );
    }, [liveStations]);

    const canStopAny = useMemo(() => {
        return liveStations.some(s => s.isStreaming);
    }, [liveStations]);

    // 2. עיבוד התחנות: סינון ומיון (A-Z)
    const processedStations = useMemo(() => {
        let list = [...liveStations];
        if (hideOffline) {
            list = list.filter(s => s.isOnline || s.status === 1 || s.status === 2 || s.isProcessRunning);
        }
        list.sort((a, b) => {
            const nameA = (a.displayName || a.hostname || '').toLowerCase();
            const nameB = (b.displayName || b.hostname || '').toLowerCase();
            const comp = nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: 'base' });
            return sortAsc ? comp : -comp;
        });
        return list;
    }, [liveStations, hideOffline, sortAsc]);

    const isSingleStation = processedStations.length === 1;

    const gridZoomMap = {
        1: 'min(100%, 250px)',
        2: 'min(100%, 310px)',
        3: 'min(100%, 380px)',
        4: 'min(100%, 460px)',
        5: 'min(100%, 540px)'
    };

    const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 1, 1));
    const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 1, 5));

    return (
        <div className="dashboard-layout-wrapper" dir={direction}>
            <div className="dashboard-content-container">

                {/* סרגל צד טקטי */}
                <aside className="dashboard-vertical-dock tactical-c2-dock">
                    {/* כפתור Start All */}
                    <button
                        className={`dock-icon-btn tactical-btn-start ${!canStartAny ? 'disabled' : ''}`}
                        onClick={canStartAny ? onBulkStart : undefined}
                        disabled={!canStartAny}
                        title={canStartAny ? "Start streaming on all active agents" : "No idle active agents available"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="6 3 20 12 6 21 6 3" />
                            <line x1="20" y1="4" x2="20" y2="20" strokeWidth="3" />
                            <circle cx="11" cy="12" r="2.2" fill="currentColor" />
                        </svg>
                    </button>

                    {/* כפתור Stop All */}
                    <button
                        className={`dock-icon-btn tactical-btn-stop ${!canStopAny ? 'disabled' : ''}`}
                        onClick={canStopAny ? onBulkStop : undefined}
                        disabled={!canStopAny}
                        title={canStopAny ? "Stop all active streams across fleet" : "No active streams running"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                            <line x1="9" y1="9" x2="15" y2="15" strokeWidth="3" />
                            <line x1="15" y1="9" x2="9" y2="15" strokeWidth="3" />
                        </svg>
                    </button>

                    <div className="dock-divider"></div>

                    {/* כפתור Filter Toggle */}
                    <button
                        className={`dock-icon-btn tactical-btn-filter ${hideOffline ? 'is-engaged' : ''} ${!hasStations ? 'disabled' : ''}`}
                        onClick={hasStations ? () => setHideOffline(p => !p) : undefined}
                        disabled={!hasStations}
                        title={!hasStations
                            ? "Filter disabled (No agents connected)"
                            : hideOffline
                                ? "Filter: Showing active agents only (Click to show all)"
                                : "Filter: Showing all agents (Click to hide offline)"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="9.5" />
                            <path d="M12 2.5a9.5 9.5 0 0 1 9.5 9.5" strokeWidth="3.2" />
                            <line x1="12" y1="12" x2="18.5" y2="5.5" strokeWidth="2.6" />
                            <circle cx="12" cy="12" r="2.2" fill="currentColor" />
                            {hideOffline && <circle cx="16" cy="8" r="1.8" fill="currentColor" />}
                        </svg>
                    </button>

                    {/* כפתור Sort A-Z / Z-A */}
                    <button
                        className={`dock-icon-btn tactical-btn-sort ${!sortAsc ? 'is-reversed' : ''} ${!canSort ? 'disabled' : ''}`}
                        onClick={canSort ? () => setSortAsc(p => !p) : undefined}
                        disabled={!canSort}
                        title={!canSort
                            ? "Sorting disabled (Insufficient agents)"
                            : sortAsc
                                ? "Sort agents: Ascending (A-Z)"
                                : "Sort agents: Descending (Z-A)"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h7M3 12h5M3 18h3" />
                            {sortAsc ? (
                                <>
                                    <path d="M17 18V6" strokeWidth="3" />
                                    <path d="M13 10l4-4 4 4" strokeWidth="2.6" />
                                </>
                            ) : (
                                <>
                                    <path d="M17 6v12" strokeWidth="3" />
                                    <path d="M13 14l4 4 4-4" strokeWidth="2.6" />
                                </>
                            )}
                        </svg>
                    </button>

                    {/* כפתור Sensors HUD Toggle */}
                    <button
                        className={`dock-icon-btn tactical-btn-sensors ${globalShowMetrics ? 'is-engaged' : ''} ${!hasStations ? 'disabled' : ''}`}
                        onClick={hasStations ? () => setGlobalShowMetrics(p => !p) : undefined}
                        disabled={!hasStations}
                        title={!hasStations
                            ? "Telemetry HUD disabled (No agents connected)"
                            : globalShowMetrics
                                ? "Telemetry HUD: Visible on all cards"
                                : "Telemetry HUD: Hidden on all cards"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2.5" />
                            <path d="M7 16v-4M12 16V8M17 16v-6" strokeWidth="3" />
                            <circle cx="12" cy="8" r="1.2" fill="currentColor" />
                            <circle cx="17" cy="10" r="1.2" fill="currentColor" />
                            <circle cx="7" cy="12" r="1.2" fill="currentColor" />
                        </svg>
                    </button>
                </aside>

                {/* אזור הגריד המרכזי */}
                <main className="dashboard-main-area">
                    {processedStations.length === 0 ? (
                        <div className="stations-empty-state-glass">
                            <div className="connection-pulse-container">
                                <div className="pulse-dot-amber"></div>
                                <div className="pulse-ring"></div>
                            </div>
                            <span className="empty-state-text">
                                {liveStations.length > 0
                                    ? "ALL AGENTS CURRENTLY FILTERED OUT"
                                    : "WAITING FOR INITIAL CONNECTION..."}
                            </span>
                        </div>
                    ) : (
                        <div
                            className={`stations-grid-wrapper tight-grid ${isSingleStation ? 'single-station' : ''}`}
                            style={{ '--zoom-min-width': gridZoomMap[zoomLevel] }}
                        >
                            {processedStations.map((station) => (
                                <div key={station.hostname} className="station-wrapper-cell">
                                    <StationThumbnail
                                        {...station}
                                        isPending={actionPending[station.hostname]}
                                        onToggleStream={() => onToggleStream(station.hostname, station.isStreaming)}
                                        globalShowMetrics={globalShowMetrics}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            {/* סרגל זום תחתון צף */}
            <div className="noc-footer-zoom-pill">
                <button onClick={handleZoomOut} disabled={zoomLevel === 1} className="zoom-btn" title="Zoom Out (-)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={zoomLevel}
                    onChange={(e) => setZoomLevel(Number(e.target.value))}
                    className="zoom-slider"
                />
                <button onClick={handleZoomIn} disabled={zoomLevel === 5} className="zoom-btn" title="Zoom In (+)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
            </div>
        </div>
    );
}