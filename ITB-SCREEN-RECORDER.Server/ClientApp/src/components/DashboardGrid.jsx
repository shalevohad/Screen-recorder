import { useState, useEffect } from 'react';
import StationThumbnail from './StationThumbnail';
import ServerClock from './ServerClock'; // 💡 ייבוא השעון

export default function DashboardGrid({ stations, actionPending, onToggleStream }) {

    // אתחול מתוך ה-LocalStorage לשמירת זכרון המשתמש
    const [zoomLevel, setZoomLevel] = useState(() => {
        const savedZoom = localStorage.getItem('itb_dashboard_zoom');
        return savedZoom ? Number(savedZoom) : 3;
    });

    useEffect(() => {
        localStorage.setItem('itb_dashboard_zoom', zoomLevel);
    }, [zoomLevel]);

    const gridZoomMap = {
        1: 'min(100%, 220px)',
        2: 'min(100%, 320px)',
        3: 'min(100%, 420px)',
        4: 'min(100%, 550px)',
        5: 'min(100%, 800px)'
    };

    const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 1, 1));
    const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 1, 5));

    return (
        <div className="dashboard-grid-container flex flex-col w-full min-h-screen touch-pan-y relative">

            {/* 💡 שכבת הפיקוד המרחפת (War Room Overlay) */}
            <div className="sticky top-4 z-50 w-full mb-8 px-4 sm:px-6 flex justify-between items-start pointer-events-none">

                {/* אזור שמאלי: שעון שרת */}
                <div className="pointer-events-auto hidden lg:block">
                    <ServerClock />
                </div>

                {/* אזור מרכזי: כפתורי זום */}
                <div className="pointer-events-auto flex items-center gap-4 bg-gray-900/90 backdrop-blur-xl px-6 py-3 rounded-full border border-gray-700 shadow-2xl mx-auto">
                    <span className="text-gray-400 text-xs font-bold tracking-widest uppercase hidden sm:block">
                        Zoom
                    </span>

                    <button
                        onClick={handleZoomOut}
                        disabled={zoomLevel === 1 || stations.length === 0}
                        className={`p-2 transition-colors rounded-full touch-manipulation ${zoomLevel === 1 || stations.length === 0 ? 'text-gray-700 cursor-not-allowed' : 'text-gray-300 hover:text-white hover:bg-gray-800 active:bg-gray-700'}`}
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
                        className="cursor-pointer w-32 sm:w-48 accent-green-500 h-2 bg-gray-700 rounded-lg appearance-none touch-manipulation disabled:opacity-50"
                    />

                    <button
                        onClick={handleZoomIn}
                        disabled={zoomLevel === 5 || stations.length === 0}
                        className={`p-2 transition-colors rounded-full touch-manipulation ${zoomLevel === 5 || stations.length === 0 ? 'text-gray-700 cursor-not-allowed' : 'text-gray-300 hover:text-white hover:bg-gray-800 active:bg-gray-700'}`}
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

                {/* אזור ימני: איזון גריד */}
                <div className="hidden lg:block w-[260px] pointer-events-none"></div>
            </div>

            {/* אזור התוכן: גריד התחנות או הודעת המתנה */}
            {stations.length === 0 ? (
                <div className="text-gray-500 font-mono flex items-center justify-center py-24 border border-dashed border-gray-800 rounded-xl bg-gray-900/30 w-full mt-2 tracking-widest text-sm">
                    🔄 WAITING FOR INITIAL CONNECTION...
                </div>
            ) : (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(auto-fill, minmax(${gridZoomMap[zoomLevel]}, 1fr))`,
                        gap: '1.5rem',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        paddingBottom: '2rem'
                    }}
                >
                    {stations.map((station) => (
                        <StationThumbnail
                            key={station.hostname}
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
                    ))}
                </div>
            )}
        </div>
    );
}