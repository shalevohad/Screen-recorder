import { useState, useEffect } from 'react';
import StationThumbnail from './StationThumbnail';
import ServerClock from './ServerClock';
import '../styles/DashboardGrid.scss';

export default function DashboardGrid({ stations, actionPending, onToggleStream, direction = 'ltr' }) {

    const [zoomLevel, setZoomLevel] = useState(() => {
        const savedZoom = localStorage.getItem('itb_dashboard_zoom');
        return savedZoom ? Number(savedZoom) : 3;
    });

    useEffect(() => {
        localStorage.setItem('itb_dashboard_zoom', zoomLevel);
    }, [zoomLevel]);

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

            {/* שכבת פיקוד עליונה: שעון במרכז בלבד */}
            <div className="noc-command-bar">
                <div>
                    <ServerClock />
                </div>
            </div>

            {/* אזור התוכן: גריד התחנות או הודעת המתנה */}
            {stations.length === 0 ? (
                <div className="stations-empty-state">
                    🔄 WAITING FOR INITIAL CONNECTION...
                </div>
            ) : (
                <div
                    className="stations-grid-wrapper"
                    style={{ '--zoom-min-width': gridZoomMap[zoomLevel] }}
                >
                    {stations.map((station) => (
                        <div key={station.hostname} className="station-wrapper-cell">
                            <StationThumbnail
                                hostname={station.hostname}
                                ipAddress={station.ipAddress}
                                isOnline={station.isOnline}
                                isStreaming={station.isStreaming}
                                cpuUsage={station.cpuUsage}
                                gpuUsage={station.gpuUsage}
                                hasAudio={station.hasAudio}
                                actualFps={station.actualFps}
                                internalCaptureFps={station.internalCaptureFps}
                                droppedFrames={station.droppedFrames}
                                qosTier={station.qosTier}
                                isPending={actionPending[station.hostname]}
                                onToggleStream={() => onToggleStream(station.hostname, station.isStreaming)}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* סרגל ה-ZOOM צף מינימליסטי ומוכוון מגע (Touch-First) בתחתית */}
            <div className="noc-footer-zoom">
                <button
                    onClick={handleZoomOut}
                    disabled={zoomLevel === 1 || stations.length === 0}
                    className="zoom-btn"
                    title="Zoom Out"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                </button>

                <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={zoomLevel}
                    onChange={(e) => setZoomLevel(Number(e.target.value))}
                    disabled={stations.length === 0}
                    className="zoom-slider"
                />

                <button
                    onClick={handleZoomIn}
                    disabled={zoomLevel === 5 || stations.length === 0}
                    className="zoom-btn"
                    title="Zoom In"
                >
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