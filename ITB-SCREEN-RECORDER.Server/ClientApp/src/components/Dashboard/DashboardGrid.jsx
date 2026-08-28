import { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import StationThumbnail from '../Station/StationThumbnail';
import ServerClock from '../UI/ServerClock';
import TelemetryModal from './TelemetryModal';
import './DashboardGrid.scss';

export default function DashboardGrid({ stations: initialStations, actionPending, onToggleStream, telemetryOpen, onCloseTelemetry, direction = 'ltr' }) {

    const [liveStations, setLiveStations] = useState(initialStations);
    const [prevInitialStations, setPrevInitialStations] = useState(initialStations);
    const [chartData, setChartData] = useState([]);

    if (initialStations !== prevInitialStations) {
        setPrevInitialStations(initialStations);
        setLiveStations(prev => {
            const merged = [...prev];
            initialStations.forEach(station => {
                if (!merged.some(s => s.hostname === station.hostname)) {
                    merged.push(station);
                }
            });
            return merged;
        });
    }

    const [zoomLevel, setZoomLevel] = useState(() => {
        const savedZoom = localStorage.getItem('itb_dashboard_zoom');
        return savedZoom ? Number(savedZoom) : 3;
    });

    useEffect(() => {
        localStorage.setItem('itb_dashboard_zoom', zoomLevel);
    }, [zoomLevel]);

    useEffect(() => {
        const port = import.meta.env?.VITE_SERVER_PORT || '5090';
        const hubUrl = `http://${window.location.hostname}:${port}/hubs/telemetry`;

        const connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .withAutomaticReconnect()
            .build();

        connection.on("ReceiveAgentMetrics", (report) => {
            setLiveStations(prevStations => {
                const idx = prevStations.findIndex(s => s.hostname === report.hostname);
                if (idx > -1) {
                    const updated = [...prevStations];
                    updated[idx] = { ...updated[idx], ...report, isOnline: true };
                    return updated;
                }
                return [...prevStations, { ...report, isOnline: true }];
            });
        });

        connection.start().catch(err => console.error("[SignalR] Connection Error:", err));

        return () => {
            connection.stop();
        };
    }, []);

    // 💡 חישוב נתונים אמיתיים ב-Mbps עבור הרשת, וממוצע/מקסימום לחומרה
    useEffect(() => {
        const interval = setInterval(() => {
            setLiveStations(current => {
                if (current.length === 0) return current;

                const cpuValues = current.map(s => s.hostCpuPct || 0);
                const cpuAvg = cpuValues.reduce((a, b) => a + b, 0) / current.length;
                const cpuMax = Math.max(...cpuValues);

                // שמירה על ערכי Mbps גולמיים ולא אחוזים עבור גרף הרשת
                const netValues = current.map(s => (s.mediaTxMbps || 0) / 1000.0);
                const netAvg = netValues.reduce((a, b) => a + b, 0) / current.length;
                const netMax = Math.max(...netValues, 0);

                const totalTelemKbps = current.reduce((sum, s) => sum + (s.telemetryTxKbps || 0), 0);
                const telemNorm = Math.min(100, (totalTelemKbps / 500.0) * 100);

                const ramValues = current.map(s => s.processRamMb ? (s.processRamMb / 16384) * 100 : 0);
                const ramAvg = ramValues.length > 0 ? ramValues.reduce((a, b) => a + b, 0) / ramValues.length : 0;

                setChartData(prev => {
                    const next = [...prev, {
                        cpuAvg,
                        cpuMax,
                        netAvg,
                        netMax,
                        telemNorm,
                        ramAvg
                    }];
                    return next.length > 60 ? next.slice(1) : next;
                });
                return current;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const gridZoomMap = {
        1: 'min(100%, 280px)',
        2: 'min(100%, 360px)',
        3: 'min(100%, 460px)',
        4: 'min(100%, 520px)',
        5: 'min(100%, 600px)',
        6: 'min(100%, 700px)'
    };

    const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 1, 1));
    const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 1, 5));

    return (
        <div className="dashboard-grid-container" dir={direction}>

            <div className="noc-command-bar" style={{ display: 'flex', justifyContent: 'center' }}>
                <ServerClock />
            </div>

            {liveStations.length === 0 ? (
                <div className="stations-empty-state">
                    🔄 WAITING FOR INITIAL CONNECTION...
                </div>
            ) : (
                <div
                    className="stations-grid-wrapper"
                    style={{ '--zoom-min-width': gridZoomMap[zoomLevel] }}
                >
                    {liveStations.map((station) => (
                        <div key={station.hostname} className="station-wrapper-cell">
                            <StationThumbnail
                                hostname={station.hostname}
                                ipAddress={station.ipAddress}
                                isOnline={station.isOnline}
                                isStreaming={station.isStreaming}
                                hasAudio={station.hasAudio}

                                actualFps={station.actualFps}
                                internalCaptureFps={station.internalCaptureFps}
                                droppedFrames={station.droppedFrames}
                                qosTier={station.qosTier}

                                hostCpuPct={station.hostCpuPct}
                                processCpuPct={station.processCpuPct}
                                gpu3dPct={station.gpu3dPct}
                                gpuNvencPct={station.gpuNvencPct}
                                mediaTxMbps={station.mediaTxMbps}
                                nicUtilizationPct={station.nicUtilizationPct}
                                telemetryTxKbps={station.telemetryTxKbps}

                                isPending={actionPending[station.hostname]}
                                onToggleStream={() => onToggleStream(station.hostname, station.isStreaming)}
                            />
                        </div>
                    ))}
                </div>
            )}

            {telemetryOpen && (
                <TelemetryModal
                    chartData={chartData}
                    onClose={onCloseTelemetry}
                />
            )}

            <div className="noc-footer-zoom">
                <button onClick={handleZoomOut} disabled={zoomLevel === 1 || liveStations.length === 0} className="zoom-btn" title="Zoom Out">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                </button>

                <input type="range" min="1" max="5" step="1" value={zoomLevel} onChange={(e) => setZoomLevel(Number(e.target.value))} disabled={liveStations.length === 0} className="zoom-slider" />

                <button onClick={handleZoomIn} disabled={zoomLevel === 5 || liveStations.length === 0} className="zoom-btn" title="Zoom In">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        <line x1="11" y1="8" x2="11" y2="14"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                </button>
            </div>
        </div>
    );
}