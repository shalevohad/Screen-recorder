import{ useState } from 'react';
import StationThumbnail from './StationThumbnail';

export default function DashboardGrid({ stations, actionPending, onToggleStream }) {
    const [zoomLevel, setZoomLevel] = useState(3);

    const gridZoomMap = {
        1: '250px',
        2: '350px',
        3: '450px',
        4: '600px',
        5: '800px'
    };

    const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 1, 1));
    const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 1, 5));

    if (stations.length === 0) {
        return (
            <div className="text-gray-500 font-mono col-span-full text-center py-24 border border-dashed border-gray-800 rounded-xl bg-gray-900/30 w-full mt-6">
                🔄 ממתין להתקשרות ראשונית...
            </div>
        );
    }

    return (
        <div className="dashboard-grid-container flex flex-col w-full">

            {/* סרגל כלים מינימליסטי וממורכז */}
            <div className="flex justify-center items-center mb-8">
                <div className="flex items-center gap-3 bg-gray-900/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-gray-800 shadow-lg">
                    <span className="text-gray-400 text-xs font-medium tracking-wide">תצוגה:</span>

                    <button
                        onClick={handleZoomOut}
                        disabled={zoomLevel === 1}
                        className={`transition-colors ${zoomLevel === 1 ? 'text-gray-700 cursor-not-allowed' : 'text-gray-400 hover:text-white'}`}
                        title="Zoom Out"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                        className="cursor-pointer w-28 accent-blue-500 h-1 bg-gray-700 rounded-lg appearance-none"
                    />

                    <button
                        onClick={handleZoomIn}
                        disabled={zoomLevel === 5}
                        className={`transition-colors ${zoomLevel === 5 ? 'text-gray-700 cursor-not-allowed' : 'text-gray-400 hover:text-white'}`}
                        title="Zoom In"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="11" y1="8" x2="11" y2="14"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                    </button>
                </div>
            </div>

            {/* הגריד הדינמי */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(auto-fill, minmax(${gridZoomMap[zoomLevel]}, 1fr))`,
                    gap: '1.5rem',
                    transition: 'all 0.3s ease-in-out'
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
                        isPending={actionPending[station.hostname]}
                        onToggleStream={() => onToggleStream(station.hostname, station.isStreaming)}
                    />
                ))}
            </div>
        </div>
    );
}